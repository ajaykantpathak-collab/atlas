"""derive_remaining_examples.py -- GAPS pass WS-A.

The last 14 nodes of the original 98 examples-missing list (BUGS.md
[fixed-gen]: 84 derived, 12 "honest skips", 2 Hindi deferred) that still
carry no WORKED_EXAMPLE section:

  * 12 non-Hindi grammar/communication nodes whose WALKTHROUGH embeds its
    concrete examples inside QUOTES containing sentence terminators
    ("'I saw a bird. The bird sat on a branch.'").  The shipped splitter
    split INSIDE those quoted examples, shredding every sentence into
    <40-char fragments -- the recorded "single-sentence walkthrough"
    skips were a splitter artifact, not missing content.
  * 2 Hindi-medium nodes deferred by the earlier owner directive; the
    owner has now approved Hindi derivation.  Both are damaged-corpus
    reconstruction nodes -- derivations are quality-gated (meta-noise
    filter below) and honestly skipped when no concrete problem
    instance exists.

Fix: a QUOTE-AWARE sentence splitter (never splits inside an unclosed
quote; splits after a closing quote that follows a terminator) with
Devanagari-aware sentence starts.  Everything else mirrors
derive_diagnostics.derive_worked_example exactly: PROBLEM/STEPS/
REASONING/ANSWER built only from the node's own WALKTHROUGH/
ON_FAILURE/MASTERY_CRITERIA sentences, mechanical fidelity verification
(every word >=4 chars incl. Devanagari words >=2 chars + every number
must exist in the node's own file; structural labels whitelisted), and
a hard no-node-ids guard on the derived block.

Usage:  python derive_remaining_examples.py [--dry]
"""
import importlib.util
import json
import os
import re
import sys
import zipfile

sys.argv = sys.argv or ["x"]
MD = r"D:\platform\deploy\content\enhanced_nodes_md"
BACKUP_ZIP = r"D:\platform\backend\_archive\gaps_examples_backups.zip"
EXAMPLES_MISSING_LIST = r"D:\platform\backend\_cache\gen_examples_missing.json"
DRY = "--dry" in sys.argv

_spec = importlib.util.spec_from_file_location(
    "dd", r"D:\platform\derive_diagnostics.py")
dd = importlib.util.module_from_spec(_spec)
_saved_argv = sys.argv
sys.argv = ["x"]
_spec.loader.exec_module(dd)
sys.argv = _saved_argv

# --------------------------------------------------------------------------- #
# quote-aware sentence splitting
# --------------------------------------------------------------------------- #
_TERMINATORS = set(".!?\u0964")
_OPEN_QUOTE = set("\u201c\u2018(")
_WORD_START = re.compile(r"[A-Z0-9\u0900-\u097F\"'(\u201c\u2018\[]")


def _is_quote_open(ch, prev):
    if ch == '"':
        return True
    if ch in ("\u201c", "\u2018", "("):
        return True
    if ch in ("'", "\u2019"):
        return prev == "" or prev.isspace() or prev in "(\u2014\u2013[-"
    return False


def _is_quote_close(ch, nxt):
    if ch in (')', '\u201d'):
        return True
    if ch == '\u2019':
        # a right single quote closes only when not word-internal ("didn't")
        return nxt == "" or nxt.isspace() or nxt in ",.;:!?)\u2014\u2013/]"
    if ch in ('"', "'"):
        # straight quotes close only when followed by whitespace / closing
        # punctuation / end -- "didn't" must not close an open quote
        return nxt == "" or nxt.isspace() or nxt in ",.;:!?)\u2014\u2013/]"
    return False


def split_sentences_quote_aware(text: str):
    """Split on sentence terminators only OUTSIDE quotes; also split right
    after a closing quote that terminates a sentence ('...come.' Next ...)."""
    text = dd._clean(text)
    out = []
    start = 0
    in_q = False
    q_stack = []
    i = 0
    n = len(text)
    while i < n:
        ch = text[i]
        prev = text[i - 1] if i else ""
        nxt = text[i + 1] if i + 1 < n else ""
        if not in_q and _is_quote_open(ch, prev):
            in_q = True
            q_stack.append(ch)
        elif in_q and _is_quote_close(ch, nxt) and q_stack:
            in_q = False
            q_stack.pop()
            prev_nonws = text[:i].rstrip()
            if prev_nonws and prev_nonws[-1] in _TERMINATORS:
                # sentence ends inside the quote; the closing quote belongs
                # to it -- split after the quote when a new sentence follows
                j = i + 1
                while j < n and text[j].isspace():
                    j += 1
                if j < n and _WORD_START.match(text[j]):
                    s = text[start:i + 1].strip()
                    if s:
                        out.append(s)
                    start = j
                    i = j
                    continue
        elif not in_q and ch in _TERMINATORS:
            # quote might close immediately after the terminator
            k = i + 1
            if k < n and _is_quote_close(text[k], text[k + 1] if k + 1 < n else "") and q_stack:
                in_q = False
                q_stack.pop()
                k += 1
            j = k
            while j < n and text[j].isspace():
                j += 1
            if j < n and _WORD_START.match(text[j]):
                s = text[start:k].strip(" ;:,\u2013\u2014-")
                if len(s) >= 25:
                    out.append(s)
                start = j
                i = j
                continue
        i += 1
    tail = text[start:].strip(" ;:,\u2013\u2014-")
    if len(tail) >= 25:
        out.append(tail)
    return out


#: reconstruction/meta noise that must never be surfaced as a problem,
#: step, reasoning or answer (damaged-corpus narration, not content)
_META_NOISE = (
    "\u092a\u0941\u0928\u0930\u094d\u091c\u0928\u093f\u0924",      # पुनर्जनित
    "\u092a\u0941\u0928\u0930\u094d\u0928\u093f\u0930\u094d\u092e\u093e\u0923",  # पुनर्निर्माण
    "\u0926\u0942\u0937\u093f\u0924",                              # दूषित
    "\u092c\u091a\u0947 \u0939\u0941\u090f \u091f\u0941\u0915\u0921\u093c\u0947",  # बचे हुए टुकड़े
    "\u0936\u092c\u094d\u0926\u0936\u0903",                        # शब्दशः
    "The user wants",
    "generation run",
    "\u092c\u091a\u0947 \u0935\u093f\u0935\u0930\u0923",          # बचे विवरण
    "\u091f\u0941\u0915\u0921\u093c\u093e",                        # टुकड़ा
    "\u0905\u0902\u0936 \u0925\u093e",                             # अंश था
)


def _meta(s: str) -> bool:
    low = s.lower()
    return any(m.lower() in low for m in _META_NOISE)


#: a sentence ending in an orphan list number (": 1." / "; 2.") is a split
#: artifact of a leftover fragment list, not prose
_ORPHAN_LIST_END = re.compile(r"[\s:;]+\d+\.?\s*$")


def sentences_qa(text: str, min_len: int = 25):
    out = []
    for s in split_sentences_quote_aware(text):
        if len(s) >= min_len and not _meta(s) and dd.usable_sentence(s) \
                and not _ORPHAN_LIST_END.search(s):
            out.append(s)
    return out


# --------------------------------------------------------------------------- #
# derivation (mirrors derive_diagnostics.derive_worked_example, new splitter)
# --------------------------------------------------------------------------- #
QUOTED_RE = dd.QUOTED_RE
NUMBER_RE = dd.NUMBER_RE
_ORPHAN_NUM_END = dd._ORPHAN_NUM_END

_DEV_WORD_RE = re.compile(r"[\u0900-\u097F][\u0900-\u097F\s]{1,}")
#: Hindi framing words used by the derived block labels ("Steps:"/"Answer:"
#: stay English structural labels like the shipped 84; no Hindi framing is
#: added, so the Devanagari check covers extracted content only)


def verify_fidelity_hi(text: str, source_text: str):
    """derive_diagnostics.verify_fidelity + Devanagari word tracing."""
    bad = dd.verify_fidelity(text, source_text)
    src = source_text
    src_compact = re.sub(r"[\s\u0964]+", "", src)
    for m in _DEV_WORD_RE.finditer(text):
        w = re.sub(r"[\s\u0964]+", "", m.group(0))
        if len(w) < 2:
            continue
        if w not in src_compact:
            bad.append("devanagari-word-not-in-source:" + w)
    return bad


def derive_worked_example(sections: dict, src_lower: str):
    walkthrough = sections.get("WALKTHROUGH", "")
    sents = sentences_qa(walkthrough, 25)
    if len(sents) < 2:
        return None, "fewer-than-2-usable-walkthrough-sentences"

    pi = 0
    for i in range(len(sents) - 1):        # problem needs a successor
        if QUOTED_RE.search(sents[i]) or NUMBER_RE.search(sents[i]):
            pi = i
            break
    problem = sents[pi]
    if not (40 <= len(problem) <= 400):
        return None, "problem-sentence-out-of-range"
    if not (QUOTED_RE.search(problem) or NUMBER_RE.search(problem)):
        return None, "no-concrete-instance-in-problem"

    answer = sents[pi + 1]
    if answer is problem or len(answer) < 20:
        return None, "no-answer-sentence"

    on_fail = sections.get("ON_FAILURE", "")
    steps = []
    for chunk in re.split(r"Step \d+:|चरण \d+:|\n", on_fail):
        for s in split_sentences_quote_aware(chunk):
            s = s.strip(" ;:,\u2013\u2014-")
            s = _ORPHAN_NUM_END.sub("", s).strip(" ;:,")
            if len(s) >= 15 and not _meta(s) and dd.usable_sentence(s):
                steps.append(s)
    steps = [s for s in steps if s != answer][:4]

    reasoning = ""
    for s in sentences_qa(sections.get("MASTERY_CRITERIA", ""), 40):
        reasoning = s
        break
    if not reasoning:
        tail = [s for s in sents if s not in (problem, answer)]
        reasoning = tail[-1] if tail else ""
    if reasoning and reasoning.lower() == answer.lower():
        reasoning = ""

    def _dot(s):
        core = s.rstrip("'\"\u201d\u2019)").rstrip()
        if core and core[-1] in ".!?\u0964":
            return s
        return s + "."

    lines = ["PROBLEM: " + _dot(problem), "", "STEPS:"]
    lines += ["- " + s for s in steps] or ["- " + _dot(answer)]
    if reasoning:
        lines += ["", "REASONING: " + _dot(reasoning)]
    lines += ["", "ANSWER: " + _dot(answer)]
    body = "\n".join(lines)

    if answer.lower() == problem.lower():
        return None, "answer-equals-problem"
    if dd.NODE_ID_RE.search(body):
        return None, "node-id-in-derived-block"
    return body, None


# --------------------------------------------------------------------------- #
def main():
    missing = json.load(open(EXAMPLES_MISSING_LIST, encoding="utf-8"))
    WE_RE = re.compile(r"^## WORKED_EXAMPLE_\d+", re.M)
    targets = []
    for stem in missing:
        path = os.path.join(MD, stem + ".md")
        if not os.path.isfile(path):
            continue
        text = open(path, encoding="utf-8-sig", errors="replace").read()
        if WE_RE.search(text):
            continue
        targets.append((stem, path, text))
    print("targets without WORKED_EXAMPLE:", len(targets))

    zf = None if DRY else zipfile.ZipFile(BACKUP_ZIP, "a", zipfile.ZIP_DEFLATED)
    derived = skipped = 0
    skips = []
    for stem, path, text in targets:
        sections = dd.enh.split_sections(text)
        body, why = derive_worked_example(sections, text.lower())
        if not body:
            skipped += 1
            skips.append((stem, why))
            continue
        bad = verify_fidelity_hi(body, text)
        if bad:
            skipped += 1
            skips.append((stem, "fidelity:" + ";".join(bad[:2])))
            continue
        derived += 1
        print("--- derived %s" % stem)
        print(body)
        print()
        if DRY:
            continue
        zf.writestr("gaps_example_backup/" + stem + ".md", text.encode("utf-8"))
        with open(path, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(text.rstrip("\n") + "\n\n## WORKED_EXAMPLE_1\n" + body + "\n")
    if zf is not None:
        zf.close()
    print("mode=%s | derived: %d | honest skips: %d"
          % ("DRY" if DRY else "WRITE", derived, skipped))
    for s in skips:
        print("  skip:", s)


if __name__ == "__main__":
    main()
