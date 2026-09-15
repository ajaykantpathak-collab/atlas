"""Node-mapped templates for Biology Class 12 (CISCE/ISC).

Each template is traceable to a specific atomic curriculum node via `node_id`.
Includes both numerical templates and deterministic conceptual rules.
"""

BIO_C12_NODE_TEMPLATES = [

# c12_bio_022: Sex-linked inheritance — haemophilia
# Haemophilic man (X^hY) × carrier woman (X^HX^h)
# Daughters: X^HX^h (carrier) or X^hX^h (haemophilic) → 50% haemophilic
{
    "template_name": "c12_bio_022_haemophilia_probability",
    "node_id": "c12_bio_022",
    "normalized_pattern": "haemophilic man marries carrier woman probability daughter haemophilic",
    "keywords": ["haemophilic", "haemophilia", "carrier", "woman", "man", "daughter", "probability", "sex-linked", "x-linked"],
    "variables": [],
    "steps": [
        {"command": "calculate 0.5", "purpose": "Haemophilic man (X^hY) × carrier woman (X^HX^h). Daughters: 50% X^HX^h (carrier), 50% X^hX^h (haemophilic). P(daughter haemophilic) = 1/2 = 0.5"},
    ],
    "subject": "bio",
    "rule": "Haemophilic man × carrier woman: 50% daughters haemophilic, 50% daughters carriers, 50% sons haemophilic, 50% sons normal.",
},

# c12_bio_050: Natality — number of new individuals added
{
    "template_name": "c12_bio_050_natality",
    "node_id": "c12_bio_050",
    "normalized_pattern": "calculate natality if initial and final population given",
    "keywords": ["natality", "population", "increased", "calculate", "lily", "plants", "pond", "after one year"],
    "variables": [
        {"name": "N_final", "patterns": [r"increased to\s*(\d+\.?\d*)", r"number.*?(\d+\.?\d*)\s*(?:after|increased)", r"final.*?(\d+\.?\d*)"], "required": True},
        {"name": "N_initial", "patterns": [r"number.*?was\s*(?:found to be\s*)?(\d+\.?\d*)", r"initial.*?(\d+\.?\d*)", r"(\d+\.?\d*)\s*(?:plants?|individuals?|species).*?(?:found|was)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {N_final} - {N_initial}", "purpose": "Natality = number of new individuals added = N_final - N_initial"},
    ],
    "subject": "bio",
},

# c12_bio_059: Hardy-Weinberg — find number of homozygous dominant
# Given q, find p = 1-q, p² = frequency of homozygous dominant, count = p² × N
{
    "template_name": "c12_bio_059_hardy_weinberg_count",
    "node_id": "c12_bio_059",
    "normalized_pattern": "hardy weinberg equilibrium allele frequency calculate number homozygous dominant",
    "keywords": ["hardy weinberg", "allele", "frequency", "homozygous", "dominant", "population", "calculate", "fruit flies"],
    "variables": [
        {"name": "q", "patterns": [r"frequency of allele \(a\) is (\d+\.?\d*)", r"allele \(a\).*?(\d+\.?\d*)", r"q\s*[=:]\s*(\d+\.?\d*)", r"frequency.*?\(a\)\s*(?:is|=)\s*(\d+\.?\d*)"], "required": True},
        {"name": "N", "patterns": [r"population of\s*(\d+\.?\d*)", r"(\d+)\s*fruit flies", r"(\d+)\s*individuals", r"N\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate 1 - {q}", "purpose": "Find p = 1 - q"},
        {"command": "calculate {step_1} ** 2", "purpose": "Find p² = frequency of homozygous dominant"},
        {"command": "calculate {step_2} * {N}", "purpose": "Find number of homozygous dominant = p² × N"},
    ],
    "subject": "bio",
},

# c12_bio_028: Genetic code — valine codons
{
    "template_name": "c12_bio_028_valine_codons",
    "node_id": "c12_bio_028",
    "normalized_pattern": "four triplet codons code for valine three are GUU GUC GUA write fourth codon",
    "keywords": ["codon", "valine", "GUU", "GUC", "GUA", "triplet", "fourth", "amino acid"],
    "variables": [],
    "steps": [
        {"command": "calculate 0", "purpose": "The four codons for valine are GUU, GUC, GUA, and GUG. The fourth codon is GUG."},
    ],
    "subject": "bio",
    "rule": "Valine codons: GUU, GUC, GUA, GUG. If three are given, the fourth is GUG.",
},

# c12_bio_063: Population growth rate — (change/time)
{
    "template_name": "c12_bio_063_population_growth_rate",
    "node_id": "c12_bio_063",
    "normalized_pattern": "calculate growth rate of population if initial species and added species and time given",
    "keywords": ["growth rate", "population", "ecosystem", "species", "added", "calculate", "years"],
    "variables": [
        {"name": "added", "patterns": [r"(\d+\.?\d*)\s*more\s*species", r"(\d+\.?\d*)\s*species.*added", r"added.*?(\d+\.?\d*)"], "required": True},
        {"name": "time", "patterns": [r"(\d+\.?\d*)\s*years?", r"after\s*(\d+\.?\d*)\s*years?", r"time\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {added} / {time}", "purpose": "Growth rate = number of new species added / time period"},
    ],
    "subject": "bio",
},

]
