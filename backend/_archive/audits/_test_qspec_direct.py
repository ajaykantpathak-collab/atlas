"""Direct test of _try_generate with QuestionSpec."""
import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
from services.question_selector import QuestionSelector

reg = SolverRegistry()
reg.initialize()

class MockDb:
    async def execute(self, *a, **kw):
        class R:
            def scalars(self):
                class S:
                    def all(self): return []
                    def first(self): return None
                return S()
            def scalar_one_or_none(self): return None
            def scalar(self): return 0
        return R()

selector = QuestionSelector(MockDb())

# Test _try_generate directly with q_0
print("=== Testing _try_generate with q_0 ===")
result = selector._try_generate("q_0", "motion", 0, 0.3, 3)
if result:
    print(f"  REAL: {result.get('text', '')[:100]}")
    print(f"  Source: {result.get('source')}")
else:
    print(f"  returned None")

# Test with q_5
print("\n=== Testing _try_generate with q_5 ===")
result = selector._try_generate("q_5", "motion", 0, 0.3, 3)
if result:
    print(f"  REAL: {result.get('text', '')[:100]}")
else:
    print(f"  returned None")

# Check if q_0 is being matched
print("\n=== Checking matching for physics grade 1 ===")
fn = reg.get_question_gen("q_0")
print(f"  q_0 type: {type(fn).__name__}")
print(f"  has description: {hasattr(fn, 'description')}")
print(f"  is type (class): {isinstance(fn, type)}")
print(f"  description: {getattr(fn, 'description', 'N/A')[:80]}")
