'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import gsap from 'gsap';

// ─── NODE IDS CONSTANTS (ALL 10 ISC CLASS 12 PSYCHOLOGY NODES) ───
const NODE_C12_PSY_021 = 'c12_psy_021';
const NODE_C12_PSY_022 = 'c12_psy_022';
const NODE_C12_PSY_023 = 'c12_psy_023';
const NODE_C12_PSY_024 = 'c12_psy_024';
const NODE_C12_PSY_025 = 'c12_psy_025';
const NODE_C12_PSY_026 = 'c12_psy_026';
const NODE_C12_PSY_027 = 'c12_psy_027';
const NODE_C12_PSY_028 = 'c12_psy_028';
const NODE_C12_PSY_029 = 'c12_psy_029';
const NODE_C12_PSY_030 = 'c12_psy_030';

const ALL_NODE_IDS = [
  NODE_C12_PSY_021,
  NODE_C12_PSY_022,
  NODE_C12_PSY_023,
  NODE_C12_PSY_024,
  NODE_C12_PSY_025,
  NODE_C12_PSY_026,
  NODE_C12_PSY_027,
  NODE_C12_PSY_028,
  NODE_C12_PSY_029,
  NODE_C12_PSY_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Pressure Cooker: Life at the Crossroads',
  intro: 'Aarav, an 18-year-old student from Delhi, faces mounting board exam pressure, parental expectations for IIT-JEE, noisy traffic, and sudden sleeplessness. His body is sounding alarm bells, his mind is deploying unconscious defense mechanisms, and his friend Maya in Kota is dealing with overwhelming panic.',
  context: 'As a junior clinical psychologist in training at NIMHANS, you must analyze Aarav\'s physiology, decode Lazarus\'s cognitive appraisals, evaluate health effects, differentiate maladaptive defense mechanisms from positive yogic resilience, and classify complex psychopathological disorders across the DSM-IV framework.',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Hans Selye coined the term "Stress" from engineering. If stress is the external load or demand, what is "Strain"?',
  options: [
    'The external force acting upon the bridge',
    'The psychological or physical deformation and wear-and-tear caused by the stress',
    'The positive feeling of conquering a difficult task',
    'The hormone secreted by the adrenal cortex during relaxation',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: In physics and psychology, Stress is the pulling force (demand), while Strain is the resulting damage, bend, or deformation in the organism.',
};

// ─── CHALLENGE INTERFACE (NEP 2020 & CISCE 2026 STANDARD) ───
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

// ─── CHALLENGES ARRAY (21+ Challenges across Foundation, Standard, Advanced) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c12_psy_021)
  {
    id: 'ch_psy_001',
    nodeId: NODE_C12_PSY_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to Hans Selye, what are the three sequential stages of the General Adaptation Syndrome (GAS)?',
    options: [
      'Alarm reaction → Adaptation → Recovery',
      'Alarm reaction → Resistance → Exhaustion',
      'Appraisal → Fight-or-Flight → Homeostasis',
      'Primary appraisal → Secondary appraisal → Coping',
    ],
    correctIndex: 1,
    explanation: 'Selye established that prolonged physiological stress follows three sequential stages: 1) Alarm reaction (immediate fight-or-flight via adrenaline), 2) Resistance (mobilised coping via cortisol), and 3) Exhaustion (depletion of resources and immune collapse). "Recovery" is not a formal stage.',
    hints: [
      'Think of Selye\'s biological curve: shock, fight/coping, and ultimate burnout.',
      'The final stage occurs when adaptive energy is completely drained.',
      'The stages are Alarm reaction, Resistance, and Exhaustion.',
    ],
    misconceptionIndex: 2,
  },
  // 2. Foundation - Drag Label (c12_psy_021) - Interactive Diagram
  {
    id: 'ch_psy_002',
    nodeId: NODE_C12_PSY_021,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each stress category to its corresponding real-world Indian scenario.',
    dragItems: [
      { label: 'Psychological Stress', targetId: 'target_psych' },
      { label: 'Physical Stress', targetId: 'target_phys' },
      { label: 'Environmental Stress', targetId: 'target_env' },
    ],
    correctMapping: {
      target_psych: 'Psychological Stress',
      target_phys: 'Physical Stress',
      target_env: 'Environmental Stress',
    },
    explanation: 'Psychological stress stems from internal conflicts (career dilemma), Physical stress from somatic trauma or extreme heat (45°C field labour), and Environmental stress from surroundings (chronic Mumbai traffic and noise).',
    hints: [
      'Match internal emotional dilemmas to psychological stress.',
      'Direct bodily fatigue from weather or illness belongs to physical stress.',
      'Surrounding city noise and air pollution belong to environmental stress.',
    ],
  },
  // 3. Foundation - Understanding (c12_psy_022)
  {
    id: 'ch_psy_003',
    nodeId: NODE_C12_PSY_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In Lazarus\'s transactional model of cognitive appraisal, what core question is evaluated during Secondary Appraisal?',
    options: [
      'Is this event positive, irrelevant, or harmful to my well-being?',
      'Do I have the coping resources, skills, and social support to handle this demand?',
      'Which defense mechanism will the Ego deploy automatically?',
      'What physiological stage of GAS is my autonomic nervous system in?',
    ],
    correctIndex: 1,
    explanation: 'Primary appraisal evaluates the event\'s meaning (harm/loss, threat, challenge), while Secondary appraisal evaluates available coping options, resources, skills, and support to answer: "What can I do about this?".',
    hints: [
      'Primary appraisal asks "Am I in trouble or challenged?".',
      'Secondary appraisal assesses "What resources do I have to overcome this?".',
      'Secondary appraisal is all about evaluating coping resources.',
    ],
  },
  // 4. Foundation - Match (c12_psy_024)
  {
    id: 'ch_psy_004',
    nodeId: NODE_C12_PSY_024,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following defense mechanisms is recognized by Anna Freud and S.K. Mangal as having constructive, socially valued adaptive utility rather than pure reality distortion?',
    options: ['Projection', 'Rationalization', 'Sublimation', 'Reaction Formation'],
    correctIndex: 2,
    explanation: 'Sublimation is the mature defense mechanism wherein unacceptable aggressive or instinctual impulses are channeled into socially approved and productive achievements (such as martial arts or artistic expression).',
    hints: [
      'Most defense mechanisms are ineffective and distort reality.',
      'One mechanism transforms forbidden energy into artistic or athletic mastery.',
      'The answer is Sublimation.',
    ],
    misconceptionIndex: 1,
  },
  // 5. Foundation - Recall (c12_psy_026)
  {
    id: 'ch_psy_005',
    nodeId: NODE_C12_PSY_026,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which "4 Ds" define abnormal behavior in modern clinical psychology?',
    options: [
      'Depression, Dementia, Delirium, Distress',
      'Deviance, Distress, Dysfunction, Danger',
      'Defiance, Denial, Displacement, Despair',
      'Diagnosis, Disability, Disease, Deficit',
    ],
    correctIndex: 1,
    explanation: 'Abnormal behavior is universally characterized by the 4 Ds: Deviance (norm violation), Distress (subjective suffering), Dysfunction (impairment in daily roles), and Danger (risk of harm to self/others).',
    hints: [
      'Remember the four core criteria used across psychiatric assessments.',
      'They include norm violation, suffering, role failure, and safety risk.',
      'Deviance, Distress, Dysfunction, Danger.',
    ],
    misconceptionIndex: 0,
  },
  // 6. Foundation - Drag Sort (c12_psy_025)
  {
    id: 'ch_psy_006',
    nodeId: NODE_C12_PSY_025,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the first five limbs (Angas) of Patanjali\'s Classical Ashtanga Yoga in their correct hierarchical sequence.',
    sortItems: ['Yama (Social Ethics)', 'Niyama (Personal Discipline)', 'Asana (Physical Posture)', 'Pranayama (Breath Control)', 'Pratyahara (Sense Withdrawal)'],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Patanjali\'s first five limbs proceed systematically: 1) Yama (social restraints), 2) Niyama (personal observances), 3) Asana (postures), 4) Pranayama (breath regulation), and 5) Pratyahara (withdrawal of senses inward).',
    hints: [
      'Start with how you treat society (Yama), then self-discipline (Niyama).',
      'Physical posture (Asana) precedes breath control (Pranayama).',
      'Sense withdrawal (Pratyahara) is the final fifth limb in the introductory syllabus.',
    ],
  },
  // 7. Foundation - Classify (c12_psy_027)
  {
    id: 'ch_psy_007',
    nodeId: NODE_C12_PSY_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How does clinical anxiety fundamentally differ from fear?',
    options: [
      'Fear is long-lasting and vague; anxiety is short-lived with an obvious danger.',
      'Fear is a response to an immediate, identifiable threat; anxiety is a diffuse, future-oriented dread regarding an unspecified threat.',
      'Anxiety is only physiological; fear is purely cognitive.',
      'Anxiety is an Axis II disorder; fear is an Axis I disorder.',
    ],
    correctIndex: 1,
    explanation: 'Fear has a clear, immediate face (e.g. facing a wild animal), activating instant survival reflexes. Anxiety is future-oriented, diffuse, and persistent without an immediate external threat present.',
    hints: [
      'Fear is immediate ("tiger in the room").',
      'Anxiety is anticipatory and free-floating ("what if something bad happens next month?").',
      'The difference lies in temporal focus and the specificity of the threat.',
    ],
  },
  // 8. Standard - Application (c12_psy_022)
  {
    id: 'ch_psy_008',
    nodeId: NODE_C12_PSY_022,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Rohit, a Class 12 student in Chennai, views his upcoming ISC physics exam not as a catastrophe, but as an exciting chance to win an academic scholarship. According to Lazarus, how has Rohit categorized this stressor in Primary Appraisal?',
    options: ['Harm / Loss', 'Threat', 'Challenge', 'Benign-irrelevant'],
    correctIndex: 2,
    explanation: 'When a stressful situation is evaluated as an opportunity for personal mastery, growth, or gain, it is appraised as a "Challenge" (producing eustress) rather than a "Threat" (distress).',
    hints: [
      'He sees an opportunity for growth and scholarship victory.',
      'Threat implies anticipated future damage; Harm implies past damage.',
      'Challenge appraisal focuses on positive gain and mastery.',
    ],
  },
  // 9. Standard - Application (c12_psy_024)
  {
    id: 'ch_psy_009',
    nodeId: NODE_C12_PSY_024,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Sunita feels intense subconscious envy toward her classmate Priya\'s top marks. When talking to her friends, Sunita loudly insists: "Priya is constantly jealous and competitive towards me!" Which defense mechanism is operating here?',
    options: ['Displacement', 'Projection', 'Rationalization', 'Regression'],
    correctIndex: 1,
    explanation: 'Projection involves attributing one\'s own unacceptable impulses or traits (envy) onto another person ("she is jealous of me"), thus disowning the internal conflict.',
    hints: [
      'Sunita is placing her OWN forbidden jealousy onto Priya.',
      'Displacement moves the target of emotion; Projection moves ownership of the impulse.',
      'The mechanism is Projection.',
    ],
  },
  // 10. Standard - Numeric (c12_psy_023)
  {
    id: 'ch_psy_010',
    nodeId: NODE_C12_PSY_023,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'According to landmark Indian public health data from the ICMR and NIMHANS NMHS surveys, what approximate percentage of urban adult Indians suffer from hypertension or require active mental health intervention? (Enter the approximate integer % reported around 14 to 28)',
    correctAnswer: 14,
    tolerance: 2,
    unit: '%',
    explanation: 'The NIMHANS National Mental Health Survey (2015-16) documented that ~13.9% (approx 14%) of the Indian population requires active mental health intervention, with stress as a primary driver.',
    hints: [
      'The NMHS 2015-16 surveyed 12 Indian states.',
      'The prevalence is between 13% and 15%.',
      'Enter 14.',
    ],
  },
  // 11. Standard - Analysis (c12_psy_023)
  {
    id: 'ch_psy_011',
    nodeId: NODE_C12_PSY_023,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does chronic elevation of cortisol during Selye\'s exhaustion stage lead to frequent colds and bacterial infections?',
    options: [
      'Cortisol directly accelerates heart rate and cardiac output.',
      'Cortisol stimulates excessive gastric acid production.',
      'Cortisol binds to glucocorticoid receptors on T and B lymphocytes, suppressing antibody synthesis and proliferation.',
      'Cortisol causes immediate constriction of the bronchial airways.',
    ],
    correctIndex: 2,
    explanation: 'Sustained cortisol secretion from the adrenal cortex binds to glucocorticoid receptors on T- and B-lymphocytes, suppressing their proliferation, cytokine release, and antibody manufacturing, causing immunosuppression.',
    hints: [
      'Look for the pathway connecting adrenal hormones to white blood cells.',
      'Lymphocytes (T and B cells) are the body\'s immune defenders.',
      'Cortisol suppresses lymphocyte proliferation.',
    ],
  },
  // 12. Standard - Classify (c12_psy_028)
  {
    id: 'ch_psy_012',
    nodeId: NODE_C12_PSY_028,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A 32-year-old manager in Mumbai exhibits two weeks of decreased need for sleep (2 hours/night), non-stop grandiose speech, uninhibited risky financial investments, and intense euphoria, followed by three weeks of profound despair and anhedonia. What is the clinical diagnosis?',
    options: ['Major Depressive Disorder', 'Bipolar Disorder', 'Anti-Social Personality Disorder', 'Generalised Anxiety Disorder'],
    correctIndex: 1,
    explanation: 'The oscillation between manic episodes (hyperactivity, euphoria, flight of ideas, reduced sleep) and major depressive episodes (anhedonia, despair) defines Bipolar Disorder (formerly manic-depressive illness).',
    hints: [
      'Notice the two distinct opposite poles of mood: mania and depression.',
      'Major depression does not feature periods of hyper-elevated manic euphoria.',
      'The diagnosis is Bipolar Disorder.',
    ],
  },
  // 13. Standard - Distinguish (c12_psy_027)
  {
    id: 'ch_psy_013',
    nodeId: NODE_C12_PSY_027,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In Obsessive-Compulsive Disorder (OCD), what is the functional relationship between an Obsession and a Compulsion?',
    options: [
      'The obsession is a physical motor ritual; the compulsion is the intrusive recurring thought.',
      'The obsession is an intrusive anxiety-provoking thought; the compulsion is a repetitive ritual performed to temporarily reduce that anxiety.',
      'Obsessions only occur in children; compulsions only occur in adults.',
      'Compulsions trigger obsessions through classical conditioning.',
    ],
    correctIndex: 1,
    explanation: 'Obsessions are persistent, involuntary, anxiety-generating thoughts/images; Compulsions are repetitive, rule-governed motor rituals (e.g., washing, counting) performed specifically to neutralize the obsessive anxiety.',
    hints: [
      'Obsessions happen in cognition (thoughts).',
      'Compulsions are behavioral acts executed to relieve tension.',
      'Thought (obsession) drives the anxiety; Action (compulsion) temporarily calms it.',
    ],
  },
  // 14. Standard - Construct (c12_psy_025)
  {
    id: 'ch_psy_014',
    nodeId: NODE_C12_PSY_025,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct Suzanne Kobasa\'s 3 Cs of the "Stress-Resistant (Hardy) Personality". Select and assemble the 3 core traits.',
    availableParts: ['Commitment', 'Control', 'Challenge', 'Compliance', 'Comfort', 'Catharsis'],
    targetState: 'Commitment Control Challenge',
    validationHint: 'The 3 Cs that buffer against stress and disease according to Kobasa.',
    explanation: 'Kobasa\'s Hardiness model identifies three resilient personality components: Commitment (dedication to life goals), Control (internal locus of control), and Challenge (viewing change as opportunity rather than threat).',
    hints: [
      'Kobasa formulated the "3 Cs".',
      'They include dedicating oneself to goals, feeling in control, and seeing change as growth.',
      'Assemble: Commitment, Control, Challenge.',
    ],
  },
  // 15. Advanced - Analysis (c12_psy_030)
  {
    id: 'ch_psy_015',
    nodeId: NODE_C12_PSY_030,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why are negative symptoms of Schizophrenia (e.g., alogia, avolition, affective flattening) considered more disabling for long-term prognosis than positive symptoms (delusions, hallucinations)?',
    options: [
      'Negative symptoms cause severe somatic heart complications.',
      'Positive symptoms are permanent, while negative symptoms disappear in weeks.',
      'Positive symptoms respond well to standard D2 dopamine antagonists, whereas negative symptoms resist medication and steadily erode social, occupational, and self-care abilities.',
      'Negative symptoms only occur during catatonic stupor.',
    ],
    correctIndex: 2,
    explanation: 'Positive symptoms are psychotic additions that respond effectively to dopamine-blocking neuroleptics. Negative symptoms represent profound deficits (lack of drive, flat emotion, speech poverty) that resist current pharmacotherapy and lead to chronic disability and social withdrawal.',
    hints: [
      'Consider how psychiatric drugs work on dopamine pathways.',
      'Delusions and voices can often be quieted with medication.',
      'Deficits in motivation and emotional expression erode daily functioning permanently.',
    ],
  },
  // 16. Advanced - Evaluation (c12_psy_026)
  {
    id: 'ch_psy_016',
    nodeId: NODE_C12_PSY_026,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the DSM-IV Multiaxial System: On which Axis are long-standing Personality Disorders (e.g., Anti-Social, Avoidant) and Intellectual Disabilities coded?',
    options: ['Axis I', 'Axis II', 'Axis III', 'Axis IV'],
    correctIndex: 1,
    explanation: 'In DSM-IV: Axis I = Clinical Syndromes (Depression, Schizophrenia, GAD); Axis II = Personality Disorders & Mental Retardation (enduring developmental traits); Axis III = General Medical Conditions; Axis IV = Psychosocial Stressors; Axis V = GAF score (0-100).',
    hints: [
      'Axis I is for acute episodic clinical syndromes.',
      'Axis II is reserved for lifelong, inflexible personality patterns and developmental delays.',
      'The answer is Axis II.',
    ],
    misconceptionIndex: 1,
  },
  // 17. Advanced - Application (c12_psy_029)
  {
    id: 'ch_psy_017',
    nodeId: NODE_C12_PSY_029,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A 5-year-old child in Bengaluru avoids eye contact, does not respond to her name, shows repetitive hand-flapping, and has severe distress when dining furniture is moved even slightly. What is the differential diagnosis according to DSM-5?',
    options: [
      'Attention Deficit Hyperactive Disorder (ADHD)',
      'Autism Spectrum Disorder (ASD)',
      'Separation Anxiety Disorder',
      'Conduct Disorder',
    ],
    correctIndex: 1,
    explanation: 'Autism Spectrum Disorder is diagnostically defined by persistent deficits in social communication/interaction (no eye contact, lack of social response) combined with restricted, repetitive patterns of behavior and insistence on sameness.',
    hints: [
      'Look for the hallmark triad: social communication failure + repetitive motor mannerisms + strict insistence on sameness.',
      'ADHD involves inattention and impulsivity, not insistence on environmental sameness.',
      'The diagnosis is Autism Spectrum Disorder.',
    ],
  },
  // 18. Advanced - Analysis (c12_psy_030)
  {
    id: 'ch_psy_018',
    nodeId: NODE_C12_PSY_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A 24-year-old patient at NIMHANS maintains rigid, bizarre body postures for hours without speaking, and displays "waxy flexibility" where his arms remain in whatever awkward position the examiner places them. Which subtype of Schizophrenia is demonstrated?',
    options: ['Paranoid Schizophrenia', 'Disorganized (Hebephrenic) Schizophrenia', 'Catatonic Schizophrenia', 'Residual Schizophrenia'],
    correctIndex: 2,
    explanation: 'Catatonic Schizophrenia is dominated by prominent motor disturbances including catatonic stupor, posturing, rigidity, mutism, and waxy flexibility (flexibilitas cerea).',
    hints: [
      'Look at the motor symptoms: immobility, posture maintenance, and moldable limbs.',
      'Paranoid is marked by persecutory delusions; Disorganized by silly affect and word salad.',
      'The subtype is Catatonic Schizophrenia.',
    ],
  },
  // 19. Advanced - Evaluation (c12_psy_028)
  {
    id: 'ch_psy_019',
    nodeId: NODE_C12_PSY_028,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How should an Indian clinician distinguish between culturally normative interdependence in a joint family and clinical Dependent Personality Disorder?',
    options: [
      'Joint family living is always considered pathological in DSM-IV.',
      'Dependent Personality Disorder involves pervasive, inflexible inability to make everyday decisions without reassurance, passive submission, and morbid fear of abandonment causing subjective distress and dysfunction.',
      'Interdependence only exists in Western cultures.',
      'Dependent personality traits only appear in males.',
    ],
    correctIndex: 1,
    explanation: 'Healthy cultural interdependence involves reciprocal caregiving and mutual respect; Dependent Personality Disorder is an inflexible, maladaptive pattern marked by helpless submissiveness, inability to make simple personal choices alone, and severe functional impairment.',
    hints: [
      'Consider the 4 Ds: Distress and Dysfunction.',
      'Cultural respect for family elders is voluntary and functional.',
      'Disorder implies maladaptive, paralysing fear and loss of autonomy.',
    ],
  },
  // 20. Advanced - Creativity / Policy (c12_psy_025)
  {
    id: 'ch_psy_020',
    nodeId: NODE_C12_PSY_025,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Under the landmark Mental Healthcare Act 2017 of India, what fundamental legal and human right is guaranteed to every individual suffering from severe stress or mental illness?',
    options: [
      'Compulsory institutional confinement in psychiatric asylums without consent',
      'The right to access affordable, non-discriminatory mental healthcare, the right to make Advance Directives, and the complete decriminalization of suicide attempts',
      'The immediate suspension of all employment rights upon psychiatric diagnosis',
      'Mandatory electroconvulsive therapy without anesthesia',
    ],
    correctIndex: 1,
    explanation: 'The Mental Healthcare Act 2017 revolutionized Indian mental health law by recognizing access to quality mental healthcare as a fundamental right, protecting dignity, legalizing advance directives, banning chaining/unmodified ECT, and decriminalizing suicide attempts (Section 115).',
    hints: [
      'The Act shifted from colonial institutionalization to rights-based community care.',
      'It decriminalized suicide attempts and mandated government mental health services.',
      'Look for the answer highlighting dignity, access, and advance directives.',
    ],
  },
  // 21. Advanced - Drag Sort (c12_psy_024)
  {
    id: 'ch_psy_021',
    nodeId: NODE_C12_PSY_024,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Order these defensive behaviors from most primitive/reality-distorting to most mature/adaptive according to psychoanalytic hierarchy (S.K. Mangal / Anna Freud).',
    sortItems: [
      'Repression (Unconscious banishment of traumatic memory)',
      'Projection (Attributing inner impulses to others)',
      'Rationalization (Inventing plausible false excuses)',
      'Sublimation (Channelling impulses into sports or arts)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The psychoanalytic maturity continuum moves from primitive/unconscious banishment (Repression) → reality projection (Projection) → cognitive excuse-making (Rationalization) → socially constructive transformation (Sublimation).',
    hints: [
      'Repression is the most foundational and unconscious defense.',
      'Sublimation is universally acknowledged as the most mature adaptation.',
      'Order: Repression → Projection → Rationalization → Sublimation.',
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

// ─── DEFAULT ENRICHMENT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: 'c12_psy_021',
  title: 'Psychology of Stress, Coping & Abnormal Behavior',
  definition: 'Stress is the non-specific physiological, emotional, and cognitive response of an organism to demanding environmental or internal stressors. Unmanaged chronic stress causes somatic disease and maladaptive defense mechanisms, whereas effective appraisal, yoga, and clinical classification (DSM-IV) restore resilience.',
  eli5: 'Think of your body like a guitar string: a little tension makes beautiful music (eustress), but too much tension will snap the string (distress and burnout). Psychology teaches us how to tune the string back to harmony!',
  misconceptions: [
    {
      misconception: 'Stress and Strain are identical concepts in psychology.',
      correction: 'Stress is the external/internal demanding force; Strain is the resulting physiological and psychological wear, damage, or deformation.',
    },
    {
      misconception: 'All stress is inherently toxic and must be completely eliminated.',
      correction: 'Eustress is healthy, motivating stress essential for peak academic and sports performance under the Yerkes-Dodson Law.',
    },
    {
      misconception: 'The three stages of Selye\'s GAS are Alarm, Adaptation, and Recovery.',
      correction: 'The correct sequence is Alarm Reaction, Resistance, and Exhaustion. Recovery is not a stage.',
    },
    {
      misconception: 'Schizophrenia means having a "split personality" (multiple personalities).',
      correction: 'Schizophrenia is a psychotic disintegration of thought, emotion, and perception. Multiple personality is Dissociative Identity Disorder.',
    },
    {
      misconception: 'Biofeedback cures anxiety by administering mild corrective electric shocks.',
      correction: 'Biofeedback uses passive electronic sensors to display physiological data (heart rate, GSR), allowing voluntary self-regulation without shocks.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What did Hans Selye identify as the first stage of the General Adaptation Syndrome?', options: ['Resistance', 'Alarm Reaction', 'Exhaustion', 'Homeostasis'], correctIndex: 1 },
    { question: 'Which hormone from the adrenal cortex sustains prolonged resistance to stress?', options: ['Insulin', 'Cortisol', 'Thyroxine', 'Melatonin'], correctIndex: 1 },
    { question: 'Lazarus\'s Primary Appraisal classifies stressors into which three categories?', options: ['Id, Ego, Superego', 'Harm/Loss, Threat, Challenge', 'Alarm, Resistance, Exhaustion', 'Yama, Niyama, Asana'], correctIndex: 1 },
    { question: 'Which defense mechanism shifts anger from a powerful boss to a safe family member?', options: ['Projection', 'Displacement', 'Sublimation', 'Reaction Formation'], correctIndex: 1 },
    { question: 'What is the optimal arousal curve relating stress to performance named?', options: ['Selye Curve', 'Yerkes-Dodson Law', 'Lazarus Graph', 'Patanjali Inversion'], correctIndex: 1 },
    { question: 'Which axis of DSM-IV records clinical psychiatric syndromes like Schizophrenia?', options: ['Axis I', 'Axis II', 'Axis III', 'Axis IV'], correctIndex: 0 },
    { question: 'Which subtype of Schizophrenia features waxy flexibility and catatonic stupor?', options: ['Paranoid', 'Catatonic', 'Disorganized', 'Undifferentiated'], correctIndex: 1 },
    { question: 'Under which Indian law is access to mental healthcare established as a legal right?', options: ['Indian Lunacy Act 1858', 'Mental Healthcare Act 2017', 'RPwD Act 1995', 'Epidemic Diseases Act'], correctIndex: 1 },
  ],
  masteryCriteria: 'Master all 10 CISCE ISC Psychology nodes: GAS physiological curves, Lazarus appraisal, Yerkes-Dodson inverted-U, 7 defense mechanisms, 5 limbs of yoga, DSM-IV axes, anxiety/mood disorders, ADHD/Autism, and Schizophrenia phenomenology.',
};

// ─── INTERACTIVE EXPLORATION STEPS (BRILLIANT.ORG STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: '1. Selye\'s GAS Biological Engine',
    instruction: 'Drag the Stress Duration slider to watch the HPA axis move from Alarm to Resistance and into Exhaustion.',
    interactionType: 'gas-simulator',
    nodeId: NODE_C12_PSY_021,
  },
  {
    title: '2. Lazarus Cognitive Appraisal Lab',
    instruction: 'Select a life event and toggle your Coping Resources to see whether the mind appraises Threat or Challenge.',
    interactionType: 'appraisal-builder',
    nodeId: NODE_C12_PSY_022,
  },
  {
    title: '3. Yerkes-Dodson Inverted-U Curve',
    instruction: 'Adjust the Arousal Slider to find the optimal stress zone before performance collapses into Burnout.',
    interactionType: 'yerkes-dodson',
    nodeId: NODE_C12_PSY_023,
  },
  {
    title: '4. Freudian Defense Mechanism Sorter',
    instruction: 'Click each unconscious Ego shield to reveal how it distorts reality to protect against severe anxiety.',
    interactionType: 'defense-sorter',
    nodeId: NODE_C12_PSY_024,
  },
  {
    title: '5. Brain Anatomy & Schizophrenia Neurotransmitters',
    instruction: 'Click brain regions (Prefrontal Cortex, Amygdala, Limbic System) to see dopamine dysregulation in psychosis.',
    interactionType: 'brain-explorer',
    nodeId: NODE_C12_PSY_030,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an athlete undergoes severe chronic stress without rest for 6 months, what will happen to their lymphocyte count and resistance curve?',
    options: [
      'Resistance stays permanently high, boosting immunity to viruses.',
      'Lymphocytes plummet due to chronic cortisol, collapsing the body into the Exhaustion stage.',
      'The body switches completely to eustress automatically.',
      'Adrenaline permanently replaces cortisol with zero bodily fatigue.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Stress Duration slider past 80% to observe the immune collapse on the GAS gauge!',
    nodeId: NODE_C12_PSY_021,
  },
  {
    question: 'Predict: If a student appraises board exams with High Perceived Demands BUT also High Available Coping Resources, what state is experienced?',
    options: [
      'Destructive Panic & Distress',
      'Energising Challenge & Focused Eustress',
      'Catatonic Psychomotor Stupor',
      'Immediate Emotional Burnout',
    ],
    correctIndex: 1,
    verifyInstruction: 'In the Appraisal Lab, set Demands to High and Resources to High to verify the Challenge state!',
    nodeId: NODE_C12_PSY_022,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe on the Yerkes-Dodson performance graph as Arousal increases from 0% to 50%?',
    observableOptions: [
      'Performance drops steadily towards zero.',
      'Performance increases up to peak efficiency at moderate optimal arousal.',
      'Burnout occurs immediately.',
      'The curve turns into a flat horizontal line.',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_PSY_023,
  },
  {
    question: 'What happens to the Amygdala and Prefrontal Cortex when the Dopamine slider is pushed to maximum in the Brain Explorer?',
    observableOptions: [
      'Prefrontal executive control becomes hyper-organized.',
      'Mesolimbic dopamine hyperactivity triggers hallucinations and persecutory delusions (Positive Symptoms).',
      'The brain enters deep slow-wave restorative sleep.',
      'The sympathetic nervous system shuts down completely.',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_PSY_030,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'The NIMHANS Stress & Resilience Audit',
  description: 'Apply Hans Selye\'s GAS and Lazarus\'s appraisal model to your own academic life before the upcoming ISC board exams.',
  steps: [
    'Log 3 daily academic/environmental stressors (e.g. mock test, traffic, sleep loss).',
    'Classify each stressor as Harm/Loss, Threat, or Challenge using Lazarus\'s primary appraisal.',
    'Inventory 3 concrete coping resources (time management, peer support, PMR / Pranayama).',
    'Implement 10 minutes of Progressive Muscle Relaxation (PMR) nightly and evaluate changes in sleep quality.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN SIMULATION COMPONENT ───
export function C12_PsychologyMeaningStressNatureSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['psychology'] || { name: 'Psychology', emoji: '🧠', color: 'purple' };

  // Phase Management
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant-Style Interactive Exploration State (30+ State variables)
  const [gasDuration, setGasDuration] = useState(25); // 0 to 100 days
  const [appraisalDemand, setAppraisalDemand] = useState<'low' | 'medium' | 'high'>('high');
  const [appraisalResources, setAppraisalResources] = useState<'low' | 'medium' | 'high'>('high');
  const [arousalLevel, setArousalLevel] = useState(50); // 0 to 100%
  const [taskComplexity, setTaskComplexity] = useState<'simple' | 'complex'>('complex');
  const [selectedDefense, setSelectedDefense] = useState<string>('sublimation');
  const [selectedBrainRegion, setSelectedBrainRegion] = useState<string>('prefrontal');
  const [dopamineLevel, setDopamineLevel] = useState(50);

  // Predict & Observation states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Adaptive & Score states
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Interactive Challenge specific states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback FX states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTER CHALLENGES BY CURRENT DIFFICULTY ───
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

  // ─── BKT ADAPTIVE UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── REAL-TIME DERIVED GAS VALUES ───
  const gasStage = useMemo(() => {
    if (gasDuration < 20) return { name: 'Alarm Reaction', hormone: 'Adrenaline & Noradrenaline (SAM Axis)', status: 'Acute Fight-or-Flight. Heart rate high, muscles tense.', color: '#f59e0b', resistanceLevel: 80 };
    if (gasDuration < 70) return { name: 'Resistance Stage', hormone: 'Cortisol & Glucocorticoids (HPA Axis)', status: 'Sustained coping. High arousal maintained, immune reserve depleting.', color: '#3b82f6', resistanceLevel: 65 };
    return { name: 'Exhaustion Stage', hormone: 'Adrenal Depletion & Glucocorticoid Resistance', status: 'Somatic breakdown! Lymphocytes drop, ulcer/hypertension vulnerability.', color: '#ef4444', resistanceLevel: 20 };
  }, [gasDuration]);

  // ─── REAL-TIME DERIVED APPRAISAL STATE ───
  const appraisalResult = useMemo(() => {
    if (appraisalDemand === 'low') return { state: 'Benign / Calm', text: 'Stressor is seen as negligible. Baseline homeostasis maintained.', color: 'text-emerald-400', bg: 'bg-emerald-950/60' };
    if (appraisalResources === 'high' || (appraisalDemand === 'medium' && appraisalResources === 'medium')) {
      return { state: 'Eustress (Challenge)', text: 'Demands matched by robust coping skills! Motivates peak performance and growth.', color: 'text-gold-400', bg: 'bg-gold-950/60' };
    }
    return { state: 'Distress (Threat / Harm)', text: 'Perceived demands exceed perceived coping resources! High anxiety & strain.', color: 'text-rose-400', bg: 'bg-rose-950/60' };
  }, [appraisalDemand, appraisalResources]);

  // ─── REAL-TIME DERIVED YERKES-DODSON PERFORMANCE ───
  const performanceScore = useMemo(() => {
    const opt = taskComplexity === 'simple' ? 70 : 45;
    const diff = Math.abs(arousalLevel - opt);
    const perf = Math.max(10, Math.round(100 - (diff * diff) / (taskComplexity === 'simple' ? 35 : 20)));
    return perf;
  }, [arousalLevel, taskComplexity]);

  // ─── 12+ USECALLBACK HANDLERS ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding! Stress is the force, strain is the deformation.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Brilliant interactive psychology laboratory.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Explore freely! Move sliders and observe physiological responses with zero grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode unlocked! Demonstrate your clinical mastery.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Hypothesis recorded! Now adjust the slider to test your prediction.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp observation! You verified the inverted-U curve.' : 'Look closely at the peak of the curve.');
  }, []);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us study the complete step-by-step clinical explanation together.');
    }
  }, [hintCount, challenge]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length === challenge.sortItems?.length ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = base.splice(fromIndex, 1);
      base.splice(toIndex, 0, moved);
      return base;
    });
  }, [challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You scored ${finalScore}% and mastered ISC Class 12 Psychology.`);
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

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const val = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(val - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Accurate analysis! Well done.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify({ score: 100, lastUpdated: Date.now() }));
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
        speechManager.speak('Let us examine the clinical rationale step by step.');
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

  // ─── 2D CANVAS ANIMATION: OSCILLATING HPA AXIS & HEART RATE PULSE ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let step = 0;

    const render = () => {
      step++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw Physiological ECG Waveform representing autonomic arousal
      ctx.beginPath();
      ctx.strokeStyle = arousalLevel > 70 ? '#ef4444' : arousalLevel > 40 ? '#22c55e' : '#3b82f6';
      ctx.lineWidth = 2.5;

      const speed = (arousalLevel / 50) * 2 + 1;
      for (let x = 0; x < canvas.width; x++) {
        const freq = (x + step * speed) * 0.05;
        let y = canvas.height / 2 + Math.sin(freq) * 8;
        // Periodic ECG QRS spikes
        if ((x + step * speed) % 90 < 12) {
          const spikePhase = ((x + step * speed) % 90);
          if (spikePhase < 3) y += 6;
          else if (spikePhase < 7) y -= (arousalLevel * 0.35 + 10);
          else y += 12;
        }
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw active status badge
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Autonomic Arousal: ${arousalLevel}% | Pulse Rate: ${Math.round(60 + arousalLevel * 0.8)} bpm`, 12, 18);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [arousalLevel]);

  // ─── CLEANUP ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2.5 bg-purple-950/70 border border-purple-700 rounded-2xl shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <span className="text-xs font-semibold text-purple-400 tracking-wider uppercase">
              ISC Class 12 Psychology • Section 4 & 5
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-2xl text-xs font-medium">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p !== 'complete' || scoreBreakdown.total > 0) setPhase(p);
              }}
              className={`px-3 py-1.5 rounded-xl capitalize transition-all ${
                phase === p
                  ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-purple-950/60 via-slate-900 to-gold-950/60 rounded-2xl border border-purple-800/60">
            <h2 className="text-lg font-bold text-purple-300 flex items-center gap-2">
              <span>🎯</span> {SCENARIO.title}
            </h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-purple-300/80 mt-2 italic">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Pre-Lab Discovery Hook</span>
            <h3 className="text-base md:text-lg font-bold text-white mt-1 mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/60 border border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 hover:border-purple-500'
                  }`}
                >
                  <span className="font-bold mr-2 text-purple-400">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Excellent intuition! Stress is the force, strain is the deformation.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold shadow-lg shadow-purple-600/30 text-sm flex items-center gap-2"
                >
                  Enter Interactive Laboratory →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE (BRILLIANT.ORG INTERACTIVE STEPS) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-400">
            <span>Step {currentSlide + 1} of {EXPLORATION_STEPS.length}: {EXPLORATION_STEPS[currentSlide].title}</span>
            <span className="text-purple-400 font-semibold">Active Lab Mode</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-5 md:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-lg font-black text-purple-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-300 text-sm mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ─── STEP 0: GAS SIMULATOR ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {/* Predict then Check Box */}
                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/60 rounded-xl border border-gold-700/60">
                      <p className="text-sm font-bold text-gold-200 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left bg-slate-800 hover:bg-slate-700 text-xs rounded-lg text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-emerald-950/50 border border-emerald-700 rounded-xl text-xs text-emerald-300">
                      ✓ Hypothesis noted! Test by dragging the stress exposure slider below:
                    </motion.div>
                  )}

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs text-slate-300">
                      <span>Chronic Stressor Duration: <strong className="text-purple-400">{gasDuration} Days</strong></span>
                      <span className="font-bold px-2.5 py-1 rounded-md text-white text-xs" style={{ backgroundColor: gasStage.color }}>
                        Stage: {gasStage.name}
                      </span>
                    </div>

                    <input
                      type="range"
                      min={1}
                      max={100}
                      value={gasDuration}
                      aria-label="Stress Duration Slider"
                      onChange={(e) => {
                        setGasDuration(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-purple-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    />

                    {/* GAS Interactive SVG Curve */}
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <svg viewBox="0 0 500 160" className="w-full h-36">
                        {/* Normal Baseline */}
                        <line x1="20" y1="90" x2="480" y2="90" stroke="#475569" strokeDasharray="4 4" strokeWidth="1.5" />
                        <text x="30" y="85" fill="#64748b" fontSize="9">Normal Homeostatic Resistance</text>

                        {/* Stage Zones */}
                        <rect x="20" y="20" width="120" height="130" fill="#f59e0b" fillOpacity="0.08" />
                        <text x="40" y="35" fill="#f59e0b" fontSize="10" fontWeight="bold">1. Alarm</text>

                        <rect x="140" y="20" width="200" height="130" fill="#3b82f6" fillOpacity="0.08" />
                        <text x="210" y="35" fill="#3b82f6" fontSize="10" fontWeight="bold">2. Resistance</text>

                        <rect x="340" y="20" width="140" height="130" fill="#ef4444" fillOpacity="0.08" />
                        <text x="375" y="35" fill="#ef4444" fontSize="10" fontWeight="bold">3. Exhaustion</text>

                        {/* Selye's GAS Curve */}
                        <path
                          d="M 20 90 Q 60 140 100 50 Q 240 30 340 50 Q 410 80 480 145"
                          fill="none"
                          stroke="#a855f7"
                          strokeWidth="3.5"
                        />

                        {/* Current Position Marker */}
                        {(() => {
                          const xPos = 20 + (gasDuration / 100) * 460;
                          let yPos = 90;
                          if (gasDuration < 20) yPos = 90 + Math.sin(gasDuration * 0.15) * 30;
                          else if (gasDuration < 70) yPos = 40 + Math.sin(gasDuration * 0.05) * 10;
                          else yPos = 40 + ((gasDuration - 70) / 30) * 105;

                          return (
                            <g>
                              <circle cx={xPos} cy={yPos} r="7" fill={gasStage.color} className="animate-pulse" />
                              <line x1={xPos} y1="20" x2={xPos} y2="150" stroke={gasStage.color} strokeWidth="1" strokeDasharray="2 2" />
                            </g>
                          );
                        })()}
                      </svg>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400">Active Endocrine Pathway:</span>
                        <p className="font-bold text-purple-300 mt-0.5">{gasStage.hormone}</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400">Somatic & Immune Impact:</span>
                        <p className="font-bold text-slate-200 mt-0.5">{gasStage.status}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── STEP 1: LAZARUS APPRAISAL BUILDER ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                      <label className="text-xs font-bold text-purple-400 block mb-2">1. Primary Appraisal (Demand Level)</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['low', 'medium', 'high'] as const).map((d) => (
                          <motion.button
                            key={d}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                              setAppraisalDemand(d);
                              audioManager.play('tap');
                            }}
                            className={`p-2 rounded-lg text-xs font-bold capitalize transition-all ${
                              appraisalDemand === d
                                ? 'bg-purple-600 text-white'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-750'
                            }`}
                          >
                            {d}
                          </motion.button>
                        ))}
                      </div>
                      <span className="text-[11px] text-slate-400 mt-2 block">
                        {appraisalDemand === 'high' ? 'High: Board exam tomorrow / Father lost job' : appraisalDemand === 'medium' ? 'Medium: Surprise unit test' : 'Low: Minor homework delay'}
                      </span>
                    </div>

                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                      <label className="text-xs font-bold text-purple-400 block mb-2">2. Secondary Appraisal (Coping Resources)</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['low', 'medium', 'high'] as const).map((r) => (
                          <motion.button
                            key={r}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                              setAppraisalResources(r);
                              audioManager.play('tap');
                            }}
                            className={`p-2 rounded-lg text-xs font-bold capitalize transition-all ${
                              appraisalResources === r
                                ? 'bg-gold-600 text-white'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-750'
                            }`}
                          >
                            {r}
                          </motion.button>
                        ))}
                      </div>
                      <span className="text-[11px] text-slate-400 mt-2 block">
                        {appraisalResources === 'high' ? 'High: Well-prepared notes + Teacher mentor + Sleep' : appraisalResources === 'medium' ? 'Medium: Average notes + Moderate time' : 'Low: Zero preparation + Isolated'}
                      </span>
                    </div>
                  </div>

                  {/* Appraisal Outcome Card */}
                  <motion.div
                    key={appraisalResult.state}
                    initial={{ scale: 0.97, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`p-4 rounded-xl border border-slate-700 ${appraisalResult.bg}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-slate-300 font-bold">Lazarus Transactional State:</span>
                      <strong className={`text-base font-black ${appraisalResult.color}`}>{appraisalResult.state}</strong>
                    </div>
                    <p className="text-xs text-slate-200 mt-1">{appraisalResult.text}</p>
                  </motion.div>
                </div>
              )}

              {/* ─── STEP 2: YERKES-DODSON PERFORMANCE & CANVAS ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {/* Observation Question */}
                  {!observationAnswered && (
                    <div className="p-3.5 bg-purple-950/50 rounded-xl border border-purple-800">
                      <p className="text-xs font-bold text-purple-200 mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="p-2 text-left bg-slate-800 hover:bg-slate-750 text-xs rounded-lg text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Autonomic ECG Canvas */}
                  <canvas ref={canvasRef} width={500} height={50} className="w-full h-16 bg-slate-950 rounded-xl border border-slate-800" />

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">Arousal / Pressure: <strong className="text-purple-400">{arousalLevel}%</strong></span>
                      <span className="text-slate-300">Cognitive Output: <strong className={performanceScore > 75 ? 'text-emerald-400' : performanceScore > 40 ? 'text-amber-400' : 'text-rose-400'}>{performanceScore}% Efficiency</strong></span>
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={arousalLevel}
                      aria-label="Arousal Level Slider"
                      onChange={(e) => {
                        setArousalLevel(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-purple-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={() => { setTaskComplexity('complex'); audioManager.play('tap'); }}
                        className={`px-3 py-1.5 text-xs rounded-lg font-bold ${taskComplexity === 'complex' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                      >
                        Complex Task (ISC Psychology Exam)
                      </button>
                      <button
                        onClick={() => { setTaskComplexity('simple'); audioManager.play('tap'); }}
                        className={`px-3 py-1.5 text-xs rounded-lg font-bold ${taskComplexity === 'simple' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                      >
                        Simple Task (Running 100m Dash)
                      </button>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs">
                      {arousalLevel < 25 && <p className="text-gold-300">💤 <strong>Under-arousal:</strong> Lethargy, low motivation, lack of focus.</p>}
                      {arousalLevel >= 25 && arousalLevel <= 65 && <p className="text-emerald-300">🔥 <strong>Optimal Zone:</strong> Peak concentration, sharp memory recall, flow state.</p>}
                      {arousalLevel > 65 && <p className="text-rose-300">⚠️ <strong>Over-arousal & Burnout:</strong> Panic, memory block, emotional exhaustion under Maslach model.</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── STEP 3: DEFENSE MECHANISM SORTER ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                    {[
                      { id: 'rationalization', label: 'Rationalization' },
                      { id: 'projection', label: 'Projection' },
                      { id: 'reaction_formation', label: 'Reaction Formation' },
                      { id: 'regression', label: 'Regression' },
                      { id: 'repression', label: 'Repression' },
                      { id: 'displacement', label: 'Displacement' },
                      { id: 'sublimation', label: 'Sublimation' },
                    ].map((d) => (
                      <motion.button
                        key={d.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedDefense(d.id);
                          audioManager.play('tap');
                        }}
                        className={`p-2 rounded-xl text-xs font-bold transition-all text-center ${
                          selectedDefense === d.id
                            ? d.id === 'sublimation'
                              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                              : 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {d.label}
                      </motion.button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedDefense}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2"
                    >
                      {selectedDefense === 'sublimation' && (
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-700 text-[10px] font-bold rounded">Mature & Adaptive</span>
                            <h4 className="font-bold text-emerald-300 text-sm">Sublimation</h4>
                          </div>
                          <p className="text-xs text-slate-300 mt-1">Channelling unacceptable aggressive or forbidden drives into constructive, socially valued achievements (e.g. state kabaddi medals or classical painting).</p>
                        </div>
                      )}
                      {selectedDefense === 'projection' && (
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-rose-950 text-rose-400 border border-rose-700 text-[10px] font-bold rounded">Reality Distortion</span>
                            <h4 className="font-bold text-rose-300 text-sm">Projection</h4>
                          </div>
                          <p className="text-xs text-slate-300 mt-1">Attributing one\'s own unacceptable impulses or feelings onto others (e.g. a student jealous of a peer accusing the peer of being envious).</p>
                        </div>
                      )}
                      {selectedDefense === 'displacement' && (
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-rose-950 text-rose-400 border border-rose-700 text-[10px] font-bold rounded">Target Shift</span>
                            <h4 className="font-bold text-rose-300 text-sm">Displacement</h4>
                          </div>
                          <p className="text-xs text-slate-300 mt-1">Redirecting emotional aggression from a dangerous source (scolding teacher) onto a powerless, safer substitute (younger sibling at home).</p>
                        </div>
                      )}
                      {selectedDefense === 'rationalization' && (
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-amber-950 text-amber-400 border border-amber-700 text-[10px] font-bold rounded">Cognitive Excuse</span>
                            <h4 className="font-bold text-amber-300 text-sm">Rationalization</h4>
                          </div>
                          <p className="text-xs text-slate-300 mt-1">Inventing plausible, socially acceptable false reasons to justify failure or unacceptable behavior ("The board paper was out of syllabus").</p>
                        </div>
                      )}
                      {selectedDefense === 'reaction_formation' && (
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-amber-950 text-amber-400 border border-amber-700 text-[10px] font-bold rounded">Polar Opposite</span>
                            <h4 className="font-bold text-amber-300 text-sm">Reaction Formation</h4>
                          </div>
                          <p className="text-xs text-slate-300 mt-1">Behaving in a way that is diametrically opposite to genuine, anxiety-provoking impulses (e.g. excessive exaggerated sweetness masking deep resentment).</p>
                        </div>
                      )}
                      {selectedDefense === 'regression' && (
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-rose-950 text-rose-400 border border-rose-700 text-[10px] font-bold rounded">Developmental Retreat</span>
                            <h4 className="font-bold text-rose-300 text-sm">Regression</h4>
                          </div>
                          <p className="text-xs text-slate-300 mt-1">Retreating to earlier developmental stages under stress (e.g. an 18-year-old thumb-sucking or throwing toddler tantrums after exam failure).</p>
                        </div>
                      )}
                      {selectedDefense === 'repression' && (
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-rose-950 text-rose-400 border border-rose-700 text-[10px] font-bold rounded">Primary Foundation</span>
                            <h4 className="font-bold text-rose-300 text-sm">Repression</h4>
                          </div>
                          <p className="text-xs text-slate-300 mt-1">The fundamental, unconscious banishment of painful memories or threatening urges outside conscious awareness (not deliberate suppression).</p>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              {/* ─── STEP 4: BRAIN EXPLORER & SCHIZOPHRENIA ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { id: 'prefrontal', label: 'Prefrontal Cortex', role: 'Executive Control & Negative Symptoms' },
                      { id: 'amygdala', label: 'Amygdala & Limbic', role: 'Fear, Threat & Positive Symptoms' },
                      { id: 'ventricles', label: 'Brain Ventricles', role: 'Enlargement in Schizophrenia' },
                    ].map((b) => (
                      <motion.button
                        key={b.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedBrainRegion(b.id);
                          audioManager.play('tap');
                        }}
                        className={`p-3 text-left rounded-xl border transition-all ${
                          selectedBrainRegion === b.id
                            ? 'bg-purple-950 border-purple-500 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <strong className="block text-xs text-purple-300">{b.label}</strong>
                        <span className="text-[11px] text-slate-400">{b.role}</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center gap-4">
                    {/* Interactive SVG Brain Diagram */}
                    <div className="w-full md:w-1/2 flex justify-center">
                      <svg viewBox="0 0 300 200" className="w-64 h-44">
                        {/* Brain Outline */}
                        <path
                          d="M 50 120 C 30 70 80 20 150 20 C 220 20 270 60 260 120 C 255 150 210 170 170 165 C 150 185 110 185 90 160 C 60 160 40 140 50 120 Z"
                          fill="#1e1b4b"
                          stroke="#6366f1"
                          strokeWidth="2.5"
                        />

                        {/* Prefrontal Region */}
                        <path
                          d="M 50 120 C 40 80 80 30 130 30 L 120 120 Z"
                          fill={selectedBrainRegion === 'prefrontal' ? '#a855f7' : '#312e81'}
                          opacity={selectedBrainRegion === 'prefrontal' ? 0.9 : 0.4}
                          className="cursor-pointer transition-colors"
                          onClick={() => setSelectedBrainRegion('prefrontal')}
                        />
                        <text x="75" y="80" fill="#fff" fontSize="8" fontWeight="bold">PFC</text>

                        {/* Amygdala & Limbic Region */}
                        <circle
                          cx="150"
                          cy="110"
                          r="20"
                          fill={selectedBrainRegion === 'amygdala' ? '#ef4444' : '#4c1d95'}
                          opacity={selectedBrainRegion === 'amygdala' ? 0.9 : 0.5}
                          className="cursor-pointer transition-colors"
                          onClick={() => setSelectedBrainRegion('amygdala')}
                        />
                        <text x="135" y="113" fill="#fff" fontSize="7" fontWeight="bold">Amygdala</text>

                        {/* Ventricles */}
                        <path
                          d="M 140 70 Q 180 60 190 90 Q 170 110 140 70 Z"
                          fill={selectedBrainRegion === 'ventricles' ? '#06b6d4' : '#1e293b'}
                          opacity={selectedBrainRegion === 'ventricles' ? 0.9 : 0.5}
                          className="cursor-pointer transition-colors"
                          onClick={() => setSelectedBrainRegion('ventricles')}
                        />
                        <text x="155" y="85" fill="#fff" fontSize="7">Ventricle</text>
                      </svg>
                    </div>

                    {/* Regional Data */}
                    <div className="w-full md:w-1/2 text-xs space-y-2">
                      <span className="text-purple-400 font-bold uppercase tracking-wider text-[10px]">Biological Mechanism</span>
                      {selectedBrainRegion === 'prefrontal' && (
                        <p className="text-slate-300">
                          <strong>Prefrontal Cortex (PFC):</strong> Hypofrontality (low mesocortical dopamine) causes executive collapse and negative symptoms: <em className="text-purple-300">Avolition, Alogia, Anhedonia</em>.
                        </p>
                      )}
                      {selectedBrainRegion === 'amygdala' && (
                        <p className="text-slate-300">
                          <strong>Amygdala & Limbic Axis:</strong> Hyperactivity in mesolimbic dopamine triggers aberrant salience, producing <em className="text-rose-300">Delusions of reference and Auditory Hallucinations</em>.
                        </p>
                      )}
                      {selectedBrainRegion === 'ventricles' && (
                        <p className="text-slate-300">
                          <strong>Lateral Ventricles:</strong> NIMHANS neuroimaging demonstrates bilateral ventricular enlargement in chronic schizophrenia due to cortical tissue atrophy.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Explore Footer Navigation */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('whoosh');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-500 font-semibold">{currentSlide + 1} / {EXPLORATION_STEPS.length}</span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30 flex items-center gap-1.5"
              >
                Enter Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white">Free Exploration Sandbox</h2>
              <p className="text-xs text-slate-400">Manipulate stress parameters simultaneously with no test pressure.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-purple-600/30"
            >
              Start Graded Challenges →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* GAS & Arousal Combined Sandbox */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-purple-400 block">Stress & Arousal Combined Modulator</span>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>GAS Duration ({gasDuration} d): <strong style={{ color: gasStage.color }}>{gasStage.name}</strong></span>
                  <span>Arousal: <strong>{arousalLevel}%</strong></span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={gasDuration}
                  aria-label="Sandbox Gas Duration"
                  onChange={(e) => setGasDuration(Number(e.target.value))}
                  className="w-full accent-purple-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={arousalLevel}
                  aria-label="Sandbox Arousal Level"
                  onChange={(e) => setArousalLevel(Number(e.target.value))}
                  className="w-full accent-gold-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                <p className="text-slate-300">Active Coping Hormone: <strong className="text-purple-300">{gasStage.hormone}</strong></p>
                <p className="text-slate-300">Yerkes-Dodson Output: <strong className="text-emerald-300">{performanceScore}% Academic Efficiency</strong></p>
              </div>
            </div>

            {/* Neurotransmitter & Defense Simulator */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-gold-400 block">Dopamine & Ego Defense Simulator</span>
              <div className="flex items-center justify-between text-xs">
                <span>Mesolimbic Dopamine: <strong className="text-gold-400">{dopamineLevel}%</strong></span>
                <span className="text-[11px] text-slate-400">{dopamineLevel > 70 ? 'Psychotic Hallucinations' : dopamineLevel < 30 ? 'Parkinsonian / Anhedonia' : 'Normal Homeostasis'}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={dopamineLevel}
                aria-label="Sandbox Dopamine Level"
                onChange={(e) => setDopamineLevel(Number(e.target.value))}
                className="w-full accent-gold-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setSelectedDefense('sublimation')}
                  className={`p-2 rounded-lg font-bold ${selectedDefense === 'sublimation' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                >
                  Sublimation (Sport)
                </button>
                <button
                  onClick={() => setSelectedDefense('projection')}
                  className={`p-2 rounded-lg font-bold ${selectedDefense === 'projection' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                >
                  Projection (Envy)
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {/* Challenge Top Meta Bar */}
          <div className="flex flex-wrap items-center justify-between p-3.5 bg-slate-900 rounded-2xl border border-slate-800 gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-2.5 py-0.5 rounded-md text-[10px] font-black tracking-wider uppercase ${
                  difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' :
                  difficulty === 'advanced' ? 'bg-rose-950 text-rose-400 border border-rose-700' :
                  'bg-gold-950 text-gold-400 border border-gold-700'
                }`}
              >
                {difficulty}
              </motion.span>
              <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[10px] font-semibold uppercase">
                NEP: {challenge.competencyLevel}
              </span>
            </div>

            <span className="text-xs font-bold text-slate-300">
              Score: {scoreBreakdown.correct} / {scoreBreakdown.total}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 via-gold-500 to-gold-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* ─── CHALLENGE BODY ─── */}
          <div className={`p-5 md:p-6 rounded-2xl border transition-all ${
            wrongFlash
              ? 'bg-rose-950/60 border-rose-500'
              : 'bg-slate-900 border-slate-800'
          }`}>
            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">
              {challenge.question}
            </h3>

            {/* MCQ Types (Classify, Distinguish, Match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.35 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-3.5 rounded-xl text-xs md:text-sm font-medium transition-all flex items-start gap-3 ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                        : wrongFlash && i !== challenge.correctIndex
                        ? 'bg-rose-950/40 border border-rose-800/60 text-slate-400'
                        : 'bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 hover:border-purple-500'
                    }`}
                  >
                    <span className="font-bold text-purple-400 shrink-0">{String.fromCharCode(65 + i)}.</span>
                    <span>{opt}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag Label Diagram Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag each label into the matching box below:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-purple-700 text-white rounded-lg cursor-grab text-xs font-bold shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { targetId: 'target_psych', scenario: 'Torn between IIT-JEE parental expectation & own desire to study literature' },
                    { targetId: 'target_phys', scenario: 'Agricultural field labour in 45°C Punjab summer with dengue fever' },
                    { targetId: 'target_env', scenario: 'Chronic Mumbai metropolitan traffic noise, crowding, and air smog' },
                  ].map((target) => (
                    <div
                      key={target.targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.targetId)}
                      className="p-3.5 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col justify-between min-h-[110px]"
                    >
                      <p className="text-[11px] text-slate-400 italic mb-2">"{target.scenario}"</p>
                      <div className="p-2 bg-slate-900 rounded-lg text-center font-bold text-xs text-purple-300">
                        {droppedLabels[target.targetId] || 'Drop Category Here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-xs shadow-md shadow-purple-600/30"
                >
                  Verify Mappings →
                </motion.button>
              </div>
            )}

            {/* Drag Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400">Drag to arrange in correct hierarchical or temporal order:</span>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs font-semibold text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span>{displayIdx + 1}. {item}</span>
                      <span className="text-slate-500 text-xs">↕ Drag</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-xs shadow-md shadow-purple-600/30"
                >
                  Check Sequence →
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    aria-label="Enter numeric percentage answer"
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter percentage value"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm w-44"
                  />
                  <span className="text-slate-400 text-sm font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-xs shadow-md shadow-purple-600/30"
                  >
                    Submit Value →
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 block">{challenge.validationHint}</span>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setConstructParts(prev => [...prev, part]);
                        audioManager.play('tap');
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-bold text-purple-300"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1 bg-purple-900 border border-purple-600 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 ml-1"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500 italic">Click the components above to construct the 3 Cs...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-xs shadow-md shadow-purple-600/30"
                >
                  Validate Construct →
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-slate-950 rounded-xl border border-purple-800/80 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Clinical & Syllabus Rationale</span>
                  <span className="text-[11px] text-slate-500">Step {revealedSteps + 1} of {challenge.explanation.split('. ').filter(s => s.trim()).length}</span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <strong className="text-purple-400">{i + 1}.</strong> {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex justify-between items-center pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim()).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setRevealedSteps(s => s + 1);
                        audioManager.play('tap');
                      }}
                      className="px-3 py-1.5 bg-purple-950 border border-purple-700 text-purple-300 rounded-lg text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <div />
                  )}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim()).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & MASTERY SUMMARY PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-purple-950/80 via-slate-900 to-gold-950/80 rounded-3xl border border-purple-700 text-center space-y-2">
            <span className="text-4xl">🎓</span>
            <h2 className="text-2xl font-black text-white">ISC Psychology Mastery Achieved!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              Final Score: <strong className="text-emerald-400">{Math.max(0, 100 - errors * 5)}%</strong> | Mastery Level: <strong className="text-purple-300 uppercase">{masteryLevel}</strong>
            </p>
          </div>

          {/* MOTIVATIONAL FEEDBACK */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 text-xs md:text-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {errors === 0 ? '🏆' : errors <= 3 ? '🌟' : errors <= 7 ? '💪' : '🎯'}
              </span>
              <h3 className="text-base font-black text-purple-300">
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors >= 1 && errors <= 3
                  ? 'Great work!'
                  : errors >= 4 && errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {errors === 0
                ? 'Flawless mastery! You demonstrated complete conceptual and clinical precision across GAS stages, Lazarus appraisals, Yerkes-Dodson, defense styles, and DSM-IV psychopathology.'
                : errors <= 3
                ? 'You have a solid grasp of ISC Psychology. Re-examine the few misconception points below to guarantee a perfect board score.'
                : errors <= 7
                ? 'Good learning curve! You tackled rigorous clinical scenarios. Review the specific diagnostic cards below to cement your understanding.'
                : 'Keep practicing and reviewing the concepts. With steady effort and revision, you will master every clinical concept!'}
            </p>
          </div>

          {/* REFLECTION QUESTIONS SECTION */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4 text-xs md:text-sm">
            <h3 className="font-bold text-purple-300 text-sm flex items-center gap-2">
              <span>💭</span> Reflection & Critical Thinking
            </h3>
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <p className="font-semibold text-purple-300">1. What was the most surprising thing you learned?</p>
                <textarea
                  placeholder="Reflect on physiological responses, defense mechanisms, or clinical diagnosis..."
                  className="w-full mt-1 p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-purple-500 resize-none"
                  rows={2}
                />
              </div>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <p className="font-semibold text-purple-300">2. How would you explain this to a friend?</p>
                <textarea
                  placeholder="Explain eustress vs distress, or Lazarus appraisal in simple everyday terms..."
                  className="w-full mt-1 p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-purple-500 resize-none"
                  rows={2}
                />
              </div>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <p className="font-semibold text-purple-300">3. Where in real life might you use this?</p>
                <textarea
                  placeholder="Think about managing your board exam stress, sports anxiety, or supporting a peer..."
                  className="w-full mt-1 p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-purple-500 resize-none"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Misconception Review Card */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
              <h3 className="text-xs font-bold text-rose-300 uppercase tracking-widest">
                Targeted Misconception Corrections ({hitMisconceptions.length} Identified):
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-400 font-semibold mt-1">✓ Clinical Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition (SM-2) Schedule */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-amber-400 uppercase tracking-wider block">SM-2 Spaced Repetition Schedule</span>
              <p className="text-slate-400 mt-0.5">
                Next review recommended in <strong className="text-white">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> to ensure long-term memory consolidation for ISC Boards.
              </p>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Real-World Activity Arc */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <h3 className="font-bold text-purple-300 text-sm flex items-center gap-2">
              <span>📋</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-slate-400 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1 text-slate-300 pl-4 list-disc pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Clinical Milestone Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_PsychologyMeaningStressNatureSim;