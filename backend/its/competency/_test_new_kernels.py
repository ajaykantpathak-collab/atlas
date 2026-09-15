"""End-to-end test of the 19 newly added kernels.

Tests that the full pipeline (route -> extract slots -> execute) works
for the new concepts we added kernels for.
"""
import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", ".."))

from backend.its.solver.catalog_executor import _KERNELS
from backend.its.solver.slot_extractor import extract_slots

# Load catalogs to get concept dicts
COMP_DIR = os.path.join(os.path.dirname(__file__))

def load_concept(cid):
    for f in sorted(os.listdir(COMP_DIR)):
        if f.startswith("catalog_") and f.endswith(".json"):
            d = json.load(open(os.path.join(COMP_DIR, f), encoding="utf-8"))
            for c in d.get("concepts", []):
                if c.get("id") == cid:
                    return c
    return None

# Test cases: (concept_id, question_text, expected_answer, description)
TESTS = [
    # ch4 simple equations
    ("c7m4.4.2", "Solve: x + 5 = 12", 7.0, "balancing x+5=12"),
    ("c7m4.5.1", "Solve by transposing: x + 7 = 15", 8.0, "transposing x+7=15"),
    ("c7m4.5.2", "Solve: 3(x + 2) = 18", 4.0, "brackets 3(x+2)=18"),
    ("c7m4.6.1", "The sum of two numbers is 20 and one exceeds the other by 4. Find them.", 8.0, "word problem sum/diff"),
    # ch8 rational numbers
    ("c7m8.6.1", "Reduce 6/8 to standard form", 0.75, "standard form 6/8"),
    ("c7m8.7.1", "Compare 3/4 and 5/6", None, "compare (returns 1/-1/0)"),
    ("c7m8.8.1", "Find 3 rational numbers between 1/2 and 1/3", None, "between (returns first)"),
    ("c7m8.9.1", "Add: 1/2 + 1/3", 5/6, "add 1/2+1/3"),
    ("c7m8.9.2", "Subtract: 1/2 - 1/3", 1/6, "subtract 1/2-1/3"),
    ("c7m8.9.3", "Multiply: 2/3 x 4/5", 8/15, "multiply 2/3*4/5"),
    ("c7m8.9.4", "Divide: 2/3 / 4/5", 10/12, "divide 2/3 / 4/5"),
    # ch10 algebraic expressions
    ("c7m10.6.1", "Evaluate 3x + 2 when x = 5", 17.0, "eval 3x+2 at x=5"),
    # ch5 transversal
    ("c7m5.3.4", "Two parallel lines are cut by a transversal. If a corresponding angle is 65 degrees, find the other corresponding angle.", 65.0, "corresponding angles"),
    # ch6 triangle
    ("c7m6.6.2", "An isosceles triangle has a vertex angle of 40 degrees. Find the base angles.", 70.0, "isosceles base angles"),
    ("c7m6.7.1", "Can a triangle have sides 3, 4, 8?", 0.0, "triangle inequality (impossible)"),
    # ch7 ratio to percent
    ("c7m7.2.3", "Convert the ratio 3:5 to a percentage", 60.0, "ratio 3:5 to percent"),
    # ch11 decimal number system
    ("c7m11.5.1", "Express 345 as a sum of powers of 10", 345.0, "decimal expansion"),
    ("c7m11.6.1", "Express 3000000 in standard form", 3000000.0, "standard form large"),
    # ch13 solid objects
    ("c7m13.4.3", "A cuboid has 6 faces, 12 edges and 8 vertices. Verify Euler's formula.", 2.0, "Euler's formula"),
]

passed = 0
failed = 0
skipped = 0

for cid, question, expected, desc in TESTS:
    concept = load_concept(cid)
    if concept is None:
        print("SKIP %s: concept not found" % cid)
        skipped += 1
        continue
    kernel = _KERNELS.get(cid)
    if kernel is None:
        print("SKIP %s: no kernel" % cid)
        skipped += 1
        continue
    try:
        slots = extract_slots(question, concept)
    except Exception as e:
        print("FAIL %s (%s): slot extraction error: %s" % (cid, desc, e))
        failed += 1
        continue
    if slots is None:
        print("FAIL %s (%s): no slots extracted" % (cid, desc))
        failed += 1
        continue
    try:
        result = kernel(slots, question)
    except Exception as e:
        print("FAIL %s (%s): kernel error: %s" % (cid, desc, e))
        failed += 1
        continue
    if result is None:
        print("FAIL %s (%s): kernel returned None" % (cid, desc))
        failed += 1
        continue
    value, lines = result
    if expected is None:
        print("OK   %s (%s): value=%s (no expected check)" % (cid, desc, value))
        passed += 1
    elif abs(value - expected) < 0.001:
        print("OK   %s (%s): value=%s expected=%s" % (cid, desc, value, expected))
        passed += 1
    else:
        print("FAIL %s (%s): value=%s expected=%s" % (cid, desc, value, expected))
        failed += 1

print()
print("SUMMARY: %d passed, %d failed, %d skipped" % (passed, failed, skipped))
