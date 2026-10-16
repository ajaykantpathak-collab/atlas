"""DIAG-FIX scanner: legacy diagnostic-slot artifacts in CBSE classes 6-8.

Lane: c6/c7/c8 _cbse_ actionable families (bio/chem/civ/eco/geo/hist/math/physics,
short and long codes), _comp companions excluded, parked families (hin/english/
engl/gram) excluded per owner decision 2026-09-29.

Detects the two artifact classes from the brief (true counts replace W1's estimates):

 1. ANSWER-IN-QUESTION (P0, student-visible):
    a) SLOT_SWAP  - answer-key/analysis text pasted into the QUESTION slot
                    (W1 semantics: Q_SLOT_SLOP_RE, reused verbatim from
                    scan_wave2_rubric.py);
    b) KEY_LEAK   - the answer key's content tokens all appear in the question
                    body (answer-token subset-of-question pattern, e.g.
                    "...is called photosynthesis. What is this process called?").
                    Fill-in-the-blank stems are exempt from (b): the blank is the
                    point, the key is the filled word, and the word is by design
                    NOT printed in the stem (if it is printed AND blanked, that
                    is still a leak and stays flagged).

 2. EMPTY / UNSEEDED STEMS:
    c) EMPTY_STEM - question slot present but body empty / placeholder;
    d) TOO_SHORT  - question body < 4 words (W1 semantics);
    e) NOT_SHAPE  - no "?", no "____" blank, no question-word/imperative opener
                    (W1 semantics, extended Q_WORD_RE).

Every hit is written to diag/diag_scan.jsonl, one row per pair:
  {"file","n","kind","question","answer","topic"}
"topic" is the DEFINITION's first sentence (the node's named topic) to help
the authoring pass. Re-run after fixes; completion bar = zero 1a/1c/1d hits and
zero 1b/1e after repair.

Usage: python scan_diag_artifacts.py [--corpus PATH] [--out diag/diag_scan.jsonl]
"""

import argparse
import json
import os
import re
import sys
from collections import Counter

# --- W1 semantics, reused verbatim -------------------------------------------
Q_SLOT_SLOP_RE = re.compile(
    r"correct answer|wrong answer|\*\*analysis|reveals (the|a) (student|learner)"
    r"|misconception regarding|a wrong answer", re.I)
Q_WORD_RE = re.compile(
    r"^(what|why|how|when|which|who|where|can|could|do|does|did|is|are|was|were|if|state"
    r"|define|name|list|give|find|calculate|solve|explain|identify|estimate|true|false"
    r"|fill|match|choose|complete|write|draw|convert|simplify|express|should|will|would"
    r"|in this|according|based|design|create|evaluate|justify|compare|describe|construct"
    r"|verify|show|suppose|imagine|predict|determine|suggest|represent|illustrate"
    r"|examine|discuss|analyse|analyze)\b", re.I)

ACTIONABLE = {"bio", "chem", "civ", "eco", "geo", "hist", "math", "physics",
              "biology", "chemistry", "civics", "economics", "geography", "history"}

STOP = set("""a an the of to in on for with and or is are was were be been being it its
this that these those as at by from we you they he she not no can will would should may
might must do does did done have has had called call so such very much many more most
than then them their there here what which who whom whose why how when where also into
onto upon about above below between among each other another some any all both few own
same only just even still yet because if although while during before after under over
through against example e g i e etc""".split())

SEC_SPLIT = re.compile(r"(?m)^## (.+)$")
QNAME = re.compile(r"^DIAGNOSTIC_QUESTION_(\d+)$")
ANAME = re.compile(r"^DIAGNOSTIC_ANSWER_(\d+)$")
PLACEHOLDER_RE = re.compile(
    r"^(tbd|todo|n/?a|placeholder|none|nil|unknown|xxx|-{1,3}|\\*\\*|\\?+)$", re.I)


def wc(s: str) -> int:
    return len(s.split())


def content_tokens(s: str):
    return {t.strip(".,;:!?()[]{}\"'`*-—–") .lower()
            for t in s.split() if len(t.strip(".,;:!?()[]{}\"'`*-—–")) >= 3} - STOP


def sections_of(text: str):
    parts = SEC_SPLIT.split(text)
    out = []
    for i in range(1, len(parts) - 1, 2):
        out.append((parts[i].strip(), parts[i + 1]))
    return out


def first_sentence(definition: str, max_words: int = 28) -> str:
    d = " ".join(definition.split())
    m = re.match(r"(.+?[.!?])", d)
    s = m.group(1) if m else d
    words = s.split()
    return " ".join(words[:max_words])


def scan_file(path: str, fn: str):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    secs = {}
    for name, body in sections_of(text):
        secs[name] = body
    topic = first_sentence(secs.get("DEFINITION", ""))
    qnums = sorted(int(QNAME.match(k).group(1)) for k in secs if QNAME.match(k))
    hits = []
    for n in qnums:
        q = secs.get(f"DIAGNOSTIC_QUESTION_{n}", "").strip()
        a = secs.get(f"DIAGNOSTIC_ANSWER_{n}", "").strip()
        kinds = []
        # --- 1a: answer/analysis text sitting in the question slot ---
        if Q_SLOT_SLOP_RE.search(q):
            kinds.append("SLOT_SWAP")
        # --- 1b: answer-key tokens all present in the question body ---
        if q and a and not re.search(r"_{2,}", a):  # key itself isn't a blank
            atoks = content_tokens(a.split("\n")[0])  # head of the key
            if atoks and atoks <= content_tokens(q):
                # exempt: the stem blanks the key out (blank present in q
                # removes nothing here — if the token were printed AND blanked
                # the subset test already fired on the printed copy)
                kinds.append("KEY_LEAK")
        # --- 2c: empty / placeholder stem ---
        if not q or PLACEHOLDER_RE.match(q):
            kinds.append("EMPTY_STEM")
        # --- 2d: too short ---
        elif wc(q) < 4:
            kinds.append("TOO_SHORT")
        # --- 2e: not shaped as a question ---
        elif not ("?" in q or "____" in q or Q_WORD_RE.match(q)):
            kinds.append("NOT_SHAPE")
        if kinds:
            hits.append({"file": fn, "n": n, "kind": kinds, "question": q,
                         "answer": a, "topic": topic})
    return hits, len(qnums)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--corpus", default=r"D:\platform\deploy\content\enhanced_nodes_md")
    ap.add_argument("--out", default=os.path.join(os.path.dirname(__file__), "diag_scan.jsonl"))
    args = ap.parse_args()

    files = sorted(f for f in os.listdir(args.corpus)
                   if re.match(r"^c[678]_", f) and "_comp" not in f
                   and f.split("_")[1] in ACTIONABLE)
    rows, counts, nodes_hit, total_pairs = [], Counter(), set(), 0
    for fn in files:
        hits, npairs = scan_file(os.path.join(args.corpus, fn), fn)
        total_pairs += npairs
        if hits:
            nodes_hit.add(fn)
        for h in hits:
            for k in h["kind"]:
                counts[k] += 1
            rows.append(h)

    with open(args.out, "w", encoding="utf-8") as f:
        for r in rows:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")

    print(f"lane nodes={len(files)} diag_pairs={total_pairs}")
    print(f"hit_rows={len(rows)} hit_nodes={len(nodes_hit)}")
    for k, v in sorted(counts.items()):
        print(f"  {k}: {v}")
    # P0 view: nodes carrying SLOT_SWAP or KEY_LEAK
    p0 = sorted({r["file"] for r in rows if "SLOT_SWAP" in r["kind"] or "KEY_LEAK" in r["kind"]})
    print(f"P0 nodes (swap/leak): {len(p0)}")


if __name__ == "__main__":
    main()
