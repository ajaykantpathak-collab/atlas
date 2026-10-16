"""test_bio_corpus_sweep.py -- chapter-sourced biology regression (owner
directive: same instrument as physics_corpus_sweep.py, biology contract).

Pulls REAL diagnostic questions + answer keys from the BIOLOGY corpus
(deploy/content/enhanced_nodes_md, c<cls>_bio* files, class-by-class:
9 -> 10 -> 11 -> 12), runs each through the live in-process pipeline and
grades with the biology honest-refusal contract:

  SOLVE        VERIFIED and the answer matches the corpus key
               (normalised containment or numeric equality)
  WRONG        VERIFIED but the answer contradicts the key  == THE BUG
  REFUSE_OK    honest guided refusal on a why/prose ask    == PASS
  COVERAGE     honest refusal on a factual MCQ/definition that HAS a
               corpus key                                   == FINDING
               (every one is a finding to fix, owner law)
  VERIFY_SOFT  VERIFIED with only weak key overlap -- flagged, judged
               by hand before being called a bug

Output: per-chapter summary + full JSONL for the fix ledger
(_bio_corpus_sweep_c<cls>.jsonl).  Resume: rows already present for the
class are skipped, so interrupted sweeps continue.

Run (from deploy/backend):
  PYTHONPATH=D:/platform/deploy SOLVER_LLM_MODE=off \
  python tests/test_bio_corpus_sweep.py 9
"""
import json
import os
import re
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))
os.environ.setdefault("SOLVER_LLM_MODE", "off")

CORPUS = os.environ.get(
    "BIO_SWEEP_CORPUS",
    os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                 "..", "content", "enhanced_nodes_md"))
# STEM-BM 2026-10-07: the ledger suffix separates CBSE and CISCE runs
# (and fresh re-runs) so resume never mixes corpora in one file.
OUT_SUFFIX = os.environ.get("BIO_SWEEP_SUFFIX", "")

_PROSE = re.compile(
    r"\b(why|explain|justify|describe|distinguish|differentiate|compare|"
    r"how\s+(?:do|does|did|is|are|can|come)|discuss|elaborate|write\s+a?\s*"
    r"note|give\s+an?\s+account|"
    # BIOMATH-FINISH 2026-10-08 (CISCE sweep): 'Evaluate the statement:'
    # is a judgement ask -- an honest refusal is the contract, not a
    # fact fragment (maths 'evaluate' means compute; biology's does not)
    r"evaluat\w*)\b", re.I)


def parse_diagnostics(path):
    """Extract (question, answer_key) pairs from a corpus .md file."""
    try:
        src = open(path, encoding="utf-8").read()
    except OSError:
        return []
    pairs = []
    for n in range(1, 7):
        mq = re.search(
            rf"## DIAGNOSTIC_QUESTION_{n}\s*\n(.*?)(?=\n## |\Z)", src, re.S)
        ma = re.search(
            rf"## DIAGNOSTIC_ANSWER_{n}\s*\n(.*?)(?=\n## |\Z)", src, re.S)
        if not mq or not ma:
            continue
        q = mq.group(1).strip()
        a = ma.group(1).strip()
        # the answer often carries a misconception tail after the key —
        # the key is the first 1-2 sentences up to "A wrong answer"
        a = re.split(r"\nA wrong answer|\nWrong answer:|\nStudents? (?:who|that) ",
                     a)[0].strip()
        if 15 <= len(q) <= 400 and 5 <= len(a) <= 600:
            pairs.append((q, a))
    return pairs


def is_prose(q):
    """Prose/reason asks: an honest REFUSE is the correct behaviour."""
    return bool(_PROSE.search(q))


def is_factual(q):
    """Factual MCQ / definition ask with a corpus key: must SOLVE."""
    return bool(re.search(
        r"\b(which|what|name|define|definition|identify|state|how many|"
        r"where|who|is\s+called|known\s+as|called|list|fill\s+in)\b", q, re.I))


def _norm(s):
    s = (s or "").lower()
    s = re.sub(r"[^a-z0-9.\-/ ]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def judge(q, key, label, ans):
    """Biology contract. Returns verdict string."""
    verified = label.startswith("VERIFIED")
    if verified:
        kn = re.search(r"-?\d[\d,]*(?:\.\d+)?", key)
        an = re.search(r"-?\d[\d,]*(?:\.\d+)?", ans)
        k = _norm(key)
        a = _norm(ans)
        if kn and an:
            ve = float(kn.group(0).replace(",", ""))
            va = float(an.group(0).replace(",", ""))
            if abs(va - ve) <= max(0.01, 0.02 * abs(ve)):
                return "SOLVE"
            # TRIVIAL-NUMBER RESCUE (STEM-BM 2026-10-07): keys whose
            # numbers are small enumerations ("1:1:1:1", counts <= 4)
            # are ratio TEXT, not the claimed quantity -- a verbatim
            # gamete/step answer contradicts nothing.  Fall through to
            # the word-overlap check instead of calling it WRONG.
            if max(ve, va) > 4:
                return "WRONG"
        elif k and k in a:
            return "SOLVE"
        # NAMING-ASK CONTAINMENT (BIOMATH-FINISH 2026-10-08): a short
        # verified answer fully contained in the key's text cannot
        # contradict it -- "Name the gland" -> "Pituitary" inside "The
        # master gland is the pituitary gland ..." is a SOLVE, not a
        # weak overlap (c8_bio_icse_03_014#d1)
        elif a and len(a.split()) <= 6 and a in k:
            return "SOLVE"
        kwords = [w for w in re.findall(r"[a-z]{4,}", key.lower())][:8]
        hit = sum(1 for w in kwords if w in ans.lower())
        if kwords and hit >= max(2, len(kwords) // 2):
            return "SOLVE"
        if kwords and hit == 0 and len(kwords) >= 3:
            return "WRONG"
        return "VERIFY_SOFT"
    if "GUIDED" in label or "REFUS" in label.lower() or "AMBIG" in label:
        if is_prose(q):
            return "REFUSE_OK"           # honest refusal on prose = PASS
        return "COVERAGE"                # refusal on a keyed factual
    return "OTHER"


def main():
    cls = int(sys.argv[1]) if len(sys.argv) > 1 else 9
    per_node = int(os.environ.get("PER_NODE", "3"))
    node_limit = int(os.environ.get("NODES_LIMIT", "0"))  # 0 = all nodes
    out_path = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                            f"_bio_corpus_sweep_c{cls}{OUT_SUFFIX}.jsonl")
    done_qids = set()
    if os.path.exists(out_path):
        with open(out_path, encoding="utf-8") as fh:
            for line in fh:
                try:
                    done_qids.add(json.loads(line).get("qid"))
                except Exception:
                    pass
    files = sorted(f for f in os.listdir(CORPUS)
                   if re.match(rf"c{cls}_bio", f) and f.endswith(".md")
                   and "_comp" not in f)
    if not files:
        print(f"no class {cls} biology files found", flush=True)
        return 2
    if node_limit > 0 and len(files) > node_limit:
        # chapter-opening nodes first (they anchor each chapter), then rest
        ch = [f for f in files if re.search(r"_(\d+)_001\.md$", f)]
        rest = [f for f in files if f not in ch]
        files = (ch + rest)[:node_limit]
    print(f"=== BIO CORPUS SWEEP class {cls}: {len(files)} nodes "
          f"(resume: {len(done_qids)} already done) ===", flush=True)

    from backend.its.solver.answer_pipeline import answer

    summary, n = {}, 0
    with open(out_path, "a", encoding="utf-8") as fh:
        for f in files:
            pairs = parse_diagnostics(os.path.join(CORPUS, f))[:per_node]
            for i, (q, key) in enumerate(pairs, 1):
                qid = f"{f}#d{i}"
                if qid in done_qids:
                    continue
                t0 = time.time()
                try:
                    r = answer(q)
                    lab = str(r.label)
                    ans = str(r.answer or "")
                    verdict = judge(q, key, lab, ans)
                    rec = {"qid": qid, "cls": cls, "file": f,
                           "prose": bool(is_prose(q)),
                           "q": q[:110], "key": key[:110], "label": lab,
                           "answer": ans[:110], "verdict": verdict,
                           "secs": round(time.time() - t0, 1)}
                except Exception as e:
                    rec = {"qid": qid, "cls": cls, "file": f,
                           "q": q[:110], "verdict": "CRASH",
                           "err": f"{type(e).__name__}: {e}"[:80]}
                n += 1
                summary.setdefault(f[:16], []).append(rec["verdict"])
                fh.write(json.dumps(rec, ensure_ascii=False) + "\n")
                print(json.dumps(rec, ensure_ascii=False), flush=True)

    print("\n=== PER-FILE SUMMARY ===", flush=True)
    totals = {}
    for fname, vs in sorted(summary.items()):
        c = {k: vs.count(k) for k in ("SOLVE", "WRONG", "VERIFY_SOFT",
                                      "REFUSE_OK", "COVERAGE", "OTHER",
                                      "CRASH")}
        for k, v in c.items():
            totals[k] = totals.get(k, 0) + v
        print(f"  {fname:16s} " + " ".join(f"{k}={v}" for k, v in c.items()
                                           if v), flush=True)
    print("TOTALS:", totals, flush=True)
    print(f"\nWRONG={totals.get('WRONG', 0)} COVERAGE="
          f"{totals.get('COVERAGE', 0)} "
          f"(ledger: {out_path})", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
