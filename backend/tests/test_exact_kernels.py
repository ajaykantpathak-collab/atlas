"""Focused contract tests for the deliberately narrow exact kernels."""

import pytest

from backend.its.solver.exact_kernels import compute_exact


def test_exact_arithmetic_and_decimal_cross_check():
    result = compute_exact("Evaluate (2 + 3) * 4 / 5")
    assert result["answer"] == "4"
    assert result["route"] == "exact_arithmetic"
    assert any("Decimal" in check for check in result["checks"])


def test_arithmetic_fraction_and_zero_denominator():
    assert compute_exact("Evaluate 1 / 3")["answer"] == "1/3"
    with pytest.raises(ValueError, match="zero"):
        compute_exact("Evaluate 4 / (2 - 2)")


def test_arithmetic_suffix_injection_and_resource_bounds():
    with pytest.raises(ValueError):
        compute_exact("Evaluate 2 + 2 please")
    with pytest.raises(ValueError):
        compute_exact("Evaluate __import__('os').system('whoami')")
    with pytest.raises(ValueError):
        compute_exact("Evaluate " + "1" * 500)


def test_linear_and_quadratic_roots_have_verification():
    linear = compute_exact("Solve for x: 2*x + 8 = 16")
    assert linear["answer"] == "x = 4"
    quadratic = compute_exact("Solve for x: x^2 - 5*x + 6 = 0")
    assert quadratic["answer"] == "x = 3, 2"
    assert "substitution" in " ".join(quadratic["checks"])


def test_polynomial_all_no_solution_and_injection_rejection():
    assert compute_exact("Solve for x: x = x")["answer"] == "all real numbers"
    assert compute_exact("Solve for x: x + 1 = x")["answer"] == "no solution"
    with pytest.raises(ValueError):
        compute_exact("Solve for x: __import__('os') = 1")
    with pytest.raises(ValueError):
        compute_exact("Solve for x: x^3 = 1")


def test_units_support_novel_parameters_and_inverse_checks():
    speed = compute_exact("Calculate speed: distance = 300 m, time = 10 s.")
    assert speed["answer"] == "30 m/s"
    force = compute_exact("Calculate force: mass = 500 g, acceleration = 4 m/s^2.")
    assert force["answer"] == "2 N"
    moles = compute_exact("Calculate moles: mass = 36 g, molar_mass = 18 g/mol.")
    assert moles["answer"] == "2 mol"
    assert any("inverse" in check for check in speed["checks"])


def test_units_are_full_string_and_ambiguous_or_zero_denominator_fails():
    with pytest.raises(ValueError):
        compute_exact("Calculate speed: distance = 120 km, time = 2 h, please")
    with pytest.raises(ValueError):
        compute_exact("Calculate speed: distance = 120 km, distance = 2 km")
    with pytest.raises(ValueError, match="positive time"):
        compute_exact("Calculate speed: distance = 120 km, time = 0 h")
    with pytest.raises(ValueError, match="molar mass"):
        compute_exact("Calculate moles: mass = 18 g, molar_mass = 0 g/mol")


def test_unrecognized_question_is_unsupported():
    assert compute_exact("Explain why the sky is blue", subject="science") is None
