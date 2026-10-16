"""W2 section-body applier — extends the house applier (apply_content_depth.py)
with a `sections_replace` edit type so hygiene scrubs can clean student-facing
prose sections the wave-1 tool could not touch (diagnostics, worked examples,
misconception, mastery criteria, competency questions, scope, prereq notes).

House guarantees preserved by importing the house functions:
  - split_sections / join_sections: format-preserving section surgery
  - digest_except: refuse any write whose non-edited regions change
  - check_banned: refuse banned platform strings in new bodies
  - backup-before-mutation, per-file manifest rows

Safety rails specific to this tool:
  - ONLY section names in PROSE_WHITELIST may be replaced. Formula-family
    sections (THIS_FORMULA, FORMULA_VARIABLES, FORMULA_UNITS) and id-list
    sections (*_NODE_IDS) are engine/KaTeX surfaces and are REFUSED.
  - Every replaced body must be non-empty.

Payload format:
{"edits": [{"file": "c9_math_ch1_4.md",
            "sections": {"DIAGNOSTIC_ANSWER_3": "new body ...", ...}}]}

Usage: python apply_w2.py --payload batch.json [--corpus DIR] [--backup DIR]
"""

import argparse
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from apply_content_depth import (  # noqa: E402  (house functions)
    check_banned, digest_except, join_sections, split_sections)

DEFAULT_CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
DEFAULT_BACKUP = r"D:\platform\deploy\backend\content_tools\wave2\backups"

# student-facing prose sections a hygiene scrub may rewrite
PROSE_WHITELIST_EXACT = {
    "DEFINITION", "ELI5", "WALKTHROUGH", "COMMON_MISCONCEPTION",
    "MASTERY_CRITERIA", "SCOPE_BOUNDARY", "ON_FAILURE", "CHAIN_DESCRIPTION",
    "PREREQ_CONCEPT", "PREREQ_BEFORE", "PREREQ_STUCK",
    "PREREQUISITE_REASONS", "FORWARD_REASONS", "CROSS_SUBJECT_REASONS",
}
PROSE_WHITELIST_PREFIX = (
    "DIAGNOSTIC_QUESTION_", "DIAGNOSTIC_ANSWER_", "WORKED_EXAMPLE_",
    "COMPETENCY_QUESTION_", "COMPETENCY_ANSWER_",
)


def editable(name: str) -> bool:
    if name in PROSE_WHITELIST_EXACT:
        return True
    return any(name.startswith(p) for p in PROSE_WHITELIST_PREFIX)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--payload", required=True)
    ap.add_argument("--corpus", default=DEFAULT_CORPUS)
    ap.add_argument("--backup", default=DEFAULT_BACKUP)
    ap.add_argument("--manifest", default=None)
    args = ap.parse_args()

    import shutil
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
        new_bodies = edit.get("sections") or {}
        if not new_bodies:
            print(f"FAIL no sections for {fn}", file=sys.stderr)
            fail += 1
            continue
        for name, body in new_bodies.items():
            if not editable(name):
                print(f"FAIL {fn}: section {name} is not in the prose whitelist "
                      f"(engine/KaTeX surface) — refusing", file=sys.stderr)
                fail += 1
                break
            if not body or not body.strip():
                print(f"FAIL {fn}: empty body for {name}", file=sys.stderr)
                fail += 1
                break
            try:
                check_banned(body, f"{fn} {name}")
            except ValueError as ex:
                print(f"FAIL {fn}: {ex}", file=sys.stderr)
                fail += 1
                break
        else:
            with open(path, encoding="utf-8") as f:
                original = f.read()

            bak = os.path.join(args.backup, fn)
            if not os.path.exists(bak):
                os.makedirs(os.path.dirname(bak), exist_ok=True)
                shutil.copy2(path, bak)

            preamble, parts = split_sections(original)
            edited_names = set(new_bodies)
            pre_digest = digest_except(original, edited_names)

            missing = [n for n in edited_names
                       if not any(p[1] == n for p in parts)]
            if missing:
                print(f"FAIL {fn}: sections not found: {missing}", file=sys.stderr)
                fail += 1
                continue
            for p in parts:
                if p[1] in edited_names:
                    p[2] = "\n" + new_bodies[p[1]].strip("\n") + "\n\n"

            new_text = join_sections(preamble, parts)
            post_digest = digest_except(new_text, edited_names)
            if pre_digest != post_digest:
                print(f"FAIL {fn}: non-edited regions changed — refusing",
                      file=sys.stderr)
                fail += 1
                continue
            with open(path, "w", encoding="utf-8", newline="") as f:
                f.write(new_text)
            manifest.write(json.dumps({
                "file": fn, "payload": os.path.basename(args.payload),
                "edited": sorted(edited_names), "untouched_digest": pre_digest,
            }, ensure_ascii=False) + "\n")
            ok += 1

    manifest.close()
    print(f"applied={ok} failed={fail} (payload {os.path.basename(args.payload)})")
    sys.exit(0 if fail == 0 else 1)


if __name__ == "__main__":
    main()
