"""Revert pass for the ELI5 math-repair: keep a repaired section only when
its definition clause reads as a complete statement; otherwise restore the
pre-repair (faithful, math-bearing) text from the backup zip.  Zero-wrong:
both variants are verbatim source text."""
import io
import os
import re
import zipfile

MD = r"D:\platform\deploy\content\enhanced_nodes_md"
ZIP = r"D:\platform\backend\_archive\eli5_backups.zip"
SEC_RE = re.compile(r"^## ELI5\n(.*?)(?=^##|\Z)", re.M | re.S)

VERB_RE = re.compile(
    r"\b(is|are|was|were|means|defined|states|called|refers|consists|gives|"
    r"measures|represents|happens|occurs|comes|describes|denotes|involves|"
    r"contains|requires|follows|tells|says|shows)\b", re.I)

files = [l.strip() for l in open(r"D:\platform\_eli5_mathy.txt") if l.strip()]
zf = zipfile.ZipFile(ZIP, "a", zipfile.ZIP_DEFLATED)
kept = reverted = missing = 0
samples = []

prewrite = {}
with zipfile.ZipFile(ZIP) as z:
    for name in z.namelist():
        if name.startswith("eli5_prewrite/"):
            prewrite[name.split("/", 1)[1]] = z.read(name).decode("utf-8")

for f in files:
    path = os.path.join(MD, f)
    with open(path, "r", encoding="utf-8", errors="replace") as fh:
        text = fh.read()
    m = SEC_RE.search(text)
    if not m:
        missing += 1
        continue
    cur = m.group(1).strip()
    part = cur.split("Common mix-up:")[0]
    part = part.replace("In simple words:", "", 1).strip()
    complete = len(part) >= 55 and bool(VERB_RE.search(part))
    if complete:
        kept += 1
        continue
    pre = prewrite.get(f)
    if pre is None or SEC_RE.search(pre) is None:
        kept += 1          # nothing to revert to; current is still faithful
        continue
    pre_sec = SEC_RE.search(pre).group(1)
    if pre_sec.strip() == cur:
        kept += 1
        continue
    new_text = text[:m.start(1)] + pre_sec + text[m.end(1):]
    with open(path, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(new_text)
    reverted += 1
    if len(samples) < 4:
        samples.append((f, pre_sec.strip()[:150]))

zf.close()
print(f"kept repaired: {kept} | reverted to pre-repair: {reverted} | missing: {missing}")
for f, s in samples:
    print("  REVERTED", f, "->", s)
