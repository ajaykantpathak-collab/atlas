"""W3 apply tool: house-standard format-preserving editor plus W3 operations.

Reuses the house applier core (apply_content_depth: split/join sections,
digest guard, banned-string guard, backup-once, manifest) and adds:

  section_replace  {NAME: body}   replace the body of any named section
  strip_ids        true           remove node-ID reference tokens from
                                  student-prose sections (DEFINITION,
                                  WALKTHROUGH, ELI5, COMMON_MISCONCEPTION,
                                  DIAGNOSTIC_QUESTION_*, DIAGNOSTIC_ANSWER_*,
                                  WORKED_EXAMPLE_*, COMPETENCY_QUESTION_*)

Every write is digest-guarded: all non-edited regions must be byte-identical,
or the file is refused. Backups land in --backup (first edit of a file wins,
so the backup is always the pre-batch original). Each applied edit appends a
manifest line with the untouched-region digest.

Usage:
  python w3_apply.py --payload batch.json [--corpus DIR] [--backup DIR] [--manifest FILE]
  python w3_apply.py --strip-ids --files list.txt [--corpus DIR] [--backup DIR] [--manifest FILE]
"""

import argparse
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from apply_content_depth import (  # noqa: E402
    split_sections, join_sections, digest_except, check_banned,
    set_body, append_body,
)

PROSE_PREFIXES = ("DIAGNOSTIC_QUESTION_", "DIAGNOSTIC_ANSWER_", "WORKED_EXAMPLE_",
                  "COMPETENCY_QUESTION_")
PROSE_NAMES = {"DEFINITION", "WALKTHROUGH", "ELI5", "COMMON_MISCONCEPTION"}

ID_RE = re.compile(r"\bc\d+_[a-z0-9]+_[a-z0-9_]*", re.I)
ID_SLASH = r"c\d+_[a-z0-9]+_[a-z0-9_]*(?:/\d+)*"
# 1. whole parenthesised group containing at least one node id (also eats the
#    space before it): "(c9_bio_ch1_2)", "(c10_a and c10_b)", "(see c10_x)".
#    [ \t]* only — never cross the newline before a section header.
PAREN_ID_RE = re.compile(r"[ \t]*\([^()]*\bc\d+_[a-z0-9]+_[^()]*\)")
# 2. "ID (Gloss)" -> keep the gloss, drop the id: the gloss is the student-
#    usable words, the id is the internal pointer ("c10_x (Economic Growth)")
ID_GLOSS_RE = re.compile(r"\b" + ID_SLASH + r"\s*\(([^()]+)\)")
# 3. bare id preceded by a connector (and optional "node"/bold markers) that
#    only exists to point at it
CONN_ID_RE = re.compile(r"(?i)\b(from|in|of|to|through|see)\s+(?:nodes?\s+)?\*{0,2}\s*" + ID_SLASH + r"\s*\*{0,2}")
AND_ID_RE = re.compile(r"(?i)\b(and|or)\s+\*{0,2}\s*" + ID_SLASH + r"\s*\*{0,2}")
BARE_ID_RE = re.compile(r"\b" + ID_SLASH + r"", re.I)
# 4. sibling-node number ranges ("from sibling nodes 001-005")
NODES_NUM_RE = re.compile(r"(?i)(?<=nodes )\d{3}(?:\s*[\u2013\u2014-]\s*\d{3})*")
# leftover bold markers facing each other after an id removal
ORPHAN_BOLD_RE = re.compile(r"\*{2}\s*\*{2}")
# artifact signatures that mean "hand-fix this section" (never auto-shipped)
ARTIFACT_RE = re.compile(
    r"\bc\d+_[a-z0-9]+_"                                   # id survived
    r"|\b(?:and|or|from|in|of|to)\s+(?=[.,;:])"            # connector before punct
    r"|\s/\d"                                               # "/006" slash leftovers
    r"|\*{3,}"                                              # broken bold
    r"|\(\s*\)"                                             # emptied parens
    r"|  ", re.I)                                           # double space (tidy should have caught)

# ---------------------------------------------------------------------------
# raw-LaTeX -> plain-text conversion (student-facing prose must carry no LaTeX)
# ---------------------------------------------------------------------------
_SUP = {"0": "\u2070", "1": "\u00b9", "2": "\u00b2", "3": "\u00b3", "4": "\u2074",
        "5": "\u2075", "6": "\u2076", "7": "\u2077", "8": "\u2078", "9": "\u2079",
        "-": "\u207b", "+": "\u207a", "n": "\u207f", "i": "\u2071"}
_SUB = {"0": "\u2080", "1": "\u2081", "2": "\u2082", "3": "\u2083", "4": "\u2084",
        "5": "\u2085", "6": "\u2086", "7": "\u2087", "8": "\u2088", "9": "\u2089",
        "i": "\u1d62", "n": "\u2099"}
_SYM = {"times": "\u00d7", "div": "\u00f7", "cdot": "\u00b7", "pm": "\u00b1",
        "mp": "\u2213", "neq": "\u2260", "ne": "\u2260", "geq": "\u2265", "leq": "\u2264",
        "ge": "\u2265", "le": "\u2264", "approx": "\u2248", "infty": "\u221e",
        "in": "\u2208", "notin": "\u2209", "theta": "\u03b8", "alpha": "\u03b1",
        "beta": "\u03b2", "gamma": "\u03b3", "delta": "\u03b4", "Delta": "\u0394",
        "lambda": "\u03bb", "mu": "\u03bc", "rho": "\u03c1", "sigma": "\u03c3",
        "pi": "\u03c0", "rightarrow": "\u2192", "to": "\u2192", "Rightarrow": "\u21d2",
        "circ": "\u00b0", "degree": "\u00b0",
        "sum": "\u03a3", "prod": "\u03a0", "propto": "\u221d", "Omega": "\u03a9"}


def _sup_repl(m):
    return "".join(_SUP.get(c, "^" + c) for c in m.group(1))


def _sub_repl(m):
    return "".join(_SUB.get(c, "_" + c) for c in m.group(1))


def deslatex_text(text: str) -> str:
    """Convert raw LaTeX in prose to the corpus plain-text register.

    Returns (converted_text, had_complex_env). Complex environments (cases,
    aligned, matrices...) are reported, never converted blindly.
    """
    had_complex = bool(re.search(r"\\begin\{|\\end\{|\\cases|\\left\.", text))
    t = text
    # \text{...}/\mathrm{...} become marker-wrapped words so adjacent macros
    # keep their boundaries (e.g. \mu\text{T} must stay \mu + T, not \muT)
    t = re.sub(r"\\text\{([^{}]*)\}", "\x0b\\1\x0b", t)
    t = re.sub(r"\\mathrm\{([^{}]*)\}", "\x0b\\1\x0b", t)
    # \frac{a}{b} -> ((a)/(b)) ; supports single-level nesting
    for _ in range(3):
        t = re.sub(r"\\frac\{((?:[^{}]|\{[^{}]*\})*)\}\{((?:[^{}]|\{[^{}]*\})*)\}", r"(\1)/(\2)", t)
    # \sqrt{x} -> √(x); iterate so nested radicals resolve innermost-first
    for _ in range(4):
        new = re.sub(r"\\sqrt\{([^{}]*)\}", "\u221a(\\1)", t)
        if new == t:
            break
        t = new
    # degree: 90^\circ / \circ -> ° (before generic superscript handling)
    t = re.sub(r"\^?\s*\\circ\b", "\u00b0", t)
    # superscripts / subscripts
    t = re.sub(r"\^\{([^{}]+)\}", _sup_repl, t)
    t = re.sub(r"\^\s*(-?\d+|[a-zA-Z])(?![0-9a-zA-Z])", lambda m: "".join(_SUP.get(c, "^" + c) for c in m.group(1)), t)
    t = re.sub(r"_\{([^{}]+)\}", _sub_repl, t)
    t = re.sub(r"_(\d+)", _sub_repl, t)
    t = re.sub(r"_\b(n|i|k|m)\b", _sub_repl, t)
    # trig / log function macros become their plain names
    t = re.sub(r"\\(cosec|cot|tan|sec|sin|cos|log|exp)(?![a-zA-Z])", r"\1", t)
    # max/min stay plain words
    t = re.sub(r"\\(max|min)(?![a-zA-Z])", r"\1", t)
    # blackboard number-set letters
    t = re.sub(r"\\mathbb\{([RNZQC])\}", lambda m: {"R": "\u211d", "N": "\u2115", "Z": "\u2124", "Q": "\u211a", "C": "\u2102"}[m.group(1)], t)
    # symbol macros (lookahead allows _ and digits after, e.g. \mu_0)
    t = re.sub(r"\\(" + "|".join(sorted(_SYM, key=len, reverse=True)) + r")(?![a-zA-Z])",
               lambda m: _SYM[m.group(1)], t)
    # \left \right size commands vanish
    t = re.sub(r"\\left|\\right", "", t)
    # display and inline math delimiters vanish (keep content); replace with a
    # space so surrounding words do not glue together, collapsed later.
    # [ \t]* only — the regex must never eat the newline separating a section
    # header from a body that starts directly with LaTeX.
    t = re.sub(r"[ \t]*\\\[|[ \t]*\\\]|[ \t]*\\\(|[ \t]*\\\)", " ", t)
    t = re.sub(r"\$\$|\$", " ", t)
    # ellipsis macros
    t = re.sub(r"\\(dots|ldots|cdots|vdots|ddots)\b", "\u2026", t)
    # bars: \bar{x} / \overline{x} -> x with combining overline
    t = re.sub(r"\\(?:overline|bar)\{([^{}]*)\}", "\\1\u0305", t)
    # leftover simple commands that have plain-word equivalents
    t = t.replace("\\deg ", "degree ").replace("\\deg(", "degree(")
    # LaTeX row separators ("\\" between displayed equation lines) become "; "
    t = re.sub(r"\\\\", "; ", t)
    # LaTeX spacing macros are just spaces
    t = re.sub(r"\\[,;]", " ", t)
    t = re.sub(r"\\ ", " ", t)
    t = re.sub(r"\\!", "", t)
    # multiplication by juxtaposition of (a)(b) is fine as-is
    t = re.sub(r" {2,}", " ", t)
    t = re.sub(r" ([?!.,;:])", r"\1", t)
    # drop the \text markers
    t = t.replace("\x0b", "")
    return t, had_complex


LATEX_LEFT_RE = re.compile(r"\\[a-zA-Z]+|\\\[|\\\(|\$\$|\$\$|\\\)|\\\]")
LATEX_LEFT_RE = re.compile(r"\\[a-zA-Z]+|\\\[|\\\]|\\\(|\\\)|\$\$")


def strip_ids_from_text(text: str) -> str:
    t = PAREN_ID_RE.sub(" ", text)
    t = ID_GLOSS_RE.sub(r"\1", t)
    t = CONN_ID_RE.sub(" ", t)
    t = AND_ID_RE.sub(" ", t)
    t = BARE_ID_RE.sub(" ", t)
    t = NODES_NUM_RE.sub("", t)
    t = ORPHAN_BOLD_RE.sub(" ", t)
    # tidy artifacts
    t = re.sub(r" +([.,;:!?)])", r"\1", t)
    t = re.sub(r"\( +", "(", t)
    t = re.sub(r"\(\s*\)", "", t)
    t = re.sub(r"(?i)\b(in|from|of|to|and|or)\s+([.,;:])", r"\2", t)
    t = re.sub(r" {2,}", " ", t)
    t = re.sub(r" +\n", "\n", t)
    return t


def is_prose_section(name: str) -> bool:
    return name in PROSE_NAMES or name.startswith(PROSE_PREFIXES)


def apply_deslatex(path, original, mfh, payload_name):
    """DesLaTeX prose sections. Returns (status, section_names)."""
    preamble, parts = split_sections(original)
    changed_names, stragglers = [], []
    for p in parts:
        if is_prose_section(p[1]) and LATEX_LEFT_RE.search(p[2]):
            new_body, complex_env = deslatex_text(p[2])
            if new_body == p[2]:
                continue
            # refuse to ship anything still containing a backslash macro
            if complex_env or LATEX_LEFT_RE.search(new_body) or "^\\" in new_body:
                stragglers.append(p[1])
                continue
            p[2] = new_body
            changed_names.append(p[1])
    if not changed_names:
        return ("stragglers" if stragglers else "clean"), stragglers
    section_names = {p[1] for p in parts if is_prose_section(p[1])}
    new_text = join_sections(preamble, parts)
    pre = digest_except(original, section_names)
    post = digest_except(new_text, section_names)
    if pre != post:
        return "REFUSED:non-edited-region-changed", []
    with open(path, "w", encoding="utf-8", newline="") as f:
        f.write(new_text)
    mfh.write(json.dumps({"file": os.path.basename(path), "payload": payload_name,
                          "edited": changed_names, "stragglers": stragglers,
                          "untouched_digest": pre}, ensure_ascii=False) + "\n")
    return ("stripped" if not stragglers else "stripped-with-stragglers"), changed_names + stragglers


def apply_strip_ids(path, original, mfh, payload_name):
    """Strip id refs from prose sections. Returns (status, changed_section_names).

    Sections whose transformed text still shows an artifact signature are left
    untouched and reported (status 'stragglers') for hand authoring — the
    mechanical pass never ships possibly-damaged text.
    """
    preamble, parts = split_sections(original)
    changed_names = []
    stragglers = []
    for p in parts:
        if is_prose_section(p[1]) and ID_RE.search(p[2]):
            new_body = strip_ids_from_text(p[2])
            if new_body == p[2]:
                continue
            if ARTIFACT_RE.search(new_body):
                stragglers.append(p[1])
                continue
            p[2] = new_body
            changed_names.append(p[1])
    if not changed_names:
        return ("stragglers" if stragglers else "clean"), stragglers
    section_names = {p[1] for p in parts if is_prose_section(p[1])}
    new_text = join_sections(preamble, parts)
    pre = digest_except(original, section_names)
    post = digest_except(new_text, section_names)
    if pre != post:
        return "REFUSED:non-edited-region-changed", []
    with open(path, "w", encoding="utf-8", newline="") as f:
        f.write(new_text)
    mfh.write(json.dumps({"file": os.path.basename(path), "payload": payload_name,
                          "edited": changed_names, "stragglers": stragglers,
                          "untouched_digest": pre},
                         ensure_ascii=False) + "\n")
    return ("stripped" if not stragglers else "stripped-with-stragglers"), changed_names + stragglers


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--payload", default=None)
    ap.add_argument("--strip-ids", action="store_true")
    ap.add_argument("--deslatex", action="store_true")
    ap.add_argument("--files", default=None, help="file list for --strip-ids / --deslatex mode")
    ap.add_argument("--corpus", default=r"D:\platform\deploy\content\enhanced_nodes_md")
    ap.add_argument("--backup", default=os.path.join(os.path.dirname(os.path.abspath(__file__)), "backups"))
    ap.add_argument("--manifest", default=None)
    args = ap.parse_args()

    manifest_path = args.manifest or os.path.join(
        os.path.dirname(args.payload or args.files or "."), "w3_apply_manifest.jsonl")
    mfh = open(manifest_path, "a", encoding="utf-8")
    ok = fail = skip = 0

    if args.strip_ids or args.deslatex:
        mode = "strip_ids" if args.strip_ids else "deslatex"
        files = [l.strip() for l in open(args.files, encoding="utf-8") if l.strip()]
        for fn in files:
            path = os.path.join(args.corpus, fn)
            if not os.path.isfile(path):
                print(f"FAIL missing {fn}", file=sys.stderr)
                fail += 1
                continue
            bak = os.path.join(args.backup, fn)
            if not os.path.exists(bak):
                os.makedirs(os.path.dirname(bak), exist_ok=True)
                import shutil
                shutil.copy2(path, bak)
            # re-read AFTER backup so the guard compares live content
            original = open(path, encoding="utf-8").read()
            if mode == "strip_ids":
                has_work = ID_RE.search("".join(
                    p[2] for p in split_sections(original)[1] if is_prose_section(p[1])))
            else:
                has_work = LATEX_LEFT_RE.search("".join(
                    p[2] for p in split_sections(original)[1] if is_prose_section(p[1])))
            if not has_work:
                skip += 1
                continue
            if mode == "strip_ids":
                res, _names = apply_strip_ids(path, original, mfh, mode)
            else:
                res, _names = apply_deslatex(path, original, mfh, mode)
            if res.startswith("stripped"):
                ok += 1
                if "with-stragglers" in res:
                    print(f"STRAGGLER {fn}: {_names}", file=sys.stderr)
            elif res == "clean":
                skip += 1
            elif res == "stragglers":
                skip += 1
                print(f"STRAGGLER {fn}: {_names}", file=sys.stderr)
            else:
                print(f"FAIL {fn}: {res}", file=sys.stderr)
                fail += 1
    else:
        payload = json.load(open(args.payload, encoding="utf-8"))
        for edit in payload["edits"]:
            fn = edit["file"]
            path = fn if os.path.isabs(fn) else os.path.join(args.corpus, fn)
            if not os.path.isfile(path):
                print(f"FAIL missing file: {fn}", file=sys.stderr)
                fail += 1
                continue
            original = open(path, encoding="utf-8").read()

            section_names = set()
            if edit.get("definition"):
                section_names.add("DEFINITION")
            if edit.get("eli5"):
                section_names.add("ELI5")
            if edit.get("walkthrough_replace") or edit.get("walkthrough_append"):
                section_names.add("WALKTHROUGH")
            for name in (edit.get("section_replace") or {}):
                section_names.add(name)
            pre_digest = digest_except(original, section_names)

            bak = os.path.join(args.backup, fn)
            if not os.path.exists(bak):
                os.makedirs(os.path.dirname(bak), exist_ok=True)
                import shutil
                shutil.copy2(path, bak)

            preamble, parts = split_sections(original)
            try:
                for name, body in (edit.get("section_replace") or {}).items():
                    check_banned(body, f"{fn} {name}")
                    set_body(parts, name, body)
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
            except (KeyError, ValueError) as ex:
                print(f"FAIL {fn}: {ex}", file=sys.stderr)
                fail += 1
                continue

            new_text = join_sections(preamble, parts)
            _, new_parts = split_sections(new_text)
            names = {p[1] for p in new_parts}
            if not all(req in names for req in section_names):
                print(f"FAIL {fn}: edited section vanished", file=sys.stderr)
                fail += 1
                continue
            post_digest = digest_except(new_text, section_names)
            if pre_digest != post_digest:
                print(f"FAIL {fn}: non-edited regions changed — refusing", file=sys.stderr)
                fail += 1
                continue
            with open(path, "w", encoding="utf-8", newline="") as f:
                f.write(new_text)
            mfh.write(json.dumps({"file": fn, "payload": os.path.basename(args.payload),
                                  "edited": sorted(section_names), "untouched_digest": pre_digest},
                                 ensure_ascii=False) + "\n")
            ok += 1

    mfh.close()
    print(f"applied={ok} skipped={skip} failed={fail}")
    sys.exit(0 if fail == 0 else 1)


if __name__ == "__main__":
    main()
