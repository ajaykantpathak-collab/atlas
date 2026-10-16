"""Wave2 digest-guarded applier for CONTENT-W1 (classes 6-8).

Reuses the house pattern from apply_content_depth.py (imported, read-only):
 - split/join exactly-'##' sections, digest_except for non-edited regions,
 - backup before first mutation,
 - manifest of every edit with untouched-region digests,
 - banned-string guard on all authored payloads.

Wave2 adds three operations:
 - latex_sweep:  convert raw LaTeX to plain text/Unicode in every display
                 section (THIS_FORMULA/link fields excluded — it is
                 KaTeX-rendered by design). A section ships ONLY if
                 verify_invariants passes (digit values + no residue);
                 otherwise it is left untouched and reported.
 - set_section:  direct body replacement for any named section (used by
                 authored definition/walkthrough payloads).
 - set_diag:     rewrite a single DIAGNOSTIC_QUESTION_n / DIAGNOSTIC_ANSWER_n
                 pair (slot-artifact repair).

Payload format (JSON):
{"edits": [
   {"file": "c8_math_ch2_1.md",
    "latex_sweep": true,
    "definition": "new body",                  # optional
    "walkthrough_append": "...",               # optional
    "walkthrough_replace": "...",              # optional
    "set_sections": {"COMMON_MISCONCEPTION": "..."},   # optional
    "set_diag": {"4": {"question": "...", "answer": "..."}}}  # optional
]}

Usage: python apply_wave2.py --payload batch.json [--dry-run]
"""

import argparse
import hashlib
import json
import os
import re
import shutil
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# house applier, read-only import (digest guard + banned strings)
from apply_content_depth import (  # noqa: E402
    HEADER_RE, BANNED, split_sections, join_sections, digest_except, check_banned,
)
from latex_to_text import convert, verify_invariants  # noqa: E402

DEFAULT_CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
DEFAULT_BACKUP = r"D:\platform\deploy\backend\content_tools\wave2\backups_w1"

#: sections the latex sweep may touch (display sections only)
SWEEP_SKIP = {
    "PREREQUISITE_NODE_IDS", "FORWARD_NODE_IDS", "PREREQUISITE_REASONS",
    "FORWARD_REASONS", "CHAIN_DESCRIPTION", "CROSS_SUBJECT_PREREQS",
    "CROSS_SUBJECT_REASONS", "CROSS_SUBJECT", "THIS_FORMULA", "GRADE", "SUBJECT",
}
LATEX_PRESENT_RE = re.compile(r"\\[a-zA-Z]+|\\\[|\\\]|\\\(|\\\)|\$")


def sweep_text(body: str):
    """Return (new_body, n_changes, reject_reason_or_None)."""
    if not LATEX_PRESENT_RE.search(body):
        return body, 0, None
    conv, n = convert(body)
    if conv == body:
        return body, 0, None
    bad = verify_invariants(body, conv)
    if bad:
        return body, 0, "; ".join(bad)
    return conv, n, None


def apply_edit(original: str, edit: dict):
    """Return (new_text, edited_section_names, sweep_stats) or raises."""
    preamble, parts = split_sections(original)
    edited = set()
    sweep_stats = {"converted": 0, "changes": 0, "rejected": []}

    if edit.get("latex_sweep"):
        for p in parts:
            name = p[1]
            if name in SWEEP_SKIP or re.fullmatch(r"(PREREQUISITE|FORWARD)_REASONS", name):
                continue
            new_body, n, reject = sweep_text(p[2])
            if reject:
                sweep_stats["rejected"].append((name, reject))
            elif n:
                p[2] = new_body
                sweep_stats["converted"] += 1
                sweep_stats["changes"] += n

    if edit.get("definition"):
        check_banned(edit["definition"], "DEFINITION(payload)")
        for p in parts:
            if p[1] == "DEFINITION":
                p[2] = "\n" + edit["definition"].strip("\n") + "\n\n"
                edited.add("DEFINITION")
                break
        else:
            raise KeyError("DEFINITION not found")

    if edit.get("walkthrough_replace"):
        check_banned(edit["walkthrough_replace"], "WALKTHROUGH(payload)")
        for p in parts:
            if p[1] == "WALKTHROUGH":
                p[2] = "\n" + edit["walkthrough_replace"].strip("\n") + "\n\n"
                edited.add("WALKTHROUGH")
                break
        else:
            raise KeyError("WALKTHROUGH not found")
    elif edit.get("walkthrough_append"):
        check_banned(edit["walkthrough_append"], "WALKTHROUGH+(payload)")
        for p in parts:
            if p[1] == "WALKTHROUGH":
                old = p[2].strip("\n")
                p[2] = "\n" + old + ("\n\n" if old else "") + edit["walkthrough_append"].strip("\n") + "\n\n"
                edited.add("WALKTHROUGH")
                break
        else:
            raise KeyError("WALKTHROUGH not found")

    for name, body in (edit.get("set_sections") or {}).items():
        check_banned(body, f"{name}(payload)")
        hit = False
        for p in parts:
            if p[1] == name:
                p[2] = "\n" + body.strip("\n") + "\n\n"
                edited.add(name)
                hit = True
                break
        if not hit:
            raise KeyError(f"{name} not found")

    for n, pair in (edit.get("set_diag") or {}).items():
        qname, aname = f"DIAGNOSTIC_QUESTION_{n}", f"DIAGNOSTIC_ANSWER_{n}"
        if pair.get("question") is not None:
            check_banned(pair["question"], f"{qname}(payload)")
        if pair.get("answer") is not None:
            check_banned(pair["answer"], f"{aname}(payload)")
        qh = ah = False
        for p in parts:
            if p[1] == qname and pair.get("question") is not None:
                p[2] = "\n" + pair["question"].strip("\n") + "\n\n"
                qh = True
            elif p[1] == aname and pair.get("answer") is not None:
                p[2] = "\n" + pair["answer"].strip("\n") + "\n\n"
                ah = True
        if not qh and not ah:
            raise KeyError(f"{qname}/{aname} not found")
        edited.update([x for x in (qname if qh else None, aname if ah else None) if x])

    all_edited = set(edited)
    if sweep_stats["converted"]:
        all_edited.add("LATEX_SWEEP:" + ",".join(sorted(
            {p[1] for p in parts})))  # marker only; real check is the digest
    return join_sections(preamble, parts), edited, sweep_stats


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--payload", required=True)
    ap.add_argument("--corpus", default=DEFAULT_CORPUS)
    ap.add_argument("--backup", default=DEFAULT_BACKUP)
    ap.add_argument("--manifest", default=None)
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    with open(args.payload, encoding="utf-8") as f:
        payload = json.load(f)

    manifest_path = args.manifest or os.path.join(
        os.path.dirname(args.payload), "apply_manifest.jsonl")
    mode = "a" if not args.dry_run else "x"
    manifest = open(manifest_path, mode, encoding="utf-8") if not args.dry_run else None

    ok = fail = 0
    tot_sweep_changes = 0
    for edit in payload["edits"]:
        fn = edit["file"]
        path = fn if os.path.isabs(fn) else os.path.join(args.corpus, fn)
        if not os.path.isfile(path):
            print(f"FAIL missing file: {fn}", file=sys.stderr)
            fail += 1
            continue
        with open(path, encoding="utf-8") as f:
            original = f.read()

        # sections that may change under this edit
        may_change = set()
        for key in ("definition",):
            if edit.get(key):
                may_change.add("DEFINITION")
        if edit.get("walkthrough_replace") or edit.get("walkthrough_append"):
            may_change.add("WALKTHROUGH")
        may_change.update((edit.get("set_sections") or {}).keys())
        for n, pair in (edit.get("set_diag") or {}).items():
            if pair.get("question") is not None:
                may_change.add(f"DIAGNOSTIC_QUESTION_{n}")
            if pair.get("answer") is not None:
                may_change.add(f"DIAGNOSTIC_ANSWER_{n}")
        if edit.get("latex_sweep"):
            may_change = None  # digest computed over all-but-sweep-eligible

        pre_digest = digest_except(original, may_change) if may_change is not None else None
        if may_change is None:
            # latex sweep: guard = everything except sections actually sweep-eligible;
            # compute digest with eligible sections excluded via a marker set:
            preamble, parts = split_sections(original)
            eligible = {
                p[1] for p in parts
                if p[1] not in SWEEP_SKIP
                and not re.fullmatch(r"(PREREQUISITE|FORWARD)_REASONS", p[1])
            }
            pre_digest = digest_except(original, eligible)

        if not args.dry_run:
            bak = os.path.join(args.backup, fn)
            if not os.path.exists(bak):
                os.makedirs(os.path.dirname(bak), exist_ok=True)
                shutil.copy2(path, bak)

        try:
            new_text, edited, sweep_stats = apply_edit(original, edit)
        except (KeyError, ValueError) as ex:
            print(f"FAIL {fn}: {ex}", file=sys.stderr)
            fail += 1
            continue

        post_digest = digest_except(new_text, may_change) if may_change is not None else \
            digest_except(new_text, eligible)
        if pre_digest != post_digest:
            print(f"FAIL {fn}: non-edited regions changed — refusing", file=sys.stderr)
            fail += 1
            continue

        if args.dry_run:
            ok += 1
            tot_sweep_changes += sweep_stats["changes"]
            continue

        with open(path, "w", encoding="utf-8", newline="") as f:
            f.write(new_text)
        manifest.write(json.dumps({
            "file": fn, "payload": os.path.basename(args.payload),
            "edited": sorted(edited),
            "sweep_sections": sweep_stats["converted"],
            "sweep_changes": sweep_stats["changes"],
            "sweep_rejected": sweep_stats["rejected"],
            "untouched_digest": pre_digest,
        }, ensure_ascii=False) + "\n")
        ok += 1
        tot_sweep_changes += sweep_stats["changes"]

    if manifest:
        manifest.close()
    print(f"{'DRY-RUN ' if args.dry_run else ''}applied={ok} failed={fail} "
          f"sweep_changes={tot_sweep_changes} (payload {os.path.basename(args.payload)})")
    sys.exit(0 if fail == 0 else 1)


if __name__ == "__main__":
    main()
