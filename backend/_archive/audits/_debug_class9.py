import sys, inspect
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
from services.question_adapter import AdapterRegistry

reg = SolverRegistry(); reg.initialize()
adapters = AdapterRegistry(); adapters.set_solver_registry(reg)

qt = 'class9_maths_questions:DeterministicQuestionGenerator'
adapter = adapters.get_adapter(qt)
if adapter:
    print(f"method_name: {adapter.method_name}")
    print(f"params: {adapter.params}")
    # Try calling with correct node_id
    try:
        instance = adapter.fn(seed=42)
        method = getattr(instance, adapter.method_name)
        print(f"method: {method}")
        # Check what kwargs would be built
        kwargs = {}
        mod_name = qt.split(':')[0]
        for p in adapter.params:
            if p == 'self': continue
            elif p == 'seed': kwargs[p] = 42
            elif p in ('n', 'count'): kwargs[p] = 1
            elif p == 'difficulty': kwargs[p] = 0.5
            elif p in ('node_id', 'node'): kwargs[p] = adapter.__class__._guess_node_id(mod_name, 42)
            elif p == 'qtype': kwargs[p] = 'mcq'
            elif p == 'competency_type': kwargs[p] = None
        print(f"kwargs: {kwargs}")
        result = method(**kwargs)
        print(f"result type: {type(result).__name__}")
    except Exception as e:
        import traceback
        print(f"ERROR: {e}")
        traceback.print_exc()
