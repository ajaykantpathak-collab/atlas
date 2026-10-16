"""ENGINE-CERT 1 — ZERO-LLM PROOF at sweep scale.

Three modes, each a FRESH process:

  clean      LLM keys UNSET (FREELLM_API_KEY / GEMINI_API_KEY removed
             from the environment).  The pipeline runs with whatever the
             policy gates decide with no key material present.
  poisoned   both keys set to "POISONED-SENTINEL-KEY" AND an in-process
             tripwire patched over EVERY LLM client entrypoint
             (services.llm_client.LLMClient.chat and
             ai.llm_client.LLMClient.chat): any attempt is recorded
             (with its call stack) and raises RuntimeError on the spot,
             so no LLM content can physically enter the pipeline --
             not even an error string.
  compare    diffs the two result files and prints the proof.

Everything else is held constant: same 200-question sample
(_engine_cert_sample.json, 20 subjects x 10 rows), same env base
(CBSE_DATA_DIR -> per-run temp dir so the official-key sqlite lookup
works and the unanswered-question queue is NOT polluted), SOLVER_LLM_MODE
unset (config default parse_only, the production posture), semantic lane
on (local models only).
"""

import json
import os
import shutil
import sys
import tempfile
import time
import traceback

sys.path.insert(0, r"D:\platform\deploy")
sys.path.insert(0, r"D:\platform\deploy\backend")

HERE = os.path.dirname(os.path.abspath(__file__))
SAMPLE = os.path.join(HERE, "_engine_cert_sample.json")
SENTINEL = "POISONED-SENTINEL-KEY"

MODE = sys.argv[1] if len(sys.argv) > 1 else "compare"

# ------------------------------------------------------------------ #
# 1. Environment posture — BEFORE any backend import.
#    (backend/config.py does NOT load .env into os.environ; the docker
#    compose env is the only key source in production, so popping /
#    poisoning os.environ here is authoritative.)
# ------------------------------------------------------------------ #
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
# production parity: the model_hub singleton caps torch at 1 thread
os.environ.setdefault("TORCH_NUM_THREADS", "1")
# semantic lane ON (default) — local models only, part of the answer path
os.environ.setdefault("SEMANTIC_QA_LANE", "1")
# NOTE: SOLVER_LLM_MODE deliberately UNSET -> policy default (config
# solver_llm_mode = parse_only), i.e. the production posture.

# per-run isolated CBSE_DATA_DIR: official-key sqlite lookup still works
# (question_bank.db copied), the answer_queue.jsonl writes are quarantined
_DATA_DIR = tempfile.mkdtemp(prefix=f"engine_cert1_{MODE}_")
shutil.copy(os.path.join(r"D:\platform\runtime_data", "question_bank.db"),
            os.path.join(_DATA_DIR, "question_bank.db"))
os.environ["CBSE_DATA_DIR"] = _DATA_DIR

if MODE == "clean":
    # PIN EMPTY STRINGS, do not just pop: services/llm_client.py calls
    # load_dotenv(..., override=False) AT IMPORT TIME, so a popped key
    # is silently RESTORED from deploy/.env (real key material) the
    # moment the tripwire install imports the client module.  An empty
    # string counts as "already set" for override=False (dotenv skips
    # it) AND is falsy for the canonicalizer's
    # `if not (os.environ.get("FREELLM_API_KEY") or os.environ.get(
    #  "GEMINI_API_KEY")): return None` gate — so this is the only
    # posture that genuinely holds "no key material in the process".
    os.environ["FREELLM_API_KEY"] = ""
    os.environ["GEMINI_API_KEY"] = ""
    os.environ["LLM_API_KEY"] = ""
elif MODE == "poisoned":
    # sentinel beats dotenv too: override=False never overwrites a
    # pre-existing value, so the sentinel survives the import and the
    # gate passes (truthy) — any downstream call hits the tripwire.
    os.environ["FREELLM_API_KEY"] = SENTINEL
    os.environ["GEMINI_API_KEY"] = SENTINEL
    os.environ["LLM_API_KEY"] = SENTINEL

# ------------------------------------------------------------------ #
# 2. LLM tripwire — installed before the pipeline can run.
# ------------------------------------------------------------------ #
ATTEMPTS = []


def _trip(site):
    def chat(self, *a, **k):
        stack = [f.rstrip() for f in traceback.format_stack()[-5:-1]]
        ATTEMPTS.append({"site": site, "t": round(time.time(), 3),
                         "frames": stack})
        raise RuntimeError(
            f"CERT-1 TRIPWIRE [{site}]: LLM call attempted under "
            f"poisoned keys — this exception IS the loud failure")
    return chat


def _install_tripwires():
    patched = []
    import backend.services.llm_client as slc
    slc.LLMClient.chat = _trip("services.llm_client.LLMClient.chat")
    patched.append("services.llm_client.LLMClient.chat")
    try:
        import backend.ai.llm_client as alc
        alc.LLMClient.chat = _trip("ai.llm_client.LLMClient.chat")
        patched.append("ai.llm_client.LLMClient.chat")
    except Exception as exc:
        print(f"[tripwire] ai.llm_client not patched: {exc}")
    return patched


# ------------------------------------------------------------------ #
# 3. Run / compare
# ------------------------------------------------------------------ #
if MODE in ("clean", "poisoned"):
    import logging
    logging.disable(logging.CRITICAL)  # keep run logs readable

    patched = _install_tripwires()
    from backend.its.solver.answer_pipeline import answer  # noqa: E402

    data = json.load(open(SAMPLE, encoding="utf-8"))
    questions = data["questions"]
    assert len(questions) == 200

    records = []
    t_all = time.perf_counter()
    for i, q in enumerate(questions):
        r = answer(q["question"])
        records.append({
            "qid": q["qid"], "subject": q["subject"],
            "class_level": q["class_level"],
            "label": r.label,
            "answer": r.answer,
            "numeric": r.numeric,
            "refusal_reason": r.refusal_reason,
            "lane": r.audit.lane,
            "route": list(r.audit.route),
            "gates": list(r.audit.gates_passed),
            "anchor": r.audit.anchor,
            "stage": getattr(r, "stage", None),
            "wall_ms": round((time.perf_counter() - t_all) * 0 + 0, 1),
        })
        records[-1]["wall_ms"] = None  # wall time tracked below
    # simpler: re-run loop is wasteful; measure per-question inline below
    # (kept single loop; wall_ms recorded properly here)
    records = []
    ATTEMPTS_AT = []
    for i, q in enumerate(questions):
        t0 = time.perf_counter()
        r = answer(q["question"])
        wall = (time.perf_counter() - t0) * 1000.0
        records.append({
            "qid": q["qid"], "subject": q["subject"],
            "class_level": q["class_level"],
            "label": r.label,
            "answer": r.answer,
            "numeric": r.numeric,
            "refusal_reason": r.refusal_reason,
            "lane": r.audit.lane,
            "route": list(r.audit.route),
            "gates": list(r.audit.gates_passed),
            "anchor": r.audit.anchor,
            "stage": getattr(r, "stage", None),
            "wall_ms": round(wall, 1),
        })
        ATTEMPTS_AT.append(len(ATTEMPTS))

    out = os.path.join(HERE, f"_engine_cert1_results_{MODE}.json")
    labs = {}
    for rec in records:
        labs[rec["label"]] = labs.get(rec["label"], 0) + 1
    json.dump({"mode": MODE, "patched": patched,
               "sentinel": SENTINEL if MODE == "poisoned" else None,
               "llm_attempts": ATTEMPTS,
               "llm_attempts_at": ATTEMPTS_AT,
               "label_counts": labs,
               "records": records},
              open(out, "w", encoding="utf-8"), ensure_ascii=True)
    print(f"[{MODE}] n={len(records)} labels={labs} "
          f"llm_attempts={len(ATTEMPTS)} -> {out}")
    if ATTEMPTS:
        sites = {}
        for a in ATTEMPTS:
            key = (a["site"], a["frames"][-1][:120] if a["frames"] else "?")
            sites[key] = sites.get(key, 0) + 1
        for (site, frame), n in sorted(sites.items(), key=lambda x: -x[1]):
            print(f"  {n:4d}x {site} <- {frame}")

elif MODE == "compare":
    a = json.load(open(os.path.join(HERE, "_engine_cert1_results_clean.json"),
                       encoding="utf-8"))
    b = json.load(open(os.path.join(HERE,
                                    "_engine_cert1_results_poisoned.json"),
                        encoding="utf-8"))
    ra, rb = a["records"], b["records"]
    assert len(ra) == len(rb) == 200
    assert all(x["qid"] == y["qid"] for x, y in zip(ra, rb)), \
        "sample mismatch — the two runs solved different question lists"

    prim = sec = 0
    diffs = []
    for x, y in zip(ra, rb):
        p = (x["label"], x["answer"], x["numeric"])
        p2 = (y["label"], y["answer"], y["numeric"])
        s = (x["refusal_reason"], x["lane"], x["route"], x["gates"],
             x["anchor"], x["stage"])
        s2 = (y["refusal_reason"], y["lane"], y["route"], y["gates"],
              y["anchor"], y["stage"])
        if p != p2:
            prim += 1
            diffs.append({"qid": x["qid"], "subject": x["subject"],
                          "clean": p, "poisoned": p2})
        elif s != s2:
            sec += 1
            diffs.append({"qid": x["qid"], "subject": x["subject"],
                          "primary_equal": True,
                          "clean_meta": s, "poisoned_meta": s2})

    per_subject = {}
    for x, y in zip(ra, rb):
        ok = (x["label"], x["answer"], x["numeric"]) == \
             (y["label"], y["answer"], y["numeric"])
        d = per_subject.setdefault(x["subject"], [0, 0])
        d[0] += 1
        d[1] += (0 if ok else 1)

    summary = {
        "n": 200,
        "primary_mismatches": prim,
        "secondary_mismatches": sec,
        "clean_llm_attempts": len(a["llm_attempts"]),
        "poisoned_llm_attempts": len(b["llm_attempts"]),
        "clean_labels": a["label_counts"],
        "poisoned_labels": b["label_counts"],
        "per_subject": per_subject,
        "diffs": diffs[:40],
    }
    json.dump(summary, open(os.path.join(HERE,
                                         "_engine_cert1_compare.json"),
                            "w", encoding="utf-8"), ensure_ascii=True,
              indent=1)
    print(f"PRIMARY (label, answer, numeric) mismatches: {prim}/200")
    print(f"SECONDARY (route/gates/anchor) mismatches:   {sec}/200")
    print(f"LLM attempts  clean={len(a['llm_attempts'])}  "
          f"poisoned={len(b['llm_attempts'])}")
    print(f"labels clean     : {a['label_counts']}")
    print(f"labels poisoned  : {b['label_counts']}")
    bad = {s: v for s, v in per_subject.items() if v[1]}
    print(f"subjects with diffs: {bad if bad else 'NONE'}")
    for d in diffs[:10]:
        print(f"  DIFF {d['qid']} {d['subject']}: "
              f"{d.get('clean') or d.get('clean_meta')!r} vs "
              f"{d.get('poisoned') or d.get('poisoned_meta')!r}")

else:
    raise SystemExit("mode must be clean | poisoned | compare")
