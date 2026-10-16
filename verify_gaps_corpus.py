"""verify_gaps_corpus.py -- GAPS pass final verification (verify_eli5_corpus
discipline extended to the Devanagari content).

Independently re-validates, corpus-wide:
  1. every ELI5 section on hin_* nodes against its own file with the
     Devanagari-aware fidelity verifier (derive_eli5_hindi);
  2. every ELI5 section on non-Hindi nodes with the original English
     verifier (derive_eli5) -- regression guard;
  3. every WORKED_EXAMPLE section with the diagnostics verifier (word/
     number fidelity, corpus-wide) plus a hard node-id check on the
     GAPS-derived examples; pre-existing AUTHORED examples may carry
     parenthesised internal refs -- the render layer scrubs those
     ([fixed-story1]) and rewriting authored content is out of remit;
  4. the 16 legacy c7 repaired files parse with NON-EMPTY bodies under the
     per-occurrence reader (the original defect read);
  5. no raw node-id token anywhere in any ELI5 body (eli5 is always a
     derived field -- zero tolerance there).
"""
import importlib.util
import os
import re
import sys
from collections import Counter

spec = importlib.util.spec_from_file_location(
    "dh", r"D:\platform\derive_eli5_hindi.py")
sys.argv = ["x", "--dry"]
dh = importlib.util.module_from_spec(spec)
spec.loader.exec_module(dh)
sys.argv = sys.argv[:1]

MD = dh.MD
enh = dh.dre.dd.enh
dd = dh.dre.dd

ELI5_RE = re.compile(r"^## ELI5\n(.*?)(?=^##|\Z)", re.M | re.S)
WE_RE = re.compile(r"^## WORKED_EXAMPLE_(\d+)\n(.*?)(?=^##|\Z)", re.M | re.S)
DQ_RE = re.compile(r"^## DIAGNOSTIC_QUESTION_(\d+)\n(.*?)(?=^##|\Z)", re.M | re.S)

eli5_hi = eli5_en = eli5_bad = we_cnt = we_bad = id_leak = 0
per_class = Counter()
bad_files = []
c7 = ["c7_bio_ch03_006", "c7_chem_ch02_011", "c7_civ_ch01_007",
      "c7_eco_ch01_007", "c7_eco_ch02_005", "c7_engl_ch01_008",
      "c7_engl_ch05_002", "c7_geo_ch01_003", "c7_hist_ch02_009",
      "c7_hist_ch06_005", "c7_hist_ch08_004", "c7_hist_ch08_009",
      "c7_math_ch09_009", "c7_math_ch10_002", "c7_math_ch15_006",
      "c7_physics_ch04_004"]

#: files whose WORKED_EXAMPLE sections were derived by THIS pass (hard
#: node-id rule); authored examples are verified for word/number fidelity
#: only (render layer scrubs their internal refs -- [fixed-story1])
GAPS_DERIVED_WE = {
    "c11_comp_cbse_86_003", "c11_gram_cbse_80_002", "c12_gram_cbse_82_001",
    "c6_gram_cbse_83_001", "c7_comp_cbse_85_002", "c8_comp_cbse_86_001",
    "c8_gram_cbse_82_002", "c9_gram_cbse_80_001", "c9_gram_cbse_80_002",
}

for f in sorted(os.listdir(MD)):
    if not f.endswith(".md"):
        continue
    stem = f[:-3]
    if stem.endswith(enh.COMP_SUFFIX):
        continue
    coords = enh.parse_filename(stem)
    if coords is None:
        continue
    path = os.path.join(MD, f)
    with open(path, encoding="utf-8-sig", errors="replace") as fh:
        text = fh.read()
    hin = str(coords["subject"]).lower().startswith("hin")

    m = ELI5_RE.search(text)
    if m:
        body = m.group(1).strip()
        if hin:
            eli5_hi += 1
            bad = dh.verify_fidelity_hi(body, text)
        else:
            eli5_en += 1
            bad = dh.d5.verify_fidelity(body, text)
        if dd.NODE_ID_RE.search(body):
            bad = list(bad) + ["node-id-in-eli5"]
            id_leak += 1
        if bad:
            eli5_bad += 1
            if len(bad_files) < 10:
                bad_files.append((f, bad[:2]))
        else:
            per_class[coords["class"]] += 1

    for n, body in WE_RE.findall(text):
        we_cnt += 1
        b = body.strip()
        bad = dd.verify_fidelity(b, text)
        if stem in GAPS_DERIVED_WE and dd.NODE_ID_RE.search(b):
            bad = list(bad) + ["node-id-in-derived-example"]
            id_leak += 1
        if bad:
            we_bad += 1
            if len(bad_files) < 10:
                bad_files.append((f, bad[:2]))

c7_bad = []
for st in c7:
    with open(os.path.join(MD, st + ".md"), encoding="utf-8-sig",
              errors="replace") as fh:
        text = fh.read()
    for n, body in DQ_RE.findall(text):
        if not body.strip():
            c7_bad.append((st, "DQ" + n))

print("ELI5 sections: hindi=%d non-hindi=%d | fidelity violations: %d"
      % (eli5_hi, eli5_en, eli5_bad))
print("  verified-good eli5 per class:", dict(sorted(per_class.items())))
print("WORKED_EXAMPLE sections scanned: %d | violations: %d" % (we_cnt, we_bad))
print("node-id leaks in eli5/examples: %d" % id_leak)
print("c7 repaired files with empty DQ bodies (must be none):", c7_bad)
print("BAD FILES:", bad_files[:5])
sys.exit(1 if (eli5_bad or we_bad or id_leak or c7_bad) else 0)
