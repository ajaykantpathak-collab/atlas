"""
Class 10 Biology — Deterministic Solver
3 Nodes: Chromosome Structure, Cell Cycle, Mitosis
ICSE Class 10 | Step-by-Step | Verification
"""
import re
import random
import hashlib
from typing import Optional, List, Dict, Tuple

# ──────────────────────────────────────────────
# ──────────────────────────────────────────────
CHROMOSOME_TERMS = {
    "chromatin": {
        "definition": (
            "Chromatin is the uncoiled, thread-like form of genetic material "
            "(DNA + histone proteins) present in the nucleus during interphase "
            "(non-dividing phase)."
        ),
        "stage": "Interphase (non-dividing cell)",
        "related": ["chromosome", "DNA", "histone", "nucleosome"],
        "opposite": "chromosome (condensed form during division)",
        "keywords": ["uncoiled", "thread-like", "interphase", "non-dividing",
                     "nucleus", "DNA", "loose"]
    },
    "chromatid": {
        "definition": (
            "A chromatid is each of the two identical halves of a replicated "
            "chromosome. The two chromatids (sister chromatids) are joined at "
            "the centromere. Each chromatid contains one DNA molecule."
        ),
        "stage": "After S phase (replicated chromosome)",
        "related": ["chromosome", "centromere", "DNA", "sister chromatid"],
        "opposite": None,
        "keywords": ["half", "identical", "replicated", "joined", "centromere",
                     "two", "sister"]
    },
    "centromere": {
        "definition": (
            "The centromere (primary constriction) is the point on a chromosome "
            "where the two sister chromatids are joined. It is also the site "
            "where spindle fibres attach during cell division."
        ),
        "stage": "Present throughout cell cycle",
        "related": ["chromatid", "chromosome", "spindle fibres", "primary constriction"],
        "opposite": None,
        "keywords": ["primary constriction", "joined", "spindle", "attachment",
                     "point", "waist"]
    },
    "gene": {
        "definition": (
            "A gene is a specific segment of DNA that codes for a particular "
            "protein or trait. It is the basic unit of heredity. Genes are "
            "arranged linearly on chromosomes."
        ),
        "stage": "Located on chromosomes",
        "related": ["DNA", "chromosome", "protein", "trait", "heredity"],
        "opposite": None,
        "keywords": ["segment", "DNA", "codes", "protein", "trait",
                     "heredity", "unit"]
    },
    "DNA": {
        "full_form": "Deoxyribonucleic Acid",
        "definition": (
            "DNA (Deoxyribonucleic Acid) is the hereditary material that carries "
            "genetic information. It has a double-helix structure composed of "
            "nucleotides. Each nucleotide has: a phosphate group, deoxyribose "
            "sugar, and a nitrogenous base (adenine, thymine, guanine, cytosine)."
        ),
        "base_pairs": {"adenine": "thymine", "thymine": "adenine",
                       "guanine": "cytosine", "cytosine": "guanine"},
        "sugar": "deoxyribose",
        "related": ["gene", "chromosome", "chromatin", "nucleotide",
                     "double helix"],
        "keywords": ["double helix", "hereditary", "nucleotide", "deoxyribose",
                     "phosphate", "base", "A", "T", "G", "C"]
    },
    "chromosome": {
        "definition": (
            "A chromosome is a highly condensed, rod-shaped structure made of "
            "DNA and proteins (histones) that carries genetic information. "
            "It is visible during cell division. Each chromosome consists of "
            "DNA which contains many genes."
        ),
        "stage": "Visible during cell division (mitosis/meiosis)",
        "related": ["chromatin", "chromatid", "gene", "DNA", "centromere"],
        "opposite": "chromatin (uncondensed form)",
        "keywords": ["condensed", "rod-shaped", "cell division", "genetic",
                     "visible", "DNA", "genes"]
    },
}

CELL_CYCLE_TERMS = {
    "cell cycle": {
        "definition": (
            "The cell cycle is the series of events from the end of one cell "
            "division to the end of the next. It consists of interphase (G1, S, "
            "G2) and the mitotic (M) phase."
        ),
        "phases": ["G1", "S", "G2", "M"],
        "order": ["G1", "S", "G2", "M"]
    },
    "interphase": {
        "definition": (
            "Interphase is the longest phase of the cell cycle (90-95% of the "
            "total duration) during which the cell grows, replicates its DNA, "
            "and prepares for division. It has three sub-phases: G1, S, and G2."
        ),
        "sub_phases": ["G1", "S", "G2"],
        "percentage": "90-95%"
    },
    "G1": {
        "definition": (
            "G1 (Gap 1) phase: The cell grows in size, synthesises proteins "
            "and RNA, duplicates organelles (mitochondria, chloroplasts), and "
            "prepares for DNA replication."
        ),
        "duration": "Longest sub-phase",
        "dna_content": "2n (unreplicated chromosomes)",
        "events": ["cell growth", "protein synthesis", "organelle duplication"]
    },
    "S": {
        "definition": (
            "S (Synthesis) phase: The entire DNA content of the cell is "
            "replicated. Each chromosome duplicates to form two sister "
            "chromatids. DNA content doubles from 2n to 4n."
        ),
        "dna_change": "2n → 4n (doubles)",
        "events": ["DNA replication", "chromosome duplication"],
        "key": "DNA content doubles"
    },
    "G2": {
        "definition": (
            "G2 (Gap 2) phase: The cell checks that DNA replication is "
            "complete, synthesises energy (ATP), and produces spindle proteins "
            "(tubulin) in preparation for mitosis."
        ),
        "duration": "Shortest sub-phase of interphase",
        "dna_content": "4n (replicated)",
        "events": ["DNA verification", "energy storage", "spindle protein synthesis"]
    },
    "M": {
        "full_name": "Mitotic phase",
        "definition": (
            "The M (Mitotic) phase is when actual cell division occurs. It "
            "includes mitosis (nuclear division: prophase, metaphase, anaphase, "
            "telophase) and cytokinesis (cytoplasmic division)."
        ),
        "events": ["mitosis", "cytokinesis"],
        "percentage": "5-10% of cell cycle"
    },
    "cytokinesis": {
        "animal": (
            "In animal cells, cytokinesis occurs by the formation of a "
            "cleavage furrow — a contractile ring of actin and myosin filaments "
            "pinches the cell membrane inward."
        ),
        "plant": (
            "In plant cells, cytokinesis occurs by cell plate formation — "
            "vesicles from the Golgi fuse at the cell's centre to form a cell "
            "plate that grows outward, dividing the cell."
        )
    }
}

MITOSIS_STAGES = {
    "prophase": {
        "order": 1,
        "features": {
            "chromatin": "Chromatin condenses into visible, rod-shaped chromosomes",
            "nuclear_membrane": "Begins to dissolve/disintegrate",
            "nucleolus": "Disappears",
            "centrioles": "Move to opposite poles; spindle fibres form (animal cells)",
            "chromosomes": "Each chromosome has two sister chromatids joined at "
                           "the centromere"
        },
        "duration": "Longest stage",
        "keywords": ["condense", "visible", "spindle", "centrioles", "longest"]
    },
    "metaphase": {
        "order": 2,
        "features": {
            "chromatin": "Chromosomes line up at the equator (metaphase plate)",
            "nuclear_membrane": "Completely absent",
            "nucleolus": "Absent",
            "spindle": "Spindle fibres attach to centromeres of all chromosomes",
            "chromosomes": "Aligned at the equatorial plane"
        },
        "duration": "Moderate",
        "keywords": ["equator", "align", "metaphase plate", "spindle fibres",
                     "centromere"]
    },
    "anaphase": {
        "order": 3,
        "features": {
            "chromatin": "Sister chromatids separate at the centromere",
            "movement": "Chromatids (now called daughter chromosomes) move to "
                        "opposite poles along spindle fibres",
            "nuclear_membrane": "Absent",
            "spindle": "Spindle fibres shorten, pulling chromatids apart"
        },
        "duration": "Shortest stage",
        "keywords": ["separate", "poles", "shortest", "spindle fibres shorten",
                     "sister chromatids"]
    },
    "telophase": {
        "order": 4,
        "features": {
            "chromatin": "Chromosomes reach poles and begin uncoiling back into "
                         "chromatin",
            "nuclear_membrane": "Reforms around each set of chromosomes",
            "nucleolus": "Reappears in each new nucleus",
            "spindle": "Spindle fibres disappear"
        },
        "duration": "Moderate",
        "followed_by": "Cytokinesis",
        "keywords": ["reform", "nuclear membrane", "uncoil", "nucleolus reappears"]
    },
}

MITOSIS_DIFFERENCES = {
    "plant_vs_animal": {
        "cell_shape": "Plant cells are rectangular/box-shaped (cell wall); "
                       "animal cells are round/irregular",
        "centrioles": "Absent in higher plants; present in animal cells",
        "cytokinesis": "Cell plate (plant) vs Cleavage furrow (animal)",
        "spindle": "Asters absent in plants; present in animals",
    },
    "prophase_vs_telophase": {
        "chromosomes": "Condense (prophase) vs Uncoil (telophase)",
        "nuclear_membrane": "Dissolves (prophase) vs Reforms (telophase)",
        "nucleolus": "Disappears (prophase) vs Reappears (telophase)",
        "spindle": "Forms (prophase) vs Disappears (telophase)",
    }
}

# ──────────────────────────────────────────────
# ──────────────────────────────────────────────
class BioSolver:
    """
    Deterministic solver for Class 10 Biology questions.
    Supports fill-blank, MCQ, T/F, matching, sequencing,
    short-answer, and difference questions.
    """

    def __init__(self):
        self._history: List[Dict] = []

    # ── core solve ────────────────────────────
    def solve(self, question_text: str, q_type: str,
              user_answer: str = None, options: List[str] = None,
              correct_answer: str = None) -> Dict:
        """
        Solve a biology question and verify if a user-provided answer is correct.

        Parameters
        ----------
        question_text : str
            The full question text.
        q_type : str
            One of: 'Fill in the Blank', 'Multiple Choice', 'True / False',
                    'Matching', 'Sequence / Ordering', 'Short Answer',
                    'Difference / Comparison', 'Label the Diagram'
        user_answer : str, optional
            The answer provided by the student (for verification).
        options : list, optional
            List of option strings (for MCQ).
        correct_answer : str, optional
            The correct answer (for verification).

        Returns
        -------
        Dict with: is_correct, correct_answer, explanation, confidence,
                   step_by_step, topic, node
        """
        q_lower = question_text.lower().strip()

        node_id = self._identify_node(q_lower)
        result = {
            "node_id": node_id,
            "q_type": q_type,
            "user_answer": user_answer,
            "is_correct": None,
            "correct_answer": correct_answer or "",
            "explanation": "",
            "step_by_step": [],
            "confidence": 0.0,
            "topic": self._get_topic(node_id),
        }

        if q_type in ("Fill in the Blank",):
            result = self._solve_fill_blank(q_lower, user_answer,
                                            correct_answer, result)
        elif q_type == "Multiple Choice":
            result = self._solve_mcq(q_lower, options, user_answer,
                                     correct_answer, result)
        elif q_type == "True / False":
            result = self._solve_tf(q_lower, user_answer,
                                    correct_answer, result)
        elif q_type == "Matching":
            result = self._solve_matching(q_lower, user_answer,
                                          correct_answer, result)
        elif q_type == "Sequence / Ordering":
            result = self._solve_sequence(q_lower, user_answer,
                                          correct_answer, result)
        elif q_type == "Short Answer":
            result = self._solve_short_answer(q_lower, user_answer,
                                              correct_answer, result)
        elif q_type == "Difference / Comparison":
            result = self._solve_difference(q_lower, user_answer,
                                            correct_answer, result)

        self._history.append(result)
        return result

    # ── node identification ───────────────────
    def _identify_node(self, q_text: str) -> str:
        mito_kw = ["prophase", "metaphase", "anaphase", "telophase",
                    "mitosis", "cytokinesis", "cleavage furrow", "cell plate",
                    "spindle fibres"]
        cycle_kw = ["interphase", "G1", "G2", "S phase", "cell cycle",
                     "DNA content", "mitotic phase"]
        chromo_kw = ["chromatin", "chromatid", "centromere", "gene",
                      "double helix", "nucleotide", "deoxyribose",
                      "adenine", "thymine", "guanine", "cytosine",
                      "histone", "nucleosome"]

        mito_score = sum(1 for k in mito_kw if k in q_text)
        cycle_score = sum(1 for k in cycle_kw if k in q_text)
        chromo_score = sum(1 for k in chromo_kw if k in q_text)

        if mito_score >= cycle_score and mito_score >= chromo_score:
            return "c10_bio_003"
        elif cycle_score >= chromo_score:
            return "c10_bio_002"
        return "c10_bio_001"

    def _get_topic(self, node_id: str) -> str:
        return {
            "c10_bio_001": "Chromosome Structure",
            "c10_bio_002": "Cell Cycle",
            "c10_bio_003": "Mitosis",
        }.get(node_id, "Unknown")

    # ── step builders ─────────────────────────
    def _step(self, result: Dict, text: str):
        result["step_by_step"].append(text)

    # ── fill-blank solver ─────────────────────
    def _solve_fill_blank(self, q_text, user_ans, correct_ans, result):
        blank_m = re.search(r"________|______", q_text)
        blank_present = blank_m is not None

        self._step(result, "Step 1: Identify the blank in the question.")
        self._step(result, f"Step 2: Determine the biological concept being tested.")
        self._step(result, f"Step 3: Recall the definition/term from knowledge base.")

        node = result["node_id"]
        expected = correct_ans or self._lookup_fill_answer(q_text, node)

        self._step(result, f"Step 4: Expected answer = '{expected}'")

        if user_ans is not None:
            normalized_user = self._normalize(user_ans)
            normalized_expected = self._normalize(expected)
            is_correct = self._fuzzy_match(normalized_user, normalized_expected)
            result["correct_answer"] = expected
            result["is_correct"] = is_correct
            confidence = 0.95 if is_correct else 0.90
            result["confidence"] = confidence
            if is_correct:
                self._step(result, f"✓ Correct! '{user_ans}' matches '{expected}'.")
                result["explanation"] = self._get_explanation(q_text, node)
            else:
                self._step(result, f"✗ Incorrect. Got '{user_ans}', "
                                   f"expected '{expected}'.")
                result["explanation"] = self._get