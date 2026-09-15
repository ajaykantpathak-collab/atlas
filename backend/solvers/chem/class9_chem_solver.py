"""
Class 9 Chemistry — Solver Module
Nodes: c9_chem_001, c9_chem_002, c9_chem_003
Sections: Symbols of Elements | Valency & Radicals | Formulae of Compounds
"""

from __future__ import annotations
import re
import dataclasses
from typing import Optional, Tuple, List

# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

SYMBOL_DATA = {           # name → symbol
    "Hydrogen": "H", "Helium": "He", "Carbon": "C", "Nitrogen": "N",
    "Oxygen": "O", "Fluorine": "F", "Neon": "Ne", "Sodium": "Na",
    "Magnesium": "Mg", "Aluminium": "Al", "Silicon": "Si", "Phosphorus": "P",
    "Sulphur": "S", "Chlorine": "Cl", "Argon": "Ar", "Potassium": "K",
    "Calcium": "Ca", "Iron": "Fe", "Copper": "Cu", "Zinc": "Zn",
    "Bromine": "Br", "Silver": "Ag", "Gold": "Au", "Mercury": "Hg",
    "Lead": "Pb", "Tin": "Sn", "Iodine": "I", "Barium": "Ba",
}

SYMBOL_DATA_R = {v: k for k, v in SYMBOL_DATA.items()}   # symbol → name

VALENCY_DATA = {          # element name → valency
    "Hydrogen": 1, "Oxygen": 2, "Nitrogen": 3, "Carbon": 4,
    "Sodium": 1, "Magnesium": 2, "Aluminium": 3, "Calcium": 2,
    "Potassium": 1, "Iron": 3, "Copper": 2, "Zinc": 2,
    "Chlorine": 1, "Sulphur": 2, "Phosphorus": 5, "Lead": 4,
    "Tin": 4, "Silver": 1, "Gold": 3, "Mercury": 2,
    "Bromine": 1, "Iodine": 1, "Barium": 2, "Fluorine": 1,
    "Silicon": 4, "Helium": 0, "Neon": 0, "Argon": 0,
}

RADICAL_DATA = {          # radical name → (formula, valency)
    "Ammonium":  ("NH4",  1),
    "Hydroxide": ("OH",   1),
    "Nitrate":   ("NO3",  1),
    "Sulphate":  ("SO4",  2),
    "Carbonate": ("CO3",  2),
    "Nitrite":   ("NO2",  1),
    "Phosphate": ("PO4",  3),
    "Zincate":   ("ZnO2", 2),
}

# element_name → radical name if it acts as a radical (anion form)
ELEMENT_RADICAL_MAP = {
    "Oxygen":    "Oxide",     # O²⁻
    "Chlorine":  "Chloride",  # Cl⁻
    "Sulphur":   "Sulphide",  # S²⁻
    "Nitrogen":  "Nitride",   # N³⁻
    "Phosphorus":"Phosphide", # P³⁻
    "Carbon":    "Carbide",   # C⁴⁻
}

# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

class ChemistrySolver:
    """Solves Class 9 Chemistry problems for nodes 001, 002, 003."""

    # ── Node 001: Symbols of Elements ──────────────────────────────────────

    @staticmethod
    def solve_symbol_001(element_name: str) -> str:
        """
        Q1: Given element NAME → return its symbol.
        Raises ValueError if not found.
        """
        key = element_name.strip().title()
        if key not in SYMBOL_DATA:
            raise ValueError(f"Element '{element_name}' not in database.")
        return SYMBOL_DATA[key]

    @staticmethod
    def solve_name_001(symbol: str) -> str:
        """
        Q2: Given element SYMBOL → return its full name.
        """
        s = symbol.strip()
        if s not in SYMBOL_DATA_R:
            raise ValueError(f"Symbol '{symbol}' not found.")
        return SYMBOL_DATA_R[s]

    @staticmethod
    def solve_rule_001(symbol: str, rule_text: str) -> bool:
        """
        Q3: Given a SYMBOL and a RULE DESCRIPTION, return True if the symbol
        violates that IUPAC rule.

        IUPAC rules:
          R1 – First letter must be capital, second (if present) must be small.
          R2 – Two-letter symbols must have 1st capital + 2nd small (e.g. Na, not NA).
          R3 – Symbol must not be confused with common words (e.g. 'Is' is not iodine).
          R4 – No symbol uses more than two letters (except temporary system symbols).
        """
        s = symbol.strip()
        rt = rule_text.strip().upper()
        violations = []

        if len(s) == 2:
            if not (s[0].isupper() and s[1].islower()):
                violations.append("R1")   # R1 covers both 1-letter and 2-letter caps
        elif len(s) == 1:
            if not s[0].isupper():
                violations.append("R1")

        COMMON_WORDS = {"IS", "BE", "IN", "ON", "AT", "SO", "NO", "AN"}
        if s.upper() in COMMON_WORDS and len(s) == 2:
            violations.append("R3")

        if len(s) > 2:
            violations.append("R4")

        if not violations:
            return False

        rule_map = {
            "R1": ["CAPITALISATION", "CAPITALIZATION", "FIRST LETTER", "CASE", "UPPER", "LOWER"],
            "R3": ["COMMON WORD", "CONFUSION", "ENGLISH WORD", "MEANING"],
            "R4": ["TWO LETTER", "LENGTH", "MORE THAN TWO", "THREE LETTER"],
        }
        for code, keywords in rule_map.items():
            if any(kw in rt for kw in keywords):
                return code in violations
        return True

    # ── Node 002: Valency & Radicals ───────────────────────────────────────

    @staticmethod
    def solve_valency_002(element_name: str) -> int:
        """
        Q1: Given ELEMENT NAME → return its combining capacity (valency).
        """
        key = element_name.strip().title()
        if key not in VALENCY_DATA:
            raise ValueError(f"Valency data not found for '{element_name}'.")
        return VALENCY_DATA[key]

    @staticmethod
    def solve_radical_valency_002(radical_name: str) -> Tuple[str, int]:
        """
        Q2: Given RADICAL NAME → return (formula, valency).
        """
        key = radical_name.strip().title()
        if key not in RADICAL_DATA:
            raise ValueError(f"Radical '{radical_name}' not found.")
        return RADICAL_DATA[key]

    @staticmethod
    def solve_combines_with_h_002(element_name: str) -> int:
        """
        Q3: Number of hydrogen atoms an element combines with = its valency.
        """
        return ChemistrySolver.solve_valency_002(element_name)

    @staticmethod
    def solve_compare_valency_002(el_a: str, el_b: str) -> str:
        """
        Q4: Compare valencies of two elements.
        Returns: 'A' if A > B, 'B' if B > A, 'EQUAL' if same.
        """
        va = ChemistrySolver.solve_valency_002(el_a)
        vb = ChemistrySolver.solve_valency_002(el_b)
        if va > vb:
            return "A"
        elif vb > va:
            return "B"
        return "EQUAL"

    # ── Node 003: Formulae of Compounds ────────────────────────────────────

    @staticmethod
    def _gcd(a: int, b: int) -> int:
        a, b = abs(int(a)), abs(int(b))
        while b:
            a, b = b, a % b
        return a

    @staticmethod
    def _normalise(formula: str) -> str:
        """Lower-case letters, keep only atoms and digits."""
        return re.sub(r'[^a-z0-9]', '', formula.lower())

    @staticmethod
    def _parse_formula(formula: str) -> dict:
        """
        Recursively parse a chemical formula into {element: count}.
        Handles nested brackets like Al2(SO4)3, Mg(OH)2, Cu3(PO4)2.
        """
        def _tokenize(s: str) -> list:
            tokens = []
            i = 0
            while i < len(s):
                if s[i] == '(':
                    tokens.append('('); i += 1
                elif s[i] == ')':
                    tokens.append(')'); i += 1
                elif s[i].isupper():
                    token = s[i]; i += 1
                    while i < len(s) and s[i].islower():
                        token += s[i]; i += 1
                    tokens.append(token)
                elif s[i].isdigit():
                    num = ''
                    while i < len(s) and s[i].isdigit():
                        num += s[i]; i += 1
                    tokens.append(num)
                else:
                    i += 1
            return tokens

        def _parse(tokens: list) -> dict:
            stack = [{}]
            i = 0
            while i < len(tokens):
                tok = tokens[i]
                if tok == '(':
                    # find matching ')'
                    depth, j = 1, i + 1
                    while j < len(tokens) and depth > 0:
                        if tokens[j] == '(': depth += 1
                        elif tokens[j] == ')': depth -= 1
                        j += 1
                    inner = _parse(tokens[i + 1: j - 1])
                    mult = 1
                    if j < len(tokens) and tokens[j].isdigit():
                        mult = int(tokens[j]); j += 1
                    for k, v in inner.items():
                        stack[-1][k] = stack[-1].get(k, 0) + v * mult
                    i = j
                elif tok.isalpha():          # element symbol
                    count = 1
                    if i + 1 < len(tokens) and tokens[i + 1].isdigit():
                        count = int(tokens[i + 1]); i += 1
                    stack[-1][tok] = stack[-1].get(tok, 0) + count
                    i += 1
                elif tok == ')':
                    i += 1
                else:
                    i += 1
            return stack[-1]

        tokens = _tokenize(formula)
        return _parse(tokens)

    @staticmethod
    def _build_from_valency(el1: str, v1: int, el2: str, v2: int,
                           r1: str = "", r2: str = "") -> str:
        """
        Build the simplest correct formula using the criss-cross method.
        el1, el2: element names
        v1, v2: valencies (positive for el1, negative magnitude for el2)
        r1, r2: radical formulas (if given, override el2)
        """
        sym1 = SYMBOL_DATA[el1]
        sym2 = r2 if r2 else SYMBOL_DATA[el2]

        sub1, sub2 = v2, v1
        g = ChemistrySolver._gcd(sub1, sub2)
        sub1 //= g; sub2 //= g

        if sub2 == 1:
            left = sym1
        else:
            left = f"{sym1}{sub2}"

        if r1:  # first part is a radical
            left = f"({r1})" if sub2 > 1 else r1
            left += str(sub2) if sub2 > 1 else ""

        if sub1 == 1:
            right = sym2
        else:
            if len(sym2) > 1 and not sym2.startswith('('):
                right = f"({sym2}){sub1}"
            else:
                right = f"{sym2}{sub1}"

        if v1 != 1 and v2 != 1 and not r1:
            left = sym1 if sub2 == 1 else f"{sym1}{sub2}"
            right = sym2 if sub1 == 1 else (f"({sym2}){sub1}" if len(sym2) > 1 else f"{sym2}{sub1}")
            return left + right

        if r1 and r2:
            ls = f"({r1})" + (str(sub2) if sub2 > 1 else "")
            rs = f"({r2})" + (str(sub1) if sub1 > 1 else "")
            return ls + rs

        return left + right

    @staticmethod
    def solve_formula_003(el1: str, valency1: int, el2: str,
                          valency2: int) -> str:
        """
        Q1: Two elements → build formula using criss-cross valency method.
        """
        return ChemistrySolver._build_from_valency(el1, valency1, el2, valency2)

    @staticmethod
    def solve_radical_formula_003(cation: str, cation_v: int,
                                   radical_name: str) -> str:
        """
        Q2: Cation + Radical → build formula.
        radical_name looked up in RADICAL_DATA for (formula, valency).
        """
        r_key = radical_name.strip().title()
        if r_key not in RADICAL_DATA:
            raise ValueError(f"Radical '{radical_name}' not found.")
        r_formula, r_valency = RADICAL_DATA[r_key]
        return ChemistrySolver._build_from_valency(
            cation, cation_v, "", r_valency, r1="", r2=r_formula
        )

    @staticmethod
    def solve_formula_name_003(formula: str) -> str:
        """
        Q3: Given formula → name the compound (IUPAC style for Class 9).
        Returns a list of known names or a best-effort reconstruction.
        """
        known = {
            "H2O": "Water", "CO2": "Carbon dioxide", "NH3": "Ammonia",
            "NaCl": "Sodium chloride", "HCl": "Hydrogen chloride",
            "CaO": "Calcium oxide", "MgO": "Magnesium oxide",
            "Fe2O3": "Ferric oxide", "CuO": "Cupric oxide",
            "Al2O3": "Aluminium oxide", "ZnO": "Zinc oxide",
            "Na2O": "Sodium oxide", "K2O": "Potassium oxide",
            "SO2": "Sulphur dioxide", "SO3": "Sulphur trioxide",
            "NO2": "Nitrogen dioxide", "N2O5": "Dinitrogen pentoxide",
            "CO": "Carbon monoxide", "CaCO3": "Calcium carbonate",
            "Na2CO3": "Sodium carbonate", "H2SO4": "Sulphuric acid",
            "HNO3": "Nitric acid", "NaOH": "Sodium hydroxide",
            "KOH": "Potassium hydroxide", "Ca(OH)2": "Calcium hydroxide",
            "NH4OH": "Ammonium hydroxide", "Na2SO4": "Sodium sulphate",
            "CuSO4": "Copper sulphate", "FeSO4": "Ferrous sulphate",
            "Al2(SO4)3": "Aluminium sulphate", "MgCl2": "Magnesium chloride",
            "CaCl2": "Calcium chloride", "FeCl3": "Ferric chloride",
            "AgCl": "Silver chloride", "NaNO3": "Sodium nitrate",
            "KNO3": "Potassium nitrate", "NH4NO3": "Ammonium nitrate",
            "(NH4)2SO4": "Ammonium sulphate", "Ca3(PO4)2": "Tricalcium phosphate",
            "Mg3N2": "Magnesium nitride", "AlN": "Aluminium nitride",
            "Na2S": "Sodium sulphide", "CuS": "Copper sulphide",
            "FeS": "Ferrous sulphide", "PCl5": "Phosphorus pentachloride",
            "CH4": "Methane", "CCl4": "Carbon tetrachloride",
            "SiO2": "Silicon dioxide", "H2S": "Hydrogen sulphide",
            "BaCl2": "Barium chloride", "BaSO4": "Barium sulphate",
            "PbO": "Lead oxide", "PbO2": "Lead dioxide",
        }
        if formula in known:
            return known[formula]
        parsed = ChemistrySolver._parse_formula(formula)
        parts = [f"{el}({cnt})" if cnt > 1 else el for el, cnt in parsed.items()]
        return " + ".join(parts) + " (verify manually)"

    @staticmethod
    def solve_bracket_003(formula: str) -> dict:
        """
        Q4: Given formula, return atom count dict + whether brackets were needed.
        """
        atoms = ChemistrySolver._parse_formula(formula)
        needs_brackets = '(' in formula
        return {"atoms": atoms, "brackets_needed": needs_brackets}

    @staticmethod
    def solve_missing_formula_003(formula_template: str) -> str:
        """
        Q5: Given an incomplete formula with '?' → fill in the missing subscript.
        e.g. 'H2?' → determine the subscript.
        """
        if '?' not in formula_template:
            raise ValueError("Template must contain '?'.")
        for d in "123456789":
            candidate = formula_template.replace('?', d)
            try:
                atoms = ChemistrySolver._parse_formula(candidate)
                if atoms:
                    return candidate
            except Exception:
                continue
        return formula_template

    # ── Unified Solve Dispatcher ───────────────────────────────────────────

    @staticmethod
    def solve(node: str, question_type: str, **kwargs) -> any:
        """
        Unified solver dispatcher.
        node    → 'c9_chem_001' | 'c9_chem_002' | 'c9_chem_003'
        qtype   → e.g. 'symbol_from_name', 'valency', 'formula_build'
        kwargs  → node-specific parameters
        """
        solvers_001 = {
            "symbol_from_name": ChemistrySolver.solve_symbol_001,
            "name_from_symbol": ChemistrySolver.solve_name_001,
            "check_rule":       ChemistrySolver.solve_rule_001,
        }
        solvers_002 = {
            "valency":           ChemistrySolver.solve_valency_002,
            "radical_valency":   ChemistrySolver.solve_radical_valency_002,
            "combines_with_h":   ChemistrySolver.solve_combines_with_h_002,
            "compare_valency":   ChemistrySolver.solve_compare_valency_002,
        }
        solvers_003 = {
            "formula_build":      ChemistrySolver.solve_formula_003,
            "radical_formula":    ChemistrySolver.solve_radical_formula_003,
            "name_from_formula":  ChemistrySolver.solve_formula_name_003,
            "bracket_analysis":   ChemistrySolver.solve_bracket_003,
            "fill_missing":       ChemistrySolver.solve_missing_formula_003,
        }
        registry = {"c9_chem_001": solvers_001,
                    "c9_chem_002": solvers_002,
                    "c9_chem_003": solvers_003}
        if node not in registry:
            raise ValueError(f"Unknown node: {node}")
        if question_type not in registry[node]:
            raise ValueError(f"Unknown qtype '{question_type}' for {node}.")
        return registry[node][question_type](**kwargs)