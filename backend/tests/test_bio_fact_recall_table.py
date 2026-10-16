"""test_bio_fact_recall_table.py -- c11/c12 fact-anchor wave regression
(GOLDEN-BIO 2026-10-06).

Pins the NCERT_FACT_RECALL table contract:
  - data integrity: every entry compiles, has one canonical answer;
  - representative factual asks SOLVE with the anchored term;
  - why/explain forms of the SAME fact refuse (bare noun is not a
    reason answer -- the honest-refusal contract);
  - multi-part asks ("...and state the function") refuse (a single
    anchored fact would ship as a PARTIAL answer);
  - inline MCQ options ship a letter only on exactly-one match
    (exact match wins over substring: "Prophase I" vs "Prophase II").
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))
os.environ.setdefault("SOLVER_LLM_MODE", "off")

from backend.its.solver.biology_cognitive_engine import (  # noqa: E402
    NCERT_FACT_RECALL, BiologyCognitiveEngine)


def test_table_data_integrity():
    for i, fact in enumerate(NCERT_FACT_RECALL):
        re.compile(fact["pattern"])          # compiles
        for key in ("pattern", "label", "answer", "why", "ncert_ref"):
            assert fact.get(key), f"entry {i} missing {key}"
        assert re.search(r"Chapter \d+ \(", fact["ncert_ref"]), (
            f"entry {i} ncert_ref has no chapter: {fact['ncert_ref']}")


# (question, expected answer substring) -- one representative per lane:
# classification, physiology numbers, genetics, evolution, biotech.
FIRING = [
    ("Which is the basic unit of classification?", "Species"),
    ("Who proposed the five kingdom classification?", "Whittaker"),
    ("In which phylum is the water vascular system found?", "Echinodermata"),
    ("The arrangement of leaves on a stem is called:",
     "Phyllotaxy"),
    ("Which meristem is responsible for secondary growth in dicot "
     "stems?", "Lateral"),
    ("Who proposed the cell theory?", "Schleiden and Schwann"),
    ("The most abundant protein in the animal world is which "
     "protein?", "Collagen"),
    ("In which phase of the cell cycle does DNA replication "
     "occur?", "S phase"),
    ("How many daughter cells are produced at the end of "
     "meiosis?", "4"),
    ("During which stage does crossing over take place?",
     "Prophase I"),
    ("Where does the light reaction of photosynthesis take "
     "place?", "Thylakoid"),
    ("Which pigment is essential for photosynthesis?", "Chlorophyll a"),
    ("Which is the primary CO2 acceptor in C4 plants?", "PEP"),
    ("How many ATP and NADPH are used by the Calvin cycle?",
     "18 ATP and 12 NADPH"),
    ("What is the net gain of ATP in glycolysis?", "2"),
    ("What is the respiratory quotient (RQ) of glucose?", "1"),
    ("Where does the Krebs cycle take place?", "Mitochondrial matrix"),
    ("Which plant hormone promotes fruit ripening?", "Ethylene"),
    ("Which plant hormone is called the stress hormone?", "Abscisic acid"),
    ("What is the functional unit of the human kidney?", "Nephron"),
    ("Which hormone promotes water reabsorption in the collecting "
     "duct?", "ADH"),
    ("Which gland is called the master gland?", "Pituitary"),
    ("Which hormone lowers blood calcium level?", "Calcitonin"),
    ("Which is the pacemaker of the human heart?", "SA node"),
    ("Where does the exchange of gases occur in the lungs?", "Alveoli"),
    ("Which neurotransmitter is released at the neuromuscular "
     "junction?", "Acetylcholine"),
    ("Where does fertilisation occur in humans?", "Ampullary-isthmic"),
    ("Which hormone maintains pregnancy?", "Progesterone"),
    ("Who gave the chromosome theory of inheritance?", "Sutton and Boveri"),
    ("Who proposed the double helix model of DNA?", "Watson and Crick"),
    ("Which enzyme unwinds the DNA double helix during "
     "replication?", "Helicase"),
    ("Who proposed natural selection as the mechanism of "
     "evolution?", "Darwin"),
    ("What did the Miller-Urey experiment demonstrate?", "Amino acids"),
    ("Malaria is caused by which pathogen?", "Plasmodium"),
    ("Which cells does HIV primarily attack?", "Helper T-lymphocytes"),
    ("Who discovered penicillin?", "Fleming"),
    ("Which bacterium converts milk into curd?", "Lactobacillus"),
    ("Which microbes produce biogas?", "Methanogens"),
    ("Which enzyme cuts DNA at specific sequences?",
     "Restriction endonuclease"),
    ("Name the natural host of the Ti plasmid.", "Agrobacterium"),
    ("In which technique is Taq polymerase used?", "PCR"),
    ("Bt cotton is resistant to which pest?", "Bollworm"),
    ("From which bacterium are the cry genes isolated?",
     "Bacillus thuringiensis"),
    ("Who proposed the 10 percent law of energy transfer?", "Lindeman"),
    ("Animals that can tolerate only a narrow temperature range are "
     "called:", "Stenothermal"),
]


def test_firing_cases_solve():
    miss = []
    for q, want in FIRING:
        r = BiologyCognitiveEngine.evaluate_fact_recall(q)
        if r is None or not r.success:
            miss.append(f"REFUSED: {q}")
        elif want.lower() not in r.primary_answer.lower():
            miss.append(f"WRONG: {q} -> {r.primary_answer!r} "
                        f"(wanted {want!r})")
    assert not miss, f"{len(miss)}/{len(FIRING)} failed:\n" + "\n".join(miss)


def test_why_forms_refuse():
    for q in [
        "Why is chlorophyll a essential for photosynthesis?",
        "Explain the Calvin cycle.",
        "Why is the Krebs cycle called the citric acid cycle?",
        "Describe the mechanism of breathing.",
        "Explain how ADH promotes water reabsorption.",
        "How does crossing over take place?",
        "Compare mitosis and meiosis.",
    ]:
        r = BiologyCognitiveEngine.evaluate_fact_recall(q)
        assert r is None, f"why-form shipped a bare fact: {q} -> " \
                          f"{r.primary_answer!r}"


def test_multi_part_asks_refuse():
    for q in [
        "Name the genus of bacteria that converts milk into curd and "
        "state the key metabolic product.",
        "Name the four whorls of a flower and state their functions.",
        "Which hormone maintains pregnancy and state its source.",
        "Name the bacterium from which cry genes are isolated and "
        "state the form in which the toxin is produced.",
    ]:
        r = BiologyCognitiveEngine.evaluate_fact_recall(q)
        assert r is None, f"multi-part ask shipped a partial: {q} -> " \
                          f"{r.primary_answer!r}"


def test_option_letters_only_on_unambiguous_match():
    r = BiologyCognitiveEngine.evaluate_fact_recall(
        "During which stage does crossing over take place? "
        "(a) Prophase I (b) Prophase II (c) Metaphase I (d) Anaphase II")
    assert r is not None and r.primary_answer == "option (a) Prophase I", \
        f"exact-match option failed: {r and r.primary_answer!r}"
    # zero matches must refuse (engine and paper disagree)
    r = BiologyCognitiveEngine.evaluate_fact_recall(
        "Which is the pacemaker of the human heart? "
        "(a) AV node (b) Purkinje fibres (c) Bundle of His (d) Chordae")
    assert r is None, "engine shipped a fact absent from the options"
    # two substring matches must refuse (exact pass only fires on one)
    r = BiologyCognitiveEngine.evaluate_fact_recall(
        "During which stage does crossing over take place? "
        "(a) Prophase II (b) Prophase I (c) Prophase III (d) Anaphase")
    assert r is None or r.primary_answer == "option (b) Prophase I", (
        f"ambiguous paper resolved by guess: {r and r.primary_answer!r}")


def test_statement_copula_mcqs_convert():
    """Board MCQ stems are selection asks by construction: inline options
    satisfy the fact-ask requirement; the exactly-one-match rule still
    guards.  These are the curated c11/c12 shapes (2026-10-06)."""
    for q, want in [
        ("The primary CO2 acceptor in C4 plants is: (a) PEP (b) RuBP "
         "(c) OAA (d) PGA", "option (a) PEP"),
        ("The net gain of ATP in glycolysis from one glucose molecule "
         "is: (a) 2 (b) 4 (c) 6 (d) 8", "option (a) 2"),
        ("Endosperm in angiosperms is generally: (a) Triploid (b) Diploid "
         "(c) Haploid (d) Tetraploid", "option (a) Triploid"),
        ("The cell theory was proposed by: (a) Schleiden and Schwann "
         "(b) Hooke and Leeuwenhoek (c) Watson and Crick "
         "(d) Mendel and Darwin", "option (a) Schleiden and Schwann"),
        ("Crossing over takes place during: (a) Prophase I "
         "(b) Prophase II (c) Metaphase I (d) Anaphase II",
         "option (a) Prophase I"),
        ("Notochord is a characteristic feature of phylum: "
         "(a) Annelida (b) Chordata (c) Arthropoda (d) Mollusca",
         "option (b) Chordata"),
        ("Malaria is caused by: (a) Plasmodium (b) Virus (c) Bacteria "
         "(d) Fungus", "option (a) Plasmodium"),
        ("The 10 percent law of energy transfer was proposed by: "
         "(a) Lindeman (b) Odum (c) Tansley (d) Elton",
         "option (a) Lindeman"),
        ("Inbreeding depression can be overcome by: (a) Outcrossing "
         "(b) More inbreeding (c) Self-pollination (d) Isolation",
         "option (a) Outcrossing"),
        ("Superovulation in cattle is induced by hormones called: "
         "(a) FSH (b) Oxytocin (c) Insulin (d) Thyroxine",
         "option (a) FSH"),
        ("The red pigment found in Rhodophyta is: (a) chlorophyll a "
         "(b) r-phycoerythrin (c) fucoxanthin (d) chlorophyll d",
         "option (b) r-phycoerythrin"),
    ]:
        r = BiologyCognitiveEngine.evaluate_fact_recall(q)
        assert r is not None and r.success and r.primary_answer == want, (
            f"copula MCQ mis-fired: {q[:60]} -> "
            f"{r and r.primary_answer!r} (wanted {want!r})")


def test_pipeline_fact_recall_end_to_end():
    from backend.its.solver.answer_pipeline import answer
    r = answer("Which is the pacemaker of the human heart? "
               "(a) SA node (b) AV node (c) Purkinje fibres "
               "(d) Bundle of His")
    assert str(r.label or "").startswith("VERIFIED"), \
        f"pipeline lost the fact recall: {r.label}"
    assert "SA node" in str(r.answer or ""), \
        f"wrong option text: {r.answer!r}"


if __name__ == "__main__":
    fails = 0
    for name, fn in sorted(globals().items()):
        if name.startswith("test_") and callable(fn):
            try:
                fn()
                print(f"[PASS] {name}", flush=True)
            except AssertionError as e:
                fails += 1
                print(f"[FAIL] {name}: {e}", flush=True)
    print("ALL PASS" if not fails else f"{fails} FAIL")
    sys.exit(1 if fails else 0)
