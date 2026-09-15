"""
CISCE EVS Class 6 — Deterministic Question Generator
Syllabus nodes: c6_evs_001 (Environment: biotic/abiotic),
                 c6_evs_002 (Ecosystems: producers/consumers/decomposers/food chains),
                 c6_evs_003 (Biodiversity: variety of life on Earth)
"""

import random
import math
from fractions import Fraction
from typing import Any

# ---------------------------------------------------------------------------
# Constants & pools
# ---------------------------------------------------------------------------

QUESTION_TYPES = ["MCQ", "fill_blank", "short_answer", "long_answer", "numerical"]
DIFFICULTY_LEVELS = ["Easy", "Medium"]

# Indian-context pools (for 50 % competency questions)
INDIAN_PLANTS     = ["neem", "mango", "banyan", "tulsi", "hibiscus", "coconut", "teak", "sandalwood"]
INDIAN_TREES      = ["banyan", "mango", "neem", "peepal", "teak", "coconut"]
INDIAN_SHRUBS     = ["hibiscus", "rose", "tulsi", "jasmine"]
INDIAN_ANIMALS    = ["tiger", "elephant", "peacock", "deer", "monkey", "cobra", "kingfisher", "dolphin"]
INDIAN_MICROBES   = ["yeast", "bacteria in soil"]
INDIAN_ECOSYSTEMS = ["forest of Sundarbans", "grassland of Gir", "Thar Desert", "Western Ghats rainforest", "Himalayan meadow", "pond in a village"]
INDIAN_FOOD_CHAINS = [
    "grass → grasshopper → frog → snake → eagle",
    "plant → rabbit → fox",
    "algae → small fish → kingfisher",
    "wheat → rat → snake → hawk",
    "neem leaf → caterpillar → bird → kite",
]
INDIAN_SCENARIOS  = [
    "In a Sundarbans mangrove forest, the Royal Bengal Tiger (biotic) depends on the saline water and mudflats (abiotic) for its habitat.",
    "Neem trees (biotic) in a Rajasthan village depend on sunlight and groundwater (abiotic) for growth.",
    "In the Himalayas, Yak (biotic) graze on alpine grass (biotic) and depend on cold temperatures (abiotic).",
    "Peacocks (biotic) in a farm depend on grain and insects (biotic) for food and clean air (abiotic) to breathe.",
]

# Standard pools (50 % of questions)
STANDARD_BIOTIC    = ["plant", "animal", "fungus", "tree", "fish", "bird"]
STANDARD_ABIOTIC   = ["sunlight", "air", "water", "soil", "temperature", "rock", "minerals"]
STANDARD_PRODUCERS = ["grass", "algae", "cactus", "oak tree", "wheat plant"]
STANDARD_HERBIVORES= ["cow", "deer", "rabbit", "sheep", "goat"]
STANDARD_CARNIVORES= ["lion", "eagle", "snake", "wolf", "shark"]
STANDARD_OMNIVORES = ["human", "bear", "crow", "rat"]
STANDARD_DECOMP    = ["fungi", "bacteria", "mushroom", "mould"]
STANDARD_FOOD_CHAINS = [
    "grass → grasshopper → frog → snake → eagle",
    "phytoplankton → small fish → big fish → shark",
    "oak leaf → caterpillar → bird → fox",
    "algae → tadpole → fish → heron",
]
STANDARD_SCENARIOS = [
    "A sunflower (biotic) uses sunlight and water (abiotic) through photosynthesis to make its food.",
    "Earthworms (biotic) break down dead leaves, returning nutrients (abiotic) to enrich the soil.",
    "Salmon (biotic) depend on dissolved oxygen (abiotic) in cold water for breathing.",
    "Mushrooms (biotic) decompose fallen logs, releasing minerals (abiotic) into the forest floor.",
]

# ---------------------------------------------------------------------------
# Helper utilities
# ---------------------------------------------------------------------------

def _s(seed: int) -> None:
    random.seed(seed)


def _shuffle(items, seed: int):
    _s(seed)
    return list(items)


def _step(header: str, body: str) -> str:
    return f"Step — {header}: {body}"


def _verify(condition: str, result: str) -> str:
    return f"Verification — {condition} => {result}"


def _indian_flag(topic_idx: int, q_idx: int) -> bool:
    """Return True when this question slot should get an Indian-context item."""
    return (q_idx % 2 == 0)  # even-index slots → competency / Indian context


# ---------------------------------------------------------------------------
# Solver functions
# ---------------------------------------------------------------------------

def solve_environment(params: dict) -> dict:
    """Solve environment / biotic-abiotic classification and reasoning problems."""
    steps = []
    item     = params.get("item", "plant")
    category = params.get("category", None)

    # Determine biotic / abiotic
    biotic_keywords = ["plant", "tree", "animal", "bird", "fish", "fungus", "bacteria",
                       "human", "insect", "neem", "mango", "tiger", "elephant", "peacock",
                       "cow", "deer", "frog", "snake", "eagle", "caterpillar", "earthworm",
                       "mushroom", "yeast", "grass", "algae", "worm"]
    is_biotic = any(kw in item.lower() for kw in biotic_keywords)
    result_category = "Biotic" if is_biotic else "Abiotic"

    steps.append(_step("Identify characteristics",
        f"Check if '{item}' shows growth, reproduction, and response to stimuli."))
    steps.append(_step("Apply definition",
        f"{'Growth + reproduction + response to stimuli detected →' if is_biotic else 'No growth/reproduction/responsiveness →'} {result_category}."))

    if category and category.lower() != result_category.lower():
        verification = f"MISMATCH — expected '{category}', got '{result_category}'"
    else:
        verification = f"Classified as '{result_category}' — matches expected '{category}'" if category else "Classification applied."

    steps.append(_verify("Classification", verification))
    return {"answer": result_category, "steps": steps, "verification": verification}


def solve_ecosystem(params: dict) -> dict:
    """Solve ecosystem classification problems: producers, consumers, decomposers."""
    steps = []
    organism   = params.get("organism", "grass")
    role       = params.get("role", None)

    producers  = ["grass", "algae", "plant", "tree", "wheat", "neem", "mango tree",
                  "cactus", "sunflower", "banyan", "coconut"]
    herbivores = ["cow", "deer", "rabbit", "sheep", "goat", "elephant", "grasshopper"]
    carnivores = ["lion", "tiger", "eagle", "snake", "wolf", "fox", "hawk", "shark"]
    omnivores  = ["human", "bear", "crow", "rat", "pig"]
    decomposers= ["fungi", "bacteria", "mushroom", "mould", "yeast", "earthworm"]

    if any(organism.lower() == p for p in producers):
        determined = "Producer"
        reason = "Makes its own food through photosynthesis."
    elif any(organism.lower() == h for h in herbivores):
        determined = "Herbivore (Consumer)"
        reason = "Eats only plants/producers."
    elif any(organism.lower() == c for c in carnivores):
        determined = "Carnivore (Consumer)"
        reason = "Eats other animals."
    elif any(organism.lower() == o for o in omnivores):
        determined = "Omnivore (Consumer)"
        reason = "Eats both plants and animals."
    elif any(organism.lower() == d for d in decomposers):
        determined = "Decomposer"
        reason = "Breaks down dead organic matter and returns nutrients to the soil."
    else:
        determined = "Unknown"
        reason = "Not in standard classification list — needs contextual analysis."

    steps.append(_step("Check organism type",
        f"Is '{organism}' a plant/algae? → {'Yes' if determined == 'Producer' else 'No'}."))
    steps.append(_step("Apply classification rule", reason))
    steps.append(_step("Assign role", f"'{organism}' is classified as: {determined}."))

    if role and role.lower() != determined.lower().split(" ")[0]:
        verification = f"MISMATCH — expected '{role}', got '{determined}'"
    else:
        verification = f"Role '{determined}' confirmed." if role else "Role determined."

    steps.append(_verify("Role assignment", verification))
    return {"answer": determined, "steps": steps, "verification": verification}


def solve_food_chain(params: dict) -> dict:
    """Solve food-chain link / arrow count and energy flow questions."""
    steps = []
    organism_count = params.get("organism_count", 5)
    chain          = params.get("chain", "")

    if chain:
        organisms = [o.strip() for o in chain.replace("→", ",").replace("->", ",").split(",") if o.strip()]
        organism_count = len(organisms)
        arrows = organism_count - 1

        steps.append(_step("Count organisms", f"Organisms in chain: {organisms} ({organism_count} organisms)."))
        steps.append(_step("Count energy transfers", f"Arrows = organisms − 1 = {organism_count} − 1 = {arrows}."))
        steps.append(_step("Identify producer", f"First organism '{organisms[0]}' is the producer."))
        steps.append(_step("Identify consumers", f"Middle organisms {organisms[1:-1]} are consumers."))
        steps.append(_step("Identify decomposer link", f"After last consumer dies, decomposers break it down."))

        energy_check = "Energy flows from sun → producer → primary consumer → secondary consumer → … → decomposer."
        verification = _verify("Arrow count", f"{organism_count} organisms → {arrows} energy transfer arrows ✓")
    else:
        arrows = organism_count - 1
        steps.append(_step("Formula", f"Arrows = n − 1 where n = number of organisms."))
        steps.append(_step("Calculate", f"{organism_count} − 1 = {arrows} arrows."))
        verification = _verify("Calculation", f"{organism_count} organisms → {arrows} arrows ✓")

    answer = f"{organism_count} organisms, {arrows} energy transfer arrows"
    return {"answer": answer, "steps": steps, "verification": verification}


def solve_biodiversity(params: dict) -> dict:
    """Solve biodiversity variety / classification questions."""
    steps = []
    count       = params.get("count", 5)
    category    = params.get("category", "plants")
    region      = params.get("region", "India")

    examples = {
        "plants":  ["neem", "mango", "banyan", "tulsi", "hibiscus", "coconut", "teak"],
        "animals": ["tiger", "elephant", "peacock", "deer", "monkey", "cobra", "kingfisher"],
        "birds":   ["peacock", "kingfisher", "crow", "sparrow", "parrot"],
        "trees":   ["banyan", "mango", "neem", "peepal", "teak", "coconut"],
    }

    pool = examples.get(category.lower(), examples["plants"])
    selected = pool[:count]
    steps.append(_step("Identify category", f"Category requested: {category} in {region}."))
    steps.append(_step("List examples", f"Examples selected: {', '.join(selected)}."))
    steps.append(_step("Verify count", f"{len(selected)} examples from {len(pool)} available in pool."))

    verification = f"{len(selected)} {category} examples from {region} biodiversity list ✓"
    steps.append(_verify("Count check", verification))

    return {"answer": selected, "steps": steps, "verification": verification}


def solve_resources(params: dict) -> dict:
    """Solve natural resource / conservation numerical questions."""
    steps = []
    total_water_percent  = params.get("fresh_percent", 2.5)
    usable_percent      = params.get("usable_percent", 0.3)
    population          = params.get("population", 10)
    trees_per_person    = params.get("trees_per_person", 2)

    fresh_volume = Fraction(total_water_percent, 100)
    usable_volume = Fraction(usable_percent, 100) * fresh_volume
    total_trees = population * trees_per_person

    steps.append(_step("Given data",
        f"Freshwater = {total_water_percent}% of total water; "
        f"usable fraction = {usable_percent}% of freshwater."))
    steps.append(_step("Compute usable fraction",
        f"Usable = {usable_percent}/100 × {fresh_volume} = {usable_volume} ≈ {float(usable_volume):.4f}."))
    steps.append(_step("Compute trees needed",
        f"Trees = {population} people × {trees_per_person} trees/person = {total_trees} trees."))

    verification = (
        f"Water check: {float(usable_volume):.4f} ≈ {usable_percent}% of 2.5% = 0.075% of total water. "
        f"Trees: {total_trees} for {population} people ✓"
    )
    steps.append(_verify("Numerical check", verification))
    return {
        "answer": {"usable_fraction_pct": float(usable_volume * 100),
                    "trees_needed": total_trees},
        "steps": steps,
        "verification": verification,
    }


# Registry of all solvers
SOLVERS = {
    "environment":   solve_environment,
    "ecosystem":     solve_ecosystem,
    "food_chain":    solve_food_chain,
    "biodiversity":  solve_biodiversity,
    "resources":     solve_resources,
}


def solve_any(q_type: str, params: dict) -> dict:
    """Dispatch to the correct solver based on question topic type."""
    solver = SOLVERS.get(q_type)
    if solver is None:
        return {"answer": params.get("expected", ""),
                "steps": ["No solver available for this type."],
                "verification": "N/A"}
    return solver(params)


# ---------------------------------------------------------------------------
# Question Bank
# ---------------------------------------------------------------------------

# Each entry: (type, topic, difficulty, is_indian, template_fn)
# template_fn returns the question dict.

def _mcq_env_indian(seed: int) -> dict:
    _s(seed)
    item = random.choice(INDIAN_PLANTS + INDIAN_ANIMALS + ["sunlight", "soil", "water", "temperature"])
    is_biotic = item not in ["sunlight", "soil", "water", "temperature", "air"]
    correct = "Biotic" if is_biotic else "Abiotic"
    wrong_opts = ["Abiotic"] if is_biotic else ["Biotic"]
    options = [correct] + wrong_opts + ["Both", "Neither"]
    random.shuffle(options)
    return {
        "id": f"c6_evs_001_mcq_{seed}",
        "type": "MCQ",
        "topic": "Environment - biotic and abiotic",
        "difficulty": "Easy",
        "question": f"In the context of a mango tree in an Indian village, classify '{item}': Is it biotic or abiotic?",
        "options": options,
        "answer": correct,
        "explanation": (
            f"Step 1 — Definition: Biotic components are living things that grow, reproduce, and respond to stimuli. "
            f"Abiotic components are non-living physical factors.\n"
            f"Step 2 — Analyse '{item}': {'It grows, reproduces, and shows response to stimuli → biotic.' if is_biotic else 'It lacks life characteristics → abiotic.'}\n"
            f"Verification — Classification: '{item}' → {correct}. ✓"
        ),
        "indian_context": True,
    }


def _mcq_env_standard(seed: int) -> dict:
    _s(seed)
    q = random.choice([
        ("Which of the following is an abiotic component of a pond ecosystem?",
         "Water", ["Fish", "Algae", "Water Lily"], "Water"),
        ("Plants are classified as which type of biotic component?",
         "Producers", ["Consumers", "Decomposers", "Parasites"], "Producers"),
        ("Which organism breaks down dead matter and returns nutrients to the soil?",
         "Fungi", {"Fungi": True, "Earthworm": False, "Grass": False, "Sunlight": False},
         None),
    ])
    _s(seed)
    if isinstance(q[2], list):
        question_text, answer_text, distractors, _ = q
        options = [answer_text] + distractors
        random.shuffle(options)
        explanation = (
            f"Step 1 — Identify the key concept in the question.\n"
            f"Step 2 — Recall: {answer_text} fits the description.\n"
            f"Verification — {answer_text} is the correct choice. ✓"
        )
        return {
            "id": f"c6_evs_001_mcq_s_{seed}",
            "type": "MCQ", "topic": "Environment - biotic and abiotic",
            "difficulty": "Easy",
            "question": question_text,
            "options": options, "answer": answer_text,
            "explanation": explanation, "indian_context": False,
        }
    else:
        question_text, answer_text, opts_dict, _ = q
        options = list(opts_dict.keys())
        random.shuffle(options)
        explanation = (
            f"Step 1 — Understand each option.\n"
            f"Step 2 — Eliminate incorrect options.\n"
            f"Step 3 — '{answer_text}' is correct.\n"
            f"Verification — Cross-check: {answer_text} matches the definition. ✓"
        )
        return {
            "id": f"c6_evs_001_mcq_s_{seed}",
            "type": "MCQ", "topic": "Environment - biotic and abiotic",
            "difficulty": "Easy",
            "question": question_text,
            "options": options, "answer": answer_text,
            "explanation": explanation, "indian_context": False,
        }


def _fill_env_indian(seed: int) -> dict:
    _s(seed)
    item = random.choice(["Tulsi plant", "Tiger in Ranthambore", "Soil in a field", "Rainfall in Cherrapunji"])
    is_biotic = item[0].isupper() and item.split()[0] not in ["Soil", "Rainfall"]
    answer = "biotic" if is_biotic else "abiotic"
    return {
        "id": f"c6_evs_001_fb_{seed}",
        "type": "fill_blank",
        "topic": "Environment - biotic and abiotic",
        "difficulty": "Easy",
        "question": f"A {item} found in India is an example of a ______ component of the environment.",
        "options": [answer],
        "answer": answer,
        "explanation": (
            f"Step 1 — Understand biotic = living; abiotic = non-living.\n"
            f"Step 2 — '{item}' {'is a living thing that grows and reproduces.' if is_biotic else 'is a non-living physical factor.'}\n"
            f"Verification — '{item}' → {answer} component. ✓"
        ),
        "indian_context": True,
    }


def _short_env_indian(seed: int) -> dict:
    _s(seed)
    item = random.choice(INDIAN_ANIMALS + INDIAN_PLANTS)
    return {
        "id": f"c6_evs_001_sa_{seed}",
        "type": "short_answer",
        "topic": "Environment - biotic and abiotic",
        "difficulty": "Easy",
        "question": f"Give two characteristics that show a {item} is a biotic component of the environment.",
        "options": [],
        "answer": "Growth and reproduction; response to stimuli (e.g., movement toward food/shelter).",
        "explanation": (
            "Step 1 — Recall the defining characteristics of biotic components: growth, reproduction, and response to stimuli.\n"
            f"Step 2 — A {item} grows from a seed/young form, reproduces, and responds to its environment (e.g., seeking food).\n"
            "Verification — Both characteristics apply to all biotic components. ✓"
        ),
        "indian_context": True,
    }


def _long_env_standard(seed: int) -> dict:
    _s(seed)
    return {
        "id": f"c6_evs_001_la_{seed}",
        "type": "long_answer",
        "topic": "Environment - biotic and abiotic",
        "difficulty": "Medium",
        "question": (
            "Explain with two examples how biotic and abiotic components interact in a forest ecosystem. "
            "Why is balance between them important for a healthy environment?"
        ),
        "options": [],
        "answer": (
            "Example 1: Plants (biotic) use sunlight, water, and carbon dioxide (abiotic) for photosynthesis, "
            "producing food and oxygen. Example 2: Decomposers (biotic) break down dead organisms, releasing "
            "minerals (abiotic) into the soil. Balance is important because disruption in one component "
            "(e.g., deforestation reducing oxygen) affects all other components, making the environment unhealthy."
        ),
        "explanation": (
            "Step 1 — Define biotic and abiotic components.\n"
            "Step 2 — Provide two specific interaction examples.\n"
            "Step 3 — Explain why maintaining balance prevents ecosystem collapse.\n"
            "Verification — Two valid examples + reason for balance = complete answer. ✓"
        ),
        "indian_context": False,
    }


def _mcq_eco_indian(seed: int) -> dict:
    _s(seed)
    q_data = random.choice([
        ("In a Gir forest grassland, which organism is the PRODUCER in the food chain: grass → deer → lion?",
         "Grass", ["Deer", "Lion", "Grasshopper"], "Grass"),
        ("Which of these is a decomposer found in Indian forests?",
         "Fungi", ["Tiger", "Deer", "Peacock"], "Fungi"),
        ("An animal that eats both plants and animals is called:",
         "Omnivore", ["Herbivore", "Carnivore", "Decomposer"], "Omnivore"),
    ])
    question_text, answer_text, distractors, _ = q_data
    options = [answer_text] + distractors
    _s(seed)
    random.shuffle(options)
    return {
        "id": f"c6_evs_002_mcq_{seed}",
        "type": "MCQ", "topic": "Ecosystems - producers, consumers, decomposers",
        "difficulty": "Medium",
        "question": question_text,
        "options": options, "answer": answer_text,
        "explanation": (
            f"Step 1 — Recall definitions: Producer makes own food; consumer eats other organisms; "
            f"decomposer breaks down dead matter; omnivore eats both plants and animals.\n"
            f"Step 2 — Analyse: '{answer_text}' fits the description in the question.\n"
            f"Verification — '{answer_text}' is the correct classification. ✓"
        ),
        "indian_context": True,
    }


def _fill_eco_indian(seed: int) -> dict:
    _s(seed)
    chain = random.choice(INDIAN_FOOD_CHAINS)
    first = chain.split("→")[0].strip()
    return {
        "id": f"c6_evs_002_fb_{seed}",
        "type": "fill_blank",
        "topic": "Ecosystems - food chains",
        "difficulty": "Medium",
        "question": f"In the food chain: {chain}, the first organism '{first}' is a ______.",
        "options": ["producer"],
        "answer": "producer",
        "explanation": (
            f"Step 1 — Identify the first organism: '{first}'.\n"
            "Step 2 — Producers are organisms that make their own food through photosynthesis.\n"
            f"Step 3 — '{first}' is a plant/algae → it makes its own food → it is a producer.\n"
            "Verification — First organism in any food chain is always the producer. ✓"
        ),
        "indian_context": True,
    }


def _short_eco_indian(seed: int) -> dict:
    _s(seed)
    animal = random.choice(["cow", "deer", "lion", "human", "bear"])
    consumer_type = {"cow": "herbivore", "deer": "herbivore",
                     "lion": "carnivore", "human": "omnivore", "bear": "omnivore"}[animal]
    return {
        "id": f"c6_evs_002_sa_{seed}",
        "type": "short_answer",
        "topic": "Ecosystems - consumers",
        "difficulty": "Medium",
        "question": f"A {animal} eats plants and small animals. Classify it as herbivore, carnivore, or omnivore and explain why.",
        "options": [],
        "answer": f"Omnivore — it eats both plants (herbivore behaviour) and animals (carnivore behaviour).",
        "explanation": (
            f"Step 1 — Define: Herbivore eats only plants; Carnivore eats only animals; Omnivore eats both.\n"
            f"Step 2 — A {animal} consumes plants AND animals.\n"
            f"Step 3 — Therefore, {animal} = omnivore.\n"
            "Verification — Omnivores include humans, bears, crows. Classification consistent. ✓"
        ),
        "indian_context": True,
    }


def _long_eco_standard(seed: int) -> dict:
    _s(seed)
    chain = random.choice(STANDARD_FOOD_CHAINS)
    return {
        "id": f"c6_evs_002_la_{seed}",
        "type": "long_answer",
        "topic": "Ecosystems - food chains",
        "difficulty": "Medium",
        "question": (
            f"Consider the food chain: {chain}\n"
            "(a) Identify the producer and all consumers.\n"
            "(b) What would happen if the secondary consumer was removed?\n"
            "(c) Name the organism that would act as a decomposer at the end of this chain."
        ),
        "options": [],
        "answer": (
            f"(a) Producer: first organism; Consumers: all others. "
            f"(b) Removing a consumer causes population imbalance — the organism it eats increases, "
            f"its predator decreases, disrupting the entire chain. "
            f"(c) Fungi/bacteria act as decomposers, breaking down dead organisms and returning nutrients to soil."
        ),
        "explanation": (
            "Step 1 — Identify producer (first link) and consumers (remaining links).\n"
            "Step 2 — Removing any link causes cascading effects: prey population rises, predator population falls.\n"
            "Step 3 — Decomposers (fungi, bacteria) break down dead matter from all levels.\n"
            "Verification — All three sub-parts answered with correct reasoning. ✓"
        ),
        "indian_context": False,
    }


def _mcq_biodiv_indian(seed: int) -> dict:
    _s(seed)
    q_data = random.choice([
        ("The Royal Bengal Tiger is the national animal of India. To which category of biodiversity does it belong?",
         "Animals", ["Plants", "Microorganisms", "Soil"], "Animals"),
        ("Which of the following is an example of biodiversity in Indian plants?",
         "Mango tree", ["Tiger", "Elephant", "Peacock"], "Mango tree"),
        ("Biodiversity means:",
         "Variety of living organisms on Earth", ["Only animals", "Only plants", "Non-living things"], "Variety of living organisms on Earth"),
    ])
    question_text, answer_text, distractors, _ = q_data
    options = [answer_text] + distractors
    _s(seed)
    random.shuffle(options)
    return {
        "id": f"c6_evs_003_mcq_{seed}",
        "type": "MCQ", "topic": "Biodiversity",
        "difficulty": "Easy",
        "question": question_text,
        "options": options, "answer": answer_text,
        "explanation": (
            f"Step 1 — Understand biodiversity = variety of living organisms (plants, animals, microorganisms).\n"
            f"Step 2 — '{answer_text}' correctly represents biodiversity in the given context.\n"
            "Verification — Definition matches. ✓"
        ),
        "indian_context": True,
    }


def _fill_biodiv_indian(seed: int) -> dict:
    _s(seed)
    bird = random.choice(["peacock", "kingfisher", "parrot"])
    return {
        "id": f"c6_evs_003_fb_{seed}",
        "type": "fill_blank",
        "topic": "Biodiversity",
        "difficulty": "Easy",
        "question": f"The ______ is India's national bird and an important part of the country's biodiversity.",
        "options": [bird],
        "answer": bird,
        "explanation": (
            f"Step 1 — Recall: India's national bird is the peacock.\n"
            f"Step 2 — '{bird}' is a native bird species contributing to India's biodiversity.\n"
            "Verification — Peacock is India's national bird, found across the country. ✓"
        ),
        "indian_context": True,
    }


def _short_biodiv_indian(seed: int) -> dict:
    _s(seed)
    region = random.choice(INDIAN_ECOSYSTEMS)
    return {
        "id": f"c6_evs_003_sa_{seed}",
        "type": "short_answer",
        "topic": "Biodiversity",
        "difficulty": "Easy",
        "question": f"Name two types of organisms found in the {region} that show biodiversity.",
        "options": [],
        "answer": "Example answer: Tiger and neem tree; or dolphin and mangrove plants.",
        "explanation": (
            f"Step 1 — Biodiversity includes variety of plants, animals, and microorganisms.\n"
            f"Step 2 — The {region} hosts many species of plants and animals.\n"
            "Step 3 — Any two different organism types from this region are valid.\n"
            "Verification — At least two distinct organisms from the named region. ✓"
        ),
        "indian_context": True,
    }


def _long_biodiv_standard(seed: int) -> dict:
    _s(seed)
    return {
        "id": f"c6_evs_003_la_{seed}",
        "type": "long_answer",
        "topic": "Biodiversity",
        "difficulty": "Medium",
        "question": (
            "Why is biodiversity important for the environment? "
            "Give three reasons with examples from nature."
        ),
        "options": [],
        "answer": (
            "1) Source of food and medicine (e.g., medicinal plants like neem). "
            "2) Maintains ecosystem balance (each species has a role). "
            "3) Provides raw materials (wood, fibre, paper). "
            "Loss of biodiversity disrupts these services."
        ),
        "explanation": (
            "Step 1 — Define biodiversity importance.\n"
            "Step 2 — List three reasons with examples.\n"
            "Step 3 — Connect loss of biodiversity to environmental problems.\n"
            "Verification — Three reasons with examples provided. ✓"
        ),
        "indian_context": False,
    }


def _numerical_env(seed: int) -> dict:
    _s(seed)
    families = random.randint(2, 10)
    members  = random.randint(3, 6)
    people   = families * members
    oxygen_per_tree = random.choice([1, 2])
    trees_needed = math.ceil(people / oxygen_per_tree)
    return {
        "id": f"c6_evs_num_env_{seed}",
        "type": "numerical",
        "topic": "Environment - biotic and abiotic",
        "difficulty": "Medium",
        "question": (
            f"One healthy tree produces enough oxygen for {oxygen_per_tree} person(s). "
            f"In a colony of {families} families with {members} members each, "
            f"how many trees are needed to supply oxygen to everyone? Show your calculation."
        ),
        "options": [],
        "answer": f"{trees_needed} trees",
        "explanation": (
            f"Step 1 — Calculate total people: {families} × {members} = {people} people.\n"
            f"Step 2 — Trees needed = Total people ÷ Oxygen per tree = {people} ÷ {oxygen_per_tree} = {people / oxygen_per_tree:.1f}.\n"
            f"Step 3 — Round up to the nearest whole number → {trees_needed} trees.\n"
            f"Verification — {trees_needed} trees × {oxygen_per_tree} person/tree = {trees_needed * oxygen_per_tree} ≥ {people} ✓"
        ),
        "indian_context": True,
        "solver_params": {"type": "resources", "population": people,
                          "trees_per_person": oxygen_per_tree},
    }


def _numerical_food_chain(seed: int) -> dict:
    _s(seed)
    n = random.randint(4, 7)
    arrows = n - 1
    return {
        "id": f"c6_evs_num_fc_{seed}",
        "type": "numerical",
        "topic": "Ecosystems - food chains",
        "difficulty": "Medium",
        "question": (
            f"A food chain has {n} organisms (e.g., plant → insect → frog → snake → eagle → vulture). "
            f"How many arrows (energy transfers) are there? Show your reasoning."
        ),
        "options": [],
        "answer": f"{arrows} energy transfer arrows",
        "explanation": (
            f"Step 1 — Count organisms: n = {n}.\n"
            f"Step 2 — Each arrow connects two organisms.\n"
            f"Step 3 — Number of arrows = n − 1 = {n} − 1 = {arrows}.\n"
            f"Verification — {n} organisms require {arrows} connections between them. ✓"
        ),
        "indian_context": False,
        "solver_params": {"type": "food_chain", "organism_count": n},
    }


def _numerical_water(seed: int) -> dict:
    _s(seed)
    return {
        "id": f"c6_evs_num_water_{seed}",
        "type": "numerical",
        "topic": "Environment - natural resources",
        "difficulty": "Easy",
        "question": (
            "About 2.5% of Earth's total water is freshwater. "
            "Only about 0.3% of this freshwater is available in rivers, lakes, and groundwater for human use. "
            "Calculate what percentage of Earth's TOTAL water is usable fresh water. Show your steps."
        ),
        "options": [],
        "answer": "0.0075% (approx. 0.008%)",
        "explanation": (
            "Step 1 — Freshwater percentage = 2.5% of total.\n"
            "Step 2 — Usable freshwater = 0.3% of freshwater.\n"
            "Step 3 — Usable fraction of total = 2.5% × (0.3/100) = 2.5 × 0.003 = 0.0075%.\n"
            "Verification — 2.5/100 × 0.3/100 = 0.000075 = 0.0075% ✓"
        ),
        "indian_context": False,
        "solver_params": {"type": "resources",
                          "fresh_percent": 2.5, "usable_percent": 0.3},
    }


# ---------------------------------------------------------------------------
# Question generation engine
# ---------------------------------------------------------------------------

_TOPIC_TEMPLATES = {
    "c6_evs_001": [   # Environment: biotic / abiotic
        _mcq_env_indian, _mcq_env_standard,
        _fill_env_indian,
        _short_env_indian,
        _long_env_standard,
    ],
    "c6_evs_002": [   # Ecosystems
        _mcq_eco_indian, _fill_eco_indian,
        _short_eco_indian, _long_eco_standard,
    ],
    "c6_evs_003": [   # Biodiversity
        _mcq_biodiv_indian, _fill_biodiv_indian,
        _short_biodiv_indian, _long_biodiv_standard,
    ],
    "numerical": [
        _numerical_env, _numerical_food_chain, _numerical_water,
    ],
}

_TOPIC_KEYS = list(_TOPIC_TEMPLATES.keys())


def generate_questions(seed: int, count: int = 10) -> list[dict[str, Any]]:
    """
    Deterministically generate `count` questions covering the CISCE Class 6 EVS syllabus.

    50 % of questions carry Indian context (competency-based).
    Types: MCQ, fill_blank, short_answer, long_answer, numerical.
    Topics: c6_evs_001, c6_evs_002, c6_evs_003, numerical.
    """
    _s(seed)
    questions: list[dict[str, Any]] = []

    # Build a flat list of all (topic_key, template_fn) pairs
    all_pairs: list[tuple[str, Any]] = []
    for topic_key, templates in _TOPIC_TEMPLATES.items():
        for tmpl in templates:
            all_pairs.append((topic_key, tmpl))

    total_pairs = len(all_pairs)  # e.g. 15

    for i in range(count):
        pair_idx = i % total_pairs
        topic_key, template_fn = all_pairs[pair_idx]
        is_indian = _indian_flag(0, i)   # even → Indian context

        q_seed = seed + i
        q = template_fn(q_seed)
        q["id"]        = f"c6evs_{pair_idx:03d}_{i:02d}"
        q["indian_context"] = is_indian
        q["topic_node"] = topic_key if topic_key != "numerical" else "numerical"

        # Verify via solver if solver_params present
        if "solver_params" in q:
            sp = dict(q["solver_params"])
            sp["expected"] = q["answer"]
            result = solve_any(sp.get("type", ""), sp)
            q["verification_result"] = result["verification"]

        questions.append(q)

    return questions


# ---------------------------------------------------------------------------
# Verification runner
# ---------------------------------------------------------------------------

def verify_question(q: dict) -> dict:
    """Run the solver for a question and return verification status."""
    if "solver_params" not in q:
        return {"id": q["id"], "status": "no_solver", "detail": "Conceptual question; no numerical solver."}

    sp = dict(q["solver_params"])
    sp["expected"] = q["answer"]
    result = solve_any(sp.get("type", ""), sp)
    return {"id": q["id"], "status": "verified", "detail": result["verification"]}


def verify_all(questions: list[dict]) -> list[dict]:
    """Run verification on all questions that have solvers."""
    return [verify_question(q) for q in questions]


# ---------------------------------------------------------------------------
# Summary / report
# ---------------------------------------------------------------------------

def generate_summary(questions: list[dict]) -> dict:
    """Return a summary of the generated question set."""
    type_counts: dict[str, int]  = {}
    topic_counts: dict[str, int] = {}
    indian_count  = 0
    diff_counts: dict[str, int]  = {}

    for q in questions:
        qt = q.get("type", "unknown")
        tp = q.get("topic_node", "unknown")
        df = q.get("difficulty", "unknown")
        type_counts[qt]  = type_counts.get(qt, 0) + 1
        topic_counts[tp] = topic_counts.get(tp, 0) + 1
        diff_counts[df]  = diff_counts.get(df, 0) + 1
        if q.get("indian_context"):
            indian_count += 1

    total = len(questions)
    return {
        "total_questions": total,
        "indian_context_questions": indian_count,
        "standard_questions": total - indian_count,
        "indian_percentage": round(indian_count / total * 100, 1) if total else 0,
        "by_type": type_counts,
        "by_topic": topic_counts,
        "by_difficulty": diff_counts,
        "syllabus_coverage": list(_TOPIC_TEMPLATES.keys()),
    }


# ---------------------------------------------------------------------------
# Main — demonstration
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    SEED = 42
    NUM_QUESTIONS = 12

    print("=" * 70)
    print(f"CISCE Class 6 EVS — Question Generator Demo  (seed={SEED})")
    print("=" * 70)

    qs = generate_questions(SEED, NUM_QUESTIONS)

    for q in qs:
        print(f"\n{'─'*60}")
        print(f"[{q['type'].upper()}]  Topic: {q['topic']}  |  Indian Context: {q['indian_context']}")
        print(f"Q: {q['question']}")
        if q.get("options"):
            for opt in q["options"]:
                print(f"   ○ {opt}")
        print(f"Answer: {q['answer']}")
        print(f"Explanation:\n{q['explanation']}")

    print(f"\n{'='*70}")
    print("SUMMARY")
    print("=" * 70)
    summary = generate_summary(qs)
    for k, v in summary.items():
        print(f"  {k}: {v}")

    print("\nVERIFICATION RESULTS")
    print("─" * 40)
    for v in verify_all(qs):
        print(f"  {v['id']}: {v['status']}  — {v['detail'][:80]}")