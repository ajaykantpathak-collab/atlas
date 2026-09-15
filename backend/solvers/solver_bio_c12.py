"""
solver_bio_c12.py — CBSE Class 12 Biology solver functions and problem configs.

SOLVER_REGISTRY maps:
  - topic_name (e.g. "reproduction") → list of problem config dicts
  - topic_problem_type (e.g. "reproduction_meiosis") → solver function

Each solver function is called as: solver(problem_type, variables) → SolverResult
SolverResult has: question_text, marks, difficulty, blooms_level,
                  misconception_tags, variables, model_answer, final_answer, steps
Steps have: .text
"""
from __future__ import annotations
import random
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional


@dataclass
class Step:
    text: str = ""


@dataclass
class SolverResult:
    success: bool = True
    question_text: str = ""
    marks: int = 3
    difficulty: str = "Medium"
    blooms_level: str = "Understand"
    misconception_tags: List[str] = field(default_factory=list)
    variables: Dict[str, Any] = field(default_factory=dict)
    model_answer: str = ""
    final_answer: str = ""
    steps: List[Step] = field(default_factory=list)
    error: Optional[str] = None


# ─── Helper ───
def _make_result(qt: str, answer: str, steps: List[str], marks: int = 3,
                 difficulty: str = "Medium", blooms: str = "Understand",
                 tags: List[str] = None) -> SolverResult:
    return SolverResult(
        question_text=qt,
        marks=marks,
        difficulty=difficulty,
        blooms_level=blooms,
        misconception_tags=tags or [],
        model_answer=answer,
        final_answer=answer,
        steps=[Step(s) for s in steps],
    )


# ─── Reproduction ───

def reproduction_meiosis(problem_type: str, variables: dict) -> SolverResult:
    return _make_result(
        "Describe the stages of meiosis I and explain how crossing over contributes to genetic variation.",
        "Meiosis I: Prophase I (crossing over), Metaphase I (bivalent alignment), Anaphase I (homologous chromosomes separate), Telophase I (two haploid cells). Crossing over in Pachytene exchanges genetic material between homologous chromosomes, creating recombinant chromosomes.",
        ["Prophase I: Leptotene, Zygotene, Pachytene (crossing over), Diplotene, Diakinesis",
         "Metaphase I: Bivalents align at equator",
         "Anaphase I: Homologous chromosomes separate (reductional division)",
         "Telophase I: Two haploid cells formed"],
        tags=["crossing over", "genetic variation", "reductional division"],
    )


def reproduction_flowering(problem_type: str, variables: dict) -> SolverResult:
    return _make_result(
        "Explain double fertilisation in angiosperms and the fate of the male gametes.",
        "Double fertilisation: One male gamete fuses with egg → zygote (2n). Second male gamete fuses with central cell (2 polar nuclei) → primary endosperm nucleus (3n). Zygote → embryo, PEN → endosperm.",
        ["Pollen tube enters ovule through micropyle",
         "One male gamete + egg → zygote (2n) — syngamy",
         "Second male gamete + 2 polar nuclei → PEN (3n) — triple fusion",
         "Zygote → embryo, PEN → endosperm (nourishment)"],
        tags=["double fertilisation", "triple fusion", "endosperm"],
    )


def reproduction_human(problem_type: str, variables: dict) -> SolverResult:
    return _make_result(
        "Describe the hormonal regulation of the menstrual cycle in human females.",
        "FSH → follicular development → oestrogen → LH surge → ovulation → corpus luteum → progesterone → maintains endometrium. If no fertilisation, progesterone drops → menstruation.",
        ["FSH stimulates follicular growth in ovary",
         "Growing follicle secretes oestrogen → thickens endometrium",
         "LH surge triggers ovulation (day 14)",
         "Corpus luteum secretes progesterone → maintains endometrium",
         "No fertilisation → corpus luteum regresses → progesterone falls → menstruation"],
        tags=["FSH", "LH", "oestrogen", "progesterone", "ovulation"],
    )


# ─── Genetics ───

def genetics_mendel(problem_type: str, variables: dict) -> SolverResult:
    return _make_result(
        "A tall pea plant (Tt) is crossed with a dwarf pea plant (tt). Using a Punnett square, determine the phenotypic and genotypic ratios of the offspring.",
        "Cross: Tt × tt. Gametes: T, t and t, t. Offspring: Tt (tall), Tt (tall), tt (dwarf), tt (dwarf). Phenotypic ratio: 1:1 (tall:dwarf). Genotypic ratio: 1:1 (Tt:tt).",
        ["Parent cross: Tt × tt",
         "Gametes: T, t from parent 1; t, t from parent 2",
         "Punnett square: Tt, Tt, tt, tt",
         "Phenotypic ratio: 50% tall, 50% dwarf = 1:1",
         "Genotypic ratio: Tt:tt = 1:1"],
        tags=["Punnett square", "monohybrid cross", "test cross"],
    )


def genetics_linkage(problem_type: str, variables: dict) -> SolverResult:
    return _make_result(
        "Explain linkage and recombination frequency. How does linkage affect Mendelian inheritance ratios?",
        "Linked genes are on the same chromosome and tend to be inherited together. Recombination frequency = (recombinants / total offspring) × 100. 1% recombination = 1 map unit. Linkage alters expected Mendelian ratios.",
        ["Linked genes: same chromosome, inherited together",
         "Recombination occurs via crossing over",
         "Recombination frequency = recombinants/total × 100",
         "1% recombination = 1 centiMorgan (cM) = 1 map unit",
         "Closer genes → lower recombination frequency"],
        tags=["linkage", "recombination", "map distance"],
    )


def genetics_chromosomal(problem_type: str, variables: dict) -> SolverResult:
    return _make_result(
        "Describe the chromosomal theory of inheritance and its significance.",
        "Sutton and Boveri: Chromosomes carry genes, behaviour of chromosomes during meiosis explains Mendel's laws. Gene linkage, sex-linked inheritance, and crossing over support this theory.",
        ["Sutton-Boveri theory: genes are on chromosomes",
         "Chromosome behaviour in meiosis explains segregation and independent assortment",
         "Morgan's work on Drosophila confirmed sex-linked inheritance",
         "Crossing over provides mechanism for recombination"],
        tags=["Sutton-Boveri", "chromosomal theory", "sex-linked"],
    )


# ─── Molecular Biology ───

def molecular_biology_dna(problem_type: str, variables: dict) -> SolverResult:
    return _make_result(
        "Describe the structure of DNA as proposed by Watson and Crick. Explain the significance of base pairing.",
        "DNA: Double helix, antiparallel strands, sugar-phosphate backbone, nitrogenous bases inside. A=T (2 H-bonds), G≡C (3 H-bonds). Complementary base pairing ensures accurate replication.",
        ["Double helix: two antiparallel polynucleotide strands",
         "Sugar-phosphate backbone on outside, bases inside",
         "A=T (2 H-bonds), G≡C (3 H-bonds) — Chargaff's rule",
         "One turn = 3.4 nm, 10 base pairs",
         "Complementary pairing → semi-conservative replication"],
        tags=["Watson-Crick", "double helix", "base pairing", "Chargaff"],
    )


def molecular_biology_transcription(problem_type: str, variables: dict) -> SolverResult:
    return _make_result(
        "Explain the process of transcription in eukaryotes, including post-transcriptional modifications.",
        "Transcription: DNA → RNA by RNA polymerase. Initiation (promoter), Elongation (RNA synthesis 5'→3'), Termination. In eukaryotes: 5' capping, 3' polyadenylation, splicing (introns removed, exons joined).",
        ["Initiation: RNA polymerase binds promoter, unwinds DNA",
         "Elongation: RNA synthesised 5'→3' using template strand",
         "Termination: RNA polymerase detaches at terminator",
         "Post-transcriptional: 5' cap (m7G), 3' poly-A tail",
         "Splicing: introns removed, exons ligated → mature mRNA"],
        tags=["transcription", "RNA polymerase", "splicing", "introns"],
    )


def molecular_biology_translation(problem_type: str, variables: dict) -> SolverResult:
    return _make_result(
        "Describe the process of translation (protein synthesis) in prokaryotes.",
        "Translation: mRNA → protein. Initiation (ribosome assembles on mRNA, fMet-tRNA at start codon), Elongation (amino acids added via tRNA, peptide bonds), Termination (stop codon, release factor).",
        ["Initiation: 30S+50S → 70S ribosome, fMet-tRNA at AUG start codon",
         "Elongation: A site (aminoacyl-tRNA enters), P site (peptide bond), E site (exit)",
         "Peptide bond formed by peptidyl transferase",
         "Translocation: ribosome moves one codon along mRNA",
         "Termination: stop codon (UAA/UAG/UGA) → release factor → polypeptide released"],
        tags=["translation", "ribosome", "codon", "tRNA"],
    )


# ─── Evolution ───

def evolution_natural_selection(problem_type: str, variables: dict) -> SolverResult:
    return _make_result(
        "Explain Darwin's theory of natural selection with an example.",
        "Darwin: Variation exists in populations. Organisms with favourable variations survive and reproduce (survival of the fittest). Example: Industrial melanism in peppered moth (Biston betularia) — dark moths survived in polluted areas.",
        ["Variation exists within populations",
         "More offspring produced than can survive → struggle for existence",
         "Favourable variations → better survival and reproduction",
         "Beneficial traits inherited → accumulate over generations",
         "Example: Peppered moth — dark form favoured in industrial pollution"],
        tags=["Darwin", "natural selection", "survival of the fittest", "industrial melanism"],
    )


def evolution_hardy_weinberg(problem_type: str, variables: dict) -> SolverResult:
    return _make_result(
        "State the Hardy-Weinberg principle and explain the conditions for genetic equilibrium.",
        "Hardy-Weinberg: p² + 2pq + q² = 1, where p and q are allele frequencies. Conditions: No mutation, no migration, random mating, no natural selection, large population. Violation → evolution.",
        ["Equation: p² + 2pq + q² = 1 (p+q=1)",
         "p² = frequency of homozygous dominant",
         "2pq = frequency of heterozygous",
         "q² = frequency of homozygous recessive",
         "Conditions: no mutation, no gene flow, random mating, no selection, large population"],
        tags=["Hardy-Weinberg", "allele frequency", "genetic equilibrium"],
    )


# ─── Health ───

def health_disease(problem_type: str, variables: dict) -> SolverResult:
    return _make_result(
        "Describe the causes, symptoms, and prevention of typhoid fever.",
        "Typhoid: Caused by Salmonella typhi. Symptoms: Sustained high fever, weakness, stomach pain, headache, loss of appetite. Transmission: Contaminated food/water. Prevention: Clean drinking water, proper sanitation, vaccination.",
        ["Cause: Salmonella typhi (bacteria)",
         "Transmission: Faecal-oral route, contaminated food/water",
         "Symptoms: Sustained fever (39-40°C), abdominal pain, weakness, rose spots",
         "Diagnosis: Widal test",
         "Prevention: Safe water, sanitation, Ty21a vaccine"],
        tags=["Salmonella typhi", "Widal test", "waterborne disease"],
    )


def health_immunity(problem_type: str, variables: dict) -> SolverResult:
    return _make_result(
        "Distinguish between innate and acquired immunity. Give examples of each.",
        "Innate immunity: Non-specific, present from birth (skin barrier, phagocytes, inflammation). Acquired immunity: Specific, developed after exposure (antibodies, memory cells). Active (natural infection/vaccine) vs Passive (maternal antibodies/antiserum).",
        ["Innate: Non-specific, immediate, no memory — skin, mucous, phagocytes, complement",
         "Acquired: Specific, slower, has memory — B cells (antibodies), T cells (cell-mediated)",
         "Active acquired: Natural infection or vaccination → long-lasting",
         "Passive acquired: Antibodies transferred (mother to foetus, antiserum) → temporary"],
        tags=["innate immunity", "acquired immunity", "antibodies", "vaccination"],
    )


# ─── Biotechnology ───

def biotechnology_recombinant(problem_type: str, variables: dict) -> SolverResult:
    return _make_result(
        "Explain the steps involved in producing recombinant DNA (rDNA) technology.",
        "rDNA technology: 1) Isolation of gene (restriction enzymes), 2) Insertion into vector (plasmid), 3) Transformation into host (E. coli), 4) Selection of recombinants (antibiotic resistance), 5) Expression of protein.",
        ["Step 1: Isolate gene of interest using restriction endonuclease",
         "Step 2: Cut vector (plasmid) with same enzyme → sticky ends",
         "Step 3: Ligate gene + vector using DNA ligase → recombinant DNA",
         "Step 4: Transform into host (heat shock/electroporation)",
         "Step 5: Select recombinants using marker genes (ampicillin resistance)"],
        tags=["restriction enzyme", "plasmid", "transformation", "rDNA"],
    )


def biotechnology_pcr(problem_type: str, variables: dict) -> SolverResult:
    return _make_result(
        "Explain the Polymerase Chain Reaction (PCR) and its applications.",
        "PCR: Denaturation (95°C, DNA separates), Annealing (55°C, primers bind), Extension (72°C, Taq polymerase synthesises DNA). Cycles amplify DNA exponentially. Applications: DNA fingerprinting, disease diagnosis, gene cloning.",
        ["Denaturation: 95°C → strands separate",
         "Annealing: 55°C → primers bind to template",
         "Extension: 72°C → Taq polymerase adds nucleotides",
         "Each cycle doubles DNA → 2ⁿ copies after n cycles",
         "Applications: Forensics, diagnosis, cloning, sequencing"],
        tags=["PCR", "Taq polymerase", "DNA amplification", "primers"],
    )


# ─── Ecology ───

def ecology_pyramid(problem_type: str, variables: dict) -> SolverResult:
    return _make_result(
        "Describe ecological pyramids and explain why the pyramid of energy is always upright.",
        "Ecological pyramids: Number, Biomass, Energy. Energy pyramid always upright because energy decreases at each trophic level (10% law — only 10% transferred to next level). Number and biomass pyramids can be inverted.",
        ["Pyramid of numbers: counts individuals per trophic level (can be inverted)",
         "Pyramid of biomass: total biomass per level (can be inverted in aquatic)",
         "Pyramid of energy: energy flow per level (always upright)",
         "10% law (Lindemann): only 10% energy transferred to next trophic level",
         "Energy lost as heat, respiration, metabolic processes"],
        tags=["ecological pyramid", "10% law", "trophic level", "Lindemann"],
    )


def ecology_biodiversity(problem_type: str, variables: dict) -> SolverResult:
    return _make_result(
        "Explain the importance of biodiversity and describe the threats to biodiversity in India.",
        "Biodiversity: Variety of life at genetic, species, ecosystem levels. Important for ecosystem services, medicinal resources, food security. Threats: Habitat loss, poaching, pollution, climate change, invasive species. Conservation: Biosphere reserves, national parks, seed banks.",
        ["Genetic diversity: variation within species",
         "Species diversity: variety of species in a region",
         "Ecosystem diversity: variety of habitats and communities",
         "Threats: Habitat destruction, overexploitation, pollution, invasive species",
         "Conservation: In-situ (national parks, sanctuaries) and Ex-situ (zoos, seed banks)"],
        tags=["biodiversity", "conservation", "ecosystem services", "endemic species"],
    )


# ─── Problem Configs ───
REPRODUCTION_CONFIGS = [
    {"type": "meiosis", "variables": []},
    {"type": "flowering", "variables": []},
    {"type": "human", "variables": []},
]
GENETICS_CONFIGS = [
    {"type": "mendel", "variables": []},
    {"type": "linkage", "variables": []},
    {"type": "chromosomal", "variables": []},
]
MOLECULAR_BIOLOGY_CONFIGS = [
    {"type": "dna", "variables": []},
    {"type": "transcription", "variables": []},
    {"type": "translation", "variables": []},
]
EVOLUTION_CONFIGS = [
    {"type": "natural_selection", "variables": []},
    {"type": "hardy_weinberg", "variables": []},
]
HEALTH_CONFIGS = [
    {"type": "disease", "variables": []},
    {"type": "immunity", "variables": []},
]
BIOTECHNOLOGY_CONFIGS = [
    {"type": "recombinant", "variables": []},
    {"type": "pcr", "variables": []},
]
ECOLOGY_CONFIGS = [
    {"type": "pyramid", "variables": []},
    {"type": "biodiversity", "variables": []},
]


SOLVER_REGISTRY = {
    # Topic-level → list of problem configs
    "reproduction": REPRODUCTION_CONFIGS,
    "genetics": GENETICS_CONFIGS,
    "molecular_biology": MOLECULAR_BIOLOGY_CONFIGS,
    "evolution": EVOLUTION_CONFIGS,
    "health": HEALTH_CONFIGS,
    "biotechnology": BIOTECHNOLOGY_CONFIGS,
    "ecology": ECOLOGY_CONFIGS,
    # Problem-type-level → solver functions
    "reproduction_meiosis": reproduction_meiosis,
    "reproduction_flowering": reproduction_flowering,
    "reproduction_human": reproduction_human,
    "genetics_mendel": genetics_mendel,
    "genetics_linkage": genetics_linkage,
    "genetics_chromosomal": genetics_chromosomal,
    "molecular_biology_dna": molecular_biology_dna,
    "molecular_biology_transcription": molecular_biology_transcription,
    "molecular_biology_translation": molecular_biology_translation,
    "evolution_natural_selection": evolution_natural_selection,
    "evolution_hardy_weinberg": evolution_hardy_weinberg,
    "health_disease": health_disease,
    "health_immunity": health_immunity,
    "biotechnology_recombinant": biotechnology_recombinant,
    "biotechnology_pcr": biotechnology_pcr,
    "ecology_pyramid": ecology_pyramid,
    "ecology_biodiversity": ecology_biodiversity,
}
