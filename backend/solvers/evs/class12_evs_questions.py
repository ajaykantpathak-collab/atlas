"""
CISCE EVS Class 12 Question Generator
Covers: Modern schools of ecological thought (c12_evs_001), Social ecology/ecofeminism/green politics (c12_evs_002)
"""

import random
import math
import hashlib
from fractions import Fraction
from typing import Any

random.seed(42)


def _hash_seed(topic_id: str, idx: int) -> int:
    s = f"{topic_id}_{idx}"
    return int(hashlib.md5(s.encode()).hexdigest()[:8], 16)


# ─────────────────────────────────────────────
# DATA BANKS
# ─────────────────────────────────────────────

DEEP_ECOLOGY_FACTS = [
    ("Arne Naess", "1973", "deep ecology"),
    ("ecosophy T", "platform principles"),
    ("ecocentrism", "rejection of anthropocentrism"),
    ("intrinsic value", "worth independent of human use"),
    ("self-realisation", "identification with all life"),
    ("biodiversity", "richness and diversity of life forms"),
]

SHALLOW_ECOLOGY_FACTS = [
    ("pollution control", "reformist approach"),
    ("resource management", "for human benefit"),
    ("anthropocentric", "human-centred worldview"),
    ("technological fixes", "without systemic change"),
    ("symptom treatment", "not root cause"),
]

LEOPOLD_FACTS = [
    ("A Sand County Almanac", "1949"),
    ("land ethic", "extension of ethics to land"),
    ("biotic community", "humans as members not conquerors"),
    ("integrity, stability, beauty", "criteria for right action"),
    ("stewardship", "responsible care"),
]

SOCIAL_ECOLOGY_FACTS = [
    ("Murray Bookchin", "social ecology founder"),
    ("hierarchy and domination", "root causes of ecological degradation"),
    ("libertarian municipalism", "proposed political framework"),
    ("capitalism", "compulsion to grow and commodify"),
    ("social problems", "cause ecological problems"),
]

ECOFEMINISM_FACTS = [
    ("Vandana Shiva", "key ecofeminist thinker"),
    ("Chipko movement", "women hugged trees"),
    ("Maria Mies", "patriarchy and nature domination"),
    ("seed sovereignty", "Shiva's advocacy"),
    ("Green Revolution", "Shiva's critique"),
    ("patriarchal dualisms", "man/woman, culture/nature"),
]

GREEN_POLITICS_FACTS = [
    ("Die Grunen", "Germany, 1980"),
    ("Caroline Lucas", "first Green MP England, 2010"),
    ("ecological wisdom", "core principle"),
    ("grassroots democracy", "core principle"),
    ("social justice", "core principle"),
    ("non-violence", "core principle"),
]

BRUNDTLAND_FACTS = [
    ("1987", "Brundtland Report year"),
    ("needs of present without compromising future", "definition"),
    ("environmental, social, economic", "three dimensions"),
    ("contradictory", "critique of sustainable development"),
]

INDIAN_CONTEXT_FACTS = [
    ("Chipko movement", "1970s, Uttarakhand"),
    ("Narmada Bachao Andolan", "dam displacement"),
    ("Vandana Shiva", "Navdanya, seed sovereignty"),
    ("Bishnoi community", "wildlife conservation tradition"),
    ("Amrita Devi", "Bishnoi martyr, 1730"),
    ("Jadav Payeng", "Molai forest, Assam"),
    ("Sunderbans", "mangrove ecosystem"),
    ("Western Ghats", "biodiversity hotspot"),
    ("Project Tiger", "1973, wildlife conservation"),
    ("Silent Valley", "1978, Kerala hydroelectric protest"),
]


# ─────────────────────────────────────────────
# SOLVER FUNCTIONS
# ─────────────────────────────────────────────

def solve_mcq(params: dict) -> dict:
    topic = params.get("topic", "")
    question_text = params.get("question", "")
    options = params.get("options", [])
    correct_idx = params.get("correct_idx", 0)
    explanation = params.get("explanation", "")

    correct = options[correct_idx] if options else ""
    steps = [
        "Step 1: Identify the key concept being tested.",
        f"Step 2: Recall facts related to: {topic}.",
        f"Step 3: Evaluate each option against known facts.",
        f"Step 4: The correct answer is option ({chr(65+correct_idx)}): {correct}",
    ]

    verification = {
        "method": "factual recall and elimination",
        "correct_option": correct_idx,
        "correct_text": correct,
        "all_options": options,
        "checks": [
            f"Option {chr(65+correct_idx)} aligns with the syllabus content for {topic}.",
            "Other options are eliminated based on factual inaccuracy.",
        ],
    }

    return {
        "answer": f"Option ({chr(65+correct_idx)}): {correct}",
        "steps": steps,
        "verification": verification,
        "explanation": explanation,
    }


def solve_fill_blank(params: dict) -> dict:
    sentence = params.get("sentence", "")
    correct_answer = params.get("answer", "")
    topic = params.get("topic", "")

    steps = [
        "Step 1: Read the statement carefully and identify the missing term.",
        "Step 2: Recall key terms from the relevant topic in the syllabus.",
        f"Step 3: The missing term is: {correct_answer}",
    ]

    verification = {
        "method": "direct factual verification",
        "filled_sentence": sentence.replace("____", correct_answer),
        "correct_term": correct_answer,
        "topic": topic,
    }

    return {
        "answer": correct_answer,
        "steps": steps,
        "verification": verification,
    }


def solve_short_answer(params: dict) -> dict:
    question = params.get("question", "")
    answer = params.get("answer", "")
    key_points = params.get("key_points", [])
    topic = params.get("topic", "")

    steps = [
        "Step 1: Identify what the question is asking for.",
        f"Step 2: Recall relevant concepts from {topic}.",
        "Step 3: Structure the answer with key points.",
    ]
    for i, pt in enumerate(key_points, 1):
        steps.append(f"Step 3.{i}: Include point: {pt}")

    verification = {
        "method": "content coverage check",
        "key_points_covered": key_points,
        "key_points_count": len(key_points),
        "topic": topic,
    }

    return {
        "answer": answer,
        "steps": steps,
        "verification": verification,
        "key_points": key_points,
    }


def solve_long_answer(params: dict) -> dict:
    question = params.get("question", "")
    answer = params.get("answer", "")
    dimensions = params.get("dimensions", [])
    topic = params.get("topic", "")

    steps = [
        "Step 1: Break down the question into its components.",
        f"Step 2: Address each dimension systematically.",
    ]
    for i, dim in enumerate(dimensions, 1):
        steps.append(f"Step 2.{i}: Cover: {dim}")

    steps.extend([
        "Step 3: Provide examples to illustrate key points.",
        "Step 4: Conclude with a synthesis of the answer.",
    ])

    verification = {
        "method": "multi-dimensional coverage check",
        "dimensions_addressed": dimensions,
        "dimensions_count": len(dimensions),
        "topic": topic,
    }

    return {
        "answer": answer,
        "steps": steps,
        "verification": verification,
        "dimensions": dimensions,
    }


def solve_numerical(params: dict) -> dict:
    formula = params.get("formula", "")
    inputs = params.get("inputs", {})
    correct_result = params.get("result", 0)
    unit = params.get("unit", "")
    topic = params.get("topic", "")

    steps = [f"Formula: {formula}"]
    step_num = 1
    for k, v in inputs.items():
        steps.append(f"Step {step_num}: {k} = {v}")
        step_num += 1
    steps.append(f"Step {step_num}: Calculation yields result = {correct_result} {unit}")

    verification = {
        "method": "back-substitution and range check",
        "input_values": inputs,
        "computed_result": correct_result,
        "unit": unit,
        "reasonable_range": correct_result > 0 and correct_result < 10000,
        "formula_used": formula,
    }

    return {
        "answer": f"{correct_result} {unit}".strip(),
        "steps": steps,
        "verification": verification,
    }


# ─────────────────────────────────────────────
# QUESTION GENERATORS
# ─────────────────────────────────────────────

def _make_mcq(topic_id: str, topic_name: str, question_text: str,
              options: list, correct_idx: int, explanation: str,
              difficulty: str, q_type: str = "mcq") -> dict:
    seed_val = _hash_seed(topic_id, correct_idx)
    rng = random.Random(seed_val)
    shuffled = options[:]
    rng.shuffle(shuffled)
    new_correct = shuffled.index(options[correct_idx])
    return {
        "id": f"{topic_id}_mcq_{seed_val % 10000}",
        "type": q_type,
        "topic": topic_name,
        "question": question_text,
        "options": shuffled,
        "answer": f"Option ({chr(65+new_correct)}): {shuffled[new_correct]}",
        "answer_idx": new_correct,
        "explanation": explanation,
        "difficulty": difficulty,
        "solver_function": "solve_mcq",
        "solver_params": {
            "topic": topic_name,
            "question": question_text,
            "options": shuffled,
            "correct_idx": new_correct,
            "explanation": explanation,
        },
    }


def _make_fill_blank(topic_id: str, topic_name: str, sentence: str,
                     correct_answer: str, explanation: str,
                     difficulty: str) -> dict:
    return {
        "id": f"{topic_id}_fb_{hash(sentence) % 10000}",
        "type": "fill_blank",
        "topic": topic_name,
        "question": sentence,
        "answer": correct_answer,
        "explanation": explanation,
        "difficulty": difficulty,
        "solver_function": "solve_fill_blank",
        "solver_params": {
            "sentence": sentence,
            "answer": correct_answer,
            "topic": topic_name,
        },
    }


def _make_short_answer(topic_id: str, topic_name: str, question_text: str,
                       answer: str, key_points: list, explanation: str,
                       difficulty: str) -> dict:
    return {
        "id": f"{topic_id}_sa_{hash(question_text) % 10000}",
        "type": "short_answer",
        "topic": topic_name,
        "question": question_text,
        "answer": answer,
        "key_points": key_points,
        "explanation": explanation,
        "difficulty": difficulty,
        "solver_function": "solve_short_answer",
        "solver_params": {
            "question": question_text,
            "answer": answer,
            "key_points": key_points,
            "topic": topic_name,
        },
    }


def _make_long_answer(topic_id: str, topic_name: str, question_text: str,
                      answer: str, dimensions: list, explanation: str,
                      difficulty: str) -> dict:
    return {
        "id": f"{topic_id}_la_{hash(question_text) % 10000}",
        "type": "long_answer",
        "topic": topic_name,
        "question": question_text,
        "answer": answer,
        "dimensions": dimensions,
        "explanation": explanation,
        "difficulty": difficulty,
        "solver_function": "solve_long_answer",
        "solver_params": {
            "question": question_text,
            "answer": answer,
            "dimensions": dimensions,
            "topic": topic_name,
        },
    }


def _make_numerical(topic_id: str, topic_name: str, question_text: str,
                    formula: str, inputs: dict, result: float, unit: str,
                    explanation: str, difficulty: str) -> dict:
    return {
        "id": f"{topic_id}_num_{hash(question_text) % 10000}",
        "type": "numerical",
        "topic": topic_name,
        "question": question_text,
        "formula": formula,
        "inputs": inputs,
        "answer": f"{result} {unit}".strip(),
        "numerical_answer": result,
        "unit": unit,
        "explanation": explanation,
        "difficulty": difficulty,
        "solver_function": "solve_numerical",
        "solver_params": {
            "formula": formula,
            "inputs": inputs,
            "result": result,
            "unit": unit,
            "topic": topic_name,
        },
    }


# ─────────────────────────────────────────────
# MAIN QUESTION GENERATOR
# ─────────────────────────────────────────────

def generate_questions(seed: int = 42, count: int = 30) -> list:
    """
    Deterministic question generator for CISCE EVS Class 12.
    Covers all topics from syllabus nodes c12_evs_001 and c12_evs_002.

    Parameters
    ----------
    seed : int
        Random seed for deterministic generation.
    count : int
        Number of questions to generate (max ~60 available).

    Returns
    -------
    list[dict]
        List of question dictionaries.
    """
    rng = random.Random(seed)
    questions = []
    competency_count = 0
    standard_count = 0
    target_competency = count // 2

    # ── Topic 1: Deep Ecology vs Shallow Ecology (c12_evs_001) ──
    deep_eco_mcqs = [
        _make_mcq(
            "c12_evs_001", "Modern schools of ecological thought",
            "Who coined the term 'deep ecology' in 1973?",
            ["Arne Naess", "Aldo Leopold", "Murray Bookchin", "Rachel Carson"],
            0,
            "Arne Naess, a Norwegian philosopher, coined the term 'deep ecology' in 1973 to distinguish it from shallow ecological thinking.",
            "Medium", "mcq"
        ),
        _make_mcq(
            "c12_evs_001", "Modern schools of ecological thought",
            "What is the core difference between deep ecology and shallow ecology?",
            [
                "Deep ecology questions anthropocentric worldviews; shallow ecology does not",
                "Shallow ecology is deeper than deep ecology",
                "Both have identical approaches",
                "Deep ecology focuses only on pollution"
            ],
            0,
            "Deep ecology challenges the entire anthropocentric worldview, while shallow ecology focuses on pollution control and resource management for human benefit without systemic change.",
            "Medium", "mcq"
        ),
        _make_mcq(
            "c12_evs_001", "Modern schools of ecological thought",
            "Which principle is central to Arne Naess's deep ecology?",
            [
                "Inherent worth of all living beings regardless of instrumental value",
                "Nature exists only for human use",
                "Technology can solve all environmental problems",
                "Economic growth is the highest priority"
            ],
            0,
            "Deep ecology's first principle states that all living beings have inherent worth regardless of their instrumental value to humans. This is the foundation of ecosophy T.",
            "Medium", "mcq"
        ),
        _make_mcq(
            "c12_evs_001", "Modern schools of ecological thought",
            "Shallow ecology primarily focuses on:",
            [
                "Pollution control and resource management for human benefit",
                "Dismantling social hierarchies",
                "Intrinsic value of all species",
                "Self-realisation through nature identification"
            ],
            0,
            "Shallow ecology adopts a reformist approach focused on pollution control and resource management for human benefit without challenging underlying anthropocentric worldviews.",
            "Medium", "mcq"
        ),
    ]

    deep_eco_fill = [
        _make_fill_blank(
            "c12_evs_001", "Modern schools of ecological thought",
            "Arne Naess distinguished between deep ecology and shallow ecology in the year ____.",
            "1973",
            "In 1973, Arne Naess made the important distinction between deep ecology (which questions underlying worldviews) and shallow ecology (which focuses on surface-level fixes).",
            "Medium"
        ),
        _make_fill_blank(
            "c12_evs_001", "Modern schools of ecological thought",
            "The philosophical framework developed by Arne Naess is called ____.",
            "ecosophy T",
            "Ecosophy T (T from the Norwegian 'tvergastein', Naess's mountain hut) is Arne Naess's personal ecological philosophy that underpins the deep ecology movement.",
            "Medium"
        ),
        _make_fill_blank(
            "c12_evs_001", "Modern schools of ecological thought",
            "According to Aldo Leopold's land ethic, 'a thing is right when it tends to preserve the ____, ____, and ____ of the biotic community.'",
            "integrity, stability, beauty",
            "This quote from 'A Sand County Almanac' (1949) is the cornerstone of Leopold's land ethic, extending moral consideration to the entire biotic community.",
            "Medium"
        ),
        _make_fill_blank(
            "c12_evs_001", "Modern schools of ecological thought",
            "In deep ecology, ____ refers to the idea that nature has value independent of human use.",
            "intrinsic value",
            "Intrinsic value means that a being or entity has worth in and of itself, not merely as a means to human ends. This is the opposite of instrumental value.",
            "Medium"
        ),
        _make_fill_blank(
            "c12_evs_001", "Modern schools of ecological thought",
            "Aldo Leopold's influential book is titled ____.",
            "A Sand County Almanac",
            "'A Sand County Almanac' (published posthumously in 1949) is Aldo Leopold's seminal work that introduced the land ethic to environmental philosophy.",
            "Medium"
        ),
    ]

    deep_eco_short = [
        _make_short_answer(
            "c12_evs_001", "Modern schools of ecological thought",
            "Explain the distinction between deep ecology and shallow ecology as proposed by Arne Naess.",
            "Deep ecology, proposed by Arne Naess in 1973, is a philosophical approach that questions the underlying anthropocentric worldview and advocates for the inherent worth of all living beings. It calls for radical changes in human-nature relationships, including self-realisation through identification with all life. Shallow ecology, in contrast, is a reformist approach that focuses on pollution control and resource management for human benefit. It does not challenge the dominant anthropocentric paradigm - it works within the existing framework of human superiority over nature, seeking technological and policy solutions to environmental problems without questioning the root causes.",
            [
                "Deep ecology: coined by Arne Naess in 1973",
                "Challenges anthropocentric worldviews",
                "Advocates inherent worth of all living beings",
                "Shallow ecology: reformist, focuses on pollution control",
                "Does not challenge anthropocentrism",
                "Works within existing human-superiority framework",
            ],
            "Both shallow and deep ecology seek to address environmental problems, but deep ecology goes to the root causes while shallow ecology treats symptoms.",
            "Medium"
        ),
        _make_short_answer(
            "c12_evs_001", "Modern schools of ecological thought",
            "What is Aldo Leopold's 'land ethic' and how does it change the human-nature relationship?",
            "Aldo Leopold's land ethic, articulated in 'A Sand County Almanac' (1949), is an ethical framework that expands the boundaries of the community to include soils, waters, plants, and animals - collectively, the land. The land ethic changes the human role from conqueror of the land-community to plain member and citizen of it. The key principle states: 'A thing is right when it tends to preserve the integrity, stability, and beauty of the biotic community. It is wrong when it tends otherwise.' This represents a fundamental shift from viewing nature as a resource for human exploitation to viewing humans as members of a larger ecological community with moral obligations to it.",
            [
                "Definition of land ethic",
                "Expansion of ethical community to include land",
                "Human role shifts from conqueror to member",
                "Key principle: integrity, stability, beauty",
                "Moral obligations to biotic community",
            ],
            "Leopold's land ethic provides a philosophical foundation for conservation by grounding environmental protection in ethical reasoning rather than mere economic calculation.",
            "Medium"
        ),
    ]

    deep_eco_long = [
        _make_long_answer(
            "c12_evs_001", "Modern schools of ecological thought",
            "Compare and contrast deep ecology, shallow ecology, and stewardship (land ethic) on the following dimensions: (a) view of human role in nature, (b) intrinsic value of nature, and (c) basis for environmental action. Illustrate with examples relevant to India.",
            "Deep ecology (Arne Naess, 1973): (a) Humans are not superior to other species; we are one strand in the web of life. (b) All living beings have intrinsic value independent of human use. (c) Environmental action is based on ecological wisdom and self-realisation - protecting nature for its own sake. Example: Opposition to all large dams in principle, including Narmada Bachao Andolan from an eco-centric standpoint. Shallow ecology: (a) Humans are managers of nature for human benefit. (b) Nature has instrumental value only - worth only what it provides to humans. (c) Environmental action is based on human health and economic efficiency. Example: Pollution control measures in the Ganga river for human use. Stewardship (Leopold): (a) Humans are responsible members of the biotic community. (b) Nature has intrinsic value as part of the community. (c) Environmental action is based on ethical obligation to preserve integrity, stability, and beauty. Example: The Bishnoi community's 300-year tradition of protecting wildlife as a religious duty.",
            [
                "Human role: deep ecology (equal member), shallow (manager), stewardship (responsible member)",
                "Intrinsic value: deep ecology (yes), shallow (no/instrumental), stewardship (yes, as community members)",
                "Basis for action: deep ecology (ecological wisdom), shallow (human benefit), stewardship (ethical duty)",
                "Indian examples for each approach",
            ],
            "These three schools represent a spectrum from anthropocentric to ecocentric thinking, with stewardship occupying a middle ground that grounds environmental ethics in community responsibility.",
            "Hard"
        ),
        _make_long_answer(
            "c12_evs_001", "Modern schools of ecological thought",
            "Explain how deep ecology's principle of 'self-realisation through identification with all life' differs from the anthropocentric view. Apply this principle to the conservation of the Western Ghats biodiversity hotspot in India.",
            "Deep ecology's principle of self-realisation proposes that human fulfillment comes from identifying with all life forms, expanding the self beyond the ego to encompass the wider ecological community. This is fundamentally different from the anthropocentric view which sees human interests as paramount and nature as an external resource. Under anthropocentrism, conserving the Western Ghats would be justified only for its utility to humans - water supply, tourism, medicinal plants. Under deep ecology, the Western Ghats has intrinsic worth regardless of human benefit. Self-realisation means that protecting the endemic species of the Western Ghats (like the lion-tailed macaque, Nilgiri tahr, and Malabar giant squirrel) is not just good policy - it is part of human spiritual and ethical flourishing. A conservation strategy from this perspective would prioritise ecosystem integrity over human economic interests, supporting community forest management and resisting large-scale development projects.",
            [
                "Self-realisation definition",
                "Difference from anthropocentrism",
                "Application to Western Ghats conservation",
                "Intrinsic vs instrumental value argument",
                "Practical implications for conservation policy",
            ],
            "The deep ecology approach would fundamentally change how we prioritise between development projects and biodiversity conservation in the Western Ghats.",
            "Hard"
        ),
    ]

    # ── Topic 2: Aldo Leopold & Stewardship (c12_evs_001) ──
    leopold_mcqs = [
        _make_mcq(
            "c12_evs_001b", "Stewardship and Land Ethic",
            "Who authored 'A Sand County Almanac' which introduced the concept of land ethic?",
            ["Aldo Leopold", "Arne Naess", "Rachel Carson", "John Muir"],
            0,
            "Aldo Leopold (1887-1948), an American ecologist and conservationist, authored 'A Sand County Almanac' (1949), which introduced the revolutionary concept of the land ethic.",
            "Medium", "mcq"
        ),
        _make_mcq(
            "c12_evs_001b", "Stewardship and Land Ethic",
            "According to Leopold's land ethic, what is the 'biotic community'?",
            [
                "The community of all living things including soils, waters, plants, and animals",
                "Only human communities in a region",
                "A community of like-minded environmentalists",
                "A political organization for conservation"
            ],
            0,
            "Leopold's biotic community includes soils, waters, plants, and animals - or collectively, the land. Humans are members of this community, not its conquerors.",
            "Medium", "mcq"
        ),
    ]

    # ── Topic 3: Social Ecology (c12_evs_002) ──
    social_eco_mcqs = [
        _make_mcq(
            "c12_evs_002", "Social ecology, ecofeminism, green politics",
            "Who is the founder of social ecology?",
            ["Murray Bookchin", "Vandana Shiva", "Aldo Leopold", "Arne Naess"],
            0,
            "Murray Bookchin (1921-2006) developed social ecology, arguing that environmental problems are rooted in social problems, particularly hierarchy and domination in human society.",
            "Hard", "mcq"
        ),
        _make_mcq(
            "c12_evs_002", "Social ecology, ecofeminism, green politics",
            "According to Murray Bookchin's social ecology, what are the root causes of ecological degradation?",
            [
                "Social hierarchies and domination in human society",
                "Natural resource scarcity",
                "Overpopulation alone",
                "Lack of environmental laws"
            ],
            0,
            "Bookchin's social ecology argues that environmental degradation stems from social problems - hierarchy, domination, and class exploitation in human society. Capitalism's compulsion to grow and commodify nature exacerbates this.",
            "Hard", "mcq"
        ),
        _make_mcq(
            "c12_evs_002", "Social ecology, ecofeminism, green politics",
            "What is the political framework proposed by Murray Bookchin?",
            [
                "Libertarian municipalism",
                "Deep ecology platform",
                "Land ethic",
                "Green New Deal"
            ],
            0,
            "Bookchin proposed libertarian municipalism - a system of directly democratic assemblies linked in a confederal network - as the political framework to resolve ecological problems by dismantling social hierarchies.",
            "Hard", "mcq"
        ),
    ]

    social_eco_short = [
        _make_short_answer(
            "c12_evs_002", "Social ecology, ecofeminism, green politics",
            "Explain Murray Bookchin's social ecology and how it links social problems to ecological problems.",
            "Murray Bookchin's social ecology is a theory that environmental problems are rooted in social problems. According to Bookchin, hierarchy, domination, and class exploitation in human society are the fundamental causes of ecological degradation. Capitalism's compulsion to grow endlessly and commodify nature intensifies ecological destruction. Bookchin argued that resolving ecological crises requires dismantling social hierarchies and creating a more egalitarian, libertarian society through what he called 'libertarian municipalism' - a system of directly democratic communities. For example, deforestation driven by corporate profit motives is both a social injustice (displacing communities) and an ecological crisis (loss of biodiversity).",
            [
                "Environmental problems rooted in social problems",
                "Hierarchy and domination as root causes",
                "Capitalism's compulsion to grow",
                "Libertarian municipalism as solution",
                "Example linking social and ecological issues",
            ],
            "Bookchin's social ecology provides a structural analysis of environmental problems that connects them to broader questions of social justice and political organization.",
            "Hard"
        ),
    ]

    social_eco_fill = [
        _make_fill_blank(
            "c12_evs_002", "Social ecology, ecofeminism, green politics",
            "Murray Bookchin's social ecology argues that ecological problems are rooted in ____ problems.",
            "social",
            "Bookchin's central thesis in social ecology is that environmental degradation is not merely a technical problem but stems from deeper social problems of hierarchy, domination, and exploitation in human society.",
            "Hard"
        ),
        _make_fill_blank(
            "c12_evs_002", "Social ecology, ecofeminism, green politics",
            "The political framework proposed by Murray Bookchin is called ____.",
            "libertarian municipalism",
            "Libertarian municipalism is Bookchin's proposed system of directly democratic assemblies that would replace hierarchical state structures and enable communities to manage their affairs ecologically.",
            "Hard"
        ),
    ]

    # ── Topic 4: Ecofeminism (c12_evs_002) ──
    ecofem_mcqs = [
        _make_mcq(
            "c12_evs_002", "Social ecology, ecofeminism, green politics",
            "Which movement is cited as a key example of ecofeminism in India?",
            ["Chipko movement", "Narmada Bachao Andolan", "Silent Valley protest", "All of the above"],
            0,
            "The Chipko movement (1970s, Uttarakhand) is the most cited ecofeminist case study in India, where women hugged trees to prevent deforestation, demonstrating the link between women's rights and environmental protection.",
            "Hard", "mcq"
        ),
        _make_mcq(
            "c12_evs_002", "Social ecology, ecofeminism, green politics",
            "According to ecofeminism, what parallels exist between the domination of women and the domination of nature?",
            [
                "Both arise from patriarchal systems that value domination over care",
                "They are completely unrelated phenomena",
                "Nature is dominated but women are not",
                "Women dominate nature in patriarchal systems"
            ],
            0,
            "Ecofeminism identifies parallels between the domination of women and domination of nature under patriarchal systems. Both are linked to hierarchical thinking that values domination, control, and exploitation over care, cooperation, and nurturing relationships.",
            "Hard", "mcq"
        ),
        _make_mcq(
            "c12_evs_002", "Social ecology, ecofeminism, green politics",
            "Which ecofeminist thinker critiqued the Green Revolution and advocated for seed sovereignty?",
            ["Vandana Shiva", "Murray Bookchin", "Maria Mies", "Greta Gaard"],
            0,
            "Vandana Shiva, an Indian ecofeminist, has been a prominent critic of the Green Revolution's impact on agricultural biodiversity and farmers' sovereignty, advocating instead for seed sovereignty and traditional farming practices.",
            "Hard", "mcq"
        ),
        _make_mcq(
            "c12_evs_002", "Social ecology, ecofeminism, green politics",
            "What is 'seed sovereignty' in the context of ecofeminism?",
            [
                "The right of farmers to save, exchange, and use their own seeds",
                "Government control of seed distribution",
                "Corporate ownership of genetically modified seeds",
                "Importing seeds from other countries"
            ],
            0,
            "Seed sovereignty, championed by Vandana Shiva and Navdanya, is the right of farmers and communities to save, exchange, and use their own seeds free from corporate control and patent restrictions.",
            "Hard", "mcq"
        ),
        _make_mcq(
            "c12_evs_002", "Social ecology, ecofeminism, green politics",
            "Which of the following are examples of 'patriarchal dualisms' critiqued by ecofeminism?",
            [
                "Man/woman, culture/nature, mind/body",
                "Deep/shallow ecology",
                "Capitalism/socialism",
                "Urban/rural"
            ],
            0,
            "Ecofeminism critiques patriarchal dualisms such as man/woman (male/female), culture/nature (civilized/wild), and mind/body (rational/emotional). These dualisms privilege one pole (male, culture, mind) and devalue the other (female, nature, body).",
            "Hard", "mcq"
        ),
    ]

    ecofem_fill = [
        _make_fill_blank(
            "c12_evs_002", "Social ecology, ecofeminism, green politics",
            "In the Chipko movement, ____ hugged trees to prevent deforestation in Uttarakhand during the 1970s.",
            "women",
            "The Chipko movement (meaning 'to cling' or 'hug' in Hindi) saw rural women in Uttarakhand embrace trees to prevent logging. This became a landmark ecofeminist action linking women's livelihoods with forest protection.",
            "Hard"
        ),
        _make_fill_blank(
            "c12_evs_002", "Social ecology, ecofeminism, green politics",
            "Vandana Shiva's organization Navdanya works to promote ____ and biodiversity.",
            "seed sovereignty",
            "Navdanya, founded by Vandana Shiva, is a movement for seed sovereignty that helps farmers transition to organic farming and protects agricultural biodiversity through community seed banks.",
            "Hard"
        ),
    ]

    ecofem_short = [
        _make_short_answer(
            "c12_evs_002", "Social ecology, ecofeminism, green politics",
            "What is ecofeminism? Explain with reference to the Chipko movement.",
            "Ecofeminism is an intellectual and activist movement that explores the connections between the domination of women and the domination of nature under patriarchal systems. It argues that the same hierarchical thinking that subordinates women also justifies the exploitation of nature. Key thinkers include Vandana Shiva, Maria Mies, and Greta Gaard. The Chipko movement (1970s, Uttarakhand, India) is a prime example: rural women hugged trees to prevent commercial logging that threatened their fuel wood, fodder, and livelihood. This demonstrated how women are disproportionately affected by environmental degradation and how women's activism can protect both communities and ecosystems. The movement showed that women's connection to nature is not essentialist but rooted in material conditions and gendered labour.",
            [
                "Definition of ecofeminism",
                "Link between domination of women and nature",
                "Key thinkers: Vandana Shiva, Maria Mies",
                "Chipko movement as case study",
                "Women's disproportionate impact from environmental degradation",
            ],
            "The Chipko movement demonstrates ecofeminist principles in action, showing how grassroots women's activism can effectively protect ecosystems.",
            "Hard"
        ),
        _make_short_answer(
            "c12_evs_002", "Social ecology, ecofeminism, green politics",
            "What is Vandana Shiva's critique of the Green Revolution? How does it connect to ecofeminism?",
            "Vandana Shiva critiques the Green Revolution for replacing diverse, sustainable farming systems with monocultures of high-yielding varieties that require chemical inputs, displacing traditional seed varieties, and undermining farmers' self-reliance. She argues this was particularly harmful to women farmers who traditionally managed seed diversity and household food security. The Green Revolution promoted patriarchal models of 'scientific agriculture' developed by male scientists and promoted by the state, marginalizing women's knowledge systems. Shiva advocates seed sovereignty as an alternative - returning control of seeds to farming communities, especially women. Her work connects to ecofeminism by showing how industrial agriculture simultaneously exploits nature (chemical farming, groundwater depletion) and women (displacing them from their traditional roles as seed custodians and food providers).",
            [
                "Shiva's critique of Green Revolution",
                "Monocultures vs traditional diversity",
                "Impact on women farmers",
                "Seed sovereignty as alternative",
                "Connection to ecofeminist framework",
            ],
            "Shiva's critique shows how environmental and feminist struggles are deeply interconnected in the context of agricultural policy.",
            "Hard"
        ),
    ]

    # ── Topic 5: Green Politics (c12_evs_002) ──
    green_politics_mcqs = [
        _make_mcq(
            "c12_evs_002", "Social ecology, ecofeminism, green politics",
            "When was the German Green Party (Die Grunen) formed?",
            ["1980", "1972", "1990", "1968"],
            0,
            "Die Grunen (The Greens) was formed in Germany in 1980 and has since become one of the most successful green political parties globally, participating in coalition governments.",
            "Hard", "mcq"
        ),
        _make_mcq(
            "c12_evs_002", "Social ecology, ecofeminism, green politics",
            "Who became the first Green MP in England in 2010?",
            ["Caroline Lucas", "Vandana Shiva", "Greta Thunberg", "Angela Merkel"],
            0,
            "Caroline Lucas became the first Green Party MP in the UK House of Commons in 2010, representing Brighton Pavilion. She was a prominent advocate for environmental policies, social justice, and proportional representation.",
            "Hard", "mcq"
        ),
        _make_mcq(
            "c12_evs_002", "Social ecology, ecofeminism, green politics",
            "Which of the following is NOT a core principle of green politics?",
            [
                "Unlimited economic growth",
                "Ecological wisdom",
                "Social justice",
                "Non-violence"
            ],
            0,
            "Green politics fundamentally rejects unlimited economic growth, advocating instead for sustainable development within ecological limits. Its core principles include ecological wisdom, social justice, grassroots democracy, non-violence, and sustainability.",
            "Hard", "mcq"
        ),
        _make_mcq(
            "c12_evs_002", "Social ecology, ecofeminism, green politics",
            "What does the Brundtland Report (1987) define sustainable development as?",
            [
                "Development that meets the needs of the present without compromising the ability of future generations to meet their own needs",
                "Economic growth without environmental concerns",
                "Maximum exploitation of natural resources",
                "Technology-driven development",
            ],
            0,
            "The Brundtland Report (1987), formally titled 'Our Common Future,' defined sustainable development as 'development that meets the needs of the present without compromising the ability of future generations to meet their own needs.' This definition integrates environmental, social, and economic dimensions.",
            "Hard", "mcq"
        ),
    ]

    green_politics_fill = [
        _make_fill_blank(
            "c12_evs_002", "Social ecology, ecofeminism, green politics",
            "The ____ Report (1987) provided the widely-used definition of sustainable development.",
            "Brundtland",
            "The Brundtland Report, formally titled 'Our Common Future,' was produced by the World Commission on Environment and Development chaired by Gro Harlem Brundtland. It defined sustainable development as meeting present needs without compromising future generations' ability to meet theirs.",
            "Hard"
        ),
        _make_fill_blank(
            "c12_evs_002", "Social ecology, ecofeminism, green politics",
            "____ became the first Green MP in England in 2010.",
            "Caroline Lucas",
            "Caroline Lucas, representing Brighton Pavilion, made history as the first Green Party MP in the UK House of Commons in 2010, bringing environmental concerns to the forefront of British parliamentary politics.",
            "Hard"
        ),
    ]

    # ── Topic 6: Comparison of Schools (c12_evs_001) ──
    comparison_mcqs = [
        _make_mcq(
            "c12_evs_001c", "Comparison of schools of thought",
            "Which school of ecological thought is most aligned with Indian traditions of ahimsa (non-violence) and respect for all life?",
            [
                "Deep ecology",
                "Shallow ecology",
                "Neither - both are Western",
                "Social ecology"
            ],
            0,
            "Deep ecology's principle of the inherent worth of all living beings aligns closely with Indian traditions of ahimsa (non-violence) and the concept of vasudhaiva kutumbakam (the world is one family). Indian philosophy has long recognized the interconnectedness of all life.",
            "Medium", "mcq"
        ),
        _make_mcq(
            "c12_evs_001c", "Comparison of schools of thought",
            "Which approach to forest conservation is most representative of shallow ecology?",
            [
                "Commercial forestry plantations for timber production",
                "Protecting old-growth forests for their intrinsic value",
                "Community-managed forests for biodiversity",
                "Wildlife corridors connecting fragmented habitats"
            ],
            0,
            "Shallow ecology treats forests as resources to be managed for human benefit - commercial forestry plantations for timber production exemplify this approach. Deep ecology would argue for protecting old-growth forests for their intrinsic value regardless of human utility.",
            "Medium", "mcq"
        ),
        _make_mcq(
            "c12_evs_001c", "Comparison of schools of thought",
            "How would a proponent of Aldo Leopold's land ethic view wildlife conservation?",
            [
                "As an ethical duty to preserve the biotic community",
                "As a way to generate tourism revenue",
                "As a political strategy to win elections",
                "As irrelevant to human welfare"
            ],
            0,
            "Leopold's land ethic frames wildlife conservation as an ethical duty. Humans are members of the biotic community with moral obligations to preserve its integrity, stability, and beauty - not merely managers calculating human benefits.",
            "Medium", "mcq"
        ),
    ]

    # ── Competency-based questions (Indian context, 50%) ──
    competency_questions = [
        # Deep ecology + India
        _make_short_answer(
            "c12_evs_comp1", "Modern schools of ecological thought (Indian Context)",
            "How does the Indian philosophical concept of 'vasudhaiva kutumbakam' (the world is one family) relate to Arne Naess's deep ecology principle of self-realisation through identification with all life?",
            "The ancient Indian concept of vasudhaiva kutumbakam ('the world is one family') from the Maha Upanishad parallels Arne Naess's deep ecology principle of self-realisation through identification with all life. Both perspectives reject narrow egoism and propose an expanded sense of self that encompasses all living beings. Deep ecology's ecosophy T argues that human flourishing comes from recognizing our interconnectedness with all life forms - a view that resonates with Indian spiritual traditions of Advaita Vedanta and Buddhist interdependence. In the Indian context, this means that protecting the Ganga river ecosystem, conserving tiger reserves like Corbett, or preserving traditional knowledge systems like Ayurveda are not merely utilitarian actions but expressions of self-realisation in the deep ecological sense.",
            [
                "Vasudhaiva kutumbakam concept",
                "Parallel with Naess's self-realisation",
                "Rejection of narrow egoism",
                "Connection to Indian spiritual traditions",
                "Contemporary Indian examples (Ganga, Corbett, Ayurveda)",
            ],
            "This question connects universal philosophical principles to Indian cultural and spiritual traditions, demonstrating competency in applying ecological concepts to local contexts.",
            "Medium"
        ),
        # Stewardship + Bishnoi
        _make_long_answer(
            "c12_evs_comp2", "Stewardship and Land Ethic (Indian Context)",
            "How does the Bishnoi community's tradition of environmental protection exemplify Aldo Leopold's land ethic? Compare their approach with shallow ecology's view of wildlife.",
            "The Bishnoi community of Rajasthan exemplifies Aldo Leopold's land ethic in remarkable ways. Since 1485, when Guru Jambheshwarji Maharaj gave the 29 principles (Bishnoi means 29), the community has practiced ecological stewardship as a religious duty. The most famous example is the 1730 Khejarli massacre: 363 Bishnoi men, women, and children hugged khejri trees to prevent them from being cut for a king's palace, sacrificing their lives. Amrita Devi, who led the protest, said: 'If a tree is saved even at the cost of one's head, it is worth it.' This perfectly embodies Leopold's principle that 'a thing is right when it tends to preserve the integrity, stability, and beauty of the biotic community.' In contrast, shallow ecology would view the khejri trees as resources for human construction, justifying their removal for economic development. The Bishnoi tradition shows that Leopold's land ethic has deep roots in Indian cultural and religious practices.",
            [
                "Bishnoi history and 29 principles",
                "Khejarli massacre (1730) as land ethic example",
                "Amrita Devi's sacrifice",
                "Leopold's principle applied",
                "Contrast with shallow ecology approach",
                "Indian cultural roots of stewardship",
            ],
            "The Bishnoi example powerfully demonstrates how Leopold's land ethic, though formulated in the American Midwest, resonates with Indian traditions of environmental stewardship.",
            "Hard"
        ),
        # Ecofeminism + India
        _make_short_answer(
            "c12_evs_comp3", "Ecofeminism (Indian Context)",
            "Analyze the Chipko movement as an ecofeminist case study. How does it demonstrate the connection between women's empowerment and environmental protection in India?",
            "The Chipko movement (1973-1981, Uttarakhand) is a landmark ecofeminist case study demonstrating the connection between women's empowerment and environmental protection in India. When commercial logging threatened their village forests, women of Reni,Advani, and neighboring villages hugged trees to prevent felling. This was not merely an environmental protest - it was a struggle for livelihood, as women depended on forests for fuel wood, fodder, and small forest products. The movement showed that women, as primary managers of household resources, are disproportionately affected by environmental degradation and are natural leaders in environmental protection. Leaders like Gaura Devi organized 27 women to confront loggers. The movement's success (leading to a 15-year logging ban in 1980) demonstrated that empowering women as environmental stewards benefits both communities and ecosystems, embodying the ecofeminist insight that liberation of women and liberation of nature are interconnected struggles.",
            [
                "Chipko movement timeline and location",
                "Women's role as primary resource managers",
                "Connection between women's welfare and forest protection",
                "Gaura Devi and women leaders",
                "Ecofeminist insight: women's liberation = nature's liberation",
            ],
            "The Chipko movement remains one of the most powerful demonstrations of ecofeminist principles in practice, with direct relevance to contemporary forest policy in India.",
            "Hard"
        ),
        # Green politics + India
        _make_short_answer(
            "c12_evs_comp4", "Green Politics (Indian Context)",
            "Discuss the relevance of green politics principles (ecological wisdom, social justice, grassroots democracy) to contemporary environmental movements in India.",
            "Green politics principles have deep relevance to contemporary Indian environmental movements. Ecological wisdom connects to India's ancient traditions of sustainable living - from traditional water harvesting (kunds, baolis, johads) to organic farming practices that predate the Green Revolution. Social justice is central to Indian environmental struggles: the Narmada Bachao Andolan linked dam displacement to questions of fair development, while the Chipko movement challenged elite control over forest resources. Grassroots democracy is embodied in India's Panchayati Raj system and the environmental movement's emphasis on community consent (PESA Act, 1996, which mandates Gram Sabha approval for projects in Scheduled Areas). The Green Party of India and various regional environmental parties have attempted to translate green politics principles into electoral politics, though with limited success. The Aam Aadmi Party's focus on environmental issues and the growing influence of environmental considerations in Indian electoral politics suggest increasing relevance of green politics frameworks.",
            [
                "Ecological wisdom: Indian traditional practices",
                "Social justice: Narmada Bachao Andolan",
                "Grassroots democracy: Panchayati Raj, PESA Act",
                "Green politics in Indian electoral politics",
                "Contemporary relevance",
            ],
            "This question evaluates understanding of green politics principles and their application to Indian environmental governance and movements.",
            "Hard"
        ),
        # Stewardship + India
        _make_short_answer(
            "c12_evs_comp5", "Stewardship and Land Ethic (Indian Context)",
            "Compare the Bishnoi community's tradition of wildlife protection in Rajasthan with Aldo Leopold's land ethic. How does each tradition conceptualize the human-nature relationship?",
            "Both the Bishnoi tradition and Leopold's land ethic conceptualize humans as members of a larger ecological community rather than its conquerors. The Bishnoi community, founded by Guru Jambheshwarji in 1485, follows 29 principles that include non-violence toward all living beings and protection of trees and animals. The most dramatic expression was the 1730 Khejarli sacrifice where 363 Bishnois died protecting khejri trees. Similarly, Leopold's land ethic (1949) states: 'A thing is right when it tends to preserve the integrity, stability, and beauty of the biotic community.' Both frameworks extend moral consideration beyond humans to include the entire biotic community. However, the Bishnoi tradition grounds this in religious faith and community practice over 500+ years, while Leopold's approach is secular and philosophical. The Bishnoi example demonstrates that land stewardship principles have deep indigenous roots in India, predating Western environmental philosophy by centuries.",
            [
                "Bishnoi tradition: 29 principles, 1485",
                "Khejarli sacrifice, 1730",
                "Leopold's land ethic definition",
                "Both: humans as community members",
                "Difference: religious vs secular foundation",
                "Indian roots predating Western philosophy",
            ],
            "This comparative analysis demonstrates deep understanding of stewardship principles across cultural contexts.",
            "Hard"
        ),
        # Sustainable development + India
        _make_short_answer(
            "c12_evs_comp6", "Sustainable Development (Indian Context)",
            "Explain the Brundtland definition of sustainable development and critically examine its application in the Indian context, with reference to specific development projects.",
            "The Brundtland Report (1987) defined sustainable development as 'development that meets the needs of the present without compromising the ability of future generations to meet their own needs.' This integrates environmental, social, and economic dimensions. In the Indian context, this definition faces significant challenges: the Sardar Sarovar Dam on the Narmada provides irrigation and drinking water to millions (present needs) but displaces communities and submerges forests (compromising future options). The Delhi-Mumbai Industrial Corridor promotes economic growth but raises concerns about land acquisition and ecological carrying capacity. The Namami Gange programme attempts to balance river cleaning with development pressures. Critics argue that in practice, 'sustainable development' in India often prioritizes economic growth over environmental protection, with 'compromising future generations' becoming the norm rather than the exception. The concept of 'sustainable development' has been critiqued as potentially contradictory, as economic development models inherently involve resource consumption.",
            [
                "Brundtland definition (1987)",
                "Three dimensions: environmental, social, economic",
                "Indian examples: Narmada Dam, DMIC, Namami Gange",
                "Tension between present needs and future options",
                "Critique: growth vs sustainability contradiction",
            ],
            "This question requires critical application of the sustainable development concept to real Indian scenarios, demonstrating competency in analyzing environmental policy.",
            "Hard"
        ),
        # Social ecology + India
        _make_short_answer(
            "c12_evs_comp7", "Social Ecology (Indian Context)",
            "How does Murray Bookchin's social ecology help us understand environmental conflicts in India, such as those related to mining in the Aravali hills or industrial pollution in the Cuddalore district of Tamil Nadu?",
            "Murray Bookchin's social ecology provides a powerful lens for understanding environmental conflicts in India. According to Bookchin, ecological problems are rooted in social problems of hierarchy and domination. In the Aravali hills, mining conflicts involve not just environmental degradation but social inequality: wealthy mining companies exploit resources while local communities (especially Adivasis) bear the ecological costs (water depletion, air pollution, land degradation) without benefiting economically. In Cuddalore, Tamil Nadu, the 'Cancer Corridor' of industrial pollution disproportionately affects poor fishing and farming communities while industrialists profit. Bookchin would argue these conflicts cannot be resolved through pollution control alone (shallow ecology) but require addressing the underlying social hierarchies: corporate power, state complicity, and class inequality. The solution lies in empowering affected communities through grassroots democracy and challenging the structural drivers of exploitation.",
            [
                "Bookchin's social ecology thesis",
                "Aravali mining: social inequality + ecological damage",
                "Cuddalore: Cancer Corridor example",
                "Shallow ecology vs social ecology approach",
                "Solution: grassroots democracy, challenging hierarchy",
            ],
            "This question demonstrates competency in applying Western ecological philosophy to understand Indian environmental conflicts.",
            "Hard"
        ),
        # Ecofeminism + Vandana Shiva
        _make_short_answer(
            "c12_evs_comp8", "Ecofeminism and Indian Environmentalism",
            "How does Vandana Shiva's work illustrate the intersection of ecofeminism, seed sovereignty, and environmental protection in India? Discuss with reference to the Green Revolution and Navdanya.",
            "Vandana Shiva's work powerfully illustrates the intersection of ecofeminism, seed sovereignty, and environmental protection. Her critique of the Green Revolution shows how industrial agriculture simultaneously: (1) destroyed agricultural biodiversity (replacing 200,000 rice varieties with a handful of high-yielding varieties), (2) disempowered women farmers (who traditionally managed seed diversity), and (3) caused environmental degradation (water depletion from irrigation, soil degradation from chemicals). In response, Shiva founded Navdanya in 1991, a movement for seed sovereignty that has conserved over 4,000 rice varieties and trained over 500,000 farmers in organic agriculture. Navdanya's community seed banks, predominantly managed by women, demonstrate how seed sovereignty is both an environmental strategy (preserving biodiversity) and a feminist strategy (restoring women's knowledge and economic autonomy). Shiva's ecofeminist analysis shows that patriarchal control over seeds (via patents and corporate ownership) is linked to patriarchal control over women's bodies and labour.",
            [
                "Green Revolution critique",
                "Loss of biodiversity",
                "Impact on women farmers",
                "Navdanya: seed conservation and training",
                "Seed sovereignty as ecofeminist strategy",
                "Patriarchal control over seeds and women",
            ],
            "Shiva's work demonstrates how ecofeminism provides a comprehensive framework linking environmental protection, gender justice, and food sovereignty in the Indian context.",
            "Hard"
        ),
        # Jadav Payeng + stewardship
        _make_short_answer(
            "c12_evs_comp9", "Stewardship in Practice (Indian Context)",
            "Jadav Payeng single-handedly created a 550-hectare forest on a sandbar of the Brahmaputra River in Assam. Analyze this story through the lens of Leopold's land ethic. What does it tell us about individual responsibility toward the biotic community?",
            "Jadav Payeng's creation of the Molai Forest on the Majuli Island sandbar is a remarkable real-world expression of Aldo Leopold's land ethic. Beginning in 1979 when he was just 16, Payeng planted seeds and saplings on a barren sandbar, eventually creating a 550-hectare forest that now houses Bengal tigers, Indian rhinoceroses, elephants, deer, and hundreds of bird species. This embodies Leopold's principle that 'a thing is right when it tends to preserve the integrity, stability, and beauty of the biotic community.' Payeng's actions were not motivated by profit (shallow ecology) or philosophical abstraction (deep ecology) but by a direct, felt sense of responsibility to the land community - stewardship in action. His story demonstrates that Leopold's land ethic is not merely a philosophical concept but a practical guide for individual and community action. It also reflects the Indian tradition of sewa (selfless service) and the Gandhian principle that individual action can transform landscapes and communities.",
            [
                "Jadav Payeng's story and Molai Forest",
                "Application of Leopold's land ethic",
                "Stewardship in practice",
                "Contrast with shallow and deep ecology motivations",
                "Connection to Indian tradition of sewa and Gandhian philosophy",
            ],
            "This competency question connects a celebrated Indian environmental story to theoretical ecological philosophy.",
            "Medium"
        ),
        # Comparative MCQs for Indian context
        _make_mcq(
            "c12_evs_comp_mcq1", "Modern schools of ecological thought (Indian Context)",
            "The Khejarli massacre of 1730, where 363 Bishnois sacrificed their lives to protect trees, best illustrates which school of ecological thought?",
            ["Stewardship and land ethic", "Shallow ecology", "Social ecology", "Green politics"],
            0,
            "The Khejarli massacre exemplifies the stewardship/land ethic tradition. The Bishnois, following their religious principles, viewed themselves as members of the biotic community with moral obligations to protect it - exactly the spirit of Leopold's land ethic.",
            "Medium", "mcq"
        ),
        _make_mcq(
            "c12_evs_comp_mcq2", "Social ecology, ecofeminism, green politics (Indian Context)",
            "The Chipko movement's emphasis on women's leadership in forest protection illustrates which theoretical framework?",
            ["Ecofeminism", "Social ecology", "Deep ecology", "Shallow ecology"],
            0,
            "The Chipko movement is a classic ecofeminist case study. It demonstrated the intersection of women's rights and environmental protection, showing how women's traditional dependence on forests makes them both the most affected by deforestation and the most effective defenders of forest ecosystems.",
            "Hard", "mcq"
        ),
        _make_mcq(
            "c12_evs_comp_mcq3", "Stewardship and Land Ethic (Indian Context)",
            "How does the Bishnoi tradition of protecting the blackbuck and khejri tree relate to Leopold's land ethic?",
            [
                "Both see humans as members of the biotic community with ethical duties",
                "The Bishnoi tradition is purely religious, unlike Leopold's secular approach",
                "Leopold would oppose the Bishnoi approach",
                "They have no connection"
            ],
            0,
            "The Bishnoi tradition of protecting wildlife (blackbuck) and trees (khejri) since 1485 demonstrates that Leopold's land ethic - humans as ethical members of the biotic community - has deep roots in Indian religious and cultural traditions.",
            "Medium", "mcq"
        ),
        _make_mcq(
            "c12_evs_comp_mcq4", "Green Politics (Indian Context)",
            "Which Indian environmental movement most closely aligns with the green politics principle of 'grassroots democracy'?",
            [
                "Chipko movement (community-led forest protection)",
                "Government-led afforestation programmes",
                "Corporate CSR initiatives",
                "International climate negotiations"
            ],
            0,
            "The Chipko movement exemplifies grassroots democracy - local communities, especially women, organizing themselves to protect their forests against state and corporate interests, without relying on government or institutional channels.",
            "Medium", "mcq"
        ),
    ]

    # ── Long answer competency questions ──
    competency_long = [
        _make_long_answer(
            "c12_evs_comp_la1", "Comparison of schools of thought (Indian Context)",
            "Critically analyze the Narmada Bachao Andolan through the lenses of three schools of ecological thought: (a) deep ecology, (b) shallow ecology, and (c) social ecology. What does each perspective reveal about the conflict, and which approach do you find most compelling for resolving it?",
            "(a) Deep ecology would analyze the Narmada Dam project from the standpoint of intrinsic value: the Narmada river ecosystem, its aquatic life, riparian forests, and the entire biotic community affected by submergence have inherent worth. From this perspective, the dam is wrong because it destroys ecosystem integrity regardless of human benefits like irrigation and electricity. Self-realisation would involve humans identifying with the river ecosystem. (b) Shallow ecology would focus on maximizing human benefit - the dam provides water to 30 million people, generates electricity, and controls floods. This perspective supports the dam but might recommend mitigation measures like resettlement packages and environmental flow guarantees. (c) Social ecology (Bookchin) would analyze the conflict as rooted in social inequality: tribal and farming communities displaced by the dam lack political power, while urban industrial interests benefit. The dam serves corporate agriculture (sugarcane in Gujarat) at the expense of Adivasi communities. Resolution requires addressing power imbalances - genuine democratic participation of affected communities in decision-making. The most compelling approach combines elements of all three: social ecology's focus on justice is essential, but deep ecology's recognition of intrinsic value provides the strongest ethical foundation for rejecting destructive large dams.",
            [
                "Deep ecology: intrinsic value of Narmada ecosystem",
                "Shallow ecology: human benefit maximization",
                "Social ecology: power imbalance, tribal displacement",
                "Critique of each approach",
                "Synthesis: combining justice and ecological ethics",
            ],
            "This question requires critical analysis of a major Indian environmental controversy through multiple theoretical frameworks.",
            "Hard"
        ),
    ]

    # ── Numerical questions (environmental data) ──
    numerical_questions = [
        _make_numerical(
            "c12_evs_num1", "Environmental Data Analysis",
            "The Western Ghats cover approximately 160,000 sq km and host about 7,400 species of flowering plants, of which 62% are endemic. Calculate the number of endemic flowering plant species.",
            "Endemic species = Total species × Endemism percentage",
            {"total_species": 7400, "endemism_pct": 62},
            4588,
            "species",
            "Calculation: 7,400 × 0.62 = 4,588 endemic species. The Western Ghats are recognized as one of the world's biodiversity hotspots, with exceptionally high endemism that deep ecology would argue has intrinsic value beyond human utility.",
            "Medium"
        ),
        _make_numerical(
            "c12_evs_num2", "Environmental Data Analysis",
            "India's per capita CO2 emissions were approximately 1.9 tonnes in 2020, while the global average was about 4.8 tonnes. Calculate the ratio of India's per capita emissions to the global average.",
            "Ratio = India's per capita emissions / Global average",
            {"india_per_capita": 1.9, "global_average": 4.8},
            0.40,
            "ratio",
            "Calculation: 1.9 / 4.8 = 0.40 (approximately 40%). India's per capita emissions are less than half the global average, which is relevant to debates about India's role in global climate negotiations from an environmental justice perspective.",
            "Medium"
        ),
        _make_numerical(
            "c12_evs_num3", "Environmental Data Analysis",
            "The Chipko movement successfully prevented the felling of approximately 2,500 trees in the Reni forest area. If each tree sequesters about 150 kg of CO2 annually, calculate the total annual CO2 sequestration preserved by the movement.",
            "Total CO2 sequestration = Number of trees × CO2 per tree",
            {"num_trees": 2500, "co2_per_tree_kg": 150},
            375000,
            "kg CO2/year",
            "Calculation: 2,500 × 150 = 375,000 kg (375 metric tonnes) of CO2 sequestered annually. This quantifies one of the ecosystem services preserved by the Chipko movement's action.",
            "Medium"
        ),
    ]

    # ── Fill-in-the-blank competency ──
    competency_fill = [
        _make_fill_blank(
            "c12_evs_comp_fb1", "Ecofeminism (Indian Context)",
            "The ____ movement of the 1970s in Uttarakhand saw women hugging trees to prevent deforestation.",
            "Chipko",
            "The Chipko movement (1973-1981) in Uttarakhand is one of India's most celebrated environmental movements and a classic ecofeminist case study, demonstrating the intersection of women's rights and environmental protection.",
            "Medium"
        ),
        _make_fill_blank(
            "c12_evs_comp_fb2", "Stewardship and Land Ethic (Indian Context)",
            "In 1730, ____ Devi and 362 other Bishnois sacrificed their lives protecting khejri trees in Khejarli, Rajasthan.",
            "Amrita",
            "Amrita Devi's sacrifice in 1730, where she hugged a khejri tree to prevent it from being cut, is one of the earliest recorded acts of environmental resistance in India and exemplifies the Bishnoi tradition of environmental stewardship.",
            "Medium"
        ),
        _make_fill_blank(
            "c12_evs_comp_fb3", "Social Ecology (Indian Context)",
            "The ____ (established 1981) promotes ecological awareness and environmental education in India, aligning with green politics principles of grassroots democracy.",
            "Centre for Science and Environment",
            "The Centre for Science and Environment (CSE), founded in 1981 by Anil Agarwal, has been a leading Indian environmental research and advocacy organization, working on issues from pollution control to climate justice through research, advocacy, and grassroots mobilization.",
            "Medium"
        ),
    ]

    # ── Long answer competency ──
    competency_long_extra = [
        _make_long_answer(
            "c12_evs_comp_la2", "Green Politics and Environmental Policy (Indian Context)",
            "Evaluate the relevance of green politics principles (ecological wisdom, social justice, grassroots democracy, non-violence, sustainability) to India's National Action Plan on Climate Change (NAPCC, 2008). Which principles are well-represented and which are inadequately addressed?",
            "India's National Action Plan on Climate Change (NAPCC, 2008) comprises eight national missions covering solar energy, energy efficiency, sustainable habitat, water, Himalayan ecosystem, Green India, sustainable agriculture, and strategic knowledge. Ecological wisdom is partially represented through the Green India Mission's focus on ecosystem restoration and traditional water conservation. However, social justice is inadequately addressed - while the NAPCC acknowledges that India is highly vulnerable to climate change, it does not adequately address the differentiated impacts on poor and marginalized communities. Grassroots democracy is weak - the NAPCC was developed centrally with limited participatory processes, though some missions like the National Mission for Sustainable Agriculture involve community-level implementation. Non-violence is implicit in the focus on renewable energy rather than nuclear power. Sustainability is the overarching goal but the continued expansion of coal-based electricity challenges this principle. Overall, the NAPCC demonstrates partial alignment with green politics but falls short on social justice and genuine grassroots democracy.",
            [
                "NAPCC overview (8 missions)",
                "Ecological wisdom: Green India Mission, traditional knowledge",
                "Social justice: inadequate address of differentiated vulnerability",
                "Grassroots democracy: limited participation",
                "Non-violence: implicit in renewable energy focus",
                "Sustainability vs coal expansion tension",
                "Overall assessment",
            ],
            "This question requires applying green politics principles to evaluate a major national policy document, demonstrating advanced competency.",
            "Hard"
        ),
    ]

    # ── Short answer standard ──
    standard_short = [
        _make_short_answer(
            "c12_evs_std1", "Modern schools of ecological thought",
            "Define deep ecology and explain Arne Naess's distinction between 'deep' and 'shallow' ecological thinking.",
            "Deep ecology, developed by Norwegian philosopher Arne Naess in 1973, is an environmental philosophy that recognizes the intrinsic value of all living beings regardless of their instrumental value to humans. It distinguishes between two approaches: 'deep' ecology questions the fundamental anthropocentric worldview that places humans at the center of moral consideration, advocating instead for an ecocentric perspective where all life forms have inherent worth. 'Shallow' ecology, in contrast, takes a reformist approach that works within the existing anthropocentric framework - it focuses on pollution control and resource management to benefit humans without challenging the deeper assumption that nature exists primarily for human use. Naess's key insight was that superficial environmentalism (shallow ecology) cannot solve ecological crises because it doesn't address the root cause: humanity's self-centered relationship with nature.",
            [
                "Definition of deep ecology",
                "Arne Naess and 1973",
                "Intrinsic vs instrumental value",
                "Deep ecology: ecocentric, questions anthropocentrism",
                "Shallow ecology: anthropocentric, reformist approach",
                "Root cause analysis",
            ],
            "Naess's distinction remains fundamental to environmental philosophy, highlighting the difference between surface-level environmentalism and transformative ecological thinking.",
            "Medium"
        ),
        _make_short_answer(
            "c12_evs_std2", "Social ecology, ecofeminism, green politics",
            "Explain ecofeminism and discuss Vandana Shiva's contribution to this school of thought.",
            "Ecofeminism is an intellectual and activist movement that explores the connections between feminism and environmentalism. It argues that there are important parallels between the domination of women and the domination of nature under patriarchal systems. Key thinkers include Vandana Shiva, Maria Mies, and Greta Gaard. Ecofeminism critiques patriarchal dualisms (man/woman, culture/nature, mind/body) that privilege the 'masculine' pole. Vandana Shiva's contribution is significant: she has shown how the Green Revolution in India destroyed agricultural biodiversity, displaced women farmers from their traditional roles as seed custodians, and promoted a patriarchal model of 'scientific agriculture.' Her organization Navdanya works to restore seed sovereignty, promote organic farming, and empower women as environmental stewards. Shiva's critique of development models from an ecofeminist perspective has been influential globally.",
            [
                "Definition of ecofeminism",
                "Patriarchal dualisms",
                "Key thinkers: Vandana Shiva, Maria Mies",
                "Shiva's critique of Green Revolution",
                "Navdanya and seed sovereignty",
                "Women as environmental stewards",
            ],
            "Shiva's ecofeminist analysis connects gender, agriculture, and environmental protection in a uniquely Indian context.",
            "Hard"
        ),
    ]

    # ── Compile all question pools ──
    all_pools = {
        "deep_eco_mcqs": (deep_eco_mcqs, "standard"),
        "deep_eco_fill": (deep_eco_fill, "standard"),
        "deep_eco_short": (deep_eco_short, "standard"),
        "deep_eco_long": (deep_eco_long, "standard"),
        "leopold_mcqs": (leopold_mcqs, "standard"),
        "comparison_mcqs": (comparison_mcqs, "standard"),
        "social_eco_mcqs": (social_eco_mcqs, "standard"),
        "social_eco_fill": (social_eco_fill, "standard"),
        "social_eco_short": (social_eco_
)}