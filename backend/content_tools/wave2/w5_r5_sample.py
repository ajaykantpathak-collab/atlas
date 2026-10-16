"""Sample R5 structural failures: show their worked example sections."""
import json
import re

SECTION_RE = re.compile(r"^##\s+([A-Z_0-9]+)\s*$", re.M)
corpus = r"D:/platform/deploy/content/cisce_nodes_v2/"

fails = json.load(open(r"D:/platform/deploy/backend/content_tools/wave2/w5_gaps.json", encoding="utf-8"))
r5 = [r for r in fails if "R5_worked_lt1" in r["gaps"]]
print(f"R5 files: {len(r5)}")

from collections import Counter
by_subj = Counter((r["grade"], r["subject"]) for r in r5)
print(dict(by_subj))

for r in r5[:6]:
    fn = r["file"]
    text = open(corpus + fn, encoding="utf-8").read()
    matches = list(SECTION_RE.finditer(text))
    secs = {m.group(1): text[m.end(): matches[i + 1].start() if i + 1 < len(matches) else len(text)].strip()
            for i, m in enumerate(matches)}
    for k in sorted(x for x in secs if x.startswith("WORKED_EXAMPLE"))[:1]:
        print(f"===== {fn} {k} ({len(secs[k].split())}w) =====")
        print(secs[k][:400], "\n")
