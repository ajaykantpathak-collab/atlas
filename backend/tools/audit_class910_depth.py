#!/usr/bin/env python3
"""
audit_class910_depth.py — Class 9 & 10 node DEPTH audit.

Companion to audit_class78_depth.py (same method, same output schema).
For every enhanced_nodes_index node of class 9 (406) and class 10 (636):

  1. Resolve the chapter-level sim mapping (sim components under
     frontend/components/simulations/ are chapter-scoped; node ids are
     `c9_math_ch03_001` (class 9) or `c10_math_cbse_03_001` (class 10), so the
     mapping is (class, subject, chapter) -> sims). The chapter map is
     hand-curated below: every candidate sim was probed for the chapter's core
     vocabulary (teaching copy, challenge banks, quiz items) and matched against
     the chapter's node definitions; the frontend/lib/c6_12_gameRegistry.ts
     wiring and app/3d-lab/agentSims.json were used to locate components
     (2D sims in components/simulations/c6_12 and c6_12_new, 3D sims in
     components/simulations/three). A keyword fallback documents - but does not
     silently override - the curated table.
  2. Per node, extract its 5-6 diagnostics (question + answer + misconception)
     and score each diagnostic's concept terms against the FULL TEXT of the
     mapped sim(s) (teaching copy, challenges, quiz banks, labs - the whole
     component source).
  3. Verdict per node:
       GOLD    - every diagnostic skill exercised by the mapped sim content
       PARTIAL - at least two diagnostics exercised; uncovered ones listed
       MISSING - no sim mapped to the chapter, or mapped sim never touches
                 the node's diagnostic skills (fewer than two covered)
  4. Answer-key defect scan over every mapped sim (out-of-range correctIndex,
     duplicate options, non-numeric correctAnswer on numeric items, arithmetic
     mismatch on "x% of y" items). Defects are attributed to each node whose
     chapter the defective sim serves.

Heuristic (documented honestly):
  - Diagnostic concept terms: content words of the question stem and the
    answer, minus stopwords, stemmed lightly, expanded via a small domain
    synonym table. A diagnostic counts as COVERED when 0.65 * (IDF-weighted
    share of question terms present in the sim text) + 0.35 * (share of answer
    terms) >= 0.40. IDF is computed over chapter documents of the audited
    class so common academic words cannot fake coverage.
  - This is a lexical heuristic: it catches "sim computes comparing
    quantities" vs "compare profit and discount" style equivalence only when
    vocabulary overlaps or the synonym table maps it. It is conservative on
    metaphorical/illustrative sims. 15 verdicts per class were hand-verified
    against the actual sim interactions (see spot_checks in the output).

Usage:
  python backend/tools/audit_class910_depth.py            # writes both JSONs
  python backend/tools/audit_class910_depth.py --class 9  # one class only

Deterministic: no randomness, no timestamps, stable sort order throughout.
"""

import argparse
import json
import math
import os
import re
import sys
from collections import Counter, defaultdict

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
NODE_INDEX = os.path.join(ROOT, "backend", "_cache", "enhanced_nodes_index.json")
SIM_ROOT = os.path.join(ROOT, "frontend", "components", "simulations")
SIM_DIRS = [
    os.path.join(SIM_ROOT, "c6_12"),
    os.path.join(SIM_ROOT, "c6_12_new"),
    os.path.join(SIM_ROOT, "three"),  # WebGL 3D sims (registered via app/3d-lab/agentSims.json)
]
OUT_DIR = os.path.join(ROOT, "backend", "its", "competency")

COVER_THRESHOLD = 0.40   # blended q/a coverage score needed to call a diagnostic covered
GOLD_RATIO = 0.99        # covered/total diagnostics ratio for GOLD
PARTIAL_RATIO = 0.32     # at least 2 of 6 diagnostics exercised for PARTIAL

# ---------------------------------------------------------------------------
# Curated chapter -> sims mapping.
# Key: (class, subject, chapter). Subject is the node-index subject token
# ("phy" for class 10 physics, "physics" for class 9).
# Value: list of sim basenames (without .tsx) that serve this chapter, resolved
# against SIM_DIRS in order. Built by probing every candidate sim for the
# chapter's core vocabulary and reading the chapter's node definitions.
# Empty/absent key = no sim serves that chapter (those nodes are structurally
# MISSING). English (engl) has no sims in any class - unmapped on purpose.
# ---------------------------------------------------------------------------
CHAPTER_MAP = {
    # ============================ CLASS 9 ============================
    # -- biology (CBSE Curiosity track: cell, tissues, reproduction, diversity)
    (9, "bio", 1): ["C9_BiologyCellTheoryCellSim"],
    (9, "bio", 2): ["C9_ScienceTissuesInActionSim"],
    (9, "bio", 3): ["C9_ScienceReproductionHowLifeContinuesSim", "C10_ScienceHowDoOrganismsReproduceSim"],
    (9, "bio", 4): ["C9_BiologyAnimalKingdomClassificationSim", "C9_EVSBiodiversityLossCausesSim"],
    # -- chemistry (mixtures; atomic structure; atoms/molecules + bonding)
    (9, "chem", 1): ["C9_ScienceExploringMixturesAndTheirSeparationSim"],
    (9, "chem", 2): ["C9_PhysicsJourneyInsideAtomCBSESim", "C9_ScienceAtomicFoundationsOfMatterSim",
                     "C12_PhysicsBohrAtomSim", "C12_PhysicsRutherfordScatteringSim"],  # last two = 3D lab
    (9, "chem", 3): ["C9_ChemistrySymbolsofelementsSim", "C10_ChemistryPolarandnonpolarcovalentcompoundsSim"],
    # -- civics (democracy; elections)
    (9, "civ", 1): ["C9_HistoryCivicsDefinitionConstitutionSignificanceSim", "C9_SocialScienceWorkingOfInstitutionsSim"],
    (9, "civ", 2): ["C9_HistoryCivicsMidtermElectionByelectionSim"],
    # -- economics (basic problem of choice; demand/supply/market)
    (9, "eco", 1): ["C9_EconomicsBasicEconomicProblemSim", "C9_EconomicsDefinitionEconomicsAdamSim",
                    "C9_EconomicsBasicEconomicTermsSim"],
    (9, "eco", 2): ["C10_EconApplicationsDemandMeaningTypesSim", "C10_EconomicsDeterminantsDemandNonpriceSim",
                    "C10_EconomicsPerfectCompetitionMeaningSim"],
    # -- geography (earth interior/landforms; atmosphere/climate)
    (9, "geo", 1): ["C9_GeographyLandformsPlateausSim", "C9_GeographyDenudationWindWorkSim",
                    "C9_GeographyEarthPlanetSim"],
    (9, "geo", 2): ["C9_EVSEarthEnvironmentBioticSim", "C9_GeographyDenudationWindWorkSim"],
    # -- history (intro/sources; early humans+harappan; vedic->gupta early india)
    (9, "hist", 1): ["C9_HistoryCivicsSourcesSangamTirukkuralSim"],
    (9, "hist", 2): ["C9_HistoryCivicsDeclineHarappanCivilisationSim"],
    (9, "hist", 3): ["C9_HistoryCivicsCausesRiseJainismSim", "C9_HistoryCivicsSourcesSangamTirukkuralSim",
                     "C9_HistoryCivicsGuptaContributionCultureSim"],
    # -- mathematics (Ganita Prakash ch1-8)
    (9, "math", 1): ["C9_MathematicsOrientingYourselfTheUseOfSim"],
    (9, "math", 2): ["C9_MathematicsSolvingSimultaneousLinearSim", "C10_MathsPairOfLinearEquationsSim"],
    (9, "math", 3): ["C9_MathematicsRationalNumbersRealSim"],
    (9, "math", 4): ["C9_MathematicsExploringAlgebraicIdentitiesSim", "C10_MathematicsFactorisingPolynomialCompletelySim"],
    (9, "math", 5): ["C9_MathematicsIMUpAndDownSim"],
    (9, "math", 6): ["C9_MathematicsAreaTheoremsParallelogramsSim", "C10_MathsAreasRelatedToCirclesSim"],
    (9, "math", 7): ["C9_MathsProbabilitySim", "C10_MathematicsProbabilitySim"],
    (9, "math", 8): ["C9_MathematicsPredictingWhatComesNextExploringSim", "C10_MathsArithmeticProgressionsSim",
                     "C10_MathematicsGeometricProgressionFirstSim"],
    # -- physics (scientific method; motion; force/laws; work-energy-machines; sound; earth systems+current)
    (9, "physics", 1): ["C9_ScienceExplorationEnteringTheWorldOfSim", "C9_PhysicsInternationalSystemUnitsSim"],
    (9, "physics", 2): ["C9_ScienceDescribingMotionAroundUsSim", "C9_PhysicsEquationsUniformlyAcceleratedSim"],
    (9, "physics", 3): ["C9_ScienceHowForcesAffectMotionSim", "C9_PhysicsWeightMassComparisonSim"],
    (9, "physics", 4): ["C9_ScienceWorkEnergyAndSimpleMachinesSim", "C10_PhysicsEfficiencyMachinesetaSim"],
    (9, "physics", 5): ["C9_ScienceSoundWavesCharacteristicsAndApplicationsSim"],
    (9, "physics", 6): ["C9_PhysicsOhmsResistanceSim", "C9_EVSEarthEnvironmentBioticSim",
                        "C9_GeographyEarthPlanetSim"],
    # c9 engl 1-8: no English sims exist -> unmapped on purpose.

    # ============================ CLASS 10 ============================
    # -- biology (life processes; control; reproduction; heredity)
    (10, "bio", 1): ["C10_ScienceLifeProcessesSim", "C10_BiologyCirculatorySystemdetailedSim"],
    (10, "bio", 2): ["C10_ScienceControlAndCoordinationSim"],
    (10, "bio", 3): ["C10_ScienceHowDoOrganismsReproduceSim"],
    (10, "bio", 4): ["C10_ScienceHereditySim", "C10_BiologyChromosomeStructurechromatinSim"],
    # -- chemistry (reactions; acids/bases; metals; carbon; periodic classification)
    (10, "chem", 1): ["C10_ScienceChemicalReactionsAndEquationsSim"],
    (10, "chem", 2): ["C10_ScienceAcidsBasesAndSaltsSim"],
    (10, "chem", 3): ["C10_ScienceMetalsAndNonMetalsSim", "C10_ChemistryAlloysandamalgamsSim"],
    (10, "chem", 4): ["C10_ChemistryPolarandnonpolarcovalentcompoundsSim", "C10_ChemistryAlkanesgeneralformulaandpreparationSim"],
    (10, "chem", 5): ["C10_ChemistryPeriodicpropertiesatomicsizeSim"],
    # -- civics (power-sharing; federalism; gender/religion/caste; parties; outcomes)
    (10, "civ", 1): ["C10_CivicsPowerSharingBelgiumSriLankaSim"],   # power-sharing representation-arithmetic sim (added after depth audit)
    (10, "civ", 2): ["C10_HistoryCivicsMeaningFederalSetupSim"],
    (10, "civ", 3): ["C10_CivicsGenderReligionCasteSim"],   # gender/religion/caste representation lab (added after depth audit)
    (10, "civ", 4): ["C10_CivicsPoliticalPartiesSim"],   # coalition arithmetic + party health sim (added after depth audit)
    (10, "civ", 5): ["C10_SocialScienceOutcomesOfDemocracySim"],
    # -- economics (development; sectors; money and credit; globalisation; consumer rights)
    (10, "eco", 1): ["C9_EconomicsBasicEconomicTermsSim", "C9_EconApplicationsEconomicEntitiesConsumerSim"],
    (10, "eco", 2): ["C9_EconApplicationsInterdependenceSectorsPrimarySim", "C9_EconomicsInterdependenceAgricultureIndustrySim",
                     "C9_EconomicsGovernmentSchemesRemoveSim"],
    (10, "eco", 3): ["C10_EconApplicationsRoleCommercialBanksSim", "C9_CommercialStudiesTypesBankAccountsSim",
                     "C10_CommercialStudiesInternetBankingNeftSim"],
    (10, "eco", 4): ["C9_EconomicsGovernmentSchemesRemoveSim"],
    (10, "eco", 5): ["C10_EconomicsPublicExpenditureRevenueSim", "C9_EconApplicationsEconomicEntitiesConsumerSim"],
    # -- geography (resources; forest&wildlife; water; agriculture; minerals&energy; manufacturing; lifelines)
    (10, "geo", 1): ["C9_GeographyDenudationWindWorkSim"],
    (10, "geo", 2): ["C9_EVSBiodiversityLossCausesSim", "C9_EVSForestEcosystemsTropicalSim"],
    (10, "geo", 3): ["C10_GeographyWaterResourcesSim"],   # water budget + multipurpose/harvesting sim (added after depth audit)
    (10, "geo", 4): ["C9_EVSDomesticatedBiodiversityNativeSim"],
    (10, "geo", 5): ["C10_GeographyEnergyResourcesConventionalSim"],
    (10, "geo", 6): ["C10_EVSRoleIndustriesInstitutionsSim"],
    (10, "geo", 7): ["C10_GeographyLifelinesNationalEconomySim"],   # freight-mode cost + network sim (added after depth audit)
    # -- history (nationalism europe/india; global world; industrialisation; print culture)
    (10, "hist", 1): ["C9_SocialScienceFrenchRevolutionSim"],
    (10, "hist", 2): ["C10_HistoryCivicsNoncooperationProgrammeChauriSim"],
    (10, "hist", 3): ["C10_HistoryMakingOfGlobalWorldSim"],  # five-era globalisation sim (added after depth audit)
    (10, "hist", 4): ["C9_HistoryCivicsCompositeCultureFactorsSim"],  # industrialisation + gutenberg sections
    (10, "hist", 5): ["C9_HistoryCivicsCompositeCultureFactorsSim"],  # gutenberg/press/vernacular print content
    # -- mathematics (NCERT ch1-14)
    (10, "math", 1): ["C10_MathematicsRealNumbersSim"],
    (10, "math", 2): ["C10_MathematicsFactorisingPolynomialCompletelySim"],
    (10, "math", 3): ["C10_MathsPairOfLinearEquationsSim", "C9_MathematicsSolvingSimultaneousLinearSim"],
    (10, "math", 4): ["C10_MathematicsQuadraticEquationsIntroductionSim"],
    (10, "math", 5): ["C10_MathsArithmeticProgressionsSim"],
    (10, "math", 6): ["C10_MathematicsTrianglesSim", "C10_MathematicsConditionsParallelPerpendicularSim"],
    (10, "math", 7): ["C10_MathematicsCoordinateGeometrySim", "C10_MathematicsConditionsParallelPerpendicularSim"],
    (10, "math", 8): ["C10_MathematicsIntroductionToTrigonometrySim", "C10_MathematicsTrigonometricIdentitiessin2aSim"],
    (10, "math", 9): ["C10_MathematicsSomeApplicationsOfTrigonometrySim"],
    (10, "math", 10): ["C10_MathematicsLocusEquidistantFromSim", "C10_MathematicsConstructionTangentsCircleSim"],
    (10, "math", 11): ["C10_MathsAreasRelatedToCirclesSim"],
    (10, "math", 12): ["C10_MathematicsSurfaceAreasAndVolumesSim"],
    (10, "math", 13): ["C10_MathematicsStatisticsSim"],
    (10, "math", 14): ["C10_MathematicsProbabilitySim"],
    # -- physics ("phy" token: electricity; magnetic effects; sources of energy; light/human eye)
    (10, "phy", 1): ["C10_ScienceElectricitySim", "C10_PhysicsHouseWiringPowerSim"],
    (10, "phy", 2): ["C10_ScienceMagneticEffectsOfElectricCurrentSim"],
    (10, "phy", 3): ["C10_GeographyEnergyResourcesConventionalSim"],
    (10, "phy", 4): ["C10_ScienceLightReflectionRefractionSim", "C10_ScienceTheHumanEyeAndTheSim",
                     "C10_PhysicsScatteringLightSim"],
    # c10 engl 1-18: no English sims exist -> unmapped on purpose.
}

# ---------------------------------------------------------------------------
# Domain synonym expansion for diagnostic terms (semantic bridging, kept small
# and auditable). Keys are stemmed tokens; values are alternative spellings /
# symbol forms searched in sim text. Base table shared with the class 7-8
# auditor, extended with class 9-10 vocabulary.
# ---------------------------------------------------------------------------
SYNONYMS = {
    "percent": ["%"],
    "percentage": ["%"],
    "profit": ["selling price", "cost price"],
    "discount": ["marked price"],
    "hcf": ["highest common factor", "common factor"],
    "lcm": ["lowest common multiple", "least common multiple", "common multiple"],
    "si": ["simple interest"],
    "ci": ["compound interest"],
    "gst": ["tax"],
    "congruence": ["congruent"],
    "congruency": ["congruent"],
    "transversal": ["transversal"],
    "photosynthesis": ["chlorophyll", "stomata"],
    "respiration": ["breathing"],
    "indicator": ["litmus", "turmeric"],
    "acid": ["acids", "acids,"],
    "base": ["bases"],
    "circuit": ["circuits"],
    "electromagnet": ["solenoid"],
    "resistance": ["ohm"],
    "voltage": ["potential difference", "volt"],
    "current": ["ampere", "ammeter"],
    "reflection": ["reflected"],
    "lateral": ["lateral inversion"],
    "pendulum": ["oscillat", "time period"],
    "speed": ["distance-time", "metre per second"],
    "fraction": ["numerator", "denominator"],
    "decimal": ["tenths", "hundredths"],
    "equation": ["solve", "unknown"],
    "variable": ["letter-number", "unknown"],
    "exponent": ["power", "powers"],
    "square": ["squared"],
    "cube": ["cubed"],
    "median": ["average", "mean"],
    "proportion": ["proportional", "ratio"],
    "quadrilateral": ["parallelogram", "trapezium"],
    "polynomial": ["expression"],
    "factoris": ["factor", "factoring"],
    "osmosis": ["diffusion"],
    "habitat": ["ecosystem"],
    "franchise": ["vote", "voting", "election"],
    "judiciary": ["court", "courts"],
    "legislature": ["parliament", "law-making"],
    "executive": ["minister", "government"],
    "constitution": ["preamble", "constitutional"],
    "monsoon": ["rainfall"],
    "colonialis": ["colonial", "east india company"],
    "sultanate": ["turkic", "delhi"],
    "barter": ["exchange", "trade"],
    "infrastructure": ["roads", "banks"],
    "adolescence": ["puberty", "teenager", "adolescent"],
    "digestion": ["digestive", "intestine", "stomach"],
    "microorganism": ["microbe", "bacteria", "fungi"],
    "matter": ["particle", "particles"],
    "pressure": ["pascal"],
    "force": ["newton"],
    "mirror": ["concave", "convex"],
    "phase": ["lunar", "moon"],
    "gravitation": ["gravity"],
    "sound": ["vibrat", "frequency"],
    # ---- class 9-10 extensions ----
    "coordinate": ["cartesian", "quadrant"],
    "probability": ["outcome", "dice", "coin"],
    "tissue": ["xylem", "phloem"],
    "heredity": ["mendel", "gene"],
    "hormone": ["endocrine", "thyroid"],
    "reflex": ["spinal cord"],
    "inertia": ["newton"],
    "momentum": ["newton"],
    "friction": ["surface"],
    "machine": ["lever", "pulley"],
    "amplitude": ["loudness"],
    "isotope": ["atomic number"],
    "valency": ["combining capacity"],
    "colloid": ["tyndall"],
    "sublimation": ["camphor"],
    "atmosphere": ["troposphere", "stratosphere"],
    "earthquake": ["seismic"],
    "volcano": ["magma", "lava"],
    "weathering": ["erosion"],
    "monsoon2": ["rainfall"],
    "biodiversity": ["species", "wildlife"],
    "federalism": ["federal"],
    "democracy": ["election", "constitutional"],
    "ecosystem": ["food chain", "producers"],
    "ozone": ["uv"],
    "combustion": ["flammable"],
    "tangent": ["tangents"],
    "locus": ["equidistant"],
    "euclid": ["hcf", "division algorithm"],
    "trigonometry": ["sin", "cos", "tan"],
    "trigonometric": ["sin", "cos", "tan"],
    "progression": ["sequence", "common difference"],
    "sector": ["arc"],
    "histogram": ["frequency"],
    "displacement": ["distance"],
    "acceleration": ["velocity"],
    "kinetic": ["motion energy"],
    "magnetic": ["magnet"],
    "myopia": ["hypermetropia", "defect"],
    "refraction": ["refractive", "lens"],
    "scattering": ["scatter"],
    "sustainability": ["sustainable"],
    "monopoly": ["market"],
    "credit": ["loan"],
    "globalisation": ["globalis"],
    "globalization": ["globaliz"],
}

STOPWORDS = set("""the a an of and or in to for is are was were with by from as that this these those it its
on be can could should would may might must will shall do does did done not no nor but if then than also
more most such other another each any all some both few many much very using use used uses student students
learn learning ability able capacity correctly properly properly which what when where who whom whose how why
whether between among within without during following above below given give gives taking take takes
question questions answer answers option options correct incorrect mcq
explain describing describe identify identifying distinguish define define define
a b c d ii iii iv vi vii viii""".split())


def light_stem(w):
    """Light, deterministic stemming applied IDENTICALLY to diagnostic terms and
    sim-text tokens, so both sides meet in the same normalised space."""
    if len(w) > 4 and w.endswith("ies"):
        return w[:-3] + "y"
    if len(w) > 5 and w.endswith("ied"):
        return w[:-3] + "y"
    if len(w) > 6 and w.endswith("ing"):
        return w[:-3]
    if len(w) > 6 and w.endswith("ed"):
        return w[:-2]
    if len(w) > 4 and w.endswith(("sses", "ches", "shes", "xes", "zes")):
        return w[:-2]
    if len(w) > 3 and w.endswith("s") and not w.endswith(("ss", "us", "is")):
        return w[:-1]
    return w


class TokenIndex:
    """Stemmed token set of one sim with a 4-char prefix bucket index, so a
    diagnostic term matches when the stemmed sim token equals it or shares a
    prefix in either direction (catches 'increase'/'increased')."""

    def __init__(self, text):
        self.tokens = set()
        for t in tokenize(text):
            self.tokens.add(light_stem(t))
        self.prefix = defaultdict(list)
        for tok in self.tokens:
            if len(tok) >= 4:
                self.prefix[tok[:4]].append(tok)

    def has(self, term):
        if term in self.tokens:
            return True
        if len(term) >= 4:
            for tok in self.prefix.get(term[:4], ()):
                if len(tok) >= 4 and (tok.startswith(term) or term.startswith(tok)):
                    return True
        return False


def tokenize(text):
    return re.findall(r"[a-z%][a-z%\-]{1,}", text.lower())


def diagnostic_parts(diag, idf_fn):
    """Question terms and answer terms (stemmed, IDF-selected, synonym-expanded).
    The question stem carries the tested skill; the answer adds supporting
    vocabulary but also distractor rationale, so it is weighted lower."""
    q = diag.get("q") or ""
    a = diag.get("a") or ""

    def terms_of(text, cap):
        raw = [t for t in tokenize(text) if t not in STOPWORDS and len(t) > 2]
        seen, terms = set(), []
        for t in raw:
            st = light_stem(t)
            if st in seen:
                continue
            seen.add(st)
            terms.append(st)
        if len(terms) > cap:
            terms.sort(key=lambda t: -idf_fn(t))
            terms = terms[:cap]
        exp = set()
        for t in terms:
            exp.add(t)
            for syn in SYNONYMS.get(t, []):
                for w in tokenize(syn):
                    exp.add(light_stem(w) if len(w) > 3 else w)
        return exp

    return terms_of(q, 12), terms_of(a, 12)


def terms_share(terms, idx, idf_fn):
    if not terms:
        return 0.0
    weight_all = sum(idf_fn(t) for t in terms)
    if weight_all <= 0:
        return 0.0
    hit = sum(idf_fn(t) for t in terms if idx.has(t))
    return hit / weight_all


def diag_score(diag, idx, idf_fn):
    tq, ta = diagnostic_parts(diag, idf_fn)
    return 0.65 * terms_share(tq, idx, idf_fn) + 0.35 * terms_share(ta, idx, idf_fn)


def sim_text(path):
    """Full component source as lowercase text (teaching copy + challenges +
    quiz banks + labs + misconception killers). Code identifiers stay in - they
    carry topic vocabulary (e.g. 'kaprekar', 'chlorophyll')."""
    with open(path, encoding="utf-8") as f:
        return f.read().lower()


def find_sim_file(name):
    for d in SIM_DIRS:
        p = os.path.join(d, name + ".tsx")
        if os.path.exists(p):
            return p
    return None


# ---------------------------------------------------------------------------
# Answer-key defect scanning
# ---------------------------------------------------------------------------

def _split_top_level(body):
    """Split an array body on top-level commas, respecting quoted strings."""
    parts, cur, depth = [], [], 0
    quote = None
    i = 0
    while i < len(body):
        ch = body[i]
        if quote:
            if ch == "\\" and i + 1 < len(body):
                cur.append(ch)
                cur.append(body[i + 1])
                i += 2
                continue
            if ch == quote:
                quote = None
            cur.append(ch)
        elif ch in "'\"":
            quote = ch
            cur.append(ch)
        else:
            if ch in "([{":
                depth += 1
            elif ch in ")]}":
                depth -= 1
            if ch == "," and depth == 0:
                parts.append("".join(cur))
                cur = []
            else:
                cur.append(ch)
        i += 1
    if cur:
        parts.append("".join(cur))
    return [p.strip().strip("'\"") for p in parts if p.strip()]


def _extract_array(seg, key):
    """Bracket-matched extraction of `key: [ ... ]` from an object literal."""
    i = seg.find(key)
    if i < 0:
        return None
    b = seg.find("[", i)
    if b < 0:
        return None
    depth = 0
    for j in range(b, len(seg)):
        if seg[j] == "[":
            depth += 1
        elif seg[j] == "]":
            depth -= 1
            if depth == 0:
                return seg[b + 1 : j]
    return None


def scan_sim_defects(path):
    """Structural answer-key scan of one sim component. Deterministic."""
    with open(path, encoding="utf-8") as f:
        txt = f.read()
    defects = []
    # candidate quiz objects: small { ... } literals containing an answer key
    spans = []
    for m in re.finditer(r"\{", txt):
        start = m.start()
        depth = 0
        for j in range(start, min(start + 4000, len(txt))):
            c = txt[j]
            if c == "{":
                depth += 1
            elif c == "}":
                depth -= 1
                if depth == 0:
                    seg = txt[start : j + 1]
                    if ("correctIndex" in seg or "correctAnswer" in seg) and len(seg) < 3000:
                        spans.append(seg)
                    break
        else:
            break
    for seg in spans:
        arr = _extract_array(seg, "options")
        opts = _split_top_level(arr) if arr is not None else None
        mq = re.search(r"question\s*:\s*[\'\"](.*?)[\'\"]\s*,", seg, re.S)
        qtext = mq.group(1) if mq else seg[:100]
        mi = re.search(r"correctIndex\s*:\s*(-?\d+)", seg)
        ma = re.search(r"correctAnswer\s*:\s*[\'\"]?(-?\d+(?:\.\d+)?)[\'\"]?", seg)
        if mi and opts:
            idx = int(mi.group(1))
            if idx < 0 or idx >= len(opts):
                defects.append({
                    "kind": "correct_index_out_of_range",
                    "detail": "correctIndex %d but %d options" % (idx, len(opts)),
                    "question": qtext[:140],
                })
            dupes = sorted({o for o in opts if len(o) > 2 and opts.count(o) > 1})
            if dupes:
                defects.append({
                    "kind": "duplicate_options",
                    "detail": "identical options: %s" % "; ".join(dupes[:2])[:120],
                    "question": qtext[:140],
                })
        if ma is None and re.search(r"correctAnswer\s*:\s*[\'\"][^\'\"]*[\'\"]", seg):
            defects.append({
                "kind": "non_numeric_correct_answer",
                "detail": "numeric-type challenge carries a non-numeric correctAnswer",
                "question": qtext[:140],
            })
        if ma and mq:
            mp = re.search(r"(\d+(?:\.\d+)?)\s*%\s*of\s*(?:Rs\.?\s*)?(\d+(?:\.\d+)?)", mq.group(1))
            if mp:
                expect = float(mp.group(1)) * float(mp.group(2)) / 100.0
                got = float(ma.group(1))
                if abs(expect - got) > 0.01:
                    defects.append({
                        "kind": "percent_answer_mismatch",
                        "detail": "question computes %s%% of %s = %s but key says %s" % (
                            mp.group(1), mp.group(2), expect, ma.group(1)),
                        "question": qtext[:140],
                    })
    # de-duplicate identical defect tuples
    seen, out = set(), []
    for d in defects:
        key = json.dumps(d, sort_keys=True)
        if key in seen:
            continue
        seen.add(key)
        out.append(d)
    return out


# ---------------------------------------------------------------------------
# Hand verification record (30 verdicts, 15 per class, drawn stratified from
# the first heuristic run and checked by reading the node's diagnostics
# against the sim's actual challenges/labs/teaching copy).
# ---------------------------------------------------------------------------
SPOT_CHECKS = {
    9: [
        {"node_id": "c9_civ_ch1_1", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
         "note": "Constitution sim covers democracy definition, 'We the people'/Preamble legitimacy, Article 14 equality and rule of law."},
        {"node_id": "c9_math_ch6_10", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
         "note": "AreasRelatedToCircles sim genuinely exercises segment = sector minus triangle computations (segment x19, triangle x27)."},
        {"node_id": "c9_physics_ch3_1", "heuristic": "PARTIAL", "hand": "PARTIAL", "agree": True,
         "note": "Force sim exercises F=ma/balanced forces/friction; the inertia-of-rest/motion diagnostics are only thinly covered (one 'first law' mention, inertia x0)."},
        {"node_id": "c9_math_ch1_6", "heuristic": "PARTIAL", "hand": "PARTIAL", "agree": True,
         "note": "Orienting sim covers quadrant/plotting; distance-formula derivation and equidistant-locus diagnostics uncovered (sim has no distance/section formulas)."},
        {"node_id": "c9_math_ch7_10", "heuristic": "PARTIAL", "hand": "PARTIAL", "agree": True,
         "note": "Probability sim covers dice/coin theoretical+experimental probability; tree diagrams and dependent events absent (tree x0)."},
        {"node_id": "c9_geo_ch2_10", "heuristic": "PARTIAL", "hand": "PARTIAL", "agree": True,
         "note": "EarthEnvironment sim has CO2/emission content; the numeric carbon-footprint computations with emission factors are uncovered."},
        {"node_id": "c9_math_ch8_10", "heuristic": "PARTIAL", "hand": "PARTIAL", "agree": True,
         "note": "GP sim covers common-ratio terms; fractal/self-similarity diagnostics uncovered in every mapped sim."},
        {"node_id": "c9_math_ch5_1", "heuristic": "MISSING", "hand": "MISSING", "agree": True,
         "note": "Ferris-wheel sim (radius/arc/period) never exercises chord/equal-chords/cyclic-quadrilateral theorem diagnostics."},
        {"node_id": "c9_bio_ch2_9", "heuristic": "MISSING", "hand": "MISSING", "agree": True,
         "note": "Tissues sim has bone x5/cartilage x1 only; osteon/chondron organisation and bone-investigation diagnostics unexercised."},
        {"node_id": "c9_chem_ch1_6", "heuristic": "MISSING", "hand": "MISSING", "agree": True,
         "note": "Mixtures sim has no chromatography/Rf/TLC content at all."},
        {"node_id": "c9_physics_ch5_8", "heuristic": "MISSING", "hand": "MISSING", "agree": True,
         "note": "Sound sim covers frequency/amplitude/echo but not audible range, infrasound/ultrasound or age-related hearing."},
        {"node_id": "c9_physics_ch1_9", "heuristic": "MISSING", "hand": "MISSING", "agree": True,
         "note": "SI-units sim is measurement vocabulary only; lab-safety/GHS-pictogram diagnostics unexercised."},
        {"node_id": "c9_engl_ch1_1", "heuristic": "MISSING", "hand": "MISSING", "agree": True,
         "note": "No English sims exist for classes 9/10."},
        {"node_id": "c9_hist_ch1_3", "heuristic": "GOLD", "hand": "MISSING", "agree": False,
         "note": "Overcall: Sangam-literature sim supplies generic trade/surplus vocabulary but never exercises economics-as-a-discipline skills (scarcity x0, opportunity cost x0)."},
        {"node_id": "c9_eco_ch1_11", "heuristic": "GOLD", "hand": "MISSING", "agree": False,
         "note": "Overcall: 1991-reforms diagnostics (delicensing, FDI caps, CAGR) are absent from the basic-terms sims (1991 x3, fdi x1, licensing x0)."},
    ],
    10: [
        {"node_id": "c10_math_cbse_03_005", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
         "note": "New PairOfLinearEquations sim exercises substitution, elimination and the 0=0 infinitely-many-solutions case."},
        {"node_id": "c10_math_cbse_11_002", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
         "note": "New AreasRelatedToCircles sim covers circumference/radius/sector/segment computations."},
        {"node_id": "c10_math_cbse_12_009", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
         "note": "SurfaceAreas sim genuinely exercises melt-and-recast volume conservation (recast x26, melt x6)."},
        {"node_id": "c10_bio_cbse_01_009", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
         "note": "Detailed circulatory sim covers chambers, pulmonary artery, ventricle wall thickness (ventricle x26, pulmonary x15)."},
        {"node_id": "c10_eco_cbse_04_003", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
         "note": "GovernmentSchemes sim has real globalisation content: globalisation x14, tariff x11, WTO x7, containerisation x4, liberalisation x14."},
        {"node_id": "c10_math_cbse_09_001", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
         "note": "Re-verified after depth fix: Applications-of-trig sim gained a board-depth drill bank covering angle of depression vs elevation (cliff/boat/lighthouse scenarios, depression x8, elevation x6)."},
        {"node_id": "c10_math_cbse_14_005", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
         "note": "Re-verified after depth fix: Probability sim gained a drill bank covering the complement rule with marbles/decks/dice events (complement, NOT green, marbles 5-8-7, card deck complements)."},
        {"node_id": "c10_chem_cbse_01_009", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
         "note": "Re-verified after depth fix: Reactions sim gained drill items defining corrosion/rust (Fe2O3.xH2O), the three-nail oxygen+water experiment, galvanisation-as-sacrificial-protection and rancidity."},
        {"node_id": "c10_phy_cbse_02_005", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
         "note": "Re-verified after depth fix: Magnetic-effects sim gained drill items on F=BIL sin(theta) with Fleming's left-hand rule, numeric force computation and the aluminium-strip motor-effect experiment."},
        {"node_id": "c10_civ_cbse_01_001", "heuristic": "PARTIAL", "hand": "PARTIAL", "agree": True,
         "note": "Re-verified after depth fix: dedicated C10_CivicsPowerSharingBelgiumSriLankaSim now exists (Belgium 59/40/1 and Sri Lanka 74/26 presets, majoritarian vs consociational seat arithmetic, forms of power sharing); heuristic scores PARTIAL because one diagnostic's vocabulary (Belgium's community-government special-majority detail) is only partly exercised."},
        {"node_id": "c10_engl_cbse_01_001", "heuristic": "MISSING", "hand": "MISSING", "agree": True,
         "note": "No English sims exist for classes 9/10."},
        {"node_id": "c10_bio_cbse_01_012", "heuristic": "GOLD", "hand": "PARTIAL", "agree": False,
         "note": "Overcall: nephron structure is present (x14) but dialysis-model/reabsorption-design diagnostics are not (dialysis x0, urea x1)."},
        {"node_id": "c10_phy_cbse_01_005", "heuristic": "GOLD", "hand": "MISSING", "agree": False,
         "note": "Overcall: resistivity/nichrome/heating-element diagnostics absent from both mapped sims (resistivity x0 in each)."},
        {"node_id": "c10_hist_cbse_05_008", "heuristic": "GOLD", "hand": "MISSING", "agree": False,
         "note": "Overcall: Vernacular Press Act/Lytton/1878 diagnostics absent from CompositeCulture sim (vernacular press x0, 1878 x0); only generic print vocabulary matched. NOTE: the 2026 depth fix added Kesari/Vernacular-Press-Act drill content to the sim, so this overcall is now partly repaired."},
        {"node_id": "c10_geo_cbse_01_006", "heuristic": "GOLD", "hand": "MISSING", "agree": False,
         "note": "Overcall: land-use/net-sown-area/forest-cover diagnostics absent from the denudation sim (net sown area x0, land use x0, forest cover x0). NOTE: the 2026 depth fix added land-use percentage computation and Deccan land-use planning drill content to the sim."},
    ],
}


# ---------------------------------------------------------------------------
# Audit core
# ---------------------------------------------------------------------------

_NODE_ID_RE = re.compile(r"c\d+_([a-z]+)_(?:ch|cbse_)(\d+)_")


def load_nodes():
    with open(NODE_INDEX, encoding="utf-8") as f:
        data = json.load(f)
    nodes = [n for n in data["nodes"] if n.get("class") in (9, 10)]
    return nodes


def chapter_key(node):
    m = _NODE_ID_RE.match(node["node_id"])
    if not m:
        raise ValueError("unparseable node id: %s" % node["node_id"])
    return (node["class"], m.group(1), int(m.group(2)))


def audit_class(cls, nodes, sim_cache, defect_cache):
    cls_nodes = sorted([n for n in nodes if n["class"] == cls], key=lambda n: n["node_id"])

    # ---- chapter documents for IDF ----
    chap_docs = defaultdict(Counter)
    chap_nodes = defaultdict(list)
    for n in cls_nodes:
        k = chapter_key(n)
        chap_nodes[k].append(n)
        for t in tokenize((n.get("definition") or "") + " " + (n.get("mastery_criteria") or "")):
            if t not in STOPWORDS and len(t) > 2:
                chap_docs[k][light_stem(t)] += 1
    df = Counter()
    for doc in chap_docs.values():
        for t in doc:
            df[t] += 1
    N = max(1, len(chap_docs))

    def idf(t):
        return math.log((N + 1) / (1 + df.get(t, 0))) + 0.1

    # ---- sims ----
    mapped_sims = {}
    for k in chap_nodes:
        names = CHAPTER_MAP.get(k, [])
        paths = []
        for nm in names:
            p = find_sim_file(nm)
            if p:
                paths.append((nm, p))
            else:
                defects_missing_file = defect_cache.setdefault("__missing__", [])
                defects_missing_file.append("%s (mapped but file missing)" % nm)
        mapped_sims[k] = paths
        for nm, p in paths:
            if nm not in sim_cache:
                sim_cache[nm] = TokenIndex(sim_text(p))
            if nm not in defect_cache:
                defect_cache[nm] = scan_sim_defects(p)

    # ---- per node scoring ----
    results = []
    gold_by_sim = Counter()
    for n in cls_nodes:
        k = chapter_key(n)
        diags = n.get("diagnostics") or []
        sims = mapped_sims.get(k, [])
        uncovered = []
        per_diag = []
        if not diags:
            cov_ratio, verdict = 0.0, "MISSING"
        elif not sims:
            cov_ratio = 0.0
            verdict = "MISSING"
            uncovered = ["<no sim mapped to %s ch%d - all %d diagnostics uncovered>" % (
                n["subject"], k[2], len(diags))]
        else:
            for i, d in enumerate(diags, 1):
                tq, _ta = diagnostic_parts(d, idf)
                if not tq and not (_ta):
                    per_diag.append((i, 0.0, False))
                    uncovered.append("diagnostic %d (no extractable terms)" % i)
                    continue
                best = 0.0
                for nm, _p in sims:
                    best = max(best, diag_score(d, sim_cache[nm], idf))
                per_diag.append((i, round(best, 3), best >= COVER_THRESHOLD))
                if best < COVER_THRESHOLD:
                    q = (d.get("q") or "").strip().split("\n")[0]
                    uncovered.append("diagnostic %d (coverage %.2f): %s" % (i, best, q[:130]))
            covered = sum(1 for _i, _s, ok in per_diag if ok)
            cov_ratio = covered / len(diags)
            verdict = "GOLD" if cov_ratio >= GOLD_RATIO else ("PARTIAL" if cov_ratio >= PARTIAL_RATIO else "MISSING")

        # primary sim = mapped sim with best total coverage contribution
        primary = None
        if sims:
            if not per_diag:
                primary = sims[0][0]
            else:
                def sim_score(nm):
                    return sum(diag_score(d, sim_cache[nm], idf) for d in diags)
                primary = max(sims, key=lambda nm_p: sim_score(nm_p[0]))[0]
            if verdict == "GOLD":
                gold_by_sim[primary] += 1

        defects = []
        # node-side data quality: placeholder/empty diagnostic answers
        placeholder_kinds = re.compile(r"^\[?\s*(answer needed|tbd|todo|n/?a)\s*\]?$", re.I)
        for d in diags:
            a = (d.get("a") or "").strip()
            if a == "" or placeholder_kinds.match(a):
                defects.append({
                    "kind": "node_diagnostic_answer_placeholder",
                    "sim": None,
                    "detail": "diagnostic %d has an empty/placeholder answer in the node index" % d.get("index", 0),
                    "question": ((d.get("q") or "").strip().split("\n")[0])[:140],
                })
        for nm, _p in sims:
            for d in defect_cache.get(nm, []):
                dd = dict(d)
                dd["sim"] = nm
                defects.append(dd)

        entry = {
            "node_id": n["node_id"],
            "sim_id": primary,
            "sims": [nm for nm, _p in sims],
            "verdict": verdict,
            "coverage": round(cov_ratio, 3),
            "diagnostics_total": len(diags),
            "uncovered_diagnostics": uncovered,
            "defects": defects,
        }
        results.append(entry)

    # ---- spot-check consistency guard: the recorded hand verdicts must match
    # the heuristic's current verdicts, so a re-run can never silently drift
    # away from the verification record ----
    computed = {r["node_id"]: r["verdict"] for r in results}
    for chk in SPOT_CHECKS.get(cls, []):
        nid = chk["node_id"]
        if nid not in computed:
            raise AssertionError("spot_check references unknown node %s" % nid)
        if computed[nid] != chk["heuristic"]:
            raise AssertionError(
                "spot_check drift for %s: recorded heuristic=%s but audit now says %s - "
                "re-verify this node by hand and update SPOT_CHECKS" % (nid, chk["heuristic"], computed[nid]))

    return cls_nodes, results, gold_by_sim


def build_output(cls, cls_nodes, results, gold_by_sim, sim_cache, defect_cache):
    counts = Counter(r["verdict"] for r in results)
    sims_ranked = [
        {"sim_id": s, "gold_nodes": c}
        for s, c in sorted(gold_by_sim.items(), key=lambda kv: (-kv[1], kv[0]))
    ]
    mapped_node_count = sum(1 for r in results if r["sims"])
    defect_nodes = [r for r in results if any(d["sim"] for d in r["defects"])]
    node_data_defects = sum(
        1 for r in results if any(d["kind"] == "node_diagnostic_answer_placeholder" for d in r["defects"]))
    spot = SPOT_CHECKS.get(cls, [])
    spot_agree = sum(1 for s in spot if s["agree"])
    return {
        "class": cls,
        "generated_by": "backend/tools/audit_class910_depth.py",
        "method": {
            "approach": (
                "Chapter-level sim mapping (hand-curated by probing every candidate sim's "
                "teaching text, challenge banks and quiz items against each chapter's node "
                "definitions; components located via frontend/lib/c6_12_gameRegistry.ts and "
                "app/3d-lab/agentSims.json), then per-node diagnostic coverage scoring of "
                "each node's 5-6 diagnostics (q+a+misconception) against the full text of "
                "the mapped sim component(s)."
            ),
            "heuristic": (
                "A diagnostic counts covered when 0.65 * (IDF-weighted share of its question-"
                "stem terms present in the sim source text) + 0.35 * (share of its answer "
                "terms) >= %.2f. Both the diagnostic and the sim text are stemmed with the "
                "same light stemmer and matched by equality or shared prefix, plus a small "
                "curated synonym table (e.g. euclid->'hcf', locus->'equidistant'). "
                "IDF is computed over the class's chapter documents so common academic "
                "vocabulary cannot fake coverage. GOLD = all diagnostics covered; PARTIAL = "
                "at least two diagnostics covered; MISSING = no mapped sim or fewer than "
                "two diagnostics covered. Lexical heuristic - conservative on metaphorical "
                "sims; boundary cases were hand-verified (see spot_checks)." % (COVER_THRESHOLD,)
            ),
            "mapping_source": "CHAPTER_MAP table in backend/tools/audit_class910_depth.py",
            "sim_directories": [os.path.relpath(d, ROOT) for d in SIM_DIRS],
            "unmapped_chapters": sorted(
                "%s %s ch%d" % (cls, subj, ch)
                for (c, subj, ch) in {
                    chapter_key(n) for n in cls_nodes
                } if not CHAPTER_MAP.get((cls, subj, ch))
            ),
            "limitations": [
                "Lexical term-presence scoring, not interaction testing: a sim may exercise a "
                "skill without naming it, or name it without a scored interaction.",
                "Sims scoped to a different board track (ICSE-style commerce/computer-science/"
                "EVS components) were only mapped where their content genuinely exercises the "
                "CBSE chapter's diagnostic skills.",
                "Answer-key defect scan is structural (index range, duplicate options, numeric "
                "key type, % of arithmetic); it does not re-derive every computed answer.",
            ],
        },
        "summary": {
            "total_nodes": len(results),
            "gold": counts.get("GOLD", 0),
            "partial": counts.get("PARTIAL", 0),
            "missing": counts.get("MISSING", 0),
            "nodes_with_mapped_sim": mapped_node_count,
            "nodes_without_sim": counts.get("MISSING", 0) - sum(
                1 for r in results if r["verdict"] == "MISSING" and r["sims"]),
            "sims_ranked_by_gold_nodes": sims_ranked,
            "distinct_sims_delivering_gold": len(gold_by_sim),
            "nodes_with_sim_defects": len(defect_nodes),
            "nodes_with_placeholder_diagnostic_answers": node_data_defects,
        },
        "spot_checks": {
            "description": (
                "15 verdicts per class hand-verified against the actual sim interactions "
                "(stratified sample; fixed list recorded in the audit script)."
            ),
            "agree": spot_agree,
            "total": len(spot),
            "checks": spot,
        },
        "nodes": results,
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--class", type=int, choices=(9, 10), dest="klass")
    args = ap.parse_args()

    nodes = load_nodes()
    sim_cache, defect_cache = {}, {}
    classes = [args.klass] if args.klass else [9, 10]

    for cls in classes:
        cls_nodes, results, gold_by_sim = audit_class(cls, nodes, sim_cache, defect_cache)
        out = build_output(cls, cls_nodes, results, gold_by_sim, sim_cache, defect_cache)
        path = os.path.join(OUT_DIR, "CLASS%d_NODE_DEPTH.json" % cls)
        with open(path, "w", encoding="utf-8") as f:
            json.dump(out, f, indent=1, ensure_ascii=False, sort_keys=False)
        s = out["summary"]
        print("CLASS %d: total=%d gold=%d partial=%d missing=%d (no-sim=%d) sims_with_gold=%d defect_nodes=%d"
              % (cls, s["total_nodes"], s["gold"], s["partial"], s["missing"],
                 s["nodes_without_sim"], s["distinct_sims_delivering_gold"], s["nodes_with_sim_defects"]))
        missing_files = defect_cache.get("__missing__", [])
        if missing_files:
            print("  MISSING SIM FILES: %s" % "; ".join(sorted(set(missing_files))))
        print("  wrote %s" % path)


if __name__ == "__main__":
    sys.exit(main())
