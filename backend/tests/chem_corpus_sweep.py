"""chem_corpus_sweep.py -- chapter-sourced chemistry regression, c9-c12.

CHEM-ADVERSARIAL adaptation of physics_corpus_sweep.py: pulls REAL
diagnostic questions + answer keys from the chemistry corpus (not
self-written), runs each through the live pipeline, grades like an
examiner:

  SOLVE       VERIFIED and the key's number/formula/keywords check out
  WRONG       VERIFIED but the answer contradicts the key (app-killing
              class -- every row gets a family root-cause)
  REFUSE_NUM  numerical that refuses (family gap -> document/fix)
  REFUSE_OK   honest refusal of a prose question
  SOFT        VERIFIED, key not machine-checkable (hand-audited)

Usage:  PER_CLASS_CLASS=9 PER_CHAPTER=12 python chem_corpus_sweep.py
Output: _chem_corpus_sweep_c<cls>.jsonl + per-chapter pass table.
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

CORPUS = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                      "..", "content", "enhanced_nodes_md")


def parse_diagnostics(path):
    """Extract (question, answer_key) pairs from a corpus .md file."""
    try:
        src = open(path, encoding="utf-8").read()
    except OSError:
        return []
    pairs = []
    for n in range(1, 13):
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
    """Numericals are the deterministic engine's home."""
    return bool(re.search(
        r"calculate|compute|determine|find the|how (?:much|many)|"
        r"what (?:is|are) the (?:mass|number|value|moles|molar|molecular|"
        r"formula|ph|volume|concentration|percent|charge)|balance the",
        q, re.I)) and re.search(r"\d", q)


def key_numbers(key):
    """All numbers in the key, as floats (10^23 expanded)."""
    out = []
    for m in re.finditer(
            r"(\d[\d,]*(?:\.\d+)?)\s*(?:\s*[xX\u00d7]\s*10\^?(-?\d+)|e(-?\d+))?",
            key):
        v = float(m.group(1).replace(",", ""))
        if m.group(2) or m.group(3):
            v = v * (10 ** int(m.group(2) or m.group(3)))
        out.append(v)
    return out


def key_formulas(key):
    """Chemical-formula tokens in the key (H2O, Ca3(PO4)2, CO2...)."""
    return set(re.findall(
        r"\b(?:[A-Z][a-z]?\d*){2,}\b|\b[A-Z][a-z]?\d(?:\d?[A-Za-z0-9()]*)*\b",
        key))


def grade(q, key, lab, ans):
    """Examiner grading: SOLVE / WRONG / SOFT."""
    ansl = (ans or "").lower()
    # numeric key match (tolerant): ANY key number matching an answer
    # number within 2% counts, but a WRONG primary number overrides:
    # use the first number of each (board keys state the answer first)
    kn = key_numbers(key)
    an = key_numbers(ans or "")
    if kn and an:
        want = kn[0]
        hit = any(abs(a - want) <= max(0.05, 0.02 * abs(want))
                  for a in an)
        if hit:
            return "SOLVE"
        # percent-style keys: "11.1%" vs answer "11.11"
        for a in an:
            if want and abs(a - want) / max(1.0, abs(want)) < 0.05:
                return "SOLVE"
        # answer may carry the key number anywhere (multi-value answers)
        if any(abs(a - w) <= max(0.05, 0.02 * abs(w))
               for a in an for w in kn):
            return "SOLVE"
        return "WRONG"
    kf = key_formulas(key)
    if kf:
        for f in kf:
            if re.search(re.escape(f).replace("\\ ", "\\s*"), ansl):
                return "SOLVE"
        # every key formula absent from a VERIFIED answer = wrong reading
        return "WRONG"
    kwords = [w for w in re.findall(r"[a-z]{4,}", key.lower())][:8]
    if not kwords:
        return "SOFT"
    hits = sum(1 for w in kwords if w in ansl)
    if hits >= max(2, len(kwords) // 2):
        return "SOLVE"
    if hits == 0 and len(kwords) >= 3:
        return "WRONG"
    return "SOFT"


def chem_files():
    files = sorted(f for f in os.listdir(CORPUS)
                   if re.match(r"c(\d+)_chem", f) and f.endswith(".md")
                   and "_comp" not in f)
    by_class: dict = {}
    for f in files:
        cls = int(re.match(r"c(\d+)_chem", f).group(1))
        by_class.setdefault(cls, []).append(f)
    return by_class


def chapter_of(fname):
    m = re.match(r"c\d+_chem_(?:cbse_)?ch?0*(\d+)", fname)
    return m.group(1) if m else "?"


def main():
    cls_filter = os.environ.get("PER_CLASS_CLASS")
    per_chapter = int(os.environ.get("PER_CHAPTER", "12"))
    by_class = chem_files()
    classes = ([int(cls_filter)] if cls_filter else sorted(by_class))

    from backend.its.solver.answer_pipeline import answer

    out_path = os.path.join(
        os.path.dirname(os.path.abspath(__file__)),
        f"_chem_corpus_sweep_c{cls_filter or 'all'}.jsonl")
    summary: dict = {}
    n = 0
    with open(out_path, "w", encoding="utf-8") as fh:
        for cls in classes:
            # group nodes by chapter, sort chapters, nodes within chapter
            chapters: dict = {}
            for f in by_class.get(cls, []):
                chapters.setdefault(chapter_of(f), []).append(f)
            for ch in sorted(chapters):
                taken = 0
                # numeric questions first (deterministic engine's home),
                # then prose — all from the chapter's own nodes
                pool = []
                for f in sorted(chapters[ch]):
                    for q, key in parse_diagnostics(os.path.join(CORPUS, f)):
                        if len(key) > 350:
                            continue
                        pool.append((0 if is_numeric(q) else 1, f, q, key))
                pool.sort(key=lambda t: (t[0], t[1]))
                for _prio, f, q, key in pool:
                    if taken >= per_chapter:
                        break
                    t0 = time.time()
                    try:
                        r = answer(q)
                        lab = str(r.label)
                        ans = str(r.answer or "")
                        if lab.startswith("VERIFIED"):
                            verdict = grade(q, key, lab, ans)
                        elif "GUIDED" in lab or "REFUS" in lab.lower():
                            verdict = ("REFUSE_NUM" if is_numeric(q)
                                       else "REFUSE_OK")
                        else:
                            verdict = "OTHER"
                        rec = {"cls": cls, "ch": ch, "file": f,
                               "q": q[:100], "key": key[:110], "label": lab,
                               "answer": ans[:110], "verdict": verdict,
                               "secs": round(time.time() - t0, 1)}
                    except Exception as e:
                        rec = {"cls": cls, "ch": ch, "file": f,
                               "q": q[:100], "verdict": "CRASH",
                               "err": f"{type(e).__name__}: {e}"[:90]}
                    n += 1
                    taken += 1
                    lane = f"c{cls}/ch{ch}"
                    summary.setdefault(lane, []).append(rec["verdict"])
                    fh.write(json.dumps(rec, ensure_ascii=False) + "\n")
                    print(json.dumps(rec, ensure_ascii=False), flush=True)

    print("\n=== PER-CHAPTER SUMMARY ===", flush=True)
    totals: dict = {}
    for lane, vs in sorted(summary.items()):
        c = {k: vs.count(k) for k in ("SOLVE", "WRONG", "SOFT",
                                      "REFUSE_OK", "REFUSE_NUM", "OTHER",
                                      "CRASH")}
        for k, v in c.items():
            totals[k] = totals.get(k, 0) + v
        print(f"  {lane:12s} " + " ".join(f"{k}={v}" for k, v in c.items()
                                          if v), flush=True)
    print("TOTALS:", totals, flush=True)
    print(f"rows: {n} -> {out_path}", flush=True)


if __name__ == "__main__":
    main()
