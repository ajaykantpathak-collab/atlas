'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS CONSTANTS (ALL 10 ISC MASS MEDIA NODES) ───
const NODE_C11_MASSMEDIA_001 = 'c11_massmedia_001';
const NODE_C11_MASSMEDIA_002 = 'c11_massmedia_002';
const NODE_C11_MASSMEDIA_003 = 'c11_massmedia_003';
const NODE_C11_MASSMEDIA_004 = 'c11_massmedia_004';
const NODE_C11_MASSMEDIA_005 = 'c11_massmedia_005';
const NODE_C11_MASSMEDIA_006 = 'c11_massmedia_006';
const NODE_C11_MASSMEDIA_007 = 'c11_massmedia_007';
const NODE_C11_MASSMEDIA_008 = 'c11_massmedia_008';
const NODE_C11_MASSMEDIA_009 = 'c11_massmedia_009';
const NODE_C11_MASSMEDIA_010 = 'c11_massmedia_010';

const ALL_NODE_IDS = [
  NODE_C11_MASSMEDIA_001,
  NODE_C11_MASSMEDIA_002,
  NODE_C11_MASSMEDIA_003,
  NODE_C11_MASSMEDIA_004,
  NODE_C11_MASSMEDIA_005,
  NODE_C11_MASSMEDIA_006,
  NODE_C11_MASSMEDIA_007,
  NODE_C11_MASSMEDIA_008,
  NODE_C11_MASSMEDIA_009,
  NODE_C11_MASSMEDIA_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Newsroom Crisis: Odisha Cyclone Ground Zero',
  intro: 'A Category 4 cyclone is approaching the coast of Paradip, Odisha. At the National News Central desk in New Delhi, an unverified WhatsApp video is causing panic. As the chief newsroom editor and media theorist, you must orchestrate internal debriefs, model the communication flow, manage broadcast noise, verify urgent dispatches, and produce accurate hard news under pressure.',
  context: 'You will navigate all levels of communication (intrapersonal self-talk, interpersonal dyadic interviews, group editorial conferences, and national mass broadcasts) while testing Aristotle, Lasswell, Shannon-Weaver, and Schramm models before building five-component news leads.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'An unverified viral message arrives: "Paradip seaport submerged, 50 casualties feared!" The live telecast starts in 60 seconds. What is the fundamental difference between casual mass sharing and professional journalism?',
  options: [
    'Speed: Journalism broadcasts immediately before fact-checking to warn citizens first.',
    'Discipline: Journalism requires systematic Gathering, Verifying across independent sources, and Accountable Reporting.',
    'Technology: Journalism uses satellite DTH links while social media uses cellular 5G data.',
    'Sensationalism: Journalism uses emotive background music to attract maximum TRP ratings.',
  ],
  correctIndex: 1,
  hintAfter: "Don't worry if you were uncertain — let's explore how communication theory and journalistic discipline transform raw noise into trusted public truth!",
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

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: In the Shannon-Weaver model, if the channel noise increases dramatically during a live broadcast, what happens to the decoded message fidelity?',
    options: [
      'The receiver decodes a distorted or incomplete message due to noise interference (✓)',
      'The message becomes clearer because noise amplifies the signal',
      'Noise has no effect on digital broadcasts',
      'The sender automatically adjusts encoding to compensate',
    ],
    correctIndex: 0,
    verifyInstruction: 'In the Shannon-Weaver lab, increase the noise slider to 80% and observe the decoded message becoming garbled and incomplete.',
  },
  {
    question: 'Predict: If a news channel switches from a one-way mass broadcast to an interactive Schramm model with audience feedback, what changes?',
    options: [
      'The audience becomes active participants, sending feedback that shapes subsequent messaging (✓)',
      'Nothing changes — the audience remains passive',
      'The sender loses control of the message entirely',
      'The channel must stop broadcasting',
    ],
    correctIndex: 0,
    verifyInstruction: 'In the Schramm Model lab, toggle "Enable Feedback" and watch the audience feedback loop reshape the next broadcast cycle.',
  },
];

// ─── 22 PROGRESSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // Foundation Tier (1-7)
  {
    id: 'ch_f01',
    nodeId: NODE_C11_MASSMEDIA_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'The ISC syllabus defines communication as both a science and an art. Which aspect represents communication as a SCIENCE?',
    options: [
      'The evocative background music and poetic imagery in Satyajit Ray’s Pather Panchali.',
      'The systematic measurement of pan-India TRP ratings and structured encoder-channel-decoder modeling.',
      'The dramatic vocal modulation of a prime-time news anchor during a live debate.',
      'The emotional resonance of the Incredible India tourism ad campaign.',
    ],
    correctIndex: 1,
    explanation: 'Communication is a science because it is a systematic, rule-bound, measurable process that can be broken into observable components (sender, message, channel, receiver, feedback, noise) and quantitatively evaluated with metrics like BARC TRPs.',
    hints: [
      'Think about whether measurement, data, and structured processes belong to science or art.',
      'Look for the option that discusses quantitative testing, ratings, and systematic models.',
      'Art is creative expression (imagery, music); Science is measurable structure (TRP, encoding, channel metrics).',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_f02',
    nodeId: NODE_C11_MASSMEDIA_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In Intrapersonal Communication, who occupies the role of the sender and the receiver?',
    options: [
      'Two close colleagues discussing a news story over chai in a newsroom canteen.',
      'A news editor talking to six field correspondents over an encrypted radio channel.',
      'The exact same individual communicating within their own internal consciousness.',
      'A news anchor addressing an anonymous television audience of 50 million viewers.',
    ],
    correctIndex: 2,
    explanation: 'Intrapersonal communication is self-talk, internal reflection, and cognitive meaning-making where the sender and receiver are the same person.',
    hints: [
      'The prefix "intra-" means "within".',
      'Does intrapersonal communication require an external second person?',
      'Both encoding and decoding happen inside a single person\'s mind.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_f03',
    nodeId: NODE_C11_MASSMEDIA_003,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A senior editor consults one-on-one with a field correspondent at AIIMS Bhubaneswar. What distinct type of interpersonal communication is this?',
    options: [
      'Small-group communication (3 to 8 individuals).',
      'Dyadic communication (interaction between exactly two persons).',
      'Mass communication (mediated one-to-many broadcast).',
      'Intrapersonal deliberation (internal reflection within oneself).',
    ],
    correctIndex: 1,
    explanation: 'Dyadic communication involves exactly two individuals exchanging verbal and non-verbal cues with direct, immediate role-reversibility.',
    hints: [
      'Count the number of active participants in the consultation.',
      'A pair of two communicators forms a "dyad".',
      'Two-person direct exchanges are dyadic.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_f04',
    nodeId: NODE_C11_MASSMEDIA_004,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Arrange the four levels of communication in order of expanding scale from smallest/most intimate to largest/most dispersed.',
    sortItems: [
      'Intrapersonal Communication (Inner monologue)',
      'Interpersonal Dyadic Communication (Two people)',
      'Small Group Communication (Editorial board of 6)',
      'Mass Communication (Pan-India Doordarshan broadcast)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Communication expands hierarchically: Self (Intrapersonal) → Dyad/Pair (Interpersonal) → Group (3-15 members) → Dispersed Public (Mass).',
    hints: [
      'Start with the level where sender and receiver are the same person.',
      'Follow with two people, then a group in a room, then millions of unseen viewers.',
      'Correct order is Intra → Inter → Group → Mass.',
    ],
  },
  {
    id: 'ch_f05',
    nodeId: NODE_C11_MASSMEDIA_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What are the three core elements of Aristotle\'s classical communication model described in his treatise "Rhetoric"?',
    options: [
      'Information Source, Transmitter, and Destination.',
      'Speaker, Speech, and Audience.',
      'Who, Says What, and In Which Channel.',
      'Encoder, Decoder, and Shared Field of Experience.',
    ],
    correctIndex: 1,
    explanation: 'Aristotle’s model (c. 350 BCE) is a linear, speaker-centric rhetorical triangle consisting of Speaker, Speech, and Audience, supported by the three proofs: Ethos, Pathos, and Logos.',
    hints: [
      'Aristotle studied public speaking in ancient Greek assemblies.',
      'The three components focus on the orator, the spoken words, and the listeners.',
      'It is Speaker → Speech → Audience.',
    ],
  },
  {
    id: 'ch_f06',
    nodeId: NODE_C11_MASSMEDIA_008,
    type: 'construct',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Assemble the 3 core disciplined activities that define the practice of professional journalism.',
    availableParts: ['Gathering', 'Verifying', 'Reporting', 'Sensationalising', 'Advertising', 'Speculating'],
    targetState: 'Gathering Verifying Reporting',
    validationHint: 'Select the 3 legitimate journalistic verbs in sequential order.',
    explanation: 'Journalism is defined as the disciplined practice of Gathering raw facts, Verifying them against independent sources, and Reporting them clearly for public benefit.',
    hints: [
      'First reporters collect data from the field.',
      'Next they check accuracy and corroboration.',
      'Finally they present the verified account to the public.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_f07',
    nodeId: NODE_C11_MASSMEDIA_009,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following describes HARD NEWS rather than Soft News?',
    options: [
      'A Sunday lifestyle feature detailing how young Odia weavers in Sambalpur preserve traditional Ikat sarees.',
      'A travel diary exploring the historic culinary heritage of Kolkata’s Anglo-Indian bakeries.',
      'A time-sensitive, urgent front-page report on an approaching cyclone with evacuation timelines and official shelter locations.',
      'A weekend culture column analysing the musical motifs of Satyajit Ray’s film scores.',
    ],
    correctIndex: 2,
    explanation: 'Hard news is urgent, time-sensitive, factual information following an inverted pyramid structure that directly affects citizens immediately.',
    hints: [
      'Hard news deals with urgent, time-bound events where delay causes harm.',
      'Features and cultural retrospectives that can be read next week are soft news.',
      'The cyclone evacuation update is hard news.',
    ],
  },

  // Standard Tier (8-15)
  {
    id: 'ch_s08',
    nodeId: NODE_C11_MASSMEDIA_006,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Map Harold Lasswell\'s (1948) 5-question chain to its respective communication research field.',
    dragItems: [
      { label: 'Who', targetId: 'field_comm' },
      { label: 'Says What', targetId: 'field_content' },
      { label: 'In Which Channel', targetId: 'field_media' },
      { label: 'To Whom', targetId: 'field_audience' },
      { label: 'With What Effect', targetId: 'field_effect' },
    ],
    correctMapping: {
      field_comm: 'Who',
      field_content: 'Says What',
      field_media: 'In Which Channel',
      field_audience: 'To Whom',
      field_effect: 'With What Effect',
    },
    explanation: 'Lasswell’s model establishes 5 core research areas: Communicator Analysis (Who), Content Analysis (Says What), Media Analysis (Channel), Audience Analysis (To Whom), and Effect Analysis (With What Effect).',
    hints: [
      'The communicator is the person or entity speaking (Who).',
      'The content is the text/message itself (Says What).',
      'The vehicle/medium is the conduit (In Which Channel).',
    ],
  },
  {
    id: 'ch_s09',
    nodeId: NODE_C11_MASSMEDIA_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'During a live DD National telecast of a cyclone briefing, heavy rain creates severe DTH signal pixelation and audio crackle for viewers. In the Shannon-Weaver model, what is this?',
    options: [
      'Psychological bias in the receiver destination.',
      'Channel / Physical Noise distorting the transmitted signal.',
      'Semantic confusion caused by complex meteorological jargon.',
      'Negative feedback loop from the viewers to the news anchor.',
    ],
    correctIndex: 1,
    explanation: 'In the Shannon-Weaver transmission model (1949), any physical interference in the conduit (such as rain fade on satellite transponders or crackling wires) constitutes channel/physical noise.',
    hints: [
      'The distortion is caused by external weather hitting the transmission satellite feed.',
      'Is the distortion in the language (semantic), the viewer\'s mind (psychological), or the physical signal (channel)?',
      'Rain fade degrading a broadcast signal is classic physical channel noise.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_s10',
    nodeId: NODE_C11_MASSMEDIA_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A Delhi newsroom broadcasts a debate using English policy terms ("Fiscal deficit", "Monetary easing"). A rural farmer in Mayurbhanj hears the audio clearly but cannot grasp the concept. How does Wilbur Schramm’s (1954) model explain this failure?',
    options: [
      'The satellite transmitter malfunctioned, causing severe channel attenuation.',
      'There is minimal overlap between the sender’s and receiver’s "Field of Experience" (linguistic/cultural background).',
      'Lasswell’s "To Whom" element was completely omitted from the broadcast pipeline.',
      'Aristotle’s Pathos was excessively high, completely overpowering the speaker’s Ethos.',
    ],
    correctIndex: 1,
    explanation: 'Wilbur Schramm showed that communication occurs only where the sender and receiver share an overlapping "Field of Experience". When language, jargon, and social references do not overlap, decoding fails despite a perfect technical signal.',
    hints: [
      'The audio reached the TV set fine, so the technical signal transmission succeeded.',
      'Why did the viewer fail to interpret the meaning of the words?',
      'Look for Schramm\'s concept of shared linguistic, cultural, and educational background.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_s11',
    nodeId: NODE_C11_MASSMEDIA_010,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match the sentence: "According to Dr. S. K. Nayak, Chief Meteorologist at IMD Bhubaneswar..." to the core news component it primarily fulfills.',
    options: [
      'Clarity — using everyday simple vocabulary.',
      'Attribution — citing the specific authoritative source of non-firsthand facts.',
      'Brevity — keeping word count below 10 words.',
      'Subjectivity — injecting editorial personal sentiment.',
    ],
    correctIndex: 1,
    explanation: 'Attribution is the vital practice of explicitly identifying the source of information so the public can evaluate its credibility and the journalist avoids unsubstantiated assertions.',
    hints: [
      'The sentence tells the reader WHERE the fact originated.',
      'Naming an official IMD expert provides a credible source.',
      'Identifying the source of information is called attribution.',
    ],
  },
  {
    id: 'ch_s12',
    nodeId: NODE_C11_MASSMEDIA_005,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which Indian statutory/self-regulatory body oversees ethical standards and addresses paid-news complaints in PRINT journalism?',
    options: [
      'Telecom Regulatory Authority of India (TRAI)',
      'Press Council of India (PCI)',
      'Central Board of Film Certification (CBFC)',
      'Advertising Standards Council of India (ASCI)',
    ],
    correctIndex: 1,
    explanation: 'The Press Council of India (PCI), established under the Press Council Act 1978, is the statutory body preserving press freedom and maintaining ethics in print media.',
    hints: [
      'TRAI oversees telecom/broadcasting tariffs; CBFC certifies movies; ASCI regulates ads.',
      'Which body regulates print newspapers and press ethics?',
      'It is the Press Council of India (PCI).',
    ],
  },
  {
    id: 'ch_s13',
    nodeId: NODE_C11_MASSMEDIA_003,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A newsroom editor coaches a junior reporter on stress management, builds mutual trust, and explains assignment shifts. Which functions of interpersonal communication are operating simultaneously?',
    options: [
      'Only the information-sharing function in complete isolation.',
      'Information sharing, influence, and relationship building all interwoven in one dialogue.',
      'Mass propaganda and gatekeeping dissemination only.',
      'Intrapersonal subconscious self-reflection alone.',
    ],
    correctIndex: 1,
    explanation: 'Interpersonal communication functions are rarely isolated; in real-world dialogue, information sharing, interpersonal influence, and relationship building operate simultaneously.',
    hints: [
      'Can a conversation share information while also building trust and guiding behavior?',
      'The syllabus notes that the 3 functions are intertwined.',
      'It performs information sharing, influence, and relationship building all together.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_s14',
    nodeId: NODE_C11_MASSMEDIA_004,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is feedback in a small editorial meeting (6 journalists) qualitatively different from a large ministerial press conference (200 reporters)?',
    options: [
      'Small groups have zero feedback, while large conferences have continuous simultaneous feedback.',
      'Small group feedback is immediate, multi-directional, and co-creative, whereas large group feedback is filtered, delayed, and moderated.',
      'Large groups rely solely on telepathic intrapersonal cues.',
      'Small groups require formal microphones and stage queues to speak.',
    ],
    correctIndex: 1,
    explanation: 'In small groups, every member can immediately react, adjust, and negotiate meaning transactionally. In large groups, communication is one-to-many, and feedback is formal, filtered through microphones, and limited by time.',
    hints: [
      'Can all 200 journalists speak at the same instant during a press briefing?',
      'Think about immediate conversational back-and-forth vs queued Q&A.',
      'Small group feedback is fluid and transactional; large group feedback is structured and selective.',
    ],
  },
  {
    id: 'ch_s15',
    nodeId: NODE_C11_MASSMEDIA_010,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An editor needs a hard-news lead under 30 words answering Who, What, Where, When, and Source. The reporter submits a 54-word draft. How many redundant words must be eliminated to achieve brevity at exactly 24 words?',
    correctAnswer: 30,
    tolerance: 0,
    unit: 'words',
    explanation: '54 words - 24 words = 30 redundant words to remove. Brevity demands delivering maximum essential facts in minimum concise words without sacrificing accuracy.',
    hints: [
      'Subtract the target length (24) from the current draft length (54).',
      '54 - 24 = ?',
      'The answer is 30 words.',
    ],
  },

  // Advanced Tier (16-22)
  {
    id: 'ch_a16',
    nodeId: NODE_C11_MASSMEDIA_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A reporter covers an industrial chemical leak near Paradeep port. The report quotes local victims and environmental activists, but states: "Port authorities were contacted multiple times and declined to comment before press time." Does this uphold journalistic FAIRNESS?',
    options: [
      'No, because a story must NEVER be published unless both parties write 50% of the text.',
      'Yes, fairness requires providing the accused party a timely right of reply and transparently stating the outcome, avoiding false balance.',
      'No, fairness means omitting all quotes from activists to protect corporate reputations.',
      'Yes, but only because the reporter used sensational adjectives.',
    ],
    correctIndex: 1,
    explanation: 'Fairness means giving all relevant, affected parties an opportunity to respond before publication and avoiding bias. Documenting a reasonable attempt to obtain a response satisfies ethical requirements without allowing stonewalling to suppress public-interest news.',
    hints: [
      'Did the journalist give the port authority a fair chance to present their side?',
      'Fairness does not give an entity veto power by simply refusing to answer.',
      'Offering right of reply and noting the refusal satisfies fairness.',
    ],
  },
  {
    id: 'ch_a17',
    nodeId: NODE_C11_MASSMEDIA_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In Aristotle’s Rhetoric, if an experienced ISRO scientist presents verified telemetry graphs and data tables on lunar descent, which artistic proofs are dominant?',
    options: [
      'Pure Pathos (emotional appeal) with zero Logos.',
      'High Ethos (speaker authority/credibility) and High Logos (logical data/evidence).',
      'Only Semantic Noise and channel interference.',
      'Exclusive reliance on Harold Lasswell’s 5th question.',
    ],
    correctIndex: 1,
    explanation: 'Ethos represents the character and credibility of the speaker (an experienced ISRO scientist), while Logos represents the logical argument and factual data (telemetry charts). Pathos is the emotional appeal to audience sentiment.',
    hints: [
      'Ethos = Credibility of the source.',
      'Logos = Logic, facts, telemetry data.',
      'Pathos = Emotional resonance.',
    ],
  },
  {
    id: 'ch_a18',
    nodeId: NODE_C11_MASSMEDIA_007,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Order the six stages of the Shannon-Weaver (1949) mathematical transmission model in exact sequence from origination to destination.',
    sortItems: [
      '1. Information Source (News Editor)',
      '2. Transmitter / Encoder (Camera & Mic)',
      '3. Channel + Noise (Satellite Link & Monsoon Rain)',
      '4. Receiver / Decoder (DTH Set-Top Box)',
      '5. Destination (Citizen Watching TV)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The classic Shannon-Weaver chain: Information Source → Transmitter (Encoder) → Channel (exposed to Noise) → Receiver (Decoder) → Destination.',
    hints: [
      'Start with the originator of the message.',
      'Encoder comes before the channel; Decoder comes after the channel.',
      'Destination is the final human consumer.',
    ],
  },
  {
    id: 'ch_a19',
    nodeId: NODE_C11_MASSMEDIA_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An anchor opens a cyclone bulletin saying: "Tears and terror grip our souls tonight as nature unleashed monstrous wrath on innocent mothers!" Evaluate this broadcast against journalistic standards.',
    options: [
      'Exemplary journalism because sensational emotion boosts viewership TRPs.',
      'Flawed hard-news practice: it misapplies overdramatic soft-feature rhetoric to an emergency, violating objectivity, clarity, and factual discipline.',
      'Acceptable only if broadcast on private FM radio channels.',
      'Perfect compliance with the Press Council of India code for disaster reporting.',
    ],
    correctIndex: 1,
    explanation: 'Hard news during disasters demands factual sobriety, accurate casualty counts, and clear civic guidance. Dramatising human suffering with hyperbolic rhetoric violates NBDSA and PCI standards.',
    hints: [
      'Does emotional hyperbole help citizens take safe, factual evacuation actions?',
      'Disaster coverage requires factual sobriety, clarity, and verified data.',
      'Sensational rhetoric harms news objectivity and clarity.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_a20',
    nodeId: NODE_C11_MASSMEDIA_010,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct a professional, 5-component hard-news lead by selecting the correct sequence of building blocks.',
    availableParts: [
      'At least 420 residents were evacuated from coastal Paradip',
      'on Friday morning after Cyclone Dana made landfall,',
      'according to the Odisha Special Relief Commissioner.',
      'Somewhere near the sea things looked terribly scary',
      'unnamed rumors claimed many ghosts appeared',
    ],
    targetState: 'At least 420 residents were evacuated from coastal Paradip on Friday morning after Cyclone Dana made landfall, according to the Odisha Special Relief Commissioner.',
    validationHint: 'Select the 3 verified, attributed, clear, and brief factual clauses in order.',
    explanation: 'This lead fulfills all 5 components: Accuracy (specific numbers and location), Attribution (Odisha Special Relief Commissioner), Fairness (official factual account), Clarity (unambiguous action), and Brevity (concise inverted pyramid).',
    hints: [
      'Who/What happened first: Evacuation of 420 residents.',
      'When/Where: Friday morning landfall.',
      'Source/Attribution: Odisha Special Relief Commissioner.',
    ],
  },
  {
    id: 'ch_a21',
    nodeId: NODE_C11_MASSMEDIA_005,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'During the 2020 lockdown, Doordarshan rebroadcast the epic serial Ramayan (77 million viewers) while simultaneously airing Swayam Prabha school lessons. What dual functions of mass communication were demonstrated?',
    options: [
      'Dyadic bargaining and personal intrapersonal confession.',
      'Cultural Transmission / Entertainment alongside formal Education.',
      'Commercial advertising and unverified propaganda exclusively.',
      'Physical noise generation and semantic distortion.',
    ],
    correctIndex: 1,
    explanation: 'Mass media simultaneously fulfills multiple functions: Ramayan delivered Cultural Transmission and Entertainment, while Swayam Prabha DTH channels provided structured Education.',
    hints: [
      'Ramayan brings heritage, epic storytelling, and family viewing.',
      'Swayam Prabha broadcasts curriculum lessons for students without school access.',
      'It represents Cultural Transmission/Entertainment combined with Education.',
    ],
  },
  {
    id: 'ch_a22',
    nodeId: NODE_C11_MASSMEDIA_002,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How do "Self-Concept" and "Self-Esteem" differ when a student reporter reflects intrapersonally before asking a question at a Chief Minister’s press conference?',
    options: [
      'Self-concept is evaluative ("I am worthless"), while self-esteem is purely factual ("I have 2 hands").',
      'Self-concept is descriptive ("I am an accredited student journalist"), while self-esteem is evaluative ("I feel confident and worthy of raising this critical question").',
      'They are 100% identical and can always be used interchangeably in ISC board answers.',
      'Self-concept relates only to group dynamics, while self-esteem relates only to mass media.',
    ],
    correctIndex: 1,
    explanation: 'Self-concept is the descriptive understanding of who one is (identity, capabilities, roles), whereas Self-esteem is the evaluative value or worth one assigns to oneself.',
    hints: [
      'Descriptive identity vs Evaluative worth.',
      'Self-concept answers "Who am I?"; Self-esteem answers "How much do I value my voice?"',
      'Descriptive = Self-Concept; Evaluative = Self-Esteem.',
    ],
    misconceptionIndex: 1,
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
  nodeId: NODE_C11_MASSMEDIA_001,
  title: 'Understanding Communication & Basics of Journalism',
  definition: 'Communication is the systematic and creative process of sharing information, meaning, and emotion between entities. Journalism is its disciplined professional application: gathering, verifying, and reporting truthful news of public interest.',
  eli5: 'Communication is like throwing a ball of meaning back and forth. Journalism is being the honest referee who checks every fact before telling the whole stadium what really happened!',
  misconceptions: [
    {
      misconception: 'Communication is only about speaking or writing outward.',
      correction: 'Communication is a complete multi-step process: sender, encoding, message, channel, receiver, decoding, feedback, and noise all interact.',
    },
    {
      misconception: 'Science and Art in communication are contradictory opposites.',
      correction: 'Communication is both: Science provides measurable systems, channels, and metrics; Art provides creative tone, visual power, and emotional resonance.',
    },
    {
      misconception: 'Self-Concept and Self-Esteem are identical concepts.',
      correction: 'Self-concept is descriptive (who you believe you are); Self-esteem is evaluative (how much you value and respect yourself).',
    },
    {
      misconception: 'Soft News is just low-quality or fake journalism.',
      correction: 'Soft news is legitimate feature/human-interest journalism that follows strict verification but uses a narrative style and is less time-sensitive.',
    },
    {
      misconception: 'In the Shannon-Weaver model, a news anchor\'s bias is channel noise.',
      correction: 'Channel noise is physical signal distortion (static, rain fade); anchor bias is a source/semantic/psychological phenomenon.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the Latin root of communication?', options: ['Communicare (to share / make common)', 'Composita (to create)', 'Commercium (to trade)', 'Comitatus (to accompany)'], correctIndex: 0 },
    { question: 'Which level of communication features the most immediate, multi-directional feedback?', options: ['Mass Communication', 'Small Group Communication', 'Public Rally Address', 'Radio Mann Ki Baat'], correctIndex: 1 },
    { question: 'What did Wilbur Schramm add that linear models omitted?', options: ['Overlapping Field of Experience and Feedback loops', 'Only physical copper telephone wire calculations', 'Complete elimination of all human decoders', 'The 5 Ws and 1 H framework'], correctIndex: 0 },
    { question: 'Which of the following is NOT one of Aristotle\'s 3 rhetorical proofs?', options: ['Ethos (Credibility)', 'Pathos (Emotion)', 'Logos (Logic)', 'Telos (Channel Static)'], correctIndex: 3 },
    { question: 'Which step separates journalism from viral WhatsApp forwarding?', options: ['Speed of transmission', 'Verification across independent sources', 'Use of high-resolution video', 'Adding sensational emojis'], correctIndex: 1 },
    { question: 'What structure does a classic Hard News story follow?', options: ['Chronological Diary format', 'Inverted Pyramid structure', 'Mystery climax at the very end', 'Poetic rhyming stanzas'], correctIndex: 1 },
    { question: 'What are the 5 core components of news in the ISC syllabus?', options: ['Accuracy, Attribution, Fairness, Clarity, Brevity', 'Drama, Conflict, Emotion, Speed, Rumor', 'Length, Headline, Photo, Font, Border', 'TRP, Revenue, Likes, Shares, Retweets'], correctIndex: 0 },
    { question: 'Who introduced the 5-question chain: "Who Says What In Which Channel To Whom With What Effect"?', options: ['Aristotle', 'Harold D. Lasswell', 'Claude Shannon', 'Warren Weaver'], correctIndex: 1 },
  ],
  masteryCriteria: 'Master all 10 nodes: define communication, distinguish the 4 levels (intra, inter, group, mass), evaluate 4 communication models (Aristotle, Lasswell, Shannon-Weaver, Schramm), define journalism, contrast hard vs soft news, and apply the 5 news components under pressure.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Spectrum of Communication Levels',
    instruction: 'Select each communication level to see how participant count, feedback speed, and channel dynamics transform.',
    interactionType: 'level-spectrum',
    nodeId: NODE_C11_MASSMEDIA_001,
  },
  {
    title: 'Lab 2: Aristotle’s Rhetoric vs Lasswell’s 5-Question Chain',
    instruction: 'Adjust the Ethos, Pathos, and Logos sliders, then inspect how Lasswell\'s 5 questions map to real Indian media institutions.',
    interactionType: 'early-models',
    nodeId: NODE_C11_MASSMEDIA_006,
  },
  {
    title: 'Lab 3: Shannon-Weaver Transmission & Noise Simulator',
    instruction: 'Drag the Channel Noise slider to simulate how rain fade degrades signal fidelity from Doordarshan source to home receiver.',
    interactionType: 'shannon-noise',
    nodeId: NODE_C11_MASSMEDIA_007,
  },
  {
    title: 'Lab 4: Schramm’s Overlapping Fields of Experience',
    instruction: 'Drag the Cultural Overlap slider to observe how shared language and background enable true semantic decoding and feedback.',
    interactionType: 'schramm-overlap',
    nodeId: NODE_C11_MASSMEDIA_007,
  },
  {
    title: 'Lab 5: The Newsroom Desk — 5 Components Lead Builder',
    instruction: 'Toggle Accuracy, Attribution, Fairness, Clarity, and Brevity to convert a flawed draft into an ISC-grade hard-news lead.',
    interactionType: 'news-desk',
    nodeId: NODE_C11_MASSMEDIA_010,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to the Receiver Signal Quality as you increase Channel Noise past 70% in the Shannon-Weaver simulator?',
    observableOptions: [
      'The signal becomes pixelated, corrupted, and error rate surges.',
      'The message automatically converts into an interpersonal dyad.',
      'The feedback loop becomes instantaneous and perfect.',
      'The information source turns into an advertising commercial.',
    ],
    correctIndex: 0,
  },
  {
    question: 'In Schramm’s model, what do you observe when the Cultural & Linguistic Overlap reaches 90%?',
    observableOptions: [
      'Misunderstanding increases exponentially.',
      'Meaning is accurately shared and constructive feedback flows seamlessly between both parties.',
      'The communication ceases completely.',
      'The transmitter explodes from excessive empathy.',
    ],
    correctIndex: 1,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Be the Chief Bureau Editor: The Ground Report Project',
  description: 'Pick an ongoing local event in your district (e.g., municipal water pipe repairs, an inter-school science exhibition, or a local transport strike). Act as an accredited journalist to gather facts from 2 independent sources, write a 30-word Hard News lead answering the 5 Ws and 1 H, and identify which communication models apply.',
  steps: [
    'Interview 2 distinct sources (e.g., student participant and school principal) — Dyadic Interpersonal.',
    'Verify dates, figures, and spellings — The Accuracy check.',
    'Draft an inverted pyramid lead with explicit Attribution — The 5 Components discipline.',
    'Identify potential semantic or channel noise before publishing to your school newsletter or bulletin board.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C11_MassMediaUnderstandingCommunicationDefinitionSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['massmedia'] || { name: 'Mass Media', emoji: '🎙️', color: 'rose' };

  // ─── STATE HOOKS ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery & Predict State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Interactive Simulator Variables (Labs 1-5)
  const [selectedLevel, setSelectedLevel] = useState<'intra' | 'inter' | 'group' | 'mass'>('intra');
  const [ethosVal, setEthosVal] = useState(80);
  const [pathosVal, setPathosVal] = useState(65);
  const [logosVal, setLogosVal] = useState(75);
  const [noiseLevel, setNoiseLevel] = useState(25);
  const [overlapLevel, setOverlapLevel] = useState(70);
  const [hasAccuracy, setHasAccuracy] = useState(true);
  const [hasAttribution, setHasAttribution] = useState(true);
  const [hasFairness, setHasFairness] = useState(true);
  const [hasClarity, setHasClarity] = useState(true);
  const [hasBrevity, setHasBrevity] = useState(true);
  const [activeLasswellTab, setActiveLasswellTab] = useState<'who' | 'what' | 'channel' | 'whom' | 'effect'>('who');
  const [sandboxChannelFreq, setSandboxChannelFreq] = useState(50);
  const [sandboxFeedbackActive, setSandboxFeedbackActive] = useState(true);

  // Gamification & Adaptive Tracking State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Challenge Mechanics State
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-Drop & Construction State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Feedback State
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transmissionCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── EFFECT 1: LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C11_MASSMEDIA_001);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── EFFECT 2: BKT MASTERY ADAPTATION ───
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

  // ─── EFFECT 3: HTML5 2D CANVAS 1 (SHANNON-WEAVER SIGNAL TRANSMISSION WITH NOISE) ───
  useEffect(() => {
    const canvas = transmissionCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let offset = 0;

    const render = () => {
      offset += 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Draw baseline carrier wave
      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;

      for (let x = 0; x < width; x++) {
        const cleanWave = Math.sin((x + offset) * 0.05) * 20;
        const noisePerturbation = (Math.random() - 0.5) * (noiseLevel * 0.6);
        const y = centerY + cleanWave + (x > width * 0.3 && x < width * 0.7 ? noisePerturbation : 0);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw Transmitter Box
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.fillRect(10, centerY - 25, 70, 50);
      ctx.strokeRect(10, centerY - 25, 70, 50);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '10px sans-serif';
      ctx.fillText('ENCODER', 20, centerY + 4);

      // Draw Receiver Box
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(width - 80, centerY - 25, 70, 50);
      ctx.strokeRect(width - 80, centerY - 25, 70, 50);
      ctx.fillStyle = noiseLevel > 60 ? '#f43f5e' : '#10b981';
      ctx.fillText('DECODER', width - 70, centerY + 4);

      // Noise Field Region
      if (noiseLevel > 10) {
        ctx.fillStyle = `rgba(244, 63, 94, ${noiseLevel * 0.002})`;
        ctx.fillRect(width * 0.3, 10, width * 0.4, height - 20);
        ctx.fillStyle = '#f43f5e';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(`⚡ NOISE ZONE (${noiseLevel}%)`, width * 0.4, 25);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [noiseLevel, phase, currentSlide]);

  // ─── EFFECT 4: CLEANUP TIMER ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── MEMOISED CALLBACKS ───
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
      speechManager.speak('Let us study the complete journalistic breakdown together.');
    }
  }, [hintCount, challenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding insight! That is the essence of journalism.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Media Labs. Let us explore the core models!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now enter Free Sandbox Mode. Experiment with all variables with zero pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Ready for ISC Board Challenges! Read carefully and verify your facts.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on observation! High noise corrupts transmission fidelity.' : 'Observe the waveform carefully as noise increases.');
  }, []);

  const handleLevelSelect = useCallback((level: 'intra' | 'inter' | 'group' | 'mass') => {
    setSelectedLevel(level);
    audioManager.play('tap');
    const prompts = {
      intra: 'Intrapersonal: Sender and receiver are the same person.',
      inter: 'Interpersonal: Dyadic pair with instant two-way feedback.',
      group: 'Small Group: Transactional meaning co-created by 3 to 15 members.',
      mass: 'Mass Communication: Large, dispersed, anonymous audience through media channels.',
    };
    speechManager.speak(prompts[level]);
  }, []);

  const handleNoiseChange = useCallback((val: number) => {
    setNoiseLevel(val);
    audioManager.play('count');
  }, []);

  const handleOverlapChange = useCallback((val: number) => {
    setOverlapLevel(val);
    audioManager.play('count');
  }, []);

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
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length === challenge.sortItems?.length ? prev : (challenge.sortItems?.map((_, i) => i) || []);
      const copy = [...base];
      const [moved] = copy.splice(fromIdx, 1);
      copy.splice(toIdx, 0, moved);
      return copy;
    });
  }, [challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Splendid performance! You have mastered ISC Class 11 Communication & Journalism.');
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
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
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
      const updatedSrs = sm2Update(srsItem, 5, 3500);
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
        speechManager.speak('Here is the detailed explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleSortSubmit = useCallback(() => {
    const finalOrder = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(finalOrder);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── DERIVED VALUES FOR LAB 5 (NEWS LEAD BUILDER) ───
  const dynamicNewsLead = useMemo(() => {
    const accPart = hasAccuracy ? 'At least 420 residents' : 'Around many thousands of people';
    const locPart = hasClarity ? 'in coastal Paradip' : 'somewhere near the ocean';
    const timePart = hasBrevity ? 'on Friday morning' : 'during the early morning hours of the dawn on Friday';
    const actPart = 'were safely evacuated after Cyclone Dana made landfall,';
    const attrPart = hasAttribution ? 'according to the Odisha Special Relief Commissioner.' : 'rumors and viral posts said.';
    const fairNote = hasFairness ? ' (Relief teams confirmed shelters are stocked with food & medicine).' : ' (The opposition claimed total chaos with zero shelters).';

    return `${accPart} ${locPart} ${timePart} ${actPart} ${attrPart}${fairNote}`;
  }, [hasAccuracy, hasClarity, hasBrevity, hasAttribution, hasFairness]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-12 h-12 rounded-2xl bg-rose-950/80 border border-rose-600 flex items-center justify-center text-2xl shadow-lg shadow-rose-950/50"
            aria-hidden="true"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-widest text-rose-400 uppercase">ISC Class 11 Humanities</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">10 Syllabus Nodes</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>

        {/* Phase Navigator Badges */}
        <nav aria-label="Simulation Phases" className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 text-xs">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map(p => (
            <motion.button
              key={p}
              aria-label={`Switch to ${p} phase`}
              aria-current={phase === p ? 'step' : undefined}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p !== 'complete') {
                  setPhase(p);
                  audioManager.play('tap');
                }
              }}
              className={`px-3 py-1.5 rounded-xl font-bold capitalize transition-colors ${
                phase === p ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </nav>
      </header>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-slate-900 via-rose-950/30 to-slate-900 rounded-3xl border border-rose-800/50 shadow-xl">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" aria-hidden="true" />
              BREAKING NEWSROOM SIMULATION
            </div>
            <h2 className="text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-slate-300 mt-2 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400">
              💡 <span className="text-rose-300 font-semibold">Your Mission:</span> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>🎯 Curiosity Hook:</span>
              <span className="text-xs font-normal text-slate-400">(Low stakes — predict before learning!)</span>
            </h3>
            <p className="text-slate-200 font-medium text-sm leading-relaxed">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(i)}
                  className={`w-full text-left p-4 rounded-2xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950/50 border border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-950/80 border border-slate-800 hover:border-rose-500 text-slate-200 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0 mt-0.5">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {discoveryAnswered && (
                      <span className="text-xs font-bold shrink-0">
                        {i === DISCOVERY_QUESTION.correctIndex ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className={`text-sm font-bold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {discoveryCorrect ? '✓ Correct! Gathering, Verifying, and Reporting define journalism.' : '⚡ Key Takeaway: ' + DISCOVERY_QUESTION.hintAfter}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Ready to explore communication models and journalistic news construction?</p>
                </div>
                <motion.button
                  aria-label="Enter Interactive Labs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl font-black text-sm shadow-lg shadow-rose-600/40 shrink-0"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE (5 LABS) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-1.5" aria-hidden="true">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-8 bg-rose-500' : 'w-2.5 bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 text-sm text-amber-300">
            👉 <span className="font-semibold text-white">{EXPLORATION_STEPS[currentSlide].instruction}</span>
          </div>

          {/* ─── SLIDE 0: SPECTRUM OF COMMUNICATION LEVELS ─── */}
          {currentSlide === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900 p-6 rounded-3xl border border-slate-800">
              <div className="lg:col-span-5 space-y-3">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Select Communication Scale</h3>
                {[
                  { id: 'intra' as const, label: '1. Intrapersonal', desc: 'Inner monologue, self-concept & self-esteem' },
                  { id: 'inter' as const, label: '2. Interpersonal', desc: 'Dyadic pair (2 people) with instant feedback' },
                  { id: 'group' as const, label: '3. Small Group', desc: '3 to 15 members co-creating meaning' },
                  { id: 'mass' as const, label: '4. Mass Communication', desc: 'Dispersed millions via mediated broadcast' },
                ].map(lvl => (
                  <motion.button
                    key={lvl.id}
                    aria-label={`Select ${lvl.label}: ${lvl.desc}`}
                    aria-pressed={selectedLevel === lvl.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLevelSelect(lvl.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      selectedLevel === lvl.id
                        ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg shadow-rose-950/50'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-bold text-sm text-rose-300">{lvl.label} {selectedLevel === lvl.id ? '✓' : ''}</div>
                    <div className="text-xs text-slate-400 mt-1">{lvl.desc}</div>
                  </motion.button>
                ))}
              </div>

              <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase">Live Architectural Diagram</span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-800 font-mono">
                      Level: {selectedLevel.toUpperCase()}
                    </span>
                  </div>

                  {/* SVG Dynamic Diagram for Levels */}
                  <svg viewBox="0 0 450 220" className="w-full h-44 rounded-xl bg-slate-900/50 border border-slate-800" aria-label={`Diagram showing ${selectedLevel} communication architecture`}>
                    {selectedLevel === 'intra' && (
                      <g>
                        <circle cx="225" cy="110" r="50" fill="#3b0764" stroke="#c084fc" strokeWidth="3" />
                        <text x="225" y="105" textAnchor="middle" fill="#f3e8ff" fontSize="12" fontWeight="bold">SENDER</text>
                        <text x="225" y="125" textAnchor="middle" fill="#c084fc" fontSize="10">Self-Talk / Reflection</text>
                        <path d="M 185 80 A 60 60 0 1 1 265 80" fill="none" stroke="#e879f9" strokeWidth="2.5" strokeDasharray="4,4" />
                        <text x="225" y="45" textAnchor="middle" fill="#e879f9" fontSize="10">Internal Feedback Loop</text>
                      </g>
                    )}

                    {selectedLevel === 'inter' && (
                      <g>
                        {/* Person A */}
                        <circle cx="100" cy="110" r="38" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
                        <text x="100" y="114" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Editor (A)</text>
                        {/* Person B */}
                        <circle cx="350" cy="110" r="38" fill="#1e293b" stroke="#10b981" strokeWidth="2.5" />
                        <text x="350" y="114" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">Reporter (B)</text>
                        {/* Message A -> B */}
                        <path d="M 145 95 L 305 95" stroke="#38bdf8" strokeWidth="3" />
                        <text x="225" y="85" textAnchor="middle" fill="#94a3b8" fontSize="10">Verbal / Paralinguistic Message</text>
                        {/* Instant Feedback B -> A */}
                        <path d="M 305 125 L 145 125" stroke="#10b981" strokeWidth="3" strokeDasharray="4,4" />
                        <text x="225" y="145" textAnchor="middle" fill="#10b981" fontSize="10">Instant Non-verbal Feedback</text>
                      </g>
                    )}

                    {selectedLevel === 'group' && (
                      <g>
                        <rect x="150" y="75" width="150" height="70" rx="12" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                        <text x="225" y="105" textAnchor="middle" fill="#e0e7ff" fontSize="11" fontWeight="bold">Newsroom Table</text>
                        <text x="225" y="125" textAnchor="middle" fill="#a5b4fc" fontSize="9">Transactional Co-creation</text>
                        {[
                          { x: 120, y: 60, l: 'Editor' },
                          { x: 225, y: 35, l: 'Bureau' },
                          { x: 330, y: 60, l: 'Anchor' },
                          { x: 330, y: 160, l: 'Fact-Check' },
                          { x: 225, y: 185, l: 'Camera' },
                          { x: 120, y: 160, l: 'Graphics' },
                        ].map((m, i) => (
                          <g key={i}>
                            <circle cx={m.x} cy={m.y} r="18" fill="#312e81" stroke="#c7d2fe" />
                            <text x={m.x} y={m.y + 3} textAnchor="middle" fill="#e0e7ff" fontSize="7">{m.l}</text>
                          </g>
                        ))}
                      </g>
                    )}

                    {selectedLevel === 'mass' && (
                      <g>
                        <rect x="40" y="85" width="90" height="50" rx="8" fill="#881337" stroke="#fb7185" strokeWidth="2" />
                        <text x="85" y="107" textAnchor="middle" fill="#ffe4e6" fontSize="10" fontWeight="bold">DOORDARSHAN</text>
                        <text x="85" y="122" textAnchor="middle" fill="#f43f5e" fontSize="8">Studio Hub</text>
                        <path d="M 135 110 L 220 50 L 220 170 Z" fill="rgba(244, 63, 94, 0.2)" stroke="#f43f5e" strokeDasharray="3,3" />
                        <circle cx="220" cy="110" r="15" fill="#f43f5e" />
                        <text x="220" y="114" textAnchor="middle" fill="white" fontSize="9">SAT</text>
                        {[
                          { x: 320, y: 50 }, { x: 370, y: 70 }, { x: 410, y: 110 },
                          { x: 370, y: 150 }, { x: 320, y: 170 }, { x: 340, y: 110 },
                        ].map((p, i) => (
                          <circle key={i} cx={p.x} cy={p.y} r="10" fill="#1e293b" stroke="#94a3b8" />
                        ))}
                        <text x="360" y="200" textAnchor="middle" fill="#cbd5e1" fontSize="9">750M+ Dispersed Viewers</text>
                      </g>
                    )}
                  </svg>
                </div>

                <div className="mt-4 p-3 bg-slate-900 rounded-xl text-xs text-slate-300">
                  {selectedLevel === 'intra' && 'In intrapersonal communication, Self-concept describes identity ("Who I am") and Self-esteem evaluates worth ("My value").'}
                  {selectedLevel === 'inter' && 'Interpersonal communication features dyadic role-reversibility where senders and receivers swap roles continuously.'}
                  {selectedLevel === 'group' && 'Small groups (3-15) exhibit cohesion, interdependence, and natural role emergence (Leader, Harmoniser, Devils Advocate).'}
                  {selectedLevel === 'mass' && 'Mass communication reaches heterogeneous, anonymous audiences via media institutions under regulatory bodies (PCI, TRAI, NBDSA).'}
                </div>
              </div>
            </div>
          )}

          {/* ─── SLIDE 1: ARISTOTLE & LASSWELL MODELS ─── */}
          {currentSlide === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900 p-6 rounded-3xl border border-slate-800">
              {/* Aristotle Rhetorical Proofs */}
              <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-white">Aristotle’s Rhetorical Triangle (350 BCE)</h3>
                  <span className="text-xs text-rose-400 font-mono">Linear / Speaker-Centric</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                      <span>Ethos (Speaker Credibility): {ethosVal}%</span>
                      <span className={ethosVal > 70 ? 'text-emerald-400' : 'text-amber-400'}>{ethosVal > 70 ? '✓ High Trust' : '✗ Questionable'}</span>
                    </div>
                    <input
                      type="range"
                      aria-label="Adjust Ethos speaker credibility percentage"
                      min={10}
                      max={100}
                      value={ethosVal}
                      onChange={e => setEthosVal(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                      <span>Pathos (Emotional Appeal): {pathosVal}%</span>
                      <span className="text-amber-400">{pathosVal > 70 ? 'High Emotion' : 'Moderate'}</span>
                    </div>
                    <input
                      type="range"
                      aria-label="Adjust Pathos emotional appeal percentage"
                      min={10}
                      max={100}
                      value={pathosVal}
                      onChange={e => setPathosVal(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                      <span>Logos (Logical Evidence): {logosVal}%</span>
                      <span className={logosVal > 70 ? 'text-gold-400' : 'text-amber-400'}>{logosVal > 70 ? '✓ Rigorous Data' : '✗ Weak Logic'}</span>
                    </div>
                    <input
                      type="range"
                      aria-label="Adjust Logos logical evidence percentage"
                      min={10}
                      max={100}
                      value={logosVal}
                      onChange={e => setLogosVal(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300">
                  <span className="font-bold text-white">Persuasive Balance Index:</span>{' '}
                  {Math.round((ethosVal + pathosVal + logosVal) / 3)}% —{' '}
                  {ethosVal > 70 && logosVal > 70 ? '✓ Ideal investigative journalism profile!' : '✗ Needs higher verifiable facts & credibility.'}
                </div>
              </div>

              {/* Lasswell 5-Question Chain */}
              <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-white">Lasswell’s 5-Question Model (1948)</h3>
                  <span className="text-xs text-rose-400 font-mono">Mass Media Analysis</span>
                </div>

                <div className="grid grid-cols-5 gap-1.5" role="tablist" aria-label="Lasswell Model Questions">
                  {[
                    { id: 'who' as const, label: 'Who' },
                    { id: 'what' as const, label: 'Says What' },
                    { id: 'channel' as const, label: 'Channel' },
                    { id: 'whom' as const, label: 'To Whom' },
                    { id: 'effect' as const, label: 'Effect' },
                  ].map(tab => (
                    <motion.button
                      key={tab.id}
                      role="tab"
                      aria-selected={activeLasswellTab === tab.id}
                      aria-label={`View Lasswell question: ${tab.label}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setActiveLasswellTab(tab.id);
                        audioManager.play('tap');
                      }}
                      className={`p-2 rounded-xl text-xs font-bold text-center transition-all ${
                        activeLasswellTab === tab.id
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                  {activeLasswellTab === 'who' && (
                    <>
                      <div className="font-bold text-rose-300">1. WHO (Communicator Analysis)</div>
                      <p className="text-slate-300">Example: The Press Information Bureau (PIB) or Editor-in-Chief of The Hindu. Investigates editorial authority and ownership structure.</p>
                    </>
                  )}
                  {activeLasswellTab === 'what' && (
                    <>
                      <div className="font-bold text-rose-300">2. SAYS WHAT (Content Analysis)</div>
                      <p className="text-slate-300">Example: The factual lead, casualty count, and emergency evacuation notice. Examines framing, vocabulary, and bias.</p>
                    </>
                  )}
                  {activeLasswellTab === 'channel' && (
                    <>
                      <div className="font-bold text-rose-300">3. IN WHICH CHANNEL (Media Analysis)</div>
                      <p className="text-slate-300">Example: All India Radio, DD National satellite feed, or digital web apps. Studies transmission vehicles and technological constraints.</p>
                    </>
                  )}
                  {activeLasswellTab === 'whom' && (
                    <>
                      <div className="font-bold text-rose-300">4. TO WHOM (Audience Analysis)</div>
                      <p className="text-slate-300">Example: Coastal residents of Kendrapara & Balasore, district collectors, and pan-Indian citizens. Studies demographics and media literacy.</p>
                    </>
                  )}
                  {activeLasswellTab === 'effect' && (
                    <>
                      <div className="font-bold text-rose-300">5. WITH WHAT EFFECT (Effect Analysis)</div>
                      <p className="text-slate-300">Example: Timely evacuation to cyclone shelters saving lives vs unverified panic caused by fake WhatsApp forwards.</p>
                    </>
                  )}
                </div>

                <p className="text-xs text-slate-400 italic">Shared limitation of Aristotle & Lasswell: Both are strictly linear and omit immediate feedback loops.</p>
              </div>
            </div>
          )}

          {/* ─── SLIDE 2: SHANNON-WEAVER TRANSMISSION & NOISE ─── */}
          {currentSlide === 2 && (
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white">Shannon-Weaver Transmission Model (1949)</h3>
                  <p className="text-xs text-slate-400">Bell Labs mathematical model introducing physical channel noise into signal transmission.</p>
                </div>
                <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800">
                  <span className="text-xs font-semibold text-slate-300">Noise Level:</span>
                  <span className={`text-sm font-black font-mono ${noiseLevel > 60 ? 'text-rose-400' : 'text-emerald-400'}`}>{noiseLevel}% {noiseLevel > 60 ? '✗ Heavy Noise' : '✓ Clean Signal'}</span>
                </div>
              </div>

              {/* Canvas 1: Live Signal & Noise Simulation */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <canvas ref={transmissionCanvasRef} width={800} height={180} className="w-full h-44 rounded-xl bg-slate-900" aria-label="Transmission waveform simulation showing channel noise" />
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Low Noise (Clean Satellite Signal)</span>
                    <span>High Noise (Monsoon Rain Fade & Static)</span>
                  </div>
                  <input
                    type="range"
                    aria-label="Adjust Channel Noise percentage in Shannon-Weaver model"
                    min={0}
                    max={100}
                    value={noiseLevel}
                    onChange={e => handleNoiseChange(Number(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                </div>
              </div>

              {/* Observation Section */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">🔬 Scientific Observation Check:</p>
                <p className="text-sm text-slate-200">{OBSERVATION_QUESTIONS[0].question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Observation option ${i + 1}: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      disabled={observationAnswered}
                      onClick={() => handleObservation(i)}
                      className={`p-3 text-left rounded-xl text-xs font-medium border transition-all ${
                        observationAnswered
                          ? i === OBSERVATION_QUESTIONS[0].correctIndex
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                            : 'bg-slate-900 border-slate-800 text-slate-500'
                          : 'bg-slate-900 border-slate-800 hover:border-rose-500 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{opt}</span>
                        {observationAnswered && (
                          <span className="font-bold ml-2">
                            {i === OBSERVATION_QUESTIONS[0].correctIndex ? '✓' : '✗'}
                          </span>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── SLIDE 3: SCHRAMM’S FIELD OF EXPERIENCE & FEEDBACK ─── */}
          {currentSlide === 3 && (
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Wilbur Schramm’s Interactive Model (1954)</h3>
                  <p className="text-xs text-slate-400">Communication succeeds only in the overlapping region of shared language, culture, and experience.</p>
                </div>
                <div className="bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 text-xs font-mono">
                  Shared Overlap: <span className="text-rose-400 font-bold">{overlapLevel}%</span>
                </div>
              </div>

              {/* SVG Overlapping Circles Diagram */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center">
                <svg viewBox="0 0 500 240" className="w-full h-56 max-w-xl" aria-label="Schramm Overlapping Fields of Experience diagram">
                  <circle
                    cx={250 - (100 - overlapLevel) * 0.9}
                    cy="120"
                    r="85"
                    fill="rgba(56, 189, 248, 0.25)"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx={250 + (100 - overlapLevel) * 0.9}
                    cy="120"
                    r="85"
                    fill="rgba(244, 63, 94, 0.25)"
                    stroke="#f43f5e"
                    strokeWidth="2.5"
                  />

                  <text x="250" y="115" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                    SHARED MEANING
                  </text>
                  <text x="250" y="132" textAnchor="middle" fill="#fbbf24" fontSize="9">
                    {overlapLevel > 50 ? '✓ High Comprehension' : '✗ Semantic Distortion'}
                  </text>

                  <text x="140" y="120" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">
                    SENDER’S FIELD
                  </text>
                  <text x="140" y="135" textAnchor="middle" fill="#94a3b8" fontSize="8">
                    (Delhi Newsroom)
                  </text>

                  <text x="360" y="120" textAnchor="middle" fill="#f43f5e" fontSize="10" fontWeight="bold">
                    RECEIVER’S FIELD
                  </text>
                  <text x="360" y="135" textAnchor="middle" fill="#94a3b8" fontSize="8">
                    (Rural Farmer)
                  </text>

                  <path d="M 330 205 Q 250 230 170 205" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="5,5" />
                  <text x="250" y="225" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">
                    ← CYCLICAL FEEDBACK LOOP ←
                  </text>
                </svg>

                <div className="w-full max-w-md mt-4">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Low Overlap (Jargon / Dialect Barrier)</span>
                    <span>High Overlap (Bilingual Clarity)</span>
                  </div>
                  <input
                    type="range"
                    aria-label="Adjust Cultural and Linguistic Overlap percentage"
                    min={10}
                    max={100}
                    value={overlapLevel}
                    onChange={e => handleOverlapChange(Number(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300">
                💡 <span className="font-bold text-white">Why Schramm Revolutionised Media:</span> Wilbur Schramm established that receivers do not passively absorb signals; they actively decode messages using cultural and linguistic background. Feedback completes the loop, making communication two-way and transactional.
              </div>
            </div>
          )}

          {/* ─── SLIDE 4: THE NEWSROOM 5-COMPONENTS LAB ─── */}
          {currentSlide === 4 && (
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">The 5 Components of News (ISC Node 010)</h3>
                  <p className="text-xs text-slate-400">Toggle each journalistic component to see how it shapes an emergency hard-news lead.</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                  NEWS DESK SIMULATOR
                </span>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {[
                  { label: '1. Accuracy', state: hasAccuracy, toggle: () => setHasAccuracy(p => !p), desc: 'Verified 420 vs vague thousands' },
                  { label: '2. Attribution', state: hasAttribution, toggle: () => setHasAttribution(p => !p), desc: 'Cites Relief Commissioner vs rumors' },
                  { label: '3. Fairness', state: hasFairness, toggle: () => setHasFairness(p => !p), desc: 'Includes official shelter confirmation' },
                  { label: '4. Clarity', state: hasClarity, toggle: () => setHasClarity(p => !p), desc: 'Clear Paradip vs vague somewhere' },
                  { label: '5. Brevity', state: hasBrevity, toggle: () => setHasBrevity(p => !p), desc: 'Tight 24 words vs padded 54 words' },
                ].map((item, idx) => (
                  <motion.button
                    key={idx}
                    aria-label={`Toggle component: ${item.label}. Currently ${item.state ? 'Enabled' : 'Disabled'}`}
                    aria-pressed={item.state}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      item.toggle();
                      audioManager.play('tap');
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      item.state
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">{item.label}</span>
                      <span className="text-xs font-bold">{item.state ? '✓ ON' : '✗ OFF'}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">{item.desc}</div>
                  </motion.button>
                ))}
              </div>

              {/* Live News Lead Preview */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">LIVE TELEPROMPTER OUTPUT:</span>
                  <span className={`text-xs font-bold ${hasAccuracy && hasAttribution && hasFairness && hasClarity && hasBrevity ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {hasAccuracy && hasAttribution && hasFairness && hasClarity && hasBrevity ? '✓ 100% Press Council Compliant' : '✗ Editorial Flaws Detected'}
                  </span>
                </div>
                <p className="text-sm md:text-base font-serif text-slate-100 leading-relaxed bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                  &ldquo;{dynamicNewsLead}&rdquo;
                </p>
              </div>
            </div>
          )}

          {/* ─── SLIDE NAVIGATION ─── */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <motion.button
              aria-label="Go to previous lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentSlide === 0}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('whoosh');
              }}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-mono">Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}</span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Go to next lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Enter Free Sandbox Mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/30"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">
                <span>🎮 Zero-Pressure Sandbox</span>
              </div>
              <h2 className="text-xl font-black text-white">Free Media Laboratory</h2>
              <p className="text-xs text-slate-400 mt-1">Play freely with transmission frequencies, noise barriers, and rhetorical balances with no grading.</p>
            </div>
            <motion.button
              aria-label="Start Graded Challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-rose-600/40 shrink-0"
            >
              Start Graded Challenges →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Control Pod 1: Noise & Signal */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-rose-300">1. Transmission Carrier</h3>
              <div>
                <label htmlFor="noise-slider" className="text-xs text-slate-400 block mb-1">Channel Noise: {noiseLevel}%</label>
                <input
                  id="noise-slider"
                  type="range"
                  aria-label="Channel Noise Level Slider"
                  min={0}
                  max={100}
                  value={noiseLevel}
                  onChange={e => handleNoiseChange(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
              </div>
              <div>
                <label htmlFor="carrier-slider" className="text-xs text-slate-400 block mb-1">Carrier Frequency: {sandboxChannelFreq} MHz</label>
                <input
                  id="carrier-slider"
                  type="range"
                  aria-label="Carrier Frequency Slider"
                  min={10}
                  max={100}
                  value={sandboxChannelFreq}
                  onChange={e => setSandboxChannelFreq(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>
            </div>

            {/* Control Pod 2: Schramm Overlap */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-gold-300">2. Sociolinguistic Field</h3>
              <div>
                <label htmlFor="overlap-slider" className="text-xs text-slate-400 block mb-1">Cultural Overlap: {overlapLevel}%</label>
                <input
                  id="overlap-slider"
                  type="range"
                  aria-label="Cultural Overlap Slider"
                  min={0}
                  max={100}
                  value={overlapLevel}
                  onChange={e => handleOverlapChange(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <label htmlFor="feedback-checkbox" className="text-xs text-slate-300 cursor-pointer">Cyclical Feedback Loop</label>
                <input
                  id="feedback-checkbox"
                  type="checkbox"
                  aria-label="Toggle Cyclical Feedback Loop"
                  checked={sandboxFeedbackActive}
                  onChange={e => setSandboxFeedbackActive(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Control Pod 3: Rhetorical Balance */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-amber-300">3. Aristotle Balance</h3>
              <div>
                <label htmlFor="logos-slider" className="text-xs text-slate-400 block mb-1">Ethos: {ethosVal}% | Logos: {logosVal}%</label>
                <input
                  id="logos-slider"
                  type="range"
                  aria-label="Adjust Logos logical evidence slider"
                  min={0}
                  max={100}
                  value={logosVal}
                  onChange={e => setLogosVal(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                When you feel confident with the concepts, click the challenge button above to begin adaptive testing.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Header with Difficulty Badge & Progress */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">CHALLENGE {currentChallenge + 1} OF {filteredChallenges.length}</span>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-[10px] px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : difficulty === 'advanced'
                      ? 'bg-rose-950 text-rose-400 border border-rose-800'
                      : 'bg-gold-950 text-gold-400 border border-gold-800'
                  }`}
                >
                  {difficulty} TIER
                </motion.span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 font-semibold uppercase">
                  NEP: {challenge.competencyLevel}
                </span>
              </div>
              <h2 className="text-base font-bold text-white mt-1">Node: {challenge.nodeId}</h2>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 font-mono">Errors: {errors}</span>
              <div className="w-36 h-2 bg-slate-800 rounded-full mt-1 overflow-hidden" aria-label="Progress Bar">
                <motion.div
                  className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-3xl border transition-all ${
              wrongFlash ? 'bg-rose-950/70 border-rose-500' : 'border-slate-800'
            }`}
          >
            <p className="text-base md:text-lg font-semibold text-white mb-6 leading-relaxed">
              {challenge.question}
            </p>

            {/* TYPE 1: MCQ */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    disabled={answerRevealed || showExplanation}
                    onClick={() => handleAnswer(i)}
                    className={`w-full text-left p-4 rounded-2xl text-sm font-medium border transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/50'
                        : wrongFlash
                        ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-950/70 border-slate-800 hover:border-rose-500 text-slate-200 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {showExplanation && (
                        <span className="text-xs font-bold shrink-0">
                          {i === challenge.correctIndex ? '✓ Correct' : '✗ Incorrect'}
                        </span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* TYPE 2: DRAG-LABEL */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Drag Question Words:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable element: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold cursor-grab active:cursor-grabbing shadow-md"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* Drop Targets */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'field_comm', title: 'Communicator Analysis' },
                    { id: 'field_content', title: 'Content Analysis' },
                    { id: 'field_media', title: 'Media Analysis' },
                    { id: 'field_audience', title: 'Audience Analysis' },
                    { id: 'field_effect', title: 'Effect Analysis' },
                  ].map(target => (
                    <div
                      key={target.id}
                      aria-label={`Drop target for ${target.title}. Currently contains: ${droppedLabels[target.id] || 'empty'}`}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-2xl border-2 border-dashed flex items-center justify-between transition-all ${
                        droppedLabels[target.id]
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950/60 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-bold">{target.title}</span>
                      <span className="px-3 py-1 bg-slate-800 rounded-lg text-xs font-mono font-bold text-white">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Drag and Drop Mapping"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length === 0}
                  className="px-6 py-2.5 bg-rose-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-rose-600/30"
                >
                  Verify Mapping
                </motion.button>
              </div>
            )}

            {/* TYPE 3: DRAG-SORT */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-4">
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sort item ${displayIdx + 1}: ${item}. Drag to change order.`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0', 10);
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 text-xs font-medium cursor-grab flex items-center justify-between"
                    >
                      <span>{item}</span>
                      <span className="text-slate-500 text-xs">☰ Drag to reorder</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Check Sorted Sequence"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-rose-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-rose-600/30"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {/* TYPE 4: NUMERIC CHALLENGE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    aria-label="Enter calculated numeric answer"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated number"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-rose-500 font-mono"
                  />
                  <span className="text-xs text-slate-400 font-mono">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit Number Answer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-rose-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-rose-600/30"
                  >
                    Submit Number
                  </motion.button>
                </div>
              </div>
            )}

            {/* TYPE 5: CONSTRUCT CHALLENGE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>

                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      aria-label={`Add part: ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[70px] p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-3 py-1.5 bg-rose-900/80 border border-rose-600 text-white rounded-xl text-xs flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button
                        aria-label={`Remove part ${part}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-300 hover:text-white text-xs font-bold"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click building blocks above to construct the answer in sequence.</span>
                  )}
                </div>

                <motion.button
                  aria-label="Verify Constructed Sentence"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-rose-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-rose-600/30"
                >
                  Verify Construction
                </motion.button>
              </div>
            )}

            {/* ─── PROGRESSIVE DISCLOSURE EXPLANATION CARD ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-rose-950/30 border border-rose-800/80 rounded-2xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                    Detailed Pedagogical Breakdown:
                  </span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="font-bold text-rose-400">Step {idx + 1}:</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps <
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    aria-label="Reveal Next Reasoning Step"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-2 bg-rose-800 hover:bg-rose-700 text-white rounded-xl text-xs font-bold"
                  >
                    Reveal Next Reasoning Step →
                  </motion.button>
                )}

                {revealedSteps >=
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Complete All Challenges' : 'Go to Next Challenge'}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="mt-3 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-xs shadow-lg shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length
                      ? 'Complete All Challenges →'
                      : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-slate-900 via-rose-950/40 to-slate-900 rounded-3xl border border-rose-800 text-center space-y-4">
            <span className="text-5xl" aria-hidden="true">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Simulation Completed!</h2>
            <div className="flex justify-center gap-6 text-sm">
              <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400">Final Score</div>
                <div className="text-xl font-black text-rose-400 font-mono">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400">BKT Mastery Level</div>
                <div className="text-xl font-black text-emerald-400 capitalize font-mono">{masteryLevel}</div>
              </div>
              <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400">Total Errors</div>
                <div className="text-xl font-black text-amber-400 font-mono">{errors}</div>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-2">Performance Assessment</h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              {errors === 0
                ? '🌟 MASTER JOURNALIST & THEORIST: Outstanding perfect run! You thoroughly grasp all 10 nodes from Aristotle to news lead construction.'
                : errors <= 3
                ? '👍 HIGH COMMENDATION: You demonstrate solid analytical skills in communication modeling and journalistic verification.'
                : '📚 GOOD EFFORT: Review the misconception profile below to eliminate remaining gaps before your ISC board exam.'}
            </p>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-3xl border border-rose-800 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">⚠️ Your Targeted Misconception Review Profile:</h3>
              <div className="space-y-3">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                      <div className="text-rose-400 font-bold">❌ Common Trap: {m.misconception}</div>
                      <div className="text-emerald-300 font-medium">✓ Board Correction: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule Banner */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-white">Spaced Repetition (SM-2 Interval):</span>
              <p className="text-slate-400 mt-0.5">Next memory reinforcement review scheduled in <span className="text-rose-400 font-bold">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span>.</p>
            </div>
            <span className="text-2xl" aria-hidden="true">📅</span>
          </div>

          {/* Real-World Activity Card */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
              <span>📰 Real-World Field Project:</span>
              <span className="text-white">{REAL_WORLD_ACTIVITY.title}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                  <span className="font-bold text-rose-400 mr-2">{idx + 1}.</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── GLOBAL FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_MassMediaUnderstandingCommunicationDefinitionSim;