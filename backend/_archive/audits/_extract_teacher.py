"""Extract the real TSX code from the JSON-wrapped teacher-overview page.
The JSON has invalid escapes so we can't use json.loads — extract fileContent manually."""

path = r"D:\platform\frontend\app\(teacher)\teacher-overview\page.tsx"
raw = open(path, encoding="utf-8").read().strip()

# Strip markdown code fences
if raw.startswith("```"):
    raw = raw.split("\n", 1)[1]
if raw.endswith("```"):
    raw = raw.rsplit("```", 1)[0]

# Find "fileContent": "..." — the value is a single-quoted string inside JSON
# Look for the pattern: "fileContent": "...everything until the next "    }
marker = '"fileContent": "'
start = raw.find(marker)
if start == -1:
    print("ERROR: fileContent not found")
    exit(1)

start += len(marker)
# Find the closing quote — it's followed by \n  }\n} 
# The string ends with a quote before the closing brace
end_marker = '"\n  }\n}'
end = raw.rfind(end_marker)
if end == -1:
    # Try alternate ending
    end_marker = '"\n    }\n  }'
    end = raw.rfind(end_marker)
if end == -1:
    print("ERROR: end not found, trying last quote")
    end = raw.rfind('"')

code_escaped = raw[start:end]

# Unescape: \n -> newline, \t -> tab, \" -> ", \\ -> \
code = code_escaped.replace("\\n", "\n").replace("\\t", "\t").replace('\\"', '"').replace("\\'", "'")
# Handle remaining escapes
code = code.replace("\\\\", "\\")

with open(path, "w", encoding="utf-8") as f:
    f.write(code)

print(f"Wrote {len(code)} chars to {path}")
print("First 300 chars:")
print(code[:300])
print("...")
print("Last 200 chars:")
print(code[-200:])
