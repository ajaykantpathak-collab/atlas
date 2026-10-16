"""
Node-vs-book grounding sample.

QUESTION
    The 12,356 files in D:\_KEEP\\enhanced_nodes_md carry DEFINITION,
    MASTERY_CRITERIA, SCOPE_BOUNDARY and DIAGNOSTIC blocks. They were almost
    certainly produced by the same LLM pipeline that generated the catalogue.
    Nobody has checked them against NCERT. So: are the definitions grounded
    in the textbook they claim to come from?

METHOD (no LLM, deterministic)
    For a sample of maths nodes:
      1. extract the DEFINITION block
      2. extract its DISTINCTIVE terms -- content words, proper nouns,
         named results and numerals, with stopwords and elementary
         vocabulary removed
      3. check each term against the class's own book files
    Report the term-grounding rate.

WHAT THIS DOES AND DOES NOT PROVE
    A term being present in the chapter shows the definition speaks the
    chapter's vocabulary -- necessary, NOT sufficient. A node can use all
    the right words and still assert something the book does not say. This
    is a floor on trustworthiness, not a correctness proof. A stronger check
    needs claim-level verification (entailment), which this is not.
"""
from __future__ import annotations

import collections
import pathlib
import re
import sys

NODES = pathlib.Path(r"D:\_KEEP\enhanced_nodes_md")
BOOKS = pathlib.Path(r"D:\_KEEP\text_cache_new")

# Class -> book code prefix, identified this session from chapter titles
# (hemh=Rational Numbers/squares/mensuration=cls 8, iemh=Coordinates=9,
#  jemh=Real Numbers/AP/Trigonometry=10, kemh=PnC/Calculus=11,
#  lemh=Integrals/3D Geometry=12).
CLASS_PREFIX = {8: "hemh", 9: "iemh", 10: "jemh", 11: "kemh", 12: "lemh"}

STOP = set("""a an the of in on at to for and or is are was were be been being
this that these those it its as by with from not no if then than so such can
may might will would shall should must each any all some more most other
which who whom whose what when where why how do does did done have has had
also into over under between among during through above below up down out
off again further then once here there when where why how both few nor only
own same too very just also about against because""".split())

DEFINITION_RE = re.compile(
    r"^##\s*DEFINITION\s*$(.*?)(?=^##\s|\Z)", re.S | re.I | re.M)
WORD_RE = re.compile(r"[A-Za-z][A-Za-z'\-]{3,}|\d+")


def class_of(node_stem: str):
    m = re.match(r"^c(\d+)_", node_stem)
    return int(m.group(1)) if m else None


def subject_of(node_stem: str):
    m = re.match(r"^c\d+_([a-z]+)", node_stem)
    return m.group(1) if m else None


def book_text(prefix: str) -> str:
    parts = []
    for f in sorted(BOOKS.glob(prefix + "*.txt")):
        try:
            parts.append(f.read_text(encoding="utf-8", errors="ignore"))
        except OSError:
            continue
    return "\n".join(parts).lower()


def definition_of(text: str) -> str:
    m = DEFINITION_RE.search(text)
    return " ".join(m.group(1).split()) if m else ""


def distinctive_terms(defn: str):
    """Content terms, numbers, and capitalised names. Deduped, order kept."""
    out = []
    for raw in WORD_RE.findall(defn):
        w = raw.lower().strip("'-")
        if not w or w in STOP:
            continue
        if raw[:1].isupper() or raw.isdigit() or len(w) > 5:
            out.append(w)
    seen, keep = set(), []
    for w in out:
        if w not in seen:
            seen.add(w)
            keep.append(w)
    return keep


def main(sample: int = 60) -> int:
    maths = [f for f in sorted(NODES.rglob("*.md"))
              if subject_of(f.stem) in ("math", "maths")]
    print("maths node files:", len(maths))
    by_class = collections.Counter(class_of(f.stem) for f in maths)
    print("by class:", dict(sorted(by_class.items())))

    caches = {}
    rows, fully, partly, ungrounded, no_def = [], 0, 0, 0, 0
    step = max(1, len(maths) // sample)
    picked = maths[::step][:sample]

    for f in picked:
        cls = class_of(f.stem)
        pref = CLASS_PREFIX.get(cls)
        if not pref:
            continue
        if pref not in caches:
            caches[pref] = book_text(pref)
        hay = caches[pref]
        try:
            text = f.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        defn = definition_of(text)
        if not defn:
            no_def += 1
            continue
        terms = distinctive_terms(defn)
        if not terms:
            no_def += 1
            continue
        hit = [t for t in terms if t in hay]
        miss = [t for t in terms if t not in hay]
        ratio = len(hit) / len(terms)
        rows.append((f.stem, cls, len(terms), ratio, miss[:6]))
        if ratio >= 0.85:
            fully += 1
        elif ratio >= 0.5:
            partly += 1
        else:
            ungrounded += 1

    n = len(rows)
    print()
    print("=" * 66)
    print("NODE DEFINITION -> BOOK GROUNDING SAMPLE")
    print("=" * 66)
    print("nodes sampled          :", n + no_def)
    print("no DEFINITION block    :", no_def)
    print("measurable             :", n)
    print()
    print("  fully grounded  (>=85%% of terms present) : %4d  (%5.1f%%)"
          % (fully, fully / max(1, n) * 100))
    print("  partly grounded  (50-85%%)                 : %4d  (%5.1f%%)"
          % (partly, partly / max(1, n) * 100))
    print("  weakly grounded   (<50%%)                 : %4d  (%5.1f%%)"
          % (ungrounded, ungrounded / max(1, n) * 100))
    print()
    print("weakest 12 (node, class, terms, ratio, missing terms):")
    for stem, cls, nt, ratio, miss in sorted(rows, key=lambda r: r[3])[:12]:
        print("  %-26s c%-3d %3d terms %4.0f%%  missing: %s"
              % (stem[:26], cls, nt, ratio * 100, ", ".join(miss)))
    return 0


if __name__ == "__main__":
    sys.exit(main(int(sys.argv[1]) if len(sys.argv) > 1 else 60))