import sys; sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
reg = SolverRegistry(); reg.initialize()
fn = reg.get_question_gen("class8_geo")
result = fn(seed=42, count=3)
print(f"Questions: {len(result)}")
if result:
    q = result[0]
    print(f"Q1: {q.get('question_text', 'N/A')[:120]}")
    print(f"A: {q.get('answer', 'N/A')[:80]}")
    print(f"Type: {q.get('question_type', 'N/A')}")
