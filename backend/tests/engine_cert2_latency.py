"""ENGINE-CERT 2 — LATENCY certification for the answer pipeline.

Modes (each a FRESH process):

  warm   Prewarm (model_hub load_sync + one throwaway solve so DB pool,
         bank cache, qdrant collection and the semantic models are hot),
         then time 100 solves through answer() — 10 subjects x 10 bank
         rows from _engine_cert_sample.json's latency_pairs.  Prints a
         per-subject p50/p95/p99 table and overall stats, writes
         _engine_cert2_warm.json.

  cold   Fresh-process time-to-first-verified-answer: t0 at interpreter
         start (script entry), then import the pipeline, then answer()
         a question known to verify.  Reports import_ms, call_ms and
         total_ms, plus the truth label.  This is the independent check
         of SOLVE-PERF's 1.23 s cold-start claim.  Writes
         _engine_cert2_cold.json (appends; runs are keyed by pid).

  slow   Re-run only the questions whose warm wall_ms exceeded 3000,
         with per-stage instrumentation (bank pre-route, registry
         sweep, semantic embed/search/rerank) to root-cause the tail.

Same env posture as cert 1: no LLM keys, SOLVER_LLM_MODE unset
(production parse_only default), semantic lane on, TORCH_NUM_THREADS=1
(the model_hub singleton production posture).
"""

import json
import os
import sys
import time

sys.path.insert(0, r"D:\platform\deploy")
sys.path.insert(0, r"D:\platform\deploy\backend")

HERE = os.path.dirname(os.path.abspath(__file__))
SAMPLE = os.path.join(HERE, "_engine_cert_sample.json")

MODE = sys.argv[1] if len(sys.argv) > 1 else "warm"

_PW = [l.strip().split("=", 1)[1]
       for l in open(r"D:\platform\deploy\.env", encoding="utf-8")
       if l.startswith("POSTGRES_PASSWORD=")][0]
os.environ.setdefault(
    "DATABASE_URL",
    f"postgresql+asyncpg://dream_user:{_PW}@127.0.0.1:5432/dream_app")
os.environ.setdefault("PLATFORM_DATABASE_URL", os.environ["DATABASE_URL"])
os.environ.setdefault(
    "PLATFORM_JWT_SECRET", "0123456789abcdef0123456789abcdef0123")
os.environ.setdefault(
    "REDIS_URL",
    "redis://:at_mj93IR9URGYEIPaXGikkewwxkUBBiFBW@127.0.0.1:16379/0")
os.environ.setdefault("PLATFORM_REDIS_URL", os.environ["REDIS_URL"])
os.environ.setdefault("NEO4J_URI", "bolt://127.0.0.1:7688")
os.environ.setdefault("QDRANT_URL", "http://127.0.0.1:6333")
os.environ.setdefault("PLATFORM_ENV", "development")
os.environ.setdefault("TORCH_NUM_THREADS", "1")
os.environ.setdefault("SEMANTIC_QA_LANE", "1")
for k in ("FREELLM_API_KEY", "GEMINI_API_KEY", "LLM_API_KEY"):
    os.environ.pop(k, None)          # zero-LLM posture during timing too
os.environ["CBSE_DATA_DIR"] = os.path.join(
    HERE, "_engine_cert2_datadir")   # stable per-host dir, queue quarantined
os.makedirs(os.environ["CBSE_DATA_DIR"], exist_ok=True)

T0 = time.perf_counter()             # interpreter-start proxy (script entry)

if MODE == "warm":
    import logging
    logging.disable(logging.CRITICAL)
    from backend.its.solver.answer_pipeline import answer
    data = json.load(open(SAMPLE, encoding="utf-8"))
    pairs = [tuple(p) for p in data["latency_pairs"]]
    lat_qs = [q for q in data["questions"]
              if (q["subject"], q["class_level"]) in pairs]
    assert len(lat_qs) == 100, f"expected 100 latency questions, got {len(lat_qs)}"

    # ---- prewarm (NOT timed) ----
    t_pre = time.perf_counter()
    try:
        from backend.ai import model_hub
        model_hub.load_sync()        # embedder + cross-encoder, thread-capped
    except Exception as exc:
        print(f"[prewarm] model_hub load issue: {exc}")
    answer(lat_qs[0]["question"])    # DB pool, bank cache, qdrant warm
    pre_ms = (time.perf_counter() - t_pre) * 1000
    print(f"[prewarm] done in {pre_ms:.0f} ms")

    records = []
    for q in lat_qs:
        t0 = time.perf_counter()
        r = answer(q["question"])
        wall = (time.perf_counter() - t0) * 1000.0
        records.append({
            "qid": q["qid"], "subject": q["subject"],
            "class_level": q["class_level"], "wall_ms": round(wall, 1),
            "label": r.label,
            "audit_ms": r.audit.elapsed_ms,
            "stage": getattr(r, "stage", None),
            "lane": r.audit.lane,
        })

    def pct(sorted_vals, p):
        if not sorted_vals:
            return None
        k = max(0, min(len(sorted_vals) - 1,
                       int(round((p / 100.0) * (len(sorted_vals) + 0.5))) - 1))
        return sorted_vals[k]

    per_subj = {}
    for rec in records:
        per_subj.setdefault(rec["subject"], []).append(rec["wall_ms"])
    table = {}
    print(f"\n{'subject':8s} {'n':>3s} {'p50':>8s} {'p95':>8s} {'p99':>8s} "
          f"{'max':>8s}  verified")
    all_w = sorted(r["wall_ms"] for r in records)
    for subj in [p[0] for p in data["latency_pairs"]]:
        vals = sorted(per_subj.get(subj, []))
        labs = [r["label"] for r in records if r["subject"] == subj]
        ver = sum(1 for l in labs if l.startswith("VERIFIED"))
        table[subj] = {"n": len(vals), "p50": pct(vals, 50),
                       "p95": pct(vals, 95), "p99": pct(vals, 99),
                       "max": vals[-1] if vals else None,
                       "verified": ver}
        print(f"{subj:8s} {len(vals):3d} {table[subj]['p50']:8.1f} "
              f"{table[subj]['p95']:8.1f} {table[subj]['p99']:8.1f} "
              f"{table[subj]['max']:8.1f}  {ver}/{len(vals)}")
    print("-" * 60)
    print(f"{'OVERALL':8s} {len(all_w):3d} {pct(all_w,50):8.1f} "
          f"{pct(all_w,95):8.1f} {pct(all_w,99):8.1f} {all_w[-1]:8.1f}  "
          f"{sum(1 for r in records if r['label'].startswith('VERIFIED'))}"
          f"/{len(records)}")
    over = [(r["qid"], r["subject"], r["wall_ms"], r["label"], r["stage"])
            for r in records if r["wall_ms"] > 3000]
    print(f"\n>3s outliers: {len(over)}")
    for qid, subj, ms, lab, stg in over:
        print(f"  {qid} {subj} {ms:.0f}ms {lab} stage={stg}")
    json.dump({"mode": "warm", "prewarm_ms": round(pre_ms, 1),
               "table": table,
               "overall": {"n": len(all_w), "p50": pct(all_w, 50),
                           "p95": pct(all_w, 95), "p99": pct(all_w, 99),
                           "max": all_w[-1],
                           "mean": sum(all_w) / len(all_w)},
               "outliers_gt3s": over, "records": records},
              open(os.path.join(HERE, "_engine_cert2_warm.json"), "w",
                   encoding="utf-8"), indent=1)
    print(f"\n-> _engine_cert2_warm.json")

elif MODE == "cold":
    import logging
    logging.disable(logging.CRITICAL)
    t_import0 = time.perf_counter()
    from backend.its.solver.answer_pipeline import answer
    import_ms = (time.perf_counter() - t_import0) * 1000

    data = json.load(open(SAMPLE, encoding="utf-8"))
    q = data["questions"][0]          # math c10 case-based; known verifier
    t_call0 = time.perf_counter()
    r = answer(q["question"])
    call_ms = (time.perf_counter() - t_call0) * 1000
    total_ms = (time.perf_counter() - T0) * 1000
    out = {"mode": "cold", "pid": os.getpid(),
           "qid": q["qid"], "subject": q["subject"],
           "import_ms": round(import_ms, 1), "call_ms": round(call_ms, 1),
           "total_ms": round(total_ms, 1), "label": r.label,
           "stage": getattr(r, "stage", None), "lane": r.audit.lane}
    path = os.path.join(HERE, "_engine_cert2_cold.json")
    runs = json.load(open(path, encoding="utf-8")) if \
        os.path.exists(path) else []
    runs = [x for x in runs if x.get("pid") != os.getpid()]
    runs.append(out)
    json.dump(runs, open(path, "w", encoding="utf-8"), indent=1)
    print(f"[cold] import={out['import_ms']}ms  call={out['call_ms']}ms  "
          f"total={out['total_ms']}ms  label={r.label} stage={out['stage']}")

elif MODE == "slow":
    # per-stage + profile attribution of the warm-run outliers
    import logging
    logging.disable(logging.CRITICAL)
    warm = json.load(open(os.path.join(HERE, "_engine_cert2_warm.json"),
                          encoding="utf-8"))
    data = json.load(open(SAMPLE, encoding="utf-8"))
    by_qid = {q["qid"]: q for q in data["questions"]}
    from backend.its.solver import answer_pipeline as ap
    from backend.its.solver import bank_answer as ba
    from backend.its.solver import semantic_qa as sq
    import cProfile, pstats, io

    # 1) time the semantic lane in isolation per outlier text
    # 2) cProfile the full answer() re-run; print top cumulative stages
    for rec in warm["records"]:
        if rec["wall_ms"] <= 3000:
            continue
        q = by_qid[rec["qid"]]
        t_e = time.perf_counter()
        try:
            sq.get_matcher().query(q["question"])
            sem_ms = (time.perf_counter() - t_e) * 1000
        except Exception:
            sem_ms = -1.0
        pr = cProfile.Profile()
        t0 = time.perf_counter()
        pr.enable()
        r = ap.answer(q["question"])
        pr.disable()
        wall = (time.perf_counter() - t0) * 1000
        s = io.StringIO()
        st = pstats.Stats(pr, stream=s).sort_stats("cumulative")
        st.print_stats(18)
        lines = [ln for ln in s.getvalue().splitlines()
                 if ln.strip()][:30]
        print(f"\n=== {rec['qid']} {rec['subject']} warm={rec['wall_ms']}ms "
              f"rerun={wall:.0f}ms label={r.label} stage={r.stage} "
              f"semantic_isolated={sem_ms:.0f}ms ===")
        for ln in lines[4:24]:
            print(ln[:150])
else:
    raise SystemExit("mode must be warm | cold | slow")
