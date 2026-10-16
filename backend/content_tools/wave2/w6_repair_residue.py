"""W6 residue repair — clean up hybrid shapes left by the id scrub.

The first scrub pass replaced ids/ranges, but three authored shapes produced
grammatical residue:
  "(c12_bio_isc_05_001-003)"      -> "(the earlier node-003)"
  "(covered in nodes 005, 006-012)" -> "(covered in the prerequisite nodes-012)"
  "(nodes c11_envsci_isc_06_007-013)" -> "(nodes the later node-013)"

This pass rewrites every residue shape to a clean phrase:
  "the earlier node-003"   -> "the earlier nodes"
  "nodes the later node-013" -> "the later nodes"
  "the prerequisite nodes-012" -> "the prerequisite nodes"

Same integrity contract as the scrub: per-file backup, sha256 manifest,
section-key files never touched, parked families skipped.

Usage: python w6_repair_residue.py [--corpus DIR] [--backup DIR] [--dry-run]
"""

import argparse
import hashlib
import json
import os
import re
import shutil
from collections import Counter

DEFAULT_CORPUS = r"D:\platform\deploy\content\cisce_nodes_v2"
DEFAULT_BACKUP = r"D:\platform\deploy\backend\content_tools\wave2\backups\repair"

FILE_RE = re.compile(r"^c1[12]_([a-z]+(?:_[a-z0-9]+)*?)_isc_(\d+)_(\d+)\.md$")
PARKED = {"eng", "eng_elec", "eng_mod", "hin"}
SEC_RE = re.compile(r"^##\s+([A-Z_0-9]+)\s*$", re.M)
KEY_SUFFIX = ("_NODE_IDS",)
KEY_EXACT = {"CROSS_SUBJECT_PREREQS"}
DIRW = r"(earlier|later|next|prerequisite|previous|sibling)"
HYP = r"[‑–—-]"
NUM = r"[0-9]{2,3}"

R1 = re.compile(r"\b[Nn]odes" + r"[ \t\u00a0\u202f]+the " + DIRW +
                r" nodes?" + r"(?:" + HYP + NUM + r")?\b")
R2 = re.compile(r"\bthe " + DIRW + r" nodes?" + HYP + NUM + r"\b")
R3 = re.compile(r"\b[Nn]odes" + HYP + NUM + r"\b")   # "nodes-012" bare
SPC = r"[ \t\u00a0\u202f]"
# list shape: "nodes the earlier node, the earlier node and the earlier node"
R0 = re.compile(r"\b[Nn]odes" + SPC + r"+the " + DIRW + r" nodes?"
                + r"(?:" + HYP + NUM + r")?"
                + r"(?:" + SPC + r"*, *" + r"the " + DIRW + r" nodes?"
                + r"(?:" + HYP + NUM + r")?)*"
                + r"(?:" + SPC + r"+and" + SPC + r"+the " + DIRW + r" nodes?"
                + r"(?:" + HYP + NUM + r")?)?")


def parse_sections(text: str):
    ms = list(SEC_RE.finditer(text))
    out = []
    for i, m in enumerate(ms):
        end = ms[i + 1].start() if i + 1 < len(ms) else len(text)
        out.append([m.group(0), m.group(1), text[m.end():end]])
    return (text[: ms[0].start()] if ms else text), out


def join_sections(pre, parts) -> str:
    return pre + "".join(h + b for h, _n, b in parts)


def repair_body(body: str, cur_node: int = -1, section: str = "") -> tuple[str, int]:
    n = 0

    # P_B: underscore/hyphen tails "the earlier nodes_003" -> "the earlier nodes"
    def pb(m):
        nonlocal n
        n += 1
        return f"the {m.group(1)} nodes"
    body = re.sub(r"\bthe (" + DIRW + r") nodes?[-\u2011\u2013\u2014_]\d{1,3}\b", pb, body)

    # P_A: chapter-local refs — compound "node 02_013", compound ranges
    # "nodes 02_006-02_009", and bare "node 10". Positional "Node 11 of 18"
    # phrases are display-safe and left alone.
    COMP = r"([0-9]{2})[_\u2011\u2013\u2014-]([0-9]{3})"

    def dir_for(num: int) -> str:
        if section in ("PREREQUISITE_REASONS", "PREREQ_BEFORE", "PREREQ_STUCK",
                       "PREREQ_CONCEPT"):
            return "prerequisite"
        if section == "FORWARD_REASONS":
            return "next"
        if section == "CHAIN_DESCRIPTION" and num == cur_node:
            return "self"
        return "earlier" if num < cur_node else "later"

    def repl_word(word: str, d: str) -> str:
        plural = word.endswith("s")
        if d == "self":
            return "These nodes" if plural else "This node"
        return f"the {d} node{'s' if plural else ''}"

    def _sent_start(text: str, pos: int) -> bool:
        before = text[:pos].rstrip(" \t").rstrip("*")
        return not before or before.endswith((".", "!", "?", ":", ";"))

    def pa_range(m):
        nonlocal n
        n += 1
        d = dir_for(int(m.group(2)))
        return ("These nodes" if d == "self"
                else f"the {'next' if d == 'next' else d} nodes of this chapter")
    body = re.sub(r"(?<![\w\u20b9,])([Nn]odes?)[ \u00a0\u202f]+(" + COMP + r")[ \u00a0\u202f]*(?:[-\u2011\u2013\u2014]|to)[ \u00a0\u202f]*"
                  + COMP, pa_range, body)

    def pa_comp(m):
        nonlocal n
        n += 1
        word = m.group(1)
        out = repl_word(word, dir_for(int(m.group(3))))
        cap = "T" if word[0].isupper() or _sent_start(body, m.start()) else "t"
        return cap + out[1:]
    body = re.sub(r"(?<![\w\u20b9,])([Nn]odes?)[ \u00a0\u202f]+(" + COMP + r")", pa_comp, body)

    def pa_bare(m):
        nonlocal n
        n += 1
        word = m.group(1)
        out = repl_word(word, dir_for(int(m.group(2))))
        cap = "T" if word[0].isupper() or _sent_start(body, m.start()) else "t"
        return cap + out[1:]
    body = re.sub(r"(?<![\w\u20b9,])([Nn]odes?)[ \u00a0\u202f]+([0-9]{1,3})(?![ \u00a0\u202f]*of\b)(?![_0-9])", pa_bare, body)

    def r0(m):
        nonlocal n
        dirs = re.findall(DIRW, m.group(0))
        if len(set(dirs)) != 1:
            return m.group(0)      # mixed directions stay as-is (still grammatical)
        n += 1
        return f"the {dirs[0]} nodes"
    body = R0.sub(r0, body)

    # R4: same-direction comma runs  "the earlier node, the earlier node"
    def r4(m):
        nonlocal n
        dirs = [m.group(1)] + re.findall(DIRW, m.group(2) or "")
        if len(set(dirs)) != 1:
            return m.group(0)
        n += 1
        return f"the {dirs[0]} nodes"
    body = re.sub(r"\bthe (" + DIRW + r") nodes?(?:(?: *, *| +and +)the (" +
                  DIRW + r") nodes?)+", r4, body)

    # R6: orphaned "sibling the earlier nodes" -> "sibling nodes"
    def r6(m):
        nonlocal n
        n += 1
        return f"{m.group(1)} nodes"
    body = re.sub(r"\b([Ss]ibling) the (?:" + DIRW + r") nodes?\b", r6, body)

    # R7: hyphen-tail hybrids  "the later node-05_018" -> "the later nodes"
    def r7(m):
        nonlocal n
        n += 1
        return f"the {m.group(1)} nodes"
    body = re.sub(r"\bthe (" + DIRW + r") nodes?" + HYP + r"\d{2}_\d{3}\b", r7, body)

    # R8: "the the" duplication
    def r8(m):
        nonlocal n
        n += 1
        return "the"
    body = re.sub(r"\b[Tt]he +the\b", r8, body)

    def r1(m):
        nonlocal n
        n += 1
        return f"the {m.group(1)} nodes"
    body = R1.sub(r1, body)

    def r2(m):
        nonlocal n
        n += 1
        return f"the {m.group(1)} nodes"
    body = R2.sub(r2, body)

    def r3(m):
        nonlocal n
        n += 1
        return "nodes"
    body = R3.sub(r3, body)
    return body, n


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--corpus", default=DEFAULT_CORPUS)
    ap.add_argument("--backup", default=DEFAULT_BACKUP)
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    manifest = []
    files_touched = 0
    total = 0
    samples = []

    for fn in sorted(os.listdir(args.corpus)):
        m = FILE_RE.match(fn)
        if not m or m.group(1) in PARKED:
            continue
        path = os.path.join(args.corpus, fn)
        with open(path, encoding="utf-8") as f:
            original = f.read()
        pre, parts = parse_sections(original)
        changed = False
        file_edits = {}
        for p in parts:
            header, name, body = p
            if name.endswith(KEY_SUFFIX) or name in KEY_EXACT:
                continue
            # cheap pre-filter: any node-word or known duplication artifact
            if ("node" not in body.lower()
                    and not re.search(r"\b[Tt]he +the\b", body)):
                continue
            cur_node = int(FILE_RE.match(fn).group(3))
            new_body, n = repair_body(body, cur_node, name)
            if n and new_body != body:
                if len(samples) < 12:
                    for a, b in zip(body.splitlines(), new_body.splitlines()):
                        if a != b and len(samples) < 12:
                            samples.append((fn, name, a.strip()[:110], b.strip()[:110]))
                p[2] = new_body
                file_edits[name] = n
                total += n
                changed = True
        if not changed:
            continue
        new_text = join_sections(pre, parts)
        if not args.dry_run:
            bak = os.path.join(args.backup, fn)
            os.makedirs(os.path.dirname(bak), exist_ok=True)
            if not os.path.exists(bak):
                shutil.copy2(path, bak)
            with open(path, "w", encoding="utf-8", newline="") as f:
                f.write(new_text)
        files_touched += 1
        manifest.append({
            "file": fn,
            "before_sha256": hashlib.sha256(original.encode("utf-8")).hexdigest(),
            "after_sha256": hashlib.sha256(new_text.encode("utf-8")).hexdigest(),
            "section_edits": file_edits,
        })

    out = os.path.join(os.path.dirname(args.backup), "repair_manifest.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump({"files_touched": files_touched, "total_edits": total,
                   "dry_run": args.dry_run, "files": manifest}, f,
                  ensure_ascii=False, indent=1)
    print(f"files touched: {files_touched}, edits: {total} (dry_run={args.dry_run})")
    for s in samples:
        print(f"  [{s[1]}] {s[2]}\n      -> {s[3]}")
    print(f"manifest: {out}")


if __name__ == "__main__":
    main()
