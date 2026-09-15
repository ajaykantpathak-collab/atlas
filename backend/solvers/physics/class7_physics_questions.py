"""
class7_physics_questions.py
Seeded question generator for Class 7 Physics (3 nodes).
Uses random.Random(seed) — fully deterministic.
Generates: MCQ, FIB, Short-answer, Long-answer, Classification, Numeric-reasoning.
"""
import random
import string
import dataclasses
from typing import List, Dict, Optional, Tuple
from class7_physics_solver import (
    solve, classify_matter, verify_two_properties,
    compare_diffusion, compare_compressibility,
    particle_spacing, determine_state,
    MATTER_EXAMPLES, NON_MATTER_EXAMPLES,
    DIFFUSION_COEFF, COMPRESSIBILITY,
    MCQ_BANK, FIB_ANSWERS, SHORT_ANSWER_RUBRIC, LONG_ANSWER_RUBRIC,
    ClassifyResult, DiffusionScenario, CompressibilityScenario,
    ValidationResult,
)

# ─────────────────────────────────────────────────────────────────
#  Data model for generated questions
# ─────────────────────────────────────────────────────────────────
@dataclasses.dataclass
class Question:
    q_id:        str
    node_id:     str
    node_label:  str
    q_type:      str          # mcq | fib | short_answer | long_answer |
                              # classify | compare_diffusion | ...
    difficulty:  str          # Easy | Medium
    competency:  str          # Board | ...
    marks:       float
    text:        str
    options:     Optional[List[str]]  = None   # MCQ only
    correct:     Optional[str]  = None
    hint:        Optional[str]  = None
    solution:    Optional[str]  = None
    topic_tag:   str = ""

# ─────────────────────────────────────────────────────────────────
#  Generator class
# ─────────────────────────────────────────────────────────────────
class C7PhysicsQuestionGenerator:
    """
    Seed-controlled question generator for Class 7 Physics.
    Call generate(node_id, seed, n) for a reproducible paper.
    """

    NODE_LABELS: Dict[str, str] = {
        "c7_phy_001": "Physical Nature of Matter",
        "c7_phy_002": "Particle Nature of Matter",
        "c7_phy_003": "Solid State – Properties & Arrangement",
    }

    NODE_DIFFICULTY: Dict[str, str] = {
        "c7_phy_001": "Easy",
        "c7_phy_002": "Medium",
        "c7_phy_003": "Easy",
    }

    # pool of fill-in-the-blank questions per node
    FIB_POOL: Dict[str, List[Tuple[str, str, str]]] = {
        "c7_phy_001": [
            ("fib_n1_q1",
             "Anything that _______ space is called matter.",
             "space"),
            ("fib_n1_q2",
             "The quantity of matter in an object is called _______.",
             "mass"),
            ("fib_n1_q3",
             "_______ is measured using a balance.",
             "mass"),
            ("fib_n1_q4",
             "Matter exists in three states: _______.",
             "solid, liquid, gas"),
        ],
        "c7_phy_002": [
            ("fib_n2_q1",
             "Matter is made up of _______ particles.",
             "tiny"),
            ("fib_n2_q2",
             "The spreading of ink in water is called _______.",
             "diffusion"),
            ("fib_n2_q3",
             "The ability of a gas to be reduced to a smaller volume is called "
             "_______.", "compressibility"),
            ("fib_n2_q4",
             "In gases, _______ space between particles is very large.",
             "interparticle"),
        ],
        "c7_phy_003": [
            ("fib_n3_q1",
             "Solids have a _______.",
             "definite shape"),
            ("fib_n3_q2",
             "Solids have a _______.",
             "definite volume"),
            ("fib_n3_q3",
             "Particles in a solid vibrate about _______ positions.",
             "fixed"),
            ("fib_n3_q4",
             "Solids are _______.",
             "incompressible"),
        ],
    }

    # short-answer pool (q_id, prompt, max_marks)
    SA_POOL: Dict[str, List[Tuple[str, str, float]]] = {
        "c7_phy_001": [
            ("sa_n1_001",
             "Define matter in your own words.", 2.0),
            ("sa_n1_002",
             "Give two examples each of matter and non-matter.", 2.0),
        ],
        "c7_phy_002": [
            ("sa_n2_001",
             "Explain diffusion with one example.", 2.0),
            ("sa_n2_002",
             "Why is a gas more compressible than a solid?", 2.0),
        ],
        "c7_phy_003": [
            ("sa_n3_001",
             "List two properties of solids and explain them using particle theory.",
             2.0),
            ("sa_n3_002",
             "Why does a solid not flow?", 2.0),
        ],
    }

    # long-answer pool (q_id, prompt, max_marks)
    LA_POOL: Dict[str, List[Tuple[str, str, float]]] = {
        "c7_phy_001": [
            ("la_n1_001",
             ("Differentiate between matter and non-matter. Give at least two "
              "examples of each and explain why they belong to that category."),
             3.0),
        ],
        "c7_phy_002": [
            ("la_n2_001",
             ("Describe two pieces of evidence that matter is made up of tiny "
              "particles. Include particle-theory reasoning for each."),
             3.0),
            ("la_n2_002",
             ("Explain how particle spacing accounts for the three states of "
              "matter (solid, liquid, gas)."),
             5.0),
        ],
        "c7_phy_003": [
            ("la_n3_001",
             ("Describe the properties of solids and relate EACH property to "
              "the arrangement and movement of their particles."),
             5.0),
        ],
    }

    # substance pools for classification & comparison questions
    MATTER_POOL: List[str] = [
        "stone", "water", "air", "book", "table", "chair", "milk",
        "oxygen", "sugar", "iron", "wood", "ice", "balloon", "flower",
        "pen", "paper", "soil", "sand", "gold", "copper",
    ]
    NON_MATTER_POOL: List[str] = [
        "light", "heat", "sound", "shadow", "sunlight", "music",
        "cold", "darkness", "echo",
    ]

    DIFFUSION_PAIRS: List[Tuple[DiffusionScenario, DiffusionScenario, str]] = [
        (DiffusionScenario("ink",    "water",  "liquid", "liquid"),
         DiffusionScenario("perfume","air",    "gas",    "gas"),
         "gas"),
        (DiffusionScenario("sugar",  "water",  "solid",  "liquid"),
         DiffusionScenario("oxygen", "water",  "gas",    "liquid"),
         "gas"),
        (DiffusionScenario("ink",    "water",  "liquid", "liquid"),
         DiffusionScenario("sugar",  "water",  "solid",  "liquid"),
         "liquid"),
    ]

    COMPRESSIBILITY_PAIRS: List[Tuple[CompressibilityScenario,
                                       CompressibilityScenario, str]] = [
        (CompressibilityScenario("gas"),
         CompressibilityScenario("solid"),
         "gas"),
        (CompressibilityScenario("gas"),
         CompressibilityScenario("liquid"),
         "gas"),
        (CompressibilityScenario("solid"),
         CompressibilityScenario("liquid"),
         "solid"),
    ]

    # ──────────────────────────────────────────────────────────────
    #  Core generation method
    # ──────────────────────────────────────────────────────────────
    def generate(self,
                 node_id: str,
                 seed:    int,
                 n:        int = 10,
                 mix:      Optional[Dict[str, float]] = None
                 ) -> List[Question]:
        """
        Generate *n* questions for *node_id* using *seed*.

        mix  – optional dict controlling question-type proportion.
               Keys: mcq, fib, short_answer, long_answer,
                     classify, compare_diffusion, compare_compressibility
               Values are fractional weights (must sum to 1.0).
               Default: balanced mix based on node.

        Returns a list of Question dataclass instances.
        """
        rng = random.Random(seed)
        label = self.NODE_LABELS.get(node_id, node_id)
        difficulty = self.NODE_DIFFICULTY.get(node_id, "Medium")

        # Default mix weights
        if mix is None:
            mix = self._default_mix(node_id)

        types = self._weighted_choices(mix, n, rng)

        questions: List[Question] = []
        used_ids: set = set()

        for i, qtype in enumerate(types):
            q_id = f"{node_id}_q{i+1:03d}"
            # avoid collisions
            while q_id in used_ids:
                q_id = f"{node_id}_q{rng.randint(1,999):03d}"
            used_ids.add(q_id)

            q = self._build_question(node_id, label, qtype, q_id,
                                      difficulty, rng)
            questions.append(q)

        return questions

    # ──────────────────────────────────────────────────────────────
    #  Internal helpers
    # ──────────────────────────────────────────────────────────────
    def _default_mix(self, node_id: str) -> Dict[str, float]:
        """Return default mix weights per node."""
        base = {
            "mcq": 0.30, "fib": 0.20, "short_answer": 0.25,
            "long_answer": 0.10,
            "classify": 0.05, "compare_diffusion": 0.04,
            "compare_compressibility": 0.03,
            "particle_spacing": 0.03,
        }
        # Node 1 — no diffusion/compressibility
        if node_id == "c7_phy_001":
            return {
                "mcq":            0.30,
                "fib":            0.25,
                "short_answer":   0.25,
                "long_answer":    0.10,
                "classify":       0.10,
            }
        # Node 2 — particle nature
        if node_id == "c7_phy_002":
            return {
                "mcq":                 0.25,
                "fib":                 0.20,
                "short_answer":        0.20,
                "long_answer":         0.10,
                "compare_diffusion":   0.10,
                "compare_compressibility": 0.08,
                "particle_spacing":    0.07,
            }
        # Node 3 — solid state
        return {
            "mcq":          0.25,
            "fib":          0.20,
            "short_answer": 0.20,
            "long_answer":  0.10,
            "classify":     0.10,
            "particle_spacing": 0.08,
            "determine_state":  0.07,
        }

    def _weighted_choices(self, mix: Dict[str, float],
                          n: int, rng: random.Random) -> List[str]:
        """Return list of n type-strings sampled proportionally."""
        types, weights = zip(*mix.items())
        return rng.choices(list(types), weights=list(weights), k=n)

    # ── Question builders ─────────────────────────────────────────
    def _build_question(self, node_id, label, qtype, q_id,
                        difficulty, rng) -> Question:
        builder = {
            "mcq":                  self._build_mcq,
            "fib":                  self._build_fib,
            "short_answer":         self._build_sa,
            "long_answer":          self._build_la,
            "classify":             self._build_classify,
            "compare_diffusion":    self._build_diffusion,
            "compare_compressibility": self._build_compressibility,
            "particle_spacing":     self._build_particle_spacing,
            "determine_state":      self._build_determine_state,
        }.get(qtype, self._build_mcq)

        return builder(node_id, label, qtype, q_id, difficulty, rng)

    # ── MCQ ───────────────────────────────────────────────────────
    def _build_mcq(self, node_id, label, qtype, q_id,
                   difficulty, rng) -> Question:
        pool = [q for q in MCQ_BANK if q["node"] == node_id]
        if not pool:
            pool = MCQ_BANK
        q = rng.choice(pool)
        # shuffle options deterministically
        opts = list(q["options"])
        rng.shuffle(opts)
        # find letter of correct answer after shuffle
        correct_letter = "?"
        for idx, opt in enumerate(opts):
            if opt.startswith(q["answer"] + ")"):
                correct_letter = string.ascii_uppercase[idx]
                break
        return Question(
            q_id=q_id, node_id=node_id, node_label=label,
            q_type="mcq", difficulty=difficulty,
            competency="Board", marks=1.0,
            text=q["question"], options=opts,
            correct=correct_letter,
            hint="Think about the definitions learned in this topic.",
            solution=q["explanation"],
            topic_tag=node_id,
        )

    # ── FIB ───────────────────────────────────────────────────────
    def _build_fib(self, node_id, label, qtype, q_id,
                   difficulty, rng) -> Question:
        pool = self.FIB_POOL.get(node_id, [])
        qid, prompt, answer = rng.choice(pool)
        return Question(
            q_id=q_id, node_id=node_id, node_label=label,
            q_type="fib", difficulty=difficulty,
            competency="Board", marks=1.0,
            text=prompt, correct=answer,
            hint="Recall the key definition from the lesson.",
            solution=f"The correct answer is: {answer}",
            topic_tag=node_id,
        )

    # ── Short answer ──────────────────────────────────────────────
    def _build_sa(self, node_id, label, qtype, q_id,
                  difficulty, rng) -> Question:
        pool = self.SA_POOL.get(node_id, [])
        qid, prompt, marks = rng.choice(pool)
        rubric = SHORT_ANSWER_RUBRIC.get(qid, {})
        return Question(
            q_id=qid, node_id=node_id, node_label=label,
            q_type="short_answer", difficulty=difficulty,
            competency="Board", marks=marks,
            text=prompt,
            correct=rubric.get("model_answer", ""),
            hint="Use keywords: " + ", ".join(rubric.get("keywords", [])[:3]),
            solution=rubric.get("model_answer", ""),
            topic_tag=node_id,
        )

    # ── Long answer ───────────────────────────────────────────────
    def _build_la(self, node_id, label, qtype, q_id,
                  difficulty, rng) -> Question:
        pool = self.LA_POOL.get(node_id, [])
        qid, prompt, marks = rng.choice(pool)
        rubric = LONG_ANSWER_RUBRIC.get(qid, {})
        return Question(
            q_id=qid, node_id=node_id, node_label=label,
            q_type="long_answer", difficulty=difficulty,
            competency="Board", marks=marks,
            text=prompt,
            correct=rubric.get("model_answer", ""),
            hint="Include keywords: " + ", ".join(rubric.get("keywords", [])[:4]),
            solution=rubric.get("model_answer", ""),
            topic_tag=node_id,
        )

    # ── Classify matter ───────────────────────────────────────────
    def _build_classify(self, node_id, label, qtype, q_id,
                        difficulty, rng) -> Question:
        matter = rng.choice(self.MATTER_POOL)
        non    = rng.choice(self.NON_MATTER_POOL)
        # randomly ask about one
        if rng.random() < 0.5:
            item, answer = matter, "matter"
        else:
            item, answer = non, "non-matter"

        return Question(
            q_id=q_id, node_id=node_id, node_label=label,
            q_type="classify", difficulty=difficulty,
            competency="Board", marks=1.0,
            text=f"Is '{item}' matter or non-matter? Explain in one line.",
            correct=f"{answer}: {item} {'occupies space and has mass' if answer=='matter' else 'is energy / has no mass'}",
            hint="Recall: matter occupies space AND has mass.",
            solution=classify_matter(item).reason,
            topic_tag=node_id,
        )

    # ── Diffusion comparison ──────────────────────────────────────
    def _build_diffusion(self, node_id, label, qtype, q_id,
                         difficulty, rng) -> Question:
        pair = rng.choice(self.DIFFUSION_PAIRS)
        s1, s2, faster_state = pair
        # Solve to get correct answer
        result = compare_diffusion(s1, s2)
        text = (
            f"Compare diffusion rates:\n"
            f"  (A) {s1.substance} diffusing through {s1.medium} "
            f"({s1.from_state} → {s1.to_state})\n"
            f"  (B) {s2.substance} diffusing through {s2.medium} "
            f"({s2.from_state} → {s2.to_state})\n"
            f"Which diffuses faster? Give a one-sentence reason."
        )
        return Question(
            q_id=q_id, node_id=node_id, node_label=label,
            q_type="compare_diffusion", difficulty=difficulty,
            competency="Board", marks=2.0,
            text=text,
            correct=result.faster_medium,
            hint="Diffusion is faster where particles have more free space.",
            solution=result.explanation,
            topic_tag=node_id,
        )

    # ── Compressibility comparison ────────────────────────────────
    def _build_compressibility(self, node_id, label, qtype, q_id,
                               difficulty, rng) -> Question:
        pair = rng.choice(self.COMPRESSIBILITY_PAIRS)
        s1, s2, expected = pair
        result = compare_compressibility(s1, s2)
        text = (
            f"Which is more compressible: {s1.state.capitalize()} or "
            f"{s2.state.capitalize()}? Justify using particle theory."
        )
        return Question(
            q_id=q_id, node_id=node_id, node_label=label,
            q_type="compare_compressibility", difficulty=difficulty,
            competency="Board", marks=2.0,
            text=text,
            correct=result.most_compressible,
            hint="Think about how much free space exists between particles.",
            solution=(f"{result.most_compressible.capitalize()} is most compressible "
                      f"(ratio ~{max(result.gas_ratio, result.liquid_ratio, result.solid_ratio):.3f}). "
                      f"Particles have more free space to be pushed together."),
            topic_tag=node_id,
        )

    # ── Particle spacing ──────────────────────────────────────────
    def _build_particle_spacing(self, node_id, label, qtype, q_id,
                                difficulty, rng) -> Question:
        state = rng.choice(["solid", "liquid", "gas"])
        info   = particle_spacing(state)
        text = (
            f"Describe the particle arrangement and movement in the {state} state. "
            f"Also state whether it has a definite shape and definite volume."
        )
        correct_str = (
            f"Packing: {info['packing']}. "
            f"Movement: {info['particle_movement']}. "
            f"Definite shape: {info['has_definite_shape']}. "
            f"Definite volume: {info['has_definite_volume']}."
        )
        return Question(
            q_id=q_id, node_id=node_id, node_label=label,
            q_type="particle_spacing", difficulty=difficulty,
            competency="Board", marks=2.0,
            text=text, correct=correct_str,
            hint="Recall how particles are arranged in solids, liquids, gases.",
            solution=correct_str,
            topic_tag=node_id,
        )

    # ── Determine state ───────────────────────────────────────────
    def _build_determine_state(self, node_id, label, qtype, q_id,
                               difficulty, rng) -> Question:
        states = [
            (True,  True,  False, "solid",   "has definite shape AND definite volume, and does NOT flow"),
            (False, True,  True,  "liquid",  "has NO definite shape but HAS definite volume, and DOES flow"),
            (False, False, False, "gas",     "has NO definite shape and NO definite volume"),
        ]
        ds, dv, fl, ans, clue = rng.choice(states)
        text = (
            "A substance has the following properties:\n"
            f"  - Definite shape: {'Yes' if ds else 'No'}\n"
            f"  - Definite volume: {'Yes' if dv else 'No'}\n"
            f"  - Flows: {'Yes' if fl else 'No'}\n"
            "What state of matter is it? Name the state."
        )
        return Question(
            q_id=q_id, node_id=node_id, node_label=label,
            q_type="determine_state", difficulty=difficulty,
            competency="Board", marks=1.0,
            text=text, correct=ans,
            hint=f"Clue: the substance {clue}.",
            solution=(
                f"State = {ans}. "
                f"Reason: definite_shape={ds}, definite_volume={dv}, flows={fl}."
            ),
            topic_tag=node_id,
        )

    # ──────────────────────────────────────────────────────────────
    #  Convenience: generate a full 20-mark paper per node
    # ──────────────────────────────────────────────────────────────
    def generate_paper(self,
                       node_id: str,
                       seed:    int,
                       total_marks: float = 20.0
                       ) -> Tuple[List[Question], Dict]:
        """
        Generate a mark-weighted paper of approximately *total_marks*.
        Returns (questions, summary).
        """
        rng = random.Random(seed + 9999)   # independent seed
        questions: List[Question] = []

        # Mark buckets
        one_mark   = ["mcq", "fib", "determine_state", "classify"]
        two_mark   = ["short_answer", "compare_diffusion",
                      "compare_compressibility", "particle_spacing"]
        long_mark  = ["long_answer"]

        # Generate until mark budget is met
        remaining = total_marks
        q_counter = 0
        while remaining > 0.5 and q_counter < 20:
            r = rng.random()
            if r < 0.35:
                qtype = rng.choice(one_mark)
                marks = 1.0
            elif r < 0.80:
                qtype = rng.choice(two_mark)
                marks = 2.0
            else:
                qtype = rng.choice(long_mark)
                marks = rng.choice([3.0, 5.0])

            if marks > remaining:
                marks = remaining

            q_id = f"{node_id}_paper{q_counter+1:03d}"
            q = self._build_question(node_id,
                                      self.NODE_LABELS.get(node_id, node_id),
                                      qtype, q_id,
                                      self.NODE_DIFFICULTY.get(node_id, "Medium"),
                                      rng)
            q.marks = marks
            questions.append(q)
            remaining -= marks
            q_counter += 1

        summary = {
            "node_id":     node_id,
            "total_q":     len(questions),
            "total_marks": sum(q.marks for q in questions),
            "by_type":     {},
        }
        for q in questions:
            summary["by_type"][q.q_type] = (
                summary["by_type"].get(q.q_type, 0) + 1)

        return questions, summary

    # ──────────────────────────────────────────────────────────────
    #  Pretty-print helpers
    # ──────────────────────────────────────────────────────────────
    @staticmethod
    def print_paper(questions: List[Question],
                    summary:   Dict,
                    show_solution: bool = False) -> None:
        print(f"\n{'='*60}")
        print(f"  CLASS 7 PHYSICS  |  Node: {questions[0].node_id}  "
              f"|  {questions[0].node_label}")
        print(f"  Total Questions : {summary['total_q']}    "
              f"Total Marks : {summary['total_marks']}")
        print(f"  Breakdown       : {summary['by_type']}")
        print(f"{'='*60}")
        for q in questions:
            print(f"\nQ{q.q_id}  [{q.q_type}]  ({q.marks} mark{'s' if q.marks!=1 else ''})")
            print(f"  {q.text}")
            if q.options:
                for opt in q.options:
                    print(f"    {opt}")
            if show_solution:
                print(f"  ► Answer : {q.correct}")
                print(f"  ► Solution: {q.solution}")

# ─────────────────────────────────────────────────────────────────
#  CLI entry-point
# ─────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    gen = C7PhysicsQuestionGenerator()
    NODES = ["c7_phy_001", "c7_phy_002", "c7_phy_003"]

    for node in NODES:
        print(f"\n{'#'*60}")
        print(f"  GENERATING PAPER  →  {node}")
        print(f"{'#'*60}")

        # ── Generate 5 questions ─────────────────────────────────
        qs = gen.generate(node, seed=42, n=5)
        for q in qs:
            print(f"\n[{q.q_type.upper():20s}]  {q.marks}m  |  {q.q_id}")
            print(f"  {q.text[:120]}")
            if q.options:
                for o in q.options:
                    print(f"    {o}")
            print(f"  ✔ Correct : {q.correct}")

        # ── Generate 20-mark paper ────────────────────────────────
        paper, summary = gen.generate_paper(node, seed=99, total_marks=20.0)
        gen.print_paper(paper, summary, show_solution=True)
