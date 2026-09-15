"""test_router_benchmark.py — Router coverage benchmark across all domains.

Raw student-text problems (class 6 through JEE/NEET/CA), each with a
ground-truth numeric answer, pushed through solve_text(). Measures the
end-to-end solve rate of the deterministic stack:

    modeling structures -> canonical equation graph (BFS over 379
    hand-written validated equations, cascade solving) -> refusal

No LLM anywhere. Run:  python backend/its/tests/test_router_benchmark.py
"""

from __future__ import annotations

import os
import sys

_HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.abspath(os.path.join(_HERE, "..", "..", "..")))

CASES = [
    # --- class 6-8 maths ---
    ("math6_pct", "What percentage of 250 is 40?",
     16.0, "p"),
    ("math8_si", "Find the simple interest on a principal of 5000 at a "
     "rate of 8 percent per year for 3 years.",
     1200.0, "si"),
    ("math8_ci", "Find the compound amount on a principal of 10000 at a "
     "rate of 10 percent per year compounded annually for 2 years.",
     12100.0, "amount"),
    ("math8_cyl", "Find the volume of a cylinder of radius 7 and height 10.",
     1539.3804002589978, "vol"),
    ("math8_avg", "The average of 6 numbers is 15. What is their total sum?",
     90.0, "total_sum"),
    ("math9_pythag", "In a right triangle the base is 3 and the "
     "perpendicular is 4. Find the hypotenuse.", 5.0, "hyp"),
    ("math9_dist", "Find the distance between the points (0, 0) and "
     "(3, 4).", 5.0, "dist"),

    # --- class 9-10 maths / physics ---
    ("math10_quad", "The sum of roots of a quadratic is 5 and the product "
     "of roots is 6, with leading coefficient a = 1. Find b.",
     -5.0, "b_"),
    ("math10_ap", "In an arithmetic progression the first term is 2 and "
     "the common difference is 3. Find the 10th term.", 29.0, "an"),
    ("phy10_ohm", "A current of 2 A flows through a resistor of "
     "resistance 10 ohm. Find the voltage.", 20.0, "V_pot"),
    ("phy10_series", "Two resistors of 3 ohm and 6 ohm are in series. "
     "Find the equivalent resistance.", 9.0, "R_eq"),
    ("phy10_density", "A block has mass 500 and volume 200. Find its "
     "density.", 2.5, "rho"),
    ("phy10_heat", "Find the heat needed to raise the temperature of 2 kg "
     "of water (specific heat 4186) by 10 degrees (temperature "
     "difference).", 83720.0, "Q_heat"),

    # --- class 11-12 mechanics ---
    ("phy12_momentum", "Find the momentum of a body of mass 5 moving with "
     "velocity 12.", 60.0, "p_mom"),
    ("phy12_ke", "A car of mass 1000 moves at a speed of 20. Find its "
     "kinetic energy.", 200000.0, "KE"),
    ("phy12_spring_period", "A spring of stiffness 200 carries a mass of "
     "0.5. Find the time period of oscillation.", 0.3141592653589797,
     "T_period"),
    ("phy12_escape", "Find the escape velocity of a planet of mass "
     "5.97e24 and radius 6.37e6 (G = 6.67e-11).", 11173.0, "v_escape"),

    # --- electricity / magnetism ---
    ("phy12_joule", "Find the power dissipated when a current of 5 flows "
     "through a resistance of 4.", 100.0, "P_elec"),
    ("phy12_parallel", "Resistors of 4 ohm and 4 ohm are connected in "
     "parallel. Find the equivalent resistance.", 2.0, "R_eq"),

    # --- optics / modern ---
    ("phy12_lenspow", "Find the power of a lens of focal length 0.25 "
     "(in metres).", 4.0, "P_dioptre"),
    ("phy12_photon", "Find the energy of a photon of wavelength 6.2e-7 "
     "(h = 6.626e-34, c = 3e8).", 3.205161290322581e-19, "E_photon"),

    # --- chemistry ---
    ("chm_moles", "How many moles are present in 88 of CO2 (molar mass "
     "44)?", 2.0, "n_mol"),
    ("chm_molarity", "Find the molarity when 0.5 moles are dissolved to "
     "make 2 litres of solution.", 0.25, "M_molality"),
    ("chm_dilution", "A solution of molarity 2 and volume 0.1 is diluted "
     "to a volume of 0.5. Find the new molarity.", 0.4, "M2"),
    ("chm_gibbs", "For a reaction the enthalpy change is -100000 and the "
     "entropy change is -200 at a temperature of 300. Find the Gibbs "
     "free energy change.", -40000.0, "dG"),
    ("chm_halflife", "A first order reaction has a rate constant of "
     "0.0231. Find its half life.", 30.0, "t_half"),

    # --- commerce / CA ---
    ("ca_bep", "A firm has fixed costs of 50000; each unit sells at a "
     "price of 50 with a variable cost of 30. Find the break-even "
     "quantity in units.", 2500.0, "bep_units"),
    ("ca_annuity", "Find the future value of an ordinary annuity of 1000 "
     "per period for 10 periods at an interest rate of 0.05 per period.",
     12577.892535548373, "fv_annuity"),
]


def main() -> int:
    import logging

    logging.disable(logging.WARNING)
    from backend.its.solver.router import solve_text

    passed = failed = 0
    fails = []
    for name, text, expected, target in CASES:
        r = solve_text(text)
        got = r.numeric
        ok = (r.solved and got is not None
              and abs(got - expected) <= 1e-6 * max(1.0, abs(expected)))
        if ok:
            passed += 1
            print(f"PASS {name:22s} {got!r:26s} via {r.stage} "
                  f"({r.elapsed_ms:.0f}ms)")
        else:
            failed += 1
            fails.append((name, expected, r.summary()))
            print(f"FAIL {name:22s} expected {expected!r} "
                  f"solved={r.solved} stage={r.stage}")

    total = passed + failed
    print("\n" + "=" * 70)
    print(f"ROUTER BENCHMARK: {passed}/{total} = {100 * passed / total:.0f}%")
    for name, exp, summary in fails:
        print(f"  {name}: expected {exp} | {summary[:110]}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
