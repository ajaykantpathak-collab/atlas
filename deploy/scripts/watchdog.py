"""Atlas watchdog — scheduled host-side health sentinel.

Runs every 5 minutes (schtasks, see INSTALL_SCHEDULES.cmd). Each run:
  - probes http://localhost/api/health (the nginx path users actually hit)
  - records status + latency to runtime_data/ops/health_log.csv
  - on state CHANGE (healthy->bad or bad->healthy) appends to alerts.log
    and fires alert delivery (deploy/scripts/notify_alert.ps1, detached):
    a Windows toast, a Windows Event Log entry (Application log, survives
    reboots), and a msg-box fallback if the toast host is unavailable.

Self-healing: the known failure mode is stopped containers while the host is
fine. If the state is "down" for 3 consecutive runs (15 min), the watchdog
attempts `docker start dream-backend-1 dream-backend-2 dream-frontend` ONCE
per incident (logged to alerts.log + selfheal.log). `docker start` on an
already-running container is a no-op, so this is safe. The counter resets on
the next "up" probe; degraded runs do not reset it but do not trigger healing.

State lives in watchdog_state.txt as JSON: {"state", "consecutive_down",
"heal_attempted"} — a legacy plain-text state file ("up") is still read.

Env overrides (used by tests; production runs with defaults):
  ATLAS_HEALTH_URL  default http://localhost/api/health
  ATLAS_OPS_DIR     default D:\\platform\\runtime_data\\ops
  ATLAS_HEAL_CMD    default docker start dream-backend-1 dream-backend-2 dream-frontend
  ATLAS_HEAL_AFTER  default 3 consecutive down runs
  ATLAS_NOTIFY      default 1 (set 0 to disable toast/eventlog dispatch)

Stdlib only. Exit 0 always — a watchdog must never itself error visibly.
"""
import csv
import json
import os
import subprocess
import time
import urllib.request
from datetime import datetime

OPS_DIR = os.environ.get("ATLAS_OPS_DIR", os.path.join(r"D:\platform\runtime_data", "ops"))
LOG_CSV = os.path.join(OPS_DIR, "health_log.csv")
ALERTS = os.path.join(OPS_DIR, "alerts.log")
STATE = os.path.join(OPS_DIR, "watchdog_state.txt")
SELFHEAL = os.path.join(OPS_DIR, "selfheal.log")

HEALTH_URL = os.environ.get("ATLAS_HEALTH_URL", "http://localhost/api/health")
HEAL_CMD = os.environ.get(
    "ATLAS_HEAL_CMD",
    "docker start dream-backend-1 dream-backend-2 dream-frontend",
)
HEAL_AFTER = int(os.environ.get("ATLAS_HEAL_AFTER", "3"))
NOTIFY = os.environ.get("ATLAS_NOTIFY", "1") == "1"

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
NOTIFY_PS1 = os.path.join(SCRIPT_DIR, "notify_alert.ps1")


_OPENER = urllib.request.build_opener(urllib.request.ProxyHandler({}))
# ProxyHandler({}) is deliberate: the default opener consults the registry /
# WPAD for proxies on first use, which under Task Scheduler's non-interactive
# session can take 30-60s and false-trips the latency guard.


def _probe():
    t0 = time.perf_counter()
    try:
        with _OPENER.open(HEALTH_URL, timeout=10) as r:
            body = json.loads(r.read().decode())
            latency = time.perf_counter() - t0
            services = body.get("services", {})
            bad = [k for k, v in services.items() if v is not True and v != "true"]
            ok = body.get("status") == "ok" and not bad and latency < 5.0
            return ("up" if ok else "degraded", latency, bad)
    except Exception as exc:
        return ("down", time.perf_counter() - t0, [str(exc)[:120]])


def _log(path, line):
    with open(path, "a", encoding="utf-8") as f:
        f.write(line.rstrip("\n") + "\n")


def _load_state():
    """Returns dict {state, consecutive_down, heal_attempted}; legacy plain-text
    state files (e.g. just 'up') are honoured."""
    try:
        with open(STATE, encoding="utf-8") as f:
            raw = f.read().strip()
        if raw.startswith("{"):
            d = json.loads(raw)
        else:
            d = {"state": raw or None, "consecutive_down": 0, "heal_attempted": False}
        return {
            "state": d.get("state"),
            "consecutive_down": int(d.get("consecutive_down", 0)),
            "heal_attempted": bool(d.get("heal_attempted", False)),
        }
    except (OSError, ValueError):
        return {"state": None, "consecutive_down": 0, "heal_attempted": False}


def _notify(level, message):
    """Fire alert delivery (toast + event log + fallback) detached — never
    blocks or fails the watchdog run."""
    if not NOTIFY or not os.path.exists(NOTIFY_PS1):
        return
    try:
        flags = 0
        if os.name == "nt":
            # CREATE_NO_WINDOW: DETACHED_PROCESS breaks powershell.exe startup
            # (process dies silently before the helper logs anything).
            flags = getattr(subprocess, "CREATE_NO_WINDOW", 0)
        subprocess.Popen(
            ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass",
             "-File", NOTIFY_PS1, "-Level", level, "-Title", "Atlas Watchdog",
             "-Message", message, "-OpsDir", OPS_DIR],
            creationflags=flags,
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        _log(ALERTS, f"{datetime.now():%Y-%m-%d %H:%M:%S} NOTIFY dispatched "
                     f"level={level} (toast/eventlog) -> {OPS_DIR}\\notify.log")
    except Exception as exc:
        try:
            _log(ALERTS, f"{datetime.now():%Y-%m-%d %H:%M:%S} NOTIFY dispatch failed: {exc}")
        except OSError:
            pass


def _heal(now, streak):
    """One auto-recovery attempt per down-incident."""
    _log(SELFHEAL, f"{now} auto-recovery: down {streak} consecutive runs "
                   f"(>= {HEAL_AFTER}) - attempting: {HEAL_CMD}")
    _log(ALERTS, f"{now} AUTO-RECOVERY: down for {streak} consecutive runs - "
                 f"attempting: {HEAL_CMD}")
    try:
        r = subprocess.run(HEAL_CMD, shell=True, capture_output=True,
                           text=True, timeout=180)
        out = ((r.stdout or "") + (r.stderr or "")).strip().replace("\n", " | ")[:300]
        _log(SELFHEAL, f"{now} auto-recovery result: rc={r.returncode} {out}")
        _log(ALERTS, f"{now} AUTO-RECOVERY result: rc={r.returncode} {out}")
    except Exception as exc:
        _log(SELFHEAL, f"{now} auto-recovery ERROR: {exc}")
        _log(ALERTS, f"{now} AUTO-RECOVERY ERROR: {exc}")


def main():
    os.makedirs(OPS_DIR, exist_ok=True)
    state, latency, detail = _probe()
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    new_file = not os.path.exists(LOG_CSV)
    with open(LOG_CSV, "a", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        if new_file:
            w.writerow(["ts", "state", "latency_s", "detail"])
        w.writerow([now, state, f"{latency:.2f}", ";".join(detail)[:200]])

    st = _load_state()
    prev = st["state"]
    st["state"] = state  # persisted below, after counter/heal updates
    if state != prev:
        _log(ALERTS, f"{now} STATE {prev or 'unknown'} -> {state} "
                     f"(latency {latency:.2f}s) {';'.join(detail)[:200]}")
        if state in ("down", "degraded"):
            _notify(state, f"Service {state.upper()} at {now} - "
                           f"{';'.join(detail)[:150]}")
        elif prev in ("down", "degraded") and state == "up":
            _notify("up", f"Service recovered at {now} (was {prev})")

    # consecutive-down counter: only "up" resets it; "down" increments;
    # "degraded" neither increments nor resets (still a bad state, so a
    # degraded run between down runs does not break the incident streak).
    if state == "down":
        st["consecutive_down"] = int(st["consecutive_down"]) + 1
    elif state == "up":
        st["consecutive_down"] = 0
        st["heal_attempted"] = False
    if (state == "down" and int(st["consecutive_down"]) >= HEAL_AFTER
            and not st["heal_attempted"]):
        _heal(now, st["consecutive_down"])
        st["heal_attempted"] = True  # one attempt per incident, until recovery

    with open(STATE, "w", encoding="utf-8") as f:
        f.write(json.dumps(st))

    # keep the csv to roughly the last 30 days (5-min cadence ~ 8640 rows)
    try:
        with open(LOG_CSV, encoding="utf-8") as f:
            lines = f.readlines()
        if len(lines) > 9000:
            with open(LOG_CSV, "w", encoding="utf-8") as f:
                f.writelines([lines[0]] + lines[-8000:])
    except OSError:
        pass


if __name__ == "__main__":
    main()
    os._exit(0)
