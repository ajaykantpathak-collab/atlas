"""repair_diag_headers.py — normalize malformed DIAGNOSTIC_ANSWER headers.

Defect classes found in the 2026-09-29 corpus sweep (answers authored but
invisible to the section parser):
  A. near-miss headers:  "## DIAGNOSTIC_ANSWER_3**"  /  "## DIAGNUSTIC_ANSWER_2"
  B. bare headers:       "DIAGNOSTIC_ANSWER_6"  (no ## prefix)
  C. inline answers:     "ANSWER: ..." line inside ## DIAGNOSTIC_QUESTION_N

Genuinely-unauthored answers (empty answer body, no inline text) are LEFT —
honest absence, never invented.

Backs every touched file up to _node_repairs_backup/ first. Prints a
per-file change log.
"""
import glob
import os
import re
import shutil
import sys

CORPUS = "D:/platform/deploy/content/enhanced_nodes_md"
BACKUP = "D:/platform/_cisce_build/_node_repairs_backup"

NEAR_MISS = re.compile(r"^##\s*(DIAG[A-Za-z]*_ANSWER_(\d+))[^\d\n]*\s*$", re.M)
BARE = re.compile(r"^DIAGNOSTIC_ANSWER_(\d+)\s*$", re.M)
SEC = re.compile(r"^## (DIAGNOSTIC_QUESTION_(\d+))\s*\n(.*?)(?=^## |\Z)", re.M | re.S)
ANSWER_LINE = re.compile(r"^ANSWER:[ \t]?(.*)$", re.M)


def repair(txt, log):
    # A. near-miss header normalization (exact headers untouched)
    def norm(m):
        name, n = m.group(1), m.group(2)
        if name == f"DIAGNOSTIC_ANSWER_{n}":
            return m.group(0)
        log.append(f"  A: {m.group(0).strip()!r} -> '## DIAGNOSTIC_ANSWER_{n}'")
        return f"## DIAGNOSTIC_ANSWER_{n}"
    txt = NEAR_MISS.sub(norm, txt)

    # B. bare header promotion
    def bare(m):
        log.append(f"  B: bare DIAGNOSTIC_ANSWER_{m.group(1)} -> '## ' prefixed")
        return f"## DIAGNOSTIC_ANSWER_{m.group(1)}"
    txt = BARE.sub(bare, txt)

    # C. inline ANSWER: promotion (only when the numbered section is absent)
    existing = set(re.findall(r"^## DIAGNOSTIC_ANSWER_(\d+)\s*$", txt, re.M))
    insertions = {}
    for mm in SEC.finditer(txt):
        n = mm.group(2)
        if n in existing:
            continue
        body = mm.group(3)
        am = ANSWER_LINE.search(body)
        if not am:
            continue
        answer_body = body[am.start():].rstrip() + "\n"
        answer_body = ANSWER_LINE.sub(lambda a: a.group(1), answer_body, count=1)
        new_q_body = body[:am.start()].rstrip() + "\n\n"
        insertions[n] = (new_q_body, f"## DIAGNOSTIC_ANSWER_{n}\n{answer_body}\n\n")
        log.append(f"  C: inline ANSWER: promoted to '## DIAGNOSTIC_ANSWER_{n}' "
                   f"({len(answer_body)} chars)")
    if insertions:
        out, i = [], 0
        for mm in SEC.finditer(txt):
            n = mm.group(2)
            if n in insertions:
                new_q_body, ans_section = insertions[n]
                out.append(txt[i:mm.start()])
                out.append(f"## DIAGNOSTIC_QUESTION_{n}\n" + new_q_body + "\n" + ans_section)
                i = mm.end()
        out.append(txt[i:])
        txt = "".join(out)
    return txt


def main():
    os.makedirs(BACKUP, exist_ok=True)
    changed = 0
    for fp in sorted(glob.glob(f"{CORPUS}/*.md")):
        txt = open(fp, encoding="utf-8", errors="replace").read()
        log = []
        new = repair(txt, log)
        if new != txt:
            shutil.copy2(fp, os.path.join(BACKUP, os.path.basename(fp)))
            open(fp, "w", encoding="utf-8", newline="").write(new)
            changed += 1
            print(os.path.basename(fp))
            for line in log:
                print(line)
    print(f"\nrepaired {changed} files (backups in {BACKUP})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
