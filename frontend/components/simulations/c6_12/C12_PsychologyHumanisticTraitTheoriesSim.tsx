'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID STRING LITERAL DECLARATIONS ───
const NODE_C12_PSY_011 = 'c12_psy_011';
const NODE_C12_PSY_012 = 'c12_psy_012';
const NODE_C12_PSY_013 = 'c12_psy_013';
const NODE_C12_PSY_014 = 'c12_psy_014';
const NODE_C12_PSY_015 = 'c12_psy_015';
const NODE_C12_PSY_016 = 'c12_psy_016';
const NODE_C12_PSY_017 = 'c12_psy_017';
const NODE_C12_PSY_018 = 'c12_psy_018';
const NODE_C12_PSY_019 = 'c12_psy_019';
const NODE_C12_PSY_020 = 'c12_psy_020';

const ALL_NODE_IDS = [
  NODE_C12_PSY_011,
  NODE_C12_PSY_012,
  NODE_C12_PSY_013,
  NODE_C12_PSY_014,
  NODE_C12_PSY_015,
  NODE_C12_PSY_016,
  NODE_C12_PSY_017,
  NODE_C12_PSY_018,
  NODE_C12_PSY_019,
  NODE_C12_PSY_020,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'The Clinic at NIMHANS: Understanding Human Potential & Lifespan Arc',
  intro: 'You are an apprentice developmental psychologist at NIMHANS Bengaluru. You must guide cases spanning the entire lifespan: from newborn reflexes in the neonatal ward, to early childhood attachment, adolescent identity crises in Kota coaching centres, and adult self-actualisation through service.',
  context: 'Psychology is not about sorting people into static boxes; it is the study of continuous dynamic growth, conscious agency, cognitive maturation, and social ecology.',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'According to Carl Rogers, when a person experiences intense anxiety and self-doubt, what is the primary underlying cause?',
  options: [
    'An unresolvable unconscious conflict between Id and Superego drives',
    'A severe gap (incongruence) between their Real Self and an imposed Ideal Self',
    'A biological deficiency in central nervous system myelination',
    'A failure to receive direct physical reinforcement for good behaviour',
  ],
  correctIndex: 1,
  hintAfter: 'Do not worry if you picked another option — let us explore how humanists, trait theorists, and developmental psychologists discover how we grow!',
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

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe when comparing Maslow\'s hierarchy with Rogers\' person-centered approach?',
    observableOptions: [
      'Maslow emphasizes a tiered needs hierarchy; Rogers focuses on unconditional positive regard and self-actualization (✓)',
      'Both theories are identical in structure (✗)',
      'Maslow rejects self-actualization entirely (✗)',
      'Rogers focuses only on biological needs (✗)',
    ],
    correctIndex: 0,
  },
  {
    question: 'When examining Allport\'s trait theory, what pattern emerges about cardinal versus secondary traits?',
    observableOptions: [
      'Cardinal traits dominate a person\'s entire personality; secondary traits are situational and specific (✓)',
      'Secondary traits are more important than cardinal traits (✗)',
      'All traits have equal influence at all times (✗)',
      'Cardinal traits only appear in childhood (✗)',
    ],
    correctIndex: 0,
  },
];

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c12_psy_011)
  {
    id: 'ch_01',
    nodeId: NODE_C12_PSY_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In Carl Rogers’ person-centred theory, which term describes an individual living authentically in the present and trusting their own organismic valuing process?',
    options: ['Self-actualising archetype', 'Fully functioning person', 'Extroverted sensing type', 'Fixated ego'],
    correctIndex: 1,
    explanation: 'Rogers used the term "fully functioning person" for an individual open to experience, living existentially, and experiencing congruence between real self and ideal self.',
    hints: [
      'Think of Rogers’ specific phrase rather than Maslow’s term.',
      'It emphasises healthy psychological functioning and active growth in every moment.',
      'Rogers calls someone who is fully open to feelings and growth a "fully functioning person".',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Understanding (c12_psy_011 - Allport traits)
  {
    id: 'ch_02',
    nodeId: NODE_C12_PSY_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Mahatma Gandhi’s lifelong commitment to Ahimsa (non-violence) so completely permeated his personality that his entire life was identified with it. According to Gordon Allport, what type of trait is this?',
    options: ['Secondary trait', 'Central trait', 'Cardinal trait', 'Surface trait'],
    correctIndex: 2,
    explanation: 'A cardinal trait is so pervasive and dominant that nearly every act of the person can be traced back to it. They are rare in ordinary individuals.',
    hints: [
      'This trait is dominant and defines an entire life’s legacy.',
      'Central traits are 5 to 10 general descriptors; this is much more pervasive.',
      'Allport termed such rare, all-encompassing dispositions "cardinal traits".',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Drag-label (c12_psy_011 - OCEAN Model)
  {
    id: 'ch_03',
    nodeId: NODE_C12_PSY_011,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Label Costa and McCrae’s Big Five (OCEAN) traits onto their behavioural poles.',
    dragItems: [
      { label: 'Openness', targetId: 'ocean_o' },
      { label: 'Conscientiousness', targetId: 'ocean_c' },
      { label: 'Extraversion', targetId: 'ocean_e' },
      { label: 'Neuroticism', targetId: 'ocean_n' },
    ],
    correctMapping: {
      ocean_o: 'Openness',
      ocean_c: 'Conscientiousness',
      ocean_e: 'Extraversion',
      ocean_n: 'Neuroticism',
    },
    explanation: 'The Big Five traits represent continuous spectra: Openness (imagination/curiosity), Conscientiousness (discipline/order), Extraversion (sociability), and Neuroticism (emotional volatility).',
    hints: [
      'O stands for creativity and broad interests.',
      'C reflects meticulous goal-striving and self-discipline.',
      'N corresponds to emotional instability and anxiety vulnerability.',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation - Recall (c12_psy_015 - Reflexes)
  {
    id: 'ch_04',
    nodeId: NODE_C12_PSY_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When a doctor gently strokes the lateral sole of a 3-month-old infant from heel to toe, the big toe extends upward and the other toes fan outward. What reflex is this?',
    options: ['Moro reflex', 'Rooting reflex', 'Babinski reflex', 'Palmar grasp reflex'],
    correctIndex: 2,
    explanation: 'The Babinski reflex consists of dorsiflexion of the big toe and fanning of other toes due to unmyelinated corticospinal tracts. In adults, the normal response is downward curling.',
    hints: [
      'This reflex involves testing the sole of the infant’s foot.',
      'The big toe points upward while the others fan out.',
      'It is named after the neurologist Joseph Babinski.',
    ],
    misconceptionIndex: 3,
  },
  // 5. Foundation - Understanding (c12_psy_014 - Growth vs Maturation)
  {
    id: 'ch_05',
    nodeId: NODE_C12_PSY_014,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following correctly distinguishes biological maturation from physical growth?',
    options: [
      'Growth is qualitative mental change; maturation is quantitative height increase',
      'Growth is purely quantitative bodily increase; maturation is the genetically programmed biological unfolding of neural/muscular sequences independent of training',
      'Growth continues until death; maturation permanently stops at age two',
      'Growth depends entirely on heredity; maturation is created exclusively by environment',
    ],
    correctIndex: 1,
    explanation: 'Growth refers strictly to physical/quantitative enlargement (height, weight). Maturation is the internal biological timetable (myelination, motor sequence) unfolding regardless of practice.',
    hints: [
      'Growth can be measured with a tape measure or weighing scale.',
      'Maturation is the pre-programmed timetable that enables skills like sitting and walking.',
      'Option 2 captures the precise scientific distinction required by the ISC syllabus.',
    ],
  },
  // 6. Foundation - Drag-sort (c12_psy_016 - Piaget Sensorimotor Substages)
  {
    id: 'ch_06',
    nodeId: NODE_C12_PSY_016,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the progression of Piaget’s Sensorimotor substages in chronological developmental sequence.',
    sortItems: [
      'Modification of Reflexes (0-1 mo)',
      'Primary Circular Reactions (1-4 mo)',
      'Secondary Circular Reactions (4-8 mo)',
      'Coordination of Secondary Schemata & Object Permanence (8-12 mo)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Infants first modify basic reflexes, then repeat body-focused pleasurable acts (primary), then act on external objects (secondary), and then intentionally coordinate schemas to find hidden objects.',
    hints: [
      'Development moves from the infant’s own body outward to the external world.',
      'Circular reactions progress from primary (body) to secondary (external objects).',
      'Intentional schema coordination and object permanence solidify around 8-12 months.',
    ],
  },
  // 7. Foundation - Recall (c12_psy_017 - Motor Skills)
  {
    id: 'ch_07',
    nodeId: NODE_C12_PSY_017,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A Class 1 child learns to write the loops of the Devanagari script and button her school uniform. These activities are prime examples of:',
    options: ['Gross motor skills', 'Fine motor skills', 'Cephalocaudal reflex arcs', 'Vestibular orienting'],
    correctIndex: 1,
    explanation: 'Fine motor skills involve small muscle coordination in the fingers, hands, wrists, and face, such as writing, drawing, cutting with scissors, and fastening buttons.',
    hints: [
      'Think about whether this requires whole-body large muscles or delicate finger muscles.',
      'Gross motor involves running and kicking; small precision tasks are fine motor.',
      'The coordination of small muscles of the hand represents fine motor skills.',
    ],
  },
  // 8. Standard - Application (c12_psy_012 - Bandura Reciprocal Determinism)
  {
    id: 'ch_08',
    nodeId: NODE_C12_PSY_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Ananya in Jaipur believes she can master computer coding (Person). She spends evenings practicing algorithms (Behaviour), which earns her a scholarship to a coding bootcamp with mentors (Environment). The new environment further sharpens her self-belief. This triadic interaction illustrates:',
    options: ['One-way environmental determinism', 'Reciprocal determinism', 'Unconditional positive regard', 'Subcortical inhibition'],
    correctIndex: 1,
    explanation: 'Bandura’s reciprocal determinism shows that personal cognitive factors (P), behaviour (B), and environmental events (E) operate as interacting determinants that influence each other bidirectionally.',
    hints: [
      'Notice that the arrow of influence is not one-directional; all three components feed into one another.',
      'Bandura formulated this triadic model to reject passive behavioural conditioning.',
      'It is Albert Bandura’s principle of "reciprocal determinism".',
    ],
  },
  // 9. Standard - Analysis (c12_psy_013 - MMPI Validity Scales)
  {
    id: 'ch_09',
    nodeId: NODE_C12_PSY_013,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'During a clinical assessment at NIMHANS, a patient’s MMPI-2 report shows an unusually high score on the L (Lie) Scale and K (Correction) Scale, with a very low F (Infrequency) score. How should the clinical psychologist interpret this profile?',
    options: [
      'The patient answered randomly or was faking severe psychiatric illness',
      'The patient is attempting to present an unrealistically virtuous, defensive, and socially desirable image',
      'The patient is completely open, honest, and showing acute clinical psychosis',
      'The test is invalid because the patient did not understand the language',
    ],
    correctIndex: 1,
    explanation: 'The L (Lie) Scale detects naive attempts to claim impossible moral perfection, while high K reflects defensiveness. High L/K with low F signals "faking good" / social desirability bias.',
    hints: [
      'The L scale measures lying to look morally flawless.',
      'The K scale measures defensiveness or guarding against admitting any weakness.',
      'A high L and K combination indicates the subject is presenting an overly favourable, defensive picture.',
    ],
  },
  // 10. Standard - Numeric Calculation (c12_psy_013 - MMPI Items)
  {
    id: 'ch_10',
    nodeId: NODE_C12_PSY_013,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The standard adult MMPI-2 self-report inventory contains exactly how many True/False test items?',
    correctAnswer: 567,
    tolerance: 0,
    unit: 'items',
    explanation: 'The MMPI-2 contains 567 True/False items assessing 10 clinical scales and multiple validity scales.',
    hints: [
      'It is between 500 and 600 items.',
      'It ends with the number 67.',
      'The exact number of items on the MMPI-2 is 567.',
    ],
  },
  // 11. Standard - Application (c12_psy_014 - Bronfenbrenner Systems)
  {
    id: 'ch_11',
    nodeId: NODE_C12_PSY_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A software engineer father in Bengaluru experiences heavy workplace layoffs and overtime stress at his IT firm. Even though his 8-year-old daughter never visits his office, his exhaustion causes him to be irritable at home. In Bronfenbrenner’s Ecological Systems Theory, the father’s workplace is part of the child’s:',
    options: ['Microsystem', 'Mesosystem', 'Exosystem', 'Macrosystem'],
    correctIndex: 2,
    explanation: 'The Exosystem consists of settings that the developing child does not directly enter or participate in, but which nonetheless indirectly affect the child’s immediate environment.',
    hints: [
      'The child never visits or participates directly in this setting.',
      'The microsystem is direct contact (home, school). The exosystem exerts indirect impact.',
      'A parent’s workplace or city council is classified under the Exosystem.',
    ],
    misconceptionIndex: 4,
  },
  // 12. Standard - Analysis (c12_psy_016 - Ainsworth Strange Situation)
  {
    id: 'ch_12',
    nodeId: NODE_C12_PSY_016,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In Mary Ainsworth’s Strange Situation, 14-month-old Kabir does not cry when his mother leaves the room, plays indifferently with the stranger, and actively avoids eye contact or turns away when his mother returns. Which attachment pattern does Kabir display?',
    options: ['Secure (Type B)', 'Anxious-Avoidant (Type A)', 'Anxious-Resistant / Ambivalent (Type C)', 'Disorganised-Disoriented (Type D)'],
    correctIndex: 1,
    explanation: 'Type A (Anxious-Avoidant) infants show minimal separation distress and conspicuously ignore, look away from, or avoid physical proximity to the caregiver upon reunion.',
    hints: [
      'Notice that the infant avoids contact during reunion instead of seeking comfort.',
      'Type C babies show anger and resist soothing; Type A babies act detached and avoidant.',
      'This aloof, turning-away reunion behavior defines Anxious-Avoidant (Type A) attachment.',
    ],
  },
  // 13. Standard - Application (c12_psy_017 - Piaget Preoperational Thinking)
  {
    id: 'ch_13',
    nodeId: NODE_C12_PSY_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: '4-year-old Aarav in Delhi is shown two identical balls of clay. When the examiner rolls one ball into a long thin sausage shape, Aarav insists the sausage has "more clay because it is longer". Which cognitive limitations of Piaget’s Preoperational stage are demonstrated here?',
    options: [
      'Formal deductive logic and class inclusion',
      'Centration and lack of reversibility',
      'Abstract propositional thinking and decentration',
      'Sensorimotor tertiary circular reactions',
    ],
    correctIndex: 1,
    explanation: 'Aarav focuses only on one visual dimension (length) while ignoring thickness (centration) and cannot mentally roll the sausage back into a ball (lack of reversibility).',
    hints: [
      'The child centres only on the length dimension.',
      'The child cannot mentally reverse the physical transformation.',
      'This reflects Centration and the absence of Reversibility in preoperational thought.',
    ],
  },
  // 14. Standard - Drag-sort (c12_psy_018 - Gender Concept Development)
  {
    id: 'ch_14',
    nodeId: NODE_C12_PSY_018,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Order the developmental emergence of childhood gender concepts from earliest to latest age.',
    sortItems: [
      'Gender Awareness (~2 yrs: noticing boy vs girl categories)',
      'Gender Identity (~2.5-3 yrs: self-labelling "I am a boy/girl")',
      'Gender Stability (~3-4 yrs: knowing boys grow into men over time)',
      'Gender Consistency (~5-7 yrs: knowing gender remains invariant across dress/hair changes)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Children first show awareness of categories, then label themselves (identity), then realize gender does not change over time (stability), and finally grasp that external appearance does not alter underlying gender (consistency).',
    hints: [
      'Categorization precedes self-labelling.',
      'Stability (across time) develops before consistency (across superficial appearance changes).',
      'The order is Awareness → Identity → Stability → Consistency.',
    ],
  },
  // 15. Standard - Application (c12_psy_018 - Kohlberg Moral Reasoning)
  {
    id: 'ch_15',
    nodeId: NODE_C12_PSY_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In response to the Heinz dilemma, 15-year-old Rohan says: "Heinz was wrong to steal because laws exist to maintain social order; if everyone broke laws when desperate, society would collapse into chaos." At which Kohlberg moral level is Rohan reasoning?',
    options: ['Pre-conventional (Stage 1 Punishment)', 'Pre-conventional (Stage 2 Instrumental)', 'Conventional (Stage 4 Law and Order)', 'Post-conventional (Stage 6 Universal Ethics)'],
    correctIndex: 2,
    explanation: 'Rohan’s reasoning appeals to duty, preserving institutional social order, and upholding laws for the collective welfare, which defines Stage 4 Conventional morality.',
    hints: [
      'Rohan does not talk about personal reward/punishment (pre-conventional).',
      'He focuses on societal rules, law enforcement, and maintaining social stability.',
      'This is Conventional Stage 4: Law and Order / Social-system maintenance.',
    ],
  },
  // 16. Standard - Construct (c12_psy_019 - HPG Axis Sequence)
  {
    id: 'ch_16',
    nodeId: NODE_C12_PSY_019,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the correct pubertal endocrine cascade starting from the brain trigger to target sex hormone release.',
    availableParts: ['Hypothalamus (GnRH)', '→', 'Anterior Pituitary (FSH & LH)', '→', 'Gonads (Testes/Ovaries)', '→', 'Testosterone / Oestrogen'],
    targetState: 'Hypothalamus (GnRH) → Anterior Pituitary (FSH & LH) → Gonads (Testes/Ovaries) → Testosterone / Oestrogen',
    validationHint: 'Order from Hypothalamus to Pituitary to Gonads to final Sex Hormones.',
    explanation: 'Puberty is initiated by pulsatile GnRH release from the hypothalamus, stimulating pituitary secretion of FSH/LH, which triggers gonadal production of testosterone/oestrogen.',
    hints: [
      'Start with the brain region that acts as the biological starter pistol (Hypothalamus).',
      'The anterior pituitary is stimulated next by GnRH.',
      'Gonads release testosterone and oestrogen under gonadotropin stimulation.',
    ],
  },
  // 17. Advanced - Evaluation (c12_psy_011 - Trait vs Humanistic Evaluation)
  {
    id: 'ch_17',
    nodeId: NODE_C12_PSY_011,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Critically evaluate the core epistemological difference between Raymond Cattell’s trait methodology and Carl Rogers’ humanistic phenomenological approach.',
    options: [
      'Cattell relies on dream analysis; Rogers relies exclusively on laboratory conditioning of animals',
      'Cattell uses objective psychometric factor analysis to discover underlying source traits; Rogers relies on subjective phenomenological understanding of the client’s internal frame of reference and conscious striving',
      'Cattell believes traits change hourly; Rogers claims personality is biologically fixed at conception',
      'Both approaches reject all quantitative and qualitative measurement in favour of Ayurvedic tridosha theory',
    ],
    correctIndex: 1,
    explanation: 'Cattell grounded trait theory in statistical factor analysis of L-data, Q-data, and T-data to extract source traits. Rogers rejected treating persons as objects, prioritising the subjective inner phenomenological experience.',
    hints: [
      'Think about Cattell’s use of factor analysis for the 16 PF.',
      'Rogers prioritises empathy and how the individual consciously experiences their world.',
      'Option 2 correctly contrasts factor-analytic psychometrics with phenomenological client-centred inquiry.',
    ],
  },
  // 18. Advanced - Analysis (c12_psy_012 - Self-Efficacy Sources)
  {
    id: 'ch_18',
    nodeId: NODE_C12_PSY_012,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A rural student in Vidarbha fails his first board trial exam, causing severe exam tachycardia (heart pounding) and panic. His teacher arranges for him to observe a former student from the same village who cleared the exam, and breaks his syllabus into small daily quizzes where he achieves 100% mastery. Which two primary sources of self-efficacy did the teacher systematically activate?',
    options: [
      'Unconscious catharsis and reaction formation',
      'Mastery experiences and vicarious modeling (plus autonomic arousal regulation)',
      'Subcortical Babinski reflex integration and centration',
      'Post-conventional social contract and ego-diffusion',
    ],
    correctIndex: 1,
    explanation: 'The teacher provided mastery experiences (graduated quizzes with success) and vicarious experiences (peer model from similar background), helping calm physiological arousal.',
    hints: [
      'Achieving success on small tasks builds mastery.',
      'Watching a similar peer succeed provides a vicarious model.',
      'These are Bandura’s mastery experiences and vicarious experiences.',
    ],
  },
  // 19. Advanced - Evaluation (c12_psy_013 - Projective vs Objective in Court/Clinic)
  {
    id: 'ch_19',
    nodeId: NODE_C12_PSY_013,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In an Indian forensic psychiatric evaluation under the Mental Healthcare Act 2017, why is a multi-method assessment combining the MMPI-2 and the Thematic Apperception Test (TAT) superior to relying solely on a projective test?',
    options: [
      'Projective tests have zero validity in all clinical situations and are banned by Indian law',
      'The MMPI-2 provides objective, norm-referenced profiles with built-in validity scales (L, F, K) to detect deliberate faking, while the TAT uncovers rich qualitative thematic conflicts and motives, compensating for each other’s vulnerabilities',
      'The TAT is completely computer-scorable whereas the MMPI-2 requires subjective psychoanalytic intuition',
      'Self-report inventories cannot be administered to literate adults',
    ],
    correctIndex: 1,
    explanation: 'Objective inventories (MMPI-2) offer psychometric reliability, normative scoring, and validity scales against dissimulation; projective tools (TAT) access unconscious thematic dynamics that cannot be easily articulated in T/F items.',
    hints: [
      'Consider the strength of MMPI validity scales against lying.',
      'Consider the strength of TAT in exploring underlying story themes and conflicts.',
      'A multi-method battery leverages MMPI objectivity alongside TAT depth.',
    ],
  },
  // 20. Advanced - Analysis (c12_psy_019 & c12_psy_020 - Asynchronous Brain Remodeling)
  {
    id: 'ch_20',
    nodeId: NODE_C12_PSY_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Neuroimaging studies of Indian adolescents show a developmental mismatch: the limbic system (amygdala, nucleus accumbens) matures earlier in puberty, whereas the prefrontal cortex continues synaptic pruning and myelination until the mid-twenties. How does this neurological asynchrony explain adolescent vulnerability to substance abuse and reckless peer-driven risk-taking?',
    options: [
      'It causes complete loss of formal operational cognitive capability',
      'Hyper-responsive socio-emotional reward and sensation-seeking circuits outpace still-maturing executive cognitive control and impulse regulation',
      'It leads to the permanent loss of all childhood gross motor reflexes',
      'It causes immediate role diffusion and irreversible juvenile delinquency',
    ],
    correctIndex: 1,
    explanation: 'Laurence Steinberg’s dual-systems model demonstrates that reward-seeking limbic systems peak under pubertal hormones before prefrontal top-down inhibitory control is fully wired, creating a temporary regulatory gap.',
    hints: [
      'The emotional/reward engine is running at full power.',
      'The cognitive braking system (prefrontal cortex) is still being built.',
      'This mismatch creates heightened sensation-seeking with immature impulse inhibition.',
    ],
  },
  // 21. Advanced - Distinguish (c12_psy_020 - Anorexia vs Bulimia)
  {
    id: 'ch_21',
    nodeId: NODE_C12_PSY_020,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A 17-year-old student in Mumbai presents to a clinic. Which diagnostic constellation decisively distinguishes Anorexia Nervosa from Bulimia Nervosa?',
    options: [
      'Anorexia involves severe restriction leading to significantly low body weight (<85% expected) and distorted body image; Bulimia involves recurrent binge-eating episodes with compensatory purging, typically maintaining near-normal body weight',
      'Anorexia occurs only in boys; Bulimia occurs only in toddlers under age 5',
      'Anorexia is caused purely by lack of dopamine; Bulimia is caused by the Babinski reflex',
      'There is no clinical distinction; DSM-5 and ICD-11 merge them into a single term',
    ],
    correctIndex: 0,
    explanation: 'Anorexia is defined by severe emaciation / refusal to maintain minimally normal weight alongside intense fat phobia. Bulimia patients often maintain normal BMI despite chaotic binge-purge cycles.',
    hints: [
      'Look at body weight status in both disorders.',
      'Anorexia involves severe underweight and restriction; Bulimia centres on the binge-purge cycle with often normal weight.',
      'Option 1 represents the precise clinical criteria.',
    ],
  },
  // 22. Advanced - Evaluation & Creativity (c12_psy_020 - Erikson Identity Intervention)
  {
    id: 'ch_22',
    nodeId: NODE_C12_PSY_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In an Indian urban school where high-stakes competitive exam stress forces early career foreclosures on Class 11 students, how can school counsellors create a healthy "psychosocial moratorium" as envisioned by Erik Erikson?',
    options: [
      'Enforcing strict punitive disciplinary action whenever students express doubt about engineering or medicine',
      'Providing sanctioned spaces for students to safely explore diverse vocational interests, creative arts, and philosophical values without premature social penalty',
      'Mandating that all students remain in pre-conventional moral reasoning until age 21',
      'Administering the Rorschach test daily to eliminate all unconscious desires',
    ],
    correctIndex: 1,
    explanation: 'Erikson defined the psychosocial moratorium as a socially supported period of role experimentation where youth can try out various identities, philosophies, and talents before committing to adult roles.',
    hints: [
      'A moratorium is a temporary delay of adult commitment that allows exploration.',
      'It requires a safe, non-judgmental environment to test identities.',
      'Providing exploratory spaces without penalty fulfills Erikson’s concept.',
    ],
  },
];

// ─── PROPS & DEFAULT PROPS ───
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
  nodeId: 'c12_psy_011',
  title: 'Humanistic, Trait & Lifespan Development in Psychology',
  definition: 'Personality represents the dynamic organization within the individual of psychophysical systems that determine characteristic behavior and thought, evolving through biological maturation, cognitive construction, and social ecology across the entire lifespan.',
  eli5: 'Think of yourself as a tree. Humanists say you have an inner seed that always strives to grow toward the sunlight. Trait theorists describe the unique, sturdy patterns of your branches. Developmental psychologists study how you sprout from a seedling with basic reflexes into a complex tree with deep roots in family and culture.',
  misconceptions: [
    { misconception: 'Self-actualisation is identical to becoming rich or famous.', correction: 'Maslow defined self-actualisation as the intrinsic fulfilment of one’s human potential, autonomy, and service to others, not external celebrity or material wealth.' },
    { misconception: 'Allport’s cardinal traits are common characteristics found in all people.', correction: 'Cardinal traits are extremely rare, pervasive dispositions that dominate a person’s whole life (e.g., Gandhi’s ahimsa). Common descriptors are central traits.' },
    { misconception: 'The Big Five traits are discrete personality "types" like zodiac signs.', correction: 'The Big Five (OCEAN) factors are continuous dimensional spectra where every individual falls somewhere along a continuum.' },
    { misconception: 'Infant reflexes like Babinski mean the toes curl downwards.', correction: 'In infants with unmyelinated corticospinal tracts, the big toe extends UPWARDS and other toes fan out. Downward curling is the mature adult reflex.' },
    { misconception: 'Bronfenbrenner’s Exosystem refers to direct family conversations.', correction: 'The Exosystem involves settings the child never directly enters (like a parent’s workplace) which nonetheless indirectly affect their development.' },
  ],
  diagnosticQuestions: [
    { question: 'Who proposed the concept of the "fully functioning person"?', options: ['B.F. Skinner', 'Carl Rogers', 'Raymond Cattell', 'Sigmund Freud'], correctIndex: 1 },
    { question: 'What did Gordon Allport call the 5 to 10 general traits that describe someone?', options: ['Cardinal traits', 'Central traits', 'Secondary traits', 'Surface traits'], correctIndex: 1 },
    { question: 'Which statistical technique did Raymond Cattell use to derive the 16 PF?', options: ['Factor analysis', 'Analysis of variance', 'Chi-square test', 'Naturalistic case study'], correctIndex: 0 },
    { question: 'What does the acronym OCEAN stand for in the Five-Factor Model?', options: ['Optimism, Calmness, Energy, Altruism, Neutrality', 'Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism', 'Order, Control, Ego, Anxiety, Need', 'Organization, Conformity, Empathy, Affiliation, Novelty'], correctIndex: 1 },
    { question: 'Which infant reflex causes arms to fling outwards when support is suddenly lost?', options: ['Babinski reflex', 'Moro (startle) reflex', 'Rooting reflex', 'Palmar grasp reflex'], correctIndex: 1 },
    { question: 'At what approximate age do infants consolidate Piagetian object permanence?', options: ['0-1 month', '8-12 months', '4-5 years', '11-12 years'], correctIndex: 1 },
    { question: 'What did Lawrence Kohlberg score in moral dilemma responses like the Heinz story?', options: ['Whether the answer was Yes or No', 'The reasoning and justification behind the choice', 'How fast the subject answered', 'The subject’s emotional heart rate'], correctIndex: 1 },
    { question: 'What is Erik Erikson’s central psychosocial crisis of adolescence?', options: ['Trust vs Mistrust', 'Autonomy vs Shame', 'Ego-identity vs Role diffusion', 'Generativity vs Stagnation'], correctIndex: 2 },
  ],
  masteryCriteria: 'Mastery of Humanistic, Trait, Assessment, and Lifespan Developmental Psychology across the CISCE Class 12 curriculum.',
};

// ─── INTERACTIVE EXPLORATION STEPS (BRILLIANT.ORG STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Rogers Congruence Engine',
    instruction: 'Adjust the parental conditions of worth slider to see how Real Self and Ideal Self overlap, determining anxiety and congruence.',
    interactionType: 'slider-congruence',
    nodeId: NODE_C12_PSY_011,
  },
  {
    title: 'Lab 2: Bandura Reciprocal Triad',
    instruction: 'Click each vertex of Bandura’s Triad (Person, Behaviour, Environment) to trigger real-time feedback loops.',
    interactionType: 'click-triad',
    nodeId: NODE_C12_PSY_012,
  },
  {
    title: 'Lab 3: Bronfenbrenner Ecological Orbit',
    instruction: 'Explore the nested concentric ecological spheres from Microsystem out to Chronosystem.',
    interactionType: 'explore-ecology',
    nodeId: NODE_C12_PSY_014,
  },
  {
    title: 'Lab 4: Piagetian Conservation Lab',
    instruction: 'Transform liquid between containers and observe how preoperational centration vs concrete decentration reasons about volume.',
    interactionType: 'slider-conservation',
    nodeId: NODE_C12_PSY_017,
  },
  {
    title: 'Lab 5: Adolescent Neural Asynchrony',
    instruction: 'Balance the Limbic Reward Engine against the Prefrontal Executive Brake to observe impulse regulation.',
    interactionType: 'balance-brain',
    nodeId: NODE_C12_PSY_019,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If parents impose severe "conditions of worth" (loving only when high marks are scored), what happens to the gap between the child’s Real Self and Ideal Self?',
    options: [
      'The gap narrows to zero, producing complete emotional serenity',
      'The gap widens drastically (incongruence), generating chronic anxiety and defensiveness',
      'The Real Self completely disappears into biological reflexes',
      'The child instantly develops formal operational thinking',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now drag the "Conditions of Worth" slider to the right and observe how the two circles pull apart and the Incongruence / Anxiety meter spikes red!',
    nodeId: NODE_C12_PSY_011,
  },
  {
    question: 'Predict: When an adolescent with an immature prefrontal cortex is placed in an emotionally charged peer group, which brain circuit dominates behaviour?',
    options: [
      'The slow, analytical prefrontal executive circuit',
      'The hyper-responsive limbic reward & dopamine sensation-seeking circuit',
      'The spinal Babinski reflex arc',
      'The occipital visual cortex exclusively',
    ],
    correctIndex: 1,
    verifyInstruction: 'Move the Peer Arousal slider in Lab 5 to see the Limbic meter spike while the Prefrontal Brake lags behind!',
    nodeId: NODE_C12_PSY_019,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'NIMHANS Case Formulation: Build a Lifespan Profile',
  description: 'Select an Indian individual (a historical icon, a public figure, or a fictional student case) and formulate a 4-dimensional psychological profile using the exact frameworks mastered today.',
  steps: [
    'Identify one dominant Cardinal or Central trait (Allport) and rate their OCEAN Big Five profile.',
    'Map their developmental ecology: name one direct Microsystem influence and one indirect Exosystem influence (Bronfenbrenner).',
    'Assess their adolescent identity resolution: did they experience a healthy psychosocial moratorium or role diffusion (Erikson)?',
    'Formulate how a counsellor applying Rogers’ Unconditional Positive Regard could foster higher self-congruence.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C12_PsychologyHumanisticTraitTheoriesSim({
  nodeId = DEFAULT_PROPS.nodeId || 'c12_psy_011',
  title = DEFAULT_PROPS.title || 'Humanistic & Lifespan Psychology',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['psychology'] || { name: 'Psychology', emoji: '🧠', color: 'purple' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Brilliant.org interactive hooks state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);

  // Lab 1: Rogers Congruence state
  const [conditionsOfWorth, setConditionsOfWorth] = useState(30); // 0 to 100
  const [positiveRegard, setPositiveRegard] = useState(70); // 0 to 100

  // Lab 2: Bandura Triad state
  const [activeTriadNode, setActiveTriadNode] = useState<'person' | 'behaviour' | 'environment'>('person');
  const [triadEfficacyScore, setTriadEfficacyScore] = useState(65);

  // Lab 3: Bronfenbrenner state
  const [selectedEcoSystem, setSelectedEcoSystem] = useState<'micro' | 'meso' | 'exo' | 'macro' | 'chrono'>('micro');

  // Lab 4: Piaget Conservation state
  const [isPoured, setIsPoured] = useState(false);

  // Lab 5: Adolescent Brain Asynchrony state
  const [peerArousal, setPeerArousal] = useState(60);
  const [pfcMaturity, setPfcMaturity] = useState(40);

  // Big Five Interactive Continuum state
  const [oceanScores, setOceanScores] = useState({ O: 75, C: 80, E: 60, A: 85, N: 40 });

  // Challenge interactive states
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Non-MCQ challenge interactive states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback components state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS ANIMATION (REFLEX & COGNITIVE PULSE SIMULATION) ───
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

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const waveCount = 5;
      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        ctx.strokeStyle = i % 2 === 0 ? 'rgba(168, 85, 247, 0.4)' : 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 2;
        for (let x = 0; x < canvas.width; x += 5) {
          const y = (canvas.height / 2) + Math.sin((x * 0.03) + (frame * 0.05) + i) * 12;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      const pulseX = (frame * 2.5) % canvas.width;
      ctx.beginPath();
      ctx.arc(pulseX, canvas.height / 2, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#f43f5e';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#f43f5e';
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── AUTO HINT INACTIVITY TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0 && challenge.hints?.length > 0) {
        setCurrentHint(challenge.hints[0]);
        setShowHint(true);
        setHintCount(1);
        audioManager.play('hint');
        speechManager.speak(challenge.hints[0]);
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, challenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer]);

  // ─── CALLBACK HANDLERS ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding insight! Rogers termed this incongruence.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Psychology Labs. Interact with each model to discover core concepts.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now enter Sandbox Mode. Manipulate all variables freely without time pressure or grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge Phase started. Apply your knowledge to solve real clinical and developmental cases.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the simulator to verify your hypothesis.');
  }, []);

  const handleTriadNodeClick = useCallback((node: 'person' | 'behaviour' | 'environment') => {
    setActiveTriadNode(node);
    audioManager.play('tap');
    if (node === 'person') {
      setTriadEfficacyScore(prev => Math.min(100, prev + 10));
      speechManager.speak('Personal factor activated: Higher self-efficacy boosts initiative.');
    } else if (node === 'behaviour') {
      audioManager.play('count');
      speechManager.speak('Behaviour executed: Mastery performance creates environmental praise.');
    } else {
      audioManager.play('sparkle');
      speechManager.speak('Environment altered: Supportive mentors reinforce confidence.');
    }
  }, []);

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

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Module completed! Review your personal psychological mastery profile.');
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

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === challenge.targetState?.trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Accurate analysis! You nailed the concept.');
      setShowConfetti(true);
      setShowExplanation(true);
      setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      setShowSparkle(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify({ bestScore: 100, timestamp: Date.now() }));
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
        speechManager.speak('Let us review the step-by-step clinical explanation together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const current = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = current.splice(fromIndex, 1);
      current.splice(toIndex, 0, moved);
      return current;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleOceanSlider = useCallback((trait: 'O' | 'C' | 'E' | 'A' | 'N', val: number) => {
    setOceanScores(prev => ({ ...prev, [trait]: val }));
    audioManager.play('count');
  }, []);

  const handleResetLab = useCallback(() => {
    setConditionsOfWorth(30);
    setPositiveRegard(70);
    setIsPoured(false);
    setPeerArousal(60);
    setPfcMaturity(40);
    audioManager.play('pop');
  }, []);

  // ─── DERIVED REAL-TIME VALUES ───
  const rogersOverlapPercent = useMemo(() => {
    return Math.max(5, Math.min(95, positiveRegard - (conditionsOfWorth * 0.7)));
  }, [positiveRegard, conditionsOfWorth]);

  const rogersAnxietyLevel = useMemo(() => {
    return Math.max(0, 100 - rogersOverlapPercent);
  }, [rogersOverlapPercent]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-purple-950/80 rounded-2xl border border-purple-700 shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-800">
                ISC Class 12 • {subjectConfig.name}
              </span>
              <span className="text-xs text-slate-400">10 Syllabic Nodes</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation / Status */}
        <div className="flex items-center gap-2" role="region" aria-label="Simulation phase progress">
          {['discovery', 'explore', 'sandbox', 'challenge', 'complete'].map((p, idx) => (
            <div
              key={p}
              className={`text-xs px-3 py-1 rounded-full font-bold transition-all ${
                phase === p
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-slate-900 text-slate-500 border border-slate-800'
              }`}
            >
              {idx + 1}. {p.charAt(0).toUpperCase() + p.slice(1)}
            </div>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-purple-950/70 via-slate-900 to-slate-950 rounded-2xl border border-purple-800/80 shadow-xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-purple-400 bg-purple-900/50 px-2.5 py-1 rounded-lg">
              Clinical Case Entry
            </span>
            <h2 className="text-2xl font-bold text-white mt-3">{SCENARIO.title}</h2>
            <p className="text-slate-300 mt-2 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-400">
              💡 <span className="text-slate-200 font-semibold">Psychological Framework:</span> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <span>🎯</span> Curiosity Challenge (Diagnostic Intuition)
            </div>
            <h3 className="text-lg font-bold text-white">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/60 border border-slate-800 text-slate-400'
                      : 'bg-slate-800/90 hover:bg-purple-900/30 border border-slate-700/60 text-slate-200'
                  }`}
                >
                  <span className="inline-block w-6 font-bold text-purple-400">{String.fromCharCode(65 + i)}.</span>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="text-emerald-400 font-bold mr-2">✓</span>}
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-slate-800">
                <p className={`text-sm font-medium mb-4 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Exceptional intuition! Let us investigate the exact visual mechanics.' : `ℹ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Labs"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-gold-600 hover:from-purple-500 hover:to-gold-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-purple-600/30"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION LABS ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900/70 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                aria-label="Go to previous interactive lab"
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold rounded-lg text-slate-300"
              >
                ← Prev
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (currentSlide < EXPLORATION_STEPS.length - 1) {
                    setCurrentSlide(s => s + 1);
                    audioManager.play('whoosh');
                  } else {
                    handleAdvanceToSandbox();
                  }
                }}
                aria-label={currentSlide < EXPLORATION_STEPS.length - 1 ? "Go to next interactive lab" : "Enter free play sandbox"}
                className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-xs font-bold rounded-lg text-white"
              >
                {currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next Lab →' : 'Enter Sandbox →'}
              </motion.button>
            </div>
          </div>

          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl">
            <p className="text-amber-300 text-sm font-semibold mb-4">
              👉 {EXPLORATION_STEPS[currentSlide].instruction}
            </p>

            {/* ─── LAB 1: ROGERS CONGRUENCE & SELF THEORY ─── */}
            {currentSlide === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800/80">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-rose-400">✗ Conditions of Worth (Parental Demands)</span>
                      <span className="text-rose-300">{conditionsOfWorth}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={conditionsOfWorth}
                      onChange={e => setConditionsOfWorth(Number(e.target.value))}
                      aria-label="Conditions of Worth slider"
                      className="w-full accent-rose-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-emerald-400">�� Unconditional Positive Regard (Counsellor/Home)</span>
                      <span className="text-emerald-300">{positiveRegard}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={positiveRegard}
                      onChange={e => setPositiveRegard(Number(e.target.value))}
                      aria-label="Unconditional Positive Regard slider"
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  {/* Predict Then Check */}
                  {!predictionMade && (
                    <div className="p-3 bg-purple-950/40 rounded-xl border border-purple-900/60 mt-4">
                      <p className="text-xs font-bold text-purple-300 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={`Prediction option ${i + 1}: ${opt}`}
                            className="w-full text-left p-2 bg-slate-900 hover:bg-purple-900/50 text-xs rounded-lg text-slate-300"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-amber-300">
                      ℹ {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[11px] text-slate-400 uppercase font-bold">✓ Overlap (Congruence)</span>
                      <p className="text-xl font-black text-emerald-400 mt-1">{rogersOverlapPercent.toFixed(0)}%</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[11px] text-slate-400 uppercase font-bold">✗ Psychological Anxiety</span>
                      <p className="text-xl font-black text-rose-400 mt-1">{rogersAnxietyLevel.toFixed(0)}%</p>
                    </div>
                  </div>
                </div>

                {/* SVG Representation of Rogers Self Overlap */}
                <div className="flex flex-col items-center justify-center bg-slate-900/60 p-4 rounded-xl border border-slate-800 min-h-[260px]">
                  <svg viewBox="0 0 320 200" className="w-full max-w-[280px]" aria-label="Rogers Real vs Ideal Self Overlap Diagram">
                    <motion.circle
                      cx={160 - (100 - rogersOverlapPercent) * 0.6}
                      cy="100"
                      r="60"
                      fill="rgba(59, 130, 246, 0.35)"
                      stroke="#3b82f6"
                      strokeWidth="2.5"
                    />
                    <motion.circle
                      cx={160 + (100 - rogersOverlapPercent) * 0.6}
                      cy="100"
                      r="60"
                      fill="rgba(236, 72, 153, 0.35)"
                      stroke="#ec4899"
                      strokeWidth="2.5"
                    />
                    <text x="100" y="40" fill="#60a5fa" fontSize="11" fontWeight="bold">Real Self</text>
                    <text x="220" y="40" fill="#f472b6" fontSize="11" fontWeight="bold">Ideal Self</text>
                    <text x="160" y="105" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="black">
                      {rogersOverlapPercent > 50 ? '✓ Congruent' : '✗ Incongruent'}
                    </text>
                  </svg>
                  <p className="text-xs text-slate-400 text-center mt-2">
                    {rogersOverlapPercent > 60
                      ? '✓ Fully Functioning State: Real Self aligns with Ideal Self (Low Anxiety)'
                      : '✗ Incongruence State: Imposed conditions of worth create defensive neurotic anxiety'}
                  </p>
                </div>
              </div>
            )}

            {/* ─── LAB 2: BANDURA RECIPROCAL DETERMINISM ─── */}
            {currentSlide === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800/80">
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">
                    Click each vertex of the Triad to observe how internal cognitive self-efficacy (Person), actions (Behaviour), and social feedback (Environment) co-determine personality.
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleTriadNodeClick('person')}
                      aria-label="Select Person vertex: Beliefs and Self-Efficacy"
                      className={`p-3 rounded-xl text-center border font-bold text-xs ${
                        activeTriadNode === 'person' ? 'bg-purple-600 text-white border-purple-400 shadow-lg' : 'bg-slate-900 text-slate-300 border-slate-800'
                      }`}
                    >
                      🧠 Person (P)<br /><span className="text-[10px] font-normal">Beliefs / Self-Efficacy</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleTriadNodeClick('behaviour')}
                      aria-label="Select Behaviour vertex: Actions and Effort"
                      className={`p-3 rounded-xl text-center border font-bold text-xs ${
                        activeTriadNode === 'behaviour' ? 'bg-gold-600 text-white border-gold-400 shadow-lg' : 'bg-slate-900 text-slate-300 border-slate-800'
                      }`}
                    >
                      ⚡ Behaviour (B)<br /><span className="text-[10px] font-normal">Actions / Effort</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleTriadNodeClick('environment')}
                      aria-label="Select Environment vertex: Mentors and Models"
                      className={`p-3 rounded-xl text-center border font-bold text-xs ${
                        activeTriadNode === 'environment' ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg' : 'bg-slate-900 text-slate-300 border-slate-800'
                      }`}
                    >
                      🌍 Environment (E)<br /><span className="text-[10px] font-normal">Mentors / Models</span>
                    </motion.button>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-300">Bandura Task-Specific Self-Efficacy Index:</span>
                      <span className="text-purple-400">{triadEfficacyScore} / 100</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-gold-400 h-full rounded-full"
                        animate={{ width: `${triadEfficacyScore}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2">
                      {activeTriadNode === 'person' && '🧠 Person: High self-efficacy increases resilience and task persistence during difficulties.'}
                      {activeTriadNode === 'behaviour' && '⚡ Behaviour: Successful problem-solving builds Mastery Experiences, the most potent efficacy source.'}
                      {activeTriadNode === 'environment' && '🌍 Environment: Observing similar Indian peers succeeding provides strong Vicarious Reinforcement.'}
                    </p>
                  </div>
                </div>

                {/* SVG Triadic Loop */}
                <div className="flex items-center justify-center bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <svg viewBox="0 0 300 240" className="w-full max-w-[280px]" aria-label="Bandura Triadic Reciprocal Determinism Diagram">
                    <polygon points="150,30 50,190 250,190" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="4" />
                    <line x1="150" y1="50" x2="70" y2="180" stroke="#a855f7" strokeWidth="2.5" />
                    <line x1="150" y1="50" x2="230" y2="180" stroke="#38bdf8" strokeWidth="2.5" />
                    <line x1="70" y1="190" x2="230" y2="190" stroke="#10b981" strokeWidth="2.5" />

                    <circle cx="150" cy="30" r="28" fill="#581c87" stroke="#c084fc" strokeWidth="2" />
                    <text x="150" y="34" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Person (P)</text>

                    <circle cx="50" cy="190" r="28" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2" />
                    <text x="50" y="194" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Behaviour (B)</text>

                    <circle cx="250" cy="190" r="28" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                    <text x="250" y="194" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Environment (E)</text>
                  </svg>
                </div>
              </div>
            )}

            {/* ─── LAB 3: BRONFENBRENNER ECOLOGICAL SYSTEMS ─── */}
            {currentSlide === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800/80">
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Click each nested layer of Bronfenbrenner’s Ecological Systems Theory to inspect Indian examples:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { key: 'micro', label: '1. Microsystem' },
                      { key: 'meso', label: '2. Mesosystem' },
                      { key: 'exo', label: '3. Exosystem' },
                      { key: 'macro', label: '4. Macrosystem' },
                      { key: 'chrono', label: '5. Chronosystem' },
                    ].map(s => (
                      <motion.button
                        key={s.key}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setSelectedEcoSystem(s.key as any);
                          audioManager.play('tap');
                        }}
                        aria-label={`Select ecological layer: ${s.label}`}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          selectedEcoSystem === s.key ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                        }`}
                      >
                        {s.label}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs leading-relaxed space-y-1.5">
                    {selectedEcoSystem === 'micro' && (
                      <>
                        <p className="font-bold text-purple-300">🏠 Microsystem (Direct Immediate Contact):</p>
                        <p className="text-slate-300">The immediate settings where the child actively interacts: joint-family elders, school classroom peers, siblings, and anganwadi workers.</p>
                      </>
                    )}
                    {selectedEcoSystem === 'meso' && (
                      <>
                        <p className="font-bold text-gold-300">🔗 Mesosystem (Inter-System Linkages):</p>
                        <p className="text-slate-300">Connections between microsystems: parent-teacher meetings, collaboration between home expectations and school homework demands.</p>
                      </>
                    )}
                    {selectedEcoSystem === 'exo' && (
                      <>
                        <p className="font-bold text-amber-300">🏢 Exosystem (Indirect External Settings):</p>
                        <p className="text-slate-300">Environments the child never enters directly, such as a parent’s IT corporate workplace or municipal water board policies, which indirectly impact home stress.</p>
                      </>
                    )}
                    {selectedEcoSystem === 'macro' && (
                      <>
                        <p className="font-bold text-emerald-300">📜 Macrosystem (Overarching Cultural Ideology):</p>
                        <p className="text-slate-300">Collectivist cultural ethos, caste customs, dharma/duty obligations, and national laws like the Mental Healthcare Act 2017.</p>
                      </>
                    )}
                    {selectedEcoSystem === 'chrono' && (
                      <>
                        <p className="font-bold text-rose-300">⏳ Chronosystem (Socio-Historical Dimension of Time):</p>
                        <p className="text-slate-300">Historical eras and life transitions: children raised during the 2020 COVID lockdowns vs 1990s pre-internet cohorts.</p>
                      </>
                    )}
                  </div>
                </div>

                {/* SVG Nested Circles */}
                <div className="flex items-center justify-center bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <svg viewBox="0 0 300 240" className="w-full max-w-[280px]" aria-label="Bronfenbrenner Concentric Ecological Orbit Diagram">
                    <circle cx="150" cy="120" r="110" fill="none" stroke="#e11d48" strokeWidth="2" strokeDasharray="3" />
                    <circle cx="150" cy="120" r="90" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3" />
                    <circle cx="150" cy="120" r="70" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3" />
                    <circle cx="150" cy="120" r="50" fill="none" stroke="#0284c7" strokeWidth="2" strokeDasharray="3" />
                    <circle cx="150" cy="120" r="30" fill="#7e22ce" stroke="#c084fc" strokeWidth="2" />
                    <text x="150" y="124" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">Child</text>
                    <text x="150" y="80" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold">Micro</text>
                    <text x="150" y="60" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">Exo</text>
                    <text x="150" y="40" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="bold">Macro</text>
                    <text x="150" y="20" textAnchor="middle" fill="#fb7185" fontSize="8" fontWeight="bold">Chrono</text>
                  </svg>
                </div>
              </div>
            )}

            {/* ─── LAB 4: PIAGET CONSERVATION ─── */}
            {currentSlide === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800/80">
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">
                    Pour the liquid from Container A into the tall, narrow Container B. Observe why a Preoperational child (ages 2-7) fails conservation due to centration, whereas a Concrete Operational child (ages 7-11) succeeds through decentration and reversibility.
                  </p>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setIsPoured(prev => !prev);
                        audioManager.play('pop');
                      }}
                      aria-label={isPoured ? "Reverse pour back to Container A" : "Pour liquid into Container B"}
                      className="px-4 py-2 bg-gold-600 hover:bg-gold-500 font-bold text-xs rounded-xl text-white shadow-md"
                    >
                      {isPoured ? '↩ Reverse Pour to Container A' : '💧 Pour Liquid into Container B'}
                    </motion.button>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                    <p className="font-bold text-gold-300">Piagetian Cognitive Diagnostic:</p>
                    <p className="text-slate-300">
                      • <span className="text-amber-400 font-semibold">✗ Preoperational Judgement:</span> "Container B has MORE liquid because it is taller!" (Centration on height, lack of reversibility).
                    </p>
                    <p className="text-slate-300">
                      • <span className="text-emerald-400 font-semibold">✓ Concrete Operational Judgement:</span> "Both have the SAME amount; Container B is taller but narrower, and if you pour it back, it is identical." (Decentration & Reversibility).
                    </p>
                  </div>
                </div>

                {/* SVG Visual Conservation Lab */}
                <div className="flex items-center justify-center bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <svg viewBox="0 0 300 200" className="w-full max-w-[280px]" aria-label="Piaget Liquid Conservation Beaker Simulation">
                    <rect x="50" y="90" width="70" height="80" rx="4" fill="none" stroke="#94a3b8" strokeWidth="3" />
                    {!isPoured && (
                      <motion.rect
                        x="52"
                        y="120"
                        width="66"
                        height="48"
                        rx="2"
                        fill="rgba(56, 189, 248, 0.6)"
                        initial={{ height: 0 }}
                        animate={{ height: 48 }}
                      />
                    )}
                    <text x="85" y="190" textAnchor="middle" fill="#94a3b8" fontSize="10">Glass A (Wide)</text>

                    <rect x="180" y="40" width="40" height="130" rx="4" fill="none" stroke="#94a3b8" strokeWidth="3" />
                    {isPoured && (
                      <motion.rect
                        x="182"
                        y="60"
                        width="36"
                        height="108"
                        rx="2"
                        fill="rgba(56, 189, 248, 0.6)"
                        initial={{ height: 0 }}
                        animate={{ height: 108 }}
                      />
                    )}
                    <text x="200" y="190" textAnchor="middle" fill="#94a3b8" fontSize="10">Glass B (Tall)</text>
                  </svg>
                </div>
              </div>
            )}

            {/* ─── LAB 5: ADOLESCENT DUAL-SYSTEMS BRAIN ASYNCHRONY ─── */}
            {currentSlide === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800/80">
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">
                    Simulate Laurence Steinberg’s Dual-Systems Model. The socio-emotional Limbic Engine (Amygdala/Nucleus Accumbens) spikes during puberty, while Prefrontal Cortex (PFC) top-down cognitive braking matures later.
                  </p>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-rose-400">✗ Limbic Sensation / Peer Reward Drive</span>
                      <span className="text-rose-300">{peerArousal}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={peerArousal}
                      onChange={e => setPeerArousal(Number(e.target.value))}
                      aria-label="Limbic Sensation and Peer Reward Drive slider"
                      className="w-full accent-rose-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-gold-400">🛡️ Prefrontal Executive Control (Brake)</span>
                      <span className="text-gold-300">{pfcMaturity}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={pfcMaturity}
                      onChange={e => setPfcMaturity(Number(e.target.value))}
                      aria-label="Prefrontal Executive Control Brake slider"
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                    <span className="font-bold text-slate-300">Impulse Balance Output:</span>
                    <p className={`mt-1 font-extrabold ${peerArousal > pfcMaturity + 20 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {peerArousal > pfcMaturity + 20
                        ? '✗ Regulatory Gap: High vulnerability to sensation-seeking, risk-taking, and peer delinquency'
                        : '✓ Regulated State: Executive prefrontal control successfully modulates emotional impulses'}
                    </p>
                  </div>
                </div>

                {/* 2D Canvas Brain Wave Simulator */}
                <div className="flex flex-col items-center justify-center bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <canvas ref={canvasRef} width={280} height={140} className="rounded-lg border border-slate-800 w-full" aria-label="Simulated real-time synaptic potential waveform" />
                  <p className="text-[11px] text-slate-400 mt-2 text-center">
                    Simulated Real-Time Synaptic Action Potential in Adolescent Brain
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest bg-emerald-950/60 px-2.5 py-1 rounded-lg">
                  Free Play Mode
                </span>
                <h2 className="text-2xl font-black text-white mt-1">Multi-Trait & Lifespan Exploration Sandbox</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleResetLab}
                aria-label="Reset all sandbox sliders"
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 rounded-lg"
              >
                Reset All Controls
              </motion.button>
            </div>
            <p className="text-sm text-slate-300">
              Manipulate Costa & McCrae’s Big Five (OCEAN) spectra to observe dynamic behavioural trait configurations without exam scoring.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
              {[
                { key: 'O', name: 'Openness', desc: 'Curiosity vs Convention' },
                { key: 'C', name: 'Conscientiousness', desc: 'Discipline vs Carelessness' },
                { key: 'E', name: 'Extraversion', desc: 'Sociability vs Solitude' },
                { key: 'A', name: 'Agreeableness', desc: 'Compassion vs Antagonism' },
                { key: 'N', name: 'Neuroticism', desc: 'Reactivity vs Stability' },
              ].map(t => (
                <div key={t.key} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-purple-300">{t.name}</span>
                    <span className="text-purple-400">{oceanScores[t.key as keyof typeof oceanScores]}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={oceanScores[t.key as keyof typeof oceanScores]}
                    onChange={e => handleOceanSlider(t.key as any, Number(e.target.value))}
                    aria-label={`Trait slider for ${t.name}`}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                  <p className="text-[10px] text-slate-500">{t.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-400">Feeling confident with the models and empirical findings?</span>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdvanceToChallenge}
                aria-label="Proceed to CISCE Board Challenges"
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30"
              >
                Ready for CISCE Board Challenges →
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs uppercase font-extrabold px-2 py-0.5 rounded-md bg-purple-950 text-purple-300 border border-purple-800">
                  NEP Level: {challenge.competencyLevel}
                </span>
                <span className="text-xs text-slate-400">Node: {challenge.nodeId}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                    : difficulty === 'advanced'
                    ? 'bg-rose-950 text-rose-400 border border-rose-700'
                    : 'bg-gold-950 text-gold-400 border border-gold-700'
                }`}
              >
                {difficulty === 'foundation' ? '✓ ' : difficulty === 'advanced' ? '⚡ ' : '🔹 '}{difficulty} Tier
              </motion.span>
              <div className="text-right text-xs">
                <span className="text-slate-400">Score: </span>
                <span className="font-black text-white">{scoreBreakdown.correct} / {scoreBreakdown.total}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-gold-500 h-full rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900/90 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/70 border-rose-500' : 'border-slate-800'
            }`}
          >
            <h3 className="text-lg font-bold text-white mb-4 leading-relaxed">{challenge.question}</h3>

            {/* TYPE 1: MCQ */}
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
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all flex items-start gap-2 ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/90 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/90 hover:bg-purple-900/30 border border-slate-700/60 text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-purple-400">{String.fromCharCode(65 + i)}.</span>
                    {showExplanation && i === challenge.correctIndex && <span className="text-emerald-400 font-bold">✓</span>}
                    <span className="flex-1">{opt}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* TYPE 2: Drag Label */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Drag Trait:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable trait item: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-purple-700 hover:bg-purple-600 text-white rounded-lg text-xs font-bold cursor-grab shadow-sm"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'ocean_o', name: 'Openness', desc: 'Creative / Broad' },
                    { id: 'ocean_c', name: 'Conscientiousness', desc: 'Organised / Driven' },
                    { id: 'ocean_e', name: 'Extraversion', desc: 'Outgoing / Warm' },
                    { id: 'ocean_n', name: 'Neuroticism', desc: 'Anxious / Volatile' },
                  ].map(slot => (
                    <div
                      key={slot.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(slot.id)}
                      aria-label={`Drop target for ${slot.name}`}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 text-center min-h-[90px] flex flex-col justify-center items-center"
                    >
                      <span className="text-[10px] uppercase font-bold text-slate-500">{slot.desc}</span>
                      <span className="text-sm font-black text-purple-300 mt-1">
                        {droppedLabels[slot.id] ? `✓ ${droppedLabels[slot.id]}` : 'Drop Here ⬇'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Verify Big Five Mapping"
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl"
                >
                  Verify Big Five Mapping
                </motion.button>
              </div>
            )}

            {/* TYPE 3: Drag Sort */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag items to rearrange into chronological sequence:</p>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    role="button"
                    tabIndex={0}
                    aria-label={`Sortable stage ${displayIdx + 1}: ${item}`}
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-800 rounded-xl text-slate-200 text-xs font-medium cursor-grab border border-slate-700 flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-purple-900 text-purple-300 flex items-center justify-center font-bold text-[10px]">
                      {displayIdx + 1}
                    </span>
                    {item}
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  aria-label="Confirm sequence order"
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl"
                >
                  Confirm Order
                </motion.button>
              </div>
            )}

            {/* TYPE 4: Numeric */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    aria-label="Enter numerical test item count"
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-purple-500 outline-none"
                  />
                  <span className="text-xs text-slate-400 font-semibold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    aria-label="Submit numeric answer"
                    className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* TYPE 5: Construct */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, pIdx) => (
                    <motion.button
                      key={pIdx}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add part ${part} to sequence`}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-purple-900/60 border border-slate-700 text-xs font-semibold rounded-lg text-slate-200"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-purple-950 text-purple-300 border border-purple-800 text-xs rounded-lg font-bold flex items-center gap-1.5">
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        aria-label={`Remove token ${part}`}
                        className="text-rose-400 hover:text-rose-300 font-black ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600 italic">Click the tokens above to construct the endocrine sequence</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={constructParts.length === 0}
                    aria-label="Check constructed endocrine cascade"
                    className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl"
                  >
                    Check Endocrine Cascade
                  </motion.button>
                  <button
                    onClick={() => setConstructParts([])}
                    aria-label="Clear all constructed tokens"
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-400 rounded-xl font-bold"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* ─── PROGRESSIVE DISCLOSURE EXPLANATION ─── */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-purple-950/50 border border-purple-800 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-purple-300 font-bold text-xs">
                  <span>📖</span> Step-by-Step Clinical & Developmental Explanation:
                </div>
                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                  <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-purple-200 leading-relaxed">
                    <span className="font-bold text-purple-400">{i + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    aria-label="Reveal next reasoning step"
                    className="px-3 py-1.5 bg-purple-800 hover:bg-purple-700 text-white text-[11px] font-bold rounded-lg"
                  >
                    Reveal Next Reasoning Step →
                  </motion.button>
                )}

                {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleNextChallenge}
                    aria-label="Proceed to next question or complete"
                    className="block px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 mt-2"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Clinical Summary →' : 'Next Board Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MOTIVATIONAL PROFILE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-purple-950/80 via-slate-900 to-slate-950 rounded-2xl border border-purple-800 text-center space-y-3">
            <span className="text-4xl">🎓</span>
            <h2 className="text-2xl font-black text-white">ISC Psychology Lifespan Mastery Achieved!</h2>
            <p className="text-sm text-slate-300">
              Score: <span className="text-emerald-400 font-bold">✓ {Math.max(0, 100 - errors * 5)}%</span> • Mastery Tier: <span className="text-purple-300 font-bold">{masteryLevel.toUpperCase()}</span>
            </p>
          </div>

          {/* Motivational Feedback Banner */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-2" role="status" aria-live="polite">
            <h3 className="text-lg font-black text-purple-300">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xl mx-auto">
              {errors === 0
                ? '🌟 Flawless Mastery! You possess comprehensive clarity on humanistic, trait, assessment, and lifespan developmental psychology.'
                : errors <= 3
                ? '👍 Outstanding work! You demonstrated solid analytical reasoning across the developmental nodes.'
                : errors <= 7
                ? '🌱 Solid effort across the developmental nodes! Review the feedback points to solidify your understanding.'
                : '💪 Keep practicing and reviewing! Every mistake is a stepping stone to deep psychological mastery.'}
            </p>
          </div>

          {/* Misconceptions Profile */}
          {hitMisconceptions.length > 0 && misconceptions && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-900/80 space-y-3">
              <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">Your Personal Misconception Profile:</h3>
              {hitMisconceptions.map(idx => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                    <p className="text-rose-400 font-semibold">✗ Misconception: {m.misconception}</p>
                    <p className="text-emerald-400 font-medium mt-1">✓ Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Visibility (Prominent SRS Schedule) */}
          <div className="p-5 bg-gradient-to-r from-purple-950/70 via-slate-900 to-slate-900 rounded-2xl border border-purple-800/80 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">📅</span>
                <h3 className="text-sm font-black text-purple-200 uppercase tracking-wider">Spaced Repetition Schedule (SM-2)</h3>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold bg-purple-900/60 text-purple-300 border border-purple-700">
                SRS Memory Engine
              </span>
            </div>

            <div className="p-4 bg-slate-950/90 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs text-slate-400 font-medium">Personalized Next Review Timing:</p>
                <p className="text-base font-extrabold text-white mt-0.5">
                  {errors === 0
                    ? 'review in 7 days'
                    : errors <= 3
                    ? 'review in 3 days'
                    : 'review in 1 day'}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {errors === 0
                    ? '0 errors logged — optimal consolidation window reached.'
                    : errors <= 3
                    ? `${errors} errors logged — short-interval consolidation recommended.`
                    : `${errors} errors logged — immediate targeted reinforcement required.`}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 self-start sm:self-auto">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-slate-300 font-semibold">
                  {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1 border-t border-slate-800/60">
              <span>Adaptive SM-2 Interval: {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span>
              <span>Topics: c12_psy_011 – c12_psy_020</span>
            </div>
          </div>

          {/* Real World Activity Arc */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-purple-300 flex items-center gap-2">
              <span>📋</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                  <span className="font-bold text-purple-400">Step {i + 1}:</span> {st}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Feedback Overlays */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Lifespan Clinical Challenge Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_PsychologyHumanisticTraitTheoriesSim;