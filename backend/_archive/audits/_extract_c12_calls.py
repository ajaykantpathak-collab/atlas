"""Extract solver call patterns from class12_chem_questions.py."""
import re
from pathlib import Path

text = Path(r"D:\platform\backend\solvers\chem\class12_chem_questions.py").read_text(encoding="utf-8")

# Find all: SOLVER_REGISTRY["name"] ... result = solver_fn(args)
pattern = r'SOLVER_REGISTRY\["(\w+)"\].*?result\s*=\s*solver_fn\(([^)]+)\)'
matches = re.findall(pattern, text, re.DOTALL)

print(f"Found {len(matches)} solver calls\n")
for name, args in matches:
    args = args.strip()
    print(f"  {name}({args})")
