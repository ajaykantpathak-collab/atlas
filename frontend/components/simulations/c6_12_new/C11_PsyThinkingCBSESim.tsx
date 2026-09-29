'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// TYPES & INTERFACES
// ==========================================
export interface Challenge {
  id: string;
  nodeId: string;
  type: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string | number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

export interface Misconception {
  id: string;
  title: string;
  misconception: string;
  correction: string;
  explanation: string;
  nodeId: string;
}

export interface DiagnosticQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  nodeId: string;
  explanation: string;
}

export interface ExplorationStep {
  title: string;
  instruction: string;
  interactionType: string;
  nodeId: string;
}

export interface PredictionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  verifyInstruction: string;
  nodeId: string;
}

export interface ObservationQuestion {
  question: string;
  observableOptions: string[];
  correctIndex: number;
  nodeId: string;
}

export interface RealWorldActivity {
  title: string;
  description: string;
  steps: string[];
}

export interface SimProps {
  onComplete?: (score: number) => void;
  initialNodeId?: string;
}

// ==========================================
// ALL NODE IDS
// ==========================================
const ALL_NODE_IDS = [
  'c11_psy_cbse_154', // Nature and Characteristics of Thinking
  'c11_psy_cbse_155', // Mental Images as Building Blocks of Thought
  'c11_psy_cbse_156', // Concepts and Concept Formation
  'c11_psy_cbse_157', // Culture and Thinking Styles
  'c11_psy_cbse_158', // Problem Solving: Nature and Structure
  'c11_psy_cbse_159', // Mental Set as an Obstacle to Problem Solving
  'c11_psy_cbse_160', // Functional Fixedness as an Obstacle to Problem Solving
  'c11_psy_cbse_161', // Lack of Motivation as an Obstacle to Problem Solving
  'c11_psy_cbse_162', // Deductive Reasoning
  'c11_psy_cbse_163', // Inductive Reasoning
  'c11_psy_cbse_164', // Judgment and Decision-Making
  'c11_psy_cbse_165', // Nature of Creative Thinking
  'c11_psy_cbse_166', // Convergent Thinking
  'c11_psy_cbse_167', // Divergent Thinking and its Components
  'c11_psy_cbse_168', // Lateral Thinking
  'c11_psy_cbse_169', // Stages of the Creative Process
  'c11_psy_cbse_170', // Strategies for Enhancing Creative Thinking
  'c11_psy_cbse_171', // Language-Thought Relationship: Overview
  'c11_psy_cbse_172', // Linguistic Relativity Hypothesis
  'c11_psy_cbse_173', // Piaget's View: Thought Determines Language
  'c11_psy_cbse_174', // Vygotsky's View: Thought and Language as Separate Origins
  'c11_psy_cbse_175', // Nature and Stages of Language Development
  'c11_psy_cbse_176', // Skinner's Behaviourist Theory of Language Acquisition
  'c11_psy_cbse_177', // Chomsky's Nativist Theory of Language Acquisition
  'c11_psy_cbse_178', // Bilingualism and Multilingualism
  'c11_psy_cbse_179', // Pragmatics and Language Use
] as const;

// Node Knowledge Dictionary
const NODE_KNOWLEDGE: Record<string, { title: string; summary: string; eli5: string }> = {
  c11_psy_cbse_154: {
    title: 'Nature & Characteristics of Thinking',
    summary: 'Thinking is a cognitive process that involves manipulation and transformation of information in memory.',
    eli5: 'Thinking is like your mind playing with mental building blocks—combining ideas, memories, and images to make sense of things.'
  },
  c11_psy_cbse_155: {
    title: 'Mental Images as Building Blocks',
    summary: 'Mental imagery involves mental representation of objects or events not physically present.',
    eli5: 'It is like playing a movie or picturing a favorite toy inside your head when your eyes are closed.'
  },
  c11_psy_cbse_156: {
    title: 'Concepts and Concept Formation',
    summary: 'Concepts are mental categories used to group objects, events, or characteristics based on common properties.',
    eli5: 'Concepts are mental folders. When you see a golden retriever, you put it in your "Dog" folder.'
  },
  c11_psy_cbse_157: {
    title: 'Culture and Thinking Styles',
    summary: 'Culture shapes cognitive styles: holistic (Eastern) vs analytic (Western) processing patterns.',
    eli5: 'Depending on where you grow up, your brain might pay more attention to the whole picture or just the main object.'
  },
  c11_psy_cbse_158: {
    title: 'Problem Solving Structure',
    summary: 'Problem solving involves an initial state, a goal state, and specific mental operations (heuristics vs algorithms).',
    eli5: 'Solving a problem is like taking a journey from a starting point (problem) to a destination (solution).'
  },
  c11_psy_cbse_159: {
    title: 'Mental Set Obstacle',
    summary: 'Mental set is the tendency to respond to a new problem in the same way that worked for previous problems.',
    eli5: 'Getting stuck using an old key on a lock that needs a different key because it worked yesterday.'
  },
  c11_psy_cbse_160: {
    title: 'Functional Fixedness',
    summary: 'Inability to perceive an object as having a function other than its usual or intended use.',
    eli5: 'Thinking a box of tacks can ONLY hold tacks, instead of using the box as a shelf.'
  },
  c11_psy_cbse_161: {
    title: 'Motivation in Problem Solving',
    summary: 'Lack of intrinsic motivation, fear of failure, or high anxiety can block persistent problem-solving attempts.',
    eli5: 'If you feel scared of making mistakes or unmotivated, your brain gives up before finding a solution.'
  },
  c11_psy_cbse_162: {
    title: 'Deductive Reasoning',
    summary: 'Reasoning from general principles to specific cases (guarantees truth if premises are true).',
    eli5: 'All birds lay eggs. A penguin is a bird. Therefore, a penguin lays eggs!'
  },
  c11_psy_cbse_163: {
    title: 'Inductive Reasoning',
    summary: 'Reasoning from specific observations to general conclusions (probability-based).',
    eli5: 'Every crow seen so far is black, so you guess all crows in the world must be black.'
  },
  c11_psy_cbse_164: {
    title: 'Judgment and Decision-Making',
    summary: 'Forming opinions and choosing between options under uncertainty using heuristics (availability, representativeness).',
    eli5: 'Making a choice based on quick mental shortcuts or feelings, like choosing a path that looks familiar.'
  },
  c11_psy_cbse_165: {
    title: 'Nature of Creative Thinking',
    summary: 'Creative thinking produces novel, original, and socially valuable solutions or ideas.',
    eli5: 'Coming up with ideas that nobody else thought of, but that actually solve a real problem!'
  },
  c11_psy_cbse_166: {
    title: 'Convergent Thinking',
    summary: 'Thinking aimed at finding the single best or correct solution to a problem.',
    eli5: 'Finding the exact answer to a math problem like 5 + 7 = 12.'
  },
  c11_psy_cbse_167: {
    title: 'Divergent Thinking & Components',
    summary: 'Generating many unique ideas; measured by Fluency, Flexibility, Originality, and Elaboration.',
    eli5: 'Listing 50 different weird uses for a plastic bottle!'
  },
  c11_psy_cbse_168: {
    title: 'Lateral Thinking',
    summary: 'Edward de Bono’s concept of solving problems through an indirect and creative approach.',
    eli5: 'Stepping sideways out of traditional logic to see the problem from a completely wild angle.'
  },
  c11_psy_cbse_169: {
    title: 'Stages of Creative Process',
    summary: 'Wallas’ 4 stages: Preparation, Incubation, Illumination (Aha!), and Verification.',
    eli5: 'Study hard -> rest and let your mind wander -> sudden lightbulb moment -> test if the idea works!'
  },
  c11_psy_cbse_170: {
    title: 'Enhancing Creative Thinking',
    summary: 'Techniques including Brainstorming, Synectics, Osborn-Parnes CPS model, and Mind Mapping.',
    eli5: 'Using fun games and tricks like "what if?" to unlock your brain\'s secret superpowers.'
  },
  c11_psy_cbse_171: {
    title: 'Language-Thought Relationship',
    summary: 'Examines how cognitive processes and symbolic linguistic structures interact.',
    eli5: 'Exploring whether words shape what you think, or if thoughts exist before words.'
  },
  c11_psy_cbse_172: {
    title: 'Linguistic Relativity (Sapir-Whorf)',
    summary: 'Hypothesis that structure of language influences or determines speakers’ worldview and cognition.',
    eli5: 'If your language has 20 words for snow, you might perceive snow far more detailed than others!'
  },
  c11_psy_cbse_173: {
    title: 'Piaget’s View on Thought & Language',
    summary: 'Thought precedes language; language is merely a vehicle for expressing underlying egocentric & operational schemas.',
    eli5: 'Piaget says: You must understand a concept first inside your head before you can speak words for it.'
  },
  c11_psy_cbse_174: {
    title: 'Vygotsky’s View on Thought & Language',
    summary: 'Thought and speech have different genetic roots; merge around age 3 into inner speech and verbal thought.',
    eli5: 'Vygotsky says: Words and thoughts start separately, then merge like two rivers into inner thoughts.'
  },
  c11_psy_cbse_175: {
    title: 'Stages of Language Development',
    summary: 'Crying, Babbling (6m), One-word holophrastic stage (1yr), Two-word telegraphic speech (2yrs), Complex syntax.',
    eli5: 'Babies go from goo-goo-ga-ga to single words, then "More milk!", then full sentences.'
  },
  c11_psy_cbse_176: {
    title: 'Skinner’s Behaviourist Theory',
    summary: 'Language acquired through environmental conditioning, operant conditioning, imitation, and reinforcement.',
    eli5: 'Babies learn words because adults clap and praise them when they say "Mama".'
  },
  c11_psy_cbse_177: {
    title: 'Chomsky’s Nativist Theory (LAD)',
    summary: 'Innate Language Acquisition Device (LAD) and Universal Grammar allow rapid linguistic development.',
    eli5: 'Humans are born with a specialized brain microchip pre-programmed to learn grammar.'
  },
  c11_psy_cbse_178: {
    title: 'Bilingualism and Multilingualism',
    summary: 'Knowing multiple languages enhances executive control, cognitive flexibility, and metalinguistic awareness.',
    eli5: 'Speaking two languages gives your brain an extra workout, making you better at switching tasks!'
  },
  c11_psy_cbse_179: {
    title: 'Pragmatics and Language Use',
    summary: 'Rules governing situational and conversational context, turn-taking, sarcasm, and indirect speech acts.',
    eli5: 'Knowing when to say "Could you please pass the salt?" instead of shouting "GIVE ME SALT!"'
  }
};

// ==========================================
// MANDATORY SECTIONS DATA
// ==========================================

// Section 1: SCENARIO
const SCENARIO = {
  title: 'Cognitive Architecture & Psycholinguistics Laboratory',
  intro: 'Welcome to the Advanced Mind Research Facility at ISC Psychology Centre. Here, you will step into the shoes of a Cognitive Neuropsychologist investigating how human thoughts, mental imagery, problem-solving heuristics, and linguistic structures shape human behavior.',
  context: 'You will interactively test hypotheses on mental rotation, solve classic cognitive puzzles like Duncker\'s Candle Problem, evaluate syllogisms, explore Wallas\' stages of creativity, and simulate language acquisition models from Skinner and Chomsky.'
};

// Section 2: DISCOVERY_QUESTION
const DISCOVERY_QUESTION = {
  question: 'In Karl Duncker’s candle problem, why do most subjects fail to attach the candle to the wall using a box of tacks, a candle, and matches?',
  options: [
    'They lack physical strength to push tacks into the mounting board.',
    'They suffer from Functional Fixedness, seeing the box only as a container for tacks rather than a potential platform.',
    'Their short-term working memory capacity is completely overloaded by matches.',
    'They lack inductive reasoning skills required to light matches safely.'
  ],
  correctIndex: 1,
  hintAfter: 'Functional fixedness restricts us from viewing objects beyond their habitual, assigned function!'
};

// Section 3: EXPLORATION_STEPS
const EXPLORATION_STEPS: ExplorationStep[] = [
  {
    title: 'Lab 1: Mental Imagery & Mental Rotation Test',
    instruction: 'Manipulate the rotation slider of 3D cognitive mental blocks to compare reaction times and spatial scanning visualizer.',
    interactionType: 'mental-rotation-lab',
    nodeId: 'c11_psy_cbse_155'
  },
  {
    title: 'Lab 2: Duncker Candle & Water-Jug Problem Simulator',
    instruction: 'Toggle between standard presentation vs explicit labeling of container items to break Mental Set & Functional Fixedness.',
    interactionType: 'problem-solving-lab',
    nodeId: 'c11_psy_cbse_160'
  },
  {
    title: 'Lab 3: Syllogism & Heuristic Decision-Making Workbench',
    instruction: 'Test valid/invalid deductive syllogisms and observe how representativeness heuristic leads to base-rate fallacy.',
    interactionType: 'reasoning-decision-lab',
    nodeId: 'c11_psy_cbse_162'
  },
  {
    title: 'Lab 4: Creative Thinking & Wallas Stage Incubator',
    instruction: 'Simulate Divergent Thinking metrics (Fluency, Flexibility, Originality) across the 4 stages of the creative process.',
    interactionType: 'creativity-lab',
    nodeId: 'c11_psy_cbse_167'
  },
  {
    title: 'Lab 5: Language Acquisition & Thought Models (Skinner vs Chomsky)',
    instruction: 'Simulate child vocabulary growth under Operant Conditioning vs Innate LAD Universal Grammar parameters.',
    interactionType: 'language-models-lab',
    nodeId: 'c11_psy_cbse_177'
  }
];

// Section 4: PREDICTION_QUESTIONS
const PREDICTION_QUESTIONS: PredictionQuestion[] = [
  {
    question: 'Predict: If a participant is asked to mentally rotate a complex shape by 180° compared to 45°, how will reaction time change according to Shepard & Metzler (1971)?',
    options: [
      'Reaction time remains identical regardless of rotation angle.',
      'Reaction time increases linearly as the angle of rotation increases.',
      'Reaction time decreases exponentially at higher angles.',
      'Reaction time drops to zero because mental rotation is instantaneous.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the angle slider in Lab 1 to observe the linear increase in mental transformation latency.',
    nodeId: 'c11_psy_cbse_155'
  },
  {
    question: 'Predict: According to Noam Chomsky, why do children frequently say "over-regularized" words like "breaked" or "gooses" even if adults never say them?',
    options: [
      'They are directly imitating bad grammar heard on television.',
      'They suffer from temporary developmental auditory processing failure.',
      'Their innate Language Acquisition Device (LAD) actively applies universal grammatical rules to exceptions.',
      'Skinnerian operant conditioning rewarded them with candy for using incorrect verbs.'
    ],
    correctIndex: 2,
    verifyInstruction: 'In Lab 5, toggle the Nativist LAD model to see how rule-application generates novel over-regularizations.',
    nodeId: 'c11_psy_cbse_177'
  }
];

// Section 5: OBSERVATION_QUESTIONS
const OBSERVATION_QUESTIONS: ObservationQuestion[] = [
  {
    question: 'What do you observe about problem-solving efficiency when the tack box is presented empty alongside tacks, rather than containing tacks?',
    observableOptions: [
      'Participants solve the candle problem significantly faster because functional fixedness is reduced.',
      'Participants become confused and take twice as long to solve the problem.',
      'No difference in solution speed occurs because motivation remains unchanged.',
      'Participants immediately give up due to lack of instructions.'
    ],
    correctIndex: 0,
    nodeId: 'c11_psy_cbse_160'
  },
  {
    question: 'When analyzing divergent thinking responses for alternative uses of a brick, what characterizes high "Flexibility"?',
    observableOptions: [
      'Generating 50 total uses that are all variations of building walls.',
      'Switching across completely different conceptual categories (e.g., doorstop, paperweight, weapon, red pigment).',
      'Writing long, elaborate descriptions for a single idea.',
      'Only stating ideas that have never been thought of in human history.'
    ],
    correctIndex: 1,
    nodeId: 'c11_psy_cbse_167'
  }
];

// Section 6: REAL_WORLD_ACTIVITY
const REAL_WORLD_ACTIVITY: RealWorldActivity = {
  title: 'Cognitive Ergonomics & Workplace Problem-Solving Audit',
  description: 'Apply principles of cognitive psychology, creative problem solving, and pragmatics to re-engineer an unproductive corporate brainstorming session and overcome organizational mental sets.',
  steps: [
    'Step 1: Identify "Mental Sets" and "Functional Fixedness" in current office tool usage (e.g., using sticky notes solely for reminders rather than kanban workflow mapping).',
    'Step 2: Implement De Bono\'s Lateral Thinking "Random Word Technique" to trigger illumination during product design bottlenecks.',
    'Step 3: Measure Divergent Thinking output across 4 dimensions: Fluency (total count), Flexibility (category shifts), Originality (rarity score), and Elaboration (detail depth).',
    'Step 4: Establish pragmatic communication rules for remote team calls to optimize turn-taking, reduce indirect ambiguity, and boost metalinguistic awareness.'
  ]
};

// Section 7: MISCONCEPTIONS
const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_1',
    title: 'Mental Images are Static Photographs',
    misconception: 'People believe mental images are exact static photographs stored frozen in memory.',
    correction: 'Mental images are dynamic, active mental reconstructions processed spatially and structurally, subject to decay and transformation.',
    explanation: 'Shepard and Metzler proved that mental images are rotated continuously in 3D mental space just like physical objects.',
    nodeId: 'c11_psy_cbse_155'
  },
  {
    id: 'misc_2',
    title: 'Creativity is Pure Unstructured Intuition',
    misconception: 'Creativity is believed to be entirely random inspiration with zero logical structure or effort.',
    correction: 'Creative thinking requires systematic preparation, incubation, structured divergent generation, and rigorous verification.',
    explanation: 'Wallas showed that illumination (the Aha! moment) only occurs after rigorous preparation and subconscious incubation.',
    nodeId: 'c11_psy_cbse_169'
  },
  {
    id: 'misc_3',
    title: 'Language Completely Controls What We Can Think',
    misconception: 'Linguistic determinism claims that if a language lacks a word for a concept, speakers CANNOT perceive or think of it.',
    correction: 'The strong Whorfian hypothesis is widely rejected; language influences cognitive speed and attention (Linguistic Relativity), but does not strictly limit perception.',
    explanation: 'Dani people of New Guinea have only two color words, yet can discriminate subtle color shades just as well as English speakers.',
    nodeId: 'c11_psy_cbse_172'
  },
  {
    id: 'misc_4',
    title: 'Children Learn Language purely through Imitation',
    misconception: 'Behaviorist theory claims children learn language only by copying adults and being rewarded.',
    correction: 'Children generate novel sentences and over-regularize rules ("goed", "mouses") which they never heard from adults, proving innate grammatical structures.',
    explanation: 'Chomsky demonstrated that input is too sparse (Poverty of Stimulus) for pure imitation to explain rapid language acquisition.',
    nodeId: 'c11_psy_cbse_177'
  },
  {
    id: 'misc_5',
    title: 'Bilingualism Causes Cognitive Confusion in Children',
    misconception: 'Learning two languages simultaneously delays cognitive development and causes language confusion.',
    correction: 'Bilingualism strengthens executive functioning, working memory control, metalinguistic awareness, and cognitive flexibility.',
    explanation: 'Bilingual children show superior task-switching abilities because they constantly exercise inhibitory control.',
    nodeId: 'c11_psy_cbse_178'
  },
  {
    id: 'misc_6',
    title: 'Deductive Reasoning Always Produces True Facts',
    misconception: 'If a deductive argument is logically valid, its conclusion MUST be true in real life.',
    correction: 'Validity refers to logical structure; truth requires both logical validity AND true premises (soundness).',
    explanation: 'Premise 1: All dogs fly. Premise 2: Rex is a dog. Conclusion: Rex flies. Valid logic, but false premise!',
    nodeId: 'c11_psy_cbse_162'
  }
];

// Section 8: DIAGNOSTIC QUESTIONS
const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag_1',
    question: 'A scientist assumes all swans are white because every swan observed in Europe is white. What form of reasoning is being used?',
    options: ['Deductive Reasoning', 'Inductive Reasoning', 'Dialectical Reasoning', 'Lateral Reasoning'],
    correctIndex: 1,
    nodeId: 'c11_psy_cbse_163',
    explanation: 'Inductive reasoning moves from specific observations (European swans) to a generalized conclusion (all swans are white).'
  },
  {
    id: 'diag_2',
    question: 'Which component of divergent thinking is measured by counting the number of different semantic categories represented in a person’s answers?',
    options: ['Fluency', 'Flexibility', 'Originality', 'Elaboration'],
    correctIndex: 1,
    nodeId: 'c11_psy_cbse_167',
    explanation: 'Flexibility measures the diversity of categories, whereas Fluency measures total count, and Originality measures novelty.'
  },
  {
    id: 'diag_3',
    question: 'According to Jean Piaget, what is the primary relation between thought and language?',
    options: [
      'Language shapes and determines thought completely.',
      'Thought precedes language and language is a vehicle for cognitive schemas.',
      'Thought and language originate independently and never interact.',
      'Language development is entirely complete before thought begins.'
    ],
    correctIndex: 1,
    nodeId: 'c11_psy_cbse_173',
    explanation: 'Piaget maintained that cognitive development drives language development; concepts form prior to verbal expressions.'
  },
  {
    id: 'diag_4',
    question: 'What is the term for de Bono’s technique of deliberate non-linear thinking to escape standard cognitive pathways?',
    options: ['Convergent Thinking', 'Lateral Thinking', 'Algorithmic Thinking', 'Syllogistic Reasoning'],
    correctIndex: 1,
    nodeId: 'c11_psy_cbse_168',
    explanation: 'Lateral thinking breaks away from step-by-step vertical logic to explore novel, sideways perspectives.'
  },
  {
    id: 'diag_5',
    question: 'A person judges murder to be more common than stomach cancer because news media cover murders far more dramatically. Which heuristic is at play?',
    options: ['Representativeness Heuristic', 'Availability Heuristic', 'Anchoring Heuristic', 'Framing Effect'],
    correctIndex: 1,
    nodeId: 'c11_psy_cbse_164',
    explanation: 'The availability heuristic leads people to judge event frequency based on how easily examples come to mind.'
  },
  {
    id: 'diag_6',
    question: 'What is the stage in Wallas’ creative process where the individual steps away from the problem and subconscious processing occurs?',
    options: ['Preparation', 'Incubation', 'Illumination', 'Verification'],
    correctIndex: 1,
    nodeId: 'c11_psy_cbse_169',
    explanation: 'Incubation occurs when active conscious effort is paused, allowing subconscious connections to form.'
  },
  {
    id: 'diag_7',
    question: 'Which theoretical concept was proposed by Noam Chomsky to explain innate universal grammar in humans?',
    options: ['Operant Chamber', 'Zone of Proximal Development', 'Language Acquisition Device (LAD)', 'Working Memory Central Executive'],
    correctIndex: 2,
    nodeId: 'c11_psy_cbse_177',
    explanation: 'Chomsky proposed the LAD as a biological mechanism pre-wired for language rule acquisition.'
  },
  {
    id: 'diag_8',
    question: 'What is the term for social context rules governing conversational turn-taking, tone, and polite requests?',
    options: ['Phonology', 'Morphology', 'Syntax', 'Pragmatics'],
    correctIndex: 3,
    nodeId: 'c11_psy_cbse_179',
    explanation: 'Pragmatics deals with the practical, social context of language use in real communication.'
  }
];

// DEFAULT PROPS
const DEFAULT_PROPS: SimProps = {
  onComplete: (score: number) => console.log('Simulation complete with score:', score)
};

// Section 7: CHALLENGES ARRAY (23 Progressive Challenges: 7 Foundation, 8 Standard, 8 Advanced)
const CHALLENGES: Challenge[] = [
  // FOUNDATION TIER (7)
  {
    id: 'chal_1',
    nodeId: 'c11_psy_cbse_154',
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Knowledge & Recall',
    question: 'Which of the following best defines thinking in psychological terms?',
    options: [
      'A passive recording of external sensory stimuli without internal modification',
      'A higher mental process involving manipulation, transformation, and reorganization of information in memory',
      'An involuntary reflex action governed purely by the spinal cord',
      'A purely emotional state unlinked to mental representations'
    ],
    correctIndex: 1,
    explanation: 'Thinking is an active cognitive process that reorganizes mental symbols, concepts, and images stored in memory.',
    hints: [
      'Think about whether thinking is active or passive.',
      'It involves memory and internal representations.',
      'Reorganizing and transforming information is key.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'chal_2',
    nodeId: 'c11_psy_cbse_155',
    type: 'understanding',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'When you close your eyes and mentally visualize your bedroom layout, what mental building block are you utilizing?',
    options: ['Mental Image', 'Algorithm', 'Heuristic', 'Phoneme'],
    correctIndex: 0,
    explanation: 'Mental images are sensory-like mental representations of objects or scenes not physically present.',
    hints: [
      'It involves picture-like representation.',
      'Visualizing in your mind\'s eye.',
      'Mental image!'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'chal_3',
    nodeId: 'c11_psy_cbse_156',
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Knowledge & Recall',
    question: 'What is a "Concept" in cognitive psychology?',
    options: [
      'A specific spoken sentence',
      'A mental category used to group objects, events, or characteristics based on common properties',
      'A neurological reflex in the motor cortex',
      'An emotional impulse'
    ],
    correctIndex: 1,
    explanation: 'Concepts are mental categories (e.g., "bird", "furniture") that help simplify and organize complex information.',
    hints: [
      'Concepts act like mental folders.',
      'They group things with shared features.',
      'Mental categories based on common properties.'
    ]
  },
  {
    id: 'chal_4',
    nodeId: 'c11_psy_cbse_162',
    type: 'understanding',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Identify the form of reasoning: "All mammals have vertebrae. Whales are mammals. Therefore, whales have vertebrae."',
    options: ['Inductive Reasoning', 'Deductive Reasoning', 'Divergent Reasoning', 'Lateral Reasoning'],
    correctIndex: 1,
    explanation: 'Deductive reasoning starts with general premises and derives a specific conclusion that must be true if premises are true.',
    hints: [
      'Starts from general rule to specific case.',
      'Top-down logic.',
      'Deductive reasoning guarantees truth if premises hold.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'chal_5',
    nodeId: 'c11_psy_cbse_166',
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Knowledge & Recall',
    question: 'Thinking that is directed toward finding a single, correct, conventional answer to a problem is known as:',
    options: ['Divergent Thinking', 'Convergent Thinking', 'Lateral Thinking', 'Holistic Thinking'],
    correctIndex: 1,
    explanation: 'Convergent thinking narrows down possibilities to arrive at the single correct solution (e.g., standard math problems).',
    hints: [
      'Converging onto one point.',
      'Single right answer.',
      'Convergent Thinking.'
    ]
  },
  {
    id: 'chal_6',
    nodeId: 'c11_psy_cbse_175',
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Knowledge & Recall',
    question: 'What is the correct developmental sequence of early language acquisition in infants?',
    options: [
      'Babbling -> Crying -> Holophrastic (one-word) -> Telegraphic (two-word)',
      'Crying -> Babbling -> Holophrastic (one-word) -> Telegraphic (two-word)',
      'Telegraphic -> Holophrastic -> Babbling -> Complex Syntax',
      'Babbling -> Telegraphic -> Crying -> Holophrastic'
    ],
    correctIndex: 1,
    explanation: 'Language development begins at birth with crying, followed by babbling (~6m), single words (~12m), and telegraphic speech (~18-24m).',
    hints: [
      'Infants cry at birth.',
      'Babbling starts around 6 months.',
      'Crying -> Babbling -> One-word -> Two-word.'
    ]
  },
  {
    id: 'chal_7',
    nodeId: 'c11_psy_cbse_176',
    type: 'understanding',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'B.F. Skinner argued that children learn language primarily through:',
    options: [
      'Innate biological Language Acquisition Devices',
      'Operant conditioning, imitation, and environmental reinforcement',
      'Spontaneous genetic mutation at age 2',
      'Unconscious dream analysis'
    ],
    correctIndex: 1,
    explanation: 'Behaviorists like Skinner posited that language is learned through reinforcement (praise, rewards) and parental modeling.',
    hints: [
      'Skinner is famous for operant conditioning.',
      'Reinforcement and imitation.',
      'Environmental conditioning.'
    ],
    misconceptionIndex: 3
  },

  // STANDARD TIER (8)
  {
    id: 'chal_8',
    nodeId: 'c11_psy_cbse_157',
    type: 'analysis',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Cross-cultural research reveals that Western thinkers tend toward "analytic" cognition while Eastern thinkers tend toward "holistic" cognition. Which scenario reflects holistic cognition?',
    options: [
      'Focusing exclusively on a focal object while ignoring background context',
      'Analyzing an object by categorizing it using strict formal logic rules',
      'Perceiving objects in relation to their surrounding environment and relationships',
      'Ignoring contextual relationships in favor of isolating single attributes'
    ],
    correctIndex: 2,
    explanation: 'Holistic cognition emphasizes context, relationships, and the overall field rather than isolating individual focal items.',
    hints: [
      'Holistic means looking at the whole picture.',
      'Relationships and background context matter.',
      'Perceiving objects in relation to surroundings.'
    ]
  },
  {
    id: 'chal_9',
    nodeId: 'c11_psy_cbse_159',
    type: 'application',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'A student solves 5 consecutive math problems using Formula A. On the 6th problem, Formula B is vastly simpler, but the student persists with Formula A. This illustrates:',
    options: ['Functional Fixedness', 'Mental Set (Einstellung Effect)', 'Availability Heuristic', 'Linguistic Relativity'],
    correctIndex: 1,
    explanation: 'Mental set (or Einstellung effect) is the tendency to stick to a previously successful strategy even when better alternatives exist.',
    hints: [
      'It involves sticking to an old habit/routine.',
      'Einstellung effect.',
      'Mental Set!'
    ]
  },
  {
    id: 'chal_10',
    nodeId: 'c11_psy_cbse_160',
    type: 'application',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'In the candle problem, viewing a box of tacks solely as a container rather than a potential support platform attached to the wall is an example of:',
    options: ['Functional Fixedness', 'Deductive Fallacy', 'Incubation Failure', 'Metalinguistic Deficit'],
    correctIndex: 0,
    explanation: 'Functional fixedness is a cognitive bias where an object is seen only in terms of its customary function.',
    hints: [
      'Fixed on the standard function of the box.',
      'Cannot see alternative uses for an object.',
      'Functional Fixedness.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'chal_11',
    nodeId: 'c11_psy_cbse_163',
    type: 'analysis',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why can inductive reasoning NEVER guarantee absolute truth in its conclusions, unlike valid deductive reasoning?',
    options: [
      'Inductive reasoning uses formal mathematical proofs.',
      'Inductive conclusions are probabilistic, based on limited sample observations that can be disproven by a single counterexample.',
      'Inductive reasoning is forbidden in empirical science.',
      'Inductive logic relies on emotional intuition rather than empirical data.'
    ],
    correctIndex: 1,
    explanation: 'Inductive conclusions expand beyond given premises to make generalizations; a single future observation (e.g., a black swan) can invalidate it.',
    hints: [
      'Think about sample size vs general truth.',
      'Observations are limited.',
      'Conclusions are probabilistic.'
    ]
  },
  {
    id: 'chal_12',
    nodeId: 'c11_psy_cbse_164',
    type: 'application',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'After watching news reports on plane crashes, an traveler estimates flying to be far more dangerous than driving, despite statistical evidence showing driving has higher mortality. This bias is driven by:',
    options: ['Representativeness Heuristic', 'Availability Heuristic', 'Confirmation Bias', 'Hindsight Bias'],
    correctIndex: 1,
    explanation: 'The availability heuristic leads individuals to estimate event likelihood based on how easily vivid instances are retrieved from memory.',
    hints: [
      'Vivid memories come to mind easily.',
      'Information availability in memory.',
      'Availability Heuristic.'
    ]
  },
  {
    id: 'chal_13',
    nodeId: 'c11_psy_cbse_167',
    type: 'analysis',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'In Guilford’s structure of intellect, which metric of divergent thinking assesses the statistical rarity or novelty of responses?',
    options: ['Fluency', 'Flexibility', 'Originality', 'Elaboration'],
    correctIndex: 2,
    explanation: 'Originality measures how unique or unusual an idea is compared to standard norms.',
    hints: [
      'Rarity and novel ideas.',
      'Not total count (Fluency) or categories (Flexibility).',
      'Originality!'
    ]
  },
  {
    id: 'chal_14',
    nodeId: 'c11_psy_cbse_173',
    type: 'analysis',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Compare Piaget’s and Vygotsky’s views on egocentric speech in young children. What does Vygotsky argue is the ultimate destination of egocentric speech?',
    options: [
      'It simply disappears as cognitive immaturity fades.',
      'It transitions into "Inner Speech", becoming the fundamental tool for self-regulation and thought.',
      'It becomes formal written syntax.',
      'It converts into motor reflexes in hands.'
    ],
    correctIndex: 1,
    explanation: 'Vygotsky demonstrated that egocentric speech does not disappear (as Piaget thought), but internalizes to form private inner speech.',
    hints: [
      'Vygotsky believed self-talk internalizes.',
      'Becomes internal thinking tool.',
      'Inner Speech.'
    ]
  },
  {
    id: 'chal_15',
    nodeId: 'c11_psy_cbse_177',
    type: 'analysis',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Chomsky’s concept of "Poverty of the Stimulus" argues that:',
    options: [
      'Poor children hear fewer words and thus cannot learn grammar.',
      'Linguistic input heard by infants is too incomplete and noisy to account for their rapid acquisition of complex grammar without innate mechanisms.',
      'Parents fail to correct bad grammar in children.',
      'Languages with small vocabularies limit mental capacity.'
    ],
    correctIndex: 1,
    explanation: 'Poverty of the stimulus posits that environmental speech data is insufficient alone to explain how fast children master innate structural rules.',
    hints: [
      'Input is insufficient/incomplete.',
      'Requires innate brain structure (LAD).',
      'Linguistic input is too incomplete to rely solely on environmental learning.'
    ],
    misconceptionIndex: 3
  },

  // ADVANCED TIER (8)
  {
    id: 'chal_16',
    nodeId: 'c11_psy_cbse_168',
    type: 'evaluation',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation & Synthesis',
    question: 'Edward de Bono contrasted Vertical Thinking with Lateral Thinking. Which statement accurately distinguishes them?',
    options: [
      'Vertical thinking is sequential and moves along established logical pathways; Lateral thinking deliberately seeks side routes to change paradigms.',
      'Vertical thinking produces novel artistic art; Lateral thinking solves mathematical equations.',
      'Vertical thinking occurs in right hemisphere; Lateral thinking occurs in left hemisphere.',
      'Vertical thinking relies on intuition; Lateral thinking relies on algorithms.'
    ],
    correctIndex: 0,
    explanation: 'Vertical thinking digs the same hole deeper (logic/step-by-step); Lateral thinking digs a hole somewhere else entirely (paradigm shift).',
    hints: [
      'Vertical = step-by-step sequential logic.',
      'Lateral = sideways paradigm jump.',
      'Option A captures de Bono\'s core definition.'
    ]
  },
  {
    id: 'chal_17',
    nodeId: 'c11_psy_cbse_169',
    type: 'evaluation',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation & Synthesis',
    question: 'In Wallas’ 4 stages of creative thinking, what cognitive mechanism characterizes the "Incubation" phase?',
    options: [
      'Active deliberate logical calculations on paper',
      'Subconscious processing and associative reorganization while conscious focus is shifted elsewhere',
      'Formal critical evaluation of the final product',
      'Initial gather of raw data and problem framing'
    ],
    correctIndex: 1,
    explanation: 'During incubation, explicit problem-solving is put on hold, allowing implicit cognitive networks to combine remote associations.',
    hints: [
      'Conscious mind is resting or doing something else.',
      'Subconscious associative processing.',
      'Option B.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'chal_18',
    nodeId: 'c11_psy_cbse_170',
    type: 'creativity',
    difficulty: 'advanced',
    competencyLevel: 'Creativity & Synthesis',
    question: 'In Osborn’s classic Brainstorming protocol, which cardinal rule is designed specifically to prevent evaluation apprehension and maximize divergent fluency?',
    options: [
      'Critique ideas immediately as they are voiced',
      'Defer judgment and criticism until the generation phase is complete',
      'Allow only senior experts to contribute ideas',
      'Limit total ideas to 3 quality options'
    ],
    correctIndex: 1,
    explanation: 'Deferring judgment prevents premature convergent filtering, encouraging free-flowing, high-volume divergent idea generation.',
    hints: [
      'Judgement stops idea generation.',
      'Defer criticism until later.',
      'Defer judgment during generation phase.'
    ]
  },
  {
    id: 'chal_19',
    nodeId: 'c11_psy_cbse_172',
    type: 'evaluation',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation & Synthesis',
    question: 'How does modern cognitive research view the distinction between Linguistic Determinism (strong Whorfian) and Linguistic Relativity (weak Whorfian)?',
    options: [
      'Determinism is fully proven; language completely dictates human thought capabilities.',
      'Determinism is largely rejected; Relativity is supported, showing language influences attention, memory encoding, and perceptual speed.',
      'Both hypotheses have been completely disproven; language has zero relationship to thought.',
      'Relativity applies only to animals, not humans.'
    ],
    correctIndex: 1,
    explanation: 'Strong determinism (language limits what CAN be thought) is unsupported; weak relativity (language biases attention & speed) is widely backed.',
    hints: [
      'Strong determinism is too extreme.',
      'Language affects attention & perceptual speed.',
      'Determinism rejected, Relativity supported.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'chal_20',
    nodeId: 'c11_psy_cbse_174',
    type: 'evaluation',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation & Synthesis',
    question: 'Synthesize Vygotsky’s developmental model of speech and thought integration. At what age do thought and speech merge into verbal thought?',
    options: [
      'At birth (0 months)',
      'Around age 3',
      'At puberty (age 12)',
      'They never merge'
    ],
    correctIndex: 1,
    explanation: 'Vygotsky proposed that pre-intellectual speech and pre-linguistic thought develop independently until around age 3, when they coalesce.',
    hints: [
      'Starts around toddlerhood.',
      'Age 3 is the pivotal merger point.',
      'Around age 3.'
    ]
  },
  {
    id: 'chal_21',
    nodeId: 'c11_psy_cbse_178',
    type: 'evaluation',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation & Synthesis',
    question: 'What neurocognitive advantage is consistently observed in lifelong bilingual individuals compared to monolinguals on executive function tasks?',
    options: [
      'Faster motor reflex in knee jerk tests',
      'Enhanced cognitive control, inhibitory control, and conflict resolution (Bilingual Advantage in Executive Control)',
      'Higher auditory pitch sensitivity only',
      'Complete immunity to physical brain fatigue'
    ],
    correctIndex: 1,
    explanation: 'Bilinguals continuously exercise executive control by suppressing the non-target language, enhancing dorsolateral prefrontal cortex function.',
    hints: [
      'Suppressing one language strengthens inhibitory control.',
      'Executive function & conflict resolution.',
      'Enhanced cognitive control & inhibitory control.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'chal_22',
    nodeId: 'c11_psy_cbse_179',
    type: 'application',
    difficulty: 'advanced',
    competencyLevel: 'Application & Context',
    question: 'When a dinner guest says "Can you reach the salt?", interpreting this not as a query about physical capability but as a polite request to hand the salt is an application of:',
    options: ['Morphological syntax', 'Phonological decoding', 'Pragmatics & indirect speech acts', 'Linguistic determinism'],
    correctIndex: 2,
    explanation: 'Pragmatics enables listeners to decode intended speaker meaning beyond literal literal semantics through context and social conventions.',
    hints: [
      'Social rules of conversation.',
      'Indirect speech acts.',
      'Pragmatics!'
    ]
  },
  {
    id: 'chal_23',
    nodeId: 'c11_psy_cbse_161',
    type: 'analysis',
    difficulty: 'advanced',
    competencyLevel: 'Analysis & Evaluation',
    question: 'According to the Yerkes-Dodson law as applied to complex problem solving, how does extreme anxiety/arousal act as a cognitive obstacle?',
    options: [
      'High arousal broadens working memory bandwidth infinitely.',
      'High arousal narrows cognitive focus excessively, causing hyper-fixation on rigid strategies and eliminating flexible search.',
      'High arousal guarantees immediate creative illumination.',
      'Arousal has no relationship to problem-solving performance.'
    ],
    correctIndex: 1,
    explanation: 'For complex tasks, high arousal narrows attention (tunnel vision), exacerbating mental set and preventing divergent exploration.',
    hints: [
      'Too much stress causes tunnel vision.',
      'Narrows cognitive focus excessively.',
      'Option B.'
    ]
  }
];

// ==========================================
// CUSTOM SVG DIAGRAM COMPONENTS (3+)
// ==========================================

// Diagram 1: Mental Representations Architecture (Images vs Concepts)
const MentalRepresentationDiagram: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl text-white">
      <div className="flex justify-between items-center mb-2 border-b border-slate-800 pb-2">
        <h4 className="text-sm font-semibold text-gold-400 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-pulse"></span>
          Cognitive Architecture: Mental Representations & Neural Encoding
        </h4>
        <span className="text-xs bg-gold-950 text-gold-300 px-2 py-0.5 rounded border border-gold-800">
          Nodes 154-157
        </span>
      </div>
      <svg viewBox="0 0 800 280" className="w-full h-auto">
        <defs>
          <linearGradient id="gradBrain" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="gradConcept" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background Grid */}
        <rect width="800" height="280" fill="url(#gradBrain)" rx="10" />
        <path d="M 0 70 H 800 M 0 140 H 800 M 0 210 H 800" stroke="#334155" strokeWidth="0.5" strokeDasharray="4 4" />
        <path d="M 200 0 V 280 M 400 0 V 280 M 600 0 V 280" stroke="#334155" strokeWidth="0.5" strokeDasharray="4 4" />

        {/* Mental Image Node */}
        <g transform="translate(100, 70)">
          <rect x="-70" y="-35" width="140" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" filter="url(#glow)"/>
          <text x="0" y="-10" textAnchor="middle" fill="#38bdf8" className="text-xs font-bold">MENTAL IMAGES</text>
          <text x="0" y="10" textAnchor="middle" fill="#94a3b8" className="text-[10px]">Analog Spatial Code</text>
          <text x="0" y="24" textAnchor="middle" fill="#94a3b8" className="text-[9px]">(Visual-Spatial Scratchpad)</text>
        </g>

        {/* Concept Hierarchy Node */}
        <g transform="translate(400, 70)">
          <rect x="-85" y="-35" width="170" height="70" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" filter="url(#glow)"/>
          <text x="0" y="-10" textAnchor="middle" fill="#818cf8" className="text-xs font-bold">CONCEPTS & PROTOTYPES</text>
          <text x="0" y="10" textAnchor="middle" fill="#94a3b8" className="text-[10px]">Symbolic Categorization</text>
          <text x="0" y="24" textAnchor="middle" fill="#94a3b8" className="text-[9px]">(Superordinate / Basic / Sub)</text>
        </g>

        {/* Thinking Styles Node */}
        <g transform="translate(700, 70)">
          <rect x="-70" y="-35" width="140" height="70" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" filter="url(#glow)"/>
          <text x="0" y="-10" textAnchor="middle" fill="#f43f5e" className="text-xs font-bold">THINKING STYLES</text>
          <text x="0" y="10" textAnchor="middle" fill="#94a3b8" className="text-[10px]">Analytic vs Holistic</text>
          <text x="0" y="24" textAnchor="middle" fill="#94a3b8" className="text-[9px]">(Cultural Context)</text>
        </g>

        {/* Connecting Neural Pathways */}
        <path d="M 170 70 Q 285 20 315 70" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse" />
        <polygon points="315,70 306,64 308,74" fill="#06b6d4" />

        <path d="M 485 70 Q 592 20 630 70" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse" />
        <polygon points="630,70 621,64 623,74" fill="#a855f7" />

        {/* Lower Diagram: Prototype vs Exemplar Model */}
        <g transform="translate(100, 200)">
          <circle cx="0" cy="0" r="30" fill="#0284c7" fillOpacity="0.2" stroke="#0369a1" strokeWidth="1.5" />
          <text x="0" y="-5" textAnchor="middle" fill="#38bdf8" className="text-[10px] font-bold">Prototype</text>
          <text x="0" y="10" textAnchor="middle" fill="#cbd5e1" className="text-[8px]">Average ideal</text>
        </g>

        <g transform="translate(400, 200)">
          <rect x="-140" y="-30" width="280" height="50" rx="6" fill="#0f172a" stroke="#475569" strokeWidth="1" />
          <text x="0" y="-10" textAnchor="middle" fill="#a7f3d0" className="text-xs font-semibold">Hierarchy Levels</text>
          <text x="-90" y="12" textAnchor="middle" fill="#94a3b8" className="text-[9px]">Vehicle (Super)</text>
          <text x="0" y="12" textAnchor="middle" fill="#38bdf8" className="text-[9px] font-bold">Car (Basic)</text>
          <text x="90" y="12" textAnchor="middle" fill="#94a3b8" className="text-[9px]">Sedan (Sub)</text>
        </g>

        <g transform="translate(700, 200)">
          <path d="M -40 -20 L 40 -20 L 20 20 L -20 20 Z" fill="#9f1239" fillOpacity="0.3" stroke="#f43f5e" strokeWidth="1.5" />
          <text x="0" y="-2" textAnchor="middle" fill="#fda4af" className="text-[10px] font-bold">Cultural Lens</text>
          <text x="0" y="10" textAnchor="middle" fill="#f1f5f9" className="text-[8px]">Field Dependence</text>
        </g>

        {/* Arrows connecting top to bottom */}
        <line x1="100" y1="105" x2="100" y2="170" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
        <line x1="400" y1="105" x2="400" y2="170" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="2 2" />
        <line x1="700" y1="105" x2="700" y2="170" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2 2" />
      </svg>
    </div>
  );
};

// Diagram 2: Wallas Creative Process & Divergent/Lateral Thinking Flowchart
const CreativeProcessDiagram: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl text-white">
      <div className="flex justify-between items-center mb-2 border-b border-slate-800 pb-2">
        <h4 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
          Wallas Stages of Creativity & Divergent vs Lateral Thinking Matrix
        </h4>
        <span className="text-xs bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">
          Nodes 165-170
        </span>
      </div>
      <svg viewBox="0 0 800 260" className="w-full h-auto">
        <rect width="800" height="260" fill="#0f172a" rx="10" />

        {/* 4 Wallas Stages Flow */}
        <g transform="translate(50, 60)">
          {/* Stage 1 */}
          <rect x="0" y="0" width="130" height="50" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
          <text x="65" y="20" textAnchor="middle" fill="#fbbf24" className="text-xs font-bold">1. PREPARATION</text>
          <text x="65" y="36" textAnchor="middle" fill="#94a3b8" className="text-[9px]">Data & Problem Definition</text>

          <path d="M 130 25 H 160" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />

          {/* Stage 2 */}
          <rect x="160" y="0" width="130" height="50" rx="6" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
          <text x="225" y="20" textAnchor="middle" fill="#c084fc" className="text-xs font-bold">2. INCUBATION</text>
          <text x="225" y="36" textAnchor="middle" fill="#94a3b8" className="text-[9px]">Subconscious Processing</text>

          <path d="M 290 25 H 320" stroke="#8b5cf6" strokeWidth="2" />

          {/* Stage 3 */}
          <rect x="320" y="0" width="130" height="50" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
          <text x="385" y="20" textAnchor="middle" fill="#34d399" className="text-xs font-bold">3. ILLUMINATION</text>
          <text x="385" y="36" textAnchor="middle" fill="#94a3b8" className="text-[9px]">Aha! Sudden Insight</text>

          <path d="M 450 25 H 480" stroke="#10b981" strokeWidth="2" />

          {/* Stage 4 */}
          <rect x="480" y="0" width="130" height="50" rx="6" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
          <text x="545" y="20" textAnchor="middle" fill="#22d3ee" className="text-xs font-bold">4. VERIFICATION</text>
          <text x="545" y="36" textAnchor="middle" fill="#94a3b8" className="text-[9px]">Testing & Refining</text>
        </g>

        {/* Lower Matrix: Divergent Dimensions & Lateral Thinking */}
        <g transform="translate(50, 150)">
          {/* Divergent Thinking Box */}
          <rect x="0" y="0" width="340" height="90" rx="8" fill="#1e293b" stroke="#ec4899" strokeWidth="1.5" />
          <text x="170" y="20" textAnchor="middle" fill="#f472b6" className="text-xs font-bold">DIVERGENT THINKING (Guilford)</text>

          <g transform="translate(15, 35)">
            <rect x="0" y="0" width="70" height="40" rx="4" fill="#0f172a" stroke="#475569" />
            <text x="35" y="18" textAnchor="middle" fill="#38bdf8" className="text-[10px] font-bold">Fluency</text>
            <text x="35" y="30" textAnchor="middle" fill="#64748b" className="text-[8px]">Count</text>
          </g>
          <g transform="translate(95, 35)">
            <rect x="0" y="0" width="70" height="40" rx="4" fill="#0f172a" stroke="#475569" />
            <text x="35" y="18" textAnchor="middle" fill="#a7f3d0" className="text-[10px] font-bold">Flexibility</text>
            <text x="35" y="30" textAnchor="middle" fill="#64748b" className="text-[8px]">Categories</text>
          </g>
          <g transform="translate(175, 35)">
            <rect x="0" y="0" width="70" height="40" rx="4" fill="#0f172a" stroke="#475569" />
            <text x="35" y="18" textAnchor="middle" fill="#fef08a" className="text-[10px] font-bold">Originality</text>
            <text x="35" y="30" textAnchor="middle" fill="#64748b" className="text-[8px]">Rarity</text>
          </g>
          <g transform="translate(255, 35)">
            <rect x="0" y="0" width="70" height="40" rx="4" fill="#0f172a" stroke="#475569" />
            <text x="35" y="18" textAnchor="middle" fill="#c084fc" className="text-[10px] font-bold">Elaboration</text>
            <text x="35" y="30" textAnchor="middle" fill="#64748b" className="text-[8px]">Detail</text>
          </g>
        </g>

        {/* Lateral Thinking Box */}
        <g transform="translate(420, 150)">
          <rect x="0" y="0" width="330" height="90" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="165" y="20" textAnchor="middle" fill="#fbbf24" className="text-xs font-bold">LATERAL THINKING (Edward de Bono)</text>
          <text x="165" y="40" textAnchor="middle" fill="#cbd5e1" className="text-[10px]">• Escaping Vertical Logic Patterns</text>
          <text x="165" y="55" textAnchor="middle" fill="#cbd5e1" className="text-[10px]">• Provocation & Random Input Techniques</text>
          <text x="165" y="70" textAnchor="middle" fill="#cbd5e1" className="text-[10px]">• Restructuring Conceptual Boundaries</text>
        </g>
      </svg>
    </div>
  );
};

// Diagram 3: Language & Thought Theorists Matrix (Piaget, Vygotsky, Skinner, Chomsky, Sapir-Whorf)
const LanguageThoughtDiagram: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl text-white">
      <div className="flex justify-between items-center mb-2 border-b border-slate-800 pb-2">
        <h4 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          Psycholinguistics Theoretical Frameworks Matrix
        </h4>
        <span className="text-xs bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
          Nodes 171-179
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* Piaget */}
        <div className="bg-slate-950 p-3 rounded-lg border border-gold-900/60 hover:border-gold-500 transition-colors">
          <div className="text-gold-400 font-bold mb-1 border-b border-gold-950 pb-1">PIAGET</div>
          <p className="text-slate-300 font-semibold text-[11px] mb-1">Thought Determines Language</p>
          <p className="text-slate-400 text-[10px]">Egocentric speech reflects cognitive immaturity. Language is a vehicle for internal schemas formed first.</p>
        </div>

        {/* Vygotsky */}
        <div className="bg-slate-950 p-3 rounded-lg border border-teal-900/60 hover:border-teal-500 transition-colors">
          <div className="text-teal-400 font-bold mb-1 border-b border-teal-950 pb-1">VYGOTSKY</div>
          <p className="text-slate-300 font-semibold text-[11px] mb-1">Separate Origins → Inner Speech</p>
          <p className="text-slate-400 text-[10px]">Thought & speech merge around age 3. Egocentric speech internalizes to become private self-regulatory thought.</p>
        </div>

        {/* Skinner */}
        <div className="bg-slate-950 p-3 rounded-lg border border-amber-900/60 hover:border-amber-500 transition-colors">
          <div className="text-amber-400 font-bold mb-1 border-b border-amber-950 pb-1">SKINNER (Behaviorist)</div>
          <p className="text-slate-300 font-semibold text-[11px] mb-1">Environmental Conditioning</p>
          <p className="text-slate-400 text-[10px]">Operant conditioning, imitation, shaping, and reinforcement account for vocabulary & verbal behavior.</p>
        </div>

        {/* Chomsky */}
        <div className="bg-slate-950 p-3 rounded-lg border border-rose-900/60 hover:border-rose-500 transition-colors">
          <div className="text-rose-400 font-bold mb-1 border-b border-rose-950 pb-1">CHOMSKY (Nativist)</div>
          <p className="text-slate-300 font-semibold text-[11px] mb-1">Innate LAD & Universal Grammar</p>
          <p className="text-slate-400 text-[10px]">Poverty of stimulus proves humans possess a biological Language Acquisition Device for grammar processing.</p>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// INTERACTIVE LAB WIDGET COMPONENTS
// ==========================================

// Lab 1 Interactive: Mental Rotation Experiment Widget
const MentalRotationLabWidget: React.FC = () => {
  const [angle, setAngle] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [reactionTimeMs, setReactionTimeMs] = useState<number>(450);

  useEffect(() => {
    // Shepard & Metzler linear relationship formula simulation
    const baseTime = 400;
    const computedTime = baseTime + Math.round(angle * 4.2) + (isFlipped ? 250 : 0);
    setReactionTimeMs(computedTime);
  }, [angle, isFlipped]);

  return (
    <div className="bg-slate-950 p-4 rounded-xl border border-gold-800/80 text-white space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-gold-300">Mental Rotation Visualizer (Shepard & Metzler Paradigm)</h3>
        <span className="text-xs bg-gold-900/50 text-gold-200 px-2.5 py-1 rounded-full border border-gold-700">
          Latency: <strong className="text-gold-400">{reactionTimeMs} ms</strong>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Interactive Shape Visualizer */}
        <div className="h-48 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center relative overflow-hidden">
          <div className="text-center">
            <svg
              width="120"
              height="120"
              viewBox="0 0 100 100"
              style={{ transform: `rotate(${angle}deg) scaleX(${isFlipped ? -1 : 1})`, transition: 'transform 0.2s ease-out' }}
            >
              <path d="M 20 20 H 50 V 50 H 80 V 80 H 20 Z" fill="#06b6d4" stroke="#38bdf8" strokeWidth="3" />
              <rect x="25" y="25" width="10" height="10" fill="#ffffff" />
              <rect x="55" y="55" width="10" height="10" fill="#ffffff" />
            </svg>
            <p className="text-[11px] text-slate-400 stroke-slate-700 mt-2">Target Stimulus Shape</p>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Rotation Angle:</span>
              <span className="text-gold-400 font-bold">{angle}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="180"
              step="15"
              value={angle}
              onChange={(e) => {
                setAngle(parseInt(e.target.value));
                audioManager.play('pop');
              }}
              className="w-full accent-gold-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsFlipped(!isFlipped);
                audioManager.play('tap');
              }}
              className={`px-3 py-2 text-xs rounded-lg font-semibold border transition-all ${
                isFlipped
                  ? 'bg-rose-900/60 border-rose-500 text-rose-200'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Mirror Image: {isFlipped ? 'ON (Flipped)' : 'OFF (Same)'}
            </button>
          </div>

          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-[11px] text-slate-300">
            <p className="font-semibold text-gold-400 mb-1">Psychological Insight:</p>
            Mental rotation speed averages ~60° per second. Notice how latency increases linearly with angular disorientation, demonstrating that spatial imagery operates as an analog mental transformation!
          </div>
        </div>
      </div>
    </div>
  );
};

// Lab 2 Interactive: Duncker Candle Problem Simulator (Mental Set & Functional Fixedness)
const ProblemSolvingLabWidget: React.FC = () => {
  const [isBoxUnpacked, setIsBoxUnpacked] = useState<boolean>(false);
  const [isCandleMounted, setIsCandleMounted] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('Goal: Mount the burning candle on the corkboard wall without wax dripping on the table.');

  const handleUnpackBox = () => {
    setIsBoxUnpacked(true);
    setMessage('You removed the tacks from the box! The box is now an independent object (a shelf).');
    audioManager.play('pickup');
  };

  const handleMountBox = () => {
    if (!isBoxUnpacked) {
      setMessage('Functional Fixedness obstacle! The box is currently full of tacks and being used only as a container. Empty it first!');
      audioManager.play('error');
      return;
    }
    setIsCandleMounted(true);
    setMessage('SUCCESS! You tacked the empty box to the wall and placed the candle inside! You overcame Functional Fixedness!');
    audioManager.play('success');
    audioManager.play('celebration');
  };

  const handleReset = () => {
    setIsBoxUnpacked(false);
    setIsCandleMounted(false);
    setMessage('Goal: Mount the burning candle on the corkboard wall without wax dripping on the table.');
    audioManager.play('whoosh');
  };

  return (
    <div className="bg-slate-950 p-4 rounded-xl border border-amber-800/80 text-white space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-amber-300">Duncker’s Candle Problem Lab (Functional Fixedness Test)</h3>
        <button
          onClick={handleReset}
          className="text-xs bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded text-slate-300 border border-slate-700"
        >
          Reset Scene
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Visual Board */}
        <div className="h-56 bg-amber-950/20 border-2 border-amber-900/60 rounded-xl relative overflow-hidden flex flex-col justify-between p-4">
          <div className="text-[10px] text-amber-500 uppercase tracking-wider font-bold">Wall Corkboard</div>

          {/* Mounted Candle Shelf state */}
          {isCandleMounted ? (
            <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-amber-900/80 border-2 border-amber-500 rounded p-2 text-center w-36 shadow-2xl animate-bounce">
              <div className="w-3 h-8 bg-amber-200 mx-auto rounded-t relative">
                <div className="w-2 h-3 bg-amber-400 rounded-full mx-auto -mt-2 animate-pulse"></div>
              </div>
              <p className="text-[10px] font-bold text-amber-200 mt-1">Candle Mounted on Box!</p>
            </div>
          ) : (
            <div className="flex justify-around items-end mb-2">
              <div className="text-center">
                <div className="w-4 h-16 bg-amber-200 mx-auto rounded-t border border-amber-400"></div>
                <span className="text-[10px] text-slate-300">Candle</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-10 bg-amber-900 border border-amber-700 rounded flex items-center justify-center text-[9px] text-amber-200 font-bold">
                  {isBoxUnpacked ? 'EMPTY BOX' : 'BOX + TACKS'}
                </div>
                <span className="text-[10px] text-slate-300">Tack Box</span>
              </div>
              <div className="text-center">
                <div className="w-8 h-6 bg-red-950 border border-red-700 rounded text-[9px] text-red-300 flex items-center justify-center">
                  Matches
                </div>
                <span className="text-[10px] text-slate-300">Matches</span>
              </div>
            </div>
          )}

          <div className="h-3 bg-amber-900/40 w-full rounded border-t border-amber-800"></div>
        </div>

        {/* Action Controls */}
        <div className="space-y-3 flex flex-col justify-between">
          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs text-amber-300 font-medium">
            {message}
          </div>

          <div className="space-y-2">
            <button
              onClick={handleUnpackBox}
              disabled={isBoxUnpacked || isCandleMounted}
              className={`w-full py-2 px-3 text-xs rounded-lg font-bold border transition-all ${
                isBoxUnpacked
                  ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
                  : 'bg-amber-600 hover:bg-amber-500 text-slate-950 border-amber-400'
              }`}
            >
              1. Empty Tacks Out of Box
            </button>

            <button
              onClick={handleMountBox}
              disabled={isCandleMounted}
              className={`w-full py-2 px-3 text-xs rounded-lg font-bold border transition-all ${
                isCandleMounted
                  ? 'bg-emerald-900 text-emerald-300 border-emerald-700'
                  : 'bg-gold-600 hover:bg-gold-500 text-slate-950 border-gold-400'
              }`}
            >
              2. Tack Empty Box to Wall & Place Candle Inside
            </button>
          </div>

          <div className="text-[11px] text-slate-400 bg-slate-900 p-2.5 rounded border border-slate-800">
            <strong>Key Concept:</strong> Functional fixedness keeps us from seeing that the container itself can serve as a functional support platform when separated from its contents.
          </div>
        </div>
      </div>
    </div>
  );
};

// Lab 4 Interactive: Creative Thinking & Divergent Metrics Lab
const DivergentThinkingLabWidget: React.FC = () => {
  const [item, setItem] = useState<string>('Plastic Bottle');
  const [ideas, setIdeas] = useState<string[]>([]);
  const [inputIdea, setInputIdea] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Household');

  const categories = ['Household', 'Art/Craft', 'Tool/Engineering', 'Weapon/Defense', 'Games/Toys'];

  const handleAddIdea = () => {
    if (!inputIdea.trim()) return;
    setIdeas([...ideas, `${inputIdea} (${selectedCategory})`]);
    setInputIdea('');
    audioManager.play('pop');
  };

  const fluency = ideas.length;
  const categoriesUsed = new Set(ideas.map(i => i.split('(')[1])).size;

  return (
    <div className="bg-slate-950 p-4 rounded-xl border border-rose-800/80 text-white space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-rose-300">Divergent Thinking Metric Workbench (Guilford Battery)</h3>
        <span className="text-xs text-rose-400 bg-rose-950/80 px-2.5 py-1 rounded border border-rose-800">
          Target Object: <strong>{item}</strong>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input & Form */}
        <div className="space-y-3">
          <label className="text-xs text-slate-300 font-semibold block">Propose a novel use for {item}:</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputIdea}
              onChange={(e) => setInputIdea(e.target.value)}
              placeholder="e.g. Cut into a garden funnel"
              className="bg-slate-900 border border-slate-700 text-xs rounded-lg px-3 py-2 text-white flex-1 focus:outline-none focus:border-rose-500"
            />
            <button
              onClick={handleAddIdea}
              className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-3 py-2 rounded-lg border border-rose-400"
            >
              Add
            </button>
          </div>

          <div className="flex gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-400 self-center">Category Tag:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[10px] px-2 py-0.5 rounded transition-all ${
                  selectedCategory === cat
                    ? 'bg-rose-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex gap-2 mt-2">
            {['Plastic Bottle', 'Brick', 'Paper Clip'].map((obj) => (
              <button
                key={obj}
                onClick={() => {
                  setItem(obj);
                  setIdeas([]);
                  audioManager.play('tap');
                }}
                className={`text-[11px] px-2.5 py-1 rounded border ${
                  item === obj
                    ? 'bg-slate-800 text-rose-300 border-rose-500'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                Switch to: {obj}
              </button>
            ))}
          </div>
        </div>

        {/* Live Metrics Display */}
        <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-1">Real-time Guilford Metrics</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-950 p-2 rounded border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase">Fluency (Count)</span>
              <p className="text-lg font-extrabold text-gold-400">{fluency}</p>
            </div>
            <div className="bg-slate-950 p-2 rounded border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase">Flexibility (Categories)</span>
              <p className="text-lg font-extrabold text-emerald-400">{categoriesUsed}</p>
            </div>
          </div>

          <div className="max-h-24 overflow-y-auto space-y-1 pr-1">
            {ideas.length === 0 ? (
              <p className="text-[11px] text-slate-500 italic">No alternative uses added yet. Add ideas above!</p>
            ) : (
              ideas.map((idText, idx) => (
                <div key={idx} className="text-[11px] bg-slate-950 px-2 py-1 rounded text-rose-200 border border-slate-800">
                  {idx + 1}. {idText}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT CLASS / FUNCTION
// ==========================================
export default function C11_PsyThinkingCBSESim({ onComplete = DEFAULT_PROPS.onComplete }: SimProps) {
  // Navigation Tabs State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [selectedLabIndex, setSelectedLabIndex] = useState<number>(0);

  // Challenge Mode State
  const [challengeIndex, setChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [challengeCompleted, setChallengeCompleted] = useState<boolean>(false);

  // Diagnostic Test State
  const [diagIndex, setDiagIndex] = useState<number>(0);
  const [diagSelected, setDiagSelected] = useState<number | null>(null);
  const [diagScore, setDiagScore] = useState<number>(0);
  const [diagFinished, setDiagFinished] = useState<boolean>(false);

  // SRS SM-2 & BKT States
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [reviewItems, setReviewItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Hints & Visual Effects State
  const [hintStep, setHintStep] = useState<number>(0);
  const [showHintBubble, setShowHintBubble] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ show: boolean; x: number; y: number }>({ show: false, x: 0, y: 0 });

  // Auto-hint Timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (activeTab === 'challenges' && !showExplanation) {
      timerRef.current = setTimeout(() => {
        setShowHintBubble(true);
        audioManager.play('hint');
      }, 12000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeTab, challengeIndex, showExplanation]);

  // Handle Challenge Answer Submission
  const handleAnswerChallenge = (optionIdx: number) => {
    if (showExplanation) return;
    setSelectedOption(optionIdx);
    setShowExplanation(true);

    const currentChallenge = CHALLENGES[challengeIndex];
    const isCorrect = optionIdx === currentChallenge.correctIndex;

    // Update BKT & SM-2
    const currentBKT = bktStates[currentChallenge.nodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktStates((prev) => ({ ...prev, [currentChallenge.nodeId]: updatedBKT }));

    const currentSRS = reviewItems[currentChallenge.nodeId] || createReviewItem(currentChallenge.nodeId);
    const updatedSRS = sm2Update(currentSRS, isCorrect ? 4 : 1);
    setReviewItems((prev) => ({ ...prev, [currentChallenge.nodeId]: updatedSRS }));

    if (isCorrect) {
      setScore((prev) => prev + 10);
      audioManager.play('success');
      audioManager.play('sparkle');
      speechManager.speak('Correct analysis! Outstanding cognitive clarity.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      audioManager.play('error');
      speechManager.speak('Incorrect choice. Review the cognitive mechanism and try again.');
    }
  };

  // Next Challenge Navigation
  const handleNextChallenge = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    setShowHintBubble(false);
    setHintStep(0);

    if (challengeIndex < CHALLENGES.length - 1) {
      setChallengeIndex((prev) => prev + 1);
      audioManager.play('swoop');
    } else {
      setChallengeCompleted(true);
      setShowSuccessBanner(true);
      audioManager.play('celebration');
      recordGameScore('C11_PSY_THINKING', score, 230);
      if (onComplete) onComplete(score);
    }
  };

  // Cycle Hint Step
  const handleRequestHint = () => {
    setShowHintBubble(true);
    setHintStep((prev) => (prev + 1) % 3);
    audioManager.play('hint');
  };

  // Handle Diagnostic Question Answer
  const handleDiagnosticAnswer = (optIdx: number) => {
    if (diagSelected !== null) return;
    setDiagSelected(optIdx);
    const q = DIAGNOSTIC_QUESTIONS[diagIndex];
    if (optIdx === q.correctIndex) {
      setDiagScore((prev) => prev + 1);
      audioManager.play('chime');
    } else {
      audioManager.play('drop-wrong');
    }
  };

  const handleNextDiagnostic = () => {
    setDiagSelected(null);
    if (diagIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setDiagIndex((prev) => prev + 1);
    } else {
      setDiagFinished(true);
      audioManager.play('celebration');
    }
  };

  // Compute Overall Mastery Percentage
  const overallMastery = useMemo(() => {
    let total = 0;
    ALL_NODE_IDS.forEach((id) => {
      const bkt = bktStates[id];
      total += bkt ? masteryProb(bkt) : 0;
    });
    return Math.round((total / ALL_NODE_IDS.length) * 100);
  }, [bktStates]);

  const currentChal = CHALLENGES[challengeIndex];

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 space-y-6 select-none">
      {/* HEADER BAR */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900 border border-slate-800 rounded-2xl p-4 gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold-500 to-gold-600 flex items-center justify-center font-black text-xl text-white shadow-lg">
            Ψ
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
              THINKING & PSYCHOLINGUISTICS
              <span className="text-xs font-normal bg-gold-950 text-gold-300 border border-gold-800 px-2 py-0.5 rounded-full">
                ISC Class 11
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Interactive Cognitive Psychology Laboratory • 26 Core Curriculum Nodes
            </p>
          </div>
        </div>

        {/* Global Progress & Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs">
            <span className="text-slate-400">Mastery:</span>
            <span className="font-bold text-gold-400">{overallMastery}%</span>
            <div className="w-16 bg-slate-800 h-2 rounded-full overflow-hidden ml-1">
              <div
                className="bg-gradient-to-r from-gold-500 to-gold-500 h-full transition-all duration-500"
                style={{ width: `${overallMastery}%` }}
              ></div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => {
                setActiveTab('discovery');
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'discovery'
                  ? 'bg-gold-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1. Discovery
            </button>
            <button
              onClick={() => {
                setActiveTab('lab');
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'lab'
                  ? 'bg-gold-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2. Cognitive Labs
            </button>
            <button
              onClick={() => {
                setActiveTab('challenges');
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'challenges'
                  ? 'bg-gold-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3. Challenges ({challengeIndex + 1}/23)
            </button>
            <button
              onClick={() => {
                setActiveTab('summary');
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'summary'
                  ? 'bg-gold-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              4. Summary & Audit
            </button>
          </div>
        </div>
      </header>

      {/* GLOBAL VISUAL FEEDBACK COMPONENTS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Cognitive Mastery Complete! All 23 Challenges Cleared!" />
      <SparkleBurst show={sparklePos.show} x={sparklePos.x} y={sparklePos.y} />

      {/* ========================================== */}
      {/* TAB 1: DISCOVERY & SCENARIO */}
      {/* ========================================== */}
      {activeTab === 'discovery' && (
        <div className="space-y-6">
          {/* Scenario Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-gold-950 to-slate-900 border border-gold-900/60 rounded-2xl p-6 shadow-xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-gold-900/60 text-gold-300 rounded text-xs font-bold border border-gold-700">
                SCENARIO NARRATIVE
              </span>
              <h2 className="text-xl font-bold text-white">{SCENARIO.title}</h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-xs italic bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              {SCENARIO.context}
            </p>
          </div>

          {/* Discovery Question Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gold-400"></span>
              Discovery Challenge: Counterintuitive Cognitive Paradox
            </h3>
            <p className="text-sm text-slate-200">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (idx === DISCOVERY_QUESTION.correctIndex) {
                      audioManager.play('drop-correct');
                      speechManager.speak('Precisely! Functional fixedness blinds us to creative re-purposing.');
                    } else {
                      audioManager.play('drop-wrong');
                    }
                  }}
                  className="p-3 bg-slate-950 hover:bg-slate-800 rounded-xl text-xs text-left text-slate-300 border border-slate-800 hover:border-gold-500/50 transition-all flex items-start gap-2"
                >
                  <span className="font-bold text-gold-400">{String.fromCharCode(65 + idx)}.</span>
                  <span>{opt}</span>
                </button>
              ))}
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs text-slate-400">
              <strong className="text-gold-400">Key Takeaway Hint:</strong> {DISCOVERY_QUESTION.hintAfter}
            </div>
          </div>

          {/* Mandatory Prediction Questions Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gold-400"></span>
              Hypothesis & Prediction Questions
            </h3>

            <div className="space-y-6">
              {PREDICTION_QUESTIONS.map((pq, pIdx) => (
                <div key={pIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-xs font-semibold text-slate-200">{pq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {pq.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          if (oIdx === pq.correctIndex) {
                            audioManager.play('chime');
                            speechManager.speak('Hypothesis verified! Verify this in the interactive lab.');
                          } else {
                            audioManager.play('drop-wrong');
                          }
                        }}
                        className="p-2.5 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs text-left text-slate-300 border border-slate-800 hover:border-gold-500 transition-all"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-gold-400 italic">Verify Instruction: {pq.verifyInstruction}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SVG Visualizer Overview */}
          <MentalRepresentationDiagram activeTab={activeTab} />
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 2: INTERACTIVE LABS */}
      {/* ========================================== */}
      {activeTab === 'lab' && (
        <div className="space-y-6">
          {/* Exploration Steps Selector */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <h3 className="text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider">
              Select Experimental Laboratory (5 Exploration Labs)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedLabIndex(idx);
                    audioManager.play('pop');
                  }}
                  className={`p-3 rounded-xl text-xs text-left font-semibold border transition-all ${
                    selectedLabIndex === idx
                      ? 'bg-gold-600 text-white border-gold-400 shadow-lg'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="text-[10px] opacity-75 mb-0.5">Lab {idx + 1}</div>
                  <div className="truncate">{step.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Lab Details & Interactive Component */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gold-300">
                  {EXPLORATION_STEPS[selectedLabIndex].title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {EXPLORATION_STEPS[selectedLabIndex].instruction}
                </p>
              </div>
              <span className="text-xs bg-gold-950 text-gold-300 px-2.5 py-1 rounded border border-gold-800">
                Node: {EXPLORATION_STEPS[selectedLabIndex].nodeId}
              </span>
            </div>

            {/* Interactive Lab Widgets Switcher */}
            {selectedLabIndex === 0 && <MentalRotationLabWidget />}
            {selectedLabIndex === 1 && <ProblemSolvingLabWidget />}
            {selectedLabIndex === 2 && (
              <div className="bg-slate-950 p-4 rounded-xl border border-gold-800 space-y-4 text-white">
                <h4 className="text-sm font-bold text-gold-300">Syllogistic Deductive Reasoning Workbench</h4>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs space-y-2">
                  <p className="font-semibold text-gold-400">Premise 1: All psychological phenomena are brain-based.</p>
                  <p className="font-semibold text-gold-400">Premise 2: Memory is a psychological phenomenon.</p>
                  <p className="font-bold text-emerald-400">Conclusion: Therefore, memory is brain-based.</p>
                  <p className="text-[11px] text-slate-400">Status: Deductively Valid & Sound Argument!</p>
                </div>
              </div>
            )}
            {selectedLabIndex === 3 && <DivergentThinkingLabWidget />}
            {selectedLabIndex === 4 && (
              <div className="bg-slate-950 p-4 rounded-xl border border-emerald-800 space-y-4 text-white">
                <h4 className="text-sm font-bold text-emerald-300">Language Acquisition Simulator (Skinner vs Chomsky)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-900 p-3 rounded border border-slate-800">
                    <h5 className="font-bold text-amber-400 mb-1">Skinnerian Operant Model</h5>
                    <p className="text-slate-400 text-[11px]">Reinforcement Frequency: High</p>
                    <p className="text-slate-400 text-[11px]">Vocabulary Growth: Linear scaling with adult modeling.</p>
                  </div>
                  <div className="bg-slate-900 p-3 rounded border border-slate-800">
                    <h5 className="font-bold text-rose-400 mb-1">Chomsky Nativist LAD Model</h5>
                    <p className="text-slate-400 text-[11px]">Universal Grammar: Active</p>
                    <p className="text-slate-400 text-[11px]">Over-regularization ("goed", "foots") proves rule application beyond imitation!</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SVG Diagram 2 */}
          <CreativeProcessDiagram />

          {/* Observation Questions Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              Empirical Observation Questions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {OBSERVATION_QUESTIONS.map((oq, oIdx) => (
                <div key={oIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-xs font-semibold text-slate-200">{oq.question}</p>
                  <div className="space-y-2">
                    {oq.observableOptions.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => {
                          if (optIdx === oq.correctIndex) {
                            audioManager.play('drop-correct');
                            speechManager.speak('Accurate observation!');
                          } else {
                            audioManager.play('drop-wrong');
                          }
                        }}
                        className="w-full p-2.5 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs text-left text-slate-300 border border-slate-800 hover:border-emerald-500 transition-all"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 3: PROGRESSIVE CHALLENGES (23) */}
      {/* ========================================== */}
      {activeTab === 'challenges' && (
        <div className="space-y-6">
          {/* Challenge Progress Header */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-gold-950 border border-gold-700 text-gold-300 flex items-center justify-center font-bold text-xs">
                #{challengeIndex + 1}
              </span>
              <div>
                <span className="text-xs text-slate-400 block">Competency Level: {currentChal.competencyLevel}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                  {currentChal.difficulty} Tier • Node {currentChal.nodeId}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRequestHint}
                className="bg-amber-950/60 hover:bg-amber-900 text-amber-300 border border-amber-800 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all"
              >
                💡 Need Hint? ({hintStep + 1}/3)
              </button>
              <span className="text-xs text-slate-400 font-medium">Score: {score} pts</span>
            </div>
          </div>

          <HintBubble show={showHintBubble} text={currentChal.hints[hintStep]} />

          {/* Challenge Question Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-white leading-relaxed">{currentChal.question}</h3>

            {/* Options List */}
            <div className="space-y-3">
              {currentChal.options?.map((opt, idx) => {
                let btnStyle = 'bg-slate-950 text-slate-300 border-slate-800 hover:border-gold-500/50';
                if (showExplanation) {
                  if (idx === currentChal.correctIndex) {
                    btnStyle = 'bg-emerald-950/80 text-emerald-200 border-emerald-500 font-bold';
                  } else if (idx === selectedOption) {
                    btnStyle = 'bg-rose-950/80 text-rose-200 border-rose-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={showExplanation}
                    onClick={() => handleAnswerChallenge(idx)}
                    className={`w-full p-4 rounded-xl text-xs text-left border transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-gold-400 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation & Next Step */}
            {showExplanation && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 animate-fadeIn">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-gold-400">Psychological Explanation</span>
                  <span className="text-[10px] text-slate-400">SM-2 Spaced Repetition Updated</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{currentChal.explanation}</p>
                <button
                  onClick={handleNextChallenge}
                  className="w-full py-3 bg-gradient-to-r from-gold-600 to-gold-600 hover:from-gold-500 hover:to-gold-500 text-white font-bold rounded-xl text-xs shadow-lg transition-all"
                >
                  {challengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete Challenge Module'}
                </button>
              </div>
            )}
          </div>

          <LanguageThoughtDiagram />
        </div>
      )}

      {/* ========================================== */}
      {/* TAB 4: SUMMARY, DIAGNOSTIC & REAL-WORLD */}
      {/* ========================================== */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          {/* Diagnostic Test Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gold-400"></span>
                ISC Diagnostic Assessment (8 Questions)
              </h3>
              <span className="text-xs text-slate-400">
                Score: {diagScore} / {DIAGNOSTIC_QUESTIONS.length}
              </span>
            </div>

            {!diagFinished ? (
              <div className="space-y-4">
                <p className="text-sm font-semibold text-slate-200">
                  {diagIndex + 1}. {DIAGNOSTIC_QUESTIONS[diagIndex].question}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {DIAGNOSTIC_QUESTIONS[diagIndex].options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      disabled={diagSelected !== null}
                      onClick={() => handleDiagnosticAnswer(oIdx)}
                      className={`p-3 rounded-xl text-xs text-left border transition-all ${
                        diagSelected === oIdx
                          ? oIdx === DIAGNOSTIC_QUESTIONS[diagIndex].correctIndex
                            ? 'bg-emerald-950 text-emerald-200 border-emerald-500'
                            : 'bg-rose-950 text-rose-200 border-rose-500'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {diagSelected !== null && (
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-2">
                    <p className="text-gold-400 font-bold">Explanation:</p>
                    <p>{DIAGNOSTIC_QUESTIONS[diagIndex].explanation}</p>
                    <button
                      onClick={handleNextDiagnostic}
                      className="mt-2 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs px-4 py-2 rounded-lg"
                    >
                      Next Diagnostic Question
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-emerald-950/40 border border-emerald-800 p-4 rounded-xl text-center space-y-2">
                <h4 className="text-lg font-bold text-emerald-300">Diagnostic Assessment Complete!</h4>
                <p className="text-xs text-slate-300">
                  You scored {diagScore} out of {DIAGNOSTIC_QUESTIONS.length} on the ISC Diagnostic Evaluation.
                </p>
              </div>
            )}
          </div>

          {/* Real World Activity Render */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {REAL_WORLD_ACTIVITY.steps.map((st, sIdx) => (
                <div key={sIdx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                  <span className="text-amber-400 font-bold block mb-1">Step {sIdx + 1}</span>
                  <p>{st}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Misconceptions Review */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
              Common Cognitive Psychology Misconceptions & Corrections
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {MISCONCEPTIONS.map((m) => (
                <div key={m.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-rose-300">{m.title}</h4>
                  <p className="text-[11px] text-slate-400 line-through">Misconception: {m.misconception}</p>
                  <p className="text-[11px] text-emerald-400 font-semibold">Correction: {m.correction}</p>
                  <p className="text-[10px] text-slate-500">{m.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}