"""Final verification of the written ELI5 corpus: every teaching file's
ELI5 section re-validated against its own file (zero-wrong), counts by
class, Hindi exclusion check, no comp files touched."""
import importlib.util
import os
import re
from collections import Counter

spec = importlib.util.spec_from_file_location(
    "d5", r"D:\platform\derive_eli5.py")
d5 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(d5)

_spec2 = importlib.util.spec_from_file_location(
    "enh", r"D:\platform\deploy\backend\services\enhanced_nodes.py")
enh = importlib.util.module_from_spec(_spec2)
_spec2.loader.exec_module(enh)

MD = r"D:\platform\deploy\content\enhanced_nodes_md"
SEC_RE = re.compile(r"^## ELI5\n(.*?)(?=^##|\Z)", re.M | re.S)

eli5 = hindi_eli5 = comp_eli5 = bad = 0
per_class = Counter()
badfiles = []
for f in sorted(os.listdir(MD)):
    if not f.endswith(".md"):
        continue
    stem = f[:-3]
    is_comp = stem.endswith("_comp")
    coords = (enh.parse_companion_filename(stem) if is_comp
              else enh.parse_filename(stem))
    if coords is None:
        continue
    with open(os.path.join(MD, f), encoding="utf-8-sig", errors="replace") as fh:
        text = fh.read()
    m = SEC_RE.search(text)
    if not m:
        continue
    eli5 += 1
    if is_comp:
        comp_eli5 += 1
        continue
    if str(coords["subject"]).startswith("hin"):
        hindi_eli5 += 1
    body = m.group(1).strip()
    violations = d5.verify_fidelity(body, text)
    if violations:
        bad += 1
        badfiles.append((f, violations[:2]))
    else:
        per_class[coords["class"]] += 1

print("ELI5 sections found:", eli5)
print("  on teaching nodes:", eli5 - comp_eli5,
      "| on comp files (should be 0):", comp_eli5)
print("  on hindi nodes (should be 0):", hindi_eli5)
print("fidelity violations:", bad, badfiles[:5])
print("verified-good per class:", dict(sorted(per_class.items())))
