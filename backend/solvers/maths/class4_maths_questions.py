"""
class4_maths_questions.py
CISCE Class 4 Mathematics — Question Generator (3 nodes)
50% Indian-context  |  50% standard textbook style
Seeded Random for deterministic output.
"""
import random
from dataclasses import dataclass, field
from typing import List, Optional, Dict, Any, Tuple
from class4_maths_solver import (
    Class4MathSolver, number_to_indian_words, words_to_indian_numeral
)

# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────
@dataclass
class Question:
    node_id:   str
    qtype:     str       # 'mcq' | 'fill_blank' | 'word_problem' | 'short_answer'
    difficulty: str      # Easy | Medium
    context:   str       # 'indian' | 'standard'
    prompt:    str
    options:   Optional[List[str]] = None
    answer:    Any = None
    solution:  Dict[str, Any] = field(default_factory=dict)
    skill_tags: List[str] = field(default_factory=list)

@dataclass
class Worksheet:
    title:        str
    seed:         int
    total_q:      int
    per_node:     Dict[str, int]
    questions:    List[Question] = field(default_factory=list)

    def summary(self) -> str:
        lines = [f"Worksheet: {self.title}  (seed={self.total_q} questions)",
                 f"  Nodes: {self.per_node}"]
        for q in self.questions:
            ctx = "🇮🇳" if q.context == "indian" else "📖"
            lines.append(f"  [{q.node_id}] {q.qtype} | {q.difficulty} | {ctx} {q.context}")
        return "\n".join(lines)


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────
class Class4QuestionGenerator:
    """
    Generates questions for the 3 Class 4 nodes.
    50% Indian-context problems (money, crowds, distances, census…)
    50% Standard textbook problems.
    """

    # ── context pools ─────────────────────────────────────────────────────────
    INDIAN_MONEY   = ["rupees","Rs","₹"]
    INDIAN_CROWD   = ["people at a stadium","voters in a village",
                      "students in a district","devotees at a fair",
                      "houses in a city ward","trees in a forest range"]
    INDIAN_MISC    = ["litres of milk sold","books in a library",
                      "seeds in a packet"," kilometres driven",
                      "mobile phones manufactured","election votes polled"]

    def __init__(self, seed: int = 42):
        self.rng   = random.Random(seed)
        self.solver = Class4MathSolver(seed=seed)

    # ── public API ────────────────────────────────────────────────────────────
    def generate_worksheet(
        self,
        per_node: Optional[Dict[str,int]] = None,
        seed: Optional[int] = None,
    ) -> Worksheet:
        if seed is not None:
            self.rng = random.Random(seed)
        if per_node is None:
            per_node = {"c4_math_001": 6, "c4_math_002": 6, "c4_math_003": 6}

        ws = Worksheet(
            title="Class 4 Mathematics — Numbers Theme (3 Nodes)",
            seed=seed or 42,
            total_q=sum(per_node.values()),
            per_node=per_node,
        )
        for node, count in per_node.items():
            if node == "c4_math_001":
                ws.questions.extend(self._gen_001(count))
            elif node == "c4_math_002":
                ws.questions.extend(self._gen_002(count))
            elif node == "c4_math_003":
                ws.questions.extend(self._gen_003(count))
        return ws

    def generate_node(self, node_id: str, count: int = 6,
                      seed: Optional[int] = None) -> List[Question]:
        """Generate questions for a single node."""
        if seed is not None:
            self.rng = random.Random(seed)
        if node_id == "c4_math_001":
            return self._gen_001(count)
        elif node_id == "c4_math_002":
            return self._gen_002(count)
        elif node_id == "c4_math_003":
            return self._gen_003(count)
        raise ValueError(f"Unknown node: {node_id}")

    # ──────────────────────────────────────────────────────────────────────────
    # ──────────────────────────────────────────────────────────────────────────
    def _gen_001(self, n: int) -> List[Question]:
        qs: List[Question] = []
        half = n // 2
        # 1) Numeral → words (MCQ)
        for _ in range(half):
            q = self._001_read_mcq()
            qs.append(q)
        # 2) Words → numeral (fill blank)
        for _ in range(n - half):
            q = self._001_write_fill()
            qs.append(q)
        return qs

    def _001_read_mcq(self) -> Question:
        ctx = self.rng.choice(["indian","standard"])
        if ctx == "indian":
            n, words, prompt, tags = self._indian_context_numeral()
        else:
            n, words, prompt, tags = self._standard_numeral()
        # distractors
        opts = self._distractors_read(words, n)
        opts.insert(self.rng.randint(0, 3), words)
        sol = self.solver.q1_read_numeral(n)
        return Question(
            node_id="c4_math_001", qtype="mcq", difficulty="Easy",
            context=ctx,
            prompt=prompt,
            options=[o.capitalize() for o in opts],
            answer=words,
            solution=sol,
            skill_tags=["read_6digit","indian_system"] + tags,
        )

    def _001_write_fill(self) -> Question:
        ctx = self.rng.choice(["indian","standard"])
        if ctx == "indian":
            n, words, prompt, tags = self._indian_context_numeral()
        else:
            n, words, prompt, tags = self._standard_numeral()
        # ask for numeral in blank
        prompt = prompt.replace(f"{words}", "______")
        prompt = prompt.replace(words.capitalize(), "______")
        sol = self.solver.q1_write_numeral(words)
        return Question(
            node_id="c4_math_001", qtype="fill_blank", difficulty="Easy",
            context=ctx,
            prompt=prompt,
            answer=f"{n:,}",
            solution=sol,
            skill_tags=["write_numeral","indian_system"] + tags,
        )

    # ──────────────────────────────────────────────────────────────────────────
    # ──────────────────────────────────────────────────────────────────────────
    def _gen_002(self, n: int) -> List[Question]:
        qs: List[Question] = []
        third = max(1, n // 3)
        # 1) Place value questions (MCQ)
        for _ in range(third):
            qs.append(self._002_place_value_mcq())
        # 2) Expanded form (fill blank)
        for _ in range(third):
            qs.append(self._002_expanded_fill())
        # 3) Place + face value (short answer)
        for _ in range(max(0, n - 2*third)):
            qs.append(self._002_pfv_short())
        return qs

    def _002_place_value_mcq(self) -> Question:
        ctx = self.rng.choice(["indian","standard"])
        n = self.rng.randint(100000, 999999)
        s = str(n)
        d = int(self.rng.choice(s))
        # find position
        pos = len(s) - 1 - s.index(str(d))
        labels  = ["ones","tens","hundreds","thousands","ten thousands","lakhs"]
        pvalues = [1,10,100,1000,10000,100000]
        correct = str(d * pvalues[pos])
        if ctx == "indian":
            prompt = (f"A crowd of {n:,} people attended a {self.rng.choice(['festival','fair','event'])}. "
                      f"Find the place value of the digit '{d}' in {n:,}.")
            tags = ["place_value","indian_context"]
        else:
            prompt = (f"The number {n:,} is written on a school notice board. "
                      f"What is the place value of the digit '{d}' in this number?")
            tags = ["place_value","standard"]
        # distractors
        opts = [d * v for v in [pvalues[(pos+i)%6] for i in range(1,4)]]
        opts.append(d * pvalues[pos])   # correct
        self.rng.shuffle(opts)
        opts_s = [f"{o:,}" for o in opts]
        sol = self.solver.q1_place_value_of_digit(n, d)
        return Question(
            node_id="c4_math_002", qtype="mcq", difficulty="Easy",
            context=ctx, prompt=prompt,
            options=opts_s, answer=correct,
            solution=sol, skill_tags=tags,
        )

    def _002_expanded_fill(self) -> Question:
        n = self.rng.randint(100001, 999999)
        ctx = self.rng.choice(["indian","standard"])
        parts = []
        multipliers = [100000,10000,1000,100,10,1]
        digits = [int(d) for d in f"{n:06d}"]
        labels = ["lakhs","ten thousands","thousands","hundreds","tens","ones"]
        for d,m,lbl in zip(digits,multipliers,labels):
            if d != 0:
                parts.append(f"{d * m:,}")
        expanded = " + ".join(parts)
        if ctx == "indian":
            prompt = (f"A school collected ₹{n:,} in a charity drive. "
                      f"Write the amount in expanded form: ______")
            tags = ["expanded_form","indian_context","money"]
        else:
            prompt = (f"Write {n:,} in expanded form:\n{expanded.replace('+','+').replace(str(n),'______')}")
            tags = ["expanded_form","standard"]
        sol = self.solver.q2_expanded_form(n)
        return Question(
            node_id="c4_math_002", qtype="fill_blank", difficulty="Easy",
            context=ctx, prompt=prompt,
            answer=expanded, solution=sol,
            skill_tags=tags,
        )

    def _002_pfv_short(self) -> Question:
        n = self.rng.randint(100000, 999999)
        s = str(n)
        d = int(self.rng.choice(s))
        pos = len(s) - 1 - s.index(str(d))
        labels  = ["ones","tens","hundreds","thousands","ten thousands","lakhs"]
        pvalues = [1,10,100,1000,10000,100000]
        pv = d * pvalues[pos]
        ctx = self.rng.choice(["indian","standard"])
        if ctx == "indian":
            prompt = (f"In the number {n:,}, what are the place value "
                      f"and face value of the digit '{d}'?")
            tags = ["place_value","face_value","indian_context"]
        else:
            prompt = (f"For the number {n:,}, identify both the face value "
                      f"and the place value of the digit '{d}'.")
            tags = ["place_value","face_value","standard"]
        sol = self.solver.q2_place_and_face_value(n, d)
        return Question(
            node_id="c4_math_002", qtype="short_answer", difficulty="Easy",
            context=ctx, prompt=prompt,
            answer={"face_value": d, "place_value": pv, "place_name": labels[pos]},
            solution=sol, skill_tags=tags,
        )

    # ──────────────────────────────────────────────────────────────────────────
    # ──────────────────────────────────────────────────────────────────────────
    def _gen_003(self, n: int) -> List[Question]:
        qs: List[Question] = []
        third = max(1, n // 3)
        for _ in range(third):
            qs.append(self._003_ascending_mcq())
        for _ in range(third):
            qs.append(self._003_descending_fill())
        for _ in range(max(0, n - 2*third)):
            qs.append(self._003_comparison_short())
        return qs

    def _003_ascending_mcq(self) -> Question:
        ctx = self.rng.choice(["indian","standard"])
        nums = sorted(self.rng.sample(range(10000, 999999), 4))
        # shuffle for display
        display = list(nums)
        self.rng.shuffle(display)
        opts = [f"{x:,}" for x in display]
        # correct option already in opts — now build MCQ
        correct_str = " < ".join(f"{x:,}" for x in nums)
        if ctx == "indian":
            prompt = (f"Arrange the following populations (in people) "
                      f"in ASCENDING order (smallest → largest):\n"
                      + ", ".join(f"{x:,}" for x in display))
            tags = ["ascending_order","indian_context","population"]
        else:
            prompt = (f"Arrange these numbers in ASCENDING order:\n"
                      + ", ".join(f"{x:,}" for x in display))
            tags = ["ascending_order","standard"]
        all_opts = [list(nums)]
        while len(all_opts) < 4:
            perm = list(nums)
            self.rng.shuffle(perm)
            if perm not in all_opts:
                all_opts.append(perm)
        self.rng.shuffle(all_opts)
        option_strs = [" < ".join(f"{x:,}" for x in o) for o in all_opts]
        correct_idx = next(i for i,o in enumerate(all_opts) if o == nums)
        sol = self.solver.q3_ascending_order(nums)
        return Question(
            node_id="c4_math_003", qtype="mcq", difficulty="Easy",
            context=ctx, prompt=prompt,
            options=option_strs,
            answer=correct_str,
            solution=sol, skill_tags=tags,
        )

    def _003_descending_fill(self) -> Question:
        ctx = self.rng.choice(["indian","standard"])
        nums = sorted(self.rng.sample(range(20000, 999999), 4), reverse=True)
        display = list(nums)
        self.rng.shuffle(display)
        correct_str = " > ".join(f"{x:,}" for x in nums)
        if ctx == "indian":
            prompt = (f"The following distances (in km) between cities were recorded. "
                      f"Arrange them in DESCENDING order (largest → smallest): "
                      f"{', '.join(f'{x:,} km' for x in display)}\n"
                      f"Descending order: ______")
            tags = ["descending_order","indian_context","distance"]
        else:
            prompt = (f"Arrange in DESCENDING order: "
                      f"{', '.join(f'{x:,}' for x in display)}\n"
                      f"Descending order: ______")
            tags = ["descending_order","standard"]
        sol = self.solver.q3_descending_order(nums)
        return Question(
            node_id="c4_math_003", qtype="fill_blank", difficulty="Easy",
            context=ctx, prompt=prompt,
            answer=correct_str, solution=sol,
            skill_tags=tags,
        )

    def _003_comparison_short(self) -> Question:
        ctx = self.rng.choice(["indian","standard"])
        a = self.rng.randint(100000, 998999)
        b = self.rng.randint(a+1, 999999)
        sym = "<"
        if ctx == "indian":
            prompt = (f"Rahul scored {a:,} marks and Priya scored {b:,} marks "
                      f"in their exam. Fill in the blank with >, <, or =:\n"
                      f"{a:,} ____ {b:,}")
            tags = ["comparison","indian_context","marks"]
        else:
            prompt = (f"Compare using >, <, or =:\n{a:,} ____ {b:,}")
            tags = ["comparison","standard"]
        sol = self.solver.q3_comparison(a, b)
        return Question(
            node_id="c4_math_003", qtype="short_answer", difficulty="Easy",
            context=ctx, prompt=prompt,
            answer=sym, solution=sol,
            skill_tags=tags,
        )

    # ──────────────────────────────────────────────────────────────────────────
    # ──────────────────────────────────────────────────────────────────────────
    def _distractors_read(self, correct_words: str, n: int) -> List[str]:
        """Generate plausible word-form distractors."""
        s = str(n)
        distractors = []
        # swap last two digits
        if len(s) >= 2:
            swapped = s[:-2] + s[-1] + s[-2]
            try:
                sw = int(swapped)
                if 100000 <= sw <= 999999:
                    distractors.append(number_to_indian_words(sw))
            except: pass
        # change one digit ±1
        for pos in range(len(s)):
            d = int(s[pos])
            for delta in [-1, 1]:
                nd = d + delta
                if 0 <= nd <= 9:
                    ns = s[:pos] + str(nd) + s[pos+1:]
                    ni = int(ns)
                    if 100000 <= ni <= 999999 and ni != n:
                        distractors.append(number_to_indian_words(ni))
                        break
        # de-duplicate
        distractors = list(dict.fromkeys(distractors))
        while len(distractors) < 3:
            rn = self.rng.randint(100000, 999999)
            w = number_to_indian_words(rn)
            if w != correct_words:
                distractors.append(w)
        return distractors[:3]

    def _indian_context_numeral(self) -> Tuple[int, str, str, List[str]]:
        """Generate a 6-digit number with Indian-context prompt."""
        n = self.rng.randint(100000, 999999)
        words = number_to_indian_words(n)
        ctx = self.rng.choice(self.INDIAN_MONEY +
                              self.INDIAN_CROWD +
                              self.INDIAN_MISC)
        if ctx in self.INDIAN_MONEY:
            prompt = (f"A shopkeeper received {words.capitalize()} rupees "
                      f"as payment. Write this amount as a numeral:\n"
                      f"{words.capitalize()} rupees = ______")
            tags = ["money","indian_context","rupees"]
        elif ctx in self.INDIAN_CROWD:
            noun = ctx.split(" ")[-1]
            prompt = (f"{words.capitalize()} {noun} gathered at the event. "
                      f"Write this number using digits: ______")
            tags = ["crowd","indian_context",noun]
        else:
            noun = ctx.split(" ")[-1]
            prompt = (f"The factory produced {words} {noun}. "
                      f"Write this number using digits: ______")
            tags = ["production","indian_context",noun]
        return n, words, prompt, tags

    def _standard_numeral(self) -> Tuple[int, str, str, List[str]]:
        """Generate a 6-digit number with standard textbook prompt."""
        n = self.rng.randint(100000, 999999)
        words = number_to_indian_words(n)
        prompt = (f"Write the following number in the Indian system of numeration:\n"
                  f"{words.capitalize()}")
        return n, words, prompt, ["standard","textbook"]


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────
def print_worksheet(ws: Worksheet, show_solution: bool = False) -> str:
    lines = [f"\n{'='*70}",
             f"  {ws.title}",
             f"  Seed: {ws.seed}   Total Questions: {ws.total_q}",
             f"  Per node: {ws.per_node}",
             f"{'='*70}"]
    for i, q in enumerate(ws.questions, 1):
        ctx_icon = "🇮🇳" if q.context == "indian" else "📖"
        lines.append(f"\nQ{i}. [{q.node_id}] ({q.difficulty}) {ctx_icon}{q.context}")
        lines.append(f"   Type: {q.qtype}")
        lines.append(f"   Prompt: {q.prompt}")
        if q.options:
            for j, opt in enumerate(q.options, 1):
                lines.append(f"      ({j}) {opt}")
        if show_solution:
            lines.append(f"   ✓ Answer: {q.answer}")
            lines.append(f"   Steps:")
            for st in q.solution.get("steps", []):
                lines.append(f"      → {st}")
            lines.append(f"   Verified: {q.solution.get('verified')}")
        else:
            lines.append(f"   [Answer hidden — set show_solution=True]")
    return "\n".join(lines)


# ─────────────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────
def _self_test() -> None:
    print("─── Self-test ───")
    s = Class4MathSolver(seed=7)

    r1 = s.q1_read_numeral(245318)
    assert r1["answer"] == "two lakh forty-five thousand three hundred eighteen", r1
    assert r1["verified"] is True
    print(f"[PASS] q1_read_numeral: {r1['answer']}")

    r1b = s.q1_write_numeral("one lakh twenty thousand five hundred six")
    assert r1b["answer"] == "1,20,506", r1b
    print(f"[PASS] q1_write_numeral: {r1b['answer']}")

    r1c = s.q1_place_value_of_digit(452316, 4)
    assert r1c["answer"] == "400000", r1c
    print(f"[PASS] q1_place_value_of_digit (4 in 452316): {r1c['answer']}")

    r2 = s.q2_expanded_form(452316)
    assert r2["verified"] is True
    print(f"[PASS] q2_expanded_form: {r2['answer']}")

    r2b = s.q2_from_expanded_form(["500000","60000","700","40","3"])
    assert r2b["answer"] == "5,60,743", r2b
    print(f"[PASS] q2_from_expanded_form: {r2b['answer']}")

    r2c = s.q2_place_and_face_value(452316, 2)
    assert r2c["answer"]["place_value"] == 20000
    assert r2c["answer"]["face_value"] == 2
    print(f"[PASS] q2_place_and_face_value (2 in 452316): PV={r2c['answer']['place_value']}, FV={r2c['answer']['face_value']}")

    r3a = s.q3_ascending_order([184739, 291450, 56023, 398712, 71200])
    assert r3a["answer"] == [56023, 71200, 184739, 291450, 398712]
    print(f"[PASS] q3_ascending_order")

    r3b = s.q3_descending_order([184739, 291450, 56023, 398712, 71200])
    assert r3b["answer"] == [398712, 291450, 184739, 71200, 56023]
    print(f"[PASS] q3_descending_order")

    r3c = s.q3_comparison(345678, 298451)
    assert r3c["answer"] == ">"
    print(f"[PASS] q3_comparison: 345678 > 298451")

    gen1 = Class4QuestionGenerator(seed=99)
    ws1  = gen1.generate_worksheet()
    gen2 = Class4QuestionGenerator(seed=99)
    ws2  = gen2.generate_worksheet()
    assert len(ws1.questions) == len(ws2.questions)
    for q1, q2 in zip(ws1.questions, ws2.questions):
        assert q1.prompt == q2.prompt, "Non-deterministic question generation!"
    print("[PASS] Determinism: seed=99 produces identical output on re-run")
    print(f"[PASS] Worksheet: {ws1.total_q} questions generated\n")

if __name__ == "__main__":
    _self_test()
    gen = Class4QuestionGenerator(seed=42)
    ws  = gen.generate_worksheet(per_node={"c4_math_001": 3,
                                            "c4_math_002": 3,
                                            "c4_math_003": 3})
    print(print_worksheet(ws, show_solution=True))