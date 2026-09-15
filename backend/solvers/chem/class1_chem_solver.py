"""
Class 1 Chemistry Solver  (ICSE/ISC — Water topic)
Verifies student answers across FIB, Matching, T/F, MCQ, and Short Answer.
All answers are seeded-deterministic via SolutionsLoader.

Usage:
    solver = ChemistrySolver(42)
    result = solver.check("c1_chem_001", "mcq", 1, "A")
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any

# ── Local imports ──────────────────────────────────────────────────────────────
from chem.class1_chem_questions import Q_TEMPLATES, SOLUTIONS_YAML

# ──────────────────────────────────────────────────────────────────────────────
# Data structures
# ──────────────────────────────────────────────────────────────────────────────

@dataclass
class ChoiceResult:
    """Outcome of checking a multiple-choice answer."""
    is_correct: bool
    selected_text: str
    correct_text: str
    feedback: str


@dataclass
class CheckResult:
    """Generic outcome envelope for any answer type."""
    is_correct: bool
    feedback: str
    detail: dict = field(default_factory=dict)


@dataclass
class NodeConfig:
    """Metadata for a single curriculum node."""
    node_id: str
    section: str
    syllabus: str
    cognitive_level: str
    difficulty: str
    exam_relevance: str
    competency_level: str
    prereq_strength: str
    mastery_criteria: str
    is_root: bool
    prereq: str | None


# ──────────────────────────────────────────────────────────────────────────────
# Solutions loader
# ──────────────────────────────────────────────────────────────────────────────

class SolutionsLoader:
    """
    Loads and indexes solutions from the embedded YAML string.
    Provides O(1) look-ups for every question / section type.
    """

    def __init__(self, yaml_text: str) -> None:
        self._data = self._parse(yaml_text)

    # ── Public API ────────────────────────────────────────────────────────────

    def fib(self, node_id: str, q_num: int) -> list[str]:
        """Return all accepted answers for a fill-in-the-blank question."""
        node = self._data.get(node_id, {})
        return node.get("fib", {}).get(q_num, [])

    def matching_key(self, node_id: str) -> dict[str, str]:
        """Return the canonical {A_item: B_item} mapping."""
        return self._data.get(node_id, {}).get("matching", {})

    def true_false(self, node_id: str) -> dict[int, bool]:
        """Return {statement_index: expected_bool} for a node."""
        return self._data.get(node_id, {}).get("true_false", {})

    def mcq_key(self, node_id: str, q_num: int) -> str:
        """Return the correct option letter ('A'–'D') for a MCQ."""
        return self._data.get(node_id, {}).get("mcq", {}).get(q_num, "A")

    def mcq_options(self, node_id: str, q_num: int) -> dict[str, str]:
        """Return {letter: option_text} for a MCQ."""
        templates = Q_TEMPLATES.get(node_id, {})
        mcq_list = templates.get("mcq", [])
        if 0 <= q_num - 1 < len(mcq_list):
            q = mcq_list[q_num - 1]
            choices_data = q.get("choices", {})
            correct_letter = self.mcq_key(node_id, q_num)
            return self._build_choices(choices_data, correct_letter)
        return {}

    def short_answer(self, node_id: str, q_num: int) -> str:
        """Return the model answer for a short-answer question."""
        node = self._data.get(node_id, {})
        return node.get("short_answer", {}).get(q_num, "")

    # ── Private helpers ────────────────────────────────────────────────────────

    @staticmethod
    def _build_choices(raw: dict, correct_letter: str) -> dict[str, str]:
        """Merge the 1 correct + 3 incorrect options into a {A/B/C/D: text} dict."""
        correct_text = raw.get("correct", "")
        incorrect   = raw.get("incorrect", [])
        out: dict[str, str] = {}
        out[correct_letter] = correct_text
        wrong_letters = [ch for ch in "ABCD" if ch != correct_letter]
        for ch, txt in zip(wrong_letters, incorrect):
            out[ch] = txt
        return out

    @staticmethod
    def _parse(yaml_text: str) -> dict:
        """
        Minimal YAML parser for the flat-key structures used here.
        Handles:
          • Top-level scalar  key: value
          • Nested  section → node_id → key → value
          • Inline Python dicts  {key: val, ...}
        """
        root: dict[str, Any] = {}
        current_section: str | None = None
        current_node:    str | None = None
        in_fib = in_match = in_tf = in_mcq = in_sa = False
        fib_buf: dict[int, list[str]] = {}
        fib_q: int | None = None

        for raw_line in yaml_text.splitlines():
            stripped = raw_line.strip()

            # Skip comments and blanks
            if not stripped or stripped.startswith("#"):
                continue

            # ── Section boundary (uses_of_water / sources_of_water / …) ──────
            sec_m = re.match(r"^([a-z_]+):\s*$", stripped)
            if sec_m and not stripped.startswith(" "):
                current_section = sec_m.group(1)
                in_fib = in_match = in_tf = in_mcq = in_sa = False
                fib_buf.clear()
                fib_q = None
                continue

            # ── Node ID ────────────────────────────────────────────────────────
            node_m = re.match(r"^(c1_[a-z0-9_]+):\s*$", stripped)
            if node_m and not stripped.startswith(" "):
                current_node = node_m.group(1)
                if current_node not in root:
                    root[current_node] = {}
                in_fib = in_match = in_tf = in_mcq = in_sa = False
                fib_buf.clear()
                fib_q = None
                continue

            # ── Section-type toggles ───────────────────────────────────────────
            if stripped == "fib:":
                in_fib = True; fib_q = None; fib_buf.clear()
                continue
            if stripped == "matching:":
                in_match = True; in_fib = False
                continue
            if stripped == "true_false:":
                in_tf = True; in_fib = False
                continue
            if stripped == "mcq:":
                in_mcq = True; in_fib = False
                continue
            if stripped == "short_answer:":
                in_sa = True; in_fib = False
                continue

            # ── Parse content lines ─────────────────────────────────────────────
            if current_node is None:
                continue

            # FIB:  2:  ["tap", "hand pump", "river"]
            if in_fib:
                fib_m = re.match(r"^(\d+):\s*\[(.+?)\]\s*$", stripped)
                if fib_m:
                    fib_q = int(fib_m.group(1))
                    fib_buf[fib_q] = [
                        s.strip().strip('"').strip("'")
                        for s in fib_m.group(2).split(",")
                    ]
                continue

            # matching:  "tap": "Water from the pipe at home"
            if in_match:
                kv = re.match(r'^"([^"]+)":\s*"(.+)"\s*$', stripped)
                if kv:
                    root[current_node].setdefault("matching", {})[
                        kv.group(1)
                    ] = kv.group(2)
                continue

            # true_false:  1: true
            if in_tf:
                tf_m = re.match(r"^(\d+):\s*(True|False|true|false)\s*$", stripped)
                if tf_m:
                    root[current_node].setdefault("true_false", {})[
                        int(tf_m.group(1))
                    ] = tf_m.group(2).lower() == "true"
                continue

            # mcq:  1: "C"
            if in_mcq:
                mcq_m = re.match(r'^(\d+):\s*"([A-D])"\s*$', stripped)
                if mcq_m:
                    root[current_node].setdefault("mcq", {})[
                        int(mcq_m.group(1))
                    ] = mcq_m.group(2)
                continue

            # short_answer:  1: "Water is precious …"
            if in_sa:
                sa_m = re.match(r'^(\d+):\s*"(.+)"\s*$', stripped)
                if sa_m:
                    root[current_node].setdefault("short_answer", {})[
                        int(sa_m.group(1))
                    ] = sa_m.group(2)
                continue

        # Flush buffered FIB data
        if fib_buf and current_node:
            root[current_node].setdefault("fib", {}).update(fib_buf)

        return root


# ──────────────────────────────────────────────────────────────────────────────
# ChemistrySolver
# ──────────────────────────────────────────────────────────────────────────────

class ChemistrySolver:
    """
    Grade-checking engine for Class 1 Chemistry.

    Example
    -------
    >>> solver = ChemistrySolver(42)
    >>> r = solver.check("c1_chem_001", "mcq", 1, "B")
    >>> print(r.is_correct, r.feedback)
    """

    ACCEPTED_VARIANTS: dict[str, list[str]] = {
        "tap":        ["tap", "tap water", "municipal water"],
        "hand pump":  ["hand pump", "handpump"],
        "tanker":     ["tanker", "water tanker"],
        "drinking":   ["drinking", "to drink"],
        "cooking":    ["cooking", "to cook", "cook food"],
        "washing":    ["washing", "to wash"],
        "bathing":    ["bathing", "bath", "to bathe"],
        "cleaning":   ["cleaning", "clean"],
    }

    MCQ_FEEDBACK_CORRECT = "Correct!  Well done."
    MCQ_FEEDBACK_WRONG   = "Not quite. The correct answer is {correct} ({correct_text})."

    # ──────────────────────────────────────────────────────────────────────────

    def __init__(self, seed: int) -> None:
        self.seed = seed
        self._loader = SolutionsLoader(SOLUTIONS_YAML)

    # ── Core check methods ─────────────────────────────────────────────────────

    def check(
        self,
        node_id: str,
        section: str,
        q_num: int,
        answer: Any,
    ) -> CheckResult:
        """
        Dispatch to the appropriate checker based on *section*.

        Parameters
        ----------
        node_id : str   e.g. "c1_chem_001"
        section  : str  one of "fib", "matching", "true_false", "mcq", "short_answer"
        q_num   : int   1-based question index
        answer  : Any   student's answer
        """
        dispatch = {
            "fib":           self._check_fib,
            "matching":      self._check_matching,
            "true_false":    self._check_true_false,
            "mcq":           self._check_mcq,
            "short_answer":  self._check_short_answer,
        }
        checker = dispatch.get(section)
        if checker is None:
            return CheckResult(
                is_correct=False,
                feedback=f"Unknown section '{section}'. "
                         f"Use: fib, matching, true_false, mcq, short_answer.",
            )
        return checker(node_id, q_num, answer)

    # ── Individual checkers ────────────────────────────────────────────────────

    def _check_fib(
        self, node_id: str, q_num: int, answer: str
    ) -> CheckResult:
        accepted = self._loader.fib(node_id, q_num)
        if not accepted:
            return CheckResult(
                is_correct=False,
                feedback=f"No solutions recorded for node={node_id} Q{q_num}.",
            )
        norm = self._normalise(answer)
        canonical = accepted[0]
        if norm == canonical.lower() or norm in [
            v.lower() for v in self.ACCEPTED_VARIANTS.get(canonical, [])
        ]:
            return CheckResult(
                is_correct=True,
                feedback=f"Correct! '{canonical}' is a right answer.",
            )
        return CheckResult(
            is_correct=False,
            feedback=(
                f"Not quite. The correct answer is '{canonical}'.\n"
                f"Other accepted answers: {', '.join(accepted[1:])}"
            ),
        )

    def _check_matching(
        self, node_id: str, q_num: int, answer: dict[str, str]
    ) -> CheckResult:
        key = self._loader.matching_key(node_id)
        correct = sum(
            1 for k, v in answer.items()
            if self._normalise(v) == self._normalise(key.get(k, ""))
        )
        total = len(key)
        pct = round(correct / total * 100)
        if correct == total:
            return CheckResult(
                is_correct=True,
                feedback=f"Perfect! All {total} pairs matched correctly.",
            )
        return CheckResult(
            is_correct=False,
            feedback=(
                f"You matched {correct}/{total} pairs correctly ({pct}%).\n"
                f"Correct key:\n" +
                "\n".join(f"  {k} → {v}" for k, v in key.items())
            ),
        )

    def _check_true_false(
        self, node_id: str, q_num: int, answer: bool
    ) -> CheckResult:
        tf_map = self._loader.true_false(node_id)
        expected = tf_map.get(q_num)
        if expected is None:
            return CheckResult(
                is_correct=False,
                feedback=f"No T/F answer recorded for node={node_id} Q{q_num}.",
            )
        if answer == expected:
            label = "True" if expected else "False"
            return CheckResult(
                is_correct=True,
                feedback=f"Correct! The correct answer is {label}.",
            )
        label = "True" if expected else "False"
        return CheckResult(
            is_correct=False,
            feedback=f"Incorrect. The correct answer is {label}.",
        )

    def _check_mcq(
        self, node_id: str, q_num: int, choice: str
    ) -> ChoiceResult:
        key = self._loader.mcq_key(node_id, q_num)
        options = self._loader.mcq_options(node_id, q_num)
        correct_text = options.get(key, "(unknown)")
        selected_text = options.get(choice.upper(), choice)
        if choice.upper() == key:
            return ChoiceResult(
                is_correct=True,
                selected_text=selected_text,
                correct_text=correct_text,
                feedback=self.MCQ_FEEDBACK_CORRECT,
            )
        return ChoiceResult(
            is_correct=False,
            selected_text=selected_text,
            correct_text=correct_text,
            feedback=self.MCQ_FEEDBACK_WRONG.format(
                correct=key, correct_text=correct_text
            ),
        )

    def _check_short_answer(
        self, node_id: str, q_num: int, answer: str
    ) -> CheckResult:
        model = self._loader.short_answer(node_id, q_num)
        if not model:
            return CheckResult(
                is_correct=False,
                feedback=f"No model answer for node={node_id} Q{q_num}.",
            )
        norm_student = self._normalise(answer)
        norm_model   = self._normalise(model)
        # Check if the model answer's key phrase appears in the student's response
        key_phrase = norm_model.split(".")[0].strip()  # first sentence as key
        if norm_student == norm_model or key_phrase in norm_student:
            return CheckResult(
                is_correct=True,
                feedback="Good answer! Your response is correct.",
            )
        return CheckResult(
            is_correct=False,
            feedback=(
                f"Your answer:\n  '{answer}'\n"
                f"Model answer:\n  '{model}'\n"
                "Tip: include the key words from the model answer."
            ),
        )

    # ──────────────────────────────────────────────────────────────────────────

    @staticmethod
    def _normalise(text: str) -> str:
        """Lower-case, strip, remove articles common in Class 1 answers."""
        t = text.strip().lower()
        for art in ("a ", "an ", "the "):
            if t.startswith(art):
                t = t[len(art):]
        return t


# ──────────────────────────────────────────────────────────────────────────────
# Configuration loader  (parses the YAML front-matter at the top of this file)
# ──────────────────────────────────────────────────────────────────────────────

def parse_node_configs() -> dict[str, NodeConfig]:
    """
    Re-parse the YAML header embedded in this source file so that
    the solver carries the full syllabus metadata without duplication.
    """
    import os, textwrap

    src = textwrap.dedent(__doc__) if __doc__ else ""
    # Fall back to reading the file directly
    if not src:
        try:
            with open(__file__) as fh:
                src = fh.read()
        except OSError:
            return {}

    configs: dict[str, NodeConfig] = {}
    current_id: str | None = None
    fields: dict[str, str] = {}
    in_nodes = False

    for raw_line in src.splitlines():
        line = raw_line.rstrip()

        if line.strip() == "--- NODE " + (current_id or "_"):
            continue

        node_m = re.match(r"^--- NODE\s+(\S+)\s*---\s*$", line)
        if node_m:
            if current_id and fields:
                configs[current_id] = NodeConfig(
                    node_id=current_id,
                    section=fields.get("SECTION", ""),
                    syllabus=fields.get("SYLLABUS", ""),
                    cognitive_level=fields.get("COGNITIVE_LEVEL", ""),
                    difficulty=fields.get("DIFFICULTY", ""),
                    exam_relevance=fields.get("EXAM_RELEVANCE", ""),
                    competency_level=fields.get("COMPETENCY_LEVEL", ""),
                    prereq_strength=fields.get("PREREQ_STRENGTH", ""),
                    mastery_criteria=fields.get("MASTERY_CRITERIA", ""),
                    is_root=fields.get("IS_ROOT", "false").lower() == "true",
                    prereq=fields.get("PREREQ"),
                )
            current_id = node_m.group(1)
            fields = {}
            continue

        if current_id:
            kv = re.match(r"^([A-Z_]+):\s*(.*)", line)
            if kv:
                fields[kv.group(1)] = kv.group(2).strip()

    # Flush last node
    if current_id and fields:
        configs[current_id] = NodeConfig(
            node_id=current_id,
            section=fields.get("SECTION", ""),
            syllabus=fields.get("SYLLABUS", ""),
            cognitive_level=fields.get("COGNITIVE_LEVEL", ""),
            difficulty=fields.get("DIFFICULTY", ""),
            exam_relevance=fields.get("EXAM_RELEVANCE", ""),
            competency_level=fields.get("COMPETENCY_LEVEL", ""),
            prereq_strength=fields.get("PREREQ_STRENGTH", ""),
            mastery_criteria=fields.get("MASTERY_CRITERIA", ""),
            is_root=fields.get("IS_ROOT", "false").lower() == "true",
            prereq=fields.get("PREREQ"),
        )

    return configs


# ──────────────────────────────────────────────────────────────────────────────
# Module-level convenience
# ──────────────────────────────────────────────────────────────────────────────

def batch_check(
    seed: int,
    checks: list[tuple[str, str, int, Any]],
) -> list[CheckResult]:
    """
    Run multiple answer checks at once.

    Parameters
    ----------
    seed   : int            random seed (for reproducibility)
    checks : list of tuples (node_id, section, q_num, answer)

    Returns
    -------
    list[CheckResult]
    """
    solver = ChemistrySolver(seed)
    return [solver.check(nid, sec, qn, ans) for nid, sec, qn, ans in checks]


# ──────────────────────────────────────────────────────────────────────────────
# Entry point
# ──────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Class 1 Chemistry Solver — verify student answers"
    )
    parser.add_argument("--seed",   type=int,   default=42,
                        help="Random seed (default: 42)")
    parser.add_argument("--node",   type=str,   default="c1_chem_001",
                        help="Node ID, e.g. c1_chem_001")
    parser.add_argument("--section",type=str,   default="mcq",
                        help="Section: fib, matching, true_false, mcq, short_answer")
    parser.add_argument("--q",      type=int,   default=1,
                        help="Question number (1-based)")
    parser.add_argument("--answer", type=str,   default="B",
                        help="Student's answer")
    args = parser.parse_args()

    solver = ChemistrySolver(args.seed)
    result = solver.check(args.node, args.section, args.q, args.answer)

    print(f"Node     : {args.node}")
    print(f"Section  : {args.section}")
    print(f"Q{args.q}   : answered '{args.answer}'")
    print(f"Correct  : {'YES ✓' if result.is_correct else 'NO ✗'}")
    print(f"Feedback : {result.feedback}")