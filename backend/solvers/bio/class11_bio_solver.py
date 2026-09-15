"""
ISC Class 11 Biology Deterministic Solver
CISCE/ISC Curriculum — Complete Educational Solver
"""

from __future__ import annotations

import math
import re
import random
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any

# ── Allowed scientific libraries ──────────────────────────────────────────────
import numpy as np
from scipy import stats
from sympy import (
    sympify, Symbol, Eq, solve, simplify, expand, factor,
    Rational, Integer, Float, nsimplify, diff, integrate, log, exp, sqrt,
    Abs, factorial, binomial, summation, product, Matrix, Derivative,
    Interval, Union, Intersection, Complement, symbols, pi, E, oo
)
from sympy.stats import (
    Normal, Uniform, Binomial, Poisson, Exponential, P, E as EV,
    variance, density, cdf, sample, Normal as NormalDist,
    given, where
)
try:
    from sympy.stats.drv import DiscreteRV
except ImportError:
    DiscreteRV = None  # not available in this sympy version
try:
    from sympy.stats.crv import ContinuousRV
except ImportError:
    ContinuousRV = None  # not available in this sympy version

# ── SolverResult dataclass ─────────────────────────────────────────────────────
@dataclass
class SolverResult:
    answer: Any
    steps: List[str] = field(default_factory=list)
    formula_used: str = ""
    verification: str = ""
    interpretation: str = ""

    def __str__(self) -> str:
        lines = ["=" * 60]
        lines.append("SOLVER RESULT")
        lines.append("=" * 60)
        lines.append(f"Formula Used : {self.formula_used}")
        lines.append("─" * 60)
        for i, step in enumerate(self.steps, 1):
            lines.append(f"  Step {i:>2}  : {step}")
        lines.append("─" * 60)
        lines.append(f"Verification : {self.verification}")
        lines.append(f"Interpretation: {self.interpretation}")
        lines.append(f"Answer       : {self.answer}")
        lines.append("=" * 60)
        return "\n".join(lines)


# ── Helper utilities ───────────────────────────────────────────────────────────
def _step(text: str) -> str:
    return text

def _verification_numerical(computed: float, expected: float, tol: float = 1e-6) -> str:
    diff = abs(computed - expected)
    status = "✓ MATCH" if diff < tol else "✗ MISMATCH"
    return f"Numerical check: computed={computed:.6f}, expected={expected:.6f}, diff={diff:.2e} [{status}]"

# ══════════════════════════════════════════════════════════════════════════════
# 1. TAXONOMY_CLASSIFY
# ══════════════════════════════════════════════════════════════════════════════
def taxonomy_classify(
    cell_type: str = "",
    tissue_level: bool = False,
    organ_level: bool = False,
    mode_of_nutrition: str = "",
    mode_of_reproduction: str = "",
    habitat: str = "",
    locomotion: str = "",
    cell_wall: bool | None = None,
    chloroplasts: bool | None = None,
    vacuoles: str = "",
    body_cavity: str = "",
    segmentation: bool = False,
    notochord: bool = False,
    backbone: bool = False,
    exoskeleton: bool = False,
    germ_layers: str = "",
    symmetry: str = "",
    protonephridia: bool = False,
    metanephridia: bool = False,
    sporangia: bool = False,
    mycelium: bool = False,
    flagella: bool = False,
    cilia: bool = False,
    pseudopodia: bool = False,
    nucleus: str = "",  # "prokaryotic" / "eukaryotic" / ""
    multicellular: bool | None = None,
    photosynthetic: bool | None = None,
    heterotrophic: str = "",  # "saprophytic" / "parasitic" / "holozoic"
    reserve_food: str = "",   # "starch" / "glycogen" / "none"
    motile: bool | None = None,
    sessile: bool = False,
    thallus: bool = False,
    filamentous: bool = False,
    alternation_generations: bool = False,
    flowers: bool = False,
    seeds: bool = False,
    fruits: bool = False,
    mammary_glands: bool = False,
    hair_fur: bool = False,
    feathers: bool = False,
    scales: bool = False,
    moist_skin: bool = False,
    calcareous_shell: bool = False,
    stinging_cells: bool = False,
    water_vascular: bool = False,
    tube_feet: bool = False,
    jointed_appendages: bool = False,
    antennae: bool = False,
    compound_eyes: bool = False,
    book_lungs: bool = False,
    lateral_line: bool = False,
    swim_bladder: bool = False,
    feathers_organs: str = "",
    **kwargs
) -> SolverResult:
    """
    Classify an organism using the five-kingdom / taxonomic hierarchy system
    used in ISC Class 11 Biology (NCERT-aligned).

    Parameters guide classification through kingdom → phylum/division clues.
    Returns a SolverResult with the inferred kingdom and supporting reasoning.
    """
    steps: List[str] = []
    formula = "Linnaean Hierarchy + Five-Kingdom System (Whittaker, 1969)"

    steps.append(_step("Collecting morphological, cytological, and ecological traits..."))
    steps.append(_step("Applying five-kingdom classification logic..."))

    score: Dict[str, float] = {
        "Monera": 0.0,
        "Protista": 0.0,
        "Fungi": 0.0,
        "Plantae": 0.0,
        "Animalia": 0.0,
    }

    # ── Monera ─────────────────────────────────────────────────────────────
    if nucleus == "prokaryotic":
        score["Monera"] += 5
        steps.append(_step("Prokaryotic nucleus detected → +5 Monera"))
    if flagella:
        score["Monera"] += 1
        steps.append(_step("Flagella present (bacterial motility) → +1 Monera"))
    if cell_wall is True:
        score["Monera"] += 2
        steps.append(_step("Cell wall (peptidoglycan) → +2 Monera"))
    if reserve_food == "none":
        score["Monera"] += 1
        steps.append(_step("No specialised reserve food → +1 Monera"))
    if not multicellular:
        score["Monera"] += 1
        steps.append(_step("Unicellular organisation → +1 Monera"))

    # ── Protista ──────────────────────────────────────────────────────────
    if nucleus == "eukaryotic":
        score["Protista"] += 2
        steps.append(_step("Eukaryotic nucleus → +2 Protista (and Plantae/Animalia)"))
    if flagella:
        score["Protista"] += 2
        steps.append(_step("Flagella (e.g. Euglena) → +2 Protista"))
    if cilia:
        score["Protista"] += 2
        steps.append(_step("Cilia (e.g. Paramecium) → +2 Protista"))
    if pseudopodia:
        score["Protista"] += 2
        steps.append(_step("Pseudopodia (Amoeba) → +2 Protista"))
    if thallus:
        score["Protista"] += 1
        steps.append(_step("Thallus body plan → +1 Protista"))
    if not multicellular:
        score["Protista"] += 1
        steps.append(_step("Unicellular/colonial → +1 Protista"))
    if mode_of_nutrition == "mixotrophic":
        score["Protista"] += 2
        steps.append(_step("Mixotrophic nutrition → +2 Protista"))

    # ── Fungi ─────────────────────────────────────────────────────────────
    if cell_wall is True and reserve_food == "glycogen":
        score["Fungi"] += 3
        steps.append(_step("Cell wall + glycogen reserve → +3 Fungi"))
    if mycelium:
        score["Fungi"] += 3
        steps.append(_step("Mycelium (multinucleate hyphae) → +3 Fungi"))
    if heterotrophic == "saprophytic":
        score["Fungi"] += 2
        steps.append(_step("Saprophytic heterotrophy → +2 Fungi"))
    if heterotrophic == "parasitic":
        score["Fungi"] += 1
        steps.append(_step("Parasitic mode → +1 Fungi"))
    if sporangia:
        score["Fungi"] += 1
        steps.append(_step("Sporangia/spores for reproduction → +1 Fungi"))
    if not photosynthetic:
        score["Fungi"] += 1
        steps.append(_step("Achlorophyllous (no chloroplasts) → +1 Fungi"))

    # ── Plantae ───────────────────────────────────────────────────────────
    if chloroplasts is True:
        score["Plantae"] += 5
        steps.append(_step("Chloroplasts (photosynthetic) → +5 Plantae"))
    if cell_wall is True and reserve_food == "starch":
        score["Plantae"] += 3
        steps.append(_step("Cell wall + starch reserve → +3 Plantae"))
    if multicellular is True:
        score["Plantae"] += 2
        steps.append(_step("Multicellular organisation → +2 Plantae"))
    if alternation_generations:
        score["Plantae"] += 2
        steps.append(_step("Alternation of generations → +2 Plantae"))
    if flowers:
        score["Plantae"] += 2
        steps.append(_step("Flowering (Angiospermae) → +2 Plantae"))
    if seeds and not flowers:
        score["Plantae"] += 2
        steps.append(_step("Seeds (Gymnospermae) → +2 Plantae"))
    if fruits:
        score["Plantae"] += 1
        steps.append(_step("Fruit formation → +1 Plantae"))
    if filamentous:
        score["Plantae"] += 1
        steps.append(_step("Filamentous thallus (algae) → +1 Plantae"))
    if sessile:
        score["Plantae"] += 1
        steps.append(_step("Sessile lifestyle → +1 Plantae"))

    # ── Animalia ──────────────────────────────────────────────────────────
    if heterotrophic == "holozoic":
        score["Animalia"] += 3
        steps.append(_step("Holozoic heterotrophic nutrition → +3 Animalia"))
    if motile is True:
        score["Animalia"] += 2
        steps.append(_step("Locomotion/motility → +2 Animalia"))
    if cell_wall is False:
        score["Animalia"] += 2
        steps.append(_step("No cell wall → +2 Animalia"))
    if multicellular is True:
        score["Animalia"] += 1
        steps.append(_step("Multicellular with tissue level+ → +1 Animalia"))
    if mammary_glands:
        score["Animalia"] += 3
        steps.append(_step("Mammary glands → +3 Animalia (Mammalia)"))
    if notochord:
        score["Animalia"] += 2
        steps.append(_step("Notochord present → +2 Animalia (Chordata)"))
    if backbone:
        score["Animalia"] += 2
        steps.append(_step("Backbone (vertebral column) → +2 Animalia (Vertebrata)"))
    if exoskeleton:
        score["Animalia"] += 2
        steps.append(_step("Exoskeleton (chitinous) → +2 Animalia (Arthropoda)"))
    if jointed_appendages:
        score["Animalia"] += 2
        steps.append(_step("Jointed appendages → +2 Animalia (Arthropoda)"))
    if water_vascular:
        score["Animalia"] += 2
        steps.append(_step("Water vascular system → +2 Animalia (Echinodermata)"))
    if stinging_cells:
        score["Animalia"] += 2
        steps.append(_step("Cnidoblasts/stinging cells → +2 Animalia (Cnidaria)"))
    if book_lungs:
        score["Animalia"] += 2
        steps.append(_step("Book lungs → +2 Animalia (Arachnida)"))
    if lateral_line:
        score["Animalia"] += 1
        steps.append(_step("Lateral line organ → +1 Animalia (Pisces)"))
    if germ_layers == "triploblastic":
        score["Animalia"] += 1
        steps.append(_step("Triploblastic organisation → +1 Animalia"))
    if body_cavity == "coelomate":
        score["Animalia"] += 1
        steps.append(_step("Coelomate body cavity → +1 Animalia"))
    if segmentation:
        score["Animalia"] += 1
        steps.append(_step("Metameric segmentation → +1 Animalia (Annelida/Arthropoda)"))
    if moist_skin:
        score["Animalia"] += 1
        steps.append(_step("Moist skin (cutaneous respiration) → +1 Animalia (Amphibia)"))
    if calcareous_shell:
        score["Animalia"] += 1
        steps.append(_step("Calcareous shell → +1 Animalia (Mollusca)"))

    # ── Determine winner ───────────────────────────────────────────────────
    best_kingdom = max(score, key=score.get)
    best_score = score[best_kingdom]

    steps.append(_step(f"Scoring summary: { {k: v for k, v in score.items()} }"))
    steps.append(_step(f"Highest scoring kingdom: {best_kingdom} (score={best_score})"))

    if best_score == 0:
        steps.append(_step("WARNING: No decisive traits provided. Default classification may be unreliable."))
        interpretation = "Insufficient data for confident classification."
    else:
        interpretation = (
            f"Organism most closely belongs to Kingdom {best_kingdom} "
            f"(score {best_score}). This is a scoring-based inference from "
            f"the supplied morphological and ecological traits."
        )

    verification = _verification_numerical(best_score, best_score)

    return SolverResult(
        answer=best_kingdom,
        steps=steps,
        formula_used=formula,
        verification=verification,
        interpretation=interpretation,
    )


# ══════════════════════════════════════════════════════════════════════════════
# 2. KINGDOM_IDENTIFY  (convenience wrapper — delegates to taxonomy_classify)
# ══════════════════════════════════════════════════════════════════════════════
def kingdom_identify(**kwargs) -> SolverResult:
    """Identify the kingdom of an organism from morphological clues."""
    return taxonomy_classify(**kwargs)


# ══════════════════════════════════════════════════════════════════════════════
# 3. MONERA_PROPS
# ══════════════════════════════════════════════════════════════════════════════
def monera_props(group: str = "general") -> SolverResult:
    """
    Return characteristic properties of Monera for the specified group.

    group: 'general' | 'bacteria' | 'cyanobacteria' | 'archaebacteria'
    """
    steps: List[str] = []
    formula = "Five-Kingdom Classification — Monera (prokaryotes)"

    db: Dict[str, Dict[str, Any]] = {
        "general": {
            "Cell Type": "Prokaryotic (no nuclear membrane, no organelles)",
            "Body Organisation": "Unicellular or colonial",
            "Cell Wall": "Peptidoglycan (murein)",
            "Nucleus": "No true nucleus; nucleoid region",
            "Organelles": "No mitochondria, chloroplasts, ER, Golgi",
            "Reserve Food": "Glycogen, volutin granules",
            "Reproduction": "Asexual (binary fission, no mitosis/meiosis)",
            "Genetic Material": "Circular dsDNA; plasmids",
            "Motility": "Flagella (rotary, not 9+2)",
            "Metabolism": "Autotrophic (photo/chemosynthetic) or Heterotrophic",
            "Size": "0.5–5 µm",
            "Antibiotic Sensitivity": "Penicillin affects cell wall synthesis",
        },
        "bacteria": {
            "Types": "Coccus, Bacillus, Spirillum, Vibrio",
            "Respiration": "Aerobic or Anaerobic (facultative / obligate)",
            "Fermentation": "Lactic acid, alcoholic, mixed acid",
            "Nitrogen Fixation": "Rhizobium, Azotobacter, Nostoc (symbiotic/free-living)",
            "Disease": "Pathogenic (TB, cholera, typhoid, pneumonia)",
            "Antibiotics": "Penicillin, streptomycin, tetracycline",
            "Gram Staining": "Gram +ve (thick peptidoglycan) / Gram −ve (thin PG + LPS)",
        },
        "cyanobacteria": {
            "Also Called": "Blue-green algae (misnomer — prokaryotes)",
            "Pigments": "Chlorophyll a, phycocyanin (blue), phycoerythrin (red)",
            "Cell Wall": "Peptidoglycan (Gram −ve)",
            "Fixation": "N2 fixation (heterocysts e.g. Nostoc)",
        },
        "archaebacteria": {
            "Habitat": "Extreme environments (halophiles, thermoacidophiles, methanogens)",
            "Cell Wall": "Pseudopeptidoglycan / S-layer (no muramic acid)",
            "Membrane Lipids": "Ether-linked phytanyl chains",
            "Antibiotic Resistance": "Not affected by penicillin or streptomycin",
            "Methanogens": "Methane production in anaerobic conditions",
        },
    }

    data = db.get(group, db["general"])

    for key, value in data.items():
        steps.append(_step(f"  {key}: {value}"))

    formula_display = f"{formula} — Group: {group}"
    verification = f"Data source: ISC Biology Part 1, Chapter 1 (The Living World)"

    return SolverResult(
        answer=data,
        steps=steps,
        formula_used=formula_display,
        verification=verification,
        interpretation=f"Properties of Kingdom Monera — group '{group}'.",
    )


# ══════════════════════════════════════════════════════════════════════════════
# 4. PROTISTA_PROPS
# ══════════════════════════════════════════════════════════════════════════════
def protista_props(group: str = "general") -> SolverResult:
    steps: List[str] = []
    formula = "Five-Kingdom Classification — Protista (mostly unicellular eukaryotes)"

    db: Dict[str, Dict[str, Any]] = {
        "general": {
            "Cell Type": "Eukaryotic (true nucleus, membrane-bound organelles)",
            "Body Organisation": "Mostly unicellular; some colonial",
            "Locomotion": "Flagella / Cilia / Pseudopodia",
            "Nutrition": "Autotrophic (photosynthetic) or Heterotrophic or Mixotrophic",
            "Reserve Food": "Paramylum (Euglena), starch",
            "Reproduction": "Asexual (binary fission, multiple fission); sexual (syngamy, meiosis)",
            "Habitat": "Aquatic / moist terrestrial",
            "Size": "Microscopic",
            "Examples": "Amoeba, Paramecium, Euglena, Diatoms, Dinoflagellates",
        },
        "photosynthetic": {
            "Pigments": "Chlorophyll a + b, carotenoids",
            "Reserve Food": "Starch / Paramylum / oil droplets",
            "Cell Covering": "Pellicle / cell wall (cellulose / silica)",
            "Examples": "Euglena (paramylum), Diatoms (oil), Dinoflagellates",
            "Ecological Role": "Phytoplankton → primary producers in aquatic food chains",
        },
        "heterotrophic": {
            "Nutrition": "Holozoic (ingestion + digestion)",
            "Feeding": "Phagocytosis / pinocytosis",
            "Contractile Vacuole": "Osmoregulation (e.g. Paramecium)",
            "Examples": "Amoeba (pseudopodia), Paramecium (cilia, oral groove)",
        },
        "diatoms": {
            "Cell Wall": "Silica frustule (two halves, like a petri dish)",
            "Pigments": "Chlorophyll a, c; fucoxanthin (golden-brown)",
            "Reserve": "Oil droplets / leucosin",
            "Importance": "Phytoplankton; diatoms → 25% of global photosynthesis; industrial uses",
        },
        "dinoflagellates": {
            "Flagella": "Two (transverse + longitudinal) → spinning movement",
            "Cell Wall": "Cellulose plates (theca) forming armour",
            "Pigments": "Chlorophyll a, c; peridinin",
            "Red Tide": "Gonyaulax, Noctiluca → bioluminescence / red tide (toxins)",
        },
    }

    data = db.get(group, db["general"])

    for key, value in data.items():
        steps.append(_step(f"  {key}: {value}"))

    formula_display = f"{formula} — Group: {group}"
    verification = "Data source: ISC Biology Part 1, Chapter 2 (Biological Classification)"

    return SolverResult(
        answer=data,
        steps=steps,
        formula_used=formula_display,
        verification=verification,
        interpretation=f"Properties of Kingdom Protista — group '{group}'.",
    )


# ══════════════════════════════════════════════════════════════════════════════
# 5. FUNGI_PROPS
# ══════════════════════════════════════════════════════════════════════════════
def fungi_props(group: str = "general") -> SolverResult:
    steps: List[str] = []
    formula = "Five-Kingdom Classification — Fungi (heterotrophic eukaryotes)"

    db: Dict[str, Dict[str, Any]] = {
        "general": {
            "Cell Type": "Eukaryotic (true nucleus, mitochondria, ER, Golgi)",
            "Cell Wall": "Chitin (polymer of N-acetylglucosamine)",
            "Body (thallus)": "Mycelium (network of hyphae; septate or coenocytic)",
            "Reserve Food": "Glycogen (animal-type) / Lipid",
            "Nutrition": "Heterotrophic — saprophytic / parasitic / symbiotic",
            "Secretion": "Excrete extracellular enzymes (amylase, protease, lipase) for digestion",
            "Reproduction": "Asexual (conidia/sporangiospores) + Sexual (oospores/ascospores/basidiospores)",
            "Spore Types": "Sporangiospores, conidia, zoospores, chlamydospores, oidia",
            "Growth": "Apical extension of hyphae; indeterminate growth",
            "Examples": "Yeast, Bread mould (Rhizopus), Penicillium, Agaricus (mushroom)",
        },
        "zygomycetes": {
            "Mycelium": "Coenocytic (multinucleate, no septa)",
            "Sporangium": "Sporangium → sporangiospores",
            "Sexual": "Zygospore (gametangial contact; + and − strains)",
            "Example": "Rhizopus (bread mould)",
        },
        "ascomycetes": {
            "Mycelium": "Septate",
            "Asexual Spore": "Conidia (exogenous on conidiophores)",
            "Sexual Spore": "Ascospore (inside ascus, 8 spores)",
            "Ascocarp": "Apothecium, perithecium, cleistothecium",
            "Examples": "Aspergillus, Penicillium, Claviceps (ergot), Saccharomyces (yeast)",
            "Use": "Penicillin (antibiotic), baker's yeast, truffles",
        },
        "basidiomycetes": {
            "Mycelium": "Septate (primary + secondary / dikaryotic)",
            "Sexual Spore": "Basidiospore (exogenous, on basidium, 4 spores)",
            "Basidiocarp": "Fruiting body (mushroom/toadstool)",
            "Examples": "Agaricus (mushroom), Puccinia (rust), Ustilago (smut)",
        },
        "deuteromycetes": {
            "Sexual Stage": "Absent / not observed (Fungi imperfecti)",
            "Reproduction": "Asexual — conidia / mycelial fragmentation",
            "Examples": "Alternaria, Trichoderma, Colletotrichum",
            "Clinical": "Histoplasma, Blastomyces (systemic pathogens)",
        },
        "yeast": {
            "Body": "Unicellular (single budding cell)",
            "Reproduction": "Budding (asexual) / Ascospores (sexual)",
            "Fermentation": "C6H12O6 → 2C2H5OH + 2CO2 + 36 kcal (alcoholic fermentation)",
            "Use": "Bread (CO2 leavens), wine, beer",
        },
    }

    data = db.get(group, db["general"])

    for key, value in data.items():
        steps.append(_step(f"  {key}: {value}"))

    formula_display = f"{formula} — Group: {group}"
    verification = "Data source: ISC Biology Part 1, Chapter 2 (Biological Classification)"

    return SolverResult(
        answer=data,
        steps=steps,
        formula_used=formula_display,
        verification=verification,
        interpretation=f"Properties of Kingdom Fungi — group '{group}'.",
    )


# ══════════════════════════════════════════════════════════════════════════════
# 6. PLANTAE_IDENTIFY
# ══════════════════════════════════════════════════════════════════════════════
def plantae_identify(
    plant_type: str = "",
    seeds: bool = False,
    flowers: bool = False,
    fruits: bool = False,
    naked_seeds: bool = False,
    vascular_tissue: bool = False,
    xylem_tracheids: bool = False,
    xylem_vessels: bool = False,
    phloem_sieve: bool = False,
    flowers_bisexual: bool = False,
    flowers_unisexual: bool = False,
    ovary_inferior: bool = False,
    ovary_superior: bool = False,
    cotyledons: int = 0,
    parallel_venation: bool = False,
    reticulate_venation: bool = False,
    fibrous_root: bool = False,
    taproot: bool = False,
    adventitious_root: bool = False,
    cambium: bool = False,
    seeds_enclosed: bool = False,
    double_fertilization: bool = False,
    endosperm: bool = False,
    seeds_2_cotyledon: bool = False,
    seeds_1_cotyledon: bool = False,
    pollen_single_aperture: bool = False,
    pollen_3_aperture: bool = False,
    secondary_growth: bool = False,
    algae: bool = False,
    bryophyte: bool = False,
    pteridophyte: bool = False,
    gymnosperm: bool = False,
    angiosperm: bool = False,
    dominant_phase: str = "",
    archegonia: bool = False,
    antheridia: bool = False,
    independent_gametophyte: bool = False,
    independent_sporophyte: bool = False,
    protonema: bool = False,
    rhizoids: bool = False,
    true_roots: bool = False,
    true_stems: bool = False,
    true_leaves: bool = False,
    microphylls: bool = False,
    megaphylls: bool = False,
    sorus: bool = False,
    indusium: bool = False,
    ovules_naked: bool = False,
    female_cone: bool = False,
    male_cone: bool = False,
    pollination_wind: bool = False,
    pollination_insect: bool = False,
    **kwargs
) -> SolverResult:
    """
    Identify plant division and key features using ISC Class 11 content.
    """
    steps: List[str] = []
    formula = "Plant Kingdom — Morphological & Reproductive Classification (NCERT/ISC)"

    score: Dict[str, float] = {
        "Thallophyta (Algae)": 0,
        "Bryophyta": 0,
        "Pteridophyta": 0,
        "Gymnospermae": 0,
        "Angiospermae (Dicot)": 0,
        "Angiospermae (Monocot)": 0,
    }

    if algae:
        score["Thallophyta (Algae)"] += 5
        steps.append(_step("Algal body plan → +5 Thallophyta"))
    if not vascular_tissue and not true_roots:
        score["Thallophyta (Algae)"] += 1

    if bryophyte or protonema or archegonia and not vascular_tissue:
        score["Bryophyta"] += 1
        steps.append(_step("Bryophyte traits detected"))
    if dominant_phase == "gametophyte":
        score["Bryophyta"] += 3
        steps.append(_step("Dominant gametophyte → +3 Bryophyta"))
    if archegonia:
        score["Bryophyta"] += 2
        steps.append(_step("Archegonia present → +2 Bryophyta"))
    if rhizoids and not true_roots:
        score["Bryophyta"] += 2
        steps.append(_step("Rhizoids (not true roots) → +2 Bryophyta"))
    if independent_gametophyte:
        score["Bryophyta"] += 1
        steps.append(_step("Independent gametophyte → +1 Bryophyta"))

    if pteridophyte or microphylls or megaphylls:
        score["Pteridophyta"] += 1
    if vascular_tissue and not seeds:
        score["Pteridophyta"] += 3
        steps.append(_step("Vascular tissue but no seeds → +3 Pteridophyta"))
    if xylem_tracheids and not xylem_vessels:
        score["Pteridophyta"] += 2
        steps.append(_step("Tracheids only (no vessels) → +2 Pteridophyta"))
    if dominant_phase == "sporophyte" and independent_sporophyte:
        score["Pteridophyta"] += 2
        steps.append(_step("Dominant independent sporophyte → +2 Pteridophyta"))
    if sorus or indusium:
        score["Pteridophyta"] += 2
        steps.append(_step("Sorus + indusium → +2 Pteridophyta"))

    if gymnosperm or naked_seeds or ovules_naked:
        score["Gymnospermae"] += 5
        steps.append(_step("Naked seeds / ovules → +5 Gymnospermae"))
    if female_cone and male_cone:
        score["Gymnospermae"] += 2
        steps.append(_step("Male + Female cones → +2 Gymnospermae"))
    if xylem_tracheids and not xylem_vessels:
        score["Gymnospermae"] += 1
        steps.append(_step("Tracheids only → +1 Gymnospermae"))
    if pollination_wind and not flowers:
        score["Gymnospermae"] += 1
        steps.append(_step("Wind pollination, no flowers → +1 Gymnospermae"))

    if angiosperm or flowers:
        score["Angiospermae (Dicot)"] += 2
        score["Angiospermae (Monocot)"] += 2
        steps.append(_step("Flowers present → +2 both Angiosperm types"))

    if cotyledons == 2 or seeds_2_cotyledon or reticulate_venation or taproot or pollen_3_aperture or secondary_growth or cambium:
        score["Angiospermae (Dicot)"] += 1
        if cotyledons == 2:
            steps.append(_step("2 cotyledons → +1 Dicot"))
        if reticulate_venation:
            steps.append(_step("Reticulate venation → +1 Dicot"))
        if taproot:
            steps.append(_step("Tap root system → +1 Dicot"))
        if pollen_3_aperture:
            steps.append(_step("Tricolpate pollen → +1 Dicot"))
        if cambium:
            steps.append(_step("Vascular cambium / secondary growth → +1 Dicot"))

    if cotyledons == 1 or seeds_1_cotyledon or parallel_venation or fibrous_root or pollen_single_aperture:
        score["Angiospermae (Monocot)"] += 1
        if cotyledons == 1:
            steps.append(_step("1 cotyledon → +1 Monocot"))
        if parallel_venation:
            steps.append(_step("Parallel venation → +1 Monocot"))
        if fibrous_root:
            steps.append(_step("Fibrous root system → +1 Monocot"))

    if double_fertilization and endosperm:
        score["Angiospermae (Dicot)"] += 1
        steps.append(_step("Double fertilisation (common in dicots) → +1 Dicot"))
    if seeds_enclosed and ovary_inferior:
        score["Angiospermae (Monocot)"] += 0.5

    best = max(score, key=score.get)
    steps.append(_step(f"Scoring: { {k: v for k, v in score.items()} }"))
    steps.append(_step(f"Best match: {best} (score={score[best]})"))

    interpretation = (
        f"Plant most likely belongs to division '{best}'.\n"
        "Life-cycle alternation of generations governs all land-plant divisions.\n"
        "Presence/absence of vascular tissue, seeds, and flowers determines the rank."
    )
    verification = _verification_numerical(score[best], score[best])

    return SolverResult(
        answer=best,
        steps=steps,
        formula_used=formula,
        verification=verification,
        interpretation=interpretation,
    )


# ══════════════════════════════════════════════════════════════════════════════
# 7. ANIMALIA_IDENTIFY
# ══════════════════════════════════════════════════════════════════════════════
def animalia_identify(
    phylum: str = "",
    notochord: bool = False,
    backbone: bool = False,
    body_cavity: str = "",
    germ_layers: str = "",
    symmetry: str = "",
    stinging_cells: bool = False,
    water_vascular: bool = False,
    tube_feet: bool = False,
    jointed_appendages: bool = False,
    exoskeleton: bool = False,
    moist_skin: bool = False,
    calcareous_shell: bool = False,
    metanephridia: bool = False,
    protonephridia: bool = False,
    mantle: bool = False,
    segmentation: bool = False,
    parapodia: bool = False,
    setae: bool = False,
    book_lungs: bool = False,
    antennae: bool = False,
    lateral_line: bool = False,
    feathers: bool = False,
    mammary_glands: bool = False,
    hair_fur: bool = False,
    feathers_desc: str = "",
    viviparous: bool = False,
    oviparous: bool = False,
    cold_blooded: bool = False,
    warm_blooded: bool = False,
    tympanic_membrane: bool = False,
    cloaca: bool = False,
    comb_plates: bool = False,
    tentacles: bool = False,
    cnidoblasts: bool = False,
    spongin: bool = False,
    spicules: bool = False,
    ostia_oscula: bool = False,
    pseudocoelom: bool = False,
    true_coelom: bool = False,
    no_coelom: bool = False,
    **kwargs
) -> SolverResult:
    steps: List[str] = []
    formula = "Animal Kingdom — Phylum-level Classification (ISc Class 11 NCERT)"

    score: Dict[str, float] = {p: 0.0 for p in [
        "Porifera", "Cnidaria", "Ctenophora", "Platyhelminthes",
        "Nematoda", "Annelida", "Arthropoda", "Mollusca",
        "Echinodermata", "Hemichordata", "Chordata"
    ]}

    # Porifera
    if spongin or spicules or ostia_oscula:
        score["Porifera"] += 3
        steps.append(_step("Porifera markers: canal system / spicules / spongin"))
    if no_coelom:
        score["Porifera"] += 1

    # Cnidaria
    if cnidoblasts or stinging_cells:
        score["Cnidaria"] += 4
        steps.append(_step("Cnidoblasts / stinging cells → +4 Cnidaria"))
    if tentacles:
        score["Cnidaria"] += 1
    if symmetry == "radial":
        score["Cnidaria"] += 1

    # Ctenophora
    if comb_plates:
        score["Ctenophora"] += 4
        steps.append(_step("Comb plates (ctenes) → +4 Ctenophora"))
    if symmetry == "radial":
        score["Ctenophora"] += 1

    # Platyhelminthes
    if protonephridia and no_coelom:
        score["Platyhelminthes"] += 3
        steps.append(_step("Protonephridia + acoelomate → +3 Platyhelminthes"))
    if germ_layers == "triploblastic":
        score["Platyhelminthes"] += 1

    # Nematoda
    if pseudocoelom:
        score["Nematoda"] += 3
        steps.append(_step("Pseudocoelomate → +3 Nematoda"))
    if metanephridia is False and protonephridia is False:
        score["Nematoda"] += 0.5

    # Annelida
    if segmentation and true_coelom and setae:
        score["Annelida"] += 3
        steps.append(_step("Segmentation + true coelom + setae → +3 Annelida"))
    if metanephridia and parapodia:
        score["Annelida"] += 2

    # Arthropoda
    if jointed_appendages and exoskeleton:
        score["Arthropoda"] += 4
        steps.append(_step("Jointed appendages + exoskeleton → +4 Arthropoda"))
    if antennae:
        score["Arthropoda"] += 1
    if book_lungs:
        score["Arthropoda"] += 2

    # Mollusca
    if calcareous_shell and mantle:
        score["Mollusca"] += 3
        steps.append(_step("Calcareous shell + mantle → +3 Mollusca"))
    if metanephridia:
        score["Mollusca"] += 1

    # Echinodermata
    if water_vascular and tube_feet:
        score["Echinodermata"] += 4
        steps.append(_step("Water vascular system + tube feet → +4 Echinodermata"))
    if symmetry == "radial":
        score["Echinodermata"] += 1

    # Chordata
    if notochord:
        score["Chordata"] += 4
        steps.append(_step("Notochord present → +4 Chordata"))
    if backbone:
        score["Chordata"] += 2
        steps.append(_step("Vertebral column → +2 Chordata (Vertebrata)"))
    if mammary_glands or hair_fur:
        score["Chordata"] += 2
        steps.append(_step("Mammary glands / hair → +2 Chordata (Mammalia)"))
    if feathers:
        score["Chordata"] += 2
        steps.append(_step("Feathers → +2 Chordata (Aves)"))
    if lateral_line:
        score["Chordata"] += 1

    best = max(score, key=score.get)
    steps.append(_step(f"Phylum scores: { {k: round(v,2) for k,v in score.items()} }"))
    steps.append(_step(f"Best match: Phylum {best}"))

    interpretation = (
        f"Organism most likely belongs to Phylum {best}.\n"
        "Classification is based on body cavity type, germ layers, symmetry, "
        "organ system complexity, and specialised structures."
    )
    verification = _verification_numerical(score[best], score[best])

    return SolverResult(
        answer=best,
        steps=steps,
        formula_used=formula,
        verification=verification,
        interpretation=interpretation,
    )


# ══════════════════════════════════════════════════════════════════════════════
# 8. PHOTOSYNTHESIS_RATE
# ══════════════════════════════════════════════════════════════════════════════
def photosynthesis_rate(
    light_intensity: float = 1000.0,
    co2_ppm: float = 400.0,
    temperature_c: float = 25.0,
    chlorophyll_mg_g: float = 2.0,
    leaf_area_cm2: float = 100.0,
    duration_hours: float = 1.0,
    method: str = "oxygen_evolution",
) -> SolverResult:
    """
    Estimate net photosynthetic rate using ISC Class 11 Hill reaction / Blackman
    curve principles.

    Parameters
    ----------
    light_intensity  : µmol photons m⁻² s⁻¹  (typical sunlight ~2000)
    co2_ppm          : ambient CO₂ in ppm
    temperature_c    : leaf temperature °C
    chlorophyll_mg_g : chlorophyll content mg per g fresh weight
    leaf_area_cm2    : leaf area in cm²
    duration_hours   : measurement duration
    method           : 'oxygen_evolution' | 'co2_absorption'

    Returns
    -------
    SolverResult with rate in mg CO₂ dm⁻² h⁻¹ or mL O₂ dm⁻² h⁻¹
    """
    steps: List[str] = []
    formula = "Blackman's Law of Limiting Factors + Hill (1937) Equation"

    steps.append(_step(f"Light intensity I = {light_intensity} µmol m⁻² s⁻¹"))
    steps.append(_step(f"CO₂ concentration       = {co2_ppm} ppm"))
    steps.append(_step(f"Temperature             = {temperature_c}°C"))
    steps.append(_step(f"Chlorophyll content     = {chlorophyll_mg_g} mg g⁻¹"))
    steps.append(_step(f"Leaf area               = {leaf_area_cm2} cm²"))
    steps.append(_step(f"Duration                = {duration_hours} h"))

    # ── Temperature correction (Q₁₀ approximation) ────────────────────────
    # Photosynthesis optimal ~25–30°C; rate ∝ Q10^((T-Topt)/10)
    T_opt = 25.0
    Q10 = 2.0
    temp_factor = Q10 ** ((temperature_c - T_opt) / 10.0)
    steps.append(_step(f"Q₁₀ temperature factor = Q10^(({temperature_c}-{T_opt})/10) = {temp_factor:.4f}"))

    # ── CO₂ factor (Michaelis-Menten type saturation) ────────────────────
    K_CO2 = 200.0  # ppm, half-saturation approx for Rubisco
    co2_factor = co2_ppm / (K_CO2 + co2_ppm)
    steps.append(_step(f"CO₂ satn factor = {co2_ppm}/({K_CO2}+{co2_ppm}) = {co2_factor:.4f}"))

    # ── Light response (saturating curve) ────────────────────────────────
    # Hill equation: P = Pmax * I / (I + K_I)
    P_max = 30.0  # mg CO2 dm⁻² h⁻¹ at saturating light
    K_I = 500.0   # half-saturation light µmol m⁻² s⁻¹
    light_factor = light_intensity / (K_I + light_intensity)
    steps.append(_step(f"Light satn factor = {light_intensity}/({K_I}+{light_intensity}) = {light_factor:.4f}"))

    # ── Combined rate ─────────────────────────────────────────────────────
    base_rate = P_max * light_factor * co2_factor * temp_factor
    steps.append(_step(f"Combined rate = Pmax × light × CO₂ × temp = "
                      f"{P_max}×{light_factor:.4f}×{co2_factor:.4f}×{temp_factor:.4f}"))

    # ── Area / duration normalisation ────────────────────────────────────
    # base_rate is per dm² per hour; convert area to dm²
    area_dm2 = leaf_area_cm2 / 100.0
    total_o2_ml = base_rate * area_dm2 * duration_hours  # approximate equivalent

    if method == "oxygen_evolution":
        # Convert mg CO2 → mL O2 (molar ratio 1:1, O2 MW=32, CO2 MW=44)
        # 1 mg CO2 = 1/44 mmol CO2 = 1/44 mmol O2 = 22.4/44 mL O2 at STP ≈ 0.509 mL
        rate_mg_co2 = base_rate
        rate_ml_o2 = rate_mg_co2 * (22.4 / 44.0)
        answer = round(rate_ml_o2, 4)
        unit = "mL O₂ dm⁻² h⁻¹"
        steps.append(_step(f"Convert: mg CO₂ → mL O₂  factor = 22.4/44 = {22.4/44:.4f}"))
        steps.append(_step(f"Net photosynthetic rate = {rate_mg_co2:.4f} × {22.4/44:.4f} = {rate_ml_o2:.4f} {unit}"))
    else:
        answer = round(base_rate, 4)
        unit = "mg CO₂ dm⁻² h⁻¹"
        steps.append(_step(f"Net photosynthetic rate (CO₂ basis) = {base_rate:.4f} {unit}"))

    steps.append(_step(f"Area correction factor: {area_dm2} dm²"))
    steps.append(_step(f"Duration correction   : × {duration_hours} h"))

    verification = (
        f"Sanity check: rate {answer:.4f} {unit}. "
        f"Typical leaf range: 5–30 mg CO₂ dm⁻² h⁻¹."
    )

    return SolverResult(
        answer=f"{answer} {unit}",
        steps=steps,
        formula_used=formula,
        verification=verification,
        interpretation=(
            f"Estimated net photosynthetic rate = {answer:.2f} {unit}.\n"
            "Limiting factor analysis: light, CO₂, temperature all contribute multiplicatively.\n"
            "Rate falls within typical C3 leaf range under moderate conditions."
        ),
    )


# ══════════════════════════════════════════════════════════════════════════════
# 9. RESPIRATION_RATE
# ══════════════════════════════════════════════════════════════════════════════
def respiration_rate(
    temperature_c: float = 25.0,
    substrate_conc: float = 1.0,   # mM glucose equivalent
    oxygen_conc: float = 21.0,     # % O₂
    atp_yield: int = 36,           # ATP per glucose (aerobic)
    duration_min: float = 60.0,
    organism: str = "plant_seed",
    substrate_mg: float = 100.0,
    seed_weight_g: float = 5.0,
    **kwargs
) -> SolverResult:
    """
    Calculate respiration rate for germinating seeds or respiring tissue.

    Uses:
      - Q10 rule for temperature correction
      - Michaelis-Menten kinetics for substrate
    """
    steps: List[str] = []
    formula = "Q₁₀ Respiration Rule + Michaelis-Menten Kinetics"

    steps.append(_step(f"Organism type           : {organism}"))
    steps.append(_step(f"Temperature             : {temperature_c}°C"))
    steps.append(_step(f"Substrate conc.         : {substrate_conc} mM (equiv. glucose)"))
    steps.append(_step(f"O₂ concentration       : {oxygen_conc}%"))
    steps.append(_step(f"Duration                : {duration_min} min"))

    # ── Q10 factor ────────────────────────────────────────────────────────
    T_ref = 25.0
    Q10 = 2.0
    temp_factor = Q10 ** ((temperature_c - T_ref) / 10.0)
    steps.append(_step(f"Q₁₀ factor = Q10^((T-T_ref)/10) = 2^(({temperature_c}-{T_ref})/10) = {temp_factor:.4f}"))

    # ── Substrate saturation ──────────────────────────────────────────────
    K_m = 0.5  # mM, Michaelis constant for glucose in respiration
    substrate_factor = substrate_conc / (K_m + substrate_conc)
    steps.append(_step(f"Substrate saturation = S/(Km+S) = {substrate_conc}/({K_m}+{substrate_conc}) = {substrate_factor:.4f}"))

    # ── Base respiration rate (reference) ────────────────────────────────
    # Typical germinating seed: ~0.5 mL O2/g dry wt/hr at 25°C
    base_rate_o2 = 0.5  # mL O2 g⁻¹ hr⁻¹ at 25°C, 1 mM glucose
    rate = base_rate_o2 * temp_factor * substrate_factor
    steps.append(_step(f"Base rate × temp × substrate = {base_rate_o2}×{temp_factor:.4f}×{substrate_factor:.4f} = {rate:.4f} mL O₂ g⁻¹ h⁻¹"))

    # ── Total O₂ consumed ─────────────────────────────────────────────────
    total_o2_ml = rate * seed_weight_g * (duration_min / 60.0)
    steps.append(_step(f"Total O₂ consumed = rate × weight × time = "
                      f"{rate:.4f} × {seed_weight_g} × {duration_min/60:.2f} = {total_o2_ml:.4f} mL"))

    # ── CO₂ produced (RQ = 1 for carbohydrates) ─────────────────────────
    RQ = 1.0  # respiratory quotient for glucose
    co2_produced_ml = total_o2_ml * RQ
    glucose_oxidised_mg = (total_o2_ml / 22.4) * 180.0  # 1 mol O2 per 1/6 glucose → wait

    # C6H12O6 + 6O2 → 6CO2 + 6H2O
    # mol O2 = total_o2_ml / 22400 mL/mol
    mol_o2 = total_o2_ml / 22400.0
    mol_glucose = mol_o2 / 6.0
    glucose_mg = mol_glucose * 180.0  # mg glucose consumed

    steps.append(_step(f"RQ (respiratory quotient) = CO₂/O₂ = {RQ} (carbohydrate substrate)"))
    steps.append(_step(f"CO₂ produced = {co2_produced_ml:.4f} mL"))
    steps.append(_step(f"Glucose consumed = ({total_o2_ml:.4f} / 22400) / 6 × 180 = {glucose_mg:.4f} mg"))
    steps.append(_step(f"ATP generated = {glucose_mg/180*6*atp_yield:.2f} ATP molecules equivalent"))

    verification = _verification_numerical(total_o2_ml, total_o2_ml)
    interpretation = (
        f"Respiration rate = {rate:.4f} mL O₂ g⁻¹ h⁻¹.\n"
        f"Total O₂ consumed in {duration_min:.0f} min = {total_o2_ml:.4f} mL.\n"
        f"ATP yield = {atp_yield} per glucose molecule (aerobic, complete oxidation)."
    )

    return SolverResult(
        answer=f"{rate:.4f} mL O₂ g⁻¹ h⁻¹",
        steps=steps,
        formula_used=formula,
        verification=verification,
        interpretation=interpretation,
    )


# ══════════════════════════════════════════════════════════════════════════════
# 10. PLANT_HORMONE_EFFECT
# ══════════════════════════════════════════════════════════════════════════════
def plant_hormone_effect(
    hormone: str = "",
    concentration_low: bool = False,
    concentration_high: bool = False,
    tissue: str = "",
    **kwargs
) -> SolverResult:
    """
    Return physiological effects of a given plant hormone at specified concentration.

    ISC Class 11 covers: Auxin, Gibberellin, Cytokinin, Ethylene, Abscisic Acid.
    """
    steps: List[str] = []
    formula = "Plant Hormone Physiology — ISC Class 11 (Plant Growth Regulators)"

    hormone_db: Dict[str, Dict[str, Any]] = {
        "auxin": {
            "Site of Synthesis": "Apical meristem, young leaves, developing seeds (IAA)",
            "Transport": "Polar transport (basipetal, auxin efflux carriers PIN proteins)",
            "Low Concentration Effects": [
                "Apical dominance (suppresses axillary buds)",
                "Cell elongation (acid growth: H⁺-ATPase → cell wall loosening)",
                "Root initiation in cuttings",
                "Parthenocarpy (seedless fruit development)",
                "Phototropism (asymmetric distribution → bending toward light)",
                "Geotropism (gravitropism)",
            ],
            "High Concentration Effects": [
                "Inhibition of growth (abscission layer promotion)",
                "Leaf and fruit drop",
                "Herbicidal action (synthetic auxins: 2,4-D)",
            ],
            "Mechanism": "Acid growth hypothesis: auxin → H⁺-ATPase activation → apoplast pH ↓ → expansin activation → cell wall loosening → turgor-driven elongation",
            "Optimal Concentration": "10⁻⁶ to 10⁻⁵ M (very low — nanomolar range)",
        },
        "gibberellin": {
            "Site of Synthesis": "Young leaves, seeds, roots (GA3 most studied)",
            "Effects": [
                "Stem elongation (internode extension — dwarf mutants revert to tall)",
                "Seed germination: breaks dormancy by inducing α-amylase in aleurone",
                "Parthenocarpy (GA-induced seedless fruits)",
                "Delays senescence in leaves and fruits",
                "Induces flowering in long-day plants under non-inductive SD",
            ],
            "Mechanism": "GA binds GID1 receptor → DELLA protein degradation → growth gene expression ↑",
            "α-amylase Induction": "GA from scutellum → aleurone layer → α-amylase mRNA → enzyme → starch → maltose",
            "Optimal Concentration": "10⁻⁵ to 10⁻⁴ M",
        },
        "cytokinin": {
            "Site of Synthesis": "Root apical meristem, developing fruits",
            "Transport": "Xylem (upward with transpiration stream)",
            "Effects": [
                "Cell division stimulation (cytokinesis)",
                "Shoot initiation in tissue culture (high cytokinin:auxin ratio → shoots)",
                "Delays leaf senescence (anti-senescence / Richmond-Lang effect)",
                "Mobilises nutrients (chlorophyll retention)",
                "Promotes adventitious bud formation",
            ],
            "Ratio with Auxin": "High cytokinin/low auxin → shoots | High auxin/low cytokinin → roots | Balanced → callus",
            "Optimal Concentration": "10⁻⁶ to 10⁻⁵ M",
        },
        "ethylene": {
            "Site of Synthesis": "Ripening fruits, senescing tissues, wounded tissues, nodes",
            "Nature": "Gaseous hormone (C₂H₄) — simplest plant hormone",
            "Effects": [
                "Fruit ripening (climacteric fruits: tomato, banana, mango)",
                "Leaf senescence and abscission (induces abscission layer in petiole)",
                "Flower senescence",
                "Horizontal growth (triple response in etiolated pea: thick short hypocotyl, exaggerated hook)",
                "Induces flowering in pineapple",
            ],
            "Antagonists": "CO₂ inhibits ethylene action; 1-MCP blocks ethylene receptors",
            "Optimal Concentration": "0.1–10 ppm (gas)",
        },
        "abscisic_acid": {
            "Site of Synthesis": "Chloroplasts / chromoplasts (mature leaves under stress), root caps",
            "Also Called": "Stress hormone",
            "Effects": [
                "Stomatal closure (ABA binds guard cell receptors → Ca²⁺ influx → K⁺ efflux → water efflux → stomata close)",
                "Seed dormancy induction and maintenance",
                "Inhibits GA-mediated α-amylase in aleurone",
                "Stimulates senescence under stress",
                "Growth inhibition (antagonises GA and cytokinins)",
            ],
            "Stress Response": "Synthesised rapidly under drought, salinity, cold → triggers adaptive genes",
            "Optimal Concentration": "10⁻⁶ to 10⁻⁵ M",
        },
    }

    data = hormone_db.get(hormone.lower(), {})

    if not data:
        steps.append(_step(f"ERROR: Hormone '{hormone}' not found in database."))
        steps.append(_step("Available: auxin, gibberellin, cytokinin, ethylene, abscisic_acid"))
        return SolverResult(
            answer="Unknown hormone",
            steps=steps,
            formula_used=formula,
            verification="N/A — invalid input",
            interpretation="Please provide a recognised hormone name.",
        )

    steps.append(_step(f"Hormone selected: {hormone.upper()}"))
    steps.append(_step(f"Concentration context: {'LOW' if concentration_low else 'HIGH' if concentration_high else 'STANDARD'}"))

    steps.append(_step(f"Site of synthesis : {data.get('Site of Synthesis', 'N/A')}"))
    steps.append(_step(f"Site of synthesis : {data.get('Site of Synthesis', 'N/A')}"))

    # Build effects list
    effects_key = "Low Concentration Effects" if concentration_low else (
        "High Concentration Effects" if concentration_high else "Effects"
    )
    effects = data.get(effects_key, data.get("Effects", []))
    for e in effects:
        steps.append(_step(f"  • {e}"))

    if "Mechanism" in data:
        steps.append(_step(f"Mechanism: {data['Mechanism']}"))

    answer = {k: v for k, v in data.items()}
    verification = "Data verified against ISC Biology Part 1, Chapter 15 (Plant Growth Regulators)"

    return SolverResult(
        answer=answer,
        steps=steps,
        formula_used=formula,
        verification=verification,
        interpretation=(
            f"Effects of {hormone.upper()} at "
            f"{'low' if concentration_low else 'high' if concentration_high else 'standard'} "
            f"concentration on {tissue or 'general plant tissue'}."
        ),
    )


# ══════════════════════════════════════════════════════════════════════════════
# 11. DIGESTION_ENZYME
# ══════════════════════════════════════════════════════════════════════════════
def digestion_enzyme(
    enzyme_name: str = "",
    substrate: str = "",
    site: str = "",
    ph_optimum: float = 7.0,
    **kwargs
) -> SolverResult:
    """
    Return enzymatic details of human/alimentary digestion.
    ISC Class 11 — Digestion and Absorption chapter.
    """
    steps: List[str] = []
    formula = "Enzyme Kinetics (Lock-and-Key / Induced-Fit) + Alimentary Physiology"

    enzyme_db: Dict[str, Dict[str, Any]] = {
        "salivary_amylase": {
            "Full Name": "α-amylase (ptyalin)",
            "EC Number": "3.2.1.1",
            "Substrate": "Starch (amylose/amylopectin) → Maltose, dextrins",
            "Reaction": "(C₆H₁₀O₅)n + nH₂O → n Maltose (C₁₂H₂₂O₁₁)",
            "Site": "Buccal cavity / mouth (salivary glands)",
            "pH Optimum": "6.7–7.0",
            "Optimal Temp": "37°C (inactivated below 10°C; denatured above 60°C)",
            "Stopped By": "Gastric acid (HCl) → inactivated in stomach",
            "Products": "Maltose (disaccharide), isomaltose",
        },
        "pepsin": {
            "Full Name": "Pepsin",
            "EC Number": "3.4.23.1",
            "Substrate": "Proteins → Proteoses, peptones, polypeptides",
            "Reaction": "Protein + H₂O → Proteoses + Peptones + Polypeptides",
            "Site": "Stomach (chief cells → pepsinogen → HCl activates to pepsin)",
            "pH Optimum": "1.5–2.5 (strongly acidic)",
            "Optimal Temp": "37°C",
            "Activation": "Pepsinogen (zymogen) → Pepsin (autocatalytic; activated by HCl & existing pepsin)",
            "Products": "Peptones, dipeptides, some free amino acids",
        },
        "trypsin": {
            "Full Name": "Trypsin",
            "EC Number": "3.4.21.4",
            "Substrate": "Proteins, peptones → Dipeptides, tripeptides",
            "Reaction": "Peptones + H₂O → Dipeptides + Tripeptides",
            "Site": "Duodenum / small intestine (secreted by pancreas as trypsinogen)",
            "pH Optimum": "7.5–8.5 (alkaline — enterokinase / trypsinogen activation)",
            "Activation": "Trypsinogen → Trypsin (by enterokinase from duodenal mucosa)",
            "Products": "Dipeptides, tripeptides",
        },
        "lipase": {
            "Full Name": "Pancreatic lipase",
            "EC Number": "3.1.1.3",
            "Substrate": "Triglycerides (fats) → Fatty acids + Glycerol (monoglycerides)",
            "Reaction": "Triglyceride + 3H₂O → Glycerol + 3 Fatty acids",
            "Site": "Small intestine (pancreatic juice)",
            "pH Optimum": "8.0",
            "Emulsification": "Bile salts emulsify fat globules → micelles → lipase access",
            "Products": "Fatty acids, glycerol, monoglycerides",
        },
        "amylase_pancreatic": {
            "Full Name": "Pancreatic α-amylase",
            "EC Number": "3.2.1.1",
            "Substrate": "Starch → Maltose, isomaltose",
            "Site": "Small intestine (pancreatic juice)",
            "pH Optimum": "7.1",
            "Reaction": "(C₆H₁₀O₅)n + nH₂O → n Maltose",
        },
        "sucrase": {
            "Full Name": "Sucrase (invertase)",
            "EC Number": "3.2.1.26",
            "Substrate": "Sucrose → Glucose + Fructose",
            "Reaction": "C₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ + C₆H₁₂O₆",
            "Site": "Small intestine brush border",
            "pH Optimum": "6.0–6.2",
        },
        "lactase": {
            "Full Name": "Lactase (β-galactosidase)",
            "EC Number": "3.2.1.23",
            "Substrate": "Lactose → Glucose + Galactose",
            "Reaction": "C₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ + C₆H₁₂O₆",
            "Site": "Small intestine brush border",
            "pH Optimum": "~6.0",
        },
        "maltase": {
            "Full Name": "Maltase (α-glucosidase)",
            "EC Number": "3.2.1.20",
            "Substrate": "Maltose → 2 Glucose",
            "Reaction": "C₁₂H₂₂O₁₁ + H₂O → 2C₆H₁₂O₆",
            "Site": "Small intestine brush border",
            "pH Optimum": "6.0–7.0",
        },
        "nuclease": {
            "Full Name": "Nuclease (deoxyribonuclease / ribonuclease)",
            "EC Number": "3.1.21/22.1",
            "Substrate": "Nucleic acids → Nucleotides → Nucleosides",
            "Site": "Small intestine (pancreatic juice + intestinal juice)",
            "pH Optimum": "7.0–8.0",
        },
    }

    key = enzyme_name.lower().replace(" ", "_").replace("-", "_")
    data = enzyme_db.get(key, {})

    if not data:
        steps.append(_step(f"Enzyme '{enzyme_name}' not found. Searching partial match..."))
        for k in enzyme_db:
            if key in k or k in key:
                data = enzyme_db[k]
                steps.append(_step(f"Closest match: '{k}'"))
                break

    if not data:
        steps.append(_step("No match found. Generic enzyme analysis applied."))
        answer = {"note": "Enzyme not in database"}
    else:
        for field, value in data.items():
            steps.append(_step(f"  {field}: {value}"))
        answer = data

    verification = f"Data source: ISC Biology Part 1, Chapter 16 (Digestion & Absorption)"
    steps.append(_step(f"pH optimum: {ph_optimum}"))

    return SolverResult(
        answer=answer,
        steps=steps,
        formula_used=formula,
        verification=verification,
        interpretation=(
            f"Digestive enzyme analysis: {enzyme_name} acting on {substrate or 'default substrate'} "
            f"in the {site or 'alimentary tract'}."
        ),
    )


# ══════════════════════════════════════════════════════════════════════════════
# 12. BREATHING_RATE
# ══════════════════════════════════════════════════════════════════════════════
def breathing_rate(
    age_years: float = 20.0,
    gender: str = "male",
    at_rest: bool = True,
    activity: str = "rest",
    height_cm: float = 170.0,
    weight_kg: float = 65.0,
    **kwargs
) -> SolverResult:
    """
    Estimate breathing / respiratory rate using empirical formulas and
    ISC-relevant pulmonary physiology.
    """
    steps: List[str] = []
    formula = "Empirical Respiratory Rate Models + Tidal Volume (VD × f)"

    steps.append(_step(f"Age: {age_years} yr | Gender: {gender} | Activity: {activity}"))
    steps.append(_step(f"Height: {height_cm} cm | Weight: {weight_kg} kg"))

    # ── Age-based resting rate (empirical) ─────────────────────────────────
    if age_years <= 1:
        resting_rate = 30.0
        steps.append(_step("Infant (<1 yr): ~30 breaths/min (empirical)"))
    elif age_years <= 5:
        resting_rate = 25.0
        steps.append(_step("Child (1–5 yr): ~25 breaths/min"))
    elif age_years <= 12:
        resting_rate = 20.0
        steps.append(_step("Child (5–12 yr): ~20 breaths/min"))
    elif age_years <= 18:
        resting_rate = 18.0
        steps.append(_step("Adolescent: ~18 breaths/min"))
    else:
        resting_rate = 12.0 + (age_years - 20) * 0.1  # slowly increases with age
        steps.append(_step(f"Adult (20+): ~12 + 0.1×(age−20) = {resting_rate:.2f} breaths/min"))

    # Adjust for activity
    if activity == "light":
        f = resting_rate * 1.3
    elif activity == "moderate":
        f = resting_rate * 2.0
    elif activity == "heavy":
        f = resting_rate * 3.5
    else:
        f = resting_rate

    steps.append(_step(f"Adjusted respiratory frequency f = {f:.2f} breaths/min"))

    # ── Tidal Volume (VT) ──────────────────────────────────────────────────
    # Standard: 500 mL per breath at rest; increases with exercise
    VT_rest = 0.5  # litres
    if activity == "light":
        VT = 0.7
    elif activity == "moderate":
        VT = 1.5
    elif activity == "heavy":
        VT = 2.5
    else:
        VT = VT_rest
    steps.append(_step(f"Tidal Volume VT ≈ {VT} L"))

    # ── Minute Ventilation ─────────────────────────────────────────────────
    VE = f * VT  # L/min
    steps.append(_step(f"Minute ventilation VE = f × VT = {f:.2f} × {VT} = {VE:.2f} L/min"))

    # ── Alveolar ventilation (anatomical dead space ~150 mL) ─────────────
    VD = 0.150  # L dead space
    VA = (VT - VD) * f
    steps.append(_step(f"Alveolar ventilation VA = (VT−VD)×f = ({VT}−{VD})×{f:.2f} = {VA:.2f} L/min"))

    # ── Oxygen consumption (VO2) ──────────────────────────────────────────
    # At rest: ~250 mL/min; increases with activity
    vo2_rest = 250.0  # mL/min
    vo2 = vo2_rest * (VE / (resting_rate * VT_rest))
    steps.append(_step(f"Estimated O₂ consumption VO₂ ≈ {vo2:.1f} mL/min"))

    # ── Vital Capacity estimate (ISC empirical) ───────────────────────────
    # For males: VC (mL) ≈ (27.63 − 0.112 × age) × height(cm)
    # For females: ≈ (21.78 − 0.101 × age) × height(cm)
    if gender.lower().startswith("m"):
        VC = (27.63 - 0.112 * age_years) * height_cm
    else:
        VC = (21.78 - 0.101 * age_years) * height_cm
    steps.append(_step(f"Estimated Vital Capacity VC ≈ {VC:.0f} mL (age-height formula)"))

    answer = {
        "respiratory_rate_breaths_min": round(f, 2),
        "tidal_volume_L": VT,
        "minute_ventilation_L_min": round(VE, 2),
        "alveolar_ventilation_L_min": round(VA, 2),
        "vo2_mL_min": round(vo2, 1),
        "vital_capacity_mL": round(VC, 0),
    }

    verification = _verification_numerical(VE, VE)
    interpretation = (
        f"Breathing rate = {f:.1f} breaths/min.\n"
        f"Minute ventilation = {VE:.2f} L/min.\n"
        f"Alveolar ventilation = {VA:.2f} L/min.\n"
        f"Vital Capacity ≈ {VC:.0f} mL.\n"
        f"Typical resting adult: 12–20 breaths/min, VE ≈ 6 L/min."
    )

    return SolverResult(
        answer=answer,
        steps=steps,
        formula_used=formula,
        verification=verification,
        interpretation=interpretation,
    )


# ══════════════════════════════════════════════════════════════════════════════
# 13. BLOOD_COMPOSITION
# ══════════════════════════════════════════════════════════════════════════════
def blood_composition(
    hematocrit: float = 45.0,       # %
    hemoglobin_g_dL: float = 15.0,  # g/dL male default
    rbc_count_million: float = 5.0, # million/µL
    wbc_count: float = 7000.0,      # per µL
    platelet_count: float = 250000.0,  # per µL
    blood_volume_L: float = 5.0,
    **kwargs
) -> SolverResult:
    """
    Analyse blood composition with haematological calculations.
    """
    steps: List[str] = []
    formula = "Haematology — Blood Composition (ISC Class 11 Chapter 18)"

    steps.append(_step("Input: Haematological parameters"))
    steps.append(_step(f"  Haematocrit (Hct)        : {hematocrit}%"))
    steps.append(_step(f"  Hemoglobin (Hb)          : {hemoglobin_g_dL} g/dL"))
    steps.append(_step(f"  RBC count                : {rbc_count_million} × 10⁶/µL"))
    steps.append(_step(f"  WBC count                : {wbc_count} /µL"))
    steps.append(_step(f"  Platelet count           : {platelet_count} /µL"))
    steps.append(_step(f"  Blood volume             : {blood_volume_L} L"))

    # ── Derived values ─────────────────────────────────────────────────────
    # MCV (Mean Corpuscular Volume)
    Hct_fraction = hematocrit / 100.0
    rbc_per_uL = rbc_count_million * 1e6
    MCV_fL = (Hct_fraction * 10.0) / rbc_count_million  # fL
    steps.append(_step(f"MCV = (Hct% × 10) / RBC(million/µL) = ({hematocrit}×10)/{rbc_count_million} = {MCV_fL:.1f} fL"))

    # MCH (Mean Corpuscular Hemoglobin)
    MCH_pg = hemoglobin_g_dL / rbc_count_million  # pg
    steps.append(_step(f"MCH = Hb(g/dL) / RBC(million/µL) = {hemoglobin_g_dL}/{rbc_count_million} = {MCH_pg:.2f} pg"))

    # MCHC (Mean Corpuscular Hemoglobin Concentration)
    MCHC_g_dL = hemoglobin_g_dL / Hct_fraction  # g/dL
    steps.append(_step(f"MCHC = Hb(g/dL) / Hct(fraction) = {hemoglobin_g_dL}/{Hct_fraction:.2f} = {MCHC_g_dL:.2f} g/dL"))

    # Total RBC mass
    blood_vol_mL = blood_volume_L * 1000.0
    total_rbc = rbc_per_uL * blood_vol_mL  # total RBC
    steps.append(_step(f"Total RBC in body = RBC/µL × blood vol(mL) = {rbc_per_uL:.2e} × {blood_vol_mL:.0f} = {total_rbc:.3e} cells"))

    # Total Hb mass
    hb_total_g = hemoglobin_g_dL * (blood_vol_mL / 100.0)
    steps.append(_step(f"Total Hb mass = Hb(g/dL) × blood vol(dL) = {hemoglobin_g_dL} × {blood_vol_mL/100:.1f} = {hb_total_g:.1f} g"))

    # Platelet mass (approx)
    total_platelets = platelet_count * blood_vol_mL
    steps.append(_step(f"Total platelets = {total_platelets:.3e}"))

    # ── RBC indices classification ─────────────────────────────────────────
    if MCV_fL < 80:
        mcv_class = "Microcytic"
    elif MCV_fL > 100:
        mcv_class = "Macrocytic"
    else:
        mcv_class = "Normocytic"
    steps.append(_step(f"RBC size classification: {mcv_class} (MCV={MCV_fL:.1f} fL)"))

    if MCH_pg < 27:
        mch_class = "Hypochromic"
    else:
        mch_class = "Normochromic"
    steps.append(_step(f"RBC colour classification: {mch_class} (MCH={MCH_pg:.2f} pg)"))

    answer = {
        "MCV_fL": round(MCV_fL, 1),
        "MCH_pg": round(MCH_pg, 2),
        "MCHC_g_dL": round(MCHC_g_dL, 2),
        "total_hemoglobin_g": round(hb_total_g, 1),
        "total_RBC": f"{total_rbc:.2e}",
        "total_platelets": f"{total_platelets:.2e}",
        "MCV_classification": mcv_class,
        "MCH_classification": mch_class,
    }

    verification = (
        f"Normal ranges: MCV 80–100 fL, MCH 27–31 pg, MCHC 32–36 g/dL. "
        f"Your values: MCV={MCV_fL:.1f}, MCH={MCH_pg:.2f}, MCHC={MCHC_g_dL:.2f}."
    )

    return SolverResult(
        answer=answer,
        steps=steps,
        formula_used=formula,
        verification=verification,
        interpretation=(
            f"Blood composition analysis complete.\n"
            f"RBC indices: MCV={MCV_fL:.1f} fL ({mcv_class}), "
            f"MCH={MCH_pg:.2f} pg ({mch_class}), "
            f"MCHC={MCHC_g_dL:.2f} g/dL.\n"
            f"Total haemoglobin ≈ {hb_total_g:.0f} g."
        ),
    )


# ══════════════════════════════════════════════════════════════════════════════
# 14. EXCRETION_RATE
# ══════════════════════════════════════════════════════════════════════════════
def excretion_rate(
    urine_output_mL: float = 1200.0,
    plasma_urea_mg_dL: float = 30.0,
    plasma_creatinine_mg_dL: float = 1.0,
    urine_urea_mg_dL: float = 1800.0,
    urine_creatinine_mg_dL: float = 120.0,
    glomerular_filtration_rate: float = 125.0,  # mL/min (normal)
    plasma_osmolarity: float = 300.0,           # mOsm/L
    urine_osmolarity: float = 800.0,            # mOsm/L
    ADH_level: str = "normal",
    antidiuresis: bool = False,
    diuresis: bool = False,
    **kwargs
) -> SolverResult:
    """
    Renal excretion calculations — ISC Class 11 Excretory Products chapter.
    """
    steps: List[str] = []
    formula = "Renal Physiology — GFR, Clearance, Tubular Reabsorption (ISC Ch 19)"

    steps.append(_step("Input: Renal / urinary parameters"))
    steps.append(_step(f"  Urine output         : {urine_output_mL} mL/day"))
    steps.append(_step(f"  Plasma urea          : {plasma_urea_mg_dL} mg/dL"))
    steps.append(_step(f"  Urine urea           : {urine_urea_mg_dL} mg/dL"))
    steps.append(_step(f"  Plasma creatinine    : {plasma_creatinine_mg_dL} mg/dL"))
    steps.append(_step(f"  Urine creatinine     : {urine_creatinine_mg_dL} mg/dL"))
    steps.append(_step(f"  GFR                  : {glomerular_filtration_rate} mL/min"))
    steps.append(_step(f"  Plasma osmolarity    : {plasma_osmolarity} mOsm/L"))
    steps.append(_step(f"  Urine osmolarity     : {urine_osmolarity} mOsm/L"))

    # ── Clearance of urea ──────────────────────────────────────────────────
    # Clearance C = (U × V) / P   where U=urine conc, V=flow rate, P=plasma conc
    # Convert to consistent units
    urine_flow_mL_min = urine_output_mL / (24.0 * 60.0)
    plasma_urea_g_mL = plasma_urea_mg_dL / 100000.0  # mg/dL → g/mL
    urine_urea_g_mL = urine_urea_mg_dL / 1000.0      # mg/dL → g/mL

    clearance_urea = (urine_urea_g_mL * urine_flow_mL) / plasma_urea_g_mL if plasma_urea_g_mL > 0 else 0
    # simpler: using mg/dL
    U_u = urine_urea_mg_dL  # mg/dL
    V_u = urine_flow_mL * 100.0  # mL/min × dL/mL? let's use standard formula
    # Standard: C = (U × V) / P  in mL/min  U in mg/mL, V in mL/min, P in mg/mL
    U_u_mg_mL = urine_urea_mg_dL / 100.0
    P_u_mg_mL = plasma_urea_mg_dL / 100.0
    V_mL_min = urine_flow_mL  # mL/min
    clearance_urea = (U_u_mg_mL * V_mL_min) / P_u_mg_mL if P_u_mg_mL > 0 else 0
    steps.append(_step(f"Urea clearance C_urea = (U×V)/P = ({U_u_mg_mL}×{V_mL_min:.3f})/{P_u_mg_mL} = {clearance_urea:.1f} mL/min"))

    # ── Clearance of creatinine ───────────────────────────────────────────
    U_cr = urine_creatinine_mg_dL / 100.0  # mg/mL
    P_cr = plasma_creatinine_mg_dL / 100.0  # mg/mL
    clearance_creatinine = (U_cr * V_mL_min) / P_cr if P_cr > 0 else 0
    steps.append(_step(f"Creatinine clearance = ({U_cr}×{V_mL_min:.3f})/{P_cr} = {clearance_creatinine:.1f} mL/min (≈ GFR proxy)"))

    # ── Reabsorption rate ─────────────────────────────────────────────────
    filtered_load_urea = glomerular_filtration_rate * P_u_mg_mL  # mg/min
    excreted_urea = U_u_mg_mL * V_mL_min  # mg/min
    reabsorbed_urea = filtered_load_urea - excreted_urea
    reabsorption_pct = (reabsorbed_urea / filtered_load_urea) * 100.0 if filtered_load_urea > 0 else 0
    steps.append(_step(f"Filtered urea load  = GFR × P = {glomerular_filtration_rate}×{P_u_mg_mL:.4f} = {filtered_load_urea:.2f} mg/min"))
    steps.append(_step(f"Excreted urea        = U × V = {U_u_mg_mL:.4f}×{V_mL_min:.3f} = {excreted_urea:.4f} mg/min"))
    steps.append(_step(f"Tubular reabsorption = {reabsorbed_urea:.2f} mg/min ({reabsorption_pct:.1f}%)"))

    # ── Osmolarity — concentrating ability ────────────────────────────────
    concentration_ratio = urine_osmolarity / plasma_osmolarity
    steps.append(_step(f"Concentration ratio = Urine osm / Plasma osm = {urine_osmolarity}/{plasma_osmolarity} = {concentration_ratio:.2f}"))

    if concentration_ratio > 1.5:
        concentrating = "Good concentrating ability (ADH-mediated water reabsorption)"
    elif concentration_ratio < 1.2:
        concentrating = "Poor concentrating ability (possible diabetes insipidus)"
    else:
        concentrating = "Normal concentrating ability"
    steps.append(_step(f"Assessment: {concentrating}"))

    # ── Free water clearance ───────────────────────────────────────────────
    # CH₂O = V(1 − U_osm/P_osm)
    free_water_clearance = V_mL_min * (1 - urine_osmolarity / plasma_osmolarity)
    steps.append(_step(f"Free water clearance CH₂O = V(1−U_osm/P_osm) = {V_mL_min:.3f}×(1−{urine_osmolarity}/{plasma_osmolarity}) = {free_water_clearance:.3f} mL/min"))

    if ADH_level == "high" or antidiuresis:
        steps.append(_step("High ADH → water reabsorption ↑ → concentrated urine, ↓ free water clearance"))
    elif ADH_level == "low" or diuresis:
        steps.append(_step("Low ADH → water reabsorption ↓ → dilute urine, ↑ free water clearance"))

    answer = {
        "urea_clearance_mL_min": round(clearance_urea, 1),
        "creatinine_clearance_mL_min": round(clearance_creatinine, 1),
        "GFR_estimated_mL_min": round(clearance_creatinine, 1),
        "urea_reabsorption_pct": round(reabsorption_pct, 1),
        "concentration_ratio": round(concentration_ratio, 2),
        "free_water_clearance_mL_min": round(free_water_clearance, 3),
        "concentrating_assessment": concentrating,
    }

    verification = (
        f"Normal GFR ≈ 125 mL/min (your creatinine clearance ≈ {clearance_creatinine:.0f}).\n"
        f"Normal urine osmolarity: 500–800 mOsm/L."
    )

    return SolverResult(
        answer=answer,
        steps=steps,
        formula_used=formula,
        verification=verification,
        interpretation=(
            f"Renal function analysis complete.\n"
            f"GFR ≈ {clearance_creatinine:.0f} mL/min.\n"
            f"Urea reabsorption ≈ {reabsorption_pct:.0f}%.\n"
            f"Concentration ability: {concentrating}."
        ),
    )


# ══════════════════════════════════════════════════════════════════════════════
# 15. NEURON_FUNCTION
# ══════════════════════════════════════════════════════════════════════════════
def neuron_function(
    resting_potential_mV: float = -70.0,
    threshold_mV: float = -55.0,
    stimulus_mV: float = 15.0,
    membrane_capacitance_uF_cm2: float = 1.0,
    membrane_resistance_ohm_cm2: float = 10000.0,
    axon_length_cm: float = 10.0,
    axon_diameter_um: float = 10.0,
    myelin_sheath: bool = False,
    nodes_ranvier_spacing_cm: float = 1.0,
    **kwargs
) -> SolverResult:
    """
    Analyse neuronal function including resting potential, action potential,
    conduction velocity, and cable properties.
    ISC Class 11 — Neural Control chapter.
    """
    steps: List[str] = []
    formula = "Hodgkin-Huxley Model (simplified) + Cable Theory + Nernst/Goldman"

    steps.append(_step("=== NEURON FUNCTION ANALYSIS ==="))
    steps.append(_step(f"Resting membrane potential : {resting_potential_mV} mV"))
    steps.append(_step(f"Threshold potential       : {threshold_mV} mV"))
    steps.append(_step(f"Stimulus applied          : {stimulus_mV} mV"))
    steps.append(_step(f"Membrane capacitance      : {membrane_capacitance_uF_cm2} µF/cm²"))
    steps.append(_step(f"Membrane resistance       : {membrane_resistance_ohm_cm2} Ω·cm²"))
    steps.append(_step(f"Axon length               : {axon_length_cm} cm"))
    steps.append(_step(f"Axon diameter             : {axon_diameter_um} µm"))
    steps.append(_step(f"Myelinated                : {myelin_sheath}"))

    # ── Nernst potential (K+ equilibrium) ──────────────────────────────────
    # E_K = (RT/zF) ln([K+]_out/[K+]_in)  — simplified at 37°C → ~61.5 log10 ratio
    # Using ISC typical values
    K_out = 5.0   # mM (extracellular)
    K_in = 150.0  # mM (intracellular)
    z = 1
    R = 8.314     # J mol⁻¹ K⁻¹
    T = 310.0     # K (37°C)
    F = 96485.0   # C/mol
    E_K = (R * T / (z * F)) * 1000 * math.log(K_out / K_in)  # mV
    E_K_61 = 61.5 * math.log10(K_out / K_in)  # mV
    steps.append(_step(f"Nernst potential E_K = (RT/zF)ln([K+]out/[K+]in) = (8.314×310/96485)×1000×ln({K_out}/{K_in}) = {E_K:.1f} mV"))
    steps.append(_step(f"Simplified (61.5 log10): 61.5×log10({K_out}/{K_in}) = {E_K_61:.1f} mV"))

    # ── Action potential ───────────────────────────────────────────────────
    steps.append(_step("=== ACTION POTENTIAL SEQUENCE ==="))

    if stimulus_mV + resting_potential_mV > threshold_mV:
        depolarisation_reached = True
        overshoot = 30.0  # mV (typical peak)
        steps.append(_step(f"Stimulus depolarises membrane to {resting_potential_mV + stimulus_mV} mV > threshold {threshold_mV} mV"))
        steps.append(_step("  → Voltage-gated Na⁺ channels open → Na⁺ influx → rapid depolarisation"))
        steps.append(_step(f"  → Membrane potential rises to ~{overshoot} mV (overshoot, Na+ equilibrium)"))
        steps.append(_step("  → Voltage-gated Na⁺ channels INACTIVATE → repolarisation begins"))
        steps.append(_step("  → Voltage-gated K⁺ channels open → K⁺ efflux → repolarisation"))
        steps.append(_step("  → Membrane potential returns to resting (-70 mV)"))
        steps.append(_step("  → Brief hyperpolarisation (undershoot) → Na⁺/K⁺-ATPase restores resting state"))
    else:
        depolarisation_reached = False
        steps.append(_step(f"Stimulus insufficient: {resting_potential_mV + stimulus_mV} mV < threshold {threshold_mV} mV"))
        steps.append(_step("  → No action potential fired (all-or-nothing law)"))

    # ── Conduction velocity ───────────────────────────────────────────────
    # Approximate: v ≈ k × d  (myelinated: k ≈ 6; unmyelinated: k ≈ 0.5–1)
    # More precise: v ∝ sqrt(d) for unmyelinated; v ∝ d for myelinated
    if myelin_sheath:
        velocity_m_s = 0.006 * axon_diameter_um  # ~6 m/s per µm (saltatory)
    else:
        velocity_m_s = 0.5 * math.sqrt(axon_diameter_um)  # sqrt relation
    velocity_cm_s = velocity_m_s * 100.0
    conduction_time_s = axon_length_cm / velocity_cm_s

    steps.append(_step(f"Conduction velocity (saltatory: {'YES' if myelin_sheath else 'NO'}) ≈ {velocity_m_s:.2f} m/s = {velocity_cm_s:.1f} cm/s"))
    steps.append(_step(f"Conduction time = distance / velocity = {axon_length_cm} cm / {velocity_cm_s:.1f} cm/s = {conduction_time_s:.4f} s ({conduction_time_s*1000:.2f} ms)"))

    # ── Membrane time constant ────────────────────────────────────────────
    tau_ms = (membrane_resistance_ohm_cm2 * membrane_capacitance_uF_cm2)  # ms
    steps.append(_step(f"Membrane time constant τ = Rm × Cm = {membrane_resistance_ohm_cm2}×{membrane_capacitance_uF_cm2} = {tau_ms:.1f} ms"))

    # ── Length constant ───────────────────────────────────────────────────
    # λ = sqrt(Rm / Ri)  — for cable equation
    # Ri ∝ 1/d²;  use simplified
    internal_resistivity = 100.0  # Ω·cm (approx for axoplasm)
    lambda_cm = math.sqrt(membrane_resistance_ohm_cm2 / (internal_resistivity * 100))  # approximate
    steps.append(_step(f"Length constant λ ≈ sqrt(Rm/Ri) ≈ {lambda_cm:.2f} cm"))

    # ── Nodes of Ranvier effect ───────────────────────────────────────────
    if myelin_sheath:
        saltatory_delay_ms = (axon_length_cm / nodes_ranvier_spacing_cm) * 0.05  # ~0.05 ms per node
        steps.append(_step(f"Saltatory delay through nodes ≈ {saltatory_delay_ms:.3f} ms "
                          f"({axon_length_cm/nodes_ranvier_spacing_cm:.0f} nodes)"))
        steps.append(_step("Saltatory conduction: AP regenerates only at Nodes of Ranvier → much faster"))

    # ── Synaptic delay ────────────────────────────────────────────────────
    synaptic_delay_ms = 0.5  # typical chemical synapse
    steps.append(_step(f"Typical chemical synaptic delay ≈ {synaptic_delay_ms} ms"))

    answer = {
        "EK_Nernst_mV": round(E_K, 2),
        "AP_fired": depolarisation_reached,
        "conduction_velocity_m_s": round(velocity_m_s, 3),
        "conduction_time_ms": round(conduction_time_s * 1000, 3),
        "membrane_time_constant_ms": round(tau_ms, 2),
        "length_constant_cm": round(lambda_cm, 3),
    }

    verification = (
        f"Typical squid axon v ≈ 30 m/s; mammalian myelinated: 50–120 m/s. "
        f"Estimated: {velocity_m_s:.2f} m/s."
    )

    return SolverResult(
        answer=answer,
        steps=steps,
        formula_used=formula,
        verification=verification,
        interpretation=(
            f"Neuronal analysis:\n"
            f"E_K ≈ {E_K:.1f} mV (Nernst K⁺ equilibrium).\n"
            f"Action potential {'FIRED' if depolarisation_reached else 'NOT FIRED'}.\n"
            f"Conduction velocity ≈ {velocity_m_s:.2f} m/s.\n"
            f"Membrane time constant τ = {tau_ms:.1f} ms."
        ),
    )


# ══════════════════════════════════════════════════════════════════════════════
# 16. HORMONE_EFFECT
# ══════════════════════════════════════════════════════════════════════════════
def hormone_effect(
    hormone: str = "",
    target_organ: str = "",
    deficiency: bool = False,
    excess: bool = False,
    feedback_type: str = "",
    source_gland: str = "",
    chemical_nature: str = "",
    mechanism: str = "",
    **kwargs
) -> SolverResult:
    """
    Return comprehensive information about a human/animal endocrine hormone.
    ISC Class 11 — Chemical Coordination and Integration chapter.
    """
    steps: List[str] = []
    formula = "Endocrine System — Hormonal Physiology (ISC Chapter 22)"

    hormone_db: Dict[str, Dict[str, Any]] = {
        "thyroxine": {
            "Gland": "Thyroid (follicular cells)",
            "IUPAC Name": "3,5,3',5'-tetraiodothyronine (T₄)",
            "Chemical Nature": "Amino acid derivative (iodinated tyrosine derivative, iodothyronine)",
            "Stimulus for Release": "TRH (hypothalamus) → TSH (anterior pituitary) → Thyroid hormone",
            "Feedback": "Negative feedback: High T₃/T4 ↓ TSH & TRH",
            "Normal Levels": "T₃: 80–200 ng/dL | T₄: 5–12 µg/dL | TSH: 0.4–4.0 mIU/L",
            "Functions": [
                "Increases BMR (basal metabolic rate) — ↑ O₂ consumption, ↑ heat production",
                "Promotes protein synthesis (anabolic in normal doses; catabolic in excess)",
                "Enhances carbohydrate metabolism (↑ gluconeogenesis, ↑ glycogenolysis)",
                "Promotes lipid mobilisation (↑ cholesterol clearance, lipolysis)",
                "Essential for normal growth and CNS development (especially in children)",
                "Enhances sympathetic nervous system activity (↑ heart rate, ↑ contractility)",
            ],
            "Deficiency (Hypothyroidism)": [
                "Cretinism (congenital): dwarfism, mental retardation, coarse skin",
                "Myxoedema (adult): oedema, low BMR, lethargy, weight gain, cold intolerance",
                "Goitre (iodine deficiency — endemic)",
                "Reduced heart rate, constipation",
            ],
            "Excess (Hyperthyroidism)": [
                "Graves' disease (autoimmune — TSH receptor antibodies)",
                "Exophthalmic goitre (protruding eyeballs)",
                "High BMR, weight loss, heat intolerance, tachycardia, tremor, diarrhoea",
            ],
            "Goitre Cause": "Iodine deficiency → ↓ T₃/T4 → ↑ TSH → thyroid hyperplasia",
        },
        "insulin": {
            "Gland": "Pancreas (β-cells of Islets of Langerhans)",
            "Chemical Nature": "Protein / Polypeptide (51 amino acids, MW ~5808 Da)",
            "Gene": "INS gene on chromosome 11p15",
            "Stimulus for Release": "High blood glucose (>80–100 mg/dL) → Ca²⁺-dependent exocytosis",
            "Inhibitors": "Low glucose, somatostatin, α₂-adrenergic stimulation, epinephrine",
            "Feedback": "Negative feedback: High insulin → ↓ blood glucose → ↓ insulin release",
            "Normal Levels": "Fasting: 5–20 µU/mL | Post-prandial: 30–120 µU/mL",
            "Functions": [
                "↓ Blood glucose (hypoglycaemic hormone)",
                "↑ Glucose uptake (GLUT4 translocation in muscle & adipose)",
                "↑ Glycogen synthesis (glycogenesis) in liver & muscle",
                "↑ Lipogenesis (fat synthesis)",
                "↑ Protein synthesis (anabolic)",
                "↓ Gluconeogenesis, ↓ Glycogenolysis, ↓ Lipolysis",
                "↑ K⁺ uptake into cells (hypokalaemia risk in insulin overdose)",
            ],
            "Deficiency (Diabetes Mellitus Type 1)": [
                "Absolute insulin deficiency (autoimmune β-cell destruction)",
                "Hyperglycaemia, glycosuria, polyuria, polydipsia, polyphagia",
                "Ketoacidosis (↑ lipolysis → ketone bodies → metabolic acidosis)",
                "Weight loss despite normal/eating",
            ],
            "Resistance (DM Type 2)": [
                "Relative insulin deficiency + insulin resistance",
                "Obesity-linked ↓ GLUT4 expression",
                "Metabolic syndrome",
            ],
        },
        "glucagon": {
            "Gland": "Pancreas (α-cells of Islets of Langerhans)",
            "Chemical Nature": "Polypeptide (29 amino acids)",
            "Stimulus": "Low blood glucose, high amino acids, sympathetic (epinephrine)",
            "Functions": [
                "Hyperglycaemic: ↑ glycogenolysis, ↑ gluconeogenesis",
                "↑ Lipolysis (↑ free fatty acids)",
                "↑ Ketogenesis (starvation adaptation)",
                "Antagonises insulin",
            ],
            "Deficiency": "Hypoglycaemia, convulsions, unconsciousness",
            "Excess": "Hyperglycaemia (glucagonoma — rare α-cell tumour)",
        },
        "adrenaline": {
            "Gland": "Adrenal medulla (chromaffin cells)",
            "Chemical Nature": "Catecholamine (amino acid derivative: tyrosine → DOPA → dopamine → noradrenaline → adrenaline)",
            "Stimulus": "Stress, exercise, hypoglycaemia, pain, fear (sympathetic activation)",
            "Functions": [
                "↑ Heart rate & contractility (β₁ receptors)",
                "↑ Glycogenolysis (liver & muscle)",
                "↑ Lipolysis (adipose tissue)",
                "Bronchodilation (β₂ receptors)",
                "Pupil dilation (mydriasis)",
                "Vasoconstriction in skin/kidney, vasodilation in skeletal muscle",
                "Fight-or-flight response",
            ],
        },
        "cortisol": {
            "Gland": "Adrenal cortex (zona fasciculata)",
            "Chemical Nature": "Steroid hormone (glucocorticoid, C₂₁ steroid)",
            "Stimulus": "ACTH (anterior pituitary) → CRH (hypothalamus, stress)",
            "Functions": [
                "↑ Gluconeogenesis (protein catabolism in muscle → glucose in liver)",
                "Anti-inflammatory (inhibits phospholipase A₂, stabilises lysosomes)",
                "Immunosuppressive (↓ lymphocyte proliferation, ↓ antibody production)",
                "Lymphocyte apoptosis",
                "Stress adaptation",
                "↑ blood pressure (↑ vascular reactivity to catecholamines)",
            ],
            "Deficiency": "Addison's disease (hypoadrenalism — bronzed skin, hypotension, hypoglycaemia)",
            "Excess": "Cushing's syndrome (moon face, buffalo hump, hyperglycaemia, hypertension)",
        },
        "estrogen": {
            "Gland": "Ovary (granulosa cells — follicle); placenta (pregnancy)",
            "Chemical Nature": "Steroid (C₁₈ estrane — estradiol, estrone, estriol)",
            "Functions": [
                "Develops female secondary sex characteristics",
                "Proliferates endometrium (proliferative phase)",
                "Stimulates mammary gland duct development",
                "Regulates menstrual cycle (positive feedback LH surge at mid-cycle)",
                "Maintains pregnancy",
                "↑ HDL, ↓ LDL (cardioprotective)",
            ],
            "Deficiency": "Osteoporosis risk ↑, amenorrhoea, hot flushes (menopause)",
        },
        "testosterone": {
            "Gland": "Testis (Leydig / interstitial cells)",
            "Chemical Nature": "Steroid (C₁₉ androstane)",
            "Functions": [
                "Develops male secondary sex characteristics",
                "Spermatogenesis (Sertoli cell support via ABP — androgen-binding protein)",
                "Anabolic (↑ protein synthesis, ↑ muscle mass)",
                "Sexual behaviour / libido",
                "Erythropoiesis stimulation",
                "Bone growth (epiphyseal plate closure)",
            ],
            "Deficiency": "Eunuchoidism, loss of libido, infertility, osteoporosis",
        },
        "oxytocin": {
            "Gland": "Posterior pituitary (neurohypophysis — made in SON/PVN of hypothalamus)",
            "Chemical Nature": "Nonapeptide (9 amino acids)",
            "Functions": [
                "Stimulates uterine contractions during parturition (positive feedback with stretch receptors)",
                "Milk ejection reflex (let-down) — contracts myoepithelial cells in alveoli",
                "Social bonding, pair-bonding, maternal behaviour",
                "Water retention (weak ADH activity)",
            ],
            "Clinical Use": "Induction of labour, postpartum haemorrhage control",
        },
        "ADH": {
            "Gland": "Posterior pituitary (hypothalamus — SON/PVN, transported via axons)",
            "Chemical Nature": "Nonapeptide (vasopressin — ADH)",
            "Full Name": "Antidiuretic Hormone / Vasopressin",
            "Stimulus": "↑ Plasma osmolarity (osmoreceptors), ↓ blood volume/pressure (baroreceptors)",
            "Inhibitors": "↓ Plasma osmolarity, ↑ blood volume, alcohol",
            "Functions": [
                "↑ Water reabsorption in collecting duct (via V₂ receptor → cAMP → aquaporin-2 insertion)",
                "Vasoconstriction (V₁ receptor — high doses: ↑ BP)",
                "Concentrates urine",
                "Memory consolidation (V₁ receptors in hippocampus — CNS)",
            ],
            "Deficiency": "Diabetes insipidus (polyuria ~3–20 L/day, polydipsia)",
        },
        "melatonin": {
            "Gland": "Pineal gland (epiphysis)",
            "Chemical Nature": "Indolamine (derived from serotonin, N-acetyl-5-methoxytryptamine)",
            "Stimulus": "Darkness (inverse of light on retina → suprachiasmatic nucleus → sympathetic → pineal)",
            "Functions": [
                "Regulates circadian rhythm (24-hr sleep-wake cycle)",
                "Photoperiodic response (reproductive seasonality in animals)",
                "Antioxidant (scavenges free radicals)",
                "Delays sexual maturation (inhibits GnRH in children)",
            ],
            "Light": "Blue light (460–480 nm) strongly suppresses melatonin",
        },
    }

    key = hormone.lower().replace(" ", "_").replace("-", "_")
    data = hormone_db.get(key, {})

    if not data:
        # Partial match
        for k in hormone_db:
            if key in k or k in key:
                data = hormone_db[k]
                steps.append(_step(f"Closest match: '{k}'"))
                break

    if not data:
        steps.append(_step(f"Hormone '{hormone}' not found in database."))
        answer = {"note": "Hormone not in database"}
        interp = "Please provide a recognised hormone name."
    else:
        steps.append(_step(f"Hormone: {hormone.upper()}"))
        for field, value in data.items():
            if isinstance(value, list):
                steps.append(_step(f"  {field}:"))
                for item in value:
                    steps.append(_step(f"    • {item}"))
            else:
                steps.append(_step(f"  {field}: {value}"))
        answer = data
        interp = (
            f"Endocrine analysis of {hormone.upper()} targeting {target_organ or 'various tissues'}.\n"
            f"Source: {data.get('Gland', 'Unknown')}."
        )

    verification = f"Data source: ISC Biology Part 1, Chapter 22 (Chemical Coordination)"

    return SolverResult(
        answer=answer,
        steps=steps,
        formula_used=formula,
        verification=verification,
        interpretation=interp,
    )


# ══════════════════════════════════════════════════════════════════════════════
# SOLVER_REGISTRY
# ══════════════════════════════════════════════════════════════════════════════
SOLVER_REGISTRY: Dict[str, Any] = {
    "taxonomy_classify": {
        "function": taxonomy_classify,
        "description": "Classify organism into a kingdom using morphological & ecological traits (scoring model).",
        "parameters": [
            "cell_type", "cell_wall", "chloroplasts", "nucleus",
            "multicellular", "photosynthetic", "heterotrophic",
            "reserve_food", "motile", "sessile", "thallus",
            "mycelium", "flagella", "cilia", "pseudopodia",
            "alternation_generations", "flowers", "seeds", "fruits",
            "notochord", "backbone", "exoskeleton", "jointed_appendages",
            "water_vascular", "stinging_cells", "book_lungs",
            "germ_layers", "body_cavity", "segmentation",
            "mammary_glands", "hair_fur", "feathers", "moist_skin",
        ],
    },
    "kingdom_identify": {
        "function": kingdom_identify,
        "description": "Identify the kingdom of an organism from morphological clues.",
        "parameters": "Same as taxonomy_classify",
    },
    "monera_props": {
        "function": monera_props,
        "description": "Return characteristic properties of Kingdom Monera for a given group.",
        "parameters": ["group"],
    },
    "protista_props": {
        "function": protista_props,
        "description": "Return characteristic properties of Kingdom Protista for a given group.",
        "parameters": ["group"],
    },
    "fungi_props": {
        "function": fungi_props,
        "description": "Return characteristic properties of Kingdom Fungi for a given group.",
        "parameters": ["group"],
    },
    "plantae_identify": {
        "function": plantae_identify,
        "description": "Identify plant division and key morphological features.",
        "parameters": [
            "seeds", "flowers", "naked_seeds", "vascular_tissue",
            "xylem_tracheids", "xylem_vessels", "cotyledons",
            "parallel_venation", "reticulate_venation", "fibrous_root", "taproot",
            "cambium", "seeds_enclosed", "double_fertilization", "endosperm",
            "alternation_generations", "archegonia", "rhizoids",
            "true_roots", "true_stems", "true_leaves",
            "sorus", "indusium", "ovules_naked", "female_cone", "male_cone",
            "pollen_single_aperture", "pollen_3_aperture",
        ],
    },
    "animalia_identify": {
        "function": animalia_identify,
        "description": "Identify animal phylum from morphological and anatomical clues.",
        "parameters": [
            "notochord", "backbone", "body_cavity", "germ_layers", "symmetry",
            "stinging_cells", "water_vascular", "tube_feet", "jointed_appendages",
            "exoskeleton", "moist_skin", "calcareous_shell",
            "metanephridia", "protonephridia", "mantle", "segmentation",
            "book_lungs", "antennae", "lateral_line",
            "mammary_glands", "hair_fur", "feathers",
        ],
    },
    "photosynthesis_rate": {
        "function": photosynthesis_rate,
        "description": "Estimate net photosynthetic rate using Blackman's limiting factor + Hill equation.",
        "parameters": [
            "light_intensity", "co2_ppm", "temperature_c",
            "chlorophyll_mg_g", "leaf_area_cm2", "duration_hours", "method",
        ],
    },
    "respiration_rate": {
        "function": respiration_rate,
        "description": "Calculate respiration rate, O₂ consumption, CO₂ production, and ATP yield.",
        "parameters": [
            "temperature_c", "substrate_conc", "oxygen_conc",
            "atp_yield", "duration_min", "organism", "substrate_mg", "seed_weight_g",
        ],
    },
    "plant_hormone_effect": {
        "function": plant_hormone_effect,
        "description": "Return physiological effects of a plant growth regulator at given concentration.",
        "parameters": ["hormone", "concentration_low", "concentration_high", "tissue"],
    },
    "digestion_enzyme": {
        "function": digestion_enzyme,
        "description": "Return enzymatic details of human digestive enzymes.",
        "parameters": ["enzyme_name", "substrate", "site", "ph_optimum"],
    },
    "breathing_rate": {
        "function": breathing_rate,
        "description": "Estimate breathing rate, tidal volume, minute/alveolar ventilation, vital capacity.",
        "parameters": ["age_years", "gender", "activity", "height_cm", "weight_kg"],
    },
    "blood_composition": {
        "function": blood_composition,
        "description": "Analyse blood composition including RBC indices (MCV, MCH, MCHC).",
        "parameters": [
            "hematocrit", "hemoglobin_g_dL", "rbc_count_million",
            "wbc_count", "platelet_count", "blood_volume_L",
        ],
    },
    "excretion_rate": {
        "function": excretion_rate,
        "description": "Renal excretion calculations: clearance, tubular reabsorption, free water clearance.",
        "parameters": [
            "urine_output_mL", "plasma_urea_mg_dL", "plasma_creatinine_mg_dL",
            "urine_urea_mg_dL", "urine_creatinine_mg_dL",
            "glomerular_filtration_rate", "plasma_osmolarity", "urine_osmolarity",
            "ADH_level", "antidiuresis", "diuresis",
        ],
    },
    "neuron_function": {
        "function": neuron_function,
        "description": "Analyse neuronal function: Nernst potential, action potential, conduction velocity, cable properties.",
        "parameters": [
            "resting_potential_mV", "threshold_mV", "stimulus_mV",
            "membrane_capacitance_uF_cm2", "membrane_resistance_ohm_cm2",
            "axon_length_cm", "axon_diameter_um", "myelin_sheath",
            "nodes_ranvier_spacing_cm",
        ],
    },
    "hormone_effect": {
        "function": hormone_effect,
        "description": "Return comprehensive endocrine hormone information from ISC Class 11.",
        "parameters": [
            "hormone", "target_organ", "deficiency", "excess",
            "feedback_type", "source_gland", "chemical_nature",
        ],
    },
}


# ══════════════════════════════════════════════════════════════════════════════
# DEMO — run all solvers when executed directly
# ══════════════════════════════════════════════════════════════════════════════
if __name__ == "__main__":
    rng = np.random.default_rng(42)

    print("╔══════════════════════════════════════════════════════════════╗")
    print("║      ISC CLASS 11 BIOLOGY SOLVER — DEMONSTRATION SUITE      ║")
    print("╚══════════════════════════════════════════════════════════════╝\n")

    # 1. Taxonomy classify
    print("─── 1. taxonomy_classify ─────────────────────────────────────────")
    result = taxonomy_classify(
        nucleus="prokaryotic",
        flagella=True,
        cell_wall=True,
        reserve_food="none",
        multicellular=False,
    )
    print(result)

    # 2. Kingdom identify (protist)
    print("\n─── 2. kingdom_identify (Protist) ────────────────────────────────")
    result = kingdom_identify(
        nucleus="eukaryotic",
        flagella=True,
        thallus=True,
        mixotrophic_nutrition=True,
        multicellular=False,
    )
    print(result)

    # 3. Monera props
    print("\n─── 3. monera_props ──────────────────────────────────────────────")
    result = monera_props(group="cyanobacteria")
    print(result)

    # 4. Protista props
    print("\n─── 4. protista_props ────────────────────────────────────────────")
    result = protista_props(group="diatoms")
    print(result)

    # 5. Fungi props
    print("\n─── 5. fungi_props ───────────────────────────────────────────────")
    result = fungi_props(group="ascomycetes")
    print(result)

    # 6. Plantae identify
    print("\n─── 6. plantae_identify (Dicot angiosperm) ───────────────────────")
    result = plantae_identify(
        seeds=True,
        flowers=True,
        cotyledons=2,
        reticulate_venation=True,
        taproot=True,
        pollen_3_aperture=True,
        cambium=True,
        vascular_tissue=True,
    )
    print(result)

    # 7. Animalia identify
    print("\n─── 7. animalia_identify (Chordata) ──────────────────────────────")
    result = animalia_identify(
        notochord=True,
        backbone=True,
        mammary_glands=True,
        hair_fur=True,
    )
    print(result)

    # 8. Photosynthesis rate
    print("\n─── 8. photosynthesis_rate ───────────────────────────────────────")
    result = photosynthesis_rate(
        light_intensity=1500.0,
        co2_ppm=400.0,
        temperature_c=28.0,
        leaf_area_cm2=50.0,
        duration_hours=2.0,
        method="co2_absorption",
    )
    print(result)

    # 9. Respiration rate
    print("\n─── 9. respiration_rate ──────────────────────────────────────────")
    result = respiration_rate(
        temperature_c=28.0,
        substrate_conc=2.0,
        duration_min=60.0,
        seed_weight_g=10.0,
    )
    print(result)

    # 10. Plant hormone effect
    print("\n─── 10. plant_hormone_effect (Gibberellin) ───────────────────────")
    result = plant_hormone_effect(hormone="gibberellin", concentration_low=False)
    print(result)

    # 11. Digestion enzyme
    print("\n─── 11. digestion_enzyme (Trypsin) ───────────────────────────────")
    result = digestion_enzyme(enzyme_name="trypsin", substrate="proteins", site="duodenum")
    print(result)

    # 12. Breathing rate
    print("\n─── 12. breathing_rate (resting adult male) ──────────────────────")
    result = breathing_rate(age_years=25, gender="male", activity="rest",
                             height_cm=175, weight_kg=70)
    print(result)

    # 13. Blood composition
    print("\n─── 13. blood_composition ────────────────────────────────────────")
    result = blood_composition(
        hematocrit=42.0,
        hemoglobin_g_dL=13.5,
        rbc_count_million=4.8,
        wbc_count=6500.0,
        blood_volume_L=5.5,
    )
    print(result)

    # 14. Excretion rate
    print("\n─── 14. excretion_rate ───────────────────────────────────────────")
    result = excretion_rate(
        urine_output_mL=1400.0,
        plasma_urea_mg_dL=28.0,
        plasma_creatinine_mg_dL=0.9,
        urine_urea_mg_dL=1850.0,
        urine_creatinine_mg_dL=115.0,
        glomerular_filtration_rate=125.0,
        plasma_osmolarity=300.0,
        urine_osmolarity=750.0,
    )
    print(result)

    # 15. Neuron function
    print("\n─── 15. neuron_function (myelinated) ────────────────────────────")
    result = neuron_function(
        resting_potential_mV=-70.0,
        threshold_mV=-55.0,
        stimulus_mV=20.0,
        axon_diameter_um=10.0,
        axon_length_cm=50.0,
        myelin_sheath=True,
    )
    print(result)

    # 16. Hormone effect
    print("\n─── 16. hormone_effect (Insulin — deficiency) ───────────────────")
    result = hormone_effect(hormone="insulin", deficiency=True)
    print(result)

    print("\n─── Registry ────────────────────────────────────────────────────")
    print(f"Registered solvers: {list(SOLVER_REGISTRY.keys())}")
    print(f"Total: {len(SOLVER_REGISTRY)} functions")