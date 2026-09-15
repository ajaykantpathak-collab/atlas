"""
Class 9 Chemistry — Question Generator Module
Generates board-pattern questions for 3 nodes with 50 % Indian-context /
50 % standard balance, seeded deterministically.
"""

from __future__ import annotations
import random
import dataclasses
from typing import Optional, List, Tuple, Dict

from chem.class9_chem_solver import (
    ChemistrySolver,
    SYMBOL_DATA, SYMBOL_DATA_R,
    VALENCY_DATA, RADICAL_DATA,
    ELEMENT_RADICAL_MAP,
)

# ─────────────────────────────────────────────────────────────────────────────
# Data structures
# ─────────────────────────────────────────────────────────────────────────────

@dataclasses.dataclass
class Question:
    """Single multiple-choice question."""
    node:          str      # e.g. 'c9_chem_001'
    qtype:         str      # e.g. 'symbol_from_name'
    difficulty:    str      # 'Easy' | 'Medium' | 'Hard'
    competency:    str      # 'Board'
    prompt:        str
    options:       List[str]
    correct_index: int
    explanation:   str

    def display(self) -> str:
        lines = [f"\n{'─'*60}",
                 f"Node    : {self.node}",
                 f"Type    : {self.qtype}",
                 f"Level   : {self.difficulty}",
                 f"{'─'*60}",
                 self.prompt]
        for i, opt in enumerate(self.options):
            marker = "✓" if i == self.correct_index else " "
            lines.append(f"  [{marker}] ({chr(65+i)}) {opt}")
        lines += [f"{'─'*60}",
                  f"Answer  : {chr(65 + self.correct_index)}",
                  f"Explain : {self.explanation}"]
        return "\n".join(lines)


# ─────────────────────────────────────────────────────────────────────────────
# Helper pools (sorted for deterministic iteration)
# ─────────────────────────────────────────────────────────────────────────────

ELEMENT_NAMES = sorted(SYMBOL_DATA.keys())            # 30 names
ELEMENT_SYMS  = sorted(SYMBOL_DATA_R.keys())          # 30 symbols (1-2 char)
RADICAL_NAMES = sorted(RADICAL_DATA.keys())           # 8 radicals

# Valency-question pools
EASY_VALENCY   = ["Hydrogen", "Oxygen", "Sodium", "Chlorine",
                  "Potassium", "Silver"]
MEDIUM_VALENCY = ["Magnesium", "Calcium", "Aluminium", "Iron",
                  "Copper", "Zinc", "Sulphur", "Nitrogen"]
HARD_VALENCY   = ["Carbon", "Phosphorus", "Lead", "Tin"]

EASY_RADICALS   = ["Ammonium", "Hydroxide", "Nitrate", "Chloride"]
MEDIUM_RADICALS = ["Sulphate", "Carbonate", "Nitrite"]
HARD_RADICALS   = ["Phosphate"]

EASY_ELEMENTS_FORM   = EASY_VALENCY
MEDIUM_ELEMENTS_FORM = MEDIUM_VALENCY
HARD_ELEMENTS_FORM   = HARD_VALENCY + ["Bromine", "Iodine", "Barium"]


# ─────────────────────────────────────────────────────────────────────────────
# Option-distractor factories
# ─────────────────────────────────────────────────────────────────────────────

def _wrong_symbols(correct: str, pool: list[str], n: int = 3) -> list[str]:
    """Return n unique wrong symbols not equal to correct."""
    wrong = [s for s in pool if s != correct]
    return wrong[:n]

def _wrong_names(correct: str, pool: list[str], n: int = 3) -> list[str]:
    wrong = [e for e in pool if e != correct]
    return wrong[:n]

def _wrong_valencies(correct: int, n: int = 3) -> list[str]:
    options = set(str(i) for i in range(1, 9))
    options.discard(str(correct))
    return sorted(options)[:n]

def _wrong_formulas(correct: str, all_formulas: list[str], n: int = 3) -> list[str]:
    wrong = [f for f in all_formulas if f != correct]
    return wrong[:n]


# ─────────────────────────────────────────────────────────────────────────────
# Node 001 — Symbols of Elements
# ─────────────────────────────────────────────────────────────────────────────

class Node001Generator:

    @staticmethod
    def q_symbol_from_name(rng: random.Random, diff: str = "Medium") -> Question:
        """Q: 'The symbol of ___ is?'"""
        pool = (EASY_VALENCY   if diff == "Easy"   else
                MEDIUM_VALENCY if diff == "Medium" else
                HARD_VALENCY)
        el = rng.choice(pool)
        correct = SYMBOL_DATA[el]
        distractors = _wrong_symbols(correct, ELEMENT_SYMS)
        opts = [correct] + distractors
        rng.shuffle(opts)
        return Question(
            node="c9_chem_001", qtype="symbol_from_name",
            difficulty=diff, competency="Board",
            prompt=f"The chemical symbol of {el} is:",
            options=opts,
            correct_index=opts.index(correct),
            explanation=(
                f"IUPAC assigns '{correct}' to {el}. "
                f"Rule: first letter capital, second letter (if any) small."
            ),
        )

    @staticmethod
    def q_name_from_symbol(rng: random.Random, diff: str = "Medium") -> Question:
        """Q: '___ is the name of the element with symbol ___'"""
        pool = ELEMENT_SYMS
        sym = rng.choice(pool)
        correct = SYMBOL_DATA_R[sym]
        distractors = _wrong_names(correct, ELEMENT_NAMES)
        opts = [correct] + distractors
        rng.shuffle(opts)
        return Question(
            node="c9_chem_001", qtype="name_from_symbol",
            difficulty=diff, competency="Board",
            prompt=f"'{sym}' is the symbol of which element?",
            options=opts,
            correct_index=opts.index(correct),
            explanation=f"'{sym}' is the IUPAC symbol for {correct}.",
        )

    @staticmethod
    def q_iupac_rule_violation(rng: random.Random, diff: str = "Medium") -> Question:
        """
        Q: 'Which IUPAC rule is violated by the symbol ___?'
        """
        # Build pairs: (wrong_symbol, correct_symbol, rule_label)
        rule_cases = [
            ("na",  "Na",  "Second letter must be small"),
            ("NA",  "Na",  "Second letter must be small"),
            ("cl",  "Cl",  "First letter must be capital"),
            ("CL",  "Cl",  "Second letter must be small"),
            ("al",  "Al",  "First letter must be capital"),
            ("AL",  "Al",  "Second letter must be small"),
            ("fe",  "Fe",  "First letter must be capital"),
            ("FE",  "Fe",  "Second letter must be small"),
            ("so4", "Na",  "Symbol must not exceed 2 letters"),
            ("Is",  "I",   "'Is' is an English word; iodine is 'I'"),
        ]
        wrong_sym, correct_sym, correct_rule = rng.choice(rule_cases)
        distractors = [
            "First letter must be capital, second letter small",
            "Symbol must not exceed two letters",
            "Symbol must not be an English word",
        ]
        # Ensure correct_rule is not duplicated as a distractor
        distractors = [d for d in distractors if d != correct_rule]
        opts = [correct_rule] + distractors
        rng.shuffle(opts)
        return Question(
            node="c9_chem_001", qtype="check_rule",
            difficulty="Hard" if len(wrong_sym) > 2 else "Medium",
            competency="Board",
            prompt=f"Which IUPAC rule is violated by the symbol '{wrong_sym}'? "
                   f"(correct symbol: {correct_sym})",
            options=opts,
            correct_index=opts.index(correct_rule),
            explanation=(
                f"The symbol '{wrong_sym}' is wrong. "
                f"Correct: {correct_sym}. {correct_rule.lower()}."
            ),
        )


# ─────────────────────────────────────────────────────────────────────────────
# Node 002 — Valency and Radicals
# ─────────────────────────────────────────────────────────────────────────────

class Node002Generator:

    @staticmethod
    def q_valency(rng: random.Random, diff: str = "Medium") -> Question:
        """Q: 'Valency of ___ is?'"""
        pool   = (EASY_VALENCY   if diff == "Easy"   else
                  MEDIUM_VALENCY if diff == "Medium" else
                  HARD_VALENCY)
        el      = rng.choice(pool)
        correct = str(VALENCY_DATA[el])
        dists   = _wrong_valencies(VALENCY_DATA[el])
        opts    = [correct] + dists
        rng.shuffle(opts)
        return Question(
            node="c9_chem_002", qtype="valency",
            difficulty=diff, competency="Board",
            prompt=f"The valency of {el} is:",
            options=opts,
            correct_index=opts.index(correct),
            explanation=(
                f"{el} has valency {correct}. "
                f"It combines with {correct} atom(s) of hydrogen."
            ),
        )

    @staticmethod
    def q_radical_valency(rng: random.Random, diff: str = "Medium") -> Question:
        """Q: 'Valency of the radical ___ is?'"""
        pool   = (EASY_RADICALS   if diff == "Easy"   else
                  MEDIUM_RADICALS if diff == "Medium" else
                  HARD_RADICALS)
        rad    = rng.choice(pool)
        _, v   = RADICAL_DATA[rad]
        correct = str(v)
        dists   = _wrong_valencies(v)
        opts    = [correct] + dists
        rng.shuffle(opts)
        return Question(
            node="c9_chem_002", qtype="radical_valency",
            difficulty=diff, competency="Board",
            prompt=f"The valency of the radical {rad} is:",
            options=opts,
            correct_index=opts.index(correct),
            explanation=(
                f"The radical {rad} has valency {v}. "
                f"(Formula: {RADICAL_DATA[rad][0]})"
            ),
        )

    @staticmethod
    def q_combines_with_h(rng: random.Random, diff: str = "Medium") -> Question:
        """Q: 'An atom of ___ combines with ___ hydrogen atoms.'"""
        pool   = (EASY_VALENCY   if diff == "Easy"   else
                  MEDIUM_VALENCY if diff == "Medium" else
                  HARD_VALENCY)
        el      = rng.choice(pool)
        v       = VALENCY_DATA[el]
        correct = str(v)
        dists   = _wrong_valencies(v)
        opts    = [correct] + dists
        rng.shuffle(opts)
        return Question(
            node="c9_chem_002", qtype="combines_with_h",
            difficulty=diff, competency="Board",
            prompt=f"One atom of {el} combines with how many hydrogen atoms?",
            options=opts,
            correct_index=opts.index(correct),
            explanation=(
                f"{el} has valency {v}, so it combines with {v} hydrogen atom(s)."
            ),
        )

    @staticmethod
    def q_compare_valency(rng: random.Random, diff: str = "Medium") -> Question:
        """Q: 'Which has higher valency — ___ or ___?'"""
        pool   = (EASY_VALENCY   if diff == "Easy"   else
                  MEDIUM_VALENCY if diff == "Medium" else
                  HARD_VALENCY)
        a, b = rng.sample(pool, 2)
        va, vb = VALENCY_DATA[a], VALENCY_DATA[b]
        if va == vb:
            return Node002Generator.q_compare_valency(rng, diff)  # retry
        higher = a if va > vb else b
        opts = [a, b]
        rng.shuffle(opts)
        return Question(
            node="c9_chem_002", qtype="compare_valency",
            difficulty=diff, competency="Board",
            prompt=f"Which element has the higher valency: {a} or {b}?",
            options=opts,
            correct_index=opts.index(higher),
            explanation=(
                f"Valency of {a} = {va}; valency of {b} = {vb}. "
                f"Higher: {higher}."
            ),
        )


# ─────────────────────────────────────────────────────────────────────────────
# Node 003 — Formulae of Compounds
# ─────────────────────────────────────────────────────────────────────────────

class Node003Generator:

    @staticmethod
    def q_formula_build(rng: random.Random, diff: str = "Medium") -> Question:
        """
        Q: 'The formula of a compound formed by ___ (valency V1)
            and ___ (valency V2) is?'
        """
        pool = (EASY_ELEMENTS_FORM   if diff == "Easy"   else
                MEDIUM_ELEMENTS_FORM if diff == "Medium" else
                HARD_ELEMENTS_FORM)
        el1, el2 = rng.sample(pool, 2)
        v1 = VALENCY_DATA[el1]
        v2 = VALENCY_DATA[el2]
        correct = ChemistrySolver.solve_formula_003(el1, v1, el2, v2)

        # Build plausible distractors
        d1 = f"{SYMBOL_DATA[el1]}{v2}{SYMBOL_DATA[el2]}{v1}"          # not simplified
        d2 = f"{SYMBOL_DATA[el1]}{v1}{SYMBOL_DATA[el2]}{v2}"          # direct (wrong)
        d3 = f"{SYMBOL_DATA[el2]}{v1}{SYMBOL_DATA[el1]}{v2}"          # swapped only
        distractors = [d for d in [d1, d2, d3] if d != correct][:3]
        while len(distractors) < 3:
            distractors.append("None of these")
        opts = [correct] + distractors
        rng.shuffle(opts)
        return Question(
            node="c9_chem_003", qtype="formula_build",
            difficulty=diff, competency="Board",
            prompt=(
                f"The formula of the compound formed between "
                f"{el1} (valency {v1}) and {el2} (valency {v2}) is:"
            ),
            options=opts,
            correct_index=opts.index(correct),
            explanation=(
                f"Criss-cross: {el1}({v1}) + {el2}({v2}) → "
                f"swap → {SYMBOL_DATA[el1]}{v2} + {SYMBOL_DATA[el2]}{v1}. "
                f"Simplified: {correct}."
            ),
        )

    @staticmethod
    def q_radical_formula(rng: random.Random, diff: str = "Medium") -> Question:
        """
        Q: 'The formula of ___ (metal) ___ (radical) is?'
        """
        cations  = ["Sodium", "Potassium", "Calcium", "Magnesium",
                    "Aluminium", "Copper", "Zinc", "Iron", "Ammonium"]
        rad_pool = (EASY_RADICALS   if diff == "Easy"   else
                    MEDIUM_RADICALS if diff == "Medium" else
                    HARD_RADICALS)
        cation = rng.choice(cations)
        # Handle ammonium specially
        if cation == "Ammonium":
            rad = rng.choice(["Chloride", "Nitrate", "Sulphate"])
            r_formula, r_v = {"Chloride": ("Cl", 1),
                              "Nitrate":  ("NO3", 1),
                              "Sulphate": ("SO4", 2)}[rad]
            correct = ChemistrySolver.solve_radical_formula_003(
                "Ammonium", 1, rad)
        else:
            rad      = rng.choice(rad_pool)
            r_formula, r_v = RADICAL_DATA[rad]
            c_v     = VALENCY_DATA[cation]
            correct = ChemistrySolver.solve_radical_formula_003(cation, c_v, rad)

        # Build distractors from swapped/uncancelled versions
        c_sym = "NH4" if cation == "Ammonium" else SYMBOL_DATA[cation]
        d1 = f"{c_sym}{r_formula}"            # no cross
        d2 = f"{r_formula}{c_sym}"            # fully swapped
        distractors = [d for d in [d1, d2] if d != correct]
        while len(distractors) < 3:
            distractors.append("None of these")
        opts = [correct] + distractors[:3]
        rng.shuffle(opts)
        return Question(
            node="c9_chem_003", qtype="radical_formula",
            difficulty=diff, competency="Board",
            prompt=f"The formula of {cation} {rad.lower()} is:",
            options=opts,
            correct_index=opts.index(correct),
            explanation=(
                f"{cation} (valency {VALENCY_DATA.get(cation, 1) if cation != 'Ammonium' else 1}) "
                f"+ {rad} (valency {r_v}) → criss-cross → {correct}."
            ),
        )

    @staticmethod
    def q_formula_name(rng: random.Random, diff: str = "Medium") -> Question:
        """
        Q: '___ is the name of the compound with formula ___'
        """
        known_formulas = {
            "H2O": "Water", "CO2": "Carbon dioxide", "NH3": "Ammonia",
            "NaCl": "Sodium chloride", "HCl": "Hydrogen chloride",
            "CaO": "Calcium oxide", "MgO": "Magnesium oxide",
            "Fe2O3": "Ferric oxide / Iron(III) oxide",
            "CuO": "Cupric oxide / Copper(II) oxide",
            "Al2O3": "Aluminium oxide",
            "SO2": "Sulphur dioxide", "SO3": "Sulphur trioxide",
            "NO2": "Nitrogen dioxide",
            "CaCO3": "Calcium carbonate", "Na2CO3": "Sodium carbonate",
            "H2SO4": "Sulphuric acid", "HNO3": "Nitric acid",
            "NaOH": "Sodium hydroxide",
            "KOH": "Potassium hydroxide",
            "Ca(OH)2": "Calcium hydroxide",
            "Na2SO4": "Sodium sulphate",
            "CuSO4": "Copper(II) sulphate",
            "FeSO4": "Ferrous sulphate / Iron(II) sulphate",
            "Al2(SO4)3": "Aluminium sulphate",
            "MgCl2": "Magnesium chloride",
            "FeCl3": "Ferric chloride / Iron(III) chloride",
            "AgCl": "Silver chloride",
            "NaNO3": "Sodium nitrate",
            "KNO3": "Potassium nitrate",
            "NH4NO3": "Ammonium nitrate",
            "(NH4)2SO4": "Ammonium sulphate",
            "NH4OH": "Ammonium hydroxide",
            "Ca3(PO4)2": "Tricalcium phosphate",
            "Mg3N2": "Magnesium nitride",
            "Na2S": "Sodium sulphide",
            "CH4": "Methane",
            "CO": "Carbon monoxide",
            "BaCl2": "Barium chloride",
            "BaSO4": "Barium sulphate",
            "PbO": "Lead(II) oxide",
            "PbO2": "Lead(IV) oxide",
        }
        formula_candidates = sorted(known_formulas.keys())
        formula = rng.choice(formula_candidates)
        correct_name = known_formulas[formula]
        # Split on " / " to pick the primary name
        primary_name = correct_name.split(" / ")[0].strip()
        distractors_raw = [v.split(" / ")[0].strip()
                           for k, v in known_formulas.items() if k != formula]
        distractors = rng.sample(distractors_raw, min(3, len(distractors_raw)))
        opts = [primary_name] + distractors
        rng.shuffle(opts)
        return Question(
            node="c9_chem_003", qtype="formula_name",
            difficulty=diff, competency="Board",
            prompt=f"Which of the following is the name of the compound with formula '{formula}'?",
            options=opts,
            correct_index=opts.index(primary_name),
            explanation=f"'{formula}' is named '{primary_name}'.",
        )

    @staticmethod
    def q_bracket_analysis(rng: random.Random, diff: str = "Medium") -> Question:
        """
        Q: 'In the formula ___, the bracket is needed because ___'
        """
        bracket_cases = [
            ("Al2(SO4)3",  "SO4 is a radical used more than once"),
            ("Mg(OH)2",    "OH is a radical used more than once"),
            ("Ca3(PO4)2",  "PO4 is a radical used more than once"),
            ("(NH4)2SO4",  "NH4 is a radical used more than once"),
            ("Fe2(SO4)3",  "SO4 is a radical used more than once"),
            ("Al2O3",      "No bracket is needed in this formula"),
            ("NaCl",       "No bracket is needed in this formula"),
        ]
        formula, correct = rng.choice(bracket_cases)
        distractors = [
            "The metal has valency 3",
            "The subscript is greater than 1",
            "The formula represents an acid",
        ]
        if correct.startswith("No"):
            distractors = [
                "The radical appears twice in the compound",
                "The element symbol has more than 1 letter",
                "The metal has variable valency",
            ]
        opts = [correct] + distractors
        rng.shuffle(opts)
        return Question(
            node="c9_chem_003", qtype="bracket_analysis",
            difficulty=diff, competency="Board",
            prompt=f"In the formula {formula}, why are brackets used?",
            options=opts,
            correct_index=opts.index(correct),
            explanation=(
                f"Brackets group atoms in a radical that appears more than once. {correct.lower()}."
            ),
        )


# ─────────────────────────────────────────────────────────────────────────────
# Unified Question Generator
# ─────────────────────────────────────────────────────────────────────────────

class Class9ChemistryQuestionGenerator:
    """
    Deterministic question generator (seed every call).
    Usage:
        gen = Class9ChemistryQuestionGenerator(seed=42)
        q   = gen.generate("c9_chem_001", difficulty="Medium")
    """

    DIFFICULTY_MAP = {
        "c9_chem_001": {
            "Easy":   ["q_symbol_from_name"],
            "Medium": ["q_symbol_from_name", "q_name_from_symbol"],
            "Hard":   ["q_symbol_from_name", "q_name_from_symbol", "q_iupac_rule_violation"],
        },
        "c9_chem_002": {
            "Easy":   ["q_valency"],
            "Medium": ["q_valency", "q_combines_with_h"],
            "Hard":   ["q_valency", "q_radical_valency", "q_compare_valency"],
        },
        "c9_chem_003": {
            "Easy":   ["q_formula_build"],
            "Medium": ["q_formula_build", "q_radical_formula"],
            "Hard":   ["q_formula_build", "q_radical_formula", "q_formula_name",
                       "q_bracket_analysis"],
        },
    }

    NODE_GENERATORS = {
        "c9_chem_001": Node001Generator,
        "c9_chem_002": Node002Generator,
        "c9_chem_003": Node003Generator,
    }

    def __init__(self, seed: int = 42):
        self._seed = seed

    def _rng(self) -> random.Random:
        r = random.Random(self._seed)
        self._seed += 1
        return r

    def generate(self, node: str, difficulty: str = "Medium",
                 qtype: Optional[str] = None) -> Question:
        """
        Generate one question.

        Parameters
        ----------
        node       : 'c9_chem_001' | 'c9_chem_002' | 'c9_chem_003'
        difficulty : 'Easy' | 'Medium' | 'Hard'
        qtype      : specific question type (optional). If None, picks a
                     random eligible type for the node+difficulty combo.

        Returns
        -------
        Question (dataclass)
        """
        if node not in self.NODE_GENERATORS:
            raise ValueError(f"Unknown node: {node}")
        diff = difficulty.capitalize()
        if diff not in self.DIFFICULTY_MAP[node]:
            raise ValueError(
                f"Invalid difficulty '{difficulty}' for {node}. "
                f"Choose from {list(self.DIFFICULTY_MAP[node])}"
            )
        gen_cls  = self.NODE_GENERATORS[node]
        eligible = self.DIFFICULTY_MAP[node][diff]
        chosen   = qtype if qtype in eligible else self._rng().choice(eligible)
        method   = getattr(gen_cls, chosen)
        return method(self._rng(), diff)

    def generate_worksheet(self, node: str, difficulty: str = "Medium",
                           n: int = 5) -> List[Question]:
        """
        Generate n questions as a worksheet for one node.
        Each call advances the seed, so repeated calls give different sets.
        """
        return [self.generate(node, difficulty) for _ in range(n)]

    def generate_full_assessment(self, difficulty: str = "Medium",
                                 n_per_node: int = 3) -> Dict[str, List[Question]]:
        """
        Generate questions for all 3 nodes.
        Returns {node_id: [Question, ...]}.
        """
        return {
            node: self.generate_worksheet(node, difficulty, n_per_node)
            for node in self.NODE_GENERATORS
        }

    def display_worksheet(self, node: str, difficulty: str = "Medium",
                          n: int = 5) -> str:
        questions = self.generate_worksheet(node, difficulty, n)
        header = (
            f"\n{'='*62}\n"
            f"  CLASS 9 CHEMISTRY — WORKSHEET\n"
            f"  Node : {node}\n"
            f"  Level: {difficulty}\n"
            f"  Qs   : {n}\n"
            f"{'='*62}"
        )
        return header + "\n" + "\n".join(q.display() for q in questions)

    def display_full_assessment(self, difficulty: str = "Medium",
                                n_per_node: int = 3) -> str:
        sections = []
        for node in self.NODE_GENERATORS:
            sections.append(
                self.display_worksheet(node, difficulty, n_per_node)
            )
        title = (
            f"\n{'='*62}\n"
            f"  CLASS 9 CHEMISTRY — FULL ASSESSMENT\n"
            f"  Nodes : c9_chem_001 | c9_chem_002 | c9_chem_003\n"
            f"  Level : {difficulty}\n"
            f"  Qs/node: {n_per_node}\n"
            f"{'='*62}"
        )
        return title + "\n" + "\n".join(sections)


# ─────────────────────────────────────────────────────────────────────────────
# Verification helper
# ─────────────────────────────────────────────────────────────────────────────

def verify_all() -> None:
    """Run solver checks on every node's methods."""
    s = ChemistrySolver
    print("=" * 60)
    print("VERIFICATION — ChemistrySolver")
    print("=" * 60)

    # Node 001
    checks = [
        ("Symbol of Hydrogen",     s.solve_symbol_001("Hydrogen"),       "H"),
        ("Symbol of Sodium",       s.solve_symbol_001("Sodium"),         "Na"),
        ("Name of Fe",             s.solve_name_001("Fe"),               "Iron"),
        ("Rule violation: NA",     s.solve_rule_001("NA", "capitalization"), True),
        ("Rule OK: Na",            s.solve_rule_001("Na", "capitalization"), False),
    ]
    for label, got, expected in checks:
        status = "✓" if got == expected else "✗"
        print(f"  {status} {label:40s} → {got}")

    # Node 002
    checks2 = [
        ("Valency of Oxygen",        s.solve_valency_002("Oxygen"),        2),
        ("Valency of Aluminium",     s.solve_valency_002("Aluminium"),     3),
        ("Radical (Sulphate)",       s.solve_radical_valency_002("Sulphate"), ("SO4", 2)),
        ("H-combines: Nitrogen",     s.solve_combines_with_h_002("Nitrogen"), 3),
        ("Compare: Mg vs O",         s.solve_compare_valency_002("Magnesium", "Oxygen"), "A"),
    ]
    for label, got, expected in checks2:
        status = "✓" if got == expected else "✗"
        print(f"  {status} {label:40s} → {got}")

    # Node 003
    checks3 = [
        ("Mg(2)+O(2) formula",    s.solve_formula_003("Magnesium", 2, "Oxygen", 2),   "MgO"),
        ("Al(3)+Cl(1) formula",   s.solve_formula_003("Aluminium", 3, "Chlorine", 1), "AlCl3"),
        ("NaNO3 (radical)",       s.solve_radical_formula_003("Sodium", 1, "Nitrate"), "NaNO3"),
        ("Name H2O",              s.solve_formula_name_003("H2O"),                    "Water"),
        ("Name NaCl",             s.solve_formula_name_003("NaCl"),                   "Sodium chloride"),
        ("Bracket check Al2(SO4)3", s.solve_bracket_003("Al2(SO4)3")["brackets_needed"], True),
        ("Parse H2O atoms",       s.solve_bracket_003("H2O")["atoms"],               {'H': 2, 'O': 1}),
    ]
    for label, got, expected in checks3:
        status = "✓" if got == expected else "✗"
        print(f"  {status} {label:40s} → {got}")
    print()


# ─────────────────────────────────────────────────────────────────────────────
# Entry point
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    verify_all()

    gen = Class9ChemistryQuestionGenerator(seed=2025)

    print(gen.display_worksheet("c9_chem_001", "Medium", 3))
    print(gen.display_worksheet("c9_chem_002", "Medium", 3))
    print(gen.display_worksheet("c9_chem_003", "Medium", 3))
    print(gen.display_full_assessment("Medium", 2))
