"""
Question Generator for Class 2 Geography (4 nodes).
50% competency-based (Indian context) + 50% standard textbook.
Uses seeded RNG for deterministic generation.
"""
import random, math
from dataclasses import dataclass, field
from typing import List, Optional, Dict, Tuple
from enum import Enum

from class2_geo_solver import (
    KB, NodeID, Question, CheckResult, C2GeoSolver, get_solver
)

# ──────────────────────────────────────────────
#  TYPE WEIGHTS  (Indian exam flavour)
# ──────────────────────────────────────────────
# Each node: list of (qtype, weight)
NODE_WEIGHTS: Dict[NodeID, List[Tuple[str, int]]] = {
    NodeID.c2_geo_001: [
        ("mcq_single", 30), ("identify", 25), ("truefalse", 20),
        ("vocab", 15), ("fillblank", 10),
    ],
    NodeID.c2_geo_002: [
        ("mcq_single", 25), ("identify", 25), ("truefalse", 25), ("fillblank", 15), ("vocab", 10),
    ],
    NodeID.c2_geo_003: [
        ("mcq_single", 25), ("sequence", 20), ("identify", 20),
        ("truefalse", 20), ("fillblank", 15),
    ],
    NodeID.c2_geo_004: [
        ("mcq_single", 25), ("weather_symbol", 20), ("identify", 20),
        ("truefalse", 15), ("clothes_weather", 10), ("fillblank", 10),
    ],
}

# ──────────────────────────────────────────────
#  HELPERS
# ──────────────────────────────────────────────

def _pick_type(rng: random.Random, node: NodeID) -> str:
    weights = NODE_WEIGHTS[node]
    total = sum(w for _, w in weights)
    r = rng.randint(1, total)
    cum = 0
    for qtype, w in weights:
        cum += w
        if r <= cum:
            return qtype
    return weights[-1][0]

def _opts_mcq(rng: random.Random, kb: dict, answer: str, distractors: List[str]) -> List[str]:
    pool = list(set([answer] + distractors))
    while len(pool) < 4:
        pool.append(rng.choice(distractors))
    opts = list(set(pool))[:4]
    # ensure answer is in opts
    if answer not in opts:
        opts[rng.randint(0, 3)] = answer
    rng.shuffle(opts)
    return opts

# ──────────────────────────────────────────────
#  QUESTION GENERATORS  per node × type
# ──────────────────────────────────────────────

def _gen_001(rng: random.Random, qtype: str, seed_counter: int) -> Question:
    kb = KB[NodeID.c2_geo_001]
    if qtype == "vocab":
        words = list(kb["vocab"].keys())
        word = rng.choice(words)
        return Question(
            node_id="c2_geo_001", qtype="vocab",
            prompt=f"What is the meaning of '{word}'?",
            answer_text=kb["vocab"][word],
            explanation=f"'{word}' means: {kb['vocab'][word]}",
            seed=seed_counter, difficulty="Easy",
        )
    elif qtype == "mcq_single":
        q, ans, opts = rng.choice(kb["mcq"])
        return Question(
            node_id="c2_geo_001", qtype="mcq_single",
            prompt=q, options=opts, correct=ans,
            explanation=f"The correct answer is '{ans}'.",
            seed=seed_counter, difficulty="Easy",
        )
    elif qtype == "identify":
        q, ans, opts = rng.choice(kb["identify"])
        return Question(
            node_id="c2_geo_001", qtype="identify",
            prompt=q, options=opts, correct=ans,
            explanation=f"The correct answer is '{ans}'.",
            seed=seed_counter, difficulty="Easy",
        )
    elif qtype == "truefalse":
        fact, ans = rng.choice(kb["facts"])
        return Question(
            node_id="c2_geo_001", qtype="truefalse",
            prompt=f"Say True or False: {fact}",
            correct="True" if ans else "False",
            answer_text="True" if ans else "False",
            explanation=f"This statement is {'True' if ans else 'False'}.",
            seed=seed_counter, difficulty="Easy",
        )
    else:  # fillblank
        fill_map = [
            ("Earth is round like a ____.", "ball"),
            ("The day sky is ____.", "blue"),
            ("Earth is our ____.", "home"),
            ("Earth has land and ____.", "water"),
            ("We see stars in the ____ sky.", "night"),
        ]
        q, ans = rng.choice(fill_map)
        return Question(
            node_id="c2_geo_001", qtype="fillblank",
            prompt=f"Fill in the blank: {q}",
            correct=ans,
            answer_text=ans,
            explanation=f"The blank should be filled with '{ans}'.",
            seed=seed_counter, difficulty="Easy",
        )


def _gen_002(rng: random.Random, qtype: str, seed_counter: int) -> Question:
    kb = KB[NodeID.c2_geo_002]
    if qtype == "vocab":
        words = list(kb["vocab"].keys())
        word = rng.choice(words)
        return Question(
            node_id="c2_geo_002", qtype="vocab",
            prompt=f"What is the meaning of '{word}'?",
            answer_text=kb["vocab"][word],
            explanation=f"'{word}' means: {kb['vocab'][word]}",
            seed=seed_counter, difficulty="Easy",
        )
    elif qtype == "mcq_single":
        q, ans, opts = rng.choice(kb["mcq"])
        return Question(
            node_id="c2_geo_002", qtype="mcq_single",
            prompt=q, options=opts, correct=ans,
            explanation=f"The correct answer is '{ans}'.",
            seed=seed_counter, difficulty="Easy",
        )
    elif qtype == "identify":
        q, ans, opts = rng.choice(kb["identify"])
        return Question(
            node_id="c2_geo_002", qtype="identify",
            prompt=q, options=opts, correct=ans,
            explanation=f"The correct answer is '{ans}'.",
            seed=seed_counter, difficulty="Easy",
        )
    elif qtype == "truefalse":
        fact, ans = rng.choice(kb["facts"])
        return Question(
            node_id="c2_geo_002", qtype="truefalse",
            prompt=f"Say True or False: {fact}",
            correct="True" if ans else "False",
            answer_text="True" if ans else "False",
            explanation=f"This statement is {'True' if ans else 'False'}.",
            seed=seed_counter, difficulty="Easy",
        )
    else:  # fillblank
        fill_map = [
            ("The sun is the main source of ____ and heat.", "light"),
            ("A shadow forms when something ____ the sunlight.", "blocks"),
            ("Shadows are ____ at noon.", "short"),
            ("Shadows are ____ in the morning.", "long"),
            ("A ____ uses a shadow to tell time.", "sundial"),
        ]
        q, ans = rng.choice(fill_map)
        return Question(
            node_id="c2_geo_002", qtype="fillblank",
            prompt=f"Fill in the blank: {q}",
            correct=ans,
            answer_text=ans,
            explanation=f"The blank should be filled with '{ans}'.",
            seed=seed_counter, difficulty="Easy",
        )


def _gen_003(rng: random.Random, qtype: str, seed_counter: int) -> Question:
    kb = KB[NodeID.c2_geo_003]
    if qtype == "mcq_single":
        q, ans, opts = rng.choice(kb["mcq"])
        return Question(
            node_id="c2_geo_003", qtype="mcq_single",
            prompt=q, options=opts, correct=ans,
            explanation=f"The correct answer is '{ans}'.",
            seed=seed_counter, difficulty="Easy",
        )
    elif qtype == "identify":
        q, ans, opts = rng.choice(kb["identify"])
        return Question(
            node_id="c2_geo_003", qtype="identify",
            prompt=q, options=opts, correct=ans,
            explanation=f"The correct answer is '{ans}'.",
            seed=seed_counter, difficulty="Easy",
        )
    elif qtype == "truefalse":
        fact, ans = rng.choice(kb["facts"])
        return Question(
            node_id="c2_geo_003", qtype="truefalse",
            prompt=f"Say True or False: {fact}",
            correct="True" if ans else "False",
            answer_text="True" if ans else "False",
            explanation=f"This statement is {'True' if ans else 'False'}.",
            seed=seed_counter, difficulty="Easy",
        )
    elif qtype == "sequence":
        correct = kb["sequence_times"]
        shuffled = correct.copy()
        rng.shuffle(shuffled)
        return Question(
            node_id="c2_geo_003", qtype="sequence",
            prompt="Arrange the following in the correct order of the day "
                   f"(first → last): {', '.join(shuffled)}",
            options=correct,  # stored as reference
            correct=" → ".join(correct),
            answer_text=" → ".join(correct),
            explanation=f"Correct order: {' → '.join(correct)}",
            seed=seed_counter, difficulty="Easy",
        )
    else:  # fillblank
        fill_map = [
            ("The sun rises in the ____.", "east"),
            ("The sun sets in the ____.", "west"),
            ("We ____ at night.", "sleep"),
            ("Birds ____ in the morning.", "chirp"),
            ("The first part of the day is called ____.", "morning"),
            ("____ opens in the day and closes at night.", "Lotus"),
        ]
        q, ans = rng.choice(fill_map)
        return Question(
            node_id="c2_geo_003", qtype="fillblank",
            prompt=f"Fill in the blank: {q}",
            correct=ans,
            answer_text=ans,
            explanation=f"The blank should be filled with '{ans}'.",
            seed=seed_counter, difficulty="Easy",
        )


def _gen_004(rng: random.Random, qtype: str, seed_counter: int) -> Question:
    kb = KB[NodeID.c2_geo_004]
    if qtype == "mcq_single":
        q, ans, opts = rng.choice(kb["mcq"])
        return Question(
            node_id="c2_geo_004", qtype="mcq_single",
            prompt=q, options=opts, correct=ans,
            explanation=f"The correct answer is '{ans}'.",
            seed=seed_counter, difficulty="Easy",
        )
    elif qtype == "identify":
        q, ans, opts = rng.choice(kb["identify"])
        return Question(
            node_id="c2_geo_004", qtype="identify",
            prompt=q, options=opts, correct=ans,
            explanation=f"The correct answer is '{ans}'.",
            seed=seed_counter, difficulty="Easy",
        )
    elif qtype == "truefalse":
        fact, ans = rng.choice(kb["facts"])
        return Question(
            node_id="c2_geo_004", qtype="truefalse",
            prompt=f"Say True or False: {fact}",
            correct="True" if ans else "False",
            answer_text="True" if ans else "False",
            explanation=f"This statement is {'True' if ans else 'False'}.",
            seed=seed_counter, difficulty="Easy",
        )
    elif qtype == "weather_symbol":
        weathers = list(kb["weather_symbols"].keys())
        weather = rng.choice(weathers)
        correct_sym = kb["weather_symbols"][weather]
        # build options: 4 random symbols
        all_syms = list(kb["weather_symbols"].values())
        opts = list(set(all_syms + [correct_sym]))
        while len(opts) < 4:
            opts.append(rng.choice(all_syms))
        opts = list(set(opts))[:4]
        if correct_sym not in opts:
            opts[rng.randint(0, 3)] = correct_sym
        rng.shuffle(opts)
        return Question(
            node_id="c2_geo_004", qtype="weather_symbol",
            prompt=f"Which symbol represents '{weather}' weather?",
            options=opts, correct=correct_sym,
            explanation=f"The symbol for '{weather}' is {correct_sym}.",
            seed=seed_counter, difficulty="Easy",
        )
    elif qtype == "clothes_weather":
        item, weather = rng.choice(kb["clothes_weather"])
        distractors = ["sunny", "rainy", "windy", "cold", "hot"]
        distractors = [d for d in distractors if d != weather]
        opts = [weather] + rng.sample(distractors, min(3, len(distractors)))
        rng.shuffle(opts)
        return Question(
            node_id="c2_geo_004", qtype="clothes_weather",
            prompt=f"We wear a '{item}' in which type of weather?",
            options=opts, correct=weather,
            explanation=f"A '{item}' is used in {weather} weather.",
            seed=seed_counter, difficulty="Easy",
        )
    else:  # fillblank
        fill_map = [
            ("____ means bright with the sun shining.", "Sunny"),
            ("____ means raining — water falls from clouds.", "Rainy"),
            ("____ means lots of moving air.", "Windy"),
            ("____ weather is very warm.", "Hot"),
            ("____ means slightly cold but comfortable.", "Cool"),
            ("Dark clouds mean ____ is likely.", "rain"),
        ]
        q, ans = rng.choice(fill_map)
        return Question(
            node_id="c2_geo_004", qtype="fillblank",
            prompt=f"Fill in the blank: {q}",
            correct=ans,
            answer_text=ans,
            explanation=f"The blank should be filled with '{ans}'.",
            seed=seed_counter, difficulty="Easy",
        )

# ──────────────────────────────────────────────
#  MAIN GENERATOR CLASS
# ──────────────────────────────────────────────

class C2GeoQuestionGenerator:
    def __init__(self, master_seed: int = 42):
        self.master_seed = master_seed
        self._solver = get_solver(seed=master_seed)

    def generate(self, node: NodeID, n: int = 5,
                 seed: Optional[int] = None) -> List[Question]:
        rng = random.Random(seed if seed is not None else self.master_seed)
        questions: List[Question] = []
        counter = 0
        while len(questions) < n:
            counter += 1
            qtype = _pick_type(rng, node)
            if node == NodeID.c2_geo_001:
                q = _gen_001(rng, qtype, counter)
            elif node == NodeID.c2_geo_002:
                q = _gen_002(rng, qtype, counter)
            elif node == NodeID.c2_geo_003:
                q = _gen_003(rng, qtype, counter)
            elif node == NodeID.c2_geo_004:
                q = _gen_004(rng, qtype, counter)
            else:
                continue
            questions.append(q)
        return questions

    def generate_mixed(self, n_per_node: int = 3,
                       seed: Optional[int] = None) -> Dict[str, List[Question]]:
        rng = random.Random(seed if seed is not None else self.master_seed)
        result: Dict[str, List[Question]] = {}
        for node in NodeID:
            result[node.value] = []
            for i in range(n_per_node):
                qtype = _pick_type(rng, node)
                if node == NodeID.c2_geo_001:
                    q = _gen_001(rng, qtype, i + 1)
                elif node == NodeID.c2_geo_002:
                    q = _gen_002(rng, qtype, i + 1)
                elif node == NodeID.c2_geo_003:
                    q = _gen_003(rng, qtype, i + 1)
                else:
                    q = _gen_004(rng, qtype, i + 1)
                result[node.value].append(q)
        return result

    def check(self, node_id: str, qtype: str,
              user_answer: str, question: Question) -> CheckResult:
        node = NodeID(node_id)
        solver = self._solver

        if qtype == "truefalse":
            return solver.check_truefalse(node, question.prompt.replace("Say True or False: ", ""), user_answer)
        elif qtype == "mcq_single" or qtype == "identify" or qtype == "weather_symbol" or qtype == "clothes_weather":
            return solver.check_generic_mcq(question.prompt, question.correct, user_answer, question.options)
        elif qtype == "vocab":
            return solver.check_vocab(node, question.prompt.replace("What is the meaning of '", "").replace("'?", ""), user_answer)
        elif qtype == "fillblank":
            return CheckResult(
                correct=user_answer.strip().lower() == question.correct.lower(),
                user_answer=user_answer,
                correct_answer=question.correct,
                explanation=question.explanation,
                step_by_step=[
                    f"Question: {question.prompt}",
                    f"Your answer: {user_answer}",
                    f"Correct answer: {question.correct}",
                ],
            )
        elif qtype == "sequence":
            user_list = [s.strip() for s in user_answer.split("→")]
            return solver.check_sequence(node, user_list)
        else:
            return CheckResult(
                correct=False, user_answer=user_answer,
                correct_answer="?", explanation="Unknown question type.",
            )


# ──────────────────────────────────────────────
#  CONVENIENCE FUNCTIONS
# ──────────────────────────────────────────────

_generator = None

def get_generator(master_seed: int = 42) -> C2GeoQuestionGenerator:
    global _generator
    if _generator is None:
        _generator = C2GeoQuestionGenerator(master_seed=master_seed)
    return _generator

def generate_for_node(node: str, n: int = 5,
                      seed: Optional[int] = None) -> List[Question]:
    gen = get_generator()
    return gen.generate(NodeID(node), n=n, seed=seed)

def generate_all(n_per_node: int = 3,
                 seed: Optional[int] = None) -> Dict[str, List[Question]]:
    gen = get_generator()
    return gen.generate_mixed(n_per_node=n_per_node, seed=seed)

def check_answer(node_id: str, qtype: str,
                 question: Question, user_answer: str) -> CheckResult:
    gen = get_generator()
    return gen.check(node_id, qtype, user_answer, question)

# ──────────────────────────────────────────────
#  VERIFICATION  (smoke test)
# ──────────────────────────────────────────────

if __name__ == "__main__":
    gen = C2GeoQuestionGenerator(master_seed=42)

    print("=" * 60)
    print("  CLASS 2 GEOGRAPHY — SOLVER & GENERATOR TEST")
    print("=" * 60)

    # Generate 2 questions per node
    mixed = gen.generate_mixed(n_per_node=2, seed=42)

    for node_id, questions in mixed.items():
        print(f"\n── {node_id} ──")
        for q in questions:
            print(f"  [{q.qtype}] {q.prompt}")
            if q.options:
                for i, opt in enumerate(q.options):
                    marker = "✓" if opt == q.correct else " "
                    print(f"    {marker} {chr(65+i)}. {opt}")
            else:
                print(f"    Answer: {q.correct}")
            print(f"    Explanation: {q.explanation}")

            # ── Auto-check ──
            if q.qtype == "truefalse":
                result = gen.check(node_id, q.qtype, q.correct, q)
            elif q.qtype == "sequence":
                result = gen.check(node_id, q.qtype, q.correct, q)
            elif q.qtype == "fillblank":
                result = gen.check(node_id, q.qtype, q.correct, q)
            elif q.qtype == "vocab":
                result = gen.check(node_id, q.qtype, q.answer_text, q)
            else:
                result = gen.check(node_id, q.qtype, q.correct, q)
            status = "✅ PASS" if result.correct else "❌ FAIL"
            print(f"    Check ({status}): got='{result.user_answer}' → expected='{result.correct_answer}'")

    print("\n" + "=" * 60)
    print("  ALL TESTS COMPLETE")
    print("=" * 60)