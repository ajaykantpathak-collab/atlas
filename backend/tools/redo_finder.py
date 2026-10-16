"""redo_finder.py — fast ReDoS triage: static catastrophic-pattern scan +
timed confirmation of suspects only (1s cap per probe)."""
import os
import re
import signal
import sys
import time

BASE = os.environ.get("AUDIT_BASE", "/app/backend")

REGEX_LIT = re.compile(
    r"""(?:re\.(?:compile|match|search|fullmatch|findall|sub|split)\()\s*(?:r)?(["'])((?:\\.|(?!\1).)*)\1""",
    re.S)

ADVERSARIALS = [
    "0" * 3000 + "a",
    " " * 3000,
    "a" * 3000,
    "1.5 " * 600 + "x",
    ":" * 1500,
    "::" * 750,
    "(" * 150 + ")" * 150,
    "Rs " + "9" * 3000,
    "-" * 3000,
]


class TO(Exception):
    pass


def _alarm(s, f):
    raise TO()


def main():
    signal.signal(signal.SIGALRM, _alarm)
    total = 0
    offenders = []
    for root, dirs, files in os.walk(BASE):
        if "/tests" in root or "/tools" in root:
            continue
        for fn in files:
            if not fn.endswith(".py"):
                continue
            p = os.path.join(root, fn)
            try:
                src = open(p, encoding="utf-8", errors="ignore").read()
            except OSError:
                continue
            for m in REGEX_LIT.finditer(src):
                pat = m.group(2)
                line = src[: m.start()].count("\n") + 1
                total += 1
                try:
                    rx = re.compile(pat)
                except re.error:
                    continue
                worst = 0.0
                hang = False
                for adv in ADVERSARIALS:
                    t0 = time.perf_counter()
                    try:
                        signal.alarm(1)
                        rx.search(adv)
                        signal.alarm(0)
                    except TO:
                        hang = True
                        break
                    except Exception:
                        signal.alarm(0)
                    worst = max(worst, time.perf_counter() - t0)
                if hang or worst > 0.25:
                    offenders.append((p, line, "HANG" if hang else f"{worst*1000:.0f}ms",
                                      pat[:70]))
                    print(f"OFFENDER {p.split('/')[-1]}:{line} "
                          f"{'HANG' if hang else f'{worst*1000:.0f}ms'} {pat[:70]}",
                          flush=True)
    print(f"\nscanned {total} regexes, {len(offenders)} offenders", flush=True)


if __name__ == "__main__":
    main()
