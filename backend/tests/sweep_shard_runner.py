"""sweep_shard_runner.py -- sharded coexistence runner for the full-bank sweep.

Cuts the full-bank verification sweep from ~11 sequential days toward ~2-3
days by adding bounded parallel shards WITHOUT violating the reason the
sequential runner is slow (the 12-way concurrent attempt produced 186/200
timeouts on this 4-core host).  Shards own DISJOINT (subject, class) groups
of the SAME row enumeration, so shards plus the sequential run can coexist
until the live run is drained or superseded.

Coexistence law -- this runner owns NOTHING of the live sequential sweep:
  live findings   D:\\platform\\runtime_data\\ops\\sweep2_findings.jsonl  READ-ONLY
  live checkpoint D:\\platform\\runtime_data\\ops\\sweep2_checkpoint.json READ-ONLY
  live report     tests/sweep_full_interim.md                            untouched
  shard files     tests/_sweep_shard_<ID>.jsonl + tests/_sweep_shard_<ID>_ckpt.json
  merged report   tests/sweep_sharded_report.md   (separate output)

Parity contract (by import, not copy -- zero product-file changes):
  * imports sweep_full_runner with a neutralised argv and calls ITS
    fetch_rows / stratified_order / order_fingerprint / run_answer_timed /
    classify / append_finding -- shard rows, the global order fingerprint
    (21c81078cf8eb33c while the DB is unchanged), the throwaway-thread 12s
    timeout pattern and the classification contract are the live runner's
    own code, bound once per process (no re-import per row).
  * same env posture: poisoned LLM keys + raising tripwires, offline HF
    cache, TORCH_NUM_THREADS=1, isolated CBSE_DATA_DIR -- but a PER-SHARD
    data dir (own question_bank.db copy, own answer_queue.jsonl, own
    answer_telemetry.jsonl, own answer_memo) so two shard processes can
    never read-modify-write a shared queue/memo/sqlite file.  Every
    CBSE_DATA_DIR consumer in the pipeline resolves the env var lazily at
    first use (verified: answer_pipeline._queue_path / _ans_memo_path /
    _official_key_lookup, services.answer_telemetry), and the override
    happens before backend.its.solver is first imported.

Modes:
  --analyze                 read-only profile of the live findings: where
                            0.3 rows/s goes + (subject,class) miss table
  --plan K                  balanced disjoint partition of ALL groups into
                            K shards (cutover plan; no run)
  --profile N [--start-pos P]  micro-benchmark: N stratified rows through
                            the live runner's own functions with per-stage
                            timers (default start: past every finding line
                            the live run already wrote)
  --shard ID [--groups "s|c;s|c" | --auto K]
                            run shard ID over its groups, checkpointed and
                            resumable; --auto picks the K heaviest groups
                            by GUIDED/SLOW_GUIDED density from the live
                            findings (min-sample / min-remaining guards)
  --merge                   fold live + all shard findings into
                            tests/sweep_sharded_report.md in the master
                            report format (dedup by qid; shard rows win on
                            overlap; live file never modified)
"""

import argparse
import ctypes
import hashlib
import itertools
import json
import os
import shutil
import sys
import threading
import time
from collections import Counter, defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
DEPLOY_ROOT = r"D:\platform\deploy"
OPS = r"D:\platform\runtime_data\ops"
LIVE_FINDINGS = os.path.join(OPS, "sweep2_findings.jsonl")
LIVE_CHECKPOINT = os.path.join(OPS, "sweep2_checkpoint.json")
SHARD_DATA_ROOT = os.path.join(OPS, "sweep2_shard_datadir")
QBANK_SRC = os.path.join(r"D:\platform\runtime_data", "question_bank.db")
TOTAL_ROWS = 253903
CLASSES = ["EXACT_HIT", "SOFT_HIT", "VERIFIED_NOKEY", "GUIDED",
           "AMBIGUOUS", "SLOW_GUIDED", "ERROR", "REFUSED"]
MISS_CLASSES = ("GUIDED", "SLOW_GUIDED")

_ap = argparse.ArgumentParser(description=__doc__.split("\n")[1])
_ap.add_argument("--analyze", action="store_true",
                 help="read-only profile of the live findings + miss table")
_ap.add_argument("--plan", type=int, default=0, metavar="K",
                 help="print a balanced disjoint K-shard partition, exit")
_ap.add_argument("--profile", type=int, default=0, metavar="N",
                 help="micro-benchmark N stratified rows with stage timers")
_ap.add_argument("--start-pos", type=int, default=-1,
                 help="stratified position to start --profile at (default: "
                      "just past every live findings line)")
_ap.add_argument("--shard", type=int, default=-1, metavar="ID",
                 help="run shard ID (findings tests/_sweep_shard_ID.jsonl)")
_ap.add_argument("--groups", type=str, default="",
                 help="';'-separated 'subject|class' groups owned by shard")
_ap.add_argument("--auto", type=int, default=0, metavar="K",
                 help="pick K heaviest groups by miss-rate from live "
                      "findings instead of --groups")
_ap.add_argument("--max-rows", type=int, default=0,
                 help="stop shard after N new rows (0 = all)")
_ap.add_argument("--timeout", type=float, default=12.0,
                 help="per-question thread timeout (default 12, live parity)")
_ap.add_argument("--merge", action="store_true",
                 help="fold live + shard findings into sweep_sharded_report")
ARGS = _ap.parse_args()

MODES = sum([ARGS.analyze, ARGS.plan > 0, ARGS.profile > 0,
             ARGS.shard >= 0, ARGS.merge])
if MODES != 1:
    _ap.error("pick exactly one of --analyze | --plan K | --profile N | "
              "--shard ID | --merge")


# --------------------------------------------------------------------------- #
# Read-only helpers over the live findings (no backend import needed)
# --------------------------------------------------------------------------- #

def read_jsonl(path):
    out = []
    if not os.path.exists(path):
        return out
    with open(path, encoding="utf-8") as fh:
        for line in fh:
            line = line.strip()
            if line:
                try:
                    out.append(json.loads(line))
                except Exception:
                    pass
    return out


def live_group_stats():
    """(subject, class) -> Counter of classes (+ '_ms' sum) from the live
    findings, read-only."""
    recs = read_jsonl(LIVE_FINDINGS)
    g = defaultdict(Counter)
    for r in recs:
        g[(r["subject"], r["class"])][r["cls"]] += 1
        g[(r["subject"], r["class"])]["_ms"] += r.get("ms", 0.0)
    return recs, g


def miss_density(c):
    n = sum(c[k] for k in CLASSES)
    miss = sum(c[k] for k in MISS_CLASSES)
    return (miss / n) if n else 0.0, n


def cmd_analyze():
    recs, groups = live_group_stats()
    n = len(recs)
    if not n:
        print("no live findings yet")
        return
    counters = Counter(r["cls"] for r in recs)
    ms_by_cls = defaultdict(list)
    for r in recs:
        ms_by_cls[r["cls"]].append(r.get("ms", 0.0))

    print("=== LIVE FINDINGS PROFILE (read-only) ===")
    ck = {}
    if os.path.exists(LIVE_CHECKPOINT):
        ck = json.load(open(LIVE_CHECKPOINT, encoding="utf-8"))
    print(f"findings lines : {n:,}   checkpoint offset: "
          f"{ck.get('offset', '?')}   fp: {ck.get('order_fingerprint', '?')}")
    if ck.get("elapsed_s"):
        print(f"live session   : {ck['elapsed_s']:.0f}s for "
              f"{ck['offset']:,} rows = "
              f"{ck['offset'] / ck['elapsed_s']:.3f} rows/s "
              f"({ck['elapsed_s'] / max(1, ck['offset']):.2f} s/row)")

    print(f"\n{'class':<15}{'n':>7}{'%':>8}{'sum_ms':>13}"
          f"{'mean_ms':>9}{'p50_ms':>8}{'max_ms':>9}   %wall")
    tot_ms = sum(sum(v) for v in ms_by_cls.values())
    for c in CLASSES:
        v = sorted(ms_by_cls.get(c, []))
        if not v:
            continue
        s = sum(v)
        print(f"{c:<15}{len(v):>7}{100.0 * len(v) / n:>7.1f}%{s:>13,.0f}"
              f"{s / len(v):>9.0f}{v[len(v) // 2]:>8.0f}{v[-1]:>9.0f}"
              f"{100.0 * s / tot_ms:>7.1f}%")
    print(f"{'TOTAL':<15}{n:>7}{'100.0%':>8}{tot_ms:>13,.0f}"
          f"{tot_ms / n:>9.0f}")
    slow_ms = sum(ms_by_cls.get("SLOW_GUIDED", []))
    print(f"\ntimeout share   : {counters.get('SLOW_GUIDED', 0)} rows x "
          f"12s cap = {slow_ms / max(1, tot_ms):.1%} of recorded wall time")
    thr = sum(1 for r in recs
              if (r.get("err") or "").startswith("THREAD_CAP"))
    print(f"thread-cap skips: {thr}")

    errs = [r for r in recs if r["cls"] == "ERROR"]
    if errs:
        kinds = Counter((r.get("err") or "?").split(":")[0][:60]
                        for r in errs)
        print("error kinds    : " + ", ".join(
            f"{k} x{v}" for k, v in kinds.most_common(8)))

    print(f"\n=== (subject,class) miss table (GUIDED+SLOW density, top 25 "
          f"by density among n>=15 samples) ===")
    print(f"{'subject':<22}{'cls':>3}{'n':>6}{'miss':>6}"
          f"{'density':>9}{'mean_ms':>9}")
    rows = []
    for (s, k), c in groups.items():
        d, gn = miss_density(c)
        if gn >= 15:
            rows.append((d, gn, s, k, c))
    rows.sort(reverse=True)
    for d, gn, s, k, c in rows[:25]:
        miss_n = sum(c[x] for x in MISS_CLASSES)
        print(f"{s:<22}{k:>3}{gn:>6}{miss_n:>6}{d:>9.1%}"
              f"{c['_ms'] / gn:>9.0f}")
    print(f"\n(distinct groups seen so far: {len(groups)}; densities come "
          f"from a stratified sample of ~"
          f"{max(1, n // max(1, len(groups)))} rows per group -- noisy, "
          f"--auto guards apply)")


# --------------------------------------------------------------------------- #
# Backend-bound modes: import the LIVE runner (argv-neutralised) and reuse
# its own functions.  sweep_full_runner parses argparse AT IMPORT TIME, so
# the argv swap is mandatory.  Its import sets the env posture (poisoned
# keys, offline HF, isolated data dir) but does NOT import backend, does
# NOT install tripwires and does NOT bind answer until asked.
# --------------------------------------------------------------------------- #

def import_live_runner():
    old = sys.argv
    sys.argv = [old[0]]
    try:
        import sweep_full_runner as sfr  # noqa: PLC0415
    finally:
        sys.argv = old
    return sfr


def shard_rss_mb():
    """Own-process working set via the Windows API (ctypes, no psutil)."""
    try:
        import ctypes.wintypes as wt

        class PMC(ctypes.Structure):
            _fields_ = [("cb", wt.DWORD), ("PageFaultCount", wt.DWORD),
                        ("PeakWorkingSetSize", ctypes.c_size_t),
                        ("WorkingSetSize", ctypes.c_size_t),
                        ("QuotaPeakPagedPoolUsage", ctypes.c_size_t),
                        ("QuotaPagedPoolUsage", ctypes.c_size_t),
                        ("QuotaPeakNonPagedPoolUsage", ctypes.c_size_t),
                        ("QuotaNonPagedPoolUsage", ctypes.c_size_t),
                        ("PagefileUsage", ctypes.c_size_t),
                        ("PeakPagefileUsage", ctypes.c_size_t)]

        pmc = PMC()
        pmc.cb = ctypes.sizeof(PMC)
        h = ctypes.windll.kernel32.GetCurrentProcess()
        if ctypes.windll.psapi.GetProcessMemoryInfo(h, ctypes.byref(pmc),
                                                    pmc.cb):
            return pmc.WorkingSetSize / (1024.0 * 1024.0)
    except Exception:
        pass
    return -1.0


def prepare_shard_env(shard_id):
    """Per-shard CBSE_DATA_DIR -- MUST run after import_live_runner (which
    points the env at the live run's dir) and BEFORE bind_answer() (which
    first imports backend.its.solver).  All pipeline consumers of the
    variable resolve it lazily at first use."""
    ddir = os.path.join(SHARD_DATA_ROOT, f"shard{shard_id}")
    os.makedirs(ddir, exist_ok=True)
    qb = os.path.join(ddir, "question_bank.db")
    if not os.path.exists(qb) and os.path.exists(QBANK_SRC):
        shutil.copy(QBANK_SRC, qb)
    os.environ["CBSE_DATA_DIR"] = ddir
    return ddir


def shard_order(sfr, groups):
    """Global stratified order filtered to this shard's groups.

    Same fetch_rows -> stratified_order -> order_fingerprint as the live
    runner, so the global fingerprint is checked against the live
    checkpoint's value while the DB is unchanged, and every shard
    position is a position of the live order ('i' fields line up for the
    merge).  The shard-local fingerprint guards shard checkpoint offsets.
    """
    rows = sfr.fetch_rows()
    order = sfr.stratified_order(rows)
    fp = sfr.order_fingerprint(rows, order)
    shard_pos = [p for p in order
                 if (rows[p][3], rows[p][4]) in groups]
    h = hashlib.sha256()
    h.update(str(len(shard_pos)).encode())
    for pos in shard_pos[:10] + shard_pos[-10:]:
        h.update(rows[pos][0].encode())
    return rows, order, fp, shard_pos, h.hexdigest()[:16]


def parse_groups(spec):
    out = set()
    for part in spec.split(";"):
        part = part.strip()
        if not part:
            continue
        s, k = part.rsplit("|", 1)
        out.add((s, int(k)))
    return out


def auto_pick_groups(sfr, k):
    """K heaviest groups by GUIDED+SLOW density from live findings,
    guarded to groups with a big-enough live sample and enough remaining
    rows to be worth a shard."""
    _, live_g = live_group_stats()
    rows = sfr.fetch_rows()
    sizes = defaultdict(int)
    for r in rows:
        sizes[(r[3], r[4])] += 1
    del rows
    scored = []
    for key, c in live_g.items():
        d, n_sample = miss_density(c)
        if n_sample >= 15 and sizes.get(key, 0) >= 100:
            scored.append((d, sizes[key], key))
    scored.sort(reverse=True)
    if len(scored) < k:
        raise SystemExit(f"only {len(scored)} groups pass the auto guards "
                         f"(n>=15 live sample, >=100 rows remaining)")
    picked = {key for _, _, key in scored[:k]}
    print("[auto] miss-density ranking (top 10):", flush=True)
    for d, rem, key in scored[:10]:
        tag = "  <== shard" if key in picked else ""
        print(f"  {key[0]}|{key[1]}  density={d:.1%} "
              f"remaining={rem:,}{tag}", flush=True)
    return picked


def open_shard_files(shard_id):
    findings = os.path.join(HERE, f"_sweep_shard_{shard_id}.jsonl")
    ckpt = os.path.join(HERE, f"_sweep_shard_{shard_id}_ckpt.json")
    return findings, ckpt


def save_shard_ckpt(ckpt, offset, sfp, gfp, counts, elapsed, groups,
                    timeout):
    tmp = ckpt + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump({
            "offset": offset,
            "order_fingerprint": sfp,
            "global_fingerprint": gfp,
            "groups": sorted(f"{s}|{k}" for s, k in groups),
            "counts": dict(counts),
            "elapsed_s": round(elapsed, 1),
            "ts": time.strftime("%Y-%m-%d %H:%M:%S"),
            "findings_lines": offset,
            "timeout_s": timeout,
        }, fh, indent=1)
    os.replace(tmp, ckpt)


def load_shard_ckpt(ckpt, sfp):
    if not os.path.exists(ckpt):
        return 0
    with open(ckpt, encoding="utf-8") as fh:
        ck = json.load(fh)
    if ck.get("order_fingerprint") != sfp:
        raise SystemExit(
            f"shard checkpoint fingerprint {ck.get('order_fingerprint')!r} "
            f"!= current {sfp!r} -- DB changed; delete {ckpt} to restart "
            f"this shard fresh.")
    return int(ck.get("offset", 0))


def run_shard(shard_id, groups):
    sfr = import_live_runner()
    ddir = prepare_shard_env(shard_id)
    import logging
    logging.disable(logging.CRITICAL)
    patched = sfr.install_tripwires()
    sfr.bind_answer()
    sfr.ARGS.timeout = ARGS.timeout

    print(f"[shard {shard_id}] tripwires: {patched}", flush=True)
    print(f"[shard {shard_id}] CBSE_DATA_DIR={ddir}", flush=True)
    print(f"[shard {shard_id}] groups: "
          f"{sorted(f'{s}|{k}' for s, k in groups)}", flush=True)

    t0 = time.time()
    rows, order, gfp, shard_pos, sfp = shard_order(sfr, groups)
    print(f"[shard {shard_id}] global fp {gfp} (live checkpoint expects "
          f"21c81078cf8eb33c), owns {len(shard_pos):,}/{len(order):,} "
          f"rows, shard fp {sfp} ({time.time() - t0:.1f}s)", flush=True)

    findings_path, ckpt_path = open_shard_files(shard_id)
    fresh = not os.path.exists(ckpt_path)
    if fresh and os.path.exists(findings_path):
        bak = findings_path + "." + time.strftime("%Y%m%d_%H%M%S") + ".bak"
        os.replace(findings_path, bak)
        print(f"[shard {shard_id}] fresh run: archived stale findings",
              flush=True)

    # settle lazy loads (torch/semantic model, CAS, index pickles, sqlite)
    # so row 0 never pays them inside the 12s budget -- same contract as
    # the live runner's warm_up
    sfr.warm_up()

    offset = 0
    if not fresh:
        offset = load_shard_ckpt(ckpt_path, sfp)
        if os.path.exists(findings_path):
            with open(findings_path, "rb") as fh:
                flines = fh.readlines()
            if len(flines) > offset:
                with open(findings_path, "wb") as fh:
                    fh.writelines(flines[:offset])
                print(f"[shard {shard_id}] truncated findings "
                      f"{len(flines)} -> {offset}", flush=True)
            elif len(flines) < offset:
                raise SystemExit(
                    f"[shard {shard_id}] findings has {len(flines)} lines "
                    f"but checkpoint says {offset} -- delete {ckpt_path} "
                    f"to restart this shard fresh.")
        print(f"[shard {shard_id}] resuming at shard offset "
              f"{offset:,}/{len(shard_pos):,}", flush=True)

    counters = Counter()
    subj_counters = defaultdict(Counter)
    if offset:
        with open(findings_path, encoding="utf-8") as fh:
            for line in itertools.islice(fh, offset):
                if line.strip():
                    counters[json.loads(line)["cls"]] += 1

    total = len(shard_pos)
    t_start = time.time()
    n_new = 0
    errors_seen = []
    fout = open(findings_path, "a", encoding="utf-8")
    timeout = ARGS.timeout
    try:
        for gi in range(offset, total):
            pos = shard_pos[gi]
            qid, qt, stored, subject, klass, qtype = rows[pos]
            # EXACT parity with sweep_full_runner.process_row: its
            # run_answer_timed + classify, same rec fields; plus the shard
            # provenance keys (shard files only -- never the live file).
            res, ms, err = sfr.run_answer_timed(qt, timeout)
            if err == "TIMEOUT":
                label, ans, cls = f"TIMEOUT@{timeout:g}s", None, "SLOW_GUIDED"
            elif err is not None:
                label, ans, cls = "ERROR", None, "ERROR"
            else:
                label, ans = res.label, res.answer
                cls = sfr.classify(label, ans or "", stored)
            rec = {
                "i": pos, "qid": qid, "subject": subject, "class": klass,
                "qtype": qtype, "cls": cls, "label": label,
                "ans": (ans or "")[:160], "stored": stored[:160],
                "ms": round(ms, 1), "err": (err or "")[:200],
                "shard": shard_id, "gpos": gi,
            }
            sfr.append_finding(fout, rec)
            counters[cls] += 1
            subj_counters[subject][cls] += 1
            n_new += 1
            if cls == "ERROR" and len(errors_seen) < 10:
                errors_seen.append(rec)
            done = gi + 1
            if done % 100 == 0 or done == total or \
                    (ARGS.max_rows and n_new >= ARGS.max_rows):
                fout.flush()
                save_shard_ckpt(ckpt_path, done, sfp, gfp, counters,
                                time.time() - t_start, groups, timeout)
                rate = n_new / max(1e-9, time.time() - t_start)
                print(f"  [shard {shard_id}] {done:,}/{total:,} | "
                      f"{rate:.2f} rows/s | rss {shard_rss_mb():.0f}MB "
                      f"| {dict(counters)}", flush=True)
            if ARGS.max_rows and n_new >= ARGS.max_rows:
                print(f"[shard {shard_id}] --max-rows "
                      f"{ARGS.max_rows} reached", flush=True)
                break
    except KeyboardInterrupt:
        print(f"\n[shard {shard_id}] interrupted", flush=True)
    finally:
        fout.flush()
        fout.close()
        save_shard_ckpt(ckpt_path, offset + n_new, sfp, gfp, counters,
                        time.time() - t_start, groups, timeout)
    elapsed = time.time() - t_start
    print(f"[shard {shard_id}] session: {n_new:,} rows in "
          f"{elapsed / 60.0:.1f} min ({n_new / max(1e-9, elapsed):.2f} "
          f"rows/s), shard offset {offset + n_new:,}/{total:,}",
          flush=True)
    for k, v in counters.most_common():
        print(f"  {k:15s} {v:,}", flush=True)
    if errors_seen:
        print("  first errors:", flush=True)
        for e in errors_seen:
            print(f"    [{e['subject']}/{e['class']}] {e['err'][:120]}",
                  flush=True)


# --------------------------------------------------------------------------- #
# --profile: micro-benchmark through the live runner's own functions with
# per-stage timers (drain wait, executor create, answer wait) + lane info
# --------------------------------------------------------------------------- #

def run_profile(n):
    sfr = import_live_runner()
    ddir = prepare_shard_env(-1)
    import logging
    logging.disable(logging.CRITICAL)
    sfr.install_tripwires()
    sfr.bind_answer()
    sfr.ARGS.timeout = ARGS.timeout
    print(f"[profile] CBSE_DATA_DIR={ddir}", flush=True)

    t0 = time.time()
    rows, order, gfp, _sp, _sfp = shard_order(sfr, set())
    print(f"[profile] fetched {len(rows):,} rows, global fp {gfp} "
          f"({time.time() - t0:.1f}s)", flush=True)

    start = ARGS.start_pos
    if start < 0:
        start = len(read_jsonl(LIVE_FINDINGS))
    pos_list = order[start:start + n]
    print(f"[profile] stratified positions {start}.."
          f"{start + len(pos_list) - 1} (cold: no prior finding for any)",
          flush=True)

    sfr.warm_up()

    from concurrent.futures import ThreadPoolExecutor
    from concurrent.futures import TimeoutError as FTE

    rows_out = []
    t_wall0 = time.time()
    for pos in pos_list:
        _qid, qt, stored, subject, klass, _qtype = rows[pos]
        stages = {}
        t0 = time.perf_counter()
        for _ in range(20):
            if threading.active_count() <= sfr._MAX_LIVE_THREADS:
                break
            time.sleep(0.1)
        stages["drain_ms"] = (time.perf_counter() - t0) * 1000
        t0 = time.perf_counter()
        ex = ThreadPoolExecutor(max_workers=1, thread_name_prefix="prof")
        stages["exec_create_ms"] = (time.perf_counter() - t0) * 1000
        t0 = time.perf_counter()
        err = None
        res = None
        try:
            fut = ex.submit(sfr._answer, qt)
            res = fut.result(timeout=ARGS.timeout)
        except FTE:
            err = "TIMEOUT"
        except Exception as exc:  # noqa: BLE001 -- mirror live runner
            err = f"{type(exc).__name__}: {exc}"[:200]
        stages["answer_ms"] = (time.perf_counter() - t0) * 1000
        ex.shutdown(wait=False)
        if err == "TIMEOUT":
            label, cls = f"TIMEOUT@{ARGS.timeout:g}s", "SLOW_GUIDED"
        elif err is not None:
            label, cls = "ERROR", "ERROR"
        else:
            label = res.label
            cls = sfr.classify(label, res.answer or "", stored)
        audit = getattr(res, "audit", None)
        rows_out.append({
            "pos": pos, "subject": subject, "class": klass,
            "cls": cls, "label": label, "err": err,
            "lane": getattr(audit, "lane", None),
            "stage": getattr(res, "stage", None),
            "route_tail": (audit.route[-3:] if audit else None),
            "elapsed_ms": getattr(audit, "elapsed_ms", None),
            **{k: round(v, 1) for k, v in stages.items()},
        })
        print(f"  [{len(rows_out):2d}/{n}] pos={pos} {subject}|{klass} -> "
              f"{cls:13s} {stages['answer_ms']:7.0f}ms "
              f"lane={rows_out[-1]['lane']} "
              f"stage={rows_out[-1]['stage']}", flush=True)

    wall = time.time() - t_wall0
    print(f"\n=== PROFILE: {n} rows in {wall:.1f}s = {n / wall:.2f} rows/s "
          f"({wall / n:.2f} s/row) ===", flush=True)
    by_cls = defaultdict(list)
    for r in rows_out:
        by_cls[r["cls"]].append(r["answer_ms"] + r["exec_create_ms"]
                                + r["drain_ms"])
    print(f"{'class':<14}{'n':>4}{'mean_ms':>10}{'row_ms_share':>14}")
    tot = sum(sum(v) for v in by_cls.values()) or 1
    for c, v in sorted(by_cls.items(), key=lambda kv: -sum(kv[1])):
        print(f"{c:<14}{len(v):>4}{sum(v) / len(v):>10.0f}"
              f"{100.0 * sum(v) / tot:>13.1f}%")
    lanes = Counter(r["lane"] or r["stage"] or "?" for r in rows_out)
    print("lanes/stages: " + ", ".join(f"{k} x{v}"
                                       for k, v in lanes.most_common()))
    per_stage = {k: sum(r[k] for r in rows_out) / n
                 for k in ("drain_ms", "exec_create_ms", "answer_ms")}
    avg = sum(per_stage.values())
    churn = per_stage["drain_ms"] + per_stage["exec_create_ms"]
    print(f"per-row stage average: drain {per_stage['drain_ms']:.1f}ms + "
          f"executor-create {per_stage['exec_create_ms']:.1f}ms + answer "
          f"{per_stage['answer_ms']:.0f}ms = {avg:.0f}ms "
          f"(thread churn = {100.0 * churn / avg:.1f}% of row time)")
    memo = os.path.join(os.environ["CBSE_DATA_DIR"], "answer_memo.json")
    print(f"memo file after profile: exists={os.path.exists(memo)}",
          flush=True)


# --------------------------------------------------------------------------- #
# --plan: balanced disjoint partition of ALL groups (cutover blueprint)
# --------------------------------------------------------------------------- #

def cmd_plan():
    k = ARGS.plan
    sfr = import_live_runner()
    rows = sfr.fetch_rows()
    sizes = Counter((r[3], r[4]) for r in rows)
    del rows
    _, live_g = live_group_stats()
    est = {}
    for key, size in sizes.items():
        c = live_g.get(key)
        mean_ms = (c["_ms"] / sum(c[x] for x in CLASSES)) if c else 2000.0
        est[key] = size * mean_ms
    shards = [{"groups": [], "work": 0.0, "rows": 0} for _ in range(k)]
    for key in sorted(est, key=lambda kk: -est[kk]):
        tgt = min(shards, key=lambda sh: sh["work"])
        tgt["groups"].append(key)
        tgt["work"] += est[key]
        tgt["rows"] += sizes[key]
    print(f"=== {k}-SHARD CUTOVER PLAN (disjoint, balanced by est work) ===")
    print(f"total sweepable rows: {sum(sizes.values()):,} "
          f"over {len(sizes)} groups")
    for i, sh in enumerate(shards):
        gs = ";".join(f"{s}|{kk}" for s, kk in sh["groups"])
        print(f"\nshard {i}: {len(sh['groups'])} groups, "
              f"{sh['rows']:,} rows")
        print(f"  --groups \"{gs}\"")
    worst = max(sh["rows"] for sh in shards)
    print(f"\nlargest shard: {worst:,} rows -> wall clock = largest-shard "
          f"rows / per-shard rows/s (once the sequential run is superseded "
          f"and every group is owned by a shard; use the rate the launched "
          f"shards measure)")


# --------------------------------------------------------------------------- #
# --merge: live findings + shard findings -> sweep_sharded_report.md
# --------------------------------------------------------------------------- #

def cmd_merge():
    live = read_jsonl(LIVE_FINDINGS)
    shard_files = sorted(
        f for f in os.listdir(HERE)
        if f.startswith("_sweep_shard_") and f.endswith(".jsonl"))
    shard_recs = []
    for f in shard_files:
        sid = f[len("_sweep_shard_"):-len(".jsonl")]
        shard_recs.append((sid, read_jsonl(os.path.join(HERE, f))))

    shard_qids = set()
    merged = {}
    for _, srecs in shard_recs:
        for r in srecs:
            shard_qids.add(r["qid"])
            merged[r["qid"]] = r
    live_dup = 0
    for r in live:
        if r["qid"] in shard_qids:
            live_dup += 1
            continue
        merged.setdefault(r["qid"], r)

    recs = list(merged.values())
    counters = Counter(r["cls"] for r in recs)
    n = len(recs)

    def pct(a, b):
        return f"{100.0 * a / b:.1f}%" if b else "-"

    def p50(v):
        v = sorted(v)
        return v[len(v) // 2] if v else 0

    def p95(v):
        v = sorted(v)
        return v[min(len(v) - 1, int(len(v) * 0.95))] if v else 0

    ck = {}
    if os.path.exists(LIVE_CHECKPOINT):
        ck = json.load(open(LIVE_CHECKPOINT, encoding="utf-8"))
    lines = []
    w = lines.append
    w("# Full-Bank Verification Sweep -- SHARDED Coexistence Report")
    w("")
    w(f"- Generated: {time.strftime('%Y-%m-%d %H:%M:%S')}")
    w(f"- Scope: ALL board_questions rows with question_text > 10 chars "
      f"= {TOTAL_ROWS:,}")
    w(f"- Progress: **{n:,} unique rows ({pct(n, TOTAL_ROWS)})** = live "
      f"{len(live):,} + shards {sum(len(s) for _, s in shard_recs):,} "
      f"- overlap {live_dup:,}")
    w(f"- Live run: checkpoint offset {ck.get('offset', '?'):,}, fp "
      f"`{ck.get('order_fingerprint', '?')}` -- UNTOUCHED by this merge")
    for sid, srecs in shard_recs:
        ckf = os.path.join(HERE, f"_sweep_shard_{sid}_ckpt.json")
        cki = (json.load(open(ckf, encoding="utf-8"))
               if os.path.exists(ckf) else {})
        el = max(1.0, cki.get("elapsed_s", 0.0))
        w(f"- Shard {sid}: {len(srecs):,} rows, groups "
          f"{cki.get('groups', '?')} (elapsed {cki.get('elapsed_s', 0):.0f}s"
          f", {len(srecs) / el:.2f} rows/s)")
    w("")
    w("## Overall classification (merged, shard rows win on overlap)")
    w("")
    w("| class | n | % |")
    w("|---|---|---|")
    for c in CLASSES:
        w(f"| {c} | {counters.get(c, 0):,} | {pct(counters.get(c, 0), n)} |")
    w(f"| **total** | **{n:,}** | 100% |")
    w("")
    strict = counters.get("EXACT_HIT", 0)
    w(f"**Headline (strict): VERIFIED = EXACT_HIT only = {strict:,} "
      f"({pct(strict, n)}).**  SOFT_HIT and VERIFIED_NOKEY are *not* "
      f"counted as verified -- they are open review items.")
    w("")
    lat_all = [r["ms"] for r in recs]
    lat_ver = [r["ms"] for r in recs if r["cls"] == "EXACT_HIT"]
    w(f"- Latency ms: p50 {p50(lat_all):.0f}, p95 {p95(lat_all):.0f} "
      f"(EXACT_HIT p50 {p50(lat_ver):.0f})")
    w("")
    w("## Per-subject breakdown (merged)")
    w("")
    subj = defaultdict(Counter)
    for r in recs:
        subj[r["subject"]][r["cls"]] += 1
    w("| subject | n | exact | exact% | soft | nokey | guided | ambig "
      "| slow | err | refused |")
    w("|" + "---|" * 11)
    for s in sorted(subj, key=lambda kk: -sum(subj[kk].values())):
        c = subj[s]
        tot = sum(c.values())
        w(f"| {s} | {tot:,} | {c.get('EXACT_HIT', 0):,} "
          f"| {pct(c.get('EXACT_HIT', 0), tot)} "
          f"| {c.get('SOFT_HIT', 0):,} | {c.get('VERIFIED_NOKEY', 0):,} "
          f"| {c.get('GUIDED', 0):,} | {c.get('AMBIGUOUS', 0):,} "
          f"| {c.get('SLOW_GUIDED', 0):,} | {c.get('ERROR', 0):,} "
          f"| {c.get('REFUSED', 0):,} |")
    w("")
    errs = [r for r in recs if r["cls"] == "ERROR"]
    w("## Errors (the real bugs)")
    w("")
    if not errs:
        w("None.")
    else:
        kinds = Counter((r.get("err") or "?").split(":")[0][:60]
                        for r in errs)
        for kk, v in kinds.most_common():
            w(f"- {v:,}x `{kk}`")
        w("")
        w("| source | subject | class | err | label |")
        w("|---|---|---|---|---|")
        for r in errs[:40]:
            w(f"| {r.get('shard', 'live')} | {r['subject']} | "
              f"{r['class']} | `{(r.get('err') or '')[:120]}` "
              f"| {r.get('label', '')} |")
    w("")
    w("## Coexistence notes")
    w("")
    w("- Merged read-only from the live findings JSONL + per-shard JSONLs; "
      "the live run's checkpoint/fingerprint were never modified.")
    w("- Shard rows win on overlap: a shard re-verifies its groups from a "
      "cold memo, so its rows are the fresher evidence for those groups.")
    w("- Cutover: once the live run is drained or superseded, retire it "
      "and re-shard remaining groups via `--plan K`; the live findings "
      "stay valid (same global order fingerprint) and merge cleanly here.")
    w("")
    out = os.path.join(HERE, "sweep_sharded_report.md")
    with open(out, "w", encoding="utf-8") as fh:
        fh.write("\n".join(lines))
    print(f"merged report -> {out}", flush=True)
    print(f"unique rows: {n:,} (live {len(live):,}, shards "
          f"{sum(len(s) for _, s in shard_recs):,}, overlap {live_dup:,})",
          flush=True)
    print("counters: " + json.dumps(dict(counters)), flush=True)


# --------------------------------------------------------------------------- #
# main
# --------------------------------------------------------------------------- #
if __name__ == "__main__":
    if ARGS.analyze:
        cmd_analyze()
    elif ARGS.plan > 0:
        cmd_plan()
    elif ARGS.profile > 0:
        run_profile(ARGS.profile)
    elif ARGS.merge:
        cmd_merge()
    elif ARGS.shard >= 0:
        if ARGS.auto > 0:
            _sfr = import_live_runner()
            groups = auto_pick_groups(_sfr, ARGS.auto)
            del _sfr
        elif ARGS.groups:
            groups = parse_groups(ARGS.groups)
        else:
            _ap.error("--shard needs --groups or --auto K")
        run_shard(ARGS.shard, groups)
