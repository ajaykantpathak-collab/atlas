"""Independent verification for the DIAG-FIX batch. Two gates, both must be green.

GATE 1 - backup diff (does not reuse the applier's digest code):
 for every file in the manifest, split BACKUP and CURRENT into '## ' sections
 with an independent splitter and require:
   - identical section header sequence (no structural change);
   - every differing section is a DIAGNOSTIC_QUESTION_n named in that file's
     manifest rows (keys, and every other section, byte-identical);
   - the new question body is non-empty and differs from the old.

GATE 2 - full re-scan (scanner v3 semantics):
   SLOT_SWAP true-positive = W1 slop regex matches the stem AND the stem has
     no prompt anywhere (no '?', no blank, no imperative). The 13 evaluate-
     the-work prompts that merely say 'state the correct answer' are
     question-shaped and therefore NOT artifacts; a re-scan that still
     counted them would misreport.
   KEY_LEAK = answer-head tokens subset of stem tokens, MCQs exempt.
   NO_PROMPT / TOO_SHORT / EMPTY_STEM as in v2, with the imperative list
     extended (group, distinguish, defend, order, critique, mark) after hand
     review showed those starters are valid task prompts.

Usage: python verify_diag.py [--corpus PATH] [--backup DIR] [--manifest FILE]
"""

import argparse
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scan_wave2_rubric import Q_SLOT_SLOP_RE  # noqa: E402  (W1 semantics, verbatim)

ACTIONABLE = {"bio", "chem", "civ", "eco", "geo", "hist", "math", "physics",
              "biology", "chemistry", "civics", "economics", "geography", "history"}
SEC = re.compile(r"(?m)^## (.+)$")
QN = re.compile(r"^DIAGNOSTIC_QUESTION_(\d+)$")

IMPERATIVE_RE = re.compile(
    r"\b(what|why|how|when|which|who|where|whose|can|could|do|does|did|is|are|was|were|if"
    r"|state|define|name|list|give|find|calculate|solve|explain|identify|estimate|true"
    r"|false|fill|match|choose|select|complete|write|draw|convert|simplify|express|should"
    r"|will|would|design|create|evaluate|justify|compare|describe|construct|verify|show"
    r"|suppose|imagine|predict|determine|suggest|represent|illustrate|examine|discuss"
    r"|analyse|analyze|propose|draft|trace|use|think|assess|arrange|differentiate"
    r"|classify|compute|derive|prove|mention|count|measure|reason|argue|support|refute"
    r"|correct|rewrite|expand|round|add|subtract|multiply|divide|group|distinguish|defend"
    r"|order|critique|mark|sort)\b", re.I)
OPTION_MARK_RE = re.compile(r"(?:^|[\s(])[A-D][).]\s", re.M)
STOP = set("""a an the of to in on for with and or is are was were be been being it its this
that these those as at by from we you they he she not no can will would should may might must
do does did done have has had called call so such very much many more most than then them
their there here what which who whom whose why how when where also into onto upon about above
below between among each other another some any all both few own same only just even still yet
because if although while during before after under over through against example following
options statements""".split())


def split(text):
    parts = SEC.split(text)
    return [(parts[i].strip(), parts[i + 1]) for i in range(1, len(parts) - 1, 2)]


def ctoks(s):
    out = set()
    for t in s.split():
        t = t.strip(".,;:!?()[]{}\"'`*-—–°%₹").lower()
        if len(t) >= 3 and t not in STOP:
            out.add(t)
    return out


def gate1(corpus, backup, manifest):
    fails = 0
    rows = [json.loads(l) for l in open(manifest, encoding="utf-8")]
    by_file = {}
    for r in rows:
        by_file.setdefault(r["file"], set()).update(
            name for name in r["edited"] if name.startswith("DIAGNOSTIC_QUESTION_"))
    for fn, allowed in sorted(by_file.items()):
        cur = open(os.path.join(corpus, fn), encoding="utf-8").read()
        bak = open(os.path.join(backup, fn), encoding="utf-8").read()
        cs, bs = dict(split(cur)), dict(split(bak))
        if [h for h, _ in split(cur)] != [h for h, _ in split(bak)]:
            print(f"FAIL {fn}: section structure changed"); fails += 1; continue
        for name in bs:
            if bs[name] == cs.get(name):
                continue
            if name not in allowed:
                print(f"FAIL {fn}: unexpected change in {name}"); fails += 1
        for name in allowed:
            if bs.get(name) == cs.get(name):
                print(f"FAIL {fn}: {name} listed in manifest but unchanged"); fails += 1
            elif not cs.get(name, "").strip():
                print(f"FAIL {fn}: {name} now empty"); fails += 1
    print(f"GATE1 backup-diff: files={len(by_file)} fails={fails}")
    return fails


def gate2(corpus):
    """Hard classes: SLOT_SWAP / EMPTY_STEM / TOO_SHORT / NO_PROMPT (must be 0).
    KEY_LEAK is a candidate generator: token-subset cannot judge whether the
    key's presence in the stem is task furniture (options, given numbers,
    listed items) or a declarative reveal, so every candidate is adjudicated
    by hand; the ledger lives in DIAG_REPORT.md section 3."""
    hard = 0
    counts = {"SLOT_SWAP": 0, "KEY_LEAK": 0, "NO_PROMPT": 0, "TOO_SHORT": 0, "EMPTY_STEM": 0}
    detail = []
    files = sorted(f for f in os.listdir(corpus)
                   if re.match(r"^c[678]_", f) and "_comp" not in f
                   and f.split("_")[1] in ACTIONABLE)
    for fn in files:
        secs = dict(split(open(os.path.join(corpus, fn), encoding="utf-8").read()))
        for k in [k for k in secs if QN.match(k)]:
            n = QN.match(k).group(1)
            q = secs[k].strip()
            a = secs.get(f"DIAGNOSTIC_ANSWER_{n}", "").strip()
            shaped = bool("?" in q or re.search(r"_{2,}", q) or IMPERATIVE_RE.search(q))
            mcq = len(OPTION_MARK_RE.findall(q)) >= 3 and \
                re.match(r"\(?([A-D][.)]|\d[.)])", a, re.I)
            if Q_SLOT_SLOP_RE.search(q) and not shaped:
                counts["SLOT_SWAP"] += 1; detail.append((fn, n, "SLOT_SWAP"))
            if q and a and not re.search(r"_{2,}", a) and not mcq:
                head = ctoks(a.split("\n")[0])
                if head and head <= ctoks(q):
                    counts["KEY_LEAK"] += 1; detail.append((fn, n, "KEY_LEAK"))
            if not q or re.fullmatch(r"(tbd|todo|n/?a|placeholder|none|nil|-{1,3}|\?+)", q, re.I):
                counts["EMPTY_STEM"] += 1; detail.append((fn, n, "EMPTY_STEM"))
            elif len(q.split()) < 4:
                counts["TOO_SHORT"] += 1; detail.append((fn, n, "TOO_SHORT"))
            elif not shaped:
                counts["NO_PROMPT"] += 1; detail.append((fn, n, "NO_PROMPT"))
    hard = counts["SLOT_SWAP"] + counts["EMPTY_STEM"] + counts["TOO_SHORT"] + counts["NO_PROMPT"]
    print(f"GATE2 re-scan ({len(files)} lane files): " +
          " ".join(f"{k}={v}" for k, v in counts.items()))
    for d in detail:
        print("  ", d)
    return hard, counts, detail


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--corpus", default=r"D:\platform\deploy\content\enhanced_nodes_md")
    ap.add_argument("--backup", default=os.path.join(os.path.dirname(__file__), "backups_diag"))
    ap.add_argument("--manifest", default=os.path.join(os.path.dirname(__file__), "diag_apply_manifest.jsonl"))
    args = ap.parse_args()
    f1 = gate1(args.corpus, args.backup, args.manifest)
    hard, counts, _ = gate2(args.corpus)
    print(f"VERDICT: {'GREEN' if f1 == 0 and hard == 0 else 'RED'} "
          f"(gate1_fails={f1}, hard_artifacts={hard}, "
          f"key_leak_candidates_for_hand_review={counts['KEY_LEAK']})")
    sys.exit(0 if f1 == 0 and hard == 0 else 1)
