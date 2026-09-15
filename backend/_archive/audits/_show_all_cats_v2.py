import re
from pathlib import Path

out = Path(r"D:\platform\cisce_merge_output")
print(f"{'Subject':30s} {'BOTH':>6s} {'CBSE_ONLY':>10s} {'CISCE_ONLY':>11s}  {'Status':>12s}")
print("-" * 75)

for f in sorted(out.glob("*_categorization.md")):
    if "full" in f.name:
        continue
    text = f.read_text(encoding="utf-8")
    has_cbse_only = "## CBSE_ONLY" in text
    has_cisce_only = "## CISCE_ONLY" in text
    section = None
    both = 0
    cbse_only = 0
    cisce_only = 0

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
        if section == "both" and re.match(r'c\d+', line):
            both += 1
        elif section == "cbse_only" and re.match(r'c\d+', line):
            cbse_only += 1
        elif section == "cisce_only" and re.match(r'c\d+', line):
            cisce_only += 1

    subj = f.stem.replace("_categorization", "")
    if has_cbse_only and has_cisce_only:
        status = "COMPLETE"
    elif has_cbse_only:
        status = "PARTIAL"
    else:
        status = "TRUNCATED"
    print(f"{subj:30s} {both:6d} {cbse_only:10d} {cisce_only:11d}  {status:>12s}")
