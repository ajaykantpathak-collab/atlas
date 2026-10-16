"""stem_pc_fullspan_sweep.py -- STEM-PC full-span corpus sweep (phy+chem, 6-12, CBSE+CISCE).

Pulls REAL diagnostic pairs from the corpus (not self-written), runs each
through the live `answer()` choke point in-process (SOLVER_LLM_MODE=off),
grades like an examiner:

  SOLVE       VERIFIED and the key's numbers (2% tol) or keywords check out
  WRONG       VERIFIED but contradicts the key (P0 -- every row root-caused)
  REFUSE_NUM  standard numerical that refuses (family gap -> build)
  REFUSE_OK   honest refusal of a prose question
  SOFT        VERIFIED, key not machine-checkable (hand-audited)
  CRASH       exception (P0)

Env:  SUBJECT=phy|chem (default phy)   CORPUS=cbse|cisce (default cbse)
      CLASSES=6,7,.. (default all)     PER_CLASS=n (default 10)
Out:  tests/_stempc_<corpus>_<subj>_c<cls|all>.jsonl + summary + the
      WRONG/REFUSE_NUM fix queue printed at the end.
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

SUBJECT = os.environ.get("SUBJECT", "phy")
CORPUS = os.environ.get("CORPUS", "cbse")
CLASSES = [int(c) for c in os.environ.get("CLASSES", "").split(",") if c]
PER_CLASS = int(os.environ.get("PER_CLASS", "10"))

if CORPUS == "cbse":
    ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                        "..", "content", "enhanced_nodes_md")
    SUBJ_RE = r"c(\d+)_(?:phy|physics|chem|chemistry)_cbse?" if False else \
        (r"c(\d+)_(?:phy|physics)" if SUBJECT == "phy" else r"c(\d+)_(?:chem|chemistry)")
else:
    ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                        "..", "content", "cisce_nodes_v2")
    SUBJ_RE = (r"c(\d+)_(?:phy|physics)" if SUBJECT == "phy"
               else r"c(\d+)_(?:chem|chemistry)")


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
        a = re.split(r"\nA wrong answer|\nWrong answer:|\nStudents? (?:who|that) ",
                     a)[0].strip()
        if 15 <= len(q) <= 400 and 5 <= len(a) <= 600:
            pairs.append((q, a))
    return pairs


NUMQ = re.compile(
    r"calculate|comput|determin|find the (?:value|speed|current|resistance|power|"
    r"work|force|energy|height|distance|charge|time|mass|number|moles|molar|"
    r"molecular|volume|concentration|percent|focal|image|magnif|frequency|"
    r"wavelength|angle|coefficient|heat|temperature|amount)|"
    r"how (?:much|far|fast|long|many)|what (?:is|are) the (?:value|speed|current|"
    r"resistance|power|work|force|energy|mass|number|magnitude|frequency|"
    r"wavelength|angle|heat|temperature|ph|volume|concentration)|Q-value|"
    r"balance the", re.I)


def is_numeric(q):
    return bool(NUMQ.search(q)) and bool(re.search(r"\d", q))


def key_numbers(key):
    out = []
    for m in re.finditer(
            r"(-?\d[\d,]*(?:\.\d+)?)\s*(?:[xX\u00d7]\s*10\^?\{?(-?\d+)\}?|e(-?\d+))?",
            key):
        v = float(m.group(1).replace(",", ""))
        if m.group(2) or m.group(3):
            v = v * (10 ** int(m.group(2) or m.group(3)))
        out.append(v)
    return out


def grade(q, key, ans, steps):
    hay = f"{ans} {steps}"
    ansl = hay.lower()
    kn = key_numbers(key)
    an = key_numbers(hay)
    if kn and an:
        want = kn[0]
        if any(abs(a - want) <= max(0.01, 0.02 * abs(want)) for a in an):
            return "SOLVE"
        if any(abs(a - w) <= max(0.01, 0.02 * abs(w)) for a in an for w in kn):
            return "SOLVE"
        # degenerate keys whose first number is a chapter/section artifact:
        # if the question has no digits, that number can't be the answer
        if not re.search(r"\d", q):
            kn2 = kn[1:] or []
            if kn2 and any(abs(a - w) <= max(0.01, 0.02 * abs(w))
                           for a in an for w in kn2):
                return "SOLVE"
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


def main():
    files = sorted(f for f in os.listdir(ROOT)
                   if re.match(SUBJ_RE, f) and f.endswith(".md")
                   and "_comp" not in f)
    by_class: dict = {}
    for f in files:
        cls = int(re.match(SUBJ_RE, f).group(1))
        if CLASSES and cls not in CLASSES:
            continue
        by_class.setdefault(cls, []).append(f)

    # disable disk-state WRITES so sweeps stay file-clean; the PAL bank
    # and extractor cache READS stay on (that is real production state —
    # a sweep that blanks them measures a config prod never serves).
    try:
        import backend.its.solver.pal_templates as pt
        pt._save = lambda: None
    except Exception:
        pass
    try:
        import backend.its.solver.structure_extractor as se
        se._disk_save = lambda k, v: None
    except Exception:
        pass

    from backend.its.solver.answer_pipeline import answer

    tag = f"{CORPUS}_{SUBJECT}_c{'all' if not CLASSES else '_'.join(map(str, CLASSES))}"
    out_path = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                            f"_stempc_{tag}.jsonl")
    summary: dict = {}
    queue: list = []
    n = 0
    t_start = time.time()
    with open(out_path, "w", encoding="utf-8") as fh:
        for cls in sorted(by_class):
            done = 0
            # chapter-major order; numeric questions first per chapter
            chapters: dict = {}
            for f in by_class[cls]:
                m = re.match(rf"c{cls}_[a-z]+(?:_cbse|_icse|_isc)?_ch?0*(\d+)", f)
                ch = m.group(1) if m else "?"
                chapters.setdefault(ch, []).append(f)
            pool = []
            for ch in sorted(chapters):
                for f in sorted(chapters[ch]):
                    for q, key in parse_diagnostics(os.path.join(ROOT, f)):
                        if len(key) > 350:
                            continue
                        pool.append((ch, 0 if is_numeric(q) else 1, f, q, key))
            pool.sort(key=lambda t: (t[0], t[1], t[2]))
            for ch, _prio, f, q, key in pool:
                if done >= PER_CLASS:
                    break
                t0 = time.time()
                try:
                    r = answer(q)
                    lab = str(r.label)
                    ans = str(r.answer or "")
                    steps = " ".join(str(s) for s in (getattr(r, "steps", None) or []))
                    if lab.startswith("VERIFIED"):
                        verdict = grade(q, key, ans, steps)
                    elif "GUIDED" in lab or "REFUS" in lab.lower():
                        verdict = ("REFUSE_NUM" if is_numeric(q) else "REFUSE_OK")
                    else:
                        verdict = "OTHER"
                    rec = {"cls": cls, "ch": ch, "file": f, "q": q[:160],
                           "key": key[:150], "label": lab, "answer": ans[:150],
                           "steps": steps[:400], "verdict": verdict,
                           "secs": round(time.time() - t0, 1)}
                except Exception as e:
                    import traceback
                    rec = {"cls": cls, "ch": ch, "file": f, "q": q[:160],
                           "verdict": "CRASH",
                           "err": f"{type(e).__name__}: {e}"[:120],
                           "tb": traceback.format_exc()[-600:]}
                n += 1
                done += 1
                lane = f"{SUBJECT}/c{cls}"
                summary.setdefault(lane, []).append(rec["verdict"])
                fh.write(json.dumps(rec, ensure_ascii=False) + "\n")
                if rec["verdict"] in ("WRONG", "REFUSE_NUM", "CRASH"):
                    queue.append(rec)
                print(json.dumps({k: rec[k] for k in
                                  ("cls", "ch", "verdict", "label", "q")
                                  if k in rec}, ensure_ascii=False), flush=True)

    print("\n=== PER-CLASS SUMMARY ===", flush=True)
    totals: dict = {}
    for lane, vs in sorted(summary.items()):
        c = {k: vs.count(k) for k in ("SOLVE", "WRONG", "SOFT", "REFUSE_OK",
                                      "REFUSE_NUM", "OTHER", "CRASH")}
        for k, v in c.items():
            totals[k] = totals.get(k, 0) + v
        print(f"  {lane:12s} " + " ".join(f"{k}={v}" for k, v in c.items()
                                          if v), flush=True)
    print("TOTALS:", totals, flush=True)
    print(f"rows: {n} in {round(time.time()-t_start,0)}s -> {out_path}", flush=True)
    if queue:
        print(f"\n=== FIX QUEUE ({len(queue)}) ===", flush=True)
        for rec in queue:
            print(json.dumps({k: rec.get(k) for k in
                              ("cls", "ch", "verdict", "q", "key", "answer",
                               "err")}, ensure_ascii=False)[:500], flush=True)


if __name__ == "__main__":
    main()
