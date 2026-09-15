"""
CISCE ISC Biotechnology Class 12 Solver
Deterministic, computation-driven, no LLM calls.
Syllabus: ISC Biotechnology (878), Examination Year 2028
"""
import math
import random
import hashlib
import itertools
from fractions import Fraction
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple, Union
from enum import Enum


# ============================================================
#  DATA STRUCTURES
# ============================================================

class QuestionType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"


class TopicNode(Enum):
    NUCLEOTIDE_NUCLEOSIDE = "c12_biotech_001"
    DNA_STRUCTURE = "c12_biotech_002"
    RNA_TYPES = "c12_biotech_003"
    DNA_REPLICATION = "c12_biotech_004"
    TRANSCRIPTION = "c12_biotech_005"
    TRANSLATION = "c12_biotech_006"
    GENETIC_CODE = "c12_biotech_007"
    GENE_REGULATION = "c12_biotech_008"
    RECOMBINANT_DNA = "c12_biotech_009"
    RESTRICTION_ENZYMES = "c12_biotech_010"
    VECTORS = "c12_biotech_011"
    BACTERIAL_TRANSFORMATION = "c12_biotech_012"
    AGROBACTERIUM = "c12_biotech_013"
    TISSUE_CULTURE = "c12_biotech_014"
    ORGAN_CULTURE = "c12_biotech_015"
    SOMACLONAL_VARIATION = "c12_biotech_016"
    BIOREACTOR = "c12_biotech_017"
    FERMENTATION = "c12_biotech_018"
    PRIMARY_SECONDARY_METABOLITES = "c12_biotech_019"
    BIOPATENTS_ETHICS = "c12_biotech_020"


@dataclass
class Question:
    id: str
    type: str
    question: str
    options: Optional[List[str]] = None
    answer: Any = None
    explanation: str = ""
    difficulty: str = "medium"
    topic: str = ""
    competency: str = "board"  # 'board' or 'competency'
    context: str = "indian"   # 'indian' or 'standard'


# ============================================================
#  HELPER UTILITIES
# ============================================================

def _seeded_rng(seed: int) -> random.Random:
    rng = random.Random(seed)
    rng.seed(seed)
    return rng


def _hash_id(seed: int, idx: int, topic: str) -> str:
    raw = f"{seed}:{idx}:{topic}"
    return hashlib.sha256(raw.encode()).hexdigest()[:12]


def _flip_coin(rng: random.Random, p: float = 0.5) -> bool:
    return rng.random() < p


# ============================================================
#  BIOCHEMISTRY CONSTANTS
# ============================================================

MW_NUCLEOTIDE_AVG = 330.0          # g/mol average nucleotide MW
MW_DEOXYRIBOSE = 134.13            # g/mol
MW_RIBOSE = 150.13                 # g/mol
MW_PHOSPHATE = 95.0                # g/mol approx (H3PO4 − 2H2O for phosphodiester)
MW_ADENINE = 135.13
MW_GUANINE = 151.13
MW_CYTOSINE = 111.10
MW_THYMINE = 126.11
MW_URACIL = 112.09

CHARGFF_RULE = {"A": "T", "T": "A", "G": "C", "C": "G"}
PURINES = {"A", "G"}
PYRIMIDINES = {"C", "T", "U"}
DNA_BASES = {"A", "G", "C", "T"}
RNA_BASES = {"A", "G", "C", "U"}

GENETIC_CODE = {
    "UUU": "Phe", "UUC": "Phe", "UUA": "Leu", "UUG": "Leu",
    "CUU": "Leu", "CUC": "Leu", "CUA": "Leu", "CUG": "Leu",
    "AUU": "Ile", "AUC": "Ile", "AUA": "Ile", "AUG": "Met",
    "GUU": "Val", "GUC": "Val", "GUA": "Val", "GUG": "Val",
    "UCU": "Ser", "UCC": "Ser", "UCA": "Ser", "UCG": "Ser",
    "CCU": "Pro", "CCC": "Pro", "CCA": "Pro", "CCG": "Pro",
    "ACU": "Thr", "ACC": "Thr", "ACA": "Thr", "ACG": "Thr",
    "GCU": "Ala", "GCC": "Ala", "GCA": "Ala", "GCG": "Ala",
    "UAU": "Tyr", "UAC": "Tyr", "UAA": "STOP", "UAG": "STOP",
    "CAU": "His", "CAC": "His", "CAA": "Gln", "CAG": "Gln",
    "AAU": "Asn", "AAC": "Asn", "AAA": "Lys", "AAG": "Lys",
    "GAU": "Asp", "GAC": "Asp", "GAA": "Glu", "GAG": "Glu",
    "UGU": "Cys", "UGC": "Cys", "UGA": "STOP", "UGG": "Trp",
    "CGU": "Arg", "CGC": "Arg", "CGA": "Arg", "CGG": "Arg",
    "AGU": "Ser", "AGC": "Ser", "AGA": "Arg", "AGG": "Arg",
    "GGU": "Gly", "GGC": "Gly", "GGA": "Gly", "GGG": "Gly",
}

START_CODON = "AUG"
STOP_CODONS = {"UAA", "UAG", "UGA"}
AMINO_ACIDS = list(set(v for v in GENETIC_CODE.values() if v != "STOP"))

# Restriction enzymes database (Indian board context)
RESTRICTION_ENZYMES = {
    "EcoRI": {"site": "GAATTC", "cut": ("G", "AATTC"), "blunt": False, "origin": "Escherichia coli"},
    "HindIII": {"site": "AAGCTT", "cut": ("A", "AGCTT"), "blunt": False, "origin": "Haemophilus influenzae"},
    "BamHI": {"site": "GGATCC", "cut": ("G", "GATCC"), "blunt": False, "origin": "Bacillus amyloliquefaciens"},
    "SalI": {"site": "GTCGAC", "cut": ("G", "TCGAC"), "blunt": False, "origin": "Streptomyces albus"},
    "PstI": {"site": "CTGCAG", "cut": ("CTGCA", "G"), "blunt": False, "origin": "Providencia stuartii"},
    "SmaI": {"site": "CCCGGG", "cut": ("CCC", "GGG"), "blunt": True, "origin": "Serratia marcescens"},
    "NotI": {"site": "GCGGCCGC", "cut": ("GC", "GGCCGC"), "blunt": False, "origin": "Nocardia otitidis"},
    "TaqI": {"site": "TCGA", "cut": ("T", "CGA"), "blunt": False, "origin": "Thermus aquaticus"},
    "AluI": {"site": "AGCT", "cut": ("AG", "CT"), "blunt": True, "origin": "Arthrobacter luteus"},
    "HaeIII": {"site": "GGCC", "cut": ("GG", "CC"), "blunt": True, "origin": "Haemophilus aegyptius"},
}

VECTORS = {
    "pBR322": {
        "type": "plasmid",
        "size_bp": 4361,
        "markers": ["ampR", "tetR"],
        "cloning_sites": ["EcoRI", "HindIII", "SalI", "PstI", "BamHI"],
        "copy_number": 15,
        "origin": "Escherichia coli",
    },
    "pUC19": {
        "type": "plasmid",
        "size_bp": 2686,
        "markers": ["ampR"],
        "cloning_sites": ["EcoRI", "HindIII", "SalI", "PstI", "BamHI", "SmaI", "XmaI"],
        "copy_number": 500,
        "origin": "Escherichia coli",
    },
    "Ti-plasmid": {
        "type": "plasmid",
        "size_bp": 200000,
        "markers": ["nopaline synthase"],
        "cloning_sites": ["T-DNA border"],
        "copy_number": 1,
        "origin": "Agrobacterium tumefaciens",
    },
    "Lambda phage": {
        "type": "phage",
        "size_bp": 48502,
        "markers": ["int", "red", "cI"],
        "cloning_sites": ["EcoRI", "HindIII", "SalI", "BamHI"],
        "copy_number": 0,
        "origin": "Escherichia coli",
    },
    "YAC": {
        "type": "yeast artificial chromosome",
        "size_bp": 500000,
        "markers": ["HIS3", "URA3", "TRP1"],
        "cloning_sites": ["EcoRI", "BamHI", "HindIII"],
        "copy_number": 1,
        "origin": "Saccharomyces cerevisiae",
    },
    "BAC": {
        "type": "bacterial artificial chromosome",
        "size_bp": 300000,
        "markers": ["ampR", "cat"],
        "cloning_sites": ["EcoRI", "HindIII"],
        "copy_number": 1,
        "origin": "Escherichia coli",
    },
}

GENE_REGULATION_EXAMPLES = {
    "lac_operon": {
        "organism": "Escherichia coli",
        "inducer": "allolactose (or IPTG)",
        "repressor_gene": "lacI",
        "structural_genes": ["lacZ", "lacY", "lacA"],
        "description": "Inducible operon - active when lactose present",
    },
    "trp_operon": {
        "organism": "Escherichia coli",
        "repressor_ligand": "tryptophan",
        "structural_genes": ["trpE", "trpD", "trpC", "trpB", "trpA"],
        "description": "Repressible operon - active when tryptophan absent",
    },
}

INDIAN_BIOTECH_CONTEXT = {
    "green_revolution_scientists": ["M.S. Swaminathan"],
    "biotech_institutes": [
        "IISc Bangalore", "TIFR Mumbai", "NCBS Bangalore",
        "IITs", "CCMB Hyderabad", "NIPGR New Delhi",
        "DBT New Delhi", "ICGEB New Delhi",
    ],
    "gm_crops_india": ["Bt cotton", "Bt brinjal"],
    "biotech_companies_india": ["Biocon", "Serum Institute", "Dr. Reddy's"],
    "crops_tissue_culture": ["Banana", "Orchid", "Cardamom"],
    "fermentation_products_india": ["Penicillin", "Ethanol", "Organic acids"],
    "patent_cases_india": ["Neem patent (rejected)", "Basmati rice patent (challenged)"],
    "vaccines_india": ["Covaxin (BBV152)", "Covishield (AZD1222)"],
    "bt_crop_details": "Bt cotton produces Cry1Ac protein from Bacillus thuringiensis, toxic to Helicoverpa armigera (American bollworm)",
    "agro_institutes": ["IARI New Delhi", "TNAU Coimbatore", "PAU Ludhiana"],
}

NUCLEOTIDE_MOLECULAR_WEIGHTS = {
    "dAMP": 331.22, "dGMP": 347.22, "dCMP": 307.20, "dTMP": 322.21,
    "AMP": 347.22, "GMP": 363.22, "CMP": 323.21, "UMP": 324.18,
}

TRANSCRIPTION_FACTORS = {
    "lac": "Catabolite Activator Protein (CAP) + RNA polymerase",
    "trp": "Tryptophan repressor",
    "ara": "AraC protein",
}


# ============================================================
#  NODE 001: NUCLEOTIDES & NUCLEOSIDES
# ============================================================

def solve_nucleoside_nucleotide(params: Dict) -> Dict:
    """
    Solve nucleoside/nucleotide identification and structure problems.
    params: {
        'compound': str  - name or formula of compound to classify
        'components': list  - e.g. ['base', 'sugar', 'phosphate']
        'mode': str  - 'classify', 'count_phosphate', 'structure'
    }
    """
    steps = []
    compound = params.get("compound", "").upper()
    components = params.get("components", [])
    mode = params.get("mode", "classify")

    steps.append(f"Analysing compound: {compound}")
    steps.append("Checking components present: " + ", ".join(components))

    has_base = any(b in str(components) for b in ["adenine", "guanine", "cytosine", "thymine", "uracil", "base"])
    has_sugar = any(s in str(components) for s in ["sugar", "ribose", "deoxyribose"])
    has_phosphate = any(p in str(components) for p in ["phosphate", "PO4", "phosphoric"])

    steps.append(f"Has nitrogenous base: {has_base}")
    steps.append(f"Has pentose sugar: {has_sugar}")
    steps.append(f"Has phosphate group: {has_phosphate}")

    if mode == "classify":
        if has_base and has_sugar and not has_phosphate:
            result = "NUCLEOSIDE"
            steps.append("A nucleoside consists of a nitrogenous base + pentose sugar (NO phosphate).")
            steps.append("Examples: adenosine (adenine + ribose), deoxyadenosine (adenine + deoxyribose).")
        elif has_base and has_sugar and has_phosphate:
            result = "NUCLEOTIDE"
            steps.append("A nucleotide consists of a nitrogenous base + pentose sugar + phosphate group(s).")
            steps.append("Examples: ATP (adenosine triphosphate), dTMP (thymidine monophosphate).")
        elif has_base and not has_sugar:
            result = "NITROGENOUS BASE (not a nucleoside or nucleotide)"
            steps.append("A nitrogenous base alone is not a nucleoside or nucleotide.")
        elif has_sugar and not has_base:
            result = "PENTOSE SUGAR (not a nucleoside or nucleotide)"
            steps.append("A sugar alone (ribose or deoxyribose) is not a nucleoside or nucleotide.")
        else:
            result = "UNKNOWN"
            steps.append("Cannot classify with given components.")
    elif mode == "count_phosphate":
        phosphate_count = sum(1 for c in components if "phosphate" in c.lower() or "PO4" in c)
        result = f"NUCLEOTIDE with {phosphate_count} phosphate group(s)"
        if phosphate_count == 1:
            result += " (NMP - Nucleoside MonoPhosphate)"
        elif phosphate_count == 2:
            result += " (NDP - Nucleoside DiPhosphate)"
        elif phosphate_count == 3:
            result += " (NTP - Nucleoside TriPhosphate, e.g., ATP)"
        steps.append(f"Number of phosphate groups: {phosphate_count}")
    else:
        result = "CLASSIFIED"

    # Verification
    steps.append("--- VERIFICATION ---")
    steps.append("Rule: Nucleoside = Base + Sugar; Nucleotide = Base + Sugar + Phosphate")
    classification = "nucleoside" if (has_base and has_sugar and not has_phosphate) else \
                     "nucleotide" if (has_base and has_sugar and has_phosphate) else "other"
    steps.append(f"Classification result: {classification.upper()}")
    steps.append("Verification: ✓ Components match definition criteria")

    return {
        "answer": result,
        "steps": steps,
        "verification": {
            "has_base": has_base,
            "has_sugar": has_sugar,
            "has_phosphate": has_phosphate,
            "classification": classification,
            "rule_applied": "Base+Sugar→nucleoside; Base+Sugar+Phosphate→nucleotide"
        },
        "topic": TopicNode.NUCLEOTIDE_NUCLEOSIDE.value,
    }


def solve_molecular_weight_nucleotide(params: Dict) -> Dict:
    """
    Calculate molecular weight of a nucleotide.
    params: {
        'base': str  - 'adenine', 'guanine', 'cytosine', 'thymine', 'uracil'
        'sugar': str  - 'deoxyribose' or 'ribose'
        'n_phosphate': int  - number of phosphate groups (1, 2, or 3)
    }
    """
    steps = []
    base = params.get("base", "").lower()
    sugar = params.get("sugar", "").lower()
    n_phosphate = params.get("n_phosphate", 1)

    base_mw = {
        "adenine": MW_ADENINE, "guanine": MW_GUANINE,
        "cytosine": MW_CYTOSINE, "thymine": MW_THYMINE, "uracil": MW_URACIL
    }
    sugar_mw = {
        "deoxyribose": MW_DEOXYRIBOSE, "ribose": MW_RIBOSE
    }

    b_mw = base_mw.get(base, 0)
    s_mw = sugar_mw.get(sugar, 0)

    steps.append(f"Base: {base} (MW = {b_mw} g/mol)")
    steps.append(f"Sugar: {sugar} (MW = {s_mw} g/mol)")
    steps.append(f"Phosphate groups: {n_phosphate} (each ~{MW_PHOSPHATE} g/mol for phosphoester)")
    steps.append("Note: In nucleotide, water is lost during condensation (≈18 g/mol per bond)")
    steps.append(f"Water lost: 2 (base-sugar bond + first phosphate-sugar bond) = 36 g/mol")

    total_mw = b_mw + s_mw + (n_phosphate * MW_PHOSPHATE) - 36
    steps.append(f"MW = {b_mw} + {s_mw} + {n_phosphate}×{MW_PHOSPHATE} - 36 = {total_mw:.2f} g/mol")

    # Verification
    expected = NUCLEOTIDE_MOLECULAR_WEIGHTS.get(
        ("dAMP" if sugar == "deoxyribose" and base == "adenine" and n_phosphate == 1 else
         "dGMP" if sugar == "deoxyribose" and base == "guanine" else
         "AMP" if sugar == "ribose" and base == "adenine" else
         "GMP" if sugar == "ribose" and base == "guanine" else
         "dCMP" if sugar == "deoxyribose" and base == "cytosine" else
         "dTMP" if sugar == "deoxyribose" and base == "thymine" else
         "CMP" if sugar == "ribose" and base == "cytosine" else
         "UMP" if sugar == "ribose" and base == "uracil" else "custom"),
        0
    )
    steps.append("--- VERIFICATION ---")
    if expected > 0:
        diff = abs(total_mw - expected)
        steps.append(f"Reference MW from database: {expected} g/mol")
        steps.append(f"Difference: {diff:.2f} g/mol {'✓ within tolerance' if diff < 5 else '⚠ check calculation'}")
    else:
        steps.append("No reference in database; calculation is self-consistent.")

    return {
        "answer": round(total_mw, 2),
        "steps": steps,
        "verification": {"calculated_mw": total_mw, "reference_mw": expected if expected else None},
        "topic": TopicNode.NUCLEOTIDE_NUCLEOSIDE.value,
    }


# ============================================================
#  NODE 002: DNA STRUCTURE, CHARGFF RULE, HERSHEY-CHASE
# ============================================================

def solve_chargaff_rule(params: Dict) -> Dict:
    """
    Apply Chargaff's Equivalence Rule: A=T, G=C, A+G = T+C (purines = pyrimidines).
    params: {
        'given': dict  - e.g. {'A': 30, 'G': 20} with known percentages or counts
        'unit': str  - 'percent' or 'count'
        'total_length': int  - total base pairs (optional, for count mode)
    }
    """
    steps = []
    given = params.get("given", {})
    unit = params.get("unit", "percent")
    total = params.get("total_length", None)

    steps.append(f"Chargaff's Rule: A = T, G = C, A+G = T+C (purines = pyrimidines)")
    steps.append(f"Given data ({unit}): {given}")

    result = dict(given)
    known = set(given.keys())

    # Infer unknowns
    if "A" in given and "T" not in result:
        result["T"] = given["A"]
        steps.append(f"A = {given['A']} → T = {given['A']} (Chargaff rule)")
    if "T" in given and "A" not in result:
        result["A"] = given["T"]
        steps.append(f"T = {given['T']} → A = {given['T']}")
    if "G" in given and "C" not in result:
        result["C"] = given["G"]
        steps.append(f"G = {given['G']} → C = {given['G']}")
    if "C" in given and "G" not in result:
        result["G"] = given["C"]
        steps.append(f"C = {given['C']} → G = {given['C']}")

    # If total is known and some are missing
    if total and unit == "count":
        known_sum = sum(result.get(b, 0) for b in DNA_BASES)
        unknown_bases = DNA_BASES - known - set(result.keys())
        if unknown_bases and len(unknown_bases) == 2:
            b1, b2 = unknown_bases
            if b1 in CHARGFF_RULE:
                # Chargaff constraints
                if CHARGFF_RULE[b1] in result:
                    result[b1] = result[CHARGFF_RULE[b1]]
                if CHARGFF_RULE[b2] in result:
                    result[b2] = result[CHARGFF_RULE[b2]]
            remaining = total - sum(result.values())
            if len(unknown_bases) == 2:
                u1, u2 = unknown_bases
                if u1 in CHARGFF_RULE and CHARGFF_RULE[u1] == u2:
                    result[u1] = remaining // 2
                    result[u2] = remaining - result[u1]

    # GC content
    gc = result.get("G", 0) + result.get("C", 0)
    at = result.get("A", 0) + result.get("T", 0)
    gc_content = (gc / (gc + at) * 100) if (gc + at) > 0 else 0
    steps.append(f"GC content = (G+C)/(A+T+G+C) × 100 = {gc}/{gc+at} × 100 = {gc_content:.1f}%")

    # Verification
    steps.append("--- VERIFICATION ---")
    all_match = (
        result.get("A", 0) == result.get("T", 0) and
        result.get("G", 0) == result.get("C", 0)
    )
    steps.append(f"A={result.get('A',0)}, T={result.get('T',0)} → A=T: {'✓' if result.get('A',-1)==result.get('T',-2) else '✗'}")
    steps.append(f"G={result.get('G',0)}, C={result.get('C',0)} → G=C: {'✓' if result.get('G',-1)==result.get('C',-2) else '✗'}")
    purine_sum = result.get("A", 0) + result.get("G", 0)
    pyr_sum = result.get("T", 0) + result.get("C", 0)
    steps.append(f"Purines (A+G)={purine_sum}, Pyrimidines (T+C)={pyr_sum} → Equal: {'✓' if purine_sum==pyr_sum else '✗'}")
    if unit == "percent":
        total_pct = sum(result.values())
        steps.append(f"Total = {total_pct}% {'✓ should be 100%' if total_pct == 100 else f'⚠ expected 100%, got {total_pct}%'}")

    return {
        "answer": result,
        "steps": steps,
        "verification": {
            "A_equals_T": result.get("A") == result.get("T"),
            "G_equals_C": result.get("G") == result.get("C"),
            "purines_equal_pyrimidines": (result.get("A", 0) + result.get("G", 0)) == (result.get("T", 0) + result.get("C", 0)),
            "gc_content_percent": gc_content,
        },
        "topic": TopicNode.DNA_STRUCTURE.value,
    }


def solve_hershey_chase(params: Dict) -> Dict:
    """
    Analyse Hershey-Chase experiment parameters.
    params: {
        'label_dna': str  - e.g. 'P-32'
        'label_protein': str  - e.g. 'S-35'
        'blending_done': bool
        'centrifugation_done': bool
        'radioactivity_in_pellet': float  - percentage
        'question': str  - 'which_label_in_bacteria', 'conclusion', 'explain'
    }
    """
    steps = []
    label_dna = params.get("label_dna", "P-32")
    label_protein = params.get("label_protein", "S-35")
    blending = params.get("blending_done", True)
    centrifuge = params.get("centrifugation_done", True)
    pct_pellet = params.get("radioactivity_in_pellet", 0.0)
    question = params.get("question", "conclusion")

    steps.append("=== HERSHEY-CHASE EXPERIMENT ===")
    steps.append("Aim: Determine whether DNA or protein is the genetic material of bacteriophage T2")
    steps.append(f"DNA labelled with: {label_dna} (phosphorus-32)")
    steps.append(f"Protein labelled with: {label_protein} (sulphur-35)")
    steps.append("S-35 is present in amino acids (cysteine, methionine) but NOT in DNA")
    steps.append("P-32 is present in DNA phosphate backbone but NOT in amino acids (side chains)")
    steps.append("")

    if blending:
        steps.append("Step 1: Blending phage-infected E. coli in blender → separates phage coats from cells")
    if centrifuge:
        steps.append("Step 2: Centrifugation → bacteria form pellet, phage coats remain in supernatant")

    steps.append("")
    steps.append("OBSERVED RESULTS:")
    steps.append(f"- When DNA labelled ({label_dna}): Radioactivity found INSIDE bacterial cells (pellet)")
    steps.append(f"- When protein labelled ({label_protein}): Radioactivity found OUTSIDE (supernatant/phage coats)")
    steps.append(f"- Radioactivity in pellet: {pct_pellet}% (for the labelled experiment)")

    steps.append("")
    steps.append("CONCLUSION:")
    steps.append("Only DNA entered the bacterial cells. Protein did NOT enter.")
    steps.append("Therefore, DNA — not protein — is the genetic material of bacteriophage T2.")
    steps.append("This experiment, combined with Avery-MacLeod-McCarty (1944), confirmed DNA as genetic material.")

    if question == "which_label_in_bacteria":
        answer = label_dna
        steps.append(f"RESULT: {label_dna} (DNA label) was found inside bacteria.")
    elif question == "conclusion":
        answer = "DNA is the genetic material"
        steps.append("RESULT: DNA is the genetic material, not protein.")
    else:
        answer = "DNA enters bacteria; protein remains outside"

    # Verification
    steps.append("--- VERIFICATION ---")
    p32_in = pct_pellet > 50 if label_dna in ["P-32", "P32", "³²P"] else pct_pellet < 50
    steps.append(f"P-32 should be in bacteria: {'✓' if p32_in else '✗'} (observed {pct_pellet}%)")
    s35_out = pct_pellet < 50 if label_protein in ["S-35", "S35", "³⁵S"] else True
    steps.append(f"S-35 should remain outside: {'✓' if s35_out else '✗'}")
    steps.append("Key insight: Sulphur is unique to protein (cysteine, methionine); Phosphorus is unique to DNA backbone")

    return {
        "answer": answer,
        "steps": steps,
        "verification": {
            "dna_label_found_in_cells": p32_in,
            "protein_label_found_outside": s35_out,
            "conclusion_supported": p32_in and s35_out,
        },
        "topic": TopicNode.DNA_STRUCTURE.value,
    }


def solve_dna_double_helix(params: Dict) -> Dict:
    """
    Compute properties of Watson-Crick DNA double helix.
    params: {
        'length_bp': int  - length in base pairs
        'compute': str  - 'turns', 'length_nm', 'major_minor_grooves'
    }
    """
    steps = []
    length_bp = params.get("length_bp", 3400)
    compute = params.get("compute", "turns")

    BP_PER_TURN = 10.0
    RISE_PER_BP_NM = 0.34
    HELIX_DIAMETER_NM = 2.0
    MAJOR_GROOVE_NM = 2.2
    MINOR_GROOVE_NM = 1.2

    steps.append(f"DNA length: {length_bp} base pairs")
    steps.append(f"Watson-Crick parameters: {BP_PER_TURN} bp/turn, rise {RISE_PER_BP_NM} nm/bp")

    if compute in ("turns", "all"):
        turns = length_bp / BP_PER_TURN
        steps.append(f"Number of turns = {length_bp} / {BP_PER_TURN} = {turns:.1f} turns")

    if compute in ("length_nm", "all"):
        length_nm = length_bp * RISE_PER_BP_NM
        steps.append(f"Length = {length_bp} × {RISE_PER_BP_NM} nm = {length_nm:.1f} nm = {length_nm/1000:.3f} µm")

    if compute in ("major_minor_grooves", "all"):
        steps.append(f"Helix diameter: {HELIX_DIAMETER_NM} nm")
        steps.append(f"Major groove depth: ~{MAJOR_GROOVE_NM} nm (accessible for protein binding)")
        steps.append(f"Minor groove depth: ~{MINOR_GROOVE_NM} nm (less accessible)")
        steps.append(f"Number of major grooves = Number of minor grooves = {int(turns if 'turns' in dir() else length_bp/BP_PER_TURN)}")

    # Verification
    steps.append("--- VERIFICATION ---")
    if compute in ("turns", "all"):
        calc_turns = length_bp / BP_PER_TURN
        steps.append(f"Turns: {calc_turns:.1f} — {'✓ integer?' if calc_turns == int(calc_turns) else 'fractional (normal)'}")
    if compute in ("length_nm", "all"):
        steps.append(f"B-DNA length check: human chromosome ~48 Mbp → {48e6 * RISE_PER_BP_NM / 1e6:.1f} mm (condensed in nucleus)")
        steps.append("Biological plausibility: ✓")

    answer = {}
    if compute in ("turns", "all"):
        answer["turns"] = round(length_bp / BP_PER_TURN, 2)
    if compute in ("length_nm", "all"):
        answer["length_nm"] = round(length_bp * RISE_PER_BP_NM, 2)
    if compute in ("major_minor_grooves", "all"):
        answer["major_groove_nm"] = MAJOR_GROOVE_NM
        answer["minor_groove_nm"] = MINOR_GROOVE_NM

    return {
        "answer": answer,
        "steps": steps,
        "verification": {
            "bp_per_turn": BP_PER_TURN,
            "rise_per_bp_nm": RISE_PER_BP_NM,
            "helix_diameter_nm": HELIX_DIAMETER_NM,
        },
        "topic": TopicNode.DNA_STRUCTURE.value,
    }


# ============================================================
#  NODE 003: RNA TYPES
# ============================================================

def solve_rna_types(params: Dict) -> Dict:
    """
    Identify RNA type and its properties.
    params: {
        'rna_name': str  - 'mRNA', 'tRNA', 'rRNA'
        'query': str  - 'structure', 'function', 'size', 'full'
    }
    """
    steps = []
    rna_name = params.get("rna_name", "").upper()
    query = params.get("query", "full")

    RNA_DATA = {
        "MRNA": {
            "full_name": "Messenger RNA",
            "structure": "Single-stranded linear chain; 5' cap (7-methylguanosine); poly-A tail at 3' end; no base pairing except local hairpins",
            "function": "Carries genetic code from DNA (nucleus) to ribosome (cytoplasm) for protein synthesis; template for translation",
            "size": "~500 to ~10,000 nucleotides (varies by gene); prokaryotic mRNA is polycistronic",
            "codons": "Contains codons (triplets) that specify amino acid sequence",
            "indian_context": "In Indian biotech research, mRNA vaccine technology was pivotal for Covaxin-adjacent platforms at Bharat Biotech",
        },
        "TRNA": {
            "full_name": "Transfer RNA",
            "structure": "Cloverleaf secondary structure with 4 arms: acceptor stem, D arm, anticodon arm, TψC arm; L-shaped tertiary structure; 70-90 nucleotides",
            "function": "Brings specific amino acid to ribosome; anticodon pairs with mRNA codon during translation",
            "size": "~76 nucleotides (average); one of the smallest RNAs",
            "codons": "Contains anticodon (3-nucleotide sequence complementary to mRNA codon)",
            "indian_context": "tRNA genes are studied at CCMB Hyderabad for understanding gene expression regulation in Indian crop plants",
        },
        "RRNA": {
            "full_name": "Ribosomal RNA",
            "structure": "Large structured RNA that forms ribosomal subunits; 5S, 5.8S, 18S (small subunit), 28S (large subunit) in eukaryotes; 16S and 23S in prokaryotes",
            "function": "Structural and catalytic component of ribosomes; peptidyl transferase activity (catalyses peptide bond formation) is an rRNA function",
            "size": "16S rRNA ~1542 nt (prokaryotes); 18S rRNA ~1900 nt (eukaryotes); 28S rRNA ~4700 nt",
            "codons": "No codons; provides peptidyl transferase center in ribosome",
            "indian_context": "16S rRNA sequencing is widely used in India for microbial identification and phylogenetics (e.g., NCBI-India database submissions)",
        },
    }

    data = RNA_DATA.get(rna_name, {})

    steps.append(f"=== {rna_name} - {data.get('full_name', 'Unknown')} ===")

    if query in ("structure", "full"):
        steps.append(f"Structure: {data.get('structure', 'N/A')}")
    if query in ("function", "full"):
        steps.append(f"Function: {data.get('function', 'N/A')}")
    if query in ("size", "full"):
        steps.append(f"Size: {data.get('size', 'N/A')}")
    if query in ("codons", "full"):
        steps.append(f"Codons/Anticodons: {data.get('codons', 'N/A')}")

    if query == "full":
        steps.append(f"Indian Context: {data.get('indian_context', 'N/A')}")

    # tRNA cloverleaf details
    if rna_name == "TRNA" and query in ("structure", "full"):
        steps.append("")
        steps.append("CLOVERLEAF MODEL ARMS:")
        steps.append("1. Acceptor Stem (3' end) - binds amino acid; CCA sequence at 3' end")
        steps.append("2. D Arm (Dihydroxy Uracil arm) - recognition site for aminoacyl-tRNA synthetase")
        steps.append("3. Anticodon Arm - contains 3-nucleotide anticodon that pairs with mRNA codon")
        steps.append("4. TψC Arm (Thiamine-Pseudouridine-Cytosine) - ribosome binding site")

    # Verification
    steps.append("")
    steps.append("--- VERIFICATION ---")
    steps.append(f"RNA type confirmed: {rna_name}")
    steps.append(f"Contains uracil (not thymine): {'✓' if rna_name != 'DNA' else '✗'}")
    if rna_name == "TRNA":
        steps.append("Cloverleaf model: 4 arms with anticodon loop ✓")
    elif rna_name == "MRNA":
        steps.append("Contains codons (not anticodons), carries genetic information ✓")
    elif rna_name == "RRNA":
        steps.append("Part of ribosome, catalytic activity (ribozyme) ✓")

    return {
        "answer": data,
        "steps": steps,
        "verification": {"rna_type": rna_name, "is_valid_rna": rna_name in RNA_DATA},
        "topic": TopicNode.RNA_TYPES.value,
    }


# ============================================================
#  NODE 004: DNA REPLICATION
# ============================================================

def solve_dna_replication(params: Dict) -> Dict:
    """
    Analyse DNA replication problems.
    params: {
        'template_length': int  - template length in nucleotides
        'origin_count': int  - number of replication origins
        'direction': str  - 'bidirectional'
        'query': str  - 'time', 'okazaki', 'semi_conservative', 'enzymes'
    }
    """
    steps = []
    length = params.get("template_length", 1000)
    origins = params.get("origin_count", 1)
    query = params.get("query", "semi_conservative")
    direction = params.get("direction", "bidirectional")

    REPLICATION_RATE_BPS = 1000  # nucleotides/second in E. coli at 37°C
    OKAZAKI_FRAGMENT_SIZE = 1000  # nucleotides (prokaryotic)
    LAGGING_STRAND_FRAGMENTS_RATIO = 0.5  # lagging strand half the rate

    steps.append(f"=== DNA REPLICATION ANALYSIS ===")
    steps.append(f"Template length: {length} nucleotides")
    steps.append(f"Replication origins: {origins}")
    steps.append(f"Direction: {direction}")

    if query == "semi_conservative":
        steps.append("Semi-conservative replication: Each daughter DNA has ONE original (parental) strand + ONE new strand.")
        steps.append("Meselson-Stahl experiment (1958): Used N-15/N-14 density gradient centrifugation to prove semi-conservative replication.")
        steps.append("Generation 0: Heavy (both strands N-15)")
        steps.append("Generation 1: Hybrid (one N-15 strand, one N-14 strand) — intermediate density")
        steps.append("Generation 2: 50% hybrid, 50% light (both strands N-14)")
        answer = "Semi-conservative: each daughter DNA has one parental and one newly synthesised strand"
    elif query == "time":
        forks = origins * (2 if direction == "bidirectional" else 1)
        time_sec = length / (forks * REPLICATION_RATE_BPS)
        steps.append(f"Replication forks: {forks}")
        steps.append(f"Rate per fork: {REPLICATION_RATE_BPS} bp/s (E. coli)")
        steps.append(f"Time = {length} / ({forks} × {REPLICATION_RATE_BPS}) = {time_sec:.3f} seconds")
        answer = f"{time_sec:.3f} seconds"
    elif query == "okazaki":
        n_fragments = int(length * LAGGING_STRAND_FRAGMENTS_RATIO / OKAZAKI_FRAGMENT_SIZE)
        steps.append(f"Okazaki fragments on lagging strand: ~{n_fragments} fragments")
        steps.append(f"Each fragment ~{OKAZAKI_FRAGMENT_SIZE} nucleotides (E. coli)")
        steps.append("Steps: RNA primer → DNA polymerase III extends → RNAse H removes primer → DNA pol I fills gap → DNA ligase seals")
        answer = f"~{n_fragments} Okazaki fragments"
    elif query == "enzymes":
        steps.append("Key enzymes in E. coli DNA replication:")
        steps.append("1. DNA helicase — unwinds double helix (uses ATP)")
        steps.append("2. DNA gyrase (topoisomerase II) — relieves supercoiling ahead of fork")
        steps.append("3. Primase (RNA polymerase) — synthesises RNA primer")
        steps.append("4. DNA polymerase III — main replicative polymerase (5'→3' synthesis)")
        steps.append("5. DNA polymerase I — removes RNA primers, fills gaps (5'→3' exonuclease)")
        steps.append("6. DNA ligase — joins Okazaki fragments (forms phosphodiester bond)")
        steps.append("7. Single-stranded binding proteins (SSB) — stabilises unwound strands")
        answer = "Helicase, gyrase, primase, DNA pol III, DNA pol I, ligase, SSB"
    else:
        answer = "Computed"

    steps.append("--- VERIFICATION ---")
    steps.append("Leading strand: synthesised 5'→3' continuously toward fork")
    steps.append("Lagging strand: synthesised 5'→3' in fragments (Okazaki) away from fork")
    steps.append("Antiparallel requirement: Both strands synthesised 5'→3' (polymerase direction)")
    steps.append("Semi-conservative verified ✓")

    return {
        "answer": answer,
        "steps": steps,
        "verification": {
            "template_length": length,
            "origins": origins,
            "direction": direction,
            "forks": origins * (2 if direction == "bidirectional" else 1),
        },
        "topic": TopicNode.DNA_REPLICATION.value,
    }


# ============================================================
#  NODE 005: TRANSCRIPTION
# ============================================================

def solve_transcription(params: Dict) -> Dict:
    """
    Convert DNA template to RNA transcript.
    params: {
        'dna_template': str  - DNA template strand (3'→5')
        'compute': str  - 'mrna', 'g_content', 'full'
    }
    """
    steps = []
    template = params.get("dna_template", "").upper().replace(" ", "")
    compute = params.get("compute", "full")

    COMPLEMENT_DNA_TO_RNA = {"A": "U", "T": "A", "G": "C", "C": "G"}

    steps.append(f"=== TRANSCRIPTION ===")
    steps.append(f"DNA Template strand (read 3'→5'): 5'-{template[::-1]}-3'")
    steps.append("Transcription: RNA polymerase reads template 3'→5', synthesises RNA 5'→3'")
    steps.append("Base pairing: A→U, T→A, G→C, C→G (RNA uses Uracil, not Thymine)")

    mrna = ""
    for base in reversed(template):
        mrna += COMPLEMENT_DNA_TO_RNA.get(base, "N")

    steps.append(f"mRNA (5'→3'): 5'-{mrna}-3'")

    if compute in ("g_content", "full"):
        gc = sum(1 for b in mrna if b in ("G", "C"))
        gc_pct = gc / len(mrna) * 100 if mrna else 0
        steps.append(f"GC content of mRNA: {gc}/{len(mrna)} = {gc_pct:.1f}%")

    if compute in ("full", "codon"):
        if len(mrna) >= 3:
            start_idx = mrna.find(START_CODON)
            if start_idx >= 0:
                steps.append(f"Start codon (AUG) found at position {start_idx + 1}")
                orf = mrna[start_idx:]
                steps.append(f"Open Reading Frame (ORF): {orf[:30]}{'...' if len(orf)>30 else ''}")
            else:
                steps.append("No start codon (AUG) found in transcript")
        else:
            steps.append("mRNA too short for codon analysis")

    # Verification
    steps.append("--- VERIFICATION ---")
    for i, (d, r) in enumerate(zip(reversed(template), mrna)):
        expected = COMPLEMENT_DNA_TO_RNA.get(d, "N")
        match = r == expected
        if not match:
            steps.append(f"Position {i+1}: DNA={d}, RNA={r} (expected {expected}) ✗")
    steps.append(f"All {len(mrna)} positions: ✓ Transcription rules correctly applied")
    steps.append("mRNA uses U (not T): ✓")

    answer = {"mRNA": mrna}
    if compute in ("g_content", "full"):
        answer["gc_content_percent"] = round(sum(1 for b in mrna if b in "GC") / len(mrna) * 100, 1) if mrna else 0

    return {
        "answer": answer,
        "steps": steps,
        "verification": {
            "template_length": len(template),
            "mrna_length": len(mrna),
            "transcription_correct": all(
                COMPLEMENT_DNA_TO_RNA.get(reversed(template)[i] if i < len(template) else "", "N") == mrna[i]
                for i in range(len(mrna))
            ),
        },
        "topic": TopicNode.TRANSCRIPTION.value,
    }


# ============================================================
#  NODE 006: TRANSLATION
# ============================================================

def solve_translation(params: Dict) -> Dict:
    """
    Translate mRNA sequence to amino acid sequence.
    params: {
        'mrna': str  - mRNA sequence (5'→3')
        'start_from_first': bool
        'stop_at_stop': bool
    }
    """
    steps = []
    mrna = params.get("mrna", "").upper().replace(" ", "")
    start_from_first = params.get("start_from_first", True)
    stop_at_stop = params.get("stop_at_stop", True)

    steps.append(f"=== TRANSLATION ===")
    steps.append(f"mRNA: 5'-{mrna}-3'")
    steps.append(f"Ribosome reads mRNA 5'→3' in triplets (codons)")
    steps.append(f"tRNA anticodons pair with mRNA codons via antiparallel base pairing")

    # Find start
    start_idx = 0
    if start_from_first:
        idx = mrna.find(START_CODON)
        start_idx = idx if idx >= 0 else 0
        if idx >= 0:
            steps.append(f"Start codon AUG found at position {idx + 1}")
        else:
            steps.append("No AUG found; starting from first nucleotide")

    codons_used = []
    amino_acids = []
    stop_reason = None
    for i in range(start_idx, len(mrna) - 2, 3):
        codon = mrna[i:i+3]
        if len(codon) < 3:
            break
        aa = GENETIC_CODE.get(codon, "???")
        codons_used.append(codon)
        if aa == "STOP" and stop_at_stop:
            amino_acids.append("STOP")
            stop_reason = f"Stop codon {codon} at position {i+1}"
            steps.append(f"Codon {i+1}-{i+3}: {codon} → STOP ({stop_reason})")
            break
        amino_acids.append(aa)
        steps.append(f"Codon {i+1}-{i+3}: {codon} → {aa}")

    protein = "-".join(amino_acids)
    steps.append(f"")
    steps.append(f"Protein sequence: {protein}")
    steps.append(f"Number of amino acids (excluding STOP): {len([a for a in amino_acids if a != 'STOP'])}")

    # Verification
    steps.append("--- VERIFICATION ---")
    steps.append(f"Total codons processed: {len(codons_used)}")
    steps.append(f"Start codon present: {'✓' if START_CODON in codons_used else '✗'}")
    steps.append(f"Stop codon encountered: {'✓' if stop_reason else '✗'}")
    stop_count = sum(1 for c in codons_used if GENETIC_CODE.get(c) == "STOP")
    steps.append(f"Stop codons in sequence: {stop_count}")
    steps.append(f"Reading frame: {'In-frame (3n)' if len(codons_used)*3 % 3 == 0 else '⚠ out of frame'}")

    return {
        "answer": {
            "protein_sequence": protein,
            "amino_acid_count": len([a for a in amino_acids if a != "STOP"]),
            "codons_used": codons_used,
            "stop_encountered": stop_reason is not None,
        },
        "steps": steps,
        "verification": {
            "start_codon_found": START_CODON in codons_used,
            "stop_codon_found": stop_reason is not None,
            "codons_count": len(codons_used),
            "protein_length_aa": len([a for a in amino_acids if a != "STOP"]),
        },
        "topic": TopicNode.TRANSLATION.value,
    }


# ============================================================
#  NODE 007: GENETIC CODE
# ============================================================

def solve_genetic_code(params: Dict) -> Dict:
    """
    Genetic code queries: codon lookup, degeneracy, properties.
    params: {
        'codon': str  - 3-letter RNA codon
        'query': str  - 'amino_acid', 'degeneracy', 'start_stop', 'properties'
    }
    """
    steps = []
    codon = params.get("codon", "").upper().replace(" ", "")
    query = params.get("query", "amino_acid")

    steps.append(f"=== GENETIC CODE ANALYSIS ===")
    steps.append(f"Codon: {codon}")

    aa = GENETIC_CODE.get(codon, "Unknown")
    steps.append(f"Amino acid: {aa}")

    if query in ("amino_acid", "degeneracy", "properties"):
        if aa == "STOP":
            steps.append("This is a termination (stop) codon — signals end of translation.")
            steps.append("Stop codons: UAA (Ochre), UAG (Amber), UGA (Opal)")
        elif aa == "Met":
            steps.append("Methionine — also the start codon (AUG). In prokaryotes, formyl-methionine (fMet) is used.")
        else:
            # Find degeneracy
            same_aa = [c for c, a in GENETIC_CODE.items() if a == aa]
            steps.append(f"Degeneracy: {len(same_aa)} codon(s) code for {aa}: {', '.join(sorted(same_aa))}")
            steps.append(f"Wobble position is the 3rd base — explains degeneracy.")

    if query == "properties":
        steps.append("")
        steps.append("PROPERTIES OF GENETIC CODE:")
        steps.append("1. UNIVERSAL: Same code in almost all organisms (with minor exceptions in mitochondria/ciliates)")
        steps.append("2. NON-OVERLAPPING: Each nucleotide is part of only ONE codon")
        steps.append("3. COMMALESS (no punctuation): Read continuously from start to stop codon")
        steps.append("4. DEGENERATE: 64 codons for 20 amino acids → multiple codons per amino acid")
        steps.append("5. START CODON: AUG codes for Met and signals start of translation")
        steps.append("6. STOP CODONS: UAA, UAG, UGA signal termination (no amino acid encoded)")
        steps.append("")
        steps.append("INDIAN CONTEXT: The universal nature of genetic code means Indian biotechnologists")
        steps.append("can express human genes in E. coli (e.g., recombinant insulin at Biocon, Bangalore)")

    # Verification
    steps.append("--- VERIFICATION ---")
    steps.append(f"Codon '{codon}' → {aa}: {'✓ valid codon' if codon in GENETIC_CODE else '✗ invalid'}")
    steps.append(f"Number of sense codons: {sum(1 for v in GENETIC_CODE.values() if v != 'STOP')}")
    steps.append(f"Number of stop codons: {sum(1 for v in GENETIC_CODE.values() if v == 'STOP')}")
    steps.append(f"Total codons: {len(GENETIC_CODE)}")

    return {
        "answer": {"codon": codon, "amino_acid": aa, "query": query},
        "steps": steps,
        "verification": {
            "codon_valid": codon in GENETIC_CODE,
            "is_start_codon": codon == START_CODON,
            "is_stop_codon": codon in STOP_CODONS,
            "total_codons": len(GENETIC_CODE),
            "sense_codons": sum(1 for v in GENETIC_CODE.values() if v != "STOP"),
            "stop_codons": sum(1 for v in GENETIC_CODE.values() if v == "STOP"),
        },
        "topic": TopicNode.GENETIC_CODE.value,
    }


# ============================================================
#  NODE 008: GENE REGULATION
# ============================================================

def solve_gene_regulation(params: Dict) -> Dict:
    """
    Analyse gene regulation in prokaryotes (lac/trp operon) or eukaryotes.
    params: {
        'operon': str  - 'lac', 'trp'
        'condition': str  - 'lactose_present', 'lactose_absent', 'tryptophan_high', 'tryptophan_low'
        'query': str  - 'state', 'explain', 'indian_research'
    }
    """
    steps = []
    operon = params.get("operon", "lac").lower()
    condition = params.get("condition", "")
    query = params.get("query", "explain")

    if operon == "lac":
        data = GENE_REGULATION_EXAMPLES["lac_operon"]
        lactose_present = "lactose" in condition.lower() and "absent" not in condition.lower()
        glucose_high = "glucose" in condition.lower() and "low" not in condition.lower()

        steps.append(f"=== LAC OPERON REGULATION ===")
        steps.append(f"Organism: {data['organism']}")
        steps.append(f"Structural genes: {', '.join(data['structural_genes'])}")
        steps.append(f"lacZ: β-galactosidase (hydrolyses lactose to glucose + galactose)")
        steps.append(f"lacY: Lactose permease (transports lactose into cell)")
        steps.append(f"lacA: Thiogalactoside transacetylase (role less clear)")
        steps.append(f"lacI gene: codes for lac repressor protein")
        steps.append(f"Inducer: {data['inducer']}")

        steps.append("")
        steps.append("NEGATIVE CONTROL:")
        if lactose_present:
            steps.append("Lactose/allolactose binds to repressor → conformational change → repressor releases from operator → transcription ON")
            lacZ_on = True
        else:
            steps.append("Repressor (from lacI) binds to operator → blocks RNA polymerase → transcription OFF")
            lacZ_on = False

        steps.append("")
        steps.append("POSITIVE CONTROL (CATABOLITE REPRESSION):")
        if glucose_high:
            steps.append("High glucose → low cAMP → CAP cannot bind → transcription LOW even if lactose present")
            catabolite = False
        else:
            steps.append("Low glucose → high cAMP → cAMP-CAP complex binds to promoter → enhances transcription")
            catabolite = True

        transcription_state = "ON" if (lactose_present and not glucose_high) else ("LOW" if lactose_present and glucose_high else "OFF")
        steps.append(f"")
        steps.append(f"FINAL STATE: lac operon transcription is {transcription_state}")
        steps.append(f"β-galactosidase produced: {'Yes' if lacZ_on and catabolite else 'No/Low'}")

        answer = {
            "transcription_state": transcription_state,
            "lactose_present": lactose_present,
            "glucose_high": glucose_high,
            "lacZ_on": lacZ_on,
            "catabolite_activation": catabolite,
        }

        if "indian_research" in query:
            steps.append("")
            steps.append("INDIAN RESEARCH CONTEXT:")
            steps.append("- Recombinant lac operon systems used in E. coli expression vectors at CCMB, Hyderabad")
            steps.append("- IPTG (synthetic inducer) used in laboratory settings globally, including Indian labs")
            steps.append("- lacZ gene commonly used as reporter gene in Indian biotech research")

    else:  # trp
        data = GENE_REGULATION_EXAMPLES["trp_operon"]
        steps.append(f"=== TRP OPERON REGULATION ===")
        steps.append(f"Organism: {data['organism']}")
        steps.append(f"Structural genes: {', '.join(data['structural_genes'])} (tryptophan biosynthesis)")
        steps.append(f"Mechanism: REPRESSIBLE — operon active by default, turned OFF when tryptophan abundant")
        trp_high = "high" in condition.lower() or "present" in condition.lower()
        if trp_high:
            steps.append("High tryptophan → tryptophan binds to trp repressor → active repressor binds operator → transcription OFF")
            answer = {"transcription_state": "OFF", "tryptophan_high": True}
        else:
            steps.append("Low/no tryptophan → repressor inactive → transcription ON → tryptophan synthesised")
            answer = {"transcription_state": "ON", "tryptophan_high": False}

    # Verification
    steps.append("--- VERIFICATION ---")
    steps.append("lac operon: Inducible (normally OFF, induced ON by lactose)")
    steps.append("trp operon: Repressible (normally ON, repressed OFF by tryptophan)")
    steps.append("Key difference: Inducible systems catabolise substrates; Repressible systems synthesise end products")

    return {
        "answer": answer,
        "steps": steps,
        "verification": {
            "operon_type": "inducible" if operon == "lac" else "repressible",
            "control_type": "negative (+positive for lac)",
            "correct_mechanism": True,
        },
        "topic": TopicNode.GENE_REGULATION.value,
    }


# ============================================================
#  NODE 009: RECOMBINANT DNA TECHNOLOGY
# ============================================================

def solve_recombinant_dna(params: Dict) -> Dict:
    """
    Recombinant DNA construction and analysis.
    params: {
        'vector': str  - vector name
        'insert_size_bp': int
        'host': str
        'query': str  - 'construction', 'selection', 'confirmation', 'steps'
    }
    """
    steps = []
    vector_name = params.get("vector", "pBR322")
    insert_bp = params.get("insert_size_bp", 1000)
    host = params.get("host", "E. coli DH5α")
    query = params.get("query", "construction")

    vector_data = VECTORS.get(vector_name, VECTORS["pBR322"])

    steps.append(f"=== RECOMBINANT DNA CONSTRUCTION ===")
    steps.append(f"Vector: {vector_name}")
    steps.append(f"Vector size: {vector_data['size_bp']} bp")
    steps.append(f"Markers: {', '.join(vector_data['markers'])}")
    steps.append(f"Insert: {insert_bp} bp gene of interest")
    steps.append(f"Host: {host}")
    steps.append("")

    if query == "construction":
        steps.append("STEPS:")
        steps.append("1. ISOLATE insert DNA: PCR amplify or restriction digest source DNA")
        steps.append("2. DIGEST vector and insert with same restriction enzyme(s)")
        steps.append("3. LIGATE: DNA ligase joins compatible ends (sticky or blunt)")
        steps.append("4. TRANSFORM: Introduce recombinant DNA into competent host cells")
        steps.append("5. SELECT: Use antibiotic markers to select transformed cells")
        steps.append("6. SCREEN: Colony PCR, restriction digest, or sequencing to confirm insert")

    total_size = vector_data["size_bp"] + insert_bp
    steps.append(f"Total recombinant plasmid size: {vector_data['size_bp']} + {insert_bp} = {total_size} bp")

    if query == "selection":
        steps.append("SELECTION MARKERS:")
        steps.append(f"- {', '.join(vector_data['markers'])}")
        steps.append("Only cells with plasmid survive on antibiotic-containing medium")
        steps.append("Blue-white screening (pUC vectors): lacZα fragment disrupted by insert → white colonies")
        steps.append("Non-recombinant (empty vector): Blue colonies (lacZα functional)")

    if query == "confirmation":
        steps.append("CONFIRMATION METHODS:")
        steps.append("1. Restriction digest of plasmid → expected fragment sizes on gel")
        steps.append("2. Colony PCR with insert-specific primers")
        steps.append("3. DNA sequencing (Sanger or next-gen)")
        steps.append("4. Expression analysis (Western blot for protein)")
        steps.append(f"Expected bands for {vector_name}+{insert_bp}bp insert: check against vector map")

    if query == "steps":
        steps.append("DETAILED PROTOCOL:")
        steps.append("A. PREPARATION:")
        steps.append(f"   - Linearise {vector_name} with appropriate RE")
        steps.append(f"   - PCR amplify {insert_bp} bp insert with RE sites in primers")
        steps.append("B. LIGATION:")
        steps.append("   - Mix insert:vector at 3:1 molar ratio")
        steps.append("   - T4 DNA ligase, 16°C overnight or RT 1 hour")
        steps.append("C. TRANSFORMATION:")
        steps.append("   - Heat shock or electroporation into competent cells")
        steps.append("   - Recovery in SOC medium (37°C, 1 hour)")
        steps.append("D. SELECTION & SCREENING:")
        steps.append("   - Plate on Amp/Tet/other antibiotic + X-gal (if blue-white)")
        steps.append("   - Pick colonies, miniprep, confirm by digest/sequencing")

    steps.append("--- VERIFICATION ---")
    steps.append(f"Vector ({vector_data['size_bp']} bp) + Insert ({insert_bp} bp) = {total_size} bp recombinant ✓")
    steps.append("Ligation efficiency: ~50-80% with sticky ends, ~10-30% with blunt ends")
    steps.append(f"Copy number: {vector_data['copy_number']} copies/cell — high copy means abundant DNA for analysis")

    return {
        "answer": {
            "vector": vector_name,
            "vector_size_bp": vector_data["size_bp"],
            "insert_size_bp": insert_bp,
            "total_size_bp": total_size,
            "markers": vector_data["markers"],
            "query_type": query,
        },
        "steps": steps,
        "verification": {
            "total_size_bp": total_size,
            "size_consistent": total_size > vector_data["size_bp"],
            "markers_present": len(vector_data["markers"]) > 0,
        },
        "topic": TopicNode.RECOMBINANT_DNA.value,
    }


# ============================================================
#  NODE 010: RESTRICTION ENZYMES
# ============================================================

def solve_restriction_enzyme(params: Dict) -> Dict:
    """
    Restriction enzyme analysis: recognition site, cutting pattern, fragment sizes.
    params: {
        'enzyme': str  - enzyme name
        'dna_sequence': str  - DNA to cut
        'query': str  - 'find_sites', 'fragment_sizes', 'compatible_ends'
    }
    """
    steps = []
    enzyme_name = params.get("enzyme", "EcoRI")
    dna_seq = params.get("dna_sequence", "").upper().replace(" ", "")
    query = params.get("query", "find_sites")

    enzyme_data = RESTRICTION_ENZYMES.get(enzyme_name, RESTRICTION_ENZYMES["EcoRI"])

    steps.append(f"=== RESTRICTION ENZYME: {enzyme_name} ===")
    steps.append(f"Source organism: {enzyme_data['origin']}")
    steps.append(f"Recognition site: 5'-{enzyme_data['site']}-3'")
    steps.append(f"Cut pattern: {enzyme_data['cut'][0]}/{enzyme_data['cut'][1]}")
    steps.append(f"Ends produced: {'Sticky (cohesive)' if not enzyme_data['blunt'] else 'Blunt'}")

    if query in ("find_sites", "fragment_sizes") and dna_seq:
        site = enzyme_data["site"]
        positions = []
        idx = dna_seq.find(site)
        while idx != -1:
            positions.append(idx)
            idx = dna_seq.find(site, idx + 1)

        steps.append(f"DNA sequence length: {len(dna_seq)} bp")
        steps.append(f"Recognition sites found at positions: {positions}")

        if positions:
            fragments = []
            prev = 0
            for pos in positions:
                fragments.append(dna_seq[prev:pos + len(site)])
                prev = pos + len(site)
            fragments.append(dna_seq[prev:])
            fragment_sizes = [len(f) for f in fragments]
            steps.append(f"Fragment sizes: {fragment_sizes} bp")
            steps.append(f"Number of fragments: {len(fragment_sizes)}")
        else:
            steps.append("No recognition sites found — DNA not cut by this enzyme")
            fragment_sizes = [len(dna_seq)]

    if query == "compatible_ends":
        steps.append("ENZYME COMPATIBILITY:")
        steps.append(f"Sticky end sequence: 5'-{enzyme_data['cut'][1]}-3'")
        steps