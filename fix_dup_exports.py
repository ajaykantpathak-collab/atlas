"""Find and fix duplicate `export default` in sim component files."""
import os

ROOT = r"D:\platform\frontend\components\simulations"
dupes = []
for dp, dns, fns in os.walk(ROOT):
    for f in fns:
        if not f.endswith(".tsx"):
            continue
        p = os.path.join(dp, f)
        try:
            text = open(p, encoding="utf-8", errors="replace").read()
        except Exception:
            continue
        count = text.count("export default")
        if count > 1:
            dupes.append((p, count))

print(f"files with duplicate export default: {len(dupes)}")
fixed = 0
for p, count in sorted(dupes):
    lines = open(p, encoding="utf-8", errors="replace").read().splitlines(keepends=True)
    # keep the FIRST 'export default' line; comment out later ones (safer than
    # deleting — preserves line numbers for any sibling references)
    seen = 0
    out = []
    removed = 0
    for ln in lines:
        if "export default" in ln:
            seen += 1
            if seen > 1:
                out.append("// [dup-export removed] " + ln)
                removed += 1
                continue
        out.append(ln)
    open(p, "w", encoding="utf-8", newline="").write("".join(out))
    fixed += 1
    print(f"  fixed {os.path.relpath(p, ROOT)} ({count} defaults, removed {removed})")
print(f"total files fixed: {fixed}")
