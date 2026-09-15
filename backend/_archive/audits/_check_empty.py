"""Check if EMPTY_FUNCS files have real implementations or truly empty functions."""
import re
import os

files = [
    r"D:\platform\backend\solvers\evs\class10_evs_solver.py",
    r"D:\platform\backend\solvers\geo\class12_geo_solver.py",
    r"D:\platform\backend\solvers\histciv\class12_histciv_solver.py",
    r"D:\platform\backend\solvers\histciv\class8_histciv_solver.py",
    r"D:\platform\backend\solvers\maths\class11_maths_solver.py",
    r"D:\platform\backend\solvers\bs\class11_bs_solver.py",
]

for path in files:
    name = os.path.basename(path)
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        content = f.read()
    
    lines = content.split("\n")
    
    # Find functions with def ...:\s*$ (no body on same line)
    multi_line_defs = len(re.findall(r'^def \w+\([^)]*\):\s*$', content, re.M))
    
    # Find truly empty: def ...: followed by only pass/.../empty
    truly_empty = 0
    for i, line in enumerate(lines):
        if re.match(r'^def \w+\([^)]*\):\s*$', line):
            # Get next non-empty line
            for j in range(i+1, min(i+5, len(lines))):
                nl = lines[j].strip()
                if nl:
                    if nl in ("pass", "..."):
                        truly_empty += 1
                    break
    
    # Check for actual code (return statements, assignments, etc.)
    has_return = len(re.findall(r'^\s+return ', content, re.M))
    has_assign = len(re.findall(r'^\s+\w+ = ', content, re.M))
    
    print(f"{name:40} lines={len(lines):5} multi_line_defs={multi_line_defs:3} truly_empty={truly_empty:3} returns={has_return:4} assigns={has_assign:4}")
