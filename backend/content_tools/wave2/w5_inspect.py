"""CRLF-safe inspection of specific sections in CISCE nodes."""
import re
import sys

SECTION_RE = re.compile(r"^##\s+([A-Z_0-9]+)\s*$", re.M)


def parse(text):
    matches = list(SECTION_RE.finditer(text))
    return {m.group(1): text[m.end(): matches[i + 1].start() if i + 1 < len(matches) else len(text)].strip()
            for i, m in enumerate(matches)}


corpus = r"D:/platform/deploy/content/cisce_nodes_v2/"
what = sys.argv[1]
files = sys.argv[2:]
for fn in files:
    text = open(corpus + fn, encoding="utf-8").read()
    s = parse(text)
    if what == "scope":
        print(f"===== {fn} =====")
        print(s.get("SCOPE_BOUNDARY", "<none>")[:700], "\n")
    elif what == "worked":
        for k in sorted(x for x in s if x.startswith("WORKED_EXAMPLE")):
            words = len(s[k].split())
            print(f"===== {fn} {k} ({words}w) =====")
            if words < 45:
                print(s[k][:600], "\n")
    elif what == "eli5":
        print(f"===== {fn} =====")
        print(s.get("ELI5", "<none>")[:500], "\n")
    elif what == "walk":
        print(f"===== {fn} ({len(s.get('WALKTHROUGH','').split())}w) =====")
        print(s.get("WALKTHROUGH", "<none>")[:900], "\n")
