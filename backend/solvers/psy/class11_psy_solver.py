"""
CISCE Class 11 Psychology - Solver & Question Generator
Complete self-contained module covering all syllabus nodes from Chapters 1-3.
"""

import random
import math
import fractions
import json
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Any, Optional, Tuple
from enum import Enum
import sympy as sp
import numpy as np
from scipy import stats


# ============================================================================
# DATA CONSTANTS - All Syllabus Knowledge
# ============================================================================

CHAPTER_1_BASIC = {
    "definition": (
        "Psychology is the scientific study of behaviour and mental processes. "
        "It examines how individuals think, feel, and act, using systematic and "
        "objective methods of investigation."
    ),
    "behaviour": (
        "Behaviour refers to any observable action or response of an organism. "
        "It includes overt actions (walking, talking) as well as internal "
        "activities (thinking, feeling) that can be inferred."
    ),
    "stimulus": (
        "A stimulus is any object, event, or condition in the environment that "
        "elicits a response. Examples: a bell ringing, a teacher's question, "
        "a bright light."
    ),
    "response": (
        "A response is the reaction of an organism to a stimulus. It can be "
        "physical (salivating at food), emotional (feeling anxious), or "
        "cognitive (solving a math problem)."
    ),
}

SCHOOLS_OF_THOUGHT = {
    "structuralism": {
        "psychologists": ["Wilhelm Wundt", "Edward Titchener"],
        "concepts": [
            "Introspection - examining one's own conscious experience",
            "Breaking consciousness into basic elements (sensations, images, feelings)",
            "Goal: Analyse the structure of mind through systematic self-observation",
        ],
        "features": [
            "Used introspection as the main method",
            "Focused on conscious experience and its elements",
            "Wanted to describe the structure of the mind",
            "Established first psychology laboratory in 1879 (Wundt)",
        ],
    },
    "functionalism": {
        "psychologists": ["William James", "John Dewey"],
        "concepts": [
            "Stream of consciousness - continuous flow of thoughts and feelings",
            "Functional psychology - studying the purpose of behaviour",
            "Adaptation - how mental processes help organisms adapt to environment",
        ],
        "features": [
            "Focused on function/purpose of consciousness rather than structure",
            "Emphasized how mental processes help adaptation",
            "Applied psychology to real-world problems (education, industry)",
            "Studied children, animals, and people with mental disorders",
        ],
    },
    "behaviourism": {
        "psychologists": ["John B. Watson", "B.F. Skinner"],
        "concepts": [
            "Stimulus-Response (S-R) bond - behaviour as learned association",
            "Operant conditioning - behaviour shaped by reinforcement/punishment",
            "Tabula rasa - mind as a blank slate at birth",
        ],
        "features": [
            "Focused only on observable behaviour",
            "Rejected study of internal mental states",
            "Emphasized environmental determinism",
            "Used animal research to generalise to human behaviour",
        ],
    },
    "psychoanalysis": {
        "psychologists": ["Sigmund Freud", "Carl Jung"],
        "concepts": [
            "Unconscious mind - repressed wishes and conflicts influencing behaviour",
            "Psychoanalytic therapy - free association and dream analysis",
            "Defence mechanisms - ways ego protects itself from anxiety",
        ],
        "features": [
            "Emphasized role of unconscious in behaviour",
            "Focused on early childhood experiences",
            "Used case study and clinical observation methods",
            "Believed in psychosexual stages of development",
        ],
    },
    "gestalt_psychology": {
        "psychologists": ["Max Wertheimer", "Wolfgang Köhler"],
        "concepts": [
            "Phi phenomenon - perception of motion from still images",
            "Insight learning - sudden restructuring leading to solution",
            "Gestalt laws - whole is greater than sum of parts",
        ],
        "features": [
            "Emphasized holistic perception (Gestalt = whole/form)",
            "Rejected breaking experience into elements",
            "The whole is different from the sum of its parts",
            "Famous for the saying: 'The whole is other than the sum of parts'",
        ],
    },
}

MODERN_APPROACHES = {
    "eclectic": (
        "The eclectic approach in modern psychology draws from multiple schools of "
        "thought rather than adhering to a single perspective. Psychologists select "
        "and combine methods, theories, and techniques from different schools based "
        "on what best explains a particular phenomenon. This approach recognizes "
        "that no single school can explain all aspects of human behaviour."
    ),
    "biological": (
        "Focuses on biological bases of behaviour including brain structures, "
        "neurotransmitters, hormones, and genetics. In India, studies by "
        "professors at NIMHANS Bangalore combine neuroscience with "
        "traditional Indian knowledge systems."
    ),
    "cognitive": (
        "Studies mental processes like thinking, memory, problem-solving, and "
        "decision-making. Indian researchers like Prof. Narayanan at IIT Madras "
        "have contributed to cognitive modelling."
    ),
    "humanistic": (
        "Emphasizes free will, personal growth, and human potential. Focuses on "
        "self-actualization and the innate drive toward growth."
    ),
    "sociocultural": (
        "Examines how social and cultural factors influence behaviour. Studies "
        "how Indian cultural values, joint family systems, and caste dynamics "
        "shape psychological processes."
    ),
}

CHAPTER_2_METHODS = {
    "scientific_method": (
        "Psychology uses scientific methods involving systematic observation, "
        "measurement, and analysis. Key steps: identify problem, form hypothesis, "
        "collect data, analyze results, draw conclusions, and report findings."
    ),
    "observation": {
        "types": {
            "controlled": (
                "Observations conducted in a laboratory or structured setting where "
                "variables are manipulated and controlled. Example: observing a child's "
                "reaction to a novel toy in a lab playroom."
            ),
            "uncontrolled": (
                "Observations conducted in natural settings without manipulation. "
                "Example: observing children's playground behaviour at a school in Delhi."
            ),
            "field_study": (
                "Observations in natural environments while maintaining scientific "
                "rigor. Example: studying crowd behaviour during Diwali celebrations "
                "at a public market."
            ),
        },
        "longitudinal": (
            "A longitudinal study follows the same individuals over an extended period, "
            "sometimes across years. Example: tracking academic stress in CBSE students "
            "from Class 9 through Class 12."
        ),
        "cross_sectional": (
            "A cross-sectional study compares different groups at a single point in time. "
            "Example: comparing stress levels among Class 9, 10, 11, and 12 students "
            "all measured during the same month."
        ),
        "case_history": (
            "An in-depth study of a single individual, group, or event over time. "
            "Example: detailed study of Phineas Gage after his brain injury, or "
            "documenting the development of a child prodigy in Indian classical music."
        ),
        "advantages_disadvantages": {
            "observation": {
                "advantage": (
                    "Captures natural behaviour in real settings, providing rich "
                    "qualitative data."
                ),
                "disadvantage": (
                    "Observer bias can affect results; behaviour may be influenced by "
                    "the presence of an observer (Hawthorne effect)."
                ),
            },
            "case_history": {
                "advantage": (
                    "Provides deep, detailed insights into rare or complex cases that "
                    "cannot be studied through experiments."
                ),
                "disadvantage": (
                    "Findings cannot be generalized to broader populations; relies on "
                    "subjective recall which may be inaccurate."
                ),
            },
        },
    },
    "experiment": {
        "variables": {
            "independent": (
                "The variable that is manipulated or changed by the researcher to test "
                "its effect on another variable."
            ),
            "dependent": (
                "The variable that is measured or observed; it is expected to change as "
                "a result of changes in the independent variable."
            ),
            "control": (
                "Variables kept constant to ensure that changes in the dependent variable "
                "are due only to the independent variable."
            ),
            "extraneous": (
                "Variables other than the independent variable that could affect the "
                "dependent variable; must be controlled."
            ),
        },
        "steps": [
            "Identify the research problem",
            "Formulate a testable hypothesis",
            "Design the experiment and select participants",
            "Manipulate the independent variable",
            "Measure the dependent variable",
            "Control extraneous variables",
            "Analyze the data statistically",
            "Draw conclusions and report findings",
        ],
        "advantages": (
            "Allows determination of cause-and-effect relationships through controlled "
            "manipulation of variables."
        ),
        "disadvantages": (
            "Artificial laboratory settings may not reflect real-world behaviour; "
            "ethical constraints limit what can be studied experimentally."
        ),
    },
    "surveys": {
        "description": (
            "Surveys collect information from many people using questionnaires or "
            "interviews. Example: a survey of 500 Class 12 students across Mumbai "
            "schools about their career aspirations."
        ),
        "questionnaires": (
            "Written sets of questions administered to a large group. Can include "
            "multiple-choice, Likert scales, or open-ended questions."
        ),
        "self_reports": (
            "Individuals report on their own behaviour, thoughts, or feelings. "
            "Includes interviews, diaries, and personal questionnaires."
        ),
        "advantages": (
            "Can collect data from large samples quickly and efficiently."
        ),
        "disadvantages": (
            "Self-reports may be biased or inaccurate due to social desirability or "
            "poor self-awareness."
        ),
    },
    "sampling": {
        "population": (
            "The entire group of individuals that a researcher wants to study. "
            "Example: all Class 11 students in India."
        ),
        "random_sample": (
            "Every member of the population has an equal chance of being selected. "
            "Example: using a lottery method to select 100 students from a school's "
            "Class 11 roll."
        ),
        "representative_sample": (
            "A sample that accurately reflects the characteristics of the population. "
            "Example: selecting students in proportion to their representation across "
            "different states, boards, and socio-economic backgrounds."
        ),
        "biased_sample": (
            "A sample that does not accurately represent the population, leading to "
            "skewed results. Example: studying only students from elite private "
            "schools in metro cities and generalizing to all Indian students."
        ),
    },
}

CHAPTER_3_ATTENTION = {
    "importance": (
        "Attention acts as a gateway to perception, filtering the vast amount of "
        "sensory information and selecting what is important. Without attention, "
        "we cannot perceive or process information meaningfully."
    ),
    "outer_determinants": {
        "size": "Larger objects tend to attract more attention than smaller ones.",
        "colour": "Bright, vivid, and contrasting colours draw attention more effectively.",
        "movement": "Moving objects are noticed more readily than stationary ones.",
        "change": "Sudden changes in the environment capture attention (e.g., a light turning on).",
        "intensity": "Brighter lights, louder sounds, or stronger stimuli attract attention.",
        "contrast": "Objects that stand out from their background receive more attention.",
    },
    "inner_determinants": {
        "need": (
            "Current needs direct attention toward relevant stimuli. A hungry student "
            "notices the school canteen; a student needing stationery notices a "
            "stationery shop."
        ),
        "interest": (
            "Things that interest us hold our attention longer. A student interested "
            "in cricket notices sports news more readily."
        ),
        "emotion": (
            "Emotionally charged stimuli capture and hold attention. A student "
            "anxious about exams notices exam-related information more readily."
        ),
    },
}

CHAPTER_3_PERCEPTION = {
    "sensation_vs_perception": (
        "Sensation is the process of detecting physical energy from the environment "
        "through sensory organs (eyes, ears, skin, etc.). Perception is the "
        "organization, interpretation, and conscious experience of those sensory "
        "inputs. Sensation is 'raw data' input; perception is the 'meaningful "
        "interpretation' of that data. Example: eyes receive light waves (sensation); "
        "recognizing a familiar face (perception)."
    ),
    "process": (
        "Transforming sensation to perception involves: (1) Reception of stimulus "
        "energy by sensory receptors, (2) Transduction - conversion into neural "
        "signals, (3) Transmission to the brain, (4) Organization of neural signals, "
        "(5) Interpretation based on past experience, knowledge, and expectations."
    ),
    "figure_ground": (
        "The figure-ground principle states that in perception, we separate the "
        "central object of focus (figure) from the background (ground). The figure "
        "appears more distinct, solid, and in front; the ground appears more "
        "diffuse and behind. Example: when reading a book, the text is the figure "
        "and the page background is the ground."
    ),
    "laws_of_grouping": {
        "similarity": (
            "Similar elements tend to be grouped together. Example: rows of similar "
            "shapes in a pattern are perceived as grouped."
        ),
        "proximity": (
            "Objects close to each other tend to be grouped together. Example: dots "
            "arranged in pairs close together are seen as pairs rather than a single "
            "row."
        ),
        "continuity": (
            "We tend to perceive smooth, continuous patterns rather than discontinuous "
            "ones. Example: a line that appears interrupted is seen as continuing behind "
            "an obstacle."
        ),
        "simplicity": (
            "We tend to perceive simple, regular, symmetric patterns rather than "
            "complex ones. This is also known as the law of Prägnanz (good figure)."
        ),
        "closure": (
            "We tend to fill in gaps in incomplete figures to perceive a complete, "
            "whole object. Example: a triangle with gaps in its sides is still "
            "perceived as a triangle."
        ),
    },
}

# ============================================================================
# UTILITY FUNCTIONS
# ============================================================================

def seeded_random(seed: int) -> random.Random:
    rng = random.Random(seed)
    return rng


def compute_mc_statistics(answers_list):
    arr = np.array(answers_list, dtype=float)
    return {
        "mean": float(np.mean(arr)),
        "median": float(np.median(arr)),
        "std": float(np.std(arr)),
        "min": float(np.min(arr)),
        "max": float(np.max(arr)),
    }


def solve_statistics(params):
    data = params.get("data", [45, 52, 38, 60, 55, 42, 48, 58, 50, 40])
    rng = seeded_random(params.get("seed", 42))
    if not data:
        data = [rng.randint(35, 65) for _ in range(10)]
    arr = np.array(data, dtype=float)
    mu = float(np.mean(arr))
    median = float(np.median(arr))
    std = float(np.std(arr, ddof=1))
    semi_iqr = 0.5 * (np.percentile(arr, 75) - np.percentile(arr, 25))
    steps = [
        f"Step 1: Given data: {data}",
        f"Step 2: Compute mean: sum={sum(data)}, n={len(data)}, mean = {sum(data)}/{len(data)} = {mu:.2f}",
        f"Step 3: Sort data: {sorted(data)}",
        f"Step 4: Median position = (n+1)/2 = {(len(data)+1)/2}, median = {median:.2f}",
        f"Step 5: Standard deviation (sample) = {std:.4f}",
        f"Step 6: Semi-interquartile range = 0.5*(Q3-Q1) = {semi_iqr:.4f}",
    ]
    mean_dists = [abs(x - mu) for x in arr]
    mean_abs = sum(mean_dists) / len(arr)
    steps.append(
        f"Step 7: Mean absolute deviation = {mean_abs:.4f} (average distance from mean)"
    )
    steps.append(f"Verification: Sum of (x - mean) = {sum(x - mu for x in arr):.6f} ≈ 0 (check)")
    steps.append(
        f"Verification: mean+std = {mu+std:.2f}, mean-std = {mu-std:.2f}, "
        f"values in range: {sum(1 for x in arr if mu-std <= x <= mu+std)}/{len(arr)}"
    )
    return {
        "answer": {"mean": round(mu, 4), "median": round(median, 4), "std_dev": round(std, 4), "mad": round(mean_abs, 4)},
        "steps": steps,
        "verification": {
            "sum_deviation_from_mean": round(sum(x - mu for x in arr), 6),
            "values_within_1_std": int(sum(1 for x in arr if mu - std <= x <= mu + std)),
            "total_values": len(arr),
        },
    }


# ============================================================================
# MCQ SOLVER
# ============================================================================

MCQ_BANK = [
    # Chapter 1 - Definition
    {
        "id": "psy_c1_001",
        "topic": "Definition of Psychology",
        "question": (
            "Psychology is best defined as:"
        ),
        "options": [
            "The study of the soul and mind",
            "The scientific study of behaviour and mental processes",
            "The study of only conscious experience",
            "The study of how people think about philosophy",
        ],
        "answer": 1,
        "explanation": (
            "Step 1: Modern psychology is defined as the scientific study of behaviour "
            "(observable actions) and mental processes (thoughts, feelings, etc.).\n"
            "Step 2: The study of 'soul' is the original Greek meaning but is outdated.\n"
            "Step 3: Only conscious experience was the focus of Structuralism, not "
            "modern psychology.\n"
            "Conclusion: Option B is correct."
        ),
        "difficulty": "Easy",
        "type": "mcq",
        "competency": True,
    },
    {
        "id": "psy_c1_002",
        "topic": "Basic Terms",
        "question": "In psychological terms, 'behaviour' refers to:",
        "options": [
            "Only physical actions like walking and talking",
            "Any observable action or response of an organism",
            "Only internal mental processes",
            "The study of animal movements only",
        ],
        "answer": 1,
        "explanation": (
            "Step 1: Behaviour includes both overt actions (walking, talking) and "
            "internal activities that can be inferred (thinking, feeling).\n"
            "Step 2: It is not limited to physical actions only.\n"
            "Step 3: It is not limited to internal processes only.\n"
            "Conclusion: Option B is correct as it captures the broad scope of "
            "behaviour in psychology."
        ),
        "difficulty": "Easy",
        "type": "mcq",
        "competency": True,
    },
    {
        "id": "psy_c1_003",
        "topic": "Basic Terms",
        "question": (
            "A student blushes when called upon in class. Here, 'being called upon' is:"
        ),
        "options": ["Response", "Stimulus", "Reinforcement", "Reflex"],
        "answer": 1,
        "explanation": (
            "Step 1: A stimulus is any event or condition in the environment that "
            "elicits a response.\n"
            "Step 2: 'Being called upon' by the teacher is an event that triggers the "
            "response of blushing.\n"
            "Step 3: Blushing is the response, not the stimulus.\n"
            "Conclusion: Option B is correct."
        ),
        "difficulty": "Easy",
        "type": "mcq",
        "competency": True,
    },
    # Chapter 1 - Schools
    {
        "id": "psy_c1_004",
        "topic": "Schools of Thought",
        "question": "Who established the first psychology laboratory in Leipzig, Germany (1879)?",
        "options": [
            "Edward Titchener",
            "William James",
            "Wilhelm Wundt",
            "John B. Watson",
        ],
        "answer": 2,
        "explanation": (
            "Step 1: Wilhelm Wundt is credited as the 'Father of Experimental Psychology'.\n"
            "Step 2: In 1879, he established the first psychology laboratory at the "
            "University of Leipzig, Germany.\n"
            "Step 3: This event marked the formal beginning of psychology as an "
            "independent scientific discipline.\n"
            "Conclusion: Option C is correct."
        ),
        "difficulty": "Medium",
        "type": "mcq",
        "competency": False,
    },
    {
        "id": "psy_c1_005",
        "topic": "Schools of Thought",
        "question": (
            "Structuralism is associated with which two psychologists?"
        ),
        "options": [
            "Wundt and Titchener",
            "Watson and Skinner",
            "Freud and Jung",
            "James and Dewey",
        ],
        "answer": 0,
        "explanation": (
            "Step 1: Structuralism was founded by Wilhelm Wundt and developed further "
            "by his student Edward Titchener.\n"
            "Step 2: Titchener brought structuralism to the United States at Cornell "
            "University.\n"
            "Step 3: Their key method was introspection.\n"
            "Conclusion: Option A is correct."
        ),
        "difficulty": "Medium",
        "type": "mcq",
        "competency": True,
    },
    {
        "id": "psy_c1_006",
        "topic": "Schools of Thought",
        "question": (
            "Which school of thought is known for the famous quote "
            "'The whole is other than the sum of its parts'?"
        ),
        "options": [
            "Structuralism",
            "Functionalism",
            "Gestalt Psychology",
            "Behaviourism",
        ],
        "answer": 2,
        "explanation": (
            "Step 1: Gestalt psychology emphasizes that we perceive organized wholes, "
            "not just individual elements.\n"
            "Step 2: The quote 'The whole is other than the sum of its parts' is "
            "attributed to Gestalt psychologist Kurt Koffka.\n"
            "Step 3: The two key Gestalt psychologists in the syllabus are Max "
            "Wertheimer and Wolfgang Köhler.\n"
            "Conclusion: Option C is correct."
        ),
        "difficulty": "Medium",
        "type": "mcq",
        "competency": True,
    },
    {
        "id": "psy_c1_007",
        "topic": "Schools of Thought",
        "question": (
            "Who among the following is NOT a Behaviourist?"
        ),
        "options": [
            "John B. Watson",
            "B.F. Skinner",
            "Sigmund Freud",
            "Ivan Pavlov",
        ],
        "answer": 2,
        "explanation": (
            "Step 1: John B. Watson founded Behaviourism ('Psychology as the "
            "Behaviourist Views It', 1913).\n"
            "Step 2: B.F. Skinner developed Operant Conditioning within the "
            "behaviourist tradition.\n"
            "Step 3: Ivan Pavlov's classical conditioning work influenced behaviourism.\n"
            "Step 4: Sigmund Freud founded Psychoanalysis, which focuses on "
            "unconscious drives, not observable behaviour.\n"
            "Conclusion: Option C is correct."
        ),
        "difficulty": "Medium",
        "type": "mcq",
        "competency": True,
    },
    {
        "id": "psy_c1_008",
        "topic": "Schools of Thought",
        "question": (
            "William James is associated with which school of psychology?"
        ),
        "options": [
            "Structuralism",
            "Functionalism",
            "Gestalt Psychology",
            "Psychoanalysis",
        ],
        "answer": 1,
        "explanation": (
            "Step 1: William James, an American psychologist, is a key figure in "
            "Functionalism.\n"
            "Step 2: His book 'The Principles of Psychology' (1890) introduced "
            "concepts like 'stream of consciousness'.\n"
            "Step 3: John Dewey, another functionalist, applied psychology to "
            "education.\n"
            "Conclusion: Option B is correct."
        ),
        "difficulty": "Medium",
        "type": "mcq",
        "competency": True,
    },
    {
        "id": "psy_c1_009",
        "topic": "Schools of Thought",
        "question": (
            "In Psychoanalysis, the 'talking cure' method was developed by:"
        ),
        "options": [
            "Carl Jung",
            "Sigmund Freud",
            "Alfred Adler",
            "Karen Horney",
        ],
        "answer": 1,
        "explanation": (
            "Step 1: Sigmund Freud developed psychoanalytic therapy, including "
            "free association and dream analysis.\n"
            "Step 2: The 'talking cure' involved patients talking freely about "
            "their thoughts and memories.\n"
            "Step 3: This was intended to bring unconscious material into "
            "conscious awareness.\n"
            "Conclusion: Option B is correct."
        ),
        "difficulty": "Medium",
        "type": "mcq",
        "competency": True,
    },
    {
        "id": "psy_c1_010",
        "topic": "Schools of Thought",
        "question": (
            "The Phi phenomenon, a foundation of Gestalt psychology, was demonstrated by:"
        ),
        "options": [
            "Edward Titchener",
            "John Dewey",
            "Max Wertheimer",
            "Sigmund Freud",
        ],
        "answer": 2,
        "explanation": (
            "Step 1: Max Wertheimer discovered the Phi phenomenon in 1912, "
            "often considered the founding of Gestalt psychology.\n"
            "Step 2: The Phi phenomenon is the perception of apparent motion "
            "when two lights flash alternately.\n"
            "Step 3: This demonstrated that we perceive organized wholes, not "
            "just discrete sensory inputs.\n"
            "Conclusion: Option C is correct."
        ),
        "difficulty": "Medium",
        "type": "mcq",
        "competency": False,
    },
    {
        "id": "psy_c1_011",
        "topic": "Modern Eclectic Approaches",
        "question": (
            "The eclectic approach in psychology means:"
        ),
        "options": [
            "Sticking to only one school of thought",
            "Combining ideas from multiple schools of thought",
            "Rejecting all traditional schools",
            "Using only biological explanations",
        ],
        "answer": 1,
        "explanation": (
            "Step 1: The eclectic approach involves selecting and combining methods "
            "and theories from different schools.\n"
            "Step 2: Modern psychologists recognize that no single school can explain "
            "all aspects of human behaviour.\n"
            "Step 3: For example, treating anxiety may involve cognitive techniques "
            "(CBT) combined with behavioural methods.\n"
            "Conclusion: Option B is correct."
        ),
        "difficulty": "Easy",
        "type": "mcq",
        "competency": True,
    },
    # Chapter 2 - Methods
    {
        "id": "psy_c2_001",
        "topic": "Observation Methods",
        "question": (
            "A researcher observes children playing in a Delhi park without interfering. "
            "This method is called:"
        ),
        "options": [
            "Controlled observation",
            "Uncontrolled observation",
            "Case history",
            "Experimental method",
        ],
        "answer": 1,
        "explanation": (
            "Step 1: Uncontrolled observation occurs in natural settings without "
            "manipulation of variables.\n"
            "Step 2: A park is a natural environment where children play freely.\n"
            "Step 3: Since the researcher is not controlling any variables, this "
            "is uncontrolled observation.\n"
            "Conclusion: Option B is correct."
        ),
        "difficulty": "Medium",
        "type": "mcq",
        "competency": True,
    },
    {
        "id": "psy_c2_002",
        "topic": "Observation Methods",
        "question": (
            "A study tracking the same group of students from Class 9 to Class 12 "
            "is called a:"
        ),
        "options": [
            "Cross-sectional study",
            "Longitudinal study",
            "Case study",
            "Field experiment",
        ],
        "answer": 1,
        "explanation": (
            "Step 1: Longitudinal studies follow the same individuals over an "
            "extended period.\n"
            "Step 2: Tracking from Class 9 to Class 12 follows the same group "
            "over time.\n"
            "Step 3: Cross-sectional studies compare different groups at one point "
            "in time (e.g., comparing Class 9 and Class 12 simultaneously).\n"
            "Conclusion: Option B is correct."
        ),
        "difficulty": "Medium",
        "type": "mcq",
        "competency": True,
    },
    {
        "id": "psy_c2_003",
        "topic": "Observation Methods",
        "question": (
            "In a cross-sectional study, the researcher:"
        ),
        "options": [
            "Studies the same group over many years",
            "Studies different groups at one point in time",
            "Studies one individual in depth",
            "Manipulates variables in a lab",
        ],
        "answer": 1,
        "explanation": (
            "Step 1: Cross-sectional studies compare different groups simultaneously.\n"
            "Step 2: Example: comparing academic stress among Class 9, 10, 11, and "
            "12 students all measured in the same month.\n"
            "Step 3: This is different from longitudinal studies which follow one "
            "group over time.\n"
            "Conclusion: Option B is correct."
        ),
        "difficulty": "Medium",
        "type": "mcq",
        "competency": True,
    },
    {
        "id": "psy_c2_004",
        "topic": "Case History",
        "question": (
            "Which of the following is an example of a case history method?"
        ),
        "options": [
            "Surveying 500 students with a questionnaire",
            "In-depth study of a single child prodigy in music",
            "Controlled experiment on memory",
            "Comparing two groups in a natural setting",
        ],
        "answer": 1,
        "explanation": (
            "Step 1: Case history involves in-depth study of a single individual, "
            "group, or event over time.\n"
            "Step 2: Studying a child prodigy deeply over time fits this definition.\n"
            "Step 3: Surveys and experiments are separate methods.\n"
            "Conclusion: Option B is correct."
        ),
        "difficulty": "Medium",
        "type": "mcq",
        "competency": True,
    },
    {
        "id": "psy_c2_005",
        "topic": "Variables in Experiment",
        "question": (
            "In an experiment studying the effect of sleep on memory, the amount of "
            "sleep given to participants is the:"
        ),
        "options": [
            "Dependent variable",
            "Independent variable",
            "Control variable",
            "Extraneous variable",
        ],
        "answer": 1,
        "explanation": (
            "Step 1: The independent variable is what the researcher manipulates.\n"
            "Step 2: Amount of sleep is deliberately varied/manipulated by the "
            "researcher.\n"
            "Step 3: Memory performance (what is measured) would be the dependent "
            "variable.\n"
            "Conclusion: Option B is correct."
        ),
        "difficulty": "Medium",
        "type": "mcq",
        "competency": True,
    },
    {
        "id": "psy_c2_006",
        "topic": "Variables in Experiment",
        "question": (
            "In an experiment, the variable that is measured to see the effect of "
            "the independent variable is called the:"
        ),
        "options": [
            "Independent variable",
            "Dependent variable",
            "Extraneous variable",
            "Control variable",
        ],
        "answer": 1,
        "explanation": (
            "Step 1: The dependent variable is what is measured/observed as the "
            "outcome.\n"
            "Step 2: It 'depends' on the independent variable.\n"
            "Step 3: In the sleep-memory experiment, memory is the dependent "
            "variable because it is expected to change based on sleep.\n"
            "Conclusion: Option B is correct."
        ),
        "difficulty": "Medium",
        "type": "mcq",
        "competency": True,
    },
    {
        "id": "psy_c2_007",
        "topic": "Sampling",
        "question": (
            "When every member of the population has an equal chance of being selected, "
            "the sample is called:"
        ),
        "options": [
            "Biased sample",
            "Random sample",
            "Representative sample",
            "Convenience sample",
        ],
        "answer": 1,
        "explanation": (
            "Step 1: Random sampling ensures every population member has equal "
            "selection probability.\n"
            "Step 2: A representative sample mirrors population characteristics, "
            "but random sampling is a method to achieve it.\n"
            "Step 3: A biased sample systematically excludes some groups.\n"
            "Conclusion: Option B is correct."
        ),
        "difficulty": "Medium",
        "type": "mcq",
        "competency": True,
    },
    {
        "id": "psy_c2_008",
        "topic": "Sampling",
        "question": (
            "A researcher studies only students from elite private schools in Mumbai "
            "and concludes findings for all Indian students. This is an example of:"
        ),
        "options": [
            "A representative sample",
            "A random sample",
            "A biased sample",
            "A longitudinal study",
        ],
        "answer": 2,
        "explanation": (
            "Step 1: A biased sample does not accurately represent the population.\n"
            "Step 2: Elite private school students in Mumbai differ significantly from "
            "students in rural areas or government schools in terms of socio-economic "
            "status, resources, and opportunities.\n"
            "Step 3: Generalizing from this limited sample to all Indian students "
            "leads to biased conclusions.\n"
            "Conclusion: Option C is correct."
        ),
        "difficulty": "Medium",
        "type": "mcq",
        "competency": True,
    },
    {
        "id": "psy_c2_009",
        "topic": "Surveys",
        "question": (
            "An advantage of the survey method is that it:"
        ),
        "options": [
            "Always gives accurate personal information",
            "Can collect data from large samples quickly",
            "Establishes cause-effect relationships",
            "Requires no scientific planning",
        ],
        "answer": 1,
        "explanation": (
            "Step 1: Surveys using questionnaires can reach many participants quickly "
            "and efficiently.\n"
            "Step 2: Self-reports may be biased, so accuracy is not guaranteed.\n"
            "Step 3: Surveys are correlational, not experimental; they don't establish "
            "causation.\n"
            "Conclusion: Option B is correct."
        ),
        "difficulty": "Medium",
        "type": "mcq",
        "competency": True,
    },
    {
        "id": "psy_c2_010",
        "topic": "Observation",
        "question": (
            "One disadvantage of observation method is:"
        ),
        "options": [
            "It is very quick to conduct",
            "Observer bias can affect results",
            "It always produces numerical data",
            "It does not require any training",
        ],
        "answer": 1,
        "explanation": (
            "Step 1: Observer bias occurs when the researcher's expectations "
            "influence what is observed or recorded.\n"
            "Step 2: Additionally, the Hawthorne effect means participants may "
            "behave differently when they know they are being observed.\n"
            "Step 3: Observation is time-consuming and often produces qualitative "
            "data, not numerical.\n"
            "Conclusion: Option B is correct."
        ),
        "difficulty": "Medium",
        "type": "mcq",
        "competency": True,
    },
    # Chapter 3 - Attention
    {
        "id": "psy_c3_001",
        "topic": "Attention",
        "question": (
            "Which of the following is an OUTER determinant of attention?"
        ),
        "options": [
            "Interest",
            "Need",
            "Movement",
            "Emotion",
        ],
        "answer": 2,
        "explanation": (
            "Step 1: Outer determinants are physical factors in the environment: "
            "size, colour, movement, change, intensity, contrast.\n"
            "Step 2: Interest, need, and emotion are inner (psychological) "
            "determinants.\n"
            "Step 3: Movement is a physical/external factor that captures attention "
            "(e.g., a moving vehicle catches our eye).\n"
            "Conclusion: Option C is correct."
        ),
        "difficulty": "Easy",
        "type": "mcq",
        "competency": True,
    },
    {
        "id": "psy_c3_002",
        "topic": "Attention",
        "question": (
            "A hungry student walking to school is more likely to notice a food "
            "stall. This demonstrates the role of which determinant of attention?"
        ),
        "options": ["Size", "Need", "Contrast", "Movement"],
        "answer": 1,
        "explanation": (
            "Step 1: Inner determinants of attention include need, interest, and "
            "emotion.\n"
            "Step 2: Hunger is a physiological need that directs attention toward "
            "food-related stimuli.\n"
            "Step 3: This is an internal psychological factor, not a physical one.\n"
            "Conclusion: Option B is correct."
        ),
        "difficulty": "Easy",
        "type": "mcq",
        "competency": True,
    },
    {
        "id": "psy_c3_003",
        "topic": "Attention",
        "question": (
            "Bright red colour of a 'STOP' sign is effective because it uses which "
            "outer determinant of attention?"
        ),
        "options": ["Size", "Intensity", "Colour", "Proximity"],
        "answer": 2,
        "explanation": (
            "Step 1: Colour is an outer (physical) determinant of attention.\n"
            "Step 2: Bright red is highly visible and stands out against most "
            "backgrounds.\n"
            "Step 3: This is why traffic signs universally use bright colours.\n"
            "Conclusion: Option C is correct."
        ),
        "difficulty": "Easy",
        "type": "mcq",
        "competency": True,
    },
    # Chapter 3 - Sensation vs Perception
    {
        "id": "psy_c3_004",
        "topic": "Sensation vs Perception",
        "question": (
            "The difference between sensation and perception is best described as:"
        ),
        "options": [
            "Sensation is mental; perception is physical",
            "Sensation is detection of stimuli; perception is interpretation",
            "Perception comes before sensation",
            "They are the same process",
        ],
        "answer": 1,
        "explanation": (
            "Step 1: Sensation is the process of detecting physical energy through "
            "sensory organs.\n"
            "Step 2: Perception is the organization and interpretation of that sensory "
            "information into meaningful experiences.\n"
            "Step 3: Sensation provides the 'raw data'; perception gives it 'meaning'.\n"
            "Conclusion: Option B is correct."
        ),
        "difficulty": "Medium",
        "type": "mcq",
        "competency": True,
    },
    {
        "id": "psy_c3_005",
        "topic": "Sensation vs Perception",
        "question": (
            "When you enter a dark room from bright sunlight, your eyes gradually "
            "adjust. This process of detecting light energy through the retina is:"
        ),
        "options": ["Perception", "Sensation", "Thinking", "Memory"],
        "answer": 1,
        "explanation": (
            "Step 1: Sensation involves detecting physical energy (light, sound, "
            "pressure, etc.) through sensory receptors.\n"
            "Step 2: The retina detecting light is a sensory process - sensation.\n"
            "Step 3: Interpreting that you are now in a dim room is perception.\n"
            "Conclusion: Option B is correct."
        ),
        "difficulty": "Medium",
        "type": "mcq",
        "competency": True,
    },
    # Chapter 3 - Perceptual Organization
    {
        "id": "psy_c3_006",
        "topic": "Perceptual Organization",
        "question": (
            "Looking at a crowd, you identify your friend by her face (figure) "
            "against the crowd (ground). This demonstrates which principle?"
        ),
        "options": ["Law of Similarity", "Law of Proximity", "Figure-Ground", "Law of Closure"],
        "answer": 2,
        "explanation": (
            "Step 1: Figure-ground principle states that we separate the central "
            "object of focus (figure) from the background (ground).\n"
            "Step 2: Your friend's face becomes the figure; the crowd is the ground.\n"
            "Step 3: This principle helps us focus on relevant information.\n"
            "Conclusion: Option C is correct."
        ),
        "difficulty": "Medium",
        "type": "mcq",
        "competency": True,
    },
    {
        "id": "psy_c3_007",
        "topic": "Perceptual Organization",
        "question": (
            "When reading, you can still understand a word even if some letters are "
            "missing (e.g., 'P_ch_l__y'). This demonstrates:"
        ),
        "options": [
            "Law of Similarity",
            "Law of Closure",
            "Law of Proximity",
            "Law of Continuity",
        ],
        "answer": 1,
        "explanation": (
            "Step 1: The law of closure states that we tend to fill in gaps to "
            "perceive complete, whole objects.\n"
            "Step 2: Your brain fills in the missing letters to complete 'Psychology'.\n"
            "Step 3: This is a fundamental principle of perceptual organization.\n"
            "Conclusion: Option B is correct."
        ),
        "difficulty": "Medium",
        "type": "mcq",
        "competency": True,
    },
    {
        "id": "psy_c3_008",
        "topic": "Perceptual Organization",
        "question": (
            "Seeing a row of 'XXXX   OOOO   XXXX   OOOO' as two alternating rows "
            "demonstrates:"
        ),
        "options": [
            "Law of Proximity",
            "Law of Similarity",
            "Law of Closure",
            "Law of Simplicity",
        ],
        "answer": 1,
        "explanation": (
            "Step 1: The law of similarity states that similar elements tend to be "
            "grouped together.\n"
            "Step 2: The X's are similar to each other, and the O's are similar "
            "to each other.\n"
            "Step 3: Your brain groups the X's together and O's together, not "
            "as single rows.\n"
            "Conclusion: Option B is correct."
        ),
        "difficulty": "Medium",
        "type": "mcq",
        "competency": False,
    },
    {
        "id": "psy_c3_009",
        "topic": "Perceptual Organization",
        "question": (
            "Gestalt psychologists are known for emphasizing that:"
        ),
        "options": [
            "We perceive individual elements first",
            "The whole is different from the sum of its parts",
            "All perception is learned",
            "Mental processes cannot be studied scientifically",
        ],
        "answer": 1,
        "explanation": (
            "Step 1: Gestalt means 'whole' or 'form' in German.\n"
            "Step 2: The central tenet is that the whole perception is different "
            "from and greater than the sum of individual sensory elements.\n"
            "Step 3: Example: a melody is recognized as a whole tune, not just "
            "individual notes.\n"
            "Conclusion: Option B is correct."
        ),
        "difficulty": "Medium",
        "type": "mcq",
        "competency": True,
    },
]


def solve_mcq(params: Dict) -> Dict:
    """Solve an MCQ question."""
    question_id = params.get("id", "")
    user_answer = params.get("user_answer", None)

    q_item = next((q for q in MCQ_BANK if q["id"] == question_id), None)
    if not q_item:
        return {
            "answer": None,
            "steps": [f"Question ID '{question_id}' not found in bank."],
            "verification": {"found": False},
        }

    correct = q_item["answer"]
    is_correct = (user_answer == correct) if user_answer is not None else None

    steps = [
        f"Step 1: Question - {q_item['question']}",
        f"Step 2: Options: {q_item['options']}",
        f"Step 3: Correct answer index = {correct} ('{q_item['options'][correct]}')",
    ]
    if is_correct is not None:
        result = "CORRECT ✓" if is_correct else "INCORRECT ✗"
        steps.append(
            f"Step 4: Your answer = {user_answer} ('{q_item['options'][user_answer]}')"
        )
        steps.append(f"Step 5: Result: {result}")
    steps.append(f"Explanation:\n{q_item['explanation']}")

    return {
        "answer": {
            "correct_option_index": correct,
            "correct_option_text": q_item["options"][correct],
            "user_correct": is_correct,
        },
        "steps": steps,
        "verification": {
            "question_id": question_id,
            "topic": q_item["topic"],
            "difficulty": q_item["difficulty"],
            "competency_based": q_item.get("competency", False),
        },
    }


# ============================================================================
# FILL IN THE BLANK SOLVER
# ============================================================================

FILL_BLANK_BANK = [
    {
        "id": "psy_fb_001",
        "topic": "Definition of Psychology",
        "question": "Psychology is the scientific study of _______ and _______ processes.",
        "answer": "behaviour",
        "alternatives": ["behavior", "behaviour"],
        "explanation": (
            "Step 1: Modern definition: Psychology = scientific study of behaviour "
            "and mental processes.\n"
            "Step 2: Behaviour = observable actions; mental processes = thoughts, "
            "feelings, etc.\n"
            "Conclusion: The blank is 'behaviour'."
        ),
        "difficulty": "Easy",
    },
    {
        "id": "psy_fb_002",
        "topic": "Schools of Thought",
        "question": "The first psychology laboratory was established by Wilhelm Wundt in ____.",
        "answer": "1879",
        "alternatives": ["1879"],
        "explanation": (
            "Step 1: Wilhelm Wundt established the first psychology lab in Leipzig, "
            "Germany.\n"
            "Step 2: The year was 1879.\n"
            "Step 3: This is considered the formal beginning of psychology as a "
            "separate scientific discipline.\n"
            "Conclusion: The answer is 1879."
        ),
        "difficulty": "Easy",
    },
    {
        "id": "psy_fb_003",
        "topic": "Schools of Thought",
        "question": (
            "_______ is known as the 'Father of Experimental Psychology'."
        ),
        "answer": "Wilhelm Wundt",
        "alternatives": ["Wundt", "Wilhelm Wundt"],
        "explanation": (
            "Step 1: Wilhelm Wundt established the first experimental psychology "
            "laboratory in 1879.\n"
            "Step 2: He used introspection as his main method.\n"
            "Step 3: He is credited with making psychology a formal, independent "
            "scientific discipline.\n"
            "Conclusion: Wilhelm Wundt is the answer."
        ),
        "difficulty": "Easy",
    },
    {
        "id": "psy_fb_004",
        "topic": "Schools of Thought",
        "question": "The famous saying 'The whole is other than the sum of its parts' is attributed to _______ psychology.",
        "answer": "Gestalt",
        "alternatives": ["Gestalt", "gestalt"],
        "explanation": (
            "Step 1: Gestalt psychology emphasizes holistic perception.\n"
            "Step 2: The saying was expressed by Gestalt psychologist Kurt Koffka.\n"
            "Step 3: Key Gestalt psychologists: Max Wertheimer and Wolfgang Köhler.\n"
            "Conclusion: Gestalt is the answer."
        ),
        "difficulty": "Medium",
    },
    {
        "id": "psy_fb_005",
        "topic": "Schools of Thought",
        "question": "In Behaviourism, psychology is defined as the study of _______.",
        "answer": "observable behaviour",
        "alternatives": ["observable behavior", "observable behaviour"],
        "explanation": (
            "Step 1: Behaviourists (Watson, Skinner) rejected the study of internal "
            "mental states.\n"
            "Step 2: They defined psychology strictly as the science of observable "
            "behaviour.\n"
            "Step 3: This was a reaction to the introspective methods of structuralism.\n"
            "Conclusion: 'observable behaviour' is the answer."
        ),
        "difficulty": "Medium",
    },
    {
        "id": "psy_fb_006",
        "topic": "Methods of Psychology",
        "question": "When the same participants are studied over a long period, it is called a _______ study.",
        "answer": "longitudinal",
        "alternatives": ["longitudinal"],
        "explanation": (
            "Step 1: Longitudinal studies follow the same individuals over time.\n"
            "Step 2: Cross-sectional studies compare different groups at one point.\n"
            "Step 3: Example: tracking students from Class 9 to Class 12.\n"
            "Conclusion: 'longitudinal' is the answer."
        ),
        "difficulty": "Medium",
    },
    {
        "id": "psy_fb_007",
        "topic": "Methods of Psychology",
        "question": "In a _______ sample, every member of the population has an equal chance of being selected.",
        "answer": "random",
        "alternatives": ["random"],
        "explanation": (
            "Step 1: Random sampling ensures equal probability of selection.\n"
            "Step 2: Representative samples mirror population characteristics.\n"
            "Step 3: Biased samples systematically exclude some groups.\n"
            "Conclusion: 'random' is the answer."
        ),
        "difficulty": "Medium",
    },
    {
        "id": "psy_fb_008",
        "topic": "Variables in Experiment",
        "question": (
            "The variable that is manipulated by the researcher is called the "
            "_______ variable."
        ),
        "answer": "independent",
        "alternatives": ["independent"],
        "explanation": (
            "Step 1: Independent variable (IV) = manipulated by researcher.\n"
            "Step 2: Dependent variable (DV) = measured as outcome.\n"
            "Step 3: Control variables are kept constant.\n"
            "Conclusion: 'independent' is the answer."
        ),
        "difficulty": "Medium",
    },
    {
        "id": "psy_fb_009",
        "topic": "Attention",
        "question": (
            "_______ is the tendency to fill in gaps in incomplete figures to "
            "perceive a complete whole."
        ),
        "answer": "Closure",
        "alternatives": ["Closure", "closure"],
        "explanation": (
            "Step 1: The law of closure is one of the five Gestalt laws of grouping.\n"
            "Step 2: Our brain automatically fills gaps to create complete, "
            "meaningful patterns.\n"
            "Step 3: Example: a circle with a small gap is still seen as a circle.\n"
            "Conclusion: 'Closure' is the answer."
        ),
        "difficulty": "Medium",
    },
    {
        "id": "psy_fb_010",
        "topic": "Sensation vs Perception",
        "question": "_______ is the raw data input from the environment through sensory organs.",
        "answer": "Sensation",
        "alternatives": ["Sensation", "sensation"],
        "explanation": (
            "Step 1: Sensation = detecting physical energy through sensory organs.\n"
            "Step 2: Perception = interpreting and organizing sensory inputs.\n"
            "Step 3: Sensation is 'input'; perception is 'meaningful interpretation'.\n"
            "Conclusion: 'Sensation' is the answer."
        ),
        "difficulty": "Medium",
    },
    {
        "id": "psy_fb_011",
        "topic": "Perceptual Organization",
        "question": (
            "According to the _______ principle, we separate the central object "
            "(figure) from the background (ground)."
        ),
        "answer": "figure-ground",
        "alternatives": ["figure-ground", "figure ground", "figure/ground"],
        "explanation": (
            "Step 1: Figure-ground is a fundamental principle of perception.\n"
            "Step 2: The figure is the focus of attention; the ground is the "
            "background.\n"
            "Step 3: We can switch between figure and ground (e.g., Rubin's vase/face).\n"
            "Conclusion: 'figure-ground' is the answer."
        ),
        "difficulty": "Medium",
    },
    {
        "id": "psy_fb_012",
        "topic": "Perceptual Organization",
        "question": (
            "Objects close to each other tend to be grouped together - this is "
            "the law of _______."
        ),
        "answer": "proximity",
        "alternatives": ["proximity"],
        "explanation": (
            "Step 1: The law of proximity states that nearby objects are perceived "
            "as belonging together.\n"
            "Step 2: This is one of the five Gestalt laws of perceptual grouping.\n"
            "Step 3: Example: dots arranged close in pairs are seen as pairs.\n"
            "Conclusion: 'proximity' is the answer."
        ),
        "difficulty": "Medium",
    },
]


def solve_fill_blank(params: Dict) -> Dict:
    """Solve a fill-in-the-blank question."""
    question_id = params.get("id", "")
    user_answer = params.get("user_answer", "").strip() if params.get("user_answer") else None

    q_item = next((q for q in FILL_BLANK_BANK if q["id"] == question_id), None)
    if not q_item:
        return {
            "answer": None,
            "steps": [f"Question ID '{question_id}' not found."],
            "verification": {"found": False},
        }

    correct_ans = q_item["answer"]
    alts = q_item.get("alternatives", [correct_ans])

    def check_ans(ans):
        if ans is None:
            return False
        a = ans.strip().lower()
        return a == correct_ans.lower() or a in [x.lower() for x in alts]

    is_correct = check_ans(user_answer)

    steps = [
        f"Step 1: Question - {q_item['question']}",
        f"Step 2: Correct answer: '{correct_ans}'",
        f"Step 3: Accepted alternatives: {alts}",
    ]
    if user_answer is not None:
        result = "CORRECT ✓" if is_correct else "INCORRECT ✗"
        steps.append(f"Step 4: Your answer: '{user_answer}'")
        steps.append(f"Step 5: Result: {result}")
    steps.append(f"Explanation:\n{q_item['explanation']}")

    return {
        "answer": {
            "correct": correct_ans,
            "user_answer": user_answer,
            "is_correct": is_correct,
        },
        "steps": steps,
        "verification": {
            "question_id": question_id,
            "topic": q_item["topic"],
            "alternatives": alts,
        },
    }


# ============================================================================
# SHORT ANSWER SOLVER
# ============================================================================


    return {"status": "ok", "note": "truncated"}
