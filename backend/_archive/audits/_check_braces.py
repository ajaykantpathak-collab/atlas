"""Check brace/bracket/paren balance in teacher-overview page.tsx"""
import re

path = r"D:\platform\frontend\app\(teacher)\teacher-overview\page.tsx"
content = open(path, encoding="utf-8").read()

# Simple balance check (not perfect, but catches major issues)
# Remove strings and comments first
# Remove line comments
content_clean = re.sub(r'//[^\n]*', '', content)
# Remove block comments
content_clean = re.sub(r'/\*.*?\*/', '', content_clean, flags=re.DOTALL)
# Remove template literals (backtick strings)
content_clean = re.sub(r'`[^`]*`', '""', content_clean)
# Remove single-quoted strings
content_clean = re.sub(r"'[^']*'", '""', content_clean)
# Remove double-quoted strings
content_clean = re.sub(r'"[^"]*"', '""', content_clean)

braces = content_clean.count('{') - content_clean.count('}')
brackets = content_clean.count('[') - content_clean.count(']')
parens = content_clean.count('(') - content_clean.count(')')

print(f"Braces diff:  {braces}")
print(f"Brackets diff: {brackets}")
print(f"Parens diff:   {parens}")

# Also check for any stray \r in the middle of lines
lines = content.split('\n')
for i, line in enumerate(lines):
    if '\r' in line and not line.endswith('\r'):
        # \r in the middle of a line
        pos = line.index('\r')
        print(f"  Embedded \\r at line {i+1}, col {pos}: ...{line[max(0,pos-20):pos+20]}...")

# Check for backtick balance
backticks = content.count('`')
print(f"Backticks: {backticks} ({'odd!' if backticks % 2 else 'even'})")
