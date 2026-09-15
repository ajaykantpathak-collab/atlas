"""
formula_selector.py — Layer 4a (B6): Select correct formula(s) from the KB.

Deterministic. No LLM. Dimensional analysis + variable matching.

Algorithm (per Fable design B6):
  1) Filter formulas by target variable dimensionality
  2) Check which variables are available (explicit + implicit)
  3) Check precondition satisfaction
  4) Score by (known_vars_match / total_vars) — highest score wins

Author: Platform Backend Team
"""

from __future__ import annotations

import re
import logging
from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional

import yaml

from .stem_problem import STEMProblem, Quantity, Target


logger = logging.getLogger(__name__)


# ──────────────────────────────────────────────────────────────────────────────
# Dimensional analysis helpers
# ──────────────────────────────────────────────────────────────────────────────

# Map quantity_type → dimensional formula (base SI dimensions)
# Dimensions: M (mass), L (length), T (time), I (current), theta (temp)
QTYPE_TO_DIM = {
    "mass":          {"M": 1},
    "length":        {"L": 1},
    "time":          {"T": 1},
    "velocity":      {"L": 1, "T": -1},
    "acceleration":  {"L": 1, "T": -2},
    "force":         {"M": 1, "L": 1, "T": -2},
    "energy":        {"M": 1, "L": 2, "T": -2},
    "power":         {"M": 1, "L": 2, "T": -3},
    "pressure":      {"M": 1, "L": -1, "T": -2},
    "temperature":   {"theta": 1},
    "current":       {"I": 1},
    "voltage":       {"M": 1, "L": 2, "T": -3, "I": -1},
    "resistance":    {"M": 1, "L": 2, "T": -3, "I": -2},
    "charge":        {"I": 1, "T": 1},
    "frequency":     {"T": -1},
    "area":          {"L": 2},
    "volume":        {"L": 3},
    "angle":         {},  # dimensionless
    "concentration": {"M": 1, "L": -3},
    "density":       {"M": 1, "L": -3},
    "amount":        {"M": 1},
    "scalar":        {},  # dimensionless
}

# Map unit string → dimensional formula (for fallback when quantity_type is unknown)
UNIT_TO_DIM = {
    "kg": {"M": 1}, "g": {"M": 1}, "mg": {"M": 1},
    "m": {"L": 1}, "cm": {"L": 1}, "mm": {"L": 1}, "km": {"L": 1},
    "s": {"T": 1}, "min": {"T": 1}, "h": {"T": 1},
    "m/s": {"L": 1, "T": -1}, "km/h": {"L": 1, "T": -1},
    "m/s^2": {"L": 1, "T": -2},
    "N": {"M": 1, "L": 1, "T": -2},
    "J": {"M": 1, "L": 2, "T": -2}, "kJ": {"M": 1, "L": 2, "T": -2},
    "W": {"M": 1, "L": 2, "T": -3}, "kW": {"M": 1, "L": 2, "T": -3},
    "Pa": {"M": 1, "L": -1, "T": -2}, "atm": {"M": 1, "L": -1, "T": -2},
    "K": {"theta": 1}, "degC": {"theta": 1}, "degF": {"theta": 1},
    "A": {"I": 1},
    "V": {"M": 1, "L": 2, "T": -3, "I": -1},
    "ohm": {"M": 1, "L": 2, "T": -3, "I": -2},
    "C": {"I": 1, "T": 1},
    "Hz": {"T": -1},
    "m^2": {"L": 2}, "cm^2": {"L": 2},
    "m^3": {"L": 3}, "cm^3": {"L": 3}, "L": {"L": 3}, "mL": {"L": 3},
    "deg": {}, "rad": {},
    "mol/L": {"M": 1, "L": -3},
    "kg/m^3": {"M": 1, "L": -3},
    "mol": {"M": 1},
}


def get_dimension(quantity: Quantity) -> dict[str, int]:
    """Get dimensional formula for a quantity."""
    # Try quantity type first (stored in metadata or name)
    qty_type = getattr(quantity, "quantity_type", None)
    if not qty_type:
        # Try to infer from name
        name_map = {
            "mass": "mass", "length": "length", "distance": "length",
            "height": "length", "radius": "length", "time": "time",
            "velocity": "velocity", "speed": "velocity",
            "acceleration": "acceleration", "force": "force",
            "energy": "energy", "work": "energy", "power": "power",
            "pressure": "pressure", "temperature": "temperature",
            "current": "current", "voltage": "voltage",
            "resistance": "resistance", "charge": "charge",
            "frequency": "frequency", "area": "area", "volume": "volume",
            "angle": "angle", "concentration": "concentration",
            "density": "density", "amount": "amount",
        }
        qty_type = name_map.get(quantity.name.lower())

    if qty_type and qty_type in QTYPE_TO_DIM:
        return dict(QTYPE_TO_DIM[qty_type])

    # Fallback: infer from unit
    if quantity.unit:
        unit_clean = quantity.unit.strip()
        if unit_clean in UNIT_TO_DIM:
            return dict(UNIT_TO_DIM[unit_clean])

    return {}


def dims_match(d1: dict[str, int], d2: dict[str, int]) -> bool:
    """Check if two dimensional formulas are equivalent."""
    if not d1 and not d2:
        return True
    if not d1 or not d2:
        return False
    all_keys = set(d1.keys()) | set(d2.keys())
    for k in all_keys:
        if d1.get(k, 0) != d2.get(k, 0):
            return False
    return True


# ──────────────────────────────────────────────────────────────────────────────
# Formula KB entry
# ──────────────────────────────────────────────────────────────────────────────

@dataclass
class FormulaEntry:
    """One formula from the KB."""
    formula_id: str
    name: str
    latex: str
    variables: list[dict]        # [{symbol, name, unit, quantity_type, dimensional_formula}]
    preconditions: list[str]
    concept_tags: list[str]
    chapter: str
    subject: str
    grade_range: list[str]
    solve_order_priority: int = 1
    related_formulas: list[str] = field(default_factory=list)
    source_file: str = ""

    @property
    def variable_symbols(self) -> list[str]:
        return [v.get("symbol", "") for v in self.variables]

    @property
    def variable_count(self) -> int:
        return len(self.variables)

    def to_dict(self) -> dict:
        return {
            "formula_id": self.formula_id,
            "name": self.name,
            "latex": self.latex,
            "variables": self.variables,
            "preconditions": self.preconditions,
            "concept_tags": self.concept_tags,
            "chapter": self.chapter,
            "subject": self.subject,
            "solve_order_priority": self.solve_order_priority,
        }


@dataclass
class FormulaMatch:
    """A formula matched to a problem, with a score."""
    formula: FormulaEntry
    score: float                  # 0.0 - 1.0
    known_vars: list[str]
    missing_vars: list[str]
    target_matches: bool

    def to_dict(self) -> dict:
        return {
            "formula_id": self.formula.formula_id,
            "name": self.formula.name,
            "latex": self.formula.latex,
            "score": self.score,
            "known_vars": self.known_vars,
            "missing_vars": self.missing_vars,
            "target_matches": self.target_matches,
        }


# ──────────────────────────────────────────────────────────────────────────────
# Formula KB — loads all YAML files
# ──────────────────────────────────────────────────────────────────────────────

class FormulaKB:
    """Loads and indexes all formula YAML files."""

    def __init__(self, formulas_path: str = None):
        if formulas_path is None:
            formulas_path = str(Path(__file__).parent.parent / "formulas")
        self.formulas_path = formulas_path
        self.formulas: list[FormulaEntry] = []
        self.by_id: dict[str, FormulaEntry] = {}
        self.by_subject: dict[str, list[FormulaEntry]] = {}
        self.by_concept: dict[str, list[FormulaEntry]] = {}
        self._load()

    def _load(self) -> None:
        """Load all YAML formula files."""
        formulas_dir = Path(self.formulas_path)
        if not formulas_dir.exists():
            logger.warning(f"Formulas directory not found: {formulas_dir}")
            return

        for yaml_file in formulas_dir.rglob("*.yaml"):
            try:
                data = yaml.safe_load(yaml_file.read_text(encoding="utf-8"))
                if not data:
                    continue

                # Files contain a list of formula entries
                entries = data if isinstance(data, list) else data.get("formulas", [])

                for entry in entries:
                    if not isinstance(entry, dict):
                        continue

                    formula_id = entry.get("formula_id") or entry.get("id") or ""
                    if not formula_id:
                        continue

                    # Normalize variable entries
                    variables = entry.get("variables", [])
                    if not isinstance(variables, list):
                        variables = []

                    formula = FormulaEntry(
                        formula_id=formula_id,
                        name=entry.get("name", ""),
                        latex=entry.get("latex", entry.get("formula", "")),
                        variables=variables,
                        preconditions=entry.get("preconditions", []),
                        concept_tags=entry.get("concept_tags", []),
                        chapter=entry.get("chapter", ""),
                        subject=entry.get("subject", ""),
                        grade_range=entry.get("grade_range", []),
                        solve_order_priority=entry.get("solve_order_priority", 1),
                        related_formulas=entry.get("related_formulas", []),
                        source_file=str(yaml_file),
                    )

                    self.formulas.append(formula)
                    self.by_id[formula_id] = formula

                    subj = formula.subject
                    if subj:
                        self.by_subject.setdefault(subj, []).append(formula)

                    for tag in formula.concept_tags:
                        self.by_concept.setdefault(tag, []).append(formula)

            except Exception as e:
                logger.debug(f"Failed to load {yaml_file}: {e}")

        logger.info(f"FormulaKB loaded: {len(self.formulas)} formulas from {formulas_dir}")

    def get(self, formula_id: str) -> Optional[FormulaEntry]:
        return self.by_id.get(formula_id)

    def by_concept_tags(self, tags: list[str]) -> list[FormulaEntry]:
        """Get formulas matching any of the given concept tags."""
        result = []
        seen = set()
        for tag in tags:
            for f in self.by_concept.get(tag, []):
                if f.formula_id not in seen:
                    result.append(f)
                    seen.add(f.formula_id)
        return result


# ──────────────────────────────────────────────────────────────────────────────
# Formula Selector
# ──────────────────────────────────────────────────────────────────────────────

class FormulaSelector:
    """Layer 4a (B6): Select the best formula(s) for a problem."""

    def __init__(self, kb: FormulaKB = None):
        self.kb = kb or FormulaKB()

    def select(
        self,
        problem: STEMProblem,
        max_results: int = 5,
        min_score: float = 0.3,
    ) -> list[FormulaMatch]:
        """Select the best formula(s) for the given problem.

        Algorithm:
          1) Filter by concept tags (if any match)
          2) Filter by target variable dimensionality
          3) Score by known variable coverage
          4) Sort by score, then by solve_order_priority
        """
        known_symbols = set(problem.known_quantities.keys())
        if problem.target:
            known_symbols.discard(problem.target.symbol)

        target = problem.target
        target_dim = None
        if target:
            # Build a temporary Quantity to get dimensions
            target_qty = Quantity(symbol=target.symbol, name=target.name, unit=target.unit)
            target_dim = get_dimension(target_qty)

        # Step 1: Get candidate formulas
        if problem.concept_tags:
            candidates = self.kb.by_concept_tags(problem.concept_tags)
        elif problem.domain:
            candidates = self.kb.by_subject.get(problem.domain, [])
        else:
            candidates = self.kb.formulas

        # If no candidates from concept/subject, try all (slow but complete)
        if not candidates:
            candidates = self.kb.formulas

        matches: list[FormulaMatch] = []

        for formula in candidates:
            # Skip formulas with no variables (constants, definitions)
            if formula.variable_count == 0:
                continue

            formula_vars = formula.variable_symbols
            formula_var_set = set(formula_vars)

            # Step 2: Check if target is among the formula's variables
            target_matches = False
            if target:
                if target.symbol in formula_var_set:
                    target_matches = True
                else:
                    # Check by dimensionality
                    if target_dim:
                        for v in formula.variables:
                            v_dim_raw = v.get("dimensional_formula")
                            v_qty_type = v.get("quantity_type", "")
                            v_dim = None
                            if v_qty_type and v_qty_type in QTYPE_TO_DIM:
                                v_dim = dict(QTYPE_TO_DIM[v_qty_type])
                            elif v_dim_raw and isinstance(v_dim_raw, list):
                                # Parse ["L", "T", -1] format
                                v_dim = self._parse_dim_list(v_dim_raw)

                            if v_dim and dims_match(target_dim, v_dim):
                                target_matches = True
                                break

            # Step 3: Score by variable coverage
            known_in_formula = known_symbols & formula_var_set
            unknown_in_formula = formula_var_set - known_symbols

            # If we have a target, it should be in the unknown set
            if target and target.symbol in formula_var_set:
                unknown_in_formula.discard(target.symbol)

            coverage = len(known_in_formula) / max(1, formula.variable_count)

            # Boost score if target matches
            score = coverage
            if target_matches:
                score += 0.3

            # Penalize if too many unknowns (excluding target)
            unknown_ratio = len(unknown_in_formula) / max(1, formula.variable_count)
            score -= unknown_ratio * 0.2

            # Clamp
            score = max(0.0, min(1.0, score))

            if score >= min_score:
                matches.append(FormulaMatch(
                    formula=formula,
                    score=score,
                    known_vars=sorted(known_in_formula),
                    missing_vars=sorted(unknown_in_formula),
                    target_matches=target_matches,
                ))

        # Sort by score (desc), then by solve_order_priority (asc)
        matches.sort(key=lambda m: (-m.score, m.formula.solve_order_priority))

        return matches[:max_results]

    def _parse_dim_list(self, dim_list: list) -> dict[str, int]:
        """Parse dimensional formula from list format like ["L", "T", -1]."""
        result = {}
        i = 0
        while i < len(dim_list):
            if isinstance(dim_list[i], str) and dim_list[i].isalpha():
                dim_name = dim_list[i]
                # Check if next element is a number (exponent)
                if i + 1 < len(dim_list) and isinstance(dim_list[i + 1], (int, float)):
                    result[dim_name] = int(dim_list[i + 1])
                    i += 2
                else:
                    result[dim_name] = 1
                    i += 1
            else:
                i += 1
        return result


# Singleton
_kb = None
_selector = None


def get_kb() -> FormulaKB:
    global _kb
    if _kb is None:
        _kb = FormulaKB()
    return _kb


def get_selector() -> FormulaSelector:
    global _selector
    if _selector is None:
        _selector = FormulaSelector(get_kb())
    return _selector


def select_formulas(problem: STEMProblem, max_results: int = 5) -> list[FormulaMatch]:
    """Convenience function."""
    return get_selector().select(problem, max_results=max_results)
