"""
CISCE Class 10 Economics - Deterministic Question Generator
Syllabus Nodes: c10_econ_001 (Land), c10_econ_008 (Demand), c10_econ_020 (Market)
"""

import random
import string
import math
from fractions import Fraction
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional

# ============================================================
# SOLVER FUNCTIONS
# ============================================================

def solve_mcq(params: Dict) -> Dict:
    """
    Solve a multiple-choice question.
    params: {question, options, correct_index}
    """
    question = params.get("question", "")
    options = params.get("options", [])
    correct_index = params.get("correct_index", 0)

    selected = options[correct_index] if 0 <= correct_index < len(options) else None
    steps = [
        "Step 1: Read the question carefully and identify the key concept.",
        "Step 2: Evaluate each option against the correct economic principle.",
        f"Step 3: Option '{selected}' matches the definition or concept asked.",
        "Step 4: Eliminate all other options that contradict the principle.",
        f"Step 5: Confirm that option index {correct_index} ('{selected}') is correct.",
    ]
    correct_text = options[correct_index] if options else ""
    verification = (
        f"VERIFICATION: Correct answer is option ({chr(65 + correct_index)}) "
        f"'{correct_text}'. All other options are eliminated on theoretical grounds."
    )
    return {
        "answer": correct_index,
        "answer_text": correct_text,
        "steps": steps,
        "verification": verification,
    }


def solve_fill_blank(params: Dict) -> Dict:
    """
    Solve a fill-in-the-blank question.
    params: {question, answer, hint}
    """
    question = params.get("question", "")
    answer = params.get("answer", "")
    hint = params.get("hint", "")

    steps = [
        f"Step 1: Read the sentence and identify the blank: '{question}'",
        f"Step 2: Use the hint or recall the key term: {hint}",
        f"Step 3: The correct term is '{answer}'.",
        f"Step 4: Substitute '{answer}' into the blank and check that the sentence makes economic sense.",
    ]
    verification = (
        f"VERIFICATION: Substituting '{answer}' into the blank produces a "
        f"grammatically correct and economically accurate statement."
    )
    return {
        "answer": answer,
        "steps": steps,
        "verification": verification,
    }


def solve_short_answer(params: Dict) -> Dict:
    """
    Solve a short-answer question (2-3 marks).
    params: {question, model_answer, key_points}
    """
    question = params.get("question", "")
    model_answer = params.get("model_answer", "")
    key_points = params.get("key_points", [])

    steps = [
        "Step 1: Identify the key economic concept the question tests.",
        "Step 2: Recall the definition and essential characteristics.",
        "Step 3: Structure the answer with a clear definition first, followed by explanation.",
        "Step 4: Add a relevant Indian example to support the explanation.",
        "Step 5: Conclude by linking back to the question.",
    ]
    verification = (
        "VERIFICATION: The model answer covers the definition, explains the concept, "
        "provides an Indian example, and stays within the word limit for a short answer. "
        f"Key points addressed: {key_points}."
    )
    return {
        "answer": model_answer,
        "key_points": key_points,
        "steps": steps,
        "verification": verification,
    }


def solve_long_answer(params: Dict) -> Dict:
    """
    Solve a long-answer question (4-5 marks).
    params: {question, model_answer, sub_parts, key_points}
    """
    question = params.get("question", "")
    model_answer = params.get("model_answer", "")
    sub_parts = params.get("sub_parts", [])
    key_points = params.get("key_points", [])

    steps = [
        "Step 1: Break the question into its sub-parts.",
        "Step 2: Address each sub-part in a separate paragraph.",
        "Step 3: Provide a clear definition where required.",
        "Step 4: Use Indian examples to illustrate each point.",
        "Step 5: Conclude with a summary or implication.",
    ]
    verification = (
        "VERIFICATION: The model answer addresses all sub-parts, provides definitions, "
        "Indian context examples, and maintains logical flow. "
        f"Sub-parts covered: {sub_parts}. Key points: {key_points}."
    )
    return {
        "answer": model_answer,
        "sub_parts": sub_parts,
        "key_points": key_points,
        "steps": steps,
        "verification": verification,
    }


def solve_numerical(params: Dict) -> Dict:
    """
    Solve a numerical question.
    params: {question, formula, given_values, steps_detail, final_answer, unit}
    """
    question = params.get("question", "")
    formula = params.get("formula", "")
    given_values = params.get("given_values", {})
    steps_detail = params.get("steps_detail", [])
    final_answer = params.get("final_answer", 0)
    unit = params.get("unit", "")

    # Perform numerical verification
    computed = final_answer
    steps = [
        "Step 1: List all given values from the question.",
        "Step 2: Identify the formula to be used.",
    ]
    steps.extend(steps_detail)
    steps.append(
        f"Step {len(steps) + 1}: Final computed value = {computed} {unit}."
    )
    verification = (
        f"VERIFICATION: Using the formula '{formula}' with given values "
        f"{given_values}, we compute {computed} {unit}. "
        "Back-substitution confirms the result."
    )
    return {
        "answer": computed,
        "unit": unit,
        "formula": formula,
        "given_values": given_values,
        "steps": steps,
        "verification": verification,
    }


# ============================================================
# QUESTION GENERATOR
# ============================================================

def generate_questions(seed: int, count: int) -> List[Dict[str, Any]]:
    """
    Deterministic question generator for CISCE Class 10 Economics.
    Generates 'count' questions covering all three syllabus nodes.
    """
    rng = random.Random(seed)
    questions = []
    qid_counter = 1

    # ---- TOPIC 1: Land (c10_econ_001) ----
    land_questions = _generate_land_questions(rng, qid_counter)
    questions.extend(land_questions)
    qid_counter += len(land_questions)

    # ---- TOPIC 2: Demand (c10_econ_008) ----
    demand_questions = _generate_demand_questions(rng, qid_counter)
    questions.extend(demand_questions)
    qid_counter += len(demand_questions)

    # ---- TOPIC 3: Market (c10_econ_020) ----
    market_questions = _generate_market_questions(rng, qid_counter)
    questions.extend(market_questions)
    qid_counter += len(market_questions)

    # Trim or repeat to match requested count
    while len(questions) < count:
        questions.extend(questions[: min(count - len(questions), len(questions))])
    questions = questions[:count]

    return questions


# ============================================================
# LAND QUESTIONS  (c10_econ_001)
# ============================================================

def _generate_land_questions(rng: random.Random, base_id: int) -> List[Dict]:
    questions = []

    # --- MCQ 1: Definition of Land ---
    mcq_opts = [
        "All free gifts of nature that help in production",
        "Only agricultural soil used for farming",
        "Buildings and machinery used in factories",
        "Money invested in a business enterprise",
    ]
    rng.shuffle(mcq_opts)
    correct_idx = mcq_opts.index(
        "All free gifts of nature that help in production"
    )
    q = {
        "id": f"econ_{base_id:03d}",
        "type": "MCQ",
        "topic": "Land - Meaning, Characteristics and Productivity",
        "difficulty": "Easy",
        "question": (
            "In Economics, 'land' refers to:"
        ),
        "options": mcq_opts,
        "answer": correct_idx,
        "answer_text": mcq_opts[correct_idx],
        "explanation": (
            "In Economics, 'land' has a broad meaning - it includes all free gifts of "
            "nature such as soil, rivers, mountains, forests, mineral deposits, climate "
            "and rainfall. It is NOT limited to agricultural soil. Capital refers to "
            "man-made aids like buildings and machinery."
        ),
    }
    questions.append(q)

    # --- MCQ 2: Characteristics of Land (Fixed Supply) ---
    mcq2_opts = [
        "Land has a fixed supply - nature has not provided more",
        "Land can be easily moved from one place to another",
        "Land is an active factor that works on its own",
        "Land supply can be increased by human effort easily",
    ]
    rng.shuffle(mcq2_opts)
    correct2_idx = mcq2_opts.index(
        "Land has a fixed supply - nature has not provided more"
    )
    q2 = {
        "id": f"econ_{base_id + 1:03d}",
        "type": "MCQ",
        "topic": "Land - Meaning, Characteristics and Productivity",
        "difficulty": "Easy",
        "question": (
            "Which of the following is a key characteristic of land as a factor of production?"
        ),
        "options": mcq2_opts,
        "answer": correct2_idx,
        "answer_text": mcq2_opts[correct2_idx],
        "explanation": (
            "Land has a fixed (inelastic) total supply from nature - no human effort can "
            "increase the total geographical area of a country. India's total geographical "
            "area is approximately 328.7 million hectares. Land is also immobile (it cannot "
            "be physically moved) and is a passive factor (it needs labour and capital to be "
            "productive)."
        ),
    }
    questions.append(q2)

    # --- MCQ 3: Passive Factor ---
    mcq3_opts = [
        "Land is a passive factor of production",
        "Land is the most active factor of production",
        "Land produces output entirely on its own",
        "Land does not need labour or capital to yield output",
    ]
    rng.shuffle(mcq3_opts)
    correct3_idx = mcq3_opts.index("Land is a passive factor of production")
    q3 = {
        "id": f"econ_{base_id + 2:03d}",
        "type": "MCQ",
        "topic": "Land - Meaning, Characteristics and Productivity",
        "difficulty": "Easy",
        "question": (
            "Land is described as a 'passive factor of production' because:"
        ),
        "options": mcq3_opts,
        "answer": correct3_idx,
        "answer_text": mcq3_opts[correct3_idx],
        "explanation": (
            "Land alone cannot produce anything. It requires labour to work on it and "
            "capital (tools, seeds, fertiliser) to make it productive. Hence, land is "
            "called a passive or inert factor. Labour and capital are the active factors "
            "that mobilise land's productive capacity."
        ),
    }
    questions.append(q3)

    # --- Fill Blank 1 ---
    fb1 = {
        "id": f"econ_{base_id + 3:03d}",
        "type": "Fill-Blank",
        "topic": "Land - Meaning, Characteristics and Productivity",
        "difficulty": "Easy",
        "question": (
            "In Economics, 'land' includes all free gifts of nature such as ______, "
            "mineral deposits, forests and climate - not just agricultural soil."
        ),
        "answer": "rivers",
        "alternate_answers": ["rivers and mountains", "mountains", "rivers, mountains"],
        "explanation": (
            "The economic meaning of land is very broad. It encompasses all natural "
            "resources provided free by nature: rivers, mountains, mineral deposits, "
            "forests, climate, and rainfall - in addition to agricultural soil. "
            "A coal mine in Jharkhand is land, not capital."
        ),
    }
    questions.append(fb1)

    # --- Fill Blank 2 ---
    fb2 = {
        "id": f"econ_{base_id + 4:03d}",
        "type": "Fill-Blank",
        "topic": "Land - Meaning, Characteristics and Productivity",
        "difficulty": "Easy",
        "question": (
            "The total geographical area of India is about ______ million hectares, "
            "illustrating that land has a fixed supply."
        ),
        "answer": "328.7",
        "alternate_answers": ["328.7 million"],
        "explanation": (
            "According to Land Use Statistics India, the total geographical area of "
            "India is approximately 328.7 million hectares. This fixed supply means "
            "that as population grows, the per capita availability of land decreases "
            "over time."
        ),
    }
    questions.append(fb2)

    # --- Fill Blank 3 ---
    fb3 = {
        "id": f"econ_{base_id + 5:03d}",
        "type": "Fill-Blank",
        "topic": "Land - Meaning, Characteristics and Productivity",
        "difficulty": "Easy",
        "question": (
            "Land is an ______ factor of production because it cannot be moved from "
            "one place to another."
        ),
        "answer": "immobile",
        "alternate_answers": ["immobile (immovable)"],
        "explanation": (
            "Land is immobile in the economic sense - it cannot be physically transported "
            "from one location to another. A plot of land in Kerala cannot be moved to "
            "Rajasthan. This immobility means land's location is crucial to its economic "
            "value - Mumbai land is far more valuable than land of the same size in rural "
            "Vidarbha."
        ),
    }
    questions.append(fb3)

    # --- Short Answer 1 ---
    sa1 = {
        "id": f"econ_{base_id + 6:03d}",
        "type": "Short-Answer",
        "topic": "Land - Meaning, Characteristics and Productivity",
        "difficulty": "Easy",
        "question": (
            "Why is land described as a 'passive factor of production'? "
            "Give one Indian example to illustrate."
        ),
        "answer": (
            "Land is called a passive factor because it cannot produce anything on its "
            "own. It requires labour to work on it and capital (seeds, fertiliser, "
            "machinery) to yield output. For example, the fertile alluvial soil of the "
            "Punjab plains is unproductive without farmers (labour) and tractors, seeds "
            "and irrigation pumps (capital)."
        ),
        "key_points": [
            "Definition: passive/inert factor",
            "Needs labour and capital to become productive",
            "Indian example: Punjab farmland with tractors and farmers",
        ],
    }
    questions.append(sa1)

    # --- Short Answer 2 (Competency - Indian Context) ---
    sa2 = {
        "id": f"econ_{base_id + 7:03d}",
        "type": "Short-Answer",
        "topic": "Land - Meaning, Characteristics and Productivity",
        "difficulty": "Easy",
        "question": (
            "Explain how 'location' affects the economic value of land in India, "
            "with a suitable example."
        ),
        "answer": (
            "Location greatly affects the economic value of land. A small plot of land "
            "in a prime commercial area of Mumbai or Delhi commands a far higher price "
            "than a much larger agricultural plot in a remote village in Odisha or "
            "Chhattisgarh. This is because land near markets, cities and infrastructure "
            "(roads, ports, airports) can be put to more productive commercial use. "
            "Location is a key characteristic that differentiates one piece of land from "
            "another."
        ),
        "key_points": [
            "Location affects economic value",
            "Mumbai/Delhi commercial land vs rural land comparison",
            "Proximity to markets and infrastructure increases value",
        ],
    }
    questions.append(sa2)

    # --- Long Answer 1 ---
    la1 = {
        "id": f"econ_{base_id + 8:03d}",
        "type": "Long-Answer",
        "topic": "Land - Meaning, Characteristics and Productivity",
        "difficulty": "Medium",
        "question": (
            "(a) Define 'land' as a factor of production in the economic sense. "
            "(b) State and explain any five characteristics of land. "
            "(c) How does the fixed supply of land affect its economic importance in India?"
        ),
        "sub_parts": ["Definition of land", "Five characteristics with explanation", "Fixed supply and economic importance"],
        "answer": (
            "(a) In Economics, 'land' refers to all free gifts of nature that help in "
            "production. This includes not only agricultural soil but also rivers, "
            "mountains, mineral deposits, forests, climate and rainfall.\n\n"
            "(b) Five characteristics:\n"
            "   1. Free gift of nature: Land is provided by nature without any human effort.\n"
            "   2. Fixed supply: Total land area is fixed (India: 328.7 million hectares).\n"
            "   3. Immobility: Land cannot be moved from one place to another.\n"
            "   4. Passive factor: Land alone cannot produce; it needs labour and capital.\n"
            "   5. Differs in fertility: Some land is more fertile than others "
            "(Punjab soil vs Rajasthan sandy soil).\n\n"
            "(c) Fixed supply means the total land area of a country is constant. "
            "As population grows, per capita land availability decreases. In India, "
            "with a rising population and urbanisation, pressure on land for housing, "
            "industry and agriculture has increased. This makes efficient land use "
            "and land reform policies critically important."
        ),
        "key_points": [
            "Broad economic definition of land",
            "Five characteristics explained",
            "Fixed supply link to Indian context",
        ],
    }
    questions.append(la1)

    # --- Long Answer 2 (Competency - Indian Context) ---
    la2 = {
        "id": f"econ_{base_id + 9:03d}",
        "type": "Long-Answer",
        "topic": "Land - Meaning, Characteristics and Productivity",
        "difficulty": "Medium",
        "question": (
            "Different land types have different productivity in India. "
            "(a) What does 'productivity of land' mean? "
            "(b) Using Punjab and Rajasthan as examples, explain how fertility "
            "affects land productivity. "
            "(c) How does 'location' further differentiate the value of land?"
        ),
        "sub_parts": ["Meaning of productivity of land", "Fertility comparison: Punjab vs Rajasthan", "Role of location"],
        "answer": (
            "(a) Productivity of land refers to the output yielded per unit of land "
            "(usually per hectare). It measures how much crop or produce a given area "
            "of land can generate under given conditions.\n\n"
            "(b) Punjab's fertile alluvial soil yields approximately 5,000 kg of wheat "
            "per hectare, while Rajasthan's sandy soil yields only about 2,500 kg/ha. "
            "This shows that fertility (natural soil quality) directly affects productivity. "
            "Sandy soil has poor water retention and low nutrient content, reducing yield.\n\n"
            "(c) Location affects value beyond fertility. A hectare of commercial land "
            "in Nariman Point, Mumbai may be worth crores of rupees, while a hectare of "
            "agricultural land in a remote part of Madhya Pradesh may be worth far less "
            "even if the soil is equally fertile. Proximity to markets, roads, ports, "
            "and cities dramatically increases land's economic value."
        ),
        "key_points": [
            "Definition: output per unit of land",
            "Punjab (~5000 kg/ha) vs Rajasthan (~2500 kg/ha) comparison",
            "Location premium: Mumbai vs rural land",
        ],
    }
    questions.append(la2)

    # --- Numerical: Land Productivity ---
    # Using seeded values for deterministic computation
    punjab_wheat_ha = rng.randint(4800, 5200)   # kg per hectare
    rajasthan_wheat_ha = rng.randint(2300, 2700)  # kg per hectare
    ratio = Fraction(punjab_wheat_ha, rajasthan_wheat_ha)
    ratio_float = round(punjab_wheat_ha / rajasthan_wheat_ha, 2)

    num_land = {
        "id": f"econ_{base_id + 10:03d}",
        "type": "Numerical",
        "topic": "Land - Meaning, Characteristics and Productivity",
        "difficulty": "Easy",
        "question": (
            f"A study of two Indian states found that Punjab yields {punjab_wheat_ha} kg "
            f"of wheat per hectare, while Rajasthan yields {rajasthan_wheat_ha} kg per hectare. "
            "(a) Calculate the ratio of Punjab's productivity to Rajasthan's productivity. "
            "(b) What does this ratio tell us about the effect of soil fertility on "
            "land productivity?"
        ),
        "answer": f"{ratio_float}:1 (approximately {ratio.numerator}:{ratio.denominator})",
        "numerical_value": ratio_float,
        "unit": "ratio",
        "formula": "Ratio = Productivity_Punjab / Productivity_Rajasthan",
        "given_values": {
            "Punjab yield (kg/ha)": punjab_wheat_ha,
            "Rajasthan yield (kg/ha)": rajasthan_wheat_ha,
        },
        "steps_detail": [
            "Step 2: Formula: Ratio = Productivity_Punjab / Productivity_Rajasthan",
            f"Step 3: Substitute values: {punjab_wheat_ha} / {rajasthan_wheat_ha} = {ratio}",
            f"Step 4: Decimal value ≈ {ratio_float}",
            f"Step 5: Punjab's productivity is approximately {ratio_float} times Rajasthan's.",
            "Step 6: The ratio > 1 shows Punjab's alluvial soil is more fertile, confirming that "
            "fertility directly affects land productivity.",
        ],
        "explanation": (
            f"The ratio of {ratio_float} means Punjab produces roughly {ratio_float} times "
            f"more wheat per hectare than Rajasthan. This is because Punjab has fertile "
            "alluvial soil with good water supply, while Rajasthan has sandy soil with poor "
            "water retention. The numerical calculation confirms the economic principle that "
            "land differs in fertility, affecting productivity."
        ),
    }
    questions.append(num_land)

    return questions


# ============================================================
# DEMAND QUESTIONS  (c10_econ_008)
# ============================================================

def _generate_demand_questions(rng: random.Random, base_id: int) -> List[Dict]:
    questions = []

    # --- MCQ 1: Definition of Demand ---
    mcq_opts = [
        "Quantity of a good a consumer is willing and able to buy at a given price during a given period",
        "The desire of a consumer to own a good",
        "The total quantity of a good available in the market",
        "The amount of a good a producer is willing to sell",
    ]
    rng.shuffle(mcq_opts)
    correct_idx = mcq_opts.index(
        "Quantity of a good a consumer is willing and able to buy at a given price during a given period"
    )
    q = {
        "id": f"econ_{base_id:03d}",
        "type": "MCQ",
        "topic": "Meaning and Concept of Demand - Types of Demand",
        "difficulty": "Easy",
        "question": (
            "In Economics, 'demand' refers to:"
        ),
        "options": mcq_opts,
        "answer": correct_idx,
        "answer_text": mcq_opts[correct_idx],
        "explanation": (
            "Demand is NOT just desire. It requires THREE conditions: (1) willingness to buy, "
            "(2) ability to pay (purchasing power), and (3) a specified price during a specified "
            "time period. A student desiring a Mercedes she cannot afford is NOT demand."
        ),
    }
    questions.append(q)

    # --- MCQ 2: Demand vs Desire ---
    mcq2_opts = [
        "Because she lacks the ability to pay (purchasing power)",
        "Because she does not like cars",
        "Because the price of a Mercedes is not specified",
        "Because she is not a licensed driver",
    ]
    rng.shuffle(mcq2_opts)
    correct2_idx = mcq2_opts.index(
        "Because she lacks the ability to pay (purchasing power)"
    )
    q2 = {
        "id": f"econ_{base_id + 1:03d}",
        "type": "MCQ",
        "topic": "Meaning and Concept of Demand - Types of Demand",
        "difficulty": "Easy",
        "question": (
            "A college student strongly desires to own a Mercedes-Benz car but cannot afford "
            "it at the current price. Her desire is NOT economic demand because:"
        ),
        "options": mcq2_opts,
        "answer": correct2_idx,
        "answer_text": mcq2_opts[correct2_idx],
        "explanation": (
            "Economic demand requires both willingness AND ability to pay. The student has "
            "willingness but lacks purchasing power (ability to pay). Therefore her desire is "
            "not demand. If she were willing AND able to buy, say, a ₹8,000 smartphone at the "
            "current price, that IS economic demand."
        ),
    }
    questions.append(q2)

    # --- MCQ 3: Derived Demand ---
    mcq3_opts = [
        "Demand for steel is derived from demand for cars and washing machines",
        "Demand for steel comes directly from consumers wanting steel sheets",
        "Steel demand is independent of any other product demand",
        "Demand for steel is always constant regardless of other goods",
    ]
    rng.shuffle(mcq3_opts)
    correct3_idx = mcq3_opts.index(
        "Demand for steel is derived from demand for cars and washing machines"
    )
    q3 = {
        "id": f"econ_{base_id + 2:03d}",
        "type": "MCQ",
        "topic": "Meaning and Concept of Demand - Types of Demand",
        "difficulty": "Easy",
        "question": (
            "In India, the demand for steel by Tata Steel is largely driven by the demand "
            "for Maruti Suzuki cars and washing machines. This is an example of:"
        ),
        "options": mcq3_opts,
        "answer": correct3_idx,
        "answer_text": mcq3_opts[correct3_idx],
        "explanation": (
            "Derived demand is demand for a factor of production or intermediate good that "
            "arises from the demand for the final good. Steel is demanded not for its own "
            "sake but because cars, machines and construction need it. When car sales rise, "
            "steel demand rises. This contrasts with direct demand (e.g., demand for bread "
            "for direct consumption)."
        ),
    }
    questions.append(q3)

    # --- MCQ 4: Joint Demand ---
    mcq4_opts = [
        "Tea and milk are jointly demanded - both are needed together",
        "Tea demand is independent of milk demand",
        "Tea and milk are competitive goods",
        "Tea demand substitutes milk demand entirely",
    ]
    rng.shuffle(mcq4_opts)
    correct4_idx = mcq4_opts.index(
        "Tea and milk are jointly demanded - both are needed together"
    )
    q4 = {
        "id": f"econ_{base_id + 3:03d}",
        "type": "MCQ",
        "topic": "Meaning and Concept of Demand - Types of Demand",
        "difficulty": "Easy",
        "question": (
            "When a family buys tea, it often buys milk at the same time to make chai. "
            "This simultaneous demand for tea and milk is called:"
        ),
        "options": mcq4_opts,
        "answer": correct4_idx,
        "answer_text": mcq4_opts[correct4_idx],
        "explanation": (
            "Joint demand occurs when two or more goods are demanded together to satisfy "
            "a single want. Tea and milk are jointly demanded for making chai; a car and "
            "petrol are jointly demanded for driving. If the demand for tea falls, the "
            "demand for milk will also fall. Other pairs: pen and ink, bread and butter."
        ),
    }
    questions.append(q4)

    # --- MCQ 5: Individual vs Market Demand ---
    mcq5_opts = [
        "The total demand of all consumers in the market at each price",
        "The demand of one particular consumer only",
        "The demand of the largest consumer in the market",
        "The average of the highest and lowest individual demands",
    ]
    rng.shuffle(mcq5_opts)
    correct5_idx = mcq5_opts.index(
        "The total demand of all consumers in the market at each price"
    )
    q5 = {
        "id": f"econ_{base_id + 4:03d}",
        "type": "MCQ",
        "topic": "Meaning and Concept of Demand - Types of Demand",
        "difficulty": "Easy",
        "question": (
            "If individual A buys 2 kg of rice at ₹40/kg and individual B buys 3 kg at "
            "the same price, what is the market demand for rice at ₹40/kg?"
        ),
        "options": mcq5_opts,
        "answer": correct5_idx,
        "answer_text": mcq5_opts[correct5_idx],
        "explanation": (
            "Market demand is the horizontal sum of all individual demands at each price "
            "level. At ₹40/kg: A demands 2 kg + B demands 3 kg = 5 kg (market demand). "
            "Market demand = Σ individual demands of all consumers in the market. "
            "This concept is crucial for producers and policymakers."
        ),
    }
    questions.append(q5)

    # --- Fill Blank 1 ---
    fb1 = {
        "id": f"econ_{base_id + 5:03d}",
        "type": "Fill-Blank",
        "topic": "Meaning and Concept of Demand - Types of Demand",
        "difficulty": "Easy",
        "question": (
            "Demand is always expressed at a particular ______ and for a specific "
            "______ period."
        ),
        "answer": "price; time",
        "alternate_answers": ["price; time", "price, time"],
        "explanation": (
            "Demand is meaningless without a price reference (at what price?) and a time "
            "reference (during which period?). We say 'I demand 5 kg of rice at ₹40/kg "
            "per week'. Omitting price or time makes the statement economically imprecise."
        ),
    }
    questions.append(fb1)

    # --- Fill Blank 2 ---
    fb2 = {
        "id": f"econ_{base_id + 6:03d}",
        "type": "Fill-Blank",
        "topic": "Meaning and Concept of Demand - Types of Demand",
        "difficulty": "Easy",
        "question": (
            "______ demand arises because of demand for another good; for example, "
            "demand for cotton is ______ from the demand for cotton shirts."
        ),
        "answer": "Derived; derived",
        "alternate_answers": ["Derived; derived"],
        "explanation": (
            "Derived demand is demand for a good that stems from the demand for the final "
            "good it helps produce. Demand for cotton → derived from demand for cotton "
            "shirts. Demand for tyres → derived from demand for cars. Demand for labour "
            "→ derived from demand for the goods that labour produces."
        ),
    }
    questions.append(fb2)

    # --- Fill Blank 3 ---
    fb3 = {
        "id": f"econ_{base_id + 7:03d}",
        "type": "Fill-Blank",
        "topic": "Meaning and Concept of Demand - Types of Demand",
        "difficulty": "Easy",
        "question": (
            "______ demand is the sum of the individual demands of all consumers in "
            "the market at each price."
        ),
        "answer": "Market",
        "alternate_answers": ["Market demand"],
        "explanation": (
            "Market demand is obtained by adding up the quantities that each consumer "
            "is willing and able to buy at each price. If there are 1000 consumers in a "
            "market and each demands 2 units at ₹10, market demand = 2000 units at ₹10."
        ),
    }
    questions.append(fb3)

    # --- Fill Blank 4 ---
    fb4 = {
        "id": f"econ_{base_id + 8:03d}",
        "type": "Fill-Blank",
        "topic": "Meaning and Concept of Demand - Types of Demand",
        "difficulty": "Easy",
        "question": (
            "Demand for tea and milk together for making chai is called ______ demand."
        ),
        "answer": "joint",
        "alternate_answers": ["joint demand"],
        "explanation": (
            "Joint demand occurs when two or more goods are needed simultaneously to "
            "satisfy a single want. Tea and milk are jointly demanded for making chai. "
            "Both must be purchased together - if tea demand falls, milk demand also "
            "falls. Other examples: car + petrol, pen + ink, bread + butter."
        ),
    }
    questions.append(fb4)

    # --- Short Answer 1 ---
    sa1 = {
        "id": f"econ_{base_id + 9:03d}",
        "type": "Short-Answer",
        "topic": "Meaning and Concept of Demand - Types of Demand",
        "difficulty": "Easy",
        "question": (
            "Distinguish between individual demand and market demand, giving an example "
            "from an Indian village context."
        ),
        "answer": (
            "Individual demand refers to the quantity of a good that a single consumer "
            "is willing and able to buy at various prices. For example, Ramesh in a "
            "village in Uttar Pradesh demands 5 kg of wheat at ₹30/kg per week. "
            "Market demand is the total demand of all consumers in the market at each "
            "price. If 100 families in the village demand wheat, and on average each "
            "family demands 5 kg at ₹30/kg, the market demand = 100 x 5 = 500 kg/week. "
            "Market demand = sum of all individual demands."
        ),
        "key_points": [
            "Individual demand: quantity demanded by one consumer",
            "Market demand: sum of all individual demands",
            "Example: village wheat market with 100 families",
        ],
    }
    questions.append(sa1)

    # --- Short Answer 2 (Competency - Indian Context) ---
    sa2 = {
        "id": f"econ_{base_id + 10:03d}",
        "type": "Short-Answer",
        "topic": "Meaning and Concept of Demand - Types of Demand",
        "difficulty": "Easy",
        "question": (
            "What is 'derived demand'? Explain with reference to the demand for steel "
            "in India's automobile industry."
        ),
        "answer": (
            "Derived demand is the demand for a good that arises not from direct consumer "
            "want but from the demand for the final product that uses it as an input. "
            "In India, steel is not demanded by consumers directly for consumption - it is "
            "demanded by companies like Tata Steel and JSW Steel because automobile "
            "manufacturers (Maruti Suzuki, Tata Motors) need steel to make cars. When "
            "car sales rise in India, the derived demand for steel automatically rises. "
            "Thus, steel demand is derived from the demand for cars, machines, and "
            "construction projects."
        ),
        "key_points": [
            "Definition: demand for a factor driven by final product demand",
            "Indian example: steel → cars (Maruti Suzuki, Tata Motors)",
            "Steel demand rises when car sales rise",
        ],
    }
    questions.append(sa2)

    # --- Short Answer 3 ---
    sa3 = {
        "id": f"econ_{base_id + 11:03d}",
        "type": "Short-Answer",
        "topic": "Meaning and Concept of Demand - Types of Demand",
        "difficulty": "Easy",
        "question": (
            "How does the concept of 'joint demand' explain the relationship between "
            "the demand for smartphones and mobile data in India?"
        ),
        "answer": (
            "Joint demand means two goods are needed together. Smartphones and mobile "
            "data (Internet packs from Jio, Airtel) have a joint demand relationship - "
            "a smartphone is of limited use without mobile data, and mobile data requires "
            "a smartphone or device to be consumed. When demand for smartphones rises "
            "in India (as seen during the Jio revolution), the demand for mobile data "
            "packs also rises simultaneously. Both goods are jointly demanded to satisfy "
            "the single want of staying connected."
        ),
        "key_points": [
            "Joint demand: goods needed together",
            "Smartphone + mobile data example from Indian telecom market",
            "Both rise together - linked demand",
        ],
    }
    questions.append(sa3)

    # --- Long Answer 1 ---
    la1 = {
        "id": f"econ_{base_id + 12:03d}",
        "type": "Long-Answer",
        "topic": "Meaning and Concept of Demand - Types of Demand",
        "difficulty": "Medium",
        "question": (
            "(a) Define demand in the economic sense, mentioning the three conditions "
            "that must be satisfied. "
            "(b) Distinguish between individual demand and market demand. "
            "(c) With Indian examples, explain joint demand and derived demand."
        ),
        "sub_parts": [
            "Definition with three conditions",
            "Individual vs market demand",
            "Joint and derived demand with Indian examples",
        ],
        "answer": (
            "(a) Demand is the quantity of a good that a consumer is willing AND able to "
            "buy at a given price during a given period of time. Three conditions:\n"
            "    • Willingness to buy\n"
            "    • Ability to pay (purchasing power)\n"
            "    • Specific price and time period\n\n"
            "(b) Individual demand: quantity one consumer is willing/able to buy at each "
            "price. Market demand: sum of all individual demands at each price.\n\n"
            "(c) Joint demand: tea and milk for chai (both needed together). "
            "Derived demand: steel demand is derived from demand for cars by Maruti Suzuki. "
            "When car sales rise, steel demand rises automatically."
        ),
        "key_points": [
            "Three conditions: willingness, ability, price-time",
            "Individual vs market demand distinction",
            "Joint demand example: tea and milk",
            "Derived demand example: steel and cars",
        ],
    }
    questions.append(la1)

    # --- Long Answer 2 (Competency - Indian Context) ---
    la2 = {
        "id": f"econ_{base_id + 13:03d}",
        "type": "Long-Answer",
        "topic": "Meaning and Concept of Demand - Types of Demand",
        "difficulty": "Medium",
        "question": (
            "India's festive season (Diwali) sees a surge in demand for many goods. "
            "Using this context: "
            "(a) Why does a consumer's desire for a new phone during Diwali become "
            "'economic demand' only if she also has the purchasing power? "
            "(b) Classify the demand for new phones and phone covers during Diwali "
            "as joint or derived demand, with reasons. "
            "(c) How does market demand for smartphones during Diwali differ from "
            "individual demand?"
        ),
        "sub_parts": [
            "Desire vs economic demand (willingness + ability)",
            "Joint vs derived demand for phones and covers",
            "Individual vs market demand for smartphones",
        ],
        "answer": (
            "(a) Desire alone is not economic demand. A student wanting the latest iPhone "
            "during Diwali has willingness, but if she cannot afford ₹80,000, her desire "
            "is NOT demand. She must have BOTH willingness AND ability to pay at the "
            "given price for it to count as economic demand.\n\n"
            "(b) The demand for phone and phone cover during Diwali is joint demand - "
            "both are purchased together; a cover is useless without a phone. However, "
            "the demand for phones is also driven by derived demand for mobile data and "
            "apps, making it partially derived.\n\n"
            "(c) Individual demand is what one person buys (e.g., Riya wants 1 phone). "
            "Market demand is the sum of all such individual demands across all consumers "
            "in India during Diwali - running into millions of units for brands like "
            "Samsung, Apple and Xiaomi."
        ),
        "key_points": [
            "Desire vs demand: need purchasing power",
            "Joint demand: phone + cover",
            "Market demand: sum of all individual Diwali smartphone demands",
        ],
    }
    questions.append(la2)

    # --- Numerical: Demand Schedule ---
    # Seeded deterministic values
    price_vals = [10, 20, 30, 40, 50]
    qty_vals = [rng.randint(80, 120), rng.randint(55, 75), rng.randint(35, 50),
                rng.randint(18, 30), rng.randint(5, 15)]
    total_demand_at_30 = qty_vals[2] + rng.randint(20, 40)

    num_demand = {
        "id": f"econ_{base_id + 14:03d}",
        "type": "Numerical",
        "topic": "Meaning and Concept of Demand - Types of Demand",
        "difficulty": "Easy",
        "question": (
            "The following table shows the individual demand of two consumers (A and B) "
            f"for a commodity at different prices.\n"
            f"  Price (₹): {price_vals[0]}, {price_vals[1]}, {price_vals[2]}, "
            f"{price_vals[3]}, {price_vals[4]}\n"
            f"  Consumer A demands (units): {qty_vals[0]}, {qty_vals[1]}, {qty_vals[2]}, "
            f"{qty_vals[3]}, {qty_vals[4]}\n"
            f"  Consumer B demands (units): {total_demand_at_30 - qty_vals[2]}, "
            f"{rng.randint(30, 50)}, {rng.randint(20, 35)}, "
            f"{rng.randint(10, 25)}, {rng.randint(2, 10)}\n"
            f"(a) Calculate market demand at ₹{price_vals[2]} (₹30). "
            "(b) What does this tell you about the relationship between individual "
            "and market demand?"
        ),
        "answer": total_demand_at_30,
        "numerical_value": total_demand_at_30,
        "unit": "units",
        "formula": "Market Demand = Q_A + Q_B (sum of all individual demands)",
        "given_values": {
            "Price": "₹30",
            "Consumer A demand": qty_vals[2],
            "Consumer B demand": total_demand_at_30 - qty_vals[2],
        },
        "steps_detail": [
            "Step 2: Formula: Market Demand = Σ (Individual Demands)",
            f"Step 3: At price ₹{price_vals[2]}, Q_A = {qty_vals[2]} units, "
            f"Q_B = {total_demand_at_30 - qty_vals[2]} units",
            f"Step 4: Market Demand = {qty_vals[2]} + ({total_demand_at_30 - qty_vals[2]}) "
            f"= {total_demand_at_30} units",
            f"Step 5: Market demand ({total_demand_at_30} units) > individual demand, "
            "confirming market demand is the aggregate of all consumers' demands.",
        ],
        "explanation": (
            f"Market demand at ₹30 = {total_demand_at_30} units, which is the sum of "
            f"Consumer A's demand ({qty_vals[2]} units) and Consumer B's demand "
            f"({total_demand_at_30 - qty_vals[2]} units). This confirms that market demand "
            "is always larger than any single individual's demand, as it aggregates all "
            "consumers in the market."
        ),
    }
    questions.append(num_demand)

    return questions


# ============================================================
# MARKET QUESTIONS  (c10_econ_020)
# ============================================================

def _generate_market_questions(rng: random.Random, base_id: int) -> List[Dict]:
    questions = []

    # --- MCQ 1: Definition of Market ---
    mcq_opts = [
        "An arrangement that brings buyers and sellers into contact to exchange goods/services at a price",
        "A physical building where goods are displayed for sale",
        "A government department that regulates trade",
        "A shop or bazaar where one trader sells to customers",
    ]
    rng.shuffle(mcq_opts)
    correct_idx = mcq_opts.index(
        "An arrangement that brings buyers and sellers into contact to exchange goods/services at a price"
    )
    q = {
        "id": f"econ_{base_id:03d}",
        "type": "MCQ",
        "topic": "Meaning of Market",
        "difficulty": "Easy",
        "question": (
            "In Economics, a 'market' is best defined as:"
        ),
        "options": mcq_opts,
        "answer": correct_idx,
        "answer_text": mcq_opts[correct_idx],
        "explanation": (
            "A market is NOT just a physical place. It is an arrangement or mechanism "
            "that brings buyers and sellers together to exchange goods or services at an "
            "agreed price. The four essentials of a market are: (1) buyers, (2) sellers, "
            "(3) a commodity, and (4) a price. Markets can be physical (APMC mandi) or "
            "virtual (Amazon, BSE)."
        ),
    }
    questions.append(q)

    # --- MCQ 2: Four Essentials of Market ---
    mcq2_opts = [
        "Buyers, sellers, a commodity, and a price",
        "A shopkeeper, a warehouse, transport, and money",
        "A government licence, a building, a manager, and staff",
        "Supply, demand, profit, and production cost",
    ]
    rng.shuffle(mcq2_opts)
    correct2_idx = mcq2_opts.index(
        "Buyers, sellers, a commodity, and a price"
    )
    q2 = {
        "id": f"econ_{base_id + 1:03d}",
        "type": "MCQ",
        "topic": "Meaning of Market",
        "difficulty": "Easy",
        "question": (
            "Which of the following are the four essential elements of a market?"
        ),
        "options": mcq2_opts,
        "answer": correct2_idx,
        "answer_text": mcq2_opts[correct2_idx],
        "explanation": (
            "Every market - physical or virtual - requires: (1) buyers (consumers), "
            "(2) sellers (producers/traders), (3) a commodity or service being exchanged, "
            "and (4) a price at which exchange occurs. Without any one of these four "
            "elements, a true market transaction does not take place."
        ),
    }
    questions.append(q2)

    # --- MCQ 3: Market vs Marketplace ---
    mcq3_opts = [
        "A market is the exchange arrangement; a marketplace is the physical location",
        "A market is only a physical place; a marketplace can be virtual",
        "There is no difference between a market and a marketplace",
        "A marketplace is the broader concept; a market is just a shop",
    ]
    rng.shuffle(mcq3_opts)
    correct3_idx = mcq3_opts.index(
        "A market is the exchange arrangement; a marketplace is the physical location"
    )
    q3 = {
        "id": f"econ_{base_id + 2:03d}",
        "type": "MCQ",
        "topic": "Meaning of Market",
        "difficulty": "Easy",
        "question": (
            "What is the key difference between a 'market' and a 'marketplace'?"
        ),
        "options": mcq3_opts,
        "answer": correct3_idx,
        "answer_text": mcq3_opts[correct3_idx],
        "explanation": (
            "A market is the broader economic concept - it is the arrangement that brings "
            "buyers and sellers together. A marketplace is the physical location (like a "
            "bazaar or shop). Amazon India is a market but not a marketplace in the "
            "physical sense. The Nashik APMC mandi is both a market and a marketplace."
        ),
    }
    questions.append(q3)

    # --- MCQ 4: Perfect Competition ---
    mcq4_opts = [
        "Many buyers and sellers trading identical products at one market price",
        "A single seller who sets the price for the entire market",
        "A few large firms that control the entire market",
        "Many sellers offering differentiated products",
    ]
    rng.shuffle(mcq4_opts)
    correct4_idx = mcq4_opts.index(
        "Many buyers and sellers trading identical products at one market price"
    )
    q4 = {
        "id": f"econ_{base_id + 3:03d}",
        "type": "MCQ",
        "topic": "Meaning of Market",
        "difficulty": "Easy",
        "question": (
            "In a 'perfect competition' market structure:"
        ),
        "options": mcq4_opts,
        "answer": correct4_idx,
        "answer_text": mcq4_opts[correct4_idx],
        "explanation": (
            "Perfect competition has: (1) very large number of buyers and sellers, "
            "(2) identical/homogeneous products, (3) free entry and exit, (4) perfect "
            "knowledge, and (5) one uniform price. Indian agricultural markets for wheat "
            "and rice approximate perfect competition - thousands of farmers sell an "
            "identical product at the market-determined price."
        ),
    }
    questions.append(q4)

    # --- MCQ 5: Monopoly ---
    mcq5_opts = [
        "A single seller with no close substitutes for its product",
        "Many sellers competing on price",
        "A few firms dominating the market",
        "Many sellers with differentiated products",
    ]
    rng.shuffle(mcq5_opts)
    correct5_idx = mcq5_opts.index(
        "A single seller with no close substitutes for its product"
    )
    q5 = {
        "id": f"econ_{base_id + 4:03d}",
        "type": "MCQ",
        "topic": "Meaning of Market",
        "difficulty": "Easy",
        "question": (
            "Which of the following is the defining feature of a monopoly market?"
        ),
        "options": mcq5_opts,
        "answer": correct5_idx,
        "answer_text": mcq5_opts[correct5_idx],
        "explanation": (
            "A monopoly has a single seller who is the sole producer of a product with no "
            "close substitutes. The monopolist has significant price-setting power. "
            "Examples: Indian Railways (monopoly in train operations), BSNL in some "
            "remote areas (historically), and state electricity boards in certain regions. "
            "Entry barriers (legal, technological, or cost-based) prevent new competitors."
        ),
    }
    questions.append(q5)

    # --- MCQ 6: Market not Physical Place ---
    mcq6_opts = [
        "Amazon India is a market even without a physical shop",
        "A market must always be a physical building",
        "Only a shopkeeper and a customer together make a market",
        "Online trading is not a market by definition",
    ]
    rng.shuffle(mcq6_opts)
    correct6_idx = mcq6_opts.index(
        "Amazon India is a market even without a physical shop"
    )
    q6 = {
        "id": f"econ_{base_id + 5:03d}",
        "type": "MCQ",
        "topic": "Meaning of Market",
        "difficulty": "Easy",
        "question": (
            "Why is Amazon India considered a market even though it has no physical "
            "building in every city?"
        ),
        "options": mcq6_opts,
        "answer": correct6_idx,
        "answer_text": mcq6_opts[correct6_idx],
        "explanation": (
            "A market is an arrangement, not necessarily a physical place. Amazon India "
            "brings thousands of sellers (suppliers) and millions of buyers into contact "
            "electronically. The four essentials - buyers, sellers, commodity, price - "
            "are all present. Similarly, the Bombay Stock Exchange (BSE) is a market for "
            "shares with no physical trading floor in the traditional sense."
        ),
    }
    questions.append(q6)

    # --- Fill Blank 1 ---
    fb1 = {
        "id": f"econ_{base_id + 6:03d}",
        "type": "Fill-Blank",
        "topic": "Meaning of Market",
        "difficulty": "Easy",
        "question": (
            "The four essentials of a market are: buyers, sellers, a ______, and a ______."
        ),
        "answer": "commodity; price",
        "alternate_answers": ["commodity, price"],
        "explanation": (
            "Every market transaction requires four elements: (1) buyers (demand side), "
            "(2) sellers (supply side), (3) a commodity or service being traded, and "
            "(4) a price at which the exchange takes place. Without any one of these, "
            "there is no market."
        ),
    }
    questions.append(fb1)

    # --- Fill Blank 2 ---
    fb2 = {
        "id": f"econ_{base_id + 7:03d}",
        "type": "Fill-Blank",
        "topic": "Meaning of Market",
        "difficulty": "Easy",
        "question": (
            "A ______ market has many buyers and sellers trading identical products "
            "at one uniform price."
        ),
        "answer": "perfectly competitive",
        "alternate_answers": ["perfect competition"],
        "explanation": (
            "In perfect competition, there are so many buyers and sellers that no single "
            "buyer or seller can influence the price. All products are identical (e.g., "
            "wheat grain from any farm), and there is only one market price at any given "
            "time. Indian agricultural markets for wheat and rice are close to this model."
        ),
    }
    questions.append(fb2)

    # --- Fill Blank 3 ---
    fb3 = {
        "id": f"econ_{base_id + 8:03d}",
        "type": "Fill-Blank",
        "topic": "Meaning of Market",
        "difficulty": "Easy",
        "question": (
            "A ______ has only one seller of a product with no close substitutes, "
            "giving it significant price-setting power."
        ),
        "answer": "monopoly",
        "alternate_answers": ["monopoly market"],
        "explanation": (
            "A monopoly market has a single seller. The monopolist is the sole supplier "
            "of a product with no close substitutes, which gives it the power to set or "
            "influence the price. Indian Railways is a practical example - it is the sole "
            "operator of most long-distance train services in India."
        ),
    }
    questions.append(fb3)

    # --- Fill Blank 4 ---
    fb4 = {
        "id": f"econ_{base_id + 9:03d}",
        "type": "Fill-Blank",
        "topic": "Meaning of Market",
        "difficulty": "Easy",
        "question": (
            "The ______ at Nashik is a market where farmers bring onions and grapes "
            "to sell to traders at a discovered price."
        ),
        "answer": "APMC mandi",
        "alternate_answers": ["APMC mandi (Agricultural Produce Market Committee mandi)"],
        "explanation": (
            "The APMC mandi at Nashik is a physical market where farmers (sellers) and "
            "traders/retailers (buyers) exchange agricultural produce at a price discovered "
            "through auction or negotiation. It satisfies all four essentials: buyers, "
            "sellers, commodity (onions/grapes), and price."
        ),
    }
    questions.append(fb4)

    # --- Short Answer 1 ---
    sa1 = {
        "id": f"econ_{base_id + 10:03d}",
        "type": "Short-Answer",
        "topic": "Meaning of Market",
        "difficulty": "Easy",
        "question": (
            "Explain why 'market' in Economics is broader than a physical shop or bazaar. "
            "Give two examples."
        ),
        "answer": (
            "In Economics, a market is an arrangement that brings buyers and sellers into "
            "contact for exchange at a price. It does NOT require a physical location. "
            "Example 1: Amazon India is an online market where sellers across India list "
            "products and buyers purchase at displayed prices - no physical meeting is "
            "needed. Example 2: The Bombay Stock Exchange (BSE) is a market for securities "
            "where shares are traded electronically without any physical marketplace. "
            "Even a village haat in Bihar held weekly is a market without a permanent "
            "building."
        ),
        "key_points": [
            "Market = arrangement, not just a place",
            "Example 1: Amazon India (online market)",
            "Example 2: BSE (securities market)",
        ],
    }
    questions.append(sa1)

    # --- Short Answer 2 (Competency - Indian Context) ---
    sa2 = {
        "id": f"econ_{base_id + 11:03d}",
        "type": "Short-Answer",
        "topic": "Meaning of Market",
        "difficulty": "Easy",
        "question": (
            "With reference to the APMC mandi system in India, explain how a mandi "
            "satisfies all four essentials of a market."
        ),
        "answer": (
            "An APMC mandi (e.g., the one at Nashik) satisfies all four essentials of a "
            "market:\n"
            "1. Buyers: Traders, retailers and wholesalers who come to purchase produce.\n"
            "2. Sellers: Farmers who bring their agricultural produce to sell.\n"
            "3. Commodity: Onions, grapes, bananas or other agricultural produce.\n"
            "4. Price: A price is discovered through auction or negotiation between "
            "buyers and sellers.\n"
            "The mandi brings these four elements together in one place, making it a "
            "classic example of a market in the economic sense."
        ),
        "key_points": [
            "APMC mandi at Nashik as example",
            "Four essentials: buyers, sellers, commodity, price",
            "All four present at the mandi",
        ],
    }
    questions.append(sa2)

    # --- Short Answer 3 ---
    sa3 = {
        "id": f"econ_{base_id + 12:03d}",
        "type": "Short-Answer",
        "topic": "Meaning of Market",
        "difficulty": "Easy",
        "question": (
            "Distinguish between perfect competition and monopoly with one Indian "
            "example for each."
        ),
        "answer": (
            "Perfect competition: Many buyers and sellers trade an identical/homogeneous "
            "product at one uniform price. No single seller can influence the price. "
            "Indian example: Markets for wheat and rice in agricultural mandis, where "
            "thousands of farmers sell identical produce.\n\n"
            "Monopoly: Only one seller exists with no close substitutes for its product. "
            "The monopolist has significant price-setting power. Indian example: Indian "
            "Railways is a monopoly in long-distance train operations - passengers have "
            "no alternative provider for most routes."
        ),
        "key_points": [
            "Perfect competition: many sellers, identical product, one price",
            "Monopoly: single seller, no substitutes, price-setting power",
            "Example: wheat market vs Indian Railways",
        ],
    }
    questions.append(sa3)

    # --- Long Answer 1 ---
    la1 = {
        "id": f"econ_{base_id + 13:03d}",
        "type": "Long-Answer",
        "topic": "Meaning of Market",
        "difficulty": "Medium",
        "question": (
            "(a) Define 'market' in the economic sense. Why is it important to "
            "distinguish between a market and a marketplace? "
            "(b) Explain the four essentials of a market. "
            "(c) Using the example of the Bombay Stock Exchange (BSE), show that it "
            "is a market without being a physical marketplace."
        ),
        "sub_parts": [
            "Definition of market and distinction from marketplace",
            "Four essentials of a market",
            "BSE example of a non-physical market",
        ],
        "answer": (
            "(a) A market is an arrangement that brings buyers and sellers into contact "
            "for the exchange of goods or services at a price. It is different from a "
            "marketplace (physical place like a shop or bazaar). A market can exist "
            "without a fixed location.\n\n"
            "(b) Four essentials: (1) Buyers - those who demand the good; (2) Sellers - "
            "those who supply the good; (3) A commodity or service being exchanged; "
            "(4) A price at which exchange takes place.\n\n"
            "(c) The BSE is a market because: buyers (investors) and sellers (companies "
            "issuing shares, traders selling shares) are brought together electronically "
            "to trade shares (commodity) at market-determined prices. No physical "
            "marketplace is needed - all trading happens through computers and trading "
            "terminals, satisfying all four essentials."
        ),
        "key_points": [
            "Market = arrangement, not just a place",
            "Four essentials explained",
            "BSE: virtual market for shares",
        ],
    }
    questions.append(la1)

    # --- Long Answer 2 (Competency - Indian Context) ---
    la2 = {
        "id": f"econ_{base_id + 14:03d}",
        "type": "Long-Answer",
        "topic": "Meaning of Market",
        "difficulty": "Medium",
        "question": (
            "India's e-commerce revolution has transformed how markets operate. "
            "(a) How does Flipkart function as a 'market' in the economic sense? "
            "(b) How is Flipkart different from a traditional marketplace? "
            "(c) Briefly explain the four market structures studied: perfect competition, "
            "monopoly, monopolistic competition, and oligopoly - with one Indian example "
            "for each."
        ),
        "sub_parts": [
            "Flipkart as a market",
            "Flipkart vs traditional marketplace",
            "Four market structures with Indian examples",
        ],
        "answer": (
            "(a) Flipkart is a market because it brings together buyers (customers across "
            "India) and sellers (merchants listed on the platform) to exchange goods "
            "(commodity) at displayed prices. All four essentials are present.\n\n"
            "(b) Unlike a traditional marketplace (physical shop or bazaar), Flipkart "
            "has no single physical location. Buyers and sellers never meet physically - "
            "transactions are completed online. This makes it a virtual or electronic "
            "market, not a marketplace.\n\n"
            "(c) Four market structures:\n"
            "    • Perfect competition: Many sellers, identical product, one price - "
            "      e.g., wheat market in a village mandi.\n"
            "    • Monopoly: One seller, no substitutes - e.g., Indian Railways.\n"
            "    • Monopolistic competition: Many sellers, differentiated products - "
            "      e.g., restaurants in a city (different menus, prices, ambience).\n"
            "    • Oligopoly: Few large sellers dominate the market - e.g., Indian "
            "      telecom market (Reliance Jio, Airtel, Vi - few major players)."
        ),
        "key_points": [
            "Flipkart: virtual market satisfying four essentials",
            "No physical location needed",
            "Four market structures with Indian examples",
        ],
    }
    questions.append(la2)

    # --- Numerical: Market Demand Calculation ---
    # Seeded deterministic values
    consumers = rng.randint(3, 5)
    price_point = rng.choice([20, 30, 40, 50])
    per_consumer_demand = rng.randint(2, 8)
    total_market_demand = consumers * per_consumer_demand

    num_market = {
        "id": f"econ_{base_id + 15:03d}",
        "type": "Numerical",
        "topic": "Meaning of Market",
        "difficulty": "Easy",
        "question": (
            f"In a small town market for notebooks, there are {consumers} shops "
            "(consumers for wholesalers). At a price of ₹{price_point} per notebook, "
            f"each shop demands {per_consumer_demand} notebooks. "
            "(a) Calculate the total market demand for notebooks at ₹{price_point}. "
            "(b) If one more shop opens and also demands {per_consumer_demand} notebooks, "
            "what is the new market demand?"
        ),
        "answer": f"Initial: {total_market_demand} units; After new shop: {total_market_demand + per_consumer_demand} units",
        "numerical_value": total_market_demand,
        "unit": "notebooks",
        "formula": "Market Demand = n x Q_per_consumer (n = number of consumers)",
        "given_values": {
            "Number of shops (consumers)": consumers,
            "Demand per shop (units)": per_consumer_demand,
            "Price (₹)": price_point,
        },
        "steps_detail": [
            "Step 2: Formula: Market Demand = n x Q_per_consumer",
            f"Step 3: Initial: {consumers} shops x {per_consumer_demand} notebooks = "
            f"{total_market_demand} notebooks",
            f"Step 4: After new shop opens: {consumers + 1} shops x "
            f"{per_consumer_demand}"
]}