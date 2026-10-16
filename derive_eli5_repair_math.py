"""Repair pass: regenerate ELI5 for nodes whose derived section kept raw
LaTeX/math spans (286 files).  Prefers the prose clause BEFORE the first
math span / colon -- extractive, no new facts -- then falls back to a math
sentence only when nothing cleaner exists.  Fidelity-verified like the main
pass; pre-repair state appended to the same backup zip."""
import io
import os
import re
import zipfile

import importlib.util
spec = importlib.util.spec_from_file_location(
    "d5", r"D:\platform\derive_eli5.py")
d5 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(d5)

MD = r"D:\platform\deploy\content\enhanced_nodes_md"
ZIP = r"D:\platform\backend\_archive\eli5_backups.zip"
MATH = re.compile(r"\\\(|\\\[|\$\$|\$")
SEC_RE = re.compile(r"^## ELI5\n(.*?)(?=^##|\Z)", re.M | re.S)

TRAILING_STOP = frozenset("""
if and or but where whereas with by the of to in for as that this which is
are be been was were a an its their his her when while on at from into
""".split())


def clause_before_math(sentence: str):
    flat = d5._clean(sentence)
    cut = MATH.split(flat, 1)[0]
    cut = cut.split(":")[0] if ":" in cut[:80] else cut
    cut = cut.strip(" ;:,.(-\u2013\u2014")
    words = cut.split()
    while words and words[-1].lower().strip(". nev") in TRAILING_STOP:
        words.pop()
    cut = " ".join(words).strip(" ;:,")
    return cut if len(cut) >= 25 else ""


def better_definition_part(definition: str) -> str:
    sents = d5._sentences(definition)
    prose = [s for s in sents
             if d5._prose_ratio(s) >= 0.82 and not MATH.search(s)]
    if prose:
        part = prose[0]
    else:
        part = ""
        for s in sents[:2]:
            cand = clause_before_math(s)
            if cand:
                part = cand
                break
        if not part and sents:
            part = sents[0]
    for pat, rep in d5.SUBSTITUTIONS:
        part = pat.sub(rep, part)
    return part


def derive(definition: str, misconception: str) -> str:
    part = better_definition_part(definition)
    if not part:
        return ""
    if part[0].islower():
        part = part[0].upper() + part[1:]
    out = "In simple words: " + part.rstrip(".") + "."
    mix = d5._misconception_part(misconception or "")
    if mix and len(out) + len(mix) + 18 <= d5.MAX_ELI5_CHARS:
        out += " Common mix-up: " + mix.rstrip(".") + "."
    if len(out) <= d5.MAX_ELI5_CHARS:
        return out
    return out[:d5.MAX_ELI5_CHARS].rsplit(" ", 1)[0].rstrip(",;:") + "."


def main():
    files = [l.strip() for l in open(r"D:\platform\_eli5_mathy.txt")
             if l.strip()]
    zf = zipfile.ZipFile(ZIP, "a", zipfile.ZIP_DEFLATED)
    fixed = kept = failed = 0
    samples = []
    for f in files:
        path = os.path.join(MD, f)
        with open(path, "r", encoding="utf-8-sig", errors="replace") as fh:
            text = fh.read()
        m = SEC_RE.search(text)
        if not m:
            continue
        old = m.group(1).strip()
        dsec = d5._SEC("DEFINITION").search(text)
        msec = d5._SEC("COMMON_MISCONCEPTION").search(text)
        definition = dsec.group(1).strip() if dsec else ""
        misconception = msec.group(1).strip() if msec else ""
        new = derive(definition, misconception)
        if not new:
            kept += 1
            continue
        bad = d5.verify_fidelity(new, text)
        if bad:
            failed += 1
            print("FAIL", f, bad[:2])
            continue
        if new == old:
            kept += 1
            continue
        zf.writestr("eli5_prewrite/" + f, text.encode("utf-8"))
        new_text = text[:m.start(1)] + new + "\n" + text[m.end(1):]
        with open(path, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(new_text)
        fixed += 1
        if len(samples) < 6:
            samples.append((f, new))
    zf.close()
    print(f"repaired: {fixed} | kept-as-was: {kept} | fidelity-failed: {failed}")
    for f, s in samples:
        print(" ", f, "->", s[:170])


if __name__ == "__main__":
    main()
