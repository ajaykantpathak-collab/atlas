'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE CONSTANTS ───────────────────────────────────────────────────────────
const NODE_C11_MASSMEDIA_011 = 'c11_massmedia_011';
const NODE_C11_MASSMEDIA_012 = 'c11_massmedia_012';
const NODE_C11_MASSMEDIA_013 = 'c11_massmedia_013';
const NODE_C11_MASSMEDIA_014 = 'c11_massmedia_014';
const NODE_C11_MASSMEDIA_015 = 'c11_massmedia_015';
const NODE_C11_MASSMEDIA_016 = 'c11_massmedia_016';
const NODE_C11_MASSMEDIA_017 = 'c11_massmedia_017';
const NODE_C11_MASSMEDIA_018 = 'c11_massmedia_018';
const NODE_C11_MASSMEDIA_019 = 'c11_massmedia_019';
const NODE_C11_MASSMEDIA_020 = 'c11_massmedia_020';

const ALL_NODE_IDS = [
  NODE_C11_MASSMEDIA_011,
  NODE_C11_MASSMEDIA_012,
  NODE_C11_MASSMEDIA_013,
  NODE_C11_MASSMEDIA_014,
  NODE_C11_MASSMEDIA_015,
  NODE_C11_MASSMEDIA_016,
  NODE_C11_MASSMEDIA_017,
  NODE_C11_MASSMEDIA_018,
  NODE_C11_MASSMEDIA_019,
  NODE_C11_MASSMEDIA_020,
];

// ─── NARRATIVE SCENARIO ───────────────────────────────────────────────────────
const SCENARIO = {
  title: 'The Newsroom Crucible: 8:30 PM Deadline',
  intro: 'You have been appointed Chief News Editor at Bharat Broadcast Network (Print, Radio, and TV divisions). Five major breaking stories just arrived on the wires, alongside breaking audio tapes and studio scripts. The 9:00 PM national broadcast and tomorrow morning’s front page depend on your editorial judgement.',
  context: 'Balance journalistic ethics, the 8 classical news values, inverted pyramid constraints, headline unit rules, photojournalism decency, radio audio grammar, and television fiction vs non-fiction classification before the clock strikes 9:00 PM.',
};

// ─── DISCOVERY QUESTION ───────────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question: 'Breaking News: A minor kitchen fire occurs at a celebrity chef’s residence in Mumbai with zero casualties, while at the same time a severe cloudburst in Uttarakhand disrupts 40 villages. Which news value elevates the celebrity fire to some tabloid front pages, and which dominates the cloudburst?',
  options: [
    'Celebrity: Prominence | Cloudburst: Consequence & Proximity',
    'Celebrity: Timeliness | Cloudburst: Oddity',
    'Celebrity: Development | Cloudburst: Human Interest only',
    'Both stories are ranked equally because both happened today',
  ],
  correctIndex: 0,
  hintAfter: "Prominence gives celebrity stories news value, but consequence (scale of impact on human lives) is the heavier journalistic criterion for hard news!",
};

// ─── CHALLENGE INTERFACE ────────────────────────────────────���────────────────
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

// ─── 22 COMPREHENSIVE CHALLENGES ─────────────────────────────────────────────
const CHALLENGES: Challenge[] = [
  // Foundation: News Values (c11_massmedia_011)
  {
    id: 'ch_001_nv_recall',
    nodeId: NODE_C11_MASSMEDIA_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The Chandrayaan-3 soft lunar landing on 23 August 2023 was featured as lead news across all Indian dailies. Which specific news value, emphasised in post-colonial Indian journalism for nation-building and technological progress, does this exemplify?',
    options: ['Development', 'Oddity', 'Sensationalism', 'Proximity only'],
    correctIndex: 0,
    explanation: 'Development is a classical news value strongly emphasised in post-independence Indian journalism to highlight scientific, social, and technological progress such as ISRO achievements and rural electrification.',
    hints: [
      'Think about news that celebrates national progress and technological milestones.',
      'It represents nation-building rather than conflict or oddity.',
      'The term directly denotes growth, advancement, and progress: Development.'
    ],
    misconceptionIndex: 2,
  },
  // Foundation: Inverted Pyramid Structure (c11_massmedia_012)
  {
    id: 'ch_002_ip_draglabel',
    nodeId: NODE_C11_MASSMEDIA_012,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each section of the Inverted Pyramid structure to its proper position from top to bottom.',
    dragItems: [
      { label: 'Lead / Intro (5 Ws & 1 H)', targetId: 'pyr_top' },
      { label: 'Body (Supporting facts, quotes, data)', targetId: 'pyr_middle' },
      { label: 'Tail (Background, archival context)', targetId: 'pyr_bottom' },
    ],
    correctMapping: {
      pyr_top: 'Lead / Intro (5 Ws & 1 H)',
      pyr_middle: 'Body (Supporting facts, quotes, data)',
      pyr_bottom: 'Tail (Background, archival context)',
    },
    explanation: 'The Inverted Pyramid places the most crucial 5Ws & 1H in the Lead at the top, elaborating facts and quotes in the Body, and least essential background in the Tail so editors can trim from bottom up.',
    hints: [
      'The widest top section holds the most critical facts.',
      'The middle contains quotes, witnesses, and chronological elaboration.',
      'The narrow bottom point holds background history that can be cut without breaking the news.'
    ],
    misconceptionIndex: 0,
  },
  // Foundation: Headlines Voice & Tense (c11_massmedia_013)
  {
    id: 'ch_003_hl_distinguish',
    nodeId: NODE_C11_MASSMEDIA_013,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'According to Indian newspaper editing conventions, which of the following headlines follows the standard rules of active voice, present tense, and space efficiency?',
    options: [
      'Supreme Court Quashes Telecom Petition, Upholds Regulatory Norms',
      'The Telecom Petition Was Quashed Yesterday by the Honourable Supreme Court',
      'Supreme Court Has Been Quashing Telecom Petition in New Delhi',
      'Will Supreme Court Ever Quash Telecom Petition?'
    ],
    correctIndex: 0,
    explanation: 'Professional print headlines use the active voice, present tense ("Quashes", "Upholds"), and drop unnecessary articles ("The") and auxiliary verbs to save space and inject immediacy.',
    hints: [
      'Look for active verbs in the present tense.',
      'Avoid passive constructions like "was quashed" and words like "yesterday".',
      'Articles like "The" are dropped in standard sub-editing.'
    ],
    misconceptionIndex: 1,
  },
  // Foundation: Photojournalism Ethics (c11_massmedia_014)
  {
    id: 'ch_004_pj_classify',
    nodeId: NODE_C11_MASSMEDIA_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A photojournalist covers a train collision in Odisha. Under Press Council of India (PCI) Norms of Journalistic Conduct, what must the photo editor ensure before publication?',
    options: [
      'Faces of grieving minors and graphic bodies must be blurred, avoiding intrusion into private grief',
      'Images must be digitally enhanced with fake smoke to dramatise the accident scene',
      'Any photo can be published as long as the newspaper circulation increases',
      'All background bystanders must be edited out using AI generative fill'
    ],
    correctIndex: 0,
    explanation: 'Press Council of India norms strictly mandate respect for privacy, dignity in grief, and non-sensationalism. Staging, artificial alterations, and revealing graphic agony of minors violate journalistic ethics.',
    hints: [
      'Consider the fundamental ethics of human dignity and trauma reporting.',
      'Digital alteration of news photographs is considered fabrication.',
      'PCI norms expressly warn against exploiting personal grief for commercial sensation.'
    ],
    misconceptionIndex: 1,
  },
  // Foundation: Radio News Sentence Word Count (c11_massmedia_015)
  {
    id: 'ch_005_rd_numeric',
    nodeId: NODE_C11_MASSMEDIA_015,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In radio news bulletin scripting (e.g. All India Radio), what is the recommended standard word count per sentence to ensure it can be spoken smoothly in a single breath?',
    correctAnswer: 18,
    tolerance: 4,
    unit: 'words',
    explanation: 'Radio scripts use concise sentences of roughly 15 to 20 words (average 17-18 words) written in spoken grammar, allowing newsreaders to breathe naturally without losing listener attention.',
    hints: [
      'Think of how many words a person speaks aloud comfortably before needing an inhale.',
      'It is far shorter than a typical 35-word newspaper print sentence.',
      'The acceptable range is 14 to 22 words.'
    ],
  },
  // Foundation: Radio Programme Categories (c11_massmedia_016)
  {
    id: 'ch_006_rd_match',
    nodeId: NODE_C11_MASSMEDIA_016,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which radio format is built around recorded actuality (real sounds and field ambience), scripted strictly in a two-column layout (Audio Description on left, Spoken Narration on right)?',
    options: [
      'Radio Documentary',
      'Radio Commentary',
      'Radio Jingle',
      'Radio Commercial Announcement'
    ],
    correctIndex: 0,
    explanation: 'A Radio Documentary is factual and research-driven, utilizing field actuality and ambient sounds coordinated in a two-column script format.',
    hints: [
      'It explores real-world topics in depth with field audio recordings.',
      'It is not a live sporting description (commentary) nor a 30-second jingle.',
      'It represents long-form factual audio storytelling: Documentary.'
    ],
  },
  // Foundation: TV Fiction vs Non-Fiction (c11_massmedia_018)
  {
    id: 'ch_007_tv_classify',
    nodeId: NODE_C11_MASSMEDIA_018,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the primary defining criterion that separates fiction television programmes from non-fiction programmes?',
    options: [
      'Fidelity to external reality (real people & events) vs Scripted imaginative construction by writers',
      'Whether the programme is shot in high definition or standard definition',
      'Whether the programme is broadcast on private satellite channels or Doordarshan',
      'Whether the programme contains commercial sponsor advertisements'
    ],
    correctIndex: 0,
    explanation: 'Fiction television is built upon scripted, imagined narratives performed by actors, whereas non-fiction is bound by factual fidelity to real people, verified events, and external reality.',
    hints: [
      'Think about whether the events portrayed actually took place in real life or were written.',
      'It is not determined by production equipment or commercial sponsors.',
      'It is the truth contract: imaginative world vs external factual verification.'
    ],
  },
  // Standard: News Values Analysis in Hathras Case (c11_massmedia_011)
  {
    id: 'ch_008_nv_app',
    nodeId: NODE_C11_MASSMEDIA_011,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'On 1 July 2024, a crowd stampede in Hathras, Uttar Pradesh, resulted in over 120 fatalities. Which combination of news values compelled national news channels (NDTV, ABP, Times Now) to lead with this story?',
    options: [
      'Timeliness, High Consequence (mass casualty), Proximity, and Conflict/Human Interest',
      'Oddity and Prominence only',
      'Development and Advertising Appeal',
      'Sensationalism and Fiction'
    ],
    correctIndex: 0,
    explanation: 'The Hathras disaster combined immediate freshness (Timeliness), massive human loss (Consequence), psychological/national nearness (Proximity), administrative accountability disputes (Conflict), and victim grief (Human Interest).',
    hints: [
      'Look for the cluster of values measuring scale of tragedy, timeliness, and public accountability.',
      'Mass casualties represent high Consequence, not mere Oddity.',
      'Stories leading national bulletins combine multiple major values.'
    ],
  },
  // Standard: 5 Ws and 1 H Inverted Pyramid Lead Construction (c11_massmedia_012)
  {
    id: 'ch_009_ip_construct',
    nodeId: NODE_C11_MASSMEDIA_012,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct a professional 28-word inverted pyramid news lead by assembling the required narrative elements in standard journalistic sequence.',
    availableParts: [
      'At least 12 people died',
      'when an express train derailed',
      'near Balasore on Friday evening',
      'due to suspected signalling failure,',
      'railway officials confirmed.',
      'It was a dark and stormy tragic night',
      'People were crying all over the place'
    ],
    targetState: 'At least 12 people died when an express train derailed near Balasore on Friday evening due to suspected signalling failure, railway officials confirmed.',
    validationHint: 'Select the 5 factual building blocks (Who/What, How, Where/When, Why, Source) and avoid sensational fluff.',
    explanation: 'A standard hard news lead front-loads casualty figures (Who/What), event description, location/time, cause, and official attribution without emotional filler.',
    hints: [
      'Start with the hard casualty fact.',
      'Add the core event (derailment), location/time, cause, and official attribution.',
      'Exclude subjective phrases like "dark and stormy tragic night".'
    ],
  },
  // Standard: Headline Deck Pairing (c11_massmedia_013)
  {
    id: 'ch_010_hl_analysis',
    nodeId: NODE_C11_MASSMEDIA_013,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'An editor is writing a front-page lead story on the Reserve Bank of India revising the repo rate. Which main headline and deck (sub-headline) pair maintains accuracy while conveying reader impact?',
    options: [
      'Main: RBI Raises Repo Rate by 25 bps | Deck: Home Loan EMIs Set to Rise; Inflation Control Cited',
      'Main: RBI Destroys Middle Class Dreams | Deck: Bankers Happy as Economy Collapses',
      'Main: Money Matters in Mumbai | Deck: When Numbers Go Up and Down',
      'Main: Will You Ever Buy a House Now? | Deck: Nobody Knows What RBI Did'
    ],
    correctIndex: 0,
    explanation: 'A factual main head ("RBI Raises Repo Rate by 25 bps") coupled with an informative deck explaining public consequence ("EMIs Set to Rise") fulfills both information and impact duties without clickbait.',
    hints: [
      'The headline must contain specific figures and active verbs.',
      'The deck must provide immediate real-world consumer consequence.',
      'Avoid hyperbole and biased emotional phrases.'
    ],
  },
  // Standard: Photojournalism Caption & Framing (c11_massmedia_014)
  {
    id: 'ch_011_pj_analysis',
    nodeId: NODE_C11_MASSMEDIA_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Two newspapers photograph a peaceful street demonstration in New Delhi. Paper A publishes a wide shot of 10,000 marching citizens. Paper B crops tightly on a solitary trash can fire started by an unrelated bystander. What media phenomenon does Paper B demonstrate?',
    options: [
      'Selective visual framing that distorts the event’s overall peaceful nature',
      'Exemplary objective photojournalism of the highest standard',
      'Compliance with the Press Council of India code of ethics',
      'Application of the development news value'
    ],
    correctIndex: 0,
    explanation: 'Cropping and selective framing can weaponise visuals to create a false impression of widespread violence, showing how visual choices alter audience perception (Framing Theory).',
    hints: [
      'Consider what information is excluded by tight cropping.',
      'Framing theory explains how media emphasizes certain aspects of reality while ignoring others.',
      'Focusing on an isolated outlier distorts the aggregate reality.'
    ],
  },
  // Standard: Commercial vs Public Service Announcement (c11_massmedia_017)
  {
    id: 'ch_012_rd_distinguish',
    nodeId: NODE_C11_MASSMEDIA_017,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does a Public Service Announcement (PSA) like the "Do Boond Zindagi Ki" polio campaign fundamentally differ from a commercial radio announcement for a consumer detergent?',
    options: [
      'PSA promotes a non-profit social behavior/health action; commercial ad promotes product purchase for profit',
      'PSA is scripted with catchy music while commercial ads never use sound effects',
      'PSA is regulated by TRAI while commercial ads are never regulated by ASCI',
      'PSA is only broadcast in English while commercials are broadcast in Hindi'
    ],
    correctIndex: 0,
    explanation: 'PSAs sell socially beneficial behaviors (immunisation, road safety, voting) for public welfare, whereas commercial ads promote products/services with a profit motive under ASCI guidelines.',
    hints: [
      'Contrast the call to action: "adopt a health habit" vs "buy a product".',
      'Both use music and persuasive appeals, but their fundamental goal differs.',
      'One serves public health/welfare, the other generates commercial revenue.'
    ],
    misconceptionIndex: 2,
  },
  // Standard: Reality TV Classification (c11_massmedia_020)
  {
    id: 'ch_013_tv_eval',
    nodeId: NODE_C11_MASSMEDIA_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why does the ISC Mass Media syllabus classify reality television shows (like Bigg Boss and Indian Idol) under the Fiction category despite featuring real contestants?',
    options: [
      'Producers manipulate casting for clash, author artificial tasks, and edit footage into scripted narrative arcs',
      'All contestants are secretly hired Bollywood guild actors reciting teleprompter scripts',
      'The Cable Television Networks Act 1995 explicitly bans reality shows from being filmed in India',
      'Reality shows do not use real video cameras during filming'
    ],
    correctIndex: 0,
    explanation: 'Reality TV is classified with fiction because its environment is authored, conflict is engineered through selective casting, and hundreds of raw hours are edited into scripted dramatic arcs with heroes, villains, and music cues.',
    hints: [
      'Think about how raw footage is shaped in the editing room.',
      'The participants are real people, but the storylines and challenges are constructed.',
      'Selective editing and producer staging create a fictionalised dramatic structure.'
    ],
    misconceptionIndex: 1,
  },
  // Standard: Radio Drama Scripting Conventions (c11_massmedia_016)
  {
    id: 'ch_014_rd_draglabel',
    nodeId: NODE_C11_MASSMEDIA_016,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Match the sound cues in a radio drama script to the narrative function they perform.',
    dragItems: [
      { label: 'SFX: Heavy wooden door slams shut', targetId: 'cue_action' },
      { label: 'MUSIC: Melancholic violin bridge swells 4s', targetId: 'cue_transition' },
      { label: 'ACTUALITY: Distant bazaar chatter and train whistle', targetId: 'cue_ambience' },
    ],
    correctMapping: {
      cue_action: 'SFX: Heavy wooden door slams shut',
      cue_transition: 'MUSIC: Melancholic violin bridge swells 4s',
      cue_ambience: 'ACTUALITY: Distant bazaar chatter and train whistle',
    },
    explanation: 'Radio drama replaces visual staging with acoustic cues: SFX depicts immediate character action, music bridges signify emotional/temporal transitions, and ambience establishes location.',
    hints: [
      'A slamming door conveys immediate physical action.',
      'A musical bridge shifts scenes and alters emotional tone.',
      'Bazaar chatter sets the geographical atmospheric background (ambience).'
    ],
  },
  // Advanced: News Values Hierarchy & Gatekeeping (c11_massmedia_011)
  {
    id: 'ch_015_nv_sort',
    nodeId: NODE_C11_MASSMEDIA_011,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'As Night Editor of a national 9 PM bulletin, arrange these 4 breaking stories in descending order of broadcast priority (Lead Story down to Filler).',
    sortItems: [
      'Union Budget: Income tax slabs overhauled affecting 4 crore salaried Indians (Consequence & Prominence)',
      'Major industrial gas leak in Visakhapatnam affecting 3 surrounding villages (Timeliness & Impact)',
      'Indian cricket captain hits century in World Cup group match (Prominence & Human Interest)',
      'Kerala centenarian sets record for growing 12-foot organic yam (Oddity & Human Interest)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'National policy directly impacting millions (Tax slab) and immediate disaster threats lead the bulletin; sporting achievements follow in the secondary block, and oddity/human interest serves as the closing "and finally" item.',
    hints: [
      'Highest consequence and national reach must lead the bulletin.',
      'Critical regional safety emergencies take second priority.',
      'Celebrity sports follows, and lighthearted oddities close the show.'
    ],
  },
  // Advanced: Headline Unit Count & SEO (c11_massmedia_013)
  {
    id: 'ch_016_hl_numeric',
    nodeId: NODE_C11_MASSMEDIA_013,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A digital sub-editor is optimizing a web headline for Google News snippets and mobile displays. What is the maximum recommended character count (including spaces) before search engines truncate the title?',
    correctAnswer: 65,
    tolerance: 5,
    unit: 'characters',
    explanation: 'Standard digital journalism targets 60 to 70 characters (typically 65) for web headlines to ensure full visibility on mobile screens and search engine results pages without ellipsis truncation.',
    hints: [
      'Think about standard search engine snippet limits on mobile phones.',
      'It is roughly 8 to 11 English words.',
      'The optimal target lies between 60 and 70 characters.'
    ],
  },
  // Advanced: Documentary vs News Bulletin Structural Analysis (c11_massmedia_019)
  {
    id: 'ch_017_tv_analysis',
    nodeId: NODE_C11_MASSMEDIA_019,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Compare Anand Patwardhan’s classic documentary "Ram Ke Naam" (1992) with a nightly 90-second bulletin on NDTV 24x7. Which structural and epistemological distinction is accurate?',
    options: [
      'The bulletin uses inverted pyramid for fast breadth & immediacy; the documentary uses narrative arc & archival depth over months of investigative research',
      'The bulletin is classified as fiction while the documentary is classified as entertainment',
      'The documentary must strictly follow 15-word spoken sentences while the bulletin has no time limit',
      'Documentaries are regulated by ASCI while bulletins are completely exempt from Indian law'
    ],
    correctIndex: 0,
    explanation: 'News bulletins prioritize immediate breadth and fast facts via inverted pyramid, while documentaries construct an investigative narrative arc exploring root causes, historical archives, and sociological depth.',
    hints: [
      'Compare 90 seconds of rapid reporting against 90 minutes of investigative filmmaking.',
      'Documentaries have an authored narrative thesis and archival depth.',
      'Both are non-fiction, but their structural arcs differ completely.'
    ],
  },
  // Advanced: Live Commentary vs Scripted Bulletins (c11_massmedia_016)
  {
    id: 'ch_018_rd_eval',
    nodeId: NODE_C11_MASSMEDIA_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'When legendary AIR commentator Jasdev Singh covered Republic Day parades or Olympic hockey finals, how was his delivery structured compared to a studio newsreader?',
    options: [
      'Extempore live description guided by statistical sheets & running observation, unlike a verbatim scripted bulletin',
      'Reading word-for-word from a teleprompter drafted three days in advance',
      'Singing rhyming jingles accompanied by acoustic sitar bridges',
      'Playing pre-recorded fictional dramas with studio actors'
    ],
    correctIndex: 0,
    explanation: 'Live radio commentary is fundamentally unscripted and extempore; commentators rely on deep domain research, prompt sheets, and spontaneous acoustic painting of the unfolding real-time event.',
    hints: [
      'A live sporting play or marching parade cannot be written word-for-word in advance.',
      'The commentator speaks in real-time based on live observation and data backup sheets.',
      'This contrasts with studio bulletins which are read verbatim from typed sheets.'
    ],
    misconceptionIndex: 2,
  },
  // Advanced: Ethical Evaluation of AI in Photojournalism (c11_massmedia_014)
  {
    id: 'ch_019_pj_eval',
    nodeId: NODE_C11_MASSMEDIA_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'During a 2024 political rally, a photographer uses AI generative software to fill in empty chairs in the background to make the crowd look packed. Under the Press Council of India and global photojournalism ethics, how is this action judged?',
    options: [
      'Gross violation of journalistic integrity amounting to visual fabrication and fraud',
      'Acceptable aesthetic correction to improve the composition of the photograph',
      'Standard digital optimization permitted under all circumstances',
      'A commendable demonstration of modern technology in newsrooms'
    ],
    correctIndex: 0,
    explanation: 'Photojournalism is visual reporting. Adding or removing elements through generative AI or deceptive cloning violates the fundamental contract of truth and constitutes deliberate fabrication.',
    hints: [
      'Photojournalism requires capturing what actually happened, not what looks impressive.',
      'Altering visual content to falsify crowd sizes is a direct ethical violation.',
      'The camera is an objective recording tool in news reporting.'
    ],
  },
  // Advanced: Radio Music Programme Structure (c11_massmedia_017)
  {
    id: 'ch_020_rd_construct',
    nodeId: NODE_C11_MASSMEDIA_017,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Organise the standard sequence of elements in Ameen Sayani’s iconic "Binaca Geet Mala" style radio countdown show block.',
    sortItems: [
      'Station ID / Signature Jingle & energetic RJ greeting',
      'Rank countdown announcement (#3 to #1) with song trivia hook',
      'Full track playback timed strictly to the broadcast clock',
      'Listener letter / telephone dedication reading',
      'Sponsor acknowledgment & segue into commercial break'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'A classic music programme block opens with station branding/RJ banter, introduces the countdown rank with trivia, plays the music, reads listener interaction, and concludes with sponsor branding before commercial breaks.',
    hints: [
      'Always start with the brand station ID and greeting.',
      'Introduce the song trivia before playing the track.',
      'Conclude the segment with listener dedications and sponsor sign-off.'
    ],
  },
  // Advanced: Television Programme Code & NBSA Compliance (c11_massmedia_019)
  {
    id: 'ch_021_tv_analysis',
    nodeId: NODE_C11_MASSMEDIA_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'During election exit polls, a private TV news channel airs unverified criminal allegations against a candidate without right of reply or factual proof. Which regulatory body has statutory authority to fine and censor the broadcast?',
    options: [
      'News Broadcasting and Digital Standards Authority (NBSA) & MIB under Cable TV Networks Act 1995',
      'Advertising Standards Council of India (ASCI) only',
      'Central Board of Film Certification (CBFC) only',
      'Audit Bureau of Circulations (ABC)'
    ],
    correctIndex: 0,
    explanation: 'The NBSA enforces the Code of Ethics for private TV news, while the Ministry of Information & Broadcasting (MIB) enforces the Cable Television Networks (Regulation) Act 1995 Programme Code.',
    hints: [
      'ASCI regulates advertisements; CBFC regulates cinema films.',
      'News broadcasts are overseen by NBSA and the Cable TV Networks Act.',
      'Look for the television broadcast standards authority.'
    ],
  },
  // Advanced: Indian Soap Operas vs Series Distinction (c11_massmedia_020)
  {
    id: 'ch_022_tv_distinguish',
    nodeId: NODE_C11_MASSMEDIA_020,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'understanding',
    question: 'What is the narrative structural difference between a classic Indian Soap Opera ("Yeh Rishta Kya Kehlata Hai") and an episodic Television Series (such as "CID")?',
    options: [
      'A soap opera is an open-ended continuing serial with multi-stranded continuing plots; a series features self-contained episodic mysteries that reset each week',
      'A soap opera has only 3 episodes while a series runs for 20 years',
      'A soap opera is non-fiction while a crime series is pure documentary',
      'A soap opera is strictly broadcast on radio while series are broadcast on TV'
    ],
    correctIndex: 0,
    explanation: 'A soap opera is an ongoing serial where storylines interconnect and extend across years with cliff-hangers, whereas an episodic series resolves its central conflict within each standalone episode.',
    hints: [
      'Think about whether you need to watch yesterday’s episode to understand today’s show.',
      'In a crime procedural like CID, each case is solved by the end of the hour.',
      'In a daily soap, family drama and plotlines carry forward endlessly across seasons.'
    ],
    misconceptionIndex: 1,
  },
];

// ─── DEFAULT PROPS ───────────────────────────────────────────────────────────
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
  nodeId: NODE_C11_MASSMEDIA_011,
  title: 'News Values, Inverted Pyramid & Media Programme Formats',
  definition: 'News values are the 8 editorial criteria (timeliness, proximity, prominence, conflict, consequence, oddity, human interest, development) used to determine newsworthiness. Reporting organises these facts via the Inverted Pyramid, compressed by sharp headlines and truthful photojournalism, and formatted across radio and television genres.',
  eli5: 'Think of media like a master kitchen. News values help the chef pick the freshest ingredients. The inverted pyramid puts the best dish right on top. Headlines are the name on the menu. Radio paints the taste in your ears, and TV brings it alive on screen!',
  misconceptions: [
    {
      misconception: 'The Inverted Pyramid means writing the story in reverse chronological order (last to first).',
      correction: 'It is order of importance, not time. The most critical newsworthy fact comes first regardless of when it happened.'
    },
    {
      misconception: 'Reality television shows like Bigg Boss are non-fiction because real people participate.',
      correction: 'They belong to fiction formats because producers design the environment, cast for conflict, and edit hundreds of hours into scripted dramatic arcs.'
    },
    {
      misconception: 'Development is a Western news value focused on corporate business profits.',
      correction: 'Development news value originated in post-colonial Indian journalism to highlight socio-economic progress, rural upliftment, and scientific milestones like Chandrayaan-3.'
    },
    {
      misconception: 'Headlines should prioritize being catchy clickbait even if they exaggerate facts.',
      correction: 'A headline must first be accurate and fair. Press Council of India explicitly censures misleading or sensational headlines.'
    },
    {
      misconception: 'Radio news bulletins can be read directly from newspaper articles.',
      correction: 'Radio uses spoken grammar with short 15-20 word sentences designed for single-breath delivery, because listeners cannot rewind.'
    }
  ],
  diagnosticQuestions: [
    { question: 'Which news value reflects geographical or psychological closeness to the audience?', options: ['Proximity', 'Oddity', 'Prominence', 'Consequence'], correctIndex: 0 },
    { question: 'What is the top opening section of the inverted pyramid called?', options: ['The Lead / Intro', 'The Body', 'The Tail', 'The Editorial Column'], correctIndex: 0 },
    { question: 'Which tense is standard for news headlines reporting recent events?', options: ['Present Tense', 'Past Perfect Tense', 'Future Continuous', 'Subjunctive'], correctIndex: 0 },
    { question: 'Who regulates ethical standards of print photojournalism in India?', options: ['Press Council of India (PCI)', 'TRAI', 'CBFC', 'ASCI'], correctIndex: 0 },
    { question: 'What is the ideal word count for a radio bulletin sentence?', options: ['15–20 words', '45–60 words', '80–100 words', '5–8 words'], correctIndex: 0 },
    { question: 'What scripting format is used for radio documentaries?', options: ['Two-column (Audio left, Spoken right)', 'Single paragraph essay', 'Three-act screenplay only', 'Unwritten running notes'], correctIndex: 0 },
    { question: 'Which body regulates truth in commercial radio advertising claims?', options: ['ASCI', 'Doordarshan', 'NBSA', 'Press Club'], correctIndex: 0 },
    { question: 'Under which TV category is Kaun Banega Crorepati placed in ISC syllabus?', options: ['Non-Fiction / Reality Quiz', 'Pure Fiction Soap Opera', 'Print Photo Feature', 'Radio Talk Show'], correctIndex: 0 },
  ],
  masteryCriteria: 'Mastery is achieved when a student can apply all 8 news values to story selection, construct an inverted pyramid lead with valid headline, critique photo ethics, and distinguish all radio and TV programme formats.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───────────────────────────────────────────
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The 8 News Values Radar',
    instruction: 'Adjust the sliders for Timeliness, Impact, and Prominence to observe how the overall Newsworthiness Meter changes.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_MASSMEDIA_011,
  },
  {
    title: 'Lab 2: The Inverted Pyramid Slicer',
    instruction: 'Click each layer of the pyramid to inspect how editors cut copy from the bottom without killing the core news.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_MASSMEDIA_012,
  },
  {
    title: 'Lab 3: Headline Unit Count & Active Voice Engine',
    instruction: 'Type or toggle words into the headline generator to test active voice, character count, and SEO readiness.',
    interactionType: 'interactive-editor',
    nodeId: NODE_C11_MASSMEDIA_013,
  },
  {
    title: 'Lab 4: Radio Audio Studio & VU Meter',
    instruction: 'Switch between News Bulletin, Radio Drama, and PSA audio modes to see acoustic scripting waveforms in real time.',
    interactionType: 'audio-visualizer',
    nodeId: NODE_C11_MASSMEDIA_015,
  },
  {
    title: 'Lab 5: TV Fiction vs Non-Fiction Spectrum',
    instruction: 'Drag television shows onto the reality-spectrum gauge to classify formats and view regulatory compliance rules.',
    interactionType: 'drag-classify',
    nodeId: NODE_C11_MASSMEDIA_018,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ────────────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you increase the "Timeliness" and "Consequence" of a story to maximum in the Newsroom Engine, what happens to its front-page placement score?',
    options: [
      'It jumps straight into Banner Lead Story territory (Top 95%+)',
      'It drops down to a Single-Column bottom filler',
      'It gets routed exclusively to the lifestyle supplement',
      'The newsworthiness score stays completely unchanged'
    ],
    correctIndex: 0,
    verifyInstruction: 'Drag both Timeliness and Consequence sliders to 100% on Lab 1 to verify the Lead Story threshold!',
    nodeId: NODE_C11_MASSMEDIA_011,
  },
  {
    question: 'Predict: If an editor removes the bottom "Tail" paragraph of an Inverted Pyramid story during page layout, does the report still make complete factual sense?',
    options: [
      'Yes, because all essential 5 Ws & 1 H and core facts are safe in the top Lead and Body',
      'No, the whole story collapses and becomes completely incomprehensible',
      'The headline automatically deletes itself',
      'The reporter will be legally censured by the Supreme Court'
    ],
    correctIndex: 0,
    verifyInstruction: 'Click the "Trim Tail (Cut Bottom)" toggle in Lab 2 to see the Lead and Body remain 100% coherent!',
    nodeId: NODE_C11_MASSMEDIA_012,
  },
];

// ─── OBSERVATION QUESTIONS ───────────────────────────────────────────────────
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the character count gauge when you replace passive words with active verbs in a headline?',
    observableOptions: [
      'The character count drops significantly and the headline becomes punchier and more direct',
      'The character count increases and the headline becomes confusing',
      'Active verbs are banned by the Press Council of India',
      'No change in length occurs at all'
    ],
    correctIndex: 0,
    nodeId: NODE_C11_MASSMEDIA_013,
  },
  {
    question: 'What happens to the Radio Studio visualizer when you switch from a News Bulletin to a Radio Drama?',
    observableOptions: [
      'Multi-track layers activate showing SFX, dialogue, and musical transitions instead of a single voice track',
      'The audio completely mutes and turns into a written newspaper page',
      'The sound turns into an unedited television video stream',
      'All radio frequencies get shut down by the government'
    ],
    correctIndex: 0,
    nodeId: NODE_C11_MASSMEDIA_016,
  },
];

// ─── REAL-WORLD ACTIVITY ─────────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Editor’s 24-Hour Newsdesk Challenge',
  description: 'Pick an unfolding current affairs topic in India today (e.g., a green energy launch, an educational policy change, or a sports championship). Perform full editorial synthesis:',
  steps: [
    'Identify at least 3 governing news values in the event (e.g., Development, Prominence, Consequence).',
    'Draft a 30-word Inverted Pyramid lead answering all 5 Ws and 1 H.',
    'Write an active-voice, 10-word print headline and a 65-character digital SEO headline.',
    'Script a 20-second radio bulletin sentence and select an ethical photograph adhering to Press Council guidelines.'
  ],
};

// ─── COMPONENT IMPLEMENTATION ────────────────────────────────────────────────
function C11_MassMediaNewsValuesTimelinessSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['massmedia'] || { name: 'Mass Media', emoji: '📰', color: 'rose' };

  // ─── PRIMARY FLOW STATE ───────────────────────────────────────────────────
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ─── INTERACTIVE LAB CONTROLS (30+ State Items) ───────────────────────────
  // News Values Lab
  const [valTimeliness, setValTimeliness] = useState(70);
  const [valProximity, setValProximity] = useState(60);
  const [valProminence, setValProminence] = useState(50);
  const [valConsequence, setValConsequence] = useState(80);
  const [valConflict, setValConflict] = useState(40);
  const [valOddity, setValOddity] = useState(20);
  const [valHumanInterest, setValHumanInterest] = useState(65);
  const [valDevelopment, setValDevelopment] = useState(75);

  // Inverted Pyramid Lab
  const [selectedPyramidLayer, setSelectedPyramidLayer] = useState<'lead' | 'body' | 'tail'>('lead');
  const [isTailTrimmed, setIsTailTrimmed] = useState(false);

  // Headline Lab
  const [headlineSubject, setHeadlineSubject] = useState('ISRO');
  const [headlineVerb, setHeadlineVerb] = useState('Launches');
  const [headlineObject, setHeadlineObject] = useState('Solar Mission Aditya-L1');
  const [headlineStyle, setHeadlineStyle] = useState<'active' | 'passive'>('active');

  // Radio Studio Lab
  const [radioFormatMode, setRadioFormatMode] = useState<'bulletin' | 'drama' | 'jingle' | 'psa'>('bulletin');
  const [isPlayingAudioSim, setIsPlayingAudioSim] = useState(false);
  const [audioVolumeLevel, setAudioVolumeLevel] = useState(75);

  // TV Spectrum Lab
  const [tvSelectedFormat, setTvSelectedFormat] = useState<string>('news');
  const [tvClassificationResult, setTvClassificationResult] = useState<string>('Non-Fiction (Anchor Led)');

  // Predict-then-Check & Observation
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Sandbox Free Play
  const [sandboxTab, setSandboxTab] = useState<'newsroom' | 'pyramid' | 'radio' | 'tv'>('newsroom');

  // Challenge Phase States
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & Sort & Construct
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Visual feedback popups
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const radioCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED VALUES & REAL-TIME CALCULATIONS ─────────────────────────────
  const overallNewsworthinessScore = useMemo(() => {
    const raw = (valTimeliness * 0.25) +
      (valConsequence * 0.25) +
      (valProminence * 0.15) +
      (valProximity * 0.10) +
      (valDevelopment * 0.10) +
      (valConflict * 0.05) +
      (valHumanInterest * 0.05) +
      (valOddity * 0.05);
    return Math.min(100, Math.round(raw));
  }, [valTimeliness, valConsequence, valProminence, valProximity, valDevelopment, valConflict, valHumanInterest, valOddity]);

  const newsPlacementCategory = useMemo(() => {
    if (overallNewsworthinessScore >= 85) return { label: '🔥 Banner Lead (Page 1 Top)', color: 'text-rose-400', border: 'border-rose-500' };
    if (overallNewsworthinessScore >= 65) return { label: '📰 Second Lead (Page 1 Right)', color: 'text-amber-400', border: 'border-amber-500' };
    if (overallNewsworthinessScore >= 45) return { label: '📄 Inside Page National News', color: 'text-gold-400', border: 'border-gold-500' };
    return { label: '📎 Single-Column Bottom Filler', color: 'text-slate-400', border: 'border-slate-600' };
  }, [overallNewsworthinessScore]);

  const assembledHeadline = useMemo(() => {
    if (headlineStyle === 'active') {
      return `${headlineSubject} ${headlineVerb} ${headlineObject}`;
    }
    return `${headlineObject} Was ${headlineVerb.replace(/s$/, 'ed')} by ${headlineSubject}`;
  }, [headlineSubject, headlineVerb, headlineObject, headlineStyle]);

  const headlineCharCount = useMemo(() => assembledHeadline.length, [assembledHeadline]);
  const headlineWordCount = useMemo(() => assembledHeadline.trim().split(/\s+/).length, [assembledHeadline]);

  // Adaptive challenges filter
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentChallengeItem = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD FROM MASTERY STORE ───────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY ADAPTATION ────────────────────────────────────────────────
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const currentM = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(currentM);
    const newTier = (currentM === 'not-started' || currentM === 'beginner') ? 'foundation'
      : currentM === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newTier) {
        setCurrentChallenge(0);
        return newTier;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS 1: NEWSROOM ANIMATION & BROADCAST STATUS ──────────────────────
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

      // Grid background
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Signal wave
      ctx.beginPath();
      ctx.strokeStyle = overallNewsworthinessScore > 75 ? '#f43f5e' : '#38bdf8';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x++) {
        const y = 25 + Math.sin((x + frame * 3) * 0.05) * (overallNewsworthinessScore * 0.18);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Broadcast text pulse
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText(`NEWS-STREAM ACTIVE | SCORE: ${overallNewsworthinessScore}%`, 10, 45);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [overallNewsworthinessScore]);

  // ─── CANVAS 2: RADIO STUDIO VU METER & ACOUSTIC OSCILLOSCOPE ──────────────
  useEffect(() => {
    const canvas = radioCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animId: number;

    const renderRadio = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw VU Meter Bars
      const numBars = 24;
      const barWidth = canvas.width / numBars - 3;
      for (let i = 0; i < numBars; i++) {
        const baseHeight = Math.sin((i * 0.5) + (frame * 0.1)) * 20 + 25;
        const multiplier = radioFormatMode === 'drama' ? 1.4 : radioFormatMode === 'jingle' ? 1.8 : 0.9;
        const barHeight = Math.min(canvas.height - 10, Math.max(4, baseHeight * (audioVolumeLevel / 100) * multiplier));

        const isPeak = barHeight > canvas.height * 0.75;
        ctx.fillStyle = isPeak ? '#f43f5e' : i > numBars * 0.6 ? '#fbbf24' : '#10b981';
        ctx.fillRect(i * (barWidth + 3), canvas.height - barHeight, barWidth, barHeight);
      }

      animId = requestAnimationFrame(renderRadio);
    };

    renderRadio();
    return () => cancelAnimationFrame(animId);
  }, [radioFormatMode, audioVolumeLevel, isPlayingAudioSim]);

  // ─── ESCALATING HINTS HANDLER ─────────────────────────────────────────────
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentChallengeItem.hints && currentChallengeItem.hints[nextLevel - 1]) {
      const hintMsg = currentChallengeItem.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintMsg);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
    }
  }, [hintCount, currentChallengeItem]);

  // ─── RESET INACTIVITY AUTO-HINT TIMER ────��────────────────────────────────
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── DISCOVERY HANDLER ────────────────────────────────────────────────────
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding editorial deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── PHASE TRANSITION HANDLERS ────────────────────────────────────────────
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Media Exploration Lab. Let us examine news values and formats interactively.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('You have unlocked Free Sandbox mode. Experiment freely before the deadline challenges.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge Phase activated. Apply your journalistic skills to solve each prompt.');
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ────────────────────────────────────
  const handlePrediction = useCallback((_idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Now interact with the sliders to verify your editorial intuition.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp eye! Your observation matches professional newsroom conventions.' : 'Look closely at the character counter as you switch voice.');
  }, []);

  // ─── LAB INTERACTION HANDLERS ─────────────────────────────────────────────
  const handleNewsValueSliderChange = useCallback((valueKey: string, val: number) => {
    audioManager.play('count');
    switch (valueKey) {
      case 'timeliness': setValTimeliness(val); break;
      case 'proximity': setValProximity(val); break;
      case 'prominence': setValProminence(val); break;
      case 'consequence': setValConsequence(val); break;
      case 'conflict': setValConflict(val); break;
      case 'oddity': setValOddity(val); break;
      case 'humanInterest': setValHumanInterest(val); break;
      case 'development': setValDevelopment(val); break;
    }
    if (predictionMade && !predictionVerified) {
      if (valTimeliness >= 90 && valConsequence >= 90) {
        setPredictionVerified(true);
        audioManager.play('sparkle');
      }
    }
  }, [predictionMade, predictionVerified]);

  const handlePyramidLayerClick = useCallback((layer: 'lead' | 'body' | 'tail') => {
    setSelectedPyramidLayer(layer);
    audioManager.play('tap');
    const descriptions = {
      lead: 'Lead (Intro): 5 Ws & 1 H in 25-40 words. Carries the entire core story.',
      body: 'Body: Elaborates facts, quotes, witness statements, and statistics.',
      tail: 'Tail (Background): Historical context. First to be trimmed if space is tight.'
    };
    speechManager.speak(descriptions[layer]);
  }, []);

  const handleToggleTailTrim = useCallback(() => {
    setIsTailTrimmed(prev => !prev);
    audioManager.play('pop');
  }, []);

  const handleHeadlineStyleChange = useCallback((style: 'active' | 'passive') => {
    setHeadlineStyle(style);
    audioManager.play('tap');
  }, []);

  const handleRadioFormatChange = useCallback((format: 'bulletin' | 'drama' | 'jingle' | 'psa') => {
    setRadioFormatMode(format);
    audioManager.play('whoosh');
  }, []);

  const handleToggleAudioPlay = useCallback(() => {
    setIsPlayingAudioSim(prev => {
      const next = !prev;
      audioManager.play(next ? 'chime' : 'pop');
      return next;
    });
  }, []);

  const handleTvFormatSelect = useCallback((fmt: string) => {
    setTvSelectedFormat(fmt);
    audioManager.play('tap');
    const classifications: Record<string, string> = {
      news: 'Non-Fiction | Factual, inverted pyramid, NBSA & Cable TV Act regulated.',
      documentary: 'Non-Fiction | Long-form investigative narrative arc, real actuality.',
      interview: 'Non-Fiction | Structured Q&A, active listening, public accountability.',
      soap: 'Fiction | Open-ended continuing family melodrama, scripted multi-threads.',
      reality: 'Fiction Format | Engineered casting & tasks, edited narrative arcs (Bigg Boss).',
      animation: 'Fiction | Drawn/CGI storytelling, mythological & moral lore (Chhota Bheem).'
    };
    setTvClassificationResult(classifications[fmt] || 'Unclassified Format');
  }, []);

  // ─── DRAG & DROP HANDLERS (Drag-Label & Sort) ──────────────────────────────
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
      const base = prev.length === (currentChallengeItem.sortItems?.length || 0)
        ? prev
        : (currentChallengeItem.sortItems?.map((_, i) => i) || []);
      const arr = [...base];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [currentChallengeItem]);

  // ─── COMPLETION HANDLER ───────────────────────────────────────────────────
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Editorial simulation complete. Review your performance and spaced repetition schedule.');
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE HANDLER ───────────────────────────────────────────────
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

  // ─── MAIN ANSWER SUBMISSION HANDLER ───────────────────────────────────────
  const handleAnswerSubmit = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (currentChallengeItem.type === 'classify' || currentChallengeItem.type === 'distinguish' || currentChallengeItem.type === 'match') {
      isCorrect = answer === currentChallengeItem.correctIndex;
    } else if (currentChallengeItem.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeItem.correctMapping);
    } else if (currentChallengeItem.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeItem.correctOrder);
    } else if (currentChallengeItem.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (currentChallengeItem.correctAnswer || 0)) <= (currentChallengeItem.tolerance || 0);
    } else if (currentChallengeItem.type === 'construct') {
      isCorrect = (typeof answer === 'string' ? answer.trim() : '') === (currentChallengeItem.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Accurate editorial application.');
      setShowConfetti(true);
      setShowExplanation(true);

      // BKT & SRS update
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(currentChallengeItem.nodeId, currentChallengeItem.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + currentChallengeItem.nodeId, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us review the step-by-step journalistic analysis.');
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

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0
      ? sortArrangement
      : (currentChallengeItem.sortItems?.map((_, i) => i) || []);
    handleAnswerSubmit(answer);
  }, [sortArrangement, currentChallengeItem, handleAnswerSubmit]);

  // Construct parts click
  const handleAddConstructPart = useCallback((part: string) => {
    setConstructParts(prev => [...prev, part]);
    audioManager.play('tap');
  }, []);

  const handleRemoveConstructPart = useCallback((idx: number) => {
    setConstructParts(prev => prev.filter((_, i) => i !== idx));
    audioManager.play('pop');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── RENDER MAIN COMPONENT ───────────────────────────────────────────────
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      
      {/* ─── HEADER BAR ──────────────────────────────────────────────────── */}
      <motion.header 
        initial={{ opacity: 0, y: -15 }} 
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 15 }} 
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-2xl shadow-lg shadow-rose-900/30"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-rose-900/60 text-rose-300 border border-rose-700">
                ISC Class 11 Mass Media
              </span>
              <span className="text-xs text-slate-400">c11_massmedia_011 — 020</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Status Pill & Difficulty Badge */}
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Mastery: <strong className="text-emerald-400 capitalize">{masteryLevel}</strong></span>
          </motion.div>

          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border ${
                difficulty === 'foundation' ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300' :
                difficulty === 'advanced' ? 'bg-rose-950/70 border-rose-500 text-rose-300' :
                'bg-gold-950/70 border-gold-500 text-gold-300'
              }`}
            >
              {difficulty} TIER
            </motion.span>
          )}
        </div>
      </motion.header>

      {/* ─── 1. DISCOVERY PHASE ───────────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          {/* Narrative Scenario Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-gold-950/80 via-slate-900 to-slate-900 border border-gold-700/60 shadow-xl">
            <div className="flex items-center gap-2 text-gold-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🚨 Live Editorial Scenario</span>
            </div>
            <h2 className="text-2xl font-black text-white mb-3">{SCENARIO.title}</h2>
            <p className="text-slate-300 leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-200/80 bg-gold-900/40 p-3 rounded-xl border border-gold-800">
              💡 <strong>Editorial Mission:</strong> {SCENARIO.context}
            </p>
          </div>

          {/* Interactive Curiosity Hook Question */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                Discovery Gate — Warm-Up Question (Non-Graded)
              </span>
              <span className="text-xs text-slate-400">Think like a Chief Editor</span>
            </div>

            <p className="text-lg font-semibold text-white leading-snug">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${idx + 1}: ${opt}`}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all duration-200 border ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-slate-800/90 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="text-sm">
                  <p className={discoveryCorrect ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {discoveryCorrect ? '✓ Spot on!' : '💡 Good intuition, but note this:'}
                  </p>
                  <p className="text-slate-300 text-xs mt-1">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Advance to Interactive Exploration Lab"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold text-sm shadow-lg shadow-rose-900/40 whitespace-nowrap"
                >
                  Enter Interactive Exploration Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE ─────────────────────────────────────────── */}
      {phase === 'explore' && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          {/* Step Navigator Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-base font-bold text-white">
                {EXPLORATION_STEPS[currentSlide].title}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {EXPLORATION_STEPS.map((_, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => setCurrentSlide(sIdx)}
                  aria-label={`Jump to exploration step ${sIdx + 1}`}
                  className={`w-8 h-2 rounded-full transition-all ${
                    sIdx === currentSlide ? 'bg-rose-500 w-10' : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-6"
            >
              <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-800/60 text-amber-300 text-sm font-medium flex items-center gap-2">
                <span>👉</span>
                <span>{EXPLORATION_STEPS[currentSlide].instruction}</span>
              </div>

              {/* ─── SLIDE 0: NEWS VALUES RADAR ───────────────────────────── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Sliders */}
                  <div className="lg:col-span-6 space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Editorial Value Sliders (8 Classical Criteria)
                    </h3>

                    {/* Predict-then-Check block */}
                    {!predictionMade && (
                      <div className="p-3 bg-gold-950/50 rounded-xl border border-gold-700/60 space-y-2">
                        <p className="text-xs font-semibold text-gold-200">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="space-y-1">
                          {PREDICTION_QUESTIONS[0].options.map((opt, pIdx) => (
                            <button
                              key={pIdx}
                              onClick={() => handlePrediction(pIdx)}
                              className="w-full text-left p-2 rounded-lg bg-slate-900 text-xs text-slate-300 hover:bg-gold-900/40 transition"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {predictionMade && !predictionVerified && (
                      <div className="p-2 bg-amber-950/50 border border-amber-700 rounded-lg text-xs text-amber-300">
                        ⚡ {PREDICTION_QUESTIONS[0].verifyInstruction}
                      </div>
                    )}

                    {/* Slider rows */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>⏱️ Timeliness (Currentness): {valTimeliness}%</span>
                          <span className="text-slate-500">Weight: 25%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={valTimeliness}
                          onChange={e => handleNewsValueSliderChange('timeliness', Number(e.target.value))}
                          aria-label="Set Timeliness percentage"
                          className="w-full accent-rose-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>💥 Consequence / Impact: {valConsequence}%</span>
                          <span className="text-slate-500">Weight: 25%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={valConsequence}
                          onChange={e => handleNewsValueSliderChange('consequence', Number(e.target.value))}
                          aria-label="Set Consequence percentage"
                          className="w-full accent-amber-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>⭐ Prominence (Public Figures): {valProminence}%</span>
                          <span className="text-slate-500">Weight: 15%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={valProminence}
                          onChange={e => handleNewsValueSliderChange('prominence', Number(e.target.value))}
                          aria-label="Set Prominence percentage"
                          className="w-full accent-gold-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>�� Proximity (Geo/Psychological): {valProximity}%</span>
                          <span className="text-slate-500">Weight: 10%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={valProximity}
                          onChange={e => handleNewsValueSliderChange('proximity', Number(e.target.value))}
                          aria-label="Set Proximity percentage"
                          className="w-full accent-gold-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>🚀 Development (Progress/Science): {valDevelopment}%</span>
                          <span className="text-slate-500">Weight: 10%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={valDevelopment}
                          onChange={e => handleNewsValueSliderChange('development', Number(e.target.value))}
                          aria-label="Set Development percentage"
                          className="w-full accent-emerald-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Live Front-Page Mockup & Canvas */}
                  <div className="lg:col-span-6 space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Front Page Decision Engine
                        </span>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border bg-slate-900 ${newsPlacementCategory.color} ${newsPlacementCategory.border}`}>
                          {newsPlacementCategory.label}
                        </span>
                      </div>

                      <canvas ref={canvasRef} width={380} height={60} className="w-full rounded-xl bg-slate-900 mb-4 border border-slate-800" />

                      {/* SVG Newspaper Layout Preview */}
                      <svg viewBox="0 0 400 240" className="w-full rounded-xl bg-slate-900 border border-slate-800">
                        {/* Masthead */}
                        <rect x="10" y="10" width="380" height="30" fill="#1e293b" rx="4" />
                        <text x="200" y="30" fill="#f8fafc" fontSize="14" fontWeight="bold" textAnchor="middle">THE DAILY BHARAT TRIBUNE</text>

                        {/* Dynamic Lead Story Box */}
                        <motion.rect
                          x="10"
                          y="50"
                          width={overallNewsworthinessScore > 75 ? "250" : "180"}
                          height={overallNewsworthinessScore > 75 ? "120" : "80"}
                          fill={overallNewsworthinessScore > 75 ? "#881337" : "#1e293b"}
                          stroke={overallNewsworthinessScore > 75 ? "#f43f5e" : "#475569"}
                          strokeWidth="2"
                          rx="4"
                          animate={{ scale: [1, 1.01, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <text x="20" y="70" fill="#ffffff" fontSize="10" fontWeight="bold">
                          {overallNewsworthinessScore > 80 ? '🔥 LEAD: CHANDRAYAAN-3 LANDS ON MOON' : 'NEWS: Regional Assembly Session Adjourned'}
                        </text>
                        <text x="20" y="85" fill="#94a3b8" fontSize="8">
                          Calculated Newsworthiness Weight: {overallNewsworthinessScore}%
                        </text>

                        {/* Secondary Column */}
                        <rect x={overallNewsworthinessScore > 75 ? "270" : "200"} y="50" width={overallNewsworthinessScore > 75 ? "120" : "190"} height="120" fill="#0f172a" stroke="#334155" rx="4" />
                        <text x={overallNewsworthinessScore > 75 ? "280" : "210"} y="70" fill="#cbd5e1" fontSize="9">Sports & Economy</text>

                        {/* Bottom Bar */}
                        <rect x="10" y="180" width="380" height="50" fill="#1e293b" rx="4" />
                        <text x="200" y="210" fill="#94a3b8" fontSize="8" textAnchor="middle">
                          Human Interest & Oddity Supplement Section
                        </text>
                      </svg>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                      <strong>Editorial Metric:</strong> Stories combining Timeliness + Consequence automatically seize Page 1 Banner headlines under Indian journalistic norms.
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 1: INVERTED PYRAMID SLICER ─────────────────────── */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Interactive SVG Pyramid */}
                  <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                      Click Each Tier to Inspect Copy Prioritisation
                    </h3>

                    <svg viewBox="0 0 320 280" className="w-full max-w-sm">
                      {/* Tier 1: Lead */}
                      <polygon
                        points="10,20 310,20 260,100 60,100"
                        fill={selectedPyramidLayer === 'lead' ? '#e11d48' : '#881337'}
                        stroke="#f43f5e"
                        strokeWidth={selectedPyramidLayer === 'lead' ? '3' : '1'}
                        className="cursor-pointer transition-all"
                        onClick={() => handlePyramidLayerClick('lead')}
                      />
                      <text x="160" y="55" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" pointerEvents="none">
                        1. LEAD / INTRO (5 Ws & 1 H)
                      </text>
                      <text x="160" y="75" fill="#fecdd3" fontSize="9" textAnchor="middle" pointerEvents="none">
                        Essential Core (25–40 words)
                      </text>

                      {/* Tier 2: Body */}
                      <polygon
                        points="60,105 260,105 210,185 110,185"
                        fill={selectedPyramidLayer === 'body' ? '#d97706' : '#78350f'}
                        stroke="#f59e0b"
                        strokeWidth={selectedPyramidLayer === 'body' ? '3' : '1'}
                        className="cursor-pointer transition-all"
                        onClick={() => handlePyramidLayerClick('body')}
                      />
                      <text x="160" y="140" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" pointerEvents="none">
                        2. BODY (Elaboration)
                      </text>
                      <text x="160" y="158" fill="#fde68a" fontSize="8" textAnchor="middle" pointerEvents="none">
                        Witnesses, Quotes, Figures
                      </text>

                      {/* Tier 3: Tail */}
                      {!isTailTrimmed && (
                        <polygon
                          points="110,190 210,190 160,260"
                          fill={selectedPyramidLayer === 'tail' ? '#2563eb' : '#1e3a8a'}
                          stroke="#3b82f6"
                          strokeWidth={selectedPyramidLayer === 'tail' ? '3' : '1'}
                          className="cursor-pointer transition-all"
                          onClick={() => handlePyramidLayerClick('tail')}
                        />
                      )}
                      {!isTailTrimmed && (
                        <text x="160" y="225" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" pointerEvents="none">
                          3. TAIL (Background)
                        </text>
                      )}

                      {isTailTrimmed && (
                        <g>
                          <line x1="100" y1="200" x2="220" y2="200" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4" />
                          <text x="160" y="225" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">
                            ✂️ TAIL TRIMMED BY SUB-EDITOR
                          </text>
                        </g>
                      )}
                    </svg>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleToggleTailTrim}
                      className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-xs text-rose-300 border border-rose-800 font-bold"
                    >
                      {isTailTrimmed ? 'Restore Background Tail' : '✂️ Simulate Bottom-Up Trim (Cut Tail)'}
                    </motion.button>
                  </div>

                  {/* Right Real News Copy Simulation */}
                  <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Live News Story Dissection (Balasore Train Report)
                    </h3>

                    <div className="space-y-3">
                      {/* Lead Block */}
                      <div className={`p-3 rounded-xl border transition-all ${
                        selectedPyramidLayer === 'lead' ? 'bg-rose-950/60 border-rose-500' : 'bg-slate-900 border-slate-800'
                      }`}>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
                          Para 1: The Lead (5 Ws & 1 H)
                        </span>
                        <p className="text-xs text-slate-200 leading-relaxed">
                          "At least 14 people died and 40 were injured when an express train derailed near Bahanaga Bazar station in Odisha on Friday evening due to suspected signalling failure, the Railway Board confirmed."
                        </p>
                      </div>

                      {/* Body Block */}
                      <div className={`p-3 rounded-xl border transition-all ${
                        selectedPyramidLayer === 'body' ? 'bg-amber-950/60 border-amber-500' : 'bg-slate-900 border-slate-800'
                      }`}>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                          Para 2 & 3: The Body (Supporting Evidence & Quotes)
                        </span>
                        <p className="text-xs text-slate-200 leading-relaxed">
                          "National Disaster Response Force (NDRF) deployed four rescue teams within an hour. Hospital superintendent Dr. S. Panda confirmed that three critically injured passengers were transferred to AIIMS Bhubaneswar."
                        </p>
                      </div>

                      {/* Tail Block */}
                      {!isTailTrimmed ? (
                        <div className={`p-3 rounded-xl border transition-all ${
                          selectedPyramidLayer === 'tail' ? 'bg-gold-950/60 border-gold-500' : 'bg-slate-900 border-slate-800'
                        }`}>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 block mb-1">
                            Para 4: The Tail (Historical Background & Context)
                          </span>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            "This corridor previously witnessed a track modernisation review in 2021, and the Ministry of Railways had allocated funds for electronic interlocking upgrades across the South Eastern zone."
                          </p>
                        </div>
                      ) : (
                        <div className="p-3 rounded-xl border border-dashed border-rose-700 bg-rose-950/20 text-xs text-rose-400">
                          Notice: Even with the tail trimmed for column space, the reader still knows Who, What, When, Where, Why, How, and casualty numbers!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: HEADLINE ENGINE ─────────────────────────────── */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Headline Controls */}
                  <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Sub-Editor’s Headline Workbench
                    </h3>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Voice & Tense Convention:</label>
                      <div className="grid grid-cols-2 gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleHeadlineStyleChange('active')}
                          className={`p-2 rounded-xl text-xs font-bold border ${
                            headlineStyle === 'active' ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-slate-900 border-slate-700 text-slate-400'
                          }`}
                        >
                          ✓ Active Voice + Present Tense (Standard)
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleHeadlineStyleChange('passive')}
                          className={`p-2 rounded-xl text-xs font-bold border ${
                            headlineStyle === 'passive' ? 'bg-rose-950 border-rose-500 text-rose-300' : 'bg-slate-900 border-slate-700 text-slate-400'
                          }`}
                        >
                          ✗ Passive Voice + Past Tense (Weak)
                        </motion.button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-500">Subject (Actor)</label>
                        <select
                          value={headlineSubject}
                          onChange={e => setHeadlineSubject(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 text-xs rounded-lg p-2 text-white"
                        >
                          <option value="ISRO">ISRO</option>
                          <option value="Supreme Court">Supreme Court</option>
                          <option value="RBI">RBI</option>
                          <option value="Parliament">Parliament</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500">Active Verb</label>
                        <select
                          value={headlineVerb}
                          onChange={e => setHeadlineVerb(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 text-xs rounded-lg p-2 text-white"
                        >
                          <option value="Launches">Launches</option>
                          <option value="Quashes">Quashes</option>
                          <option value="Raises">Raises</option>
                          <option value="Passes">Passes</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500">Object / Consequence</label>
                        <select
                          value={headlineObject}
                          onChange={e => setHeadlineObject(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 text-xs rounded-lg p-2 text-white"
                        >
                          <option value="Solar Mission Aditya-L1">Solar Mission Aditya-L1</option>
                          <option value="Telecom Review Plea">Telecom Review Plea</option>
                          <option value="Repo Rate by 25 bps">Repo Rate by 25 bps</option>
                          <option value="Data Protection Bill">Data Protection Bill</option>
                        </select>
                      </div>
                    </div>

                    {/* Observation Question */}
                    {!observationAnswered && (
                      <div className="mt-4 p-3 bg-gold-950/40 rounded-xl border border-gold-700/60 space-y-2">
                        <p className="text-xs font-semibold text-gold-200">{OBSERVATION_QUESTIONS[0].question}</p>
                        <div className="space-y-1">
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              onClick={() => handleObservation(oIdx)}
                              className="w-full text-left p-2 rounded-lg bg-slate-900 text-xs text-slate-300 hover:bg-gold-900/40 transition"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Headline Metrics & SEO Gauge */}
                  <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Live Headline Layout Preview & Unit Count
                    </h3>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">Page 1 Banner Output</span>
                      <h4 className="text-xl font-black text-white leading-tight font-serif">
                        {assembledHeadline}
                      </h4>
                      <p className="text-xs text-slate-400">
                        Deck: Bench Delivers Unanimous Decision; Nationwide Implementation Underway
                      </p>
                    </div>

                    {/* Character & Word Gauges */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400 block mb-1">Print Word Count</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-emerald-400">{headlineWordCount}</span>
                          <span className="text-xs text-slate-500">/ 8–12 words optimum</span>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400 block mb-1">Google News SEO Length</span>
                        <div className="flex items-baseline gap-2">
                          <span className={`text-2xl font-black ${headlineCharCount <= 70 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {headlineCharCount}
                          </span>
                          <span className="text-xs text-slate-500">/ 65 chars max</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 p-2 bg-slate-900 rounded-lg">
                      {headlineStyle === 'active'
                        ? '✅ Active voice preserves column space and puts the actor right at the start.'
                        : '⚠️ Passive voice wastes 25%+ more characters with auxiliary words ("was", "by").'}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 3: RADIO STUDIO LAB ────────────────────────────── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Radio Format Switcher */}
                  <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      All India Radio Studio Format Selector
                    </h3>

                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'bulletin' as const, label: 'News Bulletin', desc: '15-20 word spoken sentences' },
                        { id: 'drama' as const, label: 'Radio Drama', desc: 'Numbered SFX cues + dialogue' },
                        { id: 'jingle' as const, label: 'Radio Jingle', desc: '5-30s musical hook & rhyme' },
                        { id: 'psa' as const, label: 'Public Service (PSA)', desc: 'Behaviour change appeal' },
                      ].map(item => (
                        <motion.button
                          key={item.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleRadioFormatChange(item.id)}
                          className={`p-3 rounded-xl text-left border transition ${
                            radioFormatMode === item.id
                              ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="font-bold text-xs text-white">{item.label}</div>
                          <div className="text-[10px] text-slate-400">{item.desc}</div>
                        </motion.button>
                      ))}
                    </div>

                    {/* Audio Simulator Controls */}
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-300 font-semibold">Studio Microphone Level</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleToggleAudioPlay}
                          className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                            isPlayingAudioSim ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          {isPlayingAudioSim ? '🔴 ON AIR (Broadcasting)' : '⚪ Test Transmission'}
                        </motion.button>
                      </div>

                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={audioVolumeLevel}
                        onChange={e => setAudioVolumeLevel(Number(e.target.value))}
                        aria-label="Set audio volume level"
                        className="w-full accent-emerald-500"
                      />

                      <canvas ref={radioCanvasRef} width={340} height={70} className="w-full rounded-xl bg-slate-950 border border-slate-800" />
                    </div>
                  </div>

                  {/* Right Two-Column Script Format */}
                  <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Industry Standard Two-Column Script Layout
                    </h3>

                    {radioFormatMode === 'bulletin' && (
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                        <div className="text-rose-400 font-bold uppercase text-[10px]">Format: Spoken News Bulletin</div>
                        <p className="text-slate-200">
                          <strong>READER (One-breath delivery, 18 words):</strong><br />
                          "The Prime Minister today inaugurated the first Vande Bharat Express linking Patna and Ranchi in a virtual ceremony."
                        </p>
                        <div className="text-slate-500 text-[10px] border-t border-slate-800 pt-1">
                          Rule: Written for the ear. No complex sub-clauses, numbers written out phonetically.
                        </div>
                      </div>
                    )}

                    {radioFormatMode === 'drama' && (
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                        <div className="text-amber-400 font-bold uppercase text-[10px]">Format: Radio Drama (Hawa Mahal Style)</div>
                        <div className="grid grid-cols-12 gap-2 text-[11px]">
                          <div className="col-span-5 text-amber-300 font-mono">
                            CUE 1: SFX (Heavy rain, distant thunder)<br />
                            CUE 2: MUSIC (Esraj alaap, 6s)
                          </div>
                          <div className="col-span-7 text-slate-200">
                            <strong>NARRATOR:</strong> "The Kolkata tram came to a halt outside Chitpur."<br />
                            <strong>MINI:</strong> "Ma, look at the big man with the Kabul dry fruits!"
                          </div>
                        </div>
                      </div>
                    )}

                    {radioFormatMode === 'jingle' && (
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                        <div className="text-gold-400 font-bold uppercase text-[10px]">Format: 15-Second Radio Jingle</div>
                        <p className="text-slate-200">
                          <strong>CHORUS (Upbeat folk tune):</strong> "Doodh si safedi Nirma se aaye, rangeen kapda bhi khil khil jaaye!"<br />
                          <strong>VOICEOVER:</strong> "Washing powder Nirma. Shuddhata aur safedi ka vishwas."
                        </p>
                      </div>
                    )}

                    {radioFormatMode === 'psa' && (
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                        <div className="text-emerald-400 font-bold uppercase text-[10px]">Format: Public Service Announcement (Polio Campaign)</div>
                        <p className="text-slate-200">
                          <strong>AMITABH BACHCHAN (Authoritative voice):</strong> "Ek bhi bachcha chhoota, toh suraksha chakra toota. Is Raviwar, Polio booth zaroor jayein."
                        </p>
                        <div className="text-slate-500 text-[10px] border-t border-slate-800 pt-1">
                          Goal: Non-profit health behavior modification (ASCI & Ministry of Health compliance).
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: TV FICTION VS NON-FICTION ────────────────────── */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Format Grid */}
                  <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Television Programme Classification Matrix
                    </h3>

                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'news', name: 'News Bulletin', cat: 'Non-Fiction' },
                        { id: 'documentary', name: 'Documentary Film', cat: 'Non-Fiction' },
                        { id: 'interview', name: 'Walk the Talk (Interview)', cat: 'Non-Fiction' },
                        { id: 'soap', name: 'Daily Soap Opera', cat: 'Fiction' },
                        { id: 'reality', name: 'Bigg Boss / Indian Idol', cat: 'Fiction Format' },
                        { id: 'animation', name: 'Chhota Bheem / Motu Patlu', cat: 'Fiction' },
                      ].map(item => (
                        <motion.button
                          key={item.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleTvFormatSelect(item.id)}
                          className={`p-3 rounded-xl text-left border ${
                            tvSelectedFormat === item.id
                              ? 'bg-rose-950 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="text-xs font-bold text-white">{item.name}</div>
                          <div className="text-[10px] text-slate-400">{item.cat}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Right Compliance & Ontology Inspector */}
                  <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Regulatory & Ethical Evaluation (Cable TV Act 1995 / NBSA)
                    </h3>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase text-slate-400">Selected Programme</span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-900/60 text-rose-300 border border-rose-700">
                          {tvSelectedFormat.toUpperCase()}
                        </span>
                      </div>

                      <div className="text-sm font-semibold text-white">
                        {tvClassificationResult}
                      </div>

                      <div className="text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-2 space-y-1">
                        <p>⚖️ <strong>Truth Contract:</strong> Non-fiction carries an ethical and legal duty of external verifiability; fiction operates within imaginative internal consistency.</p>
                        <p>📺 <strong>Key Insight:</strong> Reality shows are placed in the fiction family because casting conflict, artificial games, and narrative editing structure the broadcast!</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              aria-label="Go to previous exploration step"
              className="px-5 py-2.5 bg-slate-800 text-white rounded-xl text-xs font-bold disabled:opacity-40 border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-medium">
              Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                aria-label="Go to next exploration step"
                className="px-6 py-2.5 bg-gradient-to-r from-rose-600 to-amber-600 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Advance to Free Sandbox Play"
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-900/40"
              >
                Unlock Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE SANDBOX PLAY PHASE ───────────────────────────────────── */}
      {phase === 'sandbox' && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                🎮 Free Exploration Sandbox (Zero Penalty)
              </span>
              <h2 className="text-xl font-black text-white mt-1">Multi-Medium Newsroom Simulator</h2>
              <p className="text-xs text-slate-400 mt-1">
                Toggle tabs, test headlines, manipulate news sliders, and observe radio/TV outputs freely without grading.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Ready to start challenge phase"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-sm shadow-xl shadow-emerald-900/40"
            >
              I Am Ready for Challenges! →
            </motion.button>
          </div>

          {/* Sandbox Tabs */}
          <div className="flex gap-2 border-b border-slate-800 pb-2">
            {[
              { id: 'newsroom' as const, label: '📰 News Values Engine' },
              { id: 'pyramid' as const, label: '📐 Inverted Pyramid' },
              { id: 'radio' as const, label: '🎙️ Radio Studio' },
              { id: 'tv' as const, label: '📺 TV Formats' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSandboxTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  sandboxTab === tab.id
                    ? 'bg-rose-900/70 border border-rose-500 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800">
            {sandboxTab === 'newsroom' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>⏱️ Timeliness: {valTimeliness}%</span>
                    <span>💥 Consequence: {valConsequence}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={valTimeliness}
                    onChange={e => setValTimeliness(Number(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={valConsequence}
                    onChange={e => setValConsequence(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <div className="p-3 bg-slate-950 rounded-xl text-xs text-slate-300 border border-slate-800">
                    Calculated Score: <strong>{overallNewsworthinessScore}%</strong> → {newsPlacementCategory.label}
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                  <h4 className="font-bold text-white uppercase text-[10px]">Editor’s Diagnostic Tip:</h4>
                  <p className="text-slate-300 leading-relaxed">
                    A story with 100% Prominence (e.g., celebrity wedding) but 0% Consequence will be huge on digital clicks, but public service broadcasting (AIR/Doordarshan) prioritises High Consequence + Development.
                  </p>
                </div>
              </div>
            )}

            {sandboxTab === 'pyramid' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-300">
                  Select a section to test bottom-up trimming for print layouts:
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <button onClick={() => handlePyramidLayerClick('lead')} className="p-3 bg-rose-950/60 border border-rose-600 rounded-xl text-xs font-bold text-rose-200">
                    1. Lead (5 Ws & 1 H)
                  </button>
                  <button onClick={() => handlePyramidLayerClick('body')} className="p-3 bg-amber-950/60 border border-amber-600 rounded-xl text-xs font-bold text-amber-200">
                    2. Body (Quotes & Stats)
                  </button>
                  <button onClick={() => handlePyramidLayerClick('tail')} className="p-3 bg-gold-950/60 border border-gold-600 rounded-xl text-xs font-bold text-gold-200">
                    3. Tail (Archival Background)
                  </button>
                </div>
              </div>
            )}

            {sandboxTab === 'radio' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-300">Live studio VU transmission monitor:</p>
                <canvas ref={radioCanvasRef} width={500} height={80} className="w-full rounded-xl bg-slate-950 border border-slate-800" />
              </div>
            )}

            {sandboxTab === 'tv' && (
              <div className="grid grid-cols-3 gap-3">
                {['News Bulletin', 'Documentary', 'Daily Soap', 'Bigg Boss Reality', 'Panchatantra Animation', 'Walk the Talk'].map((t, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <span className="font-bold text-white block mb-1">{t}</span>
                    <span className="text-[10px] text-slate-500">
                      {t.includes('Soap') || t.includes('Reality') || t.includes('Animation') ? 'Fiction / Constructed' : 'Non-Fiction / Factual'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 4. ADAPTIVE CHALLENGE PHASE ──────────────────────────────────── */}
      {phase === 'challenge' && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          {/* Challenge Top Bar */}
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-xs text-slate-400">
                Competency: <strong className="text-amber-400 uppercase">{currentChallengeItem.competencyLevel}</strong>
              </span>
            </div>

            {/* Hint Trigger Button */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={showNextHint}
                disabled={hintCount >= 3 || answerRevealed || showExplanation}
                aria-label="Request escalating editorial hint"
                className="px-3 py-1.5 rounded-xl bg-amber-950/70 border border-amber-600 text-amber-300 text-xs font-bold disabled:opacity-40"
              >
                💡 Hint ({hintCount}/3)
              </motion.button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* ─── QUESTION CARD ────────────────────────────────────────────── */}
          <motion.div
            key={currentChallengeItem.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl bg-slate-900/90 border transition-all ${
              wrongFlash ? 'bg-rose-950/80 border-rose-500 shadow-2xl shadow-rose-900/50' : 'border-slate-800'
            }`}
          >
            <h3 className="text-lg font-bold text-white mb-4 leading-relaxed">
              {currentChallengeItem.question}
            </h3>

            {/* MCQ Options Rendering */}
            {(currentChallengeItem.type === 'classify' || currentChallengeItem.type === 'distinguish' || currentChallengeItem.type === 'match') && currentChallengeItem.options && (
              <div className="space-y-3">
                {currentChallengeItem.options.map((opt, oIdx) => (
                  <motion.button
                    key={oIdx}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswerSubmit(oIdx)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${oIdx + 1}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium border transition-all ${
                      showExplanation && oIdx === currentChallengeItem.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="leading-snug">{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Rendering */}
            {currentChallengeItem.type === 'drag-label' && currentChallengeItem.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-500 w-full mb-1">Drag each label into the diagram targets:</span>
                  {currentChallengeItem.dragItems.map((item, dIdx) => (
                    <motion.div
                      key={dIdx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-rose-900/80 border border-rose-600 rounded-lg text-white text-xs font-bold cursor-grab active:cursor-grabbing"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* Drop Target Diagram */}
                <div className="space-y-3 pt-2">
                  {Object.keys(currentChallengeItem.correctMapping || {}).map((targetId, tIdx) => (
                    <div
                      key={tIdx}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed transition-all flex items-center justify-between ${
                        droppedLabels[targetId]
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-mono uppercase">Target Slot: {targetId.replace('_', ' ').toUpperCase()}</span>
                      <span className="text-xs font-bold text-white">
                        {droppedLabels[targetId] || '📥 Drop Matching Label Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswerSubmit(droppedLabels)}
                  disabled={showExplanation}
                  className="mt-3 px-6 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold shadow-lg"
                >
                  Verify Diagram Labels
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Rendering */}
            {currentChallengeItem.type === 'drag-sort' && currentChallengeItem.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 block mb-2">Drag items to rearrange in correct order:</span>
                {(sortArrangement.length === currentChallengeItem.sortItems.length
                  ? sortArrangement.map(idx => currentChallengeItem.sortItems![idx])
                  : currentChallengeItem.sortItems
                ).map((item, sIdx) => (
                  <motion.div
                    key={sIdx}
                    draggable
                    onDragStart={() => setDraggedItem(String(sIdx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, sIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 flex items-center gap-3 cursor-grab"
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center font-bold text-[10px]">
                      {sIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="mt-3 px-6 py-2.5 bg-amber-600 text-white rounded-xl text-xs font-bold shadow-lg"
                >
                  Confirm Priority Sequence
                </motion.button>
              </div>
            )}

            {/* Numeric Rendering */}
            {currentChallengeItem.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    aria-label="Numeric answer input"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-rose-500 outline-none w-48"
                  />
                  <span className="text-xs text-slate-400 font-bold">{currentChallengeItem.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswerSubmit(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-rose-600 text-white rounded-xl text-xs font-bold shadow-lg disabled:opacity-40"
                  >
                    Check Value
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Rendering */}
            {currentChallengeItem.type === 'construct' && currentChallengeItem.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{currentChallengeItem.validationHint}</p>

                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {currentChallengeItem.availableParts.map((part, pIdx) => (
                    <motion.button
                      key={pIdx}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleAddConstructPart(part)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                {/* Construction Assembly Board */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[90px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, cIdx) => (
                    <motion.span
                      key={cIdx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-3 py-1.5 rounded-lg bg-gold-950 text-gold-200 border border-gold-700 text-xs font-medium flex items-center gap-2"
                    >
                      {part}
                      <button onClick={() => handleRemoveConstructPart(cIdx)} className="text-rose-400 hover:text-rose-200">
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600 italic">Click parts above to construct the news lead...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswerSubmit(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold shadow-lg"
                >
                  Verify Constructed Lead
                </motion.button>
              </div>
            )}

            {/* ─── PROGRESSIVE DISCLOSURE EXPLANATION ──────────────────────── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 rounded-2xl bg-amber-950/40 border border-amber-700/80 space-y-4"
              >
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                  <span>📖 Editorial Masterclass Analysis</span>
                </div>

                <div className="space-y-2">
                  {currentChallengeItem.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, sIdx) => (
                      <motion.p
                        key={sIdx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs text-amber-100 leading-relaxed"
                      >
                        <strong className="text-amber-400">Step {sIdx + 1}:</strong> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-amber-800/40">
                  {revealedSteps < currentChallengeItem.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold rounded-xl"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <span className="text-[10px] text-amber-400 font-medium">✓ Analysis Complete</span>
                  )}

                  {revealedSteps >= currentChallengeItem.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-900/40"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Edition (Complete) →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & MASTERY PHASE ────────────────────────────────── */}
      {phase === 'complete' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Hero Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-rose-950 via-slate-900 to-gold-950 border border-rose-700 text-center space-y-3">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Edition Goes to Press!</h2>
            <p className="text-xs text-slate-300 max-w-lg mx-auto">
              You successfully steered Bharat Broadcast Network through breaking news deadlines, balancing ethics, headline unit constraints, and multi-medium formats.
            </p>
            <div className="flex justify-center gap-6 pt-3">
              <div className="text-center">
                <span className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 4)}%</span>
                <span className="text-[10px] text-slate-400 block uppercase">Final Accuracy</span>
              </div>
              <div className="text-center">
                <span className="text-2xl font-black text-amber-400 capitalize">{masteryLevel}</span>
                <span className="text-[10px] text-slate-400 block uppercase">BKT Mastery Tier</span>
              </div>
            </div>
          </div>

          {/* Personalized Motivational Feedback */}
          <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-700/80 text-xs text-emerald-200 leading-relaxed">
            <strong>Editorial Assessment: </strong>
            {errors === 0
              ? 'PERFECT SCORE! You have mastered ISC Mass Media news values and program formats to board examination perfection.'
              : errors <= 3
              ? 'Outstanding performance! You showed sharp editorial instincts with minor slips in sub-editing conventions.'
              : 'Good foundation built! Review the misconception profile below and re-explore the radio and inverted pyramid labs before board revisions.'}
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-300">
                Your Editorial Misconception Diagnostic:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-bold">❌ Myth: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ Reality: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition (SM-2) Review Schedule */}
          <div className="p-5 rounded-2xl bg-gold-950/40 border border-gold-800 text-xs text-slate-300 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-300">
              Spaced Repetition Schedule (SM-2 Algorithm):
            </h3>
            <p>
              Your next memory consolidation review is scheduled in{' '}
              <strong className="text-amber-300 font-bold">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </strong>
              . Revisiting then will cement long-term retention for your ISC Class 11 final exams.
            </p>
          </div>

          {/* Real-World Activity Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>✍️</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                  <strong className="text-rose-400 font-bold">Step {idx + 1}:</strong> {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FLOATING FEEDBACK OVERLAYS ───────────────────────────────────── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Editorial Milestone Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_MassMediaNewsValuesTimelinessSim;