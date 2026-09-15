import sys, inspect, typing
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

fn = reg.get_question_gen("c11_phy_001")
sig = inspect.signature(fn)
hint = sig.parameters['difficulty'].annotation
print(f"Annotation: {hint}")
print(f"Type: {type(hint)}")
print(f"hint is float: {hint is float}")
print(f"has __args__: {hasattr(hint, '__args__')}")
if hasattr(hint, '__args__'):
    print(f"__args__: {hint.__args__}")
    print(f"float in __args__: {float in hint.__args__}")

# The issue might be that Optional[float] = Union[float, None]
# and float in Union's __args__ should work
# But maybe it's a string annotation?
print(f"\nIs string: {isinstance(hint, str)}")
