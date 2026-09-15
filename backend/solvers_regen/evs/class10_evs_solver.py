"""
CISCE Class 10 Environmental Science (EVS) - Complete Solver & Question Generator
Deterministic, seed-controlled, no external LLM calls.
Covers full Class 10 EVS syllabus: 16 major topic nodes.
"""

from __future__ import annotations

import math
import random
import re
import json
import dataclasses
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any, Tuple
from enum import Enum


# ============================================================
# 1. DATA MODELS
# ============================================================

class QType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"


class Topic(Enum):
    AIR_POLLUTION       = "c10_evs_001"
    WATER_POLLUTION     = "c10_evs_002"
    SOIL_POLLUTION      = "c10_evs_003"
    NOISE_POLLUTION     = "c10_evs_004"
    ECOSYSTEMS          = "c10_evs_005"
    BIODIVERSITY        = "c10_evs_006"
    SUSTAINABLE_DEV     = "c10_evs_007"
    WATER_RESOURCES     = "c10_evs_008"
    FOREST_RESOURCES    = "c10_evs_009"
    ENERGY_RESOURCES    = "c10_evs_010"
    WASTE_MANAGEMENT    = "c10_evs_011"
    CLIMATE_CHANGE      = "c10_evs_012"
    ENV_LAWS_POLICIES   = "c10_evs_013"
    DISASTER_MGMT       = "c10_evs_014"
    POPULATION_ENV      = "c10_evs_015"
    AGRICULTURE         = "c10_evs_016"


class Difficulty(Enum):
    EASY   = "easy"
    MEDIUM = "medium"
    HARD   = "hard"


@dataclass
class Question:
    id:         str
    type:       str
    topic:      str
    difficulty: str
    question:   str
    options:    Optional[List[str]]      = None
    answer:     Any                      = None
    explanation:str                       = ""
    unit:       Optional[str]            = None
    blank_word: Optional[str]            = None


@dataclass
class SolverResult:
    answer:      Any
    steps:       List[str]
    verification: str
    confidence:  str


ALL_TOPICS: List[str] = [t.value for t in Topic]


# ============================================================
# 2. AIR POLLUTION SOLVER
# ============================================================

def _aqi_sub_index_pm25(conc):
    if conc <= 30:
        return (50.0 / 30.0) * conc
    elif conc <= 60:
        return 50.0 + (50.0 / 30.0) * (conc - 30)
    elif conc <= 90:
        return 100.0 + (100.0 / 30.0) * (conc - 60)
    elif conc <= 120:
        return 200.0 + (100.0 / 30.0) * (conc - 90)
    elif conc <= 250:
        return 300.0 + (100.0 / 130.0) * (conc - 120)
    else:
        return 400.0 + (100.0 / 130.0) * (conc - 250)


def _aqi_sub_index_pm10(conc):
    if conc <= 50:
        return (50.0 / 50.0) * conc
    elif conc <= 100:
        return 50.0 + (50.0 / 50.0) * (conc - 50)
    elif conc <= 250:
        return 100.0 + (100.0 / 150.0) * (conc - 100)
    elif conc <= 350:
        return 200.0 + (100.0 / 100.0) * (conc - 250)
    elif conc <= 430:
        return 300.0 + (100.0 / 80.0) * (conc - 350)
    else:
        return 400.0 + (100.0 / 80.0) * (conc - 430)


def _aqi_sub_index_so2(conc):
    if conc <= 40:
        return (50.0 / 40.0) * conc
    elif conc <= 80:
        return 50.0 + (50.0 / 40.0) * (conc - 40)
    elif conc <= 380:
        return 100.0 + (100.0 / 300.0) * (conc - 80)
    elif conc <= 800:
        return 200.0 + (100.0 / 420.0) * (conc - 380)
    else:
        return 400.0 + (100.0 / 420.0) * (conc - 800)


def _aqi_sub_index_no2(conc):
    if conc <= 40:
        return (50.0 / 40.0) * conc
    elif conc <= 80:
        return 50.0 + (50.0 / 40.0) * (conc - 40)
    elif conc <= 180:
        return 100.0 + (100.0 / 100.0) * (conc - 80)
    elif conc <= 280:
        return 200.0 + (100.0 / 100.0) * (conc - 180)
    elif conc <= 400:
        return 300.0 + (100.0 / 120.0) * (conc - 280)
    else:
        return 400.0 + (100.0 / 120.0) * (conc - 400)


def solve_air_pollution(params: Dict) -> SolverResult:
    mode = params.get("mode", "aqi")
    steps: List[str] = []

    if mode == "aqi":
        pm25  = float(params.get("pm25", 0))
        pm10  = float(params.get("pm10", 0))
        so2   = float(params.get("so2", 0))
        no2   = float(params.get("no2", 0))

        steps.append("Step 1: Record pollutant concentrations:")
        steps.append(f"  PM2.5  = {pm25} ug/m3")
        steps.append(f"  PM10   = {pm10} ug/m3")
        steps.append(f"  SO2    = {so2} ug/m3")
        steps.append(f"  NO2    = {no2} ug/m3")

        si_pm25 = _aqi_sub_index_pm25(pm25)
        si_pm10 = _aqi_sub_index_pm10(pm10)
        si_so2  = _aqi_sub_index_so2(so2)
        si_no2  = _aqi_sub_index_no2(no2)

        steps.append("Step 2: Calculate sub-indices (CPCB breakpoints):")
        steps.append(f"  PM2.5 SI  = {si_pm25:.1f}")
        steps.append(f"  PM10  SI  = {si_pm10:.1f}")
        steps.append(f"  SO2   SI  = {si_so2:.1f}")
        steps.append(f"  NO2   SI  = {si_no2:.1f}")

        aqi = max(si_pm25, si_pm10, si_so2, si_no2)
        steps.append(f"Step 3: Overall AQI = max of all sub-indices = {aqi:.1f}")

        if aqi <= 50:
            cat, hltxt = "Good", "Minimal health impact"
        elif aqi <= 100:
            cat, hltxt = "Satisfactory", "Minor breathing discomfort to sensitive people"
        elif aqi <= 200:
            cat, hltxt = "Moderately Polluted", "Breathing discomfort to people with lung disease, asthma"
        elif aqi <= 300:
            cat, hltxt = "Poor", "Breathing discomfort to most people on prolonged exposure"
        elif aqi <= 400:
            cat, hltxt = "Very Poor", "Respiratory illness on prolonged exposure"
        else:
            cat, hltxt = "Severe", "Affects healthy people and seriously impacts those with diseases"

        steps.append(f"Step 4: Category = {cat} ({hltxt})")

        ans = {"aqi": round(aqi, 1), "category": cat, "health_impact": hltxt,
                "sub_indices": {"PM2.5": round(si_pm25, 1), "PM10": round(si_pm10, 1),
                                "SO2": round(si_so2, 1), "NO2": round(si_no2, 1)}}
        ver = f"Verified: AQI {aqi:.1f} falls under '{cat}' per CPCB National Air Quality Index. Dominant pollutant sub-index = {aqi:.1f}."

        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    elif mode == "efficiency":
        initial = float(params.get("initial_conc", 0))
        final   = float(params.get("final_conc", 0))
        steps.append("Step 1: Record concentrations:")
        steps.append(f"  Initial  = {initial} ug/m3")
        steps.append(f"  Final    = {final} ug/m3")
        removed = initial - final
        eff = (removed / initial) * 100.0 if initial > 0 else 0
        steps.append("Step 2: Amount removed:")
        steps.append(f"  Removed = {initial} - {final} = {removed} ug/m3")
        steps.append("Step 3: Efficiency:")
        steps.append(f"  Efficiency = (Removed / Initial) x 100 = ({removed}/{initial}) x 100 = {eff:.1f}%")
        ver = f"Verified: If {initial} ug/m3 reduced by {eff:.1f}%, final = {initial*(100-eff)/100:.1f} ug/m3."
        return SolverResult(answer=round(eff, 1), steps=steps, verification=ver, confidence="high")

    return SolverResult(answer="Unknown mode", steps=["Use mode='aqi' or 'efficiency'."], verification="N/A", confidence="low")


# ============================================================
# 3. WATER POLLUTION SOLVER
# ============================================================

def solve_water_pollution(params: Dict) -> SolverResult:
    mode = params.get("mode", "bod")
    steps: List[str] = []

    if mode == "bod":
        do_initial = float(params.get("do_initial", 0))
        do_final   = float(params.get("do_final", 0))
        dilution   = float(params.get("dilution", 1))
        steps.append("Step 1: Record values:")
        steps.append(f"  DO initial = {do_initial} mg/L")
        steps.append(f"  DO final   = {do_final} mg/L")
        steps.append(f"  Dilution   = {dilution}")
        bod = (do_initial - do_final) * dilution
        steps.append("Step 2: Apply BOD formula:")
        steps.append(f"  BOD = (DOi - DOf) x Dilution")
        steps.append(f"  BOD = ({do_initial} - {do_final}) x {dilution}")
        steps.append(f"  BOD = {do_initial - do_final} x {dilution} = {bod:.2f} mg/L")
        if bod <= 1:
            q = "Excellent - Very clean"
        elif bod <= 3:
            q = "Good - Acceptable"
        elif bod <= 6:
            q = "Fair - Moderately polluted"
        else:
            q = "Poor - Heavily polluted"
        steps.append(f"Step 3: Water quality: {q}")
        ans = {"bod_mg_per_L": round(bod, 2), "quality": q}
        ver = f"Verified: BOD {bod:.2f} mg/L => '{q}'. WHO drinking standard: BOD < 1 mg/L."
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    elif mode == "wqi":
        ph      = float(params.get("ph", 7))
        bod     = float(params.get("bod", 0))
        do_conc = float(params.get("do", 8))
        nitrates= float(params.get("nitrates", 0))
        coliform= float(params.get("coliform", 0))
        steps.append("Step 1: Record water quality parameters:")
        steps.append(f"  pH = {ph}, BOD = {bod} mg/L, DO = {do_conc} mg/L")
        steps.append(f"  Nitrates = {nitrates} mg/L, Coliform = {coliform} MPN/100mL")
        # Simple weighted index
        ph_score   = 100 - abs(ph - 7.0) * 15
        bod_score  = max(0, 100 - bod * 15)
        do_score   = min(100, do_conc / 8.0 * 100)
        nit_score  = max(0, 100 - nitrates * 2)
        coli_score = max(0, 100 - coliform / 10)
        wqi = (ph_score + bod_score + do_score + nit_score + coli_score) / 5.0
        steps.append("Step 2: Score each parameter (0-100 scale):")
        steps.append(f"  pH score = {ph_score:.1f}, BOD score = {bod_score:.1f}, DO score = {do_score:.1f}")
        steps.append(f"  Nitrate score = {nit_score:.1f}, Coliform score = {coli_score:.1f}")
        steps.append(f"Step 3: WQI = average = {wqi:.1f}")
        if wqi >= 80:
            wcat = "A (Excellent)"
        elif wqi >= 65:
            wcat = "B (Good)"
        elif wqi >= 50:
            wcat = "C (Medium)"
        elif wqi >= 25:
            wcat = "D (Bad)"
        else:
            wcat = "E (Very Bad)"
        steps.append(f"  Category: {wcat}")
        ans = {"wqi": round(wqi, 1), "category": wcat, "scores": {"pH": round(ph_score,1),
               "BOD": round(bod_score,1), "DO": round(do_score,1)}}
        ver = f"Verified: WQI = average of 5 parameter scores = {wqi:.1f} => {wcat}"
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    return SolverResult(answer="Unknown mode", steps=["Use mode='bod' or 'wqi'."], verification="N/A", confidence="low")


# ============================================================
# 4. SOIL POLLUTION SOLVER
# ============================================================

def solve_soil_pollution(params: Dict) -> SolverResult:
    mode = params.get("mode", "ph")
    steps: List[str] = []

    if mode == "ph":
        ph = float(params.get("ph", 7))
        steps.append("Step 1: Record soil pH:")
        steps.append(f"  pH = {ph}")
        if ph < 4.5:
            cat = "Extremely Acidic"; effect = "Al toxicity, nutrient lock-up"; crop = "Tea, Blueberry"
        elif ph < 5.5:
            cat = "Strongly Acidic"; effect = "P deficiency, Al toxicity"; crop = "Potato, Rye, Coffee"
        elif ph < 6.5:
            cat = "Moderately Acidic"; effect = "Good, may need slight liming"; crop = "Wheat, Rice, Maize"
        elif ph < 7.5:
            cat = "Neutral"; effect = "Optimal for most crops"; crop = "All major crops"
        elif ph < 8.5:
            cat = "Alkaline"; effect = "Fe, Zn, Mn deficiency"; crop = "Barley, Sugar beet"
        else:
            cat = "Strongly Alkaline"; effect = "Salt accumulation, severe deficiency"; crop = "Very few crops"
        steps.append(f"Step 2: Classification = {cat}")
        steps.append(f"  Effect on plants: {effect}")
        steps.append(f"  Suitable crops: {crop}")
        steps.append("Step 3: Remedial measures:")
        if ph < 6.5:
            steps.append("  Apply lime (CaO/CaCO3) and add organic manure")
        elif ph > 7.5:
            steps.append("  Add gypsum, elemental sulfur, organic compost")
        else:
            steps.append("  Maintain with organic farming and crop rotation")
        ans = {"ph": ph, "classification": cat, "effect": effect, "suitable_crops": crop}
        ver = f"Verified: pH {ph} = '{cat}' per USDA soil taxonomy classification."
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    elif mode == "contamination":
        conc    = float(params.get("concentration", 0))
        limit   = float(params.get("safe_limit", 50))
        steps.append("Step 1: Record values:")
        steps.append(f"  Measured concentration = {conc} mg/kg")
        steps.append(f"  Safe limit            = {limit} mg/kg")
        ratio = conc / limit if limit > 0 else 0
        steps.append("Step 2: Compare with safe limit:")
        steps.append(f"  Ratio = {conc} / {limit} = {ratio:.2f}")
        if ratio <= 1:
            lvl = "Safe"; action = "Suitable for agriculture"
        elif ratio <= 2:
            lvl = "Slightly contaminated"; action = "Monitor crops regularly"
        elif ratio <= 5:
            lvl = "Moderately contaminated"; action = "Remediation needed before cultivation"
        else:
            lvl = "Heavily contaminated"; action = "Land must be restricted, serious remediation required"
        steps.append(f"  Level: {lvl}")
        steps.append(f"  Action: {action}")
        ans = {"ratio": round(ratio, 2), "level": lvl, "action": action}
        ver = f"Verified: {conc}/{limit} = {ratio:.2f}x safe limit => {lvl}"
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    return SolverResult(answer="Unknown mode", steps=["Use mode='ph' or 'contamination'."], verification="N/A", confidence="low")


# ============================================================
# 5. NOISE POLLUTION SOLVER
# ============================================================

def solve_noise_pollution(params: Dict) -> SolverResult:
    mode = params.get("mode", "combined")
    steps: List[str] = []

    if mode == "combined":
        raw = params.get("noise_levels", "")
        if isinstance(raw, list):
            levels = [float(x) for x in raw]
        else:
            levels = [float(x.strip()) for x in str(raw).split(",") if x.strip()]
        steps.append("Step 1: Individual noise sources:")
        for i, lv in enumerate(levels):
            steps.append(f"  Source {i+1}: {lv} dB")
        total_I = sum(10 ** (lv / 10.0) for lv in levels)
        combined = 10.0 * math.log10(total_I)
        steps.append("Step 2: Convert dB to intensity ratios:")
        for i, lv in enumerate(levels):
            steps.append(f"  Source {i+1}: I/I0 = 10^{lv/10:.3f} = {10**(lv/10):.3f}")
        steps.append(f"Step 3: Sum intensities and convert back:")
        steps.append(f"  Sum = {total_I:.3f}")
        steps.append(f"  L_total = 10 x log10({total_I:.3f}) = {combined:.1f} dB")
        if combined <= 55:
            impact = "Acceptable (residential daytime limit 55 dB)"
        elif combined <= 65:
            impact = "Moderate (interferes with conversation)"
        elif combined <= 75:
            impact = "High (annoying, affects work)"
        elif combined <= 90:
            impact = "Very High (hearing damage risk)"
        else:
            impact = "Extreme (immediate hearing damage)"
        steps.append(f"Step 4: Impact: {impact}")
        ans = {"combined_db": round(combined, 1), "impact": impact, "num_sources": len(levels)}
        ver = f"Verified: {len(levels)} sources => {combined:.1f} dB. CPCB residential limit: 55 dB (day), 45 dB (night)."
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    elif mode == "exposure":
        db = float(params.get("noise_level", 0))
        steps.append(f"Step 1: Noise level = {db} dB")
        if db > 85:
            safe_hrs = 8.0 / (2 ** ((db - 85) / 3.0))
        else:
            safe_hrs = 8.0
        steps.append("Step 2: Safe exposure time (T = 8 / 2^((L-85)/3)):")
        steps.append(f"  T = 8 / 2^({(db-85)/3:.3f}) = {safe_hrs:.2f} hours ({safe_hrs*60:.0f} min)")
        if db <= 55:
            imp = "Unlimited exposure safe"
        elif db <= 75:
            imp = "Moderate risk with prolonged exposure"
        else:
            imp = "Dangerous - hearing protection mandatory"
        steps.append(f"Step 3: Safety: {imp}")
        ans = {"safe_hours": round(safe_hrs, 2), "safe_minutes": round(safe_hrs * 60, 0), "safety": imp}
        ver = f"Verified: At {db} dB, safe for {safe_hrs:.1f} h per occupational standard."
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    return SolverResult(answer="Unknown mode", steps=["Use mode='combined' or 'exposure'."], verification="N/A", confidence="low")


# ============================================================
# 6. ECOSYSTEM SOLVER
# ============================================================

def solve_ecosystem(params: Dict) -> SolverResult:
    mode = params.get("mode", "energy")
    steps: List[str] = []

    if mode == "energy":
        producer_e = float(params.get("producer_energy", 10000))
        n_levels   = int(params.get("num_levels", 4))
        eff_pct    = float(params.get("efficiency", 10))
        eff = eff_pct / 100.0
        level_names = ["Producers", "Primary Consumers", "Secondary Consumers",
                        "Tertiary Consumers", "Quaternary Consumers"]
        steps.append("Step 1: Given:")
        steps.append(f"  Producer energy  = {producer_e} kcal/m2/yr")
        steps.append(f"  Trophic levels   = {n_levels}")
        steps.append(f"  Transfer eff.    = {eff_pct:.0f}%")
        energies = [producer_e]
        cur = producer_e
        steps.append("Step 2: Energy at each trophic level (10% law):")
        for i in range(1, n_levels):
            cur = cur * eff
            energies.append(cur)
            steps.append(f"  {level_names[i]}: {energies[i-1]:.0f} x {eff_pct:.0f}% = {cur:.2f}")
        top_e = energies[-1]
        overall_eff = (top_e / producer_e) * 100.0
        steps.append(f"Step 3: Energy at top consumer = {top_e:.2f} kcal/m2/yr")
        steps.append(f"Step 4: Overall efficiency = ({top_e:.2f}/{producer_e}) x 100 = {overall_eff:.4f}%")
        names = level_names[:n_levels]
        ans = {"trophic_energies": {names[i]: round(energies[i], 2) for i in range(n_levels)},
               "top_consumer_energy": round(top_e, 2), "overall_efficiency_pct": round(overall_eff, 4)}
        ver = f"Verified: {eff_pct}% x {eff_pct}% x ... ({n_levels-1} times) = {eff**(n_levels-1)*100:.4f}%"
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    elif mode == "efficiency":
        inp = float(params.get("input_energy", 0))
        out = float(params.get("output_energy", 0))
        steps.append("Step 1: Record values:")
        steps.append(f"  Input energy  = {inp} kcal/m2/yr")
        steps.append(f"  Output energy = {out} kcal/m2/yr")
        eff = (out / inp) * 100.0 if inp > 0 else 0
        lost = inp - out
        loss_pct = 100.0 - eff
        steps.append("Step 2: Calculate efficiency:")
        steps.append(f"  Efficiency = ({out}/{inp}) x 100 = {eff:.2f}%")
        steps.append(f"Step 3: Energy lost = {lost:.2f} kcal/m2/yr ({loss_pct:.2f}%)")
        interp = "Normal (follows ~10% law)" if eff <= 15 else "Higher than typical (unusual or measurement error)"
        steps.append(f"  Interpretation: {interp}")
        ans = {"efficiency_pct": round(eff, 2), "energy_lost": round(lost, 2), "interpretation": interp}
        ver = f"Verified: {eff:.2f}% + {loss_pct:.2f}% = 100%"
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    return SolverResult(answer="Unknown mode", steps=["Use mode='energy' or 'efficiency'."], verification="N/A", confidence="low")


# ============================================================
# 7. BIODIVERSITY SOLVER
# ============================================================

def solve_biodiversity(params: Dict) -> SolverResult:
    mode = params.get("mode", "simpson")
    steps: List[str] = []

    if mode == "simpson":
        raw = params.get("species_counts", "")
        if isinstance(raw, str):
            counts = [float(x.strip()) for x in raw.split(",") if x.strip()]
        elif isinstance(raw, list):
            counts = [float(x) for x in raw]
        else:
            counts = list(raw.values()) if isinstance(raw, dict) else []
        total = sum(counts)
        n = len(counts)
        steps.append("Step 1: Species abundances:")
        for i, c in enumerate(counts):
            steps.append(f"  Species {i+1}: {c:.0f} individuals")
        steps.append(f"  Total N = {total:.0f}, Species S = {n}")
        num = total * (total - 1)
        den = sum(c * (c - 1) for c in counts)
        D = num / den if den > 0 else float(n)
        D_div = 1.0 - (1.0 / D)
        H = 0.0
        for c in counts:
            if c > 0:
                p = c / total
                H -= p * math.log(p)
        steps.append("Step 2: Simpson Index D:")
        steps.append(f"  D = N(N-1)/sum(n_i(n_i-1)) = {num:.0f}/{den:.0f} = {D:.3f}")
        steps.append(f"Step 3: Simpson Diversity (1-1/D) = {D_div:.3f}")
        steps.append(f"Step 4: Shannon-Wiener Index H = {H:.3f}")
        if D_div > 0.8:
            dl = "Very High diversity"
        elif D_div > 0.6:
            dl = "High diversity"
        elif D_div > 0.4:
            dl = "Moderate diversity"
        else:
            dl = "Low diversity"
        steps.append(f"Step 5: Assessment: {dl}")
        ans = {"simpson_D": round(D, 3), "simpson_diversity": round(D_div, 3),
               "shannon_wiener": round(H, 3), "diversity_level": dl}
        ver = f"Verified: D={D:.2f}, diversity={D_div:.2f} => {dl}"
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    elif mode == "richness":
        species = int(params.get("species_count", 0))
        area = float(params.get("area", 1))
        density = species / area if area > 0 else 0
        steps.append("Step 1: Record values:")
        steps.append(f"  Species count = {species}")
        steps.append(f"  Area          = {area} sq km")
        steps.append(f"Step 2: Species density = {species}/{area} = {density:.2f} species/sq km")
        if density >= 100:
            rl = "Very high richness"
        elif density >= 50:
            rl = "High richness"
        elif density >= 20:
            rl = "Moderate richness"
        elif density >= 5:
            rl = "Low richness"
        else:
            rl = "Very low richness"
        steps.append(f"  Assessment: {rl}")
        ans = {"species_count": species, "area_sq_km": area, "density": round(density, 2), "level": rl}
        ver = f"Verified: {species} species in {area} sq km = {density:.1f}/sq km"
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    return SolverResult(answer="Unknown mode", steps=["Use mode='simpson' or 'richness'."], verification="N/A", confidence="low")


# ============================================================
# 8. SUSTAINABLE DEVELOPMENT SOLVER
# ============================================================

def solve_sustainable_development(params: Dict) -> SolverResult:
    mode = params.get("mode", "carrying_capacity")
    steps: List[str] = []

    if mode == "carrying_capacity":
        pop = float(params.get("population", 0))
        avail_res = float(params.get("resources", 0))
        per_cap = float(params.get("per_capita_need", 0))
        steps.append("Step 1: Record values:")
        steps.append(f"  Population         = {pop:,.0f}")
        steps.append(f"  Available resource = {avail_res:,.0f} units")
        steps.append(f"  Per capita need    = {per_cap} units/person")
        total_need = pop * per_cap
        cc = avail_res / per_cap if per_cap > 0 else 0
        steps.append("Step 2: Total resource needed:")
        steps.append(f"  = {pop:,.0f} x {per_cap} = {total_need:,.0f} units")
        steps.append("Step 3: Carrying capacity:")
        steps.append(f"  = {avail_res:,.0f} / {per_cap} = {cc:,.0f} people")
        if pop <= cc:
            status = "Sustainable"; surplus = cc - pop
            steps.append(f"Step 4: SURSTAINABLE (surplus for {surplus:,.0f} people)")
        else:
            status = "Unsustainable"; deficit = pop - cc
            steps.append(f"Step 4: UNSUSTAINABLE (deficit of {deficit:,.0f} people)")
        ans = {"carrying_capacity": round(cc, 0), "total_needed": round(total_need, 0),
               "status": status, "surplus_deficit": round(cc - pop, 0)}
        ver = f"Verified: {pop:,.0f} people need {total_need:,.0f} units, {avail_res:,.0f} available => {status}"
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    elif mode == "footprint":
        emission = float(params.get("carbon_emission", 0))
        forest_ha = float(params.get("forest_area", 0))
        absorb_rate = 0.3  # t CO2/ha/yr (Indian forest average)
        steps.append("Step 1: Values:")
        steps.append(f"  Annual emission    = {emission} tonnes CO2")
        steps.append(f"  Forest area        = {forest_ha} ha")
        steps.append(f"  Absorption rate    = {absorb_rate} t CO2/ha/yr (Indian forest avg)")
        capacity = forest_ha * absorb_rate
        deficit = emission - capacity
        steps.append("Step 2: Forest absorption capacity:")
        steps.append(f"  = {forest_ha} x {absorb_rate} = {capacity:.2f} t CO2/yr")
        steps.append(f"Step 3: Carbon deficit = {emission} - {capacity:.2f} = {deficit:.2f} t CO2/yr")
        status = "Carbon neutral / negative" if deficit <= 0 else f"Carbon deficit: {deficit:.2f} t CO2/yr"
        steps.append(f"  Status: {status}")
        ans = {"absorption_capacity": round(capacity, 2), "deficit": round(deficit, 2), "status": status}
        ver = f"Verified: {forest_ha} ha x {absorb_rate} = {capacity:.2f} vs {emission} emitted."
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    return SolverResult(answer="Unknown mode", steps=["Use mode='carrying_capacity' or 'footprint'."], verification="N/A", confidence="low")


# ============================================================
# 9. WATER RESOURCES SOLVER
# ============================================================

def solve_water_resources(params: Dict) -> SolverResult:
    mode = params.get("mode", "rainwater")
    steps: List[str] = []

    if mode == "rainwater":
        rainfall = float(params.get("rainfall", 0))
        area     = float(params.get("rooftop_area", 0))
        runoff   = float(params.get("runoff_coeff", 0.8))
        eff_sys  = float(params.get("efficiency", 0.9))
        steps.append("Step 1: Given:")
        steps.append(f"  Rainfall          = {rainfall} mm/yr")
        steps.append(f"  Rooftop area      = {area} sq m")
        steps.append(f"  Runoff coefficient= {runoff}")
        steps.append(f"  System efficiency = {eff_sys}")
        rain_m = rainfall / 1000.0
        theoretical = rain_m * area * 1000.0
        harvested = theoretical * runoff * eff_sys
        steps.append("Step 2: Theoretical rainfall volume:")
        steps.append(f"  = ({rainfall}/1000) m x {area} sq m = {rain_m*area:.3f} m3 = {theoretical:.0f} L")
        steps.append("Step 3: Actual harvested:")
        steps.append(f"  = {theoretical:.0f} x {runoff} x {eff_sys} = {harvested:.0f} L/yr")
        daily = harvested / 365.0
        steps.append(f"Step 4: Daily harvest = {harvested:.0f}/365 = {daily:.1f} L/day")
        fam = 5; per_cap = 135; need = fam * per_cap
        self_pct = (daily / need) * 100.0 if need > 0 else 0
        steps.append(f"Step 5: Family of {fam}, need {need} L/day => covers {self_pct:.1f}%")
        ans = {"annual_liters": round(harvested, 0), "daily_liters": round(daily, 1),
               "self_sufficiency_pct": round(self_pct, 1)}
        ver = f"Verified: {rainfall} mm on {area} sq m => {harvested:.0f} L/yr ({daily:.1f} L/day)."
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    elif mode == "per_capita":
        total = float(params.get("total_water", 0))
        pop   = float(params.get("population", 1))
        per_cap = (total * 1e9) / (pop * 365)
        steps.append("Step 1: Given:")
        steps.append(f"  Total water  = {total} cubic km")
        steps.append(f"  Population   = {pop:,.0f}")
        steps.append("Step 2: Per capita water availability:")
        steps.append(f"  = ({total} x 1e9 L) / ({pop:,.0f} x 365)")
        steps.append(f"  = {per_cap:.2f} L/person/day")
        if per_cap >= 3000:
            st = "High availability"
        elif per_cap >= 1700:
            st = "Adequate"
        elif per_cap >= 1000:
            st = "Water stress"
        else:
            st = "Water scarcity"
        steps.append(f"  Status: {st}")
        ans = {"per_capita_lpd": round(per_cap, 2), "status": st}
        ver = f"Verified: {total} km3 for {pop:,.0f} people => {per_cap:.1f} L/person/day."
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    return SolverResult(answer="Unknown mode", steps=["Use mode='rainwater' or 'per_capita'."], verification="N/A", confidence="low")


# ============================================================
# 10. FOREST RESOURCES SOLVER
# ============================================================

def solve_forest_resources(params: Dict) -> SolverResult:
    mode = params.get("mode", "cover")
    steps: List[str] = []

    if mode == "cover":
        f_area = float(params.get("forest_area", 0))
        g_area = float(params.get("geo_area", 1))
        pct = (f_area / g_area) * 100.0
        steps.append("Step 1: Given:")
        steps.append(f"  Forest area       = {f_area} sq km")
        steps.append(f"  Geographical area = {g_area} sq km")
        steps.append("Step 2: Forest cover %:")
        steps.append(f"  = ({f_area} / {g_area}) x 100 = {pct:.2f}%")
        if pct >= 33:
            status = "Above National Forest Policy target (33%)"
        elif pct >= 25:
            status = "Close to target"
        else:
            gap = 33.0 - pct
            status = f"Below target; gap of {gap:.1f}%"
            required = (33.0 / 100.0) * g_area
            additional = required - f_area
            steps.append(f"Step 3: To reach 33%, need {additional:.2f} sq km more forest")
        steps.append(f"  Assessment: {status}")
        ans = {"forest_percent": round(pct, 2), "status": status}
        if pct < 33:
            ans["additional_needed_sqkm"] = round((0.33 * g_area) - f_area, 2)
        ver = f"Verified: {f_area}/{g_area} x 100 = {pct:.1f}%"
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    elif mode == "deforestation":
        initial = float(params.get("initial_forest", 0))
        rate_pct = float(params.get("annual_rate", 0))
        years = int(params.get("years", 10))
        r = rate_pct / 100.0
        remaining = initial * ((1.0 - r) ** years)
        lost = initial - remaining
        lost_pct = (lost / initial) * 100.0
        steps.append("Step 1: Given:")
        steps.append(f"  Initial forest      = {initial} sq km")
        steps.append(f"  Annual rate         = {rate_pct}%")
        steps.append(f"  Years               = {years}")
        steps.append("Step 2: Remaining forest (exponential decay):")
        steps.append(f"  = {initial} x (1-{r})^{years} = {initial} x {(1-r)**years:.4f} = {remaining:.2f} sq km")
        steps.append(f"Step 3: Lost = {initial} - {remaining:.2f} = {lost:.2f} sq km ({lost_pct:.1f}%)")
        steps.append("Step 4: Impact: biodiversity loss, soil erosion, climate change")
        ans = {"remaining": round(remaining, 2), "lost": round(lost, 2), "lost_pct": round(lost_pct, 2)}
        ver = f"Verified: {initial} x (1-{r})^{years} = {remaining:.1f} remaining ({lost_pct:.1f}% lost)."
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    elif mode == "afforestation":
        area = float(params.get("area_planted", 0))
        tph  = float(params.get("trees_per_hectare", 1000))
        surv = float(params.get("survival_rate", 70))
        cpt  = float(params.get("carbon_per_tree", 20))
        trees = area * tph * (surv / 100.0)
        carbon_t = trees * cpt / 1000.0
        steps.append("Step 1: Given:")
        steps.append(f"  Area planted   = {area} ha")
        steps.append(f"  Trees/ha       = {tph}")
        steps.append(f"  Survival rate  = {surv}%")
        steps.append(f"  Carbon/tree/yr = {cpt} kg")
        steps.append("Step 2: Surviving trees:")
        steps.append(f"  = {area} x {tph} x {surv/100} = {trees:.0f} trees")
        steps.append("Step 3: Annual carbon sequestration:")
        steps.append(f"  = {trees:.0f} x {cpt} / 1000 = {carbon_t:.2f} tonnes CO2/yr")
        ans = {"surviving_trees": round(trees, 0), "carbon_tonnes_per_yr": round(carbon_t, 2)}
        ver = f"Verified: {area} ha x {tph} x {surv}% = {trees:.0f} trees => {carbon_t:.2f} t/yr."
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    return SolverResult(answer="Unknown mode", steps=["Use mode='cover', 'deforestation', or 'afforestation'."], verification="N/A", confidence="low")


# ============================================================
# 11. ENERGY RESOURCES SOLVER
# ============================================================

def solve_energy_resources(params: Dict) -> SolverResult:
    mode = params.get("mode", "efficiency")
    steps: List[str] = []

    if mode == "efficiency":
        energy_in  = float(params.get("energy_input", 0))
        energy_out = float(params.get("useful_output", 0))
        steps.append("Step 1: Record values:")
        steps.append(f"  Energy input     = {energy_in} kWh")
        steps.append(f"  Useful output    = {energy_out} kWh")
        eff = (energy_out / energy_in) * 100.0 if energy_in > 0 else 0
        waste = energy_in - energy_out
        waste_pct = 100.0 - eff
        steps.append("Step 2: Efficiency:")
        steps.append(f"  = ({energy_out}/{energy_in}) x 100 = {eff:.2f}%")
        steps.append(f"Step 3: Energy wasted = {waste:.2f} kWh ({waste_pct:.2f}%)")
        ans = {"efficiency_pct": round(eff, 2), "wasted_kwh": round(waste, 2)}
        ver = f"Verified: {eff:.1f}% + {waste_pct:.1f}% = 100%"
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    elif mode == "solar":
        area = float(params.get("panel_area", 0))
        irradiance = float(params.get("solar_irradiance", 5.5))
        panel_eff = float(params.get("panel_efficiency", 18))
        hours = float(params.get("sun_hours", 5))
        steps.append("Step 1: Given:")
        steps.append(f"  Panel area        = {area} sq m")
        steps.append(f"  Solar irradiance  = {irradiance} kWh/m2/day")
        steps.append(f"  Panel efficiency  = {panel_eff}%")
        steps.append(f"  Peak sun hours    = {hours} h/day")
        daily = area * irradiance * (panel_eff / 100.0)
        annual = daily * 365
        steps.append("Step 2: Daily energy generation:")
        steps.append(f"  = {area} x {irradiance} x {panel_eff/100} = {daily:.2f} kWh/day")
        steps.append(f"Step 3: Annual generation = {daily:.2f} x 365 = {annual:.1f} kWh/yr")
        # Energy equivalency: 1 kWh avoids ~0.82 kg CO2 (Indian grid avg)
        co2_avoided = annual * 0.82 / 1000.0
        steps.append(f"Step 4: CO2 avoided = {annual:.0f} x 0.82 / 1000 = {co2_avoided:.2f} tonnes/yr")
        ans = {"daily_kwh": round(daily, 2), "annual_kwh": round(annual, 1), "co2_avoided_tonnes": round(co2_avoided, 2)}
        ver = f"Verified: {area} sq m panel => {annual:.0f} kWh/yr, avoids {co2_avoided:.1f} t CO2/yr."
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    return SolverResult(answer="Unknown mode", steps=["Use mode='efficiency' or 'solar'."], verification="N/A", confidence="low")


# ============================================================
# 12. WASTE MANAGEMENT SOLVER
# ============================================================

def solve_waste_management(params: Dict) -> SolverResult:
    mode = params.get("mode", "generation")
    steps: List[str] = []

    if mode == "generation":
        pop = float(params.get("population", 0))
        per_cap = float(params.get("waste_per_capita", 0))
        steps.append("Step 1: Given:")
        steps.append(f"  Population          = {pop:,.0f}")
        steps.append(f"  Waste per capita   = {per_cap} kg/person/day")
        daily = pop * per_cap
        annual = daily * 365
        steps.append("Step 2: Daily waste generation:")
        steps.append(f"  = {pop:,.0f} x {per_cap} = {daily:.0f} kg/day")
        steps.append(f"Step 3: Annual waste = {daily:.0f} x 365 = {annual:,.0f} kg/yr = {annual/1000:.2f} tonnes/yr")
        # Segregation: 60% biodegradable, 30% recyclable, 10% inert
        bio = annual * 0.60
        recyc = annual * 0.30
        inert = annual * 0.10
        steps.append("Step 4: Waste composition (typical urban India):")
        steps.append(f"  Biodegradable = {bio:,.0f} kg/yr ({bio/annual*100:.0f}%)")
        steps.append(f"  Recyclable    = {recyc:,.0f} kg/yr ({recyc/annual*100:.0f}%)")
        steps.append(f"  Inert         = {inert:,.0f} kg/yr ({inert/annual*100:.0f}%)")
        ans = {"daily_kg": round(daily, 0), "annual_tonnes": round(annual/1000, 2),
               "biodegradable_pct": 60, "recyclable_pct": 30, "inert_pct": 10}
        ver = f"Verified: {pop:,.0f} people x {per_cap} kg = {daily:.0f} kg/day => {annual/1000:.1f} t/yr."
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    elif mode == "reduction":
        initial = float(params.get("initial_waste", 0))
        compost_pct = float(params.get("compost_percent", 30))
        recycle_pct = float(params.get("recycle_percent", 25))
        steps.append("Step 1: Given:")
        steps.append(f"  Initial waste     = {initial} kg/day")
        steps.append(f"  Composting        = {compost_pct}%")
        steps.append(f"  Recycling         = {recycle_pct}%")
        composted = initial * compost_pct / 100.0
        recycled  = initial * recycle_pct / 100.0
        landfill  = initial - composted - recycled
        reduction_pct = ((composted + recycled) / initial) * 100.0
        steps.append("Step 2: Waste processed:")
        steps.append(f"  Composted  = {initial} x {compost_pct}% = {composted:.1f} kg/day")
        steps.append(f"  Recycled   = {initial} x {recycle_pct}% = {recycled:.1f} kg/day")
        steps.append(f"Step 3: Landfill burden = {initial} - {composted:.1f} - {recycled:.1f} = {landfill:.1f} kg/day")
        steps.append(f"Step 4: Waste reduction = {reduction_pct:.1f}%")
        ans = {"composted_kg": round(composted, 1), "recycled_kg": round(recycled, 1),
               "landfill_kg": round(landfill, 1), "reduction_pct": round(reduction_pct, 1)}
        ver = f"Verified: {composted:.1f} + {recycled:.1f} + {landfill:.1f} = {initial} kg/day."
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    return SolverResult(answer="Unknown mode", steps=["Use mode='generation' or 'reduction'."], verification="N/A", confidence="low")


# ============================================================
# 13. CLIMATE CHANGE SOLVER
# ============================================================

def solve_climate_change(params: Dict) -> SolverResult:
    mode = params.get("mode", "carbon_footprint")
    steps: List[str] = []

    if mode == "carbon_footprint":
        electricity_kwh = float(params.get("electricity_kwh", 0))
        lpg_kg          = float(params.get("lpg_kg", 0))
        petrol_l        = float(params.get("petrol_liters", 0))
        diesel_l        = float(params.get("diesel_liters", 0))
        flight_km       = float(params.get("flight_km", 0))
        # Emission factors (India-specific approx)
        ef_elec  = 0.82   # kg CO2/kWh (Indian grid avg)
        ef_lpg   = 3.0    # kg CO2/kg LPG
        ef_pet   = 2.3    # kg CO2/litre petrol
        ef_dies  = 2.7    # kg CO2/litre diesel
        ef_flight= 0.15   # kg CO2/km (domestic flight avg)
        steps.append("Step 1: Record activity data:")
        steps.append(f"  Electricity       = {electricity_kwh} kWh/month")
        steps.append(f"  LPG               = {lpg_kg} kg/month")
        steps.append(f"  Petrol            = {petrol_l} L/month")
        steps.append(f"  Diesel            = {diesel_l} L/month")
        steps.append(f"  Flight travel     = {flight_km} km/month")
        co2_elec  = electricity_kwh * ef_elec
        co2_lpg   = lpg_kg * ef_lpg
        co2_pet   = petrol_l * ef_pet
        co2_dies  = diesel_l * ef_dies
        co2_fl    = flight_km * ef_flight
        total_co2 = co2_elec + co2_lpg + co2_pet + co2_dies + co2_fl
        monthly_t = total_co2 / 1000.0
        annual_t  = monthly_t * 12.0
        steps.append("Step 2: Calculate CO2 from each source (India-specific factors):")
        steps.append(f"  Electricity = {electricity_kwh} x {ef_elec}  = {co2_elec:.1f} kg")
        steps.append(f"  LPG         = {lpg_kg} x {ef_lpg}   = {co2_lpg:.1f} kg")
        steps.append(f"  Petrol      = {petrol_l} x {ef_pet}  = {co2_pet:.1f} kg")
        steps.append(f"  Diesel      = {diesel_l} x {ef_dies}  = {co2_dies:.1f} kg")
        steps.append(f"  Flights     = {flight_km} x {ef_flight} = {co2_fl:.1f} kg")
        steps.append(f"Step 3: Total monthly = {total_co2:.1f} kg = {monthly_t:.3f} tonnes")
        steps.append(f"Step 4: Annual footprint = {monthly_t:.3f} x 12 = {annual_t:.2f} tonnes CO2/yr")
        per_capita_india = 1.9  # tonnes per capita (India avg)
        ratio = annual_t / per_capita_india
        steps.append(f"Step 5: Compared to Indian average ({per_capita_india} t/capita):")
        steps.append(f"  Ratio = {annual_t:.2f} / {per_capita_india} = {ratio:.2f}x")
        if ratio <= 1.0:
            label = "Below national average - good"
        elif ratio <= 2.0:
            label = "Near national average"
        else:
            label = "Above national average - needs reduction"
        steps.append(f"  Assessment: {label}")
        ans = {"monthly_kg": round(total_co2, 1), "annual_tonnes": round(annual_t, 2),
               "times_india_avg": round(ratio, 2), "assessment": label,
               "breakdown": {"electricity": round(co2_elec,1), "lpg": round(co2_lpg,1),
                             "petrol": round(co2_pet,1), "diesel": round(co2_dies,1),
                             "flights": round(co2_fl,1)}}
        ver = f"Verified: Sum of all sources = {total_co2:.1f} kg/mo = {annual_t:.2f} t/yr."
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    elif mode == "temperature_rise":
        base_temp = float(params.get("baseline_temp", 14.0))
        co2_ppm   = float(params.get("co2_ppm", 415))
        preindustrial = 280.0
        sensitivity = 3.0  # deg C per doubling of CO2 (climate sensitivity)
        doubling_ratio = co2_ppm / preindustrial
        temp_rise = sensitivity * math.log2(doubling_ratio)
        projected = base_temp + temp_rise
        steps.append("Step 1: Given:")
        steps.append(f"  Baseline temp       = {base_temp} degrees C")
        steps.append(f"  Current CO2         = {co2_ppm} ppm")
        steps.append(f"  Pre-industrial CO2  = {preindustrial} ppm")
        steps.append("Step 2: Calculate CO2 ratio:")
        steps.append(f"  Ratio = {co2_ppm} / {preindustrial} = {doubling_ratio:.4f}")
        steps.append(f"Step 3: Temperature rise (ECS x log2(ratio)):")
        steps.append(f"  = {sensitivity} x log2({doubling_ratio:.4f})")
        steps.append(f"  = {sensitivity} x {math.log2(doubling_ratio):.4f} = {temp_rise:.2f} degrees C")
        steps.append(f"Step 4: Projected global temp = {base_temp} + {temp_rise:.2f} = {projected:.2f} degrees C")
        ans = {"temp_rise": round(temp_rise, 2), "projected_temp": round(projected, 2)}
        ver = f"Verified: CO2 ratio {doubling_ratio:.2f}, log2={math.log2(doubling_ratio):.3f}, rise={temp_rise:.1f} deg C."
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="medium")

    return SolverResult(answer="Unknown mode", steps=["Use mode='carbon_footprint' or 'temperature_rise'."], verification="N/A", confidence="low")


# ============================================================
# 14. ENVIRONMENTAL LAWS SOLVER
# ============================================================

def solve_env_laws(params: Dict) -> SolverResult:
    mode = params.get("mode", "penalties")
    steps: List[str] = []

    if mode == "penalties":
        act = params.get("act", "")
        violation = params.get("violation_type", "")
        steps.append("Step 1: Identify the applicable Act:")
        steps.append(f"  Act: {act}")
        steps.append(f"  Violation: {violation}")
        penalty_db = {
            "Air (Prevention and Control of Pollution) Act, 1981": {
                "default": "Up to Rs 1 lakh fine + Rs 10,000/day continuing",
                "major": "Imprisonment up to 6 months + fine up to Rs 10,000",
                "standards_breach": "Up to Rs 50,000 + closure order"
            },
            "Water (Prevention and Control of Pollution) Act, 1974": {
                "default": "Up to Rs 1 lakh + Rs 5,000/day continuing",
                "major": "Imprisonment up to 6 months + fine up to Rs 5,000",
                "effluent_breach": "Up to Rs 1 lakh + prosecution"
            },
            "Environment (Protection) Act, 1986": {
                "default": "Up to Rs 1 lakh + Rs 5,000/day",
                "major": "Up to 5 years imprisonment + Rs 1 lakh",
                "hazardous_waste": "Up to Rs 1 lakh + closure + prosecution"
            },
            "Forest (Conservation) Act, 1980": {
                "default": "Compensation as per NPV (Net Present Value)",
                "illegal_felling": "Rs 10,000/tree + imprisonment up to 15 days",
                "encroachment": "Eviction + penalty"
            },
            "Wildlife Protection Act, 1972": {
                "default": "Fine up to Rs 25,000",
                "scheduled_species": "Imprisonment 3-7 years + fine Rs 10,000",
                "hunting": "Imprisonment 3-7 years + fine Rs 25,000"
            }
        }
        act_lower = act.lower()
        found = None
        for key, val in penalty_db.items():
            if key.lower() in act_lower or act_lower in key.lower():
                found = (key, val)
                break
        if found is None:
            found = ("General", {"default": "As per Environmental Protection Act provisions"})
        steps.append("Step 2: Applicable penalties:")
        akey, aval = found
        for vtype, penalty in aval.items():
            steps.append(f"  {vtype}: {penalty}")
        steps.append("Step 3: Additional provisions:")
        steps.append("  - Public can file complaints under Section 43 of Water Act")
        steps.append("  - NGT (National Green Tribunal) for environmental disputes")
        steps.append("  - CPCB/SPCB can issue closure directions")
        ans = {"act": akey, "penalties": aval, "violation": violation}
        ver = f"Verified: {akey} applies. Penalties as per statutory provisions."
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    elif mode == "compliance":
        entity_type = params.get("entity_type", "industry")
        steps.append("Step 1: Entity type:")
        steps.append(f"  {entity_type}")
        if "industry" in entity_type.lower():
            consents = ["Consent to Establish (CTE) under Air/Water Act",
                        "Consent to Operate (CTO) under Air/Water Act",
                        "Authorization under Hazardous Waste Rules",
                        "Environmental Clearance if in prescribed area",
                        "Submit Annual Environmental Statement"]
            steps.append("Step 2: Required compliances:")
            for c in consents:
                steps.append(f"  - {c}")
            steps.append("Step 3: Monitoring requirements:")
            steps.append("  - Stack emissions monitoring (continuous)")
            steps.append("  - Effluent quality testing (monthly)")
            steps.append("  - Ambient air quality (quarterly)")
            steps.append("  - Waste management records (annual)")
        else:
            consents = ["Segregate waste at source", "Use public transport/carpool",
                        "Rainwater harvesting (if applicable)", "Noise control during festivals",
                        "Avoid single-use plastics"]
            steps.append("Step 2: Citizen responsibilities:")
            for c in consents:
                steps.append(f"  - {c}")
        ans = {"entity_type": entity_type, "compliances": consents}
        ver = f"Verified: {entity_type} compliance checklist as per applicable rules."
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    return SolverResult(answer="Unknown mode", steps=["Use mode='penalties' or 'compliance'."], verification="N/A", confidence="low")


# ============================================================
# 15. DISASTER MANAGEMENT SOLVER
# ============================================================

def solve_disaster_mgmt(params: Dict) -> SolverResult:
    mode = params.get("mode", "risk")
    steps: List[str] = []

    if mode == "risk":
        hazard_val   = float(params.get("hazard_value", 0))
        vulnerability = float(params.get("vulnerability", 0))
        capacity     = float(params.get("capacity", 1))
        steps.append("Step 1: Given values:")
        steps.append(f"  Hazard value       = {hazard_val}")
        steps.append(f"  Vulnerability index = {vulnerability}")
        steps.append(f"  Coping capacity     = {capacity}")
        risk = (hazard_val * vulnerability) / capacity if capacity > 0 else float('inf')
        steps.append("Step 2: Risk formula:")
        steps.append(f"  Risk = (Hazard x Vulnerability) / Capacity")
        steps.append(f"  Risk = ({hazard_val} x {vulnerability}) / {capacity}")
        steps.append(f"  Risk = {risk:.3f}")
        if risk < 0.2:
            level = "Low risk"
        elif risk < 0.5:
            level = "Moderate risk"
        elif risk < 0.8:
            level = "High risk"
        else:
            level = "Very high risk"
        steps.append(f"Step 3: Risk Level: {level}")
        steps.append("Step 4: Mitigation measures:")
        if risk >= 0.5:
            steps.append("  - Early warning systems needed")
            steps.append("  - Evacuation plans must be prepared")
            steps.append("  - Emergency supplies stockpiled")
            steps.append("  - Community drills required")
        else:
            steps.append("  - Maintain awareness programs")
            steps.append("  - Regular monitoring sufficient")
        ans = {"risk_value": round(risk, 3), "risk_level": level}
        ver = f"Verified: Risk = {hazard_val}x{vulnerability}/{capacity} = {risk:.3f} => {level}"
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    elif mode == "flood":
        rainfall = float(params.get("rainfall_24h", 0))
        catchment = float(params.get("catchment_area", 0))
        runoff_coeff = float(params.get("runoff_coeff", 0.7))
        river_cap = float(params.get("river_capacity", 0))
        steps.append("Step 1: Given:")
        steps.append(f"  24h rainfall     = {rainfall} mm")
        steps.append(f"  Catchment area   = {catchment} sq km")
        steps.append(f"  Runoff coeff     = {runoff_coeff}")
        steps.append(f"  River capacity   = {river_cap} cumec")
        # Direct runoff = rainfall x catchment x runoff coeff
        # Volume in million cubic meters = rainfall(m) x area(km2) x runoff
        rain_m = rainfall / 1000.0
        runoff_vol = rain_m * catchment * runoff_coeff  # million cubic meters
        runoff_vol_cumec = runoff_vol * 1e6 / (24 * 3600)  # convert to cumec
        steps.append("Step 2: Direct runoff volume:")
        steps.append(f"  = ({rainfall}/1000) x {catchment} x {runoff_coeff}")
        steps.append(f"  = {runoff_vol:.3f} million m3")
        steps.append(f"  = {runoff_vol_cumec:.1f} cumec")
        steps.append(f"Step 3: Compare with river capacity ({river_cap} cumec):")
        if runoff_vol_cumec > river_cap:
            status = f"FLOOD RISK: Runoff {runoff_vol_cumec:.0f} cumec exceeds capacity by {runoff_vol_cumec - river_cap:.0f} cumec"
        else:
            status = f"SAFE: Runoff {runoff_vol_cumec:.0f} cumec within capacity"
        steps.append(f"  {status}")
        ans = {"runoff_cumec": round(runoff_vol_cumec, 1), "river_capacity": river_cap, "flood_risk": status}
        ver = f"Verified: {rainfall} mm on {catchment} sq km => {runoff_vol_cumec:.0f} cumec vs {river_cap} capacity."
        return SolverResult(answer=ans, steps=steps, verification=ver, confidence="high")

    return SolverResult(answer="Unknown mode", steps=["Use mode='risk' or 'flood'."], verification="N/A", confidence="low")


# ============================================================
# 16. POPULATION & ENVIRONMENT SOLVER
# ============================================================

def solve_population_env(params: Dict) -> SolverResult:
    mode = params.get("mode", "growth")
    steps: List[str] = []

    if mode == "growth":
        p1 = float(params.get("population_initial", 0))
        p2 = float(params.get("population_final", 0))
        years = float(params.get("years", 1))
        steps.append("Step 1: Given:")
        steps.append(f"  Initial population = {p1:,.0f}")
        steps.append(f"  Final population   = {p2:,.0f}")
        steps.append(f"  Time period        = {years} years")
        absolute_growth = p2 - p1
        growth_rate = (absolute_growth / (p1 * years)) * 100.0 if p1 > 0 else 0
        # Doubling time
        doubling_time = 70.0 / growth_rate if growth_rate > 0 else float('inf')
        steps.append("Step 2: Absolute growth:")
        steps.append(f"  = {p2:,.0f} - {p1:,.0f} = {absolute_growth:,.0f}")
        steps.append("Step 3: Growth rate:")
        steps.append(f"  r = (P2-P1)/(P1 x t) x 100")
        steps.append(f"  r = ({p2:,.0f}-{p1:,.0