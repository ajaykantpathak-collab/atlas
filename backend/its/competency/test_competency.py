"""Test competency-style questions -- reasoning, justification, error analysis."""
from backend.its.competency.concept_matcher import match_concept
from backend.its.competency.solution_executor import solve

competency_tests = [
    # Competency: error identification
    {
        "q": "A student says (-5) x (-3) = -15. Is this correct? Justify your answer.",
        "expected_concept": "Multiplication of Two Negative Integers",
        "expected_answer": 15,
    },
    # Competency: conceptual understanding
    {
        "q": "Why is the product of two negative integers always positive? Explain with an example.",
        "expected_concept": "Multiplication of Two Negative Integers",
    },
    # Competency: application
    {
        "q": "In a test, +4 marks for correct and -1 for incorrect. Mohini scored -5 with 7 correct. How many incorrect?",
        "expected_concept": "Division of Integers",
        "expected_answer": 33,
    },
    # Competency: comparison
    {
        "q": "Which is larger: (-15) / 3 or (-15) / (-3)? Justify.",
        "expected_concept": "Division of Integers",
    },
    # Competency: verify and explain
    {
        "q": "Verify that (-2) x (3 + 5) = [(-2) x 3] + [(-2) x 5]. Which property is this?",
        "expected_concept": "Distributive Property",
        "expected_answer": True,
    },
]

print("=" * 70)
for i, test in enumerate(competency_tests, 1):
    q = test["q"]
    concept, score, example = match_concept(q)
    print("Test %d: %s" % (i, q[:70]))
    if concept:
        print("  Concept: %s (score=%.3f)" % (concept["title"], score))
        expected_c = test["expected_concept"]
        ok = concept["title"] == expected_c
        print("  Concept match: %s (expected: %s)" % ("OK" if ok else "WRONG", expected_c))

        result = solve(q, concept)
        if "steps" in result:
            for step in result["steps"]:
                print("    Step %d: %s" % (step["step"], step.get("explain", "")))
            print("  Answer: %s" % result.get("answer"))
            if "expected_answer" in test:
                ea = test["expected_answer"]
                got = result.get("answer")
                ans_ok = got == ea
                print("  Answer check: %s (expected: %s)" % ("OK" if ans_ok else "WRONG", ea))
        else:
            print("  Type: %s" % result.get("type", ""))
            print("  Message: %s" % result.get("message", ""))
    else:
        print("  NO CONCEPT MATCH")
    print()
print("=" * 70)
