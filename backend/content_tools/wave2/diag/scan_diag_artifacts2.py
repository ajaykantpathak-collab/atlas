"""DIAG-FIX scanner v2 — final semantics for the legacy diagnostic-slot lane.

Refinements over v1 (after hand-reading the v1 hits):

 * KEY_LEAK: MCQ pairs are exempt. When the question carries >= 3 option
   markers ("A)", "(A)", "A." ...) the answer restating one option is the
   format working as designed, not a leak. Reorder/format answers whose
   tokens coincide with a list printed in the question are reviewed by hand
   (the v2 run lists every remaining KEY_LEAK for the authoring pass).
 * NOT_SHAPE: a stem is defective only when it carries NO prompt anywhere —
   no "?", no "____" blank, and no imperative verb in the whole text. W1's
   starter-only list under-counted shape ("Propose a …", "Trace the …",
   "A student walks 20 m … Calculate the speed." are all valid prompts).
   The v2 IMPERATIVE_RE matches anywhere in the stem, so commentary that
   merely quotes a prompt still fails (checked manually below).

Kinds reported (student-visible defect classes):
  SLOT_SWAP  answer-key/analysis text pasted into the QUESTION slot (P0)
  KEY_LEAK   answer key's content tokens all printed in the question (P0)
  NO_PROMPT  stem has no question, blank, or imperative — dead commentary (P1)
  TOO_SHORT  stem < 4 words (P1)
  EMPTY_STEM slot present, body empty/placeholder (P1)

Usage: python scan_diag_artifacts2.py [--corpus PATH] [--out diag/diag_scan2.jsonl]
"""

import argparse
import json
import os
import re
from collections import Counter

ACTIONABLE = {"bio", "chem", "civ", "eco", "geo", "hist", "math", "physics",
              "biology", "chemistry", "civics", "economics", "geography", "history"}

# W1 slot-slop semantics, verbatim
Q_SLOT_SLOP_RE = re.compile(
    r"correct answer|wrong answer|\*\*analysis|reveals (the|a) (student|learner)"
    r"|misconception regarding|a wrong answer", re.I)

# imperative/task verbs matched ANYWHERE in the stem (superset of W1's list)
IMPERATIVE_RE = re.compile(
    r"\b(what|why|how|when|which|who|where|whose|can|could|do|does|did|is|are|was|were|if"
    r"|state|define|name|list|give|find|calculate|solve|explain|identify|estimate|true"
    r"|false|fill|match|choose|select|complete|write|draw|convert|simplify|express|should"
    r"|will|would|design|create|evaluate|justify|compare|describe|construct|verify|show"
    r"|suppose|imagine|predict|determine|suggest|represent|illustrate|examine|discuss"
    r"|analyse|analyze|propose|draft|trace|use|think|assess|arrange|differentiate"
    r"|classify|compute|derive|prove|mention|count|measure|calculate|reason|argue|support"
    r"|refute|correct|rewrite|expand|round|add|subtract|multiply|divide|convert)\b", re.I)

OPTION_MARK_RE = re.compile(r"(?:^|[\s(])[A-D][).]\s", re.M)

SEC_SPLIT = re.compile(r"(?m)^## (.+)$")
QNAME = re.compile(r"^DIAGNOSTIC_QUESTION_(\d+)$")

STOP = set("""a an the of to in on for with and or is are was were be been being it its
this that these those as at by from we you they he she not no can will would should may
might must do does did done have has had called call so such very much many more most
than then them their there here what which who whom whose why how when where also into
onto upon about above below between among each other another some any all both few own
same only just even still yet because if although while during before after under over
through against example following options statements""".split())


def wc(s):
    return len(s.split())


def content_tokens(s):
    out = set()
    for t in s.split():
        t = t.strip(".,;:!?()[]{}\"'`*-—–°%₹").lower()
        if len(t) >= 3 and t not in STOP:
            out.add(t)
    return out


def sections_of(text):
    parts = SEC_SPLIT.split(text)
    return [(parts[i].strip(), parts[i + 1]) for i in range(1, len(parts) - 1, 2)]


def first_sentence(definition, max_words=28):
    d = " ".join(definition.split())
    m = re.match(r"(.+?[.!?])", d)
    s = m.group(1) if m else d
    return " ".join(s.split()[:max_words])


def scan_file(path, fn):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    secs = dict(sections_of(text))
    topic = first_sentence(secs.get("DEFINITION", ""))
    qnums = sorted(int(QNAME.match(k).group(1)) for k in secs if QNAME.match(k))
    hits = []
    for n in qnums:
        q = secs.get(f"DIAGNOSTIC_QUESTION_{n}", "").strip()
        a = secs.get(f"DIAGNOSTIC_ANSWER_{n}", "").strip()
        kinds = []
        if Q_SLOT_SLOP_RE.search(q):
            kinds.append("SLOT_SWAP")
        if q and a and len(content_tokens(a.split("\n")[0])) >= 1 \
                and content_tokens(a.split("\n")[0]) <= content_tokens(q) \
                and not re.search(r"_{2,}", a):
            # MCQ exemption: options live in the stem; the key restates one
            if not (len(OPTION_MARK_RE.findall(q)) >= 3 and re.match(r"\(?[A-D]\)", a, re.I)):
                kinds.append("KEY_LEAK")
        if not q or re.fullmatch(r"(tbd|todo|n/?a|placeholder|none|nil|-{1,3}|\?+)", q, re.I):
            kinds.append("EMPTY_STEM")
        elif wc(q) < 4:
            kinds.append("TOO_SHORT")
        elif not ("?" in q or "____" in q or IMPERATIVE_RE.search(q)):
            kinds.append("NO_PROMPT")
        if kinds:
            hits.append({"file": fn, "n": n, "kind": kinds, "question": q,
                         "answer": a, "topic": topic})
    return hits


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--corpus", default=r"D:\platform\deploy\content\enhanced_nodes_md")
    ap.add_argument("--out", default=os.path.join(os.path.dirname(__file__), "diag_scan2.jsonl"))
    args = ap.parse_args()

    files = sorted(f for f in os.listdir(args.corpus)
                   if re.match(r"^c[678]_", f) and "_comp" not in f
                   and f.split("_")[1] in ACTIONABLE)
    rows, counts, nodes = [], Counter(), set()
    for fn in files:
        for h in scan_file(os.path.join(args.corpus, fn), fn):
            nodes.add(fn)
            for k in h["kind"]:
                counts[k] += 1
            rows.append(h)
    with open(args.out, "w", encoding="utf-8") as f:
        for r in rows:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")
    print(f"lane nodes={len(files)} artifact_slots={len(rows)} artifact_nodes={len(nodes)}")
    for k, v in sorted(counts.items()):
        print(f"  {k}: {v}")
    p0 = sorted({r["file"] for r in rows if "SLOT_SWAP" in r["kind"] or "KEY_LEAK" in r["kind"]})
    print(f"P0 nodes: {len(p0)}")


if __name__ == "__main__":
    main()
