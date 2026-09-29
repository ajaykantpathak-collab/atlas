'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C12_PSY_001 = 'c12_psy_001';
const NODE_C12_PSY_002 = 'c12_psy_002';
const NODE_C12_PSY_003 = 'c12_psy_003';
const NODE_C12_PSY_004 = 'c12_psy_004';
const NODE_C12_PSY_005 = 'c12_psy_005';
const NODE_C12_PSY_006 = 'c12_psy_006';
const NODE_C12_PSY_007 = 'c12_psy_007';
const NODE_C12_PSY_008 = 'c12_psy_008';
const NODE_C12_PSY_009 = 'c12_psy_009';
const NODE_C12_PSY_010 = 'c12_psy_010';

const ALL_NODE_IDS = [
  NODE_C12_PSY_001,
  NODE_C12_PSY_002,
  NODE_C12_PSY_003,
  NODE_C12_PSY_004,
  NODE_C12_PSY_005,
  NODE_C12_PSY_006,
  NODE_C12_PSY_007,
  NODE_C12_PSY_008,
  NODE_C12_PSY_009,
  NODE_C12_PSY_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Apex Mind & Personality Lab at NIMHANS, Bengaluru',
  intro: 'Welcome to the NIMHANS Cognitive and Clinical Assessment Unit. You have been appointed as a junior psychometrician and psychodynamic intern. A diverse group of individuals from across India has arrived for comprehensive evaluation: an exceptional rural student, an overwhelmed corporate executive from Gurugram, an aspiring artist navigating parental pressure, and a child needing diagnostic assessment.',
  context: 'Your mission is to explore the multi-faceted landscape of intelligence, psychometrics, emotional regulation, and personality theories to assess and guide these individuals accurately.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'An elderly Sanskrit scholar in Varanasi cannot solve a fast-paced digital puzzle as quickly as an 18-year-old IIT aspirant, yet interprets dense Vedic texts with unparalleled depth. According to Cattell, why does this occur?',
  options: [
    'The scholar lost general intelligence (g) entirely.',
    'Fluid intelligence (Gf) declines with age, while Crystallised intelligence (Gc) increases through lifelong learning.',
    'The scholar has low verbal ability but high spatial visualisation.',
    'Wechsler proved that older individuals lose the capacity to deal effectively with the environment.',
  ],
  correctIndex: 1,
  hintAfter: 'Notice how raw processing speed differs from accumulated cultural wisdom — let us explore the biological and cognitive foundations!',
};

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

// ─── CHALLENGES DATA (22 Comprehensive Challenges) ───
const CHALLENGES: Challenge[] = [
  // FOUNDATION TIER (1-7)
  {
    id: 'ch_psy_01',
    nodeId: NODE_C12_PSY_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'David Wechsler defined intelligence as the global capacity of an individual to act purposefully, think rationally, and:',
    options: [
      'Score above the 90th percentile on standard IQ tests',
      'Deal effectively with the environment',
      'Achieve high social and financial status',
      'Master academic and scientific concepts without error',
    ],
    correctIndex: 1,
    explanation: 'Wechsler highlighted the triad: act purposefully, think rationally, and deal effectively with the environment. It is a functional and holistic system rather than just an academic score.',
    hints: [
      'Think about the practical purpose of being intelligent in daily life.',
      'Wechsler focused on how one adapts to surroundings.',
      'The triad ends with: "deal effectively with the environment."',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_psy_02',
    nodeId: NODE_C12_PSY_003,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A 10-year-old child in Kolkata demonstrates cognitive performance equal to an average 13-year-old on the Binet-Kamat test. Calculate the child’s IQ using Stern’s formula (IQ = (MA / CA) * 100).',
    correctAnswer: 130,
    tolerance: 0.5,
    unit: 'IQ points',
    explanation: 'IQ = (Mental Age / Chronological Age) * 100 = (13 / 10) * 100 = 130, placing this student in the gifted category.',
    hints: [
      'Identify Mental Age (MA) = 13 and Chronological Age (CA) = 10.',
      'Divide 13 by 10 to get 1.3.',
      'Multiply 1.3 by 100 to obtain 130.',
    ],
  },
  {
    id: 'ch_psy_03',
    nodeId: NODE_C12_PSY_007,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each personality construct to its defining operational characteristic.',
    dragItems: [
      { label: 'Temperament', targetId: 't_bio' },
      { label: 'Trait', targetId: 't_enduring' },
      { label: 'Character', targetId: 't_moral' },
      { label: 'Habit', targetId: 't_situation' },
    ],
    correctMapping: {
      t_bio: 'Temperament',
      t_enduring: 'Trait',
      t_moral: 'Character',
      t_situation: 'Habit',
    },
    explanation: 'Temperament is inborn emotional reactivity; traits are enduring cross-situational tendencies; character is morally evaluated behaviour; habits are situation-specific learned responses.',
    hints: [
      'Inborn biological reactivity belongs to temperament.',
      'Moral judgment is linked to character.',
      'Cross-situational stability marks a trait; narrow automatic responses are habits.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_psy_04',
    nodeId: NODE_C12_PSY_009,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In Freud’s structural model of personality, which agency operates strictly on the "pleasure principle" demanding immediate gratification?',
    options: ['Ego', 'Id', 'Superego', 'Ego-Ideal'],
    correctIndex: 1,
    explanation: 'The Id is present at birth, fully unconscious, and governed by the pleasure principle, seeking immediate tension reduction regardless of consequences.',
    hints: [
      'It is the primitive, instinctual component present from birth.',
      'It does not consider morals or realistic delays.',
      'The Latin word for "it" is the Id.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_psy_05',
    nodeId: NODE_C12_PSY_008,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'According to William Sheldon’s Somatotype theory, a muscular, strong, and athletic individual is classified as which body type?',
    options: ['Endomorph (Viscerotonia)', 'Mesomorph (Somatotonia)', 'Ectomorph (Cerebrotonia)', 'Phlegmatic'],
    correctIndex: 1,
    explanation: 'Mesomorphs have athletic, muscular builds and Sheldon paired them with somatotonia (energetic, assertive, risk-taking behaviour).',
    hints: [
      'Think of middle/meso build — athletic and sturdy.',
      'Endomorph is round/soft, Ectomorph is thin/fragile.',
      'The athletic type is the Mesomorph.',
    ],
  },
  {
    id: 'ch_psy_06',
    nodeId: NODE_C12_PSY_004,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to the DSM-5 and Indian Psychological Association classifications, what is the IQ range for "Mild Intellectual Disability"?',
    options: ['70 to 84', '50-55 to approximately 70', '35-40 to 50-55', 'Below 20-25'],
    correctIndex: 1,
    explanation: 'Mild Intellectual Disability spans IQ 50-55 to ~70. It constitutes roughly 85% of intellectual disability cases, allowing individuals to achieve up to sixth-grade academic skills and live semi-independently.',
    hints: [
      'It sits just below the borderline band (70-79).',
      'It represents about 85% of all diagnosed cases.',
      'The range is 50-55 up to approximately 70.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_psy_07',
    nodeId: NODE_C12_PSY_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who first formally proposed Emotional Intelligence as an academic psychological construct in 1990?',
    options: [
      'Daniel Goleman',
      'Peter Salovey and John Mayer',
      'Sigmund Freud and Carl Jung',
      'Howard Gardner',
    ],
    correctIndex: 1,
    explanation: 'Salovey and Mayer first proposed EI in 1990 as an ability to process emotional information. Daniel Goleman popularised the concept in 1995.',
    hints: [
      'Goleman popularised it, but two university researchers published the seminal 1990 paper.',
      'Their initials are P.S. and J.M.',
      'The researchers are Peter Salovey and John Mayer.',
    ],
  },

  // STANDARD TIER (8-15)
  {
    id: 'ch_psy_08',
    nodeId: NODE_C12_PSY_001,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does Spearman’s Two Factor Theory fundamentally differ from Thurstone’s Primary Mental Abilities?',
    options: [
      'Spearman proposed 180 distinct factors, while Thurstone proposed only two.',
      'Spearman posited an overarching general energy factor (g) common to all tasks plus specific (s) factors, whereas Thurstone rejected single (g) in favour of 7 independent primary abilities.',
      'Spearman studied children whereas Thurstone studied only elderly adults.',
      'Spearman focused exclusively on emotional intelligence.',
    ],
    correctIndex: 1,
    explanation: 'Spearman built a hierarchical model with a general factor (g) powering all tasks, whereas Thurstone used multiple factor analysis to establish seven co-equal, relatively independent primary mental abilities.',
    hints: [
      'Look at whether intelligence is viewed as having one common engine or multiple separate pillars.',
      'Spearman is famous for "g". Thurstone argued against a single dominant "g".',
      'Thurstone found 7 primary mental abilities correlating independently.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_psy_09',
    nodeId: NODE_C12_PSY_002,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A village sarpanch in Rajasthan successfully mediates complex disputes between farming families and manages water distribution during drought. In Sternberg’s Triarchic Theory, which intelligence is primarily demonstrated?',
    options: [
      'Componential / Analytical Intelligence',
      'Experiential / Creative Intelligence',
      'Contextual / Practical Intelligence',
      'Musical-Rhythmic Intelligence',
    ],
    correctIndex: 2,
    explanation: 'Contextual or Practical Intelligence involves tacit knowledge, adapting to, shaping, and selecting real-world environments to solve street-smart, everyday community problems.',
    hints: [
      'This involves real-world negotiation and social adaptation rather than formal textbook math.',
      'Sternberg calls real-world environmental management "practical" or "contextual".',
      'The answer is Contextual / Practical Intelligence.',
    ],
  },
  {
    id: 'ch_psy_10',
    nodeId: NODE_C12_PSY_003,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why is Raven’s Progressive Matrices widely chosen over the Wechsler scales for screening recruits in the Indian Armed Forces from linguistically diverse states?',
    options: [
      'It tests advanced English literature comprehension.',
      'It is an individual verbal test requiring one-on-one psychiatric interviews.',
      'It is a non-verbal, culture-reduced group test using abstract geometric patterns that eliminates language and schooling barriers.',
      'It takes over four hours to administer per candidate.',
    ],
    correctIndex: 2,
    explanation: 'Raven’s Matrices uses non-verbal geometric matrices, measuring Spearman’s eductive ability culture-reduced without linguistic bias across India’s 22+ scheduled languages.',
    hints: [
      'Think about India’s vast linguistic diversity (Tamil, Bengali, Hindi, Punjabi, etc.).',
      'Raven’s uses visual pattern puzzles rather than spoken or written language.',
      'It is non-verbal, culture-reduced, and can be given to large groups.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_psy_11',
    nodeId: NODE_C12_PSY_006,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A student in Lucknow scores high on the General Aptitude Test Battery (GATB) spatial subtest but scores low on her Class 12 Physics exam. What does this discrepancy signify?',
    options: [
      'Her low achievement proves that she has zero aptitude for engineering.',
      'Aptitude measures forward-looking potential to learn with training, while achievement measures backward-looking mastery of taught syllabus content.',
      'GATB is an interest test, so she merely likes 3D drawings.',
      'Aptitude and achievement are identical concepts, showing test error.',
    ],
    correctIndex: 1,
    explanation: 'Aptitude is predictive potential; achievement is past learning. A student with high spatial aptitude has the raw capacity for engineering but may need better instruction or study effort to raise achievement.',
    hints: [
      'Aptitude is like a seed (potential); achievement is the grown plant (what was taught).',
      'One looks forward to what can be learned, the other looks backward at what was mastered.',
      'High potential with low current exam marks requires remedial coaching, not dismissal of ability.',
    ],
  },
  {
    id: 'ch_psy_12',
    nodeId: NODE_C12_PSY_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A 42-year-old corporate director in Gurugram exhibits intense time urgency, competitive aggression, chronic impatience in traffic, and hostility. What behavioural pattern and medical risk are indicated?',
    options: [
      'Type B Behaviour Pattern; high risk of clinical depression',
      'Type A Behaviour Pattern; significantly elevated risk of Coronary Heart Disease (CHD)',
      'Sanguine Temperament; elevated risk of liver dysfunction',
      'Phlegmatic somatotype; low risk of stress-related ailments',
    ],
    correctIndex: 1,
    explanation: 'Friedman and Rosenman identified Type A (hostility, hurry, competitiveness) as carrying roughly twice the risk of Coronary Heart Disease, confirmed in Indian studies by AIIMS and NIMHANS.',
    hints: [
      'Time urgency and hostility are hallmark features of Type A.',
      'Friedman and Rosenman were cardiologists studying heart attacks.',
      'The pattern is Type A with Coronary Heart Disease risk.',
    ],
  },
  {
    id: 'ch_psy_13',
    nodeId: NODE_C12_PSY_009,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Arrange Freud’s levels of consciousness from the most surface/accessible to the deepest hidden repository of repressed drives.',
    sortItems: [
      'Conscious Mind (current awareness and sensory perceptions)',
      'Preconscious Mind (easily accessible mental waiting room)',
      'Unconscious Mind (vast submerged repository of repressed conflicts)',
    ],
    correctOrder: [0, 1, 2],
    explanation: 'Freud’s topographical model places Conscious at the tip of the iceberg, Preconscious just below the surface line, and the Unconscious in the vast depths.',
    hints: [
      'Start with what you are experiencing right now in this exact moment.',
      'The mental waiting room (retrievable memory) is in the middle.',
      'The deepest, repressed iceberg base is the unconscious.',
    ],
  },
  {
    id: 'ch_psy_14',
    nodeId: NODE_C12_PSY_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'An adult who is excessively neat, rigid, obstinate, and stingy is described by Freud as experiencing fixation in which psychosexual stage and why?',
    options: [
      'Oral stage due to sudden weaning',
      'Anal stage (anal-retentive) resulting from harsh, strict toilet training',
      'Phallic stage due to unresolved Oedipus complex',
      'Genital stage due to adolescent social pressures',
    ],
    correctIndex: 1,
    explanation: 'Harsh or shaming toilet training in the Anal stage (1-3 years) can produce an anal-retentive fixation characterized by obsessive cleanliness, obstinacy, and stinginess.',
    hints: [
      'Think of control, bladder/bowel regulation, and neatness.',
      'Occurs between ages 1 to 3 years.',
      'This is the Anal stage (anal-retentive).',
    ],
  },
  {
    id: 'ch_psy_15',
    nodeId: NODE_C12_PSY_010,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'How did Karen Horney fundamentally challenge Sigmund Freud’s psychoanalytic view of women and neurosis?',
    options: [
      'She claimed the Id develops after the Superego in women.',
      'She rejected "penis envy" as male bias, argued women envy male social power and privilege, and traced neurosis to "basic anxiety" from interpersonal insecurity.',
      'She claimed personality is completely genetic and unchangeable by environment.',
      'She replaced all psychological stages with physical humours.',
    ],
    correctIndex: 1,
    explanation: 'Karen Horney rejected biological determinism and penis envy, explaining that women envied cultural power. She established that neurosis originates from basic anxiety in hostile family dynamics.',
    hints: [
      'Horney brought a sociocultural and feminist critique to Freudian theory.',
      'She replaced biological drive conflict with relational insecurity (basic anxiety).',
      'She argued women envy social privilege, not anatomy.',
    ],
  },

  // ADVANCED TIER (16-22)
  {
    id: 'ch_psy_16',
    nodeId: NODE_C12_PSY_001,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In J.P. Guilford’s Structure of Intellect (SOI) expanded model, there are 5 Operations, 6 Products, and how many distinct Contents to produce exactly 180 factors of intellect?',
    correctAnswer: 6,
    tolerance: 0,
    unit: 'Contents (or 5x6x6=180 / 5x4x6=120 expanded to 6x5x6)',
    explanation: 'In Guilford’s expanded model: 5 Operations × 6 Contents × 6 Products = 180 distinct intellectual factors (or 6 Operations × 5 Contents × 6 Products). The granular cube eliminated a unitary g.',
    hints: [
      'Recall the formula: Operations × Contents × Products = Total Factors.',
      '5 × ? × 6 = 180.',
      'Divide 180 by (5 × 6 = 30) to get 6.',
    ],
  },
  {
    id: 'ch_psy_17',
    nodeId: NODE_C12_PSY_002,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Jadav Molai Payeng single-handedly planted a 1,360-acre forest on Majuli island in Assam by reading weather, soil, and wildlife cues. In Gardner’s Multiple Intelligences, which dominant intelligence is exemplified?',
    options: [
      'Spatial-Visual Intelligence',
      'Logical-Mathematical Intelligence',
      'Naturalistic Intelligence (8th intelligence added in 1995)',
      'Intrapersonal Intelligence',
    ],
    correctIndex: 2,
    explanation: 'Naturalistic intelligence involves sensitivity to flora, fauna, weather, and ecological patterns, exemplified by India’s "Forest Man" Jadav Payeng and ornithologist Salim Ali.',
    hints: [
      'This intelligence deals with living organisms, ecology, and natural systems.',
      'Gardner added this specific eighth intelligence to his framework in 1995.',
      'It is Naturalistic Intelligence.',
    ],
  },
  {
    id: 'ch_psy_18',
    nodeId: NODE_C12_PSY_005,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Construct Daniel Goleman’s 5 core components of Emotional Intelligence in logical self-to-social order.',
    availableParts: [
      'Self-Awareness',
      'Self-Regulation',
      'Motivation',
      'Empathy',
      'Social Skills',
    ],
    targetState: 'Self-Awareness Self-Regulation Motivation Empathy Social Skills',
    validationHint: 'Order from internal personal competencies (knowing self, managing self, driving self) to social competencies (understanding others, managing relationships).',
    explanation: 'Goleman’s 5-factor model flows from intra-personal mastery (Self-Awareness -> Self-Regulation -> Motivation) to inter-personal effectiveness (Empathy -> Social Skills).',
    hints: [
      'First you must know your own emotional states (Self-Awareness).',
      'Then you control impulses and direct motivation towards goals.',
      'Finally you perceive others’ emotions (Empathy) and navigate relationships (Social Skills).',
    ],
  },
  {
    id: 'ch_psy_19',
    nodeId: NODE_C12_PSY_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Gordon Allport defined personality as the "dynamic organisation within the individual of those psychophysical systems that determine his unique adjustments to his environment." What does "psychophysical" explicitly mean?',
    options: [
      'Personality is purely mental and has no physiological basis.',
      'Personality integrates both psychological operations (thoughts, feelings) and biological/neural structures (nervous system, endocrine glands) into a unified causal system.',
      'Personality can only be measured by physical strength tests.',
      'Personality exists outside the individual in the societal climate.',
    ],
    correctIndex: 1,
    explanation: 'Psychophysical denotes that mind (psycho) and body (physical) are unified: neural structures, hormonal balance, cognitive schemas, and emotional habits work together to cause behaviour.',
    hints: [
      'Break down the root words: "psycho" (mental) and "physical" (bodily).',
      'Allport rejected the dualism of separating mind from biology.',
      'It means mental processes and biological/endocrine systems work as one system.',
    ],
  },
  {
    id: 'ch_psy_20',
    nodeId: NODE_C12_PSY_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A Class 12 student is tempted to forge a doctor’s certificate to skip a prelim exam. The Id demands rest, the Superego triggers intense shame about honesty, and the Ego negotiates: "Study today, speak truthfully to the counsellor, and request a structured extension." Which principle guided the Ego’s resolution?',
    options: [
      'Pleasure Principle',
      'Moral / Perfection Principle',
      'Reality Principle',
      'Nirvana Principle',
    ],
    correctIndex: 2,
    explanation: 'The Ego operates on the Reality Principle: it satisfies the Id’s needs without violating Superego standards or external societal reality, using realistic problem-solving.',
    hints: [
      'The Id follows pleasure; the Superego follows perfection/morality.',
      'The Ego tests realistic compromises in the objective world.',
      'This is the Reality Principle.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_psy_21',
    nodeId: NODE_C12_PSY_010,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How did Indian psychoanalyst Girindrasekhar Bose (Calcutta, 1922) adapt Freud’s Oedipal theory to the Indian sociocultural context?',
    options: [
      'Bose argued that the Oedipal complex is 100% identical in every culture regardless of family structure.',
      'Bose demonstrated that in Indian joint families, maternal care is diffused across grandmothers and aunts, diluting the isolated nuclear Oedipal rivalry and infusing cultural values of dharma.',
      'Bose rejected the unconscious entirely and embraced only behaviourism.',
      'Bose replaced psychoanalysis with Hippocratic humours.',
    ],
    correctIndex: 1,
    explanation: 'Girindrasekhar Bose corresponded with Freud, demonstrating that extended kin and joint-family systems soften the mother-son nuclear isolation, reshaping ego development and dharma-based superego formation.',
    hints: [
      'Consider the Indian joint family where multiple caregivers look after a child.',
      'Bose founded the Indian Psychoanalytic Society in 1922 in Calcutta.',
      'He showed that the extended family softens the rigid Oedipal triad.',
    ],
  },
  {
    id: 'ch_psy_22',
    nodeId: NODE_C12_PSY_004,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Under the Rights of Persons with Disabilities Act (2016) and Mental Healthcare Act (2017) in India, what dual criterion is legally required to diagnose Intellectual Developmental Disorder?',
    options: [
      'Only an IQ score below 90 on an online test',
      'Deficits in general intellectual functioning (IQ approx. 70 or below) AND significant concurrent deficits in adaptive functioning (conceptual, social, practical skills) with onset during the developmental period',
      'Failure to clear the Class 10 Board Examination',
      'Presence of introverted personality traits on Sheldon’s scale',
    ],
    correctIndex: 1,
    explanation: 'Modern clinical standards (DSM-5 / RPwD Act 2016) mandate both sub-average intellectual functioning (IQ <= 70) and significant impairments in adaptive behaviour across daily life domains.',
    hints: [
      'An IQ score alone is insufficient without looking at real-life daily skills.',
      'Adaptive functioning covers communication, self-care, and community participation.',
      'The diagnosis requires both low IQ and adaptive deficits arising before age 18.',
    ],
  },
];

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

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_PSY_001,
  title: 'Psychology: Intelligence & Personality Foundations',
  definition: 'Intelligence is the global capacity of an individual to act purposefully, think rationally, and deal effectively with the environment (Wechsler). Personality is the dynamic organisation within the individual of those psychophysical systems that determine unique adjustments to the environment (Allport).',
  eli5: 'Intelligence is your mental toolkit to solve real problems; personality is your unique style and balance of drives, habits, moral rules, and feelings when using that toolkit.',
  misconceptions: [
    {
      misconception: 'Spearman proposed only one factor (g).',
      correction: 'Spearman proposed TWO factors: general factor (g) common to all tasks AND specific factors (s) unique to each task.',
    },
    {
      misconception: 'Character and personality are the exact same thing.',
      correction: 'Character is only the morally evaluated ethical slice of personality; personality is the entire psychophysical dynamic whole.',
    },
    {
      misconception: 'The Ego operates on the pleasure principle.',
      correction: 'The Id operates on the pleasure principle; the Ego operates on the reality principle; the Superego operates on the moral principle.',
    },
    {
      misconception: 'Borderline intelligence is the same as mild intellectual disability.',
      correction: 'Borderline is IQ 70-79 (can live independently with minimal guidance), whereas Mild Intellectual Disability is IQ 50-55 to 70 and requires structured vocational support.',
    },
    {
      misconception: 'Raven’s Progressive Matrices is a verbal reasoning test.',
      correction: 'Raven’s is an abstract, non-verbal, culture-reduced group test designed to eliminate linguistic biases across diverse populations.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Who defined intelligence as the global capacity to act purposefully, think rationally, and deal effectively with the environment?', options: ['Spearman', 'Wechsler', 'Binet', 'Gardner'], correctIndex: 1 },
    { question: 'What are the two factors in Spearman’s Two Factor theory?', options: ['Fluid and Crystallised', 'General (g) and Specific (s)', 'Id and Ego', 'Verbal and Performance'], correctIndex: 1 },
    { question: 'Which intelligence in Cattell’s model grows throughout life with experience and education?', options: ['Fluid (Gf)', 'Crystallised (Gc)', 'Emotional (EQ)', 'Spatial'], correctIndex: 1 },
    { question: 'How many Primary Mental Abilities did L.L. Thurstone identify?', options: ['3', '5', '7', '180'], correctIndex: 2 },
    { question: 'What is the formula for Ratio IQ proposed by William Stern?', options: ['(CA / MA) * 100', '(MA / CA) * 100', 'MA - CA', '(MA + CA) / 2'], correctIndex: 1 },
    { question: 'In Sheldon’s somatotype theory, the endomorph body build is linked with which temperament?', options: ['Cerebrotonia', 'Somatotonia', 'Viscerotonia', 'Melancholic'], correctIndex: 2 },
    { question: 'What principle governs the Superego in Freudian psychoanalysis?', options: ['Pleasure Principle', 'Reality Principle', 'Moral / Perfection Principle', 'Instinct Principle'], correctIndex: 2 },
    { question: 'Which post-Freudian emphasised "basic anxiety" and rejected penis envy?', options: ['Erik Erikson', 'Karen Horney', 'Carl Jung', 'Alfred Adler'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student demonstrates deep understanding of factor theories, modern intelligence frameworks (Sternberg/Gardner), psychometrics (IQ/Raven’s), personality types (Sheldon/Friedman), and Freudian/post-Freudian structural and developmental dynamics.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Cattell’s Lifespan Intelligence Curve (Gf vs Gc)',
    instruction: 'Drag the Age Slider to observe how Fluid Intelligence (Gf) peaks in youth and declines, while Crystallised Intelligence (Gc) accumulates across life.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PSY_001,
  },
  {
    title: 'Howard Gardner’s 8 Multiple Intelligences Radar',
    instruction: 'Click each of the 8 intelligences on the mandala to inspect their neural substrates and Indian exemplars.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C12_PSY_002,
  },
  {
    title: 'The Bell Curve of IQ & Diagnostic Classification',
    instruction: 'Adjust the IQ Score slider to examine where an individual lands on the normal distribution from profound disability to giftedness.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PSY_004,
  },
  {
    title: 'Freud’s Iceberg: Id, Ego, and Superego in Action',
    instruction: 'Adjust the Id Impulses vs Superego Moral Pressure sliders to watch the Ego struggle or balance the dynamic mental system.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PSY_009,
  },
  {
    title: 'Friedman & Rosenman: Type A vs Type B Stress Simulator',
    instruction: 'Toggle work stressors and time urgency to see the cardiovascular risk gauge and physiological reaction shift in real time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PSY_008,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an individual reaches age 65, what will happen to their raw fluid reasoning speed versus their stored vocabulary and cultural wisdom?',
    options: [
      'Both Fluid (Gf) and Crystallised (Gc) will drop to zero.',
      'Fluid (Gf) will decline due to biological slowing, while Crystallised (Gc) will remain stable or increase.',
      'Fluid (Gf) will skyrocket while Crystallised (Gc) drops.',
      'Neither will change at all across the lifespan.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now drag the Age Slider to 65+ in the simulation to verify how Gf and Gc diverge!',
    nodeId: NODE_C12_PSY_001,
  },
  {
    question: 'Predict: What happens to a person when Superego moral pressure becomes overwhelmingly high while the Ego is weak?',
    options: [
      'They become impulsively aggressive and antisocial.',
      'They experience intense guilt, anxiety, self-blame, and moral paralysis.',
      'They instantly gain an IQ of 140.',
      'They show viscerotonic behaviour.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Push the Superego slider to maximum in the Iceberg lab to see the anxiety & guilt gauge surge!',
    nodeId: NODE_C12_PSY_009,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the Bell Curve distribution between IQ 85 and 115?',
    observableOptions: [
      'Only 5% of the population falls in this band.',
      'Approximately 68% of the human population clusters within +/- 1 standard deviation of the mean (100).',
      'It represents the profound intellectual disability zone.',
      'It contains only individuals who score high on bodily-kinaesthetic intelligence.',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_PSY_004,
  },
  {
    question: 'What happens to the Ego balance index when Id desire (60%) is perfectly matched with realistic compromise (60%) under moderate Superego guidance?',
    observableOptions: [
      'The personality enters severe neurosis.',
      'The Ego equilibrium index reaches optimal healthy psychological functioning.',
      'The individual drops into an anal-retentive fixation.',
      'The person develops Type A heart disease.',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_PSY_009,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Psychometric Profile Case Report: The NIMHANS Youth Assessment',
  description: 'Apply your clinical and psychometric knowledge to draft a comprehensive 4-dimension profile for a Class 12 student choosing between pure sciences and social work in India.',
  steps: [
    'Assess Gf vs Gc: Evaluate non-verbal Raven’s SPM score alongside linguistic comprehension.',
    'Map Multiple Intelligences: Rate interpersonal, logical-mathematical, and naturalistic strengths.',
    'Examine Emotional Intelligence: Check Goleman’s five components (self-regulation under exam stress).',
    'Structure Ego Support: Formulate counselling strategies to balance parental Superego expectations with student Id aspirations.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
export function C12_PsychologyDefinitionIntelligenceFactorSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['psychology'] || { name: 'Psychology', emoji: '🧠', color: 'purple' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org interactive hooks
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Exploration interactive states (Sliders with instant real-time visualization update)
  const [simAge, setSimAge] = useState(22);
  const [selectedIntelligence, setSelectedIntelligence] = useState<string | null>('linguistic');
  const [simIq, setSimIq] = useState(100);
  const [idDrive, setIdDrive] = useState(50);
  const [superegoDrive, setSuperegoDrive] = useState(50);
  const [typeAWorkHours, setTypeAWorkHours] = useState(45);
  const [typeAHostility, setTypeAHostility] = useState(30);

  // Adaptive difficulty & BKT
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hints and explanation
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Challenge interaction states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Misconception tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Dynamic calculations for visualizations
  const gfScore = useMemo(() => {
    if (simAge <= 22) return Math.min(100, 50 + simAge * 2.2);
    return Math.max(20, 100 - (simAge - 22) * 1.15);
  }, [simAge]);

  const gcScore = useMemo(() => {
    return Math.min(100, 30 + simAge * 0.85);
  }, [simAge]);

  const egoEquilibrium = useMemo(() => {
    const balance = 100 - Math.abs(idDrive - superegoDrive) * 0.8;
    return Math.max(10, Math.min(100, balance));
  }, [idDrive, superegoDrive]);

  const cardiacRiskPercent = useMemo(() => {
    const risk = (typeAWorkHours * 0.7) + (typeAHostility * 0.8);
    return Math.min(100, Math.max(5, Math.round(risk)));
  }, [typeAWorkHours, typeAHostility]);

  const iqCategory = useMemo(() => {
    if (simIq >= 130) return { label: 'Gifted / Very Superior', color: 'text-emerald-400', desc: 'Rapid learning, exceptional originality (Terman).' };
    if (simIq >= 120) return { label: 'Superior', color: 'text-teal-400', desc: 'High abstract reasoning and problem solving.' };
    if (simIq >= 110) return { label: 'High Average', color: 'text-gold-400', desc: 'Above-average academic performance.' };
    if (simIq >= 90) return { label: 'Average (Normal Curve Peak - 68%)', color: 'text-gold-300', desc: 'Typical representative functioning.' };
    if (simIq >= 80) return { label: 'Low Average', color: 'text-amber-300', desc: 'Can manage schooling with consistent practice.' };
    if (simIq >= 70) return { label: 'Borderline', color: 'text-amber-500', desc: 'Independent living with minimal occupational guidance.' };
    if (simIq >= 50) return { label: 'Mild Intellectual Disability (~85%)', color: 'text-rose-400', desc: 'Class 6 academics, semi-independent living with NIEPID support.' };
    if (simIq >= 35) return { label: 'Moderate Intellectual Disability (~10%)', color: 'text-rose-500', desc: 'Basic self-care, sheltered workshop training.' };
    if (simIq >= 20) return { label: 'Severe Intellectual Disability (3-4%)', color: 'text-rose-600', desc: 'Continuous caregiver supervision, motor support.' };
    return { label: 'Profound Intellectual Disability (1-2%)', color: 'text-rose-700', desc: 'Total dependence, sensory-motor stimulation required.' };
  }, [simIq]);

  // Adaptive difficulty challenges filtering
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C12_PSY_001);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, '#6366f1');
      grad.addColorStop(0.5, '#a855f7');
      grad.addColorStop(1, '#ec4899');

      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 5) {
        const y = 20 + Math.sin((x * 0.04) + (frame * 0.06)) * 8 + Math.cos((x * 0.02) - (frame * 0.03)) * 4;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const pulseX = (frame * 3) % canvas.width;
      ctx.beginPath();
      ctx.arc(pulseX, 20 + Math.sin(pulseX * 0.04 + frame * 0.06) * 8, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── ESCALATING HINTS CALLBACK ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

  // ─── DISCOVERY HANDLER ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Excellent scientific insight! Fluid and crystallised intelligence diverge across the lifespan.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration lab. Let us experiment with psychological models!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter free play sandbox. Test variables freely with zero grading!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Commencing competency challenges. Read each question carefully and apply your concepts!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the simulation to verify what actually happens.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp psychological observation!' : 'Look closely at the data distribution.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work! You have completed the comprehensive Intelligence & Personality psychometric module.');
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
      handleComplete();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Brilliant deduction.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors(e => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
          setHitMisconceptions(prev => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us review the clinical explanation together.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length > 0 ? prev : (challenge.sortItems?.map((_, i) => i) || []);
      const arr = [...base];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const ans = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(ans);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleIntelligenceSelect = useCallback((key: string) => {
    setSelectedIntelligence(key);
    audioManager.play('tap');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // 8 Gardner Intelligences Data
  const GARDNER_DATA: Record<string, { name: string; icon: string; exemplar: string; brain: string; desc: string }> = {
    linguistic: {
      name: 'Linguistic',
      icon: '✍️',
      exemplar: 'Rabindranath Tagore (Gitanjali poetry)',
      brain: 'Broca & Wernicke Areas (Left Hemisphere)',
      desc: 'Sensitivity to spoken and written language, rhetoric, and semantics.',
    },
    logical: {
      name: 'Logical-Mathematical',
      icon: '🔢',
      exemplar: 'Srinivasa Ramanujan (Number Theory)',
      brain: 'Left Frontal & Bilateral Parietal Cortex',
      desc: 'Capacity to analyse problems logically, carry out math operations, and scientific reasoning.',
    },
    spatial: {
      name: 'Spatial-Visual',
      icon: '🏛️',
      exemplar: 'Charles Correa (Urban Architecture)',
      brain: 'Right Posterior Parietal & Occipital Cortex',
      desc: 'Perception, transformation, and manipulation of visual-spatial patterns.',
    },
    musical: {
      name: 'Musical',
      icon: '🎶',
      exemplar: 'M.S. Subbulakshmi & A.R. Rahman',
      brain: 'Right Temporal Lobe & Auditory Cortex',
      desc: 'Production and appreciation of pitch, rhythm, timbre, and musical structures.',
    },
    kinaesthetic: {
      name: 'Bodily-Kinaesthetic',
      icon: '🥊',
      exemplar: 'Mary Kom & Sachin Tendulkar',
      brain: 'Motor Cortex, Cerebellum, Basal Ganglia',
      desc: 'Use of whole body or parts to solve problems or fashion athletic products.',
    },
    interpersonal: {
      name: 'Interpersonal',
      icon: '🤝',
      exemplar: 'Panchayat Sarpanch & Mahatma Gandhi',
      brain: 'Ventromedial Prefrontal & Mirror Neurons',
      desc: 'Understanding others’ intentions, moods, and desires (crucial in Indian joint families).',
    },
    intrapersonal: {
      name: 'Intrapersonal',
      icon: '🧘',
      exemplar: 'Swami Vivekananda & Meditating Monks',
      brain: 'Medial Prefrontal & Default Mode Network',
      desc: 'Insight into one’s own feelings, motives, strengths, and spiritual self-regulation.',
    },
    naturalistic: {
      name: 'Naturalistic',
      icon: '🌿',
      exemplar: 'Jadav Payeng (Forest Man) & Salim Ali',
      brain: 'Temporal-Parietal Pattern Recognition Circuits',
      desc: 'Recognition and classification of flora, fauna, and ecological phenomena (added 1995).',
    },
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
      {/* ─── HEADER & TOP METRICS ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 bg-slate-900/90 rounded-2xl border border-slate-800 backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-3 bg-purple-950/80 rounded-2xl border border-purple-700">{subjectConfig.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">ISC Class 12 • Psychology</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">NEP 2020 Competency Aligned</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end md:self-center">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-400 border-rose-700'
                : 'bg-gold-950/60 text-gold-400 border-gold-700'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-slate-400">Mastery</p>
            <p className="text-sm font-bold text-purple-300 capitalize">{masteryLevel}</p>
          </div>
        </div>
      </motion.div>

      {/* Canvas Neural Activity Monitor */}
      <div className="w-full h-10 bg-slate-900/50 rounded-xl overflow-hidden border border-slate-800/80">
        <canvas ref={canvasRef} width={800} height={40} className="w-full h-full" />
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 via-purple-950/40 to-slate-900 rounded-2xl border border-gold-800/60 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏛️</span>
              <h2 className="text-lg font-bold text-gold-200">{SCENARIO.title}</h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-300/90 font-medium bg-gold-900/30 p-3 rounded-xl border border-gold-800/40">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Discovery Exploration Hook</span>
              <span className="text-xs text-slate-400">Low-stakes curiosity puzzle</span>
            </div>
            <p className="text-base font-semibold text-white leading-relaxed">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(i)}
                  aria-label={`Discovery option ${i + 1}: ${opt}`}
                  className="w-full text-left p-4 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-purple-500 hover:bg-slate-800 text-slate-200 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-slate-700 text-center text-xs font-bold leading-6 mr-3 text-slate-300">{String.fromCharCode(65 + i)}</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <p className={`text-sm font-semibold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! You recognised Cattell’s fundamental Gf / Gc distinction.' : `Notice: ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-gold-600 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Guided Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
              <h3 className="text-lg font-bold text-white mt-0.5">{EXPLORATION_STEPS[currentSlide].title}</h3>
            </div>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div key={idx} className={`h-2 rounded-full transition-all ${idx === currentSlide ? 'w-8 bg-purple-500' : 'w-2 bg-slate-700'}`} />
              ))}
            </div>
          </div>

          <p className="text-amber-300 text-sm font-medium bg-amber-950/30 p-3 rounded-xl border border-amber-900/50">
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          {/* Interactive Slide Visualizations with Real-Time Direct Slider Bindings */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 min-h-[420px] flex flex-col justify-center">
            {/* Step 0: Cattell's Fluid vs Crystallised Curves */}
            {currentSlide === 0 && (
              <div className="space-y-6">
                {!predictionMade && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-purple-950/40 rounded-xl border border-purple-800/60 space-y-2">
                    <p className="text-xs font-bold uppercase text-purple-300">Brilliant Predict-Then-Check:</p>
                    <p className="text-sm text-white font-medium">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handlePrediction(i)}
                          className="text-left p-2.5 bg-slate-800 rounded-lg text-xs text-slate-200 hover:bg-slate-700 border border-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {predictionMade && !predictionVerified && (
                  <p className="text-xs text-amber-300 bg-amber-950/40 p-2 rounded-lg border border-amber-800">
                    👉 {PREDICTION_QUESTIONS[0].verifyInstruction}
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-1 space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <label className="text-xs font-bold text-slate-300 flex justify-between">
                      <span>Subject Age:</span>
                      <span className="text-purple-400 font-mono text-base">{simAge} years</span>
                    </label>
                    <input
                      type="range"
                      min={5}
                      max={85}
                      value={simAge}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setSimAge(val);
                        if (predictionMade && !predictionVerified && val >= 60) {
                          setPredictionVerified(true);
                          audioManager.play('sparkle');
                        }
                      }}
                      aria-label="Adjust subject age"
                      className="w-full accent-purple-500 cursor-pointer"
                    />

                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gold-400 font-semibold">Fluid Intelligence (Gf):</span>
                        <span className="font-mono font-bold text-gold-300">{Math.round(gfScore)}%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div className="h-full bg-gold-500 rounded-full" animate={{ width: `${gfScore}%` }} />
                      </div>

                      <div className="flex justify-between items-center text-xs pt-1">
                        <span className="text-emerald-400 font-semibold">Crystallised (Gc):</span>
                        <span className="font-mono font-bold text-emerald-300">{Math.round(gcScore)}%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div className="h-full bg-emerald-500 rounded-full" animate={{ width: `${gcScore}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* SVG Lifespan Graph */}
                  <div className="md:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 500 240" className="w-full h-auto">
                      <defs>
                        <linearGradient id="gfGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="1%" stopColor="#3b82f6" />
                        </linearGradient>
                        <linearGradient id="gcGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="1%" stopColor="#84cc16" />
                        </linearGradient>
                      </defs>

                      <line x1="50" y1="200" x2="470" y2="200" stroke="#334155" strokeWidth="1.5" />
                      <line x1="50" y1="30" x2="50" y2="200" stroke="#334155" strokeWidth="1.5" />
                      <text x="50" y="220" fill="#64748b" fontSize="10">5 yrs</text>
                      <text x="170" y="220" fill="#64748b" fontSize="10">25 yrs (Peak Gf)</text>
                      <text x="320" y="220" fill="#64748b" fontSize="10">55 yrs</text>
                      <text x="440" y="220" fill="#64748b" fontSize="10">85 yrs</text>
                      <text x="15" y="40" fill="#64748b" fontSize="10" transform="rotate(-90 20,40)">Capacity %</text>

                      <path
                        d="M 50 160 C 120 70, 160 50, 180 50 C 260 50, 360 130, 470 165"
                        fill="none"
                        stroke="url(#gfGrad)"
                        strokeWidth="3.5"
                      />
                      <path
                        d="M 50 180 C 140 140, 240 100, 350 75 C 410 65, 450 60, 470 58"
                        fill="none"
                        stroke="url(#gcGrad)"
                        strokeWidth="3.5"
                      />

                      {(() => {
                        const markerX = 50 + ((simAge - 5) / 80) * 420;
                        return (
                          <g>
                            <line x1={markerX} y1="30" x2={markerX} y2="200" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" />
                            <circle cx={markerX} cy={200 - (gfScore * 1.5)} r="5" fill="#06b6d4" />
                            <circle cx={markerX} cy={200 - (gcScore * 1.5)} r="5" fill="#10b981" />
                            <text x={markerX - 15} y="25" fill="#f43f5e" fontSize="10" fontWeight="bold">Age {simAge}</text>
                          </g>
                        );
                      })()}

                      <text x="360" y="150" fill="#06b6d4" fontSize="11" fontWeight="bold">Fluid (Gf)</text>
                      <text x="360" y="65" fill="#10b981" fontSize="11" fontWeight="bold">Crystallised (Gc)</text>
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Gardner's 8 Multiple Intelligences */}
            {currentSlide === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {Object.entries(GARDNER_DATA).map(([key, data]) => (
                    <motion.button
                      key={key}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleIntelligenceSelect(key)}
                      aria-label={`Select ${data.name} intelligence`}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        selectedIntelligence === key
                          ? 'bg-purple-900/60 border-purple-400 shadow-lg shadow-purple-900/40 ring-2 ring-purple-500/50'
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{data.icon}</span>
                      <p className="text-xs font-bold text-white">{data.name}</p>
                    </motion.button>
                  ))}
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-purple-800/50 space-y-3">
                  {selectedIntelligence && GARDNER_DATA[selectedIntelligence] && (
                    <motion.div
                      key={selectedIntelligence}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{GARDNER_DATA[selectedIntelligence].icon}</span>
                        <div>
                          <h4 className="text-sm font-bold text-purple-300">{GARDNER_DATA[selectedIntelligence].name} Intelligence</h4>
                          <span className="text-[10px] text-slate-400">Gardner’s Autonomous Module</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{GARDNER_DATA[selectedIntelligence].desc}</p>
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                        <p className="text-[11px] font-bold text-amber-300">🇮🇳 Indian Exemplar:</p>
                        <p className="text-xs text-slate-200">{GARDNER_DATA[selectedIntelligence].exemplar}</p>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                        <p className="text-[11px] font-bold text-gold-300">🧠 Neural Substrate:</p>
                        <p className="text-xs text-slate-300 font-mono">{GARDNER_DATA[selectedIntelligence].brain}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Normal Curve of IQ (Levels of Intelligence) */}
            {currentSlide === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <label className="text-xs font-bold text-slate-300 flex justify-between">
                      <span>Selected IQ Score:</span>
                      <span className="text-purple-400 font-mono text-xl">{simIq}</span>
                    </label>
                    <input
                      type="range"
                      min={15}
                      max={160}
                      value={simIq}
                      onChange={(e) => setSimIq(Number(e.target.value))}
                      aria-label="Set IQ score for bell curve"
                      className="w-full accent-purple-500 cursor-pointer"
                    />

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                      <p className="text-xs text-slate-400 font-semibold uppercase">Classification:</p>
                      <p className={`text-sm font-bold ${iqCategory.color}`}>{iqCategory.label}</p>
                      <p className="text-xs text-slate-300">{iqCategory.desc}</p>
                    </div>
                  </div>

                  {/* SVG Normal Distribution Bell Curve */}
                  <div className="md:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 500 220" className="w-full h-auto">
                      <path
                        d="M 30 200 C 120 200, 190 190, 220 120 C 240 70, 250 40, 250 40 C 250 40, 260 70, 280 120 C 310 190, 380 200, 470 200"
                        fill="none"
                        stroke="#818cf8"
                        strokeWidth="3"
                      />
                      <rect x="200" y="40" width="100" height="160" fill="#6366f1" opacity="0.15" />
                      <line x1="250" y1="40" x2="250" y2="200" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                      <text x="250" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">Mean: 100</text>
                      <text x="200" y="215" fill="#64748b" fontSize="9" textAnchor="middle">85 (-1 SD)</text>
                      <text x="300" y="215" fill="#64748b" fontSize="9" textAnchor="middle">115 (+1 SD)</text>
                      <text x="140" y="215" fill="#f43f5e" fontSize="9" textAnchor="middle">70 (ID Cutoff)</text>
                      <text x="360" y="215" fill="#10b981" fontSize="9" textAnchor="middle">130 (Gifted)</text>

                      {(() => {
                        const markerX = 30 + ((simIq - 15) / 145) * 440;
                        return (
                          <g>
                            <line x1={markerX} y1="30" x2={markerX} y2="200" stroke="#f43f5e" strokeWidth="2.5" />
                            <circle cx={markerX} cy="30" r="5" fill="#f43f5e" />
                            <text x={markerX} y="22" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">IQ {simIq}</text>
                          </g>
                        );
                      })()}
                    </svg>
                  </div>
                </div>

                {!observationAnswered && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <p className="text-xs font-bold text-amber-300 uppercase">Scientific Observation:</p>
                    <p className="text-sm text-white">{OBSERVATION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleObservation(i)}
                          className="text-left p-2.5 bg-slate-800 rounded-lg text-xs text-slate-200 hover:bg-slate-700 border border-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Step 3: Freud's Iceberg & Structural Dynamic */}
            {currentSlide === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div>
                    <label className="text-xs font-bold text-rose-400 flex justify-between">
                      <span>Id Instinctual Drive (Pleasure):</span>
                      <span className="font-mono">{idDrive}%</span>
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={idDrive}
                      onChange={(e) => setIdDrive(Number(e.target.value))}
                      aria-label="Set Id drive"
                      className="w-full accent-rose-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-amber-400 flex justify-between">
                      <span>Superego Moral Pressure:</span>
                      <span className="font-mono">{superegoDrive}%</span>
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={superegoDrive}
                      onChange={(e) => setSuperegoDrive(Number(e.target.value))}
                      aria-label="Set Superego pressure"
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-emerald-400 font-bold">Ego Reality Equilibrium:</span>
                      <span className="font-mono font-bold text-emerald-300">{Math.round(egoEquilibrium)}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${egoEquilibrium > 70 ? 'bg-emerald-500' : egoEquilibrium > 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                        animate={{ width: `${egoEquilibrium}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {egoEquilibrium > 70
                        ? 'Healthy balanced Ego mediating reality.'
                        : egoEquilibrium > 40
                        ? 'Moderate anxiety and inner conflict.'
                        : 'Severe conflict: risk of symptom formation or impulsive acting out.'}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <svg viewBox="0 0 450 240" className="w-full h-auto">
                    <rect x="0" y="80" width="450" height="160" fill="#0f172a" opacity="0.8" />
                    <line x1="0" y1="80" x2="450" y2="80" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 3" />
                    <text x="10" y="74" fill="#38bdf8" fontSize="10" fontWeight="bold">Water Surface (Threshold of Consciousness)</text>

                    <polygon points="225,20 180,80 270,80" fill="#e2e8f0" opacity="0.9" stroke="#cbd5e1" strokeWidth="1.5" />
                    <text x="225" y="60" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">Conscious (Ego)</text>

                    <polygon points="180,80 270,80 340,220 110,220" fill="#334155" opacity="0.85" stroke="#475569" strokeWidth="2" />
                    <text x="225" y="115" textAnchor="middle" fill="#94a3b8" fontSize="11">Preconscious (Memories/Knowledge)</text>
                    <text x="225" y="170" textAnchor="middle" fill="#f43f5e" fontSize="13" fontWeight="bold">UNCONSCIOUS (ID + Repressed Drives)</text>
                    <text x="225" y="195" textAnchor="middle" fill="#cbd5e1" fontSize="9">Largest mass: 90% of mental life</text>
                  </svg>
                </div>
              </div>
            )}

            {/* Step 4: Type A / B Cardiology Simulation */}
            {currentSlide === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div>
                    <label className="text-xs font-bold text-slate-300 flex justify-between">
                      <span>Weekly Work Hours:</span>
                      <span className="font-mono text-purple-400">{typeAWorkHours} hrs</span>
                    </label>
                    <input
                      type="range"
                      min={20}
                      max={80}
                      value={typeAWorkHours}
                      onChange={(e) => setTypeAWorkHours(Number(e.target.value))}
                      aria-label="Set work hours"
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 flex justify-between">
                      <span>Hostility & Time Urgency:</span>
                      <span className="font-mono text-rose-400">{typeAHostility}%</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={typeAHostility}
                      onChange={(e) => setTypeAHostility(Number(e.target.value))}
                      aria-label="Set hostility percentage"
                      className="w-full accent-rose-500 cursor-pointer"
                    />
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-rose-400">Cardiovascular Risk Index:</span>
                      <span className="font-mono font-bold text-rose-300">{cardiacRiskPercent}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-600 rounded-full"
                        animate={{ width: `${cardiacRiskPercent}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-300 pt-1">
                      {cardiacRiskPercent > 65
                        ? 'High Type A profile: 2x risk of Coronary Heart Disease (AIIMS study).'
                        : 'Moderate / Type B profile: relaxed, lower autonomic strain.'}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-2 bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-center space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-4 rounded-xl border ${cardiacRiskPercent > 50 ? 'bg-rose-950/40 border-rose-700' : 'bg-slate-900 border-slate-800'}`}>
                      <h4 className="text-xs font-bold text-rose-400 uppercase">Type A Characteristics</h4>
                      <ul className="text-xs text-slate-300 mt-2 space-y-1">
                        <li>• Chronic time urgency & multitasking</li>
                        <li>• Competitive striving</li>
                        <li>• Underlying irritability / hostility</li>
                        <li>• Sympathetic nervous system activation</li>
                      </ul>
                    </div>

                    <div className={`p-4 rounded-xl border ${cardiacRiskPercent <= 50 ? 'bg-emerald-950/40 border-emerald-700' : 'bg-slate-900 border-slate-800'}`}>
                      <h4 className="text-xs font-bold text-emerald-400 uppercase">Type B Characteristics</h4>
                      <ul className="text-xs text-slate-300 mt-2 space-y-1">
                        <li>• Relaxed, unhurried pace</li>
                        <li>• Patient problem-solving</li>
                        <li>• Low interpersonal hostility</li>
                        <li>• Resilient stress regulation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Slide Navigation */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              aria-label="Previous lab slide"
              className="px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-xl disabled:opacity-40 border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-mono">Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}</span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                aria-label="Next lab slide"
                className="px-5 py-2 bg-purple-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-purple-500"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Advance to free play sandbox"
                className="px-6 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-lg hover:bg-emerald-500"
              >
                Enter Free Sandbox 🧪
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-purple-950/60 to-slate-900 rounded-2xl border border-purple-800/60">
            <h3 className="text-lg font-bold text-white">🧪 Psychological Sandbox Lab (Free Play)</h3>
            <p className="text-xs text-slate-300 mt-1">
              Manipulate psychometric and personality parameters freely without grades or timers. Sliders update the visualization instantly!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase text-purple-400">1. Age & Intelligence Dynamics</h4>
              <label className="text-xs text-slate-300 flex justify-between">
                <span>Age:</span>
                <span className="font-mono text-purple-400">{simAge} yrs</span>
              </label>
              <input
                type="range"
                min={5}
                max={85}
                value={simAge}
                onChange={(e) => setSimAge(Number(e.target.value))}
                aria-label="Sandbox age control"
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 bg-slate-950 rounded-lg border border-gold-800 text-gold-300">Fluid (Gf): {Math.round(gfScore)}%</div>
                <div className="p-2 bg-slate-950 rounded-lg border border-emerald-800 text-emerald-300">Crystallised (Gc): {Math.round(gcScore)}%</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase text-purple-400">2. Normal Curve IQ Benchmark</h4>
              <label className="text-xs text-slate-300 flex justify-between">
                <span>Simulated IQ:</span>
                <span className="font-mono text-purple-400">{simIq}</span>
              </label>
              <input
                type="range"
                min={20}
                max={160}
                value={simIq}
                onChange={(e) => setSimIq(Number(e.target.value))}
                aria-label="Sandbox IQ control"
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="p-2 bg-slate-950 rounded-lg text-xs border border-slate-800">
                <span className={`font-bold ${iqCategory.color}`}>{iqCategory.label}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Begin graded challenge questions"
              className="px-7 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-emerald-500/25"
            >
              Ready for Competency Challenges! 🎯 →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES (ADAPTIVE & NEP 2020 ALIGNED) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 uppercase font-semibold">
                  Competency: {challenge.competencyLevel}
                </span>
                <span className="text-[10px] text-slate-400">Node: {challenge.nodeId}</span>
              </div>
            </div>

            <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase border ${
              challenge.difficulty === 'foundation'
                ? 'text-emerald-400 border-emerald-800 bg-emerald-950/50'
                : challenge.difficulty === 'advanced'
                ? 'text-rose-400 border-rose-800 bg-rose-950/50'
                : 'text-gold-400 border-gold-800 bg-gold-950/50'
            }`}>
              {challenge.difficulty}
            </span>
          </div>

          {/* Motion Animated Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-gold-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/60 border-2 border-rose-500 shadow-lg shadow-rose-950/50' : 'border-slate-800'
            }`}
          >
            <p className="text-base md:text-lg font-semibold text-white leading-relaxed mb-5">
              {challenge.question}
            </p>

            {/* MCQ Type */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 border-slate-700 hover:border-purple-500 hover:bg-slate-800 text-slate-200'
                    }`}
                  >
                    <span className="inline-block w-6 h-6 rounded-full bg-slate-700 text-center text-xs font-bold leading-6 mr-3 text-slate-300">{String.fromCharCode(65 + i)}</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2.5 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      className="px-3.5 py-1.5 bg-purple-700 text-white rounded-lg text-xs font-bold cursor-grab shadow-sm"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 't_bio', label: 'Inborn Biological Emotional Reactivity' },
                    { id: 't_enduring', label: 'Enduring Cross-Situational Behaviour Quality' },
                    { id: 't_moral', label: 'Moral & Ethical Evaluated Dimension of Behaviour' },
                    { id: 't_situation', label: 'Situation-Specific Learned Automatic Response' },
                  ].map(slot => (
                    <div
                      key={slot.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(slot.id)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col justify-center min-h-[90px] transition-all ${
                        droppedLabels[slot.id] ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200' : 'bg-slate-950/60 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-xs">{slot.label}</span>
                      <span className="text-sm font-bold mt-1 text-purple-300">
                        {droppedLabels[slot.id] ? `✓ ${droppedLabels[slot.id]}` : 'Drop matching label here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Submit label mappings"
                  className="px-5 py-2.5 bg-purple-600 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Verify All Mappings ✓
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center justify-between"
                  >
                    <span>{displayIdx + 1}. {item}</span>
                    <span className="text-slate-500 text-sm">☰</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Submit sorted order"
                  className="px-5 py-2.5 bg-purple-600 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Check Sequence ✓
                </motion.button>
              </div>
            )}

            {/* Numeric Type */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    aria-label="Numeric answer input"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="text-xs text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit numeric answer"
                    className="px-5 py-2.5 bg-purple-600 text-white font-bold text-xs rounded-xl shadow-md disabled:opacity-50"
                  >
                    Calculate & Check
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add part ${part}`}
                      className="px-3 py-1.5 bg-purple-800 text-white text-xs font-bold rounded-lg border border-purple-600"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gold-800 text-white text-xs rounded-lg flex items-center gap-2">
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-red-300 font-bold hover:text-white"
                        aria-label={`Remove part ${part}`}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click components above in order</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Validate constructed answer"
                  className="px-5 py-2.5 bg-purple-600 text-white font-bold text-xs rounded-xl shadow-md disabled:opacity-50"
                >
                  Validate Construction ✓
                </motion.button>
              </div>
            )}

            {/* Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-purple-950/60 to-slate-950 rounded-2xl border border-purple-700/80 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓ Explanation & Concept Walkthrough</span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs text-purple-200 leading-relaxed"
                      >
                        <span className="font-bold text-purple-400">{i + 1}.</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex gap-3">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Show next explanation step"
                      className="px-4 py-2 bg-purple-700 text-white text-xs font-bold rounded-xl"
                    >
                      Show Next Detail →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Advance to next challenge"
                      className="px-6 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-lg hover:bg-emerald-500"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Module Results →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & SYNTHESIS ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-purple-950/80 via-gold-950/60 to-slate-900 rounded-3xl border border-purple-700 text-center space-y-3">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Assessment Complete!</h2>
            <p className="text-purple-300 text-sm">
              Final Score: <span className="font-mono font-bold text-white text-base">{Math.max(0, 100 - errors * 5)}%</span> • Mastery Tier: <span className="capitalize font-bold text-emerald-400">{masteryLevel}</span>
            </p>
          </div>

          {/* MOTIVATIONAL FEEDBACK (Personalised message based on error count) */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-2">
            <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider">Performance Verdict</h3>
            <p className="text-lg md:text-xl font-black text-emerald-400">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </p>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl mx-auto">
              {errors === 0
                ? '🌟 Flawless Mastery! You demonstrated exceptional grasp of factor models, psychometrics, Goleman EQ, and psychoanalytic dynamics.'
                : errors <= 3
                ? '👍 Excellent performance! Your understanding of ISC Class 12 Psychology constructs is strong and clinically nuanced.'
                : errors <= 7
                ? '📈 Good foundational progress. Review the specific misconceptions below to strengthen your conceptual clarity for the Board exams.'
                : '💪 Keep practicing! Revisit the interactive labs and reinforce the distinction between cognitive theories and structural personality models.'}
            </p>
          </div>

          {/* REFLECTION QUESTIONS SECTION */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
              <span>🤔</span> Guided Reflection
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <p className="text-xs font-bold text-gold-300">What was the most surprising thing you learned?</p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Reflect on how Cattell's Fluid vs Crystallised intelligence diverge with age, or how Indian joint families alter the classical Freudian dynamics.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <p className="text-xs font-bold text-emerald-300">How would you explain this to a friend?</p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  How would you explain the difference between raw test-taking speed (Gf) and accumulated wisdom (Gc) using simple everyday analogies?
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <p className="text-xs font-bold text-amber-300">Where in real life might you use this?</p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Think of clinical psychometric assessments, managing Type A stress in high-pressure careers, or identifying diverse intelligences in classrooms.
                </p>
              </div>
            </div>
          </div>

          {/* Misconceptions Profile Tracking */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-900/60 space-y-3">
              <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">Your Personalised Misconception Diagnostics</h3>
              {hitMisconceptions.map(idx => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={idx} className="p-3 bg-slate-950/80 rounded-xl border border-rose-900/40 text-xs space-y-1">
                    <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                    <p className="text-emerald-300">✓ Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Visibility */}
          <div className="p-5 bg-gold-950/60 rounded-2xl border border-gold-500/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">🔁</span>
                <h3 className="text-sm font-bold text-gold-200 uppercase tracking-wider">Spaced Repetition Schedule (SRS)</h3>
              </div>
              <p className="text-xs text-slate-300">
                Based on your error count ({errors} error{errors === 1 ? '' : 's'}), your optimal memory retention interval is calculated below:
              </p>
              <div className="inline-block mt-1 px-3 py-1 bg-gold-900/80 rounded-lg border border-gold-400/50">
                <span className="text-xs font-semibold text-gold-300">Next Review: </span>
                <span className="text-sm font-black text-white">
                  {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-xl border border-gold-700/50 text-gold-300 text-xs font-mono font-bold">
              <span>📅 {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span>
            </div>
          </div>

          {/* Real-World Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">📋</span>
              <h3 className="text-sm font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            </div>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-purple-400 block mb-0.5">Step {i + 1}:</span>
                  {st}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating Feedback Elements */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Psychometric Module Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_PsychologyDefinitionIntelligenceFactorSim;