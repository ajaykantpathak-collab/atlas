'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 11 PSYCHOLOGY NODE IDENTIFIERS ───
const NODE_C11_PSY_021 = 'c11_psy_021'; // Theories of Motivation
const NODE_C11_PSY_022 = 'c11_psy_022'; // Social Motives
const NODE_C11_PSY_023 = 'c11_psy_023'; // Frustration and Conflict Among Motives
const NODE_C11_PSY_024 = 'c11_psy_024'; // Definition of Learning and Classical Conditioning
const NODE_C11_PSY_025 = 'c11_psy_025'; // Operant Conditioning and Trial and Error Learning
const NODE_C11_PSY_026 = 'c11_psy_026'; // Insight Learning and Observational Learning
const NODE_C11_PSY_027 = 'c11_psy_027'; // Learning Styles
const NODE_C11_PSY_028 = 'c11_psy_028'; // Learning Disabilities
const NODE_C11_PSY_029 = 'c11_psy_029'; // Memory System - Sensory, STM, LTM
const NODE_C11_PSY_030 = 'c11_psy_030'; // Memory Models (Atkinson-Shiffrin & PDP)

const ALL_NODE_IDS = [
  NODE_C11_PSY_021,
  NODE_C11_PSY_022,
  NODE_C11_PSY_023,
  NODE_C11_PSY_024,
  NODE_C11_PSY_025,
  NODE_C11_PSY_026,
  NODE_C11_PSY_027,
  NODE_C11_PSY_028,
  NODE_C11_PSY_029,
  NODE_C11_PSY_030
];

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Mind & Behaviour Cognitive Clinic (NIMHANS Case Laboratory)',
  intro:
    'You are a resident researcher in cognitive psychology and behavioural neuroscience at the National Institute of Mental Health and Neurosciences (NIMHANS), Bengaluru. You have been assigned five complex cases spanning human motivation, habit formation, emotional conflict, neurodiversity, and memory retention.',
  context:
    'Your mission is to manipulate psychological variables — arousal levels, reward schedules, associative conditioning, perceptual cues, and neural memory networks — to uncover why individuals behave, learn, struggle, and remember.'
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question:
    'A Class 11 student in Kota experiences intense anxiety the night before the JEE mock exam. According to the Yerkes-Dodson Law (Optimum Arousal Theory), what happens to her performance if her physiological arousal is pushed to its absolute maximum?',
  options: [
    'Her performance peaks at maximum arousal because adrenaline accelerates neural processing.',
    'Her performance deteriorates severely due to hyper-arousal and cognitive narrowing (inverted-U curve).',
    'Arousal has zero correlation with cognitive execution in academic testing.',
    'Performance improves linearly only if external monetary incentives are introduced.'
  ],
  correctIndex: 1,
  hintAfter:
    "Don't worry if you were uncertain! Drive and arousal do not follow a simple straight line — let's explore the inverted-U curve and the neural machinery of behaviour!"
};

// ─── PREDICTION QUESTIONS (BRILLIANT.ORG PREDICT-THEN-CHECK) ───
export interface PredictionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  verifyInstruction: string;
}

export const PREDICTION_QUESTIONS = [
  {
    question: 'If physiological arousal is increased from 50% to 95% during a complex task (like an exam), what will happen to cognitive performance?',
    options: [
      'It will increase linearly towards 100%',
      'It will drop significantly due to hyper-arousal and cognitive narrowing',
      'It will remain unchanged at peak levels',
      'It will instantly drop to exactly 0%'
    ],
    correctIndex: 1,
    explanation: 'According to the Yerkes-Dodson law, high arousal on complex tasks impairs performance following an inverted-U curve.',
    verifyInstruction: 'Drag the physiological arousal slider to 95% on Complex Task mode and observe the Cognitive Execution Index.'
  },
  {
    question: 'What happens to the Recency Effect in memory recall if a 30-second backward-counting distractor task is inserted before recall?',
    options: [
      'The recency effect is completely abolished because STM items are overwritten',
      'The recency effect is enhanced because counting strengthens attention',
      'The primacy effect disappears instead of recency',
      'Both primacy and recency disappear equally'
    ],
    correctIndex: 0,
    explanation: 'Distractor tasks empty the short-term memory buffer (15-30s duration), extinguishing the recency effect while leaving primacy (in LTM) intact.',
    verifyInstruction: 'In Lab 4, toggle the Distractor Task button to ON and observe how items 9 and 10 drop drastically in recall probability.'
  }
];

// ─── OBSERVATION QUESTIONS (BRILLIANT.ORG 'WHAT DO YOU NOTICE?') ───
export interface ObservationQuestion {
  question: string;
  observableOptions: string[];
  correctIndex: number;
  explanation: string;
}

export const OBSERVATION_QUESTIONS = [
  {
    question: 'In the Yerkes-Dodson simulation, when you toggle from Simple Task to Complex Task, what do you observe about the optimal peak point on the arousal axis?',
    observableOptions: [
      'The peak shifts leftward towards lower arousal levels (~45%) for complex tasks',
      'The peak shifts rightward towards higher arousal levels (~90%) for complex tasks',
      'The peak disappears entirely',
      'The curve becomes completely flat'
    ],
    correctIndex: 0,
    explanation: 'Complex cognitive tasks require lower optimal arousal to avoid cognitive overload, shifting the curve peak to the left compared to simple physical tasks.'
  },
  {
    question: 'When running extinction trials (bell without food) in the Pavlovian chamber, what happens to the conditioned association meter?',
    observableOptions: [
      'The association strength decreases with each unreinforced trial',
      'The association strength increases indefinitely',
      'The association strength stays locked at 100%',
      'The canine immediately stops hearing the bell sound'
    ],
    correctIndex: 0,
    explanation: 'Repeated presentation of the Conditioned Stimulus (CS) without the Unconditioned Stimulus (UCS) leads to gradual extinction and reduction of the conditioned response.'
  }
];

// ─── CHALLENGE INTERFACE ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'match' | 'drag-label' | 'drag-sort' | 'numeric' | 'construct';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options?: string[];
  correctIndex?: number;
  dragItems?: { label: string; targetId: string }[];
  correctMapping?: Record<string, string>;
  sortItems?: string[];
  correctOrder?: number[];
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  availableParts?: string[];
  targetState?: string;
  validationHint?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

// ─── 24 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE 2026 MANDATE) ───
const CHALLENGES: Challenge[] = [
  // ── FOUNDATION TIER (1-8) ──
  {
    id: 'ch_001_maslow_base',
    nodeId: NODE_C11_PSY_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "In Abraham Maslow's five-tier Hierarchy of Human Needs, which category forms the foundational base of the pyramid?",
    options: [
      'Safety and Security Needs (shelter, law, order)',
      'Physiological Needs (food, water, homeostasis, sleep)',
      'Love and Belongingness Needs (kinship, family, friendship)',
      'Self-Actualisation (realising personal peak potential)'
    ],
    correctIndex: 1,
    explanation:
      'Physiological needs (hunger, thirst, sleep, bodily homeostasis) form the fundamental base of Maslow’s hierarchy. Lower-order deficiency needs must be substantially satisfied before higher growth needs emerge.',
    hints: [
      'Think about survival necessities that your biological organs require every single day.',
      'Before a person worries about social status or career, what must their body have?',
      'The base represents basic biological requirements: oxygen, water, nutrition, and sleep.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_002_social_motives',
    nodeId: NODE_C11_PSY_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'David McClelland identified three distinctively human social motives. Which of the following corresponds to the desire to accomplish difficult tasks and meet high standards of excellence?',
    options: [
      'Need for Affiliation (nAff)',
      'Need for Power (nPow)',
      'Need for Achievement (nAch)',
      'Aggression Motive'
    ],
    correctIndex: 2,
    explanation:
      'The Need for Achievement (nAch) is the learned social motive to accomplish difficult tasks, master challenging situations, overcome obstacles, and attain a standard of excellence.',
    hints: [
      'Look at the letter abbreviation: we are talking about accomplishing goals.',
      'This motive is measured through the Thematic Apperception Test (TAT) by looking for striving themes.',
      'It is nAch — the drive to achieve excellence through personal effort.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_003_conditioning_terms',
    nodeId: NODE_C11_PSY_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: "In Ivan Pavlov's classic canine experiment, what role did the sound of the bell play BEFORE any pairing with meat powder occurred?",
    options: [
      'Unconditioned Stimulus (UCS)',
      'Conditioned Response (CR)',
      'Neutral Stimulus (NS)',
      'Unconditioned Response (UCR)'
    ],
    correctIndex: 2,
    explanation:
      'Before associative pairing, the bell elicited only auditory orientation but zero salivary response, making it a Neutral Stimulus (NS). Only after repeated pairing with the meat powder (UCS) does it transform into a Conditioned Stimulus (CS).',
    hints: [
      'Ask yourself: does a normal dog salivate naturally the first time it hears a metallic bell?',
      'It produces an orientation reflex, but no salivation — hence it is neutral with respect to food.',
      'It is called a Neutral Stimulus (NS) prior to acquisition.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_004_skinner_box',
    nodeId: NODE_C11_PSY_025,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following actions correctly exemplifies NEGATIVE REINFORCEMENT in psychological conditioning?',
    options: [
      'Giving a student a gold medal for securing the first rank in psychology.',
      'A driver buckling their car seatbelt to silence an annoying, persistent warning buzzer.',
      'Reprimanding an adolescent in front of the entire class for disruptive talking.',
      'Confiscating a student’s smartphone for one week following an unsubmitted assignment.'
    ],
    correctIndex: 1,
    explanation:
      'Negative reinforcement involves REMOVING an unpleasant/aversive stimulus (the buzzer) immediately after a desired behaviour (buckling seatbelt), thereby INCREASING the likelihood of that behaviour occurring again.',
    hints: [
      'Reinforcement ALWAYS increases behaviour. "Negative" means something is subtracted or taken away.',
      'Look for the scenario where an annoying state is removed to encourage good behaviour.',
      'Fastening the seatbelt removes the unpleasant beep — that is negative reinforcement.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_005_gestalt_chimp',
    nodeId: NODE_C11_PSY_026,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "Which Gestalt psychologist demonstrated 'Insight Learning' using chimpanzees (including Sultan) solving box-stacking and stick-joining problems in Tenerife?",
    options: ['B.F. Skinner', 'Wolfgang Köhler', 'Albert Bandura', 'Edward Thorndike'],
    correctIndex: 1,
    explanation:
      'Wolfgang Köhler demonstrated that learning in chimpanzees occurs through sudden cognitive restructuring of the perceptual field ("aha!" moment) rather than purely mechanical trial-and-error.',
    hints: [
      'He belonged to the German Gestalt psychology school.',
      'He conducted research on the island of Tenerife between 1913 and 1917.',
      'His name is Wolfgang Köhler.'
    ]
  },
  {
    id: 'ch_006_vark_styles',
    nodeId: NODE_C11_PSY_027,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the learner preference: A student understands psychological brain structures best when building a 3D clay model of the cerebral lobes with their hands. Which style does this represent?',
    options: ['Auditory style', 'Visual style', 'Kinesthetic / Tactile style', 'Read-Write exclusive style'],
    correctIndex: 2,
    explanation:
      'Kinesthetic/tactile learners absorb information through physical manipulation, motor coordination, direct bodily engagement, and experiential crafting.',
    hints: [
      'This involves physical touch, manipulation of physical objects, and motor movements.',
      'Think of "learning by doing" (kinesthesis = bodily movement).',
      'It is the Kinesthetic/Tactile learning style.'
    ]
  },
  {
    id: 'ch_007_iconic_duration',
    nodeId: NODE_C11_PSY_029,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the approximate duration (in milliseconds) of the visual sensory trace (Iconic Image) as demonstrated in George Sperling’s partial-report paradigm?',
    correctAnswer: 350,
    tolerance: 150,
    unit: 'ms',
    explanation:
      'Iconic memory holds an exact visual sensory representation for approximately 250 to 500 milliseconds (0.25 to 0.5 seconds) before rapidly decaying unless attended to.',
    hints: [
      'Iconic visual storage lasts less than a single second.',
      'A normal eye-blink or turning sparkler demonstrates this quarter-to-half second lingering trace.',
      'Values between 250 and 500 ms are clinically and experimentally accepted.'
    ]
  },
  {
    id: 'ch_008_memory_stores_drag',
    nodeId: NODE_C11_PSY_030,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each processing gate to its correct structural location in the Atkinson-Shiffrin Multi-Store Memory Pipeline.',
    dragItems: [
      { label: 'Selective Attention', targetId: 'gate_1' },
      { label: 'Elaborative Rehearsal', targetId: 'gate_2' },
      { label: 'Sensory Registers', targetId: 'store_1' },
      { label: 'Short-Term Store (STM)', targetId: 'store_2' }
    ],
    correctMapping: {
      store_1: 'Sensory Registers',
      gate_1: 'Selective Attention',
      store_2: 'Short-Term Store (STM)',
      gate_2: 'Elaborative Rehearsal'
    },
    explanation:
      'In the Atkinson-Shiffrin model, raw input enters Sensory Registers, Selective Attention transfers attended items to STM (working buffer), and Elaborative Rehearsal transfers encoded traces into Long-Term Memory (LTM).',
    hints: [
      'Raw incoming environmental data hits the sensory registers first.',
      'What mental process filters sensory information into conscious short-term awareness?',
      'Attention gates Sensory to STM; Elaborative Rehearsal transfers STM to LTM.'
    ]
  },

  // ── STANDARD TIER (9-16) ──
  {
    id: 'ch_009_vroom_formula',
    nodeId: NODE_C11_PSY_021,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'A Class 12 student in Kolkata desperately desires admission to AIIMS Delhi (Valence = High), and knows admission guarantees an outstanding medical career (Instrumentality = High). However, after repeatedly failing physics mocks, she firmly believes that no amount of study effort will raise her physics score (Expectancy = 0). What does Vroom’s Expectancy Theory predict about her overall motivation?',
    options: [
      'Her motivation remains very high because Valence alone sustains human drive.',
      'Her motivation collapses to zero because Motivation = Expectancy × Instrumentality × Valence (multiplicative).',
      'Her motivation converts automatically into unconscious aggressive drive.',
      'Her motivation doubles to compensate for low expectancy.'
    ],
    correctIndex: 1,
    explanation:
      'Victor Vroom’s cognitive expectancy formula is multiplicative: Motivation = Expectancy (E) × Instrumentality (I) × Valence (V). If any single factor equals zero (E = 0), the resulting motivational force is mathematically zero.',
    hints: [
      'Remember that Vroom’s model is not additive (E + I + V); it is multiplicative (E × I × V).',
      'What happens in arithmetic when any number is multiplied by zero?',
      'Because 0 × High × High = 0, motivation collapses entirely.'
    ]
  },
  {
    id: 'ch_010_conflict_types',
    nodeId: NODE_C11_PSY_023,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'A software engineer in Bengaluru is torn: Job Offer A provides a massive salary and prestige but requires 80-hour workweeks away from family. Job Offer B offers great work-life balance and family proximity but pays very low wages and offers zero career growth. What type of motivational conflict does this exemplify?',
    options: [
      'Approach-Approach Conflict',
      'Avoidance-Avoidance Conflict',
      'Multiple Approach-Avoidance Conflict',
      'Primary Drive Reduction Conflict'
    ],
    correctIndex: 2,
    explanation:
      'Multiple Approach-Avoidance Conflict occurs when a person must choose between two or more options, where EACH individual alternative possesses both positive (attractive/approach) and negative (repelling/avoidance) characteristics.',
    hints: [
      'Does Offer A have both good and bad qualities? Does Offer B also have both good and bad qualities?',
      'When both alternatives are a mixture of (+) and (-), it is not simple approach-approach or avoidance-avoidance.',
      'It is a Multiple Approach-Avoidance conflict, the most psychologically taxing form.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_011_bobo_doll_processes',
    nodeId: NODE_C11_PSY_026,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: "Arrange Albert Bandura's four fundamental processes of Observational (Social) Learning in their correct sequential execution order.",
    sortItems: [
      'Attention (noticing and attending to the model)',
      'Retention (encoding and storing the observed pattern in memory)',
      'Motor Reproduction (physical execution capability)',
      'Motivation / Reinforcement (drive and incentive to perform)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'Bandura established that observational modelling requires: 1) Attention to the model, 2) Retention in cognitive codes, 3) Motor Reproduction of the physical action, and 4) Motivation/Reinforcement to enact it.',
    hints: [
      'You cannot remember something you never paid attention to in the first place.',
      'Motor execution comes after cognitive retention.',
      'The chronological sequence is Attention → Retention → Reproduction → Motivation.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_012_thorndike_laws',
    nodeId: NODE_C11_PSY_025,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      "Edward Thorndike placed hungry cats in puzzle boxes and observed escape latencies over repeated trials. Which law states that 'responses followed by satisfying states of affairs are stamped in, while annoying consequences weaken the S-R bond'?",
    options: ['Law of Exercise', 'Law of Readiness', 'Law of Effect', 'Law of Assimilation'],
    correctIndex: 2,
    explanation:
      'The Law of Effect states that behaviours followed by favourable/satisfying outcomes are strengthened (stamped in), whereas responses followed by discomfort or annoyance are weakened.',
    hints: [
      'Think of the "effect" that the consequence produces on future behaviour.',
      'It is not the law of practice (Exercise) or preparedness (Readiness).',
      'It is Thorndike’s Law of Effect.'
    ]
  },
  {
    id: 'ch_013_learning_disability_types',
    nodeId: NODE_C11_PSY_028,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Rohan, an articulate 9-year-old with a normal IQ (115) and sharp verbal reasoning, struggles severely with spatial alignment of digits, cannot grasp that 8 is greater than 3, and persistently counts on fingers for basic single-digit addition. Which specific learning disability does he manifest?',
    options: ['Dyslexia', 'Dysgraphia', 'Dyscalculia', 'Dyspraxia'],
    correctIndex: 2,
    explanation:
      'Dyscalculia is a neurologically-based specific learning disability affecting number sense, arithmetic symbol processing, magnitude estimation, and mathematical calculation, despite normal intelligence.',
    hints: [
      'The prefix "dys-" means difficulty, and "calculia" relates to calculation/arithmetic.',
      'Notice that his reading and speech are intact, but numerical reasoning is specifically impaired.',
      'The diagnosis is Dyscalculia.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_014_serial_position_distractor',
    nodeId: NODE_C11_PSY_029,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'In a free-recall experiment with 20 Indian city names, inserting a 30-second distractor task (counting backwards by 3s) immediately before recall completely abolishes which component of the serial position curve?',
    options: [
      'The Primacy Effect (early list items)',
      'The Recency Effect (terminal list items)',
      'Both Primacy and Recency Effects equally',
      'Neither; the entire curve remains unaffected'
    ],
    correctIndex: 1,
    explanation:
      'The Recency Effect depends on items still lingering active in Short-Term Memory. The 30-second backward-counting distractor overwrites STM buffer contents, abolishing recency while leaving Primacy (consolidated in LTM) intact.',
    hints: [
      'Which end of the list sits in the fragile 15-30 second short-term buffer?',
      'A cognitive distractor empties the short-term memory buffer immediately.',
      'It wipes out the Recency Effect because terminal items are displaced from STM.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_015_schedules_extinction',
    nodeId: NODE_C11_PSY_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question:
      'Which operant conditioning schedule of reinforcement generates the highest rate of steady responding and is MOST resistant to extinction (the principle behind gambling and social media feeds)?',
    options: [
      'Fixed-Interval Schedule (FI)',
      'Fixed-Ratio Schedule (FR)',
      'Variable-Ratio Schedule (VR)',
      'Continuous Reinforcement Schedule (CRF)'
    ],
    correctIndex: 2,
    explanation:
      'Variable-Ratio (VR) schedules deliver reinforcement after an unpredictable, variable number of correct responses. Because the organism cannot predict which trial yields reward, responding is rapid, steady, and extraordinarily resistant to extinction.',
    hints: [
      'Think of slot machines or digital notification feeds: rewards come unpredictably after a varying number of actions.',
      'It is a ratio schedule (based on number of responses) that varies.',
      'The Variable-Ratio (VR) schedule produces the highest resistance to extinction.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_016_pdp_weights',
    nodeId: NODE_C11_PSY_030,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'How does the Parallel Distributed Processing (PDP / Connectionist) Model fundamentally differ from the Atkinson-Shiffrin Multi-Store Model regarding memory storage?',
    options: [
      'PDP stores memories in a single localized box in the left frontal lobe.',
      'PDP views memory as distributed patterns of activation and synaptic connection weights across interconnected neural nodes, rather than discrete sequential storage boxes.',
      'PDP asserts that humans possess only sensory memory and no long-term storage.',
      'PDP claims memory is exclusively maintained via verbal subvocal rehearsal.'
    ],
    correctIndex: 1,
    explanation:
      'Rumelhart and McClelland’s PDP model rejects linear storage containers. Memory traces are represented as distributed activation patterns across parallel networks where learning adjusts synaptic connection strengths (weights).',
    hints: [
      'Think of how biological neurons in the brain fire in parallel webs rather than filing cabinets.',
      'Look for the option mentioning distributed patterns and connection weights.',
      'PDP models memory as parallel distributed activation across network nodes.'
    ],
    misconceptionIndex: 2
  },

  // ── ADVANCED TIER (17-24) ──
  {
    id: 'ch_017_collectivist_maslow',
    nodeId: NODE_C11_PSY_021,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      "S.K. Mangal and Indian cross-cultural psychologists evaluate Maslow's hierarchy in the context of Indian joint families. What critical structural modification often occurs regarding the hierarchy in collectivist cultures?",
    options: [
      'Physiological needs are completely eliminated from the pyramid.',
      'Love, belongingness, and family duty/social harmony frequently take precedence over individual self-esteem and independent self-actualisation.',
      'Self-actualisation is universally achieved before safety needs are met.',
      'All Indian individuals exclusively pursue power motives rather than belonging.'
    ],
    correctIndex: 1,
    explanation:
      'In collectivist cultural settings such as Indian joint family systems, relational affiliation, filial duty, and social belongingness often supersede individualistic esteem and personal self-actualisation.',
    hints: [
      'Consider how family expectations and kinship duties influence major career and marriage decisions in India.',
      'Western psychology prioritises individual autonomy; collectivist psychology elevates family cohesion.',
      'Belongingness and collective welfare frequently override individualistic self-actualisation.'
    ]
  },
  {
    id: 'ch_018_extinction_vs_forgetting',
    nodeId: NODE_C11_PSY_024,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      "Why is Pavlovian 'Extinction' scientifically distinguished from passive 'Forgetting'? What empirical phenomenon proves that the conditioned association was suppressed rather than erased?",
    options: [
      'Stimulus Generalisation',
      'Spontaneous Recovery (reappearance of CR after a rest interval without new training)',
      'Backward Conditioning',
      'Sensory Adaptation'
    ],
    correctIndex: 1,
    explanation:
      'Spontaneous Recovery — the sudden partial reappearance of the Conditioned Response after a rest period following extinction trials — proves that extinction is an active inhibitory learning process, not passive memory erasure.',
    hints: [
      'What happens when you test the animal again the next morning after extinction has occurred?',
      'The response returns spontaneously without any new food pairing.',
      'This phenomenon is called Spontaneous Recovery.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_019_rpwd_act_concessions',
    nodeId: NODE_C11_PSY_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'Under the Rights of Persons with Disabilities (RPwD) Act 2016 and CISCE examination regulations, which mandatory accommodation is legally granted to a Class 11 student diagnosed with certified Dyslexia?',
    options: [
      'Automatic award of 100% marks in all theoretical papers.',
      'Compensatory extra time of 20 minutes per hour of examination, with option for an amanuensis (scribe/reader).',
      'Complete exemption from attending all school laboratory practicals.',
      'Transfer to an institution for severe intellectual disability.'
    ],
    correctIndex: 1,
    explanation:
      'Under the RPwD Act 2016 and CISCE board bylaws, candidates with certified Specific Learning Disabilities (SLD) are legally entitled to 20 minutes compensatory extra time per hour, scribes/readers, and language exemptions.',
    hints: [
      'Look for the legal provision regarding exam timing accommodations.',
      'Dyslexic students have normal intelligence but decode text slowly.',
      'CISCE grants 20 extra minutes per hour of exam along with scribe provisions.'
    ]
  },
  {
    id: 'ch_020_explicit_implicit_dissociation',
    nodeId: NODE_C11_PSY_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'A patient with bilateral medial temporal lobe damage (similar to famous patient H.M. or encephalitis cases at NIMHANS) cannot form new autobiographical memories (Episodic LTM). Yet, when taught to trace a star in a mirror daily, her motor skill improves dramatically over a week despite zero conscious memory of ever practising. What does this double dissociation establish?',
    options: [
      'Long-term memory is a single, undivided homogeneous store.',
      'Procedural (implicit) motor memory depends on the basal ganglia/cerebellum and is neurologically independent of hippocampal declarative (explicit) memory systems.',
      'Mirror tracing is governed entirely by sensory iconic registers.',
      'Learning is impossible without intact conscious episodic recall.'
    ],
    correctIndex: 1,
    explanation:
      'This dissociation demonstrates that Long-Term Memory is multi-modular: Hippocampus/medial temporal structures govern declarative/explicit (episodic & semantic) memory, while subcortical basal ganglia and cerebellum mediate procedural/implicit motor learning.',
    hints: [
      'Think about skill acquisition (how to ride a cycle/trace a star) versus remembering what you ate yesterday.',
      'Motor skills (procedural) bypass the damaged hippocampus.',
      'It proves procedural memory is neurologically distinct from declarative memory.'
    ]
  },
  {
    id: 'ch_021_dysgraphia_vs_dyspraxia',
    nodeId: NODE_C11_PSY_028,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'A clinical psychology intern must distinguish between Dysgraphia and Dyspraxia. Which of the following statements provides the precise diagnostic differential?',
    options: [
      'Dysgraphia is a difficulty with mental arithmetic, whereas Dyspraxia is reading reversal.',
      'Dysgraphia is a specific language-output disorder affecting handwriting, orthographic coding, and written syntax; Dyspraxia is a broader Developmental Coordination Disorder affecting gross and fine whole-body motor planning.',
      'Both terms are identical synonyms for low general intelligence quotient.',
      'Dyspraxia affects only vision, while Dysgraphia affects only hearing.'
    ],
    correctIndex: 1,
    explanation:
      'Dysgraphia specifically impairs graphic language production (distorted letter formation, irregular spatial spacing, impaired spelling/syntax on paper). Dyspraxia (DCD) is a generalised motor planning and coordination disorder involving gross and fine motor actions like balance, buttoning, and catching.',
    hints: [
      'Dysgraphia relates specifically to writing (graph = writing).',
      'Dyspraxia relates to motor planning (praxis = action/movement of the whole body).',
      'Dysgraphia is a writing/language disorder; Dyspraxia is a generalised motor coordination disorder.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_022_bkt_construct_learning',
    nodeId: NODE_C11_PSY_024,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'Construct the precise classical conditioning sequence for a phobic response: Place the four core elements in chronological acquisition order.',
    availableParts: ['UCS (Painful Shock / Trauma)', 'UCR (Fear & Autonomic Arousal)', 'CS (Neutral Tone paired with UCS)', 'CR (Conditioned Fear to Tone alone)'],
    targetState: 'UCS (Painful Shock / Trauma) UCR (Fear & Autonomic Arousal) CS (Neutral Tone paired with UCS) CR (Conditioned Fear to Tone alone)',
    validationHint: 'Add UCS, then UCR, followed by the CS pairing, culminating in the CR.',
    explanation:
      'The chronological sequence of classical conditioning begins with the Unconditioned Stimulus (UCS) naturally triggering the Unconditioned Response (UCR). Through pairing, the previously neutral stimulus becomes the Conditioned Stimulus (CS) which elicits the Conditioned Response (CR).',
    hints: [
      'Start with the innate biological stimulus that triggers fear naturally without learning.',
      'What response does the UCS produce reflexively? (UCR).',
      'Then the neutral stimulus becomes the CS, which finally produces the learned CR.'
    ]
  },
  {
    id: 'ch_023_frustration_aggression_analysis',
    nodeId: NODE_C11_PSY_023,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      "According to Dollard and Miller's Frustration-Aggression Hypothesis (and modern cognitive reformulations by Berkowitz), when does an obstructed motive lead most potently to aggressive output?",
    options: [
      'Only when the individual has zero physiological hunger.',
      'When the goal blockage is perceived as arbitrary, intentional, and accompanied by aggressive environmental cues (e.g., weapons, shouting).',
      'Whenever any minor delay in homework completion occurs.',
      'Exclusively when the individual possesses an auditory learning style.'
    ],
    correctIndex: 1,
    explanation:
      'Berkowitz’s reformulation demonstrates that frustration produces negative affect and readiness for aggression, which converts into actual violent/aggressive behaviour most strongly when the barrier is seen as deliberate/arbitrary and aggressive environmental cues are present.',
    hints: [
      'Consider the emotional appraisal: does an accidental blockage cause the same anger as an intentional insult?',
      'Aggression spikes when obstacles are perceived as unfair, intentional, and surrounded by aggressive triggers.',
      'Arbitrary/intentional goal thwarting paired with aggressive cues triggers aggressive behaviour.'
    ]
  },
  {
    id: 'ch_024_multimodal_pedagogy_design',
    nodeId: NODE_C11_PSY_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'In alignment with the National Education Policy (NEP) 2020 recommendations for multimodal pedagogy, how should an ISC Psychology educator structure an optimal lesson on the Nervous System to serve Visual, Auditory, and Kinesthetic learners simultaneously?',
    options: [
      'Deliver an unassisted 45-minute monotone lecture without writing on the board.',
      'Provide only a silent reading worksheet without any classroom discussion or models.',
      'Integrate an interactive labelled 3D anatomical diagram (Visual), Socratic verbal explanation & peer debate (Auditory), and hands-on clay model dissection / role-play reflex enactment (Kinesthetic).',
      'Segregate students into permanent, isolated classrooms based on a single survey score.'
    ],
    correctIndex: 2,
    explanation:
      'NEP 2020 and contemporary educational neuroscience recommend multimodal integrated pedagogy: combining visual diagrams/flowcharts, auditory discourse/explanation, and kinesthetic tactile role-play to build robust, multi-sensory neural memory traces.',
    hints: [
      'NEP 2020 advocates experiential, multi-sensory, inclusive classrooms.',
      'Look for the approach that embraces all three modalities (sight, sound, movement) in one cohesive lesson.',
      'An integrated multimodal structure provides diagrams, debate, and hands-on physical modelling.'
    ]
  }
];

// ─── INTERACTIVE EXPLORATION STEPS (BRILLIANT.ORG STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Arousal Engine & Yerkes-Dodson Law',
    instruction: 'Drag the physiological arousal slider from low (lethargy) to high (panic) and observe the student cognitive performance curve.',
    interactionType: 'slider-arousal',
    nodeId: NODE_C11_PSY_021
  },
  {
    title: "Lab 2: Maslow's Motivational Hierarchy Matrix",
    instruction: 'Click each tier of the hierarchy pyramid to inspect its biological foundation, social drive, and Indian collectivist dynamics.',
    interactionType: 'click-pyramid',
    nodeId: NODE_C11_PSY_021
  },
  {
    title: "Lab 3: Pavlovian Conditioning Chamber",
    instruction: 'Pair the bell (CS) with the food stimulus (UCS) across acquisition trials to build the synaptic associative reflex.',
    interactionType: 'conditioning-simulator',
    nodeId: NODE_C11_PSY_024
  },
  {
    title: 'Lab 4: Memory Architecture — The Multi-Store & Serial Position Lab',
    instruction: 'Inspect the structural multi-store blueprint and toggle distractor tasks to see how STM vs LTM shape recall.',
    interactionType: 'memory-curve',
    nodeId: NODE_C11_PSY_029
  },
  {
    title: 'Lab 5: Neurodiversity & Specific Learning Disabilities',
    instruction: 'Examine clinical symptom profiles to map brain network anomalies to Dyslexia, Dyscalculia, Dysgraphia, and Dyspraxia.',
    interactionType: 'sld-matrix',
    nodeId: NODE_C11_PSY_028
  }
];

// ─── REAL WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'NIMHANS Cognitive Wellness & Educational Protocol Design',
  description:
    'Design an evidence-based intervention plan for an Indian school integrating motivation theories, operant token economies, multisensory phonics for dyslexia, and elaborative memory encoding techniques.',
  steps: [
    'Step 1: Identify the motivational barrier (Low Expectancy, Learned Helplessness, or Frustration Conflict).',
    'Step 2: Formulate an operant variable-ratio reinforcement matrix with intrinsic reward fading.',
    'Step 3: Implement Orton-Gillingham multisensory literacy stations (Visual, Auditory, Kinesthetic sand-tracing).',
    'Step 4: Establish spaced retrieval intervals (1, 3, 7, 14 days) and chunking frameworks to maximise LTM consolidation.'
  ]
};

// ─── PROPS INTERFACE ───
interface Props {
  nodeId?: string;
  title?: string;
  definition?: string;
  eli5?: string;
  misconceptions?: { misconception: string; correction: string }[];
  diagnosticQuestions?: { question: string; options: string[]; correctIndex: number }[];
  masteryCriteria?: string;
  onComplete?: (score: number) => void;
}

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_PSY_021,
  title: 'Psychology: Motivation, Learning, Cognition & Memory Systems',
  definition:
    'A comprehensive examination of psychological dynamics: Push-Pull, Optimum Arousal, Expectancy, and Maslow’s Needs Hierarchy; Social Motives and Frustration-Conflict; Classical, Operant, Insight, and Observational Learning; Learning Styles and Specific Learning Disabilities; and Multi-Store vs PDP Memory Systems.',
  eli5:
    'Think of your mind like a high-tech car: Motivation is the fuel and engine drive; Learning is the steering and road skill acquired through practice and observation; and Memory is the onboard GPS and vast library database storing every journey!',
  misconceptions: [
    {
      misconception: 'Negative reinforcement is the same as punishment.',
      correction: 'Reinforcement ALWAYS increases a behaviour by removing an aversive stimulus; punishment DECREASES a behaviour.'
    },
    {
      misconception: 'Learning disabilities indicate low general intelligence.',
      correction: 'By definition, specific learning disabilities occur in individuals with average or above-average IQ, representing specific neural processing gaps.'
    },
    {
      misconception: 'The recency effect in memory is caused by long-term storage.',
      correction: 'Recency reflects items still active in the short-term working buffer; primacy reflects items consolidated in long-term memory.'
    },
    {
      misconception: 'Extinction in classical conditioning completely erases the learned memory trace.',
      correction: 'Extinction actively inhibits the response; spontaneous recovery proves the associative trace was preserved in the brain.'
    },
    {
      misconception: 'Optimum arousal means operating at maximum stress and adrenaline.',
      correction: 'Performance follows an inverted-U curve; excessive arousal leads to anxiety and severe performance decline.'
    }
  ],
  diagnosticQuestions: [
    { question: 'What is the mathematical structure of Vroom’s Expectancy Theory?', options: ['M = E + I + V', 'M = E × I × V', 'M = E / (I + V)', 'M = (E + I) × V'], correctIndex: 1 },
    { question: 'Which schedule of reinforcement produces highest resistance to extinction?', options: ['Continuous', 'Fixed-Interval', 'Variable-Ratio', 'Fixed-Ratio'], correctIndex: 2 },
    { question: 'Who formulated the Law of Effect using puzzle boxes?', options: ['Pavlov', 'Thorndike', 'Skinner', 'Bandura'], correctIndex: 1 },
    { question: 'What is the capacity limit of Short-Term Memory according to George Miller?', options: ['3 ± 1 chunks', '7 ± 2 chunks', '15 ± 2 chunks', 'Unlimited'], correctIndex: 1 },
    { question: 'Which brain region is critical for declarative memory consolidation?', options: ['Cerebellum', 'Hippocampus', 'Occipital Lobe', 'Medulla'], correctIndex: 1 },
    { question: 'Which learning disability affects mathematical and quantitative reasoning?', options: ['Dyslexia', 'Dysgraphia', 'Dyscalculia', 'Dyspraxia'], correctIndex: 2 },
    { question: 'What type of conflict involves two equally repulsive alternatives?', options: ['Approach-Approach', 'Avoidance-Avoidance', 'Multiple Approach-Avoidance', 'Drive Conflict'], correctIndex: 1 },
    { question: 'What is the brief sensory memory for sounds called?', options: ['Iconic Memory', 'Echoic Memory', 'Episodic Memory', 'Semantic Memory'], correctIndex: 1 }
  ],
  masteryCriteria: 'Mastery is achieved when the student demonstrates 80%+ accuracy across multi-modal challenges in motivation, conditioning, neurodiversity, and memory architecture.'
};

// ─── MAIN SIMULATION COMPONENT ───
function C11_PsychologyTheoriesMotivationSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C11_PSY_021,
    title = DEFAULT_PROPS.title || 'Psychology: Motivation, Learning, Cognition & Memory Systems',
    misconceptions = DEFAULT_PROPS.misconceptions,
    onComplete
  } = props;

  const subjectConfig = SUBJECT_CONFIG['psy'] || { name: 'Psychology', emoji: '🧠', color: 'indigo' };

  // ─── STATE VARIABLES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict-Then-Check & Observation Questions State
  const [currentPredictionIdx, setCurrentPredictionIdx] = useState(0);
  const [predictionSelected, setPredictionSelected] = useState<number | null>(null);
  const [predictionSubmitted, setPredictionSubmitted] = useState(false);
  const [currentObservationIdx, setCurrentObservationIdx] = useState(0);
  const [observationSelected, setObservationSelected] = useState<number | null>(null);
  const [observationSubmitted, setObservationSubmitted] = useState(false);

  // Interactive Lab Visual States
  const [arousalLevel, setArousalLevel] = useState(50); // 0 to 100
  const [taskComplexity, setTaskComplexity] = useState<'simple' | 'complex'>('complex');
  const [selectedPyramidTier, setSelectedPyramidTier] = useState<number>(0);
  const [conditioningTrials, setConditioningTrials] = useState(0);
  const [conditionedStrength, setConditionedStrength] = useState(0); // 0 to 100
  const [isBellRinging, setIsBellRinging] = useState(false);
  const [isFoodDelivered, setIsFoodDelivered] = useState(false);
  const [isDogSalivating, setIsDogSalivating] = useState(false);
  const [memoryDistractorOn, setMemoryDistractorOn] = useState(false);
  const [selectedLobe, setSelectedLobe] = useState<'frontal' | 'parietal' | 'temporal' | 'occipital' | 'hippocampus'>('temporal');
  const [selectedSLD, setSelectedSLD] = useState<'dyslexia' | 'dyscalculia' | 'dysgraphia' | 'dyspraxia'>('dyslexia');

  // Expectancy Theory Multi-Representation Variables
  const [expectancyVal, setExpectancyVal] = useState(0.8);
  const [instrumentalityVal, setInstrumentalityVal] = useState(0.7);
  const [valenceVal, setValenceVal] = useState(0.9);

  // Multi-challenge interaction states
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Visual & Feedback state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const brainCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTER CHALLENGES BY ADAPTIVE DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── PERFORMANCE & DERIVED CALCULATIONS ───
  const calculatedPerformance = useMemo(() => {
    const peak = taskComplexity === 'simple' ? 70 : 45;
    const spread = taskComplexity === 'simple' ? 35 : 25;
    const val = 100 - Math.pow((arousalLevel - peak) / spread, 2) * 80;
    return Math.max(5, Math.min(98, Math.round(val)));
  }, [arousalLevel, taskComplexity]);

  const calculatedVroomMotivation = useMemo(() => {
    return Math.round(expectancyVal * instrumentalityVal * valenceVal * 100);
  }, [expectancyVal, instrumentalityVal, valenceVal]);

  // ─── LOAD INITIAL MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE BKT DIFFICULTY UPDATER ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newTier =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';

    setDifficulty(prev => {
      if (prev !== newTier) {
        setCurrentChallenge(0);
        return newTier;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── MEMOISED HANDLERS ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Outstanding insight! The Yerkes-Dodson inverted U governs cognitive performance.');
    } else {
      audioManager.play('error');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
      speechManager.speak(DISCOVERY_QUESTION.hintAfter);
    }
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the NIMHANS Interactive Labs. Manipulate each psychological variable to explore the principles.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter free exploration mode. Test your own hypotheses with no grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Demonstrate your cognitive and behavioural mastery.');
  }, []);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints && activeChallenge.hints[nextLevel - 1]) {
      const hintMsg = activeChallenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintMsg);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, activeChallenge]);

  const handleCompleteSimulation = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have successfully mastered the ISC Class 11 Psychology laboratory simulation.');
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
    setConstructParts([]);
    setWrongShake(false);
    setWrongFlash(false);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleCompleteSimulation();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleCompleteSimulation]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, activeChallenge]
  );

  const handleSortMove = useCallback(
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement(prev => {
        const base = prev.length === (activeChallenge.sortItems?.length || 0) ? [...prev] : (activeChallenge.sortItems?.map((_, i) => i) || []);
        const [item] = base.splice(fromIdx, 1);
        base.splice(toIdx, 0, item);
        return base;
      });
    },
    [activeChallenge]
  );

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
        isCorrect = answer === activeChallenge.correctIndex;
      } else if (activeChallenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
      } else if (activeChallenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
      } else if (activeChallenge.type === 'numeric') {
        const parsed = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(parsed - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
      } else if (activeChallenge.type === 'construct') {
        isCorrect = answer === activeChallenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Excellent psychological reasoning.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srs = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updated = sm2Update(srs, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updated));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors(e => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
          setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us review the step-by-step cognitive explanation.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srs = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
          const updated = sm2Update(srs, 1, 4500);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updated));
          }
        }
      }
    },
    [activeChallenge, hintCount, hitMisconceptions, showNextHint]
  );

  // ─── CLASSICAL CONDITIONING LAB ACTIONS ───
  const triggerBellAction = useCallback(() => {
    setIsBellRinging(true);
    audioManager.play('chime');
    setTimeout(() => setIsBellRinging(false), 1000);

    if (conditionedStrength > 40) {
      setIsDogSalivating(true);
      audioManager.play('sparkle');
      setTimeout(() => setIsDogSalivating(false), 1500);
    }
  }, [conditionedStrength]);

  const triggerPairingTrial = useCallback(() => {
    setIsBellRinging(true);
    audioManager.play('chime');
    setTimeout(() => {
      setIsFoodDelivered(true);
      setIsDogSalivating(true);
      audioManager.play('pop');
      setConditioningTrials(t => t + 1);
      setConditionedStrength(s => Math.min(100, s + 18));
      setTimeout(() => {
        setIsBellRinging(false);
        setIsFoodDelivered(false);
        setIsDogSalivating(false);
      }, 1200);
    }, 600);
  }, []);

  const triggerExtinctionTrial = useCallback(() => {
    setIsBellRinging(true);
    audioManager.play('chime');
    setConditionedStrength(s => Math.max(0, s - 25));
    if (conditionedStrength > 30) {
      setIsDogSalivating(true);
      setTimeout(() => setIsDogSalivating(false), 1000);
    }
    setTimeout(() => setIsBellRinging(false), 1000);
  }, [conditionedStrength]);

  // ─── CANVAS EFFECTS ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      ctx.strokeStyle = 'rgba(79, 70, 229, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 30; x < w; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.strokeStyle = taskComplexity === 'simple' ? '#38bdf8' : '#a855f7';
      ctx.lineWidth = 3;

      const peakX = taskComplexity === 'simple' ? w * 0.7 : w * 0.45;
      const peakY = h * 0.2;

      ctx.moveTo(20, h - 20);
      ctx.quadraticCurveTo(peakX, peakY, w - 20, h - 20);
      ctx.stroke();

      const currentNormX = 20 + (arousalLevel / 100) * (w - 40);
      const currentNormY = h - 20 - (calculatedPerformance / 100) * (h - 45);

      ctx.beginPath();
      ctx.arc(currentNormX, currentNormY, 7 + Math.sin(frame * 0.08) * 2, 0, Math.PI * 2);
      ctx.fillStyle = '#22c55e';
      ctx.shadowColor = '#22c55e';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [arousalLevel, taskComplexity, calculatedPerformance]);

  useEffect(() => {
    const bCanvas = brainCanvasRef.current;
    if (!bCanvas) return;
    const ctx = bCanvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const drawBrain = () => {
      ctx.clearRect(0, 0, bCanvas.width, bCanvas.height);

      ctx.lineWidth = 3;
      ctx.strokeStyle = '#475569';
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.ellipse(120, 90, 85, 65, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle =
        selectedLobe === 'frontal'
          ? 'rgba(59, 130, 246, 0.6)'
          : selectedLobe === 'parietal'
          ? 'rgba(234, 179, 8, 0.6)'
          : selectedLobe === 'occipital'
          ? 'rgba(239, 68, 68, 0.6)'
          : selectedLobe === 'temporal'
          ? 'rgba(34, 197, 94, 0.6)'
          : 'rgba(168, 85, 247, 0.8)';

      ctx.beginPath();
      if (selectedLobe === 'frontal') {
        ctx.arc(75, 75, 28, 0, Math.PI * 2);
      } else if (selectedLobe === 'parietal') {
        ctx.arc(140, 55, 25, 0, Math.PI * 2);
      } else if (selectedLobe === 'occipital') {
        ctx.arc(180, 95, 22, 0, Math.PI * 2);
      } else if (selectedLobe === 'temporal') {
        ctx.arc(120, 110, 28, 0, Math.PI * 2);
      } else {
        ctx.ellipse(120, 95, 20, 10, 0.4, 0, Math.PI * 2);
      }
      ctx.fill();

      animId = requestAnimationFrame(drawBrain);
    };
    drawBrain();
    return () => cancelAnimationFrame(animId);
  }, [selectedLobe]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/80 rounded-2xl border border-slate-800 backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                ISC Class 11 Humanities / Science
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : difficulty === 'standard'
                    ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    : 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                }`}
              >
                {difficulty} Tier
              </motion.span>
            </div>
            <h1 className="text-lg md:text-xl font-extrabold text-white tracking-tight mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map(p => (
            <button
              key={p}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-all ${
                phase === p
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/40 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🔬 Clinical Case Inquiry</span>
            </div>
            <h2 className="text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3.5 bg-indigo-900/20 rounded-xl border border-indigo-700/30 text-xs text-indigo-200">
              💡 <strong>Case Challenge:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 inline-flex items-center justify-center text-xs">?</span>
              {DISCOVERY_QUESTION.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((optionText, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.015, x: 2 }}
                  whileTap={{ scale: 0.985 }}
                  animate={wrongShake && !discoveryCorrect ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`text-left p-4 rounded-xl border text-sm transition-all ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold shadow-lg'
                      : discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-indigo-500/50 hover:bg-slate-900'
                  }`}
                >
                  <span className="inline-block w-6 font-bold text-indigo-400">{String.fromCharCode(65 + idx)}.</span>
                  {optionText}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 mt-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Exact! Cognitive execution drops as panic sets in.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (BRILLIANT.ORG STYLE) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-indigo-400 uppercase font-extrabold tracking-widest">
                Interactive Discovery Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-xl font-black text-white mt-0.5">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === currentSlide ? 'w-8 bg-indigo-500' : 'w-2.5 bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* PREDICT-THEN-CHECK CARD (BRILLIANT PATTERN) */}
          {currentSlide === 0 && (
            <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-700/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🔮</span> Predict First: {PREDICTION_QUESTIONS[currentPredictionIdx].question}
                </span>
                <span className="text-[10px] text-slate-400">Prediction {currentPredictionIdx + 1} of {PREDICTION_QUESTIONS.length}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PREDICTION_QUESTIONS[currentPredictionIdx].options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => {
                      setPredictionSelected(oIdx);
                      setPredictionSubmitted(true);
                      if (oIdx === PREDICTION_QUESTIONS[currentPredictionIdx].correctIndex) {
                        audioManager.play('success');
                      } else {
                        audioManager.play('error');
                      }
                    }}
                    className={`p-2.5 rounded-lg text-xs text-left border transition-all ${
                      predictionSubmitted && oIdx === PREDICTION_QUESTIONS[currentPredictionIdx].correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold'
                        : predictionSubmitted && oIdx === predictionSelected
                        ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-indigo-500'
                    }`}
                  >
                    <span className="font-bold mr-1.5">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                  </button>
                ))}
              </div>
              {predictionSubmitted && (
                <div className="p-2.5 bg-slate-900 rounded-lg text-xs text-slate-300 border border-indigo-800/40 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-indigo-300">🔍 Now Verify:</span>{' '}
                    {PREDICTION_QUESTIONS[currentPredictionIdx].verifyInstruction}
                  </div>
                  {currentPredictionIdx < PREDICTION_QUESTIONS.length - 1 && (
                    <button
                      onClick={() => {
                        setCurrentPredictionIdx(prev => prev + 1);
                        setPredictionSelected(null);
                        setPredictionSubmitted(false);
                      }}
                      className="ml-2 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-bold shrink-0"
                    >
                      Next Prediction →
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="p-4 bg-indigo-950/30 rounded-xl border border-indigo-800/30 text-sm text-indigo-200 flex items-center gap-2">
            <span>👉</span>
            <span>{EXPLORATION_STEPS[currentSlide].instruction}</span>
          </div>

          {/* DYNAMIC LAB VISUALIZATION CONTAINER */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 md:p-6 min-h-[380px]">
            {/* STEP 1: YERKES-DODSON & MULTI-REPRESENTATION MOTIVATION */}
            {currentSlide === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Task Difficulty Mode:</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setTaskComplexity('simple')}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            taskComplexity === 'simple' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          Simple Task (Sprint / Repetition)
                        </button>
                        <button
                          onClick={() => setTaskComplexity('complex')}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            taskComplexity === 'complex' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          Complex Task (ISC Exam / Surgery)
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Physiological Arousal (Adrenaline / RAS Activation):</span>
                        <span className="font-bold text-indigo-400">{arousalLevel}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={arousalLevel}
                        onChange={e => setArousalLevel(Number(e.target.value))}
                        className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                        aria-label="Adjust physiological arousal level"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                        <span>0% (Drowsy / Under-aroused)</span>
                        <span>50% (Optimal Window)</span>
                        <span>100% (Panic / Hyper-arousal)</span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                      <div>
                        <div className="text-xs text-slate-400">Cognitive Execution Index:</div>
                        <div className="text-2xl font-black text-emerald-400">{calculatedPerformance}%</div>
                      </div>
                      <div className="text-right text-xs">
                        <span
                          className={`px-2.5 py-1 rounded-full font-bold uppercase ${
                            calculatedPerformance > 80
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : calculatedPerformance > 50
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-rose-500/20 text-rose-300'
                          }`}
                        >
                          {calculatedPerformance > 80 ? 'Peak Flow' : calculatedPerformance > 50 ? 'Suboptimal' : 'Cognitive Choke'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SVG DIAGRAM 1: YERKES-DODSON INVERTED-U FORMAL DIAGRAM */}
                  <div className="flex flex-col items-center p-3 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="text-xs text-slate-400 mb-2 font-bold flex items-center gap-2">
                      <span>📈 Yerkes-Dodson Law: Inverted-U Vector Model</span>
                    </div>
                    <svg viewBox="0 0 420 220" className="w-full max-w-md h-auto" aria-label="Yerkes-Dodson Law Diagram">
                      <defs>
                        <linearGradient id="ydGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                          <stop offset="50%" stopColor="#10b981" stopOpacity="0.9" />
                          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
                        </linearGradient>
                      </defs>
                      <line x1="40" y1="180" x2="390" y2="180" stroke="#475569" strokeWidth="2" />
                      <line x1="40" y1="180" x2="40" y2="20" stroke="#475569" strokeWidth="2" />
                      <text x="390" y="195" fill="#94a3b8" fontSize="11" textAnchor="end">Arousal →</text>
                      <text x="30" y="25" fill="#94a3b8" fontSize="11" transform="rotate(-90 30 25)" textAnchor="end">Performance ↑</text>
                      
                      <path d="M 50 170 Q 280 40 380 120" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
                      <text x="320" y="70" fill="#38bdf8" fontSize="10">Simple Task Peak</text>

                      <path d="M 50 170 Q 180 35 370 175" fill="none" stroke="url(#ydGrad)" strokeWidth="3.5" />
                      <text x="140" y="25" fill="#10b981" fontSize="11" fontWeight="bold">Complex Task Optimum</text>

                      {(() => {
                        const markerX = 40 + (arousalLevel / 100) * 330;
                        const markerY = 180 - (calculatedPerformance / 100) * 145;
                        return (
                          <g>
                            <circle cx={markerX} cy={markerY} r="8" fill="#22c55e" stroke="#ffffff" strokeWidth="2" />
                            <text x={markerX} y={markerY - 12} fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">
                              {arousalLevel}% ({calculatedPerformance}%)
                            </text>
                          </g>
                        );
                      })()}

                      <rect x="50" y="145" width="75" height="25" rx="4" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" />
                      <text x="87" y="161" fill="#93c5fd" fontSize="9" textAnchor="middle">Under-arousal</text>

                      <rect x="150" y="145" width="80" height="25" rx="4" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" />
                      <text x="190" y="161" fill="#6ee7b7" fontSize="9" textAnchor="middle">Optimum Zone</text>

                      <rect x="270" y="145" width="100" height="25" rx="4" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" />
                      <text x="320" y="161" fill="#fca5a5" fontSize="9" textAnchor="middle">Hyper-arousal (Panic)</text>
                    </svg>
                  </div>
                </div>

                {/* MULTI-REPRESENTATION: VROOM'S EXPECTANCY EQUATION */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>🧮 Multi-Representation: Vroom's Cognitive Expectancy Model ($M = E \times I \times V$)</span>
                    <span className="text-emerald-400 font-mono text-sm font-black">Net Motivation: {calculatedVroomMotivation}%</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-300 font-semibold">1. Expectancy (Effort → Performance):</span>
                        <span className="text-indigo-400 font-mono font-bold">{expectancyVal.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={expectancyVal}
                        onChange={e => setExpectancyVal(parseFloat(e.target.value))}
                        className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded"
                        aria-label="Adjust Expectancy value"
                      />
                      <p className="text-[10px] text-slate-500">"If I study 6 hours, can I master this topic?"</p>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-300 font-semibold">2. Instrumentality (Performance → Reward):</span>
                        <span className="text-sky-400 font-mono font-bold">{instrumentalityVal.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={instrumentalityVal}
                        onChange={e => setInstrumentalityVal(parseFloat(e.target.value))}
                        className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded"
                        aria-label="Adjust Instrumentality value"
                      />
                      <p className="text-[10px] text-slate-500">"If I score high, will I receive the admission?"</p>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-300 font-semibold">3. Valence (Value of Outcome):</span>
                        <span className="text-purple-400 font-mono font-bold">{valenceVal.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={valenceVal}
                        onChange={e => setValenceVal(parseFloat(e.target.value))}
                        className="w-full accent-purple-500 h-1.5 bg-slate-800 rounded"
                        aria-label="Adjust Valence value"
                      />
                      <p className="text-[10px] text-slate-500">"How much do I personally cherish this goal?"</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: MASLOW'S PYRAMID MATRIX */}
            {currentSlide === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="flex flex-col items-center p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400 mb-2 font-bold">Maslow's Five-Tier Motivational Architecture</div>
                  <svg viewBox="0 0 360 260" className="w-full max-w-xs h-auto" aria-label="Maslow's Pyramid Diagram">
                    <polygon
                      points="180,20 140,65 220,65"
                      fill={selectedPyramidTier === 4 ? '#9333ea' : '#581c87'}
                      stroke="#c084fc"
                      strokeWidth="2"
                      className="cursor-pointer transition-all hover:opacity-90"
                      onClick={() => setSelectedPyramidTier(4)}
                    />
                    <text x="180" y="52" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">Self-Actualisation</text>

                    <polygon
                      points="140,68 105,115 255,115 220,68"
                      fill={selectedPyramidTier === 3 ? '#4f46e5' : '#312e81'}
                      stroke="#818cf8"
                      strokeWidth="2"
                      className="cursor-pointer transition-all hover:opacity-90"
                      onClick={() => setSelectedPyramidTier(3)}
                    />
                    <text x="180" y="96" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">Esteem Needs</text>

                    <polygon
                      points="105,118 70,165 290,165 255,118"
                      fill={selectedPyramidTier === 2 ? '#2563eb' : '#1e3a8a'}
                      stroke="#60a5fa"
                      strokeWidth="2"
                      className="cursor-pointer transition-all hover:opacity-90"
                      onClick={() => setSelectedPyramidTier(2)}
                    />
                    <text x="180" y="146" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">Love & Belonging</text>

                    <polygon
                      points="70,168 35,215 325,215 290,168"
                      fill={selectedPyramidTier === 1 ? '#0d9488' : '#134e4a'}
                      stroke="#2dd4bf"
                      strokeWidth="2"
                      className="cursor-pointer transition-all hover:opacity-90"
                      onClick={() => setSelectedPyramidTier(1)}
                    />
                    <text x="180" y="196" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">Safety & Security</text>

                    <polygon
                      points="35,218 0,260 360,260 325,218"
                      fill={selectedPyramidTier === 0 ? '#16a34a' : '#14532d'}
                      stroke="#4ade80"
                      strokeWidth="2"
                      className="cursor-pointer transition-all hover:opacity-90"
                      onClick={() => setSelectedPyramidTier(0)}
                    />
                    <text x="180" y="244" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">Physiological Base (D-Needs)</text>
                  </svg>
                  <span className="text-[11px] text-slate-400 mt-2">Click any pyramid tier above to inspect its psychological profile</span>
                </div>

                <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">
                    Tier Analysis: {['Physiological', 'Safety', 'Belongingness & Love', 'Esteem', 'Self-Actualisation'][selectedPyramidTier]}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedPyramidTier === 0 && 'Base Deficiency Need: Without food, clean water, and physiological homeostasis, all higher motivational striving is suspended. Example: Mid-day Meal scheme in Indian government schools.'}
                    {selectedPyramidTier === 1 && 'Stability & Security: The need for safe housing, predictable law and order, and financial security. Example: Pradhan Mantri Awas Yojana.'}
                    {selectedPyramidTier === 2 && 'S.K. Mangal Collectivist Emphasis: In Indian culture, family approval, joint-family harmony, and community belongingness frequently take precedence over individualistic ego.'}
                    {selectedPyramidTier === 3 && 'Competence & Recognition: Academic awards, IIT/NEET rank honours, and social prestige satisfying ego-esteem.'}
                    {selectedPyramidTier === 4 && 'Apex Growth Motive: Achieving peak personal creative, intellectual, or spiritual purpose (e.g., folk artists in West Bengal or ISRO scientists pursuing national discovery).'}
                  </p>
                  <div className="p-2.5 bg-indigo-950/50 rounded-lg text-[11px] text-indigo-300 border border-indigo-800/40">
                    💡 <strong>Deficiency vs Growth:</strong> Lower 4 tiers are D-needs (Deficiency); Self-Actualisation is a B-need (Being/Growth).
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: PAVLOVIAN CONDITIONING CHAMBER */}
            {currentSlide === 2 && (
              <div className="space-y-6">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400 mb-2 font-bold">Classical Conditioning Associative Neural Circuit</div>
                  <svg viewBox="0 0 540 130" className="w-full h-auto" aria-label="Classical Conditioning Flowchart">
                    <rect x="10" y="10" width="160" height="110" rx="8" fill="#1e293b" stroke="#475569" />
                    <text x="90" y="28" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">1. Pre-Conditioning</text>
                    <text x="20" y="52" fill="#cbd5e1" fontSize="9">UCS (Food) ➔ UCR (Salivation)</text>
                    <text x="20" y="80" fill="#cbd5e1" fontSize="9">NS (Bell) ➔ No Salivation</text>
                    <circle cx="150" cy="50" r="5" fill="#22c55e" />
                    <circle cx="150" cy="78" r="5" fill="#ef4444" />

                    <rect x="190" y="10" width="160" height="110" rx="8" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="270" y="28" fill="#a5b4fc" fontSize="10" textAnchor="middle" fontWeight="bold">2. Acquisition Pairing</text>
                    <text x="200" y="55" fill="#e0e7ff" fontSize="9">NS (Bell) + UCS (Food)</text>
                    <path d="M 270 65 L 270 82" stroke="#818cf8" strokeWidth="2" />
                    <text x="270" y="98" fill="#4ade80" fontSize="10" textAnchor="middle" fontWeight="bold">➔ UCR (Salivation)</text>

                    <rect x="370" y="10" width="160" height="110" rx="8" fill="#064e3b" stroke="#10b981" />
                    <text x="450" y="28" fill="#6ee7b7" fontSize="10" textAnchor="middle" fontWeight="bold">3. Post-Conditioning</text>
                    <text x="380" y="55" fill="#d1fae5" fontSize="9">CS (Bell Alone)</text>
                    <path d="M 450 65 L 450 82" stroke="#34d399" strokeWidth="2" />
                    <text x="450" y="98" fill="#34d399" fontSize="10" textAnchor="middle" fontWeight="bold">➔ CR (Salivation)</text>
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={triggerPairingTrial}
                        className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs shadow-lg flex items-center justify-center gap-1.5"
                      >
                        <span>🔔 + 🥩</span> Pair Bell + Food (Acquisition)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={triggerBellAction}
                        className="py-3 px-4 bg-slate-800 text-slate-200 rounded-xl font-bold text-xs border border-slate-700"
                      >
                        🔔 Test Bell (CS alone)
                      </motion.button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={triggerExtinctionTrial}
                      className="w-full py-2 bg-rose-950/60 border border-rose-700/50 text-rose-300 rounded-xl font-semibold text-xs"
                    >
                      ⚠️ Run Extinction Trial (Bell without Food)
                    </motion.button>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Conditioned Association Strength:</span>
                        <span className="font-bold text-indigo-400">{conditionedStrength}%</span>
                      </div>
                      <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400"
                          animate={{ width: `${conditionedStrength}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-500">
                        <span>Acquisition Trials Run: {conditioningTrials}</span>
                        <span>{conditionedStrength > 50 ? 'Conditioned Response Active' : 'Unconditioned / Extinguished'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center min-h-[180px] relative overflow-hidden">
                    <div className="flex items-center gap-6 text-4xl mb-3">
                      <motion.span
                        animate={isBellRinging ? { rotate: [-20, 20, -20, 20, 0] } : {}}
                        className="inline-block"
                      >
                        🔔
                      </motion.span>
                      <motion.span animate={isFoodDelivered ? { scale: [1, 1.3, 1] } : { opacity: 0.3 }}>🥩</motion.span>
                      <span className="text-5xl">🐕</span>
                    </div>

                    <div className="text-center">
                      {isDogSalivating ? (
                        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-emerald-400 text-xs font-bold">
                          💧 Salivation Evoked! (UCR / CR active)
                        </motion.div>
                      ) : (
                        <div className="text-slate-500 text-xs">No Salivary Reflex Evoked</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: MEMORY ARCHITECTURE & SERIAL POSITION */}
            {currentSlide === 3 && (
              <div className="space-y-6">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400 mb-2 font-bold">Atkinson-Shiffrin Multi-Store Architecture Model</div>
                  <svg viewBox="0 0 540 120" className="w-full h-auto" aria-label="Atkinson-Shiffrin Memory Blueprint">
                    <rect x="10" y="20" width="110" height="70" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                    <text x="65" y="42" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">Sensory Memory</text>
                    <text x="65" y="60" fill="#cbd5e1" fontSize="8" textAnchor="middle">Iconic: 0.5s | Echoic: 3s</text>
                    <text x="65" y="74" fill="#64748b" fontSize="8" textAnchor="middle">High Capacity</text>

                    <line x1="120" y1="55" x2="190" y2="55" stroke="#818cf8" strokeWidth="2" />
                    <text x="155" y="45" fill="#a5b4fc" fontSize="8" textAnchor="middle">Attention</text>

                    <rect x="195" y="20" width="130" height="70" rx="8" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
                    <text x="260" y="42" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">Short-Term Store</text>
                    <text x="260" y="60" fill="#c7d2fe" fontSize="8" textAnchor="middle">Capacity: 7 ± 2 items</text>
                    <text x="260" y="74" fill="#a5b4fc" fontSize="8" textAnchor="middle">Duration: 15–30 sec</text>

                    <path d="M 230 20 C 230 5, 290 5, 290 20" fill="none" stroke="#e0e7ff" strokeWidth="1.5" />
                    <text x="260" y="10" fill="#e0e7ff" fontSize="7" textAnchor="middle">Maintenance Rehearsal</text>

                    <line x1="325" y1="45" x2="395" y2="45" stroke="#34d399" strokeWidth="2" />
                    <text x="360" y="38" fill="#6ee7b7" fontSize="8" textAnchor="middle">Encoding ➔</text>
                    <line x1="395" y1="65" x2="325" y2="65" stroke="#38bdf8" strokeWidth="2" />
                    <text x="360" y="78" fill="#7dd3fc" fontSize="8" textAnchor="middle">◄ Retrieval</text>

                    <rect x="400" y="20" width="130" height="70" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="465" y="42" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">Long-Term Memory</text>
                    <text x="465" y="60" fill="#a7f3d0" fontSize="8" textAnchor="middle">Declarative & Procedural</text>
                    <text x="465" y="74" fill="#6ee7b7" fontSize="8" textAnchor="middle">Unlimited / Permanent</text>
                  </svg>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">Serial Position Curve Simulator:</span>
                    <button
                      onClick={() => {
                        setMemoryDistractorOn(prev => !prev);
                        audioManager.play('pop');
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                        memoryDistractorOn
                          ? 'bg-rose-600 text-white border-rose-500'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {memoryDistractorOn ? 'Distractor Task (30s Backwards Counting): ON' : 'Distractor Task: OFF'}
                    </button>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="h-28 flex items-end justify-between gap-1.5 px-2">
                      {[
                        { pos: 'Item 1', score: 92 },
                        { pos: 'Item 2', score: 85 },
                        { pos: 'Item 3', score: 70 },
                        { pos: 'Item 4', score: 45 },
                        { pos: 'Item 5', score: 35 },
                        { pos: 'Item 6', score: 32 },
                        { pos: 'Item 7', score: 38 },
                        { pos: 'Item 8', score: 50 },
                        { pos: 'Item 9', score: memoryDistractorOn ? 25 : 88 },
                        { pos: 'Item 10', score: memoryDistractorOn ? 18 : 95 }
                      ].map((item, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                          <motion.div
                            initial={false}
                            animate={{ height: `${item.score}%` }}
                            className={`w-full rounded-t-md ${
                              idx < 3
                                ? 'bg-indigo-500'
                                : idx > 7
                                ? memoryDistractorOn
                                  ? 'bg-rose-500/40'
                                  : 'bg-emerald-400'
                                : 'bg-slate-700'
                            }`}
                          />
                          <span className="text-[9px] text-slate-400">{idx + 1}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800 font-mono">
                      <span className="text-indigo-400">◄ Primacy Effect (LTM Rehearsal)</span>
                      <span className="text-slate-500">Middle Slump</span>
                      <span className={memoryDistractorOn ? 'text-rose-400' : 'text-emerald-400'}>
                        {memoryDistractorOn ? 'Recency Destroyed by Distractor ✖' : 'Recency Effect (Active in STM) ►'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: NEURODIVERSITY & SLD */}
            {currentSlide === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    {(['dyslexia', 'dyscalculia', 'dysgraphia', 'dyspraxia'] as const).map(dis => (
                      <button
                        key={dis}
                        onClick={() => {
                          setSelectedSLD(dis);
                          setSelectedLobe(
                            dis === 'dyslexia'
                              ? 'temporal'
                              : dis === 'dyscalculia'
                              ? 'parietal'
                              : dis === 'dysgraphia'
                              ? 'frontal'
                              : 'hippocampus'
                          );
                          audioManager.play('tap');
                        }}
                        className={`p-2.5 rounded-xl text-xs font-bold capitalize border transition-all ${
                          selectedSLD === dis
                            ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg'
                            : 'bg-slate-950 text-slate-300 border-slate-800'
                        }`}
                      >
                        {dis}
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                    <div className="font-bold text-indigo-300 uppercase">
                      Diagnostic Profile: {selectedSLD}
                    </div>
                    <p className="leading-relaxed">
                      {selectedSLD === 'dyslexia' && 'Phonological decoding weakness, letter reversals (b/d, saw/was). Remediated via Orton-Gillingham multisensory phonics (sand-tracing, sound-symbol binding).'}
                      {selectedSLD === 'dyscalculia' && 'Intraparietal sulcus atypicality; impairment in number magnitude, spatial arithmetic alignment, and mathematical calculation.'}
                      {selectedSLD === 'dysgraphia' && 'Exner’s area / motor cortex difficulty; distorted letter sizing, irregular spacing, and written syntax inhibition.'}
                      {selectedSLD === 'dyspraxia' && 'Developmental Coordination Disorder; fine & gross whole-body motor planning weakness (balance, buttoning, catching balls).'}
                    </p>
                    <div className="text-[11px] text-amber-300 pt-1">
                      ⚖️ <strong>Legal Concession (RPwD Act 2016):</strong> CISCE grants 20 extra minutes/hour + scribe privileges.
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-xs text-slate-400 mb-1 font-semibold">Cerebral Localization Map</div>
                  <canvas ref={brainCanvasRef} width={240} height={180} className="bg-slate-950 rounded-2xl border border-slate-800" />
                  <span className="text-[11px] text-slate-400 mt-2 capitalize font-mono">
                    Neural Focus: {selectedLobe} Cortical Network
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* OBSERVATION QUESTION CARD (BRILLIANT 'WHAT DO YOU NOTICE?' PATTERN) */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>👁️</span> What Do You Notice? {OBSERVATION_QUESTIONS[currentObservationIdx].question}
              </span>
              <span className="text-[10px] text-slate-400">Observation {currentObservationIdx + 1} of {OBSERVATION_QUESTIONS.length}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {OBSERVATION_QUESTIONS[currentObservationIdx].observableOptions.map((opt, optIdx) => (
                <button
                  key={optIdx}
                  onClick={() => {
                    setObservationSelected(optIdx);
                    setObservationSubmitted(true);
                    if (optIdx === OBSERVATION_QUESTIONS[currentObservationIdx].correctIndex) {
                      audioManager.play('success');
                    } else {
                      audioManager.play('error');
                    }
                  }}
                  className={`p-2.5 rounded-lg text-xs text-left border transition-all ${
                    observationSubmitted && optIdx === OBSERVATION_QUESTIONS[currentObservationIdx].correctIndex
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold'
                      : observationSubmitted && optIdx === observationSelected
                      ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-emerald-500/50'
                  }`}
                >
                  <span className="font-bold mr-1.5">{String.fromCharCode(65 + optIdx)}.</span> {opt}
                </button>
              ))}
            </div>
            {observationSubmitted && (
              <div className="p-2.5 bg-slate-950 rounded-lg text-xs text-emerald-300 border border-emerald-800/40 flex items-center justify-between">
                <div>
                  <span className="font-bold">Insight:</span> {OBSERVATION_QUESTIONS[currentObservationIdx].explanation}
                </div>
                {currentObservationIdx < OBSERVATION_QUESTIONS.length - 1 && (
                  <button
                    onClick={() => {
                      setCurrentObservationIdx(prev => prev + 1);
                      setObservationSelected(null);
                      setObservationSubmitted(false);
                    }}
                    className="ml-2 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold shrink-0"
                  >
                    Next Observation →
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Slide Navigation Buttons */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('pop');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-mono">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-black text-white">NIMHANS Cognitive Sandbox (Ungraded Laboratory)</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Freely tweak arousal, trigger Pavlovian pairings, and manipulate memory distractors with zero penalties.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30"
              >
                Ready for Graded Challenges! →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-indigo-400">Arousal Engine Sandbox</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={arousalLevel}
                  onChange={e => setArousalLevel(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <div className="text-xs text-slate-300">
                  Arousal: {arousalLevel}% | Performance: <span className="font-bold text-emerald-400">{calculatedPerformance}%</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-indigo-400">Canine Reflex Strength</span>
                <div className="flex gap-2">
                  <button onClick={triggerPairingTrial} className="px-3 py-1.5 bg-indigo-600 rounded-lg text-xs font-bold text-white">
                    + Reinforce
                  </button>
                  <button onClick={triggerExtinctionTrial} className="px-3 py-1.5 bg-rose-900 rounded-lg text-xs font-bold text-white">
                    - Extinguish
                  </button>
                </div>
                <div className="text-xs text-slate-300">Strength: {conditionedStrength}%</div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-indigo-400">Memory Curve Distractor</span>
                <button
                  onClick={() => setMemoryDistractorOn(prev => !prev)}
                  className="w-full py-2 bg-slate-800 rounded-lg text-xs font-bold text-slate-200 border border-slate-700"
                >
                  Distractor: {memoryDistractorOn ? 'ACTIVE' : 'OFF'}
                </button>
                <div className="text-[11px] text-slate-400">
                  {memoryDistractorOn ? 'Recency buffer erased from STM' : 'Recency intact in STM'}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE MODE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                Competency: <span className="text-white">{activeChallenge.competencyLevel}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Errors:</span>
              <span className="text-xs font-bold text-rose-400 font-mono">{errors}</span>
            </div>
          </div>

          <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          <motion.div
            key={activeChallenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/40 border-rose-500' : 'border-slate-800'
            }`}
          >
            <h3 className="text-base md:text-lg font-bold text-white leading-snug">{activeChallenge.question}</h3>

            {(activeChallenge.type === 'classify' ||
              activeChallenge.type === 'distinguish' ||
              activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="grid grid-cols-1 gap-2.5 mt-5">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between ${
                        showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold shadow-lg'
                          : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-indigo-500/50 hover:bg-slate-900'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 inline-flex items-center justify-center font-mono text-xs font-bold text-indigo-400">
                          {String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                      </span>
                      {showExplanation && i === activeChallenge.correctIndex && <span className="text-emerald-400 font-bold">✓</span>}
                    </motion.button>
                  ))}
                </div>
              )}

            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="mt-5 space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700/80 hover:bg-indigo-600 rounded-lg text-white text-xs font-bold cursor-grab active:cursor-grabbing border border-indigo-500/40 shadow"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {['store_1', 'gate_1', 'store_2', 'gate_2'].map(targetKey => (
                    <div
                      key={targetKey}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetKey)}
                      className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-700 min-h-[70px] flex flex-col justify-center items-center text-center"
                    >
                      <span className="text-[10px] text-slate-500 uppercase font-mono mb-1">
                        Target Slot: {targetKey.replace('_', ' ')}
                      </span>
                      <span className="text-xs font-bold text-indigo-300">
                        {droppedLabels[targetKey] || 'Drop Label Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Architecture Slots
                </motion.button>
              </div>
            )}

            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="mt-5 space-y-3">
                {(sortArrangement.length === activeChallenge.sortItems.length
                  ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                  : activeChallenge.sortItems
                ).map((item, dIdx) => (
                  <motion.div
                    key={dIdx}
                    draggable
                    onDragStart={() => setDraggedItem(String(dIdx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, dIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 cursor-grab flex items-center justify-between"
                  >
                    <span>
                      <strong className="text-indigo-400 font-mono mr-2">{dIdx + 1}.</strong>
                      {item}
                    </span>
                    <span className="text-slate-500 text-xs">↕ drag</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  onClick={() => {
                    const ans =
                      sortArrangement.length > 0
                        ? sortArrangement
                        : activeChallenge.sortItems?.map((_, i) => i) || [];
                    handleAnswer(ans);
                  }}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Submit Process Sequence
                </motion.button>
              </div>
            )}

            {activeChallenge.type === 'numeric' && (
              <div className="mt-5 flex items-center gap-3">
                <input
                  type="number"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter numerical value"
                  className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                />
                <span className="text-xs text-slate-400 font-mono">{activeChallenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(numericInput)}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs"
                >
                  Check Value
                </motion.button>
              </div>
            )}

            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="mt-5 space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 rounded-lg text-xs font-semibold border border-indigo-700/40"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[90px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, idx) => (
                    <div key={idx} className="px-3 py-1 bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow">
                      <span>{p}</span>
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-300 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click blocks above to construct sequence...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Constructed Sequence
                </motion.button>
              </div>
            )}

            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/30 border border-amber-700/40 rounded-xl space-y-3">
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>💡 Step-by-Step Psychological Explanation:</span>
                </div>
                {activeChallenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-amber-100 leading-relaxed">
                      <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-amber-700/60 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold"
                    >
                      Show next step →
                    </motion.button>
                  ) : (
                    <div />
                  )}

                  {revealedSteps >= activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Clinical Summary →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & CAPSTONE PROFILE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-3xl border border-indigo-700/40 text-center space-y-3">
            <span className="text-4xl">🎓</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Clinical Assessment Complete!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have completed the ISC Class 11 Psychology interactive simulation covering Motivation, Social Motives, Frustration-Conflict, Conditioning, Learning Styles, Neurodiversity, and Multi-Store/PDP Memory Models.
            </p>
            <div className="flex justify-center gap-6 pt-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 w-36">
                <div className="text-xs text-slate-400 font-mono">Final Score</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">{Math.max(0, 100 - errors * 4)}%</div>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 w-36">
                <div className="text-xs text-slate-400 font-mono">BKT Mastery</div>
                <div className="text-2xl font-black text-indigo-400 mt-1 capitalize">{masteryLevel}</div>
              </div>
            </div>
          </div>

          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 border border-rose-800/40 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                Personalised Misconception Profile & Gap Analysis
              </h3>
              <p className="text-xs text-slate-400">Review the specific theoretical pitfalls identified during your challenge run:</p>
              <div className="space-y-2 pt-1">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <div className="text-rose-300 font-semibold">❌ Pitfall: {m.misconception}</div>
                      <div className="text-emerald-300 font-medium">✓ Scientific Correction: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-indigo-300">Spaced Repetition Review (SM-2 Interval)</h4>
              <p className="text-xs text-slate-400 mt-1">
                Based on your error rate ({errors} errors), your next consolidation session is due in{' '}
                <strong className="text-amber-300">{errors === 0 ? '7 days' : errors <= 2 ? '3 days' : '1 day'}</strong>.
              </p>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          <div className="p-6 bg-gradient-to-br from-indigo-950/40 to-slate-900 rounded-2xl border border-indigo-800/30 space-y-3">
            <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <span className="text-indigo-400 font-bold block mb-0.5">{st.split(':')[0]}</span>
                  {st.split(':')[1]}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PLATFORM OVERLAYS & AUDIO FEEDBACK ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Clinical Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_PsychologyTheoriesMotivationSim;