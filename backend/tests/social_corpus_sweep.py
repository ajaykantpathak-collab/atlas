"""social_corpus_sweep.py -- chapter-sourced geography + economics
regression, classes 6-12 (SOCIAL_GOLDEN batch 2026-10-07).

Adapted from physics_corpus_sweep.py: pulls REAL diagnostic question +
answer-key pairs from the geo/eco corpus (not self-written), runs each
through the live pipeline, and grades:

  SOLVE        VERIFIED and the answer agrees with the corpus key
               (numeric match or >=half of the key's long words)
  VERIFY_SOFT  VERIFIED but the key is prose with no checkable overlap
               (examiner eyeball class -- listed, not failed)
  REFUSE_OK    honest guided/refusal on a prose question (fine)
  REFUSE_NUM   honest refusal on a numerical ask (content gap class)
  WRONG        VERIFIED but the answer contradicts the key
               (the app-killing class -- every row must be triaged)

Sampling: every lane's chapter-1 node per class first, then further
nodes, all DIAGNOSTIC pairs, numeric asks prioritized.  Output: per-lane
summary + full JSONL for the fix ledger."""
import json
import os
import re
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))
os.environ.setdefault("SOLVER_LLM_MODE", "off")

# SOCIAL-ALL batch (2026-10-07): the corpus is switchable so the CISCE
# lanes (cisce_nodes_v2: histciv/hist/geo/econ) can be swept with the
# same grader.  Default stays the CBSE geo/eco sweep, byte-for-byte.
CORPUS = os.environ.get(
    "SOCIAL_SWEEP_CORPUS",
    os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                 "..", "content", "enhanced_nodes_md"))
#: SOCIAL_SWEEP_SUBJECTS selects the lane family; default keeps the
#: original geography+economics behaviour, "all" adds history/civics
#: (CBSE) and histciv/hist (CISCE).  Civics is MEASURE-ONLY (parked).
SUBJECT_RE = os.environ.get("SOCIAL_SWEEP_SUBJECTS", "geo|geography|eco|economics")


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
        r"calculate|compute|find the (?:value|density|distance|time|rate|"
        r"price|quantity|growth|increase|number)|how (?:much|far|fast|many)|"
        r"what (?:is|will be) the (?:density|population|distance|growth|"
        r"price|rate)", q, re.I)) and re.search(r"\d", q)


def main():
    limit_per_class = int(os.environ.get("PER_CLASS", "8"))
    # short stems (c10_geo) AND long stems (c6_geography / c6_economics);
    # "all" mode (SOCIAL-ALL 2026-10-07) adds hist/histciv/civ/civics lanes
    files = sorted(f for f in os.listdir(CORPUS)
                   if re.match(rf"c(\d+)_({SUBJECT_RE})_", f)
                   and f.endswith(".md") and "_comp" not in f)
    by_class = {}
    for f in files:
        cls = int(re.match(r"c(\d+)_", f).group(1))
        lane = subj_of(f)
        by_class.setdefault((cls, lane), []).append(f)
    # chapter-1 nodes first (they anchor each class's opening), then others
    for key in by_class:
        cls, _lane = key
        by_class[key].sort(key=lambda f: (0 if "_01_" in f or "_1_" in f
                                          else 1, f))

    from backend.its.solver.answer_pipeline import answer

    out_name = "_social_corpus_sweep.jsonl"
    if "cisce" in os.path.basename(os.path.normpath(CORPUS)).lower():
        out_name = "_social_corpus_sweep_cisce.jsonl"
    out_path = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                            out_name)
    summary = {}
    n = 0
    with open(out_path, "w", encoding="utf-8") as fh:
        for (cls, _lane) in sorted(by_class):
            done = 0
            files_lane = by_class[(cls, _lane)]
            # numeric asks first: they are the deterministic engine's home,
            # so the per-lane budget should reach them before the prose
            # diagnostics (which honestly refuse) eat the limit
            for f in files_lane:
                if done >= limit_per_class:
                    break
                pairs = [pk for pk in parse_diagnostics(
                    os.path.join(CORPUS, f)) if len(pk[1]) <= 350]
                pairs.sort(key=lambda pk: 0 if is_numeric(pk[0]) else 1)
                for q, key in pairs:
                    t0 = time.time()
                    try:
                        r = answer(q)
                        lab = str(r.label)
                        ans = str(r.answer or "")
                        if lab.startswith("VERIFIED"):
                            kn = [float(x.replace(",", "")) for x in
                                  re.findall(r"-?\d[\d,]*(?:\.\d+)?", key)]
                            an = {float(x.replace(",", "")) for x in
                                  re.findall(r"-?\d[\d,]*(?:\.\d+)?", ans)}
                            kwords = [w for w in re.findall(
                                r"[a-z]{4,}", key.lower())][:6]
                            hit_words = sum(1 for w in kwords
                                            if w in ans.lower())
                            # result numbers: step-formatted keys carry
                            # the INPUTS first ("Step 1: P = 1,00,000...")
                            # -- grade against the key's FINAL values,
                            # which are the computed result
                            kn_tail = kn[-2:] if len(kn) >= 2 else kn
                            if kn_tail and all(
                                    any(abs(v - a) <= max(0.01, 0.02 * abs(v))
                                        for a in an) for v in kn_tail):
                                verdict = "SOLVE"
                            elif kn and all(
                                    any(abs(v - a) <= max(0.01, 0.02 * abs(v))
                                        for a in an) for v in kn[:2]):
                                verdict = "SOLVE"
                            elif kwords and hit_words >= max(
                                    2, len(kwords) // 2):
                                verdict = "SOLVE"
                            elif kwords and hit_words == 0 and \
                                    len(kwords) >= 3 and not an:
                                verdict = "WRONG"
                            elif kwords and hit_words == 0 and \
                                    len(kwords) >= 3:
                                # answer carries numbers that match no
                                # key number and no key word: only then
                                # is it a contradicting verified answer
                                verdict = ("WRONG" if an and kn and not
                                           (set(map(abs, an)) &
                                            set(map(abs, kn)))
                                           else "VERIFY_SOFT")
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
    totals = {}
    for lane, vs in sorted(summary.items()):
        c = {k: vs.count(k) for k in ("SOLVE", "WRONG", "VERIFY_SOFT",
                                      "REFUSE_OK", "REFUSE_NUM", "OTHER",
                                      "CRASH")}
        for k, v in c.items():
            totals[k] = totals.get(k, 0) + v
        print(f"  {lane:16s} " + " ".join(f"{k}={v}" for k, v in c.items()
                                          if v), flush=True)
    print("TOTALS:", totals, flush=True)
    print(f"\nWRONG total: {totals.get('WRONG', 0)} "
          f"(see {out_path}, verdict=WRONG rows)", flush=True)


def subj_of(fname):
    m = re.match(rf"c\d+_({SUBJECT_RE})", fname)
    if not m:
        return "?"
    return {"geo": "geo", "geography": "geo",
            "eco": "eco", "economics": "eco", "econ": "eco",
            "hist": "hist", "history": "hist",
            "histciv": "histciv",
            "civ": "civ", "civics": "civ"}.get(m.group(1), "?")


if __name__ == "__main__":
    main()
