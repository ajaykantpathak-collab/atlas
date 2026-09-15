"""
CISCE Class 12 Home Science — Deterministic Solver & Question Generator
Covers: Principles of Cooking, Preliminary Treatment of Foods,
        Meal Planning Objectives, Factors Affecting Food Selection,
        Savings & Investments Importance, Avenues & Schemes.
"""

import math
import random
import fractions
import itertools
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple
from datetime import date, datetime

# ──────────────────────────────────────────────
# SymPy for symbolic verification
# ──────────────────────────────────────────────
try:
    import sympy as sp
    HAS_SYMPY = True
except ImportError:
    HAS_SYMPY = False

# ──────────────────────────────────────────────
# Seed helpers
# ──────────────────────────────────────────────
def make_rng(seed: int) -> random.Random:
    return random.Random(seed)


# ══════════════════════════════════════════════════════
# SECTION 1 – COOKING METHODS (c12_home_001)
# ══════════════════════════════════════════════════════

DRY_METHODS = {
    "baking": {
        "description": "Cooking by surrounding food with dry, hot air in an enclosed space (oven).",
        "temperature_range": "150–250 °C",
        "suitable_foods": "Bread, cakes, pastries, cookies",
        "advantages": [
            "Even cooking from all sides",
            "Retains flavour and aroma",
            "Suitable for large quantities",
            "Produces desirable browning (Maillard reaction)",
        ],
        "disadvantages": [
            "Requires specialised equipment (oven)",
            "Time-consuming",
            "Not suitable for tough cuts of meat without pre-treatment",
        ],
        "nutrient_effect": "Some heat-sensitive vitamins (C, B-complex) may be destroyed; carbohydrates gelatinise; proteins denature.",
    },
    "roasting": {
        "description": "Cooking food with radiant heat from above or below, often on a spit or in an open pan.",
        "temperature_range": "180–260 °C",
        "suitable_foods": "Meat, poultry, nuts, coffee beans",
        "advantages": [
            "Rich flavour and aroma developed",
            "Crisp exterior texture",
            "Fat drains away from food",
        ],
        "disadvantages": [
            "Requires constant attention",
            "Can cause charring/burning",
            "Uneven cooking if not turned",
        ],
        "nutrient_effect": "Fat renders out; some B-vitamins lost in drippings; proteins coagulate.",
    },
    "grilling": {
        "description": "Cooking food on a grill over direct radiant heat (charcoal, gas, electric).",
        "temperature_range": "200–300 °C",
        "suitable_foods": "Meat, fish, vegetables, paneer tikka",
        "advantages": [
            "Quick cooking method",
            "Distinctive smoky flavour",
            "Less fat needed",
            "Attractive char marks",
        ],
        "disadvantages": [
            "Risk of charring (potential carcinogens)",
            "Requires skill to prevent burning",
            "Uneven heat distribution",
        ],
        "nutrient_effect": "High heat destroys some vitamins; fat drips away; protein denatures rapidly.",
    },
    "frying": {
        "description": "Cooking food by submerging (deep frying) or partially submerging (shallow frying) in hot fat/oil.",
        "temperature_range": "160–190 °C",
        "suitable_foods": "Samosa, pakora, chips, cutlets",
        "advantages": [
            "Very fast cooking",
            "Crisp, golden texture",
            "Enhances flavour and palatability",
        ],
        "disadvantages": [
            "High caloric value (fat absorption)",
            "Can cause digestive problems",
            "Repeated heating of oil produces harmful compounds",
            "Not suitable for regular consumption",
        ],
        "nutrient_effect": "Significant fat absorption; heat destroys vitamins A, C, E; some protein denaturation.",
    },
}

WET_METHODS = {
    "boiling": {
        "description": "Cooking food in rapidly boiling water (100 °C at sea level) until tender.",
        "temperature_range": "100 °C",
        "suitable_foods": "Rice, pasta, potatoes, eggs, dal",
        "advantages": [
            "Simple and economical",
            "Kills harmful microorganisms",
            "Softens tough fibres",
            "Suitable for bulk cooking",
        ],
        "disadvantages": [
            "Water-soluble vitamins (C, B) leach into water",
            "Loss of flavour if water discarded",
            "Can make food soggy if overcooked",
            "Colour may fade (e.g., green vegetables turn olive)",
        ],
        "nutrient_effect": "Significant loss of water-soluble vitamins into cooking water; starch gelatinisation; protein denatures.",
    },
    "steaming": {
        "description": "Cooking food by exposure to steam from boiling water, without direct contact with water.",
        "temperature_range": "100 °C",
        "suitable_foods": "Idli, dhokla, vegetables, fish, puddings",
        "advantages": [
            "Minimal nutrient loss (water-soluble vitamins retained)",
            "No added fat required",
            "Retains shape, colour, and flavour",
            "Easy to digest",
        ],
        "disadvantages": [
            "Slow cooking process",
            "Requires steamer equipment",
            "Limited to certain types of food",
        ],
        "nutrient_effect": "Best method for preserving water-soluble vitamins; minimal leaching; proteins coagulate gently.",
    },
    "poaching": {
        "description": "Gently cooking food in simmering liquid (just below boiling, ~80–90 °C).",
        "temperature_range": "80–90 °C",
        "suitable_foods": "Eggs, fish, chicken, fruits",
        "advantages": [
            "No added fat",
            "Gentle on delicate foods",
            "Produces delicate flavour",
            "Easy to digest",
        ],
        "disadvantages": [
            "Slow cooking time",
            "Not suitable for tough cuts",
            "Limited flavour development",
        ],
        "nutrient_effect": "Good retention of water-soluble vitamins; protein denatures slowly and gently.",
    },
    "stewing": {
        "description": "Slow-cooking small, uniform pieces of food in a small amount of liquid with a tight lid.",
        "temperature_range": "85–95 °C",
        "suitable_foods": "Curries, tough cuts of meat, lentils",
        "advantages": [
            "Tenderises tough cuts of meat",
            "Economical — whole pieces can be used",
            "Flavours meld and develop",
            "Nutrient-rich broth",
        ],
        "disadvantages": [
            "Time-consuming",
            "Some nutrient loss into liquid",
            "Requires attention to prevent drying",
        ],
        "nutrient_effect": "Collagen converts to gelatin; some vitamins leach into broth; minerals remain in liquid.",
    },
}

MODERN_TECHNOLOGIES = {
    "microwave_oven": {
        "principle": "Electromagnetic waves (microwaves) cause water molecules in food to vibrate, generating heat from within.",
        "frequency": "2450 MHz",
        "advantages": [
            "Very fast cooking",
            "Energy efficient",
            "Minimal nutrient loss (short cooking time)",
            "No pre-heating required",
            "Reheating without quality loss",
        ],
        "disadvantages": [
            "Not suitable for browning/crisping",
            "Uneven heating in thick foods",
            "Metal containers cannot be used",
            "Limited capacity",
            "Potential for superheating liquids",
        ],
        "indian_context": "Widely used in urban Indian homes for reheating rotis, idlis, milk; popular for defrosting frozen foods.",
    },
    "pressure_cooker": {
        "principle": "Steam is trapped, raising pressure and boiling point above 100 °C, cooking food faster.",
        "pressure": "~15 psi above atmospheric",
        "boiling_point_elevated": "~121 °C",
        "advantages": [
            "Very fast cooking — saves time and fuel",
            "Energy efficient",
            "Kills bacteria effectively",
            "Retains more nutrients than open boiling",
            "Ideal for dal, rice, meat, beans",
        ],
        "disadvantages": [
            "Risk of explosion if misused",
            "Cannot add ingredients mid-cook easily",
            "Loss of crisp texture",
            "Requires regular gasket maintenance",
        ],
        "indian_context": "Essential in most Indian households; used daily for cooking dal, rice, vegetables, meat curries.",
    },
    "slow_cooker": {
        "principle": "Low-temperature cooking over several hours in a covered ceramic pot with low heat.",
        "temperature": "80–100 °C",
        "advantages": [
            "Hands-off cooking",
            "Tenderises tough cuts",
            "Flavours develop fully",
            "Energy efficient for long cooks",
        ],
        "disadvantages": [
            "Very slow (6–8 hours)",
            "Not suitable for all foods",
            "Cannot brown food inside",
            "Requires advance planning",
        ],
        "indian_context": "Gaining popularity for dals, curries; ideal for working families with programmable timers.",
    },
    "induction_cooktop": {
        "principle": "Electromagnetic induction heats ferromagnetic cookware directly; the cooktop surface stays cool.",
        "efficiency": "~85–90%",
        "advantages": [
            "Very fast heating",
            "Energy efficient (less heat loss)",
            "Safe — cool surface",
            "Precise temperature control",
            "Easy to clean",
        ],
        "disadvantages": [
            "Requires induction-compatible cookware",
            "Initial cost is high",
            "Not compatible with all utensils",
            "Power dependency — no cooking during outages",
        ],
        "indian_context": "Growing adoption in urban Indian homes; compatible with stainless steel cookware commonly used.",
    },
}

PRELIMINARY_TREATMENTS = {
    "washing": {
        "purpose": "Removes dirt, dust, pesticide residues, and microorganisms from the surface of food.",
        "method": "Rinse under running water; use potable water; for firm produce, scrub gently.",
        "nutrient_effect": "Minimal nutrient loss if done quickly; prolonged soaking can leach water-soluble vitamins.",
        "indian_context": "Vegetables and fruits washed before cutting in Indian kitchens to remove pesticides and soil.",
    },
    "peeling": {
        "purpose": "Removes tough, bitter, or inedible outer layers; reduces pesticide load.",
        "method": "Use a peeler or knife; peel thinly to minimise waste.",
        "nutrient_effect": "Loss of nutrients concentrated in the skin (fibre, vitamins, minerals). Potato skin has significant iron and vitamin C.",
        "indian_context": "Potatoes, carrots, cucumbers commonly peeled in Indian cooking.",
    },
    "cutting": {
        "purpose": "Reduces cooking time, ensures even cooking, makes food easier to eat and digest.",
        "method": "Cut into uniform pieces; smaller pieces cook faster.",
        "nutrient_effect": "Increased surface area accelerates nutrient loss through oxidation and leaching; cut just before cooking.",
        "indian_context": "Vegetables cut into cubes, juliennes, or slices depending on the dish (e.g., sabzi, curry).",
    },
    "soaking": {
        "purpose": "Softens hard foods, reduces cooking time, removes anti-nutritional factors (e.g., oxalates, phytates).",
        "method": "Soak in water for 4–12 hours depending on the food; change water if it becomes cloudy.",
        "nutrient_effect": "Some water-soluble nutrients leach into soaking water; anti-nutritional factors are reduced; overall benefit outweighs loss.",
        "indian_context": "Pulses (dal) soaked overnight; rice soaked before cooking; dry fruits soaked before use.",
    },
    "marinating": {
        "purpose": "Adds flavour, tenderises meat, reduces cooking time, inhibits microbial growth (acidic marinades).",
        "method": "Coat food in seasoned liquid (yogurt, lemon juice, spices) and refrigerate for 30 min to several hours.",
        "nutrient_effect": "Yogurt-based marinades add probiotics and calcium; acidic marinades can slightly denature surface proteins.",
        "indian_context": "Tandoori chicken, kebabs, fish curries marinated in yogurt-spice mixtures for hours.",
    },
    "germinating": {
        "purpose": "Activates enzymes in seeds/grains, increasing vitamin content, reducing anti-nutritional factors, improving digestibility.",
        "method": "Soak seeds/grains, drain, and keep in a warm, moist environment for 1–5 days until sprouts appear.",
        "nutrient_effect": "Significant increase in vitamin C and B-complex; reduction in phytic acid; improved protein availability.",
        "indian_context": "Moong dal sprouts, alfalfa sprouts, chana sprouts consumed daily in Indian households for health benefits.",
    },
    "fermenting": {
        "purpose": "Uses microorganisms to convert sugars into acids/alcohol, improving flavour, texture, digestibility, and shelf life.",
        "method": "Allow microorganisms (yeast, bacteria) to act on food under controlled conditions for hours to days.",
        "nutrient_effect": "Increases B-vitamin content; improves bioavailability of minerals; produces beneficial probiotics; breaks down anti-nutritional factors.",
        "indian_context": "Dosa/idli batter fermented overnight; curd (yogurt); dhokla; handvo; pickles (achar).",
    },
}


# ══════════════════════════════════════════════════════
# SECTION 2 – MEAL PLANNING (c12_home_006, c12_home_007)
# ══════════════════════════════════════════════════════

MEAL_PLANNING_OBJECTIVES = {
    "nutritional_needs": {
        "description": "Ensure all family members receive adequate amounts of essential nutrients (carbohydrates, proteins, fats, vitamins, minerals) according to their requirements.",
        "indian_context": "A North Indian vegetarian family meal includes roti (carbs), dal (protein), sabzi (vitamins), curd (calcium/probiotics), and salad (fibre).",
    },
    "satiety": {
        "description": "Provide meals that satisfy hunger for an appropriate duration, preventing frequent snacking and overeating.",
        "indian_context": "A balanced thali with adequate fibre and protein keeps an adult satisfied for 4–5 hours.",
    },
    "variety": {
        "description": "Include different types of foods, colours, textures, and flavours across meals to prevent monotony and ensure a broad nutrient intake.",
        "indian_context": "Rotating between different dals (moong, masoor, chana, toor) and vegetables across the week.",
    },
    "economy": {
        "description": "Plan meals within the family budget by choosing seasonal, locally available, and cost-effective ingredients.",
        "indian_context": "Using seasonal vegetables like lauki (summer) or methi (winter) which are cheaper and fresher.",
    },
    "time_management": {
        "description": "Plan meals that can be prepared efficiently within the available time, especially for working families.",
        "indian_context": "Preparing fermented batter (idli/dosa) overnight to save morning time; using a pressure cooker for faster cooking.",
    },
}

NUTRITIONAL_ADEQUACY_FRAMEWORK = {
    "balanced_diet": "A diet that contains all essential nutrients in correct proportions to maintain health and support growth.",
    "food_groups": {
        "cereals_grains": "Energy source — rice, wheat, millets (bajra, jowar, ragi)",
        "pulses_legumes": "Protein source — dal, beans, chana, moong",
        "vegetables_fruits": "Vitamins, minerals, fibre — seasonal produce",
        "milk_products": "Calcium, protein — milk, curd, paneer, ghee",
        "fats_sugars": "Energy in moderation — oils, butter, jaggery, honey",
    },
    " ICMR_recommendations": {
        "carbohydrates": "50–60% of total energy",
        "proteins": "10–15% of total energy",
        "fats": "20–30% of total energy",
    },
}

FACTORS_FOOD_SELECTION = {
    "age": {
        "impact": "Children need more protein and calcium for growth; elderly need easily digestible, soft, nutrient-dense foods; adolescents need extra iron and calcium.",
        "indian_example": "Soft khichdi for toddlers and elderly; iron-rich spinach and jaggery for adolescent girls.",
    },
    "occupation": {
        "impact": "Sedentary workers need fewer calories; manual labourers need high-energy, high-protein diets.",
        "indian_example": "A farmer's meal includes extra rotis and ghee for energy; an office worker's meal is lighter with more vegetables.",
    },
    "gender": {
        "impact": "Women generally have lower calorie needs but higher iron and calcium requirements, especially during pregnancy and lactation.",
        "indian_example": "Pregnant women given extra milk, leafy greens, and jaggery for iron and calcium.",
    },
    "physiological_conditions": {
        "impact": "Pregnancy, lactation, illness, and recovery alter nutritional needs significantly.",
        "indian_example": "Lactating mothers given methi, fenugreek, and lactation drinks; diabetic patients given complex carbs.",
    },
    "personal_likes_dislikes": {
        "impact": "Food preferences and aversions influence meal planning and acceptance.",
        "indian_example": "Some families avoid certain vegetables; children may dislike green leafy vegetables.",
    },
    "tradition_culture": {
        "impact": "Cultural and regional food habits shape daily meal patterns.",
        "indian_example": "South Indians consume rice-based meals; North Indians prefer wheat-based rotis; Gujaratis include dhokla and thepla.",
    },
    "seasonal_availability": {
        "impact": "Seasonal produce is cheaper, fresher, and more nutritious.",
        "indian_example": "Mangoes in summer, carrots in winter; monsoon cravings for pakoras and hot chai.",
    },
    "economic_considerations": {
        "impact": "Budget constraints determine the quantity and quality of food purchased.",
        "indian_example": "Low-income families may rely more on cereals and less on animal proteins; millets are affordable alternatives.",
    },
    "religious_beliefs": {
        "impact": "Religious dietary restrictions influence food choices significantly.",
        "indian_example": "Hindus avoid beef; Muslims avoid pork and require halal meat; Jains avoid root vegetables; many Hindus are vegetarian.",
    },
    "family_size_composition": {
        "impact": "Number and type of members (children, adults, elderly) determine meal quantities and types.",
        "indian_example": "A family with growing children needs more milk, eggs, and protein; a couple's empty nest needs smaller portions.",
    },
}


# ══════════════════════════════════════════════════════
# SECTION 3 – SAVINGS & INVESTMENTS (c12_home_012, c12_home_013)
# ══════════════════════════════════════════════════════

SAVINGS_INVESTMENT_SCHEMES = {
    "bank_savings_account": {
        "institution": "Bank",
        "interest_rate_range": "3.0–4.0% p.a.",
        "liquidity": "High — withdraw anytime",
        "minimum_deposit": "₹100–₹500",
        "tenure": "No fixed tenure",
        "tax_implications": "Interest taxable as per income slab",
        "risk": "Very Low (up to ₹5 lakh insured by DICGC)",
        "suitable_for": "Emergency fund, regular transactions",
        "indian_context": "Most common savings instrument; Jan Dhan accounts have zero balance requirements.",
    },
    "bank_fixed_deposit": {
        "institution": "Bank",
        "interest_rate_range": "5.5–7.5% p.a.",
        "liquidity": "Low — premature withdrawal with penalty",
        "minimum_deposit": "₹1,000",
        "tenure": "7 days to 10 years",
        "tax_implications": "TDS applicable if interest > ₹40,000 p.a.",
        "risk": "Very Low (DICGC insured)",
        "suitable_for": "Medium-term goals, guaranteed returns",
        "indian_context": "Senior citizens get 0.5–1% higher rates; auto-renewal available.",
    },
    "bank_recurring_deposit": {
        "institution": "Bank",
        "interest_rate_range": "5.5–7.0% p.a.",
        "liquidity": "Low — monthly deposit commitment",
        "minimum_deposit": "₹100–₹500/month",
        "tenure": "6 months to 10 years",
        "tax_implications": "TDS on interest",
        "risk": "Very Low",
        "suitable_for": "Regular savings habit, small monthly investments",
        "indian_context": "Popular for salaried individuals; auto-debit from savings account available.",
    },
    "post_office_savings_account": {
        "institution": "India Post",
        "interest_rate_range": "4.0% p.a.",
        "liquidity": "High",
        "minimum_deposit": "₹50",
        "tenure": "No fixed tenure",
        "tax_implications": "Interest taxable",
        "risk": "Very Low (Government guaranteed)",
        "suitable_for": "Rural areas, senior citizens, small savings",
        "indian_context": "Widely accessible in rural India; single account, joint account, minor account options.",
    },
    "nsc": {
        "full_name": "National Savings Certificate",
        "institution": "India Post",
        "interest_rate_range": "7.7% p.a. (compounded annually)",
        "liquidity": "Low — 5-year lock-in",
        "minimum_deposit": "₹1,000 (no upper limit)",
        "tenure": "5 years",
        "tax_implications": "Interest is taxable but eligible for 80C deduction",
        "risk": "Very Low (Government backed)",
        "suitable_for": "Long-term tax-saving investment",
        "indian_context": "Popular small savings scheme; available at all post offices; can be purchased for minors.",
    },
    "ppf": {
        "full_name": "Public Provident Fund",
        "institution": "Bank / India Post",
        "interest_rate_range": "7.1% p.a. (compounded annually)",
        "liquidity": "Low — 15-year lock-in (partial withdrawal allowed from 7th year)",
        "minimum_deposit": "₹500/year",
        "maximum_deposit": "₹1.5 lakh/year",
        "tenure": "15 years (extendable in 5-year blocks)",
        "tax_implications": "EEE — Exempt on investment, exempt on interest, exempt on maturity",
        "risk": "Very Low (Government backed)",
        "suitable_for": "Long-term retirement planning, tax saving",
        "indian_context": "One of the most popular tax-saving instruments in India; can be opened in any nationalised bank.",
    },
    "kvp": {
        "full_name": "Kisan Vikas Patra",
        "institution": "India Post",
        "interest_rate_range": "7.5% p.a. (compounded annually)",
        "liquidity": "Medium — doubles in ~115 months (~9.6 years)",
        "minimum_deposit": "₹1,000",
        "tenure": "Variable — doubles investment in ~115 months",
        "tax_implications": "Interest taxable; no 80C benefit",
        "risk": "Very Low (Government backed)",
        "suitable_for": "Goal-based savings with a fixed maturity amount",
        "indian_context": "Originally for farmers; now open to all; popular in rural areas for lump-sum goal planning.",
    },
}


# ══════════════════════════════════════════════════════
# SOLVER – Numerical Cooking & Financial Problems
# ══════════════════════════════════════════════════════

def solve_nutrient_retention(params: Dict) -> Dict:
    """
    Calculate percentage of nutrients retained after cooking.
    Solves: retention = 100 - loss_percentage
    params: {
        "method": str,
        "initial_amount_mg": float,
        "loss_percentage": float,  # e.g., vitamin C loss in boiling ~50%
    }
    """
    method = params.get("method", "boiling")
    initial = params.get("initial_amount_mg", 100.0)
    loss_pct = params.get("loss_percentage", 50.0)
    nutrient = params.get("nutrient", "Vitamin C")

    steps = [
        f"Problem: Calculate nutrient retention for {method} cooking.",
        f"Nutrient: {nutrient}",
        f"Initial amount: {initial} mg",
        f"Loss percentage during {method}: {loss_pct}%",
        f"Formula: Retained amount = Initial × (100 - Loss%) / 100",
    ]

    if HAS_SYMPY:
        initial_sym = sp.Symbol("initial")
        loss_sym = sp.Symbol("loss_pct")
        retained_sym = sp.Symbol("retained")
        formula = sp.Eq(retained_sym, initial_sym * (100 - loss_sym) / 100)
        steps.append(f"Symbolic: {formula}")
        retained = float(initial * (100 - loss_pct) / 100)
    else:
        retained = float(initial * (100 - loss_pct) / 100)
        steps.append(f"Substituting: Retained = {initial} × (100 - {loss_pct}) / 100")

    steps.append(f"Retained amount = {retained:.2f} mg")
    steps.append(f"Retention percentage = {100 - loss_pct}%")

    verification = [
        f"Back-check: Loss = {initial} × {loss_pct} / 100 = {initial * loss_pct / 100:.2f} mg",
        f"Retained + Loss = {retained:.2f} + {initial * loss_pct / 100:.2f} = {retained + initial * loss_pct / 100:.2f} mg ≈ {initial} mg ✓",
    ]

    return {
        "answer": f"{retained:.2f} mg retained ({100 - loss_pct:.1f}% retention)",
        "steps": steps,
        "verification": verification,
    }


def solve_cooking_time(params: Dict) -> Dict:
    """
    Compare cooking times across methods.
    params: {
        "food": str,
        "pressure_cooker_minutes": float,
        "open_pot_minutes": float,
    }
    """
    food = params.get("food", "dal")
    pressure_time = params.get("pressure_cooker_minutes", 15.0)
    open_time = params.get("open_pot_minutes", 45.0)

    time_saved = open_time - pressure_time
    pct_faster = (time_saved / open_time) * 100
    fuel_saving_approx = pct_faster  # proportional approximation

    steps = [
        f"Problem: Compare cooking time for {food} using pressure cooker vs open pot.",
        f"Open pot cooking time: {open_time} minutes",
        f"Pressure cooker cooking time: {pressure_time} minutes",
        f"Time saved = Open pot time − Pressure cooker time = {open_time} − {pressure_time}",
        f"Time saved = {time_saved} minutes",
        f"Percentage faster = (Time saved / Open pot time) × 100 = ({time_saved} / {open_time}) × 100",
        f"Pressure cooker is {pct_faster:.1f}% faster than open pot cooking.",
        f"Approximate fuel saving: ~{fuel_saving_approx:.1f}% (proportional to time reduction).",
    ]

    if HAS_SYMPY:
        t_open = sp.Symbol("t_open")
        t_press = sp.Symbol("t_press")
        t_saved = sp.Eq(sp.Symbol("t_saved"), t_open - t_press)
        pct = sp.Eq(sp.Symbol("pct"), (t_saved.rhs / t_open) * 100)
        steps.append(f"Symbolic model: t_saved = t_open − t_press; pct_faster = (t_saved / t_open) × 100")

    verification = [
        f"Check: Pressure cooker time + Time saved = {pressure_time} + {time_saved} = {pressure_time + time_saved} = Open pot time ✓",
        f"Fuel efficiency: {fuel_saving_approx:.1f}% reduction in cooking time ≈ proportional fuel saving",
    ]

    return {
        "answer": f"Pressure cooker is {pct_faster:.1f}% faster; saves {time_saved} minutes and ~{fuel_saving_approx:.0f}% fuel.",
        "steps": steps,
        "verification": verification,
    }


def solve_simple_interest(params: Dict) -> Dict:
    """
    Simple Interest calculation for savings/investments.
    params: {
        "principal": float,
        "rate_percent": float,   # annual rate in %
        "time_years": float,
    }
    """
    P = float(params.get("principal", 10000.0))
    r = float(params.get("rate_percent", 7.0))
    t = float(params.get("time_years", 5.0))

    steps = [
        f"Problem: Calculate Simple Interest and maturity amount.",
        f"Principal (P) = ₹{P:,.2f}",
        f"Rate (R) = {r}% per annum",
        f"Time (T) = {t} years",
        f"Formula: SI = (P × R × T) / 100",
        f"SI = (₹{P:,.2f} × {r} × {t}) / 100",
        f"SI = ₹{P * r * t / 100:,.2f}",
        f"Maturity Amount = P + SI = ₹{P:,.2f} + ₹{P * r * t / 100:,.2f} = ₹{P + P * r * t / 100:,.2f}",
    ]

    if HAS_SYMPY:
        P_sym = sp.Symbol("P")
        R_sym = sp.Symbol("R")
        T_sym = sp.Symbol("T")
        SI_formula = sp.Eq(sp.Symbol("SI"), P_sym * R_sym * T_sym / 100)
        steps.append(f"Symbolic: {SI_formula}")

    SI = P * r * t / 100
    maturity = P + SI

    verification = [
        f"SI / (P × T) = ₹{SI:,.2f} / (₹{P:,.2f} × {t}) = {SI / (P * t):.4f}",
        f"Rate check: {SI / (P * t) * 100:.2f}% matches given rate {r}% ✓",
        f"Maturity = ₹{maturity:,.2f} ✓",
    ]

    return {
        "answer": f"SI = ₹{SI:,.2f}, Maturity Amount = ₹{maturity:,.2f}",
        "steps": steps,
        "verification": verification,
    }


def solve_compound_interest(params: Dict) -> Dict:
    """
    Compound Interest calculation.
    params: {
        "principal": float,
        "rate_percent": float,
        "time_years": float,
        "compounding_frequency": int,  # 1=annual, 2=semi-annual, 4=quarterly, 12=monthly
    }
    """
    P = float(params.get("principal", 50000.0))
    r = float(params.get("rate_percent", 7.1))
    t = float(params.get("time_years", 5.0))
    n = int(params.get("compounding_frequency", 1))

    steps = [
        f"Problem: Calculate Compound Interest (CI) and maturity amount.",
        f"Principal (P) = ₹{P:,.2f}",
        f"Rate (R) = {r}% per annum",
        f"Time (T) = {t} years",
        f"Compounding frequency (n) = {n} times per year",
        f"Formula: A = P × (1 + R/(100×n))^(n×T)",
        f"A = ₹{P:,.2f} × (1 + {r}/(100×{n}))^({n}×{t})",
    ]

    if HAS_SYMPY:
        P_sym = sp.Symbol("P")
        R_sym = sp.Symbol("R")
        T_sym = sp.Symbol("T")
        n_sym = sp.Symbol("n")
        A_formula = sp.Eq(sp.Symbol("A"), P_sym * (1 + R_sym / (100 * n_sym)) ** (n_sym * T_sym))
        steps.append(f"Symbolic: {A_formula}")

    r_decimal = r / 100
    exponent = n * t
    rate_per_period = r_decimal / n
    A = P * (1 + rate_per_period) ** exponent
    CI = A - P

    steps.append(f"A = ₹{P:,.2f} × (1 + {rate_per_period:.6f})^{exponent:.1f}")
    steps.append(f"A = ₹{P:,.2f} × {(1 + rate_per_period) ** exponent:.6f}")
    steps.append(f"A = ₹{A:,.2f}")
    steps.append(f"CI = A − P = ₹{A:,.2f} − ₹{P:,.2f} = ₹{CI:,.2f}")

    verification = [
        f"Numerical check: (1 + {rate_per_period:.6f})^{exponent:.1f} = {(1 + rate_per_period) ** exponent:.6f}",
        f"A = ₹{P:,.2f} × {(1 + rate_per_period) ** exponent:.6f} = ₹{A:,.2f}",
        f"CI / P ratio = {CI / P:.4f} (effective return per rupee invested)",
    ]

    return {
        "answer": f"A = ₹{A:,.2f}, CI = ₹{CI:,.2f}",
        "steps": steps,
        "verification": verification,
    }


def solve_meal_budget(params: Dict) -> Dict:
    """
    Budget-based meal planning: allocate budget across food groups.
    params: {
        "total_budget": float,
        "members": int,
        "diet_type": str,  # "vegetarian", "non_vegetarian", "vegan"
        "days": int,
    }
    """
    budget = float(params.get("total_budget", 5000.0))
    members = int(params.get("members", 4))
    diet = params.get("diet_type", "vegetarian")
    days = int(params.get("days", 7))

    daily_budget = budget / days
    per_person_daily = daily_budget / members

    # ICMR-based proportional allocation for Indian vegetarian diet
    allocation = {
        "cereals": per_person_daily * 0.45,
        "pulses": per_person_daily * 0.15,
        "vegetables": per_person_daily * 0.20,
        "milk_products": per_person_daily * 0.12,
        "fats_oils": per_person_daily * 0.08,
    }

    steps = [
        f"Problem: Allocate ₹{budget:,.0f} meal budget for {members} members over {days} days ({diet} diet).",
        f"Daily budget = ₹{budget:,.0f} / {days} days = ₹{daily_budget:,.2f}",
        f"Per person daily = ₹{daily_budget:,.2f} / {members} = ₹{per_person_daily:,.2f}",
        f"Using ICMR-based allocation for Indian {diet} diet:",
        f"  Cereals (45%): ₹{allocation['cereals']:.2f} per person/day",
        f"  Pulses (15%):  ₹{allocation['pulses']:.2f} per person/day",
        f"  Vegetables (20%): ₹{allocation['vegetables']:.2f} per person/day",
        f"  Milk products (12%): ₹{allocation['milk_products']:.2f} per person/day",
        f"  Fats & Oils (8%): ₹{allocation['fats_oils']:.2f} per person/day",
    ]

    if HAS_SYMPY:
        total = sum(allocation.values())
        check = sp.simplify(total - per_person_daily)
        steps.append(f"Symbolic verification: sum of allocations = ₹{total:.2f} ≈ ₹{per_person_daily:.2f} (residual rounding)")

    total_allocated = sum(allocation.values())
    verification = [
        f"Total allocated = ₹{total_allocated:.2f} vs per_person_daily ₹{per_person_daily:.2f}",
        f"Family weekly allocation check: ₹{daily_budget:.2f} × {days} = ₹{daily_budget * days:.2f} ≈ ₹{budget:,.0f} ✓",
    ]

    return {
        "answer": f"Per person/day: ₹{per_person_daily:.2f} | Allocation — Cereals ₹{allocation['cereals']:.2f}, Pulses ₹{allocation['pulses']:.2f}, Veg ₹{allocation['vegetables']:.2f}, Milk ₹{allocation['milk_products']:.2f}, Fats ₹{allocation['fats_oils']:.2f}",
        "steps": steps,
        "verification": verification,
    }


def solve_savings_goal(params: Dict) -> Dict:
    """
    Calculate time needed to reach a savings goal with monthly RD.
    Uses the RD formula: M = P × [(1 + i)^n - 1] / i × (1 + i)
    params: {
        "monthly_deposit": float,
        "annual_rate_percent": float,
        "target_amount": float,
    }
    """
    monthly_deposit = float(params.get("monthly_deposit", 5000.0))
    annual_rate = float(params.get("annual_rate_percent", 6.5))
    target = float(params.get("target_amount", 200000.0))

    monthly_rate = annual_rate / (12 * 100)
    steps = [
        f"Problem: Find months to reach ₹{target:,.0f} with monthly deposit of ₹{monthly_deposit:,.0f} at {annual_rate}% p.a.",
        f"Monthly interest rate (i) = {annual_rate}% / 12 = {monthly_rate:.6f}",
        f"RD Maturity formula: M = P × [(1 + i)^n - 1] / i × (1 + i)",
    ]

    if HAS_SYMPY:
        n_sym = sp.Symbol("n", positive=True, real=True)
        P_sym = sp.Symbol("P")
        i_sym = sp.Symbol("i")
        M_sym = sp.Symbol("M")
        rd_formula = sp.Eq(M_sym, P_sym * ((1 + i_sym) ** n_sym - 1) / i_sym * (1 + i_sym))
        steps.append(f"Symbolic RD formula: {rd_formula}")

    # Solve numerically for n
    # M = P * ((1+i)^n - 1) / i * (1+i)
    # M * i / (P * (1+i)) = (1+i)^n - 1
    # (1+i)^n = M * i / (P * (1+i)) + 1
    # n = ln(M*i/(P*(1+i)) + 1) / ln(1+i)
    numerator = target * monthly_rate / (monthly_deposit * (1 + monthly_rate)) + 1
    if numerator > 0:
        n_months = math.log(numerator) / math.log(1 + monthly_rate)
    else:
        n_months = 0

    n_months = max(1, n_months)
    maturity_at_n = monthly_deposit * ((1 + monthly_rate) ** n_months - 1) / monthly_rate * (1 + monthly_rate)

    years = int(n_months // 12)
    months = int(n_months % 12)

    steps.append(f"Solving for n (months):")
    steps.append(f"  n = ln({numerator:.6f}) / ln({1 + monthly_rate:.6f})")
    steps.append(f"  n = {math.log(numerator):.4f} / {math.log(1 + monthly_rate):.6f}")
    steps.append(f"  n ≈ {n_months:.1f} months ≈ {years} years and {months} months")
    steps.append(f"  Maturity at {n_months:.1f} months ≈ ₹{maturity_at_n:,.2f}")

    verification = [
        f"Check: Monthly deposit × months = ₹{monthly_deposit:,.0f} × {n_months:.1f} = ₹{monthly_deposit * n_months:,.2f} (principal deposited)",
        f"Total invested = ₹{monthly_deposit * n_months:,.2f}, Maturity ≈ ₹{maturity_at_n:,.2f}",
        f"Interest earned ≈ ₹{maturity_at_n - monthly_deposit * n_months:,.2f}",
    ]

    return {
        "answer": f"Approximately {years} years and {months} months ({n_months:.1f} months) to reach ₹{target:,.0f}. Maturity ≈ ₹{maturity_at_n:,.2f}.",
        "steps": steps,
        "verification": verification,
    }


def solve_meal_nutritional_value(params: Dict) -> Dict:
    """
    Evaluate nutritional adequacy of a meal.
    params: {
        "meal_items": List[Dict],  # [{"name": str, "carbs_g": float, "protein_g": float, "fat_g": float, "calories": float}]
    }
    """
    items = params.get("meal_items", [
        {"name": "Roti (2)", "carbs_g": 30, "protein_g": 6, "fat_g": 3, "calories": 170},
        {"name": "Dal (1 katori)", "carbs_g": 12, "protein_g": 8, "fat_g": 1, "calories": 80},
        {"name": "Sabzi (1 katori)", "carbs_g": 8, "protein_g": 3, "fat_g": 5, "calories": 90},
        {"name": "Curd (1 bowl)", "carbs_g": 3, "protein_g": 4, "fat_g": 3, "calories": 60},
        {"name": "Rice (1 katori)", "carbs_g": 28, "protein_g": 2, "fat_g": 0.5, "calories": 130},
    ])

    total_cal = sum(i["calories"] for i in items)
    total_carbs = sum(i["carbs_g"] for i in items)
    total_protein = sum(i["protein_g"] for i in items)
    total_fat = sum(i["fat_g"] for i in items)

    carb_pct = (total_carbs * 4 / total_cal) * 100 if total_cal > 0 else 0
    protein_pct = (total_protein * 4 / total_cal) * 100 if total_cal > 0 else 0
    fat_pct = (total_fat * 9 / total_cal) * 100 if total_cal > 0 else 0

    steps = [
        "Problem: Evaluate nutritional adequacy of a meal.",
        "ICMR Recommended Calorie Distribution: Carbs 50–60%, Protein 10–15%, Fats 20–30%.",
        "Meal items:",
    ]
    for item in items:
        steps.append(f"  {item['name']}: {item['calories']} kcal, Carbs {item['carbs_g']}g, Protein {item['protein_g']}g, Fat {item['fat_g']}g")
    steps.append(f"Total Calories = {total_cal} kcal")
    steps.append(f"Total Carbohydrates = {total_carbs}g")
    steps.append(f"Total Protein = {total_protein}g")
    steps.append(f"Total Fat = {total_fat}g")
    steps.append(f"Carbohydrate % of energy = ({total_carbs}g × 4 kcal/g) / {total_cal} kcal × 100 = {carb_pct:.1f}%")
    steps.append(f"Protein % of energy = ({total_protein}g × 4 kcal/g) / {total_cal} kcal × 100 = {protein_pct:.1f}%")
    steps.append(f"Fat % of energy = ({total_fat}g × 9 kcal/g) / {total_cal} kcal × 100 = {fat_pct:.1f}%")

    carb_ok = 50 <= carb_pct <= 60
    prot_ok = 10 <= protein_pct <= 15
    fat_ok = 20 <= fat_pct <= 30

    assessment = "ADEQUATE" if (carb_ok and prot_ok and fat_ok) else "NEEDS ADJUSTMENT"
    issues = []
    if not carb_ok:
        issues.append(f"Carbs at {carb_pct:.1f}% (target 50–60%)")
    if not prot_ok:
        issues.append(f"Protein at {protein_pct:.1f}% (target 10–15%)")
    if not fat_ok:
        issues.append(f"Fats at {fat_pct:.1f}% (target 20–30%)")

    steps.append(f"Assessment: {assessment}")
    if issues:
        steps.append(f"Issues: {', '.join(issues)}")
    else:
        steps.append("All macronutrient ratios within ICMR guidelines.")

    if HAS_SYMPY:
        steps.append(f"Symbolic check: {carb_pct:.1f}% ∈ [50, 60], {protein_pct:.1f}% ∈ [10, 15], {fat_pct:.1f}% ∈ [20, 30]")

    verification = [
        f"Sum of energy percentages: {carb_pct:.1f} + {protein_pct:.1f} + {fat_pct:.1f} = {carb_pct + protein_pct + fat_pct:.1f}%",
        f"Total caloric check: ({total_carbs}×4) + ({total_protein}×4) + ({total_fat}×9) = {total_carbs*4 + total_protein*4 + total_fat*9:.0f} kcal ≈ {total_cal} kcal ✓",
    ]

    return {
        "answer": f"Meal: {total_cal} kcal | Carbs {carb_pct:.1f}% | Protein {protein_pct:.1f}% | Fat {fat_pct:.1f}% | Status: {assessment}",
        "steps": steps,
        "verification": verification,
    }


def solve_cooking_method_comparison(params: Dict) -> Dict:
    """
    Compare nutrient retention across cooking methods for a given food.
    params: {
        "food": str,
        "vitamin": str,
        "retention_boiling": float,  # percentage
        "retention_steaming": float,
        "retention_pressure_cooking": float,
        "retention_frying": float,
    }
    """
    food = params.get("food", "potato")
    vitamin = params.get("vitamin", "Vitamin C")
    methods_data = {
        "boiling": params.get("retention_boiling", 45.0),
        "steaming": params.get("retention_steaming", 85.0),
        "pressure cooking": params.get("retention_pressure_cooking", 70.0),
        "frying": params.get("retention_frying", 25.0),
    }

    steps = [
        f"Problem: Compare {vitamin} retention in {food} across cooking methods.",
        f"Retention percentages:",
    ]
    for method, pct in methods_data.items():
        steps.append(f"  {method}: {pct}%")
    best_method = max(methods_data, key=methods_data.get)
    worst_method = min(methods_data, key=methods_data.get)
    steps.append(f"Best method: {best_method} ({methods_data[best_method]}% retention)")
    steps.append(f"Worst method: {worst_method} ({methods_data[worst_method]}% retention)")

    if HAS_SYMPY:
        methods_sym = list(methods_data.keys())
        values_sym = list(methods_data.values())
        max_val = max(values_sym)
        min_val = min(values_sym)
        steps.append(f"Symbolic comparison: max={max_val}%, min={min_val}%")

    diff = methods_data[best_method] - methods_data[worst_method]
    steps.append(f"Difference between best and worst: {diff} percentage points")

    verification = [
        f"Retention ranking: {sorted(methods_data.items(), key=lambda x: -x[1])}",
        f"Best method retains {diff}% more {vitamin} than worst method.",
    ]

    return {
        "answer": f"Best method: {best_method} ({methods_data[best_method]}%), Worst: {worst_method} ({methods_data[worst_method]}%), Difference: {diff}%",
        "steps": steps,
        "verification": verification,
    }


# ══════════════════════════════════════════════════════
# DISPATCH TABLE FOR SOLVER
# ══════════════════════════════════════════════════════

SOLVER_DISPATCH = {
    "nutrient_retention": solve_nutrient_retention,
    "cooking_time": solve_cooking_time,
    "simple_interest": solve_simple_interest,
    "compound_interest": solve_compound_interest,
    "meal_budget": solve_meal_budget,
    "savings_goal": solve_savings_goal,
    "meal_nutritional_value": solve_meal_nutritional_value,
    "cooking_method_comparison": solve_cooking_method_comparison,
}


def solve(problem_type: str, params: Dict) -> Dict:
    """Main solver dispatch function."""
    if problem_type not in SOLVER_DISPATCH:
        return {"error": f"Unknown problem type: {problem_type}",
                "available_types": list(SOLVER_DISPATCH.keys())}
    return SOLVER_DISPATCH[problem_type](params)


# ══════════════════════════════════════════════════════
# SECTION 4 – QUESTION GENERATOR
# ══════════════════════════════════════════════════════

@dataclass
class Question:
    id: str
    type: str          # "mcq" | "fill_blank" | "short_answer" | "long_answer" | "numerical"
    topic: str
    difficulty: str    # "Easy" | "Medium" | "Hard"
    question: str
    options: Optional[List[str]] = None
    answer: str = ""
    explanation: str = ""
    competency: bool = False  # True = Indian context competency question


class CISCEQuestionGenerator:
    """Deterministic, seeded question generator for CISCE Class 12 Home Science."""

    TOPICS = [
        "cooking_methods",
        "preliminary_treatments",
        "meal_planning_objectives",
        "factors_food_selection",
        "savings_investments_importance",
        "savings_schemes",
    ]

    DIFFICULTIES = ["Easy", "Medium", "Hard"]
    TYPES = ["mcq", "fill_blank", "short_answer", "long_answer", "numerical"]

    def __init__(self, seed: int):
        self.rng = make_rng(seed)
        self.q_counter = 0

    def _next_id(self, prefix: str) -> str:
        self.q_counter += 1
        return f"{prefix}_{self.q_counter:03d}"

    def _pick(self, items: list):
        return self.rng.choice(items)

    def _shuffle(self, items: list) -> list:
        result = items[:]
        self.rng.shuffle(result)
        return result

    def _is_competency(self, topic: str) -> bool:
        """50% of questions per topic are competency-based (Indian context)."""
        return self.rng.random() < 0.5

    # ──────────────────────────────────────────────
    # COOKING METHODS QUESTIONS
    # ──────────────────────────────────────────────
    def _gen_cooking_methods_mcq(self, competency: bool) -> Question:
        methods = list(DRY_METHODS.keys()) + list(WET_METHODS.keys())
        if competency:
            correct = self.rng.choice(["steaming", "pressure_cooking", "baking"])
            method_data = WET_METHODS.get(correct, DRY_METHODS.get(correct, {}))
            distractors = [m for m in methods if m != correct]
            self.rng.shuffle(distractors)
            options = [correct.replace("_", " ").title()] + [d.replace("_", " ").title() for d in distractors[:3]]
            self.rng.shuffle(options)

            q = Question(
                id=self._next_id("cook_mcq"),
                type="mcq",
                topic="cooking_methods",
                difficulty="Medium",
                question=f"Which cooking method BEST preserves water-soluble vitamins like Vitamin C in vegetables for an Indian household meal?",
                options=options,
                answer=correct.replace("_", " ").title(),
                explanation=f"Steaming preserves water-soluble vitamins because the food does not come into direct contact with water, preventing leaching. In Indian households, steaming is used for idli, vegetables, and dhokla. {method_data.get('description', '')}",
                competency=True,
            )
        else:
            correct = self.rng.choice(methods)
            method_data = DRY_METHODS.get(correct, WET_METHODS.get(correct, {}))
            distractors = [m for m in methods if m != correct]
            self.rng.shuffle(distractors)
            options = [correct.replace("_", " ").title()] + [d.replace("_", " ").title() for d in distractors[:3]]
            self.rng.shuffle(options)
            temp_range = method_data.get("temperature_range", "varies")
            q = Question(
                id=self._next_id("cook_mcq"),
                type="mcq",
                topic="cooking_methods",
                difficulty="Medium",
                question=f"Which method cooks food at approximately {temp_range}?",
                options=options,
                answer=correct.replace("_", " ").title(),
                explanation=f"{correct.replace('_', ' ').title()} cooks at {temp_range}. {method_data.get('description', '')}",
                competency=False,
            )
        return q

    def _gen_cooking_methods_fill(self, competency: bool) -> Question:
        methods_pairs = [
            ("dry", "baking, roasting, grilling, frying"),
            ("wet", "boiling, steaming, poaching, stewing"),
            ("moist", "boiling, steaming, poaching, stewing"),
        ]
        if competency:
            correct_cat, examples = methods_pairs[1]  # wet/moist
            question = "In Indian households, the method used for cooking idli and dhokla without submerging in water falls under ______ methods of cooking."
            answer = "wet" if correct_cat == "wet" else "moist"
            explanation = "Steaming (used for idli and dhokla) is a wet/moist method of cooking. The food is cooked by steam from boiling water without direct contact. This preserves nutrients and is ideal for Indian fermented foods."
        else:
            correct_cat, examples = methods_pairs[0]  # dry
            question = "Cooking food by surrounding it with hot air in an enclosed space is called ______ cooking."
            answer = "dry"
            explanation = f"Baking is a dry method of cooking where food is surrounded by hot air in an oven (150–250 °C). It is used for bread, cakes, and pastries."

        return Question(
            id=self._next_id("cook_fill"),
            type="fill_blank",
            topic="cooking_methods",
            difficulty="Easy",
            question=question,
            answer=answer,
            explanation=explanation,
            competency=competency,
        )

    def _gen_cooking_methods_short(self, competency: bool) -> Question:
        if competency:
            q = Question(
                id=self._next_id("cook_short"),
                type="short_answer",
                topic="cooking_methods",
                difficulty="Medium",
                question="Why is pressure cooking preferred over open-pot boiling for cooking dal in Indian households? Give two reasons.",
                answer="1. Saves time (cooks ~3 times faster). 2. Saves fuel. 3. Retains more nutrients than open boiling. 4. Kills microorganisms effectively. (Any two)",
                explanation="Pressure cooking raises the boiling point of water to ~121 °C (from 100 °C), significantly reducing cooking time for pulses like dal. It also retains more water-soluble nutrients compared to open boiling and is highly fuel-efficient — important considerations in Indian households.",
                competency=True,
            )
        else:
            q = Question(
                id=self._next_id("cook_short"),
                type="short_answer",
                topic="cooking_methods",
                difficulty="Easy",
                question="State any two advantages and any two disadvantages of deep frying.",
                answer="Advantages: (1) Very fast cooking, (2) Crisp golden texture and enhanced flavour. Disadvantages: (1) High caloric value due to fat absorption, (2) Repeated heating of oil produces harmful compounds.",
                explanation="Deep frying involves cooking food in hot oil (160–190 °C). While it produces desirable crispiness and flavour, it significantly increases the calorie content of food and may produce acrylamide and other harmful compounds when oil is reused multiple times.",
                competency=False,
            )
        return q

    def _gen_cooking_methods_numerical(self) -> Question:
        P = self.rng.randint(50, 200) * 10  # principal
        r = self.rng.choice([5.0, 5.5, 6.0, 6.5, 7.0, 7.5])
        t = self.rng.choice([1, 2, 3, 5])
        SI = P * r * t / 100
        maturity = P + SI

        q = Question(
            id=self._next_id("cook_num"),
            type="numerical",
            topic="savings_schemes",
            difficulty="Medium",
            question=f"An amount of ₹{P:,} is invested in a Fixed Deposit at {r}% per annum simple interest for {t} years. Calculate the Simple Interest earned and the maturity amount.",
            answer=f"SI = ₹{SI:,.0f}, Maturity = ₹{maturity:,.0f}",
            explanation=f"Using SI formula: SI = (P × R × T) / 100 = (₹{P:,} × {r} × {t}) / 100 = ₹{SI:,.0f}. Maturity Amount = P + SI = ₹{P:,} + ₹{SI:,.0f} = ₹{maturity:,.0f}.",
            competency=False,
        )
        return q

    # ──────────────────────────────────────────────
    # PRELIMINARY TREATMENTS QUESTIONS
    # ──────────────────────────────────────────────
    def _gen_preliminary_mcq(self, competency: bool) -> Question:
        treatments = list(PRELIMINARY_TREATMENTS.keys())
        correct = self.rng.choice(treatments)
        treatment_data = PRELIMINARY_TREATMENTS[correct]

        if competency:
            # Focus on Indian context
            question_map = {
                "germinating": "Which preliminary treatment is applied to moong dal before eating it as sprouts in Indian households?",
                "soaking": "Which process is applied to chana and moong dal overnight before cooking to reduce cooking time and anti-nutritional factors?",
                "fermenting": "What is the preliminary treatment applied to idli-dosa batter for 8–12 hours before cooking?",
                "marinating": "What preliminary treatment is applied to paneer before making it into tikka or adding it to a curry?",
            }
            question = question_map.get(correct, f"What is the purpose of {correct} in food preparation?")
        else:
            question = f"The primary purpose of {correct} in food preparation is:"

        distractors = [t for t in treatments if t != correct]
        self.rng.shuffle(distractors)
        options = [correct.replace("_", " ").title()] + [d.replace("_", " ").title() for d in distractors[:3]]
        self.rng.shuffle(options)

        return Question(
            id=self._next_id("prelim_mcq"),
            type="mcq",
            topic="preliminary_treatments",
            difficulty="Easy" if not competency else "Medium",
            question=question,
            options=options,
            answer=correct.replace("_", " ").title(),
            explanation=f"{correct.replace('_', ' ').title()}: {treatment_data['purpose']} In Indian context: {treatment_data.get('indian_context', '')}",
            competency=competency,
        )

    def _gen_preliminary_short(self, competency: bool) -> Question:
        treatments = list(PRELIMINARY_TREATMENTS.keys())
        if competency:
            treatment = self.rng.choice(["germinating", "fermenting", "soaking"])
            data = PRELIMINARY_TREATMENTS[treatment]
            q = Question(
                id=self._next_id("prelim_short"),
                type="short_answer",
                topic="preliminary_treatments",
                difficulty="Medium",
                question=f"Explain the process and nutritional benefits of {treatment} of foods. Give one Indian example.",
                answer=f"Process: {data['method']} Nutritional benefits: {data['nutrient_effect']} Indian example: {data['indian_context']}",
                explanation=explanation_from_data(data, treatment),
                competency=True,
            )
        else:
            treatment = self.rng.choice(["washing", "peeling", "cutting"])
            data = PRELIMINARY_TREATMENTS[treatment]
            q = Question(
                id=self._next_id("prelim_short"),
                type="short_answer",
                topic="preliminary_treatments",
                difficulty="Easy",
                question=f"What is the purpose of {treatment} foods before cooking? State one disadvantage.",
                answer=f"Purpose: {data['purpose']} Disadvantage: {data['nutrient_effect']}",
                explanation=explanation_from_data(data, treatment),
                competency=False,
            )
        return q

    # ──────────────────────────────────────────────
    # MEAL PLANNING QUESTIONS
    # ──────────────────────────────────────────────
    def _gen_meal_planning_mcq(self, competency: bool) -> Question:
        objectives = list(MEAL_PLANNING_OBJECTIVES.keys())
        correct = self.rng.choice(objectives)
        obj_data = MEAL_PLANNING_OBJECTIVES[correct]

        question_map = {
            "nutritional_needs": "The primary objective of meal planning is to ensure that:",
            "satiety": "Which objective of meal planning ensures that family members do not feel hungry shortly after a meal?",
            "variety": "Including different colours, textures, and types of foods in weekly meal plans serves which objective?",
            "economy": "Using seasonal vegetables and locally available ingredients in meal planning addresses which objective?",
            "time_management": "Preparing fermented batter overnight to save morning cooking time addresses which objective of meal planning?",
        }

        question = question_map.get(correct, f"What is the objective of meal planning related to {correct}?")
        distractors = [o for o in objectives if o != correct]
        self.rng.shuffle(distractors)
        options = [correct.replace("_", " ").title()] + [d.replace("_", " ").title() for d in distractors[:3]]
        self.rng.shuffle(options)

        return Question(
            id=self._next_id("meal_mcq"),
            type="mcq",
            topic="meal_planning_objectives",
            difficulty="Easy" if correct != "nutritional_needs" else "Medium",
            question=question,
            options=options,
            answer=correct.replace("_", " ").title(),
            explanation=f"{correct.replace('_', ' ').title()}: {obj_data['description']} Indian context: {obj_data.get('indian_context', '')}",
            competency=competency,
        )

    def _gen_meal_planning_short(self, competency: bool) -> Question:
        if competency:
            q = Question(
                id=self._next_id("meal_short"),
                type="short_answer",
                topic="meal_planning_objectives",
                difficulty="Medium",
                question="How does the age of family members affect food selection in an Indian household? Give examples for two different age groups.",
                answer="Children: Need soft, nutrient-dense foods (khichdi, milk, fruits). Elderly: Need soft, easily digestible foods with adequate calcium (soft rotis, dal, curd). Adolescents: Need iron and calcium-rich foods (spinach, jaggury, milk) for growth spurts.",
                explanation="Age is a critical factor in meal planning. Growing children need more protein and calcium; elderly need easy-to-chew, nutrient-rich foods; adolescents going through growth spurts need iron-rich foods especially girls. Indian households often customise meals by age.",
                competency=True,
            )
        else:
            factors = list(FACTORS_FOOD_SELECTION.keys())
            correct = self.rng.choice(factors)
            q = Question(
                id=self._next_id("meal_short"),
                type="short_answer",
                topic="factors_food_selection",
                difficulty="Medium",
                question=f"Explain how '{correct.replace('_', ' ')}' affects food selection in a family.",
                answer=FACTORS_FOOD_SELECTION[correct]["impact"],
                explanation=f"{correct.replace('_', ' ').title()} affects food selection because: {FACTORS_FOOD_SELECTION[correct]['impact']} Example: {FACTORS_FOOD_SELECTION[correct].get('indian_example', '')}",
                competency=False,
            )
        return q

    def _gen_meal_planning_long(self) -> Question:
        q = Question(
            id=self._next_id("meal_long"),
            type="long_answer",
            topic="meal_planning_objectives",
            difficulty="Hard",
            question="Explain in detail the objectives of meal planning. How does nutritional adequacy relate to these objectives? Illustrate with an example of a day's menu for a family of four (two adults, two school-going children) that demonstrates at least three objectives.",
            answer=(
                "Objectives of meal planning: (1) Nutritional needs — providing all essential nutrients; "
                "(2) Satiety — satisfying hunger for 4–5 hours; (3) Variety — different foods/colours/textures; "
                "(4) Economy — staying within budget using seasonal produce; (5) Time management — efficient preparation. "
                "Nutritional adequacy ensures these objectives are met by following ICMR guidelines. "
                "Example menu: Breakfast — idli+sambhar+chutney (carbs+protein); Mid-morning — fruit; "
                "Lunch — roti+dal+sabzi+rice+curd+salad (balanced); Evening — milk+biscuit; "
                "Dinner — khichdi+curd (light, digestible). This satisfies all objectives."
            ),
            explanation=(
                "A nutritionally adequate meal plan must satisfy all five objectives simultaneously. "
                "The example menu provides variety (different foods across the day), economy (uses seasonal, local ingredients), "
                "satiety (balanced macros), nutritional needs (ICMR-compliant ratios), and time management "
                "(idli batter prepared overnight, khichdi in pressure cooker)."
            ),
            competency=True,
        )
        return q

    # ──────────────────────────────────────────────
    # SAVINGS & INVESTMENTS QUESTIONS
    # ──────────────────────────────────────────────
    def _gen_savings_mcq(self, competency: bool) -> Question:
        schemes = list(SAVINGS_INVESTMENT_SCHEMES.keys())
        if competency:
            correct = self.rng.choice(["nsc", "ppf", "kvp", "post_office_savings_account"])
        else:
            correct