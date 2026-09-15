import re
from pathlib import Path

text = Path(r"D:\platform\cisce_merge_output\maths_full_categorization.md").read_text(encoding="utf-8")

both = []
cbse_only = []
cisce_only = []
section = None

for line in text.split("\n"):
    line = line.strip()
    if line == "## BOTH":
        section = "both"
        continue
    elif line == "## CBSE_ONLY":
        section = "cbse_only"
        continue
    elif line == "## CISCE_ONLY":
        section = "cisce_only"
        continue
    if line.startswith("```") or not line:
        continue

    if section == "both" and "->" in line:
        m = re.match(r'(\S+)\s*->\s*(.+)', line)
        if m:
            both.append({"cisce": m.group(1), "cbse": [x.strip() for x in m.group(2).split(",")]})
    elif section == "both" and "\u2192" in line:
        m = re.match(r'(\S+)\s*\u2192\s*(.+)', line)
        if m:
            both.append({"cisce": m.group(1), "cbse": [x.strip() for x in m.group(2).split(",")]})
    elif section == "cbse_only" and re.match(r'c\d+_math_cbse_', line):
        cbse_only.append(line)
    elif section == "cisce_only" and re.match(r'c\d+_math_\d', line) and "cbse" not in line:
        cisce_only.append(line)

print(f"MATHS CATEGORIZATION:")
print(f"  BOTH (shared):      {len(both)}")
print(f"  CBSE_ONLY:          {len(cbse_only)}")
print(f"  CISCE_ONLY:         {len(cisce_only)}")
print(f"  Total CBSE:         {len(both) + len(cbse_only)} (should be ~1478)")
print(f"  Total CISCE:        {len(both) + len(cisce_only)} (should be ~537)")

print(f"\n=== CBSE_ONLY (first 20) ===")
for n in cbse_only[:20]:
    print(f"  {n}")
if len(cbse_only) > 20:
    print(f"  ... and {len(cbse_only)-20} more")

print(f"\n=== CISCE_ONLY ===")
for n in cisce_only:
    print(f"  {n}")
