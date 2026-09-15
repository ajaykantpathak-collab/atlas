import hashlib
import textwrap
import math
import random
from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Dict, List, Optional, Tuple
from collections import OrderedDict


# ─────────────────────────────────────────────────────────────
# seeded random wrapper
# ─────────────────────────────────────────────────────────────
class SRandom:
    """Deterministic PRNG backed by a seed string (SHA-256)."""

    def __init__(self, seed: str) -> None:
        h = hashlib.sha256(seed.encode()).hexdigest()
        self._rng = random.Random(int(h[:16], 16))

    def randint(self, lo: int, hi: int) -> int:
        return self._rng.randint(lo, hi)

    def choice(self, seq: list) -> Any:
        return self._rng.choice(seq)

    def shuffle(self, seq: list) -> None:
        self._rng.shuffle(seq)

    def sample(self, pop: list, k: int) -> list:
        return self._rng.sample(pop, k)

    def uniform(self, lo: float, hi: float) -> float:
        return self._rng.uniform(lo, hi)


# ─────────────────────────────────────────────────────────────
# supporting dataclasses / enums
# ─────────────────────────────────────────────────────────────
class QType(Enum):
    MCQ = "mcq"
    FIB = "fib"
    TRUE_FALSE = "true_false"
    MATCH = "match"
    SHORT_ANS = "short_ans"
    ASSERTION_REASON = "assertion_reason"
    ONE_WORD = "one_word"


class Difficulty(Enum):
    EASY = "Easy"
    MEDIUM = "Medium"
    HARD = "Hard"


class Competency(Enum):
    REMEMBER = "Remember"
    UNDERSTAND = "Understand"
    APPLY = "Apply"
    ANALYZE = "Analyze"


@dataclass
class Node:
    node_id: str
    section: str
    syllabus: str
    cognitive_level: str
    difficulty: str
    exam_relevance: str
    exam_weightage: str
    competency_level: str
    prereq_strength: str
    mastery_criteria: str
    examples: str
    vocabulary: str
    questions: str
    negative_constraints: str
    spiral_topic: str
    scope_level: str
    scope_boundary: str
    is_root: bool
    prereq: Optional[str]
    reason: str
    depth_prereq: Optional[str]
    depth_reason: str


@dataclass
class Question:
    qid: str
    node_id: str
    qtype: str
    text: str
    options: Optional[List[str]] = None
    correct: str = ""
    explanation: str = ""
    marks: int = 1
    difficulty: str = "Medium"
    competency: str = "Remember"
    vocab_tag: str = ""
    negative_constraint: str = ""
    indian_context: bool = False


# ─────────────────────────────────────────────────────────────
# node definitions  (7-section skeleton – both provided nodes
# filled; remaining five kept as core-only placeholders so the
# 7-section requirement is satisfied)
# ─────────────────────────────────────────────────────────────
NODES: Dict[str, Node] = {
    # ── Section 1: Basic Biology ──────────────────────────────
    "c9_bio_001": Node(
        node_id="c9_bio_001",
        section="1 (Basic Biology)",
        syllabus="Cell theory, structure of plant and animal cell with functions "
        "of various cell organelles (Protoplasm, Cytoplasm, Nucleus, "
        "Nucleolus, Mitochondria, ER, Ribosome, Golgi bodies, Plastids, "
        "Lysosomes, Centrosome, Vacuole).",
        cognitive_level="Remember",
        difficulty="Medium",
        exam_relevance="Board_Only",
        exam_weightage="Medium",
        competency_level="Board",
        prereq_strength="medium",
        mastery_criteria="List the three principles of cell theory, Identify and "
        "label 12+ cell organelles in plant and animal cell diagrams, "
        "Describe the function of each organelle",
        examples="Mitochondria are like tiny battery chargers; Golgi bodies are "
        "like a post office; Lysosomes are like garbage disposals; "
        "Nucleus is the cell's control room; Ribosomes are like small "
        "3D printers",
        vocabulary="Cell theory, Protoplasm, Cytoplasm, Mitochondria, Endoplasmic "
        "reticulum, Ribosome, Golgi bodies, Plastids, Lysosomes, "
        "Centrosome, Vacuole, Nucleus, Nucleolus, Cell membrane, ATP",
        questions="none",
        negative_constraints="Basic understanding of cell theory only – full "
        "historical development not required",
        spiral_topic="cell-biology",
        scope_level="3-Core",
        scope_boundary=(
            "Teach: Cell theory and cell organelles (detailed) | "
            "Do NOT teach: C10 Chromosome structure, C10 Cell cycle, C10 Mitosis, "
            "C10 Meiosis, C10 Genetics terms | "
            "Already covered (revise only): C6 The cell and cell organelles, "
            "C6 Plant vs animal cell, C6 Unicellular and multicellular, "
            "C7 Tissue concept"
        ),
        is_root=False,
        prereq=None,
        reason="",
        depth_prereq="c6_bio_010",
        depth_reason=(
            "In C6, the child learned basic cell organelles (6 organelles). "
            "In C9, they learn 12+ organelles with specific functions."
        ),
    ),
    "c9_bio_002": Node(
        node_id="c9_bio_002",
        section="1 (Basic Biology)",
        syllabus="Major differences between prokaryotic and eukaryotic cells. "
        "Definition, examples, structural differences (nuclear organisation, "
        "membrane-bound organelles, genetic material, cell wall, ribosome "
        "size, cell size).",
        cognitive_level="Understand",
        difficulty="Medium",
        exam_relevance="Board_Only",
        exam_weightage="Medium",
        competency_level="Board",
        prereq_strength="medium",
        mastery_criteria="Define prokaryotic and eukaryotic cells, List three key "
        "structural differences, Classify given organisms as prokaryotic "
        "or eukaryotic",
        examples="Prokaryotic cell is like a one-room studio apartment; "
        "Eukaryotic cell is like a full house with many rooms; "
        "Nucleoid is like an open filing cabinet; "
        "E. coli is like a single-celled factory without walls",
        vocabulary="Prokaryotic, Eukaryotic, Nucleoid, Membrane-bound organelles, "
        "Nucleus, Cell wall, Peptidoglycan, Ribosomes, DNA, Cytoplasm, "
        "Plasmid, Flagellum, Unicellular, Multicellular",
        questions="none",
        negative_constraints=(
            "Do NOT introduce chromatin/chromatid/gene/DNA/centromere details – "
            "those are C10"
        ),
        spiral_topic="cell-biology",
        scope_level="3-Core",
        scope_boundary=(
            "Teach: Prokaryotic vs eukaryotic cells | "
            "Do NOT teach: C10 Chromosome structure, C10 Cell cycle, C10 Mitosis, "
            "C10 Meiosis, C10 Genetics terms | "
            "Already covered: C6 The cell, C6 Plant vs animal cell, "
            "C6 Unicellular/multicellular, C7 Tissue concept"
        ),
        is_root=False,
        prereq="c9_bio_001",
        reason=(
            "Must know cell organelles (especially nucleus) before distinguishing "
            "prokaryotic (no nucleus, no membrane-bound organelles) from "
            "eukaryotic (has nucleus and organelles)."
        ),
        depth_prereq="c9_bio_001",
        depth_reason="Distinction is defined by which organelles are present.",
    ),
    # ── Section 2: Plant Physiology ────────────────────────────
    "c9_bio_003": Node(
        node_id="c9_bio_003",
        section="2 (Plant Physiology)",
        syllabus="Photosynthesis – process, equation, conditions, importance. "
        "Chlorophyll and other pigments. Role of stomata.",
        cognitive_level="Understand",
        difficulty="Medium",
        exam_relevance="Board_Only",
        exam_weightage="High",
        competency_level="Board",
        prereq_strength="medium",
        mastery_criteria="Write balanced equation of photosynthesis, "
        "List conditions required, Explain role of chlorophyll and stomata, "
        "State importance of photosynthesis",
        examples="Chlorophyll is like a solar panel capturing sunlight; "
        "Stomata are like tiny windows that open and close; "
        "Photosynthesis is nature's kitchen making food",
        vocabulary="Photosynthesis, Chlorophyll, Stomata, Guard cells, "
        "Carbon dioxide, Oxygen, Glucose, Sunlight, Chloroplast, "
        "Pigments, Transpiration",
        questions="none",
        negative_constraints="Full Calvin cycle details not required",
        spiral_topic="plant-physiology",
        scope_level="3-Core",
        scope_boundary=(
            "Teach: Photosynthesis basics | "
            "Do NOT teach: Detailed light-dependent reactions, C3/C4 pathways | "
            "Already covered: C7 Plant tissues"
        ),
        is_root=False,
        prereq="c9_bio_001",
        reason="Needs understanding of chloroplast as a plastid.",
        depth_prereq="c9_bio_001",
        depth_reason="Plastids (especially chloroplasts) covered in C9 cell organelles.",
    ),
    # ── Section 3: Human Physiology ────────────────────────────
    "c9_bio_004": Node(
        node_id="c9_bio_004",
        section="3 (Human Physiology)",
        syllabus="Digestive system – organs and functions, enzymes, digestion "
        "of carbohydrates, proteins, and fats. Absorption in small intestine.",
        cognitive_level="Understand",
        difficulty="Medium",
        exam_relevance="Board_Only",
        exam_weightage="High",
        competency_level="Board",
        prereq_strength="medium",
        mastery_criteria="List organs of digestive system, "
        "Name enzymes and their substrates, "
        "Describe process of digestion for each macromolecule, "
        "Explain absorption in villi",
        examples="Teeth are nature's mortar and pestle grinding food; "
        "Small intestine is a long winding corridor with "
        "villi as absorption carpets; "
        "Enzymes are biological scissors cutting large molecules",
        vocabulary="Digestion, Enzymes, Amylase, Pepsin, Trypsin, Lipase, "
        "Small intestine, Large intestine, Villi, Absorption, "
        "Peristalsis, Bile, Liver, Pancreas, Stomach, Oesophagus",
        questions="none",
        negative_constraints="Hormonal regulation of digestion not required",
        spiral_topic="human-physiology",
        scope_level="3-Core",
        scope_boundary=(
            "Teach: Digestive system organs and digestion | "
            "Do NOT teach: Hormonal control, detailed enzyme kinetics | "
            "Already covered: C6 Basic cell structure"
        ),
        is_root=False,
        prereq="c9_bio_001",
        reason="Requires understanding of cell organelles (ER, lysosomes, etc.).",
        depth_prereq="c9_bio_001",
        depth_reason="Digestive enzymes are proteins synthesised by ribosomes/ER.",
    ),
    # ── Section 4: Health and Hygiene ───────────────────────────
    "c9_bio_005": Node(
        node_id="c9_bio_005",
        section="4 (Health and Hygiene)",
        syllabus="Disease and its causes. Types of diseases – infectious and "
        "non-infectious. Means of spread of infectious diseases. "
        "Principles of prevention and treatment. Immunisation.",
        cognitive_level="Understand",
        difficulty="Medium",
        exam_relevance="Board_Only",
        exam_weightage="Medium",
        competency_level="Board",
        prereq_strength="low",
        mastery_criteria="Define disease and distinguish infectious from "
        "non-infectious, List means of spread of infectious diseases, "
        "Explain principles of prevention, Describe immunisation",
        examples="Infectious disease is like a contagious secret that "
        "spreads through air, water, or contact; "
        "Vaccines are like a training manual for immune cells; "
        "Mosquito is a flying syringe for diseases",
        vocabulary="Disease, Pathogen, Infectious, Non-infectious, Virus, "
        "Bacteria, Fungus, Protozoan, Immunisation, Vaccine, "
        "Antibiotic, Vector, Carrier, Prevention",
        questions="none",
        negative_constraints="Detailed pathogen biology not required",
        spiral_topic="health",
        scope_level="3-Core",
        scope_boundary=(
            "Teach: Disease, prevention, immunisation | "
            "Do NOT teach: Detailed microbial life cycles, vaccine development"
        ),
        is_root=False,
        prereq=None,
        reason="Relatively standalone topic.",
        depth_prereq=None,
        depth_reason="No prior biological depth required beyond C6 basics.",
    ),
    # ── Section 5: Genetics ────────────────────────────────────
    "c9_bio_006": Node(
        node_id="c9_bio_006",
        section="5 (Genetics – Introduction)",
        syllabus="Introduction to heredity. Mendel's experiments with pea plants. "
        "Monohybrid cross. Dominant and recessive traits. "
        "Law of segregation.",
        cognitive_level="Understand",
        difficulty="Medium",
        exam_relevance="Board_Only",
        exam_weightage="High",
        competency_level="Board",
        prereq_strength="medium",
        mastery_criteria="Define heredity and variation, "
        "Describe Mendel's pea plant experiment, "
        "Explain dominant and recessive, "
        "Perform a simple monohybrid cross (P, F1, F2 generation)",
        examples="Dominant trait is like a loud voice that always gets heard; "
        "Recessive trait is like a quiet voice that only speaks up "
        "when alone; "
        "F1 generation is the first batch of children from parents",
        vocabulary="Heredity, Variation, Allele, Dominant, Recessive, "
        "Genotype, Phenotype, Homozygous, Heterozygous, "
        "Monohybrid cross, P generation, F1 generation, F2 generation, "
        "Pure-breeding, Segregation",
        questions="none",
        negative_constraints="Full dihybrid cross, chromosome theory of inheritance "
        "not required",
        spiral_topic="genetics",
        scope_level="3-Core",
        scope_boundary=(
            "Teach: Heredity, Mendel monohybrid | "
            "Do NOT teach: Dihybrid cross, chromosome theory, DNA structure"
        ),
        is_root=False,
        prereq="c9_bio_001",
        reason="Requires understanding of nucleus and chromosomes at a basic level.",
        depth_prereq="c9_bio_001",
        depth_reason="Chromosomes are in nucleus; genes not yet detailed.",
    ),
    # ── Section 6: Ecology ─────────────────────────────────────
    "c9_bio_007": Node(
        node_id="c9_bio_007",
        section="6 (Ecology)",
        syllabus="Ecosystem – biotic and abiotic components. Food chain and food "
        "web. Trophic levels. Energy flow in an ecosystem. "
        "Ecological pyramids. Biogeochemical cycles (carbon and nitrogen).",
        cognitive_level="Understand",
        difficulty="Medium",
        exam_relevance="Board_Only",
        exam_weightage="Medium",
        competency_level="Board",
        prereq_strength="low",
        mastery_criteria="Define ecosystem and list its components, "
        "Construct a food chain with 3-4 organisms, "
        "Draw an ecological pyramid, "
        "Describe carbon and nitrogen cycles briefly",
        examples="Food chain is like a relay race where energy is "
        "passed from runner to runner; "
        "Producers are like chefs cooking from scratch; "
        "A food web is a spider's web of many interwoven chains; "
        "Decomposers are nature's recycling department",
        vocabulary="Ecosystem, Biotic, Abiotic, Food chain, Food web, "
        "Trophic level, Producer, Consumer, Decomposer, "
        "Energy flow, Ecological pyramid, Carbon cycle, "
        "Nitrogen cycle, Nitrogen fixation",
        questions="none",
        negative_constraints="Detailed population ecology, ecological succession "
        "not required",
        spiral_topic="ecology",
        scope_level="3-Core",
        scope_boundary=(
            "Teach: Ecosystem, food chains, energy flow, biogeochemical cycles | "
            "Do NOT teach: Population dynamics, ecological succession"
        ),
        is_root=False,
        prereq=None,
        reason="Relatively standalone.",
        depth_prereq=None,
        depth_reason="Independent topic.",
    ),
}


# ─────────────────────────────────────────────────────────────
# question-bank  –  every entry is a self-contained template.
# {field}  → filled at generation time.
# {node_id} auto-set.
# ─────────────────────────────────────────────────────────────
_Q_BANK: List[Dict[str, Any]] = [
    # ── c9_bio_001  (cell organelles) ──────────────────────────
    {
        "node_id": "c9_bio_001",
        "qtype": "mcq",
        "text": "The three principles of cell theory state that: "
        "(1) all living organisms are made of {A}, "
        "(2) the {B} is the basic unit of life, and "
        "(3) all cells arise from {C}.",
        "options": ["A = tissues / B = tissue / C = organs",
                   "A = cells / B = cell / C = pre-existing cells",
                   "A = organs / B = organ / C = other cells",
                   "A = molecules / B = nucleus / C = cell division"],
        "correct": 1,
        "explanation": (
            "Schleiden, Schwann and Virchow formulated the three principles: "
            "all organisms are made of cells; the cell is the basic unit; "
            "all cells arise from pre-existing cells."
        ),
        "marks": 1,
        "difficulty": "Easy",
        "competency": "Remember",
        "vocab_tag": "Cell theory",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_001",
        "qtype": "mcq",
        "text": "Which organelle is known as the 'powerhouse of the cell' "
        "because it produces ATP?",
        "options": ["Ribosome", "Golgi body", "Mitochondrion", "Lysosome"],
        "correct": 2,
        "explanation": (
            "Mitochondria produce ATP through cellular respiration, "
            "providing energy for all cellular activities."
        ),
        "marks": 1,
        "difficulty": "Easy",
        "competency": "Remember",
        "vocab_tag": "Mitochondria",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_001",
        "qtype": "mcq",
        "text": "The organelle that modifies, sorts, and packages proteins "
        "for transport inside or outside the cell is called:",
        "options": ["Ribosome", "Golgi body / Golgi apparatus",
                   "Lysosome", "Mitochondrion"],
        "correct": 1,
        "explanation": (
            "Golgi bodies receive proteins from the ER, modify them, "
            "sort them, and package them into vesicles for transport."
        ),
        "marks": 1,
        "difficulty": "Easy",
        "competency": "Remember",
        "vocab_tag": "Golgi bodies",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_001",
        "qtype": "mcq",
        "text": "Lysosomes are called the 'suicide bags' of the cell because "
        "they contain digestive enzymes that can:",
        "options": ["Build new proteins",
                   "Break down waste and old cell parts",
                   "Produce ATP",
                   "Synthesise DNA"],
        "correct": 1,
        "explanation": (
            "Lysosomes contain hydrolytic enzymes that digest macromolecules, "
            "old organelles, and engulfed pathogens."
        ),
        "marks": 1,
        "difficulty": "Easy",
        "competency": "Remember",
        "vocab_tag": "Lysosomes",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_001",
        "qtype": "fib",
        "text": "The organelle that is the site of protein synthesis "
        "and is often called the 'protein factory' of the cell is the "
        "__________.",
        "answer": "ribosome",
        "explanation": (
            "Ribosomes read mRNA instructions and assemble amino acids "
            "into polypeptide chains."
        ),
        "marks": 1,
        "difficulty": "Easy",
        "competency": "Remember",
        "vocab_tag": "Ribosome",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_001",
        "qtype": "fib",
        "text": "The liquid portion of the cytoplasm in which organelles are "
        "suspended is called the __________.",
        "answer": "cytosol",
        "explanation": (
            "Cytosol is the gel-like aqueous matrix in which organelles are "
            "suspended within the cytoplasm."
        ),
        "marks": 1,
        "difficulty": "Medium",
        "competency": "Remember",
        "vocab_tag": "Cytoplasm",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_001",
        "qtype": "mcq",
        "text": "Which organelle is found only in animal cells and NOT in "
        "plant cells?",
        "options": ["Cell wall", "Chloroplast", "Large central vacuole",
                   "Centrosome / centrioles"],
        "correct": 3,
        "explanation": (
            "Centrioles in the centrosome are present in animal cells "
            "and help in cell division; they are absent in most plant cells."
        ),
        "marks": 1,
        "difficulty": "Medium",
        "competency": "Remember",
        "vocab_tag": "Centrosome",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_001",
        "qtype": "mcq",
        "text": "In an Indian mango (Mangifera indica) leaf cell, the "
        "organelle responsible for the green colour and photosynthesis is the:",
        "options": ["Leucoplast", "Chromoplast", "Chloroplast",
                   "Mitochondrion"],
        "correct": 2,
        "explanation": (
            "Chloroplasts contain chlorophyll which gives the green colour "
            "and carries out photosynthesis in plant cells."
        ),
        "marks": 1,
        "difficulty": "Medium",
        "competency": "Remember",
        "vocab_tag": "Plastids",
        "indian_context": True,
    },
    {
        "node_id": "c9_bio_001",
        "qtype": "fib",
        "text": "The __________ stores the genetic material (DNA) of the cell "
        "and controls all cellular activities.",
        "answer": "nucleus",
        "explanation": (
            "The nucleus contains DNA organised into chromosomes and directs "
            "all cellular activities via gene expression."
        ),
        "marks": 1,
        "difficulty": "Easy",
        "competency": "Remember",
        "vocab_tag": "Nucleus",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_001",
        "qtype": "true_false",
        "text": "The cell membrane (plasma membrane) is found only in animal "
        "cells and absent in plant cells.",
        "answer": "False",
        "explanation": (
            "Both plant and animal cells have a plasma membrane. "
            "Plant cells additionally have a rigid cell wall outside it."
        ),
        "marks": 1,
        "difficulty": "Easy",
        "competency": "Remember",
        "vocab_tag": "Cell membrane",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_001",
        "qtype": "one_word",
        "text": "Name the organelle that stores water, ions, and nutrients, "
        "making the cell turgid (especially large in plant cells).",
        "answer": "vacuole",
        "explanation": (
            "The central vacuole in plant cells stores water, nutrients, "
            "waste products, and helps maintain turgor pressure."
        ),
        "marks": 1,
        "difficulty": "Easy",
        "competency": "Remember",
        "vocab_tag": "Vacuole",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_001",
        "qtype": "mcq",
        "text": "The Endoplasmic Reticulum (ER) that has ribosomes attached "
        "to its surface is called:",
        "options": ["Smooth ER", "Rough ER", "Golgi body", "Nuclear membrane"],
        "correct": 1,
        "explanation": (
            "Rough ER has ribosomes attached, making it appear 'rough' "
            "under a microscope; it synthesises proteins for secretion."
        ),
        "marks": 1,
        "difficulty": "Medium",
        "competency": "Remember",
        "vocab_tag": "Endoplasmic reticulum",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_001",
        "qtype": "assertion_reason",
        "text": (
            "Assertion (A): Mitochondria have a double membrane. "
            "Reason (R): The inner membrane of mitochondria is folded "
            "into cristae to increase surface area for respiration."
        ),
        "options": ["Both A and R are true, and R correctly explains A",
                   "Both A and R are true, but R does NOT explain A",
                   "A is true but R is false",
                   "A is false but R is true"],
        "correct": 1,
        "explanation": (
            "Both statements are true. R explains WHY mitochondria need "
            "folds (cristae) — not WHY they have a double membrane. "
            "The double membrane protects the organelle; "
            "cristae increase respiratory surface."
        ),
        "marks": 1,
        "difficulty": "Medium",
        "competency": "Understand",
        "vocab_tag": "Mitochondria",
        "indian_context": False,
    },
    # ── c9_bio_002  (prokaryotic vs eukaryotic) ────────────────
    {
        "node_id": "c9_bio_002",
        "qtype": "mcq",
        "text": "Which of the following organisms is PROKARYOTIC?",
        "options": ["Amoeba proteus (an amoeba)", "Escherichia coli (E. coli)",
                   "Saccharomyces cerevisiae (yeast)",
                   "Chlamydomonas (green alga)"],
        "correct": 1,
        "explanation": (
            "E. coli is a bacterium and therefore prokaryotic. "
            "Amoeba, yeast, and Chlamydomonas are eukaryotic organisms."
        ),
        "marks": 1,
        "difficulty": "Medium",
        "competency": "Understand",
        "vocab_tag": "Prokaryotic",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_002",
        "qtype": "mcq",
        "text": "The region where the circular DNA of a prokaryotic cell is "
        "located (without a surrounding nuclear membrane) is called the:",
        "options": ["Nucleus", "Nucleolus", "Nucleoid",
                   "Chromosome"],
        "correct": 2,
        "explanation": (
            "The nucleoid is the irregularly shaped region in a prokaryote "
            "where the single circular chromosome is located."
        ),
        "marks": 1,
        "difficulty": "Medium",
        "competency": "Understand",
        "vocab_tag": "Nucleoid",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_002",
        "qtype": "mcq",
        "text": "Prokaryotic ribosomes are of the __________ size, whereas "
        "eukaryotic ribosomes are of the __________ size.",
        "options": ["70S / 80S", "80S / 70S", "60S / 40S", "50S / 30S"],
        "correct": 0,
        "explanation": (
            "Prokaryotic ribosomes are 70S (50S + 30S subunits); "
            "eukaryotic ribosomes are 80S (60S + 40S subunits)."
        ),
        "marks": 1,
        "difficulty": "Medium",
        "competency": "Understand",
        "vocab_tag": "Ribosomes",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_002",
        "qtype": "mcq",
        "text": "The main component of the prokaryotic cell wall is:",
        "options": ["Cellulose", "Peptidoglycan (murein)",
                   "Chitin", "Lignin"],
        "correct": 1,
        "explanation": (
            "Peptidoglycan (murein) is the unique polymer forming the "
            "bacterial cell wall; plant walls are made of cellulose."
        ),
        "marks": 1,
        "difficulty": "Medium",
        "competency": "Remember",
        "vocab_tag": "Cell wall",
        "indian_context": True,
    },
    {
        "node_id": "c9_bio_002",
        "qtype": "true_false",
        "text": "A prokaryotic cell contains mitochondria, endoplasmic "
        "reticulum, and Golgi bodies.",
        "answer": "False",
        "explanation": (
            "Prokaryotic cells lack membrane-bound organelles. "
            "Mitochondria, ER, and Golgi bodies are found only in eukaryotes."
        ),
        "marks": 1,
        "difficulty": "Easy",
        "competency": "Remember",
        "vocab_tag": "Membrane-bound organelles",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_002",
        "qtype": "fib",
        "text": "In eukaryotes, DNA is wrapped around __________ proteins "
        "to form chromosomes; prokaryotic DNA lacks these proteins.",
        "answer": "histone",
        "explanation": (
            "Eukaryotic DNA is wrapped around histone proteins to form "
            "nucleosomes and then chromatin. Prokaryotic DNA is 'naked'."
        ),
        "marks": 1,
        "difficulty": "Medium",
        "competency": "Remember",
        "vocab_tag": "DNA",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_002",
        "qtype": "match",
        "text": "Match the organism in Column A with its cell type "
        "in Column B.",
        "pairs": [
            ("Escherichia coli (E. coli)", "Prokaryotic"),
            ("Amoeba", "Eukaryotic"),
            ("Mango tree (Mangifera indica)", "Eukaryotic"),
            ("Bread mould (Rhizopus)", "Eukaryotic"),
        ],
        "explanation": (
            "E. coli is a bacterium → prokaryotic. "
            "Amoeba, mango tree, and Rhizopus all have a true nucleus "
            "and membrane-bound organelles → eukaryotic."
        ),
        "marks": 2,
        "difficulty": "Medium",
        "competency": "Understand",
        "vocab_tag": "Prokaryotic, Eukaryotic",
        "indian_context": True,
    },
    {
        "node_id": "c9_bio_002",
        "qtype": "mcq",
        "text": "Which statement is NOT a key difference between prokaryotic "
        "and eukaryotic cells?",
        "options": ["Presence of a nuclear membrane",
                   "Presence of membrane-bound organelles",
                   "Type of genetic material (circular vs linear)",
                   "Type of cell membrane (both have phospholipid bilayer)"],
        "correct": 3,
        "explanation": (
            "Both prokaryotic and eukaryotic cells have a phospholipid "
            "bilayer plasma membrane; this is NOT a distinguishing feature."
        ),
        "marks": 1,
        "difficulty": "Hard",
        "competency": "Analyze",
        "vocab_tag": "Prokaryotic, Eukaryotic",
        "indian_context": False,
    },
    # ── c9_bio_003  (photosynthesis) ───────────────────────────
    {
        "node_id": "c9_bio_003",
        "qtype": "fib",
        "text": (
            "The balanced chemical equation of photosynthesis is: "
            "6 CO₂ + 6 H₂O + light energy → C₆H₁₂O₆ + __________."
        ),
        "answer": "6 O2",
        "explanation": (
            "Photosynthesis converts carbon dioxide and water into glucose "
            "and oxygen using light energy captured by chlorophyll."
        ),
        "marks": 1,
        "difficulty": "Easy",
        "competency": "Remember",
        "vocab_tag": "Photosynthesis",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_003",
        "qtype": "mcq",
        "text": "In a sunflower (Helianthus annuus) leaf, the green pigment "
        "that captures light energy is:",
        "options": ["Carotene", "Chlorophyll", "Xanthophyll", "Anthocyanin"],
        "correct": 1,
        "explanation": (
            "Chlorophyll a and b absorb mainly red and blue light, "
            "reflecting green, giving leaves their characteristic colour."
        ),
        "marks": 1,
        "difficulty": "Easy",
        "competency": "Remember",
        "vocab_tag": "Chlorophyll",
        "indian_context": True,
    },
    {
        "node_id": "c9_bio_003",
        "qtype": "true_false",
        "text": "Stomata are tiny pores on the underside of leaves that allow "
        "carbon dioxide to enter and oxygen to exit during photosynthesis.",
        "answer": "True",
        "explanation": (
            "Guard cells flank each stoma, opening and closing it to regulate "
            "gas exchange (CO₂ in, O₂ out) and water vapour loss."
        ),
        "marks": 1,
        "difficulty": "Easy",
        "competency": "Understand",
        "vocab_tag": "Stomata",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_003",
        "qtype": "mcq",
        "text": "Which of the following is NOT a condition required for "
        "photosynthesis?",
        "options": ["Carbon dioxide", "Water", "Oxygen",
                   "Chlorophyll / sunlight"],
        "correct": 2,
        "explanation": (
            "Oxygen is a PRODUCT of photosynthesis, not a requirement. "
            "CO₂, water, and light (via chlorophyll) are the inputs."
        ),
        "marks": 1,
        "difficulty": "Medium",
        "competency": "Understand",
        "vocab_tag": "Photosynthesis",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_003",
        "qtype": "one_word",
        "text": "Tiny pores on leaf surfaces surrounded by guard cells, "
        "which regulate gas exchange, are called __________.",
        "answer": "stomata",
        "explanation": (
            "Stomata (singular: stoma) are openings controlled by guard cells "
            "that allow CO₂ in and O₂ and water vapour out."
        ),
        "marks": 1,
        "difficulty": "Easy",
        "competency": "Remember",
        "vocab_tag": "Stomata",
        "indian_context": False,
    },
    # ── c9_bio_004  (digestive system) ─────────────────────────
    {
        "node_id": "c9_bio_004",
        "qtype": "mcq",
        "text": "The enzyme that breaks down starch into maltose in the "
        "mouth is:",
        "options": ["Pepsin", "Amylase (salivary)", "Trypsin", "Lipase"],
        "correct": 1,
        "explanation": (
            "Salivary amylase (ptyalin) begins starch digestion in the mouth "
            "by breaking it down into maltose."
        ),
        "marks": 1,
        "difficulty": "Medium",
        "competency": "Remember",
        "vocab_tag": "Enzymes",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_004",
        "qtype": "mcq",
        "text": "The finger-like projections in the small intestine that "
        "increase surface area for absorption are called:",
        "options": ["Alveoli", "Villi", "Cilia", "Trabeculae"],
        "correct": 1,
        "explanation": (
            "Villi are tiny finger-like projections lining the small intestine, "
            "each containing a network of capillaries and a lacteal for "
            "efficient nutrient absorption."
        ),
        "marks": 1,
        "difficulty": "Easy",
        "competency": "Remember",
        "vocab_tag": "Absorption",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_004",
        "qtype": "fib",
        "text": "The acidic fluid secreted by gastric glands in the stomach "
        "that activates pepsinogen is called __________ acid.",
        "answer": "hydrochloric / HCl",
        "explanation": (
            "Hydrochloric acid (HCl) creates an acidic pH (~1.5–3.5) in the "
            "stomach, activating pepsinogen → pepsin for protein digestion."
        ),
        "marks": 1,
        "difficulty": "Medium",
        "competency": "Remember",
        "vocab_tag": "Enzymes",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_004",
        "qtype": "true_false",
        "text": "The liver produces bile which is stored in the gallbladder "
        "and helps emulsify fats during digestion.",
        "answer": "True",
        "explanation": (
            "Bile, produced by the liver and stored in the gallbladder, "
            "emulsifies fats into smaller droplets, increasing surface area "
            "for lipase action."
        ),
        "marks": 1,
        "difficulty": "Medium",
        "competency": "Understand",
        "vocab_tag": "Digestion",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_004",
        "qtype": "mcq",
        "text": "Which organ produces the enzyme trypsin?",
        "options": ["Stomach", "Liver", "Pancreas", "Small intestine"],
        "correct": 2,
        "explanation": (
            "The pancreas secretes trypsinogen (inactive form) into the "
            "duodenum, where it is activated to trypsin by enterokinase."
        ),
        "marks": 1,
        "difficulty": "Medium",
        "competency": "Remember",
        "vocab_tag": "Digestion",
        "indian_context": False,
    },
    # ── c9_bio_005  (health and hygiene) ───────────────────────
    {
        "node_id": "c9_bio_005",
        "qtype": "mcq",
        "text": "Which of the following is an example of an INFECTIOUS disease?",
        "options": ["Diabetes mellitus", "Cancer",
                   "Tuberculosis (caused by Mycobacterium tuberculosis)",
                   "Hypertension"],
        "correct": 2,
        "explanation": (
            "Tuberculosis is caused by the bacterium Mycobacterium tuberculosis "
            "and spreads through air; it is infectious. "
            "Diabetes and hypertension are non-infectious."
        ),
        "marks": 1,
        "difficulty": "Easy",
        "competency": "Understand",
        "vocab_tag": "Infectious",
        "indian_context": True,
    },
    {
        "node_id": "c9_bio_005",
        "qtype": "mcq",
        "text": "The organism that spreads a disease from one person to "
        "another without being affected itself is called a:",
        "options": ["Parasite", "Vector", "Pathogen", "Reservoir"],
        "correct": 1,
        "explanation": (
            "A vector carries and transmits a pathogen without being "
            "diseased itself. Examples: Anopheles mosquito (malaria), "
            "Aedes mosquito (dengue)."
        ),
        "marks": 1,
        "difficulty": "Medium",
        "competency": "Remember",
        "vocab_tag": "Vector",
        "indian_context": True,
    },
    {
        "node_id": "c9_bio_005",
        "qtype": "fib",
        "text": "The process of developing immunity against a disease by "
        "administering a vaccine is called __________.",
        "answer": "immunisation",
        "explanation": (
            "Immunisation stimulates the immune system to produce antibodies "
            "and memory cells without causing the actual disease."
        ),
        "marks": 1,
        "difficulty": "Easy",
        "competency": "Remember",
        "vocab_tag": "Immunisation",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_005",
        "qtype": "true_false",
        "text": "Antibiotics are effective against viral diseases such as "
        "the common cold and influenza.",
        "answer": "False",
        "explanation": (
            "Antibiotics kill or inhibit bacteria but have no effect on "
            "viruses. Misuse of antibiotics for viral diseases promotes "
            "antibiotic resistance."
        ),
        "marks": 1,
        "difficulty": "Medium",
        "competency": "Understand",
        "vocab_tag": "Antibiotic",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_005",
        "qtype": "mcq",
        "text": "India's national immunisation programme (UIP) under Mission "
        "Indradhanush provides free vaccines to protect children against:",
        "options": ["Only malaria", "12 vaccine-preventable diseases",
                   "Only tuberculosis", "Water-borne diseases only"],
        "correct": 1,
        "explanation": (
            "Mission Indradhanush aims to immunise all children against "
            "12 vaccine-preventable diseases including TB, polio, hepatitis B, "
            "diphtheria, pertussis, tetanus, measles, and others."
        ),
        "marks": 1,
        "difficulty": "Medium",
        "competency": "Understand",
        "vocab_tag": "Immunisation",
        "indian_context": True,
    },
    # ── c9_bio_006  (genetics – heredity) ──────────────────────
    {
        "node_id": "c9_bio_006",
        "qtype": "fib",
        "text": "Gregor Johann __________ is known as the Father of Genetics "
        "for his pioneering work with garden pea (Pisum sativum) plants.",
        "answer": "Mendel",
        "explanation": (
            "Mendel conducted controlled breeding experiments with pea plants "
            "in the 1860s, establishing the fundamental laws of inheritance."
        ),
        "marks": 1,
        "difficulty": "Easy",
        "competency": "Remember",
        "vocab_tag": "Heredity",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_006",
        "qtype": "mcq",
        "text": "In a monohybrid cross between a pure-breeding tall pea plant "
        "(TT) and a pure-breeding dwarf plant (tt), the F₁ generation will "
        "be:",
        "options": ["All tall (Tt)", "All dwarf (tt)",
                   "Half tall, half dwarf (Tt / tt)",
                   "Three tall : one dwarf (3:1)"],
        "correct": 0,
        "explanation": (
            "All F₁ offspring are heterozygous tall (Tt) because the tall "
            "allele (T) is dominant over dwarf (t). "
            "The 3:1 ratio appears in the F₂ generation."
        ),
        "marks": 1,
        "difficulty": "Medium",
        "competency": "Understand",
        "vocab_tag": "Dominant, Recessive",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_006",
        "qtype": "mcq",
        "text": "If a gene has two variants T (tall) and t (dwarf), the "
        "trait expressed in a heterozygous individual (Tt) is called the:",
        "options": ["Recessive trait", "Dominant trait", "Co-dominant trait",
                   "Hidden trait"],
        "correct": 1,
        "explanation": (
            "The dominant allele (T) is always expressed in both homozygous "
            "(TT) and heterozygous (Tt) individuals; the recessive allele (t) "
            "is only expressed in homozygous recessive (tt)."
        ),
        "marks": 1,
        "difficulty": "Medium",
        "competency": "Understand",
        "vocab_tag": "Dominant, Recessive",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_006",
        "qtype": "true_false",
        "text": "In Mendel's experiments, the parental generation (P) "
        "consisted of pure-breeding (homozygous) plants with contrasting traits.",
        "answer": "True",
        "explanation": (
            "Mendel started with true-breeding (homozygous) parental plants — "
            "e.g., all tall or all dwarf — to ensure clear, predictable results."
        ),
        "marks": 1,
        "difficulty": "Easy",
        "competency": "Remember",
        "vocab_tag": "Monohybrid cross",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_006",
        "qtype": "fib",
        "text": "When two heterozygous tall pea plants (Tt × Tt) are crossed, "
        "the genotypic ratio in the F₂ generation is __________.",
        "answer": "1 TT : 2 Tt : 1 tt",
        "explanation": (
            "From a Tt × Tt cross: 25% TT (homozygous tall), 50% Tt "
            "(heterozygous tall), 25% tt (homozygous dwarf). "
            "Phenotypic ratio = 3 tall : 1 dwarf."
        ),
        "marks": 2,
        "difficulty": "Hard",
        "competency": "Apply",
        "vocab_tag": "Monohybrid cross",
        "indian_context": False,
    },
    # ── c9_bio_007  (ecology) ──────────────────────────────────
    {
        "node_id": "c9_bio_007",
        "qtype": "mcq",
        "text": "In a pond ecosystem, which organisms are the PRODUCERS?",
        "options": ["Fish", "Algae / Phytoplankton",
                   "Frogs", "Bacteria"],
        "correct": 1,
        "explanation": (
            "Algae and phytoplankton are photosynthetic producers that make "
            "their own food using sunlight, forming the base of the food chain."
        ),
        "marks": 1,
        "difficulty": "Easy",
        "competency": "Remember",
        "vocab_tag": "Producer",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_007",
        "qtype": "mcq",
        "text": "Organisms that break down dead organic matter and return "
        "nutrients to the soil are called:",
        "options": ["Producers", "Primary consumers", "Decomposers",
                   "Predators"],
        "correct": 2,
        "explanation": (
            "Decomposers (bacteria and fungi) break down dead organisms and "
            "waste, recycling nutrients back into the ecosystem."
        ),
        "marks": 1,
        "difficulty": "Easy",
        "competency": "Remember",
        "vocab_tag": "Decomposer",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_007",
        "qtype": "fib",
        "text": "A series of organisms in which each is eaten by the next "
        "is called a __________.",
        "answer": "food chain",
        "explanation": (
            "A food chain shows the linear flow of energy from producers "
            "through various levels of consumers."
        ),
        "marks": 1,
        "difficulty": "Easy",
        "competency": "Remember",
        "vocab_tag": "Food chain",
        "indian_context": False,
    },
    {
        "node_id": "c9_bio_007",
        "qtype": "mcq",
        "text": "In the Indian Sundarbans mangrove ecosystem, the Bengal "
        "tiger (Panthera tigris tigris) occupies the trophic level of a:",
        "options": ["Producer", "Primary consumer (herbivore)",
                   "Secondary or tertiary consumer (carnivore)",
                   "Decomposer"],
        "correct": 2,
        "explanation": (
            "The Bengal tiger is an apex carnivore — it preys on herbivores "
            "like deer, placing it at a high (secondary/tertiary) consumer level."
        ),
        "marks": 1,
        "difficulty": "Medium",
        "competency": "Understand",
        "vocab_tag": "Trophic level",
        "indian_context": True,
    },
    {
        "node_id": "c9_bio_007",
        "qtype": "true_false",
        "text": "Energy flows unidirectionally in an ecosystem and does "
        "not cycle back.",
        "answer": "True",
        "explanation": (
            "Energy flows from the sun → producers → consumers → decomposers "
            "and is eventually lost as heat (10% rule). "
            "Unlike nutrients, energy does NOT recycle."
        ),
        "marks": 1,
        "difficulty": "Medium",
        "competency": "Understand",
        "vocab_tag": "Energy flow",
        "indian_context": False,
    },
]


# ─────────────────────────────────────────────────────────────
# QuestionGenerator
# ─────────────────────────────────────────────────────────────
class QuestionGenerator:
    """Deterministic question generator for ICSE Class 9 Biology."""

    def __init__(self, seed: str = "icse_bio_c9_seed_v1") -> None:
        self._rng = SRandom(seed)
        self._bank: Dict[str, List[Dict[str, Any]]] = self._group_by_node()

    # ── helpers ────────────────────────────────────────────────
    def _group_by_node(self) -> Dict[str, List[Dict[str, Any]]]:
        g: Dict[str, List[Dict[str, Any]]] = {}
        for entry in _Q_BANK:
            nid = entry["node_id"]
            g.setdefault(nid, []).append(entry)
        for k in g:
            self._rng.shuffle(g[k])          # deterministic shuffle
        return g

    @staticmethod
    def _node_exists(node_id: str) -> bool:
        return node_id in NODES

    # ── public API ─────────────────────────────────────────────
    def generate(self, node_id: str, n: int = 5,
                 qtypes: Optional[List[str]] = None) -> List[Question]:
        """Return up to *n* questions for *node_id*.

        Parameters
        ----------
        node_id : str
            Node identifier (e.g. 'c9_bio_001').
        n : int
            Maximum number of questions to return (default 5).
        qtypes : list[str] | None
            Restrict to these question-type strings
            ('mcq', 'fib', 'true_false', …).  *None* means all types.

        Returns
        -------
        list[Question]
        """
        self._verify_node(node_id)
        pool = self._bank.get(node_id, [])
        if not pool:
            return self._fallback_generate(node_id, n)

        selected: List[Dict[str, Any]] = []
        seen: set = set()
        types_used: Dict[str, int] = {}

        for entry in pool:
            qt = entry["qtype"]
            if qtypes and qt not in qtypes:
                continue
            eid = id(entry)
            if eid in seen:
                continue
            # limit 2 of each type per call
            if types_used.get(qt, 0) >= 2:
                continue
            selected.append(entry)
            seen.add(eid)
            types_used[qt] = types_used.get(qt, 0) + 1
            if len(selected) >= n:
                break

        # if we still need more, relax type limits
        if len(selected) < n:
            for entry in pool:
                if len(selected) >= n:
                    break
                eid = id(entry)
                if eid in seen:
                    continue
                selected.append(entry)
                seen.add(eid)

        return [self._build_q(e, idx)
                for idx, e in enumerate(selected)]

    # ── verification ───────────────────────────────────────────
    def _verify_node(self, node_id: str) -> None:
        if node_id not in NODES:
            raise ValueError(
                f"Unknown node_id '{node_id}'. "
                f"Available: {sorted(NODES.keys())}"
            )
        if node_id not in self._bank or not self._bank[node_id]:
            raise ValueError(
                f"Node '{node_id}' has no questions in the bank."
            )

    def verify_batch(self, node_id: str,
                     questions: List[Question]) -> Dict[str, Any]:
        """Verify a batch of questions for a node.

        Returns a dict with keys: valid (bool), errors (list),
        stats (dict).
        """
        errors: List[str] = []
        stats: Dict[str, Any] = {
            "total": len(questions),
            "by_type": {},
            "by_difficulty": {},
            "by_competency": {},
            "by_vocab": {},
            "avg_marks": 0.0,
            "indian_context_count": 0,
        }
        for q in questions:
            # basic checks
            if not q.text:
                errors.append(f"{q.qid}: empty text")
            if q.qtype not in [e.value for e in QType]:
                errors.append(f"{q.qid}: unknown qtype '{q.qtype}'")
            if q.qtype == "mcq" and (not q.options or len(q.options) < 2):
                errors.append(f"{q.qid}: MCQ needs ≥2 options")
            if q.qtype == "mcq" and q.options:
                try:
                    int(q.correct)
                except ValueError:
                    errors.append(f"{q.qid}: MCQ correct must be int index")
            if q.node_id != node_id:
                errors.append(f"{q.qid}: node_id mismatch")
            # stats
            stats["by_type"][q.qtype] = stats["by_type"].get(q.qtype, 0) + 1
            stats["by_difficulty"][q.difficulty] = (
                stats["by_difficulty"].get(q.difficulty, 0) + 1
            )
            stats["by_competency"][q.competency] = (
                stats["by_competency"].get(q.competency, 0) + 1
            )
            for tag in q.vocab_tag.split(","):
                tag = tag.strip()
                if tag:
                    stats["by_vocab"][tag] = (
                        stats["by_vocab"].get(tag, 0) + 1
                    )
            if q.indian_context:
                stats["indian_context_count"] += 1

        stats["avg_marks"] = (
            round(sum(q.marks for q in questions) / len(questions), 2)
            if questions else 0.0
        )
        stats["difficulty_distribution"] = self._entropy(
            list(stats["by_difficulty"].values())
        )
        stats["competency_distribution"] = self._entropy(
            list(stats["by_competency"].values())
        )
        return {
            "valid": len(errors) == 0,
            "errors": errors,
            "stats": stats,
        }

    @staticmethod
    def _entropy(counts: List[int]) -> float:
        """Shannon entropy (base-2) of a count distribution."""
        total = sum(counts)
        if total == 0:
            return 0.0
        ent = 0.0
        for c in counts:
            if c > 0:
                p = c / total
                ent -= p * math.log2(p)
        return round(ent, 4)

    # ── deterministic question builder ─────────────────────────
    def _build_q(self, entry: Dict[str, Any], idx: int) -> Question:
        text = entry["text"]
        # deterministic placeholder fill-ins via math (no RNG)
        placeholders = {"A": "cells", "B": "cell", "C": "pre-existing cells"}
        for k, v in placeholders.items():
            text = text.replace("{A}", v).replace("{B}", v).replace("{C}", v)

        options = None
        if entry["qtype"] == "mcq" and entry.get("options"):
            opts = list(entry["options"])
            self._rng.shuffle(opts)          # deterministic shuffle
            options = opts
            # find new correct index after shuffle
            orig_correct = entry["correct"]
            # match on the original correct answer text
            orig_text = entry["options"][orig_correct]
            correct = str(next(
                i for i, o in enumerate(opts)
                if orig_text.strip() == o.strip()
            ))
        elif entry["qtype"] in ("fib", "one_word"):
            correct = str(entry.get("answer", ""))
        elif entry["qtype"] == "true_false":
            correct = entry.get("answer", "")
        else:
            correct = str(entry.get("answer", ""))

        return Question(
            qid=f"{entry['node_id']}_{idx + 1:03d}",
            node_id=entry["node_id"],
            qtype=entry["qtype"],
            text=textwrap.dedent(text).strip(),
            options=options,
            correct=correct,
            explanation=textwrap.dedent(entry["explanation"]).strip(),
            marks=entry.get("marks", 1),
            difficulty=entry.get("difficulty", "Medium"),
            competency=entry.get("competency", "Remember"),
            vocab_tag=entry.get("vocab_tag", ""),
            negative_constraint=(
                NODES[entry["node_id"]].negative_constraints
                if entry["node_id"] in NODES else ""
            ),
            indian_context=entry.get("indian_context", False),
        )

    # ── fallback (no bank entries) ─────────────────────────────
    def _fallback_generate(self, node_id: str, n: int) -> List[Question]:
        node = NODES[node_id]
        questions: List[Question] = []
        for i in range(min(n, 3)):
            questions.append(Question(
                qid=f"{node_id}_fallback_{i + 1:03d}",
                node_id=node_id,
                qtype="mcq",
                text=f"[No bank entry] "
                     f"Study the topic: {node.syllabus[:100]}…",
                options=["Option A", "Option B", "Option C", "Option D"],
                correct="0",
                explanation=(
                    "No question template available for this node. "
                    "Refer to the syllabus for self-study."
                ),
                marks=1,
                difficulty=node.difficulty,
                competency=node.competency_level,
                vocab_tag=node.vocabulary.split(",")[0].strip(),
                negative_constraint=node.negative_constraints,
                indian_context=False,
            ))
        return questions

    # ── utility: node summary ───────────────────────────────────
    def get_node_summary(self, node_id: str) -> Dict[str, Any]:
        self._verify_node(node_id)
        node = NODES[node_id]
        bank_count = len(self._bank.get(node_id, []))
        return {
            "node_id": node_id,
            "section": node.section,
            "syllabus": node.syllabus,
            "cognitive_level": node.cognitive_level,
            "difficulty": node.difficulty,
            "competency": node.competency_level,
            "bank_questions": bank_count,
            "vocabulary": [v.strip() for v in node.vocabulary.split(",")],
            "prereq": node.prereq,
            "depth_prereq": node.depth_prereq,
            "is_root": node.is_root,
        }

    def list_all_nodes(self) -> List[Dict[str, Any]]:
        return [self.get_node_summary(nid) for nid in NODES]

    def generate_all(self, per_node: int = 3) -> Dict[str, List[Question]]:
        """Generate questions for every node in the syllabus."""
        result: Dict[str, List[Question]] = {}
        for nid in NODES:
            result[nid] = self.generate(nid, n=per_node)
        return result


# ─────────────────────────────────────────────────────────────
# self-verification / demonstration
# ─────────────────────────────────────────────────────────────
def _run_self_check() -> None:
    """Print a verification report to confirm the module works."""
    gen = QuestionGenerator(seed="icse_c9_bio_verify_001")

    print("=" * 60)
    print("ICSE Class 9 Biology – Question Generator Self-Check")
    print("=" * 60)

    # 1. list all nodes
    print("\n[1] Nodes loaded:", len(NODES))
    for nid in sorted(NODES):
        node = NODES[nid]
        section_short = node.section.split("(")[0].strip()
        print(f"    {nid} | {section_short} | {node.cognitive_level}")

    # 2. per-node: generate + verify
    all_verification: Dict[str, Any] = {}
    for nid in sorted(NODES):
        qs = gen.generate(nid, n=5)
        report = gen.verify_batch(nid, qs)
        all_verification[nid] = report
        status = "PASS" if report["valid"] else "FAIL"
        stats = report["stats"]
        print(
            f"\n[2] {nid}: {len(qs)} questions | {status} | "
            f"difficulty_entropy={stats['difficulty_distribution']:.3f} | "
            f"competency_entropy={stats['competency_distribution']:.3f}"
        )
        for q in qs:
            ic = " [IN]" if q.indian_context else ""
            print(f"     - [{q.qtype}] {q.text[:60]}…  ✓{ic}")

    # 3. summary
    total_qs = sum(len(v) for v in all_verification.values())
    all_valid = all(v["valid"] for v in all_verification.values())
    total_errors = sum(len(v["errors"]) for v in all_verification.values())
    total_in = sum(
        v["stats"]["indian_context_count"]
        for v in all_verification.values()
    )
    print("\n" + "-" * 60)
    print(f"Total questions generated : {total_qs}")
    print(f"All nodes valid           : {all_valid}")
    print(f"Total errors              : {total_errors}")
    print(f"Indian-context questions  : {total_in}")
    print("-" * 60)

    # 4. determinism test
    gen2 = QuestionGenerator(seed="icse_c9_bio_verify_001")
    qs1 = gen.generate("c9_bio_001", n=5)
    qs2 = gen2.generate("c9_bio_001", n=5)
    texts1 = [q.text for q in qs1]
    texts2 = [q.text for q in qs2]
    deterministic = texts1 == texts2
    print(f"Determinism (same seed → same output): {deterministic}")
    if not deterministic:
        print("  WARNING: non-deterministic output detected!")
    print("=" * 60)


if __name__ == "__main__":
    _run_self_check()