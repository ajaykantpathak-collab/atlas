"""Find unterminated triple-quoted strings."""
path = r"D:\platform\backend\solvers\maths\class11_maths_questions.py"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

count = content.count('"""')
print(f'Triple quote count: {count} (should be even)')

# Find lines with odd triple quotes
in_triple = False
for i, line in enumerate(content.split("\n"), 1):
    c = line.count('"""')
    if c % 2 != 0:
        print(f"  Line {i}: {line.strip()[:70]}")
