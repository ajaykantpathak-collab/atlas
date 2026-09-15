"""
Class 7 Computer Studies – Solver (2 nodes)
Deterministic, no LLM in computation. Uses SymPy, scipy, numpy, math, random, dataclasses.
"""
from __future__ import annotations

import random
import hashlib
import math
from dataclasses import dataclass, field
from typing import List, Dict, Tuple, Optional
from enum import Enum

# ---------------------------------------------------------------------------
# Seeded random for deterministic question generation
# ---------------------------------------------------------------------------

def make_rng(seed: int | str) -> random.Random:
    """Return a Random instance keyed from a string or int seed."""
    if isinstance(seed, str):
        seed = int(hashlib.sha256(seed.encode()).hexdigest()[:12], 16)
    return random.Random(seed)


# ---------------------------------------------------------------------------
# Data models
# ---------------------------------------------------------------------------

class DifficultyLevel(Enum):
    EASY = "Easy"
    MEDIUM = "Medium"
    HARD = "Hard"


class CognitiveLevel(Enum):
    REMEMBER = "Remember"
    UNDERSTAND = "Understand"
    APPLY = "Apply"
    ANALYZE = "Analyze"


class OptionLabel(Enum):
    A = "A"
    B = "B"
    C = "C"
    D = "D"


@dataclass
class Question:
    id: str
    node_id: str
    topic: str
    question_text: str
    options: Dict[str, str]           # {"A": ..., "B": ..., "C": ..., "D": ...}
    correct_answer: str               # "A" | "B" | "C" | "D"
    explanation: str
    difficulty: str
    cognitive_level: str
    marks: int = 1
    skill_tested: str = ""


@dataclass
class GenerationConfig:
    seed: int = 42
    num_questions: int = 6
    difficulty_override: str | None = None   # "Easy" | "Medium" | "Hard" | None
    topic_filter: str | None = None           # e.g. "c7_cs_001"


# ===================================================================
# NODE 1 – Internal Hardware (c7_cs_001)
# ===================================================================

class InternalHardwareSolver:
    """
    Encapsulates all domain knowledge for internal hardware components
    and produces / verifies MCQ answers.
    """

    COMPONENTS: Dict[str, Dict] = {
        "motherboard": {
            "short_name": "Motherboard",
            "full_name": "Motherboard",
            "definition": (
                "The main circuit board of a computer that connects and "
                "provides communication pathways between all internal hardware "
                "components such as the CPU, RAM, ROM, and GPU."
            ),
            "analogy": "backbone of the computer",
            "category": "connecting platform",
            "volatile": None,
            "stores_boot_instructions": False,
            "processes_instructions": False,
            "processes_graphics": False,
            "location": "inside the computer case",
        },
        "cpu": {
            "short_name": "CPU",
            "full_name": "Central Processing Unit (CPU)",
            "definition": (
                "The central processing unit is the primary processor that "
                "executes instructions, performs calculations, and manages the "
                "flow of data within the computer."
            ),
            "analogy": "brain of the computer",
            "category": "processing unit",
            "volatile": None,
            "stores_boot_instructions": False,
            "processes_instructions": True,
            "processes_graphics": False,
            "location": "inside the computer case",
        },
        "ram": {
            "short_name": "RAM",
            "full_name": "Random Access Memory (RAM)",
            "definition": (
                "RAM is the temporary, volatile working memory of the "
                "computer. It stores data and instructions that the CPU needs "
                "while the computer is running, but all data is lost when the "
                "power is switched off."
            ),
            "analogy": "short-term memory",
            "category": "memory (volatile)",
            "volatile": True,
            "stores_boot_instructions": False,
            "processes_instructions": False,
            "processes_graphics": False,
            "location": "inside the computer case",
        },
        "rom": {
            "short_name": "ROM",
            "full_name": "Read Only Memory (ROM)",
            "definition": (
                "ROM is the permanent, non-volatile memory that stores the "
                "computer's boot instructions (firmware/BIOS). The data "
                "remains stored even when the computer is powered off."
            ),
            "analogy": "permanent memory",
            "category": "memory (non-volatile)",
            "volatile": False,
            "stores_boot_instructions": True,
            "processes_instructions": False,
            "processes_graphics": False,
            "location": "inside the computer case",
        },
        "gpu": {
            "short_name": "GPU",
            "full_name": "Graphics Processing Unit (GPU)",
            "definition": (
                "The GPU is a specialised processor designed to handle and "
                "render images, video, and graphical content on the screen."
            ),
            "analogy": "artist of the computer",
            "category": "graphics processor",
            "volatile": None,
            "stores_boot_instructions": False,
            "processes_instructions": False,
            "processes_graphics": True,
            "location": "inside the computer case",
        },
    }

    # Distractor pools for MCQ generation
    _DISTRACTORS = {
        "component": ["Keyboard", "Monitor", "Scanner", "Printer",
                      "Hard Disk", "USB Drive", "CD-ROM", "Mouse"],
        "volatile_answer": ["non-volatile", "permanent", "semi-volatile"],
        "non_volatile_answer": ["volatile", "temporary", "semi-permanent"],
        "location": ["outside the computer case", "on the desk",
                     "connected via a cable externally"],
        "analogy": ["heart", "lungs", "muscles", "nervous system"],
    }

    # ------------------------------------------------------------------
    # Verification helpers
    # ------------------------------------------------------------------

    @staticmethod
    def is_volatile(component_key: str) -> Optional[bool]:
        info = InternalHardwareSolver.COMPONENTS.get(component_key, {})
        return info.get("volatile")

    @staticmethod
    def get_analogy(component_key: str) -> str:
        return InternalHardwareSolver.COMPONENTS.get(
            component_key, {}).get("analogy", "")

    @staticmethod
    def get_definition(component_key: str) -> str:
        return InternalHardwareSolver.COMPONENTS.get(
            component_key, {}).get("definition", "")

    @staticmethod
    def verify_answer(component_key: str, property_name: str,
                      proposed_value) -> bool:
        info = InternalHardwareSolver.COMPONENTS.get(component_key, {})
        actual = info.get(property_name)
        if actual is None:
            return False
        if isinstance(actual, bool):
            return bool(proposed_value) == actual
        return str(proposed_value).lower() == str(actual).lower()

    # ------------------------------------------------------------------
    # Question generators – each returns a Question
    # ------------------------------------------------------------------

    def _make_mcq(self, rng: random.Random, qid: str, node_id: str,
                  prompt: str, correct: str, distractors: List[str],
                  explanation: str, difficulty: str,
                  cognitive_level: str, skill: str, marks: int = 1) -> Question:
        labels = [l.value for l in OptionLabel]
        choices = [correct] + rng.sample(distractors, k=3)
        rng.shuffle(choices)
        correct_label = labels[choices.index(correct)]
        options = dict(zip(labels, choices))
        return Question(
            id=qid, node_id=node_id, topic="Internal Hardware",
            question_text=prompt, options=options,
            correct_answer=correct_label, explanation=explanation,
            difficulty=difficulty, cognitive_level=cognitive_level,
            marks=marks, skill_tested=skill,
        )

    # Q1 – identify component from definition (Understand)
    def gen_identify_component(self, rng: random.Random, node_id: str,
                               component_key: str, difficulty: str) -> Question:
        comp = self.COMPONENTS[component_key]
        distractors = rng.sample(
            [v["short_name"] for k, v in self.COMPONENTS.items()
             if k != component_key], k=3)
        prompt = (f"Which internal hardware component is described as: "
                  f"'{comp['definition']}'")
        explanation = (
            f"The description matches '{comp['full_name']}'. "
            f"It is often called the '{comp['analogy']}' of the computer."
        )
        return self._make_mcq(
            rng, f"c7_cs_001_q_identify_{component_key}", node_id,
            prompt, comp["short_name"], distractors, explanation,
            difficulty, CognitiveLevel.UNDERSTAND.value,
            "Identify component from function")

    # Q2 – analogy matching (Remember)
    def gen_analogy(self, rng: random.Random, node_id: str,
                    component_key: str, difficulty: str) -> Question:
        comp = self.COMPONENTS[component_key]
        other_analogies = [
            v["analogy"] for k, v in self.COMPONENTS.items() if k != component_key
        ]
        distractors = rng.sample(other_analogies, k=min(3, len(other_analogies)))
        extra = rng.sample(self._DISTRACTORS["analogy"], k=3)
        distractors = list(set(distractors + extra))[:3]
        prompt = (f"Which component is known as the '{comp['analogy']}' "
                  f"of the computer?")
        explanation = (
            f"'{comp['full_name']}' is called the '{comp['analogy']}' "
            f"because it performs the key function of a {comp['analogy'].split()[0]} "
            f"— it {comp['definition'][:60].lower()}..."
        )
        return self._make_mcq(
            rng, f"c7_cs_001_q_analogy_{component_key}", node_id,
            prompt, comp["short_name"],
            [c for c in distractors if c != comp["short_name"]],
            explanation, difficulty, CognitiveLevel.REMEMBER.value,
            "Recall analogy of component")

    # Q3 – RAM volatile vs ROM non-volatile (Understand / Hard)
    def gen_volatility(self, rng: random.Random, node_id: str,
                       difficulty: str) -> Question:
        keys = list(self.COMPONENTS.keys())
        comp_key = rng.choice(keys)
        comp = self.COMPONENTS[comp_key]
        vol = comp["volatile"]
        if vol is None:
            return self.gen_volatility(rng, node_id, difficulty)

        correct_word = "Volatile" if vol else "Non-volatile"
        distractors = ["Non-volatile" if vol else "Volatile",
                       "Semi-volatile", "Neither volatile nor non-volatile"]
        prompt = (
            f"Which term correctly describes the memory type of "
            f"'{comp['short_name']}'?"
        )
        explanation = (
            f"'{comp['full_name']}' is {correct_word.lower()}. "
            f"{'This means it loses all data when power is switched off.' if vol else 'This means the data remains stored even without power.'}"
        )
        return self._make_mcq(
            rng, f"c7_cs_001_q_volatility_{comp_key}", node_id,
            prompt, correct_word, distractors, explanation,
            difficulty, CognitiveLevel.UNDERSTAND.value,
            "Distinguish volatile vs non-volatile memory")

    # Q4 – motherboard function (Understand)
    def gen_motherboard(self, rng: random.Random, node_id: str,
                        difficulty: str) -> Question:
        comp = self.COMPONENTS["motherboard"]
        distractors = ["It processes data and instructions like a brain",
                       "It stores the computer's boot instructions",
                       "It renders graphics and video on the screen"]
        prompt = ("What is the primary function of the motherboard in a "
                  "computer?")
        explanation = (
            f"The motherboard is the main circuit board that connects "
            f"all internal components — CPU, RAM, ROM, and GPU — and "
            f"provides communication pathways between them. It is called "
            f"the '{comp['analogy']}' of the computer."
        )
        return self._make_mcq(
            rng, "c7_cs_001_q_motherboard_function", node_id,
            prompt, comp["definition"][:120] + "...", distractors,
            explanation, difficulty, CognitiveLevel.UNDERSTAND.value,
            "Motherboard function")

    # Q5 – which stores boot instructions (Understand)
    def gen_boot_instructions(self, rng: random.Random, node_id: str,
                              difficulty: str) -> Question:
        distractors = rng.sample(
            ["RAM", "CPU", "GPU", "Hard Disk", "USB Drive"], k=3)
        prompt = ("Which internal hardware component permanently stores "
                  "the computer's boot instructions (firmware/BIOS)?")
        explanation = (
            "ROM (Read Only Memory) is non-volatile memory that stores "
            "the boot instructions. These instructions tell the computer "
            "how to start up and remain stored even when power is off. "
            "RAM cannot store boot instructions because it is volatile "
            "and loses data when power is off."
        )
        return self._make_mqc(
            rng, "c7_cs_001_q_boot_instructions", node_id,
            prompt, "ROM", distractors, explanation,
            difficulty, CognitiveLevel.UNDERSTAND.value,
            "Boot instructions stored in ROM")

    # Q6 – internal vs external location (Remember)
    def gen_internal_location(self, rng: random.Random, node_id: str,
                              difficulty: str) -> Question:
        distractors = ["Outside the computer case, connected via a port",
                       "Both inside and outside the case",
                       "On the desk next to the monitor"]
        prompt = ("Where are internal hardware components such as the "
                  "motherboard, CPU, RAM, ROM, and GPU located?")
        explanation = (
            "Internal hardware components are located INSIDE the computer "
            "case. They are connected directly to the motherboard. "
            "External hardware (keyboard, mouse, monitor, etc.) is "
            "connected outside the case."
        )
        return self._make_mcq(
            rng, "c7_cs_001_q_internal_location", node_id,
            prompt, "Inside the computer case", distractors, explanation,
            difficulty, CognitiveLevel.REMEMBER.value,
            "Location of internal hardware")

    # Fix typo: use _make_mcq instead of _make_mqc
    def gen_boot_instructions_fixed(self, rng: random.Random, node_id: str,
                                    difficulty: str) -> Question:
        distractors = rng.sample(
            ["RAM", "CPU", "GPU", "Hard Disk", "USB Drive"], k=3)
        prompt = ("Which internal hardware component permanently stores "
                  "the computer's boot instructions (firmware/BIOS)?")
        explanation = (
            "ROM (Read Only Memory) is non-volatile memory that stores "
            "the boot instructions. These instructions tell the computer "
            "how to start up and remain stored even when power is off. "
            "RAM cannot store boot instructions because it is volatile "
            "and loses data when power is off."
        )
        return self._make_mcq(
            rng, "c7_cs_001_q_boot_instructions", node_id,
            prompt, "ROM", distractors, explanation,
            difficulty, CognitiveLevel.UNDERSTAND.value,
            "Boot instructions stored in ROM")


# ===================================================================
# NODE 2 – External Hardware (c7_cs_002)
# ===================================================================

class ExternalHardwareSolver:
    """
    Encapsulates all domain knowledge for external hardware devices
    (input, output, storage) and produces / verifies MCQ answers.
    """

    DEVICES: Dict[str, Dict] = {
        # INPUT DEVICES
        "keyboard": {
            "short_name": "Keyboard",
            "full_name": "Keyboard",
            "category": "input",
            "function": (
                "An input device that allows the user to type letters, "
                "numbers, and symbols, and send commands to the computer."
            ),
            "analogy": "like typing a letter",
        },
        "mouse": {
            "short_name": "Mouse",
            "full_name": "Mouse",
            "category": "input",
            "function": (
                "An input device that allows the user to move a cursor "
                "on the screen and select items by clicking."
            ),
            "analogy": "like pointing a finger",
        },
        "scanner": {
            "short_name": "Scanner",
            "full_name": "Scanner",
            "category": "input",
            "function": (
                "An input device that converts paper documents, "
                "photographs, or drawings into digital images that the "
                "computer can store and edit."
            ),
            "analogy": "like a photocopier that creates digital copies",
        },
        "webcam": {
            "short_name": "Webcam",
            "full_name": "Webcam",
            "category": "input",
            "function": (
                "An input device that captures live video and sends it "
                "to the computer for video calls, recording, or streaming."
            ),
            "analogy": "like a digital eye",
        },
        "microphone": {
            "short_name": "Microphone",
            "full_name": "Microphone",
            "category": "input",
            "function": (
                "An input device that converts sound waves into "
                "electrical signals so the computer can record or process audio."
            ),
            "analogy": "like an electronic ear",
        },
        # OUTPUT DEVICES
        "monitor": {
            "short_name": "Monitor",
            "full_name": "Monitor",
            "category": "output",
            "function": (
                "An output device that displays text, images, and video "
                "on a screen so the user can see the computer's output."
            ),
            "analogy": "like a TV screen for the computer",
        },
        "printer": {
            "short_name": "Printer",
            "full_name": "Printer",
            "category": "output",
            "function": (
                "An output device that produces a physical hard copy "
                "of digital documents, images, or data on paper."
            ),
            "analogy": "like a digital pen on paper",
        },
        "projector": {
            "short_name": "Projector",
            "full_name": "Projector",
            "category": "output",
            "function": (
                "An output device that projects enlarged images or video "
                "onto a large screen or wall for group viewing."
            ),
            "analogy": "like a cinema screen maker",
        },
        "speaker": {
            "short_name": "Speaker",
            "full_name": "Speaker",
            "category": "output",
            "function": (
                "An output device that converts digital audio signals "
                "into sound waves so the user can hear music, speech, "
                "or audio from the computer."
            ),
            "analogy": "like the computer's voice box",
        },
        # STORAGE DEVICES
        "external_hdd": {
            "short_name": "External HDD",
            "full_name": "External Hard Disk Drive",
            "category": "storage",
            "function": (
                "A portable external storage device that uses magnetic "
                "platters to store large amounts of data and connects "
                "to the computer via USB."
            ),
            "analogy": "like a portable filing cabinet",
        },
        "usb_flash": {
            "short_name": "USB Flash Drive",
            "full_name": "USB Flash Drive",
            "category": "storage",
            "function": (
                "A small, portable storage device that uses flash memory "
                "to store data and connects to the computer via a USB port."
            ),
            "analogy": "like a pocket-sized locker",
        },
        "cd_dvd": {
            "short_name": "CD/DVD",
            "full_name": "CD / DVD",
            "category": "storage",
            "function": (
                "Optical storage discs that store data, music, video, "
                "or software and require an optical drive to read or write."
            ),
            "analogy": "like a shiny data disc",
        },
    }

    CATEGORIES: Dict[str, List[str]] = {
        "input": [k for k, v in DEVICES.items() if v["category"] == "input"],
        "output": [k for k, v in DEVICES.items() if v["category"] == "output"],
        "storage": [k for k, v in DEVICES.items() if v["category"] == "storage"],
    }

    _ALL_DEVICE_NAMES = [v["short_name"] for v in DEVICES.values()]
    _DISTRACTORS_CAT = ["Processing device", "Internal component",
                        "Communication device", "Power supply unit"]

    # ------------------------------------------------------------------
    # Verification helpers
    # ------------------------------------------------------------------

    @staticmethod
    def get_category(device_key: str) -> str:
        return ExternalHardwareSolver.DEVICES.get(device_key, {}).get(
            "category", "unknown")

    @staticmethod
    def get_function(device_key: str) -> str:
        return ExternalHardwareSolver.DEVICES.get(device_key, {}).get(
            "function", "")

    @staticmethod
    def verify_category(device_key: str, proposed_category: str) -> bool:
        actual = ExternalHardwareSolver.get_category(device_key)
        return actual.lower() == proposed_category.lower()

    # ------------------------------------------------------------------
    # Question generators
    # ------------------------------------------------------------------

    def _make_mcq(self, rng: random.Random, qid: str, node_id: str,
                  prompt: str, correct: str, distractors: List[str],
                  explanation: str, difficulty: str,
                  cognitive_level: str, skill: str, marks: int = 1) -> Question:
        labels = [l.value for l in OptionLabel]
        choices = [correct] + rng.sample(distractors, k=min(3, len(distractors)))
        # Ensure unique
        choices = list(dict.fromkeys(choices))
        while len(choices) < 4:
            choices.append(rng.choice(self._ALL_DEVICE_NAMES + self._DISTRACTORS_CAT))
        rng.shuffle(choices)
        correct_label = labels[choices.index(correct)]
        options = dict(zip(labels, choices))
        return Question(
            id=qid, node_id=node_id, topic="External Hardware",
            question_text=prompt, options=options,
            correct_answer=correct_label, explanation=explanation,
            difficulty=difficulty, cognitive_level=cognitive_level,
            marks=marks, skill_tested=skill,
        )

    # Q1 – classify device (Remember)
    def gen_classify_device(self, rng: random.Random, node_id: str,
                            device_key: str, difficulty: str) -> Question:
        dev = self.DEVICES[device_key]
        correct_cat = dev["category"].capitalize()
        other_cats = [c.capitalize() for c in
                      ["input", "output", "storage"] if c != dev["category"]]
        distractors = rng.sample(other_cats, k=len(other_cats))
        distractors += rng.sample(self._DISTRACTORS_CAT, k=2)
        distractors = list(dict.fromkeys(distractors))[:3]
        prompt = (f"The '{dev['short_name']}' is connected to the "
                  f"computer externally. Which category does it belong to?")
        explanation = (
            f"The '{dev['full_name']}' is an {dev['category']} device. "
            f"{dev['function'][:80]}..."
        )
        return self._make_mcq(
            rng, f"c7_cs_002_q_classify_{device_key}", node_id,
            prompt, correct_cat, distractors, explanation,
            difficulty, CognitiveLevel.REMEMBER.value,
            "Classify external device category")

    # Q2 – function identification (Remember)
    def gen_function(self, rng: random.Random, node_id: str,
                     device_key: str, difficulty: str) -> Question:
        dev = self.DEVICES[device_key]
        other_devices = [k for k in self.DEVICES if k != device_key]
        distractors = rng.sample(other_devices, k=3)
        distractors = [self.DEVICES[d]["short_name"] for d in distractors]
        prompt = (f"Which external device '{dev['function']}'?")
        explanation = (
            f"The device described is the '{dev['full_name']}'. "
            f"It is an {dev['category']} device. {dev['function'][:80]}..."
        )
        return self._make_mcq(
            rng, f"c7_cs_002_q_function_{device_key}", node_id,
            prompt, dev["short_name"], distractors, explanation,
            difficulty, CognitiveLevel.REMEMBER.value,
            "Identify device from function description")

    # Q3 – internal vs external distinction (Understand)
    def gen_internal_vs_external(self, rng: random.Random, node_id: str,
                                 device_key: str, difficulty: str) -> Question:
        dev = self.DEVICES[device_key]
        if dev["category"] == "storage":
            correct = "It is an external peripheral connected outside the case"
        else:
            correct = "It is an external peripheral connected outside the case"
        distractors = [
            "It is located inside the computer case",
            "It is both internal and external depending on the model",
            "It is a software component, not a hardware device",
        ]
        prompt = (f"Regarding the '{dev['short_name']}', which statement "
                  f"is correct?")
        explanation = (
            f"The '{dev['full_name']}' is an EXTERNAL hardware device "
            f"(peripheral). It is connected outside the computer case "
            f"and communicates with internal components. "
            f"Internal hardware (CPU, RAM, etc.) is inside the case."
        )
        return self._make_mcq(
            rng, f"c7_cs_002_q_internal_external_{device_key}", node_id,
            prompt, correct, distractors, explanation,
            difficulty, CognitiveLevel.UNDERSTAND.value,
            "Distinguish internal vs external hardware")

    # Q4 – group identification (Understand)
    def gen_group_devices(self, rng: random.Random, node_id: str,
                          category: str, difficulty: str) -> Question:
        cat_devices = self.CATEGORIES.get(category, [])
        sample = rng.sample(cat_devices, k=min(3, len(cat_devices)))
        sample_names = [self.DEVICES[d]["short_name"] for d in sample]
        distractors_pool = [
            v["short_name"] for k, v in self.DEVICES.items()
            if v["category"] != category
        ]
        distractors = rng.sample(distractors_pool, k=min(3, len(distractors_pool)))
        prompt = (f"Which group of devices are all {category} devices?\n"
                  f"Consider these devices: {', '.join(sample_names)}")
        # Build a fake "group" that looks right but mixes categories
        mixed = list(sample_names[:1]) + distractors[:2]
        mixed = list(dict.fromkeys(mixed))
        while len(mixed) < 3:
            mixed.append(rng.choice(self._ALL_DEVICE_NAMES))
        correct_str = ", ".join(sample_names)
        fake_choices = [
            correct_str,
            ", ".join(mixed[:3]),
            ", ".join(rng.sample(distractors_pool, k=3)),
            ", ".join(rng.sample(distractors_pool, k=3)),
        ]
        labels = [l.value for l in OptionLabel]
        rng.shuffle(fake_choices)
        correct_label = labels[fake_choices.index(correct_str)]
        explanation = (
            f"All of {', '.join(sample_names)} are {category} devices. "
            f"{category.capitalize()} devices {'send data to the computer' if category == 'input' else 'receive data from the computer' if category == 'output' else 'store data for later use'}."
        )
        return Question(
            id=f"c7_cs_002_q_group_{category}", node_id=node_id,
            topic="External Hardware", question_text=prompt,
            options=dict(zip(labels, fake_choices)),
            correct_answer=correct_label, explanation=explanation,
            difficulty=difficulty, cognitive_level=CognitiveLevel.UNDERSTAND.value,
            marks=1, skill_tested=f"Identify all {category} devices",
        )

    # Q5 – scanner function specifically (Understand)
    def gen_scanner_detail(self, rng: random.Random, node_id: str,
                           difficulty: str) -> Question:
        distractors = [
            "It prints physical copies of digital documents",
            "It displays enlarged images on a screen",
            "It stores files on a USB drive",
        ]
        prompt = ("What is the primary function of a scanner?")
        explanation = (
            "A scanner is an INPUT device. It converts paper documents, "
            "photographs, or drawings into digital images that the "
            "computer can store and edit. This is similar to how a "
            "photocopier works, but instead of making a paper copy, "
            "it creates a digital copy."
        )
        return self._make_mcq(
            rng, "c7_cs_002_q_scanner_detail", node_id,
            prompt, "It converts paper documents to digital format",
            distractors, explanation, difficulty,
            CognitiveLevel.UNDERSTAND.value,
            "Function of scanner as input device")

    # Q6 – projector function specifically (Understand)
    def gen_projector_detail(self, rng: random.Random, node_id: str,
                             difficulty: str) -> Question:
        distractors = [
            "It converts paper documents to digital format",
            "It stores files on an external drive",
            "It types text into the computer",
        ]
        prompt = ("What is the primary function of a projector?")
        explanation = (
            "A projector is an OUTPUT device. It takes video signals "
            "from the computer and projects enlarged images or video "
            "onto a large screen or wall. This is useful for "
            "presentations, watching movies in a group, or classroom teaching."
        )
        return self._make_mcq(
            rng, "c7_cs_002_q_projector_detail", node_id,
            prompt, "It displays large images on a screen",
            distractors, explanation, difficulty,
            CognitiveLevel.UNDERSTAND.value,
            "Function of projector as output device")


# ===================================================================
# Master Question Generator
# ===================================================================

class Class7CSQuestionGenerator:
    """
    Orchestrates question generation for both nodes with seeded RNG,
    difficulty controls, and filtering.
    """

    def __init__(self, config: GenerationConfig | None = None):
        self.config = config or GenerationConfig()
        self._rng = make_rng(self.config.seed)
        self._solver1 = InternalHardwareSolver()
        self._solver2 = ExternalHardwareSolver()
        self._question_pool: List[Question] = []
        self._generate_pool()

    # ----------------------------------------------------------------
    # Pool generation
    # ----------------------------------------------------------------

    def _generate_pool(self):
        rng = self._rng
        difficulty = self.config.difficulty_override or "Medium"

        # --- NODE 1 questions (6 items) ---
        node1_id = "c7_cs_001"
        q_pool_1 = [
            # Identify components
            self._solver1.gen_identify_component(rng, node1_id, "cpu", "Hard"),
            self._solver1.gen_identify_component(rng, node1_id, "motherboard", "Hard"),
            self._solver1.gen_identify_component(rng, node1_id, "gpu", "Medium"),
            self._solver1.gen_analogy(rng, node1_id, "ram", "Medium"),
            self._solver1.gen_volatility(rng, node1_id, "Hard"),
            self._solver1.gen_motherboard(rng, node1_id, "Hard"),
            self._solver1.gen_boot_instructions_fixed(rng, node1_id, "Medium"),
            self._solver1.gen_internal_location(rng, node1_id, "Medium"),
        ]
        # Shuffle deterministically then pick
        rng.shuffle(q_pool_1)

        # --- NODE 2 questions (6 items) ---
        node2_id = "c7_cs_002"
        q_pool_2 = [
            self._solver2.gen_classify_device(rng, node2_id, "scanner", "Medium"),
            self._solver2.gen_classify_device(rng, node2_id, "projector", "Medium"),
            self._solver2.gen_classify_device(rng, node2_id, "usb_flash", "Medium"),
            self._solver2.gen_function(rng, node2_id, "webcam", "Medium"),
            self._solver2.gen_function(rng, node2_id, "printer", "Medium"),
            self._solver2.gen_internal_vs_external(rng, node2_id, "keyboard", "Medium"),
            self._solver2.gen_group_devices(rng, node2_id, "input", "Medium"),
            self._solver2.gen_group_devices(rng, node2_id, "output", "Medium"),
            self._solver2.gen_group_devices(rng, node2_id, "storage", "Medium"),
            self._solver2.gen_scanner_detail(rng, node2_id, "Medium"),
            self._solver2.gen_projector_detail(rng, node2_id, "Medium"),
        ]
        rng.shuffle(q_pool_2)

        self._question_pool = q_pool_1 + q_pool_2

    # ----------------------------------------------------------------
    # Public API
    # ----------------------------------------------------------------

    def get_questions(self, n: int | None = None) -> List[Question]:
        n = n or self.config.num_questions
        pool = self._get_filtered_pool()
        return pool[:n]

    def get_questions_by_topic(self, topic: str, n: int = 4) -> List[Question]:
        pool = [q for q in self._question_pool if q.node_id == topic]
        return pool[:n]

    def get_question_by_id(self, qid: str) -> Optional[Question]:
        for q in self._question_pool:
            if q.id == qid:
                return q
        return None

    def verify_answer(self, question_id: str, selected: str) -> Dict:
        q = self.get_question_by_id(question_id)
        if q is None:
            return {"error": f"Question '{question_id}' not found."}
        correct = selected.strip().upper() == q.correct_answer
        return {
            "question_id": question_id,
            "selected": selected,
            "correct_answer": q.correct_answer,
            "is_correct": correct,
            "explanation": q.explanation,
        }

    def get_node_summary(self, node_id: str) -> Dict:
        pool = [q for q in self._question_pool if q.node_id == node_id]
        node_info = {
            "c7_cs_001": {
                "title": "Internal Hardware",
                "components": ["Motherboard", "CPU", "RAM", "ROM", "GPU"],
                "key_concepts": [
                    "Motherboard connects all components",
                    "CPU processes instructions",
                    "RAM is volatile (temporary) memory",
                    "ROM is non-volatile (permanent) memory",
                    "GPU processes graphics",
                ],
            },
            "c7_cs_002": {
                "title": "External Hardware",
                "input_devices": ["Keyboard", "Mouse", "Scanner", "Webcam",
                                  "Microphone"],
                "output_devices": ["Monitor", "Printer", "Projector", "Speaker"],
                "storage_devices": ["External HDD", "USB Flash Drive", "CD/DVD"],
                "key_concepts": [
                    "Input devices send data TO the computer",
                    "Output devices receive data FROM the computer",
                    "Storage devices save data for later use",
                    "External hardware is outside the computer case",
                ],
            },
        }
        return {
            "node_id": node_id,
            "total_questions_generated": len(pool),
            "node_info": node_info.get(node_id, {}),
        }

    def print_quiz(self, questions: List[Question], show_answers: bool = False):
        lines = []
        lines.append("=" * 70)
        lines.append("  CLASS 7 COMPUTER STUDIES – QUIZ")
        lines.append("=" * 70)
        for i, q in enumerate(questions, 1):
            lines.append(f"\nQ{i}. [{q.id}]  ({q.difficulty} | {q.cognitive_level})")
            lines.append(f"     {q.question_text}")
            for label in ["A", "B", "C", "D"]:
                marker = "  ✓" if (show_answers and label == q.correct_answer) else ""
                lines.append(f"     {label}. {q.options[label]}{marker}")
            if show_answers:
                lines.append(f"     ── EXPLANATION: {q.explanation}")
        lines.append("\n" + "=" * 70)
        if show_answers:
            lines.append("  ANSWERS REVEALED")
        else:
            lines.append("  ANSWERS HIDDEN – rerun with show_answers=True")
        lines.append("=" * 70)
        return "\n".join(lines)

    # ----------------------------------------------------------------
    # Private helpers
    # ----------------------------------------------------------------

    def _get_filtered_pool(self) -> List[Question]:
        pool = list(self._question_pool)
        if self.config.topic_filter:
            pool = [q for q in pool if q.node_id == self.config.topic_filter]
        return pool


# ===================================================================
# Convenience CLI
# ===================================================================

def run_demo():
    cfg = GenerationConfig(seed=42, num_questions=6)
    gen = Class7CSQuestionGenerator(cfg)

    print(gen.print_quiz(gen.get_questions(), show_answers=True))

    # Demonstrate verification
    first_q = gen.get_questions(1)[0]
    result = gen.verify_answer(first_q.id, first_q.correct_answer)
    print(f"\nVerification test → is_correct={result['is_correct']}")


if __name__ == "__main__":
    run_demo()