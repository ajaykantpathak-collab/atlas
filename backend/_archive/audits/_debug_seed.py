"""Debug the seed validation in generate_class7_bio_questions."""
import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

fn = reg.get_question_gen("generate_class7_bio_questions")

# Try different seed values
for seed in [0, 1, 42, 100, 1000, 2**32 - 1]:
    try:
        result = fn(seed=seed)
        print(f"seed={seed}: OK - {type(result).__name__}")
        break
    except Exception as e:
        print(f"seed={seed}: {str(e)[:80]}")

# Check the source
import inspect
src = inspect.getsource(fn)
# Find the seed validation
for line in src.split('\n'):
    if 'seed' in line.lower() and ('must' in line.lower() or 'between' in line.lower() or '0' in line):
        print(f"\nValidation line: {line.strip()}")
