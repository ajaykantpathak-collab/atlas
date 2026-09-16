import random
import math
import json
from dataclasses import dataclass, field
from typing import List, Dict, Tuple, Optional
from enum import Enum

# ============================================================
#  CLASS 9 BIOLOGY DETERMINISTIC SOLVER  (ICSE Syllabus)
# ============================================================

# ---------- seeded RNG ----------------------------------------
def make_rng(seed: int = 42) -> random.Random:
    return random.Random(seed)

# ---------- data classes --------------------------------------
class Section(Enum):
    BASIC_BIOLOGY = 1
    TISSUES = 2
    PLANTS_PHYSIO = 3
    HUMAN_NUTRITION = 4
    RESPIRATION_TRANSPORT = 5
    NERVOUS_SYSTEM = 6
    HEALTH_HYGIENE = 7

@dataclass
class Question:
    id: str
    section: str
    topic: str
    difficulty: str
    competency: str
    question_text: str
    options: List[str]
    correct_index: int
    explanation: str
    bloom_level: str

@dataclass
class SolverResult:
    question_id: str
    user_answer: int
    correct: bool
    correct_index: int
    explanation: str
    step_by_step: List[str]

# ============================================================
#  SECTION 1  –  BASIC BIOLOGY
# ============================================================

class BasicBiologySolver:

    # ---------- Cell Theory & Organelles (c9_bio_001) ----------
    CELL_ORGANELLES = {
        "Nucleus": ("Control room / brain of the cell", "Stores DNA, controls all cell activities"),
        "Nucleolus": ("RNA factory inside nucleus", "Makes ribosomes"),
        "Cell membrane": ("Gatekeeper / security guard", "Controls what enters and leaves the cell"),
        "Cell wall": ("Rigid jacket (plants only)", "Provides shape and support, made of cellulose"),
        "Cytoplasm": ("Jelly-like filling", "Where most cell reactions happen"),
        "Mitochondria": ("Powerhouse / battery of the cell", "Produces ATP through cellular respiration"),
        "Ribosome": ("Protein factory / 3D printer", "Synthesises proteins from amino acids"),
        "Endoplasmic reticulum": ("Transport highway", "Rough ER has ribosomes for protein synthesis; Smooth ER makes lipids"),
        "Golgi bodies": ("Post office", "Modifies, sorts, packages and ships proteins and lipids"),
        "Lysosome": ("Garbage disposal / suicide bag", "Contains digestive enzymes to break down waste"),
        "Plastids": ("Coloured / colourless sacs (plants only)", "Chloroplasts for photosynthesis, leucoplasts for storage"),
        "Vacuole": ("Storage tank / water reservoir", "Stores water, pigments, waste (large central vacuole in plants)"),
        "Centrosome": ("Organises microtubules (animals only)", "Helps in cell division, contains centrioles"),
    }

    CELL_THEORY_PRINCIPLES = [
        "All living organisms are composed of one or more cells.",
        "The cell is the basic structural and functional unit of life.",
        "All cells arise from pre-existing cells.",
    ]

    @staticmethod
    def q_cell_theory(rng: random.Random) -> Question:
        qtype = rng.choice(["principle", "analogy", "label", "function"])
        if qtype == "principle":
            organelle = rng.choice(list(BasicBiologySolver.CELL_ORGANELLES.keys()))
            analogy, func = BasicBiologySolver.CELL_ORGANELLES[organelle]
            opts = rng.sample(
                [v[0] for v in BasicBiologySolver.CELL_ORGANELLES.values()], 4
            )
            if analogy not in opts:
                opts[rng.randint(0, 3)] = analogy
            rng.shuffle(opts)
            correct = opts.index(analogy)
            return Question(
                id=f"s1_q_cell_{rng.randint(1000,9999)}",
                section="Basic Biology",
                topic="Cell Organelles",
                difficulty="Medium",
                competency="Remember",
                question_text=f"Which analogy best describes the {organelle}?",
                options=opts,
                correct_index=correct,
                explanation=f"The {organelle} is best described as '{analogy}' because {func.lower()}.",
                bloom_level="Remember",
            )
        elif qtype == "function":
            organelle = rng.choice(list(BasicBiologySolver.CELL_ORGANELLES.keys()))
            _, func = BasicBiologySolver.CELL_ORGANELLES[organelle]
            wrong = [
                v[1] for k, v in BasicBiologySolver.CELL_ORGANELLES.items() if k != organelle
            ]
            opts = rng.sample(wrong, 3) + [func]
            rng.shuffle(opts)
            correct = opts.index(func)
            return Question(
                id=f"s1_q_fn_{rng.randint(1000,9999)}",
                section="Basic Biology",
                topic="Cell Organelles",
                difficulty="Medium",
                competency="Understand",
                question_text=f"What is the main function of the {organelle}?",
                options=opts,
                correct_index=correct,
                explanation=f"The {organelle}: {func.lower()}.",
                bloom_level="Understand",
            )
        else:  # principle
            idx = rng.randint(0, 2)
            principle = BasicBiologySolver.CELL_THEORY_PRINCIPLES[idx]
            all_opts = BasicBiologySolver.CELL_THEORY_PRINCIPLES.copy()
            wrong_pool = [
                "All cells have a cell wall made of chitin.",
                "Cells can spontaneously generate from non-living matter.",
                "Only animal cells are the basic unit of life.",
                "Cells are formed by division of the atmosphere.",
            ]
            opts = [principle] + rng.sample(wrong_pool, 3)
            rng.shuffle(opts)
            correct = opts.index(principle)
            return Question(
                id=f"s1_q_th_{rng.randint(1000,9999)}",
                section="Basic Biology",
                topic="Cell Theory",
                difficulty="Medium",
                competency="Remember",
                question_text="Which of the following is one of the three principles of cell theory?",
                options=opts,
                correct_index=correct,
                explanation=f"Cell theory principle: {principle}",
                bloom_level="Remember",
            )

    # ---------- Prokaryotic vs Eukaryotic (c9_bio_002) ----------
    PROKARYOTES = ["Bacteria", "Escherichia coli (E. coli)", "Blue-green algae (Cyanobacteria)", "Mycoplasma"]
    EUKARYOTES = ["Amoeba", "Onion plant cell", "Human cheek cell", "Yeast", "Mushroom", "Chlamydomonas"]

    @staticmethod
    def q_prok_vs_euk(rng: random.Random) -> Question:
        qtype = rng.choice(["classify", "feature", "compare"])
        if qtype == "classify":
            all_orgs = BasicBiologySolver.PROKARYOTES + BasicBiologySolver.EUKARYOTES
            org = rng.choice(all_orgs)
            is_prok = org in BasicBiologySolver.PROKARYOTES
            correct_text = "Prokaryotic" if is_prok else "Eukaryotic"
            opts = ["Prokaryotic", "Eukaryotic", "Both", "Neither"]
            correct = opts.index(correct_text)
            return Question(
                id=f"s1_q_pve_{rng.randint(1000,9999)}",
                section="Basic Biology",
                topic="Prokaryotic vs Eukaryotic",
                difficulty="Medium",
                competency="Understand",
                question_text=f"Classify the cell of '{org}' as prokaryotic or eukaryotic.",
                options=opts,
                correct_index=correct,
                explanation=f"{org} is a {correct_text.lower()} cell. "
                            + ("It lacks a true nucleus and membrane-bound organelles." if is_prok else "It has a true nucleus and membrane-bound organelles."),
                bloom_level="Understand",
            )
        elif qtype == "feature":
            features = [
                ("Has a true nucleus with nuclear membrane", "Eukaryotic", "only"),
                ("Has nucleoid region (no nuclear membrane)", "Prokaryotic", "only"),
                ("Contains mitochondria", "Eukaryotic", "only"),
                ("Has 70S ribosomes", "Prokaryotic", "only"),
                ("Has 80S ribosomes", "Eukaryotic", "only"),
                ("Contains plasmids (circular DNA)", "Prokaryotic", "only"),
                ("Cell wall made of peptidoglycan", "Prokaryotic", "only"),
                ("Cell wall made of cellulose (plants)", "Eukaryotic", "only"),
                ("Contains membrane-bound organelles", "Eukaryotic", "only"),
                ("Size generally 1-10 micrometres", "Prokaryotic", "only"),
                ("Size generally 10-100 micrometres", "Eukaryotic", "only"),
                ("Has linear DNA wrapped around histones", "Eukaryotic", "only"),
            ]
            feat, domain, _ = rng.choice(features)
            opts = ["Prokaryotic cells", "Eukaryotic cells", "Both", "Neither"]
            correct = opts.index(domain + " cells")
            return Question(
                id=f"s1_q_feat_{rng.randint(1000,9999)}",
                section="Basic Biology",
                topic="Prokaryotic vs Eukaryotic",
                difficulty="Medium",
                competency="Understand",
                question_text=f"Which type of cell is characterised by the following feature?\n{feat}",
                options=opts,
                correct_index=correct,
                explanation=f"{feat} → {domain} cells.",
                bloom_level="Understand",
            )
        else:  # compare
            comparisons = [
                ("Nuclear membrane", "Absent in prokaryotes, present in eukaryotes"),
                ("Membrane-bound organelles", "Absent in prokaryotes, present in eukaryotes"),
                ("Size", "Prokaryotes: 1-10 µm; Eukaryotes: 10-100 µm"),
                ("DNA shape", "Circular and naked (prokaryotes); Linear with histones (eukaryotes)"),
                ("Ribosome type", "70S (prokaryotes); 80S (eukaryotes)"),
                ("Cell wall material", "Peptidoglycan (prokaryotes); Cellulose in plants (eukaryotes)"),
            ]
            feature, answer = rng.choice(comparisons)
            wrong_opts = [
                "Same in both — no difference",
                "Reversed: eukaryotes lack what prokaryotes have",
                "Both use peptidoglycan cell walls",
                "Prokaryotes are always larger than eukaryotes",
            ]
            opts = [answer] + rng.sample(wrong_opts, 3)
            rng.shuffle(opts)
            correct = opts.index(answer)
            return Question(
                id=f"s1_q_cmp_{rng.randint(1000,9999)}",
                section="Basic Biology",
                topic="Prokaryotic vs Eukaryotic",
                difficulty="Medium",
                competency="Understand",
                question_text=f"How do prokaryotic and eukaryotic cells differ in terms of: {feature}?",
                options=opts,
                correct_index=correct,
                explanation=f"{feature}: {answer}.",
                bloom_level="Understand",
            )

    # ---------- Tissues (c9_bio_003-005) ----------
    PLANT_TISSUES = {
        "Meristematic tissue": ("Apical meristem — tip of root/shoot; Lateral meristem — cambium; Intercalary meristem — base of leaves", "Active cell division, growth"),
        "Permanent tissue — Simple": ("Parenchyma, Collenchyma, Sclerenchyma", "Parenchyma: photosynthesis, storage; Collenchyma: flexible support; Sclerenchyma: rigid support (dead cells, lignin)"),
        "Permanent tissue — Complex": ("Xylem, Phloem", "Xylem: water and mineral transport (dead at maturity); Phloem: food transport (living cells)"),
    }
    ANIMAL_TISSUES = {
        "Epithelial tissue": ("Covers body surfaces and organs", "Protection, secretion, absorption"),
        "Connective tissue": ("Blood, bone, cartilage, adipose, tendons, ligaments", "Support, binding, protection, transport"),
        "Muscular tissue": ("Skeletal, Smooth, Cardiac", "Movement — voluntary/involuntary"),
        "Nervous tissue": ("Neurons in brain, spinal cord, nerves", "Receives stimuli, conducts impulses"),
    }

    @staticmethod
    def q_tissues(rng: random.Random) -> Question:
        qtype = rng.choice(["plant_tissue", "animal_tissue", "xylem_phloem"])
        if qtype == "xylem_phloem":
            question = rng.choice([
                ("Which tissue transports water and minerals from roots to leaves?", "Xylem", "Xylem vessels are long dead tubes that carry water upward by transpiration pull."),
                ("Which tissue transports food (sugars) from leaves to other parts?", "Phloem", "Phloem sieve tubes are living cells that transport food bidirectionally."),
                ("Which is composed of dead cells at maturity?", "Xylem", "Xylem vessels and tracheids die after formation, leaving hollow tubes for water flow."),
                ("Which tissue is made of living cells?", "Phloem", "Phloem sieve tube elements are living (though they lack nuclei at maturity, companion cells are alive)."),
                ("Which tissue has lignin deposition for strength?", "Xylem", "Lignin in xylem cell walls provides rigidity and prevents collapse under tension."),
            ])
            qtext, correct_text, explanation = question
            opts = ["Xylem", "Phloem", "Both", "Neither"]
            correct = opts.index(correct_text)
        elif qtype == "plant_tissue":
            tissues = list(BasicBiologySolver.PLANT_TISSUES.keys())
            t = rng.choice(tissues)
            loc, func = BasicBiologySolver.PLANT_TISSUES[t]
            if rng.random() < 0.5:
                qtext = f"Where is '{t}' found in a plant?"
                wrong_opts = ["Root hairs only", "Leaves only", "Flowers only", "Stem bark only"]
                opts = [loc.split("—")[0].strip()] + rng.sample(wrong_opts, 3)
                rng.shuffle(opts)
                correct = opts.index(loc.split("—")[0].strip())
            else:
                qtext = f"What is the main function of '{t}'?"
                all_funcs = [v[1] for v in BasicBiologySolver.PLANT_TISSUES.values()]
                opts = [func] + rng.sample([f for f in all_funcs if f != func], 3)
                rng.shuffle(opts)
                correct = opts.index(func)
            explanation = f"{t}: {func}."
        else:
            tissues = list(BasicBiologySolver.ANIMAL_TISSUES.keys())
            t = rng.choice(tissues)
            loc, func = BasicBiologySolver.ANIMAL_TISSUES[t]
            if rng.random() < 0.5:
                qtext = f"Which animal tissue has the following description?\n'{loc}'"
                all_descs = [v[0] for v in BasicBiologySolver.ANIMAL_TISSUES.values()]
                opts = [loc] + rng.sample([d for d in all_descs if d != loc], 3)
                rng.shuffle(opts)
                correct = opts.index(loc)
            else:
                qtext = f"What is the primary function of '{t}'?"
                all_funcs = [v[1] for v in BasicBiologySolver.ANIMAL_TISSUES.values()]
                opts = [func] + rng.sample([f for f in all_funcs if f != func], 3)
                rng.shuffle(opts)
                correct = opts.index(func)
            explanation = f"{t}: {func}."
        return Question(
            id=f"s2_q_tis_{rng.randint(1000,9999)}",
            section="Tissues",
            topic=qtype,
            difficulty="Medium",
            competency="Understand",
            question_text=qtext,
            options=opts,
            correct_index=correct,
            explanation=explanation,
            bloom_level="Understand",
        )

    # ---------- Epidermis & Protection ----------
    @staticmethod
    def q_epidermis(rng: random.Random) -> Question:
        questions = [
            ("The epidermis in plants is usually:", "Single-layered", "Epidermis is a single layer of cells covering all parts of the plant."),
            ("The waxy waterproof layer on the epidermis is called:", "Cuticle", "Cuticle is made of cutin and prevents excessive water loss."),
            ("Epidermal cells in leaves often contain:", "Chloroplasts (in guard cells)", "Most epidermal cells lack chloroplasts except guard cells."),
            ("Guard cells surround each:", "Stoma (plural: stomata)", "Guard cells regulate gas exchange by opening and closing stomata."),
            ("Root hairs are extensions of:", "Epidermal cells", "Root hairs increase surface area for water and mineral absorption."),
        ]
        qtext, correct_text, explanation = rng.choice(questions)
        opts_pool = [
            "Single-layered", "Double-layered", "Triple-layered", "Multi-layered",
            "Cuticle", "Lignin", "Suberin", "Pectin",
            "Chloroplasts (in guard cells)", "No chloroplasts", "Many chloroplasts", "Chromoplasts",
            "Stoma (plural: stomata)", "Lenticel", "Hydathode", "Bark",
            "Epidermal cells", "Parenchyma cells", "Sclerenchyma cells", "Xylem cells",
        ]
        opts = [correct_text] + rng.sample([o for o in opts_pool if o != correct_text], 3)
        rng.shuffle(opts)
        correct = opts.index(correct_text)
        return Question(
            id=f"s2_q_epi_{rng.randint(1000,9999)}",
            section="Tissues",
            topic="Epidermis",
            difficulty="Medium",
            competency="Remember",
            question_text=qtext,
            options=opts,
            correct_index=correct,
            explanation=explanation,
            bloom_level="Remember",
        )


# ============================================================
#  SECTION 3  –  PLANTS: PHYSIOLOGY
# ============================================================

class PlantPhysiologySolver:

    # ---------- Photosynthesis (c9_bio_008) ----------
    PHOTOSYNTHESIS_EQ = "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂"

    @staticmethod
    def q_photosynthesis(rng: random.Random) -> Question:
        qtype = rng.choice(["equation", "site", "factor", "product", "stomata"])
        if qtype == "equation":
            question = rng.choice([
                ("What is the raw material taken in by plants for photosynthesis?", "Carbon dioxide", "CO₂ enters through stomata from the atmosphere."),
                ("What gas is released during photosynthesis?", "Oxygen", "O₂ is produced as a by-product and released through stomata."),
                ("What is the site of photosynthesis in plant cells?", "Chloroplasts", "Chloroplasts contain chlorophyll which captures light energy."),
                ("What is the green pigment that captures light energy?", "Chlorophyll", "Chlorophyll absorbs red and blue light, reflects green."),
                ("Photosynthesis primarily occurs in which part of the cell?", "Chloroplasts", "Chloroplasts are the organelles where photosynthesis takes place."),
                ("What sugar is produced during photosynthesis?", "Glucose", "Glucose is the primary carbohydrate produced."),
            ])
            qtext, correct_text, explanation = question
            opts_pool = ["Carbon dioxide", "Oxygen", "Chlorophyll", "Glucose", "Chloroplasts",
                         "Nitrogen", "Water vapour", "Hydrogen", "ATP"]
            opts = [correct_text] + rng.sample([o for o in opts_pool if o != correct_text], 3)
            rng.shuffle(opts)
            correct = opts.index(correct_text)
        elif qtype == "factor":
            factors = [
                ("What happens to the rate of photosynthesis if light intensity is increased (up to a point)?", "Increases", "More light = more energy for the light-dependent reactions."),
                ("What happens if CO₂ concentration is increased?", "Rate increases (up to a point)", "CO₂ is a raw material; more of it speeds up the Calvin cycle."),
                ("What is the effect of very high temperature on photosynthesis?", "Rate decreases / stops", "Enzymes denature above ~40-45°C."),
                ("Which colour of light is LEAST effective for photosynthesis?", "Green light", "Chlorophyll reflects green light; it is least absorbed."),
                ("What happens in the absence of light?", "Light-dependent reactions stop", "Without light, ATP and NADPH are not produced."),
            ]
            qtext, correct_text, explanation = rng.choice(factors)
            opts_pool = ["Increases", "Decreases", "No change", "First increases then decreases",
                         "Rate decreases / stops", "Rate doubles", "Rate unaffected", "Rate increases indefinitely"]
            opts = [correct_text] + rng.sample([o for o in opts_pool if o != correct_text], 3)
            rng.shuffle(opts)
            correct = opts.index(correct_text)
        elif qtype == "stomata":
            question = rng.choice([
                ("Stomata generally open during the day and close at night because of:", "Guard cells", "Guard cells become turgid in light, opening the stoma."),
                ("Guard cells contain which organelle that helps in opening stomata?", "Chloroplasts", "Chloroplasts in guard cells produce sugar in light, increasing turgor."),
                ("Excessive water loss through stomata causes:", "Wilting", "Loss of turgor pressure in cells leads to wilting."),
                ("The opening and closing of stomata is controlled by:", "Guard cells", "Turgor pressure changes in guard cells control the stoma aperture."),
                ("Transpiration occurs mainly through:", "Stomata", "Stomata account for ~90% of water loss in plants."),
            ])
            qtext, correct_text, explanation = question
            opts_pool = ["Guard cells", "Root hairs", "Xylem vessels", "Palisade cells",
                         "Chloroplasts", "Mitochondria", "Vacuoles", "Lysosomes",
                         "Wilting", "Photosynthesis", "Germination", "Pollination",
                         "Stomata", "Lenticels", "Hydathodes", "Bark"]
            opts = [correct_text] + rng.sample([o for o in opts_pool if o != correct_text], 3)
            rng.shuffle(opts)
            correct = opts.index(correct_text)
        else:  # product
            question = rng.choice([
                ("The by-product of photosynthesis released into the atmosphere is:", "Oxygen", "O₂ is released as a waste product of photosynthesis."),
                ("The main food product of photosynthesis is:", "Glucose", "Glucose can be stored as starch or used for respiration."),
            ])
            qtext, correct_text, explanation = question
            opts_pool = ["Oxygen", "Glucose", "Carbon dioxide", "Water", "Starch"]
            opts = [correct_text] + rng.sample([o for o in opts_pool if o != correct_text], 3)
            rng.shuffle(opts)
            correct = opts.index(correct_text)
        return Question(
            id=f"s3_q_ph_{rng.randint(1000,9999)}",
            section="Plants – Physiology",
            topic="Photosynthesis",
            difficulty="Medium",
            competency="Understand",
            question_text=qtext,
            options=opts,
            correct_index=correct,
            explanation=explanation,
            bloom_level="Understand",
        )

    # ---------- Transpiration (c9_bio_009) ----------

# -- solver contract --------------------------------------------
_SOLVERS = {"cell": BasicBiologySolver, "plant": PlantPhysiologySolver}

def solve(node_id: str = "", params: dict | None = None, **kw):
    """Run a c9 bio question builder; q_* methods take an rng."""
    params = params or {}
    rng = make_rng(params.get("seed", 42))
    topic = (params.get("topic") or "cell").lower()
    key = "plant" if ("plant" in topic or "transpir" in topic or "photosyn" in topic) else "cell"
    inst = _SOLVERS[key]()
    fn_name = params.get("fn") or next((m for m in dir(inst) if m.startswith("q_")), None)
    if not fn_name:
        return {"node_id": node_id, "error": "no question builders"}
    r = getattr(inst, fn_name)(rng)
    return r if isinstance(r, dict) else getattr(r, "__dict__", {"result": str(r)})

SOLVER_REGISTRY = {"c9_bio_basic": solve}
NODE_MAP = {n: "c9_bio_basic" for n in ("c9_bio_001", "c9_bio_002", "c9_bio_003", "c9_bio_008", "c9_bio_009")}
