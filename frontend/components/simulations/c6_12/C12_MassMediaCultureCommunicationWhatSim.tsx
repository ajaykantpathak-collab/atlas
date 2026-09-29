'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (MANDATORY STRING LITERALS) ──────────────────────────────────
const NODE_C12_MASSMEDIA_001 = 'c12_massmedia_001';
const NODE_C12_MASSMEDIA_002 = 'c12_massmedia_002';
const NODE_C12_MASSMEDIA_003 = 'c12_massmedia_003';
const NODE_C12_MASSMEDIA_004 = 'c12_massmedia_004';
const NODE_C12_MASSMEDIA_005 = 'c12_massmedia_005';
const NODE_C12_MASSMEDIA_006 = 'c12_massmedia_006';
const NODE_C12_MASSMEDIA_007 = 'c12_massmedia_007';
const NODE_C12_MASSMEDIA_008 = 'c12_massmedia_008';
const NODE_C12_MASSMEDIA_009 = 'c12_massmedia_009';
const NODE_C12_MASSMEDIA_010 = 'c12_massmedia_010';

const ALL_NODE_IDS = [
  NODE_C12_MASSMEDIA_001,
  NODE_C12_MASSMEDIA_002,
  NODE_C12_MASSMEDIA_003,
  NODE_C12_MASSMEDIA_004,
  NODE_C12_MASSMEDIA_005,
  NODE_C12_MASSMEDIA_006,
  NODE_C12_MASSMEDIA_007,
  NODE_C12_MASSMEDIA_008,
  NODE_C12_MASSMEDIA_009,
  NODE_C12_MASSMEDIA_010,
];

// ─── NARRATIVE SCENARIO ───────────────────────────────────────────────────
const SCENARIO = {
  title: 'The National Media Conclave: Decoding Culture, Ethics & Cinema',
  intro: 'You are appointed Chief Media Analyst at the Indian Media Guild. A nationwide controversy has erupted over sensationalised reporting, biased political coverage, misleading ads during IPL, and a major historical film production in Hyderabad. You must audit the media ecosystem from cultural roots to camera angles.',
  context: 'Across print newsrooms, broadcast studios, advertising agencies, and film production floors, you will investigate how cultural codes are transmitted, enforce PCI & ASCI ethics, direct film scenes, and master visual camera grammar.',
};

// ─── DISCOVERY QUESTION ───────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question: 'When Doordarshan broadcast Ramanand Sagar’s Ramayan in 1987, Sunday morning streets across India were reported to be empty. Which statement best captures this media phenomenon?',
  options: [
    'Media acted merely as a one-way entertainment mirror without altering religious practice',
    'Media acted as a bidirectional cultural vehicle: standardising a pan-Indian visual vocabulary and creating a shared ritual calendar',
    'Media wiped out all regional Indian folk traditions entirely in a single year',
    'It was purely a commercial advertisement for state television with no cultural coding',
  ],
  correctIndex: 1,
  hintAfter: 'Media never just reflects — it actively selects, frames, and circulates culture so powerfully that it reshapes collective social reality!',
};

// ─── INTERFACES ───────────────────────────────────────────────────────────
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

// ─── DEFAULT PROPS ────────────────────────────────────────────────────────
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_MASSMEDIA_001,
  title: 'ISC Class 12 Mass Media & Communication Master Sim',
  definition: 'Culture is that complex whole acquired by humans as members of society. Mass media serves as its bidirectional vehicle, catalyst for social change, ethical pillar in journalism, engine in TV advertising, and visual storyteller through film production and camera angles.',
  eli5: 'Think of culture as our shared national memory and recipe book. Mass media is the mega-kitchen, broadcast tower, and film camera that cooks, broadcasts, and films our stories — shaping our thoughts, laws, and emotions.',
  misconceptions: [
    { misconception: 'Culture refers only to classical art, dance, and music', correction: 'Culture encompasses the complex whole of everyday habits, beliefs, language, greetings, food, and WhatsApp customs (Edward Tylor, 1871).' },
    { misconception: 'Mass media is just a passive mirror of society', correction: 'Media is bidirectional: it draws from culture, but also selects, frames, and cultivates new norms and social change.' },
    { misconception: 'Sensationalism and Fake News are the exact same issue', correction: 'Sensationalism distorts or exaggerates a real event; fake news invents a wholly fabricated event.' },
    { misconception: 'Paid news is just regular commercial advertising', correction: 'Advertising is openly declared and labelled; paid news is covert, undeclared propaganda disguised as editorial news.' },
    { misconception: 'Low camera angle means camera is close to the subject', correction: 'Camera angle refers to vertical elevation/orientation (below looking up = low angle), not distance/shot size (close-up).' },
    { misconception: 'Pre-production is just casual writing and matters less than shooting', correction: 'Pre-production locks the budget, storyboard, permissions, and casting; poor pre-production causes costly shooting disasters.' },
  ],
  diagnosticQuestions: [
    { question: 'Who defined culture as "that complex whole which includes knowledge, belief, art, morals..."?', options: ['George Gerbner', 'Edward B. Tylor', 'Stuart Hall', 'Satyajit Ray'], correctIndex: 1 },
    { question: 'What theory explains that heavy television viewers perceive the real world according to media portrayals?', options: ['Cultivation Theory', 'Agenda-Setting Theory', 'Uses and Gratifications', 'Framing Theory'], correctIndex: 0 },
    { question: 'Which landmark 2012 event catalysed the Criminal Law (Amendment) Act 2013 via intense TV coverage?', options: ['RTI Campaign', 'Nirbhaya Case Coverage', 'IPL Launch', 'Chipko Movement'], correctIndex: 1 },
    { question: 'Which quality of a journalist represents relentless curiosity to dig beneath the surface?', options: ['Language Skills', 'Inquisitiveness', 'Trustworthiness', 'Nose for News'], correctIndex: 1 },
    { question: 'What is paid promotional content designed to look like an independent editorial feature?', options: ['Sting Operation', 'Advertorial', 'Bumper Ad', 'Infomercial'], correctIndex: 1 },
    { question: 'What is the correct 5th stage in the 8-stage TV commercial production process?', options: ['Pre-production', 'Shooting', 'Post-production', 'Approval'], correctIndex: 1 },
    { question: 'Which camera angle tilts the horizon on its roll axis to evoke disorientation or tension?', options: ['High Angle', 'Dutch Angle', 'Eye Level', 'Oblique Angle'], correctIndex: 1 },
    { question: 'Which statutory body issues U, U/A, A, or S certificates for films before theatrical release in India?', options: ['ASCI', 'NBSA / NBDA', 'CBFC', 'Press Council of India'], correctIndex: 2 },
  ],
  masteryCriteria: 'Student understands cultural transmission, media ethics, TV ad pipelines, film stages, and visual camera grammar.',
};

// ─── EXPLORATION STEPS ────────────────────────────────────────────────────
const EXPLORATION_STEPS = [
  {
    title: '1. Cultural Encoding & Decoding',
    instruction: 'Click each cultural element to see how mass media encodes and transmits it across India.',
    interactionType: 'click-culture',
    nodeId: NODE_C12_MASSMEDIA_001,
  },
  {
    title: '2. Media as Social Catalyst',
    instruction: 'Adjust the public outrage slider to observe the media catalytic chain: Information → Persuasion → Mobilisation → Reform.',
    interactionType: 'catalyst-slider',
    nodeId: NODE_C12_MASSMEDIA_003,
  },
  {
    title: '3. The Ethics Audit Lab',
    instruction: 'Test newsroom decisions to separate legitimate journalism from Sensationalism, Fake News, Paid News, and Advertorials.',
    interactionType: 'ethics-audit',
    nodeId: NODE_C12_MASSMEDIA_005,
  },
  {
    title: '4. TV Ad Production Pipeline',
    instruction: 'Step through the 8 sequential stages of crafting a 30-second Indian television commercial.',
    interactionType: 'ad-pipeline',
    nodeId: NODE_C12_MASSMEDIA_007,
  },
  {
    title: '5. Interactive Director’s Camera Simulator',
    instruction: 'Manipulate camera elevation, tilt, and angle to see live psychological transformations of the subject.',
    interactionType: 'camera-sim',
    nodeId: NODE_C12_MASSMEDIA_010,
  },
];

// ─── PREDICTION & OBSERVATION QUESTIONS ───────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an investigative TV channel broadcasts an unverified WhatsApp rumour about child-lifters with red breaking banners, what primary violation occurs?',
    options: ['Sting Operation', 'Fake News with Sensationalism', 'Ethical Public Service', 'Cross Promotion'],
    correctIndex: 1,
    verifyInstruction: 'Adjust the newsroom sliders in the sandbox to observe how unverified claims spark public Panic instead of Justice.',
    nodeId: NODE_C12_MASSMEDIA_005,
  },
  {
    question: 'Predict: If a filmmaker switches from a High Angle to a Low Angle when framing a defeated protagonist who stands back up, what psychological effect is created?',
    options: ['The character appears weaker and smaller', 'The character shifts from vulnerable to dominant and empowered', 'The horizon becomes tilted creating moral confusion', 'The shot turns completely objective and neutral'],
    correctIndex: 1,
    verifyInstruction: 'Drag the Camera Angle slider from +45° (High) to -45° (Low) in the simulator to verify how stature magnifies.',
    nodeId: NODE_C12_MASSMEDIA_010,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to the psychological perception of power when the camera angle elevation drops below eye level (-30°)?',
    observableOptions: [
      'The subject looms taller, commanding dominance and authority',
      'The subject shrinks into vulnerability',
      'The scene loses all artistic depth',
      'The lighting turns monochrome',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_MASSMEDIA_010,
  },
  {
    question: 'What pattern emerges in the TV Advertising pipeline if the Planning & Scripting stages are cut short?',
    observableOptions: [
      'Shooting becomes cheaper and faster',
      'Budget overruns skyrocket and post-production requires emergency reshoots',
      'ASCI automatically grants instant pre-clearance',
      'The commercial becomes an infomercial',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_MASSMEDIA_007,
  },
];

// ─── 22 CHALLENGES (NEP 2020 COMPETENCY + ALL NODE COVERAGE) ──────────────
const CHALLENGES: Challenge[] = [
  // Foundation Tier (1-7)
  {
    id: 'ch_001_f_recall',
    nodeId: NODE_C12_MASSMEDIA_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to Edward Tylor’s 1871 definition, which of the following is true regarding culture?',
    options: [
      'Culture is biologically inherited through genetic DNA',
      'Culture is a complex whole acquired by humans as members of society',
      'Culture refers solely to classical dance and Sanskrit scriptures',
      'Culture is created exclusively by modern television networks',
    ],
    correctIndex: 1,
    explanation: 'Edward Tylor defined culture as that complex whole including knowledge, beliefs, art, morals, law, customs acquired socially.',
    hints: [
      'Remember Tylor’s 1871 work "Primitive Culture".',
      'Culture is learned and social, not genetic.',
      'It is a complex whole acquired as a member of society.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_002_f_drag_label',
    nodeId: NODE_C12_MASSMEDIA_010,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each camera angle to its correct visual & narrative function box.',
    dragItems: [
      { label: 'Low Angle', targetId: 'box_power' },
      { label: 'High Angle', targetId: 'box_weakness' },
      { label: 'Eye Level', targetId: 'box_neutral' },
      { label: 'Dutch Angle', targetId: 'box_unease' },
    ],
    correctMapping: {
      box_power: 'Low Angle',
      box_weakness: 'High Angle',
      box_neutral: 'Eye Level',
      box_unease: 'Dutch Angle',
    },
    explanation: 'Low angles elevate power, high angles portray vulnerability, eye-level maintains neutrality, and Dutch tilts express psychological unease.',
    hints: [
      'Which angle looks UP at the hero?',
      'Looking DOWN on someone makes them look small.',
      'A tilted horizon creates disorienting unease.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_003_f_sort_film',
    nodeId: NODE_C12_MASSMEDIA_009,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the fundamental stages of film production in correct chronological order.',
    sortItems: [
      'Pre-shooting (Screenplay, Storyboard, Casting, Location Scouting)',
      'Shooting (Principal Photography, Directing Actors, Sync Sound)',
      'Post-shooting (Editing, Sound Design, VFX, Colour Grading, CBFC)',
    ],
    correctOrder: [0, 1, 2],
    explanation: 'Filmmaking proceeds strictly from Pre-shooting (planning) to Shooting (production) and Post-shooting (finishing & certification).',
    hints: [
      'Planning and writing must occur before cameras roll.',
      'Principal photography happens in the middle.',
      'Editing and CBFC certification happen last.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_004_f_classify_ethics',
    nodeId: NODE_C12_MASSMEDIA_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which journalistic violation involves lifting another reporter’s article or images without attribution?',
    options: ['Partisan Reporting', 'Plagiarism', 'Sensationalism', 'Advertorial'],
    correctIndex: 1,
    explanation: 'Plagiarism is the unattributed copying of text, footage, data, or ideas, breaching copyright and journalistic ethics.',
    hints: [
      'It violates the core principle of attribution.',
      'It is forbidden under the Copyright Act, 1957.',
      'It means claiming another’s creative work as your own.',
    ],
  },
  {
    id: 'ch_005_f_sort_ad',
    nodeId: NODE_C12_MASSMEDIA_007,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Place the first 4 stages of the 8-stage TV commercial production process in sequence.',
    sortItems: [
      '1. Planning Phase (Objective & Media Plan)',
      '2. Scripting & Storyboarding',
      '3. Casting (Actors & Brand Ambassadors)',
      '4. Pre-production (Location & Lighting Plans)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Planning establishes the brief; Scripting creates the storyboard; Casting chooses talent; Pre-production arranges logistics.',
    hints: [
      'Start with strategic planning and objectives.',
      'Copywriting and storyboard come before picking actors.',
      'Talent is cast before final set logistics and shooting.',
    ],
  },
  {
    id: 'ch_006_f_classify_types',
    nodeId: NODE_C12_MASSMEDIA_008,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A 5-second short identification spot appearing just before a news bulletin is classified as which TV ad type?',
    options: ['Infomercial', 'Bumper Ad', 'Covert Advertising', 'Cross Promotion'],
    correctIndex: 1,
    explanation: 'Bumper ads are brief (around 5 seconds) branding spots positioned adjacent to programming breaks.',
    hints: [
      'Think of ultra-short 5-second channel idents.',
      'It is not a 30-minute demonstration.',
      'It bumps right against the show transition.',
    ],
  },
  {
    id: 'ch_007_f_qualities',
    nodeId: NODE_C12_MASSMEDIA_004,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When a reporter notices a minor municipal budget line about drainage and uncovers a ₹50-crore graft scam, they demonstrate:',
    options: ['Language Skills only', 'Nose for News & Inquisitiveness', 'Partisan Reporting', 'Surrogate Advertising'],
    correctIndex: 1,
    explanation: 'Nose for news senses significance in ordinary items; Inquisitiveness drives relentless follow-up questioning.',
    hints: [
      'What instinct smells a story where others see routine files?',
      'It is paired with curiosity to ask "why".',
      'It defines journalistic news sense.',
    ],
  },

  // Standard Tier (8-15)
  {
    id: 'ch_008_s_app_stereotyping',
    nodeId: NODE_C12_MASSMEDIA_002,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A 2023 TV advertisement shows women only in detergent cleaning roles while men make stock investments. According to Gerbner’s Cultivation Theory, what is the long-term impact on heavy viewers?',
    options: [
      'Viewers reject television entirely and switch to print newspapers',
      'Viewers cultivate a worldview where gender roles are naturally and rigidly segregated',
      'The advertisement immediately triggers a nationwide legislative ban within 24 hours',
      'Viewers perceive women as primary corporate executives in banking',
    ],
    correctIndex: 1,
    explanation: 'Cultivation theory proves that heavy media consumption leads audiences to internalise mediated recurring stereotypes as objective reality.',
    hints: [
      'Think of George Gerbner’s theory of repeated exposure.',
      'Heavy viewers begin to see the media world as the real world.',
      'It normalises unequal domestic divisions of labour.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_009_s_analysis_catalyst',
    nodeId: NODE_C12_MASSMEDIA_003,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In the 2012 Nirbhaya case, how did mass media function as a catalyst for social change?',
    options: [
      'Media caused the crime itself through entertainment films',
      'Media lowered the activation energy: converting private grief into public mobilisation that culminated in the Criminal Law (Amendment) Act 2013',
      'Media remained completely neutral and did not broadcast any protest news',
      'Media acted solely as an advertorial platform for legal firms',
    ],
    correctIndex: 1,
    explanation: 'Media acted as a catalyst by informing the public, framing systemic safety issues, sustaining national attention, and accelerating legislative reform.',
    hints: [
      'Think of the chemical definition of a catalyst: lowering activation energy.',
      'The chain: Information → Persuasion → Mobilisation → Policy.',
      'It resulted in the Justice Verma Committee and the 2013 Act.',
    ],
  },
  {
    id: 'ch_010_s_numeric_cpm',
    nodeId: NODE_C12_MASSMEDIA_008,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An IPL final 30-second ad costs ₹20,00,000 (₹20 lakh) and reaches 5,00,00,000 (50 million / 5 crore) live viewers. What is the cost per viewer in Paise? (1 Rupee = 100 Paise)',
    correctAnswer: 4,
    tolerance: 0.5,
    unit: 'Paise',
    explanation: '₹20,00,000 / 5,00,00,000 viewers = ₹0.04 per viewer = 4 Paise. This proves TV advertising enables affordable mass information distribution.',
    hints: [
      'Divide total cost by total viewers: 20,00,000 / 50,00,0000 = 0.04 Rupees.',
      'Convert 0.04 Rupees into Paise by multiplying by 100.',
      '0.04 × 100 = 4 Paise.',
    ],
  },
  {
    id: 'ch_011_s_distinguish_sting',
    nodeId: NODE_C12_MASSMEDIA_006,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Distinguish an ethical public-interest sting operation (e.g., Cobrapost Operation 136) from an unethical entrapment sting.',
    options: [
      'An ethical sting relies on prior reasonable suspicion and public interest; an unethical sting entraps an innocent person into creating crime for TRPs',
      'An ethical sting is always sponsored by an FMCG brand; an unethical sting is conducted by the Press Council',
      'There is no difference; all hidden cameras are illegal under Article 19(1)(a)',
      'An ethical sting blurs all politicians’ faces; an unethical sting shows only public officials',
    ],
    correctIndex: 0,
    explanation: 'The Supreme Court and PCI mandate that stings must be a last resort, backed by prior suspicion without inducement (entrapment) or gratuitous invasion of privacy.',
    hints: [
      'Recall R. Rajagopal v. State of Tamil Nadu on privacy.',
      'Did the reporter induce the crime, or uncover an ongoing one?',
      'Ethical stings serve overriding public interest.',
    ],
  },
  {
    id: 'ch_012_s_app_camera_sholay',
    nodeId: NODE_C12_MASSMEDIA_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In Ramesh Sippy’s Sholay (1975), why is Gabbar Singh framed from a Low Angle as he walks across the boulders of Ramanagara?',
    options: [
      'To make him appear weak and pitied by Thakur',
      'To visually communicate menacing dominance and mythic villainous power to the audience',
      'Because camera tripods could not stand on rocks at any other level',
      'To create a comedic Dutch tilt effect',
    ],
    correctIndex: 1,
    explanation: 'Shooting up from a low angle magnifies Gabbar Singh’s stature, establishing terror and dominance before lines are spoken.',
    hints: [
      'What psychological emotion does looking UP at a villain evoke?',
      'It magnifies physical scale and authority.',
      'Think of Gabbar towering on the boulder.',
    ],
  },
  {
    id: 'ch_013_s_construct_policy',
    nodeId: NODE_C12_MASSMEDIA_004,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Assemble a 4-pillar newsroom code by clicking the required principles in order of verification workflow.',
    availableParts: ['Verify with 2 Independent Sources', 'Refuse Unlabelled Paid Content', 'Provide Right of Reply', 'Protect Vulnerable Identity'],
    targetState: 'Verify with 2 Independent Sources Refuse Unlabelled Paid Content Provide Right of Reply Protect Vulnerable Identity',
    validationHint: 'Select all 4 ethical practices to construct the verified newsroom standard.',
    explanation: 'A rigorous newsroom verifies facts, rejects covert paid news, provides fair right of reply, and treats vulnerable subjects with empathy.',
    hints: [
      'First: fact-checking verification.',
      'Second: commercial integrity (no paid news).',
      'Third: fairness & right of reply.',
    ],
  },
  {
    id: 'ch_014_s_analysis_advertorial',
    nodeId: NODE_C12_MASSMEDIA_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'The Times Group’s "Medianet" initiative (2003) pioneered advertorials in India. Why did this create an ethical controversy?',
    options: [
      'It made print newspapers completely free of cost for all citizens',
      'It blurred the boundary between paid promotion and independent journalism, leading readers to mistake paid PR for objective news',
      'It violated Doordarshan’s exclusive broadcast spectrum rights',
      'It banned all cinema reviews from being published',
    ],
    correctIndex: 1,
    explanation: 'Advertorials deceive readers when commercial promotions mimic news layouts without prominent "Advertisement" disclosures.',
    hints: [
      'Advertorial = Advertisement + Editorial.',
      'Readers trust editorial news more than blatant ads.',
      'When the boundary is blurred, deception occurs.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_015_s_covert_vs_sponsorship',
    nodeId: NODE_C12_MASSMEDIA_008,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How does Covert Advertising (Product Placement) differ from Program Sponsorship on Indian television?',
    options: [
      'Covert embeds the brand seamlessly inside the narrative without explicit ad breaks; Sponsorship is openly credited on-screen',
      'Covert ads are 30-minute infomercials; Sponsorship is a 5-second bumper ad',
      'Sponsorship is illegal under the Cable TV Act; Covert ads are fully certified by CBFC',
      'Covert ads only appear on radio; Sponsorship only exists on streaming apps',
    ],
    correctIndex: 0,
    explanation: 'Covert advertising (e.g., Tata Nano in a serial) embeds products inside story scenes, whereas Sponsorship openly declares "Brought to you by Brand".',
    hints: [
      'Sponsorship is openly credited on air.',
      'Covert advertising hides the product inside the drama scene.',
      'Think of Ray-Ban sunglasses worn in a film.',
    ],
  },

  // Advanced Tier (16-22)
  {
    id: 'ch_016_a_eval_cbfc',
    nodeId: NODE_C12_MASSMEDIA_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the role of the CBFC in post-shooting: A filmmaker challenges a CBFC demand to cut 15 scenes depicting social conflict in an "A"-certified film. What is the constitutional and regulatory balance?',
    options: [
      'CBFC has unlimited absolute power to ban any film without judicial review',
      'CBFC certifies films under the Cinematograph Act 1952 subject to reasonable restrictions under Article 19(2); arbitrary censorship can be challenged in High Courts',
      'CBFC only regulates television advertisements, not feature films',
      'Filmmakers can bypass CBFC completely by exhibiting in multiplexes',
    ],
    correctIndex: 1,
    explanation: 'CBFC operates under the Cinematograph Act 1952 balancing artistic expression (Article 19(1)(a)) against reasonable restrictions under Article 19(2).',
    hints: [
      'Recall the constitutional basis: Article 19(1)(a) vs 19(2).',
      'CBFC issues U, U/A, A, S certificates.',
      'High Courts and Supreme Court review arbitrary cuts.',
    ],
  },
  {
    id: 'ch_017_a_app_dutch_andhadhun',
    nodeId: NODE_C12_MASSMEDIA_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In Sriram Raghavan’s thriller Andhadhun (2018), why are Dutch Angles (canted tilts) used when the protagonist encounters the crime scene?',
    options: [
      'To celebrate romantic victory',
      'To visually externalise psychological disorientation, deceit, and the collapse of moral equilibrium',
      'To ensure all room furniture fits into the widescreen aspect ratio',
      'To mimic eye-level news documentary realism',
    ],
    correctIndex: 1,
    explanation: 'A Dutch tilt skews the horizon to signal that the world of the story is unhinged, unstable, and psychologically distorted.',
    hints: [
      'Dutch angle = tilted roll axis.',
      'It visualises internal psychological tension and chaos.',
      'It tells the viewer: "Something is wrong here".',
    ],
  },
  {
    id: 'ch_018_a_analysis_misinfo',
    nodeId: NODE_C12_MASSMEDIA_005,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Analyze the 2020 Palghar mob tragedy caused by viral WhatsApp messages. What regulatory framework specifically addresses digital intermediary liability and misinformation takedowns in India?',
    options: [
      'The Press Council Act 1978',
      'Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 under IT Act 2000',
      'Cinematograph Act 1952',
      'ASCI Code 1985',
    ],
    correctIndex: 1,
    explanation: 'The IT Rules 2021 govern digital intermediaries, requiring takedown of fake news and unlawful incitement threatening public order.',
    hints: [
      'WhatsApp is a digital intermediary, not a print newspaper.',
      'It is governed under the IT Act 2000.',
      'Look for the 2021 Digital Media Ethics Code Rules.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_019_a_eval_empathy_objectivity',
    nodeId: NODE_C12_MASSMEDIA_004,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the claim: "Empathy compromises journalistic objectivity during conflict reporting (e.g., Manipur 2023)." Which conclusion is most rigorous?',
    options: [
      'True — journalists should have zero emotion and ignore human suffering entirely',
      'False — universal empathy applied symmetrically to all affected communities deepens fairness and dignity without sacrificing factual verification',
      'True — empathy is exclusively reserved for corporate PR press releases',
      'False — empathy means the reporter must pick one side and join their armed protest',
    ],
    correctIndex: 1,
    explanation: 'Symmetrical empathy respects human dignity on all sides while disciplined verification preserves objectivity.',
    hints: [
      'Is empathy the opposite of facts, or does it humanise reporting?',
      'Selective empathy creates bias; universal empathy creates balanced truth.',
      'A good journalist listens to all affected voices.',
    ],
  },
  {
    id: 'ch_020_a_drag_pipeline',
    nodeId: NODE_C12_MASSMEDIA_007,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Match the TV advertising risk/activity to the exact production stage where it must be resolved.',
    dragItems: [
      { label: 'ASCI Surrogate Scrutiny', targetId: 'stage_approval' },
      { label: 'Storyboard & Single-Minded Proposition', targetId: 'stage_script' },
      { label: 'VFX & Colour Grading', targetId: 'stage_post' },
      { label: 'ASI Heritage Location Permissions', targetId: 'stage_pre' },
    ],
    correctMapping: {
      stage_approval: 'ASCI Surrogate Scrutiny',
      stage_script: 'Storyboard & Single-Minded Proposition',
      stage_post: 'VFX & Colour Grading',
      stage_pre: 'ASI Heritage Location Permissions',
    },
    explanation: 'Scripting creates the storyboard; Pre-production secures permits; Post-production handles VFX; Approval secures ASCI clearance.',
    hints: [
      'ASCI checks happen at the sign-off / Approval gate.',
      'Permits are arranged in Pre-production before filming.',
      'VFX belongs to Post-production.',
    ],
  },
  {
    id: 'ch_021_a_eval_bidirectional',
    nodeId: NODE_C12_MASSMEDIA_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the bidirectional relationship between culture and media using Satyajit Ray’s Pather Panchali (1955) vs Doordarshan’s Ramayan (1987).',
    options: [
      'Pather Panchali illustrates culture shaping media (Bengali rural aesthetic); Ramayan illustrates media shaping culture (standardising national devotional imagery)',
      'Both examples prove that Indian media was completely copied from Western Hollywood formats',
      'Ramayan created the Bengali language, while Pather Panchali created television broadcasting',
      'Neither film has any cultural context; both were purely commercial software experiments',
    ],
    correctIndex: 0,
    explanation: 'Pather Panchali drew from authentic Bengali rural roots to create cinema, while Ramayan broadcast a visual epic that pan-Indianised devotional culture.',
    hints: [
      'Direction 1: Culture supplies raw material to media (Pather Panchali).',
      'Direction 2: Media circulates and re-shapes cultural common sense (Ramayan).',
      'Together they prove the two-way bidirectional loop.',
    ],
  },
  {
    id: 'ch_022_a_creativity_psa',
    nodeId: NODE_C12_MASSMEDIA_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You are designing a high-impact Public Service TV Campaign to counter online hate speech. What is the optimal strategic design?',
    options: [
      'A 30-minute unedited text crawl of legal statutes during midnight hours',
      'An emotional narrative showing real families harmed, using eye-level shots for empathy, ending with a clear Call to Action (Cyber Helpline & QR Code) on prime-time channels',
      'An unlabelled covert product placement in an action video game',
      'A 5-second bumper ad showing only a corporate sponsor logo',
    ],
    correctIndex: 1,
    explanation: 'Effective PSAs combine emotional narrative, empathetic eye-level framing, high-reach placement, and an actionable Call to Action.',
    hints: [
      'Think of how Swachh Bharat or Beti Bachao campaigns succeeded.',
      'Combine emotional storytelling with clear Call to Action.',
      'Eye-level shots create authentic identification.',
    ],
  },
];

// ─── REAL WORLD ACTIVITY ──────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'Media Ombudsman & Film Director Simulation',
  description: 'Apply your media literacy to audit an Indian prime-time news debate, an IPL surrogate advertisement, and plan a 4-shot film sequence for a social documentary.',
  steps: [
    'Audit a 1-hour prime-time news debate: Log instances of Sensationalism, Framing Bias, and Lack of Right to Reply.',
    'Examine an IPL TV commercial: Identify whether it uses Covert Placement, Sponsorship, or Surrogate promotion for restricted products.',
    'Design a 4-shot storyboard: Specify camera angles (Eye level, Low, High, Dutch) to visually narrate a social-change story in your city.',
    'Submit your audit checklist to the Press Council / ASCI simulation review board.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ────────────────────────────────────────────
function C12_MassMediaCultureCommunicationWhatSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['massmedia'] || { name: 'Mass Media & Communication', emoji: '🎥', color: 'indigo' };

  // Phase State: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Exploration Interactive States
  const [selectedCultureItem, setSelectedCultureItem] = useState<string | null>(null);
  const [catalystOutrageLevel, setCatalystOutrageLevel] = useState(30);
  const [newsEthicsType, setNewsEthicsType] = useState<'sensationalism' | 'fake_news' | 'paid_news' | 'advertorial'>('sensationalism');
  const [currentPipelineStage, setCurrentPipelineStage] = useState(0);
  const [cameraElevationAngle, setCameraElevationAngle] = useState(0); // -45 (low) to +45 (high)
  const [cameraRollTilt, setCameraRollTilt] = useState(0); // -30 to +30 (Dutch)
  const [cameraSubjectDistance, setCameraSubjectDistance] = useState(50); // 10 to 100

  // Predict-then-check states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Adaptive Difficulty & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const bktStateRef = useRef(createBKTState());

  // Challenge Response States
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag & Drop / Numeric / Construct States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Feedback States
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Canvas Refs
  const cameraCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const flowCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── FILTERED CHALLENGES ──────────────────────────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT MASTERY LOAD ────────────────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT UPDATE EFFECT ─────────────────────────────────────────────────
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const currentM = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(currentM);
    const newTier = currentM === 'not-started' || currentM === 'beginner' ? 'foundation'
      : currentM === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newTier) {
        setCurrentChallenge(0);
        return newTier;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS: CAMERA ANGLE SIMULATOR ────────────────────────────────────
  useEffect(() => {
    const canvas = cameraCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Background Grid / Horizon
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((cameraRollTilt * Math.PI) / 180);

      // Horizon line
      const horizonY = (cameraElevationAngle / 45) * 60;
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-cx * 2, horizonY);
      ctx.lineTo(cx * 2, horizonY);
      ctx.stroke();

      // Floor perspective lines
      ctx.strokeStyle = '#1e293b';
      for (let i = -4; i <= 4; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 60, horizonY);
        ctx.lineTo(i * 180, canvas.height);
        ctx.stroke();
      }

      // Draw Subject Figure (Actor / Protagonist)
      const scaleFactor = 1 + (cameraSubjectDistance / 100) * 0.5 - (cameraElevationAngle / 90) * 0.4;
      const figureY = 40 + (cameraElevationAngle / 45) * 30;

      // Aura / Stature Glow depending on low/high angle
      const glowColor = cameraElevationAngle < -15 ? 'rgba(234, 179, 8, 0.25)' : cameraElevationAngle > 15 ? 'rgba(59, 130, 246, 0.15)' : 'rgba(148, 163, 184, 0.1)';
      ctx.fillStyle = glowColor;
      ctx.beginPath();
      ctx.arc(0, figureY - 60 * scaleFactor, 80 * scaleFactor, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.fillStyle = cameraElevationAngle < -20 ? '#fbbf24' : '#e2e8f0';
      ctx.beginPath();
      ctx.arc(0, figureY - 110 * scaleFactor, 18 * scaleFactor, 0, Math.PI * 2);
      ctx.fill();

      // Torso
      ctx.fillStyle = cameraElevationAngle < -20 ? '#d97706' : '#64748b';
      ctx.beginPath();
      ctx.roundRect(-22 * scaleFactor, figureY - 90 * scaleFactor, 44 * scaleFactor, 65 * scaleFactor, 8);
      ctx.fill();

      // Limbs
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 6 * scaleFactor;
      ctx.beginPath();
      // Legs
      ctx.moveTo(-12 * scaleFactor, figureY - 25 * scaleFactor);
      ctx.lineTo(-15 * scaleFactor, figureY + 35 * scaleFactor);
      ctx.moveTo(12 * scaleFactor, figureY - 25 * scaleFactor);
      ctx.lineTo(15 * scaleFactor, figureY + 35 * scaleFactor);
      // Arms
      ctx.moveTo(-22 * scaleFactor, figureY - 80 * scaleFactor);
      ctx.lineTo(-38 * scaleFactor, figureY - 30 * scaleFactor);
      ctx.moveTo(22 * scaleFactor, figureY - 80 * scaleFactor);
      ctx.lineTo(38 * scaleFactor, figureY - 30 * scaleFactor);
      ctx.stroke();

      ctx.restore();

      // Cinematic Overlays: Viewfinder Crosshairs
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(35, 35, 5 + Math.sin(tick * 0.08) * 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px monospace';
      ctx.fillText('REC [4K 24FPS]', 48, 38);

      // Angle Data Display
      let angleName = 'EYE LEVEL (Objective & Neutral)';
      if (cameraElevationAngle < -20) angleName = 'LOW ANGLE (Dominant, Powerful, Heroic)';
      else if (cameraElevationAngle > 20) angleName = 'HIGH ANGLE (Small, Vulnerable, Defeated)';
      if (Math.abs(cameraRollTilt) > 15) angleName += ' + DUTCH TILT (Unease / Tension)';

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`CAM ANGLE: ${angleName}`, 25, canvas.height - 25);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [cameraElevationAngle, cameraRollTilt, cameraSubjectDistance]);

  // ─── CANVAS: FLOW SIMULATOR (NEWSROOM & AD IMPACT) ────────────────────────
  useEffect(() => {
    const canvas = flowCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const renderFlow = () => {
      t += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw catalytic wave
      const w = canvas.width;
      const h = canvas.height;
      const waveAmp = (catalystOutrageLevel / 100) * 35;

      ctx.strokeStyle = catalystOutrageLevel > 60 ? '#f43f5e' : '#6366f1';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let x = 0; x < w; x += 5) {
        const y = h / 2 + Math.sin(x * 0.02 + t) * waveAmp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw particle pulses
      for (let i = 0; i < 6; i++) {
        const px = ((t * 80 + i * 80) % w);
        const py = h / 2 + Math.sin(px * 0.02 + t) * waveAmp;
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '10px sans-serif';
      ctx.fillText(`Catalytic Momentum: ${catalystOutrageLevel}% -> ${catalystOutrageLevel > 70 ? 'Legislative Reform' : catalystOutrageLevel > 40 ? 'Public Mobilisation' : 'Information Spread'}`, 10, 18);

      animId = requestAnimationFrame(renderFlow);
    };

    renderFlow();
    return () => cancelAnimationFrame(animId);
  }, [catalystOutrageLevel]);

  // ─── USECALLBACK HANDLERS ───────────────────────────────────────────────
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCor = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCor);
    setDiscoveryAnswered(true);
    audioManager.play(isCor ? 'success' : 'pop');
    speechManager.speak(isCor ? 'Brilliant insight! Culture and media nourish each other.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration. Step through the media engine.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Experiment with cameras, ads, and newsroom ethics with zero pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge Phase unlocked. Let us test your media mastery.');
  }, []);

  const handleCultureClick = useCallback((item: string) => {
    setSelectedCultureItem(item);
    audioManager.play('tap');
    const speechMap: Record<string, string> = {
      ramayan: 'Doordarshan Ramayan standardised visual epic culture across Indian households.',
      ray: 'Satyajit Ray’s Pather Panchali carried authentic Bengali rural aesthetics to global cinema.',
      festivals: 'Folk traditions like Bihu, Theyyam, and Bhangra are continuously broadcast and preserved.',
      ad_codes: 'Commercials encode shared cultural symbols like family bonds and festive celebration.',
    };
    if (speechMap[item]) speechManager.speak(speechMap[item]);
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the simulator below to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCor = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCor ? 'success' : 'pop');
    speechManager.speak(isCor ? 'Sharp observation! Visual framing dictates power.' : 'Look closely at the angle elevation.');
  }, []);

  const showNextHint = useCallback(() => {
    const nextH = hintCount + 1;
    if (nextH <= 3 && activeChallenge.hints[nextH - 1]) {
      setCurrentHint(activeChallenge.hints[nextH - 1]);
      setShowHint(true);
      setHintCount(nextH);
      audioManager.play('hint');
      speechManager.speak(activeChallenge.hints[nextH - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us review the complete step-by-step rationale.');
    }
  }, [hintCount, activeChallenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work! You have completed the National Media Conclave audit.');
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

  const handleAnswer = useCallback((ans: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = ans === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const num = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
      isCorrect = Math.abs(num - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = (ans as string).trim() === (activeChallenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Spot on! Excellent media analysis.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  const handleDragStart = useCallback((lbl: string) => {
    setDraggedItem(lbl);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCor = activeChallenge.correctMapping?.[targetId] === draggedItem;
    if (isCor) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, activeChallenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = prev.length === 0 && activeChallenge.sortItems ? activeChallenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  const handleSortSubmit = useCallback(() => {
    const ans = sortArrangement.length > 0 ? sortArrangement : (activeChallenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(ans);
  }, [sortArrangement, activeChallenge, handleAnswer]);

  const handleConstructToggle = useCallback((part: string) => {
    audioManager.play('tap');
    setConstructParts(prev => prev.includes(part) ? prev.filter(p => p !== part) : [...prev, part]);
  }, []);

  // ─── PIPELINE STAGE DATA ────────────────────────────────────────────────
  const AD_STAGES = useMemo(() => [
    { title: '1. Planning Phase', desc: 'Strategy, Target Audience (e.g. IPL co-viewers), Single-Minded Proposition & Media Plan' },
    { title: '2. Scripting', desc: 'Copywriter drafts storyline, voiceover, and visual Storyboard sequence' },
    { title: '3. Casting', desc: 'Auditioning actors, models, voiceover artists, and brand ambassadors (e.g., Deepika, SRK)' },
    { title: '4. Pre-production', desc: 'Location scouting, set construction, lighting diagrams, municipal & ASI permits' },
    { title: '5. Shooting', desc: 'Principal photography on set/location directed by commercial director and cinematographer' },
    { title: '6. Post-production', desc: 'Video editing, colour grading, music score, jingles, dubbing, VFX, and audio mixing' },
    { title: '7. Approval', desc: 'Client sign-off, consumer focus group testing, ASCI compliance & MIB surrogate checks' },
    { title: '8. Delivery', desc: 'High-definition digital master delivery adhering to broadcaster technical specs' },
  ], []);

  // ─── RENDER ─────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 pb-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-gold-600/30 border border-gold-500/40 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-gold-400 font-medium">
              ISC Class 12 Mass Media &middot; Culture, Ethics, TV Advertising &amp; Cinema Grammar
            </p>
          </div>
        </div>

        {/* Phase Indicator Badges */}
        <div className="flex items-center gap-2">
          <motion.span
            key={phase}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-800 border border-slate-700 text-slate-300"
          >
            Phase: <span className="text-gold-400">{phase}</span>
          </motion.span>
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-400'
                  : difficulty === 'advanced'
                  ? 'bg-rose-950/80 border border-rose-500 text-rose-400'
                  : 'bg-amber-950/80 border border-amber-500 text-amber-400'
              }`}
            >
              {difficulty}
            </motion.span>
          )}
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY (CURIOSITY HOOK) ─── */}
      {phase === 'discovery' && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 sm:p-6 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/60 shadow-lg">
            <div className="flex items-center gap-2 text-gold-400 text-xs font-black uppercase tracking-widest mb-2">
              <span>🏛️ Narrative Hook</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-300/80 mt-3 font-medium bg-gold-900/40 p-3 rounded-xl border border-gold-700/40">
              📌 {SCENARIO.context}
            </p>
          </div>

          <div className="p-5 sm:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-bold">
                Discovery Challenge
              </span>
              <span className="text-xs text-slate-400">Test your instinct before we explore</span>
            </div>
            <p className="text-base sm:text-lg text-white font-semibold">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Discovery option ${i + 1}: ${opt}`}
                  className="w-full text-left p-4 rounded-xl text-sm sm:text-base font-medium transition-all bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200"
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-slate-700 text-center leading-6 text-xs font-bold mr-3 text-gold-300">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-gold-950/70 border border-gold-700/70 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="text-sm">
                  <p className={discoveryCorrect ? 'text-emerald-300 font-bold' : 'text-amber-300 font-bold'}>
                    {discoveryCorrect ? '✓ Spot on insight!' : '🔍 Fascinating discovery point:'}
                  </p>
                  <p className="text-slate-300 text-xs mt-1">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-white text-sm font-bold rounded-xl shadow-lg shrink-0"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 2: EXPLORE (BRILLIANT-STYLE INTERACTIVE STEPS) ─── */}
      {phase === 'explore' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Navigation Tabs */}
          <div className="flex items-center justify-between bg-slate-900 p-2 rounded-2xl border border-slate-800 overflow-x-auto">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  currentSlide === idx
                    ? 'bg-gold-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {step.title}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 sm:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
            >
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-lg sm:text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-xs sm:text-sm text-amber-400 mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* SLIDE 0: Culture & Encoding (SVG Diagram #1) */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* SVG DIAGRAM 1: Cultural Matrix */}
                    <svg viewBox="0 0 440 260" className="w-full bg-slate-950 rounded-xl border border-slate-800" aria-label="Culture and Mass Media Bidirectional Matrix">
                      <rect width="440" height="260" fill="#030712" />
                      {/* Bidirectional Loop Arc */}
                      <path d="M 120 70 A 130 130 0 0 1 320 70" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="5 5" />
                      <path d="M 320 190 A 130 130 0 0 1 120 190" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="5 5" />
                      <text x="220" y="45" textAnchor="middle" fill="#818cf8" fontSize="8" fontWeight="bold">Culture Shapes Media Content →</text>
                      <text x="220" y="222" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="bold">← Media Shapes Cultural Common Sense</text>

                      {/* Central Culture Core */}
                      <circle cx="220" cy="130" r="48" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2.5" />
                      <text x="220" y="126" textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="bold">INDIAN</text>
                      <text x="220" y="140" textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="bold">CULTURE</text>
                      <text x="220" y="152" textAnchor="middle" fill="#818cf8" fontSize="8">(Tylor: Complex Whole)</text>

                      {/* Nodes */}
                      {[
                        { id: 'ramayan', label: 'Doordarshan 1987', sub: 'Pan-Indian Myth', x: 80, y: 70, col: '#f59e0b' },
                        { id: 'ray', label: 'Pather Panchali', sub: 'Bengali Aesthetic', x: 360, y: 70, col: '#10b981' },
                        { id: 'festivals', label: 'Folk Traditions', sub: 'Bihu / Theyyam', x: 80, y: 190, col: '#ec4899' },
                        { id: 'ad_codes', label: 'Advertising Codes', sub: 'Festive Bonds', x: 360, y: 190, col: '#38bdf8' },
                      ].map(n => (
                        <g
                          key={n.id}
                          onClick={() => handleCultureClick(n.id)}
                          className="cursor-pointer transition-transform hover:scale-105"
                        >
                          <line x1="220" y1="130" x2={n.x} y2={n.y} stroke="#475569" strokeDasharray="4 4" strokeWidth="1.5" />
                          <circle
                            cx={n.x}
                            cy={n.y}
                            r="34"
                            fill={selectedCultureItem === n.id ? n.col : '#1e293b'}
                            stroke={n.col}
                            strokeWidth="2"
                            opacity={selectedCultureItem === n.id ? 1 : 0.8}
                          />
                          <text x={n.x} y={n.y - 4} textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="bold">{n.label}</text>
                          <text x={n.x} y={n.y + 8} textAnchor="middle" fill="#cbd5e1" fontSize="7">{n.sub}</text>
                        </g>
                      ))}
                    </svg>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-center">
                      <h4 className="text-xs uppercase font-black tracking-widest text-gold-400 mb-2">Cultural Transmission Analyzer</h4>
                      {selectedCultureItem ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                          <p className="text-sm font-bold text-amber-300">
                            {selectedCultureItem === 'ramayan' && '📺 Ramanand Sagar’s Ramayan (1987-88)'}
                            {selectedCultureItem === 'ray' && '🎬 Satyajit Ray’s Pather Panchali (1955)'}
                            {selectedCultureItem === 'festivals' && '🪘 Intangible Regional Heritage'}
                            {selectedCultureItem === 'ad_codes' && '✨ Shared Commercial Semiotics'}
                          </p>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {selectedCultureItem === 'ramayan' && 'Media shaped culture by creating Sunday viewing rituals and standardising devotional iconography.'}
                            {selectedCultureItem === 'ray' && 'Culture shaped media: Bengal rural poverty and joint families provided the raw artistic soul that won Cannes.'}
                            {selectedCultureItem === 'festivals' && 'Broadcast media archives and revitalises endangered folk songs, preventing urban erasure.'}
                            {selectedCultureItem === 'ad_codes' && 'Advertisements encode cultural unity (e.g. Cadbury, Tanishq) which must be decoded empathetically.'}
                          </p>
                          <span className="inline-block px-2.5 py-1 rounded bg-gold-950 text-gold-300 text-[10px] font-bold border border-gold-800">
                            Bidirectional Flow Verified ✓
                          </span>
                        </motion.div>
                      ) : (
                        <p className="text-xs text-slate-500 italic">Click any node on the left diagram to decode its media-culture relationship.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 1: Social Catalyst Lab (SVG Diagram #2: Catalyst Activation) */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-slate-300">Public Attention &amp; Outrage</label>
                        <span className="text-xs font-black text-rose-400">{catalystOutrageLevel}%</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={catalystOutrageLevel}
                        onChange={(e) => {
                          setCatalystOutrageLevel(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Set Public Attention and Outrage level"
                        className="w-full accent-rose-500"
                      />

                      {/* SVG DIAGRAM 2: Catalyst Chain */}
                      <svg viewBox="0 0 380 140" className="w-full bg-slate-900 rounded-lg border border-slate-800" aria-label="Media Catalyst Activation Chain">
                        <rect width="380" height="140" fill="#0f172a" />
                        <line x1="40" y1="70" x2="340" y2="70" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
                        {/* Progressive Fill line */}
                        <line x1="40" y1="70" x2={40 + (catalystOutrageLevel / 100) * 300} y2="70" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
                        
                        {/* Step Markers */}
                        <circle cx="50" cy="70" r="14" fill={catalystOutrageLevel >= 15 ? '#6366f1' : '#334155'} />
                        <text x="50" y="74" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">1</text>
                        <text x="50" y="105" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold">Informing</text>

                        <circle cx="150" cy="70" r="14" fill={catalystOutrageLevel >= 40 ? '#8b5cf6' : '#334155'} />
                        <text x="150" y="74" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">2</text>
                        <text x="150" y="105" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold">Framing</text>

                        <circle cx="250" cy="70" r="14" fill={catalystOutrageLevel >= 70 ? '#ec4899' : '#334155'} />
                        <text x="250" y="74" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">3</text>
                        <text x="250" y="105" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold">Mobilising</text>

                        <circle cx="340" cy="70" r="14" fill={catalystOutrageLevel >= 90 ? '#10b981' : '#334155'} />
                        <text x="340" y="74" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">4</text>
                        <text x="340" y="105" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold">Reform Law</text>

                        {/* Animated Spark */}
                        <circle cx={40 + (catalystOutrageLevel / 100) * 300} cy="70" r="6" fill="#fbbf24" stroke="#fff" strokeWidth="1.5" />
                        <text x="190" y="30" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">
                          Activation Threshold: {catalystOutrageLevel >= 75 ? 'REFORM TRIGGERED' : 'AWAITING MASS MOMENTUM'}
                        </text>
                      </svg>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs uppercase font-black tracking-widest text-gold-400 mb-2">Catalyst Mechanism Chain</h4>
                        <div className="space-y-2 text-xs">
                          <div className={`p-2 rounded-lg border ${catalystOutrageLevel >= 20 ? 'bg-gold-950/70 border-gold-700 text-gold-200' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                            1. 📢 <strong>Information Dissemination:</strong> Media uncovers hidden injustice.
                          </div>
                          <div className={`p-2 rounded-lg border ${catalystOutrageLevel >= 50 ? 'bg-purple-950/70 border-purple-700 text-purple-200' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                            2. 🎯 <strong>Agenda-Setting &amp; Framing:</strong> Tells society what to think about.
                          </div>
                          <div className={`p-2 rounded-lg border ${catalystOutrageLevel >= 75 ? 'bg-rose-950/70 border-rose-700 text-rose-200' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                            3. ⚖️ <strong>Legislative Reform:</strong> e.g., 2013 Criminal Law Amendment &amp; RTI Act 2005.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: Ethics Audit Lab */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'sensationalism', name: 'Sensationalism' },
                      { id: 'fake_news', name: 'Fake News' },
                      { id: 'paid_news', name: 'Paid News' },
                      { id: 'advertorial', name: 'Advertorial' },
                    ].map(tab => (
                      <motion.button
                        key={tab.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setNewsEthicsType(tab.id as 'sensationalism' | 'fake_news' | 'paid_news' | 'advertorial');
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          newsEthicsType === tab.id
                            ? 'bg-rose-600 text-white shadow'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {tab.name}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    {newsEthicsType === 'sensationalism' && (
                      <div className="space-y-2">
                        <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 text-[10px] font-bold border border-rose-800">Distortion of Real Event</span>
                        <h4 className="text-sm font-bold text-white">Breathless TRP Framing</h4>
                        <p className="text-xs text-slate-300">
                          Exaggerating minor accidents with screaming graphics like <em>"BLOOD ON THE HIGHWAY!"</em>. The underlying incident is real, but emotional proportion is deliberately destroyed. Regulated by NBDA/NBSA.
                        </p>
                      </div>
                    )}
                    {newsEthicsType === 'fake_news' && (
                      <div className="space-y-2">
                        <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 text-[10px] font-bold border border-amber-800">Complete Fabrication</span>
                        <h4 className="text-sm font-bold text-white">Invented WhatsApp Hoaxes</h4>
                        <p className="text-xs text-slate-300">
                          Wholly invented stories (e.g., 2020 Palghar child-lifter rumours) that ignite communal frenzy. Governed by the IT Rules 2021 intermediary takedown code.
                        </p>
                      </div>
                    )}
                    {newsEthicsType === 'paid_news' && (
                      <div className="space-y-2">
                        <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 text-[10px] font-bold border border-red-800">Covert Corruption</span>
                        <h4 className="text-sm font-bold text-white">Electoral Corruption Scandal (2009)</h4>
                        <p className="text-xs text-slate-300">
                          Candidates secretly paying newspapers to publish propaganda disguised as neutral reportage. Investigated by the Press Council of India under Justice G. N. Ray.
                        </p>
                      </div>
                    )}
                    {newsEthicsType === 'advertorial' && (
                      <div className="space-y-2">
                        <span className="px-2 py-0.5 rounded bg-gold-950 text-gold-300 text-[10px] font-bold border border-gold-800">Hybrid Format</span>
                        <h4 className="text-sm font-bold text-white">Commercial Feature Disguised as News</h4>
                        <p className="text-xs text-slate-300">
                          Paid brand placements laid out like journalistic articles (e.g., Medianet 2003). Ethical only if accompanied by a prominent "ADVERTISEMENT" label per ASCI and PCI norms.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 3: TV Ad Pipeline (SVG Diagram #3: Linear 8-Stage Ad Pipeline) */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {/* SVG DIAGRAM 3: 8-Stage Production Flow */}
                  <svg viewBox="0 0 560 90" className="w-full bg-slate-950 rounded-xl border border-slate-800" aria-label="8-Stage TV Commercial Production Pipeline">
                    <rect width="560" height="90" fill="#030712" />
                    {AD_STAGES.map((_, i) => {
                      const cx = 35 + i * 70;
                      const isActive = currentPipelineStage === i;
                      const isPast = currentPipelineStage > i;
                      return (
                        <g key={i} onClick={() => setCurrentPipelineStage(i)} className="cursor-pointer">
                          {i < 7 && (
                            <line
                              x1={cx + 18}
                              y1="40"
                              x2={cx + 52}
                              y2="40"
                              stroke={isPast ? '#6366f1' : '#334155'}
                              strokeWidth="2.5"
                            />
                          )}
                          <circle
                            cx={cx}
                            cy="40"
                            r={isActive ? "16" : "13"}
                            fill={isActive ? '#6366f1' : isPast ? '#312e81' : '#1e293b'}
                            stroke={isActive ? '#a5b4fc' : '#475569'}
                            strokeWidth={isActive ? "2.5" : "1.5"}
                          />
                          <text x={cx} y="44" textAnchor="middle" fill="#fff" fontSize={isActive ? "11" : "9"} fontWeight="bold">
                            {i + 1}
                          </text>
                          <text x={cx} y="70" textAnchor="middle" fill={isActive ? '#38bdf8' : '#64748b'} fontSize="7" fontWeight={isActive ? "bold" : "normal"}>
                            {['Plan', 'Script', 'Cast', 'Pre-prod', 'Shoot', 'Post', 'Approve', 'Deliver'][i]}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {AD_STAGES.map((st, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setCurrentPipelineStage(i);
                          audioManager.play('tap');
                        }}
                        className={`p-2.5 rounded-xl text-left transition-all border ${
                          currentPipelineStage === i
                            ? 'bg-gold-900/80 border-gold-500 text-white shadow-md'
                            : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="text-[10px] font-bold text-gold-400">STAGE {i + 1}</div>
                        <div className="text-xs font-semibold truncate">{st.title.replace(/^\d+\.\s*/, '')}</div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-gold-300">{AD_STAGES[currentPipelineStage].title}</h4>
                      <p className="text-xs text-slate-300 mt-1">{AD_STAGES[currentPipelineStage].desc}</p>
                    </div>
                    <span className="text-xs font-mono text-slate-500">{currentPipelineStage + 1} / 8</span>
                  </div>
                </div>
              )}

              {/* SLIDE 4: Interactive Camera Angle Simulator */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <canvas ref={cameraCanvasRef} width={420} height={240} className="w-full bg-slate-950 rounded-xl border border-slate-800 shadow-inner" />
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-center">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>Vertical Elevation ({cameraElevationAngle > 0 ? `+${cameraElevationAngle}° High` : cameraElevationAngle < 0 ? `${cameraElevationAngle}° Low` : '0° Eye Level'})</span>
                        </div>
                        <input
                          type="range"
                          min={-45}
                          max={45}
                          value={cameraElevationAngle}
                          onChange={(e) => {
                            setCameraElevationAngle(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          aria-label="Set camera vertical elevation angle"
                          className="w-full accent-gold-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>Dutch Roll Tilt ({cameraRollTilt}°)</span>
                        </div>
                        <input
                          type="range"
                          min={-30}
                          max={30}
                          value={cameraRollTilt}
                          onChange={(e) => {
                            setCameraRollTilt(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          aria-label="Set Dutch roll tilt angle"
                          className="w-full accent-amber-500"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300">
                        <strong>Narrative Rule:</strong> Low angles make villains/heroes loom tall (Sholay, Bahubali); High angles induce vulnerability (Dangal wrestlers in defeat).
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slider Step Footer Navigation */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs font-medium text-slate-400">
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
                className="px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 3: SANDBOX (FREE PLAY & PREDICT-THEN-CHECK) ─── */}
      {phase === 'sandbox' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Free Studio Sandbox</h3>
                <p className="text-xs text-slate-400">Tinker with camera angles, newsroom ethics, and ad planning with zero grading pressure.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-lg"
              >
                Ready for Challenges! 🚀
              </motion.button>
            </div>

            {/* Predict-Then-Check Container */}
            {!predictionMade ? (
              <div className="p-4 bg-gold-950/60 rounded-xl border border-gold-700/60 space-y-3">
                <span className="px-2 py-0.5 bg-gold-500/30 text-gold-300 rounded text-[10px] font-bold">
                  Predict-Then-Check
                </span>
                <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePrediction(i)}
                      className="p-3 bg-slate-800 hover:bg-slate-700 text-left rounded-lg text-xs font-medium text-slate-200 border border-slate-700"
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-700/60 text-xs text-emerald-300">
                ✓ Prediction recorded! Use the live controls below to see how unverified hoaxes distort public order.
              </div>
            )}

            {/* Sandbox Live Canvas & Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-gold-400 uppercase">Director’s Camera Rig</h4>
                <canvas ref={cameraCanvasRef} width={400} height={200} className="w-full bg-slate-900 rounded-lg border border-slate-800" />
                <div className="flex gap-2">
                  <input
                    type="range"
                    min={-45}
                    max={45}
                    value={cameraElevationAngle}
                    onChange={(e) => setCameraElevationAngle(Number(e.target.value))}
                    className="w-1/2 accent-gold-500"
                  />
                  <input
                    type="range"
                    min={-30}
                    max={30}
                    value={cameraRollTilt}
                    onChange={(e) => setCameraRollTilt(Number(e.target.value))}
                    className="w-1/2 accent-amber-500"
                  />
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gold-400 uppercase">Scientific Observation</h4>
                  <p className="text-xs text-white font-semibold mt-2">{OBSERVATION_QUESTIONS[0].question}</p>
                  <div className="space-y-2 mt-3">
                    {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleObservation(i)}
                        className={`w-full text-left p-2.5 rounded-lg text-xs font-medium border ${
                          observationAnswered && i === OBSERVATION_QUESTIONS[0].correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 4: CHALLENGE (ADAPTIVE NEP 2020 SUITE) ─── */}
      {phase === 'challenge' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {/* Progress Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold text-slate-200">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="px-2 py-0.5 bg-gold-950 text-gold-300 rounded border border-gold-800 font-mono text-[10px] uppercase">
                Competency: {activeChallenge.competencyLevel}
              </span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-pink-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Active Question Box */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-5 sm:p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded bg-gold-600/30 text-gold-300 text-[10px] font-black uppercase tracking-wider border border-gold-500/30">
                {activeChallenge.type}
              </span>
              <span className="text-xs text-slate-400 font-medium">Node: {activeChallenge.nodeId}</span>
            </div>

            <p className="text-base sm:text-lg font-bold text-white mb-4 leading-snug">{activeChallenge.question}</p>

            {/* MCQ TYPE (classify / distinguish / match) */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {activeChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={showExplanation || answerRevealed}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium border transition-all ${
                      showExplanation && i === activeChallenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/90 hover:bg-slate-700/90 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="inline-block w-6 h-6 rounded-full bg-slate-700 text-center leading-6 text-xs font-bold mr-3 text-gold-300">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* DRAG-LABEL TYPE */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag items onto targets below:</span>
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(activeChallenge.correctMapping || {}).map((targetId) => (
                    <div
                      key={targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col justify-center items-center text-center transition-all ${
                        droppedLabels[targetId]
                          ? 'bg-gold-950/70 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950 border-slate-700 text-slate-400 hover:border-gold-500'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-slate-500 uppercase">{targetId.replace('box_', '').replace('stage_', '')} Target</span>
                      <p className="text-sm font-bold mt-1">
                        {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : 'Drop matching label here'}
                      </p>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow"
                >
                  Verify Mappings ✓
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT TYPE */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">Drag steps to reorder into correct chronological sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 hover:bg-slate-700/80 rounded-xl border border-slate-700 text-xs sm:text-sm font-medium text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-gold-900 text-gold-300 flex items-center justify-center text-xs font-bold">
                        {displayIndex + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow"
                >
                  Verify Sequence ✓
                </motion.button>
              </div>
            )}

            {/* NUMERIC TYPE */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    aria-label="Enter calculated numeric answer"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-gold-500 w-48"
                  />
                  <span className="text-xs font-bold text-slate-400">{activeChallenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT TYPE */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleConstructToggle(part)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                        constructParts.includes(part)
                          ? 'bg-gold-600 border-gold-400 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {constructParts.includes(part) ? `✓ ${part}` : `+ ${part}`}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex items-center">
                  <p className="text-xs text-gold-300 font-mono">
                    {constructParts.length > 0 ? constructParts.join(' -> ') : 'Click principles above to assemble workflow'}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow"
                >
                  Verify Newsroom Assembly ✓
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 rounded-2xl bg-gold-950/60 border border-gold-800 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-300 uppercase tracking-widest">
                    Step-by-Step Rationale
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Step {revealedSteps + 1} of {activeChallenge.explanation.split('. ').filter(s => s.trim()).length}
                  </span>
                </div>

                <div className="space-y-2">
                  {activeChallenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                      >
                        <span className="font-bold text-gold-400">{i + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim()).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(r => r + 1)}
                      className="px-4 py-2 bg-gold-800 hover:bg-gold-700 text-white rounded-xl text-xs font-bold"
                    >
                      Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Conclave 🎓' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )}

      {/* ─── PHASE 5: COMPLETE (MASTERY, PROFILE & MOTIVATIONAL FEEDBACK) ─── */}
      {phase === 'complete' && (
        <motion.section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950 via-slate-900 to-slate-950 rounded-2xl border border-gold-700/60 shadow-xl text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-3xl">
              🏆
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Media Conclave Certification Complete</h2>
            <div className="flex justify-center gap-6 pt-2">
              <div className="bg-slate-900/90 px-5 py-3 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block font-bold">Accuracy Score</span>
                <span className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="bg-slate-900/90 px-5 py-3 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block font-bold">Mastery Level</span>
                <span className="text-2xl font-black text-gold-400 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK */}
          <div className="p-5 bg-emerald-950/40 rounded-2xl border border-emerald-700/50 text-center">
            <h3 className="text-lg font-black tracking-wide text-emerald-300 mb-1">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
              {errors === 0
                ? 'Flawless mastery! You possess executive-level insight across cultural semiotics, investigative ethics, and cinematic visual grammar.'
                : errors <= 3
                ? 'Outstanding execution! You have built high competency across all 10 CISCE Class 12 Mass Media nodes.'
                : errors <= 7
                ? 'Solid progress! Re-examine the specific misconceptions below to strengthen your board exam preparation.'
                : 'Knowledge building in progress: Review the diagnostic items and camera simulations to solidify key theoretical definitions.'}
            </p>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/50 space-y-3">
              <h4 className="text-xs uppercase font-black tracking-widest text-rose-400">Your Diagnostic Misconception Profile</h4>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule Banner */}
          <div className="p-4 bg-amber-950/40 rounded-xl border border-amber-800/50 flex items-center justify-between text-xs text-amber-200">
            <div>
              <strong>Spaced Review Schedule (SM-2):</strong> Next mastery review recommended in{' '}
              <span className="font-bold underline">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span>.
            </div>
            <span className="text-lg">📅</span>
          </div>

          {/* Real World Practical Assignment */}
          <div className="p-5 bg-gold-950/50 rounded-2xl border border-gold-800 space-y-3">
            <h4 className="text-sm font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h4>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-bold text-gold-400">{i + 1}.</span> {st}
                </li>
              ))}
            </ul>
          </div>
        </motion.section>
      )}

      {/* ─── FLOATING FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_MassMediaCultureCommunicationWhatSim;