'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, ReviewItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ============================================================================
// NODE CONSTANTS (45 CBSE/ISC Psychology Nodes)
// ============================================================================
const NODE_CONCEPT_OF_SELF = 'c12_psy_cbse_110';
const NODE_SELF_SUBJECT_OBJECT = 'c12_psy_cbse_111';
const NODE_KINDS_OF_SELF = 'c12_psy_cbse_112';
const NODE_SELF_CONCEPT = 'c12_psy_cbse_113';
const NODE_SELF_ESTEEM = 'c12_psy_cbse_114';
const NODE_SELF_EFFICACY = 'c12_psy_cbse_115';
const NODE_SELF_REGULATION = 'c12_psy_cbse_116';
const NODE_CULTURE_AND_SELF = 'c12_psy_cbse_117';
const NODE_CONCEPT_OF_PERSONALITY = 'c12_psy_cbse_118';
const NODE_FEATURES_OF_PERSONALITY = 'c12_psy_cbse_119';
const NODE_PERSONALITY_TERMS = 'c12_psy_cbse_120';
const NODE_TYPE_APPROACH = 'c12_psy_cbse_121';
const NODE_HISTORICAL_TYPOLOGIES = 'c12_psy_cbse_122';
const NODE_SHELDON_JUNG_TYPES = 'c12_psy_cbse_123';
const NODE_TYPE_A_B_C_D = 'c12_psy_cbse_124';
const NODE_TRAIT_APPROACH = 'c12_psy_cbse_125';
const NODE_ALLPORT_TRAITS = 'c12_psy_cbse_126';
const NODE_CATTELL_16PF = 'c12_psy_cbse_127';
const NODE_EYSENCK_DIMENSIONS = 'c12_psy_cbse_128';
const NODE_BIG_FIVE_MODEL = 'c12_psy_cbse_129';
const NODE_PSYCHODYNAMIC_APPROACH = 'c12_psy_cbse_130';
const NODE_FREUD_LEVELS_CONSCIOUSNESS = 'c12_psy_cbse_131';
const NODE_FREUD_STRUCTURAL_MODEL = 'c12_psy_cbse_132';
const NODE_FREUD_PSYCHOSEXUAL_STAGES = 'c12_psy_cbse_133';
const NODE_DEFENSE_MECHANISMS = 'c12_psy_cbse_134';
const NODE_POST_FREUDIAN_APPROACHES = 'c12_psy_cbse_135';
const NODE_JUNG_ANALYTICAL_PSYCHOLOGY = 'c12_psy_cbse_136';
const NODE_HORNEY_THEORY = 'c12_psy_cbse_137';
const NODE_ADLER_INDIVIDUAL_PSYCHOLOGY = 'c12_psy_cbse_138';
const NODE_ERIKSON_IDENTITY_THEORY = 'c12_psy_cbse_139';
const NODE_BEHAVIORAL_APPROACH = 'c12_psy_cbse_140';
const NODE_CULTURAL_APPROACH = 'c12_psy_cbse_141';
const NODE_HUMANISTIC_APPROACH = 'c12_psy_cbse_142';
const NODE_ROGERS_PERSON_CENTERED = 'c12_psy_cbse_143';
const NODE_MASLOW_HIERARCHY = 'c12_psy_cbse_144';
const NODE_CONCEPT_PERSONALITY_ASSESSMENT = 'c12_psy_cbse_145';
const NODE_SELF_REPORT_MEASURES = 'c12_psy_cbse_146';
const NODE_MMPI = 'c12_psy_cbse_147';
const NODE_EPQ_AND_16PF = 'c12_psy_cbse_148';
const NODE_PROJECTIVE_TECHNIQUES = 'c12_psy_cbse_149';
const NODE_RORSCHACH_INKBLOT = 'c12_psy_cbse_150';
const NODE_TAT = 'c12_psy_cbse_151';
const NODE_OTHER_PROJECTIVE = 'c12_psy_cbse_152';
const NODE_BEHAVIORAL_ANALYSIS = 'c12_psy_cbse_153';
const NODE_EVALUATION_ASSESSMENT = 'c12_psy_cbse_154';

const ALL_NODE_IDS: string[] = [
  NODE_CONCEPT_OF_SELF, NODE_SELF_SUBJECT_OBJECT, NODE_KINDS_OF_SELF, NODE_SELF_CONCEPT,
  NODE_SELF_ESTEEM, NODE_SELF_EFFICACY, NODE_SELF_REGULATION, NODE_CULTURE_AND_SELF,
  NODE_CONCEPT_OF_PERSONALITY, NODE_FEATURES_OF_PERSONALITY, NODE_PERSONALITY_TERMS, NODE_TYPE_APPROACH,
  NODE_HISTORICAL_TYPOLOGIES, NODE_SHELDON_JUNG_TYPES, NODE_TYPE_A_B_C_D, NODE_TRAIT_APPROACH,
  NODE_ALLPORT_TRAITS, NODE_CATTELL_16PF, NODE_EYSENCK_DIMENSIONS, NODE_BIG_FIVE_MODEL,
  NODE_PSYCHODYNAMIC_APPROACH, NODE_FREUD_LEVELS_CONSCIOUSNESS, NODE_FREUD_STRUCTURAL_MODEL, NODE_FREUD_PSYCHOSEXUAL_STAGES,
  NODE_DEFENSE_MECHANISMS, NODE_POST_FREUDIAN_APPROACHES, NODE_JUNG_ANALYTICAL_PSYCHOLOGY, NODE_HORNEY_THEORY,
  NODE_ADLER_INDIVIDUAL_PSYCHOLOGY, NODE_ERIKSON_IDENTITY_THEORY, NODE_BEHAVIORAL_APPROACH, NODE_CULTURAL_APPROACH,
  NODE_HUMANISTIC_APPROACH, NODE_ROGERS_PERSON_CENTERED, NODE_MASLOW_HIERARCHY, NODE_CONCEPT_PERSONALITY_ASSESSMENT,
  NODE_SELF_REPORT_MEASURES, NODE_MMPI, NODE_EPQ_AND_16PF, NODE_PROJECTIVE_TECHNIQUES,
  NODE_RORSCHACH_INKBLOT, NODE_TAT, NODE_OTHER_PROJECTIVE, NODE_BEHAVIORAL_ANALYSIS, NODE_EVALUATION_ASSESSMENT
];

// ============================================================================
// MANDATORY SECTION DATA STRUCTURES
// ============================================================================

const SCENARIO = {
  title: 'Mind & Personality Exploration Laboratory',
  intro: 'Welcome to the National Institute of Cognitive & Clinical Psychology Simulator. You are appointed as lead psychotherapist and behavioral scientist.',
  context: 'In this interactive clinical laboratory, you will explore the inner workings of human self-concept, psychodynamic unconscious drives, Big-5 trait profiles, humanistic growth dynamics, and clinical psychometric assessments.'
};

const DISCOVERY_QUESTION = {
  question: 'When a person experiences severe anxiety from an unacceptable unconscious urge, why does the Ego deploy Defense Mechanisms like Rationalization or Projection without conscious awareness?',
  options: [
    'Defense mechanisms are deliberate lies designed to trick other people.',
    'Defense mechanisms distort reality unconsciously to protect the Ego from overwhelming anxiety and guilt.',
    'Defense mechanisms are physical muscle reflexes controlled by the spinal cord.',
    'Defense mechanisms permanently delete negative memories from the brain.'
  ],
  correctIndex: 1,
  hintAfter: 'Defense mechanisms operate unconsciously to shield the conscious Ego from conflict between Id impulses and Superego moral standards.'
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Psychodynamic Mind Architecture',
    instruction: 'Adjust the Id, Ego, and Superego sliders to see how unconscious drives trigger anxiety and defense mechanisms across conscious levels.',
    interactionType: 'psychodynamic-explorer',
    nodeId: NODE_FREUD_STRUCTURAL_MODEL
  },
  {
    title: 'Lab 2: Trait & Type Trajectory Lab',
    instruction: 'Manipulate Big Five (OCEAN) sliders and Eysenck dimensions to map personality archetypes, somatotypes, and Type A/B stress behaviors.',
    interactionType: 'trait-type-profiler',
    nodeId: NODE_BIG_FIVE_MODEL
  },
  {
    title: 'Lab 3: Self Dynamics & Humanistic Growth',
    instruction: 'Adjust Real Self vs Ideal Self alignment (Rogers Congruence) and build Maslow Hierarchy levels to observe self-actualization potential.',
    interactionType: 'humanistic-self-lab',
    nodeId: NODE_ROGERS_PERSON_CENTERED
  },
  {
    title: 'Lab 4: Psychometric & Projective Assessment Suite',
    instruction: 'Conduct Rorschach Inkblot scoring, TAT narrative analysis, MMPI clinical scale profiling, and behavioral observation rating.',
    interactionType: 'assessment-suite',
    nodeId: NODE_PROJECTIVE_TECHNIQUES
  },
  {
    title: 'Lab 5: Cross-Cultural & Behavioral Self Dynamics',
    instruction: 'Compare Indian Individual-Group Enmeshment (Relational Self) with Western Independent Self boundaries and Bandura self-efficacy.',
    interactionType: 'cultural-behavioral-lab',
    nodeId: NODE_CULTURE_AND_SELF
  }
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If Carl Rogers\' client experiences a HUGE gap between their Real Self and Ideal Self (high incongruence), what psychological state will result?',
    options: [
      'High self-efficacy and immediate self-actualization',
      'Severe psychological vulnerability, anxiety, and neurosis',
      'Instant transformation into Type A personality',
      'Complete immunity to ego defense mechanisms'
    ],
    correctIndex: 1,
    verifyInstruction: 'Set Real Self high and Ideal Self low in Lab 3 to test Rogers Congruence Index.',
    nodeId: NODE_ROGERS_PERSON_CENTERED
  },
  {
    question: 'Predict: What happens when an individual with high Type A personality traits is subjected to continuous high workplace stress?',
    options: [
      'They relax quickly and exhibit Type B patience.',
      'They show high risk for Coronary Heart Disease due to hyper-competitiveness and hostility.',
      'Their Big Five Conscientiousness drops to zero immediately.',
      'They regress to Freud\'s oral stage of development.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust Type A indicators in Lab 2 and observe stress risk gauge.',
    nodeId: NODE_TYPE_A_B_C_D
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the relationship between Id drives and Superego demands when Ego strength is set to LOW?',
    observableOptions: [
      'The Ego smoothly balances both without any defense mechanisms.',
      'Unconscious conflicts overwhelm consciousness, causing high anxiety and extreme defense mechanism activations.',
      'The person reaches instant Self-Actualization.',
      'The individual moves from Endomorphic to Ectomorphic body type.'
    ],
    correctIndex: 1,
    nodeId: NODE_DEFENSE_MECHANISMS
  },
  {
    question: 'In the Projective Assessment simulator, how do responses to ambiguous inkblots reveal underlying personality dynamics?',
    observableOptions: [
      'By testing explicit math skills and memory capacity directly.',
      'By allowing unconscious motives, conflicts, and desires to be projected onto unstructured stimuli.',
      'By directly measuring galvanic skin reaction and blood pressure.',
      'By scoring handwriting speed and reading comprehension.'
    ],
    correctIndex: 1,
    nodeId: NODE_RORSCHACH_INKBLOT
  }
];

const REAL_WORLD_ACTIVITY = {
  title: 'Clinical Case Formulation & Executive Coaching Plan',
  description: 'Apply comprehensive psychological assessment tools to formulate a holistic diagnostic profile for an executive experiencing burnout.',
  steps: [
    'Administer MMPI-2 and 16PF self-report inventories to evaluate clinical scales and source traits.',
    'Conduct TAT (Thematic Apperception Test) to uncover implicit needs for Achievement, Affiliation, and Power.',
    'Evaluate Self-Efficacy and Self-Regulation capabilities using Bandura behavioral rating scales.',
    'Design a Humanistic Person-Centered counseling intervention focusing on Rogers congruence and Maslow esteem fulfillment.'
  ]
};

const MISCONCEPTIONS = [
  {
    id: 'm1',
    misconception: 'Personality is fixed at birth and cannot be influenced by culture or learning.',
    correction: 'Personality is a dynamic structure influenced by biological disposition (temperament), environmental learning, and cultural context.',
    nodeId: NODE_FEATURES_OF_PERSONALITY
  },
  {
    id: 'm2',
    misconception: 'Self-esteem and Self-efficacy are identical concepts.',
    correction: 'Self-esteem is an overall emotional evaluation of one\'s self-worth, whereas Self-efficacy is belief in one\'s capability to perform specific tasks.',
    nodeId: NODE_SELF_EFFICACY
  },
  {
    id: 'm3',
    misconception: 'Projective tests like Rorschach give objective, mathematically precise diagnostic scores like an X-ray.',
    correction: 'Projective tests require qualitative interpretation of responses to ambiguous stimuli and suffer from subjective interpreter bias unless standardized scoring (like Exner System) is used.',
    nodeId: NODE_EVALUATION_ASSESSMENT
  },
  {
    id: 'm4',
    misconception: 'Freud\'s Ego is the selfish, greedy part of human personality.',
    correction: 'The Id is driven by selfish pleasure principles; the Ego is the realistic mediator operating on the Reality Principle.',
    nodeId: NODE_FREUD_STRUCTURAL_MODEL
  },
  {
    id: 'm5',
    misconception: 'Introversion is a psychological disorder equivalent to social anxiety.',
    correction: 'Introversion is a normal personality dimension characterized by orientation toward inner experiences rather than pathology.',
    nodeId: NODE_EYSENCK_DIMENSIONS
  },
  {
    id: 'm6',
    misconception: 'Western and Indian views of Self are identical in emphasizing individual autonomy above group identity.',
    correction: 'Western culture emphasizes an independent, autonomous self; Indian perspective emphasizes an interdependent, relational, and context-sensitive self (Trigunas & Enmeshment).',
    nodeId: NODE_CULTURE_AND_SELF
  }
];

const DIAGNOSTIC_QUESTIONS = [
  {
    question: 'According to Gordon Allport, traits that dominate an individual\'s entire life and define their identity (e.g., Gandhian non-violence) are called:',
    options: ['Central Traits', 'Cardinal Traits', 'Secondary Traits', 'Surface Traits'],
    correctIndex: 1,
    nodeId: NODE_ALLPORT_TRAITS
  },
  {
    question: 'Which defense mechanism involves attributing one\'s own unacknowledged unacceptable desires onto another person?',
    options: ['Repression', 'Projection', 'Reaction Formation', 'Sublimation'],
    correctIndex: 1,
    nodeId: NODE_DEFENSE_MECHANISMS
  },
  {
    question: 'Raymond Cattell used which statistical technique to identify 16 core source traits from surface traits?',
    options: ['Meta-analysis', 'Factor Analysis', 'Analysis of Variance (ANOVA)', 'Chi-square test'],
    correctIndex: 1,
    nodeId: NODE_CATTELL_16PF
  },
  {
    question: 'In Carl Jung\'s theory, the shared memory store of human ancestral experiences inherited across generations is known as the:',
    options: ['Personal Unconscious', 'Collective Unconscious', 'Ego Ideal', 'Archetypal Shadow'],
    correctIndex: 1,
    nodeId: NODE_JUNG_ANALYTICAL_PSYCHOLOGY
  },
  {
    question: 'Which personality assessment technique asks subjects to make up stories about ambiguous black-and-white pictures of people?',
    options: ['Rorschach Inkblot Test', 'Thematic Apperception Test (TAT)', 'MMPI-2', 'Rosenzweig Picture-Frustration Study'],
    correctIndex: 1,
    nodeId: NODE_TAT
  },
  {
    question: 'According to Ayurvedic cross-cultural typology, which personality disposition is characterized by activity, passion, and desire for gratification?',
    options: ['Sattva Guna', 'Rajas Guna', 'Tamas Guna', 'Vata Dosha'],
    correctIndex: 1,
    nodeId: NODE_HISTORICAL_TYPOLOGIES
  },
  {
    question: 'Carl Rogers posited that psychological adjustment occurs when there is high congruence between:',
    options: ['Id and Superego', 'Real Self and Ideal Self', 'Cardinal and Secondary traits', 'Type A and Type B traits'],
    correctIndex: 1,
    nodeId: NODE_ROGERS_PERSON_CENTERED
  },
  {
    question: 'Which Big Five personality dimension reflects traits such as organization, self-discipline, goal-directed behavior, and dependability?',
    options: ['Extraversion', 'Conscientiousness', 'Openness to Experience', 'Agreeableness'],
    correctIndex: 1,
    nodeId: NODE_BIG_FIVE_MODEL
  }
];

// ============================================================================
// 22 PROGRESSIVE CHALLENGES (Foundation, Standard, Advanced)
// ============================================================================

interface Challenge {
  id: string;
  nodeId: string;
  type: 'mcq' | 'drag-sort' | 'numeric' | 'match';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (1-7) ---
  {
    id: 'ch1',
    nodeId: NODE_CONCEPT_OF_SELF,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'When an individual views themselves as an active actor doing an action ("I am studying psychology"), the self is functioning as:',
    options: ['Self as Object', 'Self as Subject', 'Social Self', 'Ideal Self'],
    correctIndex: 1,
    explanation: 'Self as Subject is the actor/knower ("I"), while Self as Object is the observed entity being known ("Me").',
    hints: ['Think of "I" vs "Me".', 'Subject is the doer of the action.', 'Object is the target of perception.']
  },
  {
    id: 'ch2',
    nodeId: NODE_SELF_ESTEEM,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Conceptual Understanding',
    question: 'Self-esteem refers primarily to an individual\'s:',
    options: [
      'Belief in ability to perform a specific task',
      'Overall emotional value judgment of their own self-worth',
      'Knowledge about academic facts',
      'Repression of basic drives'
    ],
    correctIndex: 1,
    explanation: 'Self-esteem is an affective evaluation of personal self-worth, whereas self-efficacy is task-specific mastery belief.',
    hints: ['Is it about feeling worthy or doing tasks?', 'Affective evaluation of self.', 'Value judgment of self-worth.']
  },
  {
    id: 'ch3',
    nodeId: NODE_FREUD_LEVELS_CONSCIOUSNESS,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Structure Recall',
    question: 'According to Sigmund Freud, thoughts and feelings that are easily brought into conscious awareness when attention is focused on them belong to the:',
    options: ['Conscious level', 'Preconscious (Subconscious) level', 'Unconscious level', 'Collective Unconscious'],
    correctIndex: 1,
    explanation: 'The Preconscious contains memories and mental material that are not currently in awareness but can be easily recalled.',
    hints: ['It sits just below conscious surface.', 'Easily retrieved with focus.', 'Not deeply repressed.']
  },
  {
    id: 'ch4',
    nodeId: NODE_FREUD_STRUCTURAL_MODEL,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Model Understanding',
    question: 'Which structure of Freud\'s personality operates strictly on the Pleasure Principle, demanding immediate gratification of instinctual needs?',
    options: ['Ego', 'Superego', 'Id', 'Persona'],
    correctIndex: 2,
    explanation: 'The Id is instinctual, irrational, primitive, and operates solely on the Pleasure Principle.',
    hints: ['Primitive and instinctual.', 'Demands immediate gratification.', 'Unconscious impulse store.']
  },
  {
    id: 'ch5',
    nodeId: NODE_SHELDON_JUNG_TYPES,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Typology Recognition',
    question: 'William Sheldon categorized individuals into body types called somatotypes. A person with a thin, fragile, intellectual body build is termed an:',
    options: ['Endomorph', 'Mesomorph', 'Ectomorph', 'Pyknic'],
    correctIndex: 2,
    explanation: 'Ectomorphs are characterized by thin, fragile, tall bodies and tend to be cerebral, introverted, and sensitive.',
    hints: ['Thin and linear build.', 'Associated with Cerebrotonia.', 'Ecto = outer/thin.']
  },
  {
    id: 'ch6',
    nodeId: NODE_TYPE_A_B_C_D,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Typology Recognition',
    question: 'Type C personality traits, characterized by unassertiveness, suppression of negative emotions, and compliance, have been linked to susceptibility to:',
    options: ['Coronary Heart Disease', 'Cancer', 'Depressive Schizophrenia', 'Obsessive-Compulsive Disorder'],
    correctIndex: 1,
    explanation: 'Type C personalities suppress anger and negative emotions, which research by Morris and Greer linked to cancer susceptibility.',
    hints: ['Type A is associated with heart disease.', 'Type C suppresses negative emotions.', 'Research links emotion suppression to cancer risk.']
  },
  {
    id: 'ch7',
    nodeId: NODE_BIG_FIVE_MODEL,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Model Knowledge',
    question: 'In the Five-Factor Model of Personality (OCEAN), the acronym OCEAN stands for:',
    options: [
      'Optimism, Curiosity, Emotion, Anxiety, Neuroticism',
      'Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism',
      'Organization, Culture, Energy, Adaptability, Organization',
      'Observation, Cognition, Egocentrism, Altruism, Non-conformity'
    ],
    correctIndex: 1,
    explanation: 'OCEAN stands for Openness to Experience, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.',
    hints: ['Starts with Openness.', 'Includes Conscientiousness.', 'Contains Neuroticism at the end.']
  },

  // --- STANDARD TIER (8-15) ---
  {
    id: 'ch8',
    nodeId: NODE_ALLPORT_TRAITS,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Trait Analysis',
    question: 'A person\'s habitual punctuality, honesty, and warmth in everyday social encounters are best classified under Allport\'s trait hierarchy as:',
    options: ['Cardinal Traits', 'Central Traits', 'Secondary Traits', 'Source Traits'],
    correctIndex: 1,
    explanation: 'Central traits are major characteristics (typically 5 to 10) that describe a person\'s general behavior across many situations.',
    hints: ['Not as dominant as a single life obsession (cardinal).', 'More consistent than minor preferences (secondary).', '5-10 core attributes describing a person.']
  },
  {
    id: 'ch9',
    nodeId: NODE_EYSENCK_DIMENSIONS,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Dimensional Analysis',
    question: 'Hans Eysenck proposed three basic dimensions of personality. An individual who is emotionally unstable, anxious, moody, and quick to react strongly to stress scores high on:',
    options: ['Extraversion', 'Neuroticism', 'Psychoticism', 'Conscientiousness'],
    correctIndex: 1,
    explanation: 'Neuroticism vs Emotional Stability measures emotional reactivity, anxiety, and moodiness under stress.',
    hints: ['Relates to emotional instability.', 'High stress reactivity.', 'Opposite of emotional stability.']
  },
  {
    id: 'ch10',
    nodeId: NODE_DEFENSE_MECHANISMS,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Mechanism Identification',
    question: 'A student who is furious at a reprimand from a teacher goes home and kicks their pet dog. Which defense mechanism is being demonstrated?',
    options: ['Sublimation', 'Displacement', 'Reaction Formation', 'Rationalization'],
    correctIndex: 1,
    explanation: 'Displacement involves redirecting aggressive or unacceptable feelings from a dangerous target to a safer substitute target.',
    hints: ['Shifting feelings to a less threatening target.', 'Directing anger away from the teacher.', 'Displacing anger onto a pet.']
  },
  {
    id: 'ch11',
    nodeId: NODE_DEFENSE_MECHANISMS,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Mechanism Identification',
    question: 'Channeling unacceptable aggressive energy into socially valued achievements like competitive sports or artistic sculpture is known as:',
    options: ['Projection', 'Sublimation', 'Denial', 'Regression'],
    correctIndex: 1,
    explanation: 'Sublimation is a constructive ego defense mechanism where unacceptable instinctual drives are transformed into socially acceptable activities.',
    hints: ['Constructive and socially approved.', 'Transforms raw impulses into art or sports.', 'Considered the healthiest defense mechanism.']
  },
  {
    id: 'ch12',
    nodeId: NODE_HORNEY_THEORY,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Theoretical Analysis',
    question: 'Karen Horney challenged Freud\'s theory by proposing that personality development is driven primarily by child safety needs and coping with:',
    options: ['Penis envy and castration anxiety', 'Basic Anxiety caused by disturbed interpersonal relationships', 'Inferiority complex from physical weakness', 'Collective unconscious archetypes'],
    correctIndex: 1,
    explanation: 'Horney emphasized social relationships and Basic Anxiety arising from feelings of isolation and helplessness in childhood.',
    hints: ['Focuses on interpersonal relationships.', 'Contrast with Freud\'s instinct focus.', 'Rooted in feeling helpless/isolated in childhood.']
  },
  {
    id: 'ch13',
    nodeId: NODE_MASLOW_HIERARCHY,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Hierarchy Application',
    question: 'In Abraham Maslow\'s Hierarchy of Needs, which level must be reasonably satisfied immediately before an individual becomes motivated by Esteem Needs?',
    options: ['Physiological Needs', 'Belongingness and Love Needs', 'Self-Actualization Needs', 'Cognitive Needs'],
    correctIndex: 1,
    explanation: 'Maslow\'s pyramid ascends: Physiological -> Safety -> Belongingness/Love -> Esteem -> Self-Actualization.',
    hints: ['Directly precedes esteem.', 'Reflects social connection and affection.', 'Level 3 in the pyramid.']
  },
  {
    id: 'ch14',
    nodeId: NODE_RORSCHACH_INKBLOT,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Psychometric Analysis',
    question: 'The Rorschach Inkblot Test consists of how many standardized inkblot cards, and how are they colored?',
    options: [
      '5 cards (all monochrome black and white)',
      '10 cards (5 black & white, 2 black & red, 3 pastel colors)',
      '12 cards (all full spectrum primary colors)',
      '20 cards (10 black & white, 10 multicolored)'
    ],
    correctIndex: 1,
    explanation: 'Rorschach features 10 official cards: 5 achromatic (black/white), 2 chromatic black & red, and 3 chromatic pastels.',
    hints: ['Total of 10 cards.', 'Some are pure black/white, some have red, rest have pastels.', '5 B&W, 2 B&R, 3 pastel.']
  },
  {
    id: 'ch15',
    nodeId: NODE_MMPI,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Psychometric Analysis',
    question: 'The Minnesota Multiphasic Personality Inventory (MMPI-2) includes Lie (L), Frequency (F), and Correction (K) scales. What is the main purpose of these scales?',
    options: [
      'To measure IQ and spatial reasoning',
      'To detect response bias, defensiveness, or faking good/bad',
      'To evaluate physical fitness levels',
      'To diagnose sub-clinical somatotypes'
    ],
    correctIndex: 1,
    explanation: 'The validity scales (L, F, K) assess test-taking attitude, detecting deliberate exaggeration (faking bad) or denial (faking good).',
    hints: ['They assess test validity.', 'Detect deliberate faking.', 'Prevent dishonest self-reporting.']
  },

  // --- ADVANCED TIER (16-22) ---
  {
    id: 'ch16',
    nodeId: NODE_CULTURE_AND_SELF,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Cross-Cultural Synthesis',
    question: 'How does the Indian concept of Self fundamentally differ from the traditional Western concept of Self?',
    options: [
      'The Indian Self has rigid boundaries completely isolated from social roles.',
      'The Indian Self is shifting, relational, and interdependent with context and cosmos, whereas Western Self is discrete and autonomous.',
      'The Western Self emphasizes collective family duties over individual rights.',
      'There is no concept of individual self in Western psychology.'
    ],
    correctIndex: 1,
    explanation: 'Indian perspective emphasizes an enmeshed, relational, context-sensitive self (overlapping boundaries), while Western perspective emphasizes an independent, bounded self.',
    hints: ['Focus on boundary fluidity.', 'Relational vs Independent.', 'Individual-group enmeshment in Indian culture.']
  },
  {
    id: 'ch17',
    nodeId: NODE_ADLER_INDIVIDUAL_PSYCHOLOGY,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Theoretical Evaluation',
    question: 'Alfred Adler\'s Individual Psychology asserts that human motivation is primarily driven by:',
    options: ['Unconscious sexual instincts and libido', 'Striving for superiority to overcome feelings of inferiority', 'Need for unconditional positive regard', 'Collective archetypes of the Anima and Animus'],
    correctIndex: 1,
    explanation: 'Adler held that all humans experience innate feelings of inferiority in childhood and strive for perfection and superiority to compensate.',
    hints: ['Compensation for childhood limitations.', 'Inferiority complex.', 'Striving for growth and superiority.']
  },
  {
    id: 'ch18',
    nodeId: NODE_HISTORICAL_TYPOLOGIES,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Typological Mapping',
    question: 'In Indian Ayurveda, personality is analyzed using the three Gunas (Trigunas). Match a person who is calm, selfless, truth-seeking, and morally upright to their dominant Guna:',
    options: ['Rajas Guna', 'Tamas Guna', 'Sattva Guna', 'Vata Dosha'],
    correctIndex: 2,
    explanation: 'Sattva Guna represents purity, truth, harmony, and wisdom. Rajas represents passion/action, Tamas represents lethargy/darkness.',
    hints: ['Purity and truth.', 'Sattva, Rajas, Tamas.', 'Harmonious and ethical quality.']
  },
  {
    id: 'ch19',
    nodeId: NODE_BEHAVIORAL_ANALYSIS,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Method Evaluation',
    question: 'When an evaluator assesses personality by observing a candidate\'s performance under simulated real-world stress (e.g., leaderless group discussion), this is a:',
    options: ['Projective test', 'Situational Stress Test (Behavioral Analysis)', 'Self-report inventory', 'Psychodynamic dream interpretation'],
    correctIndex: 1,
    explanation: 'Situational tests evaluate overt behavioral reactions in realistic, controlled scenarios under stress or task pressure.',
    hints: ['It places candidate in actual simulated scenarios.', 'Evaluates overt behavior directly.', 'Behavioral analysis technique.']
  },
  {
    id: 'ch20',
    nodeId: NODE_EVALUATION_ASSESSMENT,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Psychometric Evaluation',
    question: 'What is the primary psychometric criticism against Projective Techniques when compared to standardized Self-Report inventories?',
    options: [
      'They take less than 1 minute to administer.',
      'They suffer from lower inter-rater reliability, subjective scoring, and vulnerability to examiner bias.',
      'They can only be administered to children under 5 years of age.',
      'They rely entirely on automated computer grading without human involvement.'
    ],
    correctIndex: 1,
    explanation: 'Projective tests lack rigid objective keys, making scoring dependent on clinical intuition, which reduces inter-rater reliability.',
    hints: ['Scoring depends on the clinician.', 'Subjective interpretation.', 'Lower reliability across examiners.']
  },
  {
    id: 'ch21',
    nodeId: NODE_SELF_REGULATION,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Behavioral Self-Control',
    question: 'Which of the following self-control techniques involves explicitly monitoring and keeping a detailed daily record of one\'s own target behavior (e.g., study hours)?',
    options: ['Self-instruction', 'Self-reinforcement', 'Observation of Own Behavior (Self-monitoring)', 'Sublimation'],
    correctIndex: 2,
    explanation: 'Self-monitoring involves tracking and recording one\'s own behavior to gain self-awareness and self-regulate.',
    hints: ['Keeping a log of your own actions.', 'Tracking behavior to change it.', 'Self-monitoring.']
  },
  {
    id: 'ch22',
    nodeId: NODE_FREUD_PSYCHOSEXUAL_STAGES,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Developmental Sequence',
    question: 'In Freud\'s theory of Psychosexual Stages (Oral, Anal, Phallic, Latency, Genital), at what age range (in years) does the Phallic Stage typically occur?',
    correctAnswer: 3,
    explanation: 'The Phallic stage occurs approximately between 3 and 6 years of age (focusing on the Oedipus/Electra complex). Enter 3.',
    hints: ['Occurs in early childhood (toddler to preschool).', 'Starts around age 3.', 'Enter 3.']
  }
];

// ============================================================================
// TOPIC SPECIFIC SVG DIAGRAM COMPONENTS
// ============================================================================

// 1. Freud's Iceberg Diagram (Conscious, Subconscious, Unconscious & Id/Ego/Superego)
const FreudIcebergDiagram: React.FC<{
  idVal: number;
  egoVal: number;
  superegoVal: number;
  activeDefense: string;
}> = ({ idVal, egoVal, superegoVal, activeDefense }) => {
  return (
    <div className="w-full bg-slate-900 rounded-xl p-4 border border-slate-700 shadow-xl flex flex-col items-center">
      <h4 className="text-sm font-bold text-cyan-400 mb-2 uppercase tracking-wider">
        Freud's Mind Iceberg & Structural Dynamic Model
      </h4>
      <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto rounded-lg overflow-hidden bg-slate-950">
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="icebergGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="50%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>

        {/* Sky / Conscious Realm */}
        <rect x="0" y="0" width="500" height="90" fill="url(#skyGrad)" />
        <text x="15" y="25" fill="#38bdf8" fontSize="12" fontWeight="bold">CONSCIOUS MIND (10%)</text>
        <text x="15" y="42" fill="#94a3b8" fontSize="10">Current thoughts, perceptions, immediate awareness</text>

        {/* Water Level Line */}
        <line x1="0" y1="90" x2="500" y2="90" stroke="#06b6d4" strokeWidth="3" strokeDasharray="6 4" />
        <text x="360" y="85" fill="#22d3ee" fontSize="10" fontWeight="bold">Waterline (Awareness Threshold)</text>

        {/* Subconscious / Preconscious Realm */}
        <rect x="0" y="90" width="500" height="60" fill="#0369a1" fillOpacity="0.2" />
        <text x="15" y="110" fill="#7dd3fc" fontSize="11" fontWeight="bold">PRECONSCIOUS / SUBCONSCIOUS</text>
        <text x="15" y="125" fill="#cbd5e1" fontSize="9">Accessible memories, stored knowledge</text>

        {/* Unconscious Realm */}
        <rect x="0" y="150" width="500" height="170" fill="url(#waterGrad)" />
        <text x="15" y="175" fill="#e0f2fe" fontSize="12" fontWeight="bold">UNCONSCIOUS MIND (90%)</text>
        <text x="15" y="192" fill="#93c5fd" fontSize="9">Repressed instincts, primal Id drives, hidden traumas</text>

        {/* Iceberg Polygon */}
        <polygon points="210,30 290,30 350,90 390,170 340,290 160,290 110,180 150,90" fill="url(#icebergGrad)" stroke="#e0f2fe" strokeWidth="2" opacity="0.85" />

        {/* EGO (Conscious Peak & Subconscious) */}
        <g transform={`translate(250, 70) scale(${0.8 + egoVal / 200})`}>
          <circle r="26" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
          <text textAnchor="middle" y="-4" fill="#ffffff" fontSize="11" fontWeight="bold">EGO</text>
          <text textAnchor="middle" y="9" fill="#bae6fd" fontSize="8">Reality</text>
        </g>

        {/* SUPEREGO (Spans Conscious to Unconscious) */}
        <g transform={`translate(190, 130) scale(${0.8 + superegoVal / 200})`}>
          <circle r="28" fill="#7c3aed" stroke="#c084fc" strokeWidth="2" />
          <text textAnchor="middle" y="-4" fill="#ffffff" fontSize="10" fontWeight="bold">SUPEREGO</text>
          <text textAnchor="middle" y="9" fill="#e9d5ff" fontSize="8">Morality</text>
        </g>

        {/* ID (Deep Unconscious) */}
        <g transform={`translate(280, 230) scale(${0.8 + idVal / 200})`}>
          <circle r="34" fill="#dc2626" stroke="#fca5a5" strokeWidth="2" className="animate-pulse" />
          <text textAnchor="middle" y="-4" fill="#ffffff" fontSize="12" fontWeight="bold">ID</text>
          <text textAnchor="middle" y="10" fill="#fecdd3" fontSize="8">Pleasure</text>
        </g>

        {/* Active Defense Mechanism Wave Indicator */}
        {activeDefense && activeDefense !== 'None' && (
          <g transform="translate(250, 100)">
            <rect x="-80" y="-12" width="160" height="24" rx="12" fill="#e11d48" opacity="0.9" />
            <text textAnchor="middle" y="4" fill="#ffffff" fontSize="10" fontWeight="bold">
              Shield: {activeDefense}
            </text>
          </g>
        )}
      </svg>

      <div className="w-full mt-3 flex justify-between text-xs text-slate-300 px-2">
        <span className="text-red-400">Id Impulse: {idVal}%</span>
        <span className="text-cyan-400">Ego Mediator: {egoVal}%</span>
        <span className="text-purple-400">Superego Conscience: {superegoVal}%</span>
      </div>
    </div>
  );
};

// 2. Big Five OCEAN & Eysenck Personality Radar Chart
const EysenckBig5RadarDiagram: React.FC<{
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
  eysenckE: number;
  eysenckN: number;
}> = ({ openness, conscientiousness, extraversion, agreeableness, neuroticism, eysenckE, eysenckN }) => {
  // Convert 5 traits into radar polygon points (Center 150, 130, R=90)
  const cx = 150;
  const cy = 130;
  const maxR = 90;

  const angles = [
    -Math.PI / 2, // O (Top)
    -Math.PI / 2 + (2 * Math.PI) / 5, // C
    -Math.PI / 2 + (4 * Math.PI) / 5, // E
    -Math.PI / 2 + (6 * Math.PI) / 5, // A
    -Math.PI / 2 + (8 * Math.PI) / 5  // N
  ];

  const vals = [openness, conscientiousness, extraversion, agreeableness, neuroticism];
  const points = vals.map((v, i) => {
    const r = (v / 100) * maxR;
    const x = cx + r * Math.cos(angles[i]);
    const y = cy + r * Math.sin(angles[i]);
    return `${x},${y}`;
  }).join(' ');

  // Eysenck Quadrant Mapping
  const eqX = 370 + (eysenckE - 50) * 1.1;
  const eqY = 130 - (eysenckN - 50) * 1.1;

  // Eysenck Temperament Label
  let temperament = 'Balanced';
  if (eysenckE >= 50 && eysenckN >= 50) temperament = 'Choleric (Restless, Aggressive)';
  else if (eysenckE >= 50 && eysenckN < 50) temperament = 'Sanguine (Sociable, Carefree)';
  else if (eysenckE < 50 && eysenckN >= 50) temperament = 'Melancholic (Anxious, Reserved)';
  else temperament = 'Phlegmatic (Calm, Peaceful)';

  return (
    <div className="w-full bg-slate-900 rounded-xl p-4 border border-slate-700 shadow-xl flex flex-col items-center">
      <h4 className="text-sm font-bold text-emerald-400 mb-2 uppercase tracking-wider">
        Big Five (OCEAN) Radar & Eysenck Temperament Quadrant
      </h4>
      <svg viewBox="0 0 500 270" className="w-full max-w-xl h-auto rounded-lg bg-slate-950">
        {/* Radar Web Rings */}
        {[0.3, 0.6, 1.0].map((scale, idx) => (
          <polygon
            key={idx}
            points={angles.map(a => `${cx + maxR * scale * Math.cos(a)},${cy + maxR * scale * Math.sin(a)}`).join(' ')}
            fill="none"
            stroke="#334155"
            strokeDasharray={idx < 2 ? '3 3' : 'none'}
            strokeWidth="1"
          />
        ))}

        {/* Radar Axes */}
        {angles.map((a, i) => (
          <line key={i} x1={cx} y1={cy} x2={cx + maxR * Math.cos(a)} y2={cy + maxR * Math.sin(a)} stroke="#475569" strokeWidth="1" />
        ))}

        {/* Radar Filled Data Shape */}
        <polygon points={points} fill="#10b981" fillOpacity="0.35" stroke="#34d399" strokeWidth="2.5" />

        {/* Radar Labels */}
        <text x={cx} y={cy - maxR - 8} fill="#34d399" fontSize="10" textAnchor="middle" fontWeight="bold">O (Openness)</text>
        <text x={cx + maxR + 10} y={cy - 20} fill="#34d399" fontSize="10" textAnchor="start" fontWeight="bold">C (Conscien.)</text>
        <text x={cx + maxR - 20} y={cy + maxR + 15} fill="#34d399" fontSize="10" textAnchor="middle" fontWeight="bold">E (Extraver.)</text>
        <text x={cx - maxR + 20} y={cy + maxR + 15} fill="#34d399" fontSize="10" textAnchor="middle" fontWeight="bold">A (Agreeable)</text>
        <text x={cx - maxR - 10} y={cy - 20} fill="#34d399" fontSize="10" textAnchor="end" fontWeight="bold">N (Neurotic)</text>

        {/* Eysenck Grid Divider */}
        <line x1="280" y1="20" x2="280" y2="250" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />

        {/* Eysenck Axes */}
        <rect x="300" y="30" width="180" height="200" fill="#0f172a" stroke="#475569" rx="6" />
        <line x1="390" y1="30" x2="390" y2="230" stroke="#64748b" strokeWidth="1.5" />
        <line x1="300" y1="130" x2="480" y2="130" stroke="#64748b" strokeWidth="1.5" />

        {/* Eysenck Axis Titles */}
        <text x="390" y="25" fill="#f43f5e" fontSize="9" textAnchor="middle" fontWeight="bold">High Neuroticism</text>
        <text x="390" y="244" fill="#10b981" fontSize="9" textAnchor="middle" fontWeight="bold">Low Neuroticism (Stable)</text>
        <text x="295" y="133" fill="#60a5fa" fontSize="8" textAnchor="end">Introversion</text>
        <text x="485" y="133" fill="#f59e0b" fontSize="8" textAnchor="start">Extraversion</text>

        {/* Eysenck Active Coordinate Point */}
        <circle cx={eqX} cy={eqY} r="7" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" className="animate-ping" />
        <circle cx={eqX} cy={eqY} r="6" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />

        {/* Temperament Banner */}
        <text x="390" y="215" fill="#fde047" fontSize="10" textAnchor="middle" fontWeight="bold">
          {temperament}
        </text>
      </svg>
    </div>
  );
};

// 3. Maslow's Hierarchy & Rogers' Congruence Pyramid Diagram
const MaslowHierarchyPyramid: React.FC<{
  level: number;
  realSelfVal: number;
  idealSelfVal: number;
}> = ({ level, realSelfVal, idealSelfVal }) => {
  const congruence = Math.max(0, 100 - Math.abs(realSelfVal - idealSelfVal));

  return (
    <div className="w-full bg-slate-900 rounded-xl p-4 border border-slate-700 shadow-xl flex flex-col items-center">
      <h4 className="text-sm font-bold text-amber-400 mb-2 uppercase tracking-wider">
        Maslow's Need Pyramid & Rogers' Self Congruence
      </h4>
      <svg viewBox="0 0 500 260" className="w-full max-w-xl h-auto rounded-lg bg-slate-950">
        {/* Pyramid Layers */}
        {/* Level 5: Self-Actualization */}
        <polygon points="200,30 300,30 280,70 220,70" fill={level >= 5 ? '#f59e0b' : '#334155'} stroke="#cbd5e1" strokeWidth="1" />
        <text x="250" y="52" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">5. Self-Actualization</text>

        {/* Level 4: Esteem Needs */}
        <polygon points="220,72 280,72 260,112 240,112" fill={level >= 4 ? '#ec4899' : '#334155'} stroke="#cbd5e1" strokeWidth="1" />
        <text x="250" y="94" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">4. Esteem Needs</text>

        {/* Level 3: Belongingness & Love */}
        <polygon points="175,114 325,114 305,154 195,154" fill={level >= 3 ? '#8b5cf6' : '#334155'} stroke="#cbd5e1" strokeWidth="1" />
        <text x="250" y="136" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">3. Belongingness & Love</text>

        {/* Level 2: Safety Needs */}
        <polygon points="150,156 350,156 330,196 170,196" fill={level >= 2 ? '#3b82f6' : '#334155'} stroke="#cbd5e1" strokeWidth="1" />
        <text x="250" y="178" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">2. Safety & Security</text>

        {/* Level 1: Physiological Needs */}
        <polygon points="120,198 380,198 360,238 140,238" fill={level >= 1 ? '#10b981' : '#334155'} stroke="#cbd5e1" strokeWidth="1" />
        <text x="250" y="220" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">1. Physiological Needs</text>

        {/* Rogers Real vs Ideal Self Overlap Diagram on Right */}
        <g transform="translate(390, 40)">
          <text x="45" y="10" fill="#fbbf24" fontSize="10" textAnchor="middle" fontWeight="bold">Rogers Self Alignment</text>

          {/* Real Self Circle */}
          <circle cx={45 - (100 - congruence) * 0.2} cy="60" r="32" fill="#3b82f6" fillOpacity="0.5" stroke="#60a5fa" strokeWidth="2" />
          <text x={30 - (100 - congruence) * 0.2} y="64" fill="#ffffff" fontSize="9">Real</text>

          {/* Ideal Self Circle */}
          <circle cx={45 + (100 - congruence) * 0.2} cy="60" r="32" fill="#ec4899" fillOpacity="0.5" stroke="#f472b6" strokeWidth="2" />
          <text x={60 + (100 - congruence) * 0.2} y="64" fill="#ffffff" fontSize="9">Ideal</text>

          <text x="45" y="115" fill="#a7f3d0" fontSize="10" textAnchor="middle" fontWeight="bold">
            Congruence: {congruence}%
          </text>
          <text x="45" y="130" fill="#cbd5e1" fontSize="8" textAnchor="middle">
            {congruence > 75 ? 'Fully Functioning Person' : congruence > 40 ? 'Moderate Anxiety' : 'Incongruent / Neurotic'}
          </text>
        </g>
      </svg>
    </div>
  );
};

// 4. Projective Assessment Inkblot / TAT Visualizer
const ProjectiveAssessmentSimulator: React.FC<{
  testType: 'inkblot' | 'tat';
  cardIndex: number;
  onPerceptSelect: (percept: string) => void;
}> = ({ testType, cardIndex, onPerceptSelect }) => {
  const inkblots = [
    { title: 'Rorschach Card I', svgPath: 'M 100 100 C 120 40 180 40 200 100 C 220 140 180 180 100 160 Z', options: ['Bat / Butterfly', 'Two Dancing Figures', 'Mask / Monster', 'Pelvis Bone'] },
    { title: 'Rorschach Card II', svgPath: 'M 80 80 Q 150 20 200 100 T 260 180 Q 150 200 80 80 Z', options: ['Two Bears High-Fiving', 'Clown Faces', 'Volcanic Explosion', 'Cave Entrance'] },
    { title: 'Rorschach Card III', svgPath: 'M 60 120 C 100 40 200 40 240 120 C 180 160 120 180 60 120 Z', options: ['Two Humans Carrying Water', 'Rib Cage Structure', 'Spiders & Crabs', 'Abstract Energy'] }
  ];

  const currentCard = inkblots[cardIndex % inkblots.length];

  return (
    <div className="w-full bg-slate-900 rounded-xl p-4 border border-slate-700 shadow-xl flex flex-col items-center">
      <h4 className="text-sm font-bold text-violet-400 mb-2 uppercase tracking-wider">
        Projective Assessment Simulator ({testType === 'inkblot' ? 'Rorschach Inkblot' : 'TAT Narrative'})
      </h4>

      <div className="w-full max-w-lg bg-slate-950 rounded-lg p-6 border border-slate-800 flex flex-col items-center">
        <span className="text-xs text-slate-400 font-mono mb-2">{currentCard.title}</span>

        <svg viewBox="0 0 300 200" className="w-64 h-44 bg-slate-900 rounded border border-slate-800 shadow-inner">
          {/* Symmetrical Inkblot Path */}
          <g fill="#1e293b" stroke="#64748b" strokeWidth="2">
            <path d={currentCard.svgPath} transform="translate(0, 0)" />
            <path d={currentCard.svgPath} transform="translate(300, 0) scale(-1, 1)" />
          </g>
          {/* Red Accent Spots for Card II style */}
          {cardIndex === 1 && (
            <>
              <circle cx="150" cy="40" r="12" fill="#dc2626" opacity="0.8" />
              <circle cx="90" cy="170" r="14" fill="#dc2626" opacity="0.8" />
              <circle cx="210" cy="170" r="14" fill="#dc2626" opacity="0.8" />
            </>
          )}
        </svg>

        <p className="text-xs text-slate-300 mt-4 text-center">
          What might this be? Choose the perception that matches your interpretation:
        </p>

        <div className="grid grid-cols-2 gap-2 w-full mt-3">
          {currentCard.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => onPerceptSelect(opt)}
              className="py-2 px-3 bg-slate-800 hover:bg-violet-900 text-violet-200 text-xs rounded border border-violet-800/50 transition-all font-medium text-center"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT CLASS
// ============================================================================

export default function C12_PsySelfPersonalityCBSESim() {
  // --- SRS & BKT STATE MANAGEMENT ---
  const [bktStates, setBktStates] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach(nodeId => {
      initial[nodeId] = createBKTState(nodeId);
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReviewItem>>(() => {
    const initial: Record<string, ReviewItem> = {};
    ALL_NODE_IDS.forEach(nodeId => {
      initial[nodeId] = createReviewItem(nodeId);
    });
    return initial;
  });

  // Navigation & View Tabs
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [activeChallengeIndex, setActiveChallengeIndex] = useState<number>(0);
  const [userScore, setUserScore] = useState<number>(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // Discovery State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Prediction & Observation Answers
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // Challenge Inputs
  const [mcqChoice, setMcqChoice] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // Visual & Feedback Engine State
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Interactive Lab Sliders & Controls
  // Lab 1: Freud Psychodynamic
  const [idVal, setIdVal] = useState<number>(65);
  const [egoVal, setEgoVal] = useState<number>(50);
  const [superegoVal, setSuperegoVal] = useState<number>(60);
  const [activeDefense, setActiveDefense] = useState<string>('Repression');

  // Lab 2: Big 5 & Eysenck Traits
  const [openness, setOpenness] = useState<number>(75);
  const [conscientiousness, setConscientiousness] = useState<number>(80);
  const [extraversion, setExtraversion] = useState<number>(60);
  const [agreeableness, setAgreeableness] = useState<number>(70);
  const [neuroticism, setNeuroticism] = useState<number>(40);
  const [typeStyle, setTypeStyle] = useState<'Type A' | 'Type B' | 'Type C' | 'Type D'>('Type A');

  // Lab 3: Humanistic & Self
  const [realSelfVal, setRealSelfVal] = useState<number>(55);
  const [idealSelfVal, setIdealSelfVal] = useState<number>(85);
  const [maslowLevel, setMaslowLevel] = useState<number>(3);
  const [selfEfficacyVal, setSelfEfficacyVal] = useState<number>(70);

  // Lab 4: Projective Assessment
  const [projectivePercept, setProjectivePercept] = useState<string>('');
  const [projectiveInterpretation, setProjectiveInterpretation] = useState<string>('');

  // Lab 5: Cultural & Behavioral
  const [culturalPerspective, setCulturalPerspective] = useState<'Indian' | 'Western'>('Indian');
  const [selfRegulationTechnique, setSelfRegulationTechnique] = useState<string>('Self-Monitoring');

  // Inactivity Hint Timer (10s)
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      triggerAutoHint();
    }, 10000);
  };

  const triggerAutoHint = () => {
    const hints = CHALLENGES[activeChallengeIndex]?.hints || [
      'Reflect on how internal psychic structures balance conscious and unconscious drives.',
      'Consider the psychometric validity of projective vs self-report measures.'
    ];
    const hintText = hints[Math.floor(Math.random() * hints.length)];
    setCurrentHint(hintText);
    setShowHint(true);
    audioManager.play('hint');
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [activeChallengeIndex, activeTab]);

  // Audio Speech Welcome on Mount
  useEffect(() => {
    speechManager.speak('Welcome to the Self and Personality psychology lab. Explore unconscious drives, personality traits, and clinical assessments.');
  }, []);

  // --- BKT & SRS UPDATE HANDLERS ---
  const handleAnswerSubmission = (nodeId: string, isCorrect: boolean) => {
    // 1. Update BKT
    const currentBKT = bktStates[nodeId] || createBKTState(nodeId);
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktStates(prev => ({ ...prev, [nodeId]: updatedBKT }));

    // 2. Update SRS
    const currentSRS = srsItems[nodeId] || createReviewItem(nodeId);
    const updatedSRS = sm2Update(currentSRS, isCorrect ? 5 : 2);
    setSrsItems(prev => ({ ...prev, [nodeId]: updatedSRS }));

    // 3. Audio & Speech Feedback
    if (isCorrect) {
      audioManager.play('success');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1500);
    } else {
      audioManager.play('error');
    }
  };

  // --- DISCOVERY SUBMIT ---
  const handleDiscoverySubmit = () => {
    if (discoverySelected === null) return;
    setDiscoverySubmitted(true);
    const isCorrect = discoverySelected === DISCOVERY_QUESTION.correctIndex;
    handleAnswerSubmission(NODE_DEFENSE_MECHANISMS, isCorrect);
    if (isCorrect) {
      speechManager.speak('Correct! Defense mechanisms act unconsciously to shield the Ego from anxiety.');
    } else {
      speechManager.speak('Not quite. Defense mechanisms operate at the unconscious level to reduce anxiety.');
    }
  };

  // --- CHALLENGE SUBMIT ---
  const handleChallengeSubmit = () => {
    const currChallenge = CHALLENGES[activeChallengeIndex];
    let isCorrect = false;

    if (currChallenge.type === 'mcq') {
      if (mcqChoice === null) return;
      isCorrect = mcqChoice === currChallenge.correctIndex;
    } else if (currChallenge.type === 'numeric') {
      const val = parseFloat(numericInput);
      isCorrect = val === currChallenge.correctAnswer;
    }

    handleAnswerSubmission(currChallenge.nodeId, isCorrect);

    if (isCorrect) {
      setUserScore(prev => prev + (currChallenge.difficulty === 'advanced' ? 15 : currChallenge.difficulty === 'standard' ? 10 : 5));
      setCompletedChallenges(prev => new Set(prev).add(currChallenge.id));
      setChallengeFeedback({ isCorrect: true, message: 'Excellent analysis! ' + currChallenge.explanation });
      setShowSuccess(true);
      setShowConfetti(true);
      audioManager.play('celebration');
      speechManager.speak('Great job! Challenge completed successfully.');
      setTimeout(() => {
        setShowSuccess(false);
        setShowConfetti(false);
      }, 2500);
    } else {
      setChallengeFeedback({ isCorrect: false, message: 'Incorrect. ' + currChallenge.explanation });
      audioManager.play('drop-wrong');
      speechManager.speak('Review the concept and try again.');
    }
  };

  const handleNextChallenge = () => {
    setMcqChoice(null);
    setNumericInput('');
    setChallengeFeedback(null);
    if (activeChallengeIndex < CHALLENGES.length - 1) {
      setActiveChallengeIndex(prev => prev + 1);
      audioManager.play('whoosh');
    } else {
      // Completed all challenges
      recordGameScore(NODE_CONCEPT_OF_PERSONALITY, userScore);
      audioManager.play('chime');
      speechManager.speak('Congratulations! You have completed all personality and self dynamics challenges!');
      setActiveTab('summary');
    }
  };

  // Handlers for Lab Interactive Actions
  const handlePerceptSelection = (percept: string) => {
    setProjectivePercept(percept);
    audioManager.play('pop');
    let interp = 'Standard perceptual response showing conventional reality testing.';
    if (percept.includes('Monster') || percept.includes('Explosion')) {
      interp = 'High emotional reactivity and potential unconscious anxiety projection.';
    } else if (percept.includes('Dancing') || percept.includes('Humans')) {
      interp = 'Strong interpersonal interest and empathetic social projection.';
    }
    setProjectiveInterpretation(interp);
    speechManager.speak('Percept recorded: ' + percept);
  };

  const currentChallenge = CHALLENGES[activeChallengeIndex];

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center">
      {/* Top Header Banner */}
      <header className="w-full max-w-6xl mb-6 flex flex-col md:flex-row items-center justify-between border-b border-slate-800 pb-4 gap-4">
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-violet-950 text-violet-300 rounded border border-violet-800">
            ISC / CBSE Class 12 Psychology • Chapter 2
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-cyan-400 mt-1">
            Self and Personality Simulator
          </h1>
          <p className="text-xs text-slate-400">
            Interactive Psychodynamic, Trait, Humanistic & Psychometric Assessment Suite
          </p>
        </div>

        {/* Score & Mastery Badges */}
        <div className="flex items-center gap-4">
          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg text-center">
            <span className="text-xs text-slate-400 block">Total XP Score</span>
            <span className="text-xl font-bold text-amber-400">{userScore} pts</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg text-center">
            <span className="text-xs text-slate-400 block">Challenges Done</span>
            <span className="text-xl font-bold text-emerald-400">
              {completedChallenges.size} / {CHALLENGES.length}
            </span>
          </div>
        </div>
      </header>

      {/* Main Tab Navigation */}
      <nav className="w-full max-w-6xl flex bg-slate-900 rounded-xl p-1.5 border border-slate-800 mb-6 shadow-lg">
        <button
          onClick={() => { setActiveTab('discovery'); audioManager.play('tap'); }}
          className={`flex-1 py-2.5 text-xs md:text-sm font-bold rounded-lg transition-all ${
            activeTab === 'discovery' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          1. Discovery & Scenario
        </button>
        <button
          onClick={() => { setActiveTab('lab'); audioManager.play('tap'); }}
          className={`flex-1 py-2.5 text-xs md:text-sm font-bold rounded-lg transition-all ${
            activeTab === 'lab' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          2. Interactive Lab Suite ({EXPLORATION_STEPS.length} Labs)
        </button>
        <button
          onClick={() => { setActiveTab('challenges'); audioManager.play('tap'); }}
          className={`flex-1 py-2.5 text-xs md:text-sm font-bold rounded-lg transition-all ${
            activeTab === 'challenges' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          3. Challenges ({CHALLENGES.length} Progressive)
        </button>
        <button
          onClick={() => { setActiveTab('summary'); audioManager.play('tap'); }}
          className={`flex-1 py-2.5 text-xs md:text-sm font-bold rounded-lg transition-all ${
            activeTab === 'summary' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          4. Synthesis & Extension
        </button>
      </nav>

      {/* ============================================================================ */}
      {/* TAB 1: DISCOVERY & NARRATIVE SCENARIO */}
      {/* ============================================================================ */}
      {activeTab === 'discovery' && (
        <div className="w-full max-w-6xl flex flex-col gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="p-2 bg-cyan-950 text-cyan-400 rounded-lg border border-cyan-800 text-lg">🧠</span>
              <h2 className="text-xl font-bold text-cyan-300">{SCENARIO.title}</h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">{SCENARIO.intro}</p>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400">
              <strong className="text-cyan-400 block mb-1">Clinical Scenario Briefing:</strong>
              {SCENARIO.context}
            </div>
          </div>

          {/* Discovery Question Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-amber-400 mb-2">Discovery Challenge: Unconscious Defense Dynamics</h3>
            <p className="text-sm text-slate-200 mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="flex flex-col gap-3 mb-4">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setDiscoverySelected(idx)}
                  disabled={discoverySubmitted}
                  className={`p-3 rounded-xl text-xs md:text-sm text-left border transition-all ${
                    discoverySelected === idx
                      ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </button>
              ))}
            </div>

            {!discoverySubmitted ? (
              <button
                onClick={handleDiscoverySubmit}
                disabled={discoverySelected === null}
                className="py-2.5 px-6 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow"
              >
                Submit Hypothesis
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                {discoverySelected === DISCOVERY_QUESTION.correctIndex ? (
                  <span className="text-emerald-400 font-bold block mb-1">✓ Correct Insight!</span>
                ) : (
                  <span className="text-red-400 font-bold block mb-1">✗ Incorrect Hypothesis</span>
                )}
                <p className="text-slate-300">{DISCOVERY_QUESTION.hintAfter}</p>
              </div>
            )}
          </div>

          {/* Prediction Questions */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-purple-400 mb-4">Hypothesis & Prediction Lab</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PREDICTION_QUESTIONS.map((pq, qIdx) => (
                <div key={qIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-purple-400 font-semibold mb-1 block">Prediction #{qIdx + 1}</span>
                    <p className="text-xs text-slate-200 font-medium mb-3">{pq.question}</p>
                    <div className="flex flex-col gap-2 mb-3">
                      {pq.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            setPredictionAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
                            handleAnswerSubmission(pq.nodeId, oIdx === pq.correctIndex);
                          }}
                          className={`p-2 rounded text-xs text-left border ${
                            predictionAnswers[qIdx] === oIdx
                              ? oIdx === pq.correctIndex
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                                : 'bg-red-950 border-red-500 text-red-300'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 italic block mt-2">
                    Verification: {pq.verifyInstruction}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================================ */}
      {/* TAB 2: INTERACTIVE LAB SUITE */}
      {/* ============================================================================ */}
      {activeTab === 'lab' && (
        <div className="w-full max-w-6xl flex flex-col gap-6">
          {/* Exploration Steps Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-800">
            {EXPLORATION_STEPS.map((step, sIdx) => (
              <button
                key={sIdx}
                onClick={() => { setCurrentStepIndex(sIdx); audioManager.play('swoop'); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  currentStepIndex === sIdx
                    ? 'bg-cyan-600 text-white shadow'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>

          {/* Active Lab Instruction Header */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-cyan-300">
                {EXPLORATION_STEPS[currentStepIndex].title}
              </h3>
              <p className="text-xs text-slate-400">
                {EXPLORATION_STEPS[currentStepIndex].instruction}
              </p>
            </div>
            <span className="text-[10px] font-mono bg-slate-950 text-slate-400 px-2 py-1 rounded border border-slate-800">
              Node: {EXPLORATION_STEPS[currentStepIndex].nodeId}
            </span>
          </div>

          {/* Interactive Lab Mode Renderers */}
          {currentStepIndex === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FreudIcebergDiagram idVal={idVal} egoVal={egoVal} superegoVal={superegoVal} activeDefense={activeDefense} />
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-cyan-400 mb-4">Psychodynamic Controls</h4>

                  <div className="mb-4">
                    <label className="text-xs text-red-400 font-semibold flex justify-between mb-1">
                      <span>Id Impulse Strength (Pleasure Principle)</span>
                      <span>{idVal}%</span>
                    </label>
                    <input
                      type="range" min="10" max="100" value={idVal}
                      onChange={e => { setIdVal(Number(e.target.value)); audioManager.play('count'); }}
                      className="w-full accent-red-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="text-xs text-cyan-400 font-semibold flex justify-between mb-1">
                      <span>Ego Executive Power (Reality Principle)</span>
                      <span>{egoVal}%</span>
                    </label>
                    <input
                      type="range" min="10" max="100" value={egoVal}
                      onChange={e => { setEgoVal(Number(e.target.value)); audioManager.play('count'); }}
                      className="w-full accent-cyan-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="text-xs text-purple-400 font-semibold flex justify-between mb-1">
                      <span>Superego Conscience (Moral Perfection)</span>
                      <span>{superegoVal}%</span>
                    </label>
                    <input
                      type="range" min="10" max="100" value={superegoVal}
                      onChange={e => { setSuperegoVal(Number(e.target.value)); audioManager.play('count'); }}
                      className="w-full accent-purple-500"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="text-xs text-slate-300 font-semibold block mb-2">Trigger Ego Defense Mechanism:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Repression', 'Projection', 'Displacement', 'Sublimation', 'Rationalization', 'Reaction Formation'].map((def, dIdx) => (
                        <button
                          key={dIdx}
                          onClick={() => { setActiveDefense(def); audioManager.play('pop'); }}
                          className={`py-1.5 text-xs rounded border transition-all ${
                            activeDefense === def
                              ? 'bg-rose-950 border-rose-500 text-rose-200 font-bold'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                          }`}
                        >
                          {def}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-950 rounded border border-slate-800 text-xs text-slate-300">
                  <strong className="text-amber-400 block mb-1">Clinical Insight:</strong>
                  {idVal > egoVal + 20 ? (
                    <span className="text-red-300">High Id dominance creates impulsive behaviors. Ego activates {activeDefense} to ward off anxiety.</span>
                  ) : superegoVal > egoVal + 20 ? (
                    <span className="text-purple-300">High Superego dominance leads to overwhelming moral guilt and perfectionist anxiety.</span>
                  ) : (
                    <span className="text-emerald-300">Balanced Ego strength maintains healthy mental adaptation and realistic coping.</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStepIndex === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EysenckBig5RadarDiagram
                openness={openness}
                conscientiousness={conscientiousness}
                extraversion={extraversion}
                agreeableness={agreeableness}
                neuroticism={neuroticism}
                eysenckE={extraversion}
                eysenckN={neuroticism}
              />
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-emerald-400 mb-3">Big Five (OCEAN) Slider Controls</h4>

                  {[
                    { label: 'Openness to Experience', val: openness, set: setOpenness, color: 'accent-emerald-500' },
                    { label: 'Conscientiousness', val: conscientiousness, set: setConscientiousness, color: 'accent-teal-500' },
                    { label: 'Extraversion', val: extraversion, set: setExtraversion, color: 'accent-amber-500' },
                    { label: 'Agreeableness', val: agreeableness, set: setAgreeableness, color: 'accent-blue-500' },
                    { label: 'Neuroticism', val: neuroticism, set: setNeuroticism, color: 'accent-rose-500' },
                  ].map((trait, idx) => (
                    <div key={idx} className="mb-3">
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>{trait.label}</span>
                        <span className="font-bold">{trait.val}%</span>
                      </div>
                      <input
                        type="range" min="0" max="100" value={trait.val}
                        onChange={e => { trait.set(Number(e.target.value)); audioManager.play('count'); }}
                        className={`w-full ${trait.color}`}
                      />
                    </div>
                  ))}

                  <div className="mt-3">
                    <label className="text-xs text-slate-300 font-semibold block mb-1">Stress Behavior Typology:</label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['Type A', 'Type B', 'Type C', 'Type D'] as const).map(t => (
                        <button
                          key={t}
                          onClick={() => { setTypeStyle(t); audioManager.play('tap'); }}
                          className={`py-1 text-xs rounded border ${
                            typeStyle === t ? 'bg-emerald-900 border-emerald-500 text-emerald-200 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-950 rounded border border-slate-800 text-xs text-slate-300">
                  <strong className="text-emerald-400 block mb-1">Typology Summary:</strong>
                  {typeStyle === 'Type A' && 'High ambition, impatience, competitive drive, hostility risk.'}
                  {typeStyle === 'Type B' && 'Relaxed, patient, easy-going demeanor, lower stress vulnerability.'}
                  {typeStyle === 'Type C' && 'Unassertive, emotional suppression, overly cooperative.'}
                  {typeStyle === 'Type D' && 'Distressed, prone to negative affectivity and social inhibition.'}
                </div>
              </div>
            </div>
          )}

          {currentStepIndex === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MaslowHierarchyPyramid level={maslowLevel} realSelfVal={realSelfVal} idealSelfVal={idealSelfVal} />
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-amber-400 mb-4">Humanistic & Self Dynamics</h4>

                  <div className="mb-4">
                    <label className="text-xs text-blue-400 font-semibold flex justify-between mb-1">
                      <span>Real Self (Current Reality)</span>
                      <span>{realSelfVal}%</span>
                    </label>
                    <input
                      type="range" min="0" max="100" value={realSelfVal}
                      onChange={e => { setRealSelfVal(Number(e.target.value)); audioManager.play('count'); }}
                      className="w-full accent-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="text-xs text-pink-400 font-semibold flex justify-between mb-1">
                      <span>Ideal Self (Aspirational Goal)</span>
                      <span>{idealSelfVal}%</span>
                    </label>
                    <input
                      type="range" min="0" max="100" value={idealSelfVal}
                      onChange={e => { setIdealSelfVal(Number(e.target.value)); audioManager.play('count'); }}
                      className="w-full accent-pink-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="text-xs text-amber-400 font-semibold flex justify-between mb-1">
                      <span>Maslow Hierarchy Level Satisfaction</span>
                      <span>Level {maslowLevel} / 5</span>
                    </label>
                    <input
                      type="range" min="1" max="5" value={maslowLevel}
                      onChange={e => { setMaslowLevel(Number(e.target.value)); audioManager.play('count'); }}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-emerald-400 font-semibold flex justify-between mb-1">
                      <span>Bandura Self-Efficacy Level</span>
                      <span>{selfEfficacyVal}%</span>
                    </label>
                    <input
                      type="range" min="0" max="100" value={selfEfficacyVal}
                      onChange={e => { setSelfEfficacyVal(Number(e.target.value)); audioManager.play('count'); }}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-950 rounded border border-slate-800 text-xs text-slate-300">
                  <strong className="text-amber-300 block mb-1">Self-Actualization Index:</strong>
                  {maslowLevel === 5 && Math.abs(realSelfVal - idealSelfVal) < 20
                    ? 'High Congruence & Fulfillment! Person exhibits peak experiences, autonomy, and psychological growth.'
                    : 'Partial fulfillment. Work on closing the Real-Ideal self gap and satisfying lower order deficiency needs.'}
                </div>
              </div>
            </div>
          )}

          {currentStepIndex === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProjectiveAssessmentSimulator
                testType="inkblot"
                cardIndex={0}
                onPerceptSelect={handlePerceptSelection}
              />
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-violet-400 mb-3">Projective Psychometric Diagnostic Log</h4>

                  <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 mb-4">
                    <span className="text-xs text-slate-400 block mb-1 font-mono">Recorded Subject Response:</span>
                    <p className="text-sm font-bold text-violet-300">
                      {projectivePercept ? `"${projectivePercept}"` : 'No response selected yet.'}
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 mb-4">
                    <span className="text-xs text-slate-400 block mb-1 font-mono">Clinical Interpretation:</span>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {projectiveInterpretation || 'Click an option in the inkblot window to analyze projected themes.'}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950 rounded border border-slate-800 text-xs text-slate-400">
                    <strong className="text-cyan-400 block mb-1">Exner Comprehensive Scoring Indicators:</strong>
                    Location: Whole (W) • Determinants: Form (F), Color (C) • Content: Human (H) / Animal (A).
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStepIndex === 4 && (
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col gap-6">
              <h4 className="text-base font-bold text-cyan-300">Cross-Cultural & Behavioral Self Regulation Lab</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h5 className="text-sm font-bold text-amber-400 mb-2">Cultural Self-Perspective</h5>
                  <div className="flex gap-3 mb-4">
                    <button
                      onClick={() => setCulturalPerspective('Indian')}
                      className={`flex-1 py-2 text-xs font-bold rounded border ${
                        culturalPerspective === 'Indian' ? 'bg-amber-950 border-amber-500 text-amber-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      Indian Relational Self
                    </button>
                    <button
                      onClick={() => setCulturalPerspective('Western')}
                      className={`flex-1 py-2 text-xs font-bold rounded border ${
                        culturalPerspective === 'Western' ? 'bg-blue-950 border-blue-500 text-blue-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      Western Independent Self
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {culturalPerspective === 'Indian'
                      ? 'The Indian perspective sees the self as shifting, relational, and interdependent with family, caste, society, and cosmos (Individual-Group Enmeshment).'
                      : 'The Western perspective views the self as bounded, autonomous, independent, and distinct from social roles and groups.'}
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h5 className="text-sm font-bold text-emerald-400 mb-2">Self-Regulation Technique</h5>
                  <select
                    value={selfRegulationTechnique}
                    onChange={e => setSelfRegulationTechnique(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded p-2 mb-3"
                  >
                    <option value="Self-Monitoring">Self-Monitoring (Daily Tracking)</option>
                    <option value="Self-Instruction">Self-Instruction (Internal Guiding Talk)</option>
                    <option value="Self-Reinforcement">Self-Reinforcement (Self-Rewarding)</option>
                  </select>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Applying <strong>{selfRegulationTechnique}</strong> empowers individuals to direct their own behavior, suppress undesirable impulses, and reach personal goals.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Observation Questions Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl mt-4">
            <h3 className="text-base font-bold text-cyan-400 mb-4">Lab Observation Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {OBSERVATION_QUESTIONS.map((oq, oIdx) => (
                <div key={oIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-cyan-400 font-semibold mb-1 block">Observation #{oIdx + 1}</span>
                    <p className="text-xs text-slate-200 font-medium mb-3">{oq.question}</p>
                    <div className="flex flex-col gap-2 mb-2">
                      {oq.observableOptions.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => {
                            setObservationAnswers(prev => ({ ...prev, [oIdx]: optIdx }));
                            handleAnswerSubmission(oq.nodeId, optIdx === oq.correctIndex);
                          }}
                          className={`p-2 rounded text-xs text-left border ${
                            observationAnswers[oIdx] === optIdx
                              ? optIdx === oq.correctIndex
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                                : 'bg-red-950 border-red-500 text-red-300'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================================ */}
      {/* TAB 3: PROGRESSIVE CHALLENGES (22+) */}
      {/* ============================================================================ */}
      {activeTab === 'challenges' && (
        <div className="w-full max-w-4xl flex flex-col gap-6">
          {/* Challenge Header & Progress Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                  currentChallenge.difficulty === 'advanced'
                    ? 'bg-red-950 text-red-300 border-red-800'
                    : currentChallenge.difficulty === 'standard'
                    ? 'bg-amber-950 text-amber-300 border-amber-800'
                    : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                }`}>
                  {currentChallenge.difficulty} • {currentChallenge.competencyLevel}
                </span>
                <h3 className="text-lg font-bold text-slate-100 mt-2">
                  Challenge {activeChallengeIndex + 1} of {CHALLENGES.length}
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">Node: {currentChallenge.nodeId}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800 mb-6">
              <div
                className="bg-cyan-500 h-full transition-all duration-300"
                style={{ width: `${((activeChallengeIndex + 1) / CHALLENGES.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <p className="text-sm md:text-base text-slate-200 font-medium mb-6 leading-relaxed">
              {currentChallenge.question}
            </p>

            {/* MCQ Input */}
            {currentChallenge.type === 'mcq' && currentChallenge.options && (
              <div className="flex flex-col gap-3 mb-6">
                {currentChallenge.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setMcqChoice(idx); audioManager.play('tap'); }}
                    className={`p-3.5 rounded-xl text-xs md:text-sm text-left border transition-all ${
                      mcqChoice === idx
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-200 font-semibold shadow'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-850'
                    }`}
                  >
                    <span className="font-bold mr-2 text-cyan-400">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Numeric Input */}
            {currentChallenge.type === 'numeric' && (
              <div className="mb-6">
                <input
                  type="number"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter numerical answer..."
                  className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={triggerAutoHint}
                className="py-2 px-4 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold rounded-lg border border-amber-900/50 flex items-center gap-1.5"
              >
                💡 Hint
              </button>

              {!challengeFeedback?.isCorrect ? (
                <button
                  onClick={handleChallengeSubmit}
                  className="py-2.5 px-6 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg shadow-lg"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextChallenge}
                  className="py-2.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-2"
                >
                  Next Challenge →
                </button>
              )}
            </div>

            {/* Feedback Box */}
            {challengeFeedback && (
              <div className={`mt-6 p-4 rounded-xl border text-xs leading-relaxed ${
                challengeFeedback.isCorrect
                  ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200'
                  : 'bg-red-950/60 border-red-800 text-red-200'
              }`}>
                <strong className="block mb-1 text-sm">{challengeFeedback.isCorrect ? '✓ Correct!' : '✗ Try Again'}</strong>
                {challengeFeedback.message}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================================ */}
      {/* TAB 4: REAL WORLD SYNTHESIS & SUMMARY */}
      {/* ============================================================================ */}
      {activeTab === 'summary' && (
        <div className="w-full max-w-6xl flex flex-col gap-6">
          {/* Real World Activity */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-amber-400 mb-2">Real-World Clinical Extension Activity</h3>
            <p className="text-xs text-slate-300 mb-4">{REAL_WORLD_ACTIVITY.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REAL_WORLD_ACTIVITY.steps.map((step, sIdx) => (
                <div key={sIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-950 border border-amber-700 text-amber-300 text-xs font-bold flex items-center justify-center shrink-0">
                    {sIdx + 1}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Misconceptions & Corrections Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-rose-400 mb-4">Common Psychological Misconceptions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISCONCEPTIONS.map(m => (
                <div key={m.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-red-400 block mb-1">Misconception:</span>
                    <p className="text-xs text-slate-300 mb-3 italic">"{m.misconception}"</p>
                    <span className="text-xs font-bold text-emerald-400 block mb-1">Scientific Fact:</span>
                    <p className="text-xs text-slate-200">{m.correction}</p>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono mt-3">Node: {m.nodeId}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Questions Review */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-cyan-400 mb-4">Diagnostic Review Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DIAGNOSTIC_QUESTIONS.map((dq, dIdx) => (
                <div key={dIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p className="text-xs font-semibold text-slate-200 mb-2">{dIdx + 1}. {dq.question}</p>
                  <span className="text-xs font-bold text-emerald-400">
                    Answer: {dq.options[dq.correctIndex]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================================ */}
      {/* UI FEEDBACK OVERLAYS */}
      {/* ============================================================================ */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Completed!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
    </div>
  );
}