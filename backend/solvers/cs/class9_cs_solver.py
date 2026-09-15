"""Deterministic solver for ICSE Class 9 Computer Science — Nodes c9_cs_001 & c9_cs_002.
All seed-sensitive randomness is parameter-driven (not hidden), so running with
the same (problem_type, seed, params) always returns the same answer.
"""
from __future__ import annotations

import dataclasses
import enum
import json
import math
import random
import textwrap
from typing import Any, Dict, List, Optional, Tuple, Union

# ─────────────────────────────────────────────────────────────────────────────
# Constants
# ─────────────────────────────────────────────────────────────────────────────
CPU_COMPONENTS = ("ALU", "CU", "Registers")
BUS_TYPES: Dict[str, str] = {
    "data_bus": "carries actual data between CPU, memory and I/O devices",
    "address_bus": "carries memory addresses from CPU to memory",
    "control_bus": "carries control and timing signals to coordinate operations",
}
REGISTER_NAMES = ("Program Counter", "Instruction Register", "Accumulator", "Memory Address Register")

MEMORY_TYPES_ORDERED = ["registers", "cache", "RAM", "ROM", "secondary_storage"]
MEMORY_TYPES_FRIENDLY = {
    "registers": "Registers",
    "cache": "Cache Memory",
    "RAM": "RAM (Random Access Memory)",
    "ROM": "ROM (Read Only Memory)",
    "secondary_storage": "Secondary Storage",
}
SPEED_LABELS = ["Fastest", "Second Fastest", "Third (Medium)", "Fourth", "Slowest"]

VOLATILE = {"registers", "cache", "RAM"}
NON_VOLATILE = {"ROM", "secondary_storage"}

FDE_STEPS = [
    ("Fetch",  "CPU reads the next instruction from the memory address held in the Program Counter"),
    ("Decode", "Control Unit interprets the fetched instruction to determine what operation to perform"),
    ("Execute","ALU carries out the operation (arithmetic, logic, or data movement) and stores the result"),
]
FDE_COMPLETE = ["Fetch", "Decode", "Execute"]

MC_ALU_FNS = [
    ("Addition", "Adds two numbers"),
    ("Subtraction", "Subtracts one number from another"),
    ("Multiplication", "Multiplies two numbers"),
    ("Division", "Divides one number by another"),
    ("AND", "Performs logical AND on binary values"),
    ("OR", "Performs logical OR on binary values"),
    ("NOT", "Performs logical NOT (inverts a bit)"),
    ("Comparison", "Compares two values (e.g. equal, greater than, less than)"),
]

# ─────────────────────────────────────────────────────────────────────────────
# Enums & Dataclasses
# ─────────────────────────────────────────────────────────────────────────────
class ProblemType(enum.Enum):
    CPU_COMPONENTS        = "cpu_components"
    CPU_BUS               = "cpu_bus"
    ALU_FUNCTIONS         = "alu_functions"
    FDE_CYCLE             = "fde_cycle"
    CU_FUNCTION           = "cu_function"
    REGISTER_IDENTIFY     = "register_identify"
    MEMORY_HIERARCHY      = "memory_hierarchy"
    VOLATILE_NON_VOLATILE = "volatile_non_volatile"
    CACHE_FASTER_RAM      = "cache_faster_ram"
    MEMORY_TYPE_CLASSIFY  = "memory_type_classify"


class AnswerFormat(enum.Enum):
    TEXT   = "text"
    MC     = "mc"
    ORDER  = "order"
    BOOL   = "bool"
    FIB    = "fib"


@dataclasses.dataclass
class Problem:
    """Immutable description of a single generated problem."""
    problem_type: str          # member of ProblemType
    difficulty: str            # "standard" | "competency"
    question: str
    answer_format: str         # member of AnswerFormat
    options: Optional[List[str]] = None
    correct_answer: Any = None
    params: Optional[Dict[str, Any]] = None  # seed, shuffle seed, etc.

    # ── display ──────────────────────────────────────────────────────────────
    def render_question(self) -> str:
        q = textwrap.fill(self.question, width=90)
        if self.answer_format == AnswerFormat.MC.value and self.options:
            opts = "\n".join(f"   {chr(65+i)}. {o}" for i, o in enumerate(self.options))
            return f"{q}\n\n{opts}\n"
        return q

    def render_answer(self) -> str:
        if self.answer_format == AnswerFormat.MC.value:
            if isinstance(self.correct_answer, int):
                letter = chr(65 + self.correct_answer)
                return f"Correct option: {letter}"
            return f"Correct option: {self.correct_answer}"
        if self.answer_format == AnswerFormat.BOOL.value:
            return "True" if self.correct_answer else "False"
        return str(self.correct_answer)

    def to_dict(self) -> dict:
        return dataclasses.asdict(self)


# ─────────────────────────────────────────────────────────────────────────────
# SolverRegistry  (each solver → (solution_text, is_correct))
# ─────────────────────────────────────────────────────────────────────────────
class SolverRegistry:
    """Maps problem_type → callable(Problem) → (step_by_step: str, correct: bool)."""

    def __init__(self) -> None:
        self._registry: Dict[str, callable] = self._build()

    def _build(self) -> Dict[str, callable]:
        return {
            ProblemType.CPU_COMPONENTS.value:        self._cpu_components,
            ProblemType.CPU_BUS.value:               self._cpu_bus,
            ProblemType.ALU_FUNCTIONS.value:         self._alu_functions,
            ProblemType.FDE_CYCLE.value:             self._fde_cycle,
            ProblemType.CU_FUNCTION.value:           self._cu_function,
            ProblemType.REGISTER_IDENTIFY.value:     self._register_identify,
            ProblemType.MEMORY_HIERARCHY.value:      self._memory_hierarchy,
            ProblemType.VOLATILE_NON_VOLATILE.value: self._volatile_non_volatile,
            ProblemType.CACHE_FASTER_RAM.value:      self._cache_faster_ram,
            ProblemType.MEMORY_TYPE_CLASSIFY.value:  self._memory_type_classify,
        }

    # ─────────────────────────────────────────────────────────────────────────
    # CPU components
    # ─────────────────────────────────────────────────────────────────────────
    def _cpu_components(self, p: Problem) -> Tuple[str, bool]:
        correct = set(CPU_COMPONENTS)
        ans = p.correct_answer
        if isinstance(ans, (list, tuple, set)):
            student_set = set(ans)
        else:
            student_set = {str(ans)}
        correct_flag = student_set == correct
        steps = (
            "Step 1 – Recall the three main CPU components from the syllabus.\n"
            "Step 2 – They are: ALU, CU, and Registers.\n"
            "Step 3 – The question asks for the three primary components (not sub-parts).\n"
            "Step 4 – Compare student answer against the correct set.\n"
        )
        if correct_flag:
            steps += "Result: All three components identified correctly. ✓\n"
        else:
            steps += (
                f"Result: Answer incorrect. ✓ {correct} | ✗ {student_set}\n"
            )
        return steps, correct_flag

    # ─────────────────────────────────────────────────────────────────────────
    # CPU bus
    # ─────────────────────────────────────────────────────────────────────────
    def _cpu_bus(self, p: Problem) -> Tuple[str, bool]:
        bus_map = {"data": "data bus", "address": "address bus", "control": "control bus"}
        correct_bus = bus_map.get(str(p.params.get("bus_type", "")).lower(), "address bus")
        student = str(p.correct_answer).strip().lower()
        correct_flag = correct_bus.lower() in student or student in correct_bus.lower()
        steps = (
            "Step 1 – Recall the three system bus types and their roles:\n"
            "   • Data bus    → carries actual data between components\n"
            "   • Address bus → carries memory addresses (locations) from CPU to memory\n"
            "   • Control bus → carries control and timing signals\n"
            "Step 2 – The question specifically asks which bus carries memory ADDRESSES.\n"
            "Step 3 – That is the Address bus.\n"
            "Step 4 – Compare with student answer.\n"
        )
        if correct_flag:
            steps += "Result: Correctly identified the Address bus. ✓\n"
        else:
            steps += f"Result: Incorrect. ✓ Address bus | ✗ {p.correct_answer}\n"
        return steps, correct_flag

    # ─────────────────────────────────────────────────────────────────────────
    # ALU functions
    # ─────────────────────────────────────────────────────────────────────────
    def _alu_functions(self, p: Problem) -> Tuple[str, bool]:
        arithmetic = ["Addition", "Subtraction", "Multiplication", "Division"]
        logic = ["AND", "OR", "NOT", "Comparison"]
        student = str(p.correct_answer).strip()
        correct_flag = student in (arithmetic + logic)
        steps = (
            "Step 1 – Recall the two categories of operations performed by the ALU:\n"
            "   A. Arithmetic Operations: Addition, Subtraction, Multiplication, Division\n"
            "   B. Logical (Boolean) Operations: AND, OR, NOT, Comparison\n"
            "Step 2 – The ALU does NOT perform data storage or instruction fetching.\n"
            "Step 3 – The Control Unit (CU) performs instruction fetching and decoding.\n"
            "Step 4 – Check whether the student's answer is one of the 8 valid ALU operations.\n"
        )
        if correct_flag:
            steps += f"Result: '{student}' is a valid ALU operation. ✓\n"
        else:
            steps += f"Result: '{student}' is NOT an ALU operation. ✗\n"
        return steps, correct_flag

    # ─────────────────────────────────────────────────────────────────────────
    # Fetch-Decode-Execute cycle
    # ─────────────────────────────────────────────────────────────────────────
    def _fde_cycle(self, p: Problem) -> Tuple[str, bool]:
        steps_list = p.params.get("steps", FDE_COMPLETE) if p.params else FDE_COMPLETE
        student = [s.strip() for s in str(p.correct_answer).split(",")]
        correct_flag = student == list(steps_list)
        steps = (
            "Step 1 – The Fetch-Decode-Execute (FDE) cycle has three ordered stages:\n"
            "   Stage 1: Fetch – CPU reads the instruction at the memory address in the PC\n"
            "   Stage 2: Decode – CU interprets the instruction to determine the operation\n"
            "   Stage 3: Execute – ALU performs the operation; result stored in register/memory\n"
            "Step 2 – The PC is then incremented to point to the next instruction.\n"
            "Step 3 – Check the student's sequence matches the correct order.\n"
        )
        if correct_flag:
            steps += "Result: FDE stages in correct order. ✓\n"
        else:
            steps += (
                f"Result: Incorrect order.\n"
                f"   ✓ Expected: {steps_list}\n"
                f"   ✗ Got:      {student}\n"
            )
        return steps, correct_flag

    # ─────────────────────────────────────────────────────────────────────────
    # CU function
    # ─────────────────────────────────────────────────────────────────────────
    def _cu_function(self, p: Problem) -> Tuple[str, bool]:
        keywords = ["direct", "coordinate", "control signal", "fetch", "decode", "manage", "orchestrat"]
        student_lower = str(p.correct_answer).lower()
        correct_flag = any(kw in student_lower for kw in keywords)
        steps = (
            "Step 1 – The Control Unit (CU) is the 'manager' of the CPU.\n"
            "Step 2 – Its key functions:\n"
            "   • Directs and coordinates all CPU operations\n"
            "   • Issues control signals to ALU, registers and other components\n"
            "   • Fetches instructions from memory (using the PC)\n"
            "   • Decodes instructions into executable commands\n"
            "Step 3 – The CU does NOT perform arithmetic or logical calculations (that is the ALU).\n"
            "Step 4 – Check whether student answer describes a coordinating/control function.\n"
        )
        if correct_flag:
            steps += "Result: Correctly describes the CU's function. ✓\n"
        else:
            steps += f"Result: Does not adequately describe CU function. ✗\n"
        return steps, correct_flag

    # ─────────────────────────────────────────────────────────────────────────
    # Register identify
    # ─────────────────────────────────────────────────────────────────────────
    def _register_identify(self, p: Problem) -> Tuple[str, bool]:
        correct_map = {
            "program_counter": "Program Counter",
            "pc": "Program Counter",
            "instruction_register": "Instruction Register",
            "ir": "Instruction Register",
            "accumulator": "Accumulator",
            "acc": "Accumulator",
            "memory_address_register": "Memory Address Register",
            "mar": "Memory Address Register",
        }
        student = str(p.correct_answer).strip()
        correct_flag = student.lower() in correct_map or any(
            student.lower() in v.lower() for v in correct_map.values()
        )
        reg_key = p.params.get("reg_key", "") if p.params else ""
        expected = correct_map.get(reg_key, reg_key.replace("_", " ").title())
        steps = (
            f"Step 1 – Identify the register described: '{p.question}'\n"
            "Step 2 – Match the description to the four named registers:\n"
            "   • Program Counter (PC)     – holds address of the NEXT instruction\n"
            "   • Instruction Register (IR) – holds the CURRENT instruction being executed\n"
            "   • Accumulator (ACC)        – stores intermediate arithmetic/logic results\n"
            "   • Memory Address Register  – holds the memory address for read/write\n"
            "Step 3 – Compare student answer with the correct register name.\n"
        )
        if correct_flag:
            steps += f"Result: Correctly identified the register. ✓\n"
        else:
            steps += f"Result: Incorrect. ✓ {expected} | ✗ {student}\n"
        return steps, correct_flag

    # ─────────────────────────────────────────────────────────────────────────
    # Memory hierarchy (order five types)
    # ─────────────────────────────────────────────────────────────────────────
    def _memory_hierarchy(self, p: Problem) -> Tuple[str, bool]:
        correct_order = MEMORY_TYPES_ORDERED
        student_order = [s.strip().lower().replace(" ", "_") for s in str(p.correct_answer).split(",")]
        correct_flag = student_order == correct_order
        steps = (
            "Step 1 – Arrange the five memory levels from FASTEST to SLOWEST:\n"
            "   1. Registers     – inside CPU, nano-second access, few bytes\n"
            "   2. Cache Memory  – L1/L2/L3, very fast, KB–MB range\n"
            "   3. RAM           – main memory, micro-second access, GB range\n"
            "   4. ROM           – non-volatile, stores firmware/BIOS\n"
            "   5. Secondary Storage – HDD/SSD, slowest, TB range\n"
            "Step 2 – As speed increases → capacity decreases and cost per byte increases.\n"
            "Step 3 – Compare student's ordering with the correct order.\n"
        )
        if correct_flag:
            steps += "Result: Correct ordering. ✓\n"
        else:
            steps += (
                f"Result: Incorrect ordering.\n"
                f"   ✓ Expected: {correct_order}\n"
                f"   ✗ Got:      {student_order}\n"
            )
        return steps, correct_flag

    # ─────────────────────────────────────────────────────────────────────────
    # Volatile / non-volatile classification
    # ─────────────────────────────────────────────────────────────────────────
    def _volatile_non_volatile(self, p: Problem) -> Tuple[str, bool]:
        memory_type = str(p.params.get("memory_type", "")).lower().replace(" ", "_")
        correct_category = (
            "Volatile (loses data when power is off)"
            if memory_type in VOLATILE
            else "Non-Volatile (retains data without power)"
        )
        student = str(p.correct_answer).strip().lower()
        correct_flag = (
            ("volatile" in student and memory_type in VOLATILE)
            or ("non-volatile" in student and memory_type in NON_VOLATILE)
        )
        steps = (
            "Step 1 – Recall the definition of volatile vs non-volatile memory:\n"
            "   • Volatile      – loses stored data when power is turned off\n"
            "   • Non-Volatile  – retains stored data even without power\n"
            "Step 2 – Identify which category the given memory type belongs to:\n"
            "   • Registers, Cache, RAM  → Volatile\n"
            "   • ROM, Secondary Storage → Non-Volatile\n"
            "Step 3 – Compare student answer with the correct category.\n"
        )
        friendly = MEMORY_TYPES_FRIENDLY.get(memory_type, memory_type)
        if correct_flag:
            steps += f"Result: {friendly} correctly classified. ✓\n"
        else:
            steps += f"Result: Incorrect classification for {friendly}. ✗\n"
        return steps, correct_flag

    # ─────────────────────────────────────────────────────────────────────────
    # Why cache is faster than RAM
    # ─────────────────────────────────────────────────────────────────────────
    def _cache_faster_ram(self, p: Problem) -> Tuple[str, bool]:
        student = str(p.correct_answer).lower()
        key_points = ["proxim", "closer", "near", "distance", "sram", "faster technology",
                       "smaller", "level", "l1", "l2"]
        score = sum(1 for kp in key_points if kp in student)
        correct_flag = score >= 2  # need at least 2 key points
        steps = (
            "Step 1 – Recall: Cache memory sits between the CPU and RAM.\n"
            "Step 2 – Reasons why Cache is faster than RAM:\n"
            "   a) Proximity: Cache is physically closer to the CPU core → shorter signal path\n"
            "   b) Technology: Cache uses SRAM (faster, 6 transistors per cell); RAM uses DRAM (slower, 1 transistor + capacitor)\n"
            "   c) Size: Cache is much smaller (KB–MB) → easier to keep entire cache active\n"
            "   d) Organisation: L1 is on the CPU die itself; L2/L3 are on the same chip package\n"
            "Step 3 – A complete answer must mention at least proximity and technology.\n"
            "Step 4 – Evaluate student answer against key points.\n"
        )
        if correct_flag:
            steps += f"Result: Answer covers sufficient key points ({score} found). ✓\n"
        else:
            steps += f"Result: Answer missing key points ({score} found, need ≥ 2). ✗\n"
        return steps, correct_flag

    # ─────────────────────────────────────────────────────────────────────────
    # Memory type classification
    # ─────────────────────────────────────────────────────────────────────────
    def _memory_type_classify(self, p: Problem) -> Tuple[str, bool]:
        memory_type = str(p.params.get("memory_type", "")).lower().replace(" ", "_")
        student = str(p.correct_answer).strip().lower()
        correct_flag = student == memory_type or memory_type in student
        friendly = MEMORY_TYPES_FRIENDLY.get(memory_type, memory_type)
        steps = (
            "Step 1 – Review the five memory types and their characteristics:\n"
            "   • Registers     – inside CPU; fastest; volatile\n"
            "   • Cache         – L1/L2/L3 on/near CPU; volatile\n"
            "   • RAM           – main memory; volatile; loses data on power-off\n"
            "   • ROM           – stores BIOS/UEFI firmware; non-volatile\n"
            "   • Secondary Storage – HDD/SSD/optical/USB; non-volatile; highest capacity\n"
            "Step 2 – Match the description to the correct memory type.\n"
            "Step 3 – Compare student answer with correct type.\n"
        )
        if correct_flag:
            steps += f"Result: Correctly identified '{friendly}'. ✓\n"
        else:
            steps += f"Result: Incorrect. ✓ {friendly} | ✗ {p.correct_answer}\n"
        return steps, correct_flag

    # ─────────────────────────────────────────────────────────────────────────
    # Public API
    # ─────────────────────────────────────────────────────────────────────────
    def solve(self, problem: Problem) -> Dict[str, Any]:
        handler = self._registry.get(problem.problem_type)
        if handler is None:
            return {"error": f"No solver registered for '{problem.problem_type}'",
                    "steps": "", "correct": False}
        steps, correct = handler(problem)
        return {
            "problem_type": problem.problem_type,
            "difficulty":    problem.difficulty,
            "answer_format": problem.answer_format,
            "question":      problem.question,
            "options":       problem.options,
            "student_answer":problem.correct_answer,
            "steps":         steps,
            "is_correct":    correct,
            "correct_answer": self._format_correct(problem),
        }

    def _format_correct(self, p: Problem) -> Any:
        if p.problem_type == ProblemType.CPU_COMPONENTS.value:
            return sorted(CPU_COMPONENTS)
        if p.problem_type == ProblemType.CPU_BUS.value:
            return "Address Bus"
        if p.problem_type == ProblemType.ALU_FUNCTIONS.value:
            return "Addition, Subtraction, Multiplication, Division, AND, OR, NOT, Comparison"
        if p.problem_type == ProblemType.FDE_CYCLE.value:
            return ["Fetch", "Decode", "Execute"]
        if p.problem_type == ProblemType.CU_FUNCTION.value:
            return "Directs and coordinates all CPU operations; issues control signals; fetches and decodes instructions"
        reg = (p.params or {}).get("reg_key", "")
        reg_map = {"program_counter": "Program Counter", "pc": "Program Counter",
                   "instruction_register": "Instruction Register",
                   "accumulator": "Accumulator",
                   "memory_address_register": "Memory Address Register"}
        if p.problem_type == ProblemType.REGISTER_IDENTIFY.value:
            return reg_map.get(reg, reg.replace("_", " ").title())
        if p.problem_type == ProblemType.MEMORY_HIERARCHY.value:
            return MEMORY_TYPES_ORDERED
        if p.problem_type == ProblemType.VOLATILE_NON_VOLATILE.value:
            mt = (p.params or {}).get("memory_type", "")
            return ("Volatile (loses data when power is off)" if mt in VOLATILE
                    else "Non-Volatile (retains data without power)")
        if p.problem_type == ProblemType.CACHE_FASTER_RAM.value:
            return ("Cache is faster because it is physically closer to the CPU (shorter "
                    "signal path) and uses SRAM technology which is inherently faster than "
                    "the DRAM technology used in RAM.")
        if p.problem_type == ProblemType.MEMORY_TYPE_CLASSIFY.value:
            return (p.params or {}).get("memory_type", "")
        return None


# ─────────────────────────────────────────────────────────────────────────────
# Convenience functions
# ─────────────────────────────────────────────────────────────────────────────
_registry = SolverRegistry()

def solve(problem: Problem) -> Dict[str, Any]:
    return _registry.solve(problem)

def verify(problem: Problem) -> bool:
    return _registry.solve(problem)["is_correct"]

def batch_solve(problems: List[Problem]) -> List[Dict[str, Any]]:
    return [_registry.solve(p) for p in problems]

def print_solution(problem: Problem) -> None:
    result = solve(problem)
    print(f"{'='*65}")
    print(f"Q [{result['difficulty'].upper()}] {result['problem_type']}")
    print(f"{'='*65}")
    print(f"\n{problem.render_question()}")
    print(f"\n{'─'*65}")
    print("SOLUTION:")
    print(result["steps"])
    print(f"Correct Answer : {result['correct_answer']}")
    print(f"Student Answer : {result['student_answer']}")
    print(f"Status         : {'✓ CORRECT' if result['is_correct'] else '✗ INCORRECT'}")
    print(f"{'='*65}\n")


# ─────────────────────────────────────────────────────────────────────────────
# Standalone demo
# ─────────────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uuid
    demo_problems = [
        Problem(
            problem_type=ProblemType.CPU_COMPONENTS.value,
            difficulty="standard",
            question=(
                "Name the three main components of the Central Processing Unit (CPU) "
                "and state one key function of each."
            ),
            answer_format=AnswerFormat.FIB.value,
            correct_answer="ALU, CU, Registers",
            params={"seed": 42},
        ),
        Problem(
            problem_type=ProblemType.CPU_BUS.value,
            difficulty="competency",
            question=(
                "The system bus connects the CPU to memory and I/O devices. "
                "Which specific bus is responsible for carrying memory addresses "
                "from the CPU to main memory?"
            ),
            answer_format=AnswerFormat.MC.value,
            options=["Data Bus", "Address Bus", "Control Bus", "Power Bus"],
            correct_answer=1,  # index of "Address Bus"
            params={"bus_type": "address", "seed": 7},
        ),
        Problem(
            problem_type=ProblemType.ALU_FUNCTIONS.value,
            difficulty="standard",
            question=(
                "The Arithmetic and Logic Unit (ALU) is a key component of the CPU. "
                "List any FOUR operations performed by the ALU."
            ),
            answer_format=AnswerFormat.FIB.value,
            correct_answer="Addition, Subtraction, AND, OR",
            params={"seed": 15},
        ),
        Problem(
            problem_type=ProblemType.FDE_CYCLE.value,
            difficulty="competency",
            question=(
                "Arrange the following stages of the Fetch-Decode-Execute cycle "
                "in their correct sequential order:\n"
                "   (A) Execute  (B) Fetch  (C) Decode"
            ),
            answer_format=AnswerFormat.ORDER.value,
            correct_answer="Fetch, Decode, Execute",
            params={"steps": ["Fetch", "Decode", "Execute"], "seed": 23},
        ),
        Problem(
            problem_type=ProblemType.MEMORY_HIERARCHY.value,
            difficulty="standard",
            question=(
                "Arrange the following five levels of the computer memory hierarchy "
                "in order from FASTEST to SLOWEST:\n"
                "   (A) Secondary Storage  (B) Cache  (C) ROM  (D) RAM  (E) Registers"
            ),
            answer_format=AnswerFormat.ORDER.value,
            correct_answer="Registers, Cache, RAM, ROM, Secondary Storage",
            params={"seed": 31},
        ),
        Problem(
            problem_type=ProblemType.VOLATILE_NON_VOLATILE.value,
            difficulty="competency",
            question=(
                "Is RAM (Random Access Memory) volatile or non-volatile? "
                "Explain what this means."
            ),
            answer_format=AnswerFormat.FIB.value,
            correct_answer="Volatile (loses data when power is off)",
            params={"memory_type": "RAM", "seed": 42},
        ),
        Problem(
            problem_type=ProblemType.CACHE_FASTER_RAM.value,
            difficulty="hard",
            question=(
                "Cache memory operates at a higher speed than main RAM. "
                "Give TWO reasons why cache memory is faster than RAM."
            ),
            answer_format=AnswerFormat.FIB.value,
            correct_answer=(
                "Cache is closer to the CPU (shorter signal path) and uses faster "
                "SRAM technology compared to the DRAM used in RAM."
            ),
            params={"seed": 55},
        ),
    ]
    for prob in demo_problems:
        print_solution(prob)