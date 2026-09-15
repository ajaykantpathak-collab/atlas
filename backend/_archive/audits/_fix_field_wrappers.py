"""Fix incorrectly wrapped field() calls in class10_english_solver.py."""
import re

path = r"D:\platform\backend\solvers\english\class10_english_solver.py"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Module-level constants (no indentation) should NOT use field()
# Pattern: ^NAME: Type = field(default_factory=lambda: VALUE)
# Replace with: ^NAME: Type = VALUE
content = re.sub(
    r'^(\w+:\s*[\w\[\], ]+\s*=\s*)field\(default_factory=lambda:\s*(.+)\)$',
    r'\1\2',
    content,
    flags=re.MULTILINE
)

# Local variables inside methods (8+ spaces indent) should NOT use field()
# Pattern:        var = field(default_factory=lambda: VALUE)
# Replace with:        var = VALUE
content = re.sub(
    r'^(\s{8,}\w+\s*=\s*)field\(default_factory=lambda:\s*(.+)\)$',
    r'\1\2',
    content,
    flags=re.MULTILINE
)

# Also fix f-strings that got broken: {topic[:50])} -> {topic[:50]}
content = content.replace("{topic[:50])}", "{topic[:50]}")

# Fix SOLVER_REGISTRY at module level
content = re.sub(
    r'^SOLVER_REGISTRY:\s*Dict\[.*?\]\s*=\s*field\(default_factory=lambda:\s*(.+)\)$',
    r'SOLVER_REGISTRY: Dict[str, type] = \1',
    content,
    flags=re.MULTILINE
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Fixed field() wrappers")
