import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
from services.question_adapter import AdapterRegistry
reg = SolverRegistry(); reg.initialize()
adapters = AdapterRegistry(); adapters.set_solver_registry(reg)

# Test class9_maths DeterministicQuestionGenerator
qt = 'class9_maths_questions:DeterministicQuestionGenerator'
adapter = adapters.get_adapter(qt)
print(f'adapter: {adapter}')
if adapter:
    qs = adapter.generate(seed=42, count=1, difficulty=0.5)
    if qs:
        print(f'OK: {str(qs[0].get("question_text",""))[:60]}')
    else:
        print('EMPTY')

# Test class7_maths build_worksheet
print()
qt = 'class7_maths_questions:build_worksheet'
adapter = adapters.get_adapter(qt)
print(f'adapter: {adapter}')
if adapter:
    qs = adapter.generate(seed=42, count=1, difficulty=0.5)
    if qs:
        print(f'OK: {str(qs[0].get("question_text",""))[:60]}')
    else:
        print('EMPTY')
