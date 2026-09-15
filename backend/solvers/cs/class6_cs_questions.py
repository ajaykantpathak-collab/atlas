import random
import math
import hashlib
import json
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Optional, Any

# ─────────────────────────────────────────────────────────────
# Data structures
# ─────────────────────────────────────────────────────────────
@dataclass
class Question:
    id: str
    node_id: str
    section: str
    topic: str
    difficulty: str
    competency: str
    spiral_topic: str
    q_type: str          # mcq | fib | tf | match
    text: str
    options: List[str] = field(default_factory=list)
    answer: Any = None
    explanation: str = ""
    cognitive_level: str = "Understand"
    exam_relevance: str = "Board_Only"
    exam_weightage: str = "Medium"

    def to_dict(self) -> dict:
        d = asdict(self)
        return d

# ─────────────────────────────────────────────────────────────
# Deterministic Seeded RNG helper
# ─────────────────────────────────────────────────────────────
class SeededRandom:
    """Wraps Python's random with a deterministic seed derived from a string."""
    def __init__(self, seed_value: int = 42):
        self._rng = random.Random(seed_value)

    def seed_from(self, key: str):
        h = hashlib.sha256(key.encode()).hexdigest()
        val = int(h[:12], 16)
        self._rng.seed(val)

    def choice(self, seq):
        return self._rng.choice(seq)

    def shuffle(self, seq):
        self._rng.shuffle(seq)
        return seq

    def randint(self, lo, hi):
        return self._rng.randint(lo, hi)

    def sample(self, pop, k):
        return self._rng.sample(pop, k)


# ─────────────────────────────────────────────────────────────
# Question bank templates
# ─────────────────────────────────────────────────────────────
_QUESTION_BANK: Dict[str, Dict] = {}

def _init_bank():
    global _QUESTION_BANK
    _QUESTION_BANK = {

        # ── NODE c6_cs_001 ──────────────────────────────────
        # Categories of computers
        "c6cs001_mcq_01": dict(
            node_id="c6_cs_001", section="Categories of Computer and Computer Languages",
            topic="Categories of computers - micro, mini, mainframe, supercomputer",
            difficulty="Medium", competency="Board", spiral_topic="computer-fundamentals",
            q_type="mcq",
            text="Which type of computer is used by a single person at home or school?",
            options=["Minicomputer", "Mainframe", "Microcomputer", "Supercomputer"],
            answer=2,
            explanation="A microcomputer (personal computer / laptop) is designed for individual use.",
        ),
        "c6cs001_mcq_02": dict(
            node_id="c6_cs_001", section="Categories of Computer and Computer Languages",
            topic="Categories of computers - micro, mini, mainframe, supercomputer",
            difficulty="Medium", competency="Board", spiral_topic="computer-fundamentals",
            q_type="mcq",
            text="A computer used by a bank for processing transactions of thousands of customers simultaneously is most likely a:",
            options=["Microcomputer", "Minicomputer", "Mainframe", "Supercomputer"],
            answer=2,
            explanation="Mainframes are large-scale computers used by banks and airlines for processing massive amounts of data simultaneously.",
        ),
        "c6cs001_mcq_03": dict(
            node_id="c6_cs_001", section="Categories of Computer and Computer Languages",
            topic="Categories of computers - micro, mini, mainframe, supercomputer",
            difficulty="Medium", competency="Board", spiral_topic="computer-fundamentals",
            q_type="mcq",
            text="Which category of computer is used for weather forecasting and space research?",
            options=["Microcomputer", "Minicomputer", "Mainframe", "Supercomputer"],
            answer=3,
            explanation="Supercomputers are the fastest and most powerful computers, used for scientific research and weather forecasting.",
        ),
        "c6cs001_mcq_04": dict(
            node_id="c6_cs_001", section="Categories of Computer and Computer Languages",
            topic="Categories of computers - micro, mini, mainframe, supercomputer",
            difficulty="Medium", competency="Board", spiral_topic="computer-fundamentals",
            q_type="mcq",
            text="Arrange the four categories of computers in increasing order of processing power:",
            options=[
                "Microcomputer < Minicomputer < Mainframe < Supercomputer",
                "Supercomputer < Mainframe < Minicomputer < Microcomputer",
                "Minicomputer < Microcomputer < Mainframe < Supercomputer",
                "Microcomputer < Mainframe < Minicomputer < Supercomputer",
            ],
            answer=0,
            explanation="Processing power increases from microcomputer (PC) → minicomputer (server) → mainframe (large organisation) → supercomputer (scientific research).",
        ),
        "c6cs001_mcq_05": dict(
            node_id="c6_cs_001", section="Categories of Computer and Computer Languages",
            topic="Categories of computers - micro, mini, mainframe, supercomputer",
            difficulty="Easy", competency="Board", spiral_topic="computer-fundamentals",
            q_type="mcq",
            text="Which of the following is an example of a microcomputer?",
            options=["Server rack in a data centre", "Desktop PC", "Airline booking system", "CRAY supercomputer"],
            answer=1,
            explanation="A desktop PC or laptop is a microcomputer — designed for individual use.",
        ),
        "c6cs001_tf_01": dict(
            node_id="c6_cs_001", section="Categories of Computer and Computer Languages",
            topic="Categories of computers - micro, mini, mainframe, supercomputer",
            difficulty="Medium", competency="Board", spiral_topic="computer-fundamentals",
            q_type="tf",
            text="A mainframe computer can be used simultaneously by hundreds of users.",
            answer=True,
            explanation="Mainframes support hundreds of users at the same time, making them ideal for large organisations like banks.",
        ),
        "c6cs001_tf_02": dict(
            node_id="c6_cs_001", section="Categories of Computer and Computer Languages",
            topic="Categories of computers - micro, mini, mainframe, supercomputer",
            difficulty="Easy", competency="Board", spiral_topic="computer-fundamentals",
            q_type="tf",
            text="A microcomputer is the largest and most powerful category of computer.",
            answer=False,
            explanation="A microcomputer is the smallest and least powerful category; a supercomputer is the largest and most powerful.",
        ),
        "c6cs001_fib_01": dict(
            node_id="c6_cs_001", section="Categories of Computer and Computer Languages",
            topic="Categories of computers - micro, mini, mainframe, supercomputer",
            difficulty="Medium", competency="Board", spiral_topic="computer-fundamentals",
            q_type="fib",
            text="A __________ is the fastest type of computer used for weather forecasting and scientific research.",
            answer="supercomputer",
            explanation="Supercomputers perform billions of calculations per second and are used for scientific research.",
        ),
        "c6cs001_fib_02": dict(
            node_id="c6_cs_001", section="Categories of Computer and Computer Languages",
            topic="Categories of computers - micro, mini, mainframe, supercomputer",
            difficulty="Easy", competency="Board", spiral_topic="computer-fundamentals",
            q_type="fib",
            text="A __________ is a computer designed for use by a single person (e.g., a desktop PC or laptop).",
            answer="microcomputer",
            explanation="Microcomputers are personal computers meant for individual use.",
        ),

        # ── NODE c6_cs_002 ──────────────────────────────────
        # Computer languages
        "c6cs002_mcq_01": dict(
            node_id="c6_cs_002", section="Categories of Computer and Computer Languages",
            topic="Computer languages - machine, assembly, high-level languages",
            difficulty="Hard", competency="Board", spiral_topic="programming",
            q_type="mcq",
            text="Which type of computer language uses only the digits 0 and 1?",
            options=["Assembly Language", "High-Level Language", "Machine Language", "Natural Language"],
            answer=2,
            explanation="Machine language consists of binary code — only 0s and 1s — which the CPU understands directly.",
        ),
        "c6cs002_mcq_02": dict(
            node_id="c6_cs_002", section="Categories of Computer and Computer Languages",
            topic="Computer languages - machine, assembly, high-level languages",
            difficulty="Medium", competency="Board", spiral_topic="programming",
            q_type="mcq",
            text="Assembly language uses short codes called:",
            options=["Keywords", "Mnemonics", "Variables", "Constants"],
            answer=1,
            explanation="Assembly language uses mnemonic codes such as ADD, SUB, and MOV to represent machine instructions.",
        ),
        "c6cs002_mcq_03": dict(
            node_id="c6_cs_002", section="Categories of Computer and Computer Languages",
            topic="Computer languages - machine, assembly, high-level languages",
            difficulty="Easy", competency="Board", spiral_topic="programming",
            q_type="mcq",
            text="Which of the following is a high-level programming language?",
            options=["Binary", "Assembly", "Python", "Machine code"],
            answer=2,
            explanation="Python is a high-level language with English-like syntax that is easy for humans to read and write.",
        ),
        "c6cs002_mcq_04": dict(
            node_id="c6_cs_002", section="Categories of Computer and Computer Languages",
            topic="Computer languages - machine, assembly, high-level languages",
            difficulty="Hard", competency="Board", spiral_topic="programming",
            q_type="mcq",
            text="Which statement about high-level languages is TRUE?",
            options=[
                "They are directly executed by the CPU without translation",
                "They use only 0s and 1s",
                "They are portable across different types of computers",
                "They use mnemonic codes like ADD and MOV",
            ],
            answer=2,
            explanation="High-level languages are portable — the same program can run on different computers after translation.",
        ),
        "c6cs002_mcq_05": dict(
            node_id="c6_cs_002", section="Categories of Computer and Computer Languages",
            topic="Computer languages - machine, assembly, high-level languages",
            difficulty="Medium", competency="Board", spiral_topic="programming",
            q_type="mcq",
            text="Arrange computer languages in order from easiest for humans to hardest for humans:",
            options=[
                "Machine < Assembly < High-Level",
                "High-Level < Assembly < Machine",
                "Assembly < Machine < High-Level",
                "High-Level < Machine < Assembly",
            ],
            answer=1,
            explanation="High-level (English-like) is easiest for humans; Assembly (mnemonics) is medium; Machine (binary) is hardest.",
        ),
        "c6cs002_tf_01": dict(
            node_id="c6_cs_002", section="Categories of Computer and Computer Languages",
            topic="Computer languages - machine, assembly, high-level languages",
            difficulty="Medium", competency="Board", spiral_topic="programming",
            q_type="tf",
            text="Assembly language uses mnemonic codes like ADD, SUB, and MOV.",
            answer=True,
            explanation="Assembly language replaces binary with short, readable codes called mnemonics (e.g., ADD, MOV, SUB).",
        ),
        "c6cs002_tf_02": dict(
            node_id="c6_cs_002", section="Categories of Computer and Computer Languages",
            topic="Computer languages - machine, assembly, high-level languages",
            difficulty="Easy", competency="Board", spiral_topic="programming",
            q_type="tf",
            text="A CPU can directly understand and execute a program written in Python.",
            answer=False,
            explanation="The CPU only understands machine language (binary). A translator (compiler or interpreter) converts Python to machine code first.",
        ),
        "c6cs002_fib_01": dict(
            node_id="c6_cs_002", section="Categories of Computer and Computer Languages",
            topic="Computer languages - machine, assembly, high-level languages",
            difficulty="Medium", competency="Board", spiral_topic="programming",
            q_type="fib",
            text="The only language that the CPU understands directly is __________.",
            answer="machine language",
            explanation="The CPU executes instructions only in machine language, which is binary code made of 0s and 1s.",
        ),
        "c6cs002_fib_02": dict(
            node_id="c6_cs_002", section="Categories of Computer and Computer Languages",
            topic="Computer languages - machine, assembly, high-level languages",
            difficulty="Easy", competency="Board", spiral_topic="programming",
            q_type="fib",
            text="__________ language uses short codes called mnemonics such as ADD and MOV.",
            answer="assembly",
            explanation="Assembly language uses mnemonic codes that are easier for humans to read than raw binary.",
        ),

        # ── NODE c6_cs_003 ──────────────────────────────────
        # Translators - compiler, interpreter, assembler
        "c6cs003_mcq_01": dict(
            node_id="c6_cs_003", section="Categories of Computer and Computer Languages",
            topic="Translators - compiler, interpreter, assembler",
            difficulty="Medium", competency="Board", spiral_topic="programming",
            q_type="mcq",
            text="Which translator converts the entire high-level program into machine code at once before execution?",
            options=["Interpreter", "Assembler", "Compiler", "Loader"],
            answer=2,
            explanation="A compiler translates the complete source program into machine code (an .exe file) before the program runs.",
        ),
        "c6cs003_mcq_02": dict(
            node_id="c6_cs_003", section="Categories of Computer and Computer Languages",
            topic="Translators - compiler, interpreter, assembler",
            difficulty="Medium", competency="Board", spiral_topic="programming",
            q_type="mcq",
            text="Which translator converts assembly language programs into machine code?",
            options=["Compiler", "Interpreter", "Assembler", "Linker"],
            answer=2,
            explanation="An assembler converts assembly language (with mnemonics) into machine code (binary) that the CPU can execute.",
        ),
        "c6cs003_mcq_03": dict(
            node_id="c6_cs_003", section="Categories of Computer and Computer Languages",
            topic="Translators - compiler, interpreter, assembler",
            difficulty="Hard", competency="Board", spiral_topic="programming",
            q_type="mcq",
            text="Which of the following is a key difference between a compiler and an interpreter?",
            options=[
                "A compiler translates line-by-line; an interpreter translates the whole program",
                "An interpreter translates line-by-line; a compiler translates the whole program",
                "Both translate the whole program at once",
                "Neither translates the program — they just execute it",
            ],
            answer=1,
            explanation="An interpreter translates and executes one line at a time; a compiler translates the entire program before execution.",
        ),
        "c6cs003_mcq_04": dict(
            node_id="c6_cs_003", section="Categories of Computer and Computer Languages",
            topic="Translators - compiler, interpreter, assembler",
            difficulty="Easy", competency="Board", spiral_topic="programming",
            q_type="mcq",
            text="Which translator is used for converting programs written in assembly language?",
            options=["Compiler", "Interpreter", "Assembler", "Debugger"],
            answer=2,
            explanation="An assembler is specifically designed to translate assembly language programs into machine code.",
        ),
        "c6cs003_tf_01": dict(
            node_id="c6_cs_003", section="Categories of Computer and Computer Languages",
            topic="Translators - compiler, interpreter, assembler",
            difficulty="Medium", competency="Board", spiral_topic="programming",
            q_type="tf",
            text="An interpreter translates the entire program before execution begins.",
            answer=False,
            explanation="An interpreter translates and executes the program line-by-line, not all at once. A compiler translates the entire program first.",
        ),
        "c6cs003_tf_02": dict(
            node_id="c6_cs_003", section="Categories of Computer and Computer Languages",
            topic="Translators - compiler, interpreter, assembler",
            difficulty="Easy", competency="Board", spiral_topic="programming",
            q_type="tf",
            text="An assembler is used to convert machine code into assembly language.",
            answer=False,
            explanation="An assembler converts assembly language INTO machine code, not the other way around.",
        ),
        "c6cs003_fib_01": dict(
            node_id="c6_cs_003", section="Categories of Computer and Computer Languages",
            topic="Translators - compiler, interpreter, assembler",
            difficulty="Medium", competency="Board", spiral_topic="programming",
            q_type="fib",
            text="A __________ converts the entire high-level program into machine code before execution.",
            answer="compiler",
            explanation="A compiler translates all source code at once and produces an executable machine-code file.",
        ),
        "c6cs003_fib_02": dict(
            node_id="c6_cs_003", section="Categories of Computer and Computer Languages",
            topic="Translators - compiler, interpreter, assembler",
            difficulty="Medium", competency="Board", spiral_topic="programming",
            q_type="fib",
            text="An __________ converts assembly language programs containing mnemonics into machine code.",
            answer="assembler",
            explanation="The assembler takes mnemonics like ADD, MOV and converts them to binary machine instructions.",
        ),

        # ── NODE c6_cs_004 (Data representation) ────────────
        "c6cs004_mcq_01": dict(
            node_id="c6_cs_004", section="Data Representation",
            topic="Number systems - decimal, binary, octal, hexadecimal",
            difficulty="Medium", competency="Board", spiral_topic="data-representation",
            q_type="mcq",
            text="The binary number system uses how many distinct digits?",
            options=["2", "8", "10", "16"],
            answer=0,
            explanation="The binary system is base-2, using only the digits 0 and 1.",
        ),
        "c6cs004_mcq_02": dict(
            node_id="c6_cs_004", section="Data Representation",
            topic="Number systems - decimal, binary, octal, hexadecimal",
            difficulty="Hard", competency="Board", spiral_topic="data-representation",
            q_type="mcq",
            text="What is the decimal equivalent of the binary number 1010?",
            options=["8", "9", "10", "11"],
            answer=2,
            explanation="1010₂ = 1×2³ + 0×2² + 1×2¹ + 0×2⁰ = 8+0+2+0 = 10₁₀.",
        ),
        "c6cs004_mcq_03": dict(
            node_id="c6_cs_004", section="Data Representation",
            topic="Number systems - decimal, binary, octal, hexadecimal",
            difficulty="Easy", competency="Board", spiral_topic="data-representation",
            q_type="mcq",
            text="Which number system does the computer use internally?",
            options=["Decimal", "Binary", "Roman", "Hexadecimal"],
            answer=1,
            explanation="Computers store and process all data in binary (base-2) because electronic circuits have two states: on (1) and off (0).",
        ),
        "c6cs004_mcq_04": dict(
            node_id="c6_cs_004", section="Data Representation",
            topic="Number systems - decimal, binary, octal, hexadecimal",
            difficulty="Medium", competency="Board", spiral_topic="data-representation",
            q_type="mcq",
            text="In the hexadecimal system, how many different symbols are used?",
            options=["8", "10", "12", "16"],
            answer=3,
            explanation="Hexadecimal is base-16, using digits 0–9 and letters A–F (total 16 symbols).",
        ),
        "c6cs004_tf_01": dict(
            node_id="c6_cs_004", section="Data Representation",
            topic="Number systems - decimal, binary, octal, hexadecimal",
            difficulty="Easy", competency="Board", spiral_topic="data-representation",
            q_type="tf",
            text="The decimal number system uses 10 digits (0 to 9).",
            answer=True,
            explanation="The decimal system is base-10 and uses the digits 0 through 9.",
        ),
        "c6cs004_tf_02": dict(
            node_id="c6_cs_004", section="Data Representation",
            topic="Number systems - decimal, binary, octal, hexadecimal",
            difficulty="Medium", competency="Board", spiral_topic="data-representation",
            q_type="tf",
            text="The binary equivalent of decimal 5 is 100.",
            answer=False,
            explanation="5 in binary is 101 (4+0+1), not 100.",
        ),
        "c6cs004_fib_01": dict(
            node_id="c6_cs_004", section="Data Representation",
            topic="Number systems - decimal, binary, octal, hexadecimal",
            difficulty="Medium", competency="Board", spiral_topic="data-representation",
            q_type="fib",
            text="The number system with base 2 is called the __________ system.",
            answer="binary",
            explanation="Binary is the base-2 number system that computers use internally.",
        ),
        "c6cs004_fib_02": dict(
            node_id="c6_cs_004", section="Data Representation",
            topic="Number systems - decimal, binary, octal, hexadecimal",
            difficulty="Medium", competency="Board", spiral_topic="data-representation",
            q_type="fib",
            text="The decimal equivalent of binary 1101 is __________.",
            answer="13",
            explanation="1101₂ = 1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8+4+0+1 = 13.",
        ),
    }


# ─────────────────────────────────────────────────────────────
# Node metadata
# ─────────────────────────────────────────────────────────────
_NODE_META: Dict[str, Dict] = {
    "c6_cs_001": {
        "name": "Categories of computers",
        "section": "Categories of Computer and Computer Languages",
        "topic": "Categories of computers - micro, mini, mainframe, supercomputer",
        "difficulty": "Medium",
        "competency": "Board",
        "spiral_topic": "computer-fundamentals",
    },
    "c6_cs_002": {
        "name": "Computer languages",
        "section": "Categories of Computer and Computer Languages",
        "topic": "Computer languages - machine, assembly, high-level languages",
        "difficulty": "Hard",
        "competency": "Board",
        "spiral_topic": "programming",
    },
    "c6_cs_003": {
        "name": "Translators",
        "section": "Categories of Computer and Computer Languages",
        "topic": "Translators - compiler, interpreter, assembler",
        "difficulty": "Medium",
        "competency": "Board",
        "spiral_topic": "programming",
    },
    "c6_cs_004": {
        "name": "Data Representation",
        "section": "Data Representation",
        "topic": "Number systems - decimal, binary, octal, hexadecimal",
        "difficulty": "Medium",
        "competency": "Board",
        "spiral_topic": "data-representation",
    },
}

# Map bank key prefixes → node_id
_KEY_NODE_MAP: Dict[str, str] = {
    "c6cs001": "c6_cs_001",
    "c6cs002": "c6_cs_002",
    "c6cs003": "c6_cs_003",
    "c6cs004": "c6_cs_004",
}

# Difficulty order for sorting
_DIFF_ORDER = {"Easy": 0, "Medium": 1, "Hard": 2}

# ─────────────────────────────────────────────────────────────
# Question Generator
# ─────────────────────────────────────────────────────────────
class QuestionGenerator:
    """
    Deterministic question generator for ICSE Computer Studies Class 6.
    All randomness is controlled by a seed string so that the same
    (seed, node_id, count, q_type, difficulty) tuple always produces
    the same ordered list of questions.
    """

    def __init__(self, seed: int = 42):
        self._rng = SeededRandom(seed)
        _init_bank()
        self._bank = _QUESTION_BANK
        self._node_meta = _NODE_META
        self._key_node_map = _KEY_NODE_MAP
        self._generated_log: List[str] = []

    # ── helpers ─────────────────────────────────────────────
    @staticmethod
    def _node_of(key: str) -> Optional[str]:
        for prefix, nid in _KEY_NODE_MAP.items():
            if key.startswith(prefix):
                return nid
        return None

    def _filter_keys(self, node_id: str, q_type: Optional[str],
                     difficulty: Optional[str]) -> List[str]:
        """Return bank keys matching the given filters."""
        keys = []
        for k, v in self._bank.items():
            nid = self._node_of(k)
            if nid != node_id:
                continue
            if q_type and v["q_type"] != q_type:
                continue
            if difficulty and v["difficulty"] != difficulty:
                continue
            keys.append(k)
        return keys

    @staticmethod
    def _make_question(bank_key: str, data: Dict) -> Question:
        meta = _NODE_META.get(data["node_id"], {})
        return Question(
            id=bank_key,
            node_id=data["node_id"],
            section=data.get("section", meta.get("section", "")),
            topic=data.get("topic", meta.get("topic", "")),
            difficulty=data.get("difficulty", "Medium"),
            competency=data.get("competency", "Board"),
            spiral_topic=data.get("spiral_topic", ""),
            q_type=data["q_type"],
            text=data["text"],
            options=data.get("options", []),
            answer=data.get("answer"),
            explanation=data.get("explanation", ""),
            cognitive_level="Understand",
            exam_relevance="Board_Only",
            exam_weightage="Medium",
        )

    # ── public API ──────────────────────────────────────────
    def generate(self, seed_key: str, node_id: str, count: int = 5,
                 q_type: Optional[str] = None,
                 difficulty: Optional[str] = None) -> List[Question]:
        """
        Generate `count` questions for `node_id`, optionally filtered
        by q_type and difficulty.

        Parameters
        ----------
        seed_key   : arbitrary string that seeds the RNG for this call.
        node_id    : e.g. 'c6_cs_001'
        count      : number of questions to return (0 → all matching).
        q_type     : 'mcq', 'fib', 'tf', or None for any.
        difficulty : 'Easy', 'Medium', 'Hard', or None for any.

        Returns
        -------
        List[Question] — always the same for the same (seed_key, node_id, …).
        """
        keys = self._filter_keys(node_id, q_type, difficulty)
        if not keys:
            return []

        self._rng.seed_from(seed_key)
        self._rng.shuffle(keys)

        n = count if count > 0 else len(keys)
        selected = keys[:n]

        questions = []
        for k in selected:
            q = self._make_question(k, self._bank[k])
            questions.append(q)
            self._generated_log.append(k)

        return questions

    def generate_all(self, seed_key: str, count_per_node: int = 4,
                     q_type: Optional[str] = None) -> List[Question]:
        """Generate questions across ALL registered nodes."""
        all_q: List[Question] = []
        for nid in self._node_meta:
            qs = self.generate(
                seed_key=f"{seed_key}::{nid}",
                node_id=nid,
                count=count_per_node,
                q_type=q_type,
            )
            all_q.extend(qs)
        return all_q

    def generate_mixed(self, seed_key: str, total: int = 10,
                       difficulty: Optional[str] = None) -> List[Question]:
        """Generate `total` questions drawn uniformly from all nodes."""
        all_keys: List[str] = []
        for nid in self._node_meta:
            all_keys.extend(self._filter_keys(nid, None, difficulty))

        if not all_keys:
            return []

        self._rng.seed_from(seed_key)
        self._rng.shuffle(all_keys)
        selected = all_keys[:total]

        return [self._make_question(k, self._bank[k]) for k in selected]

    def node_coverage(self) -> Dict[str, List[str]]:
        """Return {node_id: [list of question bank keys]} for that node."""
        cov: Dict[str, List[str]] = {nid: [] for nid in self._node_meta}
        for k in self._bank:
            nid = self._node_of(k)
            if nid and nid in cov:
                cov[nid].append(k)
        return cov

    def available_types(self, node_id: str) -> List[str]:
        types = {self._bank[k]["q_type"] for k in self._filter_keys(node_id)}
        return sorted(types)

    def verify(self, questions: List[Question]) -> Dict[str, Any]:
        """Verify every question has a non-None answer."""
        results: Dict[str, Any] = {"total": len(questions), "passed": 0, "failed": []}
        for q in questions:
            if q.answer is not None and str(q.answer).strip() != "":
                results["passed"] += 1
            else:
                results["failed"].append(q.id)
        return results

    def stats(self) -> Dict[str, Any]:
        """Return bank statistics."""
        by_node: Dict[str, int] = {}
        by_type: Dict[str, int] = {}
        by_diff: Dict[str, int] = {}
        for k, v in self._bank.items():
            nid = self._node_of(k)
            by_node[nid] = by_node.get(nid, 0) + 1
            by_type[v["q_type"]] = by_type.get(v["q_type"], 0) + 1
            by_diff[v["difficulty"]] = by_diff.get(v["difficulty"], 0) + 1
        return {"total": len(self._bank), "by_node": by_node, "by_type": by_type, "by_difficulty": by_diff}

    def print_questions(self, questions: List[Question]) -> None:
        """Pretty-print questions."""
        type_labels = {"mcq": "Multiple Choice", "fib": "Fill in the Blanks", "tf": "True / False", "match": "Matching"}
        for i, q in enumerate(questions, 1):
            print(f"\n{'─'*60}")
            print(f"  Q{i}  [{q.id}]  ({q.node_id})")
            print(f"  Section : {q.section}")
            print(f"  Topic   : {q.topic}")
            print(f"  Type    : {type_labels.get(q.q_type, q.q_type)}")
            print(f"  Level   : {q.difficulty}  |  Competency: {q.competency}")
            print(f"  Q       : {q.text}")
            if q.options:
                for idx, opt in enumerate(q.options):
                    print(f"           [{idx}] {opt}")
            if q.q_type == "tf":
                print(f"  Answer  : {'True' if q.answer else 'False'}")
            elif q.q_type == "fib":
                print(f"  Answer  : {q.answer}")
            else:
                print(f"  Answer  : {q.answer}")
            print(f"  Why     : {q.explanation}")


# ─────────────────────────────────────────────────────────────
# Step-by-step verification harness
# ─────────────────────────────────────────────────────────────
def step_by_step_verify(gen: QuestionGenerator, seed: str = "icse-class6") -> None:
    print("=" * 60)
    print("  STEP-BY-STEP VERIFICATION  —  ICSE Class 6 CS Questions")
    print("=" * 60)

    # Step 1 – bank stats
    stats = gen.stats()
    print(f"\n[Step 1] Bank statistics:")
    print(f"  Total templates   : {stats['total']}")
    print(f"  By node           : {json.dumps(stats['by_node'], indent=4)}")
    print(f"  By question type  : {json.dumps(stats['by_type'], indent=4)}")
    print(f"  By difficulty     : {json.dumps(stats['by_difficulty'], indent=4)}")

    # Step 2 – per-node MCQ generation
    print(f"\n[Step 2] Generate 2 MCQ questions per node:")
    for nid in gen._node_meta:
        qs = gen.generate(seed_key=f"{seed}::mcq::{nid}", node_id=nid, count=2, q_type="mcq")
        v = gen.verify(qs)
        status = "PASS" if v["failed"] == [] else "FAIL"
        print(f"  {nid:12s} → {len(qs)} questions  verify={status}")

    # Step 3 – fill-in-the-blanks
    print(f"\n[Step 3] Generate 1 FIB question per node:")
    for nid in gen._node_meta:
        qs = gen.generate(seed_key=f"{seed}::fib::{nid}", node_id=nid, count=1, q_type="fib")
        v = gen.verify(qs)
        status = "PASS" if v["failed"] == [] else "FAIL"
        print(f"  {nid:12s} → {len(qs)} questions  verify={status}")

    # Step 4 – true/false
    print(f"\n[Step 4] Generate 1 T/F question per node:")
    for nid in gen._node_meta:
        qs = gen.generate(seed_key=f"{seed}::tf::{nid}", node_id=nid, count=1, q_type="tf")
        v = gen.verify(qs)
        status = "PASS" if v["failed"] == [] else "FAIL"
        print(f"  {nid:12s} → {len(qs)} questions  verify={status}")

    # Step 5 – mixed difficulty
    print(f"\n[Step 5] Generate 4 mixed questions per node (all types):")
    for nid in gen._node_meta:
        qs = gen.generate(seed_key=f"{seed}::mixed::{nid}", node_id=nid, count=4)
        v = gen.verify(qs)
        status = "PASS" if v["failed"] == [] else "FAIL"
        print(f"  {nid:12s} → {len(qs)} questions  verify={status}")

    # Step 6 – cross-node mixed
    print(f"\n[Step 6] Generate 6 cross-node mixed questions:")
    mixed = gen.generate_mixed(seed_key=f"{seed}::cross", total=6)
    v = gen.verify(mixed)
    status = "PASS" if v["failed"] == [] else "FAIL"
    print(f"  Total={v['total']}  Passed={v['passed']}  Failed={v['failed']}  → {status}")

    # Step 7 – coverage report
    print(f"\n[Step 7] Question bank coverage per node:")
    cov = gen.node_coverage()
    for nid, keys in cov.items():
        meta = gen._node_meta[nid]
        print(f"  {nid:12s} ({meta['name']:30s}) → {len(keys):2d} questions")

    # Step 8 – determinism check
    print(f"\n[Step 8] Determinism check (same seed → identical output):")
    qs_a = gen.generate(seed_key=f"{seed}::detcheck", node_id="c6_cs_001", count=3)
    qs_b = gen.generate(seed_key=f"{seed}::detcheck", node_id="c6_cs_001", count=3)
    det_ok = all(a.id == b.id for a, b in zip(qs_a, qs_b))
    print(f"  Run A IDs : {[q.id for q in qs_a]}")
    print(f"  Run B IDs : {[q.id for q in qs_b]}")
    print(f"  Deterministic: {'PASS ✓' if det_ok else 'FAIL ✗'}")

    print(f"\n{'=' * 60}")
    print("  ALL VERIFICATION STEPS COMPLETE")
    print(f"{'=' * 60}\n")


# ─────────────────────────────────────────────────────────────
# Main – sample output
# ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    gen = QuestionGenerator(seed=2024)

    # Run step-by-step verification
    step_by_step_verify(gen, seed="icse-class6-2024")

    # ── Sample question sheets ──────────────────────────────
    print("┌─────────────────────────────────────────────────────┐")
    print("│   ICSE Class 6 — Computer Studies Practice Paper    │")
    print("│   Generated deterministically (seed=icse-class6)     │")
    print("└─────────────────────────────────────────────────────┘\n")

    # Sheet A: MCQ only, all nodes
    print(">>> Sheet A: Multiple Choice Questions (MCQ)\n")
    for nid in gen._node_meta:
        meta = gen._node_meta[nid]
        qs = gen.generate(
            seed_key=f"sheet-a::{nid}",
            node_id=nid, count=2, q_type="mcq"
        )
        print(f"  [{nid}] {meta['name']}")
        for q in qs:
            print(f"    Q [{q.id}]  {q.text}")
            for idx, opt in enumerate(q.options):
                marker = "✓" if idx == q.answer else " "
                print(f"         [{marker}] {idx}. {opt}")
            print(f"    Explanation: {q.explanation}\n")

    # Sheet B: Fill-in-the-blanks
    print("\n>>> Sheet B: Fill in the Blanks (FIB)\n")
    for nid in gen._node_meta:
        meta = gen._node_meta[nid]
        qs = gen.generate(
            seed_key=f"sheet-b::{nid}",
            node_id=nid, count=1, q_type="fib"
        )
        for q in qs:
            print(f"  [{nid}] {meta['name']}")
            print(f"    Q [{q.id}]  {q.text}")
            print(f"    Answer : {q.answer}")
            print(f"    Reason : {q.explanation}\n")

    # Sheet C: True / False
    print("\n>>> Sheet C: True / False (T/F)\n")
    for nid in gen._node_meta:
        meta = gen._node_meta[nid]
        qs = gen.generate(
            seed_key=f"sheet-c::{nid}",
            node_id=nid, count=1, q_type="tf"
        )
        for q in qs:
            print(f"  [{nid}] {meta['name']}")
            print(f"    Q [{q.id}]  {q.text}")
            print(f"    Answer : {'True' if q.answer else 'False'}")
            print(f"    Reason : {q.explanation}\n")

    # Sheet D: Mixed practice test
    print("\n>>> Sheet D: Mixed Practice Test (6 questions)\n")
    mixed = gen.generate_mixed(seed_key="sheet-d::test", total=6)
    gen.print_questions(mixed)

    # ── Export JSON ──────────────────────────────────────────
    print("\n\n>>> JSON Export (first 3 mixed questions):\n")
    export = gen.generate_mixed(seed_key="export::sample", total=3)
    for q in export:
        print(json.dumps(q.to_dict(), indent=2, ensure_ascii=False))

    # ── Difficulty-filtered sheet ───────────────────────────
    print("\n\n>>> Sheet E: Easy-only questions (all nodes)\n")
    for nid in gen._node_meta:
        meta = gen._node_meta[nid]
        qs = gen.generate(
            seed_key=f"sheet-e::{nid}",
            node_id=nid, count=2, difficulty="Easy"
        )
        if qs:
            print(f"  [{nid}] {meta['name']}")
            for q in qs:
                print(f"    [{q.id} ({q.q_type})] {q.text}")
                if q.options:
                    for idx, opt in enumerate(q.options):
                        m = "✓" if idx == q.answer else " "
                        print(f"         [{m}] {idx}. {opt}")
                print(f"    Ans: {q.answer}\n")