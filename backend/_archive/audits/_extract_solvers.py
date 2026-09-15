"""Extract all solver names and their variable dicts from class11_chem_questions.py."""
import re
from pathlib import Path

text = Path(r"D:\platform\backend\solvers\chem\class11_chem_questions.py").read_text(encoding="utf-8")

# Find all: variables = {...} followed by solver_name = "..."
pattern = r'variables\s*=\s*\{([^}]+)\}\s*\n\s*solver_name\s*=\s*"([^"]+)"'
matches = re.findall(pattern, text)

solvers = {}
for vars_str, solver_name in matches:
    # Extract variable names
    var_names = re.findall(r'"(\w+)"', vars_str)
    if solver_name not in solvers:
        solvers[solver_name] = set()
    solvers[solver_name].update(var_names)

print(f"Total unique solvers: {len(solvers)}\n")
for name in sorted(solvers.keys()):
    vars = sorted(solvers[name])
    print(f"  {name}({', '.join(vars)})")
