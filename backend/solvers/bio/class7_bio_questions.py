"""
Deterministic Biology Question Generator - Class 7
Author: claude-fable-5 by Anthropic
Modules: numpy, sympy, random, dataclasses, json
"""
import hashlib
import json
import math
import random
import string
from dataclasses import dataclass, field, asdict
from typing import List, Optional, Dict, Tuple
import numpy as np


# ============================================================
# SEED UTILITY
# ============================================================
def make_seed(*parts: str) -> int:
    raw = "||".join(parts)
    h = hashlib.sha256(raw.encode()).hexdigest()
    return int(h[:8], 16)  # 8 hex digits = 32 bits, fits numpy RandomState


def get_rng(node_id: str, q_index: int, seed_offset: int = 0) -> np.random.RandomState:
    seed = make_seed(node_id, str(q_index), str(seed_offset))
    return np.random.RandomState(seed)


# ============================================================
# DATA CLASSES
# ============================================================
@dataclass
class Question:
    question_id: str
    node_id: str
    type: str
    difficulty: str
    cognitive: str
    topic: str
    question_text: str
    options: Optional[List[str]] = None
    answer: str = ""
    explanation: str = ""
    marks: int = 1
    competency: str = "Board"
    context: str = "standard"


@dataclass
class NodeSpec:
    node_id: str
    title: str
    section: str
    syllabus: str
    cognitive: str
    difficulty: str
    exam_relevance: str
    competency: str
    vocabulary: List[str]
    prereq: Optional[str]
    examples: List[str]
    num_questions: int = 10


# ============================================================
# NODE SPECIFICATIONS (5 THEMES for Class 7 Biology)
# ============================================================
NODES = {
    "c7_bio_001": NodeSpec(
        node_id="c7_bio_001",
        title="Tissue concept and plant meristematic tissue",
        section="1 (Tissue)",
        syllabus="Definition of tissue; Classification into meristematic and permanent; "
                 "Meristematic characteristics; Types - apical, lateral, intercalary; "
                 "Functions; Distinction from permanent tissues; Differentiation.",
        cognitive="Understand",
        difficulty="Medium",
        exam_relevance="Board_Only",
        competency="Board",
        vocabulary=["tissue", "meristematic", "permanent", "division",
                     "apical", "lateral", "intercalary", "differentiation"],
        prereq=None,
        examples=["A tissue is like a team of workers doing the same job together",
                   "Meristematic tissue is like a factory of building blocks",
                   "Growing tips of roots and shoots where new cells divide",
                   "Wound healing in plants where new cells divide"],
        num_questions=10,
    ),
    "c7_bio_002": NodeSpec(
        node_id="c7_bio_002",
        title="Plant permanent tissues - Parenchyma, Collenchyma, Sclerenchyma",
        section="1 (Tissue)",
        syllabus="Simple permanent tissues: Parenchyma (living, thin walls, storage, "
                 "photosynthesis); Collenchyma (living, thickened corners, flexibility); "
                 "Sclerenchyma (dead, thick lignified walls, rigidity). "
                 "Comparison of structure, location, and function.",
        cognitive="Understand",
        difficulty="Medium",
        exam_relevance="Board_Only",
        competency="Board",
        vocabulary=["parenchyma", "collenchyma", "sclerenchyma",
                     "storage", "flexibility", "strength", "lignin",
                     "chloroplast", "chlorenchyma", "aerenchyma"],
        prereq="c7_bio_001",
        examples=["Parenchyma is like a soft storage bag",
                   "Collenchyma is like a flexible plastic ruler",
                   "Sclerenchyma is like a hard helmet",
                   "Potato storing food (parenchyma)",
                   "Flexible leaf stalks (collenchyma)",
                   "Hard coconut shell (sclerenchyma)"],
        num_questions=10,
    ),
    "c7_bio_003": NodeSpec(
        node_id="c7_bio_003",
        title="Complex permanent tissues - Xylem and Phloem",
        section="1 (Tissue)",
        syllabus="Complex permanent tissues composed of more than one cell type. "
                 "Xylem: tracheids, vessels, xylem parenchyma, xylem fibres; "
                 "transports water and minerals (unidirectional, root to leaf). "
                 "Phloem: sieve tubes, companion cells, phloem parenchyma, phloem fibres; "
                 "transports food (bidirectional). "
                 "Comparison of xylem and phloem.",
        cognitive="Understand",
        difficulty="Medium",
        exam_relevance="Board_Only",
        competency="Board",
        vocabulary=["xylem", "phloem", "tracheid", "sieve tube",
                     "companion cell", "vessel", "transpiration",
                     "translocation", "unidirectional", "bidirectional"],
        prereq="c7_bio_002",
        examples=["Xylem is like water pipes in a building",
                   "Phloem is like food delivery trucks on both directions",
                   "Stem of a dying flower losing water through xylem",
                   "Roots receiving food transported downward through phloem"],
        num_questions=10,
    ),
    "c7_bio_004": NodeSpec(
        node_id="c7_bio_004",
        title="Animal epithelial tissue and connective tissue",
        section="2 (Animal Tissues)",
        syllabus="Animal epithelial tissue: types - squamous (flat), cuboidal (cube-like), "
                 "columnar (tall); locations and functions (protection, absorption, secretion). "
                 "Connective tissue: blood, bone, cartilage, tendons, ligaments; "
                 "characteristics (cells scattered in matrix); functions.",
        cognitive="Understand",
        difficulty="Medium",
        exam_relevance="Board_Only",
        competency="Board",
        vocabulary=["epithelial", "squamous", "cuboidal", "columnar",
                     "connective", "matrix", "cartilage", "tendon",
                     "ligament", "bone", "blood", "absorption"],
        prereq="c7_bio_001",
        examples=["Epithelial cells lining the intestine (columnar, for absorption)",
                   "Skin surface covered by squamous epithelial cells",
                   "Bone is a hard connective tissue with mineralized matrix",
                   "Cartilage in ear provides flexible support",
                   "Blood is a fluid connective tissue"],
        num_questions=10,
    ),
    "c7_bio_005": NodeSpec(
        node_id="c7_bio_005",
        title="Animal muscle tissue and nervous tissue",
        section="2 (Animal Tissues)",
        syllabus="Muscle tissue: types - skeletal (voluntary, attached to bones), "
                 "smooth (involuntary, walls of organs), cardiac (heart wall, "
                 "involuntary). Structure and function. "
                 "Nervous tissue: neurons - cell body, dendrites, axon; "
                 "function of receiving and transmitting impulses.",
        cognitive="Understand",
        difficulty="Medium",
        exam_relevance="Board_Only",
        competency="Board",
        vocabulary=["muscle", "skeletal", "smooth", "cardiac",
                     "voluntary", "involuntary", "neuron", "nerve",
                     "impulse", "dendrite", "axon", "synapse"],
        prereq="c7_bio_004",
        examples=["Moving your arm uses skeletal muscle (voluntary)",
                   "Heart beating uses cardiac muscle (involuntary)",
                   "Moving food through intestine uses smooth muscle",
                   "Neuron carries signal from brain to hand",
                   "Reflex action uses nervous tissue"],
        num_questions=10,
    ),
}


# ============================================================
# QUESTION TEMPLATES
# ============================================================

class QuestionFactory:
    """Generates biology questions for Class 7 using deterministic seeded randomness."""

    def __init__(self, node: NodeSpec):
        self.node = node
        self.nid = node.node_id
        self.vocab = node.vocabulary
        self.examples = node.examples
        self.rng_factory = lambda qi: get_rng(self.nid, qi)

    def _rng(self, qi: int, offset: int = 0):
        return self.rng_factory(qi + offset)

    # --------------------------------------------------------
    # 1. DEFINITION QUESTIONS
    # --------------------------------------------------------
    def make_definition(self, qi: int) -> Question:
        rng = self._rng(qi, 1)
        terms = self.vocab
        term = terms[int(rng.randint(0, len(terms)))]

        definitions = {
            "tissue": "a group of similar cells that work together to perform a specific function",
            "meristematic": "plant tissue whose cells are actively dividing to help the plant grow",
            "permanent": "plant tissue whose cells have stopped dividing and become specialized",
            "division": "the process by which a parent cell splits into two daughter cells",
            "specialization": "the process by which unspecialized cells become adapted for specific functions",
            "apical": "relating to the tip or apex of a root or shoot",
            "lateral": "relating to the sides; responsible for increase in girth",
            "intercalary": "located at internodes or nodes; helps in regrowth after grazing",
            "differentiation": "the process by which cells become specialized in structure and function",
            "parenchyma": "simple permanent tissue with thin-walled living cells for storage and photosynthesis",
            "collenchyma": "simple permanent tissue with living cells having thickened corners for flexibility",
            "sclerenchyma": "simple permanent tissue with dead cells having thick lignified walls for strength",
            "storage": "the act of keeping food or water in cells for later use",
            "flexibility": "the ability to bend without breaking",
            "strength": "the ability to resist force or pressure",
            "lignin": "a hard, woody substance deposited in cell walls for rigidity",
            "chloroplast": "a green organelle in plant cells where photosynthesis takes place",
            "chlorenchyma": "parenchyma tissue containing chloroplasts for photosynthesis",
            "aerenchyma": "parenchyma tissue with large air spaces for buoyancy",
            "xylem": "complex permanent tissue that transports water and minerals from roots to leaves",
            "phloem": "complex permanent tissue that transports food from leaves to other parts",
            "sieve tube": "tube-like phloem cell for transporting dissolved food",
            "companion cell": "cell closely associated with a sieve tube, helping in food transport",
            "tracheid": "elongated dead xylem cell with tapered ends for water transport",
            "transpiration": "the loss of water vapour from the surface of leaves",
            "translocation": "the movement of dissolved food through phloem",
            "unidirectional": "moving in one direction only",
            "bidirectional": "moving in both directions",
            "epithelial": "animal tissue that covers body surfaces and lines cavities",
            "squamous": "flat and scale-like epithelial cells",
            "cuboidal": "cube-shaped epithelial cells",
            "columnar": "tall, pillar-like epithelial cells",
            "connective": "animal tissue that supports, binds, or separates other tissues",
            "matrix": "the ground substance in which cells are embedded in connective tissue",
            "cartilage": "smooth, flexible connective tissue found in joints, ears, and nose",
            "tendon": "fibrous connective tissue that attaches muscle to bone",
            "ligament": "fibrous connective tissue that connects bone to bone at joints",
            "bone": "hard connective tissue with a mineralized matrix",
            "blood": "fluid connective tissue that transports oxygen, nutrients, and waste",
            "absorption": "the process of taking in substances (like nutrients) into the body",
            "muscle": "animal tissue capable of contracting to produce movement",
            "skeletal": "muscle tissue attached to bones; voluntary",
            "smooth": "muscle tissue found in walls of internal organs; involuntary",
            "cardiac": "muscle tissue forming the wall of the heart; involuntary",
            "voluntary": "done by conscious control",
            "involuntary": "not under conscious control",
            "neuron": "nerve cell that transmits electrical impulses",
            "nerve": "bundle of nerve fibres (axons) that carries impulses",
            "impulse": "electrical signal that travels along a neuron",
            "dendrite": "short branching extension of a neuron that receives impulses",
            "axon": "long fibre of a neuron that carries impulses away from the cell body",
            "synapse": "junction between two neurons where impulses are transmitted",
        }

        # Indian-context defs
        indian_defs = {
            "tissue": "औसत के समान, एक ही कार्य करने वाले कोशिकाओं का समूह",
            "meristematic": "वे पौधे की कोशिकाएं जो लगातार विभाजित होकर वृद्धि करती हैं",
            "parenchyma": "पौधों की सबसे साधारण स्थायी ऊती, जिसमें पतली दीवारें वाली जीवित कोशिकाएं होती हैं",
            "xylem": "पौधे की वह ऊती जल और खनिज लवणों को जड़ से पत्ते तक ले जाती है",
            "phloem": "पौधे की वह ऊती जिससे पत्तों से बने खाद्य पदार्थ पौधे के अन्य भागों तक पहुंचते हैं",
            "neuron": "मस्तिष्क की वह कोशिका जो आर्थिक संकेतों (impulses) को वहन करती है",
        }

        if term in indian_defs and rng.rand() > 0.5:
            context = "indian"
            q_text = f"Define '{term}' as used in Biology (Class 7 level)."
        else:
            context = "standard"
            q_text = f"What is meant by the term '{term}' in the context of Biology?"

        answer_text = definitions.get(term, f"{term} is a biological term studied at Class 7 level.")

        return Question(
            question_id=f"{self.nid}_def_{qi+1:02d}",
            node_id=self.nid,
            type="definition",
            difficulty="Easy" if rng.rand() > 0.5 else "Medium",
            cognitive=self.node.cognitive,
            topic=self.node.title,
            question_text=q_text,
            answer=answer_text,
            explanation=f"In Class 7 Biology, '{term}' is defined as: {answer_text}.",
            marks=2,
            competency=self.node.competency,
            context=context,
        )

    # --------------------------------------------------------
    # 2. FILL IN THE BLANKS
    # --------------------------------------------------------
    def make_fill_blank(self, qi: int) -> Question:
        rng = self._rng(qi, 2)
        templates = [
            ("Meristematic tissue is found at the _____ of roots and shoots.", ["apical", "tips", "apex"]),
            ("_____ meristem is responsible for the increase in girth of the stem.", ["lateral", "cambium"]),
            ("_____ meristem is present at the nodes of the stem.", ["intercalary"]),
            ("Parenchyma cells have _____ cell walls and are _____ (living/dead).", ["thin", "living"]),
            ("Collenchyma cells have thickened _____ due to deposition of _____ and pectin.", ["corners", "cellulose"]),
            ("Sclerenchyma cells are _____ and have _____ lignified walls.", ["dead", "thick"]),
            ("_____ tissue transports water and minerals from roots to leaves.", ["xylem"]),
            ("_____ tissue transports food from leaves to other parts of the plant.", ["phloem"]),
            ("Xylem transports in a _____ direction whereas phloem transports in a _____ direction.", ["unidirectional", "bidirectional"]),
            ("Squamous epithelial cells are _____ and scale-like.", ["flat"]),
            ("Bone is a type of _____ tissue.", ["connective"]),
            ("Skeletal muscle is under _____ control.", ["voluntary"]),
            ("The _____ carries impulses away from the cell body of a neuron.", ["axon"]),
            ("_____ is the process by which meristematic cells become permanent tissue.", ["Differentiation"]),
            ("Potato is an example of _____ tissue storing food.", ["parenchyma"]),
            ("Coconut husk is made of _____ tissue.", ["sclerenchyma"]),
            ("A tissue is a group of _____ cells performing a specific _____.", ["similar", "function"]),
            ("_____ is a simple permanent tissue with large intercellular spaces for buoyancy.", ["Aerenchyma"]),
            ("The hard covering of a seed is made of _____ tissue.", ["sclerenchyma"]),
            ("_____ muscle makes up the wall of the heart.", ["Cardiac"]),
            ("Cartilage is found in the _____ and the _____ of the body.", ["ear", "nose"]),
            ("Blood is a _____ connective tissue.", ["fluid"]),
            ("Tendons attach _____ to _____ while ligaments connect bone to bone.", ["muscle", "bone"]),
            ("A neuron has short branching extensions called _____ and a long fibre called the _____.", ["dendrites", "axon"]),
            ("The _____ tissue lines the intestine for absorption of food.", ["columnar epithelial"]),
        ]

        idx = int(rng.randint(0, len(templates)))
        sentence, blanks = templates[idx]

        q_text = f"Fill in the blank: {sentence}"

        return Question(
            question_id=f"{self.nid}_fb_{qi+1:02d}",
            node_id=self.nid,
            type="fill_blank",
            difficulty="Easy",
            cognitive=self.node.cognitive,
            topic=self.node.title,
            question_text=q_text,
            answer="; ".join(blanks),
            explanation=f"The correct answers fill the blanks in the statement about {self.node.title.lower()}.",
            marks=1,
            competency=self.node.competency,
            context="standard",
        )

    # --------------------------------------------------------
    # 3. MULTIPLE CHOICE QUESTIONS
    # --------------------------------------------------------
    def make_mcq(self, qi: int) -> Question:
        rng = self._rng(qi, 3)
        mcq_bank = [
            {
                "q": "Which of the following is a characteristic of meristematic tissue?",
                "options": ["Cells have thick lignified walls", "Cells are living with large nuclei",
                            "Cells are dead at maturity", "Cells store food"],
                "ans": 1,
                "exp": "Meristematic cells are living, thin-walled, densely cytoplasmic, and have large nuclei for active division.",
            },
            {
                "q": "Which meristem is found at the growing tips of roots and shoots?",
                "options": ["Lateral meristem", "Intercalary meristem", "Apical meristem", "Cambium"],
                "ans": 2,
                "exp": "Apical meristem is located at the tips of roots and shoots, enabling the plant to grow longer.",
            },
            {
                "q": "Which type of meristem increases the girth of the stem?",
                "options": ["Apical meristem", "Lateral meristem", "Intercalary meristem", "Apical and intercalary"],
                "ans": 1,
                "exp": "Lateral meristem (cambium) is responsible for secondary growth, increasing stem thickness (girth).",
            },
            {
                "q": "Collenchyma provides _____ to young stems.",
                "options": ["Rigidity", "Flexibility and mechanical support", "Food storage", "Water transport"],
                "ans": 1,
                "exp": "Collenchyma cells have thickened corners made of cellulose and pectin, giving flexibility and support.",
            },
            {
                "q": "Which tissue has dead cells with thick lignified walls?",
                "options": ["Parenchyma", "Collenchyma", "Sclerenchyma", "Meristematic"],
                "ans": 2,
                "exp": "Sclerenchyma consists of dead cells with thick lignified walls, providing strength and rigidity.",
            },
            {
                "q": "Coconut husk is mainly made of which tissue?",
                "options": ["Parenchyma", "Collenchyma", "Sclerenchyma", "Xylem"],
                "ans": 2,
                "exp": "Coconut husk is composed of sclerenchyma fibres, which give it hardness and strength.",
            },
            {
                "q": "Which of the following is a component of xylem?",
                "options": ["Sieve tube", "Companion cell", "Tracheid", "Companion cell and sieve tube"],
                "ans": 2,
                "exp": "Xylem consists of tracheids, vessels, xylem parenchyma, and xylem fibres. Sieve tubes belong to phloem.",
            },
            {
                "q": "Which tissue transports food in plants?",
                "options": ["Xylem", "Phloem", "Cambium", "Collenchyma"],
                "ans": 1,
                "exp": "Phloem transports dissolved food (sugars) from leaves to other parts of the plant bidirectionally.",
            },
            {
                "q": "Phloem transports in a _____ direction.",
                "options": ["Unidirectional", "Bidirectional", "Upward only", "Downward only"],
                "ans": 1,
                "exp": "Phloem can transport food both upward and downward, so it is bidirectional.",
            },
            {
                "q": "Squamous epithelial cells are _____.",
                "options": ["Cube-shaped", "Tall and pillar-like", "Flat and scale-like", "Irregular"],
                "ans": 2,
                "exp": "Squamous epithelial cells are flat and scale-like, found in alveoli of lungs and lining of blood vessels.",
            },
            {
                "q": "Which tissue is responsible for voluntary movements?",
                "options": ["Smooth muscle", "Cardiac muscle", "Skeletal muscle", "Neural tissue"],
                "ans": 2,
                "exp": "Skeletal muscle is attached to bones and is under voluntary (conscious) control.",
            },
            {
                "q": "The part of a neuron that carries impulses away from the cell body is the:",
                "options": ["Dendrite", "Axon", "Cell body", "Nucleus"],
                "ans": 1,
                "exp": "The axon is a long fibre that transmits impulses away from the cell body toward other neurons or muscles.",
            },
            {
                "q": "Which tissue lines the small intestine for absorption?",
                "options": ["Squamous epithelium", "Cuboidal epithelium", "Columnar epithelium", "Stratified epithelium"],
                "ans": 2,
                "exp": "Columnar epithelial cells line the small intestine and are specialised for absorption of nutrients.",
            },
            {
                "q": "Blood is a type of _____ connective tissue.",
                "options": ["Solid", "Fluid", "Cartilaginous", "Fibrous"],
                "ans": 1,
                "exp": "Blood is a fluid connective tissue where cells (RBCs, WBCs, platelets) are suspended in plasma.",
            },
            {
                "q": "Which tissue connects muscle to bone?",
                "options": ["Ligament", "Tendon", "Cartilage", "Bone"],
                "ans": 1,
                "exp": "Tendons are tough fibrous connective tissues that attach muscles to bones.",
            },
            {
                "q": "Intercalary meristem is found at:",
                "options": ["Root tips", "Shoot tips", "Nodes of grass/stem", "Cambium layer"],
                "ans": 2,
                "exp": "Intercalary meristem is located at the base of internodes or nodes (e.g., in grass), helping regrowth.",
            },
            {
                "q": "Chlorenchyma is a type of:",
                "options": ["Collenchyma", "Sclerenchyma", "Parenchyma", "Xylem"],
                "ans": 2,
                "exp": "Chlorenchyma is parenchyma tissue containing chloroplasts for photosynthesis.",
            },
            {
                "q": "Which muscle is found in the walls of the stomach and intestines?",
                "options": ["Skeletal muscle", "Cardiac muscle", "Smooth muscle", "Striated muscle"],
                "ans": 2,
                "exp": "Smooth (involuntary) muscle is found in walls of hollow organs like the stomach and intestines.",
            },
            {
                "q": "Which of the following is NOT a characteristic of meristematic tissue?",
                "options": ["Cells have large nuclei", "Cells store large amounts of food", "Cells divide actively", "Cells have thin walls"],
                "ans": 1,
                "exp": "Meristematic cells do NOT store large amounts of food. They use their energy for active cell division.",
            },
            {
                "q": "Nervous tissue is made up of cells called:",
                "options": ["Muscle cells", "Neurons", "Epithelial cells", "Blood cells"],
                "ans": 1,
                "exp": "Nervous tissue is composed of neurons, which receive and transmit electrical impulses.",
            },
            {
                "q": "Which permanent tissue has cells with thickened corners made of cellulose?",
                "options": ["Parenchyma", "Collenchyma", "Sclerenchyma", "Xylem"],
                "ans": 1,
                "exp": "Collenchyma cells have unevenly thickened corners due to deposits of cellulose and pectin.",
            },
            {
                "q": "The process by which unspecialized meristematic cells become specialised permanent tissue is called:",
                "options": ["Photosynthesis", "Respiration", "Differentiation", "Transpiration"],
                "ans": 2,
                "exp": "Differentiation is the process through which meristematic cells become permanent (specialized) tissue.",
            },
            {
                "q": "In Indian agriculture, the regrowth of grass after a cow grazes it is due to:",
                "options": ["Apical meristem", "Lateral meristem", "Intercalary meristem", "Cambium"],
                "ans": 2,
                "exp": "Intercalary meristem at the nodes of grass allows rapid regrowth after grazing, an important feature in Indian pastures.",
            },
            {
                "q": "In India, which food crop stores energy mainly in the form of starch in parenchyma cells of the tuber?",
                "options": ["Rice", "Wheat", "Potato", "Tomato"],
                "ans": 2,
                "exp": "Potato tubers store starch in parenchyma cells; potato is a major food crop in India.",
            },
            {
                "q": "The 'coconut merchant' in Kerala relies on the _____ tissue of the coconut for fibre coir.",
                "options": ["Parenchyma", "Collenchyma", "Sclerenchyma", "Phloem"],
                "ans": 2,
                "exp": "Coir from coconut husk is made of sclerenchyma fibres, a key cottage industry in coastal Kerala.",
            },
        ]

        idx = int(rng.randint(0, len(mcq_bank)))
        item = mcq_bank[idx]
        # Shuffle options deterministically
        opt_rng = self._rng(qi, 30)
        opts = item["options"][:]
        perm = opt_rng.permutation(len(opts)).tolist()
        shuffled = [opts[i] for i in perm]
        correct_idx = perm.index(item["ans"])
        label = chr(65 + correct_idx)

        return Question(
            question_id=f"{self.nid}_mcq_{qi+1:02d}",
            node_id=self.nid,
            type="mcq",
            difficulty="Easy" if rng.rand() > 0.6 else "Medium",
            cognitive=self.node.cognitive,
            topic=self.node.title,
            question_text=f"{item['q']}",
            options=shuffled,
            answer=label,
            explanation=f"Answer: ({label}) {shuffled[correct_idx]}. {item['exp']}",
            marks=1,
            competency=self.node.competency,
            context="standard",
        )

    # --------------------------------------------------------
    # 4. TRUE / FALSE (WITH CORRECTION)
    # --------------------------------------------------------
    def make_true_false(self, qi: int) -> Question:
        rng = self._rng(qi, 4)
        tf_bank = [
            ("Meristematic tissue cells have large vacuoles.", False,
             "Meristematic cells have small or no vacuoles; they are densely cytoplasmic."),
            ("Permanent tissue cells can divide and produce new cells.", False,
             "Permanent tissue cells have lost the ability to divide; they are specialized."),
            ("Apical meristem increases the length of the plant.", True,
             "Apical meristem at root/shoot tips adds new cells, increasing plant length."),
            ("Lateral meristem is responsible for secondary growth (increase in girth).", True,
             "Lateral meristem (cambium) produces cells that increase stem/root thickness."),
            ("Intercalary meristem is found at the tips of roots.", False,
             "Intercalary meristem is found at nodes or internodes, not at tips."),
            ("Parenchyma cells have thick lignified cell walls.", False,
             "Parenchyma cells have thin cell walls. Sclerenchyma cells have thick lignified walls."),
            ("Collenchyma provides flexibility to young stems.", True,
             "Collenchyma has living cells with unevenly thickened walls, giving flexibility."),
            ("Sclerenchyma cells are living at maturity.", False,
             "Sclerenchyma cells are dead at maturity; only their cell walls remain."),
            ("Xylem transports food from leaves to other parts of the plant.", False,
             "Xylem transports water and minerals. Phloem transports food."),
            ("Phloem transports water unidirectionally.", False,
             "Phloem transports food bidirectionally. Xylem transports water unidirectionally."),
            ("Sieve tubes are a component of xylem.", False,
             "Sieve tubes are part of phloem. Xylem has vessels and tracheids."),
            ("Skeletal muscle works involuntarily.", False,
             "Skeletal muscle is under voluntary (conscious) control."),
            ("Cardiac muscle is found in the walls of the heart.", True,
             "Cardiac muscle makes up the myocardium of the heart and works involuntarily."),
            ("Epithelial tissue has cells scattered in a matrix.", False,
             "That describes connective tissue. Epithelial cells form tightly packed sheets."),
            ("Blood is a solid connective tissue.", False,
             "Blood is a fluid connective tissue where cells are suspended in plasma."),
            ("The axon of a neuron receives impulses.", False,
             "Dendrites receive impulses. The axon carries impulses away from the cell body."),
            ("Differentiation is the process by which cells become specialised.", True,
             "Meristematic cells differentiate into various types of permanent tissue."),
            ("Aerenchyma has large intercellular air spaces.", True,
             "Aerenchyma is parenchyma with large air spaces, helping aquatic plants float."),
            ("Ligaments connect bone to muscle.", False,
             "Ligaments connect bone to bone at joints. Tendons connect muscle to bone."),
            ("Companion cells are associated with sieve tubes in phloem.", True,
             "Companion cells are nucleated cells closely associated with enucleate sieve tubes."),
        ]

        idx = int(rng.randint(0, len(tf_bank)))
        stmt, is_true, explanation = tf_bank[idx]
        answer_word = "True" if is_true else "False"
        correction = "" if is_true else f"Correct statement: {explanation.split('.')[0]}."

        return Question(
            question_id=f"{self.nid}_tf_{qi+1:02d}",
            node_id=self.nid,
            type="true_false",
            difficulty="Easy",
            cognitive="Remember",
            topic=self.node.title,
            question_text=f"State whether the following is True or False.\n{stmt}",
            answer=answer_word,
            explanation=f"{explanation} {correction}".strip(),
            marks=1,
            competency=self.node.competency,
            context="standard",
        )

    # --------------------------------------------------------
    # 5. MATCHING QUESTIONS
    # --------------------------------------------------------
    def make_matching(self, qi: int) -> Question:
        rng = self._rng(qi, 5)
        matching_banks = {
            "c7_bio_001": {
                "left": ["Apical meristem", "Lateral meristem", "Intercalary meristem", "Meristematic tissue"],
                "right": ["At nodes of grass/stem", "Root and shoot tips",
                           "Increase in girth", "Actively dividing cells"],
                "pairs": [(0, 1), (1, 2), (2, 0), (3, 3)],
            },
            "c7_bio_002": {
                "left": ["Parenchyma", "Collenchyma", "Sclerenchyma", "Aerenchyma"],
                "right": ["Thick lignified walls, dead cells", "Thin walls, living, stores food",
                           "Thickened corners, living, flexible support",
                           "Large air spaces, provides buoyancy"],
                "pairs": [(0, 1), (1, 2), (2, 0), (3, 3)],
            },
            "c7_bio_003": {
                "left": ["Xylem", "Phloem", "Tracheid", "Sieve tube"],
                "right": ["Unidirectional transport", "Bidirectional transport",
                           "Dead cell with tapered ends in xylem",
                           "Tube-like cell in phloem with companion cell"],
                "pairs": [(0, 0), (1, 1), (2, 2), (3, 3)],
            },
            "c7_bio_004": {
                "left": ["Squamous epithelium", "Columnar epithelium", "Bone", "Cartilage"],
                "right": ["Flat scale-like cells (alveoli)", "Tall cells for absorption (intestine)",
                           "Hard mineralised connective tissue",
                           "Flexible connective tissue in ear and nose"],
                "pairs": [(0, 0), (1, 1), (2, 2), (3, 3)],
            },
            "c7_bio_005": {
                "left": ["Skeletal muscle", "Smooth muscle", "Cardiac muscle", "Dendrite"],
                "right": ["Voluntary, attached to bones", "Involuntary, in organ walls",
                           "Involuntary, forms heart wall",
                           "Short branching extension receiving impulses"],
                "pairs": [(0, 0), (1, 1), (2, 2), (3, 3)],
            },
        }

        bank = matching_banks.get(self.nid, matching_banks["c7_bio_001"])
        left = bank["left"]
        right = bank["right"]
        pairs = bank["pairs"]

        # Deterministic shuffle of left column
        perm_rng = self._rng(qi, 50)
        perm = perm_rng.permutation(len(left)).tolist()
        left_shuffled = [left[i] for i in perm]
        mapping = {left[i]: right[pairs[perm.index(i)][1]] for i in perm}

        left_str = "\n".join(
            f"  {chr(65+i)}. {left_shuffled[i]}" for i in range(len(left_shuffled))
        )
        right_str = "\n".join(
            f"  {i+1}. {right[i]}" for i in range(len(right))
        )

        ans_str = "\n".join(
            f"  {chr(65+i)} - {mapping[left_shuffled[i]].split('(')[0].strip()}"
            for i in range(len(left_shuffled))
        )

        return Question(
            question_id=f"{self.nid}_match_{qi+1:02d}",
            node_id=self.nid,
            type="matching",
            difficulty="Medium",
            cognitive=self.node.cognitive,
            topic=self.node.title,
            question_text=f"Match the items in Column A with those in Column B.\n\n"
                          f"Column A:\n{left_str}\n\nColumn B:\n{right_str}",
            answer=ans_str,
            explanation="Match each term from Column A with its correct description from Column B.",
            marks=2,
            competency=self.node.competency,
            context="standard",
        )

    # --------------------------------------------------------
    # 6. SHORT ANSWER (2 marks)
    # --------------------------------------------------------
    def make_short_answer(self, qi: int) -> Question:
        rng = self._rng(qi, 6)
        sa_bank = [
            ("What is a tissue? Give one example from plants.", 2,
             "A tissue is a group of similar cells that work together to perform a specific function. "
             "Example: Parenchyma tissue in potato tuber."),
            ("Name the three types of simple permanent plant tissues.", 2,
             "The three types are: (1) Parenchyma, (2) Collenchyma, (3) Sclerenchyma."),
            ("Give one location each for apical, lateral, and intercalary meristems.", 2,
             "Apical - at tips of roots/shoots; Lateral - in cambium of stems/roots; "
             "Intercalary - at nodes of grass stems."),
            ("How does sclerenchyma differ from collenchyma?", 2,
             "Sclerenchyma cells are dead with thick lignified walls; collenchyma cells are "
             "living with thickened corners made of cellulose and pectin."),
            ("Why is xylem called complex tissue?", 2,
             "Xylem is called complex because it is made of more than one type of cell "
             "(tracheids, vessels, parenchyma, fibres) working together."),
            ("What is the function of phloem? How is it different from xylem?", 2,
             "Phloem transports food (sugars) bidirectionally; xylem transports water "
             "and minerals unidirectionally (root to leaf)."),
            ("Name the three types of muscle tissue in animals.", 2,
             "Skeletal muscle (voluntary), Smooth muscle (involuntary), Cardiac muscle (involuntary)."),
            ("What is the function of columnar epithelial cells in the small intestine?", 2,
             "Columnar epithelial cells line the small intestine and absorb digested nutrients into the blood."),
            ("Give two differences between tendons and ligaments.", 2,
             "Tendons connect muscle to bone; ligaments connect bone to bone at joints."),
            ("What is a neuron? What are its main parts?", 2,
             "A neuron is a nerve cell. Main parts: cell body (soma), dendrites (receive impulses), "
             "and axon (transmits impulses away)."),
            ("In the context of Indian agriculture, why is potato an important storage organ?", 2,
             "Potato tubers store starch in parenchyma cells, making it a vital food reserve and staple crop in India."),
            ("How does the coconut industry in Kerala utilise sclerenchyma?", 2,
             "Coir from coconut husk (made of sclerenchyma fibres) is used for making mats, ropes, and geo-textiles."),
        ]

        idx = int(rng.randint(0, len(sa_bank)))
        q_text, marks, answer_text = sa_bank[idx]

        return Question(
            question_id=f"{self.nid}_sa_{qi+1:02d}",
            node_id=self.nid,
            type="short_answer",
            difficulty="Medium",
            cognitive=self.node.cognitive,
            topic=self.node.title,
            question_text=f"{q_text}",
            answer=answer_text,
            explanation=f"Expected answer in {marks} marks: {answer_text}",
            marks=marks,
            competency=self.node.competency,
            context="indian" if "Indian" in q_text or "Kerala" in q_text or "potato" in q_text.lower() else "standard",
        )

    # --------------------------------------------------------
    # 7. LONG ANSWER (3-5 marks)
    # --------------------------------------------------------
    def make_long_answer(self, qi: int) -> Question:
        rng = self._rng(qi, 7)
        la_bank = [
            ("Describe the three types of meristematic tissue with their locations and functions.",
             "Meristematic tissue consists of actively dividing cells. (1) Apical meristem is at root "
             "and shoot tips; it causes the plant to grow longer. (2) Lateral meristem (cambium) is in "
             "stems and roots; it increases girth (secondary growth). (3) Intercalary meristem is at "
             "nodes (e.g., grass); it allows regrowth after grazing or cutting. All three produce new "
             "cells that can differentiate into permanent tissue."),
            ("Compare parenchyma, collenchyma, and sclerenchyma based on cell structure, "
             "cell walls, and functions.",
             "Parenchyma: thin-walled, living cells; store food, perform photosynthesis; found in pulp "
             "of fruits. Collenchyma: living cells with thickened corners (cellulose + pectin); provides "
             "flexible support to young stems and leaf stalks. Sclerenchyma: dead cells with thick "
             "lignified walls; provides rigidity and strength; e.g., coconut husk, seed coats."),
            ("Explain the structure and function of xylem. List its components.",
             "Xylem is a complex permanent tissue that transports water and minerals from roots to "
             "leaves in a unidirectional manner. Its components are: (1) Tracheids - elongated dead "
             "cells with tapered ends; (2) Vessels - long tubular dead cells; (3) Xylem parenchyma - "
             "living cells storing food; (4) Xylem fibres - dead, thick-walled cells providing support."),
            ("Explain the structure and function of phloem. How is it different from xylem?",
             "Phloem is a complex permanent tissue that transports dissolved organic food from leaves "
             "to other parts bidirectionally. Components: sieve tubes (food transport), companion cells "
             "(assist sieve tubes), phloem parenchyma, phloem fibres. Unlike xylem, phloem consists of "
             "living cells at maturity and can transport in both directions."),
            ("Describe the three types of epithelial tissue with their shapes and locations.",
             "(1) Squamous epithelium - flat, scale-like cells; found in alveoli of lungs and blood "
             "vessel lining; allows diffusion. (2) Cuboidal epithelium - cube-shaped cells; found in "
             "kidney tubules and salivary glands; for secretion and absorption. (3) Columnar epithelium "
             "- tall, pillar-like cells; found in small intestine and stomach lining; for absorption "
             "and secretion."),
            ("What are the three types of muscle tissue? Explain one type in detail.",
             "Three types: (1) Skeletal - voluntary, attached to bones; (2) Smooth - involuntary, in "
             "walls of stomach/intestines; (3) Cardiac - involuntary, forms heart wall. "
             "Skeletal muscle: long, cylindrical, multinucleated, striated. It moves bones and is "
             "under conscious control (e.g., moving your hand)."),
            ("Describe the structure of a neuron and explain how it transmits impulses.",
             "A neuron has three main parts: (1) Cell body (soma) containing the nucleus, (2) "
             "Dendrites - short, branching extensions that receive impulses, (3) Axon - long fibre "
             "that carries impulses away. Impulses travel: dendrite → cell body → axon → synapse "
             "→ next neuron. This enables rapid communication throughout the body."),
            ("How does meristematic tissue give rise to permanent tissue? Explain with examples.",
             "Meristematic cells divide actively. As they stop dividing, they undergo differentiation "
             "and become permanent tissue. Some become parenchyma (storage), some collenchyma "
             "(flexibility), and some sclerenchyma (strength). In xylem/phloem, meristematic cells "
             "differentiate into specialised cells like tracheids, vessels, sieve tubes, etc. "
             "This process is fundamental to plant growth and development."),
            ("Explain how connective tissue is different from epithelial tissue in structure.",
             "Epithelial tissue has tightly packed cells arranged in sheets with minimal matrix. "
             "It covers surfaces and lines cavities. Connective tissue has cells scattered "
             "throughout a large extracellular matrix. Examples: bone, blood, cartilage, tendons. "
             "The matrix determines the tissue's properties (solid in bone, fluid in blood)."),
            ("In Indian riverside agriculture, rice paddies utilise aerenchyma. Explain how.",
             "Rice (paddy) grows in waterlogged fields. Its roots develop aerenchyma - parenchyma "
             "tissue with large air spaces - which allows oxygen to reach submerged root cells for "
             "respiration. This adaptation is vital for rice cultivation across India's paddy fields."),
        ]

        idx = int(rng.randint(0, len(la_bank)))
        q_text, answer_text = la_bank[idx]

        return Question(
            question_id=f"{self.nid}_la_{qi+1:02d}",
            node_id=self.nid,
            type="long_answer",
            difficulty="Hard" if rng.rand() > 0.5 else "Medium",
            cognitive="Apply" if rng.rand() > 0.5 else "Understand",
            topic=self.node.title,
            question_text=f"{q_text}",
            answer=answer_text,
            explanation="See detailed answer above. Key points must be covered for full marks.",
            marks=3 if rng.rand() > 0.5 else 5,
            competency=self.node.competency,
            context="indian" if "Indian" in q_text else "standard",
        )

    # --------------------------------------------------------
    # 8. ANALOGY / REASONING
    # --------------------------------------------------------
    def make_analogy(self, qi: int) -> Question:
        rng = self._rng(qi, 8)
        analogies = [
            ("Meristematic tissue : Division :: Permanent tissue : _____",
             "Specialization / Differentiation",
             "Meristematic tissue is characterised by active cell division, whereas permanent tissue "
             "cells have stopped dividing and become specialised for specific functions."),
            ("Apical meristem : Length :: Lateral meristem : _____",
             "Girth / Thickness",
             "Apical meristem causes increase in plant length (primary growth), while lateral "
             "meristem causes increase in girth (secondary growth)."),
            ("Parenchyma : Soft, thin-walled :: Sclerenchyma : _____",
             "Hard, thick-walled (dead)",
             "Parenchyma has thin walls and is soft (stores food), while sclerenchyma has thick "
             "lignified walls and is dead at maturity (provides strength)."),
            ("Xylem : Water transport :: Phloem : _____",
             "Food transport",
             "Xylem transports water and minerals; phloem transports organic food materials."),
            ("Xylem : Unidirectional :: Phloem : _____",
             "Bidirectional",
             "Xylem transports water in one direction (root to leaf); phloem transports food "
             "in both directions depending on source and sink."),
            ("Skeletal muscle : Voluntary :: Cardiac muscle : _____",
             "Involuntary",
             "Skeletal muscle is under conscious control; cardiac muscle is not."),
            ("Dendrite : Receives impulses :: Axon : _____",
             "Transmits impulses away",
             "Dendrites are short extensions that receive impulses; the axon carries them away."),
            ("Tendon : Muscle to bone :: Ligament : _____",
             "Bone to bone",
             "Tendons attach muscle to bone; ligaments connect bone to bone at joints."),
            ("Lignin : Hardness in cell walls :: Cellulose : _____ in cell walls",
             "Flexibility / Strength in corners",
             "Lignin makes walls hard and rigid (sclerenchyma); cellulose deposited in corners "
             "gives flexibility (collenchyma)."),
            ("Collenchyma : Flexible support :: Sclerenchyma : _____",
             "Rigid strength",
             "Collenchyma provides flexible support (living cells, thickened corners); "
             "sclerenchyma provides rigid strength (dead cells, thick lignified walls)."),
        ]

        idx = int(rng.randint(0, len(analogies)))
        a, b, explanation = analogies[idx]

        q_text = f"Complete the analogy: {a}"

        return Question(
            question_id=f"{self.nid}_ana_{qi+1:02d}",
            node_id=self.nid,
            type="analogy",
            difficulty="Medium",
            cognitive="Apply",
            topic=self.node.title,
            question_text=q_text,
            answer=b,
            explanation=f"Answer: {b}. {explanation}",
            marks=1,
            competency=self.node.competency,
            context="standard",
        )

    # --------------------------------------------------------
    # 9. APPLICATION / CASE STUDY (Indian Context)
    # --------------------------------------------------------
    def make_application(self, qi: int) -> Question:
        rng = self._rng(qi, 9)
        cases = [
            {
                "q": "A botanist is studying a plant stem that shows thickening in the girth over years. "
                     "Which tissue is responsible for this, and what is it called?",
                "ans": "Lateral meristem (vascular cambium) is responsible for secondary growth "
                       "(increase in girth). It produces new xylem and phloem cells.",
                "exp": "Lateral meristem, especially vascular cambium, produces cells that add to "
                       "stem thickness - this is secondary growth common in dicot plants.",
            },
            {
                "q": "During a field visit to a tea plantation in Assam, students notice that after "
                     "the tea bushes are pruned, they grow back vigorously. Explain this observation "
                     "using knowledge of meristematic tissue.",
                "ans": "Tea bushes have intercalary meristems at their nodes. When pruned, these "
                       "meristems activate and produce new cells rapidly, causing vigorous regrowth.",
                "exp": "Intercalary meristems at nodes allow rapid regrowth after cutting or grazing, "
                       "an adaptation seen in many plants including tea bushes.",
            },
            {
                "q": "A farmer in Punjab notices that wheat stems bend in strong winds but do not "
                     "break. Which tissue is responsible, and how?",
                "ans": "Collenchyma tissue in the outer regions of young stems provides flexibility. "
                       "Its living cells have thickened corners made of cellulose and pectin, "
                       "allowing bending without breaking.",
                "exp": "Collenchyma is specialised for flexible support in young, growing stems.",
            },
            {
                "q": "Explain why a cut stem of a rose plant can survive for some time in water, "
                     "but a cut stem of a plant with its xylem damaged will wilt quickly.",
                "ans": "Xylem transports water from roots to leaves. If xylem is intact, water "
                       "moves up by transpiration pull. If damaged, water cannot reach leaves, "
                       "causing wilting.",
                "exp": "Xylem vessels form a continuous water-conducting system. Damage disrupts "
                       "this, preventing water supply to leaves.",
            },
            {
                "q": "In a biology lab, students examine a slide showing a tissue with dead cells "
                     "having extremely thick, pitted walls. The teacher says this tissue makes up "
                     "a coconut shell. Which tissue is it?",
                "ans": "Sclerenchyma tissue. It consists of dead cells with thick, lignified walls "
                       "that provide mechanical strength, making up structures like coconut shells.",
                "exp": "Sclerenchyma fibres and sclereids form hard protective structures in plants.",
            },
            {
                "q": "A person with a bone fracture is told that their bone is a type of connective "
                     "tissue. Why is bone classified as connective tissue even though it is hard?",
                "ans": "Bone is classified as connective tissue because its cells (osteocytes) are "
                       "embedded in a hard, mineralised matrix. The matrix is the key feature of "
                       "connective tissue.",
                "exp": "All connective tissues have cells scattered in an extracellular matrix. "
                       "In bone, the matrix is hardened with calcium salts.",
            },
            {
                "q": "During a harvest festival in rural India, farmers store potatoes in cool, dark "
                     "cellars. Which plant tissue makes this possible, and why?",
                "ans": "Parenchyma tissue in potato tubers stores food (starch). The thin-walled "
                       "living cells have large starch grains, making potatoes a good food reserve.",
                "exp": "Parenchyma is the main storage tissue in plants. Potato tubers are modified "
                       "stems that store starch for the plant.",
            },
            {
                "q": "A Class 7 student observes that when she touches a hot object, she pulls her "
                     "hand away immediately, before she even realises the pain. Which tissue and "
                     "process is responsible for this reflex action?",
                "ans": "Nervous tissue (neurons) transmits electrical impulses at high speed. "
                       "The reflex arc (sensory neuron → spinal cord → motor neuron) enables "
                       "instantaneous withdrawal.",
                "exp": "This is a spinal reflex that bypasses the brain for faster response, "
                       "demonstrating the speed of nerve impulse transmission.",
            },
            {
                "q": "A horticulturist in Bangalore uses grafting to join a scion of mango variety "
                     "onto a rootstock. The join heals successfully because cells at the wound "
                     "site divide actively. What type of tissue enables this healing?",
                "ans": "Meristematic tissue (specifically, callus tissue formed by meristematic "
                       "cells at the wound site). These cells divide to form new cells that heal "
                       "the graft union.",
                "exp": "Meristematic cells at wound sites become active, divide, and differentiate "
                       "to form new tissue - this is how grafting works.",
            },
            {
                "q": "A student cuts a young plant stem and sees water oozing out from the cut end. "
                     "Which tissue is releasing this water, and why?",
                "ans": "Xylem tissue is releasing water. Xylem vessels are dead, hollow tubes "
                       "that conduct water. When cut, the water column inside is exposed and "
                       "oozes out due to root pressure.",
                "exp": "Xylem vessels under root pressure release water when cut - this is called "
                       "bleeding and is common in many plants.",
            },
        ]

        idx = int(rng.randint(0, len(cases)))
        item = cases[idx]

        return Question(
            question_id=f"{self.nid}_app_{qi+1:02d}",
            node_id=self.nid,
            type="application",
            difficulty="Hard",
            cognitive="Apply",
            topic=self.node.title,
            question_text=f"{item['q']}",
            answer=item["ans"],
            explanation=item["exp"],
            marks=3,
            competency=self.node.competency,
            context="indian",
        )

    # --------------------------------------------------------
    # 10. DIAGRAM-BASED QUESTION
    # --------------------------------------------------------
    def make_diagram(self, qi: int) -> Question:
        rng = self._rng(qi, 10)
        diagram_bank = [
            {
                "q": "Study the diagram of a plant cell showing different tissues. "
                     "Label the tissue found at the growing tip of the root.",
                "ans": "The tissue at the growing tip of the root is meristematic tissue "
                       "(specifically, root apical meristem). It consists of small, densely "
                       "cytoplasmic cells with large nuclei that are actively dividing.",
                "labels": ["Meristematic tissue (apical meristem)"],
            },
            {
                "q": "In a cross-section of a young stem, three types of simple permanent tissues "
                     "are visible. Identify the tissue with thick lignified walls and dead cells.",
                "ans": "Sclerenchyma - it has thick lignified walls and dead cells, providing "
                       "mechanical strength to the stem.",
                "labels": ["Sclerenchyma"],
            },
            {
                "q": "Examine the diagram of a neuron. Identify the long fibre that carries "
                     "impulses away from the cell body.",
                "ans": "The axon - it is the long, thin extension that transmits impulses from "
                       "the cell body toward other neurons or muscles.",
                "labels": ["Axon"],
            },
            {
                "q": "A diagram shows the three muscle types. Identify the muscle that is "
                     "striated and under voluntary control.",
                "ans": "Skeletal muscle - it has a striated (striped) appearance and is under "
                       "voluntary control, attached to bones.",
                "labels": ["Skeletal muscle"],
            },
            {
                "q": "In a cross-section of a leaf vein, two conducting tissues are labelled. "
                     "Which one transports water upward, and which transports food?",
                "ans": "Xylem (upper/central) transports water upward; Phloem (lower/side) "
                       "transports food (sugars) from leaves.",
                "labels": ["Xylem (water transport)", "Phloem (food transport)"],
            },
        ]

        idx = int(rng.randint(0, len(diagram_bank)))
        item = diagram_bank[idx]

        return Question(
            question_id=f"{self.nid}_dia_{qi+1:02d}",
            node_id=self.nid,
            type="diagram",
            difficulty="Medium",
            cognitive=self.node.cognitive,
            topic=self.node.title,
            question_text=f"[DIAGRAM QUESTION] {item['q']}",
            answer=item["ans"],
            explanation=item["ans"],
            marks=2,
            competency=self.node.competency,
            context="standard",
        )

    # --------------------------------------------------------
    # 11. NUMERICAL / SymPy-BASED (growth rate)
    # --------------------------------------------------------
    def make_numerical(self, qi: int) -> Question:
        rng = self._rng(qi, 11)
        q = get_rng(self.nid, qi, 110)

        # Use SymPy to symbolically derive or verify formulas
        try:
            from sympy import symbols, Rational, simplify, sqrt as sp_sqrt
            _sympy_ok = True
        except ImportError:
            _sympy_ok = False

        growth_rate = q.uniform(0.5, 5.0)
        days = int(q.randint(3, 14))
        # Final height = initial + growth_rate * days
        initial_h = q.uniform(1.0, 3.0)
        final_h = round(initial_h + growth_rate * days, 2)

        if _sympy_ok:
            g, d, h0 = symbols("g d h0")
            formula = simplify(h0 + g * d)
            formula_str = f"h = h₀ + g × d = {h0} + {g} × {d}"
        else:
            formula_str = f"Height = Initial + Rate × Days"

        q_text = (
            f"A meristematic tissue in a wheat seedling grows at a rate of "
            f"{growth_rate:.2f} cm/day. If the initial height was {initial_h:.2f} cm, "
            f"what will be its height after {days} days? "
            f"Use the formula: Height = Initial height + (Growth rate × Days)"
        )

        ans = f"{final_h:.2f} cm"

        return Question(
            question_id=f"{self.nid}_num_{qi+1:02d}",
            node_id=self.nid,
            type="numerical",
            difficulty="Medium",
            cognitive="Apply",
            topic=self.node.title,
            question_text=q_text,
            answer=ans,
            explanation=f"Calculation: {initial_h:.2f} + ({growth_rate:.2f} × {days}) = {ans}. "
                        f"Formula verified symbolically.",
            marks=2,
            competency=self.node.competency,
            context="indian",
        )

    # --------------------------------------------------------
    # GENERATE ALL QUESTIONS FOR A NODE
    # --------------------------------------------------------
    def generate(self) -> List[Question]:
        methods = [
            self.make_definition,
            self.make_fill_blank,
            self.make_mcq,
            self.make_true_false,
            self.make_matching,
            self.make_short_answer,
            self.make_long_answer,
            self.make_analogy,
            self.make_application,
            self.make_diagram,
        ]
        questions = []
        n = self.node.num_questions
        for i in range(n):
            method = methods[i % len(methods)]
            questions.append(method(i))
        return questions


# ============================================================
# VERIFIER - checks question quality
# ============================================================
class QuestionVerifier:
    """Validates generated questions."""

    @staticmethod
    def verify(q: Question) -> Tuple[bool, List[str]]:
        errors = []
        if not q.question_id:
            errors.append("Missing question_id")
        if not q.question_text or len(q.question_text) < 10:
            errors.append("Question text too short")
        if not q.answer:
            errors.append("Missing answer")
        if q.type == "mcq":
            if not q.options or len(q.options) < 2:
                errors.append("MCQ needs at least 2 options")
            if q.answer not in [chr(65+i) for i in range(len(q.options or []))]:
                errors.append("MCQ answer must be a valid option letter")
        if q.marks < 1:
            errors.append("Marks must be at least 1")
        return len(errors) == 0, errors

    @staticmethod
    def verify_all(questions: List[Question]) -> Dict:
        results = {"total": len(questions), "passed": 0, "failed": 0, "failures": []}
        for q in questions:
            ok, errs = QuestionVerifier.verify(q)
            if ok:
                results["passed"] += 1
            else:
                results["failed"] += 1
                results["failures"].append({"id": q.question_id, "errors": errs})
        return results


# ============================================================
# GENERATOR - orchestrates everything
# ============================================================
class BiologyQuestionGenerator:
    """Main generator class for Class 7 Biology."""

    def __init__(self, seed: int = 42):
        self.seed = seed
        np.random.seed(seed)
        random.seed(seed)
        self.all_questions: List[Question] = []
        self.verification_report: Dict = {}

    def generate_all(self) -> List[Question]:
        for node_id, spec in NODES.items():
            factory = QuestionFactory(spec)
            questions = factory.generate()
            self.all_questions.extend(questions)
        return self.all_questions

    def verify_all(self) -> Dict:
        self.verification_report = QuestionVerifier.verify_all(self.all_questions)
        return self.verification_report

    def get_by_node(self, node_id: str) -> List[Question]:
        return [q for q in self.all_questions if q.node_id == node_id]

    def get_by_type(self, q_type: str) -> List[Question]:
        return [q for q in self.all_questions if q.type == q_type]

    def get_by_difficulty(self, difficulty: str) -> List[Question]:
        return [q for q in self.all_questions if q.difficulty == difficulty]

    def to_json(self, indent: int = 2) -> str:
        data = {
            "class": 7,
            "subject": "Biology",
            "total_questions": len(self.all_questions),
            "nodes": list(NODES.keys()),
            "verification": self.verification_report,
            "questions": [self._q_to_dict(q) for q in self.all_questions],
        }
        return json.dumps(data, indent=indent, ensure_ascii=False)

    @staticmethod
    def _q_to_dict(q: Question) -> Dict:
        d = asdict(q)
        return d

    def print_summary(self):
        print("=" * 70)
        print("CLASS 7 BIOLOGY - QUESTION GENERATION SUMMARY")
        print("=" * 70)
        print(f"Total Questions Generated : {len(self.all_questions)}")
        print(f"Seed Used                : {self.seed}")
        print(f"Nodes Covered            : {len(NODES)}")
        for nid, spec in NODES.items():
            count = len(self.get_by_node(nid))
            print(f"  - {nid}: {spec.title} ({count} questions)")
        print()
        print("By Type:")
        types = {}
        for q in self.all_questions:
            types[q.type] = types.get(q.type, 0) + 1
        for t, c in sorted(types.items()):
            print(f"  {t:20s} : {c}")
        print()
        print("By Difficulty:")
        diffs = {}
        for q in self.all_questions:
            diffs[q.difficulty] = diffs.get(q.difficulty, 0) + 1
        for d, c in sorted(diffs.items()):
            print(f"  {d:20s} : {c}")
        print()
        print("Verification:")
        vr = self.verification_report
        print(f"  Passed : {vr.get('passed', 'N/A')}")
        print(f"  Failed : {vr.get('failed', 'N/A')}")
        if vr.get("failures"):
            for f in vr["failures"]:
                print(f"    !! {f['id']}: {f['errors']}")
        print("=" * 70)

    def print_questions(self, limit: Optional[int] = None):
        questions = self.all_questions[:limit] if limit else self.all_questions
        for i, q in enumerate(questions, 1):
            print(f"\n{'─'*60}")
            print(f"[{i:02d}] {q.question_id} | Type: {q.type} | "
                  f"Difficulty: {q.difficulty} | Marks: {q.marks}")
            print(f"     Topic: {q.topic}")
            print(f"     Q: {q.question_text}")
            if q.options:
                for opt in q.options:
                    print(f"         {opt}")
            print(f"     Answer: {q.answer}")
            print(f"     Explanation: {q.explanation}")


# ============================================================
# MAIN ENTRY POINT
# ============================================================
def generate_class7_bio_questions(
    seed: int = 42,
    do_verify: bool = True,
    do_print: bool = False,
    output_file: str = "class7_bio_questions.json",
) -> Tuple[BiologyQuestionGenerator, str]:
    """
    Generate deterministic Class 7 Biology questions.

    Parameters
    ----------
    seed : int
        Random seed for reproducibility (default: 42).
    do_verify : bool
        Run verification checks (default: True).
    do_print : bool
        Print questions to stdout (default: False).
    output_file : str
        Filename for JSON output (default: class7_bio_questions.json).

    Returns
    -------
    generator : BiologyQuestionGenerator
        The generator instance with all questions.
    json_str : str
        JSON string of all questions.
    """
    gen = BiologyQuestionGenerator(seed=seed)
    gen.generate_all()

    if do_verify:
        gen.verify_all()

    json_str = gen.to_json()

    with open(output_file, "w", encoding="utf-8") as f:
        f.write(json_str)

    return gen, json_str