"""Cross-encoder threshold calibration harness for semantic_qa.

Three populations over 60 sampled indexed questions:
  POS  — a hand-authored paraphrase of the question (must be accepted)
  NEG-U — an unrelated question from another subject (must be rejected)
  NEG-T — a different question from the SAME subject (hard negative,
          often a numeric twin — must be rejected)

Replicates SemanticQA.query()'s recall+rerank verbatim (RECALL_K=20,
RECALL_MIN_SCORE=0.35) but records the raw best rerank score regardless
of RERANK_ACCEPT, so the threshold can be read off the distributions.
Run with CUDA hidden: production serves on CPU.
"""
import json
import os
import random
import sys
import time

os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
sys.path.insert(0, r"D:\platform\deploy")
sys.path.insert(0, r"D:\platform\deploy\backend")

BASE = os.path.dirname(os.path.abspath(__file__))

pw = [l.strip().split("=", 1)[1]
      for l in open(r"D:\platform\deploy\.env", encoding="utf-8")
      if l.startswith("POSTGRES_PASSWORD=")][0]
import psycopg2

conn = psycopg2.connect(host="127.0.0.1", port=5432, dbname="dream_app",
                        user="dream_user", password=pw)
cur = conn.cursor()

sample = json.load(open(os.path.join(BASE, "_calib_sample.json"),
                        encoding="utf-8"))
paras = json.load(open(os.path.join(BASE, "_calib_paraphrases.json"),
                       encoding="utf-8"))

# --- resolve each sample's qid + fetch the two negative probes -------- #
items = []
rng = random.Random(11)
for s in sample:
    cur.execute(
        "SELECT id FROM board_questions WHERE left(question_text, 400)=%s "
        "AND correct_answer IS NOT NULL LIMIT 1", (s["q"],))
    row = cur.fetchone()
    if not row:
        print("SKIP no qid:", s["i"]); continue
    qid = str(row[0])
    # NEG-U: unrelated, different subject, different text head
    cur.execute(
        "SELECT id, question_text FROM board_questions "
        "WHERE subject <> %s AND length(question_text) > 40 "
        "AND correct_answer IS NOT NULL AND correct_answer <> '' "
        "AND left(question_text, 60) <> left(%s, 60) "
        "ORDER BY random() LIMIT 1", (s["subject"], s["q"]))
    un = cur.fetchone()
    # NEG-T: same subject (and class), different text head
    cur.execute(
        "SELECT id, question_text FROM board_questions "
        "WHERE subject=%s AND class_level=%s AND length(question_text) > 40 "
        "AND correct_answer IS NOT NULL AND correct_answer <> '' "
        "AND left(question_text, 60) <> left(%s, 60) "
        "ORDER BY random() LIMIT 1", (s["subject"], s["class"], s["q"]))
    tw = cur.fetchone()
    if not (un and tw):
        print("SKIP no negative:", s["i"]); continue
    items.append({"i": s["i"], "qid": qid, "subject": s["subject"],
                  "paraphrase": paras[str(s["i"])],
                  "neg_u": un[1][:600], "neg_u_qid": str(un[0]),
                  "neg_t": tw[1][:600], "neg_t_qid": str(tw[0])})
conn.close()
print(f"items: {len(items)}", flush=True)

# --- models (identical to semantic_qa) -------------------------------- #
from backend.its.solver.semantic_qa import (_st, _ce, _qdrant, COLLECTION,
                                            RECALL_K, RECALL_MIN_SCORE)
t0 = time.time()
st, ce, qc = _st(), _ce(), _qdrant()
print(f"models loaded in {time.time()-t0:.1f}s", flush=True)

# --- production guard chain (2026-10-04) ------------------------------- #
# The threshold alone is not the lane's verdict: query() also runs the
# context, digit-subset, role and word-twin-ceiling guards — and, once
# shipped, the skeleton slot gate.  Record the full-chain verdict per
# probe so accept-rate is comparable threshold-only vs full chain and
# before vs after the slot gate.  (Results go to _calib_results_guards
# .json; the pinned 2026-10-03 _calib_results.json is left untouched.)
import backend.its.solver.semantic_qa as _sq
_SLOT_GATE = getattr(_sq, "_slot_gate_allows", None)   # None BEFORE the fix
print(f"slot gate present: {_SLOT_GATE is not None}", flush=True)


def guard_verdict(text, hit):
    """(ok, reason) for the production guard chain on the best hit —
    mirrors SemanticQA.query() verbatim (authoritative full-row text
    first, same guard order, same fail directions)."""
    pl = hit.payload or {}
    row = _sq._full_row(pl.get("qid", "")) or {}
    matched = row.get("q") or pl.get("q", "") or ""
    if _sq._context_conflict("", 0, "", row):
        return False, "ctx"
    sk_q, sk_m = _sq._digit_tokens(text), _sq._digit_tokens(matched)
    if sk_q and not _sq._digits_subset(sk_q, sk_m):
        return False, "digits"
    if _sq._roles_conflict(_sq._role_pairs(text), _sq._role_pairs(matched)):
        return False, "role"
    if _sq._twin_refusal(_sq._word_tokens(text), _sq._word_tokens(matched),
                         sk_q, sk_m):
        return False, "words"
    if _SLOT_GATE is not None and not _SLOT_GATE(text, matched,
                                                 pl.get("slots")):
        return False, "slots"
    return True, ""


def probe2(text, want_qid):
    v = st.encode([text], normalize_embeddings=True)[0]
    # The board backfill runs concurrently against this collection and
    # can starve searches into server-side 60s timeouts (500).  Retry —
    # calibration must ride out transient saturation.
    resp = None
    for attempt in range(5):
        try:
            resp = qc.query_points(COLLECTION, query=list(v), limit=RECALL_K,
                                   score_threshold=RECALL_MIN_SCORE)
            break
        except Exception as exc:
            if attempt == 4:
                raise
            print(f"  qdrant retry {attempt + 1}: {str(exc)[:120]}",
                  flush=True)
            time.sleep(20)
    hits = resp.points
    if not hits:
        return {"recall_miss": True}
    pairs = [(text, h.payload.get("q", "")) for h in hits]
    scores = ce.predict(pairs, batch_size=16)
    best_i = max(range(len(hits)), key=lambda i: scores[i])
    orig_scores = [round(float(s), 4) for i, s in enumerate(scores)
                   if str(hits[i].payload.get("qid")) == str(want_qid)]
    g_ok, g_reason = guard_verdict(text, hits[best_i])
    return {"recall_miss": False,
            "best": round(float(scores[best_i]), 4),
            "best_qid": str(hits[best_i].payload.get("qid")),
            "best_recall": round(float(hits[best_i].score), 4),
            "orig_in_hits": bool(orig_scores),
            "orig_best": max(orig_scores) if orig_scores else None,
            "n_hits": len(hits),
            "guards_ok": g_ok,
            "guard_reason": g_reason}


results = {"pos": [], "neg_u": [], "neg_t": []}
t0 = time.time()
for k, it in enumerate(items):
    for pop, text, want in (("pos", it["paraphrase"], it["qid"]),
                            ("neg_u", it["neg_u"], it["neg_u_qid"]),
                            ("neg_t", it["neg_t"], it["neg_t_qid"])):
        r = probe2(text, want)
        r["i"] = it["i"]; r["subject"] = it["subject"]
        results[pop].append(r)
    if (k + 1) % 10 == 0:
        print(f"  {k+1}/{len(items)} done ({time.time()-t0:.0f}s)", flush=True)

json.dump(results, open(os.path.join(BASE, "_calib_results_guards.json"),
                        "w"), indent=1)


def dist(vals):
    if not vals:
        return "n/a"
    v = sorted(vals)
    n = len(v)
    def pct(p):
        return v[min(n - 1, int(p * n))]
    return (f"min={v[0]:.3f} p05={pct(0.05):.3f} p25={pct(0.25):.3f} "
            f"med={pct(0.5):.3f} p75={pct(0.75):.3f} p95={pct(0.95):.3f} "
            f"max={v[-1]:.3f}")


print("\n=== POPULATIONS (best cross-encoder score per query) ===")
for pop, label in (("pos", "POS paraphrase"), ("neg_u", "NEG unrelated"),
                   ("neg_t", "NEG same-subject")):
    rs = results[pop]
    missed = [r for r in rs if r.get("recall_miss")]
    print(f"{label}: n={len(rs)} recall_miss={len(missed)}")
    print("  ", dist([r["best"] for r in rs if not r.get("recall_miss")]))

print("\n=== ACCEPT-RATE at RERANK_ACCEPT=3.0 (raw vs full guard chain) ===")
from collections import Counter as _Counter
for pop, label in (("pos", "POS paraphrase"), ("neg_u", "NEG unrelated"),
                   ("neg_t", "NEG same-subject")):
    rs = [r for r in results[pop] if not r.get("recall_miss")]
    n = len(rs)
    raw = sum(1 for r in rs if r["best"] >= 3.0)
    chain = sum(1 for r in rs if r["best"] >= 3.0 and r.get("guards_ok"))
    reasons = _Counter(r.get("guard_reason") for r in rs
                       if r["best"] >= 3.0 and not r.get("guards_ok"))
    print(f"{label}: n={n} raw_accept={raw}/{n} ({raw/max(1,n)*100:.1f}%)  "
          f"full_chain_accept={chain}/{n} ({chain/max(1,n)*100:.1f}%)  "
          f"guard_refusals={dict(reasons)}")
orig_hit = [r for r in results["pos"]
            if not r.get("recall_miss") and r.get("orig_in_hits")]
print(f"\nPOS: original question recalled in top-20: "
      f"{len(orig_hit)}/{len(results['pos'])}")
orig_best = [r for r in orig_hit if r["best_qid"] == str(
    [it['qid'] for it in items if it['i'] == r['i']][0])]
print(f"POS: original question was the TOP hit: {len(orig_best)}/{len(orig_hit)}")
