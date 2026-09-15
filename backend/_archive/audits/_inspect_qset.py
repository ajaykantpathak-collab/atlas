"""Inspect QuestionSet structure."""
import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

fn = reg.get_question_gen("generate_c3_evs_001")
result = fn()

print(f"Type: {type(result).__name__}")
print(f"Attrs: {[a for a in dir(result) if not a.startswith('_')]}")
print(f"  node_id: {result.node_id}")
print(f"  node_label: {result.node_label}")
print(f"  questions: {type(result.questions).__name__}, len={len(result.questions)}")

# Look at first question
q = result.questions[0]
print(f"\nFirst question type: {type(q).__name__}")
print(f"  attrs: {[a for a in dir(q) if not a.startswith('_')]}")
print(f"  id: {q.id}")
print(f"  question_text: {q.question_text[:150]}")
print(f"  correct_answer: {q.correct_answer}")
print(f"  question_type: {q.question_type}")
print(f"  options: {q.options}")
print(f"  difficulty: {q.difficulty}")

# Check to_dict
if hasattr(q, 'to_dict'):
    print(f"\n  to_dict: {q.to_dict()}")
if hasattr(result, 'to_dict'):
    d = result.to_dict()
    print(f"\n  QuestionSet.to_dict keys: {list(d.keys()) if isinstance(d, dict) else type(d)}")
