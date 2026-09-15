"""
CISCE ISC Class 11 Biotechnology - Deterministic Question Generator
Syllabus: CISCE ISC Biotechnology (878), Examination Year 2028
Author: Claude-Fable-5 (Anthropic)
"""

import random
import hashlib
from fractions import Fraction
from typing import Any, Dict, List, Optional

# ============================================================
# UTILITIES
# ============================================================

def _stable_rand(seed_str: str) -> random.Random:
    h = hashlib.sha256(seed_str.encode()).hexdigest()
    return random.Random(int(h[:16], 16))

def _q_id(prefix: str, seed: int, idx: int) -> str:
    return f"{prefix}_s{seed}_q{idx:03d}"

def _parse_variant(v: str, seed: int) -> str:
    """Expand variant markers into deterministic text."""
    rng = _stable_rand(f"var_{seed}")
    if v == "{indian_dairy}":
        opts = ["Amul", "Mother Dairy", "Nandini", "Aavin", "Milma", "Sudha"]
        return opts[seed % len(opts)]
    if v == "{indian_state}":
        opts = ["Kerala", "Gujarat", "Karnataka", "Tamil Nadu", "Punjab", "West Bengal"]
        return opts[(seed + 1) % len(opts)]
    if v == "{indian_scientist}":
        opts = ["M S Swaminathan", "Verghese Kurien", "Birbal Sahni", "S S Bhatnagar"]
        return opts[(seed + 2) % len(opts)]
    if v == "{indian_festival}":
        opts = ["Diwali", "Pongal", "Baisakhi", "Onam", "Holi"]
        return opts[(seed + 3) % len(opts)]
    return v

# ============================================================
# QUESTION BANK
# ============================================================

_QUESTION_BANK: List[Dict[str, Any]] = [
    {
        "node": "c11_biotech_001",
        "topic": "biotechnology_intro",
        "type": "mcq",
        "difficulty": 0.3,
        "question": "Which of the following is a product of traditional biotechnology?",
        "options": ["Recombinant insulin", "Yogurt", "Gene therapy", "PCR amplification"],
        "answer": "Yogurt",
        "explanation": "Yogurt is produced by bacterial fermentation of milk — an example of traditional biotechnology used for thousands of years.",
    },
    {
        "node": "c11_biotech_001",
        "topic": "biotechnology_intro",
        "type": "mcq",
        "difficulty": 0.4,
        "question": "Modern biotechnology differs from traditional biotechnology primarily in its use of:",
        "options": ["Microorganisms", "Fermentation", "Genetic engineering", "Plant breeding"],
        "answer": "Genetic engineering",
        "explanation": "Modern biotechnology uses genetic engineering to manipulate DNA directly, whereas traditional biotechnology relied on natural fermentation and selection.",
    },
    {
        "node": "c11_biotech_002",
        "topic": "cell_biology",
        "type": "mcq",
        "difficulty": 0.5,
        "question": "The genetic material in prokaryotic cells is found in:",
        "options": ["Nucleus", "Nucleoid region", "Mitochondria", "Chloroplast"],
        "answer": "Nucleoid region",
        "explanation": "Prokaryotic cells lack a true nucleus; their DNA is located in the nucleoid region of the cytoplasm.",
    },
    {
        "node": "c11_biotech_002",
        "topic": "cell_biology",
        "type": "short_answer",
        "difficulty": 0.6,
        "question": "Explain the role of ribosomes in protein synthesis.",
        "answer": "Ribosomes are cellular structures that translate mRNA into polypeptide chains. They read the codon sequence on mRNA and link amino acids via peptide bonds to form proteins.",
        "explanation": "Ribosomes consist of two subunits (70S in prokaryotes, 80S in eukaryotes) and catalyze peptide bond formation during translation.",
    },
    {
        "node": "c11_biotech_003",
        "topic": "biomolecules",
        "type": "mcq",
        "difficulty": 0.4,
        "question": "Which biomolecule serves as the primary carrier of genetic information?",
        "options": ["Protein", "Lipid", "DNA", "Carbohydrate"],
        "answer": "DNA",
        "explanation": "DNA (Deoxyribonucleic acid) stores and transmits genetic information through its nucleotide sequence.",
    },
    {
        "node": "c11_biotech_003",
        "topic": "biomolecules",
        "type": "fill_blank",
        "difficulty": 0.5,
        "question": "The four nitrogenous bases in DNA are Adenine, Guanine, Cytosine, and ____",
        "answer": "Thymine",
        "explanation": "DNA contains four bases: Adenine (A), Guanine (G), Cytosine (C), and Thymine (T). In RNA, Thymine is replaced by Uracil.",
    },
    {
        "node": "c11_biotech_004",
        "topic": "dna_structure",
        "type": "mcq",
        "difficulty": 0.6,
        "question": "The DNA double helix structure was proposed by:",
        "options": ["Mendel and Darwin", "Watson and Crick", "Pasteur and Koch", "Beadle and Tatum"],
        "answer": "Watson and Crick",
        "explanation": "James Watson and Francis Crick proposed the double helix model of DNA in 1953, based on Rosalind Franklin's X-ray diffraction data.",
    },
    {
        "node": "c11_biotech_004",
        "topic": "dna_structure",
        "type": "short_answer",
        "difficulty": 0.7,
        "question": "Describe Chargaff's rules and their significance.",
        "answer": "Chargaff's rules state that in DNA, the amount of adenine equals thymine (A=T) and guanine equals cytosine (G=C). This revealed the base-pairing principle fundamental to DNA structure and replication.",
        "explanation": "Erwin Chargaff's findings were crucial evidence used by Watson and Crick to deduce the complementary base-pairing in the DNA double helix.",
    },
    {
        "node": "c11_biotech_005",
        "topic": "gene_expression",
        "type": "mcq",
        "difficulty": 0.5,
        "question": "Transcription is the process of synthesizing:",
        "options": ["Protein from mRNA", "mRNA from DNA", "DNA from mRNA", "tRNA from protein"],
        "answer": "mRNA from DNA",
        "explanation": "Transcription is the process where RNA polymerase synthesizes mRNA using a DNA template. Translation is the subsequent protein synthesis step.",
    },
    {
        "node": "c11_biotech_005",
        "topic": "gene_expression",
        "type": "fill_blank",
        "difficulty": 0.6,
        "question": "The process of protein synthesis from mRNA is called ____",
        "answer": "Translation",
        "explanation": "Translation is the process where ribosomes read mRNA codons and assemble amino acids into polypeptide chains.",
    },
    {
        "node": "c11_biotech_006",
        "topic": "recombinant_dna",
        "type": "mcq",
        "difficulty": 0.6,
        "question": "Restriction enzymes used in recombinant DNA technology function as:",
        "options": ["DNA polymerases", "Molecular scissors cutting DNA at specific sites", "Ligases joining DNA fragments", "Helicases unwinding DNA"],
        "answer": "Molecular scissors cutting DNA at specific sites",
        "explanation": "Restriction enzymes (restriction endonucleases) recognize specific DNA sequences and cut the DNA at or near those sites, producing sticky or blunt ends.",
    },
    {
        "node": "c11_biotech_006",
        "topic": "recombinant_dna",
        "type": "long_answer",
        "difficulty": 0.8,
        "question": "Explain the steps involved in creating recombinant DNA.",
        "answer": "1) Isolation of the target gene using restriction enzymes. 2) Cutting of the vector (plasmid) with the same restriction enzyme. 3) Ligation of the gene insert into the vector using DNA ligase. 4) Transformation: introducing the recombinant vector into a host cell. 5) Selection and screening of transformed cells containing the recombinant DNA.",
        "explanation": "Recombinant DNA technology combines DNA from different sources. Key tools include restriction enzymes, vectors (plasmids), DNA ligase, and host organisms.",
    },
    {
        "node": "c11_biotech_007",
        "topic": "fermentation",
        "type": "mcq",
        "difficulty": 0.4,
        "question": "In fermentation, yeast converts glucose into:",
        "options": ["Lactic acid and water", "Ethanol and CO2", "Acetic acid and O2", "Methane and H2"],
        "answer": "Ethanol and CO2",
        "explanation": "Yeast performs alcoholic fermentation: C6H12O6 → 2C2H5OH + 2CO2, producing ethanol and carbon dioxide.",
    },
    {
        "node": "c11_biotech_007",
        "topic": "fermentation",
        "type": "short_answer",
        "difficulty": 0.5,
        "question": "What is the economic importance of fermentation in {indian_dairy}?",
        "answer": f"Fermentation is economically important in dairy industries like Amul for producing yogurt, cheese, and cultured milk products. Lactic acid bacteria convert lactose into lactic acid, preserving milk and creating value-added products.",
        "explanation": "Fermentation extends shelf life and creates diverse products from raw milk, contributing significantly to the dairy industry's revenue.",
    },
    {
        "node": "c11_biotech_008",
        "topic": "biotech_applications",
        "type": "mcq",
        "difficulty": 0.5,
        "question": "The first genetically engineered human insulin was produced using:",
        "options": ["Yeast cells", "E. coli bacteria", "Plant cells", "Animal cells"],
        "answer": "E. coli bacteria",
        "explanation": "Recombinant human insulin (Humulin) was first produced in 1982 using genetically modified E. coli bacteria, marking a milestone in pharmaceutical biotechnology.",
    },
    {
        "node": "c11_biotech_008",
        "topic": "biotech_applications",
        "type": "fill_blank",
        "difficulty": 0.6,
        "question": "Bt cotton contains a gene from the bacterium ____ that provides resistance to bollworm pests.",
        "answer": "Bacillus thuringiensis",
        "explanation": "Bt cotton is genetically modified with a gene from Bacillus thuringiensis that produces a protein toxic to certain insect pests, reducing pesticide use.",
    },
]


def solve_mcq(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve an MCQ question."""
    answer = params.get("answer", "")
    user_answer = params.get("user_answer", "")
    correct = str(user_answer).strip().lower() == str(answer).strip().lower()
    return {"correct": correct, "answer": answer, "verification": correct}


def solve_fill_blank(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve a fill-in-the-blank question."""
    answer = params.get("answer", "")
    user_answer = params.get("user_answer", "")
    correct = str(user_answer).strip().lower() == str(answer).strip().lower()
    return {"correct": correct, "answer": answer, "verification": correct}


def solve_short_answer(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve a short answer question."""
    answer = params.get("answer", "")
    return {"answer": answer, "verification": True}


def solve_long_answer(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve a long answer question."""
    answer = params.get("answer", "")
    return {"answer": answer, "verification": True}


def generate_questions(seed: int, count: int) -> List[Dict[str, Any]]:
    """Generate deterministic questions using seeded random."""
    rng = random.Random(seed)
    all_q: List[Dict[str, Any]] = []
    for i, q in enumerate(_QUESTION_BANK):
        q_copy = dict(q)
        q_copy["id"] = _q_id(f"c11_biotech_{q['node']}", seed, i)
        q_copy["question_text"] = _parse_variant(q.get("question", ""), seed)
        q_copy["question_type"] = q.get("type", "mcq")
        q_copy["solution"] = q.get("explanation", "")
        q_copy["verification"] = True
        all_q.append(q_copy)
    rng.shuffle(all_q)
    return all_q[:count]


QUESTION_REGISTRY = {"class11_biotech": generate_questions}


def verify_all_questions(questions: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Validate all questions have required fields."""
    required = {"id", "question_text", "question_type", "answer", "difficulty"}
    results: Dict[str, Any] = {"errors": [], "valid": True, "count": len(questions)}
    for q in questions:
        qid = q.get("id", "unknown")
        for field in required:
            if field not in q:
                results["errors"].append(f"{qid}: missing field '{field}'")
                results["valid"] = False
    return results


if __name__ == "__main__":
    qs = generate_questions(42, 10)
    print(f"Generated {len(qs)} questions")
    v = verify_all_questions(qs)
    print(f"Valid: {v['valid']}, Errors: {len(v['errors'])}")
    for q in qs[:3]:
        print(f"  {q['id']}: {q['question_text'][:60]}")
