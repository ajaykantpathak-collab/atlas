"""Fix missing closing quotes in Decimal() calls."""
import re

path = r"D:\platform\backend\solvers\evs\class10_evs_solver.py"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix pattern: Decimal("2.68) -> Decimal("2.68")
# These have missing closing quote before )
content = re.sub(r'Decimal\("([^"]+?)\)', r'Decimal("\1")', content)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Fixed Decimal calls")
