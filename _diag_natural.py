"""_diag_natural.py — classify which nodes are DIAGRAM-NATURAL: their own
DEFINITION/WALKTHROUGH carries spatial/structural/process/quantitative
signal that a technical figure would teach.  Produces the honest target,
per subject, per board, with current diagram coverage overlaid.
"""
import json
import os
import re
from collections import Counter, defaultdict

ROOT = r"D:\platform"

# signal lexicon: words that appear in nodes whose teaching genuinely
# benefits from a technical figure (not doodle-card prose illustration)
SIGNALS = {
    "structure": re.compile(
        r"\b(structure|anatomy|organelle|labelled diagram|labeled|parts of|"
        r"component|sections? of|layer|tissue|cell wall|membrane|skeleton|"
        r"apparatus|setup)\b", re.I),
    "process": re.compile(
        r"\b(process|stages?|steps?|cycle|sequence|phases?|flow (?:of|chart)|"
        r"transforms?|converts?|secretion|digestion|respiration|"
        r"photosynthesis|transpiration|reproduction|germination|"
        r"fermentation|distillation)\b", re.I),
    "spatial": re.compile(
        r"\b(map|region|location|latitude|longitude|cross[- ]section|"
        r"landscape|plateau|delta|drainage|monsoon|horizon|orbit|"
        r"ray|reflection|refraction|lens|mirror|circuit|magnet)\b", re.I),
    "quant": re.compile(
        r"\b(curve|graph|plot|axis|demand curve|supply|coordinates|"
        r"triangle|circle|angle|polygon|construction|theorem|"
        r"geometric|locus|parabola|hyperbola)\b", re.I),
    "hierarchy": re.compile(
        r"\b(hierarchy|classification|kingdom|taxonomy|court|"
        r"organogram|organization structure|framework|tier)\b", re.I),
}
_STRONG = 2   # signals needed to call a node diagram-natural


def sections(md_text):
    out = {}
    cur = None
    buf = []
    for line in md_text.splitlines():
        m = re.match(r"^##\s+(.+)", line)
        if m:
            if cur:
                out[cur] = "\n".join(buf)
            cur, buf = m.group(1).strip().upper(), []
        elif cur:
            buf.append(line)
    if cur:
        out[cur] = "\n".join(buf)
    return out


def natural_score(md_text):
    sec = sections(md_text)
    body = "\n".join([sec.get("DEFINITION", ""), sec.get("WALKTHROUGH", "")])
    if len(body) < 120:
        return 0, []
    hits = [name for name, rx in SIGNALS.items() if rx.search(body)]
    return len(hits), hits


def load_covered():
    covered = set()
    idx = os.path.join(ROOT, "deploy", "frontend", "public", "diagrams",
                       "diagrams_index.json")
    if os.path.exists(idx):
        covered |= set(json.load(open(idx, encoding="utf-8")).keys())
    for p in os.listdir(os.path.join(ROOT, "_cisce_build")):
        pass
    import glob
    for pf in glob.glob(os.path.join(ROOT, "_cisce_build", "*",
                                     "diagrams_index_*_part.json")):
        try:
            covered |= set(json.load(open(pf, encoding="utf-8")).keys())
        except Exception:
            pass
    return covered


def main():
    covered = load_covered()
    rows = []
    for board, corpus in (("CBSE", "enhanced_nodes_md"),
                          ("CISCE", "cisce_nodes_v2")):
        d = os.path.join(ROOT, "deploy", "content", corpus)
        for fn in os.listdir(d):
            if not fn.endswith(".md"):
                continue
            nid = fn[:-3]
            m = re.match(r"(c\d+)_([a-z]+)_", nid)
            if not m:
                continue
            cls, subj = m.groups()
            if subj in ("eng", "engl", "hin", "gram", "eng_k", "eng_w",
                        "eng_f", "eng_h", "eng_s", "eng_v",
                        "hin_a", "hin_ar", "hin_al", "hin_ga", "hin_kr",
                        "hin_ks", "hin_sp", "hin_v"):
                continue
            try:
                md = open(os.path.join(d, fn), encoding="utf-8",
                          errors="ignore").read()
            except OSError:
                continue
            score, hits = natural_score(md)
            rows.append({"board": board, "cls": cls, "subj": subj,
                         "nid": nid, "score": score, "hits": hits,
                         "covered": nid in covered})

    total = Counter(r["board"] for r in rows)
    natural = Counter(r["board"] for r in rows if r["score"] >= _STRONG)
    cov_natural = Counter(r["board"] for r in rows
                          if r["score"] >= _STRONG and r["covered"])
    print(f"{'board':<6} {'in-scope':>9} {'diagram-natural':>16} "
          f"{'natural covered':>16}")
    for b in ("CBSE", "CISCE"):
        print(f"{b:<6} {total[b]:>9} {natural[b]:>16} {cov_natural[b]:>16}")

    # per-subject natural gap for the running lanes' bands
    per = defaultdict(lambda: [0, 0, 0])
    for r in rows:
        if r["score"] < _STRONG:
            continue
        k = (r["board"], r["cls"], r["subj"])
        per[k][0] += 1
        if r["covered"]:
            per[k][1] += 1
    gaps = sorted(((v[0] - v[1], k, v) for k, v in per.items()),
                  reverse=True)
    print("\nTOP natural-gaps still open (board class subject: "
          "natural / covered / gap):")
    for gap, k, v in gaps[:18]:
        print(f"  {k[0]} {k[1]} {k[2]:<10} {v[0]:>4} {v[1]:>4} {gap:>4}")

    json.dump([r for r in rows if r["score"] >= _STRONG],
              open(os.path.join(ROOT, "_diag_natural.json"), "w",
                   encoding="utf-8"), ensure_ascii=False)
    print("\nsaved: _diag_natural.json")


if __name__ == "__main__":
    main()
