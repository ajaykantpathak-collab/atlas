"""
class1_bio_questions.py
Question generator for Class 1 Biology — 4 Nodes.
Produces question banks (MCQ, Fill-Blank, True/False, Matching)
and a per-session paper of N questions.
All randomisation is seeded for reproducibility.
"""

import random
import json
import hashlib
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Optional

# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

@dataclass
class Question:
    node_id:    str
    qtype:      str          # MCQ | FB | TF | MTCH
    stem:       str
    options:    List[str] = field(default_factory=list)
    correct_idx: int = 0     # for MCQ / TF (0/1)
    answer:     str = ""     # for FB / MTCH
    difficulty: str = "Easy"
    weightage:  str = "Low"
    exam:       str = "Board_Only"
    explanation:str = ""

    def to_dict(self):
        d = asdict(self)
        return d


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

def _rng(seed: int) -> random.Random:
    r = random.Random(seed)
    return r


# ──────────────────────────────────────────────
#              explanation)
# ──────────────────────────────────────────────

_BANKS = {
    # ── NODE 001: Personal details ──────────────────────────────
    "c1_bio_001": {
        "MCQ": [
            ("What is your full name called?",
             ["Full name", "Nickname", "Surname only", "Pet name"], 0,
             "Full name means first name + surname."),
            ("Which of these is a personal detail?",
             ["Colour of sky", "Your birthday", "Name of a tree",
              "Shape of a leaf"], 1,
             "Birthday is a personal detail about you."),
            ("Who gives you your family name (surname)?",
             ["Your teacher", "Your family", "Your friend",
              "Your neighbour"], 1,
             "Your surname comes from your family."),
            ("What should you remember when someone asks 'Who are you?'?",
             ["Your favourite colour", "Your name and details",
              "Your teacher's name", "The weather today"], 1,
             "Your name and personal details tell people who you are."),
            ("Which of these is NOT a personal detail?",
             ["Your address", "Your phone number",
              "Your pet's name", "Your birthday"], 2,
             "Pet's name is not your personal detail."),
        ],
        "FB": [
            ("My _______ tells people who I am.", "name",
             "Your name is your personal identity."),
            ("My birthday is on _______.", "[date]",
             "Birthday is a personal detail."),
            ("My _______ name comes from my family.", "surname",
             "Surname is shared by family members."),
            ("I live at this _______.", "address",
             "Address tells where your home is."),
            ("You can call me on my _______ number.", "phone",
             "Phone number helps people contact you."),
        ],
        "TF": [
            ("Your name is a personal detail.", True,
             "Yes, your name identifies you."),
            ("Your friend's name is also your personal detail.", False,
             "No, only YOUR details are personal."),
            ("Knowing your address helps people find your home.", True,
             "Address tells where you live."),
            ("A surname is given by your school.", False,
             "Surname comes from your family."),
            ("Your birthday is in your personal details.", True,
             "Birthday is an important personal detail."),
        ],
    },

    # ── NODE 002: External body parts ───────────────────────────
    "c1_bio_002": {
        "MCQ": [
            ("Which part of your body is on top of your neck?",
             ["Knee", "Head", "Hand", "Foot"], 1,
             "The head sits on top of the neck."),
            ("How many fingers do you have on one hand?",
             ["Three", "Four", "Five", "Six"], 2,
             "Each hand has five fingers including the thumb."),
            ("Which body part helps you walk?",
             ["Eyes", "Ears", "Legs", "Nose"], 2,
             "Legs are used for walking."),
            ("Where are your cheeks?",
             ["On your hand", "On your face", "On your foot",
              "On your arm"], 1,
             "Cheeks are on your face."),
            ("Which part bends like a hinge?",
             ["Wrist", "Elbow", "Finger", "Toe"], 1,
             "Elbow bends like a door hinge."),
            ("How many legs do you have?",
             ["One", "Two", "Three", "Four"], 1,
             "Humans have two legs."),
        ],
        "FB": [
            ("I hold things with my _______.", "hands",
             "Hands have fingers to grab objects."),
            ("My _______ helps me see.", "eyes",
             "Eyes are on the face."),
            ("I bend my _______ to pick things up from the floor.",
             "knees",
             "Knees are the joint in the middle of your leg."),
            ("I walk on my _______.", "feet",
             "Feet are at the bottom of your legs."),
            ("My _______ connects my head to my body.", "neck",
             "Neck is the thin part between head and body."),
        ],
        "TF": [
            ("Your head is part of your body.", True,
             "Head is the top part of the body."),
            ("You have three feet.", False,
             "Humans have two feet."),
            ("Your elbow bends and straightens.", True,
             "Elbow is a hinge-like joint."),
            ("Your fingers are on your foot.", False,
             "Fingers are on your hand; toes are on your foot."),
            ("Your shoulders are on your arm.", False,
             "Shoulders connect arms to the body."),
        ],
    },

    # ── NODE 003: Sense organs and functions ────────────────────
    "c1_bio_003": {
        "MCQ": [
            ("Which organ do you use to see?",
             ["Ears", "Eyes", "Nose", "Tongue"], 1,
             "Eyes are used for seeing."),
            ("Which organ do you use to hear music?",
             ["Eyes", "Nose", "Ears", "Tongue"], 2,
             "Ears are used for hearing."),
            ("Which organ helps you smell flowers?",
             ["Eose", "Nose", "Eyes", "Ears"], 1,
             "The nose is used for smelling."),
            ("Which organ helps you taste ice-cream?",
             ["Nose", "Tongue", "Eyes", "Ears"], 1,
             "Tongue is used for tasting."),
            ("Which organ tells you if cloth is soft?",
             ["Eyes", "Ears", "Nose", "Skin"], 3,
             "Skin senses touch."),
            ("We have how many sense organs?",
             ["Three", "Four", "Five", "Six"], 2,
             "Eyes, ears, nose, tongue, skin = 5 sense organs."),
        ],
        "FB": [
            ("I _______ with my eyes.", "see",
             "Eyes give us the sense of sight."),
            ("I _______ with my ears.", "hear",
             "Ears give us the sense of hearing."),
            ("I _______ with my nose.", "smell",
             "Nose gives us the sense of smell."),
            ("I _______ with my tongue.", "taste",
             "Tongue gives us the sense of taste."),
            ("I _______ soft fur with my skin.", "feel",
             "Skin gives us the sense of touch."),
        ],
        "TF": [
            ("Eyes help us see.", True,
             "Sight is the function of eyes."),
            ("Ears help us smell.", False,
             "Nose helps us smell, not ears."),
            ("Tongue helps us taste food.", True,
             "Taste is the function of tongue."),
            ("Skin helps us feel things.", True,
             "Touch is the function of skin."),
            ("We use our nose to hear.", False,
             "Ears are for hearing."),
        ],
        "MTCH": [
            ("Match the organ to its function:",
             ["Eyes", "Ears", "Nose", "Tongue", "Skin"],
             ["See", "Hear", "Smell", "Taste", "Feel"]),
        ],
    },

    # ── NODE 004: Food eaten daily in the family ────────────────
    "c1_bio_004": {
        "MCQ": [
            ("Which of these is a common breakfast food in India?",
             ["Rice", "Roti/Paratha", "Ice-cream", "Chips"], 1,
             "Roti or paratha is commonly eaten for breakfast."),
            ("Which of these is a fruit?",
             ["Potato", "Tomato", "Mango", "Onion"], 2,
             "Mango is a fruit; the others are vegetables."),
            ("What do we drink to stay hydrated?",
             ["Milk", "Water", "Rice", "Bread"], 1,
             "Water keeps us hydrated."),
            ("Which food gives us energy to play?",
             ["Rice/Roti", "Pen", "Book", "Chair"], 0,
             "Rice and roti give us energy."),
            ("Which of these is a vegetable?",
             ["Apple", "Banana", "Carrot", "Mango"], 2,
             "Carrot is a vegetable."),
        ],
        "FB": [
            ("I eat _______ in the morning for breakfast.",
             "roti / paratha / milk",
             "Breakfast is the first meal of the day."),
            ("_______ is a juicy fruit.", "mango",
             "Mango is called the king of fruits."),
            ("We get _______ from vegetables like carrot and spinach.",
             "vitamins",
             "Vegetables give us vitamins and minerals."),
            ("We drink _______ to stay hydrated.", "water",
             "Water is essential for the body."),
            ("My favourite food is _______.", "[student's choice]",
             "Every child may have a different favourite food."),
        ],
        "TF": [
            ("Breakfast is eaten in the morning.", True,
             "Breakfast is the first meal of the day."),
            ("Mango is a vegetable.", False,
             "Mango is a fruit."),
            ("Water helps keep our body hydrated.", True,
             "Drinking water is essential."),
            ("We should eat food every day.", True,
             "Food gives us energy every day."),
            ("Carrot is a fruit.", False,
             "Carrot is a vegetable."),
        ],
    },
}


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

def _pick(rng: random.Random, seq, k: int):
    """Deterministically pick k unique items from seq."""
    return rng.sample(seq, min(k, len(seq)))


def gen_node_001(seed: int, num_mcq=2, num_fb=2, num_tf=1) -> List[Question]:
    rng = _rng(seed)
    qs = []
    bank = _BANKS["c1_bio_001"]

    for stem, opts, ci, exp in _pick(rng, bank["MCQ"], num_mcq):
        qs.append(Question("c1_bio_001", "MCQ", stem, opts, ci,
                           difficulty="Easy", weightage="Low",
                           exam="Board_Only", explanation=exp))

    for stem, ans, exp in _pick(rng, bank["FB"], num_fb):
        qs.append(Question("c1_bio_001", "FB", stem, answer=ans,
                           difficulty="Easy", weightage="Low",
                           exam="Board_Only", explanation=exp))

    for stem, ans, exp in _pick(rng, bank["TF"], num_tf):
        qs.append(Question("c1_bio_001", "TF", stem,
                           correct_idx=0 if ans else 1,
                           options=["True", "False"],
                           difficulty="Easy", weightage="Low",
                           exam="Board_Only", explanation=exp))

    return qs


def gen_node_002(seed: int, num_mcq=2, num_fb=2, num_tf=1) -> List[Question]:
    rng = _rng(seed)
    qs = []
    bank = _BANKS["c1_bio_002"]

    for stem, opts, ci, exp in _pick(rng, bank["MCQ"], num_mcq):
        qs.append(Question("c1_bio_002", "MCQ", stem, opts, ci,
                           difficulty="Easy", weightage="Low",
                           exam="Board_Only", explanation=exp))

    for stem, ans, exp in _pick(rng, bank["FB"], num_fb):
        qs.append(Question("c1_bio_002", "FB", stem, answer=ans,
                           difficulty="Easy", weightage="Low",
                           exam="Board_Only", explanation=exp))

    for stem, ans, exp in _pick(rng, bank["TF"], num_tf):
        qs.append(Question("c1_bio_002", "TF", stem,
                           correct_idx=0 if ans else 1,
                           options=["True", "False"],
                           difficulty="Easy", weightage="Low",
                           exam="Board_Only", explanation=exp))

    return qs


def gen_node_003(seed: int, num_mcq=2, num_fb=2, num_tf=1,
                 num_mtch=0) -> List[Question]:
    rng = _rng(seed)
    qs = []
    bank = _BANKS["c1_bio_003"]

    for stem, opts, ci, exp in _pick(rng, bank["MCQ"], num_mcq):
        qs.append(Question("c1_bio_003", "MCQ", stem, opts, ci,
                           difficulty="Easy", weightage="Low",
                           exam="Board_Only", explanation=exp))

    for stem, ans, exp in _pick(rng, bank["FB"], num_fb):
        qs.append(Question("c1_bio_003", "FB", stem, answer=ans,
                           difficulty="Easy", weightage="Low",
                           exam="Board_Only", explanation=exp))

    for stem, ans, exp in _pick(rng, bank["TF"], num_tf):
        qs.append(Question("c1_bio_003", "TF", stem,
                           correct_idx=0 if ans else 1,
                           options=["True", "False"],
                           difficulty="Easy", weightage="Low",
                           exam="Board_Only", explanation=exp))

    for stem, left, right in bank.get("MTCH", [])[:num_mtch]:
        qs.append(Question("c1_bio_003", "MTCH", stem,
                           options=left + ["||"] + right,
                           answer=", ".join(f"{l}–{r}"
                                           for l, r in zip(left, right)),
                           difficulty="Easy", weightage="Low",
                           exam="Board_Only",
                           explanation="Match each organ with its function."))

    return qs


def gen_node_004(seed: int, num_mcq=2, num_fb=2, num_tf=1) -> List[Question]:
    rng = _rng(seed)
    qs = []
    bank = _BANKS["c1_bio_004"]

    for stem, opts, ci, exp in _pick(rng, bank["MCQ"], num_mcq):
        qs.append(Question("c1_bio_004", "MCQ", stem, opts, ci,
                           difficulty="Easy", weightage="Low",
                           exam="Board_Only", explanation=exp))

    for stem, ans, exp in _pick(rng, bank["FB"], num_fb):
        qs.append(Question("c1_bio_004", "FB", stem, answer=ans,
                           difficulty="Easy", weightage="Low",
                           exam="Board_Only", explanation=exp))

    for stem, ans, exp in _pick(rng, bank["TF"], num_tf):
        qs.append(Question("c1_bio_004", "TF", stem,
                           correct_idx=0 if ans else 1,
                           options=["True", "False"],
                           difficulty="Easy", weightage="Low",
                           exam="Board_Only", explanation=exp))

    return qs


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

NODE_GENERATORS = {
    "c1_bio_001": gen_node_001,
    "c1_bio_002": gen_node_002,
    "c1_bio_003": gen_node_003,
    "c1_bio_004": gen_node_004,
}

NODE_MASTERY = {
    "c1_bio_001": "Child can state their own name, a parent's name, and birthday.",
    "c1_bio_002": "Child can name ≥5 external body parts including face & hand parts.",
    "c1_bio_003": "Child can name all 5 sense organs and match each to its function.",
    "c1_bio_004": "Child can name at least 3 foods eaten daily and give a favourite food.",
}


def generate_questions(node_ids: List[str],
                       seed: int = 42,
                       per_node: Optional[Dict[str, int]] = None) -> List[Question]:
    """
    Generate questions for the given node_ids.
    per_node maps node_id → total questions (split 2 MCQ, 2 FB, 1 TF by default).
    Returns a list of Question objects.
    """
    rng = _rng(seed)
    all_qs: List[Question] = []

    for nid in node_ids:
        if nid not in NODE_GENERATORS:
            print(f"[WARN] Unknown node: {nid}")
            continue
        n = per_node.get(nid, 5) if per_node else 5
        gen = NODE_GENERATORS[nid]
        mcq = max(1, round(n * 0.4))
        fb  = max(1, round(n * 0.4))
        tf  = max(0, n - mcq - fb)
        mtch = 1 if nid == "c1_bio_003" and n >= 7 else 0

        qs = gen(seed=rng.randint(0, 10_000),
                 num_mcq=mcq, num_fb=fb, num_tf=tf,
                 num_mtch=mtch)
        all_qs.extend(qs)

    return all_qs


def generate_paper(node_ids: List[str],
                   seed: int = 42,
                   total_questions: int = 10) -> List[Dict]:
    """
    Build a complete paper as a list of dicts with numbering,
    shuffled within each node block, then concatenated.
    """
    rng = _rng(seed)
    per_node_q = max(2, total_questions // len(node_ids))
    per_node_map = {nid: per_node_q for nid in node_ids}

    qs = generate_questions(node_ids, seed=seed, per_node=per_node_map)
    rng.shuffle(qs)

    paper = []
    for i, q in enumerate(qs, 1):
        d = q.to_dict()
        d["qno"] = i
        paper.append(d)
    return paper


def print_paper(paper: List[Dict]):
    """Pretty-print a question paper to stdout."""
    node_headers = {
        "c1_bio_001": "SECTION A — About Me: Personal Details",
        "c1_bio_002": "SECTION B — About Me: External Body Parts",
        "c1_bio_003": "SECTION C — About Me: Sense Organs",
        "c1_bio_004": "SECTION D — Food We Eat: Daily Food",
    }
    current_node = None
    for q in paper:
        if q["node_id"] != current_node:
            current_node = q["node_id"]
            print(f"\n{'─'*60}")
            print(f"  {node_headers.get(current_node, current_node)}")
            print(f"{'─'*60}")
        type_label = {"MCQ": "Choose the correct answer.",
                      "FB":  "Fill in the blank.",
                      "TF":  "Say True or False.",
                      "MTCH":"Match the items."}.get(q["qtype"], "")
        print(f"\nQ{q['qno']}. [{q['qtype']}] {q['stem']}")
        if q["options"]:
            for j, opt in enumerate(q["options"]):
                marker = "✓" if j == q["correct_idx"] else " "
                print(f"   {chr(65+j)}. {opt}  {marker}")
        if q["answer"]:
            print(f"   Answer: {q['answer']}")
        print(f"   (Explanation: {q['explanation']})")


# ──────────────────────────────────────────────
# ──────────────────────────────────────────────

if __name__ == "__main__":
    print("=" * 60)
    print("GENERATING QUESTION PAPER — Class 1 Biology (4 Nodes)")
    print("=" * 60)

    node_ids = ["c1_bio_001", "c1_bio_002",
                "c1_bio_003", "c1_bio_004"]
    paper = generate_paper(node_ids, seed=42, total_questions=12)
    print_paper(paper)

    print(f"\n\nTotal questions generated: {len(paper)}")
    print("\nMastery criteria per node:")
    for nid, crit in NODE_MASTERY.items():
        print(f"  {nid}: {crit}")