'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst, type SoundEffect } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface NodeMasteryMap {
  [nodeId: string]: BKTState;
}

export interface SRSMap {
  [challengeId: string]: SRSItem;
}

export interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'drag-label' | 'distinguish' | 'numeric' | 'construct' | 'drag-sort';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string | number | string[];
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
  matchingPairs?: Array<{ item: string; target: string }>;
  sortItems?: string[];
  correctOrder?: string[];
}

export interface ExplorationStep {
  title: string;
  instruction: string;
  interactionType: 'four-ds' | 'diathesis-stress' | 'neurotransmitters' | 'case-diagnostic' | 'symptom-matrix';
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

export interface Misconception {
  id: string;
  title: string;
  misconception: string;
  correction: string;
  nodeId: string;
}

export interface DiagnosticQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  nodeId: string;
}

export interface PatientCase {
  id: string;
  name: string;
  age: number;
  presentingSymptoms: string[];
  history: string;
  fourDs: {
    deviance: number; // 0-100
    distress: number; // 0-100
    dysfunction: number; // 0-100
    danger: number; // 0-100
  };
  diathesisLevel: number; // 0-100
  stressorLevel: number; // 0-100
  neurochemicalState: {
    dopamine: 'normal' | 'excessive' | 'deficient';
    serotonin: 'normal' | 'excessive' | 'deficient';
    gaba: 'normal' | 'excessive' | 'deficient';
    norepinephrine: 'normal' | 'excessive' | 'deficient';
  };
  primaryCategory: string;
  dsm5Code: string;
  icd10Code: string;
  suggestedModel: 'Biological' | 'Psychodynamic' | 'Behavioral' | 'Cognitive' | 'Humanistic' | 'Socio-Cultural';
}

// ==========================================
// CONSTANTS & CURRICULUM DATA
// ==========================================

const ALL_NODE_IDS = [
  'c12_psy_cbse_064', 'c12_psy_cbse_065', 'c12_psy_cbse_066', 'c12_psy_cbse_067', 'c12_psy_cbse_068',
  'c12_psy_cbse_069', 'c12_psy_cbse_070', 'c12_psy_cbse_071', 'c12_psy_cbse_072', 'c12_psy_cbse_073',
  'c12_psy_cbse_074', 'c12_psy_cbse_075', 'c12_psy_cbse_076', 'c12_psy_cbse_077', 'c12_psy_cbse_078',
  'c12_psy_cbse_079', 'c12_psy_cbse_080', 'c12_psy_cbse_081', 'c12_psy_cbse_082', 'c12_psy_cbse_083',
  'c12_psy_cbse_084', 'c12_psy_cbse_085', 'c12_psy_cbse_086', 'c12_psy_cbse_087', 'c12_psy_cbse_088',
  'c12_psy_cbse_089', 'c12_psy_cbse_090', 'c12_psy_cbse_091', 'c12_psy_cbse_092', 'c12_psy_cbse_093',
  'c12_psy_cbse_094', 'c12_psy_cbse_095', 'c12_psy_cbse_096', 'c12_psy_cbse_097', 'c12_psy_cbse_098',
  'c12_psy_cbse_099', 'c12_psy_cbse_100', 'c12_psy_cbse_101', 'c12_psy_cbse_102', 'c12_psy_cbse_103',
  'c12_psy_cbse_104', 'c12_psy_cbse_105', 'c12_psy_cbse_106', 'c12_psy_cbse_107', 'c12_psy_cbse_108',
  'c12_psy_cbse_109'
];

const SCENARIO = {
  title: 'Clinical Diagnostic & Neuro-Psychology Interactive Suite',
  intro: 'Welcome to the Advanced Clinical Psychology Assessment Lab. As a lead psychologist, you will evaluate patients using multi-modal diagnostic criteria (Four Ds, DSM-5 vs ICD-10, Bio-Psycho-Social models), simulate neurochemical dynamics, and apply evidence-based psychological frameworks.',
  context: 'Interact with live patient profiles, adjust biological and environmental sliders, map cognitive distortions, analyze neurobiological circuits, and complete diagnostic challenges to master Class 12 ISC Psychological Disorders curriculum.',
};

const DISCOVERY_QUESTION = {
  question: 'Why do two individuals exposed to the exact same traumatic stressor experience vastly different clinical outcomes—where one develops Severe PTSD while the other demonstrates psychological resilience?',
  options: [
    'PTSD occurs purely due to personal weakness and lack of moral willpower.',
    'Differences stem from pre-existing genetic/biological vulnerability (diathesis) interacting dynamically with environmental stressors and coping mechanisms.',
    'Trauma only affects individuals who have a pre-existing neurological brain lesion.',
    'Psychological disorders are entirely determined by external social stigma and labeling.'
  ],
  correctIndex: 1,
  hintAfter: 'The Diathesis-Stress model demonstrates that psychological disorders result from an interaction between an underlying predisposition (biological, genetic, or early developmental) and environmental stress loads.',
};

const EXPLORATION_STEPS: ExplorationStep[] = [
  {
    title: 'Lab 1: The Four Ds Evaluation Matrix',
    instruction: 'Adjust the severity sliders for Deviance, Distress, Dysfunction, and Danger for clinical case profiles to determine if behavior crosses the threshold into psychological abnormality.',
    interactionType: 'four-ds',
    nodeId: 'c12_psy_cbse_065',
  },
  {
    title: 'Lab 2: Diathesis-Stress Dynamic Simulator',
    instruction: 'Manipulate genetic vulnerability (diathesis) and environmental life stressors to visualize the psychological breakdown threshold curve.',
    interactionType: 'diathesis-stress',
    nodeId: 'c12_psy_cbse_074',
  },
  {
    title: 'Lab 3: Neurochemical Circuit Lab',
    instruction: 'Alter levels of Dopamine, Serotonin, GABA, and Norepinephrine to observe pathways leading to Anxiety, Depression, and Psychotic Spectrum disorders.',
    interactionType: 'neurotransmitters',
    nodeId: 'c12_psy_cbse_070',
  },
  {
    title: 'Lab 4: DSM-5 vs. ICD-10 Differential Diagnostic Profiler',
    instruction: 'Analyze patient history, cluster positive/negative symptoms, and formulate multi-axial differential diagnoses according to international diagnostic criteria.',
    interactionType: 'case-diagnostic',
    nodeId: 'c12_psy_cbse_068',
  },
  {
    title: 'Lab 5: Psychological Models & Etiology Matcher',
    instruction: 'Compare Psychodynamic, Behavioral, Cognitive, Humanistic, and Socio-Cultural perspectives on disorder etiology and treatment targets.',
    interactionType: 'symptom-matrix',
    nodeId: 'c12_psy_cbse_072',
  },
];

const PREDICTION_QUESTIONS: PredictionQuestion[] = [
  {
    question: 'Predict: If a patient exhibits an excessive surge of Dopamine activity in the mesolimbic pathway combined with severe structural ventricular enlargement, which clinical presentation is most likely?',
    options: [
      'Generalized Anxiety Disorder with panic attacks',
      'Positive symptoms of Schizophrenia (hallucinations, delusions)',
      'Dissociative Amnesia with fugue',
      'Anorexia Nervosa restrictive subtype'
    ],
    correctIndex: 1,
    verifyInstruction: 'Verify in Lab 3 by increasing Dopamine to max level and setting brain structural markers to psychotic spectrum.',
    nodeId: 'c12_psy_cbse_087',
  },
  {
    question: 'Predict: According to Beck’s Cognitive Triad, how does a depressed individual process negative events?',
    options: [
      'They attribute negative events to external, temporary, and specific causes.',
      'They hold automatic negative views about the self, the world/experience, and the future.',
      'They experience unconscious conflict between id superego drives.',
      'They exhibit excess GABA inhibition in the limbic cortex.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Verify in Lab 5 under Cognitive Model parameters.',
    nodeId: 'c12_psy_cbse_103',
  },
];

const OBSERVATION_QUESTIONS: ObservationQuestion[] = [
  {
    question: 'What do you observe when an individual has high Diathesis (genetic vulnerability) even under very minor everyday environmental stress?',
    observableOptions: [
      'They never develop a disorder because stress is low.',
      'The clinical threshold for disorder onset is easily crossed due to high baseline vulnerability.',
      'Their GABA neurotransmitter levels automatically increase to protect them.',
      'They switch from DSM-5 symptoms to ICD-10 symptoms instantly.'
    ],
    correctIndex: 1,
    nodeId: 'c12_psy_cbse_074',
  },
  {
    question: 'When GABA activity in the brain is significantly deficient, what physiological and psychological response is observed?',
    observableOptions: [
      'Deep muscular relaxation and drowsiness',
      'Uncontrolled neural hyperexcitability and heightened autonomic anxiety symptoms',
      'Flat affect and loss of motivation (avolition)',
      'Development of localized retrograde amnesia'
    ],
    correctIndex: 1,
    nodeId: 'c12_psy_cbse_075',
  },
];

const REAL_WORLD_ACTIVITY: RealWorldActivity = {
  title: 'Community Mental Health Screening & Suicide Prevention Audit',
  description: 'Apply clinical risk assessment protocols (QPR: Question, Persuade, Refer) and reduce mental health stigma in educational institutions through systemic intervention planning.',
  steps: [
    'Identify behavioral, verbal, and situational warning signs of acute depression and suicide risk in a school case scenario.',
    'Calculate vulnerability scores using Diathesis-Stress parameters and somatic/cognitive symptom clustering.',
    'Formulate a multi-disciplinary intervention map integrating cognitive-behavioral techniques, family system support, and medical referral.',
    'Evaluate institutional barriers caused by social stigma and draft a stigma-reduction policy matching WHO/ICD-10 advocacy guidelines.'
  ]
};

const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_1',
    title: 'Schizophrenia vs. Split Personality',
    misconception: 'Schizophrenia means having multiple personalities or a split personality.',
    correction: 'Schizophrenia refers to a split from reality (psychosis) involving delusions, hallucinations, and disorganized thought. Multiple personalities belong to Dissociative Identity Disorder (DID).',
    nodeId: 'c12_psy_cbse_086',
  },
  {
    id: 'misc_2',
    title: 'Normality vs Abnormality as Binary',
    misconception: 'Psychological health and disorder are distinct, mutually exclusive binary categories.',
    correction: 'Abnormal behavior exists on a continuous spectrum. Most psychological traits vary continuously along a dimension from highly adapted to severe dysfunction.',
    nodeId: 'c12_psy_cbse_064',
  },
  {
    id: 'misc_3',
    title: 'Willpower and Depression',
    misconception: 'Major Depressive Disorder is just sadness and can be overcome easily by positive thinking or strong willpower.',
    correction: 'Major Depressive Disorder is a serious bio-psycho-social illness involving monoamine neurochemical alterations, cognitive distortions, and structural brain shifts requiring medical and therapeutic intervention.',
    nodeId: 'c12_psy_cbse_083',
  },
  {
    id: 'misc_4',
    title: 'OCD is Just Cleanliness',
    misconception: 'Obsessive-Compulsive Disorder is simply being excessively neat, organized, or detail-oriented.',
    correction: 'OCD involves intrusive, distress-inducing obsessive thoughts paired with repetitive compulsive behaviors performed to neutralize extreme anxiety.',
    nodeId: 'c12_psy_cbse_079',
  },
  {
    id: 'misc_5',
    title: 'Danger as Mandatory Criteria',
    misconception: 'A person must be dangerous to themselves or others to be diagnosed with a psychological disorder.',
    correction: 'While Danger is one of the Four Ds, many individuals with severe psychological disorders (e.g., GAD, Specific Phobia, Dysthymia) present no danger to anyone.',
    nodeId: 'c12_psy_cbse_065',
  },
  {
    id: 'misc_6',
    title: 'Psychotherapy vs Biological Medicine',
    misconception: 'Psychological disorders are either 100% biological (drugs needed) or 100% psychological (talk therapy needed).',
    correction: 'The Bio-Psycho-Social model demonstrates that optimal clinical outcomes usually stem from combined biological (pharmacotherapy) and psychological/social interventions.',
    nodeId: 'c12_psy_cbse_069',
  },
];

const PATIENT_CASES: PatientCase[] = [
  {
    id: 'case_1',
    name: 'Aarav Sharma',
    age: 24,
    presentingSymptoms: ['Intrusive auditory hallucinations ("voices commenting")', 'Persecutory delusions ("being monitored by satellites")', 'Social withdrawal', 'Flat affect'],
    history: 'Symptoms began 8 months ago during final university exams. Family history of psychotic illness.',
    fourDs: { deviance: 85, distress: 75, dysfunction: 90, danger: 40 },
    diathesisLevel: 80,
    stressorLevel: 70,
    neurochemicalState: { dopamine: 'excessive', serotonin: 'deficient', gaba: 'normal', norepinephrine: 'excessive' },
    primaryCategory: 'Schizophrenia Spectrum Disorder',
    dsm5Code: '295.90 (Schizophrenia)',
    icd10Code: 'F20.0 (Paranoid Schizophrenia)',
    suggestedModel: 'Biological',
  },
  {
    id: 'case_2',
    name: 'Priya Nair',
    age: 29,
    presentingSymptoms: ['Sudden intense surge of fear', 'Heart palpitations & shortness of breath', 'Fear of dying or going crazy', 'Avoidance of public transport'],
    history: 'Experienced 4 unexpected panic attacks over past 2 months. Now constantly fears having another attack.',
    fourDs: { deviance: 60, distress: 90, dysfunction: 75, danger: 20 },
    diathesisLevel: 50,
    stressorLevel: 65,
    neurochemicalState: { dopamine: 'normal', serotonin: 'deficient', gaba: 'deficient', norepinephrine: 'excessive' },
    primaryCategory: 'Anxiety Disorders',
    dsm5Code: '300.01 (Panic Disorder)',
    icd10Code: 'F41.0 (Panic Disorder)',
    suggestedModel: 'Behavioral',
  },
  {
    id: 'case_3',
    name: 'Rohan Verma',
    age: 35,
    presentingSymptoms: ['Persistent depressed mood for 6 weeks', 'Anhedonia (loss of interest)', 'Insomnia & severe fatigue', 'Feelings of worthlessness and suicidal ideation'],
    history: 'Followed recent job loss. History of major depressive episode 3 years ago.',
    fourDs: { deviance: 65, distress: 95, dysfunction: 85, danger: 70 },
    diathesisLevel: 65,
    stressorLevel: 85,
    neurochemicalState: { dopamine: 'deficient', serotonin: 'deficient', gaba: 'normal', norepinephrine: 'deficient' },
    primaryCategory: 'Depressive Disorders',
    dsm5Code: '296.32 (Major Depressive Disorder, Recurrent, Severe)',
    icd10Code: 'F33.2 (Major Depressive Disorder, Recurrent)',
    suggestedModel: 'Cognitive',
  },
  {
    id: 'case_4',
    name: 'Ananya Gupta',
    age: 19,
    presentingSymptoms: ['Intense fear of gaining weight', 'Severe caloric restriction (BMI 14.2)', 'Distorted body image', 'Amenorrhea'],
    history: 'Rigid perfectionism, excessive exercise routines, low self-esteem.',
    fourDs: { deviance: 75, distress: 70, dysfunction: 85, danger: 85 },
    diathesisLevel: 60,
    stressorLevel: 75,
    neurochemicalState: { dopamine: 'deficient', serotonin: 'deficient', gaba: 'normal', norepinephrine: 'normal' },
    primaryCategory: 'Feeding and Eating Disorders',
    dsm5Code: '307.1 (Anorexia Nervosa, Restricting Subtype)',
    icd10Code: 'F50.0 (Anorexia Nervosa)',
    suggestedModel: 'Socio-Cultural',
  },
  {
    id: 'case_5',
    name: 'Karan Patel',
    age: 10,
    presentingSymptoms: ['Hyperactivity', 'Impulsivity', 'Inability to sustain attention in class', 'Fidgeting and interrupting others'],
    history: 'Present across school and home environments since age 6. Academic underachievement.',
    fourDs: { deviance: 55, distress: 45, dysfunction: 70, danger: 15 },
    diathesisLevel: 75,
    stressorLevel: 40,
    neurochemicalState: { dopamine: 'deficient', serotonin: 'normal', gaba: 'normal', norepinephrine: 'deficient' },
    primaryCategory: 'Neurodevelopmental Disorders',
    dsm5Code: '314.01 (ADHD, Combined Presentation)',
    icd10Code: 'F90.2 (ADHD, Combined)',
    suggestedModel: 'Biological',
  }
];

const CHALLENGES: Challenge[] = [
  // FOUNDATION (7)
  {
    id: 'chal_01',
    nodeId: 'c12_psy_cbse_065',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following describes the "Four Ds" used by clinical psychologists to understand abnormal behavior?',
    options: [
      'Deviance, Distress, Dysfunction, Danger',
      'Diagnosis, Delusion, Depression, Dementia',
      'Diathesis, Stress, Defense, Dysfunction',
      'Dopamine, Deficit, Deviance, Dissociation'
    ],
    correctIndex: 0,
    explanation: 'The Four Ds of abnormality are Deviance (different from social norms), Distress (unpleasant/upsetting to person), Dysfunction (interferes with daily functioning), and Danger (risk of harm).',
    hints: [
      'Think of the four terms starting with D that characterize psychological abnormality.',
      'One refers to harm (Danger) and another to daily impairment (Dysfunction).',
      'The full combination includes Deviance, Distress, Dysfunction, and Danger.'
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'chal_02',
    nodeId: 'c12_psy_cbse_068',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The Diagnostic and Statistical Manual of Mental Disorders (DSM-5) is published by which organization?',
    options: [
      'World Health Organization (WHO)',
      'American Psychological Association (APA)',
      'American Psychiatric Association (APA)',
      'United Nations Educational, Scientific and Cultural Organization (UNESCO)'
    ],
    correctIndex: 2,
    explanation: 'DSM-5 is published by the American Psychiatric Association, whereas the ICD-10/ICD-11 is published by the World Health Organization (WHO).',
    hints: [
      'It is published by a psychiatric medical association.',
      'Contrast this with WHO which publishes ICD.',
      'It is the American Psychiatric Association.'
    ]
  },
  {
    id: 'chal_03',
    nodeId: 'c12_psy_cbse_070',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which inhibitory neurotransmitter is primarily implicated in reducing neuronal excitability and controlling anxiety?',
    options: ['Dopamine', 'Serotonin', 'GABA (Gamma-Aminobutyric Acid)', 'Acetylcholine'],
    correctIndex: 2,
    explanation: 'GABA is the chief inhibitory neurotransmitter in the central nervous system. Low GABA activity leads to heightened neural excitability and anxiety disorders.',
    hints: [
      'It acts as the primary brake system of the central nervous system.',
      'Low levels are associated with panic and generalized anxiety.',
      'Gamma-Aminobutyric Acid (GABA).'
    ]
  },
  {
    id: 'chal_04',
    nodeId: 'c12_psy_cbse_077',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'An irrational, persistent, and intense fear of being trapped in open spaces or places where escape might be difficult is known as:',
    options: ['Social Phobia', 'Claustrophobia', 'Agoraphobia', 'Acrophobia'],
    correctIndex: 2,
    explanation: 'Agoraphobia involves fear of entering open or crowded places, traveling alone, or being in places from which escape might be difficult in the event of a panic attack.',
    hints: [
      'Derived from the Greek word for marketplace.',
      'It often develops as a complication of Panic Disorder.',
      'Agoraphobia.'
    ]
  },
  {
    id: 'chal_05',
    nodeId: 'c12_psy_cbse_087',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is classified as a POSITIVE symptom of Schizophrenia?',
    options: [
      'Avolition (lack of motivation)',
      'Hallucinations and Delusions',
      'Alogia (poverty of speech)',
      'Anhedonia (inability to feel pleasure)'
    ],
    correctIndex: 1,
    explanation: 'Positive symptoms are excess or distortions of normal function (e.g., hallucinations, delusions). Negative symptoms involve loss or deficits of normal function (e.g., avolition, alogia, anhedonia).',
    hints: [
      '"Positive" in psychosis means something added to normal perception.',
      'Hallucinations and delusions represent additions to baseline reality.',
      'Hallucinations and Delusions.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'chal_06',
    nodeId: 'c12_psy_cbse_091',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which neurodevelopmental disorder is characterized by persistent patterns of inattention, hyperactivity, and impulsivity?',
    options: ['Autism Spectrum Disorder', 'ADHD', 'Specific Learning Disorder', 'Conduct Disorder'],
    correctIndex: 1,
    explanation: 'Attention-Deficit/Hyperactivity Disorder (ADHD) involves persistent symptoms of inattention and/or hyperactivity-impulsivity across multiple settings.',
    hints: [
      'Abbreviated as ADHD.',
      'Features executive function deficits and motor restlessness.',
      'ADHD (Attention-Deficit/Hyperactivity Disorder).'
    ]
  },
  {
    id: 'chal_07',
    nodeId: 'c12_psy_cbse_096',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'An eating disorder characterized by recurrent episodes of binge eating followed by compensatory behaviors such as self-induced vomiting or excessive purging is:',
    options: ['Anorexia Nervosa', 'Bulimia Nervosa', 'Binge Eating Disorder', 'Pica'],
    correctIndex: 1,
    explanation: 'Bulimia Nervosa involves cycles of binge eating followed by inappropriate compensatory behaviors (purging, fasting, extreme exercise).',
    hints: [
      'Unlike Anorexia, individuals often maintain a normal body weight.',
      'Key feature is the binge-purge cycle.',
      'Bulimia Nervosa.'
    ]
  },

  // STANDARD (8)
  {
    id: 'chal_08',
    nodeId: 'c12_psy_cbse_074',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under the Diathesis-Stress Model, if an individual possesses a extremely high genetic diathesis for bipolar disorder, what level of environmental stress is required to trigger a mood episode?',
    options: [
      'An extremely high level of stress is mandatory.',
      'Even a low or modest level of environmental stress can trigger the disorder.',
      'No stress at all can ever trigger it.',
      'Diathesis eliminates the effect of environmental stress.'
    ],
    correctIndex: 1,
    explanation: 'The Diathesis-Stress model demonstrates an interactive relationship: individuals with very high underlying vulnerability (diathesis) require relatively minimal environmental stress to cross the clinical threshold.',
    hints: [
      'High vulnerability lowers the threshold needed for breakdown.',
      'Minimal environmental triggers can spark onset when genetics/vulnerability is high.',
      'Even a low or modest level of environmental stress.'
    ]
  },
  {
    id: 'chal_09',
    nodeId: 'c12_psy_cbse_079',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A patient experiences persistent intrusive thoughts of contamination (Obsension) and washes hands 50 times an hour to reduce severe anxiety (Compulsion). How does the Behavioral Model explain the maintenance of compulsory handwashing?',
    options: [
      'Through classical conditioning of taste aversion',
      'Through negative reinforcement: compulsions remove/reduce anxiety, strengthening the compulsive behavior',
      'Through positive punishment of obsessive thoughts',
      'Through unconscious conflict resolution between ego and superego'
    ],
    correctIndex: 1,
    explanation: 'Compulsion provides immediate relief from obsessive anxiety. The removal of unpleasant anxiety acts as negative reinforcement, increasing the likelihood of repeating the compulsive ritual.',
    hints: [
      'Removing an unpleasant stimulus strengthens a behavior.',
      'This is the definition of negative reinforcement.',
      'Negative reinforcement via anxiety reduction.'
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'chal_10',
    nodeId: 'c12_psy_cbse_082',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which clinical feature distinguishes Dissociative Fugue from standard Dissociative Amnesia?',
    options: [
      'Fugue involves sudden unexpected travel away from home accompanied by identity confusion or assumption of a new identity.',
      'Fugue involves loss of motor control in limbs without organic pathology.',
      'Fugue is characterized by visual hallucinations.',
      'Fugue only affects procedural memory like riding a bicycle.'
    ],
    correctIndex: 0,
    explanation: 'Dissociative Fugue (now a subtype of Dissociative Amnesia in DSM-5) includes purposeful travel or bewildered wandering associated with amnesia for identity or life history.',
    hints: [
      'Think of travel/flight combined with memory loss.',
      '"Fugue" comes from Latin fugere (to flee).',
      'Sudden unexpected travel and identity confusion.'
    ]
  },
  {
    id: 'chal_11',
    nodeId: 'c12_psy_cbse_083',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'According to Aaron Beck’s Cognitive Therapy model, depression is maintained by cognitive distortions. Which distortion occurs when an individual draws a sweeping negative conclusion based on a single isolated event?',
    options: [
      'Selective Abstraction',
      'Overgeneralization',
      'Personalization',
      'Magnification'
    ],
    correctIndex: 1,
    explanation: 'Overgeneralization occurs when a person assumes that a single negative event (e.g., failing one quiz) signifies a constant pattern of failure across all situations.',
    hints: [
      'Applying one specific bad event to all future situations.',
      'Extrapolating broadly from a single point.',
      'Overgeneralization.'
    ]
  },
  {
    id: 'chal_12',
    nodeId: 'c12_psy_cbse_088',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A patient with Schizophrenia exhibits "Avolition". How does this symptom manifest in daily life?',
    options: [
      'Inability to speak clearly due to word salad',
      'Lack of initiative, drive, or energy to engage in goal-directed activities',
      'Hearing voices commanding action',
      'Believing they possess supernatural powers'
    ],
    correctIndex: 1,
    explanation: 'Avolition is a negative symptom characterized by profound lack of motivation, apathy, and inability to initiate or sustain goal-directed activities.',
    hints: [
      'It is a negative symptom affecting drive and initiative.',
      '"Volition" relates to willpower and goal initiation.',
      'Lack of initiative/drive to perform goal-directed activities.'
    ]
  },
  {
    id: 'chal_13',
    nodeId: 'c12_psy_cbse_098',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Chronic alcoholism leads to severe Vitamin B1 (Thiamine) deficiency, resulting in a neurological disorder marked by severe amnesia and confabulation. This disorder is known as:',
    options: [
      'Wernicke-Korsakoff Syndrome',
      'Bipolar II Disorder',
      'Depersonalization Disorder',
      'Conversion Disorder'
    ],
    correctIndex: 0,
    explanation: 'Wernicke-Korsakoff Syndrome is a neuro-cognitive disorder caused by thiamine deficiency in chronic alcohol use, producing anterograde amnesia and confabulation.',
    hints: [
      'Linked to chronic alcohol toxicity and Vitamin B1 deficiency.',
      'Involves severe memory gaps filled with invented stories (confabulation).',
      'Wernicke-Korsakoff Syndrome.'
    ]
  },
  {
    id: 'chal_14',
    nodeId: 'c12_psy_cbse_104',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In Freud’s Psychodynamic Model, which defense mechanism involves unconsciously attributing one’s own unacceptable thoughts, impulses, or motives onto another person?',
    options: ['Repression', 'Projection', 'Sublimation', 'Displacement'],
    correctIndex: 1,
    explanation: 'Projection is the defense mechanism where individuals attribute their own unacknowledged or unacceptable feelings onto others (e.g., "I don\'t hate him, HE hates me").',
    hints: [
      'Projecting internal unwanted feelings outward onto someone else.',
      'Like a movie projector projecting internal images onto an external screen.',
      'Projection.'
    ]
  },
  {
    id: 'chal_15',
    nodeId: 'c12_psy_cbse_108',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare the scope of DSM-5 and ICD-10. Which statement accurately reflects their main structural difference?',
    options: [
      'DSM-5 covers all medical and physical diseases, whereas ICD-10 is restricted only to mental disorders.',
      'ICD-10 is an international system produced by WHO covering all health conditions, whereas DSM-5 is produced by APA specifically for psychiatric disorders.',
      'DSM-5 uses letters F00-F99, while ICD-10 does not use diagnostic codes.',
      'There are no structural differences between DSM-5 and ICD-10.'
    ],
    correctIndex: 1,
    explanation: 'ICD-10 (produced by WHO) is global and encompasses all physical and mental medical diagnoses. DSM-5 (produced by American Psychiatric Association) focuses specifically on mental disorders.',
    hints: [
      'Think WHO (world health, all diseases) vs APA (psychiatric disorders).',
      'ICD covers medical + psychiatric; DSM focuses on mental disorders.',
      'ICD-10 is global/all health; DSM-5 is psychiatric specific.'
    ]
  },

  // ADVANCED (7)
  {
    id: 'chal_16',
    nodeId: 'c12_psy_cbse_081',
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Differentiate between Somatic Symptom Disorder and Illness Anxiety Disorder (Hypochondriasis):',
    options: [
      'Somatic Symptom Disorder involves actual distressing physical symptoms; Illness Anxiety Disorder involves high anxiety about having an illness with minimal/no physical symptoms.',
      'Illness Anxiety Disorder involves sudden paralysis; Somatic Symptom Disorder involves memory loss.',
      'Somatic Symptom Disorder only occurs in childhood; Illness Anxiety Disorder occurs in elderly.',
      'Both terms mean exact same thing without diagnostic distinction.'
    ],
    correctIndex: 0,
    explanation: 'In Somatic Symptom Disorder, genuine physical symptoms are present and accompanied by excessive distress. In Illness Anxiety Disorder, physical symptoms are absent or minor, but intense pre-occupation with having a serious illness dominates.',
    hints: [
      'Focus on whether prominent physical symptoms are present or absent.',
      'Illness Anxiety = hypochondria (worrying about sick without major physical symptoms).',
      'Somatic Symptom = actual physical symptoms present with disproportionate distress.'
    ]
  },
  {
    id: 'chal_17',
    nodeId: 'c12_psy_cbse_085',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In suicide risk assessment, which combination of factors represents the HIGHEST immediate acute risk?',
    options: [
      'Mild anxiety, high social support, future plans',
      'Explicit suicide plan with lethal means available, severe hopelessness, history of prior attempts, and active substance use',
      'Occasional existential questioning in a healthy teenager',
      'Mild grief following death of a distant relative'
    ],
    correctIndex: 1,
    explanation: 'High acute risk is indicated by a concrete plan with access to lethal means, profound hopelessness, history of past suicide attempts, and disinhibition due to substance abuse.',
    hints: [
      'Look for active lethal means + hopelessness + past history.',
      'Combination of plan, means, past attempts, and substance disinhibition.',
      'Explicit plan, lethal means, hopelessness, prior attempts.'
    ]
  },
  {
    id: 'chal_18',
    nodeId: 'c12_psy_cbse_089',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A patient with Schizophrenia shifts rapidly from one topic to another with no logical connection between sentences (e.g., "The sun is hot... cows eat grass... satellite radio is blue"). This Formal Thought Disorder is known as:',
    options: ['Neologism', 'Loose Associations (Derailment)', 'Clang Association', 'Echolalia'],
    correctIndex: 1,
    explanation: 'Loose associations (or derailment) is a formal thought disorder characterized by rapid shifts from one topic to another without logical continuity or coherence.',
    hints: [
      'Ideas derail from the central theme.',
      'Lack of logical connections between successive phrases.',
      'Loose Associations / Derailment.'
    ]
  },
  {
    id: 'chal_19',
    nodeId: 'c12_psy_cbse_080',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A survivor of a severe motor vehicle crash presents with hypervigilance, intrusive flashbacks, emotional numbing, and sleep disturbances 2 weeks after the event. What is the correct diagnostic classification?',
    options: [
      'Post-Traumatic Stress Disorder (PTSD)',
      'Acute Stress Disorder (ASD)',
      'Adjustment Disorder',
      'Generalized Anxiety Disorder'
    ],
    correctIndex: 1,
    explanation: 'If symptoms occur within 3 days to 1 month after traumatic exposure, the diagnosis is Acute Stress Disorder. If symptoms persist beyond 1 month, it is classified as PTSD.',
    hints: [
      'Pay close attention to the timeframe (2 weeks post-trauma).',
      'Under 1 month post-trauma = Acute Stress Disorder.',
      'Acute Stress Disorder.'
    ]
  },
  {
    id: 'chal_20',
    nodeId: 'c12_psy_cbse_105',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Carl Rogers proposed that psychological incongruence and mental distress arise primarily when:',
    options: [
      'The id overcomes the ego defense mechanisms',
      'Parents provide conditional positive regard, creating conditions of worth that conflict with the self-actualizing tendency',
      'Serotonin reuptake receptors are blocked',
      'Cognitive schemas fail to perform overgeneralization'
    ],
    correctIndex: 1,
    explanation: 'In the Humanistic model, conditional positive regard leads individuals to internalize "conditions of worth", causing a rift (incongruence) between their ideal self and real self.',
    hints: [
      'Rogers emphasized conditions of worth vs unconditional love.',
      'Incongruence between real self and ideal self.',
      'Conditional positive regard creating conditions of worth.'
    ]
  },
  {
    id: 'chal_21',
    nodeId: 'c12_psy_cbse_107',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How does social stigma act as a critical barrier to clinical treatment for psychological disorders in developing nations?',
    options: [
      'Stigma automatically lowers dopamine levels in patients.',
      'Stigma causes self-labeling, shame, discrimination, and fear of social ostracization, leading individuals to delay or avoid seeking professional help.',
      'Stigma alters DSM-5 diagnostic codes.',
      'Stigma speeds up recovery times by forcing self-reliance.'
    ],
    correctIndex: 1,
    explanation: 'Social stigma leads to internalised shame and external discrimination. Individuals delay seeking help to avoid being labeled as "crazy" or ostracized by their family and community.',
    hints: [
      'Consider the social consequences of seeking psychiatric help.',
      'Fear of shame and discrimination delays intervention.',
      'Internalized shame and fear of ostracization preventing treatment.'
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'chal_22',
    nodeId: 'c12_psy_cbse_109',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'In the QPR suicide prevention protocol, what do the letters Q, P, and R stand for in emergency crisis intervention?',
    options: [
      'Question, Persuade, Refer',
      'Quiet, Protect, Restrain',
      'Query, Prescribe, Reassure',
      'Qualify, Prevent, Report'
    ],
    correctIndex: 0,
    explanation: 'QPR stands for Question (ask directly about suicidal thoughts), Persuade (listen without judgment and persuade to accept help), and Refer (connect to professional clinical resources).',
    hints: [
      'Step 1: Ask directly about suicidal thoughts.',
      'Step 2: Persuade them to live and seek help.',
      'Step 3: Refer to professional help.',
      'Question, Persuade, Refer.'
    ]
  }
];

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag_1',
    question: 'A person who experiences persistent, unexplained anxiety without any specific trigger object or situation is suffering from:',
    options: ['Specific Phobia', 'Generalized Anxiety Disorder', 'Panic Disorder', 'Agoraphobia'],
    correctIndex: 1,
    explanation: 'GAD is characterized by chronic, excessive, free-floating worry not tied to a specific object or event.',
    nodeId: 'c12_psy_cbse_075'
  },
  {
    id: 'diag_2',
    question: 'Excessive levels of which neurotransmitter are most strongly linked to the positive symptoms of Schizophrenia according to the Dopamine Hypothesis?',
    options: ['Serotonin', 'GABA', 'Dopamine', 'Acetylcholine'],
    correctIndex: 2,
    explanation: 'Hyperactivity of dopamine (specifically in mesolimbic pathways) is central to the dopamine hypothesis of schizophrenia.',
    nodeId: 'c12_psy_cbse_070'
  },
  {
    id: 'diag_3',
    question: 'False beliefs firmly held despite clear, indisputable evidence to the contrary are termed:',
    options: ['Hallucinations', 'Delusions', 'Compulsions', 'Obsessions'],
    correctIndex: 1,
    explanation: 'Delusions are fixed, false beliefs held despite conflicting evidence. Hallucinations are false sensory perceptions.',
    nodeId: 'c12_psy_cbse_087'
  },
  {
    id: 'diag_4',
    question: 'Which disorder is characterized by alternating episodes of Mania (elation/hyperactivity) and Major Depression?',
    options: ['Major Depressive Disorder', 'Bipolar Disorder', 'Cyclothymic Personality', 'Dysthymia'],
    correctIndex: 1,
    explanation: 'Bipolar disorder involves dramatic mood swings between manic highs and depressive lows.',
    nodeId: 'c12_psy_cbse_084'
  },
  {
    id: 'diag_5',
    question: 'In Dissociative Identity Disorder (DID), an individual exhibits:',
    options: ['Two or more distinct personality states/identities taking control of behavior', 'Paranoid delusions of persecution', 'Memory loss due to severe physical head trauma', 'Complete loss of motor ability in limbs'],
    correctIndex: 0,
    explanation: 'DID is defined by the presence of two or more distinct personality states that alternate in controlling behavior.',
    nodeId: 'c12_psy_cbse_082'
  },
  {
    id: 'diag_6',
    question: 'A disorder marked by significant deficits in social communication, restricted interests, and repetitive behavioral patterns starting in early childhood is:',
    options: ['ADHD', 'Autism Spectrum Disorder (ASD)', 'Conduct Disorder', 'Intellectual Disability'],
    correctIndex: 1,
    explanation: 'Autism Spectrum Disorder is characterized by social communication challenges and repetitive/stereotyped patterns of behavior.',
    nodeId: 'c12_psy_cbse_092'
  },
  {
    id: 'diag_7',
    question: 'Which psychological model emphasizes irrational thoughts, cognitive distortions, and maladaptive schemas as the primary cause of emotional disorders?',
    options: ['Psychodynamic Model', 'Behavioral Model', 'Cognitive Model', 'Humanistic Model'],
    correctIndex: 2,
    explanation: 'The Cognitive Model posits that abnormal behavior is rooted in dysfunctional thinking, irrational beliefs, and cognitive distortions.',
    nodeId: 'c12_psy_cbse_103'
  },
  {
    id: 'diag_8',
    question: 'Under the bio-psycho-social framework, poverty, discrimination, and urban crowding fall under which domain?',
    options: ['Biological domain', 'Psychological domain', 'Socio-Cultural domain', 'Genetic domain'],
    correctIndex: 2,
    explanation: 'Socio-cultural factors include environmental, economic, societal pressures, and cultural norms that influence mental health.',
    nodeId: 'c12_psy_cbse_073'
  }
];

// ==========================================
// SVG DIAGRAM COMPONENTS
// ==========================================

const NeurochemicalBrainDiagram: React.FC<{
  dopamine: string;
  serotonin: string;
  gaba: string;
  norepinephrine: string;
}> = ({ dopamine, serotonin, gaba, norepinephrine }) => {
  const getLevelColor = (level: string) => {
    if (level === 'excessive') return '#ef4444'; // Red
    if (level === 'deficient') return '#3b82f6'; // Blue
    return '#10b981'; // Green (Normal)
  };

  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col items-center">
      <div className="text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
        Neural Pathway & Neurochemical Dynamics Simulator
      </div>
      <svg viewBox="0 0 500 300" className="w-full h-56 max-w-lg drop-shadow-md">
        {/* Brain Silhouette */}
        <path
          d="M 120 180 C 80 180 60 140 80 100 C 100 60 150 40 220 40 C 300 40 380 50 420 100 C 450 140 430 200 380 220 C 340 235 300 220 280 200 C 260 210 240 250 190 250 C 150 250 140 210 120 180 Z"
          fill="#1e293b"
          stroke="#475569"
          strokeWidth="3"
        />

        {/* Limbic System / Amygdala / Hippocampus representation */}
        <ellipse cx="250" cy="140" rx="45" ry="30" fill="#334155" stroke="#64748b" strokeWidth="2" />
        <text x="250" y="144" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">Limbic System</text>

        {/* Frontal Cortex Area */}
        <path d="M 330 60 C 380 80 410 120 400 160" fill="none" stroke="#0ea5e9" strokeWidth="3" strokeDasharray="4 4" />
        <text x="370" y="75" fill="#38bdf8" fontSize="10" fontWeight="bold">Prefrontal Cortex</text>

        {/* Neurotransmitter Nodes & Synaptic Flow */}
        {/* Dopamine Pathway (Yellow/Red) */}
        <path d="M 230 150 Q 300 120 370 100" fill="none" stroke={getLevelColor(dopamine)} strokeWidth="4" />
        <circle cx="370" cy="100" r="7" fill={getLevelColor(dopamine)} className="animate-ping" opacity="0.6" />
        <circle cx="370" cy="100" r="5" fill={getLevelColor(dopamine)} />
        <text x="380" y="105" fill={getLevelColor(dopamine)} fontSize="10" fontWeight="bold">DA ({dopamine})</text>

        {/* Serotonin Pathway (Blue/Purple) */}
        <path d="M 220 190 Q 250 140 250 90" fill="none" stroke={getLevelColor(serotonin)} strokeWidth="4" />
        <circle cx="250" cy="90" r="5" fill={getLevelColor(serotonin)} />
        <text x="250" y="80" fill={getLevelColor(serotonin)} fontSize="10" fontWeight="bold">5-HT ({serotonin})</text>

        {/* GABA Circuit (Green) */}
        <circle cx="230" cy="150" r="8" fill={getLevelColor(gaba)} />
        <text x="175" y="155" fill={getLevelColor(gaba)} fontSize="10" fontWeight="bold">GABA ({gaba})</text>

        {/* Norepinephrine (Orange/Red) */}
        <path d="M 270 160 Q 330 170 380 180" fill="none" stroke={getLevelColor(norepinephrine)} strokeWidth="3" strokeDasharray="2 2" />
        <circle cx="380" cy="180" r="5" fill={getLevelColor(norepinephrine)} />
        <text x="385" y="195" fill={getLevelColor(norepinephrine)} fontSize="10" fontWeight="bold">NE ({norepinephrine})</text>
      </svg>
      <div className="flex flex-wrap gap-4 text-xs mt-2 justify-center">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Normal Baseline</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500"></span> Excessive / Hyperactive</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Deficient / Hypoactive</span>
      </div>
    </div>
  );
};

const FourDsRadarChart: React.FC<{ deviance: number; distress: number; dysfunction: number; danger: number }> = ({
  deviance,
  distress,
  dysfunction,
  danger,
}) => {
  // Map 0-100 values to SVG coordinates
  const center = 120;
  const scale = 0.9;

  // Axis directions: Up (Deviance), Right (Distress), Down (Dysfunction), Left (Danger)
  const getCoords = (dev: number, dis: number, dys: number, dan: number) => {
    const devY = center - (dev * scale);
    const disX = center + (dis * scale);
    const dysY = center + (dys * scale);
    const danX = center - (dan * scale);
    return { devY, disX, dysY, danX };
  };

  const { devY, disX, dysY, danX } = getCoords(deviance, distress, dysfunction, danger);
  const polygonPoints = `${center},${devY} ${disX},${center} ${center},${dysY} ${danX},${center}`;

  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col items-center">
      <div className="text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Four Ds Abnormality Profiler</div>
      <svg viewBox="0 0 240 240" className="w-56 h-56">
        {/* Grid Circles */}
        <circle cx={center} cy={center} r={30} fill="none" stroke="#334155" strokeWidth="1" />
        <circle cx={center} cy={center} r={60} fill="none" stroke="#334155" strokeWidth="1" />
        <circle cx={center} cy={center} r={90} fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />

        {/* Axis Lines */}
        <line x1={center} y1="10" x2={center} y2="230" stroke="#475569" strokeWidth="1.5" />
        <line x1="10" y1={center} x2="230" y2={center} stroke="#475569" strokeWidth="1.5" />

        {/* Labels */}
        <text x={center} y="18" fill="#a855f7" fontSize="11" textAnchor="middle" fontWeight="bold">Deviance ({deviance}%)</text>
        <text x="225" y={center - 5} fill="#ec4899" fontSize="11" textAnchor="end" fontWeight="bold">Distress ({distress}%)</text>
        <text x={center} y="235" fill="#eab308" fontSize="11" textAnchor="middle" fontWeight="bold">Dysfunction ({dysfunction}%)</text>
        <text x="15" y={center - 5} fill="#ef4444" fontSize="11" textAnchor="start" fontWeight="bold">Danger ({danger}%)</text>

        {/* Diagnostic Polygon */}
        <polygon points={polygonPoints} fill="rgba(168, 85, 247, 0.35)" stroke="#c084fc" strokeWidth="2.5" />

        {/* Nodes */}
        <circle cx={center} cy={devY} r="4" fill="#a855f7" />
        <circle cx={disX} cy={center} r="4" fill="#ec4899" />
        <circle cx={center} cy={dysY} r="4" fill="#eab308" />
        <circle cx={danX} cy={center} r="4" fill="#ef4444" />
      </svg>
    </div>
  );
};

const DiathesisStressGraph: React.FC<{ diathesis: number; stress: number }> = ({ diathesis, stress }) => {
  const threshold = 120; // Diathesis + Stress threshold for illness
  const combined = diathesis + stress;
  const isThresholdCrossed = combined >= threshold;

  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col items-center w-full">
      <div className="text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${isThresholdCrossed ? 'bg-red-500 animate-ping' : 'bg-emerald-400'}`}></span>
        Diathesis-Stress Threshold Interactive Graph
      </div>

      <div className="w-full max-w-md h-36 bg-slate-950 rounded-lg p-3 border border-slate-800 flex flex-col justify-between relative overflow-hidden">
        {/* Threshold Line */}
        <div className="absolute left-0 right-0 top-1/3 border-b-2 border-dashed border-red-500 z-10 flex justify-between px-2">
          <span className="text-[10px] bg-red-950 text-red-300 px-1 rounded border border-red-800 font-mono">CLINICAL DISORDER THRESHOLD</span>
        </div>

        {/* Stacked Bar */}
        <div className="flex-1 flex items-end gap-6 justify-center z-0 pt-6">
          {/* Diathesis Bar */}
          <div className="w-20 flex flex-col items-center">
            <div
              className="w-full bg-gradient-to-t from-indigo-700 to-indigo-500 rounded-t transition-all duration-300 flex items-center justify-center text-xs text-white font-bold"
              style={{ height: `${(diathesis / 100) * 100}px` }}
            >
              {diathesis}
            </div>
            <span className="text-[11px] text-indigo-300 font-medium mt-1">Diathesis (Bio/Genetic)</span>
          </div>

          <span className="text-xl font-bold text-slate-500 mb-4">+</span>

          {/* Stress Bar */}
          <div className="w-20 flex flex-col items-center">
            <div
              className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-t transition-all duration-300 flex items-center justify-center text-xs text-slate-950 font-bold"
              style={{ height: `${(stress / 100) * 100}px` }}
            >
              {stress}
            </div>
            <span className="text-[11px] text-amber-300 font-medium mt-1">Environmental Stress</span>
          </div>

          <span className="text-xl font-bold text-slate-500 mb-4">=</span>

          {/* Total Combined Bar */}
          <div className="w-24 flex flex-col items-center">
            <div
              className={`w-full rounded-t transition-all duration-300 flex items-center justify-center text-xs font-bold text-white ${
                isThresholdCrossed ? 'bg-gradient-to-t from-red-700 to-red-500' : 'bg-gradient-to-t from-emerald-700 to-emerald-500'
              }`}
              style={{ height: `${(combined / 200) * 120}px` }}
            >
              {combined} / 200
            </div>
            <span className={`text-[11px] font-bold mt-1 ${isThresholdCrossed ? 'text-red-400' : 'text-emerald-400'}`}>
              {isThresholdCrossed ? 'DISORDER ONSET' : 'HEALTHY STATE'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN SIMULATION COMPONENT
// ==========================================

export const C12_PsyPsychologicalDisordersCBSESim: React.FC<{
  onComplete?: (score: number) => void;
}> = ({ onComplete }) => {
  // Tabs: discovery | lab | challenges | diagnostic | summary
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'diagnostic' | 'summary'>('discovery');

  // Interactive Lab State
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);

  // Four Ds Sliders
  const [sliderDeviance, setSliderDeviance] = useState<number>(65);
  const [sliderDistress, setSliderDistress] = useState<number>(70);
  const [sliderDysfunction, setSliderDysfunction] = useState<number>(80);
  const [sliderDanger, setSliderDanger] = useState<number>(30);

  // Diathesis-Stress Sliders
  const [diathesisVal, setDiathesisVal] = useState<number>(60);
  const [stressVal, setStressVal] = useState<number>(75);

  // Neurochemistry State
  const [dopamine, setDopamine] = useState<'normal' | 'excessive' | 'deficient'>('normal');
  const [serotonin, setSerotonin] = useState<'normal' | 'excessive' | 'deficient'>('deficient');
  const [gaba, setGaba] = useState<'normal' | 'excessive' | 'deficient'>('deficient');
  const [norepinephrine, setNorepinephrine] = useState<'normal' | 'excessive' | 'deficient'>('normal');

  // Case Diagnostic Profiler State
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case_1');
  const selectedCase = useMemo(() => PATIENT_CASES.find(c => c.id === selectedCaseId) || PATIENT_CASES[0], [selectedCaseId]);

  // Model Matcher State
  const [selectedModel, setSelectedModel] = useState<'Biological' | 'Psychodynamic' | 'Behavioral' | 'Cognitive' | 'Humanistic' | 'Socio-Cultural'>('Cognitive');

  // Gamification & Pedagogical State
  const [bktNodes, setBktNodes] = useState<NodeMasteryMap>(() => {
    const initial: NodeMasteryMap = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<SRSMap>(() => {
    const initial: SRSMap = {};
    CHALLENGES.forEach(c => {
      initial[c.id] = createReviewItem(c.id);
    });
    return initial;
  });

  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Discovery / Prediction & Observation state
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);

  // Diagnostic Quiz State
  const [diagIdx, setDiagIdx] = useState<number>(0);
  const [diagSelected, setDiagSelected] = useState<number | null>(null);
  const [diagScore, setDiagScore] = useState<number>(0);
  const [diagFinished, setDiagFinished] = useState<boolean>(false);

  // Audio / Visual Feedback state
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintText, setCurrentHintText] = useState<string>('');
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sound helper wrappers
  const playSound = useCallback((soundName: SoundEffect | 'success' | 'error' | 'celebration' | 'hint' | 'pickup' | 'drop-correct' | 'drop-wrong' | 'whoosh' | 'sparkle' | 'chime' | 'pop' | 'count' | 'balance' | 'swoop') => {
    try {
      audioManager.play(soundName);
    } catch {
      // Audio safety fallback
    }
  }, []);

  const speakText = useCallback((text: string) => {
    try {
      speechManager.speak(text);
    } catch {
      // Speech safety fallback
    }
  }, []);

  // Inactivity auto-hint timer (10 seconds)
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && CHALLENGES[currentChallengeIdx]) {
        const hint = CHALLENGES[currentChallengeIdx].hints[0];
        setCurrentHintText(hint);
        setShowHint(true);
        playSound('hint');
        speakText(`Hint: ${hint}`);
      }
    }, 10000);
  }, [activeTab, currentChallengeIdx, playSound, speakText]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIdx, activeTab, resetInactivityTimer]);

  // Handle Challenge Submission
  const handleAnswerChallenge = (optIdx: number) => {
    if (showExplanation) return; // prevent double submit
    setSelectedOptionIndex(optIdx);
    const chal = CHALLENGES[currentChallengeIdx];
    const isCorrect = optIdx === chal.correctIndex;

    // Update BKT & SRS
    const updatedBKT = bktUpdate(bktNodes[chal.nodeId] || createBKTState(), isCorrect);
    setBktNodes(prev => ({ ...prev, [chal.nodeId]: updatedBKT }));

    const updatedSRS = sm2Update(srsItems[chal.id] || createReviewItem(chal.id), isCorrect ? 5 : 1);
    setSrsItems(prev => ({ ...prev, [chal.id]: updatedSRS }));

    if (isCorrect) {
      playSound('drop-correct');
      playSound('sparkle');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1200);
      setChallengeScore(prev => prev + 10);
      if (!completedChallenges.includes(chal.id)) {
        setCompletedChallenges(prev => [...prev, chal.id]);
      }
      speakText('Correct answer! Outstanding clinical reasoning.');
    } else {
      playSound('drop-wrong');
      playSound('error');
      speakText('Incorrect. Review the clinical explanation below.');
    }

    setShowExplanation(true);
  };

  const handleNextChallenge = () => {
    setShowExplanation(false);
    setSelectedOptionIndex(null);
    setShowHint(false);
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx(prev => prev + 1);
      playSound('swoop');
    } else {
      // Completed all challenges!
      setShowConfetti(true);
      setShowSuccess(true);
      playSound('celebration');
      speakText('Congratulations! You have completed all diagnostic challenges for Psychological Disorders.');
      recordGameScore('C12_PsyPsychologicalDisordersCBSESim', challengeScore + 50);
      if (onComplete) onComplete(challengeScore + 50);
    }
  };

  // Helper for neurochemical state summary
  const getNeurochemicalDiagnosticLabel = () => {
    if (dopamine === 'excessive') return 'Psychotic Spectrum Risk (Excessive Dopamine)';
    if (serotonin === 'deficient' && norepinephrine === 'deficient') return 'Major Depressive Episode Profile (Monoamine Deficit)';
    if (gaba === 'deficient') return 'Anxiety / Panic Disorder Profile (GABA Deficiency)';
    return 'Balanced Neurochemical State';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 flex flex-col gap-6 relative overflow-hidden">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Diagnostic Mastery Achieved! Excellent work!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
      <HintBubble show={showHint} text={currentHintText} />

      {/* HEADER BAR */}
      <header className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-purple-900/40">
            Ψ
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              Psychological Disorders Clinical Suite
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              CISCE Class 12 Psychology | Interactive Assessment & Bio-Psycho-Social Lab
            </p>
          </div>
        </div>

        {/* Global Progress & Score */}
        <div className="flex items-center gap-4 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800">
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Diagnostic Mastery Score</div>
            <div className="text-lg font-black text-amber-400 font-mono">{challengeScore} pts</div>
          </div>
          <div className="h-8 w-px bg-slate-800"></div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Challenges</div>
            <div className="text-sm font-bold text-cyan-400">{completedChallenges.length} / {CHALLENGES.length}</div>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="flex flex-wrap gap-2 bg-slate-900/90 p-2 rounded-xl border border-slate-800 shadow-md">
        {[
          { id: 'discovery', label: '1. Discovery & Scenario', icon: '🔍' },
          { id: 'lab', label: '2. Interactive Exploration Labs', icon: '🧪' },
          { id: 'challenges', label: '3. Clinical Challenges (22)', icon: '🎯' },
          { id: 'diagnostic', label: '4. Diagnostic Quiz (8)', icon: '📋' },
          { id: 'summary', label: '5. Summary & Real World', icon: '🌐' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as typeof activeTab);
              playSound('tap');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/30 font-bold scale-[1.02]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* TAB 1: DISCOVERY & NARRATIVE SCENARIO */}
      {activeTab === 'discovery' && (
        <section className="flex flex-col gap-6 animate-fadeIn">
          {/* Scenario Hero Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
            <h2 className="text-2xl font-bold text-purple-300 mb-2 flex items-center gap-2">
              <span>🏥</span> {SCENARIO.title}
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-4">{SCENARIO.intro}</p>
            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl text-xs sm:text-sm text-slate-300">
              <strong className="text-cyan-400">Clinical Objective: </strong> {SCENARIO.context}
            </div>
          </div>

          {/* Discovery Counterintuitive Question */}
          <div className="bg-slate-900 border border-purple-900/40 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm tracking-wide uppercase">
              <span>💡</span> Discovery Thought Experiment
            </div>
            <h3 className="text-lg font-bold text-white leading-snug">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 gap-3 mt-2">
              {DISCOVERY_QUESTION.options.map((opt, idx) => {
                let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-purple-500/50 hover:bg-slate-800/50';
                if (discoveryAnswered) {
                  if (idx === DISCOVERY_QUESTION.correctIndex) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                  } else if (idx === discoverySelected) {
                    btnStyle = 'bg-red-950/80 border-red-500 text-red-300';
                  }
                }
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!discoveryAnswered) {
                        setDiscoverySelected(idx);
                        setDiscoveryAnswered(true);
                        if (idx === DISCOVERY_QUESTION.correctIndex) {
                          playSound('drop-correct');
                          speakText('Excellent discovery! You correctly identified the Diathesis-Stress interaction model.');
                        } else {
                          playSound('drop-wrong');
                        }
                      }
                    }}
                    className={`p-4 rounded-xl border text-left text-sm transition-all duration-200 ${btnStyle}`}
                  >
                    <span className="font-mono mr-2 text-purple-400 font-bold">[{String.fromCharCode(65 + idx)}]</span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {discoveryAnswered && (
              <div className="mt-4 p-4 rounded-xl bg-purple-950/40 border border-purple-800/50 text-purple-200 text-xs sm:text-sm leading-relaxed animate-fadeIn">
                <strong className="text-purple-300 font-bold">Clinical Insight: </strong>
                {DISCOVERY_QUESTION.hintAfter}
              </div>
            )}
          </div>

          {/* Prediction Questions Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
            <h3 className="text-xl font-bold text-cyan-300 flex items-center gap-2">
              <span>🔮</span> Hypothesis & Prediction Tasks
            </h3>

            {PREDICTION_QUESTIONS.map((pq, qIdx) => (
              <div key={qIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Prediction #{qIdx + 1}</div>
                <div className="text-sm font-semibold text-slate-200">{pq.question}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pq.options.map((opt, oIdx) => {
                    const selected = predictionAnswers[qIdx] === oIdx;
                    const isCorrect = oIdx === pq.correctIndex;
                    let style = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-cyan-500/50';
                    if (predictionAnswers[qIdx] !== null) {
                      if (isCorrect) style = 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold';
                      else if (selected) style = 'bg-red-950 border-red-500 text-red-300';
                    }
                    return (
                      <button
                        key={oIdx}
                        onClick={() => {
                          const updated = [...predictionAnswers];
                          updated[qIdx] = oIdx;
                          setPredictionAnswers(updated);
                          if (oIdx === pq.correctIndex) playSound('drop-correct');
                          else playSound('drop-wrong');
                        }}
                        className={`p-3 text-xs rounded-lg border text-left transition-all ${style}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {predictionAnswers[qIdx] !== null && (
                  <div className="text-xs text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-800 italic">
                    💡 Verification instruction: {pq.verifyInstruction}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 2: INTERACTIVE EXPLORATION LABS */}
      {activeTab === 'lab' && (
        <section className="flex flex-col gap-6 animate-fadeIn">
          {/* Lab Selection Buttons */}
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveLabIndex(idx);
                  playSound('tap');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeLabIndex === idx
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40 scale-105'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>

          {/* Current Active Exploration Lab */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest font-mono">
                LAB MODULE {activeLabIndex + 1} OF 5
              </span>
              <h2 className="text-xl font-extrabold text-white mt-1">
                {EXPLORATION_STEPS[activeLabIndex].title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                {EXPLORATION_STEPS[activeLabIndex].instruction}
              </p>
            </div>

            {/* LAB INTERACTIVE CONTENT SWITCHER */}
            {activeLabIndex === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                {/* Visualizer */}
                <FourDsRadarChart
                  deviance={sliderDeviance}
                  distress={sliderDistress}
                  dysfunction={sliderDysfunction}
                  danger={sliderDanger}
                />

                {/* Controls & Diagnosis */}
                <div className="flex flex-col gap-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <h4 className="text-sm font-bold text-purple-300 uppercase tracking-wider">Adjust Four Ds Parameters</h4>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                      <span>Deviance (Social Norm Deviation)</span>
                      <span className="text-purple-400 font-bold">{sliderDeviance}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderDeviance}
                      onChange={e => setSliderDeviance(Number(e.target.value))}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                      <span>Distress (Personal Suffering)</span>
                      <span className="text-pink-400 font-bold">{sliderDistress}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderDistress}
                      onChange={e => setSliderDistress(Number(e.target.value))}
                      className="w-full accent-pink-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                      <span>Dysfunction (Daily Impairment)</span>
                      <span className="text-yellow-400 font-bold">{sliderDysfunction}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderDysfunction}
                      onChange={e => setSliderDysfunction(Number(e.target.value))}
                      className="w-full accent-yellow-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                      <span>Danger (Risk of Harm to Self/Others)</span>
                      <span className="text-red-400 font-bold">{sliderDanger}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderDanger}
                      onChange={e => setSliderDanger(Number(e.target.value))}
                      className="w-full accent-red-500 cursor-pointer"
                    />
                  </div>

                  <div className="mt-2 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                    <span className="text-slate-400">Clinical Evaluation: </span>
                    <strong className="text-cyan-300">
                      {sliderDeviance + sliderDistress + sliderDysfunction + sliderDanger > 220
                        ? 'High Clinical Abnormality Threshold Exceeded (Clinical Intervention Warranted)'
                        : 'Sub-clinical or Normative Variance Range'}
                    </strong>
                  </div>
                </div>
              </div>
            )}

            {activeLabIndex === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                <DiathesisStressGraph diathesis={diathesisVal} stress={stressVal} />

                <div className="flex flex-col gap-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <h4 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">Diathesis-Stress Variables</h4>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Diathesis (Genetic/Biological Vulnerability)</span>
                      <span className="text-indigo-400 font-bold">{diathesisVal}</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={diathesisVal}
                      onChange={e => setDiathesisVal(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Environmental Stress Load (Trauma, Loss, Overload)</span>
                      <span className="text-amber-400 font-bold">{stressVal}</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={stressVal}
                      onChange={e => setStressVal(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <strong>Rule of Interactive Etiology: </strong>
                    {diathesisVal > 70
                      ? 'High innate vulnerability means even standard day-to-day hassles can trigger symptom manifestation.'
                      : 'Low genetic vulnerability provides high psychological buffer capacity against acute environmental stress.'}
                  </div>
                </div>
              </div>
            )}

            {activeLabIndex === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                <NeurochemicalBrainDiagram
                  dopamine={dopamine}
                  serotonin={serotonin}
                  gaba={gaba}
                  norepinephrine={norepinephrine}
                />

                <div className="flex flex-col gap-3 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider">Neurotransmitter Modulation Controls</h4>

                  {[
                    { label: 'Dopamine (Motivation & Reality Testing)', state: dopamine, setter: setDopamine },
                    { label: 'Serotonin (Mood & Sleep Regulation)', state: serotonin, setter: setSerotonin },
                    { label: 'GABA (Central Nervous Inhibition)', state: gaba, setter: setGaba },
                    { label: 'Norepinephrine (Fight-or-Flight System)', state: norepinephrine, setter: setNorepinephrine },
                  ].map((nt, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                      <span className="text-slate-300 font-medium">{nt.label}</span>
                      <div className="flex gap-1">
                        {(['deficient', 'normal', 'excessive'] as const).map(mode => (
                          <button
                            key={mode}
                            onClick={() => {
                              nt.setter(mode);
                              playSound('pop');
                            }}
                            className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                              nt.state === mode
                                ? mode === 'excessive'
                                  ? 'bg-red-600 text-white'
                                  : mode === 'deficient'
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-emerald-600 text-white'
                                : 'bg-slate-900 text-slate-400 hover:text-white'
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="mt-2 p-3 bg-cyan-950/40 border border-cyan-800/50 rounded-lg text-xs text-cyan-200">
                    <strong>Predicted Neuro-Clinical State: </strong>
                    {getNeurochemicalDiagnosticLabel()}
                  </div>
                </div>
              </div>
            )}

            {activeLabIndex === 3 && (
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {PATIENT_CASES.map(c => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedCaseId(c.id);
                        playSound('tap');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        selectedCaseId === c.id
                          ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
                          : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {c.name} ({c.age} yrs)
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="flex flex-col gap-3">
                    <h4 className="text-base font-bold text-purple-300">{selectedCase.name} — Presenting Case File</h4>
                    <p className="text-xs text-slate-300"><strong>Clinical History: </strong>{selectedCase.history}</p>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Observed Symptoms:</span>
                      <ul className="list-disc list-inside text-xs text-slate-300 mt-1 space-y-1">
                        {selectedCase.presentingSymptoms.map((sym, i) => (
                          <li key={i}>{sym}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 bg-slate-900 p-4 rounded-lg border border-slate-800">
                    <h5 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Multi-Axial Differential Diagnosis</h5>
                    <div className="text-xs flex flex-col gap-2 text-slate-300">
                      <div><strong className="text-slate-400">Diagnostic Category: </strong>{selectedCase.primaryCategory}</div>
                      <div><strong className="text-purple-400">DSM-5 Classification: </strong>{selectedCase.dsm5Code}</div>
                      <div><strong className="text-emerald-400">ICD-10 Classification: </strong>{selectedCase.icd10Code}</div>
                      <div><strong className="text-amber-400">Target Treatment Model: </strong>{selectedCase.suggestedModel} Model</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeLabIndex === 4 && (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(['Biological', 'Psychodynamic', 'Behavioral', 'Cognitive', 'Humanistic', 'Socio-Cultural'] as const).map(mod => (
                    <button
                      key={mod}
                      onClick={() => {
                        setSelectedModel(mod);
                        playSound('pop');
                      }}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                        selectedModel === mod
                          ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {mod} Model
                    </button>
                  ))}
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed flex flex-col gap-3">
                  <h4 className="text-lg font-bold text-indigo-300">{selectedModel} Perspective on Psychological Disorders</h4>
                  {selectedModel === 'Biological' && (
                    <p>Root Cause: Structural brain abnormalities, neurochemical imbalances (Dopamine, Serotonin, GABA), and genetic vulnerabilities.<br/>Primary Intervention: Psychopharmacology (antipsychotics, SSRIs, anxiolytics) and ECT.</p>
                  )}
                  {selectedModel === 'Psychodynamic' && (
                    <p>Root Cause: Unconscious conflicts between Id, Ego, and Superego; repressed childhood traumas and maladaptive defense mechanisms.<br/>Primary Intervention: Psychoanalysis, free association, dream analysis, and resolving transference.</p>
                  )}
                  {selectedModel === 'Behavioral' && (
                    <p>Root Cause: Maladaptive behaviors learned through Classical Conditioning, Operant Conditioning, and Observational Learning.<br/>Primary Intervention: Systematic desensitization, flooding, aversion therapy, and token economy.</p>
                  )}
                  {selectedModel === 'Cognitive' && (
                    <p>Root Cause: Dysfunctional cognitive schemas, automatic negative thoughts, and cognitive distortions (Beck’s Triad, Ellis’s ABC model).<br/>Primary Intervention: Cognitive Restructuring, CBT, identifying and disputing irrational beliefs.</p>
                  )}
                  {selectedModel === 'Humanistic' && (
                    <p>Root Cause: Incongruence between actual self and ideal self caused by conditional positive regard and blocked self-actualization.<br/>Primary Intervention: Client-Centered Therapy, unconditional positive regard, empathy, and active listening.</p>
                  )}
                  {selectedModel === 'Socio-Cultural' && (
                    <p>Root Cause: Societal stressors, poverty, discrimination, family system breakdown, and cultural labeling/stigma.<br/>Primary Intervention: Family therapy, community mental health intervention, advocacy, and social reform.</p>
                  )}
                </div>
              </div>
            )}

            {/* Observation Questions Rendered inside Lab tab */}
            <div className="mt-4 pt-6 border-t border-slate-800 flex flex-col gap-4">
              <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
                <span>👁️</span> Empirical Observation Checks
              </h3>
              {OBSERVATION_QUESTIONS.map((oq, oqIdx) => (
                <div key={oqIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Observation #{oqIdx + 1}</div>
                  <div className="text-sm text-slate-200">{oq.question}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {oq.observableOptions.map((opt, optIdx) => {
                      const selected = observationAnswers[oqIdx] === optIdx;
                      const isCorrect = optIdx === oq.correctIndex;
                      let style = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-emerald-500/50';
                      if (observationAnswers[oqIdx] !== null) {
                        if (isCorrect) style = 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold';
                        else if (selected) style = 'bg-red-950 border-red-500 text-red-300';
                      }
                      return (
                        <button
                          key={optIdx}
                          onClick={() => {
                            const updated = [...observationAnswers];
                            updated[oqIdx] = optIdx;
                            setObservationAnswers(updated);
                            if (optIdx === oq.correctIndex) playSound('drop-correct');
                            else playSound('drop-wrong');
                          }}
                          className={`p-3 text-xs rounded-lg border text-left transition-all ${style}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: CLINICAL CHALLENGES (22 ITEMS) */}
      {activeTab === 'challenges' && (
        <section className="flex flex-col gap-6 animate-fadeIn">
          {/* Challenge Progress Header */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-wrap justify-between items-center gap-4">
            <div>
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest font-mono">
                CHALLENGE {currentChallengeIdx + 1} OF {CHALLENGES.length}
              </span>
              <h2 className="text-lg font-bold text-white">
                Tier: <span className="capitalize text-indigo-400">{CHALLENGES[currentChallengeIdx].difficulty}</span> | Competency: <span className="capitalize text-cyan-400">{CHALLENGES[currentChallengeIdx].competencyLevel}</span>
              </h2>
            </div>

            <div className="flex gap-2">
              <button
                disabled={currentChallengeIdx === 0}
                onClick={() => {
                  setCurrentChallengeIdx(prev => Math.max(0, prev - 1));
                  setShowExplanation(false);
                  setSelectedOptionIndex(null);
                  playSound('swoop');
                }}
                className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-bold text-slate-300 disabled:opacity-40 hover:bg-slate-800"
              >
                ← Prev
              </button>
              <button
                disabled={currentChallengeIdx === CHALLENGES.length - 1}
                onClick={() => {
                  setCurrentChallengeIdx(prev => Math.min(CHALLENGES.length - 1, prev + 1));
                  setShowExplanation(false);
                  setSelectedOptionIndex(null);
                  playSound('swoop');
                }}
                className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-bold text-slate-300 disabled:opacity-40 hover:bg-slate-800"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Current Challenge Card */}
          <div className="bg-slate-900 border border-purple-900/40 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
            <h3 className="text-lg sm:text-xl font-bold text-slate-100 leading-relaxed">
              {CHALLENGES[currentChallengeIdx].question}
            </h3>

            {/* Multiple Choice Options */}
            <div className="grid grid-cols-1 gap-3">
              {CHALLENGES[currentChallengeIdx].options?.map((option, optIdx) => {
                let btnStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-purple-500/60 hover:bg-slate-800/40';
                if (showExplanation) {
                  if (optIdx === CHALLENGES[currentChallengeIdx].correctIndex) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                  } else if (optIdx === selectedOptionIndex) {
                    btnStyle = 'bg-red-950/80 border-red-500 text-red-300';
                  }
                }
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleAnswerChallenge(optIdx)}
                    disabled={showExplanation}
                    className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-between ${btnStyle}`}
                  >
                    <span>
                      <strong className="text-purple-400 font-mono mr-2">[{String.fromCharCode(65 + optIdx)}]</strong>
                      {option}
                    </span>
                    {showExplanation && optIdx === CHALLENGES[currentChallengeIdx].correctIndex && (
                      <span className="text-emerald-400 font-bold text-sm">✓ Correct</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Hint Box */}
            {showExplanation && (
              <div className="p-4 rounded-xl bg-slate-950 border border-purple-800/60 flex flex-col gap-3 animate-fadeIn">
                <div className="text-xs font-bold text-purple-300 uppercase tracking-wider">Clinical Rationale & Explanation:</div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {CHALLENGES[currentChallengeIdx].explanation}
                </p>

                {/* Misconception Alert if applicable */}
                {CHALLENGES[currentChallengeIdx].misconceptionIndex !== undefined && (
                  <div className="p-3 bg-amber-950/40 border border-amber-800/50 rounded-lg text-xs text-amber-200 mt-1">
                    <strong className="text-amber-300">Common Misconception Clarification: </strong>
                    {MISCONCEPTIONS[CHALLENGES[currentChallengeIdx].misconceptionIndex!].correction}
                  </div>
                )}

                <button
                  onClick={handleNextChallenge}
                  className="mt-2 self-end px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition-all transform hover:scale-105"
                >
                  {currentChallengeIdx < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Finish Challenges 🎉'}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* TAB 4: DIAGNOSTIC QUIZ (8 ITEMS) */}
      {activeTab === 'diagnostic' && (
        <section className="flex flex-col gap-6 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
                  DIAGNOSTIC QUESTION {diagIdx + 1} OF {DIAGNOSTIC_QUESTIONS.length}
                </span>
                <h2 className="text-xl font-bold text-white mt-1">Class 12 Comprehensive Diagnostic Evaluation</h2>
              </div>
              <div className="text-xs font-bold text-amber-400 bg-amber-950/50 px-3 py-1.5 rounded-lg border border-amber-800">
                Score: {diagScore} / {DIAGNOSTIC_QUESTIONS.length}
              </div>
            </div>

            {!diagFinished ? (
              <div className="flex flex-col gap-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-200">
                  {DIAGNOSTIC_QUESTIONS[diagIdx].question}
                </h3>

                <div className="grid grid-cols-1 gap-3">
                  {DIAGNOSTIC_QUESTIONS[diagIdx].options.map((opt, oIdx) => {
                    let style = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-cyan-500/60';
                    if (diagSelected !== null) {
                      if (oIdx === DIAGNOSTIC_QUESTIONS[diagIdx].correctIndex) style = 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold';
                      else if (oIdx === diagSelected) style = 'bg-red-950 border-red-500 text-red-300';
                    }
                    return (
                      <button
                        key={oIdx}
                        disabled={diagSelected !== null}
                        onClick={() => {
                          setDiagSelected(oIdx);
                          if (oIdx === DIAGNOSTIC_QUESTIONS[diagIdx].correctIndex) {
                            setDiagScore(s => s + 1);
                            playSound('drop-correct');
                          } else {
                            playSound('drop-wrong');
                          }
                        }}
                        className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all ${style}`}
                      >
                        <strong className="text-cyan-400 mr-2 font-mono">[{String.fromCharCode(65 + oIdx)}]</strong>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {diagSelected !== null && (
                  <div className="mt-4 p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col gap-3">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <strong>Clinical Explanation: </strong>
                      {DIAGNOSTIC_QUESTIONS[diagIdx].explanation}
                    </p>
                    <button
                      onClick={() => {
                        setDiagSelected(null);
                        if (diagIdx < DIAGNOSTIC_QUESTIONS.length - 1) {
                          setDiagIdx(i => i + 1);
                        } else {
                          setDiagFinished(true);
                          playSound('celebration');
                          speakText(`Diagnostic exam completed! You scored ${diagScore + (diagSelected === DIAGNOSTIC_QUESTIONS[diagIdx].correctIndex ? 1 : 0)} out of ${DIAGNOSTIC_QUESTIONS.length}.`);
                        }
                      }}
                      className="self-end px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs sm:text-sm rounded-lg shadow-md transition-all"
                    >
                      {diagIdx < DIAGNOSTIC_QUESTIONS.length - 1 ? 'Next Question →' : 'Complete Diagnostic Exam 🎉'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center flex flex-col items-center gap-4 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-4xl">🏆</div>
                <h3 className="text-2xl font-extrabold text-white">Diagnostic Exam Completed</h3>
                <p className="text-slate-300 text-sm">
                  Final Score: <strong className="text-amber-400 font-mono text-lg">{diagScore} / {DIAGNOSTIC_QUESTIONS.length}</strong>
                </p>
                <button
                  onClick={() => {
                    setDiagIdx(0);
                    setDiagScore(0);
                    setDiagSelected(null);
                    setDiagFinished(false);
                  }}
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all"
                >
                  Retake Diagnostic Evaluation
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* TAB 5: SUMMARY & REAL WORLD EXTENSION ACTIVITY */}
      {activeTab === 'summary' && (
        <section className="flex flex-col gap-6 animate-fadeIn">
          {/* Misconceptions Clarification Matrix */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <h3 className="text-xl font-bold text-amber-300 flex items-center gap-2">
              <span>⚠️</span> Major Misconception Buster Matrix
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISCONCEPTIONS.map(m => (
                <div key={m.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-2">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">{m.title}</div>
                  <div className="text-xs text-red-300">❌ <strong>Common Myth: </strong>{m.misconception}</div>
                  <div className="text-xs text-emerald-300 leading-relaxed">✅ <strong>Scientific Fact: </strong>{m.correction}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Real World Extension Activity Rendered */}
          <div className="bg-slate-900 border border-indigo-900/50 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <h3 className="text-xl font-bold text-indigo-300 flex items-center gap-2">
              <span>🌐</span> Real-World Extension Activity
            </h3>
            <h4 className="text-lg font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

            <div className="mt-2 flex flex-col gap-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Step-by-Step Practical Guidelines:</span>
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <span className="w-6 h-6 rounded-full bg-indigo-600/40 text-indigo-300 font-bold flex items-center justify-center shrink-0 border border-indigo-500 text-xs">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Final Node Mastery Summary */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <h3 className="text-xl font-bold text-cyan-300 flex items-center gap-2">
              <span>📊</span> ISC Topic Mastery Status ({ALL_NODE_IDS.length} Nodes Covered)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-60 overflow-y-auto p-2 bg-slate-950 rounded-xl border border-slate-800">
              {ALL_NODE_IDS.map(nodeId => {
                const bkt = bktNodes[nodeId] || createBKTState();
                const level = getMasteryLevel(bkt);
                return (
                  <div key={nodeId} className="p-2 bg-slate-900 rounded border border-slate-800 text-[10px] flex flex-col items-center">
                    <span className="font-mono text-slate-400 font-bold">{nodeId}</span>
                    <span className={`font-bold mt-1 uppercase ${level === 'mastered' ? 'text-emerald-400' : level === 'proficient' ? 'text-amber-400' : 'text-slate-500'}`}>
                      {level}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="mt-6 text-center text-xs text-slate-500 border-t border-slate-900 pt-4">
        CISCE Class 12 Psychology Diagnostic Suite • Psychological Disorders Interactive Lab • All 46 CBSE/ISC Nodes Integrated
      </footer>
    </div>
  );
};

export default C12_PsyPsychologicalDisordersCBSESim;