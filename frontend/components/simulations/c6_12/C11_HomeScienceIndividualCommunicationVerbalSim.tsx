'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C11_HOME_031 = 'c11_home_031';
const NODE_C11_HOME_032 = 'c11_home_032';
const NODE_C11_HOME_033 = 'c11_home_033';
const NODE_C11_HOME_034 = 'c11_home_034';
const ALL_NODE_IDS = [NODE_C11_HOME_031, NODE_C11_HOME_032, NODE_C11_HOME_033, NODE_C11_HOME_034];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission Poshan: The Community Extension Campaign',
  intro: 'You are appointed as an ICDS Child Development Project Officer (CDPO) in a diverse district of Odisha and Madhya Pradesh. Malnutrition (35.5% stunting, NFHS-5) and anaemia (67.1% among children) require urgent communication across households, Self-Help Groups (SHGs), and mass media.',
  context: 'Your challenge is to select, design, and evaluate individual, group, mass, and social media communication methods to create lasting health and nutrition behavior changes.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'An Anganwadi worker visits a mother and says "Your baby needs ragi porridge" while looking at her phone, frowning, and standing at the doorway. What will the mother most likely do?',
  options: [
    'Follow the advice eagerly because the spoken words are medically accurate.',
    'Feel dismissed and ignore the advice because non-verbal disrespect overrides the words.',
    'Ask for written pamphlets because she prefers print communication.',
    'Report the Anganwadi worker to the Ministry of Women and Child Development immediately.'
  ],
  correctIndex: 1,
  hintAfter: 'Research by Albert Mehrabian shows that up to 93% of emotional communication is non-verbal (55% body language + 38% paralanguage). Let us explore why congruence between words and actions is the secret of community extension!',
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

// ─── 21 DETAILED CHALLENGES (7 Foundation, 7 Standard, 7 Advanced) ───
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7 challenges) ---
  {
    id: 'ch_f01',
    nodeId: NODE_C11_HOME_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under individual communication, which of the following is strictly a form of WRITTEN VERBAL communication?',
    options: [
      'A warm Indian Namaste greeting at the doorstep',
      'An ICDS illustrated nutrition leaflet in Odia showing portion sizes',
      'The pitch, cadence, and pauses in an extension worker’s voice',
      'Crossed arms and eye contact during a home consultation'
    ],
    correctIndex: 1,
    explanation: 'Verbal communication uses words in either spoken or written form. An ICDS printed leaflet uses written words/language, making it written verbal communication. Tone, eye contact, and gestures are non-verbal.',
    hints: [
      'Remember: "Verbal" means using words, not just speaking with sound.',
      'A pamphlet or leaflet contains written sentences and vocabulary.',
      'The ICDS leaflet uses words on paper, which is written verbal communication.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_f02',
    nodeId: NODE_C11_HOME_031,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the non-verbal communication elements to their correct scientific definitions.',
    dragItems: [
      { label: 'Proxemics', targetId: 'target_space' },
      { label: 'Paralanguage', targetId: 'target_voice' },
      { label: 'Kinesics', targetId: 'target_body' },
      { label: 'Haptics', targetId: 'target_touch' }
    ],
    correctMapping: {
      target_space: 'Proxemics',
      target_voice: 'Paralanguage',
      target_body: 'Kinesics',
      target_touch: 'Haptics'
    },
    explanation: 'Proxemics is personal space and distance; Paralanguage is the vocal tone, volume, and tempo; Kinesics is body movement/posture; Haptics is touch communication (e.g. reassuring pat on the shoulder).',
    hints: [
      'Think about personal space (proximity = proxemics).',
      'Vocal tone and pitch without words are called paralanguage.',
      'Body movement is kinesics, and touch is haptics.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_f03',
    nodeId: NODE_C11_HOME_032,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the primary difference between a Method Demonstration and a Result Demonstration in Home Science extension?',
    options: [
      'Method demonstration shows the step-by-step process of a skill; Result demonstration displays the final proven outcome.',
      'Method demonstration is for school children; Result demonstration is exclusively for male farmers.',
      'Method demonstration requires mass media; Result demonstration requires one-to-one home visits.',
      'There is no difference; both terms refer to classroom lectures with chalkboards.'
    ],
    correctIndex: 0,
    explanation: 'Method demonstration teaches the process ("how to prepare low-cost ragi-moong weaning mix"), whereas Result demonstration proves the outcome ("a thriving kitchen garden plot grown using organic compost").',
    hints: [
      'Think about the word "Method" (how to do something).',
      'Think about the word "Result" (showing the harvested or final product).',
      'Method demonstration focuses on teaching the step-by-step technique.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_f04',
    nodeId: NODE_C11_HOME_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which medium reaches over 99% of India’s geographical area and can overcome illiteracy without requiring electricity grid cables?',
    options: [
      'English Daily Broadsheets',
      'All India Radio (Akashvani) via battery transistor sets',
      'High-definition Satellite Smart Televisions',
      'Monthly Printed Peer-Reviewed Academic Journals'
    ],
    correctIndex: 1,
    explanation: 'All India Radio (Akashvani) covers 99%+ of India by area. Because it uses spoken audio, it bridges the literacy gap, and battery-powered radios function even in remote off-grid hamlets.',
    hints: [
      'Look for an audio-only electronic medium that needs no power cords.',
      'This medium has reached rural farm households through Krishi Darshan & farm broadcasts for decades.',
      'Akashvani (All India Radio) is the answer.'
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_f05',
    nodeId: NODE_C11_HOME_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is classified as a Microblogging platform in the ISC Home Science syllabus?',
    options: [
      'YouTube',
      'WhatsApp',
      'X (formerly Twitter) / Koo',
      'LinkedIn'
    ],
    correctIndex: 2,
    explanation: 'Microblogging platforms focus on short, real-time broadcast posts (e.g. X/Twitter, Koo). YouTube is video sharing, WhatsApp is messaging, and LinkedIn is professional networking.',
    hints: [
      'Microblogs limit message lengths to brief character counts.',
      'Think of short updates, hashtags, and quick public announcements.',
      'X (Twitter) and Koo are microblogs.'
    ],
  },
  {
    id: 'ch_f06',
    nodeId: NODE_C11_HOME_031,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to Albert Mehrabian’s communication model, what percentage of emotional meaning is conveyed through Body Language (facial expressions, posture, eye contact)?',
    correctAnswer: 55,
    tolerance: 1,
    unit: '%',
    explanation: 'Mehrabian’s 7-38-55 rule states that 55% of emotional meaning comes from body language, 38% from tone/paralanguage, and only 7% from actual spoken words.',
    hints: [
      'The rule is famously called the 7 - 38 - __ rule.',
      'Body language is the single largest component (more than half).',
      'Enter 55.'
    ],
  },
  {
    id: 'ch_f07',
    nodeId: NODE_C11_HOME_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the optimal group size for an interactive, participatory group discussion in community nutrition extension?',
    options: [
      '2 people only (individual dyad)',
      '8 to 30 members with a shared interest or background',
      '500 to 1,000 spectators in a cricket stadium',
      'Over 100,000 anonymous broadcast listeners'
    ],
    correctIndex: 1,
    explanation: 'Group communication in extension is structured for 8 to 30 participants (like an SHG or Mahila Mandal). This allows everyone to speak while maintaining coherent facilitation.',
    hints: [
      'A group must be small enough for shy members to speak, but large enough for diverse views.',
      'Think of an Anganwadi mothers meeting under a village tree.',
      '8 to 30 participants is the standard extension group size.'
    ],
  },

  // --- STANDARD TIER (7 challenges) ---
  {
    id: 'ch_s01',
    nodeId: NODE_C11_HOME_031,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'An extension worker visits a village grandmother in Rajasthan. Why does sitting cross-legged on the floor (proxemics & posture) create more rapport than standing with a clipboard?',
    options: [
      'Standing is illegal under ICDS guidelines.',
      'Sitting at eye level removes perceived status hierarchy and signals cultural humility and respect.',
      'Grandmothers cannot hear people who stand upright.',
      'Clipboards are strictly classified as non-verbal noise.'
    ],
    correctIndex: 1,
    explanation: 'In Indian joint families, elders hold decision-making authority. Standing over someone communicates superiority or scrutiny, whereas sitting at eye level on the floor establishes equality, respect, and trust.',
    hints: [
      'Consider the cultural dynamics of Indian joint families and elders.',
      'Physical posture communicates power, dominance, or mutual respect.',
      'Eye-level seating eliminates intimidation and fosters warmth.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_s02',
    nodeId: NODE_C11_HOME_032,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Arrange the chronological steps for conducting an effective Method Demonstration on making Iron-rich Ragi-Jowar Laddoos for adolescent girls.',
    sortItems: [
      'Introduce the objective and display clean, affordable local ingredients',
      'Perform each cooking step slowly while explaining the hygiene & nutritional rationale',
      'Invite two participants to practice rolling the laddoos under guidance',
      'Summarize key steps, distribute taste samples, and hand out recipe cards'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'A structured method demonstration begins with preparation/introduction, proceeds to execution with explanation, includes learner practice/replication, and ends with evaluation/summary.',
    hints: [
      'Always start by introducing the purpose and displaying materials.',
      'Next, the demonstrator performs the skill while explaining.',
      'Then let the learners practice, followed by the summary.'
    ],
  },
  {
    id: 'ch_s03',
    nodeId: NODE_C11_HOME_033,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is "Reach" not synonymous with "Impact" in mass communication campaigns for Poshan Abhiyan?',
    options: [
      'Reach measures how many people receive or see the message; Impact measures whether they comprehend, believe, and adopt the behavior.',
      'Reach applies only to print media; Impact applies only to radio.',
      'High reach automatically guarantees 100% adoption without any barriers.',
      'Impact is measured in rupees spent, while reach is measured in kilometers traveled.'
    ],
    correctIndex: 0,
    explanation: 'A television spot may have a reach of 50 lakh households (they saw it), but if local water scarcity or cultural taboos prevent them from boiling water, the impact (actual health outcome) remains low.',
    hints: [
      'Reach = quantity of audience exposed.',
      'Impact = actual behavioral change or health improvement.',
      'Just seeing an advertisement does not ensure a family will alter cooking habits.'
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_s04',
    nodeId: NODE_C11_HOME_034,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Chanderi handloom weaving collective wants to sell authentic sarees directly to urban consumers in Mumbai, eliminating middlemen. Which social media tool is best suited for visual brand storytelling?',
    options: [
      'An automated mass SMS broadcast in plain ASCII text',
      'An Instagram business account featuring high-resolution reels, weave close-ups, and weaver profiles',
      'A printed poster displayed exclusively in the Chanderi village square',
      'A 30-second late-night AM radio announcement'
    ],
    correctIndex: 1,
    explanation: 'Instagram is a visual social networking and video-sharing platform ideal for showcasing textile textures, drape, artisan stories, and direct-to-consumer digital commerce.',
    hints: [
      'Handloom sarees rely heavily on visual appeal, motifs, and aesthetic colors.',
      'Which platform connects rural creators with urban buyers through visual stories and direct messaging?',
      'Instagram Reels and photo posts provide direct visual marketing.'
    ],
  },
  {
    id: 'ch_s05',
    nodeId: NODE_C11_HOME_032,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A Home Science teacher takes her Class 11 students to a KVIC Khadi manufacturing cluster. What transforms this outing from a passive picnic into a legitimate educational Field Trip?',
    options: [
      'Providing expensive commercial snacks on the bus ride',
      'Having pre-visit briefing worksheets, structured weaver interviews, fabric analysis, and classroom follow-up reporting',
      'Ensuring students take selfies without interacting with weavers',
      'Canceling all written assessments and exams afterwards'
    ],
    correctIndex: 1,
    explanation: 'A purposeful field trip connects theory to reality through pre-trip objectives, structured observation worksheets, primary data collection (interviews), and post-trip synthesis/discussion.',
    hints: [
      'Think about the pedagogy: planning, learning tasks during the visit, and follow-up analysis.',
      'Educational trips require defined objectives and student engagement.',
      'Worksheets, interviews, and post-visit reports create genuine learning.'
    ],
  },
  {
    id: 'ch_s06',
    nodeId: NODE_C11_HOME_033,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A district health department prints 40,000 Poshan leaflets at ₹2 each and airs 20 All India Radio jingles at ₹1,000 each. What is the total communication expenditure in Rupees?',
    correctAnswer: 100000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Print cost = 40,000 × ₹2 = ₹80,000. Electronic Radio cost = 20 × ₹1,000 = ₹20,000. Total budget = ₹80,000 + ₹20,000 = ₹1,00,000 (1 Lakh).',
    hints: [
      'Calculate print cost: 40,000 times 2.',
      'Calculate radio cost: 20 times 1,000.',
      'Add 80,000 + 20,000 to get the total.'
    ],
  },
  {
    id: 'ch_s07',
    nodeId: NODE_C11_HOME_034,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Construct the 3-step digital hygiene guideline to prevent the spread of WhatsApp health misinformation in rural SHG groups.',
    availableParts: ['Verify with trusted health portals or ASHA worker', 'Check sender emotion and source before forwarding', 'Pause and do not auto-forward sensational claims'],
    targetState: 'Pause and do not auto-forward sensational claims Check sender emotion and source before forwarding Verify with trusted health portals or ASHA worker',
    validationHint: 'Build the sequence: First Pause -> Then Check source -> Finally Verify with an authority.',
    explanation: 'Combating fake health news requires: (1) Pausing impulsive forwards, (2) Checking emotional biases and origins, and (3) Verifying facts with credible health authorities like ICMR or local ASHA workers.',
    hints: [
      'Start with stopping immediate reactions (Pause).',
      'Next examine the source and tone of the message.',
      'Finally consult an official fact-checker or medical worker.'
    ],
    misconceptionIndex: 4,
  },

  // --- ADVANCED TIER (7 challenges) ---
  {
    id: 'ch_a01',
    nodeId: NODE_C11_HOME_031,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate this scenario: An urban dietitian emails a comprehensive 12-page PDF diet chart to an illiterate tribal mother in Koraput, Odisha. Why does this communication fail completely?',
    options: [
      'PDF files cannot contain information on iron and vitamins.',
      'Mismatched channel and code: the medium requires digital literacy, English comprehension, and hardware that the receiver lacks, violating the basic sender-receiver alignment.',
      'Tribal mothers are genetically unable to digest dietary recommendations.',
      'Emails are legally prohibited for medical nutrition advice under Indian law.'
    ],
    correctIndex: 1,
    explanation: 'Effective individual communication requires code and channel congruence. Sending a digital written document to a non-literate receiver with no smartphone creates complete communication noise and barrier.',
    hints: [
      'Think about Shannon-Weaver communication model: Sender, Channel, Code, Receiver, Noise.',
      'Does the receiver possess the literacy and hardware to decode a PDF?',
      'The channel and format are entirely inappropriate for the recipient’s context.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_a02',
    nodeId: NODE_C11_HOME_032,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'NFHS-5 reports that 89.7% of Indian infants (6-23 months) do not receive a minimum acceptable diet. Why is a combined "Discussion + Method Demonstration" superior to a lecture alone in resolving this?',
    options: [
      'Lectures take too many hours to prepare.',
      'Discussion uncovers cultural taboos and fears (e.g., "ragi causes cold"), while method demonstration imparts hands-on culinary skills with local utensils, bridging attitude and practice.',
      'Demonstrations allow the extension worker to sell commercial baby formula brands for profit.',
      'Lectures cannot be delivered in Indian regional languages.'
    ],
    correctIndex: 1,
    explanation: 'Behaviour change requires both cognitive consensus (via group discussion on beliefs and doubts) and psychomotor skill acquisition (via method demo showing how to cook hygienic, lump-free porridge).',
    hints: [
      'Why do mothers hesitate? (Beliefs, fears, myths -> solved by discussion).',
      'Why do mothers fail to cook right? (Lack of technique -> solved by demonstration).',
      'Combining discussion and demonstration addresses both mindset and practical capability.'
    ],
  },
  {
    id: 'ch_a03',
    nodeId: NODE_C11_HOME_033,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Compare print and electronic media during an acute flood crisis in Assam. Why must relief workers combine AIR radio alerts with illustrated waterproof wall posters at relief camps?',
    options: [
      'Print media is legally mandatory before broadcasting any electronic signal.',
      'Radio provides instant broadcast reach over flooded areas, while posters provide permanent reference points at camps that do not vanish when the broadcast ends.',
      'Radio broadcasts only work during full sunshine, while posters work in the dark.',
      'Posters generate electricity for battery-operated transistor radios.'
    ],
    correctIndex: 1,
    explanation: 'Electronic media (radio) excels at speed and broad geographic transmission, but is transient. Print media (posters) excels at permanence and continuous display at relief camps for repeated viewing.',
    hints: [
      'Think of transience vs permanence.',
      'Radio reaches people trapped across flood zones instantly.',
      'Posters in camps stay on walls for mothers to read multiple times throughout the day.'
    ],
  },
  {
    id: 'ch_a04',
    nodeId: NODE_C11_HOME_034,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In evaluating social media’s impact on Indian adolescents (National Mental Health Survey 2015-16), which balanced stance aligns with Home Science developmental principles?',
    options: [
      'Total ban on all digital devices until age 25 to prevent all anxiety and screen addiction.',
      'Unrestricted 10-hour daily screen time because all online content enhances intellectual development.',
      'Guided digital literacy: enforcing daily screen limits (under 1-2 hours recreational), fostering critical fact-checking, and leveraging educational communities while safeguarding privacy.',
      'Allowing boys unlimited screen time while banning girls to preserve traditional values.'
    ],
    correctIndex: 2,
    explanation: 'A sound evaluative approach acknowledges social media’s benefits (learning, connectivity) while mitigating harms (cyberbullying, addiction, anxiety) through digital hygiene and balanced moderation.',
    hints: [
      'Look for the balanced, evidence-based stance that balances advantages against real risks.',
      'Neither total prohibition nor unchecked addiction is sound.',
      'Digital literacy, time limits, and privacy awareness provide the optimal balance.'
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_a05',
    nodeId: NODE_C11_HOME_032,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Map each extension challenge to the most effective group communication strategy.',
    dragItems: [
      { label: 'Group Discussion', targetId: 'strat_taboo' },
      { label: 'Method Demonstration', targetId: 'strat_ors' },
      { label: 'Result Demonstration', targetId: 'strat_yield' },
      { label: 'Field Trip', targetId: 'strat_coop' }
    ],
    correctMapping: {
      strat_taboo: 'Group Discussion',
      strat_ors: 'Method Demonstration',
      strat_yield: 'Result Demonstration',
      strat_coop: 'Field Trip'
    },
    explanation: 'Cultural taboos require participatory discussion; teaching ORS preparation requires method demo; showing high vegetable yields from kitchen compost requires result demo; learning large-scale milk processing requires a field trip to an Amul cooperative.',
    hints: [
      'Breaking cultural resistance requires open conversation (Discussion).',
      'Learning to prepare ORS is a hands-on skill (Method Demo).',
      'Proving a crop yield works is a tangible outcome (Result Demo).',
      'Seeing an industrial dairy cooperative requires a visit (Field Trip).'
    ],
  },
  {
    id: 'ch_a06',
    nodeId: NODE_C11_HOME_031,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the 4 core steps of a culturally congruent home visit for an Anganwadi worker visiting a hesitant new mother.',
    availableParts: ['Remove footwear and greet with folded hands (Namaste)', 'Sit cross-legged at eye level and listen warmly to concerns', 'Explain complementary feeding in simple dialect with local food examples', 'Reassure with encouraging tone and leave a colorful illustrated diet chart'],
    targetState: 'Remove footwear and greet with folded hands (Namaste) Sit cross-legged at eye level and listen warmly to concerns Explain complementary feeding in simple dialect with local food examples Reassure with encouraging tone and leave a colorful illustrated diet chart',
    validationHint: 'Sequence: Cultural Respect -> Active Listening -> Clear Local Explanation -> Reassurance & Handout.',
    explanation: 'A culturally sensitive visit begins with respect (Namaste), builds psychological safety through listening at eye level, conveys advice in local dialect, and concludes with positive reinforcement.',
    hints: [
      'First show cultural humility at the doorway.',
      'Second, build rapport by sitting down and listening.',
      'Third, present nutritional advice clearly in mother tongue.',
      'Fourth, reassure and provide a permanent visual reminder.'
    ],
  },
  {
    id: 'ch_a07',
    nodeId: NODE_C11_HOME_034,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'An SHG nutrition video on YouTube has 5,000 views. If 12% of viewers actively leave questions/comments and 4% report adopting the recipe at home, how many total viewers adopted the recipe?',
    correctAnswer: 200,
    tolerance: 0,
    unit: 'mothers',
    explanation: '5,000 total views × 4% (0.04) adoption rate = 200 mothers adopting the recipe. (12% engagement = 600 comments, but actual practice adoption is 200).',
    hints: [
      'We want the number of people who adopted the recipe (4%).',
      'Calculate 4% of 5,000.',
      '5,000 × 0.04 = 200.'
    ],
  }
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
  nodeId: NODE_C11_HOME_031,
  title: 'Communication & Extension Methods in Home Science',
  definition: 'Communication in Home Science is the systematic transfer of knowledge, skills, and attitudes from extension workers to individuals, groups, and masses through verbal, non-verbal, electronic, print, and social media channels to improve family and community welfare.',
  eli5: 'Think of communication as building bridges: talking one-on-one with a friend (individual), teaching a group to cook a recipe (group), broadcasting a health show on radio (mass), or sharing a helpful video in a family group (social media).',
  misconceptions: [
    { misconception: 'Non-verbal communication means only hand gestures.', correction: 'Non-verbal includes facial expressions, posture (kinesics), eye contact, touch (haptics), personal distance (proxemics), and tone/pitch (paralanguage).' },
    { misconception: 'Written communication is non-verbal because no sound is made.', correction: 'Written communication uses words and vocabulary, so it is strictly VERBAL. Non-verbal strictly excludes words.' },
    { misconception: 'Method demonstrations and result demonstrations are identical.', correction: 'Method demo shows "how to perform a skill" step-by-step; Result demo shows the "proven end outcome" of an adopted practice.' },
    { misconception: 'Television is always superior to radio in rural development.', correction: 'Radio (AIR) reaches remote off-grid areas with battery transistors at far lower cost and bypasses the literacy barrier effortlessly.' },
    { misconception: 'Social media is purely entertainment and has no role in extension.', correction: 'Self-help groups, KVIC artisans, and Poshan Abhiyan widely use WhatsApp, YouTube, and Instagram for community mobilization and micro-business.' }
  ],
  diagnosticQuestions: [
    { question: 'Which channel transmits up to 55% of emotional meaning in Mehrabian’s model?', options: ['Spoken vocabulary', 'Body language & facial expressions', 'Written text leaflets', 'Radio broadcasts'], correctIndex: 1 },
    { question: 'What type of communication is an Anganwadi worker explaining ORS to a mother in her kitchen?', options: ['Mass communication', 'Individual spoken verbal + non-verbal', 'Print journalism', 'Microblogging'], correctIndex: 1 },
    { question: 'Teaching an SHG how to make millet cookies step-by-step is a:', options: ['Method demonstration', 'Result demonstration', 'Microblog post', 'Mass broadcast'], correctIndex: 0 },
    { question: 'Which mass medium is permanent and can be re-read multiple times?', options: ['Radio announcement', 'Live television spot', 'Printed poster/pamphlet', 'Telephone call'], correctIndex: 2 },
    { question: 'WhatsApp groups used by Anganwadi workers are classified under:', options: ['Print media', 'Traditional folk theatre', 'Social media messaging application', 'One-way broadcast television'], correctIndex: 2 },
    { question: 'Paralanguage includes which of the following vocal attributes?', options: ['The dictionary spelling of words', 'Tone, pitch, volume, and pauses', 'The color of the printed font', 'The physical room temperature'], correctIndex: 1 },
    { question: 'A successful field trip in Home Science must include:', options: ['Only recreational picnic games', 'Pre-visit worksheets, active interviews, and post-visit reports', 'Zero interaction with weavers or workers', 'Strict silence throughout the day'], correctIndex: 1 },
    { question: 'What is the primary risk of health communication on social messaging apps?', options: ['Rapid viral spread of unverified fake news and myths', 'High printing ink expenses', 'Messages cannot be viewed on mobile phones', 'Complete lack of photographs'], correctIndex: 0 }
  ],
  masteryCriteria: 'Demonstrate mastery over individual (verbal/non-verbal), group (discussions, demos, field trips), mass (print/electronic), and social media communication systems in Home Science extension.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Mehrabian’s 7-38-55 Non-Verbal Alignment',
    instruction: 'Adjust the Body Language, Tone, and Word sliders to see how congruence builds or breaks trust with a rural mother.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_HOME_031,
  },
  {
    title: '2. Verbal vs Non-Verbal Channel Classifier',
    instruction: 'Inspect the Shannon-Weaver extension model and categorize real-life cues into Spoken Verbal, Written Verbal, or Non-Verbal.',
    interactionType: 'drag-classify',
    nodeId: NODE_C11_HOME_031,
  },
  {
    title: '3. Group Dynamics: Discussion vs Demo vs Field Trip',
    instruction: 'Select a community scenario to compare group methods on Reach, Skill Transfer, Cost, and Participant Engagement.',
    interactionType: 'click-compare',
    nodeId: NODE_C11_HOME_032,
  },
  {
    title: '4. Mass Media: Reach vs Permanence Simulator',
    instruction: 'Balance Budget, Literacy level, and Grid Electricity to find the ideal mix of AIR Radio, TV, and Poshan Posters.',
    interactionType: 'media-mix',
    nodeId: NODE_C11_HOME_033,
  },
  {
    title: '5. Social Media & Digital Extension Matrix',
    instruction: 'Examine how rural SHGs and artisans use WhatsApp, YouTube, Instagram, and Koo to democratize health & livelihood.',
    interactionType: 'social-matrix',
    nodeId: NODE_C11_HOME_034,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an Anganwadi worker speaks correct nutritional words (+100%) but uses hostile body language (arms crossed, eye contact avoided), what will the mother’s trust level be?',
    options: [
      'Extremely High (over 90%) because words matter most',
      'Very Low (under 30%) because negative body language overpowers words',
      'Neutral (50%) regardless of demeanor',
      '100% because government workers are always believed blindly'
    ],
    correctIndex: 1,
    verifyInstruction: 'In the simulator below, slide "Words" to 100% and "Body Language" to -100% to check the Trust Meter!',
    nodeId: NODE_C11_HOME_031,
  },
  {
    question: 'Predict: For a remote tribal hamlet with 20% literacy and NO continuous electric grid, which medium achieves the highest health message coverage?',
    options: [
      'English Daily Newspaper',
      'Battery-operated All India Radio (Akashvani) in regional dialect',
      'High-bandwidth 4K Video Streaming Webcast',
      'Glossy printed 30-page research monographs'
    ],
    correctIndex: 1,
    verifyInstruction: 'Set Literacy to 20% and Grid to "Off" in the Mass Media Lab to observe the coverage gauge!',
    nodeId: NODE_C11_HOME_033,
  }
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe happens to the Mother’s Acceptance Index when Body Language, Tone, and Words are all in harmony (congruent)?',
    observableOptions: [
      'Trust Index skyrockets past 90%, creating genuine openness to new feeding practices',
      'Trust drops because too much warmth makes people suspicious',
      'No change occurs because communication has zero psychological effect',
      'The mother becomes confused by excessive friendliness'
    ],
    correctIndex: 0,
    nodeId: NODE_C11_HOME_031,
  },
  {
    question: 'What pattern emerges when comparing Mass Communication (TV/Radio) with Social Media (WhatsApp/YouTube)?',
    observableOptions: [
      'Mass media is strictly 2-way interactive; social media is strictly 1-way broadcast',
      'Mass media is 1-way broadcast to passive receivers; social media enables 2-way user-created dialogue',
      'Both require print printing presses in every village',
      'Social media can never be accessed on mobile smartphones'
    ],
    correctIndex: 1,
    nodeId: NODE_C11_HOME_034,
  }
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Community Extension Action Project: Poshan Maah Plan',
  description: 'Design a comprehensive 4-tiered communication strategy for your local community or school during National Nutrition Month (September).',
  steps: [
    'Individual: Draft a 2-minute empathetic home visit dialogue with a hesitant parent regarding breakfast.',
    'Group: Plan a 15-minute Method Demonstration of a high-iron millet recipe (Ragi laddoo or Jowar poha).',
    'Mass: Design a colorful visual poster highlighting the ICMR-NIN My Plate for the Day.',
    'Social Media: Formulate a 3-rule digital guide for your school group to fact-check nutrition forwards.'
  ],
};

// ─── MAIN COMPONENT ───
function C11_HomeScienceIndividualCommunicationVerbalSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_HOME_031,
  title = DEFAULT_PROPS.title || 'Communication & Extension Methods in Home Science',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['homesci'] || { name: 'Home Science', emoji: '🏡', color: 'emerald' };

  // ─── CORE APP STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ─── DISCOVERY & PREDICTION / OBSERVATION STATE ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // ─── INTERACTIVE SIMULATION LAB VARIABLES ───
  const [bodyLangScore, setBodyLangScore] = useState(55); // -55 to +55
  const [toneScore, setToneScore] = useState(38); // -38 to +38
  const [wordScore, setWordScore] = useState(7); // -7 to +7
  const [selectedGroupMethod, setSelectedGroupMethod] = useState<'discussion' | 'methodDemo' | 'resultDemo' | 'fieldTrip'>('discussion');
  const [mediaBudget, setMediaBudget] = useState(50); // ₹ 10-100k
  const [mediaLiteracy, setMediaLiteracy] = useState(60); // 10-100%
  const [gridElectricity, setGridElectricity] = useState(true);
  const [selectedSocialType, setSelectedSocialType] = useState<'network' | 'microblog' | 'video' | 'messaging'>('messaging');

  // ─── CHALLENGE INTERACTION STATE ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── REFLECTION RESPONSES ───
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: ''
  });

  // ─── FEEDBACK MODALS & BURSTS ───
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 200, y: 200 });

  // ─── REFS FOR BKT & TIMERS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── CALCULATED SIMULATION PROPERTIES ───
  const calculatedTrust = useMemo(() => {
    const raw = 50 + (bodyLangScore + toneScore + wordScore) * 0.5;
    return Math.max(0, Math.min(100, Math.round(raw)));
  }, [bodyLangScore, toneScore, wordScore]);

  const isCongruent = useMemo(() => {
    const allPositive = bodyLangScore > 10 && toneScore > 10 && wordScore > 0;
    const allNegative = bodyLangScore < -10 && toneScore < -10 && wordScore < 0;
    return allPositive || allNegative;
  }, [bodyLangScore, toneScore, wordScore]);

  const massMediaReachData = useMemo(() => {
    const radioScore = Math.min(100, Math.round(85 + mediaBudget * 0.15));
    const printScore = Math.min(100, Math.round((mediaLiteracy * 0.8) + (mediaBudget * 0.2)));
    const tvScore = gridElectricity ? Math.min(100, Math.round(40 + (mediaBudget * 0.5))) : 10;
    return { radioScore, printScore, tvScore };
  }, [mediaBudget, mediaLiteracy, gridElectricity]);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentChallengeItem = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD INITIAL MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPT DIFFICULTY ON SCORE UPDATE ───
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

  // ─── CANVAS 2D PARTICLE & SOUND WAVE ANIMATION LOOP ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;
    const particles = Array.from({ length: 24 }, (_, i) => ({
      x: (i * 20) % canvas.width,
      y: 20 + Math.sin(i) * 10,
      radius: 2 + Math.random() * 2,
      speed: 0.8 + Math.random() * 1.2
    }));

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      ctx.strokeStyle = isCongruent ? '#10b981' : '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 4) {
        const amplitude = isCongruent ? 12 : 5;
        const frequency = isCongruent ? 0.04 : 0.08;
        const y = (canvas.height / 2) + Math.sin(x * frequency + frame * 0.06) * amplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      particles.forEach((p, idx) => {
        p.x += p.speed;
        if (p.x > canvas.width) p.x = 0;
        ctx.fillStyle = idx % 2 === 0 ? '#38bdf8' : '#a855f7';
        ctx.beginPath();
        const py = (canvas.height / 2) + Math.sin(p.x * 0.04 + frame * 0.06) * 12;
        ctx.arc(p.x, py, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isCongruent]);

  // ─── CALLBACKS ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        if (currentChallengeItem.hints && currentChallengeItem.hints.length > 0) {
          setCurrentHint(currentChallengeItem.hints[0]);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak('Here is a hint to help you solve this communication challenge.');
        }
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, currentChallengeItem]);

  const showNextHint = useCallback(() => {
    const nextLvl = hintCount + 1;
    if (nextLvl <= 3 && currentChallengeItem.hints[nextLvl - 1]) {
      setCurrentHint(currentChallengeItem.hints[nextLvl - 1]);
      setShowHint(true);
      setHintCount(nextLvl);
      audioManager.play('hint');
      speechManager.speak(currentChallengeItem.hints[nextLvl - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      audioManager.play('pop');
      speechManager.speak('Let us study the complete explanation step by step.');
    }
  }, [hintCount, currentChallengeItem]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const correct = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryAnswered(true);
    audioManager.play(correct ? 'success' : 'error');
    speechManager.speak(correct ? 'Excellent insight!' : 'Notice how body language and attitude matter more than mere words.');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Communication Labs. Manipulate each channel to discover how ideas travel.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to test all communication variables in this open sandbox without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Now put your knowledge to the test with real-world community challenges.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now slide the controls to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const correct = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(correct ? 'success' : 'pop');
    speechManager.speak(correct ? 'Spot on observation!' : 'Look closely at how trust responds to congruence.');
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
      let current = [...prev];
      if (current.length === 0 && currentChallengeItem.sortItems) {
        current = currentChallengeItem.sortItems.map((_, i) => i);
      }
      const [moved] = current.splice(fromIndex, 1);
      current.splice(toIndex, 0, moved);
      return current;
    });
  }, [currentChallengeItem]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Communication & Extension mastery module.');
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
    resetInactivityTimer();
  }, [currentChallenge, filteredChallenges.length, handleComplete, resetInactivityTimer]);

  const handleAnswer = useCallback((ans: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (currentChallengeItem.type === 'classify' || currentChallengeItem.type === 'distinguish' || currentChallengeItem.type === 'match') {
      isCorrect = ans === currentChallengeItem.correctIndex;
    } else if (currentChallengeItem.type === 'drag-label') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(currentChallengeItem.correctMapping);
    } else if (currentChallengeItem.type === 'drag-sort') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(currentChallengeItem.correctOrder);
    } else if (currentChallengeItem.type === 'numeric') {
      const num = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
      isCorrect = Math.abs(num - (currentChallengeItem.correctAnswer || 0)) <= (currentChallengeItem.tolerance || 0);
    } else if (currentChallengeItem.type === 'construct') {
      isCorrect = (ans as string).trim() === currentChallengeItem.targetState?.trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding analysis.');
      setShowConfetti(true);
      setShowSparkle(true);
      setSparklePos({ x: 300, y: 250 });
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(currentChallengeItem.nodeId, currentChallengeItem.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${currentChallengeItem.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${currentChallengeItem.nodeId}`, JSON.stringify({ score: 100, timestamp: Date.now() }));
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
        speechManager.speak('Let us review the underlying Home Science principles.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(currentChallengeItem.nodeId, currentChallengeItem.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${currentChallengeItem.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [currentChallengeItem, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  const handleGroupMethodSelect = useCallback((method: 'discussion' | 'methodDemo' | 'resultDemo' | 'fieldTrip') => {
    setSelectedGroupMethod(method);
    audioManager.play('tap');
  }, []);

  const handleToggleElectricity = useCallback(() => {
    setGridElectricity(g => !g);
    audioManager.play('tap');
  }, []);

  const handleSocialTypeSelect = useCallback((t: 'network' | 'microblog' | 'video' | 'messaging') => {
    setSelectedSocialType(t);
    audioManager.play('tap');
  }, []);

  // ─── CLEANUP TIMERS ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      
      {/* ─── HEADER / TOP NAV ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-700/50 shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800">
                ISC Class 11 Home Science
              </span>
              <span className="text-xs text-slate-400">Communication & Extension</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase / Mode indicators */}
        <nav aria-label="Simulation Modes" className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <button
              key={p}
              aria-label={`Switch to ${p} mode`}
              disabled={phase === 'complete'}
              onClick={() => {
                if (p === 'discovery') setPhase('discovery');
                if (p === 'explore') handleAdvanceToExploration();
                if (p === 'sandbox') handleAdvanceToSandbox();
                if (p === 'challenge') handleAdvanceToChallenge();
              }}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                phase === p
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {p.toUpperCase()}
            </button>
          ))}
        </nav>
      </motion.header>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Scenario Card */}
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="p-6 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 rounded-3xl border border-emerald-800/40 shadow-xl"
            >
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                <span>🌟</span> COMMUNITY EXTENSION SCENARIO
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">{SCENARIO.intro}</p>
              <p className="text-xs md:text-sm text-emerald-300/80 mt-3 p-3 bg-emerald-950/50 rounded-xl border border-emerald-900/50">
                📌 <strong>Mission Context:</strong> {SCENARIO.context}
              </p>
            </motion.div>

            {/* Hook Question Card */}
            <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider">Curiosity Challenge</span>
              <h3 className="text-lg md:text-xl font-bold text-white mt-1 mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    aria-label={`Option ${String.fromCharCode(65 + idx)}: ${option}`}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    disabled={discoveryAnswered}
                    onClick={() => handleDiscoveryAnswer(idx)}
                    className={`p-4 rounded-2xl text-left text-sm font-medium transition-all ${
                      discoveryAnswered
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-900/70 border-2 border-emerald-500 text-white'
                          : 'bg-slate-800/50 text-slate-400 border border-slate-700/50'
                        : 'bg-slate-800/90 hover:bg-slate-750 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>
                        {discoveryAnswered && (idx === DISCOVERY_QUESTION.correctIndex ? '✓ ' : '✗ ')}
                        {option}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-slate-800/80 rounded-2xl border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4"
                >
                  <p className="text-sm text-slate-300">{DISCOVERY_QUESTION.hintAfter}</p>
                  <motion.button
                    aria-label="Begin Interactive Labs"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shrink-0 shadow-lg shadow-emerald-900/50 flex items-center gap-2"
                  >
                    <span>Begin Interactive Labs</span>
                    <span>→</span>
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 2. EXPLORATION PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div
            key="explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Navigation Tabs for 5 Steps */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  aria-label={`Go to Lab ${idx + 1}: ${step.title}`}
                  onClick={() => {
                    setCurrentSlide(idx);
                    audioManager.play('tap');
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    currentSlide === idx
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-slate-800 text-[10px] flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span>{step.title.split('.')[1] || step.title}</span>
                </button>
              ))}
            </div>

            {/* Main Interactive Slide Content */}
            <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-emerald-400">🔬 Lab {currentSlide + 1}:</span>
                  {EXPLORATION_STEPS[currentSlide].title}
                </h2>
                <span className="text-xs text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </span>
              </div>

              {/* ─── INTERACTIVE STEP 1: Mehrabian 7-38-55 Model ─── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* SVG 1: Mehrabian Character & Trust Resonance Gauge */}
                    <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center">
                      <svg viewBox="0 0 400 260" className="w-full max-w-sm" aria-label="Mehrabian Communication Alignment Model">
                        {/* Extension Worker Character */}
                        <g transform="translate(80, 40)">
                          <circle cx="50" cy="40" r="28" fill={bodyLangScore > 0 ? '#10b981' : '#f43f5e'} opacity="0.3" />
                          <circle cx="50" cy="40" r="22" fill="#fed7aa" />
                          <circle cx="43" cy="38" r="2.5" fill="#1e293b" />
                          <circle cx="57" cy="38" r="2.5" fill="#1e293b" />
                          <path
                            d={bodyLangScore > 0 ? 'M 40 48 Q 50 56 60 48' : 'M 40 54 Q 50 46 60 54'}
                            stroke="#1e293b"
                            strokeWidth="2.5"
                            fill="none"
                            strokeLinecap="round"
                          />
                          {bodyLangScore > 0 ? (
                            <path d="M 30 75 Q 50 65 70 75 L 55 95 L 45 95 Z" fill="#38bdf8" />
                          ) : (
                            <path d="M 25 75 L 75 75 L 70 95 L 30 95 Z" fill="#f43f5e" />
                          )}
                          <text x="50" y="125" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="bold">
                            Anganwadi Worker
                          </text>
                        </g>

                        {/* Mother Character */}
                        <g transform="translate(230, 40)">
                          <circle cx="50" cy="40" r="22" fill="#fbcfe8" />
                          <circle cx="43" cy="38" r="2.5" fill="#1e293b" />
                          <circle cx="57" cy="38" r="2.5" fill="#1e293b" />
                          <path
                            d={calculatedTrust > 50 ? 'M 40 48 Q 50 56 60 48' : 'M 40 54 Q 50 48 60 54'}
                            stroke="#1e293b"
                            strokeWidth="2.5"
                            fill="none"
                          />
                          <path d="M 30 75 Q 50 70 70 75 L 65 110 L 35 110 Z" fill="#ec4899" />
                          <text x="50" y="125" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="bold">
                            Rural Mother
                          </text>
                        </g>

                        {/* Trust Resonance Meter */}
                        <g transform="translate(40, 180)">
                          <rect x="0" y="0" width="320" height="24" rx="12" fill="#1e293b" />
                          <motion.rect
                            x="2"
                            y="2"
                            height="20"
                            rx="10"
                            animate={{ width: `${(calculatedTrust / 100) * 316}px` }}
                            fill={calculatedTrust > 70 ? '#10b981' : calculatedTrust > 40 ? '#f59e0b' : '#ef4444'}
                          />
                          <text x="160" y="16" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                            Mother’s Trust & Receptivity: {calculatedTrust}%
                          </text>
                        </g>

                        <text x="200" y="235" textAnchor="middle" fill={isCongruent ? '#34d399' : '#f87171'} fontSize="11">
                          {isCongruent ? '✓ Congruent Channels (Trust Multiplied)' : '✗ Incongruent Signal (Conflicting Cues)'}
                        </text>
                      </svg>

                      {/* 2D Canvas Wave Display */}
                      <div className="w-full mt-3">
                        <canvas ref={canvasRef} width={360} height={40} className="w-full bg-slate-900 rounded-xl" />
                      </div>
                    </div>

                    {/* Interactive Real-time Sliders */}
                    <div className="lg:col-span-6 space-y-4">
                      {/* Body Language Slider */}
                      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span className="text-emerald-400">1. Body Language (55% weight)</span>
                          <span>{bodyLangScore > 0 ? '+Namaste / Eye Contact' : '-Crossed Arms / Phone Scrolling'}</span>
                        </div>
                        <input
                          type="range"
                          min={-55}
                          max={55}
                          value={bodyLangScore}
                          aria-label="Adjust Body Language score"
                          onChange={(e) => setBodyLangScore(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                      </div>

                      {/* Tone Slider */}
                      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span className="text-sky-400">2. Paralanguage / Tone (38% weight)</span>
                          <span>{toneScore > 0 ? '+Gentle & Patient' : '-Harsh & Rushed'}</span>
                        </div>
                        <input
                          type="range"
                          min={-38}
                          max={38}
                          value={toneScore}
                          aria-label="Adjust Tone and Paralanguage score"
                          onChange={(e) => setToneScore(Number(e.target.value))}
                          className="w-full accent-sky-500 cursor-pointer"
                        />
                      </div>

                      {/* Spoken Word Slider */}
                      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span className="text-purple-400">3. Spoken Words (7% weight)</span>
                          <span>{wordScore > 0 ? '+Simple Mother Tongue' : '-Complex Technical Jargon'}</span>
                        </div>
                        <input
                          type="range"
                          min={-7}
                          max={7}
                          value={wordScore}
                          aria-label="Adjust Spoken Words score"
                          onChange={(e) => setWordScore(Number(e.target.value))}
                          className="w-full accent-purple-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Predict & Observe Interactive Module */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    {!predictionMade ? (
                      <div>
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Step 1: Predict</span>
                        <p className="text-sm font-semibold text-white mt-1 mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              aria-label={`Predict option ${i + 1}`}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handlePrediction(i)}
                              className="p-2.5 text-xs text-left bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-200 border border-slate-700"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Step 2: Observation & Discovery</span>
                        <p className="text-xs text-slate-300 mt-1 mb-3">
                          Notice that even if words are 100% correct (+7), a hostile posture (-55) collapses overall trust below 25%!
                        </p>
                        {!observationAnswered ? (
                          <div className="space-y-2">
                            <p className="text-xs font-bold text-white">{OBSERVATION_QUESTIONS[0].question}</p>
                            {OBSERVATION_QUESTIONS[0].observableOptions.map((obs, i) => (
                              <motion.button
                                key={i}
                                aria-label={`Observation option ${i + 1}`}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => handleObservation(i)}
                                className="block w-full p-2 text-xs text-left bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300"
                              >
                                {obs}
                              </motion.button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-emerald-400 font-bold bg-emerald-950/60 p-2 rounded-lg border border-emerald-800">
                            ✓ Excellent! Congruence between words and non-verbal cues is essential for behavioral adoption in Indian families.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── INTERACTIVE STEP 2: Verbal vs Non-Verbal Classifier ─── */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  {/* SVG 2: Extension Communication Channel Architecture */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 600 160" className="w-full max-w-2xl" aria-label="Extension Communication Channels Architecture">
                      {/* Sender Node */}
                      <rect x="20" y="45" width="100" height="70" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                      <text x="70" y="75" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">SENDER</text>
                      <text x="70" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">ICDS / CDPO</text>

                      {/* Encoding Path */}
                      <path d="M 120 80 L 190 80" stroke="#38bdf8" strokeWidth="2" />

                      {/* 3 Channel Boxes */}
                      <g transform="translate(195, 15)">
                        <rect x="0" y="0" width="190" height="38" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                        <text x="95" y="24" textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="bold">Spoken Verbal (Words + Voice)</text>
                      </g>

                      <g transform="translate(195, 60)">
                        <rect x="0" y="0" width="190" height="38" rx="8" fill="#3b0764" stroke="#c084fc" strokeWidth="1.5" />
                        <text x="95" y="24" textAnchor="middle" fill="#f3e8ff" fontSize="11" fontWeight="bold">Written Verbal (Leaflets/Charts)</text>
                      </g>

                      <g transform="translate(195, 105)">
                        <rect x="0" y="0" width="190" height="38" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
                        <text x="95" y="24" textAnchor="middle" fill="#d1fae5" fontSize="11" fontWeight="bold">Non-Verbal (Kinesics / Proxemics)</text>
                      </g>

                      {/* Decoding Path */}
                      <path d="M 390 80 L 460 80" stroke="#38bdf8" strokeWidth="2" />

                      {/* Receiver Node */}
                      <rect x="465" y="45" width="115" height="70" rx="10" fill="#0f172a" stroke="#ec4899" strokeWidth="2" />
                      <text x="522" y="75" textAnchor="middle" fill="#f472b6" fontSize="12" fontWeight="bold">RECEIVER</text>
                      <text x="522" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">Mother / Family</text>
                    </svg>
                  </div>

                  <p className="text-sm text-slate-300">
                    Verbal communication is defined by the use of <strong>words</strong> (spoken OR written). Non-verbal conveys meaning without words.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Spoken Verbal */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-sky-800/40">
                      <h3 className="text-sky-400 font-bold text-sm mb-2 flex items-center gap-2">
                        <span>🗣️</span> Spoken Verbal
                      </h3>
                      <ul className="text-xs space-y-2 text-slate-300">
                        <li className="p-2 bg-slate-900 rounded-lg">• Face-to-face dietary counselling</li>
                        <li className="p-2 bg-slate-900 rounded-lg">• Phone calls to adolescent girls</li>
                        <li className="p-2 bg-slate-900 rounded-lg">• Spoken explanations in local dialect</li>
                      </ul>
                    </div>

                    {/* Written Verbal */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-purple-800/40">
                      <h3 className="text-purple-400 font-bold text-sm mb-2 flex items-center gap-2">
                        <span>📝</span> Written Verbal
                      </h3>
                      <ul className="text-xs space-y-2 text-slate-300">
                        <li className="p-2 bg-slate-900 rounded-lg">• ICDS weaning recipe leaflets</li>
                        <li className="p-2 bg-slate-900 rounded-lg">• WhatsApp text announcements</li>
                        <li className="p-2 bg-slate-900 rounded-lg">• Written growth chart reports</li>
                      </ul>
                    </div>

                    {/* Non-Verbal */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-800/40">
                      <h3 className="text-emerald-400 font-bold text-sm mb-2 flex items-center gap-2">
                        <span>🤝</span> Non-Verbal
                      </h3>
                      <ul className="text-xs space-y-2 text-slate-300">
                        <li className="p-2 bg-slate-900 rounded-lg">• Namaste & taking off footwear</li>
                        <li className="p-2 bg-slate-900 rounded-lg">• Paralanguage (pitch, pauses, cadence)</li>
                        <li className="p-2 bg-slate-900 rounded-lg">• Proxemics (sitting at eye level on floor)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── INTERACTIVE STEP 3: Group Methods Workshop ─── */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  {/* SVG 3: Method vs Result Demonstration Architecture */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 600 150" className="w-full max-w-2xl" aria-label="Method vs Result Demonstration Comparison">
                      {/* Method Demonstration Box */}
                      <g transform="translate(30, 20)">
                        <rect x="0" y="0" width="250" height="110" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                        <text x="125" y="30" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">🥣 METHOD DEMO</text>
                        <text x="125" y="55" textAnchor="middle" fill="#cbd5e1" fontSize="10">Skill Transfer ("How to Cook")</text>
                        <rect x="30" y="70" width="190" height="25" rx="6" fill="#0284c7" opacity="0.3" />
                        <text x="125" y="87" textAnchor="middle" fill="#7dd3fc" fontSize="10">Step-by-step Weaning Food</text>
                      </g>

                      {/* Result Demonstration Box */}
                      <g transform="translate(320, 20)">
                        <rect x="0" y="0" width="250" height="110" rx="12" fill="#0f172a" stroke="#34d399" strokeWidth="2" />
                        <text x="125" y="30" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">🌱 RESULT DEMO</text>
                        <text x="125" y="55" textAnchor="middle" fill="#cbd5e1" fontSize="10">Proof of Impact ("Seeing is Believing")</text>
                        <rect x="30" y="70" width="190" height="25" rx="6" fill="#059669" opacity="0.3" />
                        <text x="125" y="87" textAnchor="middle" fill="#6ee7b7" fontSize="10">Harvested Nutrition Garden Plot</text>
                      </g>
                    </svg>
                  </div>

                  {/* Selector Tabs */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { key: 'discussion', label: 'Group Discussion', icon: '💬' },
                      { key: 'methodDemo', label: 'Method Demo', icon: '🥣' },
                      { key: 'resultDemo', label: 'Result Demo', icon: '🌱' },
                      { key: 'fieldTrip', label: 'Field Trip', icon: '🚌' }
                    ].map(tab => (
                      <button
                        key={tab.key}
                        aria-label={`Select group method ${tab.label}`}
                        onClick={() => handleGroupMethodSelect(tab.key as 'discussion' | 'methodDemo' | 'resultDemo' | 'fieldTrip')}
                        className={`p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                          selectedGroupMethod === tab.key
                            ? 'bg-emerald-600 text-white shadow-lg'
                            : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        <span>{tab.icon}</span>
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Interactive Dynamic Method Inspector */}
                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800">
                    {selectedGroupMethod === 'discussion' && (
                      <div className="space-y-3">
                        <h3 className="text-emerald-400 font-bold text-base">Group Discussion (8–30 Members)</h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Facilitator guides a 2-way participatory exchange. Excellent for breaking food taboos, discussing complementary feeding, and building democratic consensus in Mahila Mandals.
                        </p>
                        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2">
                          <div className="p-2 bg-slate-900 rounded-lg"><span className="text-slate-400">Reach:</span> <strong className="text-white">Medium</strong></div>
                          <div className="p-2 bg-slate-900 rounded-lg"><span className="text-slate-400">Cost:</span> <strong className="text-emerald-400">Very Low</strong></div>
                          <div className="p-2 bg-slate-900 rounded-lg"><span className="text-slate-400">Feedback:</span> <strong className="text-sky-400">Immediate 2-Way</strong></div>
                        </div>
                      </div>
                    )}

                    {selectedGroupMethod === 'methodDemo' && (
                      <div className="space-y-3">
                        <h3 className="text-sky-400 font-bold text-base">Method Demonstration ("How to Do")</h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          The extension worker cooks or demonstrates a procedure step-by-step using local affordable materials (e.g. preparing sprouted ragi & roasted moong laddoo for anaemia prevention).
                        </p>
                        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2">
                          <div className="p-2 bg-slate-900 rounded-lg"><span className="text-slate-400">Skill Transfer:</span> <strong className="text-emerald-400">Maximum</strong></div>
                          <div className="p-2 bg-slate-900 rounded-lg"><span className="text-slate-400">Materials:</span> <strong className="text-white">Local / Low-Cost</strong></div>
                          <div className="p-2 bg-slate-900 rounded-lg"><span className="text-slate-400">Replication:</span> <strong className="text-sky-400">Immediate Hands-on</strong></div>
                        </div>
                      </div>
                    )}

                    {selectedGroupMethod === 'resultDemo' && (
                      <div className="space-y-3">
                        <h3 className="text-amber-400 font-bold text-base">Result Demonstration ("Seeing is Believing")</h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Displays the proven outcome of an adopted practice (e.g. a thriving organic kitchen garden providing spinach and carrots for a family's daily iron requirement).
                        </p>
                        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2">
                          <div className="p-2 bg-slate-900 rounded-lg"><span className="text-slate-400">Purpose:</span> <strong className="text-amber-400">Proof of Concept</strong></div>
                          <div className="p-2 bg-slate-900 rounded-lg"><span className="text-slate-400">Timeframe:</span> <strong className="text-white">Long-term Growth</strong></div>
                          <div className="p-2 bg-slate-900 rounded-lg"><span className="text-slate-400">Motivation:</span> <strong className="text-emerald-400">High Trust</strong></div>
                        </div>
                      </div>
                    )}

                    {selectedGroupMethod === 'fieldTrip' && (
                      <div className="space-y-3">
                        <h3 className="text-purple-400 font-bold text-base">Field Trip (Educational Study Tour)</h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Organized group excursion to a model site (e.g. KVIC handloom cluster or POSHAN community kitchen). Combines pre-visit worksheets, interviews, and post-trip reporting.
                        </p>
                        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2">
                          <div className="p-2 bg-slate-900 rounded-lg"><span className="text-slate-400">Experiential:</span> <strong className="text-purple-400">Highest</strong></div>
                          <div className="p-2 bg-slate-900 rounded-lg"><span className="text-slate-400">Planning:</span> <strong className="text-amber-400">Logistics & Safety</strong></div>
                          <div className="p-2 bg-slate-900 rounded-lg"><span className="text-slate-400">Expense:</span> <strong className="text-rose-400">Moderate/High</strong></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── INTERACTIVE STEP 4: Mass Media Simulator ─── */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Control Sliders with real-time feedback */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>Campaign Budget:</span>
                          <span className="text-emerald-400">₹{mediaBudget}k</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          value={mediaBudget}
                          aria-label="Adjust Campaign Budget slider"
                          onChange={(e) => setMediaBudget(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>Target Population Literacy:</span>
                          <span className="text-sky-400">{mediaLiteracy}%</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          value={mediaLiteracy}
                          aria-label="Adjust Target Population Literacy slider"
                          onChange={(e) => setMediaLiteracy(Number(e.target.value))}
                          className="w-full accent-sky-500 cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                        <span className="text-xs font-bold text-slate-300">Rural Grid Electricity:</span>
                        <button
                          aria-label="Toggle Rural Grid Electricity Status"
                          onClick={handleToggleElectricity}
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${
                            gridElectricity ? 'bg-emerald-600 text-white' : 'bg-rose-900/80 text-rose-200'
                          }`}
                        >
                          {gridElectricity ? '✓ Active' : '✗ Off-Grid'}
                        </button>
                      </div>
                    </div>

                    {/* Real-time Dynamic Coverage Gauges */}
                    <div className="md:col-span-2 p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Estimated Population Penetration</h3>

                      {/* Radio Gauge */}
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-200 mb-1">
                          <span>📻 All India Radio (Akashvani):</span>
                          <span className="text-emerald-400">{massMediaReachData.radioScore}%</span>
                        </div>
                        <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-emerald-500"
                            animate={{ width: `${massMediaReachData.radioScore}%` }}
                          />
                        </div>
                      </div>

                      {/* Print Gauge */}
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-200 mb-1">
                          <span>📰 Print (Newspapers & Poshan Posters):</span>
                          <span className="text-sky-400">{massMediaReachData.printScore}%</span>
                        </div>
                        <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-sky-500"
                            animate={{ width: `${massMediaReachData.printScore}%` }}
                          />
                        </div>
                      </div>

                      {/* TV Gauge */}
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-200 mb-1">
                          <span>📺 Television (DD Kisan / National):</span>
                          <span className="text-purple-400">{massMediaReachData.tvScore}%</span>
                        </div>
                        <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-purple-500"
                            animate={{ width: `${massMediaReachData.tvScore}%` }}
                          />
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-400 pt-2">
                        💡 <em>Key Takeaway:</em> Radio penetrates low-literacy, off-grid regions effortlessly, while print posters provide permanent visual references at the Anganwadi centre.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── INTERACTIVE STEP 5: Social Media Matrix ─── */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  {/* Category Buttons */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { key: 'messaging', label: 'Messaging Apps', sub: 'WhatsApp, Telegram', icon: '📲' },
                      { key: 'video', label: 'Video Sharing', sub: 'YouTube, Reels, Moj', icon: '▶️' },
                      { key: 'network', label: 'Social Networks', sub: 'Facebook, LinkedIn', icon: '🌐' },
                      { key: 'microblog', label: 'Microblogging', sub: 'X (Twitter), Koo', icon: '🐦' }
                    ].map(st => (
                      <button
                        key={st.key}
                        aria-label={`Select social media type ${st.label}`}
                        onClick={() => handleSocialTypeSelect(st.key as 'network' | 'microblog' | 'video' | 'messaging')}
                        className={`p-3 rounded-2xl text-left transition-all ${
                          selectedSocialType === st.key
                            ? 'bg-emerald-600 text-white shadow-lg'
                            : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xl mb-1">{st.icon}</div>
                        <div className="text-xs font-bold">{st.label}</div>
                        <div className="text-[10px] opacity-80">{st.sub}</div>
                      </button>
                    ))}
                  </div>

                  {/* Dynamic Inspector */}
                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">🌟 Extension Advantages</span>
                        <ul className="text-xs text-slate-300 space-y-1.5">
                          <li>• Two-way participatory feedback between mothers and health workers</li>
                          <li>• Direct marketing for rural weavers (Chanderi sarees on Instagram)</li>
                          <li>• Instant distribution of iron-rich recipes and POSHAN updates</li>
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">⚠️ Disadvantages & Safeguards</span>
                        <ul className="text-xs text-slate-300 space-y-1.5">
                          <li>• Rapid viral spread of unverified health myths & fake cures</li>
                          <li>• Screen addiction and adolescent anxiety (NMHS 2015-16 data)</li>
                          <li>• Requires digital literacy and source verification habit</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Slide Navigation Footer */}
            <div className="flex items-center justify-between">
              <motion.button
                aria-label="Previous Lab Slide"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentSlide === 0}
                onClick={() => {
                  setCurrentSlide(s => Math.max(0, s - 1));
                  audioManager.play('tap');
                }}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl text-xs font-bold transition-all"
              >
                ← Previous Lab
              </motion.button>

              <span className="text-xs font-bold text-slate-400">
                Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  aria-label="Next Lab Slide"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(s => s + 1);
                    audioManager.play('whoosh');
                  }}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950 transition-all"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  aria-label="Enter Free Sandbox Mode"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-sky-950 transition-all flex items-center gap-2"
                >
                  <span>Enter Free Sandbox</span>
                  <span>→</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 3. SANDBOX PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Free Exploration Mode</span>
                <h2 className="text-xl font-bold text-white mt-0.5">Community Extension Simulator Sandbox</h2>
                <p className="text-xs text-slate-300 mt-1">
                  Experiment freely with multi-channel variables. Test how communication mode, literacy, and non-verbal congruence interact!
                </p>
              </div>

              <motion.button
                aria-label="Proceed to Board Challenges"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-xl shadow-emerald-950 flex items-center gap-2 shrink-0"
              >
                <span>Ready for Board Challenges!</span>
                <span>🏆</span>
              </motion.button>
            </div>

            {/* Sandbox 2-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Interpersonal Congruence */}
              <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <span>🤝</span> Interpersonal Trust Sandbox
                </h3>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Kinesics & Eye Contact:</span>
                    <span className="font-bold">{bodyLangScore}</span>
                  </div>
                  <input
                    type="range"
                    min={-55}
                    max={55}
                    value={bodyLangScore}
                    aria-label="Adjust Kinesics and Eye Contact score"
                    onChange={(e) => setBodyLangScore(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Paralanguage / Warmth:</span>
                    <span className="font-bold">{toneScore}</span>
                  </div>
                  <input
                    type="range"
                    min={-38}
                    max={38}
                    value={toneScore}
                    aria-label="Adjust Paralanguage and Warmth score"
                    onChange={(e) => setToneScore(Number(e.target.value))}
                    className="w-full accent-sky-500 cursor-pointer"
                  />
                </div>

                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-300">Composite Mother Trust:</span>
                  <span className="text-lg font-black text-emerald-400">{calculatedTrust}%</span>
                </div>
              </div>

              {/* Right Column: Mass Media Reach */}
              <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2">
                  <span>📡</span> Mass Reach Sandbox
                </h3>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>District Literacy Rate:</span>
                    <span className="font-bold">{mediaLiteracy}%</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={mediaLiteracy}
                    aria-label="Adjust District Literacy Rate"
                    onChange={(e) => setMediaLiteracy(Number(e.target.value))}
                    className="w-full accent-sky-500 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2">
                  <div className="p-3 bg-slate-900 rounded-xl">
                    <div className="text-slate-400">Radio</div>
                    <div className="text-emerald-400 font-bold text-sm mt-1">{massMediaReachData.radioScore}%</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl">
                    <div className="text-slate-400">Print</div>
                    <div className="text-sky-400 font-bold text-sm mt-1">{massMediaReachData.printScore}%</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl">
                    <div className="text-slate-400">Television</div>
                    <div className="text-purple-400 font-bold text-sm mt-1">{massMediaReachData.tvScore}%</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 4. CHALLENGE PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Challenge Progress Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-slate-400">
                  Question {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : difficulty === 'standard'
                      ? 'bg-sky-950 text-sky-400 border border-sky-800'
                      : 'bg-purple-950 text-purple-400 border border-purple-800'
                  }`}
                >
                  {difficulty} TIER
                </motion.span>
                <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-800">
                  NEP: {currentChallengeItem.competencyLevel.toUpperCase()}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-36 h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-sky-500"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Main Question Card */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={wrongShake ? { duration: 0.4 } : {}}
              className={`p-6 md:p-8 rounded-3xl transition-colors border shadow-2xl ${
                wrongFlash
                  ? 'bg-rose-950/70 border-rose-600'
                  : 'bg-slate-900/95 border-slate-800'
              }`}
            >
              <h3 className="text-lg md:text-xl font-bold text-white mb-6 leading-snug">
                {currentChallengeItem.question}
              </h3>

              {/* ── MCQ Options ── */}
              {(currentChallengeItem.type === 'classify' || currentChallengeItem.type === 'distinguish' || currentChallengeItem.type === 'match') && currentChallengeItem.options && (
                <div className="space-y-3">
                  {currentChallengeItem.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      disabled={showExplanation || answerRevealed}
                      onClick={() => handleAnswer(i)}
                      className={`w-full p-4 rounded-2xl text-left text-sm font-medium transition-all flex items-start gap-3 border ${
                        showExplanation && i === currentChallengeItem.correctIndex
                          ? 'bg-emerald-900/70 border-emerald-500 text-white'
                          : 'bg-slate-950/80 hover:bg-slate-800/80 text-slate-200 border-slate-800'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="leading-relaxed">
                        {showExplanation && (i === currentChallengeItem.correctIndex ? '✓ ' : '✗ ')}
                        {opt}
                      </span>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* ── Drag & Drop Label Mapping ── */}
              {currentChallengeItem.type === 'drag-label' && currentChallengeItem.dragItems && (
                <div className="space-y-6">
                  {/* Palette of draggable tokens */}
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-400 w-full mb-1">Drag items to their targets:</span>
                    {currentChallengeItem.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        role="button"
                        tabIndex={0}
                        aria-label={`Draggable item: ${item.label}`}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 rounded-xl text-xs font-bold text-white cursor-grab shadow-md"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  {/* Drop Targets */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentChallengeItem.dragItems.map((item, i) => (
                      <div
                        key={i}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(item.targetId)}
                        className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 flex items-center justify-between min-h-[60px]"
                      >
                        <span className="text-xs text-slate-400 font-semibold">{item.targetId.replace('target_', '').replace('strat_', '').toUpperCase()}:</span>
                        <span className={`text-xs font-bold px-3 py-1 rounded-lg ${
                          droppedLabels[item.targetId] ? 'bg-emerald-600 text-white' : 'text-slate-500 italic'
                        }`}>
                          {droppedLabels[item.targetId] ? `✓ ${droppedLabels[item.targetId]}` : 'Drop label here'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    aria-label="Check Diagram Mapping"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={showExplanation}
                    onClick={() => handleAnswer(droppedLabels)}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg"
                  >
                    Check Diagram Mapping
                  </motion.button>
                </div>
              )}

              {/* ── Drag & Drop Sort / Sequence ── */}
              {currentChallengeItem.type === 'drag-sort' && currentChallengeItem.sortItems && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">Drag to re-order into the correct chronological sequence:</p>
                  <div className="space-y-2">
                    {(sortArrangement.length === currentChallengeItem.sortItems.length
                      ? sortArrangement.map(idx => currentChallengeItem.sortItems![idx])
                      : currentChallengeItem.sortItems
                    ).map((item, displayIdx) => (
                      <motion.div
                        key={displayIdx}
                        role="button"
                        tabIndex={0}
                        aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                        draggable
                        onDragStart={() => handleDragStart(String(displayIdx))}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          const fromIdx = parseInt(draggedItem || '0');
                          handleSortMove(fromIdx, displayIdx);
                        }}
                        whileHover={{ scale: 1.01 }}
                        className="p-3 bg-slate-950 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 text-[10px] flex items-center justify-center font-bold">
                          {displayIdx + 1}
                        </span>
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    aria-label="Verify Sequence"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={showExplanation}
                    onClick={() => {
                      const ans = sortArrangement.length > 0 ? sortArrangement : (currentChallengeItem.sortItems?.map((_, i) => i) || []);
                      handleAnswer(ans);
                    }}
                    className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs shadow-lg"
                  >
                    Verify Sequence
                  </motion.button>
                </div>
              )}

              {/* ── Numeric Input ── */}
              {currentChallengeItem.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      aria-label="Enter numeric answer"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter value"
                      className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                    />
                    <span className="text-xs font-bold text-slate-400">{currentChallengeItem.unit}</span>
                    <motion.button
                      aria-label="Submit Calculation"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={showExplanation || !numericInput}
                      onClick={() => handleAnswer(numericInput)}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg"
                    >
                      Submit Calculation
                    </motion.button>
                  </div>
                </div>
              )}

              {/* ── Constructive Assembly ── */}
              {currentChallengeItem.type === 'construct' && currentChallengeItem.availableParts && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">{currentChallengeItem.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {currentChallengeItem.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        aria-label={`Add component ${part}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setConstructParts(p => [...p, part])}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium border border-slate-700"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[80px]">
                    <div className="flex flex-wrap gap-2">
                      {constructParts.map((p, idx) => (
                        <div key={idx} className="px-3 py-1 bg-emerald-900/70 border border-emerald-600 text-white text-xs rounded-lg flex items-center gap-2">
                          <span>{p}</span>
                          <button
                            aria-label={`Remove component ${p}`}
                            onClick={() => setConstructParts(parts => parts.filter((_, i) => i !== idx))}
                            className="text-rose-400 hover:text-rose-200"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      {constructParts.length === 0 && (
                        <span className="text-xs text-slate-600 italic">Click the strategy components above to assemble your answer</span>
                      )}
                    </div>
                  </div>

                  <motion.button
                    aria-label="Check Strategy Assembly"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={showExplanation || constructParts.length === 0}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg"
                  >
                    Check Strategy Assembly
                  </motion.button>
                </div>
              )}

              {/* ── Step-by-Step Explanation & Progressive Disclosure ── */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-slate-950/90 rounded-2xl border border-emerald-800/60 space-y-3"
                >
                  <div className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <span>💡</span> ISC Extension Explanation:
                  </div>

                  {currentChallengeItem.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-300 leading-relaxed"
                    >
                      <strong className="text-emerald-400">Step {idx + 1}:</strong> {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                  {revealedSteps < currentChallengeItem.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Reveal next step in explanation"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold border border-slate-700"
                    >
                      Reveal Next Insight →
                    </motion.button>
                  ) : (
                    <div className="pt-2">
                      <motion.button
                        aria-label="Next Question"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg flex items-center gap-2"
                      >
                        <span>{currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Next Question →'}</span>
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 5. COMPLETION, REFLECTION & MASTERY SUMMARY ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Completion Hero Banner */}
            <div className="p-8 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-900 rounded-3xl border border-emerald-700/60 shadow-2xl text-center space-y-3">
              <div className="text-5xl">🏆</div>
              <h2 className="text-2xl md:text-3xl font-black text-white">Community Extension Module Mastered!</h2>
              <p className="text-sm text-slate-300 max-w-2xl mx-auto">
                Final Score: <strong className="text-emerald-400 font-bold">{Math.max(0, 100 - errors * 5)}%</strong> | Mastery Tier: <strong className="text-sky-400 capitalize">{masteryLevel}</strong>
              </p>
            </div>

            {/* Personalized Motivational Feedback */}
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800">
              <h3 className="text-sm font-bold text-emerald-400 mb-2">Performance Assessment</h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {errors === 0
                  ? 'PERFECT SCORE! You have mastered the four tiers of Home Science communication (Individual, Group, Mass, and Social Media) with complete congruence!'
                  : errors <= 3
                  ? 'Excellent Performance! You have a strong grasp of Mehrabian congruence, group demonstrations, and mass media channel selection.'
                  : 'Commendable effort! Review your misconception profile below to ensure full alignment with ISC examination guidelines.'}
              </p>
            </div>

            {/* ─── REFLECTION SECTION ─── */}
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                <span>🤔</span> Personal Extension Reflection
              </h3>
              <p className="text-xs text-slate-400">
                Consolidate your learning by answering these three key reflection prompts:
              </p>

              <div className="space-y-3">
                <div>
                  <label htmlFor="surprising-input" className="block text-xs font-bold text-slate-200 mb-1">
                    1. What was the most surprising thing you learned?
                  </label>
                  <textarea
                    id="surprising-input"
                    aria-label="What was the most surprising thing you learned?"
                    rows={2}
                    value={reflectionAnswers.surprising}
                    onChange={(e) => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                    placeholder="E.g., How 55% of emotional trust comes from body language rather than spoken words..."
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor="explain-input" className="block text-xs font-bold text-slate-200 mb-1">
                    2. How would you explain this to a friend?
                  </label>
                  <textarea
                    id="explain-input"
                    aria-label="How would you explain this to a friend?"
                    rows={2}
                    value={reflectionAnswers.explain}
                    onChange={(e) => setReflectionAnswers(prev => ({ ...prev, explain: e.target.value }))}
                    placeholder="E.g., In extension work, showing someone how to cook with local pots works 10x better than preaching..."
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor="real-life-input" className="block text-xs font-bold text-slate-200 mb-1">
                    3. Where in real life might you use this?
                  </label>
                  <textarea
                    id="real-life-input"
                    aria-label="Where in real life might you use this?"
                    rows={2}
                    value={reflectionAnswers.realLife}
                    onChange={(e) => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                    placeholder="E.g., Designing community health posters, leading an SHG discussion, or conducting village nutrition surveys..."
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Misconception Review Profile */}
            {hitMisconceptions.length > 0 && (
              <div className="p-6 bg-rose-950/40 rounded-3xl border border-rose-800/50 space-y-3">
                <h3 className="text-sm font-bold text-rose-400">Targeted Revision: Misconceptions Encountered</h3>
                {hitMisconceptions.map((mIdx, i) => {
                  const item = misconceptions?.[mIdx];
                  if (!item) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950/80 rounded-xl border border-rose-900/40 text-xs">
                      <p className="text-rose-300 font-bold">✗ Myth: {item.misconception}</p>
                      <p className="text-emerald-300 mt-1">✓ ISC Scientific Fact: {item.correction}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Spaced Repetition Schedule Banner */}
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-amber-400">Spaced Repetition Schedule (SM-2)</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Next memory consolidation review is scheduled in{' '}
                  <strong className="text-amber-300">
                    {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                  </strong>.
                </p>
              </div>
              <button
                aria-label="Re-explore Labs"
                onClick={() => {
                  setPhase('explore');
                  setCurrentSlide(0);
                }}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold"
              >
                Re-explore Labs
              </button>
            </div>

            {/* Real World Capstone Project */}
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800">
              <h3 className="text-sm font-bold text-sky-400 mb-2">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300 mb-3">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl text-xs text-slate-300 border border-slate-800">
                    <strong className="text-sky-400">{i + 1}.</strong> {st}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FEEDBACK MODALS & OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_HomeScienceIndividualCommunicationVerbalSim;