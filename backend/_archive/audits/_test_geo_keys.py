import sys; sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
reg = SolverRegistry(); reg.initialize()
fn = reg.get_question_gen("class8_geo")
result = fn(seed=42, count=3)
print(f"Questions: {len(result)}")
if result:
    q = result[0]
    print(f"Keys: {list(q.keys())}")
    for k, v in q.items():
        print(f"  {k}: {str(v)[:100]}")
