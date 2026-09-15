"""Debug remaining EMPTY class12_chem generators."""
import sys, traceback
sys.path.insert(0, '.')
from solvers.chem.class12_chem_questions import VarGen

# Test gen_amines_problem
print("=== gen_amines_problem ===")
from solvers.chem.class12_chem_questions import gen_amines_problem
try:
    vg = VarGen(42)
    result = gen_amines_problem(vg, competency=False)
    print(f"  OK: {result.question_text[:80]}")
except Exception as e:
    print(f"  ERROR: {e}")
    traceback.print_exc()

# Test gen_dblock_problem
print("\n=== gen_dblock_problem ===")
from solvers.chem.class12_chem_questions import gen_dblock_problem
try:
    vg = VarGen(42)
    result = gen_dblock_problem(vg, competency=False)
    print(f"  OK: {result.question_text[:80]}")
except Exception as e:
    print(f"  ERROR: {e}")
    traceback.print_exc()
