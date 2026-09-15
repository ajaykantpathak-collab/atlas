import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

# Check all class1_physics generators
entry = reg._question_gens.get("class1_physics_questions")
if entry:
    print(f"Module: class1_physics_questions")
    print(f"Types: {list(entry.registry.keys())}")
    for qt in entry.registry:
        fn = reg.get_question_gen(qt)
        print(f"\n  {qt}: type={type(fn).__name__}")
        if hasattr(fn, 'description'):
            print(f"    description: {fn.description[:100]}")
        if hasattr(fn, 'difficulty'):
            print(f"    difficulty: {fn.difficulty}")
        if hasattr(fn, 'competency'):
            print(f"    competency: {fn.competency}")
        if hasattr(fn, 'topics'):
            print(f"    topics: {fn.topics}")
        if hasattr(fn, 'node_name'):
            print(f"    node_name: {fn.node_name}")
        if hasattr(fn, 'node_id'):
            print(f"    node_id: {fn.node_id}")
        if hasattr(fn, 'variant'):
            print(f"    variant: {fn.variant}")
        if hasattr(fn, 'weight'):
            print(f"    weight: {fn.weight}")
        # Check if it's callable
        print(f"    callable: {callable(fn)}")
        # All attrs
        attrs = {a: getattr(fn, a) for a in dir(fn) if not a.startswith('_') and not callable(getattr(fn, a, None))}
        print(f"    all attrs: {attrs}")
