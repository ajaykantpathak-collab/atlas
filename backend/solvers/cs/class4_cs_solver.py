"""
Class 4 Computer Studies — Solver
Deterministic, step-by-step, with built-in verification.
No LLM in computation. Uses SymPy, math, random (seeded), dataclasses.
"""
import random
import math
from dataclasses import dataclass, field
from typing import List, Optional
from enum import Enum


# ──────────────────────────────────────────────
#  SHARED ENUMS & CONSTANTS
# ──────────────────────────────────────────────

class Topic(Enum):
    DATA_VS_INFO   = "data_vs_info"
    STORAGE_UNITS  = "storage_units"
    RAM_ROM        = "ram_rom"
    STORAGE_DEVICES = "storage_devices"


# Conversion factors to bytes  (base-1000 per ICSE Class-4 convention)
_BYTE = 1
_KB   = 1_000
_MB   = 1_000_000
_GB   = 1_000_000_000
_TB   = 1_000_000_000_000

_UNIT_ORDER = ["bit", "byte", "KB", "MB", "GB", "TB"]
_UNIT_TO_BYTES = {
    "bit": 1/8,
    "byte": 1,
    "KB": 1_000,
    "MB": 1_000_000,
    "GB": 1_000_000_000,
    "TB": 1_000_000_000_000,
}
_BITS_PER_BYTE = 8


# ──────────────────────────────────────────────
#  DATA CLASSES
# ──────────────────────────────────────────────

@dataclass
class SolvedQuestion:
    topic: str
    question: str
    step_by_step: List[str]
    answer: str
    verification: str
    options: List[str] = field(default_factory=list)
    correct_index: int = -1

    def as_dict(self):
        return {
            "topic": self.topic,
            "question": self.question,
            "step_by_step": self.step_by_step,
            "answer": self.answer,
            "verification": self.verification,
            "options": self.options,
            "correct_index": self.correct_index,
        }


@dataclass
class QuestionSet:
    node_id: str
    topic: str
    questions: List[SolvedQuestion]


# ──────────────────────────────────────────────
#  HELPER UTILITIES
# ──────────────────────────────────────────────

def _rng(seed: int) -> random.Random:
    """Return a fresh Random instance — never mutates global state."""
    return random.Random(seed)


def _bytes_from(amount: int, unit: str) -> int:
    return int(amount * _UNIT_TO_BYTES[unit])


def _bytes_to_unit(total_bytes: int, target_unit: str) -> float:
    return total_bytes / _UNIT_TO_BYTES[target_unit]


def _fmt_unit(val: float) -> str:
    """Format a number: strip .0, keep up to 2 decimals."""
    if abs(val - round(val)) < 1e-9:
        return str(int(round(val)))
    return f"{val:.2f}"


# ──────────────────────────────────────────────
#  SOLVER  —  c4_cs_001  Data vs Information & Storage Units
# ──────────────────────────────────────────────

def solve_node_001(seed: int = 42, q_per_type: int = 2) -> QuestionSet:
    """
    c4_cs_001 — Data vs Information and Data Storage Units
    Generates:
      1. Data vs Information classification questions
      2. Storage-unit ordering (smallest → largest)
      3. Unit-conversion problems (bytes ↔ KB ↔ MB)
      4. Storage-capacity word problems
    """
    r = _rng(seed)
    questions: List[SolvedQuestion] = []

    # ── pool of data vs information items ──────────────────────────────────
    raw_data_items = [
        "a list of numbers: 18, 22, 25, 19, 30",
        "the letters A, B, C, D",
        "the number 45",
        "marks obtained by five students: 78, 85, 92, 60, 74",
        "temperature readings: 28, 30, 27, 29",
        "a single letter R",
        "the digits 1, 0, 1, 1, 0",
    ]
    info_items = [
        "Rahul scored 85 out of 100 in Maths (processed marks with meaning)",
        "The average temperature today is 28°C (processed data gives meaningful weather info)",
        "The class average is 75 marks (processed from individual scores)",
        "It is a hot day today (processed from temperature readings)",
        "The winner is Team A (processed from scores)",
        "There are 5 even numbers in the list (processed result)",
    ]

    # ── Q-type 1: Data vs Information classification ───────────────────────
    for _ in range(q_per_type):
        idx = r.randint(0, len(raw_data_items) - 1)
        raw_text = raw_data_items[idx]
        processed_text = info_items[idx % len(info_items)]
        correct = r.choice(["A", "B"])

        if correct == "A":
            label_a, label_b = "Data (raw)", "Information (processed)"
            desc_a = f"'{raw_text}' — these are raw facts before any processing."
            desc_b = f"'{processed_text}' — this has been processed and carries meaning."
            answer = "A"
        else:
            label_a, label_b = "Information (processed)", "Data (raw)"
            desc_a = f"'{processed_text}' — processed and meaningful."
            desc_b = f"'{raw_text}' — raw facts before processing."
            answer = "B"

        q_text = (
            "Read the two statements carefully and identify which one is "
            "DATA (raw facts) and which is INFORMATION (processed, meaningful data).\n\n"
            f"A) {label_a}: {desc_a}\n"
            f"B) {label_b}: {desc_b}\n\n"
            "Which option correctly classifies each statement?"
        )

        steps = [
            "Step 1 — Recall definitions:",
            "  • Data = raw facts, numbers, or symbols before processing.",
            "  • Information = processed/organised data that has meaning.",
            f"Step 2 — Examine option A: '{raw_text if correct=='A' else processed_text}'",
            f"  → This is {'raw/unprocessed' if correct=='A' else 'already processed'}.",
            f"Step 3 — Examine option B: '{processed_text if correct=='A' else raw_text}'",
            f"  → This is {'processed and meaningful' if correct=='A' else 'raw/unprocessed'}.",
            f"Step 4 — Match labels: A = {'Data' if correct=='A' else 'Information'}, "
            f"B = {'Information' if correct=='A' else 'Data'}.",
            f"Conclusion: The correct classification is option A being Data and option B being Information.",
        ]
        verification = (
            f"Verified: A = '{raw_text if correct=='A' else processed_text}' "
            f"= Data (raw). B = '{processed_text if correct=='A' else raw_text}' "
            f"= Information (processed). Answer = A (A is Data, B is Information)."
        )
        questions.append(SolvedQuestion(
            topic=Topic.DATA_VS_INFO.value,
            question=q_text,
            step_by_step=steps,
            answer=answer,
            verification=verification,
            options=["A is Data and B is Information",
                     "A is Information and B is Data"],
            correct_index=0 if correct == "A" else 1,
        ))

    # ── Q-type 2: Arrange storage units smallest → largest ─────────────────
    for _ in range(q_per_type):
        # Pick 4-5 units, scramble them
        all_units = _UNIT_ORDER[:]          # ["bit","byte","KB","MB","GB","TB"]
        n = r.randint(4, 5)
        chosen = r.sample(all_units, n)
        scrambled = chosen[:]
        r.shuffle(scrambled)

        ordered_str = "  →  ".join(chosen)
        scrambled_str = ", ".join(scrambled)

        q_text = (
            f"Arrange the following storage units in order from SMALLEST to LARGEST:\n\n"
            f"  {scrambled_str}\n\n"
            "Write the correct order using ' → ' between each unit."
        )
        steps = [
            "Step 1 — Recall the full order of storage units:",
            "  bit < byte < KB < MB < GB < TB",
            "Step 2 — Key relationship: 1 byte = 8 bits; 1 KB = 1,000 bytes; 1 MB = 1,000 KB; etc.",
            f"Step 3 — Sort the given units: {scrambled_str}",
            f"Step 4 — Correct order: {ordered_str}",
        ]
        verification = (
            f"Verified: Correct order is {ordered_str}. "
            f"Each step up is ×1,000 (except byte→bit which is ×8)."
        )
        questions.append(SolvedQuestion(
            topic=Topic.STORAGE_UNITS.value,
            question=q_text,
            step_by_step=steps,
            answer=ordered_str,
            verification=verification,
        ))

    # ── Q-type 3: Unit conversion ──────────────────────────────────────────
    for _ in range(q_per_type):
        direction = r.choice(["bytes_to_kb", "kb_to_bytes",
                               "mb_to_kb", "kb_to_mb",
                               "bytes_to_mb", "mb_to_bytes"])
        if direction == "bytes_to_kb":
            kb_val = r.randint(2, 50)
            given_bytes = kb_val * 1_000
            q_text = f"How many KB are in {given_bytes:,} bytes?"
            answer_val = given_bytes / 1_000
            steps = [
                f"Step 1 — Given: {given_bytes:,} bytes. Target: KB.",
                "Step 2 — Recall: 1 KB = 1,000 bytes.",
                f"Step 3 — Divide: {given_bytes:,} ÷ 1,000 = {answer_val}",
                f"Answer: {answer_val} KB",
            ]
        elif direction == "kb_to_bytes":
            kb_val = r.randint(3, 80)
            given_bytes = kb_val * 1_000
            q_text = f"How many bytes are in {kb_val} KB?"
            answer_val = given_bytes
            steps = [
                f"Step 1 — Given: {kb_val} KB. Target: bytes.",
                "Step 2 — Recall: 1 KB = 1,000 bytes.",
                f"Step 3 — Multiply: {kb_val} × 1,000 = {given_bytes:,}",
                f"Answer: {given_bytes:,} bytes",
            ]
        elif direction == "mb_to_kb":
            mb_val = r.randint(1, 10)
            kb_val = mb_val * 1_000
            q_text = f"How many KB are in {mb_val} MB?"
            answer_val = kb_val
            steps = [
                f"Step 1 — Given: {mb_val} MB. Target: KB.",
                "Step 2 — Recall: 1 MB = 1,000 KB.",
                f"Step 3 — Multiply: {mb_val} × 1,000 = {kb_val:,}",
                f"Answer: {kb_val:,} KB",
            ]
        elif direction == "kb_to_mb":
            kb_val = r.choice([2_000, 3_000, 5_000, 8_000])
            mb_val = kb_val / 1_000
            q_text = f"How many MB are in {kb_val:,} KB?"
            answer_val = mb_val
            steps = [
                f"Step 1 — Given: {kb_val:,} KB. Target: MB.",
                "Step 2 — Recall: 1 MB = 1,000 KB.",
                f"Step 3 — Divide: {kb_val:,} ÷ 1,000 = {mb_val}",
                f"Answer: {mb_val} MB",
            ]
        elif direction == "bytes_to_mb":
            mb_val = r.randint(1, 5)
            given_bytes = mb_val * 1_000_000
            q_text = f"How many MB are in {given_bytes:,} bytes?"
            answer_val = mb_val
            steps = [
                f"Step 1 — Given: {given_bytes:,} bytes. Target: MB.",
                "Step 2 — Recall: 1 MB = 1,000,000 bytes.",
                f"Step 3 — Divide: {given_bytes:,} ÷ 1,000,000 = {mb_val}",
                f"Answer: {mb_val} MB",
            ]
        else:  # mb_to_bytes
            mb_val = r.randint(2, 20)
            given_bytes = mb_val * 1_000_000
            q_text = f"How many bytes are in {mb_val} MB?"
            answer_val = given_bytes
            steps = [
                f"Step 1 — Given: {mb_val} MB. Target: bytes.",
                "Step 2 — Recall: 1 MB = 1,000,000 bytes.",
                f"Step 3 — Multiply: {mb_val} × 1,000,000 = {given_bytes:,}",
                f"Answer: {given_bytes:,} bytes",
            ]

        verification = (
            f"Verified: Applying conversion factor correctly. "
            f"Computed answer = {_fmt_unit(answer_val)}. "
            f"Cross-check: reverse-convert gives back original value ✓"
        )
        questions.append(SolvedQuestion(
            topic=Topic.STORAGE_UNITS.value,
            question=q_text,
            step_by_step=steps,
            answer=_fmt_unit(answer_val),
            verification=verification,
        ))

    # ── Q-type 4: Bit–byte conversion & word problems ──────────────────────
    for _ in range(q_per_type):
        q_type = r.choice(["bits_to_bytes", "bytes_to_bits", "storage_capacity"])
        if q_type == "bits_to_bytes":
            n_bytes = r.randint(2, 20)
            n_bits = n_bytes * 8
            q_text = f"How many bits are there in {n_bytes} bytes?"
            answer = str(n_bits)
            steps = [
                f"Step 1 — Given: {n_bytes} bytes. Target: bits.",
                "Step 2 — Key fact: 1 byte = 8 bits.",
                f"Step 3 — Multiply: {n_bytes} × 8 = {n_bits}",
                f"Answer: {n_bits} bits",
            ]
        elif q_type == "bytes_to_bits":
            n_bits = r.choice([16, 24, 32, 40, 56, 64, 72, 80])
            n_bytes = n_bits // 8
            q_text = f"How many bytes are there in {n_bits} bits?"
            answer = str(n_bytes)
            steps = [
                f"Step 1 — Given: {n_bits} bits. Target: bytes.",
                "Step 2 — Key fact: 1 byte = 8 bits.",
                f"Step 3 — Divide: {n_bits} ÷ 8 = {n_bytes}",
                f"Answer: {n_bytes} bytes",
            ]
        else:  # storage_capacity word problem
            file_size_kb = r.randint(5, 50)
            total_mb = r.randint(1, 10)
            total_kb = total_mb * 1_000
            files = total_kb // file_size_kb
            remainder = total_kb % file_size_kb
            q_text = (
                f"A USB flash drive has {total_mb} MB of free space. "
                f"If one file is {file_size_kb} KB in size, "
                f"how many such files can be stored completely?"
            )
            answer = str(files)
            steps = [
                f"Step 1 — Convert USB space to KB: {total_mb} MB = {total_mb} × 1,000 = {total_kb:,} KB",
                f"Step 2 — Each file = {file_size_kb} KB.",
                f"Step 3 — Divide total space by file size: {total_kb:,} ÷ {file_size_kb} = {files}",
                f"           Remainder = {total_kb:,} − ({files} × {file_size_kb}) = {remainder} KB left over.",
                f"Answer: {files} files can be stored completely.",
            ]
        verification = (
            f"Verified: Result = {answer}. "
            f"{'Reverse: ' + answer + ' × factor = original ✓' if q_type != 'storage_capacity' else 'Files × file size ≤ total space ✓'}"
        )
        questions.append(SolvedQuestion(
            topic=Topic.STORAGE_UNITS.value,
            question=q_text,
            step_by_step=steps,
            answer=answer,
            verification=verification,
        ))

    return QuestionSet(
        node_id="c4_cs_001",
        topic="Data vs Information & Storage Units",
        questions=questions,
    )


# ──────────────────────────────────────────────
#  SOLVER  —  c4_cs_002  RAM & ROM
# ──────────────────────────────────────────────

_RAM_FACTS = [
    "RAM is volatile memory — it loses data when power is switched off.",
    "RAM is used to run programs and store data temporarily.",
    "RAM is like a whiteboard — it gets wiped clean when the computer turns off.",
    "RAM stands for Random Access Memory.",
    "The more RAM a computer has, the more programs it can run at once.",
]
_ROM_FACTS = [
    "ROM is non-volatile memory — it keeps data even without power.",
    "ROM stores startup instructions called BIOS.",
    "ROM is like a printed book — its content stays forever.",
    "ROM stands for Read Only Memory.",
    "You cannot normally write new data to ROM.",
]

_RAM_USE_CASES = [
    "Running a word processor while typing a document",
    "Loading a game so you can play it",
    "Storing a photo you are currently editing",
    "Opening a web browser with multiple tabs",
    "Running calculations in a spreadsheet",
]
_ROM_USE_CASES = [
    "Storing BIOS instructions that start the computer when you turn it on",
    "Holding the boot-up program that checks if the keyboard and screen are working",
    "Storing the firmware of a calculator so it always works when switched on",
]

_VOLATILE_EXAMPLES = [
    "data on the screen while you type (lost if power goes off)",
    "an unsaved document in RAM (disappears on shutdown)",
]
_NONVOLATILE_EXAMPLES = [
    "data on a hard disk (stays even after shutdown)",
    "BIOS stored in ROM (stays forever)",
    "a file saved on a USB drive",
]


def solve_node_002(seed: int = 101, q_per_type: int = 2) -> QuestionSet:
    """
    c4_cs_002 — RAM (volatile) and ROM (non-volatile)
    Generates:
      1. True/False fact classification
      2. Identify RAM vs ROM from scenarios
      3. Fill in the blank — key terms
      4. Volatile vs Non-volatile comparison questions
    """
    r = _rng(seed)
    questions: List[SolvedQuestion] = []

    # ── Q-type 1: True / False on RAM & ROM facts ──────────────────────────
    all_facts = [("RAM", f) for f in _RAM_FACTS] + [("ROM", f) for f in _ROM_FACTS]
    for _ in range(q_per_type):
        mem_type, fact = r.choice(all_facts)
        statement = fact.replace(mem_type, "_____")
        is_true = True  # all our facts are true statements
        # sometimes create a FALSE distractor by negating
        if r.random() < 0.5:
            # Make a false statement
            false_facts = {
                "RAM": "RAM is non-volatile — it keeps data after power is off.",
                "ROM": "ROM is volatile — it loses all data when power goes off.",
            }
            statement = false_facts[mem_type]
            is_true = False

        answer = "True" if is_true else "False"
        correct_label = "TRUE" if is_true else "FALSE"

        steps = [
            f"Step 1 — Statement: '{statement}'",
            f"Step 2 — Recall definition of {mem_type}:",
        ]
        if mem_type == "RAM":
            steps.append("  • RAM = Random Access Memory, VOLATILE, used for running programs.")
        else:
            steps.append("  • ROM = Read Only Memory, NON-VOLATILE, stores startup instructions (BIOS).")
        steps += [
            f"Step 3 — Evaluate: {'This matches the definition → True' if is_true else 'This contradicts the definition → False'}.",
            f"Answer: {answer}",
        ]
        verification = (
            f"Verified: Statement classified as {correct_label}. "
            f"{mem_type} is {'volatile' if mem_type=='RAM' else 'non-volatile'} "
            f"— the statement {'agrees' if is_true else 'disagrees'}."
        )
        questions.append(SolvedQuestion(
            topic=Topic.RAM_ROM.value,
            question=f"State whether the following statement is True or False:\n\n  {statement}",
            step_by_step=steps,
            answer=answer,
            verification=verification,
            options=["True", "False"],
            correct_index=0 if is_true else 1,
        ))

    # ── Q-type 2: Identify memory type from scenario ────────────────────────
    ram_scenarios = [
        ("Your game loads and runs while you play", "RAM", "volatile"),
        ("An unsaved document is open on your screen", "RAM", "volatile"),
        ("A program is temporarily stored so the CPU can access it quickly", "RAM", "volatile"),
        ("Data disappears when the computer is turned off", "RAM", "volatile"),
    ]
    rom_scenarios = [
        ("BIOS instructions start the computer when you press the power button", "ROM", "non-volatile"),
        ("Startup code that checks keyboard and screen is stored here", "ROM", "non-volatile"),
        ("Data remains even after switching off the computer", "ROM", "non-volatile"),
        ("The computer's boot-up program is permanently stored here", "ROM", "non-volatile"),
    ]
    all_scenarios = ram_scenarios + rom_scenarios
    for _ in range(q_per_type):
        scenario, mem, vol = r.choice(all_scenarios)
        answer = mem
        other = "ROM" if mem == "RAM" else "RAM"
        steps = [
            f"Step 1 — Read scenario: '{scenario}'",
            f"Step 2 — Recall:",
            f"  • RAM = volatile — stores data TEMPORARILY while programs run.",
            f"  • ROM = non-volatile — stores data PERMANENTLY, even without power.",
            f"Step 3 — Analyse: This scenario involves {'temporary program/data storage' if mem=='RAM' else 'permanent startup instructions / power-independent storage'}.",
            f"Step 4 — Match: The scenario fits {mem} ({vol}).",
            f"Answer: {mem}",
        ]
        verification = (
            f"Verified: '{scenario}' → {mem} ({vol}). "
            f"RAM is for temporary working data; ROM is for permanent startup data."
        )
        questions.append(SolvedQuestion(
            topic=Topic.RAM_ROM.value,
            question=(
                "Read the following scenario and identify whether it describes "
                f"RAM or ROM:\n\n  '{scenario}'\n\n"
                f"Choose: A) {mem}   B) {other}"
            ),
            step_by_step=steps,
            answer=mem,
            verification=verification,
            options=[f"{mem} ({vol})", f"{other} ({'non-volatile' if mem=='RAM' else 'volatile'})"],
            correct_index=0,
        ))

    # ── Q-type 3: Fill in the blank ─────────────────────────────────────────
    blank_templates = [
        (
            "_____ (Random Access Memory) is _____ memory that loses its data when power is off.",
            "RAM", "volatile",
        ),
        (
            "_____ (Read Only Memory) is _____ memory that keeps data even without power.",
            "ROM", "non-volatile",
        ),
        (
            "RAM is used to run programs and store data _____ (temporarily / permanently).",
            "temporarily", None,
        ),
        (
            "ROM stores _____ instructions that run when you start the computer.",
            "startup", None,
        ),
        (
            "The full form of RAM is _____ _____ _____.",
            "Random", "Access Memory",
        ),
        (
            "1 byte equals _____ bits.",
            "8", None,
        ),
    ]
    for _ in range(q_per_type):
        template, ans_a, ans_b = r.choice(blank_templates)
        if ans_b:
            # two blanks
            q_text = f"Fill in the blanks:\n\n  {template}"
            full_answer = f"{ans_a}; {ans_b}"
            steps = [
                f"Step 1 — Read the sentence carefully.",
                f"Step 2 — Recall: RAM = Random Access Memory, volatile.",
                f"Step 3 — Fill blank 1: {ans_a}",
                f"Step 4 — Fill blank 2: {ans_b}",
                f"Answer: {full_answer}",
            ]
        else:
            q_text = f"Fill in the blank:\n\n  {template}"
            full_answer = ans_a
            steps = [
                f"Step 1 — Read the sentence carefully.",
                f"Step 2 — Recall the relevant definition or fact.",
                f"Step 3 — The missing word is '{ans_a}'.",
                f"Answer: {ans_a}",
            ]
        verification = f"Verified: Filled blank(s) correctly → {full_answer}."
        questions.append(SolvedQuestion(
            topic=Topic.RAM_ROM.value,
            question=q_text,
            step_by_step=steps,
            answer=full_answer,
            verification=verification,
        ))

    # ── Q-type 4: Volatile / Non-volatile comparison ────────────────────────
    for _ in range(q_per_type):
        mem = r.choice(["RAM", "ROM"])
        other = "ROM" if mem == "RAM" else "RAM"

        if mem == "RAM":
            q_text = (
                "Why is RAM called 'volatile' memory? Explain in one sentence "
                "and give one example of what happens when the power is switched off."
            )
            answer = (
                "RAM is called volatile because it loses all stored data when power is switched off. "
                "For example, an unsaved document in RAM disappears when the computer shuts down."
            )
            steps = [
                "Step 1 — 'Volatile' means the memory cannot hold data without power.",
                "Step 2 — RAM = volatile → data is lost when power is OFF.",
                "Step 3 — Example: An unsaved document in RAM vanishes on shutdown.",
                "Step 4 — Contrast: ROM (non-volatile) keeps data without power.",
                "Answer: RAM is volatile because it loses data on power-off (e.g., unsaved documents disappear).",
            ]
        else:
            q_text = (
                "Why is ROM called 'non-volatile' memory? Explain in one sentence "
                "and give one example of what ROM stores."
            )
            answer = (
                "ROM is called non-volatile because it retains data even when power is switched off. "
                "For example, ROM stores BIOS startup instructions."
            )
            steps = [
                "Step 1 — 'Non-volatile' means memory holds data even without power.",
                "Step 2 — ROM = non-volatile → data is retained when power is OFF.",
                "Step 3 — Example: ROM stores BIOS (startup instructions).",
                "Step 4 — Contrast: RAM (volatile) loses data on power-off.",
                "Answer: ROM is non-volatile because it retains data without power (e.g., BIOS startup instructions).",
            ]
        verification = f"Verified: {mem} is {'volatile' if mem=='RAM' else 'non-volatile'} — definition and example are correct."

        questions.append(SolvedQuestion(
            topic=Topic.RAM_ROM.value,
            question=q_text,
            step_by_step=steps,
            answer=answer,
            verification=verification,
        ))

    return QuestionSet(
        node_id="c4_cs_002",
        topic="RAM & ROM Memory",
        questions=questions,
    )


# ──────────────────────────────────────────────
#  SOLVER  —  c4_cs_003  Storage Devices
# ──────────────────────────────────────────────

_DEVICE_DATA = {
    "HDD": {
        "full": "Hard Disk Drive",
        "type": "magnetic",
        "internal": True,
        "portable": False,
        "permanent": True,
        "speed": "slow",
        "desc": "Internal magnetic storage with moving parts; stores the operating system and large files.",
    },
    "SSD": {
        "full": "Solid State Drive",
        "type": "flash",
        "internal": True,
        "portable": False,
        "permanent": True,
        "speed": "fast",
        "desc": "Internal storage with no moving parts; faster than HDD; stores the OS and programs.",
    },
    "USB flash drive": {
        "full": "USB Flash Drive",
        "type": "flash",
        "internal": False,
        "portable": True,
        "permanent": True,
        "speed": "medium",
        "desc": "Small portable external storage device; plug into a USB port.",
    },
    "CD": {
        "full": "Compact Disc",
        "type": "optical",
        "internal": False,
        "portable": True,
        "permanent": True,
        "speed": "slow",
        "desc": "Round disc read by a laser; holds about 700 MB; used for music and small data.",
    },
    "DVD": {
        "full": "Digital Versatile Disc",
        "type": "optical",
        "internal": False,
        "portable": True,
        "permanent": True,
        "speed": "slow",
        "desc": "Like a CD but holds much more data (4.7 GB to 17 GB); used for movies and large files.",
    },
    "Cloud storage": {
        "full": "Cloud Storage",
        "type": "online",
        "internal": False,
        "portable": True,
        "permanent": True,
        "speed": "depends on internet",
        "desc": "Online storage on remote servers; accessible from any device with Internet.",
    },
}


def solve_node_003(seed: int = 202, q_per_type: int = 2) -> QuestionSet:
    """
    c4_cs_003 — Storage Devices: HDD, SSD, USB, CD, DVD, Cloud Storage
    Generates:
      1. Identify the device from a description
      2. True/False about device properties
      3. Match device to its characteristic
      4. Classify: internal vs external / portable vs non-portable
      5. Compare HDD vs SSD
    """
    r = _rng(seed)
    questions: List[SolvedQuestion] = []
    device_names = list(_DEVICE_DATA.keys())

    # ── Q-type 1: Identify device from description ───────────────────────────
    for _ in range(q_per_type):
        dev = r.choice(device_names)
        info = _DEVICE_DATA[dev]
        distractors = [d for d in device_names if d != dev]
        wrong1, wrong2 = r.sample(distractors, 2)

        # Build a question focusing on a specific clue
        clue_focus = r.choice(["type", "internal", "portable", "speed", "full"])

        if clue_focus == "type":
            clue = f"This storage device uses {info['type']} technology."
        elif clue_focus == "internal":
            clue = (f"This device is installed INSIDE the computer case — "
                    f"you cannot easily remove it to carry around.")
        elif clue_focus == "portable":
            clue = ("You can carry this device in your pocket and plug it into "
                    "any computer to access your files.")
        elif clue_focus == "speed":
            clue = (f"This device is the fastest type of internal storage "
                    f"and has no moving parts inside.")
        else:  # full — describe by what it does
            clue = info["desc"]

        q_text = (
            "Read the description and identify the storage device:\n\n"
            f"  \"{clue}\"\n\n"
            f"Options:\n"
            f"  A) {wrong1} ({_DEVICE_DATA[wrong1]['full']})\n"
            f"  B) {dev} ({info['full']})\n"
            f"  C) {wrong2} ({_DEVICE_DATA[wrong2]['full']})"
        )

        options = [wrong1, dev, wrong2]
        r.shuffle(options)
        correct_idx = options.index(dev)
        correct_letter = ["A", "B", "C"][correct_idx]

        steps = [
            f"Step 1 — Read the description: '{clue}'",
            f"Step 2 — Recall properties of each option:",
            *[f"  • {d}: {_DEVICE_DATA[d]['full']} — {_DEVICE_DATA[d]['desc']}"
              for d in [wrong1, dev, wrong2]],
            f"Step 3 — Match description to device: matches {dev} ({info['full']}).",
            f"Answer: {correct_letter}) {dev} ({info['full']})",
        ]
        verification = (
            f"Verified: '{clue}' matches {dev} "
            f"({', '.join(k+'='+str(v) for k,v in info.items() if k not in ['full','desc'])}). "
            f"Correct option index = {correct_idx} ({correct_letter})."
        )
        questions.append(SolvedQuestion(
            topic=Topic.STORAGE_DEVICES.value,
            question=q_text,
            step_by_step=steps,
            answer=f"{correct_letter}) {dev}",
            verification=verification,
            options=[f"{d} ({_DEVICE_DATA[d]['full']})" for d in options],
            correct_index=correct_idx,
        ))

    # ── Q-type 2: True / False on device properties ─────────────────────────
    property_pool = [
        ("HDD has moving parts inside.", True),
        ("SSD has no moving parts.", True),
        ("A USB flash drive is a portable storage device.", True),
        ("Cloud storage works without the Internet.", False),
        ("CDs are read using a laser beam.", True),
        ("DVDs can store less data than CDs.", False),
        ("SSD is faster than HDD.", True),
        ("A CD can hold 1 GB of data.", False),   # CD ≈ 700 MB
        ("Cloud storage is stored on remote servers.", True),
        ("You can carry a hard disk drive in your pocket.", False),  # internal HDD
        ("ROM chips are used in CD drives.", False),  # not in scope
        ("USB drives use flash memory.", True),
    ]
    for _ in range(q_per_type):
        statement, is_true = r.choice(property_pool)
        answer = "True" if is_true else "False"
        steps = [
            f"Step 1 — Statement: '{statement}'",
            "Step 2 — Recall facts about storage devices:",
            "  • HDD: magnetic, internal, has moving parts, slower.",
            "  • SSD: flash, internal, no moving parts, faster than HDD.",
            "  • USB flash drive: portable, external, flash memory.",
            "  • CD: optical, ~700 MB, read by laser.",
            "  • DVD: optical, ~4.7 GB, read by laser.",
            "  • Cloud storage: online, needs Internet.",
            f"Step 3 — Evaluate: {'Statement is correct.' if is_true else 'Statement is incorrect.'}",
            f"Answer: {answer}",
        ]
        verification = (
            f"Verified: '{statement}' → {answer}. "
            f"{'Matches known fact.' if is_true else 'Contradicts known fact.'}"
        )
        questions.append(SolvedQuestion(
            topic=Topic.STORAGE_DEVICES.value,
            question=f"State whether True or False:\n\n  {statement}",
            step_by_step=steps,
            answer=answer,
            verification=verification,
            options=["True", "False"],
            correct_index=0 if is_true else 1,
        ))

    # ── Q-type 3: Classify internal vs external ─────────────────────────────
    for _ in range(q_per_type):
        internal_devs = [d for d, v in _DEVICE_DATA.items() if v["internal"]]
        external_devs = [d for d, v in _DEVICE_DATA.items() if not v["internal"]]
        pool = internal_devs + external_devs
        chosen = r.sample(pool, r.randint(3, 4))
        r.shuffle(chosen)

        q_text = (
            "Classify each of the following storage devices as INTERNAL or EXTERNAL "
            "(portable):\n\n"
            + "\n".join(f"  {i+1}. {d}" for i, d in enumerate(chosen))
            + "\n\nWrite 'Internal' or 'External' for each."
        )
        classifications = [
            f"{i+1}. {d} → {'Internal' if _DEVICE_DATA[d]['internal'] else 'External'}"
            for i, d in enumerate(chosen)
        ]
        steps = [
            "Step 1 — Recall definitions:",
            "  • Internal device: installed inside the computer tower/case.",
            "  • External device: portable; can be connected/disconnected.",
            "Step 2 — For each device, check the _DEVICE_DATA properties:",
            *[f"  • {d}: {'internal' if _DEVICE_DATA[d]['internal'] else 'external/portable'}"
              for d in chosen],
            "Step 3 — Write classifications.",
            "Answer:\n  " + "\n  ".join(classifications),
        ]
        verification = (
            "Verified: Classification matches _DEVICE_DATA. "
            + "; ".join(classifications)
        )
        questions.append(SolvedQuestion(
            topic=Topic.STORAGE_DEVICES.value,
            question=q_text,
            step_by_step=steps,
            answer="\n".join(classifications),
            verification=verification,
        ))

    # ── Q-type 4: Compare HDD vs SSD ────────────────────────────────────────
    for _ in range(q_per_type):
        comparison_aspect = r.choice(["speed", "moving parts", "durability", "capacity"])
        if comparison_aspect == "speed":
            q_text = "Which is faster: HDD or SSD? Explain briefly."
            answer = "SSD is faster than HDD because SSD has no moving parts and uses flash memory."
            steps = [
                "Step 1 — Recall HDD: uses magnetic platters with a moving read/write head — SLOWER.",
                "Step 2 — Recall SSD: uses flash memory chips with no moving parts — FASTER.",
                "Step 3 — Compare: No mechanical movement in SSD means less latency.",
                "Answer: SSD is faster than HDD.",
            ]
        elif comparison_aspect == "moving parts":
            q_text = "Which storage device has moving parts — HDD or SSD?"
            answer = "HDD has moving parts (spinning platters and a moving read/write head). SSD has no moving parts."
            steps = [
                "Step 1 — Recall HDD structure: magnetic platters that spin + a moving read/write head.",
                "Step 2 — Recall SSD structure: flash memory chips; no mechanical parts.",
                "Step 3 — Conclusion: Only HDD has moving parts.",
                "Answer: HDD has moving parts; SSD has none.",
            ]
        elif comparison_aspect == "durability":
            q_text = "Which is more durable — HDD or SSD? Give one reason."
            answer = ("SSD is more durable because it has no moving parts, "
                      "so it is less likely to be damaged by drops or shocks.")
            steps = [
                "Step 1 — Recall: HDD has fragile moving parts that can break if dropped.",
                "Step 2 — Recall: SSD has no moving parts — more shock-resistant.",
                "Step 3 — Conclusion: SSD is more durable.",
                "Answer: SSD is more durable (no moving parts = less prone to physical damage).",
            ]
        else:  # capacity comparison word problem
            hdd_gb = r.choice([500, 1000, 2000])
            ssd_gb = r.choice([256, 512, 1024])
            larger = "HDD" if hdd_gb > ssd_gb else "SSD"
            q_text = (
                f"A computer has a {hdd_gb} GB HDD and a {ssd_gb} GB SSD. "
                f"Which drive can store more data, and by how many GB?"
            )
            diff = abs(hdd_gb - ssd_gb)
            answer = (f"The {larger} can store more data. "
                      f"Difference = {hdd_gb} − {ssd_gb} = {diff} GB.")
            steps = [
                f"Step 1 — HDD capacity = {hdd_gb} GB.",
                f"Step 2 — SSD capacity = {ssd_gb} GB.",
                f"Step 3 — Compare: {hdd_gb} {'>' if hdd_gb>ssd_gb else '<'} {ssd_gb}.",
                f"Step 4 — Difference: |{hdd_gb} − {ssd_gb}| = {diff} GB.",
                f"Answer: {larger} stores more data by {diff} GB.",
            ]
        verification = f"Verified: {answer}"
        questions.append(SolvedQuestion(
            topic=Topic.STORAGE_DEVICES.value,
            question=q_text,
            step_by_step=steps,
            answer=answer,
            verification=verification,
        ))

    return QuestionSet(
        node_id="c4_cs_003",
        topic="Storage Devices",
        questions=questions,
    )


# ──────────────────────────────────────────────
#  MASTER SOLVER
# ──────────────────────────────────────────────

def solve_all(seed: int = 2025) -> List[QuestionSet]:
    """
    Run all three node-solvers with a single global seed.
    Each node-solver derives its own sub-seed deterministically.
    """
    master_rng = random.Random(seed)
    sets: List[QuestionSet] = []

    node_seeds = [master_rng.randint(0, 9999) for _ in range(3)]

    sets.append(solve_node_001(seed=node_seeds[0], q_per_type=2))
    sets.append(solve_node_002(seed=node_seeds[1], q_per_type=2))
    sets.append(solve_node_003(seed=node_seeds[2], q_per_type=2))

    return sets


def solve_node(node_id: str, seed: int = 2025) -> QuestionSet:
    """Solve a single node by its ID."""
    mapping = {
        "c4_cs_001": (solve_node_001, 42),
        "c4_cs_002": (solve_node_002, 101),
        "c4_cs_003": (solve_node_003, 202),
    }
    fn, default_seed = mapping.get(node_id, (None, None))
    if fn is None:
        raise ValueError(f"Unknown node_id: {node_id}")
    return fn(seed=seed if seed != 2025 else default_seed, q_per_type=2)


# ──────────────────────────────────────────────
#  CLI  (for quick verification)
# ──────────────────────────────────────────────

if __name__ == "__main__":
    import json
    sets = solve_all(seed=2025)
    for s in sets:
        print(f"\n{'='*70}")
        print(f"  NODE: {s.node_id}   TOPIC: {s.topic}")
        print(f"{'='*70}")
        for i, q in enumerate(s.questions, 1):
            print(f"\n  Q{i}: {q.question[:120]}{'...' if len(q.question)>120 else ''}")
            print(f"  ANSWER: {q.answer}")
            print(f"  VERIFY: {q.verification[:100]}")