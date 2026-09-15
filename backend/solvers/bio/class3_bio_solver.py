"""
Class 3 Biology Solver
Nodes: c3_bio_001, c3_bio_002, c3_bio_003
Handles: Living/Non-living, Internal Organs, Respiratory System
"""

from __future__ import annotations
import re
from dataclasses import dataclass, field
from typing import Optional

# ──────────────────────────────────────────────────────────────────────────────
# Knowledge Bases
# ──────────────────────────────────────────────────────────────────────────────

KB_LIVING = {
    "features": {
        "living": ["grow on their own", "need food and water", "breathe",
                    "move on their own", "reproduce (have babies/seeds)", "die"],
        "nonliving": ["do not grow on their own", "do not need food or water",
                       "do not breathe on their own", "do not reproduce"],
    },
    "examples_living": [
        "cat", "dog", "cow", "elephant", "sparrow", "crow", "fish",
        "mango tree", "rose plant", "grass", "sunflower", "human",
        "rabbit", "butterfly", "ant", "frog", "parrot",
    ],
    "examples_nonliving": [
        "stone", "rock", "chair", "table", "book", "pen", "ball",
        "car", "toy", "water", "mountain", "cloud", "door", "cup",
        "road", "bridge", "building",
    ],
    "common_confusions": {
        "plant": "Grows on its own, needs water and sunlight, produces seeds — it is living.",
        "water": "Water flows but does not grow or need food on its own — it is non-living.",
        "moving car": "Moves only because an engine pushes it — it does not move on its own — non-living.",
        "cloud": "Moves with wind but does not grow or eat — non-living.",
        "seed": "Can grow into a plant and needs water — living.",
    },
}

KB_ORGANS = {
    "facts": {
        "heart": {
            "location": "on the left side of the chest",
            "function": "pumps blood to all parts of the body",
            "analogy": "a water pump",
        },
        "lungs": {
            "location": "inside the chest (thorax), one on each side of the heart",
            "function": "help in breathing — take in oxygen and give out carbon dioxide",
            "analogy": "two balloons",
        },
        "stomach": {
            "location": "in the upper abdomen (tummy area), below the chest",
            "function": "digests food — churns food into a soft paste",
            "analogy": "a mixing bowl",
        },
        "liver": {
            "location": "in the upper right part of the abdomen",
            "function": "cleans the blood and helps in digestion",
            "analogy": "a chemical factory",
        },
        "kidneys": {
            "location": "at the back of the abdomen, one on each side of the spine",
            "function": "clean the blood by filtering out waste",
            "analogy": "two water filters",
        },
        "brain": {
            "location": "inside the skull (head), protected by the skull bones",
            "function": "controls all body actions, thoughts, and feelings",
            "analogy": "a computer CPU",
        },
        "intestines": {
            "location": "in the abdomen, below the stomach",
            "function": "absorb nutrients from digested food",
            "analogy": "a long winding tube",
        },
    },
}

KB_RESPIRATORY = {
    "facts": {
        "nose": {
            "function": "takes in air and filters out dust particles",
            "analogy": "an air filter",
        },
        "windpipe": {
            "aliases": ["trachea"],
            "function": "carries air from the nose down to the lungs",
            "analogy": "a tunnel",
        },
        "lungs": {
            "function": "take in oxygen from air and give out carbon dioxide",
            "analogy": "two balloons",
        },
    },
    "air_path": ["nose", "windpipe (trachea)", "lungs"],
    "health_tips": [
        "breathe clean air — avoid smoky places",
        "do deep breathing exercises daily",
        "cover mouth and nose in dusty places",
        "avoid smoking and second-hand smoke",
        "wash hands before eating",
    ],
}

NODE_META = {
    "c3_bio_001": {
        "title": "Living and Non-Living Things",
        "section": "1 — Living and Non-Living",
        "competency": ["Name 3 features of living things",
                        "Sort 5 objects into living or non-living",
                        "Give one example each of living and non-living"],
        "difficulty": "Easy",
        "exam": "Board_Only",
    },
    "c3_bio_002": {
        "title": "Internal Organs of the Human Body",
        "section": "2 — Human Body",
        "competency": ["Name at least 4 internal organs",
                        "Say where one organ is located",
                        "Tell one function of the heart or stomach"],
        "difficulty": "Medium",
        "exam": "Board_Only",
    },
    "c3_bio_003": {
        "title": "Respiratory System Organs",
        "section": "2 — Human Body",
        "competency": ["Name the 3 main respiratory organs",
                        "Point to nose and chest on own body",
                        "Say one job of the lungs"],
        "difficulty": "Medium",
        "exam": "Board_Only",
    },
}

# ──────────────────────────────────────────────────────────────────────────────
# Solver
# ──────────────────────────────────────────────────────────────────────────────

@dataclass
class Solution:
    node_id: str
    topic: str
    question_type: str
    difficulty: str
    competency: list[str]
    answer: str
    reasoning: list[dict]
    verification: str
    source_section: str

class BioSolver:
    """Rule-based solver for Class 3 Biology questions."""

    def __init__(self, question_text: str = ""):
        self.question_text = question_text
        self.node_id: Optional[str] = None
        self.kb: dict = {}
        self.meta: dict = {}

    # ── Node routing ──────────────────────────────────────────────────────────

    def set_node(self, node_id: str) -> None:
        self.node_id = node_id
        if node_id == "c3_bio_001":
            self.kb = KB_LIVING
        elif node_id == "c3_bio_002":
            self.kb = KB_ORGANS
        elif node_id == "c3_bio_003":
            self.kb = KB_RESPIRATORY
        self.meta = NODE_META.get(node_id, {})

    # ── Classify question ──────────────────────────────────────────────────────

    def classify(self, text: str) -> str:
        t = text.lower()
        # Respiratory keywords
        if any(w in t for w in ["breathe", "breathing", "air path", "nose to",
                                  "oxygen", "carbon dioxide", "windpipe",
                                  "respiratory", "lungs and"]):
            return "respiratory"
        # Organ keywords (must check before living to avoid false matches)
        organ_kw = ["heart", "stomach", "liver", "kidney", "brain", "intestine",
                     "internal organ", "pumps blood", "mixing bowl"]
        if any(w in t for w in organ_kw):
            return "organ"
        # Living / non-living
        if any(w in t for w in ["living", "non-living", "nonliving",
                                  "alive", "grow", "breathe", "reproduce",
                                  "sort", "living thing", "living or"]):
            return "living"
        return "living"  # default for class 3 biology

    # ── Main solve entry point ─────────────────────────────────────────────────

    def solve(self, node_id: str, question_text: str) -> Solution:
        self.question_text = question_text
        self.set_node(node_id)
        qtype = self.classify(question_text)

        if qtype == "living":
            answer, reasoning = self._solve_living(question_text)
        elif qtype == "organ":
            answer, reasoning = self._solve_organ(question_text)
        else:
            answer, reasoning = self._solve_respiratory(question_text)

        return Solution(
            node_id=node_id,
            topic=self.meta.get("title", ""),
            question_type=qtype,
            difficulty=self.meta.get("difficulty", ""),
            competency=self.meta.get("competency", []),
            answer=answer,
            reasoning=reasoning,
            verification=self._verify(node_id, qtype, answer),
            source_section=self.meta.get("section", ""),
        )

    # ── Living / Non-Living ────────────────────────────────────────────────────

    def _is_living_yn(self, item: str) -> str:
        if item in self.kb["examples_living"]:
            return "yes"
        if item in self.kb["examples_nonliving"]:
            return "no"
        # heuristic: things that grow, have babies, eat, breathe → living
        living_indicators = ["tree", "plant", "flower", "grass", "cat", "dog",
                              "cow", "bird", "fish", "frog", "butterfly", "ant",
                              "human", "boy", "girl", "man", "woman", "baby",
                              "elephant", "lion", "rabbit", "parrot", "sparrow"]
        if any(item.startswith(p) or item == p for p in living_indicators):
            return "yes"
        return "no"

    def _living_features(self, category: str) -> list[str]:
        return self.kb["features"].get(category, [])

    def _sort_item(self, item: str) -> dict:
        is_living = self._is_living_yn(item) == "yes"
        reasons = self.kb["common_confusions"].get(
            item.lower(),
            (self._living_features("living") if is_living
             else self._living_features("nonliving"))[:2],
        )
        if isinstance(reasons, list):
            reasons_text = "; ".join(reasons[:2])
        else:
            reasons_text = reasons
        return {
            "item": item,
            "category": "Living" if is_living else "Non-Living",
            "reasons": reasons_text,
        }

    def _living_analogy(self, item: str) -> str:
        item_l = item.lower()
        if item_l in ("plant", "tree", "mango tree", "rose plant", "grass"):
            return (
                "A plant is like a silent friend: it is alive — it grows, "
                "breathes (takes in CO2, gives O2), and needs water even "
                "though it does not talk or walk."
            )
        if item_l in ("clock", "running clock"):
            return (
                "A clock is like a living thing: it moves (hands tick), "
                "needs energy (battery/electricity) to keep going — but it "
                "does NOT grow or reproduce, so it is actually non-living."
            )
        if item_l in ("stone", "rock"):
            return (
                "A stone is like a statue: it stays the same, does not grow, "
                "and does not need food — it is non-living."
            )
        if item_l in ("car", "toy car"):
            return (
                "A toy car is like a non-living thing: it moves only when we "
                "push it and does not grow on its own."
            )
        is_l = self._is_living_yn(item) == "yes"
        if is_l:
            return (
                f"{item.title()} is living: it grows on its own, needs food/water, "
                "and reproduces."
            )
        return f"{item.title()} is non-living: it does not grow or need food on its own."

    def _solve_living(self, text: str) -> tuple[str, list[dict]]:
        t = text.lower()

        if "living" in t and "non-living" in t:
            return self._living_is_living_qna(t)

        if "sort" in t or "classify" in t:
            return self._living_sort(t)

        if "example" in t and "living" in t:
            return self._living_example(t)

        if "analogy" in t or "like a" in t or "why is" in t:
            return self._living_analogy_q(text)

        return self._living_is_living_qna(t)

    def _living_is_living_qna(self, t: str) -> tuple[str, list[dict]]:
        # extract candidate noun phrase
        patterns = [
            r"is\s+(?:a\s+)?(.+?)\s+(?:living|a living)",
            r"living\s+(?:or\s+)?non-living[:\s]+(.+?)[\s?]*$",
            r"(?:a|an|the)\s+(\w+(?:\s+\w+){0,2})\s+(?:is|are)\s+(?:living|non)",
        ]
        item = None
        for p in patterns:
            m = re.search(p, t)
            if m:
                item = m.group(1).strip().rstrip(".")
                break
        if not item:
            # fallback: grab last 2-3 words after "living"
            m2 = re.search(r"living[^?]*[?]?\s*[-–:]?\s*(?:is\s+)?(.+?)[\s?]*$", t)
            item = m2.group(1).strip().rstrip(".") if m2 else None
        if not item:
            return ("Cannot determine the item. Please name the object clearly.",
                    [{"step": 0, "text": "The item name is unclear in the question."}])
        result = self._is_living_yn(item)
        label = "Living" if result == "yes" else "Non-Living"
        steps = self._living_reasoning(item, result)
        ans = f"{item.title()} is a {label} thing."
        return ans, steps

    def _living_reasoning(self, item: str, result: str) -> list[dict]:
        features = self._living_features("living") if result == "yes" else self._living_features("nonliving")
        steps = [
            {"step": 1, "text": f"Consider the item: '{item}'."},
            {"step": 2, "text": f"Living things have features: {', '.join(features[:3])}."},
            {"step": 3, "text": f"Check if '{item}' shows these features."},
            {"step": 4, "text": f"{item.title()} {'DOES' if result=='yes' else 'DOES NOT'} match the features of living things."},
            {"step": 5, "text": f"Conclusion: '{item.title()}' is {'Living' if result=='yes' else 'Non-Living'}."},
            {"step": 6, "text": "VERIFICATION: Ask — Does it grow on its own? Need food/water? Breathe? "
                                 "Reproduce? If YES to all → Living; otherwise → Non-Living."},
        ]
        return steps

    def _living_sort(self, t: str) -> tuple[str, list[dict]]:
        candidates = []
        for ex in self.kb["examples_living"] + self.kb["examples_nonliving"]:
            if ex in t:
                candidates.append(ex)
        if not candidates:
            candidates = ["cat", "stone", "plant", "toy car", "fish"]
        results = [self._sort_item(c) for c in candidates[:5]]
        lines = [f"• {r['item']} → {r['category']} ({r['reasons']})" for r in results]
        steps = [
            {"step": 1, "text": "We will check each object against the features of living things."},
            {"step": 2, "text": "Living things: grow, need food/water, breathe, reproduce."},
            *[{"step": i + 3, "text": line} for i, line in enumerate(lines)],
        ]
        ans = "Sorted results:\n" + "\n".join(lines)
        return ans, steps

    def _living_example(self, t: str) -> tuple[str, list[dict]]:
        if "non" in t:
            example, category = "stone", "Non-Living"
            reason = "It does not grow or need food on its own."
        else:
            example, category = "mango tree", "Living"
            reason = "It grows, needs water, and gives fruit."
        steps = [
            {"step": 1, "text": f"An example of a {category.lower()} thing is a {example}."},
            {"step": 2, "text": reason},
            {"step": 3, "text": f"VERIFICATION: {example} shows features of {category.lower()} things."},
        ]
        return f"Example of {category}: {example}. {reason}", steps

    def _living_analogy_q(self, text: str) -> tuple[str, list[dict]]:
        # extract the item being compared
        m = re.search(r"(?:is\s+)?(?:like\s+)?(?:a\s+)?(\w+(?:\s+\w+){0,3})", text)
        item = m.group(1).strip() if m else "it"
        explanation = self._living_analogy(item)
        steps = [
            {"step": 1, "text": f"The question compares '{item}' to a living or non-living thing."},
            {"step": 2, "text": f"Living things: grow, need food/water, breathe, reproduce."},
            {"step": 3, "text": f"'{item}' is checked against these features."},
            {"step": 4, "text": explanation},
            {"step": 5, "text": "VERIFICATION: Confirm the feature matches are correct."},
        ]
        return explanation, steps

    # ── Organs ─────────────────────────────────────────────────────────────────

    def _organ_function(self, organ: str) -> str:
        organ = organ.lower().strip()
        mapping = {
            "heart": "pumps blood to all parts of the body",
            "lungs": "help in breathing — take in oxygen and give out carbon dioxide",
            "stomach": "digests food by churning it into a soft paste",
            "liver": "cleans the blood and helps digest food",
            "kidneys": "clean the blood by filtering out waste",
            "brain": "controls all body actions, thoughts, and feelings",
            "intestines": "absorb nutrients from digested food",
        }
        for k, v in mapping.items():
            if k in organ:
                return v
        return "has an important function in the body"

    def _organ_location(self, organ: str) -> str:
        organ = organ.lower().strip()
        mapping = {
            "heart": "left side of the chest",
            "lungs": "inside the chest (thorax), one on each side of the heart",
            "stomach": "upper abdomen (tummy area), below the chest",
            "liver": "upper right part of the abdomen",
            "kidneys": "back of the abdomen, one on each side of the spine",
            "brain": "inside the skull (head), protected by skull bones",
            "intestines": "in the abdomen, below the stomach",
        }
        for k, v in mapping.items():
            if k in organ:
                return v
        return "inside the body"

    def _organ_analogy(self, organ: str) -> str:
        organ = organ.lower().strip()
        mapping = {
            "heart": "a water pump — it pumps blood to every part of the body",
            "lungs": "two balloons — they fill with air when we breathe in and empty when we breathe out",
            "stomach": "a mixing bowl — it churns and mixes food until it becomes a soft paste",
            "brain": "a computer CPU — it controls everything the body does",
            "kidneys": "two water filters — they clean waste from the blood",
            "liver": "a chemical factory — it processes nutrients and cleans blood",
            "intestines": "a long winding tube — food moves through it to be digested",
        }
        for k, v in mapping.items():
            if k in organ:
                return v
        return "an important body part"

    def _detect_organ(self, text: str) -> str | None:
        t = text.lower()
        for organ in ["heart", "lungs", "stomach", "liver", "kidney",
                       "brain", "intestine", "intestines"]:
            if organ in t:
                return organ
        return None

    def _solve_organ(self, text: str) -> tuple[str, list[dict]]:
        organ = self._detect_organ(text)
        if not organ:
            return (
                "Please name the organ in your question.",
                [{"step": 1, "text": "No specific organ detected in the question text."}],
            )

        t = text.lower()
        func = self._organ_function(organ)
        loc = self._organ_location(organ)
        analogy = self._organ_analogy(organ)

        if "where" in t and "located" in t:
            steps = [
                {"step": 1, "text": f"The organ asked about is the {organ}."},
                {"step": 2, "text": f"From our knowledge: the {organ} is located in the {loc}."},
                {"step": 3, "text": "VERIFICATION: Touch your chest/abdomen to confirm organ positions."},
            ]
            return f"The {organ} is located in the {loc}.", steps

        if "analogy" in t or "like a" in t or "like an" in t:
            steps = [
                {"step": 1, "text": f"The organ is the {organ}."},
                {"step": 2, "text": f"The {organ} is like {analogy}."},
                {"step": 3, "text": f"VERIFICATION: This analogy helps remember the function of the {organ}."},
            ]
            return f"The {organ} is like {analogy}.", steps

        if any(w in t for w in ["which organ", "what organ", "name the organ"]):
            if "pump" in t or "pumps blood" in t:
                steps = [
                    {"step": 1, "text": "Look for the organ that pumps blood."},
                    {"step": 2, "text": f"That organ is the heart. Its function: {func}."},
                    {"step": 3, "text": "VERIFICATION: The heart beats — feel your pulse."},
                ]
                return f"The heart. It {func}.", steps
            if "filter" in t or "clean" in t:
                steps = [
                    {"step": 1, "text": "Look for the organ that filters blood."},
                    {"step": 2, "text": f"That organ is the kidneys. Their function: {func}."},
                    {"step": 3, "text": "VERIFICATION: Kidneys produce urine — they remove waste."},
                ]
                return f"The kidneys. They {func}.", steps
            if "control" in t:
                steps = [
                    {"step": 1, "text": "Look for the organ that controls the body."},
                    {"step": 2, "text": f"That organ is the brain. Its function: {func}."},
                    {"step": 3, "text": "VERIFICATION: Without the brain, we cannot think or move."},
                ]
                return f"The brain. It {func}.", steps

        # default: function question
        steps = [
            {"step": 1, "text": f"Identify the organ: {organ}."},
            {"step": 2, "text": f"Recall its location: {loc}."},
            {"step": 3, "text": f"Recall its main function: {func}."},
            {"step": 4, "text": f"Analogy helps remember: the {organ} is like {analogy}."},
            {"step": 5, "text": f"VERIFICATION: {organ.title()} → location: {loc}; function: {func}."},
        ]
        return f"The {organ} is in the {loc}. It {func}.", steps

    # ── Respiratory ────────────────────────────────────────────────────────────

    def _solve_respiratory(self, text: str) -> tuple[str, list[dict]]:
        t = text.lower()
        air_path = KB_RESPIRATORY["air_path"]

        if "path" in t or "sequence" in t or "order" in t or "flow" in t:
            steps = [
                {"step": 1, "text": "Air enters through the nose."},
                {"step": 2, "text": "It then passes through the windpipe (trachea)."},
                {"step": 3, "text": "Finally, it reaches the lungs."},
                {"step": 4, "text": f"Correct order: {' → '.join(air_path)}."},
                {"step": 5, "text": "VERIFICATION: Trace your finger from nose → throat → chest."},
            ]
            return f"The path of air: {' → '.join(air_path)}.", steps

        if "analogy" in t or "like" in t:
            organ = self._detect_organ(t) or "lungs"
            organ_l = organ.lower()
            facts = KB_RESPIRATORY["facts"]
            analogy_map = {"nose": "air filter", "windpipe": "tunnel",
                           "lungs": "two balloons"}
            analogy = analogy_map.get(organ_l, "an important organ")
            func = facts.get(organ_l, {}).get("function", "has an important function")
            steps = [
                {"step": 1, "text": f"Identify organ: {organ}."},
                {"step": 2, "text": f"Function of {organ}: {func}."},
                {"step": 3, "text": f"The {organ} is like {analogy}."},
                {"step": 4, "text": "VERIFICATION: The analogy matches the organ's function."},
            ]
            return f"The {organ} is like {analogy}. {func.capitalize()}.", steps

        if any(w in t for w in ["function", "job", "role", "does the"]):
            for organ_key, fact in KB_RESPIRATORY["facts"].items():
                if organ_key in t or organ_key in self._respiratory_synonyms(t):
                    steps = [
                        {"step": 1, "text": f"Identify organ: {organ_key}."},
                        {"step": 2, "text": f"Function: {fact['function']}."},
                        {"step": 3, "text": "VERIFICATION: Recall one use of this organ in daily life."},
                    ]
                    return f"The {organ_key} {fact['function']}.", steps

        # fill-in-blank style
        if "filter" in t or "filters" in t:
            steps = [
                {"step": 1, "text": "What organ filters air?"},
                {"step": 2, "text": "The nose has tiny hairs that trap dust and filter the air."},
                {"step": 3, "text": "VERIFICATION: Cover your nose — you feel air being filtered."},
            ]
            return "The nose filters air.", steps

        if "windpipe" in t or "trachea" in t or "tube" in t:
            steps = [
                {"step": 1, "text": "The windpipe is also called the trachea."},
                {"step": 2, "text": "It is a long tube that carries air from the nose to the lungs."},
                {"step": 3, "text": "VERIFICATION: Touch your throat and hum — you feel the windpipe vibrating."},
            ]
            return "The windpipe (trachea) carries air from the nose to the lungs.", steps

        if "diaphragm" in t:
            steps = [
                {"step": 1, "text": "The diaphragm is a muscle below the lungs."},
                {"step": 2, "text": "It moves down when we breathe in and up when we breathe out."},
                {"step": 3, "text": "VERIFICATION: Place a hand on your stomach — it moves down and up as you breathe."},
            ]
            return "The diaphragm is a muscle that moves up and down to help us breathe.", steps

        # general: oxygen/carbon dioxide
        steps = [
            {"step": 1, "text": "The main organs for breathing are the nose, windpipe, and lungs."},
            {"step": 2, "text": "When we breathe in, air goes: nose → windpipe → lungs."},
            {"step": 3, "text": "In the lungs, oxygen is taken into the blood and carbon dioxide is removed."},
            {"step": 4, "text": "VERIFICATION: Take a deep breath — your chest expands because lungs fill with air."},
        ]
        return "The lungs take in oxygen and give out carbon dioxide. The nose filters air, and the windpipe carries it to the lungs.", steps

    @staticmethod
    def _respiratory_synonyms(t: str) -> list[str]:
        syn = {"windpipe": ["trachea", "tube"], "nose": ["nostril", "nostrils"]}
        return sum(syn.values(), [])

    # ── Verification ───────────────────────────────────────────────────────────

    @staticmethod
    def _verify(node_id: str, qtype: str, answer: str) -> str:
        checks = {
            "c3_bio_001": (
                "Step 6 — Three-Check Rule for Living Things:\n"
                "  1. Does it grow on its own?\n"
                "  2. Does it need food and water?\n"
                "  3. Does it breathe or respond to surroundings?\n"
                "  → YES to all three → Living; NO to any → Non-Living."
            ),
            "c3_bio_002": (
                "Verification: Heart → pumps blood; Brain → controls body; "
                "Stomach → digests food; Lungs → help breathing; "
                "Kidneys → filter blood; Liver → cleans blood; "
                "Intestines → absorb nutrients."
            ),
            "c3_bio_003": (
                "Verification — Air Path: Nose (filters) → Windpipe (carries) → Lungs (gas exchange).\n"
                "Fun check: Hold your breath — you feel the need to breathe (lungs need O2)."
            ),
        }
        return checks.get(node_id, "Verify using textbook diagrams and examples.")

# ──────────────────────────────────────────────────────────────────────────────
# Convenience function
# ──────────────────────────────────────────────────────────────────────────────

def solve(node_id: str, question_text: str) -> Solution:
    """Solve a Class 3 Biology question."""
    solver = BioSolver(question_text)
    return solver.solve(node_id, question_text)

# ──────────────────────────────────────────────────────────────────────────────
# CLI test runner
# ──────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    test_cases = [
        ("c3_bio_001", "Is a rose plant a living or non-living thing?"),
        ("c3_bio_001", "Sort these into living and non-living: cat, stone, mango tree, toy, fish"),
        ("c3_bio_001", "Give one example each of a living and a non-living thing."),
        ("c3_bio_002", "Where is the heart located in the body?"),
        ("c3_bio_002", "What is the main function of the brain?"),
        ("c3_bio_002", "Which organ pumps blood to all parts of the body?"),
        ("c3_bio_003", "What is the path of air when we breathe?"),
        ("c3_bio_003", "What is the function of the nose?"),
        ("c3_bio_003", "The lungs are like ___ because ___."),
    ]
    for nid, q in test_cases:
        print(f"\n{'='*65}")
        print(f"Q: {q}")
        sol = solve(nid, q)
        print(f"A: {sol.answer}")
        print("Reasoning:")
        for s in sol.reasoning:
            print(f"  Step {s['step']}: {s['text']}")
        print(f"Verification: {sol.verification[:80]}...")