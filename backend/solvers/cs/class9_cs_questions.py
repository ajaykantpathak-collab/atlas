"""Question generator for ICSE Class 9 Computer Science — Nodes c9_cs_001 & c9_cs_002.
Produces a mix of standard (50 %) and Indian-competency (50 %) questions.
All random choices are seeded via deterministic params, so re-running with
the same seed produces identical question sets — making grading reproducible.
"""
from __future__ import annotations

import dataclasses
import enum
import random
import textwrap
from typing import Any, Dict, List, Optional, Tuple

# ─────────────────────────────────────────────────────────────────────────────
# Deferred import of solver types (avoids circular dependency)
# ─────────────────────────────────────────────────────────────────────────────
from class9_cs_solver import (
    AnswerFormat,
    CPU_COMPONENTS,
    MEMORY_TYPES_FRIENDLY,
    MEMORY_TYPES_ORDERED,
    NON_VOLATILE,
    Problem,
    ProblemType,
    VOLATILE,
)

# ─────────────────────────────────────────────────────────────────────────────
# Generator configuration
# ─────────────────────────────────────────────────────────────────────────────
@dataclasses.dataclass(frozen=True)
class GeneratorConfig:
    """Parameters controlling question generation."""
    seed: int                          # master seed — controls all randomness
    total_questions: int = 20          # total questions to generate
    standard_ratio: float = 0.50       # fraction of standard-context questions
    competency_ratio: float = 0.50     # fraction of Indian-competency questions
    difficulties: Tuple[str, ...] = ("standard", "competency")

    def __post_init__(self):
        assert abs(self.standard_ratio + self.competency_ratio - 1.0) < 1e-9, (
            "standard_ratio + competency_ratio must equal 1.0"
        )


# ─────────────────────────────────────────────────────────────────────────────
# QBank  — individual question with metadata
# ─────────────────────────────────────────────────────────────────────────────
@dataclasses.dataclass
class QBank:
    id: str
    node: str               # c9_cs_001 or c9_cs_002
    problem_type: str
    difficulty: str         # "standard" | "competency"
    context: str            # "standard" | "competency"
    problem: Problem
    correct_answer: Any
    explanation: str
    marks: int = 2
    board_relevance: str = "Board_Only"

    def render(self) -> str:
        header = f"[{self.node} | {self.difficulty.upper()} | {self.context}] Q{self.id}"
        q_text  = textwrap.fill(self.problem.render_question(), width=88)
        ans     = textwrap.fill(str(self.correct_answer), width=88)
        exp     = textwrap.fill(self.explanation, width=88)
        return (
            f"\n{'─'*70}\n{header}\n{'─'*70}\n"
            f"{q_text}\n"
            f"\nANSWER : {ans}\n"
            f"MARKS  : {self.marks}\n"
            f"NOTE   : {exp}\n"
        )

    def to_dict(self) -> dict:
        return {
            "id": self.id, "node": self.node, "problem_type": self.problem_type,
            "difficulty": self.difficulty, "context": self.context,
            "question": self.problem.render_question(),
            "correct_answer": str(self.correct_answer),
            "explanation": self.explanation, "marks": self.marks,
        }


# ─────────────────────────────────────────────────────────────────────────────
# QuestionGenerator
# ─────────────────────────────────────────────────────────────────────────────
class QuestionGenerator:
    """Generates seeded, reproducible questions for both c9_cs_001 and c9_cs_002."""

    def __init__(self, config: GeneratorConfig) -> None:
        self.cfg   = config
        self._rng  = random.Random(config.seed)
        self._bank: List[QBank] = []

    # ─────────────────────────────────────────────────────────────────────────
    # Question-type distribution
    # ─────────────────────────────────────────────────────────────────────────
    @staticmethod
    def _available_001() -> List[str]:
        """All problem types for node c9_cs_001."""
        return [
            ProblemType.CPU_COMPONENTS.value,
            ProblemType.CPU_BUS.value,
            ProblemType.ALU_FUNCTIONS.value,
            ProblemType.FDE_CYCLE.value,
            ProblemType.CU_FUNCTION.value,
            ProblemType.REGISTER_IDENTIFY.value,
        ]

    @staticmethod
    def _available_002() -> List[str]:
        """All problem types for node c9_cs_002."""
        return [
            ProblemType.MEMORY_HIERARCHY.value,
            ProblemType.VOLATILE_NON_VOLATILE.value,
            ProblemType.CACHE_FASTER_RAM.value,
            ProblemType.MEMORY_TYPE_CLASSIFY.value,
        ]

    def _counts(self, types: List[str], n: int) -> Dict[str, int]:
        """Distribute n questions evenly across types (remainder goes to first)."""
        base, rem = divmod(n, len(types))
        return {t: base + (1 if i < rem else 0) for i, t in enumerate(types)}

    # ─────────────────────────────────────────────────────────────────────────
    # Node c9_cs_001  — Computer Architecture
    # ─────────────────────────────────────────────────────────────────────────
    def _gen_001(self) -> List[QBank]:
        """Generate questions for CPU architecture."""
        questions: List[QBank] = []
        std_count  = int(self.cfg.total_questions * self.cfg.standard_ratio) // 2
        comp_count = self.cfg.total_questions // 2 - std_count

        ptypes = self._available_001()
        std_counts  = self._counts(ptypes, max(std_count,  1))
        comp_counts = self._counts(ptypes, max(comp_count, 1))

        # ── Standard context ────────────────────────────────────────────────
        for ptype, count in std_counts.items():
            for i in range(count):
                seed = self._rng.randint(0, 1_000_000)
                qb = self._build_001(ptype, "standard", seed, i)
                if qb:
                    questions.append(qb)

        # ── Competency context ──────────────────────────────────────────────
        for ptype, count in comp_counts.items():
            for i in range(count):
                seed = self._rng.randint(0, 1_000_000)
                qb = self._build_001(ptype, "competency", seed, i)
                if qb:
                    questions.append(qb)

        return questions

    def _build_001(self, ptype: str, ctx: str, seed: int, idx: int) -> Optional[QBank]:
        """Dispatch to the specific builder for each problem type."""
        rng = random.Random(seed)
        builders = {
            ProblemType.CPU_COMPONENTS.value: self._b_cpu_components,
            ProblemType.CPU_BUS.value:        self._b_cpu_bus,
            ProblemType.ALU_FUNCTIONS.value:  self._b_alu_functions,
            ProblemType.FDE_CYCLE.value:      self._b_fde_cycle,
            ProblemType.CU_FUNCTION.value:    self._b_cu_function,
            ProblemType.REGISTER_IDENTIFY.value: self._b_register_identify,
        }
        builder = builders.get(ptype)
        return builder(ctx, rng, idx) if builder else None

    # ── Standard builders ──────────────────────────────────────────────────
    def _b_cpu_components(self, ctx: str, rng: random.Random, idx: int) -> QBank:
        templates = [
            (
                "List the three main components of the Central Processing Unit (CPU).",
                "State ONE primary function for each component.",
                sorted(CPU_COMPONENTS),
                "The three components are ALU (arithmetic/logic), CU (control/coordination), "
                "and Registers (fast temporary storage).",
            ),
            (
                "The CPU is the brain of the computer. Name its three main sub-components.",
                "Give a one-line description of the role of each sub-component.",
                sorted(CPU_COMPONENTS),
                "ALU performs arithmetic/logic; CU directs operations; Registers store "
                "temporary data inside the CPU.",
            ),
            (
                "Define the term CPU and name its three primary components.",
                "Briefly explain what each component does.",
                sorted(CPU_COMPONENTS),
                "CPU = Central Processing Unit; ALU, CU, Registers as defined in the syllabus.",
            ),
        ]
        t = templates[idx % len(templates)]
        problem = Problem(
            problem_type=ProblemType.CPU_COMPONENTS.value,
            difficulty=ctx,
            question=t[0] + "\n" + t[1],
            answer_format=AnswerFormat.FIB.value,
            correct_answer=", ".join(t[2]),
            params={"seed": rng.randint(0, 999_999)},
        )
        return QBank(
            id=f"001-{ctx[:3]}-{idx+1:02d}",
            node="c9_cs_001", problem_type=problem.problem_type,
            difficulty=ctx, context=ctx,
            problem=problem, correct_answer=t[2],
            explanation=t[3], marks=2,
        )

    def _b_cpu_bus(self, ctx: str, rng: random.Random, idx: int) -> QBank:
        bus_types = [("address", "addresses"), ("data", "actual data"),
                     ("control", "control and timing signals")]
        bt, keyword = bus_types[idx % len(bus_types)]

        correct_idx = ["data", "address", "control"].index(bt)
        opts_pool   = ["Data Bus", "Address Bus", "Control Bus", "Power Bus"]
        rng.shuffle(opts_pool)
        # Ensure correct answer is present
        correct_text = {"data": "Data Bus", "address": "Address Bus",
                        "control": "Control Bus"}[bt]
        if correct_text not in opts_pool:
            opts_pool[0] = correct_text

        problem = Problem(
            problem_type=ProblemType.CPU_BUS.value,
            difficulty=ctx,
            question=(
                f"The system bus connects the CPU, memory, and I/O devices. "
                f"Which type of bus carries {keyword} between these components?"
            ),
            answer_format=AnswerFormat.MC.value,
            options=opts_pool,
            correct_answer=opts_pool.index(correct_text),
            params={"bus_type": bt, "seed": rng.randint(0, 999_999)},
        )
        return QBank(
            id=f"001-{ctx[:3]}-{idx+1:02d}",
            node="c9_cs_001", problem_type=problem.problem_type,
            difficulty=ctx, context=ctx,
            problem=problem, correct_answer=opts_pool.index(correct_text),
            explanation=f"The {bt} bus carries {keyword}.",
            marks=1,
        )

    def _b_alu_functions(self, ctx: str, rng: random.Random, idx: int) -> QBank:
        arith_q = (
            "The Arithmetic and Logic Unit (ALU) performs two categories of operations.\n"
            "(a) Name TWO arithmetic operations performed by the ALU.\n"
            "(b) Name TWO logical operations performed by the ALU.",
            "ALU Arithmetic ops: Addition, Subtraction, Multiplication, Division.\n"
            "ALU Logical ops: AND, OR, NOT, Comparison.",
        )
        single_q = (
            "Which component of the CPU performs arithmetic operations such as "
            "addition and subtraction?",
            "The ALU (Arithmetic and Logic Unit).",
        )
        if idx % 2 == 0:
            problem = Problem(
                problem_type=ProblemType.ALU_FUNCTIONS.value,
                difficulty=ctx, question=arith_q[0],
                answer_format=AnswerFormat.FIB.value,
                correct_answer="Addition, Subtraction, AND, OR",
                params={"seed": rng.randint(0, 999_999)},
            )
            return QBank(
                id=f"001-{ctx[:3]}-{idx+1:02d}", node="c9_cs_001",
                problem_type=problem.problem_type, difficulty=ctx, context=ctx,
                problem=problem,
                correct_answer="Addition, Subtraction (arithmetic) + AND, OR (logical)",
                explanation=arith_q[1], marks=2,
            )
        else:
            opts = ["ALU", "CU", "Registers", "MAR"]
            rng.shuffle(opts)
            problem = Problem(
                problem_type=ProblemType.ALU_FUNCTIONS.value,
                difficulty=ctx, question=single_q[0],
                answer_format=AnswerFormat.MC.value,
                options=opts, correct_answer=opts.index("ALU"),
                params={"seed": rng.randint(0, 999_999)},
            )
            return QBank(
                id=f"001-{ctx[:3]}-{idx+1:02d}", node="c9_cs_001",
                problem_type=problem.problem_type, difficulty=ctx, context=ctx,
                problem=problem, correct_answer="ALU",
                explanation=single_q[1], marks=1,
            )

    def _b_fde_cycle(self, ctx: str, rng: random.Random, idx: int) -> QBank:
        stages = ["Fetch", "Decode", "Execute"]
        rng.shuffle(stages)
        problem = Problem(
            problem_type=ProblemType.FDE_CYCLE.value,
            difficulty=ctx,
            question=(
                "The CPU processes each instruction through the Fetch-Decode-Execute cycle.\n"
                "Arrange the following stages in their CORRECT order:\n"
                + "\n".join(f"   ({chr(65+i)}) {s}" for i, s in enumerate(stages))
            ),
            answer_format=AnswerFormat.ORDER.value,
            correct_answer=", ".join(["Fetch", "Decode", "Execute"]),
            params={"steps": ["Fetch", "Decode", "Execute"], "seed": rng.randint(0, 999_999)},
        )
        return QBank(
            id=f"001-{ctx[:3]}-{idx+1:02d}", node="c9_cs_001",
            problem_type=problem.problem_type, difficulty=ctx, context=ctx,
            problem=problem, correct_answer="Fetch → Decode → Execute",
            explanation=(
                "Fetch: CPU reads instruction from PC's memory address. "
                "Decode: CU interprets the instruction. "
                "Execute: ALU performs the operation."
            ),
            marks=2,
        )

    def _b_cu_function(self, ctx: str, rng: random.Random, idx: int) -> QBank:
        templates = [
            (
                "What is the primary role of the Control Unit (CU) within the CPU?",
                "The CU directs and coordinates all CPU operations. It fetches instructions "
                "from memory, decodes them into control signals, and issues those signals "
                "to the ALU, registers and other components to execute each instruction.",
            ),
            (
                "Explain how the Control Unit (CU) differs from the ALU in terms of function.",
                "The CU manages and coordinates operations (fetches, decodes, issues signals); "
                "the ALU performs the actual arithmetic and logical calculations.",
            ),
        ]
        t = templates[idx % len(templates)]
        problem = Problem(
            problem_type=ProblemType.CU_FUNCTION.value,
            difficulty=ctx, question=t[0],
            answer_format=AnswerFormat.FIB.value,
            correct_answer=t[1],
            params={"seed": rng.randint(0, 999_999)},
        )
        return QBank(
            id=f"001-{ctx[:3]}-{idx+1:02d}", node="c9_cs_001",
            problem_type=problem.problem_type, difficulty=ctx, context=ctx,
            problem=problem, correct_answer=t[1], explanation=t[1], marks=2,
        )

    def _b_register_identify(self, ctx: str, rng: random.Random, idx: int) -> QBank:
        reg_data = [
            ("program_counter",  "Program Counter",
             "holds the memory address of the next instruction to be executed"),
            ("instruction_register", "Instruction Register",
             "holds the instruction that is currently being decoded and executed"),
            ("accumulator", "Accumulator",
             "stores the intermediate results of arithmetic and logic operations"),
            ("memory_address_register", "Memory Address Register",
             "holds the memory address of the data or instruction being accessed"),
        ]
        reg_key, reg_name, reg_desc = reg_data[idx % len(reg_data)]
        opts = [r[1] for r in reg_data]
        rng.shuffle(opts)

        problem = Problem(
            problem_type=ProblemType.REGISTER_IDENTIFY.value,
            difficulty=ctx,
            question=f"Which register {reg_desc}?",
            answer_format=AnswerFormat.MC.value,
            options=opts, correct_answer=opts.index(reg_name),
            params={"reg_key": reg_key, "seed": rng.randint(0, 999_999)},
        )
        return QBank(
            id=f"001-{ctx[:3]}-{idx+1:02d}", node="c9_cs_001",
            problem_type=problem.problem_type, difficulty=ctx, context=ctx,
            problem=problem, correct_answer=reg_name,
            explanation=f"The {reg_name} {reg_desc}.",
            marks=1,
        )

    # ─────────────────────────────────────────────────────────────────────────
    # Node c9_cs_002  — Memory Hierarchy
    # ─────────────────────────────────────────────────────────────────────────
    def _gen_002(self) -> List[QBank]:
        """Generate questions for memory hierarchy."""
        questions: List[QBank] = []
        std_count  = int(self.cfg.total_questions * self.cfg.standard_ratio) // 2
        comp_count = self.cfg.total_questions // 2 - std_count

        ptypes = self._available_002()
        std_counts  = self._counts(ptypes, max(std_count,  1))
        comp_counts = self._counts(ptypes, max(comp_count, 1))

        for ptype, count in std_counts.items():
            for i in range(count):
                seed = self._rng.randint(0, 1_000_000)
                qb = self._build_002(ptype, "standard", seed, i)
                if qb:
                    questions.append(qb)

        for ptype, count in comp_counts.items():
            for i in range(count):
                seed = self._rng.randint(0, 1_000_000)
                qb = self._build_002(ptype, "competency", seed, i)
                if qb:
                    questions.append(qb)

        return questions

    def _build_002(self, ptype: str, ctx: str, seed: int, idx: int) -> Optional[QBank]:
        builders = {
            ProblemType.MEMORY_HIERARCHY.value:     self._b_mem_hierarchy,
            ProblemType.VOLATILE_NON_VOLATILE.value: self._b_volatile_nv,
            ProblemType.CACHE_FASTER_RAM.value:      self._b_cache_faster,
            ProblemType.MEMORY_TYPE_CLASSIFY.value:  self._b_mem_classify,
        }
        builder = builders.get(ptype)
        return builder(ctx, random.Random(seed), idx) if builder else None

    def _b_mem_hierarchy(self, ctx: str, rng: random.Random, idx: int) -> QBank:
        """Arrange five memory types fastest → slowest."""
        labels = ["(A) Registers", "(B) Cache Memory", "(C) RAM",
                  "(D) ROM", "(E) Secondary Storage"]
        rng.shuffle(labels)

        problem = Problem(
            problem_type=ProblemType.MEMORY_HIERARCHY.value,
            difficulty=ctx,
            question=(
                "Arrange the following memory types from FASTEST to SLOWEST "
                "(in terms of access speed):\n"
                + "\n".join(f"   {lab}" for lab in labels)
            ),
            answer_format=AnswerFormat.ORDER.value,
            correct_answer=", ".join(MEMORY_TYPES_ORDERED),
            params={"seed": rng.randint(0, 999_999)},
        )
        ordered_friendly = [MEMORY_TYPES_FRIENDLY[t] for t in MEMORY_TYPES_ORDERED]
        explanation = (
            "1. Registers – fastest (inside CPU, nanoseconds)\n"
            "2. Cache     – very fast (L1/L2/L3, on/near CPU die)\n"
            "3. RAM       – fast main memory (microseconds, volatile)\n"
            "4. ROM       – non-volatile firmware storage (moderate speed)\n"
            "5. Secondary Storage – slowest (HDD/SSD, milliseconds, highest capacity)\n\n"
            "As speed increases → capacity decreases → cost per byte increases."
        )
        return QBank(
            id=f"002-{ctx[:3]}-{idx+1:02d}", node="c9_cs_002",
            problem_type=problem.problem_type, difficulty=ctx, context=ctx,
            problem=problem,
            correct_answer=" → ".join(ordered_friendly),
            explanation=explanation, marks=2,
        )

    def _b_volatile_nv(self, ctx: str, rng: random.Random, idx: int) -> QBank:
        mem_types = list(VOLATILE | NON_VOLATILE)
        mem_type  = mem_types[idx % len(mem_types)]

        correct_cat = (
            "Volatile" if mem_type in VOLATILE else "Non-Volatile"
        )
        correct_desc = (
            "loses all stored data when power is switched off"
            if mem_type in VOLATILE
            else "retains stored data even when power is switched off"
        )
        question = (
            f"Is {MEMORY_TYPES_FRIENDLY[mem_type]} volatile or non-volatile?\n"
            f"What does '{correct_cat.lower()}' mean?"
        )

        problem = Problem(
            problem_type=ProblemType.VOLATILE_NON_VOLATILE.value,
            difficulty=ctx, question=question,
            answer_format=AnswerFormat.FIB.value,
            correct_answer=f"{correct_cat} — {correct_desc}",
            params={"memory_type": mem_type, "seed": rng.randint(0, 999_999)},
        )
        return QBank(
            id=f"002-{ctx[:3]}-{idx+1:02d}", node="c9_cs_002",
            problem_type=problem.problem_type, difficulty=ctx, context=ctx,
            problem=problem,
            correct_answer=f"{correct_cat}: {correct_desc}",
            explanation=(
                f"Volatile memory (Registers, Cache, RAM) loses data without power. "
                f"Non-volatile memory (ROM, Secondary Storage) retains data without power."
            ),
            marks=2,
        )

    def _b_cache_faster(self, ctx: str, rng: random.Random, idx: int) -> QBank:
        """Why is cache memory faster than RAM?"""
        question_variants = [
            (
                "Cache memory operates at a higher speed than the main RAM. "
                "Give TWO reasons why cache memory is faster than RAM.",
                "Reasons: (1) Cache is physically closer to the CPU core → shorter "
                "signal travel time. (2) Cache uses SRAM technology (6 transistors per "
                "cell), which is inherently faster than the DRAM technology (1 transistor "
                "+ capacitor) used in RAM. Also: cache is smaller so the entire cache "
                "can be kept in an always-on state.",
            ),
            (
                "Explain why cache memory provides faster access than RAM, "
                "even though both hold data for the CPU.",
                "Cache is physically closer to the CPU and uses faster SRAM technology "
                "vs DRAM in RAM. Its smaller size allows the whole cache to be "
                "continuously powered and accessible.",
            ),
        ]
        q, exp = question_variants[idx % len(question_variants)]

        # MC variant every other question
        if idx % 2 == 1:
            opts = [
                "Cache is larger and uses DRAM",
                "Cache is closer to the CPU and uses SRAM",
                "Cache has higher capacity than RAM",
                "Cache is non-volatile while RAM is volatile",
            ]
            rng.shuffle(opts)
            problem = Problem(
                problem_type=ProblemType.CACHE_FASTER_RAM.value,
                difficulty=ctx, question=q,
                answer_format=AnswerFormat.MC.value,
                options=opts,
                correct_answer=opts.index("Cache is closer to the CPU and uses SRAM"),
                params={"seed": rng.randint(0, 999_999)},
            )
            return QBank(
                id=f"002-{ctx[:3]}-{idx+1:02d}", node="c9_cs_002",
                problem_type=problem.problem_type, difficulty=ctx, context=ctx,
                problem=problem,
                correct_answer="Cache is closer to the CPU and uses SRAM",
                explanation=exp, marks=1,
            )

        problem = Problem(
            problem_type=ProblemType.CACHE_FASTER_RAM.value,
            difficulty=ctx, question=q,
            answer_format=AnswerFormat.FIB.value,
            correct_answer=exp,
            params={"seed": rng.randint(0, 999_999)},
        )
        return QBank(
            id=f"002-{ctx[:3]}-{idx+1:02d}", node="c9_cs_002",
            problem_type=problem.problem_type, difficulty=ctx, context=ctx,
            problem=problem, correct_answer=exp, explanation=exp, marks=2,
        )

    def _b_mem_classify(self, ctx: str, rng: random.Random, idx: int) -> QBank:
        """Classify a given memory type description."""
        mem_items = [
            ("registers", "Registers",
             "ultra-fast, smallest storage locations located inside the CPU, "
             "holding data during instruction execution"),
            ("cache", "Cache Memory",
             "high-speed memory organised in levels L1, L2, L3, situated between "
             "the CPU and RAM to reduce access time"),
            ("RAM", "RAM",
             "volatile main memory that holds data and programs currently in use; "
             "data is lost when power is switched off"),
            ("ROM", "ROM",
             "non-volatile memory that permanently stores firmware such as BIOS/UEFI; "
             "data is retained without power"),
            ("secondary_storage", "Secondary Storage",
             "slowest but highest-capacity storage (HDD, SSD, optical disks, USB); "
             "retains data permanently without power"),
        ]
        mkey, mname, mdesc = mem_items[idx % len(mem_items)]

        question = (
            f"Read the description below and identify the memory type:\n"
            f"   \"{mdesc}\""
        )

        opts = [m[1] for m in mem_items]
        rng.shuffle(opts)

        problem = Problem(
            problem_type=ProblemType.MEMORY_TYPE_CLASSIFY.value,
            difficulty=ctx, question=question,
            answer_format=AnswerFormat.MC.value,
            options=opts, correct_answer=opts.index(mname),
            params={"memory_type": mkey, "seed": rng.randint(0, 999_999)},
        )
        explanation = (
            f"{mname}: {mdesc}. "
            f"Category: {'Volatile' if mkey in VOLATILE else 'Non-Volatile'}."
        )
        return QBank(
            id=f"002-{ctx[:3]}-{idx+1:02d}", node="c9_cs_002",
            problem_type=problem.problem_type, difficulty=ctx, context=ctx,
            problem=problem, correct_answer=mname,
            explanation=explanation, marks=1,
        )

    # ─────────────────────────────────────────────────────────────────────────
    # Public API
    # ─────────────────────────────────────────────────────────────────────────
    def generate(self) -> List[QBank]:
        """Generate the full question bank."""
        self._bank = self._gen_001() + self._gen_002()
        # Shuffle with a secondary seed so order is reproducible but varied
        shuffle_rng = random.Random(self.cfg.seed + 999)
        shuffle_rng.shuffle(self._bank)
        # Assign sequential IDs after shuffle
        for i, qb in enumerate(self._bank):
            qb.id = f"Q{i+1:03d}"
        return self._bank

    def generate_quiz(self) -> Dict[str, Any]:
        """Return a quiz-ready dict with questions and answer key."""
        questions = self.generate()
        quiz: Dict[str, Any] = {
            "title": "ICSE Class 9 Computer Science — Practice Quiz",
            "nodes": ["c9_cs_001", "c9_cs_002"],
            "config": dataclasses.asdict(self.cfg),
            "total_questions": len(questions),
            "questions": [qb.to_dict() for qb in questions],
            "answer_key": {
                qb.id: {
                    "correct_answer": str(qb.correct_answer),
                    "problem_type":  qb.problem_type,
                    "node":          qb.node,
                }
                for qb in questions
            },
        }
        return quiz

    def export(self, fmt: str = "text") -> str:
        """Export the bank as 'text' or 'json'."""
        if not self._bank:
            self.generate()
        if fmt == "json":
            return json.dumps(self.generate_quiz(), indent=2, default=str)
        # text
        lines: List[str] = [
            "=" * 70,
            "  ICSE Class 9 Computer Science — Practice Question Bank",
            "  Nodes: c9_cs_001 (CPU Architecture) | c9_cs_002 (Memory Hierarchy)",
            f"  Seed: {self.cfg.seed}  |  Total Questions: {len(self._bank)}",
            "=" * 70,
        ]
        for qb in self._bank:
            lines.append(qb.render())
        lines.append("\n" + "=" * 70)
        lines.append("  ANSWER KEY")
        lines.append("=" * 70)
        for qb in self._bank:
            lines.append(f"  {qb.id}  [{qb.node}]  →  {qb.correct_answer}")
        return "\n".join(lines)


# ─────────────────────────────────────────────────────────────────────────────
# CLI
# ─────────────────────────────────────────────────────────────────────────────
def _cli():
    import argparse, sys

    parser = argparse.ArgumentParser(
        description="Generate ICSE Class 9 CS practice questions (Nodes 001 & 002)."
    )
    parser.add_argument("--seed",      type=int,   default=42,    help="Master random seed (default: 42)")
    parser.add_argument("--total",     type=int,   default=20,    help="Total questions (default: 20)")
    parser.add_argument("--std-ratio", type=float, default=0.50,  help="Standard-question ratio (default: 0.50)")
    parser.add_argument("--comp-ratio",type=float, default=0.50,  help="Competency-question ratio (default: 0.50)")
    parser.add_argument("--format",    type=str,   default="text", choices=["text", "json"],
                        help="Output format (default: text)")
    parser.add_argument("--node",      type=str,   default="both", choices=["001", "002", "both"],
                        help="Which node(s) to generate (default: both)")
    parser.add_argument("--difficulty",type=str,   default="all",  choices=["standard", "competency", "all"],
                        help="Difficulty filter (default: all)")
    parser.add_argument("--save",      type=str,   default=None,   help="Save output to file path")
    args = parser.parse_args()

    cfg = GeneratorConfig(
        seed=args.seed,
        total_questions=args.total,
        standard_ratio=args.std_ratio,
        competency_ratio=args.comp_ratio,
    )
    gen = QuestionGenerator(cfg)

    # Generate
    if args.node == "001":
        gen._bank = gen._gen_001()
    elif args.node == "002":
        gen._bank = gen._gen_002()
    else:
        gen._bank = gen._gen_001() + gen._gen_002()

    shuffle_rng = random.Random(args.seed + 999)
    shuffle_rng.shuffle(gen._bank)
    for i, qb in enumerate(gen._bank):
        qb.id = f"Q{i+1:03d}"

    # Filter difficulty
    if args.difficulty != "all":
        gen._bank = [qb for qb in gen._bank if qb.difficulty == args.difficulty]

    output = gen.export(fmt=args.format)

    if args.save:
        with open(args.save, "w", encoding="utf-8") as f:
            f.write(output)
        print(f"Saved {len(gen._bank)} questions to {args.save}")
    else:
        print(output)


if __name__ == "__main__":
    _cli()