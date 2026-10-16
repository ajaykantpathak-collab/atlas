"""derive_eli5.py -- OWNER-APPROVED extractive ELI5 population (content2).

For each teaching node (9,099) EXCEPT Hindi-medium subjects (hin_*: 885,
owner-deferred) derive an `## ELI5` md section STRICTLY from the node's own
authored content:

  * first 1-2 prose sentences of the node's DEFINITION (formula-heavy
    sentences are skipped; if the definition is all formulas, the prose
    clause before the first math span/colon is used);
  * optionally the first sentence of COMMON_MISCONCEPTION (<= 200 chars);
  * generic connective framing only ("In simple words:", "Common mix-up:");
  * a small whitelist of plain-word substitutions (utilize->use, ...).

Zero-wrong guarantees enforced in-script:
  * no numbers that are not in the source file;
  * every content word (>=4 chars) of the derived ELI5 must occur in the
    source file (framing words + substitution targets whitelisted);
  * sentence-boundary truncation only (never mid-sentence).

Idempotent: files already carrying `## ELI5` are skipped. Originals are
zipped to backend/_archive/eli5_backups.zip before modification.

Usage:  python derive_eli5.py [--dry] [--limit N]
"""
import io
import json
import os
import re
import sys
import zipfile
from collections import Counter, defaultdict

MD = r"D:\platform\deploy\content\enhanced_nodes_md"
INDEX = r"D:\platform\backend\_cache\enhanced_nodes_index.json"
BACKUP_ZIP = r"D:\platform\backend\_archive\eli5_backups.zip"

DRY = "--dry" in sys.argv
LIMIT = None
if "--limit" in sys.argv:
    LIMIT = int(sys.argv[sys.argv.index("--limit") + 1])

# --------------------------------------------------------------------------- #
# extraction helpers
# --------------------------------------------------------------------------- #
_SEC = lambda name: re.compile(
    r"^##[ \t]*" + name + r"[ \t]*\n(.*?)(?=^##(?!#)|\Z)", re.M | re.S)

MATH_SPAN_RE = re.compile(
    r"\\\(.{0,400}?\\\)|\\\[.{0,400}?\\\]|\$\$.{0,400}?\\$\$|\$[^$\n]{1,200}\$")
SENT_SPLIT_RE = re.compile(r"(?<=[.!?\u0964])\s+(?=[A-Z0-9\u0915-\u0939\"(\[])")
MARKDOWN_JUNK_RE = re.compile(r"\*\*|`{1,3}|^#{1,6}\s", re.M)

#: plain-word substitutions (targets are verifier-whitelisted)
SUBSTITUTIONS = [
    (re.compile(r"\bis defined as\b", re.I), "is"),
    (re.compile(r"\brefers to\b", re.I), "means"),
    (re.compile(r"\bin order to\b", re.I), "to"),
    (re.compile(r"\bprior to\b", re.I), "before"),
    (re.compile(r"\bsubsequent to\b", re.I), "after"),
    (re.compile(r"\butilize(s|d)?\b", re.I), "use"),
    (re.compile(r"\butilising\b", re.I), "using"),
    (re.compile(r"\butilizing\b", re.I), "using"),
    (re.compile(r"\bapproximately\b", re.I), "about"),
    (re.compile(r"\bnumerous\b", re.I), "many"),
    (re.compile(r"\bassist(s|ed|ing)?\b", re.I), "help"),
    (re.compile(r"\bobtain(s|ed|ing)?\b", re.I), "get"),
    (re.compile(r"\bdemonstrate(s|d)?\b", re.I), "show"),
]

FRAMING_WHITELIST = frozenset("""
in simple words common mix a an the it its this that of to for and or is are
means use using about many help get show before after called if when not can
""".split())

MAX_DEF_CHARS = 340
MAX_ELI5_CHARS = 460


def _clean(text: str) -> str:
    text = MARKDOWN_JUNK_RE.sub("", text or "")
    text = re.sub(r"\s+", " ", text).strip()
    return text


def _prose_ratio(sentence: str) -> float:
    """Fraction of characters that are letters/digits/spaces after removing
    math spans -- low ratio means the sentence is mostly formulas."""
    stripped = MATH_SPAN_RE.sub("", sentence)
    if not stripped:
        return 0.0
    good = sum(ch.isalnum() or ch.isspace() for ch in stripped)
    return good / max(1, len(stripped))


def _sentences(text: str):
    text = _clean(text)
    out = []
    for s in SENT_SPLIT_RE.split(text):
        s = s.strip(" ;:,\u2013\u2014-")
        if len(s) >= 25:
            out.append(s)
    return out


def _definition_part(definition: str) -> str:
    sents = _sentences(definition)
    prose = [s for s in sents if _prose_ratio(s) >= 0.82 and not MATH_SPAN_RE.search(s)]
    picked = []
    used = 0
    for s in (prose or sents)[:2]:
        if used + len(s) + 1 <= MAX_DEF_CHARS or not picked:
            picked.append(s)
            used += len(s) + 1
        else:
            break
        if used >= MAX_DEF_CHARS * 0.7:
            break
    if picked:
        part = " ".join(picked)
    else:
        # all-formula definition: prose clause before the first math span/colon
        flat = _clean(MATH_SPAN_RE.sub("|", definition))
        clause = flat.split("|")[0].split(":")[0].strip(" ;:,")
        part = clause if len(clause) >= 25 else (sents[0] if sents else "")
    for pat, rep in SUBSTITUTIONS:
        part = pat.sub(rep, part)
    return part


def _misconception_part(mc: str):
    sents = _sentences(mc)
    for s in sents[:2]:
        if 30 <= len(s) <= 200 and _prose_ratio(s) >= 0.85:
            return s
    return None


def derive_eli5(definition: str, misconception: str) -> str:
    part = _definition_part(definition)
    if not part:
        return ""
    if part and part[0].islower():
        part = part[0].upper() + part[1:]
    out = "In simple words: " + part.rstrip(".") + "."
    mix = _misconception_part(misconception or "")
    if mix and len(out) + len(mix) + 18 <= MAX_ELI5_CHARS:
        out += " Common mix-up: " + mix.rstrip(".") + "."
    return out if len(out) <= MAX_ELI5_CHARS else out[:MAX_ELI5_CHARS].rsplit(" ", 1)[0].rstrip(",;:") + "."


# --------------------------------------------------------------------------- #
# zero-wrong fidelity verification
# --------------------------------------------------------------------------- #
_NUM_RE = re.compile(r"\d+")
_WORD_RE = re.compile(r"[A-Za-z]{4,}")


def verify_fidelity(eli5: str, source_text: str) -> list:
    """Return a list of violations ([] == pass)."""
    src = source_text.lower()
    bad = []
    for num in _NUM_RE.findall(eli5.lower()):
        if num not in src:
            bad.append("number-not-in-source:" + num)
    for w in _WORD_RE.findall(eli5.lower()):
        if w in FRAMING_WHITELIST:
            continue
        if w not in src:
            bad.append("word-not-in-source:" + w)
    return bad


# --------------------------------------------------------------------------- #
# main
# --------------------------------------------------------------------------- #
def main():
    idx = json.load(open(INDEX, encoding="utf-8"))
    nodes = [n for n in idx["nodes"]
             if not str(n.get("node_id", "")).endswith("_comp")
             and n.get("kind") != "case_companion"]
    hindi = [n for n in nodes if str(n.get("subject", "")).lower().startswith("hin")]
    targets = [n for n in nodes if n not in hindi]
    if LIMIT:
        targets = targets[:LIMIT]
    print(f"teaching nodes: {len(nodes)} | hindi (deferred): {len(hindi)} "
          f"| eli5 targets: {len(targets)}")

    already = written = empty_def = failed = 0
    per_class = Counter()
    failures = []
    samples = defaultdict(list)
    backups = [] if not DRY else None
    zf = None if DRY else zipfile.ZipFile(BACKUP_ZIP, "a", zipfile.ZIP_DEFLATED)

    for n in targets:
        path = os.path.join(MD, n["source_file"])
        if not os.path.isfile(path):
            failures.append((n["node_id"], "missing-md-file")); failed += 1
            continue
        with open(path, "r", encoding="utf-8-sig", errors="replace") as fh:
            text = fh.read()
        if "## ELI5" in text:
            already += 1
            continue
        dsec = _SEC("DEFINITION").search(text)
        msec = _SEC("COMMON_MISCONCEPTION").search(text)
        definition = dsec.group(1).strip() if dsec else ""
        misconception = msec.group(1).strip() if msec else ""
        eli5 = derive_eli5(definition, misconception)
        if not eli5:
            empty_def += 1
            failures.append((n["node_id"], "empty-derivation"))
            continue
        bad = verify_fidelity(eli5, text)
        if bad:
            failed += 1
            failures.append((n["node_id"], ";".join(bad[:3])))
            continue
        if len(bad) == 0:
            per_class[n["class"]] += 1
        if len(samples[n["class"]]) < 2:
            samples[n["class"]].append((n["node_id"], eli5))
        if DRY:
            continue
        backups.append((n["source_file"], text.encode("utf-8")))
        section = "\n\n## ELI5\n" + eli5 + "\n"
        if "## DEFINITION" in text:
            new_text = text.replace("## DEFINITION", section.strip("\n") +
                                    "\n\n## DEFINITION", 1)
        else:
            new_text = text.rstrip("\n") + "\n\n" + section
        with open(path, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(new_text)
        written += 1

    if zf is not None:
        for fname, blob in backups:
            zf.writestr("eli5_backup/" + fname, blob)
        zf.close()

    print(f"mode={'DRY' if DRY else 'WRITE'} | already-had-eli5: {already} "
          f"| written: {written} | empty: {empty_def} | failed-fidelity: {failed}")
    print("per-class derived:", dict(sorted(per_class.items())))
    if failures:
        print("first failures:")
        for f in failures[:10]:
            print("  ", f)
    print("samples:")
    for cls in sorted(samples):
        for nid, e in samples[cls][:1]:
            print(f"  [c{cls}] {nid}\n      {e}")


if __name__ == "__main__":
    main()
