"""physics_corpus_sweep.py -- chapter-sourced physics regression, classes 6-12.

Pulls REAL diagnostic questions + answer keys from the physics corpus
(not self-written), runs each through the live pipeline, and grades:

  SOLVE   VERIFIED and answer contains/numerically-matches the key
  REFUSE  honest guided/refusal (fine for prose, a content gap for
          numericals — content-watch class)
  WRONG   VERIFIED but answer contradicts the key (the app-killing class)

Sampling: every physics chapter's chapter-1 node per class, all
DIAGNOSTIC pairs, numeric questions prioritized. Output: summary table
+ full JSONL for the fix ledger."""
import json
import os
import re
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))
os.environ.setdefault("SOLVER_LLM_MODE", "off")

CORPUS = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                      "..", "content", "enhanced_nodes_md")


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


def is_numeric(q):
    """Numericals (calculate/find value) are the deterministic engine's home."""
    return bool(re.search(
        r"calculate|compute|find the (?:value|speed|current|resistance|power|"
        r"work|force|energy|height|distance|charge|time)|how (?:much|far|fast)|"
        r"how many", q, re.I)) and re.search(r"\d", q)


def main():
    limit_per_class = int(os.environ.get("PER_CLASS", "6"))
    files = sorted(f for f in os.listdir(CORPUS)
                   if re.match(r"c(\d+)_phy", f) and f.endswith(".md")
                   and "_comp" not in f)
    by_class: dict = {}
    for f in files:
        cls = int(re.match(r"c(\d+)_phy", f).group(1))
        by_class.setdefault(cls, []).append(f)
    # chapter-1 nodes first (they anchor each class's opening), then others
    for cls in by_class:
        by_class[cls].sort(key=lambda f: (0 if "_01_" in f or "_1_" in f else 1, f))

    from backend.its.solver.answer_pipeline import answer

    out_path = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                            "_physics_corpus_sweep.jsonl")
    summary: dict = {}
    n = 0
    with open(out_path, "w", encoding="utf-8") as fh:
        for cls in sorted(by_class):
            done = 0
            for f in by_class[cls]:
                if done >= limit_per_class:
                    break
                for q, key in parse_diagnostics(os.path.join(CORPUS, f)):
                    if done >= limit_per_class:
                        break
                    if len(key) > 350:
                        continue
                    t0 = time.time()
                    try:
                        r = answer(q)
                        lab = str(r.label)
                        ans = str(r.answer or "")
                        if lab.startswith("VERIFIED"):
                            # key-containment or numeric match
                            kn = re.search(r"-?\d[\d,]*(?:\.\d+)?", key)
                            an = re.search(r"-?\d[\d,]*(?:\.\d+)?", ans)
                            kwords = [w for w in re.findall(r"[a-z]{4,}",
                                      key.lower())][:6]
                            hit_words = sum(1 for w in kwords
                                            if w in ans.lower())
                            if kn and an:
                                ve, va = (float(kn.group(0).replace(",", "")),
                                          float(an.group(0).replace(",", "")))
                                verdict = ("SOLVE" if abs(va - ve) <=
                                           max(0.01, 0.02 * abs(ve))
                                           else "WRONG")
                            elif kwords and hit_words >= max(2, len(kwords) // 2):
                                verdict = "SOLVE"
                            elif kwords and hit_words == 0 and len(kwords) >= 3:
                                verdict = "WRONG"
                            else:
                                verdict = "VERIFY_SOFT"
                        elif "GUIDED" in lab or "REFUS" in lab.lower():
                            verdict = ("REFUSE_NUM" if is_numeric(q)
                                       else "REFUSE_OK")
                        else:
                            verdict = "OTHER"
                        rec = {"cls": cls, "file": f, "q": q[:90],
                               "key": key[:90], "label": lab,
                               "answer": ans[:90], "verdict": verdict,
                               "secs": round(time.time() - t0, 1)}
                    except Exception as e:
                        rec = {"cls": cls, "file": f, "q": q[:90],
                               "verdict": "CRASH",
                               "err": f"{type(e).__name__}: {e}"[:80]}
                    n += 1
                    done += 1
                    lane = f"{subj_of(f)}/c{cls}"
                    summary.setdefault(lane, []).append(rec["verdict"])
                    fh.write(json.dumps(rec, ensure_ascii=False) + "\n")
                    print(json.dumps(rec, ensure_ascii=False), flush=True)

    print("\n=== PER-LANE SUMMARY ===", flush=True)
    totals: dict = {}
    for lane, vs in sorted(summary.items()):
        c = {k: vs.count(k) for k in ("SOLVE", "WRONG", "VERIFY_SOFT",
                                      "REFUSE_OK", "REFUSE_NUM", "OTHER",
                                      "CRASH")}
        for k, v in c.items():
            totals[k] = totals.get(k, 0) + v
        print(f"  {lane:16s} " + " ".join(f"{k}={v}" for k, v in c.items()
                                          if v), flush=True)
    print("TOTALS:", totals, flush=True)
    wrong = [k for k in totals if k == "WRONG" and totals[k]]
    print(f"\nWRONG total: {totals.get('WRONG', 0)} "
          f"(see {out_path}, verdict=WRONG rows)", flush=True)


def subj_of(fname):
    m = re.match(r"c\d+_([a-z]+)", fname)
    return m.group(1) if m else "?"


if __name__ == "__main__":
    main()
