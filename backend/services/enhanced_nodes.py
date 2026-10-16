"""enhanced_nodes.py -- TEACHING CONTENT layer: parser + loader.

Parses the per-node pedagogy markdown corpus (~8.9k files, one file per
atomic teaching node, e.g. ``c10_bio_cbse_01_001.md`` = Class 10 /
Biology / CBSE / chapter 01 / node 001) into structured teaching cards:

    {
      "node_id":          "c10_bio_cbse_01_001",
      "class":            10,
      "subject":          "bio",
      "chapter":          1,
      "definition":       "...",
      "cognitive_level":  "understand",
      "mastery_criteria": "...",
      "scope_boundary":   "...",
      "walkthrough":      "...",
      "diagnostics": [{"index": 1, "q": ..., "a": ..., "misconception": ...}, ...]
    }

Design notes
------------
* Filename conventions tolerated (2 shapes, subject may contain
  underscores like ``hin_al`` / ``eng_k``):
      c{class}_{subject}_cbse_{chapter:02d}_{node:03d}.md   (enhanced set)
      c{class}_{subject}_ch{chapter}_{node}.md              (legacy set)
      c{class}_{subject}_u{unit}_{node}.md                  (unit-based)
* The ``misconception`` field is the wrong-answer analysis carved out of
  the diagnostic answer text (answers embed it as ``A wrong answer ...``
  style sentences).  The full answer is kept in ``a`` untouched.
* Case-study COMPANION files (``..._<num>_comp.md``) carry a
  PARENT_NODE_ID + seed questions instead of the teaching schema; they
  parse into a distinct ``kind: "case_companion"`` record stored in the
  same index but never counted as teaching nodes (``kind`` marker +
  separate ``companions`` stat).
* Malformed files (unreadable, unparseable filename, or no core
  sections) are skipped and counted in ``stats`` -- the loader never
  raises for one bad file.
* Parsed content is cached as JSON in ``backend/_cache/`` keyed by a
  content fingerprint of the md dir (file count / total size / max
  mtime), so repeat loads skip the ~200MB rescan.

No network, no LLM calls -- fully deterministic.
"""
from __future__ import annotations

import json
import logging
import hashlib
import os
import re
import threading
import time

logger = logging.getLogger(__name__)
from typing import Any, Dict, List, Optional, Tuple

# --------------------------------------------------------------------------
# Configuration
# --------------------------------------------------------------------------

#: Repo root (backend/services/enhanced_nodes.py -> backend -> repo root).
#: The corpus ships inside the repo at content/enhanced_nodes_md/ so the
#: default works on any machine; ENHANCED_NODES_MD_DIR still overrides.
_REPO_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__))))
DEFAULT_MD_DIR = os.path.join(_REPO_ROOT, "content", "enhanced_nodes_md")
CACHE_DIR = os.path.normpath(
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "_cache"))
CACHE_FILENAME = "enhanced_nodes_index.json"
#: Cache format -- 3 adds the eli5/examples era fields (ELI5 section is a
#: first-class parsed field since the owner-approved derivation pass).
#: 4 adds `examples` (WORKED_EXAMPLE_N sections parsed into the node dict,
#: weekend content-generation pass) so nodes whose enrichment_content row
#: lacks the DB column still serve the Examples card from the md corpus.
#: 5 -- split_sections ignores a repeated header whose body is empty (the
#: legacy c7 files emitted e.g. "## DIAGNOSTIC_QUESTION_6" twice
#: back-to-back; the empty first body concatenated a "\n\n" prefix onto
#: the served question text).
#: 6 -- grade-map support (GRADE-MAP P1): build_index applies the
#: metadata-only remap from _grade_map.json (misgraded class/subject/
#: chapter), and the cache fingerprint covers that file so editing it
#: rebuilds the index exactly once.
CACHE_VERSION = 8

#: Core sections a node must expose at least one of to count as parsed.
CORE_SECTIONS = ("DEFINITION", "WALKTHROUGH")
#: Expected (per-corpus-contract) sections; gaps are recorded per node.
REQUIRED_SECTIONS = ("DEFINITION", "COGNITIVE_LEVEL", "MASTERY_CRITERIA",
                     "SCOPE_BOUNDARY", "WALKTHROUGH")

#: Suffix marking case-study companion files (``c12_acc_..._001_comp``).
COMP_SUFFIX = "_comp"
#: Core sections a companion file must expose at least one of.
COMP_CORE_SECTIONS = ("PARENT_NODE_ID", "SEED_QUESTION_1")
#: Expected companion sections; gaps are recorded per companion.
COMP_REQUIRED_SECTIONS = ("PARENT_NODE_ID", "SCOPE_BOUNDARY", "SEED_QUESTION_1")

#: Metadata-remap file (GRADE-MAP P1, lives IN the corpus dir): maps
#: node_id -> {class?, subject?, chapter?, reason} for nodes whose
#: authored content proves a different grade than the filename claims
#: (whole wrong-grade subjects found by the C6 audit + corpus sweep).
#: METADATA-ONLY: node ids / files never change, so prereq ids, tutor
#: mastery keys, story links and DB joins all stay valid; ambiguous
#: finds are deliberately absent (logged in _grademap/ instead).
GRADE_MAP_FILENAME = "_grade_map.json"

# --------------------------------------------------------------------------
# Filename parsing
# --------------------------------------------------------------------------

_FILENAME_PATTERNS = (
    # c10_bio_cbse_01_001  (subject may be multi-token: c12_hin_al_cbse_03_011)
    re.compile(r"^c(?P<cls>\d+)_(?P<subj>.+)_cbse_(?P<chap>\d+)_(?P<num>\d+)$"),
    # c9_eng_icse_07_005  (ICSE corpus — cisce_nodes_v2)
    re.compile(r"^c(?P<cls>\d+)_(?P<subj>.+?)_icse_(?P<chap>\d+)_(?P<num>\d+)$"),
    # c11_hist_isc_03_007  (ISC corpus — cisce_nodes_v2 classes 11-12; same
    # shape as ICSE but the generator emits the `_isc_` board token)
    re.compile(r"^c(?P<cls>\d+)_(?P<subj>.+?)_isc_(?P<chap>\d+)_(?P<num>\d+)$"),
    # c6_biology_ch06_001 / c8_math_ch12_003
    re.compile(r"^c(?P<cls>\d+)_(?P<subj>.+?)_ch0*(?P<chap>\d+)_(?P<num>\d+)$"),
    # c6_english_u1_001  (unit-indexed)
    re.compile(r"^c(?P<cls>\d+)_(?P<subj>.+?)_u0*(?P<chap>\d+)_(?P<num>\d+)$"),
)


def parse_filename(stem: str) -> Optional[Dict]:
    """Parse a node filename stem into its coordinates.

    Returns ``{"class", "subject", "board", "chapter", "node_num"}`` or
    ``None`` when the stem matches no known convention.
    """
    stem = stem.strip()
    for pat in _FILENAME_PATTERNS:
        m = pat.match(stem)
        if m:
            return {
                "class": int(m.group("cls")),
                "subject": m.group("subj"),
                "board": ("isc" if "_isc_" in stem else
                          ("icse" if "_icse_" in stem else
                           ("cbse" if "_cbse_" in stem else ""))),
                "chapter": int(m.group("chap")),
                "node_num": int(m.group("num")),
            }
    return None


def parse_companion_filename(stem: str) -> Optional[Dict]:
    """Parse a companion filename stem (``<base>_comp``) into coordinates.

    The base must itself match a node filename convention; the returned
    dict carries the *companion's* own coordinates (identical to the
    parent's).  ``None`` for non-comp or unparseable bases.
    """
    stem = stem.strip()
    if not stem.endswith(COMP_SUFFIX):
        return None
    return parse_filename(stem[:-len(COMP_SUFFIX)])


# --------------------------------------------------------------------------
# Markdown parsing
# --------------------------------------------------------------------------

#: Only exactly-'##' markers split sections. '###'/'#' lines are section
#: subheadings (e.g. '### The "Double-Summary" Trap' inside
#: COMMON_MISCONCEPTION, '### PROBLEM' inside WORKED_EXAMPLE) and must stay
#: in the parent body — matching them truncated sections and produced
#: phantom keys like sections['STEPS'].
_SECTION_HEADER_RE = re.compile(r"^##(?!#)[ \t]*(.+?)[ \t]*$", re.M)

#: Sentence-start markers that introduce the wrong-answer misconception
#: analysis inside a DIAGNOSTIC_ANSWER body.
_MISCONCEPTION_MARKERS = (
    "a wrong answer",
    "a poor answer",
    "a weak answer",
    "a bad answer",
    "a wrong response",
    "an incorrect answer",
    "wrong answer:",
    "misconception:",
    "this misconception",
)


def split_sections(text: str) -> Dict[str, str]:
    """Split markdown into ``{SECTION_NAME: body}`` on ``##``-style headers.

    Header names are normalised (``## DIAGNOSTIC_ANSWER_5**`` ->
    ``DIAGNOSTIC_ANSWER_5``).  Repeated headers are concatenated, EXCEPT
    that a repeat with an EMPTY body is ignored (legacy files emitted
    ``## X\\n## X\\n<body>``; the empty first body must not prepend a
    "\\n\\n" to the served text).  Any preamble before the first header is
    dropped.
    """
    sections: Dict[str, str] = {}
    matches = list(_SECTION_HEADER_RE.finditer(text))
    if not matches:
        return sections
    for i, m in enumerate(matches):
        name = m.group(1).strip().strip("*").strip()
        if not name:
            continue
        start = m.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        body = text[start:end].strip()
        if name in sections:
            if body:
                prev = sections[name]
                sections[name] = prev + "\n\n" + body if prev else body
        else:
            sections[name] = body
    return sections


def split_misconception(answer: str) -> str:
    """Carve the wrong-answer analysis out of a diagnostic answer.

    Returns the misconception portion ("" when the answer does not
    contain a recognisable marker).  The full answer text is never
    modified -- the caller keeps both.
    """
    if not answer:
        return ""
    low = answer.lower()
    hits = [low.find(mk) for mk in _MISCONCEPTION_MARKERS]
    hits = [h for h in hits if h > 0]          # h==0: whole answer *is* it
    if not hits:
        return ""
    idx = min(hits)
    return answer[idx:].strip()


def parse_diagnostics(sections: Dict[str, str]) -> List[Dict]:
    """Collect DIAGNOSTIC_QUESTION_N / DIAGNOSTIC_ANSWER_N pairs in order."""
    diags: List[Dict] = []
    n = 1
    while n <= 50:                              # corpus contract is 5..6; be generous
        q = sections.get("DIAGNOSTIC_QUESTION_%d" % n)
        a = sections.get("DIAGNOSTIC_ANSWER_%d" % n)
        if not q and not a:
            break
        if q:
            diags.append({
                "index": n,
                "q": q,
                "a": a or "",
                "misconception": split_misconception(a or ""),
            })
        n += 1
    return diags


def parse_worked_examples(sections: Dict[str, str]) -> Optional[str]:
    """Join WORKED_EXAMPLE_N bodies (PROBLEM/STEPS/REASONING/ANSWER blocks)
    into the enrichment `examples` text (same shape the enrichment_content
    DB column carries -- the DB rows were loaded from these sections).
    ``None`` when the node has no worked-example sections."""
    parts: List[str] = []
    n = 1
    while n <= 20:
        body = sections.get("WORKED_EXAMPLE_%d" % n)
        if not body:
            break
        parts.append(body)
        n += 1
    return "\n\n".join(parts) if parts else None


def parse_markdown(text: str) -> Dict:
    """Parse raw node markdown into the section dict used downstream."""
    sections = split_sections(text)
    return {
        "sections": sections,
        "diagnostics": parse_diagnostics(sections),
    }


def parse_competency_questions(sections: Dict[str, str]) -> List[Dict]:
    """Collect COMPETENCY_QUESTION_N bodies with structured fields."""
    competencies: List[Dict] = []
    n = 1
    while n <= 20:
        body = sections.get("COMPETENCY_QUESTION_%d" % n)
        if not body:
            break
        q_m = re.search(r"QUESTION[:\s]+([\s\S]*?)(?=COMPETENCY|STEPS|ANSWER|DIFFICULTY|$)", body, re.I)
        c_m = re.search(r"COMPETENCY[:\s]+([\s\S]*?)(?=STEPS|ANSWER|DIFFICULTY|$)", body, re.I)
        st_m = re.search(r"STEPS[:\s]+([\s\S]*?)(?=ANSWER|DIFFICULTY|$)", body, re.I)
        a_m = re.search(r"ANSWER[:\s]+([\s\S]*?)(?=DIFFICULTY|$)", body, re.I)
        d_m = re.search(r"DIFFICULTY[:\s]+([\s\S]*?)$", body, re.I)

        steps = []
        if st_m:
            for line in st_m.group(1).strip().split("\n"):
                clean_line = re.sub(r"^[-*•\s]+|(?:Step\s*\d+[:.\s]*)", "", line).strip()
                if clean_line:
                    steps.append(clean_line)

        competencies.append({
            "index": n,
            "question": q_m.group(1).strip() if q_m else body[:200],
            "competency": c_m.group(1).strip() if c_m else "",
            "steps": steps,
            "answer": a_m.group(1).strip() if a_m else "",
            "difficulty": (d_m.group(1).strip() if d_m else "medium").lower()
        })
        n += 1
    return competencies


def parse_mapping_reasons(text: str) -> Dict[str, str]:
    """Parse lines like 'node_id: pedagogical reason' into a dictionary."""
    mapping: Dict[str, str] = {}
    if not text:
        return mapping
    for line in text.split("\n"):
        line = line.strip()
        if not line or ":" not in line:
            continue
        parts = line.split(":", 1)
        nid = parts[0].strip().strip("*")
        reason = parts[1].strip()
        if nid and reason:
            mapping[nid] = reason
    return mapping


def _clean_field(val: Optional[str]) -> Optional[str]:
    """Sanitize N/A or empty authored fields."""
    if not val:
        return None
    val = val.strip()
    if val.upper() in ("N/A", "NONE", "N/A - CONCEPTUAL", "N/A - DESCRIPTIVE"):
        return None
    return val


def _node_from_sections(stem: str, sections: Dict[str, str]) -> Tuple[Optional[Dict], Optional[str]]:
    """Shape a node dict from already-split ``{SECTION: body}`` sections.

    Shared by parse_node_file (pure-Python path) and the optional
    atlas_speed (Rust) fast path in build_index — identical output either way.
    """
    coords = parse_filename(stem)
    if coords is None:
        return None, "unparseable_filename"
    definition = sections.get("DEFINITION", "")
    walkthrough = sections.get("WALKTHROUGH", "")
    if not definition and not walkthrough:
        return None, "malformed: no core sections (DEFINITION/WALKTHROUGH)"

    missing = [s for s in REQUIRED_SECTIONS if not sections.get(s)]
    prereq_ids = [
        p.strip() for p in
        sections.get("PREREQUISITE_NODE_IDS", "").replace("\n", ",").split(",")
        if p.strip()
    ]
    forward_ids = [
        p.strip() for p in
        sections.get("FORWARD_NODE_IDS", "").replace("\n", ",").split(",")
        if p.strip()
    ]
    cross_ids = [
        p.strip() for p in
        sections.get("CROSS_SUBJECT_PREREQS", "").replace("\n", ",").split(",")
        if p.strip()
    ]

    node = {
        "node_id": stem,
        "class": coords["class"],
        "subject": coords["subject"],
        "board": coords["board"],
        "chapter": coords["chapter"],
        "node_num": coords["node_num"],
        "definition": definition,
        "cognitive_level": sections.get("COGNITIVE_LEVEL", ""),
        "mastery_criteria": sections.get("MASTERY_CRITERIA", ""),
        "scope_boundary": sections.get("SCOPE_BOUNDARY", ""),
        "walkthrough": walkthrough,
        "diagnostics": parse_diagnostics(sections),
        "prereq_ids": prereq_ids,
        "forward_node_ids": forward_ids,
        "eli5": sections.get("ELI5", "") or None,
        "examples": parse_worked_examples(sections),
        "common_misconception": sections.get("COMMON_MISCONCEPTION", "") or None,
        "on_failure": sections.get("ON_FAILURE", "") or None,
        # Unlocked authored fields
        "formula": _clean_field(sections.get("THIS_FORMULA")),
        "formula_variables": _clean_field(sections.get("FORMULA_VARIABLES")),
        "formula_units": _clean_field(sections.get("FORMULA_UNITS")),
        "computation_type": _clean_field(sections.get("COMPUTATION_TYPE")),
        "competency_questions": parse_competency_questions(sections),
        "prerequisite_reasons": parse_mapping_reasons(sections.get("PREREQUISITE_REASONS", "")),
        "forward_reasons": parse_mapping_reasons(sections.get("FORWARD_REASONS", "")),
        "cross_subject_prereqs": cross_ids,
        "cross_subject_reasons": parse_mapping_reasons(sections.get("CROSS_SUBJECT_REASONS", "")),
        "prereq_stuck": _clean_field(sections.get("PREREQ_STUCK")),
        "prereq_before": _clean_field(sections.get("PREREQ_BEFORE")),
        "missing_sections": missing,
        "source_file": stem + ".md",
    }
    return node, None


def parse_node_file(path: str) -> Tuple[Optional[Dict], Optional[str]]:
    """Parse one node markdown file.

    Returns ``(node, None)`` on success or ``(None, reason)`` when the
    file must be skipped (unreadable / unparseable filename / no core
    sections).  Never raises for content issues.
    """
    fname = os.path.basename(path)
    stem = os.path.splitext(fname)[0]
    try:
        with open(path, "r", encoding="utf-8-sig", errors="replace") as fh:
            text = fh.read()
    except OSError as exc:                      # pragma: no cover - defensive
        return None, "read_error: %s" % exc
    return _node_from_sections(stem, parse_markdown(text)["sections"])


# --------------------------------------------------------------------------
# Case-study companion parsing (_comp files)
# --------------------------------------------------------------------------

#: Exactly-'##' headers; ### / #### sub-markers stay inside the body.
_L2_HEADER_RE = re.compile(r"^##(?!#)[ \t]*(.+?)[ \t]*$", re.M)
#: ### / #### sub-markers inside NODES_INVOLVED / SEED_QUESTION / EXAM_STRATEGY.
_COMP_SUB_RE = re.compile(r"^#{3,4}[ \t]*(.+?)[ \t]*$", re.M)
#: Sub-part markers of a seed question (SUB_PART_A .. SUB_PART_E).
_COMP_SUB_PART_RE = re.compile(r"^SUB_PART_([A-Z])$")
#: Node ids are comma/pipe/newline separated inside NODES_INVOLVED bodies.
_COMP_ID_SPLIT_RE = re.compile(r"[,;|\n]+")


def _split_l2_sections(text: str) -> Dict[str, str]:
    """``{SECTION: body}`` split on exactly-``##`` headers (repeats kept)."""
    sections: Dict[str, str] = {}
    matches = list(_L2_HEADER_RE.finditer(text))
    for i, m in enumerate(matches):
        name = m.group(1).strip().strip("*").strip()
        if not name:
            continue
        start = m.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        body = text[start:end].strip()
        if name in sections:
            sections[name] += "\n\n" + body
        else:
            sections[name] = body
    return sections


def _split_sub_blocks(body: str) -> List[Tuple[str, str, str]]:
    """Split a block on ### / #### markers into ``(NAME, inline, text)``.

    ``NAME`` is the upper-cased marker word before the first ':' (e.g.
    ``TITLE`` from ``### TITLE: Foo``), ``inline`` is the remainder of
    the header line, ``text`` the body up to the next marker.  Preamble
    before the first marker is ignored.
    """
    out: List[Tuple[str, str, str]] = []
    matches = list(_COMP_SUB_RE.finditer(body))
    for i, m in enumerate(matches):
        header = m.group(1).strip()
        name, _, inline = header.partition(":")
        start = m.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(body)
        out.append((name.strip().upper(), inline.strip(),
                    body[start:end].strip()))
    return out


def _marker_value(blocks: List[Tuple[str, str, str]], name: str) -> str:
    """Inline value of the first matching sub-block, else its body."""
    for n, inline, text in blocks:
        if n == name:
            return inline or text
    return ""


def _parse_node_id_list(text: str) -> List[str]:
    """Extract well-formed node ids from a NODES_INVOLVED-style list.

    Tolerates the corpus' real-world shapes: ``id, id, id`` lists,
    ``id  (Free-text description)`` entries, ``Subject: id (...)``
    prefixes and sub-node references (``..._003_01`` -- kept verbatim,
    validated against the parent id minus its ``_NN`` suffix).
    """
    ids: List[str] = []
    for tok in _COMP_ID_SPLIT_RE.split(text or ""):
        for word in tok.split():
            candidate = word.strip("(),;:.*'\"")
            if not candidate:
                continue
            base = candidate
            if not parse_filename(base):
                base = re.sub(r"_(?:\d{1,3}|[A-Z]{1,6})$", "", base)
            if parse_filename(base):
                if candidate not in ids:
                    ids.append(candidate)
                break
    return ids


def _parse_seed_question(body: str, index: int) -> Dict:
    """Parse one SEED_QUESTION_N body into a structured seed question."""
    blocks = _split_sub_blocks(body)
    sub_parts: Dict[str, str] = {}
    for n, inline, text in blocks:
        m = _COMP_SUB_PART_RE.match(n)
        if m:
            sub_parts[m.group(1).lower()] = (
                inline + ("\n\n" + text if inline and text else text))
    return {
        "index": index,
        "title": _marker_value(blocks, "TITLE"),
        "scenario": _marker_value(blocks, "SCENARIO"),
        "concepts_combined": _marker_value(blocks, "CONCEPTS_COMBINED"),
        "difficulty_tier": _marker_value(blocks, "DIFFICULTY_TIER"),
        "exam_levels": _marker_value(blocks, "EXAM_LEVELS"),
        "sub_parts": sub_parts,
    }


def parse_companion_file(path: str) -> Tuple[Optional[Dict], Optional[str]]:
    """Parse one ``*_comp.md`` case-study companion file.

    Companions carry a PARENT_NODE_ID + seed questions (no
    DEFINITION/WALKTHROUGH by design).  Returns
    ``(companion, None)`` or ``(None, reason)`` like :func:`parse_node_file`.
    """
    fname = os.path.basename(path)
    stem = os.path.splitext(fname)[0]
    coords = parse_companion_filename(stem)
    if coords is None:
        return None, "unparseable_filename"
    try:
        with open(path, "r", encoding="utf-8-sig", errors="replace") as fh:
            text = fh.read()
    except OSError as exc:                      # pragma: no cover - defensive
        return None, "read_error: %s" % exc

    sections = _split_l2_sections(text)
    parent = (sections.get("PARENT_NODE_ID", "").strip().split() or [""])[0]
    seeds: List[Dict] = []
    n = 1
    while n <= 50:                              # corpus contract is 1..3
        body = sections.get("SEED_QUESTION_%d" % n)
        if not body:
            break
        seeds.append(_parse_seed_question(body, n))
        n += 1
    if not parent and not seeds:
        return None, "malformed: no PARENT_NODE_ID / seed questions"

    inv = _split_sub_blocks(sections.get("NODES_INVOLVED", ""))
    strat = _split_sub_blocks(sections.get("EXAM_STRATEGY", ""))
    missing = [s for s in COMP_REQUIRED_SECTIONS
               if s == "SEED_QUESTION_1" and not seeds
               or s != "SEED_QUESTION_1" and not sections.get(s)]
    node = {
        "node_id": stem,
        "kind": "case_companion",
        "class": coords["class"],
        "subject": coords["subject"],
        "board": coords["board"],
        "chapter": coords["chapter"],
        "node_num": coords["node_num"],
        "parent_node_id": parent or stem[:-len(COMP_SUFFIX)],
        "stream": sections.get("STREAM", ""),
        "exam_targets": sections.get("EXAM_TARGETS", ""),
        "scope_boundary": sections.get("SCOPE_BOUNDARY", ""),
        "nodes_involved": {
            "primary": _parse_node_id_list(
                _marker_value(inv, "PRIMARY_SUBJECT_NODES")),
            "cross_subject": _parse_node_id_list(
                _marker_value(inv, "CROSS_SUBJECT_NODES")),
            "prerequisites": _parse_node_id_list(
                _marker_value(inv, "PREREQUISITE_NODES")),
        },
        "seed_questions": seeds,
        "decomposition_map": sections.get("DECOMPOSITION_MAP", ""),
        "on_failure_routing": sections.get("ON_FAILURE_ROUTING", ""),
        "derivation_guide": sections.get("DERIVATION_GUIDE", ""),
        "exam_strategy": {
            "high_yield": _marker_value(strat, "HIGH_YIELD"),
            "common_traps": _marker_value(strat, "COMMON_TRAPS"),
            "time_management": _marker_value(strat, "TIME_MANAGEMENT"),
        },
        # teaching-card compatibility shells: companions are NOT teaching
        # cards, but generic consumers (.get() paths) expect the keys.
        "definition": "",
        "cognitive_level": "",
        "mastery_criteria": "",
        "walkthrough": "",
        "diagnostics": [],
        "missing_sections": missing,
        "source_file": fname,
    }
    return node, None


# --------------------------------------------------------------------------
# Index
# --------------------------------------------------------------------------


# --------------------------------------------------------------------------
# Title derivation — the corpus has no TITLE field; the topic name is mined
# from the definition's own prose.  The W2 title sweep found three recurring
# degenerate shapes, all handled here:
#   * markdown leak   "A **polar covalent bond** forms when…" -> markup is
#                     stripped before the clause is taken
#   * meta-narration  "This node synthesizes the chapter's core concepts:
#                     one-dimensional arrays …" -> the covered object, and
#                     'The chapter "Pollution" …' -> the quoted topic name
#   * verb-less heads truncated mid-word at char 57 -> the clause is cut at
#                     a word boundary, and a wider verb set catches most
#                     sentence-shaped heads before truncation is needed
# Every title comes from the file's own words — never invented, never the
# node id.
# --------------------------------------------------------------------------

_TITLE_MARKUP = re.compile(r"[*_`~]+")
_TITLE_QUOTED = re.compile(r"[\"'“‘]\s*([^\"'”’]{3,80}?)\s*[\"'”’]")
#: Openers that talk ABOUT the material instead of naming it (an optional
#: adjective run between the determiner and the meta noun: "this synthesis
#: node", "the entire Class IX revision chapter").
_TITLE_META_SUBJ = re.compile(
    r"^(?:this|the|our|each|every|entire)\s+(?:\w+\s+){0,4}?"
    r"(?:node|chapter|section|unit|topic|lesson|block|module|part|study|"
    r"exercise|overview|discussion)\b", re.I)
#: "Chapter 10 “Transport”" / "Chapter 11 (Waste Management)" /
#: "Chapter 2, “Map of India,”" — the bracketed/quoted name IS the topic.
_TITLE_CHAPTER_NAME = re.compile(
    r"\b(?:chapter|unit|lesson|book|part|act|scene)\s+(?:[ivxlcdm]+|\d+)"
    r"\s*[,;:]?\s*[(\"'“‘]\s*([^)\"'”’,;\n]{3,60}?)\s*[)\"'”’]", re.I)
#: Candidates that can never be a topic name on their own.
_TITLE_BAD_START = re.compile(
    r"^(?:chapter|concept\s+nodes?)s?\b|"
    r"^(?:unit|lesson|part|section)\s+\d+\b|"
    r"^(?:here|this|these|it|its|we|they|he|she|there|now|let|also)\b|"
    r"^(?:called|termed|dubbed|labelled|labeled)\b|"
    r"^(?:named|known)\s+(?:after|as|for)\b|"
    r"^\d", re.I)
#: Context lead-ins: "In Java, a type classifies…" -> "a type".
_TITLE_LEADIN = re.compile(r"^(?:in|for)\s+[^,.;:]{2,40},\s*", re.I)
_TITLE_ARTICLE = re.compile(r"^(?:a|an|the)\s+", re.I)
#: Possessive meta prefix: "the chapter's core concepts" -> "core concepts".
#: An adjective run may sit between determiner and meta noun (mirrors
#: _TITLE_META_SUBJ): "this synthesis node", "the entire Class IX
#: revision chapter" — the whole container phrase drops, not its head.
_TITLE_META_POS = re.compile(
    r"^(?:(?:this|that|the|our)\s+(?:[\w'’\-]+\s+){0,4}?)?"
    r"(?:chapter|node|section|unit|topic|"
    r"lesson|syllabus|book|portion|course)['’]?s?(?:\s+|$)", re.I)
#: Collective prefixes that name the container, not the topic:
#: "each sub-topic of the chapter", "the nine preceding concept nodes of
#: Chapter 2", "all sections of the unit".
_TITLE_COLLECTIVE = re.compile(
    r"^(?:(?:each|every|all|both|neither|several|various|the|its|their)\s+)?"
    r"(?:(?:preceding|following|earlier|previous|above|main|core|key|"
    r"entire|major|supporting|one|two|three|four|five|six|seven|eight|"
    r"nine|ten|\d+)\s+)*"
    r"(?:sub[-‑]?topics?|concepts?|sections?|parts?|units?|aspects?|"
    r"areas?|themes?|elements?|points?|items?|questions?|components?|"
    r"nodes?|chapters?|lessons?|ideas|paragraphs?|steps?)\s+"
    r"(?:of|in|from|to|across|throughout|within)\s+"
    r"(?:(?:the|this|that|its|their)\s+)?"
    r"(?:chapter|node|unit|section|book|syllabus|course|portion|"
    r"curriculum|paper|exam)s?\b(?:['’]s)?(?:\s+\d+)?\.?\s*", re.I)
#: Trailing container refs: "Key quotations in this chapter" ->
#: "Key quotations"; "Banking chapter in ICSE Class 10 …" -> "Banking";
#: "Traders to Rulers — the chapter overview" -> "Traders to Rulers";
#: "X — this node's lesson: Y" -> "X".
_TITLE_TRAIL_META = re.compile(
    r"\s+(?:in|of|for|from|across|throughout|within)\s+"
    r"(?:the|this|that|each|every|its|a|an)\s+(?:previous|preceding|next|"
    r"earlier|present|current|same|whole|entire)?\s*"
    r"(?:chapter|node|unit|section|book|part|lesson|syllabus|paper|exam|"
    r"course)\b.*$"
    r"|\s*[-–—]\s*(?:this|the|our)\s+(?:node|chapter|unit|section|book)"
    r"['’]?s?\b.*$"
    r"|\s+(?:the\s+)?(?:chapter|node|unit|section)s?[-‐‑–—\s]"
    r"(?:overview|map|summary|synthesis|introduction|recap)\s*$"
    r"|\s+(?:chapter|node|unit|section|book|part|lesson)s?"
    r"(?:\s+(?:in|of|for|on)\b.*)?$", re.I)
#: The defined concept always precedes the first finite verb.
_TITLE_VERB = re.compile(
    r"\s+(?:is|are|was|were|has|have|had|means|refers?(?:\s+to)?|denotes|"
    r"describ\w+|defines?|forms?|formed|forming|consists?(?:\s+of)?|"
    r"comprises?|quantif\w+|covers?|provides?|introduc\w+|deals?\s+with|"
    r"explores?|examines?|explains?|focus(?:es|ed)?(?:\s+on)?|involves?|"
    r"occurs?|takes?\s+place|uses?|includes?|measures?|represents?|"
    r"governs?|regulates?|controls?|converts?|transforms?|produces?|"
    r"classif\w+|determines?|accepts?|declares?|applies|applied|"
    r"synthesi[sz]\w+|consolidates?|revises?|summari[sz]\w+|studies|"
    r"helps?|allows?|enables?|plays?|serves?|functions?|requires?|"
    r"presents?|discusses?|reviews?|surveys?|offers?|addresses?|aims?|"
    r"seeks?|attempts?|concerns?|traces?|lists?|maps|outlines?|details?|"
    r"walks?\s+through|looks?\s+at|can\s+be|may\s+be|acts?|works?|"
    r"operates?|links?|connects?|leads?\s+to|differs?|remains?|extends?|"
    r"underpins?|builds?(?:\s+on)?|combines?|separates?|relates|"
    r"opens?|gives?|yields?|establish\w+|known\s+as|called|termed|named|"
    r"dubbed|labelled|labeled|revolves?(?:\s+around)?|centr(?:es?|ers?)"
    r"\s+on|spans?|ranges?|prescribed|adapts?|adapted|based\s+on|"
    r"drawn\s+from|taken\s+from|assess\w+|enforc\w+|demonstrat\w+|"
    r"states?|shows?|constitutes?|"
    r"illustrat\w+|portray\w+|depict\w+|trains?|develops?|evaluat\w+|"
    r"tests?|targets?|expects?|creates?|stores?|returns?|handles?|"
    r"process\w+|calculat\w+|comput\w+|solves?|finds?|obtains?|runs?|"
    r"begins?|ends?|starts?|continues?|maintains?|supports?|protects?|"
    r"prevents?|detects?|ensures?|performs?|conducts?|undertakes?|"
    r"implements?|employs?|utili[sz]\w+|organi[sz]\w+|structures?|"
    r"frames?|composes?|constructs?|analy[sz]\w+|interprets?|"
    r"translates?|teach\w+|practis\w+|practic\w+|memori[sz]\w+|"
    r"recalls?|identif\w+|enumerat\w+|observes?|investigat\w+|"
    r"responds?|reacts?|answers?|argues?|asserts?|"
    r"claims?|suggests?|implies?|infers?|concludes?|proves?|justif\w+|"
    r"compares?|contrasts?|distinguish\w+|differentiat\w+|orders?|"
    r"ranks?|arranges?|displays?|reveals?|narrates?|recounts?|equips?|"
    r"prepares?|positions?|situates?|locates?|unpacks?|navigates?|"
    r"follows?|precedes?|anchors?|grounds?|unpacks?)\b", re.I)
#: A candidate made only of generic nouns carries no topic — when it heads
# a "…: <real list>" shape, the list's first item is the better title.
#: Subject-word guard: when a "verb" match is immediately followed —
#: parentheticals aside — by a real finite verb, it is the subject's own
#: noun and the actual predicate comes later: "**Age structure** is…"
#: (match "structure", next word "is"), "calculations (stoichiometry)
#: use…" (match "calculations", next verb "use").  Without this check the
#: candidate truncates to the noun's left neighbour ("Age", "Chemical
#: equation").
_TITLE_FOLLOW_VERB = re.compile(
    r"^\s*(?:\([^)]{1,60}\)\s*)*"
    r"(?:is|are|was|were|has|have|had|means|meant|refers|denotes|"
    r"describes|defines|consists|comprises|represents|involves|use|uses|"
    r"serves|functions|remains|becomes|seems|appears|helps|allows|"
    r"enables|provides|covers|includes|contains|forms|acts|works|"
    r"plays|takes|makes|lies|holds)\b", re.I)
_TITLE_VAGUE = re.compile(
    r"^(?:(?:core|key|main|basic|fundamental|major|essential|important|"
    r"all|various|concepts?|topics?|ideas|themes?|points?|principles?|"
    r"areas?|aspects?|elements?|features?|basics|fundamentals|skeleton|"
    r"outlines?|frameworks?|templates?|backbones?|recaps?|wrap[-\s]?ups?|"
    r"revisions?|consolidations?|synthes[ie]s|overviews?|summaries|of)\s*)+$",
    re.I)


def _title_clean(text: str) -> str:
    """Normalise a raw clause into a title-shaped string (or "")."""
    t = _TITLE_MARKUP.sub("", text or "")
    # corpus typography: U+2011 non-breaking hyphen, U+202F narrow nbsp,
    # U+00A0 nbsp all break naive word-boundary rules.
    t = (t.replace("‑", "-").replace(" ", " ")
          .replace(" ", " "))
    t = re.sub(r"\s+", " ", t).strip()
    t = re.sub(r"^\(\s*[0-9ivxlcdm]+\s*\)\s*", "", t, flags=re.I)
    t = re.sub(r"^[\s,;:.\-–—]+", "", t)
    t = re.sub(r"^\d+['’]?s?\s+", "", t)      # "04004's counting work"
    t = re.sub(r"^(?:concept\s+nodes?|chapters?)\s+(?=\D)", "", t,
               flags=re.I)
    t = _TITLE_LEADIN.sub("", t)
    t = _TITLE_COLLECTIVE.sub("", t)   # "each sub-topic of the chapter"
    t = _TITLE_META_POS.sub("", t)     # needs the determiner — runs first
    t = _TITLE_ARTICLE.sub("", t)
    t = re.sub(r"^[\s,;:.\-–—(]+", "", t)  # "chapter — OOP" -> "OOP"
    t = re.sub(r"\s+\(.*$", "", t)          # "Chlorine (Cl)" -> "Chlorine"
    t = t.strip(" \"'“”‘’")
    t = _TITLE_TRAIL_META.sub("", t)        # "… in this chapter" -> ""
    t = t.split(",", 1)[0]                  # enumeration tails off
    t = re.sub(r"[\s,;:.\-–—]+$", "", t)
    t = re.sub(r"^(?:of|for|in|on|to|and|or|with|by|from|as|about|into|"
               r"onto|upon|through)\s+", "", t, flags=re.I)
    t = _TITLE_ARTICLE.sub("", t)           # "about the X" -> "X"
    # Trailing stopwords — repeated so "… in Java can" loses "can" and
    # "… should be" loses both.  Includes auxiliaries/modals: candidates
    # cut before "can accept"/"may declare" would otherwise dangle one.
    t = re.sub(r"(?:\s+(?:of|for|in|on|to|and|or|with|by|from|as|the|a|"
               r"an|can|could|may|might|will|would|shall|should|must|"
               r"ought|do|does|did|is|are|was|were|has|have|had|be|been|"
               r"being|am))+$", "", t, flags=re.I)
    t = t.strip()
    if t.isupper() and (" " in t or len(t) > 6):
        t = t.title()               # "NUMBER SYSTEM" -> "Number System"
    return t


#: A numbered container ref can never be a topic name, wherever it sits.
_TITLE_NUMBERED = re.compile(
    r"\b(?:chapter|unit|lesson|part|section|concept\s+node|node)s?"
    r"\s+(?:\d+|[ivxlcdm]+)\b", re.I)
#: Node ids (c10_bio_icse_01_001 / c6mathicse04005) never reach display.
_TITLE_ID = re.compile(r"\bc\d{1,2}(?:_[a-z0-9]+){2,}\b|"
                       r"\bc\d{1,2}[a-z]{3,}\d{4,}\b", re.I)
#: Function words and bare containers are never titles — they survive
#: cleaning when a "verb" match cuts inside the subject ("The |order
#: (or dimension) of a matrix is…" -> cand "The").
_TITLE_STOPWORDS = frozenset({
    "the", "a", "an", "of", "in", "on", "at", "to", "for", "and", "or",
    "by", "with", "as", "is", "are", "was", "were", "be", "it", "its",
    "we", "they", "he", "she", "this", "that", "these", "those",
    "there", "here", "chapter", "node", "unit", "part", "section",
    "topic", "lesson", "overview", "concept",
    "concepts", "thing", "things",
    # question words and bare number words — truncation fragments, not
    # topics ("Who", "How", "Two" seen in the W2 title sweep)
    "who", "how", "two", "one", "why", "what", "when", "where",
    "which"})


def _title_ok(t: str) -> bool:
    return (bool(t) and 3 <= len(t) <= 60 and len(t.split()) <= 10
            and re.search(r"[^\W\d_]", t) is not None
            and "(" not in t and ")" not in t
            and t.lower() not in _TITLE_STOPWORDS
            and not _TITLE_META_SUBJ.match(t)
            and not _TITLE_BAD_START.match(t)
            and not _TITLE_NUMBERED.search(t)
            and not _TITLE_ID.search(t))


def _title_from_head(head: str, _depth: int = 0) -> str:
    """Topic title from a definition's first line ("" when nothing honest).

    Order of trust: a "Chapter N (Name)" reference's bracketed name ->
    quoted topic name on a meta opener -> clause left of the first finite
    verb -> separator-delimited first clause -> whole head -> word-bounded
    cut.  Meta, vague and unusable candidates descend (depth-capped) into
    the covered object ("This node covers X" -> X)."""
    head = re.sub(r"\s+", " ", _TITLE_MARKUP.sub(
        "", (head or "").replace("‑", "-").replace(" ", " ")
        .replace(" ", " "))).strip()
    if not head:
        return ""
    if _TITLE_META_SUBJ.match(head) or re.match(
            r"^(?:the\s+|this\s+|our\s+|entire\s+)?"
            r"(?:chapter|unit|lesson|book|part)\s+\d+\b", head, re.I):
        cn = _TITLE_CHAPTER_NAME.search(head[:140])
        if cn:
            cand = _title_clean(cn.group(1))
            if _title_ok(cand):
                return cand
        q = _TITLE_QUOTED.search(head[:220])
        if q:
            cand = _title_clean(q.group(1))
            if _title_ok(cand):
                return cand
    descend_at = []
    for m in _TITLE_VERB.finditer(head):
        if not head[m.end():].strip():
            # A "verb" that ends the head is a noun here ("Age structure").
            continue
        if _TITLE_FOLLOW_VERB.match(head[m.end():]):
            # Subject noun, not the predicate — the real verb follows
            # immediately: "Age structure is…", "calculations (…) use…".
            continue
        cand = _title_clean(head[:m.start()])
        if _title_ok(cand):
            return cand
        if _depth < 2:
            if not cand:
                # Meta clause stripped to nothing — the topic is right
                # of the verb ("This node covers X").
                sub = _title_from_head(head[m.end():], _depth + 1)
                if sub:
                    return sub
            else:
                # Non-empty but unusable ("The", too long, numbered):
                # later verbs may still frame the full clause — descend
                # here only if none of them yield a title.
                descend_at.append(m.end())
    if _depth < 2:
        for pos in descend_at:
            sub = _title_from_head(head[pos:], _depth + 1)
            if sub:
                return sub
    for sep in (" – ", " — ", " - ", ": ", "; ", "।", "."):
        if sep in head:
            left, _, right = head.partition(sep)
            cand = _title_clean(left)
            if _title_ok(cand):
                if _TITLE_VAGUE.match(cand) and _depth < 2:
                    sub = _title_from_head(right, _depth + 1)
                    if sub:
                        return sub
                return cand
            if _depth < 2:
                sub = _title_from_head(right, _depth + 1)
                if sub:
                    return sub
    cand = _title_clean(head)
    if _title_ok(cand):
        return cand
    if len(head) > 57:
        cut = head[:57]
        sp = cut.rfind(" ")
        return (cut[:sp] if sp > 10 else cut).rstrip(",;: ") + "…"
    # Last resort: the raw head only when it is real words — never a
    # punctuation stub (":"), never a meta fragment.
    if (re.search(r"[^\W\d_]", head)
            and not _TITLE_META_SUBJ.match(head)
            and not _TITLE_BAD_START.match(head)):
        return head
    return ""


def _derive_title(node: Dict) -> str:
    """Best-effort topic title.

    The corpus has no title field — the definition's first clause is the
    defined concept ("Electric current is the rate of flow…" -> "Electric
    current"); meta openers un-nest to the covered object.  Falls back to
    a prettified node_id.
    """
    definition = (node.get("definition") or "").strip()
    if definition:
        title = _title_from_head(definition.split("\n")[0])
        if title:
            return title[0].upper() + title[1:]
    nid = node.get("node_id", "")
    parts = nid.split("_")
    return " ".join(p.capitalize() for p in parts if p and not p.isdigit()) or nid


#: Literal container nouns + meta openers — never a topic name, however
#: they reached the row (pre-hardening loader truncation, markup leak).
_TITLE_WEAK_META = re.compile(
    r"^(?:this|the|an?|our|each|every)\s+[\w'’\-]*\s*"
    r"(?:chapter|node|section|unit|topic|lesson|overview|block|module|"
    r"part|object)s?\b", re.I)


def is_weak_title(title: str) -> bool:
    """True when a stored/served title is degenerate — never a topic name.

    Covers the audit's W2 shapes: literal meta nouns ("This Chapter",
    "This Node", "An Object"), truncated first-sentence fragments
    ("This chapter introduces object-oriented…"), markdown/LaTeX leaks
    ("A **polar covalent bond**"), embedded newlines, and unusable
    length.  Serve paths use it to prefer the derived title over a stale
    enrichment_content.title row; tools/fix_weak_titles uses it to find
    the rows to repair.
    """
    t = (title or "").strip()
    return (not t or len(t) < 4 or len(t) > 60 or "\n" in t
            or _TITLE_WEAK_META.match(t) is not None
            or _TITLE_MARKUP.search(t) is not None
            or re.search(r"…|\.{3,}", t) is not None)


def _summary(node: Dict, snippet_chars: int = 220) -> Dict:
    return {
        "node_id": node["node_id"],
        "title": _derive_title(node),
        "class": node["class"],
        "subject": node["subject"],
        "chapter": node["chapter"],
        "definition": (node["definition"] or "")[:snippet_chars],
        "has_diagnostics": bool(node["diagnostics"]),
    }


_SUBJECT_ALIASES = {
    "bio": "biology", "chem": "chemistry", "phy": "physics",
    "phys": "physics", "math": "maths", "engl": "english",
    "hist": "history", "geo": "geography", "eco": "economics",
    "civ": "civics", "soc": "social",
}


# Subject FAMILIES (many-to-many): corpus codes that belong to one subject
# family. "comp" is deliberately NOT in the computer family — it is the
# English-composition code in this corpus (audit 2026-10-11). The computer
# corpus really lives at cs (11-12) + compst/comst (6-8) + compapp (9-10).
_SUBJECT_GROUPS = [
    {"cs", "computer", "computer_science", "compst", "comst", "compapp", "ip"},
    {"hin", "hindi", "hin_a", "hin_v", "hin_al", "hin_ar", "hin_ga",
     "hin_kr", "hin_ks", "hin_sp"},
    {"eng", "engl", "english", "eng_k", "eng_w", "eng_f", "eng_v",
     "eng_s", "eng_h", "eng_elec", "eng_mod", "gram", "grammar", "comp"},
    {"econ", "eco", "economics"},
    {"bst", "bs", "business_studies", "business"},
    {"polsci", "pol", "political_science"},
]


def _subject_matches(node_subject: str, wanted: str) -> bool:
    ns = (node_subject or "").strip().lower()
    ws = (wanted or "").strip().lower()
    if not ws or not ns or ns == ws:
        return True
    # bidirectional alias match — "bio" expands to biology, and the
    # long form "physics" must also find nodes coded "phy"
    if _SUBJECT_ALIASES.get(ws) == ns or _SUBJECT_ALIASES.get(ns) == ws:
        return True
    # family match — cs/computer reach compst/comst/compapp; hindi the
    # hin_* book family; english the eng_* family + comp(osition). A
    # subject that lives in a family does NOT prefix-match outside it
    # (that is what let "comp" — English composition — match
    # "computer_science" through the startswith fallback).
    ns_fam = ws_fam = None
    for fam in _SUBJECT_GROUPS:
        if ns in fam:
            ns_fam = fam
        if ws in fam:
            ws_fam = fam
    if ns_fam is not None or ws_fam is not None:
        return ns_fam is not None and ns_fam is ws_fam
    # prefix fallback for related spellings (math/maths, eng/english…)
    return bool(ns and ws and (ns.startswith(ws) or ws.startswith(ns))
                and len(ns) >= 3 and len(ws) >= 3)


class EnhancedNodesIndex:
    """In-memory index of parsed teaching nodes (+ case-study companions).

    Teaching nodes and companions share lookup-by-id, but companions are
    stored separately (``self.companions``) so every teaching count
    (``node_count``, ``by_class_subject``, ``search``) stays honest.
    """

    def __init__(self, nodes: List[Dict], stats: Optional[Dict] = None,
                 companions: Optional[List[Dict]] = None):
        self.nodes: Dict[str, Dict] = {n["node_id"]: n for n in nodes}
        self.companions: Dict[str, Dict] = {
            c["node_id"]: c for c in (companions or [])}
        self.stats: Dict = stats or {}
        self._hay: Dict[str, tuple] = {}  # node_id -> lowercase search hay
        self._by_cs: Dict[Tuple[int, str], List[str]] = {}
        for nid, node in self.nodes.items():
            self._by_cs.setdefault(
                (node["class"], node["subject"]), []).append(nid)
        for ids in self._by_cs.values():
            ids.sort()
        # build the search haystack once (rides the pickle cache); the lazy
        # per-query build in search() stays as a fallback for older caches
        for nid, node in self.nodes.items():
            self._hay[nid] = (
                nid.lower(),
                _derive_title(node).lower(),
                (node["definition"] or "").lower(),
                " ".join(filter(None, [
                    node["walkthrough"], node["mastery_criteria"],
                    node["scope_boundary"], node["cognitive_level"],
                    *[d["q"] for d in node["diagnostics"]],
                ])).lower(),
            )

    # -- basic access ------------------------------------------------------

    def __len__(self) -> int:
        return len(self.nodes)

    def get(self, node_id: str) -> Optional[Dict]:
        node = self.nodes.get(node_id)
        if node is None:
            node = self.companions.get(node_id)
        if node is None:
            key = (node_id or "").strip().lower()
            node = self.nodes.get(key) or self.companions.get(key)
        return node

    def node_count(self) -> int:
        """Teaching-node count (companions excluded -- see companion_count)."""
        return len(self.nodes)

    def companion_count(self) -> int:
        return len(self.companions)

    def companions_for_parent(self, parent_node_id: str) -> List[Dict]:
        """All case-study companions of one parent node, id-sorted."""
        pid = (parent_node_id or "").strip().lower()
        return [self.companions[cid]
                for cid in sorted(self.companions)
                if self.companions[cid].get("parent_node_id", "").lower()
                == pid]

    def exam_coaching_for_parent(self, parent_node_id: str) -> Dict[str, Any]:
        """Extract shortcuts, traps, and exam strategies from case-study companions."""
        comps = self.companions_for_parent(parent_node_id)
        shortcuts: List[Dict[str, str]] = []
        traps: List[str] = []
        variants: List[str] = []
        exam_targets: set[str] = set()
        for comp in comps:
            for t in comp.get("exam_targets", "").split(","):
                if t.strip():
                    exam_targets.add(t.strip())
            strat = comp.get("exam_strategy") or {}
            if strat.get("common_traps"):
                traps.append(strat["common_traps"])
            for sq in comp.get("seed_questions") or []:
                for sub_key, sub_text in (sq.get("sub_parts") or {}).items():
                    sc_m = re.search(r"\*\*Shortcut:\*\*\s*([\s\S]*?)(?=\||Traps|\n\n|$)", sub_text)
                    if sc_m:
                        shortcuts.append({"title": sq.get("title", f"Scenario {sq.get('index', 1)}"), "text": sc_m.group(1).strip()})
                    tr_m = re.search(r"\*\*Traps:\*\*\s*([\s\S]*?)(?=\||Variants|\n\n|$)", sub_text)
                    if tr_m:
                        for trap_item in re.split(r"\(\d+\)", tr_m.group(1)):
                            cleaned = trap_item.strip().strip(".,;")
                            if len(cleaned) > 5 and cleaned not in traps:
                                traps.append(cleaned)
                    va_m = re.search(r"\*\*Variants:\*\*\s*([\s\S]*?)$", sub_text)
                    if va_m:
                        variants.append(va_m.group(1).strip())
        return {
            "shortcuts": shortcuts,
            "traps": traps[:8],
            "variants": variants[:5],
            "exam_targets": sorted(list(exam_targets)),
        }

    def teach_loop_for(self, node_id: str) -> Optional[Dict[str, Any]]:
        """The doubt -> learning-loop payload for one teaching node.

        An answered doubt is the highest-intent learning signal the app
        gets; this hands the frontend the authored pedagogy for that node
        in one shot so the student rolls straight from the answer into
        the concept, a self-check, an exam-level capstone and the next
        concept -- understand -> check -> stretch -> next.

          concept : title + definition + ELI5 + story deep link
          check   : the node's first diagnostic (q/a + misconception)
          stretch : the case-study companion's first seed question
                    (the ..._comp capstone), when one exists
          next    : forward_node_ids resolved to titles + the authored
                    reason each one follows

        Teaching nodes only -- companion ids and unknown ids return None
        so callers attach ``teach_loop: None`` and move on."""
        node = self.nodes.get((node_id or "").strip())
        if node is None:
            return None
        nid = node["node_id"]

        diags = node.get("diagnostics") or []
        first = diags[0] if diags else None
        check = ({
            "index": first["index"],
            "question": first["q"],
            "answer": first["a"],
            "misconception": first["misconception"],
            "total": len(diags),
        } if first else None)

        stretch = None
        comps = self.companions_for_parent(nid)
        cqs = node.get("competency_questions") or []
        # Hindi-medium nodes: their _comp companions are authored in English,
        # but the node's own competency question is in Hindi — prefer it so
        # the loop stays in the student's medium. The comp remains linked
        # below as an optional deep-dive.
        is_hindi = nid.split("_")[1].startswith("hin") if "_" in nid else False
        if is_hindi and cqs:
            cq = cqs[0]
            stretch = {
                "comp_id": comps[0]["node_id"] if comps else None,
                "title": (cq.get("question") or "")[:120],
                "difficulty": cq.get("difficulty") or "medium",
                "exam_targets": cq.get("competency") or "",
                "url": f"/learn/{nid}/story",
                "question": cq.get("question"),
                "answer": cq.get("answer"),
            }
        elif comps:
            comp = comps[0]
            seeds = comp.get("seed_questions") or []
            seed = seeds[0] if seeds else {}
            stretch = {
                "comp_id": comp["node_id"],
                "title": seed.get("title") or "Case study",
                "difficulty": seed.get("difficulty") or "",
                "exam_targets": comp.get("exam_targets") or "",
                "url": f"/learn/{nid}/story?comp={comp['node_id']}",
            }
        elif cqs:
            # No companion file: fall back to the node's own competency
            # question as the stretch target so every teach loop closes.
            cq = cqs[0]
            stretch = {
                "comp_id": None,
                "title": (cq.get("question") or "")[:120],
                "difficulty": cq.get("difficulty") or "medium",
                "exam_targets": cq.get("competency") or "",
                "url": f"/learn/{nid}/story",
                "question": cq.get("question"),
                "answer": cq.get("answer"),
            }

        reasons = node.get("forward_reasons") or {}
        nxt = []
        for fwd in (node.get("forward_node_ids") or [])[:3]:
            fwd_node = self.nodes.get(fwd)
            nxt.append({
                "node_id": fwd,
                "title": _derive_title(fwd_node) if fwd_node else fwd,
                "reason": reasons.get(fwd, ""),
            })

        # spiral-curriculum "revise earlier": the prerequisite list crosses
        # classes (a c10 photosynthesis node points back to c7/c8/c9 bio) —
        # surface it so a weak senior student can drop to the earlier pass.
        prereq_reasons = node.get("prerequisite_reasons") or {}
        revise = []
        for pre in (node.get("prereq_ids") or []):
            pre_node = self.nodes.get(pre)
            if not pre_node:
                continue
            if pre_node.get("class") == node.get("class"):
                continue          # same-class prerequisites are linear, not spiral
            revise.append({
                "node_id": pre,
                "title": _derive_title(pre_node),
                "class": pre_node.get("class"),
                "reason": prereq_reasons.get(pre, ""),
                "url": f"/learn/{pre}/story",
            })
            if len(revise) >= 2:
                break

        return {
            "node_id": nid,
            "concept": {
                "title": _derive_title(node),
                "definition": node.get("definition") or "",
                "eli5": node.get("eli5"),
                "subject": node.get("subject"),
                "chapter": node.get("chapter"),
                "learn_url": f"/learn/{nid}",
                "story_url": f"/learn/{nid}/story",
            },
            "check": check,
            "stretch": stretch,
            "next": nxt,
            "revise": revise,
        }

    def classes(self) -> List[int]:
        return sorted({c for c, _ in self._by_cs})

    def subjects(self, cls: Optional[int] = None) -> List[str]:
        subs = {s for c, s in self._by_cs if cls is None or c == cls}
        return sorted(subs)

    def per_class_counts(self) -> Dict[int, int]:
        return {c: sum(len(ids) for (cc, _), ids in self._by_cs.items()
                       if cc == c)
                for c in self.classes()}

    def per_class_subject_counts(self) -> Dict[str, Dict[str, int]]:
        """Teaching-node counts per class per corpus subject code.

        C10 audit (mastery map / honest subject cards): lets callers —
        e.g. GET /api/nodes/stats consumers — see which subjects a given
        class actually has content for (class 10 has no Hindi nodes;
        classes 11/12 do) without 404-probing every subject.
        """
        out: Dict[str, Dict[str, int]] = {}
        for (c, subj), ids in self._by_cs.items():
            out.setdefault(str(c), {})[subj] = len(ids)
        return out

    # -- class/subject listing --------------------------------------------

    def by_class_subject(self, cls: int, subject: str,
                         summaries: bool = True,
                         board: Optional[str] = None) -> List[Dict]:
        ids = self._by_cs.get((int(cls), (subject or "").strip().lower()))
        if not ids:
            # alias-tolerant scan (e.g. subject="bio" vs stored "biology")
            ids = sorted(
                nid for (c, s), nids in self._by_cs.items() if c == int(cls)
                for nid in nids if _subject_matches(s, subject))
        nodes = [self.nodes[nid] for nid in ids]
        if board:
            # icse/isc are one family: CISCE. Unmarked nodes are neutral
            # (serve both boards).
            b = board.strip().lower()
            want = {"icse", "isc"} if b in {"icse", "isc", "cisce"} else {b}
            nodes = [n for n in nodes
                     if (n.get("board") or "") in want
                     or not (n.get("board") or "")]
        return [_summary(n) for n in nodes] if summaries else nodes

    # -- search ------------------------------------------------------------

    def search(self, q: str, limit: int = 20,
               cls: Optional[int] = None,
               subject: Optional[str] = None) -> List[Dict]:
        ql = (q or "").strip().lower()
        if not ql:
            return []
        terms = ql.split()
        # Rust fast path (optional): atlas_speed.search_hay does the same
        # scoring in parallel across all hay entries — ~50× faster.
        try:
            import atlas_speed as _rs
        except ImportError:
            _rs = None
        if _rs is not None:
            rows = [(nid, *self._hay[nid]) for nid, node in self.nodes.items()
                    if nid in self._hay
                    and (cls is None or node["class"] == int(cls))
                    and (not subject or _subject_matches(node["subject"], subject))]
            results = _rs.search_hay(rows, terms, max(1, int(limit)))
        else:
            results: List[Tuple[float, str]] = []
            for nid, node in self.nodes.items():
                if cls is not None and node["class"] != int(cls):
                    continue
                if subject and not _subject_matches(node["subject"], subject):
                    continue
                # haystack is memoised per node: rebuilding the multi-KB body
                # string for every node on EVERY search cost seconds per call
                hay = self._hay.get(nid)
                if hay is None:
                    hay_id = nid.lower()
                    hay_title = _derive_title(node).lower()
                    hay_def = (node["definition"] or "").lower()
                    hay_body = " ".join(filter(None, [
                        node["walkthrough"], node["mastery_criteria"],
                        node["scope_boundary"], node["cognitive_level"],
                        *[d["q"] for d in node["diagnostics"]],
                    ])).lower()
                    hay = self._hay[nid] = (hay_id, hay_title, hay_def, hay_body)
                else:
                    hay_id, hay_title, hay_def, hay_body = hay
                score = 0.0
                for t in terms:
                    if t in hay_title:
                        score += 15.0
                    if t in hay_id:
                        score += 8.0
                    if t in hay_def:
                        score += 3.0
                    if t in hay_body:
                        score += 1.0
                if score:
                    results.append((score, nid))
            results.sort(key=lambda x: (-x[0], x[1]))
        out = []
        for score, nid in results[:max(1, int(limit))]:
            s = _summary(self.nodes[nid])
            s["score"] = score
            out.append(s)
        return out

    # -- graph view ---------------------------------------------------------

    def graph(self, cls: Optional[int] = None,
              subject: Optional[str] = None,
              limit: int = 300) -> Dict:
        """Return {nodes, links} for the knowledge-graph UI.

        Links are prereq edges (node -> its prerequisite) where both ends
        survive the class/subject filter.
        """
        picked: List[str] = []
        if cls is not None:
            # scope via _by_cs (alias-aware over ~115 keys, not 20k nodes)
            for (c, s), nids in self._by_cs.items():
                if c != int(cls):
                    continue
                if subject and not _subject_matches(s, subject):
                    continue
                picked.extend(nids)
        else:
            for nid, node in self.nodes.items():
                if subject and not _subject_matches(node["subject"], subject):
                    continue
                picked.append(nid)
        picked.sort()
        picked = picked[:max(1, int(limit))]
        picked_set = set(picked)
        nodes = [
            {
                "id": nid,
                **_summary(self.nodes[nid], snippet_chars=140),
                "group": self.nodes[nid]["subject"],
            }
            for nid in picked
        ]
        links = []
        for nid in picked:
            for pre in self.nodes[nid].get("prereq_ids") or []:
                if pre in picked_set:
                    links.append({"source": pre, "target": nid})
        return {"nodes": nodes, "links": links,
                "total_nodes": len(nodes), "total_links": len(links)}

    # -- serialisation (cache) ----------------------------------------------

    def to_dict(self) -> Dict:
        return {"nodes": list(self.nodes.values()),
                "companions": list(self.companions.values()),
                "stats": self.stats}

    @classmethod
    def from_dict(cls, data: Dict) -> "EnhancedNodesIndex":
        return cls(data.get("nodes", []), data.get("stats", {}),
                   data.get("companions", []))


# --------------------------------------------------------------------------
# Loading + JSON cache
# --------------------------------------------------------------------------


def get_md_dir() -> str:
    return os.environ.get("ENHANCED_NODES_MD_DIR", DEFAULT_MD_DIR)


# Dual-corpus serving (2026-09-29): the CISCE corpus ships as its own md dir
# next to the CBSE one. The loader scans BOTH so ICSE/ISC nodes serve through
# the same enrichment/search/teach paths. Ids never collide (board token is
# part of every stem); either dir missing is tolerated.
DEFAULT_CISCE_DIR = os.path.join(_REPO_ROOT, "content", "cisce_nodes_v2")


def get_md_dirs() -> List[str]:
    base = os.environ.get("ENHANCED_NODES_MD_DIR", DEFAULT_MD_DIR)
    dirs = [base]
    extra = os.environ.get("CISCE_NODES_MD_DIR", DEFAULT_CISCE_DIR)
    if extra not in dirs and os.path.isdir(extra):
        dirs.append(extra)
    return dirs


def _cache_path() -> str:
    return os.environ.get(
        "ENHANCED_NODES_CACHE_PATH",
        os.path.join(CACHE_DIR, CACHE_FILENAME))


def _md_files(md_dir: str) -> List[str]:
    return sorted(
        f for f in os.listdir(md_dir) if f.lower().endswith(".md"))


def _grade_map_path(md_dir: str) -> str:
    return os.path.join(md_dir, GRADE_MAP_FILENAME)


def load_grade_map(md_dir: str) -> Dict[str, Dict]:
    """Read the optional grade-map remap file.  Tolerant by contract: a
    missing file yields ``{}``; a malformed one is skipped (never raises,
    never blocks the corpus from serving)."""
    path = _grade_map_path(md_dir)
    if not os.path.isfile(path):
        return {}
    try:
        with open(path, "r", encoding="utf-8-sig") as fh:
            data = json.load(fh)
    except (OSError, ValueError):
        return {}
    overrides = data.get("overrides") if isinstance(data, dict) else None
    if not isinstance(overrides, dict):
        return {}
    return {str(k): v for k, v in overrides.items() if isinstance(v, dict)}


def apply_grade_map(nodes: List[Dict], grade_map: Dict[str, Dict]) -> Dict:
    """Apply the metadata-only remap in place.  Only the keys present in
    an override entry are written; every touched node records its original
    coordinates under ``_grade_map_original`` for auditability.  Returns
    ``{"applied": int, "unknown_ids": [str]}``."""
    applied = 0
    for node in nodes:
        ov = grade_map.get(node.get("node_id", ""))
        if not ov:
            continue
        original = node.get("_grade_map_original") or {}
        for field in ("class", "subject", "chapter"):
            if ov.get(field) is not None:
                original.setdefault(field, node.get(field))
                node[field] = ov[field]
        if original:
            node["_grade_map_original"] = original
            node["grade_map_reason"] = ov.get("reason")
        applied += 1
    known = {n.get("node_id") for n in nodes}
    unknown = sorted(k for k in grade_map if k not in known)
    return {"applied": applied, "unknown_ids": unknown}


def dir_fingerprint(md_dir: str) -> Dict:
    """Cheap content fingerprint of the md dir (count/bytes/latest mtime).

    ENHANCED_NODES_FAST_FINGERPRINT=1 skips the per-file stat loop — on
    Windows bind mounts 9k os.stat calls take tens of seconds per worker;
    count-only still invalidates on add/remove (corpus changes ship via
    image rebuilds anyway, which rewrite files wholesale)."""
    files = _md_files(md_dir)
    if os.environ.get("ENHANCED_NODES_FAST_FINGERPRINT") == "1":
        fp = {"file_count": len(files)}
        try:
            st = os.stat(_grade_map_path(md_dir))
            fp["grade_map_bytes"] = st.st_size
        except OSError:
            pass
        return fp
    total = 0
    latest = 0.0
    for f in files:
        try:
            st = os.stat(os.path.join(md_dir, f))
        except OSError:                          # pragma: no cover
            continue
        total += st.st_size
        latest = max(latest, st.st_mtime)
    # max_mtime deliberately excluded — container image builds and host
    # copies carry different mtimes for identical corpora, which rejected
    # every cache and forced the ~140s JSON rehydrate per worker.
    # count+bytes still identifies the corpus.
    fp = {"file_count": len(files), "total_bytes": total}
    # the grade-map file rides the fingerprint: editing or removing it
    # invalidates the cache so the remap lands with ONE rebuild
    try:
        st = os.stat(_grade_map_path(md_dir))
        fp["grade_map_bytes"] = st.st_size
    except OSError:
        pass
    return fp


def build_index(md_dirs):
    """Scan every md_dir and parse every node + companion file.  Tolerates
    malformed files -- they are counted as skipped in ``index.stats``.

    ``md_dirs`` may also be a single path (str/PathLike) — callers that
    hand one in would otherwise iterate it character-by-character."""
    if isinstance(md_dirs, (str, os.PathLike)):
        md_dirs = [os.fspath(md_dirs)]
    else:
        md_dirs = list(md_dirs)
    t0 = time.time()
    pairs = [(d, f) for d in md_dirs for f in _md_files(d)]
    nodes: List[Dict] = []
    companions: List[Dict] = []
    skipped: Dict[str, str] = {}
    degraded = 0
    companions_degraded = 0
    # Rust fast path (optional): atlas_speed.parse_dir reads + splits every
    # file in a dir off-GIL; _node_from_sections shapes identical output.
    _rust = None
    try:
        import atlas_speed as _rust_mod
        _rust = _rust_mod
    except ImportError:
        pass
    rust_sections: Dict[str, Tuple[str, Dict[str, str]]] = {}
    if _rust is not None:
        for d in md_dirs:
            try:
                for stem, secs in _rust.parse_dir(d):
                    rust_sections[os.path.join(d, stem + ".md")] = (stem, secs)
            except Exception as exc:
                logger.warning("atlas_speed parse_dir failed on %s: %s", d, exc)
                rust_sections = {}
                break
    for d, fname in pairs:
        stem = os.path.splitext(fname)[0]
        is_comp = stem.endswith(COMP_SUFFIX)
        rust_hit = rust_sections.get(os.path.join(d, fname))
        if is_comp:
            node, reason = parse_companion_file(os.path.join(d, fname))
        elif rust_hit is not None:
            node, reason = _node_from_sections(rust_hit[0], rust_hit[1])
        else:
            node, reason = parse_node_file(os.path.join(d, fname))
        if node is None:
            skipped[fname] = reason or "unknown"
            continue
        if node["missing_sections"]:
            if is_comp:
                companions_degraded += 1
            else:
                degraded += 1
        (companions if is_comp else nodes).append(node)
    # GRADE-MAP P1: metadata-only remap of misgraded nodes (before the
    # class/subject grouping index is built, so every consumer -- catalog,
    # search, teach lane, enrichment -- sees the corrected coordinates)
    grade_map: Dict[str, Dict] = {}
    for d in md_dirs:
        for k, v in load_grade_map(d).items():
            grade_map.setdefault(k, v)
    grade_stats = apply_grade_map(nodes, grade_map)
    stats = {
        "md_dir": ",".join(md_dirs),
        "files_found": len(pairs),
        "parsed": len(nodes),
        "companions": len(companions),
        "companions_degraded": companions_degraded,
        "skipped": len(skipped),
        "skipped_files": skipped,
        "degraded_missing_sections": degraded,
        "diagnostics_total": sum(len(n["diagnostics"]) for n in nodes),
        "grade_map_size": len(grade_map),
        "grade_map_applied": grade_stats["applied"],
        "grade_map_unknown_ids": grade_stats["unknown_ids"],
        "cache_hit": False,
        "build_seconds": round(time.time() - t0, 3),
    }
    return EnhancedNodesIndex(nodes, stats, companions)


def _pickle_cache_path() -> str:
    """Binary cache — json.load + from_dict on the 213MB JSON takes ~140s
    per worker (the worker-seizure bug); pickle restores the same objects
    in ~5-10s."""
    return _cache_path() + ".pickle"


def _read_cache(fingerprint: Dict) -> Optional[EnhancedNodesIndex]:
    # Fast path: pickled index keyed by the same fingerprint
    ppath = _pickle_cache_path()
    if os.path.isfile(ppath):
        try:
            import pickle
            with open(ppath, "rb") as fh:
                payload = pickle.load(fh)
            stored_fp = payload.get("fingerprint") or {}
            # subset match: a fast-mode fingerprint (file_count only)
            # validates against the stored full fingerprint's shared keys
            fp_ok = bool(stored_fp) and all(
                stored_fp.get(k) == v for k, v in fingerprint.items())
            if payload.get("cache_version") == CACHE_VERSION and fp_ok:
                idx = payload["index"]
                idx.stats = dict(idx.stats)
                idx.stats["cache_hit"] = True
                idx.stats["cache_format"] = "pickle"
                return idx
        except Exception:
            pass

    path = _cache_path()
    if not os.path.isfile(path):
        return None
    try:
        try:
            import orjson
            with open(path, "rb") as fh:
                payload = orjson.loads(fh.read())
        except ImportError:
            with open(path, "r", encoding="utf-8") as fh:
                payload = json.load(fh)
        if payload.get("cache_version") != CACHE_VERSION:
            return None
        if payload.get("fingerprint") != fingerprint:
            return None
        idx = EnhancedNodesIndex.from_dict(payload)
        idx.stats = dict(idx.stats)
        idx.stats["cache_hit"] = True
        # migrate to the binary cache so the next worker restores in ~10s
        try:
            import pickle as _pkl
            ptmp = ppath + ".tmp"
            with open(ptmp, "wb") as fh:
                _pkl.dump({"cache_version": CACHE_VERSION,
                           "fingerprint": fingerprint, "index": idx},
                          fh, protocol=_pkl.HIGHEST_PROTOCOL)
            os.replace(ptmp, ppath)
        except (OSError, TypeError):
            pass
        return idx
    except (OSError, ValueError, KeyError, TypeError):
        return None                                # corrupt cache -> rebuild


def _write_cache(index: EnhancedNodesIndex, fingerprint: Dict) -> None:
    path = _cache_path()
    payload = {"cache_version": CACHE_VERSION,
               "fingerprint": fingerprint,
               **index.to_dict()}
    try:
        import orjson                              # ~30× faster than json.dump
        os.makedirs(os.path.dirname(path), exist_ok=True)
        tmp = path + ".tmp"
        with open(tmp, "wb") as fh:
            fh.write(orjson.dumps(payload))
        os.replace(tmp, path)
    except ImportError:
        try:
            os.makedirs(os.path.dirname(path), exist_ok=True)
            tmp = path + ".tmp"
            with open(tmp, "w", encoding="utf-8") as fh:
                json.dump(payload, fh, ensure_ascii=False)
            os.replace(tmp, path)
        except OSError:
            pass                                   # cache is best-effort
    except OSError:
        pass                                       # cache is best-effort
    # binary cache — restores in seconds, not minutes
    try:
        import pickle
        ppath = _pickle_cache_path()
        tmp = ppath + ".tmp"
        with open(tmp, "wb") as fh:
            pickle.dump({
                "cache_version": CACHE_VERSION,
                "fingerprint": fingerprint,
                "index": index,
            }, fh, protocol=pickle.HIGHEST_PROTOCOL)
        os.replace(tmp, ppath)
    except (OSError, TypeError):
        pass


_LOCK = threading.Lock()
_INDEX: Optional[EnhancedNodesIndex] = None


def _read_stale_cache() -> Optional[EnhancedNodesIndex]:
    """Newest usable index regardless of fingerprint — served instantly
    while a background rebuild warms the fresh one."""
    ppath = _pickle_cache_path()
    for cand in ([ppath] if os.path.isfile(ppath) else []) + \
                ([_cache_path()] if os.path.isfile(_cache_path()) else []):
        try:
            if cand.endswith(".pickle"):
                import pickle
                with open(cand, "rb") as fh:
                    payload = pickle.load(fh)
            else:
                try:
                    import orjson
                    with open(cand, "rb") as fh:
                        payload = orjson.loads(fh.read())
                except ImportError:
                    with open(cand, "r", encoding="utf-8") as fh:
                        payload = json.load(fh)
            idx = payload.get("index") or (
                EnhancedNodesIndex.from_dict(payload)
                if payload.get("cache_version") == CACHE_VERSION else None)
            if idx is not None:
                idx.stats = dict(idx.stats)
                idx.stats["cache_hit"] = True
                idx.stats["stale_serve"] = True
                return idx
        except Exception:
            continue
    return None


def _background_rebuild(dirs, fingerprint):
    """Rebuild the index off the request path and hot-swap the singleton."""
    global _INDEX
    try:
        index = build_index(dirs)
        _write_cache(index, fingerprint)
        with _LOCK:
            _INDEX = index
        logger.info("enhanced-nodes: background rebuild swapped in (%d nodes)",
                    len(index.nodes))
    except Exception as exc:
        logger.warning("enhanced-nodes: background rebuild failed: %s", exc)


def load_index(force: bool = False,
               md_dir: Optional[str] = None) -> EnhancedNodesIndex:
    """Process-wide singleton index (thread-safe, double-checked).

    Raises ``RuntimeError`` when the md dir is missing entirely -- a
    single malformed file never raises.
    """
    global _INDEX
    if _INDEX is not None and not force and md_dir is None:
        return _INDEX
    with _LOCK:
        if _INDEX is not None and not force and md_dir is None:
            return _INDEX
        directory = md_dir or get_md_dir()
        dirs = [directory] if md_dir else get_md_dirs()
        for d in dirs:
            if not os.path.isdir(d):
                raise RuntimeError(
                    "enhanced-nodes md dir not found: %r (set "
                    "ENHANCED_NODES_MD_DIR / CISCE_NODES_MD_DIR)" % d)
        fingerprint = "|".join(
            json.dumps(dir_fingerprint(d), sort_keys=True) for d in dirs)
        index = None if force else _read_cache(fingerprint)
        if index is None and not force:
            # stale-serve: hand back the previous index NOW and rebuild in
            # the background — requests never eat the 2-minute rebuild
            stale = _read_stale_cache()
            if stale is not None:
                threading.Thread(
                    target=_background_rebuild,
                    args=(dirs, fingerprint), daemon=True,
                ).start()
                _INDEX = stale
                return stale
        if index is None:
            index = build_index(dirs)
            _write_cache(index, fingerprint)
        _INDEX = index
        return index


def reset_index() -> None:
    """Drop the singleton (used by tests / admin refresh)."""
    global _INDEX
    with _LOCK:
        _INDEX = None


def teaching_node_count() -> int:
    """Best-effort count for tutor hooks; 0 when the corpus is absent."""
    try:
        return load_index().node_count()
    except Exception:
        return 0


# --------------------------------------------------------------------------
# Marking-point model answers (NONSTEM-2)
# --------------------------------------------------------------------------

#: content/marking_points/<subject>.json written by
#: tools/build_marking_points.py; _index.json maps node_id -> subject file.
#: Live copies go in cbse_data (writable mount, survives rebuilds);
#: the baked /app/content copy is the image fallback.
_MP_DIRS = [os.path.join(_REPO_ROOT, "cbse_data", "marking_points"),
            os.path.join(_REPO_ROOT, "content", "marking_points")]
_MP_INDEX: Optional[Dict[str, str]] = None
_MP_FILES: Dict[str, Dict] = {}
_MP_LOCK = threading.Lock()

#: stopwords skipped when scoring item-question overlap
_MP_STOP = frozenset(
    "a an the is are was were of in on at to for and or why how what when "
    "which who whom whose did does do explain describe state name list "
    "give write discuss define any that this it its".split())


def _mp_index() -> Dict[str, str]:
    global _MP_INDEX
    if _MP_INDEX is not None:
        return _MP_INDEX
    with _MP_LOCK:
        if _MP_INDEX is None:
            for d in _MP_DIRS:
                path = os.path.join(d, "_index.json")
                try:
                    with open(path, encoding="utf-8") as fh:
                        _MP_INDEX = json.load(fh)
                    break
                except OSError:
                    continue
            if _MP_INDEX is None:
                _MP_INDEX = {}
    return _MP_INDEX


def _mp_file(subject: str) -> Dict:
    """Lazy per-subject marking-points file (71 MB total, so no eager load)."""
    cached = _MP_FILES.get(subject)
    if cached is not None:
        return cached
    with _MP_LOCK:
        cached = _MP_FILES.get(subject)
        if cached is None:
            cached = {}
            for d in _MP_DIRS:
                path = os.path.join(d, f"{subject}.json")
                try:
                    with open(path, encoding="utf-8") as fh:
                        cached = json.load(fh)
                    break
                except OSError:
                    continue
            _MP_FILES[subject] = cached
    return cached


def _mp_terms(text: str) -> set:
    return {t for t in re.findall(r"[a-z]+", (text or "").lower())
            if t not in _MP_STOP and len(t) > 2}


#: node-level MiniLM embedding index for semantic recall (lexical search
#: misses on science terms).  Encoded once, cached to cbse_data like the
#: concept embeddings — restarts skip the ~9k-node encode.
_NODE_EMB = None
_NODE_EMB_LOCK = threading.Lock()


class _LazyEmbedModel:
    """E1 (BATCH_BRIEF §4): the MiniLM must load on FIRST QUERY, not at
    cache load — a boot that reads the .npy must not pay the ~48s torch
    import.  Implements .encode over the shared model_hub singleton."""

    def __init__(self, mname: str, getter):
        self._mname = mname
        self._getter = getter
        self._m = None

    def encode(self, texts, **kw):
        if self._m is None:
            self._m = self._getter()
        return self._m.encode(texts, **kw)


def _embed_texts_and_key(index):
    """THE node-embedding text construction + content key.  Byte-exact
    contract: the precompute tool (tools/precompute_node_embeds.py) and
    the boot loader MUST derive the same texts or the .npy key misses
    and boot falls back to a stale cache / a 45-minute encode."""
    nids = sorted(index.nodes.keys())
    texts = []
    for nid in nids:
        n = index.nodes[nid]
        texts.append(" ".join(filter(None, [
            nid, n.get("definition", ""),
            n.get("mastery_criteria", ""),
            " ".join(d.get("q", "") for d in
                     (n.get("diagnostics") or [])[:4]),
        ])).lower())
    mname = os.environ.get("COMPETENCY_EMBEDDER",
                           "all-MiniLM-L6-v2")
    key = hashlib.sha256(
        (mname + "|nodes|" + "\x00".join(texts)).encode()
    ).hexdigest()[:24]
    return nids, texts, mname, key


def _node_embeddings(index):
    global _NODE_EMB
    if _NODE_EMB is not None:
        return _NODE_EMB
    with _NODE_EMB_LOCK:
        if _NODE_EMB is not None:
            return _NODE_EMB
        try:
            import numpy as np
            nids, texts, mname, key = _embed_texts_and_key(index)
            # PERF (2026-10-03): default MiniLM rides the process-wide
            # shared singleton (backend.ai.model_hub) instead of its own
            # SentenceTransformer instance.
            # E1: sentence_transformers imports torch (~48s cold) — it
            # belongs INSIDE the model getter, so a .npy cache hit never
            # pays it at boot (the lazy proxy defers to first query).
            def _get_model():
                if mname in ("all-MiniLM-L6-v2",
                             "sentence-transformers/all-MiniLM-L6-v2"):
                    from backend.ai import model_hub
                    return model_hub.load_sync()
                from sentence_transformers import SentenceTransformer
                return SentenceTransformer(mname)
            cache = os.path.join(_REPO_ROOT, "cbse_data",
                                 f"node_embed_{key}.npy")
            emb = None
            if os.path.exists(cache):
                try:
                    emb = np.load(cache)
                except Exception:
                    emb = None
            if emb is None:
                # Content-wave fallback: when the exact content-hash cache
                # misses (definitions being rewritten by authoring waves),
                # serve the newest existing embeddings rather than blocking
                # every solve for a ~45-minute rebuild.  Slightly stale
                # semantic recall is harmless; a wedged solver is not.
                import glob as _glob
                _stale = sorted(_glob.glob(os.path.join(_REPO_ROOT, "cbse_data",
                                                       "node_embed_*.npy")),
                                key=os.path.getmtime)
                if _stale:
                    try:
                        _prev = np.load(_stale[-1])
                        if _prev.ndim == 2 and len(nids) == _prev.shape[0]:
                            emb = _prev
                            logger.warning(
                                "node embeddings: serving STALE cache %s "
                                "(content waves in progress — will rebuild "
                                "when they finish)", os.path.basename(_stale[-1]))
                    except Exception:
                        emb = None
            if emb is None:
                model = _get_model()
                emb = model.encode(texts, normalize_embeddings=True)
                try:
                    np.save(cache, emb)
                except Exception:
                    pass
            # E1: lazy model — a .npy/stale-cache hit must not import
            # torch at boot; the model loads on the first real query
            _NODE_EMB = (nids, emb, _LazyEmbedModel(mname, _get_model))
        except Exception:
            _NODE_EMB = None
    return _NODE_EMB


def _semantic_hits(index, ql: str, limit: int,
                   threshold: float = 0.3) -> List[str]:
    """Top-``limit`` node_ids by embedding similarity; [] when the model
    or cache is unavailable (caller falls back to lexical-only)."""
    try:
        packed = _node_embeddings(index)
        if packed is None:
            return []
        nids, emb, model = packed
        q = model.encode([ql.lower()], normalize_embeddings=True)[0]
        scores = emb @ q
        order = scores.argsort()[::-1][:limit]
        return [nids[i] for i in order if scores[i] > threshold]
    except Exception:
        return []


# --- node -> simulation links (SIM_INDEX reverse map) -------------------
_SIM_DIRS = [os.path.join(_REPO_ROOT, "cbse_data"),
             os.path.join(_REPO_ROOT, "content")]
_NODE_SIMS: Optional[Dict] = None


def sims_for_node(nid: str) -> List[Dict]:
    """Return [{id, title}] of interactive sims covering this node.
    Frozen map: node_sims.json (built from SIM_INDEX.json reverse index)."""
    global _NODE_SIMS
    if _NODE_SIMS is None:
        _NODE_SIMS = {}
        for d in _SIM_DIRS:
            p = os.path.join(d, "node_sims.json")
            try:
                with open(p, encoding="utf-8") as fh:
                    _NODE_SIMS = json.load(fh)
                break
            except OSError:
                continue
    return _NODE_SIMS.get(nid, [])


# --- misconception remediation (non-stem-4) -----------------------------
_MP_DIR_CANDIDATES = [
    os.path.join(_REPO_ROOT, "cbse_data", "marking_points"),
    os.path.join(_REPO_ROOT, "content", "marking_points"),
]
_MP_CACHE: Dict[str, Dict] = {}


def misconception_for_node(nid: str) -> Optional[Dict]:
    """Return {misconception, wrong_signals} for a node from the extracted
    marking-point index — used to attach targeted remediation when a
    student gets a node's question wrong."""
    if nid in _MP_CACHE:
        return _MP_CACHE[nid]
    # node subject selects the file: hist.json, bio.json, ...
    m = re.match(r"c\d+_([a-z_]+?)(?:_cbse)?_\d", nid or "")
    if not m:
        _MP_CACHE[nid] = None
        return None
    subj = m.group(1)
    if subj not in _MP_CACHE:
        entry = None
        for d in _MP_DIR_CANDIDATES:
            p = os.path.join(d, f"{subj}.json")
            try:
                with open(p, encoding="utf-8") as fh:
                    entry = json.load(fh)
                break
            except OSError:
                continue
        _MP_CACHE[subj] = entry or {}
    node_mp = (_MP_CACHE.get(subj) or {}).get(nid)
    if not node_mp:
        _MP_CACHE[nid] = None
        return None
    miscon, wrong = None, []
    for it in node_mp.get("items", []):
        if it.get("misconception") and miscon is None:
            miscon = it["misconception"]
        wrong.extend(it.get("wrong_signals") or [])
    result = {"misconception": miscon, "wrong_signals": wrong[:4]}
    _MP_CACHE[nid] = result
    return result


# --- generated chapter packs (model_answers/) ---------------------------
_MA_DIRS = [os.path.join(_REPO_ROOT, "cbse_data", "model_answers"),
            os.path.join(_REPO_ROOT, "content", "model_answers")]
_MA_FILES: Dict[str, Optional[Dict]] = {}
_MA_LOCK = threading.Lock()


def _ma_pack(cls: int, subject: str, chnum) -> Optional[Dict]:
    """Lazy-load a generated chapter pack, if it exists."""
    chkey = (f"{int(chnum):02d}" if str(chnum).isdigit()
             else re.sub(r"[^a-z0-9]+", "_", str(chnum).lower())[:40])
    fname = f"c{cls}_{(subject or '').lower()}_ch{chkey}.json"
    cached = _MA_FILES.get(fname)
    if cached is not None:
        return cached or None
    with _MA_LOCK:
        if fname not in _MA_FILES:
            _MA_FILES[fname] = None
            for d in _MA_DIRS:
                try:
                    with open(os.path.join(d, fname),
                              encoding="utf-8") as fh:
                        _MA_FILES[fname] = json.load(fh)
                    break
                except OSError:
                    continue
    return _MA_FILES[fname]


def _chapter_pack_match(question: str, hit_nodes: List[str],
                        index) -> Optional[Dict]:
    """Match a student question to a generated chapter-pack answer.

    The generated questions are canonical phrasings — match by content-term
    overlap; require >=0.35 to count (below that the node's own diagnostic
    answers are the safer authored source)."""
    q_terms = _mp_terms(question)
    best = None
    seen_ch = set()
    for nid in hit_nodes:
        node = index.nodes.get(nid)
        if not node:
            continue
        chkey = (node["class"], (node.get("subject") or "").lower(),
                 node.get("chapter"))
        if chkey in seen_ch:
            continue
        seen_ch.add(chkey)
        pack = _ma_pack(*chkey)
        if not pack:
            continue
        for gq in pack.get("questions", []):
            g_terms = _mp_terms(gq.get("question", ""))
            if not g_terms:
                continue
            overlap = len(q_terms & g_terms) / max(1, len(q_terms))
            jacc = len(q_terms & g_terms) / max(1, len(q_terms | g_terms))
            score = 0.6 * overlap + 0.4 * jacc
            if best is None or score > best[0]:
                best = (score, pack, gq)
    if best is None or best[0] < 0.35:
        return None
    score, pack, gq = best
    # collect the nodes this answer draws on -> attach their sims
    src_nodes = {n for mp_ in gq.get("marking_points", [])
                 for n in mp_.get("node_ids", [])}
    sims: List[Dict] = []
    for n in src_nodes:
        sims.extend(sims_for_node(n))
    return {
        "tier": "MODEL_ANSWER",
        "question": gq.get("question"),
        "answer": gq.get("answer"),
        "marks": gq.get("marks"),
        "marking_points": gq.get("marking_points", []),
        "chapter": pack.get("chapter"),
        "source": "chapter_pack",
        "match_score": round(score, 3),
        "sims": sims[:3],
    }


def model_answer(question: str,
                 cls: Optional[int] = None,
                 subject: Optional[str] = None) -> Optional[Dict]:
    """Retrieve the authored model answer for a fact-recall question.

    Routes question -> node via the lexical index, then picks the node's
    diagnostic item closest to the asked question.  Returns a payload the
    pipeline can present as the ``MODEL ANSWER`` tier: authored points,
    the minimum a student should hit, class-band expected format, and the
    misconception signal to check against.

    Honest abstention: returns None when no node matches or no item in the
    node resembles the question -- the caller falls back to GUIDED.
    """
    ql = (question or "").strip()
    if not ql:
        return None
    try:
        index = load_index()
    except Exception:
        return None
    hits = index.search(ql, limit=10, cls=cls, subject=subject)
    # hybrid recall: semantic node hits merged with lexical hits
    hit_ids = {h["node_id"] for h in hits}
    for nid in _semantic_hits(index, ql, 10):
        if nid not in hit_ids:
            hits.append({"node_id": nid, "score": 0.0})
            hit_ids.add(nid)
    if not hits:
        return None

    # generated chapter packs win over node diagnostics for long answers —
    # they carry board-style answers + node-mapped marking points
    pack_hit = _chapter_pack_match(ql, [h["node_id"] for h in hits], index)
    if pack_hit is not None:
        return pack_hit

    q_terms = _mp_terms(ql)
    ranked: List[Tuple[float, str, Dict, Dict]] = []
    for hit in hits:
        nid = hit["node_id"]
        subj_file = _mp_index().get(nid)
        if not subj_file:
            continue
        entry = _mp_file(subj_file).get(nid)
        if not entry:
            continue
        for item in entry.get("items", []):
            it_terms = _mp_terms(item.get("q", ""))
            if not it_terms:
                continue
            overlap = len(q_terms & it_terms) / max(1, len(q_terms | it_terms))
            # prefer coverage of the *question's* content words
            recall = len(q_terms & it_terms) / max(1, len(q_terms))
            score = 0.6 * recall + 0.4 * overlap
            ranked.append((score, nid, entry, item))
    if not ranked:
        return None
    ranked.sort(key=lambda r: -r[0])

    score, nid, entry, item = ranked[0]
    # below ~0.45 the match is noise (real matches sit >=0.5; junk like
    # "Riemann hypothesis" matching a civics node scored 0.25-0.35) --
    # honest abstention beats a misleading authored answer
    if score < 0.45:
        return None

    points = list(item.get("points", []))
    min_points = item.get("min_points", 1)
    # thin primary answer: pull supplementary points from the best item on
    # a *different* node (multi-node synthesis, NONSTEM-3 lite)
    for r_score, r_nid, r_entry, r_item in ranked[1:]:
        if len(points) >= min(6, max(3, min_points + 1)):
            break
        if r_nid == nid or r_score < 0.2:
            continue
        for p in r_item.get("points", []):
            if len(points) >= 6:
                break
            if p not in points:
                points.append(p)

    return {
        "tier": "MODEL_ANSWER",
        "node_id": nid,                 # internal only — never surface
        "question": item.get("q"),
        "points": points,
        "min_points": min_points,
        "expected_format": entry.get("expected_format"),
        "misconception": item.get("misconception"),
        "match_score": round(score, 3),
        # 'see it happen' — interactive sims covering this node
        "sims": sims_for_node(nid)[:3],
    }


# --------------------------------------------------------------------------
# Rubric grading (NONSTEM-2b): score a student's written answer against the
# authored marking points — semantic coverage, misconception signals, and
# class-band format.  Never generates the answer; only evaluates.
# --------------------------------------------------------------------------

#: embedding similarity floor for "student covered this point"
_POINT_HIT = 0.45
#: below this many matched terms we don't even try embeddings
_TERM_HIT = 0.34


def _grade_model():
    """Reuse the node-embedding MiniLM instance (already warm if loaded)."""
    try:
        packed = _node_embeddings(load_index())
        return packed[2] if packed else None
    except Exception:
        return None


def _point_covered(point: str, attempt_terms: set,
                   attempt_sents, model) -> Tuple[bool, float]:
    """A marking point counts as hit when (a) enough of its content terms
    appear in the attempt OR (b) it embeds close to some attempt sentence."""
    p_terms = _mp_terms(point)
    term_overlap = (len(p_terms & attempt_terms) / max(1, len(p_terms))
                    if p_terms else 0.0)
    if term_overlap >= _TERM_HIT:
        return True, term_overlap
    if model is not None and attempt_sents:
        try:
            pe = model.encode([point.lower()], normalize_embeddings=True)[0]
            se = model.encode(attempt_sents, normalize_embeddings=True)
            import numpy as np
            sim = float(np.max(se @ pe))
            if sim >= _POINT_HIT:
                return True, sim
            return False, max(sim, term_overlap)
        except Exception:
            pass
    return False, term_overlap


def grade_answer(question: str, attempt: str,
                 cls: Optional[int] = None,
                 subject: Optional[str] = None) -> Optional[Dict]:
    """Score a student answer against the routed marking points.

    Returns a RUBRIC_FEEDBACK payload — hits, misses, misconception flags,
    format adherence, and an estimated marks fraction.  Honest abstention:
    None when no rubric (marking points) exists for the question.
    """
    attempt = (attempt or "").strip()
    if len(attempt) < 10:
        return None
    # writing tasks (letter/report/notice/essay) can grade on format even
    # when no marking-point rubric exists — don't bail early for them
    task_kind = _detect_task_kind(question or "")
    ma = model_answer(question, cls=cls, subject=subject)
    if ma is None and task_kind is None:
        return None

    # collect the rubric: chapter-pack marking_points are richer
    # (per-point node_ids + no_credit_if) than node diag points
    rubric_pts: List[Dict] = []
    if ma and ma.get("marking_points"):
        rubric_pts = [{"point": mp.get("point", ""),
                       "no_credit_if": mp.get("no_credit_if")}
                      for mp in ma["marking_points"] if mp.get("point")]
    elif ma:
        rubric_pts = [{"point": p, "no_credit_if": None}
                      for p in ma.get("points", [])]
    # defensive: single-word/short fragments aren't checkable points
    rubric_pts = [rp for rp in rubric_pts
                  if len(rp["point"].split()) >= 4]
    if not rubric_pts and task_kind is None:
        return None

    attempt_terms = _mp_terms(attempt)
    attempt_sents = [s.strip() for s in
                     re.split(r"(?<=[.!?])\s+|\n+", attempt)
                     if len(s.strip()) > 8]
    model = _grade_model()

    hits, misses = [], []
    for rp in rubric_pts:
        covered, sc = _point_covered(rp["point"], attempt_terms,
                                     attempt_sents, model)
        (hits if covered else misses).append(
            {"point": rp["point"], "score": round(sc, 3),
             "no_credit_if": rp.get("no_credit_if")})

    # misconception detection: wrong_signals phrasing in the attempt
    miscon = (ma or {}).get("misconception") or ""
    miscon_flags = []
    if miscon:
        m_terms = _mp_terms(miscon)
        # only flag when several misconception-specific terms appear
        m_only = {t for t in m_terms if len(t) > 4}
        if m_only and len(m_only & attempt_terms) / len(m_only) > 0.4:
            miscon_flags.append(miscon[:300])

    min_pts = ((ma or {}).get("min_points")
               or max(1, len(rubric_pts)))
    est = min(1.0, len(hits) / max(1, min_pts))

    fmt = (ma or {}).get("expected_format") or {}
    fmt_notes = []
    if fmt.get("band") == "junior" and len(attempt_sents) > 8:
        fmt_notes.append("answer is longer than needed for this level")
    if fmt.get("band") in ("middle", "senior") and len(attempt_sents) < 2:
        fmt_notes.append("expected point-wise structure — one sentence "
                         "per marking point")
    # writing-task format checks (letter/report/notice/essay) — CBSE
    # deducts format marks, so students need this feedback every class
    task_fmt, task_notes, fmt_passed, fmt_total =         _writing_format_check(question, attempt)
    fmt_notes.extend(task_notes)
    # writing tasks blend content + format (CBSE: format ~40%)
    if fmt_total and task_fmt:
        content_frac = (len(hits) / max(1, min_pts)) if rubric_pts else 0.0
        est = round(min(1.0, 0.6 * content_frac
                        + 0.4 * fmt_passed / fmt_total), 2)
    elif not rubric_pts and fmt_total:
        est = round(fmt_passed / fmt_total, 2)

    return {
        "tier": "RUBRIC_FEEDBACK",
        "matched_question": (ma or {}).get("question"),
        "expected_format": fmt,
        "points_hit": len(hits),
        "points_total": len(rubric_pts),
        "estimated_fraction": round(est, 2),
        "marks_estimate": (
            round(est * int((ma or {}).get("marks") or 0))
            if (ma or {}).get("marks") else None),
        "hits": hits,
        "misses": misses,
        "misconception_flags": miscon_flags,
        "task_format": task_fmt,
        "format_notes": fmt_notes,
        "model_answer": (ma or {}).get("answer") or " ".join(
            rp["point"] for rp in rubric_pts) or None,
    }


# --------------------------------------------------------------------------
# Writing-task format rubrics (NONSTEM-5): deterministic structure checks
# for letter / report / notice / essay.  CBSE carries explicit format
# marks — a correct letter missing the date line loses the mark.
# --------------------------------------------------------------------------

_TASK_KINDS = {
    "letter": ("letter", "पत्र"),
    "report": ("report", "रिपोर्ट", "प्रतिवेदन"),
    "notice": ("notice", "सूचना"),
    "essay": ("essay", "निबंध", "अनुच्छेद"),
    "speech": ("speech", "भाषण"),
    "article": ("article", "लेख"),
}


def _detect_task_kind(question: str) -> Optional[str]:
    ql = question.lower()
    for kind, keys in _TASK_KINDS.items():
        if any(k in ql for k in keys):
            return kind
    return None


def _writing_format_check(
        question: str,
        attempt: str) -> Tuple[Optional[str], List[str], int, int]:
    """Return (task_kind, notes, passed, total).  Checks the structural
    elements CBSE marking schemes credit.  Deterministic — flags what's
    missing, never rewrites."""
    kind = _detect_task_kind(question)
    if kind is None:
        return None, [], 0, 0
    a = attempt
    al = a.lower()
    notes: List[str] = []

    if kind == "letter":
        checks = [
            ("sender address block",
             re.search(r"\n\s*\S+.*\n\s*\S+.*\n.*\d{6}", a) is not None
             or re.search(r"^\s*\S.*\n\s*\S+", a[:200]) is not None),
            ("date line", re.search(
                r"\b\d{1,2}[-/ ](jan|feb|mar|apr|may|jun|jul|aug|sep|oct|"
                r"nov|dec|\d{1,2})\w*[-/ ,]*\d{0,4}|\d{1,2}[./-]\d{1,2}[./-]"
                r"\d{2,4}\b", al) is not None),
            ("salutation",
             any(w in al for w in ("dear ", "respected", "सम्मानित",
                                   "प्रिय", "माननीय"))),
            ("subject line", "subject" in al or "विषय" in al
             or re.search(r"sub\s*:", al) is not None),
            ("complimentary close",
             any(w in al for w in ("yours", "regards", "thank",
                                   "भवदीय", "सादर", "धन्यवाद"))),
        ]
    elif kind == "notice":
        checks = [
            ("notice heading", "notice" in al or "सूचना" in al),
            ("issuing body/date", re.search(r"\d", al) is not None),
            ("body content", len(a) > 80),
            ("signature/authority line",
             any(w in al for w in ("principal", "secretary", "president",
                                   "प्रधानाचार्य", "सचिव", "अध्यक्ष"))),
        ]
    elif kind == "report":
        checks = [
            ("headline/title",
             len(a.split("\n")[0].strip()) < 100 and "\n" in a),
            ("byline/dateline",
             re.search(r"by\s+\w+|reporter|\d{1,2}\s+\w+\s+\d{4}", al)
             is not None),
            ("body paragraphs", a.count("\n") >= 2),
        ]
    elif kind in ("essay", "article", "speech"):
        paras = [p for p in a.split("\n") if p.strip()]
        checks = [
            ("introduction", len(paras) >= 1 and len(paras[0]) > 60),
            ("body development", len(paras) >= 2),
            ("conclusion", len(paras) >= 2
             and len(paras[-1]) > 40),
        ]
        if kind == "speech":
            checks.append((
                "address to audience",
                any(w in al for w in ("dear", "respected", "friends",
                                      "audience", "प्रिय", "सम्मानित"))))
    else:
        return kind, [], 0, 0

    missing = [name for name, ok in checks if not ok]
    if missing:
        notes.append(
            f"{kind} format — missing: {', '.join(missing)}")
    else:
        notes.append(f"{kind} format — all required elements present")
    passed = len(checks) - len(missing)
    return kind, notes, passed, len(checks)
