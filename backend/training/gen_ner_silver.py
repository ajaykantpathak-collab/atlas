"""Generate silver-label NER training data for quantity/variable extraction.

V3 (2026-10-05, RETRY build): extends the V2 generator with the five
documented silver-label blind spots that made ner_model_v2 fail the
out-of-domain hand set (tests/test_variable_extractor.py xfails):

  1. FORCE UNITS   -- 'newtons' had 0 corpus occurrences; V3 tags
     newton/newtons/N/kilonewton(s)/kN (case-sensitive for symbols).
  2. PERCENT-OF BASE -- only 8 BASE examples in V2; the X%-of-Y regex
     now also matches 'X percent of Y' / 'X per cent of Y' and seeded
     template augmentation amplifies the frame ~1.8k docs.
  3. BARE COUNTS   -- V2 tagged only unit-adjacent numbers (by design).
     The serving contract (services/variable_extractor.py +
     its/solver/quantity_binder.py) NEVER falls back to the regex parser
     when the NER stage returns any values, and the binder tolerates
     phantom dimensionless values, so V3 tags bare numbers as VALUE
     (role 'dimensionless' downstream).  Split stays coherent.
  4. AREA/VOLUME COMPOUNDS -- 'square metres' etc. were unlabeled (the
     unit list only had m2); V3 tags 'square/cubic <unit>' compounds,
     sq/cu abbreviations and cm3/m3 superscripts as ONE UNIT span, which
     _UNIT_MAP canonizes (m2/m3/cm3/km2) or degrades to dimensionless.
  5. CURRENCY      -- 'Rs 5000' / 'INR 1,20,000' appeared 66x UNLABELED
     in V2 (the model learned to skip money!).  V3 tags the currency
     prefix (Rs/Rs./INR) as UNIT and the Indian-comma-group amount as
     VALUE; trailing 'rupees/paise' as UNIT.  Serving pairs these via
     _UNIT_MAP + the currency-adjacency glue, and _glue_values drops its
     scanner on any NER-owned span, so native tagging removes the
     double-ownership risk.

Labels are UNCHANGED in meaning: VALUE (numeric span), UNIT
(measurement), PERCENT (percent operand of X%-of-Y), BASE (whole
operand).  Roles are NOT entities -- derived at serving from the unit.

Sources -- NODE FILES ONLY (Postgres is DOWN; the v3-retry build drops
the board_questions bank stage entirely).  Everything is parsed straight
out of the canonical corpora .md files:

  1. DIAGNOSTIC_QUESTION_n sections  (enhanced_nodes_md + cisce_nodes_v2,
     every node file -- ~200k questions; the bank was node-derived too,
     so this restores the same distribution without the DB)
  2. _comp companion docs: ELI5 + DEFINITION sections, SEED_QUESTION
     SCENARIO bodies and '**Q:' sub-question lines (both corpora)
plus seeded rule-based template augmentation for the gap families.

Output: training/ner_corpus_v3.jsonl  {"text": str, "entities": [[s,e,label],...]}
"""

import json
import random
import re
from pathlib import Path

OUT = Path(r"D:\platform\deploy\backend\training\ner_corpus_v3.jsonl")

CORPORA = (r"D:\platform\deploy\content\enhanced_nodes_md",
           r"D:\platform\deploy\content\cisce_nodes_v2")
NEGATIVE_CAP = 12_000     # entity-free docs kept as precision anchors

AUG_PER_FAMILY = {
    "force": 900, "pct_of": 1800, "currency": 1800, "area": 1200,
    "flow": 700, "bare": 1800,
}

random.seed(20261005)

# ---------------------------------------------------------------------------
# V3 pattern library
# ---------------------------------------------------------------------------

# Indian + US comma groups, decimals.  Lookbehind keeps it out of words
# ('CO2', 'x2', '3.5' splitting) and out of the RIGHT half of dash/slash
# compounds ('36–38', '40,000/µL' -- the tokenizer keeps those as one
# token, so half-spans can never align); trailing-letter check in code
# skips algebraic coefficients ('2x') and ordinals ('10th').
_NUM_RE = re.compile(r"(?<![\w.,\u2013\u2014/\-:\u2011\u2248])(\d+(?:,\d{2,3})*(?:\.\d+)?)")

# number ranges ('36–38 ATP', 'weeks 2–4', '6-7 days') -> ONE VALUE span
# (en/em dash with optional spaces; ASCII hyphen only when glued to both
# numbers, so '5 - 3' subtraction and '12-hour' compounds stay out)
_RANGE_RE = re.compile(
    r"(?<![\w.,])(\d[\d,]*(?:\.\d+)?)"
    r"(?:\s*[\u2013\u2014]\s*|-(?=\d))"
    r"(\d[\d,]*(?:\.\d+)?)")

# '15% of 250' / '15 percent of 250' / '12 per cent of 4,000'
_PCT_OF_RE = re.compile(
    r"(\d+(?:\.\d+)?)\s*(?:%|percent(?:age)?|per\s+cent)\s+of\s+"
    r"(\d+(?:,\d{2,3})*(?:\.\d+)?)", re.I)

# currency prefix: symbol/symbol-word glued (<=2 spaces) to the amount
_CURRENCY_PREFIX_RE = re.compile(
    r"(?<![A-Za-z0-9])(\u20b9|Rs\.?|INR)(\s{0,2})(?=\d)", re.I)

# area/volume compounds, matched BEFORE plain units so 'square metres'
# is one span, not bare 'metres' (the V2 miss)
_COMPOUND_UNIT_RE = re.compile(
    r"(?:square|sq\.?|cubic|cu\.?)\s*"
    r"(?:kilomet(?:er|re)s?|met(?:er|re)s?|centimet(?:er|re)s?|"
    r"millimet(?:er|re)s?|feet|foot|inch(?:es)?|yards?|"
    r"m\b|km\b|cm\b|mm\b|ft\b)", re.I)

# spelled-out units (case-insensitive).  Additions vs V2: newtons,
# kilonewtons, rupees, paise, cubic-centimetre words, m3/cm3.
_WORD_UNIT_RE = re.compile(
    r"(?:km/h|kmph|km/hr|m/s|cm/s|km/s|"
    r"kilonewtons?|newtons?|"
    r"kilograms?|grams?|milligrams?|tonnes?|tons\b|"
    r"kilomet(?:er|re)s?|met(?:er|re)s?|centimet(?:er|re)s?|"
    r"millimet(?:er|re)s?|"
    r"seconds?|secs?|min(?:ute)?s?|hours?|hrs?|days?|weeks?|months?|years?|"
    r"percent(?:age)?|per\s+cent|degrees?(?:\s+celsius|\s+fahrenheit)?|"
    r"celsius|fahrenheit|kelvins?|"
    r"litres?|liters?|millilitres?|milliliters?|"
    r"rupees?|paise|"
    r"joules?|watts?|moles?|radians?|"
    r"crores?|lakhs?|dozens?|hundred|thousand|million|billion|"
    r"hectares?|"
    r"cm\u00b2|cm\u00b3|m\u00b2|m\u00b3|km\u00b2|\u00b0C|\u00b0F|\u00b0)"
    r"(?![a-zA-Z/])",
    re.I)

# case-sensitive symbol units (V2 had none of these except via typo luck;
# 'N' for newtons is the force gap).  '%' first: it is the only glued
# unit char that arrives with no space ('7.5%', '8%').
_SYMBOL_UNIT_RE = re.compile(
    r"(?:%|kN\b|N\b|kJ\b|J\b|kW\b|W\b|K\b|kPa\b|Pa\b|Hz\b|kHz\b|MHz\b|"
    r"cm2\b|cm3\b|m2\b|m3\b|km2\b|sq\s*m\b|sq\s*km\b|sq\s*cm\b|"
    r"cu\s*m\b|cu\s*cm\b|km/h\b|m/s\b|cm\b|mm\b|km\b|mL\b|ml\b|L\b|"
    r"kg\b|mg\b|g\b|min\b|hr\b)(?![/+])")

_AMT = r"\d+(?:,\d{2,3})*(?:\.\d+)?"

# node-file section extractors (compiled once -- scanned over ~24k files)
_DIAG_RE = re.compile(
    r"^## DIAGNOSTIC_QUESTION_\d+\s*\n(.+?)(?=^## |\Z)", re.S | re.M)
_SECTION_RE = {name: re.compile(
    rf"^## {name}\s*\n(.+?)(?=^## |\Z)", re.S | re.M)
    for name in ("ELI5", "DEFINITION")}
_SCENARIO_RE = re.compile(
    r"^### SCENARIO:\s*\n(.+?)(?=^### |\Z)", re.S | re.M)
_SUBQ_RE = re.compile(r"^\*\*Q:\*\*\s*(.+)$", re.M)


def _tag(entities, seen, start, end, label):
    if (start, end) in seen:
        return
    entities.append((start, end, label))
    seen.add((start, end))


def extract_quantity_spans(text: str) -> list:
    """Extract (start, end, label) entities for quantities in text.

    Priority: X%-of-Y frame > currency amounts > unit-adjacent numbers
    (compound units first) > bare numbers (V3).  Overlap-free by
    construction via seen-spans + final left-to-right dedup.
    """
    entities = []
    seen = set()

    # 0. dash ranges -> ONE VALUE span (token-aligned; halves would be
    #    unalignable and dropped at DocBin time)
    for m in _RANGE_RE.finditer(text):
        if m.end() < len(text) and text[m.end()] in "/:\u2011":
            continue                    # '150,000\u2013450,000/µL' -- skip
        _tag(entities, seen, m.start(), m.end(), "VALUE")

    # 1. X%-of-Y frames -> PERCENT + BASE
    for m in _PCT_OF_RE.finditer(text):
        _tag(entities, seen, m.start(1), m.end(1), "PERCENT")
        _tag(entities, seen, m.start(2), m.end(2), "BASE")

    # 2. currency prefixes -> UNIT(symbol) + VALUE(amount)
    for m in _CURRENCY_PREFIX_RE.finditer(text):
        sym_s = m.start(1)
        sym_e = m.start(1) + len(m.group(1))     # symbol only, no spaces
        am = re.match(_AMT, text[m.end():])
        if am:
            _tag(entities, seen, sym_s, sym_e, "UNIT")
            _tag(entities, seen, m.end(), m.end() + am.end(), "VALUE")

    # 3. unit-adjacent numbers -> VALUE + UNIT
    for m in _NUM_RE.finditer(text):
        ns, ne, num = m.start(1), m.end(1), m.group(1)
        if (ns, ne) in seen:
            continue
        if ne < len(text) and (text[ne].isalpha() or text[ne] in "\u2013\u2014:\u2011"):
            continue                    # '2x', '10th', '40,000/µL' -- skip
        rest = text[ne:]
        unit_m = None
        # whitespace gap (single) then compound unit first
        ws = re.match(r"^\s{1,3}", rest)
        gap = ws.group(0) if ws else ""
        if gap:
            cu = _COMPOUND_UNIT_RE.match(rest[len(gap):])
            if cu:
                unit_m = (ne + len(gap), ne + len(gap) + cu.end())
        if unit_m is None and gap:
            wu = _WORD_UNIT_RE.match(rest[len(gap):])
            if wu:
                unit_m = (ne + len(gap), ne + len(gap) + wu.end())
        if unit_m is None and gap:
            su = _SYMBOL_UNIT_RE.match(rest[len(gap):])
            if su:
                unit_m = (ne + len(gap), ne + len(gap) + su.end())
        if unit_m is None and not gap:
            # glued forms: '15%' / '250g' / 'm2' handled with zero gap
            su = _SYMBOL_UNIT_RE.match(rest)
            wu = _WORD_UNIT_RE.match(rest)        # e.g. '50percent' rare
            if su:
                unit_m = (ne, ne + su.end())
            elif wu:
                unit_m = (ne, ne + wu.end())
        _tag(entities, seen, ns, ne, "VALUE")
        if unit_m:
            _tag(entities, seen, unit_m[0], unit_m[1], "UNIT")

    # 4. bare numbers (V3): whatever is left is a plain VALUE
    for m in _NUM_RE.finditer(text):
        ns, ne = m.start(1), m.end(1)
        if (ns, ne) in seen:
            continue
        if ne < len(text) and (text[ne].isalpha() or text[ne] in "\u2013\u2014:\u2011"):
            continue                    # '2x', '10th', '40,000/µL' -- skip
        _tag(entities, seen, ns, ne, "VALUE")

    # Deduplicate overlapping spans (left-to-right, longest first)
    entities.sort(key=lambda e: (e[0], -e[1]))
    deduped = []
    last_end = 0
    for s, e, lab in entities:
        if s >= last_end:
            deduped.append((s, e, lab))
            last_end = e
    return deduped


# ---------------------------------------------------------------------------
# Seeded template augmentation for the five gap families
# ---------------------------------------------------------------------------

def _ri(lo, hi):
    return random.randint(lo, hi)


def _indian(n):
    """Format int with Indian comma groups: 120000 -> '1,20,000'."""
    s = str(n)
    if len(s) <= 3:
        return s
    head, tail = s[:-3], s[-3:]
    parts = []
    while len(head) > 2:
        parts.insert(0, head[-2:])
        head = head[:-2]
    if head:
        parts.insert(0, head)
    return ",".join(parts) + "," + tail


def _aug_docs():
    """Yield augmentation texts (labeled by the same rules as real text)."""
    texts = []

    def add(t):
        texts.append(t)

    # --- force ---
    for _ in range(AUG_PER_FAMILY["force"]):
        n = random.choice([_ri(2, 200), _ri(200, 9000), round(random.uniform(1, 90), 1)])
        n = int(n) if float(n).is_integer() else n
        t = random.choice([
            lambda: f"A force of {n} newtons acts on a wooden block kept on a table.",
            lambda: f"The worker pushes the cart with a steady force of {n} N along the platform.",
            lambda: f"A crane lifts a concrete slab by applying {n} newtons of upward force.",
            lambda: f"The rocket engine produces a thrust of {n} kilonewtons at full power.",
            lambda: f"Two teams pull the rope with {n} N of force in opposite directions.",
            lambda: f"The magnetic force acting on the wire is {n} newtons.",
            lambda: f"A crate stays at rest under an applied force of {n} newtons because friction balances it.",
            lambda: f"The spring balance reads {n} N when the stone is fully submerged.",
        ])
        add(t())

    # --- percent-of BASE frame ---
    for _ in range(AUG_PER_FAMILY["pct_of"]):
        x = random.choice([_ri(1, 99), round(random.uniform(1, 40), 1), _ri(5, 75)])
        y = random.choice([_ri(10, 999), _ri(1000, 99999), _ri(100000, 900000)])
        ys = _indian(y) if y >= 100000 and random.random() < 0.5 else str(y)
        t = random.choice([
            lambda: f"What is {x}% of {ys}?",
            lambda: f"Find {x} percent of {ys}.",
            lambda: f"Calculate {x}% of {ys} and round to the nearest whole number.",
            lambda: f"Solve this: {x}% of {ys} is what number?",
            lambda: f"In a survey, {x}% of {ys} people preferred tea over coffee.",
            lambda: f"A shop gives {x}% discount on every item priced at {ys}.",
            lambda: f"The school library found that {x} per cent of {ys} books need rebinding.",
            lambda: f"Out of the total collection, {x}% of {ys} votes were counted invalid.",
        ])
        add(t())

    # --- currency ---
    for _ in range(AUG_PER_FAMILY["currency"]):
        amt = random.choice([_ri(50, 9999), _ri(10000, 999999), _ri(1000000, 25000000)])
        style = random.random()
        if style < 0.4:
            a = _indian(amt) if amt >= 100000 else f"{amt:,}" if amt >= 10000 else str(amt)
        elif style < 0.7:
            a = _indian(amt)
        else:
            a = str(amt)
        t = random.choice([
            lambda: f"Meera pays Rs {a} for a school bag and lunch box.",
            lambda: f"A refurbished cycle costs Rs {a} in that shop.",
            lambda: f"The museum ticket costs \u20b9{a} per adult visitor.",
            lambda: f"He donated INR {a} to the village rainwater fund.",
            lambda: f"The fixed deposit grows to Rs {a} after three years.",
            lambda: f"A badminton racket is listed at Rs. {a} on the store site.",
            lambda: f"The contractor quoted Rs {a} for repairing the community hall roof.",
            lambda: f"A notebook costs {random.choice([_ri(20, 90), _ri(100, 900)])} rupees and a pen set costs {random.choice([_ri(50, 250)])} rupees.",
            lambda: f"The shopkeeper returned {random.choice([_ri(25, 95)])} paise as change after the purchase.",
        ])
        add(t())

    # --- area / volume compounds ---
    for _ in range(AUG_PER_FAMILY["area"]):
        n = random.choice([_ri(2, 999), round(random.uniform(1, 50), 1), _ri(1000, 90000)])
        n = int(n) if float(n).is_integer() else n
        t = random.choice([
            lambda: f"The hall's floor area is {n} square metres.",
            lambda: f"A durry covers an area of {n} square feet in the courtyard.",
            lambda: f"The wildlife reserve spreads over {n} square kilometres of forest.",
            lambda: f"The storage box has a volume of {n} cubic centimetres.",
            lambda: f"The overhead tank can hold {n} cubic metres of water.",
            lambda: f"Each tile on the wall measures {n} cm\u00b2.",
            lambda: f"The district map shows the lake covering {n} sq km.",
            lambda: f"The painted wall area is {n} m\u00b2 in total.",
            lambda: f"The cylinder's volume works out to {n} cm\u00b3.",
            lambda: f"A plot of {n} square metres was fenced with wire mesh.",
        ])
        add(t())

    # --- flow compounds ---
    for _ in range(AUG_PER_FAMILY["flow"]):
        n = random.choice([_ri(2, 60), round(random.uniform(0.5, 20), 1), _ri(100, 5000)])
        n = int(n) if float(n).is_integer() else n
        t = random.choice([
            lambda: f"The garden tap releases {n} litres per minute.",
            lambda: f"The pump delivers {n} litres of water per hour to the field.",
            lambda: f"The IV drip releases {n} mL of medicine per minute.",
            lambda: f"Water flows at {n} litres per second through the main pipeline.",
            lambda: f"The exhaust fan cycle moves {n} cubic metres of air per minute.",
        ])
        add(t())

    # --- bare counts ---
    for _ in range(AUG_PER_FAMILY["bare"]):
        a, b = _ri(2, 95), 0
        b = max(a + _ri(1, 60), random.choice([100, 80, 50, 150, 200]))
        t = random.choice([
            lambda: f"Sunil answered {a} questions correctly out of {b} in the geometry test.",
            lambda: f"In a class of {b} students, {a} students volunteered for the science fair.",
            lambda: f"Rita scored {a} marks out of {b} in the unit test.",
            lambda: f"The stall sold {a} books out of the {b} it had stocked for the fair.",
            lambda: f"A team won {a} matches out of {b} played this season.",
            lambda: f"The library added {random.choice([_ri(20, 900)])} new titles this month.",
            lambda: f"Of the {b} saplings planted, {a} survived the dry summer.",
        ])
        add(t())

    return texts


# ---------------------------------------------------------------------------
# Source loaders -- NODE FILES ONLY (no Postgres anywhere)
# ---------------------------------------------------------------------------

def node_file_texts() -> tuple:
    """Single pass over both corpora .md trees.

    Every file (node + _comp): DIAGNOSTIC_QUESTION_n sections.
    _comp files additionally: ELI5/DEFINITION, SCENARIO bodies and
    '**Q:' sub-question lines (SEED_QUESTION worked steps are skipped --
    computation soup like '12/30-12/30=0' is label noise, not prose).
    """
    diags, comp = [], []
    n_files = 0
    for base in CORPORA:
        for f in Path(base).glob("*.md"):
            n_files += 1
            try:
                txt = f.read_text(encoding="utf-8", errors="replace")
            except OSError:
                continue
            for m in _DIAG_RE.finditer(txt):
                q = " ".join(m.group(1).split())
                if len(q) > 20:
                    diags.append(q)
            if "_comp" not in f.name:
                continue
            for rx in _SECTION_RE.values():
                seg = rx.search(txt)
                if seg:
                    body = " ".join(seg.group(1).split())
                    if len(body) > 40:
                        comp.append(body[:600])
            for m in _SCENARIO_RE.finditer(txt):
                body = " ".join(m.group(1).split())
                if len(body) > 40:
                    comp.append(body[:800])
            for m in _SUBQ_RE.finditer(txt):
                q = " ".join(m.group(1).split())
                if len(q) > 20:
                    comp.append(q)
    print(f"files scanned: {n_files:,}", flush=True)
    return diags, comp


def _pairable_units(ents):
    """Drop UNIT spans no quantity span can pair with at serving
    (currency-prefix order UNIT->VALUE or trailing VALUE->UNIT, <=3
    char gap) -- lone UNIT supervision teaches phantom emissions."""
    nums = [(s, e) for s, e, l in ents if l != "UNIT"]
    kept = []
    for s, e, l in ents:
        if l != "UNIT":
            kept.append((s, e, l))
            continue
        for ns, ne in nums:
            if 0 <= ns - e <= 3 or 0 <= s - ne <= 3:
                kept.append((s, e, l))
                break
    return kept


def _align_filter(nlp, text, ents, stats):
    """Keep only token-aligned spans (strict char_span == the DocBin
    contract) so the JSONL contains exactly what training uses."""
    doc = nlp.make_doc(text)
    out = []
    for s, e, l in ents:
        sp = doc.char_span(s, e, label=l, alignment_mode="strict")
        if sp is not None and (sp.start_char, sp.end_char) == (s, e):
            out.append((s, e, l))
        else:
            stats[0] += 1
    return _pairable_units(out)


def main():
    texts = []
    print("scanning node files (diagnostics + comp docs)...", flush=True)
    diag, comp = node_file_texts()
    print(f"node diagnostics: {len(diag):,}", flush=True)
    print(f"comp sections/questions: {len(comp):,}", flush=True)
    texts.extend(diag)
    texts.extend(comp)
    aug = _aug_docs()
    print(f"augmentation templates: {len(aug):,}", flush=True)
    texts.extend(aug)

    # exact-text dedup (diagnostics repeat across sibling nodes)
    seen_texts = set()
    uniq = []
    for t in texts:
        t = " ".join(t.split())
        if len(t) < 12 or t in seen_texts:
            continue
        seen_texts.add(t)
        uniq.append(t)
    print(f"unique texts: {len(uniq):,}", flush=True)

    import spacy
    _nlp = spacy.blank("en")
    stats = [0]                   # misaligned tags dropped
    n_pos = n_neg = n_neg_kept = 0
    neg_buf = []
    with open(OUT, "w", encoding="utf-8") as f:
        for text in uniq:
            ents = extract_quantity_spans(text)
            if ents:
                ents = _align_filter(_nlp, text, ents, stats)
            if ents:
                f.write(json.dumps({
                    "text": text,
                    "entities": [[s, e, l] for s, e, l in ents],
                }, ensure_ascii=False) + "\n")
                n_pos += 1
            else:
                n_neg += 1
                neg_buf.append(text)
    random.shuffle(neg_buf)
    with open(OUT, "a", encoding="utf-8") as f:
        for text in neg_buf[:NEGATIVE_CAP]:
            f.write(json.dumps({"text": text, "entities": []},
                               ensure_ascii=False) + "\n")
            n_neg_kept += 1
    print(f"silver NER corpus v3 (node-files-only): {n_pos:,} labeled + "
          f"{n_neg_kept:,} negative docs ({n_neg:,} available) -> {OUT}")
    print(f"token-alignment: {stats[0]:,} misaligned tags dropped at source")


if __name__ == "__main__":
    main()
