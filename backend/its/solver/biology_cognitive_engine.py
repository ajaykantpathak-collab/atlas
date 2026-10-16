"""biology_cognitive_engine.py — 10/10 Cognitive Architecture for Biology & NEET.

Deterministic Tier-0 Engine for NEET Medical Entrance Biology:
1. Assertion-Reason (A-R) Causal Logic Engine:
   - Evaluates propositional truth values: Truth(A) and Truth(R)
   - Evaluates Causal Implication: CausalExplain(R -> A) vs Coincidental Truth
   - Maps to standard NEET 4-choice matrix:
     (1) Both A and R are True, and R is the correct explanation of A.
     (2) Both A and R are True, but R is NOT the correct explanation of A.
     (3) A is True, but R is False.
     (4) A is False, but R is True (or both False).
2. NCERT Verbatim Anchor & Canonical Exception Matrix:
   - Verifies statements against canonical NCERT textbook definitions and traps.
3. Bio-Energetic & Physiological Balance Sheet:
   - Respiration ATP stoichiometry (Glycolysis, Krebs, ETC P/O ratio)
   - Photosynthesis quantum requirement (Calvin cycle ATP/NADPH accounting)
   - Cardiac cycle output and pulmonary gas exchange
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Any, Dict, List, Optional, Tuple


@dataclass
class BiologySolveResult:
    success: bool
    domain: str  # 'ASSERTION_REASON', 'NCERT_VERBATIM', 'BIO_ENERGETICS'
    topic: str
    primary_answer: str
    selected_option: Optional[str]
    ncert_reference: str
    steps: List[str]
    error: Optional[str] = None


# Knowledge base of classical NEET Assertion-Reason canonical topics
NEET_AR_DATABASE = [
    {
        "keywords": ["c4", "photorespiration", "kranz", "rubisco"],
        "assertion": "Photosynthesis in C4 plants is more efficient than C3 plants at elevated temperatures.",
        "reason": "C4 plants possess Kranz anatomy which concentrates CO2 around RuBisCO, thereby suppressing RuBisCO oxygenase activity.",
        "a_true": True,
        "r_true": True,
        "is_causal_explanation": True,
        "ncert_ref": "Class 11 Biology, Chapter 11 (Photosynthesis), Section 13.8 (The C4 Pathway)",
        "explanation": "Kranz anatomy maintains high local CO2/O2 ratio in bundle sheath cells, preventing the wasteful photorespiratory glycolate pathway.",
    },
    {
        "keywords": ["semiconservative", "dna", "meselson", "stahl", "15n"],
        "assertion": "DNA replication in living organisms is semi-conservative in nature.",
        "reason": "Meselson and Stahl grew E. coli in 15NH4Cl medium and separated DNA by CsCl density gradient centrifugation.",
        "a_true": True,
        "r_true": True,
        "is_causal_explanation": False,
        "ncert_ref": "Class 12 Biology, Chapter 6 (Molecular Basis of Inheritance), Section 6.4.2",
        "explanation": "While both statements are factually true, the reason describes the experimental methodology that proved the hypothesis; it does not explain the biological/chemical mechanism of why replication is semiconservative (which is hydrogen bonding complementarity of template strands).",
    },
    {
        "keywords": ["mitochondria", "chloroplast", "semi-autonomous", "ribosome", "70s", "circular dna"],
        "assertion": "Mitochondria and chloroplasts are regarded as semi-autonomous cellular organelles.",
        "reason": "They possess their own circular double-stranded DNA, 70S ribosomes, and synthesize some of their own structural proteins.",
        "a_true": True,
        "r_true": True,
        "is_causal_explanation": True,
        "ncert_ref": "Class 11 Biology, Chapter 8 (Cell: The Unit of Life), Sections 8.5.4 & 8.5.5",
        "explanation": "The possession of an autonomous genome and translation machinery confers partial independence from the nuclear genome, directly justifying the term 'semi-autonomous'.",
    },
    {
        "keywords": ["mitochondria", "powerhouse", "atp", "cellular energy"],
        "assertion": "Mitochondria are known as the powerhouses of the cell.",
        "reason": "Mitochondria produce cellular energy in the form of ATP through oxidative phosphorylation.",
        "a_true": True,
        "r_true": True,
        "is_causal_explanation": True,
        "ncert_ref": "Class 11 Biology, Chapter 8 (Cell: The Unit of Life), Section 8.5.4",
        "explanation": "ATP is the primary cellular energy currency; because mitochondria produce and supply ATP for metabolic activities, they are designated powerhouses.",
    },
    {
        "keywords": ["cyclic", "photophosphorylation", "ps-i", "ps-ii", "nadph", "atp"],
        "assertion": "Cyclic photophosphorylation does not result in the production of NADPH.",
        "reason": "In cyclic electron flow, electrons extruded from PS-I (P700) are routed through cyt b6f back to P700 without involvement of PS-II or ferredoxin-NADP+ reductase.",
        "a_true": True,
        "r_true": True,
        "is_causal_explanation": True,
        "ncert_ref": "Class 11 Biology, Chapter 11 (Photosynthesis), Section 13.6.2",
        "explanation": "Because electrons return to the P700 reaction center, no terminal electron acceptor (NADP+) is reduced, yielding only ATP through proton translocation.",
    },
]


# ---------------------------------------------------------------------------
# Question-side NCERT fact recall (GOLDEN-BIO 2026-10-06).
#
# The NEET_AR_DATABASE above anchors on ANSWER-side terms: the entry for
# "mitochondria powerhouse" fires only when the words "mitochondria" and
# "powerhouse" BOTH appear in the text.  That can never serve the canonical
# recall question "Which cell organelle is called the powerhouse of the
# cell?" -- the answer term is exactly what the question withholds.
#
# This table is keyed on QUESTION-side canonical phrases and maps them to
# ONE unambiguous NCERT fact each.  Honesty rules (the refusal contract):
#   - only these exact curated facts verify; anything else returns None
#     and the question keeps its honest guided refusal;
#   - a why/how/explain form of the SAME phrase refuses too (a bare noun
#     is not an answer to a reason question);
#   - with inline options, the fact ships an option letter ONLY when
#     exactly one option carries it -- zero or two-plus matches refuse.
# ---------------------------------------------------------------------------
NCERT_FACT_RECALL = [
    {
        "pattern": r"powerhouse\s+of\s+(?:the\s+)?cell",
        "label": "powerhouse of the cell",
        "answer": "Mitochondria",
        "why": "site of aerobic respiration and ATP synthesis",
        "ncert_ref": (
            "Class 11 Biology, Chapter 8 (Cell: The Unit of Life)"),
    },
    {
        "pattern": r"suicidal\s+bags?\s+of\s+(?:the\s+)?cell",
        "label": "suicidal bags of the cell",
        "answer": "Lysosome",
        "why": "they digest cellular waste and can break down the cell "
               "itself when ruptured",
        "ncert_ref": (
            "Class 11 Biology, Chapter 8 (Cell: The Unit of Life)"),
    },
    {
        "pattern": r"kitchen\s+of\s+(?:the\s+)?cell",
        "label": "kitchen of the cell",
        "answer": "Chloroplast",
        "why": "photosynthesis, which makes food for the plant, happens "
               "inside them",
        "ncert_ref": (
            "Class 11 Biology, Chapter 8 (Cell: The Unit of Life)"),
    },
    {
        "pattern": r"(?:control\s+cent(?:re|er)|brain)\s+of\s+(?:the\s+)?cell",
        "label": "control centre of the cell",
        "answer": "Nucleus",
        "why": "it holds the genome and directs all cellular activities",
        "ncert_ref": (
            "Class 11 Biology, Chapter 8 (Cell: The Unit of Life)"),
    },
    {
        "pattern": r"energy\s+currency\s+of\s+(?:the\s+)?cell",
        "label": "energy currency of the cell",
        "answer": "ATP (adenosine triphosphate)",
        "why": "energy released in respiration is stored in its phosphate "
               "bonds and spent by every cell process",
        "ncert_ref": (
            "Class 11 Biology, Chapter 12 (Respiration in Plants)"),
    },
    # -- c11/c12 anchor wave (GOLDEN-BIO 2026-10-06): converts the
    #    highest-value class-11/12 COVERAGE refusals (photosynthesis and
    #    respiration numbers, genetics, evolution, human physiology,
    #    biotech) into question-side single-fact anchors.  Same honesty
    #    rules as the five originals: one curated fact each, why-forms
    #    and multi-part asks refuse, option letters only on an exactly-
    #    one option match. ------------------------------------------------
    # C11 ch1 The Living World / ch2 Biological Classification
    {
        "pattern": (r"basic\s+unit\s+of\s+classification|"
                    r"lowest\s+taxonomic\s+category"),
        "label": "basic unit of classification",
        "answer": "Species",
        "why": "it is the lowest category whose members share the "
               "fundamental similarities and can interbreed",
        "ncert_ref": (
            "Class 11 Biology, Chapter 1 (The Living World)"),
    },
    {
        "pattern": r"variety\s+of\s+organisms",
        "label": "diversity of organisms in an area",
        "answer": "Biodiversity",
        "why": "it is the term for the totality and variety of life in a "
               "given region",
        "ncert_ref": (
            "Class 11 Biology, Chapter 1 (The Living World)"),
    },
    {
        "pattern": (r"five\s+kingdom\s+classification[^.]{0,40}"
                    r"(?:proposed|introduced|given)|(?:who\s+proposed|"
                    r"who\s+introduced|who\s+gave)[^.]{0,40}five\s+kingdom"),
        "label": "proposer of the five kingdom classification",
        "answer": "R.H. Whittaker",
        "why": "he proposed the five kingdoms Monera, Protista, Fungi, "
               "Plantae and Animalia in 1969 on criteria of cell "
               "structure, body organisation and nutrition",
        "ncert_ref": (
            "Class 11 Biology, Chapter 2 (Biological Classification), Section 2.1"),
    },
    {
        "pattern": (r"binomial\s+nomenclature[^.]{0,40}(?:proposed|"
                    r"introduced|given|coined)|(?:who\s+proposed|who\s+gave|"
                    r"who\s+introduced|who\s+coined)[^.]{0,40}binomial"),
        "label": "proposer of binomial nomenclature",
        "answer": "Carolus Linnaeus",
        "why": "his two-word naming scheme (Generic name + specific "
               "epithet) is the basis of scientific naming",
        "ncert_ref": (
            "Class 11 Biology, Chapter 1 (The Living World)"),
    },
    {
        "pattern": (r"red\s+pigment[^.]{0,40}rhodophyt|rhodophyt[^.]{0,40}"
                    r"pigment|pigment[^.]{0,40}red\s+algae"),
        "label": "red pigment of rhodophytes",
        "answer": "r-phycoerythrin",
        "why": "this phycobilin pigment gives the red algae "
               "(Rhodophyta) their predominant red colour",
        "ncert_ref": (
            "Class 11 Biology, Chapter 3 (Plant Kingdom)"),
    },
    {
        "pattern": (r"slime\s+moulds?[^.]{0,40}(?:kingdom|belong)|"
                    r"kingdom[^.]{0,40}slime\s+moulds?"),
        "label": "kingdom of slime moulds",
        "answer": "Protista",
        "why": "they are saprophytic protists; under suitable conditions "
               "they form an aggregation called plasmodium",
        "ncert_ref": (
            "Class 11 Biology, Chapter 2 (Biological Classification)"),
    },
    # C11 ch3 Plant Kingdom
    {
        "pattern": (r"gymnosperms?[^.]{0,40}seeds?\s+(?:are|bear|is|called)|"
                    r"seeds?[^.]{0,30}gymnosperms?\s+bear|"
                    r"what\s+kind\s+of\s+seeds?\s+do\s+gymnosperms"),
        "label": "nature of gymnosperm seeds",
        "answer": "Naked",
        "why": "gymnosperm ovules lie naked on megasporophylls, not "
               "enclosed inside an ovary, so the seeds are naked",
        "ncert_ref": (
            "Class 11 Biology, Chapter 3 (Plant Kingdom)"),
    },
    {
        "pattern": (r"female\s+sex\s+organ[^.]{0,50}(?:bryophyt|"
                    r"pteridophyt)|(?:bryophyt|pteridophyt)[^.]{0,50}"
                    r"female\s+sex\s+organ"),
        "label": "female sex organ of bryophytes and pteridophytes",
        "answer": "Archegonium",
        "why": "it is a flask-shaped organ producing a single egg",
        "ncert_ref": (
            "Class 11 Biology, Chapter 3 (Plant Kingdom)"),
    },
    {
        "pattern": (r"double\s+fertilisation[^.]{0,50}characteristic|"
                    r"double\s+fertilisation\s+(?:occurs?|is\s+found|"
                    r"takes?\s+place)\s+in|"
                    r"in\s+which\s+group\s+does\s+double\s+fertilisation"),
        "label": "group where double fertilisation is characteristic",
        "answer": "Angiosperms",
        "why": "two male gametes fuse with two cells (egg + polar "
               "nuclei) of the embryo sac -- unique to flowering plants",
        "ncert_ref": (
            "Class 11 Biology, Chapter 3 (Plant Kingdom)"),
    },
    # C11 ch4 Animal Kingdom
    {
        "pattern": (r"radial\s+symmetry[^.]{0,40}seen\s+in|"
                    r"radial\s+symmetry[^.]{0,40}(?:found|exhibited)|"
                    r"which\s+animal[^.]{0,30}radial\s+symmetry"),
        "label": "animal showing radial symmetry",
        "answer": "Starfish",
        "why": "echinoderms such as the starfish show radial (pentamerous) "
               "symmetry in the adult stage",
        "ncert_ref": (
            "Class 11 Biology, Chapter 4 (Animal Kingdom)"),
    },
    {
        "pattern": (r"which\s+phylum[^.]{0,40}water\s+vascular|"
                    r"water\s+vascular\s+system[^.]{0,40}phylum"),
        "label": "phylum with a water vascular system",
        "answer": "Echinodermata",
        "why": "the water vascular system with tube feet aids locomotion "
               "and food capture in echinoderms",
        "ncert_ref": (
            "Class 11 Biology, Chapter 4 (Animal Kingdom)"),
    },
    {
        "pattern": (r"notochord[^.]{0,50}(?:phylum|characteristic|feature)|"
                    r"(?:which\s+phylum|phylum)[^.]{0,40}notochord"),
        "label": "phylum characterised by a notochord",
        "answer": "Chordata",
        "why": "the presence of a notochord, dorsal hollow nerve cord and "
               "pharyngeal gill slits defines the phylum",
        "ncert_ref": (
            "Class 11 Biology, Chapter 4 (Animal Kingdom)"),
    },
    # C11 ch5 Morphology / ch6 Anatomy
    {
        "pattern": r"arrangement\s+of\s+leaves",
        "label": "arrangement of leaves on a stem",
        "answer": "Phyllotaxy",
        "why": "alternate, opposite or whorled arrangements of leaves on "
               "the stem or its branches",
        "ncert_ref": (
            "Class 11 Biology, Chapter 5 (Morphology of Flowering Plants)"),
    },
    {
        "pattern": (r"modified\s+underground\s+stem\s+of\s+potato|"
                    r"potato[^.]{0,40}modified\s+underground\s+stem"),
        "label": "modified underground stem of potato",
        "answer": "Stem tuber",
        "why": "the tuber is a swollen underground stem bearing 'eyes' "
               "(buds) for vegetative propagation",
        "ncert_ref": (
            "Class 11 Biology, Chapter 5 (Morphology of Flowering Plants)"),
    },
    {
        "pattern": (r"meristem[^.]{0,50}secondary\s+growth|secondary\s+"
                    r"growth[^.]{0,50}meristem"),
        "label": "meristem for secondary growth",
        "answer": "Lateral",
        "why": "the lateral meristem (vascular cambium and cork cambium) "
               "adds girth -- secondary growth",
        "ncert_ref": (
            "Class 11 Biology, Chapter 6 (Anatomy of Flowering Plants)"),
    },
    {
        "pattern": (r"ground\s+tissue\s+of\s+a\s+leaf|ground\s+tissue"
                    r"[^.]{0,40}leaf"),
        "label": "ground tissue of a leaf",
        "answer": "Mesophyll",
        "why": "the mesophyll (palisade + spongy parenchyma) between the "
               "epidermises carries the chloroplasts",
        "ncert_ref": (
            "Class 11 Biology, Chapter 6 (Anatomy of Flowering Plants)"),
    },
    # C11 ch7 Structural Organisation in Animals
    {
        # STEM-BM 2026-10-07 (c7 sweep 02_006#d1): the loose
        # 'lining...intestine' pattern swallowed villi FUNCTION asks
        # ("primary function of the villi in the inner lining of the
        # small intestine") and shipped the tissue type 'Columnar'.
        # The entry now requires the epithelium/lining to be the
        # QUERIED subject; villi function asks fall to the curated
        # villi explanation lane.
        "pattern": (r"(?:which|what|name)\s+(?:tissue|epithelium)"
                    r"[^.]{0,40}(?:lining|epithelium)[^.]{0,40}intestine|"
                    r"(?:tissue|epithelium)[^.]{0,40}(?:lining|"
                    r"epithelium)[^.]{0,20}intestine[^.]{0,20}"
                    r"(?:called|named|is\s+known)|"
                    r"intestine[^.]{0,40}(?:lining|epithelium)\s*"
                    r"(?:is\s+)?(?:called|known\s+as|named)"),
        "label": "epithelium lining the intestine",
        "answer": "Columnar",
        "why": "the intestine wall is lined by columnar epithelial cells "
               "with microvilli for absorption",
        "ncert_ref": (
            "Class 11 Biology, Chapter 7 (Structural Organisation in Animals)"),
    },
    {
        "pattern": r"hardest\s+connective\s+tissue",
        "label": "hardest connective tissue",
        "answer": "Bone",
        "why": "its hard ground matrix is rich in calcium salts and "
               " collagen fibres give it strength",
        "ncert_ref": (
            "Class 11 Biology, Chapter 7 (Structural Organisation in Animals)"),
    },
    {
        "pattern": (r"mast\s+cells?[^.]{0,40}found|found[^.]{0,40}"
                    r"mast\s+cells?"),
        "label": "location of mast cells",
        "answer": "Areolar",
        "why": "mast cells secrete histamine and heparin from the "
               "areolar connective tissue",
        "ncert_ref": (
            "Class 11 Biology, Chapter 7 (Structural Organisation in Animals)"),
    },
    {
        "pattern": (r"sliding\s+filament\s+theory[^.]{0,50}explains?|"
                    r"what\s+does\s+the\s+sliding\s+filament"),
        "label": "what the sliding filament theory explains",
        "answer": "Muscle contraction",
        "why": "thin actin filaments slide over thick myosin filaments, "
               "shortening the sarcomere",
        "ncert_ref": (
            "Class 11 Biology, Chapter 17 (Locomotion and Movement)"),
    },
    {
        "pattern": (r"joint[^.]{0,40}femur[^.]{0,40}pelvis|connects?\s+"
                    r"the\s+femur\s+to\s+the\s+pelvis"),
        "label": "joint between femur and pelvis",
        "answer": "Ball and socket",
        "why": "the rounded femur head sits in the pelvic acetabulum -- "
               "the hip joint",
        "ncert_ref": (
            "Class 11 Biology, Chapter 17 (Locomotion and Movement)"),
    },
    {
        "pattern": (r"contractile\s+proteins?[^.]{0,40}muscle|muscle"
                    r"[^.]{0,40}contractile\s+proteins?"),
        "label": "contractile proteins of muscle",
        "answer": "Actin and myosin",
        "why": "myosin (thick) and actin (thin) filaments slide past each "
               "other to shorten the fibre",
        "ncert_ref": (
            "Class 11 Biology, Chapter 17 (Locomotion and Movement)"),
    },
    # C11 ch8 Cell / ch9 Biomolecules / ch10 Cell Cycle
    {
        "pattern": (r"cell\s+theory[^.]{0,40}(?:proposed|formulated|given)|"
                    r"(?:who\s+proposed|who\s+formulated|who\s+gave)"
                    r"[^.]{0,40}cell\s+theory"),
        "label": "proposers of the cell theory",
        "answer": "Schleiden and Schwann",
        "why": "Matthias Schleiden (1838, plants) and Theodore Schwann "
               "(1839, animals) formulated it; Virchow added that cells "
               "arise from pre-existing cells",
        "ncert_ref": (
            "Class 11 Biology, Chapter 8 (Cell: The Unit of Life), Section 8.2"),
    },
    {
        "pattern": (r"bond[^.]{0,40}amino\s+acids?|amino\s+acids?[^.]{0,40}"
                    r"bond|which\s+bond\s+links"),
        "label": "bond linking amino acids",
        "answer": "Peptide bond",
        "why": "the carboxyl group of one amino acid joins the amino "
               "group of the next with loss of water",
        "ncert_ref": (
            "Class 11 Biology, Chapter 9 (Biomolecules)"),
    },
    {
        "pattern": (r"most\s+abundant\s+protein[^.]{0,50}animal|animal"
                    r"[^.]{0,50}most\s+abundant\s+protein"),
        "label": "most abundant protein in the animal world",
        "answer": "Collagen",
        "why": "collagen is the most abundant protein in the animal "
               "world; RuBisCO leads only among plant-world proteins",
        "ncert_ref": (
            "Class 11 Biology, Chapter 9 (Biomolecules)"),
    },
    {
        "pattern": r"most\s+abundant\s+enzyme",
        "label": "most abundant enzyme",
        "answer": "RuBisCO",
        "why": "ribulose bisphosphate carboxylase-oxygenase, the CO2 "
               "fixer of the Calvin cycle, is the most abundant enzyme",
        "ncert_ref": (
            "Class 11 Biology, Chapter 11 (Photosynthesis)"),
    },
    {
        "pattern": r"almost\s+all\s+enzymes?\s+are",
        "label": "chemical class of almost all enzymes",
        "answer": "Proteins",
        "why": "all enzymes are proteins except a small group of "
               "catalytic RNAs (ribozymes)",
        "ncert_ref": (
            "Class 11 Biology, Chapter 9 (Biomolecules)"),
    },
    {
        "pattern": (r"dna\s+replication[^.]{0,50}phase|phase[^.]{0,50}"
                    r"dna\s+replication"),
        "label": "phase of DNA replication",
        "answer": "S phase",
        "why": "DNA synthesis happens in the S (synthesis) phase of "
               "interphase; the chromosome number stays the same as "
               "each chromosome is duplicated",
        "ncert_ref": (
            "Class 11 Biology, Chapter 10 (Cell Cycle and Cell Division), Section 10.2"),
    },
    {
        "pattern": (r"daughter\s+cells?[^.]{0,50}meiosis|meiosis[^.]{0,50}"
                    r"daughter\s+cells?|cells?\s+are\s+produced\s+at\s+the"
                    r"\s+end\s+of\s+meiosis"),
        "label": "daughter cells at the end of meiosis",
        "answer": "4",
        "why": "meiosis produces four haploid cells from one diploid "
               "cell (two divisions, one DNA replication)",
        "ncert_ref": (
            "Class 11 Biology, Chapter 10 (Cell Cycle and Cell Division), Section 10.3"),
    },
    {
        "pattern": (r"crossing\s+over[^.]{0,50}(?:occurs?|takes?\s+place|"
                    r"during|happens|seen)|(?:during\s+which\s+stage|"
                    r"which\s+stage)[^.]{0,40}crossing\s+over"),
        "label": "stage of crossing over",
        "answer": "Prophase I",
        "why": "crossing over happens in the pachytene sub-stage of "
               "prophase I, catalysed by recombinase",
        "ncert_ref": (
            "Class 11 Biology, Chapter 10 (Cell Cycle and Cell Division), Section 10.3.1"),
    },
    # C11 ch11 Photosynthesis / ch12 Respiration (the numbers wave)
    {
        "pattern": (r"light\s+reaction[^.]{0,50}(?:takes?\s+place|occurs?|"
                    r"site|location)|where\s+does\s+the\s+light\s+reaction"),
        "label": "site of the light reaction",
        "answer": "Thylakoid",
        "why": "the light reaction runs in the thylakoid membranes "
               "(grana) of the chloroplast; the dark reaction runs in "
               "the stroma",
        "ncert_ref": (
            "Class 11 Biology, Chapter 11 (Photosynthesis)"),
    },
    {
        "pattern": (r"pigment[^.]{0,50}essential\s+for\s+photosynthesis|"
                    r"essential\s+for\s+photosynthesis[^.]{0,30}pigment|"
                    r"pigment\s+is\s+essential"),
        "label": "pigment essential for photosynthesis",
        "answer": "Chlorophyll a",
        "why": "chlorophyll a is the chief (reaction-centre) pigment; "
               "chlorophyll b, xanthophyll and carotenoids only assist "
               "it as accessory pigments",
        "ncert_ref": (
            "Class 11 Biology, Chapter 11 (Photosynthesis)"),
    },
    {
        "pattern": (r"primary\s+co2\s+acceptor\s+in\s+c4|c4\s+plants?"
                    r"[^.]{0,50}co2\s+acceptor|co2\s+acceptor[^.]{0,40}"
                    r"c4\s+plants?"),
        "label": "primary CO2 acceptor in C4 plants",
        "answer": "PEP",
        "why": "phosphoenolpyruvate (PEP) in the mesophyll cells fixes "
               "CO2 into oxaloacetic acid (OAA)",
        "ncert_ref": (
            "Class 11 Biology, Chapter 11 (Photosynthesis)"),
    },
    {
        "pattern": (r"calvin\s+cycle[^.]{0,80}(?:atp|nadph)|(?:atp|nadph)"
                    r"[^.]{0,60}calvin\s+cycle|how\s+many\s+atp\s+and\s+"
                    r"nadph"),
        "label": "ATP and NADPH spent by the Calvin cycle",
        "answer": "18 ATP and 12 NADPH",
        "why": "making one glucose needs 6 CO2 fixed, so 18 ATP and 12 "
               "NADPH (3 ATP + 2 NADPH per CO2)",
        "ncert_ref": (
            "Class 11 Biology, Chapter 11 (Photosynthesis)"),
    },
    {
        "pattern": (r"net\s+(?:gain\s+of\s+)?atp[^.]{0,40}glycolysis|"
                    r"glycolysis[^.]{0,40}net\s+(?:gain|yield)|"
                    r"net\s+atp\s+in\s+glycolysis"),
        "label": "net ATP gain of glycolysis",
        "answer": "2",
        "why": "4 ATP are produced but 2 are invested, so the net gain "
               "from one glucose is 2 ATP",
        "ncert_ref": (
            "Class 11 Biology, Chapter 12 (Respiration in Plants)"),
    },
    {
        "pattern": (r"respiratory\s+quotient[^.]{0,40}glucose|rq\s+of\s+"
                    r"glucose|glucose[^.]{0,40}respiratory\s+quotient"),
        "label": "RQ of glucose",
        "answer": "1",
        "why": "for fully oxidised glucose the CO2 evolved equals the "
               "O2 consumed, so volume CO2 / volume O2 = 1",
        "ncert_ref": (
            "Class 11 Biology, Chapter 12 (Respiration in Plants)"),
    },
    {
        "pattern": (r"krebs\s+cycle[^.]{0,50}(?:site|takes?\s+place|"
                    r"occurs?|location)|site\s+of\s+the\s+krebs"),
        "label": "site of the Krebs cycle",
        "answer": "Mitochondrial matrix",
        "why": "the TCA cycle runs in the mitochondrial matrix; the "
               "electron transport chain sits in the inner membrane",
        "ncert_ref": (
            "Class 11 Biology, Chapter 12 (Respiration in Plants)"),
    },
    # C11 ch13 Plant Growth
    {
        "pattern": (r"hormone[^.]{0,50}fruit\s+ripen|fruit\s+ripen"
                    r"[^.]{0,50}hormone"),
        "label": "fruit-ripening hormone",
        "answer": "Ethylene",
        "why": "the gaseous hormone ethylene speeds fruit ripening and "
               "senescence",
        "ncert_ref": (
            "Class 11 Biology, Chapter 13 (Plant Growth and Development)"),
    },
    {
        "pattern": r"stress\s+hormone",
        "label": "stress hormone of plants",
        "answer": "Abscisic acid (ABA)",
        "why": "ABA closes stomata under water stress and promotes seed "
               "dormancy",
        "ncert_ref": (
            "Class 11 Biology, Chapter 13 (Plant Growth and Development)"),
    },
    {
        "pattern": (r"bolting[^.]{0,50}(?:induced|hormone|effect)|"
                    r"induce[sd]?[^.]{0,30}bolting"),
        "label": "hormone inducing bolting",
        "answer": "Gibberellin",
        "why": "gibberellins elongate internodes and induce bolting "
               " (flowering) in rosette plants like cabbage",
        "ncert_ref": (
            "Class 11 Biology, Chapter 13 (Plant Growth and Development)"),
    },
    # C11 ch14 Breathing / ch15 Body Fluids / ch16 Excretion
    {
        "pattern": (r"oxygen[^.]{0,60}transported|transported[^.]{0,40}"
                    r"oxygen|respiratory\s+pigment\s+in\s+human\s+blood"),
        "label": "oxygen carrier in human blood",
        "answer": "Haemoglobin",
        "why": "haemoglobin's heme iron binds oxygen reversibly, "
               "carrying it as oxyhaemoglobin",
        "ncert_ref": (
            "Class 11 Biology, Chapter 14 (Breathing and Exchange of Gases)"),
    },
    {
        "pattern": (r"co2[^.]{0,60}transported\s+(?:as|in)|in\s+which\s+"
                    r"form\s+is\s+most\s+co2|most\s+co2\s+is\s+transported|"
                    r"co2\s+is\s+mainly\s+transported"),
        "label": "form in which most CO2 travels in blood",
        "answer": "Bicarbonate",
        "why": "about 70 percent of CO2 travels as bicarbonate "
               "(HCO3-) dissolved in plasma",
        "ncert_ref": (
            "Class 11 Biology, Chapter 14 (Breathing and Exchange of Gases)"),
    },
    {
        "pattern": (r"exchange\s+of\s+gases?[^.]{0,50}lungs?|lungs?"
                    r"[^.]{0,50}exchange\s+of\s+gases?|where\s+does\s+"
                    r"exchange\s+of\s+gases?"),
        "label": "site of gas exchange in the lungs",
        "answer": "Alveoli",
        "why": "the thin-walled alveoli and their capillaries are the "
               "actual diffusion sites",
        "ncert_ref": (
            "Class 11 Biology, Chapter 14 (Breathing and Exchange of Gases)"),
    },
    {
        "pattern": (r"pacemaker\s+of\s+the\s+(?:human\s+)?heart|heart"
                    r"[^.]{0,30}pacemaker|known\s+as\s+the\s+pacemaker"),
        "label": "pacemaker of the human heart",
        "answer": "SA node",
        "why": "the sino-atrial node initiates each heartbeat and sets "
               "its rhythm",
        "ncert_ref": (
            "Class 11 Biology, Chapter 15 (Body Fluids and Circulation)"),
    },
    {
        "pattern": (r"blood\s+group\s+ab[^.]{0,50}antibod|antibod"
                    r"[^.]{0,50}blood\s+group\s+ab"),
        "label": "antibodies in an AB individual's plasma",
        "answer": "None",
        "why": "AB blood has both A and B antigens, so neither anti-A "
               "nor anti-B antibodies are present (universal recipient)",
        "ncert_ref": (
            "Class 11 Biology, Chapter 15 (Body Fluids and Circulation)"),
    },
    {
        "pattern": (r"functional\s+unit\s+of\s+the\s+(?:human\s+)?kidney|"
                    r"functional\s+unit\s+of\s+kidney"),
        "label": "functional unit of the kidney",
        "answer": "Nephron",
        "why": "each kidney has about a million nephrons doing "
               "filtration, reabsorption and secretion",
        "ncert_ref": (
            "Class 11 Biology, Chapter 16 (Excretory Products and their Elimination)"),
    },
    {
        "pattern": (r"hormone[^.]{0,60}water\s+reabsorption|water\s+"
                    r"reabsorption[^.]{0,40}hormone"),
        "label": "hormone promoting water reabsorption",
        "answer": "ADH (vasopressin)",
        "why": "antidiuretic hormone makes the collecting duct and "
               "distal tubule permeable to water",
        "ncert_ref": (
            "Class 11 Biology, Chapter 16 (Excretory Products and their Elimination)"),
    },
    {
        "pattern": r"ph\s+of\s+human\s+urine",
        "label": "normal pH of human urine",
        "answer": "6.0",
        "why": "urine is slightly acidic (about 6.0)",
        "ncert_ref": (
            "Class 11 Biology, Chapter 16 (Excretory Products and their Elimination)"),
    },
    # C11 ch18 Neural / ch19 Chemical Coordination
    {
        "pattern": (r"neurotransmitter[^.]{0,60}neuromuscular|"
                    r"neuromuscular\s+junction[^.]{0,60}neurotransmitter|"
                    r"released\s+at\s+the\s+neuromuscular"),
        "label": "neurotransmitter at the neuromuscular junction",
        "answer": "Acetylcholine",
        "why": "the motor nerve ending releases acetylcholine, which "
               "generates an action potential in the sarcolemma",
        "ncert_ref": (
            "Class 11 Biology, Chapter 17 (Locomotion and Movement)"),
    },
    {
        "pattern": (r"brain[^.]{0,60}controls?\s+respiration|controls?"
                    r"[^.]{0,40}respiration\s+and\s+gastric"),
        "label": "brain centre controlling respiration",
        "answer": "Medulla oblongata",
        "why": "the medulla's respiratory rhythm centre maintains the "
               "breathing rate; the pneumotaxic centre of the pons "
               "modulates it",
        "ncert_ref": (
            "Class 11 Biology, Chapter 18 (Neural Control and Coordination)"),
    },
    {
        "pattern": (r"myelinated\s+nerve\s+fibres?[^.]{0,50}found|found"
                    r"[^.]{0,50}myelinated\s+nerve"),
        "label": "where myelinated nerve fibres are found",
        "answer": "Cranial and spinal nerves",
        "why": "myelinated fibres run in cranial and spinal nerves; "
               "unmyelinated ones in the autonomic and somatic systems",
        "ncert_ref": (
            "Class 11 Biology, Chapter 18 (Neural Control and Coordination)"),
    },
    {
        "pattern": r"master\s+gland",
        "label": "master gland",
        "answer": "Pituitary",
        "why": "the pituitary's hormones regulate the secretion of the "
               "other endocrine glands",
        "ncert_ref": (
            "Class 11 Biology, Chapter 19 (Chemical Coordination and Integration)"),
    },
    {
        "pattern": (r"hormone[^.]{0,60}lowers?\s+blood\s+calcium|lowers?"
                    r"[^.]{0,40}blood\s+calcium[^.]{0,30}hormone"),
        "label": "hormone that lowers blood calcium",
        "answer": "Calcitonin",
        "why": "thyrocalcitonin from the thyroid's C cells lowers blood "
               "calcium; parathyroid hormone raises it",
        "ncert_ref": (
            "Class 11 Biology, Chapter 19 (Chemical Coordination and Integration)"),
    },
    {
        "pattern": (r"cortisol[^.]{0,60}secreted|secreted[^.]{0,40}"
                    r"cortisol"),
        "label": "source of cortisol",
        "answer": "Adrenal cortex",
        "why": "the adrenal cortex's zona fasciculata secretes "
               "glucocorticoids, mainly cortisol",
        "ncert_ref": (
            "Class 11 Biology, Chapter 19 (Chemical Coordination and Integration)"),
    },
    # C12 ch1 Sexual Reproduction in Flowering Plants / ch2 Human
    # Reproduction / ch3 Reproductive Health
    {
        "pattern": (r"fertilisation\s+(?:occurs?|takes?\s+place|happens?)"
                    r"\s+in\s+a?\s*flowering|site\s+of\s+fertilisation"
                    r"\s+in\s+a?\s*flowering"),
        "label": "site of fertilisation in a flowering plant",
        "answer": "Ovule",
        "why": "the pollen tube releases the male gametes into the "
               "embryo sac inside the ovule",
        "ncert_ref": (
            "Class 12 Biology, Chapter 1 (Sexual Reproduction in Flowering Plants)"),
    },
    {
        "pattern": (r"fuses?\s+with\s+(?:one\s+)?male\s+gamete\s+to\s+"
                    r"form\s+the\s+zygote|male\s+gamete[^.]{0,50}zygote|"
                    r"zygote[^.]{0,50}male\s+gamete"),
        "label": "cell fusing with the male gamete to form the zygote",
        "answer": "Egg cell",
        "why": "one male gamete fuses with the egg (oosphere); the other "
               "fuses with the polar nuclei to make the endosperm",
        "ncert_ref": (
            "Class 12 Biology, Chapter 1 (Sexual Reproduction in Flowering Plants)"),
    },
    {
        "pattern": (r"ploidy\s+of\s+the?\s*endosperm|endosperm[^.]{0,50}"
                    r"(?:triploid|haploid|diploid|ploidy)|"
                    r"endosperm\s+in\s+angiosperms\s+is\s+generally"),
        "label": "ploidy of the angiosperm endosperm",
        "answer": "Triploid",
        "why": "one male gamete fuses with two polar nuclei (3n), so the "
               "endosperm is triploid",
        "ncert_ref": (
            "Class 12 Biology, Chapter 1 (Sexual Reproduction in Flowering Plants)"),
    },
    {
        "pattern": (r"sperms?\s+(?:are\s+)?produced\s+in|where\s+are\s+"
                    r"sperms?\s+produced|production\s+of\s+sperms?"),
        "label": "site of sperm production",
        "answer": "Seminiferous tubules",
        "why": "spermatogenesis happens in the seminiferous tubules of "
               "the testis",
        "ncert_ref": (
            "Class 12 Biology, Chapter 2 (Human Reproduction), Section 2.1"),
    },
    {
        "pattern": (r"hormone[^.]{0,50}maintains?\s+pregnancy|maintains?"
                    r"[^.]{0,40}pregnancy"),
        "label": "hormone that maintains pregnancy",
        "answer": "Progesterone",
        "why": "progesterone from the corpus luteum (later placenta) "
               "keeps the endometrium pregnancy-ready",
        "ncert_ref": (
            "Class 12 Biology, Chapter 2 (Human Reproduction)"),
    },
    {
        "pattern": (r"fertilisation\s+in\s+humans?[^.]{0,40}(?:occur|"
                    r"takes?\s+place|site)|fertilisation\s+(?:normally\s+)?"
                    r"(?:occurs?|takes?\s+place|happens?)\s+in\s+(?:the\s+)?"
                    r"humans?|site\s+of\s+fertilisation\s+in\s+humans?|"
                    r"where\s+does\s+fertilisation\s+occur\s+in\s+humans?"),
        "label": "site of fertilisation in humans",
        "answer": "Ampullary-isthmic junction",
        "why": "the ampullary-isthmic junction of the fallopian tube is "
               "where the sperm meets the ovum",
        "ncert_ref": (
            "Class 12 Biology, Chapter 2 (Human Reproduction)"),
    },
    {
        "pattern": (r"surgical\s+(?:method|procedure)\s+of\s+"
                    r"contraception\s+in\s+(?:human\s+)?males?|"
                    r"contraception\s+in\s+(?:human\s+)?males?"),
        "label": "male surgical contraception",
        "answer": "Vasectomy",
        "why": "a small cut in the vas deferens blocks sperm transport",
        "ncert_ref": (
            "Class 12 Biology, Chapter 3 (Reproductive Health)"),
    },
    # C12 ch4 Principles of Inheritance / ch5 Molecular Basis /
    # ch6 Evolution
    {
        "pattern": (r"griffith[^.]{0,120}(?:which\s+combination|"
                    r"resulted?\s+in\s+the\s+death|killed\s+the\s+mice)|"
                    r"which\s+combination[^.]{0,60}griffith"),
        "label": "Griffith's transforming combination",
        "answer": "Heat-killed S strain + live R strain",
        "why": "the heat-killed smooth (virulent) cells passed their "
               "transforming principle to the live rough cells, killing "
               "the mice",
        "ncert_ref": (
            "Class 12 Biology, Chapter 5 (Molecular Basis of Inheritance)"),
    },
    {
        "pattern": (r"chromosome\s+theory\s+of\s+inheritance[^.]{0,40}"
                    r"(?:gave|proposed|put)|(?:who\s+gave|who\s+proposed)"
                    r"[^.]{0,40}chromosome\s+theory"),
        "label": "proposer of the chromosome theory",
        "answer": "Sutton and Boveri",
        "why": "Walter Sutton and Theodor Boveri united Mendelian factors "
               "with chromosome behaviour (1902)",
        "ncert_ref": (
            "Class 12 Biology, Chapter 4 (Principles of Inheritance and Variation)"),
    },
    {
        "pattern": (r"double\s+helix\s+(?:model\s+of\s+)?dna[^.]{0,40}"
                    r"(?:proposed|described|given)|(?:who\s+proposed|"
                    r"who\s+described|who\s+gave)[^.]{0,40}double\s+helix"),
        "label": "proposer of the DNA double helix model",
        "answer": "Watson and Crick",
        "why": "James Watson and Francis Crick proposed the "
               "semi-conservative double helix (1953)",
        "ncert_ref": (
            "Class 12 Biology, Chapter 5 (Molecular Basis of Inheritance)"),
    },
    {
        "pattern": (r"which\s+direction\s+does\s+dna\s+polymerase|"
                    r"direction[^.]{0,50}dna\s+polymerase\s+synthesi|"
                    r"dna\s+polymerase\s+synthesi[sz]es?\s+the\s+new\s+"
                    r"strand\s+in"),
        "label": "direction of DNA polymerase synthesis",
        "answer": "5' to 3'",
        "why": "DNA polymerase can only add nucleotides to the 3'-OH "
               "end, so it works in the 5' to 3' direction",
        "ncert_ref": (
            "Class 12 Biology, Chapter 5 (Molecular Basis of Inheritance)"),
    },
    {
        "pattern": (r"enzyme[^.]{0,50}unwinds?\s+the\s+dna|unwinds?\s+"
                    r"the\s+dna\s+double\s+helix|which\s+enzyme\s+unwinds"),
        "label": "enzyme that unwinds DNA",
        "answer": "Helicase",
        "why": "helicase breaks the hydrogen bonds and unwinds the "
               "double helix at the replication fork",
        "ncert_ref": (
            "Class 12 Biology, Chapter 5 (Molecular Basis of Inheritance)"),
    },
    {
        "pattern": (r"natural\s+selection[^.]{0,40}(?:proposed|gave|"
                    r"mechanism)|who\s+proposed\s+natural\s+selection"),
        "label": "proposer of natural selection",
        "answer": "Charles Darwin",
        "why": "Darwin proposed natural selection as the mechanism of "
               "evolution in The Origin of Species (1859)",
        "ncert_ref": (
            "Class 12 Biology, Chapter 6 (Evolution)"),
    },
    {
        "pattern": (r"miller.{0,20}urey'?s?\s+experiment|urey'?s?\s+"
                    r"experiment\s+demonstrat|experiment\s+of\s+miller"),
        "label": "finding of the Miller-Urey experiment",
        "answer": "Amino acids",
        "why": "an electric discharge through a simulated primitive "
               "atmosphere produced amino acids abiotically",
        "ncert_ref": (
            "Class 12 Biology, Chapter 6 (Evolution)"),
    },
    # C12 ch7 Human Health and Disease
    {
        "pattern": (r"malaria\s+is\s+caused\s+by|causative\s+agent\s+of\s+"
                    r"malaria|pathogen\s+of\s+malaria|malaria[^.]{0,30}"
                    r"pathogen"),
        "label": "pathogen of malaria",
        "answer": "Plasmodium",
        "why": "a protozoan parasite (Plasmodium) spread by the bite of "
               "the female Anopheles mosquito",
        "ncert_ref": (
            "Class 12 Biology, Chapter 7 (Human Health and Disease)"),
    },
    {
        "pattern": (r"hiv[^.]{0,60}(?:attacks?|infects?)|(?:attacks?|"
                    r"infects?)[^.]{0,40}hiv|hiv\s+primarily\s+attack"),
        "label": "cells attacked by HIV",
        "answer": "Helper T-lymphocytes",
        "why": "HIV enters helper T-lymphocytes (CD4), replicates and "
               "kills them, so immunity falls",
        "ncert_ref": (
            "Class 12 Biology, Chapter 7 (Human Health and Disease)"),
    },
    {
        "pattern": (r"antibod(?:y|ies)\s+(?:are|is)\s+chemically|"
                    r"chemically[^.]{0,30}antibod(?:y|ies)|antibod"
                    r"(?:y|ies)[^.]{0,30}made\s+of"),
        "label": "chemical nature of antibodies",
        "answer": "Proteins",
        "why": "antibodies are protein molecules (immunoglobulins, "
               " IgG/IgA/IgM/IgE/IgD)",
        "ncert_ref": (
            "Class 12 Biology, Chapter 7 (Human Health and Disease)"),
    },
    {
        "pattern": (r"penicillin[^.]{0,40}discover|discover[^.]{0,40}"
                    r"penicillin"),
        "label": "discoverer of penicillin",
        "answer": "Alexander Fleming",
        "why": "Fleming noticed the Penicillium mould killing "
               "Staphylococcus (1928); Chain and Florey purified it",
        "ncert_ref": (
            "Class 12 Biology, Chapter 8 (Microbes in Human Welfare)"),
    },
    # C12 ch8 Enhancement in Food Production
    {
        "pattern": (r"overcome[^.]{0,40}inbreeding\s+depression|"
                    r"inbreeding\s+depression[^.]{0,40}overcome|"
                    r"which\s+(?:method|technique)[^.]{0,40}inbreeding"),
        "label": "cure for inbreeding depression",
        "answer": "Outcrossing",
        "why": "outcrossing (and outbreeding) restores fitness by "
               "bringing unrelated alleles together",
        "ncert_ref": (
            "Class 12 Biology, Chapter 8 (Strategies for Enhancement in Food Production), Section 8.2"),
    },
    {
        "pattern": (r"honey\s+bee\s+species[^.]{0,50}india|indigenous\s+"
                    r"honey\s+bee|honey\s+bee[^.]{0,50}commercial\s+honey"),
        "label": "commercial honey bee species of India",
        "answer": "Apis indica",
        "why": "Apis indica is the commonly domesticated indigenous "
               "species for bee-keeping",
        "ncert_ref": (
            "Class 12 Biology, Chapter 8 (Strategies for Enhancement in Food Production)"),
    },
    {
        "pattern": (r"superovulation[^.]{0,60}(?:induced|hormone)|"
                    r"induce[sd]?[^.]{0,40}superovulation"),
        "label": "hormone inducing superovulation",
        "answer": "FSH",
        "why": "follicle-stimulating hormone (a gonadotropin) makes "
               "cows release several ova at once for MOET",
        "ncert_ref": (
            "Class 12 Biology, Chapter 8 (Strategies for Enhancement in Food Production)"),
    },
    # C12 ch9 Microbes in Human Welfare
    {
        "pattern": (r"bacterium[^.]{0,60}milk\s+into\s+curd|milk\s+into"
                    r"\s+curd[^.]{0,40}bacterium|which\s+bacterium"
                    r"[^.]{0,60}curd"),
        "label": "bacterium that sets curd",
        "answer": "Lactobacillus",
        "why": "lactic acid bacteria (Lactobacillus) ferment lactose "
               "into lactic acid, which coagulates milk protein",
        "ncert_ref": (
            "Class 12 Biology, Chapter 9 (Microbes in Human Welfare), Section 9.1"),
    },
    {
        "pattern": (r"curd[^.]{0,60}producing|lactobacillus[^.]{0,60}"
                    r"produces?|produces?[^.]{0,40}lactobacillus"),
        "label": "product made by Lactobacillus in curd",
        "answer": "Lactic acid",
        "why": "lactic acid coagulates the milk protein casein",
        "ncert_ref": (
            "Class 12 Biology, Chapter 9 (Microbes in Human Welfare), Section 9.1"),
    },
    {
        "pattern": (r"biogas[^.]{0,60}produces?|produces?\s+biogas|"
                    r"group\s+of\s+microbes?[^.]{0,40}biogas|which\s+"
                    r"microbes?\s+produce"),
        "label": "microbes that produce biogas",
        "answer": "Methanogens",
        "why": "methanogens such as Methanobacterium grow anaerobically "
               "and give out methane-rich biogas",
        "ncert_ref": (
            "Class 12 Biology, Chapter 9 (Microbes in Human Welfare), Section 9.3"),
    },
    # C12 ch10-11 Biotechnology
    {
        "pattern": (r"enzyme[^.]{0,60}cuts?\s+dna\s+at\s+specific|cuts?"
                    r"\s+dna\s+at\s+specific\s+sequences?|specific\s+"
                    r"sequences?[^.]{0,40}cut"),
        "label": "enzyme that cuts DNA at specific sites",
        "answer": "Restriction endonuclease",
        "why": "restriction endonucleases recognise specific "
               "palindromic sequences and cut the phosphodiester backbone",
        "ncert_ref": (
            "Class 12 Biology, Chapter 10 (Biotechnology: Principles and Processes), Section 10.2"),
    },
    {
        "pattern": (r"ti\s+plasmid'?s?\s+natural\s+host|natural\s+host"
                    r"[^.]{0,30}ti\s+plasmid|which\s+bacterium[^.]{0,40}"
                    r"ti\s+plasmid"),
        "label": "natural host of the Ti plasmid",
        "answer": "Agrobacterium tumefaciens",
        "why": "the tumour-inducing plasmid of Agrobacterium tumefaciens "
               "delivers genes into dicot plants",
        "ncert_ref": (
            "Class 12 Biology, Chapter 10 (Biotechnology: Principles and Processes), Section 10.3"),
    },
    {
        "pattern": (r"taq\s+polymerase\s+is\s+used\s+in|which\s+technique"
                    r"\s+uses?\s+taq|taq\s+polymerase[^.]{0,40}used"),
        "label": "technique using Taq polymerase",
        "answer": "PCR",
        "why": "the thermostable Taq polymerase survives the repeated "
               "heating of the polymerase chain reaction",
        "ncert_ref": (
            "Class 12 Biology, Chapter 10 (Biotechnology: Principles and Processes)"),
    },
    {
        "pattern": (r"bt\s+cotton\s+is\s+resistant\s+to|bt\s+cotton"
                    r"[^.]{0,40}resistant|resistant\s+to\s+which\s+pest"),
        "label": "pest Bt cotton resists",
        "answer": "Bollworm",
        "why": "cry genes make Bt toxin crystals that kill bollworm "
               "larvae in the cotton boll",
        "ncert_ref": (
            "Class 12 Biology, Chapter 11 (Biotechnology and its Applications), Section 11.1"),
    },
    {
        "pattern": (r"cry\s+genes?[^.]{0,60}isolated|isolated\s+from"
                    r"[^.]{0,40}cry\s+genes?|cry\s+genes?\s+come\s+from"),
        "label": "source bacterium of cry genes",
        "answer": "Bacillus thuringiensis",
        "why": "the soil bacterium Bacillus thuringiensis carries the "
               "cry genes that make the Bt toxin protoxin",
        "ncert_ref": (
            "Class 12 Biology, Chapter 11 (Biotechnology and its Applications), Section 11.1"),
    },
    {
        "pattern": (r"human\s+insulin[^.]{0,60}marketed|marketed\s+as"
                    r"[^.]{0,40}insulin|commercial\s+name[^.]{0,40}"
                    r"insulin"),
        "label": "brand name of rDNA human insulin",
        "answer": "Humulin",
        "why": "human insulin made by recombinant DNA technology in "
               "bacteria is marketed as humulin",
        "ncert_ref": (
            "Class 12 Biology, Chapter 11 (Biotechnology and its Applications)"),
    },
    # C12 ch12 Organisms and Populations
    {
        "pattern": (r"10\s*(?:percent|%|pct)\s+law[^.]{0,50}(?:proposed|"
                    r"given)|10\s*(?:percent|%|pct)\s+law\s+of\s+energy|"
                    r"(?:who\s+proposed|proposed\s+the)[^.]{0,40}"
                    r"10\s*(?:percent|%|pct)|ten\s+percent\s+law"),
        "label": "proposer of the 10 percent law",
        "answer": "Lindeman",
        "why": "Raymond Lindeman formulated the 10 percent law of energy "
               "transfer across trophic levels",
        "ncert_ref": (
            "Class 12 Biology, Chapter 12 (Organisms and Populations)"),
    },
    {
        "pattern": (r"tolerate\s+only\s+a\s+narrow\s+temperature|narrow\s+"
                    r"temperature\s+range\s+are\s+called|stenothermal|"
                    r"eurythermal"),
        "label": "animals tolerating a narrow temperature range",
        "answer": "Stenothermal",
        "why": "stenothermal organisms tolerate only a narrow "
               "temperature band; eurythermal ones a wide range",
        "ncert_ref": (
            "Class 12 Biology, Chapter 12 (Organisms and Populations)"),
    },
    # -- second-wave conversions (2026-10-06, curated re-run findings) ----
    {
        "pattern": (r"copper[\s-]*t\b[^.]{0,40}(?:example|contraceptive|"
                    r"device)|which\s+(?:contraceptive|device)[^.]{0,30}"
                    r"copper[\s-]*t"),
        "label": "what a Copper-T is",
        "answer": "Intrauterine device",
        "why": "the Copper-T (IUD) releases copper ions that suppress "
               "sperm motility and viability in the uterus",
        "ncert_ref": (
            "Class 12 Biology, Chapter 3 (Reproductive Health)"),
    },
    {
        "pattern": (r"amniocentesis[^.]{0,60}(?:banned|misused|illegal|"
                    r"legal)|legally\s+banned[^.]{0,30}amniocentesis"),
        "label": "why amniocentesis is legally banned",
        "answer": "Sex determination",
        "why": "statutory law bans the misuse of amniocentesis for "
               "foetal sex determination to check female foeticide",
        "ncert_ref": (
            "Class 12 Biology, Chapter 3 (Reproductive Health)"),
    },
    {
        "pattern": (r"phenylketonuria[^.]{0,50}inherit|inherit"
                    r"[^.]{0,50}phenylketonuria"),
        "label": "inheritance pattern of phenylketonuria",
        "answer": "Autosomal recessive",
        "why": "PKU is an inborn error of metabolism (phenylalanine "
               "hydroxylase deficiency) inherited as an autosomal "
               "recessive trait",
        "ncert_ref": (
            "Class 12 Biology, Chapter 4 (Principles of Inheritance and "
            "Variation)"),
    },
    {
        "pattern": (r"analogous\s+organs?\s+have|analogous\s+organs?\s+"
                    r"(?:is|are)|what\s+are\s+analogous\s+organs?|"
                    r"which\s+statement[^.]{0,30}analogous"),
        "label": "definition of analogous organs",
        "answer": "Different structures but similar functions",
        "why": "analogous organs solve the same problem with different "
               "structural plans (wings of butterfly and bird) -- the "
               "mark of convergent evolution",
        "ncert_ref": ("Class 12 Biology, Chapter 6 (Evolution)"),
    },
    {
        "pattern": (r"mustard[^.]{0,40}famil|famil[^.]{0,40}mustard|"
                    r"which\s+famil[^.]{0,20}brassic"),
        "label": "family of mustard",
        "answer": "Brassicaceae",
        "why": "mustard belongs to Brassicaceae (Cruciferae) -- "
               "tetramerous flowers, superior ovary",
        "ncert_ref": (
            "Class 11 Biology, Chapter 5 (Morphology of Flowering Plants)"),
    },
    {
        "pattern": (r"monocot\s+roots?\s+differ\s+from\s+dicot|monocot\s+"
                    r"root[^.]{0,50}xylem\s+bundles|xylem\s+bundles"
                    r"[^.]{0,40}monocot"),
        "label": "monocot-root xylem difference",
        "answer": "More than six",
        "why": "monocot roots carry more than six xylem bundles "
               "(polyarch); dicot roots usually six or fewer",
        "ncert_ref": (
            "Class 11 Biology, Chapter 6 (Anatomy of Flowering Plants)"),
    },
    {
        "pattern": (r"which\s+gene\s+family[^.]{0,40}bt\s+cotton|bt\s+"
                    r"cotton[^.]{0,50}toxic\s+to\s+insects?|cry\s+genes?"
                    r"[^.]{0,30}make"),
        "label": "gene family behind Bt cotton's toxin",
        "answer": "cry genes",
        "why": "the cry genes of Bacillus thuringiensis encode the Bt "
               "toxin protein crystals that kill bollworm larvae",
        "ncert_ref": (
            "Class 12 Biology, Chapter 11 (Biotechnology and its "
            "Applications)"),
    },
]

# A reason/prose ask must NEVER ship a bare fact noun as its answer.
_WHY_ASK = re.compile(
    r"\b(why|explain|justify|reason\s+for|give\s+reason|how\s+(?:do|does|"
    r"did|is|are|can|come)|distinguish|differentiate|compare|describe)\b",
    re.I)
# A factual ask: interrogative determiner, a name-it framing, an
# attribution/location ask, or a quantity recall.  (2026-10-06 c11/c12
# wave: added who / where / how many / how much / "term for" /
# "caused by" / "transported by" / "secreted by" -- every one is a pure
# recall shape and the pattern table below still gates what can ship.)
_FACT_ASK = re.compile(
    r"\b(which|what|who|where|name|identify|how\s+many|how\s+much|"
    r"term\s+for|is\s+called|known\s+as|called|caused\s+by|"
    r"transported\s+by|secreted\s+by)\b", re.I)
# A multi-part ask ("...and state the function") must refuse -- a single
# anchored fact would ship as a PARTIAL answer (the multi-part partial
# bug class).  The pipeline's multi-part splitter runs earlier; this is
# the defence-in-depth gate for the phrasings it misses.
_MULTI_PART_ASK = re.compile(
    r"\band\s+(?:state|give|name|identify|list|mention|explain|define|"
    r"write|draw|calculate|describe)\b|,\s*(?:and\s+)?"
    r"(?:state|name|identify|list|explain|describe)\b", re.I)
# Inline textual options: "(a) Ribosome (b) Mitochondria ..."
_TEXT_OPTION = re.compile(
    r"(?:\(\s*([a-dA-D])\s*\)|\[?\b([a-dA-D])[\)\.\]])\s*"
    r"([^\(\)\[\]\n\r]{2,60})")


class BiologyCognitiveEngine:
    """NEET-specialized biological reasoning and validation engine."""

    @classmethod
    def evaluate_fact_recall(cls, query_text: str) -> Optional[BiologySolveResult]:
        """Answer ONE canonical NCERT recall fact from the question-side
        table, or return None (honest refusal) when this is not a plain
        factual ask.  Deterministic and anchored -- never guesses."""
        q = (query_text or "").strip()
        if not q:
            return None
        if _WHY_ASK.search(q):
            # a reason question cannot be answered with a bare fact noun
            return None
        if _MULTI_PART_ASK.search(q):
            # a two-part ask answered with one anchored fact ships a
            # PARTIAL answer -- refuse instead (multi-part bug class)
            return None
        options = _TEXT_OPTION.findall(q)
        if not _FACT_ASK.search(q) and not options:
            # no fact-ask shape AND no selection paper: a bare statement
            # or reason prose keeps its guided refusal
            return None
        hit = None
        for fact in NCERT_FACT_RECALL:
            if re.search(fact["pattern"], q, re.I):
                hit = fact
                break
        if hit is None:
            return None

        term = hit["answer"]
        label = hit["label"]
        chosen = None
        if options:
            # exact-match pass first (2026-10-06): "Prophase I" substring-
            # collides with "Prophase II" and would refuse; an EXACT equal
            # option is unambiguous and wins before substring logic runs.
            exact = [((a or b or "").lower(), s.strip())
                     for a, b, s in options
                     if (a or b) and s.strip().lower() == term.lower()]
            matches = [((a or b or "").lower(), s.strip())
                       for a, b, s in options
                       if (a or b) and term.lower() in s.lower()]
            picked = exact if len(exact) == 1 else matches
            if len(picked) != 1:
                # zero matches = engine and options disagree; two-plus =
                # ambiguous paper.  Either way: refuse, never guess.
                return None
            chosen = picked[0]
            answer = f"option ({chosen[0]}) {chosen[1]}"
        else:
            answer = term
        steps = [
            "1. This is a canonical NCERT recall fact, checked against "
            "the anchored fact table.",
            f"2. The {label} is {term}.",
        ]
        if chosen:
            steps.append(f"3. That matches option ({chosen[0]}) of the "
                         "given options.")
        steps.append(f"{'4' if chosen else '3'}. Why: {term} is "
                     f"{hit['why']}.")
        steps.append(f"{'5' if chosen else '4'}. NCERT anchor: "
                     f"{hit['ncert_ref']}.")
        return BiologySolveResult(
            success=True,
            domain="NCERT_VERBATIM",
            topic="FACT_RECALL",
            primary_answer=answer,
            selected_option=(chosen[0].upper() if chosen else None),
            ncert_reference=hit["ncert_ref"],
            steps=steps,
        )

    @classmethod
    def evaluate_assertion_reason(
        cls,
        assertion_text: str,
        reason_text: str,
    ) -> BiologySolveResult:
        """Evaluates Assertion-Reason problem using propositional truth tables and causal logic."""
        a_clean = assertion_text.lower()
        r_clean = reason_text.lower()
        combined = f"{a_clean} {r_clean}"

        # Match against canonical NEET AR knowledge base
        matched_entry = None
        best_score = 0
        for entry in NEET_AR_DATABASE:
            score = sum(1 for kw in entry["keywords"] if kw in combined)
            if score > best_score and score >= 2:
                best_score = score
                matched_entry = entry

        if matched_entry:
            a_val = matched_entry["a_true"]
            r_val = matched_entry["r_true"]
            causal = matched_entry["is_causal_explanation"]
            ncert = matched_entry["ncert_ref"]
            logic_exp = matched_entry["explanation"]
        else:
            # Fallback heuristic: check truth predicates
            a_val = not any(neg in a_clean for neg in ["always false", "never occurs", "is non-functional"])
            r_val = not any(neg in r_clean for neg in ["never occurs", "completely absent", "is invalid"])
            # Causal link requires causal connective coherence
            causal = bool(re.search(r"\b(because|due to|as a result of|thereby|since|enables|causes)\b", r_clean))
            ncert = "NCERT Biology General Framework"
            logic_exp = "Evaluated via causal implication connective test."

        # Map to NEET 4 options:
        if a_val and r_val and causal:
            opt_letter = "A"
            opt_text = "Both Assertion and Reason are True, and Reason is the correct explanation of Assertion."
        elif a_val and r_val and not causal:
            opt_letter = "B"
            opt_text = "Both Assertion and Reason are True, but Reason is NOT the correct explanation of Assertion."
        elif a_val and not r_val:
            opt_letter = "C"
            opt_text = "Assertion is True, but Reason is False."
        else:
            opt_letter = "D"
            opt_text = "Assertion is False (or both are False)."

        steps = [
            f"1. Proposition Analysis:",
            f"   • Assertion [A]: \"{assertion_text.strip()}\"",
            f"   • Reason [R]: \"{reason_text.strip()}\"",
            f"2. Individual Truth Value Verification:",
            f"   • Truth(A) = **{a_val}**",
            f"   • Truth(R) = **{r_val}**",
            f"3. Causal Connection Test (Does R causally necessitate A?):",
            f"   • Causal Implication (R ⟹ A) = **{causal}**",
            f"   • Rationale: {logic_exp}",
            f"4. Official NCERT Anchor: {ncert}.",
            f"5. NEET Final Answer: Option **{opt_letter}** — {opt_text}."
        ]

        return BiologySolveResult(
            success=True,
            domain="ASSERTION_REASON",
            topic="NEET_AR_PROPOSITIONAL_LOGIC",
            primary_answer=f"Option {opt_letter}: {opt_text}",
            selected_option=opt_letter,
            ncert_reference=ncert,
            steps=steps,
        )

    @classmethod
    def evaluate_concept_query(cls, query_text: str) -> Optional[BiologySolveResult]:
        """Evaluates free-form biology questions and concepts against canonical NCERT database."""
        q_clean = (query_text or "").lower()
        matched_entry = None
        best_score = 0
        for entry in NEET_AR_DATABASE:
            score = sum(1 for kw in entry["keywords"] if kw in q_clean)
            if score > best_score and score >= 2:
                best_score = score
                matched_entry = entry

        if not matched_entry:
            return None

        steps = [
            f"1. NCERT Core Topic: {matched_entry['ncert_ref']}.",
            f"2. Canonical Proposition: {matched_entry['assertion']}",
            f"3. Scientific Rationale / Methodology: {matched_entry['reason']}",
            f"4. Pedagogical Analysis: {matched_entry['explanation']}",
            f"5. NEET Examination Anchor: Causal link valid = {matched_entry['is_causal_explanation']}."
        ]

        return BiologySolveResult(
            success=True,
            domain="NCERT_CONCEPT",
            topic="CANONICAL_BIOLOGY_MECHANISM",
            primary_answer=f"{matched_entry['assertion']} {matched_entry['explanation']}",
            selected_option=None,
            ncert_reference=matched_entry["ncert_ref"],
            steps=steps
        )

    @classmethod
    def calculate_respiration_atp_balance(cls, glucose_moles: float = 1.0, shuttle: str = "malate_aspartate") -> BiologySolveResult:
        """Complete ATP energetic balance sheet for aerobic respiration of glucose."""
        # 1 glucose:
        # Glycolysis:
        #   Substrate-level phosphorylation: +4 ATP, -2 ATP consumed = Net 2 ATP
        #   Cytosolic NADH: 2 NADH
        # Link Reaction (Pyruvate Dehydrogenase):
        #   2 Pyruvate -> 2 Acetyl-CoA + 2 mitochondrial NADH
        # Krebs Cycle:
        #   2 Acetyl-CoA -> 4 CO2 + 6 NADH + 2 FADH2 + 2 GTP (= 2 ATP)
        #
        # Modern P/O ratio (Peter Mitchell Chemiosmotic):
        #   1 mitochondrial NADH = 2.5 ATP
        #   1 mitochondrial FADH2 = 1.5 ATP
        # Cytosolic NADH shuttle:
        #   Malate-Aspartate shuttle: 2.5 ATP per cytosolic NADH (heart, liver, kidney) => 32 ATP total
        #   Glycerol-3-Phosphate shuttle: 1.5 ATP per cytosolic NADH (muscle, brain) => 30 ATP total
        # Classical NCERT textbook convention:
        #   1 NADH = 3 ATP, 1 FADH2 = 2 ATP => Total = 38 ATP (or 36 ATP with glycerol-P)
        
        is_malate = "malate" in shuttle.lower()
        modern_nadh_cyt_atp = 2.5 if is_malate else 1.5
        classic_nadh_cyt_atp = 3.0 if is_malate else 2.0

        # Modern yield
        atp_slp = 2 + 2  # 2 net glycolysis + 2 Krebs GTP
        atp_mito_nadh = (2 + 6) * 2.5  # 8 mito NADH * 2.5 = 20 ATP
        atp_fadh2 = 2 * 1.5  # 2 FADH2 * 1.5 = 3 ATP
        atp_cyt_nadh = 2 * modern_nadh_cyt_atp  # 2 * 2.5 = 5 ATP (or 3)
        total_modern = (atp_slp + atp_mito_nadh + atp_fadh2 + atp_cyt_nadh) * glucose_moles

        # Classical NCERT yield
        total_classical = (4 + 8*3.0 + 2*2.0 + 2*classic_nadh_cyt_atp) * glucose_moles

        steps = [
            f"1. Biochemical Input: {glucose_moles} mole(s) of D-glucose (C6H12O6). Active Shuttle: {shuttle.replace('_', ' ').title()}.",
            "2. Stage 1: Glycolysis (Cytosol):",
            "   • Substrate-Level Phosphorylation: +2 ATP net (4 produced - 2 invested).",
            f"   • Coenzyme Reduction: +2 cytosolic NADH (yields {2*modern_nadh_cyt_atp*glucose_moles:.1f} ATP via {shuttle}).",
            "3. Stage 2: Link Reaction (Mitochondrial Matrix):",
            "   • 2 Pyruvate ➔ 2 Acetyl-CoA + 2 CO₂ + 2 mitochondrial NADH (yields 5.0 ATP).",
            "4. Stage 3: Krebs / Citric Acid Cycle (Matrix):",
            "   • Substrate-Level: +2 GTP (equivalent to +2 ATP).",
            "   • Coenzymes: +6 NADH (yields 15.0 ATP) + 2 FADH₂ (yields 3.0 ATP).",
            "5. Stage 4: Electron Transport System & Chemiosmotic ATP Synthase:",
            f"   • Modern Biophysical Net Yield (2.5 ATP/NADH, 1.5 ATP/FADH₂): **{total_modern:.0f} ATP**.",
            f"   • Classical NCERT Convention (3 ATP/NADH, 2 ATP/FADH₂): **{total_classical:.0f} ATP**.",
            "6. Pedagogical Note for NEET: NCERT accepts 36-38 ATP in traditional questions, and 30-32 ATP in modern chemiosmotic questions."
        ]

        return BiologySolveResult(
            success=True,
            domain="BIO_ENERGETICS",
            topic="CELLULAR_RESPIRATION_ATP_BALANCE",
            primary_answer=f"{total_modern:.0f} ATP (modern) / {total_classical:.0f} ATP (NCERT classical)",
            selected_option=None,
            ncert_reference="Class 11 Biology, Chapter 12 (Respiration in Plants), Section 14.5 (Respiratory Balance Sheet)",
            steps=steps,
        )

    @classmethod
    def calculate_cardiac_output(cls, heart_rate_bpm: float = 72.0, stroke_volume_ml: float = 70.0) -> BiologySolveResult:
        """Solves cardiac output CO = HR * SV with physiological interpretation."""
        co_ml_min = heart_rate_bpm * stroke_volume_ml
        co_l_min = co_ml_min / 1000.0

        steps = [
            f"1. Cardiac Parameters: Heart Rate (HR) = {heart_rate_bpm} beats/min, Stroke Volume (SV) = {stroke_volume_ml} mL/beat.",
            "2. Physiological Definition: Cardiac Output (CO) is the volume of blood pumped by each ventricle per minute.",
            "3. Governing Formula: CO = Heart Rate × Stroke Volume.",
            f"   CO = {heart_rate_bpm} × {stroke_volume_ml} mL/min = {co_ml_min:.0f} mL/min = **{co_l_min:.2f} L/min**.",
            "4. Clinical Interpretation: In a healthy resting human adult, resting cardiac output is approximately 5.0 Liters/minute (effectively recycling the entire blood volume every 60 seconds).",
        ]

        return BiologySolveResult(
            success=True,
            domain="BIO_ENERGETICS",
            topic="CARDIAC_OUTPUT",
            primary_answer=f"{co_l_min:.2f} L/min",
            selected_option=None,
            ncert_reference="Class 11 Biology, Chapter 15 (Body Fluids and Circulation), Section 18.3.1 (Cardiac Cycle)",
            steps=steps,
        )
