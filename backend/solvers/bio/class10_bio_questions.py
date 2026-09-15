"""
Class 10 Biology - Question Generator
3 Nodes: Chromosome Structure, Cell Cycle, Mitosis
ICSE Syllabus | Seeded Randomization | Deterministic Output
"""
import random
import json
import hashlib
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Optional, Tuple
from enum import Enum

# ──────────────────────────────────────────────
# ──────────────────────────────────────────────
class NodeID(Enum):
    CHROMOSOME = "c10_bio_001"
    CELL_CYCLE = "c10_bio_002"
    MITOSIS    = "c10_bio_003"

class Difficulty(Enum):
    EASY   = "Easy"
    MEDIUM = "Medium"

class QType(Enum):
    FILL_BLANK   = "Fill in the Blank"
    MCQ          = "Multiple Choice"
    TRUE_FALSE   = "True / False"
    MATCHING     = "Matching"
    SHORT_ANSWER = "Short Answer"
    SEQUENCE     = "Sequence / Ordering"
    DIFFERENCE   = "Difference / Comparison"
    LABEL_DIAGRAM = "Label the Diagram"

@dataclass
class Question:
    node_id: str
    node_label: str
    q_type: str
    difficulty: str
    competency: str
    question_text: str
    options: Optional[List[str]] = None
    correct_answer: str = ""
    explanation: str = ""
    marks: int = 1
    subtopic: str = ""

# ──────────────────────────────────────────────
# ──────────────────────────────────────────────
class SeededRNG:
    """Deterministic RNG from a seed string."""
    def __init__(self, seed: str):
        h = hashlib.sha256(seed.encode()).hexdigest()
        self._rng = random.Random(h)

    def shuffle(self, seq):
        s = list(seq)
        self._rng.shuffle(s)
        return s

    def choice(self, seq):
        return self._rng.choice(seq)

    def randint(self, lo, hi):
        return self._rng.randint(lo, hi)

    def sample(self, pop, k):
        return self._rng.sample(pop, k)

# ──────────────────────────────────────────────
# ──────────────────────────────────────────────
class BioQuestionBank:
    """All question templates organised by node."""

    # ── NODE 001: Chromosome Structure ──────────
    N001_FILL = [
        {
            "text": "The uncoiled, thread-like form of genetic material present in the "
                    "non-dividing nucleus is called ________.",
            "answer": "chromatin",
            "expl": "Chromatin is the loosely coiled DNA-protein complex visible in "
                    "the interphase nucleus. During cell division it condenses into "
                    "visible chromosomes.",
            "marks": 1
        },
        {
            "text": "Each of the two identical halves of a replicated chromosome is "
                    "called a ________.",
            "answer": "chromatid",
            "expl": "After DNA replication, each chromosome consists of two identical "
                    "sister chromatids joined at the centromere.",
            "marks": 1
        },
        {
            "text": "The point where two chromatids are joined on a chromosome is "
                    "called the ________.",
            "answer": "centromere",
            "expl": "The centromere (primary constriction) is the attachment point "
                    "between sister chromatids and is also where spindle fibres attach "
                    "during cell division.",
            "marks": 1
        },
        {
            "text": "A ________ is a segment of DNA that codes for a specific protein "
                    "or trait and is the unit of heredity.",
            "answer": "gene",
            "expl": "Genes are functional units of DNA located on chromosomes. Each "
                    "gene carries the instructions for making one protein.",
            "marks": 1
        },
        {
            "text": "The full form of DNA is ________.",
            "answer": "deoxyribonucleic acid",
            "expl": "DNA (deoxyribonucleic acid) is the hereditary material that "
                    "carries genetic information from one generation to the next.",
            "marks": 1
        },
        {
            "text": "The structure of DNA is described as a ________ helix.",
            "answer": "double",
            "expl": "DNA has a double-helix structure discovered by Watson and Crick "
                    "(1953). Two polynucleotide strands twist around each other.",
            "marks": 1
        },
        {
            "text": "The four nitrogenous bases in DNA are adenine, thymine, guanine "
                    "and ________.",
            "answer": "cytosine",
            "expl": "In DNA, adenine pairs with thymine (A-T) and guanine pairs with "
                    "cytosine (G-C). These are complementary base pairs.",
            "marks": 1
        },
        {
            "text": "The sugar present in the nucleotide of DNA is called ________.",
            "answer": "deoxyribose",
            "expl": "Each DNA nucleotide consists of a phosphate group, deoxyribose "
                    "sugar, and one nitrogenous base.",
            "marks": 1
        },
        {
            "text": "Chromatin condenses into visible ________ during cell division.",
            "answer": "chromosomes",
            "expl": "During prophase of mitosis, chromatin fibres coil and condense "
                    "into thick, rod-shaped chromosomes that can be seen under a "
                    "light microscope.",
            "marks": 1
        },
        {
            "text": "Histone proteins help ________ DNA into nucleosomes.",
            "answer": "package / coil",
            "expl": "DNA wraps around histone proteins to form nucleosomes, the "
                    "fundamental unit of chromatin packaging.",
            "marks": 1
        },
    ]

    N001_MCQ = [
        {
            "text": "Which of the following is NOT a component of a nucleotide?",
            "options": ["Phosphate group", "Ribose sugar", "Nitrogenous base",
                        "Deoxyribose sugar"],
            "answer": "Ribose sugar",
            "expl": "DNA nucleotides contain deoxyribose sugar. Ribose sugar is "
                     "found in RNA nucleotides, not DNA.",
            "marks": 1
        },
        {
            "text": "Chromatin is best described as:",
            "options": ["Tightly coiled chromosome in a dividing cell",
                        "Loosely coiled thread-like DNA in a non-dividing nucleus",
                        "A pair of identical chromatids",
                        "The primary constriction of a chromosome"],
            "answer": "Loosely coiled thread-like DNA in a non-dividing nucleus",
            "expl": "Chromatin is the extended, less condensed form of DNA present "
                     "in the nucleus during interphase (non-dividing stage).",
            "marks": 1
        },
        {
            "text": "The centromere of a chromosome is the site where:",
            "options": ["Replication begins",
                        "Two sister chromatids are joined together",
                        "DNA transcription occurs",
                        "Ribosomes are synthesised"],
            "answer": "Two sister chromatids are joined together",
            "expl": "The centromere is the primary constriction that holds the two "
                     "identical sister chromatids together.",
            "marks": 1
        },
        {
            "text": "Which base pairs with adenine (A) in DNA?",
            "options": ["Guanine", "Cytosine", "Thymine", "Uracil"],
            "answer": "Thymine",
            "expl": "In DNA, Chargaff's rule states: A pairs with T, and G pairs "
                     "with C. Uracil is found in RNA, not DNA.",
            "marks": 1
        },
        {
            "text": "The correct sequence showing the relationship between "
                    "genetic structures from smallest to largest is:",
            "options": ["DNA → Gene → Chromosome",
                        "Gene → DNA → Chromosome",
                        "Chromosome → DNA → Gene",
                        "Gene → Chromosome → DNA"],
            "answer": "DNA → Gene → Chromosome",
            "expl": "Nucleotides form DNA; a segment of DNA that codes for a "
                     "specific trait is a gene; genes are arranged linearly on "
                     "chromosomes.",
            "marks": 1
        },
        {
            "text": "A gene is best defined as:",
            "options": ["A complete chromosome",
                        "A segment of DNA that codes for a specific protein/trait",
                        "The entire DNA content of a cell",
                        "The point where chromatids join"],
            "answer": "A segment of DNA that codes for a specific protein/trait",
            "expl": "A gene is the hereditary unit — a specific segment of DNA "
                     "that carries the code for producing a particular protein.",
            "marks": 1
        },
        {
            "text": "After DNA replication, each chromosome consists of:",
            "options": ["One chromatid", "Two sister chromatids",
                        "Four chromatids", "No chromatids"],
            "answer": "Two sister chromatids",
            "expl": "During S phase, DNA replicates so each chromosome has two "
                     "identical sister chromatids joined at the centromere.",
            "marks": 1
        },
        {
            "text": "The structure of DNA was discovered by:",
            "options": ["Gregor Mendel", "Watson and Crick",
                        "Charles Darwin", "Robert Hooke"],
            "answer": "Watson and Crick",
            "expl": "James Watson and Francis Crick (1953) proposed the double "
                     "helix model of DNA based on Rosalind Franklin's X-ray "
                     "diffraction data.",
            "marks": 1
        },
    ]

    N001_TF = [
        ("Chromatin and chromosome are two different forms of the same genetic "
         "material.", True,
         "Chromatin is the uncoiled form (interphase); the same material coils "
         "into a chromosome during cell division."),
        ("A chromatid and a chromosome are the same structure.", False,
         "Before replication, one structure is a single chromosome. After "
         "replication, it has two sister chromatids — each half is called a "
         "chromatid."),
        ("A gene is made up of DNA.", True,
         "Genes are specific segments of the long DNA molecule. DNA is the "
         "chemical substance; genes are functional units within it."),
        ("DNA contains the sugar ribose.", False,
         "DNA contains deoxyribose sugar. RNA (not DNA) contains ribose."),
        ("The centromere is the site of DNA replication.", False,
         "The centromere joins sister chromatids. DNA replication occurs along "
         "the entire chromosome during S phase."),
        ("Adenine pairs with guanine in DNA.", False,
         "In DNA, adenine pairs with thymine (A=T). Guanine pairs with "
         "cytosine (G≡C)."),
        ("Chromosomes are visible in the nucleus during interphase.", False,
         "During interphase, DNA exists as chromatin (uncoiled, invisible as "
         "distinct bodies). Chromosomes condense and become visible during "
         "prophase."),
    ]

    N001_MATCHING_PAIRS = {
        "terms": ["Chromatin", "Chromatid", "Centromere", "Gene", "DNA"],
        "defs": [
            "Segment of DNA coding for a specific trait",
            "Double helix molecule carrying genetic code",
            "Point joining two sister chromatids",
            "Loosely coiled DNA in non-dividing nucleus",
            "One half of a replicated chromosome"
        ],
        "answer_map": {
            "Chromatin": "Loosely coiled DNA in non-dividing nucleus",
            "Chromatid": "One half of a replicated chromosome",
            "Centromere": "Point joining two sister chromatids",
            "Gene": "Segment of DNA coding for a specific trait",
            "DNA": "Double helix molecule carrying genetic code",
        }
    }

    # ── NODE 002: Cell Cycle ─────────────────────
    N002_FILL = [
        {
            "text": "The longest phase of the cell cycle is ________.",
            "answer": "interphase",
            "expl": "Interphase occupies about 90-95% of the total cell cycle "
                    "duration. It is the phase of growth and preparation for "
                    "division.",
            "marks": 1
        },
        {
            "text": "During ________ phase, the cell grows in size and synthesises "
                    "proteins and organelles.",
            "answer": "G1",
            "expl": "G1 (Gap 1) is the first gap phase where the cell increases in "
                    "size, produces RNA and proteins, and duplicates organelles.",
            "marks": 1
        },
        {
            "text": "DNA replication (doubling) occurs during ________ phase.",
            "answer": "S",
            "expl": "S (Synthesis) phase is when the entire DNA content of the "
                    "cell is replicated, doubling from 2n to 4n.",
            "marks": 1
        },
        {
            "text": "The phase where DNA content doubles from 2n to 4n is the "
                    "________ phase.",
            "answer": "S",
            "expl": "During S phase each chromosome replicates to produce two "
                    "sister chromatids, effectively doubling the DNA content.",
            "marks": 1
        },
        {
            "text": "The phase preceding mitosis where the cell prepares energy "
                    "and synthesises spindle proteins is ________.",
            "answer": "G2",
            "expl": "G2 (Gap 2) is a short phase where the cell checks DNA "
                    "replication, stores energy (ATP), and synthesises tubulin "
                    "for spindle fibres.",
            "marks": 1
        },
        {
            "text": "The actual cell division (mitosis + cytokinesis) occurs "
                    "during the ________ phase.",
            "answer": "M / mitotic",
            "expl": "The M (Mitotic) phase includes mitosis (nuclear division) "
                    "followed by cytokinesis (division of cytoplasm).",
            "marks": 1
        },
        {
            "text": "Division of the cytoplasm after mitosis is called "
                    "________.",
            "answer": "cytokinesis",
            "expl": "Cytokinesis physically splits the cytoplasm into two "
                    "daughter cells. In animal cells it occurs by cleavage "
                    "furrow; in plant cells by cell plate formation.",
            "marks": 1
        },
        {
            "text": "The correct sequence of interphase sub-phases is: "
                    "________ → ________ → ________.",
            "answer": "G1, S, G2",
            "expl": "Interphase follows G1 → S → G2 in that order. G1 for growth, "
                    "S for DNA synthesis, G2 for pre-division preparation.",
            "marks": 1
        },
        {
            "text": "If a cell has 8 pg DNA in G1 phase, it will have ________ "
                    "pg DNA after S phase.",
            "answer": "16",
            "expl": "During S phase DNA replicates, so the amount doubles. "
                    "8 pg × 2 = 16 pg.",
            "marks": 1
        },
        {
            "text": "The cell produced at the end of the cell cycle is called "
                    "the ________ cell.",
            "answer": "daughter",
            "expl": "The original dividing cell is the parent cell. After mitosis "
                    "and cytokinesis, two genetically identical daughter cells "
                    "are produced.",
            "marks": 1
        },
    ]

    N002_MCQ = [
        {
            "text": "Which phase of interphase is the longest?",
            "options": ["G1 phase", "S phase", "G2 phase",
                        "All phases are equal"],
            "answer": "G1 phase",
            "expl": "G1 phase is typically the longest (several hours to days). "
                     "S phase is moderate; G2 is the shortest.",
            "marks": 1
        },
        {
            "text": "During which phase does DNA replication occur?",
            "options": ["G1 phase", "S phase", "G2 phase", "M phase"],
            "answer": "S phase",
            "expl": "S (Synthesis) phase is dedicated to DNA replication, "
                     "doubling the chromosome number from 2n to 4n (in terms "
                     "of chromatids).",
            "marks": 1
        },
        {
            "text": "What happens to the DNA content of a cell during S phase?",
            "options": ["Remains the same (2n)",
                        "Doubles (from 2n to 4n)",
                        "Halves (from 4n to 2n)",
                        "Doubles (from n to 2n)"],
            "answer": "Doubles (from 2n to 4n)",
            "expl": "During S phase each chromosome replicates. The number of "
                     "chromatids per chromosome doubles, doubling total DNA.",
            "marks": 1
        },
        {
            "text": "Which phase of interphase involves preparation for cell "
                    "division, including synthesis of spindle proteins?",
            "options": ["G1 phase", "S phase", "G2 phase", "G0 phase"],
            "answer": "G2 phase",
            "expl": "G2 (Gap 2) is the pre-division checkpoint where the cell "
                     "verifies DNA replication and synthesises proteins needed "
                     "for mitosis.",
            "marks": 1
        },
        {
            "text": "Interphase occupies approximately what percentage of the "
                    "total cell cycle?",
            "options": ["10%", "50%", "75%", "90-95%"],
            "answer": "90-95%",
            "expl": "Interphase is by far the longest part of the cell cycle. "
                     "The mitotic phase is typically brief (a few hours vs. "
                     "days for interphase).",
            "marks": 1
        },
        {
            "text": "Cytokinesis in animal cells is accomplished by:",
            "options": ["Cell plate formation",
                        "Cleavage furrow formation",
                        "Chromosome condensation",
                        "Spindle fibre elongation"],
            "answer": "Cleavage furrow formation",
            "expl": "In animal cells, a contractile ring of actin and myosin "
                     "pinches the cell into two (cleavage furrow). Plant cells "
                     "form a cell plate.",
            "marks": 1
        },
        {
            "text": "Which of the following sequences correctly represents the "
                    "order of events in the cell cycle?",
            "options": ["S → G1 → G2 → M",
                        "G1 → S → G2 → M",
                        "G1 → G2 → S → M",
                        "M → G1 → S → G2"],
            "answer": "G1 → S → G2 → M",
            "expl": "The correct order is: G1 (growth) → S (DNA synthesis) → "
                     "G2 (preparation) → M (mitosis/division).",
            "marks": 1
        },
        {
            "text": "A cell that has temporarily stopped dividing and is not "
                    "actively preparing for division is said to be in:",
            "options": ["G1 phase", "G0 phase", "S phase", "G2 phase"],
            "answer": "G0 phase",
            "expl": "G0 is a quiescent state where cells exit the active cell "
                     "cycle. Neurons and muscle cells are typically in G0.",
            "marks": 1
        },
    ]

    N002_TF = [
        ("Interphase is the shortest phase of the cell cycle.", False,
         "Interphase is the longest (90-95% of the cycle). The mitotic phase "
         "is the shortest."),
        ("DNA content remains unchanged during S phase.", False,
         "DNA content doubles during S phase (2n → 4n) because each chromosome "
         "is replicated."),
        ("Mitosis and cytokinesis together constitute the M phase.", True,
         "M phase includes mitosis (nuclear division) followed by cytokinesis "
         "(cytoplasmic division)."),
        ("G2 phase occurs before S phase in the cell cycle.", False,
         "The order is G1 → S → G2. G2 is the phase that comes AFTER S phase."),
        ("A cell in G1 phase has unreplicated chromosomes.", True,
         "In G1, chromosomes consist of a single chromatid (unreplicated). "
         "Replication happens in S phase."),
        ("The M phase includes both mitosis and interphase.", False,
         "Interphase and M phase are two distinct, separate phases of the "
         "cell cycle."),
    ]

    N002_SEQUENCE = [
        {
            "text": "Arrange the following events of interphase in the correct "
                    "order:\n(A) DNA replication\n(B) Cell growth and protein "
                    "synthesis\n(C) Preparation for division, energy storage",
            "answer": ["B", "A", "C"],
            "labels": {"A": "S phase", "B": "G1 phase", "C": "G2 phase"},
            "expl": "G1 (B) → S (A) → G2 (C). Growth first, then DNA "
                    "replication, then preparation for division.",
            "marks": 2
        },
        {
            "text": "Arrange the cell cycle phases in correct order:\n"
                    "(A) Mitotic phase\n(B) G2 phase\n(C) G1 phase\n(D) S phase",
            "answer": ["C", "D", "B", "A"],
            "labels": {"A": "M phase", "B": "G2 phase",
                       "C": "G1 phase", "D": "S phase"},
            "expl": "Full cell cycle order: G1 (C) → S (D) → G2 (B) → M (A).",
            "marks": 2
        },
    ]

    N002_SHORT_ANSWER = [
        {
            "text": "Explain what happens to the DNA content of a cell during "
                    "S phase. Use the notation 2n and 4n in your answer.",
            "answer": ("During S phase, DNA replication occurs. Each chromosome "
                       "duplicates, producing two sister chromatids. The DNA "
                       "content therefore doubles — from 2n (unreplicated) to "
                       "4n (replicated). The chromosome number stays the same "
                       "but each chromosome now has two chromatids."),
            "expl": "Key points: (1) DNA replication, (2) Doubling of DNA "
                    "content 2n→4n, (3) Chromosome number unchanged.",
            "marks": 3
        },
        {
            "text": "Differentiate between G1 and G2 phases of interphase.",
            "answer": ("G1 phase: Cell grows in size, synthesises proteins and "
                       "organelles, and prepares for DNA replication. G2 phase: "
                       "Cell checks DNA replication is complete, stores energy "
                       "(ATP), synthesises spindle proteins in preparation for "
                       "mitosis. G1 comes before S phase; G2 comes after S "
                       "phase."),
            "expl": "G1 = preparation for replication; G2 = preparation for "
                    "division. Position in the cycle is the key difference.",
            "marks": 3
        },
        {
            "text": "Why is interphase considered the most important phase of "
                    "the cell cycle?",
            "answer": ("Interphase is the longest phase (90-95%) and is when "
                       "the cell grows, replicates its DNA, and prepares for "
                       "division. Without interphase the cell would not have "
                       "enough energy, organelles, or replicated DNA to divide "
                       "successfully."),
            "expl": "Interphase is the 'preparation' phase — all materials "
                    "needed for division are made here.",
            "marks": 3
        },
    ]

    # ── NODE 003: Mitosis ───────────────────────
    MITOSIS_STAGES = [
        {
            "stage": "Prophase",
            "order": 1,
            "chromatin": "Chromatin condenses into visible chromosomes (each with "
                         "two sister chromatids)",
            "nuclear_membrane": "Nuclear membrane begins to dissolve",
            "nucleolus": "Nucleolus disappears",
            "centrioles": "Centrioles move to opposite poles; spindle fibres form "
                          "(animal cells only)",
            "key": "First phase — chromosomes become visible"
        },
        {
            "stage": "Metaphase",
            "order": 2,
            "chromatin": "Chromosomes line up at the equator (metaphase plate)",
            "nuclear_membrane": "Completely absent",
            "nucleolus": "Absent",
            "centrioles": "Spindle fibres attach to centromeres of each "
                          "chromosome",
            "key": "Chromosomes align at the equator"
        },
        {
            "stage": "Anaphase",
            "order": 3,
            "chromatin": "Sister chromatids separate at the centromere and move "
                         "to opposite poles",
            "nuclear_membrane": "Absent",
            "nucleolus": "Absent",
            "centrioles": "Spindle fibres shorten, pulling chromatids apart",
            "key": "Chromatids separate and move to poles"
        },
        {
            "stage": "Telophase",
            "order": 4,
            "chromatin": "Chromosomes reach poles and begin to uncoil back into "
                         "chromatin",
            "nuclear_membrane": "Nuclear membrane reforms around each set of "
                                "chromosomes",
            "nucleolus": "Nucleolus reappears",
            "centrioles": "Spindle fibres disappear",
            "key": "Nuclear envelope reforms; division nearly complete"
        },
    ]

    N003_FILL = [
        {
            "text": "During ________, chromatin condenses into visible chromosomes.",
            "answer": "prophase",
            "expl": "Prophase is the first stage of mitosis where chromatin "
                    "fibres coil and thicken into visible chromosomes.",
            "marks": 1
        },
        {
            "text": "In ________, chromosomes line up at the equator of the cell.",
            "answer": "metaphase",
            "expl": "During metaphase, all chromosomes align along the "
                    "metaphase plate (equatorial plane).",
            "marks": 1
        },
        {
            "text": "Sister chromatids separate and move to opposite poles "
                    "during ________.",
            "answer": "anaphase",
            "expl": "Anaphase is the shortest but most dramatic stage — the "
                    "centromere splits and chromatids are pulled to opposite poles.",
            "marks": 1
        },
        {
            "text": "The nuclear membrane reforms during ________.",
            "answer": "telophase",
            "expl": "In telophase, chromosomes reach opposite poles, begin "
                    "uncoiling, and nuclear envelopes form around each set.",
            "marks": 1
        },
        {
            "text": "The first and longest stage of mitosis is ________.",
            "answer": "prophase",
            "expl": "Prophase is typically the longest stage as chromatin must "
                    "fully condense and the spindle apparatus must form.",
            "marks": 1
        },
        {
            "text": "The shortest stage of mitosis is ________.",
            "answer": "anaphase",
            "expl": "Anaphase is the briefest stage — once chromatids separate, "
                    "they are quickly pulled to opposite poles.",
            "marks": 1
        },
        {
            "text": "During metaphase, chromosomes align at the ________.",
            "answer": "equator / metaphase plate",
            "expl": "The metaphase plate is the imaginary plane equidistant "
                    "from the two poles where chromosomes align.",
            "marks": 1
        },
        {
            "text": "The plane at which chromosomes align during metaphase is "
                    "called the ________.",
            "answer": "metaphase plate / equator",
            "expl": "The metaphase plate is the central plane of the cell where "
                    "chromosomes line up during metaphase.",
            "marks": 1
        },
        {
            "text": "In plant cells, cytokinesis occurs by formation of a "
                    "________.",
            "answer": "cell plate",
            "expl": "Plant cells build a cell plate from vesicles at the centre "
                    "that grows outward to divide the cell.",
            "marks": 1
        },
        {
            "text": "In animal cells, cytokinesis occurs by formation of a "
                    "________.",
            "answer": "cleavage furrow",
            "expl": "In animal cells, a contractile ring pinches the cell into "
                    "two via a cleavage furrow.",
            "marks": 1
        },
    ]

    N003_MCQ = [
        {
            "text": "During which stage of mitosis do chromosomes become "
                    "visible under a light microscope?",
            "options": ["Interphase", "Prophase", "Metaphase", "Telophase"],
            "answer": "Prophase",
            "expl": "In prophase, chromatin condenses into thick, rod-shaped "
                     "chromosomes that become visible under a light microscope.",
            "marks": 1
        },
        {
            "text": "In which stage do sister chromatids separate?",
            "options": ["Prophase", "Metaphase", "Anaphase", "Telophase"],
            "answer": "Anaphase",
            "expl": "In anaphase the centromere splits and the spindle fibres "
                     "pull the sister chromatids toward opposite poles.",
            "marks": 1
        },
        {
            "text": "The nuclear membrane reappears during:",
            "options": ["Prophase", "Metaphase", "Anaphase", "Telophase"],
            "answer": "Telophase",
            "expl": "In telophase, nuclear envelopes reform around the two sets "
                     "of chromosomes at each pole.",
            "marks": 1
        },
        {
            "text": "Chromosomes align at the equator during:",
            "options": ["Prophase", "Metaphase", "Anaphase", "Telophase"],
            "answer": "Metaphase",
            "expl": "In metaphase, all chromosomes align at the metaphase plate "
                     "(equatorial plane) with spindle fibres attached to "
                     "centromeres.",
            "marks": 1
        },
        {
            "text": "Which is the shortest stage of mitosis?",
            "options": ["Prophase", "Metaphase", "Anaphase", "Telophase"],
            "answer": "Anaphase",
            "expl": "Anaphase is the briefest stage — chromatids separate and "
                     "are pulled apart rapidly.",
            "marks": 1
        },
        {
            "text": "During which stage does the nucleolus disappear?",
            "options": ["Prophase", "Metaphase", "Anaphase", "Telophase"],
            "answer": "Prophase",
            "expl": "The nucleolus disappears during prophase as the nuclear "
                     "membrane begins to break down.",
            "marks": 1
        },
        {
            "text": "In plant cells, cytokinesis involves:",
            "options": ["Cleavage furrow formation",
                        "Cell plate formation",
                        "Spindle fibre elongation",
                        "Nuclear membrane dissolution"],
            "answer": "Cell plate formation",
            "expl": "Plant cells cannot form a cleavage furrow due to the rigid "
                     "cell wall. Instead, vesicles fuse at the centre to form a "
                     "cell plate.",
            "marks": 1
        },
        {
            "text": "Which structure is NOT present in plant cells during mitosis?",
            "options": ["Cell wall", "Spindle fibres", "Centrioles",
                        "Chromosomes"],
            "answer": "Centrioles",
            "expl": "Higher plants lack centrioles. The spindle apparatus forms "
                     "without centrioles in plant cells.",
            "marks": 1
        },
        {
            "text": "At the end of mitosis, each daughter cell has:",
            "options": ["Twice the chromosomes of the parent cell",
                        "Half the chromosomes of the parent cell",
                        "The same number of chromosomes as the parent cell",
                        "No chromosomes"],
            "answer": "The same number of chromosomes as the parent cell",
            "expl": "Mitosis produces two daughter cells genetically identical "
                     "to the parent cell — same chromosome number (2n).",
            "marks": 1
        },
        {
            "text": "Which stage of mitosis is followed by cytokinesis?",
            "options": ["Prophase", "Metaphase", "Anaphase", "Telophase"],
            "answer": "Telophase",
            "expl": "Telophase is the last stage of mitosis. After telophase, "
                     "cytokinesis divides the cytoplasm to complete cell division.",
            "marks": 1
        },
    ]

    N003_TF = [
        ("Chromosomes are visible during interphase.", False,
         "Chromosomes are visible only during mitosis. In interphase, DNA "
         "exists as chromatin (uncoiled)."),
        ("In metaphase, chromosomes align at the equator of the cell.", True,
         "The metaphase plate (equator) is where all chromosomes line up "
         "during metaphase."),
        ("Anaphase is the longest stage of mitosis.", False,
         "Anaphase is the shortest stage. Prophase is typically the longest."),
        ("The nuclear membrane reforms during telophase.", True,
         "In telophase, the nuclear envelope reforms around each set of "
         "chromosomes at the poles."),
        ("Mitosis produces four daughter cells from one parent cell.", False,
         "Mitosis produces TWO daughter cells. Meiosis (not in this syllabus "
         "yet) produces four."),
        ("Plant cells form a cell plate during cytokinesis.", True,
         "Plant cells build a cell plate from vesicles that grows outward "
         "to divide the cytoplasm."),
        ("Centrioles are present in higher plant cells.", False,
         "Higher plants lack centrioles. The spindle forms without them."),
    ]

    N003_STAGE_DESC = [
        {
            "text": "Identify the stage of mitosis described:\n"
                    "'Chromatin condenses into visible chromosomes; the nuclear "
                    "membrane begins to dissolve; spindle fibres start forming "
                    "from centrioles.'",
            "answer": "Prophase",
            "expl": "These are the defining features of prophase — chromosome "
                    "condensation, nuclear membrane breakdown, spindle formation.",
            "marks": 1
        },
        {
            "text": "Identify the stage of mitosis described:\n"
                    "'All chromosomes are aligned at the equator; spindle fibres "
                    "are attached to the centromere of each chromosome.'",
            "answer": "Metaphase",
            "expl": "Chromosomes aligned at the equator with spindle attachment "
                    "is the hallmark of metaphase.",
            "marks": 1
        },
        {
            "text": "Identify the stage of mitosis described:\n"
                    "'Sister chromatids separate at the centromere and move "
                    "toward opposite poles of the cell.'",
            "answer": "Anaphase",
            "expl": "Separation of sister chromatids and their movement to "
                    "opposite poles defines anaphase.",
            "marks": 1
        },
        {
            "text": "Identify the stage of mitosis described:\n"
                    "'Chromosomes reach opposite poles and begin to uncoil; "
                    "nuclear membrane and nucleolus reappear.'",
            "answer": "Telophase",
            "expl": "Chromosomes reaching poles and nuclear reformation are "
                    "features of telophase.",
            "marks": 1
        },
    ]

    N003_DIFF = [
        {
            "text": "Give TWO differences between cytokinesis in animal cells "
                    "and plant cells.",
            "answer": ("1. Animal cells: cleavage furrow forms from contractile "
                       "ring of actin and myosin, pinching the cell. Plant cells: "
                       "cell plate forms from vesicles at the centre.\n"
                       "2. Animal cells have no cell wall so the membrane can "
                       "pinch in. Plant cells have a rigid cell wall and cannot "
                       "form a furrow."),
            "expl": "Key differences: mechanism (furrow vs cell plate) and "
                    "reason (no wall vs rigid wall).",
            "marks": 3
        },
        {
            "text": "Give THREE differences between prophase and telophase.",
            "answer": ("1. Chromosomes: Prophase — chromatin condenses into "
                       "visible chromosomes. Telophase — chromosomes uncoil back "
                       "into chromatin.\n"
                       "2. Nuclear membrane: Prophase — dissolves. Telophase — "
                       "reforms.\n"
                       "3. Nucleolus: Prophase — disappears. Telophase — "
                       "reappears."),
            "expl": "Prophase and telophase are essentially opposite stages — "
                    "one breaks down, the other rebuilds.",
            "marks": 3
        },
    ]

# ──────────────────────────────────────────────
# ──────────────────────────────────────────────
class BioQuestionGenerator:
    """Generates seeded question papers for Class 10 Biology."""

    NODE_LABELS = {
        "c10_bio_001": "Chromosome Structure",
        "c10_bio_002": "Cell Cycle (Interphase & Mitotic Phase)",
        "c10_bio_003": "Mitosis (Stages in Plant & Animal Cells)",
    }

    COMPETENCY_MAP = {
        "c10_bio_001": "Board",
        "c10_bio_002": "Board",
        "c10_bio_003": "Board",
    }

    def __init__(self, seed: str = "default"):
        self.rng = SeededRNG(seed)
        self.bank = BioQuestionBank()
        self._id_counter = 0

    def _next_id(self, prefix: str) -> str:
        self._id_counter += 1
        return f"{prefix}_Q{self._id_counter:03d}"

    # ── helpers ────────────────────────────────
    def _make_questions(self, templates, node_id, node_label,
                        q_type, competency="Board", difficulty="Easy",
                        subtopic="") -> List[Question]:
        qs = []
        selected = self.rng.sample(templates, len(templates))
        for t in selected:
            q = Question(
                node_id=node_id,
                node_label=node_label,
                q_type=q_type,
                difficulty=difficulty,
                competency=competency,
                question_text=t["text"],
                options=t.get("options"),
                correct_answer=t["answer"],
                explanation=t.get("expl", ""),
                marks=t.get("marks", 1),
                subtopic=subtopic,
            )
            qs.append(q)
        return qs

    # ── public generators ──────────────────────
    def generate_chromosome_structure(self, num_questions: int = 12) -> List[Question]:
        """Node 001 — Chromosome Structure."""
        nid, label = "c10_bio_001", self.NODE_LABELS["c10_bio_001"]
        comp = self.COMPETENCY_MAP["c10_bio_001"]
        all_q: List[Question] = []

        fb = self._make_questions(
            self.rng.sample(self.bank.N001_FILL, min(5, len(self.bank.N001_FILL))),
            nid, label, QType.FILL_BLANK.value, comp, "Easy", "chromosome parts"
        )
        all_q.extend(fb)

        mcq = self._make_questions(
            self.rng.sample(self.bank.N001_MCQ, min(5, len(self.bank.N001_MCQ))),
            nid, label, QType.MCQ.value, comp, "Easy", "DNA & genes"
        )
        all_q.extend(mcq)

        tf_templates = self.rng.sample(self.bank.N001_TF,
                                       min(4, len(self.bank.N001_TF)))
        tf = []
        for stmt, ans, expl in tf_templates:
            tf.append(Question(
                node_id=nid, node_label=label,
                q_type=QType.TRUE_FALSE.value, difficulty="Easy",
                competency=comp,
                question_text=stmt,
                options=["True", "False"],
                correct_answer="True" if ans else "False",
                explanation=expl, marks=1, subtopic="chromosome basics"
            ))
        all_q.extend(tf)

        for i, q in enumerate(all_q):
            q._gen_id = self._next_id("C10_BIO_001")
        return all_q[:num_questions]

    def generate_cell_cycle(self, num_questions: int = 12) -> List[Question]:
        """Node 002 — Cell Cycle."""
        nid, label = "c10_bio_002", self.NODE_LABELS["c10_bio_002"]
        comp = self.COMPETENCY_MAP["c10_bio_002"]
        all_q: List[Question] = []

        fb = self._make_questions(
            self.rng.sample(self.bank.N002_FILL, min(5, len(self.bank.N002_FILL))),
            nid, label, QType.FILL_BLANK.value, comp, "Medium", "cell cycle phases"
        )
        all_q.extend(fb)

        mcq = self._make_questions(
            self.rng.sample(self.bank.N002_MCQ, min(4, len(self.bank.N002_MCQ))),
            nid, label, QType.MCQ.value, comp, "Medium", "DNA replication & phases"
        )
        all_q.extend(mcq)

        tf_templates = self.rng.sample(self.bank.N002_TF,
                                       min(3, len(self.bank.N002_TF)))
        for stmt, ans, expl in tf_templates:
            all_q.append(Question(
                node_id=nid, node_label=label,
                q_type=QType.TRUE_FALSE.value, difficulty="Medium",
                competency=comp,
                question_text=stmt, options=["True", "False"],
                correct_answer="True" if ans else "False",
                explanation=expl, marks=1, subtopic="cell cycle phases"
            ))

        seq_templates = self.rng.sample(self.bank.N002_SEQUENCE,
                                        len(self.bank.N002_SEQUENCE))
        for st in seq_templates:
            shuffled_labels = self.rng.shuffle(list(st["labels"].keys()))
            opts = [f"({k}) {st['labels'][k]}" for k in shuffled_labels]
            all_q.append(Question(
                node_id=nid, node_label=label,
                q_type=QType.SEQUENCE.value, difficulty="Medium",
                competency=comp,
                question_text=st["text"], options=opts,
                correct_answer=str(st["answer"]),
                explanation=st["expl"], marks=2,
                subtopic="cell cycle order"
            ))

        for i, q in enumerate(all_q):
            q._gen_id = self._next_id("C10_BIO_002")
        return all_q[:num_questions]

    def generate_mitosis(self, num_questions: int = 14) -> List[Question]:
        """Node 003 — Mitosis Stages."""
        nid, label = "c10_bio_003", self.NODE_LABEL["c10_bio_003"]
        comp = self.COMPETENCY_MAP["c10_bio_003"]
        all_q: List[Question] = []

        fb = self._make_questions(
            self.rng.sample(self.bank.N003_FILL, min(5, len(self.bank.N003_FILL))),
            nid, label, QType.FILL_BLANK.value, comp, "Medium", "mitosis stages"
        )
        all_q.extend(fb)

        mcq = self._make_questions(
            self.rng.sample(self.bank.N003_MCQ, min(5, len(self.bank.N003_MCQ))),
            nid, label, QType.MCQ.value, comp, "Medium", "stage identification"
        )
        all_q.extend(mcq)

        tf_templates = self.rng.sample(self.bank.N003_TF,
                                       min(3, len(self.bank.N003_TF)))
        for stmt, ans, expl in tf_templates:
            all_q.append(Question(
                node_id=nid, node_label=label,
                q_type=QType.TRUE_FALSE.value, difficulty="Medium",
                competency=comp,
                question_text=stmt, options=["True", "False"],
                correct_answer="True" if ans else "False",
                explanation=expl, marks=1, subtopic="mitosis features"
            ))

        stage_templates = self.rng.sample(self.bank.N003_STAGE_DESC,
                                          len(self.bank.N003_STAGE_DESC))
        for st in stage_templates:
            stage_opts = self.rng.shuffle(["Prophase", "Metaphase",
                                           "Anaphase", "Telophase"])
            all_q.append(Question(
                node_id=nid, node_label=label,
                q_type=QType.MCQ.value, difficulty="Medium",
                competency=comp,
                question_text=st["text"], options=stage_opts,
                correct_answer=st["answer"],
                explanation=st["expl"], marks=1,
                subtopic="stage identification"
            ))

        diff_templates = self.rng.sample(self.bank.N003_DIFF,
                                         len(self.bank.N003_DIFF))
        for dt in diff_templates:
            all_q.append(Question(
                node_id=nid, node_label=label,
                q_type=QType.DIFFERENCE.value, difficulty="Medium",
                competency=comp,
                question_text=dt["text"],
                correct_answer=dt["answer"],
                explanation=dt["expl"], marks=3,
                subtopic="plant vs animal mitosis"
            ))

        for i, q in enumerate(all_q):
            q._gen_id = self._next_id("C10_BIO_003")
        return all_q[:num_questions]

    def generate_paper(self, seed: str = None,
                       per_node: Dict[str, int] = None) -> Dict:
        """
        Generate a complete question paper across all 3 nodes.
        Returns a JSON-serialisable dict.
        """
        if seed:
            self.rng = SeededRNG(seed)
            self._id_counter = 0

        per_node = per_node or {
            "c10_bio_001": 10,
            "c10_bio_002": 10,
            "c10_bio_003": 14,
        }

        paper = {
            "subject": "Biology",
            "class": "10",
            "board": "ICSE",
            "seed": seed or "default",
            "sections": []
        }

        generators = [
            ("Section 1: Basic Biology — Chromosome Structure",
             self.generate_chromosome_structure, per_node["c10_bio_001"]),
            ("Section 1: Basic Biology — Cell Cycle",
             self.generate_cell_cycle, per_node["c10_bio_002"]),
            ("Section 1: Basic Biology — Mitosis",
             self.generate_mitosis, per_node["c10_bio_003"]),
        ]

        total_marks = 0
        for sec_title, gen_fn, count in generators:
            questions = gen_fn(count)
            sec_marks = sum(q.marks for q in questions)
            total_marks += sec_marks

            type_breakdown = {}
            for q in questions:
                type_breakdown[q.q_type] = type_breakdown.get(q.q_type, 0) + 1

            paper["sections"].append({
                "section_title": sec_title,
                "node_id": questions[0].node_id if questions else "",
                "node_label": questions[0].node_label if questions else "",
                "total_questions": len(questions),
                "total_marks": sec_marks,
                "type_breakdown": type_breakdown,
                "questions": [
                    {
                        "id": q._gen_id,
                        "type": q.q_type,
                        "difficulty": q.difficulty,
                        "marks": q.marks,
                        "question": q.question_text,
                        "options": q.options,
                        "correct_answer": q.correct_answer,
                        "explanation": q.explanation,
                    }
                    for q in questions
                ]
            })

        paper["total_marks"] = total_marks
        paper["total_questions"] = sum(
            s["total_questions"] for s in paper["sections"]
        )
        return paper

    def export_json(self, paper: Dict, filepath: str) -> None:
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(paper, f, indent=2, ensure_ascii=False)

    def export_quiz_only(self, paper: Dict, filepath: str) -> None:
        """Export questions without answers (student version)."""
        quiz = {
            "subject": paper["subject"],
            "class": paper["class"],
            "board": paper["board"],
            "seed": paper["seed"],
            "total_marks": paper["total_marks"],
            "total_questions": paper["total_questions"],
            "sections": []
        }
        for sec in paper["sections"]:
            quiz_sec = {
                "section_title": sec["section_title"],
                "node_label": sec["node_label"],
                "total_marks": sec["total_marks"],
                "questions": [
                    {
                        "id": q["id"],
                        "type": q["type"],
                        "difficulty": q["difficulty"],
                        "marks": q["marks"],
                        "question": q["question"],
                        "options": q["options"],
                    }
                    for q in sec["questions"]
                ]
            }
            quiz["sections"].append(quiz_sec)
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(quiz, f, indent=2, ensure_ascii=False)

    def export_answer_key(self, paper: Dict, filepath: str) -> None:
        """Export answer key only (teacher version)."""
        key = {
            "subject": paper["subject"],
            "class": paper["class"],
            "seed": paper["seed"],
            "total_marks": paper["total_marks"],
            "sections": []
        }
        for sec in paper["sections"]:
            key_sec = {
                "section_title": sec["section_title"],
                "node_label": sec["node_label"],
                "total_marks": sec["total_marks"],
                "answers": [
                    {
                        "id": q["id"],
                        "type": q["type"],
                        "marks": q["marks"],
                        "correct_answer": q["correct_answer"],
                        "explanation": q["explanation"],
                    }
                    for q in sec["questions"]
                ]
            }
            key["sections"].append(key_sec)
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(key, f, indent=2, ensure_ascii=False)