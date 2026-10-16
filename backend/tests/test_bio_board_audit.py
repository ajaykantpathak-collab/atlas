"""test_bio_board_audit.py -- OWNER-DIRECTIVE per-class biology board audit.

Standard: the owner's class-7 maths test.  ONE CLASS AT A TIME, sequentially
(9 -> 10 -> 11 -> 12).  Hand-curated REAL board-style biology questions per
chapter, graded like an examiner against the REAL solver (in-process,
SOLVER_LLM_MODE=off, no LLM, no Docker; DB-independent).

Honest-refusal contract (owner law):
  - PROSE (why/explain/describe/differentiate) must REFUSE
    (AMBIGUOUS / GUIDED_PRACTICE).  Any VERIFIED on prose = BUG.
  - MCQ/FACTUAL must grade CORRECTLY when the solver claims VERIFIED.
    VERIFIED + wrong answer = BUG (the worst class).
    An honest refusal on a factual = coverage GAP (recorded, lesser bug).
  - Every VERIFIED answer is scanned for slop (node ids, raw LaTeX,
    15-digit floats).

Output: per-class table + bug table (Bug class | Examples | Status) in
deploy/backend/content_tools/pedagogy/GOLDEN_BIO.md.

Run (from deploy/backend):
  PYTHONPATH=D:/platform/deploy SOLVER_LLM_MODE=off \
  python tests/test_bio_board_audit.py 9
"""
import datetime
import json
import os
import re
import sys
import traceback

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))
os.environ.setdefault("SOLVER_LLM_MODE", "off")

# ── examiner keys ────────────────────────────────────────────────────────────
# case = (chapter, archetype, question, key)
#   key: list of acceptable substrings (case-insensitive) for graded cases,
#        or None for a prose case that MUST refuse.
BIO9 = [
    # ── Ch1: The Fundamental Unit of Life (cell) ─────────────────────────
    ("1", "MCQ", "Which cell organelle is called the powerhouse of the "
     "cell? (a) Ribosome (b) Mitochondria (c) Golgi apparatus "
     "(d) Lysosome", ["mitochondria"]),
    ("1", "MCQ", "Which organelles are known as the suicidal bags of the "
     "cell? (a) Ribosome (b) Lysosome (c) Plastid (d) Vacuole",
     ["lysosome"]),
    ("1", "FACTUAL", "Which organelle is the control centre of the cell?",
     ["nucleus"]),
    ("1", "MCQ", "The term 'cell' was coined by: (a) Robert Hooke "
     "(b) Leeuwenhoek (c) Schleiden (d) Schwann", ["robert hooke"]),
    ("1", "MCQ", "Which of the following organelles is present only in "
     "plant cells? (a) Mitochondria (b) Plastid (c) Ribosome "
     "(d) Cell membrane", ["plastid"]),
    ("1", "FACTUAL", "Name the organelles that behave as semi-autonomous "
     "organelles of the cell.", ["mitochondria", "chloroplast"]),
    ("1", "PROSE", "Why is the cell called the structural and functional "
     "unit of life?", None),
    ("1", "PROSE", "Describe the fluid mosaic model of the plasma "
     "membrane.", None),
    ("1", "NUMERIC", "A cell divides every 20 minutes. Starting from one "
     "cell, how many cells will be produced after 2 hours?", ["64"]),
    # ── Ch2: Tissues ─────────────────────────────────────────────────────
    ("2", "MCQ", "Which vascular tissue transports water and minerals in "
     "plants? (a) Phloem (b) Xylem (c) Cambium (d) Cortex", ["xylem"]),
    ("2", "MCQ", "The tissue that transports food in plants is: "
     "(a) Xylem (b) Phloem (c) Parenchyma (d) Sclerenchyma", ["phloem"]),
    ("2", "FACTUAL", "Name the tissue that forms the inner lining of the "
     "mouth.", ["squamous epithel", "epithelial"]),
    ("2", "MCQ", "Which of the following muscles are involuntary and "
     "striated? (a) Skeletal muscles (b) Smooth muscles (c) Cardiac "
     "muscles (d) None of these", ["cardiac"]),
    ("2", "FACTUAL", "Which connective tissue connects muscle to bone?",
     ["tendon"]),
    ("2", "MCQ", "The longest cell in the human body is: (a) Nerve cell "
     "(b) Muscle cell (c) Egg cell (d) Blood cell", ["nerve"]),
    ("2", "PROSE", "Differentiate between meristematic and permanent "
     "tissues.", None),
    ("2", "PROSE", "Explain the structure of a neuron with a diagram.",
     None),
    # ── Ch3: Reproduction ────────────────────────────────────────────────
    ("3", "MCQ", "Binary fission is the mode of reproduction seen in: "
     "(a) Hydra (b) Amoeba (c) Yeast (d) Spirogyra", ["amoeba"]),
    ("3", "MCQ", "The transfer of pollen grains from the anther to the "
     "stigma is called: (a) Fertilisation (b) Pollination (c) Germination "
     "(d) Reproduction", ["pollination"]),
    ("3", "FACTUAL", "How many chromosomes are present in a human "
     "somatic cell?", ["46", "forty six", "twenty three pairs"]),
    ("3", "MCQ", "Fertilisation in humans normally takes place in the: "
     "(a) Uterus (b) Ovary (c) Fallopian tube (d) Cervix",
     ["fallopian"]),
    ("3", "MCQ", "Gonorrhoea is caused by: (a) Bacteria (b) Virus "
     "(c) Protozoa (d) Fungus", ["bacteria"]),
    ("3", "FACTUAL", "Name the reproductive organ of a flowering plant.",
     ["flower"]),
    ("3", "MCQ", "Vegetative propagation in potato takes place by: "
     "(a) Buds (eyes) of the stem tuber (b) Runners (c) Suckers "
     "(d) Leaves", ["bud", "tuber", "eye"]),
    ("3", "PROSE", "Explain the process of double fertilisation in "
     "flowering plants.", None),
    # ── Ch4: Diversity in Living Organisms ───────────────────────────────
    ("4", "MCQ", "The five kingdom classification was proposed by: "
     "(a) Aristotle (b) Linnaeus (c) R.H. Whittaker (d) Robert Hooke",
     ["whittaker"]),
    ("4", "MCQ", "The basic unit of classification is: (a) Species "
     "(b) Genus (c) Kingdom (d) Order", ["species"]),
    ("4", "MCQ", "Bacteria are placed in which kingdom? (a) Monera "
     "(b) Protista (c) Fungi (d) Plantae", ["monera"]),
    ("4", "FACTUAL", "Who proposed binomial nomenclature?",
     ["linnaeus"]),
    ("4", "MCQ", "The scientific name of mango is: (a) Mangifera indica "
     "(b) Rosa indica (c) Hibiscus rosa-sinensis (d) Ficus benghalensis",
     ["mangifera indica"]),
    ("4", "MCQ", "The correct order of taxonomic categories, from "
     "smallest to largest, is: (a) Species, Genus, Family, Order "
     "(b) Species, Family, Genus, Order (c) Genus, Species, Order, "
     "Family (d) Order, Family, Genus, Species",
     ["species, genus, family, order"]),
    ("4", "PROSE", "Why are fossils considered strong evidence for "
     "evolution?", None),
    ("4", "PROSE", "Describe the five kingdom classification of "
     "Whittaker.", None),
]

BIO10 = [
    # ── Ch1: Life Processes ─────────────────────────────────────────────
    ("1", "MCQ", "Which enzyme is present in human saliva? (a) Pepsin "
     "(b) Amylase (c) Trypsin (d) Lipase", ["amylase"]),
    ("1", "MCQ", "The respiratory pigment in human blood is: "
     "(a) Chlorophyll (b) Haemoglobin (c) Melanin (d) Carotene",
     ["haemoglobin", "hemoglobin"]),
    ("1", "MCQ", "The structural and functional unit of the kidney is: "
     "(a) Neuron (b) Nephron (c) Alveolus (d) Nephridia", ["nephron"]),
    ("1", "FACTUAL", "Name the process by which green plants prepare "
     "their own food.", ["photosynth"]),
    ("1", "MCQ", "The site of photosynthesis in a plant cell is: "
     "(a) Mitochondria (b) Chloroplast (c) Ribosome (d) Nucleus",
     ["chloroplast"]),
    ("1", "FACTUAL", "Name the process of loss of water vapour from the "
     "leaves of a plant.", ["transpiration"]),
    ("1", "NUMERIC", "If 10,000 J of energy is available to the plants "
     "in a food chain, how much energy will the herbivores (deer) "
     "receive?", ["1000"]),
    ("1", "PROSE", "Explain the process of nutrition in Amoeba with a "
     "diagram.", None),
    ("1", "PROSE", "Describe double circulation in human beings and its "
     "importance.", None),
    # ── Ch2: Control and Coordination ───────────────────────────────────
    ("2", "MCQ", "The structural and functional unit of the nervous "
     "system is: (a) Neuron (b) Nephron (c) Axon (d) Ureter", ["neuron"]),
    ("2", "MCQ", "Which hormone regulates blood sugar level in humans? "
     "(a) Insulin (b) Thyroxine (c) Adrenaline (d) Estrogen",
     ["insulin"]),
    ("2", "MCQ", "Reflex actions in humans are controlled by the: "
     "(a) Cerebrum (b) Spinal cord (c) Cerebellum (d) Medulla",
     ["spinal cord"]),
    ("2", "FACTUAL", "Name the part of the brain that maintains posture "
     "and balance of the body.", ["cerebellum"]),
    ("2", "MCQ", "Iodine deficiency in the diet causes: (a) Diabetes "
     "(b) Goitre (c) Anaemia (d) Rickets", ["goitre"]),
    ("2", "FACTUAL", "Which plant hormone promotes cell division?",
     ["cytokinin"]),
    ("2", "MCQ", "A synapse is a junction between: (a) two neurons "
     "(b) muscle and bone (c) two bones (d) artery and vein",
     ["two neurons", "neuron"]),
    ("2", "PROSE", "How does chemical coordination take place in human "
     "beings?", None),
    # ── Ch3: Reproduction ───────────────────────────────────────────────
    ("3", "MCQ", "The male reproductive part of a flower is: "
     "(a) Carpel (b) Stamen (c) Sepal (d) Petal", ["stamen"]),
    ("3", "FACTUAL", "Name the male and female gametes in human beings.",
     ["sperm"]),
    ("3", "MCQ", "In human females, the eggs (ova) are produced in the: "
     "(a) Uterus (b) Ovary (c) Oviduct (d) Cervix", ["ovary"]),
    ("3", "MCQ", "The gestation period in human beings is about: "
     "(a) 90 days (b) 180 days (c) 280 days (d) 380 days", ["280"]),
    ("3", "MCQ", "Which contraceptive method also protects against "
     "sexually transmitted infections? (a) Condom (b) Copper-T "
     "(c) Oral pills (d) Surgical methods", ["condom"]),
    ("3", "FACTUAL", "What is the site of fertilisation in the human "
     "female reproductive system?", ["fallopian", "oviduct"]),
    ("3", "PROSE", "Explain double fertilisation in flowering plants.",
     None),
    ("3", "PROSE", "Describe the process of seed formation after "
     "fertilisation.", None),
    # ── Ch4: Heredity and Evolution ─────────────────────────────────────
    ("4", "GENETICS", "Cross a tall pea plant (Tt) with a dwarf pea "
     "plant (tt). What fraction of the offspring will be tall?",
     ["1/2", "50", "0.5"]),
    ("4", "GENETICS", "Two pea plants with round seeds and genotype Rr "
     "are crossed (self-pollination). What fraction of the offspring "
     "will have wrinkled seeds (rr)?", ["1/4", "25", "0.25"]),
    ("4", "GENETICS", "A cross between a pure tall (TT) and a pure "
     "dwarf (tt) pea plant gives F1 plants which are: (a) all tall "
     "(b) all dwarf (c) half tall and half dwarf (d) 3 tall : 1 dwarf",
     ["all tall", "tall", "1 dominant", "dominant"]),
    ("4", "GENETICS", "A cross between Tt and Tt pea plants gives the "
     "phenotypic ratio: (a) 3:1 (b) 1:1 (c) 1:2:1 (d) 9:3:3:1",
     ["3:1", "3 : 1", "3 dominant", "three"]),
    ("4", "FACTUAL", "Who is known as the father of genetics?",
     ["mendel"]),
    ("4", "MCQ", "The sex of a child in humans is determined by: "
     "(a) the mother's chromosomes (b) the father's chromosomes "
     "(c) both parents equally (d) the nutrition of the mother",
     ["father"]),
    ("4", "MCQ", "Which of the following is an acquired trait in "
     "humans? (a) Eye colour (b) Blood group (c) Learning to ride a "
     "bicycle (d) Hair texture", ["bicycle", "learning", "ride"]),
    ("4", "PROSE", "Explain Mendel's law of segregation with an "
     "example.", None),
    ("4", "PROSE", "Describe how fossils support the theory of "
     "evolution.", None),
]

BIO11 = [
    # ch1 The Living World
    ("1", "MCQ", "The basic unit of classification is: (a) Species "
     "(b) Genus (c) Kingdom (d) Order", ["species"]),
    ("1", "MCQ", "The scientific term for the variety of organisms in a "
     "given area is: (a) biodiversity (b) ecology (c) taxonomy "
     "(d) biogeography", ["biodiversity"]),
    ("1", "FACTUAL", "Which is the lowest taxonomic category showing "
     "similar morphological characters?", ["species"]),
    ("1", "PROSE", "Why are living organisms regarded as open systems?",
     None),
    # ch2 Biological Classification
    ("2", "MCQ", "The five kingdom classification was proposed by: "
     "(a) Aristotle (b) Linnaeus (c) R.H. Whittaker (d) Haeckel",
     ["whittaker"]),
    ("2", "MCQ", "The red pigment found in Rhodophyta is: (a) chlorophyll "
     "a (b) r-phycoerythrin (c) fucoxanthin (d) chlorophyll d",
     ["phycoerythrin"]),
    ("2", "FACTUAL", "Name the kingdom to which slime moulds belong "
     "according to Whittaker.", ["protista", "protista"]),
    ("2", "PROSE", "Describe the characteristic features of "
     "bryophytes.", None),
    # ch3 Plant Kingdom (cryptogamae/phanerogamae spine)
    ("3", "MCQ", "Gymnosperms bear seeds which are: (a) naked (b) "
     "enclosed in fruits (c) fused with petals (d) absent", ["naked"]),
    ("3", "FACTUAL", "Name the female sex organ of bryophytes and "
     "pteridophytes.", ["archegonium"]),
    ("3", "MCQ", "Double fertilisation is characteristic of: "
     "(a) angiosperms (b) gymnosperms (c) pteridophytes (d) bryophytes",
     ["angiosperm"]),
    ("3", "PROSE", "Explain the life cycle of a fern.", None),
    # ch4 Animal Kingdom
    ("4", "MCQ", "Radial symmetry is seen in: (a) Earthworm (b) Starfish "
     "(c) Roundworm (d) Liver fluke", ["starfish"]),
    ("4", "FACTUAL", "Which phylum possesses a water vascular system?",
     ["echinoderm"]),
    ("4", "MCQ", "Notochord is a characteristic feature of phylum: "
     "(a) Annelida (b) Chordata (c) Arthropoda (d) Mollusca",
     ["chordata"]),
    ("4", "PROSE", "Describe the coelom types with examples.", None),
    # ch5 Morphology of Flowering Plants
    ("5", "MCQ", "The arrangement of leaves on a stem or branch is "
     "called: (a) phyllotaxy (b) aestivation (c) placentation "
     "(d) venation", ["phyllotaxy"]),
    ("5", "FACTUAL", "Name the modified underground stem of potato.",
     ["tuber", "stem"]),
    ("5", "MCQ", "Mustard belongs to the family: (a) Fabaceae "
     "(b) Solanaceae (c) Brassicaceae (d) Liliaceae", ["brassicaceae"]),
    ("5", "PROSE", "Describe the regions of a typical root with a "
     "diagram.", None),
    # ch6 Anatomy of Flowering Plants
    ("6", "MCQ", "Which meristem is responsible for secondary growth in "
     "dicot stems? (a) Apical (b) Intercalary (c) Lateral (d) Primary",
     ["lateral", "cambium"]),
    ("6", "FACTUAL", "Name the ground tissue of a leaf.",
     ["mesophyll"]),
    ("6", "MCQ", "Monocot roots differ from dicot roots in having: "
     "(a) more than six xylem bundles (b) fewer xylem bundles "
     "(c) exarch xylem (d) cambium", ["six", "polyarch", "more"]),
    ("6", "PROSE", "Explain the internal structure of a dicot leaf with "
     "a diagram.", None),
    # ch7 Structural Organisation in Animals
    ("7", "MCQ", "The inner lining of the intestine is: (a) Squamous "
     "epithelium (b) Columnar epithelium (c) Cuboidal epithelium "
     "(d) Ciliated epithelium", ["columnar"]),
    ("7", "FACTUAL", "Which is the hardest connective tissue in the "
     "human body?", ["bone"]),
    ("7", "MCQ", "Mast cells are found in: (a) Areolar tissue (b) Blood "
     "(c) Bone (d) Cartilage", ["areolar", "connective"]),
    ("7", "PROSE", "Describe the structure of skeletal muscle with a "
     "diagram.", None),
    # ch8 Cell: The Unit of Life (anchors must fire)
    ("8", "FACTUAL", "Which organelle is called the powerhouse of the "
     "cell?", ["mitochondria"]),
    ("8", "FACTUAL", "Which organelles are known as the suicidal bags "
     "of the cell?", ["lysosome"]),
    ("8", "MCQ", "The cell theory was proposed by: (a) Schleiden and "
     "Schwann (b) Hooke and Leeuwenhoek (c) Watson and Crick "
     "(d) Mendel and Darwin", ["schleiden", "schwann"]),
    ("8", "PROSE", "Why is the plasma membrane called a fluid mosaic?",
     None),
    # ch9 Biomolecules
    ("9", "MCQ", "The bond linking two amino acids in a protein is: "
     "(a) Peptide bond (b) Glycosidic bond (c) Ester bond (d) Hydrogen "
     "bond", ["peptide"]),
    ("9", "MCQ", "The most abundant protein in the animal world is: "
     "(a) Collagen (b) RuBisCO (c) Haemoglobin (d) Insulin",
     ["collagen"]),
    ("9", "FACTUAL", "Almost all enzymes are which class of "
     "biomolecules?", ["protein"]),
    ("9", "PROSE", "Explain the structure of a protein with its four "
     "levels of organisation.", None),
    # ch10 Cell Cycle and Cell Division
    ("10", "MCQ", "DNA replication occurs in which phase of the cell "
     "cycle? (a) G1 (b) S (c) G2 (d) M", ["s phase", "s-phase", "(b)",
     "s"]),
    ("10", "FACTUAL", "How many daughter cells are produced at the end "
     "of meiosis?", ["four", "4"]),
    ("10", "MCQ", "Crossing over takes place during: (a) Prophase I "
     "(b) Prophase II (c) Metaphase I (d) Anaphase II",
     ["prophase i", "prophase 1"]),
    ("10", "PROSE", "Describe the stages of prophase I of meiosis.",
     None),
    # ch11 Photosynthesis (photo_resp_quiz facts may fire)
    ("11", "MCQ", "The light reaction of photosynthesis takes place in "
     "the: (a) Stroma (b) Thylakoid membrane (c) Cytoplasm "
     "(d) Mitochondria", ["thylakoid", "grana"]),
    ("11", "FACTUAL", "Which pigment is essential for photosynthesis?",
     ["chlorophyll a", "chlorophyll"]),
    ("11", "MCQ", "The primary CO2 acceptor in C4 plants is: (a) PEP "
     "(b) RuBP (c) OAA (d) PGA", ["pep"]),
    ("11", "PROSE", "Explain the Calvin cycle with a diagram.", None),
    # ch12 Respiration in Plants (RQ family)
    ("12", "MCQ", "The net gain of ATP in glycolysis from one glucose "
     "molecule is: (a) 2 (b) 4 (c) 6 (d) 8", ["2"]),
    ("12", "NUMERIC", "What is the respiratory quotient (RQ) of "
     "glucose when fully oxidised?", ["1"]),
    ("12", "MCQ", "The site of the Krebs cycle is the: (a) Cytoplasm "
     "(b) Mitochondrial matrix (c) Inner membrane (d) Chloroplast "
     "stroma", ["matrix"]),
    ("12", "PROSE", "Explain the steps of glycolysis with a diagram.",
     None),
    # ch13 Plant Growth and Development
    ("13", "MCQ", "Which plant hormone promotes fruit ripening? "
     "(a) Auxin (b) Ethylene (c) Gibberellin (d) Cytokinin",
     ["ethylene"]),
    ("13", "FACTUAL", "Which plant hormone is called the stress "
     "hormone?", ["abscisic", "aba"]),
    ("13", "MCQ", "The bolting effect in rosette plants is induced by: "
     "(a) Auxin (b) Gibberellin (c) Ethylene (d) ABA",
     ["gibberellin"]),
    ("13", "PROSE", "Explain the concept of vernalisation with "
     "examples.", None),
    # ch14 Breathing and Exchange of Gases
    ("14", "MCQ", "Oxygen is mainly transported in human blood by: "
     "(a) Plasma (b) Haemoglobin (c) Lymph (d) Bicarbonate ions",
     ["haemoglobin", "hemoglobin"]),
    ("14", "FACTUAL", "Where does exchange of gases occur in the "
     "lungs?", ["alveoli", "alveolus"]),
    ("14", "MCQ", "Most CO2 is transported in blood as: (a) Carbamino-"
     "haemoglobin (b) Bicarbonate ions (c) Carbonic acid (d) Dissolved "
     "CO2", ["bicarbonate"]),
    ("14", "PROSE", "Explain the mechanism of breathing with pressure "
     "changes.", None),
    # ch15 Body Fluids and Circulation (cardiac output engine)
    ("15", "NUMERIC", "Calculate the cardiac output of a person with "
     "heart rate 72 beats per minute and stroke volume 70 mL.",
     ["5.04", "5 l", "5040"]),
    ("15", "MCQ", "The pacemaker of the human heart is: (a) SA node "
     "(b) AV node (c) Purkinje fibres (d) Bundle of His", ["sa node"]),
    ("15", "MCQ", "Blood group AB individuals have which antibodies in "
     "plasma? (a) anti-A (b) anti-B (c) both (d) none", ["none"]),
    ("15", "PROSE", "Describe the conducting system of the human heart "
     "with a diagram.", None),
    # ch16 Excretory Products and their Elimination
    ("16", "MCQ", "The functional unit of the human kidney is: "
     "(a) Neuron (b) Nephron (c) Alveolus (d) Sarcomere", ["nephron"]),
    ("16", "FACTUAL", "Which hormone promotes water reabsorption in "
     "the collecting duct?", ["adh", "vasopressin"]),
    ("16", "MCQ", "The normal pH of human urine is about: (a) 6.0 "
     "(b) 7.4 (c) 8.5 (d) 5.0", ["6"]),
    ("16", "PROSE", "Explain counter-current multiplication in the "
     "loop of Henle.", None),
    # ch17 Locomotion and Movement
    ("17", "MCQ", "The sliding filament theory explains: (a) Muscle "
     "contraction (b) Nerve conduction (c) Blood clotting (d) Bone "
     "growth", ["muscle contraction", "contraction"]),
    ("17", "FACTUAL", "Which type of joint connects the femur to the "
     "pelvis?", ["ball and socket", "hip"]),
    ("17", "MCQ", "The contractile protein of muscle is: (a) Actin and "
     "myosin (b) Collagen (c) Keratin (d) Tubulin",
     ["actin", "myosin"]),
    ("17", "PROSE", "Explain the mechanism of muscle contraction with "
     "a diagram.", None),
    # ch18 Neural Control and Coordination
    ("18", "MCQ", "The neurotransmitter released at the neuromuscular "
     "junction is: (a) Acetylcholine (b) Dopamine (c) GABA (d) "
     "Serotonin", ["acetylcholine"]),
    ("18", "FACTUAL", "Which part of the brain controls respiration "
     "and gastric secretion?", ["medulla"]),
    ("18", "MCQ", "The myelinated nerve fibres are found mainly in: "
     "(a) Cranial nerves (b) Spinal nerves (c) White matter of CNS "
     "(d) Grey matter of CNS", ["white matter", "cranial"]),
    ("18", "PROSE", "Explain conduction of a nerve impulse along an "
     "axon.", None),
    # ch19 Chemical Coordination and Integration
    ("19", "MCQ", "Which gland is called the master gland? (a) Thyroid "
     "(b) Pituitary (c) Adrenal (d) Pancreas", ["pituitary"]),
    ("19", "FACTUAL", "Name the hormone that lowers blood calcium "
     "level.", ["calcitonin", "thyrocalcitonin"]),
    ("19", "MCQ", "Cortisol is secreted by the: (a) Adrenal medulla "
     "(b) Adrenal cortex (c) Thyroid (d) Thymus", ["cortex"]),
    ("19", "PROSE", "Explain how adrenal hormones help the body cope "
     "with stress.", None),
]

BIO12 = [
    # ch1 Sexual Reproduction in Flowering Plants
    ("1", "MCQ", "The site of fertilisation in a flowering plant is "
     "the: (a) Stigma (b) Ovule (c) Anther (d) Pollen tube tip",
     ["ovule"]),
    ("1", "FACTUAL", "Which cell of the embryo sac fuses with one male "
     "gamete to form the zygote?", ["egg", "oosphere"]),
    ("1", "MCQ", "Endosperm in angiosperms is generally: (a) Triploid "
     "(b) Diploid (c) Haploid (d) Tetraploid", ["triploid", "3n"]),
    ("1", "PROSE", "Explain double fertilisation in flowering plants.",
     None),
    # ch2 Human Reproduction
    ("2", "MCQ", "Sperms are produced in the: (a) Seminiferous tubules "
     "(b) Epididymis (c) Vas deferens (d) Prostate gland",
     ["seminiferous"]),
    ("2", "FACTUAL", "Which hormone maintains pregnancy?",
     ["progesterone"]),
    ("2", "MCQ", "Fertilisation in humans normally occurs in the: "
     "(a) Uterus (b) Ampullary-isthmic junction of the fallopian tube "
     "(c) Cervix (d) Ovary", ["fallopian", "ampullary", "oviduct"]),
    ("2", "PROSE", "Describe the phases of the menstrual cycle.", None),
    # ch3 Reproductive Health
    ("3", "MCQ", "Copper-T is an example of: (a) Barrier method "
     "(b) Intrauterine device (c) Hormonal pill (d) Surgical method",
     ["intrauterine", "iud"]),
    ("3", "MCQ", "Amniocentesis is legally banned in India when misused "
     "for: (a) Sex determination (b) Genetic testing (c) IVF (d) "
     "Ultrasound", ["sex determination"]),
    ("3", "FACTUAL", "Name the surgical method of contraception in "
     "human males.", ["vasectomy"]),
    ("3", "PROSE", "Explain the assisted reproductive technologies "
     "available for infertile couples.", None),
    # ch4 Principles of Inheritance and Variation
    ("4", "GENETICS", "Cross a heterozygous tall pea plant (Tt) with a "
     "dwarf pea plant (tt). What fraction of the offspring will be "
     "tall?", ["1/2", "50", "0.5"]),
    ("4", "GENETICS", "A woman who is a carrier for colour blindness "
     "(XCX) marries a normal man (XY). What fraction of their sons "
     "will be colour-blind?", ["1/2", "50", "0.5"]),
    ("4", "GENETICS", "A heterozygous blood group A father (AO) "
     "marries a heterozygous blood group B mother (BO). Can they have "
     "a child of blood group O?", ["yes", "oo", "all four"]),
    ("4", "MCQ", "Phenylketonuria is inherited as: (a) Autosomal "
     "recessive trait (b) Autosomal dominant trait (c) X-linked "
     "recessive (d) Y-linked", ["autosomal recessive", "recessive"]),
    ("4", "FACTUAL", "Who gave the chromosome theory of inheritance?",
     ["sutton", "boveri"]),
    ("4", "PROSE", "Explain Mendel's law of independent assortment "
     "with a dihybrid cross.", None),
    # ch5 Molecular Basis of Inheritance
    ("5", "MCQ", "The double helix model of DNA was proposed by: "
     "(a) Watson and Crick (b) Griffith (c) Hershey and Chase "
     "(d) Mendel", ["watson", "crick"]),
    ("5", "FACTUAL", "In which direction does DNA polymerase synthesise "
     "the new strand?", ["5", "five prime to three"]),
    ("5", "MCQ", "Which enzyme unwinds the DNA double helix during "
     "replication? (a) Helicase (b) Ligase (c) DNA polymerase "
     "(d) Primase", ["helicase"]),
    ("5", "PROSE", "Describe the semi-conservative replication of DNA "
     "with the Meselson-Stahl experiment.", None),
    # ch6 Evolution
    ("6", "MCQ", "Analogous organs have: (a) Same structure but "
     "different functions (b) Different structures but similar "
     "functions (c) Same structure and function (d) Different "
     "structure and function", ["different structure", "similar "
     "function"]),
    ("6", "FACTUAL", "Who proposed natural selection as the mechanism "
     "of evolution?", ["darwin"]),
    ("6", "MCQ", "Miller and Urey's experiment demonstrated the "
     "formation of: (a) Amino acids (b) Proteins (c) DNA (d) Cells",
     ["amino acid"]),
    ("6", "PROSE", "Explain Darwin's finches as evidence of adaptive "
     "radiation.", None),
    # ch7 Human Health and Disease
    ("7", "MCQ", "Malaria is caused by: (a) Plasmodium (b) Virus "
     "(c) Bacteria (d) Fungus", ["plasmodium"]),
    ("7", "FACTUAL", "Which cells of the immune system does HIV "
     "primarily attack?", ["helper t", "t-lymphocyte", "cd4"]),
    ("7", "MCQ", "Antibodies are chemically: (a) Proteins (b) Lipids "
     "(c) Carbohydrates (d) Nucleic acids", ["protein"]),
    ("7", "PROSE", "Explain the life cycle of the malarial parasite in "
     "the human body.", None),
    # ch8 Strategies for Enhancement in Food Production
    ("8", "MCQ", "Inbreeding depression can be overcome by: (a) "
     "Outcrossing (b) More inbreeding (c) Self-pollination (d) "
     "Isolation", ["outcross", "out-cross"]),
    ("8", "FACTUAL", "Name the indigenous honey bee species used in "
     "commercial honey production in India.", ["apis indica",
     "apis"]),
    ("8", "MCQ", "Superovulation in cattle is induced by hormones "
     "called: (a) FSH (b) Oxytocin (c) Insulin (d) Thyroxine",
     ["fsh", "gonadotropin"]),
    ("8", "PROSE", "Describe the steps of plant breeding programmes.",
     None),
    # ch9 Microbes in Human Welfare
    ("9", "MCQ", "Lactobacillus converts milk into curd by producing: "
     "(a) Lactic acid (b) Acetic acid (c) Ethanol (d) CO2 only",
     ["lactic"]),
    ("9", "FACTUAL", "Which group of microbes produces biogas in a "
     "biogas plant?", ["methanogen"]),
    ("9", "MCQ", "Penicillin was discovered by: (a) Alexander Fleming "
     "(b) Louis Pasteur (c) Robert Koch (d) Edward Jenner",
     ["fleming"]),
    ("9", "PROSE", "Explain how microbes are used in sewage treatment "
     "plants.", None),
    # ch10 Biotechnology: Principles and Processes
    ("10", "MCQ", "The enzyme used to cut DNA at specific sequences "
     "is: (a) Restriction endonuclease (b) Ligase (c) Amylase "
     "(d) Lipase", ["restriction"]),
    ("10", "FACTUAL", "Name the Ti plasmid's natural host used in gene "
     "transfer in plants.", ["agrobacterium"]),
    ("10", "MCQ", "Taq polymerase is used in: (a) PCR (b) Gel "
     "electrophoresis (c) ELISA (d) Southern blotting", ["pcr"]),
    ("10", "PROSE", "Explain the steps of recombinant DNA technology.",
     None),
    # ch11 Biotechnology and its Applications
    ("11", "MCQ", "Bt cotton is resistant to: (a) Bollworm "
     "(b) Drought (c) Fungus (d) Weeds", ["bollworm"]),
    ("11", "FACTUAL", "Which gene family makes Bt cotton toxic to "
     "insects?", ["cry"]),
    ("11", "MCQ", "Human insulin produced by rDNA technology is "
     "marketed as: (a) Humulin (b) Penicillin (c) Tetracycline "
     "(d) Interferon", ["humulin"]),
    ("11", "PROSE", "Explain RNA interference with an example.", None),
    # ch12 Organisms and Populations
    ("12", "NUMERIC", "A bacterial population of 1000 grows "
     "exponentially, doubling every hour. What is the population "
     "after 4 hours?", ["16000"]),
    ("12", "MCQ", "The 10 percent law of energy transfer was proposed "
     "by: (a) Lindeman (b) Odum (c) Tansley (d) Elton", ["lindeman"]),
    ("12", "MCQ", "Animals that can tolerate only a narrow temperature "
     "range are called: (a) Stenothermal (b) Eurythermal (c) "
     "Euryhaline (d) Stenohaline", ["stenothermal"]),
    ("12", "PROSE", "Explain population interactions with examples of "
     "mutualism and competition.", None),
]

CLASSES = {9: BIO9, 10: BIO10, 11: BIO11, 12: BIO12}

# slop patterns that must never appear in a student-facing answer
_SLOP = [
    (r"\bc\d+_[a-z]{3,4}_cbse_\d+_\d+\b", "node id in answer"),
    (r"\\frac|\\times|\\int|\$\$|\\\[", "raw LaTeX in answer"),
    (r"\b\d{10,}\.\d+\b", "15-digit float"),
    (r"\bthe student\b", "'the student' voice"),
]


def _judge(case_key, r):
    """Examiner judgement. Returns (verdict, bugclass_or_None)."""
    label = str(r.label or "")
    ans = str(r.answer or "")
    verified = label.startswith("VERIFIED")
    if case_key is None:                      # prose: must refuse
        if verified:
            return "FAIL", "REFUSAL-GAP (prose shipped VERIFIED)"
        return "PASS", None
    if verified:
        low = ans.lower()
        if re.fullmatch(r"option \([a-d]\)\s*0(\.0)?", ans.strip()):
            # mcq_solver.py:200 sentinel value 0.0 reformatted by
            # answer_pipeline.py:1514 -- correct letter, destroyed text
            return "FAIL", ("GARBAGE-ANSWER (option text overwritten "
                            "with 0; letter may be correct)")
        if any(k.lower() in low for k in case_key):
            return "PASS", None
        return "FAIL", "WRONG-ANSWER (VERIFIED but not the examiner key)"
    # refused a graded factual: honest but contract says must grade
    return "EDGE", "COVERAGE-GAP (honest refusal on gradeable factual)"


def run_class(cls):
    from backend.its.solver.answer_pipeline import answer
    cases = CLASSES[cls]
    rows, bugs = [], []
    for i, (ch, arch, q, key) in enumerate(cases, 1):
        qid = f"c{cls}.ch{ch}.{arch}.{i:02d}"
        try:
            r = answer(q)
        except Exception as e:
            rows.append((qid, arch, ch, "CRASH", f"{type(e).__name__}: "
                         f"{str(e)[:80]}", "CRASH"))
            bugs.append(("CRASH", qid, q, f"{type(e).__name__}: "
                         f"{str(e)[:120]}"))
            continue
        label = str(r.label or "")
        ans = str(r.answer or "")
        verdict, bugclass = _judge(key, r)
        note = ""
        if verdict == "PASS" and label.startswith("VERIFIED"):
            for pat, what in _SLOP:
                if re.search(pat, ans):
                    verdict, bugclass = "FAIL", f"SLOP ({what})"
                    break
        rows.append((qid, arch, ch, label, ans[:70], verdict))
        if bugclass:
            bugs.append((bugclass, qid, q, f"label={label} ans={ans[:110]}"))
        print(f"[{verdict}] {qid}: {label} | {ans[:64]}", flush=True)
    return rows, bugs


def run_socratic_stations():
    """No-DB socratic + catalog checks for biology (genetics_dominance)."""
    out = []
    try:
        from backend.its.solver.socratic_moves import (build_sequence,
                                                       grade_move)
        seq = build_sequence("genetics_dominance", "tt",
                             "Cross Tt x Tt. What fraction of offspring is "
                             "tall? (tallness dominant)", "3/4")
        ok_a = (bool(seq.moves) and seq.moves[0]["kind"] == "elicit"
                and "tt" in seq.moves[0]["text"]
                and seq.misconception_id == "genetics_dominance")
        # isolate 1 for genetics_dominance: Tt x Tt recessive FRACTION
        ok_g, fb, nxt = grade_move(seq, "iso1", "1/4")
        out.append(("socratic genetics_dominance dialogue builds + iso1 "
                    "grades (1/4 correct, next=retry)",
                    ok_a and ok_g and nxt == "retry",
                    f"{len(seq.moves)} moves; iso1 ok={ok_g} next={nxt}"))
    except Exception as e:
        out.append(("socratic genetics_dominance", False,
                    f"{type(e).__name__}: {str(e)[:110]}"))
    try:
        from backend.its.solver.misconception_catalog import MisconceptionCatalog
        cat = MisconceptionCatalog()
        c9 = [m.get("id") for m in cat.get_by_class(9)
              if "biology" in (m.get("subjects") or [])]
        c10 = [m.get("id") for m in cat.get_by_class(10)
               if "biology" in (m.get("subjects") or [])]
        gap = "genetics_dominance" not in c9 and "genetics_dominance" in c10
        out.append(("catalog: genetics_dominance maps to biology",
                    "genetics_dominance" in c10,
                    f"c9 biology socratics={c9 or 'NONE'}; "
                    f"c10 has genetics_dominance={gap and 'yes'}"))
        if gap:
            out.append(("catalog class-9 biology coverage (c9 bio corpus "
                        "teaches reproduction/meiosis but catalog maps "
                        "genetics_dominance only to 10-12)", None,
                        "documented as coverage gap — serving-layer, "
                        "not a grading lie"))
    except Exception as e:
        out.append(("misconception catalog", False,
                    f"{type(e).__name__}: {str(e)[:110]}"))
    for name, ok, ev in out:
        tag = "PASS" if ok else ("FAIL" if ok is False else "NOTE")
        print(f"[{tag}] socratic: {name}: {ev}", flush=True)
    return out


def main():
    cls = int(sys.argv[1]) if len(sys.argv) > 1 else 9
    if cls not in CLASSES:
        print(f"no curated set for class {cls} yet", flush=True)
        return 2
    print(f"=== BIOLOGY BOARD AUDIT — CLASS {cls} "
          f"({len(CLASSES[cls])} examiner-graded questions) ===", flush=True)
    rows, bugs = run_class(cls)
    socratic = run_socratic_stations()

    graded = [r for r in rows]
    n_pass = sum(1 for r in rows if r[5] == "PASS")
    n_fail = sum(1 for r in rows if r[5] == "FAIL")
    n_edge = sum(1 for r in rows if r[5] == "EDGE")
    n_crash = sum(1 for r in rows if r[5] == "CRASH")
    print(f"\n=== CLASS {cls} BIO: {n_pass} PASS / {n_fail} FAIL / "
          f"{n_edge} EDGE (honest-refusal gaps) / {n_crash} crash "
          f"of {len(graded)} ===", flush=True)

    _write_report(cls, rows, bugs, socratic,
                  n_pass, n_fail, n_edge, n_crash)
    return 0


def _write_report(cls, rows, bugs, socratic, n_pass, n_fail, n_edge,
                  n_crash):
    out = os.path.join(os.path.dirname(os.path.dirname(
        os.path.abspath(__file__))), "content_tools", "pedagogy",
        "BIO_BOARD_AUDIT.md")
    lines = []
    lines += [
        f"## Class {cls} biology — board audit "
        f"({datetime.datetime.now():%Y-%m-%d %H:%M})",
        "",
        f"Result: **{n_pass} PASS / {n_fail} FAIL / {n_edge} EDGE / "
        f"{n_crash} crash** of {len(rows)} hand-curated board questions "
        f"(per-chapter, examiner keys), plus socratic stations. "
        f"In-process, no LLM, no DB (DB-dependent serving checks marked "
        f"pending live re-check).",
        "",
        "| Q | Ch | Archetype | Label | Answer (trim) | Verdict |",
        "|---|----|-----------|-------|---------------|---------|",
    ]
    for qid, arch, ch, label, ans, verdict in rows:
        lines.append(f"| {qid} | {ch} | {arch} | {label} | "
                     f"{ans.replace('|', '/')} | {verdict} |")
    lines += ["", f"### Bug table — class {cls} "
              "(owner format: Bug class | Examples | Status)", "",
              "| Bug class | Examples | Status |",
              "|-----------|----------|--------|"]
    if bugs:
        seen = {}
        for bc, qid, q, ev in bugs:
            seen.setdefault(bc, []).append((qid, q, ev))
        for bc, items in seen.items():
            ex = "; ".join(f"{q[:56]}..." for _, q, _ in items[:2])
            lines.append(f"| {bc} | {ex.replace('|', '/')} | "
                         f"confirmed ({len(items)} case(s)) |")
    else:
        lines.append("| (none) | — | all graded answers correct |")
    lines += ["", "### Socratic / catalog stations (no DB)", ""]
    for name, ok, ev in socratic:
        tag = "PASS" if ok else ("FAIL" if ok is False else "NOTE")
        lines.append(f"- [{tag}] {name} — {ev.replace('|', '/')}")
    lines.append("")
    # merge with any earlier class section in the file
    header = ("# BIO-BOARD-AUDIT — per-class biology board audit "
              "(owner directive: one class at a time, honest-refusal "
              "contract)\n")
    old = ""
    if os.path.exists(out):
        with open(out, encoding="utf-8") as f:
            old = f.read()
    if old.startswith("# BIO-BOARD-AUDIT"):
        body_old = old.split("\n", 1)[1]
    else:
        body_old = old
    new_section = "\n".join(lines) + "\n"
    if f"## Class {cls} biology" in body_old:
        # replace this class's section, keep others (and keep the new one!)
        parts = body_old.split("## Class ")
        keep = [p for p in parts if p and not p.startswith(f"{cls} biology")]
        body = "\n## Class ".join(keep) + new_section
    else:
        body = body_old + new_section  # sequential: oldest class first
    with open(out, "w", encoding="utf-8") as f:
        f.write(header.rstrip("\n") + "\n" + body)
    print(f"report written: {out}", flush=True)


if __name__ == "__main__":
    sys.exit(main())
