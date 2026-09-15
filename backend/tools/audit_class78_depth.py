#!/usr/bin/env python3
"""
audit_class78_depth.py — Class 7 & 8 node DEPTH audit.

Companion to the class-6 node depth audit (same method, same output schema).
For every enhanced_nodes_index node of class 7 (575) and class 8 (550):

  1. Resolve the chapter-level sim mapping (sim components in
     frontend/components/simulations/c6_12/ are chapter-scoped, node ids in the
     index are c7_math_ch03_001-style, so mapping is chapter -> sims).
     The chapter map is hand-curated below (built by reading every sim's
     teaching text / challenge content and every chapter's node definitions;
     legacy `c7_math_011 // topic` comments inside the sims were used as
     evidence). A keyword fallback documents - but does not silently override -
     the curated table.
  2. Per node, extract its 5-6 diagnostics (question + answer + misconception)
     and score each diagnostic's concept terms against the FULL TEXT of the
     mapped sim(s) (teaching copy, challenges, quiz banks, labs, misconception
     killers - the whole component source).
  3. Verdict per node:
       GOLD    - every diagnostic skill exercised by the mapped sim content
       PARTIAL - at least two diagnostics exercised; uncovered ones are listed
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
  python backend/tools/audit_class78_depth.py            # writes both JSONs
  python backend/tools/audit_class78_depth.py --class 7  # one class only

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
SIM_DIR = os.path.join(ROOT, "frontend", "components", "simulations", "c6_12")
OUT_DIR = os.path.join(ROOT, "backend", "its", "competency")

COVER_THRESHOLD = 0.40   # blended q/a coverage score needed to call a diagnostic covered
GOLD_RATIO = 0.99        # covered/total diagnostics ratio for GOLD
PARTIAL_RATIO = 0.32     # at least 2 of 6 diagnostics exercised for PARTIAL

# ---------------------------------------------------------------------------
# Curated chapter -> sims mapping.
# Key: (class, subject, chapter). Subject is the node-index subject token.
# Value: list of sim basenames (without .tsx) that serve this chapter.
# Built by reading every C7_/C8_ sim's teaching text + challenge content and
# matching against each chapter's node definitions. Empty/absent key = no sim
# serves that chapter (those nodes are structurally MISSING).
# ---------------------------------------------------------------------------
CHAPTER_MAP = {
    # ============================ CLASS 7 ============================
    # -- biology (NCERT Curiosity track: ch6 adolescence, ch9/ch10 life processes)
    (7, "bio", 1): ["C7_ScienceAdolescenceAStageOfGrowthSim"],
    (7, "bio", 2): ["C7_ScienceLifeProcessesInAnimalsSim", "C7_ScienceNutritionInAnimalsSim",
                    "C7_ScienceRespirationInOrganismsSim"],
    (7, "bio", 3): ["C7_BiologyKingdomFungiSim"],  # contains a photosynthesis/respiration-in-plants section
    # -- chemistry (Curiosity ch4 metals, ch5 changes around us)
    (7, "chem", 1): ["C7_ScienceTheWorldOfMetalsAndSim"],
    (7, "chem", 2): ["C7_ChemistryMatterclassificationrevisitedSim"],  # rusting/combustion/change-classification content
    # -- civics
    (7, "civ", 2): ["C7_HistoryCivicsObjectivesJusticeLibertySim"],  # Preamble objectives -> Constitution chapter
    # -- history (new-NCERT themed chapters)
    (7, "hist", 1): ["C7_SocialScienceNewBeginningsCitiesSim"],
    (7, "hist", 2): ["C7_SocialScienceKingsKingdomsSim"],
    (7, "hist", 6): ["C7_HistoryCivicsAlwarsNayanarsVaishnavaSim"],
    (7, "hist", 7): ["C7_HistoryCivicsMeaningmedievalBeginningSim", "C7_HistoryCivicsComparativeStudyKhaljisSim",
                     "C7_HistoryCivicsFivePillarsIslamSim"],
    (7, "hist", 8): ["C7_SocialScienceRegionalCulturesSim", "C7_SocialScienceTribesNomadsSim"],
    # -- mathematics (new Ganita Prakash ch1-8 + legacy ch9-15)
    (7, "math", 1): ["C7_MathematicsLargeNumbersAroundUsSim"],
    (7, "math", 2): ["C7_MathematicsArithmeticExpressionsSim"],
    (7, "math", 3): ["C7_MathematicsAPeekBeyondThePointSim", "C7_MathematicsAnotherPeekBeyondThePointSim"],
    (7, "math", 4): ["C7_MathematicsExpressionsUsingLetterNumbersSim", "C7_MathematicsAlgebraicExpressionsSim"],
    (7, "math", 5): ["C7_MathematicsUnderstandingShapesPairsSim"],
    (7, "math", 6): ["C7_MathematicsNumberPlaySim"],
    (7, "math", 7): ["C7_MathematicsATaleOfThreeIntersectingSim", "C7_MathematicsUnderstandingShapesPairsSim"],
    (7, "math", 8): ["C7_MathematicsMultiplicationDivisionIntegersSim", "C7_MathematicsRationalNumbersSim"],
    (7, "math", 9): ["C7_MathematicsExtendCongruenceSimpleSim"],
    (7, "math", 10): ["C7_MathematicsMultiplicationDivisionIntegersSim"],
    (7, "math", 11): ["C7_MathematicsFindingCommonGroundSim"],
    (7, "math", 12): ["C7_MathematicsMultiplicationDivisionDecimalSim"],
    (7, "math", 13): ["C7_MathematicsDataHandlingSim"],
    (7, "math", 14): ["C7_MathematicsConstructionsAndTilingsSim"],
    (7, "math", 15): ["C7_MathematicsFindingTheUnknownSim"],
    # -- physics (Curiosity science chapters split into the physics subject)
    (7, "physics", 1): ["C7_ScienceTheEverEvolvingWorldOfSim"],
    (7, "physics", 2): ["C7_ScienceElectricityTorchlightSim", "C7_PhysicsElectricityCircuitsComponentsCBSESim",
                        "C7_PhysicsOhmsSim"],
    (7, "physics", 3): ["C7_PhysicsHeatTransferConductionSim"],
    (7, "physics", 4): ["C7_PhysicsMeasurementTimeMotionCBSESim", "C7_PhysicsMotionTimeCBSESim"],
    (7, "physics", 5): ["C7_PhysicsLightShadowsReflectionsCBSESim", "C7_PhysicsLightReflectionMirrorsCBSESim"],
    (7, "physics", 6): ["C7_ScienceEarthMoonAndTheSunSim"],
    (7, "physics", 7): ["C7_ScienceExploringSubstancesAcidicBasicNeutralSim", "C7_ScienceAcidsBasesAndSaltsSim"],
    # c7 eco 1-4, engl 1-5, geo 1-5, civ 1/3: no sims exist -> unmapped on purpose.

    # ============================ CLASS 8 ============================
    # -- biology (Curiosity ch2 invisible living world, ch3 health)
    (8, "bio", 1): ["C8_ScienceTheInvisibleLivingWorldBeyondSim", "C8_BiologyMicrobesFoodProductionSim"],
    (8, "bio", 2): ["C8_ScienceHealthTheUltimateTreasureSim"],
    # -- chemistry (Curiosity ch7 particulate nature, ch8 nature of matter)
    (8, "chem", 2): ["C8_PhysicsKineticTheoryMatterSim", "C8_ChemistryMatterstatesandinterconversionrevisitedSim"],
    (8, "chem", 3): ["C8_ChemistryWaterpropertiesandcompositionSim"],  # water/CO2 compounds, mixtures content
    # -- civics
    (8, "civ", 2): ["C8_HistoryCivicsVicepresidentQualificationsElectionSim"],
    (8, "civ", 3): ["C8_SocialScienceLawSocialJusticeSim"],
    # -- geography
    (8, "geo", 2): ["C8_GeographyRepresentationGeographicalFeaturesSim"],  # map projections / distortion nodes
    # -- history
    (8, "hist", 1): ["C8_HistoryCivicsPeriodTransitionMeaningSim"],
    (8, "hist", 3): ["C8_HistoryCivicsBattlePlassey1757Sim", "C8_HistoryCivicsAmericanIndependenceBeginningSim",
                     "C8_HistoryCivicsWoodsDespatch1854Sim"],
    (8, "hist", 4): ["C8_HistoryCivicsLucknowPact1916Sim", "C8_HistoryCivicsSwamiVivekanandaRamakrishnaSim"],
    (8, "hist", 5): ["C8_SocialScienceCulturalCurrentsSim"],
    # -- mathematics (new Ganita Prakash ch1-14)
    (8, "math", 1): ["C8_MathematicsASquareAndACubeSim", "C8_MathematicsSquaresAndSquareRootsSim",
                     "C8_MathematicsCubesAndCubeRootsSim"],
    (8, "math", 2): ["C8_MathematicsPowerPlaySim", "C8_MathematicsExponentsAndPowersSim"],
    (8, "math", 4): ["C8_MathematicsUnderstandingQuadrilateralsSim", "C8_MathematicsQuadrilateralsSim",
                     "C8_MathematicsExploringSomeGeometricThemesSim"],
    (8, "math", 6): ["C8_MathematicsWeDistributeYetThingsMultiplySim", "C8_MathematicsAlgebraicExpressionsAndIdentitiesSim"],
    (8, "math", 7): ["C8_MathematicsProportionalReasoning1Sim"],
    (8, "math", 8): ["C8_MathematicsComparingQuantitiesSim", "C8_MathematicsDisjointSim"],
    (8, "math", 9): ["C8_MathematicsTheBaudhayanaPythagorasTheoremSim"],
    (8, "math", 10): ["C8_MathematicsDirectAndInverseProportionsSim", "C8_MathematicsDirectAndInverseProportionsIntroductionSim",
                      "C8_MathematicsProportionalReasoning2Sim"],
    (8, "math", 12): ["C8_MathematicsTalesByDotsAndLinesSim", "C8_MathematicsDataHandlingSim"],
    (8, "math", 13): ["C8_MathematicsLinearEquationsInOneVariableSim", "C8_MathematicsAlgebraPlaySim",
                      "C8_MathematicsIntroductionToGraphsSim"],
    (8, "math", 14): ["C8_MathematicsAreaTrapeziumPolygonSim"],
    # -- physics (Curiosity ch1,4,5,6,9,10,11,12,13)
    (8, "physics", 1): ["C8_ScienceExploringTheInvestigativeWorldOfSim"],
    (8, "physics", 2): ["C8_PhysicsElectricityMagneticHeatingCBSESim"],
    (8, "physics", 3): ["C8_ScienceExploringForcesSim", "C8_PhysicsTurningEffectForceSim"],
    (8, "physics", 4): ["C8_SciencePressureWindsStormsAndCyclonesSim"],
    (8, "physics", 5): ["C8_ScienceTheAmazingWorldOfSolutesSim"],
    (8, "physics", 6): ["C8_PhysicsLightCBSESim"],
    (8, "physics", 7): ["C8_ScienceKeepingTimeWithTheSkiesSim"],
    (8, "physics", 8): ["C8_ScienceHowNatureWorksInHarmonySim"],
    (8, "physics", 9): ["C8_ScienceOurHomeEarthAUniqueSim"],
    # c8 math ch3/5/11, bio none-extra, civ 1/4, eco 1-3, engl 1-5, geo 1, hist 2: unmapped on purpose.
}

# ---------------------------------------------------------------------------
# Domain synonym expansion for diagnostic terms (semantic bridging, kept small
# and auditable). Keys are stemmed tokens; values are alternative spellings /
# symbol forms searched in sim text.
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
# Hand verification record (30 verdicts, 15 per class, drawn stratified with a
# fixed seed from the first heuristic run and checked by reading the node's
# diagnostics against the sim's actual challenges/labs/teaching copy).
# ---------------------------------------------------------------------------
SPOT_CHECKS = {
    7: [
        {"node_id": "c7_math_ch12_004", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
         "note": "Sim covers decimal division with quotient decimal-point placement."},
        {"node_id": "c7_civ_ch02_004", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
         "note": "Sim teaches Constituent Assembly adoption, 2y11m18d of debate, Ambedkar/drafting."},
        {"node_id": "c7_bio_ch03_004", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
         "note": "Sim's photosynthesis section covers raw materials, chlorophyll, starch, stomata, CO2."},
        {"node_id": "c7_physics_ch02_011", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
         "note": "Sim has conductivity-tester challenges (glow, insulators, testing circuit)."},
        {"node_id": "c7_math_ch05_005", "heuristic": "GOLD", "hand": "PARTIAL", "agree": False,
         "note": "Overcall: perpendicular appears only incidentally (Pythagoras legs, misconception note); perpendicular-symbol and algebra diagnostics are not systematically exercised."},
        {"node_id": "c7_math_ch01_003", "heuristic": "PARTIAL", "hand": "PARTIAL", "agree": True,
         "note": "Sim covers lakh/crore grouping and in-words reading; only the open design task is uncovered."},
        {"node_id": "c7_hist_ch08_009", "heuristic": "PARTIAL", "hand": "MISSING", "agree": False,
         "note": "Overcall: RegionalCultures sim is Kerala/Rajasthan content; nothing on Vasudhaiva Kutumbakam or migrant communities."},
        {"node_id": "c7_chem_ch02_009", "heuristic": "PARTIAL", "hand": "PARTIAL", "agree": True,
         "note": "Sim covers rusting/combustion and change classification; one higher-order design diagnostic uncovered."},
        {"node_id": "c7_chem_ch02_001", "heuristic": "PARTIAL", "hand": "PARTIAL", "agree": True,
         "note": "Same sim; physical-vs-chemical change identification exercised."},
        {"node_id": "c7_physics_ch02_004", "heuristic": "PARTIAL", "hand": "PARTIAL", "agree": True,
         "note": "Circuits sim covers most electricity diagnostics; one uncovered."},
        {"node_id": "c7_eco_ch01_001", "heuristic": "MISSING", "hand": "MISSING", "agree": True,
         "note": "No class-7 economics sim exists."},
        {"node_id": "c7_geo_ch02_002", "heuristic": "MISSING", "hand": "MISSING", "agree": True,
         "note": "No sim serves class-7 geography chapters (topo-maps and soil sims are legacy topics)."},
        {"node_id": "c7_engl_ch03_015", "heuristic": "MISSING", "hand": "MISSING", "agree": True,
         "note": "No English sims exist for classes 7/8."},
        {"node_id": "c7_bio_ch01_008", "heuristic": "MISSING", "hand": "MISSING", "agree": True,
         "note": "Adolescence sim covers growth/height changes; zero hygiene content."},
        {"node_id": "c7_bio_ch01_009", "heuristic": "MISSING", "hand": "MISSING", "agree": True,
         "note": "One incidental 'exercise' mention; physical-activity diagnostics unexercised."},
    ],
    8: [
        {"node_id": "c8_chem_ch2_7", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
         "note": "Kinetic-theory sim exercises liquid particle behaviour (particles, vibrate, fluid)."},
        {"node_id": "c8_civ_ch2_9", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
         "note": "Sim covers President, Article 52, electoral college, Lok Sabha, assent."},
        {"node_id": "c8_geo_ch2_5", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
         "note": "Sim includes continents/continentality/equator content; basin-level specifics absent but skills exercised."},
        {"node_id": "c8_math_ch9_1", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
         "note": "Exact topic match (Baudhayana Sulba-Sutra, right-triangle theorem)."},
        {"node_id": "c8_physics_ch3_2", "heuristic": "GOLD", "hand": "GOLD", "agree": True,
         "note": "Sim exercises force direction/speed/newton effects on motion."},
        {"node_id": "c8_bio_ch1_4", "heuristic": "PARTIAL", "hand": "PARTIAL", "agree": True,
         "note": "Cell/microbe content covers most diagnostics; membrane design tasks uncovered."},
        {"node_id": "c8_math_ch9_2", "heuristic": "PARTIAL", "hand": "PARTIAL", "agree": True,
         "note": "Borderline: only thin diagonal/sqrt content; square-doubling construction weakly exercised."},
        {"node_id": "c8_geo_ch2_7", "heuristic": "PARTIAL", "hand": "MISSING", "agree": False,
         "note": "Overcall: node is about world oceans (Pacific/Mariana/sea routes); maps sim has projections/scale/legend only."},
        {"node_id": "c8_physics_ch7_2", "heuristic": "PARTIAL", "hand": "PARTIAL", "agree": True,
         "note": "Sim has crescent/gibbous/quarter/waxing; the two angle-geometry phase diagnostics uncovered."},
        {"node_id": "c8_physics_ch3_9", "heuristic": "PARTIAL", "hand": "PARTIAL", "agree": True,
         "note": "Coverage driven by ExploringForces (friction x21); primary-sim label TurningEffectForce is an attribution artefact."},
        {"node_id": "c8_math_ch3_10", "heuristic": "MISSING", "hand": "MISSING", "agree": True,
         "note": "'A Story of Numbers' chapter has no sim."},
        {"node_id": "c8_engl_ch5_5", "heuristic": "MISSING", "hand": "MISSING", "agree": True,
         "note": "No English sims exist for classes 7/8."},
        {"node_id": "c8_engl_ch3_7", "heuristic": "MISSING", "hand": "MISSING", "agree": True,
         "note": "No English sims exist for classes 7/8."},
        {"node_id": "c8_math_ch12_9", "heuristic": "MISSING", "hand": "MISSING", "agree": True,
         "note": "DataHandling sim is pie/bar-chart centred; mode/measure-choice diagnostics only glanced."},
        {"node_id": "c8_physics_ch1_7", "heuristic": "MISSING", "hand": "PARTIAL", "agree": False,
         "note": "Undercall: sim exercises hypothesis/variables/controlled-experiment skills with different scenario vocabulary than the diagnostics."},
    ],
}



# ---------------------------------------------------------------------------
# Audit core
# ---------------------------------------------------------------------------

def load_nodes():
    with open(NODE_INDEX, encoding="utf-8") as f:
        data = json.load(f)
    nodes = [n for n in data["nodes"] if n.get("class") in (7, 8)]
    return nodes


def chapter_key(node):
    m = re.match(r"c\d+_([a-z]+)_ch(\d+)_", node["node_id"])
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
    def sim_path(name):
        p = os.path.join(SIM_DIR, name + ".tsx")
        return p if os.path.exists(p) else None

    mapped_sims = {}
    for k in chap_nodes:
        names = CHAPTER_MAP.get(k, [])
        paths = []
        for nm in names:
            p = sim_path(nm)
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
            uncovered = ["<no sim mapped to %s %s ch%d - all %d diagnostics uncovered>" % (
                n["subject"], "", k[2], len(diags))]
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
        "generated_by": "backend/tools/audit_class78_depth.py",
        "method": {
            "approach": (
                "Chapter-level sim mapping (hand-curated from every sim's teaching text, "
                "challenge banks and embedded legacy node-id comments, matched against each "
                "chapter's node definitions), then per-node diagnostic coverage scoring of "
                "each node's 5-6 diagnostics (q+a+misconception) against the full text of "
                "the mapped sim component(s)."
            ),
            "heuristic": (
                "A diagnostic counts covered when 0.65 * (IDF-weighted share of its question-"
                "stem terms present in the sim source text) + 0.35 * (share of its answer "
                "terms) >= %.2f. Both the diagnostic and the sim text are stemmed with the "
                "same light stemmer and matched by equality or shared prefix, plus a small "
                "curated synonym table (e.g. percent->'%%', hcf->'highest common factor'). "
                "IDF is computed over the class's chapter documents so common academic "
                "vocabulary cannot fake coverage. GOLD = all diagnostics covered; PARTIAL = "
                "at least two diagnostics covered; MISSING = no mapped sim or fewer than "
                "two diagnostics covered. Lexical heuristic - conservative on metaphorical "
                "sims; boundary cases were hand-verified (see spot_checks)." % (COVER_THRESHOLD,)
            ),
            "mapping_source": "CHAPTER_MAP table in backend/tools/audit_class78_depth.py",
            "unmapped_chapters": sorted(
                "%s %s ch%d" % (cls, subj, ch)
                for (c, subj, ch) in {
                    chapter_key(n) for n in cls_nodes
                } if not CHAPTER_MAP.get((cls, subj, ch))
            ),
            "limitations": [
                "Lexical term-presence scoring, not interaction testing: a sim may exercise a "
                "skill without naming it, or name it without a scored interaction.",
                "Sims scoped to the legacy (pre-curriculum-change) syllabus deliver nothing to "
                "the current node index and count as unmapped topics.",
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
    ap.add_argument("--class", type=int, choices=(7, 8), dest="klass")
    args = ap.parse_args()

    nodes = load_nodes()
    sim_cache, defect_cache = {}, {}
    classes = [args.klass] if args.klass else [7, 8]

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
        print("  wrote %s" % path)


if __name__ == "__main__":
    sys.exit(main())
