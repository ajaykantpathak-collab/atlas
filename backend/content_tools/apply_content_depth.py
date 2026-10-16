"""Apply authored content-depth improvements to node .md files.

FORMAT-PRESERVING: only the bodies of DEFINITION, ELI5 and WALKTHROUGH are
touched. Every other byte of the file (headers, section order, spacing,
all other sections) is preserved exactly. A pre-edit backup of each file is
kept in --backup dir; a manifest records SHA-256 of every non-edited region
so integrity is verifiable.

Payload JSON format (one file per batch):
{
  "relative/or/absolute/paths/allowed": true,
  "edits": [
     {
       "file": "c9_chem_ch1_7.md",
       "definition": "new DEFINITION body (omit to leave unchanged)",
       "walkthrough_append": "paragraph appended to existing WALKTHROUGH (omit to leave unchanged)",
       "walkthrough_replace": "full replacement body (use only when existing walkthrough is malformed)",
       "eli5": "new ELI5 body (omit to leave unchanged)",
       "diagnostics": [
          {"question": "...", "answer": "..."}   # appended as DIAGNOSTIC_QUESTION_<n+1>
       ]
     }
  ]
}

Usage: python apply_content_depth.py --payload batch_x.json [--corpus DIR] [--backup DIR]
"""

import argparse
import hashlib
import json
import os
import re
import shutil
import sys

DEFAULT_CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
DEFAULT_BACKUP = r"D:\platform\deploy\backend\content_tools\backups"

HEADER_RE = re.compile(r"^##\s+([A-Z_0-9]+)\s*$", re.M)
BANNED = [
    "Lane C", "variable binding", "This node covers", "TBD", "placeholder",
    "NaN", "Lorem",
]


def split_sections(text: str):
    """Return (preamble, [(header_line_with_hashes, name, body_with_leading_newlines), ...])."""
    parts = []
    matches = list(HEADER_RE.finditer(text))
    preamble = text[: matches[0].start()] if matches else text
    for i, m in enumerate(matches):
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        parts.append([m.group(0), m.group(1), text[m.end(): end]])
    return preamble, parts


def join_sections(preamble, parts) -> str:
    out = [preamble]
    for header, _name, body in parts:
        out.append(header)
        out.append(body)
    return "".join(out)


def set_body(parts, name, new_body: str):
    """Replace the body of section `name`; normalise to header + '\\n' + body + '\\n\\n'."""
    hits = [p for p in parts if p[1] == name]
    if not hits:
        raise KeyError(f"section {name} not found")
    p = hits[0]
    p[2] = "\n" + new_body.strip("\n") + "\n\n"


def append_body(parts, name, addition: str):
    hits = [p for p in parts if p[1] == name]
    if not hits:
        raise KeyError(f"section {name} not found")
    p = hits[0]
    old = p[2].strip("\n")
    add = addition.strip("\n")
    p[2] = "\n" + old + ("\n\n" if old else "") + add + "\n\n"


def next_diag_index(parts) -> int:
    idx = 0
    for p in parts:
        m = re.fullmatch(r"DIAGNOSTIC_QUESTION_(\d+)", p[1])
        if m:
            idx = max(idx, int(m.group(1)))
    return idx + 1


def check_banned(text: str, where: str):
    for b in BANNED:
        pattern = r"\b" + re.escape(b) + r"\b"
        if re.search(pattern, text, re.IGNORECASE):
            raise ValueError(f"banned string {b!r} found in {where}")


def digest_except(text: str, edited_names) -> str:
    """Hash of all content EXCEPT bodies of edited sections (for integrity check)."""
    preamble, parts = split_sections(text)
    h = hashlib.sha256()
    h.update(preamble.encode("utf-8"))
    for header, name, body in parts:
        h.update(header.encode("utf-8"))
        if name not in edited_names:
            h.update(body.encode("utf-8"))
    return h.hexdigest()


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--payload", required=True)
    ap.add_argument("--corpus", default=DEFAULT_CORPUS)
    ap.add_argument("--backup", default=DEFAULT_BACKUP)
    ap.add_argument("--manifest", default=None)
    args = ap.parse_args()

    with open(args.payload, encoding="utf-8") as f:
        payload = json.load(f)

    manifest_path = args.manifest or os.path.join(
        os.path.dirname(args.payload), "apply_manifest.jsonl")
    manifest = open(manifest_path, "a", encoding="utf-8")

    ok = fail = 0
    for edit in payload["edits"]:
        fn = edit["file"]
        path = fn if os.path.isabs(fn) else os.path.join(args.corpus, fn)
        if not os.path.isfile(path):
            print(f"FAIL missing file: {fn}", file=sys.stderr)
            fail += 1
            continue
        with open(path, encoding="utf-8") as f:
            original = f.read()

        section_names = set()
        if edit.get("definition"):
            section_names.add("DEFINITION")
        if edit.get("eli5"):
            section_names.add("ELI5")
        if edit.get("walkthrough_replace") or edit.get("walkthrough_append"):
            section_names.add("WALKTHROUGH")
        if edit.get("diagnostics"):
            section_names.add("DIAGNOSTICS")
        pre_digest = digest_except(original, section_names)

        # backup once (first edit of this file wins; later edits keep original backup)
        bak = os.path.join(args.backup, fn)
        if not os.path.exists(bak):
            os.makedirs(os.path.dirname(bak), exist_ok=True)
            shutil.copy2(path, bak)

        preamble, parts = split_sections(original)

        try:
            if edit.get("definition"):
                check_banned(edit["definition"], f"{fn} DEFINITION")
                set_body(parts, "DEFINITION", edit["definition"])
            if edit.get("eli5"):
                check_banned(edit["eli5"], f"{fn} ELI5")
                set_body(parts, "ELI5", edit["eli5"])
            if edit.get("walkthrough_replace"):
                check_banned(edit["walkthrough_replace"], f"{fn} WALKTHROUGH")
                set_body(parts, "WALKTHROUGH", edit["walkthrough_replace"])
            if edit.get("walkthrough_append"):
                check_banned(edit["walkthrough_append"], f"{fn} WALKTHROUGH+")
                append_body(parts, "WALKTHROUGH", edit["walkthrough_append"])
            if edit.get("diagnostics"):
                n = next_diag_index(parts)
                qblocks = []
                for d in edit["diagnostics"]:
                    check_banned(d["question"], f"{fn} DQ")
                    check_banned(d["answer"], f"{fn} DA")
                    qblocks.append(("DIAGNOSTIC_QUESTION_%d" % n, d["question"]))
                    qblocks.append(("DIAGNOSTIC_ANSWER_%d" % n, d["answer"]))
                    n += 1
                # insert after the last DIAGNOSTIC_ANSWER block (before COMMON_MISCONCEPTION)
                last_ans = max(i for i, p in enumerate(parts)
                               if p[1].startswith("DIAGNOSTIC_ANSWER_"))
                for j, (hname, body) in enumerate(qblocks):
                    parts.insert(last_ans + 1 + j, [hname, hname, "\n" + body.strip("\n") + "\n\n"])
        except (KeyError, ValueError) as ex:
            print(f"FAIL {fn}: {ex}", file=sys.stderr)
            fail += 1
            continue

        new_text = join_sections(preamble, parts)

        # post-conditions: edited bodies exist and are non-empty
        _, new_parts = split_sections(new_text)
        names = {p[1] for p in new_parts}
        for req in ("DEFINITION", "ELI5", "WALKTHROUGH"):
            if req not in names:
                print(f"FAIL {fn}: {req} vanished", file=sys.stderr)
                fail += 1
                break
        else:
            post_digest = digest_except(new_text, section_names)
            if pre_digest != post_digest:
                print(f"FAIL {fn}: non-edited regions changed — refusing", file=sys.stderr)
                fail += 1
                continue
            with open(path, "w", encoding="utf-8", newline="") as f:
                f.write(new_text)
            manifest.write(json.dumps({
                "file": fn, "payload": os.path.basename(args.payload),
                "edited": sorted(section_names),
                "untouched_digest": pre_digest,
            }, ensure_ascii=False) + "\n")
            ok += 1

    manifest.close()
    print(f"applied={ok} failed={fail} (payload {os.path.basename(args.payload)})")
    sys.exit(0 if fail == 0 else 1)


if __name__ == "__main__":
    main()
