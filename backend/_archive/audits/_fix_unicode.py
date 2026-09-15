"""Fix unicode characters in solver files."""
import os

files_to_fix = [
    r"D:\platform\backend\solvers\english\class10_english_solver.py",
    r"D:\platform\backend\solvers\evs\class10_evs_solver.py",
    r"D:\platform\backend\solvers\histciv\class12_histciv_solver.py",
    r"D:\platform\backend\solvers\histciv\class8_histciv_solver.py",
    r"D:\platform\backend\solvers\geo\class8_geo_questions.py",
    r"D:\platform\backend\solvers\maths\class11_maths_questions.py",
]

replacements = {
    "\u2014": "--",  # em-dash
    "\u2013": "-",   # en-dash
    "\u2018": "'",
    "\u2019": "'",
    "\u201c": '"',
    "\u201d": '"',
    "\u2026": "...",
    "\u20b9": "Rs.",
    "\u00a0": " ",   # non-breaking space
    "\u2022": "*",   # bullet
    "\u2012": "-",   # figure dash
    "\u00ad": "",    # soft hyphen
    "\ufeff": "",    # BOM
}

for path in files_to_fix:
    if not os.path.exists(path):
        print(f"  SKIP {os.path.basename(path)} - not found")
        continue
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        content = f.read()
    original = content
    for old, new in replacements.items():
        content = content.replace(old, new)
    if content != original:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  FIXED {os.path.basename(path)}")
    else:
        print(f"  OK    {os.path.basename(path)} (no unicode issues)")
