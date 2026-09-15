# -*- coding: utf-8 -*-
"""
CISCE ISC Biotechnology Class 12 - Question Generator
Topics: Nucleotides/Nucleosides, DNA Structure (Watson-Crick, Chargaff, Hershey-Chase),
        RNA Types (mRNA, tRNA, rRNA)
"""

import random
import re
import hashlib
from typing import Dict, List, Any, Optional

# ---------------------------------------------------------------------------
# Data pools keyed by topic
# ---------------------------------------------------------------------------

NUCLEOTIDE_FACTS = [
    "A nucleotide is composed of a phosphate group, a pentose sugar, and a nitrogenous base.",
    "A nucleoside consists of only a pentose sugar and a nitrogenous base (no phosphate).",
    "Addition of a phosphate group to a nucleoside produces a nucleotide.",
    "Purines in DNA are adenine (A) and guanine (G); they are double-ring structures.",
    "Pyrimidines in DNA are cytosine (C) and thymine (T); they are single-ring structures.",
    "Adenine and guanine are double-ring (purine) nitrogenous bases.",
    "Cytosine, thymine, and uracil are single-ring (pyrimidine) nitrogenous bases.",
    "In RNA, uracil (U) replaces thymine (T) found in DNA.",
    "The sugar in DNA is deoxyribose; the sugar in RNA is ribose.",
    "DNA contains deoxyribose sugar; RNA contains ribose sugar.",
    "The phosphate group links the 3' carbon of one sugar to the 5' carbon of the next via phosphodiester bonds.",
    "Nucleotides are joined by 3'-5' phosphodiester bonds forming the backbone of nucleic acids.",
    "The four bases in DNA are adenine, guanine, cytosine, and thymine.",
    "The four bases in RNA are adenine, guanine, cytosine, and uracil.",
    "A nucleotide is the monomer (building block) of nucleic acids.",
    "ATP (adenosine triphosphate) is a nucleotide that functions as the energy currency of the cell.",
    "Nucleotides serve as monomers for nucleic acids and also function as energy carriers (ATP) and coenzymes (NAD).",
    "The nitrogenous base is attached to the 1' carbon of the pentose sugar in a nucleotide.",
    "Nucleosides lack the phosphate group present in nucleotides.",
    "AMP (adenosine monophosphate) is an example of a nucleotide.",
]

DNA_FACTS = [
    "Watson and Crick (1953) proposed the double helix model of DNA based on Rosalind Franklin's X-ray diffraction data.",
    "The Watson-Crick model describes DNA as a double-stranded right-handed helix.",
    "The two DNA strands in the double helix run in opposite (antiparallel) directions: 5' to 3' and 3' to 5'.",
    "Chargaff's rules state that in any DNA molecule, A = T and G = C (equimolar base pairing).",
    "Chargaff's rules also state that the amount of purines equals the amount of pyrimidines (A+G = T+C).",
    "The hydrogen bonds between complementary bases hold the two DNA strands together: A-T form 2 H-bonds, G-C form 3 H-bonds.",
    "Adenine (A) pairs with thymine (T) via two hydrogen bonds in DNA.",
    "Guanine (G) pairs with cytosine (C) via three hydrogen bonds in DNA.",
    "The diameter of the DNA double helix is approximately 2.0 nm.",
    "The DNA double helix makes one complete turn every 3.4 nm (about 10 base pairs per turn).",
    "The sugar-phosphate backbone of DNA is hydrophilic and faces outward; the nitrogenous bases are hydrophobic and face inward.",
    "Hershey and Chase (1952) used radioactive sulfur-35 (35S) to label the protein coat of bacteriophage.",
    "Hershey and Chase used radioactive phosphorus-32 (32P) to label the DNA of bacteriophage.",
    "The Hershey-Chase experiment proved that DNA (not protein) is the genetic material of bacteriophage.",
    "Hershey and Chase used the T2 bacteriophage in their landmark experiment.",
    "The major groove and minor groove of DNA are structural features resulting from the double helix geometry.",
    "Meselson and Stahl (1958) provided experimental evidence for the semi-conservative replication of DNA.",
    "The nitrogenous bases in DNA are attached to the deoxyribose sugar at the 1' carbon position.",
    "The 5' end of a DNA strand carries a phosphate group; the 3' end carries a free hydroxyl (-OH) group.",
    "Complementary base pairing in DNA follows the rule: A pairs with T, and G pairs with C.",
]

RNA_FACTS = [
    "mRNA (messenger RNA) carries the genetic code from DNA in the nucleus to ribosomes in the cytoplasm for protein synthesis.",
    "tRNA (transfer RNA) brings the correct amino acid to the ribosome during protein synthesis by recognizing codons via its anticodon.",
    "rRNA (ribosomal RNA) is a major structural and catalytic component of ribosomes where protein synthesis occurs.",
    "mRNA is synthesized during transcription from a DNA template.",
    "The start codon (AUG) on mRNA codes for methionine and signals the beginning of translation.",
    "The three stop codons on mRNA (UAA, UAG, UGA) signal the end of translation and do not code for any amino acid.",
    "tRNA has a characteristic cloverleaf secondary structure and an L-shaped tertiary structure.",
    "The anticodon of tRNA pairs with the codon of mRNA in an antiparallel fashion during translation.",
    "The 3' end of tRNA carries the amino acid attachment site (CCA sequence).",
    "rRNA is synthesized in the nucleolus of the nucleus.",
    "Prokaryotic ribosomes (70S) contain 16S rRNA in the small subunit and 23S + 5S rRNA in the large subunit.",
    "Eukaryotic ribosomes (80S) contain 18S rRNA in the small subunit and 28S + 5.8S + 5S rRNA in the large subunit.",
    "mRNA undergoes processing (5' capping, poly-A tail addition, splicing) in eukaryotes before leaving the nucleus.",
    "The poly-A tail at the 3' end of eukaryotic mRNA protects the mRNA from degradation and aids in translation.",
    "tRNA molecules are typically 76-90 nucleotides long and have several modified bases.",
    "rRNA constitutes about 80% of the total RNA in a cell.",
    "mRNA constitutes about 3-5% of the total RNA in a cell.",
    "tRNA constitutes about 10-15% of the total RNA in a cell.",
    "The central dogma describes the flow of genetic information: DNA -> RNA -> Protein.",
    "Transcription is the process of synthesizing mRNA from a DNA template.",
]

# ---------------------------------------------------------------------------
# Question generator functions
# ---------------------------------------------------------------------------

def _gen_nucleotide_mcq(seed: int, diff: float, qid: int) -> Dict:
    questions = [
        {
            "q": "Which of the following is the correct composition of a nucleotide?",
            "options": ["Phosphate + Sugar + Nitrogenous Base",
                        "Sugar + Nitrogenous Base only",
                        "Phosphate + Sugar only",
                        "Nitrogenous Base only"],
            "ans": "Phosphate + Sugar + Nitrogenous Base",
            "sol": "A nucleotide consists of three components: a phosphate group, a pentose sugar (ribose or deoxyribose), and a nitrogenous base (purine or pyrimidine)."
        },
        {
            "q": "Which of the following is a pyrimidine base?",
            "options": ["Adenine", "Guanine", "Cytosine", "Adenine and Guanine"],
            "ans": "Cytosine",
            "sol": "Cytosine is a single-ring (pyrimidine) base. Adenine and guanine are double-ring (purine) bases."
        },
        {
            "q": "Which nitrogenous base is present in RNA but NOT in DNA?",
            "options": ["Adenine", "Guanine", "Thymine", "Uracil"],
            "ans": "Uracil",
            "sol": "Uracil replaces thymine in RNA. DNA contains thymine while RNA contains uracil in its place."
        },
        {
            "q": "A nucleoside is formed by the combination of:",
            "options": ["Phosphate + Sugar", "Sugar + Nitrogenous Base",
                        "Phosphate + Nitrogenous Base", "Sugar + Phosphate + Nitrogenous Base"],
            "ans": "Sugar + Nitrogenous Base",
            "sol": "A nucleoside consists of a pentose sugar linked to a nitrogenous base. It lacks the phosphate group that converts it into a nucleotide."
        },
        {
            "q": "Which of the following is NOT a purine?",
            "options": ["Adenine", "Guanine", "Cytosine", "Both Guanine and Adenine"],
            "ans": "Cytosine",
            "sol": "Adenine and guanine are purines (double-ring structures). Cytosine is a pyrimidine (single-ring structure)."
        },
        {
            "q": "The sugar present in DNA is:",
            "options": ["Ribose", "Deoxyribose", "Galactose", "Glucose"],
            "ans": "Deoxyribose",
            "sol": "DNA contains deoxyribose sugar (lacks an oxygen at the 2' carbon). RNA contains ribose (has a hydroxyl group at the 2' carbon)."
        },
        {
            "q": "Adenine and guanine are classified as:",
            "options": ["Pyrimidines", "Purines", "Nucleosides", "Nucleotides"],
            "ans": "Purines",
            "sol": "Adenine (A) and guanine (G) are purines with a double-ring structure. Cytosine, thymine, and uracil are pyrimidines with a single-ring structure."
        },
        {
            "q": "Nucleotides are joined together to form nucleic acid chains by:",
            "options": ["Hydrogen bonds", "Phosphodiester bonds",
                        "Peptide bonds", "Glycosidic bonds"],
            "ans": "Phosphodiester bonds",
            "sol": "Phosphodiester bonds link the 3' carbon of one sugar to the 5' carbon of the next sugar via the phosphate group, forming the backbone."
        },
    ]
    idx = seed % len(questions)
    q = questions[idx]
    return _make_mcq(qid, q["q"], q["options"], q["ans"], diff,
                     "Nucleotides/Nucleosides", q["sol"])


def _gen_dna_mcq(seed: int, diff: float, qid: int) -> Dict:
    questions = [
        {
            "q": "The Watson-Crick model of DNA describes the molecule as a:",
            "options": ["Single-stranded helix", "Double-stranded helix",
                        "Triple-stranded helix", "Linear molecule"],
            "ans": "Double-stranded helix",
            "sol": "Watson and Crick (1953) proposed that DNA is a double-stranded right-handed helical structure with antiparallel strands."
        },
        {
            "q": "According to Chargaff's rule, in a DNA molecule:",
            "options": ["A = G and C = T", "A = T and G = C",
                        "A = C and G = T", "A = G = C = T"],
            "ans": "A = T and G = C",
            "sol": "Chargaff's rules state that the amount of adenine equals thymine (A=T) and guanine equals cytosine (G=C) in any DNA molecule."
        },
        {
            "q": "In the Hershey-Chase experiment, what was labeled with radioactive phosphorus-32 (32P)?",
            "options": ["The protein coat of the phage", "The DNA of the phage",
                        "The bacterial cell", "The medium"],
            "ans": "The DNA of the phage",
            "sol": "Hershey and Chase used 32P (found in DNA but not protein) to label phage DNA, proving DNA is the genetic material."
        },
        {
            "q": "How many hydrogen bonds form between adenine and thymine in DNA?",
            "options": ["One", "Two", "Three", "Four"],
            "ans": "Two",
            "sol": "Adenine pairs with thymine via two hydrogen bonds. Guanine pairs with cytosine via three hydrogen bonds, making GC pairs more stable."
        },
        {
            "q": "The Hershey-Chase experiment (1952) used which organism?",
            "options": ["E. coli", "T2 bacteriophage", "Drosophila", "Onion root tip"],
            "ans": "T2 bacteriophage",
            "sol": "Hershey and Chase used T2 bacteriophage that infects E. coli. They labeled DNA with 32P and protein with 35S."
        },
        {
            "q": "The two strands of the DNA double helix run in:",
            "options": ["Same direction (parallel)", "Opposite directions (antiparallel)",
                        "Random directions", "A circular pattern"],
            "ans": "Opposite directions (antiparallel)",
            "sol": "The two strands are antiparallel: one runs 5' to 3' and the other runs 3' to 5', with their sugar-phosphate backbones on the outside."
        },
        {
            "q": "Chargaff's rule is important for understanding:",
            "options": ["DNA replication mechanism", "Base pairing in DNA",
                        "RNA transcription", "Protein synthesis"],
            "ans": "Base pairing in DNA",
            "sol": "Chargaff's rule (A=T, G=C) showed that bases pair specifically, which was key to Watson and Crick deducing the double helix structure."
        },
        {
            "q": "In the Hershey-Chase experiment, radioactive sulfur-35 (35S) was used to label:",
            "options": ["DNA", "Protein", "Lipids", "Carbohydrates"],
            "ans": "Protein",
            "sol": "35S labels protein because sulfur is in amino acids (cysteine and methionine) but not in DNA. This showed protein did NOT enter bacterial cells."
        },
        {
            "q": "The diameter of the DNA double helix is approximately:",
            "options": ["0.2 nm", "2.0 nm", "20 nm", "200 nm"],
            "ans": "2.0 nm",
            "sol": "The DNA double helix has a diameter of about 2.0 nm. Each turn of the helix spans about 3.4 nm and contains approximately 10 base pairs."
        },
    ]
    idx = seed % len(questions)
    q = questions[idx]
    return _make_mcq(qid, q["q"], q["options"], q["ans"], diff,
                     "DNA Structure", q["sol"])


def _gen_rna_mcq(seed: int, diff: float, qid: int) -> Dict:
    questions = [
        {
            "q": "Which type of RNA carries amino acids to the ribosome during protein synthesis?",
            "options": ["mRNA", "tRNA", "rRNA", "snRNA"],
            "ans": "tRNA",
            "sol": "tRNA (transfer RNA) has an anticodon that pairs with the mRNA codon and carries the specific amino acid to the ribosome for polypeptide synthesis."
        },
        {
            "q": "Which type of RNA serves as the template for protein synthesis?",
            "options": ["tRNA", "rRNA", "mRNA", "snRNA"],
            "ans": "mRNA",
            "sol": "mRNA (messenger RNA) carries the genetic code from DNA to the ribosome where it serves as a template for translation into protein."
        },
        {
            "q": "rRNA is a major component of:",
            "options": ["The cell membrane", "Ribosomes",
                        "The nucleus", "Mitochondria"],
            "ans": "Ribosomes",
            "sol": "rRNA (ribosomal RNA) combines with proteins to form the large and small subunits of ribosomes, the site of protein synthesis."
        },
        {
            "q": "The anticodon is found on:",
            "options": ["mRNA", "tRNA", "rRNA", "DNA"],
            "ans": "tRNA",
            "sol": "tRNA has an anticodon loop that pairs with the codon on mRNA during translation, ensuring the correct amino acid is added."
        },
        {
            "q": "Which of the following is the start codon on mRNA?",
            "options": ["UAA", "UGA", "AUG", "UUU"],
            "ans": "AUG",
            "sol": "AUG is the start codon that codes for methionine and signals the beginning of translation. UAA, UAG, and UGA are stop codons."
        },
        {
            "q": "The nucleolus of the nucleus is primarily responsible for synthesizing:",
            "options": ["mRNA", "tRNA", "rRNA", "snRNA"],
            "ans": "rRNA",
            "sol": "The nucleolus synthesizes rRNA, which combines with ribosomal proteins (made in cytoplasm) to assemble ribosomal subunits."
        },
        {
            "q": "Which type of RNA constitutes the largest percentage of total cellular RNA?",
            "options": ["mRNA", "tRNA", "rRNA", "All are equal"],
            "ans": "rRNA",
            "sol": "rRNA makes up about 80% of total cellular RNA. tRNA constitutes about 10-15% and mRNA about 3-5%."
        },
        {
            "q": "In eukaryotic cells, the 5' cap added to mRNA is important for:",
            "options": ["DNA replication", "Translation initiation and stability",
                        "Transcription termination", "Splicing"],
            "ans": "Translation initiation and stability",
            "sol": "The 5' cap (7-methylguanosine) protects mRNA from degradation and helps the ribosome recognize and bind the mRNA for translation."
        },
    ]
    idx = seed % len(questions)
    q = questions[idx]
    return _make_mcq(qid, q["q"], q["options"], q["ans"], diff,
                     "RNA Types", q["sol"])


def _gen_nucleotide_fill(seed: int, diff: float, qid: int) -> Dict:
    pairs = [
        ("The three components of a nucleotide are a phosphate group, a pentose sugar, and a _______________.", "nitrogenous base"),
        ("A _______________ lacks the phosphate group that is present in a nucleotide.", "nucleoside"),
        ("Adenine and guanine are classified as _______________ (double-ring bases).", "purines"),
        ("Cytosine and thymine are classified as _______________ (single-ring bases).", "pyrimidines"),
        ("The sugar present in DNA is called _______________ sugar.", "deoxyribose"),
        ("The sugar present in RNA is called _______________ sugar.", "ribose"),
        ("Uracil (U) replaces _______________ in RNA.", "thymine"),
        ("Nucleotides are joined together by _______________ bonds.", "phosphodiester"),
        ("ATP stands for _______________ and functions as the energy currency of the cell.", "adenosine triphosphate"),
        ("The _______________ group links the sugars of adjacent nucleotides in a nucleic acid chain.", "phosphate"),
    ]
    idx = seed % len(pairs)
    q_text, answer = pairs[idx]
    return _make_fill_blank(qid, q_text, answer, diff,
                            "Nucleotides/Nucleosides",
                            "A nucleotide comprises a phosphate group, a pentose sugar (deoxyribose in DNA, ribose in RNA), and a nitrogenous base (purine: A/G; pyrimidine: C/T/U).")


def _gen_dna_fill(seed: int, diff: float, qid: int) -> Dict:
    pairs = [
        ("Watson and Crick proposed the _______________ model of DNA structure in 1953.", "double helix"),
        ("Chargaff's rule states that A = ___________ and G = C in DNA.", "T"),
        ("The two strands of DNA run in _______________ directions (5' to 3' and 3' to 5').", "opposite"),
        ("Adenine pairs with _______________ via two hydrogen bonds in DNA.", "thymine"),
        ("Guanine pairs with _______________ via three hydrogen bonds in DNA.", "cytosine"),
        ("The _______________ experiment proved that DNA (not protein) is the genetic material of phage.", "Hershey-Chase"),
        ("In the Hershey-Chase experiment, radioactive ___________ labeled the phage DNA.", "phosphorus-32"),
        ("The diameter of the DNA double helix is approximately _______________ nm.", "2.0"),
        ("DNA replication is _______________ - each new molecule has one old and one new strand.", "semiconservative"),
        ("The _______________ group at the 5' end of a DNA strand has a free phosphate.", "5'"),
    ]
    idx = seed % len(pairs)
    q_text, answer = pairs[idx]
    return _make_fill_blank(qid, q_text, answer, diff, "DNA Structure",
                            "Watson-Crick proposed the double helix. Chargaff's rule: A=T, G=C. Hershey-Chase (1952) used 32P and 35S to prove DNA is genetic material.")


def _gen_rna_fill(seed: int, diff: float, qid: int) -> Dict:
    pairs = [
        ("The full form of mRNA is _______________ RNA.", "messenger"),
        ("tRNA has a _______________ loop that pairs with the codon on mRNA.", "anticodon"),
        ("rRNA is synthesized in the _______________ of the nucleus.", "nucleolus"),
        ("The _______________ codon (AUG) signals the start of translation on mRNA.", "start"),
        ("The poly-___________ tail is added to the 3' end of eukaryotic mRNA.", "adenylate"),
        ("tRNA carries _______________ to the ribosome during protein synthesis.", "amino acids"),
        ("rRNA constitutes approximately ___________ % of total cellular RNA.", "80"),
        ("mRNA carries genetic information from DNA in the _______________ to ribosomes.", "nucleus"),
        ("The three ___________ codons (UAA, UAG, UGA) signal the end of translation.", "stop"),
        ("tRNA has a characteristic _______________ secondary structure.", "cloverleaf"),
    ]
    idx = seed % len(pairs)
    q_text, answer = pairs[idx]
    return _make_fill_blank(qid, q_text, answer, diff, "RNA Types",
                            "mRNA = messenger RNA; tRNA carries amino acids via anticodon; rRNA is synthesized in the nucleolus and forms ribosomes.")


def _gen_nucleotide_short(seed: int, diff: float, qid: int) -> Dict:
    questions = [
        {
            "q": "Distinguish between a nucleoside and a nucleotide with a suitable example.",
            "ans": "A nucleoside consists of a pentose sugar (ribose or deoxyribose) linked to a nitrogenous base, WITHOUT a phosphate group. A nucleotide consists of a pentose sugar, a nitrogenous base, AND one or more phosphate groups. Example: Adenosine (adenine + ribose) is a nucleoside. Adenosine monophosphate/AMP (adenine + ribose + phosphate) is a nucleotide.",
            "kw": ["nucleoside", "nucleotide", "phosphate", "sugar", "base", "example"]
        },
        {
            "q": "What are purines and pyrimidines? Give one example of each.",
            "ans": "Purines are nitrogenous bases with a double-ring structure (two fused rings). Examples: Adenine (A) and Guanine (G). Pyrimidines are nitrogenous bases with a single-ring structure (one ring). Examples: Cytosine (C), Thymine (T) in DNA, and Uracil (U) in RNA.",
            "kw": ["purine", "pyrimridine", "double-ring", "single-ring", "example"]
        },
        {
            "q": "Name the four nitrogenous bases found in DNA and classify them as purines or pyrimidines.",
            "ans": "The four bases in DNA are: (1) Adenine (A) - Purine (double-ring); (2) Guanine (G) - Purine (double-ring); (3) Cytosine (C) - Pyrimidine (single-ring); (4) Thymine (T) - Pyrimidine (single-ring).",
            "kw": ["adenine", "guanine", "cytosine", "thymine", "purine", "pyrimidine"]
        },
        {
            "q": "How is a nucleotide different from a nucleoside? What is the significance of nucleotides?",
            "ans": "A nucleoside has a sugar + base (no phosphate). A nucleotide has sugar + base + phosphate. Significance: Nucleotides are the monomers of nucleic acids (DNA/RNA), serve as energy carriers (ATP), and function as coenzymes (NAD, FAD).",
            "kw": ["nucleoside", "nucleotide", "phosphate", "energy", "monomer"]
        },
    ]
    idx = seed % len(questions)
    q = questions[idx]
    return _make_short(qid, q["q"], q["ans"], diff, "Nucleotides/Nucleosides",
                       q["sol"] if "sol" in q else q["ans"], q["kw"])


def _gen_dna_short(seed: int, diff: float, qid: int) -> Dict:
    questions = [
        {
            "q": "Describe the Watson-Crick model of DNA structure. Mention four key features.",
            "ans": "Watson and Crick (1953) proposed a double helix model: (1) DNA is a double-stranded right-handed helix. (2) Strands run antiparallel (5'->3' and 3'->5'). (3) Bases pair by complementary base pairing: A-T (2 H-bonds) and G-C (3 H-bonds). (4) The sugar-phosphate backbone is hydrophilic (outer); bases are hydrophobic (inner). (5) Diameter = 2 nm, one turn = 3.4 nm (~10 bp).",
            "kw": ["double helix", "Watson-Crick", "antiparallel", "base pairing", "hydrogen bonds"]
        },
        {
            "q": "State Chargaff's rules and explain their significance in DNA structure.",
            "ans": "Chargaff's rules: (1) In any DNA, A = T and G = C (equimolar base pairing). (2) Purines = Pyrimidines (A+G = T+C). Significance: These rules indicated that bases pair specifically, which led Watson and Crick to deduce complementary base pairing in the double helix.",
            "kw": ["Chargaff", "A=T", "G=C", "purine", "pyrimidine", "significance"]
        },
        {
            "q": "Describe the Hershey-Chase experiment and explain how it identified DNA as the genetic material.",
            "ans": "Hershey and Chase (1952) used T2 bacteriophage. They labeled phage DNA with radioactive Phosphorus-32 (32P) and protein with radioactive Sulfur-35 (35S). After infection of E. coli, blender separation showed 32P entered bacterial cells while 35S remained outside. This proved DNA (not protein) is the genetic material.",
            "kw": ["Hershey-Chase", "32P", "35S", "T2 phage", "DNA", "genetic material"]
        },
        {
            "q": "How many hydrogen bonds are formed between complementary bases in DNA? Why is this significant?",
            "ans": "Adenine-Thymine (A-T) pairs form 2 hydrogen bonds. Guanine-Cytosine (G-C) pairs form 3 hydrogen bonds. This means G-C pairs are more thermally stable than A-T pairs. The total number of hydrogen bonds affects the melting temperature (Tm) of DNA; higher GC content requires more energy to denature.",
            "kw": ["hydrogen bond", "A-T", "G-C", "stability", "melting"]
        },
    ]
    idx = seed % len(questions)
    q = questions[idx]
    return _make_short(qid, q["q"], q["ans"], diff, "DNA Structure",
                       q["sol"] if "sol" in q else q["ans"], q["kw"])


def _gen_rna_short(seed: int, diff: float, qid: int) -> Dict:
    questions = [
        {
            "q": "Differentiate between mRNA, tRNA, and rRNA based on their structure and function.",
            "ans": "mRNA: Single-stranded, carries genetic code from DNA to ribosome for protein synthesis; has 5' cap and poly-A tail. tRNA: ~76-90 nt, cloverleaf structure, has anticodon loop and amino acid attachment site (CCA at 3' end). rRNA: Largest RNA (~80% of total), synthesized in nucleolus, forms structural and catalytic core of ribosomes (70S prokaryotic, 80S eukaryotic).",
            "kw": ["mRNA", "tRNA", "rRNA", "structure", "function", "ribosome"]
        },
        {
            "q": "Explain the role of tRNA in protein synthesis.",
            "ans": "tRNA (transfer RNA) plays a critical role in translation: (1) Each tRNA carries a specific amino acid attached to its 3' end (CCA sequence). (2) The anticodon loop of tRNA pairs with the complementary codon on mRNA. (3) This ensures amino acids are added to the growing polypeptide chain in the correct order as specified by the mRNA sequence.",
            "kw": ["tRNA", "anticodon", "amino acid", "mRNA", "translation", "codon"]
        },
        {
            "q": "What is the central dogma of molecular biology? Describe the role of mRNA in this process.",
            "ans": "The central dogma states: DNA -> RNA -> Protein. DNA is transcribed into mRNA (transcription), which is then translated into protein (translation). mRNA carries the genetic message from DNA (nucleus) to ribosomes (cytoplasm) where ribosomes read the codons and synthesize the corresponding polypeptide chain.",
            "kw": ["central dogma", "transcription", "translation", "mRNA", "DNA", "protein"]
        },
        {
            "q": "Describe the structural features of tRNA and explain how its structure relates to its function.",
            "ans": "tRNA has: (1) A cloverleaf secondary structure with four arms: acceptor arm (3' CCA for amino acid), D arm, anticodon arm, and TΨC arm. (2) An L-shaped tertiary structure. (3) Many modified bases. The anticodon arm pairs with mRNA codon (recognition), and the acceptor arm holds the amino acid (delivery), making tRNA the adaptor molecule in translation.",
            "kw": ["tRNA", "cloverleaf", "anticodon", "acceptor arm", "adaptor", "structure"]
        },
    ]
    idx = seed % len(questions)
    q = questions[idx]
    return _make_short(qid, q["q"], q["ans"], diff, "RNA Types",
                       q["sol"] if "sol" in q else q["ans"], q["kw"])


# ---------------------------------------------------------------------------
# Helper builders
# ---------------------------------------------------------------------------

def _make_mcq(qid: int, question_text: str, options: List[str],
              answer: str, difficulty: float, topic: str, solution: str) -> Dict:
    return {
        "id": qid,
        "question_text": question_text,
        "question_type": "mcq",
        "options": options,
        "answer": answer,
        "difficulty": round(difficulty, 2),
        "topic": topic,
        "solution": solution,
        "verification": {},
    }


def _make_fill_blank(qid: int, question_text: str, answer: str,
                     difficulty: float, topic: str, solution: str) -> Dict:
    return {
        "id": qid,
        "question_text": question_text,
        "question_type": "fill_blank",
        "options": [],
        "answer": answer.strip(),
        "difficulty": round(difficulty, 2),
        "topic": topic,
        "solution": solution,
        "verification": {},
    }


def _make_short(qid: int, question_text: str, answer: str,
                difficulty: float, topic: str, solution: str,
                keywords: Optional[List[str]] = None) -> Dict:
    return {
        "id": qid,
        "question_text": question_text,
        "question_type": "short_answer",
        "options": [],
        "answer": answer.strip(),
        "difficulty": round(difficulty, 2),
        "topic": topic,
        "solution": solution,
        "keywords": keywords or [],
        "verification": {},
    }


# ---------------------------------------------------------------------------
# QUESTION_REGISTRY
# ---------------------------------------------------------------------------

QUESTION_REGISTRY: Dict[str, Dict[str, Any]] = {
    "nucleotide_mcq":     {"fn": _gen_nucleotide_mcq,  "types": ["mcq"]},
    "dna_mcq":            {"fn": _gen_dna_mcq,         "types": ["mcq"]},
    "rna_mcq":            {"fn": _gen_rna_mcq,         "types": ["mcq"]},
    "nucleotide_fill":    {"fn": _gen_nucleotide_fill,  "types": ["fill_blank"]},
    "dna_fill":           {"fn": _gen_dna_fill,         "types": ["fill_blank"]},
    "rna_fill":           {"fn": _gen_rna_fill,         "types": ["fill_blank"]},
    "nucleotide_short":   {"fn": _gen_nucleotide_short, "types": ["short_answer"]},
    "dna_short":          {"fn": _gen_dna_short,        "types": ["short_answer"]},
    "rna_short":         {"fn": _gen_rna_short,        "types": ["short_answer"]},
}

TOPIC_LIST = list(QUESTION_REGISTRY.keys())


# ---------------------------------------------------------------------------
# Core API
# ---------------------------------------------------------------------------

def generate_questions(seed: int, count: int) -> List[Dict[str, Any]]:
    """Generate `count` CISCE ISC Biotech questions seeded by `seed`."""
    random.seed(seed)
    questions: List[Dict[str, Any]] = []
    used_ids: set = set()

    for i in range(count):
        topic_key = TOPIC_LIST[i % len(TOPIC_LIST)]
        registry_entry = QUESTION_REGISTRY[topic_key]
        generator_fn = registry_entry["fn"]

        qtype = registry_entry["types"][0]
        qid = hash((seed, i)) % 10_000_000
        while qid in used_ids:
            qid = (qid + 1) % 10_000_000
        used_ids.add(qid)

        difficulty = 0.1 + (0.8 * ((i + seed) % 10) / 9.0)
        difficulty = round(difficulty, 2)

        question = generator_fn(seed + i, difficulty, qid)
        questions.append(question)

    return questions


# ---------------------------------------------------------------------------
# Solvers
# ---------------------------------------------------------------------------

def solve_mcq(params: Dict) -> Dict:
    """Solve a multiple-choice question.

    params must include:
        question_text  – str
        options        – List[str]
        correct_answer – str  (or 'answer' key)
        user_answer    – Optional[str] to check against correct answer
    """
    question_text = params.get("question_text", "")
    options = params.get("options", [])
    correct = params.get("correct_answer", params.get("answer", ""))
    user_answer = params.get("user_answer", None)

    response: Dict[str, Any] = {
        "question_type": "mcq",
        "question_text": question_text,
        "options": options,
        "correct_answer": correct,
    }

    if user_answer is not None:
        is_correct = str(user_answer).strip() == str(correct).strip()
        response["user_answer"] = user_answer
        response["is_correct"] = is_correct
        response["explanation"] = (
            f"Correct! {correct} is the right answer."
            if is_correct
            else f"Incorrect. The correct answer is '{correct}'."
        )
    else:
        response["answer"] = correct

    return response


def solve_fill_blank(params: Dict) -> Dict:
    """Solve a fill-in-the-blank question.

    params must include:
        question_text – str (with blank indicated by ____ or ___________)
        answer        – str (the correct fill-in)
        user_answer   – Optional[str] to check
        case_sensitive – Optional[bool] (default False)
    """
    question_text = params.get("question_text", "")
    answer = params.get("answer", "")
    user_answer = params.get("user_answer", None)
    case_sensitive = params.get("case_sensitive", False)

    response: Dict[str, Any] = {
        "question_type": "fill_blank",
        "question_text": question_text,
        "correct_answer": answer,
    }

    if user_answer is not None:
        norm_user = str(user_answer).strip()
        norm_correct = str(answer).strip()
        if not case_sensitive:
            norm_user = norm_user.lower()
            norm_correct = norm_correct.lower()
        is_correct = norm_user == norm_correct
        response["user_answer"] = user_answer
        response["is_correct"] = is_correct
        response["explanation"] = (
            f"Correct! The blank should be filled with '{answer}'."
            if is_correct
            else f"Incorrect. The correct answer is '{answer}'."
        )
    else:
        response["answer"] = answer

    return response


def solve_short_answer(params: Dict) -> Dict:
    """Solve a short-answer question.

    params must include:
        question_text – str
        answer        – str (model answer)
        keywords      – Optional[List[str]] for partial-credit matching
        user_answer   – Optional[str] to check
    """
    question_text = params.get("question_text", "")
    answer = params.get("answer", "")
    keywords = params.get("keywords", [])
    user_answer = params.get("user_answer", None)

    response: Dict[str, Any] = {
        "question_type": "short_answer",
        "question_text": question_text,
        "model_answer": answer,
        "keywords": keywords,
    }

    if user_answer is not None:
        user_str = str(user_answer).strip().lower()
        model_str = str(answer).strip().lower()
        matched_keywords = [
            kw for kw in keywords
            if kw.lower() in user_str
        ]
        keyword_score = len(matched_keywords) / max(len(keywords), 1)
        exact_match = user_str == model_str
        similarity = _simple_similarity(user_str, model_str)
        score = round(max(keyword_score * 0.6 + similarity * 0.4, 0.0), 2)
        is_correct = score >= 0.5

        response["user_answer"] = user_answer
        response["matched_keywords"] = matched_keywords
        response["keyword_score"] = round(keyword_score, 2)
        response["similarity"] = round(similarity, 2)
        response["score"] = score
        response["is_correct"] = is_correct
        response["explanation"] = (
            f"Answer accepted (score: {score}). "
            f"Model answer: {answer}"
        )
    else:
        response["answer"] = answer

    return response


def _simple_similarity(s1: str, s2: str) -> float:
    """Jaccard-like similarity on word tokens."""
    if not s1 or not s2:
        return 0.0
    w1 = set(re.findall(r'\w+', s1))
    w2 = set(re.findall(r'\w+', s2))
    if not w1 and not w2:
        return 1.0
    intersection = w1 & w2
    union = w1 | w2
    return len(intersection) / len(union) if union else 0.0


# ---------------------------------------------------------------------------
# Verification
# ---------------------------------------------------------------------------

def verify_all_questions(questions: List[Dict]) -> Dict:
    """Validate all questions and return a verification report."""
    required_fields = [
        "id", "question_text", "question_type",
        "options", "answer", "difficulty",
        "topic", "solution", "verification",
    ]
    valid_types = {"mcq", "fill_blank", "short_answer"}
    valid_topics = {"Nucleotides/Nucleosides", "DNA Structure", "RNA Types"}

    total = len(questions)
    valid_count = 0
    invalid_count = 0
    errors: List[str] = []
    topic_counts: Dict[str, int] = {}
    type_counts: Dict[str, int] = {}
    diff_sum = 0.0

    for q in questions:
        q_errors: List[str] = []
        qid = q.get("id", "unknown")

        for field in required_fields:
            if field not in q:
                q_errors.append(f"Missing field '{field}'")

        qtype = q.get("question_type", "")
        if qtype not in valid_types:
            q_errors.append(f"Invalid question_type '{qtype}'")

        topic = q.get("topic", "")
        if topic not in valid_topics:
            q_errors.append(f"Invalid topic '{topic}'")

        diff = q.get("difficulty", -1)
        if not isinstance(diff, (int, float)) or not (0.0 <= diff <= 1.0):
            q_errors.append(f"Invalid difficulty {diff}")

        if qtype == "mcq":
            opts = q.get("options", [])
            if len(opts) < 2:
                q_errors.append("MCQ must have at least 2 options")
            ans = q.get("answer", "")
            if ans and ans not in opts:
                q_errors.append(f"Answer '{ans}' not in options")

        if qtype == "fill_blank":
            if not q.get("answer", "").strip():
                q_errors.append("fill_blank must have a non-empty answer")

        if q_errors:
            invalid_count += 1
            errors.append(f"Q{qid}: {'; '.join(q_errors)}")
        else:
            valid_count += 1
            q["verification"] = {"status": "valid"}

        topic_counts[topic] = topic_counts.get(topic, 0) + 1
        type_counts[qtype] = type_counts.get(qtype, 0) + 1
        diff_sum += diff if isinstance(diff, (int, float)) else 0.0

    avg_diff = round(diff_sum / total, 2) if total else 0.0

    return {
        "total_questions": total,
        "valid": valid_count,
        "invalid": invalid_count,
        "errors": errors,
        "topic_distribution": topic_counts,
        "type_distribution": type_counts,
        "avg_difficulty": avg_diff,
        "all_valid": invalid_count == 0,
    }


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    print("=" * 70)
    print("  CISCE ISC Biotechnology Class 12 - Question Generator")
    print("=" * 70)

    # --- generate 18 questions -------------------------------------------------
    questions = generate_questions(seed=42, count=18)
    print(f"\nGenerated {len(questions)} questions (seed=42)\n")

    # --- display summary -------------------------------------------------------
    for i, q in enumerate(questions, 1):
        icon = {"mcq": "[MCQ]", "fill_blank": "[FILL]", "short_answer": "[SHORT]"}.get(
            q["question_type"], "[?]")
        print(f"  {i:2d}. {icon} [{q['topic']}] (diff={q['difficulty']:.2f})")
        preview = q["question_text"][:80] + ("..." if len(q["question_text"]) > 80 else "")
        print(f"       {preview}")

    # --- verify -----------------------------------------------------------------
    report = verify_all_questions(questions)
    print(f"\nVerification Report:")
    print(f"  Total: {report['total_questions']}  |  Valid: {report['valid']}  |  Invalid: {report['invalid']}")
    print(f"  All valid: {report['all_valid']}")
    print(f"  Avg difficulty: {report['avg_difficulty']}")
    print(f"\nTopic distribution: {report['topic_distribution']}")
    print(f"Type distribution:  {report['type_distribution']}")
    if report["errors"]:
        print("\nErrors found:")
        for err in report["errors"]:
            print(f"  - {err}")

    # --- self-test solvers -----------------------------------------------------
    print("\n" + "=" * 70)
    print("SELF-TEST: Solver Functions")
    print("=" * 70)

    # MCQ solver
    mcq_result = solve_mcq({
        "question_text": "Which base pairs with adenine in DNA?",
        "options": ["Guanine", "Thymine", "Cytosine", "Uracil"],
        "correct_answer": "Thymine",
        "user_answer": "Thymine",
    })
    print(f"\nMCQ correct: {mcq_result['is_correct']} => {mcq_result['explanation']}")

    mcq_result2 = solve_mcq({
        "question_text": "Who proposed the double helix model?",
        "options": ["Watson & Crick", "Darwin", "Mendel", "Hershey"],
        "correct_answer": "Watson & Crick",
        "user_answer": "Darwin",
    })
    print(f"MCQ wrong:   {mcq_result2['is_correct']} => {mcq_result2['explanation']}")

    # Fill-blank solver
    fb_result = solve_fill_blank({
        "question_text": "The sugar in DNA is _______________.",
        "answer": "deoxyribose",
        "user_answer": "deoxyribose",
    })
    print(f"\nFill-blank correct: {fb_result['is_correct']} => {fb_result['explanation']}")

    fb_result2 = solve_fill_blank({
        "question_text": "RNA contains ___________ instead of thymine.",
        "answer": "uracil",
        "user_answer": "thymine",
    })
    print(f"Fill-blank wrong:   {fb_result2['is_correct']} => {fb_result2['explanation']}")

    # Short-answer solver
    sa_result = solve_short_answer({
        "question_text": "What is the role of tRNA?",
        "answer": "tRNA brings amino acids to the ribosome during protein synthesis using its anticodon to match mRNA codons.",
        "keywords": ["amino acid", "anticodon", "mRNA", "ribosome"],
        "user_answer": "tRNA carries amino acids to the ribosome and has an anticodon that pairs with mRNA codons.",
    })
    print(f"\nShort-answer score: {sa_result['score']}  correct={sa_result['is_correct']}")
    print(f"  Keywords matched: {sa_result['matched_keywords']}")

    print("\n" + "=" * 70)
    print("Self-test completed successfully!")
    print("=" * 70)