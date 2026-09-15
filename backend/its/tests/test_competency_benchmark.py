"""test_competency_benchmark.py — NEP-2020 style competency questions.

Case-study paragraphs where meaning is distributed across sentences:
roles are NOT named next to numbers, quantities come from real-life
narratives, and some answers need chained formulas. Measures the
ledger propagation solver end to end. No LLM anywhere.
"""

from __future__ import annotations

import os
import sys

_HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.abspath(os.path.join(_HERE, "..", "..", "..")))

CASES = [
    # --- single-formula, narrative framing (roles distributed) ---
    ("comp_tank_volume",
     "Ravi's family lives in a village. Their overhead tank is "
     "cylindrical in shape with a radius of 2 m and a height of 3.5 m. "
     "How much water can the tank hold when it is completely full? "
     "(in cubic metres)",
     43.982297150257104, "vol"),
    ("comp_park_area",
     "The municipal corporation develops a rectangular park for "
     "children. The park is 25 m long and 18 m wide. Find the area of "
     "the park.",
     450.0, "area"),
    ("comp_garden_perimeter",
     "A school has a rectangular garden that measures 30 m in length "
     "and 20 m in width. The principal wants to fence the garden. Find "
     "the perimeter of the garden.",
     100.0, "perim"),
    ("comp_train_speed",
     "The Rajdhani express leaves Delhi and covers a distance of 180 km "
     "in 3 hours. Find the speed of the train.",
     60.0, "speed"),
    ("comp_shop_profit",
     "A shopkeeper purchased 40 shirts at 250 each. During a festival "
     "sale he sold all the shirts at 320 each. Find his profit percent.",
     28.0, "profit_pct"),
    ("comp_bank_interest",
     "Anita saves 8000 from her salary and deposits it in a bank which "
     "pays interest at the rate of 5 percent per year. How much "
     "interest will she receive after 2 years?",
     800.0, "si"),
    ("comp_geyser_energy",
     "In winter, an electric geyser rated 2 kW is used for 60 hours in "
     "a month. Find the electrical energy consumed by the geyser.",
     120.0, "E_energy"),
    ("comp_chem_molarity",
     "In the chemistry lab, Sunita dissolves 0.4 moles of common salt "
     "in water to make 2 litres of solution. Find the molarity of the "
     "solution she prepared.",
     0.2, "M_molality"),
    ("comp_ball_ke",
     "During a cricket match, a ball of mass 0.5 kg moves at a speed of "
     "20 towards the batsman. Find the kinetic energy of the ball.",
     100.0, "KE"),
    ("comp_free_fall",
     "A coconut falls from a tree and hits the ground. Just before "
     "hitting the ground its velocity is 20. Find the height from which "
     "it fell.",
     20.408163265306122, "h"),

    # --- two-step chains (propagation must unlock the second step) ---
    ("comp_cycle_trip",
     "Every morning Meena cycles to school which is 3 km away from her "
     "home. She covers the distance in 15 minutes and then attends her "
     "classes. Find the speed of her cycling.",
     0.2, "speed"),
    ("comp_cuboid_volume",
     "A cold storage plant uses a cuboidal box of length 2 m, breadth "
     "1.5 m and height 1 m to pack vegetables. Find the volume of the "
     "box.",
     3.0, "vol"),
    ("comp_spring_period",
     "In the physics lab, students hang a mass of 0.5 kg from a spring "
     "of stiffness 200. The mass is pulled slightly and released. Find "
     "the time period of the oscillations.",
     0.3141592653589797, "T_period"),
    ("comp_current_bill",
     "An electric kettle draws a current of 4 A when connected to a "
     "220 V supply. Find the power rating of the kettle.",
     880.0, "P_elec"),
]


def main() -> int:
    import logging

    logging.disable(logging.WARNING)
    from backend.its.solver.ledger_solver import get_ledger_solver
    from backend.its.solver.quantity_parser import parse_quantities

    solver = get_ledger_solver()
    passed = failed = 0
    fails = []
    for name, text, expected, target in CASES:
        t0 = os.times()[4]
        qs = parse_quantities(text)
        r = solver.solve(text, qs)
        got = r.get("value") if r else None
        ok = (r is not None and got is not None
              and abs(got - expected) <= 1e-6 * max(1.0, abs(expected)))
        wall = (os.times()[4] - t0) * 1000
        if ok:
            passed += 1
            print(f"PASS {name:24s} {got!r:24s} target={target} "
                  f"({wall:.0f}ms)")
        else:
            failed += 1
            got_s = f"{got:.6g}" if got is not None else "none"
            fails.append((name, expected, target, got_s,
                          (r or {}).get("knowns")))
            print(f"FAIL {name:24s} expected {expected!r} got {got_s} "
                  f"(target {target})")

    total = passed + failed
    print("\n" + "=" * 70)
    print(f"COMPETENCY BENCHMARK: {passed}/{total} = "
          f"{100 * passed / total:.0f}%")
    for name, exp, target, got, knowns in fails:
        print(f"  {name}: expected {exp} (target {target}), got {got}")
        if knowns:
            print(f"    ledger: {knowns}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
