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
import os
import re
import threading
import time
from typing import Dict, List, Optional, Tuple

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
CACHE_VERSION = 2

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

# --------------------------------------------------------------------------
# Filename parsing
# --------------------------------------------------------------------------

_FILENAME_PATTERNS = (
    # c10_bio_cbse_01_001  (subject may be multi-token: c12_hin_al_cbse_03_011)
    re.compile(r"^c(?P<cls>\d+)_(?P<subj>.+)_cbse_(?P<chap>\d+)_(?P<num>\d+)$"),
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
                "board": "cbse" if "_cbse_" in stem else "",
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

_SECTION_HEADER_RE = re.compile(r"^#{1,3}[ \t]*(.+?)[ \t]*$", re.M)

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
    ``DIAGNOSTIC_ANSWER_5``).  Repeated headers are concatenated.  Any
    preamble before the first header is dropped.
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
            sections[name] += "\n\n" + body
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


def parse_markdown(text: str) -> Dict:
    """Parse raw node markdown into the section dict used downstream."""
    sections = split_sections(text)
    return {
        "sections": sections,
        "diagnostics": parse_diagnostics(sections),
    }


def parse_node_file(path: str) -> Tuple[Optional[Dict], Optional[str]]:
    """Parse one node markdown file.

    Returns ``(node, None)`` on success or ``(None, reason)`` when the
    file must be skipped (unreadable / unparseable filename / no core
    sections).  Never raises for content issues.
    """
    fname = os.path.basename(path)
    stem = os.path.splitext(fname)[0]
    coords = parse_filename(stem)
    if coords is None:
        return None, "unparseable_filename"
    try:
        with open(path, "r", encoding="utf-8-sig", errors="replace") as fh:
            text = fh.read()
    except OSError as exc:                      # pragma: no cover - defensive
        return None, "read_error: %s" % exc

    sections = parse_markdown(text)["sections"]
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
        "common_misconception": sections.get("COMMON_MISCONCEPTION", "") or None,
        "on_failure": sections.get("ON_FAILURE", "") or None,
        "missing_sections": missing,
        "source_file": fname,
    }
    return node, None


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


def _summary(node: Dict, snippet_chars: int = 220) -> Dict:
    return {
        "node_id": node["node_id"],
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


def _subject_matches(node_subject: str, wanted: str) -> bool:
    ns = (node_subject or "").strip().lower()
    ws = (wanted or "").strip().lower()
    if not ws or ns == ws:
        return True
    # exact token match or alias expansion (bio -> biology, ...)
    return _SUBJECT_ALIASES.get(ws) == ns


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
        self._by_cs: Dict[Tuple[int, str], List[str]] = {}
        for nid, node in self.nodes.items():
            self._by_cs.setdefault(
                (node["class"], node["subject"]), []).append(nid)
        for ids in self._by_cs.values():
            ids.sort()

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

    def classes(self) -> List[int]:
        return sorted({c for c, _ in self._by_cs})

    def subjects(self, cls: Optional[int] = None) -> List[str]:
        subs = {s for c, s in self._by_cs if cls is None or c == cls}
        return sorted(subs)

    def per_class_counts(self) -> Dict[int, int]:
        return {c: sum(len(ids) for (cc, _), ids in self._by_cs.items()
                       if cc == c)
                for c in self.classes()}

    # -- class/subject listing --------------------------------------------

    def by_class_subject(self, cls: int, subject: str,
                         summaries: bool = True) -> List[Dict]:
        ids = self._by_cs.get((int(cls), (subject or "").strip().lower()))
        if not ids:
            # alias-tolerant scan (e.g. subject="bio" vs stored "biology")
            ids = sorted(
                nid for (c, s), nids in self._by_cs.items() if c == int(cls)
                for nid in nids if _subject_matches(s, subject))
        nodes = [self.nodes[nid] for nid in ids]
        return [_summary(n) for n in nodes] if summaries else nodes

    # -- search ------------------------------------------------------------

    def search(self, q: str, limit: int = 20,
               cls: Optional[int] = None,
               subject: Optional[str] = None) -> List[Dict]:
        ql = (q or "").strip().lower()
        if not ql:
            return []
        terms = ql.split()
        results: List[Tuple[float, str]] = []
        for nid, node in self.nodes.items():
            if cls is not None and node["class"] != int(cls):
                continue
            if subject and not _subject_matches(node["subject"], subject):
                continue
            hay_id = nid.lower()
            hay_def = (node["definition"] or "").lower()
            hay_body = " ".join(filter(None, [
                node["walkthrough"], node["mastery_criteria"],
                node["scope_boundary"], node["cognitive_level"],
                *[d["q"] for d in node["diagnostics"]],
            ])).lower()
            score = 0.0
            for t in terms:
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


def _cache_path() -> str:
    return os.environ.get(
        "ENHANCED_NODES_CACHE_PATH",
        os.path.join(CACHE_DIR, CACHE_FILENAME))


def _md_files(md_dir: str) -> List[str]:
    return sorted(
        f for f in os.listdir(md_dir) if f.lower().endswith(".md"))


def dir_fingerprint(md_dir: str) -> Dict:
    """Cheap content fingerprint of the md dir (count/bytes/latest mtime)."""
    files = _md_files(md_dir)
    total = 0
    latest = 0.0
    for f in files:
        try:
            st = os.stat(os.path.join(md_dir, f))
        except OSError:                          # pragma: no cover
            continue
        total += st.st_size
        latest = max(latest, st.st_mtime)
    return {"file_count": len(files), "total_bytes": total,
            "max_mtime": latest}


def build_index(md_dir: str) -> EnhancedNodesIndex:
    """Scan ``md_dir`` and parse every node + companion file.  Tolerates
    malformed files -- they are counted as skipped in ``index.stats``."""
    t0 = time.time()
    files = _md_files(md_dir)
    nodes: List[Dict] = []
    companions: List[Dict] = []
    skipped: Dict[str, str] = {}
    degraded = 0
    companions_degraded = 0
    for fname in files:
        stem = os.path.splitext(fname)[0]
        is_comp = stem.endswith(COMP_SUFFIX)
        parser = parse_companion_file if is_comp else parse_node_file
        node, reason = parser(os.path.join(md_dir, fname))
        if node is None:
            skipped[fname] = reason or "unknown"
            continue
        if node["missing_sections"]:
            if is_comp:
                companions_degraded += 1
            else:
                degraded += 1
        (companions if is_comp else nodes).append(node)
    stats = {
        "md_dir": md_dir,
        "files_found": len(files),
        "parsed": len(nodes),
        "companions": len(companions),
        "companions_degraded": companions_degraded,
        "skipped": len(skipped),
        "skipped_files": skipped,
        "degraded_missing_sections": degraded,
        "diagnostics_total": sum(len(n["diagnostics"]) for n in nodes),
        "cache_hit": False,
        "build_seconds": round(time.time() - t0, 3),
    }
    return EnhancedNodesIndex(nodes, stats, companions)


def _read_cache(fingerprint: Dict) -> Optional[EnhancedNodesIndex]:
    path = _cache_path()
    if not os.path.isfile(path):
        return None
    try:
        with open(path, "r", encoding="utf-8") as fh:
            payload = json.load(fh)
        if payload.get("cache_version") != CACHE_VERSION:
            return None
        if payload.get("fingerprint") != fingerprint:
            return None
        idx = EnhancedNodesIndex.from_dict(payload)
        idx.stats = dict(idx.stats)
        idx.stats["cache_hit"] = True
        return idx
    except (OSError, ValueError, KeyError, TypeError):
        return None                                # corrupt cache -> rebuild


def _write_cache(index: EnhancedNodesIndex, fingerprint: Dict) -> None:
    path = _cache_path()
    try:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        tmp = path + ".tmp"
        with open(tmp, "w", encoding="utf-8") as fh:
            json.dump({
                "cache_version": CACHE_VERSION,
                "fingerprint": fingerprint,
                **index.to_dict(),
            }, fh, ensure_ascii=False)
        os.replace(tmp, path)
    except OSError:
        pass                                       # cache is best-effort


_LOCK = threading.Lock()
_INDEX: Optional[EnhancedNodesIndex] = None


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
        if not os.path.isdir(directory):
            raise RuntimeError(
                "enhanced-nodes md dir not found: %r (set "
                "ENHANCED_NODES_MD_DIR)" % directory)
        fingerprint = dir_fingerprint(directory)
        index = None if force else _read_cache(fingerprint)
        if index is None:
            index = build_index(directory)
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
