"""repair_dup_diag.py — fix duplicate DIAGNOSTIC_QUESTION_N sections.

Three files shipped answers under a SECOND QUESTION_N header (last-wins
parsing served the answer AS the question); two files shipped genuine
second questions under an occupied number (renumbered to the next free
slot). Explicit per-file instruction table — no heuristics.
"""
import os
import re
import shutil

CORPUS = "D:/platform/deploy/content/enhanced_nodes_md"
BACKUP = "D:/platform/_cisce_build/_node_repairs_backup"

# file -> list of (occurrence_index, action)  0-based among that Q's sections
PLAN = {
    "c12_eco_cbse_12_005.md": [("answer", 2, 2), ("answer", 3, 2), ("answer", 4, 2),
                               ("answer", 5, 2), ("answer", 6, 2)],
    "c9_hist_ch5_3.md": [("answer", 2, 2), ("answer", 3, 2), ("answer", 4, 2),
                         ("answer", 5, 2), ("answer", 6, 2)],
    "c10_hin_ks_cbse_08_001.md": [("answer", 3, 2)],
    "c12_app_cbse_04_004.md": [("renumber", 4, 2, 7), ("renumber", 5, 2, 8)],
    "c11_hin_a_cbse_16_008.md": [("renumber", 3, 2, 7)],
}

SEC = re.compile(r"^## DIAGNOSTIC_QUESTION_(\d+)\s*\n", re.M)


def repair_file(fp, ops):
    txt = open(fp, encoding="utf-8", errors="replace").read()
    matches = list(SEC.finditer(txt))
    counts = {}
    for m in matches:
        counts[m.group(1)] = counts.get(m.group(1), 0) + 1
    log = []
    # build replacement instructions keyed by match position
    seen = {}
    replace_at = {}
    for m in matches:
        n = m.group(1)
        seen[n] = seen.get(n, 0) + 1
        for op in ops:
            if op[0] == "answer" and str(op[1]) == n and seen[n] == op[2]:
                replace_at[m.start()] = f"## DIAGNOSTIC_ANSWER_{n}"
                log.append(f"  Q{n} occurrence #{op[2]} -> DIAGNOSTIC_ANSWER_{n}")
            elif op[0] == "renumber" and str(op[1]) == n and seen[n] == op[2]:
                replace_at[m.start()] = f"## DIAGNOSTIC_QUESTION_{op[3]}"
                log.append(f"  duplicate Q{n} occurrence #{op[2]} -> Q{op[3]}")
    if not replace_at:
        return None
    out, i = [], 0
    for pos in sorted(replace_at):
        out.append(txt[i:pos])
        out.append(replace_at[pos] + "\n")
        i = txt.index("\n", pos) + 1
    out.append(txt[i:])
    return "".join(out), log


def main():
    os.makedirs(BACKUP, exist_ok=True)
    for fname, ops in PLAN.items():
        fp = os.path.join(CORPUS, fname)
        result = repair_file(fp, ops)
        if result is None:
            print(f"{fname}: no matching occurrences — SKIPPED (verify plan)")
            continue
        new, log = result
        shutil.copy2(fp, os.path.join(BACKUP, fname))
        open(fp, "w", encoding="utf-8", newline="").write(new)
        print(fname)
        for line in log:
            print(line)
    print("done")


if __name__ == "__main__":
    main()
