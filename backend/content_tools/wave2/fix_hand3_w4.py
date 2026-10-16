"""Hand-fix the 3 delatex stragglers with exact string replacements + guard.

Guard: backup, verify each `before` occurs exactly once, verify post-state has
no LaTeX survivors in the touched section, log to delatex_manifest.jsonl.
"""
import json, os, re, shutil, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from delatex_w4 import split_sections, SURVIVOR_RE, DOLLAR_RE, _dollar_ok

CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
BACKUP = os.path.join(HERE, "backups_w4")

FIXES = {
    "c12_eco_cbse_14_003.md": [
        ("$$\\text{Total Value} = \\text{Quantity} \\times \\text{Price} = 2,000 \\times 50,000 = \\text{₹}10,00,00,000 \\text{ (₹10 crore)}$$",
         "Total Value = Quantity × Price = 2,000 × 50,000 = ₹10,00,00,000 (₹10 crore)"),
        ("$$\\text{Quota Quantity} = 1,200 \\text{ units}$$",
         "Quota Quantity = 1,200 units"),
        ("$$\\text{Maximum Import Value (at base price)} = 1,200 \\times 50,000 = \\text{₹}6,00,00,000 \\text{ (₹6 crore)}$$",
         "Maximum Import Value (at base price) = 1,200 × 50,000 = ₹6,00,00,000 (₹6 crore)"),
        ("* Tariff per unit = $20\\% \\text{ of } 50,000 = 0.20 \\times 50,000 = \\text{₹}10,000$.",
         "* Tariff per unit = 20% of 50,000 = 0.20 × 50,000 = ₹10,000."),
        ("* Total Tariff Revenue = $\\text{Quota Quantity} \\times \\text{Tariff per unit} = 1,200 \\times 10,000 = \\text{₹}1,20,00,000 \\text{ (₹1.2 crore)}$.",
         "* Total Tariff Revenue = Quota Quantity × Tariff per unit = 1,200 × 10,000 = ₹1,20,00,000 (₹1.2 crore)."),
        ("* Total import value post-quota (with tariff) paid by consumers = $1,200 \\times (50,000 + 10,000) = 1,200 \\times 60,000 = \\text{₹}7,20,00,000$.",
         "* Total import value post-quota (with tariff) paid by consumers = 1,200 × (50,000 + 10,000) = 1,200 × 60,000 = ₹7,20,00,000."),
    ],
    "c12_eco_cbse_15_001.md": [
        ("$$\\text{Import Cover} = \\frac{\\$1.1\\text{ Billion}}{\\$0.6\\text{ Billion/week}} = 1.83\\text{ weeks}$$",
         "Import Cover = $1.1 Billion ÷ $0.6 Billion per week = 1.83 weeks"),
        ("$$\\text{Weekly Import Bill} = \\frac{\\$5.0\\text{ Billion}}{4\\text{ weeks}} = \\$1.25\\text{ Billion per week}$$",
         "Weekly Import Bill = $5.0 Billion ÷ 4 weeks = $1.25 Billion per week"),
        ("$$\\text{Import Cover} = \\frac{\\text{Reserves}}{\\text{Weekly Import Bill}} = \\frac{\\$3.0\\text{ Billion}}{\\$1.25\\text{ Billion/week}} = 2.4\\text{ weeks}$$",
         "Import Cover = Reserves ÷ Weekly Import Bill = $3.0 Billion ÷ $1.25 Billion per week = 2.4 weeks"),
    ],
    "c12_math_cbse_06_003.md": [
        ('because this node covers the First Derivative Test',
         'because the failing test was the First Derivative Test'),
    ],
}

manifest = open(os.path.join(HERE, "delatex_manifest.jsonl"), "a", encoding="utf-8")
ok = fail = 0
for fn, fixes in FIXES.items():
    path = os.path.join(CORPUS, fn)
    text = open(path, encoding="utf-8").read()
    bak = os.path.join(BACKUP, fn)
    os.makedirs(os.path.dirname(bak), exist_ok=True)
    if not os.path.exists(bak):
        shutil.copy2(path, bak)
    new_text = text
    missed = [b for b, _ in fixes if new_text.count(b) != 1]
    if missed:
        print(f"FAIL {fn}: {len(missed)} before-strings not found exactly once")
        for b in missed:
            print("   MISSING:", b[:90])
        fail += 1
        continue
    for b, a in fixes:
        new_text = new_text.replace(b, a)
    # survivor check on the whole file prose
    pre, parts = split_sections(new_text)
    dirty_ok = True
    for h, name, body in parts:
        masked = DOLLAR_RE.sub(lambda mm: "" if not _dollar_ok(mm.group(1)) else "  ", body)
        if SURVIVOR_RE.search(masked) and (name in ("DEFINITION", "WALKTHROUGH", "ELI5", "COMMON_MISCONCEPTION")
                                           or name.startswith(("DIAGNOSTIC_", "WORKED_EXAMPLE_", "COMPETENCY_"))):
            print(f"FAIL {fn}: survivor remains in {name}")
            dirty_ok = False
    if not dirty_ok:
        fail += 1
        continue
    with open(path, "w", encoding="utf-8", newline="") as f:
        f.write(new_text)
    manifest.write(json.dumps({"file": fn, "edited": ["hand_fix"], "mode": "exact_replace"},
                              ensure_ascii=False) + "\n")
    ok += 1
manifest.close()
print(f"hand-fixed={ok} failed={fail}")
