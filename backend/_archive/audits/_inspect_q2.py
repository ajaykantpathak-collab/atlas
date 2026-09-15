"""Inspect Question object attributes properly."""
import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

fn = reg.get_question_gen("generate_c3_evs_001")
result = fn()

q = result.questions[0]
print(f"Question attrs:")
for a in ['id', 'stem', 'answer', 'qtype', 'difficulty', 'options',
          'explanation', 'competency', 'cognitive_level', 'node_id',
          'node_label', 'indian_context']:
    val = getattr(q, a, 'MISSING')
    print(f"  {a}: {str(val)[:150]}")

# Check all questions
print(f"\nTotal questions: {len(result.questions)}")
for i, q in enumerate(result.questions[:5]):
    print(f"\nQ{i+1}: {q.qtype} | {q.stem[:100]}")
    print(f"  Answer: {str(q.answer)[:100]}")
    print(f"  Difficulty: {q.difficulty}")
    if q.options:
        print(f"  Options: {q.options[:3]}")
