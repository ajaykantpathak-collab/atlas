"""learnpath_builder.py — offline builder for the IN-CHAPTER learning path.

For every (class, subject, chapter) this produces the ordered sequence of
lessons a student should learn, respecting prerequisites, as generated
JSON under ``deploy/backend/_cache/learnpaths/``.  This is the static
"what do I learn next inside this chapter" spine — a BUILD-TIME artefact,
deliberately separate from services/learnpath.py (the per-student runtime
composer across chapters).

DATA SOURCE
  The corpus markdown itself (``deploy/content/enhanced_nodes_md/``),
  read file-by-file — no Postgres, no Neo4j, no LLM, no Docker.  The one
  field that matters per node is the ``## PREREQUISITE_NODE_IDS`` header
  (comma/newline-separated node ids); ``## PREREQUISITE_REASONS`` supplies
  the per-edge pedagogical reason reused for entry requirements.  Titles
  are derived from the ``## DEFINITION`` first clause exactly like
  enhanced_nodes._derive_title.  Filenames follow the canonical
  conventions of enhanced_nodes.parse_filename (cbse/icse/isc/ch/u).

EDGE SEMANTICS (per chapter scan)
  - prereq id resolves to a node in the SAME chapter  -> in-chapter edge,
    used to topologically order lessons (sequence number breaks ties).
  - prereq id resolves anywhere else (earlier chapter, other class,
    other subject) -> ``entry_requirements``: listed with a kind + authored
    reason, never ordered into the chapter path.
  - id unresolvable (no file) -> entry requirement with kind
    ``unresolved`` so data rot stays visible instead of silently vanishing.
  - cycles (the class-6 sibling mesh: 001 lists 002 while 002 lists 001)
    are broken by sequence number — the lowest-seq node still stuck in a
    cycle is force-placed and its unsatisfied in-chapter prereq edges are
    recorded in ``cycle_breaks``.

OUTPUT (one JSON per chapter)
  {class, subject, chapter,
   lessons: [{node_id, title, seq, prereqs_in_chapter}],   # path order
   entry_requirements: [{node_id, kind, reason}],
   cycle_breaks: [{node_id, seq, ignored_in_chapter_prereqs}]}

  INVARIANT (what makes next_lesson total): every lesson's
  ``prereqs_in_chapter`` lists only lessons that appear EARLIER in the
  path.  Author edges that point forward are the cycle breaks — recorded,
  not silently dropped.  Node ids travel as opaque fetch keys only
  (owner decision 2026-09-29); display strings carry titles.

SERVING CONTRACT (for the router work when the app is back — nothing is
wired here by design; this module never imports routers or the DB)

  get_path(cls, subject, chapter) -> dict | None
      Reads ``_cache/learnpaths/{cls}_{subject}_{chapter}.json``.
      ``subject`` is canonical: maths | science | physics | chemistry |
      biology | history.  Science is stored in the corpus as the three
      strands (physics/chemistry/biology) — serve the strand paths; there
      is no merged-science file.
  next_lesson(path, done_node_ids) -> lesson dict | None
      First lesson (path order) whose ``prereqs_in_chapter`` are all in
      ``done_node_ids``.  None when the chapter is finished.  For
      builder-generated paths this never stalls (invariant above).
  Suggested routes:
      GET  /api/learnpath/chapter/<cls>/<subject>/<chapter> -> get_path
      POST /api/learnpath/chapter/<cls>/<subject>/<chapter>/next
           {done_node_ids: [...]}                           -> next_lesson

RAM BOUNDS
  generate_all holds only (a) the filename listing parsed to coordinates
  (~14k small tuples) and (b) ONE chapter's nodes at a time; each corpus
  file is opened, its two sections extracted, and the text discarded.
  Output is written per chapter, streamed to disk.

Stdlib-only at module scope so tests can load this file by path without
dragging the solver stack (same contract as services/learnpath.py).
"""

from __future__ import annotations

import heapq
import json
import logging
import os
import re
from datetime import datetime, timezone
from typing import Any, Dict, Iterable, List, Optional, Tuple

logger = logging.getLogger(__name__)

# ── locations (defaults; overridable for tests / other corpora) ───────────
_THIS_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_CORPUS_ROOT = os.path.normpath(
    os.path.join(_THIS_DIR, "..", "..", "content", "enhanced_nodes_md"))
DEFAULT_OUT_DIR = os.path.normpath(
    os.path.join(_THIS_DIR, "..", "_cache", "learnpaths"))

COMP_SUFFIX = "_comp"          # case-study companions are not lessons

# ── filename conventions (parity with enhanced_nodes.parse_filename) ──────
_FILENAME_PATTERNS = (
    re.compile(r"^c(?P<cls>\d+)_(?P<subj>.+)_cbse_(?P<chap>\d+)_(?P<num>\d+)$"),
    re.compile(r"^c(?P<cls>\d+)_(?P<subj>.+?)_icse_(?P<chap>\d+)_(?P<num>\d+)$"),
    re.compile(r"^c(?P<cls>\d+)_(?P<subj>.+?)_isc_(?P<chap>\d+)_(?P<num>\d+)$"),
    re.compile(r"^c(?P<cls>\d+)_(?P<subj>.+?)_ch0*(?P<chap>\d+)_(?P<num>\d+)$"),
    re.compile(r"^c(?P<cls>\d+)_(?P<subj>.+?)_u0*(?P<chap>\d+)_(?P<num>\d+)$"),
)

#: stem token -> canonical subject (the serving vocabulary)
SUBJECT_ALIASES = {
    "math": "maths", "maths": "maths",
    "phy": "physics", "phys": "physics", "physics": "physics",
    "chem": "chemistry", "chemistry": "chemistry",
    "bio": "biology", "biology": "biology",
    "science": "science",
    "hist": "history", "history": "history",
    # SOCIAL_GOLDEN batch (2026-10-06): geography / civics / economics
    # learnpaths — mirrors question_selector._SUBJECT_ALIASES vocabulary.
    # NOTE: "soc" stays OUT — c11_soc/c12_soc is SOCIOLOGY, not civics;
    # "ps" stays OUT — the c11_ps/c12_ps political-science stems are tagged
    # physical_education in the selector vocabulary (owner call pending).
    "geo": "geography", "geography": "geography",
    "civ": "civics", "civics": "civics",
    "eco": "economics", "econ": "economics", "economics": "economics",
    # LOOP-FIXER wave (2026-10-07): language learnpaths. The corpus
    # stores english/hindi under per-book stems (eng_f = Flamingo,
    # hin_a = Aaroh, hin_sp = Sparsh, ...) — every stem maps to the ONE
    # canonical subject so prereq resolution and the cache filename stay
    # `{cls}_english_{ch}.json` / `{cls}_hindi_{ch}.json`.
    "eng": "english", "engl": "english", "english": "english",
    "eng_f": "english", "eng_h": "english", "eng_k": "english",
    "eng_s": "english", "eng_v": "english", "eng_w": "english",
    "hin": "hindi", "hindi": "hindi",
    "hin_a": "hindi", "hin_al": "hindi", "hin_ar": "hindi",
    "hin_ga": "hindi", "hin_kr": "hindi", "hin_ks": "hindi",
    "hin_sp": "hindi", "hin_v": "hindi",
}

#: canonical subject -> corpus stem tokens it may be stored under
SUBJECT_STEM_VARIANTS = {
    "maths": ("math", "maths"),
    "physics": ("physics", "phy", "phys"),
    "chemistry": ("chemistry", "chem"),
    "biology": ("biology", "bio"),
    "science": ("science", "sci"),
    "history": ("history", "hist"),
    "geography": ("geography", "geo"),
    "civics": ("civics", "civ"),
    "economics": ("economics", "eco", "econ"),
    # LOOP-FIXER wave (2026-10-07): the language books' stem tokens
    # (mirrors SUBJECT_ALIASES; _chapter_group matches exactly).
    "english": ("english", "eng", "engl", "eng_f", "eng_h", "eng_k",
                "eng_s", "eng_v", "eng_w"),
    "hindi": ("hindi", "hin", "hin_a", "hin_al", "hin_ar", "hin_ga",
              "hin_kr", "hin_ks", "hin_sp", "hin_v"),
}

#: a canonical "science" request fans out to these strands when scanning
SCIENCE_STRANDS = ("physics", "chemistry", "biology")

# LOOP-FIXER wave (2026-10-07): full 6-12 coverage — classes 11/12 were
# only ever generated for physics/geography/economics by a one-off run,
# and the languages were absent from the vocabulary entirely.
DEFAULT_CLASSES = (6, 7, 8, 9, 10, 11, 12)
DEFAULT_SUBJECTS = ("maths", "science", "physics", "chemistry", "biology",
                    "history", "geography", "civics", "economics",
                    "english", "hindi")


def canonical_subject(token: str) -> Optional[str]:
    """Corpus subject stem -> canonical subject (None when unknown)."""
    return SUBJECT_ALIASES.get(str(token or "").strip().lower())


def parse_filename(stem: str) -> Optional[Dict[str, Any]]:
    """Filename stem -> {class, subject_stem, board, chapter, seq} or None."""
    stem = str(stem or "").strip()
    for pat in _FILENAME_PATTERNS:
        m = pat.match(stem)
        if m:
            board = ("isc" if "_isc_" in stem else
                     "icse" if "_icse_" in stem else
                     "cbse" if "_cbse_" in stem else "")
            return {
                "class": int(m.group("cls")),
                "subject_stem": m.group("subj").lower(),
                "board": board,
                "chapter": int(m.group("chap")),
                "seq": int(m.group("num")),
            }
    return None


# ─────────────────────────────────────────────────────────────────────────
# markdown section extraction (single-purpose: prereqs + definition head)
# ─────────────────────────────────────────────────────────────────────────

_SECTION_RE = re.compile(r"^##(?!#)[ \t]*(.+?)[ \t]*$", re.M)


def _sections(text: str) -> Dict[str, str]:
    """``{NAME: body}`` split on exactly-``##`` headers (last repeat wins)."""
    out: Dict[str, str] = {}
    matches = list(_SECTION_RE.finditer(text))
    for i, m in enumerate(matches):
        name = m.group(1).strip().strip("*").strip().upper()
        if not name:
            continue
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        out[name] = text[m.end():end].strip()
    return out


#: authored filler tokens that mean "no value" (mirrors _clean_field)
_NOISE_IDS = {"N/A", "NA", "NONE", "NULL", "TBD", "-"}


def _id_list(raw: str) -> List[str]:
    """Comma/newline separated id list, order-preserving dedupe.
    Authored filler tokens (N/A …) are dropped, not tracked as junk ids."""
    seen: Dict[str, None] = {}
    for part in raw.replace("\n", ",").split(","):
        p = part.strip().strip("`*")
        if p and p.upper() not in _NOISE_IDS:
            seen.setdefault(p, None)
    return list(seen)


def _reason_map(raw: str) -> Dict[str, str]:
    """``node_id: reason`` lines -> mapping (mirrors parse_mapping_reasons)."""
    out: Dict[str, str] = {}
    for line in raw.split("\n"):
        line = line.strip()
        if not line or ":" not in line:
            continue
        nid, _, reason = line.partition(":")
        nid = nid.strip().strip("*")
        reason = reason.strip()
        if nid and reason:
            out.setdefault(nid, reason)
    return out


def derive_title(definition: str, node_id: str) -> str:
    """Definition first clause -> topic title (delegates to the shared
    enhanced_nodes._derive_title — markup-stripped, meta-opener aware;
    falls back to a prettified id).  The guarded import keeps the builder
    runnable as a bare ``services.`` script outside the ``backend``
    package; the old inline rule is the fallback there."""
    try:
        from backend.services.enhanced_nodes import _derive_title as _shared
        return _shared({"definition": definition, "node_id": node_id})
    except ImportError:
        pass
    head = (definition or "").strip().split("\n")[0].strip()
    if head:
        for sep in (" is defined as", " is the ", " are the ", " refers to ",
                    " means ", " is a ", " is an ", " is ", " are ",
                    " – ", " — ", " - ", ": ", "."):
            if sep in head:
                cand = head.split(sep, 1)[0].strip()
                if 3 <= len(cand) <= 60 and len(cand.split()) <= 10:
                    return cand[0].upper() + cand[1:]
        if len(head) <= 60:
            return head[0].upper() + head[1:]
        return head[:57].rstrip() + "…"
    parts = [p for p in str(node_id or "").split("_") if p and not p.isdigit()]
    return " ".join(p.capitalize() for p in parts) or str(node_id or "")


def _read_sections(path: str, wanted: Iterable[str]) -> Dict[str, str]:
    """Read one corpus file, return only the requested sections."""
    with open(path, "r", encoding="utf-8-sig", errors="replace") as fh:
        text = fh.read()
    secs = _sections(text)
    return {k: secs.get(k, "") for k in wanted}


# ─────────────────────────────────────────────────────────────────────────
# corpus listing
# ─────────────────────────────────────────────────────────────────────────

def list_corpus(corpus_root: str) -> Dict[str, Dict[str, Any]]:
    """One pass over the corpus dir -> {node_id: coords} for lesson files.

    Skips directories, ``_``-prefixed entries, non-.md files and ``_comp``
    companions.  Coordinates come from the filename only — no file reads.
    """
    out: Dict[str, Dict[str, Any]] = {}
    with os.scandir(corpus_root) as it:
        for entry in it:
            if entry.is_dir():
                continue
            name = entry.name
            if not name.endswith(".md") or name.startswith("_"):
                continue
            stem = name[:-3]
            if stem.endswith(COMP_SUFFIX):
                continue
            coords = parse_filename(stem)
            if coords is None:
                continue
            coords["node_id"] = stem
            out[stem] = coords
    return out


def _chapter_group(corpus: Dict[str, Dict[str, Any]], cls: int,
                   subject: str, chapter: int) -> List[Dict[str, Any]]:
    """Nodes of one (class, canonical subject, chapter), seq-ordered."""
    variants = SUBJECT_STEM_VARIANTS.get(subject, (subject,))
    nodes = [c for c in corpus.values()
             if c["class"] == int(cls)
             and c["subject_stem"] in variants
             and c["chapter"] == int(chapter)]
    nodes.sort(key=lambda c: (c["seq"], c["node_id"]))
    return nodes


# ─────────────────────────────────────────────────────────────────────────
# the builder
# ─────────────────────────────────────────────────────────────────────────

def scan_chapter(corpus_root: str, cls: int, subject: str, chapter: int,
                 corpus: Optional[Dict[str, Dict[str, Any]]] = None
                 ) -> Optional[Dict[str, Any]]:
    """Build the ordered lesson path for one chapter.

    ``subject`` is canonical (maths/science/physics/chemistry/biology).
    Returns the path dict (the JSON payload) or None when the chapter has
    no corpus nodes.  Pure function of the files — no DB, no network.
    """
    cls, chapter = int(cls), int(chapter)
    if corpus is None:
        corpus = list_corpus(corpus_root)
    nodes = _chapter_group(corpus, cls, subject, chapter)
    if not nodes:
        return None

    wanted = ("DEFINITION", "PREREQUISITE_NODE_IDS", "PREREQUISITE_REASONS")
    titles: Dict[str, str] = {}
    prereqs: Dict[str, List[str]] = {}
    reasons: Dict[str, Dict[str, str]] = {}
    for coords in nodes:
        nid = coords["node_id"]
        try:
            secs = _read_sections(
                os.path.join(corpus_root, nid + ".md"), wanted)
        except OSError as exc:
            logger.warning("learnpath_builder: unreadable %s: %s", nid, exc)
            secs = {}
        titles[nid] = derive_title(secs.get("DEFINITION", ""), nid)
        prereqs[nid] = _id_list(secs.get("PREREQUISITE_NODE_IDS", ""))
        reasons[nid] = _reason_map(secs.get("PREREQUISITE_REASONS", ""))

    # ── split each node's prereq ids: in-chapter vs entry requirement ─────
    in_chapter: Dict[str, List[str]] = {}
    entry: Dict[str, Dict[str, Any]] = {}
    for coords in nodes:
        nid = coords["node_id"]
        keep: List[str] = []
        for pid in prereqs[nid]:
            if pid == nid:                      # self-edge: data noise, keep
                keep.append(pid)                # in-graph so the cycle
                continue                        # breaker records the drop
            pcoords = corpus.get(pid)
            if pcoords is None:
                entry.setdefault(pid, {
                    "node_id": pid, "kind": "unresolved",
                    "reason": reasons[nid].get(pid, ""),
                })
                continue
            same_chapter = (pcoords["class"] == cls
                            and canonical_subject(pcoords["subject_stem"]) == subject
                            and pcoords["chapter"] == chapter)
            if same_chapter:
                keep.append(pid)
                continue
            if pcoords["class"] != cls:
                kind = "cross_class"
            elif canonical_subject(pcoords["subject_stem"]) != subject:
                kind = "cross_subject"
            elif pcoords["chapter"] < chapter:
                kind = "earlier_chapter"
            else:
                kind = "later_chapter"
            entry.setdefault(pid, {
                "node_id": pid, "kind": kind,
                "reason": reasons[nid].get(pid, ""),
            })
        in_chapter[nid] = keep

    order, cycle_breaks = _topo_order(nodes, in_chapter)

    # forward-consistency rewrite: a lesson's gate may only name earlier
    # lessons (the serving invariant); drops ARE the cycle breaks.
    position = {nid: i for i, nid in enumerate(order)}
    lessons = []
    for nid in order:
        gates = [p for p in in_chapter[nid]
                 if p != nid and position.get(p, len(order)) < position[nid]]
        lessons.append({
            "node_id": nid,
            "title": titles.get(nid) or nid,
            "seq": next(c["seq"] for c in nodes if c["node_id"] == nid),
            "prereqs_in_chapter": gates,
        })

    entry_list = sorted(
        entry.values(),
        key=lambda e: (_entry_sort_key(e, corpus), e["node_id"]))
    return {
        "class": cls,
        "subject": subject,
        "chapter": chapter,
        "lessons": lessons,
        "entry_requirements": entry_list,
        "cycle_breaks": cycle_breaks,
    }


def _entry_sort_key(e: Dict[str, Any],
                    corpus: Dict[str, Dict[str, Any]]) -> Tuple[int, int, int]:
    """Parseable entry prereqs sort by (class, chapter); junk goes last."""
    coords = corpus.get(e["node_id"])
    if coords is None:
        return (9, 9, 9)
    return (coords["class"], coords["chapter"], coords["seq"])


def _topo_order(nodes: List[Dict[str, Any]],
                in_chapter: Dict[str, List[str]]
                ) -> Tuple[List[str], List[Dict[str, Any]]]:
    """Kahn's algorithm with a (seq, node_id) heap; cycle -> force-place the
    lowest-seq stuck node and record the dropped edges.

    Returns (ordered node ids, cycle_breaks)."""
    ids = [c["node_id"] for c in nodes]
    seq_of = {c["node_id"]: c["seq"] for c in nodes}
    indeg = {nid: 0 for nid in ids}
    dependents: Dict[str, List[str]] = {nid: [] for nid in ids}
    for nid in ids:
        for p in in_chapter[nid]:
            if p in indeg:                  # unknown ids were filtered out
                indeg[nid] += 1
                dependents[p].append(nid)

    order: List[str] = []
    breaks: List[Dict[str, Any]] = []
    placed: set = set()
    heap = [(seq_of[n], n) for n in ids if indeg[n] == 0]
    heapq.heapify(heap)

    def _release(nid: str) -> None:
        placed.add(nid)
        order.append(nid)
        for dep in dependents[nid]:
            indeg[dep] -= 1
            if indeg[dep] == 0 and dep not in placed:
                heapq.heappush(heap, (seq_of[dep], dep))

    while len(placed) < len(ids):
        while heap:
            _, nid = heapq.heappop(heap)
            if nid not in placed:
                _release(nid)
        if len(placed) >= len(ids):
            break
        # cycle: force-place the lowest-seq remaining node
        stuck = [n for n in ids if n not in placed]
        stuck.sort(key=lambda n: (seq_of[n], n))
        picked = stuck[0]
        ignored = sorted(p for p in in_chapter[picked] if p not in placed)
        breaks.append({
            "node_id": picked,
            "seq": seq_of[picked],
            "ignored_in_chapter_prereqs": ignored,
        })
        logger.info("learnpath_builder: cycle broken at %s — dropped edges %s",
                    picked, ignored)
        # force-place: clear picked's remaining indegree and release it
        indeg[picked] = 0
        _release(picked)
    return order, breaks


# ─────────────────────────────────────────────────────────────────────────
# generation (streaming, RAM-bounded)
# ─────────────────────────────────────────────────────────────────────────

def _expand_subjects(subjects: Iterable[str]) -> List[str]:
    """Canonical subject list; ``science`` fans out to its three strands
    (the corpus stores NCERT science as phy/chem/bio)."""
    out: List[str] = []
    for s in subjects:
        s = canonical_subject(s) or str(s).strip().lower()
        if s == "science":
            for strand in SCIENCE_STRANDS:
                if strand not in out:
                    out.append(strand)
        elif s not in out:
            out.append(s)
    return out


def generate_all(corpus_root: Optional[str] = None,
                 out_dir: Optional[str] = None,
                 classes: Iterable[int] = DEFAULT_CLASSES,
                 subjects: Iterable[str] = DEFAULT_SUBJECTS
                 ) -> Dict[str, Any]:
    """Build every requested chapter path and write one JSON per chapter
    plus ``_index.json``.  Streaming: one chapter in memory at a time.

    Returns a coverage summary {chapters, nodes, cycle_chapters,
    cycle_breaks, files, per_subject, out_dir}."""
    corpus_root = corpus_root or DEFAULT_CORPUS_ROOT
    out_dir = out_dir or DEFAULT_OUT_DIR
    os.makedirs(out_dir, exist_ok=True)

    corpus = list_corpus(corpus_root)
    canon_subjects = _expand_subjects(subjects)

    summary: Dict[str, Any] = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "corpus_root": corpus_root,
        "chapters": 0,
        "nodes": 0,
        "cycle_chapters": 0,
        "cycle_breaks": 0,
        "files": [],
        "per_subject": {},
    }
    index_rows: List[Dict[str, Any]] = []

    for cls in sorted({int(c) for c in classes}):
        for subject in canon_subjects:
            chapter_numbers = sorted({c["chapter"] for c in corpus.values()
                                      if c["class"] == cls
                                      and c["subject_stem"]
                                      in SUBJECT_STEM_VARIANTS.get(
                                          subject, (subject,))})
            for chapter in chapter_numbers:
                path = scan_chapter(corpus_root, cls, subject, chapter,
                                    corpus=corpus)
                if path is None:
                    continue
                fname = "%d_%s_%d.json" % (cls, subject, chapter)
                fpath = os.path.join(out_dir, fname)
                with open(fpath, "w", encoding="utf-8") as fh:
                    json.dump(path, fh, ensure_ascii=False, indent=1)
                    fh.write("\n")
                n_breaks = len(path["cycle_breaks"])
                summary["chapters"] += 1
                summary["nodes"] += len(path["lessons"])
                summary["cycle_breaks"] += n_breaks
                if n_breaks:
                    summary["cycle_chapters"] += 1
                summary["per_subject"][subject] = \
                    summary["per_subject"].get(subject, 0) + 1
                summary["files"].append(fname)
                index_rows.append({
                    "file": fname,
                    "class": cls,
                    "subject": subject,
                    "chapter": chapter,
                    "lessons": len(path["lessons"]),
                    "cycle_breaks": n_breaks,
                })
                logger.info("learnpath_builder: %s — %d lessons, %d breaks",
                            fname, len(path["lessons"]), n_breaks)

    index = {
        "generated_at": summary["generated_at"],
        "corpus_root": corpus_root,
        "chapters": summary["chapters"],
        "nodes": summary["nodes"],
        "cycle_chapters": summary["cycle_chapters"],
        "cycle_breaks": summary["cycle_breaks"],
        "paths": index_rows,
    }
    with open(os.path.join(out_dir, "_index.json"), "w", encoding="utf-8") as fh:
        json.dump(index, fh, ensure_ascii=False, indent=1)
        fh.write("\n")
    summary["out_dir"] = out_dir
    return summary


# ─────────────────────────────────────────────────────────────────────────
# serving helpers (documented contract; routers wire these later)
# ─────────────────────────────────────────────────────────────────────────

def path_filename(cls: int, subject: str, chapter: int) -> str:
    """Canonical cache filename for one chapter path."""
    return "%d_%s_%d.json" % (int(cls), canonical_subject(subject)
                              or str(subject).lower(), int(chapter))


def get_path(cls: int, subject: str, chapter: int,
             cache_dir: Optional[str] = None) -> Optional[Dict[str, Any]]:
    """Load one generated chapter path (None when not generated)."""
    cache_dir = cache_dir or DEFAULT_OUT_DIR
    fpath = os.path.join(cache_dir, path_filename(cls, subject, chapter))
    try:
        with open(fpath, "r", encoding="utf-8") as fh:
            return json.load(fh)
    except (OSError, ValueError):
        return None


def next_lesson(path: Dict[str, Any],
                done_node_ids: Iterable[str]) -> Optional[Dict[str, Any]]:
    """First lesson whose in-chapter prereqs are all done; None when the
    chapter is finished (or nothing is unlocked).  For builder-generated
    paths this cannot stall: prereqs_in_chapter only name earlier lessons."""
    if not path:
        return None
    done = set(done_node_ids or [])
    for lesson in path.get("lessons", []):
        if lesson.get("node_id") in done:
            continue
        if all(p in done for p in lesson.get("prereqs_in_chapter", [])):
            return lesson
    return None
