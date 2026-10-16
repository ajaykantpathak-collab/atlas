"""supplements.py — STUDY-KIT API router.

Serves the generated supplement library (drill banks, glossaries, formula
banks, misconceptions, revision sheets, flashcards, trackers, enrichment
docs) copied from the CISCE authoring corpus into
``content/supplements/<subject>/<category>/<file>`` and catalogued in
``content/supplements/_supplements_index.json``.

Serving model is bucket-based (subject + class + category), NOT node-linked:
supplement files are authored per subject/class, so a class-10 chem node
surfaces the class-10 chem drill bank regardless of node-ID scheme.

Endpoints (all GET, read-only, no DB):
    /api/supplements/index                       subjects → categories → counts
    /api/supplements/list?subject=&class=&category=&topic=   filtered file list
    /api/supplements/file?path=<subject>/<cat>/<file>        file body (safe)

Deterministic: JSON index + filesystem only.
"""
from __future__ import annotations

import json
import logging
import os
import re
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, HTTPException, Query
from fastapi.concurrency import run_in_threadpool

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/supplements", tags=["supplements"])

_REPO_ROOT = os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", ".."))

_SUPP_DIRS = [
    os.path.join(_REPO_ROOT, "cbse_data", "supplements"),
    os.path.join(_REPO_ROOT, "content", "supplements"),
]

_INDEX: Optional[Dict[str, Any]] = None
_INDEX_PATH: Optional[str] = None


def _supp_root() -> Optional[str]:
    for d in _SUPP_DIRS:
        if os.path.isdir(d):
            return d
    return None


def _load_index() -> Dict[str, Any]:
    global _INDEX, _INDEX_PATH
    if _INDEX is not None:
        return _INDEX
    root = _supp_root()
    if not root:
        return {}
    p = os.path.join(root, "_supplements_index.json")
    try:
        _INDEX = json.load(open(p, encoding="utf-8"))
        _INDEX_PATH = p
    except Exception as exc:  # noqa: BLE001
        logger.warning("supplements index load failed: %s", exc)
        _INDEX = {}
    return _INDEX


#: supplements subject codes → canonical corpus subject ids. The
#: library was authored with a few different labels than the node
#: corpus (maths/physics vs math/phy); callers pass either.
#: Careful with the commerce/computer trio: live "compapp" = Computer
#: Applications, supplements "commapp" = Commercial Applications.
_SUBJECT_ALIASES = {
    "math": "maths", "phy": "physics",
    "comst": "commstud",            # Commercial Studies
    "compst": "cs",                 # Computer Studies → cs bucket
    "compapp": "cs",                # Computer Applications → cs bucket
    "envsci": "evs",
    "polsci": "pol", "bst": "bs",
    "engl": "eng", "econ": "econ",
}


def _canon_subject(subject: Optional[str]) -> Optional[str]:
    if not subject:
        return None
    s = subject.lower().strip()
    # caller may pass the canonical id — map back to the supplement dir
    for alias, canon in _SUBJECT_ALIASES.items():
        if s == alias:
            return canon
    return s


#: WS-D (2026-10-10): path-shape allowlist. Every segment must be a plain
#: filename token — letters, digits, underscore, dash, dot, space,
#: parentheses — and may not START with a dot (hidden files). This kills
#: traversal, absolute paths, drive letters and backslash separators on
#: every host OS before the filesystem is ever consulted, and pairs with
#: a realpath containment check (symlink escape) below.
_SAFE_SEGMENT = re.compile(r"^[A-Za-z0-9_][A-Za-z0-9 ._\-()]{0,120}$")


def _safe_path(root: str, rel: str) -> Optional[str]:
    """Resolve a client-supplied relative path strictly inside the
    supplements root — no traversal, no absolute paths, no symlinks out.

    Layers (defense in depth):
      1. shape: forward-slash segments only, each matching the allowlist
         (rejects ``..``, ``.``, empty, hidden, backslash, drive-letter
         and percent-encoded forms outright);
      2. containment: the REALPATH of the joined file must sit inside
         the realpath of the root (catches symlink escapes);
      3. existence: files only.
    """
    if not rel or not isinstance(rel, str):
        return None
    if rel.startswith(("/", "\\")) or "\\" in rel or "\x00" in rel:
        return None
    parts = rel.split("/")
    if any(p in ("", ".", "..") for p in parts):
        return None
    if any(p.startswith(".") for p in parts):
        return None
    if not all(_SAFE_SEGMENT.match(p) for p in parts):
        return None
    full = os.path.realpath(os.path.join(root, *parts))
    root_real = os.path.realpath(root)
    if not full.startswith(root_real + os.sep):
        return None
    if not os.path.isfile(full):
        return None
    return full


#: per-path board sniff cache — marker files carry no BOARD field, so
#: the board is read once from the TITLE line and memoised. The whole
#: library today is ICSE-authored; CBSE cells land with their own titles.
_BOARD_CACHE: Dict[str, Optional[str]] = {}

#: word-boundary board sniff — matches ICSE / ISC / CISCE (and CBSE) as
#: words first; the legacy substring match survives only as a fallback
#: tier so the ~950 ICSE-authored markers that never spell out their
#: board ("discount" contains "isc") keep their classification.
_BOARD_WORD = re.compile(r"\b(ICSE|ISC|CISCE)\b")
_BOARD_WORD_CBSE = re.compile(r"\bCBSE\b")
_BOARD_SUBSTR = re.compile(r"(ICSE|ISC|CISCE)")


def _file_board(root: str, rel: str) -> Optional[str]:
    """'icse' | 'cbse' | None(unknown→shared) for a supplement file.

    Sniffs the first 2KB for a board marker in the header lines; a file
    that names no board is treated as board-agnostic and serves both.
    Tiers: the ICSE family as a WORD wins (an ICSE-titled file quoting
    CBSE in prose stays ICSE); then the word CBSE (a CBSE-titled file
    must never fall to the ICSE shelf just because English words like
    MISCONCEPTIONS or DISCRIMINANT contain the letters isc); then the
    legacy substring matches so the ~950 ICSE-authored markers that
    never spell out their board keep their classification."""
    if rel in _BOARD_CACHE:
        return _BOARD_CACHE[rel]
    board: Optional[str] = None
    try:
        with open(os.path.join(root, rel), encoding="utf-8",
                  errors="replace") as fh:
            head = fh.read(2048).upper()
        if _BOARD_WORD.search(head):
            board = "icse"
        elif _BOARD_WORD_CBSE.search(head):
            board = "cbse"
        elif _BOARD_SUBSTR.search(head):
            board = "icse"
        elif "CBSE" in head:
            board = "cbse"
    except OSError:
        board = None
    if len(_BOARD_CACHE) > 20000:
        _BOARD_CACHE.clear()
    _BOARD_CACHE[rel] = board
    return board


@router.get("/index")
async def supplements_index() -> Dict[str, Any]:
    idx = await run_in_threadpool(_load_index)
    out: Dict[str, Any] = {"subjects": {}, "total_files": 0,
                           "categories": sorted({
                               c for s in idx.values() for c in s})}
    for subj, cats in idx.items():
        n = sum(len(v) for v in cats.values())
        out["subjects"][subj] = {"files": n,
                                 "categories": {c: len(v) for c, v in cats.items()}}
        out["total_files"] += n
    return out


@router.get("/list")
async def supplements_list(
    subject: Optional[str] = Query(None),
    cls: Optional[int] = Query(None, alias="class"),
    category: Optional[str] = Query(None),
    topic: Optional[str] = Query(None),
    board: Optional[str] = Query(None),
    limit: int = Query(50, ge=1, le=200),
) -> Dict[str, Any]:
    idx = await run_in_threadpool(_load_index)
    if not idx:
        raise HTTPException(404, "supplements library not available")
    tl = (topic or "").strip().lower()
    want_subj = _canon_subject(subject)
    # board values arrive as cbse|icse|isc; ISC students see the same
    # CISCE-authored library (markers say ICSE but cover ISC too)
    want_board = (board or "").strip().lower() or None
    if want_board == "isc":
        want_board = "icse"
    hits: List[Dict[str, Any]] = []
    root = _supp_root()
    for subj, cats in idx.items():
        if want_subj and subj != want_subj:
            continue
        for cat, files in cats.items():
            if category and cat != category:
                continue
            for rec in files:
                if cls is not None and rec.get("class") not in (0, cls):
                    continue
                if tl and tl not in (rec.get("topic") or "").lower():
                    continue
                # stale-index guard: only serve files that exist on disk
                if root and not os.path.isfile(os.path.join(root, rec["file"])):
                    continue
                # board guard: a file authored for the other board never
                # leaks (ICSE-titled markers vs a CBSE student's view)
                if want_board and root:
                    fb = _file_board(root, rec["file"])
                    if fb is not None and fb != want_board:
                        continue
                hits.append({"subject": subj, "category": cat, **rec})
                if len(hits) >= limit:
                    break
            if len(hits) >= limit:
                break
        if len(hits) >= limit:
            break
    return {"count": len(hits), "files": hits}


@router.get("/file")
async def supplements_file(
    path: str = Query(..., description="subject/category/file from index"),
) -> Dict[str, Any]:
    root = _supp_root()
    if not root:
        raise HTTPException(404, "supplements library not available")
    full = _safe_path(root, path)
    if not full:
        raise HTTPException(404, "supplement file not found")
    try:
        body = await run_in_threadpool(
            lambda: open(full, encoding="utf-8", errors="replace").read())
    except OSError:
        raise HTTPException(404, "supplement file not found")
    idx = await run_in_threadpool(_load_index)
    meta = None
    for subj, cats in idx.items():
        for cat, files in cats.items():
            for rec in files:
                if rec.get("file") == path:
                    meta = {"subject": subj, "category": cat, **rec}
                    break
    return {"path": path, "meta": meta, "body": body}
