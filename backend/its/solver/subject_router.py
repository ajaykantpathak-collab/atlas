"""subject_router.py -- identify subject from units + intent words.

Replaces the old classify() function which used regex heuristics.
This uses the unit_registry to detect physical dimensions in the
text, then maps dimensions to subjects. Intent words provide
confirmation and disambiguation.

The result is a subject tag that narrows the formula pool from
220+ to 10-30 relevant formulas.
"""
from __future__ import annotations

import re
from typing import List, Optional, Set, Tuple

from backend.its.solver.unit_registry import dimensions_of


# --------------------------------------------------------------------------- #
# Dimension -> subject mapping
# --------------------------------------------------------------------------- #

# Dimensions that uniquely identify a subject
_PHYSICS_DIMS = {
    "voltage", "current", "resistance", "capacitance", "magnetic",
    "force", "energy", "frequency", "pressure", "density", "power",
    "speed", "charge", "dioptricpower",
}

_CHEMISTRY_DIMS = {
    "amount", "concentration", "molarmass",
}

_COMMERCE_DIMS = {
    "money",
}

# Dimensions shared across subjects (length, time, mass, area,
# volume, temperature, angle, percentage, dimensionless) are NOT
# subject-specific -- they appear in physics, chemistry, and maths.


# --------------------------------------------------------------------------- #
# Intent word -> subject mapping
# --------------------------------------------------------------------------- #

_INTENT_PHYSICS = re.compile(
    r"\b(velocity|acceleration|force|momentum|impulse|torque|"
    r"electric\s+field|magnetic\s+field|resistance|capacitance|"
    r"circuit|lens|mirror|focal\s+length|magnification|"
    r"wavelength|frequency|refraction|reflection|"
    r"half\s+life|radioactive|nuclear|photon|"
    r"kinetic|potential\s+energy|work|power|"
    r"pressure|density|buoyan|viscos|"
    r"thermometer|heat|temperature|"
    r"current|voltage|ohm|ampere|volt|watt|"
    r"displacement|amplitude|period|oscillation|"
    r"projectile|trajectory|"
    r"gravitation|gravity|"
    r"emf|inductance|"
    r"bohr|photoelectric|de\s+broglie|"
    r"snell|critical\s+angle|prism|"
    r"resistivity|conductivity|"
    r" Wheatstone|kirchhoff)\b", re.I)

_INTENT_CHEMISTRY = re.compile(
    r"\b(pH|pOH|molarity|molality|mole|stoichiometr|"
    r"concentration|dilut|solution|acid|base|"
    r"oxidation|reduction|redox|"
    r"electrolysis|faraday|electrode|"
    r"equilibrium|le\s+chatelier|"
    r"kinetics|rate\s+constant|arrhenius|"
    r"entropy|enthalpy|gibbs|"
    r"catalyst|activation\s+energy|"
    r"empirical|molecular\s+formula|"
    r"limiting\s+reagent|excess|"
    r"buffer|hydrolysis|salt\s+of|"
    r"molar\s+mass|atomic\s+mass|"
    r"mole\s+fraction|mass\s+percent|"
    r"ideal\s+gas|STP|standard\s+temperature)\b", re.I)

_INTENT_COMMERCE = re.compile(
    r"\b(profit|loss|discount|markup|marked\s+price|cost\s+price|"
    r"selling\s+price|list\s+price|"
    r"depreciation|salvage|book\s+value|"
    r"GST|tax|VAT|"
    r"interest|simple\s+interest|compound\s+interest|"
    r"principal|amount|rate\s+of\s+interest|"
    r"annuity|EMI|installment|"
    r"partnership|capital|drawings|"
    r"current\s+ratio|liquid\s+ratio|"
    r"cash\s+flow|fund\s+flow|"
    r"break[-\s]even|BEP|"
    r"EOQ|economic\s+order|"
    r"working\s+capital|"
    r"net\s+worth|net\s+profit|gross\s+profit|"
    r"return\s+on\s+investment|ROI|"
    r"closing\s+capital|opening\s+capital|"
    r"NNPfc|budget\s+deficit|"
    r"share|dividend|debenture|"
    r"trial\s+balance|ledger|journal|"
    r"final\s+accounts|balance\s+sheet|"
    r"trading\s+account|profit\s+and\s+loss\s+account)\b", re.I)

_INTENT_MATHS = re.compile(
    r"\b(solve|simplify|factor|expand|find\s+x|find\s+the\s+value|"
    r"evaluate|calculate|compute|determine|"
    r"derivative|integral|differentiate|integrate|"
    r"limit|continuity|"
    r"matrix|determinant|transpose|inverse\s+of\s+matrix|"
    r"vector|cross\s+product|dot\s+product|"
    r"probability|permutation|combination|"
    r"binomial|poisson|normal\s+distribution|"
    r"AP|GP|arithmetic\s+progression|geometric\s+progression|"
    r"sequence|series|"
    r"polynomial|quadratic|cubic|linear\s+equation|"
    r"trigonometr|sin|cos|tan|cosec|sec|cot|"
    r"coordinate|slope|intercept|"
    r"area\s+of\s+triangle|area\s+of\s+circle|area\s+of\s+rectangle|"
    r"perimeter|circumference|"
    r"volume\s+of|surface\s+area|"
    r"mean|median|mode|standard\s+deviation|variance|"
    r"HCF|LCM|"
    r"logarithm|log\b|exponential|"
    r"complex\s+number|real\s+part|imaginary\s+part|"
    r"conic|parabola|ellipse|hyperbola|circle)\b", re.I)


# --------------------------------------------------------------------------- #
# Subject identification
# --------------------------------------------------------------------------- #

SUBJECTS = ("maths", "physics", "chemistry", "commerce")


def identify_subject(text: str) -> Tuple[str, float, Set[str]]:
    """Identify the subject of a question.

    Returns (subject, confidence, detected_dimensions).
    Confidence is 0..1 based on how many signals agree.

    Uses intent words as PRIMARY signal and dimensions as
    CONFIRMATION. This avoids false positives from ambiguous
    units like "m" (metre vs molar).
    """
    if not text:
        return "maths", 0.0, set()

    # 1. Extract dimensions from units in the text (inclusive)
    all_dims = dimensions_of(text)

    # 2. Check intent-word signals (PRIMARY)
    has_physics_intent = bool(_INTENT_PHYSICS.search(text))
    has_chemistry_intent = bool(_INTENT_CHEMISTRY.search(text))
    has_commerce_intent = bool(_INTENT_COMMERCE.search(text))
    has_maths_intent = bool(_INTENT_MATHS.search(text))

    # 3. Check dimension-based subject signals (CONFIRMATION only)
    # Only count a dimension as subject-specific if it is NOT
    # ambiguous. "m" can be metre or molar, so "concentration" from
    # "m" alone is not enough to identify chemistry.
    physics_dims = all_dims & _PHYSICS_DIMS
    chemistry_dims = all_dims & _CHEMISTRY_DIMS
    commerce_dims = all_dims & _COMMERCE_DIMS

    # 4. Score each subject -- intent words are primary
    scores = {"maths": 0.0, "physics": 0.0,
              "chemistry": 0.0, "commerce": 0.0}

    # Intent signals (primary, stronger weight)
    if has_physics_intent:
        scores["physics"] += 0.5
    if has_chemistry_intent:
        scores["chemistry"] += 0.5
    if has_commerce_intent:
        scores["commerce"] += 0.5
    if has_maths_intent:
        scores["maths"] += 0.4

    # Dimension signals (confirmation, only when intent agrees)
    if physics_dims and has_physics_intent:
        scores["physics"] += 0.3
    if chemistry_dims and has_chemistry_intent:
        scores["chemistry"] += 0.3
    if commerce_dims and (has_commerce_intent or not has_maths_intent):
        scores["commerce"] += 0.3

    # Standalone dimension signals (weaker, only for clear cases)
    # Only commerce dims (money) are unambiguous enough to stand alone
    if commerce_dims and not has_maths_intent:
        scores["commerce"] += 0.4

    # If no specific signals, default to maths
    if max(scores.values()) == 0:
        scores["maths"] = 0.3

    # Pick the winner
    subject = max(scores, key=scores.get)
    confidence = min(scores[subject], 1.0)

    # Commerce-maths overlap: if both have signals, prefer commerce
    # for money-related questions (profit/loss/interest)
    if scores["commerce"] > 0 and scores["maths"] > 0:
        if has_commerce_intent and commerce_dims:
            subject = "commerce"
            confidence = max(scores["commerce"], 0.7)

    return subject, confidence, all_dims


def get_formula_pool(subject: str) -> List[str]:
    """Return the list of formula IDs for a subject.

    This is populated by the formula_registry as formulas are
    registered. Returns empty list if no formulas registered yet.
    """
    from backend.its.solver.formula_registry import get_formulas_by_subject
    return get_formulas_by_subject(subject)
