"""Competency thinking questions for solver v2 step types.

Each solver category has associated diagnostic/thinking questions that
test conceptual understanding beyond mechanical computation. These
questions are derived from enrichment diagnostic_questions and are
used by the Socratic pipeline for remediation.

Question types:
  - conceptual: "Why does...?" "What happens when...?"
  - procedural: "What is the first step to...?"
  - application: "If you change X, what happens to Y?"
  - misconception_check: "A student says X. Is this correct? Why?"

Usage:
    from backend.services.competency_questions_v2 import get_questions

    questions = get_questions("phy_optics")
    # Returns list of {question, type, expected_concepts, common_misconceptions}
"""

from dataclasses import dataclass, field
from typing import Optional


@dataclass
class CompetencyQuestion:
    """A competency thinking question for a solver category."""
    question: str
    question_type: str          # conceptual, procedural, application, misconception_check
    expected_concepts: list     # Key concepts the answer should mention
    common_misconceptions: list # Common wrong answers to watch for
    difficulty: str = "medium"  # easy, medium, hard


# ---------------------------------------------------------------------------
# Competency questions per category
# ---------------------------------------------------------------------------

COMPETENCY_QUESTIONS = {
    # ── Physics ── #
    "phy_optics": [
        CompetencyQuestion(
            question="Why does a convex lens produce a real image when the object is beyond the focal point, but a virtual image when it is within the focal point?",
            question_type="conceptual",
            expected_concepts=["refraction", "converging", "focal point", "real image", "virtual image"],
            common_misconceptions=["Convex lens always produces real images", "Virtual images are always magnified"],
        ),
        CompetencyQuestion(
            question="A student says 'a concave mirror always produces a real image.' Is this correct? Explain.",
            question_type="misconception_check",
            expected_concepts=["concave mirror", "focal point", "virtual image", "object position"],
            common_misconceptions=["Concave mirrors always produce real images", "Only convex mirrors produce virtual images"],
        ),
        CompetencyQuestion(
            question="If you move an object closer to a convex lens (but keep it beyond f), what happens to the image size and position?",
            question_type="application",
            expected_concepts=["magnification", "image distance", "inverse relationship"],
            common_misconceptions=["Image gets smaller as object approaches lens", "Image position doesn't change"],
        ),
    ],
    "phy_magnetism": [
        CompetencyQuestion(
            question="Why does a charged particle moving parallel to a magnetic field experience no force, while one moving perpendicular experiences maximum force?",
            question_type="conceptual",
            expected_concepts=["Lorentz force", "sin(theta)", "parallel", "perpendicular", "cross product"],
            common_misconceptions=["Magnetic field always exerts force on charges", "Force is independent of angle"],
        ),
        CompetencyQuestion(
            question="What determines the direction of the Lorentz force on a moving charge?",
            question_type="conceptual",
            expected_concepts=["right-hand rule", "cross product", "v × B", "charge sign"],
            common_misconceptions=["Force is in the direction of B", "Force is in the direction of v"],
        ),
    ],
    "phy_waves": [
        CompetencyQuestion(
            question="If the frequency of a wave doubles while the medium remains the same, what happens to the wavelength?",
            question_type="application",
            expected_concepts=["v = fλ", "inversely proportional", "wave speed constant"],
            common_misconceptions=["Wavelength also doubles", "Wave speed changes"],
        ),
        CompetencyQuestion(
            question="Explain why sound waves cannot travel through a vacuum but light waves can.",
            question_type="conceptual",
            expected_concepts=["mechanical wave", "electromagnetic wave", "medium", "vacuum"],
            common_misconceptions=["Light needs a medium to travel", "Sound can travel in vacuum"],
        ),
    ],
    "phy_gravitation": [
        CompetencyQuestion(
            question="Why do astronauts feel weightless in the International Space Station even though gravity is acting on them?",
            question_type="conceptual",
            expected_concepts=["free fall", "orbit", "gravity", "weightlessness", "normal force"],
            common_misconceptions=["There is no gravity in space", "Astronauts are too far from Earth for gravity"],
        ),
        CompetencyQuestion(
            question="If the distance between two masses is tripled, how does the gravitational force change?",
            question_type="application",
            expected_concepts=["inverse square law", "F = Gm₁m₂/r²", "1/9"],
            common_misconceptions=["Force becomes 1/3", "Force becomes 3 times"],
        ),
    ],
    "phy_momentum": [
        CompetencyQuestion(
            question="In an inelastic collision, kinetic energy is not conserved but momentum is. Why?",
            question_type="conceptual",
            expected_concepts=["conservation of momentum", "kinetic energy loss", "heat/deformation", "inelastic"],
            common_misconceptions=["Both energy and momentum are always conserved", "Momentum is not conserved in inelastic collisions"],
        ),
        CompetencyQuestion(
            question="A truck and a car have the same momentum. Which has more kinetic energy?",
            question_type="application",
            expected_concepts=["p = mv", "KE = p²/2m", "lighter object has more KE"],
            common_misconceptions=["The truck has more KE because it's heavier", "Both have the same KE"],
        ),
    ],
    "phy_circular_motion": [
        CompetencyQuestion(
            question="Why is the centripetal force not a new type of force, but rather a role played by existing forces?",
            question_type="conceptual",
            expected_concepts=["centripetal", "net force", "tension", "gravity", "friction"],
            common_misconceptions=["Centripetal force is a separate fundamental force", "Centrifugal force pushes objects outward"],
        ),
        CompetencyQuestion(
            question="What happens to the centripetal force if the speed of an object in circular motion doubles?",
            question_type="application",
            expected_concepts=["F = mv²/r", "quadruples", "4 times"],
            common_misconceptions=["Force doubles", "Force halves"],
        ),
    ],
    "phy_thermodynamics": [
        CompetencyQuestion(
            question="Why does a large body of water not change temperature much even when it absorbs a lot of heat?",
            question_type="conceptual",
            expected_concepts=["specific heat capacity", "water", "Q = mcΔT", "high c"],
            common_misconceptions=["All substances heat up at the same rate", "Water has low specific heat"],
        ),
        CompetencyQuestion(
            question="During melting, temperature remains constant even though heat is being added. Why?",
            question_type="conceptual",
            expected_concepts=["latent heat", "phase change", "breaking bonds", "Q = mL"],
            common_misconceptions=["Temperature always increases when heat is added", "No heat is absorbed during melting"],
        ),
    ],

    # ── Chemistry ── #
    "chem_stoichiometry": [
        CompetencyQuestion(
            question="Why must a chemical equation be balanced before solving stoichiometry problems?",
            question_type="conceptual",
            expected_concepts=["conservation of mass", "mole ratios", "coefficients"],
            common_misconceptions=["Balancing is optional", "Only products need to be balanced"],
        ),
        CompetencyQuestion(
            question="If you have 2 moles of H₂ and 1 mole of O₂, which is the limiting reagent in the reaction 2H₂ + O₂ → 2H₂O?",
            question_type="application",
            expected_concepts=["limiting reagent", "mole ratio", "2:1 ratio", "neither (stoichiometric)"],
            common_misconceptions=["O₂ is limiting because there's less of it", "H₂ is limiting"],
        ),
    ],
    "chem_redox": [
        CompetencyQuestion(
            question="In a redox reaction, what happens to the oxidation number of the species being oxidized?",
            question_type="conceptual",
            expected_concepts=["oxidation", "increase", "loss of electrons", "oxidation number"],
            common_misconceptions=["Oxidation number decreases during oxidation", "Oxidation involves gaining electrons"],
        ),
        CompetencyQuestion(
            question="Can a substance be both oxidized and reduced in the same reaction? Give an example.",
            question_type="conceptual",
            expected_concepts=["disproportionation", "same species", "both oxidation and reduction"],
            common_misconceptions=["A substance can only be oxidized or reduced, not both"],
        ),
    ],
    "chem_molar_mass": [
        CompetencyQuestion(
            question="Why is the molar mass of a compound the sum of the atomic masses of its constituent atoms?",
            question_type="conceptual",
            expected_concepts=["mole", "Avogadro's number", "atomic mass", "conservation"],
            common_misconceptions=["Molar mass is the mass of one molecule", "Molar mass depends on temperature"],
        ),
    ],
    "chem_empirical": [
        CompetencyQuestion(
            question="What is the difference between an empirical formula and a molecular formula? Can you give an example?",
            question_type="conceptual",
            expected_concepts=["simplest ratio", "actual number of atoms", "CH vs C₂H₄", "molar mass"],
            common_misconceptions=["Empirical and molecular formulas are always the same", "Empirical formula shows the actual number of atoms"],
        ),
        CompetencyQuestion(
            question="A compound has empirical formula CH₂O and molar mass 180. What is its molecular formula?",
            question_type="application",
            expected_concepts=["empirical mass", "ratio", "C₆H₁₂O₆", "glucose"],
            common_misconceptions=["Molecular formula is the same as empirical", "Cannot determine without more information"],
        ),
    ],

    # ── Accounts ── #
    "acc_journal": [
        CompetencyQuestion(
            question="Why does every journal entry have equal debits and credits?",
            question_type="conceptual",
            expected_concepts=["double-entry system", "accounting equation", "Assets = Liabilities + Capital"],
            common_misconceptions=["Debits and credits can be unequal", "Only assets need to balance"],
        ),
        CompetencyQuestion(
            question="When a business purchases furniture for cash, which account is debited and which is credited?",
            question_type="application",
            expected_concepts=["debit furniture", "credit cash", "asset exchange"],
            common_misconceptions=["Credit furniture because it's an expense", "Debit cash because it's going out"],
        ),
    ],
    "acc_depreciation": [
        CompetencyQuestion(
            question="Why does the Straight Line Method charge equal depreciation every year while WDV charges more in earlier years?",
            question_type="conceptual",
            expected_concepts=["SLM", "WDV", "fixed amount", "percentage", "book value decreases"],
            common_misconceptions=["Both methods charge the same total depreciation", "WDV charges less in earlier years"],
        ),
        CompetencyQuestion(
            question="A machine costs ₹50,000 with salvage value ₹5,000 and useful life 10 years. What is the annual depreciation under SLM?",
            question_type="application",
            expected_concepts=["(cost - salvage) / life", "₹4,500 per year"],
            common_misconceptions=["Depreciation = cost / life = ₹5,000", "Depreciation = salvage / life"],
        ),
    ],
    "acc_brs": [
        CompetencyQuestion(
            question="Why is a Bank Reconciliation Statement necessary? What discrepancies does it identify?",
            question_type="conceptual",
            expected_concepts=["timing differences", "errors", "unpresented cheques", "bank charges"],
            common_misconceptions=["BRS is only for finding errors", "BRS adjusts the cash book to match the bank"],
        ),
        CompetencyQuestion(
            question="If cheques issued by the business have not been presented for payment, how does this affect the BRS?",
            question_type="application",
            expected_concepts=["issued but not presented", "deduct from bank balance", "add to cash book balance"],
            common_misconceptions=["Add to bank balance", "No adjustment needed"],
        ),
    ],
    "acc_final_accounts": [
        CompetencyQuestion(
            question="What is the difference between Gross Profit and Net Profit? Where are they calculated?",
            question_type="conceptual",
            expected_concepts=["trading account", "P&L account", "direct expenses", "indirect expenses"],
            common_misconceptions=["Gross Profit and Net Profit are the same", "Net Profit is calculated in the trading account"],
        ),
        CompetencyQuestion(
            question="Why must the Balance Sheet always balance? What principle does this reflect?",
            question_type="conceptual",
            expected_concepts=["accounting equation", "Assets = Liabilities + Capital", "double-entry"],
            common_misconceptions=["Balance Sheet balancing is optional", "It balances because of depreciation"],
        ),
    ],

    # ── Applied Maths ── #
    "appmath_statistics": [
        CompetencyQuestion(
            question="When is the median a better measure of central tendency than the mean?",
            question_type="conceptual",
            expected_concepts=["outliers", "skewed data", "median robust", "mean sensitive"],
            common_misconceptions=["Mean is always better", "Median and mean are always equal"],
        ),
        CompetencyQuestion(
            question="What does standard deviation tell you about a dataset that the mean alone does not?",
            question_type="conceptual",
            expected_concepts=["spread", "dispersion", "variability", "how far from mean"],
            common_misconceptions=["Standard deviation is the same as mean", "Standard deviation measures the average value"],
        ),
    ],
    "appmath_gst": [
        CompetencyQuestion(
            question="What is the difference between CGST+SGST and IGST? When is each applied?",
            question_type="conceptual",
            expected_concepts=["intra-state", "inter-state", "CGST", "SGST", "IGST", "destination state"],
            common_misconceptions=["CGST and IGST are the same", "IGST applies to all transactions"],
        ),
        CompetencyQuestion(
            question="If a product costs ₹1000 and GST is 18%, what is the total price including GST?",
            question_type="application",
            expected_concepts=["₹1180", "GST = ₹180", "total = price + GST"],
            common_misconceptions=["Total = ₹1000 × 1.18 = ₹11800", "GST is already included in the price"],
        ),
    ],
    "appmath_annuity": [
        CompetencyQuestion(
            question="Why does the future value of an annuity increase with both the interest rate and the number of periods?",
            question_type="conceptual",
            expected_concepts=["compound interest", "time value of money", "exponential growth"],
            common_misconceptions=["FV only depends on the payment amount", "Higher interest rate decreases FV"],
        ),
        CompetencyQuestion(
            question="What is the relationship between present value and future value of an annuity?",
            question_type="conceptual",
            expected_concepts=["discounting", "PV = FV / (1+r)^n", "time value", "inverse"],
            common_misconceptions=["PV and FV are always equal", "PV is always greater than FV"],
        ),
    ],
    "appmath_regression": [
        CompetencyQuestion(
            question="What does the slope of a regression line tell you about the relationship between x and y?",
            question_type="conceptual",
            expected_concepts=["rate of change", "correlation", "positive/negative", "steepness"],
            common_misconceptions=["Slope tells you the strength of the relationship", "Slope is always between 0 and 1"],
        ),
        CompetencyQuestion(
            question="If the regression line has a slope of 0, what does this tell you about the relationship between x and y?",
            question_type="application",
            expected_concepts=["no relationship", "y doesn't change with x", "independent"],
            common_misconceptions=["Slope 0 means perfect correlation", "Slope 0 means the data is wrong"],
        ),
    ],
}


def get_questions(category: str) -> list:
    """Get competency thinking questions for a solver category.

    Args:
        category: The solver category (e.g., "phy_optics").

    Returns:
        List of CompetencyQuestion objects.
    """
    return COMPETENCY_QUESTIONS.get(category, [])


def get_all_categories() -> dict:
    """Get all categories that have competency questions.

    Returns:
        Dict mapping category to number of questions.
    """
    return {cat: len(qs) for cat, qs in COMPETENCY_QUESTIONS.items()}


def get_question_by_type(category: str, question_type: str) -> Optional[CompetencyQuestion]:
    """Get a specific type of competency question for a category.

    Args:
        category: The solver category.
        question_type: conceptual, procedural, application, or misconception_check.

    Returns:
        First matching CompetencyQuestion, or None.
    """
    for q in COMPETENCY_QUESTIONS.get(category, []):
        if q.question_type == question_type:
            return q
    return None
