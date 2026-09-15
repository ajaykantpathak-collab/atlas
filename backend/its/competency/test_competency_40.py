"""40 competency-based questions for Class 7 Maths, created from scratch.
Tests reasoning, justification, error analysis, application, comparison,
and multi-step problem solving across all 13 chapters.

Each question has:
  - q: the question text
  - catalog: which chapter catalog to match against
  - expected_fragment: expected concept title fragment
  - competency_type: the competency being tested
  - expected_answer: numeric answer if computable, else None
"""
from backend.its.competency import concept_matcher as cm
from backend.its.competency.solution_executor import solve
import os
import sys

CATALOG_DIR = os.path.dirname(os.path.abspath(__file__))

COMPETENCY_QUESTIONS = [
    # === Chapter 1: Integers (4 questions) ===
    {
        "q": "A student says (-5) x (-3) = -15. Is this correct? Justify your answer with the rule for multiplication of two negative integers.",
        "catalog": "catalog_class7_maths_ch1_integers.json",
        "expected_fragment": "Multiplication",
        "competency_type": "error_identification",
        "expected_answer": 15,
    },
    {
        "q": "In a class test, (+3) marks are given for every correct answer and (-2) marks for every incorrect answer. Radhika scored 20 marks. If she got 12 correct answers, how many questions did she attempt incorrectly?",
        "catalog": "catalog_class7_maths_ch1_integers.json",
        "expected_fragment": "Division",
        "competency_type": "application",
        "expected_answer": 8,
    },
    {
        "q": "Verify that (-21) x [(-4) + (+6)] = [(-21) x (-4)] + [(-21) x (+6)]. Which property of integers is being demonstrated here?",
        "catalog": "catalog_class7_maths_ch1_integers.json",
        "expected_fragment": "Distributive",
        "competency_type": "verify_and_explain",
        "expected_answer": True,
    },
    {
        "q": "The temperature at noon was 10 degrees C above zero. If it decreases at the rate of 2 degrees C per hour until midnight, at what time would the temperature be 8 degrees C below zero?",
        "catalog": "catalog_class7_maths_ch1_integers.json",
        "expected_fragment": "Division",
        "competency_type": "application",
        "expected_answer": 9,
    },

    # === Chapter 2: Fractions and Decimals (3 questions) ===
    {
        "q": "Find the product of 2/3 and 5/7. Show that multiplying two proper fractions always gives a fraction smaller than both.",
        "catalog": "catalog_class7_maths_ch2_fractions_decimals.json",
        "expected_fragment": "Multiplication",
        "competency_type": "computation_with_reasoning",
        "expected_answer": 10/21,
    },
    {
        "q": "A car runs 16 km using 1 litre of petrol. How much distance will it cover using 3 and 1/4 litres of petrol?",
        "catalog": "catalog_class7_maths_ch2_fractions_decimals.json",
        "expected_fragment": "Multiplication",
        "competency_type": "application",
        "expected_answer": 52,
    },
    {
        "q": "Find the reciprocal of 7/11. Explain why the product of a fraction and its reciprocal is always 1.",
        "catalog": "catalog_class7_maths_ch2_fractions_decimals.json",
        "expected_fragment": "Reciprocal",
        "competency_type": "conceptual_understanding",
        "expected_answer": 11/7,
    },

    # === Chapter 3: Data Handling (3 questions) ===
    {
        "q": "Find the mean of the first five whole numbers. Justify why the mean is also called the average.",
        "catalog": "catalog_class7_maths_ch3_data_handling.json",
        "expected_fragment": "Mean",
        "competency_type": "computation_with_reasoning",
        "expected_answer": 2,
    },
    {
        "q": "The marks obtained by 11 students in a test are: 3, 5, 7, 5, 3, 5, 8, 5, 6, 5, 9. Find the mode and explain what it tells us about the data.",
        "catalog": "catalog_class7_maths_ch3_data_handling.json",
        "expected_fragment": "Mode",
        "competency_type": "computation_with_reasoning",
        "expected_answer": 5,
    },
    {
        "q": "A die is rolled once. What is the probability of getting a number greater than 4? Express as a fraction and explain.",
        "catalog": "catalog_class7_maths_ch3_data_handling.json",
        "expected_fragment": "Probability",
        "competency_type": "computation_with_reasoning",
        "expected_answer": 1/3,
    },

    # === Chapter 4: Simple Equations (3 questions) ===
    {
        "q": "Solve the equation x + 5 = 12 and explain each step of the balancing method.",
        "catalog": "catalog_class7_maths_ch4_simple_equations.json",
        "expected_fragment": "Equation",
        "competency_type": "computation_with_reasoning",
        "expected_answer": 7,
    },
    {
        "q": "The sum of two numbers is 80. If one number exceeds the other by 10, find both numbers by setting up an equation.",
        "catalog": "catalog_class7_maths_ch4_simple_equations.json",
        "expected_fragment": "Application",
        "competency_type": "application",
        "expected_answer": 45,
    },
    {
        "q": "Solve 3(x + 2) = 18. Justify why we first divide both sides by 3 rather than expanding the bracket.",
        "catalog": "catalog_class7_maths_ch4_simple_equations.json",
        "expected_fragment": "Bracket",
        "competency_type": "computation_with_reasoning",
        "expected_answer": 4,
    },

    # === Chapter 5: Lines and Angles (3 questions) ===
    {
        "q": "Find the complement of 35 degrees. Explain why complementary angles always sum to 90 degrees.",
        "catalog": "catalog_class7_maths_ch5_lines_angles.json",
        "expected_fragment": "Complementary",
        "competency_type": "computation_with_reasoning",
        "expected_answer": 55,
    },
    {
        "q": "Two angles are supplementary. If one angle is 70 degrees, find the other. Explain the difference between complementary and supplementary angles.",
        "catalog": "catalog_class7_maths_ch5_lines_angles.json",
        "expected_fragment": "Supplementary",
        "competency_type": "computation_with_reasoning",
        "expected_answer": 110,
    },
    {
        "q": "If two lines intersect, one of the angles formed is 45 degrees. Find all the other angles and explain which property you used.",
        "catalog": "catalog_class7_maths_ch5_lines_angles.json",
        "expected_fragment": "Vertically Opposite",
        "competency_type": "application",
        "expected_answer": 135,
    },

    # === Chapter 6: Triangle and its Properties (3 questions) ===
    {
        "q": "Two angles of a triangle are 40 degrees and 60 degrees. Find the third angle. Which property of triangles did you use?",
        "catalog": "catalog_class7_maths_ch6_triangle_properties.json",
        "expected_fragment": "Angle Sum",
        "competency_type": "computation_with_reasoning",
        "expected_answer": 80,
    },
    {
        "q": "Find the hypotenuse of a right triangle with sides 3 cm and 4 cm. State which theorem you used and why it applies.",
        "catalog": "catalog_class7_maths_ch6_triangle_properties.json",
        "expected_fragment": "Pythagoras",
        "competency_type": "computation_with_reasoning",
        "expected_answer": 5,
    },
    {
        "q": "Can a triangle have sides 3 cm, 4 cm, and 8 cm? Justify using the triangle inequality property.",
        "catalog": "catalog_class7_maths_ch6_triangle_properties.json",
        "expected_fragment": "Sum of Two Sides",
        "competency_type": "verify_and_explain",
        "expected_answer": False,
    },

    # === Chapter 7: Comparing Quantities (3 questions) ===
    {
        "q": "Find 20 percent of 500. Explain what percent means and how you converted it to a fraction.",
        "catalog": "catalog_class7_maths_ch7_comparing_quantities.json",
        "expected_fragment": "Percentage",
        "competency_type": "computation_with_reasoning",
        "expected_answer": 100,
    },
    {
        "q": "Find the simple interest on Rs 1000 at 5 percent per year for 2 years. Also find the total amount to be paid.",
        "catalog": "catalog_class7_maths_ch7_comparing_quantities.json",
        "expected_fragment": "Simple Interest",
        "competency_type": "application",
        "expected_answer": 100,
    },
    {
        "q": "An item was bought for Rs 500 and sold for Rs 600. Find the profit and profit percentage. Explain the difference between profit and profit percent.",
        "catalog": "catalog_class7_maths_ch7_comparing_quantities.json",
        "expected_fragment": "Profit",
        "competency_type": "application",
        "expected_answer": 20,
    },

    # === Chapter 8: Rational Numbers (3 questions) ===
    {
        "q": "Reduce -45/30 to standard form. Explain what standard form means for rational numbers.",
        "catalog": "catalog_class7_maths_ch8_rational_numbers.json",
        "expected_fragment": "Standard Form",
        "competency_type": "computation_with_reasoning",
        "expected_answer": -1.5,
    },
    {
        "q": "Find the sum of 7/3 and -5/3. Explain why we add only the numerators when denominators are the same.",
        "catalog": "catalog_class7_maths_ch8_rational_numbers.json",
        "expected_fragment": "Addition",
        "competency_type": "computation_with_reasoning",
        "expected_answer": 2/3,
    },
    {
        "q": "Find the product of -3/5 and 2/7. Explain the rule for the sign when multiplying a negative and a positive rational number.",
        "catalog": "catalog_class7_maths_ch8_rational_numbers.json",
        "expected_fragment": "Multiplication",
        "competency_type": "computation_with_reasoning",
        "expected_answer": -6/35,
    },

    # === Chapter 9: Perimeter and Area (3 questions) ===
    {
        "q": "Find the area of a parallelogram with base 4 cm and height 3 cm. Explain why the area of a parallelogram equals base times height.",
        "catalog": "catalog_class7_maths_ch9_perimeter_area.json",
        "expected_fragment": "Parallelogram",
        "competency_type": "computation_with_reasoning",
        "expected_answer": 12,
    },
    {
        "q": "Find the area of a triangle with base 4 cm and height 2 cm. Explain why the area of a triangle is half of base times height.",
        "catalog": "catalog_class7_maths_ch9_perimeter_area.json",
        "expected_fragment": "Triangle",
        "competency_type": "computation_with_reasoning",
        "expected_answer": 4,
    },
    {
        "q": "Find the circumference of a circle of radius 14 cm using pi = 22/7. Explain what circumference measures.",
        "catalog": "catalog_class7_maths_ch9_perimeter_area.json",
        "expected_fragment": "Circumference",
        "competency_type": "computation_with_reasoning",
        "expected_answer": 88,
    },

    # === Chapter 10: Algebraic Expressions (3 questions) ===
    {
        "q": "Identify the terms in the expression 4x + 5. Explain the difference between a term and a factor.",
        "catalog": "catalog_class7_maths_ch10_algebraic_expressions.json",
        "expected_fragment": "Terms",
        "competency_type": "conceptual_understanding",
        "expected_answer": None,
    },
    {
        "q": "Find the value of x + 4 when x = 2. Explain what it means to evaluate an expression for a given value.",
        "catalog": "catalog_class7_maths_ch10_algebraic_expressions.json",
        "expected_fragment": "Value",
        "competency_type": "computation_with_reasoning",
        "expected_answer": 6,
    },
    {
        "q": "Classify the expression 3x squared minus 5x plus 2 as a monomial, binomial, or trinomial. Justify your answer.",
        "catalog": "catalog_class7_maths_ch10_algebraic_expressions.json",
        "expected_fragment": "Monomial",
        "competency_type": "verify_and_explain",
        "expected_answer": None,
    },

    # === Chapter 11: Exponents and Powers (3 questions) ===
    {
        "q": "Find the value of 2 to the power 6. Explain what the base and exponent mean in this expression.",
        "catalog": "catalog_class7_maths_ch11_exponents_powers.json",
        "expected_fragment": "Exponents",
        "competency_type": "computation_with_reasoning",
        "expected_answer": 64,
    },
    {
        "q": "Simplify 2 squared times 2 cubed using the law of exponents. State the law you used.",
        "catalog": "catalog_class7_maths_ch11_exponents_powers.json",
        "expected_fragment": "Multiplying Powers",
        "competency_type": "computation_with_reasoning",
        "expected_answer": 32,
    },
    {
        "q": "Express 5,00,00,000 in standard form. Explain why standard form is useful for large numbers.",
        "catalog": "catalog_class7_maths_ch11_exponents_powers.json",
        "expected_fragment": "Standard Form",
        "competency_type": "computation_with_reasoning",
        "expected_answer": None,
    },

    # === Chapter 12: Symmetry (3 questions) ===
    {
        "q": "How many lines of symmetry does an equilateral triangle have? Explain why each line is a line of symmetry.",
        "catalog": "catalog_class7_maths_ch12_symmetry.json",
        "expected_fragment": "Lines of Symmetry",
        "competency_type": "conceptual_understanding",
        "expected_answer": 3,
    },
    {
        "q": "What is the order of rotational symmetry of a square? Explain what rotational symmetry means.",
        "catalog": "catalog_class7_maths_ch12_symmetry.json",
        "expected_fragment": "Rotational Symmetry",
        "competency_type": "conceptual_understanding",
        "expected_answer": 4,
    },
    {
        "q": "Name a figure that has both line symmetry and rotational symmetry. Justify your choice.",
        "catalog": "catalog_class7_maths_ch12_symmetry.json",
        "expected_fragment": "Line Symmetry and Rotational",
        "competency_type": "verify_and_explain",
        "expected_answer": None,
    },

    # === Chapter 13: Visualising Solid Shapes (3 questions) ===
    {
        "q": "How many faces, edges, and vertices does a cube have? Explain how you counted each.",
        "catalog": "catalog_class7_maths_ch13_visualising_solid_shapes.json",
        "expected_fragment": "Faces",
        "competency_type": "conceptual_understanding",
        "expected_answer": None,
    },
    {
        "q": "What cross-section do you get when you give a vertical cut to a brick? Explain what a cross-section is.",
        "catalog": "catalog_class7_maths_ch13_visualising_solid_shapes.json",
        "expected_fragment": "Viewing Sections",
        "competency_type": "conceptual_understanding",
        "expected_answer": None,
    },
    {
        "q": "If two cubes of dimensions 2 cm by 2 cm by 2 cm are placed side by side, what would the dimensions of the resulting cuboid be? Explain which dimension changes.",
        "catalog": "catalog_class7_maths_ch13_visualising_solid_shapes.json",
        "expected_fragment": "Visualising",
        "competency_type": "application",
        "expected_answer": None,
    },
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
    current_catalog = None

    print("=" * 70)
    print("40 Competency-Based Questions -- Class 7 Maths")
    print("Testing concept matching effectiveness")
    print("=" * 70)
    print()

    by_chapter = {}
    by_competency = {}

    for i, test in enumerate(COMPETENCY_QUESTIONS, 1):
        q = test["q"]
        catalog_file = test["catalog"]
        expected = test["expected_fragment"]
        comp_type = test["competency_type"]

        if catalog_file != current_catalog:
            reset_matcher()
            current_catalog = catalog_file

        catalog_path = os.path.join(CATALOG_DIR, catalog_file)

        try:
            concept, score, example = cm.match_concept(q, catalog_path)
        except Exception as e:
            print("Q%d: ERROR -- %s" % (i, e))
            failed += 1
            continue

        if concept is None:
            print("Q%d: NO MATCH -- %s" % (i, q[:65]))
            print("  Best score: %.3f (below threshold)" % score)
            no_match += 1
            ch = catalog_file.replace("catalog_class7_maths_ch", "ch").replace(".json", "")
            by_chapter.setdefault(ch, {"pass": 0, "fail": 0})
            by_chapter[ch]["fail"] += 1
            by_competency.setdefault(comp_type, {"pass": 0, "fail": 0})
            by_competency[comp_type]["fail"] += 1
            continue

        title = concept["title"]
        match_ok = expected.lower() in title.lower()

        if match_ok:
            passed += 1
            status = "OK"
        else:
            failed += 1
            status = "WRONG"

        ch = catalog_file.replace("catalog_class7_maths_ch", "ch").replace(".json", "")
        by_chapter.setdefault(ch, {"pass": 0, "fail": 0})
        by_chapter[ch]["pass" if match_ok else "fail"] += 1
        by_competency.setdefault(comp_type, {"pass": 0, "fail": 0})
        by_competency[comp_type]["pass" if match_ok else "fail"] += 1

        print("Q%d [%s]: %s" % (i, status, q[:65]))
        print("  Matched: %s (score=%.3f)" % (title, score))
        if not match_ok:
            print("  Expected: %s" % expected)
        print()

    print("=" * 70)
    print("OVERALL SUMMARY")
    print("=" * 70)
    print("  Passed:    %d / %d  (%.1f%%)" % (passed, len(COMPETENCY_QUESTIONS), 100*passed/len(COMPETENCY_QUESTIONS)))
    print("  Failed:    %d / %d  (%.1f%%)" % (failed, len(COMPETENCY_QUESTIONS), 100*failed/len(COMPETENCY_QUESTIONS)))
    print("  No match:  %d / %d  (%.1f%%)" % (no_match, len(COMPETENCY_QUESTIONS), 100*no_match/len(COMPETENCY_QUESTIONS)))
    print()

    print("BY CHAPTER:")
    for ch in sorted(by_chapter.keys()):
        s = by_chapter[ch]
        total = s["pass"] + s["fail"]
        pct = 100 * s["pass"] / total if total else 0
        print("  %-30s  %d/%d  (%.0f%%)" % (ch, s["pass"], total, pct))
    print()

    print("BY COMPETENCY TYPE:")
    for ct in sorted(by_competency.keys()):
        s = by_competency[ct]
        total = s["pass"] + s["fail"]
        pct = 100 * s["pass"] / total if total else 0
        print("  %-30s  %d/%d  (%.0f%%)" % (ct, s["pass"], total, pct))
    print("=" * 70)

    return passed, failed, no_match


if __name__ == "__main__":
    passed, failed, no_match = run_tests()
    if failed + no_match > 0:
        print("\n%d questions did not match correctly." % (failed + no_match))
        sys.exit(1)
    else:
        print("\nAll 40 competency questions matched correctly.")
        sys.exit(0)
