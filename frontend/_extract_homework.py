import re, json

with open('app/(student)/homework/page.tsx.raw', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.strip()
if content.startswith('```'):
    lines = content.split('\n')
    content = '\n'.join(lines[1:-1])

# Fix invalid JSON escapes: double any backslash not followed by valid escape char
# Valid JSON escapes: \n \t \r \b \f \" \\ \/ \uXXXX
# Also handle \' (invalid in JSON but present in file) -> just '
def fix_escapes(s):
    result = []
    i = 0
    while i < len(s):
        if s[i] == '\\' and i + 1 < len(s):
            next_c = s[i + 1]
            if next_c in 'ntrbf"\\/u':
                result.append(s[i:i+2])
                i += 2
            elif next_c == "'":
                result.append("'")
                i += 2
            else:
                result.append('\\\\')
                result.append(next_c)
                i += 2
        else:
            result.append(s[i])
            i += 1
    return ''.join(result)

fixed = fix_escapes(content)
data = json.loads(fixed)
code = data['code']

# Fix apostrophe issues in single-quoted strings
code = code.replace(
    "needsWork: 'Keep practicing! You'll get better!",
    'needsWork: "Keep practicing! You\'ll get better!'
)

with open('_homework_fixed.tsx', 'w', encoding='utf-8', newline='\n') as f:
    f.write(code)

lines = code.split('\n')
trailing = sum(1 for l in lines if l.endswith('\\') and l.strip())
print(f"Lines: {len(lines)}, Trailing backslashes: {trailing}")
print("=== First 3 ===")
for l in lines[:3]: print(l[:80])
print("=== Last 3 ===")
for l in lines[-3:]: print(l[:80])
