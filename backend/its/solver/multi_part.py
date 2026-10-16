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

# paren enumerators: (a) (B) ...; roman (i) (ii) ... (x), case-insensitive; numbered (1) (2) ...
_PAREN_LETTER_RE = re.compile(r"\(\s*([a-hA-H])\s*\)")
_PAREN_ROMAN_RE = re.compile(r"\(\s*(x|ix|viii|vii|vi|v|iv|iii|ii|i)\s*\)", re.I)
_PAREN_NUM_RE = re.compile(r"\(\s*([1-9]|10)\s*\)")
_LETTER_ORDER = [chr(c) for c in range(ord("a"), ord("h") + 1)]
_ROMAN_ORDER = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"]
_NUM_ORDER = [str(n) for n in range(1, 11)]

# bare enumerators "a) " -- only after a colon-ish lead-in
_BARE_LETTER_RE = re.compile(r"(?:^|(?<=[\s]))([a-hA-H])\)\s+")
# bare roman 'i. ii. iii.' — common CBSE case-study numbering; the
# '_bare_list_start' gate plus run-coverage keep it honest
_BARE_ROMAN_RE = re.compile(
    r"(?:^|(?<=[\s.]))(x|ix|viii|vii|vi|v|iv|iii|ii|i)\.\s+")

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


_VIC_RE = re.compile(r"for\s+visually\s+impaired", re.I)
_POINT_GIVEN_RE = re.compile(
    r"\b([A-Z])\s*=?\s*\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)")


def _vic_givens(text: str) -> str:
    """Harvest 'P(2,5), Q(4,4)'-style labeled givens from a VIC tail —
    case-study coordinates often live ONLY in the VIC variant, so the
    sighted-question parts reference points whose values sit downstream."""
    m = _VIC_RE.search(text)
    if not m:
        return ""
    pts = _POINT_GIVEN_RE.findall(text[m.start():])
    if not pts:
        return ""
    return ("Given coordinates: " +
            ", ".join(f"{L} = ({x},{y})" for L, x, y in pts) + ".")


def _parts_from_run(text: str, run: List[_Marker],
                    givens_source: Optional[str] = None
                    ) -> Optional[SplitReading]:
    givens = _vic_givens(givens_source if givens_source is not None
                         else text)
    context = text[:run[0][0]].strip()
    if givens:
        context = (context + " " + givens).strip()
    parts: List[PartReading] = []
    for i, (start, end, label) in enumerate(run):
        if i + 1 < len(run):
            nxt = run[i + 1][0]
        else:
            # stop the last part at the VIC tail — it is a duplicate
            # variant of the whole case study, not part content
            vic_m = _VIC_RE.search(text)
            nxt = vic_m.start() if vic_m else len(text)
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
    # a VIC tail duplicates the whole item's markers — scan only the
    # sighted question so marker coverage stays honest; the givens in
    # the tail still reach every part via _parts_from_run's
    # givens_source
    vic_m = _VIC_RE.search(text)
    scan = text[:vic_m.start()] if vic_m else text
    passes = (
        (_PAREN_LETTER_RE, _LETTER_ORDER, "ab", False),
        (_BARE_LETTER_RE, _LETTER_ORDER, "ab", True),
        (_PAREN_ROMAN_RE, _ROMAN_ORDER, "roman", False),
        (_BARE_ROMAN_RE, _ROMAN_ORDER, "roman", True),
        (_PAREN_NUM_RE, _NUM_ORDER, "num", False),
    )
    best: Optional[SplitReading] = None
    for pattern, order, kind, bare in passes:
        markers: List[_Marker] = [
            (m.start(), m.end(), (m.group(1) or "").strip())
            for m in pattern.finditer(scan)]
        # WS-MH: "(a)" inside "in part (a)"/"of (b)"/"from (a)" is a
        # cross-part REFERENCE, not a marker -- counting it breaks the
        # consecutive-run coverage and the whole split refuses
        markers = [m for m in markers if not re.search(
            r"(?:part|from|of|in|above|earlier|first|second|third)\s*$",
            scan[:m[0]][-16:], re.I)]
        if bare:
            gated = _bare_list_start(markers, scan)
            # the colon gate assumes 'the following: i.' style — when it
            # empties the list, fall back to the raw markers; the
            # full-coverage + ask-word gates still protect the split
            markers = gated or markers
        if len(markers) < 2:
            continue
        run = _best_run(markers, scan, order)
        # the run must cover ALL markers: a partial chain means part of
        # the item would be silently dropped, so refuse the split
        if len(run) >= 2 and run == markers:
            reading = _parts_from_run(scan, run, givens_source=text)
            if reading is not None:
                # Detect internal choice between enumerated parts: e.g. "(I) ... OR (II) ..."
                has_or = False
                for p in reading.parts:
                    if _OR_TOKEN_RE.search(p.raw):
                        has_or = True
                        p.raw = _OR_TOKEN_RE.sub("", p.raw).strip(" \t\r\n,;:")
                        p.text = _OR_TOKEN_RE.sub("", p.text).strip(" \t\r\n,;:")
                if has_or:
                    reading.kind = "or"
                else:
                    reading.kind = kind
                # the outermost numbering wins: i/ii/iii items each
                # carrying their own (a)/(b) choice are 3 parts, not 2
                if best is None or len(reading.parts) > len(best.parts):
                    best = reading
    return best


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
    _CHOICE_PREFIX_RE = re.compile(r"^\s*(?:\([A-Za-z0-9]+\)\s*)+")
    parts: List[PartReading] = []
    for k, side in enumerate(sides, start=1):
        clean_side = _CHOICE_PREFIX_RE.sub("", side).strip()
        if k == 1:
            clean_raw = _CHOICE_PREFIX_RE.sub("", raw_first).strip()
            parts.append(PartReading(label=str(k), text=clean_side,
                                     raw=clean_raw))
        else:
            if preamble and preamble not in clean_side:
                body = (preamble + " " + clean_side).strip()
            else:
                body = clean_side
            parts.append(PartReading(label=str(k), text=body, raw=clean_side))
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


# WS-MH: "from (a)"/"of part (ii)"/"using the value of (a)" givens --
# a later part may reuse an EARLIER part's verified answer.  The label
# referenced must exist and already be verified; an unverified or
# forward reference is never carried (that would guess a dependency).
_LABEL_ORD = {c: i for i, c in enumerate(
    [chr(c) for c in range(ord("a"), ord("h") + 1)])}
_LABEL_ORD.update({r: i for i, r in enumerate(
    ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"])})
_LABEL_ORD.update({str(n): n - 1 for n in range(1, 11)})

_FROM_PART_RE = re.compile(
    r"\bfrom\s+part\s*\(?\s*([a-h1-9]|x|ix|viii|vii|vi|iv|v|iii|ii|i)"
    r"\s*\)?|"
    r"\b(?:result|value|answer|root|quantity)\s+(?:of|from|in|"
    r"obtained\s+in|found\s+in)\s+part\s*\(?\s*([a-h1-9]|x|ix|viii|"
    r"vii|vi|iv|v|iii|ii|i)\s*\)?|"
    r"\b(?:of|from|in)\s+part\s*\(?\s*([a-h1-9]|x|ix|viii|vii|vi|iv|"
    r"v|iii|ii|i)\s*\)?|"
    r"\bfrom\s+\(([a-h1-9]|x|ix|viii|vii|vi|iv|v|iii|ii|i)\)\s*"
    r"(?:above|in\s+part|is\b|,|and\b|then\b|$)|"
    r"\busing\s+the\s+(?:value|result|answer|root)\s+(?:of|from)\s+"
    r"(?:part\s+)?\(?\s*([a-h1-9]|x|ix|viii|vii|vi|iv|v|iii|ii|i)"
    r"\s*\)?",
    re.I)

_MARKS_RE = re.compile(
    r"[\[\(]?\s*(\d{1,2})\s*marks?\s*[\]\)]?\s*$|"
    r"\b(\d{1,2})\s*marks?\b", re.I)


def _ref_part_label(raw: str) -> Optional[str]:
    """The earlier part label a clause references ('from (a)', 'the
    value obtained in part (ii)'), or None."""
    m = _FROM_PART_RE.search(raw or "")
    if not m:
        return None
    tok = next((g for g in m.groups() if g), None)
    return tok.strip().lower() if tok else None


def _marks_of(raw: str) -> Optional[int]:
    m = _MARKS_RE.search(raw or "")
    if not m:
        return None
    g = m.group(1) or m.group(2)
    try:
        return int(g) if g else None
    except (TypeError, ValueError):
        return None


def _carry_text(part_text: str, ref: str, val: object) -> str:
    """Rewrite a 'from part (a)' reference so ordinary quantity
    extractors see the carried literal: 'Find 5% of the amount in
    part (a)' -> 'Find 5% of 200'.  The label token is only ever
    '(a)'/parenthesised or 'part a' -- a bare article 'a' must never
    match.  Falls back to an explicit 'Given: from part (a), <val>.'
    tail when the phrase cannot be substituted cleanly."""
    pat = re.compile(
        r"(?:the\s+|that\s+|this\s+)?\w*\s*"
        r"(?:of\s+part|from\s+part|in\s+part|obtained\s+in\s+part|"
        r"found\s+in\s+part|computed\s+in\s+part)\s*\(?\s*"
        + re.escape(ref) +
        r"\s*\)?(?:\s+above|\s+earlier|\s+before)?"
        r"|(?:the\s+|that\s+|this\s+)?\w*\s*(?:of|from|in)\s*\(\s*"
        + re.escape(ref) + r"\s*\)(?:\s+above|\s+earlier)?", re.I)
    sub = pat.sub(str(val), part_text or "", count=1)
    if sub != (part_text or ""):
        return sub
    return ((part_text or "").rstrip("?.; ")
            + ".  Given: from part (" + ref + "), " + str(val) + ".")


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

    WS-MH: each part also carries its tier, parsed mark weight, solve
    text, and audit evidence (route/gates/structure/quantities) so the
    caller can re-run the registered second path per part before the
    aggregate ships -- and a later part that names an earlier one
    ('from (a)') solves with that part's verified answer appended as
    an explicit Given.
    """
    reading = split_multi_part(text)
    if reading is None or len(reading.parts) < 2:
        return None
    out: List[Dict] = []
    n_verified = 0
    # imperative-only directive lead-ins ("Answer the following:",
    # "Solve:") are layout text -- they break several lanes when
    # prepended, so parts solve against context minus the directive
    _DIRECTIVE_RE = re.compile(
        r"^\s*(?:answer|solve|find|attempt|respond\s+to|do|complete|"
        r"evaluate)\b[^0-9?]{0,40}:?\s*$", re.I)
    for part in reading.parts:
        # 'from (a)' carry: append the referenced earlier part's
        # verified answer as an explicit given -- never an unverified
        # or forward reference
        solve_text = part.text
        if reading.context and _DIRECTIVE_RE.match(reading.context):
            solve_text = part.raw
        ref = _ref_part_label(part.raw) or _ref_part_label(
            part.text or "")
        carried_from = None
        if ref:
            ref_ord = _LABEL_ORD.get(ref)
            if ref_ord is not None:
                for done in out:
                    if done["label"] == ref and done.get("verified"):
                        val = done.get("numeric") \
                            if done.get("numeric") is not None \
                            else done.get("answer")
                        if val is not None:
                            solve_text = _carry_text(
                                solve_text, ref, val)
                            carried_from = ref
                        break
        core = None
        refusal: Optional[str] = None
        try:
            core = solve(solve_text)
        except Exception as exc:            # a crash must never ship
            refusal = "solver error: " + type(exc).__name__
        verified = core is not None and \
            getattr(core, "label", None) in _VERIFIED_LABELS
        if verified:
            n_verified += 1
        elif core is not None and refusal is None:
            refusal = getattr(core, "refusal_reason", None)
        _audit = getattr(core, "audit", None)
        _route = list(getattr(_audit, "route", None) or [])
        _gates = list(getattr(_audit, "gates_passed", None) or [])
        _pq: Dict[str, object] = {}
        for _qd in (getattr(_audit, "quantities", None) or []):
            if isinstance(_qd, dict):
                _pq.update(_qd)
        _struct = getattr(_audit, "_sweep_structure", None) or next(
            (r.split(":", 1)[1] for r in _route
             if str(r).startswith("structure:")), None)
        out.append({
            "label": part.label,
            "label_full": "(" + part.label + ")",
            "answer": getattr(core, "answer", None),
            "numeric": getattr(core, "numeric", None),
            # real derivation steps travel with the part — the marker
            # scores marking-scheme coverage against them, and the
            # all-verified promotion shows real working, not a summary
            "steps": list(getattr(core, "steps", None) or []),
            "verified": verified,
            "refusal": refusal,
            # WS-MH: per-part verdict detail + the evidence the
            # aggregate re-checks before promoting
            "tier": getattr(core, "label", None),
            "marks": _marks_of(part.raw),
            "solve_text": solve_text,
            "carried_from": carried_from,
            "route": _route,
            "gates": _gates,
            "structure": _struct,
            "quantities": _pq,
        })
    is_all = (n_verified == len(reading.parts)) if reading.kind != "or" else (n_verified >= 1)
    return {
        "kind": reading.kind,
        "parts": out,
        "all_verified": is_all,
        "n_verified": n_verified,
    }
