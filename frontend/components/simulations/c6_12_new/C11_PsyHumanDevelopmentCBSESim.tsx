'use client';

import React, { useState, useEffect, useRef, useId } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// CONSTANTS & NODE DEFINITIONS
// ==========================================

const ALL_NODE_IDS = [
  'c11_psy_cbse_001',
  'c11_psy_cbse_002',
  'c11_psy_cbse_003',
  'c11_psy_cbse_004',
  'c11_psy_cbse_005',
  'c11_psy_cbse_006',
  'c11_psy_cbse_007',
  'c11_psy_cbse_008',
  'c11_psy_cbse_009',
  'c11_psy_cbse_010',
  'c11_psy_cbse_011',
  'c11_psy_cbse_012',
  'c11_psy_cbse_013',
  'c11_psy_cbse_014',
  'c11_psy_cbse_015',
  'c11_psy_cbse_016',
  'c11_psy_cbse_017',
  'c11_psy_cbse_018',
  'c11_psy_cbse_019',
  'c11_psy_cbse_020',
  'c11_psy_cbse_021',
  'c11_psy_cbse_022',
  'c11_psy_cbse_023',
  'c11_psy_cbse_024',
  'c11_psy_cbse_025',
  'c11_psy_cbse_026',
  'c11_psy_cbse_027',
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

const SCENARIO = {
  title: 'Human Development & Behavioural Dynamics Laboratory',
  intro: 'Welcome to the Advanced Life-Span Developmental Psychology Laboratory. Here you will examine the physical, cognitive, socio-emotional, and ecological trajectories that shape human growth from conception through late adulthood.',
  context: 'Through interactive visual simulations, empirical scenario testing, and diagnostic tasks, you will analyze motor development trends, Piagetian cognitive stages, Bronfenbrenner’s ecological systems, Kohlberg’s moral reasoning, and identity formation dynamics.',
};

const DISCOVERY_QUESTION = {
  question: 'A 4-year-old child sees liquid poured from a short, wide glass into a tall, thin glass. The child insists there is now "more liquid" in the tall glass despite seeing that no liquid was added or removed. What cognitive phenomenon explains this observation?',
  options: [
    'The child lacks formal operational deductive logic.',
    'The child exhibits centration and lacks the concept of conservation during the preoperational stage.',
    'The child has not achieved object permanence yet.',
    'The child is displaying post-conventional moral reasoning failure.',
  ],
  correctIndex: 1,
  hintAfter: 'Children in the preoperational stage (ages 2-7) focus on a single salient feature (height) while ignoring width, demonstrating centration and lack of conservation.',
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Ecological Systems & Lifespan Contexts',
    instruction: 'Explore Bronfenbrenner’s Ecological Systems Model by toggling system layers from Microsystem to Chronosystem to analyze environmental influences on developmental outcomes.',
    interactionType: 'ecological-explorer',
    nodeId: 'c11_psy_cbse_024',
  },
  {
    title: 'Lab 2: Heredity, Teratogens & Prenatal Dynamics',
    instruction: 'Simulate gene-environment interaction and manipulate teratogen exposure windows during embryonic vs. fetal stages to observe phenotypic variations.',
    interactionType: 'genetics-teratogen-sim',
    nodeId: 'c11_psy_cbse_008',
  },
  {
    title: 'Lab 3: Infant Reflexes & Motor Development Trends',
    instruction: 'Test infant motor milestones while adjusting parameters for Cephalocaudal (head-to-toe) and Proximodistal (center-to-outward) directional axes.',
    interactionType: 'motor-trends-lab',
    nodeId: 'c11_psy_cbse_013',
  },
  {
    title: 'Lab 4: Piagetian Cognitive Experiments & Conservation',
    instruction: 'Perform clinical visual trials for Object Permanence, Conservation of Liquid/Mass, Egocentrism (Three-Mountains Task), and Formal Hypotheses Testing.',
    interactionType: 'piagetian-lab',
    nodeId: 'c11_psy_cbse_015',
  },
  {
    title: 'Lab 5: Moral Development & Identity Formation',
    instruction: 'Simulate Heinz’s Dilemma and Eriksonian Identity Statuses (Diffusions, Foreclosure, Moratorium, Achievement) across socio-cultural contexts.',
    interactionType: 'moral-identity-lab',
    nodeId: 'c11_psy_cbse_018',
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: 'If a newborn infant’s palm is touched with an object, the infant immediately wraps fingers around it. What type of developmental mechanism is being demonstrated?',
    options: [
      'Learned motor strategy developed through scaffolding',
      'Inborn survival reflex known as the Grasping (Palmar) reflex',
      'Proximodistal voluntary motor control achievement',
      'Formal operational motor mastery',
    ],
    correctIndex: 1,
    verifyInstruction: 'Verify in Lab 3 by selecting Infant Reflexes and testing tactile stimulation.',
    nodeId: 'c11_psy_cbse_009',
  },
  {
    question: 'During adolescence, an individual believes that everyone in their school is hyper-focused on their slight physical flaw. This cognitive distortion is best termed:',
    options: [
      'Personal Fable',
      'Imaginary Audience',
      'Animistic Thinking',
      'Post-conventional Egocentrism',
    ],
    correctIndex: 1,
    verifyInstruction: 'Verify in Lab 5 under Adolescent Cognition and Egocentrism dynamics.',
    nodeId: 'c11_psy_cbse_022',
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to cognitive reaction time and processing speed as an individual transitions into late adulthood (Old Age)?',
    options: [
      'Fluid intelligence increases while processing speed remains completely unchanged.',
      'Sensory acuity and neural processing speed experience decline, but crystallized intelligence remains relatively stable.',
      'Crystallized intelligence drops immediately to zero while fluid speed doubles.',
      'Reflexive speed increases due to compensatory motor hypertrophy.',
    ],
    correctIndex: 1,
    nodeId: 'c11_psy_cbse_026',
  },
  {
    question: 'In Mary Ainsworth’s Strange Situation, an infant who becomes upset when the mother leaves but quickly seeks comfort and calms down upon her return demonstrates:',
    options: [
      'Insecure Avoidant Attachment',
      'Secure Attachment',
      'Insecure Ambivalent / Resistant Attachment',
      'Disorganized Attachment',
    ],
    correctIndex: 1,
    nodeId: 'c11_psy_cbse_012',
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Adolescent & Life-Span Developmental Intervention Plan',
  description: 'As a developmental psychologist in a educational guidance clinic, you must formulate a comprehensive lifespan support strategy for a student navigating identity crisis, peer influence, and academic stress within their ecological system.',
  steps: [
    'Step 1: Map the individual’s Microsystem (family, peers, school) and Exosystem (parents’ workplace stress, community assets).',
    'Step 2: Assess cognitive developmental stage (Concrete vs. Formal Operations) to design tailored problem-solving strategies.',
    'Step 3: Evaluate identity status (Moratorium vs. Foreclosure) using Erikson’s psychosocial framework.',
    'Step 4: Formulate a multi-layered intervention plan addressing self-concept, moral reasoning, and emotional resilience.',
  ],
};

const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    title: 'Growth vs. Development',
    misconception: 'Growth and development are identical terms that mean getting bigger in physical size.',
    reality: 'Growth refers specifically to quantitative physical changes (height, weight), whereas development is a qualitative, progressive, orderly process spanning physical, cognitive, and socio-emotional domains across life.',
    correction: 'Remember: Growth is quantitative and stops at maturity; Development is qualitative and continues throughout life (lifespan perspective).',
    nodeId: 'c11_psy_cbse_004',
  },
  {
    id: 'misc_2',
    title: 'Heredity vs. Environment',
    misconception: 'Genotype strictly dictates all human traits and behaviors regardless of environment.',
    reality: 'Phenotype is the result of dynamic Gene-Environment Interactions (GxE). Epigenetic factors dictate how genotype is expressed based on environmental enrichment or adversity.',
    correction: 'Heredity sets potential limits, but environment determines where within those limits an individual actually develops.',
    nodeId: 'c11_psy_cbse_005',
  },
  {
    id: 'misc_3',
    title: 'Object Permanence Timeline',
    misconception: 'Infants understand that hidden objects still exist right from birth.',
    reality: 'Object permanence develops gradually during Piaget’s sensorimotor stage (typically around 8–12 months).',
    correction: 'Prior to ~8 months, "out of sight" is literally "out of mind" for infants according to classical Piagetian theory.',
    nodeId: 'c11_psy_cbse_011',
  },
  {
    id: 'misc_4',
    title: 'Egocentrism in Childhood',
    misconception: 'Childhood egocentrism means the child is selfish and self-centered in a moral sense.',
    reality: 'Egocentrism in Piagetian preoperational theory refers to cognitive inability to take another person’s visual or conceptual perspective, not emotional selfishness.',
    correction: 'Egocentrism is a cognitive limitation (e.g., assuming others see what they see), not an intentional behavioral defect.',
    nodeId: 'c11_psy_cbse_014',
  },
  {
    id: 'misc_5',
    title: 'Adolescent Risk-Taking',
    misconception: 'Adolescent risk-taking occurs because teenagers are completely unable to understand risks.',
    reality: 'Adolescents understand risks intellectually, but their socio-emotional brain network (limbic system) matures faster than cognitive control regions (prefrontal cortex), coupled with the "Personal Fable" belief of invulnerability.',
    correction: 'Risk-taking stems from asynchronous neural maturation and personal fable dynamics, not pure lack of risk awareness.',
    nodeId: 'c11_psy_cbse_022',
  },
  {
    id: 'misc_6',
    title: 'Aging and Intelligence',
    misconception: 'All mental abilities decay rapidly and equally in old age.',
    reality: 'While fluid intelligence (speed of processing, memory capacity) shows age-related decline, crystallized intelligence (accumulated knowledge, wisdom, vocabulary) often remains intact or improves.',
    correction: 'Distinguish fluid intelligence (declines) from crystallized intelligence (sustained/enhanced) in late adulthood.',
    nodeId: 'c11_psy_cbse_026',
  },
];

// ==========================================
// CHALLENGES ARRAY (24 Items Across 3 Tiers)
// ==========================================

interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'mcq' | 'sort' | 'numeric' | 'match';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string | number;
  matches?: { key: string; value: string }[];
  sortedOrder?: string[];
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (8 Challenges) ---
  {
    id: 'c_f1',
    nodeId: 'c11_psy_cbse_001',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Basic Concept Identification',
    question: 'Development is defined as a pattern of change that begins at conception and continues through:',
    options: [
      'Adolescence only',
      'Early adulthood',
      'The entire life-span until death',
      'Physical maturation peak at age 25',
    ],
    correctIndex: 2,
    explanation: 'Development is lifelong, multi-dimensional, multi-directional, plastic, historical, and multi-disciplinary, continuing throughout the entire lifespan.',
    hints: [
      'Consider the life-span perspective.',
      'Does human development stop after childhood?',
      'It encompasses conception to the end of life.',
    ],
  },
  {
    id: 'c_f2',
    nodeId: 'c11_psy_cbse_003',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Process Classification',
    question: 'Which processes involve changes in an individual’s physical nature, such as brain development, height, weight, and motor skills?',
    options: ['Cognitive processes', 'Biological processes', 'Socio-emotional processes', 'Ecological processes'],
    correctIndex: 1,
    explanation: 'Biological processes involve physical changes in body structures, brain architecture, and motor skills.',
    hints: [
      'Think about bodily and organic growth.',
      'Which word relates to biological structures?',
      'Biological processes drive body growth and physical maturation.',
    ],
  },
  {
    id: 'c_f3',
    nodeId: 'c11_psy_cbse_004',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Term Distinction',
    question: 'Quantitative change in body dimensions such as height and weight is referred to as:',
    options: ['Development', 'Growth', 'Maturation', 'Evolution'],
    correctIndex: 1,
    explanation: 'Growth refers specifically to physical, quantitative increase in size or mass.',
    hints: [
      'It is measurable in centimeters and kilograms.',
      'Distinguish between qualitative and quantitative shifts.',
      'Quantitative increase is termed growth.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'c_f4',
    nodeId: 'c11_psy_cbse_008',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Risk Factor Identification',
    question: 'Environmental agents such as drugs, radiation, or maternal infections that can cause birth defects are called:',
    options: ['Mutagens', 'Teratogens', 'Pathogens', 'Carcinogens'],
    correctIndex: 1,
    explanation: 'Teratogens are environmental agents that cause physical or developmental damage to an embryo or fetus.',
    hints: [
      'From the Greek word "terato" meaning monster or marvel.',
      'These factors affect prenatal health.',
      'They are termed teratogens.',
    ],
  },
  {
    id: 'c_f5',
    nodeId: 'c11_psy_cbse_009',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Infant Reflex Identification',
    question: 'When an infant’s cheek is stroked, the baby turns its head toward the touch and opens its mouth. This reflex is called the:',
    options: ['Moro reflex', 'Babinski reflex', 'Rooting reflex', 'Sucking reflex'],
    correctIndex: 2,
    explanation: 'The Rooting reflex aids nursing by directing the infant’s mouth toward tactile contact on the cheek.',
    hints: [
      'It helps the infant find food.',
      'The baby roots around for the nipple.',
      'It is the rooting reflex.',
    ],
  },
  {
    id: 'c_f6',
    nodeId: 'c11_psy_cbse_011',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Piaget Stage Mapping',
    question: 'According to Piaget, during which stage does a child develop object permanence?',
    options: [
      'Preoperational stage',
      'Sensorimotor stage',
      'Concrete operational stage',
      'Formal operational stage',
    ],
    correctIndex: 1,
    explanation: 'Object permanence is the key cognitive milestone of the sensorimotor stage (birth to 2 years).',
    hints: [
      'This stage covers birth to 2 years.',
      'It relies on senses and motor action.',
      'Sensorimotor stage.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'c_f7',
    nodeId: 'c11_psy_cbse_013',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Directional Principle Identification',
    question: 'The trend of motor control developing from head to foot is known as the:',
    options: [
      'Proximodistal trend',
      'Cephalocaudal trend',
      'Socio-centric trend',
      'Sequential trend',
    ],
    correctIndex: 1,
    explanation: 'Cephalocaudal (head-to-tail) trend states that development proceeds from head downward.',
    hints: [
      'Cephalo = head, caudal = tail.',
      'Head control comes before sitting or walking.',
      'Cephalocaudal trend.',
    ],
  },
  {
    id: 'c_f8',
    nodeId: 'c11_psy_cbse_019',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Pubertal Change Recall',
    question: 'The period of rapid physical maturation involving hormonal and bodily changes in early adolescence is termed:',
    options: ['Menopause', 'Puberty', 'Senescence', 'Adulthood transition'],
    correctIndex: 1,
    explanation: 'Puberty is the period of sexual maturation and rapid physical development during early adolescence.',
    hints: [
      'Involves secondary sexual characteristics.',
      'Marks the transition to physical sexual maturity.',
      'Puberty.',
    ],
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'c_s1',
    nodeId: 'c11_psy_cbse_005',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Genetics vs Environment Analysis',
    question: 'An individual’s actual observable physical and behavioral characteristics constitute their:',
    options: ['Genotype', 'Phenotype', 'Karyotype', 'Genome'],
    correctIndex: 1,
    explanation: 'Phenotype is the observable expression of genetic blueprint (genotype) in interaction with environmental factors.',
    hints: [
      'Genotype is the genetic code; what is observed?',
      'P is for Physical appearance/expressed traits.',
      'Phenotype.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'c_s2',
    nodeId: 'c11_psy_cbse_012',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Psychosocial Theory Analysis',
    question: 'In Erikson’s first psychosocial stage (Trust vs. Mistrust), what primary caregiver quality fosters a sense of trust?',
    options: [
      'Strict discipline and early independence training',
      'Consistent, warm, and responsive caregiving',
      'High academic stimulation and structured learning',
      'Overprotective isolation from external environment',
    ],
    correctIndex: 1,
    explanation: 'Consistent and responsive caregiving allows infants to view the world as safe and predictable.',
    hints: [
      'How does an infant know the world is safe?',
      'Relates to responsiveness and warmth.',
      'Consistent, warm caregiving.',
    ],
  },
  {
    id: 'c_s3',
    nodeId: 'c11_psy_cbse_014',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Piaget Cognitive Limitation Analysis',
    question: 'A 4-year-old child believes that the sun follows them when they go for a walk and that rocks feel pain. This illustrates:',
    options: ['Egocentrism & Animism', 'Conservation & Reversibility', 'Formal Deductive Logic', 'Hypothetical Thinking'],
    correctIndex: 0,
    explanation: 'Attributing life-like qualities to inanimate objects is Animism; viewing the world solely from one’s perspective is Egocentrism.',
    hints: [
      'Believing inanimate objects have life = Animism.',
      'Centering world around oneself = Egocentrism.',
      'Egocentrism & Animism.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'c_s4',
    nodeId: 'c11_psy_cbse_015',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Cognitive Operation Analysis',
    question: 'A child in the Concrete Operational stage understands that pouring juice into a taller glass does not change its volume because of:',
    options: [
      'Centration and Egocentrism',
      'Decentration and Reversibility',
      'Animistic beliefs',
      'Abstract hypothetical deduction',
    ],
    correctIndex: 1,
    explanation: 'Concrete operational children can decentre (focus on height and width simultaneously) and use reversibility.',
    hints: [
      'They can mental step backward (reversibility).',
      'They look at more than one dimension (decentration).',
      'Decentration and Reversibility.',
    ],
  },
  {
    id: 'c_s5',
    nodeId: 'c11_psy_cbse_018',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Moral Development Classification',
    question: 'In Kohlberg’s theory, a person who refrains from breaking rules strictly to avoid punishment is at which level of moral reasoning?',
    options: [
      'Pre-conventional level (Stage 1)',
      'Conventional level (Stage 3)',
      'Post-conventional level (Stage 5)',
      'Autonomous morality level',
    ],
    correctIndex: 0,
    explanation: 'Stage 1 of Pre-conventional morality focuses on obedience and avoidance of punishment.',
    hints: [
      'It is driven by external consequences (reward/punishment).',
      'The earliest level in Kohlberg’s framework.',
      'Pre-conventional level.',
    ],
  },
  {
    id: 'c_s6',
    nodeId: 'c11_psy_cbse_020',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Adolescent Cognition Evaluation',
    question: 'Formal Operational thought differs from Concrete Operational thought primarily because it enables:',
    options: [
      'Trial-and-error physical manipulation only',
      'Hypothetico-deductive reasoning and systematic hypothesis testing',
      'Reliance on immediate perceptual cues',
      'Animistic belief systems',
    ],
    correctIndex: 1,
    explanation: 'Formal operational thought allows adolescents to think abstractly, consider hypothetical possibilities, and test hypotheses systematically.',
    hints: [
      'Think about "if-then" reasoning.',
      'It moves beyond concrete objects to abstract possibilities.',
      'Hypothetico-deductive reasoning.',
    ],
  },
  {
    id: 'c_s7',
    nodeId: 'c11_psy_cbse_022',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Egocentrism Distortion Analysis',
    question: 'A teenager believes: "No one has ever felt as heartbroken as I feel right now; rules of danger don’t apply to me." This exemplifies:',
    options: ['Imaginary Audience', 'Personal Fable', 'Centration', 'Metacognitive failure'],
    correctIndex: 1,
    explanation: 'The Personal Fable involves a belief in one’s uniqueness and invulnerability to harm.',
    hints: [
      'It is a sense of personal unique story/destiny.',
      '"I am special and immune to danger."',
      'Personal Fable.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'c_s8',
    nodeId: 'c11_psy_cbse_024',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Ecological System Differentiation',
    question: 'In Bronfenbrenner’s theory, the system representing connections between immediate settings (e.g., relationship between home and school) is the:',
    options: ['Microsystem', 'Mesosystem', 'Exosystem', 'Macrosystem'],
    correctIndex: 1,
    explanation: 'The Mesosystem consists of linkages between different microsystems (e.g., family-school interaction).',
    hints: [
      'Micro is immediate single setting.',
      'Meso connects two or more microsystems.',
      'Mesosystem.',
    ],
  },

  // --- ADVANCED TIER (8 Challenges) ---
  {
    id: 'c_a1',
    nodeId: 'c11_psy_cbse_021',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Identity Status Evaluation',
    question: 'According to James Marcia’s expansion of Erikson, an adolescent who has adopted their parents’ career choices without exploring alternatives is in:',
    options: ['Identity Diffusion', 'Identity Foreclosure', 'Identity Moratorium', 'Identity Achievement'],
    correctIndex: 1,
    explanation: 'Identity Foreclosure occurs when commitment is made without prior exploration of alternatives.',
    hints: [
      'High commitment, low exploration.',
      'Prematurely closed off options.',
      'Identity Foreclosure.',
    ],
  },
  {
    id: 'c_a2',
    nodeId: 'c11_psy_cbse_017',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Gender Schema & Role Analysis',
    question: 'Gender Schema Theory suggests that children form gender identity primarily by:',
    options: ['Strict biological chromosomal activation at age 5', 'Developing cognitive schemas of what is gender-appropriate and filtering behavior through them', 'Unconscious oedipal conflict resolution', 'Direct mechanical imitation without cognitive processing'],
    correctIndex: 1,
    explanation: 'Gender Schema Theory emphasizes cognitive networks (schemas) that organize gender-related information and guide self-concept.',
    hints: [
      'Cognitive networks of gender roles.',
      'Active cognitive structuring by the child.',
      'Developing cognitive schemas.',
    ],
  },
  {
    id: 'c_a3',
    nodeId: 'c11_psy_cbse_025',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Adult Psychosocial Stage Synthesis',
    question: 'In Erikson’s stage of Generativity vs. Stagnation (Middle Adulthood), "Generativity" is best expressed by:',
    options: [
      'Focusing exclusively on financial wealth accumulation',
      'Nurturing, guiding, and contributing to the development of the next generation',
      'Retreating into self-absorbed isolation',
      'Achieving physical athletic peaks',
    ],
    correctIndex: 1,
    explanation: 'Generativity involves caring for and guiding younger generations through parenting, mentoring, and productive community contributions.',
    hints: [
      'Focuses on leaving a legacy.',
      'Helping the next generation thrive.',
      'Nurturing and guiding the next generation.',
    ],
  },
  {
    id: 'c_a4',
    nodeId: 'c11_psy_cbse_026',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Gerontological Cognitive Dynamics',
    question: 'Which statement accurately contrasts Fluid and Crystallized intelligence during Late Adulthood?',
    options: [
      'Fluid intelligence increases while Crystallized declines rapidly.',
      'Fluid intelligence (speed, spatial logic) declines, whereas Crystallized intelligence (accumulated vocabulary, wisdom) is preserved or enhanced.',
      'Both intelligence types drop to zero at age 65.',
      'Crystallized intelligence is entirely biological and drops early.',
    ],
    correctIndex: 1,
    explanation: 'Fluid intelligence relies on raw neurophysiological processing (declines with age), whereas Crystallized intelligence depends on accumulated experience and education (sustained).',
    hints: [
      'Fluid = raw speed/processing (declines).',
      'Crystallized = wisdom and knowledge (sustained).',
      'Fluid declines while Crystallized is preserved.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'c_a5',
    nodeId: 'c11_psy_cbse_027',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Thanatological Model Analysis',
    question: 'In Kübler-Ross’s stages of dying (Denial, Anger, Bargaining, Depression, Acceptance), "Bargaining" typically involves:',
    options: [
      'Refusal to believe the diagnosis',
      'Directing frustration toward doctors or family',
      'Attempting to postpone death by making promises to a higher power or seeking extended time',
      'Deep quiet sense of resignation and emotional withdrawal',
    ],
    correctIndex: 2,
    explanation: 'Bargaining is characterized by negotiation (e.g., "If I live until my child’s wedding, I will devote my life to charity").',
    hints: [
      'Negotiating for extra time.',
      'Making promises in exchange for life extension.',
      'Attempting to postpone death through promises.',
    ],
  },
  {
    id: 'c_a6',
    nodeId: 'c11_psy_cbse_023',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Adolescent Pathology Differential',
    question: 'An eating disorder characterized by persistent severe food restriction, extreme fear of gaining weight, and distorted body image is:',
    options: ['Bulimia Nervosa', 'Anorexia Nervosa', 'Binge Eating Disorder', 'Body Dysmorphic Remission'],
    correctIndex: 1,
    explanation: 'Anorexia Nervosa is characterized by self-starvation, intense fear of weight gain, and disturbed perception of body shape.',
    hints: [
      'Self-starvation and extreme weight restriction.',
      'Contrast with bingeing/purging cycle of Bulimia.',
      'Anorexia Nervosa.',
    ],
  },
  {
    id: 'c_a7',
    nodeId: 'c11_psy_cbse_007',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Prenatal Period Timeline Analysis',
    question: 'The period of prenatal development from 2 to 8 weeks after conception, marked by rapid cell differentiation and organogenesis, is the:',
    options: ['Germinal Period', 'Embryonic Period', 'Fetal Period', 'Postnatal Period'],
    correctIndex: 1,
    explanation: 'The Embryonic period (weeks 2-8) is critical because all major organ systems form (organogenesis) and vulnerability to teratogens is peak.',
    hints: [
      'Germinal is weeks 0-2.',
      'Embryonic is weeks 2-8 during organogenesis.',
      'Embryonic Period.',
    ],
  },
  {
    id: 'c_a8',
    nodeId: 'c11_psy_cbse_016',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Self-Concept Evolution Synthesis',
    question: 'How does self-concept shift from Early Childhood (ages 3-5) to Middle/Late Childhood (ages 8-11)?',
    options: [
      'From abstract values to concrete physical traits',
      'From concrete observable physical traits to psychological traits, social comparisons, and realistic self-evaluations',
      'From complex psychological terms to purely external bodily features',
      'Self-concept remains completely static until adulthood',
    ],
    correctIndex: 1,
    explanation: 'In early childhood, self-concept is based on concrete physical traits ("I have brown hair, I can run fast"). In middle/late childhood, it incorporates internal traits and social comparison ("I am popular, kind, and better at math than reading").',
    hints: [
      'Young kids talk about physical features.',
      'Older kids talk about psychological traits and comparison.',
      'Shift from physical traits to psychological/social comparisons.',
    ],
  },
];

// ==========================================
// SVG DIAGRAM COMPONENTS
// ==========================================

const EcologicalSystemsDiagram: React.FC<{ activeSystem: string; onSelectSystem: (sys: string) => void }> = ({
  activeSystem,
  onSelectSystem,
}) => {
  const systems = [
    { id: 'chronosystem', label: 'Chronosystem (Time & Socio-historical Events)', color: '#3b82f6', r: 180 },
    { id: 'macrosystem', label: 'Macrosystem (Cultural Values, Laws, Beliefs)', color: '#8b5cf6', r: 145 },
    { id: 'exosystem', label: 'Exosystem (Parents’ Workplace, Community)', color: '#ec4899', r: 110 },
    { id: 'mesosystem', label: 'Mesosystem (Connections between Microsystems)', color: '#f59e0b', r: 75 },
    { id: 'microsystem', label: 'Microsystem (Family, School, Peers, Neighborhood)', color: '#10b981', r: 40 },
  ];

  return (
    <div className="flex flex-col items-center bg-slate-900 p-4 rounded-xl shadow-inner border border-slate-700">
      <h4 className="text-sm font-bold text-slate-200 mb-2">Bronfenbrenner’s Ecological Systems Model</h4>
      <svg width="400" height="380" viewBox="0 0 400 380" className="cursor-pointer">
        <g transform="translate(200,190)">
          {systems.map((sys) => {
            const isSelected = activeSystem === sys.id;
            return (
              <g key={sys.id} onClick={() => onSelectSystem(sys.id)}>
                <circle
                  r={sys.r}
                  fill={sys.color}
                  fillOpacity={isSelected ? 0.45 : 0.2}
                  stroke={sys.color}
                  strokeWidth={isSelected ? 3.5 : 1.5}
                  strokeDasharray={sys.id === 'chronosystem' ? '6 4' : undefined}
                  className="transition-all duration-300 hover:fill-opacity-40"
                />
                <text
                  y={-sys.r + 14}
                  textAnchor="middle"
                  fill="#f1f5f9"
                  fontSize="10"
                  fontWeight={isSelected ? 'bold' : 'normal'}
                  className="select-none pointer-events-none"
                >
                  {sys.id.toUpperCase()}
                </text>
              </g>
            );
          })}
          {/* Individual Center */}
          <circle r="12" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
          <text y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
            INDIVIDUAL
          </text>
        </g>
      </svg>
      <div className="mt-3 text-xs text-slate-300 text-center max-w-md bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
        <span className="font-semibold text-cyan-400 uppercase">{activeSystem}: </span>
        {activeSystem === 'microsystem' && 'Direct immediate environments (family, school, peer group, neighborhood) where direct face-to-face interactions occur.'}
        {activeSystem === 'mesosystem' && 'Interrelations among two or more microsystems (e.g., interaction between child’s family and school teachers).'}
        {activeSystem === 'exosystem' && 'Social settings that do not contain the individual directly but still affect their development (e.g., parent’s workplace stress).'}
        {activeSystem === 'macrosystem' && 'Overarching cultural values, ideological beliefs, economic systems, and legal structures of the society.'}
        {activeSystem === 'chronosystem' && 'Socio-historical circumstances and developmental transitions over the individual’s lifespan.'}
      </div>
    </div>
  );
};

const PiagetianConservationDiagram: React.FC<{
  stage: 'equal' | 'poured';
  isConserving: boolean;
  onTogglePour: () => void;
}> = ({ stage, isConserving, onTogglePour }) => {
  return (
    <div className="flex flex-col items-center bg-slate-900 p-4 rounded-xl border border-slate-700">
      <h4 className="text-sm font-bold text-slate-200 mb-2">Piaget’s Liquid Conservation Experiment</h4>
      <div className="flex items-end justify-center gap-8 h-48 my-4 w-full">
        {/* Glass A */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-32 border-2 border-slate-400 border-t-0 bg-slate-800/50 rounded-b-md relative flex items-end overflow-hidden">
            <div
              className="w-full bg-cyan-500/70 transition-all duration-700"
              style={{ height: stage === 'equal' ? '60%' : '60%' }}
            />
          </div>
          <span className="text-xs text-slate-300 mt-2 font-semibold">Container A (Standard)</span>
        </div>

        {/* Glass B */}
        <div className="flex flex-col items-center">
          <div
            className={`transition-all duration-700 border-2 border-slate-400 border-t-0 bg-slate-800/50 rounded-b-md relative flex items-end overflow-hidden ${
              stage === 'equal' ? 'w-16 h-32' : 'w-10 h-44'
            }`}
          >
            <div
              className="w-full bg-cyan-500/70 transition-all duration-700"
              style={{ height: stage === 'equal' ? '60%' : '96%' }}
            />
          </div>
          <span className="text-xs text-slate-300 mt-2 font-semibold">
            {stage === 'equal' ? 'Container B (Identical)' : 'Container B (Tall & Thin)'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onTogglePour}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow transition-all"
        >
          {stage === 'equal' ? 'Pour Container B into Tall/Thin Glass' : 'Reset to Equal Glasses'}
        </button>
      </div>

      <div className="mt-3 p-3 bg-slate-800 rounded-lg text-xs text-slate-200 max-w-md border border-slate-700">
        <div className="font-bold text-amber-400 mb-1">
          {stage === 'equal'
            ? 'Baseline: Equal liquid in identical glasses.'
            : isConserving
            ? 'Concrete Operational Logic (Ages 7-11): Decentration & Reversibility applied. "The amount is equal because height is offset by width."'
            : 'Preoperational Logic (Ages 2-7): Centration & Lack of Conservation. "The tall glass has MORE because liquid height is higher!"'}
        </div>
      </div>
    </div>
  );
};

const MotorTrendsDiagram: React.FC<{ cephalocaudalVal: number; setCephalocaudalVal: (v: number) => void }> = ({
  cephalocaudalVal,
  setCephalocaudalVal,
}) => {
  return (
    <div className="flex flex-col items-center bg-slate-900 p-4 rounded-xl border border-slate-700">
      <h4 className="text-sm font-bold text-slate-200 mb-2">Directional Principles of Motor Development</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl my-2">
        {/* Cephalocaudal Trend */}
        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 flex flex-col items-center">
          <span className="text-xs font-bold text-cyan-400 mb-2">1. Cephalocaudal Trend (Head-to-Toe)</span>
          <svg width="140" height="200" viewBox="0 0 140 200" className="bg-slate-900 rounded border border-slate-700">
            {/* Infant Silhouette SVG */}
            <circle cx="70" cy="35" r="22" fill="#38bdf8" opacity={cephalocaudalVal >= 1 ? 1 : 0.3} />
            <rect x="58" y="60" width="24" height="60" rx="6" fill="#818cf8" opacity={cephalocaudalVal >= 2 ? 1 : 0.3} />
            <rect x="52" y="123" width="14" height="55" rx="4" fill="#a78bfa" opacity={cephalocaudalVal >= 3 ? 1 : 0.3} />
            <rect x="74" y="123" width="14" height="55" rx="4" fill="#a78bfa" opacity={cephalocaudalVal >= 3 ? 1 : 0.3} />

            {/* Direction Arrow */}
            <line x1="25" y1="20" x2="25" y2="180" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow)" />
            <path d="M 20,170 L 25,185 L 30,170" fill="#f43f5e" />
          </svg>
          <span className="text-[11px] text-slate-300 mt-2 text-center">
            {cephalocaudalVal === 1 && 'Stage 1: Head & Neck control (holds head up ~2-3 mos)'}
            {cephalocaudalVal === 2 && 'Stage 2: Trunk & Upper body (sits with support ~6 mos)'}
            {cephalocaudalVal === 3 && 'Stage 3: Lower limbs & feet (crawls/walks ~12-14 mos)'}
          </span>
        </div>

        {/* Proximodistal Trend */}
        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 flex flex-col items-center">
          <span className="text-xs font-bold text-emerald-400 mb-2">2. Proximodistal Trend (Center-Outward)</span>
          <svg width="140" height="200" viewBox="0 0 140 200" className="bg-slate-900 rounded border border-slate-700">
            {/* Trunk Center */}
            <circle cx="70" cy="90" r="28" fill="#10b981" />
            {/* Arms / Hands */}
            <circle cx="30" cy="90" r="14" fill="#34d399" opacity={cephalocaudalVal >= 2 ? 1 : 0.3} />
            <circle cx="110" cy="90" r="14" fill="#34d399" opacity={cephalocaudalVal >= 2 ? 1 : 0.3} />
            {/* Fingers */}
            <circle cx="12" cy="90" r="6" fill="#a7f3d0" opacity={cephalocaudalVal >= 3 ? 1 : 0.3} />
            <circle cx="128" cy="90" r="6" fill="#a7f3d0" opacity={cephalocaudalVal >= 3 ? 1 : 0.3} />

            {/* Outward Arrows */}
            <line x1="70" y1="90" x2="125" y2="90" stroke="#f59e0b" strokeWidth="2" />
            <line x1="70" y1="90" x2="15" y2="90" stroke="#f59e0b" strokeWidth="2" />
          </svg>
          <span className="text-[11px] text-slate-300 mt-2 text-center">
            Trunk & shoulder control precedes fine motor grasping of fingers (Palmar to Pincer grasp).
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <label className="text-xs text-slate-300">Motor Progression Stage:</label>
        <input
          type="range"
          min="1"
          max="3"
          value={cephalocaudalVal}
          onChange={(e) => setCephalocaudalVal(parseInt(e.target.value))}
          className="accent-indigo-500 cursor-pointer"
        />
        <span className="text-xs font-bold text-indigo-400">Step {cephalocaudalVal}/3</span>
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function C11_PsyHumanDevelopmentCBSESim({
  onComplete,
}: {
  onComplete?: (score: number) => void;
}) {
  // Tabs: 'discovery' | 'lab' | 'challenges' | 'summary' | 'misconceptions'
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary' | 'misconceptions'>('discovery');

  // Discovery tab state
  const [discoveryChoice, setDiscoveryChoice] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Lab step state
  const [selectedLabStep, setSelectedLabStep] = useState<number>(0);
  const [activeEcologicalSystem, setActiveEcologicalSystem] = useState<string>('microsystem');
  const [conservationStage, setConservationStage] = useState<'equal' | 'poured'>('equal');
  const [isConservingChild, setIsConservingChild] = useState<boolean>(false);
  const [motorStep, setMotorStep] = useState<number>(1);
  const [teratogenExposure, setTeratogenExposure] = useState<number>(2); // 1: low, 2: medium, 3: high
  const [gestationalWeek, setGestationalWeek] = useState<number>(6); // embryonic critical period
  const [moralStageIndex, setMoralStageIndex] = useState<number>(0);

  // Predictions & Observations state
  const [predAnswers, setPredAnswers] = useState<(number | null)[]>([null, null]);
  const [predSubmitted, setPredSubmitted] = useState<boolean[]>([false, false]);
  const [obsAnswers, setObsAnswers] = useState<(number | null)[]>([null, null]);
  const [obsSubmitted, setObsSubmitted] = useState<boolean[]>([false, false]);

  // Challenges state
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const [challengeAttempts, setChallengeAttempts] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintIdx, setCurrentHintIdx] = useState<number>(0);

  // Visual FX & BKT
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparkleCoords, setSparkleCoords] = useState<{ x: number; y: number }>({ x: 400, y: 300 });

  // Inactivity Hint Timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Unique Id for Accessible Radio Inputs
  const radioNameId = useId();

  // BKT States map
  const [bktMap, setBktMap] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  // Auto hint reset after 10s inactivity
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && !challengeSubmitted && !showHint) {
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 10000);
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIdx, activeTab, challengeSubmitted]);

  // Tab switch handler
  const handleTabChange = (tab: 'discovery' | 'lab' | 'challenges' | 'summary' | 'misconceptions') => {
    audioManager.play('tap');
    setActiveTab(tab);
    if (tab === 'lab') {
      speechManager.speak('Entering the Life-Span Developmental Psychology Laboratory. Explore the interactive steps.');
    } else if (tab === 'challenges') {
      speechManager.speak('Welcome to the Mastery Challenges. Test your understanding of human development.');
    }
  };

  // Discovery submission
  const handleDiscoverySubmit = () => {
    if (discoveryChoice === null) return;
    setDiscoverySubmitted(true);
    if (discoveryChoice === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct! Preoperational children exhibit centration and lack conservation.');
      setShowSparkle(true);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Review the explanation on centration and conservation.');
    }
  };

  // Challenge Option Submit
  const handleChallengeSubmit = () => {
    if (selectedOption === null) return;
    const challenge = CHALLENGES[currentChallengeIdx];
    const isCorrect = selectedOption === challenge.correctIndex;

    setChallengeSubmitted(true);
    setChallengeAttempts((prev) => prev + 1);

    // BKT update
    const currentBKT = bktMap[challenge.nodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktMap((prev) => ({ ...prev, [challenge.nodeId]: updatedBKT }));

    // SRS update
    const reviewItem = createReviewItem(challenge.id);
    sm2Update(reviewItem, isCorrect ? 5 : 2);

    if (isCorrect) {
      audioManager.play('drop-correct');
      setChallengeScore((prev) => prev + 10);
      setShowSuccessBanner(true);
      setShowSparkle(true);
      speechManager.speak('Excellent response! Mastery level increased.');

      setTimeout(() => setShowSuccessBanner(false), 2000);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Incorrect. Review the hint and scientific explanation.');
    }
  };

  // Challenge Next
  const handleNextChallenge = () => {
    audioManager.play('whoosh');
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
      setSelectedOption(null);
      setChallengeSubmitted(false);
      setShowHint(false);
      setCurrentHintIdx(0);
    } else {
      // Completed all challenges
      audioManager.play('celebration');
      setShowConfetti(true);
      recordGameScore('c11_psy_human_dev', challengeScore + 10);
      speechManager.speak('Congratulations! You have completed all Human Development challenges.');
      if (onComplete) onComplete(challengeScore + 10);
    }
  };

  // Calculate overall mastery
  const calculateOverallMastery = () => {
    let totalP = 0;
    ALL_NODE_IDS.forEach((id) => {
      const bkt = bktMap[id] || createBKTState();
      totalP += bkt.pKnown;
    });
    return Math.round((totalP / ALL_NODE_IDS.length) * 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-6 flex flex-col items-center select-none">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Challenge Completed!" />
      <SparkleBurst show={showSparkle} x={sparkleCoords.x} y={sparkleCoords.y} />

      {/* HEADER BAR */}
      <header className="w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 mb-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
              CISCE Class 11 Psychology
            </span>
            <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
              Mastery: {calculateOverallMastery()}%
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
            Human Development Simulation Lab
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            {SCENARIO.intro}
          </p>
        </div>

        {/* TOP TAB NAVIGATION */}
        <nav className="flex flex-wrap items-center bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/80 gap-1">
          <button
            onClick={() => handleTabChange('discovery')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'discovery'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            1. Discovery
          </button>
          <button
            onClick={() => handleTabChange('lab')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'lab'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            2. Interactive Labs
          </button>
          <button
            onClick={() => handleTabChange('challenges')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'challenges'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            3. Challenges ({CHALLENGES.length})
          </button>
          <button
            onClick={() => handleTabChange('misconceptions')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'misconceptions'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            4. Misconceptions
          </button>
          <button
            onClick={() => handleTabChange('summary')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'summary'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            5. Application
          </button>
        </nav>
      </header>

      {/* MAIN CONTAINER */}
      <main className="w-full max-w-6xl bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl min-h-[580px]">
        {/* TAB 1: DISCOVERY */}
        {activeTab === 'discovery' && (
          <div className="flex flex-col gap-6">
            <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60">
              <h2 className="text-lg font-bold text-indigo-400 mb-2">Scenario Orientation</h2>
              <p className="text-sm text-slate-300">{SCENARIO.context}</p>
            </div>

            <div className="bg-slate-800/90 p-5 rounded-xl border border-slate-700">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Pre-Lab Assessment Question
              </span>
              <h3 className="text-base font-semibold text-slate-100 mt-2 mb-4">
                {DISCOVERY_QUESTION.question}
              </h3>

              <div className="space-y-2.5">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!discoverySubmitted) {
                        setDiscoveryChoice(idx);
                        audioManager.play('tap');
                      }
                    }}
                    className={`w-full text-left p-3.5 rounded-xl text-xs md:text-sm font-medium transition-all border ${
                      discoveryChoice === idx
                        ? 'bg-indigo-600/30 border-indigo-500 text-white'
                        : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
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
                  disabled={discoveryChoice === null}
                  className="mt-5 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white rounded-xl text-xs font-bold shadow-lg transition-all"
                >
                  Submit Pre-Analysis Answer
                </button>
              ) : (
                <div className="mt-5 p-4 rounded-xl bg-slate-900 border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-sm font-bold ${
                        discoveryChoice === DISCOVERY_QUESTION.correctIndex
                          ? 'text-emerald-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {discoveryChoice === DISCOVERY_QUESTION.correctIndex
                        ? 'Correct Analysis!'
                        : 'Incorrect Concept Identification'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{DISCOVERY_QUESTION.hintAfter}</p>
                  <button
                    onClick={() => handleTabChange('lab')}
                    className="mt-4 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow"
                  >
                    Proceed to Interactive Labs →
                  </button>
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS LIST */}
            <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4">
                Hypothesis Predictions
              </h3>
              <div className="space-y-6">
                {PREDICTION_QUESTIONS.map((pq, pIdx) => (
                  <div key={pIdx} className="bg-slate-900/80 p-4 rounded-lg border border-slate-700">
                    <p className="text-xs font-semibold text-slate-200 mb-3">
                      {pIdx + 1}. {pq.question}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {pq.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            if (!predSubmitted[pIdx]) {
                              const next = [...predAnswers];
                              next[pIdx] = oIdx;
                              setPredAnswers(next);
                              audioManager.play('tap');
                            }
                          }}
                          className={`p-2.5 text-left rounded-lg text-xs font-medium border transition-all ${
                            predAnswers[pIdx] === oIdx
                              ? 'bg-amber-500/30 border-amber-500 text-white'
                              : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {!predSubmitted[pIdx] ? (
                      <button
                        onClick={() => {
                          if (predAnswers[pIdx] !== null) {
                            const nextSub = [...predSubmitted];
                            nextSub[pIdx] = true;
                            setPredSubmitted(nextSub);
                            audioManager.play('pop');
                          }
                        }}
                        disabled={predAnswers[pIdx] === null}
                        className="mt-3 px-4 py-1.5 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 text-white rounded text-xs font-semibold"
                      >
                        Lock Prediction
                      </button>
                    ) : (
                      <div className="mt-2 text-xs text-slate-400 italic">
                        {predAnswers[pIdx] === pq.correctIndex
                          ? '✓ Verified prediction aligns with psychological theory.'
                          : '✗ Review interaction in Lab steps to see theory in action.'}
                        <br />
                        <span className="text-amber-400">{pq.verifyInstruction}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE LABS */}
        {activeTab === 'lab' && (
          <div className="flex flex-col gap-6">
            {/* Exploration Steps Navigation */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedLabStep(idx);
                    audioManager.play('swoop');
                    speechManager.speak(step.title);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    selectedLabStep === idx
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg'
                      : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {step.title}
                </button>
              ))}
            </div>

            {/* Instruction Banner */}
            <div className="bg-indigo-950/40 border border-indigo-800/50 p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                  Active Exploration Lab
                </span>
                <h3 className="text-sm font-bold text-white mt-0.5">
                  {EXPLORATION_STEPS[selectedLabStep].title}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {EXPLORATION_STEPS[selectedLabStep].instruction}
                </p>
              </div>
            </div>

            {/* INTERACTIVE LAB PANELS */}
            {selectedLabStep === 0 && (
              <div className="flex flex-col items-center">
                <EcologicalSystemsDiagram
                  activeSystem={activeEcologicalSystem}
                  onSelectSystem={(sys) => {
                    setActiveEcologicalSystem(sys);
                    audioManager.play('tap');
                  }}
                />
              </div>
            )}

            {selectedLabStep === 1 && (
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-700 flex flex-col items-center gap-4">
                <h4 className="text-sm font-bold text-slate-200">
                  Prenatal Risk & Teratogen Vulnerability Matrix
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
                  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <label className="text-xs font-bold text-cyan-400 block mb-2">
                      Gestational Age Window: {gestationalWeek} Weeks
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="38"
                      value={gestationalWeek}
                      onChange={(e) => setGestationalWeek(parseInt(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                    <div className="text-[11px] text-slate-300 mt-2">
                      {gestationalWeek <= 2 && 'Germinal Stage (Weeks 0-2): Zygote cleavage; high risk of prenatal loss prior to implantation.'}
                      {gestationalWeek > 2 && gestationalWeek <= 8 && 'Embryonic Stage (Weeks 2-8): Organogenesis peak; CRITICAL TERATOGEN SUSCEPTIBILITY WINDOW.'}
                      {gestationalWeek > 8 && 'Fetal Stage (Weeks 9-38): Functional refinement & growth; teratogen risk shifts from structural defects to functional/stunting risks.'}
                    </div>
                  </div>

                  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <label className="text-xs font-bold text-rose-400 block mb-2">
                      Teratogen Exposure Severity: Level {teratogenExposure}
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => {
                            setTeratogenExposure(lvl);
                            audioManager.play('count');
                          }}
                          className={`flex-1 py-2 text-xs font-bold rounded border ${
                            teratogenExposure === lvl
                              ? 'bg-rose-600 border-rose-500 text-white'
                              : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          {lvl === 1 ? 'Mild' : lvl === 2 ? 'Moderate' : 'Severe'}
                        </button>
                      ))}
                    </div>
                    <div className="text-[11px] text-slate-300 mt-3">
                      <span className="font-semibold text-rose-300">Predicted Phenotypic Outcome: </span>
                      {gestationalWeek <= 8
                        ? teratogenExposure === 3
                          ? 'Major structural abnormalities (e.g., neural tube defect, limb dysmorphia).'
                          : 'Moderate risk of structural organ impairment.'
                        : 'Functional cognitive/behavioral deficits (e.g., FASD cognitive impairment).'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedLabStep === 2 && (
              <div className="flex flex-col items-center">
                <MotorTrendsDiagram
                  cephalocaudalVal={motorStep}
                  setCephalocaudalVal={(v) => {
                    setMotorStep(v);
                    audioManager.play('tap');
                  }}
                />
              </div>
            )}

            {selectedLabStep === 3 && (
              <div className="flex flex-col items-center gap-4">
                <PiagetianConservationDiagram
                  stage={conservationStage}
                  isConserving={isConservingChild}
                  onTogglePour={() => {
                    setConservationStage((prev) => (prev === 'equal' ? 'poured' : 'equal'));
                    audioManager.play('pop');
                  }}
                />
                <div className="flex items-center gap-4 bg-slate-800 p-3 rounded-lg border border-slate-700">
                  <span className="text-xs text-slate-300 font-semibold">Simulate Child Stage:</span>
                  <button
                    onClick={() => {
                      setIsConservingChild(false);
                      audioManager.play('tap');
                    }}
                    className={`px-3 py-1.5 rounded text-xs font-bold ${
                      !isConservingChild ? 'bg-amber-600 text-white' : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    Preoperational (Non-Conserving)
                  </button>
                  <button
                    onClick={() => {
                      setIsConservingChild(true);
                      audioManager.play('tap');
                    }}
                    className={`px-3 py-1.5 rounded text-xs font-bold ${
                      isConservingChild ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    Concrete Operational (Conserving)
                  </button>
                </div>
              </div>
            )}

            {selectedLabStep === 4 && (
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-700 flex flex-col items-center gap-4">
                <h4 className="text-sm font-bold text-slate-200">
                  Kohlberg’s Moral Reasoning Dilemma: Heinz’s Dilemma
                </h4>
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-xs text-slate-300 max-w-xl">
                  <p className="mb-3">
                    <strong className="text-indigo-400">Scenario:</strong> Heinz’s wife is dying of a rare disease. A pharmacist demands an exorbitant price for the drug. Heinz cannot afford it and steals the drug to save his wife.
                  </p>
                  <div className="space-y-2">
                    <label className="font-bold text-cyan-400 block">Select Moral Level:</label>
                    <div className="flex flex-wrap gap-2">
                      {['Pre-Conventional (Stage 1-2)', 'Conventional (Stage 3-4)', 'Post-Conventional (Stage 5-6)'].map((lvl, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setMoralStageIndex(idx);
                            audioManager.play('tap');
                          }}
                          className={`px-3 py-1.5 rounded text-xs font-bold border transition-all ${
                            moralStageIndex === idx
                              ? 'bg-indigo-600 border-indigo-400 text-white'
                              : 'bg-slate-900 border-slate-700 text-slate-400'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-slate-900 rounded border border-slate-700">
                    <span className="font-bold text-emerald-400 block mb-1">Theoretical Rationale:</span>
                    {moralStageIndex === 0 && 'Focus on self-interest and physical consequences: "He shouldn’t steal because he will get caught and sent to jail" OR "He should steal because he wants her to cook for him."'}
                    {moralStageIndex === 1 && 'Focus on social conformity and law & order: "He should steal because a good husband protects his wife" OR "He shouldn’t steal because laws maintain societal stability."'}
                    {moralStageIndex === 2 && 'Focus on universal ethical principles and human rights: "Human life transcends property rights; stealing was morally justified under ethical law."'}
                  </div>
                </div>
              </div>
            )}

            {/* OBSERVATION QUESTIONS SECTION */}
            <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 mt-4">
              <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-4">
                Empirical Observation Checks
              </h3>
              <div className="space-y-6">
                {OBSERVATION_QUESTIONS.map((oq, oIdx) => (
                  <div key={oIdx} className="bg-slate-900/80 p-4 rounded-lg border border-slate-700">
                    <p className="text-xs font-semibold text-slate-200 mb-3">
                      {oIdx + 1}. {oq.question}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {oq.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => {
                            if (!obsSubmitted[oIdx]) {
                              const next = [...obsAnswers];
                              next[oIdx] = optIdx;
                              setObsAnswers(next);
                              audioManager.play('tap');
                            }
                          }}
                          className={`p-2.5 text-left rounded-lg text-xs font-medium border transition-all ${
                            obsAnswers[oIdx] === optIdx
                              ? 'bg-cyan-500/30 border-cyan-500 text-white'
                              : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {!obsSubmitted[oIdx] ? (
                      <button
                        onClick={() => {
                          if (obsAnswers[oIdx] !== null) {
                            const nextSub = [...obsSubmitted];
                            nextSub[oIdx] = true;
                            setObsSubmitted(nextSub);
                            audioManager.play('pop');
                          }
                        }}
                        disabled={obsAnswers[oIdx] === null}
                        className="mt-3 px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-white rounded text-xs font-semibold"
                      >
                        Verify Observation
                      </button>
                    ) : (
                      <div className="mt-2 text-xs text-slate-400 italic">
                        {obsAnswers[oIdx] === oq.correctIndex
                          ? '✓ Observation matches empirical developmental psychological data.'
                          : '✗ Review interaction panel to re-examine empirical patterns.'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CHALLENGES */}
        {activeTab === 'challenges' && (
          <div className="flex flex-col gap-6">
            {/* Score & Progress Header */}
            <div className="flex flex-wrap items-center justify-between bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                      CHALLENGES[currentChallengeIdx].difficulty === 'foundation'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : CHALLENGES[currentChallengeIdx].difficulty === 'standard'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {CHALLENGES[currentChallengeIdx].difficulty}
                  </span>
                  <span className="text-xs text-slate-300 font-medium">
                    {CHALLENGES[currentChallengeIdx].competencyLevel}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-2 md:mt-0">
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Total Points</span>
                  <span className="text-xl font-extrabold text-indigo-400">{challengeScore}</span>
                </div>
              </div>
            </div>

            {/* Hint Bubble Component */}
            <HintBubble
              show={showHint}
              text={CHALLENGES[currentChallengeIdx].hints[currentHintIdx]}
            />

            {/* Question Card */}
            <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700">
              <h3 className="text-base font-semibold text-slate-100 mb-5">
                {CHALLENGES[currentChallengeIdx].question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {CHALLENGES[currentChallengeIdx].options?.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!challengeSubmitted) {
                        setSelectedOption(idx);
                        audioManager.play('tap');
                      }
                    }}
                    className={`w-full text-left p-4 rounded-xl text-xs md:text-sm font-medium transition-all border ${
                      selectedOption === idx
                        ? 'bg-indigo-600/30 border-indigo-500 text-white'
                        : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>

              {/* Actions Footer */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setShowHint((prev) => !prev);
                    if (!showHint) {
                      audioManager.play('hint');
                    }
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-bold transition-all"
                >
                  {showHint ? 'Hide Hint' : '💡 Request Hint'}
                </button>

                {!challengeSubmitted ? (
                  <button
                    onClick={handleChallengeSubmit}
                    disabled={selectedOption === null}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white rounded-xl text-xs font-bold shadow-lg transition-all"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-1"
                  >
                    Next Challenge →
                  </button>
                )}
              </div>

              {/* Submission Result Details */}
              {challengeSubmitted && (
                <div
                  className={`mt-5 p-4 rounded-xl border ${
                    selectedOption === CHALLENGES[currentChallengeIdx].correctIndex
                      ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-800 text-rose-200'
                  }`}
                >
                  <span className="font-bold text-sm block mb-1">
                    {selectedOption === CHALLENGES[currentChallengeIdx].correctIndex
                      ? '✓ Correct Answer!'
                      : '✗ Incorrect Answer'}
                  </span>
                  <p className="text-xs">{CHALLENGES[currentChallengeIdx].explanation}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: MISCONCEPTIONS */}
        {activeTab === 'misconceptions' && (
          <div className="flex flex-col gap-6">
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
              <h2 className="text-base font-bold text-rose-400 mb-1">
                Common Developmental Misconceptions & Scientific Clarifications
              </h2>
              <p className="text-xs text-slate-300">
                Review key distinctions commonly tested in CISCE Class 11 Psychology examinations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISCONCEPTIONS.map((misc) => (
                <div
                  key={misc.id}
                  className="bg-slate-900 p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                      {misc.title}
                    </span>
                    <div className="mb-3 p-2.5 bg-rose-950/30 border border-rose-800/40 rounded-lg">
                      <span className="text-[11px] font-bold text-rose-400 block">Misconception:</span>
                      <p className="text-xs text-rose-200 italic">{misc.misconception}</p>
                    </div>
                    <div className="mb-3 p-2.5 bg-emerald-950/30 border border-emerald-800/40 rounded-lg">
                      <span className="text-[11px] font-bold text-emerald-400 block">Scientific Reality:</span>
                      <p className="text-xs text-emerald-200">{misc.reality}</p>
                    </div>
                  </div>
                  <div className="p-2 bg-slate-800 rounded text-[11px] text-amber-300 font-semibold border border-slate-700">
                    💡 Exam Tip: {misc.correction}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: APPLICATION / SUMMARY */}
        {activeTab === 'summary' && (
          <div className="flex flex-col gap-6">
            <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Real-World Psychological Extension Activity
              </span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2">
                {REAL_WORLD_ACTIVITY.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-300 mb-4">
                {REAL_WORLD_ACTIVITY.description}
              </p>

              <div className="space-y-3">
                {REAL_WORLD_ACTIVITY.steps.map((st, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-900 rounded-xl border border-slate-700/80 text-xs text-slate-200 flex items-start gap-3"
                  >
                    <span className="px-2 py-0.5 bg-indigo-600 text-white font-bold rounded text-[10px]">
                      {idx + 1}
                    </span>
                    <p className="flex-1">{st}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-indigo-950/40 border border-indigo-800/50 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-indigo-300 uppercase">
                    Lifespan Assessment Complete
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Your mastery progress has been stored across all 27 human development learning nodes.
                  </p>
                </div>
                <button
                  onClick={() => {
                    audioManager.play('celebration');
                    speechManager.speak('Real world protocol submitted successfully.');
                    if (onComplete) onComplete(challengeScore);
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all"
                >
                  Finalize Simulation Report
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}