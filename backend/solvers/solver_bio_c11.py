"""
solver_bio_c11.py — CBSE Class 11 Biology solver functions.

Each solver takes variables and returns a SolverResult with answer and steps.
Steps have: description, formula, substitution, result.
"""
from __future__ import annotations
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional


@dataclass
class Step:
    description: str = ""
    formula: str = ""
    substitution: str = ""
    result: str = ""


@dataclass
class SolverResult:
    success: bool = True
    answer: str = ""
    steps: List[Step] = field(default_factory=list)
    error: Optional[str] = None


# ─── Taxonomy ───

def taxonomy_binomial_nomenclature(**kw) -> SolverResult:
    return SolverResult(
        answer="Binomial nomenclature: Genus + species (e.g. Homo sapiens). Genus capitalized, species lowercase, both italicised.",
        steps=[Step("Identify genus and species", "Genus species", "Homo sapiens", "Genus capitalised, species lowercase")],
    )


def taxonomy_taxonomic_hierarchy(**kw) -> SolverResult:
    return SolverResult(
        answer="Kingdom → Phylum → Class → Order → Family → Genus → Species",
        steps=[Step("Taxonomic hierarchy", "Kingdom > Phylum > Class > Order > Family > Genus > Species",
                    "KPCOFGS", "Each level is more specific than the one above")],
    )


def taxonomy_five_kingdom(**kw) -> SolverResult:
    return SolverResult(
        answer="Five kingdoms: Monera, Protista, Fungi, Plantae, Animalia (Whittaker's classification)",
        steps=[Step("Whittaker's 5-kingdom classification", "Monera, Protista, Fungi, Plantae, Animalia",
                    "Based on cell structure, body organisation, mode of nutrition, reproduction, phylogeny",
                    "Prokaryotes → Monera, unicellular eukaryotes → Protista")],
    )


def taxonomy_diagnostic_key(**kw) -> SolverResult:
    return SolverResult(
        answer="Diagnostic key uses contrasting characters (couplet) to identify organisms. Each step offers two choices.",
        steps=[Step("Diagnostic key", "Couplet-based identification", "Each couplet has two opposing statements",
                    "Follow the matching statement to next couplet until identification")],
    )


# ─── Plant Physiology ───

def plant_physiology_photosynthesis(**kw) -> SolverResult:
    return SolverResult(
        answer="Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (light energy, chlorophyll). Light reactions in thylakoids, Calvin cycle in stroma.",
        steps=[
            Step("Light reactions", "H₂O → 2H⁺ + 2e⁻ + ½O₂", "Photolysis of water in PS-II", "ATP and NADPH produced"),
            Step("Calvin cycle", "CO₂ + RuBP → 3-PGA → G3P", "CO₂ fixation by RuBisCO", "Glucose synthesised"),
        ],
    )


def plant_physiology_transpiration(**kw) -> SolverResult:
    return SolverResult(
        answer="Transpiration: water loss through stomata. Creates transpiration pull for water transport. Affected by humidity, temperature, wind, light.",
        steps=[
            Step("Transpiration pull", "Cohesion-tension theory", "Water molecules cohesive + adhesive to xylem",
                 "Negative pressure pulls water column upward"),
            Step("Factors affecting rate", "Rate ∝ 1/humidity, ∝ temperature", "Higher temp → more evaporation",
                 "Wind increases rate, light opens stomata"),
        ],
    )


def plant_physiology_mineral_nutrition(**kw) -> SolverResult:
    return SolverResult(
        answer="Essential minerals: Macronutrients (N, P, K, Ca, Mg, S) and Micronutrients (Fe, Mn, Zn, Cu, B, Mo, Cl, Ni). Nitrogen fixation by Rhizobium.",
        steps=[
            Step("Macronutrients", "N, P, K, Ca, Mg, S", "Required in large quantities", "Structural and metabolic roles"),
            Step("Micronutrients", "Fe, Mn, Zn, Cu, B, Mo, Cl, Ni", "Required in trace amounts", "Cofactors for enzymes"),
        ],
    )


def plant_physiology_plant_respiration(**kw) -> SolverResult:
    return SolverResult(
        answer="Respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP. Glycolysis (cytoplasm) → Krebs cycle (mitochondria) → ETC (inner membrane).",
        steps=[
            Step("Glycolysis", "Glucose → 2 Pyruvate + 2 ATP", "Cytoplasm, no O₂ needed", "Net 2 ATP, 2 NADH"),
            Step("Krebs cycle", "Pyruvate → CO₂ + NADH + FADH₂", "Mitochondrial matrix", "2 ATP, CO₂ released"),
            Step("ETC", "NADH/FADH₂ → ATP + H₂O", "Inner mitochondrial membrane", "~34 ATP, oxidative phosphorylation"),
        ],
    )


# ─── Human Physiology ───

def human_physiology_digestion(**kw) -> SolverResult:
    return SolverResult(
        answer="Digestion: Mouth (salivary amylase) → Stomach (pepsin, HCl) → Small intestine (pancreatic enzymes, bile). Proteins → amino acids, starch → glucose, fats → fatty acids + glycerol.",
        steps=[
            Step("Oral cavity", "Salivary amylase: starch → maltose", "pH ~6.8", "Carbohydrate digestion begins"),
            Step("Stomach", "Pepsin: proteins → peptides, HCl pH ~2", "Activates pepsinogen → pepsin", "Protein digestion begins"),
            Step("Small intestine", "Pancreatic amylase, trypsin, lipase + bile", "Bile emulsifies fats", "Final breakdown and absorption"),
        ],
    )


def human_physiology_breathing(**kw) -> SolverResult:
    return SolverResult(
        answer="Breathing: Inspiration (diaphragm contracts, volume↑, pressure↓, air enters) → Expiration (diaphragm relaxes, volume↓, pressure↑, air exits). Gas exchange in alveoli.",
        steps=[
            Step("Inspiration", "Diaphragm contracts + flattens", "Thoracic volume increases", "Intrapulmonary pressure < atmospheric"),
            Step("Gas exchange", "O₂ diffuses into blood, CO₂ diffuses out", "Alveolar-capillary membrane", "Haemoglobin carries O₂ as oxyhaemoglobin"),
            Step("Expiration", "Diaphragm relaxes + domes upward", "Thoracic volume decreases", "Air pushed out passively"),
        ],
    )


def human_physiology_circulation(**kw) -> SolverResult:
    return SolverResult(
        answer="Double circulation: Pulmonary (heart→lungs→heart) + Systemic (heart→body→heart). Right ventricle → pulmonary artery → lungs → pulmonary vein → left atrium → left ventricle → aorta → body.",
        steps=[
            Step("Pulmonary circulation", "Right ventricle → pulmonary artery → lungs", "Deoxygenated blood to lungs", "O₂ picked up, CO₂ released"),
            Step("Systemic circulation", "Left ventricle → aorta → body", "Oxygenated blood to tissues", "O₂ delivered, CO₂ collected"),
            Step("Cardiac cycle", "Systole (contraction) + Diastole (relaxation)", "SAN → AVN → Purkinje fibres", "Heart sounds: lub (AV valves), dub (semilunar valves)"),
        ],
    )


def human_physiology_excretion(**kw) -> SolverResult:
    return SolverResult(
        answer="Excretion: Kidneys filter blood → nephrons → urine. Glomerular filtration → tubular reabsorption → tubular secretion. Urine: urea, salts, water.",
        steps=[
            Step("Glomerular filtration", "Blood pressure filters plasma in glomerulus", "~125 mL/min filtrate", "Water, glucose, amino acids, urea filtered"),
            Step("Tubular reabsorption", "PCT reabsorbs glucose, amino acids, Na⁺, water", "99% filtrate reabsorbed", "Selective reabsorption"),
            Step("Tubular secretion", "DCT secretes H⁺, K⁺, NH₃", "pH and ion balance", "Final urine formation"),
        ],
    )


def human_physiology_nervous(**kw) -> SolverResult:
    return SolverResult(
        answer="Nervous system: Neurons transmit impulses via action potentials. Resting potential (-70mV) → depolarisation (Na⁺ influx) → repolarisation (K⁺ efflux). Synapse: neurotransmitter crosses cleft.",
        steps=[
            Step("Resting potential", "-70mV, K⁺ inside, Na⁺ outside", "Na⁺/K⁺ pump maintains gradient", "Polarised membrane"),
            Step("Action potential", "Threshold → Na⁺ channels open", "Depolarisation to +30mV", "All-or-none response"),
            Step("Synaptic transmission", "Ca²⁺ influx → neurotransmitter release", "Diffuses across synaptic cleft", "Binds to receptors on postsynaptic neuron"),
        ],
    )


def human_physiology_endocrine(**kw) -> SolverResult:
    return SolverResult(
        answer="Endocrine glands secrete hormones into blood. Pituitary (master gland), Thyroid (thyroxine → metabolism), Pancreas (insulin/glucagon → glucose), Adrenal (adrenaline → fight/flight).",
        steps=[
            Step("Pituitary", "GH, TSH, ACTH, FSH, LH, Prolactin, ADH, Oxytocin", "Master gland controls other glands", "Anterior and posterior lobes"),
            Step("Thyroid", "Thyroxine (T₄), Triiodothyronine (T₃)", "Iodine required", "Regulates BMR"),
            Step("Pancreas", "Insulin (β-cells) lowers glucose, Glucagon (α-cells) raises glucose", "Blood glucose homeostasis", "Diabetes: insulin deficiency"),
        ],
    )


SOLVER_REGISTRY = {
    "taxonomy_binomial_nomenclature": taxonomy_binomial_nomenclature,
    "taxonomy_taxonomic_hierarchy": taxonomy_taxonomic_hierarchy,
    "taxonomy_five_kingdom": taxonomy_five_kingdom,
    "taxonomy_diagnostic_key": taxonomy_diagnostic_key,
    "plant_physiology_photosynthesis": plant_physiology_photosynthesis,
    "plant_physiology_transpiration": plant_physiology_transpiration,
    "plant_physiology_mineral_nutrition": plant_physiology_mineral_nutrition,
    "plant_physiology_plant_respiration": plant_physiology_plant_respiration,
    "human_physiology_digestion": human_physiology_digestion,
    "human_physiology_breathing": human_physiology_breathing,
    "human_physiology_circulation": human_physiology_circulation,
    "human_physiology_excretion": human_physiology_excretion,
    "human_physiology_nervous": human_physiology_nervous,
    "human_physiology_endocrine": human_physiology_endocrine,
}
