"""test_lang_content_audit.py — LANG-ALL content-quality regressions.

Locks the content bar for the language corpus (CBSE enhanced_nodes_md +
CISCE cisce_nodes_v2, main nodes only — *_comp are a different format):

  1. encoding: no U+FFFD replacement chars, no CJK, no KrutiDev mojibake
  2. rubric: every main language node carries the full section skeleton
  3. diagnostics: no template-soup questions ('इस नोड के पहलुओं — X — का
     उदाहरण-सहित विवरण लिखिए' + word-mash) — the LANG-ALL grind replaces
     each soup pair with 3 hand-authored pairs; this test tracks exactly
     which files remain and fails the corpus the day a NEW file soups.

The known-remaining set below is the resume state from
content_tools/pedagogy/LANG_ALL.md — when a chapter is patched, delete
its line here in the same commit.
"""
import os
import re
import sys
from collections import Counter

sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))

CBSE = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__)))), "content", "enhanced_nodes_md")
CISCE = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__)))), "content", "cisce_nodes_v2")

LANG_RE = re.compile(r"c\d+_(?:hin|eng|engl|gram)")
CISCE_LANG_RE = re.compile(r"c\d+_(?:hin|eng)")

# exact soup constructions (NOT bare keywords — 'पहलुओं' legitimately
# appears inside real questions like 'किन पहलुओं को छूना चाहिए')
SOUP_EXACT = re.compile(
    r"का उदाहरण-सहित विवरण लिखिए|को उनके विवरण से मिलाइए|"
    r"को सही घटनाक्रम में व्यवस्थित कीजिए|के पहलुओं — |"
    r"के मुख्य-बिंदुओं का उदाहरण|बिंदुओं को उनके विवरण|"
    r"के मुख्य बिंदुओं")

# resume state: soup files still awaiting the authored-diagnostic grind
# (delete a group's line in the same commit that patches it)
# c7 complete: ch01-07 (LANG-ALL) + ch08-10 (LANG-CBSE-GRIND)
# c8 complete: ch01-10 (LANG-CBSE-GRIND)
# c9 complete: ch01-12 (LANG-CBSE-GRIND) — grind finished 2026-10-08
KNOWN_SOUP_GROUPS = {}

RUBRIC_SECTIONS = {"ELI5", "DEFINITION", "WALKTHROUGH",
                   "COMMON_MISCONCEPTION", "ON_FAILURE",
                   "WORKED_EXAMPLE_1", "COMPETENCY_QUESTION_1",
                   "SCOPE_BOUNDARY", "MASTERY_CRITERIA"}

_KRUTI = re.compile(r"\b(?:fgUnh|lkfgR;|O;ogkfjd|izkpk;|lEiknd|loZ)\b")


def _lang_files(root, pat):
    return [f for f in os.listdir(root)
            if re.match(pat, f) and f.endswith(".md") and "_comp" not in f]


# c11_eng_isc_05_006 quotes the story's own Chinese phrases (老虎/妈妈/香/吃吧
# with romanizations) as literary analysis — deliberate content, not mojibake
CJIK_QUOTATION_ALLOW = {"c11_eng_isc_05_006.md"}


def test_no_encoding_mojibake():
    bad = []
    for root, pat in ((CBSE, LANG_RE), (CISCE, CISCE_LANG_RE)):
        for f in _lang_files(root, pat):
            t = open(os.path.join(root, f), encoding="utf-8").read()
            if "\ufffd" in t:
                bad.append(f + ":U+FFFD")
            cjk = sum(1 for c in t if "\u4e00" <= c <= "\u9fff"
                      or "\u3040" <= c <= "\u30ff")
            if cjk > 5 and f not in CJIK_QUOTATION_ALLOW:
                bad.append(f + f":cjk={cjk}")
            if _KRUTI.search(t):
                bad.append(f + ":krutidev")
    assert not bad, f"encoding mojibake in {bad[:8]} (total {len(bad)})"


def test_full_rubric_skeleton_everywhere():
    missing = []
    for root, pat in ((CBSE, LANG_RE), (CISCE, CISCE_LANG_RE)):
        for f in _lang_files(root, pat):
            t = open(os.path.join(root, f), encoding="utf-8").read()
            secs = set(re.findall(r"^##\s+([A-Z_0-9]+)", t, re.M))
            lack = RUBRIC_SECTIONS - secs
            if lack:
                missing.append((f, sorted(lack)))
    assert not missing, f"rubric sections missing in {missing[:5]} " \
                        f"(total {len(missing)})"


def _soup_files():
    """files whose DIAGNOSTIC_QUESTION sections still carry soup templates."""
    found = Counter()
    for root, pat in ((CBSE, LANG_RE), (CISCE, CISCE_LANG_RE)):
        for f in _lang_files(root, pat):
            t = open(os.path.join(root, f), encoding="utf-8").read()
            qs = re.findall(r"## DIAGNOSTIC_QUESTION_\d\n(.*?)(?=\n## )",
                            t, re.S)
            if any(SOUP_EXACT.search(q) for q in qs):
                cls = re.match(r"(c\d+)", f).group(1)
                found[cls] += 1
    return found


def test_soup_grind_matches_resume_state():
    found = _soup_files()
    expected = Counter()
    for cls, marks in KNOWN_SOUP_GROUPS.items():
        if "cbse" in marks:
            expected[cls] += 0          # placeholder; refined below
    # precise expected counts from the corpus itself
    # (c7/c8/c9 fully patched — exp stays empty; any found > exp fails below)
    exp = Counter()
    for cls in ("c7", "c8", "c9"):
        assert found.get(cls, 0) <= exp.get(cls, 0), (
            f"{cls}: {found.get(cls, 0)} soup files but only "
            f"{exp.get(cls, 0)} are in the resume state — a NEW file "
            f"souped or a patched file regressed; investigate before "
            f"shipping")
    # grind progress: ALL c7 (ch01-10), ALL c8 (ch01-10), ALL c9 (ch01-12)
    # must be soup-free
    done = 0
    for prefix, nch in (("c7_hin_cbse", 10), ("c8_hin_cbse", 10),
                        ("c9_hin_ga_cbse", 12)):
        for i in range(1, nch + 1):
            for n in range(1, 16):
                f = f"{prefix}_{i:02d}_{n:03d}.md"
                p = os.path.join(CBSE, f)
                if os.path.exists(p):
                    t = open(p, encoding="utf-8").read()
                    qs = re.findall(r"## DIAGNOSTIC_QUESTION_\d\n(.*?)(?=\n## )",
                                    t, re.S)
                    assert not any(SOUP_EXACT.search(q) for q in qs), \
                        f"{f} regressed to soup"
                    done += 1
    assert done == 480, f"expected 480 patched c7+c8+c9 files, found {done}"


def test_patched_files_carry_three_authored_pairs():
    """the grind replaces 6 soup pairs with 3 authored pairs — patched
    files must have exactly 3 Q + 3 A sections in the house format."""
    for prefix, nch in (("c7_hin_cbse", 10), ("c8_hin_cbse", 10),
                        ("c9_hin_ga_cbse", 12)):
        for i in range(1, nch + 1):
            for n in range(1, 16):
                f = f"{prefix}_{i:02d}_{n:03d}.md"
                t = open(os.path.join(CBSE, f), encoding="utf-8").read()
                nq = len(re.findall(r"## DIAGNOSTIC_QUESTION_\d", t))
                na = len(re.findall(r"## DIAGNOSTIC_ANSWER_\d", t))
                assert (nq, na) == (3, 3), f"{f}: {nq}Q/{na}A — expected 3/3"
                q1 = re.search(r"## DIAGNOSTIC_QUESTION_1\n(.*?)(?=\n## )", t,
                               re.S)
                assert q1 and "[स्तर:" in q1.group(1), \
                    f"{f}: house format header missing in Q1"


def test_no_english_in_hindi_diagnostics():
    """hin nodes' diagnostics must be Devanagari-dominant (the parked
    'English-in-Hindi' pathology)."""
    bad = []
    for root, pat in ((CBSE, re.compile(r"c\d+_hin")),
                      (CISCE, re.compile(r"c\d+_hin"))):
        for f in _lang_files(root, pat):
            t = open(os.path.join(root, f), encoding="utf-8").read()
            q1 = re.search(r"## DIAGNOSTIC_QUESTION_1\n(.*?)(?=\n## )", t,
                           re.S)
            if not q1:
                continue
            body = q1.group(1)
            dev = sum(1 for c in body if "\u0900" <= c <= "\u097F")
            lat = sum(1 for c in body if c.isascii() and c.isalpha())
            if lat > dev and lat > 40:
                bad.append(f)
    assert not bad, f"English-in-Hindi diagnostics in {bad[:6]}"


def test_no_weak_eli5_cbse():
    """LANG-CBSE-GRIND cleared the weak-ELI5 list (115 entries: c6_hin 78,
    c7_engl 12, c9_engl 13, c10_engl 12 + c12_geo straggler) — every CBSE
    main-node ELI5 body must stay >= 150 chars (template stubs regress here)."""
    bad = []
    for f in _lang_files(CBSE, LANG_RE):
        t = open(os.path.join(CBSE, f), encoding="utf-8").read()
        m = re.search(r"## ELI5\n(.*?)(?=\n## )", t, re.S)
        if m and len(m.group(1).strip()) < 150:
            bad.append((f, len(m.group(1).strip())))
    assert not bad, (f"weak ELI5 (<150 chars) in {bad[:8]} "
                     f"(total {len(bad)}) — deepen grounded in the node's "
                     f"own DEFINITION before shipping")
