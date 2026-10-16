"""board_stem.py -- board-paper stem extraction + ask classification.

Board questions arrive wrapped in paper furniture that family triggers
were never written against:

    "(A) (B) The A.P 8, 10, 12... Find the sum"   <- figure-label bleed
    "...is (A) 36  (B) 48  (C) 51  (D) 52"        <- option tail on stem
    "...OR Find the middle term"                   <- internal choice
    "...For Visually Impaired Candidates: ..."     <- duplicate VIC variant
    "...*Please note that the assessment scheme"   <- paper footnotes

This module produces a BoardStem: the clean stem the families can match,
the parsed options (kept for mcq_solver verification), and the ask-type
so downstream lanes know whether the ask is eval / transform / prove /
complement / select.

Pure pre-processing: no solving, no LLM, never raises.
"""

from __future__ import annotations

import re
import unicodedata
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Tuple


@dataclass
class BoardStem:
    stem: str                        # clean question stem
    options: List[Tuple[str, str]] = field(default_factory=list)  # [(letter, value)]
    ask: str = "eval"                # eval|transform|prove|inverse|complement|select|assertion
    or_branch: Optional[str] = None  # text after a top-level "OR"
    had_options: bool = False


# --------------------------------------------------------------------------- #
# Furniture patterns
# --------------------------------------------------------------------------- #

# "(A) (B)" orphan label runs — flattened figure options, always adjacent
# pairs with nothing between the parens.
_ORPHAN_LABELS = re.compile(r"(?:\(\s*[A-E]\s*\)\s*){2,}")

# Real option block: "(A) <something>" where <something> is non-empty and
# the tail parses as 2+ labelled options.
_OPT_START = re.compile(r"\(\s*([A-E])\s*\)")
_OPT_ROW = re.compile(
    r"\(\s*([A-E])\s*\)\s*(.+?)(?=\s*\(\s*[A-E]\s*\)|\s*$)", re.S)

# Paper furniture to strip wholesale.
_FOOTNOTE_RES = [
    re.compile(r"\*?\s*please note that.*$", re.I | re.S),
    re.compile(r"for visually impaired candidates.*$", re.I | re.S),
    re.compile(r"\*\s*please note.*$", re.I | re.S),
    re.compile(r"section\s*[-–—]?\s*[a-e]\s*$", re.I),
]

# OR-branch split: top-level " OR " followed by a verb-stem (not inside parens)
_OR_RE = re.compile(r"\bOR\b\s+(?=(?:find|prove|show|if|state|write|determine|calculate))", re.I)


def _norm_unicode(t: str) -> str:
    t = unicodedata.normalize("NFKC", t)
    return t.replace("−", "-").replace("–", "-").replace("⋅", "*").replace("×", "x")


def _strip_furniture(t: str) -> str:
    for r in _FOOTNOTE_RES:
        t = r.sub("", t)
    return t.strip()


def _split_options(t: str) -> Tuple[str, List[Tuple[str, str]]]:
    """Cut the stem at the first real option block; return (stem, options).

    Orphan "(A) (B)" figure-label runs inside the stem are removed first so
    they never get mistaken for the option block.
    """
    t = _ORPHAN_LABELS.sub(" ", t)
    m = _OPT_START.search(t)
    if not m:
        return t.strip(), []
    # is this a real option block? need >=2 labelled options in the tail
    tail = t[m.start():]
    opts = [(mm.group(1).upper(), mm.group(2).strip(" .;,:"))
            for mm in _OPT_ROW.finditer(tail)]
    if len(opts) >= 2 and all(v for _l, v in opts):
        return t[: m.start()].strip(" ,;:"), opts
    return t.strip(), []


def _split_or(stem: str) -> Tuple[str, Optional[str]]:
    m = _OR_RE.search(stem)
    if not m:
        return stem.strip(), None
    return stem[: m.start()].strip(" ,;:"), stem[m.end():].strip()


def _classify_ask(stem: str) -> str:
    s = stem.lower()
    if "assertion" in s and "reason" in s:
        return "assertion"
    if re.search(r"\bprove\s+that\b|\bshow\s+that\b", s):
        return "prove"
    if re.search(r"\bprobability\b[^.]{0,40}\bnot\b", s) or re.search(
            r"\bnot\s+(?:getting|drawing|selecting|choosing)\b", s):
        return "complement"
    if re.search(r"\bwhich\s+(?:one\s+)?of\s+the\s+following\b", s):
        return "select"
    # inverse / transform: a result is GIVEN and a transformed value is asked
    # ("median is 20.5, if each ... increased by 2") or (secθ+tanθ = x → secθ−tanθ)
    if re.search(r"\b(?:is|are|=)\s*[\d.a-z]+[^.]{0,60}\bif\s+each\b", s):
        return "transform"
    if re.search(r"=\s*[a-z]\b[^.]{0,30}\bthen\b[^.]{0,30}\b(?:will be|is|=|\?)", s):
        return "transform"
    if re.search(r"\bif\b[^.]{0,80}\bthen\b[^.]{0,80}\b(?:find|prove|will|is)\b", s):
        return "conditional"
    return "eval"


def prepare_board_stem(text: str) -> Optional[BoardStem]:
    """Return a BoardStem when the text looks like a board question, else None.

    Gates: must have an option block, OR-branch, VIC/footnote furniture, or
    orphan label bleed — otherwise this is ordinary text and we leave the
    pipeline to handle it untouched.
    """
    if not text or len(text) < 12:
        return None
    t = _norm_unicode(text)
    furniture_hit = any(r.search(t) for r in _FOOTNOTE_RES) or \
        _ORPHAN_LABELS.search(t)
    stem_opts = _split_options(t)
    or_split = _split_or(stem_opts[0])
    if not (furniture_hit or stem_opts[1] or or_split[1]):
        return None
    return BoardStem(
        stem=or_split[0],
        options=stem_opts[1],
        ask=_classify_ask(or_split[0]),
        or_branch=or_split[1],
        had_options=bool(stem_opts[1]),
    )
