"""repair_cisce_dup_diag.py — CISCE corpus duplicate diagnostic sections.

Classes found in the 2026-09-29 sweep of cisce_nodes_v2:
  1. identical duplicate blocks (generator re-emitted the Q/A tail)  -> DELETE 2nd+
  2. pointer stubs "(Already answered above ...)"                    -> DELETE (done earlier)
  3. genuine differing duplicates                                    -> RENUMBER with
     pairing preserved: k-th duplicate of Q_N and of A_N share the new number
     (file max + k), so Q/A stay paired in document order.
Mixed files (identical Q dup + differing A dup) get each treatment per section.
"""
import glob
import os
import re
import shutil

CORPUS = "D:/platform/deploy/content/cisce_nodes_v2"
BACKUP = "D:/platform/_cisce_build/_cisce_dup_backup"

SEC = re.compile(r"^## (DIAGNOSTIC_(QUESTION|ANSWER)_(\d+))\s*\n(.*?)(?=^## |\Z)", re.M | re.S)


def norm(body):
    return re.sub(r"\s+", " ", body).strip()[:200]


def repair_file(fp):
    txt = open(fp, encoding="utf-8", errors="replace").read()
    matches = list(SEC.finditer(txt))
    seen, first_body, ops = {}, {}, {}
    max_n = 0
    dup_counts = {}
    for m in matches:
        kind, n, body = m.group(1), m.group(3), m.group(4)
        max_n = max(max_n, int(n))
        key = (kind, n)
        seen[key] = seen.get(key, 0) + 1
        if seen[key] == 1:
            first_body[key] = norm(body)
        else:
            dup_counts[key] = dup_counts.get(key, 0) + 1
            ops[m.start()] = (key, norm(body), m.end())
    if not ops:
        return None
    counters = {}
    edits = []  # (start, end, replacement_header)
    for start in sorted(ops):
        key, body, end = ops[start]
        kind, n = key
        k = counters[key] = counters.get(key, 0) + 1
        if first_body[key] == body:
            edits.append((start, end, ""))  # identical duplicate -> delete
            action = "deleted (identical)"
        else:
            new_n = max_n + k
            edits.append((start, end, f"## DIAGNOSTIC_{kind}_{new_n}\n"))
            action = f"renumbered -> {new_n} (differing content)"
        log_line = f"  {kind}_{n} dup #{k}: {action}"
        edits[-1] = (start, end, edits[-1][2], log_line)
    out, i, log = [], 0, []
    for start, end, repl, log_line in edits:
        out.append(txt[i:start])
        out.append(repl)
        i = end
        log.append(log_line)
    out.append(txt[i:])
    return "".join(out), log


def main():
    os.makedirs(BACKUP, exist_ok=True)
    fixed = deleted = renumbered = 0
    for fp in sorted(glob.glob(f"{CORPUS}/*.md")):
        txt = open(fp, encoding="utf-8", errors="replace").read()
        result = repair_file(fp)
        if result is None:
            continue
        new, log = result
        shutil.copy2(fp, os.path.join(BACKUP, os.path.basename(fp)))
        open(fp, "w", encoding="utf-8", newline="").write(new)
        fixed += 1
        print(os.path.basename(fp))
        for line in log:
            print(line)
            if "deleted" in line:
                deleted += 1
            else:
                renumbered += 1
    print(f"\nfiles repaired: {fixed}, sections deleted: {deleted}, renumbered: {renumbered}")
    return 0


if __name__ == "__main__":
    import sys
    sys.exit(main())
