"""Extract all solver names and variable dicts from class12_chem_questions.py."""
import re
from pathlib import Path

text = Path(r"D:\platform\backend\solvers\chem\class12_chem_questions.py").read_text(encoding="utf-8")

# Find all: SOLVER_REGISTRY["solver_name"] calls and nearby variables
# Pattern: variables = {...} followed by solver_fn = SOLVER_REGISTRY["..."]
pattern1 = r'variables\s*=\s*\{([^}]+)\}.*?SOLVER_REGISTRY\["([^"]+)"\]'
matches1 = re.findall(pattern1, text, re.DOTALL)

# Also find direct: SOLVER_REGISTRY["..."] without variables dict
pattern2 = r'SOLVER_REGISTRY\["([^"]+)"\]'
all_names = re.findall(pattern2, text)

solvers = {}
for vars_str, solver_name in matches1:
    var_names = re.findall(r'"(\w+)"', vars_str)
    if solver_name not in solvers:
        solvers[solver_name] = set()
    solvers[solver_name].update(var_names)

# Also find fn_name patterns
pattern3 = r'fn_name\s*=\s*"([^"]+)"'
fn_names = re.findall(pattern3, text)
for fn in fn_names:
    if fn not in solvers:
        solvers[fn] = set()

print(f"Total unique solvers: {len(solvers)}\n")
for name in sorted(solvers.keys()):
    vars = sorted(solvers[name])
    print(f"  {name}({', '.join(vars) if vars else '???'})")

# Also check what variables are passed near each SOLVER_REGISTRY call
print("\n=== All SOLVER_REGISTRY references with context ===")
for m in re.finditer(r'SOLVER_REGISTRY\["([^"]+)"\]', text):
    name = m.group(1)
    start = max(0, m.start() - 200)
    context = text[start:m.start()]
    # Find variables dict in context
    vars_match = re.findall(r'variables\s*=\s*\{([^}]+)\}', context)
    if vars_match:
        var_names = re.findall(r'"(\w+)"', vars_match[-1])
        print(f"  {name}({', '.join(var_names)})")
    else:
        print(f"  {name}(???)")
