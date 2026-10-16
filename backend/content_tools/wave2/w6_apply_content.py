"""W6 content apply — ISC lane authoring payload applier.

Format-preserving editor for cisce_nodes_v2 node files. Supports:
  definition            -> replace DEFINITION body
  eli5                  -> replace ELI5 body
  walkthrough_replace   -> replace WALKTHROUGH body
  walkthrough_append    -> append to WALKTHROUGH (paragraph break inserted)
  worked_example        -> appended as WORKED_EXAMPLE_<n+1> after the last one

Integrity contract (same as apply_content_depth.py):
  - per-file backup before first write (kept if exists)
  - digest_except manifest: sha256 of all untouched regions before edit
  - post-conditions: required sections still present, non-empty
  - content bans (antislop/platform): fail the edit, never half-apply

Payload: {"edits": [{"file": ..., "definition": ..., "eli5": ...,
                     "walkthrough_append": ..., "walkthrough_replace": ...,
                     "worked_example": {...}}]}

Usage: python w6_apply_content.py --payload batch.json [--corpus DIR] [--backup DIR]
"""

import argparse
import hashlib
import json
import os
import re
import shutil
import sys

DEFAULT_CORPUS = r"D:\platform\deploy\content\cisce_nodes_v2"
DEFAULT_BACKUP = r"D:\platform\deploy\backend\content_tools\wave2\backups\content"

HEADER_RE = re.compile(r"^##\s+([A-Z_0-9]+)\s*$", re.M)
BANNED = ["Lane C", "variable binding", "This node covers", "TBD", "Lorem ipsum",
          "as an AI language model", "as an AI,"]
BANNED_ID = re.compile(r"\bc1[12]_(?:[a-z0-9]+_)?(?:isc|icse|cbse)_\d+_\d+\b")


def split_sections(text: str):
    parts = []
    ms = list(HEADER_RE.finditer(text))
    pre = text[: ms[0].start()] if ms else text
    for i, m in enumerate(ms):
        end = ms[i + 1].start() if i + 1 < len(ms) else len(text)
        parts.append([m.group(0), m.group(1), text[m.end():end]])
    return pre, parts


def join_sections(pre, parts) -> str:
    return pre + "".join(h + b for h, _n, b in parts)


def set_body(parts, name, new_body: str):
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
    p[2] = "\n" + old + ("\n\n" if old else "") + addition.strip("\n") + "\n\n"


def next_index(parts, prefix: str) -> int:
    idx = 0
    for p in parts:
        m = re.fullmatch(re.escape(prefix) + r"_(\d+)", p[1])
        if m:
            idx = max(idx, int(m.group(1)))
    return idx + 1


def check_clean(text: str, where: str):
    for b in BANNED:
        if re.search(r"\b" + re.escape(b) + r"\b", text, re.IGNORECASE):
            raise ValueError(f"banned string {b!r} in {where}")
    if BANNED_ID.search(text):
        raise ValueError(f"raw node id in {where}")


def digest_except(text: str, edited: set) -> str:
    pre, parts = split_sections(text)
    h = hashlib.sha256()
    h.update(pre.encode("utf-8"))
    for header, name, body in parts:
        h.update(header.encode("utf-8"))
        if name not in edited:
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
    mf = open(manifest_path, "a", encoding="utf-8")

    ok = fail = 0
    for edit in payload["edits"]:
        fn = edit["file"]
        path = fn if os.path.isabs(fn) else os.path.join(args.corpus, fn)
        if not os.path.isfile(path):
            print(f"FAIL missing: {fn}", file=sys.stderr)
            fail += 1
            continue
        with open(path, encoding="utf-8") as f:
            original = f.read()

        edited = set()
        if edit.get("definition"):
            edited.add("DEFINITION")
        if edit.get("eli5"):
            edited.add("ELI5")
        if edit.get("walkthrough_replace") or edit.get("walkthrough_append"):
            edited.add("WALKTHROUGH")
        if edit.get("definition_lead"):
            edited.add("DEFINITION")
        if edit.get("worked_example"):
            edited.add("WORKED_EXAMPLES")
            edited.update(f"WORKED_EXAMPLE_{i}" for i in range(1, 40))
        if edit.get("worked_example_replace"):
            edited.add(f"WORKED_EXAMPLE_{edit['worked_example_replace']['index']}")
        pre_digest = digest_except(original, edited)

        try:
            pre, parts = split_sections(original)
            if edit.get("definition"):
                check_clean(edit["definition"], f"{fn} DEFINITION")
                set_body(parts, "DEFINITION", edit["definition"])
            if edit.get("definition_lead"):
                # replace only the leading filler sentence ("This node ... .")
                # of the DEFINITION; `expect` must prefix the current lead
                hits = [p for p in parts if p[1] == "DEFINITION"]
                if not hits:
                    raise KeyError("DEFINITION not found")
                body = hits[0][2].strip("\n")
                expect = edit.get("expect", "")
                if expect and not body.startswith(expect):
                    raise ValueError(f"lead mismatch in {fn}: {body[:60]!r}")
                m = re.match(r"^(This [^\n]*?[.!?])(?=[ \t]+[A-Z*“\"(\[]|$)", body, re.S)
                if not m:
                    raise ValueError(f"no filler lead sentence in {fn}")
                new_body = edit["definition_lead"].strip() + body[m.end(1):]
                check_clean(new_body, f"{fn} DEFINITION(lead)")
                hits[0][2] = "\n" + new_body + "\n\n"
            if edit.get("eli5"):
                check_clean(edit["eli5"], f"{fn} ELI5")
                set_body(parts, "ELI5", edit["eli5"])
            if edit.get("walkthrough_replace"):
                check_clean(edit["walkthrough_replace"], f"{fn} WALKTHROUGH")
                set_body(parts, "WALKTHROUGH", edit["walkthrough_replace"])
            if edit.get("walkthrough_append"):
                check_clean(edit["walkthrough_append"], f"{fn} WALKTHROUGH+")
                append_body(parts, "WALKTHROUGH", edit["walkthrough_append"])
            if edit.get("worked_example"):
                we = edit["worked_example"]
                title = we.get("title", "")
                body = ""
                if title:
                    body += f"**{title}**\n\n"
                body += "**PROBLEM:** " + we["problem"].strip() + "\n\n"
                body += "**SOLUTION (step by step):**\n" + we["solution"].strip() + "\n\n"
                body += "**ANSWER:** " + we["answer"].strip() + "\n\n"
                body += "**WHY THIS METHOD:** " + we["why"].strip()
                check_clean(body, f"{fn} WORKED_EXAMPLE")
                n = next_index(parts, "WORKED_EXAMPLE")
                insert_at = max(i for i, p in enumerate(parts)
                                if p[1].startswith("WORKED_EXAMPLE_")) + 1
                parts.insert(insert_at, [f"## WORKED_EXAMPLE_{n}",
                                         f"WORKED_EXAMPLE_{n}",
                                         "\n" + body.strip("\n") + "\n\n"])
                edited.add(f"WORKED_EXAMPLE_{n}")
            if edit.get("worked_example_replace"):
                wr = edit["worked_example_replace"]
                name = f"WORKED_EXAMPLE_{wr['index']}"
                hits = [p for p in parts if p[1] == name]
                if not hits:
                    raise KeyError(f"{name} not found")
                body = wr["body"].strip("\n")
                check_clean(body, f"{fn} {name}")
                hits[0][2] = "\n" + body + "\n\n"
                edited.add(name)
        except (KeyError, ValueError) as ex:
            print(f"FAIL {fn}: {ex}", file=sys.stderr)
            fail += 1
            continue

        new_text = join_sections(pre, parts)
        _p2, parts2 = split_sections(new_text)
        names = {p[1] for p in parts2}
        bad = False
        for req in ("DEFINITION", "ELI5", "WALKTHROUGH"):
            if req not in names or not parts2[[p[1] for p in parts2].index(req)][2].strip():
                print(f"FAIL {fn}: {req} vanished/empty", file=sys.stderr)
                bad = True
                break
        if bad:
            fail += 1
            continue
        # digest guard: untouched regions of the new text must hash identical
        if digest_except(new_text, edited) != pre_digest:
            print(f"FAIL {fn}: untouched regions changed", file=sys.stderr)
            fail += 1
            continue

        bak = os.path.join(args.backup, fn)
        os.makedirs(os.path.dirname(bak), exist_ok=True)
        if not os.path.exists(bak):
            shutil.copy2(path, bak)
        with open(path, "w", encoding="utf-8", newline="") as f:
            f.write(new_text)
        ok += 1
        mf.write(json.dumps({"file": fn, "edited": sorted(edited),
                             "pre_digest_except_edited": pre_digest,
                             "after_sha256": hashlib.sha256(new_text.encode("utf-8")).hexdigest()},
                            ensure_ascii=False) + "\n")

    mf.close()
    print(f"applied: {ok}, failed: {fail}")


if __name__ == "__main__":
    main()
