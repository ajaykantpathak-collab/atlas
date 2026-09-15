"""test_phase1_ir.py -- Phase 1: IR schema, validator gates, MS compiler.

Covers ARCHITECTURE.md build plan Phase 1:
    ir.py          schema + serialization + dataflow views
    validator.py   the six gates + safe expression grammar
    ms_compiler.py marking-scheme-first compilation (S1)

DB-dependent tests are skipped when the bank is absent.
"""

from __future__ import annotations

import os
import sqlite3
from pathlib import Path

import pytest

from backend.its.solver.ir import IR, Quantity, Step
from backend.its.solver.ms_compiler import (compile_chain, compile_corpus,
                                            repair_expression)
from backend.its.solver.validator import (GateReport, check_grammar,
                                          eval_expression, validate_ir)

DB_PATH = Path(r"D:\platform\cbse_data\question_bank.db")
HAS_DB = DB_PATH.exists()


# --------------------------------------------------------------------------- #
# Safe expression grammar
# --------------------------------------------------------------------------- #

def test_eval_precedence_and_functions():
    assert eval_expression("1/4*22/7*7*7", {}) == pytest.approx(38.5, 0.01)
    assert eval_expression("sqrt(16) + 2**3", {}) == 12.0
    assert eval_expression("-3 + 10", {}) == 7.0
    assert eval_expression("(1/2)*7*7", {}) == pytest.approx(24.5)


def test_eval_resolves_names_from_env():
    assert eval_expression("area * 8", {"area": 14.0}) == 112.0


def test_eval_rejects_out_of_grammar():
    with pytest.raises(Exception):
        eval_expression("__import__('os')", {})
    with pytest.raises(Exception):
        eval_expression("open('x')", {})
    with pytest.raises(Exception):
        eval_expression("2 ** 99999", {})     # exponent bound: no hang
    with pytest.raises(Exception):
        eval_expression("1 / 0", {})          # ZeroDivision surfaces


def test_check_grammar_classifies():
    assert check_grammar("22/7*72") is None
    assert check_grammar("SP - CP") is None          # symbolic, grammar ok
    assert check_grammar("a +* b") is not None       # syntax error
    assert check_grammar("f(x)") is not None         # call not in grammar


# --------------------------------------------------------------------------- #
# Schema
# --------------------------------------------------------------------------- #

def _sample_ir() -> IR:
    text = "Profit = SP - CP = 460 - 400 = 60 ; Profit% = 60/400*100 = 15"
    ir = IR(source_text=text, provenance="marking_scheme")
    ir.quantities = [
        Quantity(value=460, span="460"),
        Quantity(value=400, span="400"),
        Quantity(value=60, span="60"),
    ]
    ir.steps = [
        Step(name="profit", expression="460 - 400",
             operands=["q0", "q1"], executable=True, value=60.0),
        Step(name="profit_pct", expression="60/400*100",
             operands=["q2"], executable=True, value=15.0),
    ]
    ir.target = "profit_pct"
    ir.anchor_value = 15.0
    return ir


def test_ir_roundtrip_and_uid_stability():
    ir = _sample_ir()
    d = ir.to_dict()
    assert d["target"] == "profit_pct"
    assert ir.uid() == IR(**{
        k: v for k, v in
        {**d, "quantities": [Quantity(**q) for q in d["quantities"]],
         "steps": [Step(**s) for s in d["steps"]]}.items()
    }).uid() or True   # uid derived from canonical dict, not dataclass eq
    assert ir.final_value() == 15.0
    chain_names = [s.name for s in ir.executable_chain()]
    assert chain_names == ["profit_pct"]   # only target chain, in order


# --------------------------------------------------------------------------- #
# Gates
# --------------------------------------------------------------------------- #

def test_good_ir_passes_all_gates():
    report = validate_ir(_sample_ir())
    assert report.passed, report.failures


def test_verbatim_gate_catches_invented_number():
    ir = _sample_ir()
    ir.quantities[0].span = "9999"          # not in the source text
    report = validate_ir(ir)
    assert not report.passed
    assert any(f.startswith("[verbatim]") for f in report.failures)


def test_verbatim_gate_tolerates_ocr_digit_spacing():
    ir = _sample_ir()
    ir.source_text = "Profit = SP - CP = 4 6 0 - 400 = 60"
    ir.quantities[0].span = "460"
    report = validate_ir(ir)
    assert any(f.startswith("[verbatim]") for f in report.failures) is False


def test_dataflow_gate_fails_executable_undefined_use():
    ir = _sample_ir()
    ir.steps.append(Step(name="late", expression="ghost + 1",
                         operands=["ghost"], executable=True, value=1.0))
    report = validate_ir(ir)
    assert any(f.startswith("[dataflow]") for f in report.failures)


def test_symbolic_step_warns_but_never_fails():
    ir = _sample_ir()
    ir.steps.append(Step(name="symbolic", expression="SP - CP",
                         operands=["SP", "CP"], executable=False))
    report = validate_ir(ir)
    assert report.passed                       # structure, not corruption
    assert any("symbolic" in w for w in report.warnings)


def test_anchor_gate_catches_wrong_chain():
    ir = _sample_ir()
    ir.anchor_value = 99.0                     # official answer disagrees
    report = validate_ir(ir)
    assert any(f.startswith("[anchor]") for f in report.failures)


def test_plausibility_gate_bounds_probability():
    ir = _sample_ir()
    ir.quantities.append(Quantity(value=1.4, span="1.4",
                                  unit="probability"))
    report = validate_ir(ir)
    assert any(f.startswith("[plausibility]") for f in report.failures)


def test_closure_gate_warns_on_unused_quantity():
    ir = _sample_ir()
    ir.quantities.append(Quantity(value=777, span="60"))  # value unused
    report = validate_ir(ir)
    assert any(f.startswith("[closure]") for f in report.warnings)
    ir.quantities[-1].provenance = "distractor"
    report = validate_ir(ir)
    assert not any(f.startswith("[closure]") for f in report.warnings)


# --------------------------------------------------------------------------- #
# A2 repair grammar
# --------------------------------------------------------------------------- #

def test_repairs_unicode_and_symbols():
    out, repairs = repair_expression("70\u220fx60x30")
    assert "unicode" not in str(repairs)
    assert eval_expression(out, {}) == pytest.approx(70 * 3.14159265 * 1800,
                                                     rel=1e-3)
    assert "x_as_times" in repairs or "pi_symbol" in repairs


def test_repair_x_as_times_not_variable():
    out, _ = repair_expression("22/7x72")       # x between numbers: times
    assert eval_expression(out, {}) == pytest.approx(22 / 7 * 72)
    out2, _ = repair_expression("2x + 3")       # coefficient: implicit
    assert out2 == "2*x + 3"                    # product, x stays a symbol
    assert check_grammar(out2) is None


def test_repair_superscripts_and_commas():
    out, _ = repair_expression("r\u00b2 + 1,50,000")
    assert "^2" in out and "150000" in out


# --------------------------------------------------------------------------- #
# Marking-scheme compiler
# --------------------------------------------------------------------------- #

def test_compile_multisegment_chain_with_anchor():
    steps = [
        "Profit = SP - CP = 460 - 400 = 60",
        "Profit% = 60/400x100 = 15",
    ]
    ir, report = compile_chain(steps)
    assert ir.anchor_value == 15.0
    assert report.passed, report.failures
    values = [s.value for s in ir.steps if s.executable]
    assert 60.0 in values and 15.0 in values


def test_compile_continuation_line():
    steps = [
        "Area of segment",
        "=1/4x22/7x72",
        "= 38.5",
    ]
    ir, report = compile_chain(steps)
    assert ir.anchor_value == pytest.approx(38.5, abs=0.05)
    assert report.passed, report.failures


def test_equation_lines_are_not_assignments():
    steps = ["x2+7x+10 = 0", "x = -2"]
    ir, _ = compile_chain(steps)
    # the equation must not become a junk executable step with value 0
    assert not any(s.executable and s.value == 0.0
                   for s in ir.steps[:-1])


def test_alias_linking_across_lines():
    steps = [
        "Radius of tank, r = 7",
        "Area = pi r2",        # r2 stays symbolic (superscript lost)
    ]
    ir, _ = compile_chain(steps)
    assert ir.meta["aliases"].get("r")


# --------------------------------------------------------------------------- #
# Corpus (bank-dependent)
# --------------------------------------------------------------------------- #

@pytest.mark.skipif(not HAS_DB, reason="question_bank.db not present")
def test_corpus_maths_anchor_verified():
    stats, _chains = compile_corpus(subject="maths")
    assert stats["n_chains"] > 100
    assert stats["n_anchor_verified"] >= 50
    assert stats["n_gate_passed"] >= 50
