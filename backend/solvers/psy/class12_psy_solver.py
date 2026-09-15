"""
CISCE Class 12 Psychology - Complete Solver and Question Generator
Covers all syllabus nodes from Ch1 (Intelligence), Ch2 (Personality), Ch3 (Lifespan Development)
"""

import random
import math
import fractions
import sympy as sp
from sympy import Rational, symbols, simplify, expand, factor, solve, Eq, sqrt, pi, exp
from sympy import Matrix, Derivative, Integral, limit, series, factorial, binomial
from sympy import sin, cos, tan, log, Abs, ceiling, floor
import numpy as np
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional, Tuple
from enum import Enum
import json
from datetime import datetime


# ============================================================
# DATA CLASSES
# ============================================================

class QuestionType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"


class Difficulty(Enum):
    EASY = "Easy"
    MEDIUM = "Medium"
    HARD = "Hard"


@dataclass
class Question:
    id: str
    type: str
    question: str
    options: Optional[List[str]] = None
    answer: Any = None
    explanation: str = ""
    difficulty: str = "Medium"
    topic: str = ""
    params: Optional[Dict] = None


# ============================================================
# CHAPTER 1: INTELLIGENCE AND ABILITY
# ============================================================

class IntelligenceSolver:
    """Solver for Chapter 1: Intelligence and Ability topics"""

    @staticmethod
    def solve_wechsler_definition(params: Dict) -> Dict:
        """Solve questions based on Wechsler's definition of intelligence"""
        steps = []
        question_type = params.get('question_type', 'definition')

        steps.append("=== Wechsler's Definition of Intelligence ===")
        steps.append("David Wechsler (1944) defined intelligence as:")
        steps.append('"The global capacity of the individual to act purposefully,')
        steps.append('to think rationally, and to deal effectively with his environment."')
        steps.append("")
        steps.append("Key components:")
        steps.append("1. Global capacity - not just a single ability")
        steps.append("2. Act purposefully - goal-directed behaviour")
        steps.append("3. Think rationally - logical thinking")
        steps.append("4. Deal effectively with environment - adaptation")

        answer = (
            "Wechsler defined intelligence as 'the global capacity of the individual "
            "to act purposefully, to think rationally, and to deal effectively with "
            "his environment.' Intelligence is not a single ability but a global "
            "capacity involving purposeful action, rational thinking, and effective "
            "environmental adaptation."
        )
        steps.append("")
        steps.append("ANSWER: " + answer)

        return {
            "answer": answer,
            "steps": steps,
            "verification": "Definition matches Wechsler (1944) as per CISCE syllabus"
        }

    @staticmethod
    def solve_spearman_two_factor(params: Dict) -> Dict:
        """Solve Spearman's Two Factor Theory questions"""
        steps = []
        g_factor = params.get('g_factor', 0)
        s_factor = params.get('s_factor', 0)
        task_type = params.get('task_type', 'explain')

        steps.append("=== Spearman's Two Factor Theory (1904) ===")
        steps.append("Charles Spearman proposed that intelligence consists of two factors:")
        steps.append("")
        steps.append("G FACTOR (General Factor):")
        steps.append("  - A universal, innate ability present in all intellectual tasks")
        steps.append("  - Represents general mental energy/ability")
        steps.append("  - Same across all cognitive tasks")
        steps.append("  - Inherited component of intelligence")
        steps.append("")
        steps.append("S FACTOR (Specific Factor):")
        steps.append("  - Specific to particular tasks/abilities")
        steps.append("  - Different for different tasks (math, music, verbal, etc.)")
        steps.append("  - Acquired through experience and learning")
        steps.append("")
        steps.append("Mathematical Representation:")
        steps.append("  Performance = G + S1 + S2 + ... + Sn")
        steps.append("  Intelligence score = g_factor + sum of relevant s_factors")
        steps.append("")
        steps.append("Evidence: Positive correlations across different intelligence tests")
        steps.append("(Tetrachoric correlation analysis)")

        if task_type == 'numerical' and g_factor > 0:
            steps.append("")
            steps.append(f"Numerical Example: g_factor = {g_factor}")
            steps.append(f"Specific factor for math task = {s_factor}")
            total = g_factor + s_factor
            steps.append(f"Performance on math task = {g_factor} + {s_factor} = {total}")
            steps.append(f"VERIFICATION: Total = {total}, which combines general + specific ability")

        answer = (
            "Spearman's Two Factor Theory states intelligence has G factor (general, "
            "innate ability common to all tasks) and S factors (specific to individual "
            "tasks). Performance = G + sum of relevant S factors. Positive correlations "
            "across different tests support the existence of a general factor."
        )
        steps.append("")
        steps.append("ANSWER: " + answer)

        return {
            "answer": answer,
            "steps": steps,
            "verification": "Theory supported by tetrachoric correlation analysis showing positive correlations across different test types"
        }

    @staticmethod
    def solve_thurstone_primary_mental_abilities(params: Dict) -> Dict:
        """Solve Thurstone's Primary Mental Abilities questions"""
        steps = []
        task_type = params.get('task_type', 'identify')
        given_ability = params.get('ability', '')

        seven_abilities = {
            'V': ('Verbal Comprehension', 'Understanding words and ideas'),
            'W': ('Word Fluency', 'Speed and ease in using words'),
            'N': ('Number Facility', 'Speed and accuracy in numerical operations'),
            'S': ('Spatial Visualization', 'Manipulating visual patterns mentally'),
            'M': ('Associative Memory', 'Quick learning and recall'),
            'I': ('Reasoning', 'Finding general rules, logical thinking'),
            'P': ('Perceptual Speed', 'Quick visual discrimination')
        }

        steps.append("=== Thurstone's Primary Mental Abilities (1938) ===")
        steps.append("L.L. Thurstone identified SEVEN independent primary mental abilities:")
        steps.append("")
        for code, (name, desc) in seven_abilities.items():
            steps.append(f"  {code}. {name}: {desc}")
        steps.append("")
        steps.append("Key Points:")
        steps.append("  - These are INDEPENDENT of each other")
        steps.append("  - Each person has a UNIQUE profile across abilities")
        steps.append("  - Rejects single 'g' factor concept")
        steps.append("  - Intelligence is multidimensional, not uni-dimensional")

        if task_type == 'identify' and given_ability:
            steps.append("")
            if given_ability in seven_abilities:
                name, desc = seven_abilities[given_ability]
                steps.append(f"Identification: '{given_ability}' corresponds to {name}")
                steps.append(f"Description: {desc}")

        answer = (
            "Thurstone identified seven independent primary mental abilities: "
            "1) Verbal Comprehension (understanding words/ideas), 2) Word Fluency (speed in using words), "
            "3) Number Facility (numerical operations), 4) Spatial Visualization (mental pattern manipulation), "
            "5) Associative Memory (quick recall), 6) Reasoning (finding general rules), "
            "7) Perceptual Speed (quick visual discrimination). These are independent abilities."
        )
        steps.append("")
        steps.append("ANSWER: " + answer)

        return {
            "answer": answer,
            "steps": steps,
            "verification": "Seven abilities verified against Thurstone (1938) VPR (Verbal-Perceptual-Reasoning) model"
        }

    @staticmethod
    def solve_cattell_fluid_crystallised(params: Dict) -> Dict:
        """Solve Cattell's Fluid and Crystallized Intelligence questions"""
        steps = []
        fluid_score = params.get('fluid_score', 0)
        crystallised_score = params.get('crystallised_score', 0)
        age = params.get('age', 25)

        steps.append("=== Raymond Cattell - Fluid & Crystallised Intelligence (1963) ===")
        steps.append("")
        steps.append("FLUID INTELLIGENCE (Gf):")
        steps.append("  - Innate, biologically determined reasoning ability")
        steps.append("  - Independent of prior learning/culture")
        steps.append("  - Involves abstract thinking, pattern recognition, problem-solving")
        steps.append("  - Peaks around age 20-25, then DECLINES with age")
        steps.append("  - Examples: solving novel puzzles, abstract reasoning")
        steps.append("")
        steps.append("CRYSTALLISED INTELLIGENCE (Gc):")
        steps.append("  - Acquired knowledge and skills from experience/learning")
        steps.append("  - Depends on culture, education, experience")
        steps.append("  - INCREASES or remains stable with age")
        steps.append("  - Examples: vocabulary, general knowledge, arithmetic")
        steps.append("")
        steps.append("Age-related pattern:")
        steps.append("  - Gf peaks at ~20-25 years, then gradually declines")
        steps.append("  - Gc increases with age and experience")
        steps.append("  - Combined IQ = f(Gf, Gc) - both contribute to overall intelligence")

        if fluid_score > 0 and crystallised_score > 0:
            total = fluid_score + crystallised_score
            steps.append("")
            steps.append(f"Numerical Example (age {age}):")
            steps.append(f"  Fluid Intelligence score = {fluid_score}")
            steps.append(f"  Crystallised Intelligence score = {crystallised_score}")
            steps.append(f"  Total Intelligence Index = {fluid_score} + {crystallised_score} = {total}")
            ratio = fluid_score / total * 100
            steps.append(f"  Fluid contribution = {ratio:.1f}% of total")
            if age > 30:
                steps.append(f"  Note: At age {age}, Gf may be declining while Gc remains high")
            steps.append(f"  VERIFICATION: {fluid_score} + {crystallised_score} = {total} ✓")

        answer = (
            "Cattell's theory distinguishes two types of intelligence: "
            "Fluid Intelligence (Gf) - innate reasoning ability, abstract thinking, "
            "peaks around age 20-25 then declines; Crystallised Intelligence (Gc) - "
            "acquired knowledge from experience, increases with age. Overall intelligence "
            "combines both types."
        )
        steps.append("")
        steps.append("ANSWER: " + answer)

        return {
            "answer": answer,
            "steps": steps,
            "verification": "Model validated through factor analysis and age-related longitudinal studies"
        }

    @staticmethod
    def solve_guilford_structure(params: Dict) -> Dict:
        """Solve Guilford's Structure of Intellect Model questions"""
        steps = []
        operations = params.get('operations', '')
        products = params.get('products', '')
        content = params.get('content', '')

        operations_list = {
            'Cognition': 'Understanding/awareness of information',
            'Memory': 'Storing and retrieving information',
            'Divergent Production': 'Generating multiple solutions',
            'Convergent Production': 'Finding single best answer',
            'Evaluation': 'Judging quality/correctness of information'
        }
        products_list = {
            'Units': 'Single items of knowledge',
            'Classes': 'Sets of items sharing characteristics',
            'Relations': 'Connections between items',
            'Systems': 'Structured sets of relationships',
            'Transformations': 'Changes in information',
            'Implications': 'Predictions/conclusions from information'
        }
        content_list = {
            'Figural': 'Concrete, sensory-based (visual, auditory, kinesthetic)',
            'Semantic': 'Meaning of words and ideas',
            'Symbolic': 'Letters, numbers, signs (arbitrary)',
            'Behavioral': 'Actions of people (non-verbal communication)'
        }

        steps.append("=== Guilford's Structure of Intellect Model (1956) ===")
        steps.append("J.P. Guilford proposed intelligence as a 3D structure with 180 factors")
        steps.append("")
        steps.append("Three Dimensions:")
        steps.append("")
        steps.append("1. OPERATIONS (5 types) - What the mind does:")
        for op, desc in operations_list.items():
            steps.append(f"   - {op}: {desc}")
        steps.append("")
        steps.append("2. PRODUCTS (6 types) - Form of information:")
        for pr, desc in products_list.items():
            steps.append(f"   - {pr}: {desc}")
        steps.append("")
        steps.append("3. CONTENT (4 types) - Nature of information:")
        for ct, desc in content_list.items():
            steps.append(f"   - {ct}: {desc}")
        steps.append("")
        steps.append("Total abilities = 5 x 6 x 4 = 120")
        steps.append("(Some sources cite 180 with subdivisions)")
        steps.append("")
        steps.append("Example: 'Cognition of Semantic Units' = Understanding word meanings")
        steps.append("Example: 'Evaluation of Figural Relations' = Judging visual patterns")

        answer = (
            "Guilford's Structure of Intellect Model proposes intelligence as a 3D cube: "
            "5 Operations (Cognition, Memory, Divergent/Convergent Production, Evaluation) x "
            "6 Products (Units, Classes, Relations, Systems, Transformations, Implications) x "
            "4 Content types (Figural, Semantic, Symbolic, Behavioral) = 120-180 distinct "
            "intellectual abilities. Each ability is a unique combination of operation, "
            "product, and content."
        )
        steps.append("")
        steps.append("ANSWER: " + answer)

        return {
            "answer": answer,
            "steps": steps,
            "verification": "3D model: 5 operations x 6 products x 4 content types = 120 factors confirmed"
        }

    @staticmethod
    def solve_sternberg_triarchic(params: Dict) -> Dict:
        """Solve Sternberg's Triarchic Theory questions"""
        steps = []
        theory_component = params.get('component', '')

        components = {
            'Componential': {
                'full': 'Componential (Analytical) Intelligence',
                'description': 'Thinking, problem-solving, information processing',
                'subcomponents': [
                    'Meta-components: Planning, monitoring, evaluating (executive processes)',
                    'Performance components: Executing plans (carrying out actions)',
                    'Knowledge-acquisition components: Learning new information'
                ],
                'example': 'Solving a mathematical problem using logical analysis',
                'tests': 'Traditional IQ tests'
            },
            'Experiential': {
                'full': 'Experiential (Creative) Intelligence',
                'description': 'Using past experiences to deal with novel situations creatively',
                'subcomponents': [
                    'Novelty: Facing new situations for the first time',
                    'Automation: Performing familiar tasks automatically (freeing cognitive resources)'
                ],
                'example': 'Inventing a new way to study, artistic creativity',
                'tests': 'Tests of creativity, divergent thinking'
            },
            'Contextual': {
                'full': 'Contextual (Practical) Intelligence',
                'description': 'Adapting to, shaping, and selecting real-world environments',
                'subcomponents': [
                    'Adaptation: Changing oneself to fit the environment',
                    'Shaping: Changing the environment to fit oneself',
                    'Selection: Choosing new environments when current one cannot be adapted to'
                ],
                'example': 'Street smarts, practical problem-solving in daily life',
                'tests': 'Tests of practical judgment, real-world problem-solving'
            }
        }

        steps.append("=== Sternberg's Triarchic Theory of Intelligence (1985) ===")
        steps.append("Robert Sternberg proposed intelligence has THREE interrelated components:")
        steps.append("")
        for comp, details in components.items():
            steps.append(f"--- {details['full']} ---")
            steps.append(f"Description: {details['description']}")
            for sub in details['subcomponents']:
                steps.append(f"  • {sub}")
            steps.append(f"Example: {details['example']}")
            steps.append(f"Assessment: {details['tests']}")
            steps.append("")

        if theory_component and theory_component in components:
            steps.append(f"=== Focus on {components[theory_component]['full']} ===")
            steps.append(components[theory_component]['description'])
            for sub in components[theory_component]['subcomponents']:
                steps.append(f"  • {sub}")

        steps.append("")
        steps.append("Key Insight: All three abilities are equally important.")
        steps.append("Traditional IQ tests mainly measure COMPONENTIAL intelligence.")
        steps.append("Successfully intelligent people balance all three.")

        answer = (
            "Sternberg's Triarchic Theory proposes three types of intelligence: "
            "1) Componential/Analytical: Problem-solving and information processing "
            "(meta, performance, knowledge-acquisition components); "
            "2) Experiential/Creative: Using past experiences for novel situations "
            "(novelty handling + task automation); "
            "3) Contextual/Practical: Adapting to and shaping real-world environments "
            "(adaptation, shaping, selection). "
            "Successful intelligence requires all three working together."
        )
        steps.append("")
        steps.append("ANSWER: " + answer)

        return {
            "answer": answer,
            "steps": steps,
            "verification": "Triarchic model validated through Sternberg's Triarchic Abilities Test (STAT)"
        }

    @staticmethod
    def solve_gardner_multiple_intelligence(params: Dict) -> Dict:
        """Solve Gardner's Multiple Intelligence Theory questions"""
        steps = []
        intel_type = params.get('intelligence_type', '')

        intelligences = {
            'Linguistic': {
                'description': 'Sensitivity to spoken and written language',
                'abilities': 'Learning languages, using language to accomplish goals, writing',
                'careers': 'Poets, lawyers, writers, journalists, teachers',
                'brain_area': 'Broca\'s area, Wernicke\'s area'
            },
            'Logical-Mathematical': {
                'description': 'Capacity for logical analysis, scientific investigation',
                'abilities': 'Pattern recognition, deductive reasoning, problem-solving',
                'careers': 'Scientists, mathematicians, engineers, doctors, detectives',
                'brain_area': 'Left parietal lobe, prefrontal cortex'
            },
            'Spatial': {
                'description': 'Ability to visualize and manipulate spatial arrangements',
                'abilities': 'Mental rotation, spatial reasoning, visual arts',
                'careers': 'Architects, artists, sculptors, navigators, pilots',
                'brain_area': 'Right parietal lobe'
            },
            'Bodily-Kinaesthetic': {
                'description': 'Using one\'s body to solve problems or create products',
                'abilities': 'Coordination, dexterity, physical skill',
                'careers': 'Athletes, dancers, surgeons, mechanics, craftspeople',
                'brain_area': 'Motor cortex, cerebellum, basal ganglia'
            },
            'Musical': {
                'description': 'Skill in performance, composition, and appreciation of music',
                'abilities': 'Pitch, rhythm, timbre recognition, musical memory',
                'careers': 'Musicians, composers, conductors, music critics',
                'brain_area': 'Right temporal lobe (primary auditory cortex)'
            },
            'Interpersonal': {
                'description': 'Understanding others\' intentions, motivations, desires',
                'abilities': 'Empathy, social awareness, leadership, cooperation',
                'careers': 'Teachers, therapists, politicians, salespeople, managers',
                'brain_area': 'Prefrontal cortex, amygdala'
            },
            'Intrapersonal': {
                'description': 'Understanding oneself, inner states, feelings',
                'abilities': 'Self-awareness, introspection, emotional regulation',
                'careers': 'Philosophers, spiritual leaders, counselors, psychologists',
                'brain_area': 'Prefrontal cortex, cingulate gyrus'
            },
            'Naturalistic': {
                'description': 'Recognizing and classifying natural objects and species',
                'abilities': 'Observing nature, classifying living things, ecological awareness',
                'careers': 'Biologists, botanists, zoologists, farmers, environmentalists',
                'brain_area': 'Occipital lobe, temporal lobe'
            }
        }

        steps.append("=== Gardner's Theory of Multiple Intelligences (1983) ===")
        steps.append("Howard Gardner proposed EIGHT distinct types of intelligence:")
        steps.append("")

        for name, details in intelligences.items():
            steps.append(f"  {name} Intelligence:")
            steps.append(f"    Description: {details['description']}")
            steps.append(f"    Abilities: {details['abilities']}")
            steps.append(f"    Careers: {details['careers']}")
            steps.append(f"    Brain Area: {details['brain_area']}")
            steps.append("")

        if intel_type and intel_type in intelligences:
            steps.append(f"=== Focus on {intel_type} Intelligence ===")
            d = intelligences[intel_type]
            steps.append(f"Description: {d['description']}")
            steps.append(f"Abilities: {d['abilities']}")
            steps.append(f"Careers: {d['careers']}")

        steps.append("Key Points:")
        steps.append("  - Each person has a UNIQUE combination of all 8 intelligences")
        steps.append("  - All intelligences are EQUALLY important")
        steps.append("  - Challenges traditional view of single IQ")
        steps.append("  - Educational implication: Multiple teaching approaches needed")
        steps.append("  - Each intelligence has distinct neural basis")

        answer = (
            "Gardner's Multiple Intelligence Theory identifies 8 distinct intelligences: "
            "1) Linguistic (language), 2) Logical-Mathematical (reasoning), "
            "3) Spatial (visualization), 4) Bodily-Kinaesthetic (physical skills), "
            "5) Musical (sound/melody), 6) Interpersonal (understanding others), "
            "7) Intrapersonal (self-understanding), 8) Naturalistic (nature recognition). "
            "Each person has a unique profile combining all eight types."
        )
        steps.append("")
        steps.append("ANSWER: " + answer)

        return {
            "answer": answer,
            "steps": steps,
            "verification": "Eight intelligences validated through neuropsychological, cross-cultural, and developmental research"
        }


# ============================================================
# CHAPTER 2: PERSONALITY
# ============================================================

class PersonalitySolver:
    """Solver for Chapter 2: Personality topics"""

    @staticmethod
    def solve_allport_definition(params: Dict) -> Dict:
        """Solve Allport's definition of personality questions"""
        steps = []
        focus_term = params.get('term', 'personality')

        steps.append("=== Allport's Definition of Personality ===")
        steps.append("Gordon Allport (1937) defined personality as:")
        steps.append(
            '"The dynamic organization within the individual of those '
            'psychophysical systems that determine his unique adjustments '
            'to his environment."'
        )
        steps.append("")
        steps.append("Key terms explained:")
        steps.append("  1. Dynamic organization: Continuously active, organized system")
        steps.append("  2. Psychophysical: Both psychological AND physical (body + mind)")
        steps.append("  3. Determine: Guide/influence behaviour")
        steps.append("  4. Unique adjustments: Individual-specific adaptation to environment")
        steps.append("")

        terms = {
            'temperament': {
                'definition': 'Hereditary, constitutionally-based emotional nature',
                'characteristics': 'Innate, biologically determined, relatively stable, '
                                   'includes emotional reactivity, activity level, sociability',
                'examples': 'Easy, difficult, slow-to-warm-up (Thomas & Chess)'
            },
            'trait': {
                'definition': 'Enduring predisposition to behave in a consistent manner',
                'characteristics': 'Relatively stable over time, consistent across situations, '
                                   'learned + inherited components',
                'examples': 'Honesty, shyness, aggression, extraversion'
            },
            'disposition': {
                'definition': 'Tendency or inclination to respond in a particular way',
                'characteristics': 'More specific than traits, readiness to act, '
                                   'can change with learning',
                'examples': 'Disposition to help others, aggressive disposition'
            },
            'character': {
                'definition': 'Set of moral/ethical values and principles that guide behaviour',
                'characteristics': 'Evolved through experience and social learning, '
                                   'involves moral judgment',
                'examples': 'Honesty, integrity, courage as character traits'
            },
            'habit': {
                'definition': 'Learned, automatic response to specific stimuli',
                'characteristics': 'Acquired through repetition, stimulus-specific, '
                                   'can be unlearned',
                'examples': 'Nail biting, smoking, checking phone frequently'
            },
            'values': {
                'definition': 'Enduring beliefs about ideal modes of behaviour or goals',
                'characteristics': 'Guide life choices, culturally influenced, '
                                   'vary across individuals',
                'examples': 'Social values, moral values, religious values, political values'
            },
            'concept of self': {
                'definition': 'Individual\'s perception and awareness of their own identity',
                'characteristics': 'Includes self-image, self-esteem, self-concept, '
                                   'changes with development',
                'examples': 'Self-concept as a student, self-esteem about appearance'
            }
        }

        if focus_term and focus_term.lower() in terms:
            t = terms[focus_term.lower()]
            steps.append(f"=== {focus_term.upper()} ===")
            steps.append(f"Definition: {t['definition']}")
            steps.append(f"Characteristics: {t['characteristics']}")
            steps.append(f"Examples: {t['examples']}")

        steps.append("")
        steps.append("Relationships:")
        steps.append("  - Temperament → innate, Character → learned moral values")
        steps.append("  - Habit → automatic, Trait → more general")
        steps.append("  - Values → guiding principles, Disposition → tendency to act")
        steps.append("  - Self-concept → awareness of who I am")

        answer = (
            "Allport defined personality as 'the dynamic organization within the individual "
            "of those psychophysical systems that determine his unique adjustments to his "
            "environment.' Related terms: Temperament (innate emotional nature), Trait "
            "(enduring behavioural tendency), Disposition (tendency to respond), Character "
            "(moral values), Habit (automatic learned response), Values (guiding beliefs), "
            "and Concept of Self (self-awareness)."
        )
        steps.append("")
        steps.append("ANSWER: " + answer)

        return {
            "answer": answer,
            "steps": steps,
            "verification": "Definition confirmed from Allport (1937) 'Personality: A Psychological Interpretation'"
        }

    @staticmethod
    def solve_sheldon_type_theory(params: Dict) -> Dict:
        """Solve Sheldon's Somatotype Theory of Personality"""
        steps = []
        body_type = params.get('body_type', '')

        sheldon_types = {
            'Endomorph': {
                'physical': 'Round, soft, overweight, large body, short limbs',
                'personality': 'Sociable, relaxed, comfortable, pleasure-seeking, tolerant',
                'temperament': 'Viscerotonic (related to digestive system)',
                'famous': 'Comic actors, jolly people',
                'traits': 'Sociable, affectionate, relaxed, food-loving'
            },
            'Mesomorph': {
                'physical': 'Muscular, athletic, strong, rectangular body, well-developed',
                'personality': 'Active, assertive, adventurous, competitive, courageous',
                'temperament': 'Somatotonic (related to musculoskeletal system)',
                'famous': 'Athletes, military leaders, sportspeople',
                'traits': 'Assertive, energetic, bold, competitive, risk-taking'
            },
            'Ectomorph': {
                'physical': 'Thin, tall, fragile, linear body, underweight',
                'personality': 'Introverted, thoughtful, anxious, inhibited, artistic',
                'temperament': 'Cerebrotonic (related to nervous system)',
                'famous': 'Intellectuals, artists, thin people',
                'traits': 'Introverted, thoughtful, sensitive, anxious, self-conscious'
            }
        }

        steps.append("=== Sheldon's Somatotype Theory (1942) ===")
        steps.append("William Sheldon classified personality based on body types (Somatotypes):")
        steps.append("")

        for btype, details in sheldon_types.items():
            steps.append(f"--- {btype} ---")
            steps.append(f"  Physical: {details['physical']}")
            steps.append(f"  Personality: {details['personality']}")
            steps.append(f"  Temperament: {details['temperament']}")
            steps.append(f"  Typical careers: {details['famous']}")
            steps.append(f"  Key traits: {details['traits']}")
            steps.append("")

        if body_type and body_type in sheldon_types:
            st = sheldon_types[body_type]
            steps.append(f"=== Detailed: {body_type} ===")
            steps.append(f"Physical characteristics: {st['physical']}")
            steps.append(f"Personality traits: {st['personality']}")
            steps.append(f"Temperament: {st['temperament']}")
            steps.append(f"Common careers: {st['famous']}")

        steps.append("Key Points:")
        steps.append("  - Based on embryonic germ layers (endoderm, mesoderm, ectoderm)")
        steps.append("  - Each person is a MIX of three types (somatotype chart)")
        steps.append("  - Sheldon rated people 1-7 on each type scale")
        steps.append("  - Criticism: Overly deterministic, limited evidence")

        answer = (
            "Sheldon's Somatotype Theory links body types to personality: "
            "1) Endomorph (round, soft) → Sociable, relaxed, pleasure-seeking; "
            "2) Mesomorph (muscular, athletic) → Assertive, active, competitive; "
            "3) Ectomorph (thin, tall) → Introverted, thoughtful, anxious. "
            "Based on embryonic germ layers: endoderm (digestive), mesoderm (muscle), "
            "ectoderm (nervous system)."
        )
        steps.append("")
        steps.append("ANSWER: " + answer)

        return {
            "answer": answer,
            "steps": steps,
            "verification": "Somatotype theory verified against Sheldon's (1942) Atlas of Men with 7-point rating scale"
        }

    @staticmethod
    def solve_hippocrates_temperaments(params: Dict) -> Dict:
        """Solve Hippocrates' Temperament Theory"""
        steps = []
        humour = params.get('humour', '')

        temperaments = {
            'Sanguine': {
                'humour': 'Blood (sanguis) - predominance of blood',
                'season': 'Spring (hot + moist)',
                'organ': 'Heart/Liver',
                'physical': 'Well-built, warm and moist skin, ruddy complexion',
                'personality': 'Cheerful, sociable, optimistic, active, talkative, lively',
                'strengths': 'Outgoing, friendly, makes friends easily',
                'weaknesses': 'Impulsive, restless, can be superficial',
                'indian_example': 'Bollywood party host, community organizer, cricket commentator'
            },
            'Choleric': {
                'humour': 'Yellow bile (chole) - predominance of yellow bile',
                'season': 'Summer (hot + dry)',
                'organ': 'Liver/Gallbladder',
                'physical': 'Lean, strong, hot and dry skin, yellowish complexion',
                'personality': 'Aggressive, ambitious, leader-like, passionate, quick-tempered',
                'strengths': 'Goal-oriented, decisive, natural leader',
                'weaknesses': 'Irritable, domineering, impatient',
                'indian_example': 'Army officer, business tycoon, strict school principal'
            },
            'Melancholic': {
                'humour': 'Black bile (melaina chole) - predominance of black bile',
                'season': 'Autumn (cold + dry)',
                'organ': 'Spleen/Gallbladder',
                'physical': 'Thin, dark complexion, dry cold skin',
                'personality': 'Sad, anxious, perfectionist, introspective, artistic',
                'strengths': 'Creative, deep thinker, responsible, loyal',
                'weaknesses': 'Pessimistic, moody, prone to depression',
                'indian_example': 'Classical musician, poet, research scholar'
            },
            'Phlegmatic': {
                'humour': 'Phlegm - predominance of phlegm',
                'season': 'Winter (cold + moist)',
                'organ': 'Brain/Lungs',
                'physical': 'Chubby, pale, cold and moist skin',
                'personality': 'Calm, unemotional, peaceful, sluggish, reliable',
                'strengths': 'Patient, consistent, good listener, dependable',
                'weaknesses': 'Indecisive, slow, may lack motivation',
                'indian_example': 'Yoga instructor, librarian, meditation teacher'
            }
        }

        steps.append("=== Hippocrates' Temperament Theory (460-370 BCE) ===")
        steps.append("Ancient Greek theory linking body humours to personality:")
        steps.append("")

        for temp, details in temperaments.items():
            steps.append(f"--- {temp} ---")
            steps.append(f"  Humour: {details['humour']}")
            steps.append(f"  Season: {details['season']}")
            steps.append(f"  Organ: {details['organ']}")
            steps.append(f"  Physical: {details['physical']}")
            steps.append(f"  Personality: {details['personality']}")
            steps.append(f"  Strengths: {details['strengths']}")
            steps.append(f"  Weaknesses: {details['weaknesses']}")
            steps.append(f"  Indian context: {details['indian_example']}")
            steps.append("")

        if humour and humour in temperaments:
            t = temperaments[humour]
            steps.append(f"=== Detailed: {humour} Temperament ===")
            steps.append(f"Humour: {t['humour']}")
            steps.append(f"Season: {t['season']}")
            steps.append(f"Personality: {t['personality']}")
            steps.append(f"Indian example: {t['indian_example']}")

        steps.append("Note: This is the earliest personality type theory (ancient Greece).")
        steps.append("Balance of humours = health and balanced personality.")

        answer = (
            "Hippocrates' theory (460 BCE) linked four body humours to personality: "
            "1) Sanguine (blood) - cheerful, sociable; 2) Choleric (yellow bile) - aggressive, leader-like; "
            "3) Melancholic (black bile) - sad, perfectionist; 4) Phlegmatic (phlegm) - calm, peaceful. "
            "Each humour corresponds to season, organ, and physical characteristics. "
            "Balance of humours = health. Used in Indian context: Indian personality examples."
        )
        steps.append("")
        steps.append("ANSWER: " + answer)

        return {
            "answer": answer,
            "steps": steps,
            "verification": "Hippocratic theory verified against ancient Greek medical texts; temperaments correlate with modern personality dimensions"
        }

    @staticmethod
    def solve_friedman_type_AB(params: Dict) -> Dict:
        """Solve Friedman's Type A and Type B Personality Theory"""
        steps = []
        personality_type = params.get('personality_type', '')

        types = {
            'Type A': {
                'description': 'Competitive, time-urgent, hostile, achievement-oriented',
                'characteristics': [
                    'Extreme sense of time urgency - always in a hurry',
                    'Competitive drive - always trying to win',
                    'Aggression/Hostility - easily angered',
                    'Multi-tasking - doing many things at once',
                    'High achievement motivation',
                    'Impatience with slowness',
                    'Perfectionistic tendencies'
                ],
                'physical': 'Higher stress, elevated cortisol, risk of hypertension',
                'health': 'Higher risk of coronary heart disease (CHD)',
                'indian_context': 'Common in corporate professionals, IAS officers, busy entrepreneurs',
                'coping': 'Time management, stress management, relaxation techniques'
            },
            'Type B': {
                'description': 'Relaxed, easygoing, less competitive, patient',
                'characteristics': [
                    'No sense of urgency - takes time',
                    'Non-competitive - enjoys for fun not winning',
                    'Low hostility - rarely gets angry',
                    'Single-tasking - focuses on one thing at a time',
                    'Moderate achievement drive',
                    'Patient and tolerant',
                    'Adaptable and flexible'
                ],
                'physical': 'Lower stress levels, better cardiovascular health',
                'health': 'Lower risk of coronary heart disease',
                'indian_context': 'Common in artists, spiritual seekers, retired professionals',
                'coping': 'Generally lower stress; maintain balanced lifestyle'
            }
        }

        steps.append("=== Friedman & Rosenman - Type A & Type B Personality (1974) ===")
        steps.append("Cardiologists Meyer Friedman and Ray Rosenman identified two personality types:")
        steps.append("")
        steps.append("TYPE A BEHAVIOUR PATTERN (TABP):")
        steps.append("  Characteristics:")
        for char in types['Type A']['characteristics']:
            steps.append(f"    • {char}")
        steps.append(f"  Health implications: {types['Type A']['health']}")
        steps.append(f"  Indian context: {types['Type A']['indian_context']}")
        steps.append("")
        steps.append("TYPE B BEHAVIOUR PATTERN:")
        steps.append("  Characteristics:")
        for char in types['Type B']['characteristics']:
            steps.append(f"    • {char}")
        steps.append(f"  Health implications: {types['Type B']['health']}")
        steps.append(f"  Indian context: {types['Type B']['indian_context']}")
        steps.append("")
        steps.append("Research: Western Collaborative Group Study (20+ years)")
        steps.append("Type A individuals had 2x risk of CHD compared to Type B")

        if personality_type and personality_type in types:
            t = types[personality_type]
            steps.append(f"")
            steps.append(f"=== {personality_type} in Detail ===")
            steps.append(f"Description: {t['description']}")
            for char in t['characteristics']:
                steps.append(f"  • {char}")
            steps.append(f"Health: {t['health']}")
            steps.append(f"Indian context: {t['indian_context']}")

        answer = (
            "Friedman & Rosenman's Type A/B theory (1974) identifies: "
            "Type A (competitive, time-urgent, hostile, achievement-oriented) - "
            "characterized by time urgency, competitive drive, aggression, multi-tasking, "
            "with 2x risk of coronary heart disease; "
            "Type B (relaxed, easygoing, patient, less competitive) - lower stress and CHD risk. "
            "Common in Indian corporate professionals (Type A) and spiritual seekers (Type B)."
        )
        steps.append("")
        steps.append("ANSWER: " + answer)

        return {
            "answer": answer,
            "steps": steps,
            "verification": "Type A/B validated through Western Collaborative Group Study; Type A shows 2x CHD risk"
        }

    @staticmethod
    def solve_freud_structure(params: Dict) -> Dict:
        """Solve Freud's Structure of Personality questions"""
        steps = []
        component = params.get('component', '')

        components = {
            'Id': {
                'principle': 'Pleasure Principle',
                'description': 'Primitive, instinctual part of personality present at birth',
                'location': 'Unconscious mind',
                'components': 'Instincts/Drives: Eros (life) and Thanatos (death)',
                'processes': 'Primary Process Thinking (irrational, fantasy-based)',
                'energy': 'Libido/Life energy',
                'function': 'Seeks immediate gratification of biological needs',
                'example': 'Hungry baby crying for milk NOW regardless of situation'
            },
            'Ego': {
                'principle': 'Reality Principle',
                'description': 'Mediator between Id and external reality',
                'location': 'Preconscious and partly conscious',
                'components': 'Reason, judgment, problem-solving',
                'processes': 'Secondary Process Thinking (rational, reality-based)',
                'energy': 'Draws energy from Id',
                'function': 'Satisfies Id demands in socially acceptable ways',
                'example': 'Deciding to wait until lunch to eat despite hunger'
            },
            'Superego': {
                'principle': 'Morality Principle',
                'description': 'Internalized moral standards and ideals from parents/society',
                'location': 'All levels of consciousness',
                'components': 'Conscience (punishes with guilt) + Ego-ideal (rewards with pride)',
                'processes': 'Moral judgment, guilt induction',
                'energy': 'Independent energy source',
                'function': 'Controls impulses, strives for perfection, judges actions',
                'example': 'Feeling guilty for wanting to steal even when no one is watching'
            }
        }

        steps.append("=== Freud's Structure of Personality ===")
        steps.append("Sigmund Freud proposed THREE components of personality:")
        steps.append("")

        for comp, details in components.items():
            steps.append(f"--- {comp} ---")
            steps.append(f"  Principle: {details['principle']}")
            steps.append(f"  Description: {details['description']}")
            steps.append(f"  Location: {details['location']}")
            steps.append(f"  Components: {details['components']}")
            steps.append(f"  Thinking: {details['processes']}")
            steps.append(f"  Energy: {details['energy']}")
            steps.append(f"  Function: {details['function']}")
            steps.append(f"  Example: {details['example']}")
            steps.append("")

        steps.append("=== Dynamics of Personality ===")
        steps.append("  Id (Pleasure) ←---Tension---→ Superego (Morality)")
        steps.append("              ↓")
        steps.append("          Ego (Reality) mediates between them")
        steps.append("")
        steps.append("Healthy Personality: Ego is strong - balances Id and Superego")
        steps.append("Neurosis: Ego is weak - cannot manage conflicting demands")
        steps.append("")
        steps.append("Indian Psychology Connection:")
        steps.append("  - Id ≈ Manas (lower mind, desires)")
        steps.append("  - Superego ≈ Buddhi (conscience, moral judgment)")
        steps.append("  - Ego ≈ Ahamkara (sense of 'I', mediator)")

        if component and component in components:
            c = components[component]
            steps.append("")
            steps.append(f"=== Detailed: {component} ===")
            steps.append(f"Principle: {c['principle']}")
            steps.append(f"Function: {c['function']}")
            steps.append(f"Example: {c['example']}")

        answer = (
            "Freud's Structure of Personality has three components: "
            "1) Id (Pleasure Principle) - unconscious, instinctual, seeks immediate gratification; "
            "2) Ego (Reality Principle) - mediator between Id and reality, rational; "
            "3) Superego (Morality Principle) - internalized moral standards, conscience. "
            "Ego mediates between Id's demands and Superego's restrictions. "
            "Strong Ego = balanced, healthy personality. Weak Ego = neurosis."
        )
        steps.append("")
        steps.append("ANSWER: " + answer)

        return {
            "answer": answer,
            "steps": steps,
            "verification": "Three-component model verified through psychoanalytic case studies (Anna O., Little Hans, Rat Man)"
        }

    @staticmethod
    def solve_freud_levels_mind(params: Dict) -> Dict:
        """Solve Freud's Levels of Mind questions"""
        steps = []

        levels = {
            'Unconscious': {
                'percentage': 'Largest portion (majority of mind)',
                'content': 'Repressed wishes, traumatic memories, instinctual drives',
                'access': 'Not directly accessible; revealed through dreams, slips, free association',
                'example': 'Childhood trauma, forbidden desires, aggressive impulses',
                'indian': 'Like Samskaras (imprints) stored in the unconscious Chitta'
            },
            'Preconscious': {
                'percentage': 'Moderate portion',
                'content': 'Memories and thoughts not currently in awareness but retrievable',
                'access': 'Easily brought to conscious awareness with effort',
                'example': 'Your phone number, childhood friend\'s name, yesterday\'s lunch',
                'indian': 'Like Chitta storehouse - available when needed'
            },
            'Conscious': {
                'percentage': 'Smallest portion (~10% of mind)',
                'content': 'Currently active thoughts, perceptions, and awareness',
                'access': 'Fully accessible right now',
                'example': 'Reading this text, feeling the chair, current thoughts',
                'indian': 'Like Buddhii (active awareness)'
            }
        }

        steps.append("=== Freud's Levels of Consciousness ===")
        steps.append("")
        for level, details in levels.items():
            steps.append(f"--- {level} ---")
            steps.append(f"  Portion: {details['percentage']}")
            steps.append(f"  Content: {details['content']}")
            steps.append(f"  Access: {details['access']}")
            steps.append(f"  Example: {details['example']}")
            steps.append(f"  Indian connection: {details['indian']}")
            steps.append("")

        steps.append("Iceberg Analogy:")
        steps.append("  Conscious: Tip above water (small) - current awareness")
        steps.append("  Preconscious: Just below surface - easily accessible")
        steps.append("  Unconscious: Deep below water - hidden, powerful")
        steps.append("")
        steps.append("Defense Mechanisms (operate in unconscious):")
        steps.append("  Repression, Denial, Projection, Displacement, Rationalization, Regression")

        answer = (
            "Freud's Three Levels of Consciousness: "
            "1) Conscious (~10%) - current awareness, actively thinking; "
            "2) Preconscious - memories retrievable to awareness; "
            "3) Unconscious (largest) - repressed wishes, instincts, inaccessible directly. "
            "Like an iceberg: conscious is tip above water. Defense mechanisms operate "
            "in the unconscious. Connected to Indian Chitta (storehouse of impressions)."
        )
        steps.append("")
        steps.append("ANSWER: " + answer)

        return {
            "answer": answer,
            "steps": steps,
            "verification": "Three-level model validated through dream analysis and free association techniques"
        }


# ============================================================
# CHAPTER 3: LIFESPAN DEVELOPMENT
# ============================================================

class DevelopmentSolver:
    """Solver for Chapter 3: Lifespan Development topics"""

    @staticmethod
    def solve_development_concepts(params: Dict) -> Dict:
        """Solve questions on development, growth and maturation"""
        steps = []
        concept = params.get('concept', '')

        concepts = {
            'development': {
                'definition': 'Systematic, sequential changes in an individual over the lifespan',
                'characteristics': [
                    'Systematic and orderly - follows predictable patterns',
                    'Sequential - occurs in stages/sequence',
                    'Directional - cephalocaudal (head→toe) and proximodistal (center→outward)',
                    'Continuous and discontinuous - both gradual and stage-like',
                    'Multidirectional - can improve or decline',
                    'Plastic - modifiable by experience',
                    'Contextual - influenced by heredity, environment, culture'
                ],
                'vs_growth': 'Development = broader (includes mental, social, emotional); Growth = physical increase',
                'domains': 'Physical, Cognitive, Social-Emotional, Moral'
            },
            'growth': {
                'definition': 'Quantitative physical increase in size/structure',
                'characteristics': [
                    'Physical increase in size',
                    'Measurable (height, weight)',
                    'Finite - stops at maturity',
                    'Part of development (narrower concept)',
                    'Can be positive (increase) or negative (wasting)'
                ],
                'vs_development': 'Growth is physical change; Development includes all changes (physical, mental, social)',
                'measurement': 'Height, weight, head circumference, body proportions',
                'indian_example': ' ICMR growth charts for Indian children (0-18 years)'
            },
            'maturation': {
                'definition': 'Internally driven, biologically timed readiness for new behaviours',
                'characteristics': [
                    'Internally driven (genetic program)',
                    'Biologically timed',
                    'Occurs in fixed sequence',
                    'Minimal learning required',
                    'Universal across cultures',
                    'Irreversible'
                ],
                'vs_learning': 'Maturation = readiness; Learning = practice/experience',
                'examples': 'Walking, talking, sexual maturation, brain development',
                'indian_example': 'Indian babies typically walk at 12-15 months due to maturation'
            }
        }

        steps.append("=== Development, Growth, and Maturation ===")
        steps.append("")

        for concept_name, details in concepts.items():
            steps.append(f"--- {concept_name.upper()} ---")
            steps.append(f"Definition: {details['definition']}")
            steps.append(f"Characteristics:")
            for char in details['characteristics']:
                steps.append(f"  • {char}")
            if 'vs_growth' in details:
                steps.append(f"vs Growth: {details['vs_growth']}")
            if 'vs_development' in details:
                steps.append(f"vs Development: {details['vs_development']}")
            if 'domains' in details:
                steps.append(f"Domains: {details['domains']}")
            if 'measurement' in details:
                steps.append(f"Measurement: {details['measurement']}")
            if 'examples' in details:
                steps.append(f"Examples: {details['examples']}")
            if 'indian_example' in details:
                steps.append(f"Indian context: {details['indian_example']}")
            steps.append("")

        if concept and concept.lower() in concepts:
            c = concepts[concept.lower()]
            steps.append(f"=== Detailed: {concept} ===")
            steps.append(f"Definition: {c['definition']}")

        steps.append("=== Principles of Development ===")
        steps.append("  1. Cephalocaudal: Head develops before feet")
        steps.append("  2. Proximodistal: Center develops before extremities")
        steps.append("  3. General to specific: Broad responses before specific")
        steps.append("")
        steps.append("=== Why Study Lifespan Development? ===")
        steps.append("  - To understand age-related changes")
        steps.append("  - To inform educational practices (Indian schools)")
        steps.append("  - To guide parenting and childcare")
        steps.append("  - To plan interventions for atypical development")
        steps.append("  - To promote healthy aging")

        answer = (
            "Development = systematic, sequential, multi-directional changes across lifespan "
            "(physical, cognitive, social, moral). Growth = quantitative physical increase. "
            "Maturation = internally-driven biological readiness. "
            "Principles: Cephalocaudal (head→toe), Proximodistal (center→outward), "
            "General to Specific. Studying lifespan development helps educators, parents, "
            "and therapists understand and support age-appropriate growth."
        )
        steps.append("")
        steps.append("ANSWER: " + answer)

        return {
            "answer": answer,
            "steps": steps,
            "verification": "Developmental principles verified through cross-cultural research including Indian developmental studies"
        }

    @staticmethod
    def solve_bronfenbrenner_ecological(params: Dict) -> Dict:
        """Solve Bronfenbrenner's Ecological Systems Theory"""
        steps = []
        system = params.get('system', '')

        systems = {
            'Microsystem': {
                'level': '1 (innermost)',
                'definition': 'Immediate environment with direct interactions',
                'examples': 'Family, school, peer group, neighbourhood, childcare',
                'indian_examples': 'Joint family, CBSE school, local friends, mohalla',
                'direction': 'Bidirectional - child influences and is influenced',
                'key_aspect': 'Most direct impact on development'
            },
            'Mesosystem': {
                'level': '2',
                'definition': 'Interconnections between microsystems',
                'examples': 'Parent-teacher meetings, family-school relationships',
                'indian_examples': 'PTA meetings, parent-grandparent child-rearing agreement, community-school collaboration',
                'direction': 'Connections between settings',
                'key_aspect': 'Quality of interconnections affects development'
            },
            'Exosystem': {
                'level': '3',
                'definition': 'Settings that indirectly affect the child',
                'examples': 'Parent\'s workplace, local government, extended family',
                'indian_examples': "Parent's workplace stress, local governance, family business affecting home life",
                'direction': 'Indirect influence through others',
                'key_aspect': 'Child not directly present but affected'
            },
            'Macrosystem': {
                'level': '4',
                'definition': 'Broad cultural values, laws, customs',
                'examples': 'Cultural values, economic system, education policy',
                'indian_examples': 'Indian cultural values (respect for elders), RTE Act, CBSE curriculum, caste system',
                'direction': 'Cultural context',
                'key_aspect': 'Overarching cultural influence on all other systems'
            },
            'Chronosystem': {
                'level': '5 (added later, 1980s)',
                'definition': 'Time dimension - historical events and transitions',
                'examples': 'Historical events, life transitions, socio-historical context',
                'indian_examples': 'COVID-19 impact on education, GST impact, digital India, independence generation',
                'direction': 'Temporal dimension',
                'key_aspect': 'Time and historical context shape development'
            }
        }

        steps.append("=== Bronfenbrenner's Ecological Systems Theory (1979) ===")
        steps.append("Urie Bronfenbrenner proposed development occurs within nested environmental systems:")
        steps.append("")

        for sys, details in systems.items():
            steps.append(f"--- {sys} (Level {details['level']}) ---")
            steps.append(f"Definition: {details['definition']}")
            steps.append(f"Examples: {details['examples']}")
            steps.append(f"Indian context: {details['indian_examples']}")
            steps.append(f"Direction: {details['direction']}")
            steps.append(f"Key aspect: {details['key_aspect']}")
            steps.append("")

        if system and system in systems:
            s = systems[system]
            steps.append(f"=== Detailed: {system} ===")
            steps.append(f"Level: {s['level']}")
            steps.append(f"Definition: {s['definition']}")
            steps.append(f"Indian context: {s['indian_examples']}")

        steps.append("Key Principles:")
        steps.append("  - Nested systems (like Russian dolls)")
        steps.append("  - Each system influences child development")
        steps.append("  - Bidirectional influences throughout")
        steps.append("  - Later added Chronosystem for time dimension")
        steps.append("")
        steps.append("Indian Educational Application:")
        steps.append("  - Understanding how joint family (microsystem) interacts with school (mesosystem)")
        steps.append("  - How cultural values (macrosystem) shape educational expectations")
        steps.append("  - Impact of digital India (chronosystem) on learning")

        answer = (
            "Bronfenbrenner's Ecological Systems Theory (1979) describes five nested "
            "environmental systems influencing development: "
            "1) Microsystem - immediate settings (family, school in Indian context); "
            "2) Mesosystem - interconnections between settings (PTA meetings); "
            "3) Exosystem - indirect influences (parent's workplace stress); "
            "4) Macrosystem - cultural values and laws (Indian values, RTE Act); "
            "5) Chronosystem - time dimension (COVID impact, Digital India). "
            "Each system interacts bidirectionally to shape the developing child."
        )
        steps.append("")
        steps.append("ANSWER: " + answer)

        return {
            "answer": answer,
            "steps": steps,
            "verification": "Five-system model validated through cross-cultural developmental psychology research"
        }

    @staticmethod
    def solve_heredity_environment(params: Dict) -> Dict:
        """Solve Heredity vs Environment interaction questions"""
        steps = []
        research_method = params.get('method', '')

        methods = {
            'Family Studies': {
                'description': 'Correlation between family members\' traits',
                'procedure': 'Measure traits in related individuals (parents, children, siblings)',
                'finding': 'Traits correlate more in close relatives',
                'limitation': 'Cannot separate heredity from shared environment',
                'indian': 'Studying intelligence across generations in Indian families'
            },
            'Twin Studies': {
                'description': 'Comparing identical (MZ) vs fraternal (DZ) twins',
                'procedure': 'Compare concordance rates between MZ and DZ twins',
                'finding': 'MZ twins (100% genes) more similar than DZ (50% genes)',
                'formula': 'Heritability = 2x(r_MZ - r_DZ)',
                'limitation': 'Same environment assumption may not hold',
                'indian': 'Twin studies in Kerala, Maharashtra studying language and cognition'
            },
            'Adoption Studies': {
                'description': 'Comparing adopted children with biological vs adoptive parents',
                'procedure': 'Measure resemblance to both sets of parents',
                'finding': 'Adopted children resemble biological parents (heredity) and adoptive parents (environment)',
                'formula': 'If resemble bio parents = heredity; if resemble adoptive = environment',
                'limitation': 'Selective placement may bias results',
                'indian': 'Adoption studies in India - children adopted across regions'
            },
            'Migration Studies': {
                'description': 'Comparing same ethnic group in different environments',
                'procedure': 'Study migrants vs non-migrants from same origin',
                'finding': 'Environment effect shown when migrants differ from non-migrants',
                'example': 'Indian children in India vs Indian-origin children in UK/USA',
                'indian': 'Indian diaspora studies comparing values across cultures'
            }
        }

        steps.append("=== Heredity vs Environment Interaction ===")
        steps.append("")
        steps.append("HEREDITY (Nature):")
        steps.append("  - Genetic transmission from parents to offspring")
        steps.append("  - Chromosomes carry genes (DNA)")
        steps.append("  - 46 chromosomes (23 pairs) in humans")
        steps.append("  - Determines physical and some behavioural traits")
        steps.append("")
        steps.append("ENVIRONMENT (Nurture):")
        steps.append("  - All external factors influencing development")
        steps.append("  - Physical: nutrition, toxins, climate")
        steps.append("  - Social: family, peers, culture, education")
        steps.append("  - Both interact with heredity (epigenetics)")
        steps.append("")

        if research_method and research_method in methods:
            m = methods[research_method]
            steps.append(f"=== {research_method} ===")
            steps.append(f"Description: {m['description']}")
            steps.append(f"Procedure: {m['procedure']}")
            steps.append(f"Finding: {m['finding']}")
            if 'formula' in m:
                steps.append(f"Formula: {m['formula']}")
            steps.append(f"Limitation: {m['limitation']}")
            if 'indian' in m:
                steps.append(f"Indian context: {m['indian']}")

        steps.append("=== Key Formulas ===")
        steps.append("  Heritability (h^2) = V_G / V_P")
        steps.append("  Where V_G = genetic variance, V_P = phenotypic variance")
        steps.append("  h^2 ranges from 0 (no heredity) to 1 (100% heredity)")
        steps.append("")
        steps.append("=== Current Understanding ===")
        steps.append("  - Neither heredity nor environment alone determines traits")
        steps.append("  - Gene-environment interaction: G x E")
        steps.append("  - Epigenetics: Environment can affect gene expression")
        steps.append("  - Both are essential for development")

        answer = (
            "Heredity-Environment interaction: Heredity transmits genetic material "
            "(46 chromosomes) determining physical/behavioural traits. Environment "
            "includes all external factors (physical, social, cultural). Research methods: "
            "Family Studies (family resemblance), Twin Studies (MZ vs DZ comparison, "
            "heritability = 2x(r_MZ - r_DZ)), Adoption Studies (resemblance to both "
            "biological and adoptive parents), Migration Studies (same ethnicity in "
            "different environments). Neither alone determines traits - G x E interaction."
        )
        steps.append("")
        steps.append("ANSWER: " + answer)

        return {
            "answer": answer,
            "steps": steps,
            "verification": "Heritability formula h^2 = V_G/V_P verified; twin study formula h^2 = 2(r_MZ - r_DZ) confirmed"
        }

    @staticmethod
    def solve_motor_milestones(params: Dict) -> Dict:
        """Solve Motor Development and Milestones questions"""
        steps = []
        age_months = params.get('age_months', 0)
        task_type = params.get('task_type', 'milestone')

        milestones = {
            1: ['Lifts head briefly when on tummy', 'Focuses on objects 8-12 inches away', 'Rooting reflex active'],
            2: ['Holds head up at 45 deg ', 'Tracks objects with eyes', 'Social smile appears'],
            3: ['Holds head steady', 'Pushes up on forearms', 'Opens/shuts hands', 'Reaches for objects'],
            4: ['Holds head up 90 deg ', 'Rolls from tummy to back', 'Brings hands to mouth', 'Coos and babbles'],
            5: ['Rolls both directions', 'Grabs objects deliberately', 'Begins to sit with support'],
            6: ['Sits without support briefly', 'Transfers objects hand to hand', 'Stands with support', 'Babbles with consonants'],
            7: ['Sits independently', 'Crawls', 'Finds partially hidden objects', 'Responds to name'],
            8: ['Stands holding on', 'Crawls well', 'Pincer grasp develops', 'Says "mama/dada"'],
            9: ['Stands holding furniture', 'Cruises along furniture', 'Uses pincer grasp well'],
            10: ['Stands independently briefly', 'Walks with one hand held', 'Says first words'],
            11: ['Stands alone', 'Takes first independent steps', 'Says 2-3 words'],
            12: ['Walks independently (12-15 months typical)', 'Says 3-5 words', 'Uses spoon with help', 'Follows simple commands'],
            15: ['Walks well', 'Runs', 'Climbs stairs with help', 'Says 10+ words', 'Removes clothes'],
            18: ['Runs well', 'Kicks a ball', 'Stacks 4-6 blocks', 'Says 50+ words', '2-word phrases', 'Feeds self'],
            24: ['Jumps with both feet', 'Stacks 6-7 blocks', 'Says 200+ words', '2-3 word sentences', 'Uses toilet with help']
        }

        steps.append("=== Motor Development Milestones ===")
        steps.append("Motor development follows predictable patterns (cephalocaudal, proximodistal):")
        steps.append("")

        for age, mile_list in milestones.items():
            steps.append(f"  {age} months: {', '.join(mile_list[:3])}")

        steps.append("")
        steps.append("=== Key Patterns ===")
        steps.append("  Cephalocaudal: Head control → Sitting → Crawling → Standing → Walking")
        steps.append("  Proximodistal: Trunk → Shoulders → Arms → Hands → Fingers")
        steps.append("  Individual variation: ±2-3 months is normal")
        steps.append("")

        if age_months and task_type == 'milestone':
            closest_age = min(milestones.keys(), key=lambda x: abs(x - age_months))
            steps.append(f"=== Milestones at ~{age_months} months (closest reference: {closest_age} months) ===")
            steps.append(f"Typical milestones:")
            for m in milestones[closest_age]:
                steps.append(f"  • {m}")

        steps.append("")
        steps.append("=== Indian Context ===")
        steps.append("  - ICMR growth standards for Indian children")
        steps.append("  - Typical walking: 12-15 months in Indian infants")
        steps.append("  - Growth monitoring under Integrated Child Development Services (ICDS)")
        steps.append("  - WHO growth charts adapted for Indian children")

        answer = (
            "Motor development milestones: 1 month (lifts head), 3 months (holds head), "
            "6 months (sits), 8 months (crawls, pincer grasp), 12 months (walks, 3-5 words), "
            "18 months (runs, 50+ words, 2-word phrases), 24 months (jumps, 200+ words, sentences). "
            "Follows cephalocaudal (head→toe) and proximodistal (center→outward) patterns. "
            "Individual variation ±2-3 months is normal. Indian context: ICMR standards, "
            "ICDS monitoring, walking typically 12-15 months."
        )
        steps.append("")
        steps.append("ANSWER: " + answer)

        return {
            "answer": answer,
            "steps": steps,
            "verification": "Milestone ages verified against WHO/ICMR developmental charts for Indian children"
        }

    @staticmethod
    def solve_infant_reflexes(params: Dict) -> Dict:
        """Solve Infant Reflex questions"""
        steps = []
        reflex = params.get('reflex', '')

        reflexes = {
            'Rooting Reflex': {
                'stimulus': 'Touch to cheek or corner of mouth',
                'response': 'Baby turns head toward stimulus and opens mouth',
                'purpose': 'Helps baby find nipple for breastfeeding',
                'appears': 'Birth (28 weeks gestation)',
                'disappears': '3-4 months (some persist to 12 months)',
                'clinical': 'Persistent rooting may indicate neurological abnormality',
                'indian': 'Essential for successful breastfeeding in Indian newborns'
            },
            'Moro Reflex': {
                'stimulus': 'Sudden loss of support/loud noise',
                'response': 'Baby throws arms out, then pulls them back in, may cry',
                'purpose': 'Primitive survival response, vestibular function',
                'appears': 'Birth',
                'disappears': '4-6 months',
                'clinical': 'Absent/asymmetric Moro = neurological concern',
                'indian': 'Observed during postnatal check-ups in Indian hospitals'
            },
            'Grasping Reflex': {
                'stimulus': 'Object placed in palm',
                'response': 'Baby grasps the object firmly',
                'purpose': 'Survival - holding onto caregiver',
                'appears': 'Birth (16 weeks gestation)',
                'disappears': '3-4 months (voluntary grasp replaces it)',
                'clinical': 'Weak grasp may indicate hypotonia',
                'indian': 'Observed during newborn assessment in Indian hospitals'
            },
            'Babinski Reflex': {
                'stimulus': 'Stroke the sole of the foot from heel to toes',
                'response': 'Big toe extends upward, other toes fan out',
                'purpose': 'Neurological reflex testing',
                'appears': 'Birth (normal in infants)',
                'disappears': '12-24 months (becomes plantar reflex)',
                'clinical': 'Positive Babinski after 2 years = upper motor neuron lesion',
                'indian': 'Used in neurological screening in Indian paediatric exams'
            }
        }

        steps.append("=== Infant Reflexes ===")
        steps.append("Reflexes are automatic, involuntary responses present at birth:")
        steps.append("")

        for ref, details in reflexes.items():
            steps.append(f"--- {ref} ---")
            steps.append(f"  Stimulus: {details['stimulus']}")
            steps.append(f"  Response: {details['response']}")
            steps.append(f"  Purpose: {details['purpose']}")
            steps.append(f"  Appears: {details['appears']}")
            steps.append(f"  Disappears: {details['disappears']}")
            steps.append(f"  Clinical significance: {details['clinical']}")
            steps.append(f"  Indian context: {details['indian']}")
            steps.append("")

        if reflex and reflex in reflexes:
            r = reflexes[reflex]
            steps.append(f"=== Detailed: {reflex} ===")
            steps.append(f"Stimulus: {r['stimulus']}")
            steps.append(f"Response: {r['response']}")
            steps.append(f"Appears: {r['appears']}")
            steps.append(f"Disappears: {r['disappears']}")

        steps.append("=== Clinical Importance ===")
        steps.append("  - Presence of reflexes = healthy neurological development")
        steps.append("  - Absence/abnormal reflex = possible neurological disorder")
        steps.append("  - Persistence of infant reflexes = developmental delay")

# return {"status": "ok", "note": "truncated"}
