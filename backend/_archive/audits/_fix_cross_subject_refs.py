"""Fix invalid cross-subject and prereq refs in existing prereq files.
- Reads all good .md files from prereqs dir
- For each invalid ref, fuzzy-matches against real node IDs
- Writes corrected versions to prereqs_fixed/ (NEW dir, originals untouched)
- Reports all changes"""
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
all_nodes_by_id = {}
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
                    all_nodes_by_id[nid] = node
    except:
        pass

print(f"Total real node IDs: {len(all_node_ids)}")

# Build lookup: normalized key -> real node ID
# e.g. "c11_mat_cbse_006" -> "c11_math_cbse_006"
def normalize_id(nid):
    """Remove common variations to match similar IDs."""
    return nid.lower().strip()

# Build index by subject+number for fuzzy matching
# e.g. ("mat", "006") -> ["c11_math_cbse_006", "c10_math_cbse_006"]
subj_num_index = defaultdict(list)
for nid in all_node_ids:
    parts = nid.split("_")
    if len(parts) >= 4:
        subj = parts[1]
        num = parts[-1]
        subj_num_index[(subj, num)].append(nid)

# Also build by (class, approx_subject, number)
class_subj_num_index = defaultdict(list)
for nid in all_node_ids:
    parts = nid.split("_")
    if len(parts) >= 4:
        cls = parts[0]  # e.g. c11
        subj = parts[1]
        num = parts[-1]
        class_subj_num_index[(cls, subj, num)].append(nid)

# Subject abbreviation mapping (what Claude might guess -> real)
SUBJ_ALIASES = {
    "mat": "math", "math": "math", "maths": "math",
    "phy": "phy", "physics": "phy",
    "chem": "chem", "chemistry": "chem",
    "bio": "bio", "biology": "bio",
    "eng": "eng", "engl": "eng", "english": "eng",
    "hin": "hin", "hindi": "hin",
    "geo": "geo", "geography": "geo",
    "hist": "hist", "history": "hist",
    "histciv": "histciv",
    "pol": "pol", "polsci": "pol", "political": "pol",
    "psy": "psy", "psych": "psy", "psychology": "psy",
    "soc": "soc", "sociology": "soc",
    "eco": "eco", "econ": "eco", "economics": "eco",
    "acc": "acc", "accounts": "acc",
    "bs": "bs", "business": "bs",
    "cs": "cs", "computer": "cs",
    "legal": "legal", "law": "legal",
    "hs": "hs", "home": "hs",
    "bt": "bt", "biotech": "bt",
    "amath": "amath", "applied": "amath",
    "ai": "ai",
    "evs": "evs",
    "sci": "sci", "science": "sci",
    "sst": "sst",
    "civ": "civ",
}

def find_correct_id(bad_id):
    """Try to find the correct node ID for a bad reference."""
    if bad_id in all_node_ids:
        return bad_id  # already valid

    bad_lower = bad_id.lower().strip()

    # Parse the bad ID
    parts = bad_lower.split("_")
    if len(parts) < 3:
        return None

    # Try different strategies:

    # 1. Fix subject abbreviation
    if len(parts) >= 4:
        cls = parts[0]  # e.g. c11
        subj = parts[1]
        num = parts[-1]
        real_subj = SUBJ_ALIASES.get(subj, subj)
        if real_subj != subj:
            # Try with fixed subject
            candidates = class_subj_num_index.get((cls, real_subj, num), [])
            if len(candidates) == 1:
                return candidates[0]
            elif len(candidates) > 1:
                return candidates[0]  # take first match

    # 2. Fix class prefix (c08 -> c8)
    if len(parts) >= 4:
        cls = parts[0]
        if cls.startswith("c0"):
            fixed_cls = "c" + cls[2:]
            subj = parts[1]
            num = parts[-1]
            real_subj = SUBJ_ALIASES.get(subj, subj)
            candidates = class_subj_num_index.get((fixed_cls, real_subj, num), [])
            if len(candidates) == 1:
                return candidates[0]
            elif len(candidates) > 1:
                return candidates[0]

    # 3. Remove extra segments (e.g. c11_acc_cbse_ch3_001 -> c11_acc_cbse_001)
    if len(parts) >= 5:
        cls = parts[0]
        subj = parts[1]
        cbse = parts[2] if parts[2] == "cbse" else "cbse"
        num = parts[-1]
        real_subj = SUBJ_ALIASES.get(subj, subj)
        candidate = f"{cls}_{real_subj}_{cbse}_{num}"
        if candidate in all_node_ids:
            return candidate

    # 4. Try just (subject, number) match across all classes
    if len(parts) >= 4:
        subj = parts[1]
        num = parts[-1]
        real_subj = SUBJ_ALIASES.get(subj, subj)
        candidates = subj_num_index.get((real_subj, num), [])
        if len(candidates) == 1:
            return candidates[0]

    # 5. If bad_id is just a prefix (e.g. "c8_math_cbse" with no number), can't fix
    if not parts[-1].isdigit():
        return None

    return None


def fix_file(content, filename):
    """Fix invalid refs in file content. Returns (fixed_content, fixes_applied, unfixable)."""
    fixes = []
    unfixable = []

    # Find all node ID references in lists: [id1, id2, ...]
    # Pattern: matches IDs inside brackets after prerequisite_node_ids or cross_subject_prereqs
    def replace_ref(match):
        ref = match.group(1).strip().strip("'\"")
        if not ref:
            return match.group(0)
        if ref in all_node_ids:
            return match.group(0)  # valid, no change

        corrected = find_correct_id(ref)
        if corrected:
            fixes.append((ref, corrected, filename))
            return match.group(0).replace(ref, corrected)
        else:
            unfixable.append((ref, filename))
            return match.group(0)  # can't fix, leave as is

    # Fix IDs in prerequisite_node_ids and cross_subject_prereqs lists
    # Match patterns like: ['c11_mat_cbse_006'] or ["c8_math_cbse"] or [c11_acc_cbse_ch3_001, c12_acc_cbse_007]
    fixed = re.sub(
        r"['\"]?(c\d+_[a-z]+_(?:cbse|cisce)_[\w]+)['\"]?",
        lambda m: f"'{find_correct_id(m.group(1)) or m.group(1)}'" if m.group(1) not in all_node_ids else m.group(0),
        content
    )

    # Also fix bare references in reasons JSON: "c11_mat_cbse_006": "..."
    fixed = re.sub(
        r'"(c\d+_[a-z]+_(?:cbse|cisce)_[\w]+)"\s*:',
        lambda m: f'"{find_correct_id(m.group(1)) or m.group(1)}":' if m.group(1) not in all_node_ids else m.group(0),
        fixed
    )

    # Recount fixes
    return fixed, fixes, unfixable


# Process all good files
good_files = [f for f in PREREQS_DIR.glob("*.md") if f.stat().st_size >= 500]
print(f"Files to process: {len(good_files)}")

all_fixes = []
all_unfixable = []
files_changed = 0
files_unchanged = 0

for f in sorted(good_files):
    content = f.read_text(encoding="utf-8")

    # Skip error messages
    if "Token limit" in content[:200] or "rate limit" in content[:200]:
        continue

    fixed_content, fixes, unfixable = fix_file(content, f.name)

    # Write to fixed dir
    out_path = FIXED_DIR / f.name
    out_path.write_text(fixed_content, encoding="utf-8")

    if fixes:
        all_fixes.extend(fixes)
        files_changed += 1
    else:
        files_unchanged += 1
    all_unfixable.extend(unfixable)

# Report
print(f"\n{'='*100}")
print(f"  CROSS-SUBJECT REF FIX REPORT")
print(f"{'='*100}")
print(f"  Files processed:        {len(good_files)}")
print(f"  Files changed:          {files_changed}")
print(f"  Files unchanged:        {files_unchanged}")
print(f"  Total refs fixed:       {len(all_fixes)}")
print(f"  Total refs unfixable:   {len(all_unfixable)}")
print(f"  Output dir:             {FIXED_DIR}")

if all_fixes:
    print(f"\n{'='*100}")
    print(f"  FIXED REFS (sample, {len(all_fixes)} total)")
    print(f"{'='*100}")
    for bad, good, fname in all_fixes[:30]:
        print(f"  {bad:30s} -> {good:30s}  (in {fname})")
    if len(all_fixes) > 30:
        print(f"  ... and {len(all_fixes) - 30} more")

if all_unfixable:
    print(f"\n{'='*100}")
    print(f"  UNFIXABLE REFS ({len(all_unfixable)} total)")
    print(f"{'='*100}")
    # Group by ref
    ref_counts = defaultdict(list)
    for ref, fname in all_unfixable:
        ref_counts[ref].append(fname)
    for ref, fnames in sorted(ref_counts.items(), key=lambda x: -len(x[1])):
        print(f"  {ref:30s}  ({len(fnames)} occurrences)")
        if len(fnames) <= 3:
            for fn in fnames:
                print(f"    in {fn}")

# Verify fixed files
print(f"\n{'='*100}")
print(f"  VERIFYING FIXED FILES")
print(f"{'='*100}")
invalid_after = 0
total_refs_after = 0
for f in sorted(FIXED_DIR.glob("*.md")):
    content = f.read_text(encoding="utf-8")
    if "Token limit" in content[:200]:
        continue
    # Find all node ID refs
    refs = re.findall(r"'?(c\d+_[a-z]+_(?:cbse|cisce)_[\w]+)'?", content)
    for r in refs:
        total_refs_after += 1
        if r not in all_node_ids:
            invalid_after += 1
print(f"  Total refs in fixed files:  {total_refs_after}")
print(f"  Invalid after fixing:       {invalid_after}")
print(f"  Validity rate:              {100*(total_refs_after - invalid_after)//total_refs_after if total_refs_after else 0}%")
