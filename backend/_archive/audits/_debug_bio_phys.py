"""Debug class11/12 bio and physics generators."""
import sys, inspect, traceback
sys.path.insert(0, '.')

# class11_bio
print("=== class11_bio ===")
from solvers.bio.class11_bio_questions import gen_human_physiology_problem, VarGen
try:
    vg = VarGen(42)
    result = gen_human_physiology_problem(vg, competency=False)
    print(f"  OK: {result.question_text[:80]}")
except Exception as e:
    print(f"  ERROR: {e}")
    traceback.print_exc()

# class12_bio
print("\n=== class12_bio ===")
try:
    from solvers.bio.class12_bio_questions import gen_reproduction_problem, VarGen
    vg = VarGen(42)
    result = gen_reproduction_problem(vg, competency=False)
    print(f"  OK: {result.question_text[:80]}")
except Exception as e:
    print(f"  ERROR: {e}")
    traceback.print_exc()

# class11_physics
print("\n=== class11_physics ===")
try:
    from solvers.physics.class11_physics_questions import gen_mechanics_problem, VarGen
    vg = VarGen(42)
    result = gen_mechanics_problem(vg, competency=False)
    print(f"  OK: {result.question_text[:80]}")
except Exception as e:
    print(f"  ERROR: {e}")
    traceback.print_exc()

# class12_physics
print("\n=== class12_physics ===")
try:
    from solvers.physics.class12_physics_questions import gen_current_electricity_questions, VarGen
    vg = VarGen(42)
    result = gen_current_electricity_questions(vg, competency=False)
    print(f"  OK: {result.question_text[:80]}")
except Exception as e:
    print(f"  ERROR: {e}")
    traceback.print_exc()
