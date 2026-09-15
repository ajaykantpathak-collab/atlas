"""Find the unbalanced brace in teacher-overview page.tsx"""
import re

path = r"D:\platform\frontend\app\(teacher)\teacher-overview\page.tsx"
content = open(path, encoding="utf-8").read()

# Remove strings and comments
content_clean = re.sub(r'//[^\n]*', '', content)
content_clean = re.sub(r'/\*.*?\*/', '', content_clean, flags=re.DOTALL)
content_clean = re.sub(r'`[^`]*`', '""', content_clean)
content_clean = re.sub(r"'[^']*'", '""', content_clean)
content_clean = re.sub(r'"[^"]*"', '""', content_clean)

# Track brace depth line by line
depth = 0
lines = content_clean.split('\n')
for i, line in enumerate(lines):
    opens = line.count('{')
    closes = line.count('}')
    old_depth = depth
    depth += opens - closes
    # Print lines where depth changes significantly or goes negative
    if opens != closes or depth < 0:
        print(f"  L{i+1:4d}: depth {old_depth}->{depth}  (+{opens} -{closes})  {line.strip()[:80]}")

print(f"\nFinal depth: {depth}")
