"""Fix invalid cross-subject and prereq refs in existing prereq files.
V2 - properly tracks fixes, handles all ref formats.
Writes corrected versions to prereqs_fixed/ (NEW dir, originals untouched)."""
import json
import re
from pathlib import Path
from collections import defaultdict

CBSE_OUTPUT = Path(r"D:\platform\cbse_coverage_output")
PREREQS_DIR = Path(r"D:\platform\cbse_data\prereqs")
FIXED_DIR = Path(r"D:\platform\cbse_data\prereqs_fixed")
FIXED_DIR.mkdir(parents=True, exist_ok=True)

# Load all node IDs
all_node_ids = set()
for f in CBSE_OUTPUT.glob("*_result.json"):
    if f.stat().st_size < 500:
        continue
    try:
        data = json.loads(f.read_text(encoding="utf-8"))
        for chunk in data.get("results", []):
            for node in chunk.get("nodes", []):
                nid = node.get("node_id", "")
                if nid:
                    all_node_ids.add(nid)
    except:
        pass

print(f"Total real node IDs: {len(all_node_ids)}")

# Build indexes for fuzzy matching
# (class, subject, number) -> node_id
class_subj_num = defaultdict(list)
# (subject, number) -> node_id  (across all classes)
subj_num = defaultdict(list)
# (class, subject) -> [node_ids]  (for prefix-only refs)
class_subj = defaultdict(list)

for nid in all_node_ids:
    parts = nid.split("_")
    if len(parts) >= 4:
        cls, subj, board, num = parts[0], parts[1], parts[2], parts[-1]
        class_subj_num[(cls, subj, num)].append(nid)
        subj_num[(subj, num)].append(nid)
        class_subj[(cls, subj)].append(nid)

SUBJ_ALIASES = {
    "mat": "math", "maths": "math",
    "physics": "phy",
    "chemistry": "chem",
    "biology": "bio",
    "english": "eng", "engl": "eng",
    "hindi": "hin",
    "geography": "geo",
    "history": "hist",
    "political": "pol", "polsci": "pol",
    "psych": "psy", "psychology": "psy",
    "sociology": "soc",
    "econ": "eco", "economics": "eco",
    "accounts": "acc",
    "business": "bs",
    "computer": "cs",
    "law": "legal",
    "home": "hs",
    "biotech": "bt",
    "applied": "amath",
    "science": "sci",
}

def find_correct_id(bad_id):
    """Try to find the correct node ID for a bad reference."""
    if bad_id in all_node_ids:
        return bad_id

    parts = bad_id.split("_")

    # Case 1: prefix only (e.g. "c8_math_cbse" - no number)
    # Can't fix - too ambiguous
    if len(parts) == 3:
        cls, subj, board = parts
        real_subj = SUBJ_ALIASES.get(subj, subj)
        # Return None - can't know which node number was intended
        return None

    if len(parts) < 4:
        return None

    cls = parts[0]
    subj = parts[1]
    num = parts[-1]

    # Fix subject abbreviation
    real_subj = SUBJ_ALIASES.get(subj, subj)

    # Case 2: extra segments (e.g. c11_acc_cbse_ch3_001 -> c11_acc_cbse_001)
    if len(parts) > 4:
        candidate = f"{cls}_{real_subj}_cbse_{num}"
        if candidate in all_node_ids:
            return candidate

    # Case 3: wrong subject abbreviation (e.g. c11_mat_cbse_006 -> c11_math_cbse_006)
    if real_subj != subj:
        candidates = class_subj_num.get((cls, real_subj, num), [])
        if candidates:
            return candidates[0]

    # Case 4: wrong class prefix (c08 -> c8)
    if cls.startswith("c0") and len(cls) == 3:
        fixed_cls = "c" + cls[2:]
        candidates = class_subj_num.get((fixed_cls, real_subj, num), [])
        if candidates:
            return candidates[0]

    # Case 5: try (subject, number) across all classes
    candidates = subj_num.get((real_subj, num), [])
    if len(candidates) == 1:
        return candidates[0]

    return None


# Pattern to match node ID references in any context
# Matches: c\d+_[a-z]+_cbse[_\w]*  or  c\d+_[a-z]+_cisce[_\w]*
REF_PATTERN = re.compile(r'(c\d+_[a-z]+_(?:cbse|cisce)[\w]*)')

# Process all good files
good_files = [f for f in PREREQS_DIR.glob("*.md") if f.stat().st_size >= 500]
print(f"Files to process: {len(good_files)}")

all_fixes = []
all_unfixable = []
files_changed = 0
files_unchanged = 0
total_invalid_found = 0

for f in sorted(good_files):
    content = f.read_text(encoding="utf-8")

    if "Token limit" in content[:200] or "rate limit" in content[:200]:
        continue

    # Find all refs
    refs = REF_PATTERN.findall(content)

    # Find invalid ones
    invalid_refs = set()
    for r in refs:
        if r not in all_node_ids:
            invalid_refs.add(r)

    total_invalid_found += len(invalid_refs)

    if not invalid_refs:
        # Copy as-is to fixed dir
        out_path = FIXED_DIR / f.name
        out_path.write_text(content, encoding="utf-8")
        files_unchanged += 1
        continue

    # Fix each invalid ref
    fixed_content = content
    file_fixes = []
    file_unfixable = []

    for bad_ref in invalid_refs:
        corrected = find_correct_id(bad_ref)
        if corrected:
            # Replace all occurrences of bad_ref with corrected
            fixed_content = fixed_content.replace(bad_ref, corrected)
            file_fixes.append((bad_ref, corrected, f.name))
        else:
            file_unfixable.append((bad_ref, f.name))

    # Write fixed version
    out_path = FIXED_DIR / f.name
    out_path.write_text(fixed_content, encoding="utf-8")

    if file_fixes:
        all_fixes.extend(file_fixes)
        files_changed += 1
    else:
        files_unchanged += 1
    all_unfixable.extend(file_unfixable)

# Report
print(f"\n{'='*100}")
print(f"  CROSS-SUBJECT REF FIX REPORT")
print(f"{'='*100}")
print(f"  Files processed:        {len(good_files)}")
print(f"  Files changed:          {files_changed}")
print(f"  Files unchanged:        {files_unchanged}")
print(f"  Total invalid found:    {total_invalid_found}")
print(f"  Total refs fixed:       {len(all_fixes)}")
print(f"  Total refs unfixable:   {len(all_unfixable)}")
print(f"  Output dir:             {FIXED_DIR}")

if all_fixes:
    print(f"\n{'='*100}")
    print(f"  FIXED REFS ({len(all_fixes)} total)")
    print(f"{'='*100}")
    for bad, good, fname in all_fixes[:40]:
        print(f"  {bad:35s} -> {good:35s}  (in {fname})")
    if len(all_fixes) > 40:
        print(f"  ... and {len(all_fixes) - 40} more")

if all_unfixable:
    print(f"\n{'='*100}")
    print(f"  UNFIXABLE REFS ({len(all_unfixable)} total)")
    print(f"{'='*100}")
    ref_counts = defaultdict(int)
    for ref, fname in all_unfixable:
        ref_counts[ref] += 1
    for ref, count in sorted(ref_counts.items(), key=lambda x: -x[1]):
        print(f"  {ref:35s}  ({count} occurrences)")

# Verify fixed files
print(f"\n{'='*100}")
print(f"  VERIFYING FIXED FILES")
print(f"{'='*100}")
invalid_after = 0
total_refs_after = 0
files_checked = 0
for f in sorted(FIXED_DIR.glob("*.md")):
    content = f.read_text(encoding="utf-8")
    if "Token limit" in content[:200]:
        continue
    files_checked += 1
    refs = REF_PATTERN.findall(content)
    for r in refs:
        total_refs_after += 1
        if r not in all_node_ids:
            invalid_after += 1

print(f"  Files checked:          {files_checked}")
print(f"  Total refs:             {total_refs_after}")
print(f"  Invalid after fixing:   {invalid_after}")
print(f"  Validity rate:          {100*(total_refs_after - invalid_after)//total_refs_after if total_refs_after else 0}%")
