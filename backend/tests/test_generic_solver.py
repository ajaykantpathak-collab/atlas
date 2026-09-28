"""
Contract tests for the three generic solver lanes (backend/ai/generic_solver.py).

Every expected value is either verbatim from the shipped corpus (and
independently re-checked by hand) or generated with a known answer, so a failure
means the SOLVER is wrong, not that the fixture drifted.

    python -m pytest backend/tests/test_generic_solver.py

The module is loaded by file path because importing `backend.ai.*` can pull the
heavy package chain that crashes collection on this box (see pytest.ini).
"""

from __future__ import annotations

import importlib.util
import pathlib
import sys

import pytest
import sympy as sp

_BACKEND = pathlib.Path(__file__).resolve().parent.parent
_spec = importlib.util.spec_from_file_location(
    "_generic_solver_under_test", _BACKEND / "ai" / "generic_solver.py"
)
assert _spec is not None and _spec.loader is not None
gs = importlib.util.module_from_spec(_spec)
# `@dataclass` resolves annotations through sys.modules, so the module must be
# registered BEFORE exec_module or the decorator explodes with
# "'NoneType' object has no attribute '__dict__'".
sys.modules[_spec.name] = gs
_spec.loader.exec_module(gs)


# ---------------------------------------------------------------------------
# Lane 3 — expression solver. Cases verbatim from the corpus.
# ---------------------------------------------------------------------------
class TestSolveForLinear:
    @pytest.mark.parametrize("question,expected", [
        ("Solve for x: 2x + 8 = 16.", "4"),
        ("Solve for x: 6x - 12 = 54.", "11"),
        ("Solve for x: 7x - 53 = 3.", "8"),
        ("Solve for x: 2x - -2 = 6.", "2"),
        ("Solve for x: 9x + 5 = 23.", "2"),
        ("Solve for x: 3x + 13 = 22.", "3"),
    ])
    def test_solves(self, question, expected):
        out = gs.solve_expression_question(question)
        assert out.matched, question
        assert out.answer == expected
        assert out.verification == "substitution"

    def test_no_solution_returns_miss_not_a_guess(self):
        out = gs.solve_expression_question("Solve for x: 2x + 1 = 2x + 5.")
        assert out.matched is False


class TestEvaluateExpression:
    @pytest.mark.parametrize("question,expected", [
        ("Evaluate 3x + 9 when x = 3.", "18"),
        ("Evaluate 3x + 4 when x = 5.", "19"),
        ("Evaluate 3x + 6 when x = 9.", "33"),
        ("Evaluate 3x + 4 when x = 5", "19"),
    ])
    def test_evaluates(self, question, expected):
        out = gs.solve_expression_question(question)
        assert out.matched, question
        assert out.answer == expected


class TestPolynomialAtX:
    @pytest.mark.parametrize("question,expected", [
        ("Find the value of the polynomial 2x^2 + 2x + 6 at x = 3.", "30"),
        ("Find the value of the polynomial 2x^2 + 2x + 9 at x = 3.", "33"),
        ("Find the value of the polynomial 2x^2 + 5x + 7 at x = 5.", "82"),
        ("Find the value of the polynomial 4x^2 + 1x + 4 at x = 2.", "22"),
        ("Find the value of the polynomial 2x^2 + 1x + 5 at x = 4.", "41"),
    ])
    def test_polynomial(self, question, expected):
        out = gs.solve_expression_question(question)
        assert out.matched, question
        assert out.answer == expected


class TestRatioSimplification:
    @pytest.mark.parametrize("question,expected", [
        ("Write the ratio 8 : 48 in its simplest form and give the first term "
         "of the simplest form.", "1"),
        ("Write the ratio 4 : 24 in its simplest form and give the first term "
         "of the simplest form.", "1"),
        ("Write the ratio 12 : 54 in its simplest form and give the first term "
         "of the simplest form.", "2"),
        ("Write the ratio 60 : 80 in its simplest form and give the first term "
         "of the simplest form.", "3"),
    ])
    def test_first_term_of_simplest_ratio(self, question, expected):
        out = gs.solve_expression_question(question)
        assert out.matched, question
        assert out.answer == expected


# ---------------------------------------------------------------------------
# Lane 1 — formula engine
# ---------------------------------------------------------------------------
class TestFormulaEngine:
    def test_plane_angle_from_the_corpus(self):
        out = gs.solve_with_formula(
            "For Plane Angle: given arc_length = 443, radius = 25, find theta.",
            "theta = arc_length / radius",
        )
        assert out.matched
        assert out.answer == "17.72"      # corpus stored answer
        assert out.verification == "substitution"

    def test_strips_prose_tail_from_the_formula(self):
        assert gs.clean_formula(
            "A = pi * r^2, where r is the radius of the circle") == "A = pi * r^2"

    def test_refuses_prose_formula(self):
        assert gs.clean_formula(
            "Terminating if denominator = 2^a * 5^b after simplification") is None

    def test_missing_given_is_a_miss_not_an_invention(self):
        out = gs.solve_with_formula(
            "For Plane Angle: find theta.", "theta = arc_length / radius")
        assert out.matched is False

    def test_derived_value_is_verified_against_the_equation(self):
        """Whatever comes back must satisfy the original equation."""
        out = gs.solve_with_formula(
            "For X: given arc_length = 100, radius = 10, find theta.",
            "theta = arc_length + radius",
        )
        assert out.matched is True
        assert out.answer == "110"
        assert out.verification == "substitution"

    def test_target_not_in_formula_is_a_miss(self):
        out = gs.solve_with_formula(
            "For X: given radius = 5, find perimeter.",
            "theta = arc_length / radius",
        )
        assert out.matched is False

    def test_current_is_not_sympys_imaginary_unit(self):
        """SymPy claims `I` as i. In school physics I is CURRENT.

        With I taken as the imaginary unit, `P = I**2 * R` becomes P = -R,
        which is how the app served a confident -29 for a power question whose
        real answer is 51156.
        """
        out = gs.solve_with_formula(
            "For Ohmic Power Dissipation: given I = 42, R = 29, find P.",
            "P = I**2 * R",
        )
        assert out.matched, "sympy captured I as the imaginary unit"
        assert out.answer == "51156"      # corpus stored answer

    def test_real_cell_terminal_voltage(self):
        out = gs.solve_with_formula(
            "For Terminal Voltage of a Real Cell: given emf = 238, I = 37, "
            "r = 84, find V.",
            "V = emf - I * r",
        )
        assert out.matched
        assert out.answer == "-2870"      # corpus stored answer

    def test_other_sympy_reserved_names_are_plain_symbols(self):
        """`E` (Euler), `N` (Catalan), `S`, `O` are all claimed by SymPy."""
        for name in ("I", "E", "N", "S", "O", "beta", "gamma", "zeta"):
            local = gs._local_dict(f"{name} = {name} * 2", "x = 1")
            assert isinstance(local[name], sp.Symbol), name
            assert local[name] != sp.Symbol(name).func  # not a function/constant


class TestParsers:
    def test_givens_and_target(self):
        q = "For Plane Angle: given arc_length = 443, radius = 25, find theta."
        assert gs.parse_givens(q) == {"arc_length": 443.0, "radius": 25.0}
        assert gs.parse_target(q) == "theta"

    def test_givens_ignore_non_input_numbers(self):
        # "Class 10" must not become an input.
        assert gs.parse_givens("In Class 10, given side = 7, find volume.") == {
            "side": 7.0}


# ---------------------------------------------------------------------------
# Lane 2 — concept-keyed retrieval. No fuzzy matching, by construction.
# ---------------------------------------------------------------------------
class TestConceptAnswerStore:
    @pytest.fixture()
    def store(self):
        return gs.ConceptAnswerStore([
            {
                "concept_id": "keh.1.1",
                "questions": [
                    ("What is a lever?", "A machine that multiplies force."),
                    ("Define leverage.", "The mechanical advantage of a beam."),
                ],
            },
            {
                "concept_id": "keh.2.1",
                "questions": [
                    ("What is photosynthesis?",
                     "Plants make glucose from light, water and carbon dioxide."),
                ],
            },
        ])

    def test_returns_the_answer_for_that_concept(self, store):
        out = store.answer_for("keh.1.1", "What is a lever?")
        assert out.matched
        assert out.answer == "A machine that multiplies force."
        assert out.concept_id == "keh.1.1"
        assert out.verification == "retrieved"

    def test_unknown_concept_is_a_miss(self, store):
        assert store.answer_for("keh.999", "What is a lever?").matched is False

    def test_wrong_concept_does_not_return_a_neighbour(self, store):
        """The failure that made the old bag-of-words lane unsafe: asking
        about photosynthesis must never return the lever answer."""
        out = store.answer_for("keh.999", "What is photosynthesis?")
        assert out.matched is False

    def test_store_has_no_similarity_scoring(self):
        """No fuzzy machinery may creep back in.

        Asserted STRUCTURALLY (via dir()) rather than by scanning source text.
        An earlier version of this test grepped the file for 'score' and
        'overlap' and failed twice: once because the class docstring
        deliberately contains those words while explaining their absence, and
        again because a comment matched. Source scanning tests the prose, not
        the behaviour.
        """
        members = dir(gs.ConceptAnswerStore)
        assert "lookup" not in members          # the old fuzzy entry point
        assert "score" not in members
        # The store holds no token machinery at all.
        assert "_tokens" not in members
        # And it really is keyed lookup: two concepts, two answers, no bleed.
        assert "answer_for" in members


class TestConceptIndex:
    @pytest.fixture()
    def index(self):
        return gs.ConceptIndex([
            {
                "concept_id": "keph.101.1",
                "formula": "theta = arc_length / radius",
                "questions": [("For Plane Angle: given arc_length = 443, "
                               "radius = 25, find theta.", "17.72")],
            },
            {
                "concept_id": "keh.1.1",
                "formula": "",
                "questions": [("What is a lever?", "A machine that multiplies force.")],
            },
        ])

    def test_exposes_the_stored_formula(self, index):
        assert index.formula_for("keph.101.1") == "theta = arc_length / radius"

    def test_concept_without_formula_returns_none(self, index):
        assert index.formula_for("keh.1.1") is None

    def test_unknown_node_is_a_miss(self, index):
        assert index.formula_for("nope") is None
        assert index.answer_for("nope").matched is False

    def test_numeric_question_is_computed_not_looked_up(self, index):
        """The stored answer is the NUMERIC one, so the explanation lane must
        refuse it and the formula lane must be used instead."""
        gs._INDEX = index
        try:
            out = gs.solve_for_node(
                "For Plane Angle: given arc_length = 443, radius = 25, "
                "find theta.", "keph.101.1")
            assert out.matched
            assert out.lane == "formula"          # computed, not retrieved
            assert out.answer == "17.72"
            assert out.concept_id == "keph.101.1"
        finally:
            gs._INDEX = None

    def test_prose_question_falls_through_to_the_explanation(self, index):
        gs._INDEX = index
        try:
            out = gs.solve_for_node("What is a lever?", "keh.1.1")
            assert out.matched
            assert out.lane == "retrieval"
            assert "multiplies force" in out.answer
        finally:
            gs._INDEX = None

    def test_no_index_means_miss_not_a_crash(self):
        gs._INDEX = None
        assert gs.solve_for_node("anything", "keph.101.1").matched is False


class TestLatexToSympy:
    @pytest.mark.parametrize("latex", [
        r"P = I^{2} R",
        r"A = \pi r^{2}",
        r"x = \frac{-b + \sqrt{b^2-4ac}}{2a}",
        r"growth = (N_f - N_i) / t",
        r"E = mc^2 where m is mass",
    ])
    def test_converts_to_something_sympy_can_read(self, latex):
        """Assert PARSEABILITY, not an exact string.

        Three earlier expectations were wrong and would have forced bad code:
        SymPy applies implicit multiplication, so `I**2 R` is correct and
        `I**2 * R` is not required; and a prose tail IS stripped
        (`E = mc^2 where m is mass` -> `E = mc**2`) rather than rejected.
        """
        got = gs.latex_to_sympy(latex)
        assert got is not None, latex
        assert "=" in got
        lhs, _, rhs = got.partition("=")
        # Both sides must be something SymPy accepts with our transformations.
        gs._parse_expr(lhs)
        gs._parse_expr(rhs)

    def test_fraction_keeps_numerator_and_denominator_distinct(self):
        """A one-argument substitution would turn a/b into a/a."""
        got = gs.latex_to_sympy(r"r = \frac{N_f - N_i}{t}")
        assert got is not None
        assert "Nf" in got and "Ni" in got and "t" in got
        assert "/((Nf - Ni) / (t))" not in got.replace(" ", "")

    @pytest.mark.parametrize("bad", [
        "Li < Na < K < Rb < Cs",          # inequality
        "Rational(1, 4)",                 # bare constant
        "GUG",                            # bare token
        "",
        r"V = \mathcal{E} - I r",          # UNKNOWN macro -> refuse, not guess
    ])
    def test_refuses_what_it_cannot_handle(self, bad):
        assert gs.latex_to_sympy(bad) is None


class TestFormulaBank:
    def test_candidate_ranking_prefers_name_overlap(self):
        bank = gs.FormulaBank([
            {"id": "A", "name": "population growth rate", "domain": "D",
             "expr": "r = (Nf - Ni) / t", "tokens": gs._tokens("population growth rate")},
            {"id": "B", "name": "ohm law", "domain": "D",
             "expr": "V = I * R", "tokens": gs._tokens("ohm law")},
        ])
        top = bank.candidates("compute the population growth rate for the colony")
        assert top and top[0]["id"] == "A"

    def test_unrelated_question_yields_no_candidate(self):
        bank = gs.FormulaBank([
            {"id": "A", "name": "ohm law", "domain": "D",
             "expr": "V = I * R", "tokens": gs._tokens("ohm law")},
        ])
        assert bank.candidates("tell me about the French Revolution") == []

    def test_lane_is_a_miss_when_the_bank_is_empty(self):
        gs._BANK = gs.FormulaBank([])
        out = gs.solve_from_bank("Solve for x: 2x + 8 = 16.")
        assert out.matched is False

    def test_bank_only_proposes_the_verified_solver_answers(self):
        """The safety property: a proposal that cannot be solved and
        back-substituted must return a MISS, never a guess."""
        bank = gs.FormulaBank([
            {"id": "OHM", "name": "ohm law", "domain": "D",
             "expr": "V = I * R", "tokens": gs._tokens("ohm law")},
        ])
        gs._BANK = bank
        try:
            # Mentions "ohm law" but supplies none of its variables.
            out = gs.solve_from_bank("Using ohm law, tell me about history")
            assert out.matched is False
            # Now supply them properly.
            good = gs.solve_from_bank(
                "Using the ohm law given V = 12, R = 4, find I")
            assert good.matched
            assert good.lane == "bank_formula"
            assert good.answer == "3"
        finally:
            gs._BANK = None


class TestRetrievalIsOptIn:
    def test_solve_all_refuses_retrieval_unless_asked(self):
        index = gs.ProseIndex([{
            "id": "x.1", "text": "Explain gravity to a child",
            "answer": "Things fall down because gravity pulls them.",
            "tokens": gs._tokens("Explain gravity to a child"),
        }])
        out = gs.solve_all("Explain gravity to a child", prose_index=index)
        assert out.lane == "none"
        out2 = gs.solve_all("Explain gravity to a child", prose_index=index,
                            allow_retrieval=True)
        assert out2.lane == "retrieval"

