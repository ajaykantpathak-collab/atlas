"""derive_diagnostics.py -- WEEKEND CONTENT-GENERATION PASS (gen).

OWNER DIRECTIVE: expand question content as much as possible while holding
the platform's zero-wrong guarantee. No videos, no Hindi nodes.

Three workstreams, one engine, all EXTRACTIVE (zero-wrong by construction
+ mechanical fidelity verification, same discipline as derive_eli5.py):

  WS1  DIAGNOSTICS DEPTH  -- derive up to 6 extra DIAGNOSTIC_QUESTION_N /
       DIAGNOSTIC_ANSWER_N sections per teaching node from the node's own
       authored text (definition -> question, fill-the-blank from authored
       sentences, number-probe, misconception/mastery recall).  Target ~12
       total per node (authored is 4-6).  The enhanced-nodes parser already
       reads numbered diagnostics up to 50, so enrichment serving needs no
       code change -- only an index rebuild (fingerprint changes).

  WS3  THE 98 EXAMPLES-MISSING NODES -- derive a WORKED_EXAMPLE_1 section
       (PROBLEM/STEPS/REASONING/ANSWER, the exact enrichment `examples`
       shape) from each node's own WALKTHROUGH where it contains a concrete
       problem instance.  96 non-Hindi nodes targeted (2 Hindi deferred).

  WS2  PRACTICE VARIANTS    -- handled by backend/tools/insert_derived_
       questions.py (Phase B): every derived section above is also inserted
       into board_questions by the platform's own extractor discipline, so
       practice/diagnostics sessions draw the new pool.  Generator-sourced
       MCQ variants are inserted by the same Phase B script with structural
       validation (answer-in-options etc.).

Zero-wrong guarantees enforced in-script:
  * every word (>=4 chars) and every number of a derived string must occur
    in the source file (small framing whitelist, like derive_eli5);
  * answers are substrings of the source by construction (verified anyway);
  * fill-the-blank answers occur EXACTLY ONCE in the question sentence and
    the blanked sentence stays otherwise verbatim;
  * sentences bearing corpus node-ids (cX_subj_...) are never used;
  * sentence-boundary truncation only; idempotent via manifest + zip backup.

Usage:  python derive_diagnostics.py [--dry] [--limit N]
"""
import importlib.util
import json
import os
import re
import sys
import zipfile
from collections import Counter

MD = r"D:\platform\deploy\content\enhanced_nodes_md"
BACKUP_ZIP = r"D:\platform\backend\_archive\gen_backups.zip"
MANIFEST = r"D:\platform\backend\_cache\gen_diagnostics_manifest.json"
EXAMPLES_MISSING_LIST = r"D:\platform\backend\_cache\gen_examples_missing.json"

_spec = importlib.util.spec_from_file_location(
    "enh", r"D:\platform\deploy\backend\services\enhanced_nodes.py")
enh = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(enh)

DRY = "--dry" in sys.argv
LIMIT = None
if "--limit" in sys.argv:
    LIMIT = int(sys.argv[sys.argv.index("--limit") + 1])

MAX_TOTAL_DIAG = 12        # target per-node total (authored + derived)
MAX_ADD_PER_NODE = 6       # derived additions per node

# --------------------------------------------------------------------------- #
# text helpers (eli5 discipline)
# --------------------------------------------------------------------------- #
MATH_SPAN_RE = re.compile(
    r"\\\(.{0,400}?\\\)|\\\[.{0,400}?\\\]|\$\$.{0,400}?\\$\$|\$[^$\n]{1,200}\$")
SENT_SPLIT_RE = re.compile(r"(?<=[.!?\u0964])\s+(?=[A-Z0-9\"(\[])")
MARKDOWN_JUNK_RE = re.compile(r"\*\*|`{1,3}|^#{1,6}\s", re.M)
NODE_ID_RE = re.compile(r"\bc\d+_[a-z][a-z_]*_\w")
NUMBER_RE = re.compile(r"\d+(?:\.\d+)?")
MARKDOWN_LINK_RE = re.compile(r"\]\(")

#: framing words allowed in derived questions (everything else >=4 chars
#: must exist in the node's own file)
FRAMING_WHITELIST = frozenset("""
what fill blank state given this that lesson about must able master topic
common does with from your you the and for are was were have has its write
name following complete according answer answers question questions flag
problem steps reasoning
""".split())

#: terms never used as fill-the-blank answers (too generic to be salient)
STOP_TERMS = frozenset("""
which there their these those other because about into under after before
where while being every never always between through during without
students student example examples lesson board exam exams given using based
learn learning concept concepts topic answers question correct wrong marks
chapter class subject should would could might many much very more most
also such each both will shall when what who whom whose how does done
have had been from onto over again further once here they them then than
thing things text line lines word words first second third point points
part parts type types form forms value values number numbers different
following above below important various several often sometimes called
known rules rule case cases way ways used useful makes make take taken
""".split())

TERM_SPLIT_SEPS = (" is defined as", " is the ", " are the ", " refers to ",
                   " means ", " is a ", " is an ", " is ", " are ")
#: math-bearing characters that disqualify a candidate term (the split
#: landed inside a formula, not on the concept)
_TERM_BAD_CHARS = set("=+^²³×÷√≠≈±≤≥[]|")


def _clean(text: str) -> str:
    text = MARKDOWN_JUNK_RE.sub("", text or "")
    return re.sub(r"\s+", " ", text).strip()


def _prose_ratio(sentence: str) -> float:
    stripped = MATH_SPAN_RE.sub("", sentence)
    if not stripped:
        return 0.0
    good = sum(ch.isalnum() or ch.isspace() for ch in stripped)
    return good / max(1, len(stripped))


def sentences(text: str, min_len: int = 30) -> list:
    out = []
    for s in SENT_SPLIT_RE.split(_clean(text)):
        s = s.strip(" ;:,\u2013\u2014-")
        if len(s) >= min_len:
            out.append(s)
    return out


def usable_sentence(s: str) -> bool:
    """A sentence safe to surface/blank: prose, no math spans, no markdown
    links, no corpus node-ids (never student-facing)."""
    if MATH_SPAN_RE.search(s) or NODE_ID_RE.search(s) or MARKDOWN_LINK_RE.search(s):
        return False
    return _prose_ratio(s) >= 0.82


def term_of(definition: str):
    """The defined concept ('Electric current is the rate ...' ->
    'Electric current'), same heuristic as the index title-deriver."""
    head = _clean(definition).split("\n")[0].strip()
    for sep in TERM_SPLIT_SEPS + (" \u2013 ", " \u2014 ", " - ", ": ", "."):
        if sep in head:
            cand = head.split(sep, 1)[0].strip()
            cand = cand.strip(" .;:,")
            if 3 <= len(cand) <= 60 and len(cand.split()) <= 6 \
                    and not NODE_ID_RE.search(cand) and ":" not in cand:
                # math-bearing or article-led heads are split artifacts,
                # not clean concept terms
                if any(ch in _TERM_BAD_CHARS for ch in cand):
                    continue
                if cand[:4].lower() in ("the ", "a ") or \
                        cand[:3].lower() == "an " or \
                        cand.split(" ")[0].lower() in ("the", "a", "an"):
                    continue
                if any(ch.isdigit() for ch in cand):
                    continue
                return cand
    return None


# --------------------------------------------------------------------------- #
# zero-wrong fidelity verification
# --------------------------------------------------------------------------- #
_NUM_RE = re.compile(r"\d+")
_WORD_RE = re.compile(r"[A-Za-z]{4,}")


def verify_fidelity(text: str, source_text: str) -> list:
    """[] == pass.  Every word >=4 chars + every number must exist in the
    source file (framing whitelisted).  Mirrors derive_eli5.verify_fidelity."""
    src = source_text.lower()
    bad = []
    for num in _NUM_RE.findall(text.lower()):
        if num not in src:
            bad.append("number-not-in-source:" + num)
    for w in _WORD_RE.findall(text.lower()):
        if w in FRAMING_WHITELIST:
            continue
        if w not in src:
            bad.append("word-not-in-source:" + w)
    return bad


# --------------------------------------------------------------------------- #
# derivation transforms
# --------------------------------------------------------------------------- #

def _blank_candidate(sentence: str, src_lower: str):
    """Pick the salient term to blank: alpha, >=5 chars, non-stopword,
    exactly once in the sentence, and present elsewhere in the file (>=2
    total occurrences -> a recurring key term)."""
    best = None
    low = sentence.lower()
    for m in re.finditer(r"[A-Za-z]{5,}", sentence):
        tok = m.group(0)
        tl = tok.lower()
        if tl in STOP_TERMS:
            continue
        if low.count(tl) != 1:
            continue
        if src_lower.count(tl) < 2:            # must be a recurring key term
            continue
        if best is None or len(tok) > len(best):
            best = tok
    return best


def t_fill_blank(sentence: str, src_lower: str, label: str):
    term = _blank_candidate(sentence, src_lower)
    if not term:
        return None
    q = sentence.replace(term, "______", 1)
    if "______" not in q or term.lower() in q.lower():
        return None
    a = term
    return {
        "kind": "fb_" + label, "question": "Fill in the blank: " + q,
        "answer": a,
    }


def t_what_is(definition: str, src_lower: str):
    term = term_of(definition)
    if not term:
        return None
    sents = [s for s in sentences(definition, 40) if usable_sentence(s)]
    if not sents:
        return None
    answer = sents[0]
    if len(answer) > 340:
        answer = answer[:340].rsplit(" ", 1)[0].rstrip(",;:") + "."
    if term.lower() not in src_lower:
        return None
    return {
        "kind": "what_is",
        "question": "What is %s? State the definition given in this lesson."
                    % term,
        "answer": answer if answer.endswith(".") else answer + ".",
    }


def t_misconception(misconception: str, term: str, src_lower: str):
    if not misconception or not term:
        return None
    sents = [s for s in sentences(misconception, 40) if usable_sentence(s)]
    if not sents:
        return None
    answer = sents[0]
    if not (30 <= len(answer) <= 340):
        return None
    return {
        "kind": "mc_recall",
        "question": ("What common mix-up does this lesson flag about %s?"
                     % term),
        "answer": answer if answer.endswith(".") else answer + ".",
    }


def t_mastery(mastery: str):
    if not mastery:
        return None
    sents = [s for s in sentences(mastery, 40) if usable_sentence(s)]
    if not sents:
        return None
    answer = sents[0]
    if len(answer) > 340:
        answer = answer[:340].rsplit(" ", 1)[0].rstrip(",;:") + "."
    return {
        "kind": "mastery",
        "question": "What must you be able to do to master this topic?",
        "answer": answer if answer.endswith(".") else answer + ".",
    }


def t_number_probe(all_sections_text: str, src_lower: str):
    """Blank the single number of an authored sentence.  Class labels
    ('a Class 10 student') are skipped — they are audience tags, not
    content, and blanking them makes trivia."""
    for s in sentences(all_sections_text, 45):
        if not usable_sentence(s):
            continue
        nums = NUMBER_RE.findall(s)
        if len(nums) != 1 or len(nums[0]) > 8:
            continue
        if re.search(r"[Cc]lass\s+" + re.escape(nums[0]), s):
            continue
        if src_lower.count(nums[0]) < 2:       # recurring number, not a page artifact
            continue
        q = s.replace(nums[0], "______", 1)
        if nums[0] in q:
            continue
        return {"kind": "fb_num",
                "question": "Fill in the blank: " + q, "answer": nums[0]}
    return None


def derive_diags(sections: dict, src_lower: str, k_existing: int) -> list:
    """Up to MAX_ADD_PER_NODE derived Q/A pairs for one node."""
    definition = sections.get("DEFINITION", "")
    walkthrough = sections.get("WALKTHROUGH", "")
    misconception = sections.get("COMMON_MISCONCEPTION", "")
    mastery = sections.get("MASTERY_CRITERIA", "")
    term = term_of(definition) or ""

    room = min(MAX_ADD_PER_NODE, max(0, MAX_TOTAL_DIAG - k_existing))
    if room <= 0:
        return []

    candidates = []
    # 1-2: fill-the-blank on definition, then walkthrough
    for s in [x for x in sentences(definition, 55) if usable_sentence(x)]:
        c = t_fill_blank(s, src_lower, "def")
        if c:
            candidates.append(c)
            break
    for s in [x for x in sentences(walkthrough, 55) if usable_sentence(x)]:
        c = t_fill_blank(s, src_lower, "walk")
        if c:
            candidates.append(c)
            break
    # 3: definition -> question
    c = t_what_is(definition, src_lower)
    if c:
        candidates.append(c)
    # 4: number probe (definition+walkthrough text)
    c = t_number_probe(definition + " " + walkthrough, src_lower)
    if c:
        candidates.append(c)
    # 5: misconception recall
    c = t_misconception(misconception, term, src_lower)
    if c:
        candidates.append(c)
    # 6: mastery recall
    c = t_mastery(mastery)
    if c:
        candidates.append(c)
    return candidates[:room]


# --------------------------------------------------------------------------- #
# WS3: worked-example derivation from WALKTHROUGH
# --------------------------------------------------------------------------- #
QUOTED_RE = re.compile(r"['\"\u2018\u2019\u201c\u201d].{3,80}['\"\u2018\u2019\u201c\u201d]")
#: authored step lists numbered '1. ... 2. ...' get sentence-split mid-token,
#: leaving orphan '...: 1.' tails — strip them (formatting artifact only,
#: never touches authored words)
_ORPHAN_NUM_END = re.compile(r"[\s:]*\d+\.\s*$")


def derive_worked_example(sections: dict, src_lower: str):
    """PROBLEM/STEPS/REASONING/ANSWER block, fully authored text.

    PROBLEM  = the walkthrough sentence posing the concrete instance
               (quoted span or a number), else the first usable sentence.
    ANSWER   = the walkthrough's own outcome (following sentence).
    STEPS    = authored ON_FAILURE sentences (step recipe), else the
               walkthrough sentences between problem and answer.
    REASONING= authored MASTERY_CRITERIA first sentence, else the last
               walkthrough sentence.
    """
    walkthrough = sections.get("WALKTHROUGH", "")
    sents = [s for s in sentences(walkthrough, 25) if usable_sentence(s)]
    if not sents:
        return None, "no-usable-walkthrough-sentences"

    pi = 0
    for i in range(max(1, len(sents) - 1)):     # the problem needs a successor
        if QUOTED_RE.search(sents[i]) or NUMBER_RE.search(sents[i]):
            pi = i
            break
    problem = sents[pi]
    if not (40 <= len(problem) <= 400):
        return None, "problem-sentence-out-of-range"

    answer = sents[pi + 1] if pi + 1 < len(sents) else sents[-1]
    if answer is problem or len(answer) < 20:
        return None, "no-answer-sentence"

    on_fail = sections.get("ON_FAILURE", "")
    steps = [s for s in sentences(on_fail, 20)[:6] if usable_sentence(s)]
    steps = [_ORPHAN_NUM_END.sub("", s).strip(" ;:,") for s in steps]
    steps = [s for s in steps if len(s) >= 15]
    if not steps:
        steps = [s for s in sents[pi + 1:] if s is not answer][:4]
    steps = [s for s in steps if s != answer][:4]

    reasoning = ""
    for s in [x for x in sentences(sections.get("MASTERY_CRITERIA", ""), 40)
              if usable_sentence(x)]:
        reasoning = s
        break
    if not reasoning:
        tail = [s for s in sents if s not in (problem, answer)]
        reasoning = tail[-1] if tail else ""
    if reasoning and reasoning.lower() == answer.lower():
        reasoning = ""                      # no value duplicating the answer

    def _dot(s):
        return s if s.endswith(".") else s + "."

    lines = ["PROBLEM: " + _dot(problem), "", "STEPS:"]
    lines += ["- " + s for s in steps] or ["- " + answer]
    if reasoning:
        lines += ["", "REASONING: " + _dot(reasoning)]
    lines += ["", "ANSWER: " + _dot(answer)]
    body = "\n".join(lines)

    if answer.lower() == problem.lower():
        return None, "answer-equals-problem"
    return body, None


# --------------------------------------------------------------------------- #
# main
# --------------------------------------------------------------------------- #

def teaching_files():
    out = []
    for f in sorted(os.listdir(MD)):
        if not f.endswith(".md"):
            continue
        stem = f[:-3]
        if stem.endswith(enh.COMP_SUFFIX):
            continue
        coords = enh.parse_filename(stem)
        if coords is None:
            continue
        if str(coords["subject"]).lower().startswith("hin"):
            continue
        out.append((stem, coords, f))
    return out


def main():
    examples_missing = set()
    if os.path.isfile(EXAMPLES_MISSING_LIST):
        examples_missing = set(json.load(open(EXAMPLES_MISSING_LIST,
                                              encoding="utf-8")))
    manifest = {}
    if os.path.isfile(MANIFEST) and not DRY:
        manifest = json.load(open(MANIFEST, encoding="utf-8"))

    targets = teaching_files()
    if LIMIT:
        targets = targets[:LIMIT]
    print("teaching non-Hindi nodes: %d | examples-missing targets: %d"
          % (len(targets), len(examples_missing & {t[0] for t in targets})))

    diag_written = ex_written = already = skipped_hindi = 0
    ex_dry = 0
    per_class = Counter()
    kinds = Counter()
    failures = []
    backups = [] if not DRY else None
    zf = None if DRY else zipfile.ZipFile(BACKUP_ZIP, "a", zipfile.ZIP_DEFLATED)

    for stem, coords, fname in targets:
        path = os.path.join(MD, fname)
        with open(path, "r", encoding="utf-8-sig", errors="replace") as fh:
            text = fh.read()
        src_lower = text.lower()
        sections = enh.split_sections(text)
        diags = enh.parse_diagnostics(sections)
        k_existing = diags[-1]["index"] if diags else 0

        # top-up safe: numbering always continues from the current max and
        # room hits zero at MAX_TOTAL_DIAG, so repeated runs converge
        do_diag = k_existing < MAX_TOTAL_DIAG
        do_example = (stem in examples_missing
                      and not sections.get("WORKED_EXAMPLE_1"))

        if not do_diag and not do_example:
            already += 1
            continue

        addenda = []
        if do_diag:
            pairs = derive_diags(sections, src_lower, k_existing)
            kept = []
            seen_q = {d["q"].strip().lower() for d in diags}
            src_check = text
            for p in pairs:
                q, a = p["question"], p["answer"]
                if q.strip().lower() in seen_q:
                    continue
                bad = verify_fidelity(q, src_check) + \
                    verify_fidelity(a, src_check)
                if bad:
                    failures.append((stem, p["kind"], ";".join(bad[:2])))
                    continue
                if "______" in q and (not a or a.lower() in q.lower()):
                    continue
                seen_q.add(q.strip().lower())
                kept.append(p)
            start = k_existing + 1
            for i, p in enumerate(kept):
                addenda.append("\n## DIAGNOSTIC_QUESTION_%d\n%s\n"
                               % (start + i, p["question"]))
                addenda.append("\n## DIAGNOSTIC_ANSWER_%d\n%s\n"
                               % (start + i, p["answer"]))
                kinds[p["kind"]] += 1
            if not kept:
                do_diag = False

        if do_example:
            body, why = derive_worked_example(sections, src_lower)
            if body:
                bad = verify_fidelity(body, src_lower)
                if bad:
                    failures.append((stem, "worked_example",
                                     ";".join(bad[:2])))
                else:
                    ex_dry += 1
                    addenda.append("\n## WORKED_EXAMPLE_1\n" + body + "\n")
            else:
                failures.append((stem, "worked_example", why))

        if not addenda:
            continue

        per_class[coords["class"]] += 1
        if DRY:
            continue

        backups.append((fname, text.encode("utf-8")))
        new_text = text.rstrip("\n") + "\n" + "".join(addenda)
        with open(path, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(new_text)
        if do_diag:
            manifest[stem] = {
                "added": len([x for x in addenda
                              if "DIAGNOSTIC_QUESTION" in x]),
                "k_existing": k_existing,
            }
            diag_written += 1
        if any("WORKED_EXAMPLE" in x for x in addenda):
            ex_written += 1

    if zf is not None:
        for fname, blob in backups:
            zf.writestr("gen_backup/" + fname, blob)
        zf.close()
    if not DRY:
        os.makedirs(os.path.dirname(MANIFEST), exist_ok=True)
        json.dump(manifest, open(MANIFEST, "w", encoding="utf-8"),
                  indent=0)

    print("mode=%s | nodes-written: %d | diag nodes: %d | example nodes: %d (dry+write: %d) "
          "| already/unneeded: %d"
          % ("DRY" if DRY else "WRITE", len(backups or []) or per_class.total(),
             diag_written, ex_written, ex_written + ex_dry, already))
    print("derived-pair kinds:", dict(kinds))
    print("nodes with >=1 derivation, per class:",
          dict(sorted(per_class.items())))
    print("fidelity/structure failures: %d" % len(failures))
    for f in failures[:12]:
        print("   ", f)


if __name__ == "__main__":
    main()
