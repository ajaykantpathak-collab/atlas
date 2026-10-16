"""corpus.py — REAL paths and REAL questions for the load mix.

Everything here was sampled from the shipped corpus on 2026-10-02:

* NODE_IDS        — filenames under deploy/content/enhanced_nodes_md/
                    (CBSE classes 6-12, all subjects), used to build the
                    /api/content GET paths a student's learn page hits.
* QUESTIONS       — 20 verbatim questions from deploy/content/compq_bank.jsonl
                    (the CBQ competency-question bank), tagged by flavour:
                    numeric (solver maths/physics), bank (English/history
                    items that should hit the authored bank), prose
                    (open-ended assessment-style items).
* DOODLE_ASSETS   — real files under frontend/public/doodle_cards/ that the
                    learn page loads (served by the frontend via nginx).

If the corpus shifts, regenerate this file — the point is that the load
traffic exercises real node ids, not invented ones.
"""

from __future__ import annotations

import random
from typing import Dict, List

# --------------------------------------------------------------------------- #
# Real node ids (deploy/content/enhanced_nodes_md/*.md, one per subject spread)
# --------------------------------------------------------------------------- #
NODE_IDS: List[str] = [
    "c6_biology_ch04_001",
    "c6_chemistry_ch04_008",
    "c6_civics_ch11_013",
    "c6_economics_ch11_005",
    "c6_english_u3_022",
    "c6_geography_ch04_022",
    "c6_history_ch06_017",
    "c7_math_ch02_009",
    "c7_physics_ch05_003",
    "c8_physics_ch6_12",
    "c9_civ_ch3_1",
    "c9_hist_ch2_9",
    "c9_engl_ch3_9",
    "c10_bio_cbse_01_001",
    "c10_chem_cbse_05_002",
    "c10_civ_cbse_01_007",
    "c10_gram_cbse_94_001",
    "c11_bio_cbse_09_001",
    "c11_chem_cbse_04_011",
    "c11_cs_cbse_02_001",
    "c11_eco_cbse_07_002",
    "c11_geo_cbse_11_006",
    "c11_hs_cbse_02_011",
    "c11_math_cbse_14_006",
    "c11_psy_cbse_06_004",
    "c12_acc_cbse_07_004",
    "c12_cs_cbse_12_010",
    "c12_eco_cbse_11_001",
    "c12_hist_cbse_04_011",
    "c12_phy_cbse_11_006",
]

# --------------------------------------------------------------------------- #
# 20 real questions (deploy/content/compq_bank.jsonl, verbatim `q` fields).
# flavour: "numeric" (deterministic maths/physics compute),
#          "bank"    (English/history items with an authored bank hit),
#          "prose"   (open-ended, expected to come back guided).
# node_id = the bank row's parent_node (rides along as solve node binding).
# --------------------------------------------------------------------------- #
QUESTIONS: List[Dict[str, str]] = [
    # ---- numeric (7) ------------------------------------------------------- #
    {
        "id": "q01",
        "flavour": "numeric",
        "node_id": "c12_math_cbse_08_002",
        "text": "Determine the net work done (in joules) from x = 0 m to x = 5 m.",
    },
    {
        "id": "q02",
        "flavour": "numeric",
        "node_id": "c12_math_cbse_08_004",
        "text": "Determine which curve (parabola or line) is right-most (greater x) in the interval [-1,3].",
    },
    {
        "id": "q03",
        "flavour": "numeric",
        "node_id": "c12_math_cbse_13_001",
        "text": "Assuming the sample composition does not change, what is the probability of obtaining two consecutive clicks?",
    },
    {
        "id": "q04",
        "flavour": "numeric",
        "node_id": "c12_phy_cbse_02_010",
        "text": "The capacitor is first charged to 5 V with pure water, then disconnected and the glucose concentration is raised to 0.05 M. Find the change in stored energy.",
    },
    {
        "id": "q05",
        "flavour": "numeric",
        "node_id": "c12_phy_cbse_02_011",
        "text": "Determine how many identical series strings (each of four capacitors) must be connected in parallel to meet the energy requirement of >=150 J at 2000 V charging voltage.",
    },
    {
        "id": "q06",
        "flavour": "numeric",
        "node_id": "c12_phy_cbse_14_002",
        "text": "Using <N_A>, compute the conductivity sigma_base of the base region.",
    },
    {
        "id": "q07",
        "flavour": "numeric",
        "node_id": "c12_math_cbse_02_005",
        "text": "The drug-release rate constant is k = kappa*I with kappa=2.0e-3 s^-1(W.cm^-2)^-1. Using the intensity from Part C, compute the time required for 90% of the drug to be released (first-order decay).",
    },
    # ---- bank-hit English/history (9) -------------------------------------- #
    {
        "id": "q08",
        "flavour": "bank",
        "node_id": "c12_eng_f_cbse_03_006",
        "text": "A participant's testimonial reads: \"After the first week, I felt the curtain of life lift as I kicked across the pond.\" Analyze the metaphor \"curtain of life lift\" and its thematic relevance.",
    },
    {
        "id": "q09",
        "flavour": "bank",
        "node_id": "c12_eng_f_cbse_09_005",
        "text": "Synthesize: If the documentary were to insert a voice-over from a gerontologist explaining \"aging anxiety\" (psychological concept), how would that alter the interpretation of the poem's final lines?",
    },
    {
        "id": "q10",
        "flavour": "bank",
        "node_id": "c12_eng_k_cbse_08_011",
        "text": "Explain how the anaphoric repetition \"O Sisters, hear... O Sisters, feel...\" strengthens the speech's persuasive appeal, linking to Blake's repetitive structures.",
    },
    {
        "id": "q11",
        "flavour": "bank",
        "node_id": "c12_eng_k_cbse_01_012",
        "text": "Infer why the protagonist continues to sell dreams even after acknowledging their falsity.",
    },
    {
        "id": "q12",
        "flavour": "bank",
        "node_id": "c12_hist_cbse_10_003",
        "text": "If the rebels had managed to secure recognition from one major European power, how would that have affected their claim to legitimacy under the Montevideo criteria?",
    },
    {
        "id": "q13",
        "flavour": "bank",
        "node_id": "c12_hist_cbse_10_003",
        "text": "Which geographical feature made Delhi a natural hub for rebel coordination in May 1857?",
    },
    {
        "id": "q14",
        "flavour": "bank",
        "node_id": "c12_hist_cbse_03_002",
        "text": "A manuscript shows high frequency of prescriptive passages, low Vedic Sanskrit, and is inscribed in early Devanagari with a patronage label claiming \"Kshatriya rule\". Which varna's ideological influence is most directly reflected in the textual layer?",
    },
    {
        "id": "q15",
        "flavour": "bank",
        "node_id": "c12_hist_cbse_07_011",
        "text": "If the Portuguese had supplied Bijapur with 500 additional war-horses in late 1564, estimate the change in Bijapur's cavalry strength relative to Vijayanagara's, given Vijayanagara maintained 3,000 cavalry horses and Bijapur originally had 2,000. Express the new ratio (Bijapur: Vijayanagara).",
    },
    {
        "id": "q16",
        "flavour": "bank",
        "node_id": "c12_eng_f_cbse_01_009",
        "text": "Identify the type of irony present in the scenario where the regional government mandates German instruction to promote unity, yet this results in the suppression of French language and culture. Explain your choice.",
    },
    # ---- prose (4) ---------------------------------------------------------- #
    {
        "id": "q17",
        "flavour": "prose",
        "node_id": "c12_eng_k_cbse_03_013",
        "text": "Compare how the theme of burdensome tradition in \"A Wedding in Brownsville\" (where communal duties destroy personal peace) reflects the historical reality of Jewish immigrants in post-WWII America grappling with assimilation pressures versus Holocaust memorialization obligations, using specific textual evidence from the story.",
    },
    {
        "id": "q18",
        "flavour": "prose",
        "node_id": "c12_hist_cbse_12_003",
        "text": "Assess whether the Ordinance's mandate for digital health-data sharing without explicit consent violates the Objectives Resolution's guarantee of \"freedom of thought, expression, belief, faith, worship, vocation, association, and action\". Frame your answer in terms of the right to privacy.",
    },
    {
        "id": "q19",
        "flavour": "prose",
        "node_id": "c12_eng_f_cbse_02_010",
        "text": "Explain how the historical zamindari system's land-revenue policies created a legacy of vulnerability that, when combined with contemporary climate change, pushes Sundarbans families into hazardous urban labor. Propose a GIS-based strategy to disrupt this cycle.",
    },
    {
        "id": "q20",
        "flavour": "prose",
        "node_id": "c12_eng_k_cbse_21_011",
        "text": "Using concepts of cognitive load and geographical mobility, evaluate how the frequency of elliptical fragments in tech-park Slack correlates with migrants' length of stay and perceived ease of communication.",
    },
]

# --------------------------------------------------------------------------- #
# Real page assets: frontend/public/doodle_cards/class{N}/{node_id}.webp
# (verified present on 2026-10-02; the learn page fetches these + the map).
# --------------------------------------------------------------------------- #
DOODLE_HOME_MAP = "/doodle_cards/doodle_home_map.json"

# (class folder, node id) pairs where the .webp is known to exist.
DOODLE_ASSETS: List[Dict[str, str]] = [
    {"cls": "class10", "node_id": "c10_bio_cbse_01_001"},
    {"cls": "class10", "node_id": "c10_bio_cbse_01_002"},
    {"cls": "class10", "node_id": "c10_chem_cbse_05_002"},
    {"cls": "class11", "node_id": "c11_bio_cbse_09_001"},
    {"cls": "class11", "node_id": "c11_chem_cbse_04_011"},
    {"cls": "class12", "node_id": "c12_phy_cbse_11_006"},
    {"cls": "class12", "node_id": "c12_hist_cbse_04_011"},
]


def doodle_asset_path(rng: random.Random) -> str:
    """One real webp URL the learn page would load."""
    a = rng.choice(DOODLE_ASSETS)
    return f"/doodle_cards/{a['cls']}/{a['node_id']}.webp"


def random_node_id(rng: random.Random) -> str:
    return rng.choice(NODE_IDS)


def random_question(rng: random.Random) -> Dict[str, str]:
    return rng.choice(QUESTIONS)
