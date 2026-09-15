import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
from services.question_adapter import normalize_question

reg = SolverRegistry(); reg.initialize()
entry = reg._question_gens.get('class1_maths_questions')
fn = entry.registry.get('generate_class1_math_questions')
result = fn(seed=42, questions_per_node=5)
gen = result[0]
all_qs = []
for v in gen.values():
    if isinstance(v, list):
        all_qs.extend(v)

print(f"Total questions: {len(all_qs)}")
q = all_qs[0]
print(f"Question type: {type(q).__name__}")
print(f"Attrs: {[a for a in dir(q) if not a.startswith('_') and not callable(getattr(q,a,None))]}")
print(f"question_id: {getattr(q, 'question_id', 'N/A')}")
print(f"correct_answer: {getattr(q, 'correct_answer', 'N/A')}")

# Check if it has question_text
print(f"question_text: {getattr(q, 'question_text', 'NOT FOUND')}")
# Check for other text fields
for attr in ['question', 'stem', 'prompt', 'text', 'description', 'body']:
    val = getattr(q, attr, None)
    if val:
        print(f"  {attr}: {str(val)[:60]}")

# Try normalize
norm = normalize_question(q, "class1_maths", 0, 0.5)
print(f"\nnormalized: {norm}")
