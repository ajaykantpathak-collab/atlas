
import ast, json, sys
sys.path.insert(0, r"D:\platform\deploy")
from backend.its.solver import slop_gate

def literals(path):
    try:
        tree = ast.parse(open(path, "r", encoding="utf-8", errors="replace").read())
    except (OSError, SyntaxError):
        return set()
    return {n.value for n in ast.walk(tree)
            if isinstance(n, ast.Constant) and isinstance(n.value, str)
            and len(n.value) > 3}

old = set()
if sys.argv[1] != "-":
    old = literals(sys.argv[1])
new = literals(sys.argv[2]) - old
violations = []
for s in sorted(new):
    clean, flags = slop_gate.gate_text(s)
    if clean != s:  # ban-list rewrite on a source literal
        violations.append({"literal": s[:120],
                           "flags": [f.get("kind") for f in flags
                                     if f.get("rewritten")]})
print(json.dumps({"new_literals": len(new), "violations": violations}))
sys.exit(1 if violations else 0)
