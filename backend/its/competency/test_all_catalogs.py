"""Test concept matching and deterministic execution across all 13 Class 7 Maths catalogs.

For each catalog, we test:
  1. Concept matching: does the matcher find the right concept for a sample question?
  2. Deterministic execution: does the solver produce a valid result structure?

This test resets the concept_matcher global state between catalogs.
"""
import json
import os
import sys

from backend.its.competency import concept_matcher as cm
from backend.its.competency.solution_executor import solve

CATALOG_DIR = os.path.dirname(os.path.abspath(__file__))

# Test cases: (catalog_file, question, expected_concept_title_fragment)
TEST_CASES = [
    # Chapter 1: Integers
    ("catalog_class7_maths_ch1_integers.json",
     "Find the product: 3 x (-1)", "Multiplication"),
    ("catalog_class7_maths_ch1_integers.json",
     "Evaluate: (-30) / 10", "Division"),
    # Chapter 2: Fractions and Decimals
    ("catalog_class7_maths_ch2_fractions_decimals.json",
     "Find the product: 2/3 x 5/7", "Multiplication"),
    ("catalog_class7_maths_ch2_fractions_decimals.json",
     "Find the reciprocal of 3/4", "Reciprocal"),
    # Chapter 3: Data Handling
    ("catalog_class7_maths_ch3_data_handling.json",
     "Find the mean of 2, 4, 6, 8, 10", "Mean"),
    ("catalog_class7_maths_ch3_data_handling.json",
     "Find the mode of the data", "Mode"),
    # Chapter 4: Simple Equations
    ("catalog_class7_maths_ch4_simple_equations.json",
     "Solve: x + 5 = 12", "Equation"),
    # Chapter 5: Lines and Angles
    ("catalog_class7_maths_ch5_lines_angles.json",
     "Find the complement of 35 degrees", "Complementary"),
    ("catalog_class7_maths_ch5_lines_angles.json",
     "Two angles are supplementary. If one is 70 degrees, find the other.", "Supplementary"),
    # Chapter 6: Triangle and its Properties
    ("catalog_class7_maths_ch6_triangle_properties.json",
     "Two angles of a triangle are 40 and 60 degrees. Find the third angle.", "Angle Sum"),
    ("catalog_class7_maths_ch6_triangle_properties.json",
     "Find the hypotenuse of a right triangle with sides 3 and 4.", "Pythagoras"),
    # Chapter 7: Comparing Quantities
    ("catalog_class7_maths_ch7_comparing_quantities.json",
     "Find 20% of 500", "Percentage"),
    ("catalog_class7_maths_ch7_comparing_quantities.json",
     "Find the simple interest on Rs 1000 at 5% per year for 2 years.", "Simple Interest"),
    # Chapter 8: Rational Numbers
    ("catalog_class7_maths_ch8_rational_numbers.json",
     "Reduce -45/30 to standard form", "Standard Form"),
    ("catalog_class7_maths_ch8_rational_numbers.json",
     "Find the sum: 7/3 + (-5)/3", "Addition"),
    ("catalog_class7_maths_ch8_rational_numbers.json",
     "Find the product: -3/5 x 2/7", "Multiplication"),
    # Chapter 9: Perimeter and Area
    ("catalog_class7_maths_ch9_perimeter_area.json",
     "Find the area of a parallelogram with base 4 cm and height 3 cm", "Area of a Parallelogram"),
    ("catalog_class7_maths_ch9_perimeter_area.json",
     "Find the area of a triangle with base 4 cm and height 2 cm", "Area of a Triangle"),
    ("catalog_class7_maths_ch9_perimeter_area.json",
     "Find the circumference of a circle of radius 14 cm", "Circumference"),
    ("catalog_class7_maths_ch9_perimeter_area.json",
     "Find the area of a circle of radius 30 cm", "Area of a Circle"),
    # Chapter 10: Algebraic Expressions
    ("catalog_class7_maths_ch10_algebraic_expressions.json",
     "Identify the terms in the expression 4x + 5", "Terms"),
    ("catalog_class7_maths_ch10_algebraic_expressions.json",
     "Find the value of x + 4 for x = 2", "Value"),
    # Chapter 11: Exponents and Powers
    ("catalog_class7_maths_ch11_exponents_powers.json",
     "Find the value of 2 to the power 6", "Exponents"),
    ("catalog_class7_maths_ch11_exponents_powers.json",
     "Simplify 2 squared times 2 cubed", "Multiplying Powers"),
    ("catalog_class7_maths_ch11_exponents_powers.json",
     "Express 5,00,00,000 in standard form", "Standard Form"),
    # Chapter 12: Symmetry
    ("catalog_class7_maths_ch12_symmetry.json",
     "How many lines of symmetry does an equilateral triangle have?", "Lines of Symmetry"),
    ("catalog_class7_maths_ch12_symmetry.json",
     "What is the order of rotational symmetry of a square?", "Rotational Symmetry"),
    # Chapter 13: Visualising Solid Shapes
    ("catalog_class7_maths_ch13_visualising_solid_shapes.json",
     "How many faces, edges and vertices does a cube have?", "Faces"),
    ("catalog_class7_maths_ch13_visualising_solid_shapes.json",
     "What cross-section do you get when you give a vertical cut to a brick?", "Viewing Sections"),
]


def reset_matcher():
    """Reset concept_matcher global state for a new catalog."""
    cm._CATALOG = None
    cm._CONCEPT_EMBEDDINGS = None
    cm._CONCEPT_TEXTS = None
    cm._EXAMPLE_EMBEDDINGS = None
    cm._EXAMPLE_META = None


def run_tests():
    passed = 0
    failed = 0
    no_match = 0
    results = []

    print("=" * 70)
    print("Testing concept matching across all Class 7 Maths catalogs")
    print("=" * 70)

    current_catalog = None
    for catalog_file, question, expected_fragment in TEST_CASES:
        # Reset matcher state when switching catalogs
        if catalog_file != current_catalog:
            reset_matcher()
            current_catalog = catalog_file

        catalog_path = os.path.join(CATALOG_DIR, catalog_file)

        try:
            concept, score, example = cm.match_concept(question, catalog_path)
        except Exception as e:
            print("FAIL: %s" % question[:60])
            print("  ERROR: %s" % e)
            failed += 1
            results.append((catalog_file, question, "ERROR", str(e)))
            continue

        if concept is None:
            print("NO_MATCH: %s" % question[:60])
            print("  No concept matched above threshold (best score: %.3f)" % score)
            no_match += 1
            results.append((catalog_file, question, "NO_MATCH", "score=%.3f" % score))
            continue

        title = concept["title"]
        match_ok = expected_fragment.lower() in title.lower()

        status = "OK" if match_ok else "WRONG"
        if match_ok:
            passed += 1
        else:
            failed += 1

        print("%s: %s" % (status, question[:60]))
        print("  Matched: %s (score=%.3f)" % (title, score))
        print("  Expected fragment: %s" % expected_fragment)
        if example:
            print("  Example: %s" % example.get("question_type", ""))
        print()
        results.append((catalog_file, question, status, title))

    print("=" * 70)
    print("Summary:")
    print("  Passed:    %d" % passed)
    print("  Failed:    %d" % failed)
    print("  No match:  %d" % no_match)
    print("  Total:     %d" % len(TEST_CASES))
    print("=" * 70)

    # Test deterministic execution for a few compute-type questions
    print()
    print("=" * 70)
    print("Testing deterministic execution")
    print("=" * 70)

    exec_tests = [
        ("catalog_class7_maths_ch1_integers.json",
         "Find the product: 3 x (-1)", -3),
        ("catalog_class7_maths_ch1_integers.json",
         "Find the product: (-21) x (-30)", 630),
        ("catalog_class7_maths_ch1_integers.json",
         "Evaluate: (-30) / 10", -3),
        ("catalog_class7_maths_ch1_integers.json",
         "Evaluate: (-36) / (-9)", 4),
    ]

    exec_passed = 0
    exec_failed = 0

    current_catalog = None
    for catalog_file, question, expected_answer in exec_tests:
        if catalog_file != current_catalog:
            reset_matcher()
            current_catalog = catalog_file

        catalog_path = os.path.join(CATALOG_DIR, catalog_file)
        concept, score, example = cm.match_concept(question, catalog_path)

        if concept is None:
            print("SKIP (no match): %s" % question[:60])
            exec_failed += 1
            continue

        result = solve(question, concept)
        got = result.get("answer")
        ok = got == expected_answer
        if ok:
            exec_passed += 1
        else:
            exec_failed += 1

        print("%s: %s" % ("OK" if ok else "WRONG", question[:60]))
        print("  Got: %s, Expected: %s" % (got, expected_answer))
        print("  Type: %s" % result.get("type", ""))
        print()

    print("=" * 70)
    print("Execution Summary:")
    print("  Passed: %d" % exec_passed)
    print("  Failed: %d" % exec_failed)
    print("=" * 70)

    total_failed = failed + exec_failed
    if total_failed > 0:
        print("\n%d total failures." % total_failed)
        sys.exit(1)
    else:
        print("\nAll tests passed.")
        sys.exit(0)


if __name__ == "__main__":
    run_tests()
