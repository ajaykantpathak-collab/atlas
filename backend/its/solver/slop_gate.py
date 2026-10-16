"""slop_gate.py -- the antislop scrub on every student-facing solver string.

Phase-1 "ice" infrastructure (BUILD_ORDER.md 1.3): slop strings cannot reach
students unflagged.  The gate scans any student-facing generated string for

  1. sam-paech's antislop lists (antislop-sampler):
       - slop_phrases_2025-04-07.json  (2,500 over-represented phrases)
       - slop_words_2025-04-07.json    (2,000 over-represented words)
       - slop_regexes.txt              (3 structural slop regexes)
  2. the platform ban list (owner law, see BUILD_ORDER 2.4):
       - "Lane C" / "variable binding" (machine-language)
       - raw LaTeX delimiters \\[ \\] \\( \\) and \\triangle
       - internal node ids matching c<digits>_<subj>_...
       - "the student" third-person voice  ->  "you"
       - "NaN"
       - 15-digit floats (unrounded compute junk)

and returns (clean_text, flags).  On the student audience the ban-list items
are REWRITTEN in place (they are mechanical artifacts, safe to transform);
antislop phrase/word hits are FLAGGED but left in place (they may be the
honest word for the idea -- the flag routes them to review/telemetry, the
gate never silently rewrites real content).

Fail-open contract: gate_result() swallows every internal error and returns
the input untouched -- a broken gate must never take the answer path down
(scrub waves PARKED by owner decision are enforced here, not by crashes).

Wire-in (single choke point): backend.its.solver.answer_pipeline.answer()
wraps its result with gate_result() before returning; every serving path
(tutor, page solve, healing router, paper mode, flywheel) goes through it.
"""

from __future__ import annotations

import json
import os
import re
import sys
from typing import Any, Dict, List, Optional, Tuple

_LISTS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                          "slop_lists")

# --------------------------------------------------------------------------- #
# Pattern compilation (lazy singletons; regex build is ~100ms once)
# --------------------------------------------------------------------------- #

_PHRASE_RX_LIT: Optional[re.Pattern] = None
_WORD_RX_LIT: Optional[re.Pattern] = None
_STRUCT_RX: Optional[re.Pattern] = None
_BAN_RX: Optional[re.Pattern] = None
_FLOAT_RX: Optional[re.Pattern] = None
_LONGINT_RX: Optional[re.Pattern] = None
_LOAD_ERROR: Optional[str] = None


def _apostrophe(phrase: str) -> str:
    """Straight/curly apostrophes both match (probe already normalizes curly)."""
    return phrase.replace("'", "['\u2019]")


def _load_lists() -> None:
    """Compile the antislop + ban patterns once.  A missing list degrades to
    the ban list only (the platform bans are hardcoded, not file-fed).

    The phrase/word patterns are PLAIN LITERALS matched against a
    whitespace-collapsed lowercase probe (see gate_text) — literal
    alternatives keep the scan linear-ish; \\s+ joiners + case-insensitive
    matching over long answers cost ~200ms/8KB in backtracking."""
    global _PHRASE_RX_LIT, _WORD_RX_LIT, _STRUCT_RX, _BAN_RX
    global _FLOAT_RX, _LONGINT_RX
    global _LOAD_ERROR
    if _BAN_RX is not None:
        return
    try:
        with open(os.path.join(_LISTS_DIR, "slop_phrases_2025-04-07.json"),
                  encoding="utf-8") as f:
            phrases = [p for p, _n in json.load(f)]
        phrases.sort(key=len, reverse=True)
        if phrases:
            _PHRASE_RX_LIT = re.compile(
                r"\b(?:" + "|".join(
                    _apostrophe(re.escape(p.lower())) for p in phrases)
                + r")\b")
    except Exception as e:  # noqa: BLE001 -- fail-open by design
        _LOAD_ERROR = f"phrases: {e}"
    try:
        with open(os.path.join(_LISTS_DIR, "slop_words_2025-04-07.json"),
                  encoding="utf-8") as f:
            words = [w for w, _n in json.load(f)]
        words.sort(key=len, reverse=True)
        if words:
            _WORD_RX_LIT = re.compile(
                r"\b(?:" + "|".join(re.escape(w.lower()) for w in words)
                + r")\b")
    except Exception as e:  # noqa: BLE001
        _LOAD_ERROR = (_LOAD_ERROR or "") + f" words: {e}"
    try:
        with open(os.path.join(_LISTS_DIR, "slop_regexes.txt"),
                  encoding="utf-8") as f:
            rx_lines = [ln.strip().strip('"').strip("'")
                        for ln in f if ln.strip()]
        # each line carries its own (?i) prefix; python 3.11+ forbids inline
        # global flags mid-pattern, so strip them and compile the union with re.I
        bodies = [re.sub(r"^\(\?i\)", "", ln) for ln in rx_lines]
        if bodies:
            _STRUCT_RX = re.compile("(?:" + "|".join(bodies) + ")", re.I)
    except Exception as e:  # noqa: BLE001
        _LOAD_ERROR = (_LOAD_ERROR or "") + f" regexes: {e}"

    # -- platform ban list (hardcoded owner law; never file-dependent) --
    _BAN_RX = re.compile(
        r"\(?Lane\s?C\)?"                     # internal lane name
        r"|\bvariable[- ]binding\b"           # machine-speak
        r"|\\triangle\b"                      # raw LaTeX command
        r"|\\[()\[\]]"                        # raw LaTeX display/inline delims
        r"|\bc\d{1,2}_[a-z0-9]+_[a-z0-9]+(?:_[a-z0-9]+)*\b"  # node ids
        r"|\bthe student\b"                   # third-person voice
        r"|\bNaN\b",                          # machine artifact
        re.I)
    _FLOAT_RX = re.compile(r"\b\d+\.\d{10,}\b")     # >=10 decimal places
    _LONGINT_RX = re.compile(r"\b\d{15,}\b")        # 15+ digit integer runs


def _decap_replace(match: re.Match, replacement: str) -> str:
    """Keep the original's initial capitalisation when swapping voice."""
    m = match.group(0)
    if m[:1].isupper():
        return replacement[:1].upper() + replacement[1:]
    return replacement


def _fix_floats(text: str) -> Tuple[str, int]:
    """15-digit compute junk -> 4-decimal student number."""
    hits = 0

    def _round(m: re.Match) -> str:
        nonlocal hits
        hits += 1
        try:
            return f"{float(m.group(0)):.4f}"
        except Exception:  # noqa: BLE001
            return m.group(0)

    return _FLOAT_RX.sub(_round, text), hits


# --------------------------------------------------------------------------- #
# Public API
# --------------------------------------------------------------------------- #

def gate_text(text: str, audience: str = "student") -> Tuple[str, List[Dict[str, Any]]]:
    """Scan one student-facing string.  Returns (clean_text, flags).

    flags entries: {"kind": antislop_phrase|antislop_word|antislop_regex|
    ban_lane_c|ban_variable_binding|ban_latex|ban_node_id|ban_third_person|
    ban_nan|float_precision|long_int_run, "match": str, "count": int,
    "rewritten": bool}
    """
    _load_lists()
    flags: List[Dict[str, Any]] = []
    if not isinstance(text, str) or not text:
        return text, flags
    clean = text
    rewritten_any = False

    # ---- display normalizer (render-fix wave, 2026-10-04) ----------------
    # Whole-sentence pipeline-phrase recasts, LaTeX -> Unicode, markdown
    # strip, float junk -> student numbers, NaN/None -> em dash, authoring
    # voice -> second person.  Runs FIRST so whole-sentence recasts see
    # intact sentences; the ban rewrites below then act as a safety net.
    if audience == "student":
        try:
            try:  # package import (platform runtime)
                from backend.services.display_scrub import \
                    normalize_student_text as _normalize
            except ImportError:  # legacy flat import path
                from services.display_scrub import \
                    normalize_student_text as _normalize  # type: ignore
            normalized = _normalize(clean)
            if normalized != clean:
                flags.append({"kind": "normalized_display", "match": "",
                              "count": 1, "rewritten": True})
                clean = normalized
                rewritten_any = True
        except Exception as _norm_err:  # noqa: BLE001 -- fail-open by design
            print(f"[slop_gate] normalize failed open: {_norm_err}",
                  file=sys.stderr)

    # ---- ban-list scan (flagged for every audience) ----------------------
    _load_lists()
    ban_specs = (
        (r"\(?\bLane\s?C\)?", "ban_lane_c", "", True),
        (r"\bvariable[- ]binding\b", "ban_variable_binding",
         "giving each value a role", True),
        (r"\\triangle\b", "ban_latex", "triangle", True),
        (r"\\[()\[\]]", "ban_latex", "", True),
        (r"\bc\d{1,2}_[a-z0-9]+_[a-z0-9]+(?:_[a-z0-9]+)*\b",
         "ban_node_id", "", True),
        (r"\bthe student\b", "ban_third_person", "you", True),
        (r"\bNaN\b", "ban_nan", "undefined", False),
    )
    n = len(_BAN_RX.findall(clean))
    if n:
        for pat, kind, repl, decap in ban_specs:
            this = re.compile(pat, re.I)
            hits = this.findall(clean)
            if not hits:
                continue
            before = clean
            if audience == "student":
                if decap:
                    clean = this.sub(
                        lambda m, _r=repl: _decap_replace(m, _r), clean)
                else:
                    clean = this.sub(repl, clean)
            flags.append({"kind": kind, "match": hits[0],
                          "count": len(hits),
                          "rewritten": clean != before})
            if clean != before:
                rewritten_any = True
        if audience == "student":
            pre_strip = clean
            clean = re.sub(r"[ \t]{2,}", " ", clean).strip()
            rewritten_any = rewritten_any or (clean != pre_strip)

    # ---- numeric junk (any audience; student rewrites) --------------------
    if audience == "student":
        fclean, fhits = _fix_floats(clean)
        if fhits:
            flags.append({"kind": "float_precision", "match": "", "count": fhits,
                          "rewritten": True})
            clean = fclean
            rewritten_any = True
        li = _LONGINT_RX.findall(clean)
        if li:
            flags.append({"kind": "long_int_run", "match": li[0],
                          "count": len(li), "rewritten": False})

    # ---- antislop flags (never rewritten) --------------------------------
    # Match on a whitespace-collapsed lowercase PROBE with plain literal
    # alternatives: scanning 2500 alternations with \s+ joiners over an 8KB
    # answer costs ~200ms of backtracking per string; literal alternatives on
    # a normalized probe are ~20x cheaper. Flags carry no offsets, so the
    # normalized copy is sound. Rewrites (above) still run on the original.
    probe = re.sub(r"\s+", " ", clean).lower().replace("\u2019", "'")
    if _PHRASE_RX_LIT is not None:
        seen: Dict[str, int] = {}
        for m in _PHRASE_RX_LIT.finditer(probe):
            seen[m.group(0)] = seen.get(m.group(0), 0) + 1
        for match, count in seen.items():
            flags.append({"kind": "antislop_phrase", "match": match,
                          "count": count, "rewritten": False})
    if _WORD_RX_LIT is not None:
        seen_w: Dict[str, int] = {}
        for m in _WORD_RX_LIT.finditer(probe):
            seen_w[m.group(0)] = seen_w.get(m.group(0), 0) + 1
        for match, count in seen_w.items():
            flags.append({"kind": "antislop_word", "match": match,
                          "count": count, "rewritten": False})
    if _STRUCT_RX is not None:
        for m in _STRUCT_RX.finditer(clean):
            flags.append({"kind": "antislop_regex", "match": m.group(0)[:60],
                          "count": 1, "rewritten": False})
            break  # structural regexes overlap heavily; one hit is signal enough
    if _LOAD_ERROR and not flags:
        flags.append({"kind": "gate_lists_degraded", "match": _LOAD_ERROR,
                      "count": 1, "rewritten": False})
    return clean, flags


def gate_result(result: Any) -> Any:
    """Apply the gate to every student-facing string of a PipelineResult.

    Fails open: any error returns the result untouched.  Flags land on
    result.audit.slop_flags (list) for telemetry, and "slop_gate" is appended
    to audit.gates_passed when the gate ran clean-ish.
    """
    try:
        flags: List[Dict[str, Any]] = []

        def _one(s: Optional[str]) -> Optional[str]:
            if not isinstance(s, str) or not s:
                return s
            cleaned, fl = gate_text(s)
            flags.extend(fl)
            return cleaned

        result.answer = _one(result.answer)
        if result.steps:
            result.steps = [
                _one(s) if isinstance(s, str) else s for s in result.steps]
        if result.refusal_reason:
            result.refusal_reason = _one(result.refusal_reason)
        # RECURSIVE WALK (wave98): socratic payloads nest arbitrary
        # teaching structures (understood maps, board_steps, exemplar
        # dicts) — a shallow one-level scrub let ids and internal voice
        # slip through nested dicts/lists.  Fetch-key field names and
        # pure-id values stay opaque transports (owner law 2026-09-29);
        # everything else is display text.
        _fetch_key = None
        _pure_id = None
        try:
            try:
                from backend.services.display_scrub import (
                    _is_fetch_key as _fetch_key,
                    _looks_like_id_list as _pure_id)
            except ImportError:
                from services.display_scrub import (
                    _is_fetch_key as _fetch_key,          # type: ignore
                    _looks_like_id_list as _pure_id)      # type: ignore
        except Exception:  # noqa: BLE001 -- scrub without fetch-key rules
            _fetch_key = _pure_id = None

        def _walk(v: Any, key: Any = None) -> Any:
            if isinstance(v, str):
                if key is not None and _fetch_key and _fetch_key(key):
                    return v
                if _pure_id and _pure_id(v):
                    return v
                return _one(v)
            if isinstance(v, dict):
                return {k: _walk(x, k) for k, x in v.items()}
            if isinstance(v, (list, tuple)):
                return type(v)(_walk(x, key) for x in v)
            return v

        if isinstance(result.socratic, dict):
            result.socratic = {
                k: _walk(v, k) for k, v in result.socratic.items()}
        if flags:
            try:
                existing = getattr(result.audit, "slop_flags", None)
                result.audit.slop_flags = (existing or []) + flags
            except Exception:  # noqa: BLE001 -- audit trail must never break serving
                pass
        else:
            try:
                result.audit.gates_passed.append("slop_gate")
            except Exception:  # noqa: BLE001
                pass
        return result
    except Exception:  # noqa: BLE001 -- fail-open, always
        return result


if __name__ == "__main__":  # manual smoke
    demo = ("The student should note that \\triangle ABC has area "
            "c10_bio_cbse_01_001 = 3.14159265358979311 (Lane C needs "
            "variable binding). Value is NaN.")
    clean, fl = gate_text(demo)
    print("CLEAN:", clean)
    for f in fl:
        print("FLAG:", f)

# Compile at import so the ~300ms regex build lands on backend boot (the
# preload imports every solver module), never on a student's first answer.
_load_lists()
