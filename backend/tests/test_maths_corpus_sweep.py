"""test_maths_corpus_sweep.py -- chapter-sourced maths regression
(STEM-BM 2026-10-07: the maths twin of test_bio_corpus_sweep.py).

Pulls REAL diagnostic questions + answer keys from the MATHS corpus
(CBSE: deploy/content/enhanced_nodes_md, c<cls>_math* files; CISCE:
deploy/content/cisce_nodes_v2 via MATHS_SWEEP_CORPUS), runs each through
the live in-process pipeline and grades with the maths honest-refusal
contract:

  SOLVE        VERIFIED and the answer matches the corpus key
               (numeric equality or normalised containment)
  WRONG        VERIFIED but the answer contradicts the key  == THE BUG
  REFUSE_OK    honest guided refusal on a why/prove/explain ask == PASS
               (reasoning-chain deliverables are the corpus model-answer
               lane's job; the deterministic engine refuses them honestly)
  COVERAGE     honest refusal on a numerical / short factual that HAS a
               corpus key                                == FINDING
               (every one is a finding to fix, owner law)
  VERIFY_SOFT  VERIFIED with only weak key overlap -- judged by hand

Output: per-chapter summary + full JSONL for the fix ledger
(_maths_corpus_sweep_c<cls><suffix>.jsonl).  Resume: rows already
present for the class are skipped, so interrupted sweeps continue.

Run (from deploy/backend):
  PYTHONPATH=D:/platform/deploy SOLVER_LLM_MODE=off \
  python tests/test_maths_corpus_sweep.py 10
"""
import json
import os
import re
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))
os.environ.setdefault("SOLVER_LLM_MODE", "off")

CORPUS = os.environ.get(
    "MATHS_SWEEP_CORPUS",
    os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                 "..", "content", "enhanced_nodes_md"))
OUT_SUFFIX = os.environ.get("MATHS_SWEEP_SUFFIX", "")

# maths prose asks: reasoning chains, proofs, worded justifications --
# the deterministic engine's honest refusal is the CONTRACT for these.
_PROSE = re.compile(
    r"\b(why|explain|justify|describe|discuss|elaborate|prove\s+that|"
    r"show\s+that|verify\s+that|in\s+your\s+own\s+words|give\s+an?\s+"
    r"account|write\s+a?\s*note|real[- ]?life|where\s+(?:do|is)\s+(?:this|"
    r"it)\s+used|what\s+happens?\s+if|when\s+(?:is|do|does)\s+(?:this|it)|"
    r"how\s+(?:do|does|did|is|are|can|come)|distinguish|differentiate|"
    r"compare|interpret\b|meaning\s+of|"
    # BIOMATH-FINISH 2026-10-08: error-analysis asks ("Is this
    # complete? If not, what is missing?") are judgement deliverables,
    # not computations -- an honest refusal is REFUSE_OK, not COVERAGE
    r"is\s+this\s+(?:\w+\s+){0,2}?complete|is\s+the\s+(?:solution|"
    r"method|answer|working)\s+complete|what\s+(?:is|'s)\s+"
    r"(?:missing|wrong))\b", re.I)
# asks WITHOUT digits whose deliverable is a statement/theorem/recall --
# a numeric engine refusing these is honest, not a coverage gap
# (STEM-BM 2026-10-07: "State the relationship between HCF and LCM",
# "Give the correct order of steps in the proof...", "Fill in the
# blank: ..." paper forms, "What must you be able to do...")
_STATEMENT_ASK = re.compile(
    r"\b(state|give|list|write\s+down)\b[^.?!\n]{0,90}\b"
    r"(?:theorem|relationship|relation|condition|assumption|property|"
    r"criterion|criteria|algorithm|definition|steps?\s+in\s+the\s+proof|"
    r"order\s+of\s+steps|postulate|formula)\b|"
    r"^fill\s+in\s+the\s+blank|^imagine\b|"
    r"what\s+must\s+you\s+be\s+able\s+to|"
    r"\bdivision\s+algorithm\b|"
    r"\bstatement\s+(?:of|for)\b", re.I)


def parse_diagnostics(path):
    """Extract (question, answer_key) pairs from a corpus .md file."""
    try:
        src = open(path, encoding="utf-8").read()
    except OSError:
        return []
    pairs = []
    for n in range(1, 11):
        mq = re.search(
            rf"## DIAGNOSTIC_QUESTION_{n}\s*\n(.*?)(?=\n## |\Z)", src, re.S)
        ma = re.search(
            rf"## DIAGNOSTIC_ANSWER_{n}\s*\n(.*?)(?=\n## |\Z)", src, re.S)
        if not mq or not ma:
            continue
        q = mq.group(1).strip()
        a = ma.group(1).strip()
        # the answer often carries a misconception tail after the key --
        # the key is the first 1-2 sentences up to "A wrong answer".
        # BIOMATH-FINISH 2026-10-08: the tail may start INLINE after a
        # period ("... = [[10, -3], [-6, 15]]. A wrong answer often
        # ..."), not only on a new line -- the newline-only split left
        # the misconception text in the key and poisoned the judge's
        # word list (c12_math_cbse_03_005#d3 judged WRONG on a correct
        # matrix product).
        a = re.split(r"\nA wrong answer|\nWrong answer:|"
                     r"\nStudents? (?:who|that) |\. A wrong answer|"
                     r"\.\s+Wrong answer:|\. Students? (?:who|that) ",
                     a)[0].strip()
        if 15 <= len(q) <= 400 and 5 <= len(a) <= 600:
            pairs.append((q, a))
    return pairs


def is_prose(q):
    return bool(_PROSE.search(q))


def is_numerical(q):
    """A compute ask with numbers in the stem: must SOLVE."""
    return bool(re.search(r"\d", q)) and bool(re.search(
        r"\b(find|solve|calculate|compute|evaluate|how\s+many|how\s+much|"
        r"what\s+is\s+the|determine|simplify|expand|factorise|factorize|"
        r"convert|express|draw|distance|area|volume|perimeter|sum|"
        r"product|ratio|percentage|percent|mean|median|mode|probability|"
        r"value\s+of|roots?)\b", q, re.I))


def _norm(s):
    s = (s or "").lower()
    s = re.sub(r"[^a-z0-9.\-/ ]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def _nums(text):
    out = []
    for t in re.findall(r"-?\d[\d,]*(?:\.\d+)?", text or ""):
        try:
            out.append(float(t.replace(",", "")))
        except ValueError:
            pass
    return out


def _frac_eq(tok, value):
    """'3/4' style tokens compare as fractions."""
    if "/" in tok:
        try:
            a, b = tok.split("/")
            return abs(float(a) / float(b) - value) <= 1e-6
        except (ValueError, ZeroDivisionError):
            return False
    return False


def judge(q, key, label, ans):
    """Maths contract. Returns verdict string."""
    verified = label.startswith("VERIFIED")
    if verified:
        kn = re.findall(r"-?\d[\d,]*(?:\.\d+)?(?:\s*/\s*\d+)?", key or "")
        an = ans or ""
        if kn:
            hits = 0
            for kt in kn[:6]:
                kv = None
                if "/" in kt:
                    try:
                        a_, b_ = kt.split("/")
                        kv = float(a_.replace(",", "")) / float(
                            b_.replace(",", ""))
                    except (ValueError, ZeroDivisionError):
                        kv = None
                else:
                    try:
                        kv = float(kt.replace(",", ""))
                    except ValueError:
                        continue
                hit = any(abs(v - kv) <= max(1e-6, 0.02 * abs(kv))
                          for v in _nums(an))
                hit = hit or any(_frac_eq(t, kv) for t in
                                 re.findall(r"-?\d+(?:\.\d+)?\s*/\s*\d+", an))
                if hit:
                    hits += 1
            if hits >= min(2, len(kn)) or (
                    hits == 1 and len(kn) == 1):
                return "SOLVE"
            # BARE-NUMBER ANSWER (STEM-BM 2026-10-07): a one-number
            # deliverable ("1000 cu cm") matching a key number in the
            # BACK HALF of the key is the computed value -- key openings
            # are given values and step indices, the final result is at
            # the end
            if len(_nums(an)) == 1:
                av = _nums(an)[0]
                for mnum in re.finditer(
                        r"-?\d[\d,]*(?:\.\d+)?", key or ""):
                    try:
                        kv = float(mnum.group(0).replace(",", ""))
                    except ValueError:
                        continue
                    if abs(kv - av) <= max(1e-6, 0.02 * abs(av)) \
                            and mnum.start() > 0.4 * len(key or ""):
                        return "SOLVE"
            # RESULT-TUPLE MATCH (BIOMATH-FINISH 2026-10-08): a
            # multi-number answer (matrix product, coordinates, tuple
            # solutions) whose number sequence appears CONTIGUOUSLY in
            # the key's number sequence, same order and values, is the
            # key's final result -- the key carries the full working,
            # so its working numbers must not be demanded of the
            # answer ("= [[10, -3], [-6, 15]]" vs "[[10, -3],
            # [-6, 15]]"; c12_math_cbse_03_005#d3).
            knums, anums = _nums(key), _nums(an)
            if len(anums) >= 2 and len(knums) >= len(anums):
                for i in range(len(knums) - len(anums) + 1):
                    if all(abs(knums[i + j] - anums[j])
                           <= max(1e-6, 0.02 * abs(anums[j]))
                           for j in range(len(anums))):
                        return "SOLVE"
            if hits == 0:
                # numeric key, zero hits -- but a symbolic answer may
                # still carry the key text (surds, coordinates)
                k = _norm(key)
                a = _norm(an)
                if k and (k in a or a in k):
                    return "SOLVE"
                kwords = [w for w in re.findall(r"[a-z]{4,}", key.lower())
                          ][:8]
                if kwords and sum(1 for w in kwords if w in an.lower()) == 0:
                    return "WRONG"
            return "VERIFY_SOFT"
        k = _norm(key)
        a = _norm(an)
        if k and (k in a or a in k):
            return "SOLVE"
        kwords = [w for w in re.findall(r"[a-z]{4,}", key.lower())][:8]
        hit = sum(1 for w in kwords if w in an.lower())
        if kwords and hit >= max(2, len(kwords) // 2):
            return "SOLVE"
        if kwords and hit == 0 and len(kwords) >= 3:
            return "WRONG"
        return "VERIFY_SOFT"
    if "GUIDED" in label or "REFUS" in label.lower() or "AMBIG" in label:
        if is_prose(q) or (
                not re.search(r"\d", q) and _STATEMENT_ASK.search(q)):
            return "REFUSE_OK"           # honest refusal on prose = PASS
        return "COVERAGE"                # refusal on a keyed numerical
    return "OTHER"


def main():
    cls = int(sys.argv[1]) if len(sys.argv) > 1 else 10
    per_node = int(os.environ.get("PER_NODE", "3"))
    node_limit = int(os.environ.get("NODES_LIMIT", "0"))  # 0 = all nodes
    out_path = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                            f"_maths_corpus_sweep_c{cls}{OUT_SUFFIX}.jsonl")
    done_qids = set()
    if os.path.exists(out_path):
        with open(out_path, encoding="utf-8") as fh:
            for line in fh:
                try:
                    done_qids.add(json.loads(line).get("qid"))
                except Exception:
                    pass
    files = sorted(f for f in os.listdir(CORPUS)
                   if re.match(rf"c{cls}_math", f) and f.endswith(".md")
                   and "_comp" not in f)
    if not files:
        print(f"no class {cls} maths files found in {CORPUS}", flush=True)
        return 2
    if node_limit > 0 and len(files) > node_limit:
        ch = [f for f in files if re.search(r"_(\d+)_001\.md$", f)]
        rest = [f for f in files if f not in ch]
        files = (ch + rest)[:node_limit]
    print(f"=== MATHS CORPUS SWEEP class {cls}: {len(files)} nodes "
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
                           "numerical": bool(is_numerical(q)),
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
        print(f"  {fname:20s} " + " ".join(f"{k}={v}" for k, v in c.items()
                                           if v), flush=True)
    print("TOTALS:", totals, flush=True)
    print(f"\nWRONG={totals.get('WRONG', 0)} COVERAGE="
          f"{totals.get('COVERAGE', 0)} "
          f"(ledger: {out_path})", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
