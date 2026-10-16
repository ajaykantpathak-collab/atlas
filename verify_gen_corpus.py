"""verify_gen_corpus.py -- final verification of the weekend generation pass.

Re-validates EVERY teaching file's diagnostic + worked-example sections
against its own file (zero-wrong), checks structural self-consistency of
derived fill-blanks, and proves Hindi/companion files were not touched.
Mirrors verify_eli5_corpus.py discipline.
"""
import importlib.util
import json
import os
import re
import zipfile
from collections import Counter

spec = importlib.util.spec_from_file_location(
    "dd", r"D:\platform\derive_diagnostics.py")
dd = importlib.util.module_from_spec(spec)
spec.loader.exec_module(dd)

MD = dd.MD
MANIFEST = {}
if os.path.isfile(dd.MANIFEST):
    MANIFEST = json.load(open(dd.MANIFEST, encoding="utf-8"))
DQ_RE = re.compile(r"^## DIAGNOSTIC_QUESTION_(\d+)\n(.*?)(?=^##|\Z)", re.M | re.S)
DA_RE = re.compile(r"^## DIAGNOSTIC_ANSWER_(\d+)\n(.*?)(?=^##|\Z)", re.M | re.S)
WE_RE = re.compile(r"^## WORKED_EXAMPLE_(\d+)\n(.*?)(?=^##|\Z)", re.M | re.S)
COMP_SUFFIX = dd.enh.COMP_SUFFIX

total_files = diag_files = we_files = 0
dq_total = we_total = 0
bad_files = 0
per_class = Counter()
hindi_with_new = comp_with_new = 0
fb_bad = 0
fb_bad_samples = []

for f in sorted(os.listdir(MD)):
    if not f.endswith(".md"):
        continue
    stem = f[:-3]
    is_comp = stem.endswith(COMP_SUFFIX)
    coords = dd.enh.parse_companion_filename(stem) if is_comp \
        else dd.enh.parse_filename(stem)
    if coords is None:
        continue
    total_files += 1
    with open(os.path.join(MD, f), encoding="utf-8-sig", errors="replace") as fh:
        text = fh.read()

    # ── Hindi / comp non-tamper: no derived markers may exist there ──
    subj = str(coords["subject"]).lower()
    if (subj.startswith("hin") or is_comp):
        k = MANIFEST.get(stem)
        if is_comp and k is not None:
            comp_with_new += 1
        if subj.startswith("hin") and k is not None:
            hindi_with_new += 1

    src = text.lower()
    violations = []
    k_existing = MANIFEST.get(stem, {}).get("k_existing")

    answers = {int(n): b.strip() for n, b in DA_RE.findall(text)}
    for n_str, body in DQ_RE.findall(text):
        n = int(n_str)
        dq_total += 1
        q = body.strip()
        if not q:
            violations.append("DQ%d:empty" % n)
            continue
        violations += ["DQ%d:%s" % (n, v)
                       for v in dd.verify_fidelity(q, src)[:2]]
        a = answers.get(int(n), "")
        derived = k_existing is not None and n > k_existing
        if not a:
            # authored DQ-without-DA exists in the pre-pass corpus (rare);
            # a derived pair must always carry its answer
            if derived:
                violations.append("DQ%d:no-answer" % n)
        elif "______" in q and derived:
            # derived fill-blank: the answer must NOT still sit in the
            # question (that would be ambiguous), and must be short
            if a.lower() in q.lower():
                fb_bad += 1
                if len(fb_bad_samples) < 5:
                    fb_bad_samples.append((stem, n, q[:80], a[:40]))
            if len(a) > 40:
                fb_bad += 1
    diag_files += 1 if answers else 0

    for n, body in WE_RE.findall(text):
        we_total += 1
        we_files += 1 if n == "1" else 0
        violations += ["WE%s:%s" % (n, v)
                       for v in dd.verify_fidelity(body.strip(), src)[:2]]

    if violations:
        bad_files += 1
        if bad_files <= 20:
            print("VIOLATION", f, violations[:3])
    else:
        per_class[coords["class"]] += 1

# ── authoritative Hindi/comp non-tamper: backup zip must not carry them ──
hin_in_zip = comp_in_zip = 0
zp = dd.BACKUP_ZIP
if os.path.isfile(zp):
    with zipfile.ZipFile(zp) as z:
        for name in z.namelist():
            base = os.path.basename(name)
            stem = base[:-3] if base.endswith(".md") else base
            if stem.endswith(COMP_SUFFIX):
                comp_in_zip += 1
            elif str(dd.enh.parse_filename(stem)["subject"]).lower() \
                    .startswith("hin") if dd.enh.parse_filename(stem) else False:
                hin_in_zip += 1

print("files scanned:", total_files)
print("files with zero fidelity violations:", sum(per_class.values()))
print("per-class clean files:", dict(sorted(per_class.items())))
print("diagnostic sections scanned:", dq_total,
      "| worked-example sections scanned:", we_total)
print("BAD FILES:", bad_files)
print("fill-blank self-consistency violations:", fb_bad, fb_bad_samples)
print("comp files in backup zip (must be 0):", comp_in_zip)
print("hindi files in backup zip (must be 0):", hin_in_zip)
