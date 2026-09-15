"""Fix module-level field() calls that span multiple lines."""
path = r"D:\platform\backend\solvers\english\class10_english_solver.py"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# These module-level constants should NOT use field()
# They span multiple lines, so we need to handle them carefully

# Replace: NAME: Type = field(default_factory=lambda: [
# With:    NAME: Type = [
import re

# Fix module-level (no indent) field() calls
# Pattern: ^NAME: Type = field(default_factory=lambda: [
content = re.sub(
    r'^(\w+:\s*[\w\[\], ]+\s*=\s*)field\(default_factory=lambda:\s*\[',
    r'\1[',
    content,
    flags=re.MULTILINE
)

# Fix module-level field() with dict: ^NAME: Type = field(default_factory=lambda: {
content = re.sub(
    r'^(\w+:\s*[\w\[\], ]+\s*=\s*)field\(default_factory=lambda:\s*\{',
    r'\1{',
    content,
    flags=re.MULTILINE
)

# Now fix the closing: ]) should be ] and }) should be }
# But only for the module-level constants we just fixed
# The closing pattern is: \n]) or \n})
# This is tricky because we don't want to break legitimate code

# Actually, the field() wrapping adds an extra ) at the end
# So the original was: [...]\n  )  -> became: [...]\n  ])
# We need to remove the trailing ) from these

# Let's find lines that are just ]) or }) at module level or low indent
# and check if they're part of a field() construct
# Actually, let's just count and fix manually

# The safest approach: find the specific patterns
# _COMMON_ERRORS ends with: ])
# _PREPOSITION_PAIRS ends with: ])
# etc.

# Replace ]) with ] only when it's closing a field() we removed
# Since we already removed field(default_factory=lambda: [, 
# the closing ]) now has an extra )
# Let's find all ]) at the end of a block and change to ]

# Actually, let me just do a targeted fix:
# Find all lines that are exactly "])" and change to "]"
# But only if the opening was a field() we fixed
# This is getting complex. Let me just manually fix each one.

lines = content.split('\n')
in_field_block = False
field_indent = 0
result = []

for i, line in enumerate(lines):
    # Check if this line starts a field() block we need to fix
    # (already replaced field() with [ or {)
    
    # Check if this line closes a field block: ends with ]) or })
    stripped = line.rstrip()
    if stripped.endswith('])') and not stripped.endswith('[]])'):
        # Check if this is closing a former field() block
        # The ]) pattern means: close list, close field()
        # We want just ]
        result.append(line[:-1].rstrip() + ']')
        continue
    elif stripped.endswith('})') and not 'lambda' in line:
        # Close dict, close field() -> just }
        result.append(line[:-1].rstrip() + '}')
        continue
    
    result.append(line)

content = '\n'.join(result)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Fixed multi-line field() wrappers")
