#!/usr/bin/env python3
"""Band c11_/c12_ completion repairs (byte-safe, newline-preserving).

1. Empty the residual "N/A — <prose>" LEADS_TO value lines in 5 English
   chapter-terminal nodes (gate: 0 N/A tokens in reference sections).
2. c12_hist_cbse_04_001: remove the duplicate first CROSS_SUBJECT_PREREQS
   ("N/A, N/A") + its leaked model-reasoning CROSS_SUBJECT_REASONS block so
   the real sections (c9_hist_ch3_8, c7_hist_ch05_001, c9_hist_ch3_10)
   become the loader-visible first occurrence.
3. Delete 141 stale PREREQUISITE_REASONS lines (reason without a matching
   PREREQUISITE_NODE_IDS entry: 121 nonexistent ids + 20 'none') across
   105 files.

No text is inserted: only whole-line removals / in-line clearing, so CRLF,
LF-only files and Devanagari content are preserved byte-exactly.
"""
import json
import os
import re

MD = r"C:/Users/Alesha4285/Desktop/enhanced_nodes/md_cache"
AUDIT = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                     "..", "_cache", "band_11_12_audit.json")
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                   "..", "_cache", "band_11_12_repair_changeset.json")

ENGLISH_NA_LEADS = ["c12_eng_f_cbse_10_015", "c12_eng_f_cbse_13_015",
                    "c12_eng_k_cbse_11_015", "c12_eng_k_cbse_14_015",
                    "c12_eng_v_cbse_06_015"]
HIST = "c12_hist_cbse_04_001"

changes = []


def read(nid):
    return open(os.path.join(MD, nid + ".md"), "rb").read().decode("utf-8")


def write(nid, text):
    raw = text.encode("utf-8")
    with open(os.path.join(MD, nid + ".md"), "wb") as fh:
        fh.write(raw)


def filter_lines(body, drop_pred):
    """Remove whole lines (keeping others byte-exact incl. EOLs)."""
    kept, removed = [], []
    for line in body.splitlines(keepends=True):
        (removed if drop_pred(line.rstrip("\r\n")) else kept).append(line)
    return "".join(kept), [ln.rstrip("\r\n") for ln in removed]


def main():
    audit = json.load(open(AUDIT, encoding="utf-8"))
    orphans = {}
    for src, rid in audit["prereq_orphan_reason"]:
        orphans.setdefault(src, set()).add(rid)

    # --- 1. English terminal nodes: clear the N/A LEADS_TO value line ------
    for nid in ENGLISH_NA_LEADS:
        text = read(nid)
        pat = re.compile(r"(^## LEADS_TO[ \t]*\r?\n)N/A[^\r\n]*", re.M)
        m = pat.search(text)
        if not m:
            print("SKIP (no N/A LEADS_TO found):", nid)
            continue
        old_line = text[m.start():].split("\n", 1)[0].rstrip("\r")
        new_text = pat.sub(r"\1", text, count=1)
        assert new_text != text and new_text.encode("utf-8").decode("utf-8") \
            == new_text
        write(nid, new_text)
        changes.append({"file": nid, "op": "clear_leads_to_na_prose",
                        "section": "LEADS_TO", "removed_line": old_line})
        print("cleared LEADS_TO N/A prose:", nid)

    # --- 2. hist: drop duplicate CROSS_SUBJECT sections + leaked reasoning -
    text = read(HIST)
    pat = re.compile(
        r"## CROSS_SUBJECT_PREREQS[ \t]*\r?\nN/A, N/A[ \t]*\r?\n"
        r"## CROSS_SUBJECT_REASONS[ \t]*\r?\n.*?\r?\n\r?\n"
        r"(?=## CROSS_SUBJECT_PREREQS)", re.S)
    m = pat.search(text)
    if not m:
        print("SKIP: hist dup block not found")
    else:
        removed_block = m.group(0)
        new_text = text[:m.start()] + text[m.end():]
        # exactly one CROSS_SUBJECT_PREREQS header must remain
        assert new_text.count("## CROSS_SUBJECT_PREREQS") == 1
        assert "wait, this is wrong subject" not in new_text
        write(HIST, new_text)
        changes.append({
            "file": HIST,
            "op": "remove_duplicate_cross_subject_sections",
            "section": "CROSS_SUBJECT_PREREQS/CROSS_SUBJECT_REASONS",
            "removed_block_chars": len(removed_block),
            "removed_first_section": "N/A, N/A",
            "kept_section_ids": ["c9_hist_ch3_8", "c7_hist_ch05_001",
                                 "c9_hist_ch3_10"],
            "note": "First CROSS_SUBJECT_PREREQS held 'N/A, N/A' and shadowed "
                    "the real sections (loader reads first occurrence); its "
                    "CROSS_SUBJECT_REASONS contained leaked generation "
                    "reasoning ('wait, this is wrong subject...'). Removed "
                    "both; real sections now loader-visible.",
        })
        print("removed dup cross-subject block:", HIST,
              len(removed_block), "chars")

    # --- 3. stale PREREQUISITE_REASONS lines -------------------------------
    total_removed = 0
    files_touched = 0
    for src in sorted(orphans):
        text = read(src)
        sec = re.search(r"(^## PREREQUISITE_REASONS[ \t]*\r?\n)"
                        r"(.*?)(?=\r?\n## |\Z)", text, re.S | re.M)
        if not sec:
            print("SKIP (no reasons section):", src)
            continue
        ids = orphans[src]

        def is_stale(line, ids=ids):
            mm = re.match(r"^([A-Za-z0-9_]+)[ \t]*:", line)
            return bool(mm and mm.group(1) in ids)

        new_body, removed = filter_lines(sec.group(2), is_stale)
        # only delete lines whose parsed id is in the orphan set for this file
        unexpected = [ln for ln in removed
                      if re.match(r"^([A-Za-z0-9_]+)[ \t]*:", ln) is None
                      or re.match(r"^([A-Za-z0-9_]+)[ \t]*:",
                                  ln).group(1) not in ids]
        assert not unexpected, (src, unexpected)
        if not removed:
            continue
        new_text = text[:sec.start(2)] + new_body.rstrip("\r\n") \
            + text[sec.end(2):]
        # preserve a single structural blank-line separation if section body
        # became empty: body rstrip removes trailing EOLs; the lookahead kept
        # the '\n\r\n## ' before the next header, so structure stays intact.
        write(src, new_text)
        total_removed += len(removed)
        files_touched += 1
        changes.append({"file": src, "op": "remove_stale_reason_lines",
                        "section": "PREREQUISITE_REASONS",
                        "removed_lines": removed})
    print(f"stale reason lines removed: {total_removed} "
          f"across {files_touched} files")

    json.dump({"changes": changes,
               "summary": {"leads_to_na_cleared": len(ENGLISH_NA_LEADS),
                           "hist_dup_block_removed": 1,
                           "stale_reason_lines_removed": total_removed,
                           "reason_files_touched": files_touched}},
              open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("changeset ->", OUT)


if __name__ == "__main__":
    main()
