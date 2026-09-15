"""
CISCE Class 12 Psychology - Deterministic Question Generator
ISCE Class 12 Psychology (c12_psy_001 through c12_psy_015)
Fully self-contained, no external LLM/API calls.
"""

import random
import string
from typing import Dict, List, Any, Optional, Callable

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

TOPIC_META: Dict[str, Dict[str, Any]] = {
    "c12_psy_001": {"name": "Introduction to Psychology", "chapter": "1"},
    "c12_psy_002": {"name": "Methods of Psychology", "chapter": "2"},
    "c12_psy_003": {"name": "The Roots of Psychology", "chapter": "3"},
    "c12_psy_004": {"name": "The Nervous System", "chapter": "4"},
    "c12_psy_005": {"name": "States of Consciousness", "chapter": "5"},
    "c12_psy_006": {"name": "Attention and Perception", "chapter": "6"},
    "c12_psy_007": {"name": "Learning", "chapter": "7"},
    "c12_psy_008": {"name": "Memory", "chapter": "8"},
    "c12_psy_009": {"name": "Intelligence and Aptitude", "chapter": "9"},
    "c12_psy_010": {"name": "Motivation and Emotion", "chapter": "10"},
    "c12_psy_011": {"name": "Personality", "chapter": "11"},
    "c12_psy_012": {"name": "Psychological Disorders", "chapter": "12"},
    "c12_psy_013": {"name": "Therapeutic Approaches", "chapter": "13"},
    "c12_psy_014": {"name": "Social Psychology", "chapter": "14"},
    "c12_psy_015": {"name": "Attitudes and Prejudice", "chapter": "15"},
}

QUESTION_TYPES = ["mcq", "fill_blank", "short_answer", "long_answer", "numerical"]

# ---------------------------------------------------------------------------
# Question-Bank  (each entry: dict with all fields)
# ---------------------------------------------------------------------------

_QUESTION_BANK: List[Dict[str, Any]] = [
    # ===== c12_psy_001 : Introduction to Psychology =====
    {
        "id": "psy_001_mcq_01",
        "question_text": "The word 'Psychology' is derived from two Greek words 'Psyche' and 'Logos'. What does 'Psyche' mean?",
        "question_type": "mcq",
        "options": ["Mind", "Soul", "Body", "Spirit"],
        "answer": "Soul",
        "difficulty": 0.2,
        "topic": "c12_psy_001",
        "solution": "The Greek word 'Psyche' means 'soul' and 'Logos' means 'study'. Thus Psychology is the study of the soul.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_001_fb_01",
        "question_text": "Psychology is defined as the scientific study of _____ and _____ processes.",
        "question_type": "fill_blank",
        "options": [],
        "answer": "behavior, mental",
        "difficulty": 0.3,
        "topic": "c12_psy_001",
        "solution": "Psychology studies both observable behavior and internal mental processes.",
        "verification": "solve_fill_blank",
    },
    {
        "id": "psy_001_sa_01",
        "question_text": "Define Psychology in two lines.",
        "question_type": "short_answer",
        "options": [],
        "answer": "Psychology is the scientific study of behavior and mental processes.",
        "difficulty": 0.3,
        "topic": "c12_psy_001",
        "solution": "A concise definition mentioning scientific study, behavior, and mental processes earns full credit.",
        "verification": "solve_short_answer",
    },
    {
        "id": "psy_001_la_01",
        "question_text": "Explain why Psychology is considered a science. Discuss any three characteristics of scientific methods.",
        "question_type": "long_answer",
        "options": [],
        "answer": "Psychology is empirical, systematic, and objective; it uses observation, experimentation, and replication.",
        "difficulty": 0.7,
        "topic": "c12_psy_001",
        "solution": "Key points: (1) Empirical — based on observation/experiment. (2) Systematic — ordered steps. (3) Objective — free from bias. (4) Replicable — results repeatable. (5) Predictive — makes testable predictions.",
        "verification": "solve_long_answer",
    },
    {
        "id": "psy_001_mcq_02",
        "question_text": "Who is considered the father of modern Psychology?",
        "question_type": "mcq",
        "options": ["William James", "Wilhelm Wundt", "Sigmund Freud", "John B. Watson"],
        "answer": "Wilhelm Wundt",
        "difficulty": 0.2,
        "topic": "c12_psy_001",
        "solution": "Wilhelm Wundt established the first psychology laboratory in Leipzig, Germany in 1879.",
        "verification": "solve_mcq",
    },

    # ===== c12_psy_002 : Methods of Psychology =====
    {
        "id": "psy_002_mcq_01",
        "question_text": "Which method of psychology involves studying a single individual in great depth?",
        "question_type": "mcq",
        "options": ["Experimental method", "Case study", "Survey method", "Correlational method"],
        "answer": "Case study",
        "difficulty": 0.3,
        "topic": "c12_psy_002",
        "solution": "A case study is an in-depth analysis of a single individual, group, or event.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_002_fb_01",
        "question_text": "In the _____ method, the researcher manipulates one variable and observes the effect on another.",
        "question_type": "fill_blank",
        "options": [],
        "answer": "experimental",
        "difficulty": 0.4,
        "topic": "c12_psy_002",
        "solution": "The experimental method involves independent variable manipulation and dependent variable measurement.",
        "verification": "solve_fill_blank",
    },
    {
        "id": "psy_002_num_01",
        "question_text": "In an experiment, the group that receives the treatment is called the _____ group and the group that does not is called the _____ group. If 40 participants are equally divided, how many are in each group?",
        "question_type": "numerical",
        "options": [],
        "answer": "20",
        "difficulty": 0.5,
        "topic": "c12_psy_002",
        "solution": "40 ÷ 2 = 20 participants per group (experimental and control).",
        "verification": "solve_numerical",
    },
    {
        "id": "psy_002_sa_01",
        "question_text": "Differentiate between independent variable and dependent variable with one example each.",
        "question_type": "short_answer",
        "options": [],
        "answer": "IV is manipulated by researcher; DV is measured. Example: IV=amount of sleep, DV=reaction time.",
        "difficulty": 0.4,
        "topic": "c12_psy_002",
        "solution": "IV: the factor changed by researcher. DV: the outcome measured. Clear example required for full marks.",
        "verification": "solve_short_answer",
    },
    {
        "id": "psy_002_la_01",
        "question_text": "Describe the survey method in psychology. Explain its advantages and limitations.",
        "question_type": "long_answer",
        "options": [],
        "answer": "Survey collects info from many people via questionnaires/interviews; advantages: quick, large sample; limitations: response bias, sampling issues.",
        "difficulty": 0.6,
        "topic": "c12_psy_002",
        "solution": "Define survey method, mention tools (questionnaire/interview), advantages (cost-effective, large N), limitations (social desirability, non-representative samples).",
        "verification": "solve_long_answer",
    },

    # ===== c12_psy_003 : The Roots of Psychology =====
    {
        "id": "psy_003_mcq_01",
        "question_text": "Which school of psychology was founded by John B. Watson?",
        "question_type": "mcq",
        "options": ["Structuralism", "Functionalism", "Behaviorism", "Gestalt Psychology"],
        "answer": "Behaviorism",
        "difficulty": 0.3,
        "topic": "c12_psy_003",
        "solution": "John B. Watson published 'Psychology as the Behaviorist Views It' in 1913, founding Behaviorism.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_003_fb_01",
        "question_text": "The school of psychology founded by William James is called _____.",
        "question_type": "fill_blank",
        "options": [],
        "answer": "Functionalism",
        "difficulty": 0.3,
        "topic": "c12_psy_003",
        "solution": "Functionalism, influenced by Darwin, studied the purpose of consciousness.",
        "verification": "solve_fill_blank",
    },
    {
        "id": "psy_003_mcq_02",
        "question_text": "Gestalt Psychology is known for its emphasis on:",
        "question_type": "mcq",
        "options": [
            "Breaking experience into elements",
            "The whole is greater than the sum of its parts",
            "Introspection as the main method",
            "Observable behavior only"
        ],
        "answer": "The whole is greater than the sum of its parts",
        "difficulty": 0.4,
        "topic": "c12_psy_003",
        "solution": "Gestalt psychologists (Wertheimer, Köhler, Koffka) emphasized holistic perception.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_003_sa_01",
        "question_text": "Explain the concept of 'Functionalism' in psychology. Who were its main proponents?",
        "question_type": "short_answer",
        "options": [],
        "answer": "Functionalism studied the function/purpose of consciousness and behavior. Main proponents: William James and John Dewey.",
        "difficulty": 0.5,
        "topic": "c12_psy_003",
        "solution": "Must mention focus on function/utility of mental processes, and name James and Dewey for full credit.",
        "verification": "solve_short_answer",
    },

    # ===== c12_psy_004 : The Nervous System =====
    {
        "id": "psy_004_mcq_01",
        "question_text": "Which part of the neuron transmits information away from the cell body?",
        "question_type": "mcq",
        "options": ["Dendrites", "Axon", "Soma", "Synapse"],
        "answer": "Axon",
        "difficulty": 0.3,
        "topic": "c12_psy_004",
        "solution": "The axon carries nerve impulses away from the cell body (soma) toward other neurons.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_004_fb_01",
        "question_text": "The junction where two neurons meet is called the _____.",
        "question_type": "fill_blank",
        "options": [],
        "answer": "synapse",
        "difficulty": 0.3,
        "topic": "c12_psy_004",
        "solution": "The synapse is the gap (synaptic cleft) between the terminal button of one neuron and the dendrite of another.",
        "verification": "solve_fill_blank",
    },
    {
        "id": "psy_004_mcq_02",
        "question_text": "The largest part of the human brain responsible for higher cognitive functions is the:",
        "question_type": "mcq",
        "options": ["Cerebellum", "Brainstem", "Cerebral Cortex", "Limbic System"],
        "answer": "Cerebral Cortex",
        "difficulty": 0.4,
        "topic": "c12_psy_004",
        "solution": "The cerebral cortex is the outer layer of the cerebrum, responsible for thinking, perceiving, and planning.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_004_num_01",
        "question_text": "A neuron has 10,000 to 200,000 synaptic connections. If a researcher counts 150,000 synapses on a neuron, what percentage does this represent of the maximum possible (200,000)?",
        "question_type": "numerical",
        "options": [],
        "answer": "75",
        "difficulty": 0.6,
        "topic": "c12_psy_004",
        "solution": "(150000 / 200000) × 100 = 75%.",
        "verification": "solve_numerical",
    },
    {
        "id": "psy_004_la_01",
        "question_text": "Describe the structure of a neuron and explain how a nerve impulse is transmitted from one neuron to another.",
        "question_type": "long_answer",
        "options": [],
        "answer": "A neuron has a cell body, dendrites, axon; impulse travels via action potential and is transmitted across synapse via neurotransmitters.",
        "difficulty": 0.8,
        "topic": "c12_psy_004",
        "solution": "Cover: cell body (soma), dendrites (receive), axon (transmit), myelin sheath, nodes of Ranvier, synapse, neurotransmitters (e.g., acetylcholine).",
        "verification": "solve_long_answer",
    },

    # ===== c12_psy_005 : States of Consciousness =====
    {
        "id": "psy_005_mcq_01",
        "question_text": "During which stage of sleep does Rapid Eye Movement (REM) occur?",
        "question_type": "mcq",
        "options": ["Stage 1 NREM", "Stage 3 NREM", "REM Sleep", "Stage 4 NREM"],
        "answer": "REM Sleep",
        "difficulty": 0.3,
        "topic": "c12_psy_005",
        "solution": "REM sleep is characterized by rapid eye movements, vivid dreaming, and muscle atonia.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_005_fb_01",
        "question_text": "The sleep stage characterized by slow-wave brain activity and deep sleep is called _____ sleep.",
        "question_type": "fill_blank",
        "options": [],
        "answer": "NREM (non-REM)",
        "difficulty": 0.4,
        "topic": "c12_psy_005",
        "solution": "NREM sleep includes stages 1–4 and is characterized by slow, synchronized brain waves.",
        "verification": "solve_fill_blank",
    },
    {
        "id": "psy_005_mcq_02",
        "question_text": "Which drug is classified as a stimulant?",
        "question_type": "mcq",
        "options": ["Alcohol", "Heroin", "Caffeine", "Marijuana"],
        "answer": "Caffeine",
        "difficulty": 0.2,
        "topic": "c12_psy_005",
        "solution": "Caffeine is a central nervous system stimulant. Alcohol is a depressant; Heroin is an opioid; Marijuana is a cannabinoid.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_005_sa_01",
        "question_text": "What is hypnosis? Briefly describe its two main theories.",
        "question_type": "short_answer",
        "options": [],
        "answer": "Hypnosis is a trance-like state with focused attention and suggestibility. Theories: State theory (altered consciousness) and Non-state theory (social role/expectation).",
        "difficulty": 0.5,
        "topic": "c12_psy_005",
        "solution": "Must define hypnosis and mention both state and non-state theories for full credit.",
        "verification": "solve_short_answer",
    },

    # ===== c12_psy_006 : Attention and Perception =====
    {
        "id": "psy_006_mcq_01",
        "question_text": "Selective attention refers to the ability to:",
        "question_type": "mcq",
        "options": [
            "Process all stimuli simultaneously",
            "Focus on one stimulus while ignoring others",
            "Switch rapidly between tasks",
            "Divide attention equally"
        ],
        "answer": "Focus on one stimulus while ignoring others",
        "difficulty": 0.3,
        "topic": "c12_psy_006",
        "solution": "Selective attention filters stimuli, focusing on a chosen stimulus while filtering out others.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_006_fb_01",
        "question_text": "The famous cocktail party effect demonstrates the operation of _____ attention.",
        "question_type": "fill_blank",
        "options": [],
        "answer": "selective",
        "difficulty": 0.4,
        "topic": "c12_psy_006",
        "solution": "The cocktail party effect (Colin Cherry, 1953) shows how we selectively attend to one voice in a noisy room.",
        "verification": "solve_fill_blank",
    },
    {
        "id": "psy_006_mcq_02",
        "question_text": "The Müller-Lyer illusion is an example of:",
        "question_type": "mcq",
        "options": ["Depth perception", "Size constancy", "Illusion", "Perceptual set"],
        "answer": "Illusion",
        "difficulty": 0.3,
        "topic": "c12_psy_006",
        "solution": "The Müller-Lyer illusion misleads perception about line length due to contextual arrowheads.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_006_la_01",
        "question_text": "Explain the difference between sensation and perception. Describe the process of depth perception and mention two monocular cues.",
        "question_type": "long_answer",
        "options": [],
        "answer": "Sensation is detection of stimuli; perception is interpretation. Depth cues: relative size, linear perspective, interposition, etc.",
        "difficulty": 0.7,
        "topic": "c12_psy_006",
        "solution": "Define sensation vs perception. Explain binocular cues (retinal disparity, convergence) and monocular cues (relative size, linear perspective, texture gradient, interposition, relative height).",
        "verification": "solve_long_answer",
    },

    # ===== c12_psy_007 : Learning =====
    {
        "id": "psy_007_mcq_01",
        "question_text": "In classical conditioning, the stimulus that naturally elicits a response is called the:",
        "question_type": "mcq",
        "options": ["Conditioned Stimulus", "Unconditioned Stimulus", "Conditioned Response", "Neutral Stimulus"],
        "answer": "Unconditioned Stimulus",
        "difficulty": 0.3,
        "topic": "c12_psy_007",
        "solution": "US (e.g., food) naturally triggers UR (salivation) without prior learning.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_007_fb_01",
        "question_text": "In Pavlov's dog experiment, the sound of the bell is the _____ stimulus (after conditioning).",
        "question_type": "fill_blank",
        "options": [],
        "answer": "conditioned",
        "difficulty": 0.4,
        "topic": "c12_psy_007",
        "solution": "After conditioning, the bell (previously neutral) becomes the Conditioned Stimulus (CS) that triggers salivation.",
        "verification": "solve_fill_blank",
    },
    {
        "id": "psy_007_mcq_02",
        "question_text": "Which type of learning involves learning by observing others?",
        "question_type": "mcq",
        "options": ["Classical Conditioning", "Operant Conditioning", "Observational Learning", "Insight Learning"],
        "answer": "Observational Learning",
        "difficulty": 0.2,
        "topic": "c12_psy_007",
        "solution": "Observational learning (Bandura's social learning theory) occurs by watching and imitating models.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_007_num_01",
        "question_text": "In a reinforcement schedule, a rat receives food after every 5 correct responses. If the rat makes 60 responses in a session, how many food pellets does it receive?",
        "question_type": "numerical",
        "options": [],
        "answer": "12",
        "difficulty": 0.5,
        "topic": "c12_psy_007",
        "solution": "60 ÷ 5 = 12 food pellets. This is a fixed-ratio schedule.",
        "verification": "solve_numerical",
    },
    {
        "id": "psy_007_la_01",
        "question_text": "Describe operant conditioning. Differentiate between positive reinforcement and negative reinforcement with suitable examples.",
        "question_type": "long_answer",
        "options": [],
        "answer": "Operant conditioning (Skinner) strengthens behavior by consequences. Positive reinforcement adds pleasant stimulus; negative reinforcement removes aversive stimulus.",
        "difficulty": 0.7,
        "topic": "c12_psy_007",
        "solution": "Define operant conditioning, the Skinner box, reinforcement vs punishment, then explain positive reinforcement (e.g., praise) vs negative reinforcement (e.g., removing noise).",
        "verification": "solve_long_answer",
    },

    # ===== c12_psy_008 : Memory =====
    {
        "id": "psy_008_mcq_01",
        "question_text": "The three stages of memory, in order, are:",
        "question_type": "mcq",
        "options": [
            "Sensory → Short-term → Long-term",
            "Short-term → Sensory → Long-term",
            "Long-term → Short-term → Sensory",
            "Sensory → Long-term → Short-term"
        ],
        "answer": "Sensory → Short-term → Long-term",
        "difficulty": 0.3,
        "topic": "c12_psy_008",
        "solution": "Atkinson & Shiffrin's modal model: Sensory memory (iconic/echoic) → STM (7±2) → LTM.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_008_fb_01",
        "question_text": "The process of converting information into a form that can be stored in memory is called _____.",
        "question_type": "fill_blank",
        "options": [],
        "answer": "encoding",
        "difficulty": 0.4,
        "topic": "c12_psy_008",
        "solution": "Encoding is the first stage of memory — transforming sensory input into a storable format.",
        "verification": "solve_fill_blank",
    },
    {
        "id": "psy_008_num_01",
        "question_text": "According to Miller's 'The Magical Number Seven', STM can hold 7 ± 2 items. What is the minimum number of items STM can hold?",
        "question_type": "numerical",
        "options": [],
        "answer": "5",
        "difficulty": 0.3,
        "topic": "c12_psy_008",
        "solution": "7 - 2 = 5 items minimum in Short-Term Memory.",
        "verification": "solve_numerical",
    },
    {
        "id": "psy_008_mcq_02",
        "question_text": "Which type of long-term memory stores facts and general knowledge?",
        "question_type": "mcq",
        "options": ["Episodic memory", "Semantic memory", "Procedural memory", "Priming memory"],
        "answer": "Semantic memory",
        "difficulty": 0.4,
        "topic": "c12_psy_008",
        "solution": "Semantic memory stores facts, concepts, and general knowledge (Tulving, 1972).",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_008_sa_01",
        "question_text": "What is the serial position effect? Explain its two components.",
        "question_type": "short_answer",
        "options": [],
        "answer": "Serial position effect: tendency to recall first (primacy) and last (recency) items in a list better than middle items.",
        "difficulty": 0.5,
        "topic": "c12_psy_008",
        "solution": "Must mention both primacy effect (early items → LTM) and recency effect (late items → STM).",
        "verification": "solve_short_answer",
    },

    # ===== c12_psy_009 : Intelligence and Aptitude =====
    {
        "id": "psy_009_mcq_01",
        "question_text": "Who developed the first successful intelligence test?",
        "question_type": "mcq",
        "options": ["Sigmund Freud", "Alfred Binet", "Charles Spearman", "Howard Gardner"],
        "answer": "Alfred Binet",
        "difficulty": 0.3,
        "topic": "c12_psy_009",
        "solution": "Alfred Binet and Theodore Simon developed the first IQ test in 1905 for identifying children needing special help.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_009_fb_01",
        "question_text": "The formula for calculating IQ (Intelligence Quotient) is: IQ = (Mental Age / _____ Age) × 100.",
        "question_type": "fill_blank",
        "options": [],
        "answer": "chronological",
        "difficulty": 0.4,
        "topic": "c12_psy_009",
        "solution": "IQ = (MA / CA) × 100, where MA = Mental Age and CA = Chronological Age.",
        "verification": "solve_fill_blank",
    },
    {
        "id": "psy_009_num_01",
        "question_text": "A child of chronological age 10 has a mental age of 12. Calculate the IQ using the formula IQ = (MA/CA) × 100.",
        "question_type": "numerical",
        "options": [],
        "answer": "120",
        "difficulty": 0.5,
        "topic": "c12_psy_009",
        "solution": "IQ = (12 / 10) × 100 = 120.",
        "verification": "solve_numerical",
    },
    {
        "id": "psy_009_mcq_02",
        "question_text": "Howard Gardner's theory of Multiple Intelligences proposes that intelligence is:",
        "question_type": "mcq",
        "options": [
            "A single general ability",
            "A set of independent abilities",
            "Entirely determined by genetics",
            "Measured only by IQ tests"
        ],
        "answer": "A set of independent abilities",
        "difficulty": 0.3,
        "topic": "c12_psy_009",
        "solution": "Gardner identified 8-9 distinct types of intelligence (linguistic, logical-mathematical, spatial, musical, bodily-kinesthetic, etc.).",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_009_la_01",
        "question_text": "Discuss Spearman's Two-Factor Theory of Intelligence. How does it differ from Thurstone's Primary Mental Abilities theory?",
        "question_type": "long_answer",
        "options": [],
        "answer": "Spearman: g factor (general) + s factor (specific). Thurstone: 7 independent abilities (verbal, numerical, spatial, etc.)",
        "difficulty": 0.8,
        "topic": "c12_psy_009",
        "solution": "Explain Spearman's g and s, factor analysis method. Contrast with Thurstone's group factor theory listing the 7 primary abilities.",
        "verification": "solve_long_answer",
    },

    # ===== c12_psy_010 : Motivation and Emotion =====
    {
        "id": "psy_010_mcq_01",
        "question_text": "Which theory of motivation is based on the concept of homeostasis?",
        "question_type": "mcq",
        "options": ["Instinct Theory", "Drive Reduction Theory", "Arousal Theory", "Incentive Theory"],
        "answer": "Drive Reduction Theory",
        "difficulty": 0.4,
        "topic": "c12_psy_010",
        "solution": "Drive Reduction Theory (Hull, 1943) posits that physiological needs create drives that motivate behavior to restore balance.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_010_fb_01",
        "question_text": "Maslow's hierarchy of needs places _____ needs at the top of the pyramid.",
        "question_type": "fill_blank",
        "options": [],
        "answer": "self-actualization",
        "difficulty": 0.3,
        "topic": "c12_psy_010",
        "solution": "Maslow's pyramid: Physiological → Safety → Love/Belonging → Esteem → Self-Actualization.",
        "verification": "solve_fill_blank",
    },
    {
        "id": "psy_010_mcq_02",
        "question_text": "The James-Lange theory of emotion states that:",
        "question_type": "mcq",
        "options": [
            "Stimulus → Emotion → Physiological response",
            "Stimulus → Physiological response → Emotion",
            "Emotion and physiological response occur simultaneously",
            "Emotion causes physiological response"
        ],
        "answer": "Stimulus → Physiological response → Emotion",
        "difficulty": 0.5,
        "topic": "c12_psy_010",
        "solution": "James-Lange: we feel emotion because of physiological changes (e.g., we are afraid because we tremble).",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_010_la_01",
        "question_text": "Explain Maslow's Hierarchy of Needs. Why is it called a 'hierarchy'? Critically evaluate the theory.",
        "question_type": "long_answer",
        "options": [],
        "answer": "Maslow's hierarchy: physiological, safety, love/belonging, esteem, self-actualization. Called hierarchy because needs are fulfilled in order; lower needs must be satisfied before higher ones.",
        "difficulty": 0.8,
        "topic": "c12_psy_010",
        "solution": "Describe each level, explain the hierarchy concept, then critique: cross-cultural issues, rigidity of order, self-actualization not universal.",
        "verification": "solve_long_answer",
    },

    # ===== c12_psy_011 : Personality =====
    {
        "id": "psy_011_mcq_01",
        "question_text": "Freud's structural model of personality consists of:",
        "question_type": "mcq",
        "options": [
            "Ego, Superego, Id",
            "Id, Ego, Superego",
            "Superego, Id, Ego",
            "Ego, Id, Superego"
        ],
        "answer": "Id, Ego, Superego",
        "difficulty": 0.3,
        "topic": "c12_psy_011",
        "solution": "Freud's tripartite model: Id (instinctual), Ego (rational), Superego (moral). Order is Id, Ego, Superego.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_011_fb_01",
        "question_text": "According to Freud, the _____ operates on the pleasure principle.",
        "question_type": "fill_blank",
        "options": [],
        "answer": "id",
        "difficulty": 0.3,
        "topic": "c12_psy_011",
        "solution": "The Id seeks immediate gratification (pleasure principle); the Ego operates on reality principle.",
        "verification": "solve_fill_blank",
    },
    {
        "id": "psy_011_mcq_02",
        "question_text": "The Big Five personality traits include all EXCEPT:",
        "question_type": "mcq",
        "options": ["Openness", "Conscientiousness", "Optimism", "Neuroticism"],
        "answer": "Optimism",
        "difficulty": 0.4,
        "topic": "c12_psy_011",
        "solution": "Big Five: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism (OCEAN). Optimism is not one of them.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_011_sa_01",
        "question_text": "What are the three components of personality according to Freud? Briefly describe each.",
        "question_type": "short_answer",
        "options": [],
        "answer": "Id (pleasure principle, unconscious), Ego (reality principle, conscious), Superego (morality, internalized norms).",
        "difficulty": 0.5,
        "topic": "c12_psy_011",
        "solution": "Each component needs a brief description including its governing principle and consciousness level.",
        "verification": "solve_short_answer",
    },

    # ===== c12_psy_012 : Psychological Disorders =====
    {
        "id": "psy_012_mcq_01",
        "question_text": "Schizophrenia is primarily characterized by:",
        "question_type": "mcq",
        "options": [
            "Mood swings between mania and depression",
            "Disruption of thought processes and perception",
            "Excessive fear and anxiety",
            "Multiple distinct personalities"
        ],
        "answer": "Disruption of thought processes and perception",
        "difficulty": 0.3,
        "topic": "c12_psy_012",
        "solution": "Schizophrenia involves positive symptoms (hallucinations, delusions) and negative symptoms (avolition, anhedonia).",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_012_fb_01",
        "question_text": "The disorder characterized by persistent, uncontrollable worry about everyday events is called _____ disorder.",
        "question_type": "fill_blank",
        "options": [],
        "answer": "generalized anxiety",
        "difficulty": 0.4,
        "topic": "c12_psy_012",
        "solution": "Generalized Anxiety Disorder (GAD) involves excessive, uncontrollable worry about multiple domains.",
        "verification": "solve_fill_blank",
    },
    {
        "id": "psy_012_mcq_02",
        "question_text": "Which of the following is a mood disorder?",
        "question_type": "mcq",
        "options": ["Schizophrenia", "Phobia", "Bipolar Disorder", "OCD"],
        "answer": "Bipolar Disorder",
        "difficulty": 0.2,
        "topic": "c12_psy_012",
        "solution": "Bipolar disorder involves alternating episodes of mania and depression — it is a mood/affective disorder.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_012_la_01",
        "question_text": "Explain the symptoms of schizophrenia. Distinguish between positive and negative symptoms.",
        "question_type": "long_answer",
        "options": [],
        "answer": "Positive symptoms: hallucinations, delusions, disorganized speech. Negative symptoms: flat affect, anhedonia, avolition, alogia.",
        "difficulty": 0.7,
        "topic": "c12_psy_012",
        "solution": "Clearly separate positive (excess) from negative (deficit) symptoms with examples. May also mention cognitive symptoms.",
        "verification": "solve_long_answer",
    },

    # ===== c12_psy_013 : Therapeutic Approaches =====
    {
        "id": "psy_013_mcq_01",
        "question_text": "Which therapy is based on the idea that psychological problems stem from faulty thinking patterns?",
        "question_type": "mcq",
        "options": ["Psychoanalysis", "Cognitive Therapy", "Client-Centered Therapy", "Systematic Desensitization"],
        "answer": "Cognitive Therapy",
        "difficulty": 0.3,
        "topic": "c12_psy_013",
        "solution": "Cognitive therapy (Beck, Ellis) focuses on identifying and restructuring distorted thoughts and beliefs.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_013_fb_01",
        "question_text": "The therapy developed by Carl Rogers that emphasizes unconditional positive regard is called _____ therapy.",
        "question_type": "fill_blank",
        "options": [],
        "answer": "client-centered",
        "difficulty": 0.4,
        "topic": "c12_psy_013",
        "solution": "Person-centered / client-centered therapy (Rogers) offers unconditional positive regard, empathy, and congruence.",
        "verification": "solve_fill_blank",
    },
    {
        "id": "psy_013_mcq_02",
        "question_text": "Systematic desensitization is primarily used to treat:",
        "question_type": "mcq",
        "options": ["Schizophrenia", "Phobias", "Depression", "Personality Disorders"],
        "answer": "Phobias",
        "difficulty": 0.3,
        "topic": "c12_psy_013",
        "solution": "Systematic desensitization (Wolpe) uses gradual exposure paired with relaxation to treat phobias.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_013_sa_01",
        "question_text": "What is free association? How is it used in psychoanalysis?",
        "question_type": "short_answer",
        "options": [],
        "answer": "Free association is a psychoanalytic technique where the patient says whatever comes to mind, revealing unconscious conflicts.",
        "difficulty": 0.5,
        "topic": "c12_psy_013",
        "solution": "Must mention the technique, its purpose (accessing unconscious), and its use by Freud.",
        "verification": "solve_short_answer",
    },

    # ===== c12_psy_014 : Social Psychology =====
    {
        "id": "psy_014_mcq_01",
        "question_text": "The tendency to attribute others' behavior to internal dispositions while attributing our own behavior to external situations is called:",
        "question_type": "mcq",
        "options": ["Confirmation Bias", "Fundamental Attribution Error", "Self-Serving Bias", "Groupthink"],
        "answer": "Fundamental Attribution Error",
        "difficulty": 0.5,
        "topic": "c12_psy_014",
        "solution": "Ross (1977) identified the Fundamental Attribution Error — overemphasizing dispositional factors for others' behavior.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_014_fb_01",
        "question_text": "The change in behavior that occurs as a result of real or imagined group pressure is called _____.",
        "question_type": "fill_blank",
        "options": [],
        "answer": "conformity",
        "difficulty": 0.3,
        "topic": "c12_psy_014",
        "solution": "Conformity (Asch, 1951) is adjusting behavior to match group standards.",
        "verification": "solve_fill_blank",
    },
    {
        "id": "psy_014_mcq_02",
        "question_text": "Which famous experiment demonstrated the power of obedience to authority?",
        "question_type": "mcq",
        "options": ["Asch Experiment", "Milgram Experiment", "Stanford Prison Experiment", "Robbers Cave Experiment"],
        "answer": "Milgram Experiment",
        "difficulty": 0.4,
        "topic": "c12_psy_014",
        "solution": "Milgram (1963) showed that ordinary people would administer painful shocks when instructed by an authority figure.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_014_la_01",
        "question_text": "Explain Asch's conformity experiment. What factors affect the degree of conformity?",
        "question_type": "long_answer",
        "options": [],
        "answer": "Asch (1951): participants conformed to a wrong majority judgment about line length ~32% of the time. Factors: group size, unanimity, task difficulty, culture.",
        "difficulty": 0.7,
        "topic": "c12_psy_014",
        "solution": "Describe the line judgment experiment, the 32% conformity rate, then discuss group size (3-5 optimal), unanimity, difficulty, and cultural factors.",
        "verification": "solve_long_answer",
    },

    # ===== c12_psy_015 : Attitudes and Prejudice =====
    {
        "id": "psy_015_mcq_01",
        "question_text": "The three components of an attitude are:",
        "question_type": "mcq",
        "options": [
            ["Thought, Feeling, Action"],
            ["Cognitive, Affective, Behavioral"],
            ["Belief, Emotion, Conduct"],
            ["Idea, Mood, Behavior"]
        ],
        "answer": "Cognitive, Affective, Behavioral",
        "difficulty": 0.3,
        "topic": "c12_psy_015",
        "solution": "ABC model: A=Affective (feelings), B=Behavioral (actions), C=Cognitive (beliefs).",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_015_fb_01",
        "question_text": "The process of changing someone's existing attitude through communication is called _____ persuasion.",
        "question_type": "fill_blank",
        "options": [],
        "answer": "attitude",
        "difficulty": 0.4,
        "topic": "c12_psy_015",
        "solution": "Persuasion is the active attempt to change attitudes through communication (Petty & Cacioppo's ELM).",
        "verification": "solve_fill_blank",
    },
    {
        "id": "psy_015_mcq_02",
        "question_text": "According to Sherif's Robbers Cave experiment, inter-group hostility can be reduced by:",
        "question_type": "mcq",
        "options": [
            "Increased competition between groups",
            "Superordinate goals requiring cooperation",
            "Segregating the groups",
            "Ignoring the conflict"
        ],
        "answer": "Superordinate goals requiring cooperation",
        "difficulty": 0.5,
        "topic": "c12_psy_015",
        "solution": "Sherif (1966) showed that superordinate (shared) goals reduce prejudice by creating interdependence.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_015_la_01",
        "question_text": "Define prejudice and discrimination. Explain realistic conflict theory and how it accounts for inter-group hostility.",
        "question_type": "long_answer",
        "options": [],
        "answer": "Prejudice = negative attitude toward a group; Discrimination = unfair behavior. Realistic conflict theory: competition over scarce resources causes inter-group hostility.",
        "difficulty": 0.8,
        "topic": "c12_psy_015",
        "solution": "Define both terms clearly, explain Sherif's Robbers Cave study, and connect it to realistic conflict theory.",
        "verification": "solve_long_answer",
    },

    # ===== Extra — more questions for variety =====
    {
        "id": "psy_005_mcq_03",
        "question_text": "Which of the following is NOT a characteristic of consciousness?",
        "question_type": "mcq",
        "options": ["Subjectivity", "Continuity", "Changeability", "Inaccessibility to study"],
        "answer": "Inaccessibility to study",
        "difficulty": 0.6,
        "topic": "c12_psy_005",
        "solution": "Consciousness is subjective, continuous (stream of consciousness), and changeable. It is accessible through introspection and neuroscience.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_007_mcq_03",
        "question_text": "In classical conditioning, repeated presentation of the CS without the US leads to:",
        "question_type": "mcq",
        "options": ["Generalization", "Extinction", "Discrimination", "Spontaneous Recovery"],
        "answer": "Extinction",
        "difficulty": 0.3,
        "topic": "c12_psy_007",
        "solution": "Extinction occurs when the CS is presented without the US repeatedly, weakening the CR.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_008_mcq_03",
        "question_text": "The process of retrieving stored information from memory is called:",
        "question_type": "mcq",
        "options": ["Encoding", "Storage", "Retrieval", "Rehearsal"],
        "answer": "Retrieval",
        "difficulty": 0.2,
        "topic": "c12_psy_008",
        "solution": "Retrieval is accessing stored information. Encoding = input, Storage = retention, Retrieval = output.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_010_num_02",
        "question_text": "A student studies for 3 hours, then takes a 30-minute break, then studies for 2 more hours. Total study time in minutes is:",
        "question_type": "numerical",
        "options": [],
        "answer": "330",
        "difficulty": 0.2,
        "topic": "c12_psy_010",
        "solution": "3 hours = 180 min, 2 hours = 120 min. 180 + 120 = 300 min (break doesn't count). Answer = 300.",
        "verification": "solve_numerical",
    },
    {
        "id": "psy_013_mcq_03",
        "question_text": "Which therapy involves pairing a feared stimulus with relaxation to reduce anxiety?",
        "question_type": "mcq",
        "options": ["Gestalt Therapy", "Systematic Desensitization", "Free Association", "Transference"],
        "answer": "Systematic Desensitization",
        "difficulty": 0.3,
        "topic": "c12_psy_013",
        "solution": "Systematic desensitization (Wolpe) counterconditions fear by pairing anxiety-evoking stimuli with relaxation.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_001_num_01",
        "question_text": "If a psychology class has 30 students (18 girls and 12 boys), what percentage of the class are girls? Round to the nearest whole number.",
        "question_type": "numerical",
        "options": [],
        "answer": "60",
        "difficulty": 0.3,
        "topic": "c12_psy_001",
        "solution": "(18/30) × 100 = 60%.",
        "verification": "solve_numerical",
    },
    {
        "id": "psy_004_mcq_03",
        "question_text": "Which neurotransmitter is primarily associated with muscle movement at the neuromuscular junction?",
        "question_type": "mcq",
        "options": ["Dopamine", "Serotonin", "Acetylcholine", "GABA"],
        "answer": "Acetylcholine",
        "difficulty": 0.5,
        "topic": "c12_psy_004",
        "solution": "Acetylcholine (ACh) is the neurotransmitter at neuromuscular junctions and in the autonomic nervous system.",
        "verification": "solve_mcq",
    },
    {
        "id": "psy_011_mcq_03",
        "question_text": "Which personality test uses inkblots?",
        "question_type": "mcq",
        "options": ["MMPI", "Rorschach Inkblot Test", "16PF", "Myers-Briggs"],
        "answer": "Rorschach Inkblot Test",
        "difficulty": 0.2,
        "topic": "c12_psy_011",
        "solution": "The Rorschach Inkblot Test (Rorschach, 1921) is a projective technique using symmetrical inkblot cards.",
        "verification": "solve_mcq",
    },
]


# ---------------------------------------------------------------------------
# Solver functions
# ---------------------------------------------------------------------------

def solve_mcq(question: Dict[str, Any], user_answer: str) -> Dict[str, Any]:
    """Validate an MCQ answer."""
    correct = question.get("answer", "")
    is_correct = str(user_answer).strip().lower() == str(correct).strip().lower()
    return {
        "is_correct": is_correct,
        "user_answer": user_answer,
        "correct_answer": correct,
        "explanation": question.get("solution", ""),
    }


def solve_fill_blank(question: Dict[str, Any], user_answer: str) -> Dict[str, Any]:
    """Validate a fill-in-the-blank answer."""
    correct = question.get("answer", "")
    is_correct = str(user_answer).strip().lower() == str(correct).strip().lower()
    return {
        "is_correct": is_correct,
        "user_answer": user_answer,
        "correct_answer": correct,
        "explanation": question.get("solution", ""),
    }


def solve_short_answer(question: Dict[str, Any], user_answer: str) -> Dict[str, Any]:
    """Validate a short-answer question (keyword-match heuristic)."""
    correct = question.get("answer", "")
    correct_words = set(str(correct).lower().split())
    user_words = set(str(user_answer).lower().split())
    overlap = correct_words & user_words
    match_ratio = len(overlap) / max(len(correct_words), 1)
    is_correct = match_ratio >= 0.5
    return {
        "is_correct": is_correct,
        "user_answer": user_answer,
        "correct_answer": correct,
        "explanation": question.get("solution", ""),
        "match_ratio": round(match_ratio, 2),
    }


def solve_long_answer(question: Dict[str, Any], user_answer: str) -> Dict[str, Any]:
    """Validate a long-answer question (keyword-match heuristic)."""
    return solve_short_answer(question, user_answer)


def solve_numerical(question: Dict[str, Any], user_answer: str) -> Dict[str, Any]:
    """Validate a numerical answer."""
    try:
        user_val = float(str(user_answer).strip())
        correct_val = float(str(question.get("answer", "")).strip())
        is_correct = abs(user_val - correct_val) < 0.01
    except (ValueError, TypeError):
        is_correct = str(user_answer).strip().lower() == str(question.get("answer", "")).strip().lower()
    return {
        "is_correct": is_correct,
        "user_answer": user_answer,
        "correct_answer": question.get("answer", ""),
        "explanation": question.get("solution", ""),
    }


SOLVER_MAP: Dict[str, Callable] = {
    "mcq": solve_mcq,
    "fill_blank": solve_fill_blank,
    "short_answer": solve_short_answer,
    "long_answer": solve_long_answer,
    "numerical": solve_numerical,
}


# ---------------------------------------------------------------------------
# QUESTION_REGISTRY
# ---------------------------------------------------------------------------

QUESTION_REGISTRY: Dict[str, List[Dict[str, Any]]] = {}
for q in _QUESTION_BANK:
    topic = q["topic"]
    QUESTION_REGISTRY.setdefault(topic, []).append(q)


# ---------------------------------------------------------------------------
# Verification
# ---------------------------------------------------------------------------

def verify_all_questions(questions: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Verify that all generated questions are structurally valid."""
    required_fields = {"id", "question_text", "question_type", "options",
                       "answer", "difficulty", "topic", "solution", "verification"}
    errors: List[str] = []
    valid_count = 0

    for q in questions:
        missing = required_fields - set(q.keys())
        if missing:
            errors.append(f"Question {q.get('id', '?')} missing fields: {missing}")
            continue
        if q["question_type"] not in QUESTION_TYPES:
            errors.append(f"Question {q['id']} has invalid type: {q['question_type']}")
            continue
        if not 0.0 <= q["difficulty"] <= 1.0:
            errors.append(f"Question {q['id']} difficulty {q['difficulty']} out of range")
            continue
        if q["question_type"] == "mcq" and len(q.get("options", [])) < 2:
            errors.append(f"Question {q['id']} MCQ has fewer than 2 options")
            continue
        if q["verification"] not in SOLVER_MAP:
            errors.append(f"Question {q['id']} has unknown solver: {q['verification']}")
            continue
        valid_count += 1

    return {
        "total": len(questions),
        "valid": valid_count,
        "errors": errors,
        "all_valid": len(errors) == 0,
    }


# ---------------------------------------------------------------------------
# Core generator
# ---------------------------------------------------------------------------

def generate_questions(seed: int, count: int) -> List[Dict[str, Any]]:
    """
    Deterministically generate *count* questions from the full bank.

    Parameters
    ----------
    seed : int
        Random seed for reproducibility.
    count : int
        Number of questions to return.

    Returns
    -------
    List[Dict[str, Any]]
        List of question dicts (shuffled deterministically).
    """
    rng = random.Random(seed)
    rng.seed(seed)

    bank = list(_QUESTION_BANK)
    rng.shuffle(bank)

    if count > len(bank):
        # Cycle through the bank to fill the count deterministically
        result = []
        while len(result) < count:
            for q in bank:
                if len(result) >= count:
                    break
                q_copy = dict(q)
                q_copy["id"] = f"{q['id']}_v{rng.randint(1000, 9999)}"
                result.append(q_copy)
        return result

    return [dict(q) for q in bank[:count]]


# ---------------------------------------------------------------------------
# Utility helpers
# ---------------------------------------------------------------------------

def get_questions_by_topic(topic_id: str) -> List[Dict[str, Any]]:
    """Return all questions for a specific topic."""
    return [dict(q) for q in _QUESTION_BANK if q["topic"] == topic_id]


def get_questions_by_type(q_type: str) -> List[Dict[str, Any]]:
    """Return all questions of a specific type."""
    return [dict(q) for q in _QUESTION_BANK if q["question_type"] == q_type]


def get_questions_by_difficulty(max_difficulty: float) -> List[Dict[str, Any]]:
    """Return questions at or below a given difficulty threshold."""
    return [dict(q) for q in _QUESTION_BANK if q["difficulty"] <= max_difficulty]


def list_topics() -> List[str]:
    """Return list of all covered topic IDs."""
    return sorted(QUESTION_REGISTRY.keys())


def stats() -> Dict[str, Any]:
    """Return bank statistics."""
    by_type: Dict[str, int] = {}
    by_topic: Dict[str, int] = {}
    for q in _QUESTION_BANK:
        by_type[q["question_type"]] = by_type.get(q["question_type"], 0) + 1
        by_topic[q["topic"]] = by_topic.get(q["topic"], 0) + 1
    return {
        "total_questions": len(_QUESTION_BANK),
        "by_type": by_type,
        "by_topic": by_topic,
        "topics_covered": len(QUESTION_REGISTRY),
    }


# ---------------------------------------------------------------------------
# Self-test
# ---------------------------------------------------------------------------

def _self_test() -> None:
    print("=" * 70)
    print("CISCE Class 12 Psychology - Deterministic Question Generator")
    print("=" * 70)

    # --- Stats ---
    s = stats()
    print(f"\nBank Statistics:")
    print(f"  Total questions  : {s['total_questions']}")
    print(f"  Topics covered   : {s['topics_covered']}")
    print(f"  By type          : {s['by_type']}")
    print(f"  By topic         : {s['by_topic']}")

    # --- Deterministic generation ---
    print("\n--- Deterministic Generation Test ---")
    for test_seed in [42, 100, 999]:
        qs = generate_questions(test_seed, 5)
        ids = [q["id"] for q in qs]
        print(f"  seed={test_seed}, count=5 → IDs: {ids}")

    # --- Reproducibility check ---
    print("\n--- Reproducibility Check ---")
    run1 = generate_questions(77, 10)
    run2 = generate_questions(77, 10)
    ids1 = [q["id"] for q in run1]
    ids2 = [q["id"] for q in run2]
    assert ids1 == ids2, "Reproducibility check FAILED!"
    print(f"  seed=77, count=10 → reproduced identically ✓")

    # --- Verify all questions ---
    print("\n--- Verification ---")
    verification = verify_all_questions(_QUESTION_BANK)
    print(f"  Total: {verification['total']}, Valid: {verification['valid']}, All valid: {verification['all_valid']}")
    if verification["errors"]:
        print(f"  Errors: {verification['errors'][:5]}")

    # --- Solver tests ---
    print("\n--- Solver Tests ---")

    # MCQ test
    mcq_q = _QUESTION_BANK[0]
    result = solve_mcq(mcq_q, mcq_q["answer"])
    print(f"  MCQ correct answer  → is_correct={result['is_correct']}")

    # Fill-blank test
    fb_q = next(q for q in _QUESTION_BANK if q["question_type"] == "fill_blank")
    result = solve_fill_blank(fb_q, fb_q["answer"])
    print(f"  Fill-blank correct   → is_correct={result['is_correct']}")

    # Numerical test
    num_q = next(q for q in _QUESTION_BANK if q["question_type"] == "numerical")
    result = solve_numerical(num_q, num_q["answer"])
    print(f"  Numerical correct    → is_correct={result['is_correct']}")

    # Short answer test
    sa_q = next(q for q in _QUESTION_BANK if q["question_type"] == "short_answer")
    result = solve_short_answer(sa_q, sa_q["answer"])
    print(f"  Short-answer correct → is_correct={result['is_correct']} (ratio={result['match_ratio']})")

    # Wrong answer test
    result_wrong = solve_mcq(mcq_q, "Wrong Answer")
    assert not result_wrong["is_correct"], "Wrong answer should not be correct!"
    print(f"  Wrong answer correctly detected → is_correct={result_wrong['is_correct']}")

    # --- Generate sample questions ---
    print("\n--- Sample Generated Questions (seed=2024, count=5) ---")
    sample = generate_questions(2024, 5)
    for q in sample:
        topic_name = TOPIC_META.get(q["topic"], {}).get("name", q["topic"])
        print(f"  [{q['question_type'].upper()}] {q['id']}")
        print(f"    Topic  : {topic_name}")
        print(f"    Q      : {q['question_text'][:80]}...")
        print(f"    Diff   : {q['difficulty']}")
        print(f"    Answer : {q['answer']}")
        print()

    # --- List topics ---
    print("--- All Topics ---")
    for tid in list_topics():
        print(f"  {tid}: {TOPIC_META[tid]['name']}")

    print("\n" + "=" * 70)
    print("All self-tests passed successfully.")
    print("=" * 70)


if __name__ == "__main__":
    _self_test()