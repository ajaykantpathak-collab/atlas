'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID CONSTANTS ───
const NODE_C11_PSY_001 = 'c11_psy_001';
const NODE_C11_PSY_002 = 'c11_psy_002';
const NODE_C11_PSY_003 = 'c11_psy_003';
const NODE_C11_PSY_004 = 'c11_psy_004';
const NODE_C11_PSY_005 = 'c11_psy_005';
const NODE_C11_PSY_006 = 'c11_psy_006';
const NODE_C11_PSY_007 = 'c11_psy_007';
const NODE_C11_PSY_008 = 'c11_psy_008';
const NODE_C11_PSY_009 = 'c11_psy_009';
const NODE_C11_PSY_010 = 'c11_psy_010';

const ALL_PSY_NODE_IDS = [
  NODE_C11_PSY_001,
  NODE_C11_PSY_002,
  NODE_C11_PSY_003,
  NODE_C11_PSY_004,
  NODE_C11_PSY_005,
  NODE_C11_PSY_006,
  NODE_C11_PSY_007,
  NODE_C11_PSY_008,
  NODE_C11_PSY_009,
  NODE_C11_PSY_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Young Minds Clinic & Laboratory',
  intro: 'You have been appointed as a Junior Research Associate at the prestigious National Institute of Mental Health and Neurosciences (NIMHANS) in Bengaluru. You are assisting Dr. Radhakrishnan in evaluating patients, designing school anxiety studies, mapping neural-behavioural chains, and solving real-world case studies.',
  context: 'Over the course of this simulation, you will explore how human behaviour arises from stimulus-response chains, historical schools of thought, modern eclectic perspectives, heredity-environment interactions, and rigorous scientific research methods.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In 1879, Wilhelm Wundt set up the first psychology lab in Leipzig, Germany. Before this, what did scholars believe psychology was?',
  options: [
    'The study of the immortal Soul and metaphysical Mind',
    'The exact study of brain electricity and neurotransmitters',
    'A branch of criminal law and policing',
    'The study of computer algorithms and robotics',
  ],
  correctIndex: 0,
  hintAfter: 'Psychology evolved from "Study of the Soul" (Ancient Greece) → "Science of the Mind" (17th C) → "Science of Behaviour and Mental Processes" (Modern). Let us explore how!',
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

// ─── 22 COMPREHENSIVE CHALLENGES COVERING ALL 10 NODES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'psy_ch_001',
    nodeId: NODE_C11_PSY_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The word "Psychology" is derived from two Greek words: "psyche" and "logos". What do they literally mean?',
    options: [
      'Soul/Mind and Study/Discourse',
      'Body and Medicine',
      'Brain and Surgery',
      'Society and Structure',
    ],
    correctIndex: 0,
    explanation: 'Psychology originates from the Greek words "psyche" (soul or mind) and "logos" (study or discourse). Today it is defined as the scientific study of behaviour and mental processes.',
    hints: [
      'Think about ancient Greek philosophical origins of human existence.',
      '"Logos" is the root for words like biology, geology, and sociology.',
      '"Psyche" meant soul or breath of life, while "logos" meant study.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'psy_ch_002',
    nodeId: NODE_C11_PSY_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A Class 11 student in Delhi is sitting in the exam hall. She is writing down an answer while secretly feeling a surge of anxiety and recalling a diagram. Which of these correctly classifies her behaviours?',
    options: [
      'Writing is overt behaviour; feeling anxiety and recalling are covert behaviours',
      'Writing is covert behaviour; feeling anxiety is overt behaviour',
      'Both writing and thinking are overt behaviours because they happen in an exam',
      'Neither is behaviour because behaviour only means bad conduct',
    ],
    correctIndex: 0,
    explanation: 'Overt behaviour is observable and measurable directly by outside observers (writing). Covert behaviour consists of internal mental/emotional processes (recalling, feeling anxiety) that must be inferred.',
    hints: [
      'Overt means visible and open to the naked eye.',
      'Covert means hidden or inside the individual mind.',
      'An invigilator can see writing (overt) but cannot directly view her internal worry (covert).',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'psy_ch_003',
    nodeId: NODE_C11_PSY_002,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each pioneer psychologist to their corresponding foundational School of Thought.',
    dragItems: [
      { label: 'Wilhelm Wundt', targetId: 'school_struct' },
      { label: 'William James', targetId: 'school_funct' },
      { label: 'John B. Watson', targetId: 'school_behav' },
      { label: 'Sigmund Freud', targetId: 'school_psycho' },
    ],
    correctMapping: {
      school_struct: 'Wilhelm Wundt',
      school_funct: 'William James',
      school_behav: 'John B. Watson',
      school_psycho: 'Sigmund Freud',
    },
    explanation: 'Wilhelm Wundt founded Structuralism (1879), William James spearheaded Functionalism, J.B. Watson championed Behaviourism (1913), and Sigmund Freud founded Psychoanalysis.',
    hints: [
      'The Leipzig lab founder belongs to Structuralism.',
      'The pioneer who studied stream of consciousness and adaptation belongs to Functionalism.',
      'The radical scientist who rejected the unobservable mind belongs to Behaviourism.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'psy_ch_004',
    nodeId: NODE_C11_PSY_002,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Dr. Girindrasekhar Bose established the Indian Psychoanalytic Society in Calcutta in 1922. How did Bose modify Freud\'s classical psychoanalytic concept for the Indian cultural context?',
    options: [
      'He adapted the Oedipus complex to account for the dynamics of the Indian joint family and maternal bonds',
      'He rejected all mental concepts and used only Skinnerian rat conditioning',
      'He argued that structuralist introspection was superior to clinical psychoanalysis',
      'He claimed that Gestalt perception laws replace the unconscious',
    ],
    correctIndex: 0,
    explanation: 'Girindrasekhar Bose corresponded directly with Freud and indigenised psychoanalysis in India, pointing out that in joint households, child-parent attachments differ substantially from Western nuclear families.',
    hints: [
      'Bose was a psychoanalyst who engaged with Freud.',
      'Think about the Indian joint-family structure vs Western nuclear family.',
      'He reformulated the Oedipus complex and unconscious desire theories to match Indian domestic realities.',
    ],
  },
  {
    id: 'psy_ch_005',
    nodeId: NODE_C11_PSY_003,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A depressed college student in Bengaluru is treated at NIMHANS with SSRI medication, cognitive restructuring of pessimistic thoughts, and family counselling to reduce parental pressure. Which modern approach does this exemplify?',
    options: [
      'Modern Eclectic Approach integrating biological, cognitive, and socio-cultural lenses',
      'Pure Structuralism using elemental introspection',
      'Strict Behaviourism ignoring brain chemistry and family',
      'Classical Freudian Psychoanalysis relying exclusively on dream analysis',
    ],
    correctIndex: 0,
    explanation: 'The modern eclectic approach combines biological (medication), cognitive (challenging distorted thoughts), and socio-cultural (family dynamics) perspectives into a comprehensive holistic treatment.',
    hints: [
      'Notice that three distinct perspectives are combined simultaneously.',
      'No single traditional school can explain medication + thinking habits + cultural family pressure together.',
      'Integration of multiple valid lenses is called the Eclectic Approach.',
    ],
  },
  {
    id: 'psy_ch_006',
    nodeId: NODE_C11_PSY_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Section 115 of the Indian Mental Healthcare Act 2017 decriminalised suicide attempts by presuming that any person attempting suicide is under severe stress. This represents an intersection between Psychology and which discipline?',
    options: [
      'Law and Criminology',
      'Fine Arts and Musicology',
      'Computer Science and Artificial Intelligence',
      'Macroeconomics and Monetary Policy',
    ],
    correctIndex: 0,
    explanation: 'Psychology and Law/Criminology intersect here: modern forensic psychology demonstrated that suicide is a clinical cry for help and severe distress rather than a deliberate criminal offence.',
    hints: [
      'Look at the keywords: "decriminalised", "Act 2017", "offence".',
      'This reform altered the Indian Penal Code (Section 309).',
      'It represents the interface between psychological distress and legal justice.',
    ],
  },
  {
    id: 'psy_ch_007',
    nodeId: NODE_C11_PSY_005,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the primary professional distinction between a Clinical Psychologist and a Psychiatrist in India?',
    options: [
      'A Psychiatrist holds an MD degree and can prescribe medication; a Clinical Psychologist holds an M.Phil/Ph.D and conducts psychometric testing and psychotherapy',
      'A Clinical Psychologist treats physical illnesses; a Psychiatrist treats only normal school children',
      'There is no difference; both are identical job titles in government hospitals',
      'Clinical Psychologists operate only in corporate offices; Psychiatrists work in schools',
    ],
    correctIndex: 0,
    explanation: 'Psychiatrists are medical doctors (MBBS + MD) licensed to prescribe psychotropic drugs. Clinical Psychologists hold specialised postgraduate training in psychotherapy, behavioural interventions, and diagnostic testing without prescribing drugs.',
    hints: [
      'Consider medical training vs psychological testing training.',
      'Who has the authority to write a prescription for pharmaceutical medicines?',
      'Psychiatrists hold an MD in psychiatry; clinical psychologists hold clinical degrees (like M.Phil from NIMHANS).',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'psy_ch_008',
    nodeId: NODE_C11_PSY_005,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A tech company in Hyderabad hires a specialist to redesign workstation ergonomics, formulate peer motivation programs, and reduce employee burnout. Which branch of psychology is being practiced?',
    options: [
      'Organizational / Industrial Psychology',
      'Developmental Psychology',
      'Comparative Animal Psychology',
      'Physiological Neuro-anatomy',
    ],
    correctIndex: 0,
    explanation: 'Organizational (or Industrial-Organizational) psychology studies workplace behaviour, job satisfaction, employee productivity, team leadership, and burnout prevention.',
    hints: [
      'Look at the context: corporations, workplace productivity, employee burnout.',
      'It deals with industries and organisations.',
      'This field is Organizational Psychology.',
    ],
  },
  {
    id: 'psy_ch_009',
    nodeId: NODE_C11_PSY_006,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How many pairs of chromosomes are found inside the nucleus of a normal human somatic (body) cell?',
    correctAnswer: 23,
    tolerance: 0,
    unit: 'pairs',
    explanation: 'A normal human somatic cell has 46 chromosomes in total, arranged in exactly 23 pairs (22 pairs of autosomes and 1 pair of sex chromosomes).',
    hints: [
      'Total number of individual chromosomes is 46.',
      'Divide 46 by 2 to find the number of pairs.',
      'There are 22 autosome pairs plus 1 sex chromosome pair = 23.',
    ],
  },
  {
    id: 'psy_ch_010',
    nodeId: NODE_C11_PSY_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Huntington’s disease causes progressive motor and cognitive decline. It is caused by an autosomal dominant gene on chromosome 4. If an affected heterozygous parent marries a healthy non-carrier partner, what is the probability that their child will inherit the disorder?',
    options: [
      '50% (1 in 2 chance for every pregnancy)',
      '25% (1 in 4 chance)',
      '100% (all children are automatically affected)',
      '0% (dominant genes only affect grandchildren)',
    ],
    correctIndex: 0,
    explanation: 'Because Huntington\'s disease is autosomal dominant (Hh × hh), each child has a 50% chance of receiving the dominant disease allele (H) and developing the disorder.',
    hints: [
      'Draw a Punnett cross: Hh (affected parent) × hh (unaffected parent).',
      'The possible genotypes are Hh, Hh, hh, hh.',
      '2 out of 4 (50%) will inherit the mutant allele H.',
    ],
  },
  {
    id: 'psy_ch_011',
    nodeId: NODE_C11_PSY_007,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Monozygotic (identical) twins share 100% of their genetic makeup, while Dizygotic (fraternal) twins share on average 50%. Why are separated identical twin studies (like the Minnesota study) so valuable?',
    options: [
      'Because any behavioral similarities between separated identical twins highlight genetic influence, while differences highlight environmental effects',
      'Because identical twins have no environment whatsoever',
      'Because fraternal twins cannot be measured with psychological tests',
      'Because heredity is 100% responsible for all human thought and personality',
    ],
    correctIndex: 0,
    explanation: 'Separated monozygotic twins provide a natural control: their DNA is identical, so differences must stem from their distinct rearing environments, while similarities point to heritable genetic tendencies.',
    hints: [
      'Think about isolating variables in a scientific experiment.',
      'When genes are constant (100% shared), differences reveal the power of the environment.',
      'This disentangles nature from nurture scientifically.',
    ],
  },
  {
    id: 'psy_ch_012',
    nodeId: NODE_C11_PSY_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'According to the "Reaction Range" model of Heredity-Environment Interaction, what role do genes and environment play in intelligence?',
    options: [
      'Genes determine the upper and lower boundary of potential (the range), while the richness of the environment determines where within that range the individual actually functions',
      'Genes determine 100% of IQ regardless of famine or school quality',
      'Environment creates 100% of IQ from a completely blank slate with no genetic boundaries',
      'Heredity and environment take turns operating on alternate years of childhood',
    ],
    correctIndex: 0,
    explanation: 'The reaction range concept states that heredity establishes an intellectual spectrum (e.g., IQ potential 90-115), and the quality of nutrition, stimulation, and education dictates where the child ultimately scores.',
    hints: [
      'Think of heredity as the seed blueprint and environment as the soil, water, and sunlight.',
      'Neither works in complete isolation.',
      'Genes establish the boundary limits (reaction range); environment determines the phenotypic realization.',
    ],
  },
  {
    id: 'psy_ch_013',
    nodeId: NODE_C11_PSY_008,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In developmental research, what is the main methodological vulnerability of a Cross-Sectional study compared to a Longitudinal study?',
    options: [
      'The "Cohort Effect" — differences between age groups might reflect generational history (e.g., smartphone era vs radio era) rather than true biological aging',
      'Cross-sectional studies take 40 years to collect initial data',
      'Cross-sectional studies cannot use questionnaires',
      'Cross-sectional studies require tracking the exact same individual until old age',
    ],
    correctIndex: 0,
    explanation: 'A cross-sectional study tests different cohorts at one point in time. Differences observed between a 15-year-old and a 65-year-old might be due to cultural/technological generational differences (cohort effect) rather than pure developmental aging.',
    hints: [
      'Cross-sectional = snapshot of different age groups right now.',
      'Think about how someone who grew up in 1960 had different experiences from someone born in 2010.',
      'This confounding generational difference is called the Cohort Effect.',
    ],
  },
  {
    id: 'psy_ch_014',
    nodeId: NODE_C11_PSY_008,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which research method provides an in-depth, multi-dimensional clinical investigation of a single unique individual using interviews, medical archives, and family observations?',
    options: [
      'Case History / Case Study Method',
      'Double-blind Laboratory Experiment',
      'Large-scale Census Survey',
      'Twin Registry Correlation Analysis',
    ],
    correctIndex: 0,
    explanation: 'The Case Study or Case History method focuses deeply on a single individual or unit, offering qualitative richness especially valuable in rare clinical syndromes.',
    hints: [
      'Think of Freud studying Little Hans or clinicians at NIMHANS assessing a rare disorder.',
      'It investigates one subject intensely.',
      'This is the Case Study / Case History method.',
    ],
  },
  {
    id: 'psy_ch_015',
    nodeId: NODE_C11_PSY_009,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the scientific steps of a controlled psychology experiment in the correct chronological order.',
    sortItems: [
      'Identify research problem and formulate testable hypothesis',
      'Define Independent, Dependent, and Controlled variables',
      'Randomly assign participants to Experimental and Control groups',
      'Manipulate IV and accurately measure DV changes',
      'Perform statistical analysis and report verifiable conclusions',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'A scientific experiment proceeds from hypothesis formulation → variable definition → random assignment → experimental manipulation & measurement → statistical analysis and reporting.',
    hints: [
      'Start with identifying the hypothesis before doing any testing.',
      'Variables must be defined and participants assigned before treatment begins.',
      'Statistical calculation and conclusion comes as the final step.',
    ],
  },
  {
    id: 'psy_ch_016',
    nodeId: NODE_C11_PSY_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A researcher at Delhi University wants to test if 15 minutes of Pranayama (breathing exercise) reduces exam anxiety scores among Class 11 students. What is the Independent Variable (IV) and Dependent Variable (DV)?',
    options: [
      'IV = Pranayama practice (present vs absent); DV = Exam anxiety score',
      'IV = Exam anxiety score; DV = Room temperature',
      'IV = Student age; DV = Pranayama duration',
      'IV = School building size; DV = Student gender',
    ],
    correctIndex: 0,
    explanation: 'The Independent Variable (IV) is what the experimenter manipulates (Pranayama intervention). The Dependent Variable (DV) is the measured outcome (exam anxiety score).',
    hints: [
      'Ask: "What is the experimenter actively giving or changing?" → That is the IV.',
      'Ask: "What outcome metric is being measured?" → That is the DV.',
      'IV is the breathing exercise; DV is the resulting anxiety score.',
    ],
  },
  {
    id: 'psy_ch_017',
    nodeId: NODE_C11_PSY_009,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why can a large-scale Survey of 50,000 people NOT definitively establish a cause-and-effect relationship between social media usage and depression?',
    options: [
      'Because surveys are correlational and do not manipulate variables under controlled conditions; confounding variables cannot be ruled out',
      'Because surveys can only be completed by doctors',
      'Because 50,000 people is too small a sample size in India',
      'Because surveys are prohibited by the Mental Healthcare Act',
    ],
    correctIndex: 0,
    explanation: 'Surveys show statistical correlations (association) between variables, but only controlled experiments with manipulated IVs and controlled extraneous variables can establish true causation.',
    hints: [
      'Does a survey manipulate an independent variable in a lab?',
      'Correlation does not equal causation.',
      'Depressed youth might use more social media, or social media might cause depression — surveys cannot isolate the causal arrow.',
    ],
  },
  {
    id: 'psy_ch_018',
    nodeId: NODE_C11_PSY_010,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the crucial scientific difference between the Reliability and Validity of a psychological test?',
    options: [
      'Reliability is consistency of test scores upon retesting; Validity is whether the test truly measures what it claims to measure',
      'Reliability means test is translated into Hindi; Validity means test has 100 questions',
      'Reliability applies only to animals; Validity applies only to adults',
      'Reliability and Validity are identical synonyms with no scientific difference',
    ],
    correctIndex: 0,
    explanation: 'Reliability represents test consistency and repeatability over time. Validity represents truthfulness and accuracy — whether it measures the actual intended psychological construct.',
    hints: [
      'Think of a weighing scale: if it consistently shows 5 kg extra every time, it is reliable (consistent) but not valid (accurate).',
      'Reliability = Consistency; Validity = Accuracy / Truth.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'psy_ch_019',
    nodeId: NODE_C11_PSY_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Which of the following is a prominent Indian standardised test of cognitive ability developed specifically with Indian norms?',
    options: [
      'Bhatia’s Battery of Performance Tests of Intelligence (C.M. Bhatia)',
      'The London Bridge Reaction Apparatus',
      'The German Introspection Protocol of 1879',
      'The Watson Animal Maze Battery',
    ],
    correctIndex: 0,
    explanation: 'Dr. C.M. Bhatia developed the Bhatia Battery of Performance Tests of Intelligence, standardised specifically across Indian literate and non-literate populations.',
    hints: [
      'Look for the famous Indian performance battery often tested in ISC.',
      'Developed by C.M. Bhatia in Uttar Pradesh.',
      'Bhatia Battery of Performance Tests of Intelligence.',
    ],
  },
  {
    id: 'psy_ch_020',
    nodeId: NODE_C11_PSY_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A researcher conducts a psychological experiment on memory in a school. She deceives students about the real goal to prevent bias. Which ethical protocol is MANDATORY immediately after data collection?',
    options: [
      'Debriefing — explaining the true nature of the study, clearing deception, and addressing any distress',
      'Publishing student names and raw test scores in the local newspaper',
      'Denying students the right to see their performance',
      'Refusing to answer any student queries about the study',
    ],
    correctIndex: 0,
    explanation: 'Debriefing is the vital ethical requirement where the investigator explains the hypothesis, justifies any temporary deception used, ensures no lingering anxiety, and answers participant questions.',
    hints: [
      'What ethical process happens at the conclusion of an experiment?',
      'It removes any confusion or negative effects caused by experimental deception.',
      'This process is called debriefing.',
    ],
  },
  {
    id: 'psy_ch_021',
    nodeId: NODE_C11_PSY_003,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct a comprehensive 4-part Eclectic Diagnostic Framework for understanding adolescent academic stress in India by selecting the 4 essential modern pillars.',
    availableParts: [
      'Biological: Cortisol & sleep tracking',
      'Cognitive: Catastrophic thought restructuring',
      'Socio-Cultural: Joint family & competitive coaching dynamics',
      'Behavioural: Relaxation habits & token rewards',
      'Phrenological: Skull bump measurements',
      'Astrological: Zodiac horoscope charting',
    ],
    targetState: 'Biological: Cortisol & sleep tracking Cognitive: Catastrophic thought restructuring Socio-Cultural: Joint family & competitive coaching dynamics Behavioural: Relaxation habits & token rewards',
    validationHint: 'Select all 4 legitimate modern scientific psychological perspectives (exclude unscientific methods).',
    explanation: 'A comprehensive modern eclectic assessment incorporates Biological, Cognitive, Socio-Cultural, and Behavioural dimensions while rejecting pseudosciences like phrenology and astrology.',
    hints: [
      'Pick the 4 scientifically validated psychological approaches.',
      'Include Biological, Cognitive, Socio-Cultural, and Behavioural components.',
      'Do not include phrenology or astrology.',
    ],
  },
  {
    id: 'psy_ch_022',
    nodeId: NODE_C11_PSY_009,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In the landmark NIMHANS National Mental Health Survey (NMHS 2015-16), approximately what percentage of the Indian adult population was estimated to require active mental healthcare intervention?',
    correctAnswer: 13.9,
    tolerance: 1.0,
    unit: '%',
    explanation: 'The NIMHANS National Mental Health Survey across 12 Indian states revealed that nearly 13.9% of Indian adults suffered from mental morbidity requiring intervention (nearly 150 million citizens).',
    hints: [
      'The figure is around 13% to 14%.',
      'It represents approximately 1 in every 7 Indian citizens.',
      'The exact NMHS landmark figure is 13.9%.',
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
  nodeId: NODE_C11_PSY_001,
  title: 'Psychology: Foundations, Schools, Heredity & Scientific Methods',
  definition: 'Psychology is the scientific study of behaviour and mental processes of living organisms, integrating biological, behavioural, psychoanalytic, cognitive, and socio-cultural dimensions through rigorous empirical methodologies.',
  eli5: 'Psychology is the science of why we do what we do. From our brain chemicals and genes to our upbringing, thoughts, and habits — psychology uses real experiments and tests to understand the mind.',
  misconceptions: [
    {
      misconception: 'Psychology is the unscientific study of the mystical soul or mind-reading.',
      correction: 'Modern psychology is an empirical science that studies observable behaviour and verifiable mental processes through controlled experiments, tests, and observations.',
    },
    {
      misconception: 'Behaviour consists only of overt, visible body movements.',
      correction: 'Behaviour includes overt actions (walking, speaking) AND covert mental behaviours (thinking, memory, emotional feelings, decision-making).',
    },
    {
      misconception: 'Wilhelm Wundt founded Behaviourism.',
      correction: 'Wundt founded Structuralism at Leipzig in 1879; John B. Watson founded Behaviourism in 1913.',
    },
    {
      misconception: 'Clinical psychologists and psychiatrists have the exact same medical degree.',
      correction: 'Psychiatrists are medical doctors (MBBS+MD) who prescribe medications; Clinical psychologists hold doctorates/M.Phils in psychotherapy, testing, and behavioural therapy.',
    },
    {
      misconception: 'A psychological test that is reliable is automatically valid.',
      correction: 'Reliability only measures consistency; a test can give consistent wrong results and still lack validity (accuracy).',
    },
  ],
  diagnosticQuestions: [
    { question: 'What are the two Greek roots of Psychology?', options: ['Psyche & Logos', 'Physis & Nomos', 'Soma & Doxa', 'Ethos & Pathos'], correctIndex: 0 },
    { question: 'Who founded the first experimental psychology laboratory at Leipzig in 1879?', options: ['Wilhelm Wundt', 'B.F. Skinner', 'Sigmund Freud', 'Carl Rogers'], correctIndex: 0 },
    { question: 'Which school emphasizes that "the whole is greater than the sum of its parts"?', options: ['Gestalt Psychology', 'Structuralism', 'Functionalism', 'Behaviourism'], correctIndex: 0 },
    { question: 'How many chromosomes does a normal human somatic cell possess?', options: ['46 (23 pairs)', '23 total', '48 (24 pairs)', '92 (46 pairs)'], correctIndex: 0 },
    { question: 'What does the Indian Mental Healthcare Act 2017 primarily safeguard?', options: ['Rights and dignity of individuals with mental illness', 'Compulsory institutionalisation without consent', 'Banning of all psychological testing', 'Taxation of hospitals'], correctIndex: 0 },
    { question: 'What is the variable manipulated by an experimenter called?', options: ['Independent Variable', 'Dependent Variable', 'Extraneous Variable', 'Confounding Outcome'], correctIndex: 0 },
    { question: 'Which twins originate from a single fertilised ovum splitting into two?', options: ['Monozygotic (Identical) twins', 'Dizygotic (Fraternal) twins', 'Conjoined trizygotic twins', 'Dihybrid twins'], correctIndex: 0 },
    { question: 'What ethical step requires explaining any experimental deception after the study?', options: ['Debriefing', 'Informed consent', 'Voluntary coercion', 'Random allocation'], correctIndex: 0 },
  ],
  masteryCriteria: 'Demonstrate deep understanding of psychological definitions, schools of thought, eclectic approaches, heredity-environment interactions, experimental variables, and ethical testing standards.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'The Stimulus–Organism–Response (S–O–R) Chain',
    instruction: 'Adjust the Environmental Stimulus intensity and Observe how Neural Processing triggers Overt and Covert Responses.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_PSY_001,
  },
  {
    title: 'The 5 Schools of Thought Interactive Prism',
    instruction: 'Click each historical school to shine light on how different psychologists interpret human anxiety.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_PSY_002,
  },
  {
    title: 'Modern Eclectic Multi-Lens Analyzer',
    instruction: 'Balance the 5 modern perspectives (Bio, Behav, Psycho, Cog, Socio) to create an integrated clinical care plan.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_PSY_003,
  },
  {
    title: 'Heredity vs Environment: Reaction Range Explorer',
    instruction: 'Drag genetic endowment and environmental quality sliders to see how phenotypic intelligence emerges.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_PSY_007,
  },
  {
    title: 'Experimental Variable Lab: Cause and Effect',
    instruction: 'Manipulate the Independent Variable (Music Relaxation) and monitor changes in the Dependent Variable (Heart Rate & Exam Score).',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_PSY_009,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS (2 MANDATORY SCIENTIFIC PREDICTIONS) ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If two identical twins with identical genetic IQ potential (110–135) are raised in two different environments — one with elite schooling & nutrition, and one with severe deprivation — what will happen?',
    options: [
      'Both will end up with identical IQ scores because genes fix exact outcomes',
      'The enriched twin will score near 135 while the deprived twin will score near 110, demonstrating the reaction range',
      'The deprived twin will automatically exceed 150 IQ out of sheer willpower',
      'Environment will change their DNA chromosome count from 46 to 48',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the sliders in Step 4 of the exploration lab to verify how the Gottesman reaction range operates in real time!',
    nodeId: NODE_C11_PSY_007,
  },
  {
    question: 'Predict: In a controlled psychology experiment, if an extraneous variable like background room noise spikes to 80%, what happens to the observed causal effect of the Independent Variable?',
    options: [
      'The measured causal effect is confounded and obscured by error variance from the noise',
      'The Independent Variable becomes 100 times stronger and fully unaffected',
      'The Dependent Variable automatically turns into a constant zero',
      'Extraneous variables have zero effect on empirical test validity',
    ],
    correctIndex: 0,
    verifyInstruction: 'Manipulate the Room Noise slider in Step 5 of the exploration lab to observe how extraneous variance confounds experimental results!',
    nodeId: NODE_C11_PSY_009,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'In the S–O–R simulation, what did you observe happens when Internal Cognitive Appraisal (Organism) is switched from "Threat" to "Challenge"?',
    observableOptions: [
      'The overt stress response drops significantly even when the external stimulus remains high',
      'The external stimulus instantly disappears from the universe',
      'The student’s heart rate stops completely',
      'No change whatsoever occurs in physiological readings',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_PSY_001,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'NIMHANS Youth Mental Health Investigator',
  description: 'Design a community mental health awareness and screening campaign for a school in your district, applying ethical standards under the Mental Healthcare Act 2017.',
  steps: [
    'Select a specific adolescent issue (e.g., Board Exam Anxiety or Cyber-addiction)',
    'Identify 1 Overt symptom and 1 Covert symptom',
    'Formulate an Eclectic Plan addressing Biological (sleep/diet), Cognitive (thought reframing), and Socio-cultural (parental expectations) aspects',
    'Ensure all 5 Ethical Safeguards: Voluntary Participation, Informed Consent, Debriefing, Sharing Results, and Strict Confidentiality',
  ],
};

// ─── TOPIC-SPECIFIC SVG DIAGRAM 1: S-O-R PARADIGM ARCHITECTURE ───
const SorArchitectureSvg = ({ stimulus, appraisal, overtVal }: { stimulus: number; appraisal: string; overtVal: number }) => {
  const isThreat = appraisal === 'threat';
  return (
    <svg viewBox="0 0 540 180" className="w-full h-auto max-h-48 rounded-xl bg-slate-950 border border-slate-800" aria-label="Stimulus-Organism-Response scientific flowchart">
      <defs>
        <linearGradient id="sorStimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
        <linearGradient id="sorOrgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isThreat ? '#b91c1c' : '#047857'} />
          <stop offset="100%" stopColor={isThreat ? '#f43f5e' : '#10b981'} />
        </linearGradient>
        <marker id="sorArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#94a3b8" />
        </marker>
      </defs>

      {/* S Box */}
      <rect x="20" y="35" width="130" height="110" rx="10" fill="url(#sorStimGrad)" opacity="0.9" />
      <text x="85" y="60" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">S: STIMULUS</text>
      <text x="85" y="80" textAnchor="middle" fill="#e0e7ff" fontSize="10">Exam / Environmental Trigger</text>
      <text x="85" y="105" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="600">Intensity: {stimulus}%</text>
      <rect x="35" y="120" width="100" height="8" rx="4" fill="#312e81" />
      <rect x="35" y="120" width={Math.max(6, stimulus)} height="8" rx="4" fill="#a5b4fc" />

      {/* S -> O Arrow */}
      <line x1="155" y1="90" x2="190" y2="90" stroke="#94a3b8" strokeWidth="2.5" markerEnd="url(#sorArrow)" />

      {/* O Box */}
      <rect x="195" y="25" width="150" height="130" rx="12" fill="url(#sorOrgGrad)" opacity="0.95" />
      <text x="270" y="50" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">O: ORGANISM</text>
      <text x="270" y="70" textAnchor="middle" fill="#f1f5f9" fontSize="10">Cognitive & Neural Filter</text>
      <circle cx="270" cy="100" r="22" fill="#0f172a" stroke={isThreat ? '#fb7185' : '#34d399'} strokeWidth="2.5" />
      <text x="270" y="104" textAnchor="middle" fill={isThreat ? '#fda4af' : '#6ee7b7'} fontSize="16">{isThreat ? '⚠️' : '🎯'}</text>
      <text x="270" y="142" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
        {isThreat ? 'Appraisal: Threat' : 'Appraisal: Challenge'}
      </text>

      {/* O -> R Arrow */}
      <line x1="350" y1="90" x2="385" y2="90" stroke="#94a3b8" strokeWidth="2.5" markerEnd="url(#sorArrow)" />

      {/* R Box */}
      <rect x="390" y="35" width="130" height="110" rx="10" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
      <text x="455" y="58" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">R: RESPONSE</text>
      <text x="455" y="76" textAnchor="middle" fill="#94a3b8" fontSize="9">Overt (Trembling): {overtVal}%</text>
      <text x="455" y="93" textAnchor="middle" fill="#94a3b8" fontSize="9">
        Covert: {isThreat ? 'Catastrophizing' : 'Task Strategy'}
      </text>
      <rect x="405" y="105" width="100" height="6" rx="3" fill="#0f172a" />
      <rect x="405" y="105" width={Math.max(5, overtVal)} height="6" rx="3" fill={isThreat ? '#f43f5e' : '#10b981'} />
      <text x="455" y="132" textAnchor="middle" fill={isThreat ? '#fca5a5' : '#86efac'} fontSize="10" fontWeight="bold">
        {isThreat ? '✗ High Distress' : '✓ Adaptive Flow'}
      </text>
    </svg>
  );
};

// ─── TOPIC-SPECIFIC SVG DIAGRAM 2: REACTION RANGE (GENETICS VS ENVIRONMENT) ───
const ReactionRangeSvg = ({ minIQ, maxIQ, currentIQ, env }: { minIQ: number; maxIQ: number; currentIQ: number; env: number }) => {
  const mapX = (iq: number) => 40 + ((iq - 60) / 90) * 440;
  const startX = mapX(minIQ);
  const endX = mapX(maxIQ);
  const curX = mapX(currentIQ);

  return (
    <svg viewBox="0 0 520 180" className="w-full h-auto max-h-48 rounded-xl bg-slate-950 border border-slate-800" aria-label="Gottesman Reaction Range theoretical model curve">
      <text x="260" y="24" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontWeight="bold">
        Gottesman Reaction Range Model (ISC Class 11 Heredity-Environment)
      </text>

      {/* Baseline axis */}
      <line x1="40" y1="125" x2="480" y2="125" stroke="#475569" strokeWidth="2" />
      {[70, 85, 100, 115, 130, 145].map((iq) => {
        const x = mapX(iq);
        return (
          <g key={iq}>
            <line x1={x} y1="120" x2={x} y2="130" stroke="#64748b" strokeWidth="1.5" />
            <text x={x} y="144" textAnchor="middle" fill="#94a3b8" fontSize="10">
              {iq}
            </text>
          </g>
        );
      })}
      <text x="485" y="144" textAnchor="start" fill="#64748b" fontSize="9">IQ Score</text>

      {/* Reaction Range Interval Bar */}
      <rect x={startX} y="75" width={Math.max(10, endX - startX)} height="24" rx="6" fill="#312e81" stroke="#6366f1" strokeWidth="2" opacity="0.85" />
      <text x={(startX + endX) / 2} y="64" textAnchor="middle" fill="#a5b4fc" fontSize="10" fontWeight="bold">
        Genotypic Potential Range [{minIQ} – {maxIQ}]
      </text>

      {/* Phenotype Marker Indicator */}
      <line x1={curX} y1="45" x2={curX} y2="125" stroke="#10b981" strokeWidth="3" strokeDasharray="3,3" />
      <circle cx={curX} cy="87" r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
      <rect x={curX - 42} y="98" width="84" height="20" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="1" />
      <text x={curX} y="112" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold">
        Phenotype: {currentIQ}
      </text>

      {/* Environmental quality indicator */}
      <text x="260" y="168" textAnchor="middle" fill="#38bdf8" fontSize="10">
        🌱 Environment Quality: {env}% → {env >= 70 ? '✓ Enriched Environment' : env >= 40 ? '⚖️ Average Environment' : '✗ Impoverished Environment'}
      </text>
    </svg>
  );
};

// ─── TOPIC-SPECIFIC SVG DIAGRAM 3: EXPERIMENTAL METHOD CAUSAL ARCHITECTURE ───
const ExperimentalLabSvg = ({ iv, noise, dv }: { iv: number; noise: number; dv: number }) => {
  return (
    <svg viewBox="0 0 520 180" className="w-full h-auto max-h-48 rounded-xl bg-slate-950 border border-slate-800" aria-label="Experimental variable cause and effect scientific model">
      <defs>
        <marker id="expArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#38bdf8" />
        </marker>
        <marker id="noiseArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#f43f5e" />
        </marker>
      </defs>

      <text x="260" y="22" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="bold">
        Laboratory Experiment: Independent vs Dependent Variable Mapping
      </text>

      {/* IV Box */}
      <rect x="25" y="45" width="135" height="90" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
      <text x="92" y="68" textAnchor="middle" fill="#818cf8" fontSize="11" fontWeight="bold">INDEPENDENT VAR (IV)</text>
      <text x="92" y="86" textAnchor="middle" fill="#cbd5e1" fontSize="9">Music Relaxation</text>
      <text x="92" y="105" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="600">{iv} Minutes</text>
      <text x="92" y="122" textAnchor="middle" fill="#a5b4fc" fontSize="8">[Manipulated by Experimenter]</text>

      {/* Confounding / Extraneous Box on Top */}
      <rect x="195" y="35" width="130" height="50" rx="8" fill="#450a0a" stroke="#f43f5e" strokeWidth="1.5" />
      <text x="260" y="52" textAnchor="middle" fill="#fda4af" fontSize="9" fontWeight="bold">EXTRANEOUS VARIABLE</text>
      <text x="260" y="66" textAnchor="middle" fill="#fecdd3" fontSize="8">Background Room Noise: {noise}%</text>
      <text x="260" y="78" textAnchor="middle" fill={noise > 35 ? '#fca5a5' : '#86efac'} fontSize="8" fontWeight="bold">
        {noise > 35 ? '✗ High Error Variance' : '✓ Well Controlled'}
      </text>

      {/* Main Causal Arrow */}
      <line x1="165" y1="95" x2="350" y2="95" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#expArrow)" />
      <text x="260" y="112" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">Direct Causal Effect</text>

      {/* Extraneous Confounding Line */}
      <line x1="260" y1="88" x2="260" y2="95" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3,3" />

      {/* DV Box */}
      <rect x="360" y="45" width="135" height="90" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
      <text x="427" y="68" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="bold">DEPENDENT VAR (DV)</text>
      <text x="427" y="86" textAnchor="middle" fill="#cbd5e1" fontSize="9">Exam Performance Score</text>
      <text x="427" y="108" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">{dv} / 100</text>
      <text x="427" y="124" textAnchor="middle" fill="#86efac" fontSize="8">[Observed Outcome Metric]</text>

      {/* Math Formulation Multi-Representation */}
      <text x="260" y="162" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">
        Mathematical Formulation: DV = β₀ + β₁(IV_Music) - β₂(Extraneous_Noise) + ε
      </text>
    </svg>
  );
};

// ─── MAIN COMPONENT ───
export function C11_PsychologyDefinitionPsychologyBasicSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['psychology'] || {
    name: 'Psychology',
    emoji: '🧠',
    color: 'indigo',
  };

  // ─── PHASES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── INTERACTION STATES ───
  const [stimulusIntensity, setStimulusIntensity] = useState<number>(65);
  const [cognitiveAppraisal, setCognitiveAppraisal] = useState<'threat' | 'challenge'>('threat');
  const [selectedSchool, setSelectedSchool] = useState<string>('structuralism');
  const [bioWeight, setBioWeight] = useState<number>(60);
  const [cogWeight, setCogWeight] = useState<number>(75);
  const [socioWeight, setSocioWeight] = useState<number>(80);
  const [geneticPotential, setGeneticPotential] = useState<number>(70);
  const [envQuality, setEnvQuality] = useState<number>(65);
  const [ivMusicLevel, setIvMusicLevel] = useState<number>(50);
  const [extraneousNoise, setExtraneousNoise] = useState<number>(10);

  // ─── PREDICTION & OBSERVATION STATES ───
  const [predIndex1, setPredIndex1] = useState<number>(-1);
  const [predAnswered1, setPredAnswered1] = useState<boolean>(false);
  const [predIndex2, setPredIndex2] = useState<number>(-1);
  const [predAnswered2, setPredAnswered2] = useState<boolean>(false);
  const [obsIndex, setObsIndex] = useState<number>(-1);
  const [obsAnswered, setObsAnswered] = useState<boolean>(false);

  // ─── CHALLENGE & ADAPTIVE DIFFICULTY STATES ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState<number>(0);

  // ─── HINTS & REVEAL STATES ───
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);

  // ─── INTERACTIVE INPUT STATES ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── DISCOVERY STATE ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState<boolean>(false);

  // ─── VISUAL FEEDBACK STATES ───
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentCh = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD PERSISTED MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT UPDATE EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS ANIMATION (NEURAL ACTION POTENTIAL & HEART WAVE) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let step = 0;

    const render = () => {
      step += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw Neural / S-R Wave
      ctx.beginPath();
      ctx.strokeStyle = cognitiveAppraisal === 'threat' ? '#f43f5e' : '#10b981';
      ctx.lineWidth = 2.5;

      for (let x = 0; x < canvas.width; x++) {
        const freq = cognitiveAppraisal === 'threat' ? 0.08 : 0.04;
        const amp = (stimulusIntensity / 100) * 22;
        const y = canvas.height / 2 + Math.sin(x * freq + step) * amp + Math.cos(x * 0.02 + step * 0.5) * (amp * 0.3);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw Action Potential Spikes
      if (stimulusIntensity > 50) {
        ctx.fillStyle = cognitiveAppraisal === 'threat' ? '#fda4af' : '#6ee7b7';
        for (let i = 0; i < 3; i++) {
          const spikeX = ((step * 40 + i * 110) % canvas.width);
          ctx.beginPath();
          ctx.arc(spikeX, canvas.height / 2 - 15, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [stimulusIntensity, cognitiveAppraisal]);

  // ─── USECALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentCh.hints[nextLevel - 1]) {
      setCurrentHint(currentCh.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(currentCh.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
    }
  }, [hintCount, currentCh]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent! That is right.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration lab. Manipulate the models to understand core psychology.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Explore freely with zero test pressure in the sandbox.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the adaptive challenge series!');
  }, []);

  const handlePrediction1 = useCallback((idx: number) => {
    setPredIndex1(idx);
    setPredAnswered1(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Now manipulate the variables to see the empirical result.');
  }, []);

  const handlePrediction2 = useCallback((idx: number) => {
    setPredIndex2(idx);
    setPredAnswered2(true);
    audioManager.play('tap');
    speechManager.speak('Second prediction recorded! Examine how extraneous noise impacts internal validity.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObsIndex(idx);
    setObsAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation!' : 'Check the data visualizer again.');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = currentCh.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, currentCh]
  );

  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        let arr = prev.length > 0 ? [...prev] : (currentCh.sortItems?.map((_, i) => i) || []);
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
    },
    [currentCh]
  );

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_PSY_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Simulation complete! Your final performance score is ${finalScore} percent.`);
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
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (currentCh.type === 'classify' || currentCh.type === 'distinguish' || currentCh.type === 'match') {
        isCorrect = answer === currentCh.correctIndex;
      } else if (currentCh.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(currentCh.correctMapping);
      } else if (currentCh.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(currentCh.correctOrder);
      } else if (currentCh.type === 'numeric') {
        const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(num - (currentCh.correctAnswer || 0)) <= (currentCh.tolerance || 0);
      } else if (currentCh.type === 'construct') {
        isCorrect = answer === currentCh.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding scientific reasoning.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(currentCh.nodeId, currentCh.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + currentCh.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (currentCh.misconceptionIndex !== undefined && !hitMisconceptions.includes(currentCh.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, currentCh.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us review the step-by-step scientific explanation together.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(currentCh.nodeId, currentCh.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + currentCh.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [currentCh, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  // ─── DERIVED VALUES FOR REAL-TIME SIMULATIONS ───
  const derivedOvertAnxiety = useMemo(() => {
    const raw = (stimulusIntensity * 0.7) + (cognitiveAppraisal === 'threat' ? 30 : -20);
    return Math.max(5, Math.min(100, Math.round(raw)));
  }, [stimulusIntensity, cognitiveAppraisal]);

  const derivedPhenotypeIQ = useMemo(() => {
    const minIQ = 70 + Math.round(geneticPotential * 0.4);
    const maxIQ = minIQ + 30;
    const currentIQ = minIQ + Math.round((envQuality / 100) * 30);
    return { minIQ, maxIQ, currentIQ };
  }, [geneticPotential, envQuality]);

  const derivedExamScore = useMemo(() => {
    const musicBenefit = ivMusicLevel * 0.35;
    const noisePenalty = extraneousNoise * 0.4;
    return Math.max(20, Math.min(100, Math.round(65 + musicBenefit - noisePenalty)));
  }, [ivMusicLevel, extraneousNoise]);

  // SRS interval text calculation
  const srsDays = errors === 0 ? 7 : errors <= 3 ? 3 : 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-800 font-sans"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <motion.span
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="text-3xl p-2 bg-indigo-950/80 rounded-xl border border-indigo-700/50 cursor-pointer"
            aria-hidden="true"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-wide">{title}</h1>
              <motion.span
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-900/60 text-indigo-300 font-medium border border-indigo-700/40"
              >
                ISC Class 11
              </motion.span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">NIMHANS Research & Experimental Simulator</p>
          </div>
        </motion.div>

        {/* Phase Navigation Indicators */}
        <nav aria-label="Simulation phase progress" className="flex items-center gap-1.5 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
            <motion.span
              key={p}
              whileHover={{ scale: 1.05 }}
              className={`text-xs px-3 py-1 rounded-lg capitalize font-medium transition-all cursor-default ${
                phase === p ? 'bg-indigo-600 text-white shadow-md font-bold' : 'text-slate-400'
              }`}
            >
              {p}
            </motion.span>
          ))}
        </nav>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-6 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-800/40 shadow-lg"
            >
              <h2 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
                <span aria-hidden="true">🏛️</span> {SCENARIO.title}
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-4 p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-indigo-200"
              >
                💡 <span className="font-semibold">Case Context:</span> {SCENARIO.context}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-slate-800/70 rounded-2xl border border-slate-700/60 shadow-xl"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs uppercase tracking-wider text-amber-400 font-bold block mb-1"
              >
                Curiosity Discovery Hook
              </motion.span>
              <h3 className="text-base font-semibold text-white mt-1 mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Discovery options">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    role="radio"
                    aria-checked={discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                      discoveryAnswered
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900/40 border-slate-800 text-slate-400 opacity-60'
                        : 'bg-slate-900/90 border-slate-700/80 text-slate-200 hover:bg-indigo-950/50 hover:border-indigo-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-300 font-bold">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                      {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto text-emerald-400 font-bold"
                          aria-label="Correct answer"
                        >
                          ✓
                        </motion.span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="mt-5 p-4 rounded-xl bg-slate-900/90 border border-slate-700"
                >
                  <p className={`text-sm ${discoveryCorrect ? 'text-emerald-300 font-semibold' : 'text-amber-300'}`}>
                    {discoveryCorrect ? '✓ Correct! Spot on! Psychology began with philosophical roots.' : '✗ ' + DISCOVERY_QUESTION.hintAfter}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <motion.button
                      aria-label="Enter Interactive Lab"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAdvanceToExploration}
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg"
                    >
                      Enter Interactive Lab <span>→</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div
            key="explore-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            {diagnosticQuestions && diagnosticQuestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-indigo-950/30 rounded-xl border border-indigo-900/40 flex items-center justify-between text-xs text-slate-400"
              >
                <span>📚 ISC Syllabus Core Modules 1 to 10 active</span>
                <span className="text-indigo-300 font-mono">Step {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-5 sm:p-6 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-4 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-indigo-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="text-xs px-2.5 py-1 rounded bg-slate-900 text-indigo-300 font-mono border border-slate-800"
                    >
                      {EXPLORATION_STEPS[currentSlide].nodeId}
                    </motion.span>
                  </div>
                  <p className="text-amber-300 text-sm mt-1 font-medium flex items-center gap-1.5">
                    <span aria-hidden="true">👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                  </p>
                </div>

                {/* ─── LAB STEP 0: S-O-R CHAIN SIMULATOR ─── */}
                {currentSlide === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4"
                  >
                    <SorArchitectureSvg stimulus={stimulusIntensity} appraisal={cognitiveAppraisal} overtVal={derivedOvertAnxiety} />

                    <div className="relative">
                      <canvas ref={canvasRef} width={600} height={85} className="w-full bg-slate-900/80 rounded-lg border border-slate-800" />
                      <span className="absolute top-2 left-3 text-[10px] uppercase font-mono tracking-wider text-slate-400">
                        Real-time Neural & Autonomic Reactivity Waveform
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div
                        whileHover={{ borderColor: '#6366f1' }}
                        className="space-y-3 bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 transition-colors"
                      >
                        <div>
                          <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                            <span>External Stimulus (Exam Alarm Volume / Pressure)</span>
                            <span className="text-indigo-400 font-mono font-bold">{stimulusIntensity}%</span>
                          </div>
                          <input
                            type="range"
                            min={10}
                            max={100}
                            value={stimulusIntensity}
                            aria-label="External Stimulus Intensity Slider"
                            aria-valuemin={10}
                            aria-valuemax={100}
                            aria-valuenow={stimulusIntensity}
                            onChange={(e) => setStimulusIntensity(Number(e.target.value))}
                            className="w-full accent-indigo-500 cursor-pointer"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                            Organism (Internal Cognitive Appraisal)
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <motion.button
                              aria-label="Set Cognitive Appraisal to Perceived Threat"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => {
                                setCognitiveAppraisal('threat');
                                audioManager.play('tap');
                              }}
                              className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                                cognitiveAppraisal === 'threat'
                                  ? 'bg-rose-950/80 border-rose-500 text-rose-300 shadow-md'
                                  : 'bg-slate-800 border-slate-700 text-slate-400'
                              }`}
                            >
                              <span>⚠️ Threat</span>
                              {cognitiveAppraisal === 'threat' && <span>(Active)</span>}
                            </motion.button>
                            <motion.button
                              aria-label="Set Cognitive Appraisal to Positive Challenge"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => {
                                setCognitiveAppraisal('challenge');
                                audioManager.play('tap');
                              }}
                              className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                                cognitiveAppraisal === 'challenge'
                                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md'
                                  : 'bg-slate-800 border-slate-700 text-slate-400'
                              }`}
                            >
                              <span>🎯 Challenge</span>
                              {cognitiveAppraisal === 'challenge' && <span>(Active)</span>}
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ borderColor: '#6366f1' }}
                        className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 flex flex-col justify-between transition-colors"
                      >
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-slate-800 text-slate-400">
                              <th className="py-1">Dimension</th>
                              <th className="py-1">Status / Expression</th>
                            </tr>
                          </thead>
                          <tbody className="text-slate-300 divide-y divide-slate-800/60">
                            <tr>
                              <td className="py-1.5 font-semibold text-indigo-300">Overt Behaviour:</td>
                              <td className={`py-1.5 font-bold ${derivedOvertAnxiety > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                                {derivedOvertAnxiety > 50 ? '✗ Trembling / Restlessness (' + derivedOvertAnxiety + '%)' : '✓ Calm Focused Writing (' + derivedOvertAnxiety + '%)'}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-1.5 font-semibold text-indigo-300">Covert Cognition:</td>
                              <td className="py-1.5 text-[11px]">
                                {cognitiveAppraisal === 'threat'
                                  ? '✗ "I will fail, memory is blank."'
                                  : '✓ "I am prepared, solving step-by-step."'}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* ─── LAB STEP 1: 5 SCHOOLS OF THOUGHT PRISM ─── */}
                {currentSlide === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4"
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2" role="tablist" aria-label="Schools of Thought Tabs">
                      {[
                        { id: 'structuralism', name: 'Structuralism', founder: 'Wundt (1879)' },
                        { id: 'functionalism', name: 'Functionalism', founder: 'James (1890)' },
                        { id: 'behaviourism', name: 'Behaviourism', founder: 'Watson (1913)' },
                        { id: 'psychoanalysis', name: 'Psychoanalysis', founder: 'Freud / Bose' },
                        { id: 'gestalt', name: 'Gestalt', founder: 'Wertheimer' },
                      ].map((school) => (
                        <motion.button
                          key={school.id}
                          role="tab"
                          aria-selected={selectedSchool === school.id}
                          aria-label={`Select school: ${school.name}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedSchool(school.id);
                            audioManager.play('tap');
                          }}
                          className={`p-3 rounded-xl text-left border transition-all ${
                            selectedSchool === school.id
                              ? 'bg-indigo-900/80 border-indigo-500 text-white shadow-lg font-bold'
                              : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <p className="font-bold text-xs">{school.name}</p>
                          <p className="text-[10px] text-indigo-300 mt-0.5">{school.founder}</p>
                        </motion.button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedSchool}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-xs leading-relaxed space-y-2"
                      >
                        {selectedSchool === 'structuralism' && (
                          <div>
                            <h4 className="font-bold text-indigo-300 text-sm">Structuralism (Wilhelm Wundt & E.B. Titchener)</h4>
                            <p className="text-slate-300 mt-1">
                              Focus: Decomposing conscious experience into basic structures — sensations, images, and affections through systematic Introspection.
                            </p>
                            <p className="text-amber-300/90 text-[11px] mt-1">
                              🇮🇳 Indian Application: An observer breaking down the sensory taste of khichdi element by element.
                            </p>
                          </div>
                        )}
                        {selectedSchool === 'functionalism' && (
                          <div>
                            <h4 className="font-bold text-indigo-300 text-sm">Functionalism (William James & John Dewey)</h4>
                            <p className="text-slate-300 mt-1">
                              Focus: How consciousness functions to help an organism adapt and survive in dynamic environments.
                            </p>
                            <p className="text-amber-300/90 text-[11px] mt-1">
                              🇮🇳 Indian Application: How children in a joint family in Jaipur adaptively learn negotiation and emotional regulation across elders.
                            </p>
                          </div>
                        )}
                        {selectedSchool === 'behaviourism' && (
                          <div>
                            <h4 className="font-bold text-indigo-300 text-sm">Behaviourism (John B. Watson & B.F. Skinner)</h4>
                            <p className="text-slate-300 mt-1">
                              Focus: Rejects unobservable mind; studies stimulus-response conditioning, reinforcement, and measurable overt habits.
                            </p>
                            <p className="text-amber-300/90 text-[11px] mt-1">
                              🇮🇳 Indian Application: Token economy stars used by teachers in Pune to reward homework completion.
                            </p>
                          </div>
                        )}
                        {selectedSchool === 'psychoanalysis' && (
                          <div>
                            <h4 className="font-bold text-indigo-300 text-sm">Psychoanalysis (Sigmund Freud & Girindrasekhar Bose)</h4>
                            <p className="text-slate-300 mt-1">
                              Focus: The unconscious mind, repressed childhood desires, defense mechanisms, and dream interpretation.
                            </p>
                            <p className="text-amber-300/90 text-[11px] mt-1">
                              🇮🇳 Indian Application: Girindrasekhar Bose (1922 Calcutta) adapting the Oedipus complex to the Indian joint family.
                            </p>
                          </div>
                        )}
                        {selectedSchool === 'gestalt' && (
                          <div>
                            <h4 className="font-bold text-indigo-300 text-sm">Gestalt Psychology (Max Wertheimer, Koffka, Kohler)</h4>
                            <p className="text-slate-300 mt-1">
                              Focus: "The whole is greater than the sum of its parts." Perception is organized into meaningful total patterns (Phi phenomenon).
                            </p>
                            <p className="text-amber-300/90 text-[11px] mt-1">
                              🇮🇳 Indian Application: Viewing the Taj Mahal as a single unified architectural wonder rather than individual marble bricks.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* ─── LAB STEP 2: ECLECTIC APPROACH ─── */}
                {currentSlide === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4"
                  >
                    <p className="text-xs text-slate-300">
                      A patient arrives at NIMHANS with severe exam distress. Adjust the multi-perspective balance:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Biological (SSRIs/Sleep)</span>
                          <span className="text-indigo-400 font-mono font-bold">{bioWeight}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={bioWeight}
                          aria-label="Biological Perspective Slider"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={bioWeight}
                          onChange={(e) => setBioWeight(Number(e.target.value))}
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Cognitive (Thought Reframing)</span>
                          <span className="text-indigo-400 font-mono font-bold">{cogWeight}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={cogWeight}
                          aria-label="Cognitive Perspective Slider"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={cogWeight}
                          onChange={(e) => setCogWeight(Number(e.target.value))}
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Socio-Cultural (Family Counseling)</span>
                          <span className="text-indigo-400 font-mono font-bold">{socioWeight}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={socioWeight}
                          aria-label="Socio-Cultural Perspective Slider"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={socioWeight}
                          onChange={(e) => setSocioWeight(Number(e.target.value))}
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-indigo-950/50 rounded-lg border border-indigo-800/40 text-xs flex items-center justify-between"
                    >
                      <span>Integrated Clinical Recovery Index:</span>
                      <span className="text-emerald-300 font-bold font-mono text-sm flex items-center gap-1">
                        <span>✓</span> {Math.round((bioWeight + cogWeight + socioWeight) / 3)}% Holistic Efficacy
                      </span>
                    </motion.div>
                  </motion.div>
                )}

                {/* ─── LAB STEP 3: REACTION RANGE ─── */}
                {currentSlide === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4"
                  >
                    {/* Scientific Prediction Question 1 */}
                    {!predAnswered1 && (
                      <motion.div
                        initial={{ scale: 0.98 }}
                        animate={{ scale: 1 }}
                        className="p-3.5 bg-indigo-950/60 rounded-xl border border-indigo-800 shadow-md"
                      >
                        <p className="text-xs font-bold text-amber-300 mb-2">🎯 Scientific Prediction Question 1 of 2:</p>
                        <p className="text-xs text-white mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="space-y-1.5">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              aria-label={`Prediction Option: ${opt}`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handlePrediction1(i)}
                              className="w-full text-left p-2.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-indigo-500 text-xs text-slate-200"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {predAnswered1 && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-emerald-400 font-medium bg-emerald-950/40 p-2 rounded border border-emerald-800"
                      >
                        ✓ {PREDICTION_QUESTIONS[0].verifyInstruction}
                      </motion.p>
                    )}

                    <ReactionRangeSvg
                      minIQ={derivedPhenotypeIQ.minIQ}
                      maxIQ={derivedPhenotypeIQ.maxIQ}
                      currentIQ={derivedPhenotypeIQ.currentIQ}
                      env={envQuality}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <motion.div
                        whileHover={{ borderColor: '#6366f1' }}
                        className="space-y-3 bg-slate-900 p-3 rounded-lg border border-slate-800 transition-colors"
                      >
                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Genetic IQ Potential (Genotype / Heredity)</span>
                            <span className="text-indigo-400 font-mono font-bold">{geneticPotential}%</span>
                          </div>
                          <input
                            type="range"
                            min={20}
                            max={100}
                            value={geneticPotential}
                            aria-label="Genetic IQ Potential Slider"
                            aria-valuemin={20}
                            aria-valuemax={100}
                            aria-valuenow={geneticPotential}
                            onChange={(e) => setGeneticPotential(Number(e.target.value))}
                            className="w-full accent-indigo-500 cursor-pointer"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Environmental Quality (Schooling / Nutrition)</span>
                            <span className="text-emerald-400 font-mono font-bold">{envQuality}%</span>
                          </div>
                          <input
                            type="range"
                            min={10}
                            max={100}
                            value={envQuality}
                            aria-label="Environmental Quality Slider"
                            aria-valuemin={10}
                            aria-valuemax={100}
                            aria-valuenow={envQuality}
                            onChange={(e) => setEnvQuality(Number(e.target.value))}
                            className="w-full accent-emerald-500 cursor-pointer"
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ borderColor: '#6366f1' }}
                        className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 flex flex-col justify-center space-y-2 text-xs transition-colors"
                      >
                        <div className="flex justify-between">
                          <span className="text-slate-400">1. Genotypic Limits:</span>
                          <span className="text-indigo-300 font-mono font-bold">
                            IQ {derivedPhenotypeIQ.minIQ} – {derivedPhenotypeIQ.maxIQ}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">2. Realised Phenotype:</span>
                          <span className="text-emerald-400 font-mono font-bold text-sm">
                            ✓ IQ {derivedPhenotypeIQ.currentIQ}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                          Genes set the boundary limits; environment determines the exact score within those boundaries.
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* ─── LAB STEP 4: EXPERIMENTAL VARIABLE LAB ─── */}
                {currentSlide === 4 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4"
                  >
                    {/* Scientific Prediction Question 2 */}
                    {!predAnswered2 && (
                      <motion.div
                        initial={{ scale: 0.98 }}
                        animate={{ scale: 1 }}
                        className="p-3.5 bg-indigo-950/60 rounded-xl border border-indigo-800 shadow-md"
                      >
                        <p className="text-xs font-bold text-amber-300 mb-2">🎯 Scientific Prediction Question 2 of 2:</p>
                        <p className="text-xs text-white mb-2">{PREDICTION_QUESTIONS[1].question}</p>
                        <div className="space-y-1.5">
                          {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              aria-label={`Prediction Option: ${opt}`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handlePrediction2(i)}
                              className="w-full text-left p-2.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-indigo-500 text-xs text-slate-200"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {predAnswered2 && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-emerald-400 font-medium bg-emerald-950/40 p-2 rounded border border-emerald-800"
                      >
                        ✓ {PREDICTION_QUESTIONS[1].verifyInstruction}
                      </motion.p>
                    )}

                    <ExperimentalLabSvg iv={ivMusicLevel} noise={extraneousNoise} dv={derivedExamScore} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <motion.div
                        whileHover={{ borderColor: '#6366f1' }}
                        className="space-y-3 bg-slate-900 p-3 rounded-lg border border-slate-800 transition-colors"
                      >
                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Independent Variable (IV): Music Relaxation</span>
                            <span className="text-indigo-400 font-mono font-bold">{ivMusicLevel} min</span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={60}
                            value={ivMusicLevel}
                            aria-label="Independent Variable Music Duration Slider"
                            aria-valuemin={0}
                            aria-valuemax={60}
                            aria-valuenow={ivMusicLevel}
                            onChange={(e) => setIvMusicLevel(Number(e.target.value))}
                            className="w-full accent-indigo-500 cursor-pointer"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Extraneous Confounder: Room Noise</span>
                            <span className="text-rose-400 font-mono font-bold">{extraneousNoise}%</span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={extraneousNoise}
                            aria-label="Extraneous Variable Room Noise Slider"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={extraneousNoise}
                            onChange={(e) => setExtraneousNoise(Number(e.target.value))}
                            className="w-full accent-rose-500 cursor-pointer"
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ borderColor: '#6366f1' }}
                        className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 flex flex-col justify-center space-y-2 text-xs transition-colors"
                      >
                        <div className="flex justify-between">
                          <span className="text-slate-400">Dependent Variable (DV): Exam Score</span>
                          <span className="text-emerald-300 font-mono font-bold text-base">{derivedExamScore} / 100</span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {extraneousNoise > 40
                            ? '✗ High extraneous noise is confounding the causal effect of the music intervention!'
                            : '✓ Extraneous variables well controlled. Internal validity is high.'}
                        </p>
                      </motion.div>
                    </div>

                    {/* Observation Question */}
                    {!obsAnswered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-slate-900 rounded-lg border border-slate-800 shadow-md"
                      >
                        <p className="text-xs font-bold text-indigo-300 mb-2">👁️ Scientific Observation Check:</p>
                        <p className="text-xs text-white mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                        <div className="space-y-1">
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                            <motion.button
                              key={i}
                              aria-label={`Observation Option: ${opt}`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleObservation(i)}
                              className="w-full text-left p-2 rounded bg-slate-950 border border-slate-800 hover:border-indigo-500 text-xs text-slate-300"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Slide Navigation Bar */}
                <div className="flex justify-between items-center pt-2">
                  <motion.button
                    aria-label="Go to previous module"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide((s) => Math.max(0, s - 1));
                      audioManager.play('tap');
                    }}
                    disabled={currentSlide === 0}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-semibold disabled:opacity-40"
                  >
                    ← Previous Module
                  </motion.button>
                  <span className="text-xs text-slate-400 font-mono">
                    {currentSlide + 1} / {EXPLORATION_STEPS.length}
                  </span>
                  {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                    <motion.button
                      aria-label="Go to next module"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setCurrentSlide((s) => s + 1);
                        audioManager.play('tap');
                      }}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
                    >
                      Next Module →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label="Advance to Free Sandbox Play"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAdvanceToSandbox}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-lg"
                    >
                      Free Sandbox Play →
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: UNGRADED SANDBOX FREE-PLAY ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-5 bg-gradient-to-r from-slate-800 to-indigo-950/60 rounded-2xl border border-indigo-800/40 shadow-xl"
            >
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span aria-hidden="true">🎛️</span> Psychology Sandbox: Free Experimentation
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Adjust any physiological, genetic, or environmental slider with zero test pressure. Build your intuitive mental models before entering challenges.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ borderColor: '#6366f1' }}
                className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 space-y-3 transition-colors shadow-md"
              >
                <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">S-O-R & Cognitive Tuning</h4>
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Stimulus Intensity</span>
                    <span className="text-indigo-400 font-mono font-bold">{stimulusIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={stimulusIntensity}
                    aria-label="Sandbox Stimulus Intensity Slider"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={stimulusIntensity}
                    onChange={(e) => setStimulusIntensity(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>
                <div className="flex gap-2">
                  <motion.button
                    aria-label="Select Threat Appraisal"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setCognitiveAppraisal('threat')}
                    className={`flex-1 py-1.5 rounded text-xs font-semibold border ${
                      cognitiveAppraisal === 'threat' ? 'bg-rose-950 border-rose-500 text-rose-200 shadow' : 'bg-slate-900 border-slate-700'
                    }`}
                  >
                    Threat Appraisal
                  </motion.button>
                  <motion.button
                    aria-label="Select Challenge Appraisal"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setCognitiveAppraisal('challenge')}
                    className={`flex-1 py-1.5 rounded text-xs font-semibold border ${
                      cognitiveAppraisal === 'challenge' ? 'bg-emerald-950 border-emerald-500 text-emerald-200 shadow' : 'bg-slate-900 border-slate-700'
                    }`}
                  >
                    Challenge Appraisal
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ borderColor: '#6366f1' }}
                className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 space-y-3 transition-colors shadow-md"
              >
                <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Nature vs Nurture Model</h4>
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Heredity Potential: {geneticPotential}%</span>
                    <span className="text-emerald-400 font-mono font-bold">Environment: {envQuality}%</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={envQuality}
                    aria-label="Sandbox Environment Quality Slider"
                    aria-valuemin={10}
                    aria-valuemax={100}
                    aria-valuenow={envQuality}
                    onChange={(e) => setEnvQuality(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-slate-300">
                  Calculated Phenotypic Result: <span className="font-bold text-emerald-400 font-mono">✓ IQ {derivedPhenotypeIQ.currentIQ}</span>
                </p>
              </motion.div>
            </div>

            <div className="flex justify-end pt-2">
              <motion.button
                aria-label="Start Adaptive Challenges"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-sm shadow-xl flex items-center gap-2"
              >
                Ready for Adaptive Challenges! <span>→</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: CHALLENGE PHASE ��── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div
            key="challenge-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            {/* Top Progress & Difficulty Status */}
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-800/90 rounded-xl border border-slate-700 shadow-md"
            >
              <div>
                <span className="text-xs text-slate-400">Adaptive Challenge</span>
                <h2 className="text-sm font-bold text-white">
                  {currentChallenge + 1} of {filteredChallenges.length}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                      : difficulty === 'advanced'
                      ? 'bg-rose-950/80 text-rose-300 border-rose-600'
                      : 'bg-indigo-950/80 text-indigo-300 border-indigo-600'
                  }`}
                >
                  {difficulty === 'foundation' ? '✓ ' : '★ '}
                  {difficulty} Tier
                </motion.span>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-xs px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-700 font-mono"
                >
                  {currentCh.competencyLevel}
                </motion.span>
              </div>
            </motion.div>

            {/* Progress Bar */}
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden shadow-inner" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length}>
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>

            {/* Question Card */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={wrongShake ? { duration: 0.4 } : {}}
              className={`p-5 sm:p-6 rounded-2xl border transition-colors shadow-xl ${
                wrongFlash
                  ? 'bg-rose-950/60 border-rose-500'
                  : 'bg-slate-800/80 border-slate-700/80'
              }`}
            >
              <div className="mb-4">
                <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                  Node: {currentCh.nodeId}
                </span>
                <p className="text-base sm:text-lg font-semibold text-white mt-1 leading-snug">{currentCh.question}</p>
              </div>

              {/* TYPE 1: MCQ */}
              {(currentCh.type === 'classify' || currentCh.type === 'distinguish' || currentCh.type === 'match') &&
                currentCh.options && (
                  <div className="space-y-2.5" role="radiogroup" aria-label="Question choices">
                    {currentCh.options.map((opt, i) => (
                      <motion.button
                        key={i}
                        role="radio"
                        aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(i)}
                        disabled={answerRevealed || showExplanation}
                        className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm font-medium transition-all border ${
                          showExplanation && i === currentCh.correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md'
                            : 'bg-slate-900/90 border-slate-700/80 text-slate-200 hover:bg-slate-900 hover:border-indigo-500'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span>{opt}</span>
                          {showExplanation && i === currentCh.correctIndex && (
                            <span className="ml-auto text-emerald-400 font-bold" aria-label="Correct choice">✓ Correct</span>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}

              {/* TYPE 2: DRAG-LABEL CHALLENGE */}
              {currentCh.type === 'drag-label' && currentCh.dragItems && (
                <div className="space-y-4">
                  {/* Drag Palette */}
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800 shadow-inner">
                    {currentCh.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        draggable
                        role="button"
                        tabIndex={0}
                        aria-label={`Draggable pioneer: ${item.label}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onDragStart={() => handleDragStart(item.label)}
                        className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-white text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  {/* Drop Targets */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'school_struct', title: 'Structuralism (1879)' },
                      { id: 'school_funct', title: 'Functionalism (1890)' },
                      { id: 'school_behav', title: 'Behaviourism (1913)' },
                      { id: 'school_psycho', title: 'Psychoanalysis (1896)' },
                    ].map((target) => (
                      <motion.div
                        key={target.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(target.id)}
                        aria-label={`Drop target for ${target.title}`}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[90px] transition-all ${
                          droppedLabels[target.id]
                            ? 'bg-emerald-950/50 border-emerald-500'
                            : 'bg-slate-900/60 border-slate-700'
                        }`}
                      >
                        <span className="text-[11px] text-slate-400 font-semibold">{target.title}</span>
                        <span className="text-xs font-bold text-indigo-300 mt-1 flex items-center gap-1">
                          {droppedLabels[target.id] ? (
                            <>
                              <span>✓</span> {droppedLabels[target.id]}
                            </>
                          ) : (
                            'Drop Pioneer Here'
                          )}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    aria-label="Verify dragged mappings"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation || Object.keys(droppedLabels).length < 4}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold disabled:opacity-40 shadow-lg"
                  >
                    Verify Mappings →
                  </motion.button>
                </div>
              )}

              {/* TYPE 3: DRAG-SORT CHALLENGE */}
              {currentCh.type === 'drag-sort' && currentCh.sortItems && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Drag or reorder the scientific steps into correct sequence:</p>
                  <div className="space-y-2">
                    {(sortArrangement.length === currentCh.sortItems.length
                      ? sortArrangement.map((idx) => currentCh.sortItems![idx])
                      : currentCh.sortItems
                    ).map((item, displayIdx) => (
                      <motion.div
                        key={displayIdx}
                        draggable
                        role="button"
                        tabIndex={0}
                        aria-label={`Step ${displayIdx + 1}: ${item}`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onDragStart={() => setDraggedItem(String(displayIdx))}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          const from = parseInt(draggedItem || '0');
                          handleSortMove(from, displayIdx);
                        }}
                        className="p-3 bg-slate-900 rounded-xl border border-slate-700 flex items-center gap-3 text-xs sm:text-sm text-slate-200 cursor-grab shadow"
                      >
                        <span className="w-5 h-5 rounded-full bg-indigo-900 text-indigo-300 font-bold flex items-center justify-center text-xs shrink-0">
                          {displayIdx + 1}
                        </span>
                        {item}
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    aria-label="Check sorted sequence"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const ans =
                        sortArrangement.length > 0 ? sortArrangement : currentCh.sortItems?.map((_, i) => i) || [];
                      handleAnswer(ans);
                    }}
                    disabled={showExplanation}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg"
                  >
                    Check Sequence →
                  </motion.button>
                </div>
              )}

              {/* TYPE 4: NUMERIC CHALLENGE */}
              {currentCh.type === 'numeric' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 max-w-sm">
                    <input
                      type="number"
                      step="any"
                      value={numericInput}
                      aria-label={`Numerical answer input for ${currentCh.question}`}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter numerical value"
                      className="flex-1 px-4 py-2.5 bg-slate-900 rounded-xl border border-slate-700 text-white text-sm focus:border-indigo-500 outline-none"
                    />
                    <span className="text-xs font-bold text-slate-400">{currentCh.unit}</span>
                    <motion.button
                      aria-label="Submit numeric answer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || !numericInput}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold disabled:opacity-40 shadow-lg"
                    >
                      Submit
                    </motion.button>
                  </div>
                </div>
              )}

              {/* TYPE 5: CONSTRUCT CHALLENGE */}
              {currentCh.type === 'construct' && currentCh.availableParts && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">{currentCh.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {currentCh.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        aria-label={`Add part: ${part}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (!constructParts.includes(part)) {
                            setConstructParts((prev) => [...prev, part]);
                            audioManager.play('tap');
                          }
                        }}
                        className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-indigo-200 hover:border-indigo-500 shadow"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <motion.div
                    whileHover={{ borderColor: '#6366f1' }}
                    className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] shadow-inner transition-colors"
                  >
                    <p className="text-[11px] text-slate-400 uppercase font-bold mb-2">Constructed Clinical Plan:</p>
                    <div className="flex flex-wrap gap-2">
                      {constructParts.map((part, i) => (
                        <motion.span
                          key={i}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="px-2.5 py-1 bg-indigo-950 border border-indigo-700 rounded-lg text-xs text-indigo-300 flex items-center gap-1.5"
                        >
                          ✓ {part}
                          <motion.button
                            aria-label={`Remove part: ${part}`}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.8 }}
                            onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                            className="text-rose-400 hover:text-rose-200"
                          >
                            ✕
                          </motion.button>
                        </motion.span>
                      ))}
                      {constructParts.length === 0 && (
                        <span className="text-xs text-slate-400 italic">Click components above to assemble</span>
                      )}
                    </div>
                  </motion.div>

                  <motion.button
                    aria-label="Verify construction components"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg"
                  >
                    Verify Construction →
                  </motion.button>
                </div>
              )}

              {/* ─── PROGRESSIVE DISCLOSURE EXPLANATION CARD ─── */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 sm:p-5 bg-gradient-to-br from-indigo-950/80 to-slate-900 rounded-2xl border border-indigo-700/60 space-y-3 shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <span>💡</span> Scientific Step-by-Step Rationale
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Step {revealedSteps + 1} of{' '}
                      {currentCh.explanation.split('. ').filter((s) => s.trim().length > 0).length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {currentCh.explanation
                      .split('. ')
                      .filter((s) => s.trim().length > 0)
                      .slice(0, revealedSteps + 1)
                      .map((sentence, i) => (
                        <motion.p
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                        >
                          <span className="font-bold text-indigo-400">{i + 1}.</span> {sentence}
                          {!sentence.endsWith('.') && '.'}
                        </motion.p>
                      ))}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
                    {revealedSteps < currentCh.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        aria-label="Reveal next explanation step"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setRevealedSteps((s) => s + 1)}
                        className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold shadow"
                      >
                        Reveal Next Step →
                      </motion.button>
                    ) : (
                      <div />
                    )}

                    {revealedSteps >= currentCh.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                      <motion.button
                        aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Assessment' : 'Proceed to next challenge'}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg flex items-center gap-2"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Assessment →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD REVIEW ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-2xl border border-indigo-700 text-center space-y-3 shadow-2xl"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="text-4xl inline-block"
                aria-hidden="true"
              >
                🎓
              </motion.span>
              <h2 className="text-2xl font-bold text-white">Simulation Completed!</h2>
              <p className="text-sm text-slate-300">
                Final Mastery Score: <span className="font-bold text-emerald-400 font-mono">✓ {Math.max(0, 100 - errors * 5)}%</span> |
                BKT Status: <span className="text-indigo-300 font-bold uppercase">{masteryLevel}</span>
              </p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-200 shadow-md"
              >
                {errors === 0
                  ? '🌟 Exceptional! You scored 100% and demonstrated comprehensive mastery across all 10 Class 11 Psychology ISC nodes!'
                  : errors <= 3
                  ? '👏 Excellent work! You displayed strong conceptual grasp of schools, heredity, and experimental methods.'
                  : errors <= 7
                  ? '📈 Good effort! Revisit the diagnostic misconceptions below and review the S-O-R and experimental steps.'
                  : '💪 Step-by-step progress! Review the structured explanations and retry to solidify your foundation.'}
              </motion.div>
            </motion.div>

            {/* SPACED REPETITION VISIBILITY CARD (SRS HIGH-VISIBILITY BANNER) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-5 bg-gradient-to-r from-amber-950/70 via-slate-900 to-indigo-950/70 rounded-2xl border-2 border-amber-500/80 shadow-2xl space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                  <span className="text-xl" aria-hidden="true">📅</span> Spaced Repetition Schedule (SM-2 Science)
                </h3>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 bg-amber-500 text-slate-950 font-bold text-xs rounded-full uppercase tracking-wider"
                >
                  Action Required
                </motion.span>
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-amber-600/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-left space-y-0.5">
                  <p className="text-xs text-slate-300">Recommended Spaced Recall Timing:</p>
                  <p className="text-base sm:text-lg font-bold text-amber-300 flex items-center gap-2">
                    <span>⏰</span> Review this topic in <span className="underline font-mono text-emerald-400">{srsDays} day{srsDays > 1 ? 's' : ''}</span>
                  </p>
                </div>
                <div className="text-right text-[11px] text-slate-400 border-l border-slate-800 pl-3">
                  <p>Errors recorded: <span className="font-bold text-white font-mono">{errors}</span></p>
                  <p className="text-indigo-300 font-medium">Interval: {srsDays === 7 ? 'Optimal Retention' : srsDays === 3 ? 'Reinforcement Needed' : 'Immediate Remediation'}</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Spaced repetition prevents Ebbinghaus forgetting curve decay. By testing yourself again in <strong className="text-amber-300">{srsDays} day{srsDays > 1 ? 's' : ''}</strong>, neural synaptic pathways for Class 11 Psychology concepts will transition from short-term working memory into lifelong semantic memory.
              </p>
            </motion.div>

            {/* Misconception Diagnostic Profile */}
            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3 shadow-lg"
              >
                <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                  <span aria-hidden="true">⚠️</span> Personalised Misconception Diagnosis
                </h3>
                <div className="space-y-2">
                  {hitMisconceptions.map((mIdx, i) => {
                    const m = misconceptions?.[mIdx];
                    if (!m) return null;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * i }}
                        className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1 shadow"
                      >
                        <p className="text-rose-300 font-semibold">✗ Misconception: {m.misconception}</p>
                        <p className="text-emerald-300">✓ Scientific Correction: {m.correction}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Real-World Activity */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-3 shadow-xl"
            >
              <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
                <span aria-hidden="true">🔬</span> Real-World Applied Project: {REAL_WORLD_ACTIVITY.title}
              </h3>
              <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300 shadow"
                  >
                    <span className="font-bold text-indigo-400 mr-1.5">{i + 1}.</span> {st}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FEEDBACK SYSTEM POPUPS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C11_PsychologyDefinitionPsychologyBasicSim;