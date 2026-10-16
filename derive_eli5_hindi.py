"""derive_eli5_hindi.py -- GAPS pass WS-C (owner-approved Hindi authoring).

Populates the deferred [deferred-hindi] bucket: an `## ELI5` section for
each of the 885 Hindi-medium teaching nodes (hin_a/hin_al/hin_ar/hin_v,
c11+c12) EXTRACTED from each node's own authored content -- the same
discipline as derive_eli5.py, extended for the corpus reality:

  * 882 of the 885 files carry English-medium authored prose about the
    Hindi literature chapters -- their ELI5 derives from that authored
    English with the standard framing ("In simple words:");
  * 3 files are Devanagari-medium -- their ELI5 derives from the authored
    Hindi prose with Hindi framing ("आसान शब्दों में:" / "आम गलती:").
    Student-authored content stays in its authored language either way;
    nothing is translated and nothing is invented.

Guards beyond derive_eli5 (the Hindi files include damaged
reconstruction-era nodes):
  * sentences bearing corpus node-ids are never used (raw-id leak guard);
  * reconstruction/meta-noise narration is never used;
  * orphan list-number fragments are never used.

Zero-wrong verification: every English word (>=4 chars), every
Devanagari word (>=2 chars, whitespace-compacted), and every number
(ASCII + Devanagari digits) in the derived ELI5 must exist in the
node's own file; framing words whitelisted.  Idempotent; originals
zipped to backend/_archive/gaps_hindi_eli5_backups.zip.

Usage:  python derive_eli5_hindi.py [--dry] [--limit N]
"""
import importlib.util
import json
import os
import re
import sys
import unicodedata
import zipfile
from collections import Counter

sys.argv = sys.argv or ["x"]
MD = r"D:\platform\deploy\content\enhanced_nodes_md"
INDEX = r"D:\platform\backend\_cache\enhanced_nodes_index.json"
BACKUP_ZIP = r"D:\platform\backend\_archive\gaps_hindi_eli5_backups.zip"
DRY = "--dry" in sys.argv
LIMIT = None
if "--limit" in sys.argv:
    LIMIT = int(sys.argv[sys.argv.index("--limit") + 1])

_spec = importlib.util.spec_from_file_location(
    "d5", r"D:\platform\derive_eli5.py")
d5 = importlib.util.module_from_spec(_spec)
sys.argv = ["x"]
_spec.loader.exec_module(d5)
sys.argv = sys.argv[:1] + [a for a in sys.argv[1:]]

_spec2 = importlib.util.spec_from_file_location(
    "dre", r"D:\platform\derive_remaining_examples.py")
dre = importlib.util.module_from_spec(_spec2)
sys.argv = ["x", "--dry"]
_spec2.loader.exec_module(dre)

MAX_DEF_CHARS = d5.MAX_DEF_CHARS
MAX_ELI5_CHARS = d5.MAX_ELI5_CHARS

_DEV_WORD_RE = dre._DEV_WORD_RE
_DEV_DIGIT_RE = re.compile(r"[\u0966-\u096F]")
_HI_FRAMING = frozenset("आसान शब्दों में आम गलती".split())

#: a list-number fragment tail is ": 1." / "; 2." (split artifact of a
#: leftover numbered fragment) -- NOT a trailing "Chapter 9." prose tail
_ORPHAN_LIST_END = re.compile(r"[:;]\s*\d{1,2}\.?\s*$")


def _prose_ratio_hi(sentence: str) -> float:
    """Unicode-aware prose ratio: Devanagari matras/vowel-signs are
    combining marks (category Mn), which str.isalnum() rejects -- count
    them as letters, exactly like derive_diagnostics counts a-z."""
    stripped = d5.MATH_SPAN_RE.sub("", sentence)
    if not stripped:
        return 0.0
    good = 0
    for ch in stripped:
        if ch.isalnum() or ch.isspace() or unicodedata.category(ch).startswith("M"):
            good += 1
    return good / max(1, len(stripped))


def _usable_sentence_hi(s: str) -> bool:
    if d5.MATH_SPAN_RE.search(s) or dre.dd.NODE_ID_RE.search(s) \
            or re.search(r"\]\(", s):
        return False
    return _prose_ratio_hi(s) >= 0.82


def guarded_sentences(text: str, min_len: int = 25):
    """Quote-aware, node-id-safe, meta-safe sentences of authored text."""
    out = []
    for s in dre.split_sentences_quote_aware(text or ""):
        if len(s) < min_len or dre._meta(s) or _ORPHAN_LIST_END.search(s):
            continue
        if dre.dd.NODE_ID_RE.search(s):        # never surface raw node ids
            continue
        if not _usable_sentence_hi(s):
            continue
        out.append(s)
    return out


def _dev_ratio(s: str) -> float:
    alpha = [c for c in s if c.isalpha()]
    if not alpha:
        return 0.0
    dev = [c for c in alpha if "\u0900" <= c <= "\u097F"]
    return len(dev) / len(alpha)


#: framing prefixes are whitelisted by construction -- stripped before the
#: word-level fidelity check so they can never merge with content tokens
_FRAME_PREFIXES = (
    "आसान शब्दों में:",
    "आम गलती:",
    "In simple words:",
    "Common mix-up:",
)
_DEV_TOKEN_RE = re.compile(r"[\u0900-\u097F]{2,}")


def verify_fidelity_hi(eli5: str, source_text: str):
    """derive_eli5.verify_fidelity + Devanagari word/digit tracing.
    Every Devanagari token (>=2 chars) of the derived text must occur in
    the source (punctuation/space-insensitive comparison -- the same
    zero-wrong guarantee, script-correct)."""
    bad = d5.verify_fidelity(eli5, source_text)
    body = eli5
    for p in _FRAME_PREFIXES:
        body = body.replace(p, " ")
    src_dev = re.sub(r"[^\u0900-\u097F]+", "", source_text)
    for m in _DEV_TOKEN_RE.finditer(body):
        w = m.group(0)
        if w in _HI_FRAMING:
            continue
        if w not in src_dev:
            bad.append("devanagari-word-not-in-source:" + w)
    src_compact = re.sub(r"[\s\u0964]+", "", source_text)
    for m in _DEV_DIGIT_RE.finditer(eli5):
        if m.group(0) not in src_compact:
            bad.append("devanagari-digit-not-in-source:" + m.group(0))
    return bad


def derive_eli5_hi(definition: str, misconception: str):
    dsents = guarded_sentences(definition, 25)
    if not dsents:
        return ""
    picked, used = [], 0
    for s in dsents[:2]:
        if used + len(s) + 1 <= MAX_DEF_CHARS or not picked:
            s2 = s
            for pat, rep in d5.SUBSTITUTIONS:
                s2 = pat.sub(rep, s2)
            picked.append(s2)
            used += len(s2) + 1
        else:
            break
        if used >= MAX_DEF_CHARS * 0.7:
            break
    if not picked:
        return ""
    part = " ".join(picked)
    if part and part[0].islower():
        part = part[0].upper() + part[1:]
    hindi = _dev_ratio(part) > 0.5
    lead = "आसान शब्दों में: " if hindi else "In simple words: "
    out = lead + part.rstrip("।.") + ("।" if hindi else ".")
    msents = [s for s in guarded_sentences(misconception, 25)
              if 30 <= len(s) <= 200]
    if msents:
        mix = msents[0]
        if len(out) + len(mix) + 18 <= MAX_ELI5_CHARS:
            mlead = " आम गलती: " if hindi else " Common mix-up: "
            out += mlead + mix.rstrip("।.") + ("।" if hindi else ".")
    if len(out) > MAX_ELI5_CHARS:
        out = out[:MAX_ELI5_CHARS].rsplit(" ", 1)[0].rstrip(",;:") + \
            ("।" if hindi else ".")
    return out


def main():
    idx = json.load(open(INDEX, encoding="utf-8"))
    hindi = [n for n in idx["nodes"]
             if str(n.get("subject", "")).lower().startswith("hin")
             and not str(n.get("node_id", "")).endswith("_comp")
             and n.get("kind") != "case_companion"]
    targets = hindi[:LIMIT] if LIMIT else hindi
    print("hindi teaching nodes: %d" % len(targets))

    zf = None if DRY else zipfile.ZipFile(BACKUP_ZIP, "a", zipfile.ZIP_DEFLATED)
    written = already = failed = empty = 0
    per_class = Counter()
    per_lang = Counter()
    failures = []
    for n in targets:
        path = os.path.join(MD, n["source_file"])
        if not os.path.isfile(path):
            failures.append((n["node_id"], "missing-md"))
            continue
        with open(path, encoding="utf-8-sig", errors="replace") as fh:
            text = fh.read()
        if "## ELI5" in text:
            already += 1
            continue
        dsec = d5._SEC("DEFINITION").search(text)
        msec = d5._SEC("COMMON_MISCONCEPTION").search(text)
        eli5 = derive_eli5_hi(dsec.group(1).strip() if dsec else "",
                              msec.group(1).strip() if msec else "")
        if not eli5:
            empty += 1
            failures.append((n["node_id"], "empty-derivation"))
            continue
        bad = verify_fidelity_hi(eli5, text)
        if bad:
            failed += 1
            failures.append((n["node_id"], ";".join(bad[:2])))
            continue
        written += 1
        per_class[n["class"]] += 1
        per_lang["hi" if _dev_ratio(eli5) > 0.5 else "en"] += 1
        if DRY:
            continue
        zf.writestr("hindi_eli5_backup/" + n["source_file"],
                    text.encode("utf-8"))
        section = "\n\n## ELI5\n" + eli5 + "\n"
        if "## DEFINITION" in text:
            new_text = text.replace("## DEFINITION", section.strip("\n") +
                                    "\n\n## DEFINITION", 1)
        else:
            new_text = text.rstrip("\n") + "\n\n" + section
        with open(path, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(new_text)
    if zf is not None:
        zf.close()
    print("mode=%s | written: %d | already: %d | empty: %d | fidelity-failed: %d"
          % ("DRY" if DRY else "WRITE", written, already, empty, failed))
    print("per-class:", dict(sorted(per_class.items())),
          "| per-language:", dict(per_lang))
    for f in failures[:10]:
        print("  fail:", f)


if __name__ == "__main__":
    main()
