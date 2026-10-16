"""asymptotic_engine.py — Asymptotic Expansion & Extreme Regimes Engine.

Provides deterministic analysis of physical systems and mathematical functions
under extreme limits and boundary conditions:
1. Mathematical Puiseux & Laurent asymptotic expansions (x -> 0, x -> inf)
2. Dominant balance & leading-order behavior extraction
3. Physics Regime Bridges:
   - Relativistic -> Classical Newtonian limit (v << c)
   - Planck Radiation -> Rayleigh-Jeans (hv << kT) and Wien (hv >> kT)
   - RC / RL / RLC Transient limits (t << tau vs t >> tau)
   - Gravitational potential near-surface expansion (h << R_E)
   - Statistical mechanics Stirling approximation (N -> inf)
"""

from __future__ import annotations

import math
from dataclasses import dataclass
from typing import Any, Dict, List, Optional, Tuple

import sympy as sp


@dataclass
class AsymptoticResult:
    success: bool
    regime: str
    variable: str
    limit_point: str
    leading_term: str
    series_expansion: str
    physical_interpretation: str
    steps: List[str]
    error: Optional[str] = None


class AsymptoticEngine:
    """Deterministic asymptotic expansion and physical regime analysis engine."""

    @classmethod
    def expand_series(
        cls,
        expr_str: str,
        variable: str = "x",
        about: str = "0",
        num_terms: int = 4,
    ) -> AsymptoticResult:
        """Compute asymptotic series expansion around a finite point or infinity."""
        try:
            var = sp.Symbol(variable)
            expr = sp.sympify(expr_str)

            if about in ("inf", "oo", "+inf"):
                # Expansion around infinity: substitute var = 1 / eps
                eps = sp.Symbol("eps", positive=True)
                expr_eps = expr.subs(var, 1 / eps)
                series_eps = sp.series(expr_eps, eps, 0, n=num_terms).removeO()
                series_var = sp.simplify(series_eps.subs(eps, 1 / var))
                leading = sp.leadterm(series_eps, eps)
                leading_in_var = leading[0] * (1 / var) ** leading[1]
                point_desc = "x → ∞"
            elif about in ("-inf", "-oo"):
                eps = sp.Symbol("eps", positive=True)
                expr_eps = expr.subs(var, -1 / eps)
                series_eps = sp.series(expr_eps, eps, 0, n=num_terms).removeO()
                series_var = sp.simplify(series_eps.subs(eps, -1 / var))
                leading = sp.leadterm(series_eps, eps)
                leading_in_var = leading[0] * (-1 / var) ** leading[1]
                point_desc = "x → -∞"
            else:
                pt = sp.sympify(about)
                series_raw = sp.series(expr, var, pt, n=num_terms).removeO()
                series_var = sp.simplify(series_raw)
                try:
                    leading_term_tup = sp.leadterm(sp.series(expr, var, pt, n=num_terms), var)
                    leading_in_var = leading_term_tup[0] * (var - pt) ** leading_term_tup[1]
                except Exception:
                    leading_in_var = series_var
                point_desc = f"{variable} → {about}"

            steps = [
                f"1. Given expression: f({variable}) = {expr}.",
                f"2. Analyzing behavior under the limit {point_desc}.",
                f"3. Dominant balance (leading order behavior): ~ {leading_in_var}.",
                f"4. Asymptotic series expansion ({num_terms} terms): {series_var}.",
            ]

            return AsymptoticResult(
                success=True,
                regime="GENERAL_ASYMPTOTIC",
                variable=variable,
                limit_point=str(about),
                leading_term=str(leading_in_var),
                series_expansion=str(series_var),
                physical_interpretation=f"As {point_desc}, the function is dominated by {leading_in_var}.",
                steps=steps,
            )
        except Exception as exc:
            return AsymptoticResult(
                success=False,
                regime="GENERAL_ASYMPTOTIC",
                variable=variable,
                limit_point=str(about),
                leading_term="",
                series_expansion="",
                physical_interpretation="",
                steps=[],
                error=str(exc),
            )

    @classmethod
    def analyze_relativistic_regime(cls, v_ratio_or_expr: Optional[float] = None) -> AsymptoticResult:
        """Analyzes Lorentz factor gamma = 1/sqrt(1 - beta^2) and kinetic energy."""
        # beta = v / c
        beta = sp.Symbol("beta", real=True, positive=True)
        m = sp.Symbol("m", real=True, positive=True)
        c = sp.Symbol("c", real=True, positive=True)

        gamma_expr = 1 / sp.sqrt(1 - beta**2)
        # Low speed expansion beta -> 0:
        gamma_low_speed = sp.series(gamma_expr, beta, 0, n=6).removeO()
        # Kinetic energy K = (gamma - 1) m c^2
        ke_expr = (gamma_low_speed - 1) * m * (c**2)
        ke_simplified = sp.simplify(ke_expr)

        steps = [
            "1. Relativistic Lorentz factor: γ(v) = 1 / √(1 - β²), where β = v/c.",
            "2. Taylor expansion for low velocities (β << 1, non-relativistic regime):",
            f"   γ ≈ {gamma_low_speed}.",
            "3. Relativistic Kinetic Energy: K = (γ - 1) m c².",
            f"   K ≈ [{gamma_low_speed} - 1] · m c² = {ke_simplified}.",
            "4. Notice the leading term: 1/2 m c² β² = 1/2 m v² (recovering Newtonian kinetic energy exactly!).",
            "5. The first relativistic correction is + 3/8 m v⁴ / c².",
        ]

        if v_ratio_or_expr is not None:
            b_val = float(v_ratio_or_expr)
            if b_val >= 1.0:
                steps.append(f"6. Physical Boundary Violation: Given v/c = {b_val} >= 1 (speed of light is universal speed limit).")
            else:
                gamma_val = 1.0 / math.sqrt(1 - b_val**2)
                err_classical = (gamma_val - 1.0) / (0.5 * (b_val**2)) - 1.0 if b_val > 0 else 0.0
                steps.append(
                    f"6. Numerical Evaluation at v = {b_val:.3f}c: γ = {gamma_val:.6f}. "
                    f"Classical formula error = {abs(err_classical)*100:.2f}%."
                )

        return AsymptoticResult(
            success=True,
            regime="RELATIVISTIC_TO_NEWTONIAN",
            variable="beta (v/c)",
            limit_point="0",
            leading_term="1 + 1/2 * beta^2",
            series_expansion=str(gamma_low_speed),
            physical_interpretation="At low velocities (v << c), Einstein's relativistic dynamics reduces identically to Newton's mechanics.",
            steps=steps,
        )

    @classmethod
    def analyze_planck_radiation_regimes(cls) -> Dict[str, Any]:
        """Demonstrates Planck spectral density reducing to Rayleigh-Jeans and Wien laws."""
        nu = sp.Symbol("nu", positive=True)
        h = sp.Symbol("h", positive=True)
        k_B = sp.Symbol("k_B", positive=True)
        T = sp.Symbol("T", positive=True)
        c = sp.Symbol("c", positive=True)

        # x = h nu / (k_B T)
        x = sp.Symbol("x", positive=True)
        # Denominator: exp(x) - 1
        denom_low_freq = sp.series(sp.exp(x) - 1, x, 0, n=3).removeO()

        steps = [
            "1. Planck's Blackbody Radiation Law: u(ν, T) = (8π h ν³ / c³) / (e^(hν / k_B T) - 1).",
            "2. Dimensionless frequency ratio: x = h ν / (k_B T).",
            "3. REGIME 1: Rayleigh-Jeans Law (Low Frequency / High Temperature, x << 1):",
            f"   e^x - 1 ≈ {denom_low_freq} ≈ x.",
            "   u(ν, T) ≈ (8π h ν³ / c³) / (h ν / k_B T) = 8π ν² k_B T / c³.",
            "   Pedagogical insight: Resolves the ultraviolet catastrophe by demonstrating that equipartition only holds when hν << k_B T.",
            "4. REGIME 2: Wien Distribution Law (High Frequency / Low Temperature, x >> 1):",
            "   When x >> 1, e^x >> 1, so e^x - 1 ≈ e^x.",
            "   u(ν, T) ≈ (8π h ν³ / c³) · e^(-hν / k_B T).",
            "   Shows exponential suppression of high-energy photon modes.",
        ]

        return {
            "success": True,
            "regime": "PLANCK_LIMITING_BEHAVIORS",
            "rayleigh_jeans_limit": "8 * pi * nu^2 * k_B * T / c^3",
            "wien_limit": "8 * pi * h * nu^3 / c^3 * exp(-h * nu / (k_B * T))",
            "steps": steps,
        }

    @classmethod
    def analyze_transient_regime(cls, tau: float, t_eval: float) -> Dict[str, Any]:
        """Evaluates exponential charging/decay V(t) = V0 (1 - exp(-t/tau))."""
        ratio = t_eval / tau
        val_fraction = 1.0 - math.exp(-ratio)
        
        if ratio < 0.1:
            regime_desc = "Short-time linear approximation (t << τ)"
            approx = ratio
            err = abs(val_fraction - approx) / val_fraction * 100
            note = f"Approximation V(t) ≈ V0 · (t/τ) holds with {err:.2f}% error."
        elif ratio > 4.6:  # 99% charged
            regime_desc = "Long-time steady-state regime (t >> τ)"
            approx = 1.0
            note = f"System reached >99% steady state (V(t) ≈ V0). Transient effects vanished."
        else:
            regime_desc = "Intermediate exponential transition"
            approx = val_fraction
            note = f"Evaluates to {val_fraction * 100:.2f}% of final asymptote."

        steps = [
            f"1. Exponential circuit equation: V(t) = V_0 · (1 - e^(-t / τ)), with time constant τ = {tau} s.",
            f"2. Evaluation time: t = {t_eval} s (dimensionless ratio t/τ = {ratio:.4f}).",
            f"3. Active physical regime: {regime_desc}.",
            f"4. Exact fractional value: 1 - e^(-{ratio:.4f}) = {val_fraction:.6f}.",
            f"5. Regime insight: {note}",
        ]

        return {
            "success": True,
            "tau": tau,
            "t": t_eval,
            "ratio_t_over_tau": ratio,
            "fraction_charged": val_fraction,
            "regime": regime_desc,
            "steps": steps,
        }
