#!/usr/bin/env python3
"""
build_legacy_sim_map.py -- inventory legacy sims and issue dedupe verdicts vs sims_v2.

Scope (read-only):
  frontend/components/simulations/class1..class5, maths, plus any other loose
  subject folder at the simulations root that is NOT owned by another mapper:
    - excluded: c6_12* (owned by the c6_12 mapper), three/, _* (_backup/_archive),
      node_modules
  Root-level loose .tsx files are inventoried as shared widgets (not topic sims).

Dedupe reference:
  frontend/components/sims_v2/SIMS_V2_QUALITY.json (176 audited v2 entries).

Verdict rules (deterministic, applied to the curated topic match):
  SUPERSEDED   a same-class-band v2 entry covers the topic with verdict PERFECT/GOOD
               (quality flaws inside v2 are recorded as notes, not kept as files).
  KEEP-MASTER  a same-class-band v2 entry exists but is inadequate: verdict
               THIN/BROKEN, or its audit issues flag off-topic generator filler /
               degenerate question generation while the legacy file is a rich
               bespoke component (>= KEEP_MASTER_MIN_LINES lines).
  KEEP-UNIQUE  no same-class-band v2 entry covers the topic (v2 lacks it), or
               only a cross-class v2 entry is topic-adjacent (noted, never used
               to supersede).
  STRICT RULE: cross-class v2 entries NEVER supersede; they are only noted.

Output:
  frontend/components/sims_v2/LEGACY_SIM_MAP.json  (the only file written)

Deterministic: no timestamps; runs are byte-identical while inputs are unchanged
(input file hashes are embedded so re-runs are verifiable).

Usage:
  python backend/tools/build_legacy_sim_map.py [--check]
  --check  : verify the existing output matches a fresh build (exit 1 on drift)
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from pathlib import Path

# ---------------------------------------------------------------- paths
PLATFORM_ROOT = Path(__file__).resolve().parents[2]
FRONTEND = PLATFORM_ROOT / "frontend"
SIMS_DIR = FRONTEND / "components" / "simulations"
V2_DIR = FRONTEND / "components" / "sims_v2"
V2_QUALITY = V2_DIR / "SIMS_V2_QUALITY.json"
OUTPUT = V2_DIR / "LEGACY_SIM_MAP.json"

# folders never inventoried here (owned by other mappers / archives / engine)
EXCLUDED_DIR_PREFIXES = ("_", "c6_12", "node_modules")
EXCLUDED_DIRS = {"three"}

CLASS_FOLDERS = {"class1": "1", "class2": "2", "class3": "3", "class4": "4", "class5": "5"}
UNPINNED_FOLDERS = {"maths"}  # loose subject folders not pinned to a class band

# legacy richness threshold for KEEP-MASTER rule (bespoke component evidence)
KEEP_MASTER_MIN_LINES = 600

CISCE_RE = re.compile(r"\bc(\d+)_([a-z]+)_(\d+)\b")
TITLE_COMMENT_RE = re.compile(r"^\s*\*\s*([A-Z][\w ]*?)(?:\s+[-\u2014\u2013:]|\s*$)")
TITLE_CONST_RE = re.compile(r"\b(?:title|TITLE)\s*[:=]\s*['\"]([^'\"]{4,})['\"]")

SUBJECT_BY_NODE = {
    "math": "maths",
    "evs": "evs",
    "bio": "science",
    "chem": "science",
    "phy": "science",
    "geo": "social",
    "cs": "cs",
    "comp": "cs",
}

# fallback subject inference from filename tokens (files without CISCE headers)
SUBJECT_BY_TOKEN = [
    ("cs", {"computer", "cs", "word", "powerpoint", "internet", "software", "scratch",
            "logo", "paint", "files", "memory", "browser", "desktop", "history"}),
    ("maths", {"math", "addsub", "muldiv", "number", "numbers", "fraction", "fractions",
               "decimal", "decimals", "integer", "integers", "patterns", "shapes",
               "measurement", "factors", "operations", "percentage", "area", "perimeter",
               "angles", "mental", "time", "data", "weight", "capacity", "large"}),
    ("social", {"map", "maps", "india", "climate", "continent", "continents", "globe",
                "earth", "lat", "long", "economy", "location", "directions", "landforms"}),
    ("evs", {"evs", "environment", "neighbourhood", "safety", "clean", "food", "living"}),
]

V2_WEAK_ISSUE_RE = re.compile(
    r"filler|off-topic|1 unique question|never be graded correct", re.IGNORECASE
)


# ---------------------------------------------------------------- curated table
# Relative path (posix) -> curated metadata.  `v2` lists same-class-band sims_v2
# simIds that cover the topic (coverage decided by hand from titles + CISCE nodes
# vs v2 topics; verdicts are always COMPUTED from SIMS_V2_QUALITY.json so the map
# stays honest when the v2 audit is regenerated).
#   slug    : topic slug for the topicKey
#   subject : explicit subject guess (only needed where nodes cannot supply it)
#   v2      : same-class-band covering v2 simIds
#   xclass  : cross-class v2 simIds worth noting (never supersede)
#   note    : evidence / caveat
CURATED: dict[str, dict] = {
    # ------------------------------------------------------ class1 (24)
    "class1/AdditionGame.tsx": dict(slug="addition-subtraction", v2=["c1_addsub"]),
    "class1/AirGame.tsx": dict(slug="air", v2=["c1_air"]),
    "class1/AnimalTypesGame.tsx": dict(slug="animal-types-habitats", v2=["c1_animals"]),
    "class1/AnimalsGame.tsx": dict(slug="animals", v2=["c1_animals"]),
    "class1/BalanceGame.tsx": dict(slug="weight-comparison", v2=["c1_measure"]),
    "class1/BiologyFoundationsSimulation.tsx": dict(
        slug="biology-foundations", v2=[], xclass=["c1_body", "c2_homes"],
        note="cross-class 1-5 foundations series; class1 body/plants/animals slices exist as separate v2 entries but no cross-class equivalent"),
    "class1/BodyGame.tsx": dict(slug="body-parts-senses", v2=["c1_body"]),
    "class1/CleanlinessGame.tsx": dict(slug="cleanliness", v2=["c1_clean"]),
    "class1/ComputerBasicsGame.tsx": dict(slug="computer-basics", v2=["cs_basics"]),
    "class1/ComputerInputGame.tsx": dict(
        slug="computer-input-devices", v2=[],
        note="input devices / keyboard / mouse / storage skills not in v2 cs track (cs_basics stops at parts & uses)"),
    "class1/ComputerSkillsC1_5Sim.tsx": dict(
        slug="computer-skills-foundations", v2=[], xclass=["cs_basics", "cs_scratch"],
        note="cross-class 1-5 foundations series; no v2 equivalent"),
    "class1/CountingGame.tsx": dict(slug="counting", v2=["c1_counting"]),
    "class1/EarthWeatherGame.tsx": dict(slug="earth-weather", v2=["c1_sky", "c1_hood"]),
    "class1/FoodGame.tsx": dict(slug="food", v2=["c1_food"]),
    "class1/NeighbourhoodGame.tsx": dict(slug="neighbourhood", v2=["c1_hood"]),
    "class1/PatternsGame.tsx": dict(slug="patterns", v2=["c1_patterns"]),
    "class1/PhysicsWorldSim.tsx": dict(
        slug="physics-foundations", v2=[], xclass=["c1_sky"],
        note="cross-class 1-5 foundations series (c1_phy_001 + c5_phy_010); no v2 equivalent"),
    "class1/PlantTypesGame.tsx": dict(slug="plant-types", v2=["c1_plants"]),
    "class1/PlantsGame.tsx": dict(slug="plants", v2=["c1_plants"]),
    "class1/SafetyGame.tsx": dict(slug="safety", v2=["c1_safety"]),
    "class1/ShapeSortGame.tsx": dict(slug="shapes-sorting", v2=["c1_shapes"]),
    "class1/SunMoonGame.tsx": dict(slug="sun-moon-seasons", v2=["c1_sky"]),
    "class1/TransportGame.tsx": dict(slug="transport", v2=["c1_transport"]),
    "class1/WaterGame.tsx": dict(slug="water", v2=["c1_water"]),
    # ------------------------------------------------------ class2 (20)
    "class2/AddSubGame.tsx": dict(slug="addition-subtraction", v2=["c2_arith"]),
    "class2/AirCleanGame.tsx": dict(slug="air-cleanliness-health", v2=[]),
    "class2/AirVehiclesGame.tsx": dict(slug="air-vehicles-fuels", v2=[]),
    "class2/AnimalsGame.tsx": dict(
        slug="animals-habitats-lifecycles", v2=[], xclass=[],
        note="c2_homes covers only the animal-homes slice; characteristics/butterfly lifecycle uncovered"),
    "class2/BodyFunctionsGame.tsx": dict(slug="body-functions", v2=[]),
    "class2/ComputerBasicsGame.tsx": dict(
        slug="computer-basics", v2=[], xclass=["cs_basics"],
        note="v2 cs_basics sits at classLevel 1; v2 class-2 CS slot is cs_files (files/folders)"),
    "class2/ComputerFilesGame.tsx": dict(
        slug="files-folders-paint", v2=["cs_files"],
        note="cs_files covers files/folders; paint-tool slice partial"),
    "class2/DirectionsMapGame.tsx": dict(
        slug="directions-maps", v2=["c2_directions"],
        note="water-sources/landforms slices only partly covered"),
    "class2/EarthSunGame.tsx": dict(
        slug="earth-sun", v2=[], xclass=["c2_seasons"],
        note="c2_seasons covers only the seasons slice; sun/shadows/day-night uncovered"),
    "class2/FoodGroupsGame.tsx": dict(slug="food-groups", v2=[]),
    "class2/MeasurementGame.tsx": dict(slug="measurement", v2=["c2_measure"]),
    "class2/MulDivGame.tsx": dict(
        slug="multiplication-tables", v2=[],
        note="c2_groups is counting-in-groups/tens groundwork, not tables/equal-sharing"),
    "class2/MyEnvironmentGame.tsx": dict(
        slug="my-environment", v2=[],
        note="c2_helpers/c2_homes cover only community-helpers and animal-homes slices"),
    "class2/NumbersGame.tsx": dict(slug="numbers-place-value", v2=["c2_place"]),
    "class2/PatternsGame.tsx": dict(
        slug="patterns-graphs", v2=["c2_patterns"],
        note="simple-graphs slice only partly covered"),
    "class2/PlantsGame.tsx": dict(slug="plants-parts-products", v2=[]),
    "class2/SafetyCleanGame.tsx": dict(slug="safety-hygiene", v2=[]),
    "class2/ShapesLinesGame.tsx": dict(slug="shapes-lines", v2=["c2_shapes"]),
    "class2/SolarSystemGame.tsx": dict(slug="solar-system", v2=[]),
    "class2/WaterGame.tsx": dict(slug="water-storage-conservation", v2=[]),
    # ------------------------------------------------------ class3 (31)
    "class3/AddSubGame.tsx": dict(slug="addition-subtraction", v2=["c3_givetake"]),
    "class3/BirdsGame.tsx": dict(
        slug="birds", v2=["c3_animals"], note="bird subdomain of the v2 class-3 animals entry"),
    "class3/ComputerSystemGame.tsx": dict(slug="computer-system", v2=[]),
    "class3/ContinentsGame.tsx": dict(slug="continents-oceans", v2=[]),
    "class3/DataPatternsGame.tsx": dict(slug="data-patterns", v2=["c3_charts", "c3_patterns"]),
    "class3/DirectionsMapsGame.tsx": dict(slug="directions-maps-globes", v2=[]),
    "class3/EarthSkyGame.tsx": dict(slug="earth-sky", v2=[]),
    "class3/FloatSinkGame.tsx": dict(slug="float-sink", v2=[]),
    "class3/FoodShelterGame.tsx": dict(
        slug="food-shelter-transport", v2=[],
        note="c3_shelter covers only the shelter slice; food types/transport/crafts uncovered"),
    "class3/GlobeGame.tsx": dict(slug="globe", v2=[]),
    "class3/HealthGame.tsx": dict(slug="health-hygiene", v2=[]),
    "class3/InsectsGame.tsx": dict(
        slug="insects", v2=["c3_animals"], note="insect subdomain of the v2 class-3 animals entry"),
    "class3/InternetGame.tsx": dict(slug="internet", v2=["cs_internet"]),
    "class3/LandformsGame.tsx": dict(slug="landforms-rivers", v2=[]),
    "class3/LivingEVSGame.tsx": dict(slug="living-nonliving", v2=[]),
    "class3/LivingThingsGame.tsx": dict(slug="living-things", v2=[]),
    "class3/MapsLengthGame.tsx": dict(
        slug="maps-3d-length", v2=["c3_lookfrom", "c3_measure2"],
        note="views/perspectives + measurement jointly cover map-reading, 3D line drawings and length"),
    "class3/MatterGame.tsx": dict(slug="states-of-matter", v2=["sci_matter"]),
    "class3/MentalMathGame.tsx": dict(slug="mental-math", v2=[]),
    "class3/MulDivGame.tsx": dict(slug="multiplication-division", v2=["c3_times", "c3_share"]),
    "class3/NumbersGame.tsx": dict(
        slug="numbers-4digit", v2=["c3_numbers"],
        note="v2 c3_numbers is THIN and even 3-digit scoped vs legacy 4-digit content"),
    "class3/PaintFilesGame.tsx": dict(
        slug="paint-files", v2=[], xclass=["cs_files"],
        note="cs_files sits at classLevel 2 and covers only the files slice"),
    "class3/PlantUsesGame.tsx": dict(
        slug="plant-uses", v2=["c3_plants"], note="plant-uses subdomain of v2 c3_plants; sun-energy slice partial"),
    "class3/PlantsGame.tsx": dict(slug="plants-parts-seeds", v2=["c3_plants"]),
    "class3/ResourcesGame.tsx": dict(slug="natural-resources", v2=[]),
    "class3/ShapesTessellationGame.tsx": dict(slug="shapes-tessellation", v2=["c3_shapes"]),
    "class3/SunEnergyGame.tsx": dict(slug="sun-energy", v2=[]),
    "class3/TimeCalendarGame.tsx": dict(slug="time-calendar", v2=["c3_time"]),
    "class3/WaterSunGame.tsx": dict(
        slug="water-sun-resources", v2=["c3_water"], note="water covered; sun-as-resource slice partial"),
    "class3/WeightCapacityGame.tsx": dict(slug="weight-capacity", v2=["c3_measure2"]),
    "class3/WindowsWordGame.tsx": dict(slug="ms-word", v2=[]),
    # ------------------------------------------------------ class4 (28)
    "class4/AdaptationsGame.tsx": dict(
        slug="adaptations", v2=["c4_animals"],
        note="v2 c4_animals is degenerate (lex:sort yields 1 unique question) vs 919-line bespoke adaptations game"),
    "class4/AlgorithmsLogoGame.tsx": dict(
        slug="algorithms-logo", v2=["cs_logic"], note="stepwise thinking/algorithm slices covered; Logo slice partial"),
    "class4/ChangesTransportGame.tsx": dict(
        slug="locality-transport-changes", v2=["c4_transport", "c4_diversity"],
        note="transport + community slices covered; change-over-time narrative partial"),
    "class4/ComputerMemoryGame.tsx": dict(slug="computer-memory-data", v2=[]),
    "class4/ContinentsOceansGame.tsx": dict(slug="continents-oceans", v2=[]),
    "class4/DigestionGame.tsx": dict(
        slug="digestion-excretion", v2=[], xclass=["c5_digestion"],
        note="v2 digestion entry sits at classLevel 5"),
    "class4/EarthMotionsGame.tsx": dict(slug="earth-motions", v2=[]),
    "class4/FactorsMultiplesGame.tsx": dict(
        slug="factors-multiples", v2=[], xclass=["c5_factors"],
        note="v2 factors entry sits at classLevel 5"),
    "class4/FoodTeethGame.tsx": dict(
        slug="food-teeth", v2=[], xclass=["c4_food"],
        note="c4_food is Food-and-Festivals; food components & teeth uncovered"),
    "class4/ForceFrictionGame.tsx": dict(subject="science", slug="force-friction", v2=["sci_force"]),
    "class4/FractionsGame.tsx": dict(slug="fractions", v2=["c4_fractions"]),
    "class4/IndiaClimateGame.tsx": dict(
        slug="india-rivers-climate", v2=["c4_waterbodies"], note="rivers covered; climate slice partial"),
    "class4/InternetBrowserGame.tsx": dict(
        slug="internet-www", v2=[], xclass=["cs_internet"],
        note="v2 internet entry sits at classLevel 3"),
    "class4/LightGame.tsx": dict(slug="light", v2=["sci_light"]),
    "class4/LinesMeasurementGame.tsx": dict(slug="lines-measurement", v2=[]),
    "class4/LivingPlantsGame.tsx": dict(
        slug="living-plants-organs", v2=[],
        note="c4_trees covers trees/environment slice; living-vs-nonliving and internal organs uncovered"),
    "class4/MapsIndiaGame.tsx": dict(slug="maps-india", v2=[]),
    "class4/MatterAirGame.tsx": dict(slug="matter-air", v2=[]),
    "class4/MeasurementGame.tsx": dict(
        slug="measurement", v2=[], xclass=["c4_weight"],
        note="c4_weight covers only the weight slice and with an off-topic sub generator"),
    "class4/NumbersGame.tsx": dict(
        slug="numbers-6digit-roman", v2=["c4_bignum"],
        note="v2 c4_bignum is THIN and 4-digit scoped vs legacy 6-digit + Roman numerals"),
    "class4/OperationsGame.tsx": dict(
        slug="operations", v2=[],
        note="c4_tables covers only mul/div; class-4 v2 has no add/sub entry"),
    "class4/PlantsAirGame.tsx": dict(
        slug="plants-air", v2=[],
        note="c4_trees covers trees/environment slice; photosynthesis/air-composition/breathing uncovered"),
    "class4/PowerPointGame.tsx": dict(slug="powerpoint", v2=[]),
    "class4/ShapesSymmetryGame.tsx": dict(
        slug="shapes-symmetry-views", v2=["c4_bricks", "c4_wheels", "c4_perimeter"],
        note="jointly covered by patterns/symmetry/views + circles + perimeter/area"),
    "class4/SkinNervousGame.tsx": dict(subject="science", slug="skin-nervous", v2=[]),
    "class4/SolutionsFloatGame.tsx": dict(subject="science", slug="solutions-float", v2=[]),
    "class4/TimeDataPatternsGame.tsx": dict(slug="time-data-patterns", v2=["c4_time", "c4_data"]),
    "class4/WordFormattingGame.tsx": dict(slug="word-processing", v2=[]),
    # ------------------------------------------------------ class5 (33)
    "class5/AgricultureHygieneGame.tsx": dict(
        slug="agriculture-hygiene", v2=[],
        note="v2 farming entry sits at classLevel 4; c5_forests only partially adjacent"),
    "class5/AnglesSymmetryGame.tsx": dict(slug="angles-symmetry", v2=["c5_angles"]),
    "class5/AreaPerimeterGame.tsx": dict(
        slug="area-perimeter", v2=["c5_area"], note="v2 generator has ~13% duplicate-option draws (audit GOOD)"),
    "class5/ChangesAirGame.tsx": dict(subject="science", slug="changes-air", v2=[]),
    "class5/CirculatoryGame.tsx": dict(subject="science", slug="circulatory", v2=["sci_body"]),
    "class5/ComputerHistoryGame.tsx": dict(slug="computer-history", v2=[]),
    "class5/DecimalsGame.tsx": dict(slug="decimals", v2=["c5_decimals"]),
    "class5/EconomyGame.tsx": dict(slug="india-economy-agriculture", v2=[]),
    "class5/EcosystemWasteGame.tsx": dict(
        slug="ecosystem-waste", v2=[],
        note="c5_forests covers only the ecosystem slice; waste management uncovered"),
    "class5/EnvironmentBodyGame.tsx": dict(
        slug="environment-body", v2=[],
        note="sci_body covers only the body slice; environment slice uncovered"),
    "class5/EnvironmentResourcesGame.tsx": dict(
        slug="environment-resources", v2=[],
        note="c5_forests covers only the forests/nature slice"),
    "class5/FactorsMultiGame.tsx": dict(slug="factors-multiples", v2=["c5_factors"]),
    "class5/FractionsAdvancedGame.tsx": dict(
        slug="fractions-advanced", v2=[], xclass=["c4_fractions"],
        note="v2 fractions entries are class-4 intro (c4_fractions) and class-6; advanced class-5 work uncovered"),
    "class5/HealthDiseasesGame.tsx": dict(subject="science", 
        slug="health-diseases", v2=[],
        note="c5_digestion covers only the digestion-and-health slice; diseases/junk-food effects uncovered"),
    "class5/IndiaLocationGame.tsx": dict(slug="india-location", v2=[]),
    "class5/IntegersGame.tsx": dict(
        slug="integers", v2=[], xclass=["c6_math_integers"],
        note="v2 integers entry sits at classLevel 6"),
    "class5/InternetLogoGame.tsx": dict(
        slug="internet-logo", v2=[],
        note="cs_scratch is block coding, not Logo turtle graphics; email/search services uncovered"),
    "class5/LargeNumbersGame.tsx": dict(slug="large-numbers", v2=["c5_fish"]),
    "class5/LargeOperationsGame.tsx": dict(slug="large-operations", v2=["c5_multiply"]),
    "class5/LatLongGame.tsx": dict(
        slug="lat-long", v2=[],
        note="c5_map covers maps-and-scale; the latitude/longitude grid itself is uncovered"),
    "class5/LightEclipseGame.tsx": dict(
        slug="light-eclipse", v2=[], xclass=["sci_light"],
        note="v2 light entry sits at classLevel 4"),
    "class5/MixturesSeparationGame.tsx": dict(subject="science", slug="mixtures-separation", v2=[]),
    "class5/PercentageDataGame.tsx": dict(
        slug="percentage-data", v2=[],
        note="c5_charts covers only the data slice; percentages uncovered"),
    "class5/PlantReproductionGame.tsx": dict(
        slug="plant-reproduction", v2=["c5_seeds"], note="reproduction/seeds subdomain of v2 c5_seeds"),
    "class5/PowerPointScratchGame.tsx": dict(
        slug="powerpoint-scratch", v2=[],
        note="cs_scratch covers the Scratch slice; PowerPoint design uncovered"),
    "class5/SimpleMachinesGame.tsx": dict(subject="science", 
        slug="simple-machines", v2=[], note="no v2 simple-machines entry in any class band 1-6"),
    "class5/SkeletalGame.tsx": dict(subject="science", 
        slug="skeletal", v2=["sci_body"], note="skeleton subdomain of v2 sci_body (Body Systems)"),
    "class5/SoftwareGame.tsx": dict(slug="software-types", v2=[]),
    "class5/SoundNoiseGame.tsx": dict(slug="sound-noise", v2=[]),
    "class5/StatesMatterGame.tsx": dict(subject="science", 
        slug="states-matter", v2=[], xclass=["sci_matter"],
        note="v2 matter entry sits at classLevel 3"),
    "class5/WeatherBuildingsGame.tsx": dict(slug="weather-buildings", v2=[]),
    "class5/WordAdvancedGame.tsx": dict(slug="word-advanced", v2=[]),
    "class5/WorkEnergyGame.tsx": dict(subject="science", slug="work-energy", v2=[]),
    # ------------------------------------------------------ maths/ (loose, unpinned)
    "maths/LeverSimulation.tsx": dict(
        slug="lever", subject="science", classBand="other", v2=[],
        note="guided-discovery lever/principle-of-moments sim; no v2 simple-machines entry in any class band"),
    "maths/PulleySimulation.tsx": dict(
        slug="pulley", subject="science", classBand="other", v2=[],
        note="fixed/movable pulley MA sim; no v2 simple-machines entry in any class band"),
}

# root-level shared widgets (not topic sims)
ROOT_WIDGETS = {
    "GameRenderer.tsx": ("infra.game-renderer", "shared renderer for the legacy game-engine challenge system; wired into app/play + app/game-test and lib/game-engine"),
    "VisualChallenge.tsx": ("infra.visual-challenge", "generic multi-subject challenge visualizer widget; no importers found (orphan candidate)"),
    "InteractiveNumberLine.tsx": ("infra.number-line", "interactive number-line widget; no importers found (orphan candidate)"),
    "SVGBodyDiagram.tsx": ("infra.body-diagram", "clickable body-diagram widget; no importers found (orphan candidate)"),
}


# ---------------------------------------------------------------- helpers
def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def detect_subject(path: Path, text: str, nodes: list[tuple[str, str, str]]) -> str:
    for _, prefix, _ in nodes:
        if prefix in SUBJECT_BY_NODE:
            return SUBJECT_BY_NODE[prefix]
    name = path.stem
    for subject, tokens in SUBJECT_BY_TOKEN:
        for tok in re.findall(r"[A-Z]+(?=[A-Z][a-z])|[A-Z][a-z]+|\d+", name):
            if tok.lower() in tokens:
                return subject
    return "unknown"


def detect_title(text: str, path: Path) -> str:
    for line in text.splitlines()[:60]:
        m = TITLE_COMMENT_RE.match(line)
        if m and m.group(1).strip().lower() not in {"use client", "import"}:
            return m.group(1).strip()
    m = TITLE_CONST_RE.search(text)
    if m:
        return m.group(1).strip()
    return path.stem


def slugify(name: str) -> str:
    parts = re.findall(r"[A-Z]+(?=[A-Z][a-z])|[A-Z][a-z]+|[a-z]+|\d+", name)
    drop = {"game", "sim", "simulation", "advanced"}
    keep = [p.lower() for p in parts if p.lower() not in drop]
    return "-".join(keep) if keep else name.lower()


def weak_v2(verdict: str, issues: list) -> bool:
    if verdict in ("THIN", "BROKEN"):
        return True
    return bool(V2_WEAK_ISSUE_RE.search(" ".join(issues or [])))


def compute_verdict(v2_ids: list[str], v2_by_id: dict, legacy_lines: int) -> tuple[str, str]:
    """Returns (verdict, evidence string). Assumes v2_ids are same-class-band."""
    if not v2_ids:
        return "KEEP-UNIQUE", "no same-class-band v2 entry covers this topic"
    entries = [v2_by_id[i] for i in v2_ids if i in v2_by_id]
    missing = [i for i in v2_ids if i not in v2_by_id]
    if missing:
        raise SystemExit(f"ERROR: curated v2 ids not in SIMS_V2_QUALITY.json: {missing}")
    verdicts = {e["verdict"] for e in entries}
    ids = ",".join(f"{e['simId']}({e['verdict']})" for e in entries)
    if any(e["verdict"] in ("THIN", "BROKEN") for e in entries):
        return "KEEP-MASTER", f"v2 coverage inadequate: {ids}"
    weak_flags = [e for e in entries if V2_WEAK_ISSUE_RE.search(" ".join(e.get("issues") or []))]
    if weak_flags and legacy_lines >= KEEP_MASTER_MIN_LINES and all(
        e["verdict"] == "GOOD" for e in weak_flags
    ):
        return "KEEP-MASTER", (
            f"v2 GOOD but generator filler/degenerate ({ids}) vs {legacy_lines}-line bespoke legacy sim")
    return "SUPERSEDED", f"v2 covers topic: {ids}"


# ---------------------------------------------------------------- inventory
def scoped_folders() -> list[Path]:
    folders = []
    for child in sorted(SIMS_DIR.iterdir()):
        if not child.is_dir():
            continue
        if child.name in EXCLUDED_DIRS or child.name.startswith(EXCLUDED_DIR_PREFIXES):
            continue
        folders.append(child)
    return folders


def build_map() -> dict:
    v2_data = json.loads(V2_QUALITY.read_text(encoding="utf-8"))
    v2_by_id = {e["simId"]: e for e in v2_data["entries"]}

    entries: list[dict] = []
    folder_stats: dict[str, dict] = {}
    seen_curated: set[str] = set()

    for folder in scoped_folders():
        if folder.name in CLASS_FOLDERS:
            class_band = CLASS_FOLDERS[folder.name]
        elif folder.name in UNPINNED_FOLDERS:
            class_band = "other"
        else:
            class_band = "other"  # loose subject folder discovered at root
        files = sorted(folder.glob("*.tsx"))
        stats = folder_stats.setdefault(
            folder.name, {"files": 0, "SUPERSEDED": 0, "KEEP-UNIQUE": 0, "KEEP-MASTER": 0})
        for f in files:
            text = f.read_text(encoding="utf-8", errors="replace")
            lines = text.count("\n") + (0 if text.endswith("\n") else (1 if text else 0))
            nodes = [(m.group(1), m.group(2), m.group(3)) for m in CISCE_RE.finditer(text)]
            node_ids = sorted({f"c{c}_{p}_{n}" for c, p, n in nodes})
            rel = f"{folder.name}/{f.name}"
            cur = CURATED.get(rel)
            kind = "topic-sim"
            if cur:
                seen_curated.add(rel)
                slug = cur["slug"]
                subject = cur.get("subject") or detect_subject(f, text, nodes)
                band = cur.get("classBand", class_band)
                v2_same = list(cur.get("v2", []))
                xclass = list(cur.get("xclass", []))
                note = cur.get("note", "")
            else:
                # heuristic fallback for files added after this table was written
                slug = slugify(f.stem)
                subject = detect_subject(f, text, nodes)
                band = class_band
                v2_same = []
                xclass = []
                note = "NOT IN CURATED TABLE: heuristic filename-token match against v2 topics"
                tokens = {t for t in slug.split("-") if len(t) > 2}
                best, best_score = None, 0.0
                for e in v2_data["entries"]:
                    if str(e["class"]) != band:
                        continue
                    tt = set(re.findall(r"[a-z]+", e["topic"].lower()))
                    score = len(tokens & tt) / max(1, min(len(tokens), len(tt)))
                    if score > best_score:
                        best, best_score = e["simId"], score
                if best and best_score >= 0.5:
                    v2_same = [best]
            verdict, evidence = compute_verdict(v2_same, v2_by_id, lines)
            if xclass:
                xv = ", ".join(f"{i}({v2_by_id[i]['verdict']})" if i in v2_by_id else i
                               for i in xclass)
                evidence += f"; cross-class-adjacent: {xv} (never supersedes)"
            if note:
                evidence += f" -- {note}"
            topic_prefix = f"g{band}" if band.isdigit() else ("m0" if rel.startswith("maths/") else "x")
            entries.append({
                "file": f"frontend/components/simulations/{rel}",
                "folder": folder.name,
                "classBand": band,
                "subjectGuess": subject,
                "topicKey": f"{topic_prefix}.{slug}",
                "title": detect_title(text, f),
                "cisceNodes": node_ids,
                "lines": lines,
                "bytes": f.stat().st_size,
                "kind": kind,
                "dedupeVerdict": verdict,
                "v2CoveredBy": v2_same or None,
                "evidence": evidence,
            })
            stats["files"] += 1
            stats[verdict] += 1

    # curated table hygiene: every curated path must have been seen
    orphan_curated = sorted(set(CURATED) - seen_curated)

    # root-level shared widgets (not sims)
    widget_stats = {"files": 0, "SUPERSEDED": 0, "KEEP-UNIQUE": 0, "KEEP-MASTER": 0}
    for f in sorted(SIMS_DIR.glob("*.tsx")):
        if f.name not in ROOT_WIDGETS:
            continue
        topic_key, note = ROOT_WIDGETS[f.name]
        text = f.read_text(encoding="utf-8", errors="replace")
        entries.append({
            "file": f"frontend/components/simulations/{f.name}",
            "folder": "(root)",
            "classBand": "shared",
            "subjectGuess": "shared",
            "topicKey": topic_key,
            "title": f.stem,
            "cisceNodes": sorted({m.group(0) for m in CISCE_RE.finditer(text)}),
            "lines": text.count("\n") + 1,
            "bytes": f.stat().st_size,
            "kind": "shared-widget",
            "dedupeVerdict": "KEEP-UNIQUE",
            "v2CoveredBy": None,
            "evidence": f"shared infrastructure component, not a topic sim; no v2 equivalent -- {note}",
        })
        widget_stats["files"] += 1
        widget_stats["KEEP-UNIQUE"] += 1

    entries.sort(key=lambda e: e["file"])

    verdict_counts = {"SUPERSEDED": 0, "KEEP-UNIQUE": 0, "KEEP-MASTER": 0}
    subject_counts: dict[str, dict] = {}
    for e in entries:
        verdict_counts[e["dedupeVerdict"]] += 1
        s = subject_counts.setdefault(
            e["subjectGuess"], {"total": 0, "SUPERSEDED": 0, "KEEP-UNIQUE": 0, "KEEP-MASTER": 0})
        s["total"] += 1
        s[e["dedupeVerdict"]] += 1

    table_rows = {name: stats for name, stats in folder_stats.items()}
    if widget_stats["files"]:
        table_rows["(root widgets)"] = widget_stats

    return {
        "meta": {
            "tool": "backend/tools/build_legacy_sim_map.py",
            "scope": "frontend/components/simulations: class1-class5, maths, loose subject folders (bio/chem/cs/evs/geo/physics if non-empty) + root-level shared widgets. EXCLUDED: c6_12* (owned by c6_12 mapper), three/, _* archive/backup folders.",
            "dedupeReference": "frontend/components/sims_v2/SIMS_V2_QUALITY.json",
            "v2QualitySha256": sha256(V2_QUALITY),
            "v2EntriesUsed": len(v2_data["entries"]),
            "topicKeyScheme": "g{class}.{slug} = class-band sim (g1..g5); m0.{slug} = loose maths/ simple-machine sims (unpinned class); infra.{slug} = shared root widget, not a topic sim",
            "verdictRules": [
                "SUPERSEDED: same-class-band sims_v2 entry covers the topic with verdict PERFECT/GOOD",
                "KEEP-MASTER: same-class-band v2 entry exists but is THIN/BROKEN, or GOOD with off-topic/degenerate generator issues while legacy is a >=600-line bespoke component",
                "KEEP-UNIQUE: no same-class-band v2 coverage (or only cross-class adjacency, which never supersedes)",
            ],
            "deterministic": "no timestamps; v2QualitySha256 pins the dedupe reference; re-run byte-identical while inputs unchanged",
        },
        "summary": {
            "totalEntries": len(entries),
            "countsPerVerdict": verdict_counts,
            "perFolder": table_rows,
            "perSubject": subject_counts,
            "emptySubjectFolders": [d.name for d in scoped_folders() if not any(d.iterdir())],
        },
        "entries": entries,
    }, orphan_curated


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--check", action="store_true",
                    help="verify existing LEGACY_SIM_MAP.json matches a fresh build")
    args = ap.parse_args()

    if not V2_QUALITY.exists():
        print(f"ERROR: missing {V2_QUALITY}")
        return 2

    doc, orphan_curated = build_map()
    if orphan_curated:
        print("ERROR: CURATED rows pointing at missing files:")
        for p in orphan_curated:
            print("  ", p)
        return 2

    payload = json.dumps(doc, ensure_ascii=False, indent=2, sort_keys=False) + "\n"
    if args.check:
        existing = OUTPUT.read_text(encoding="utf-8") if OUTPUT.exists() else ""
        if existing == payload:
            print(f"OK deterministic: {OUTPUT} matches fresh build ({len(doc['entries'])} entries)")
            return 0
        print("DRIFT: existing LEGACY_SIM_MAP.json differs from fresh build")
        return 1

    OUTPUT.write_text(payload, encoding="utf-8")
    s = doc["summary"]
    print(f"Wrote {OUTPUT}")
    print(f"  entries: {s['totalEntries']}  verdicts: {s['countsPerVerdict']}")
    for folder, stats in s["perFolder"].items():
        print(f"  {folder:<16} files={stats['files']:<3} SUPERSEDED={stats['SUPERSEDED']:<3} "
              f"KEEP-UNIQUE={stats['KEEP-UNIQUE']:<3} KEEP-MASTER={stats['KEEP-MASTER']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
