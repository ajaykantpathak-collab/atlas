"""hop_planner.py -- multi-hop and cross-subject question chaining.

A multi-hop question is ONE question whose clauses chain: an earlier
clause produces a value the next clause needs ("A bus covers 300 m in
10 s. Using this speed, how far will it go in 20 s?").  The clauses may
even belong to different subjects; each hop is routed independently, so
a maths hop can feed a physics hop.

Design, in the same spirit as multi_part.try_multi_part:

  - split_hop_clauses finds sequential structure (connectors such as
    "then", "after that", semicolons) where every clause is
    value-bearing.  Anything ambiguous refuses (None) and the ordinary
    pipeline still sees the whole text.  Explicit (a)/(b) enumerations
    are NOT touched -- multi_part owns that structure.

  - try_multi_hop solves hop 1 with the ordinary core; on a verified
    numeric answer it carries the result forward as a Given sentence
    appended to the next hop's text, so every existing quantity
    extractor (unit registry, slot schemas, families) sees it with no
    per-family changes.

  - Promotion is honest: the chain promotes only when EVERY hop is
    verified.  At the first unverified hop the chain stops -- later
    hops would silently drop a dependency if solved without the known,
    so they are recorded as skipped, never guessed.

No LLM calls anywhere.
"""

from __future__ import annotations

import re
from typing import Callable, Dict, List, Optional

# connectives mark a sequential hop.  The split happens AT the
# punctuation; the connective phrase stays with the FOLLOWING clause
# ("Using this speed, how far...") because it names the quantity the
# previous hop must produce -- the ask derivation reads it there.
_BOUNDARY_RE = re.compile(
    r"\.(?=\s*(?:then|afterwards|after\s+(?:that|this)|next|"
    r"using\s+this)\b)"
    r"|\?(?=\s*(?:then|afterwards|after\s+(?:that|this)|next|"
    r"using\s+this)\b)"
    r"|,(?=\s*(?:then|and\s+then|after\s+(?:that|this)|"
    r"using\s+this)\b)"
    r"|;(?=\s)"
    r"|\s+and\s+then\b",
    re.I)

_NUMBER_RE = re.compile(r"\d+(?:\.\d+)?")
# explicit sub-part enumerations belong to multi_part, not here
_ENUM_MARKER_RE = re.compile(
    r"(?:^|\s)\((?:[a-h]|i{1,3}|iv|v)\)|:\s*(?:i{1,3}|iv|v)\(", re.I)
# MCQ option lists and structural types are never hop chains
_OPTION_HINT_RE = re.compile(
    r"which of the following|choose the correct|match the following|"
    r"assertion\s*\(?a\)?|both a and b", re.I)
# math-structured text (equations, matrices, calculus notation) is the
# kernel's territory -- a naive clause split there corrupts the reading
_STRUCT_RE = re.compile(r"[=\[\]{]|\\int|\bdy/dx\b|\bd/dx\b")


def split_hop_clauses(text: str) -> Optional[List[str]]:
    """Split a chained question into hop clauses; None when not a chain.

    A chain needs >= 2 clauses, every clause value-bearing (a number
    or a question mark on the final ask), no explicit (a)/(b) markers,
    and no MCQ option phrasing.  A single sentence is never touched.
    """
    if not text or not text.strip():
        return None
    if _ENUM_MARKER_RE.search(text):
        return None
    if _OPTION_HINT_RE.search(text):
        return None
    if _STRUCT_RE.search(text):
        return None
    parts = [p.strip(" \t.,;") for p in _BOUNDARY_RE.split(text)]
    parts = [p for p in parts if p]
    if len(parts) < 2:
        return None
    parts = _merge_ask_only_clauses(parts)
    if len(parts) < 2:
        return None
    # every clause must be meaningful: a number somewhere, or (for the
    # final ask) a question the chain can answer
    for i, clause in enumerate(parts):
        has_number = _has_number(clause)
        is_ask = _has_ask(clause)
        if i < len(parts) - 1:
            if not has_number:
                return None
        else:
            if not (has_number or is_ask):
                return None
    return parts


# forward references that name the quantity the previous hop must
# produce: "using this speed" / "at the same speed" -> hop k asks speed
_DERIVED_ASK_RE = re.compile(
    r"\b(?:using|with|at)\s+(?:this|the\s+same|that)\s+"
    r"(speed|velocity|distance|time|amount|sum|value|area|volume|"
    r"cost|price|total|current|voltage|resistance|power|energy|mass|"
    r"concentration)\b"
    r"|\bthis\s+(speed|velocity|distance|time|amount|sum|value|area|"
    r"volume|cost|price|total)\b"
    r"|\b(?:his|her|its|their)\s+(speed|velocity|distance|time|area|"
    r"volume|cost|price|total|current|voltage|resistance|power|"
    r"energy|mass)\b", re.I)


def _has_ask(clause: str) -> bool:
    return bool(re.search(r"\b(find|how (?:far|much|long|many)|what|"
                          r"calculate|compute|determine)\b|\?",
                          clause, re.I))


def _has_number(clause: str) -> bool:
    return bool(_NUMBER_RE.search(clause))


def _ask_for(clause: str, next_clause: str) -> Optional[str]:
    """Ask sentence for a non-final clause that carries no ask of its
    own: read the quantity name off the next clause's forward
    reference, else fall back to the generic value ask."""
    if _has_ask(clause):
        return None                        # clause already asks
    m = _DERIVED_ASK_RE.search(next_clause or "")
    noun = (m.group(1) or m.group(2) or m.group(3)) if m else None
    if noun:
        return f"Find the {noun.lower()}."
    return "Find the value."


def _merge_ask_only_clauses(parts: List[str]) -> List[str]:
    """An ask-only clause (no number) merges into the previous clause
    only when that clause is a setup without an ask of its own:
    'A bus covers 300 m in 10 s. Then find its speed.' is ONE hop.
    When the predecessor already asks, the ask-only clause is a new
    hop ('... find the distance. Then find the total.')."""
    if len(parts) < 2:
        return parts
    merged = [parts[0]]
    for clause in parts[1:]:
        if (not _has_number(clause) and _has_ask(clause) and merged
                and not _has_ask(merged[-1])):
            merged[-1] = merged[-1].rstrip("?.; ") + ".  " + \
                clause.lstrip()
        else:
            merged.append(clause)
    return merged


def _known_dim_stated(known: str, clause: str) -> bool:
    """True when the carried value's dimension is already stated in the
    clause (e.g. known '600 m' vs clause mentioning '1200 m'): the
    clause's own number must win, so the stale carry is dropped."""
    try:
        from backend.its.solver.slot_schema import _extract_quantities
        kq = _extract_quantities(known) or []
        cq = _extract_quantities(clause) or []
        kdims = {q.dim for q in kq}
        cdims = {q.dim for q in cq}
        return bool(kdims & cdims)
    except Exception:
        return False


def try_multi_hop(text: str, solve: Callable[[str], object]) -> Optional[Dict]:
    """Solve chained hops with carry-forward; aggregate honestly.

    solve: callable(sub_question) -> PipelineResult.  Pass
    backend.its.solver.answer_pipeline._answer_core -- the core WITHOUT
    multi-part/hop re-entry.  Returns a promotion dict or None:

        {"kind": "chain",
         "hops": [{"index": 0, "text": ..., "answer": ..., 
                   "numeric": ..., "verified": bool,
                   "refusal": str|None, "skipped": bool}, ...],
         "all_verified": bool, "n_verified": int}

    Carry-forward: once hop k is verified with a numeric answer, hop
    k+1 is solved with '.  Given: from the previous step, <answer>'
    appended, so quantity extraction sees the value with its unit.
    all_verified is True only when every hop is VERIFIED*; the chain
    stops at the first failure and later hops are marked skipped.
    """
    clauses = split_hop_clauses(text)
    if clauses is None:
        return None
    _VERIFIED = ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS",
                 "VERIFIED_OFFICIAL")
    hops: List[Dict] = []
    n_verified = 0
    knowns: List[str] = []          # every verified answer so far
    broken = False
    for i, clause in enumerate(clauses):
        if broken:
            # a failed/missing earlier hop stops the chain: later hops
            # would silently drop a dependency
            hops.append({"index": i, "text": clause, "answer": None,
                         "numeric": None, "verified": False,
                         "refusal": "chain broken at an earlier hop",
                         "skipped": True})
            continue
        sub = clause
        ask = _ask_for(clause, clauses[i + 1] if i + 1 < len(clauses)
                       else "")
        if ask:
            sub = sub.rstrip("?.; ") + ".  " + ask
        if knowns:
            # Carry knowns AFTER the clause, minus the dimensions the
            # clause already states itself: quantity extractors keep
            # the last value per dimension, so an unfiltered carry
            # would overwrite the clause's own numbers (a carried
            # "600 m" must not beat the clause's "1200 m").
            kept = [k for k in knowns if not _known_dim_stated(k, clause)]
            if kept:
                sub = sub.rstrip("?.; ") + ".  Given: from the " \
                      "previous steps, " + "; ".join(kept) + "."
        core = None
        refusal: Optional[str] = None
        try:
            core = solve(sub)
        except Exception as exc:            # a crash must never ship
            refusal = "solver error: " + type(exc).__name__
        verified = core is not None and \
            getattr(core, "label", None) in _VERIFIED
        numeric = getattr(core, "numeric", None)
        answer = getattr(core, "answer", None)
        if verified and numeric is not None:
            n_verified += 1
            knowns.append(str(answer if answer is not None else numeric))
        else:
            # unverifiable, or verified without a number: the next hop
            # cannot depend on this one, so the chain stops here
            broken = True
            if verified:
                n_verified += 1
            elif core is not None and refusal is None:
                refusal = getattr(core, "refusal_reason", None)
        hops.append({"index": i, "text": clause, "answer": answer,
                     "numeric": numeric, "verified": verified,
                     "refusal": refusal, "skipped": False})
    return {"kind": "chain", "hops": hops,
            "all_verified": n_verified == len(clauses),
            "n_verified": n_verified}
