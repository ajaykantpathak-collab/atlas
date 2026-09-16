"""
CISCE Class 12 Psychology - Complete Solver & Question Generator
Self-contained module covering full syllabus with deterministic question generation.
"""

import random
import math
import json
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Any, Optional, Tuple
from enum import Enum
import sympy as sp
import numpy as np

# ============================================================================
# ENUMS AND CONSTANTS
# ============================================================================

class Topic(Enum):
    INTELLIGENCE = "intelligence"
    APTITUDE = "aptitude"
    CREATIVITY = "creativity"
    EQ = "emotional_intelligence"
    PERSONALITY_TYPES = "personality_types"
    PERSONALITY_TRAITS = "personality_traits"
    STRESS = "stress"
    COPING = "coping"
    DISORDERS = "psychological_disorders"
    THERAPIES = "therapies"
    ATTITUDE = "attitude"
    SOCIAL_COGNITION = "social_cognition"
    SOCIAL_INFLUENCE = "social_influence"
    GROUP_PROCESSES = "group_processes"
    PROSOCIAL = "prosocial"
    AGGRESSION = "aggression"
    STATISTICS = "statistics"
    CORRELATION = "correlation"


# ============================================================================
# SYLLABUS KNOWLEDGE BASE
# ============================================================================

INTELLIGENCE_THEORIES = {
    "spearman": {
        "name": "Two-Factor Theory (Spearman, 1904)",
        "key_concept": "General Intelligence (g) + Specific Factors (s)",
        "description": "Spearman proposed that intellectual ability consists of a general factor (g) common to all intellectual tasks and specific factors (s) unique to particular tasks."
    },
    "thurstone": {
        "name": "Primary Mental Abilities (Thurstone, 1938)",
        "key_concept": "7 independent abilities",
        "abilities": ["Verbal Comprehension", "Word Fluency", "Number Facility", "Spatial Visualization", "Associative Memory", "Perceptual Speed", "Reasoning"],
        "description": "Intelligence is not a single general factor but consists of seven independent primary mental abilities."
    },
    "guilford": {
        "name": "Structure of Intellect Model (Guilford, 1967)",
        "key_concept": "3 dimensions x 5 contents x 6 products = 180 abilities",
        "dimensions": {"Operations": ["Cognition", "Memory", "Divergent Production", "Convergent Production", "Evaluation"],
                       "Contents": ["Visual", "Auditory", "Symbolic", "Semantic", "Behavioral"],
                       "Products": ["Units", "Classes", "Relations", "Systems", "Transformations", "Implications"]}
    },
    "sternberg": {
        "name": "Triarchic Theory (Sternberg, 1985)",
        "key_concept": "Analytical + Creative + Practical intelligence",
        "components": {
            "analytical": "Problem-solving ability, academic tasks, logical reasoning",
            "creative": "Novel situations, adapting to new situations, generating ideas",
            "practical": "Street smarts, everyday tasks, contextual adaptation"
        }
    },
    "gardner": {
        "name": "Multiple Intelligences (Gardner, 1983)",
        "key_concept": "8 (later 9) independent intelligences",
        "intelligences": [
            "Linguistic (language)", "Logical-Mathematical", "Spatial", "Musical",
            "Bodily-Kinesthetic", "Interpersonal", "Intrapersonal", "Naturalistic", "Existential"
        ]
    }
}

PERSONALITY_TYPES = {
    "jung_mbti": {
        "name": "Jung's Typology (basis of MBTI)",
        "dimensions": {
            "Extraversion_Introversion": "Source of energy (outer world vs inner world)",
            "Sensing_Intuition": "Information gathering (concrete vs abstract)",
            "Thinking_Feeling": "Decision making (logic vs values)",
            "Judging_Perceiving": "Lifestyle (structured vs flexible)"
        }
    },
    "type_a_b": {
        "name": "Friedman & Rosenman Type A/B Personality",
        "type_a": {
            "traits": ["Competitive", "Impatient", "Aggressive", "Time-urgent", "Hostile"],
            "health_risk": "Higher risk of coronary heart disease",
            "behavior": "Always in a hurry, multitasking, easily angered"
        },
        "type_b": {
            "traits": ["Relaxed", "Patient", "Easy-going", "Less competitive"],
            "health_risk": "Lower risk of coronary heart disease",
            "behavior": "Works steadily, no urgency, tolerant"
        }
    }
}

PERSONALITY_TRAITS = {
    "eysenck": {
        "name": "Eysenck's Personality Theory",
        "dimensions": ["Introversion-Extraversion", "Neuroticism-Stability", "Psychoticism"],
        "description": "Personality is organised along three independent dimensions. High neuroticism + introversion = anxiety disorders."
    },
    "big_five": {
        "name": "Big Five / Five Factor Model (OCEAN)",
        "dimensions": {
            "Openness": "Curiosity, creativity, preference for novelty",
            "Conscientiousness": "Organization, dependability, self-discipline",
            "Extraversion": "Sociability, assertiveness, positive emotionality",
            "Agreeableness": "Cooperation, trust, altruism",
            "Neuroticism": "Emotional instability, anxiety, moodiness"
        }
    },
    "cattell": {
        "name": "Cattell's 16PF",
        "source_traits": ["Warmth", "Reasoning", "Emotional Stability", "Dominance",
                          "Liveliness", "Rule-Consciousness", "Social Boldness", "Sensitivity",
                          "Vigilance", "Abstractedness", "Privateness", "Apprehension",
                          "Openness to Change", "Self-Reliance", "Perfectionism", "Tension"]
    }
}

STRESS_MODEL = {
    "selye_gas": {
        "name": "Selye's General Adaptation Syndrome",
        "stages": [
            {"stage": "Alarm", "description": "Fight-or-flight response, adrenaline release, increased heart rate"},
            {"stage": "Resistance", "description": "Body adapts to stressor, cortisol remains elevated, coping mechanisms active"},
            {"stage": "Exhaustion", "description": "Resources depleted, immune system weakens, illness and burnout"}
        ]
    },
    "stress_sources": {
        "daily_hassles": ["Traffic jams in Mumbai", "Power cuts", "Work deadlines", "Noise pollution"],
        "major_life_events": ["Marriage", "Death of loved one", "Job loss", "Moving cities", "Board exam results"],
        "catastrophes": ["Floods in Kerala", "Earthquake", "Pandemic (COVID-19)", "Tsunami"]
    }
}

COPING_STRATEGIES = {
    "problem_focused": {
        "name": "Problem-Focused Coping",
        "strategies": ["Taking direct action", "Seeking information", "Problem-solving", "Time management"],
        "when": "When stressor is controllable"
    },
    "emotion_focused": {
        "name": "Emotion-Focused Coping",
        "strategies": ["Seeking emotional support", "Positive reframing", "Acceptance", "Humor", "Religion/Spirituality", "Self-blame"],
        "when": "When stressor is uncontrollable"
    },
    "defence_mechanisms": {
        "repression": "Pushing anxiety-provoking thoughts into unconscious (e.g., forgetting a traumatic incident)",
        "denial": "Refusing to acknowledge reality (e.g., student denying poor exam performance)",
        "projection": "Attributing one's own unacceptable feelings to others",
        "displacement": "Redirecting emotions to a safer target (e.g., angry at teacher, yelling at sibling)",
        "rationalization": "Justifying behaviour with logical but false reasons",
        "reaction_formation": "Expressing opposite feelings to hide true feelings",
        "sublimation": "Redirecting impulses into socially acceptable activities (art, sports)",
        "regression": "Reverting to earlier developmental stage under stress (thumb-sucking, tantrums)",
        "undoing": "Trying to 'undo' an unacceptable thought/action by doing opposite",
        "identification": "Adopting characteristics of a powerful person to feel stronger",
        "intellectualization": "Focusing on abstract logic to avoid emotional distress",
        "compensation": "Overachieving in one area to make up for failures in another"
    }
}

PSYCHOLOGICAL_DISORDERS = {
    "anxiety_disorders": {
        "types": ["Generalized Anxiety Disorder (GAD)", "Panic Disorder", "Phobias", "Social Anxiety", "OCD", "PTSD"],
        "symptoms_general": ["Excessive worry", "Restlessness", "Muscle tension", "Sleep disturbance", "Difficulty concentrating"]
    },
    "mood_disorders": {
        "types": ["Major Depressive Disorder", "Bipolar Disorder (Manic-Depressive)", "Dysthymia"],
        "depression_symptoms": ["Persistent sadness", "Loss of interest", "Fatigue", "Changes in appetite/sleep", "Feelings of worthlessness", "Suicidal thoughts"],
        "mania_symptoms": ["Elevated mood", "Grandiosity", "Decreased need for sleep", "Rapid speech", "Impulsivity"]
    },
    "schizophrenia": {
        "types": ["Paranoid", "Disorganized (Hebephrenic)", "Catatonic", "Undifferentiated", "Residual"],
        "positive_symptoms": ["Hallucinations (mostly auditory)", "Delusions (persecutory, grandeur)", "Disorganized speech", "Grossly disorganized behaviour"],
        "negative_symptoms": ["Avolition", "Alogia", "Anhedonia", "Flat affect", "Asociality"]
    },
    "dissociative": {
        "types": ["Dissociative Identity Disorder (Multiple Personality)", "Dissociative Amnesia", "Depersonalization/Derealization"],
        "dissociative_identity": "Two or more distinct personality states, memory gaps for everyday events"
    },
    "somatic_symptom": {
        "name": "Somatic Symptom and Related Disorders",
        "types": ["Somatic Symptom Disorder", "Illness Anxiety Disorder (Hypochondriasis)", "Conversion Disorder (Functional Neurological Symptom)"]
    },
    "personality_disorders": {
        "clusters": {
            "A": ["Paranoid", "Schizoid", "Schizotypal"],
            "B": ["Antisocial", "Borderline", "Histrionic", "Narcissistic"],
            "C": ["Avoidant", "Dependent", "Obsessive-Compulsive Personality"]
        }
    },
    "neurodevelopmental": {
        "autism": "Autism Spectrum Disorder - deficits in social communication, restricted/repetitive patterns",
        "adhd": "Attention-Deficit/Hyperactivity Disorder - inattention, hyperactivity, impulsivity"
    }
}

THERAPIES = {
    "psychodynamic": {
        "founder": "Sigmund Freud",
        "key_techniques": ["Free Association", "Dream Analysis", "Transference Analysis", "Resistance Analysis"],
        "focus": "Unconscious conflicts, childhood experiences",
        "goal": "Make the unconscious conscious, resolve intrapsychic conflicts",
        "disorders": "Anxiety disorders, depression, personality disorders, phobias"
    },
    "behavioural": {
        "founders": ["Watson", "Skinner", "Wolpe", "Eysenck"],
        "key_techniques": ["Systematic Desensitization", "Aversion Therapy", "Token Economy", "Modeling/Imitation", "Flooding", "EMDR"],
        "focus": "Maladaptive learned behaviours",
        "goal": "Replace maladaptive behaviours with adaptive ones",
        "basis": "Classical conditioning, Operant conditioning, Observational learning"
    },
    "cognitive": {
        "founder": "Aaron Beck",
        "key_techniques": ["Cognitive Restructuring", "Socratic Questioning", "Thought Record", "Behavioural Experiments"],
        "focus": "Distorted thinking patterns/cognitive schemas",
        "goal": "Identify and change irrational thoughts",
        "disorders": "Depression, anxiety, eating disorders, OCD"
    },
    "cbt": {
        "name": "Cognitive Behaviour Therapy",
        "founders": ["Aaron Beck", "Albert Ellis"],
        "description": "Combines cognitive and behavioural techniques. Focuses on changing dysfunctional thoughts AND behaviours simultaneously.",
        "components": ["Cognitive restructuring", "Behavioural activation", "Exposure", "Skills training"]
    },
    "humanistic": {
        "founder": "Carl Rogers",
        "key_techniques": ["Unconditional Positive Regard", "Empathy", "Genuineness/Congruence"],
        "focus": "Self-actualization, personal growth, free will",
        "goal": "Help individuals realize their full potential",
        "core_belief": "People are inherently good and capable of self-directed growth"
    },
    "biomedical": {
        "description": "Use of medication and medical procedures",
        "drugs": {
            "antipsychotics": "Schizophrenia (chlorpromazine, haloperidol, clozapine)",
            "antidepressants": "Depression, anxiety (SSRIs, TCAs, MAOIs)",
            "antianxiety": "Anxiety disorders (benzodiazepines, buspirone)",
            "mood_stabilizers": "Bipolar disorder (lithium, valproate)",
            "stimulants": "ADHD (methylphenidate, amphetamine)"
        },
        "procedures": ["ECT (Electroconvulsive Therapy)", "rTMS (repetitive TMS)", "Deep Brain Stimulation"]
    }
}

ATTITUDE_COMPONENTS = {
    "ABC": {
        "A": "Affective Component (feelings/emotions) - How you FEEL about the object",
        "B": "Behavioural Component (actions) - How you ACT towards the object",
        "C": "Cognitive Component (beliefs/thoughts) - What you THINK/BELIEVE about the object"
    },
    "formation_theories": {
        "classical": "Learning through association (pairing neutral stimulus with positive/negative stimulus)",
        "operant": "Attitudes learned through reinforcement and punishment",
        "observational": "Attitudes acquired by observing others (modeling)"
    },
    "persuasion": {
        "elaboration_likelihood": {
            "central_route": "Careful, thoughtful processing of message content. Leads to lasting attitude change.",
            "peripheral_route": "Superficial cues (attractiveness of speaker, emotional appeal). Temporary change."
        },
        "yale_approach": {
            "source": "Credibility, attractiveness, power of communicator",
            "message": "Reasoned vs emotional appeal, one-sided vs two-sided",
            "audience": "Age, self-esteem, education, intelligence",
            "channel": "Face-to-face, written, visual"
        }
    }
}

SOCIAL_INFLUENCE = {
    "conformity": {
        "asch": {
            "description": "Asch Line Judgment Experiment (1951)",
            "finding": "Approximately 75% conformed at least once, 32% conformed on average",
            "factors": ["Group size (3-5 people most effective)", "Unanimity", "Cohesion", "Status", "Public response", "No prior commitment"]
        },
        "types": {"compliance": "Yielding to explicit request (door-in-the-face, foot-in-the-door)",
                  "conformity": "Yielding to group pressure (normative or informational)",
                  "obedience": "Yielding to authority figure (Milgram experiment)"}
    },
    "milgram": {
        "experiment": "Obedience to Authority (1963)",
        "procedure": "Participants (teachers) administered shocks to learners for wrong answers",
        "finding": "65% delivered maximum 450V shock",
        "factors_increasing_obedience": ["Authority figure present", "Prestige of institution (Yale)", "Proximity of learner",
                                          "Proximity of authority", "Legitimacy of authority"]
    },
    "factors": {
        "group_size": "Larger groups increase conformity up to a point (3-5 is optimal)",
        "unanimity": "Presence of one ally reduces conformity dramatically",
        "cohesion": "More cohesive groups produce more conformity",
        "status": "Higher status group members produce more conformity"
    }
}

GROUP_PROCESSES = {
    "prosocial": {
        "bystander_effect": {
            "description": "People are less likely to help when others are present",
            "diffusion_of_responsibility": "Responsibility spread across all bystanders",
            "factors_helping": ["Fewer bystanders", "Clear emergency", "Victim similar to helper", "Helper not in a hurry", "Small town/rural area"]
        },
        "altruism": "Selfless concern for welfare of others",
        "empathy_altruism": "Batson's theory - genuine empathy leads to helping regardless of cost"
    },
    "aggression": {
        "types": {"Hostile": "Driven by anger, goal is to harm",
                  "Instrumental": "Means to an end (bullying for money, war for resources)"},
        "causes": {"Biological": "Testosterone, amygdala, genetics (MAOA gene)",
                   "Frustration-Aggression": "Dollard et al. (1939) - frustration always leads to aggression",
                   "Social Learning": "Bandura - learned through observation and imitation (Bobo doll)",
                   "Cultural": "Cultures that emphasize honour have higher aggression",
                   "Situational": "Heat, noise, crowding, alcohol"}
    }
}

# ============================================================================
# HELPER: CORRECTED Z-SCORE TABLE VALUES
# ============================================================================

def z_to_percentile(z: float) -> float:
    """Compute percentile from z-score using standard normal CDF approximation."""
    return 0.5 * (1 + math.erf(z / math.sqrt(2))) * 100


def percentile_to_z(p: float) -> float:
    """Approximate inverse CDF for standard normal (Abramowitz & Stegun approximation)."""
    if p <= 0 or p >= 1:
        raise ValueError("Percentile must be between 0 and 1 (exclusive)")
    if p < 0.5:
        return -_z_approx(1 - p)
    return _z_approx(p)


def _z_approx(p: float) -> float:
    t = math.sqrt(-2 * math.log(1 - p))
    c0, c1, c2 = 2.515517, 0.802853, 0.010328
    d1, d2, d3 = 1.432788, 0.189269, 0.001308
    return t - (c0 + c1 * t + c2 * t * t) / (1 + d1 * t + d2 * t * t + d3 * t * t * t)


# ============================================================================
# CORE SOLVER ENGINE
# ============================================================================

class PsychologySolver:
    """Deterministic solver for CISCE Class 12 Psychology problems."""

    # ---- Statistical Foundation ----

    @staticmethod
    def solve_statistics(data: List[float], operation: str) -> Dict[str, Any]:
        steps = []
        n = len(data)
        data_sorted = sorted(data)

        if operation == "mean":
            mean_val = sum(data) / n
            steps.append(f"Given data: {data}")
            steps.append(f"n = {n}")
            steps.append(f"Mean = Sum of all values / n")
            steps.append(f"Mean = ({' + '.join(str(x) for x in data)}) / {n}")
            steps.append(f"Mean = {sum(data)} / {n}")
            steps.append(f"Mean = {mean_val:.4f}")
            return {"topic": "statistics", "operation": "mean", "answer": round(mean_val, 4),
                    "steps": steps, "verification": f"Sum = {sum(data):.4f}, n = {n}, Mean = {mean_val:.4f}"}

        elif operation == "median":
            if n % 2 == 1:
                median_val = data_sorted[n // 2]
                steps.append(f"Sorted data: {data_sorted}")
                steps.append(f"n = {n} (odd)")
                steps.append(f"Median = value at position (n+1)/2 = {n//2 + 1}")
                steps.append(f"Median = {median_val}")
            else:
                median_val = (data_sorted[n // 2 - 1] + data_sorted[n // 2]) / 2
                steps.append(f"Sorted data: {data_sorted}")
                steps.append(f"n = {n} (even)")
                steps.append(f"Median = average of values at positions {n//2} and {n//2 + 1}")
                steps.append(f"Median = ({data_sorted[n//2-1]} + {data_sorted[n//2]}) / 2")
                steps.append(f"Median = {median_val}")
            return {"topic": "statistics", "operation": "median", "answer": round(median_val, 4),
                    "steps": steps, "verification": f"Median of {n} values: {median_val:.4f}"}

        elif operation == "mode":
            from collections import Counter
            freq = Counter(data)
            max_freq = max(freq.values())
            modes = [x for x, c in freq.items() if c == max_freq]
            steps.append(f"Data: {data}")
            steps.append(f"Frequency distribution: {dict(freq)}")
            steps.append(f"Highest frequency = {max_freq}")
            steps.append(f"Mode(s) = {modes}")
            return {"topic": "statistics", "operation": "mode", "answer": modes,
                    "steps": steps, "verification": f"Mode(s): {modes}, Frequency: {max_freq}"}

        elif operation == "sd":
            mean_val = sum(data) / n
            variance = sum((x - mean_val) ** 2 for x in data) / n
            sd_val = math.sqrt(variance)
            steps.append(f"Data: {data}")
            steps.append(f"Mean = {mean_val:.4f}")
            steps.append(f"Deviations from mean: {[round(x - mean_val, 4) for x in data]}")
            steps.append(f"Squared deviations: {[round((x - mean_val)**2, 4) for x in data]}")
            steps.append(f"Sum of squared deviations = {sum((x - mean_val)**2 for x in data):.4f}")
            steps.append(f"Variance = Sum / n = {variance:.4f}")
            steps.append(f"SD = sqrt(Variance) = {sd_val:.4f}")
            return {"topic": "statistics", "operation": "sd", "answer": round(sd_val, 4),
                    "steps": steps, "verification": f"SD = {sd_val:.4f}, Variance = {variance:.4f}"}

        elif operation == "range":
            range_val = data_sorted[-1] - data_sorted[0]
            steps.append(f"Data: {data}")
            steps.append(f"Sorted: {data_sorted}")
            steps.append(f"Range = Highest - Lowest = {data_sorted[-1]} - {data_sorted[0]} = {range_val}")
            return {"topic": "statistics", "operation": "range", "answer": round(range_val, 4),
                    "steps": steps, "verification": f"Range = {range_val:.4f}"}

        elif operation == "quartile_deviation":
            if n % 2 == 0:
                q1 = (data_sorted[n // 4 - 1] + data_sorted[n // 4]) / 2 if n // 4 >= 1 else data_sorted[0]
                q3_pos = 3 * n // 4
                q3 = (data_sorted[q3_pos - 1] + data_sorted[q3_pos]) / 2 if q3_pos < n else data_sorted[-1]
            else:
                q1 = data_sorted[(n + 1) // 4 - 1]
                q3 = data_sorted[3 * (n + 1) // 4 - 1]
            qd = (q3 - q1) / 2
            steps.append(f"Sorted data: {data_sorted}")
            steps.append(f"Q1 (lower quartile) = {q1:.4f}")
            steps.append(f"Q3 (upper quartile) = {q3:.4f}")
            steps.append(f"QD = (Q3 - Q1) / 2 = ({q3:.4f} - {q1:.4f}) / 2 = {qd:.4f}")
            return {"topic": "statistics", "operation": "quartile_deviation", "answer": round(qd, 4),
                    "steps": steps, "verification": f"QD = {qd:.4f}"}

        elif operation == "coefficient_of_variation":
            mean_val = sum(data) / n
            sd_val = math.sqrt(sum((x - mean_val) ** 2 for x in data) / n)
            cv = (sd_val / mean_val) * 100
            steps.append(f"Data: {data}")
            steps.append(f"Mean = {mean_val:.4f}")
            steps.append(f"SD = {sd_val:.4f}")
            steps.append(f"CV = (SD / Mean) x 100 = ({sd_val:.4f} / {mean_val:.4f}) x 100 = {cv:.4f}%")
            return {"topic": "statistics", "operation": "coefficient_of_variation", "answer": round(cv, 4),
                    "steps": steps, "verification": f"CV = {cv:.4f}%"}

        else:
            return {"error": f"Unknown operation: {operation}", "answer": None, "steps": ["Invalid operation"], "verification": "N/A"}

    # ---- Intelligence / IQ ----

    @staticmethod
    def solve_iq(mental_age: float, chronological_age: float) -> Dict[str, Any]:
        steps = []
        iq = (mental_age / chronological_age) * 100
        steps.append(f"Mental Age (MA) = {mental_age}")
        steps.append(f"Chronological Age (CA) = {chronological_age}")
        steps.append(f"Formula: IQ = (MA / CA) x 100")
        steps.append(f"IQ = ({mental_age} / {chronological_age}) x 100")
        steps.append(f"IQ = {iq:.2f}")

        if iq >= 130:
            classification = "Very Superior / Gifted"
        elif iq >= 120:
            classification = "Superior"
        elif iq >= 110:
            classification = "High Average"
        elif iq >= 90:
            classification = "Average (Normal)"
        elif iq >= 80:
            classification = "Low Average"
        elif iq >= 70:
            classification = "Borderline"
        else:
            classification = "Intellectually Disabled"

        steps.append(f"Classification: {classification}")
        return {"topic": "intelligence", "operation": "iq_calculation", "answer": round(iq, 2),
                "classification": classification, "steps": steps,
                "verification": f"IQ = {iq:.2f} - Classification: {classification}"}

    @staticmethod
    def solve_iq_deviation(iq_score: float, mean_iq: float = 100, sd_iq: float = 15) -> Dict[str, Any]:
        steps = []
        z = (iq_score - mean_iq) / sd_iq
        percentile = z_to_percentile(z)
        steps.append(f"Given IQ = {iq_score}")
        steps.append(f"Population Mean IQ = {mean_iq}, SD = {sd_iq}")
        steps.append(f"Z = (IQ - Mean) / SD = ({iq_score} - {mean_iq}) / {sd_iq} = {z:.4f}")
        steps.append(f"Z-score = {z:.4f}")
        steps.append(f"Percentile = {percentile:.2f}% (from standard normal table)")
        steps.append(f"This means {round(percentile, 1)}% of population scores below {iq_score}")

        if iq_score >= 130:
            cat = "Very Superior"
        elif iq_score >= 120:
            cat = "Superior"
        elif iq_score >= 110:
            cat = "High Average"
        elif iq_score >= 90:
            cat = "Average"
        elif iq_score >= 80:
            cat = "Low Average"
        else:
            cat = "Below Average"

        steps.append(f"Classification: {cat}")
        return {"topic": "intelligence", "operation": "iq_deviation", "answer": round(iq_score, 2),
                "z_score": round(z, 4), "percentile": round(percentile, 2), "classification": cat,
                "steps": steps,
                "verification": f"Z={z:.4f}, Percentile={percentile:.2f}%, Classification: {cat}"}

    # ---- Correlation ----

    @staticmethod
    def solve_correlation(x: List[float], y: List[float], method: str = "pearson") -> Dict[str, Any]:
        steps = []
        n = len(x)

        if method == "pearson":
            mean_x = sum(x) / n
            mean_y = sum(y) / n

            ss_x = sum((xi - mean_x) ** 2 for xi in x)
            ss_y = sum((yi - mean_y) ** 2 for yi in y)
            ss_xy = sum((xi - mean_x) * (yi - mean_y) for xi, yi in zip(x, y))

            denominator = math.sqrt(ss_x * ss_y)
            if denominator == 0:
                r = 0
            else:
                r = ss_xy / denominator

            steps.append(f"Data: X = {x}, Y = {y}")
            steps.append(f"n = {n}")
            steps.append(f"Mean(X) = {mean_x:.4f}, Mean(Y) = {mean_y:.4f}")
            steps.append(f"Sum(XY) = {sum(xi*yi for xi,yi in zip(x,y)):.4f}")
            steps.append(f"Sum(X^2) = {sum(xi**2 for xi in x):.4f}")
            steps.append(f"Sum(Y^2) = {sum(yi**2 for yi in y):.4f}")
            steps.append(f"Using formula: r = [n*Sum(XY) - Sum(X)*Sum(Y)] / sqrt([n*Sum(X^2)-Sum(X)^2] * [n*Sum(Y^2)-Sum(Y)^2])")
            numerator = n * sum(xi * yi for xi, yi in zip(x, y)) - sum(x) * sum(y)
            denom_x = math.sqrt(n * sum(xi ** 2 for xi in x) - sum(x) ** 2)
            denom_y = math.sqrt(n * sum(yi ** 2 for yi in y) - sum(y) ** 2)
            steps.append(f"Numerator = {numerator:.4f}")
            steps.append(f"Denominator X-part = {denom_x:.4f}")
            steps.append(f"Denominator Y-part = {denom_y:.4f}")
            steps.append(f"r = {numerator:.4f} / ({denom_x:.4f} x {denom_y:.4f})")
            steps.append(f"r = {r:.4f}")

            if abs(r) >= 0.8:
                strength = "Very Strong"
            elif abs(r) >= 0.6:
                strength = "Strong"
            elif abs(r) >= 0.4:
                strength = "Moderate"
            elif abs(r) >= 0.2:
                strength = "Weak"
            else:
                strength = "Very Weak / Negligible"

            direction = "Positive" if r > 0 else "Negative" if r < 0 else "Zero"
            steps.append(f"Interpretation: {strength} {direction} correlation")

            return {"topic": "statistics", "operation": "correlation_pearson", "answer": round(r, 4),
                    "strength": strength, "direction": direction,
                    "steps": steps, "verification": f"r = {r:.4f} ({strength} {direction})"}

        elif method == "spearman":
            # Rank the data
            def rank_data(data):
                sorted_data = sorted(enumerate(data), key=lambda x: x[1])
                ranks = [0] * len(data)
                i = 0
                while i < len(sorted_data):
                    j = i
                    while j < len(sorted_data) and sorted_data[j][1] == sorted_data[i][1]:
                        j += 1
                    avg_rank = sum(range(i + 1, j + 1)) / (j - i)
                    for k in range(i, j):
                        ranks[sorted_data[k][0]] = avg_rank
                    i = j
                return ranks

            ranks_x = rank_data(x)
            ranks_y = rank_data(y)
            n_pairs = len(x)
            d_squared = sum((rx - ry) ** 2 for rx, ry in zip(ranks_x, ranks_y))

            if n_pairs <= 1:
                rho = 0
            else:
                rho = 1 - (6 * d_squared) / (n_pairs * (n_pairs ** 2 - 1))

            steps.append(f"Data X: {x}")
            steps.append(f"Data Y: {y}")
            steps.append(f"Ranks X: {[round(r, 2) for r in ranks_x]}")
            steps.append(f"Ranks Y: {[round(r, 2) for r in ranks_y]}")
            steps.append(f"D = Rank(X) - Rank(Y)")
            steps.append(f"D^2 values: {[round((rx - ry)**2, 4) for rx, ry in zip(ranks_x, ranks_y)]}")
            steps.append(f"Sum(D^2) = {d_squared:.4f}")
            steps.append(f"Formula: rho = 1 - (6 * Sum(D^2)) / (n * (n^2 - 1))")
            steps.append(f"rho = 1 - (6 * {d_squared:.4f}) / ({n_pairs} * ({n_pairs}^2 - 1))")
            steps.append(f"rho = {rho:.4f}")

            return {"topic": "statistics", "operation": "correlation_spearman", "answer": round(rho, 4),
                    "steps": steps, "verification": f"rho = {rho:.4f}"}

        else:
            return {"error": f"Unknown method: {method}", "answer": None, "steps": ["Invalid method"],
                    "verification": "N/A"}

    # ---- Z-Score and Percentile ----

    @staticmethod
    def solve_zscore(raw_score: float, mean: float, sd: float) -> Dict[str, Any]:
        steps = []
        z = (raw_score - mean) / sd
        percentile = z_to_percentile(z)
        steps.append(f"Raw Score = {raw_score}")
        steps.append(f"Mean = {mean}, SD = {sd}")
        steps.append(f"Z = (X - Mean) / SD = ({raw_score} - {mean}) / {sd}")
        steps.append(f"Z = {z:.4f}")
        steps.append(f"Percentile rank = {percentile:.2f}%")
        steps.append(f"Interpretation: The score of {raw_score} is {abs(z):.2f} SDs {'above' if z > 0 else 'below'} the mean")

        if z > 0:
            below_percent = percentile
            above_percent = 100 - percentile
        else:
            below_percent = percentile
            above_percent = 100 - percentile

        steps.append(f"{below_percent:.1f}% of scores fall below, {above_percent:.1f}% fall above")
        return {"topic": "statistics", "operation": "zscore", "answer": round(z, 4),
                "percentile": round(percentile, 2), "below_percent": round(below_percent, 1),
                "above_percent": round(above_percent, 1),
                "steps": steps, "verification": f"Z={z:.4f}, Percentile={percentile:.2f}%"}

    # ---- Personality: Type A/B ----

    @staticmethod
    def solve_personality_type(answers: Dict[str, str]) -> Dict[str, Any]:
        """
        answers: dict with keys like 'q1'..'q10', values 'A' or 'B'
        Type A indicators: competitive, impatient, aggressive, time-urgent
        Type B indicators: relaxed, patient, easy-going
        """
        type_a_count = sum(1 for v in answers.values() if v.upper() == 'A')
        type_b_count = sum(1 for v in answers.values() if v.upper() == 'B')
        total = type_a_count + type_b_count

        steps = [f"Responses: {answers}"]
        steps.append(f"Type A responses: {type_a_count}, Type B responses: {type_b_count}, Total: {total}")
        steps.append(f"Type A score = {type_a_count}/{total} = {(type_a_count/total)*100:.1f}%")

        if type_a_count > type_b_count:
            personality_type = "Type A"
            description = "Competitive, time-urgent, impatient, aggressive. Higher risk of coronary heart disease. Prone to stress."
        elif type_b_count > type_a_count:
            personality_type = "Type B"
            description = "Relaxed, patient, easy-going, less competitive. Lower risk of coronary heart disease. Better stress management."
        else:
            personality_type = "Balanced (Type A/B)"
            description = "Shows characteristics of both types. Moderate stress response."

        steps.append(f"Personality Type: {personality_type}")
        steps.append(f"Description: {description}")
        return {"topic": "personality_types", "operation": "type_ab_assessment",
                "answer": personality_type, "type_a_score": type_a_count, "type_b_score": type_b_count,
                "steps": steps,
                "verification": f"Type A: {type_a_count}/{total}, Type B: {type_b_count}/{total} -> {personality_type}"}

    # ---- Stress Assessment ----

    @staticmethod
    def solve_stress_assessment(scores: Dict[str, int]) -> Dict[str, Any]:
        """
        scores: dict with stress symptom scores (e.g., {'anxiety': 3, 'irritability': 2, ...})
        """
        steps = []
        total_score = sum(scores.values())
        max_possible = len(scores) * 4
        percentage = (total_score / max_possible) * 100

        steps.append(f"Stress symptom scores: {scores}")
        steps.append(f"Total score = {total_score}")
        steps.append(f"Maximum possible = {max_possible}")
        steps.append(f"Stress level = {total_score}/{max_possible} = {percentage:.1f}%")

        if percentage >= 75:
            level = "High Stress"
            recommendation = "Seek professional help. Practice daily relaxation techniques. Consider counselling."
        elif percentage >= 50:
            level = "Moderate Stress"
            recommendation = "Use problem-focused and emotion-focused coping. Exercise regularly. Talk to friends/family."
        elif percentage >= 25:
            level = "Low Stress"
            recommendation = "Maintain current coping strategies. Continue healthy lifestyle."
        else:
            level = "Minimal Stress"
            recommendation = "Stress levels are well-managed. Keep up good habits."

        steps.append(f"Stress Level: {level}")
        steps.append(f"Recommendation: {recommendation}")

        return {"topic": "stress", "operation": "stress_assessment",
                "answer": level, "total_score": total_score, "percentage": round(percentage, 1),
                "recommendation": recommendation,
                "steps": steps,
                "verification": f"Score {total_score}/{max_possible} = {percentage:.1f}% -> {level}"}

    @staticmethod
    def solve_stress_stage(symptoms: List[str]) -> Dict[str, Any]:
        steps = []
        alarm = ["increased heart rate", "rapid breathing", "sweating", "adrenaline rush", "fight or flight"]
        resistance = ["chronic fatigue", "irritability", "poor concentration", "sleep problems", "frequent illness"]
        exhaustion = ["burnout", "severe illness", "depression", "immune system failure", "collapse"]

        alarm_count = sum(1 for s in symptoms if any(a in s.lower() for a in alarm))
        resistance_count = sum(1 for s in symptoms if any(r in s.lower() for r in resistance))
        exhaustion_count = sum(1 for s in symptoms if any(e in s.lower() for e in exhaustion))

        steps.append(f"Reported symptoms: {symptoms}")
        steps.append(f"Alarm stage indicators: {alarm_count}")
        steps.append(f"Resistance stage indicators: {resistance_count}")
        steps.append(f"Exhaustion stage indicators: {exhaustion_count}")

        if exhaustion_count > resistance_count and exhaustion_count > alarm_count:
            stage = "Exhaustion"
            description = "Resources depleted. Body can no longer resist. Risk of serious illness. Immediate intervention needed."
        elif resistance_count > alarm_count:
            stage = "Resistance"
            description = "Body adapting but at cost. Chronic stress response active. Cortisol elevated. Risk of progression to exhaustion."
        else:
            stage = "Alarm"
            description = "Initial fight-or-flight response activated. Adrenaline surge. Short-term adaptive response."

        steps.append(f"Stage: {stage}")
        steps.append(f"Description: {description}")
        return {"topic": "stress", "operation": "gas_stage", "answer": stage,
                "alarm_indicators": alarm_count, "resistance_indicators": resistance_count,
                "exhaustion_indicators": exhaustion_count,
                "steps": steps,
                "verification": f"Stage identified: {stage} (A:{alarm_count}, R:{resistance_count}, E:{exhaustion_count})"}

    # ---- Coping Strategy ----

    @staticmethod
    def solve_coping_recommendation(stressor_type: str, controllability: str) -> Dict[str, Any]:
        steps = []
        steps.append(f"Stressor type: {stressor_type}")
        steps.append(f"Controllability: {controllability}")

        if controllability.lower() in ["high", "controllable", "yes"]:
            primary = "Problem-Focused Coping"
            secondary = "Emotion-Focused Coping (as supplement)"
            techniques = ["Active problem-solving", "Time management", "Seeking information",
                          "Taking direct action", "Setting clear goals"]
            reasoning = "Since the stressor is controllable, directly addressing the problem is most effective."
        else:
            primary = "Emotion-Focused Coping"
            secondary = "Problem-Focused (if any aspect is controllable)"
            techniques = ["Seeking emotional support", "Positive reframing", "Acceptance",
                          "Relaxation/meditation", "Religious/spiritual practices", "Humor"]
            reasoning = "Since the stressor is uncontrollable, managing emotional response is the key strategy."

        steps.append(f"Recommended primary strategy: {primary}")
        steps.append(f"Reasoning: {reasoning}")
        steps.append(f"Techniques: {techniques}")

        return {"topic": "coping", "operation": "coping_recommendation",
                "answer": primary, "primary_strategy": primary,
                "techniques": techniques,
                "steps": steps,
                "verification": f"{primary} recommended for {controllability} controllability stressor"}

    # ---- Defence Mechanism Identification ----

    @staticmethod
    def identify_defence_mechanism(scenario: str) -> Dict[str, Any]:
        steps = []
        steps.append(f"Scenario: {scenario}")

        mechanisms = {
            "repression": (["forgot", "forgotten", "cannot remember", "memory loss"], "Pushing threatening thoughts into unconscious"),
            "denial": (["denies", "refuses to accept", "pretends not", "won't believe"], "Refusing to acknowledge reality"),
            "projection": (["accuses others of", "blames others for feeling", "others are"], "Attributing own feelings to others"),
            "displacement": (["angry at", "takes out on", "yells at", "redirected"], "Redirecting emotion to safer target"),
            "rationalization": (["justifies", "makes excuses", "logical reason", "because"], "Creating false logical explanations"),
            "reaction_formation": (["acts opposite", "too friendly", "overly kind", "extreme opposite"], "Expressing opposite of true feelings"),
            "sublimation": (["channels into", "redirects to", "art", "sports", "creativity"], "Redirecting impulses to socially valued activities"),
            "regression": (["childish", "tantrum", "thumb", "baby", "immature"], "Reverting to childlike behaviour"),
            "undoing": (["tries to undo", "overcompensate", "excessive kindness after"], "Doing opposite to undo unacceptable act"),
            "identification": (["copies", "imitates", "wants to be like", "models after"], "Adopting traits of powerful person"),
            "intellectualization": (["focuses on facts", "detached", "clinical", "abstract"], "Using logic to avoid emotion"),
            "compensation": (["overachieves", "excels at", "makes up for", "outstanding in"], "Overachieving in one area to cover deficits")
        }

        scenario_lower = scenario.lower()
        best_match = "Unknown"
        best_score = 0

        for mech, (keywords, definition) in mechanisms.items():
            score = sum(1 for kw in keywords if kw in scenario_lower)
            if score > best_score:
                best_score = score
                best_match = mech

        definition = mechanisms.get(best_match, ("", "Cannot determine"))[1]

        steps.append(f"Keyword matching performed against all 12 defence mechanisms")
        steps.append(f"Best match: {best_match} (keyword matches: {best_score})")
        steps.append(f"Definition: {definition}")

        return {"topic": "psychological_disorders", "operation": "defence_mechanism",
                "answer": best_match, "definition": definition, "steps": steps,
                "verification": f"Defence mechanism identified: {best_match}"}

    # ---- Disorder Classification ----

    @staticmethod
    def classify_disorder(symptoms: List[str]) -> Dict[str, Any]:
        steps = []
        steps.append(f"Reported symptoms: {symptoms}")

        disorder_db = {
            "Major Depressive Disorder": {
                "keywords": ["sad", "sadness", "hopeless", "worthless", "loss of interest",
                             "no pleasure", "fatigue", "sleep too much", "sleep too little",
                             "appetite", "guilt", "suicidal", "crying"],
                "category": "Mood Disorder"
            },
            "Generalized Anxiety Disorder": {
                "keywords": ["excessive worry", "anxious", "restless", "tension", "irritable",
                             "sleep", "concentration", "worrying", "fear", "nervous", "panic"],
                "category": "Anxiety Disorder"
            },
            "Panic Disorder": {
                "keywords": ["panic attack", "heart pounding", "chest pain", "shortness of breath",
                             "fear of dying", "sweating", "trembling", "dizziness", "choking"],
                "category": "Anxiety Disorder"
            },
            "Specific Phobia": {
                "keywords": ["fear of", "phobia", "avoid", "heights", "spiders", "flying",
                             "water", "closed spaces", "irrational fear"],
                "category": "Anxiety Disorder"
            },
            "OCD": {
                "keywords": ["obsession", "compulsion", "repeated thoughts", "ritual",
                             "hand washing", "checking", "counting", "intrusive thoughts"],
                "category": "Anxiety Disorder"
            },
            "Bipolar Disorder": {
                "keywords": ["manic", "mania", "elevated mood", "grandiose", "racing thoughts",
                             "decreased sleep", "impulsive", "depressed", "mood swings", "euphoric"],
                "category": "Mood Disorder"
            },
            "Schizophrenia": {
                "keywords": ["hallucination", "delusion", "hearing voices", "paranoid",
                             "disorganized", "bizarre", "catatonic", "flat affect", "social withdrawal"],
                "category": "Psychotic Disorder"
            },
            "Dissociative Identity Disorder": {
                "keywords": ["multiple personalities", "identity", "memory gaps", "blackout",
                             "different names", "lost time", "amnesia", "dissociation"],
                "category": "Dissociative Disorder"
            },
            "PTSD": {
                "keywords": ["trauma", "flashback", "nightmare", "traumatic event", "avoidance",
                             "hypervigilance", "startle", "intrusive memories"],
                "category": "Trauma-Related Disorder"
            },
            "Somatic Symptom Disorder": {
                "keywords": ["physical symptoms", "pain", "no medical cause", "health anxiety",
                             "body", "somatic", "doctor shopping", "illness worry"],
                "category": "Somatic Symptom Disorder"
            },
            "ADHD": {
                "keywords": ["inattention", "hyperactive", "impulsive", "cannot focus",
                             "fidget", "restless", "forgetful", "distracted"],
                "category": "Neurodevelopmental Disorder"
            },
            "Anorexia Nervosa": {
                "keywords": ["not eating", "weight loss", "thin", "body image", "fear of gaining weight",
                             "starving", "calories", "underweight"],
                "category": "Eating Disorder"
            },
            "Borderline Personality Disorder": {
                "keywords": ["unstable relationships", "fear of abandonment", "impulsive",
                             "self-harm", "identity disturbance", "intense emotions", "black and white thinking"],
                "category": "Personality Disorder (Cluster B)"
            }
        }

        symptom_text = " ".join(s.lower() for s in symptoms)
        best_disorder = "Unclassified - Professional Assessment Needed"
        best_category = "N/A"
        best_score = 0

        for disorder, info in disorder_db.items():
            score = sum(1 for kw in info["keywords"] if kw in symptom_text)
            if score > best_score:
                best_score = score
                best_disorder = disorder
                best_category = info["category"]

        confidence = "High" if best_score >= 3 else "Moderate" if best_score >= 2 else "Low"

        steps.append(f"Symptom text analysis performed against disorder database")
        steps.append(f"Best match: {best_disorder} ({best_category})")
        steps.append(f"Matching symptom count: {best_score}")
        steps.append(f"Confidence: {confidence}")

        return {"topic": "psychological_disorders", "operation": "disorder_classification",
                "answer": best_disorder, "category": best_category, "confidence": confidence,
                "match_count": best_score,
                "steps": steps,
                "verification": f"Disorder: {best_disorder}, Category: {best_category}, Confidence: {confidence}"}

    # ---- Therapy Matching ----

    @staticmethod
    def match_therapy(disorder: str, symptoms: List[str] = None) -> Dict[str, Any]:
        steps = []
        steps.append(f"Disorder: {disorder}")

        therapy_map = {
            "Major Depressive Disorder": {
                "primary": ["Cognitive Behaviour Therapy (CBT)", "Interpersonal Therapy (IPT)"],
                "secondary": ["Psychodynamic Therapy", "Behavioural Activation", "Antidepressant medication (SSRIs)"],
                "best_single": "Cognitive Behaviour Therapy (CBT)",
                "reasoning": "CBT effectively targets negative thought patterns and behavioural withdrawal. Strong evidence base for depression."
            },
            "Generalized Anxiety Disorder": {
                "primary": ["Cognitive Behaviour Therapy (CBT)", "Mindfulness-Based Cognitive Therapy"],
                "secondary": ["Relaxation training", "Anxiolytic medication (short-term benzodiazepines/buspirone)"],
                "best_single": "Cognitive Behaviour Therapy (CBT)",
                "reasoning": "CBT with exposure and cognitive restructuring effectively reduces worry and physiological arousal."
            },
            "Panic Disorder": {
                "primary": ["Cognitive Behaviour Therapy (CBT)", "Panic-Focused CBT"],
                "secondary": ["SSRIs", "Breathing retraining", "Interoceptive exposure"],
                "best_single": "Cognitive Behaviour Therapy (CBT) with interoceptive exposure",
                "reasoning": "CBT addresses catastrophic misinterpretations of bodily sensations. Interoceptive exposure reduces panic response."
            },
            "Specific Phobia": {
                "primary": ["Systematic Desensitization", "Flooding", "Exposure Therapy"],
                "secondary": ["Virtual Reality Exposure", "Modelling"],
                "best_single": "Systematic Desensitization",
                "reasoning": "Gradual exposure paired with relaxation is most effective. Systematic desensitization by Wolpe is gold standard for phobias."
            },
            "OCD": {
                "primary": ["Exposure and Response Prevention (ERP)", "Cognitive Behaviour Therapy"],
                "secondary": ["SSRIs (high dose)", "Clomipramine"],
                "best_single": "Exposure and Response Prevention (ERP)",
                "reasoning": "ERP is specifically designed for OCD. Exposing to obsession trigger while preventing compulsion."
            },
            "Schizophrenia": {
                "primary": ["Antipsychotic Medication (Chlorpromazine, Haloperidol, Clozapine)"],
                "secondary": ["Cognitive Remediation Therapy", "Family Therapy", "Social Skills Training"],
                "best_single": "Antipsychotic Medication + Psychosocial Rehabilitation",
                "reasoning": "Medication is essential for positive symptoms. CBTp and family therapy help with insight and relapse prevention."
            },
            "Bipolar Disorder": {
                "primary": ["Mood Stabilizers (Lithium, Valproate)", "Atypical Antipsychotics"],
                "secondary": ["CBT for bipolar", "Interpersonal and Social Rhythm Therapy (IPSRT)", "Psychoeducation"],
                "best_single": "Lithium (Mood Stabilizer) + Psychoeducation",
                "reasoning": "Lithium is gold standard. IPSRT helps regulate biological rhythms. CBT manages episodes."
            },
            "PTSD": {
                "primary": ["Prolonged Exposure (PE)", "Cognitive Processing Therapy (CPT)", "EMDR"],
                "secondary": ["SSRIs (Sertraline, Paroxetine)", "Stress Inoculation Training"],
                "best_single": "Prolonged Exposure (PE) or EMDR",
                "reasoning": "Trauma-focused CBT approaches are first-line. EMDR effective for processing traumatic memories."
            },
            "Borderline Personality Disorder": {
                "primary": ["Dialectical Behaviour Therapy (DBT)", "Mentalization-Based Therapy (MBT)"],
                "secondary": ["Schema Therapy", "Transference-Focused Psychotherapy"],
                "best_single": "Dialectical Behaviour Therapy (DBT)",
                "reasoning": "DBT specifically designed for BPD. Combines CBT with mindfulness and acceptance strategies. Reduces self-harm and emotional dysregulation."
            },
            "Substance Use Disorder": {
                "primary": ["Motivational Enhancement Therapy", "Cognitive Behaviour Therapy", "12-Step Facilitation"],
                "secondary": ["Medication-Assisted Treatment (MAT)", "Contingency Management"],
                "best_single": "Cognitive Behaviour Therapy + Motivational Interviewing",
                "reasoning": "CBT helps develop coping skills. Motivational interviewing enhances readiness to change."
            },
            "Anorexia Nervosa": {
                "primary": ["Family-Based Treatment (FBT) - Maudsley Approach", "Nutritional Rehabilitation"],
                "secondary": ["CBT-E (Enhanced)", "Hospitalization (if severe)"],
                "best_single": "Family-Based Treatment (FBT)",
                "reasoning": "FBT is first-line for adolescents. Parents empowered to manage re-feeding. CBT-E for adults."
            },
            "Dissociative Identity Disorder": {
                "primary": ["Long-term Psychodynamic Psychotherapy", "Integration-Focused Therapy"],
                "secondary": ["Phase-Oriented Treatment (Stabilization-Trauma Work-Integration)", "EMDR"],
                "best_single": "Long-term Phase-Oriented Psychotherapy",
                "reasoning": "Three-phase approach: safety/stabilization first, then trauma processing, then identity integration. Long-term therapy required."
            }
        }

        best_match = None
        for key in therapy_map:
            if key.lower() == disorder.lower() or disorder.lower() in key.lower() or key.lower() in disorder.lower():
                best_match = therapy_map[key]
                break

        if not best_match:
            # Try partial match
            for key in therapy_map:
                disorder_words = set(disorder.lower().split())
                key_words = set(key.lower().split())
                if disorder_words & key_words:
                    best_match = therapy_map[key]
                    break

        if best_match:
            steps.append(f"Therapy recommendations retrieved from evidence-based database")
            steps.append(f"Primary therapies: {best_match['primary']}")
            steps.append(f"Secondary/adjunct therapies: {best_match['secondary']}")
            steps.append(f"Most effective single approach: {best_match['best_single']}")
            steps.append(f"Reasoning: {best_match['reasoning']}")

            return {"topic": "therapies", "operation": "therapy_matching",
                    "answer": best_match["best_single"],
                    "primary_therapies": best_match["primary"],
                    "secondary_therapies": best_match["secondary"],
                    "reasoning": best_match["reasoning"],
                    "steps": steps,
                    "verification": f"Best therapy: {best_match['best_single']} for {disorder}"}
        else:
            steps.append("No specific matching therapy found in database")
            steps.append("Recommend: General CBT + Psychiatric evaluation")
            return {"topic": "therapies", "operation": "therapy_matching",
                    "answer": "General CBT + Psychiatric Evaluation",
                    "primary_therapies": ["CBT", "Psychiatric Medication Review"],
                    "steps": steps,
                    "verification": "Generic recommendation - no exact disorder match"}

    # ---- Attitude Analysis ----

    @staticmethod
    def solve_attitude_abc(affective: float, behavioural: float, cognitive: float) -> Dict[str, Any]:
        steps = []
        steps.append(f"Affective component score: {affective}/10")
        steps.append(f"Behavioural component score: {behavioural}/10")
        steps.append(f"Cognitive component score: {cognitive}/10")

        overall = (affective + behavioural + cognitive) / 3
        steps.append(f"Overall attitude strength = ({affective} + {behavioural} + {cognitive}) / 3 = {overall:.2f}")

        components = {"Affective": affective, "Behavioural": behavioural, "Cognitive": cognitive}
        strongest = max(components, key=components.get)

        if overall >= 7:
            strength = "Strong Attitude"
            prediction = "High likelihood of consistent behaviour"
        elif overall >= 4:
            strength = "Moderate Attitude"
            prediction = "Moderate likelihood of behaviour; susceptible to persuasion"
        else:
            strength = "Weak Attitude"
            prediction = "Low likelihood of consistent behaviour; easily changed"

        steps.append(f"Overall attitude: {strength}")
        steps.append(f"Strongest component: {strongest} ({components[strongest]}/10)")
        steps.append(f"Behaviour prediction: {prediction}")

        return {"topic": "attitude", "operation": "abc_analysis",
                "answer": strength, "overall_score": round(overall, 2),
                "strongest_component": strongest,
                "steps": steps,
                "verification": f"Attitude strength: {strength}, Score: {overall:.2f}/10"}

    @staticmethod
    def solve_persuasion_route(message_type: str, audience_motivation: str,
                               audience_ability: str) -> Dict[str, Any]:
        steps = []
        steps.append(f"Message type: {message_type}")
        steps.append(f"Audience motivation: {audience_motivation}")
        steps.append(f"Audience ability: {audience_ability}")

        high_motivation = audience_motivation.lower() in ["high", "yes", "involved", "interested"]
        high_ability = audience_ability.lower() in ["high", "yes", "capable", "educated"]

        if high_motivation and high_ability:
            route = "Central Route"
            strategy = "Use strong arguments, facts, statistics, logical reasoning. Audience will carefully process the message."
            effectiveness = "High - produces lasting attitude change"
        elif not high_motivation or not high_ability:
            route = "Peripheral Route"
            strategy = "Use emotional appeals, attractive source, celebrity endorsements, catchy slogans. Superficial processing."
            effectiveness = "Moderate - produces temporary attitude change"
        else:
            route = "Both Routes (sequential)"
            strategy = "Start with peripheral cues to gain attention, then shift to central arguments."
            effectiveness = "High if both routes activated"

        steps.append(f"Effective persuasion route: {route}")
        steps.append(f"Strategy: {strategy}")
        steps.append(f"Expected effectiveness: {effectiveness}")

        return {"topic": "attitude", "operation": "persuasion_route",
                "answer": route, "strategy": strategy, "effectiveness": effectiveness,
                "steps": steps,
                "verification": f"Persuasion route: {route}"}

    # ---- Social Influence ----

    @staticmethod
    def solve_conformity(group_size: int, unanimity: bool, has_ally: bool) -> Dict[str, Any]:
        steps = []
        steps.append(f"Group size: {group_size}")
        steps.append(f"Unanimity: {unanimity}")
        steps.append(f"Has ally (someone agreeing with participant): {has_ally}")

        # Base conformity rate from Asch: ~32% for 3-5 person unanimous group
        base_rate = 0.32

        if group_size <= 2:
            conformity_factor = 0.3
        elif group_size <= 5:
            conformity_factor = 1.0
        elif group_size <= 10:
            conformity_factor = 1.1
        else:
            conformity_factor = 1.15  # Diminishing returns

        if not unanimity:
            conformity_factor *= 0.2

        if has_ally:
            conformity_factor *= 0.25

        conformity_rate = base_rate * conformity_factor
        conformity_percent = min(conformity_rate * 100, 95)

        steps.append(f"Base conformity rate (Asch): {base_rate*100:.0f}%")
        steps.append(f"Group size factor: {conformity_factor:.2f}")
        steps.append(f"Estimated conformity: {conformity_percent:.1f}%")

        if conformity_percent >= 50:
            level = "Very High Conformity"
        elif conformity_percent >= 30:
            level = "High Conformity"
        elif conformity_percent >= 15:
            level = "Moderate Conformity"
        else:
            level = "Low Conformity"

        return {"topic": "social_influence", "operation": "conformity_estimate",
                "answer": level, "conformity_percent": round(conformity_percent, 1),
                "steps": steps,
                "verification": f"Estimated conformity: {conformity_percent:.1f}% ({level})"}

    @staticmethod
    def solve_milgram_factors(authority_present: bool, proximity_learner: str,
                               proximity_authority: str) -> Dict[str, Any]:
        steps = []
        steps.append(f"Authority figure physically present: {authority_present}")
        steps.append(f"Proximity to learner: {proximity_learner}")
        steps.append(f"Proximity to authority: {proximity_authority}")

        base_obedience = 0.65

        if authority_present:
            base_obedience = min(base_obedience * 1.3, 0.90)
            steps.append(f"Authority present: obedience increases significantly")
        else:
            steps.append(f"Authority not present: obedience decreases")

        if proximity_learner == "same room":
            base_obedience *= 0.4
            steps.append(f"Learner in same room: obedience reduced to ~30%")
        elif proximity_learner == "close contact":
            base_obedience *= 0.3
            steps.append(f"Learner close contact (touch proximity): obedience ~20%")
        else:
            steps.append(f"Learner in another room: baseline obedience")

        if proximity_authority == "absent":
            base_obedience *= 0.3
            steps.append(f"Authority absent: obedience drops dramatically")
        elif proximity_authority == "phone":
            base_obedience *= 0.8
            steps.append(f"Authority via phone: slight reduction")
        else:
            steps.append(f"Authority in same room: baseline")

        obedience_pct = min(base_obedience * 100, 95)
        steps.append(f"Estimated obedience rate: {obedience_pct:.1f}%")

        return {"topic": "social_influence", "operation": "milgram_obedience",
                "answer": f"{obedience_pct:.1f}%", "obedience_percent": round(obedience_pct, 1),
                "steps": steps,
                "verification": f"Estimated obedience: {obedience_pct:.1f}%"}

    # ---- Big Five Personality Assessment ----

    @staticmethod
    def solve_big_five(scores: Dict[str, int]) -> Dict[str, Any]:
        steps = []
        steps.append("Big Five (OCEAN) Personality Assessment")
        steps.append(f"Scores (1-10 scale): {scores}")

        labels = {
            "Openness": "Openness to Experience",
            "Conscientiousness": "Conscientiousness",
            "Extraversion": "Extraversion",
            "Agreeableness": "Agreeableness",
            "Neuroticism": "Neuroticism (Emotional Stability)"
        }

        descriptions = {
            "Openness": {
                "high": "Creative, imaginative, curious, artistic, open to new ideas",
                "low": "Practical, conventional, prefers routine, resistant to change"
            },
            "Conscientiousness": {
                "high": "Organized, reliable, disciplined, achievement-oriented, dependable",
                "low": "Spontaneous, disorganized, unreliable, procrastinates, careless"
            },
            "Extraversion": {
                "high": "Sociable, assertive, energetic, talkative, seeks excitement",
                "low": "Reserved, quiet, introspective, prefers solitude, independent"
            },
            "Agreeableness": {
                "high": "Cooperative, trusting, helpful, compassionate, altruistic",
                "low": "Competitive, skeptical, antagonistic, critical, stubborn"
            },
            "Neuroticism": {
                "high": "Anxious, moody, irritable, emotionally unstable, worried",
                "low": "Calm, stable, secure, resilient, even-tempered"
            }
        }

        results = {}
        for trait, score in scores.items():
            level = "High" if score >= 7 else "Low" if score <= 3 else "Moderate"
            desc_key = "high" if score >= 6 else "low"
            desc = descriptions[trait][desc_key]
            results[trait] = {"score": score, "level": level, "description": desc}
            steps.append(f"  {trait}: {score}/10 -> {level} - {desc}")

        highest = max(scores, key=scores.get)
        lowest = min(scores, key=scores.get)

        steps.append(f"Dominant trait: {highest} ({scores[highest]}/10)")
        steps.append(f"Least prominent trait: {lowest} ({scores[lowest]}/10)")

        return {"topic": "personality_traits", "operation": "big_five_assessment",
                "answer": results, "dominant_trait": highest,
                "steps": steps, "verification": f"Dominant: {highest}, Least: {lowest}"}

    # ---- Creativity Assessment ----

    @staticmethod
    def solve_creativity_assessment(fluency: int, flexibility: int,
                                     originality: int, elaboration: int) -> Dict[str, Any]:
        steps = []
        steps.append(f"Fluency (number of ideas): {fluency}")
        steps.append(f"Flexibility (variety of categories): {flexibility}")
        steps.append(f"Originality (uniqueness of ideas): {originality}")
        steps.append(f"Elaboration (detail level): {elaboration}")

        total = fluency + flexibility + originality + elaboration
        max_total = 40
        creativity_score = (total / max_total) * 100

        steps.append(f"Total creativity score = {fluency} + {flexibility} + {originality} + {elaboration} = {total}")
        steps.append(f"Creativity Index = ({total} / {max_total}) x 100 = {creativity_score:.1f}%")

        if creativity_score >= 80:
            level = "Very High Creativity"
            profile = "Exceptionally creative. Divergent thinking is a core strength."
        elif creativity_score >= 60:
            level = "High Creativity"
            profile = "Creative thinker with good originality and fluency."
        elif creativity_score >= 40:
            level = "Moderate Creativity"
            profile = "Average creative ability. Room for improvement in originality."
        elif creativity_score >= 20:
            level = "Low Creativity"
            profile = "Prefers conventional thinking. Convergent thinking dominant."
        else:
            level = "Very Low Creativity"
            profile = "Strongly conventional. Rigid thinking patterns."

        steps.append(f"Creativity Level: {level}")
        steps.append(f"Profile: {profile}")

        return {"topic": "creativity", "operation": "creativity_assessment",
                "answer": level, "creativity_index": round(creativity_score, 1),
                "total_score": total,
                "steps": steps,
                "verification": f"Creativity Index: {creativity_score:.1f}% -> {level}"}

    # ---- Prosocial Behaviour ----

    @staticmethod
    def solve_bystander_intervention(num_bystanders: int, ambiguity: str,
                                      relationship: str, gender: str) -> Dict[str, Any]:
        steps = []
        steps.append(f"Number of bystandanders present: {num_bystanders}")
        steps.append(f"Situational ambiguity: {ambiguity}")
        steps.append(f"Relationship to victim: {relationship}")
        steps.append(f"Gender: {gender}")

        # Base probability of helping
        base_prob = 0.70

        # Diffusion of responsibility effect
        if num_bystanders == 1:
            diffusion_factor = 1.0
        elif num_bystanders <= 3:
            diffusion_factor = 0.8
        elif num_bystanders <= 6:
            diffusion_factor = 0.5
        else:
            diffusion_factor = 0.2
        steps.append(f"Diffusion factor (n={num_bystanders}): {diffusion_factor:.2f}")

        # Ambiguity effect
        ambiguity_lower = ambiguity.lower()
        if ambiguity_lower in ["high", "unclear", "ambiguous"]:
            ambiguity_factor = 0.5
            steps.append("High ambiguity: people less likely to interpret as emergency")
        else:
            ambiguity_factor = 1.0
            steps.append("Clear emergency: people more likely to help")

        # Relationship effect
        rel_lower = relationship.lower()
        if rel_lower in ["friend", "family", "known"]:
            relationship_factor = 1.5
            steps.append("Victim is known: increased helping")
        elif rel_lower in ["stranger", "unknown"]:
            relationship_factor = 0.8
            steps.append("Victim is stranger: reduced helping")
        else:
            relationship_factor = 1.0
            steps.append("Neutral relationship")

        helping_prob = base_prob * diffusion_factor * ambiguity_factor * relationship_factor
        helping_prob = min(helping_prob, 0.95)

        steps.append(f"Probability of helping = {base_prob} x {diffusion_factor:.2f} x {ambiguity_factor:.2f} x {relationship_factor:.2f}")
        steps.append(f"Probability of helping = {helping_prob:.2f} ({helping_prob * 100:.1f}%)")

        if helping_prob >= 0.7:
            likelihood = "High likelihood of helping"
        elif helping_prob >= 0.4:
            likelihood = "Moderate likelihood of helping"
        else:
            likelihood = "Low likelihood of helping (bystander effect strong)"

        return {"topic": "prosocial", "operation": "bystander_intervention",
                "answer": likelihood, "helping_probability": round(helping_prob, 2),
                "steps": steps,
                "verification": f"Helping probability: {helping_prob*100:.1f}% -> {likelihood}"}

    # ---- Main Dispatcher ----

    def solve(self, topic: str, params: Dict[str, Any]) -> Dict[str, Any]:
        topic_lower = topic.lower().replace(" ", "_")

        if topic_lower in ["statistics", "mean", "median", "mode", "sd", "range",
                            "quartile_deviation", "coefficient_of_variation"]:
            if "data" in params and "operation" in params:
                return self.solve_statistics(params["data"], params["operation"])
            return {"error": "Missing 'data' or 'operation' parameter", "answer": None,
                    "steps": ["Invalid parameters for statistics"], "verification": "N/A"}

        elif topic_lower == "iq":
            return self.solve_iq(params.get("mental_age", 10), params.get("chronological_age", 10))

        elif topic_lower == "iq_deviation":
            return self.solve_iq_deviation(
                params.get("iq_score", 100),
                params.get("mean_iq", 100),
                params.get("sd_iq", 15)
            )

        elif topic_lower == "zscore":
            return self.solve_zscore(
                params.get("raw_score", 0),
                params.get("mean", 100),
                params.get("sd", 15)
            )

        elif topic_lower == "correlation_pearson":
            return self.solve_correlation(params["x"], params["y"], "pearson")

        elif topic_lower == "correlation_spearman":
            return self.solve_correlation(params["x"], params["y"], "spearman")

        elif topic_lower == "personality_type_ab":
            return self.solve_personality_type(params.get("answers", {}))

        elif topic_lower == "stress_assessment":
            return self.solve_stress_assessment(params.get("scores", {}))

        elif topic_lower == "stress_stage":
            return self.solve_stress_stage(params.get("symptoms", []))

        elif topic_lower == "coping":
            return self.solve_coping_recommendation(
                params.get("stressor_type", "unknown"),
                params.get("controllability", "low")
            )

        elif topic_lower == "defence_mechanism":
            return self.identify_defence_mechanism(params.get("scenario", ""))

        elif topic_lower == "disorder_classification":
            return self.classify_disorder(params.get("symptoms", []))

        elif topic_lower == "therapy_matching":
            return self.match_therapy(params.get("disorder", ""))

        elif topic_lower == "attitude_abc":
            return self.solve_attitude_abc(
                params.get("affective", 5),
                params.get("behavioural", 5),
                params.get("cognitive", 5)
            )

        elif topic_lower == "persuasion":
            return self.solve_persuasion_route(
                params.get("message_type", "informational"),
                params.get("audience_motivation", "high"),
                params.get("audience_ability", "high")
            )

        elif topic_lower == "conformity":
            return self.solve_conformity(
                params.get("group_size", 3),
                params.get("unanimity", True),
                params.get("has_ally", False)
            )

        elif topic_lower == "milgram_obedience":
            return self.solve_milgram_factors(
                params.get("authority_present", True),
                params.get("proximity_learner", "another_room"),
                params.get("proximity_authority", "same_room")
            )

        elif topic_lower == "big_five":
            return self.solve_big_five(params.get("scores", {}))

        elif topic_lower == "creativity":
            return self.solve_creativity_assessment(
                params.get("fluency", 5),
                params.get("flexibility", 5),
                params.get("originality", 5),
                params.get("elaboration", 5)
            )

        elif topic_lower == "bystander":
            return self.solve_bystander_intervention(
                params.get("num_bystanders", 5),
                params.get("ambiguity", "clear"),
                params.get("relationship", "stranger"),
                params.get("gender", "male")
            )

        else:
            return {"error": f"Unknown topic: {topic}", "answer": None,
                    "steps": [f"Topic '{topic}' not recognized. Available topics: statistics, iq, correlation, personality, stress, coping, disorder, therapy, attitude, conformity, creativity, bystander"],
                    "verification": "N/A"}


# ============================================================================
# DETERMINISTIC QUESTION GENERATOR
# ============================================================================

@dataclass
class GeneratedQuestion:
    topic: str
    difficulty: str
    question: str
    parameters: Dict[str, Any]
    expected_answer: Any
    explanation: str
    competency_type: str  # 'standard' or 'competency'


class QuestionGenerator:
    """Deterministic question generator using seeded randomness."""

    def __init__(self, seed: int = 42):
        self.solver = PsychologySolver()
        random.seed(seed)
        np.random.seed(seed)

    def generate_statistics_question(self, difficulty: str) -> GeneratedQuestion:
        if difficulty == "easy":
            data = [random.randint(10, 30) for _ in range(5)]
            op = random.choice(["mean", "median", "mode", "range"])
        elif difficulty == "medium":
            data = sorted([random.randint(20, 80) for _ in range(7)])
            op = random.choice(["mean", "median", "sd", "quartile_deviation"])
        else:
            data = sorted([random.randint(50, 150) for _ in range(10)])
            op = random.choice(["sd", "coefficient_of_variation"])

        result = self.solver.solve_statistics(data, op)

        indian_names = ["Rahul", "Priya", "Amit", "Sneha", "Vikram", "Kavya",
                        "Arjun", "Meera", "Rohan", "Ananya", "Dev", "Isha"]
        context = random.choice([
            f"A psychology researcher collected reaction times (in milliseconds) from {random.choice(indian_names)} and {random.choice(indian_names)} on a cognitive task.",
            f"The IQ scores of {random.randint(20, 50)} students in a Delhi school were recorded.",
            f"A study measured stress levels (on a scale of 1-100) of {random.randint(15, 30)} employees at a Bangalore IT firm.",
            f"Memory span scores of {random.randint(10, 25)} participants in a Mumbai college experiment.",
            f"Scores on an emotional intelligence test for {random.randint(20, 40)} management students in Pune."
        ])

        question = f"{context} The data is: {data}. Calculate the {op.replace('_', ' ')}."
        is_competency = random.random() > 0.5

        return GeneratedQuestion(
            topic="Statistics", difficulty=difficulty,
            question=question, parameters={"data": data, "operation": op},
            expected_answer=result["answer"],
            explanation=f"Step-by-step calculation performed. Answer: {result['answer']}",
            competency_type="competency_based" if is_competency else "standard"
        )

    def generate_iq_question(self, difficulty: str) -> GeneratedQuestion:
        ma = round(random.uniform(8, 18), 1)
        ca = round(random.uniform(10, 18), 1)
        result = self.solver.solve_iq(ma, ca)

        name = random.choice(["Aarav", "Diya", "Kabir", "Saanvi", "Ishaan", "Aadhya"])
        question = f"{name} has a mental age of {ma} years and a chronological age of {ca} years. Calculate {name}'s IQ using the Stanford-Binet formula and classify the intellectual level."
        is_competency = random.random() > 0.5

        return GeneratedQuestion(
            topic="Intelligence", difficulty=difficulty,
            question=question,
            parameters={"mental_age": ma, "chronological_age": ca},
            expected_answer=result["answer"],
            explanation=f"IQ = (MA/CA) x 100 = ({ma}/{ca}) x 100 = {result['answer']}. Classification: {result['classification']}",
            competency_type="competency_based" if is_competency else "standard"
        )

    def generate_personality_question(self, difficulty: str) -> GeneratedQuestion:
        trait = random.choice(["Type A/B", "Big Five"])

        if trait == "Type A/B":
            answers = {f"q{i}": random.choice(["A", "B"]) for i in range(1, 9)}
            result = self.solver.solve_personality_type(answers)
            type_a_indicators = ["I feel impatient when I have to wait in a queue at the Mumbai railway station",
                                 "I check my watch frequently during conversations",
                                 "I feel angry when someone drives slowly in front of me",
                                 "I eat quickly even when I have plenty of time",
                                 "I cannot relax even during holidays in Goa",
                                 "I try to do multiple tasks simultaneously at work",
                                 "I feel guilty when I am not doing something productive",
                                 "I interrupt others when they are speaking"]
            question_parts = random.sample(type_a_indicators, 5)
            question = f"Based on Friedman and Rosenman's Type A/B Personality Theory, rate the following behaviours of {random.choice(['Rahul', 'Priya', 'Amit', 'Sneha'])} as Type A (A) or Type B (B):\n"
            for i, q in enumerate(question_parts, 1):
                question += f"  {i}. {q} ->\n"

            return GeneratedQuestion(
                topic="Personality Types", difficulty=difficulty,
                question=question, parameters={"answers": answers},
                expected_answer=result["answer"],
                explanation=f"Type A score: {result['type_a_score']}, Type B score: {result['type_b_score']}. Result: {result['answer']}",
                competency_type="competency_based"
            )
        else:
            scores = {dim: random.randint(2, 10) for dim in ["Openness", "Conscientiousness",
                                                               "Extraversion", "Agreeableness", "Neuroticism"]}
            result = self.solver.solve_big_five(scores)
            question = f"Assess the personality of {random.choice(['Kavya', 'Arjun', 'Meera', 'Rohan'])} using the Big Five (OCEAN) model based on the following trait scores (1-10): Openness={scores['Openness']}, Conscientiousness={scores['Conscientiousness']}, Extraversion={scores['Extraversion']}, Agreeableness={scores['Agreeableness']}, Neuroticism={scores['Neuroticism']}. Interpret the personality profile."

            return GeneratedQuestion(
                topic="Personality Traits", difficulty=difficulty,
                question=question, parameters={"scores": scores},
                expected_answer=result["dominant_trait"],
                explanation=f"Dominant trait: {result['dominant_trait']}. Full profile: {json.dumps(result['answer'], indent=2)}",
                competency_type="competency_based"
            )

    def generate_stress_question(self, difficulty: str) -> GeneratedQuestion:
        q_type = random.choice(["assessment", "gas_stage", "coping"])

        if q_type == "assessment":
            symptoms = {
                "headaches": random.randint(1, 4),
                "sleep_problems": random.randint(1, 4),
                "irritability": random.randint(0, 4),
                "difficulty_concentrating": random.randint(1, 4),
                "muscle_tension": random.randint(0, 4),
                "fatigue": random.randint(1, 4),
                "appetite_change": random.randint(0, 4),
                "restlessness": random.randint(1, 4)
            }
            result = self.solver.solve_stress_assessment(symptoms)
            name = random.choice(["Dev", "Ananya", "Ishaan", "Aadhya", "Riya"])
            question = f"{name}, a software engineer at a Pune-based company, reports the following stress symptoms rated on a 0-4 scale: {', '.join(f'{k}={v}' for k, v in symptoms.items())}. Assess the overall stress level and provide recommendations."
            return GeneratedQuestion(
                topic="Stress", difficulty=difficulty,
                question=question, parameters={"scores": symptoms},
                expected_answer=result["answer"],
                explanation=f"Total score: {result['total_score']}/{len(symptoms)*4} = {result['percentage']}%. Level: {result['answer']}. {result['recommendation']}",
                competency_type="competency_based"
            )

        elif q_type == "gas_stage":
            symptom_sets = {
                "alarm": ["rapid heartbeat", "sweating", "immediate fear response", "adrenaline rush", "fight or flight"],
                "resistance": ["chronic fatigue", "irritability", "poor concentration", "sleep disturbances", "frequent infections"],
                "exhaustion": ["complete burnout", "clinical depression", "severe immune dysfunction", "collapse", "hopelessness"]
            }
            stage = random.choice(list(symptom_sets.keys()))
            symptoms = random.sample(symptom_sets[stage], min(4, len(symptom_sets[stage])))
            result = self.solver.solve_stress_stage(symptoms)
            name = random.choice(["Rahul", "Priya", "Kabir", "Saanvi"])
            question = f"{name} has been under chronic work pressure for 8 months and reports: {', '.join(symptoms)}. Using Selye's General Adaptation Syndrome, identify which stage of stress response {name} is experiencing."
            return GeneratedQuestion(
                topic="Stress & GAS", difficulty=difficulty,
                question=question, parameters={"symptoms": symptoms},
                expected_answer=result["answer"],
                explanation=f"Stage: {result['answer']}. {result['steps'][-1]}",
                competency_type="standard"
            )

        else:
            controllability = random.choice(["controllable", "uncontrollable"])
            stressors = {
                "controllable": ["upcoming board exam", "project deadline at work", "public speaking", "time management"],
                "uncontrollable": ["death of a family member", "chronic illness", "flood damage to home", "retrenchment from job"]
            }
            stressor = random.choice(stressors[controllability])
            result = self.solver.solve_coping_recommendation(stressor, controllability)
            question = f"A student in Delhi is stressed about {stressor}. The situation is {controllability}. Recommend the most appropriate coping strategy and explain why."
            return GeneratedQuestion(
                topic="Coping", difficulty=difficulty,
                question=question,
                parameters={"stressor_type": stressor, "controllability": controllability},
                expected_answer=result["answer"],
                explanation=f"{result['primary_strategy']} recommended. Techniques: {result['techniques']}",
                competency_type="competency_based"
            )

    def generate_disorder_question(self, difficulty: str) -> GeneratedQuestion:
        disorder_symptoms = {
            "Major Depressive Disorder": [
                "Persistent sadness and hopelessness", "Loss of interest in previously enjoyed activities",
                "Fatigue and low energy", "Difficulty sleeping (insomnia)", "Feelings of worthlessness and guilt",
                "Recurring thoughts of death", "Significant weight loss without dieting"
            ],
            "Generalized Anxiety Disorder": [
                "Excessive worry about multiple things", "Restlessness and feeling on edge",
                "Difficulty concentrating", "Irritability", "Muscle tension",
                "Sleep disturbance", "Mind going blank"
            ],
            "Schizophrenia": [
                "Hearing voices that are not there", "Belief that others are plotting against them",
                "Disorganized and incoherent speech", "Strange and inappropriate behaviour",
                "Flat emotional expression", "Social withdrawal and isolation"
            ],
            "OCD": [
                "Recurrent intrusive thoughts about contamination",
                "Compulsive hand washing for hours", "Need for symmetry and exactness",
                "Checking locks repeatedly", "Mental counting rituals",
                "Distress when rituals are interrupted"
            ],
            "Bipolar Disorder": [
                "Periods of extremely elevated mood and energy", "Grandiose beliefs about abilities",
                "Decreased need for sleep (only 2-3 hours)", "Rapid speech and racing thoughts",
                "Impulsive spending and risky behaviour", "Followed by periods of deep depression"
            ],
            "PTSD": [
                "Intrusive memories and flashbacks of the event", "Nightmares about trauma",
                "Avoidance of places reminding of trauma", "Hypervigilance and exaggerated startle response",
                "Emotional numbness", "Feelings of detachment from others"
            ]
        }

        disorder = random.choice(list(disorder_symptoms.keys()))
        n_symptoms = 4 if difficulty == "easy" else 5 if difficulty == "medium" else 6
        selected_symptoms = random.sample(disorder_symptoms[disorder], min(n_symptoms, len(disorder_symptoms[disorder])))

        result_classify = self.solver.classify_disorder(selected_symptoms)
        result_therapy = self.solver.match_therapy(result_classify["answer"])

        name = random.choice(["Vikram", "Kavya", "Arjun", "Meera", "Rohan", "Ananya"])
        question = f"{name}, a {random.randint(18, 35)}-year-old {random.choice(['student', 'software engineer', 'teacher', 'bank manager'])} from {random.choice(['Mumbai', 'Delhi', 'Bangalore', 'Chennai'])}, has been experiencing the following symptoms: {'; '.join(selected_symptoms)}. Identify the most likely psychological disorder and recommend the most effective therapeutic approach."

        return GeneratedQuestion(
            topic="Psychological Disorders & Therapy", difficulty=difficulty,
            question=question,
            parameters={"symptoms": selected_symptoms, "disorder": result_classify["answer"]},
            expected_answer=f"Disorder: {result_classify['answer']}, Therapy: {result_therapy['answer']}",
            explanation=f"Disorder: {result_classify['answer']} ({result_classify['confidence']} confidence). Therapy: {result_therapy['answer']}. Reasoning: {result_therapy['reasoning']}",
            competency_type="competency_based"
        )

    def generate_defence_mechanism_question(self, difficulty: str) -> GeneratedQuestion:
        scenarios = [
            ("After failing his engineering entrance exam, Rohan says 'I never really wanted to be an engineer anyway; it is too stressful a career.'", "rationalization"),
            ("A student who is attracted to her classmate starts bullying and teasing that classmate at school.", "reaction_formation"),
            ("After a heated argument with his boss, Sameer comes home and yells at his younger sister for a small mistake.", "displacement"),
            ("A child who was physically abused at a young age has no memory of the incident.", "repression"),
            ("Priya who secretly feels insecure about her appearance constantly criticizes others for how they look.", "projection"),
            ("A teenager whose parents divorced channels his anger into becoming a champion boxer.", "sublimation"),
            ("A woman who lost her child in an accident continues to set the table for the child every evening.", "denial"),
            ("After accidentally hurting a friend, Ananya brings them gifts and is overly nice for a week.", "undoing"),
            ("A man who feels inadequate at work starts mimicking his successful boss's mannerisms and dressing style.", "identification"),
            ("When asked about his anxiety, Raj gives a detailed, logical explanation about cortisol levels without mentioning his feelings.", "intellectualization"),
            ("A college student who performed poorly starts studying 12 hours a day to prove they are still capable.", "compensation"),
            ("A teenager whose father remarried starts bedwetting and demands to sleep with the parents again.", "regression"),
        ]

        scenario, correct_mechanism = random.choice(scenarios)
        result = self.solver.identify_defence_mechanism(scenario)

        question = f"Read the following scenario and identify the defence mechanism being used:\n\n'{scenario}'\n\nIdentify the defence mechanism and explain how it functions in this situation."
        is_competency = random.random() > 0.5

        return GeneratedQuestion(
            topic="Defence Mechanisms", difficulty=difficulty,
            question=question,
            parameters={"scenario": scenario},
            expected_answer=result["answer"],
            explanation=f"Defence mechanism: {result['answer']}. {result['definition']}",
            competency_type="competency_based" if is_competency else "standard"
        )

    def generate_social_influence_question(self, difficulty: str) -> GeneratedQuestion:
        q_type = random.choice(["conformity", "milgram", "prosocial"])

        if q_type == "conformity":
            group_size = random.choice([1, 2, 3, 5, 8, 15])
            unanimity = random.random() > 0.3
            has_ally = random.random() > 0.6
            result = self.solver.solve_conformity(group_size, unanimity, has_ally)
            question = f"In Asch's line judgment experiment, a participant is placed in a group of {group_size} confederates. {'All confederates give the same wrong answer.' if unanimity else 'Some confederates disagree with each other.'}{' One confederate agrees with the participant.' if has_ally else ' No one agrees with the participant.'} Estimate the likelihood of conformity and explain which factors are at play."
            return GeneratedQuestion(
                topic="Social Influence - Conformity", difficulty=difficulty,
                question=question,
                parameters={"group_size": group_size, "unanimity": unanimity, "has_ally": has_ally},
                expected_answer=result["answer"],
                explanation=f"Conformity: {result['conformity_percent']}%. Factors: group size, unanimity, ally presence.",
                competency_type="competency_based"
            )

        elif q_type == "milgram":
            authority = random.choice(["same_room", "absent", "phone"])
            learner = random.choice(["another_room", "same_room", "close_contact"])
            result = self.solver.solve_milgram_factors(True, learner, authority)
            question = f"In a variation of Milgram's obedience experiment, the authority figure gives orders from {authority.replace('_', ' ')}, and the learner (who receives shocks) is in {learner.replace('_', ' ')} with the participant. Estimate the obedience rate and explain the situational factors."
            return GeneratedQuestion(
                topic="Social Influence - Obedience", difficulty=difficulty,
                question=question,
                parameters={"authority_present": True, "proximity_learner": learner, "proximity_authority": authority},
                expected_answer=result["answer"],
                explanation=f"Obedience rate: {result['answer']}. Factors: proximity of victim, proximity of authority.",
                competency_type="competency_based"
            )

        else:
            bystanders = random.choice([1, 2, 5, 10, 20])
            ambiguity = random.choice(["clear", "high"])
            rel = random.choice(["stranger", "friend", "stranger"])
            result = self.solver.solve_bystander_intervention(bystanders, ambiguity, rel, "male")
            question = f"A person collapses on a busy street in {random.choice(['Delhi', 'Mumbai', 'Kolkata'])}. There are {bystanders} people present. The situation is {ambiguity}ly an emergency. The person is a {rel} to most bystanders. Using the Bystander Effect model, estimate the probability that someone will help."
            return GeneratedQuestion(
                topic="Prosocial Behaviour", difficulty=difficulty,
                question=question,
                parameters={"num_bystanders": bystanders, "ambiguity": ambiguity, "relationship": rel, "gender": "male"},
                expected_answer=result["answer"],
                explanation=f"Helping probability: {result['helping_probability']*100:.1f}%. Key factors: diffusion of responsibility, ambiguity, relationship.",
                competency_type="competency_based"
            )

    def generate_correlation_question(self, difficulty: str) -> GeneratedQuestion:
        # Generate correlated data
        n = 8 if difficulty == "easy" else 10 if difficulty == "medium" else 12
        true_r = round(random.uniform(0.4, 0.9), 1)

        base = np.random.randn(n)
        noise = np.random.randn(n) * math.sqrt(1 - true_r ** 2)
        y = true_r * base + noise
        x = base

        x_list = [round(float(v), 1) for v in x]
        y_list = [round(float(v), 1) for v in y]

        # Compute actual correlation
        actual_r = self.solver.solve_correlation(x_list, y_list, "pearson")["answer"]

        contexts = [
            "A researcher wants to know the relationship between hours of daily study and Psychology exam scores among Class 12 students in a Kolkata school.",
            "A study examines the relationship between emotional intelligence scores and academic performance among undergraduate students in Bangalore.",
            "A psychologist correlates scores on a stress questionnaire with blood pressure readings among IT professionals in Hyderabad.",
            "Research on the relationship between self-esteem and social media usage hours among college students in Pune.",
            "A study correlates scores on a creativity test with grades in Art and Design courses among students in Chennai."
        ]

        question = f"{random.choice(contexts)}\n\nData collected from {n} participants:\nStudy Hours (X): {x_list}\nExam Scores (Y): {y_list}\n\nCalculate the Pearson Product-Moment Correlation coefficient and interpret the strength and direction of the relationship."

        return GeneratedQuestion(
            topic="Correlation", difficulty=difficulty,
            question=question,
            parameters={"x": x_list, "y": y_list, "method": "pearson"},
            expected_answer=round(actual_r, 4),
            explanation=f"r = {actual_r:.4f}. Computed using Pearson formula: r = [n*XY - X*Y] / sqrt([n*X2-X2]*[n*Y2-Y2])",
            competency_type="competency_based"
        )

    def generate(self, topic: Optional[str] = None, difficulty: str = "medium",
                 count: int = 1) -> List[GeneratedQuestion]:
        generators = {
            "statistics": lambda: self.generate_statistics_question(difficulty),
            "intelligence": lambda: self.generate_iq_question(difficulty),
            "iq": lambda: self.generate_iq_question(difficulty),
            "personality": lambda: self.generate_personality_question(difficulty),
            "stress": lambda: self.generate_stress_question(difficulty),
            "disorders": lambda: self.generate_disorder_question(difficulty),
            "defence_mechanisms": lambda: self.generate_defence_mechanism_question(difficulty),
            "social_influence": lambda: self.generate_social_influence_question(difficulty),
            "correlation": lambda: self.generate_correlation_question(difficulty),
        }

        if topic and topic.lower() in generators:
            return [generators[topic.lower()]() for _ in range(count)]
        else:
            # Mix of topics
            all_generators = list(generators.values())
            questions = []
            for _ in range(count):
                gen = random.choice(all_generators)
                questions.append(gen())
            return questions


# ============================================================================
# REGISTRY ADAPTER
# ============================================================================

def generate_questions(seed: int = 0, count: int = None,
                       topic: str = None) -> List[Dict[str, Any]]:
    """Registry adapter: deterministic questions for Class 12 Psychology solver.

    Called as fn(seed) it returns one question; with count=N it returns N.
    """
    n = 1 if count is None else max(1, int(count))
    generator = QuestionGenerator(seed=seed)
    difficulties = ["easy", "medium", "hard"]
    gens = [
        generator.generate_statistics_question,
        generator.generate_iq_question,
        generator.generate_personality_question,
        generator.generate_stress_question,
        generator.generate_disorder_question,
        generator.generate_defence_mechanism_question,
        generator.generate_social_influence_question,
        generator.generate_correlation_question,
    ]
    questions = []
    for i in range(n):
        gen_fn = gens[(seed + i) % len(gens)]
        difficulty = difficulties[(seed + i) // 2 % len(difficulties)]
        q = gen_fn(difficulty)
        questions.append({
            "id": f"psy12_{seed}_{i}",
            "type": "numerical",
            "difficulty": q.difficulty,
            "topic": q.topic,
            "question": q.question,
            "answer": q.expected_answer,
            "explanation": q.explanation,
            "competency": q.competency_type == "competency_based",
        })
    return questions


# ============================================================================
# MAIN DEMONSTRATION
# ============================================================================

def print_section(title: str):
    print("\n" + "=" * 70)
    print(f"  {title}")
    print("=" * 70)


def print_result(result: Dict[str, Any]):
    print("\n--- STEPS ---")
    for i, step in enumerate(result.get("steps", []), 1):
        print(f"  Step {i}: {step}")
    print(f"\n--- ANSWER ---")
    print(f"  {result.get('answer', 'N/A')}")
    if "verification" in result:
        print(f"\n--- VERIFICATION ---")
        print(f"  {result['verification']}")


def main():
    solver = PsychologySolver()
    generator = QuestionGenerator(seed=42)

    print_section("CISCE Class 12 Psychology - Solver & Question Generator")

    # ========================================================================
    # 1. STATISTICS
    # ========================================================================
    print_section("1. STATISTICS")

    data = [12, 15, 18, 20, 22, 25, 28, 30, 35, 40]
    for op in ["mean", "median", "mode", "sd", "range", "quartile_deviation", "coefficient_of_variation"]:
        result = solver.solve_statistics(data[:], op)
        print(f"\nOperation: {op.upper()}")
        print_result(result)

    # ========================================================================
    # 2. INTELLIGENCE & IQ
    # ========================================================================
    print_section("2. INTELLIGENCE & IQ")

    result = solver.solve_iq(mental_age=12, chronological_age=10)
    print("\nIQ Calculation (Mental Age Method):")
    print_result(result)

    result = solver.solve_iq_deviation(iq_score=115, mean_iq=100, sd_iq=15)
    print("\nIQ Deviation Score:")
    print_result(result)

    result = solver.solve_zscore(raw_score=82, mean=70, sd=8)
    print("\nZ-Score & Percentile:")
    print_result(result)

    # ========================================================================
    # 3. CORRELATION
    # ========================================================================
    print_section("3. CORRELATION")

    x_data = [2, 4, 5, 7, 8, 10, 12, 15]
    y_data = [5, 8, 10, 14, 16, 20, 24, 30]
    result = solver.solve_correlation(x_data, y_data, "pearson")
    print("\nPearson Correlation (Study Hours vs Exam Scores):")
    print_result(result)

    x2 = [10, 20, 30, 40, 50, 60, 70, 80]
    y2 = [15, 25, 35, 45, 55, 65, 75, 85]
    result = solver.solve_correlation(x2, y2, "spearman")
    print("\nSpearman Rank Correlation:")
    print_result(result)

    # ========================================================================
    # 4. PERSONALITY
    # ========================================================================
    print_section("4. PERSONALITY")

    answers = {"q1": "A", "q2": "A", "q3": "A", "q4": "B", "q5": "A", "q6": "B", "q7": "A", "q8": "B"}
    result = solver.solve_personality_type(answers)
    print("\nType A/B Personality Assessment:")
    print_result(result)

    big5_scores = {
        "Openness": 8, "Conscientiousness": 7,
        "Extraversion": 5, "Agreeableness": 9, "Neuroticism": 3
    }
    result = solver.solve_big_five(big5_scores)
    print("\nBig Five Personality Assessment:")
    print_result(result)

    # ========================================================================
    # 5. STRESS & COPING
    # ========================================================================
    print_section("5. STRESS & COPING")

    stress_scores = {
        "headaches": 3, "sleep_problems": 3, "irritability": 2,
        "difficulty_concentrating": 3, "muscle_tension": 2,
        "fatigue": 3, "appetite_change": 2, "restlessness": 3
    }
    result = solver.solve_stress_assessment(stress_scores)
    print("\nStress Assessment:")
    print_result(result)

    symptoms = ["chronic fatigue", "irritability", "poor concentration",
                "sleep disturbances", "frequent illness"]
    result = solver.solve_stress_stage(symptoms)
    print("\nGAS Stage Identification:")
    print_result(result)

    result = solver.solve_coping_recommendation("upcoming board exam", "controllable")
    print("\nCoping Strategy Recommendation:")
    print_result(result)

    result = solver.solve_coping_recommendation("death of a family member", "uncontrollable")
    print("\nCoping Strategy (Uncontrollable Stressor):")
    print_result(result)

    # ========================================================================
    # 6. DEFENCE MECHANISMS
    # ========================================================================
    print_section("6. DEFENCE MECHANISMS")

    scenario = "After failing his exam, Ravi says 'I never wanted to be a doctor anyway; it is too stressful.'"
    result = solver.identify_defence_mechanism(scenario)
    print(f"\nScenario: {scenario}")
    print_result(result)

    # ========================================================================
    # 7. PSYCHOLOGICAL DISORDERS
    # ========================================================================
    print_section("7. PSYCHOLOGICAL DISORDERS")

    symptoms = ["Persistent sadness and hopelessness", "Loss of interest in activities",
                "Fatigue and low energy", "Difficulty sleeping", "Feelings of worthlessness",
                "Significant weight loss", "Recurring thoughts of death"]
    result = solver.classify_disorder(symptoms)
    print("\nDisorder Classification (Depression):")
    print_result(result)

    symptoms2 = ["Hearing voices that are not there", "Belief that others are plotting against them",
                 "Disorganized and incoherent speech", "Strange behaviour",
                 "Flat emotional expression", "Social withdrawal"]
    result = solver.classify_disorder(symptoms2)
    print("\nDisorder Classification (Schizophrenia):")
    print_result(result)

    # ========================================================================
    # 8. THERAPIES
    # ========================================================================
    print_section("8. THERAPIES")

    result = solver.match_therapy("Major Depressive Disorder")
    print("\nTherapy for Depression:")
    print_result(result)

    result = solver.match_therapy("Specific Phobia")
    print("\nTherapy for Specific Phobia:")
    print_result(result)

    result = solver.match_therapy("Obsessive-Compulsive Disorder")
    print("\nTherapy for OCD:")
    print_result(result)

    result = solver.match_therapy("Borderline Personality Disorder")
    print("\nTherapy for BPD:")
    print_result(result)

    # ========================================================================
    # 9. ATTITUDE & PERSUASION
    # ========================================================================
    print_section("9. ATTITUDE & PERSUASION")

    result = solver.solve_attitude_abc(affective=8, behavioural=6, cognitive=9)
    print("\nABC Model of Attitude:")
    print_result(result)

    result = solver.solve_persuasion_route(message_type="detailed_argument",
                                            audience_motivation="high",
                                            audience_ability="high")
    print("\nPersuasion - Central Route:")
    print_result(result)

    result = solver.solve_persuasion_route(message_type="emotional_appeal",
                                            audience_motivation="low",
                                            audience_ability="low")
    print("\nPersuasion - Peripheral Route:")
    print_result(result)

    # ========================================================================
    # 10. SOCIAL INFLUENCE
    # ========================================================================
    print_section("10. SOCIAL INFLUENCE")

    result = solver.solve_conformity(group_size=3, unanimity=True, has_ally=False)
    print("\nConformity - Asch Experiment (3-person group, unanimous, no ally):")
    print_result(result)

    result = solver.solve_conformity(group_size=15, unanimity=True, has_ally=True)
    print("\nConformity - Large group with ally:")
    print_result(result)

    result = solver.solve_milgram_factors(authority_present=True,
                                          proximity_learner="close_contact",
                                          proximity_authority="same_room")
    print("\nMilgram Obedience (learner close contact):")
    print_result(result)

    # ========================================================================
    # 11. PROSOCIAL BEHAVIOUR
    # ========================================================================
    print_section("11. PROSOCIAL BEHAVIOUR")

    result = solver.solve_bystander_intervention(num_bystanders=5, ambiguity="clear",
                                                  relationship="stranger", gender="male")
    print("\nBystander Effect (5 bystanders, clear emergency, stranger):")
    print_result(result)

    result = solver.solve_bystander_intervention(num_bystanders=1, ambiguity="clear",
                                                  relationship="friend", gender="female")
    print("\nBystander Effect (1 bystander, clear emergency, friend):")
    print_result(result)

    # ========================================================================
    # 12. CREATIVITY
    # ========================================================================
    print_section("12. CREATIVITY")

    result = solver.solve_creativity_assessment(fluency=8, flexibility=7,
                                                 originality=9, elaboration=6)
    print("\nCreativity Assessment (Torrance Tests):")
    print_result(result)

    # ========================================================================
    # 13. QUESTION GENERATOR DEMO
    # ========================================================================
    print_section("13. QUESTION GENERATOR - SAMPLE QUESTIONS")

    for i in range(5):
        q = generator.generate(difficulty=random.choice(["easy", "medium", "hard"]))
        print(f"\n--- Question {i+1} [{q.topic}] ({q.difficulty}, {q.competency_type}) ---")
        print(q.question)
        print(f"\nExpected Answer: {q.expected_answer}")
        print(f"Explanation: {q.explanation}")

    # ========================================================================
    # 14. DETERMINISM VERIFICATION
    # ========================================================================
    print_section("14. DETERMINISM VERIFICATION")

    gen1 = QuestionGenerator(seed=123)
    gen2 = QuestionGenerator(seed=123)
    q1 = gen1.generate(difficulty="medium", count=3)
    q2 = gen2.generate(difficulty="medium", count=3)

    all_match = True
    for i in range(3):
        if q1[i].question != q2[i].question or q1[i].expected_answer != q2[i].expected_answer:
            all_match = False
            break

    print(f"Same seed produces identical questions: {all_match}")
    print("Deterministic verification: PASSED" if all_match else "FAILED")

    print_section("SOLVER DEMONSTRATION COMPLETE")


if __name__ == '__main__':
    main()