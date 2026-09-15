"""
CLASS 8 BIOLOGY — TRANSPORT IN PLANTS
Solver for Nodes: c8_bio_001 | c8_bio_002 | c8_bio_003
Topics: Diffusion & Osmosis | Xylem & Phloem | Transpiration
"""

import random
from typing import Dict, List, Tuple, Optional

# ─────────────────────────────────────────────────────────
# ANSWERS / SOLUTIONS (canonical, seeded-verified)
# ─────────────────────────────────────────────────────────

# ── NODE 001: Diffusion and Osmosis ──────────────────────
MCQ_SOLUTIONS_001 = {
    "mcq_001_1": 0,   # C  (Perfume spreading)
    "mcq_001_2": 3,   # D  (Perishable food)
    "mcq_001_3": 1,   # B  (Semipermeable membrane)
    "mcq_001_4": 1,   # B  (Osmosis)
    "mcq_001_5": 0,   # A  (Raisins swell)
    "mcq_001_6": 3,   # D  (Shrink — hypertonic)
    "mcq_001_7": 2,   # C  (Against gradient + needs energy)
}

FIB_SOLUTIONS_001 = {
    "fib_001_1": "diffusion",
    "fib_001_2": "semipermeable membrane",
    "fib_001_3": "active transport",
    "fib_001_4": "concentration",
    "fib_001_5": "perishable",
}

TF_SOLUTIONS_001 = {
    "tf_001_1": True,    # Diffusion does not need a membrane
    "tf_001_2": True,    # Osmosis is a type of diffusion
    "tf_001_3": True,    # Active transport requires energy
    "tf_001_4": False,   # Osmosis moves against gradient — FALSE
    "tf_001_5": True,    # Raisins swell via osmosis
}

SA_SOLUTIONS_001 = {
    "sa_001_1": {
        "keywords": ["higher", "lower", "concentration", "molecules", "particles",
                     "no energy", "passive", "spontaneous"],
        "max_words": 50,
        "model_answer": ("Diffusion is the spontaneous movement of molecules "
                         "from a region of higher concentration to lower "
                         "concentration. It occurs naturally without any "
                         "external energy input."),
    },
    "sa_001_2": {
        "keywords": ["water", "semipermeable", "dilute", "concentrated",
                     "membrane", "solvent"],
        "max_words": 50,
        "model_answer": ("Osmosis is the movement of water molecules across "
                         "a semipermeable membrane from a dilute (low solute) "
                         "solution to a concentrated (high solute) solution."),
    },
}

LA_SOLUTIONS_001 = {
    "la_001_1": {
        "keywords": ["semipermeable", "water", "solute", "particles", "membrane",
                     "size", "pores", "selective", "allow"],
        "min_keywords": 5,
        "model_answer": (
            "A semipermeable membrane is a membrane with tiny pores that allows "
            "only certain molecules to pass through. In osmosis, it allows water "
            "molecules (small) to pass through but blocks larger solute particles "
            "(e.g., sugar, salt ions). This selective permeability ensures that "
            "only water moves across to balance concentrations, not the dissolved "
            "substances. The membrane acts like a sieve — small enough for water "
            "but not for sugar or salt molecules."
        ),
    },
    "la_001_2": {
        "keywords": ["energy", "active", "against", "gradient", "passive",
                     "osmosis", "diffusion", "ATP"],
        "min_keywords": 6,
        "model_answer": (
            "1. ENERGY: Active transport requires energy (ATP); osmosis is "
            "passive and needs no energy.\n"
            "2. DIRECTION: Active transport moves molecules AGAINST the "
            "concentration gradient (low → high); osmosis moves water ALONG "
            "the gradient (dilute → concentrated).\n"
            "3. MEMBRANE: Active transport uses carrier proteins; osmosis "
            "uses a semipermeable membrane.\n"
            "4. SPEED: Active transport is slower and saturable; osmosis is "
            "faster and depends on the concentration difference."
        ),
    },
}

# ── NODE 002: Xylem and Phloem ───────────────────────────
MCQ_SOLUTIONS_002 = {
    "mcq_002_1": 3,   # D  (Hollow, dead cells stacked end-to-end)
    "mcq_002_2": 0,   # A  (Water and minerals — roots to leaves)
    "mcq_002_3": 0,   # A  (Sieve tubes)
    "mcq_002_4": 3,   # D  (Bidirectional)
    "mcq_002_5": 2,   # C  (Tracheids and vessels)
    "mcq_002_6": 1,   # B  (Sucrose / prepared food — leaves to all parts)
    "mcq_002_7": 2,   # C  (Lignin — hard, woody walls)
}

FIB_SOLUTIONS_002 = {
    "fib_002_1": "xylem",
    "fib_002_2": "sieve",
    "fib_002_3": "companion",
    "fib_002_4": "sucrose",
    "fib_002_5": "lignin",
    "fib_002_6": "upward",
    "fib_002_7": "bidirectional",
}

TF_SOLUTIONS_002 = {
    "tf_002_1": True,    # Xylem cells are dead at maturity
    "tf_002_2": True,    # Phloem transports food bidirectionally
    "tf_002_3": True,    # Sieve plates are in phloem
    "tf_002_4": False,   # Xylem moves bidirectionally — FALSE
    "tf_002_5": True,    # Xylem has lignified walls
    "tf_002_6": True,    # Xylem transports water and minerals
}

SA_SOLUTIONS_002 = {
    "sa_002_1": {
        "keywords": ["hollow", "dead", "lignin", "tracheids", "vessels",
                     "stacked", "tubes", "walls", "rigid"],
        "max_words": 50,
        "model_answer": (
            "Xylem is made of hollow, dead cells (tracheids and vessels) "
            "with thick lignified walls, stacked end-to-end like pipes. "
            "Being dead and hollow, they form continuous tubes that can "
            "carry water efficiently from roots to leaves."
        ),
    },
    "sa_002_2": {
        "keywords": ["sieve", "companion", "cells", "living", "food",
                     "sucrose", "leaves", "parts"],
        "max_words": 50,
        "model_answer": (
            "Phloem consists of living sieve tubes with sieve plates "
            "(perforated end walls) and companion cells. Sieve plates "
            "allow cytoplasmic connection between cells. Companion cells "
            "support the sieve tubes. Together they transport prepared "
            "food (sucrose) from leaves to all parts of the plant."
        ),
    },
}

LA_SOLUTIONS_002 = {
    "la_002_1": {
        "keywords": ["direction", "food", "sucrose", "xylem", "phloem",
                     "roots", "leaves", "bidirectional", "unidirectional",
                     "upward"],
        "min_keywords": 6,
        "model_answer": (
            "Xylem transports WATER and MINERALS only from ROOTS → LEAVES "
            "(upward, unidirectional). Phloem transports PREPARED FOOD "
            "(sucrose) from LEAVES → ALL PARTS of the plant (bidirectional "
            "— upward to growing shoots, downward to roots and storage organs). "
            "The key difference: xylem flow is always upward and one-way; "
            "phloem flow can go in any direction depending on where food "
            "is needed."
        ),
    },
    "la_002_2": {
        "keywords": ["dead", "hollow", "lignin", "thick", "walls",
                     "tracheids", "vessels", "living", "sieve", "companion"],
        "min_keywords": 7,
        "model_answer": (
            "Xylem cells (tracheids and vessels) are DEAD at maturity, have "
            "HOLLOW lumens, and THICK LIGNIFIED (woody) walls. This makes them "
            "rigid pipe-like structures ideal for pulling water upward by "
            "transpiration force and root pressure.\n\n"
            "Phloem cells (sieve tubes) are LIVING, have soft CELLULOSE walls, "
            "and contain SIEVE PLATES (perforated end walls). COMPANION CELLS "
            "are closely associated with each sieve tube. This living structure "
            "allows active loading and unloading of food in either direction."
        ),
    },
}

# ── NODE 003: Transpiration ──────────────────────────────
MCQ_SOLUTIONS_003 = {
    "mcq_003_1": 2,   # C  (Loss of water as vapour from leaves)
    "mcq_003_2": 2,   # C  (Stomata)
    "mcq_003_3": 0,   # A  (Turgid)
    "mcq_003_4": 1,   # B  (Cools the leaf)
    "mcq_003_5": 3,   # D  (Guttation)
    "mcq_003_6": 2,   # C  (Transpiration)
    "mcq_003_7": 0,   # A  (Stoma)
}

FIB_SOLUTIONS_003 = {
    "fib_003_1": "stomata",
    "fib_003_2": "turgid",
    "fib_003_3": "guard",
    "fib_003_4": "transpiration",
    "fib_003_5": "guttation",
    "fib_003_6": "water",
    "fib_003_7": "cooling",
}

TF_SOLUTIONS_003 = {
    "tf_003_1": True,    # Most water is lost through stomata
    "tf_003_2": True,    # Stomata are mainly on the underside of leaves
    "tf_003_3": True,    # Guard cells control stomatal opening
    "tf_003_4": False,   # Flaccid guard cells open stomata — FALSE
    "tf_003_5": True,    # Transpiration creates the transpiration pull
    "tf_003_6": True,    # Transpiration cools the leaf
    "tf_003_7": False,   # Guttation occurs through stomata — FALSE
}

SA_SOLUTIONS_003 = {
    "sa_003_1": {
        "keywords": ["water", "vapour", "leaves", "stomata", "loss",
                     "plant", "air"],
        "max_words": 50,
        "model_answer": (
            "Transpiration is the process by which plants lose excess water "
            "as water vapour through tiny pores called stomata on the surface "
            "of leaves. About 90% of water absorbed by roots is lost this way."
        ),
    },
    "sa_003_2": {
        "keywords": ["turgid", "flaccid", "guard", "stomata", "open",
                     "close", "water"],
        "max_words": 50,
        "model_answer": (
            "When guard cells take in water and become TURGID (swollen), "
            "the stomata opens. When they lose water and become FLACCID "
            "(limp), the stomata closes. The inner wall of guard cells is "
            "thicker, so swelling forces the pore open."
        ),
    },
}

LA_SOLUTIONS_003 = {
    "la_003_1": {
        "keywords": ["stomata", "vapour", "guttation", "hydathodes", "liquid",
                     "transpiration", "water", "droplets", "leaf"],
        "min_keywords": 6,
        "model_answer": (
            "TRANSPIRATION: Loss of water as INVISIBLE WATER VAPOUR mainly "
            "through STOMATA on the leaf surface. It occurs during the day "
            "when stomata are open. It cools the leaf and creates "
            "transpiration pull.\n\n"
            "GUTTATION: Loss of water as VISIBLE LIQUID DROPLETS through "
            "HYDATHODES (special pores at leaf edges). It mainly occurs at "
            "night when stomata are closed and root pressure is high.\n\n"
            "KEY DIFFERENCE: Transpiration = vapour through stomata (daytime); "
            "Guttation = liquid droplets through hydathodes (nighttime)."
        ),
    },
    "la_003_2": {
        "keywords": ["cooling", "transpiration", "pull", "minerals",
                     "water", "evaporation", "heat", "leaves", "energy"],
        "min_keywords": 6,
        "model_answer": (
            "1. COOLING: Evaporation of water from leaf surfaces absorbs heat "
            "energy, lowering leaf temperature and preventing overheating in "
            "hot sunlight — like sweating in humans.\n"
            "2. TRANSPIRATION PULL: Water evaporating from leaves creates a "
            "suction force (transpiration pull) that pulls more water upward "
            "through xylem from roots — the main driver of water transport.\n"
            "3. MINERAL TRANSPORT: The upward flow of water carries dissolved "
            "minerals from soil to all parts of the plant."
        ),
    },
}

# ─────────────────────────────────────────────────────────
# MASTERY ASSESSMENT
# ─────────────────────────────────────────────────────────

NODE_MASTERY_CRITERIA: Dict[str, Dict] = {
    "c8_bio_001": {
        "title": "Diffusion and Osmosis",
        "criteria": [
            "Define diffusion in own words",
            "Define osmosis in own words",
            "Explain the role of the semipermeable membrane",
            "Distinguish osmosis from active transport",
            "Explain hypertonic, hypotonic, isotonic effects on cells",
        ],
    },
    "c8_bio_002": {
        "title": "Xylem and Phloem Transport",
        "criteria": [
            "Describe xylem structure (tracheids, vessels, lignified walls)",
            "Describe phloem structure (sieve tubes, companion cells)",
            "Explain direction of transport in xylem (unidirectional)",
            "Explain direction of transport in phloem (bidirectional)",
            "Compare xylem and phloem (at least 3 differences)",
        ],
    },
    "c8_bio_003": {
        "title": "Transpiration",
        "criteria": [
            "Define transpiration",
            "Identify the structure (stomata) where it occurs",
            "Explain the role of guard cells in opening/closing",
            "Distinguish transpiration from guttation",
            "Explain at least two significance of transpiration",
        ],
    },
}

ALL_SOLUTIONS = {
    "c8_bio_001": {
        "mcq": MCQ_SOLUTIONS_001,
        "fib": FIB_SOLUTIONS_001,
        "tf":  TF_SOLUTIONS_001,
        "sa":  SA_SOLUTIONS_001,
        "la":  LA_SOLUTIONS_001,
    },
    "c8_bio_002": {
        "mcq": MCQ_SOLUTIONS_002,
        "fib": FIB_SOLUTIONS_002,
        "tf":  TF_SOLUTIONS_002,
        "sa":  SA_SOLUTIONS_002,
        "la":  LA_SOLUTIONS_002,
    },
    "c8_bio_003": {
        "mcq": MCQ_SOLUTIONS_003,
        "fib": FIB_SOLUTIONS_003,
        "tf":  TF_SOLUTIONS_003,
        "sa":  SA_SOLUTIONS_003,
        "la":  LA_SOLUTIONS_003,
    },
}


# ─────────────────────────────────────────────────────────
# CORE SOLVER FUNCTIONS
# ─────────────────────────────────────────────────────────

def verify_answer(node_id: str, q_type: str, q_id: str,
                  user_answer: str) -> Dict:
    """
    Verify a single user answer against the canonical solution.

    Parameters
    ----------
    node_id   : e.g. "c8_bio_001"
    q_type    : "mcq" | "fib" | "tf" | "sa" | "la"
    q_id      : e.g. "mcq_001_1"
    user_answer: raw string from the learner

    Returns
    -------
    {
        "correct"      : bool,
        "expected"     : str,
        "explanation"  : str (step-by-step reasoning)
    }
    """
    node_solutions = ALL_SOLUTIONS.get(node_id, {})
    type_solutions = node_solutions.get(q_type, {})
    expected = type_solutions.get(q_id)

    if expected is None:
        return {
            "correct": False,
            "expected": "N/A",
            "explanation": f"No solution entry found for {q_id} in {node_id}.",
        }

    if q_type == "mcq":
        return _verify_mcq(user_answer, expected, node_id, q_id)
    if q_type == "fib":
        return _verify_fib(user_answer, expected)
    if q_type == "tf":
        return _verify_tf(user_answer, expected)
    if q_type in ("sa", "la"):
        return _verify_text(user_answer, expected, q_type)
    return {"correct": False, "expected": str(expected),
            "explanation": "Unknown question type."}


def _verify_mcq(user_ans: str, expected: int, node_id: str, q_id: str) -> Dict:
    labels = ["A", "B", "C", "D"]
    try:
        idx = int(user_answ := user_ans.strip().upper()
                  .replace("OPTION ", "").replace("(", "").replace(")", "")
                  .replace("A.", "A").replace("B.", "B")
                  .replace("C.", "C").replace("D.", "D"))[0]
        choice_idx = labels.index(idx)
    except (ValueError, IndexError):
        try:
            choice_idx = int(user_ans.strip())
            if choice_idx not in range(4):
                raise ValueError
        except ValueError:
            return {
                "correct": False,
                "expected": labels[expected],
                "explanation": (f"Invalid format '{user_ans}'. "
                                f"Enter A, B, C, or D."),
            }

    correct = (choice_idx == expected)
    letter  = labels[expected]
    reason  = _get_mcq_explanation(node_id, q_id)
    return {
        "correct":      correct,
        "expected":     letter,
        "explanation":  reason,
    }


def _verify_fib(user_ans: str, expected: str) -> Dict:
    cleaned   = user_ans.strip().lower()
    expected_l = expected.lower()
    # accept close variants
    variants = {
        "semipermeable membrane": ["semi permeable membrane",
                                    "semi-permeable membrane",
                                    "partially permeable membrane"],
        "active transport":      [],
    }
    correct = (cleaned == expected_l or cleaned in variants.get(expected_l, []))
    return {
        "correct":     correct,
        "expected":    expected,
        "explanation": (f"Correct! '{expected}' is the right answer."
                        if correct else
                        f"The correct answer is '{expected}'. "
                        f"You wrote: '{user_ans.strip()}'."),
    }


def _verify_tf(user_ans: str, expected: bool) -> Dict:
    val = user_ans.strip().lower()
    mapping = {"true": True, "false": False,
               "t": True, "f": False,
               "yes": True, "no": False}
    if val not in mapping:
        return {
            "correct": False,
            "expected": "True" if expected else "False",
            "explanation": "Please answer True or False.",
        }
    correct = (mapping[val] == expected)
    return {
        "correct":     correct,
        "expected":    "True" if expected else "False",
        "explanation": ("That's correct!" if correct else
                        f"The correct answer is "
                        f"{'True' if expected else 'False'}."),
    }


def _verify_text(user_ans: str, expected: Dict, q_type: str) -> Dict:
    label = "Short" if q_type == "sa" else "Long"
    user_lower = user_ans.lower()
    keywords_found = [kw for kw in expected["keywords"]
                      if kw.lower() in user_lower]
    n = len(keywords_found)
    required = expected.get("min_keywords", len(expected["keywords"]) // 2)
    correct  = n >= required

    missing = [kw for kw in expected["keywords"]
               if kw.lower() not in user_lower]

    explanation = (
        f"✓ Correct! Found {n} key concept(s): "
        f"{', '.join(keywords_found)}."
    ) if correct else (
        f"Needs improvement. Key concept(s) missing: {', '.join(missing)}. "
        f"Found: {', '.join(keywords_found)}."
    )
    return {
        "correct":     correct,
        "expected":    expected["model_answer"],
        "explanation": explanation,
        "keywords_found": keywords_found,
    }


def _get_mcq_explanation(node_id: str, q_id: str) -> str:
    """Return step-by-step reasoning for MCQ."""
    E = {
        "c8_bio_001": {
            "mcq_001_1": (
                "STEP 1: Identify the process — perfume smell spreading "
                "through air.\n"
                "STEP 2: Diffusion = molecules move from HIGH concentration "
                "(near source) to LOW concentration (far away).\n"
                "STEP 3: No membrane is needed; no energy is used.\n"
                "→ Answer: C (Diffusion) ✓"
            ),
            "mcq_001_2": (
                "STEP 1: Active transport requires energy (ATP) to move "
                "molecules.\n"
                "STEP 2: Living cells use this to accumulate nutrients "
                "against their concentration gradient.\n"
                "STEP 3: Dead or dormant organisms (perishable food like "
                "dried fruits) cannot do this.\n"
                "→ Answer: D (Perishable food) ✓"
            ),
            "mcq_001_3": (
                "STEP 1: Osmosis is specifically water moving across a "
                "barrier.\n"
                "STEP 2: The barrier must be semipermeable — allows water "
                "but blocks solute particles.\n"
                "STEP 3: This selective nature is what creates osmotic "
                "pressure.\n"
                "→ Answer: B (Semipermeable membrane) ✓"
            ),
            "mcq_001_4": (
                "STEP 1: Active transport moves AGAINST the gradient "
                "(low→high) and NEEDS energy.\n"
                "STEP 2: Osmosis is PASSIVE — water moves from dilute to "
                "concentrated naturally.\n"
                "STEP 3: Sugar solution absorbing water through membrane "
                "= osmosis.\n"
                "→ Answer: B (Osmosis) ✓"
            ),
            "mcq_001_5": (
                "STEP 1: Raisins are dried grapes — inside is a concentrated "
                "(hypertonic) sugar solution.\n"
                "STEP 2: Pure water outside is dilute (hypotonic).\n"
                "STEP 3: Osmosis draws water INTO the raisin → it swells.\n"
                "→ Answer: A (Raisins swell) ✓"
            ),
            "mcq_001_6": (
                "STEP 1: Slice in salt water is placed in a HYPERTONIC "
                "solution (high salt outside).\n"
                "STEP 2: Water moves OUT of vegetable cells by osmosis "
                "(from dilute inside to concentrated outside).\n"
                "STEP 3: Cells lose water → shrink (plasmolysis).\n"
                "→ Answer: D (Shrink in size) ✓"
            ),
            "mcq_001_7": (
                "STEP 1: Identify the defining features: 'against gradient' "
                "+ 'needs energy'.\n"
                "STEP 2: Diffusion and osmosis are PASSIVE — no energy.\n"
                "STEP 3: Active transport moves substances AGAINST "
                "concentration and USES energy (carrier proteins + ATP).\n"
                "→ Answer: D (Active transport) ✓"
            ),
        },
        "c8_bio_002": {
            "mcq_002_1": (
                "STEP 1: Xylem must be a continuous tube to pull water upward.\n"
                "STEP 2: Cells are DEAD at maturity → no cytoplasm to block "
                "flow.\n"
                "STEP 3: They are HOLLOW and LIGNIFIED → strong open pipes.\n"
                "→ Answer: D (Hollow, dead cells stacked end-to-end) ✓"
            ),
            "mcq_002_2": (
                "STEP 1: Xylem = the water-conducting tissue of plants.\n"
                "STEP 2: It transports WATER and DISSOLVED MINERALS from "
                "roots to leaves.\n"
                "STEP 3: Flow is always UPWARD (roots → stem → leaves).\n"
                "→ Answer: A (Water and minerals — roots to leaves) ✓"
            ),
            "mcq_002_3": (
                "STEP 1: Phloem carries prepared food (sucrose).\n"
                "STEP 2: Its conducting cells are SIEVE TUBES (named for "
                "sieve-like end plates).\n"
                "STEP 3: Companion cells support each sieve tube.\n"
                "→ Answer: A (Sieve tubes) ✓"
            ),
            "mcq_002_4": (
                "STEP 1: Phloem translocates food FROM leaves (source) TO "
                "storage organs or growing tips (sink).\n"
                "STEP 2: A growing root tip (sink) may be BELOW the leaves "
                "while a fruit (sink) may be ABOVE.\n"
                "STEP 3: Phloem flow can go UP or DOWN as needed — "
                "BIDIRECTIONAL.\n"
                "→ Answer: D (Bidirectional) ✓"
            ),
            "mcq_002_5": (
                "STEP 1: Xylem consists of two cell types: TRACHEIDS "
                "(long, tapered) and VESSELS (short, wide, with perforation "
                "plates).\n"
                "STEP 2: Both have thick LIGNIFIED walls for strength.\n"
                "→ Answer: C (Tracheids and vessels) ✓"
            ),
            "mcq_002_6": (
                "STEP 1: Phloem moves PREPARED FOOD made in leaves "
                "(by photosynthesis) = sucrose/glucose.\n"
                "STEP 2: This food goes from LEAVES (source) to ALL PARTS "
                "that need it — roots, fruits, buds (sinks).\n"
                "→ Answer: B (Sucrose — leaves to all parts) ✓"
            ),
            "mcq_002_7": (
                "STEP 1: Xylem must resist collapse under negative pressure "
                "(transpiration pull).\n"
                "STEP 2: LIGNIN is a hard, woody polymer deposited in xylem "
                "cell walls — gives rigidity and prevents collapse.\n"
                "→ Answer: C (Lignin) ✓"
            ),
        },
        "c8_bio_003": {
            "mcq_003_1": (
                "STEP 1: Transpiration specifically means water leaving "
                "the plant as VAPOUR.\n"
                "STEP 2: It occurs mainly through STOMATA on leaves "
                "(~90% of water loss).\n"
                "STEP 3: Liquid water loss = guttation (different process).\n"
                "→ Answer: C (Loss of water as vapour from leaves) ✓"
            ),
            "mcq_003_2": (
                "STEP 1: Stomata (singular: stoma) are the primary pores "
                "for transpiration.\n"
                "STEP 2: Lenticels are on stems; cuticle is a waxy layer; "
                "hydathodes cause guttation.\n"
                "→ Answer: C (Stomata) ✓"
            ),
            "mcq_003_3": (
                "STEP 1: Guard cells regulate stomatal aperture.\n"
                "STEP 2: When guard cells take up water → become TURGID "
                "(swollen) → stomata OPENS.\n"
                "STEP 3: When guard cells lose water → become FLACCID "
                "(limp) → stomata CLOSES.\n"
                "→ Answer: A (Turgid) ✓"
            ),
            "mcq_003_4": (
                "STEP 1: Evaporation of water absorbs latent heat.\n"
                "STEP 2: This cools leaf cells — like sweating cools skin.\n"
                "STEP 3: This prevents overheating in hot sunlight.\n"
                "→ Answer: B (Cools the leaf) ✓"
            ),
            "mcq_003_5": (
                "STEP 1: Guttation = water lost as LIQUID DROPLETS.\n"
                "STEP 2: Occurs through HYDATHODES at leaf edges.\n"
                "STEP 3: Mainly at NIGHT when stomata are closed but root "
                "pressure pushes water out.\n"
                "→ Answer: D (Guttation) ✓"
            ),
            "mcq_003_6": (
                "STEP 1: Transpiration pull = suction force created by "
                "evaporation from leaves.\n"
                "STEP 2: This pulls water (with dissolved minerals) "
                "upward through xylem — the tallest trees rely on it.\n"
                "→ Answer: C (Transpiration) ✓"
            ),
            "mcq_003_7": (
                "STEP 1: The pore/structure that opens and closes to "
                "control transpiration is the STOMA (plural: stomata).\n"
                "STEP 2: Guard cells control each stoma but the structure "
                "itself is the stoma.\n"
                "→ Answer: A (Stoma) ✓"
            ),
        },
    }
    return E.get(node_id, {}).get(q_id, "Check your textbook explanation.")


# ─────────────────────────────────────────────────────────
# BATCH VERIFY (auto-imported from questions module)
# ─────────────────────────────────────────────────────────

def batch_verify(node_id: str, answers: Dict[str, str]) -> Dict:
    """
    Verify multiple answers at once for a full quiz.

    Parameters
    ----------
    node_id : e.g. "c8_bio_001"
    answers : { "mcq_001_1": "A", "fib_001_1": "diffusion", ... }

    Returns
    -------
    {
        "results"    : { q_id: {correct, expected, explanation} },
        "score"      : {"correct": int, "total": int, "pct": float},
        "mastery"    : str  # "Excellent" | "Good" | "Fair" | "Needs Practice"
    }
    """
    from bio.class8_bio_questions import get_answer_key
    answer_key = get_answer_key(node_id)

    results = {}
    correct_count = 0
    total         = 0

    for q_id, user_ans in answers.items():
        if q_id not in answer_key:
            continue
        q_type = q_id.split("_")[0]   # "mcq", "fib", etc.
        result = verify_answer(node_id, q_type, q_id, str(user_ans))
        results[q_id] = result
        total += 1
        if result["correct"]:
            correct_count += 1

    pct = round(100 * correct_count / total, 1) if total else 0.0

    if pct >= 90:
        mastery = "🌟 Excellent"
    elif pct >= 75:
        mastery = "👍 Good"
    elif pct >= 50:
        mastery = "📖 Fair — revise the weak topics"
    else:
        mastery = "📚 Needs Practice — review the chapter again"

    return {
        "results":  results,
        "score":    {"correct": correct_count, "total": total,
                     "pct": pct},
        "mastery":  mastery,
    }


def get_mastery_criteria(node_id: str) -> Dict:
    """Return mastery criteria for a node."""
    return NODE_MASTERY_CRITERIA.get(node_id, {})