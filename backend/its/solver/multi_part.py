"""multi_part.py -- split multi-part board questions into standalone parts.

Board questions routinely carry sub-parts: "(a) ... (b) ...",
"(i) ... (ii) ...", "a) ... b) ..." after a colon-ish lead-in, or an
OR-split between two alternative readings ("Find ... OR Find ...").
Seen as one tangled sentence the whole item refuses today; answered as
one it would need guessing.  The deterministic way out:

  1. split_multi_part() cuts the item into standalone sub-questions,
     each part = shared preamble (context, incl. every numeric setup)
     + the part's own text; OR-side alternatives each carry the shared
     preamble too,
  2. try_multi_part() solves every part with the ORDINARY pipeline via
     an injected `solve` callable (answer_pipeline._answer_core, the
     core WITHOUT multi-part re-entry -- parts are split first, so
     parts can never recurse) and aggregates honestly: all_verified is
     True only when EVERY part came back VERIFIED /
     VERIFIED_WITH_ASSUMPTIONS / VERIFIED_OFFICIAL; even one guided
     part keeps all_verified False while verified parts stay listed.

This module NEVER fires on a plain single question (returns None), and
never fires on MCQ option lists -- "(a) 420 L (b) 480 L" trailing a
question mark is option data owned by the MCQ gate.  The guards:

  - a marker only continues a part list when the PREVIOUS part is
    closed (sentence punctuation or an explicit ask phrase); this
    rejects citation-style "(a) ... (b)" mentions inside one sentence,
  - accepted markers must form one CONSECUTIVE label run of >= 2 parts
    that covers ALL markers found (a broken or partial chain refuses
    the whole split -- no silent loss of sub-questions),
  - if every fragment after the markers is a short value-like token
    (a number carrying at most a few unit words, no ask phrase), the
    item is an option list, not sub-parts -> None,
  - sub-parts must ask something: at least one ask word or "?" across
    the context and the part texts.

Known traps intentionally NOT handled (left to honest refusal): bare
"a)" markers without a colon-ish lead-in, uppercase "(I)"/"(II)" roman
enumerators, numbered "1)" "2)" enumerators, and OR-splits where the
alternative shares the setup inside a single sentence.  All refuse to
None and the ordinary pipeline still sees the original text.

No LLM calls anywhere; everything is raw-string regex plus arithmetic
on character positions, in the mcq_solver injected-callable style.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Callable, Dict, List, Optional, Tuple


@dataclass
class PartReading:
    """One standalone sub-question."""

    label: str        # "a" | "i" | "1" ... (ordinal for OR alternatives)
    text: str         # standalone sub-question: context + own text
    raw: str          # the part's own text only (no shared preamble)


@dataclass
class SplitReading:
    """A multi-part reading of one board item."""

    context: str            # shared preamble before the first marker
    parts: List[PartReading]
    kind: str               # "ab" | "roman" | "or"


# ------------------------------------------------------------------ #
# deterministic helpers
# ------------------------------------------------------------------ #

_ASK_WORD_RE = re.compile(
    r"\b(find|calculate|compute|what|how|why|when|where|which|prove|show|"
    r"draw|state|write|express|determin\w*|solve|simplif\w*|evaluat\w*|"
    r"verify|check|derive|represent|construct|define|explain|identify|"
    r"convert|expand|factoris\w*|factoriz\w*|differentiat\w*|integrat\w*|"
    r"estimate|arrange|choose|select|list|name)\b", re.I)

# paren enumerators: (a) (B) ...; roman (i) (ii) ... (x), lowercase only
_PAREN_LETTER_RE = re.compile(r"\(\s*([a-hA-H])\s*\)")
_PAREN_ROMAN_RE = re.compile(r"\(\s*(x|ix|viii|vii|vi|v|iv|iii|ii|i)\s*\)")
_LETTER_ORDER = [chr(c) for c in range(ord("a"), ord("h") + 1)]
_ROMAN_ORDER = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"]

# bare enumerators "a) " -- only after a colon-ish lead-in
_BARE_LETTER_RE = re.compile(r"(?:^|(?<=[\s]))([a-hA-H])\)\s+")

# the standalone uppercase OR between two alternative readings
_OR_TOKEN_RE = re.compile(r"(?<![A-Za-z])OR(?![A-Za-z])")

_UNIT_TOKEN_RE = re.compile(r"^[A-Za-z]{1,6}$")

_CLOSURES = (".", "?", "!", ";", ":")

_VERIFIED_LABELS = ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS",
                    "VERIFIED_OFFICIAL")

_Marker = Tuple[int, int, str]   # (start, end, label)


def _is_closed(fragment: str) -> bool:
    """True when a part ends closed: sentence punctuation or an ask."""
    frag = fragment.strip()
    if not frag:
        return False
    if frag.endswith(_CLOSURES):
        return True
    return "?" in frag or bool(_ASK_WORD_RE.search(frag))


def _is_value_like(fragment: str) -> bool:
    """True for short numeric option fragments like '420 L' or '0.001'."""
    frag = fragment.strip(" \t\r\n,;:")
    if not frag or "?" in frag or not re.search(r"\d", frag):
        return False
    if _ASK_WORD_RE.search(frag):
        return False
    tokens = re.findall(r"[A-Za-z]+", frag)
    if len(tokens) > 3:
        return False
    return all(_UNIT_TOKEN_RE.match(t) for t in tokens)


def _rank(label: str, order: List[str]) -> Optional[int]:
    lab = label.strip().lower()
    return order.index(lab) if lab in order else None


def _best_run(markers: List[_Marker], text: str,
              order: List[str]) -> List[_Marker]:
    """Longest run of consecutive labels whose previous part is closed.

    A marker continues the current run only when its label follows the
    previous marker's label exactly AND the text between the markers
    (the previous part) is closed.  Any break restarts a new run.
    """
    runs: List[List[_Marker]] = []
    cur: List[_Marker] = []
    for m in markers:
        if cur:
            prev = cur[-1]
            prev_rank = _rank(prev[2], order)
            rank = _rank(m[2], order)
            if (prev_rank is not None and rank == prev_rank + 1
                    and _is_closed(text[prev[1]:m[0]])):
                cur.append(m)
                continue
            runs.append(cur)
            cur = []
        cur.append(m)
    if cur:
        runs.append(cur)
    runs = [r for r in runs if len(r) >= 2]
    return max(runs, key=len) if runs else []


def _bare_list_start(markers: List[_Marker], text: str) -> List[_Marker]:
    """Bare 'a)' enumerators count only from the first one that follows
    a colon-ish lead-in inside its own sentence."""
    for i, (start, _end, _label) in enumerate(markers):
        sent_start = max(text.rfind(c, 0, start) for c in ".?!;\n") + 1
        if ":" in text[sent_start:start]:
            return markers[i:]
    return []


def _parts_from_run(text: str, run: List[_Marker]) -> Optional[SplitReading]:
    context = text[:run[0][0]].strip()
    parts: List[PartReading] = []
    for i, (start, end, label) in enumerate(run):
        nxt = run[i + 1][0] if i + 1 < len(run) else len(text)
        raw = text[end:nxt].strip()
        if not raw:
            return None
        own = (context + " " + raw).strip() if context else raw
        parts.append(PartReading(label=label.lower(), text=own, raw=raw))
    # sub-parts must ask something; option/match lists ask nothing
    joined = context + " " + " ".join(p.raw for p in parts)
    if not ("?" in joined or _ASK_WORD_RE.search(joined)):
        return None
    # "(a) 420 L (b) 480 L" after a question mark -> MCQ gate owns these
    if all(_is_value_like(p.raw) for p in parts):
        return None
    return SplitReading(context=context, parts=parts, kind="ab")


def _split_enumerated(text: str) -> Optional[SplitReading]:
    """(a)/(b), bare 'a)', and roman '(i)' splitting."""
    passes = (
        (_PAREN_LETTER_RE, _LETTER_ORDER, "ab", False),
        (_BARE_LETTER_RE, _LETTER_ORDER, "ab", True),
        (_PAREN_ROMAN_RE, _ROMAN_ORDER, "roman", False),
    )
    for pattern, order, kind, bare in passes:
        markers: List[_Marker] = [
            (m.start(), m.end(), (m.group(1) or "").strip())
            for m in pattern.finditer(text)]
        if bare:
            markers = _bare_list_start(markers, text)
        if len(markers) < 2:
            continue
        run = _best_run(markers, text, order)
        # the run must cover ALL markers: a partial chain means part of
        # the item would be silently dropped, so refuse the split
        if len(run) >= 2 and run == markers:
            reading = _parts_from_run(text, run)
            if reading is not None:
                reading.kind = kind
                return reading
    return None


def _split_or(text: str) -> Optional[SplitReading]:
    """Standalone uppercase OR between complete question readings."""
    hits = list(_OR_TOKEN_RE.finditer(text))
    if not hits:
        return None
    sides: List[str] = []
    prev = 0
    for h in hits:
        sides.append(text[prev:h.start()])
        prev = h.end()
    sides.append(text[prev:])
    sides = [s.strip(" \t\r\n,;:") for s in sides]
    if len(sides) < 2 or any(len(s) < 8 for s in sides):
        return None
    # every alternative must be a complete question on its own
    if not all("?" in s or _ASK_WORD_RE.search(s) for s in sides):
        return None
    # shared preamble: sentences of the first side before its first ask
    # sentence; the preamble travels with every later alternative so
    # numeric setup is never dropped
    preamble = ""
    ask_idx = 0
    sentences = re.split(r"(?<=[.?!])\s+", sides[0])
    for i, s in enumerate(sentences):
        if "?" in s or _ASK_WORD_RE.search(s):
            ask_idx = i
            if i > 0:
                preamble = " ".join(sentences[:i])
            break
    raw_first = " ".join(sentences[ask_idx:])
    parts: List[PartReading] = []
    for k, side in enumerate(sides, start=1):
        if k == 1:
            # the first side already contains the preamble verbatim
            parts.append(PartReading(label=str(k), text=side,
                                     raw=raw_first))
        else:
            body = (preamble + " " + side) if preamble else side
            parts.append(PartReading(label=str(k), text=body, raw=side))
    return SplitReading(context=preamble, parts=parts, kind="or")


# ------------------------------------------------------------------ #
# public API
# ------------------------------------------------------------------ #

def split_multi_part(text: str) -> Optional[SplitReading]:
    """Split a multi-part board question; None when it is not one.

    A single question is never touched, an MCQ option list is never
    split, and a partial or ambiguous chain refuses (None).
    """
    if not text or not text.strip():
        return None
    reading = _split_enumerated(text)
    if reading is not None:
        return reading
    return _split_or(text)


def try_multi_part(text: str, solve: Callable[[str], object]
                   ) -> Optional[Dict]:
    """Solve each part with the ordinary pipeline; aggregate honestly.

    solve: callable(sub_question) -> PipelineResult.  Pass
    backend.its.solver.answer_pipeline._answer_core -- the core WITHOUT
    multi-part re-entry (parts are split first, so parts can never
    recurse).  Returns a promotion dict or None:

        {"kind": "ab" | "roman" | "or",
         "parts": [{"label": "a", "label_full": "(a)",
                    "answer": <core.answer>, "numeric": <core.numeric>,
                    "verified": bool, "refusal": <core.refusal_reason>},
                   ...],
         "all_verified": bool, "n_verified": int}

    all_verified is True only when EVERY part is VERIFIED /
    VERIFIED_WITH_ASSUMPTIONS / VERIFIED_OFFICIAL.  Even one guided
    part keeps all_verified False; verified parts stay listed.
    """
    reading = split_multi_part(text)
    if reading is None or len(reading.parts) < 2:
        return None
    out: List[Dict] = []
    n_verified = 0
    for part in reading.parts:
        core = None
        refusal: Optional[str] = None
        try:
            core = solve(part.text)
        except Exception as exc:            # a crash must never ship
            refusal = "solver error: " + type(exc).__name__
        verified = core is not None and \
            getattr(core, "label", None) in _VERIFIED_LABELS
        if verified:
            n_verified += 1
        elif core is not None and refusal is None:
            refusal = getattr(core, "refusal_reason", None)
        out.append({
            "label": part.label,
            "label_full": "(" + part.label + ")",
            "answer": getattr(core, "answer", None),
            "numeric": getattr(core, "numeric", None),
            "verified": verified,
            "refusal": refusal,
        })
    return {
        "kind": reading.kind,
        "parts": out,
        "all_verified": n_verified == len(reading.parts),
        "n_verified": n_verified,
    }
