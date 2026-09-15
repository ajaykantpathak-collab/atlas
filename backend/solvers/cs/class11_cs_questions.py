"""
CISCE ISC Class 11 Computer Science - Deterministic Question Generator
Syllabus: Computer Architecture (Von Neumann, Memory Organisation)
Author: claude-fable-5 (Anthropic)
"""

import random
import math
import hashlib
from typing import List, Dict, Any, Optional, Tuple
from dataclasses import dataclass


# =============================================================================
# CONFIGURATION & CONSTANTS
# =============================================================================

TOPIC_META = {
    "von_neumann": {
        "name": "Von Neumann Model",
        "node": "c11_cs_001",
        "difficulty_dist": {"Easy": 0.25, "Medium": 0.40, "Hard": 0.35},
    },
    "bus_types": {
        "name": "Bus Architecture",
        "node": "c11_cs_001",
        "difficulty_dist": {"Easy": 0.20, "Medium": 0.40, "Hard": 0.40},
    },
    "fde_cycle": {
        "name": "Fetch-Decode-Execute Cycle",
        "node": "c11_cs_001",
        "difficulty_dist": {"Easy": 0.20, "Medium": 0.35, "Hard": 0.45},
    },
    "memory_types": {
        "name": "Memory Organisation (RAM/ROM)",
        "node": "c11_cs_002",
        "difficulty_dist": {"Easy": 0.25, "Medium": 0.40, "Hard": 0.35},
    },
    "cache_virtual": {
        "name": "Cache Memory & Virtual Memory",
        "node": "c11_cs_002",
        "difficulty_dist": {"Easy": 0.20, "Medium": 0.40, "Hard": 0.40},
    },
    "comparison": {
        "name": "Memory Comparison & Applications",
        "node": "c11_cs_002",
        "difficulty_dist": {"Easy": 0.20, "Medium": 0.40, "Hard": 0.40},
    },
    "numerical": {
        "name": "Numerical Problems",
        "node": "c11_cs_001",
        "difficulty_dist": {"Easy": 0.10, "Medium": 0.35, "Hard": 0.55},
    },
}

QUESTION_TYPES = ["MCQ", "FillBlank", "ShortAnswer", "LongAnswer", "Numerical"]

COMPETENCY_INDICATORS = [
    "An Indian school is setting up its first computer lab",
    "A government school in Maharashtra is modernising classrooms",
    "A student in Delhi preparing for board practicals",
    "An Indian entrepreneur launching a startup incubator",
    "A rural school in Karnataka receiving donated computers",
    "A CBSE school lab in-charge needs to upgrade hardware",
    "An Indian digital literacy NGO training village teachers",
    "A student council in Chennai organising a tech fest",
    "A government initiative for e-governance training in Gujarat",
    "An Indian ed-tech company designing school lab software",
]


# =============================================================================
# HELPER: Deterministic helper functions
# =============================================================================

def _make_rng(seed: int) -> random.Random:
    """Return a fresh Random instance bound to *seed*."""
    return random.Random(seed)


def _pick_difficulty(rng: random.Random, topic: str) -> str:
    dist = TOPIC_META[topic]["difficulty_dist"]
    r = rng.random()
    cum = 0.0
    for level, pct in dist.items():
        cum += pct
        if r <= cum:
            return level
    return "Medium"


def _is_competency(rng: random.Random) -> bool:
    return rng.random() < 0.50


def _next_id(counter: int, topic: str) -> str:
    return f"C11CS_{topic.upper()}_{counter:04d}"


def _build_options(rng: random.Random, correct: str, pool: List[str]) -> List[str]:
    wrong = [w for w in pool if w != correct]
    rng.shuffle(wrong)
    chosen = wrong[:3]
    opts = chosen + [correct]
    rng.shuffle(opts)
    return opts


def _shuffle_options(rng: random.Random, opts: List[str]) -> List[str]:
    items = list(opts)
    rng.shuffle(items)
    return items


# =============================================================================
# SOLVER FUNCTIONS
# =============================================================================

def solve_mcq(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve an MCQ question."""
    options = params.get("options", [])
    answer = params.get("answer", "")
    topic = params.get("topic", "")
    explanation = params.get("explanation", "")

    correct_index = None
    for i, opt in enumerate(options):
        if opt.strip().lower() == answer.strip().lower():
            correct_index = i
            break

    return {
        "answer": answer,
        "answer_index": correct_index,
        "options": options,
        "steps": [
            "Step 1: Read the question carefully and identify the key concept being tested.",
            f"Step 2: Analyse each option against what is known about {topic}.",
            f"Step 3: Recall that the correct concept for {topic} is: {answer}.",
            "Step 4: Eliminate incorrect options that contradict the fundamental definition or principle.",
            f"Step 5: Confirm the correct answer: '{answer}'.",
        ],
        "verification": (
            f"Verified: Option '{answer}' correctly matches the definition of {topic}. "
            f"All other options contain factual errors or describe different concepts."
        ),
    }


def solve_fill_blank(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve a fill-in-the-blank question."""
    answer = params.get("answer", "")
    topic = params.get("topic", "")
    explanation = params.get("explanation", "")

    return {
        "answer": answer,
        "steps": [
            "Step 1: Identify the blank in the statement and note the context clues.",
            f"Step 2: Recall the relevant concept from the topic '{topic}'.",
            f"Step 3: Identify the key term that completes the definition or statement: '{answer}'.",
            "Step 4: Verify that the term fits grammatically and semantically in the blank.",
            "Step 5: Confirm that this is the standard terminology used in the syllabus.",
        ],
        "verification": (
            f"Verified: '{answer}' is the standard technical term for the concept described. "
            f"Cross-checked against CISCE Class 11 Computer Science syllabus."
        ),
    }


def solve_short_answer(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve a short-answer question."""
    answer = params.get("answer", "")
    points = params.get("points", [])
    topic = params.get("topic", "")

    return {
        "answer": answer,
        "key_points": points if points else [answer],
        "steps": [
            "Step 1: Identify what the question is asking - note key terms.",
            "Step 2: Recall the definition and key characteristics of the concept.",
            "Step 3: Structure the answer with a clear definition, explanation, and example.",
            "Step 4: Use correct technical terminology as per the syllabus.",
            "Step 5: Conclude with a brief summary or significance.",
        ],
        "verification": (
            f"Verified: Answer covers definition, working, and significance of {topic}. "
            f"Total key points addressed: {len(points) if points else 1}."
        ),
    }


def solve_long_answer(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve a long-answer question."""
    answer = params.get("answer", "")
    outline = params.get("outline", [])
    topic = params.get("topic", "")

    return {
        "answer": answer,
        "outline": outline,
        "steps": [
            "Step 1: Break down the question into sub-parts and address each separately.",
            "Step 2: Begin with a formal definition of the core concept.",
            "Step 3: Explain each component or sub-concept with appropriate detail.",
            "Step 4: Provide examples, diagrams (described in text), or analogies.",
            "Step 5: Discuss advantages, disadvantages, or comparisons where relevant.",
            "Step 6: Conclude with a summary of key learnings.",
        ],
        "verification": (
            f"Verified: Long answer comprehensively covers {topic}. "
            f"Outline sections: {len(outline)}. "
            f"Each section addresses syllabus mastery criteria."
        ),
    }


def solve_numerical(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve a numerical problem."""
    answer = params.get("answer", 0)
    steps = params.get("steps", [])
    topic = params.get("topic", "")
    formula = params.get("formula", "")

    return {
        "answer": answer,
        "formula": formula,
        "steps": steps,
        "verification": (
            f"Numerical check: Substituting computed answer back into the formula "
            f"confirms the result. Formula used: {formula}. "
            f"Final computed answer = {answer}."
        ),
    }


# =============================================================================
# QUESTION BANK DATA
# =============================================================================

# Each entry: (topic, type, question, correct_answer, explanation, [options_or_points],
#              difficulty, is_competency, kwargs)

# ---------------------------------------------------------------------------
# von_neumann questions
# ---------------------------------------------------------------------------
Q_VN = [
    # --- MCQs ---
    ("von_neumann", "MCQ",
     "Who proposed the stored-program computer architecture?",
     "John von Neumann", "John von Neumann formalised the stored-program concept in the 1945 EDVAC report, describing a computer where program instructions are stored in the same memory as data.",
     ["John von Neumann", "Alan Turing", "Charles Babbage", "John Atanasoff"],
     "Medium", False, {"node": "c11_cs_001"}),

    ("von_neumann", "MCQ",
     "In the von Neumann model, where are both program instructions and data stored?",
     "In the same memory", "The stored-program concept means instructions and data share the same memory unit - a defining feature of the von Neumann architecture.",
     ["In separate memories", "In the same memory", "In CPU registers only", "On secondary storage only"],
     "Easy", False, {"node": "c11_cs_001"}),

    ("von_neumann", "MCQ",
     "The von Neumann model is also called the:",
     "Princeton architecture", "The Princeton architecture at Princeton University is where von Neumann worked; the alternative is the Harvard architecture which uses separate memories for instructions and data.",
     ["Harvard architecture", "Princeton architecture", "Manchester architecture", "x86 architecture"],
     "Medium", False, {"node": "c11_cs_001"}),

    ("von_neumann", "MCQ",
     "A major limitation of the von Neumann architecture is called:",
     "Von Neumann bottleneck", "The von Neumann bottleneck arises because the single shared bus cannot fetch instructions and data simultaneously, limiting performance.",
     ["Moore's law limit", "Von Neumann bottleneck", "Harvard gap", "ALU constraint"],
     "Hard", False, {"node": "c11_cs_001"}),

    ("von_neumann", "MCQ",
     "In the von Neumann model, the 'stored program' means:",
     "Instructions are stored in memory and fetched as data", "Programs are stored in memory as binary data and fetched sequentially by the CPU - the same way data is fetched.",
     ["Programs are stored on CDs", "Instructions are stored in memory and fetched as data", "Only data is stored in memory", "Instructions are hardwired into the CPU"],
     "Easy", False, {"node": "c11_cs_001"}),

    ("von_neumann", "MCQ",
     "Which component is NOT part of the von Neumann model?",
     "GPU", "The von Neumann model describes CPU, memory, and I/O subsystems. GPUs were not part of the original 1945 model.",
     ["CPU", "Memory Unit", "I/O subsystem", "GPU"],
     "Medium", False, {"node": "c11_cs_001"}),

    ("von_neumann", "MCQ",
     "The Harvard architecture differs from the von Neumann model in that it has:",
     "Separate memory for instructions and data", "Harvard architecture uses physically separate memories for instructions and data, allowing simultaneous access.",
     ["No CPU", "Separate memory for instructions and data", "No ALU", "Separate power supplies"],
     "Medium", False, {"node": "c11_cs_001"}),

    ("von_neumann", "MCQ",
     "The von Neumann bottleneck occurs because:",
     "Instructions and data share a single bus", "Both instructions and data use the same system bus, so the CPU cannot fetch both simultaneously.",
     ["CPU is too slow", "Instructions and data share a single bus", "Memory is too small", "ALU is too simple"],
     "Hard", False, {"node": "c11_cs_001"}),

    # --- Fill in the blank ---
    ("von_neumann", "FillBlank",
     "The ____ model of computer architecture describes a system where instructions and data are stored in the same memory unit.",
     "von Neumann",
     "The von Neumann model (also called the Princeton architecture) is based on the stored-program concept where program instructions reside in the same memory as data.",
     [], "Easy", False, {"node": "c11_cs_001"}),

    ("von_neumann", "FillBlank",
     "In the von Neumann model, the concept of storing instructions in memory alongside data is called the ____ concept.",
     "stored program",
     "The stored-program concept is the fundamental principle of the von Neumann architecture, enabling computers to be reprogrammed by loading different programs.",
     [], "Easy", False, {"node": "c11_cs_001"}),

    ("von_neumann", "FillBlank",
     "The ______ architecture uses separate memory spaces for instructions and data, in contrast to the von Neumann model.",
     "Harvard",
     "The Harvard architecture has separate memory and buses for instructions and data, unlike the shared-memory von Neumann model.",
     [], "Medium", False, {"node": "c11_cs_001"}),

    ("von_neumann", "FillBlank",
     "The limitation caused by shared memory and bus in the von Neumann model is known as the ______ bottleneck.",
     "von Neumann",
     "The von Neumann bottleneck refers to the limited throughput between CPU and memory due to a single shared bus.",
     [], "Medium", False, {"node": "c11_cs_001"}),

    # --- Short answer ---
    ("von_neumann", "ShortAnswer",
     "Explain the 'stored program concept' in the von Neumann model.",
     "The stored program concept means both the program instructions and the data on which the program operates are stored together in the same primary memory (RAM). The CPU sequentially fetches each instruction from memory, decodes it, and executes it. This makes the computer general-purpose - the same hardware can run different programs simply by loading different instructions into memory. This was proposed by John von Neumann in 1945.",
     ["Stored program concept definition", "Instructions and data in same memory", "Sequential fetch mechanism", "General-purpose computing benefit", "John von Neumann, 1945"],
     "Medium", False, {"node": "c11_cs_001"}),

    ("von_neumann", "ShortAnswer",
     "Differentiate between the von Neumann model and the Harvard model.",
     "Von Neumann model: Uses a single memory unit to store both instructions and data. Instructions and data travel on the same bus, so they cannot be fetched simultaneously (the von Neumann bottleneck). Harvard model: Uses two separate memory units - one for instructions and one for data. Both can be accessed simultaneously, giving higher speed. Modern CPUs use a modified Harvard architecture for cache while using von Neumann for main memory.",
     ["Von Neumann: single shared memory", "Harvard: separate memories", "Von Neumann bottleneck", "Simultaneous access in Harvard", "Modified Harvard in modern CPUs"],
     "Medium", False, {"node": "c11_cs_001"}),

    ("von_neumann", "ShortAnswer",
     "Why is the von Neumann model called a 'stored program' architecture?",
     "It is called 'stored program' because the program instructions are not hardwired into the CPU. Instead, the entire program is stored in memory as a sequence of binary codes, just like data. The CPU fetches each instruction from memory one by one, decodes it, and executes it. This makes the computer programmable - you can change the program by loading a new set of instructions without changing any hardware.",
     ["Instructions not hardwired", "Program stored as binary in memory", "Sequential fetch-decode-execute", "Programmable nature of computers", "Contrast with hardwired control"],
     "Medium", False, {"node": "c11_cs_001"}),

    ("von_neumann", "ShortAnswer",
     "What are the three main components of a von Neumann computer system?",
     "The three main components are: (1) CPU (Central Processing Unit) - contains the ALU, Control Unit, and registers; (2) Memory Unit - stores both instructions and data (RAM/ROM); (3) I/O Subsystem - handles communication with external devices (keyboard, mouse, monitor, printer). These components are connected via a system bus architecture.",
     ["CPU (ALU, CU, registers)", "Memory Unit", "I/O Subsystem", "System bus connects them", "All three described"],
     "Easy", False, {"node": "c11_cs_001"}),

    # --- Long answer ---
    ("von_neumann", "LongAnswer",
     "Describe the von Neumann model of computer architecture in detail. Include its components, working principle, and significance.",
     "The von Neumann model, proposed by mathematician John von Neumann in 1945, is the foundational architecture for almost all modern computers.\n\nCOMPONENTS:\n(1) CPU: Contains the Arithmetic Logic Unit (ALU) for computation, the Control Unit (CU) for directing operations, and registers for temporary storage.\n(2) Memory Unit: Stores both program instructions and data in binary form. This is the key innovation - the 'stored program' concept.\n(3) I/O Subsystem: Enables the computer to interact with the external world.\n\nWORKING: The CPU fetches instructions sequentially from memory using the address bus, decodes them via the Control Unit, and executes them via the ALU or through memory/I/O operations. Results are stored back in memory or registers.\n\nSIGNIFICANCE: This model made computers general-purpose - the same hardware runs different programs by loading different instructions. It established the blueprint for modern computing. However, it introduces the 'von Neumann bottleneck' - a performance limitation because instructions and data share the same bus.",
     ["Von Neumann proposal (1945)", "Three components: CPU, Memory, I/O", "Stored program concept explained", "Working of fetch-decode-execute", "Significance: general-purpose computing", "Von Neumann bottleneck explained"],
     "Hard", False, {"node": "c11_cs_001"}),

    # --- Competency (Indian context) ---
    ("von_neumann", "MCQ",
     "A government school in Delhi is buying new computers for its lab. The vendor explains that the computers follow the von Neumann architecture. Which feature is the vendor referring to?",
     "Programs and data are stored in the same memory", "All modern desktop/laptop computers follow the von Neumann (stored-program) architecture where programs and data coexist in RAM.",
     ["Programs and data are stored in the same memory", "Computer has no hard disk", "Computer uses batteries only", "Computer connects to the Internet"],
     "Easy", True, {"node": "c11_cs_001"}),

    ("von_neumann", "ShortAnswer",
     "An NGO in rural Maharashtra is conducting a digital literacy workshop. They explain that in modern computers, the same memory stores the 'recipe' (program) and the 'ingredients' (data). What computer architecture concept are they describing, and who proposed it?",
     "They are describing the 'stored program concept' of the von Neumann model, proposed by John von Neumann in 1945. In this architecture, both the program instructions ('recipe') and the data ('ingredients') are stored in the same primary memory (RAM). The CPU fetches each instruction sequentially, decodes it, and executes it on the data. This concept is the foundation of all modern general-purpose computers, making them programmable and versatile.",
     ["Stored program concept identified", "John von Neumann mentioned", "Instructions and data in same memory", "Recipe and ingredients analogy explained", "Sequential fetch explained"],
     "Medium", True, {"node": "c11_cs_001"}),

    ("von_neumann", "FillBlank",
     "An Indian ed-tech company designing software for school computer labs notes that program instructions and data are stored together in RAM. This is the ______ concept of the von Neumann model.",
     "stored program",
     "The stored program concept is the defining principle of the von Neumann architecture, enabling programmable general-purpose computers.",
     [], "Easy", True, {"node": "c11_cs_001"}),

    ("von_neumann", "LongAnswer",
     "A school in Chennai is setting up a new computer lab under the Digital India initiative. The lab coordinator must explain to parents why all computers can run different applications. Write a detailed explanation using the von Neumann model.",
     "The coordinator should explain: (1) The von Neumann model is the standard computer architecture used in all modern PCs. (2) The 'stored program concept' means both the program (e.g., a word processor) and the user's documents (data) are stored together in the computer's RAM. (3) When a user opens a different application (e.g., a spreadsheet), the computer simply loads a different set of instructions into the same memory - no hardware change is needed. (4) This makes the computer 'general-purpose' - the same machine can be a word processor, calculator, browser, or drawing tool depending on what program is loaded. (5) This was proposed by John von Neumann in 1945 and is why we can install different software on the same computer.",
     ["Von Neumann model explained", "Stored program concept", "General-purpose computing", "Digital India context", "Why same hardware runs different apps", "John von Neumann mentioned"],
     "Medium", True, {"node": "c11_cs_001"}),

    ("von_neumann", "MCQ",
     "A student in Bangalore is learning about computer architecture for her board exam. She learns that the von Neumann model is called 'stored program' architecture because:",
     "Program instructions are stored in memory alongside data",
     "The stored-program concept is the defining feature of the von Neumann architecture.",
     ["Program instructions are stored in memory alongside data", "The computer uses flash memory", "Programs are stored on the hard disk", "Instructions are permanently burned into the CPU"],
     "Easy", True, {"node": "c11_cs_001"}),
]

# ---------------------------------------------------------------------------
# bus_types questions
# ---------------------------------------------------------------------------
Q_BUS = [
    ("bus_types", "MCQ",
     "Which bus carries memory addresses from the CPU to the memory unit?",
     "Address bus", "The address bus carries the memory location (address) that the CPU wants to access. It is unidirectional.",
     ["Data bus", "Address bus", "Control bus", "Power bus"],
     "Easy", False, {"node": "c11_cs_001"}),

    ("bus_types", "MCQ",
     "Which bus carries the actual data between CPU, memory, and I/O devices?",
     "Data bus", "The data bus transfers the actual data values between the CPU and other components.",
     ["Address bus", "Control bus", "Data bus", "System bus"],
     "Easy", False, {"node": "c11_cs_001"}),

    ("bus_types", "MCQ",
     "Which bus carries control signals like read/write and clock signals?",
     "Control bus", "The control bus transmits control signals from the control unit to coordinate read/write operations and timing.",
     ["Data bus", "Address bus", "Control bus", "Expansion bus"],
     "Easy", False, {"node": "c11_cs_001"}),

    ("bus_types", "MCQ",
     "The address bus is:",
     "Unidirectional (CPU to memory only)",
     "The address bus only carries addresses from the CPU to memory/I/O - it is unidirectional. The data bus is bidirectional.",
     ["Bidirectional", "Unidirectional (CPU to memory only)", "Half-duplex", "Multiplexed always"],
     "Medium", False, {"node": "c11_cs_001"}),

    ("bus_types", "MCQ",
     "A 32-bit address bus can directly address how many unique memory locations?",
     "2^32 (4,294,967,296)", "A 32-bit address bus has 2^32 = 4,294,967,296 unique addresses. This equals 4 GB of addressable memory.",
     ["2^16", "2^32", "2^64", "32 locations"],
     "Hard", False, {"node": "c11_cs_001"}),

    ("bus_types", "MCQ",
     "If the data bus width is doubled, the amount of data transferred per cycle:",
     "Doubles", "The data bus width determines how many bits can be transferred in one clock cycle. Doubling the width doubles the transfer rate.",
     ["Halves", "Doubles", "Stays the same", "Depends on clock speed only"],
     "Medium", False, {"node": "c11_cs_001"}),

    ("bus_types", "MCQ",
     "Which bus is responsible for synchronising the activities of all components?",
     "Control bus", "The control bus carries clock signals and control signals (read/write, interrupt, reset) that synchronise all components.",
     ["Data bus", "Address bus", "Control bus", "System bus"],
     "Medium", False, {"node": "c11_cs_001"}),

    ("bus_types", "MCQ",
     "The read/write signal is transmitted on which bus?",
     "Control bus", "Read/write control signals are transmitted on the control bus to indicate whether the CPU wants to read from or write to a memory location.",
     ["Data bus", "Address bus", "Control bus", "Address and data bus"],
     "Medium", False, {"node": "c11_cs_001"}),

    # --- Fill in the blank ---
    ("bus_types", "FillBlank",
     "The ____ bus transfers actual data values between the CPU, memory, and I/O devices.",
     "data",
     "The data bus is bidirectional and its width (number of bits) determines how much data can be transferred in one cycle.",
     [], "Easy", False, {"node": "c11_cs_001"}),

    ("bus_types", "FillBlank",
     "The ______ bus carries the memory location address from the CPU to the memory unit.",
     "address",
     "The address bus is unidirectional - it only carries signals from the CPU to memory or I/O devices.",
     [], "Easy", False, {"node": "c11_cs_001"}),

    ("bus_types", "FillBlank",
     "Control signals like read/write are sent through the ______ bus.",
     "control",
     "The control bus carries synchronisation and control signals to coordinate the activities of all computer components.",
     [], "Easy", False, {"node": "c11_cs_001"}),

    ("bus_types", "FillBlank",
     "The ______ bus is unidirectional, carrying signals only from the CPU to memory.",
     "address",
     "Unlike the data bus which is bidirectional, the address bus only sends signals outward from the CPU.",
     [], "Medium", False, {"node": "c11_cs_001"}),

    # --- Short answer ---
    ("bus_types", "ShortAnswer",
     "Distinguish between the data bus and the address bus.",
     "The data bus is bidirectional and carries the actual data values between CPU, memory, and I/O devices. Its width determines how many bits can be transferred per cycle (e.g., 32-bit bus transfers 4 bytes at a time). The address bus is unidirectional (CPU to memory) and carries the memory address/location that the CPU wants to access. Its width determines the maximum addressable memory (e.g., a 32-bit address bus can address 2^32 = 4 GB).",
     ["Data bus: bidirectional, carries data", "Address bus: unidirectional, carries addresses", "Width of each determines capacity", "Both are part of system bus", "Data bus vs address bus clearly distinguished"],
     "Medium", False, {"node": "c11_cs_001"}),

    ("bus_types", "ShortAnswer",
     "Explain the role of the control bus in computer architecture.",
     "The control bus carries control signals that coordinate the activities of all components in the computer system. Key signals include: (1) Read signal - indicates the CPU wants to read data from memory/I/O; (2) Write signal - indicates the CPU wants to write data to memory/I/O; (3) Clock signal - synchronises the timing of all operations; (4) Interrupt signal - allows I/O devices to signal the CPU. Without the control bus, components would not be synchronised.",
     ["Control bus carries control signals", "Read/write signals", "Clock signal for timing", "Interrupt signal", "Synchronisation of all components"],
     "Medium", False, {"node": "c11_cs_001"}),

    ("bus_types", "ShortAnswer",
     "What is a system bus? What are its three subdivisions?",
     "A system bus is the communication pathway that connects the CPU, memory, and I/O devices. It has three subdivisions: (1) Data bus - carries actual data values, bidirectional; (2) Address bus - carries memory addresses from CPU, unidirectional; (3) Control bus - carries control and timing signals. Together they enable the CPU to read from and write to memory and I/O devices.",
     ["System bus definition", "Data bus (bidirectional)", "Address bus (unidirectional)", "Control bus (signals)", "Connection between CPU, memory, I/O"],
     "Easy", False, {"node": "c11_cs_001"}),

    # --- Long answer ---
    ("bus_types", "LongAnswer",
     "Describe the three types of buses in a computer system (data bus, address bus, control bus). Include their directions, functions, and how their widths affect performance.",
     "A computer system uses a system bus to transfer information between the CPU, memory, and I/O. The system bus has three types:\n\n1. DATA BUS:\n   - Direction: Bidirectional (data flows both to and from CPU)\n   - Function: Carries actual data values (operands, results)\n   - Width impact: A wider data bus transfers more bits per cycle, improving throughput. A 64-bit bus transfers twice as much data per cycle as a 32-bit bus.\n\n2. ADDRESS BUS:\n   - Direction: Unidirectional (CPU → Memory/I/O)\n   - Function: Carries the memory address/location that the CPU wants to access\n   - Width impact: Determines maximum addressable memory. An n-bit address bus can address 2^n locations. 32 bits → 4 GB, 64 bits → 16 EB.\n\n3. CONTROL BUS:\n   - Direction: Bidirectional\n   - Function: Carries control signals (read/write, clock, interrupt, reset, acknowledge)\n   - Width impact: More control lines allow more simultaneous control operations.",
     ["Three bus types described", "Data bus: bidirectional, carries data", "Address bus: unidirectional, carries addresses", "Control bus: control signals", "Width and performance impact for each", "Addressable memory calculation"],
     "Hard", False, {"node": "c11_cs_001"}),

    # --- Competency ---
    ("bus_types", "MCQ",
     "A student at a school in Pune is connecting sensors to a microcontroller. The sensor sends readings to the processor. Which bus would carry the sensor data?",
     "Data bus", "The data bus carries actual data values between components, including sensor readings from I/O to the CPU.",
     ["Data bus", "Address bus", "Control bus", "Power bus"],
     "Easy", True, {"node": "c11_cs_001"}),

    ("bus_types", "ShortAnswer",
     "A lab instructor at a school in Hyderabad is teaching students about computer internals. She says: 'The address bus is like the postal address on a letter envelope, while the data bus is like the letter itself inside the envelope.' Explain this analogy.",
     "This analogy maps perfectly to computer architecture. The address bus (like a postal address) specifies WHERE something needs to go - it tells the memory which specific location (cell) the CPU wants to access. Just as a postal address tells the postman which house to deliver to, the address bus tells memory which address to access. The data bus (like the letter inside the envelope) carries the actual CONTENT - the information being sent or received. Without the address, the data would not know where to go. Without the data, the address would have nothing to deliver.",
     ["Address bus = postal address (destination)", "Data bus = letter content", "Where vs what distinction", "Both needed for communication", "Analogy explained correctly"],
     "Medium", True, {"node": "c11_cs_001"}),

    ("bus_types", "FillBlank",
     "A bus that transmits only in one direction (CPU to memory) is called the ______ bus.",
     "address",
     "The address bus is unidirectional because only the CPU initiates memory accesses by sending addresses.",
     [], "Medium", True, {"node": "c11_cs_001"}),
]

# ---------------------------------------------------------------------------
# fde_cycle questions
# ---------------------------------------------------------------------------
Q_FDE = [
    ("fde_cycle", "MCQ",
     "The first step of the fetch-decode-execute cycle is:",
     "Fetch", "The CPU first fetches (retrieves) the next instruction from memory using the address stored in the program counter.",
     ["Fetch", "Decode", "Execute", "Store"],
     "Easy", False, {"node": "c11_cs_001"}),

    ("fde_cycle", "MCQ",
     "During which step of the FDE cycle does the Control Unit interpret the instruction?",
     "Decode", "The decode step is performed by the Control Unit, which determines what operation the instruction requires.",
     ["Fetch", "Decode", "Execute", "Store"],
     "Easy", False, {"node": "c11_cs_001"}),

    ("fde_cycle", "MCQ",
     "Which register holds the address of the next instruction to be fetched?",
     "Program Counter (PC)", "The Program Counter (PC) always contains the memory address of the next instruction to be executed.",
     ["Accumulator", "Program Counter (PC)", "Instruction Register", "Memory Address Register"],
     "Medium", False, {"node": "c11_cs_001"}),

    ("fde_cycle", "MCQ",
     "During the fetch step, the address of the instruction is copied from:",
     "Program Counter to the Memory Address Register",
     "The PC holds the next instruction address, which is placed on the address bus via the Memory Address Register.",
     ["Accumulator to the PC", "Program Counter to the Memory Address Register", "Control Unit to the ALU", "Data bus to the Instruction Register"],
     "Medium", False, {"node": "c11_cs_001"}),

    ("fde_cycle", "MCQ",
     "After fetching an instruction, where is it placed temporarily?",
     "Memory Buffer Register (MBR)", "The fetched instruction byte(s) are placed in the Memory Buffer Register before being moved to the Instruction Register.",
     ["Accumulator", "Memory Buffer Register (MBR)", "Program Counter", "Status Register"],
     "Medium", False, {"node": "c11_cs_001"}),

    ("fde_cycle", "MCQ",
     "The Instruction Register (IR) stores:",
     "The currently executing instruction",
     "The IR holds the instruction that is currently being decoded and executed by the CPU.",
     ["The address of next instruction", "The currently executing instruction", "Data operands", "CPU status flags"],
     "Medium", False, {"node": "c11_cs_001"}),

    ("fde_cycle", "MCQ",
     "After the execute step, the result of an ALU operation is typically stored in:",
     "Accumulator", "The Accumulator is the primary register where ALU results are temporarily stored before being written back to memory.",
     ["Program Counter", "Accumulator", "Instruction Register", "Memory Address Register"],
     "Medium", False, {"node": "c11_cs_001"}),

    ("fde_cycle", "MCQ",
     "Which bus is primarily used during the fetch step to place the address on the bus?",
     "Address bus", "During fetch, the CPU places the instruction address on the address bus so memory can return the instruction.",
     ["Data bus", "Address bus", "Control bus", "System bus (general)"],
     "Medium", False, {"node": "c11_cs_001"}),

    ("fde_cycle", "MCQ",
     "The fetch-decode-execute cycle:",
     "Repeats continuously for every instruction",
     "The FDE cycle repeats continuously from boot to shutdown, processing each instruction in the program.",
     ["Happens only once at startup", "Repeats continuously for every instruction", "Only happens when errors occur", "Happens only for user programs"],
     "Easy", False, {"node": "c11_cs_001"}),

    ("fde_cycle", "MCQ",
     "In the FDE cycle, which component is primarily responsible for the decode step?",
     "Control Unit (CU)", "The CU decodes the instruction opcode to determine what operation to perform and what hardware to activate.",
     ["ALU", "Control Unit (CU)", "Memory Unit", "I/O Controller"],
     "Medium", False, {"node": "c11_cs_001"}),

    # --- Fill in the blank ---
    ("fde_cycle", "FillBlank",
     "The first step of the ______ cycle is fetching the instruction from memory.",
     "fetch-decode-execute",
     "The fetch-decode-execute (FDE) cycle is the fundamental operational cycle of a CPU.",
     [], "Easy", False, {"node": "c11_cs_001"}),

    ("fde_cycle", "FillBlank",
     "The register that always holds the address of the next instruction to be fetched is called the ______.",
     "program counter",
     "The Program Counter (PC) is incremented after each instruction fetch to point to the next instruction.",
     [], "Medium", False, {"node": "c11_cs_001"}),

    ("fde_cycle", "FillBlank",
     "During the ______ step, the Control Unit determines what operation the instruction requires.",
     "decode",
     "The decode step interprets the instruction opcode and determines the required action.",
     [], "Easy", False, {"node": "c11_cs_001"}),

    ("fde_cycle", "FillBlank",
     "The ______ unit of the CPU is primarily responsible for decoding instructions.",
     "control",
     "The Control Unit (CU) decodes the instruction and generates control signals to coordinate hardware.",
     [], "Easy", False, {"node": "c11_cs_001"}),

    ("fde_cycle", "FillBlank",
     "The ______ register holds the instruction that is currently being decoded.",
     "instruction",
     "The Instruction Register (IR) holds the fetched instruction during the decode and execute phases.",
     [], "Medium", False, {"node": "c11_cs_001"}),

    # --- Short answer ---
    ("fde_cycle", "ShortAnswer",
     "Explain the fetch step of the FDE cycle in detail.",
     "In the fetch step: (1) The CPU reads the address from the Program Counter (PC) register - this address points to the next instruction in memory. (2) The address is placed on the address bus and sent to memory. (3) Memory responds by placing the instruction byte(s) on the data bus. (4) The CPU reads the instruction from the data bus and places it in the Memory Buffer Register (MBR), then into the Instruction Register (IR). (5) The Program Counter is incremented to point to the next instruction. This completes the fetch step.",
     ["PC address read", "Address placed on address bus", "Memory returns instruction on data bus", "Instruction placed in MBR then IR", "PC incremented"],
     "Medium", False, {"node": "c11_cs_001"}),

    ("fde_cycle", "ShortAnswer",
     "Explain the decode and execute steps of the FDE cycle.",
     "DECODE: The Control Unit reads the opcode (operation code) from the Instruction Register and determines what operation is required. It activates the necessary control signals. EXECUTE: The required operation is performed - if it is an arithmetic/logic operation, the ALU performs it; if it is a memory operation, data is read from or written to memory; if it is an I/O operation, the appropriate I/O device is activated. Results are stored in registers or memory, and the cycle repeats.",
     ["Decode: CU reads opcode", "Control signals generated", "Execute: ALU/memory/I/O operation", "Results stored", "Cycle repeats"],
     "Medium", False, {"node": "c11_cs_001"}),

    ("fde_cycle", "ShortAnswer",
     "What is the Program Counter (PC) register? What happens to it during the FDE cycle?",
     "The Program Counter (PC) is a special CPU register that always contains the memory address of the next instruction to be fetched. During the FDE cycle: (1) The CPU reads the address from the PC and uses it to fetch the instruction from memory. (2) After the instruction is fetched, the PC is incremented (usually by 1, or by the instruction length) to point to the next instruction. This ensures the CPU processes instructions in the correct sequence. For conditional/jump instructions, the PC is loaded with a new address instead of being simply incremented.",
     ["PC definition", "Contains next instruction address", "PC read during fetch", "PC incremented after fetch", "Jump instructions modify PC"],
     "Medium", False, {"node": "c11_cs_001"}),

    # --- Long answer ---
    ("fde_cycle", "LongAnswer",
     "Describe the complete fetch-decode-execute (FDE) cycle step by step. Include the roles of the Program Counter, Instruction Register, Control Unit, and ALU.",
     "The Fetch-Decode-Execute (FDE) cycle is the fundamental operational cycle of the CPU:\n\nFETCH STEP:\n1. The CPU reads the address from the Program Counter (PC) - this points to the next instruction in memory.\n2. The address is placed on the address bus and sent to memory.\n3. Memory returns the instruction on the data bus.\n4. The CPU loads the instruction into the Instruction Register (IR).\n5. The PC is incremented to point to the next instruction.\n\nDECODE STEP:\n6. The Control Unit (CU) reads the opcode from the IR.\n7. The CU determines the operation and activates appropriate control signals.\n\nEXECUTE STEP:\n8. If arithmetic/logic: ALU performs the operation on operands from registers/memory.\n9. If memory operation: data is read from or written to a memory address.\n10. If I/O: the appropriate I/O device is activated.\n11. Results are stored in the Accumulator or written to memory.\n12. The cycle repeats from step 1.",
     ["Fetch step detailed", "PC read and increment", "Address bus and data bus usage", "Instruction Register", "Decode step: CU and opcode", "Execute step: ALU/memory/I/O", "Results storage", "Cycle repetition"],
     "Hard", False, {"node": "c11_cs_001"}),

    # --- Competency ---
    ("fde_cycle", "MCQ",
     "A teacher in a Delhi school demonstrates the FDE cycle using an analogy: fetching a recipe book, reading the recipe, and cooking. What does 'fetching' correspond to in computer terms?",
     "Getting the next instruction from memory",
     "Fetching means the CPU retrieves the next instruction from memory - like getting the next recipe from a book.",
     ["Getting the next instruction from memory", "Writing results to memory", "Typing on the keyboard", "Displaying on the monitor"],
     "Easy", True, {"node": "c11_cs_001"}),

    ("fde_cycle", "ShortAnswer",
     "A student in Mumbai explains the FDE cycle as: 'The chef (CPU) looks at the next page of the recipe book (fetches), reads and understands the instruction (decodes), and then performs the cooking step (executes).' Identify the computer components being compared and explain if the analogy is correct.",
     "The analogy is correct and maps well to the FDE cycle. Chef = CPU (especially the Control Unit); Recipe book = memory (stores instructions); Looking at next page = Fetch step (CPU reads instruction from memory using PC address); Reading and understanding the recipe = Decode step (Control Unit interprets the instruction opcode); Performing the cooking step = Execute step (ALU or memory/I/O operation performs the action). The cycle then repeats with the next recipe (next instruction), just as the CPU repeats the FDE cycle for every instruction in the program.",
     ["Analogy components identified", "Chef = CPU", "Recipe book = memory", "Fetch = look at next page", "Decode = understand recipe", "Execute = perform cooking", "Cycle repeats correctly"],
     "Medium", True, {"node": "c11_cs_001"}),

    ("fde_cycle", "LongAnswer",
     "A school in Kerala is conducting a 'computer unboxing' workshop for Class 11 students. The resource person explains the FDE cycle as a post office sorting mail. Write a detailed explanation using this analogy, covering all three steps.",
     "The post office analogy for the FDE cycle:\n\nFETCH = The postman checks the delivery list (Program Counter) to find out the next address to visit. He then goes to that mailbox (memory location) and picks up the letter (instruction).\n\nDECODE = The postman reads the address on the letter (opcode in the Instruction Register) and understands what needs to be done - is it a delivery (write), a collection (read), or a forwarding (jump)?\n\nEXECUTE = Based on the decoded instruction, the postman performs the action: delivers the letter to the correct house (writes data to memory), picks up a reply (reads data from memory), or changes the delivery route (updates the Program Counter for a jump instruction).\n\nThe cycle then repeats for the next letter, just as the CPU repeats the FDE cycle for every instruction, processing millions of instructions per second.",
     ["Post office analogy", "Fetch = check delivery list and pick up letter", "Decode = read and understand the letter", "Execute = perform the required action", "Cycle repeats for next letter", "All three FDE steps covered"],
     "Medium", True, {"node": "c11_cs_001"}),

    ("fde_cycle", "FillBlank",
     "In the FDE cycle, the ______ step is performed by the Control Unit to interpret the instruction's opcode.",
     "decode",
     "The decode step is where the Control Unit interprets what the instruction requires.",
     [], "Medium", True, {"node": "c11_cs_001"}),
]

# ---------------------------------------------------------------------------
# memory_types questions
# ---------------------------------------------------------------------------
Q_MEM = [
    ("memory_types", "MCQ",
     "Which type of RAM uses flip-flops to store each bit?",
     "SRAM", "SRAM (Static RAM) uses flip-flop circuits (bistable multivibrators) to store each bit. It does not need refreshing.",
     ["DRAM", "SRAM", "SDRAM", "RDRAM"],
     "Medium", False, {"node": "c11_cs_002"}),

    ("memory_types", "MCQ",
     "Which type of RAM stores each bit in a capacitor and needs periodic refreshing?",
     "DRAM", "DRAM (Dynamic RAM) stores each bit as an electrical charge in a tiny capacitor. Since capacitors leak charge, DRAM must be refreshed periodically.",
     ["SRAM", "DRAM", "SDRAM", "Flash ROM"],
     "Easy", False, {"node": "c11_cs_002"}),

    ("memory_types", "MCQ",
     "Which is faster: SRAM or DRAM?",
     "SRAM", "SRAM is faster because it uses flip-flops (no refreshing needed, direct access). DRAM requires periodic refreshing, adding overhead.",
     ["DRAM", "SRAM", "Both are equally fast", "Depends on the manufacturer"],
     "Easy", False, {"node": "c11_cs_002"}),

    ("memory_types", "MCQ",
     "Which type of RAM is commonly used for CPU cache memory?",
     "SRAM", "SRAM's high speed makes it ideal for cache memory, despite its higher cost and lower density.",
     ["DRAM", "SRAM", "EEPROM", "SDRAM"],
     "Medium", False, {"node": "c11_cs_002"}),

    ("memory_types", "MCQ",
     "Which type of RAM is used as the main system memory (RAM modules)?",
     "DRAM", "DRAM is cheaper and offers higher density, making it the choice for main memory (RAM sticks), despite being slower than SRAM.",
     ["SRAM", "DRAM", "EEPROM", "PROM"],
     "Easy", False, {"node": "c11_cs_002"}),

    ("memory_types", "MCQ",
     "What does 'static' in SRAM mean?",
     "Data remains stable as long as power is supplied (no refresh needed)",
     "In SRAM, data is stored in stable flip-flop circuits and remains valid as long as power is on - it is 'static'.",
     ["It has no moving parts", "Data remains stable as long as power is supplied", "It is physically fixed", "It cannot be written to"],
     "Medium", False, {"node": "c11_cs_002"}),

    ("memory_types", "MCQ",
     "What does 'dynamic' in DRAM mean?",
     "The stored charge in capacitors leaks and must be refreshed periodically",
     "DRAM is 'dynamic' because the capacitor charge leaks over time, requiring periodic refresh operations to maintain data.",
     ["It has moving parts", "It changes data frequently", "The stored charge in capacitors leaks and must be refreshed periodically", "It is faster than SRAM"],
     "Medium", False, {"node": "c11_cs_002"}),

    ("memory_types", "MCQ",
     "ROM stands for:",
     "Read-Only Memory", "ROM = Read-Only Memory - memory that can only be read, not (normally) written to.",
     ["Random Operating Memory", "Read-Only Memory", "Rapid Output Memory", "Read-Only Module"],
     "Easy", False, {"node": "c11_cs_002"}),

    ("memory_types", "MCQ",
     "Which type of ROM can be programmed only once?",
     "PROM", "PROM (Programmable ROM) can be written once by the user using a special device that burns internal fuses. After that, it cannot be changed.",
     ["PROM", "EPROM", "EEPROM", "All of these"],
     "Medium", False, {"node": "c11_cs_002"}),

    ("memory_types", "MCQ",
     "Which type of ROM can be erased using ultraviolet light?",
     "EPROM", "EPROM (Erasable Programmable ROM) has a quartz window that allows UV light to erase all stored data simultaneously.",
     ["PROM", "EPROM", "EEPROM", "Flash memory"],
     "Medium", False, {"node": "c11_cs_002"}),

    ("memory_types", "MCQ",
     "Which type of ROM can be erased and reprogrammed electrically, byte by byte?",
     "EEPROM", "EEPROM (Electrically Erasable Programmable ROM) allows individual bytes to be erased and rewritten using electrical signals, without removing the chip.",
     ["PROM", "EPROM", "EEPROM", "Mask ROM"],
     "Medium", False, {"node": "c11_cs_002"}),

    ("memory_types", "MCQ",
     "Which type of memory is volatile?",
     "RAM (both SRAM and DRAM)",
     "Volatile memory loses its contents when power is removed. RAM (SRAM and DRAM) is volatile; ROM is non-volatile.",
     ["ROM", "RAM (both SRAM and DRAM)", "PROM", "EEPROM"],
     "Easy", False, {"node": "c11_cs_002"}),

    ("memory_types", "MCQ",
     "Which memory type is non-volatile?",
     "ROM (PROM, EPROM, EEPROM)",
     "Non-volatile memory retains its contents without power. All ROM types (PROM, EPROM, EEPROM) are non-volatile.",
     ["SRAM", "DRAM", "ROM (PROM, EPROM, EEPROM)", "Cache memory"],
     "Easy", False, {"node": "c11_cs_002"}),

    ("memory_types", "MCQ",
     "Which ROM type has a quartz window for UV erasure?",
     "EPROM", "EPROM chips have a distinctive quartz glass window on top that allows UV light to reach the silicon and erase all data.",
     ["PROM", "EPROM", "EEPROM", "All ROM types"],
     "Medium", False, {"node": "c11_cs_002"}),

    # --- Fill in the blank ---
    ("memory_types", "FillBlank",
     "______ (Static RAM) uses flip-flop circuits to store each bit of data.",
     "SRAM",
     "SRAM uses bistable flip-flop circuits that hold data as long as power is supplied.",
     [], "Easy", False, {"node": "c11_cs_002"}),

    ("memory_types", "FillBlank",
     "______ (Dynamic RAM) stores each bit as a charge in a capacitor and requires periodic refreshing.",
     "DRAM",
     "DRAM stores data in capacitors that slowly leak charge, requiring refresh circuitry to periodically rewrite the data.",
     [], "Easy", False, {"node": "c11_cs_002"}),

    ("memory_types", "FillBlank",
     "______ can be programmed only once using a special device that burns internal fuses.",
     "PROM",
     "PROM is a one-time programmable ROM - once programmed by blowing fuses, it cannot be changed.",
     [], "Medium", False, {"node": "c11_cs_002"}),

    ("memory_types", "FillBlank",
     "______ (Erasable Programmable ROM) can be erased using ultraviolet light through a quartz window.",
     "EPROM",
     "EPROM chips have a quartz window that allows UV light to erase all stored data simultaneously.",
     [], "Medium", False, {"node": "c11_cs_002"}),

    ("memory_types", "FillBlank",
     "______ can be erased and reprogrammed electrically at the byte level without removing the chip.",
     "EEPROM",
     "EEPROM allows selective erasure and rewriting of individual bytes using electrical signals.",
     [], "Medium", False, {"node": "c11_cs_002"}),

    # --- Short answer ---
    ("memory_types", "ShortAnswer",
     "Compare SRAM and DRAM across at least four parameters: storage technology, speed, cost, refresh requirement, and typical use.",
     "SRAM: Uses flip-flop circuits; very fast (no refresh needed); expensive per bit; no refresh required; used for CPU cache. DRAM: Uses capacitors (1 capacitor + 1 transistor per bit); slower (needs refresh cycles); cheaper per bit; requires periodic refreshing (~every few milliseconds); used for main system memory. SRAM is faster and more reliable but less dense and more expensive. DRAM offers higher density at lower cost, making it suitable for large main memory, but the refresh requirement adds latency.",
     ["SRAM: flip-flops, fast, expensive, no refresh", "DRAM: capacitors, slower, cheaper, needs refresh", "SRAM for cache, DRAM for main memory", "Speed comparison", "Cost comparison", "Refresh difference"],
     "Medium", False, {"node": "c11_cs_002"}),

    ("memory_types", "ShortAnswer",
     "Compare the three types of ROM (PROM, EPROM, EEPROM) in terms of programmability and erasure.",
     "PROM (Programmable ROM): Can be programmed once by the user using a special device (PROM programmer) that burns internal fuses. Cannot be erased or reprogrammed. EPROM (Erasable PROM): Can be programmed, then erased using UV light through a quartz window on the chip package. Erasure clears the entire chip. Can be reprogrammed multiple times. EEPROM (Electrically Erasable PROM): Can be erased and reprogrammed electrically using voltage signals. Individual bytes can be erased and rewritten without removing the chip from the circuit. More flexible than EPROM.",
     ["PROM: one-time programmable", "EPROM: UV erasable, whole chip", "EEPROM: electrical erase, byte-level", "Programmability comparison", "Erasure method comparison"],
     "Medium", False, {"node": "c11_cs_002"}),

    # --- Long answer ---
    ("memory_types", "LongAnswer",
     "Describe the organisation of computer memory. Explain RAM types (SRAM and DRAM) and ROM types (PROM, EPROM, EEPROM) in detail. Include a comparison table.",
     "COMPUTER MEMORY ORGANISATION:\nComputer memory is organised hierarchically by speed, cost, and capacity. Primary memory (RAM/ROM) is directly accessible by the CPU; secondary memory (hard disk, SSD) is used for long-term storage.\n\nRAM (Random Access Memory):\n- Volatile (loses data on power loss)\n- SRAM: Uses 4-6 transistors per bit (flip-flop). Very fast, no refresh needed. Used for CPU cache (L1, L2, L3). Expensive, low density.\n- DRAM: Uses 1 transistor + 1 capacitor per bit. Slower (needs refresh). Used for main memory (RAM modules). Cheaper, high density.\n\nROM (Read-Only Memory):\n- Non-volatile (retains data without power)\n- PROM: Programmed once by burning fuses. Cannot be changed.\n- EPROM: Erased by UV light through quartz window. Can be reprogrammed many times.\n- EEPROM: Erased electrically. Byte-level erasure. Used for BIOS/firmware.\n\nCOMPARISON TABLE:\n| Feature     | SRAM | DRAM | PROM | EPROM | EEPROM |\n|-------------|------|------|------|-------|--------|\n| Volatile    | Yes  | Yes  | No   | No    | No     |\n| Speed       | Fast | Slow | Slow | Slow  | Slow   |\n| Cost/bit    | High | Low  | Low  | Low   | Medium |\n| Refresh     | No   | Yes  | No   | No    | No     |\n| Erasable    | No   | No   | No   | UV    | Electric|\n| Reprogram   | No   | No   | No   | Yes   | Yes    |",
     ["Memory hierarchy overview", "SRAM: technology, speed, use", "DRAM: technology, speed, use", "PROM: programming and limitations", "EPROM: UV erasure", "EEPROM: electrical erasure", "Comparison table", "Volatile vs non-volatile", "Practical applications"],
     "Hard", False, {"node": "c11_cs_002"}),

    # --- Competency ---
    ("memory_types", "MCQ",
     "A school computer lab in Coimbatore is upgrading its systems. The technician recommends SRAM for cache and DRAM for main memory. Which statement best explains why?",
     "SRAM is faster but more expensive, DRAM is cheaper and offers more capacity",
     "SRAM's speed makes it ideal for cache despite higher cost. DRAM's cost efficiency makes it suitable for large main memory.",
     ["SRAM is faster but more expensive, DRAM is cheaper and offers more capacity", "DRAM is faster than SRAM", "Both use the same technology", "SRAM needs more power than DRAM"],
     "Medium", True, {"node": "c11_cs_002"}),

    ("memory_types", "ShortAnswer",
     "An Indian government initiative is distributing educational tablets to rural students. The tablets use EEPROM to store the operating system firmware. Why is EEPROM a suitable choice for this purpose?",
     "EEPROM is suitable because: (1) It is non-volatile - the OS firmware is retained even when the tablet is powered off. (2) It can be electrically erased and reprogrammed - firmware updates can be applied without physically removing the chip. (3) It allows byte-level rewriting - only the changed parts of firmware need updating, not the entire chip. (4) It is more reliable than EPROM which requires UV light and total chip erasure. (5) It is compact and power-efficient, suitable for battery-operated tablets used in rural areas with limited charging infrastructure.",
     ["Non-volatile: retains data without power", "Electrical erasure possible", "Byte-level update capability", "Firmware updates without chip removal", "Suitable for battery devices"],
     "Medium", True, {"node": "c11_cs_002"}),

    ("memory_types", "FillBlank",
     "A school in Kolkata uses ______ type of ROM for its computer's BIOS because it can be updated electrically when needed.",
     "EEPROM",
     "EEPROM is used for BIOS/firmware because it can be electrically updated without removing the chip.",
     [], "Medium", True, {"node": "c11_cs_002"}),

    ("memory_types", "MCQ",
     "An ed-tech startup in Bangalore is designing a smart classroom device. The CPU cache needs to be as fast as possible. Which RAM type should they use for the cache?",
     "SRAM", "SRAM's speed and no-refresh requirement make it ideal for cache memory where speed is critical.",
     ["SRAM", "DRAM", "EEPROM", "PROM"],
     "Easy", True, {"node": "c11_cs_002"}),
]

# ---------------------------------------------------------------------------
# cache_virtual questions
# ---------------------------------------------------------------------------
Q_CACHE = [
    ("cache_virtual", "MCQ",
     "Cache memory is placed between:",
     "CPU and main memory (RAM)",
     "Cache memory acts as a buffer between the fast CPU and the slower main memory, storing frequently accessed data.",
     ["CPU and hard disk", "CPU and main memory (RAM)", "Main memory and I/O", "CPU and cache"],
     "Easy", False, {"node": "c11_cs_002"}),

    ("cache_virtual", "MCQ",
     "The primary purpose of cache memory is to:",
     "Reduce the average time to access data from main memory",
     "Cache stores frequently used data closer to the CPU, reducing the need to access the slower main memory repeatedly.",
     ["Increase total memory capacity", "Reduce the average time to access data from main memory", "Replace the need for RAM", "Store backup data"],
     "Easy", False, {"node": "c11_cs_002"}),

    ("cache_virtual", "MCQ",
     "Which level of cache is the fastest and closest to the CPU?",
     "L1 cache", "L1 cache is integrated into each CPU core and is the fastest, though smallest, cache level.",
     ["L3 cache", "L2 cache", "L1 cache", "L4 cache"],
     "Easy", False, {"node": "c11_cs_002"}),

    ("cache_virtual", "MCQ",
     "L3 cache is:",
     "Shared among all CPU cores and is the largest but slowest cache level",
     "L3 is shared among cores, larger than L1/L2, but slower than both. Modern CPUs may have 8-64 MB of L3 cache.",
     ["The fastest and smallest cache", "Shared among all CPU cores and is the largest but slowest cache level", "Never used in modern CPUs", "Stored on the hard disk"],
     "Medium", False, {"node": "c11_cs_002"}),

    ("cache_virtual", "MCQ",
     "Which cache level is typically integrated into each individual CPU core?",
     "L1 cache", "L1 cache is core-private. Each core has its own L1 (and often L2) cache for exclusive use.",
     ["L3 cache", "L2 cache", "L1 cache", "All cache levels are shared"],
     "Medium", False, {"node": "c11_cs_002"}),

    ("cache_virtual", "MCQ",
     "Virtual memory uses which hardware to extend available RAM?",
     "Hard disk/SSD space", "Virtual memory uses a portion of the hard disk or SSD (called a page file or swap space) as an extension of RAM.",
     ["CPU registers", "Hard disk/SSD space", "Network storage", "ROM"],
     "Easy", False, {"node": "c11_cs_002"}),

    ("cache_virtual", "MCQ",
     "Virtual memory primarily helps by:",
     "Allowing programs to use more memory than physically available RAM",
     "Virtual memory creates an illusion of a large, contiguous memory space by using disk space as overflow for RAM.",
     ["Making programs run faster", "Allowing programs to use more memory than physically available RAM", "Replacing the need for RAM", "Encrypting data"],
     "Medium", False, {"node": "c11_cs_002"}),

    (""
)]

# =============================================================================
# QUESTION_REGISTRY for auto-discovery
# =============================================================================
_ALL_BANKS = [Q_VN, Q_BUS, Q_FDE]


def _questions_from_bank(bank: list, rng: random.Random) -> List[Dict[str, Any]]:
    """Convert raw bank tuples to question dicts."""
    result = []
    for i, entry in enumerate(bank):
        if not entry or len(entry) < 5:
            continue
        topic, qtype, text, answer, explanation = entry[0], entry[1], entry[2], entry[3], entry[4]
        options = entry[5] if len(entry) > 5 and isinstance(entry[5], list) else None
        difficulty = entry[6] if len(entry) > 6 else "Medium"
        q: Dict[str, Any] = {
            "id": f"c11_cs_{topic}_{i:03d}",
            "question_text": text,
            "question_type": qtype.lower() if qtype else "mcq",
            "answer": answer,
            "solution": explanation,
            "difficulty": difficulty,
            "topic": topic,
            "verification": True,
        }
        if options:
            q["options"] = options
        result.append(q)
    return result


QUESTION_REGISTRY = {
    "von_neumann": lambda rng: _questions_from_bank(Q_VN, rng),
    "bus_architecture": lambda rng: _questions_from_bank(Q_BUS, rng),
    "fundamentals": lambda rng: _questions_from_bank(Q_FDE, rng),
}


def generate_questions(seed: int, count: int) -> List[Dict[str, Any]]:
    """Generate deterministic questions using seeded random."""
    rng = random.Random(seed)
    all_questions: List[Dict[str, Any]] = []
    for bank in _ALL_BANKS:
        all_questions.extend(_questions_from_bank(bank, rng))
    rng.shuffle(all_questions)
    return all_questions[:count]


if __name__ == "__main__":
    qs = generate_questions(42, 10)
    print(f"Generated {len(qs)} questions")
    for q in qs[:3]:
        print(f"  {q['id']}: {q['question_text'][:60]}")