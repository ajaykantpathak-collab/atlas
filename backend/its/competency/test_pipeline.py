"""Test the full pipeline: match concept + solve question."""
from backend.its.competency.concept_matcher import match_concept
from backend.its.competency.solution_executor import solve

tests = [
    ("Find the product: 3 x (-1)", -3),
    ("Find the product: (-21) x (-30)", 630),
    ("Evaluate: (-30) / 10", -3),
    ("Evaluate: (-36) / (-9)", 4),
    ("Verify: 18 x [7 + (-3)] = [18 x 7] + [18 x (-3)]", True),
    ("In a class test +3 for correct and -2 for incorrect. Radhika scored 20 with 12 correct. How many incorrect?", 8),
]

print("=" * 70)
for q, expected in tests:
    concept, score, example = match_concept(q)
    if not concept:
        print("Q: %s" % q[:60])
        print("  NO CONCEPT MATCH")
        print()
        continue
    result = solve(q, concept)
    print("Q: %s" % q)
    print("  Concept: %s (score=%.3f)" % (concept["title"], score))
    print("  Type: %s" % result.get("type", ""))
    if "steps" in result:
        for step in result["steps"]:
            print("    Step %d: %s" % (step["step"], step.get("explain", "")))
        print("  Answer: %s" % result.get("answer"))
        print("  Expected: %s" % expected)
        ok = result.get("answer") == expected
        print("  STATUS: %s" % ("OK" if ok else "WRONG"))
    else:
        print("  No steps. Message: %s" % result.get("message", ""))
    print()
print("=" * 70)
