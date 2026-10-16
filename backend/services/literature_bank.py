# -*- coding: utf-8 -*-
"""literature_bank.py — the साहित्य-कोश (literature bank) loader + index.

A separate corpus dir of full-piece documents — one .md per poem / drama /
prose piece — carrying everything a student needs for literature marks:
full text, complete meaning, act/stanza-wise breakdown, characters,
devices, context questions and Q&A.  This is deliberately NOT the atomic
teaching-node corpus: nodes teach micro-concepts; the bank holds the
complete piece a student can read start to finish.

DIR: ``content/literature/*.md``  (bind-mounted → instantly visible)

DOC CONTRACT (## headers; ### sub-headers inside section bodies).
Marking-scheme layout (owner decision): NO verbatim text dump — संकेत
fragments only; all explanations in the 5-step व्याख्या format; all Q&A
uniformly structured (अंक-बिंदु value-points + मॉडल-उत्तर).
    ## LIT_ID / TYPE / TITLE / AUTHOR / CLASS / BOARD / SUBJECT / BOOK / CHAPTER
    ## QUICK_FACTS     कवि-विशेषण, संग्रह, जीवन — संदर्भ-लेखन + MCQ fodder
    ## MEANING         full start-to-finish explanation (भावार्थ)
    ## CENTRAL_IDEA    केंद्रीय भाव — 5-अंक-उत्तर हेतु (भाव + पंक्ति-संदर्भ + काव्य-विशेष)
    ## SECTIONS        stanza/scene-wise: संकेत + अर्थ + काव्य-बिंदु
    ## ACT_WISE        drama — ### ACT_n … सार/अंतरार्थ/पात्र/संवाद/नाटकीय-तनाव
    ## CHARACTERS / CHARACTER_SKETCH   per-character sketches
    ## VYAKHYA_BANK    ### per extract: संकेत/संदर्भ/प्रसंग/व्याख्या/विशेष
    ## ANSWER_BANK     ### per Q: (अंक + शब्द-सीमा) → अंक-बिंदु → मॉडल-उत्तर
    ## MCQ_BANK        ### per MCQ: options + उत्तर
    ## EXAM_MAP        प्रश्न-पैटर्न + अधिकतम-अंक-रणनीति
    ## GLOSSARY / THEMES / DEVICES     supporting sections

API surface (see modules/literature/router.py):
    list_pieces(class?, subject?, type?, board?) -> catalog metadata
    get_piece(lit_id) -> full doc dict
"""
from __future__ import annotations

import logging
import os
import re
import time
from pathlib import Path
from typing import Any, Dict, List, Optional

logger = logging.getLogger(__name__)

LIT_DIR = Path(os.environ.get("LITERATURE_DIR", "/app/content/literature"))

HEADER_RE = re.compile(r"^##\s+(\w+)\s*$", re.M)
SUB_RE = re.compile(r"^###\s+(\S+.*)$", re.M)

META_FIELDS = ("LIT_ID", "TYPE", "TITLE", "AUTHOR", "CLASS", "BOARD",
               "SUBJECT", "BOOK", "CHAPTER")
SECTION_FIELDS = ("FULL_TEXT", "MEANING", "SECTIONS", "ACT_WISE",
                  "CHARACTERS", "GLOSSARY", "THEMES", "DEVICES",
                  "CONTEXT_QA", "SHORT_QA", "LONG_QA", "MCQ", "EXAM_NOTES",
                  "QUICK_FACTS", "CENTRAL_IDEA", "VYAKHYA_BANK",
                  "ANSWER_BANK", "MCQ_BANK", "EXAM_MAP", "CHARACTER_SKETCH")


def _split_sections(text: str) -> Dict[str, str]:
    """Split '## HEADER' document into {header: body}."""
    parts: Dict[str, str] = {}
    matches = list(HEADER_RE.finditer(text))
    for i, m in enumerate(matches):
        start = m.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        parts[m.group(1)] = text[start:end].strip()
    return parts


def _split_subs(body: str) -> Dict[str, str]:
    """Split a section body on '### SUB' sub-headers → {sub: body}."""
    subs: Dict[str, str] = {}
    matches = list(SUB_RE.finditer(body))
    for i, m in enumerate(matches):
        start = m.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(body)
        subs[m.group(1).strip()] = body[start:end].strip()
    return subs


def _parse_doc(path: Path) -> Optional[Dict[str, Any]]:
    try:
        raw = path.read_text(encoding="utf-8", errors="ignore")
    except OSError:
        return None
    secs = _split_sections(raw)
    meta = {k: secs.get(k, "") for k in META_FIELDS}
    if not meta["LIT_ID"] or not meta["TITLE"]:
        return None
    body: Dict[str, Any] = {}
    for f in SECTION_FIELDS:
        b = secs.get(f)
        if not b:
            continue
        # sections with ### sub-headers become dicts; plain stay strings
        subs = _split_subs(b)
        body[f] = subs if subs else b
    return {"meta": meta, "sections": body}


class LiteratureBank:
    """In-memory index of literature docs; reloads on dir mtime change."""

    def __init__(self) -> None:
        self._docs: Dict[str, Dict[str, Any]] = {}
        self._stamp: float = -1.0
        self._count: int = -1

    def _dir_stamp(self) -> tuple[float, int]:
        try:
            files = list(LIT_DIR.glob("*.md"))
        except OSError:
            return 0.0, 0
        mt = max((f.stat().st_mtime for f in files), default=0.0)
        return mt, len(files)

    def _maybe_reload(self) -> None:
        mt, cnt = self._dir_stamp()
        if mt == self._stamp and cnt == self._count:
            return
        docs: Dict[str, Dict[str, Any]] = {}
        try:
            files = sorted(LIT_DIR.glob("*.md"))
        except OSError:
            files = []
        for f in files:
            d = _parse_doc(f)
            if d:
                docs[d["meta"]["LIT_ID"]] = d
        self._docs = docs
        self._stamp, self._count = mt, cnt
        logger.info("literature_bank: %d docs indexed from %s", len(docs), LIT_DIR)

    def list_pieces(self, klass: Optional[str] = None,
                    subject: Optional[str] = None,
                    typ: Optional[str] = None,
                    board: Optional[str] = None) -> List[Dict[str, Any]]:
        self._maybe_reload()
        out = []
        for d in self._docs.values():
            m = d["meta"]
            if klass and m["CLASS"] != str(klass):
                continue
            if subject and subject.lower() not in m["SUBJECT"].lower():
                continue
            if typ and m["TYPE"].lower() != typ.lower():
                continue
            if board and m["BOARD"].lower() != board.lower():
                continue
            out.append({
                "lit_id": m["LIT_ID"], "type": m["TYPE"],
                "title": m["TITLE"], "author": m["AUTHOR"],
                "class": m["CLASS"], "board": m["BOARD"],
                "subject": m["SUBJECT"], "book": m["BOOK"],
                "chapter": m["CHAPTER"],
                "sections": list(d["sections"].keys()),
            })
        out.sort(key=lambda x: (x["class"], x["subject"], x["book"], x["chapter"], x["lit_id"]))
        return out

    def get_piece(self, lit_id: str) -> Optional[Dict[str, Any]]:
        self._maybe_reload()
        return self._docs.get(lit_id)


_bank = LiteratureBank()


def list_pieces(**kw):
    return _bank.list_pieces(**kw)


def get_piece(lit_id: str):
    return _bank.get_piece(lit_id)
