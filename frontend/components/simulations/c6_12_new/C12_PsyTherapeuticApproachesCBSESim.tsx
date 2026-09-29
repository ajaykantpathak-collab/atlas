'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst, type SoundEffect } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// NODE DEFINITIONS & CONSTANTS
// ==========================================
const ALL_NODE_IDS = [
  'c12_psy_cbse_168',
  'c12_psy_cbse_169',
  'c12_psy_cbse_170',
  'c12_psy_cbse_171',
  'c12_psy_cbse_172',
  'c12_psy_cbse_173',
  'c12_psy_cbse_174',
  'c12_psy_cbse_175',
  'c12_psy_cbse_176',
  'c12_psy_cbse_177',
  'c12_psy_cbse_178',
  'c12_psy_cbse_179',
  'c12_psy_cbse_180',
  'c12_psy_cbse_181',
  'c12_psy_cbse_182',
  'c12_psy_cbse_183',
  'c12_psy_cbse_184',
  'c12_psy_cbse_185',
  'c12_psy_cbse_186',
  'c12_psy_cbse_187',
  'c12_psy_cbse_188',
  'c12_psy_cbse_189',
  'c12_psy_cbse_190',
  'c12_psy_cbse_191',
  'c12_psy_cbse_192',
  'c12_psy_cbse_193',
  'c12_psy_cbse_194',
  'c12_psy_cbse_195',
  'c12_psy_cbse_196',
  'c12_psy_cbse_197',
  'c12_psy_cbse_198',
  'c12_psy_cbse_199',
  'c12_psy_cbse_200',
  'c12_psy_cbse_201',
  'c12_psy_cbse_202',
  'c12_psy_cbse_203',
  'c12_psy_cbse_204',
  'c12_psy_cbse_205',
  'c12_psy_cbse_206',
  'c12_psy_cbse_207',
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

interface NodeInfo {
  id: NodeId;
  title: string;
  category: 'Foundation' | 'Behavioural' | 'Cognitive' | 'Humanistic' | 'Alternative & Rehab';
  definition: string;
  eli5: string;
  clinicalExample: string;
}

const NODE_DICTIONARY: Record<NodeId, NodeInfo> = {
  c12_psy_cbse_168: {
    id: 'c12_psy_cbse_168',
    title: 'Psychotherapy: Nature and Process',
    category: 'Foundation',
    definition: 'A purposeful, voluntary interpersonal interaction between a trained therapist and a client experiencing psychological distress to facilitate adaptive changes.',
    eli5: 'A structured therapeutic dynamic where a trained professional helps a person resolve emotional pain and self-defeating habits.',
    clinicalExample: 'A client attending weekly sessions to understand and resolve persistent clinical anxiety.',
  },
  c12_psy_cbse_169: {
    id: 'c12_psy_cbse_169',
    title: 'Goals of Psychotherapy',
    category: 'Foundation',
    definition: 'Specific therapeutic objectives including reducing emotional distress, changing maladaptive behavior, improving personal relationships, and promoting self-actualisation.',
    eli5: 'The target outcomes of therapy: feeling better, thinking clearer, building healthier habits, and reaching your potential.',
    clinicalExample: 'Decreasing panic attack frequency while expanding social engagement.',
  },
  c12_psy_cbse_170: {
    id: 'c12_psy_cbse_170',
    title: 'Characteristics of Psychotherapy',
    category: 'Foundation',
    definition: 'Core features of therapeutic interactions: voluntary participation, structured setting, confidentiality, and evidence-based interventions.',
    eli5: 'What makes therapy unique: safety, strict privacy, professional boundary, and systematically planned steps.',
    clinicalExample: 'Maintaining consistent 50-minute clinical sessions governed by clear boundary rules.',
  },
  c12_psy_cbse_171: {
    id: 'c12_psy_cbse_171',
    title: 'Therapeutic Alliance',
    category: 'Foundation',
    definition: 'The collaborative, trusting relationship between client and therapist based on mutual respect and shared goals.',
    eli5: 'The strong bond of trust and teamwork between client and therapist.',
    clinicalExample: 'A client feeling secure enough to share deeply buried trauma without fear of rejection.',
  },
  c12_psy_cbse_172: {
    id: 'c12_psy_cbse_172',
    title: 'Unconditional Positive Regard',
    category: 'Foundation',
    definition: 'The non-judgmental acceptance and valuing of the client by the therapist regardless of the client’s thoughts, feelings, or actions.',
    eli5: 'Accepting someone completely as a human being without any preconditions or moral judging.',
    clinicalExample: 'Therapist warmly accepting a client who confesses to feeling intense guilt over aggressive thoughts.',
  },
  c12_psy_cbse_173: {
    id: 'c12_psy_cbse_173',
    title: 'Empathy in the Therapeutic Context',
    category: 'Foundation',
    definition: 'The ability of the therapist to perceive and understand the client’s internal frame of reference as if it were their own, while retaining objectivity.',
    eli5: 'Stepping completely into someone else’s shoes while keeping a steady anchor.',
    clinicalExample: 'Reflecting back a client’s grief so accurately that the client feels profoundly understood.',
  },
  c12_psy_cbse_174: {
    id: 'c12_psy_cbse_174',
    title: 'Confidentiality in Psychotherapy',
    category: 'Foundation',
    definition: 'The ethical obligation to protect all private information disclosed by the client during therapy, except in cases of imminent danger.',
    eli5: 'Keeping client secrets strictly locked in therapy, unless someone’s life is in immediate danger.',
    clinicalExample: 'Refusing to share clinical progress notes with family members without explicit written consent.',
  },
  c12_psy_cbse_175: {
    id: 'c12_psy_cbse_175',
    title: 'Classification of Psychotherapies',
    category: 'Foundation',
    definition: 'Categorising therapies based on theoretical paradigms: Psychodynamic, Behavioural, Cognitive, Humanistic-Existential, and Integrative.',
    eli5: 'Grouping therapies by their core theory: unconscious motives, learned habits, thought patterns, or human growth.',
    clinicalExample: 'Selecting CBT for OCD versus Humanistic Therapy for existential grief.',
  },
  c12_psy_cbse_176: {
    id: 'c12_psy_cbse_176',
    title: 'Clinical Formulation of a Client’s Problem',
    category: 'Foundation',
    definition: 'A comprehensive, hypothesis-driven model explaining the origin, maintaining factors, and treatment strategy for a client’s psychological distress.',
    eli5: 'Creating a custom conceptual map of why a client has a problem and how to treat it.',
    clinicalExample: 'Mapping how early childhood neglect leads to core beliefs of unworthiness maintaining social anxiety.',
  },
  c12_psy_cbse_177: {
    id: 'c12_psy_cbse_177',
    title: 'Behaviour Therapy: Foundations',
    category: 'Behavioural',
    definition: 'A therapeutic approach rooted in classical and operant conditioning principles to unlearn maladaptive behaviours and learn adaptive ones.',
    eli5: 'Fixing problematic actions by changing environmental triggers and reinforcement patterns.',
    clinicalExample: 'Using systematic reward charts to increase independence in daily activities.',
  },
  c12_psy_cbse_178: {
    id: 'c12_psy_cbse_178',
    title: 'Behavioural Analysis',
    category: 'Behavioural',
    definition: 'The systematic process of identifying Antecedents (A), Target Behaviours (B), and Consequences (C) of psychological distress.',
    eli5: 'Examining what happens right before a behaviour, the action itself, and what happens right after.',
    clinicalExample: 'Identifying that public speaking invites panic, leading to escape, which reinforces phobic avoidance.',
  },
  c12_psy_cbse_179: {
    id: 'c12_psy_cbse_179',
    title: 'Reinforcement Principles in Therapy',
    category: 'Behavioural',
    definition: 'Applying positive and negative reinforcement to increase desirable actions, and extinction or punishment to decrease unwanted actions.',
    eli5: 'Rewarding good behaviors so they happen more, and altering rewards to eliminate bad behaviors.',
    clinicalExample: 'Praising a child immediately when they verbalise frustration rather than throwing tantrums.',
  },
  c12_psy_cbse_180: {
    id: 'c12_psy_cbse_180',
    title: 'Aversive Conditioning',
    category: 'Behavioural',
    definition: 'Pairing an undesirable habit or craving with an unpleasant stimulus to create an aversion to the maladaptive behavior.',
    eli5: 'Pairing a harmful habit with a bad taste or mild shock so the brain learns to dislike it.',
    clinicalExample: 'Using bitter substances on fingernails to extinguish compulsive nail-biting.',
  },
  c12_psy_cbse_181: {
    id: 'c12_psy_cbse_181',
    title: 'Token Economy',
    category: 'Behavioural',
    definition: 'A system where clients earn tokens for targeted positive behaviours, which can later be redeemed for valued privileges or back-up reinforcers.',
    eli5: 'Earning play-money/stars for good actions that you can trade in for rewards later.',
    clinicalExample: 'Inpatients earning tokens for keeping personal spaces tidy, redeemable for extra recreational time.',
  },
  c12_psy_cbse_182: {
    id: 'c12_psy_cbse_182',
    title: 'Differential Reinforcement',
    category: 'Behavioural',
    definition: 'Reinforcing acceptable alternative or incompatible behaviours while ignoring or extinguishing unwanted target behaviours.',
    eli5: 'Rewarding positive alternative actions while completely withholding attention from problematic ones.',
    clinicalExample: 'Rewarding calm requests while ignoring attention-seeking outbursts.',
  },
  c12_psy_cbse_183: {
    id: 'c12_psy_cbse_183',
    title: 'Systematic Desensitisation',
    category: 'Behavioural',
    definition: 'Wolpe’s technique pairing deep muscular relaxation with progressive exposure to a hierarchy of feared stimuli to extinguish phobias.',
    eli5: 'Conquering fears step-by-step while keeping your body completely relaxed.',
    clinicalExample: 'Gradually moving from looking at a spider photo to holding a spider while practicing calm breathing.',
  },
  c12_psy_cbse_184: {
    id: 'c12_psy_cbse_184',
    title: 'Modelling and Vicarious Learning',
    category: 'Behavioural',
    definition: 'Learning new social patterns or emotional responses by observing and imitating a model performing adaptive actions.',
    eli5: 'Learning how to act confidently by watching someone else do it successfully.',
    clinicalExample: 'Watching a peer interact calmly with a dog before attempting to pet the dog yourself.',
  },
  c12_psy_cbse_185: {
    id: 'c12_psy_cbse_185',
    title: 'Relaxation Procedures',
    category: 'Behavioural',
    definition: 'Structured physical methods like Progressive Muscle Relaxation (PMR) and diaphragmatic breathing to reduce autonomic arousal.',
    eli5: 'Techniques that systematically quiet down your nervous system and loosen physical muscle tension.',
    clinicalExample: 'Alternating between tensing and releasing muscle groups from toe to head to achieve somatic calm.',
  },
  c12_psy_cbse_186: {
    id: 'c12_psy_cbse_186',
    title: 'Reciprocal Inhibition',
    category: 'Behavioural',
    definition: 'The neurophysiological principle stating that two incompatible physiological states (e.g. relaxation and anxiety) cannot exist simultaneously.',
    eli5: 'Your body cannot be deeply relaxed and terrified at the exact same second.',
    clinicalExample: 'Using deep relaxation to override autonomic panic responses during phobia exposure.',
  },
  c12_psy_cbse_187: {
    id: 'c12_psy_cbse_187',
    title: 'Cognitive Therapy: Core Principles',
    category: 'Cognitive',
    definition: 'Therapeutic paradigm asserting that emotional distress is primarily driven by distorted interpretations of events rather than events themselves.',
    eli5: 'It is not events themselves that upset us, but how we think about those events.',
    clinicalExample: 'Recognizing that feeling depressed after failing an exam stems from the thought "I am a total failure".',
  },
  c12_psy_cbse_188: {
    id: 'c12_psy_cbse_188',
    title: 'Rational Emotive Therapy (RET)',
    category: 'Cognitive',
    definition: 'Albert Ellis’s directive therapy focusing on disputing irrational beliefs to replace them with rational, self-helping philosophies.',
    eli5: 'Vigorously challenging illogical "musts" and "shoulds" to create emotional resilience.',
    clinicalExample: 'Disputing the belief "Everyone must like me" with "It is nice to be liked, but not essential for my worth".',
  },
  c12_psy_cbse_189: {
    id: 'c12_psy_cbse_189',
    title: 'ABC Model of Emotional Disturbance',
    category: 'Cognitive',
    definition: 'Ellis’s model where Activating Event (A) triggers Beliefs (B), which dictate Emotional/Behavioural Consequences (C).',
    eli5: 'Event (A) + Belief (B) = Emotional Consequence (C). Changing B changes C.',
    clinicalExample: 'Job rejection (A) + "I am useless" (B) = Depression (C). Job rejection (A) + "I will keep trying" (B) = Motivation (C).',
  },
  c12_psy_cbse_190: {
    id: 'c12_psy_cbse_190',
    title: 'Irrational Beliefs',
    category: 'Cognitive',
    definition: 'Dogmatic, inflexible demands ("demandingness", "catastrophising", "low frustration tolerance") that cause psychological pain.',
    eli5: 'Rigid expectations that things MUST go your way, leading to intense distress when reality disagrees.',
    clinicalExample: 'Believing "I MUST pass every exam with top marks or life is ruined".',
  },
  c12_psy_cbse_191: {
    id: 'c12_psy_cbse_191',
    title: 'Beck’s Cognitive Therapy',
    category: 'Cognitive',
    definition: 'Aaron Beck’s empirical approach targeting negative automatic thoughts, schemas, and cognitive distortions via collaborative empiricism.',
    eli5: 'Treating negative thoughts like testable scientific hypotheses to uncover facts.',
    clinicalExample: 'Gathering actual evidence to test the client’s belief "Nobody wants to speak with me".',
  },
  c12_psy_cbse_192: {
    id: 'c12_psy_cbse_192',
    title: 'Core Schemas in Cognitive Therapy',
    category: 'Cognitive',
    definition: 'Deep-seated, enduring cognitive frameworks developed in early life that filter how individuals perceive themselves and the world.',
    eli5: 'Mental blueprints formed early in life that color everything you see and believe.',
    clinicalExample: 'A persistent core schema of "I am inherently unlovable" shaping adult relationships.',
  },
  c12_psy_cbse_193: {
    id: 'c12_psy_cbse_193',
    title: 'Negative Automatic Thoughts',
    category: 'Cognitive',
    definition: 'Rapid, knee-jerk stream of negative self-statements that arise spontaneously during stressful circumstances.',
    eli5: 'Instant unwanted negative thoughts that pop into your head automatically when things go wrong.',
    clinicalExample: 'Instantly thinking "I’m going to mess up" right before starting a presentation.',
  },
  c12_psy_cbse_194: {
    id: 'c12_psy_cbse_194',
    title: 'Cognitive Distortions',
    category: 'Cognitive',
    definition: 'Systematic errors in thinking such as All-or-Nothing thinking, Catastrophising, Personalisation, and Mental Filtering.',
    eli5: 'Mind tricks and thinking traps like seeing everything as a catastrophe or black-and-white.',
    clinicalExample: 'Thinking "If I get a single question wrong, the whole test is ruined" (All-or-nothing thinking).',
  },
  c12_psy_cbse_195: {
    id: 'c12_psy_cbse_195',
    title: 'Cognitive Behaviour Therapy (CBT)',
    category: 'Cognitive',
    definition: 'An integrative short-term, goal-oriented psychotherapy combining cognitive restructuring with behavioural activation and skills training.',
    eli5: 'Combining thought-changing strategies with real-world action experiments for practical solutions.',
    clinicalExample: 'Challenging depressive thoughts while scheduling daily rewarding activities to boost mood.',
  },
  c12_psy_cbse_196: {
    id: 'c12_psy_cbse_196',
    title: 'Humanistic-Existential Therapy: Core Principles',
    category: 'Humanistic',
    definition: 'Therapeutic approach emphasizing personal growth, free will, self-actualisation, authentic awareness, and finding meaning in life.',
    eli5: 'Helping individuals realize their inner potential and take responsibility for their own personal freedom.',
    clinicalExample: 'Exploring personal choices and values to overcome existential isolation.',
  },
  c12_psy_cbse_197: {
    id: 'c12_psy_cbse_197',
    title: 'Logotherapy and Meaning Making',
    category: 'Humanistic',
    definition: 'Viktor Frankl’s therapy focusing on finding purpose and meaning in life even amidst unavoidable suffering.',
    eli5: 'Discovering a clear purpose that gives you strength to endure life’s toughest hardships.',
    clinicalExample: 'Helping a patient transform severe grief into meaningful creative writing or community service.',
  },
  c12_psy_cbse_198: {
    id: 'c12_psy_cbse_198',
    title: 'Client-Centred Therapy',
    category: 'Humanistic',
    definition: 'Carl Rogers’ non-directive approach facilitating self-exploration through empathy, congruence, and unconditional positive regard.',
    eli5: 'A warm, non-judgmental space where the client guides their own self-healing.',
    clinicalExample: 'A therapist actively listening and reflecting feelings without giving advice or directives.',
  },
  c12_psy_cbse_199: {
    id: 'c12_psy_cbse_199',
    title: 'Gestalt Therapy',
    category: 'Humanistic',
    definition: 'Fritz Perls’ experiential therapy emphasizing present-moment awareness, bodily sensations, and integrating split-off aspects of self.',
    eli5: 'Focusing on the "here and now" and bringing suppressed emotions into full conscious awareness.',
    clinicalExample: 'Using the empty chair technique to talk directly to unresolved feelings toward an absent parent.',
  },
  c12_psy_cbse_200: {
    id: 'c12_psy_cbse_200',
    title: 'Self-Actualisation',
    category: 'Humanistic',
    definition: 'The inherent biological drive in humans to fulfill their potential, expand creativity, and achieve self-congruence.',
    eli5: 'Becoming the best, most authentic version of yourself.',
    clinicalExample: 'Pursuing meaningful artistic goals after moving past fear of social evaluation.',
  },
  c12_psy_cbse_201: {
    id: 'c12_psy_cbse_201',
    title: 'Factors Contributing to Healing in Psychotherapy',
    category: 'Foundation',
    definition: 'Common therapeutic factors such as therapeutic alliance, emotional catharsis, client motivation, technique effectiveness, and placebo expectation.',
    eli5: 'The key ingredients that produce healing: strong relationship, emotional release, belief in recovery, and clear techniques.',
    clinicalExample: 'A client making rapid gains due to feeling deeply understood and believing in the treatment plan.',
  },
  c12_psy_cbse_202: {
    id: 'c12_psy_cbse_202',
    title: 'Ethics in Psychotherapy',
    category: 'Foundation',
    definition: 'Professional standards governing therapist conduct including informed consent, competence, client autonomy, boundaries, and confidentiality.',
    eli5: 'Strict moral rules that protect clients from harm, exploitation, or breach of trust.',
    clinicalExample: 'Obtaining formal written consent and maintaining strict professional boundaries at all times.',
  },
  c12_psy_cbse_203: {
    id: 'c12_psy_cbse_203',
    title: 'Alternative Therapies: Overview',
    category: 'Alternative & Rehab',
    definition: 'Complementary mind-body interventions like yoga, meditation, herbal remedies, and acupuncture used alongside standard psychotherapy.',
    eli5: 'Holistic practices like breathing exercises and meditation that support traditional therapy.',
    clinicalExample: 'Integrating daily mindfulness meditation to reduce residual generalized stress.',
  },
  c12_psy_cbse_204: {
    id: 'c12_psy_cbse_204',
    title: 'Sudarshana Kriya Yoga (SKY)',
    category: 'Alternative & Rehab',
    definition: 'A specific rhythmic breathing technique that regulates autonomic autonomic nervous system activity, reducing anxiety and depression.',
    eli5: 'A powerful rhythmic breathing practice that naturally resets stress response systems in the brain.',
    clinicalExample: 'Practicing 20 minutes of daily SKY breathing to reduce baseline physiological arousal.',
  },
  c12_psy_cbse_205: {
    id: 'c12_psy_cbse_205',
    title: 'Vipassana Mindfulness Meditation',
    category: 'Alternative & Rehab',
    definition: 'An insight meditation practice involving non-judgmental observation of sensations, thoughts, and bodily states to foster equanimity.',
    eli5: 'Observing your thoughts and physical feelings calmly without reacting to them.',
    clinicalExample: 'Observing physical pain or anxiety without panicking, realizing all bodily feelings pass.',
  },
  c12_psy_cbse_206: {
    id: 'c12_psy_cbse_206',
    title: 'Rehabilitation of the Mentally Ill',
    category: 'Alternative & Rehab',
    definition: 'Comprehensive multi-disciplinary process aimed at restoring individuals with severe mental disorders to optimal functioning and community integration.',
    eli5: 'Helping individuals recovering from severe illness regain independence and live fruitfully in society.',
    clinicalExample: 'Supporting a recovering schizophrenia patient in reintegrating into independent living.',
  },
  c12_psy_cbse_207: {
    id: 'c12_psy_cbse_207',
    title: 'Occupational, Social Skills, and Vocational Therapy',
    category: 'Alternative & Rehab',
    definition: 'Targeted rehabilitation therapies focusing on daily living tasks, interpersonal effectiveness, and job skill training for sustained autonomy.',
    eli5: 'Training for real-life skills: managing routine chores, making friends, and maintaining job employment.',
    clinicalExample: 'Practicing job interviewing skills and cooking routines in a community rehabilitation setting.',
  },
};

// ==========================================
// SCENARIO & DISCOVERY
// ==========================================
const SCENARIO = {
  title: 'Mind Re-Engineering Lab: Therapeutic Paradigms & Clinical Interventions',
  intro: 'Welcome to the Clinical Psychology & Psychotherapy Simulation Lab! You step into the role of a Senior Clinical Psychologist designing treatment plans, analyzing cognitive distortions, regulating autonomic nervous system responses, and guiding client rehabilitation.',
  context: 'In this simulation, you will manipulate cognitive-behavioural variables, construct systematic desensitization hierarchies, test Rogers’ core therapeutic conditions, analyze yoga bio-rhythms, and curate complete multi-modal rehabilitation pathways.',
};

const DISCOVERY_QUESTION = {
  question: 'In Albert Ellis’s Rational Emotive Behaviour Therapy (REBT / RET), what is the direct cause of emotional disturbance (C)?',
  options: [
    'The adverse Activating Event (A) itself directly causes the emotional distress.',
    'The individual’s irrational Beliefs (B) about the activating event cause the distress.',
    'Biological genetic defects that cannot be altered by mental reflection.',
    'Unconscious repressed childhood memories stored deep within the ID.',
  ],
  correctIndex: 1,
  hintAfter: 'While most people blame the external situation (A), REBT proves that it is our mental interpretation and rigid beliefs (B) about the situation that trigger emotional distress (C).',
};

// ==========================================
// MISCONCEPTIONS DATA
// ==========================================
interface Misconception {
  id: string;
  misconception: string;
  correction: string;
  nodeId: NodeId;
}

const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_1',
    misconception: 'Psychotherapy is just friendly advice-giving or informal venting.',
    correction: 'Psychotherapy is a scientifically grounded, systematic process utilizing proven clinical formulations, strict ethics, and deliberate psychological interventions.',
    nodeId: 'c12_psy_cbse_168',
  },
  {
    id: 'misc_2',
    misconception: 'Cognitive Behaviour Therapy (CBT) involves forced positive thinking.',
    correction: 'CBT does not promote blind positivity; it promotes realistic, evidence-based, rational thinking that tests automatic assumptions against reality.',
    nodeId: 'c12_psy_cbse_195',
  },
  {
    id: 'misc_3',
    misconception: 'Systematic Desensitisation throws the client directly into their worst fear.',
    correction: 'That is flooding. Systematic Desensitisation pairs deep relaxation with a step-by-step hierarchy of feared situations using reciprocal inhibition.',
    nodeId: 'c12_psy_cbse_183',
  },
  {
    id: 'misc_4',
    misconception: 'Humanistic therapy gives immediate answers and tells clients how to live.',
    correction: 'Client-centred therapy is non-directive; the therapist acts as a facilitator, allowing the client to discover their own inner potential and self-actualisation.',
    nodeId: 'c12_psy_cbse_198',
  },
  {
    id: 'misc_5',
    misconception: 'Alternative therapies like Yoga or Vipassana replace medical/psychological treatment.',
    correction: 'Alternative therapies act as complementary practices that enhance autonomic regulation, mindfulness, and neuro-physiological balance alongside clinical therapy.',
    nodeId: 'c12_psy_cbse_203',
  },
  {
    id: 'misc_6',
    misconception: 'Rehabilitation of mentally ill individuals ends once clinical symptoms stop.',
    correction: 'Rehabilitation extends beyond symptom reduction to include occupational, social skills, and vocational restoration for meaningful integration into society.',
    nodeId: 'c12_psy_cbse_206',
  },
];

// ==========================================
// MANDATORY SECTIONS: EXPLORATION, PREDICTIONS, OBSERVATIONS, REAL WORLD
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Cognitive Restructuring & ABC Matrix',
    instruction: 'Manipulate Activating Events (A), analyze Irrational Beliefs (B), and apply Dispute Strategies (D) to observe emotional outcome shifts (C).',
    interactionType: 'cbt_restructuring',
    nodeId: 'c12_psy_cbse_189' as NodeId,
  },
  {
    title: 'Lab 2: Systematic Desensitisation & Reciprocal Inhibition',
    instruction: 'Construct an Anxiety Hierarchy ladder and apply Progressive Muscle Relaxation (PMR) to observe Subjective Units of Distress (SUDs) drop.',
    interactionType: 'behaviour_hierarchy',
    nodeId: 'c12_psy_cbse_183' as NodeId,
  },
  {
    title: 'Lab 3: Therapeutic Alliance & Humanistic Mirror',
    instruction: 'Adjust therapist responses (Empathy, Unconditional Positive Regard, Congruence) to test client self-actualisation growth curves.',
    interactionType: 'humanistic_alliance',
    nodeId: 'c12_psy_cbse_172' as NodeId,
  },
  {
    title: 'Lab 4: Alternative Bio-Rhythms (SKY & Vipassana)',
    instruction: 'Tune breathing frequency and mindfulness focus parameters to observe Sympathetic vs Parasympathetic balance and brainwave frequencies.',
    interactionType: 'alternative_biofeedback',
    nodeId: 'c12_psy_cbse_204' as NodeId,
  },
  {
    title: 'Lab 5: Multimodal Rehabilitation Matrix',
    instruction: 'Design a complete rehabilitation pathway using Occupational, Social Skills, and Vocational training steps for client case studies.',
    interactionType: 'rehab_matrix',
    nodeId: 'c12_psy_cbse_207' as NodeId,
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: 'If a client suffering from agoraphobia practices Progressive Muscle Relaxation right before facing a feared step on their hierarchy, what physiological principle prevents panic?',
    options: [
      'Aversive Counter-conditioning',
      'Reciprocal Inhibition (relaxation inhibits anxiety)',
      'Negative Reinforcement Extinction',
      'Cognitive Dissonance Resolution',
    ],
    correctIndex: 1,
    verifyInstruction: 'Verify in Lab 2 by triggering PMR relaxation when SUD levels spike.',
    nodeId: 'c12_psy_cbse_186' as NodeId,
  },
  {
    question: 'What happens to a client’s defense mechanisms when a therapist offers high levels of Unconditional Positive Regard and Empathy in Client-Centred Therapy?',
    options: [
      'Defense mechanisms increase to resist therapist influence.',
      'Defenses decrease, allowing client self-congruence and self-actualisation to rise.',
      'The client becomes completely dependent on therapist instructions.',
      'Cognitive distortions multiply due to lack of direct therapist correction.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Verify in Lab 3 by raising Empathy and Warmth parameters to maximum.',
    nodeId: 'c12_psy_cbse_198' as NodeId,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'In the ABC Model simulation, when you dispute an irrational belief ("I MUST be perfect") with a rational belief ("Imperfection is natural and human"), how do emotional consequences change?',
    observableOptions: [
      'Emotional distress decreases from severe anxiety/depression to moderate, manageable concern.',
      'Emotional distress remains unchanged because the activating event stays the same.',
      'Anxiety increases because rational thoughts remove emotional comfort.',
      'The activating event automatically disappears from the client’s life.',
    ],
    correctIndex: 0,
    nodeId: 'c12_psy_cbse_189' as NodeId,
  },
  {
    question: 'During Sudarshana Kriya Yoga (SKY) biofeedback stimulation, what physiological shift occurs during slow, rhythmic breathing phases?',
    observableOptions: [
      'Sympathetic nervous system spikes, increasing heart rate and cortisol.',
      'Parasympathetic vagal tone increases, reducing heart rate and promoting calm Alpha brainwaves.',
      'High Beta waves dominate, indicating acute physiological hyper-arousal.',
      'Muscle contraction increases rapidly across all major motor units.',
    ],
    correctIndex: 1,
    nodeId: 'c12_psy_cbse_204' as NodeId,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Clinical Case Formulation & Treatment Design Task',
  description: 'As a practicing clinical psychologist at AIIMS Delhi, you receive a case referral for a 24-year-old student experiencing severe exam-related panic attacks, avoidance of public speaking, and low self-worth.',
  steps: [
    'Step 1 (Assessment & ABC Mapping): Identify Activating Event (Upcoming university presentation), Irrational Belief ("If I stumble, my life is completely ruined"), and Consequence (Hyperventilation, total avoidance).',
    'Step 2 (Behavioural Intervention): Formulate a 5-step Systematic Desensitisation hierarchy ranging from visualizing a speech (SUD=20) to speaking in front of an auditorium (SUD=100). Pair with PMR technique.',
    'Step 3 (Cognitive Restructuring): Apply Socratic questioning to challenge catastrophising distortions and construct adaptive, evidence-based coping statements.',
    'Step 4 (Alternative & Rehab Integration): Prescribe daily 15-minute SKY breathing and Social Skills Role-Play to consolidate long-term resilience.',
  ],
};

// ==========================================
// 24 COMPREHENSIVE PROGRESSIVE CHALLENGES
// ==========================================
interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple-choice' | 'drag-sort' | 'numeric' | 'classification';
  difficulty: 'Foundation' | 'Standard' | 'Advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string | number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (8 Challenges) ---
  {
    id: 'ch_1',
    nodeId: 'c12_psy_cbse_168',
    type: 'multiple-choice',
    difficulty: 'Foundation',
    competencyLevel: 'Knowledge & Understanding',
    question: 'Which of the following best defines Psychotherapy?',
    options: [
      'An informal chat between friends giving advice on daily problems.',
      'A voluntary, structured therapeutic relationship between a trained professional and a distressed client.',
      'A medical procedure involving surgical alteration of brain circuits.',
      'A purely educational lecture on social rules and moral ethics.',
    ],
    correctIndex: 1,
    explanation: 'Psychotherapy is a voluntary, structured therapeutic dynamic where a trained therapist uses psychological principles to help a client overcome distress.',
    hints: ['Think about who is involved and what makes it professional.', 'Is it informal advice or structured clinical work?', 'Notice the key terms: voluntary, structured, trained professional.'],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_2',
    nodeId: 'c12_psy_cbse_171',
    type: 'multiple-choice',
    difficulty: 'Foundation',
    competencyLevel: 'Knowledge & Understanding',
    question: 'The therapeutic alliance is fundamentally built upon which essential foundation?',
    options: [
      'Strict control and domination of the client by the therapist.',
      'Mutual trust, respect, and collaborative agreement on therapy goals.',
      'Financial incentives offered to the client for good performance.',
      'Complete secrecy where even the therapist hides their identity.',
    ],
    correctIndex: 1,
    explanation: 'The therapeutic alliance relies on mutual trust, warmth, respect, and collaborative agreement on goals between therapist and client.',
    hints: ['What creates a safe therapeutic connection?', 'Does a therapist dominate or collaborate?', 'Look for mutual trust and shared goals.'],
  },
  {
    id: 'ch_3',
    nodeId: 'c12_psy_cbse_172',
    type: 'multiple-choice',
    difficulty: 'Foundation',
    competencyLevel: 'Knowledge & Understanding',
    question: 'Carl Rogers defined "Unconditional Positive Regard" as:',
    options: [
      'Praising every bad action a client performs.',
      'Accepting and valuing the client as a person without any preconditions or judgment.',
      'Expecting the client to follow every rule unconditionally.',
      'Ignoring emotional distress completely to stay positive.',
    ],
    correctIndex: 1,
    explanation: 'Unconditional Positive Regard means non-judgmental warmth and total acceptance of the client’s worth as a person.',
    hints: ['Does it mean agreeing with bad actions or accepting human worth?', 'Focus on non-judgmental acceptance.', 'It requires no preconditions.'],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_4',
    nodeId: 'c12_psy_cbse_174',
    type: 'multiple-choice',
    difficulty: 'Foundation',
    competencyLevel: 'Understanding',
    question: 'When is a therapist ethically PERMITTED to breach client confidentiality?',
    options: [
      'When the client’s employer asks for an update.',
      'When the client reveals a mild embarrassing personal secret.',
      'When there is imminent danger of serious harm to the client or others.',
      'Never under any circumstances whatsoever.',
    ],
    correctIndex: 2,
    explanation: 'Confidentiality must be maintained except in acute crisis situations involving explicit threat of imminent harm to life or safety.',
    hints: ['Ethical rules prioritize physical safety and saving lives.', 'Can an employer force disclosure? No.', 'Look for imminent danger of severe harm.'],
  },
  {
    id: 'ch_5',
    nodeId: 'c12_psy_cbse_177',
    type: 'multiple-choice',
    difficulty: 'Foundation',
    competencyLevel: 'Recall',
    question: 'Behaviour Therapy is primarily based on principles derived from which paradigm?',
    options: [
      'Psychoanalytic drive theory',
      'Classical and Operant Conditioning principles',
      'Existential humanistic philosophy',
      'Transpersonal spiritual energy channels',
    ],
    correctIndex: 1,
    explanation: 'Behaviour therapy applies learning theories—specifically classical conditioning (Pavlov) and operant conditioning (Skinner).',
    hints: ['Think of Watson, Pavlov, and Skinner.', 'Which conditioning models deal with learned behavior?', 'Classical and Operant conditioning.'],
  },
  {
    id: 'ch_6',
    nodeId: 'c12_psy_cbse_188',
    type: 'multiple-choice',
    difficulty: 'Foundation',
    competencyLevel: 'Recall',
    question: 'Who developed Rational Emotive Therapy (RET / REBT)?',
    options: ['Aaron Beck', 'Albert Ellis', 'Carl Rogers', 'Fritz Perls'],
    correctIndex: 1,
    explanation: 'Albert Ellis developed Rational Emotive Therapy (RET/REBT), introducing the ABC model of emotional disturbance.',
    hints: ['He introduced the ABC model.', 'Famous for challenging irrational "musts".', 'Albert Ellis.'],
  },
  {
    id: 'ch_7',
    nodeId: 'c12_psy_cbse_199',
    type: 'multiple-choice',
    difficulty: 'Foundation',
    competencyLevel: 'Recall',
    question: 'The "Empty Chair Technique" is a signature technique associated with which therapeutic approach?',
    options: ['Cognitive Behaviour Therapy', 'Gestalt Therapy', 'Systematic Desensitisation', 'Aversive Conditioning'],
    correctIndex: 1,
    explanation: 'Fritz Perls’ Gestalt Therapy uses the empty chair technique to facilitate dialogue between split-off parts of self or absent figures.',
    hints: ['Focuses on present-moment experience and integration.', 'Developed by Fritz Perls.', 'Gestalt Therapy.'],
  },
  {
    id: 'ch_8',
    nodeId: 'c12_psy_cbse_204',
    type: 'multiple-choice',
    difficulty: 'Foundation',
    competencyLevel: 'Knowledge',
    question: 'Sudarshana Kriya Yoga (SKY) focuses primarily on which physiological component to alleviate anxiety?',
    options: [
      'Rhythmic and regulated breathing cycles',
      'Intense muscular weightlifting',
      'Caloric restriction and fasting',
      'Hypnotic sensory deprivation',
    ],
    correctIndex: 0,
    explanation: 'SKY utilizes specific rhythmic breathing protocols to balance the autonomic nervous system and reduce stress hormones.',
    hints: ['What does "Kriya" in SKY emphasize?', 'It regulates autonomic nervous activity via breath.', 'Rhythmic breathing cycles.'],
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'ch_9',
    nodeId: 'c12_psy_cbse_178',
    type: 'multiple-choice',
    difficulty: 'Standard',
    competencyLevel: 'Application',
    question: 'In Behavioural Analysis (ABC analysis), what does the "A" stand for?',
    options: ['Affective Reaction', 'Antecedent Event', 'Automatic Distortion', 'Anxiety Level'],
    correctIndex: 1,
    explanation: 'In behavioural analysis: A = Antecedent (trigger), B = Behaviour (target action), C = Consequence.',
    hints: ['What comes BEFORE the behaviour?', 'Antecedent condition that triggers the response.', 'Antecedent Event.'],
  },
  {
    id: 'ch_10',
    nodeId: 'c12_psy_cbse_181',
    type: 'multiple-choice',
    difficulty: 'Standard',
    competencyLevel: 'Application',
    question: 'In a psychiatric ward, patients receive plastic tokens for making their beds, which can later be exchanged for television privileges. This is an example of:',
    options: ['Aversive Conditioning', 'Token Economy', 'Systematic Desensitisation', 'Free Association'],
    correctIndex: 1,
    explanation: 'Token Economy is an operant conditioning system where tokens serve as secondary reinforcers redeemable for back-up reinforcers.',
    hints: ['Uses tokens as secondary rewards.', 'Commonly used in institutional settings.', 'Token Economy.'],
  },
  {
    id: 'ch_11',
    nodeId: 'c12_psy_cbse_183',
    type: 'multiple-choice',
    difficulty: 'Standard',
    competencyLevel: 'Analysis',
    question: 'In Joseph Wolpe’s Systematic Desensitisation, why is Progressive Muscle Relaxation paired with feared mental images?',
    options: [
      'To make the client fall asleep so they forget the phobia.',
      'To leverage Reciprocal Inhibition: deep physical relaxation inhibits the physiological expression of anxiety.',
      'To distract the client so they do not notice their heart rate spiking.',
      'To punish the client whenever panic arises.',
    ],
    correctIndex: 1,
    explanation: 'Reciprocal Inhibition dictates that two opposing autonomic states (relaxation and anxiety) cannot co-exist simultaneously.',
    hints: ['Wolpe formulated a neurophysiological principle.', 'Can relaxation and panic happen together?', 'Reciprocal Inhibition.'],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_12',
    nodeId: 'c12_psy_cbse_189',
    type: 'multiple-choice',
    difficulty: 'Standard',
    competencyLevel: 'Application',
    question: 'Identify the "Belief (B)" component in this scenario: "Rohan failed a job interview (A), felt severely depressed (C), because he thought: I must be accepted by every interviewer or I am worthless."',
    options: [
      'Failing the job interview.',
      'Feeling severely depressed.',
      'The thought: "I must be accepted by every interviewer or I am worthless."',
      'Applying for the job.',
    ],
    correctIndex: 2,
    explanation: 'The belief B is the cognitive evaluation/interpretation ("I must be accepted..."), which produces emotional consequence C.',
    hints: ['Beliefs are cognitive evaluations or rigid demands.', 'Which option represents Rohan’s thought/rule?', 'The thought about needing acceptance.'],
  },
  {
    id: 'ch_13',
    nodeId: 'c12_psy_cbse_194',
    type: 'multiple-choice',
    difficulty: 'Standard',
    competencyLevel: 'Analysis',
    question: 'A student gets 95% on an exam but obsessively worries about the 5% lost, believing the entire test was a failure. Which cognitive distortion is demonstrated?',
    options: ['Personalisation', 'Mental Filter / Selective Abstraction', 'Mind Reading', 'Emotional Reasoning'],
    correctIndex: 1,
    explanation: 'Mental Filter (Selective Abstraction) involves dwelling exclusively on a single negative detail while ignoring the broader positive picture.',
    hints: ['Focusing exclusively on the small negative detail.', 'Filtering out 95% of positive performance.', 'Mental Filter / Selective Abstraction.'],
  },
  {
    id: 'ch_14',
    nodeId: 'c12_psy_cbse_197',
    type: 'multiple-choice',
    difficulty: 'Standard',
    competencyLevel: 'Understanding & Application',
    question: 'Viktor Frankl’s Logotherapy posits that the primary human motivational force is:',
    options: ['Will to Pleasure', 'Will to Power', 'Will to Meaning', 'Will to Dominance'],
    correctIndex: 2,
    explanation: 'Logotherapy rests on the premise that finding meaning in life ("Will to Meaning") is the fundamental human drive.',
    hints: ['Derived from the Greek word "Logos" meaning purpose or meaning.', 'Frankl wrote "Man’s Search for Meaning".', 'Will to Meaning.'],
  },
  {
    id: 'ch_15',
    nodeId: 'c12_psy_cbse_205',
    type: 'multiple-choice',
    difficulty: 'Standard',
    competencyLevel: 'Application',
    question: 'Vipassana Mindfulness Meditation encourages practitioners to respond to distressing bodily sensations by:',
    options: [
      'Suppressing and fighting the physical sensation immediately.',
      'Observing the sensation with non-judgmental detachment, recognizing its impermanent nature (Anicca).',
      'Distracting themselves with intense cognitive problem-solving.',
      'Translating physical sensations into aggressive physical movement.',
    ],
    correctIndex: 1,
    explanation: 'Vipassana emphasizes non-judgmental awareness and observing sensations equanimously, recognizing that all states are transient.',
    hints: ['Does Vipassana fight sensations or observe them calmly?', 'Remember the core concept of equanimity.', 'Observing with non-judgmental detachment.'],
  },
  {
    id: 'ch_16',
    nodeId: 'c12_psy_cbse_207',
    type: 'multiple-choice',
    difficulty: 'Standard',
    competencyLevel: 'Application',
    question: 'Which rehabilitation therapy step specifically targets teaching interpersonal communication, assertiveness, and eye contact?',
    options: ['Occupational Therapy', 'Social Skills Training', 'Vocational Rehabilitation', 'Aversive Conditioning'],
    correctIndex: 1,
    explanation: 'Social Skills Training uses role-play, modelling, and feedback to build effective interpersonal communication competencies.',
    hints: ['Focuses on eye contact, assertiveness, and interpersonal talk.', 'Look at the name: Social Skills.', 'Social Skills Training.'],
  },

  // --- ADVANCED TIER (8 Challenges) ---
  {
    id: 'ch_17',
    nodeId: 'c12_psy_cbse_176',
    type: 'multiple-choice',
    difficulty: 'Advanced',
    competencyLevel: 'Evaluation & Synthesis',
    question: 'When a clinician develops a "Clinical Formulation", which critical elements must be systematically linked?',
    options: [
      'Only the client’s financial history and educational qualifications.',
      'Predisposing factors, precipitating triggers, maintaining mechanisms, and tailored intervention strategies.',
      'Therapist’s personal preferences and hospital billing codes.',
      'Standardized IQ scores and astrological horoscopes.',
    ],
    correctIndex: 1,
    explanation: 'A rigorous clinical formulation synthesizes predisposing vulnerability, precipitating events, maintaining factors, and target therapeutic interventions.',
    hints: ['Think of the 4 Ps in case formulation.', 'Must link cause, maintenance, and treatment plan.', 'Predisposing, precipitating, maintaining factors, and interventions.'],
  },
  {
    id: 'ch_18',
    nodeId: 'c12_psy_cbse_183',
    type: 'numeric',
    difficulty: 'Advanced',
    competencyLevel: 'Analysis & Calculation',
    question: 'A client begins Systematic Desensitisation with a baseline Subjective Units of Distress (SUD) score of 80 for public speaking. After 4 sessions of PMR exposure, their SUD score drops by 15% per session (compounded). What is their calculated SUD score after session 2? (Round to nearest whole number)',
    correctAnswer: 58,
    explanation: 'Session 1: 80 - (80 * 0.15) = 68. Session 2: 68 - (68 * 0.15) = 57.8 ≈ 58 SUD points.',
    hints: ['Calculate 15% reduction for session 1 first: 80 * 0.85 = 68.', 'Then calculate session 2: 68 * 0.85 = 57.8.', 'Round 57.8 to the nearest whole integer: 58.'],
  },
  {
    id: 'ch_19',
    nodeId: 'c12_psy_cbse_191',
    type: 'multiple-choice',
    difficulty: 'Advanced',
    competencyLevel: 'Evaluation',
    question: 'What constitutes Aaron Beck’s "Cognitive Triad" in clinical depression?',
    options: [
      'Negative view of Past, Present, and Future.',
      'Negative view of Self, World/Experience, and Future.',
      'Irrational thoughts regarding Work, Family, and Health.',
      'Distorted feelings of Anger, Anxiety, and Guilt.',
    ],
    correctIndex: 1,
    explanation: 'Beck’s Cognitive Triad consists of pervasive negative automatic views regarding (1) the Self, (2) the World/Environment, and (3) the Future.',
    hints: ['It involves the individual, their environment, and what lies ahead.', 'Self, World, and Future.', 'Look for Self, World/Experience, and Future.'],
  },
  {
    id: 'ch_20',
    nodeId: 'c12_psy_cbse_195',
    type: 'multiple-choice',
    difficulty: 'Advanced',
    competencyLevel: 'Synthesis',
    question: 'Why is Cognitive Behaviour Therapy (CBT) considered an "integrative, empirically-supported" treatment model?',
    options: [
      'Because it relies purely on subjective intuition without collecting behavioral data.',
      'Because it systematically combines cognitive restructuring (changing beliefs) with behavioral experiments (testing real-world evidence).',
      'Because it only treats physical symptoms using neuro-medications.',
      'Because it ignores emotional responses entirely.',
    ],
    correctIndex: 1,
    explanation: 'CBT bridges cognitive therapy and behaviour therapy, using rigorous behavioral experiments to empirically test cognitive hypotheses.',
    hints: ['Combines thought work with real-world behavioral testing.', 'Empirically supported through hypothesis testing in daily life.', 'Combines cognitive restructuring with behavioral experiments.'],
  },
  {
    id: 'ch_21',
    nodeId: 'c12_psy_cbse_201',
    type: 'multiple-choice',
    difficulty: 'Advanced',
    competencyLevel: 'Evaluation',
    question: 'Comparative psychotherapy research shows that "Common Factors" account for a significant portion of therapeutic healing. Which option represents a key non-specific common factor?',
    options: [
      'The specific frequency of biofeedback electrical wiring.',
      'The quality of the therapeutic alliance and client therapeutic expectation/hope.',
      'The exact brand of therapeutic furniture in the clinic.',
      'The age difference between client and therapist.',
    ],
    correctIndex: 1,
    explanation: 'Common factors across all successful therapies include the therapeutic relationship/alliance, therapist empathy, emotional catharsis, and client hope.',
    hints: ['What works across ALL therapy schools?', 'Alliance, warmth, and hope.', 'Quality of therapeutic alliance and expectation.'],
  },
  {
    id: 'ch_22',
    nodeId: 'c12_psy_cbse_202',
    type: 'multiple-choice',
    difficulty: 'Advanced',
    competencyLevel: 'Evaluation',
    question: 'A therapist discovers they have a personal financial interest in a company owned by their client’s immediate family. Ethically, the therapist must:',
    options: [
      'Ignore it as long as the client does not bring it up.',
      'Identify and manage/resolve the dual relationship / conflict of interest to protect clinical objectivity and client welfare.',
      'Charge double fees to balance the account.',
      'Immediately terminate therapy without providing any referral.',
    ],
    correctIndex: 1,
    explanation: 'Ethical codes mandate identifying dual relationships and potential conflicts of interest to safeguard therapist objectivity and client welfare.',
    hints: ['Consider boundaries and dual relationships.', 'Therapist must preserve clinical objectivity.', 'Identify and resolve conflict of interest / dual relationship.'],
  },
  {
    id: 'ch_23',
    nodeId: 'c12_psy_cbse_206',
    type: 'multiple-choice',
    difficulty: 'Advanced',
    competencyLevel: 'Synthesis',
    question: 'What is the primary ultimate objective of psychiatric rehabilitation for long-term clinical patients?',
    options: [
      'Permanent institutional confinement in a protected facility.',
      'Empowering the individual to achieve maximum independence, self-efficacy, and meaningful community integration.',
      'Ensuring total compliance with zero personal choice.',
      'Eradicating all personality traits to fit social norms.',
    ],
    correctIndex: 1,
    explanation: 'Rehabilitation aims to empower clients to function at their highest potential with autonomy, dignity, and active community participation.',
    hints: ['Focus on autonomy, community life, and dignity.', 'Maximum independence and self-efficacy.', 'Empowering community integration.'],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_24',
    nodeId: 'c12_psy_cbse_180',
    type: 'multiple-choice',
    difficulty: 'Advanced',
    competencyLevel: 'Analysis',
    question: 'Aversive Conditioning is used with extreme ethical caution because:',
    options: [
      'It requires expensive neuroimaging gear.',
      'It involves applying noxious/unpleasant stimuli, risking ethical harm or temporary distress, requiring strict informed consent.',
      'It works instantly after a single trial without any repetition.',
      'It is strictly illegal under all medical laws globally.',
    ],
    correctIndex: 1,
    explanation: 'Because aversive conditioning uses unpleasant or noxious stimuli, it carries ethical considerations and potential side effects, requiring strict guidelines.',
    hints: ['Uses unpleasant/noxious stimuli.', 'Requires ethical safeguards and informed consent.', 'Involves applying noxious stimuli requiring strict consent.'],
  },
];

// ==========================================
// SVG DIAGRAM COMPONENTS
// ==========================================

// Diagram 1: ABC Model & Beck's Triad Visualizer
const ABCModelDiagramSVG: React.FC<{ beliefType: 'irrational' | 'rational' }> = ({ beliefType }) => {
  const isRational = beliefType === 'rational';
  return (
    <svg viewBox="0 0 600 240" className="w-full h-auto max-h-60 rounded-xl bg-slate-900 shadow-inner">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
        </marker>
      </defs>

      {/* Title */}
      <text x="300" y="24" textAnchor="middle" className="text-xs font-bold fill-slate-300 tracking-wider">
        ELLIS ABC MODEL & COGNITIVE PATHWAY
      </text>

      {/* Node A */}
      <rect x="30" y="60" width="130" height="90" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
      <text x="95" y="90" textAnchor="middle" className="text-sm font-bold fill-gold-400">
        [A] Trigger
      </text>
      <text x="95" y="110" textAnchor="middle" className="text-xs fill-slate-300">
        Activating Event
      </text>
      <text x="95" y="130" textAnchor="middle" className="text-[10px] fill-slate-400">
        (e.g., Job Interview)
      </text>

      {/* Arrow A -> B */}
      <line x1="160" y1="105" x2="225" y2="105" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

      {/* Node B */}
      <rect
        x="230"
        y="50"
        width="140"
        height="110"
        rx="10"
        fill={isRational ? '#064e3b' : '#7f1d1d'}
        stroke={isRational ? '#10b981' : '#ef4444'}
        strokeWidth="2"
      />
      <text x="300" y="78" textAnchor="middle" className={`text-sm font-bold ${isRational ? 'fill-emerald-300' : 'fill-red-300'}`}>
        [B] Cognitive Evaluation
      </text>
      <text x="300" y="98" textAnchor="middle" className="text-xs font-semibold fill-white">
        {isRational ? 'Rational Belief' : 'Irrational Belief'}
      </text>
      <text x="300" y="120" textAnchor="middle" className="text-[10px] fill-slate-200">
        {isRational ? '"Discomfort is manageable"' : '"I MUST be perfect always!"'}
      </text>
      <text x="300" y="142" textAnchor="middle" className="text-[9px] fill-slate-300 italic">
        {isRational ? 'Flexible / Healthy' : 'Dogmatic / Rigid'}
      </text>

      {/* Arrow B -> C */}
      <line x1="370" y1="105" x2="435" y2="105" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

      {/* Node C */}
      <rect x="440" y="60" width="130" height="90" rx="10" fill="#1e293b" stroke={isRational ? '#10b981' : '#ef4444'} strokeWidth="2" />
      <text x="505" y="90" textAnchor="middle" className={`text-sm font-bold ${isRational ? 'fill-emerald-400' : 'fill-red-400'}`}>
        [C] Consequence
      </text>
      <text x="505" y="112" textAnchor="middle" className="text-xs fill-slate-200">
        {isRational ? 'Constructive Concern' : 'Severe Distress'}
      </text>
      <text x="505" y="132" textAnchor="middle" className="text-[10px] fill-slate-400">
        {isRational ? 'Adaptive Action' : 'Panic & Avoidance'}
      </text>

      {/* Beck's Triad Sub-graphic */}
      <path d="M 180 200 L 300 175 L 420 200 Z" fill="none" stroke="#64748b" strokeDasharray="3,3" />
      <text x="300" y="215" textAnchor="middle" className="text-[10px] fill-slate-400">
        Beck’s Triad: Self • World • Future
      </text>
    </svg>
  );
};

// Diagram 2: Systematic Desensitization Hierarchy & Anxiety Curve SVG
const SystematicDesensitizationSVG: React.FC<{ sudLevel: number; relaxActive: boolean }> = ({ sudLevel, relaxActive }) => {
  const barHeight = (sudLevel / 100) * 120;
  return (
    <svg viewBox="0 0 600 240" className="w-full h-auto max-h-60 rounded-xl bg-slate-900 shadow-inner">
      <text x="300" y="22" textAnchor="middle" className="text-xs font-bold fill-slate-300 tracking-wider">
        SYSTEMATIC DESENSITISATION & RECIPROCAL INHIBITION
      </text>

      {/* Hierarchy Ladder */}
      <g transform="translate(40, 45)">
        <line x1="10" y1="10" x2="10" y2="160" stroke="#475569" strokeWidth="4" />
        <line x1="110" y1="10" x2="110" y2="160" stroke="#475569" strokeWidth="4" />

        <line x1="10" y1="30" x2="110" y2="30" stroke="#3b82f6" strokeWidth="2" />
        <text x="60" y="25" textAnchor="middle" className="text-[10px] fill-slate-300">Step 5: Public Speech (SUD 90)</text>

        <line x1="10" y1="65" x2="110" y2="65" stroke="#3b82f6" strokeWidth="2" />
        <text x="60" y="60" textAnchor="middle" className="text-[10px] fill-slate-300">Step 4: Hall Practice (SUD 70)</text>

        <line x1="10" y1="100" x2="110" y2="100" stroke="#3b82f6" strokeWidth="2" />
        <text x="60" y="95" textAnchor="middle" className="text-[10px] fill-slate-300">Step 3: Small Group (SUD 50)</text>

        <line x1="10" y1="135" x2="110" y2="135" stroke="#3b82f6" strokeWidth="2" />
        <text x="60" y="130" textAnchor="middle" className="text-[10px] fill-slate-300">Step 1: Visualisation (SUD 20)</text>
      </g>

      {/* SUD Level Meter */}
      <g transform="translate(200, 45)">
        <rect x="0" y="10" width="40" height="140" rx="6" fill="#1e293b" stroke="#475569" />
        <rect
          x="4"
          y={150 - barHeight}
          width="32"
          height={barHeight}
          rx="4"
          fill={sudLevel > 60 ? '#ef4444' : sudLevel > 30 ? '#f59e0b' : '#10b981'}
          className="transition-all duration-500"
        />
        <text x="20" y="170" textAnchor="middle" className="text-[10px] font-bold fill-slate-300">
          SUD: {sudLevel}
        </text>
      </g>

      {/* Reciprocal Inhibition Graph */}
      <g transform="translate(290, 45)">
        <rect x="0" y="10" width="270" height="140" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1" />
        <text x="135" y="30" textAnchor="middle" className="text-[11px] font-bold fill-gold-300">
          Reciprocal Inhibition Dynamics
        </text>

        {/* Anxiety Curve */}
        <path
          d={relaxActive ? 'M 15 70 Q 100 120 250 130' : 'M 15 110 Q 100 30 250 20'}
          fill="none"
          stroke="#ef4444"
          strokeWidth="3"
          className="transition-all duration-700"
        />
        <text x="200" y="40" className="text-[10px] fill-red-400 font-bold">Anxiety Signal</text>

        {/* Relaxation Curve */}
        <path
          d={relaxActive ? 'M 15 130 Q 100 30 250 20' : 'M 15 130 Q 100 120 250 130'}
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
          strokeDasharray={relaxActive ? '0' : '4,4'}
          className="transition-all duration-700"
        />
        <text x="200" y="125" className="text-[10px] fill-emerald-400 font-bold">PMR Parasympathetic</text>
      </g>

      <text x="300" y="215" textAnchor="middle" className="text-[11px] fill-slate-400 italic">
        {relaxActive ? '⚡ Reciprocal Inhibition Active: Deep muscle relaxation overrides sympathetic panic' : '⚠️ High Anxiety Arousal: Activate PMR Relaxation to lower SUD'}
      </text>
    </svg>
  );
};

// Diagram 3: Carl Rogers Therapeutic Alliance & Humanistic Growth
const TherapeuticAllianceSVG: React.FC<{ empathy: number; regard: number; congruence: number }> = ({
  empathy,
  regard,
  congruence,
}) => {
  const avgGrowth = Math.round((empathy + regard + congruence) / 3);
  return (
    <svg viewBox="0 0 600 240" className="w-full h-auto max-h-60 rounded-xl bg-slate-900 shadow-inner">
      <text x="300" y="22" textAnchor="middle" className="text-xs font-bold fill-slate-300 tracking-wider">
        ROGERS’ HUMANISTIC CORE CONDITIONS & SELF-ACTUALISATION
      </text>

      {/* Venn / Pillar Diagram */}
      <g transform="translate(50, 50)">
        {/* Empathy Pillar */}
        <rect x="10" y={130 - (empathy / 100) * 90} width="45" height={(empathy / 100) * 90} rx="4" fill="#3b82f6" />
        <text x="32" y="145" textAnchor="middle" className="text-[10px] fill-slate-300 font-bold">Empathy</text>
        <text x="32" y="160" textAnchor="middle" className="text-[10px] fill-gold-400 font-bold">{empathy}%</text>

        {/* Regard Pillar */}
        <rect x="85" y={130 - (regard / 100) * 90} width="45" height={(regard / 100) * 90} rx="4" fill="#10b981" />
        <text x="107" y="145" textAnchor="middle" className="text-[10px] fill-slate-300 font-bold">UP Regard</text>
        <text x="107" y="160" textAnchor="middle" className="text-[10px] fill-emerald-400 font-bold">{regard}%</text>

        {/* Congruence Pillar */}
        <rect x="160" y={130 - (congruence / 100) * 90} width="45" height={(congruence / 100) * 90} rx="4" fill="#8b5cf6" />
        <text x="182" y="145" textAnchor="middle" className="text-[10px] fill-slate-300 font-bold">Genuineness</text>
        <text x="182" y="160" textAnchor="middle" className="text-[10px] fill-purple-400 font-bold">{congruence}%</text>
      </g>

      {/* Self-Actualisation Pyramid */}
      <g transform="translate(320, 45)">
        <polygon points="120,10 20,150 220,150" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />

        {/* Self-Actualisation Peak Fill */}
        <polygon
          points={`120,10 ${120 - (avgGrowth / 100) * 100},${150 - (avgGrowth / 100) * 140} ${120 + (avgGrowth / 100) * 100},${150 - (avgGrowth / 100) * 140}`}
          fill="#f59e0b"
          opacity="0.8"
          className="transition-all duration-500"
        />

        <text x="120" y="60" textAnchor="middle" className="text-[11px] font-bold fill-white">
          Self-Actualisation
        </text>
        <text x="120" y="80" textAnchor="middle" className="text-[10px] fill-amber-200">
          Growth Index: {avgGrowth}%
        </text>
        <text x="120" y="120" textAnchor="middle" className="text-[9px] fill-slate-300">
          Ideal Self ↔ Real Self Congruence
        </text>
      </g>

      <text x="300" y="222" textAnchor="middle" className="text-[10px] fill-slate-400">
        Higher core therapeutic conditions reduce client defensiveness and expand personal potential.
      </text>
    </svg>
  );
};

// Diagram 4: Alternative Biofeedback & Brainwaves
const AutonomicBalanceSVG: React.FC<{ breathRate: number; mode: 'sky' | 'vipassana' | 'normal' }> = ({ breathRate, mode }) => {
  const isCalm = mode === 'sky' || mode === 'vipassana';
  return (
    <svg viewBox="0 0 600 240" className="w-full h-auto max-h-60 rounded-xl bg-slate-900 shadow-inner">
      <text x="300" y="22" textAnchor="middle" className="text-xs font-bold fill-slate-300 tracking-wider">
        AUTONOMIC BIOFEEDBACK & BRAINWAVE SPECTROGRAM
      </text>

      {/* Sympathetic vs Parasympathetic Balance */}
      <g transform="translate(40, 50)">
        <rect x="0" y="0" width="220" height="130" rx="8" fill="#1e293b" stroke="#334155" />
        <text x="110" y="22" textAnchor="middle" className="text-[11px] font-bold fill-slate-200">
          Autonomic Balance
        </text>

        {/* Sympathetic */}
        <text x="15" y="50" className="text-[10px] fill-red-400 font-semibold">Sympathetic (Fight/Flight)</text>
        <rect x="15" y="58" width={isCalm ? "50" : "180"} height="14" rx="3" fill="#ef4444" className="transition-all duration-500" />

        {/* Parasympathetic */}
        <text x="15" y="95" className="text-[10px] fill-emerald-400 font-semibold">Parasympathetic (Rest/Digest)</text>
        <rect x="15" y="103" width={isCalm ? "180" : "60"} height="14" rx="3" fill="#10b981" className="transition-all duration-500" />
      </g>

      {/* EEG Waveform simulation */}
      <g transform="translate(290, 50)">
        <rect x="0" y="0" width="270" height="130" rx="8" fill="#1e293b" stroke="#334155" />
        <text x="135" y="22" textAnchor="middle" className="text-[11px] font-bold fill-gold-300">
          EEG Waveform ({isCalm ? 'Alpha / Theta 8-12Hz' : 'High Beta 20-30Hz'})
        </text>

        <path
          d={
            isCalm
              ? 'M 10 65 Q 40 25 70 65 T 130 65 T 190 65 T 250 65'
              : 'M 10 65 Q 20 35 30 65 T 50 65 T 70 65 T 90 65 T 110 65 T 130 65 T 150 65 T 170 65 T 190 65 T 210 65 T 230 65 T 250 65'
          }
          fill="none"
          stroke={isCalm ? '#06b6d4' : '#f59e0b'}
          strokeWidth="2.5"
          className="transition-all duration-500"
        />

        <text x="135" y="115" textAnchor="middle" className="text-[10px] fill-slate-300">
          Breath Rate: {breathRate} breaths/min | Cortisol: {isCalm ? 'Low (Optimal)' : 'Elevated'}
        </text>
      </g>

      <text x="300" y="215" textAnchor="middle" className="text-[10px] fill-slate-400">
        {mode === 'sky'
          ? 'Sudarshana Kriya Yoga induces vagal nerve stimulation and rhythmic parasympathetic dominant states.'
          : mode === 'vipassana'
          ? 'Vipassana Mindfulness enhances fronto-parietal alpha wave coherence and equanimity.'
          : 'Normal baseline stress state.'}
      </text>
    </svg>
  );
};

// Diagram 5: Multimodal Rehabilitation Pipeline
const RehabilitationPathwaySVG: React.FC<{ stage: number }> = ({ stage }) => {
  return (
    <svg viewBox="0 0 600 240" className="w-full h-auto max-h-60 rounded-xl bg-slate-900 shadow-inner">
      <text x="300" y="22" textAnchor="middle" className="text-xs font-bold fill-slate-300 tracking-wider">
        MULTIMODAL PSYCHIATRIC REHABILITATION PIPELINE
      </text>

      {/* Stage 1: Clinical Stabilization */}
      <rect x="30" y="60" width="150" height="90" rx="8" fill={stage >= 1 ? '#1e3a8a' : '#1e293b'} stroke={stage >= 1 ? '#3b82f6' : '#475569'} strokeWidth="2" />
      <text x="105" y="85" textAnchor="middle" className="text-[11px] font-bold fill-gold-300">1. Medical & Symptoms</text>
      <text x="105" y="105" textAnchor="middle" className="text-[9px] fill-slate-300">Pharmacotherapy &</text>
      <text x="105" y="120" textAnchor="middle" className="text-[9px] fill-slate-300">Acute Crisis Management</text>

      {/* Arrow 1-2 */}
      <line x1="180" y1="105" x2="225" y2="105" stroke="#94a3b8" strokeWidth="2" />

      {/* Stage 2: Occupational & Social Skills */}
      <rect x="225" y="60" width="150" height="90" rx="8" fill={stage >= 2 ? '#064e3b' : '#1e293b'} stroke={stage >= 2 ? '#10b981' : '#475569'} strokeWidth="2" />
      <text x="300" y="85" textAnchor="middle" className="text-[11px] font-bold fill-emerald-300">2. Social & Personal</text>
      <text x="300" y="105" textAnchor="middle" className="text-[9px] fill-slate-300">Social Skills Roleplay &</text>
      <text x="300" y="120" textAnchor="middle" className="text-[9px] fill-slate-300">Occupational Daily Routines</text>

      {/* Arrow 2-3 */}
      <line x1="375" y1="105" x2="420" y2="105" stroke="#94a3b8" strokeWidth="2" />

      {/* Stage 3: Vocational & Community Integration */}
      <rect x="420" y="60" width="150" height="90" rx="8" fill={stage >= 3 ? '#581c87' : '#1e293b'} stroke={stage >= 3 ? '#a855f7' : '#475569'} strokeWidth="2" />
      <text x="495" y="85" textAnchor="middle" className="text-[11px] font-bold fill-purple-300">3. Vocational Integration</text>
      <text x="495" y="105" textAnchor="middle" className="text-[9px] fill-slate-300">Job Skill Training &</text>
      <text x="495" y="120" textAnchor="middle" className="text-[9px] fill-slate-300">Independent Autonomy</text>

      {/* Bottom status bar */}
      <rect x="30" y="170" width="540" height="35" rx="6" fill="#0f172a" stroke="#334155" />
      <text x="300" y="192" textAnchor="middle" className="text-[11px] font-semibold fill-slate-300">
        Current Pipeline Focus: {stage === 1 ? 'Acute Symptom Reduction' : stage === 2 ? 'Social & Daily Life Rehabilitation' : 'Full Vocational Independence'}
      </text>
    </svg>
  );
};

// ==========================================
// MAIN COMPONENT PROPS INTERFACE
// ==========================================
interface C12_PsyTherapeuticApproachesCBSESimProps {
  onComplete?: (score: number) => void;
}

// ==========================================
// MAIN COMPONENT DEFINITION
// ==========================================
export const C12_PsyTherapeuticApproachesCBSESim: React.FC<C12_PsyTherapeuticApproachesCBSESimProps> = ({
  onComplete,
}) => {
  // Navigation & Tab State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Discovery Tab State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [predAnswers, setPredAnswers] = useState<Record<number, number>>({});
  const [predSubmitted, setPredSubmitted] = useState<Record<number, boolean>>({});

  // Lab Tab State
  const [activeLabStepIndex, setActiveLabStepIndex] = useState<number>(0);
  const [obsAnswers, setObsAnswers] = useState<Record<number, number>>({});
  const [obsSubmitted, setObsSubmitted] = useState<Record<number, boolean>>({});

  // Lab 1 (CBT Restructuring) Controls
  const [cbtBeliefType, setCbtBeliefType] = useState<'irrational' | 'rational'>('irrational');
  const [cbtDisputeStrategy, setCbtDisputeStrategy] = useState<string>('empirical');

  // Lab 2 (Systematic Desensitisation) Controls
  const [hierarchyStep, setHierarchyStep] = useState<number>(1);
  const [relaxTechniqueActive, setRelaxTechniqueActive] = useState<boolean>(false);

  // Lab 3 (Humanistic Alliance) Controls
  const [empathyVal, setEmpathyVal] = useState<number>(50);
  const [regardVal, setRegardVal] = useState<number>(50);
  const [congruenceVal, setCongruenceVal] = useState<number>(50);

  // Lab 4 (Alternative Biofeedback) Controls
  const [breathRateVal, setBreathRateVal] = useState<number>(16);
  const [therapyMode, setTherapyMode] = useState<'normal' | 'sky' | 'vipassana'>('normal');

  // Lab 5 (Rehabilitation Matrix) Controls
  const [rehabStage, setRehabStage] = useState<number>(1);
  const [selectedCase, setSelectedCase] = useState<'schizophrenia' | 'depression' | 'phobia'>('schizophrenia');

  // Challenges Tab State
  const [challengeIndex, setChallengeIndex] = useState<number>(0);
  const [selectedChallengeOption, setSelectedChallengeOption] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());
  const [totalScore, setTotalScore] = useState<number>(0);

  // Hint & UI Feedback State
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // BKT & Spaced Repetition State
  const [bktState, setBktState] = useState(() =>
    ALL_NODE_IDS.reduce((acc, id) => {
      acc[id] = createBKTState();
      return acc;
    }, {} as Record<NodeId, ReturnType<typeof createBKTState>>)
  );

  const [srsItems, setSrsItems] = useState(() =>
    ALL_NODE_IDS.reduce((acc, id) => {
      acc[id] = createReviewItem(id);
      return acc;
    }, {} as Record<NodeId, ReturnType<typeof createReviewItem>>)
  );

  // Inactivity Hint Timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[challengeIndex];

  // Calculate overall node mastery percentage
  const overallMastery = useMemo(() => {
    const total = ALL_NODE_IDS.reduce((sum, id) => sum + masteryProb(bktState[id]), 0);
    return Math.round((total / ALL_NODE_IDS.length) * 100);
  }, [bktState]);

  // Handle Speech trigger
  const speakText = (text: string) => {
    try {
      speechManager.speak(text);
    } catch {
      // safe fallback
    }
  };

  // Sound trigger helper
  const playSound = (sound: SoundEffect) => {
    try {
      audioManager.play(sound);
    } catch {
      // safe fallback
    }
  };

  // Reset hint timer on interaction
  const resetInactivityTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowHint(false);
    timerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && currentChallenge) {
        setCurrentHint(currentChallenge.hints[0] || 'Take your time to carefully review the core therapeutic principle.');
        setShowHint(true);
        playSound('hint');
      }
    }, 12000);
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [challengeIndex, activeTab]);

  // Initial welcome speech
  useEffect(() => {
    speakText('Welcome to the CISCE Class 12 Therapeutic Approaches Psychology Simulation.');
  }, []);

  // Handle Discovery Question Submission
  const handleDiscoverySubmit = () => {
    if (discoverySelected === null) return;
    setDiscoverySubmitted(true);
    if (discoverySelected === DISCOVERY_QUESTION.correctIndex) {
      playSound('success');
      speakText('Correct! It is our irrational beliefs about events that cause emotional distress.');
    } else {
      playSound('error');
      speakText('Not quite. Review how beliefs filter activating events in the ABC model.');
    }
  };

  // Handle Prediction Question Submission
  const handlePredSubmit = (index: number) => {
    const selected = predAnswers[index];
    if (selected === undefined) return;
    setPredSubmitted((prev) => ({ ...prev, [index]: true }));
    const question = PREDICTION_QUESTIONS[index];
    if (selected === question.correctIndex) {
      playSound('success');
      speakText('Excellent prediction! Reciprocal inhibition and therapeutic conditions function exactly as predicted.');
    } else {
      playSound('error');
      speakText('Interesting prediction. Explore the interactive lab to verify the physiological mechanism.');
    }
  };

  // Handle Observation Question Submission
  const handleObsSubmit = (index: number) => {
    const selected = obsAnswers[index];
    if (selected === undefined) return;
    setObsSubmitted((prev) => ({ ...prev, [index]: true }));
    const question = OBSERVATION_QUESTIONS[index];
    if (selected === question.correctIndex) {
      playSound('success');
      speakText('Spot on observation!');
    } else {
      playSound('error');
      speakText('Check your observation parameters carefully in the lab display.');
    }
  };

  // Handle Challenge Submission
  const handleChallengeSubmit = () => {
    if (!currentChallenge) return;

    let isCorrect = false;
    if (currentChallenge.type === 'multiple-choice') {
      isCorrect = selectedChallengeOption === currentChallenge.correctIndex;
    } else if (currentChallenge.type === 'numeric') {
      const num = parseFloat(numericInput.trim());
      isCorrect = Math.abs(num - Number(currentChallenge.correctAnswer)) < 1.0;
    }

    // Update BKT & SRS
    const nodeId = currentChallenge.nodeId;
    const updatedBKT = bktUpdate(bktState[nodeId], isCorrect);
    setBktState((prev) => ({ ...prev, [nodeId]: updatedBKT }));

    const updatedSRS = sm2Update(srsItems[nodeId], isCorrect ? 5 : 2);
    setSrsItems((prev) => ({ ...prev, [nodeId]: updatedSRS }));

    if (isCorrect) {
      playSound('success');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1500);

      setChallengeFeedback({
        isCorrect: true,
        message: 'Correct! ' + currentChallenge.explanation,
      });

      if (!completedChallenges.has(currentChallenge.id)) {
        const nextSet = new Set(completedChallenges);
        nextSet.add(currentChallenge.id);
        setCompletedChallenges(nextSet);
        const addedPoints = currentChallenge.difficulty === 'Foundation' ? 10 : currentChallenge.difficulty === 'Standard' ? 15 : 25;
        const newScore = totalScore + addedPoints;
        setTotalScore(newScore);

        if (nextSet.size === CHALLENGES.length) {
          setShowConfetti(true);
          setShowSuccess(true);
          playSound('celebration');
          speakText('Congratulations! You have mastered all therapeutic approaches challenges.');
          recordGameScore('c12_psy_therapeutic_approaches', newScore);
          if (onComplete) onComplete(newScore);
        }
      }
    } else {
      playSound('error');
      setChallengeFeedback({
        isCorrect: false,
        message: 'Incorrect. ' + currentChallenge.explanation,
      });
    }
  };

  // Advance Challenge
  const nextChallenge = () => {
    setChallengeFeedback(null);
    setSelectedChallengeOption(null);
    setNumericInput('');
    if (challengeIndex < CHALLENGES.length - 1) {
      setChallengeIndex((prev) => prev + 1);
      playSound('swoop');
    }
  };

  // Calculated SUD Level for Lab 2
  const currentSUDLevel = useMemo(() => {
    const baseSUD = hierarchyStep * 18 + 10;
    return relaxTechniqueActive ? Math.max(10, baseSUD - 35) : baseSUD;
  }, [hierarchyStep, relaxTechniqueActive]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-3 md:p-6 flex flex-col gap-6">
      {/* SUCCESS BANNER & CONFETTI */}
      <SuccessBanner show={showSuccess} text="Therapeutic Approaches Mastery Complete!" />
      <Confetti show={showConfetti} />
      <SparkleBurst show={showSparkle} x={400} y={300} />

      {/* HEADER SECTION */}
      <header className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-gold-600/30 text-gold-400 text-xs px-2.5 py-1 rounded-full font-bold border border-gold-500/30">
              CISCE Class 12 Psychology
            </span>
            <span className="bg-emerald-600/30 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-bold border border-emerald-500/30">
              Chapter: Therapeutic Approaches
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-teal-300 to-gold-300">
            Therapeutic Approaches Interactive Lab
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Master Cognitive Restructuring (CBT), Systematic Desensitisation, Humanistic Alliance, Alternative Therapies & Psychiatric Rehab
          </p>
        </div>

        {/* Overall Mastery & Score Display */}
        <div className="flex items-center gap-4 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
          <div className="text-center">
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Mastery</div>
            <div className="text-xl font-black text-emerald-400">{overallMastery}%</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center">
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Sim Score</div>
            <div className="text-xl font-black text-amber-400">{totalScore} pts</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center">
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Challenges</div>
            <div className="text-xl font-black text-gold-400">
              {completedChallenges.size}/{CHALLENGES.length}
            </div>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="flex gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 overflow-x-auto">
        <button
          onClick={() => {
            setActiveTab('discovery');
            playSound('tap');
          }}
          className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-lg text-xs md:text-sm font-bold transition-all ${
            activeTab === 'discovery'
              ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          🔍 Discovery & Concept
        </button>
        <button
          onClick={() => {
            setActiveTab('lab');
            playSound('tap');
          }}
          className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-lg text-xs md:text-sm font-bold transition-all ${
            activeTab === 'lab'
              ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          🧪 Interactive Lab
        </button>
        <button
          onClick={() => {
            setActiveTab('challenges');
            playSound('tap');
          }}
          className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-lg text-xs md:text-sm font-bold transition-all ${
            activeTab === 'challenges'
              ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          ⚔️ Challenges ({completedChallenges.size}/{CHALLENGES.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('summary');
            playSound('tap');
          }}
          className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-lg text-xs md:text-sm font-bold transition-all ${
            activeTab === 'summary'
              ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          📋 Real-World & Summary
        </button>
      </nav>

      {/* TAB CONTENT SECTIONS */}

      {/* TAB 1: DISCOVERY & SCENARIO */}
      {activeTab === 'discovery' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Scenario Box */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-5">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs text-gold-400 font-bold uppercase tracking-wider">Clinical Context</span>
              <h2 className="text-xl font-bold text-white mt-1">{SCENARIO.title}</h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-xs text-slate-400 mt-2 italic">{SCENARIO.context}</p>
            </div>

            {/* Discovery Question Card */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="bg-amber-500/20 text-amber-400 text-xs px-2.5 py-1 rounded-md font-bold border border-amber-500/30">
                  Preconception Discovery Question
                </span>
              </div>
              <h3 className="text-base font-semibold text-slate-100">{DISCOVERY_QUESTION.question}</h3>

              <div className="flex flex-col gap-2">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={discoverySubmitted}
                    onClick={() => {
                      setDiscoverySelected(idx);
                      playSound('tap');
                    }}
                    className={`text-left p-3.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                      discoverySelected === idx
                        ? 'bg-gold-600/30 border-gold-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                    } border`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {!discoverySubmitted ? (
                <button
                  disabled={discoverySelected === null}
                  onClick={handleDiscoverySubmit}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-sm rounded-lg transition-all shadow-lg"
                >
                  Confirm & Test Discovery
                </button>
              ) : (
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 mt-2">
                  <div className="flex items-center gap-2 mb-2">
                    {discoverySelected === DISCOVERY_QUESTION.correctIndex ? (
                      <span className="text-emerald-400 font-bold text-sm">✓ Insight Confirmed!</span>
                    ) : (
                      <span className="text-amber-400 font-bold text-sm">💡 Concept Insight</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>

            {/* Prediction Questions */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-gold-400 uppercase tracking-wider">Pre-Lab Predictions</h3>

              {PREDICTION_QUESTIONS.map((pq, qIdx) => (
                <div key={qIdx} className="bg-slate-900 p-4 rounded-lg border border-slate-800 flex flex-col gap-3">
                  <p className="text-xs md:text-sm font-semibold text-slate-200">{pq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {pq.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        disabled={predSubmitted[qIdx]}
                        onClick={() => {
                          setPredAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
                          playSound('tap');
                        }}
                        className={`text-left p-2.5 rounded text-xs transition-all ${
                          predAnswers[qIdx] === oIdx
                            ? 'bg-gold-600 text-white font-bold'
                            : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {!predSubmitted[qIdx] ? (
                    <button
                      disabled={predAnswers[qIdx] === undefined}
                      onClick={() => handlePredSubmit(qIdx)}
                      className="py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded transition-all disabled:opacity-50"
                    >
                      Verify Prediction
                    </button>
                  ) : (
                    <div className="text-xs text-emerald-400 font-semibold bg-emerald-950/40 p-2 rounded border border-emerald-800/40">
                      ✓ Verified. {pq.verifyInstruction}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar: Misconceptions & Theoretical Nodes */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-5">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <span>⚠️ Common Clinical Misconceptions</span>
            </h3>

            <div className="flex flex-col gap-3.5 overflow-y-auto max-h-[500px] pr-1">
              {MISCONCEPTIONS.map((m) => (
                <div key={m.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-col gap-2">
                  <div className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                    <span>❌ Misconception:</span>
                  </div>
                  <p className="text-xs text-slate-300 italic">"{m.misconception}"</p>
                  <div className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                    <span>✅ Scientific Truth:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{m.correction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE LAB SIMULATION */}
      {activeTab === 'lab' && (
        <div className="flex flex-col gap-6">
          {/* Lab Step Selector Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveLabStepIndex(idx);
                  playSound('tap');
                }}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                  activeLabStepIndex === idx
                    ? 'bg-gold-600 border-gold-400 text-white shadow-lg shadow-gold-600/30'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                <div className="text-[10px] text-gold-300 uppercase font-semibold">Step {idx + 1}</div>
                <div className="truncate mt-0.5">{step.title.split(':')[1] || step.title}</div>
              </button>
            ))}
          </div>

          {/* Active Lab Module Content */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-gold-400 font-bold uppercase tracking-wider">
                  Interactive Lab Module {activeLabStepIndex + 1} of 5
                </span>
                <h2 className="text-xl font-bold text-white mt-0.5">{EXPLORATION_STEPS[activeLabStepIndex].title}</h2>
                <p className="text-xs text-slate-300 mt-1">{EXPLORATION_STEPS[activeLabStepIndex].instruction}</p>
              </div>
            </div>

            {/* LAB MODULE 1: ABC MATRIX & CBT RESTRUCTURING */}
            {activeLabStepIndex === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <ABCModelDiagramSVG beliefType={cbtBeliefType} />

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
                    <h4 className="text-xs font-bold text-slate-300 uppercase">Interactive CBT Variables</h4>

                    <div>
                      <label className="text-xs text-slate-400 font-semibold block mb-1">Select Client Core Belief Pattern:</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            setCbtBeliefType('irrational');
                            playSound('pop');
                          }}
                          className={`p-2.5 rounded-lg text-xs font-bold transition-all ${
                            cbtBeliefType === 'irrational'
                              ? 'bg-red-600/40 border-red-500 text-red-200 border'
                              : 'bg-slate-900 border-slate-800 text-slate-400 border'
                          }`}
                        >
                          ❌ Irrational ("I MUST perform perfectly")
                        </button>
                        <button
                          onClick={() => {
                            setCbtBeliefType('rational');
                            playSound('pop');
                          }}
                          className={`p-2.5 rounded-lg text-xs font-bold transition-all ${
                            cbtBeliefType === 'rational'
                              ? 'bg-emerald-600/40 border-emerald-500 text-emerald-200 border'
                              : 'bg-slate-900 border-slate-800 text-slate-400 border'
                          }`}
                        >
                          ✅ Rational ("I prefer to do well, but failure is survivable")
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 font-semibold block mb-1">Apply Dispute Strategy (D):</label>
                      <select
                        value={cbtDisputeStrategy}
                        onChange={(e) => {
                          setCbtDisputeStrategy(e.target.value);
                          playSound('tap');
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                      >
                        <option value="empirical">Empirical Dispute (What is the real evidence?)</option>
                        <option value="logical">Logical Dispute (Does it logically follow?)</option>
                        <option value="pragmatic">Pragmatic Dispute (How does holding this belief help you?)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
                  <h4 className="text-sm font-bold text-gold-400 uppercase">Cognitive Formulation Output</h4>

                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="font-bold text-gold-400">Activating Event (A):</span> Client faced rejection during a high-stakes interview.
                    </div>
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="font-bold text-purple-400">Belief (B):</span>{' '}
                      {cbtBeliefType === 'irrational'
                        ? 'Dogmatic demand: "I must be approved by everyone or I am worthless."'
                        : 'Flexible preference: "Rejection is disappointing, but it does not define my self-worth."'}
                    </div>
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="font-bold text-emerald-400">Consequence (C):</span>{' '}
                      {cbtBeliefType === 'irrational'
                        ? 'Severe anxiety, social withdrawal, depression.'
                        : 'Mild disappointment, constructive resilience, preparing for next attempt.'}
                    </div>
                  </div>

                  <div className="bg-gold-950/40 p-3.5 rounded-lg border border-gold-800/40 text-xs text-gold-200">
                    <span className="font-bold">Dispute Insight ({cbtDisputeStrategy.toUpperCase()}):</span>{' '}
                    {cbtDisputeStrategy === 'empirical'
                      ? 'Testing facts: Rejection from one firm does not prove zero value in all firms.'
                      : cbtDisputeStrategy === 'logical'
                      ? 'Testing logic: Wanting success does not mean the universe MUST guarantee success.'
                      : 'Testing utility: Believing you are ruined only increases paralysis and reduces future preparation.'}
                  </div>
                </div>
              </div>
            )}

            {/* LAB MODULE 2: SYSTEMATIC DESENSITISATION */}
            {activeLabStepIndex === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <SystematicDesensitizationSVG sudLevel={currentSUDLevel} relaxActive={relaxTechniqueActive} />

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-4">
                    <h4 className="text-xs font-bold text-slate-300 uppercase">Hierarchy Step Controller</h4>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Current Hierarchy Step: {hierarchyStep} / 5</span>
                        <span className="font-bold text-amber-400">SUD: {currentSUDLevel} / 100</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={hierarchyStep}
                        onChange={(e) => {
                          setHierarchyStep(Number(e.target.value));
                          playSound('count');
                        }}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <div>
                        <div className="text-xs font-bold text-white">Progressive Muscle Relaxation (PMR)</div>
                        <div className="text-[10px] text-slate-400">Triggers Reciprocal Inhibition</div>
                      </div>
                      <button
                        onClick={() => {
                          setRelaxTechniqueActive(!relaxTechniqueActive);
                          playSound(relaxTechniqueActive ? 'pop' : 'chime');
                        }}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                          relaxTechniqueActive
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {relaxTechniqueActive ? '⚡ PMR Active' : 'Activate PMR'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
                  <h4 className="text-sm font-bold text-gold-400 uppercase">Reciprocal Inhibition Analysis</h4>

                  <div className="bg-slate-900 p-4 rounded-lg stroke-slate-800 border text-xs space-y-2 text-slate-300">
                    <p className="font-bold text-amber-300">Target Phobia: Public Speaking Anxiety</p>
                    <p>
                      <strong>Active Exposure Item:</strong>{' '}
                      {hierarchyStep === 1
                        ? 'Visualizing giving a 1-minute speech in private.'
                        : hierarchyStep === 2
                        ? 'Speaking in front of a mirror.'
                        : hierarchyStep === 3
                        ? 'Presenting to 3 supportive family members.'
                        : hierarchyStep === 4
                        ? 'Rehearsing in an empty lecture hall.'
                        : 'Delivering a presentation to a full auditorium of 200 people.'}
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg text-xs font-semibold ${relaxTechniqueActive ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-200 border' : 'bg-red-950/40 border-red-800/40 text-red-200 border'}`}>
                    {relaxTechniqueActive
                      ? '✓ Reciprocal Inhibition engaged: Muscular relaxation inhibits sympathetic fight-or-flight signaling, extinguishing phobic conditioning.'
                      : '⚠️ Uninhibited Anxiety: Without bodily relaxation, exposure maintains high physiological arousal without desensitisation.'}
                  </div>
                </div>
              </div>
            )}

            {/* LAB MODULE 3: ROGERS HUMANISTIC ALLIANCE */}
            {activeLabStepIndex === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <TherapeuticAllianceSVG empathy={empathyVal} regard={regardVal} congruence={congruenceVal} />

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
                    <h4 className="text-xs font-bold text-slate-300 uppercase">Core Therapeutic Conditions Sliders</h4>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Therapist Empathy: {empathyVal}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={empathyVal}
                        onChange={(e) => {
                          setEmpathyVal(Number(e.target.value));
                          playSound('count');
                        }}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Unconditional Positive Regard: {regardVal}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={regardVal}
                        onChange={(e) => {
                          setRegardVal(Number(e.target.value));
                          playSound('count');
                        }}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Congruence / Genuineness: {congruenceVal}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={congruenceVal}
                        onChange={(e) => {
                          setCongruenceVal(Number(e.target.value));
                          playSound('count');
                        }}
                        className="w-full accent-purple-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
                  <h4 className="text-sm font-bold text-gold-400 uppercase">Humanistic Healing Dynamics</h4>

                  <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-xs space-y-2 text-slate-300">
                    <p className="font-bold text-purple-300">Client Self-Actualisation Index: {Math.round((empathyVal + regardVal + congruenceVal) / 3)}%</p>
                    <p>
                      In Rogerian Person-Centred therapy, psychological distress arises from a gap (incongruence) between the Real Self and Ideal Self.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-gold-950/40 border border-gold-800/40 text-xs text-gold-200">
                    <p className="font-semibold mb-1">Therapeutic Boundary Check:</p>
                    <p>
                      {empathyVal > 70 && regardVal > 70
                        ? 'High alliance environment: Client drops defense mechanisms, explores deep emotions safely, and advances toward self-actualisation.'
                        : 'Sub-optimal alliance: Low empathy or conditional regard causes client defensive guardedness.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* LAB MODULE 4: ALTERNATIVE BIOFEEDBACK */}
            {activeLabStepIndex === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <AutonomicBalanceSVG breathRate={breathRateVal} mode={therapyMode} />

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-4">
                    <h4 className="text-xs font-bold text-slate-300 uppercase">Modality & Biofeedback Controls</h4>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => {
                          setTherapyMode('normal');
                          setBreathRateVal(18);
                          playSound('pop');
                        }}
                        className={`p-2.5 rounded-lg text-xs font-bold transition-all ${
                          therapyMode === 'normal' ? 'bg-amber-600 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 border'
                        }`}
                      >
                        Baseline Stress
                      </button>
                      <button
                        onClick={() => {
                          setTherapyMode('sky');
                          setBreathRateVal(6);
                          playSound('pop');
                        }}
                        className={`p-2.5 rounded-lg text-xs font-bold transition-all ${
                          therapyMode === 'sky' ? 'bg-gold-600 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 border'
                        }`}
                      >
                        SKY Yoga Breath
                      </button>
                      <button
                        onClick={() => {
                          setTherapyMode('vipassana');
                          setBreathRateVal(10);
                          playSound('pop');
                        }}
                        className={`p-2.5 rounded-lg text-xs font-bold transition-all ${
                          therapyMode === 'vipassana' ? 'bg-gold-600 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 border'
                        }`}
                      >
                        Vipassana Meditation
                      </button>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Respiration Rate: {breathRateVal} breaths / minute</span>
                      </div>
                      <input
                        type="range"
                        min="4"
                        max="25"
                        value={breathRateVal}
                        onChange={(e) => {
                          setBreathRateVal(Number(e.target.value));
                          playSound('count');
                        }}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
                  <h4 className="text-sm font-bold text-gold-400 uppercase">Mind-Body Neurobiology</h4>

                  <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-xs space-y-2 text-slate-300">
                    <p className="font-bold text-gold-300">
                      {therapyMode === 'sky'
                        ? 'Sudarshana Kriya Yoga Protocol Active'
                        : therapyMode === 'vipassana'
                        ? 'Vipassana Mindfulness Insight Protocol Active'
                        : 'Unregulated Stress State'}
                    </p>
                    <p>
                      {therapyMode === 'sky'
                        ? 'Rhythmic breathing shifts heart rate variability (HRV), stimulates vagus nerve, and reduces serum cortisol levels.'
                        : therapyMode === 'vipassana'
                        ? 'Mindfulness observation cultivates equanimity, dampens amygdala reactivity, and enhances prefrontal executive control.'
                        : 'Elevated respiration activates sympathetic arousal, triggering fight-or-flight endocrine cascades.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* LAB MODULE 5: REHABILITATION MATRIX */}
            {activeLabStepIndex === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <RehabilitationPathwaySVG stage={rehabStage} />

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-4">
                    <h4 className="text-xs font-bold text-slate-300 uppercase">Rehabilitation Pipeline Controller</h4>

                    <div>
                      <label className="text-xs text-slate-400 font-semibold block mb-1">Client Case Profile:</label>
                      <select
                        value={selectedCase}
                        onChange={(e) => {
                          setSelectedCase(e.target.value as any);
                          playSound('tap');
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                      >
                        <option value="schizophrenia">Chronic Schizophrenia in Remission (Community Integration)</option>
                        <option value="depression">Severe Recurrent Depression (Occupational Activation)</option>
                        <option value="phobia">Severe Agoraphobia (Social Skills & Independence)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => {
                          setRehabStage(1);
                          playSound('pop');
                        }}
                        className={`p-2.5 rounded-lg text-xs font-bold transition-all ${
                          rehabStage === 1 ? 'bg-gold-600 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 border'
                        }`}
                      >
                        Stage 1: Clinical
                      </button>
                      <button
                        onClick={() => {
                          setRehabStage(2);
                          playSound('pop');
                        }}
                        className={`p-2.5 rounded-lg text-xs font-bold transition-all ${
                          rehabStage === 2 ? 'bg-emerald-600 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 border'
                        }`}
                      >
                        Stage 2: Social/Occ
                      </button>
                      <button
                        onClick={() => {
                          setRehabStage(3);
                          playSound('pop');
                        }}
                        className={`p-2.5 rounded-lg text-xs font-bold transition-all ${
                          rehabStage === 3 ? 'bg-purple-600 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 border'
                        }`}
                      >
                        Stage 3: Vocational
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
                  <h4 className="text-sm font-bold text-gold-400 uppercase">Multimodal Rehabilitation Strategy</h4>

                  <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-xs space-y-2 text-slate-300">
                    <p className="font-bold text-emerald-400">Target Focus: {selectedCase.toUpperCase()}</p>
                    <p>
                      {rehabStage === 1
                        ? 'Phase 1 Focus: Pharmacological stability, symptom reduction, establishing therapeutic alliance.'
                        : rehabStage === 2
                        ? 'Phase 2 Focus: Occupational therapy (daily self-care, budgeting, cooking) and Social Skills roleplay (assertiveness, active listening).'
                        : 'Phase 3 Focus: Vocational skill development, sheltered workshop training, competitive job placement.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* OBSERVATION QUESTIONS AT BOTTOM OF LAB */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col gap-4 mt-2">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Lab Observation Verification</h3>

              {OBSERVATION_QUESTIONS.map((oq, oIdx) => (
                <div key={oIdx} className="bg-slate-900 p-4 rounded-lg border border-slate-800 flex flex-col gap-3">
                  <p className="text-xs md:text-sm font-semibold text-slate-200">{oq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {oq.observableOptions.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        disabled={obsSubmitted[oIdx]}
                        onClick={() => {
                          setObsAnswers((prev) => ({ ...prev, [oIdx]: optIdx }));
                          playSound('tap');
                        }}
                        className={`text-left p-2.5 rounded text-xs transition-all ${
                          obsAnswers[oIdx] === optIdx
                            ? 'bg-emerald-600 text-white font-bold'
                            : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {!obsSubmitted[oIdx] ? (
                    <button
                      disabled={obsAnswers[oIdx] === undefined}
                      onClick={() => handleObsSubmit(oIdx)}
                      className="py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded transition-all disabled:opacity-50"
                    >
                      Confirm Observation
                    </button>
                  ) : (
                    <div className="text-xs text-emerald-400 font-semibold bg-emerald-950/40 p-2 rounded border border-emerald-800/40">
                      ✓ Verified in Simulation Engine.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PROGRESSIVE CHALLENGES */}
      {activeTab === 'challenges' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Challenge Arena */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-5">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-gold-400 font-bold uppercase tracking-wider">
                  Challenge {challengeIndex + 1} of {CHALLENGES.length}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                      currentChallenge.difficulty === 'Foundation'
                        ? 'bg-gold-600/30 text-gold-400 border border-gold-500/30'
                        : currentChallenge.difficulty === 'Standard'
                        ? 'bg-amber-600/30 text-amber-400 border border-amber-500/30'
                        : 'bg-purple-600/30 text-purple-400 border border-purple-500/30'
                    }`}
                  >
                    {currentChallenge.difficulty}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{currentChallenge.competencyLevel}</span>
                </div>
              </div>

              {/* Step Navigator */}
              <div className="flex gap-1">
                <button
                  disabled={challengeIndex === 0}
                  onClick={() => {
                    setChallengeIndex((prev) => prev - 1);
                    setChallengeFeedback(null);
                    setSelectedChallengeOption(null);
                    playSound('tap');
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs font-bold rounded-lg"
                >
                  ◀ Prev
                </button>
                <button
                  disabled={challengeIndex === CHALLENGES.length - 1}
                  onClick={() => {
                    setChallengeIndex((prev) => prev + 1);
                    setChallengeFeedback(null);
                    setSelectedChallengeOption(null);
                    playSound('tap');
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs font-bold rounded-lg"
                >
                  Next ▶
                </button>
              </div>
            </div>

            {/* Question Text */}
            <h3 className="text-base md:text-lg font-bold text-white leading-relaxed">{currentChallenge.question}</h3>

            {/* Hint Bubble */}
            <HintBubble show={showHint} text={currentHint} />

            {/* Options Input Section */}
            {currentChallenge.type === 'multiple-choice' && currentChallenge.options && (
              <div className="flex flex-col gap-2.5">
                {currentChallenge.options.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={challengeFeedback !== null}
                    onClick={() => {
                      setSelectedChallengeOption(idx);
                      playSound('tap');
                    }}
                    className={`text-left p-4 rounded-xl text-xs md:text-sm font-medium transition-all ${
                      selectedChallengeOption === idx
                        ? 'bg-gold-600/30 border-gold-500 text-white shadow-lg'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-850'
                    } border`}
                  >
                    <span className="font-bold text-slate-400 mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {option}
                  </button>
                ))}
              </div>
            )}

            {currentChallenge.type === 'numeric' && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
                <label className="text-xs text-slate-300 font-semibold">Enter Calculated Numerical Value:</label>
                <input
                  type="number"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="e.g. 58"
                  className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-gold-500"
                />
              </div>
            )}

            {/* Submit / Next Controls */}
            {challengeFeedback === null ? (
              <button
                disabled={currentChallenge.type === 'multiple-choice' ? selectedChallengeOption === null : numericInput.trim() === ''}
                onClick={handleChallengeSubmit}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-lg"
              >
                Submit Answer
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <div
                  className={`p-4 rounded-xl text-xs md:text-sm font-semibold border ${
                    challengeFeedback.isCorrect
                      ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200'
                      : 'bg-red-950/60 border-red-800 text-red-200'
                  }`}
                >
                  {challengeFeedback.message}
                </div>
                {challengeIndex < CHALLENGES.length - 1 && (
                  <button
                    onClick={nextChallenge}
                    className="w-full py-3.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg"
                  >
                    Proceed to Next Challenge ▶
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Sidebar: Challenge Progress & Mastery Status */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-5">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Challenge Index Matrix</h3>

            <div className="grid grid-cols-4 gap-2">
              {CHALLENGES.map((ch, idx) => {
                const isDone = completedChallenges.has(ch.id);
                const isCurrent = idx === challengeIndex;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setChallengeIndex(idx);
                      setChallengeFeedback(null);
                      setSelectedChallengeOption(null);
                      playSound('tap');
                    }}
                    className={`h-10 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'ring-2 ring-gold-400 bg-gold-600 text-white'
                        : isDone
                        ? 'bg-emerald-600/30 border border-emerald-500/40 text-emerald-400'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Knowledge Node Mastery Breakdown */}
            <div className="mt-4 border-t border-slate-800 pt-4 flex flex-col gap-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase">Therapeutic Sub-Domain Mastery</h4>
              {['Foundation', 'Behavioural', 'Cognitive', 'Humanistic', 'Alternative & Rehab'].map((cat) => {
                const nodes = Object.values(NODE_DICTIONARY).filter((n) => n.category === cat);
                const avg = Math.round(
                  nodes.reduce((sum, n) => sum + masteryProb(bktState[n.id]), 0) / (nodes.length || 1) * 100
                );
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>{cat}</span>
                      <span className="font-bold text-slate-200">{avg}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-gold-500 h-full transition-all duration-500" style={{ width: `${avg}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: REAL-WORLD & SUMMARY */}
      {activeTab === 'summary' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs text-gold-400 font-bold uppercase tracking-wider">Clinical Application</span>
              <h2 className="text-xl font-bold text-white mt-1">{REAL_WORLD_ACTIVITY.title}</h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            </div>

            {/* Real World Activity Steps */}
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Clinical Steps Protocol:</h3>
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Node Dictionary Reference */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              ISC Curriculum Node Reference ({ALL_NODE_IDS.length} Nodes)
            </h3>

            <div className="flex flex-col gap-3 overflow-y-auto max-h-[600px] pr-1">
              {ALL_NODE_IDS.map((id) => {
                const node = NODE_DICTIONARY[id];
                const mastery = Math.round(masteryProb(bktState[id]) * 100);
                return (
                  <div key={id} className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col gap-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gold-400">{node.title}</span>
                      <span className="text-[10px] text-emerald-400 font-semibold">{mastery}% Mastery</span>
                    </div>
                    <p className="text-slate-300 text-[11px] mt-0.5">{node.definition}</p>
                    <p className="text-slate-400 text-[10px] italic">ELI5: {node.eli5}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default C12_PsyTherapeuticApproachesCBSESim;