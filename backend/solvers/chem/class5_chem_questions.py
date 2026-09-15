"""
Class 5 Chemistry Question Generator
Generates varied, exam-style questions with full step-by-step solutions.
Three nodes: c5_chem_001 | c5_chem_002 | c5_chem_003
"""

import random
import textwrap
from dataclasses import dataclass, field
from typing import List, Dict, Any, Tuple

from chem.class5_chem_solver import (
    MasterSolver, SolveResult, State, StateProperties,
    PROPERTIES, SOLID_EXAMPLES, LIQUID_EXAMPLES, GAS_EXAMPLES,
    MELTING_EXAMPLES, FREEZING_EXAMPLES, ChangeType,
)

# ──────────────────────────────────────────────
#  Configuration
# ──────────────────────────────────────────────

@dataclass
class GenConfig:
    seed:           int          = 42
    num_per_node:   int          = 4
    difficulty:     str          = "Easy"       # "Easy" | "Medium"
    competency:     str          = "School"     # School | Board
    include_steps:  bool         = True
    shuffle:        bool         = True

# ──────────────────────────────────────────────
#  Question templates
# ──────────────────────────────────────────────

# Node 1 templates
N1_TEMPLATES = [
    {
        "id": "n1_q01",
        "type": "identify_state",
        "prompt_factory": lambda item, _: (
            f"Look around you. '{item}' is all around us. "
            f"In which state of matter is it found — solid, liquid, or gas?"
        ),
        "params_factory": lambda seed: {"item": ""},
        "difficulty": "Easy",
    },
    {
        "id": "n1_q02",
        "type": "fill_properties",
        "prompt_factory": lambda state_str, seed: (
            f"Fill in the blanks: A {state_str} has ______ shape, "
            f"______ volume, and its particles are ______ packed together."
        ),
        "params_factory": lambda seed: {"state": ""},
        "difficulty": "Easy",
    },
    {
        "id": "n1_q03",
        "type": "is_air_matter",
        "prompt_factory": lambda *_: (
            "Many people say 'Air has no weight, so it is not matter.' "
            "Is this correct? Give a reason for your answer."
        ),
        "params_factory": lambda seed: {},
        "difficulty": "Medium",
    },
    {
        "id": "n1_q04",
        "type": "sort_items",
        "prompt_factory": lambda items, _: (
            f"Sort these items into solids, liquids, and gases:\n"
            f"{', '.join(items)}"
        ),
        "params_factory": lambda seed: {"items": []},
        "difficulty": "Easy",
    },
    {
        "id": "n1_q05",
        "type": "identify_state",
        "prompt_factory": lambda item, _: (
            f"Choose the correct state of matter for: a puff of smoke from a candle."
        ),
        "params_factory": lambda seed: {"item": "smoke"},
        "difficulty": "Easy",
        "mcq": True,
        "options": ["solid", "liquid", "gas", "plasma"],
    },
]

# Node 2 templates
N2_TEMPLATES = [
    {
        "id": "n2_q01",
        "type": "name_change",
        "prompt_factory": lambda fs, ts, _: (
            f"Water is a {fs}. When we heat it, it turns into a {ts}. "
            f"What is this change called?"
        ),
        "params_factory": lambda seed: {"from_state": "", "to_state": ""},
        "difficulty": "Easy",
    },
    {
        "id": "n2_q02",
        "type": "name_change",
        "prompt_factory": lambda fs, ts, _: (
            f"When steam (water vapour) touches a cold bathroom mirror, "
            f"it turns into tiny drops of water (a {ts}). "
            f"What is this change called? (The steam started as a {fs}.)"
        ),
        "params_factory": lambda seed: {"from_state": "gas", "to_state": "liquid"},
        "difficulty": "Medium",
    },
    {
        "id": "n2_q03",
        "type": "water_cycle",
        "prompt_factory": lambda stage, _: (
            f"Describe the change of state that occurs during: '{stage}'. "
            f"Name the change and state whether heating or cooling causes it."
        ),
        "params_factory": lambda seed: {"stage": ""},
        "difficulty": "Medium",
    },
    {
        "id": "n2_q04",
        "type": "change_table",
        "prompt_factory": lambda *_: (
            "Complete the table of changes of state:\n"
            "| Change       | From    | To      | Condition |\n"
            "|--------------|---------|---------|-----------|\n"
            "| Melting      | ?       | ?       | ?         |\n"
            "| Freezing     | ?       | ?       | ?         |\n"
            "| Evaporation  | ?       | ?       | ?         |\n"
            "| Condensation | ?       | ?       | ?         |"
        ),
        "params_factory": lambda seed: {},
        "difficulty": "Easy",
    },
    {
        "id": "n2_q05",
        "type": "condition",
        "prompt_factory": lambda ct, _: (
            f"What condition (heating or cooling) is needed for '{ct}'?"
        ),
        "params_factory": lambda seed: {"change_type": ""},
        "difficulty": "Easy",
    },
]

# Node 3 templates
N3_TEMPLATES = [
    {
        "id": "n3_q01",
        "type": "direction",
        "prompt_factory": lambda fs, ts, _: (
            f"When a {fs} becomes a {ts}, is the substance being heated or cooled? "
            f"What is this change called?"
        ),
        "params_factory": lambda seed: {"from_state": "", "to_state": ""},
        "difficulty": "Easy",
    },
    {
        "id": "n3_q02",
        "type": "example",
        "prompt_factory": lambda change, example, _: (
            f"Give one example of {change} from everyday life and name what "
            f"the substance becomes after the change."
        ),
        "params_factory": lambda seed: {"change": ""},
        "difficulty": "Easy",
    },
    {
        "id": "n3_q03",
        "type": "temp_test",
        "prompt_factory": lambda substance, cur_t, mp, _: (
            f"The melting point of {substance} is {mp}°C. "
            f"It is currently at {cur_t}°C. "
            f"In which state is it? Name the change that would occur to bring it "
            f"to the other state."
        ),
        "params_factory": lambda seed: {"substance": "", "current_temp": 0},
        "difficulty": "Medium",
    },
    {
        "id": "n3_q04",
        "type": "reversible",
        "prompt_factory": lambda *_: (
            "Is melting a reversible change? Explain your answer using the example of ice and water."
        ),
        "params_factory": lambda seed: {},
        "difficulty": "Medium",
    },
    {
        "id": "n3_q05",
        "type": "everyday",
        "prompt_factory": lambda obs, _: (
            f"Sita observed: '{obs}'. "
            f"What change of state is this? (Use the words melting or freezing.)"
        ),
        "params_factory": lambda seed: {"observation": ""},
        "difficulty": "Easy",
    },
    {
        "id": "n3_q06",
        "type": "which_temp",
        "prompt_factory": lambda mp_c, mp_k, _: (
            f"At what temperature does melting take place? "
            f"(Give the answer in °C and in Kelvin.)"
        ),
        "params_factory": lambda seed: {"melting_point_c": 0},
        "difficulty": "Medium",
    },
]

# ──────────────────────────────────────────────
#  Step-by-step solution writer
# ──────────────────────────────────────────────

class StepWriter:
    """Formats solver output into student-friendly step-by-step solutions."""

    @staticmethod
    def n1_identify(result: dict) -> str:
        return textwrap.dedent(f"""
        **Step 1 — Look at the properties**
        The item is: {result['given']}
        Shape:     {result['shape']}
        Volume:    {result['volume']}
        Flows:     {result['flow']}

        **Step 2 — Recall the three states**
        - Solid  → fixed shape, fixed volume, does not flow.
        - Liquid → no fixed shape, fixed volume, flows.
        - Gas    → no fixed shape, no fixed volume, spreads out.

        **Step 3 — Match**
        {result['reasoning']}

        ✅ **Answer: {result['answer'].upper()}**""").strip()

    @staticmethod
    def n1_fill(result: dict) -> str:
        b = result["blanks"]
        return textwrap.dedent(f"""
        **Step 1 — Recall the properties of a {result['question_filled'].split()[1]}**

        | Property | Value |
        |----------|-------|
        | Shape    | {b['shape']} |
        | Volume   | {b['volume']} |
        | Particles| {b['particles']} |
        | Flows    | {b['flow']} |

        ✅ **Completed sentence:** {result['question_filled']}""").strip()

    @staticmethod
    def n1_air(result: dict) -> str:
        return textwrap.dedent(f"""
        **Step 1 — What is matter?**
        Matter is anything that has **weight** and **takes up space**.

        **Step 2 — Does air have weight?**
        Yes. We feel the push of wind. A balloon filled with air is heavier than an
        empty balloon.

        **Step 3 — Does air take up space?**
        Yes. When you squeeze a balloon, air resists because it occupies space.

        **Step 4 — Conclusion**
        {result['reasoning']}

        ✅ **Answer: {result['answer']}**""").strip()

    @staticmethod
    def n1_sort(result: dict) -> str:
        lines = ["**Sorted items:**"]
        for state, items in result["sorted"].items():
            if items:
                lines.append(f"- **{state.upper()}**: {', '.join(items)}")
        return "\n".join(lines)

    @staticmethod
    def n2_name(result: dict) -> str:
        return textwrap.dedent(f"""
        **Step 1 — Identify the starting and ending states**
        {result['from_state'].capitalize()} → {result['to_state'].capitalize()}

        **Step 2 — Find the change name**
        {result['reasoning']}

        ✅ **Answer: {result['change'].upper()}** — caused by {result['condition']}""").strip()

    @staticmethod
    def n2_water(result: dict) -> str:
        return textwrap.dedent(f"""
        **Step 1 — Identify the stage:** {result['stage']}

        **Step 2 — Match to a change**
        {result['change'].capitalize()}: {result['from_state'].capitalize()} → {result['to_state'].capitalize()}

        ✅ **Answer: {result['change'].upper()}**""").strip()

    @staticmethod
    def n2_condition(result: dict) -> str:
        return textwrap.dedent(f"""
        **Step 1 — Recall the change table**

        | Change       | Requires |
        |--------------|----------|
        | Melting      | Heating  |
        | Freezing     | Cooling  |
        | Evaporation  | Heating  |
        | Condensation | Cooling  |

        {result['explanation']}

        ✅ **Answer: {result['condition'].upper()}**""").strip()

    @staticmethod
    def n3_direction(result: dict) -> str:
        return textwrap.dedent(f"""
        **Step 1 — Identify the change**
        {result['change'].capitalize()} (solid → liquid or liquid → solid)

        **Step 2 — What causes it?**
        {result['reasoning']}

        ✅ **Answer: {result['change'].upper()} by {result['condition'].upper()}**""").strip()

    @staticmethod
    def n3_example(result: dict) -> str:
        return textwrap.dedent(f"""
        **Step 1 — Think of a common example**

        {result['explanation']}

        ✅ **Answer: {result['substance'].capitalize()} → {result['product']}**""").strip()

    @staticmethod
    def n3_temp(result: dict) -> str:
        return textwrap.dedent(f"""
        **Step 1 — Read the values**
        Melting point of {result['substance']} = {result['melting_point_c']}°C
        Current temperature             = {result['current_temp_c']}°C

        **Step 2 — Compare**
        {result['reasoning']}

        **Step 3 — Name the change needed to switch states**
        {result['change_occurring'].capitalize()}

        ✅ **Answer:** Currently a **{result['state'].upper()}**.""").strip()

    @staticmethod
    def n3_reversible(result: dict) -> str:
        return textwrap.dedent(f"""
        **Step 1 — What happens to ice when heated?**
        {result['forward']['change'].capitalize()} — ice → water at {0}°C.

        **Step 2 — What happens to water when cooled?**
        {result['backward']['change'].capitalize()} — water → ice at {0}°C.

        **Step 3 — Can the change be reversed?**
        Yes! Heat water back and it melts again (or in this case, if water is cooled it freezes).

        {result['explanation']}

        ✅ **Answer: Yes, melting and freezing are reversible changes.**""").strip()

    @staticmethod
    def n3_everyday(result: dict) -> str:
        return textwrap.dedent(f"""
        **Step 1 — Read the observation**
        "{result['observation']}"

        **Step 2 — Does the substance become more liquid-like or more solid-like?**
        {result['explanation']}

        ✅ **Answer: {result['change'].upper()}**""").strip()

    @staticmethod
    def n3_which_temp(result: dict) -> str:
        return textwrap.dedent(f"""
        **Step 1 — Recall the melting point**
        Melting point = {result['melting_point_c']}°C

        **Step 2 — Convert to Kelvin (optional at Class 5, shown for completeness)**
        K = °C + 273 = {result['melting_point_k']} K

        {result['explanation']}

        ✅ **Answer: Melting occurs at {result['melting_point_c']}°C ({result['melting_point_k']} K).**""").strip()


# ──────────────────────────────────────────────
#  Question Generator
# ──────────────────────────────────────────────

class QuestionGenerator:
    def __init__(self, config: GenConfig = None):
        self.config = config or GenConfig()
        self.solver = MasterSolver(seed=self.config.seed)
        self._rng = random.Random(self.config.seed)

    # ── Internal: pick and populate a template ──

    def _generate_one(self, templates: list, node_id: str,
                      used_types: set) -> Tuple[Dict[str, Any], SolveResult]:
        """Pick a template not yet used (preferring variety), fill params, solve."""
        available = [t for t in templates if t["type"] not in used_types]
        if not available:
            available = templates  # allow repeats if exhausted

        tmpl  = self._rng.choice(available)
        used_types.add(tmpl["type"])

        # Build params deterministically
        params = dict(tmpl["params_factory"](self.config.seed))

        if tmpl["type"] == "identify_state":
            params["item"] = _pick(SOLID_EXAMPLES + LIQUID_EXAMPLES + GAS_EXAMPLES,
                                   self.config.seed, 0)
        elif tmpl["type"] == "fill_properties":
            params["state"] = _pick(["solid", "liquid", "gas"], self.config.seed, 1)
        elif tmpl["type"] == "sort_items":
            items = (
                _shuffle(SOLID_EXAMPLES, self.config.seed)[:3] +
                _shuffle(LIQUID_EXAMPLES, self.config.seed + 1)[:2] +
                _shuffle(GAS_EXAMPLES, self.config.seed + 2)[:2]
            )
            params["items"] = items
        elif tmpl["type"] in ("name_change", "direction"):
            pairs = [("solid", "liquid"), ("liquid", "solid"),
                     ("liquid", "gas"), ("gas", "liquid")]
            params["from_state"], params["to_state"] = _pick(
                pairs, self.config.seed, hash(tmpl["type"]) % 10)
        elif tmpl["type"] == "water_cycle":
            stages = list({
                "ice melting in the sun", "water boiling in a kettle",
                "steam on a cold window", "puddle freezing at night",
                "clouds forming",
            })
            params["stage"] = _pick(stages, self.config.seed, 3)
        elif tmpl["type"] == "condition":
            params["change_type"] = _pick(
                ["melting", "freezing", "evaporation", "condensation"],
                self.config.seed, 4)
        elif tmpl["type"] == "example":
            params["change"] = _pick(["melting", "freezing"], self.config.seed, 5)
        elif tmpl["type"] == "temp_test":
            substance = _pick(["ice", "chocolate", "butter"], self.config.seed, 6)
            mp        = 0 if substance == "ice" else (32 if substance == "butter" else 35)
            cur_t     = self._rng.choice([-5, 10, 25, 50])
            params["substance"]    = substance
            params["current_temp"] = cur_t
        elif tmpl["type"] == "which_temp":
            params["melting_point_c"] = _pick([0, 28, 35, 60], self.config.seed, 7)
        elif tmpl["type"] == "everyday":
            obs_list = [
                "The butter became soft and runny on a hot day.",
                "The puddle turned to ice on a cold winter morning.",
                "The wax candle melted near the flame.",
                "The water in the glass turned to ice in the freezer.",
            ]
            params["observation"] = _pick(obs_list, self.config.seed, 8)

        # Solve
        result = self.solver.solve(node_id, tmpl["type"], params)

        # Build the full question dict
        question = {
            "id":        tmpl["id"],
            "node":      node_id,
            "type":      tmpl["type"],
            "difficulty": tmpl["difficulty"],
            "question":  tmpl["prompt_factory"](**self._unwrap_params(tmpl, params)),
            "mcq":       tmpl.get("mcq", False),
            "options":   tmpl.get("options", []),
        }

        return question, result

    @staticmethod
    def _unwrap_params(tmpl, params):
        """Map template prompt args to actual values."""
        if tmpl["type"] in ("identify_state",):
            return {"item": params["item"], "_": 0}
        if tmpl["type"] == "fill_properties":
            return {"state_str": params["state"], "seed": 0}
        if tmpl["type"] in ("name_change", "direction"):
            return {"fs": params["from_state"], "ts": params["to_state"], "_": 0}
        if tmpl["type"] == "water_cycle":
            return {"stage": params["stage"], "_": 0}
        if tmpl["type"] == "condition":
            return {"ct": params["change_type"], "_": 0}
        if tmpl["type"] == "example":
            # need both change and example tuple
            return {"change": params["change"],
                    "example": MELTING_EXAMPLES[0] if params["change"] == "melting" else FREEZING_EXAMPLES[0],
                    "_": 0}
        if tmpl["type"] == "temp_test":
            return {"substance": params["substance"], "cur_t": params["current_temp"],
                    "mp": 0, "_": 0}
        if tmpl["type"] == "which_temp":
            return {"mp_c": params["melting_point_c"], "mp_k": params["melting_point_c"] + 273, "_": 0}
        if tmpl["type"] == "everyday":
            return {"obs": params["observation"], "_": 0}
        return {"_": 0}

    # ── Solution formatter ──

    def _format_solution(self, node_id: str, qtype: str, result: dict) -> str:
        writer = StepWriter()
        fmt = {
            # N1
            "identify_state": writer.n1_identify,
            "fill_properties": writer.n1_fill,
            "is_air_matter":   writer.n1_air,
            "sort_items":      writer.n1_sort,
            # N2
            "name_change":     writer.n2_name,
            "water_cycle":     writer.n2_water,
            "condition":       writer.n2_condition,
            # N3
            "direction":       writer.n3_direction,
            "example":         writer.n3_example,
            "temp_test":       writer.n3_temp,
            "reversible":      writer.n3_reversible,
            "everyday":        writer.n3_everyday,
            "which_temp":      writer.n3_which_temp,
        }
        formatter = fmt.get(qtype)
        if formatter is None:
            return str(result)
        return formatter(result)

    # ── Public API ──

    def generate_for_node(self, node_id: str, n: int = None) -> List[Dict[str, Any]]:
        """Generate `n` questions for a specific node."""
        n = n or self.config.num_per_node
        template_map = {
            "c5_chem_001": N1_TEMPLATES,
            "c5_chem_002": N2_TEMPLATES,
            "c5_chem_003": N3_TEMPLATES,
        }
        templates = template_map[node_id]
        used_types: set = set()
        questions: list = []

        for _ in range(n):
            q, result = self._generate_one(templates, node_id, used_types)
            soln = self._format_solution(node_id, q["type"], result) if self.config.include_steps else ""
            questions.append({
                "id":         q["id"],
                "node":       q["node"],
                "type":       q["type"],
                "difficulty": q["difficulty"],
                "question":   q["question"],
                "mcq":        q.get("mcq", False),
                "options":    q.get("options", []),
                "solution":   soln,
                "verified":   result.get("verified", True) if isinstance(result, dict) else True,
                "raw_answer": result.get("answer", result.get("change", "")),
            })

        if self.config.shuffle:
            self._rng.shuffle(questions)
        return questions

    def generate_all(self, n_per_node: int = None) -> Dict[str, List[Dict[str, Any]]]:
        """Generate questions for all 3 nodes."""
        n_per_node = n_per_node or self.config.num_per_node
        return {
            "c5_chem_001": self.generate_for_node("c5_chem_001", n_per_node),
            "c5_chem_002": self.generate_for_node("c5_chem_002", n_per_node),
            "c5_chem_003": self.generate_for_node("c5_chem_003", n_per_node),
        }

    def generate_worksheet(self) -> str:
        """Return a formatted worksheet string."""
        all_q = self.generate_all()
        lines = ["=" * 70,
                 "  CLASS 5 CHEMISTRY — WORKSHEET",
                 "  Topics: States of Matter | Interconversion | Melting & Freezing",
                 "=" * 70, ""]

        node_titles = {
            "c5_chem_001": "A. Revision of Solids, Liquids and Gases",
            "c5_chem_002": "B. Interconversion of States of Matter",
            "c5_chem_003": "C. Melting and Freezing",
        }

        for node_id, questions in all_q.items():
            lines.append(f"\n{'─' * 70}")
            lines.append(f"  {node_titles.get(node_id, node_id)}")
            lines.append(f"{'─' * 70}")
            for i, q in enumerate(questions, 1):
                lines.append(f"\nQ{i}. [{q['difficulty']}] ({q['type']})")
                lines.append(f"   {q['question']}")
                if q["mcq"] and q["options"]:
                    for opt_idx, opt in enumerate(q["options"]):
                        lines.append(f"   ({chr(65 + opt_idx)}) {opt}")
                lines.append("")
                if self.config.include_steps:
                    for sol_line in q["solution"].split("\n"):
                        lines.append(f"   {sol_line}")
                    lines.append("")

        lines.append("\n" + "=" * 70)
        lines.append("  END OF WORKSHEET")
        lines.append("=" * 70)
        return "\n".join(lines)


# ──────────────────────────────────────────────
#  Answer-key only mode (for teacher use)
# ──────────────────────────────────────────────

class AnswerKeyGenerator:
    def __init__(self, config: GenConfig = None):
        self.config = config or GenConfig()
        self.gen = QuestionGenerator(config)

    def generate(self, n_per_node: int = None) -> str:
        n_per_node = n_per_node or self.config.num_per_node
        all_q    = self.gen.generate_all(n_per_node)
        lines    = ["CLASS 5 CHEMISTRY — ANSWER KEY", "=" * 50, ""]

        for node_id, questions in all_q.items():
            node_label = {
                "c5_chem_001": "Revision of solids, liquids and gases",
                "c5_chem_002": "Interconversion of states of matter",
                "c5_chem_003": "Melting and Freezing",
            }.get(node_id, node_id)
            lines.append(f"\n{'─' * 50}")
            lines.append(f"  Section: {node_label}")
            lines.append(f"{'─' * 50}")
            for i, q in enumerate(questions, 1):
                lines.append(f"\nQ{i}. [{q['difficulty']}]  Type: {q['type']}")
                lines.append(f"    Answer: {q['raw_answer']}")
                lines.append(f"    Verified: {'✓' if q['verified'] else '?'}")

        lines.append("")
        return "\n".join(lines)


# ──────────────────────────────────────────────
#  CLI entry-point
# ──────────────────────────────────────────────

if __name__ == "__main__":
    import sys

    seed     = int(sys.argv[1]) if len(sys.argv) > 1 else 42
    per_node = int(sys.argv[2]) if len(sys.argv) > 2 else 3
    mode     = sys.argv[3] if len(sys.argv) > 3 else "worksheet"

    cfg  = GenConfig(seed=seed, num_per_node=per_node, include_steps=True)
    gen  = QuestionGenerator(cfg)

    if mode == "answer_key":
        key = AnswerKeyGenerator(cfg).generate(per_node)
        print(key)
    elif mode == "json":
        import json
        data = gen.generate_all(per_node)
        print(json.dumps(data, indent=2))
    else:
        ws = gen.generate_worksheet()
        print(ws)



### Architecture overview

