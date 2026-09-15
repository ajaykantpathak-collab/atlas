"""ms_compiler.py -- S1 marking-scheme-first IR compilation.

Parse the OFFICIAL MARKING SCHEME chains (telegraphic, formula-dense,
answer attached -- an order of magnitude easier than prose) into
validated IR.  Every compiled chain is executed by the safe evaluator
and residual-checked against its own official final value: the scheme
grades itself.  This corpus is the ground truth that trains and gates
every later parser (ARCHITECTURE.md 17.S1).

Pipeline per (doc_id, qno):

    raw steps
      -> A2 repair grammar (unicode minus, pi, sqrt, degrees, lost
         superscripts, 'x'-as-times vs 'x'-as-variable)
      -> chain split: 'Name = expr' assignments in order
      -> operand resolution: names defined earlier, numbers as literals
      -> safe evaluation of every fully-numeric step
      -> anchor: last official value in the chain must be reproduced
      -> IR + GateReport

Output: IRs pass validate_ir() with provenance='marking_scheme'.
"""

from __future__ import annotations

import re
import sqlite3
from pathlib import Path
from typing import Dict, List, Optional, Tuple

from backend.its.solver.ir import IR, Quantity, Step
from backend.its.solver.validator import (GateReport, eval_expression,
                                          validate_ir)

DB_PATH = Path(r"D:\platform\cbse_data\question_bank.db")

# --------------------------------------------------------------------------- #
# A2 repair grammar -- applied to expressions only, never silently to the
# stored source text.  Each repair is recorded on the step.
# --------------------------------------------------------------------------- #

_REPLACEMENTS: List[Tuple[str, str, str]] = [
    # (pattern, replacement, repair-tag)
    (r"[\u2212\u2013\u2014]", "-", "unicode_minus"),
    (r"[\u220f\u03c0]", "pi", "pi_symbol"),
    (r"\u221a", "sqrt", "sqrt_symbol"),
    (r"[\u00b0\u02da\u02c6]", "", "degree_mark"),
    (r"\u00bd", "(1/2)", "half_symbol"),
    (r"\u00b2", "^2", "superscript2"),
    (r"\u00b3", "^3", "superscript3"),
    (r"\u207b\u00b9", "^-1", "superscript_neg1"),
    (r"(?<=\d),(?=\d)", "", "digit_comma"),
    (r"(?<=\d)\s*(?:rs\.?|rupees)\b", " ", "rs_prefix"),
    (r"\b ?(approximately|approx\.?|nearly)\b", " ", "approx_word"),
    (r"[·\u00d7]", "*", "times_symbol"),
    (r"[\u2026]+", " ", "ellipsis"),
    (r"[-]+-+[-\s]*\(\d+\)", " ", "dashed_marker"),
]

# trailing unit suffixes after a value ('= 38.5 cm') -- recorded as a
# repair, value kept; units are semantics for the validator, noise for
# the arithmetic.  Multi-letter units match case-insensitively; single
# letters (h, m, g, s) are lowercase-ONLY so variables (H, M, G, S)
# survive -- real unit notation is lowercase.
_UNIT_SUFFIX_MULTI = re.compile(
    r"(?<=\d)\s*(?:cm2|cm3|m2|m3|km2|km3|km|cm|mm|kg|mg|ms|min|sec|hrs|hr|"
    r"in|ft|lb)\b\.?", re.I)
_UNIT_SUFFIX_SINGLE = re.compile(
    r"(?<=\d)\s+(?:h|m|g|s)\b\.?")

# discourse prefixes carrying a display equation ('So we have x = 4',
# 'Then the slope m = 2/3'): strip the words, keep the assignment
_DISCOURSE = re.compile(
    r"^(?:so|then|hence|thus|therefore|we\s+(?:have|get|find|obtain)|"
    r"which\s+(?:gives|means)|this\s+gives|substituting|simplifying|"
    r"adding|subtracting|multiplying|dividing|combining|solving|"
    r"rearranging|integrating|differentiating)\b[,:]?\s+",
    re.I)

_NAME_RE = re.compile(r"^[A-Za-z][A-Za-z0-9_]*$")


def repair_expression(expr: str) -> Tuple[str, List[str]]:
    """Normalize OCR damage in an expression fragment."""
    repairs: List[str] = []
    out = expr
    for pat, rep, tag in _REPLACEMENTS:
        if re.search(pat, out, flags=re.I if "rs" in pat else 0):
            out = re.sub(pat, rep, out,
                         flags=re.I if "rs" in pat else 0)
            repairs.append(tag)
    # 'x'-as-times: previous char digit / ')' / trailing 'i' (pi), next
    # char a value -- but never '2x + 3' where x is a variable followed
    # by an operator (that becomes an implicit product instead).
    # Runs BEFORE the pi joins so 'pi x 60' -> 'pi*60', not 'pi*x60'.
    times = re.compile(r"([\d)i])\s*x\s*(?=[\d(a-zA-Z(])")
    if times.search(out):
        out = times.sub(r"\1*", out)
        repairs.append("x_as_times")
    # pi joins: '70 pi' -> '70*pi', 'pi 7'/'pi r2'/'pi(' -> 'pi*...'
    if re.search(r"(?<=\d)\s*pi\b", out) or re.search(
            r"\bpi\s*(?=[\d(A-Za-z(])", out):
        out = re.sub(r"(?<=\d)\s*pi\b", "*pi", out)
        out = re.sub(r"\bpi\s*(?=[\d(A-Za-z(])", "pi*", out)
        repairs.append("pi_join")
    # trailing unit suffix on a value ('38.5 cm') -- unit semantics
    # belong to the quantity, not the arithmetic.  Runs BEFORE the
    # implicit-product pass so '5 m' is metres, not 5*m.
    out3 = _UNIT_SUFFIX_MULTI.sub("", out)
    if out3 == out:
        out3 = _UNIT_SUFFIX_SINGLE.sub("", out)
    if out3 != out:
        repairs.append("unit_suffix")
        out = out3.rstrip()
    # implicit digit-letter product: '7H' -> '7*H', '2x' -> '2*x'
    out2 = re.sub(r"(?<=\d)(?=[A-Za-z](?![A-Za-z0-9]))", "*", out)
    if out2 != out:
        repairs.append("implicit_digit_var_product")
        out = out2
    return out.strip(" .,"), repairs


def slugify(name: str) -> str:
    """'Volume of water flowing in 60 sec' -> 'volume_of_water_flowing_in_60_sec'."""
    s = re.sub(r"[^A-Za-z0-9]+", "_", name.lower()).strip("_")
    return s[:80] or "step"


# --------------------------------------------------------------------------- #
# Chain splitting: turn marking-step text lines into assignments
# --------------------------------------------------------------------------- #

_ASSIGN_RE = re.compile(
    r"^(?P<lhs>[^=]{1,80}?)\s*=\s*(?P<rhs>.+)$")
_NUM_TOKEN_RE = re.compile(r"-?\d+(?:\.\d+)?")
# an assignment's LHS must be a NAME (words, letters, digits, spaces,
# simple subscripts like n(Mg)) -- 'Area of segment', 'CP', 'x', 'n'.
# An LHS carrying arithmetic operators or standalone numbers marks an
# EQUATION line ('x^2+7x+10=0'): structure to solve, not dataflow.
_PLAIN_NAME_LHS = re.compile(r"^[A-Za-z][A-Za-z0-9 _\.\(\),%]{0,60}$")


def _step_name(lhs: str, taken: Dict[str, int]) -> str:
    base = slugify(lhs)
    if not _NAME_RE.match(base):
        base = "step"
    n = taken.get(base, 0)
    taken[base] = n + 1
    return base if n == 0 else f"{base}_{n + 1}"


def _extract_official_value(rhs: str) -> Optional[float]:
    """Trailing '= 112' or lone final number in a repaired rhs."""
    tail = rhs.split("=")[-1]
    m = _NUM_TOKEN_RE.search(tail.replace(" ", ""))
    if m:
        try:
            return float(m.group(0))
        except ValueError:
            return None
    return None


def compile_chain(step_texts: List[str], source_text: str = "",
                  question_id: Optional[int] = None) -> Tuple[IR, GateReport]:
    """Compile one marking-scheme chain (all steps of one question)."""
    ir = IR(source_text=source_text or "\n".join(step_texts),
            provenance="marking_scheme", question_id=question_id)
    taken: Dict[str, int] = {}
    env: Dict[str, float] = {}
    alias_to_slug: Dict[str, str] = {}
    ir.meta["aliases"] = alias_to_slug
    last_lhs: Optional[str] = None

    for raw in step_texts:
        line = raw.strip()
        if len(line) < 4 or "=" not in line:
            # a bare name line ('Area of segment') is a pending LHS for
            # the continuation lines that follow ('= 38.5')
            if _PLAIN_NAME_LHS.match(line):
                last_lhs = line
            continue

        # continuation lines ('= 1/4 x 22/7 x 72 - ...') extend the
        # previous assignment with refinement segments
        if line.startswith("=") and last_lhs is not None:
            m_cont = True
            lhs, rhs = last_lhs, line.lstrip("= \t")
        else:
            m_cont = False
            line = _DISCOURSE.sub("", line, count=1)
            m = _ASSIGN_RE.match(line)
            if not m:
                continue
            lhs, rhs = m.group("lhs").strip(), m.group("rhs").strip()
            if not _PLAIN_NAME_LHS.match(lhs):
                continue          # equation line, not an assignment
            last_lhs = lhs
        if not _NUM_TOKEN_RE.search(rhs) and not re.search(
                r"[A-Za-z]", rhs):
            continue

        # multi-'=' refinement: 'Profit = SP - CP = 460 - 400 = 60'
        # every segment becomes its own step (refinement chain), the
        # symbol-bearing ones stay symbolic -- structure is preserved
        rhs_parts = ([rhs] + [p.strip() for p in rhs.split("=")
                              if p.strip()]
                     if not m_cont
                     else [p.strip() for p in ("=" + rhs).split("=")
                           if p.strip()])
        prev_segment: Optional[Step] = None

        for part in rhs_parts:
            repaired, repairs = repair_expression(part)
            if not repaired:
                continue
            repaired = _strip_prose(repaired)
            if not repaired:
                continue
            # link cross-line references: rewrite raw symbols ('H') to
            # the slug of the step that defined them ('..._h')
            def _link(m: "re.Match") -> str:
                tok = m.group(0)
                return alias_to_slug.get(tok, tok)
            repaired = re.sub(r"\b[A-Za-z_][A-Za-z0-9_]*\b", _link,
                              repaired)
            try:
                eval_expression(repaired, env)   # grammar + numeric probe
                symbolic = False
            except KeyError:
                symbolic = True                   # accepted grammar, name gap
            except Exception:
                continue                          # not arithmetic at all

            name = _step_name(lhs, taken)
            operands: List[str] = []
            executable = not symbolic
            value: Optional[float] = None
            is_value_echo = False
            if not symbolic:
                try:
                    value = eval_expression(repaired, env)
                except Exception:
                    executable, value = False, None

            # refinement echo: a later segment that is just the previous
            # segment's value becomes a REFERENCE step, so the dataflow
            # edge exists (22/7*7*7 = 154 -> area, area_2 = area)
            if (executable and value is not None
                    and prev_segment is not None
                    and prev_segment.executable
                    and _NUM_TOKEN_RE.fullmatch(repaired)
                    and abs(value - (prev_segment.value or 0)) < 1e-9):
                is_value_echo = True

            if is_value_echo:
                operands = [prev_segment.name]
                repaired = prev_segment.name
                repairs = list(repairs) + ["value_echo"]
            else:
                for tok in dict.fromkeys(re.findall(
                        r"[A-Za-z_][A-Za-z0-9_]*", repaired)):
                    if tok in ("sqrt", "pi"):
                        continue
                    operands.append(tok)
                for lit in _NUM_TOKEN_RE.findall(repaired):
                    try:
                        v = float(lit)
                    except ValueError:
                        continue
                    span = (lit if lit in (ir.source_text or line)
                            else line)
                    ir.quantities.append(Quantity(value=v, span=span[:60],
                                                  provenance="given"))
                    operands.append(f"q{len(ir.quantities) - 1}")

            step = Step(name=name, expression=repaired, operands=operands,
                        value=value, executable=executable, repairs=repairs)
            ir.steps.append(step)
            prev_segment = step
            if executable and value is not None:
                env[name] = value
                # register the lhs's trailing symbol ('..., h' -> 'h')
                # and short symbols ('H') as aliases for this step
                am = re.search(r"(?:^|[,=\s])([A-Za-z]{1,3})$", lhs)
                for alias in {slugify(lhs), am.group(1) if am else ""}:
                    if alias and len(alias) <= 3:
                        alias_to_slug[alias] = name

    # target = last executable step; anchor = its value (self-anchoring)
    for step in reversed(ir.steps):
        if step.executable and step.value is not None:
            ir.target = step.name
            ir.anchor_value = step.value
            break
    report = validate_ir(ir)
    return ir, report


def _strip_prose(expr: str) -> str:
    """Drop leading/trailing words that are not part of the arithmetic.

    Only trims tokens that are pure alphabetic words longer than 3 chars
    at the ENDS of the fragment -- inner words stay (they may be symbols
    or sink into 'symbolic' status naturally).
    """
    toks = expr.split()
    while toks and re.fullmatch(r"[A-Za-z]{4,}", toks[0]) \
            and toks[0] not in ("sqrt", "half"):
        toks = toks[1:]
    while toks and re.fullmatch(r"[A-Za-z]{4,}", toks[-1]) \
            and toks[-1] not in ("sqrt",):
        toks = toks[:-1]
    return " ".join(toks)


# --------------------------------------------------------------------------- #
# Corpus compilation over the bank
# --------------------------------------------------------------------------- #


def compile_corpus(limit: Optional[int] = None,
                   subject: Optional[str] = None
                   ) -> Tuple[Dict, Dict[Tuple[int, str], List[str]]]:
    """Compile marking-scheme chains from the bank.  Returns (stats, chains).

    stats counts chains at each quality tier; chains maps (doc_id, qno)
    to its raw step texts so callers can re-compile selected chains.
    """
    conn = sqlite3.connect(str(DB_PATH))
    sql = ("SELECT doc_id, qno, text FROM marking_steps "
           "JOIN documents ON documents.id = marking_steps.doc_id "
           "WHERE 1=1")
    params: List = []
    if subject:
        sql += " AND documents.subject = ?"
        params.append(subject)
    if limit:
        sql += " LIMIT ?"
        params.append(limit)
    rows = conn.execute(sql, params).fetchall()
    conn.close()

    chains: Dict[Tuple[int, str], List[str]] = {}
    for doc_id, qno, text in rows:
        chains.setdefault((doc_id, str(qno)), []).append(text)

    stats = {"n_chains": 0, "n_compiled": 0, "n_executable": 0,
             "n_multistep": 0, "n_anchor_verified": 0,
             "n_gate_passed": 0}
    for (doc_id, qno), texts in chains.items():
        stats["n_chains"] += 1
        try:
            ir, report = compile_chain(texts, question_id=doc_id)
        except Exception:
            continue
        if not ir.steps:
            continue
        stats["n_compiled"] += 1
        exec_steps = [s for s in ir.steps if s.executable]
        if exec_steps:
            stats["n_executable"] += 1
        # genuine multi-step chains: an executable step consumes another
        # STEP's value (not just text literals)
        step_names = {s.name for s in ir.steps}
        if any(not sn.startswith("q") and sn in step_names
               for s in exec_steps for sn in s.operands):
            stats["n_multistep"] += 1
        if ir.anchor_value is not None and report.passed:
            stats["n_anchor_verified"] += 1
        if report.passed:
            stats["n_gate_passed"] += 1
    return stats, chains


if __name__ == "__main__":
    import json

    stats, _chains = compile_corpus(subject="maths")  # type: ignore
    print(json.dumps(stats, indent=2))
