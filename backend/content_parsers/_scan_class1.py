"""Scan ALL directories for Class 1 files and show what they look like."""
import os
from pathlib import Path
from collections import defaultdict

CISCE_DIR = Path(r"D:\cisce")

# Find all Class 1 files across ALL directories
class1_files = []  # (subject, dir_name, filename, filepath)

for subj_dir in sorted(CISCE_DIR.iterdir()):
    if not subj_dir.is_dir() or subj_dir.name.startswith(".") or subj_dir.name.startswith("_"):
        continue
    subj = subj_dir.name

    for ct_dir in sorted(subj_dir.iterdir()):
        if not ct_dir.is_dir() or ct_dir.name.startswith(".") or ct_dir.name.startswith("_"):
            continue
        ct_name = ct_dir.name

        for f in sorted(ct_dir.iterdir()):
            if f.suffix not in (".marker", ".txt"):
                continue
            # Check if this is a Class 1 file
            if f.name.startswith("c1_") or f.name.startswith("C1_"):
                class1_files.append((subj, ct_name, f.name, str(f)))

print(f"Total Class 1 files across ALL directories: {len(class1_files)}")

# Group by directory
by_dir = defaultdict(list)
for subj, ct, fname, fpath in class1_files:
    by_dir[ct].append((subj, fname, fpath))

print(f"\nBy directory:")
for ct in sorted(by_dir.keys()):
    files = by_dir[ct]
    print(f"  {ct:35s}: {len(files):3d} files")
    for subj, fname, fpath in files[:2]:
        print(f"    {subj}/{fname}")

# Show sample content from each directory type
print(f"\n{'='*80}")
print("SAMPLE CONTENT FROM EACH DIRECTORY TYPE")
print(f"{'='*80}")

for ct in sorted(by_dir.keys()):
    files = by_dir[ct]
    if not files:
        continue
    subj, fname, fpath = files[0]
    print(f"\n--- {ct}/{subj}/{fname} ---")
    try:
        content = open(fpath, encoding="utf-8-sig").read()
        # Show first 300 chars
        print(content[:300].strip())
    except Exception as e:
        print(f"  ERROR: {e}")
    print()
