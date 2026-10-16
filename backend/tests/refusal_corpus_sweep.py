"""refusal_corpus_sweep.py -- SOLVER-DIG-2 lane: chapter-sourced refusal audit.

Adapted from tests/physics_corpus_sweep.py (owner instrument).  That file
is missing `import time` (its JSONL is empty -- it crashes at the first
timing call); fixed here.

Lane scope (owner directive 2026-10-06):
  * class 10 MATHS chapters that host the audited canonical questions
    (04 quadratics, 05 AP, 08 trig, 09 applications, 13 mensuration,
    15 probability) -- MEASUREMENT ONLY, maths families are the owner's
  * class 7 non-maths subjects (the generator-lane class), chapter-1
    node per chapter

Grading (numeric + keyword, physics instrument's contract):
  SOLVE        VERIFIED and answer numerically matches / contains the key
  WRONG        VERIFIED but contradicts the key (bug)
  VERIFY_SOFT  VERIFIED, inconclusive match (adjudicate)
  REFUSE_NUM   numerical question refused  -> FAMILY-GAP finding
  REFUSE_OK    prose/concept refused (honest)
  OTHER/CRASH
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
os.environ.setdefault("SOLVER_OFFLINE", "1")
os.environ.setdefault("GROQ_API_KEY", "")
os.environ.setdefault("GEMINI_API_KEY", "")

CORPUS = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                      "..", "content", "enhanced_nodes_md")

# my lane's maths chapters (measurement-only) + class-7 non-maths subjects
C10_MATH_CHAPTERS = ("04", "05", "08", "09", "13", "15")
C7_SUBJECTS = ("bio", "chem", "physics", "geo", "civ", "hist", "eco",
               "engl")


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
        # the answer often carries a misconception tail after the key --
        # the key is the first 1-2 sentences up to "A wrong answer"
        a = re.split(r"\nA wrong answer|\nWrong answer:|\nStudents? (?:who|that) ",
                     a)[0].strip()
        if 15 <= len(q) <= 400 and 5 <= len(a) <= 600:
            pairs.append((q, a))
    return pairs


def is_numeric(q):
    """Numericals (calculate/find value) are the deterministic engine's home."""
    return bool(re.search(
        r"calculate|compute|find the (?:value|speed|current|resistance|power|"
        r"work|force|energy|height|distance|charge|time|area|volume|"
        r"probability|term|sum|ratio|zeroes|roots|mean|median|mode)|"
        r"how (?:much|far|fast|many|long)|what is the (?:value|probability|"
        r"area|volume|ratio|distance|height)|solve for|evaluate",
        q, re.I)) and re.search(r"\d", q)


def _first_num(s):
    m = re.search(r"-?\d[\d,]*(?:\.\d+)?", s)
    return float(m.group(0).replace(",", "")) if m else None


def _frac_num(s):
    """'3/4' or '0.75' both -> 0.75 (first fraction-looking token)."""
    m = re.search(r"(-?\d+)\s*/\s*(\d+)", s)
    if m:
        d = float(m.group(2))
        return float(m.group(1)) / d if d else None
    return _first_num(s)


def grade(lab, ans, key, q):
    """physics instrument's grading + fraction-aware second chance."""
    if lab.startswith("VERIFIED"):
        kn, an = _first_num(key), _first_num(ans)
        if kn is not None and an is not None:
            if abs(an - kn) <= max(0.01, 0.02 * abs(kn)):
                return "SOLVE"
            kf, af = _frac_num(key), _frac_num(ans)
            if kf is not None and af is not None and \
                    abs(af - kf) <= max(0.001, 0.02 * abs(kf)):
                return "SOLVE"  # fraction vs decimal form of one value
            return "WRONG"
        kwords = [w for w in re.findall(r"[a-z]{4,}", key.lower())][:6]
        hit_words = sum(1 for w in kwords if w in ans.lower())
        if kwords and hit_words >= max(2, len(kwords) // 2):
            return "SOLVE"
        if kwords and hit_words == 0 and len(kwords) >= 3:
            return "WRONG"
        return "VERIFY_SOFT"
    if "GUIDED" in lab or "REFUS" in lab.lower():
        return "REFUSE_NUM" if is_numeric(q) else "REFUSE_OK"
    return "OTHER"


def pick_files():
    files = []
    for ch in C10_MATH_CHAPTERS:
        fs = sorted(f for f in os.listdir(CORPUS)
                    if f.startswith(f"c10_math_cbse_{ch}_")
                    and f.endswith(".md") and "_comp" not in f)
        if fs:
            files.append(("c10_math/cbse_" + ch, os.path.join(CORPUS, fs[0])))
    for subj in C7_SUBJECTS:
        fs = sorted(f for f in os.listdir(CORPUS)
                    if f.startswith(f"c7_{subj}_ch01_")
                    and f.endswith(".md") and "_comp" not in f)
        for f in fs[:1]:
            files.append((f"c7_{subj}/ch01", os.path.join(CORPUS, f)))
    return files


def main():
    out_path = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                            "_refusal_corpus_sweep.jsonl")
    summary = {}
    rows = []
    with open(out_path, "w", encoding="utf-8") as fh:
        for lane, path in pick_files():
            for q, key in parse_diagnostics(path):
                t0 = time.time()
                try:
                    from backend.its.solver.answer_pipeline import answer
                    r = answer(q)
                    lab = str(r.label)
                    ans = str(r.answer or "")
                    verdict = grade(lab, ans, key, q)
                    rec = {"lane": lane, "q": q[:110], "key": key[:110],
                           "label": lab, "answer": ans[:110],
                           "verdict": verdict,
                           "secs": round(time.time() - t0, 1)}
                except Exception as e:
                    rec = {"lane": lane, "q": q[:110], "verdict": "CRASH",
                           "err": f"{type(e).__name__}: {e}"[:80]}
                rows.append(rec)
                summary.setdefault(lane, []).append(rec["verdict"])
                fh.write(json.dumps(rec, ensure_ascii=False) + "\n")

    print("=== PER-LANE SUMMARY ===")
    totals = {}
    for lane, vs in sorted(summary.items()):
        c = {k: vs.count(k) for k in ("SOLVE", "WRONG", "VERIFY_SOFT",
                                      "REFUSE_OK", "REFUSE_NUM", "OTHER",
                                      "CRASH")}
        for k, v in c.items():
            totals[k] = totals.get(k, 0) + v
        print(f"  {lane:20s} " + " ".join(f"{k}={v}" for k, v in c.items()
                                          if v))
    print("TOTALS:", totals)
    print("\nFAMILY-GAP rows (REFUSE_NUM):")
    for r in rows:
        if r["verdict"] == "REFUSE_NUM":
            print("  -", r["lane"], "|", r["q"][:90])
    print("\nBUG rows (WRONG):")
    for r in rows:
        if r["verdict"] == "WRONG":
            print("  -", r["lane"], "|", r["q"][:80], "|| key:",
                  r.get("key", "")[:60], "|| got:", r.get("answer", "")[:60])


if __name__ == "__main__":
    main()
