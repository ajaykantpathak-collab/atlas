# -*- coding: utf-8 -*-
"""compq_bank.py — the CBQ (competency-based question) bank: parse, audit, serve.

SOURCES (all authored content that already exists — this module only ETLs it):
  1. ``_comp`` companion docs  (deploy/content/enhanced_nodes_md/*_comp.md):
     PARENT_NODE_ID / EXAM_TARGETS / NODES_INVOLVED + SEED_QUESTION_N blocks,
     each seed a rich case-study with SUB_PART_A..Z — every sub-part authored
     with a 5-step Guideline (Identify+Recall / Setup / Execute / Verify+Answer
     / Generalize), a Shortcut, named misconception Traps and Variants V1-V5.
  2. Node-embedded competency questions (``## COMPETENCY_QUESTION_N``) carried
     by main nodes on BOTH boards (CBSE enhanced_nodes_md, CISCE cisce_nodes_v2).

OUTPUTS (bind-mounted content dir, instantly visible in containers):
  - compq_bank.jsonl      one line per authored sub-part (the graded unit)
  - compq_embedded.jsonl  one line per node-embedded CQ (both boards)

DESIGN RULES
  - compq ids are opaque and stable (sha1 of file+seed+subpart) — the numeric
    node ids never appear in any *display* string: everything served goes
    through :func:`scrub_node_ids` at parse time (owner rule 2026-09-29:
    ids may travel as opaque fetch keys, never as visible text).
  - Grading is deterministic: numeric sub-parts are graded by matching the
    student's numbers against the *authored* Step-4 (Verify+Answer) numbers
    ("answer gates"); the solver pipeline is only ever reached through
    services/solve_isolation (never inline on the event loop).
  - Sub-parts are classified numeric-computable vs theory-guided by a
    deterministic rule (answer gates present + computation verb in the ask);
    theory sub-parts are served with the authored Guideline as the method.

CLI:
    python -m backend.services.compq_bank build    # (re)build both JSONL banks
    python -m backend.services.compq_bank stats    # census + quality audit
    python -m backend.services.compq_bank spotcheck [--n 48]  # arithmetic re-derivation
"""
from __future__ import annotations

import argparse
import hashlib
import json
import logging
import os
import re
import sys
import threading
from collections import Counter, defaultdict, OrderedDict
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Tuple

logger = logging.getLogger(__name__)

# --------------------------------------------------------------------------- #
# Locations
# --------------------------------------------------------------------------- #

_THIS_FILE = Path(__file__).resolve()


def _discover_repo_root() -> Path:
    """Walk up from this file until a recognizable repo root is found
    (deploy tree: .../deploy/backend/services -> D:\\platform; root tree:
    backend/services -> D:\\platform). The deploy/content marker wins over
    a bare content/ marker (deploy/ itself contains content/)."""
    ancestors = [_THIS_FILE.parent, *_THIS_FILE.parents]
    for anc in ancestors:
        if (anc / "deploy" / "content" / "enhanced_nodes_md").is_dir():
            return anc
    for anc in ancestors:
        if (anc / "content" / "enhanced_nodes_md").is_dir():
            return anc
    # fallback: historical behaviour (deploy layout)
    return _THIS_FILE.parents[3]


_REPO_ROOT = _discover_repo_root()

_CANDIDATE_CONTENT_DIRS = [
    Path(os.environ.get("COMPQ_CONTENT_DIR", "")) if os.environ.get("COMPQ_CONTENT_DIR") else None,
    Path("/app/content"),                       # bind mount inside containers
    _REPO_ROOT / "deploy" / "content",          # repo layout
    _REPO_ROOT / "content",                     # legacy layout fallback
]

CORPUS_DIRS = {
    "cbse": "enhanced_nodes_md",
    "cisce": "cisce_nodes_v2",
}

BANK_FILENAME = "compq_bank.jsonl"
EMBEDDED_FILENAME = "compq_embedded.jsonl"
BUNDLE_FILENAME = "compq_nodes.jsonl"
STATS_FILENAME = "compq_bank_stats.json"

RESUME_STATE_PATH = _REPO_ROOT / "_cisce_build" / "compq_backup" / "RESUME_STATE.json"


def content_dir() -> Path:
    """First existing candidate content dir."""
    for cand in _CANDIDATE_CONTENT_DIRS:
        if cand and cand.is_dir():
            return cand
    # last resort: relative to cwd (dev)
    return Path("deploy/content")


def bank_path() -> Path:
    return content_dir() / BANK_FILENAME


def embedded_path() -> Path:
    return content_dir() / EMBEDDED_FILENAME


def bundle_path() -> Path:
    return content_dir() / BUNDLE_FILENAME


def stats_path() -> Path:
    return content_dir() / STATS_FILENAME


# --------------------------------------------------------------------------- #
# Node-id hygiene — ids never appear in display strings
# --------------------------------------------------------------------------- #

# c12_acc_cbse_01_001 / c10_bio_icse_01_001 / c6_economics_ch07_001 /
# c12_hin_v_cbse_03_015 / c12_cs_isc_03_003
NODE_ID_RE = re.compile(
    r"\bc(\d{1,2})_([A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+){0,6}?)"
    r"_(cbse|icse|isc)?_?(\d{1,3})_(\d{1,3})\b"
)

# Strict id shape used for scrubbing (allows the junior c6_economics_ch07_001
# form and the senior c12_acc_cbse_01_001 form).
_SCRUB_RE = re.compile(
    r"\bc\d{1,2}(?:_[A-Za-z0-9]+){1,8}_\d{1,3}(?:_\d{1,3})+\b"
)

SUBJECT_NAMES = {
    "acc": "Accountancy", "eco": "Economics", "bs": "Business Studies",
    "bio": "Biology", "chem": "Chemistry", "phy": "Physics", "math": "Mathematics",
    "geo": "Geography", "hist": "History", "soc": "Social Science",
    "ps": "Political Science", "polsci": "Political Science", "cs": "Computer Science",
    "compapp": "Computer Applications", "ip": "Informatics Practices",
    "psy": "Psychology", "biotech": "Biotechnology",
    # ca = Computerised Accounting (c12 corpus audited — was mislabelled
    # "Commercial Art")
    "ca": "Computerised Accounting",
    "hs": "Home Science", "hin": "Hindi", "hin_v": "Hindi (Vitan)",
    "eng": "English", "engl": "English", "sst": "Social Science",
    "civ": "Civics", "economics": "Economics", "biology": "Biology",
    "science": "Science", "maths": "Mathematics", "history": "History",
    "geography": "Geography", "civics": "Civics", "stats": "Statistics",
    "comp": "English Composition",
}

# Deterministic numeric-vs-theory classification needs a computation verb in
# the ask and numeric answer gates in the authored Verify+Answer step.
_COMPUTE_VERB_RE = re.compile(
    r"\b(calculat\w*|comput\w*|find|determin\w*|evaluat\w*|value|prepare|"
    r"how\s+(?:much|many)|derive|solve|convert|reconcile|allocate|apportion)\b",
    re.I,
)

# subject token -> nearest solver family lane (best-effort mapping, used only
# for reporting which sub-parts plausibly map onto a solver family).
SUBJECT_FAMILY = {
    "math": "maths_families", "phy": "physics_families", "chem": "chemistry_families",
    "bio": "biology_families", "acc": "commerce_families", "eco": "economics_families",
    "bs": "commerce_families", "ip": "compapp_families", "cs": "compapp_families",
    "compapp": "compapp_families", "stats": "maths_families",
    "biotech": "biology_families", "psy": "socsci_families",
    "geo": "socsci_families", "hist": "socsci_families", "soc": "socsci_families",
    "ps": "socsci_families", "hs": "maths_families", "hin": "hindi_families",
    "hin_v": "hindi_families", "eng": "english_families", "engl": "english_families",
}


def parse_node_id(name: str) -> Dict[str, Any]:
    """Extract grade/subject/board from a node id (best effort, never throws)."""
    m = re.match(r"c(\d{1,2})_([A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)*)_(cbse|icse|isc)_(\d{1,3})_(\d{1,3})$", name or "")
    if m:
        return {"grade": int(m.group(1)), "subject": m.group(2), "board": m.group(3),
                "chapter": int(m.group(4)), "node_num": int(m.group(5))}
    # junior shape: c6_economics_ch07_001 (chapter encoded as chNN, no board)
    m = re.match(r"c(\d{1,2})_([A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)*?)_ch(\d{1,3})_(\d{1,3})$", name or "")
    if m:
        return {"grade": int(m.group(1)), "subject": m.group(2), "board": "cbse",
                "chapter": int(m.group(3)), "node_num": int(m.group(4))}
    m = re.match(r"c(\d{1,2})_([A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)*)_(\d{1,3})_(\d{1,3})$", name or "")
    if m:
        return {"grade": int(m.group(1)), "subject": m.group(2), "board": "cbse",
                "chapter": int(m.group(3)), "node_num": int(m.group(4))}
    return {"grade": None, "subject": None, "board": None, "chapter": None, "node_num": None}


def subject_label(subject: Optional[str]) -> str:
    if not subject:
        return "Unknown"
    return SUBJECT_NAMES.get(subject, subject.upper())


def scrub_node_ids(text: str) -> str:
    """Remove internal node ids from a display string (owner rule 2026-09-29).

    Ids ARE allowed as opaque fetch keys in payloads/URLs — this is only about
    *visible text*. Leftover punctuation from the removal is cleaned up.
    """
    if not text:
        return text
    out = _SCRUB_RE.sub("", text)
    # cleanup artifacts: "(  )", " ,", empty parens, dangling 'in|of|see' refs
    out = re.sub(r"\(\s*(?:,\s*)*\)", "", out)
    out = re.sub(r"\s+,", ",", out)
    out = re.sub(r"\(\s*,\s*", "(", out)
    out = re.sub(r"\s{2,}", " ", out)
    out = re.sub(r"\s+([.;:])", r"\1", out)
    return out.strip()


def contains_node_id(text: str) -> bool:
    return bool(_SCRUB_RE.search(text or ""))


def compq_id_for(*parts: str) -> str:
    digest = hashlib.sha1("\x00".join(parts).encode("utf-8", "replace")).hexdigest()
    return f"cq_{digest[:16]}"


# --------------------------------------------------------------------------- #
# _comp companion parser
# --------------------------------------------------------------------------- #

_SEED_RE = re.compile(r"^##\s+SEED_QUESTION_(\d+)\s*$", re.M)
_SUBPART_RE = re.compile(r"^###\s+SUB_PART_([A-Z]{1,2})\s*$", re.M)
_STEP_RE = re.compile(r"^Step\s+(\d)\s*\(([^)]*)\)\s*:\s*(.*)$")
_FIELD_LINE_RE = re.compile(r"^\*\*([A-Za-z ]+):\*\*\s*(.*)$")


def _split_sections(text: str, header_re: re.Pattern) -> List[Tuple[str, str]]:
    """Split text into (key, body) at each top-level header match."""
    matches = list(header_re.finditer(text))
    out = []
    for i, m in enumerate(matches):
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        out.append((m.group(1), text[m.end():end]))
    return out


def _top_section(text: str, name: str) -> Optional[str]:
    m = re.search(rf"^##\s+{re.escape(name)}\s*$", text, re.M)
    if not m:
        return None
    nxt = re.search(r"^##\s+", text[m.end():], re.M)
    body = text[m.end(): m.end() + nxt.start()] if nxt else text[m.end():]
    return body.strip()


def _parse_nodes_involved(body: str) -> Dict[str, List[str]]:
    out: Dict[str, List[str]] = {}
    for m in re.finditer(r"^###\s+([A-Z_]+)_NODES:\s*(.*)$", body, re.M):
        kind = m.group(1).lower()
        ids = [t.strip() for t in re.split(r"[,\s]+", m.group(2).strip()) if t.strip()]
        out[kind] = ids
    return out


def _parse_concepts_combined(raw: str) -> Dict[str, List[str]]:
    """'Accountancy: id, id | Economics: id, id | Math: PV of annuity' -> map."""
    out: Dict[str, List[str]] = {}
    for chunk in (raw or "").split("|"):
        chunk = chunk.strip()
        if not chunk:
            continue
        if ":" in chunk:
            label, _, rest = chunk.partition(":")
            ids = [t.strip() for t in re.split(r"[,\s]+", rest.strip()) if t.strip()]
            out.setdefault(label.strip(), []).extend(ids)
        else:
            out.setdefault("General", []).append(chunk)
    return out


def _parse_traps(raw: str) -> List[str]:
    raw = raw or ""
    parts = re.split(r"\(\d+\)", raw)
    traps = [p.strip(" \t\n;") for p in parts if p.strip(" \t\n;")]
    return traps or ([raw.strip()] if raw.strip() else [])


def _parse_variants(raw: str) -> List[Dict[str, str]]:
    raw = raw or ""
    out = []
    for m in re.finditer(r"\bV(\d)\s*:\s*", raw):
        start = m.end()
        nxt = re.search(r"\bV\d\s*:\s*", raw[start:])
        end = start + nxt.start() if nxt else len(raw)
        out.append({"variant": f"V{m.group(1)}", "text": raw[start:end].strip()})
    return out


def _parse_guideline(body: str) -> List[Dict[str, str]]:
    """Parse 'Step N (Label): text' lines; multi-line steps accumulate."""
    steps: List[Dict[str, str]] = []
    cur: Optional[Dict[str, str]] = None
    for line in body.splitlines():
        m = _STEP_RE.match(line.strip())
        if m:
            if cur:
                steps.append(cur)
            cur = {"step": m.group(1), "label": m.group(2).strip(), "text": m.group(3).strip()}
        elif cur and line.strip() and not line.strip().startswith("**"):
            cur["text"] += " " + line.strip()
    if cur:
        steps.append(cur)
    return steps


def _parse_sub_part(body: str) -> Dict[str, Any]:
    """Parse one '### SUB_PART_X' block body into fields."""
    sp: Dict[str, Any] = {"q": None, "nodes": [], "level": None, "time_sec": None,
                          "guideline_steps": [], "shortcut": None, "traps": [],
                          "variants": [], "parse_warnings": []}
    # field lines: **Q:**, **Nodes:**, **Level:**, **Time:**, **Shortcut:**,
    # **Traps:**, **Variants:**, **Guideline:**
    fields: Dict[str, str] = {}
    order: List[str] = []
    lines = body.splitlines()
    i = 0
    while i < len(lines):
        m = _FIELD_LINE_RE.match(lines[i].strip())
        if m:
            name = m.group(1).strip().lower()
            fields[name] = m.group(2)
            order.append(name)
            # accumulate until the next field line
            j = i + 1
            buf = []
            while j < len(lines) and not _FIELD_LINE_RE.match(lines[j].strip()):
                buf.append(lines[j])
                j += 1
            if buf:
                fields[name] = (fields[name] + "\n" + "\n".join(buf)).strip()
            i = j
        else:
            i += 1

    sp["q"] = (fields.get("q") or "").strip() or None
    node_line = fields.get("nodes") or ""
    ids = [t.strip() for t in re.split(r"[,|]", node_line) if re.match(r"^c\d", t.strip())]
    sp["nodes"] = ids
    sp["level"] = (fields.get("level") or "").strip() or None
    tm = re.search(r"(\d+)\s*sec", fields.get("time", "") or "", re.I)
    if not tm:
        tm = re.search(r"(\d+)\s*sec", node_line, re.I)
    sp["time_sec"] = int(tm.group(1)) if tm else None
    sp["guideline_steps"] = _parse_guideline(fields.get("guideline", "") or "")
    sp["shortcut"] = (fields.get("shortcut") or "").strip() or None
    sp["traps"] = _parse_traps(fields.get("traps", "") or "")
    sp["variants"] = _parse_variants(fields.get("variants", "") or "")
    if not sp["q"]:
        sp["parse_warnings"].append("missing_q")
    if not sp["guideline_steps"]:
        sp["parse_warnings"].append("missing_guideline")
    return sp


def parse_comp_file(path: Path) -> Optional[Dict[str, Any]]:
    """Parse one *_comp.md file. Returns a file record or None if hopeless."""
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
    except OSError as exc:
        logger.warning("compq_bank: unreadable %s: %s", path, exc)
        return None

    parent = _top_section(text, "PARENT_NODE_ID")
    parent = re.sub(r"\s+", "", parent or "") or path.name.replace("_comp.md", "")
    meta = parse_node_id(parent)
    exam_targets_raw = _top_section(text, "EXAM_TARGETS") or ""
    stream = (_top_section(text, "STREAM") or "").strip().lower() or None
    nodes_involved_body = _top_section(text, "NODES_INVOLVED") or ""
    nodes_involved = _parse_nodes_involved(nodes_involved_body)

    seeds = []
    warnings: List[str] = []
    for seed_no, seed_body in _split_sections(text, _SEED_RE):
        tm = re.search(r"^###\s+TITLE:\s*(.*)$", seed_body, re.M)
        title = tm.group(1).strip() if tm else None
        if not tm:
            warnings.append(f"seed{seed_no}:missing_title")
        sm = re.search(r"^###\s+SCENARIO:\s*(.*?)(?=^###\s|\Z)", seed_body, re.M | re.S)
        scenario = sm.group(1).strip() if sm else None
        cm = re.search(r"^###\s+CONCEPTS_COMBINED:\s*(.*)$", seed_body, re.M)
        concepts_raw = cm.group(1).strip() if cm else ""
        dm = re.search(r"^###\s+DIFFICULTY_TIER:\s*(.*)$", seed_body, re.M)
        tier = dm.group(1).strip() if dm else None
        em = re.search(r"^###\s+EXAM_LEVELS:\s*(.*)$", seed_body, re.M)
        exam_levels = em.group(1).strip() if em else None

        subparts = []
        for sp_key, sp_body in _split_sections(seed_body, _SUBPART_RE):
            sp = _parse_sub_part(sp_body)
            sp["sub_part_id"] = sp_key
            subparts.append(sp)
        if not subparts:
            warnings.append(f"seed{seed_no}:no_subparts")
        seeds.append({"seed_no": int(seed_no), "title": title, "scenario": scenario,
                      "concepts_combined_raw": concepts_raw,
                      "difficulty_tier": tier, "exam_levels": exam_levels,
                      "sub_parts": subparts})
    if not seeds:
        return None
    return {"file": path.name, "path": str(path), "parent_node": parent,
            "grade": meta["grade"], "subject": meta["subject"], "board": meta["board"],
            "stream": stream, "exam_targets_raw": exam_targets_raw.strip(),
            "nodes_involved": nodes_involved, "seeds": seeds, "warnings": warnings}


# --------------------------------------------------------------------------- #
# Embedded CQ parser (both boards)
# --------------------------------------------------------------------------- #

_CQ_HEADER_RE = re.compile(r"^##\s+COMPETENCY_QUESTION_(\d+)\s*$", re.M)
# Field keys arrive bare ("QUESTION:") on CBSE and bold ("**ANSWER:**") on
# parts of the CISCE corpus — accept both, colon may be wrapped by the stars.
_CQ_FIELD_RE = re.compile(r"^\*{0,2}\s*([A-Z][A-Z_]+)\s*\*{0,2}:\s*\*{0,2}\s*(.*)$")


def parse_embedded_cqs(text: str) -> List[Dict[str, Any]]:
    """Parse '## COMPETENCY_QUESTION_N' sections. Works on both boards:
    CBSE carries QUESTION/COMPETENCY/STEPS/ANSWER/DIFFICULTY; CISCE carries
    QUESTION/COMPETENCY/ANSWER/MARKING_POINTS/DIFFICULTY."""
    out: List[Dict[str, Any]] = []
    for n, body in _split_sections(text, _CQ_HEADER_RE):
        fields: Dict[str, str] = {}
        cur: Optional[str] = None
        for line in body.splitlines():
            fm = _CQ_FIELD_RE.match(line)
            if fm and fm.group(1) in {"QUESTION", "COMPETENCY", "STEPS", "ANSWER",
                                      "MARKING_POINTS", "DIFFICULTY", "TOPIC",
                                      "SKILL", "BLOOM"}:
                cur = fm.group(1)
                fields[cur] = fm.group(2)
            elif cur is not None:
                fields[cur] = (fields.get(cur, "") + "\n" + line).strip()
        if not fields.get("QUESTION"):
            continue
        steps = [re.sub(r"^-\s*", "", s).strip()
                 for s in (fields.get("STEPS", "") or "").splitlines() if s.strip()]
        marks = [re.sub(r"^-\s*", "", s).strip()
                 for s in (fields.get("MARKING_POINTS", "") or "").splitlines() if s.strip()]
        if marks and len(marks) == 1 and " - " in marks[0]:
            marks = [p.strip() for p in marks[0].split(" - ") if p.strip()]
        out.append({"n": int(n),
                    "question": fields["QUESTION"].strip(),
                    "competency": (fields.get("COMPETENCY", "") or "").strip() or None,
                    "steps": steps,
                    "answer": (fields.get("ANSWER", "") or "").strip() or None,
                    "marking_points": marks,
                    "difficulty": (fields.get("DIFFICULTY", "") or "").strip() or None})
    return out


# --------------------------------------------------------------------------- #
# Node bundles: worked examples + diagnostics (reuses enhanced_nodes carving)
# --------------------------------------------------------------------------- #

def _en_split_sections(text: str) -> Dict[str, str]:
    """Thin wrapper over services/enhanced_nodes.split_sections (the corpus
    contract lives there — '##' only, header normalisation, repeat rules).
    Falls back to a local minimal carve only if that import is impossible."""
    try:
        from backend.services.enhanced_nodes import split_sections
        return split_sections(text)
    except Exception:                                        # pragma: no cover
        secs: Dict[str, str] = {}
        for m in re.finditer(r"^##(?!#)[ \t]*(.+?)[ \t]*$", text, re.M):
            name = m.group(1).strip().strip("*").strip()
            nxt = re.search(r"^##(?!#)", text[m.end():], re.M)
            body = text[m.end(): m.end() + nxt.start()] if nxt else text[m.end():]
            secs.setdefault(name, body.strip())
        return secs


_WE_FIELD_RE = re.compile(r"^(PROBLEM|STEPS|REASONING|ANSWER|NOTE):\s?(.*)$")


def _parse_worked_example(body: str) -> Dict[str, Any]:
    fields: Dict[str, str] = {}
    cur: Optional[str] = None
    for line in body.splitlines():
        fm = _WE_FIELD_RE.match(line.strip())
        if fm:
            cur = fm.group(1)
            fields[cur] = fm.group(2)
        elif cur is not None:
            fields[cur] = (fields.get(cur, "") + "\n" + line).strip()
    steps = [re.sub(r"^-\s*", "", s).strip()
             for s in (fields.get("STEPS", "") or "").splitlines() if s.strip()]
    return {"problem": (fields.get("PROBLEM", "") or "").strip() or None,
            "steps": steps,
            "reasoning": (fields.get("REASONING", "") or "").strip() or None,
            "answer": (fields.get("ANSWER", "") or "").strip() or None}


def parse_node_bundle(text: str) -> Dict[str, Any]:
    """Worked examples (full blocks) + diagnostics (q, a, misconception) for
    one node — carving reused from services/enhanced_nodes.py
    (split_sections / parse_diagnostics / split_misconception)."""
    sections = _en_split_sections(text)
    worked: List[Dict[str, Any]] = []
    n = 1
    while n <= 20:                                # same contract as parse_worked_examples
        body = sections.get("WORKED_EXAMPLE_%d" % n)
        if not body:
            break
        we = _parse_worked_example(body)
        if we["problem"] or we["answer"] or we["steps"]:
            we["index"] = n
            worked.append(we)
        n += 1
    diagnostics: List[Dict[str, Any]] = []
    try:
        from backend.services.enhanced_nodes import parse_diagnostics
        diagnostics = parse_diagnostics(sections)
    except Exception:                                        # pragma: no cover
        pass
    return {"worked_examples": worked, "diagnostics": diagnostics}


def bundle_record(node_id: str, meta: Dict[str, Any], bundle: Dict[str, Any]) -> Dict[str, Any]:
    subject = meta.get("subject")
    return {
        "node": node_id,
        "board": meta.get("board") or "cbse",
        "grade": meta.get("grade"),
        "subject": subject,
        "subject_label": subject_label(subject),
        "worked_examples": [
            {**{k: (scrub_node_ids(v) if isinstance(v, str) else
                    [scrub_node_ids(s) for s in v] if isinstance(v, list) else v)
                for k, v in we.items()}}
            for we in bundle.get("worked_examples", [])
        ],
        "diagnostics": [
            {"index": d.get("index"),
             "q": scrub_node_ids(d.get("q") or ""),
             "a": scrub_node_ids(d.get("a") or ""),
             "misconception": scrub_node_ids(d.get("misconception") or "") or None}
            for d in bundle.get("diagnostics", [])
        ],
    }


# --------------------------------------------------------------------------- #
# Numeric gates + classification (deterministic)
# --------------------------------------------------------------------------- #

_NUM_TOKEN_RE = re.compile(
    r"(?<![\w.])(-?\d{1,3}(?:,\d{3})+(?:\.\d+)?|-?\d+(?:\.\d+)?)\s*(%|L\b|Lakh|lakh|Crore|crore|Cr\b)?"
)

_ENUM_RE = re.compile(r"^\d{1}[.)]\s*$")


def extract_numerics(text: str) -> List[Dict[str, Any]]:
    """Extract authored answer numbers ('answer gates') from Step-4 text.

    Only list enumerators of the shape "1)" are skipped; sentence-final
    integers are KEPT (a ratio "6 : 4 : 2 : 3." legitimately ends a
    sentence). Values keep their unit so serving can compare unit-aware
    (37.8 L == 3.78e6 raw)."""
    gates: List[Dict[str, Any]] = []
    for m in _NUM_TOKEN_RE.finditer(text or ""):
        raw, unit = m.group(1), (m.group(2) or "").strip()
        # skip list enumerators like "1)" only (the paren closes the item)
        after = text[m.end(): m.end() + 2]
        if re.match(r"^\s*\)", after or ""):
            continue
        try:
            val = float(raw.replace(",", ""))
        except ValueError:
            continue
        gates.append({"raw": raw, "value": val, "unit": unit or None})
    return gates


def numeric_variants(val: float, unit: Optional[str]) -> List[float]:
    """Plausible absolute interpretations of a gate/student number."""
    out = [val]
    u = (unit or "").lower()
    if u in {"l", "lakh"}:
        out.append(val * 1e5)
    elif u in {"cr", "crore"}:
        out.append(val * 1e7)
    elif u == "%":
        out.append(val / 100.0)
    # bare numbers that could be lakhs/crores in prose
    out.extend([val * 1e5, val * 1e7])
    return out


def _close(a: float, b: float, rel: float = 0.02, abs_tol: float = 0.011) -> bool:
    return abs(a - b) <= max(abs_tol, rel * max(abs(a), abs(b)))


def match_gates(gates: List[Dict[str, Any]], student_text: str) -> Dict[str, Any]:
    """Grade a numeric attempt: every authored gate should be matched by some
    student number (unit-aware, 2% relative tolerance)."""
    student_values: List[float] = []
    for n in extract_numerics(student_text or ""):
        u = (n["unit"] or "").lower()
        student_values.append(n["value"])
        if u in {"l", "lakh"}:
            student_values.append(n["value"] * 1e5)
        elif u in {"cr", "crore"}:
            student_values.append(n["value"] * 1e7)
        elif u == "%":
            student_values.append(n["value"] / 100.0)
    if not gates:
        return {"matched": 0, "total": 0, "ratio": 0.0, "graded": False}
    matched = 0
    details = []
    for g in gates:
        targets = numeric_variants(g["value"], g["unit"])
        ok = any(_close(sv, t) for sv in student_values for t in targets)
        matched += 1 if ok else 0
        details.append({"gate": g["raw"] + (g["unit"] or ""), "matched": ok})
    ratio = matched / max(1, len(gates))
    return {"matched": matched, "total": len(gates), "ratio": round(ratio, 3),
            "graded": True, "details": details}


def classify_sub_part(sp_q: Optional[str], gates: List[Dict[str, Any]]) -> Tuple[str, Optional[str]]:
    """numeric-computable vs theory-guided, deterministic."""
    if gates and sp_q and _COMPUTE_VERB_RE.search(sp_q):
        return "numeric", None
    return "theory", None


# --------------------------------------------------------------------------- #
# Bank record assembly
# --------------------------------------------------------------------------- #

FAMILY_SUBJECT_TO_GUARD = {
    "acc": "commerce", "eco": "economics", "bs": "commerce", "math": "maths",
    "phy": "physics", "chem": "chemistry", "bio": "biology",
}


def file_records_to_lines(rec: Dict[str, Any]) -> Iterable[Dict[str, Any]]:
    board = rec.get("board") or "cbse"
    for seed in rec["seeds"]:
        concepts = _parse_concepts_combined(seed.get("concepts_combined_raw", ""))
        for sp in seed["sub_parts"]:
            # gates come from the authored Verify+Answer step (step 4) — the
            # question itself must NOT leak its answer.
            gates = extract_numerics(_step4_text(sp))
            kind, _ = classify_sub_part(sp["q"], gates)
            subject = rec.get("subject")
            yield {
                "compq_id": compq_id_for(rec["file"], str(seed["seed_no"]), sp["sub_part_id"]),
                "parent_node": rec["parent_node"],
                "board": board,
                "grade": rec.get("grade"),
                "subject": subject,
                "subject_label": subject_label(subject),
                "stream": rec.get("stream"),
                "exam_targets": [t.strip() for t in re.split(r",", rec.get("exam_targets_raw", "")) if t.strip()],
                "seed_no": seed["seed_no"],
                "seed_title": scrub_node_ids(seed.get("title") or ""),
                "scenario": scrub_node_ids(seed.get("scenario") or ""),
                "difficulty_tier": seed.get("difficulty_tier"),
                "exam_levels": seed.get("exam_levels"),
                "concepts_combined": {k: v for k, v in concepts.items()},
                "sub_part_id": sp["sub_part_id"],
                "q": scrub_node_ids(sp.get("q") or ""),
                "nodes": sp.get("nodes") or [],
                "level": sp.get("level"),
                "time_sec": sp.get("time_sec"),
                "guideline_steps": [
                    {"step": s["step"], "label": s["label"], "text": scrub_node_ids(s["text"])}
                    for s in sp.get("guideline_steps", [])
                ],
                "shortcut": scrub_node_ids(sp.get("shortcut") or "") or None,
                "traps": [scrub_node_ids(t) for t in sp.get("traps", [])],
                "variants": [
                    {"variant": v["variant"], "text": scrub_node_ids(v["text"])}
                    for v in sp.get("variants", [])
                ],
                "answer_gates": gates,
                "kind": kind,
                "family_hint": SUBJECT_FAMILY.get(subject or "", None),
                "source_file": rec["file"],
                "parse_warnings": sp.get("parse_warnings", []),
            }


def _step4_text(sp: Dict[str, Any]) -> str:
    for s in sp.get("guideline_steps", []):
        if s.get("step") == "4" or "verify" in (s.get("label") or "").lower():
            return s.get("text", "")
    return ""


def embedded_records(node_id: str, meta: Dict[str, Any], cqs: List[Dict[str, Any]]) -> Iterable[Dict[str, Any]]:
    subject = meta.get("subject")
    for cq in cqs:
        yield {
            "cq_id": compq_id_for(node_id, "cq", str(cq["n"])),
            "node": node_id,
            "board": meta.get("board") or "cbse",
            "grade": meta.get("grade"),
            "subject": subject,
            "subject_label": subject_label(subject),
            "n": cq["n"],
            "question": scrub_node_ids(cq["question"]),
            "competency": cq.get("competency"),
            "steps": [scrub_node_ids(s) for s in cq.get("steps", [])],
            "answer": scrub_node_ids(cq.get("answer") or "") or None,
            "marking_points": [scrub_node_ids(m) for m in cq.get("marking_points", [])],
            "difficulty": cq.get("difficulty"),
        }


# --------------------------------------------------------------------------- #
# Build CLI
# --------------------------------------------------------------------------- #

def _write_resume(state: Dict[str, Any]) -> None:
    try:
        RESUME_STATE_PATH.parent.mkdir(parents=True, exist_ok=True)
        RESUME_STATE_PATH.write_text(json.dumps(state, indent=2, default=str), encoding="utf-8")
    except OSError as exc:
        logger.warning("compq_bank: could not write resume state: %s", exc)


def _iter_md_files(corpus_root: Path, only_comp: bool) -> List[Path]:
    it = corpus_root.glob("*_comp.md") if only_comp else corpus_root.glob("*.md")
    return sorted(p for p in it if p.is_file())


def cmd_build(out_mirror: bool = True) -> Dict[str, Any]:
    root = content_dir()
    bank_f = (root / BANK_FILENAME).open("w", encoding="utf-8")
    emb_f = (root / EMBEDDED_FILENAME).open("w", encoding="utf-8")
    bundle_f = (root / BUNDLE_FILENAME).open("w", encoding="utf-8")
    totals = {"comp_files": 0, "comp_parse_fail": 0, "seeds": 0, "sub_parts": 0,
              "embedded_files": 0, "embedded_cqs": 0, "boards": Counter(),
              "bundle_nodes": 0, "worked_examples": 0, "diagnostics": 0,
              "we_by_board": Counter(), "diag_by_board": Counter()}
    try:
        # -- 1. companions -------------------------------------------------- #
        comp_dir = root / CORPUS_DIRS["cbse"]
        files = _iter_md_files(comp_dir, only_comp=True)
        for i, path in enumerate(files):
            rec = parse_comp_file(path)
            if rec is None:
                totals["comp_parse_fail"] += 1
                continue
            totals["comp_files"] += 1
            for line in file_records_to_lines(rec):
                totals["seeds"] = max(totals["seeds"], line["seed_no"])  # informational
                totals["sub_parts"] += 1
                bank_f.write(json.dumps(line, ensure_ascii=False) + "\n")
            if i % 400 == 399:
                _write_resume({"stage": "build:comp", "done": i + 1, "total": len(files),
                               "sub_parts": totals["sub_parts"]})
        # -- 2. embedded CQs + node bundles, both boards --------------------- #
        for board_key, sub in CORPUS_DIRS.items():
            cdir = root / sub
            for path in _iter_md_files(cdir, only_comp=False):
                try:
                    text = path.read_text(encoding="utf-8", errors="replace")
                except OSError:
                    continue
                node_id = path.stem
                meta = parse_node_id(node_id)
                if board_key == "cisce" and "_icse_" in node_id:
                    meta["board"] = "icse"
                elif board_key == "cisce" and "_isc_" in node_id:
                    meta["board"] = "isc"
                # node bundle (worked examples + diagnostics) — every node
                has_cq = "COMPETENCY_QUESTION_1" in text
                bundle = parse_node_bundle(text)
                if bundle["worked_examples"] or bundle["diagnostics"] or has_cq:
                    rec_b = bundle_record(node_id, meta, bundle)
                    bundle_f.write(json.dumps(rec_b, ensure_ascii=False) + "\n")
                    totals["bundle_nodes"] += 1
                    totals["worked_examples"] += len(rec_b["worked_examples"])
                    totals["diagnostics"] += len(rec_b["diagnostics"])
                    b_board = meta.get("board") or board_key
                    totals["we_by_board"][b_board] += len(rec_b["worked_examples"])
                    totals["diag_by_board"][b_board] += len(rec_b["diagnostics"])
                # embedded competency questions
                if has_cq:
                    cqs = parse_embedded_cqs(text)
                    if not cqs:
                        continue
                    totals["embedded_files"] += 1
                    totals["embedded_cqs"] += len(cqs)
                    totals["boards"][board_key] += len(cqs)
                    for line in embedded_records(node_id, meta, cqs):
                        emb_f.write(json.dumps(line, ensure_ascii=False) + "\n")
            _write_resume({"stage": "build:embedded", "board": board_key,
                           "cqs": totals["embedded_cqs"]})
    finally:
        bank_f.close()
        emb_f.close()
        bundle_f.close()
    if out_mirror:
        for name in (BANK_FILENAME, EMBEDDED_FILENAME, BUNDLE_FILENAME, STATS_FILENAME):
            src = root / name
            if src.exists():
                try:
                    (Path(_REPO_ROOT) / name).write_bytes(src.read_bytes())
                except OSError as exc:
                    logger.warning("compq_bank: root mirror failed for %s: %s", name, exc)
    summary = {"comp_files_parsed": totals["comp_files"],
               "comp_files_failed": totals["comp_parse_fail"],
               "sub_parts": totals["sub_parts"],
               "embedded_files": totals["embedded_files"],
               "embedded_cqs": totals["embedded_cqs"],
               "embedded_by_board": dict(totals["boards"]),
               "bundle_nodes": totals["bundle_nodes"],
               "worked_examples": totals["worked_examples"],
               "diagnostics": totals["diagnostics"],
               "worked_examples_by_board": dict(totals["we_by_board"]),
               "diagnostics_by_board": dict(totals["diag_by_board"])}
    (root / STATS_FILENAME).write_text(json.dumps(summary, indent=2), encoding="utf-8")
    _write_resume({"stage": "build:done", **summary})
    return summary


# --------------------------------------------------------------------------- #
# Quality audit CLI
# --------------------------------------------------------------------------- #

def cmd_stats() -> Dict[str, Any]:
    bp = bank_path()
    ep = embedded_path()
    rows = 0
    guideline_full = guideline_some = 0
    with_traps = with_variants = with_shortcut = 0
    per_subject: Dict[str, Counter] = defaultdict(Counter)
    parse_warn = Counter()
    gates_hist = Counter()
    for line in _iter_jsonl(bp):
        rows += 1
        steps = line.get("guideline_steps") or []
        labels = {s.get("step") for s in steps}
        if {"1", "2", "3", "4", "5"} <= labels:
            guideline_full += 1
        if steps:
            guideline_some += 1
        if line.get("traps"):
            with_traps += 1
        if line.get("variants"):
            with_variants += 1
        if line.get("shortcut"):
            with_shortcut += 1
        subj = line.get("subject_label") or "Unknown"
        per_subject[subj]["sub_parts"] += 1
        per_subject[subj][line.get("kind") or "unknown"] += 1
        for w in line.get("parse_warnings", []):
            parse_warn[w] += 1
        gates_hist[min(len(line.get("answer_gates") or []), 5)] += 1
    emb_rows = 0
    emb_answered = 0
    emb_per_subject: Counter = Counter()
    for line in _iter_jsonl(ep):
        emb_rows += 1
        if line.get("answer") or line.get("marking_points") or line.get("steps"):
            emb_answered += 1
        emb_per_subject[line.get("subject_label") or "Unknown"] += 1
    we_count = diag_count = bundle_nodes = 0
    we_by_board: Counter = Counter()
    diag_by_board: Counter = Counter()
    for line in _iter_jsonl(bundle_path()):
        bundle_nodes += 1
        we_count += len(line.get("worked_examples") or [])
        diag_count += len(line.get("diagnostics") or [])
        b = line.get("board") or "cbse"
        we_by_board[b] += len(line.get("worked_examples") or [])
        diag_by_board[b] += len(line.get("diagnostics") or [])
    report = {
        "bank_sub_parts": rows,
        "guideline_all_5_steps_pct": round(100 * guideline_full / rows, 1) if rows else 0.0,
        "guideline_any_steps_pct": round(100 * guideline_some / rows, 1) if rows else 0.0,
        "with_traps_pct": round(100 * with_traps / rows, 1) if rows else 0.0,
        "with_variants_pct": round(100 * with_variants / rows, 1) if rows else 0.0,
        "with_shortcut_pct": round(100 * with_shortcut / rows, 1) if rows else 0.0,
        "kind_split": dict(Counter()),
        "per_subject": {k: dict(v) for k, v in sorted(per_subject.items())},
        "parse_warnings": dict(parse_warn),
        "gate_count_hist": dict(gates_hist),
        "embedded_cqs": emb_rows,
        "embedded_with_solution_pct": round(100 * emb_answered / emb_rows, 1) if emb_rows else 0.0,
        "embedded_per_subject_top": dict(emb_per_subject.most_common(25)),
        "node_bundles": bundle_nodes,
        "worked_examples": we_count,
        "diagnostics": diag_count,
        "worked_examples_by_board": dict(we_by_board),
        "diagnostics_by_board": dict(diag_by_board),
    }
    kind_counter = Counter()
    for line in _iter_jsonl(bp):
        kind_counter[line.get("kind") or "unknown"] += 1
    report["kind_split"] = dict(kind_counter)
    print(json.dumps(report, indent=2, ensure_ascii=False))
    return report


def _iter_jsonl(path: Path) -> Iterable[Dict[str, Any]]:
    if not path.exists():
        return []
    with path.open("r", encoding="utf-8") as fh:
        for line in fh:
            line = line.strip()
            if not line:
                continue
            try:
                yield json.loads(line)
            except json.JSONDecodeError:
                continue


# --------------------------------------------------------------------------- #
# Arithmetic spot-check (direct computation re-derivation)
# --------------------------------------------------------------------------- #

_EQ_RE = re.compile(
    r"([0-9.,()\s+\-×x*/÷^%₹]{3,80}?)\s*=\s*(-?\d[\d,]*(?:\.\d+)?)\s*(%|L|Lakh|lakh|Crore|crore|Cr)?(?=$|[\s,;.)])",
    re.M,
)


def _clean_arith(expr: str) -> Optional[str]:
    e = expr.strip()
    e = e.replace("₹", "").replace(",", "").replace(" ", "")
    e = e.replace("×", "*").replace("x", "*").replace("÷", "/").replace("^", "**")
    e = e.replace("%", "/100")
    if not e or not re.fullmatch(r"[0-9.()+\-*/]+", e):
        return None
    if not re.search(r"[+\-*/]", e[1:]):
        return None
    return e


def arithmetic_consistency(guideline_steps: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Re-derive every pure-arithmetic 'A op B = C' claim in the authored
    steps (direct computation — the honest fallback when the full solver
    pipeline cannot route a case-study sub-part).

    Artifact guards (each suppresses a known false-flag class, not a real
    miss): chained equations 'A = B = C' (the middle term is BOTH an RHS and
    an LHS — a RHS followed immediately by any operator is a chain link),
    approximations with '≈'/'…', year ranges ('2022-23'), fraction
    continuations ('10.5/30'), and typographic glyphs (− – ·) normalised
    before evaluation. Percentages compare scale-aware (LHS %/100 vs RHS%)."""
    checked = valid = 0
    fails: List[str] = []
    for s in guideline_steps:
        text = (s.get("text", "")
                .replace("\u2212", "-").replace("\u2013", "-").replace("\u2014", "-")
                .replace("\u00b7", "*").replace("\u202f", " ").replace("\u00a0", " "))
        for m in _EQ_RE.finditer(text):
            lhs_raw, rhs_raw, unit = m.group(1), m.group(2), (m.group(3) or "")
            lhs = _clean_arith(lhs_raw)
            if not lhs:
                continue
            tail = text[m.end():]
            # chained equation: the RHS continues into an operator/'='/approx
            if re.match(r"\s*(?:[=+\-*/÷^×x]|\u2248)", tail or ""):
                continue
            # fraction continuation: RHS is the numerator of 'a/b'
            if re.match(r"\s*/\s*[\d(]", tail or ""):
                continue
            # space-grouped continuation: RHS is the head of '1 468 800'
            if re.match(r"\s+\d", tail or ""):
                continue
            # approximations / ellipsis numbers ('1.333…', '≈ 133.3 %')
            if "…" in (m.group(0) + tail[:6]) or "..." in tail[:6]:
                continue
            # year range on the left ('2022-23 = ...')
            if re.search(r"\b\d{4}\s*-\s*\d{2,4}\s*$", lhs_raw.strip()):
                continue
            try:
                lhs_val = eval(lhs, {"__builtins__": {}}, {})  # noqa: S307 - sanitized above
            except Exception:
                continue
            try:
                rhs_val = float(rhs_raw.replace(",", ""))
            except ValueError:
                continue
            # % scale-aware ONLY when the LHS itself was %-scaled by
            # _clean_arith ('0.6*5.6% = 3.36%' -> both raw). A plain
            # 'x/ y * 100 = 24%' RHS means the value 24, not 0.24.
            if unit == "%" and "%" in lhs_raw:
                rhs_val = rhs_val / 100.0
            checked += 1
            if _close(lhs_val, rhs_val, rel=0.005, abs_tol=0.00051):
                valid += 1
            else:
                fails.append(f"step{s.get('step')}: '{lhs_raw.strip()[-48:]}= {rhs_raw}' "
                             f"re-derived {round(lhs_val, 4)}")
    return {"checked": checked, "valid": valid,
            "fail_examples": fails[:5]}


def cmd_spotcheck(n_per_subject: int = 8, max_subjects: int = 12,
                  use_solver: bool = False) -> Dict[str, Any]:
    """Pick numeric sub-parts across subjects and re-derive the authored
    arithmetic. Two independent layers, reported separately:

      * ``direct``  — deterministic pure-arithmetic re-evaluation of every
        'A op B = C' claim in the authored steps (always on);
      * ``solver``  -- the platform answer_pipeline (lane A) re-derives the
        same equations as formal queries ('Evaluate 0.18*320') and the
        pipeline numeric is compared to the authored value. One warm process,
        per-query budget, honest no-verdict on refusal/timeout (opt-in with
        --solver because the cold lane costs minutes in dev).
    """
    by_subject: Dict[str, List[Dict[str, Any]]] = defaultdict(list)
    for line in _iter_jsonl(bank_path()):
        if line.get("kind") == "numeric" and line.get("guideline_steps"):
            by_subject[line.get("subject_label") or "Unknown"].append(line)
    picked: List[Dict[str, Any]] = []
    for subj in sorted(by_subject, key=lambda s: -len(by_subject[s]))[:max_subjects]:
        pool = by_subject[subj]
        step = max(1, len(pool) // max(1, n_per_subject))
        picked.extend(pool[::step][:n_per_subject])

    solver_fn = None
    if use_solver:
        from concurrent.futures import ThreadPoolExecutor, TimeoutError as FuturesTimeoutError
        try:
            from backend.its.solver.answer_pipeline import answer as _pipe_answer
        except Exception as exc:                          # pragma: no cover
            logger.warning("spotcheck: solver unavailable: %s", exc)
            _pipe_answer = None
        if _pipe_answer is not None:
            _solver_pool = ThreadPoolExecutor(max_workers=1)

            def solver_fn(eq_lhs: str, rhs: float) -> Dict[str, Any]:  # noqa: E731
                query = f"Evaluate {eq_lhs}"
                fut = _solver_pool.submit(_pipe_answer, query)
                try:
                    r = fut.result(timeout=45)
                except FuturesTimeoutError:
                    return {"verdict": "no_verdict", "why": "budget"}
                except Exception as exc:
                    return {"verdict": "no_verdict", "why": f"error:{type(exc).__name__}"}
                num = r.numeric
                if num is None and r.answer:
                    m = re.search(r"-?\d[\d,]*(?:\.\d+)?", str(r.answer))
                    num = float(m.group(0).replace(",", "")) if m else None
                if num is None or r.label in ("GUIDED_PRACTICE", "AMBIGUOUS"):
                    return {"verdict": "no_verdict", "why": r.label or "no_numeric"}
                ok = _close(num, rhs, rel=0.02, abs_tol=0.051)
                return {"verdict": "agree" if ok else "MISMATCH",
                        "pipeline": r.label, "rederived": num, "authored": rhs}

    results = []
    for row in picked:
        cons = arithmetic_consistency(row.get("guideline_steps", []))
        entry: Dict[str, Any] = {"compq_id": row["compq_id"],
                                 "subject": row["subject_label"],
                                 "checked": cons["checked"], "valid": cons["valid"],
                                 "fail_examples": cons["fail_examples"]}
        results.append(entry)

    solver_results: List[Dict[str, Any]] = []
    if solver_fn is not None:
        # one formal query per sampled row (bounded: SOLVER_SPOTCHECK_CAP)
        cap = 48
        for row in picked:
            if len(solver_results) >= cap:
                break
            for s in row.get("guideline_steps", []):
                for m in _EQ_RE.finditer(s.get("text", "")):
                    lhs = _clean_arith(m.group(1))
                    if not lhs:
                        continue
                    try:
                        authored = float(m.group(2).replace(",", ""))
                    except ValueError:
                        continue
                    # present the equation the way a student would write it
                    lhs_fmt = (m.group(1).strip()
                               .replace("×", "*").replace("÷", "/").replace("^", "**"))
                    out = solver_fn(lhs_fmt, authored)
                    out.update({"compq_id": row["compq_id"],
                                "subject": row["subject_label"],
                                "equation": f"{lhs_fmt} = {m.group(2)}"})
                    solver_results.append(out)
                    break

    total_checked = sum(r["checked"] for r in results)
    total_valid = sum(r["valid"] for r in results)
    per_subject = defaultdict(lambda: [0, 0])
    for r in results:
        per_subject[r["subject"]][0] += r["valid"]
        per_subject[r["subject"]][1] += r["checked"]
    s_agree = sum(1 for x in solver_results if x["verdict"] == "agree")
    s_checked = sum(1 for x in solver_results if x["verdict"] in ("agree", "MISMATCH"))
    s_no_verdict = sum(1 for x in solver_results if x["verdict"] == "no_verdict")
    s_per_subject = defaultdict(lambda: [0, 0])
    for x in solver_results:
        if x["verdict"] in ("agree", "MISMATCH"):
            s_per_subject[x["subject"]][0] += 1 if x["verdict"] == "agree" else 0
            s_per_subject[x["subject"]][1] += 1
    report = {
        "mode": "direct+solver" if solver_fn is not None else "direct",
        "sampled_sub_parts": len(results),
        "subjects": sorted({r["subject"] for r in results}),
        "direct": {
            "equations_checked": total_checked,
            "equations_holding": total_valid,
            "agreement_pct": round(100 * total_valid / total_checked, 1) if total_checked else None,
            "per_subject": {k: {"valid": v[0], "checked": v[1],
                                "pct": round(100 * v[0] / v[1], 1) if v[1] else None}
                            for k, v in sorted(per_subject.items())},
        },
        "solver": {
            "equations_checked": s_checked + s_no_verdict,
            "agreements": s_agree,
            "mismatches": s_checked - s_agree,
            "no_verdict": s_no_verdict,
            "agreement_pct": round(100 * s_agree / s_checked, 1) if s_checked else None,
            "per_subject": {k: {"agree": v[0], "checked": v[1]}
                            for k, v in sorted(s_per_subject.items())},
        },
        "mismatch_examples": [r for r in results if r["fail_examples"]][:12],
        "solver_mismatch_examples": [
            x for x in solver_results if x["verdict"] == "MISMATCH"][:12],
    }
    out = RESUME_STATE_PATH.parent / "compq_spotcheck_report.json"
    try:
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    except OSError:
        pass
    print(json.dumps({k: v for k, v in report.items()
                      if k not in ("mismatch_examples", "solver_mismatch_examples")},
                     indent=2, ensure_ascii=False))
    return report


# --------------------------------------------------------------------------- #
# Serving loader (singleton, mtime-checked)
# --------------------------------------------------------------------------- #

class CompqBank:
    """In-memory serving index over the two JSONL banks."""

    def __init__(self) -> None:
        self._mtime: Dict[Path, float] = {}
        self.rows: List[Dict[str, Any]] = []
        self.by_id: Dict[str, Dict[str, Any]] = {}
        self.by_node: Dict[str, List[Dict[str, Any]]] = defaultdict(list)
        self.emb_by_node: Dict[str, List[Tuple[int, int]]] = {}
        self._emb_offsets: Dict[str, List[Tuple[int, int]]] = {}
        self._bundle_offsets: Dict[str, List[Tuple[int, int]]] = {}
        self._lru: "OrderedDict[str, Any]" = OrderedDict()
        self._emb_fh = None
        self._bundle_fh = None
        self._loaded_at: float = 0.0

    def _stale(self) -> bool:
        for p in (bank_path(), embedded_path(), bundle_path()):
            if not p.exists():
                return True
            if self._mtime.get(p) != p.stat().st_mtime:
                return True
        return bool(not self.rows and bank_path().exists())

    _ensure_lock = threading.Lock()

    def ensure(self) -> "CompqBank":
        if self.rows and not self._stale():
            return self
        # Serialize the ~420MB cold load: without the lock every worker AND
        # every concurrent first-request raced a full load — observed 3x
        # parallel loads on the Windows bind mount (2026-10-10), which is
        # what turned a ~60s cold start into a wedge.
        with CompqBank._ensure_lock:
            if self.rows and not self._stale():
                return self
            return self._load()

    def _load(self) -> "CompqBank":
        rows, by_id, by_node = [], {}, defaultdict(list)
        for row in _iter_jsonl(bank_path()):
            rows.append(row)
            by_id[row["compq_id"]] = row
            # CROSS-BINDING GUARD (2026-10-11 audit): `nodes[]` tags include
            # every node a case study MENTIONS, including other classes and
            # subjects — a class-12 CS case study was serving on a class-10
            # math node. Index under parent_node always; under extra tags
            # only when the tag shares the parent's grade+subject.
            parent = row.get("parent_node")
            pp = parse_node_id(parent or "")
            if parent:
                by_node[parent].append(row)
            for nid in (row.get("nodes") or []):
                if not nid or nid == parent:
                    continue
                np = parse_node_id(nid)
                if (pp.get("grade") is None or np.get("grade") is None
                        or (np["grade"] == pp["grade"]
                            and np["subject"] == pp["subject"])):
                    by_node[nid].append(row)
        # The two largest artifacts (embedded CQs ~140MB, node bundles ~280MB)
        # are served per node on demand: index byte offsets once, seek+parse
        # on request with a small LRU. Full-file dict residency would cost
        # ~500MB per worker on top of the models the backend already carries.
        emb_offsets = self._index_offsets(embedded_path(), "node")
        bundle_offsets = self._index_offsets(bundle_path(), "node")
        self.rows, self.by_id, self.by_node = rows, by_id, by_node
        self.emb_by_node = emb_offsets
        self._bundle_offsets = bundle_offsets
        self._lru = OrderedDict()
        if getattr(self, "_emb_fh", None) is not None:
            try:
                self._emb_fh.close()
            except OSError:
                pass
        if getattr(self, "_bundle_fh", None) is not None:
            try:
                self._bundle_fh.close()
            except OSError:
                pass
        self._emb_fh = open(embedded_path(), "rb") if embedded_path().exists() else None
        self._bundle_fh = open(bundle_path(), "rb") if bundle_path().exists() else None
        self._mtime = {p: (p.stat().st_mtime if p.exists() else 0.0)
                       for p in (bank_path(), embedded_path(), bundle_path())}
        logger.info("compq_bank: loaded %d sub-parts (%d nodes), embedded offsets "
                    "for %d nodes, bundle offsets for %d nodes",
                    len(rows), len(by_node), len(emb_offsets), len(bundle_offsets))
        return self

    def _index_offsets(self, path: Path, key_field: str) -> Dict[str, List[Tuple[int, int]]]:
        """{key: [(byte_offset, line_len), ...]} — the key is read off each
        line's head without a full JSON parse (defensive on bad lines)."""
        index: Dict[str, List[Tuple[int, int]]] = defaultdict(list)
        if not path.exists():
            return index
        key_re = re.compile(r'"%s"\s*:\s*"([^"]+)"' % re.escape(key_field))
        with path.open("rb") as fh:
            off = 0
            for raw in fh:
                n = len(raw)
                m = key_re.search(raw[:300].decode("utf-8", "replace"))
                if m:
                    index[m.group(1)].append((off, n))
                off += n
        return index

    def _read_offset(self, fh, off: int, n: int) -> Optional[Dict[str, Any]]:
        fh.seek(off)
        raw = fh.read(n)
        try:
            return json.loads(raw.decode("utf-8"))
        except (ValueError, UnicodeDecodeError):
            return None

    def _lru_get(self, key: str):
        return self._lru.get(key) if hasattr(self, "_lru") else None

    def _lru_put(self, key: str, value: Any) -> None:
        self._lru[key] = value
        while len(self._lru) > 256:
            self._lru.popitem(last=False)

    def embedded_for(self, node_id: str) -> List[Dict[str, Any]]:
        """Parsed embedded CQs for one node (LRU-cached)."""
        cache_key = f"emb:{node_id}"
        hit = self._lru_get(cache_key)
        if hit is not None:
            return hit
        if self._emb_fh is None:
            return []
        rows = [r for r in (self._read_offset(self._emb_fh, off, n)
                            for off, n in self.emb_by_node.get(node_id, []))
                if r is not None]
        self._lru_put(cache_key, rows)
        return rows

    def get_bundle(self, node_id: str) -> Optional[Dict[str, Any]]:
        """Parsed bundle for one node (LRU-cached, honest None when absent)."""
        cache_key = f"bundle:{node_id}"
        hit = self._lru_get(cache_key)
        if hit is not None:
            return hit
        if self._bundle_fh is None:
            return None
        pos = self._bundle_offsets.get(node_id)
        if not pos:
            return None
        off, n = pos[0]
        row = self._read_offset(self._bundle_fh, off, n)
        if row is None:
            return None
        self._lru_put(cache_key, row)
        return row

    # -- question-side payloads (no answers) --------------------------- #

    @staticmethod
    def question_payload(row: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "compq_id": row["compq_id"],
            "sub_part_id": row["sub_part_id"],
            "parent_node": row.get("parent_node"),
            "board": row.get("board"),
            "subject": row.get("subject_label"),
            "seed_title": row.get("seed_title"),
            "scenario": row.get("scenario"),
            "difficulty_tier": row.get("difficulty_tier"),
            "exam_levels": row.get("exam_levels"),
            "question": row.get("q"),
            "level": row.get("level"),
            "time_sec": row.get("time_sec"),
            "kind": row.get("kind"),
            "concepts_combined": [
                {"area": k, "count": len(v)} for k, v in
                (row.get("concepts_combined") or {}).items()
            ],
        }

    @staticmethod
    def embedded_question_payload(row: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "cq_id": row["cq_id"],
            "node": row.get("node"),
            "board": row.get("board"),
            "subject": row.get("subject_label"),
            "question": row.get("question"),
            "competency": row.get("competency"),
            "difficulty": row.get("difficulty"),
            "source": "node_embedded",
        }

    # -- node bundles (worked examples / diagnostics) ------------------- #

    def worked_examples_for(self, node_id: str) -> List[Dict[str, Any]]:
        bundle = self.get_bundle(node_id) or {}
        return bundle.get("worked_examples") or []

    def diagnostics_for(self, node_id: str) -> List[Dict[str, Any]]:
        bundle = self.get_bundle(node_id) or {}
        return bundle.get("diagnostics") or []

    def match_diagnostic(self, node_id: str, question_text: str,
                         include_misconception: bool = True) -> Optional[Dict[str, Any]]:
        """Diagnostic whose text best overlaps the missed question (token
        overlap, deterministic). Honest None when the node has none."""
        diags = self.diagnostics_for(node_id)
        if not diags:
            return None
        q_tokens = {t for t in re.findall(r"[a-z\u0900-\u097F]{4,}", (question_text or "").lower())}
        best, best_score = None, -1
        for d in diags:
            d_tokens = {t for t in re.findall(r"[a-z\u0900-\u097F]{4,}", (d.get("q") or "").lower())}
            score = len(q_tokens & d_tokens)
            if score > best_score:
                best, best_score = d, score
        payload = {"index": best["index"], "q": best["q"]}
        if include_misconception and best.get("misconception"):
            payload["misconception"] = best["misconception"]
        elif include_misconception:
            payload["misconception"] = None          # honest null
        return payload


_bank: Optional[CompqBank] = None


def get_bank() -> CompqBank:
    global _bank
    if _bank is None:
        _bank = CompqBank()
    return _bank.ensure()


# --------------------------------------------------------------------------- #
# Grading used by the router (deterministic, no LLM)
# --------------------------------------------------------------------------- #

GUIDE_LABEL_ORDER = ["Identify+Recall", "Setup", "Execute", "Verify+Answer", "Generalize"]


def grade_numeric_attempt(row: Dict[str, Any], student_answer: str) -> Dict[str, Any]:
    gates = row.get("answer_gates") or []
    outcome = match_gates(gates, student_answer)
    if not outcome.get("graded"):
        return {"verdict": "unscored", "graded_by": "gate",
                "reason": "no authored numeric gates for this sub-part",
                **outcome}
    ratio = outcome["ratio"]
    # Gate grading is deliberately conservative: the authored Verify+Answer
    # step usually carries intermediate work products alongside the final
    # deliverables, so a concise answer hitting only the finals grades
    # "partial" (full guideline is shown either way) — never silently correct.
    if ratio >= 0.75:
        verdict = "correct"
    elif ratio >= 0.33:
        verdict = "partial"
    else:
        verdict = "incorrect"
    return {"verdict": verdict, "graded_by": "gate", **outcome}


def method_payload(row: Dict[str, Any], include_answer_step: bool = True) -> Dict[str, Any]:
    steps = row.get("guideline_steps") or []
    if not include_answer_step:
        steps = [s for s in steps if s.get("step") != "4"]
    return {
        "guideline_steps": steps,
        "shortcut": row.get("shortcut"),
        "generalize": next((s["text"] for s in steps if s.get("step") == "5"), None),
    }


def main(argv: Optional[List[str]] = None) -> int:
    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s %(message)s")
    parser = argparse.ArgumentParser(description="CBQ bank builder/audit")
    parser.add_argument("command", choices=["build", "stats", "spotcheck"])
    parser.add_argument("--n", type=int, default=8, help="spotcheck picks per subject")
    parser.add_argument("--solver", action="store_true",
                        help="spotcheck: also re-derive via the answer_pipeline "
                             "(one warm process; cold lane costs minutes)")
    args = parser.parse_args(argv)
    if args.command == "build":
        summary = cmd_build()
        print(json.dumps(summary, indent=2))
    elif args.command == "stats":
        cmd_stats()
    elif args.command == "spotcheck":
        cmd_spotcheck(n_per_subject=args.n, use_solver=args.solver)
    return 0


if __name__ == "__main__":
    sys.exit(main())
