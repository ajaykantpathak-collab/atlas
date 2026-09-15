"""Fix line 159 in class10_english_solver.py."""
path = r"D:\platform\backend\solvers\english\class10_english_solver.py"
with open(path, "r", encoding="utf-8") as f:
    lines = f.readlines()
lines[158] = '        result.setdefault("steps", [])\n'
with open(path, "w", encoding="utf-8") as f:
    f.writelines(lines)
print("Fixed line 159")
