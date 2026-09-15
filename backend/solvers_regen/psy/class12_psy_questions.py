"""
CISCE Class 12 Psychology - Deterministic Question Generator
Covers all major syllabus topics for Class 12 Psychology (ISC)
Indian context: names, places, currency (Rs), scenarios
"""

import random
import math
from fractions import Fraction
from typing import List, Dict, Any, Optional
from dataclasses import dataclass, field
import json


# ============================================================================
# SYLLABUS NODE CATALOGUE
# ============================================================================

SYLLABUS_NODES = {
    "c12_psy_001": {
        "title": "Variations in Psychological Attributes - Intelligence",
        "topic": "Variations in Psychological Attributes",
        "keywords": ["intelligence", "IQ", "g factor", "s factor", "spearman", "thurstone",
                      "sternberg", "gardner", "emotional intelligence", "aptitude"],
        "difficulty": "Medium",
        "cognitive": "Understand",
        "exam_weightage": "High",
    },
    "c12_psy_002": {
        "title": "Aptitude and its Types",
        "topic": "Variations in Psychological Attributes",
        "keywords": ["aptitude", "multiple aptitude", "specific aptitude", "predictive",
                      "differential aptitude", "GATB", "potential", "achievement"],
        "difficulty": "Medium",
        "cognitive": "Understand",
        "exam_weightage": "Medium",
    },
    "c12_psy_003": {
        "title": "Personality - Theories and Assessment",
        "topic": "Self and Personality",
        "keywords": ["personality", "trait", "type", "allport", "cattell", "eysenck",
                      "freud", "jung", "adler", "projective", "self-report"],
        "difficulty": "Hard",
        "cognitive": "Analyse",
        "exam_weightage": "High",
    },
    "c12_psy_004": {
        "title": "Self Concept and Self Esteem",
        "topic": "Self and Personality",
        "keywords": ["self", "identity", "esteem", "self-efficacy", "rogers", "markus",
                      "looking-glass", "social", "personal", "self-schema"],
        "difficulty": "Easy",
        "cognitive": "Remember",
        "exam_weightage": "Medium",
    },
    "c12_psy_005": {
        "title": "Life Skills - Decision Making and Problem Solving",
        "topic": "Life Skills",
        "keywords": ["decision", "problem", "critical", "creative", "convergent",
                      "divergent", "step", "strategy", "barrier", "communication"],
        "difficulty": "Medium",
        "cognitive": "Apply",
        "exam_weightage": "Medium",
    },
    "c12_psy_006": {
        "title": "Emotional Intelligence and its Components",
        "topic": "Life Skills",
        "keywords": ["emotional intelligence", "EQ", "self-awareness", "self-regulation",
                      "motivation", "empathy", "social skill", "goleman", "mayer"],
        "difficulty": "Medium",
        "cognitive": "Understand",
        "exam_weightage": "Medium",
    },
    "c12_psy_007": {
        "title": "Meeting Social and Human Needs",
        "topic": "Human Strength and Life Skills",
        "keywords": ["need", "maslow", "belonging", "esteem", "self-actualization",
                      "hierarchy", "deficiency", "growth", "pro-social", "community"],
        "difficulty": "Easy",
        "cognitive": "Remember",
        "exam_weightage": "Medium",
    },
    "c12_psy_008": {
        "title": "Psychological Disorders - Classification and Causes",
        "topic": "Psychological Disorders",
        "keywords": ["disorder", "anxiety", "depression", "schizophrenia", "OCD",
                      "PTSD", "dissociative", "classification", "DSM", "etiology"],
        "difficulty": "Hard",
        "cognitive": "Understand",
        "exam_weightage": "High",
    },
    "c12_psy_009": {
        "title": "Therapeutic Approaches - Overview",
        "topic": "Therapeutic Approaches",
        "keywords": ["psychoanalysis", "CBT", "humanistic", "client-centered",
                      "behavior", "cognitive", "biofeedback", "hypnosis", "therapy"],
        "difficulty": "Hard",
        "cognitive": "Analyse",
        "exam_weightage": "High",
    },
    "c12_psy_010": {
        "title": "Cognitive Behaviour Therapy and REBT",
        "topic": "Therapeutic Approaches",
        "keywords": ["CBT", "REBT", "ellis", "ABC model", "dysfunctional",
                      "cognitive distortion", "restructuring", "homework"],
        "difficulty": "Hard",
        "cognitive": "Apply",
        "exam_weightage": "Medium",
    },
    "c12_psy_011": {
        "title": "Attitude and Social Cognition",
        "topic": "Attitude and Social Cognition",
        "keywords": ["attitude", "belief", "value", "cognitive dissonance",
                      "prejudice", "stereotype", "discrimination", "persuasion", "ELM"],
        "difficulty": "Medium",
        "cognitive": "Understand",
        "exam_weightage": "High",
    },
    "c12_psy_012": {
        "title": "Prejudice, Stereotypes and Discrimination",
        "topic": "Attitude and Social Cognition",
        "keywords": ["prejudice", "stereotype", "discrimination", "ingroup",
                      "outgroup", "scapegoat", "social identity", "reduction"],
        "difficulty": "Medium",
        "cognitive": "Analyse",
        "exam_weightage": "Medium",
    },
    "c12_psy_013": {
        "title": "Social Influence and Group Processes",
        "topic": "Social Influence and Group Processes",
        "keywords": ["conformity", "compliance", "obedience", "milgram",
                      "group", "cohesion", "polarization", "social loafing", "deindividuation"],
        "difficulty": "Medium",
        "cognitive": "Apply",
        "exam_weightage": "High",
    },
    "c12_psy_014": {
        "title": "Environmental Concerns and Pro-environmental Behaviour",
        "topic": "Psychology and Life",
        "keywords": ["environment", "noise", "pollution", "pro-environmental",
                      "sustainable", "stress", "altruism", "conservation", "awareness"],
        "difficulty": "Easy",
        "cognitive": "Understand",
        "exam_weightage": "Medium",
    },
    "c12_psy_015": {
        "title": "Psychological Skills - Understanding the Counsellor",
        "topic": "Developing Psychological Skills",
        "keywords": ["counseling", "empathy", "active listening", "rapport",
                      "confidentiality", "assessment", "goal", "referral", "ethics"],
        "difficulty": "Medium",
        "cognitive": "Understand",
        "exam_weightage": "Medium",
    },
}


# ============================================================================
# DATA POOLS - INDIAN CONTEXT
# ============================================================================

INDIAN_FIRST_NAMES_M = [
    "Rahul", "Amit", "Vikram", "Arjun", "Rohan", "Karthik", "Aditya", "Siddharth",
    "Priyansh", "Neeraj", "Rishi", "Karan", "Varun", "Harsh", "Nikhil", "Pranav",
    "Dev", "Aryan", "Ishaan", "Raghav", "Yash", "Arnav", "Kabir", "Om"
]

INDIAN_FIRST_NAMES_F = [
    "Priya", "Ananya", "Sneha", "Kavya", "Nisha", "Pooja", "Riya", "Divya",
    "Meera", "Aisha", "Ira", "Tara", "Sakshi", "Aditi", "Shruti", "Vaishali",
    "Kriti", "Neha", "Swara", "Asha", "Diya", "Aarohi", "Isha", "Riddhi"
]

INDIAN_CITIES = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune",
    "Ahmedabad", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Bhopal",
    "Chandigarh", "Kochi", "Coimbatore", "Vijayawada", "Ludhiana", "Patna",
    "Gurgaon", "Noida", "Thane", "Mysore", "Trivandrum"
]

INDIAN_SCHOOLS = [
    "Delhi Public School", "St. Xavier's School", "DAV Public School",
    "Kendriya Vidyalaya", "Ryan International School", "Amity International School",
    "Springdales School", "Modern School", "The Doon School", "Scindia School",
    "Mayo College", "Sanskar School", "Vidya Mandir", "National Public School"
]

INDIAN_PROFESSIONS = [
    "software engineer", "doctor", "teacher", "civil servant", "entrepreneur",
    "architect", "lawyer", "journalist", "bank manager", "researcher",
    "data analyst", "nurse", "pharmacist", "graphic designer", "civil engineer"
]

INDIAN_COLLEGES = [
    "St. Stephen's College", "Lady Shri Ram College", "Miranda House",
    "Hindu College", "Ramjas College", "Hansraj College", "Kirori Mal College",
    "Jadavpur University", "IIT Bombay", "IIT Delhi", "TISS Mumbai",
    "NIMHANS Bangalore", "Jamia Millia Islamia", "BHU Varanasi"
]

OCCUPATION_STRESS = [
    "software engineer", "medical resident", "investment banker",
    "civil servant", "journalist", "teacher", "consultant"
]


# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def get_name(rng, gender="any"):
    if gender == "male":
        return rng.choice(INDIAN_FIRST_NAMES_M)
    elif gender == "female":
        return rng.choice(INDIAN_FIRST_NAMES_F)
    return rng.choice(INDIAN_FIRST_NAMES_M + INDIAN_FIRST_NAMES_F)


def get_city(rng):
    return rng.choice(INDIAN_CITIES)


def get_school(rng):
    return rng.choice(INDIAN_SCHOOLS)


def get_profession(rng):
    return rng.choice(INDIAN_PROFESSIONS)


def get_college(rng):
    return rng.choice(INDIAN_COLLEGES)


def fmt_money(amount):
    return "Rs {:,}".format(amount)


def _ensure_brackets(text):
    open_count = text.count('(')
    close_count = text.count(')')
    return text + ')' * (open_count - close_count)


def _clean_string(text):
    replacements = {
        '\u2014': '-', '\u2013': '-', '\u201c': '"', '\u201d': '"',
        '\u2018': "'", '\u2019': "'", '\u2010': '-',
    }
    for k, v in replacements.items():
        text = text.replace(k, v)
    return text


# ============================================================================
# QUESTION GENERATORS BY TOPIC
# ============================================================================

def gen_intelligence_questions(rng, count):
    questions = []
    for _ in range(count):
        q_type = rng.choice(["mcq", "mcq", "fill", "short", "numerical"])
        name = get_name(rng, rng.choice(["male", "female"]))
        age = rng.randint(12, 45)
        city = get_city(rng)

        if q_type == "numerical":
            ma = rng.randint(60, 150)
            ca = rng.randint(90, 160)
            iq = round((ca / ma) * 100, 1)
            iq2 = rng.choice([iq + rng.randint(5, 30), iq - rng.randint(5, 30)])
            q_text = (
                "{name} from {city} scored a Mental Age (MA) of {ma} years "
                "and a Chronological Age (CA) of {ca} years on an intelligence test. "
                "Calculate {name}'s IQ using the formula: IQ = (MA / CA) * 100."
            ).format(name=name, city=city, ma=ma, ca=ca)
            steps = [
                "Given: Mental Age (MA) = {} years".format(ma),
                "Given: Chronological Age (CA) = {} years".format(ca),
                "Formula: IQ = (MA / CA) * 100",
                "IQ = ({} / {}) * 100".format(ma, ca),
                "IQ = {} * 100".format(round(ma / ca, 4)),
                "IQ = {}".format(iq),
            ]
            explanation = (
                "The intelligence quotient (IQ) is calculated by dividing the mental "
                "age by chronological age and multiplying by 100. An IQ of {} indicates "
                "{} intelligence level.".format(
                    iq,
                    "above average" if iq > 110 else "average" if iq >= 90 else "below average"
                )
            )
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_001",
                "topic": "Variations in Psychological Attributes",
                "type": "numerical",
                "question": _clean_string(q_text),
                "options": [str(iq), str(iq2), str(rng.randint(50, 85)), str(rng.randint(130, 160))],
                "answer": str(iq),
                "steps": steps,
                "explanation": _clean_string(explanation),
                "difficulty": "Medium",
                "bloom_level": "Apply",
            })

        elif q_type == "mcq":
            frameworks = [
                {
                    "theory": "Spearman's Two-Factor Theory",
                    "scholar": "Charles Spearman",
                    "factors": "General factor (g) and Specific factor (s)",
                    "key_feature": "intelligence is a general ability"
                },
                {
                    "theory": "Thurstone's Primary Mental Abilities",
                    "scholar": "Louis Thurstone",
                    "factors": "Seven independent abilities",
                    "key_feature": "intelligence consists of distinct abilities"
                },
                {
                    "theory": "Sternberg's Triarchic Theory",
                    "scholar": "Robert Sternberg",
                    "factors": "Analytical, Creative, Practical",
                    "key_feature": "three aspects of intelligence"
                },
                {
                    "theory": "Gardner's Multiple Intelligences",
                    "scholar": "Howard Gardner",
                    "factors": "Eight types of intelligence",
                    "key_feature": "independent types of intelligence"
                },
            ]
            framework = rng.choice(frameworks)
            wrong_opts = [f for f in frameworks if f["theory"] != framework["theory"]]
            opts = [framework["scholar"]] + [f["scholar"] for f in wrong_opts[:3]]
            rng.shuffle(opts)

            q_text = (
                "According to {theory}, who proposed that {key_feature}?"
            ).format(**framework)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_001",
                "topic": "Variations in Psychological Attributes",
                "type": "mcq",
                "question": _clean_string(q_text),
                "options": opts,
                "answer": framework["scholar"],
                "steps": [
                    "Identify the theory: {}".format(framework["theory"]),
                    "Recall the theorist who proposed it: {}".format(framework["scholar"]),
                    "Key concept: {}".format(framework["key_feature"]),
                ],
                "explanation": _clean_string(
                    "{theory} was proposed by {scholar}. This theory states that "
                    "{key_feature}.".format(**framework)
                ),
                "difficulty": "Medium",
                "bloom_level": "Remember",
            })

        elif q_type == "fill":
            theories_blank = [
                {
                    "theory": "Spearman's Two-Factor Theory",
                    "blank": "g and s",
                    "answer": "g",
                    "question_template": (
                        "In Spearman's Two-Factor Theory of intelligence, the '____ factor' "
                        "refers to general mental ability that underlies all intellectual tasks."
                    )
                },
                {
                    "theory": "Sternberg's Triarchic Theory",
                    "blank": "analytical, creative, and practical",
                    "answer": "analytical",
                    "question_template": (
                        "According to Sternberg's Triarchic Theory, the component that involves "
                        "problem-solving and abstract thinking is called ____ intelligence."
                    )
                },
                {
                    "theory": "Gardner's Theory",
                    "blank": "multiple",
                    "answer": "multiple",
                    "question_template": (
                        "Howard Gardner proposed the theory of ____ intelligences, which "
                        "suggests there are eight distinct types of intelligence."
                    )
                },
            ]
            t = rng.choice(theories_blank)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_001",
                "topic": "Variations in Psychological Attributes",
                "type": "fill",
                "question": _clean_string(t["question_template"]),
                "options": [],
                "answer": t["answer"],
                "steps": [
                    "Identify the relevant theory of intelligence.",
                    "Fill in the blank with the appropriate term.",
                    "Verify the term fits the context of the statement.",
                ],
                "explanation": _clean_string(
                    "The answer is '{}'. This relates to {}."
                    .format(t["answer"], t["theory"])
                ),
                "difficulty": "Easy",
                "bloom_level": "Remember",
            })

        elif q_type == "short":
            ei_topics = [
                {
                    "name": "Daniel Goleman",
                    "components": ["Self-awareness", "Self-regulation", "Motivation",
                                   "Empathy", "Social skills"],
                    "model": "five components model"
                },
            ]
            ei = rng.choice(ei_topics)
            q_text = (
                "Describe the key components of Emotional Intelligence as proposed by {name}. "
                "Use an example of a student from {city} to illustrate one component."
            ).format(name=ei["name"], city=city)
            answer_text = (
                "Daniel Goleman proposed that Emotional Intelligence has five components: "
                "(1) Self-awareness - recognizing one's own emotions; "
                "(2) Self-regulation - managing disruptive emotions; "
                "(3) Motivation - being driven to achieve; "
                "(4) Empathy - understanding others' emotions; "
                "(5) Social skills - managing relationships. "
                "For example, a student in {} who notices they are feeling anxious before "
                "an exam and practices deep breathing is demonstrating self-awareness and "
                "self-regulation.".format(city)
            )
            steps = [
                "Identify the theorist and the number of components proposed.",
                "List each component with a brief explanation.",
                "Provide a real-world example illustrating one component.",
                "Connect the example to the theoretical framework.",
            ]
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_001",
                "topic": "Variations in Psychological Attributes",
                "type": "short_answer",
                "question": _clean_string(q_text),
                "options": [],
                "answer": _clean_string(answer_text),
                "steps": steps,
                "explanation": _clean_string(
                    "Emotional Intelligence encompasses both intrapersonal and interpersonal "
                    "abilities. Goleman's model is widely used in educational and workplace "
                    "settings in India."
                ),
                "difficulty": "Medium",
                "bloom_level": "Understand",
            })

    return questions


def gen_aptitude_questions(rng, count):
    questions = []
    for _ in range(count):
        q_type = rng.choice(["mcq", "mcq", "fill", "short", "numerical"])
        name = get_name(rng, rng.choice(["male", "female"]))
        city = get_city(rng)
        profession = get_profession(rng)

        if q_type == "numerical":
            cutoff = rng.randint(20, 60)
            scored = rng.randint(cutoff, cutoff + 40)
            q_text = (
                "The cutoff score for selection in a recruitment drive for {} positions "
                "was {}. {name} from {city} scored {}. "
                "What is the margin by which {name} exceeded the cutoff?"
            ).format(profession, cutoff, name=name, city=city, scored=scored)
            margin = scored - cutoff
            wrong_margin = rng.choice([margin + rng.randint(5, 15), margin - rng.randint(1, 10),
                                       rng.randint(5, 20)])
            opts = [str(margin), str(margin + rng.randint(3, 12)), str(max(1, margin - rng.randint(3, 10))),
                    str(rng.randint(1, 50))]
            rng.shuffle(opts)
            steps = [
                "Cutoff score = {}".format(cutoff),
                "{name}'s score = {}".format(scored),
                "Margin = Scored - Cutoff",
                "Margin = {} - {} = {}".format(scored, cutoff, margin),
            ]
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_002",
                "topic": "Variations in Psychological Attributes",
                "type": "numerical",
                "question": _clean_string(q_text),
                "options": opts,
                "answer": str(margin),
                "steps": steps,
                "explanation": _clean_string(
                    "The margin is the difference between {name}'s score ({}) and the "
                    "cutoff ({}), which is {}. A positive margin indicates selection above "
                    "the minimum requirement.".format(name, scored, cutoff, margin)
                ),
                "difficulty": "Easy",
                "bloom_level": "Apply",
            })

        elif q_type == "mcq":
            apt_types = [
                {"type": "Mechanical Aptitude",
                 "measures": "ability to understand mechanical principles",
                 "example": "assembling machinery"},
                {"type": "Clerical Aptitude",
                 "measures": "speed and accuracy in office tasks",
                 "example": "data entry"},
                {"type": "Musical Aptitude",
                 "measures": "ability to perceive and produce music",
                 "example": "identifying musical notes"},
                {"type": "Spatial Aptitude",
                 "measures": "ability to visualize and manipulate objects",
                 "example": "architectural drawing"},
            ]
            correct_apt = rng.choice(apt_types)
            wrong_opts = [a["type"] for a in apt_types if a["type"] != correct_apt["type"]]
            opts = [correct_apt["type"]] + wrong_opts[:3]
            rng.shuffle(opts)

            q_text = (
                "An aptitude test for {} primarily measures:"
                .format(correct_apt["example"])
            )
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_002",
                "topic": "Variations in Psychological Attributes",
                "type": "mcq",
                "question": _clean_string(q_text),
                "options": opts,
                "answer": correct_apt["type"],
                "steps": [
                    "Identify the task described: {}".format(correct_apt["example"]),
                    "Match the task to the corresponding aptitude type.",
                    "Correct match: {}".format(correct_apt["type"]),
                ],
                "explanation": _clean_string(
                    "{} primarily measures {}. For example, {} is a task that "
                    "uses this type of aptitude.".format(
                        correct_apt["type"], correct_apt["measures"], correct_apt["example"]
                    )
                ),
                "difficulty": "Easy",
                "bloom_level": "Understand",
            })

        elif q_type == "fill":
            aptitude_concepts = [
                ("aptitude tests measure", "potential for future performance", "aptitude tests"),
                ("achievement tests measure", "past learning and current knowledge", "achievement tests"),
                ("multiple aptitude tests assess", "various independent abilities", "multiple aptitude"),
                ("specific aptitude tests measure", "single specialized ability", "specific aptitude"),
            ]
            concept = rng.choice(aptitude_concepts)
            q_text = (
                "Aptitude tests are used to assess an individual's _____ for a particular "
                "type of activity or training."
            )
            answer_word = "potential"
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_002",
                "topic": "Variations in Psychological Attributes",
                "type": "fill",
                "question": _clean_string(q_text),
                "options": [],
                "answer": answer_word,
                "steps": [
                    "Understand the difference between aptitude and achievement.",
                    "Aptitude refers to innate potential, not learned skills.",
                    "The correct term is 'potential'.",
                ],
                "explanation": _clean_string(
                    "Aptitude tests measure potential for future performance, unlike "
                    "achievement tests which measure past learning."
                ),
                "difficulty": "Easy",
                "bloom_level": "Remember",
            })

        elif q_type == "short":
            q_text = (
                "{name}, a student from {city}, is considering a career as a {profession}. "
                "Describe how differential aptitude testing can help {name} make an informed "
                "career decision. Mention at least two types of aptitude tests that would be relevant."
            ).format(name=name, city=city, profession=profession)
            answer_text = (
                "Differential aptitude testing assesses various independent abilities to help "
                "match individuals with suitable careers. For {name} considering a career as a "
                "{profession}, the following tests would be relevant: "
                "(1) Verbal Reasoning Test - to assess comprehension and communication skills "
                "essential for many professions; "
                "(2) Numerical Reasoning Test - to evaluate mathematical and analytical ability; "
                "(3) Spatial Relations Test - relevant if the role involves design or planning. "
                "These tests help identify {name}'s strengths and guide career counseling "
                "toward the best-fit profession in {city}."
            ).format(name=name, city=city, profession=profession)
            steps = [
                "Identify the purpose of differential aptitude tests: assessing multiple independent abilities.",
                "Select aptitude test types relevant to the given profession.",
                "Explain how each test type helps match skills to career demands.",
                "Connect the findings to informed career decision-making.",
            ]
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_002",
                "topic": "Variations in Psychological Attributes",
                "type": "short_answer",
                "question": _clean_string(q_text),
                "options": [],
                "answer": _clean_string(answer_text),
                "steps": steps,
                "explanation": _clean_string(
                    "Career guidance through aptitude testing is widely used in Indian schools "
                    "and colleges to help students make informed educational and career choices."
                ),
                "difficulty": "Medium",
                "bloom_level": "Apply",
            })

    return questions


def gen_personality_questions(rng, count):
    questions = []
    for _ in range(count):
        q_type = rng.choice(["mcq", "mcq", "fill", "short", "long"])
        name = get_name(rng, rng.choice(["male", "female"]))
        city = get_city(rng)

        if q_type == "mcq":
            theories_list = [
                {
                    "theory": "Freud's Psychoanalytic Theory",
                    "key_concept": "psychodynamic",
                    "focus": "unconscious conflicts and childhood experiences",
                    "structure": "id, ego, superego"
                },
                {
                    "theory": "Jung's Analytical Psychology",
                    "key_concept": "collective unconscious",
                    "focus": "archetypes and individuation",
                    "structure": "personal unconscious, collective unconscious"
                },
                {
                    "theory": "Allport's Trait Theory",
                    "key_concept": "cardinal, central, and secondary traits",
                    "focus": "individual traits and personal dispositions",
                    "structure": "hierarchical trait structure"
                },
                {
                    "theory": "Cattell's 16 Personality Factors",
                    "key_concept": "source traits",
                    "focus": "16 fundamental dimensions of personality",
                    "structure": "16PF questionnaire"
                },
                {
                    "theory": "Eysenck's Three-Factor Model",
                    "key_concept": "introversion-extraversion, neuroticism, psychoticism",
                    "focus": "biological basis of personality",
                    "structure": "PEN model"
                },
            ]
            theory = rng.choice(theories_list)
            question_forms = [
                "According to {theory}, the primary focus of personality is on:".format(**theory),
                "Which theorist proposed that personality includes {key_concept}?".format(**theory),
                "The {structure} is associated with which personality theory?".format(**theory),
            ]
            q_text = rng.choice(question_forms)

            answer_map = {
                0: theory["focus"],
                1: theory["theory"],
                2: theory["theory"],
            }
            correct_ans = answer_map[question_forms.index(q_text)] if q_text in [q for q in question_forms] else theory["focus"]

            # Build options
            all_focuses = [t["focus"] for t in theories_list]
            all_theories = [t["theory"] for t in theories_list]
            if "focus" in q_text.lower():
                opts = [theory["focus"]] + rng.sample(
                    [f for f in all_focuses if f != theory["focus"]], 3
                )
                answer = theory["focus"]
            else:
                opts = [theory["theory"]] + rng.sample(
                    [t for t in all_theories if t != theory["theory"]], 3
                )
                answer = theory["theory"]
            rng.shuffle(opts)

            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_003",
                "topic": "Self and Personality",
                "type": "mcq",
                "question": _clean_string(q_text),
                "options": opts,
                "answer": answer,
                "steps": [
                    "Identify key terms in the question.",
                    "Recall the relevant personality theory and its characteristics.",
                    "Match the theory's focus with the given options.",
                ],
                "explanation": _clean_string(
                    "{theory}: This theory focuses on {focus}. "
                    "The {structure} is the model used.".format(**theory)
                ),
                "difficulty": "Medium",
                "bloom_level": "Understand",
            })

        elif q_type == "fill":
            fill_items = [
                ("____ traits", "cardinal", "Allport identified cardinal, central, and secondary traits."),
                ("The ____ test is a projective personality test",
                 "Rorschach Inkblot", "The Rorschach Inkblot Test uses ambiguous inkblots."),
                ("In Cattell's model, there are ____ source traits",
                 "16", "Cattell identified 16 source traits using factor analysis."),
                ("____ theory proposes three dimensions: PEN",
                 "Eysenck's", "Eysenck proposed Psychoticism, Extraversion, and Neuroticism."),
            ]
            item = rng.choice(fill_items)
            q_text = item[0]
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_003",
                "topic": "Self and Personality",
                "type": "fill",
                "question": _clean_string(q_text),
                "options": [],
                "answer": item[1],
                "steps": [
                    "Identify the concept being asked about.",
                    "Recall the relevant personality theory details.",
                    "Fill in the blank accurately.",
                ],
                "explanation": _clean_string(item[2]),
                "difficulty": "Easy",
                "bloom_level": "Remember",
            })

        elif q_type == "short":
            assessment_types = [
                ("Self-report inventories",
                 "MMPI, 16PF, NEO-PI-R",
                 "structured questionnaires where individuals describe their own traits",
                 "objective but susceptible to social desirability bias"),
                ("Projective tests",
                 "Rorschach Inkblot Test, TAT",
                 "ambiguous stimuli that reveal unconscious processes through projection",
                 "rich qualitative data but lower reliability"),
                ("Behavioral assessment",
                 "direct observation of behavior in natural or controlled settings",
                 "objective measurement of actual behavior rather than self-report",
                 "time-consuming but ecologically valid"),
            ]
            atype = rng.choice(assessment_types)
            q_text = (
                "Compare and contrast {atype} as a method of personality assessment. "
                "Discuss its key features, examples, and one major strength and limitation "
                "with reference to assessment practices in {city}."
            ).format(atype=atype[0], city=city)
            answer_text = (
                "{atype} is a method of personality assessment.\n"
                "Examples: {examples}\n"
                "Description: {desc}\n"
                "Strength: {strength}\n"
                "Limitation: {limitation}\n"
                "In {city}, these assessment tools are used by counseling centers and "
                "organizations for personnel selection and clinical diagnosis."
            ).format(
                atype=atype[0], examples=atype[1], desc=atype[2],
                strength=atype[3].split('but')[0].strip(),
                limitation=atype[3].split('but')[1].strip(),
                city=city,
            )
            steps = [
                "Define the personality assessment method.",
                "List examples used in practice.",
                "Describe the method's approach and features.",
                "Identify one strength and one limitation.",
                "Connect to real-world usage in an Indian context.",
            ]
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_003",
                "topic": "Self and Personality",
                "type": "short_answer",
                "question": _clean_string(q_text),
                "options": [],
                "answer": _clean_string(answer_text),
                "steps": steps,
                "explanation": _clean_string(
                    "Personality assessment methods vary in their approach, reliability, "
                    "and validity. Understanding both projective and objective methods "
                    "is essential for psychological practice."
                ),
                "difficulty": "Medium",
                "bloom_level": "Analyse",
            })

        elif q_type == "long":
            q_text = (
                "{name} from {city} displays traits of being highly organized, socially "
                "outgoing, and emotionally stable. Using trait theories of personality "
                "(Allport, Cattell, and Eysenck), analyze {name}'s personality profile. "
                "How would each theorist describe {name}'s personality? "
                "Which assessment method would be most suitable and why?"
            ).format(name=name, city=city)
            answer_text = (
                "Trait theories offer different perspectives on personality:\n\n"
                "1. Allport's Trait Theory: Allport would focus on {name}'s individual "
                "traits. Being organized might be a 'central trait' (core characteristic), "
                "being outgoing an 'identifying trait', and emotional stability another "
                "central trait. Cardinal traits (dominant traits that shape behavior) may "
                "or may not be evident.\n\n"
                "2. Cattell's 16PF: Cattell would analyze {name} using 16 source factors. "
                "High organization = high 'Rule-Consciousness' (Factor G). Being outgoing = "
                "high 'Warmth' (Factor A) and 'Gregariousness' (Factor H). Emotional "
                "stability = low 'Anxiety' (Factor O) and high 'Emotional Stability'.\n\n"
                "3. Eysenck's PEN Model: Eysenck would describe {name} as high on "
                "Extraversion (sociable, outgoing) and low on Neuroticism (emotionally "
                "stable). If {name} also shows discipline, that might indicate moderate "
                "Psychoticism.\n\n"
                "Best assessment method: The 16PF questionnaire or NEO-PI-R would be most "
                "suitable as they provide a comprehensive trait profile across multiple "
                "dimensions, giving a nuanced picture of {name}'s personality structure."
            ).format(name=name)
            steps = [
                "Analyze each trait theory (Allport, Cattell, Eysenck) separately.",
                "Map {name}'s observed traits onto each theory's framework.".format(name=name),
                "Identify the most suitable assessment method.",
                "Justify the choice with reference to the method's strengths.",
                "Synthesize the analysis into a coherent personality profile.",
            ]
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_003",
                "topic": "Self and Personality",
                "type": "long_answer",
                "question": _clean_string(q_text),
                "options": [],
                "answer": _clean_string(answer_text),
                "steps": steps,
                "explanation": _clean_string(
                    "Trait theories of personality provide different levels of analysis "
                    "from individual dispositions (Allport) to broader factors (Cattell, "
                    "Eysenck). Understanding all three provides a comprehensive view."
                ),
                "difficulty": "Hard",
                "bloom_level": "Analyse",
            })

    return questions


def gen_life_skills_questions(rng, count):
    questions = []
    for _ in range(count):
        q_type = rng.choice(["mcq", "mcq", "fill", "short", "competency"])
        name = get_name(rng, rng.choice(["male", "female"]))
        city = get_city(rng)
        college = get_college(rng)

        if q_type == "competency":
            scenario_type = rng.choice([
                "academic_stress", "career_decision", "interpersonal_conflict",
                "time_management", "exam_anxiety"
            ])

            if scenario_type == "academic_stress":
                q_text = (
                    "COMPETENCY-BASED: {name} is a second-year student at {college} in {city}. "
                    "They are struggling with overwhelming academic pressure, have missed several "
                    "deadlines, and report sleeping only 4-5 hours per night. Their grades have "
                    "dropped from 85% to 62% over two semesters. As a peer counselor:\n\n"
                    "(a) Identify at least THREE life skills that {name} needs to develop.\n"
                    "(b) Apply the problem-solving model (define the problem, generate "
                    "alternatives, evaluate alternatives, implement, and evaluate outcome) "
                    "to create a structured action plan for {name}.\n"
                    "(c) Discuss how emotional intelligence components can help {name} "
                    "regulate stress and improve academic performance.\n"
                    "(d) Propose specific strategies {name} can implement over the next 4 weeks."
                ).format(name=name, college=college, city=city)
                answer_text = (
                    "(a) Life skills needed: (1) Time Management - prioritizing tasks and "
                    "creating realistic schedules; (2) Stress Management - learning relaxation "
                    "techniques and coping strategies; (3) Decision Making - setting realistic "
                    "academic goals; (4) Self-Regulation - monitoring and controlling "
                    "emotions and behaviors.\n\n"
                    "(b) Problem-Solving Plan: "
                    "Step 1 - Define: Overcommitment leading to sleep deprivation and declining grades. "
                    "Step 2 - Generate: Time-blocking, seek academic counseling, join study groups, "
                    "reduce extracurricular load. "
                    "Step 3 - Evaluate: Time-blocking is most feasible; seek tutoring in weak subjects. "
                    "Step 4 - Implement: Create daily schedule with 7 hours sleep, use Pomodoro technique. "
                    "Step 5 - Evaluate: Monitor grades and stress levels weekly.\n\n"
                    "(c) EQ components: Self-awareness (recognize stress signals), Self-regulation "
                    "(manage anxiety through breathing exercises), Motivation (maintain intrinsic "
                    "drive), Empathy (seek support from peers), Social skills (communicate with "
                    "professors about extensions).\n\n"
                    "(d) 4-week plan: Week 1 - establish sleep routine and daily planner. "
                    "Week 2 - implement Pomodoro technique and seek academic support. "
                    "Week 3 - join a study group and practice stress-reduction exercises. "
                    "Week 4 - evaluate progress and adjust strategies."
                )

            elif scenario_type == "career_decision":
                profession1 = get_profession(rng)
                profession2 = get_profession(rng)
                q_text = (
                    "COMPETENCY-BASED: {name} from {city} has completed graduation from "
                    "{college} and is at a career crossroads. They have received job offers: "
                    "(1) a stable position as a {p1} with a salary of {sal1} per month in a "
                    "reputed MNC, and (2) a challenging startup role as a {p2} with an initial "
                    "salary of {sal2} but higher growth potential.\n\n"
                    "(a) Apply the decision-making process to analyze this situation. "
                    "List the criteria {name} should consider.\n"
                    "(b) Identify the barriers to effective decision-making that {name} might "
                    "face (e.g., family pressure, fear of failure, uncertainty).\n"
                    "(c) Using critical thinking, evaluate both options systematically and "
                    "recommend a course of action.\n"
                    "(d) Discuss how creative thinking could help {name} explore a third option."
                ).format(
                    name=name, city=city, college=college,
                    p1=profession1, p2=profession2,
                    sal1=fmt_money(rng.randint(30000, 80000)),
                    sal2=fmt_money(rng.randint(20000, 50000)),
                )
                answer_text = (
                    "(a) Decision criteria: (1) Salary and financial security, "
                    "(2) Career growth and learning opportunities, "
                    "(3) Work-life balance, (4) Company reputation, "
                    "(5) Job security, (6) Alignment with long-term goals, "
                    "(7) Location and commute.\n\n"
                    "(b) Barriers: (1) Family pressure to choose the stable MNC job, "
                    "(2) Fear of failure in a startup, (3) Uncertainty about startup viability, "
                    "(4) Social comparison with peers, (5) Anchoring on initial salary difference.\n\n"
                    "(c) Evaluation: If {name} values stability and family financial security, "
                    "the MNC role is better. If {name} values rapid growth and learning, "
                    "the startup offers more. Considering {city}'s growing startup ecosystem, "
                    "the startup could provide invaluable experience.\n\n"
                    "(d) Third option: Negotiate with the startup for a higher salary, "
                    "or join the MNC with an agreement to review after 1 year for a "
                    "transition to a more entrepreneurial role within the company."
                ).format(name=name, city=city)

            else:
                q_text = (
                    "COMPETENCY-BASED: {name}, a resident of {city}, has been experiencing "
                    "difficulty maintaining relationships due to poor communication and frequent "
                    "conflicts at both home and the workplace. They are a {profession} and report "
                    "feeling isolated and misunderstood.\n\n"
                    "(a) Identify THREE interpersonal barriers to effective communication "
                    "that {name} faces.\n"
                    "(b) Apply the concept of active listening to suggest improvements in "
                    "{name}'s communication style.\n"
                    "(c) Discuss how emotional intelligence skills (empathy, social awareness) "
                    "could help {name} build stronger relationships.\n"
                    "(d) Design a 2-week communication improvement plan for {name}."
                ).format(name=name, city=city, profession=get_profession(rng))
                answer_text = (
                    "(a) Interpersonal barriers: (1) Poor listening skills - interrupting others, "
                    "(2) Emotional reactivity - responding impulsively, "
                    "(3) Lack of empathy - failing to understand others' perspectives, "
                    "(4) Inadequate non-verbal communication.\n\n"
                    "(b) Active listening: {name} should practice maintaining eye contact, "
                    "avoiding interruptions, paraphrasing what others say, asking clarifying "
                    "questions, and providing appropriate verbal and non-verbal feedback.\n\n"
                    "(c) EQ skills: Empathy helps {name} understand others' emotions and "
                    "perspectives. Social awareness helps navigate group dynamics. "
                    "Self-regulation helps manage emotional reactions during conflicts.\n\n"
                    "(d) 2-week plan: Week 1 - practice active listening in 3 daily "
                    "conversations, keep a communication journal. Week 2 - seek feedback "
                    "from a trusted friend or colleague, practice empathetic responses, "
                    "reflect on improvements."
                ).format(name=name)

            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_005",
                "topic": "Life Skills",
                "type": "long_answer",
                "question": _clean_string(q_text),
                "options": [],
                "answer": _clean_string(answer_text),
                "steps": [
                    "Identify the core problem and relevant life skills.",
                    "Apply the structured problem-solving model.",
                    "Identify barriers to effective decision-making.",
                    "Evaluate options systematically.",
                    "Propose creative alternatives.",
                    "Design a concrete action plan.",
                ],
                "explanation": _clean_string(
                    "Competency-based questions require applying psychological concepts "
                    "to real-world scenarios. The key is to integrate multiple concepts "
                    "and provide evidence-based recommendations."
                ),
                "difficulty": "Hard",
                "bloom_level": "Apply",
            })

        elif q_type == "mcq":
            decision_barriers = [
                "Anchoring",
                "Availability Heuristic",
                "Confirmation Bias",
                "Overconfidence Bias",
                "Sunk Cost Fallacy",
                "Status Quo Bias",
                "Social Pressure",
            ]
            barrier = rng.choice(decision_barriers)
            all_barriers = decision_barriers[:]
            opts = [barrier] + rng.sample([b for b in all_barriers if b != barrier], 3)
            rng.shuffle(opts)

            barrier_descriptions = {
                "Anchoring": (
                    "Relying too heavily on the first piece of information encountered "
                    "when making a decision."
                ),
                "Availability Heuristic": (
                    "Overestimating the likelihood of events based on how easily "
                    "examples come to mind."
                ),
                "Confirmation Bias": (
                    "Seeking or interpreting information in a way that confirms one's "
                    "pre-existing beliefs."
                ),
                "Overconfidence Bias": (
                    "Overestimating one's own abilities, knowledge, or the accuracy of "
                    "one's predictions."
                ),
                "Sunk Cost Fallacy": (
                    "Continuing a behavior due to previously invested resources that "
                    "cannot be recovered."
                ),
                "Status Quo Bias": (
                    "Preferring the current state of affairs and resisting change."
                ),
                "Social Pressure": (
                    "Being influenced by the expectations or opinions of others when "
                    "making decisions."
                ),
            }

            q_text = (
                "When {name} from {city} made an important career decision, they relied "
                "heavily on the first salary figure they heard from a friend and compared "
                "all subsequent options to that number. This is an example of:"
            ).format(name=name, city=city)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_005",
                "topic": "Life Skills",
                "type": "mcq",
                "question": _clean_string(q_text),
                "options": opts,
                "answer": barrier,
                "steps": [
                    "Identify the scenario: relying on the first piece of information.",
                    "Match this to the corresponding decision-making barrier.",
                    "Confirm: This describes anchoring bias.",
                ],
                "explanation": _clean_string(
                    "{}: {}. In this scenario, {name} anchored on the first salary "
                    "figure, which influenced all subsequent comparisons."
                ).format(barrier, barrier_descriptions.get(barrier, ""), name=name),
                "difficulty": "Medium",
                "bloom_level": "Apply",
            })

        elif q_type == "fill":
            steps_names = [
                ("Define the problem", "first step in problem-solving", "define the problem"),
                ("Critical thinking", "systematic analysis of information to form judgment",
                 "critical thinking"),
                ("Divergent thinking", "generating multiple creative solutions", "divergent thinking"),
            ]
            item = rng.choice(steps_names)
            q_text = "The _____ involves generating multiple possible solutions to a problem."
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_005",
                "topic": "Life Skills",
                "type": "fill",
                "question": _clean_string(q_text),
                "options": [],
                "answer": "divergent thinking",
                "steps": [
                    "Identify the context: generating multiple solutions.",
                    "Recall that divergent thinking involves exploring many possibilities.",
                    "Fill in the blank: 'divergent thinking'.",
                ],
                "explanation": _clean_string(
                    "Divergent thinking is the ability to generate many creative solutions "
                    "to a problem. It contrasts with convergent thinking, which focuses on "
                    "finding the single best solution."
                ),
                "difficulty": "Easy",
                "bloom_level": "Remember",
            })

        elif q_type == "short":
            q_text = (
                "Explain the steps involved in effective decision-making. "
                "Illustrate with a practical example relevant to a student in {city}."
            ).format(city=city)
            answer_text = (
                "Effective decision-making involves these steps:\n"
                "1. Identify and define the problem clearly.\n"
                "2. Gather relevant information and analyze alternatives.\n"
                "3. Evaluate options based on criteria (pros and cons).\n"
                "4. Choose the best alternative.\n"
                "5. Implement the decision with a concrete plan.\n"
                "6. Evaluate the outcome and learn from the result.\n\n"
                "Example: A student in {} choosing between science and commerce streams. "
                "Step 1 - Define: Which stream aligns with career goals? "
                "Step 2 - Gather: Talk to seniors, research career paths. "
                "Step 3 - Evaluate: Compare interests, strengths, job prospects. "
                "Step 4 - Choose: Select based on evaluation. "
                "Step 5 - Implement: Enroll and commit. "
                "Step 6 - Evaluate: Reflect on satisfaction after one year."
            ).format(city)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_005",
                "topic": "Life Skills",
                "type": "short_answer",
                "question": _clean_string(q_text),
                "options": [],
                "answer": _clean_string(answer_text),
                "steps": [
                    "Identify the sequential steps in decision-making.",
                    "Choose a relatable example for an Indian student.",
                    "Apply each step to the example.",
                    "Ensure clarity and completeness.",
                ],
                "explanation": _clean_string(
                    "Decision-making is a structured process that improves outcomes when "
                    "followed systematically. Awareness of biases can improve decision quality."
                ),
                "difficulty": "Medium",
                "bloom_level": "Apply",
            })

    return questions


def gen_emotional_intelligence_questions(rng, count):
    questions = []
    for _ in range(count):
        q_type = rng.choice(["mcq", "mcq", "fill", "short", "competency"])
        name = get_name(rng, rng.choice(["male", "female"]))
        city = get_city(rng)

        if q_type == "competency":
            q_text = (
                "COMPETENCY-BASED: {name} is a project manager at a tech company in {city}. "
                "Recently, a team member missed a critical deadline, causing a client complaint. "
                "{name} felt angry but chose not to react impulsively. Instead, {name} spoke "
                "with the team member privately, discovered they were dealing with a family "
                "emergency, and worked out a revised schedule.\n\n"
                "(a) Identify and explain which Emotional Intelligence components {name} "
                "demonstrated in this scenario.\n"
                "(b) How did {name}'s self-awareness and self-regulation specifically "
                "contribute to the positive outcome?\n"
                "(c) Propose three additional EI strategies {name} could use to build "
                "a more emotionally resilient team culture in {city}.\n"
                "(d) Assess the potential impact of low emotional intelligence on "
                "organizational climate and employee well-being."
            ).format(name=name, city=city)
            answer_text = (
                "(a) EI Components demonstrated:\n"
                "1. Self-Awareness: {name} recognized their own anger before responding.\n"
                "2. Self-Regulation: {name} managed the impulse to react impulsively.\n"
                "3. Empathy: {name} tried to understand the team member's situation.\n"
                "4. Social Skills: {name} handled the conversation constructively.\n\n"
                "(b) Self-awareness allowed {name} to notice the anger response. "
                "Self-regulation enabled pausing before reacting. Together, these "
                "prevented escalation and maintained team morale.\n\n"
                "(c) EI strategies: (1) Regular team check-ins to discuss emotional well-being, "
                "(2) Training workshops on EI for all team members, "
                "(3) Creating a supportive feedback culture where emotions can be safely expressed.\n\n"
                "(d) Low EI impact: Poor communication, increased conflict, reduced team "
                "cohesion, lower job satisfaction, higher turnover, and decreased "
                "productivity. In a culturally diverse workplace like {city}, EI is "
                "especially important for managing cross-cultural interactions."
            ).format(city=city)

            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_006",
                "topic": "Life Skills",
                "type": "long_answer",
                "question": _clean_string(q_text),
                "options": [],
                "answer": _clean_string(answer_text),
                "steps": [
                    "Identify all EI components demonstrated in the scenario.",
                    "Analyze how self-awareness and self-regulation contributed.",
                    "Propose additional EI-based team-building strategies.",
                    "Assess the broader organizational impact of EI.",
                ],
                "explanation": _clean_string(
                    "Emotional intelligence is increasingly recognized as critical for "
                    "leadership and workplace success. Research shows high EI correlates "
                    "with better team performance and employee well-being."
                ),
                "difficulty": "Hard",
                "bloom_level": "Apply",
            })

        elif q_type == "mcq":
            ei_components = [
                ("Self-Awareness", "recognizing and understanding one's own emotions"),
                ("Self-Regulation", "managing and controlling disruptive emotions"),
                ("Motivation", "being driven to achieve for intrinsic reasons"),
                ("Empathy", "understanding and responding to others' emotions"),
                ("Social Skills", "managing relationships and building networks"),
            ]
            component = rng.choice(ei_components)
            all_components = ei_components[:]
            opts = [component[0]] + rng.sample([c[0] for c in all_components if c[0] != component[0]], 3)
            rng.shuffle(opts)

            q_text = (
                "Which component of Emotional Intelligence involves '{desc}'?"
                .format(desc=component[1])
            )
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_006",
                "topic": "Life Skills",
                "type": "mcq",
                "question": _clean_string(q_text),
                "options": opts,
                "answer": component[0],
                "steps": [
                    "Identify the definition given in the question.",
                    "Match the definition to the correct EI component.",
                    "Verify: '{}' corresponds to {}.".format(component[1], component[0]),
                ],
                "explanation": _clean_string(
                    "The component that involves '{}' is {}. "
                    "This is one of the five components of Goleman's Emotional Intelligence model."
                    .format(component[1], component[0])
                ),
                "difficulty": "Easy",
                "bloom_level": "Remember",
            })

        elif q_type == "fill":
            mayer_salovey = [
                ("Perceiving emotions", "identifying emotions in self and others"),
                ("Using emotions", "harnessing emotions to facilitate thinking"),
                ("Understanding emotions", "comprehending emotional language and patterns"),
                ("Managing emotions", "regulating emotions in self and others"),
            ]
            branch = rng.choice(mayer_salovey)
            q_text = (
                "In the Mayer-Salovey-Caruso model of Emotional Intelligence, the branch "
                "that involves {} is called '{} emotions'."
            ).format(branch[1], "")
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_006",
                "topic": "Life Skills",
                "type": "fill",
                "question": _clean_string(q_text),
                "options": [],
                "answer": branch[0].split()[0].lower(),
                "steps": [
                    "Identify the four branches of the MSCEIT model.",
                    "Match the description to the correct branch.",
                    "Fill in the blank with the appropriate word.",
                ],
                "explanation": _clean_string(
                    "The Mayer-Salovey-Caruso Emotional Intelligence Test (MSCEIT) "
                    "identifies four branches: Perceiving, Using, Understanding, and "
                    "Managing emotions."
                ),
                "difficulty": "Medium",
                "bloom_level": "Remember",
            })

        elif q_type == "short":
            q_text = (
                "Distinguish between Goleman's and Mayer-Salovey's models of Emotional "
                "Intelligence. Which model do you think is more useful for counseling "
                "students in schools in {city}? Justify your answer."
            ).format(city=city)
            answer_text = (
                "Goleman's model: Five components (self-awareness, self-regulation, "
                "motivation, empathy, social skills). Focuses on mixed model combining "
                "ability and personality traits. Practical and applied.\n\n"
                "Mayer-Salovey model: Four branches (perceiving, using, understanding, "
                "managing emotions). Purely ability-based model. Measured by MSCEIT. "
                "More scientific and cognitive.\n\n"
                "For school counseling in {}, Goleman's model is more useful because: "
                "(1) It is more comprehensive and addresses personality aspects, "
                "(2) The five components map well onto life skills training curricula, "
                "(3) It is more accessible for students to understand and apply, "
                "(4) It provides a clear framework for counseling interventions."
            ).format(city)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_006",
                "topic": "Life Skills",
                "type": "short_answer",
                "question": _clean_string(q_text),
                "options": [],
                "answer": _clean_string(answer_text),
                "steps": [
                    "Identify the key features of Goleman's model.",
                    "Identify the key features of Mayer-Salovey's model.",
                    "Compare the two models on key dimensions.",
                    "Justify which is more useful for school counseling.",
                ],
                "explanation": _clean_string(
                    "Both models contribute to understanding emotional intelligence. "
                    "Goleman's model is more widely applied in educational settings."
                ),
                "difficulty": "Medium",
                "bloom_level": "Analyse",
            })

    return questions


def gen_needs_maslow_questions(rng, count):
    questions = []
    for _ in range(count):
        q_type = rng.choice(["mcq", "mcq", "fill", "short", "competency"])
        name = get_name(rng, rng.choice(["male", "female"]))
        city = get_city(rng)

        if q_type == "competency":
            q_text = (
                "COMPETENCY-BASED: A study conducted in a rural village near {city} surveyed "
                "200 families about their well-being. The results showed:\n"
                "- 70% of families had access to basic food and shelter\n"
                "- 40% had stable employment\n"
                "- 25% reported having close friends they could rely on\n"
                "- 15% felt respected in their community\n"
                "- 5% reported pursuing personal growth activities\n\n"
                "Using Maslow's Hierarchy of Needs:\n"
                "(a) Which level of need is most pressing for the majority of families?\n"
                "(b) Analyze how unmet lower-level needs might affect the pursuit of "
                "higher-level needs in this community.\n"
                "(c) As a community psychologist working in {city}, design an intervention "
                "program to help families progress through the hierarchy.\n"
                "(d) Discuss the cultural relevance of Maslow's hierarchy in the Indian "
                "context, particularly the emphasis on belongingness needs in Indian families."
            ).format(city=city)
            answer_text = (
                "(a) For 70% of families with basic food and shelter, the most pressing "
                "need is Safety and Security needs (stable employment at 40%).\n\n"
                "(b) Unmet lower-level needs create a deficit that consumes cognitive and "
                "emotional resources. Families struggling with food insecurity cannot focus "
                "on social belonging or self-esteem. This creates a cycle where poverty "
                "perpetuates itself by blocking advancement.\n\n"
                "(c) Intervention program: Phase 1 - Ensure food security and basic needs "
                "through government scheme linkage. Phase 2 - Create employment "
                "opportunities and skill development. Phase 3 - Build community support "
                "groups to address belongingness. Phase 4 - Promote education and "
                "self-development activities.\n\n"
                "(d) Cultural relevance: Maslow's hierarchy has been criticized for being "
                "Western-centric. In India, belongingness needs (family, community) are "
                "often prioritized even before full safety needs are met. Indians may "
                "sacrifice personal safety for family welfare. The collectivist orientation "
                "means social needs are more fundamental than the model suggests."
            )
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_007",
                "topic": "Human Strength and Life Skills",
                "type": "long_answer",
                "question": _clean_string(q_text),
                "options": [],
                "answer": _clean_string(answer_text),
                "steps": [
                    "Analyze survey data in terms of Maslow's hierarchy.",
                    "Identify the most prevalent unmet need.",
                    "Design a multi-level intervention program.",
                    "Critically evaluate cultural applicability.",
                ],
                "explanation": _clean_string(
                    "Maslow's hierarchy, while influential, has been debated regarding its "
                    "universal applicability. Cross-cultural research shows varying need "
                    "priorities across societies."
                ),
                "difficulty": "Hard",
                "bloom_level": "Apply",
            })

        elif q_type == "mcq":
            need_levels = [
                ("Physiological Needs", "food, water, shelter, sleep", 1),
                ("Safety Needs", "security, stability, employment, health", 2),
                ("Love and Belongingness", "friendship, family, intimacy", 3),
                ("Esteem Needs", "self-respect, recognition, achievement", 4),
                ("Self-Actualization", "personal growth, fulfillment of potential", 5),
            ]
            level = rng.choice(need_levels)
            wrong_levels = [l for l in need_levels if l[0] != level[0]]
            opts = [level[0]] + rng.sample([l[0] for l in wrong_levels], 3)
            rng.shuffle(opts)

            question_forms = [
                "According to Maslow, which need level includes: {}?".format(level[1]),
                "Which level is at the top of Maslow's Hierarchy of Needs?",
                "In Maslow's hierarchy, {} needs must be met before pursuing higher needs."
                .format(level[0].split()[0]),
            ]
            q_text = rng.choice(question_forms)
            if "top" in q_text:
                answer = "Self-Actualization"
                opts = [l[0] for l in need_levels]
                rng.shuffle(opts)
            else:
                answer = level[0]

            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_007",
                "topic": "Human Strength and Life Skills",
                "type": "mcq",
                "question": _clean_string(q_text),
                "options": opts,
                "answer": answer,
                "steps": [
                    "Recall Maslow's five-level hierarchy of needs.",
                    "Match the described needs to the correct level.",
                    "Verify the correct level.",
                ],
                "explanation": _clean_string(
                    "Maslow's Hierarchy of Needs consists of five levels from basic "
                    "physiological needs at the bottom to self-actualization at the top. "
                    "Lower needs must be substantially satisfied before higher needs "
                    "become motivating."
                ),
                "difficulty": "Easy",
                "bloom_level": "Remember",
            })

        elif q_type == "fill":
            maslow_items = [
                ("The highest level of Maslow's hierarchy is ____ needs",
                 "self-actualization"),
                ("____ needs include food, water, and shelter",
                 "physiological"),
                ("The third level of Maslow's hierarchy is ____ needs",
                 "belongingness and love"),
                ("____ needs include respect and recognition from others",
                 "esteem"),
            ]
            item = rng.choice(maslow_items)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_007",
                "topic": "Human Strength and Life Skills",
                "type": "fill",
                "question": _clean_string(item[0]),
                "options": [],
                "answer": item[1],
                "steps": [
                    "Identify which level of Maslow's hierarchy is being described.",
                    "Recall the specific terminology for that level.",
                    "Fill in the blank accurately.",
                ],
                "explanation": _clean_string(
                    "Maslow's Hierarchy of Needs: Physiological (Level 1) -> Safety (Level 2) "
                    "-> Love/Belonging (Level 3) -> Esteem (Level 4) -> Self-Actualization (Level 5)."
                ),
                "difficulty": "Easy",
                "bloom_level": "Remember",
            })

        elif q_type == "short":
            q_text = (
                "Explain the difference between deficiency needs (D-needs) and growth needs "
                "(B-needs) in Maslow's theory. Give a real-world example from {city} of an "
                "individual who might be motivated by growth needs despite having unmet "
                "deficiency needs."
            ).format(city=city)
            answer_text = (
                "Deficiency needs (D-needs): Physiological, safety, love/belonging, and esteem. "
                "These arise from deprivation and must be met to avoid unpleasant feelings. "
                "They are 'deficit' needs.\n\n"
                "Growth needs (B-needs): Self-actualization and transcendence. These arise "
                "from the desire to grow and become more of what one is capable of. They "
                "are 'being' needs.\n\n"
                "Example: An artist from {} who struggles financially (unmet safety need) "
                "but continues to create art driven by the need for self-expression and "
                "personal growth. Despite economic hardship, the intrinsic motivation of "
                "creating meaningful work reflects growth motivation. This illustrates "
                "that growth needs can emerge even when deficiency needs are not fully met."
            ).format(city)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_007",
                "topic": "Human Strength and Life Skills",
                "type": "short_answer",
                "question": _clean_string(q_text),
                "options": [],
                "answer": _clean_string(answer_text),
                "steps": [
                    "Define deficiency needs and growth needs.",
                    "Distinguish between the two categories.",
                    "Provide a real-world example illustrating growth motivation.",
                ],
                "explanation": _clean_string(
                    "The D-needs vs B-needs distinction highlights the shift from "
                    "deficit-driven motivation to growth-driven motivation in "
                    "self-actualizing individuals."
                ),
                "difficulty": "Medium",
                "bloom_level": "Understand",
            })

    return questions


def gen_disorders_questions(rng, count):
    questions = []
    for _ in range(count):
        q_type = rng.choice(["mcq", "mcq", "fill", "short", "competency"])
        name = get_name(rng, rng.choice(["male", "female"]))
        age = rng.randint(15, 50)
        city = get_city(rng)

        if q_type == "competency":
            disorder_type = rng.choice(["anxiety", "depression", "ocd", "ptsd", "schizophrenia"])

            disorder_details = {
                "anxiety": {
                    "name": "Generalized Anxiety Disorder",
                    "symptoms": [
                        "excessive worry about multiple domains",
                        "restlessness and muscle tension",
                        "difficulty concentrating",
                        "sleep disturbances",
                        "irritability"
                    ],
                    "causes": ["genetic predisposition", "neurotransmitter imbalance",
                               "chronic stress", "personality factors"],
                    "treatment": ["CBT", "relaxation training", "medication",
                                  "mindfulness-based stress reduction"]
                },
                "depression": {
                    "name": "Major Depressive Disorder",
                    "symptoms": [
                        "persistent sadness and emptiness",
                        "loss of interest in activities",
                        "changes in appetite and sleep",
                        "fatigue and low energy",
                        "feelings of worthlessness"
                    ],
                    "causes": ["genetic factors", "neurochemical imbalance",
                               "early life trauma", "chronic stress", "social factors"],
                    "treatment": ["CBT", "Interpersonal Therapy", "antidepressant medication",
                                  "ECT in severe cases"]
                },
                "ocd": {
                    "name": "Obsessive-Compulsive Disorder",
                    "symptoms": [
                        "recurrent intrusive thoughts (obsessions)",
                        "repetitive behaviors (compulsions)",
                        "recognition that behavior is excessive",
                        "significant distress and impairment",
                        "time-consuming rituals"
                    ],
                    "causes": ["genetic factors", "serotonin dysfunction",
                               "environmental stressors", "learned behaviors"],
                    "treatment": ["Exposure and Response Prevention (ERP)",
                                  "SSRIs", "CBT", "habit reversal training"]
                },
                "ptsd": {
                    "name": "Post-Traumatic Stress Disorder",
                    "symptoms": [
                        "intrusive memories and flashbacks",
                        "avoidance of trauma reminders",
                        "negative alterations in cognition",
                        "hyperarousal and hypervigilance",
                        "emotional numbing"
                    ],
                    "causes": ["exposure to traumatic event",
                               "perceived life threat",
                               "lack of social support",
                               "pre-existing mental health conditions"],
                    "treatment": ["Trauma-focused CBT", "EMDR", "Prolonged Exposure",
                                  "SSRIs", "group therapy"]
                },
                "schizophrenia": {
                    "name": "Schizophrenia",
                    "symptoms": [
                        "positive symptoms: hallucinations, delusions",
                        "negative symptoms: flat affect, social withdrawal",
                        "disorganized speech and behavior",
                        "cognitive impairment",
                        "functional decline"
                    ],
                    "causes": ["genetic vulnerability", "dopamine hypothesis",
                               "prenatal factors", "cannabis use", "urban environment"],
                    "treatment": ["antipsychotic medication", "family therapy",
                                  "social skills training", "CBT", "rehabilitation"]
                },
            }
            detail = disorder_details[disorder_type]

            q_text = (
                "COMPETENCY-BASED: {name}, aged {age}, from {city}, has been experiencing "
                "{} for the past six months. {name} reports that these symptoms have "
                "significantly affected their work performance and social relationships. "
                "Family members have noticed changes in behavior but are unsure whether "
                "this is a psychological disorder or just stress.\n\n"
                "(a) Describe the key symptoms of {} that {name} might be experiencing.\n"
                "(b) Differentiate this condition from normal stress responses.\n"
                "(c) Identify potential etiological factors (causes) for this disorder.\n"
                "(d) Recommend evidence-based treatment approaches and discuss how "
                "a psychologist in {city} could help {name} and their family."
            ).format(
                detail["symptoms"][0], detail["name"],
                name=name, age=age, city=city
            )
            answer_text = (
                "(a) Key symptoms of {}:\n"
            ).format(detail["name"]) + "\n".join(
                "   - {}".format(s) for s in detail["symptoms"]
            ) + "\n\n" + (
                "(b) Normal stress vs disorder: Normal stress is proportionate to the "
                "stressor, temporary, and does not cause significant functional impairment. "
                "Psychological disorders involve symptoms that are disproportionate, persistent "
                "(more than 2 weeks), and cause significant impairment in social, occupational, "
                "or other important areas of functioning.\n\n"
                "(c) Etiological factors:\n"
            ) + "\n".join(
                "   - {}".format(c) for c in detail["causes"]
            ) + "\n\n" + (
                "(d) Treatment approaches:\n"
            ) + "\n".join(
                "   - {}".format(t) for t in detail["treatment"]
            ) + (
                "\n\nA psychologist in {} would conduct a thorough clinical assessment, "
                "develop a treatment plan, provide therapy, coordinate with psychiatrists "
                "if medication is needed, and offer family counseling to help the family "
                "understand and support {name}."
            ).format(city, name=name)

            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_008",
                "topic": "Psychological Disorders",
                "type": "long_answer",
                "question": _clean_string(q_text),
                "options": [],
                "answer": _clean_string(answer_text),
                "steps": [
                    "Identify the disorder and its characteristic symptoms.",
                    "Differentiate the disorder from normal stress.",
                    "Identify etiological factors.",
                    "Recommend evidence-based treatments.",
                ],
                "explanation": _clean_string(
                    "Understanding psychological disorders requires knowledge of symptoms, "
                    "causes, and treatments. Clinical psychologists use DSM-5 or ICD-11 "
                    "criteria for diagnosis and evidence-based interventions for treatment."
                ),
                "difficulty": "Hard",
                "bloom_level": "Analyse",
            })

        elif q_type == "mcq":
            disorders_symptoms = [
                {"disorder": "Generalized Anxiety Disorder", "symptom": "excessive, uncontrollable worry"},
                {"disorder": "Major Depressive Disorder", "symptom": "persistent sadness and anhedonia"},
                {"disorder": "Obsessive-Compulsive Disorder", "symptom": "obsessions and compulsions"},
                {"disorder": "Panic Disorder", "symptom": "recurrent panic attacks"},
                {"disorder": "Bipolar Disorder", "symptom": "alternating manic and depressive episodes"},
                {"disorder": "Schizophrenia", "symptom": "hallucinations and delusions"},
                {"disorder": "PTSD", "symptom": "re-experiencing of traumatic event"},
                {"disorder": "Dissociative Identity Disorder", "symptom": "multiple distinct identities"},
            ]
            disorder = rng.choice(disorders_symptoms)
            wrong_opts = [d["disorder"] for d in disorders_symptoms if d["disorder"] != disorder["disorder"]]
            opts = [disorder["disorder"]] + rng.sample(wrong_opts, 3)
            rng.shuffle(opts)

            q_text = (
                "A client presents with {}. "
                "Which psychological disorder is most likely?"
                .format(disorder["symptom"])
            )
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_008",
                "topic": "Psychological Disorders",
                "type": "mcq",
                "question": _clean_string(q_text),
                "options": opts,
                "answer": disorder["disorder"],
                "steps": [
                    "Identify the key symptom described in the question.",
                    "Match the symptom to the corresponding disorder.",
                    "Verify the diagnosis based on characteristic features.",
                ],
                "explanation": _clean_string(
                    "{} is primarily characterized by {}. "
                    "This distinguishes it from other disorders."
                    .format(disorder["disorder"], disorder["symptom"])
                ),
                "difficulty": "Medium",
                "bloom_level": "Apply",
            })

        elif q_type == "fill":
            disorder_items = [
                ("The disorder characterized by extreme mood swings between mania "
                 "and depression is called ____", "Bipolar Disorder"),
                ("A disorder involving recurrent, unwanted thoughts and repetitive "
                 "behaviors is called ____", "Obsessive-Compulsive Disorder"),
                ("The inability to recall important personal information, usually "
                 "of a stressful nature, is called ____", "Dissociative Amnesia"),
                ("A disorder in which a person has two or more distinct personality "
                 "states is called ____", "Dissociative Identity Disorder"),
            ]
            item = rng.choice(disorder_items)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_008",
                "topic": "Psychological Disorders",
                "type": "fill",
                "question": _clean_string(item[0]),
                "options": [],
                "answer": item[1],
                "steps": [
                    "Read the symptom description carefully.",
                    "Recall the disorder matching this symptom profile.",
                    "Fill in the blank accurately.",
                ],
                "explanation": _clean_string(
                    "{} is a recognized psychological disorder with specific diagnostic "
                    "criteria as outlined in classification systems."
                ).format(item[1]),
                "difficulty": "Medium",
                "bloom_level": "Remember",
            })

        elif q_type == "short":
            q_text = (
                "Explain the difference between Obsessive-Compulsive Disorder (OCD) and "
                "Obsessive-Compulsive Personality Disorder (OCPD). Use an example of "
                "a student from {city} to illustrate the difference."
            ).format(city=city)
            answer_text = (
                "OCD (Obsessive-Compulsive Disorder) is an anxiety disorder characterized "
                "by intrusive, unwanted thoughts (obsessions) and repetitive behaviors "
                "(compulsions) that the person recognizes as irrational but cannot control.\n\n"
                "OCPD (Obsessive-Compulsive Personality Disorder) is a personality "
                "disorder characterized by a pervasive pattern of preoccupation with "
                "orderliness, perfectionism, and control. The person does not see their "
                "behavior as problematic.\n\n"
                "Example: A student from {} who repeatedly washes hands (compulsion) "
                "to neutralize contamination fears (obsession) has OCD. A student who "
                "is excessively perfectionistic about organizing notes, cannot delegate "
                "tasks, and believes their way is the only right way has OCPD."
            ).format(city)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_008",
                "topic": "Psychological Disorders",
                "type": "short_answer",
                "question": _clean_string(q_text),
                "options": [],
                "answer": _clean_string(answer_text),
                "steps": [
                    "Define OCD and its key features.",
                    "Define OCPD and its key features.",
                    "Compare and contrast the two disorders.",
                    "Provide a clear example to illustrate the difference.",
                ],
                "explanation": _clean_string(
                    "OCD and OCPD are often confused but are distinct disorders. "
                    "OCD involves ego-dystonic behaviors (the person sees them as unwanted), "
                    "while OCPD involves ego-syntonic behaviors (the person sees them as appropriate)."
                ),
                "difficulty": "Medium",
                "bloom_level": "Analyse",
            })

    return questions


def gen_therapeutic_approaches_questions(rng, count):
    questions = []
    for _ in range(count):
        q_type = rng.choice(["mcq", "mcq", "fill", "short", "competency"])
        name = get_name(rng, rng.choice(["male", "female"]))
        age = rng.randint(18, 55)
        city = get_city(rng)

        if q_type == "competency":
            approach = rng.choice(["psychoanalysis", "CBT", "client-centered",
                                   "behavior_therapy", "cognitive_therapy"])
            client_issue = rng.choice([
                "social anxiety and fear of public speaking",
                "chronic procrastination affecting academic performance",
                "relationship conflicts with family members",
                "low self-esteem and self-critical thoughts",
                "sleep difficulties and racing thoughts",
            ])

            approach_details = {
                "psychoanalysis": {
                    "founder": "Sigmund Freud",
                    "key_concepts": ["unconscious mind", "defense mechanisms",
                                     "free association", "dream analysis",
                                     "transference"],
                    "techniques": "free association, dream interpretation, analysis of "
                                  "resistance and transference",
                    "duration": "long-term (several years)",
                    "suitable_for": "deep-seated personality issues and unresolved "
                                    "childhood conflicts"
                },
                "CBT": {
                    "founder": "Aaron Beck",
                    "key_concepts": ["cognitive distortions", "automatic thoughts",
                                     "schema", "behavioral experiments",
                                     "homework assignments"],
                    "techniques": "identifying and challenging cognitive distortions, "
                                  "behavioral experiments, thought records",
                    "duration": "short to medium-term (12-20 sessions)",
                    "suitable_for": "depression, anxiety, phobias, and other disorders "
                                    "with identifiable thought patterns"
                },
                "client_centered": {
                    "founder": "Carl Rogers",
                    "key_concepts": ["unconditional positive regard",
                                     "empathy", "congruence/genuineness",
                                     "self-actualizing tendency",
                                     "conditions of worth"],
                    "techniques": "active listening, reflection of feelings, "
                                  "non-directive approach, creating safe environment",
                    "duration": "medium to long-term",
                    "suitable_for": "personal growth, self-exploration, and mild "
                                    "psychological difficulties"
                },
                "behavior_therapy": {
                    "founder": "B.F. Skinner, Joseph Wolpe",
                    "key_concepts": ["classical conditioning", "operant conditioning",
                                     "systematic desensitization",
                                     "aversive conditioning", "modeling"],
                    "techniques": "systematic desensitization, exposure therapy, "
                                  "behavior modification, token economy",
                    "duration": "short-term",
                    "suitable_for": "phobias, OCD, behavioral problems, habits"
                },
                "cognitive_therapy": {
                    "founder": "Aaron Beck",
                    "key_concepts": ["cognitive triad", "automatic thoughts",
                                     "underlying assumptions", "schema",
                                     "downward arrow technique"],
                    "techniques": "Socratic questioning, thought records, "
                                  "behavioral experiments, cognitive restructuring",
                    "duration": "short to medium-term (15-25 sessions)",
                    "suitable_for": "depression, anxiety disorders, eating disorders"
                },
            }
            detail = approach_details[approach]

            q_text = (
                "COMPETENCY-BASED: {name}, aged {age}, from {city}, is seeking therapy "
                "for {issue}. As a clinical psychologist, you need to recommend the most "
                "appropriate therapeutic approach.\n\n"
                "(a) Explain the key principles of {} therapy, including its founder, "
                "core concepts, and primary techniques.\n"
                "(b) Justify why this approach is suitable for {name}'s condition, "
                "referencing the approach's key features.\n"
                "(c) Describe what a typical therapy session might look like.\n"
                "(d) What alternative approaches could also be considered? "
                "Compare them briefly.\n"
                "(e) Discuss ethical considerations in providing therapy to {name}, "
                "including informed consent, confidentiality, and cultural sensitivity "
                "in the Indian context."
            ).format(issue=client_issue, name=name, age=age, city=city,
                     approach=detail["founder"].split()[0] + "'s")

            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_009",
                "topic": "Therapeutic Approaches",
                "type": "long_answer",
                "question": _clean_string(q_text),
                "options": [],
                "answer": _clean_string(
                    "(a) Key principles of {} therapy: Founded by {}. "
                    "Core concepts: {}. Techniques: {}. "
                    "Duration: {}.\n\n"
                    "(b) Suitability: {} is particularly effective for {} "
                    "because it {}. Research supports its effectiveness for "
                    "this type of presenting problem.\n\n"
                    "(c) Typical session: The therapist would begin with a check-in, "
                    "then work on the specific technique (e.g., identifying cognitive "
                    "distortions for CBT), assign homework, and provide collaborative "
                    "feedback.\n\n"
                    "(d) Alternative: CBT could be an effective alternative with "
                    "stronger empirical support. Client-centered therapy could provide "
                    "a supportive environment. A combined approach may be most effective.\n\n"
                    "(e) Ethics: Informed consent involves explaining the approach, "
                    "duration, costs, and potential risks. Confidentiality must be "
                    "maintained except when there is danger to self or others. Cultural "
                    "sensitivity in India requires understanding family dynamics, "
                    "collectivist values, and potential stigma around mental health."
                ).format(
                    detail["founder"].split()[0] + "'s",
                    detail["founder"],
                    ", ".join(detail["key_concepts"]),
                    detail["techniques"],
                    detail["duration"],
                    detail["founder"].split()[0] + "'s approach",
                    client_issue,
                    detail["suitable_for"].lower()
                ),
                "steps": [
                    "Explain the therapeutic approach's principles.",
                    "Justify suitability for the client's condition.",
                    "Describe a typical therapy session.",
                    "Compare alternative approaches.",
                    "Discuss ethical considerations.",
                ],
                "explanation": _clean_string(
                    "Therapeutic approaches differ in their theoretical foundations, "
                    "techniques, and suitability for different disorders. Choosing the "
                    "right approach requires matching the client's needs with the "
                    "approach's strengths."
                ),
                "difficulty": "Hard",
                "bloom_level": "Apply",
            })

        elif q_type == "mcq":
            therapy_facts = [
                {
                    "question": (
                        "In client-centered therapy developed by Carl Rogers, "
                        "which of the following is NOT considered a necessary condition "
                        "for therapeutic change?"
                    ),
                    "options": [
                        "Unconditional Positive Regard",
                        "Empathy",
                        "Interpretation of Dreams",
                        "Congruence",
                    ],
                    "answer": "Interpretation of Dreams",
                    "explanation": "Carl Rogers identified three necessary conditions for "
                                   "therapeutic change: unconditional positive regard, "
                                   "empathy, and congruence. Dream interpretation is a "
                                   "technique from psychoanalysis, not client-centered therapy."
                },
                {
                    "question": (
                        "Which therapeutic approach focuses on identifying and challenging "
                        "cognitive distortions as a primary technique?"
                    ),
                    "options": [
                        "Psychoanalysis",
                        "Cognitive Behavioral Therapy",
                        "Client-Centered Therapy",
                        "Gestalt Therapy",
                    ],
                    "answer": "Cognitive Behavioral Therapy",
                    "explanation": "CBT focuses on identifying, challenging, and modifying "
                                   "dysfunctional thought patterns (cognitive distortions) "
                                   "to change emotional and behavioral responses."
                },
                {
                    "question": (
                        "The technique of systematic desensitization is primarily associated "
                        "with which therapeutic approach?"
                    ),
                    "options": [
                        "Cognitive Therapy",
                        "Psychoanalysis",
                        "Behavior Therapy",
                        "Humanistic Therapy",
                    ],
                    "answer": "Behavior Therapy",
                    "explanation": "Systematic desensitization was developed by Joseph Wolpe "
                                   "and is a core technique of behavior therapy, based on the "
                                   "principle of reciprocal inhibition."
                },
                {
                    "question": (
                        "According to Ellis's Rational Emotive Behavior Therapy (REBT), "
                        "what does the 'B' in the ABC model stand for?"
                    ),
                    "options": [
                        "Behavior",
                        "Beliefs",
                        "Balance",
                        "Biological factors",
                    ],
                    "answer": "Beliefs",
                    "explanation": "In REBT's ABC model: A = Activating event, "
                                   "B = Beliefs about the event, C = Consequences "
                                   "(emotional and behavioral). The core premise is that "
                                   "it is not the event (A) but the belief (B) that "
                                   "causes emotional consequences (C)."
                },
            ]
            fact = rng.choice(therapy_facts)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_009",
                "topic": "Therapeutic Approaches",
                "type": "mcq",
                "question": _clean_string(fact["question"]),
                "options": fact["options"],
                "answer": fact["answer"],
                "steps": [
                    "Identify the therapeutic approach being referenced.",
                    "Recall the specific technique or concept mentioned.",
                    "Match with the correct answer.",
                ],
                "explanation": _clean_string(fact["explanation"]),
                "difficulty": "Medium",
                "bloom_level": "Remember",
            })

        elif q_type == "fill":
            therapy_items = [
                ("In psychoanalysis, the technique where clients say whatever comes to "
                 "mind without censoring is called ____", "free association"),
                ("The founder of Rational Emotive Behavior Therapy (REBT) is ____",
                 "Albert Ellis"),
                ("In CBT, irrational thoughts that lead to emotional distress are called "
                 "____", "cognitive distortions"),
                ("The therapeutic approach that emphasizes unconditional positive regard "
                 "was developed by ____", "Carl Rogers"),
            ]
            item = rng.choice(therapy_items)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_009",
                "topic": "Therapeutic Approaches",
                "type": "fill",
                "question": _clean_string(item[0]),
                "options": [],
                "answer": item[1],
                "steps": [
                    "Identify the therapeutic concept or technique described.",
                    "Recall the correct terminology.",
                    "Fill in the blank accurately.",
                ],
                "explanation": _clean_string(
                    "This is a fundamental concept in the field of psychological therapies."
                ),
                "difficulty": "Easy",
                "bloom_level": "Remember",
            })

        elif q_type == "short":
            approaches = [
                ("Psychoanalysis",
                 "Sigmund Freud",
                 ["unconscious processes", "early childhood experiences",
                  "defense mechanisms", "dream analysis", "free association"],
                 "long-term"),
                ("Cognitive Behavioral Therapy",
                 "Aaron Beck",
                 ["identifying cognitive distortions", "changing thought patterns",
                  "behavioral experiments", "homework assignments", "collaborative empiricism"],
                 "short to medium-term"),
                ("Client-Centered Therapy",
                 "Carl Rogers",
                 ["unconditional positive regard", "empathy",
                  "therapist congruence", "non-directive approach", "self-actualization"],
                 "medium to long-term"),
            ]
            approach = rng.choice(approaches)
            q_text = (
                "Describe the key features of {therapy}, including its founder, "
                "core assumptions, primary techniques, and typical duration. "
                "How would this approach help a student from {city} who is "
                "struggling with exam anxiety?"
            ).format(therapy=approach[0], city=city)
            answer_text = (
                "{}:\n"
                "Founder: {}\n"
                "Core assumptions: {}\n"
                "Techniques: {}\n"
                "Duration: {}\n\n"
                "For a student from {} with exam anxiety: "
                "This approach would help by addressing the underlying causes of "
                "anxiety through its techniques, providing a supportive therapeutic "
                "relationship, and helping the student develop coping strategies."
            ).format(
                approach[0], approach[1],
                ", ".join(approach[2][:2]),
                ", ".join(approach[2][2:]),
                approach[3],
                city,
            )
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_009",
                "topic": "Therapeutic Approaches",
                "type": "short_answer",
                "question": _clean_string(q_text),
                "options": [],
                "answer": _clean_string(answer_text),
                "steps": [
                    "Identify the key features of the therapeutic approach.",
                    "List the founder, assumptions, techniques, and duration.",
                    "Apply the approach to a practical scenario.",
                ],
                "explanation": _clean_string(
                    "Each therapeutic approach has unique features that make it more or "
                    "less suitable for different types of problems and client populations."
                ),
                "difficulty": "Medium",
                "bloom_level": "Understand",
            })

    return questions


def gen_cbt_rebt_questions(rng, count):
    questions = []
    for _ in range(count):
        q_type = rng.choice(["mcq", "mcq", "fill", "short", "competency"])
        name = get_name(rng, rng.choice(["male", "female"]))
        city = get_city(rng)

        if q_type == "competency":
            q_text = (
                "COMPETENCY-BASED: {name}, a 22-year-old college student in {city}, is "
                "experiencing depression and says: 'I failed my exam. I am a total failure. "
                "I will never succeed in life. Everything I do turns out wrong.'\n\n"
                "(a) Apply Ellis's ABC model to analyze {name}'s situation. "
                "Identify the Activating event, Beliefs, and Consequences.\n"
                "(b) Identify the specific cognitive distortions present in {name}'s thinking.\n"
                "(c) Using Beck's Cognitive Therapy approach, propose specific techniques "
                "to help {name} restructure these thoughts.\n"
                "(d) Design a thought record worksheet that {name} could use to track "
                "and challenge negative thoughts.\n"
                "(e) Discuss how cultural factors in the Indian context might influence "
                "{name}'s cognitive distortions (e.g., family expectations, academic pressure)."
            ).format(name=name, city=city)
            answer_text = (
                "(a) ABC Model Analysis:\n"
                "A (Activating Event): Failed an exam.\n"
                "B (Beliefs): 'I am a total failure. I will never succeed. "
                "Everything I do is wrong.' (irrational beliefs)\n"
                "C (Consequences): Depression, hopelessness, low self-esteem.\n\n"
                "(b) Cognitive Distortions:\n"
                "- All-or-nothing thinking: 'I am a total failure'\n"
                "- Overgeneralization: 'Everything turns out wrong'\n"
                "- Catastrophizing: 'I will never succeed'\n"
                "- Mental filter: Focusing only on the failure\n\n"
                "(c) Cognitive Restructuring Techniques:\n"
                "- Socratic questioning: 'Is there evidence that you always fail?'\n"
                "- Examining evidence for and against the belief\n"
                "- Decatastrophizing: 'What if you fail again? What would that mean?'\n"
                "- Generating alternative, balanced thoughts\n\n"
                "(d) Thought Record:\n"
                "Situation | Automatic Thought | Emotion (0-100) | Evidence For | "
                "Evidence Against | Balanced Thought | New Emotion\n\n"
                "(e) Cultural factors: High family expectations in India can amplify "
                "the impact of academic failures. Collectivist culture means failure "
                "is experienced as family shame. Perfectionism is often reinforced by "
                "parental pressure. Fear of disappointing family can intensify cognitive "
                "distortions."
            )
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_010",
                "topic": "Therapeutic Approaches",
                "type": "long_answer",
                "question": _clean_string(q_text),
                "options": [],
                "answer": _clean_string(answer_text),
                "steps": [
                    "Apply ABC model to analyze the scenario.",
                    "Identify specific cognitive distortions.",
                    "Propose CBT restructuring techniques.",
                    "Design a practical thought record tool.",
                    "Analyze cultural influences on cognition.",
                ],
                "explanation": _clean_string(
                    "Cognitive distortions are irrational thought patterns that contribute "
                    "to emotional distress. CBT is one of the most evidence-based therapies "
                    "for depression and anxiety."
                ),
                "difficulty": "Hard",
                "bloom_level": "Apply",
            })

        elif q_type == "mcq":
            distortions = [
                {"distortion": "All-or-Nothing Thinking",
                 "example": "If I am not perfect, I am a complete failure"},
                {"distortion": "Overgeneralization",
                 "example": "This one rejection means no one will ever like me"},
                {"distortion": "Mental Filter",
                 "example": "Focusing only on the one critical comment despite many positives"},
                {"distortion": "Disqualifying the Positive",
                 "example": "Dismissing achievements as 'just luck'"},
                {"distortion": "Jumping to Conclusions",
                 "example": "Assuming someone is angry without evidence"},
                {"distortion": "Catastrophizing",
                 "example": "If I make a mistake, my career is over"},
                {"distortion": "Emotional Reasoning",
                 "example": "I feel stupid, so I must be stupid"},
                {"distortion": "Should Statements",
                 "example": "I should always be productive and never relax"},
            ]
            dist = rng.choice(distortions)
            wrong_opts = [d["distortion"] for d in distortions if d["distortion"] != dist["distortion"]]
            opts = [dist["distortion"]] + rng.sample(wrong_opts, 3)
            rng.shuffle(opts)

            q_text = (
                "A student thinks: '{}' "
                "Which cognitive distortion does this represent?"
                .format(dist["example"])
            )
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_010",
                "topic": "Therapeutic Approaches",
                "type": "mcq",
                "question": _clean_string(q_text),
                "options": opts,
                "answer": dist["distortion"],
                "steps": [
                    "Identify the thought pattern in the example.",
                    "Match it to the corresponding cognitive distortion.",
                    "Verify the match.",
                ],
                "explanation": _clean_string(
                    "{} is characterized by: {}. "
                    "This is a common cognitive distortion in depression and anxiety."
                ).format(dist["distortion"], dist["example"]),
                "difficulty": "Medium",
                "bloom_level": "Apply",
            })

        elif q_type == "fill":
            rebt_items = [
                ("In the ABC model of REBT, 'A' stands for ____ event",
                 "Activating"),
                ("The founder of Rational Emotive Behavior Therapy is ____",
                 "Albert Ellis"),
                ("In CBT, dysfunctional thought patterns are called ____ distortions",
                 "cognitive"),
                ("The 'D' in the expanded ABCDE model stands for ____",
                 "Dispute"),
            ]
            item = rng.choice(rebt_items)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_010",
                "topic": "Therapeutic Approaches",
                "type": "fill",
                "question": _clean_string(item[0]),
                "options": [],
                "answer": item[1],
                "steps": [
                    "Identify the concept being tested.",
                    "Recall the correct term from CBT/REBT framework.",
                    "Fill in the blank.",
                ],
                "explanation": _clean_string(
                    "The ABCDE model of REBT: A=Activating event, B=Beliefs, "
                    "C=Consequences, D=Dispute, E=Effect."
                ),
                "difficulty": "Easy",
                "bloom_level": "Remember",
            })

        elif q_type == "short":
            q_text = (
                "Explain how homework assignments are used in Cognitive Behavioral Therapy. "
                "Give three specific examples of homework assignments that could be given "
                "to a client with social anxiety in {city}. "
                "Explain the purpose of each assignment."
            ).format(city=city)
            answer_text = (
                "Homework assignments in CBT are tasks assigned between therapy sessions "
                "to reinforce learning, practice new skills, and promote self-monitoring. "
                "They are crucial for the effectiveness of CBT as they help clients apply "
                "therapeutic insights to real-life situations.\n\n"
                "Three examples for social anxiety:\n"
                "1. Thought Record: Record anxious situations, automatic thoughts, "
                "and rate anxiety levels. Purpose: Identify patterns in anxious thinking.\n"
                "2. Behavioral Experiment: Attend a social event and test the prediction "
                "'People will judge me negatively.' Purpose: Gather disconfirming evidence "
                "for catastrophic predictions.\n"
                "3. Graded Exposure: Start with low-anxiety social situations and "
                "gradually progress to more challenging ones. Purpose: Reduce avoidance "
                "and build confidence through repeated positive experiences.\n\n"
                "In {}, these assignments can be adapted to local cultural contexts, "
                "such as practicing social skills at family gatherings or community events."
            ).format(city)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_010",
                "topic": "Therapeutic Approaches",
                "type": "short_answer",
                "question": _clean_string(q_text),
                "options": [],
                "answer": _clean_string(answer_text),
                "steps": [
                    "Explain the role of homework in CBT.",
                    "List three specific homework types.",
                    "Explain the purpose of each.",
                ],
                "explanation": _clean_string(
                    "Homework is a key feature of CBT that distinguishes it from "
                    "insight-oriented therapies. It makes therapy an active, "
                    "collaborative process."
                ),
                "difficulty": "Medium",
                "bloom_level": "Apply",
            })

    return questions


def gen_attitude_questions(rng, count):
    questions = []
    for _ in range(count):
        q_type = rng.choice(["mcq", "mcq", "fill", "short", "competency"])
        name = get_name(rng, rng.choice(["male", "female"]))
        city = get_city(rng)

        if q_type == "competency":
            q_text = (
                "COMPETENCY-BASED: A social psychology researcher in {city} conducted a study "
                "on attitudes toward environmental conservation among 500 residents. The study "
                "found that 60% of respondents expressed positive attitudes toward recycling "
                "but only 20% actually recycled regularly. {name}, one of the participants, "
                "said: 'I care about the environment, but I am too busy to sort my waste.'\n\n"
                "(a) Define attitude and its three components (ABC model). How does "
                "{name}'s statement illustrate the difference between attitude and behavior?\n"
                "(b) What factors might explain the attitude-behavior gap observed in the study?\n"
                "(c) How could cognitive dissonance theory explain this inconsistency?\n"
                "(d) Design a persuasion campaign using the Elaboration Likelihood Model "
                "(ELM) to encourage recycling in {city}. Specify which route (central or "
                "peripheral) you would use and why.\n"
                "(e) How might the foot-in-the-door technique be used to increase "
                "recycling behavior in this community?"
            ).format(name=name, city=city)
            answer_text = (
                "(a) Attitude ABC Model:\n"
                "- Affective: feelings toward the object (I feel good about recycling)\n"
                "- Behavioral: tendency to act (I recycle regularly)\n"
                "- Cognitive: beliefs about the object (Recycling is good for environment)\n"
                "{name}'s statement shows a positive cognitive and affective component "
                "(caring about environment) but weak behavioral component (not recycling). "
                "This illustrates the attitude-behavior gap.\n\n"
                "(b) Attitude-behavior gap factors: (1) Lack of infrastructure "
                "(no recycling bins), (2) Time constraints, (3) Low perceived "
                "behavioral control, (4) Habit and convenience, (5) Social norms "
                "(others don't recycle), (6) Distance between attitude and behavior.\n\n"
                "(c) Cognitive dissonance: {name} experiences dissonance between "
                "positive environmental attitude and non-recycling behavior. To reduce "
                "dissonance, {name} might: (1) Change behavior (start recycling), "
                "(2) Change attitude ('recycling is not that important'), or "
                "(3) Add consonant cognition ('I support environmental causes in other ways').\n\n"
                "(d) ELM-based campaign: For a community with moderate involvement in "
                "environmental issues, use both routes. Central route: Provide detailed "
                "information about environmental impact, statistics, and scientific "
                "evidence. Peripheral route: Use attractive visuals, celebrity "
                "endorsements, and social proof (neighbors who recycle).\n\n"
                "(e) Foot-in-the-door: Start with small requests ('Can you separate "
                "plastic bottles?') and gradually increase ('Can you compost kitchen "
                "waste?'). Small initial commitments create a self-perception of being "
                "an environmentally conscious person, leading to larger commitments."
            ).format(name=name)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_011",
                "topic": "Attitude and Social Cognition",
                "type": "long_answer",
                "question": _clean_string(q_text),
                "options": [],
                "answer": _clean_string(answer_text),
                "steps": [
                    "Explain the attitude ABC model.",
                    "Analyze the attitude-behavior gap.",
                    "Apply cognitive dissonance theory.",
                    "Design an ELM-based persuasion campaign.",
                    "Propose foot-in-the-door strategy.",
                ],
                "explanation": _clean_string(
                    "Attitudes are evaluations of objects, people, or ideas that influence "
                    "behavior but do not always predict it perfectly. Understanding attitude "
                    "structure and change is key to social psychology."
                ),
                "difficulty": "Hard",
                "bloom_level": "Apply",
            })

        elif q_type == "mcq":
            attitude_items = [
                {
                    "question": (
                        "According to the ABC model of attitude, the component that involves "
                        "feelings and emotions about an object is called:"
                    ),
                    "options": ["Affective component", "Behavioral component",
                                "Cognitive component", "Conative component"],
                    "answer": "Affective component",
                },
                {
                    "question": (
                        "Cognitive dissonance occurs when there is inconsistency between:"
                    ),
                    "options": [
                        "Two different attitudes",
                        "Attitude and behavior",
                        "Two different behaviors",
                        "Belief and perception",
                    ],
                    "answer": "Attitude and behavior",
                },
                {
                    "question": (
                        "The Elaboration Likelihood Model (ELM) proposes two routes to "
                        "persuasion: the central route and the _____ route."
                    ),
                    "options": ["Peripheral", "Lateral", "Secondary", "Direct"],
                    "answer": "Peripheral",
                },
                {
                    "question": (
                        "Which persuasion technique involves making a small request first, "
                        "followed by a larger request?"
                    ),
                    "options": ["Foot-in-the-door", "Door-in-the-face",
                                "Low-ball", "That's-not-all"],
                    "answer": "Foot-in-the-door",
                },
            ]
            item = rng.choice(attitude_items)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_011",
                "topic": "Attitude and Social Cognition",
                "type": "mcq",
                "question": _clean_string(item["question"]),
                "options": item["options"],
                "answer": item["answer"],
                "steps": [
                    "Identify the concept being tested.",
                    "Recall the relevant theory or model.",
                    "Match with the correct answer.",
                ],
                "explanation": _clean_string(
                    "The {} is correct. This concept is fundamental to understanding "
                    "attitudes and persuasion in social psychology."
                ).format(item["answer"]),
                "difficulty": "Medium",
                "bloom_level": "Remember",
            })

        elif q_type == "fill":
            attitude_fills = [
                ("The three components of attitude (Affective, Behavioral, Cognitive) "
                 "together form the ____ model", "ABC"),
                ("____ theory states that inconsistency between attitudes and behavior "
                 "creates psychological discomfort", "Cognitive Dissonance"),
                ("The technique where a small request is followed by a larger one is "
                 "called the ____ technique", "foot-in-the-door"),
            ]
            item = rng.choice(attitude_fills)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_011",
                "topic": "Attitude and Social Cognition",
                "type": "fill",
                "question": _clean_string(item[0]),
                "options": [],
                "answer": item[1],
                "steps": [
                    "Identify the concept being described.",
                    "Recall the correct terminology.",
                    "Fill in the blank.",
                ],
                "explanation": _clean_string(
                    "Attitudes are composed of three components: Affective (feelings), "
                    "Behavioral (tendency to act), and Cognitive (beliefs)."
                ),
                "difficulty": "Easy",
                "bloom_level": "Remember",
            })

        elif q_type == "short":
            q_text = (
                "Explain the factors that influence attitude formation and change. "
                "Using the example of attitudes toward mental health in {city}, "
                "discuss how persuasion, social norms, and personal experience "
                "might shape community attitudes."
            ).format(city=city)
            answer_text = (
                "Attitude formation factors: (1) Learning (classical conditioning, "
                "operant conditioning, observational learning), (2) Socialization "
                "(family, peers, media), (3) Personal experience, (4) Genetics and "
                "temperament.\n\n"
                "Attitude change factors: (1) Source characteristics (credibility, "
                "attractiveness), (2) Message characteristics (quality, emotional appeal), "
                "(3) Target characteristics (intelligence, self-esteem), (4) Route of "
                "processing (central vs. peripheral).\n\n"
                "Example - Mental health attitudes in {}:\n"
                "- Persuasion: Mental health awareness campaigns using credible local "
                "figures (doctors, teachers) can change attitudes through central route.\n"
                "- Social norms: If community leaders and family members express positive "
                "attitudes toward seeking psychological help, others will follow.\n"
                "- Personal experience: Positive experiences with counseling can "
                "fundamentally shift negative attitudes.\n"
                "Stigma in India often stems from lack of awareness and cultural beliefs "
                "that equate mental illness with weakness or supernatural causes."
            ).format(city)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_011",
                "topic": "Attitude and Social Cognition",
                "type": "short_answer",
                "question": _clean_string(q_text),
                "options": [],
                "answer": _clean_string(answer_text),
                "steps": [
                    "List factors influencing attitude formation.",
                    "List factors influencing attitude change.",
                    "Apply both sets of factors to the mental health context.",
                ],
                "explanation": _clean_string(
                    "Attitudes are shaped by multiple factors and can be changed through "
                    "targeted persuasion efforts. Understanding these processes is crucial "
                    "for health communication and social change."
                ),
                "difficulty": "Medium",
                "bloom_level": "Apply",
            })

    return questions


def gen_prejudice_questions(rng, count):
    questions = []
    for _ in range(count):
        q_type = rng.choice(["mcq", "mcq", "fill", "short", "competency"])
        name = get_name(rng, rng.choice(["male", "female"]))
        city = get_city(rng)

        if q_type == "competency":
            conflict_type = rng.choice([
                "caste-based", "religious", "gender-based", "linguistic", "regional"
            ])

            q_text = (
                "COMPETENCY-BASED: {name}, a student from {city}, reports experiencing "
                "discrimination at college because of {conflict_type} identity. "
                "Other students avoid interacting with {name}, make derogatory remarks, "
                "and exclude {name} from group activities. {name} feels isolated, "
                "anxious, and has started questioning {name_possessive} self-worth.\n\n"
                "(a) Define prejudice, stereotype, and discrimination. How does each "
                "manifest in {name}'s situation?\n"
                "(b) Using Social Identity Theory, explain the ingroup-outgroup dynamics "
                "at play in this scenario.\n"
                "(c) Apply the scapegoat theory to explain how prejudice might develop "
                "in this college environment.\n"
                "(d) Propose THREE strategies for prejudice reduction that could be "
                "implemented at the college level in {city}.\n"
                "(e) Discuss the psychological impact of prolonged prejudice and "
                "discrimination on {name_possessive} mental health."
            ).format(
                name=name, city=city,
                conflict_type=conflict_type,
                name_possessive=name + "'s",
            )
            answer_text = (
                "(a) Definitions:\n"
                "- Prejudice: Negative attitude toward a group and its members.\n"
                "- Stereotype: Generalized belief about a group's characteristics.\n"
                "- Discrimination: Unfair behavior toward group members.\n"
                "In {name}'s situation: Others hold negative attitudes (prejudice) "
                "about {name}'s {conflict_type} group, apply generalized negative "
                "beliefs (stereotypes), and act unfairly by excluding {name} "
                "(discrimination).\n\n"
                "(b) Social Identity Theory: Students categorize themselves into "
                "'ingroup' (those sharing their {conflict_type} identity) and "
                "define {name} as 'outgroup.' They enhance their self-esteem by "
                "favoring the ingroup and derogating the outgroup. This creates "
                "intergroup bias and conflict.\n\n"
                "(c) Scapegoat Theory: When the dominant group faces frustration "
                "(academic pressure, competition), they displace aggression onto a "
                "minority or less powerful group ({name}'s group). {name} becomes "
                "a convenient target for collective frustration.\n\n"
                "(d) Prejudice reduction strategies:\n"
                "1. Intergroup Contact: Structured cooperative activities under equal "
                "status conditions can reduce prejudice (Contact Hypothesis).\n"
                "2. Education: Workshops on diversity and inclusion to challenge "
                "stereotypes and increase awareness.\n"
                "3. Superordinate Goals: Create shared projects requiring cooperation "
                "across group lines.\n\n"
                "(e) Psychological impact: Chronic exposure to prejudice can lead to "
                "depression, anxiety, reduced self-esteem, identity confusion, academic "
                "underperformance, social withdrawal, and long-term mental health issues. "
                "The stress of discrimination activates the fight-or-flight response "
                "chronically, which can have physical health consequences too."
            ).format(name=name, conflict_type=conflict_type)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_012",
                "topic": "Attitude and Social Cognition",
                "type": "long_answer",
                "question": _clean_string(q_text),
                "options": [],
                "answer": _clean_string(answer_text),
                "steps": [
                    "Define key concepts: prejudice, stereotype, discrimination.",
                    "Apply Social Identity Theory.",
                    "Apply scapegoat theory.",
                    "Propose prejudice reduction strategies.",
                    "Analyze psychological impact.",
                ],
                "explanation": _clean_string(
                    "Prejudice and discrimination are significant social problems. "
                    "Understanding their psychological roots is essential for developing "
                    "effective interventions."
                ),
                "difficulty": "Hard",
                "bloom_level": "Analyse",
            })

        elif q_type == "mcq":
            prejudice_items = [
                {
                    "question": (
                        "According to Social Identity Theory, people tend to favor their "
                        "own group (ingroup) over other groups (outgroup) in order to:"
                    ),
                    "options": [
                        "Enhance their self-esteem",
                        "Reduce cognitive dissonance",
                        "Avoid discrimination",
                        "Increase cooperation",
                    ],
                    "answer": "Enhance their self-esteem",
                },
                {
                    "question": (
                        "Which theory explains prejudice as a result of displacing "
                        "frustration onto a less powerful group?"
                    ),
                    "options": [
                        "Social Identity Theory",
                        "Scapegoat Theory",
                        "Contact Hypothesis",
                        "Cognitive Dissonance Theory",
                    ],
                    "answer": "Scapegoat Theory",
                },
                {
                    "question": (
                        "The Contact Hypothesis suggests that intergroup prejudice can be "
                        "reduced when:"
                    ),
                    "options": [
                        "Groups compete for the same resources",
                        "Groups have equal status and common goals",
                        "Groups are segregated but aware of each other",
                        "Groups are led by strong authority figures",
                    ],
                    "answer": "Groups have equal status and common goals",
                },
            ]
            item = rng.choice(prejudice_items)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_012",
                "topic": "Attitude and Social Cognition",
                "type": "mcq",
                "question": _clean_string(item["question"]),
                "options": item["options"],
                "answer": item["answer"],
                "steps": [
                    "Identify the theory being referenced.",
                    "Recall the key proposition of that theory.",
                    "Match with the correct option.",
                ],
                "explanation": _clean_string(
                    "{}: This is the correct answer based on the theory's core principles."
                ).format(item["answer"]),
                "difficulty": "Medium",
                "bloom_level": "Understand",
            })

        elif q_type == "fill":
            prejudice_fills = [
                ("A generalized belief about a group's characteristics is called a ____",
                 "stereotype"),
                ("The tendency to favor one's own group over others is called ____ bias",
                 "ingroup"),
                ("____ theory explains prejudice as displaced frustration",
                 "Scapegoat"),
                ("The Contact Hypothesis was proposed by ____",
                 "Gordon Allport"),
            ]
            item = rng.choice(prejudice_fills)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_012",
                "topic": "Attitude and Social Cognition",
                "type": "fill",
                "question": _clean_string(item[0]),
                "options": [],
                "answer": item[1],
                "steps": [
                    "Identify the concept being described.",
                    "Recall the correct terminology.",
                    "Fill in the blank.",
                ],
                "explanation": _clean_string(
                    "Understanding prejudice, stereotypes, and discrimination is "
                    "essential for addressing intergroup conflict."
                ),
                "difficulty": "Easy",
                "bloom_level": "Remember",
            })

        elif q_type == "short":
            q_text = (
                "Differentiate between prejudice and discrimination. "
                "Using the context of gender-based discrimination in the workplace in {city}, "
                "illustrate how stereotypes can lead to discriminatory practices. "
                "What strategies can organizations use to reduce gender-based prejudice?"
            ).format(city=city)
            answer_text = (
                "Prejudice is a negative attitude or feeling toward a group. "
                "Discrimination is the unfair behavior directed at group members. "
                "Prejudice is an internal attitude; discrimination is external behavior.\n\n"
                "Example - Gender stereotypes: The stereotype that 'women are less "
                "capable of leadership' can lead to discrimination in hiring, promotion, "
                "and pay decisions in {city} workplaces.\n\n"
                "Reduction strategies:\n"
                "1. Blind recruitment: Remove gender identifiers from resumes.\n"
                "2. Diversity training: Educate employees about unconscious bias.\n"
                "3. Equal opportunity policies: Implement and enforce anti-discrimination policies.\n"
                "4. Mentorship programs: Support women's career advancement.\n"
                "5. Role models: Promote women leaders to challenge stereotypes."
            ).format(city)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_012",
                "topic": "Attitude and Social Cognition",
                "type": "short_answer",
                "question": _clean_string(q_text),
                "options": [],
                "answer": _clean_string(answer_text),
                "steps": [
                    "Define prejudice and discrimination.",
                    "Explain how stereotypes link to discrimination.",
                    "Provide concrete examples.",
                    "Propose evidence-based reduction strategies.",
                ],
                "explanation": _clean_string(
                    "Prejudice and discrimination are related but distinct. "
                    "Addressing both requires changing attitudes and behaviors."
                ),
                "difficulty": "Medium",
                "bloom_level": "Analyse",
            })

    return questions


def gen_social_influence_questions(rng, count):
    questions = []
    for _ in range(count):
        q_type = rng.choice(["mcq", "mcq", "fill", "short", "competency"])
        name = get_name(rng, rng.choice(["male", "female"]))
        city = get_city(rng)

        if q_type == "competency":
            q_text = (
                "COMPETENCY-BASED: A group of 8 friends from {} regularly meets at a "
                "local cafe. Over time, {name}, who is usually cautious, has started "
                "making riskier decisions during group discussions. During a recent "
                "outing, the group collectively decided to take a dangerous shortcut "
                "that none of them would have chosen individually.\n\n"
                "(a) Define group polarization and explain how it manifests in this scenario.\n"
                "(b) Distinguish between conformity and groupthink. Which phenomenon "
                "is more relevant here?\n"
                "(c) How does deindividuation in group settings contribute to risky behavior?\n"
                "(d) Using the concept of social loafing, explain why some group members "
                "might not voice their concerns about the risky decision.\n"
                "(e) Propose strategies that {name} could use to express dissent "
                "safely and constructively in group settings, drawing on psychological research."
            ).format(city=city, name=name)
            answer_text = (
                "(a) Group Polarization: The tendency for group discussion to amplify "
                "the initial leanings of group members. {name} and friends became "
                "increasingly risk-seeking because discussion reinforced the cautious "
                "members' latent willingness to take risks.\n\n"
                "(b) Conformity vs Groupthink: Conformity is adjusting behavior to match "
                "group norms. Groupthink is a more extreme phenomenon where the desire "
                "for harmony overrides realistic appraisal of alternatives. Here, "
                "conformity and possibly groupthink are at play.\n\n"
                "(c) Deindividuation: In groups, individuals may feel less self-aware "
                "and less accountable. Anonymity within the group reduces inhibitions, "
                "leading to impulsive and sometimes risky behavior.\n\n"
                "(d) Social Loafing: Some members may not voice concerns because they "
                "feel their individual input is dispensable ('diffusion of responsibility'). "
                "In larger groups, individuals exert less effort, including in critical "
                "thinking and risk assessment.\n\n"
                "(e) Strategies: (1) Express concern using 'I' statements, "
                "(2) Play devil's advocate role, "
                "(3) Propose a trial period before committing to risky decisions, "
                "(4) Seek private discussions with trusted group members first, "
                "(5) Reference objective data or expert opinions to support caution."
            ).format(name=name)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_013",
                "topic": "Social Influence and Group Processes",
                "type": "long_answer",
                "question": _clean_string(q_text),
                "options": [],
                "answer": _clean_string(answer_text),
                "steps": [
                    "Define group polarization.",
                    "Distinguish conformity from groupthink.",
                    "Explain deindividuation effects.",
                    "Explain social loafing.",
                    "Propose practical strategies.",
                ],
                "explanation": _clean_string(
                    "Group dynamics can significantly influence individual behavior, "
                    "sometimes leading to poor decisions. Understanding these processes "
                    "helps in designing better group decision-making procedures."
                ),
                "difficulty": "Hard",
                "bloom_level": "Apply",
            })

        elif q_type == "mcq":
            social_items = [
                {
                    "question": (
                        "In Milgram's obedience study, what percentage of participants "
                        "delivered the maximum (450V) shock?"
                    ),
                    "options": ["25%", "50%", "65%", "90%"],
                    "answer": "65%",
                },
                {
                    "question": (
                        "Group polarization refers to the tendency for group discussion to:"
                    ),
                    "options": [
                        "Reduce conflict among members",
                        "Amplify the initial group leaning",
                        "Lead to consensus more quickly",
                        "Reduce individual accountability",
                    ],
                    "answer": "Amplify the initial group leaning",
                },
                {
                    "question": (
                        "When individuals exert less effort in a group than when working "
                        "alone, this is called:"
                    ),
                    "options": [
                        "Social Facilitation",
                        "Social Loafing",
                        "Groupthink",
                        "Deindividuation",
                    ],
                    "answer": "Social Loafing",
                },
                {
                    "question": (
                        "Asch's conformity experiments demonstrated that people conform "
                        "to group pressure primarily due to:"
                    ),
                    "options": [
                        "Normative influence",
                        "Informational influence",
                        "Obedience to authority",
                        "Group polarization",
                    ],
                    "answer": "Normative influence",
                },
            ]
            item = rng.choice(social_items)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_013",
                "topic": "Social Influence and Group Processes",
                "type": "mcq",
                "question": _clean_string(item["question"]),
                "options": item["options"],
                "answer": item["answer"],
                "steps": [
                    "Identify the social psychology concept.",
                    "Recall relevant research findings.",
                    "Match with the correct option.",
                ],
                "explanation": _clean_string(
                    "{} is correct. This finding comes from classic research in "
                    "social psychology."
                ).format(item["answer"]),
                "difficulty": "Medium",
                "bloom_level": "Remember",
            })

        elif q_type == "fill":
            social_fills = [
                ("Adjusting one's behavior to match group norms is called ____",
                 "conformity"),
                ("Milgram's study investigated ____ to authority",
                 "obedience"),
                ("The tendency for group discussion to shift opinions to extremes "
                 "is called group ____", "polarization"),
                ("Zimbardo's Stanford Prison Experiment demonstrated the effects of "
                 "____ on behavior", "deindividuation"),
            ]
            item = rng.choice(social_fills)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_013",
                "topic": "Social Influence and Group Processes",
                "type": "fill",
                "question": _clean_string(item[0]),
                "options": [],
                "answer": item[1],
                "steps": [
                    "Identify the social psychology concept.",
                    "Recall the correct term.",
                    "Fill in the blank.",
                ],
                "explanation": _clean_string(
                    "Social influence processes are central to understanding how "
                    "individuals are affected by the presence of others."
                ),
                "difficulty": "Easy",
                "bloom_level": "Remember",
            })

        elif q_type == "short":
            q_text = (
                "Compare and contrast conformity, compliance, and obedience. "
                "Provide a real-world example relevant to students in {city} for each concept. "
                "Discuss the factors that influence the likelihood of each type of social influence."
            ).format(city=city)
            answer_text = (
                "Conformity: Adjusting behavior to match group norms (e.g., a student "
                "wearing a particular style of clothing because everyone else does).\n"
                "Compliance: Yielding to a direct request from another person (e.g., "
                "buying a product because a friend recommends it).\n"
                "Obedience: Following a direct order from an authority figure (e.g., "
                "a student following a teacher's instructions even when they disagree).\n\n"
                "Factors influencing conformity: group size, unanimity, cohesion, "
                "status, and public response.\n"
                "Factors influencing compliance: requestor's authority, reciprocity, "
                "scarcity, and social proof.\n"
                "Factors influencing obedience: proximity of authority, legitimacy "
                "of authority, and proximity of the victim."
            )
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_013",
                "topic": "Social Influence and Group Processes",
                "type": "short_answer",
                "question": _clean_string(q_text),
                "options": [],
                "answer": _clean_string(answer_text),
                "steps": [
                    "Define each type of social influence.",
                    "Provide examples for each.",
                    "List factors influencing each type.",
                    "Compare and contrast the three.",
                ],
                "explanation": _clean_string(
                    "Social influence takes different forms depending on the nature "
                    "of the social pressure and the relationship between the influencer "
                    "and the influenced."
                ),
                "difficulty": "Medium",
                "bloom_level": "Understand",
            })

    return questions


def gen_environment_questions(rng, count):
    questions = []
    for _ in range(count):
        q_type = rng.choice(["mcq", "mcq", "fill", "short", "competency"])
        name = get_name(rng, rng.choice(["male", "female"]))
        city = get_city(rng)

        if q_type == "competency":
            q_text = (
                "COMPETENCY-BASED: {name} lives in an apartment complex in {city} where noise "
                "levels from traffic, construction, and neighbor activities regularly exceed "
                "70 decibels (dB) during daytime. Research shows that sustained noise above "
                "65 dB can cause stress, sleep disturbance, and reduced cognitive performance. "
                "Recently, a new construction project nearby has pushed levels to 85 dB during "
                "peak hours. Residents have started complaining about headaches, irritability, "
                "and difficulty concentrating.\n\n"
                "(a) Describe how environmental noise acts as a stressor and affects "
                "human physiology and cognition.\n"
                "(b) Explain the concept of 'psychological adaptation' to noise and why "
                "it might not be fully effective in this scenario.\n"
                "(c) How does the Yerkes-Dodson Law relate to the impact of noise on "
                "task performance?\n"
                "(d) As an environmental psychologist, propose an action plan that "
                "combines individual coping strategies and community-level interventions "
                "for residents of {city}.\n"
                "(e) Discuss the role of pro-environmental behavior in reducing noise "
                "pollution and how attitude-change strategies could promote such behavior."
            ).format(name=name, city=city)
            answer_text = (
                "(a) Noise as stressor: Noise activates the sympathetic nervous system, "
                "releasing cortisol and adrenaline. Chronic exposure leads to hypertension, "
                "cardiovascular problems, and immune suppression. Cognitively, noise "
                "interferes with attention, memory, and problem-solving by causing "
                "distraction and increasing mental workload.\n\n"
                "(b) Psychological adaptation: Habituation to noise reduces physiological "
                "arousal over time but does not eliminate cognitive disruption. Since the "
                "noise is intermittent (varying from 70-85 dB), full adaptation is not "
                "possible. The unpredictability of construction noise makes it particularly "
                "stressful.\n\n"
                "(c) Yerkes-Dodson Law: The relationship between arousal and performance "
                "is an inverted U-shape. Optimal performance occurs at moderate arousal. "
                "Excessive noise creates over-arousal, impairing performance on complex "
                "tasks. For simple tasks, the effect might be less detrimental or even "
                "facilitating.\n\n"
                "(d) Action Plan:\n"
                "Individual: Noise-canceling headphones, white noise machines, "
                "schedule quiet hours for focused work, stress management techniques.\n"
                "Community: Petition for noise barriers, enforce construction time "
                "restrictions, create quiet zones, organize community awareness programs, "
                "use legal provisions under environmental protection laws.\n\n"
                "(e) Pro-environmental behavior: Reducing vehicle use (carpooling, "
                "public transport), supporting noise regulation policies, community "
                "monitoring of noise levels. Attitude change through ELM: Central route "
                "(data on health impacts) and peripheral route (community leaders "
                "advocating for quieter neighborhoods)."
            )
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_014",
                "topic": "Psychology and Life",
                "type": "long_answer",
                "question": _clean_string(q_text),
                "options": [],
                "answer": _clean_string(answer_text),
                "steps": [
                    "Explain noise as a physiological and cognitive stressor.",
                    "Discuss psychological adaptation limits.",
                    "Apply Yerkes-Dodson Law.",
                    "Design individual and community interventions.",
                    "Link to pro-environmental behavior.",
                ],
                "explanation": _clean_string(
                    "Environmental psychology examines the relationship between "
                    "people and their physical surroundings. Understanding environmental "
                    "stressors is crucial for urban planning and public health."
                ),
                "difficulty": "Hard",
                "bloom_level": "Apply",
            })

        elif q_type == "mcq":
            env_items = [
                {
                    "question": (
                        "The branch of psychology that studies the relationship between "
                        "human behavior and the physical environment is called:"
                    ),
                    "options": [
                        "Environmental Psychology",
                        "Ecological Psychology",
                        "Health Psychology",
                        "Community Psychology",
                    ],
                    "answer": "Environmental Psychology",
                },
                {
                    "question": (
                        "According to the Yerkes-Dodson Law, performance is optimal at:"
                    ),
                    "options": [
                        "Low arousal levels",
                        "Moderate arousal levels",
                        "High arousal levels",
                        "Zero arousal levels",
                    ],
                    "answer": "Moderate arousal levels",
                },
                {
                    "question": (
                        "Which of the following is NOT a source of noise pollution in "
                        "urban areas?"
                    ),
                    "options": [
                        "Construction activities",
                        "Vehicle traffic",
                        "Natural wind patterns",
                        "Industrial machinery",
                    ],
                    "answer": "Natural wind patterns",
                },
            ]
            item = rng.choice(env_items)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_014",
                "topic": "Psychology and Life",
                "type": "mcq",
                "question": _clean_string(item["question"]),
                "options": item["options"],
                "answer": item["answer"],
                "steps": [
                    "Identify the concept being tested.",
                    "Recall relevant information.",
                    "Match with the correct answer.",
                ],
                "explanation": _clean_string(
                    "Environmental psychology examines how physical environments affect "
                    "human well-being and behavior."
                ),
                "difficulty": "Easy",
                "bloom_level": "Remember",
            })

        elif q_type == "fill":
            env_fills = [
                ("Sustained noise levels above ____ dB can cause significant stress",
                 "65"),
                ("The ____-____ Law describes the relationship between arousal and performance",
                 "Yerkes-Dodson"),
                ("Pro-environmental behavior refers to actions that ____ the environment",
                 "protect"),
            ]
            item = rng.choice(env_fills)
            questions.append({
                "id": rng.randint(1, 999999),
                "syllabus_node": "c12_psy_014",
                "topic": "Psychology and Life",
                "type": "fill",
                "question": _clean_string(item[0]),
                "options": [],
                "answer": item[1],
                "steps": [
                    "Identify the environmental psychology concept.",
                    "Recall the specific fact.",
                    "Fill in the blank.",
                ],
                "explanation": _clean_string(
                    "Environmental stressors such as noise and pollution have "
                    "significant effects on physical and mental health."
                ),
                "difficulty": "Easy",
                "bloom_level": "Remember",
            })

        elif q_type == "short":
            q_text = (
                "Explain the effects of air pollution on human psychology and behavior. "
                "Referencing the situation in {city}, discuss how environmental "
                "degradation can contribute to psychological distress and what "
                "pro-environmental behaviors can mitigate these effects."
            ).format(city=city)
            answer_text = (
                "Effects of air pollution on psychology:\n"
                "1. Cognitive impairment: Reduced attention, memory, and decision-making.\n"
                "2. Mood effects: Increased anxiety, depression, and irritability.\n"
                "3. Stress response: Activation of stress hormones.\n"
                "4. Sleep disturbance: Poor air quality disrupts sleep patterns.\n"
                "5. Developmental effects: Affects children's cognitive development.\n\n"
                "In {}: High pollution levels contribute to widespread stress, "
                "reduced workplace productivity, and increased healthcare burden