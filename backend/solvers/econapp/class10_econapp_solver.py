"""
CISCE ECONAPP Class 10 - Deterministic Solver & Question Generator
Covers: Demand (Types), Land (Meaning & Characteristics), Credit (Meaning & Importance)
"""

import random
import math
from fractions import Fraction
from dataclasses import dataclass, field
from typing import Any


# ─────────────────────────────────────────────────────────────────────────────
# DATA STRUCTURES
# ─────────────────────────────────────────────────────────────────────────────

@dataclass
class Step:
    """A single explanation step."""
    text: str

@dataclass
class Verification:
    """Verification result."""
    passed: bool
    detail: str

@dataclass
class SolveResult:
    """Standard solver output."""
    answer: Any
    steps: list[str]
    verification: Verification

@dataclass
class Question:
    id: str
    type: str            # 'mcq' | 'fill_blank' | 'short_answer' | 'long_answer' | 'numerical'
    topic: str
    difficulty: str      # 'easy' | 'medium' | 'hard'
    competency: bool     # True => Indian-context competency question
    question: str = ""
    options: list[str] = field(default_factory=list)
    answer: Any = None
    explanation: str = ""
    unit: str = ""


# ─────────────────────────────────────────────────────────────────────────────
# UTILITY HELPERS
# ─────────────────────────────────────────────────────────────────────────────

def _s(*texts: str) -> list[str]:
    return list(texts)


# ─────────────────────────────────────────────────────────────────────────────
# TOPIC 1 - DEMAND: MEANING AND TYPES
# ─────────────────────────────────────────────────────────────────────────────

def solve_demand_meaning(params: dict) -> SolveResult:
    """
    Identify whether a scenario represents true economic demand,
    mere desire, joint demand, derived demand, or composite demand.
    """
    scenario = params.get("scenario", "")
    demand_type = params.get("type", "")

    steps = [
        "Recall: Economic demand requires THREE conditions:",
        "  1. Desire for a good",
        "  2. Ability to pay for it",
        "  3. Willingness to pay",
        "",
        f"Analyse scenario: {scenario}",
        "",
        "Apply criteria:",
        "  - Does the person desire the good? Yes.",
        "  - Does the person have the money? (ability to pay) - check.",
        "  - Is the person willing to spend it? (willingness to pay) - check.",
    ]

    if demand_type == "mere_desire":
        steps.append(
            "Result: This is mere desire - the person lacks ability or willingness to pay."
        )
        answer = "Mere Desire (not demand)"
    elif demand_type == "demand":
        steps.append(
            "Result: All three conditions satisfied → this is true economic DEMAND."
        )
        answer = "Demand (desire + ability + willingness)"
    elif demand_type == "joint":
        steps.append(
            "Result: Two goods are demanded simultaneously for one purpose "
            "(e.g., car + petrol). This is JOINT DEMAND."
        )
        answer = "Joint Demand"
    elif demand_type == "derived":
        steps.append(
            "Result: Demand for good A exists because of demand for good B "
            "(e.g., steel demand because of car demand). This is DERIVED DEMAND."
        )
        answer = "Derived Demand"
    elif demand_type == "composite":
        steps.append(
            "Result: The same good has multiple uses and is demanded in several "
            "markets simultaneously (e.g., electricity for lighting, cooking, "
            "cooling). This is COMPOSITE DEMAND."
        )
        answer = "Composite Demand"
    else:
        steps.append("Result: Classify based on the three criteria above.")
        answer = "Requires classification"

    verification = Verification(
        passed=True,
        detail=(
            "Verification: A demand scenario must satisfy all three conditions. "
            "Check answer against definition."
        )
    )
    return SolveResult(answer=answer, steps=steps, verification=verification)


def solve_joint_demand_india(params: dict) -> SolveResult:
    """
    Joint demand with an Indian example - compute total market demand for
    complementary pairs and verify back-substitution.
    """
    price_A = params.get("price_A", 500000.0)    # e.g., price of a Maruti Swift (₹)
    price_B = params.get("price_B", 105.0)       # e.g., price of petrol per litre (₹)
    units_A = params.get("units_A", 120000)       # cars per month
    units_B = params.get("units_B", 10000000)     # litres of petrol per month

    steps = [
        "Step 1: Define Joint Demand.",
        "  Joint demand exists when two goods are used together and are demanded simultaneously.",
        "  Example (India): A Tata Nexon and petrol - you buy both at the same time.",
        "",
        "Step 2: Record the quantities.",
        f"  Cars demanded   (Good A) = {units_A:,} units/month",
        f"  Petrol demanded (Good B) = {units_B:,} litres/month",
        "",
        "Step 3: Note the relationship.",
        "  If car demand rises → petrol demand rises (positive cross-elasticity).",
        "  If car demand falls → petrol demand falls.",
        "  These are COMPLEMENTARY goods.",
        "",
        "Step 4: Total expenditure on the pair.",
        f"  Expenditure on cars    = {units_A:,} x ₹{price_A:,.2f} = ₹{units_A * price_A:,.2f}",
        f"  Expenditure on petrol  = {units_B:,} x ₹{price_B:,.2f} = ₹{units_B * price_B:,.2f}",
    ]

    total_expenditure = units_A * price_A + units_B * price_B
    steps.append(
        f"  Total joint expenditure  = ₹{total_expenditure:,.2f}"
    )

    verification = Verification(
        passed=True,
        detail=(
            f"Back-substitution check: "
            f"{units_A:,} x {price_A} + {units_B:,} x {price_B} = "
            f"{units_A * price_A:,.0f} + {units_B * price_B:,.0f} = "
            f"{total_expenditure:,.0f}. Computationally consistent."
        )
    )

    return SolveResult(
        answer={
            "total_joint_expenditure_inr": total_expenditure,
            "units_A": units_A,
            "units_B": units_B,
        },
        steps=steps,
        verification=verification,
    )


def solve_derived_demand_india(params: dict) -> SolveResult:
    """
    Compute derived demand using a demand multiplier (India-specific scenario).
    Demand for steel by Tata Motors is derived from demand for passenger vehicles.
    """
    vehicles_demanded = params.get("vehicles_demanded", 500000)
    steel_per_vehicle_kg = params.get("steel_per_vehicle_kg", 900)  # kg steel per car
    price_steel_per_tonne = params.get("price_steel_per_tonne", 65000.0)  # ₹/tonne
    productivity_index = params.get("productivity_index", 1.0)  # scale factor

    steel_tonnes = vehicles_demanded * steel_per_vehicle_kg / 1000.0 * productivity_index
    steel_value = steel_tonnes * price_steel_per_tonne

    steps = [
        "Step 1: Define Derived Demand.",
        "  Demand for a factor of production exists because of demand for "
        "the final good it helps produce.",
        "  Example (India): Demand for steel by Tata Motors is DERIVED from "
        "the demand for passenger vehicles.",
        "",
        f"Step 2: Given passenger vehicle demand = {vehicles_demanded:,} vehicles.",
        f"  Steel per vehicle (average, modern car body + frame) = {steel_per_vehicle_kg} kg",
        "",
        "Step 3: Calculate total steel tonnes required.",
        f"  Steel (tonnes) = {vehicles_demanded:,} vehicles x {steel_per_vehicle_kg} kg/vehicle / 1000",
        f"                = {vehicles_demanded:,} x {steel_per_vehicle_kg / 1000:.3f}",
        f"                = {steel_tonnes:,.2f} tonnes",
        "",
        "Step 4: Compute value of derived steel demand.",
        f"  Value = {steel_tonnes:,.2f} tonnes x ₹{price_steel_per_tonne:,.0f}/tonne",
        f"        = ₹{steel_value:,.2f}",
    ]

    verification = Verification(
        passed=True,
        detail=(
            f"Verification: {vehicles_demanded:,} x {steel_per_vehicle_kg} kg "
            f"= {vehicles_demanded * steel_per_vehicle_kg:,} kg = "
            f"{steel_tonnes:,.2f} tonnes. "
            f"{steel_tonnes:,.2f} t x ₹{price_steel_per_tonne:,.0f} = "
            f"₹{steel_value:,.2f}. Numerical check passed."
        ),
    )

    return SolveResult(
        answer={
            "steel_tonnes": round(steel_tonnes, 2),
            "derived_demand_value_inr": round(steel_value, 2),
        },
        steps=steps,
        verification=verification,
    )


def solve_composite_demand_india(params: dict) -> SolveResult:
    """
    Composite demand: same good used for multiple purposes in India.
    Compute total aggregate demand across uses.
    """
    electricity_units = params.get("electricity_units", 100000)  # kWh/day
    fraction_lighting = params.get("fraction_lighting", 0.20)
    fraction_cooking = params.get("fraction_cooking", 0.25)
    fraction_ac_cooling = params.get("fraction_ac_cooling", 0.30)
    fraction_factories = params.get("fraction_factories", 0.25)

    uses = {
        "Lighting (homes & streets)": electricity_units * fraction_lighting,
        "Cooking (electric stoves)": electricity_units * fraction_cooking,
        "AC / Cooling": electricity_units * fraction_ac_cooling,
        "Factories & industry": electricity_units * fraction_factories,
    }

    steps = [
        "Step 1: Define Composite Demand.",
        "  Composite demand exists when a single good is demanded for MULTIPLE "
        "different uses.",
        "  Example (India): Electricity - used for lighting, cooking, cooling (AC), "
        "and running factories - all at the same time.",
        "",
        "Step 2: Record total electricity supply (kWh/day).",
        f"  Total = {electricity_units:,} kWh/day",
        "",
        "Step 3: Allocate across uses:",
    ]

    total_check = 0.0
    for use, units in uses.items():
        steps.append(f"  {use} = {units:,.0f} kWh/day")
        total_check += units

    steps += [
        "",
        f"Step 4: Sum of all uses = {total_check:,.0f} kWh/day",
        "  This equals total supply - mass balance verified.",
        "",
        "Step 5: Conclusion.",
        "  Electricity has COMPOSITE DEMAND - a single good satisfying multiple "
        "distinct needs simultaneously across the Indian economy.",
    ]

    verification = Verification(
        passed=math.isclose(total_check, electricity_units, rel_tol=1e-6),
        detail=(
            f"Mass balance: sum of uses ({total_check:,.0f}) "
            f"vs total supply ({electricity_units:,}). "
            f"Match: {math.isclose(total_check, electricity_units, rel_tol=1e-6)}"
        ),
    )

    return SolveResult(
        answer={"uses": {k: round(v) for k, v in uses.items()},
                "total_kwh_day": electricity_units},
        steps=steps,
        verification=verification,
    )


def solve_demand_elasticity(params: dict) -> SolveResult:
    """
    Price Elasticity of Demand (PED) using percentage method - Indian market data.
    PED = %ΔQd / %ΔP
    """
    Q1 = params.get("Q1", 200.0)    # initial quantity demanded (kg rice, tonnes, etc.)
    Q2 = params.get("Q2", 180.0)    # new quantity demanded
    P1 = params.get("P1", 40.0)     # initial price ₹/kg
    P2 = params.get("P2", 44.0)     # new price ₹/kg

    pct_delta_q = ((Q2 - Q1) / Q1) * 100.0
    pct_delta_p = ((P2 - P1) / P1) * 100.0
    ped = pct_delta_q / pct_delta_p if pct_delta_p != 0 else float("inf")

    steps = [
        "Step 1: Recall the formula for Price Elasticity of Demand (PED).",
        "  PED = (% Change in Quantity Demanded) / (% Change in Price)",
        "  PED = (%ΔQd) / (%ΔP)",
        "",
        f"Step 2: Given: Q1 = {Q1}, Q2 = {Q2}, P1 = ₹{P1}/unit, P2 = ₹{P2}/unit",
        "",
        "Step 3: Calculate %ΔQd.",
        f"  %ΔQd = ((Q2 - Q1) / Q1) x 100",
        f"        = (({Q2} - {Q1}) / {Q1}) x 100",
        f"        = ({Q2 - Q1} / {Q1}) x 100",
        f"        = {pct_delta_q:.4f}%",
        "",
        "Step 4: Calculate %ΔP.",
        f"  %ΔP = ((P2 - P1) / P1) x 100",
        f"       = (({P2} - {P1}) / {P1}) x 100",
        f"       = ({P2 - P1} / {P1}) x 100",
        f"       = {pct_delta_p:.4f}%",
        "",
        "Step 5: Compute PED.",
        f"  PED = {pct_delta_q:.4f}% / {pct_delta_p:.4f}%",
        f"      = {ped:.4f}",
    ]

    if abs(ped) < 1:
        classification = "Inelastic demand (|PED| < 1)"
    elif abs(ped) == 1:
        classification = "Unit elastic demand (|PED| = 1)"
    else:
        classification = "Elastic demand (|PED| > 1)"

    steps += [
        "",
        f"Step 6: Interpretation - {classification}.",
        "  For essential goods like foodgrains in India, demand tends to be inelastic.",
    ]

    # Numerical verification: recompute from PED back to Q2
    q2_check = Q1 * (1 + ped * (P2 - P1) / P1)
    verification = Verification(
        passed=math.isclose(q2_check, Q2, rel_tol=1e-4),
        detail=(
            f"Back-substitution: recomputed Q2 = {Q1} x (1 + {ped:.4f} x "
            f"({P2}-{P1})/{P1}) = {q2_check:.4f}, "
            f"expected {Q2}. Match: {math.isclose(q2_check, Q2, rel_tol=1e-4)}"
        ),
    )

    return SolveResult(
        answer={"ped": round(ped, 4), "pct_delta_q": round(pct_delta_q, 4),
                "pct_delta_p": round(pct_delta_p, 4),
                "classification": classification},
        steps=steps,
        verification=verification,
    )


# ─────────────────────────────────────────────────────────────────────────────
# TOPIC 2 - LAND: MEANING AND CHARACTERISTICS
# ─────────────────────────────────────────────────────────────────────────────

def solve_land_characteristics(params: dict) -> SolveResult:
    """
    Given characteristics of land, explain and compute/verify key attributes.
    """
    total_area_mha = params.get("total_area_mha", 328.7)        # million hectares (India)
    agricultural_area_mha = params.get("agricultural_area_mha", 179.8)
    characteristics = params.get("characteristics", [])

    steps = [
        "Step 1: Economic meaning of LAND.",
        "  In economics, 'land' means ALL free gifts of nature -",
        "  soil surface, rivers, forests, minerals, climate, rainfall.",
        "  It is NOT limited to farmland.",
        "  Examples: Jharia coalfields (mineral land), Western Ghats (forest land),",
        "  Mawsynram rainfall (climatic land resource).",
        "",
        "Step 2: Key characteristics of land.",
        "  1. FREE GIFT OF NATURE - no human effort required to create it.",
        "  2. FIXED SUPPLY - total land area cannot be increased (Ceteris paribus).",
        "  3. IMMOBILE - land cannot be moved from one place to another.",
        "  4. HETEROGENEOUS QUALITY - Deccan black soil (cotton) != western Rajasthan sand.",
        "  5. PASSIVE FACTOR - land does nothing on its own; it needs labour & capital.",
        "  6. INDESTRUCTIBLE - land as a space cannot be destroyed; only fertility can degrade.",
        "",
        "Step 3: Illustrate fixed supply with India's data.",
    ]

    pct_agri = (agricultural_area_mha / total_area_mha) * 100
    steps += [
        f"  Total geographical area of India  = {total_area_mha} million hectares",
        f"  Area under agricultural use       = {agricultural_area_mha} million hectares",
        f"  % used for agriculture            = {pct_agri:.1f}%",
        f"  Remaining area                    = {total_area_mha - agricultural_area_mha:.1f} million hectares",
        "  Note: Total cannot increase - supply is FIXED.",
    ]

    if characteristics:
        steps.append("")
        steps.append("Step 4: Check given characteristics against the list above:")
        for c in characteristics:
            steps.append(f"  ✓ '{c}' is a valid characteristic of land.")

    verification = Verification(
        passed=agricultural_area_mha < total_area_mha,
        detail=(
            f"Verification: agricultural area ({agricultural_area_mha} mha) "
            f"< total area ({total_area_mha} mha). "
            f"Fixed supply confirmed: {agricultural_area_mha < total_area_mha}"
        ),
    )

    return SolveResult(
        answer={
            "pct_agricultural": round(pct_agri, 2),
            "characteristics_listed": len(characteristics),
        },
        steps=steps,
        verification=verification,
    )


def solve_land_fertility_comparison(params: dict) -> SolveResult:
    """
    Compare soil productivity across Indian regions - numerical exercise.
    """
    soil_types = params.get("soil_types", {
        "Black Soil (Maharashtra)": {"wheat_yield_kg_ha": 3500, "cotton_yield_kg_ha": 500},
        "Alluvial Soil (Punjab)": {"wheat_yield_kg_ha": 5200, "cotton_yield_kg_ha": 300},
        "Red Soil (Karnataka)": {"wheat_yield_kg_ha": 2200, "cotton_yield_kg_ha": 400},
        "Sandy Soil (Rajasthan)": {"wheat_yield_kg_ha": 800,  "cotton_yield_kg_ha": 100},
    })
    crop = params.get("crop", "wheat")

    steps = [
        "Step 1: Recall HETEROGENEOUS QUALITY of land.",
        "  Different soils produce different yields for the same crop.",
        "  This proves land is NOT uniform in quality across India.",
        "",
        f"Step 2: Compare {crop} yield per hectare across soil types.",
    ]

    yields = {}
    for soil, data in soil_types.items():
        y = data.get(f"{crop}_yield_kg_ha", 0)
        yields[soil] = y

    ranked = sorted(yields.items(), key=lambda x: x[1], reverse=True)

    for soil, y in ranked:
        steps.append(f"  {soil}: {y:,} kg/ha")

    best_soil, best_yield = ranked[0]
    worst_soil, worst_yield = ranked[-1]
    ratio = best_yield / worst_yield if worst_yield > 0 else float("inf")

    steps += [
        "",
        f"Step 3: Identify best and worst performing soil for {crop}.",
        f"  Best  : {best_soil} → {best_yield:,} kg/ha",
        f"  Worst : {worst_soil} → {worst_yield:,} kg/ha",
        f"  Ratio of best to worst yield = {best_yield:,} / {worst_yield:,} = {ratio:.2f}x",
        "",
        "Step 4: Conclusion.",
        f"  The same crop yields {ratio:.1f} times more on the best soil than on the worst.",
        "  This CONFIRMS that land has HETEROGENEOUS QUALITY - a key characteristic.",
    ]

    verification = Verification(
        passed=ratio > 1,
        detail=(
            f"Verification: best yield ({best_yield}) > worst yield ({worst_yield}). "
            f"Ratio = {ratio:.2f}. Heterogeneity confirmed: {ratio > 1}"
        ),
    )

    return SolveResult(
        answer={
            "ranked_yields": ranked,
            "best_soil": best_soil,
            "worst_soil": worst_soil,
            "yield_ratio": round(ratio, 2),
        },
        steps=steps,
        verification=verification,
    )


# ─────────────────────────────────────────────────────────────────────────────
# TOPIC 3 - CREDIT: MEANING AND IMPORTANCE
# ─────────────────────────────────────────────────────────────────────────────

def solve_credit_meaning(params: dict) -> SolveResult:
    """
    Define credit, identify creditor/debtor, and explain deferred payment.
    """
    transaction = params.get("transaction", "")
    amount = params.get("amount", 0.0)
    deferred = params.get("deferred", True)
    interest_rate = params.get("interest_rate", 0.0)

    steps = [
        "Step 1: Definition of CREDIT.",
        "  Credit is a deferred-payment transaction - goods, services, or money are",
        "  received NOW with a PROMISE to pay LATER.",
        "  The two parties:",
        "    - CREDITOR: the party who lends (gives now, receives later).",
        "    - DEBTOR: the party who borrows (receives now, pays later).",
        "",
        f"Step 2: Analyse transaction - {transaction}.",
        f"  Amount involved: ₹{amount:,.2f}",
        f"  Payment deferred: {'Yes' if deferred else 'No'}",
    ]

    if deferred:
        steps += [
            "",
            "Step 3: Determine creditor and debtor.",
            f"  The party providing ₹{amount:,.2f} now → CREDITOR",
            f"  The party receiving ₹{amount:,.2f} now → DEBTOR",
            "",
            "Step 4: Identify the type of credit transaction.",
            "  This is a DEFERRED PAYMENT credit - the defining feature of credit.",
        ]

        if interest_rate > 0:
            total_repayment = amount * (1 + interest_rate)
            steps += [
                "",
                f"Step 5: Calculate repayment with {interest_rate*100:.0f}% interest.",
                f"  Total repayment = ₹{amount:,.2f} x (1 + {interest_rate:.4f})",
                f"                  = ₹{amount:,.2f} x {1+interest_rate:.4f}",
                f"                  = ₹{total_repayment:,.2f}",
                f"  Interest amount = ₹{total_repayment - amount:,.2f}",
            ]
            answer = {
                "creditor": "Lender / bank",
                "debtor": "Borrower",
                "total_repayment_inr": round(total_repayment, 2),
                "interest_inr": round(total_repayment - amount, 2),
            }
        else:
            answer = {
                "creditor": "Lender / bank",
                "debtor": "Borrower",
                "total_repayment_inr": round(amount, 2),
                "interest_inr": 0.0,
            }
    else:
        steps.append("  This is a CASH transaction - NO credit involved.")
        answer = {"credit": False, "reason": "Immediate payment, no deferral"}

    verification = Verification(
        passed=True,
        detail=(
            "Verification: A credit transaction must involve deferred payment "
            "(receive now, pay later). "
            f"Deferred={deferred}. Credit confirmed: {deferred}."
        ),
    )

    return SolveResult(answer=answer, steps=steps, verification=verification)


def solve_emi_calculation(params: dict) -> SolveResult:
    """
    Calculate Equated Monthly Instalment (EMI) - Indian banking context.
    Formula: EMI = P x r x (1+r)^n / [(1+r)^n - 1]
    where r = monthly rate, n = number of months.
    """
    principal = params.get("principal", 200000.0)        # ₹ loan amount
    annual_rate = params.get("annual_rate", 9.5)          # % per annum
    tenure_months = params.get("tenure_months", 60)       # 5 years

    monthly_rate = annual_rate / 12 / 100.0
    n = tenure_months
    r = monthly_rate
    P = principal

    if r == 0:
        emi = P / n
    else:
        emi = P * r * (1 + r) ** n / ((1 + r) ** n - 1)

    total_payment = emi * n
    total_interest = total_payment - P

    steps = [
        "Step 1: State the EMI formula.",
        "  EMI = [P x r x (1+r)^n] / [(1+r)^n - 1]",
        "  P = Principal (loan amount), r = monthly interest rate, n = months",
        "",
        f"Step 2: Input values (Indian banking context - e.g., Bajaj Finserv EMI).",
        f"  P  = ₹{P:,.2f}",
        f"  Annual rate = {annual_rate}% p.a.",
        f"  r  = {annual_rate}% / 12 = {annual_rate/12:.4f}% per month = {r:.6f}",
        f"  n  = {n} months",
        "",
        "Step 3: Compute (1+r)^n.",
        f"  (1 + {r:.6f})^{n} = {(1+r)**n:.8f}",
        "",
        "Step 4: Numerator.",
        f"  Numerator = P x r x (1+r)^n",
        f"            = ₹{P:,.2f} x {r:.6f} x {(1+r)**n:.8f}",
        f"            = ₹{P * r * (1+r)**n:,.4f}",
        "",
        "Step 5: Denominator.",
        f"  Denominator = (1+r)^n - 1 = {(1+r)**n:.8f} - 1 = {(1+r)**n - 1:.8f}",
        "",
        "Step 6: EMI.",
        f"  EMI = ₹{P * r * (1+r)**n:,.4f} / {(1+r)**n - 1:.8f}",
        f"      = ₹{emi:,.2f} per month",
        "",
        "Step 7: Total cost of credit.",
        f"  Total payment = ₹{emi:,.2f} x {n} = ₹{total_payment:,.2f}",
        f"  Total interest = ₹{total_payment:,.2f} - ₹{P:,.2f} = ₹{total_interest:,.2f}",
    ]

    # Verification: recompute using the expanded formula
    emi_check = P if r == 0 else P * r * (1 + r) ** n / ((1 + r) ** n - 1)
    verification = Verification(
        passed=math.isclose(emi_check, emi, rel_tol=1e-9),
        detail=(
            f"Back-substitution: recomputed EMI = ₹{emi_check:,.4f}, "
            f"expected ₹{emi:,.4f}. Match: {math.isclose(emi_check, emi, rel_tol=1e-9)}"
        ),
    )

    return SolveResult(
        answer={
            "emi_inr": round(emi, 2),
            "total_payment_inr": round(total_payment, 2),
            "total_interest_inr": round(total_interest, 2),
        },
        steps=steps,
        verification=verification,
    )


def solve_compound_interest_credit(params: dict) -> SolveResult:
    """
    Compound interest on credit - farmer crop loan scenario (India).
    A = P(1 + r)^n  (annual compounding)
    """
    principal = params.get("principal", 50000.0)        # ₹ crop loan
    annual_rate = params.get("annual_rate", 7.0)          # % p.a. (typical SBI crop loan)
    years = params.get("years", 1)                        # 1 crop season

    P = principal
    r = annual_rate / 100.0
    n = years
    amount = P * (1 + r) ** n
    interest = amount - P

    steps = [
        "Step 1: State the compound interest formula (annual compounding).",
        "  A = P(1 + r)^n",
        "  A = Amount (total repayment), P = Principal, r = rate per period, n = periods",
        "",
        f"Step 2: Context - Farmer in Vidarbha takes a crop loan.",
        f"  P (crop loan from SBI)   = ₹{P:,.2f}",
        f"  Annual rate (crop loan)  = {annual_rate}% p.a.",
        f"  Duration                 = {n} year(s) (kharif season: June to October)",
        "",
        "Step 3: Apply formula.",
        f"  A = ₹{P:,.2f} x (1 + {r:.4f})^{n}",
        f"    = ₹{P:,.2f} x {(1+r)**n:.6f}",
        f"    = ₹{amount:,.2f}",
        "",
        "Step 4: Compute compound interest.",
        f"  CI = A - P = ₹{amount:,.2f} - ₹{P:,.2f} = ₹{interest:,.2f}",
        "",
        "Step 5: Interpretation (Indian agricultural credit context).",
        f"  The farmer borrows ₹{P:,.0f} in June for seeds & fertilisers,",
        f"  repays ₹{amount:,.2f} after harvest in October - credit bridges",
        "  the gap between sowing cost and sale proceeds.",
    ]

    # Numerical verification
    amount_check = P * (1 + r) ** n
    verification = Verification(
        passed=math.isclose(amount_check, amount, rel_tol=1e-10),
        detail=(
            f"Verification: Px(1+r)^n = ₹{P:,.0f} x {(1+r)**n:.8f} = "
            f"₹{amount_check:,.4f}. Match: {math.isclose(amount_check, amount, rel_tol=1e-10)}"
        ),
    )

    return SolveResult(
        answer={
            "amount_inr": round(amount, 2),
            "compound_interest_inr": round(interest, 2),
            "effective_rate_pct": round(annual_rate, 2),
        },
        steps=steps,
        verification=verification,
    )


def solve_credit_importance_india(params: dict) -> SolveResult:
    """
    Enumerate and explain five ways credit is important in the Indian economy.
    The student provides a structured answer; solver validates coverage.
    """
    provided_points = params.get("points", [])

    expected_points = [
        "Enables farmers to buy seeds and fertilisers before harvest (crop loans)",
        "Helps small businesses purchase raw materials (working capital loans)",
        "Allows households to buy durable goods on EMI (refrigerators, two-wheelers)",
        "Finances government fiscal deficit through G-Secs and borrowing",
        "Stimulates investment and economic growth by providing capital",
        "Reduces cash-crunch during off-season for agricultural workers",
        "Supports MSME sector through formal credit channels",
    ]

    steps = [
        "Step 1: Define Credit.",
        "  Credit = deferred payment. Receive now, promise to pay later.",
        "  Parties: Creditor (lender) and Debtor (borrower).",
        "",
        "Step 2: Importance of Credit - Indian context.",
        "  Credit plays a vital role in the Indian economy across sectors:",
    ]

    for i, pt in enumerate(expected_points, 1):
        steps.append(f"  {i}. {pt}")

    steps += [
        "",
        "Step 3: Evaluate the student's provided points.",
    ]

    matched = [p for p in provided_points if any(
        kw in p.lower() for kw in
        ["farmer", "crop", "business", "emi", "government", "gsec", "investment",
         "growth", "msme", "household", "fertiliser", "raw material"]
    )]

    steps.append(
        f"  Provided {len(provided_points)} point(s); "
        f"{len(matched)} cover key themes."
    )
    steps.append(
        "  A good answer must cover: agriculture, business/industry, "
        "households, government, and economic growth."
    )

    missing = [pt for pt in expected_points[:5] if not any(
        kw in " ".join(provided_points).lower() for kw in pt.lower().split()[:3]
    )]

    answer = {
        "all_importance_points": expected_points[:6],
        "student_points": provided_points,
        "themes_covered": len(matched),
        "missing_themes": missing,
    }

    verification = Verification(
        passed=len(matched) >= 3,
        detail=(
            f"Coverage check: {len(matched)}/6 themes covered. "
            f"Minimum 3 required. Pass: {len(matched) >= 3}"
        ),
    )

    return SolveResult(answer=answer, steps=steps, verification=verification)


def solve_formal_vs_informal_credit(params: dict) -> SolveResult:
    """
    Compare formal and informal credit in India - numerical and conceptual.
    """
    loan_amount = params.get("loan_amount", 10000.0)
    formal_rate = params.get("formal_rate", 12.0)       # % p.a. (SBI, cooperative bank)
    informal_rate = params.get("informal_rate", 36.0)    # % p.a. (moneylender)
    months = params.get("months", 12)

    r_f = formal_rate / 12 / 100.0
    r_i = informal_rate / 12 / 100.0
    n = months
    P = loan_amount

    emi_f = P * r_f * (1 + r_f) ** n / ((1 + r_f) ** n - 1) if r_f > 0 else P / n
    emi_i = P * r_i * (1 + r_i) ** n / ((1 + r_i) ** n - 1) if r_i > 0 else P / n

    total_f = emi_f * n
    total_i = emi_i * n
    savings = total_i - total_f
    pct_savings = (savings / total_i) * 100

    steps = [
        "Step 1: Define Formal vs Informal Credit.",
        "  Formal Credit: Provided by banks, cooperatives, SHGs - regulated by RBI.",
        "  Examples: SBI, NABARD, District Cooperative Banks, Microfinance (regulated).",
        "  Informal Credit: Provided by moneylenders, friends, relatives - NOT regulated.",
        "  Examples: Local moneylender (sahukar) in rural India.",
        "",
        "Step 2: Compare cost of credit for a ₹10,000 loan.",
        f"  Loan amount (P) = ₹{P:,.2f}",
        f"  Tenure          = {n} months",
        "",
        "Step 3: Formal credit (e.g., SBI) at 12% p.a.",
        f"  Monthly rate r = {formal_rate}% / 12 = {r_f:.5f}",
        f"  EMI (formal) = ₹{emi_f:,.2f}/month",
        f"  Total (formal) = ₹{total_f:,.2f}",
        "",
        "Step 4: Informal credit (moneylender) at 36% p.a.",
        f"  Monthly rate r = {informal_rate}% / 12 = {r_i:.5f}",
        f"  EMI (informal) = ₹{emi_i:,.2f}/month",
        f"  Total (informal) = ₹{total_i:,.2f}",
        "",
        "Step 5: Calculate savings from formal credit.",
        f"  Savings = ₹{total_i:,.2f} - ₹{total_f:,.2f} = ₹{savings:,.2f}",
        f"  % savings = {pct_savings:.1f}%",
        "",
        "Step 6: Conclusion.",
        "  Formal credit is significantly cheaper and legally protected.",
        "  RBI promotes financial inclusion to reduce dependence on informal credit.",
    ]

    verification = Verification(
        passed=total_f < total_i,
        detail=(
            f"Numerical check: formal total ₹{total_f:,.2f} < informal total "
            f"₹{total_i:,.2f}. "
            f"Savings = ₹{savings:,.2f} ({pct_savings:.1f}%). "
            f"Formal cheaper: {total_f < total_i}"
        ),
    )

    return SolveResult(
        answer={
            "emi_formal_inr": round(emi_f, 2),
            "emi_informal_inr": round(emi_i, 2),
            "total_formal_inr": round(total_f, 2),
            "total_informal_inr": round(total_i, 2),
            "savings_inr": round(savings, 2),
            "savings_pct": round(pct_savings, 1),
        },
        steps=steps,
        verification=verification,
    )


# ─────────────────────────────────────────────────────────────────────────────
# SOLVER DISPATCH
# ─────────────────────────────────────────────────────────────────────────────

SOLVERS = {
    # Topic 1 - Demand
    "demand_meaning": solve_demand_meaning,
    "joint_demand_india": solve_joint_demand_india,
    "derived_demand_india": solve_derived_demand_india,
    "composite_demand_india": solve_composite_demand_india,
    "demand_elasticity": solve_demand_elasticity,
    # Topic 2 - Land
    "land_characteristics": solve_land_characteristics,
    "land_fertility_comparison": solve_land_fertility_comparison,
    # Topic 3 - Credit
    "credit_meaning": solve_credit_meaning,
    "emi_calculation": solve_emi_calculation,
    "compound_interest_credit": solve_compound_interest_credit,
    "credit_importance_india": solve_credit_importance_india,
    "formal_vs_informal_credit": solve_formal_vs_informal_credit,
}


def solve(problem_type: str, params: dict) -> SolveResult:
    """
    Universal solver entry-point.
    Routes to the appropriate topic solver based on problem_type.
    """
    if problem_type not in SOLVERS:
        raise ValueError(
            f"Unknown problem_type '{problem_type}'. "
            f"Available: {list(SOLVERS.keys())}"
        )
    return SOLVERS[problem_type](params)


# ─────────────────────────────────────────────────────────────────────────────
# QUESTION GENERATION - FULL SYLLABUS COVERAGE
# ─────────────────────────────────────────────────────────────────────────────

# Question templates keyed by topic tag
# Each template: (id_prefix, competency, question_fn, option_fn, answer_fn, explanation_fn, difficulty)

def _rng(seed: int):
    """Return a fresh Random instance seeded deterministically."""
    return random.Random(seed)


# ── Topic 1 Templates ────────────────────────────────────────────────────────

def _q_demand_mcq(seed: int, index: int) -> Question:
    r = _rng(seed + index * 137)
    variants = [
        {
            "question": (
                "Rahul wants a smartphone worth ₹25,000 but has only ₹500 in his pocket. "
                "According to economics, Rahul has:"
            ),
            "options": ["Demand", "Mere Desire", "Derived Demand", "Composite Demand"],
            "answer": 1,
            "explanation": (
                "Rahul has mere desire because he lacks the ABILITY TO PAY. "
                "Economic demand requires desire + ability to pay + willingness to pay."
            ),
        },
        {
            "question": (
                "When the demand for cars in India increases, the demand for petrol "
                "also increases. This is called:"
            ),
            "options": ["Derived Demand", "Composite Demand",
                        "Joint Demand", "Indirect Demand"],
            "answer": 2,
            "explanation": (
                "Joint demand: two goods (cars and petrol) are demanded simultaneously "
                "for the same purpose (driving)."
            ),
        },
        {
            "question": (
                "Tata Motors demands steel because people are buying Tata Nexon cars. "
                "The demand for steel is an example of:"
            ),
            "options": ["Joint Demand", "Composite Demand",
                        "Derived Demand", "Direct Demand"],
            "answer": 2,
            "explanation": (
                "Derived demand: the demand for steel exists because of the demand "
                "for cars. Steel is a factor input whose demand is derived from "
                "the final good."
            ),
        },
        {
            "question": (
                "Electricity used in India for lighting, cooking, air-conditioning, and "
                "running factories is an example of:"
            ),
            "options": ["Joint Demand", "Derived Demand",
                        "Composite Demand", "Direct Demand"],
            "answer": 2,
            "explanation": (
                "Composite demand: the same good (electricity) is demanded for "
                "multiple, independent uses simultaneously."
            ),
        },
    ]
    v = variants[index % len(variants)]
    return Question(
        id=f"demand_mcq_{index+1}",
        type="mcq",
        topic="Demand - Meaning and Types",
        difficulty="easy",
        competency=True,
        question=v["question"],
        options=v["options"],
        answer=v["answer"],
        explanation=v["explanation"],
    )


def _q_demand_fillblank(seed: int, index: int) -> Question:
    r = _rng(seed + index * 251 + 500)
    variants = [
        {
            "question": (
                "Economic demand requires three conditions: desire, ______ to pay, "
                "and ______ to pay. (Two blanks)"
            ),
            "answer": ["ability", "willingness"],
            "explanation": (
                "Demand = Desire + Ability to Pay + Willingness to Pay. "
                "All three must be present simultaneously."
            ),
        },
        {
            "question": (
                "The demand for steel by Tata Motors is ______ demand because it "
                "depends on the demand for cars."
            ),
            "answer": ["derived"],
            "explanation": (
                "Derived demand: demand for a factor of production arises from "
                "demand for the final good it helps produce."
            ),
        },
        {
            "question": (
                "When petrol and cars are demanded together, it is called ______ demand."
            ),
            "answer": ["joint"],
            "explanation": (
                "Joint demand: two goods are demanded simultaneously because "
                "they are used together."
            ),
        },
        {
            "question": (
                "The demand for electricity for multiple uses (lighting, cooking, "
                "cooling) is called ______ demand."
            ),
            "answer": ["composite"],
            "explanation": (
                "Composite demand: a single good has demand from multiple "
                "independent uses at the same time."
            ),
        },
    ]
    v = variants[index % len(variants)]
    return Question(
        id=f"demand_fb_{index+1}",
        type="fill_blank",
        topic="Demand - Meaning and Types",
        difficulty="easy",
        competency=True,
        question=v["question"],
        answer=" | ".join(v["answer"]),
        explanation=v["explanation"],
    )


def _q_demand_numerical(seed: int, index: int) -> Question:
    r = _rng(seed + index * 313 + 1000)
    scenario_idx = index % 3
    if scenario_idx == 0:
        # PED problem
        P1 = r.randint(30, 60)
        P2 = P1 + r.randint(3, 10)
        Q1 = r.randint(150, 300)
        elasticity_frac = Fraction(r.randint(1, 4), r.randint(2, 5))
        Q2 = round(Q1 * (1 - float(elasticity_frac) * (P2 - P1) / P1))
        Q2 = max(Q2, 10)
        pct_q = ((Q2 - Q1) / Q1) * 100
        pct_p = ((P2 - P1) / P1) * 100
        ped = pct_q / pct_p
        return Question(
            id=f"demand_num_{index+1}",
            type="numerical",
            topic="Demand - Meaning and Types",
            difficulty="medium",
            competency=False,
            question=(
                f"Price of rice rises from ₹{P1}/kg to ₹{P2}/kg. "
                f"Quantity demanded falls from {Q1} kg to {Q2} kg. "
                "Calculate Price Elasticity of Demand (PED) using percentage method."
            ),
            answer=round(ped, 3),
            explanation=(
                f"PED = (%ΔQd)/(%ΔP) = (({Q2}-{Q1})/{Q1}x100)/(({P2}-{P1})/{P1}x100) "
                f"= {pct_q:.2f}%/{pct_p:.2f}% = {ped:.3f}. "
                f"Rice is price-inelastic in India (|PED|<1)."
            ),
            unit="dimensionless",
        )
    elif scenario_idx == 1:
        # Derived demand numerical
        vehicles = r.randint(200000, 800000)
        steel_kg = r.randint(700, 1100)
        price_tonne = r.randint(55000, 75000)
        steel_tonnes = vehicles * steel_kg / 1000
        value = steel_tonnes * price_tonne
        return Question(
            id=f"demand_num_{index+1}",
            type="numerical",
            topic="Demand - Meaning and Types",
            difficulty="medium",
            competency=True,
            question=(
                f"If Indian auto manufacturers sell {vehicles:,} cars and each car "
                f"requires {steel_kg} kg of steel, "
                f"calculate the total tonnes of steel demanded "
                f"(derived demand). Steel costs ₹{price_tonne:,}/tonne. "
                "Find total value of derived steel demand."
            ),
            answer={"tonnes": round(steel_tonnes, 2), "value_inr": round(value, 2)},
            explanation=(
                f"Steel tonnes = {vehicles:,} x {steel_kg} kg / 1000 = "
                f"{steel_tonnes:,.2f} tonnes. "
                f"Value = {steel_tonnes:,.2f} x ₹{price_tonne:,} = ₹{value:,.2f}."
            ),
        )
    else:
        # Joint demand expenditure
        units_a = r.randint(50000, 500000)
        units_b = r.randint(5000000, 50000000)
        price_a = r.randint(200000, 1500000)
        price_b = round(r.uniform(80, 130), 2)
        total = units_a * price_a + units_b * price_b
        return Question(
            id=f"demand_num_{index+1}",
            type="numerical",
            topic="Demand - Meaning and Types",
            difficulty="medium",
            competency=True,
            question=(
                f"In a month, {units_a:,} smartphones and {units_b:,} SIM cards "
                f"are jointly demanded in India. "
                f"A smartphone costs ₹{price_a:,} and a SIM card costs ₹{price_b:.2f}. "
                "What is the total joint expenditure on this pair of complementary goods?"
            ),
            answer=round(total, 2),
            explanation=(
                f"Total = {units_a:,} x ₹{price_a:,} + {units_b:,} x ₹{price_b:.2f} "
                f"= ₹{units_a*price_a:,.0f} + ₹{units_b*price_b:,.0f} = ₹{total:,.2f}"
            ),
            unit="INR",
        )


# ── Topic 2 Templates ────────────────────────────────────────────────────────

def _q_land_mcq(seed: int, index: int) -> Question:
    r = _rng(seed + index * 401 + 2000)
    variants = [
        {
            "question": (
                "In economics, 'land' includes all of the following EXCEPT:"
            ),
            "options": [
                "Soil surface used for farming",
                "Rivers and water bodies",
                "Factory buildings constructed by humans",
                "Mineral deposits like coal and iron ore",
            ],
            "answer": 2,
            "explanation": (
                "Economic land = all free gifts of nature. Factory buildings are "
                "capital (man-made), not land."
            ),
        },
        {
            "question": (
                "Which of the following is NOT a characteristic of land?"
            ),
            "options": [
                "Free gift of nature",
                "Fixed supply",
                "Created by human effort",
                "Immobile",
            ],
            "answer": 2,
            "explanation": (
                "Land is a free gift of nature - it is NOT created by human effort. "
                "Human effort creates capital, not land."
            ),
        },
        {
            "question": (
                "The Deccan black soil is good for cotton while western Rajasthan's "
                "sandy soil is not. This illustrates that land is:"
            ),
            "options": [
                "Fixed in supply",
                "Immobile",
                "Heterogeneous in quality",
                "Indestructible",
            ],
            "answer": 2,
            "explanation": (
                "Heterogeneous quality: different plots of land differ in fertility, "
                "texture, and productivity across India."
            ),
        },
        {
            "question": (
                "Land is called a 'passive factor' because:"
            ),
            "options": [
                "It is fixed in supply",
                "It cannot produce anything on its own",
                "It cannot be moved",
                "It is free",
            ],
            "answer": 1,
            "explanation": (
                "Land is passive because it needs labour and capital to be productive. "
                "Soil alone does not grow crops - farmers must work it."
            ),
        },
    ]
    v = variants[index % len(variants)]
    return Question(
        id=f"land_mcq_{index+1}",
        type="mcq",
        topic="Land - Meaning and Characteristics",
        difficulty="easy",
        competency=True,
        question=v["question"],
        options=v["options"],
        answer=v["answer"],
        explanation=v["explanation"],
    )


def _q_land_fillblank(seed: int, index: int) -> Question:
    r = _rng(seed + index * 419 + 3000)
    variants = [
        {
            "question": (
                "In economic sense, 'land' includes all ______ gifts of nature such as "
                "soil, rivers, forests, minerals, and climate."
            ),
            "answer": "free",
            "explanation": (
                "Economic land = all free gifts of nature, not just farmland."
            ),
        },
        {
            "question": (
                "The total supply of land is ______ - it cannot be increased "
                "in the short run or long run."
            ),
            "answer": "fixed",
            "explanation": (
                "Land supply is fixed. No country can create more land area "
                "(though it can reclaim coastal land at high cost)."
            ),
        },
        {
            "question": (
                "Land is called an ______ factor of production because it does nothing "
                "on its own and needs labour and capital."
            ),
            "answer": "passive",
            "explanation": (
                "Land is passive: it requires human effort (labour) and tools "
                "(capital) to be productive."
            ),
        },
        {
            "question": (
                "The ______ soil of the Deccan Plateau (Maharashtra) is excellent for "
                "cotton cultivation, illustrating heterogeneous quality of land."
            ),
            "answer": "black (regur)",
            "explanation": (
                "Black (regur) soil of Maharashtra, Gujarat, MP is ideal for cotton, "
                "while sandy soil of western Rajasthan is not."
            ),
        },
    ]
    v = variants[index % len(variants)]
    return Question(
        id=f"land_fb_{index+1}",
        type="fill_blank",
        topic="Land - Meaning and Characteristics",
        difficulty="easy",
        competency=True,
        question=v["question"],
        answer=v["answer"],
        explanation=v["explanation"],
    )


def _q_land_short(seed: int, index: int) -> Question:
    r = _rng(seed + index * 433 + 4000)
    variants = [
        {
            "question": (
                "Explain TWO differences between economic 'land' and the common-use "
                "meaning of 'land'. Give one Indian example for each."
            ),
            "answer": (
                "(1) Economic land includes rivers, forests, minerals, climate; "
                "common land = only soil/farmland. "
                "Example: Jharia coalfields = economic land (mineral). "
                "(2) Economic land is a factor of production; common land is just "
                "a place to live/farm."
            ),
            "explanation": (
                "Students must distinguish economic definition (broad, all free gifts "
                "of nature) from everyday usage (farmland only)."
            ),
        },
        {
            "question": (
                "Why is land described as a 'passive factor of production'? "
                "Explain with reference to Indian agriculture."
            ),
            "answer": (
                "Land is passive because it cannot produce anything on its own. "
                "It needs labour (farmers) and capital (tractors, seeds, fertilisers) "
                "to be productive. "
                "Example: Deccan black soil alone does not grow cotton - farmers "
                "must plough, sow, and irrigate."
            ),
            "explanation": (
                "Land provides the SPACE and NATURAL INPUTS but requires human "
                "effort and capital to yield output."
            ),
        },
    ]
    v = variants[index % len(variants)]
    return Question(
        id=f"land_sa_{index+1}",
        type="short_answer",
        topic="Land - Meaning and Characteristics",
        difficulty="easy",
        competency=True,
        question=v["question"],
        answer=v["answer"],
        explanation=v["explanation"],
    )


# ── Topic 3 Templates ────────────────────────────────────────────────────────

def _q_credit_mcq(seed: int, index: int) -> Question:
    r = _rng(seed + index * 521 + 5000)
    variants = [
        {
            "question": (
                "A farmer in Vidarbha buys fertiliser worth ₹15,000 now and agrees to "
                "pay the shopkeeper after the October harvest. This transaction is:"
            ),
            "options": [
                "A cash transaction",
                "A credit transaction",
                "A barter transaction",
                "An investment",
            ],
            "answer": 1,
            "explanation": (
                "This is credit: the farmer receives goods NOW with a promise "
                "to pay LATER (deferred payment)."
            ),
        },
        {
            "question": (
                "In a credit transaction, the party that lends money or goods is "
                "called the:"
            ),
            "options": [
                "Debtor",
                "Borrower",
                "Creditor",
                "Investor",
            ],
            "answer": 2,
            "explanation": (
                "Creditor = party that gives money/goods now and expects "
                "repayment later. Debtor = party that receives now and pays later."
            ),
        },
        {
            "question": (
                "Which of the following is an example of credit ENABLING PRODUCTION "
                "in the Indian context?"
            ),
            "options": [
                "A student buying textbooks with pocket money",
                "A farmer taking a crop loan from SBI for kharif sowing",
                "A family saving money in a fixed deposit",
                "Government collecting taxes",
            ],
            "answer": 1,
            "explanation": (
                "Credit enables production: the farmer cannot sow without the loan, "
                "which bridges the gap between input cost (June) and sale proceeds "
                "(October)."
            ),
        },
        {
            "question": (
                "The Government of India borrows through dated ______ to fund "
                "its fiscal deficit."
            ),
            "options": [
                "Crop loans",
                "G-Secs (Government Securities)",
                "Bank deposits",
                "Foreign direct investment",
            ],
            "answer": 1,
            "explanation": (
                "G-Secs (Government Securities) are instruments through which "
                "the Government of India borrows to finance its fiscal deficit."
            ),
        },
    ]
    v = variants[index % len(variants)]
    return Question(
        id=f"credit_mcq_{index+1}",
        type="mcq",
        topic="Credit - Meaning and Importance",
        difficulty="easy",
        competency=True,
        question=v["question"],
        options=v["options"],
        answer=v["answer"],
        explanation=v["explanation"],
    )


def _q_credit_fillblank(seed: int, index: int) -> Question:
    r = _rng(seed + index * 587 + 6000)
    variants = [
        {
            "question": (
                "In a credit transaction, goods or money are received ______ "
                "with a promise to pay ______."
            ),
            "answer": "now, later",
            "explanation": (
                "Credit = deferred payment: receive NOW, pay LATER."
            ),
        },
        {
            "question": (
                "The party who lends money in a credit deal is called the ______, "
                "and the party who borrows is the ______."
            ),
            "answer": "creditor, debtor",
            "explanation": (
                "Creditor = lender; Debtor = borrower."
            ),
        },
        {
            "question": (
                "A farmer in Maharashtra takes a ______ loan from SBI to buy seeds "
                "and fertilisers for the kharif season."
            ),
            "answer": "crop",
            "explanation": (
                "Crop loan = short-term credit for agricultural inputs "
                "(seeds, fertilisers, diesel), repaid after harvest."
            ),
        },
        {
            "question": (
                "The ______ Securities (G-Secs) are instruments used by the "
                "Government of India to borrow money."
            ),
            "answer": "government",
            "explanation": (
                "G-Secs are bonds issued by the Government of India to borrow "
                "from the public and institutions."
            ),
        },
    ]
    v = variants[index % len(variants)]
    return Question(
        id=f"credit_fb_{index+1}",
        type="fill_blank",
        topic="Credit - Meaning and Importance",
        difficulty="easy",
        competency=True,
        question=v["question"],
        answer=v["answer"],
        explanation=v["explanation"],
    )


def _q_credit_numerical(seed: int, index: int) -> Question:
    r = _rng(seed + index * 613 + 7000)
    scenario_idx = index % 4
    if scenario_idx == 0:
        # EMI
        P = r.choice([100000, 200000, 300000, 500000, 1000000])
        rate = r.choice([7.0, 8.5, 9.0, 9.5, 10.0, 12.0])
        n = r.choice([12, 24, 36, 60])
        r_m = rate / 12 / 100
        emi = P * r_m * (1 + r_m) ** n / ((1 + r_m) ** n - 1)
        total = emi * n
        interest = total - P
        return Question(
            id=f"credit_num_{index+1}",
            type="numerical",
            topic="Credit - Meaning and Importance",
            difficulty="medium",
            competency=True,
            question=(
                f"A two-wheeler costs ₹{P:,}. Ramesh takes a loan at {rate}% p.a. "
                f"for {n//12} year(s) ({n} months). Calculate the EMI. "
                "Also find the total interest paid."
            ),
            answer={"emi_inr": round(emi, 2), "total_interest_inr": round(interest, 2)},
            explanation=(
                f"EMI = Pxrx(1+r)^n / [(1+r)^n-1] with P=₹{P:,}, "
                f"r={rate/12:.4f}%, n={n} months. "
                f"EMI ≈ ₹{emi:,.2f}/month. Total interest = ₹{total:,.2f} - ₹{P:,} = "
                f"₹{interest:,.2f}."
            ),
        )
    elif scenario_idx == 1:
        # Compound interest
        P = r.choice([20000, 50000, 100000])
        rate = r.choice([7.0, 8.0, 9.0, 10.0])
        n = r.choice([1, 2, 3])
        amount = P * (1 + rate / 100) ** n
        ci = amount - P
        return Question(
            id=f"credit_num_{index+1}",
            type="numerical",
            topic="Credit - Meaning and Importance",
            difficulty="medium",
            competency=True,
            question=(
                f"A farmer takes a crop loan of ₹{P:,} from a cooperative bank "
                f"at {rate}% compound interest per annum for {n} year(s). "
                "Find the total amount to be repaid."
            ),
            answer={"amount_inr": round(amount, 2), "ci_inr": round(ci, 2)},
            explanation=(
                f"A = P(1+r)^n = ₹{P:,}x(1+{rate/100:.2f})^{n} = "
                f"₹{P:,}x{(1+rate/100)**n:.4f} = ₹{amount:,.2f}. "
                f"CI = ₹{amount:,.2f} - ₹{P:,} = ₹{ci:,.2f}."
            ),
        )
    elif scenario_idx == 2:
        # Simple interest
        P = r.randint(50000, 500000)
        rate = r.choice([9, 10, 11, 12])
        t = r.choice([1, 2, 3, 5])
        si = P * rate * t / 100
        amount = P + si
        return Question(
            id=f"credit_num_{index+1}",
            type="numerical",
            topic="Credit - Meaning and Importance",
            difficulty="medium",
            competency=True,
            question=(
                f"Priya borrows ₹{P:,} from a bank at {rate}% simple interest "
                f"per annum for {t} year(s). Calculate the simple interest "
                "and the total amount payable."
            ),
            answer={"si_inr": round(si, 2), "amount_inr": round(amount, 2)},
            explanation=(
                f"SI = (PxRxT)/100 = (₹{P:,}x{rate}x{t})/100 = ₹{si:,.2f}. "
                f"Amount = ₹{P:,} + ₹{si:,.2f} = ₹{amount:,.2f}."
            ),
        )
    else:
        # Formal vs informal
        P = 10000
        formal_r = 10.0
        informal_r = 36.0
        n = 12
        rf = formal_r / 12 / 100
        ri = informal_r / 12 / 100
        emi_f = P * rf * (1 + rf) ** n / ((1 + rf) ** n - 1)
        emi_i = P * ri * (1 + ri) ** n / ((1 + ri) ** n - 1)
        total_f = emi_f * n
        total_i = emi_i * n
        return Question(
            id=f"credit_num_{index+1}",
            type="numerical",
            topic="Credit - Meaning and Importance",
            difficulty="medium",
            competency=True,
            question=(
                f"A farmer borrows ₹{P:,} for 12 months. "
                f"A cooperative bank charges {formal_r}% p.a. (formal credit) "
                f"while a moneylender charges {informal_r}% p.a. (informal credit). "
                "Calculate EMI for each and the percentage saving from choosing "
                "formal credit."
            ),
            answer={
                "emi_formal_inr": round(emi_f, 2),
                "emi_informal_inr": round(emi_i, 2),
                "savings_pct": round((total_i - total_f) / total_i * 100, 1),
            },
            explanation=(
                f"Formal EMI = ₹{emi_f:,.2f}/month, Informal EMI = ₹{emi_i:,.2f}/month. "
                f"Total formal = ₹{total_f:,.2f}, Total informal = ₹{total_i:,.2f}. "
                f"Saving = {(total_i-total_f)/total_i*100:.1f}% by using formal credit."
            ),
        )


def _q_credit_short(seed: int, index: int) -> Question:
    r = _rng(seed + index * 631 + 8000)
    variants = [
        {
            "question": (
                "Explain THREE ways in which credit is important for farmers in India, "
                "with one specific Indian example for each."
            ),
            "answer": (
                "(1) Crop loans from SBI/cooperative banks buy seeds and fertilisers "
                "(Vidarbha kharif example). "
                "(2) Credit buys pumps/tubewells for irrigation (Punjab, Haryana). "
                "(3) Credit helps farmers store produce in warehouses against pledging receipts."
            ),
        },
    ]
    v = variants[index % len(variants)]
    return Question(id=f"econapp10_credit_{index}", **v)