'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (ISC Class 12 Psychology Syllabus) ───
const NODE_C12_PSY_031 = 'c12_psy_031';
const NODE_C12_PSY_032 = 'c12_psy_032';
const NODE_C12_PSY_033 = 'c12_psy_033';
const NODE_C12_PSY_034 = 'c12_psy_034';
const NODE_C12_PSY_035 = 'c12_psy_035';
const NODE_C12_PSY_036 = 'c12_psy_036';
const NODE_C12_PSY_037 = 'c12_psy_037';
const NODE_C12_PSY_038 = 'c12_psy_038';
const NODE_C12_PSY_039 = 'c12_psy_039';
const NODE_C12_PSY_040 = 'c12_psy_040';
const NODE_C12_PSY_041 = 'c12_psy_041';

const ALL_NODE_IDS = [
  NODE_C12_PSY_031,
  NODE_C12_PSY_032,
  NODE_C12_PSY_033,
  NODE_C12_PSY_034,
  NODE_C12_PSY_035,
  NODE_C12_PSY_036,
  NODE_C12_PSY_037,
  NODE_C12_PSY_038,
  NODE_C12_PSY_039,
  NODE_C12_PSY_040,
  NODE_C12_PSY_041,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The National Clinical & Social Psychology Lab',
  intro: 'Welcome to the NIMHANS & AIIMS Integrated Psychological Simulation Suite. You are appointed as lead trainee clinical researcher evaluating human behaviour across psychotherapeutic dynamics, social attribution biases, obedience under authority, attitude formation, and socio-environmental stressors in India.',
  context: 'Investigate human cognition from Freud’s couch and Carl Rogers’ non-directive empathy to Kelley’s attribution cube, Milgram’s shock apparatus, and environmental deprivation paradigms.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In Stanley Milgram’s landmark obedience experiment, what percentage of ordinary participants administered the maximum 450-volt electric shock when ordered by an authority in a lab coat?',
  options: [
    'Less than 1% (only pathological or sadistic individuals)',
    'Around 15% (primarily weak-willed individuals)',
    'Approximately 65% (the vast majority of ordinary citizens)',
    'Exactly 100% (everyone complied blindly without hesitation)',
  ],
  correctIndex: 2,
  hintAfter: 'Surprising, isn’t it? Almost everyone—even leading psychiatrists—predicted under 1%, yet about 65% went all the way due to perceived authority and agentic shift. Let us explore the mind!',
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
  bloomLevel?: string;
}

// ─── CHALLENGES ARRAY (22 Comprehensive Challenges covering all 11 nodes) ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_psy_001',
    nodeId: NODE_C12_PSY_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In psychodynamic therapy, when a patient redirects unresolved childhood feelings about a parent onto the therapist, this phenomenon is termed:',
    options: ['Counter-transference', 'Transference', 'Free Association', 'Resistance'],
    correctIndex: 1,
    explanation: 'Transference is the patient redirecting feelings about significant past figures onto the therapist. Counter-transference refers to the therapist emotional reaction towards the patient.',
    hints: [
      'Focus on the direction of feelings: it travels FROM the patient TO the therapist.',
      'Remember the prefix "trans-" signifies the patient transferring emotional baggage.',
      'The therapist own reaction would be counter-transference; here the patient is projecting.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_psy_002',
    nodeId: NODE_C12_PSY_031,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match Carl Rogers’ three core therapeutic conditions and his core premise to their diagnostic definitions.',
    dragItems: [
      { label: 'Unconditional Positive Regard', targetId: 'box_accept' },
      { label: 'Empathy', targetId: 'box_internal' },
      { label: 'Genuineness (Congruence)', targetId: 'box_authentic' },
      { label: 'Actualising Tendency', targetId: 'box_growth' },
    ],
    correctMapping: {
      box_accept: 'Unconditional Positive Regard',
      box_internal: 'Empathy',
      box_authentic: 'Genuineness (Congruence)',
      box_growth: 'Actualising Tendency',
    },
    explanation: 'Rogers founded Person-Centred Therapy on the actualising tendency, nurtured by non-judgemental positive regard, accurate empathetic understanding, and authentic congruence.',
    hints: [
      'Accepting the client without any judgement is positive regard.',
      'Entering the client internal frame of reference "as if" it were your own is empathy.',
      'Being authentic without wearing a professional mask is congruence.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_psy_003',
    nodeId: NODE_C12_PSY_032,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A clinician at NIMHANS works with an engineering student with severe dog phobia. Instead of sudden total immersion, she teaches deep muscle relaxation and ascends a 10-step fear hierarchy. This technique is:',
    options: [
      'Flooding (Classical Conditioning)',
      'Systematic Desensitization (Wolpe)',
      'Token Economy (Operant Conditioning)',
      'Aversive Conditioning',
    ],
    correctIndex: 1,
    explanation: 'Joseph Wolpe systematic desensitization pairs progressive relaxation with a graded anxiety hierarchy through reciprocal inhibition. Flooding uses immediate maximum exposure without relaxation.',
    hints: [
      'Notice the stepped ladder (hierarchy) combined with relaxation training.',
      'Flooding throws the patient directly into the highest fear situation.',
      'Wolpe developed this gradual counter-conditioning method.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_psy_004',
    nodeId: NODE_C12_PSY_032,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Assemble Albert Ellis’ Rational Emotive Behaviour Therapy (REBT) clinical sequence in correct theoretical order:',
    availableParts: ['A: Activating Event', 'B: Irrational Belief', 'C: Emotional Consequence', 'D: Disputing Beliefs', 'E: Effective New Philosophy'],
    targetState: 'A: Activating Event B: Irrational Belief C: Emotional Consequence D: Disputing Beliefs E: Effective New Philosophy',
    validationHint: 'Click the parts from Activating Event (A) through to Effective Philosophy (E).',
    explanation: 'Ellis ABC-DE model shows that an Activating Event triggers an Irrational Belief, which causes emotional distress (Consequence). The therapist Disputes (D) the belief to form an Effective new philosophy (E).',
    hints: [
      'Start with the triggering event A.',
      'The belief B mediates the emotional consequence C.',
      'Finish with therapeutic disputation D and new philosophy E.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_psy_005',
    nodeId: NODE_C12_PSY_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'According to Harold Kelley’s Attribution Theory, an observer makes an EXTERNAL (situational) attribution when:',
    options: [
      'Consensus is High, Consistency is High, Distinctiveness is High',
      'Consensus is Low, Consistency is High, Distinctiveness is Low',
      'Consensus is High, Consistency is Low, Distinctiveness is Low',
      'Consensus is Low, Consistency is Low, Distinctiveness is High',
    ],
    correctIndex: 0,
    explanation: 'When everyone acts similarly (high consensus), the person always acts so in this situation (high consistency), and only acts this way in this specific situation (high distinctiveness), cause is situational/external.',
    hints: [
      'If everyone in class fails a test (high consensus) and Riya only fails this specific subject (high distinctiveness), is it Riya or the test?',
      'High consensus + high distinctiveness points outward to the external task.',
      'Internal attribution happens when consensus and distinctiveness are both LOW.',
    ],
  },
  {
    id: 'ch_psy_006',
    nodeId: NODE_C12_PSY_033,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Rohan scores 98% in Psychology and declares "I am naturally brilliant," but scores 42% in Economics and claims "the examiner set an unfair paper." Rohan is exhibiting:',
    options: [
      'False Consensus Effect',
      'Self-Serving Bias',
      'Automatic Vigilance',
      'Fundamental Actor-Observer Blindness',
    ],
    correctIndex: 1,
    explanation: 'Self-serving bias is the cognitive asymmetry of attributing successes to internal factors (ability, intellect) and failures to external situational factors (unfair examiner, bad luck).',
    hints: [
      'Look at the ego-protecting asymmetry between success and failure.',
      'Crediting oneself for success while blaming outer circumstances for failure.',
      'This bias protects subjective self-esteem.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_psy_007',
    nodeId: NODE_C12_PSY_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following constitutes a PRIMARY group in Indian society?',
    options: [
      'Members of the Indian Psychiatric Society',
      'A traditional joint family in Lucknow sharing emotional bonds',
      'Passengers travelling in the Mumbai Churchgate local train',
      'Delegates attending an academic national psychology conference',
    ],
    correctIndex: 1,
    explanation: 'Primary groups (e.g. joint family, intimate peer circle) are characterised by close, face-to-face, enduring emotional bonds. Professional bodies are secondary; train crowds are aggregates.',
    hints: [
      'Primary groups involve intimate, lifelong emotional interdependence.',
      'Think of Charles Cooley definition of small, face-to-face primary associations.',
      'A family or childhood peer circle is the classic primary group.',
    ],
  },
  {
    id: 'ch_psy_008',
    nodeId: NODE_C12_PSY_034,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'In Solomon Asch’s classic 1951 line-judgement conformity experiment, what percentage of naive participants conformed to the unanimous incorrect majority on at least one trial?',
    correctAnswer: 75,
    tolerance: 2,
    unit: '%',
    explanation: 'Approximately 75% of participants conformed to the clearly incorrect confederate majority on at least one critical trial, showing the immense power of normative and informational social influence.',
    hints: [
      'It is three-quarters of the total participant pool.',
      'Enter an integer percentage between 70 and 80.',
      'The exact historical figure documented is 75%.',
    ],
  },
  {
    id: 'ch_psy_009',
    nodeId: NODE_C12_PSY_035,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange Milgram’s experimental variations in order from HIGHEST obedience to LOWEST obedience (% reaching 450V):',
    sortItems: [
      'Baseline (Experimenter present in lab coat, learner in adjacent room)',
      'Victim in same room (Visible learner)',
      'Teacher touches learner hand directly on shock plate',
      'Experimenter gives commands via telephone from another location',
      'Two rebellious confederate teachers refuse and walk out',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Obedience was highest at Baseline (65%), dropped when learner was in same room (40%), touched on plate (30%), experimenter on phone (20.5%), and lowest when peers rebelled (~10%).',
    hints: [
      'Physical proximity to the victim decreases obedience; physical proximity of authority increases it.',
      'Rebellious peers provide the strongest counter-normative influence, dropping obedience to ~10%.',
      'Standard lab baseline is the highest at 65%.',
    ],
  },
  {
    id: 'ch_psy_010',
    nodeId: NODE_C12_PSY_035,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Milgram described the psychological state where an individual sees oneself as an instrument for carrying out another person’s wishes, abandoning personal moral agency, as:',
    options: [
      'Autonomous state',
      'Agentic shift',
      'Deindividuation',
      'Cognitive dissonance',
    ],
    correctIndex: 1,
    explanation: 'The agentic shift is the transition from an autonomous state (taking personal responsibility) to an agentic state where the individual views themselves merely as an agent executing authority orders.',
    hints: [
      'The individual shifts into being an "agent" of authority.',
      'Responsibility is mentally diffused onto the experimenter.',
      'Milgram termed this transition the "agentic shift".',
    ],
  },
  {
    id: 'ch_psy_011',
    nodeId: NODE_C12_PSY_036,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Label the ABC components of a Chennai college student’s attitude towards the Swachh Bharat cleanliness mission.',
    dragItems: [
      { label: 'Affective (Emotion: Pride & Joy)', targetId: 'slot_a' },
      { label: 'Behavioural / Conative (Action: Volunteering in cleanups)', targetId: 'slot_b' },
      { label: 'Cognitive (Belief: Cleanliness prevents epidemics)', targetId: 'slot_c' },
    ],
    correctMapping: {
      slot_a: 'Affective (Emotion: Pride & Joy)',
      slot_b: 'Behavioural / Conative (Action: Volunteering in cleanups)',
      slot_c: 'Cognitive (Belief: Cleanliness prevents epidemics)',
    },
    explanation: 'Every attitude has an Affective (emotional), Behavioural (conative/action intention), and Cognitive (factual belief/schema) component.',
    hints: [
      'A is Affect (feelings of pride/disgust).',
      'B is Behavioural intention (participating, signing petitions).',
      'C is Cognitive evaluation (factual knowledge and beliefs).',
    ],
  },
  {
    id: 'ch_psy_012',
    nodeId: NODE_C12_PSY_036,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Mumbai student knows smoking causes severe lung damage, yet smokes daily. To relieve the psychological discomfort, he tells himself "My grandfather smoked bidis and lived to 92." He resolved cognitive dissonance by:',
    options: [
      'Changing his behaviour directly',
      'Adding a consonant cognition to justify inconsistency',
      'Undergoing systematic desensitization',
      'Engaging in client-centred self-actualisation',
    ],
    correctIndex: 1,
    explanation: 'Leon Festinger explained that cognitive dissonance can be reduced by: (1) changing behaviour, (2) altering the dissonant cognition, or (3) adding new consonant cognitions that rationalise the behaviour.',
    hints: [
      'Did he stop smoking (change behaviour)? No.',
      'He added a new comforting thought about his grandfather.',
      'This is termed adding consonant cognitions in Festinger’s theory.',
    ],
  },
  {
    id: 'ch_psy_013',
    nodeId: NODE_C12_PSY_037,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the precise psychological distinction between prejudice and discrimination?',
    options: [
      'Prejudice is the internal negative attitude; discrimination is the overt unfair behaviour',
      'Prejudice is behaviour against an outgroup; discrimination is internal feeling',
      'Prejudice is always based on caste; discrimination is only based on gender',
      'Prejudice is inborn; discrimination is learned through classical conditioning',
    ],
    correctIndex: 0,
    explanation: 'Prejudice is an internal evaluative attitude (affective hostility + cognitive stereotype); discrimination is the observable, behavioural execution of unfair treatment.',
    hints: [
      'Prejudice lives inside the mind and heart (attitude).',
      'Discrimination happens through actions, laws, and hands (behaviour).',
      'One can hold prejudice without discriminating if laws prevent overt acts.',
    ],
  },
  {
    id: 'ch_psy_014',
    nodeId: NODE_C12_PSY_037,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In Muzafer Sherif’s classic Robbers Cave experiment, what intervention successfully resolved intergroup hostility between the Rattlers and Eagles?',
    options: [
      'Holding joint moral lectures by camp leaders',
      'Introducing superordinate goals requiring cooperative interdependence',
      'Placing both groups in passive dining contact without shared tasks',
      'Offering monetary incentives to the highest-performing boy',
    ],
    correctIndex: 1,
    explanation: 'Superordinate goals—objectives that both groups value but cannot achieve without mutual cooperation (e.g. fixing the water tank)—dismantled hostility and outgroup derogation.',
    hints: [
      'Simply eating in the same dining hall (mere contact) actually increased food fights!',
      'They had to work together on a shared problem like fixing the broken water supply.',
      'Sherif termed these shared critical tasks "superordinate goals".',
    ],
  },
  {
    id: 'ch_psy_015',
    nodeId: NODE_C12_PSY_038,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A student from a flood-devastated Assam village tells a counsellor: "I lost my house and family notes." The counsellor replies: "I feel so terribly sorry and sad for you, poor thing." This response represents:',
    options: [
      'Accurate Empathy (entering client frame "as if")',
      'Sympathy (emotional pity that blurs boundaries and centres helper emotion)',
      'Unconditional Positive Regard',
      'Socratic Disputation',
    ],
    correctIndex: 1,
    explanation: 'Sympathy is feeling sorry/pity for the client, which centres the helper emotion and can be disempowering. Empathy understands the client internal world "as if" it were one own without losing boundaries.',
    hints: [
      'Notice the phrase "poor thing" and focus on feeling pity.',
      'Sympathy expresses pity; empathy reflects understanding of the client internal experience.',
      'Rogers emphasized empathy retains the vital "as if" objective boundary.',
    ],
  },
  {
    id: 'ch_psy_016',
    nodeId: NODE_C12_PSY_038,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In the Indian cultural context, when an adolescent expresses emotional distress primarily through somatic complaints ("my chest feels heavy and I cannot digest food"), the counsellor must:',
    options: [
      'Immediately dismiss the complaints as malingering',
      'Listen for cultural-somatic metaphors of distress and explore systemic family pressures',
      'Force the client to take an MMPI test before speaking',
      'Instruct the parents to punish the child for non-compliance',
    ],
    correctIndex: 1,
    explanation: 'In collectivist Indian settings, distress is frequently somatised due to cultural norms around emotional restraint. Culturally competent counsellors read somatic idioms of distress.',
    hints: [
      'In Indian joint families, emotional pain is often expressed through bodily complaints.',
      'The counsellor role is to decode the emotional meaning behind physical metaphors.',
      'Respecting cultural idioms of distress is mandated in Indian clinical psychology.',
    ],
  },
  {
    id: 'ch_psy_017',
    nodeId: NODE_C12_PSY_039,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the precise psychological distinction between DENSITY and CROWDING?',
    options: [
      'Density is physical/objective (people per area); Crowding is subjective psychological distress',
      'Density is subjective feeling; Crowding is mathematical count',
      'Density applies only to rural India; Crowding applies only to Mumbai',
      'There is no difference; they are interchangeable scientific terms',
    ],
    correctIndex: 0,
    explanation: 'Density is the objective physical count of persons per unit area. Crowding is the subjective, experiential feeling of spatial restriction, lack of control, and stress.',
    hints: [
      'Think of devotees packed in a temple: high density, but joyful (low crowding distress).',
      'Density is measured with numbers; crowding is measured through psychological discomfort.',
      'S.K. Mangal highlights that crowding occurs when density crosses personal coping thresholds.',
    ],
  },
  {
    id: 'ch_psy_018',
    nodeId: NODE_C12_PSY_039,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'Which of the following is NOT one of the four core DSM-5 symptom clusters of Post-Traumatic Stress Disorder (PTSD) following a disaster?',
    options: [
      'Intrusive re-experiencing (flashbacks, nightmares)',
      'Persistent avoidance of trauma-related stimuli',
      'Hyperarousal and heightened reactivity',
      'Manic grandiosity and flight of ideas',
    ],
    correctIndex: 3,
    explanation: 'PTSD clusters comprise: (1) Intrusion, (2) Avoidance, (3) Negative alterations in cognition/mood, and (4) Hyperarousal/reactivity. Mania is a bipolar disorder symptom.',
    hints: [
      'PTSD involves fear, avoidance, nightmares, and startled nervousness.',
      'Grandiosity and excessive euphoria belong to Bipolar Mania, not PTSD trauma response.',
      'NIMHANS disaster interventions specifically screen for intrusion, avoidance, and hyperarousal.',
    ],
  },
  {
    id: 'ch_psy_020',
    nodeId: NODE_C12_PSY_040,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Construct a 3-tier psychologically sustained community waste management workflow for an Indian municipality:',
    availableParts: ['1. Source Segregation (Wet/Dry/Hazardous)', '2. Household Composting & SWaCH Cooperative Recycling', '3. Social Reinforcement & Green Badge Recognition'],
    targetState: '1. Source Segregation (Wet/Dry/Hazardous) 2. Household Composting & SWaCH Cooperative Recycling 3. Social Reinforcement & Green Badge Recognition',
    validationHint: 'Select the steps in chronological order: Segregation -> Community Recycling -> Reinforcement.',
    explanation: 'Sustained garbage management pairs primary behavioural source segregation with cooperative circular processing (SWaCH Pune model) and social norm reinforcement.',
    hints: [
      'Start with separation at source.',
      'Next is cooperative processing and composting.',
      'Sustain behaviour with positive social recognition and rewards.',
    ],
  },
  {
    id: 'ch_psy_021',
    nodeId: NODE_C12_PSY_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'According to Amartya Sen and S.K. Mangal, why does chronic poverty lower McClelland’s need for achievement (nAch)?',
    options: [
      'Poor individuals lack biological genes for intelligence',
      'Repeated uncontrollable deprivation produces learned helplessness and unmet safety needs',
      'Poverty automatically boosts intrinsic artistic motivation',
      'Poverty makes people avoid all social contact completely',
    ],
    correctIndex: 1,
    explanation: 'In Maslow’s hierarchy, when physiological and safety needs are perpetually threatened, higher esteem and achievement drives cannot emerge. Chronic failure fosters learned helplessness.',
    hints: [
      'Recall Maslow: survival needs must be met before self-actualisation and high nAch.',
      'When effort repeatedly fails to produce food or shelter, people learn that effort is futile.',
      'Amartya Sen defines this as capability deprivation.',
    ],
  },
  {
    id: 'ch_psy_022',
    nodeId: NODE_C12_PSY_041,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'The National Mental Health Survey (NIMHANS 2015-16) documented that the prevalence of common mental disorders (depression, anxiety) in India’s lowest income bracket was:',
    options: [
      'Identical to the highest income bracket',
      'Nearly twice as high compared with the highest income group',
      'Zero, because rural communities experience no stress',
      'Ten times lower due to joint-family living',
    ],
    correctIndex: 1,
    explanation: 'The NMHS 2015-16 demonstrated a steep socioeconomic gradient: common mental disorders were nearly twice as prevalent among the lowest income group due to chronic environmental stress.',
    hints: [
      'Poverty acts as a severe chronic stressor elevating cortisol and mental illness risk.',
      'The NIMHANS survey found roughly a 2x higher prevalence in lowest vs highest income quintiles.',
      'This empirical finding motivated the rights-based provisions of the Mental Healthcare Act 2017.',
    ],
  },
];

// ─── DEFAULT PROPS ───
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
  nodeId: NODE_C12_PSY_031,
  title: 'Psychotherapy, Social Influence & Environmental Psychology',
  definition: 'An integrated study of clinical therapeutic systems (Freud, Rogers, Wolpe, Beck, Ellis), social thought (Kelley, Asch, Milgram), attitude formation, prejudice, counselling dynamics, and environmental stressors in India.',
  eli5: 'Explore how therapists unlock the mind, how peers and leaders shape our choices, how biases distort our thinking, and how noise, crowding, and poverty impact human well-being.',
  misconceptions: [
    { misconception: 'Transference is the therapist feelings toward the client.', correction: 'Transference is the PATIENT redirecting childhood feelings onto the therapist. Counter-transference is the therapist emotional reaction.' },
    { misconception: 'Self-serving bias means only taking credit for successes.', correction: 'Self-serving bias is the dual asymmetry: taking internal credit for success AND externally blaming circumstances for failure.' },
    { misconception: 'Client-centred therapy means giving wise advice.', correction: 'Rogers insisted the therapist must NEVER give directive advice; the client possesses the actualising tendency to discover solutions.' },
    { misconception: 'Flooding and Systematic Desensitization are the same.', correction: 'Flooding uses immediate full-strength exposure without relaxation; Systematic Desensitization uses a graded fear hierarchy paired with relaxation.' },
    { misconception: 'Density and Crowding are identical concepts.', correction: 'Density is the objective physical measurement (people per sq m); Crowding is the subjective psychological stress of feeling restricted.' },
  ],
  diagnosticQuestions: [
    { question: 'Who founded the Indian Psychoanalytic Society in Calcutta in 1922?', options: ['Girindrasekhar Bose', 'S.K. Mangal', 'A.K. Sen', 'Carl Rogers'], correctIndex: 0 },
    { question: 'What did Joseph Wolpe use to counter-condition anxiety in systematic desensitization?', options: ['Electroconvulsive shocks', 'Progressive muscle relaxation', 'Dream analysis', 'Token economy'], correctIndex: 1 },
    { question: 'High consensus, high consistency, and high distinctiveness lead to:', options: ['Internal attribution', 'External (situational) attribution', 'Fundamental attribution error', 'Self-serving bias'], correctIndex: 1 },
    { question: 'In Asch study, what happens to conformity when just ONE confederate dissents?', options: ['Conformity increases', 'Conformity drops dramatically', 'Conformity stays at 75%', 'Participants become aggressive'], correctIndex: 1 },
    { question: 'In Milgram baseline experiment, what % gave maximum 450V shocks?', options: ['1%', '10%', '65%', '100%'], correctIndex: 2 },
    { question: 'Which component of attitude represents feelings of pride or disgust?', options: ['Affective', 'Behavioural', 'Cognitive', 'Conative'], correctIndex: 0 },
    { question: 'Superordinate goals in intergroup conflict resolution require:', options: ['Individual competition', 'Cooperative interdependence for shared goals', 'Physical segregation', 'Legal punishment'], correctIndex: 1 },
    { question: 'The 2015-16 NIMHANS National Mental Health Survey revealed a mental health treatment gap of:', options: ['Under 10%', 'Over 80%', 'Exactly 25%', '50%'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery is achieved by demonstrating conceptual understanding and clinical/social application across psychotherapies, attribution biases, obedience, attitudes, and environmental psychology.',
};

// ─── EXPLORATION STEPS (Interactive Guided Discovery) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Freud’s Iceberg & Rogers’ Growth Triad',
    instruction: 'Manipulate the unconscious depth slider to reveal repressed conflicts, then observe Rogers’ core conditions.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PSY_031,
  },
  {
    title: 'Lab 2: Wolpe’s Fear Desensitization Ladder',
    instruction: 'Select an anxiety hierarchy step and increase relaxation level to observe fear extinction via reciprocal inhibition.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PSY_032,
  },
  {
    title: 'Lab 3: Kelley’s Attribution Covariation Cube',
    instruction: 'Toggle Consensus, Consistency, and Distinctiveness to see whether the brain makes an Internal or External attribution.',
    interactionType: 'toggle-cube',
    nodeId: NODE_C12_PSY_033,
  },
  {
    title: 'Lab 4: Milgram’s Shock Apparatus & Authority Prods',
    instruction: 'Adjust the voltage generator and observe teacher hesitation versus agentic shift under experimenter prods.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PSY_035,
  },
  {
    title: 'Lab 5: Festinger’s Dissonance Balance & Environmental Stress',
    instruction: 'Adjust the belief vs behaviour divergence slider to measure cognitive dissonance and urban crowding stress in real time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PSY_036,
  },
];

// ─── PREDICTION & OBSERVATION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If a participant in Wolpe’s therapy reaches relaxation level 80% while viewing a level 4 anxiety stimulus, what will happen to heart rate and panic?',
    options: [
      'Panic will spike because relaxation triggers hypervigilance',
      'Panic will extinguish because deep relaxation is physiologically incompatible with anxiety (Reciprocal Inhibition)',
      'No change; relaxation only works for depression',
      'Heart rate will double immediately',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now set the Relaxation slider above 75% on Step 4 and verify that the Fear Gauge drops to green zero!',
    nodeId: NODE_C12_PSY_032,
  },
  {
    question: 'Predict: When a single ally in Asch’s experiment dissents from the incorrect majority, conformity drops from 75% to approximately:',
    options: ['Around 65%', 'Under 10%', 'Remains exactly 75%', 'Increases to 90%'],
    correctIndex: 1,
    verifyInstruction: 'Notice how breaking unanimity shatters the normative social pressure!',
    nodeId: NODE_C12_PSY_034,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: When you switch Kelley’s Distinctiveness to HIGH and Consensus to HIGH, what happens to the causal attribution?',
    observableOptions: [
      'It points to the person internal disposition',
      'It shifts completely to the external environment / situation',
      'It becomes completely unidentifiable',
      'It creates immediate cognitive dissonance',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_PSY_033,
  },
  {
    question: 'Observation: In the Milgram simulation, as voltage passes 300V and the learner goes silent, what psychological mechanism permits the teacher to continue?',
    observableOptions: [
      'Sadistic pleasure activation in the striatum',
      'Agentic Shift: diffusing moral responsibility onto the experimenter',
      'Complete loss of auditory hearing',
      'Rational Emotive disputation',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_PSY_035,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'The NIMHANS Community Psycho-Social Case Study',
  description: 'Design a community mental-health and pro-environmental awareness initiative for your school or district. Integrate Rogers’ non-judgemental listening in peer support, identify attributional self-serving biases in exam reviews, and implement source segregation (SWaCH model) to reduce urban environmental stress.',
  steps: [
    'Establish a peer-listening circle using unconditional positive regard and active empathy without advice-giving.',
    'Conduct a weekly "Attribution Journal" to reframe academic setbacks from fatalistic causes to actionable strategies.',
    'Audit classroom noise and single-use plastic, setting up 3-bin source segregation as per Solid Waste Management Rules 2016.',
    'Present your project findings linking community mental health to the Mental Healthcare Act 2017 provisions.',
  ],
};

// ─── MAIN COMPONENT ───
function C12_PsychologyPsychotherapyPsychoanalysisClientcentredSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_PSY_031,
  title = DEFAULT_PROPS.title || 'Psychology Simulation',
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions || [],
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['psychology'] || { name: 'Psychology', emoji: '🧠', color: 'purple' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Interactive discovery hooks & predictions
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Lab State (Sliders & Toggles)
  const [unconsciousDepth, setUnconsciousDepth] = useState(30);
  const [rogersEmpathy, setRogersEmpathy] = useState(50);
  const [rogersPositiveRegard, setRogersPositiveRegard] = useState(50);
  const [rogersGenuineness, setRogersGenuineness] = useState(50);

  const [fearHierarchyStep, setFearHierarchyStep] = useState(3);
  const [relaxationLevel, setRelaxationLevel] = useState(40);

  // Kelley's Cube toggles
  const [kelleyConsensus, setKelleyConsensus] = useState<'high' | 'low'>('high');
  const [kelleyConsistency, setKelleyConsistency] = useState<'high' | 'low'>('high');
  const [kelleyDistinctiveness, setKelleyDistinctiveness] = useState<'high' | 'low'>('high');

  // Milgram simulation
  const [milgramVoltage, setMilgramVoltage] = useState(15);
  const [experimenterPresent, setExperimenterPresent] = useState(true);
  const [peerRebellion, setPeerRebellion] = useState(false);

  // Festinger Dissonance & Crowding
  const [attitudeActionGap, setAttitudeActionGap] = useState(40);
  const [urbanDensity, setUrbanDensity] = useState(60);
  const [perceivedControl, setPerceivedControl] = useState(30);

  // Challenge Adaptive Engine & State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag & Sort & Construct states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Misconception tracker
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT state ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Derived Spaced Repetition Recommendation
  const srsSchedule = useMemo(() => {
    if (errors === 0) {
      return { days: 7, label: 'Optimal Mastery Interval', intervalText: '7 Days', badgeClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-500' };
    } else if (errors <= 3) {
      return { days: 3, label: 'Moderate Consolidation Interval', intervalText: '3 Days', badgeClass: 'bg-amber-950/80 text-amber-300 border-amber-500' };
    } else {
      return { days: 1, label: 'High Priority Reinforcement Interval', intervalText: '1 Day (Tomorrow)', badgeClass: 'bg-rose-950/80 text-rose-300 border-rose-500' };
    }
  }, [errors]);

  // Derived Calculations
  const clientCongruenceScore = useMemo(() => {
    return Math.round((rogersEmpathy + rogersPositiveRegard + rogersGenuineness) / 3);
  }, [rogersEmpathy, rogersPositiveRegard, rogersGenuineness]);

  const netAnxietyLevel = useMemo(() => {
    const rawAnxiety = fearHierarchyStep * 10;
    return Math.max(0, rawAnxiety - Math.round(relaxationLevel * 0.9));
  }, [fearHierarchyStep, relaxationLevel]);

  const kelleyAttributionResult = useMemo(() => {
    if (kelleyConsensus === 'high' && kelleyConsistency === 'high' && kelleyDistinctiveness === 'high') {
      return { type: 'EXTERNAL (Situational)', explanation: 'High Consensus + High Consistency + High Distinctiveness -> The environment/task caused this.' };
    }
    if (kelleyConsensus === 'low' && kelleyConsistency === 'high' && kelleyDistinctiveness === 'low') {
      return { type: 'INTERNAL (Dispositional)', explanation: 'Low Consensus + High Consistency + Low Distinctiveness -> The individual personality caused this.' };
    }
    if (kelleyConsistency === 'low') {
      return { type: 'CIRCUMSTANTIAL (Unstable)', explanation: 'Low Consistency -> Exceptional transient circumstances.' };
    }
    return { type: 'MIXED / COMPLEX ATTRIBUTION', explanation: 'Interaction of personal traits and unique environmental context.' };
  }, [kelleyConsensus, kelleyConsistency, kelleyDistinctiveness]);

  const milgramComplianceRate = useMemo(() => {
    if (peerRebellion) return 10;
    if (!experimenterPresent) return 20;
    if (milgramVoltage <= 150) return 95;
    if (milgramVoltage <= 300) return 80;
    return 65;
  }, [peerRebellion, experimenterPresent, milgramVoltage]);

  const perceivedCrowdingStress = useMemo(() => {
    return Math.max(0, Math.min(100, Math.round(urbanDensity * 1.2 - perceivedControl * 0.8)));
  }, [urbanDensity, perceivedControl]);

  // Filter challenges by adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentChallengeItem = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adapt difficulty on BKT updates
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

  // Canvas EEG / Arousal wave animation
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

      // Background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw Psychophysiological Arousal Wave
      ctx.beginPath();
      const waveFreq = 0.05 + (netAnxietyLevel / 100) * 0.15 + (milgramVoltage / 450) * 0.1;
      const waveAmp = 5 + (netAnxietyLevel / 100) * 20 + (perceivedCrowdingStress / 100) * 15;

      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * waveFreq + frame * 0.08) * waveAmp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#818cf8');
      gradient.addColorStop(0.5, netAnxietyLevel > 40 || milgramVoltage > 300 ? '#f43f5e' : '#34d399');
      gradient.addColorStop(1, '#a855f7');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [netAnxietyLevel, milgramVoltage, perceivedCrowdingStress]);

  // Callbacks
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentChallengeItem.hints[nextLevel - 1]) {
      const hintMsg = currentChallengeItem.hints[nextLevel - 1];
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
  }, [hintCount, currentChallengeItem]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Remarkable intuition! That matches Milgram 65% baseline.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Psychology Suite. Explore each clinical and social laboratory.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter free play sandbox. Test variables without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Beginning diagnostic and competency challenges. Apply your psychological insight!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction logged. Now manipulate the lab controls to verify!');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Re-examine the covariation patterns in the simulation.');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = currentChallengeItem.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, currentChallengeItem]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = prev.length === 0 && currentChallengeItem.sortItems
        ? currentChallengeItem.sortItems.map((_, i) => i)
        : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [currentChallengeItem]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (currentChallengeItem.sortItems?.map((_, i) => i) || []);
    const isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeItem.correctOrder);
    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct sequence! You mapped the clinical and social hierarchy.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      if (hintCount < 3) showNextHint();
      else {
        setAnswerRevealed(true);
        setShowExplanation(true);
      }
    }
  }, [sortArrangement, currentChallengeItem, hintCount, showNextHint]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Mastery achieved! Congratulations on completing the ISC Psychology clinical simulation.');
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

    if (currentChallengeItem.type === 'classify' || currentChallengeItem.type === 'distinguish' || currentChallengeItem.type === 'match') {
      isCorrect = answer === currentChallengeItem.correctIndex;
    } else if (currentChallengeItem.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeItem.correctMapping);
    } else if (currentChallengeItem.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeItem.correctOrder);
    } else if (currentChallengeItem.type === 'numeric') {
      const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(num - (currentChallengeItem.correctAnswer || 0)) <= (currentChallengeItem.tolerance || 0);
    } else if (currentChallengeItem.type === 'construct') {
      isCorrect = answer === currentChallengeItem.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Spot on! Excellent psychological analysis.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(currentChallengeItem.nodeId, currentChallengeItem.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + currentChallengeItem.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + currentChallengeItem.nodeId, JSON.stringify({ score: 100, timestamp: Date.now() }));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (currentChallengeItem.misconceptionIndex !== undefined && !hitMisconceptions.includes(currentChallengeItem.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, currentChallengeItem.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us review the clinical explanation step by step.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(currentChallengeItem.nodeId, currentChallengeItem.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + currentChallengeItem.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [currentChallengeItem, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleVoltageSlider = useCallback((val: number) => {
    setMilgramVoltage(val);
    audioManager.play('count');
  }, []);

  const handleRelaxationSlider = useCallback((val: number) => {
    setRelaxationLevel(val);
    audioManager.play('balance');
  }, []);

  const handleUnconsciousSlider = useCallback((val: number) => {
    setUnconsciousDepth(val);
    audioManager.play('swoop');
  }, []);

  // Cleanup inactivity timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.header 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800"
      >
        <motion.div 
          className="flex items-center gap-3"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <motion.span 
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="text-3xl p-2.5 bg-purple-950/70 border border-purple-700/50 rounded-2xl shadow-inner cursor-pointer"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                ISC Class 12 • Psychology
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                Units 5, 6, 7 & 8
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {title}
            </h1>
          </div>
        </motion.div>

        <div className="flex items-center gap-3">
          <motion.div 
            key={difficulty}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            className={`px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider border shadow-sm ${
              difficulty === 'foundation' ? 'bg-emerald-950/70 text-emerald-300 border-emerald-700' :
              difficulty === 'advanced' ? 'bg-rose-950/70 text-rose-300 border-rose-700' :
              'bg-indigo-950/70 text-indigo-300 border-indigo-700'
            }`}
          >
            Tier: {difficulty}
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-300"
          >
            Mastery: <span className="font-bold text-purple-400 capitalize">{masteryLevel}</span>
          </motion.div>
        </div>
      </motion.header>

      {/* ─── REAL-TIME BRAIN / AROUSAL CANVAS OSCILLOSCOPE ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 p-3 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-inner"
      >
        <div className="flex items-center justify-between text-xs text-slate-400 px-2 mb-1.5 font-mono">
          <span>🧠 Psychophysiological Arousal & Cortisol Index (Real-Time Oscilloscope)</span>
          <span className={netAnxietyLevel > 50 || milgramVoltage > 300 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
            Status: {netAnxietyLevel > 50 || milgramVoltage > 300 ? 'High Sympathetic Activation' : 'Equilibrium / Regulated'}
          </span>
        </div>
        <canvas ref={canvasRef} width={800} height={40} className="w-full h-10 rounded-lg bg-slate-950" />
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.section
            key="discovery-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <motion.div 
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-900 border border-purple-800/40 rounded-3xl shadow-xl"
            >
              <span className="px-3 py-1 bg-purple-900/60 text-purple-200 text-xs font-bold rounded-full uppercase tracking-wider">
                Narrative Investigation Hook
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-3">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-2">{SCENARIO.intro}</p>
              <p className="text-xs sm:text-sm text-purple-300/90 bg-purple-950/30 p-3 rounded-xl border border-purple-900/50 mt-3 font-medium">
                🔎 {SCENARIO.context}
              </p>
            </motion.div>

            <motion.div 
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="p-6 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-4"
            >
              <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
                <span>💡 Curiosity Baseline Challenge (Ungraded)</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-white leading-snug">
                {DISCOVERY_QUESTION.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((option, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`p-4 text-left rounded-2xl text-sm font-medium transition-all border ${
                      discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : discoveryAnswered && !discoveryCorrect && i !== DISCOVERY_QUESTION.correctIndex
                        ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                        : 'bg-slate-800/90 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-purple-500'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-700/80 flex items-center justify-center text-xs font-bold text-purple-300 shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-2xl bg-purple-950/50 border border-purple-700/60 space-y-3"
                >
                  <p className="text-sm text-purple-200 leading-relaxed">
                    {discoveryCorrect ? '🎉 Remarkable! You nailed the actual 65% obedience rate.' : DISCOVERY_QUESTION.hintAfter}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-purple-900/40"
                  >
                    Enter Interactive Clinical Labs →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION LABS ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.section
            key="explore-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Slide Navigation Header */}
            <motion.div 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                  Interactive Lab Module {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h3 className="text-lg font-black text-white mt-0.5">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
              </div>
              <div className="flex gap-1.5">
                {EXPLORATION_STEPS.map((_, idx) => (
                  <motion.div
                    key={idx}
                    animate={{ width: idx === currentSlide ? 32 : 10 }}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentSlide ? 'bg-purple-500' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Main Interactive Canvas / SVG Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-5"
            >
              <p className="text-sm font-semibold text-amber-300 flex items-center gap-2">
                <span>👉 Action:</span> {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ── SLIDE 0: FREUD ICEBERG & ROGERS CONDITIONS (SVG 1) ── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <motion.div 
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-slate-950 p-4 rounded-2xl border border-slate-800"
                  >
                    <svg viewBox="0 0 400 280" className="w-full h-64 rounded-xl overflow-hidden bg-slate-950">
                      {/* Water Level */}
                      <rect x="0" y="0" width="400" height="85" fill="#0b1329" />
                      <rect x="0" y="85" width="400" height="195" fill="#0369a1" fillOpacity="0.35" />
                      <line x1="0" y1="85" x2="400" y2="85" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
                      <text x="12" y="78" fill="#38bdf8" fontSize="10" fontWeight="bold">Waterline (Conscious Boundary)</text>

                      {/* Conscious Mind (Ego & Superego top) */}
                      <polygon points="200,25 255,85 145,85" fill="#e0f2fe" opacity="0.95" />
                      <text x="200" y="60" textAnchor="middle" fill="#0369a1" fontSize="10" fontWeight="bold">Conscious (Ego)</text>

                      {/* Unconscious Submerged Mass (Id & Repressed Conflicts) */}
                      <motion.polygon
                        points={`200,85 330,${170 + unconsciousDepth} 70,${170 + unconsciousDepth}`}
                        fill="#0284c7"
                        opacity="0.85"
                      />
                      <text x="200" y="130" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Preconscious (Memories)</text>
                      <text x="200" y="200" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="black">
                        Unconscious (Id / Repressed Trauma)
                      </text>

                      {/* Dynamic Free Association Conflict Nodes */}
                      <motion.circle
                        cx="160"
                        cy={220 - (unconsciousDepth * 1.1)}
                        r="12"
                        fill="#f43f5e"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                      <text x="160" y={224 - (unconsciousDepth * 1.1)} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                        Conflict
                      </text>
                    </svg>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Freudian Unconscious Depth Probe</span>
                        <span className="font-bold text-purple-400">{unconsciousDepth}% Submerged</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={90}
                        value={unconsciousDepth}
                        onChange={(e) => handleUnconsciousSlider(Number(e.target.value))}
                        className="w-full accent-purple-500 cursor-pointer"
                        aria-label="Unconscious Depth Slider"
                      />
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800"
                  >
                    <h4 className="text-sm font-bold text-purple-300 uppercase tracking-wider">
                      Rogers’ Humanistic Triad Simulator
                    </h4>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>1. Unconditional Positive Regard</span>
                          <span className="font-bold text-emerald-400">{rogersPositiveRegard}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={rogersPositiveRegard}
                          onChange={(e) => setRogersPositiveRegard(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>2. Empathy (Internal Frame &quot;As If&quot;)</span>
                          <span className="font-bold text-sky-400">{rogersEmpathy}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={rogersEmpathy}
                          onChange={(e) => setRogersEmpathy(Number(e.target.value))}
                          className="w-full accent-sky-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>3. Genuineness / Congruence</span>
                          <span className="font-bold text-indigo-400">{rogersGenuineness}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={rogersGenuineness}
                          onChange={(e) => setRogersGenuineness(Number(e.target.value))}
                          className="w-full accent-indigo-500"
                        />
                      </div>
                    </div>

                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <span className="text-xs text-slate-400">Client Self-Actualisation Index:</span>
                        <p className="text-lg font-black text-emerald-400">{clientCongruenceScore}% Congruence</p>
                      </div>
                      <span className="text-2xl">
                        {clientCongruenceScore >= 75 ? '🌱✨' : clientCongruenceScore >= 45 ? '🌿' : '🥀'}
                      </span>
                    </motion.div>
                  </motion.div>
                </div>
              )}

              {/* ── SLIDE 1: WOLPE DESENSITIZATION LADDER (SVG 2) ── */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <motion.div 
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-slate-950 p-4 rounded-2xl border border-slate-800"
                  >
                    {/* SVG 2: Wolpe Systematic Desensitization Ladder & Reciprocal Inhibition */}
                    <svg viewBox="0 0 400 280" className="w-full h-64 rounded-xl overflow-hidden bg-slate-950">
                      {/* Ladder Rails */}
                      <line x1="120" y1="30" x2="120" y2="250" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
                      <line x1="280" y1="30" x2="280" y2="250" stroke="#475569" strokeWidth="6" strokeLinecap="round" />

                      {/* 6 Graded Hierarchy Rungs */}
                      {[
                        { step: 6, y: 50, label: 'Petting live dog' },
                        { step: 5, y: 85, label: '5m from leashed dog' },
                        { step: 4, y: 120, label: '20m from dog' },
                        { step: 3, y: 155, label: 'Video behind glass' },
                        { step: 2, y: 190, label: 'Photo of Labrador' },
                        { step: 1, y: 225, label: 'Cartoon sketch' },
                      ].map((rung) => {
                        const isSelected = fearHierarchyStep === rung.step;
                        return (
                          <g key={rung.step}>
                            <line
                              x1="120"
                              y1={rung.y}
                              x2="280"
                              y2={rung.y}
                              stroke={isSelected ? '#38bdf8' : '#334155'}
                              strokeWidth={isSelected ? 6 : 3}
                            />
                            <circle
                              cx="200"
                              cy={rung.y}
                              r={isSelected ? 10 : 6}
                              fill={isSelected ? (netAnxietyLevel > 20 ? '#f43f5e' : '#10b981') : '#475569'}
                            />
                            <text
                              x="110"
                              y={rung.y + 4}
                              textAnchor="end"
                              fill={isSelected ? '#38bdf8' : '#64748b'}
                              fontSize="10"
                              fontWeight="bold"
                            >
                              Step {rung.step}
                            </text>
                            <text
                              x="290"
                              y={rung.y + 4}
                              textAnchor="start"
                              fill={isSelected ? '#f8fafc' : '#64748b'}
                              fontSize="9.5"
                            >
                              {rung.label}
                            </text>
                          </g>
                        );
                      })}

                      {/* Reciprocal Inhibition Indicator Shield */}
                      <rect x="140" y="245" width="120" height="25" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                      <text x="200" y="261" textAnchor="middle" fill="#34d399" fontSize="9.5" fontWeight="bold">
                        Relaxation {relaxationLevel}%
                      </text>
                    </svg>

                    <div className="space-y-1.5 mt-2">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Jacobson Muscle Relaxation Level</span>
                        <span className="font-bold text-emerald-400">{relaxationLevel}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={relaxationLevel}
                        onChange={(e) => handleRelaxationSlider(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-label="Progressive Relaxation Slider"
                      />
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4"
                  >
                    <h4 className="text-sm font-bold text-sky-300 uppercase tracking-wider">
                      Select Hierarchy Exposure Level
                    </h4>

                    <div className="grid grid-cols-2 gap-2">
                      {[1, 2, 3, 4, 5, 6].map((step) => (
                        <motion.button
                          key={step}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setFearHierarchyStep(step);
                            audioManager.play('tap');
                          }}
                          className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                            fearHierarchyStep === step
                              ? 'bg-sky-950 border-sky-500 text-sky-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          Rung {step}: Fear Lv {step * 10}
                        </motion.button>
                      ))}
                    </div>

                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400">Reciprocal Inhibition Fear Gauge:</span>
                        <span className={`text-sm font-black ${netAnxietyLevel > 30 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {netAnxietyLevel} / 100 Fear Units
                        </span>
                      </div>
                      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          animate={{ width: `${netAnxietyLevel}%` }}
                          style={{
                            backgroundColor: netAnxietyLevel > 40 ? '#f43f5e' : netAnxietyLevel > 15 ? '#fbbf24' : '#10b981',
                          }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {netAnxietyLevel === 0
                          ? '✅ Complete Fear Extinction! Relaxation counters sympathetic panic.'
                          : '⚡ Mild residual sympathetic arousal. Increase progressive muscle relaxation.'}
                      </p>
                    </motion.div>

                    {!predictionMade && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3.5 bg-purple-950/40 rounded-xl border border-purple-800/60"
                      >
                        <p className="text-xs font-bold text-purple-200 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="space-y-1.5">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handlePrediction(i)}
                              className="w-full p-2 text-left text-xs bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-300 border border-slate-700/70"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              )}

              {/* ── SLIDE 2: KELLEY ATTRIBUTION COVARIATION CUBE (SVG 3) ── */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <motion.div 
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-slate-950 p-4 rounded-2xl border border-slate-800"
                  >
                    {/* SVG 3: Isometric Attribution Cube Diagram */}
                    <svg viewBox="0 0 400 280" className="w-full h-64 rounded-xl overflow-hidden bg-slate-950">
                      {/* Top Face (Consensus) */}
                      <polygon
                        points="200,40 310,95 200,150 90,95"
                        fill={kelleyConsensus === 'high' ? '#047857' : '#991b1b'}
                        stroke="#0f172a"
                        strokeWidth="2"
                        opacity="0.85"
                      />
                      <text x="200" y="90" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">
                        Consensus: {kelleyConsensus.toUpperCase()}
                      </text>

                      {/* Left Face (Consistency) */}
                      <polygon
                        points="90,95 200,150 200,260 90,205"
                        fill={kelleyConsistency === 'high' ? '#1d4ed8' : '#6b21a8'}
                        stroke="#0f172a"
                        strokeWidth="2"
                        opacity="0.85"
                      />
                      <text x="145" y="185" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold" transform="rotate(30, 145, 185)">
                        Consistency: {kelleyConsistency.toUpperCase()}
                      </text>

                      {/* Right Face (Distinctiveness) */}
                      <polygon
                        points="200,150 310,95 310,205 200,260"
                        fill={kelleyDistinctiveness === 'high' ? '#d97706' : '#be123c'}
                        stroke="#0f172a"
                        strokeWidth="2"
                        opacity="0.85"
                      />
                      <text x="255" y="185" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold" transform="rotate(-30, 255, 185)">
                        Distinctiveness: {kelleyDistinctiveness.toUpperCase()}
                      </text>
                    </svg>

                    <div className="grid grid-cols-3 gap-2 mt-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setKelleyConsensus(c => c === 'high' ? 'low' : 'high'); audioManager.play('tap'); }}
                        className={`p-2 text-xs font-bold rounded-xl border ${
                          kelleyConsensus === 'high' ? 'bg-emerald-950 border-emerald-500 text-emerald-200' : 'bg-rose-950 border-rose-600 text-rose-200'
                        }`}
                      >
                        Consensus: {kelleyConsensus}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setKelleyConsistency(c => c === 'high' ? 'low' : 'high'); audioManager.play('tap'); }}
                        className={`p-2 text-xs font-bold rounded-xl border ${
                          kelleyConsistency === 'high' ? 'bg-blue-950 border-blue-500 text-blue-200' : 'bg-purple-950 border-purple-500 text-purple-200'
                        }`}
                      >
                        Consistency: {kelleyConsistency}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setKelleyDistinctiveness(d => d === 'high' ? 'low' : 'high'); audioManager.play('tap'); }}
                        className={`p-2 text-xs font-bold rounded-xl border ${
                          kelleyDistinctiveness === 'high' ? 'bg-amber-950 border-amber-500 text-amber-200' : 'bg-rose-950 border-rose-600 text-rose-200'
                        }`}
                      >
                        Distinct.: {kelleyDistinctiveness}
                      </motion.button>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-gradient-to-br from-slate-900 to-amber-950/40 rounded-2xl border border-amber-800/60"
                    >
                      <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Computed Social Attribution:</span>
                      <h3 className="text-xl font-black text-white mt-1">{kelleyAttributionResult.type}</h3>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        {kelleyAttributionResult.explanation}
                      </p>
                    </motion.div>

                    {!observationAnswered && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3.5 bg-slate-900 rounded-xl border border-slate-800"
                      >
                        <p className="text-xs font-bold text-white mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                        <div className="space-y-1.5">
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleObservation(i)}
                              className="w-full p-2 text-left text-xs bg-slate-800 hover:bg-slate-700/80 rounded-lg text-slate-300 border border-slate-700"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              )}

              {/* ── SLIDE 3: MILGRAM OBEDIENCE APPARATUS (SVG 4) ── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <motion.div 
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-slate-950 p-4 rounded-2xl border border-slate-800"
                  >
                    {/* SVG 4: Milgram Shock Console Display */}
                    <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl overflow-hidden bg-slate-950">
                      <rect x="20" y="15" width="360" height="210" rx="12" fill="#1e293b" stroke="#475569" strokeWidth="3" />
                      <rect x="40" y="30" width="320" height="90" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                      
                      <path d="M 70 95 A 130 130 0 0 1 330 95" fill="none" stroke="#334155" strokeWidth="8" />
                      <path
                        d="M 70 95 A 130 130 0 0 1 330 95"
                        fill="none"
                        stroke={milgramVoltage > 300 ? '#f43f5e' : milgramVoltage > 150 ? '#fbbf24' : '#10b981'}
                        strokeWidth="8"
                        strokeDasharray="408"
                        strokeDashoffset={408 - (milgramVoltage / 450) * 408}
                      />

                      <circle cx="200" cy="100" r="6" fill="#f8fafc" />
                      <line
                        x1="200"
                        y1="100"
                        x2={200 + 75 * Math.cos(Math.PI + (milgramVoltage / 450) * Math.PI)}
                        y2={100 - 75 * Math.sin(Math.PI - (milgramVoltage / 450) * Math.PI)}
                        stroke="#f43f5e"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      <text x="200" y="70" textAnchor="middle" fill="#f8fafc" fontSize="20" fontWeight="black" fontFamily="monospace">
                        {milgramVoltage} V
                      </text>

                      <rect x="45" y="135" width="70" height="18" rx="4" fill={milgramVoltage <= 120 ? '#047857' : '#1e293b'} />
                      <text x="80" y="148" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">SLIGHT</text>

                      <rect x="122" y="135" width="70" height="18" rx="4" fill={milgramVoltage > 120 && milgramVoltage <= 240 ? '#b45309' : '#1e293b'} />
                      <text x="157" y="148" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">STRONG</text>

                      <rect x="200" y="135" width="70" height="18" rx="4" fill={milgramVoltage > 240 && milgramVoltage <= 360 ? '#c2410c' : '#1e293b'} />
                      <text x="235" y="148" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">INTENSE</text>

                      <rect x="278" y="135" width="78" height="18" rx="4" fill={milgramVoltage > 360 ? '#b91c1c' : '#1e293b'} />
                      <text x="317" y="148" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">DANGER 450V</text>

                      <circle cx="200" cy="185" r="10" fill={milgramVoltage >= 300 ? '#f43f5e' : '#334155'} />
                      <text x="200" y="210" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold">
                        {milgramVoltage >= 300 ? 'AGENTIC STATE ACTIVE' : 'AUTONOMOUS STATE'}
                      </text>
                    </svg>

                    <input
                      type="range"
                      min={15}
                      max={450}
                      step={15}
                      value={milgramVoltage}
                      onChange={(e) => handleVoltageSlider(Number(e.target.value))}
                      className="w-full accent-rose-500 cursor-pointer mt-3"
                      aria-label="Milgram Voltage Slider"
                    />
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setExperimenterPresent(p => !p); audioManager.play('tap'); }}
                        className={`p-2.5 rounded-xl border font-bold ${
                          experimenterPresent ? 'bg-indigo-950 border-indigo-600 text-indigo-200' : 'bg-slate-900 border-slate-800 text-slate-500'
                        }`}
                      >
                        Experimenter: {experimenterPresent ? 'In Room' : 'Remote Phone'}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setPeerRebellion(r => !r); audioManager.play('tap'); }}
                        className={`p-2.5 rounded-xl border font-bold ${
                          peerRebellion ? 'bg-emerald-950 border-emerald-600 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-500'
                        }`}
                      >
                        Peers: {peerRebellion ? '2 Rebelled' : 'No Dissent'}
                      </motion.button>
                    </div>

                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-gradient-to-br from-slate-900 to-rose-950/40 rounded-2xl border border-rose-800/60"
                    >
                      <span className="text-xs text-rose-400 font-bold uppercase tracking-wider">Simulated Compliance Rate:</span>
                      <h3 className="text-2xl font-black text-white mt-1">{milgramComplianceRate}% of Teachers Comply</h3>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        {peerRebellion
                          ? '🌟 Rebellious confederates shatter unanimity! Compliance crashes to ~10%.'
                          : !experimenterPresent
                          ? '📞 Remote orders reduce psychological authority; compliance drops to ~20%.'
                          : '⚠️ Standard baseline: Agentic shift and standardized prods ("You must go on") yield 65% full obedience.'}
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              )}

              {/* ── SLIDE 4: FESTINGER DISSONANCE & CROWDING STRESS (SVG 5) ── */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <motion.div 
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-slate-950 p-4 rounded-2xl border border-slate-800"
                  >
                    {/* SVG 5: Cognitive Dissonance Scale */}
                    <svg viewBox="0 0 400 220" className="w-full h-52 rounded-xl overflow-hidden bg-slate-950">
                      <polygon points="200,160 220,200 180,200" fill="#475569" />

                      <g transform={`rotate(${((attitudeActionGap - 50) / 50) * 20}, 200, 160)`}>
                        <rect x="70" y="156" width="260" height="8" rx="4" fill="#94a3b8" />
                        
                        <line x1="90" y1="160" x2="90" y2="190" stroke="#cbd5e1" strokeWidth="2" />
                        <rect x="60" y="190" width="60" height="15" rx="4" fill="#3b82f6" />
                        <text x="90" y="201" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Belief</text>

                        <line x1="310" y1="160" x2="310" y2="190" stroke="#cbd5e1" strokeWidth="2" />
                        <rect x="280" y="190" width="60" height="15" rx="4" fill="#f43f5e" />
                        <text x="310" y="201" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Action</text>
                      </g>

                      <text x="200" y="45" textAnchor="middle" fill={attitudeActionGap > 40 ? '#f43f5e' : '#34d399'} fontSize="14" fontWeight="black">
                        Dissonance Strain: {attitudeActionGap}%
                      </text>
                    </svg>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Attitude vs Behaviour Gap</span>
                        <span className="font-bold text-amber-400">{attitudeActionGap}% Dissonant</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={attitudeActionGap}
                        onChange={(e) => { setAttitudeActionGap(Number(e.target.value)); audioManager.play('balance'); }}
                        className="w-full accent-amber-500 cursor-pointer"
                        aria-label="Cognitive Dissonance Gap Slider"
                      />
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4"
                  >
                    <h4 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                      Environmental Crowding & Personal Space
                    </h4>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Physical Density (People / Sq Metre)</span>
                          <span className="font-bold text-slate-300">{urbanDensity} persons</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          value={urbanDensity}
                          onChange={(e) => setUrbanDensity(Number(e.target.value))}
                          className="w-full accent-slate-400"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Perceived Personal Control & Space</span>
                          <span className="font-bold text-sky-400">{perceivedControl}% Control</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={perceivedControl}
                          onChange={(e) => setPerceivedControl(Number(e.target.value))}
                          className="w-full accent-sky-500"
                        />
                      </div>
                    </div>

                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <span className="text-[11px] text-slate-400">Subjective Crowding Stress:</span>
                        <p className={`text-base font-black ${perceivedCrowdingStress > 40 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {perceivedCrowdingStress}% Psychological Strain
                        </p>
                      </div>
                      <span className="text-xs text-slate-500 font-mono">Density ≠ Crowding</span>
                    </motion.div>
                  </motion.div>
                </div>
              )}
            </motion.div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => Math.max(0, s - 1));
                  audioManager.play('tap');
                }}
                disabled={currentSlide === 0}
                className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold disabled:opacity-40"
              >
                ← Previous Lab
              </motion.button>

              <span className="text-xs text-slate-400 font-semibold">
                Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(s => s + 1);
                    audioManager.play('tap');
                  }}
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-lg"
                >
                  Enter Free Sandbox →
                </motion.button>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.section
            key="sandbox-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <motion.div 
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-2"
            >
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 text-xs font-bold rounded-full border border-emerald-700">
                Sandbox Mode (Ungraded Free Exploration)
              </span>
              <h3 className="text-xl font-black text-white mt-2">Unconstrained Psychological Parameter Lab</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Adjust all clinical, social, and environmental sliders simultaneously. Experience how anxiety, obedience, attribution, and cognitive dissonance interact in human behaviour.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div 
                whileHover={{ y: -4 }}
                className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3"
              >
                <h5 className="text-xs font-bold text-purple-300 uppercase">Freud Unconscious Probe</h5>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={unconsciousDepth}
                  onChange={(e) => setUnconsciousDepth(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
                <p className="text-xs text-slate-400">Repressed Conflict Salience: {unconsciousDepth}%</p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -4 }}
                className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3"
              >
                <h5 className="text-xs font-bold text-rose-300 uppercase">Milgram Shock Voltage</h5>
                <input
                  type="range"
                  min={15}
                  max={450}
                  step={15}
                  value={milgramVoltage}
                  onChange={(e) => setMilgramVoltage(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
                <p className="text-xs text-slate-400">Shock: {milgramVoltage}V ({milgramComplianceRate}% Compliance)</p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -4 }}
                className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3"
              >
                <h5 className="text-xs font-bold text-sky-300 uppercase">Wolpe Anxiety Hierarchy</h5>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={relaxationLevel}
                  onChange={(e) => setRelaxationLevel(Number(e.target.value))}
                  className="w-full accent-sky-500"
                />
                <p className="text-xs text-slate-400">Reciprocal Relaxation: {relaxationLevel}% (Anxiety: {netAnxietyLevel})</p>
              </motion.div>
            </div>

            <div className="flex justify-end pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-2xl text-sm font-bold shadow-xl shadow-purple-950/60"
              >
                Ready for Graded ISC Challenges! →
              </motion.button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: CHALLENGE ENGINE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.section
            key="challenge-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Challenge Progress Header */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                    Challenge {currentChallenge + 1} of {filteredChallenges.length}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700 font-mono">
                    NEP Competency: {currentChallengeItem.competencyLevel}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>Score: {scoreBreakdown.correct} / {scoreBreakdown.total}</span>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            {/* Question Card */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={wrongShake ? { duration: 0.4 } : {}}
              className={`p-6 rounded-3xl border transition-colors ${
                wrongFlash
                  ? 'bg-rose-950/70 border-rose-600 text-rose-200'
                  : 'bg-slate-900/90 border-slate-800 text-slate-100'
              }`}
            >
              <h3 className="text-base sm:text-lg font-bold text-white mb-4 leading-snug">
                {currentChallengeItem.question}
              </h3>

              {/* 1. MCQ OPTIONS */}
              {(currentChallengeItem.type === 'classify' || currentChallengeItem.type === 'distinguish' || currentChallengeItem.type === 'match') && currentChallengeItem.options && (
                <div className="space-y-2.5">
                  {currentChallengeItem.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      className={`w-full text-left p-3.5 rounded-2xl text-xs sm:text-sm font-medium transition-all border ${
                        showExplanation && i === currentChallengeItem.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : showExplanation && i !== currentChallengeItem.correctIndex
                          ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                          : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-purple-500'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-slate-700/80 flex items-center justify-center text-xs font-bold text-purple-300 shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* 2. DRAG-LABEL CHALLENGE */}
              {currentChallengeItem.type === 'drag-label' && currentChallengeItem.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                    {currentChallengeItem.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-purple-900/80 hover:bg-purple-800 text-purple-200 text-xs font-bold rounded-xl border border-purple-600 cursor-grab active:cursor-grabbing shadow"
                      >
                        ⠿ {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentChallengeItem.dragItems.map((item) => (
                      <motion.div
                        key={item.targetId}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(item.targetId)}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-2xl border-2 border-dashed min-h-[70px] flex flex-col justify-center transition-all ${
                          droppedLabels[item.targetId]
                            ? 'bg-purple-950/40 border-purple-500 text-purple-200'
                            : 'bg-slate-950/60 border-slate-700 text-slate-400'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-bold text-slate-400">Target: {item.targetId.replace('slot_', 'Component ').replace('box_', 'Principle ')}</span>
                        <p className="text-xs font-bold mt-1">{droppedLabels[item.targetId] || 'Drop matching label here'}</p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Check Label Mappings →
                  </motion.button>
                </div>
              )}

              {/* 3. DRAG-SORT CHALLENGE */}
              {currentChallengeItem.type === 'drag-sort' && currentChallengeItem.sortItems && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Drag to rearrange in descending order:</p>
                  <div className="space-y-2">
                    {(sortArrangement.length === currentChallengeItem.sortItems.length
                      ? sortArrangement.map((idx) => currentChallengeItem.sortItems![idx])
                      : currentChallengeItem.sortItems
                    ).map((item, displayIdx) => (
                      <motion.div
                        key={displayIdx}
                        draggable
                        onDragStart={() => setDraggedItem(String(displayIdx))}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          const fromIdx = parseInt(draggedItem || '0');
                          handleSortMove(fromIdx, displayIdx);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 flex items-center justify-between cursor-grab"
                      >
                        <span>{displayIdx + 1}. {item}</span>
                        <span className="text-slate-400 text-sm">⠿</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSortSubmit}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow mt-2"
                  >
                    Submit Sort Order →
                  </motion.button>
                </div>
              )}

              {/* 4. NUMERIC INPUT CHALLENGE */}
              {currentChallengeItem.type === 'numeric' && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter integer..."
                      className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500 w-48"
                    />
                    <span className="text-sm font-bold text-slate-400">{currentChallengeItem.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(numericInput)}
                      className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow"
                    >
                      Check Value
                    </motion.button>
                  </div>
                </div>
              )}

              {/* 5. CONSTRUCT CHALLENGE */}
              {currentChallengeItem.type === 'construct' && currentChallengeItem.availableParts && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">{currentChallengeItem.validationHint}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {currentChallengeItem.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setConstructParts(prev => [...prev, part]);
                          audioManager.play('tap');
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center"
                  >
                    {constructParts.map((part, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="px-3 py-1 bg-purple-950 text-purple-200 border border-purple-700 rounded-lg text-xs font-bold flex items-center gap-1.5"
                      >
                        {part}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setConstructParts(p => p.filter((_, i) => i !== idx))}
                          className="text-rose-400 hover:text-rose-300 text-sm font-bold ml-1"
                        >
                          ×
                        </motion.button>
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-400">Click parts above to assemble sequence...</span>
                    )}
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={constructParts.length === 0}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow disabled:opacity-40"
                  >
                    Validate Constructed Sequence →
                  </motion.button>
                </div>
              )}

              {/* Step-by-Step Progressive Disclosure Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-gradient-to-br from-slate-950 to-purple-950/40 rounded-2xl border border-purple-800/60 space-y-3"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-300 uppercase tracking-wider">
                    <span>📘 Clinical & Empirical Explanation</span>
                  </div>

                  <div className="space-y-2">
                    {currentChallengeItem.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                      >
                        <span className="font-bold text-purple-400">{i + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {revealedSteps < currentChallengeItem.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setRevealedSteps(s => s + 1)}
                        className="px-4 py-1.5 bg-purple-900/80 hover:bg-purple-800 text-purple-200 rounded-xl text-xs font-bold border border-purple-600"
                      >
                        Reveal Next Step →
                      </motion.button>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Simulation →' : 'Next Challenge →'}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD REPORT ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.section
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            <motion.div 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="p-8 bg-gradient-to-br from-purple-950/60 via-slate-900 to-slate-900 rounded-3xl border border-purple-700/60 text-center space-y-3"
            >
              <motion.span 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-4xl inline-block"
              >
                🎓✨
              </motion.span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">ISC Psychology Mastery Certified</h2>
              <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                You evaluated psychotherapies (Freud, Rogers, Wolpe, Ellis), attribution biases (Kelley), obedience dynamics (Milgram), attitude dissonance (Festinger), and environmental deprivation paradigms.
              </p>

              <div className="flex justify-center gap-4 pt-3">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="p-3 bg-slate-950 rounded-2xl border border-slate-800 min-w-[120px]"
                >
                  <span className="text-[10px] uppercase text-slate-400 font-bold">Accuracy Score</span>
                  <p className="text-xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="p-3 bg-slate-950 rounded-2xl border border-slate-800 min-w-[120px]"
                >
                  <span className="text-[10px] uppercase text-slate-400 font-bold">BKT Mastery Level</span>
                  <p className="text-xl font-black text-purple-400 capitalize">{masteryLevel}</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Motivational Feedback Banner */}
            <motion.div 
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-5 bg-emerald-950/50 rounded-2xl border border-emerald-700/60"
            >
              <p className="text-sm font-bold text-emerald-200">
                {errors === 0
                  ? '🌟 PERFECT SCORE! Complete mastery over clinical, social, and environmental psychology.'
                  : errors <= 3
                  ? '👏 Superb clinical insight! Review the few minor misconceptions below for full board perfection.'
                  : '💪 Commendable effort! Psychology is a deep science. Review your misconception profile below and retry!'}
              </p>
            </motion.div>

            {/* ─── SPACED REPETITION SCHEDULE (SRS VISIBILITY) ─── */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              className="p-6 bg-gradient-to-r from-indigo-950/70 via-slate-900 to-purple-950/70 rounded-3xl border border-indigo-700/50 shadow-xl space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">📅</span>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                      SM-2 Spaced Repetition Protocol
                    </span>
                    <h4 className="text-base font-black text-white">Recommended Next Clinical Review</h4>
                  </div>
                </div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className={`px-4 py-1.5 rounded-xl border text-xs font-black uppercase tracking-wider shadow ${srsSchedule.badgeClass}`}
                >
                  Review in {srsSchedule.intervalText}
                </motion.div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1"
                >
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Target Review Date</span>
                  <p className="text-sm font-bold text-white">
                    {new Date(Date.now() + srsSchedule.days * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1"
                >
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Retention Category</span>
                  <p className="text-sm font-bold text-indigo-300">{srsSchedule.label}</p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1"
                >
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Current Error Count</span>
                  <p className="text-sm font-bold text-amber-400">{errors} mistakes logged</p>
                </motion.div>
              </div>

              <p className="text-xs text-slate-400 italic">
                💡 Ebbinghaus Memory Curve insight: Spaced retrieval at {srsSchedule.intervalText} shifts short-term psychotherapeutic definitions into permanent long-term neurocognitive memory.
              </p>
            </motion.div>

            {/* Misconception Diagnostic Profile */}
            {hitMisconceptions.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-rose-950/40 rounded-3xl border border-rose-800/60 space-y-3"
              >
                <h4 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                  ⚠️ Your Diagnostic Misconception Review
                </h4>
                <div className="space-y-2.5">
                  {hitMisconceptions.map((idx, i) => {
                    const m = misconceptions[idx];
                    if (!m) return null;
                    return (
                      <motion.div 
                        key={i} 
                        whileHover={{ scale: 1.01 }}
                        className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1"
                      >
                        <p className="text-rose-300 font-semibold">❌ Misconception: {m.misconception}</p>
                        <p className="text-emerald-300">✓ Scientific Correction: {m.correction}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Real World Capstone Activity */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3"
            >
              <span className="px-3 py-1 bg-purple-950 text-purple-300 text-xs font-bold rounded-full border border-purple-700">
                Applied ISC Project Capstone
              </span>
              <h4 className="text-lg font-black text-white mt-1">{REAL_WORLD_ACTIVITY.title}</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.02 }}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs text-slate-300"
                  >
                    <span className="font-bold text-purple-400 mr-1.5">{i + 1}.</span> {step}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── SIMULATION ENGINE FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Clinical Mastery Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C12_PsychologyPsychotherapyPsychoanalysisClientcentredSim;