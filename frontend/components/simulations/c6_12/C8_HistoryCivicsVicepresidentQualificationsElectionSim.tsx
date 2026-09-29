'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import gsap from 'gsap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// ─── NAMED CONSTANTS FOR COVERED CISCE NODES ───
const NODE_C8_HISTCIV_061 = 'c8_histciv_061'; // Vice-President
const NODE_C8_HISTCIV_062 = 'c8_histciv_062'; // Prime Minister & Council of Ministers
const NODE_C8_HISTCIV_063 = 'c8_histciv_063'; // Supreme Court Composition & Appointment
const NODE_C8_HISTCIV_064 = 'c8_histciv_064'; // Supreme Court Jurisdiction & Writs
const NODE_C8_HISTCIV_065 = 'c8_histciv_065'; // High Court Composition & Writs
const NODE_C8_HISTCIV_066 = 'c8_histciv_066'; // UN Aims and Principles
const NODE_C8_HISTCIV_067 = 'c8_histciv_067'; // UN Organs: GA and Security Council
const NODE_C8_HISTCIV_068 = 'c8_histciv_068'; // International Court of Justice
const NODE_C8_HISTCIV_069 = 'c8_histciv_069'; // UN Agencies: UNESCO & UNICEF
const NODE_C8_HISTCIV_070 = 'c8_histciv_070'; // UN Agency: WHO

const ALL_NODE_IDS = [
  NODE_C8_HISTCIV_061,
  NODE_C8_HISTCIV_062,
  NODE_C8_HISTCIV_063,
  NODE_C8_HISTCIV_064,
  NODE_C8_HISTCIV_065,
  NODE_C8_HISTCIV_066,
  NODE_C8_HISTCIV_067,
  NODE_C8_HISTCIV_068,
  NODE_C8_HISTCIV_069,
  NODE_C8_HISTCIV_070,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'The Constitutional Crisis & Global Diplomat Simulation',
  intro:
    'You are appointed Chief Legal & Diplomatic Counsel to the Republic of India and its delegation to the United Nations. Urgent domestic governance impasses and international disputes require your constitutional expertise and multilateral leadership.',
  context:
    'At home, Parliament faces electoral questions, judicial appointments, and emergency writ petitions. Abroad, the UN Security Council is deadlocked over a global crisis while specialized agencies mobilise for humanitarian and health interventions.',
};

// ─── DISCOVERY HOOK QUESTION (Curiosity-building, ungraded) ───
const DISCOVERY_QUESTION = {
  question:
    'If the President of India suddenly resigns, does the Vice-President automatically "become" the new President for the remainder of the 5-year term?',
  options: [
    'Yes, the Vice-President takes over as permanent President for the rest of the 5 years.',
    'No, the Vice-President only acts as President for a maximum of 6 months until a fresh election is held.',
    'No, the Chief Justice of India automatically takes over the presidency permanently.',
    'Yes, provided both Houses of Parliament pass a confirmation resolution.',
  ],
  correctIndex: 1,
  hintAfter:
    'Under Article 65 of the Indian Constitution, the Vice-President only discharges presidential functions for at most 6 months. Let us dive into how our Union Executive, Judiciary, and the United Nations work!',
};

// ─── INTERFACES ───
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

// ─── DEFAULT ENRICHMENT DATA ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C8_HISTCIV_061,
  title: 'Union Executive, Judiciary & The United Nations',
  definition:
    'Constitutional framework of the Indian Union Executive (Vice-President, Prime Minister & Council of Ministers), the integrated Judiciary (Supreme Court & High Courts), and the structure of the United Nations, ICJ, and specialized agencies (UNESCO, UNICEF, WHO).',
  eli5:
    'Think of India as a giant team run by constitutional rules (PM runs the game, President is the formal patron, VP chairs the upper house and stands ready as backup, Judges protect the rulebook) and the UN as the global referee council keeping world peace and health.',
  misconceptions: [
    {
      misconception: 'The Vice-President is elected by the exact same Electoral College as the President.',
      correction:
        'The President is elected by MPs and State MLAs. The Vice-President is elected ONLY by MPs of both Houses of Parliament (Lok Sabha + Rajya Sabha). State MLAs do NOT vote for the Vice-President.',
    },
    {
      misconception: 'The Prime Minister is directly elected by the citizens of India.',
      correction:
        'Citizens elect Lok Sabha MPs. The President appoints the leader of the majority party or coalition as Prime Minister under Article 75.',
    },
    {
      misconception: 'Supreme Court and High Court judges retire at the exact same age.',
      correction:
        'Supreme Court judges retire at 65 years (Article 124(2A)), while High Court judges retire at 62 years (Article 217).',
    },
    {
      misconception: 'Article 32 of the Supreme Court is broader in scope than Article 226 of the High Court.',
      correction:
        'Article 226 of the High Court is BROADER because it covers both Fundamental Rights AND ordinary legal rights, whereas Article 32 covers only Fundamental Rights.',
    },
    {
      misconception: 'General Assembly resolutions on peace and security are legally binding on all UN members.',
      correction:
        'General Assembly resolutions are recommendatory with moral authority; only Security Council resolutions under Chapter VII / Article 25 are legally binding.',
    },
    {
      misconception: 'The International Court of Justice (ICJ) puts individual citizens on trial for crimes.',
      correction:
        'Only sovereign States can be parties before the ICJ. The International Criminal Court (ICC) — a separate treaty body — handles individual war criminals.',
    },
    {
      misconception: 'WHO runs hospitals and directly treats sick patients across member countries.',
      correction:
        'WHO is a coordinating and standard-setting body that advises national health ministries; it does not operate hospitals or provide clinical treatment.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Under Article 66, who elects the Vice-President of India?',
      options: ['Elected MPs and State MLAs', 'Members of both Houses of Parliament only', 'Lok Sabha MPs only', 'All Indian citizens directly'],
      correctIndex: 1,
    },
    {
      question: 'What is the maximum duration the Vice-President can act as President upon a vacancy?',
      options: ['5 years', '2 years', '6 months', '1 year'],
      correctIndex: 2,
    },
    {
      question: 'Which constitutional article establishes Collective Responsibility of the Council of Ministers to the Lok Sabha?',
      options: ['Article 74', 'Article 75(3)', 'Article 78', 'Article 124'],
      correctIndex: 1,
    },
    {
      question: 'What is the current sanctioned judge strength of the Supreme Court of India?',
      options: ['31 judges', '34 judges (1 CJI + 33 judges)', '25 judges', '50 judges'],
      correctIndex: 1,
    },
    {
      question: 'Which writ literally means "We Command" and compels a public official to perform their duty?',
      options: ['Habeas Corpus', 'Mandamus', 'Quo Warranto', 'Certiorari'],
      correctIndex: 1,
    },
    {
      question: 'Where is the headquarters of the International Court of Justice located?',
      options: ['New York, USA', 'Geneva, Switzerland', 'The Hague, Netherlands', 'Paris, France'],
      correctIndex: 2,
    },
    {
      question: 'On what date did WHO declare India officially certified as Polio-free?',
      options: ['15 August 1947', '8 May 1980', '13 January 2014', '11 March 2020'],
      correctIndex: 2,
    },
    {
      question: 'Which UN specialized agency is headquartered in Paris and inscribes World Heritage Sites?',
      options: ['UNICEF', 'UNESCO', 'WHO', 'ECOSOC'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Student demonstrates 85%+ mastery across all 10 CISCE civics nodes: VP, PM & Cabinet, Supreme Court, High Court, UN Principles, GA & UNSC, ICJ, UNESCO, UNICEF, and WHO.',
};

// ─── 21 RICH CHALLENGES (Foundation, Standard, Advanced with NEP 2020 Competency Weightage) ───
const CHALLENGES: Challenge[] = [
  // ── FOUNDATION TIER (1-7) ──
  {
    id: 'ch_001_vp_qual',
    nodeId: NODE_C8_HISTCIV_061,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Article 66 of the Constitution of India, what is the minimum age required to qualify for the office of Vice-President?',
    options: ['25 years', '30 years', '35 years', '40 years'],
    correctIndex: 2,
    explanation: 'Article 66 requires that a candidate for Vice-President must be a citizen of India, at least 35 years of age, eligible for election to the Rajya Sabha, and hold no office of profit.',
    hints: [
      'The minimum age is identical to that required for the President and State Governors.',
      'Lok Sabha is 25, Rajya Sabha is 30, but the highest constitutional heads require 5 more years.',
      'The constitutional requirement is 35 years completed.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_002_pm_app',
    nodeId: NODE_C8_HISTCIV_062,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How is the Prime Minister of India officially appointed according to Article 75?',
    options: [
      'Directly elected by popular national vote of all citizens',
      'Appointed by the Chief Justice of India',
      'Appointed by the President as leader of the majority party/coalition in Lok Sabha',
      'Elected in a joint sitting of Rajya Sabha and Lok Sabha',
    ],
    correctIndex: 2,
    explanation: 'Citizens elect MPs; the President appoints the leader commanding a majority in the Lok Sabha as Prime Minister under Article 75.',
    hints: [
      'Citizens do not vote directly for a PM candidate on their ballot; they vote for constituency MPs.',
      'The President performs the constitutional appointment based on Lok Sabha majority strength.',
      'The leader of the majority party or coalition is sworn in by the President.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_003_sc_retire',
    nodeId: NODE_C8_HISTCIV_063,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the mandatory constitutional retirement age for a Supreme Court judge in India (Article 124(2A))?',
    correctAnswer: 65,
    tolerance: 0,
    unit: 'years',
    explanation: 'Under Article 124(2A), Supreme Court judges retire at 65 years. In contrast, High Court judges retire at 62 years.',
    hints: [
      'It is three years higher than the retirement age for High Court judges.',
      'High Court judges retire at 62.',
      '62 + 3 = 65 years.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_004_writs_mandamus',
    nodeId: NODE_C8_HISTCIV_064,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match the Latin writ name "Mandamus" to its exact legal meaning:',
    options: [
      '"Produce the body" (unlawful detention)',
      '"We command" (compelling a public authority to perform a duty)',
      '"By what warrant" (questioning legal title to office)',
      '"To be certified" (quashing an unlawful lower court order)',
    ],
    correctIndex: 1,
    explanation: 'Mandamus translates to "We command". It is issued by the Supreme Court (Art 32) or High Court (Art 226) to compel a public official or body to perform a statutory duty.',
    hints: [
      'Habeas Corpus means "produce the body".',
      'Mandamus comes from the Latin word for command or mandate.',
      'It orders a sleeping official: "We command you to perform your duty!"',
    ],
  },
  {
    id: 'ch_005_un_founding',
    nodeId: NODE_C8_HISTCIV_066,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On what date did the United Nations officially come into existence, celebrated globally as UN Day?',
    options: ['15 August 1947', '24 October 1945', '26 January 1950', '10 December 1948'],
    correctIndex: 1,
    explanation: 'The UN Charter was signed in San Francisco and entered into force on 24 October 1945 upon ratification by the P5 and majority signatories.',
    hints: [
      'It was founded immediately after the conclusion of World War II in 1945.',
      'The month is October and the date is the 24th.',
      '24 October 1945 is celebrated each year as UN Day.',
    ],
  },
  {
    id: 'ch_006_un_p5',
    nodeId: NODE_C8_HISTCIV_067,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following countries is ONE of the five permanent members (P5) holding veto power in the UN Security Council?',
    options: ['India', 'Germany', 'France', 'Japan'],
    correctIndex: 2,
    explanation: 'The P5 permanent members are China, France, Russian Federation, United Kingdom, and the United States.',
    hints: [
      'India, Germany, and Japan belong to the G4 group seeking permanent seats, but are not yet P5.',
      'The P5 reflects the major Allied victorious powers of World War II in 1945.',
      'France is a permanent member.',
    ],
  },
  {
    id: 'ch_007_who_hq',
    nodeId: NODE_C8_HISTCIV_070,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Where is the global headquarters of the World Health Organization (WHO) located?',
    options: ['Geneva, Switzerland', 'Paris, France', 'New York, USA', 'The Hague, Netherlands'],
    correctIndex: 0,
    explanation: 'WHO was founded on 7 April 1948 (World Health Day) with headquarters in Geneva, Switzerland. Its South-East Asia Regional Office (SEARO) is in New Delhi.',
    hints: [
      'Paris is the headquarters of UNESCO; New York is UN & UNICEF; The Hague is ICJ.',
      'WHO is situated in the prominent international diplomatic city in Switzerland.',
      'Geneva, Switzerland is the headquarters.',
    ],
  },

  // ── STANDARD TIER (8-14) ──
  {
    id: 'ch_008_vp_vs_pres_electorate',
    nodeId: NODE_C8_HISTCIV_061,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare the electorate for the President of India versus the Vice-President. What is the fundamental difference?',
    options: [
      'Vice-President is elected by citizens directly; President by Parliament.',
      'Presidential electorate includes elected State MLAs; Vice-Presidential electorate consists ONLY of MPs of both Houses of Parliament.',
      'Presidential election excludes Rajya Sabha members; Vice-Presidential election includes them.',
      'Vice-Presidential election includes Legislative Council members (MLCs); Presidential election does not.',
    ],
    correctIndex: 1,
    explanation: 'The President is elected by elected MPs and elected MLAs of all states and UTs. The Vice-President is elected solely by members of both Houses of Parliament (Lok Sabha + Rajya Sabha). No State MLAs vote for VP.',
    hints: [
      'Think about state participation: do state assemblies vote for the Rajya Sabha Chairman?',
      'The VP has a parliamentary role, so only Parliament votes.',
      'MLAs from state assemblies do NOT participate in the Vice-Presidential election.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_009_collective_resp',
    nodeId: NODE_C8_HISTCIV_062,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What happens when a No-Confidence Motion is passed by a simple majority in the Lok Sabha against the Government under Article 75(3)?',
    options: [
      'Only the minister facing specific allegations must resign.',
      'The entire Council of Ministers, including the Prime Minister, must resign together.',
      'The President dismisses Parliament and takes over permanently.',
      'The Rajya Sabha can veto the decision within 14 days.',
    ],
    correctIndex: 1,
    explanation: 'Article 75(3) establishes Collective Responsibility: the Council of Ministers swims or sinks together. A loss of confidence in Lok Sabha requires the resignation of the entire ministry.',
    hints: [
      'Remember the phrase: "They swim or sink as one single body."',
      'Individual responsibility means one minister answers for their portfolio; collective responsibility brings down the whole government.',
      'The whole Council of Ministers and PM must resign (e.g. Vajpayee government 1999).',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_010_sc_judges_drag',
    nodeId: NODE_C8_HISTCIV_063,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Drag the constitutional criteria to complete the qualification paths for appointment as a Supreme Court Judge (Article 124(3)):',
    dragItems: [
      { label: '5 Years HC Judge', targetId: 'target_hc_judge' },
      { label: '10 Years HC Advocate', targetId: 'target_hc_adv' },
      { label: 'Distinguished Jurist', targetId: 'target_jurist' },
    ],
    correctMapping: {
      target_hc_judge: '5 Years HC Judge',
      target_hc_adv: '10 Years HC Advocate',
      target_jurist: 'Distinguished Jurist',
    },
    explanation: 'Article 124(3) allows 3 alternative routes for Indian citizens: 5 years as High Court Judge, 10 years as High Court Advocate, or being a Distinguished Jurist in the opinion of the President.',
    hints: [
      'Sitting High Court judges need 5 years experience on the bench.',
      'Advocates practising in High Courts need 10 years experience.',
      'The third academic/scholar category is the "Distinguished Jurist".',
    ],
  },
  {
    id: 'ch_011_art32_vs_art226',
    nodeId: NODE_C8_HISTCIV_065,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the writ jurisdiction of the High Court under Article 226 considered broader in scope than Supreme Court Article 32?',
    options: [
      'High Courts can issue writs against foreign nations, but the Supreme Court cannot.',
      'High Court Article 226 can enforce Fundamental Rights AND ordinary legal rights; Supreme Court Article 32 is strictly confined to Fundamental Rights.',
      'High Court writs can never be appealed to the Supreme Court.',
      'Supreme Court can only issue 2 writs, whereas High Courts issue 5 writs.',
    ],
    correctIndex: 1,
    explanation: 'Article 32 is limited to Fundamental Rights in Part III. Article 226 allows High Courts to issue writs for Fundamental Rights "and for any other purpose" (ordinary legal rights, statutory entitlements).',
    hints: [
      'Look at the phrase "and for any other purpose" in Article 226.',
      'If a statutory pension or college scholarship is denied (ordinary legal right), which court has direct writ remedy?',
      'High Court Article 226 covers both Fundamental and ordinary legal rights.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_012_icj_party_rule',
    nodeId: NODE_C8_HISTCIV_068,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Who possesses legal standing (locus standi) to appear as a party in contentious cases before the International Court of Justice (ICJ)?',
    options: [
      'Any multinational corporation or private company',
      'Individual citizens filing human rights petitions',
      'Sovereign States only',
      'Non-Governmental Organizations (NGOs) and charities',
    ],
    correctIndex: 2,
    explanation: 'Article 34(1) of the ICJ Statute explicitly states: "Only states may be parties in cases before the Court." Individuals and private bodies cannot sue before the ICJ.',
    hints: [
      'When India fought for Kulbhushan Jadhav (2019), the case was titled "India v. Pakistan".',
      'Individuals cannot approach the Peace Palace directly.',
      'Only sovereign UN member States can be parties.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_013_unicef_vs_unesco',
    nodeId: NODE_C8_HISTCIV_069,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Differentiate between UNESCO and UNICEF based on their core mandate and headquarters:',
    options: [
      'UNESCO (Paris) handles education, science, culture & heritage; UNICEF (New York) handles child survival, nutrition & child protection.',
      'UNESCO (Geneva) handles children vaccines; UNICEF (Paris) handles monuments.',
      'Both have identical mandates and operate from London.',
      'UNICEF is a principal organ of the UN; UNESCO is an NGO.',
    ],
    correctIndex: 0,
    explanation: 'UNESCO (HQ: Paris, 1945) focuses on Education, Science, Culture and World Heritage. UNICEF (HQ: New York, 1946) focuses on Children’s welfare, immunisation, and protection.',
    hints: [
      'Remember: "E-S-C" in UNESCO stands for Educational, Scientific and Cultural (Paris).',
      'UNICEF is the UN Children’s Fund (New York).',
      'UNESCO handles Taj Mahal heritage; UNICEF helped India eliminate maternal-neonatal tetanus and polio.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_014_who_role_concept',
    nodeId: NODE_C8_HISTCIV_070,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which statement accurately describes how the World Health Organization (WHO) executes its international health mandate?',
    options: [
      'WHO builds and directly runs local general hospitals in all 194 member states.',
      'WHO sets global health guidelines, coordinates research, and assists national health ministries (like India’s MoHFW).',
      'WHO acts as an armed health police that can arrest citizens during epidemics.',
      'WHO distributes free medicines directly to patients door-to-door without government permission.',
    ],
    correctIndex: 1,
    explanation: 'WHO is a global standard-setting and coordinating agency. It supports domestic health ministries (like India’s Ministry of Health and Family Welfare) rather than providing direct clinical patient care.',
    hints: [
      'Does a WHO doctor give you medicine at your neighbourhood clinic, or does your local government doctor do that following WHO standards?',
      'WHO operates at the international policy, research, and advisory level.',
      'It sets international benchmarks and coordinates eradication drives with national authorities.',
    ],
    misconceptionIndex: 6,
  },

  // ── ADVANCED TIER (15-21) ──
  {
    id: 'ch_015_emergency_habeas_case',
    nodeId: NODE_C8_HISTCIV_064,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'During the 1975-77 Emergency, in the infamous ADM Jabalpur v. Shivkant Shukla case, what did the Supreme Court majority rule regarding Habeas Corpus (later overruled in Puttaswamy 2017)?',
    options: [
      'The Court ruled that citizens could still demand Habeas Corpus anytime.',
      'The Court majority ruled that during Emergency, citizens could not approach courts for Habeas Corpus even against illegal detention.',
      'The Court ordered the immediate release of all political detainees.',
      'The Court abolished Article 32 permanently.',
    ],
    correctIndex: 1,
    explanation: 'In ADM Jabalpur (1976), 4 out of 5 judges ruled that Article 21 rights were suspended. Justice H.R. Khanna gave a legendary sole dissent defending liberty. The 9-judge bench in K.S. Puttaswamy (2017) formally overruled ADM Jabalpur.',
    hints: [
      'Justice H.R. Khanna was the sole heroic dissenter who stood for liberty.',
      'The majority ruling was considered the darkest chapter in Indian judicial history.',
      'It held that even arbitrary detention could not be challenged under Habeas Corpus while Article 21 was suspended.',
    ],
  },
  {
    id: 'ch_016_veto_deadlock_app',
    nodeId: NODE_C8_HISTCIV_067,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In February 2022, when a Security Council draft resolution condemning the invasion of Ukraine received 11 votes in favour, 3 abstentions, and 1 negative vote from Russia, what was the constitutional outcome in the UN?',
    options: [
      'The resolution passed because 11 votes is greater than the required 9 votes.',
      'The resolution was defeated because Russia, as a P5 permanent member, exercised its veto under Article 27.',
      'The resolution was forwarded to the International Court of Justice for execution.',
      'The abstaining countries were expelled from the Security Council.',
    ],
    correctIndex: 1,
    explanation: 'Under Article 27, a substantive Security Council resolution requires 9 affirmative votes with NO veto from any P5 member. A single negative vote from a permanent member kills the resolution.',
    hints: [
      'Even if 14 members vote YES, a single "NO" from any of the P5 blocks the resolution.',
      'Russia is one of the five permanent members.',
      'This single negative vote constituted a P5 veto under Article 27.',
    ],
  },
  {
    id: 'ch_017_jadhav_icj_ruling',
    nodeId: NODE_C8_HISTCIV_068,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In the Kulbhushan Jadhav Case (India v. Pakistan, 2019), on what legal basis did the ICJ unanimously rule in favour of India?',
    options: [
      'Pakistan violated the Vienna Convention on Consular Relations by denying consular access to an Indian national.',
      'Pakistan had no military courts.',
      'India was granted sovereignty over Pakistani territory.',
      'The ICJ ordered the UN Security Council to deploy peacekeepers.',
    ],
    correctIndex: 0,
    explanation: 'The ICJ found Pakistan in breach of Article 36 of the Vienna Convention on Consular Relations for refusing consular access to India, staying the execution and ordering effective review.',
    hints: [
      'The case hinged on the right of a sovereign nation to communicate with and assist its detained national abroad.',
      'Look for the Vienna Convention on Consular Relations.',
      'Pakistan failed to inform India and denied consular assistance.',
    ],
  },
  {
    id: 'ch_018_sort_judicial_hierarchy',
    nodeId: NODE_C8_HISTCIV_063,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the judicial hierarchy of India in descending order of constitutional supremacy (Apex to base):',
    sortItems: [
      'Supreme Court of India (New Delhi, Article 124)',
      'High Courts of the States (25 High Courts, Article 214)',
      'District & Sessions Courts (District level)',
      'Subordinate Courts (Munsif / Judicial Magistrate)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'India possesses a unified integrated judicial system: Supreme Court at the apex, followed by High Courts in states, District/Sessions courts, and Subordinate Magistrate/Munsif courts.',
    hints: [
      'The Supreme Court in New Delhi is the apex court of the land.',
      'High Courts are the highest judicial authorities in each state.',
      'District courts sit above local subordinate magistrate courts.',
    ],
  },
  {
    id: 'ch_019_un_principles_construct',
    nodeId: NODE_C8_HISTCIV_066,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the core principle of Article 2(1) of the UN Charter by assembling the foundational phrases:',
    availableParts: ['The Organization', 'is based on', 'the principle of', 'the sovereign equality', 'of all its Members'],
    targetState: 'The Organization is based on the principle of the sovereign equality of all its Members',
    validationHint: 'Select the parts in exact sequence as stated in Article 2(1) of the UN Charter.',
    explanation: 'Article 2(1) of the UN Charter guarantees sovereign equality: regardless of military size or GDP, every member nation has equal legal standing in international law.',
    hints: [
      'Start with "The Organization".',
      'Next is "is based on the principle of".',
      'Finish with "the sovereign equality of all its Members".',
    ],
  },
  {
    id: 'ch_020_polio_eradication_num',
    nodeId: NODE_C8_HISTCIV_070,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'How many consecutive years of zero recorded polio cases were strictly required by WHO before certifying India as officially Polio-free on 13 January 2014?',
    correctAnswer: 3,
    tolerance: 0,
    unit: 'consecutive years',
    explanation: 'WHO surveillance protocols require 3 consecutive years without a single case of wild poliovirus transmission under rigorous surveillance before certification.',
    hints: [
      'India’s last wild polio case was detected in January 2011 in Howrah, West Bengal.',
      'Certification happened in January 2014.',
      '2014 minus 2011 = 3 years.',
    ],
  },
  {
    id: 'ch_021_basic_structure_eval',
    nodeId: NODE_C8_HISTCIV_064,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In Kesavananda Bharati (1973), how did the Supreme Court balance parliamentary amending power under Article 368 with constitutional supremacy?',
    options: [
      'Parliament was granted absolute power to destroy or alter any part of the Constitution.',
      'Parliament can amend provisions of the Constitution, but CANNOT alter or destroy its Basic Structure (e.g. secularism, judicial review, federalism).',
      'The Constitution was declared unamendable by any future Parliament.',
      'The Supreme Court declared that only the Prime Minister can amend fundamental rights.',
    ],
    correctIndex: 1,
    explanation: 'The landmark 13-judge bench created the Basic Structure Doctrine: Parliament’s amending power under Article 368 is wide, but it cannot destroy the fundamental framework and core identity of the Constitution.',
    hints: [
      'Think of a house: you can repaint rooms and remodel furniture, but you cannot demolish the foundation pillars.',
      'The pillars are the Basic Structure (Rule of law, democracy, judicial independence).',
      'Parliament can amend, but cannot destroy the basic structure.',
    ],
  },
];

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Union Executive Balance',
    instruction: 'Select each constitutional office to explore powers, qualifications, and constitutional articles.',
    interactionType: 'click-executive',
    nodeId: NODE_C8_HISTCIV_061,
  },
  {
    title: '2. Electoral College Architecture',
    instruction: 'Toggle between the Presidential and Vice-Presidential electorates to inspect who votes.',
    interactionType: 'toggle-electorate',
    nodeId: NODE_C8_HISTCIV_061,
  },
  {
    title: '3. Supreme Court vs High Court Writs',
    instruction: 'Drag the grievance slider in real-time to observe whether Article 32 (Supreme Court) or Article 226 (High Court) applies.',
    interactionType: 'slider-writs',
    nodeId: NODE_C8_HISTCIV_064,
  },
  {
    title: '4. UN Security Council Veto Simulator',
    instruction: 'Cast votes for the 15 Security Council members and observe how a single P5 veto impacts the resolution.',
    interactionType: 'veto-simulator',
    nodeId: NODE_C8_HISTCIV_067,
  },
  {
    title: '5. UN Specialized Agencies Mission Lab',
    instruction: 'Match global crises with the appropriate agency: UNESCO (Heritage/Education), UNICEF (Children), or WHO (Health).',
    interactionType: 'agency-match',
    nodeId: NODE_C8_HISTCIV_069,
  },
];

// ─── PREDICTION QUESTIONS (Predict-Then-Check) ───
const PREDICTION_QUESTIONS = [
  {
    question:
      'Predict: If 14 out of 15 UN Security Council members vote "YES" on a peacekeeping mission, but one Permanent Member (P5) votes "NO", will the resolution pass?',
    options: [
      'Yes, because a 14-to-1 majority easily passes the 9-vote requirement.',
      'No, because any single P5 negative vote vetoes the resolution completely.',
      'Yes, but it is referred to the ICJ for final confirmation.',
      'No, unless the UN Secretary-General casts a tie-breaker vote.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now open the Veto Simulator and test casting a negative vote with a P5 member!',
    nodeId: NODE_C8_HISTCIV_067,
  },
  {
    question:
      'Predict: A state government abruptly denies a government college scholarship to a student without violating Part III Fundamental Rights. Can the student approach the Supreme Court under Article 32 directly?',
    options: [
      'Yes, Article 32 covers every single law and government scheme in India.',
      'No, Article 32 is strictly for Fundamental Rights; she must approach the High Court under Article 226 for ordinary legal rights.',
      'Yes, but only if the Prime Minister gives permission in writing.',
      'No, only the International Court of Justice handles scholarship grievances.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Test the Grievance Slider on the Writs Lab to verify Article 226 vs Article 32 scope!',
    nodeId: NODE_C8_HISTCIV_065,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'In the Electoral College visualization, what did you observe about State MLAs when switching from President to Vice-President?',
    observableOptions: [
      'State MLAs participate in both elections equally.',
      'State MLAs completely disappear from the Vice-Presidential electorate (only MPs vote).',
      'State MLAs vote twice for the Vice-President.',
      'State MLAs replace Lok Sabha MPs during Vice-Presidential voting.',
    ],
    correctIndex: 1,
    nodeId: NODE_C8_HISTCIV_061,
  },
  {
    question: 'When exploring WHO achievements in the Agencies Lab, what pattern connects Smallpox (1980) and Polio in India (2014)?',
    observableOptions: [
      'Both were cured by building giant WHO hospitals in every village.',
      'Both were eradicated through coordinated mass vaccination campaigns executed with national health ministries over multiple years.',
      'Both diseases disappeared naturally without any vaccination drives.',
      'Both campaigns were supervised exclusively by the International Court of Justice.',
    ],
    correctIndex: 1,
    nodeId: NODE_C8_HISTCIV_070,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Mock Constitutional Assembly & UN Security Council Simulation',
  description:
    'Draft a 3-point action plan as an Indian diplomat: (1) Formulate an Article 226 writ petition for a public health crisis in your district, (2) Propose a UN Security Council reform draft with the G4 nations (India, Brazil, Germany, Japan), and (3) Select one local historic monument to nominate for UNESCO World Heritage preservation.',
  steps: [
    'Draft the appropriate writ (Mandamus or Habeas Corpus) addressing the civic/health issue.',
    'Formulate a speech arguing for permanent Indian representation on the UN Security Council.',
    'List the cultural and architectural significance of your chosen heritage site for UNESCO.',
  ],
};

// ─── MAIN COMPONENT ───
function C8_HistoryCivicsVicepresidentQualificationsElectionSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C8_HISTCIV_061,
  title = DEFAULT_PROPS.title || 'Union Executive, Judiciary & UN',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['civics'] || { name: 'History & Civics', emoji: '🏛️', color: 'amber' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Prediction & Observation states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Lab & Exploration States
  const [selectedExecutiveOffice, setSelectedExecutiveOffice] = useState<'president' | 'vp' | 'pm' | 'council'>('vp');
  const [electorateMode, setElectorateMode] = useState<'president' | 'vice_president'>('vice_president');
  const [grievanceSeverity, setGrievanceSeverity] = useState(30); // 0-100: <50 = legal right (Art 226), >=50 = fundamental right (Art 32 & 226)
  const [p5Votes, setP5Votes] = useState<Record<string, 'yes' | 'no' | 'abstain'>>({
    USA: 'yes',
    UK: 'yes',
    France: 'yes',
    Russia: 'yes',
    China: 'yes',
  });
  const [nonP5YesCount, setNonP5YesCount] = useState(8); // 0-10
  const [selectedAgency, setSelectedAgency] = useState<'unesco' | 'unicef' | 'who'>('unesco');

  // Challenge answering states
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-drop & specialized inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback components
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  // ─── FILTER CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD INITIAL MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPT DIFFICULTY BASED ON BKT MASTERY ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── GSAP TIMELINE ANIMATION ───
  useEffect(() => {
    if (phase === 'explore' && currentSlide === 4 && timelineRef.current) {
      gsap.fromTo(
        timelineRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [phase, currentSlide]);

  // ─── CANVAS ANIMATION (2D Parliamentary & Diplomatic Signal) ───
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

      // Background subtle gradient
      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#1e1b4b');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Constitutional pulse circle
      const cx = canvas.width - 30;
      const cy = canvas.height / 2;
      const radius = 6 + Math.sin(frame * 0.08) * 3;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(1, radius), 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      // Text status
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px sans-serif';
      ctx.fillText(
        phase === 'challenge'
          ? `Active Case: ${activeChallenge.id} (${activeChallenge.difficulty.toUpperCase()})`
          : `CISCE Civics Lab Active | Step ${currentSlide + 1}`,
        15,
        cy + 4
      );

      animId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, [phase, currentSlide, activeChallenge]);

  // ─── CALLBACK HANDLERS ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Correct! The Vice-President only acts as President for up to 6 months.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive Civics and UN Laboratory. Let us discover the balance of power!');
  }, []);

  const handleSliderChange = useCallback((val: number) => {
    setErrors(val);
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('You are in Free Play Sandbox! Experiment freely with Parliament, Writs, and the UN Veto.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Starting constitutional challenges. Read carefully and apply your knowledge!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the simulation below to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on observation! State MLAs do not vote for the Vice-President.' : 'Look closer at the electoral college diagram.');
  }, []);

  const handleExecutiveOfficeSelect = useCallback((office: 'president' | 'vp' | 'pm' | 'council') => {
    setSelectedExecutiveOffice(office);
    audioManager.play('tap');
  }, []);

  const handleElectorateToggle = useCallback((mode: 'president' | 'vice_president') => {
    setElectorateMode(mode);
    audioManager.play('balance');
  }, []);

  const handleGrievanceSliderChange = useCallback((val: number) => {
    setGrievanceSeverity(val);
    audioManager.play('count');
  }, []);

  const handleP5VoteToggle = useCallback((country: string) => {
    setP5Votes(prev => {
      const current = prev[country];
      const next = current === 'yes' ? 'no' : current === 'no' ? 'abstain' : 'yes';
      audioManager.play('tap');
      return { ...prev, [country]: next };
    });
  }, []);

  const handleNonP5Slider = useCallback((count: number) => {
    setNonP5YesCount(count);
    audioManager.play('count');
  }, []);

  const handleAgencySelect = useCallback((agency: 'unesco' | 'unicef' | 'who') => {
    setSelectedAgency(agency);
    audioManager.play('tap');
  }, []);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      setCurrentHint(activeChallenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(activeChallenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, activeChallenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You completed the simulation with a score of ${finalScore} percent.`);
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

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('drop-correct');
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === activeChallenge.sortItems?.length ? [...prev] : activeChallenge.sortItems?.map((_, i) => i) || [];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (activeChallenge.sortItems?.map((_, i) => i) || []);
    const isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
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
  }, [sortArrangement, activeChallenge, hintCount, showNextHint]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
        isCorrect = answer === activeChallenge.correctIndex;
      } else if (activeChallenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
      } else if (activeChallenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
      } else if (activeChallenge.type === 'numeric') {
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
      } else if (activeChallenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (activeChallenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Excellent constitutional reasoning.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + activeChallenge.nodeId, JSON.stringify({ score: 100, timestamp: Date.now() }));
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
          speechManager.speak('Hints exhausted. Let us analyse the constitutional explanation.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [activeChallenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  // ─── COMPUTED REAL-TIME CALCULATIONS ───
  const p5YesCount = useMemo(() => Object.values(p5Votes).filter(v => v === 'yes').length, [p5Votes]);
  const p5NoCount = useMemo(() => Object.values(p5Votes).filter(v => v === 'no').length, [p5Votes]);
  const totalYesVotes = p5YesCount + nonP5YesCount;
  const isVetoed = p5NoCount > 0;
  const resolutionPassed = totalYesVotes >= 9 && !isVetoed;

  // Recharts Data for Security Council Voting breakdown
  const votingChartData = useMemo(
    () => [
      { name: 'P5 Yes', count: p5YesCount, fill: '#10b981' },
      { name: 'P5 No (Veto)', count: p5NoCount, fill: '#ef4444' },
      { name: 'Non-P5 Yes', count: nonP5YesCount, fill: '#3b82f6' },
      { name: 'Non-P5 No/Abs', count: 10 - nonP5YesCount, fill: '#64748b' },
    ],
    [p5YesCount, p5NoCount, nonP5YesCount]
  );

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ── HEADER & CANVAS HUD ── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wide">
                CISCE Class 8 Civics
              </span>
              <span className="text-xs text-slate-400">ICSE Curriculum 2026</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Dynamic Canvas Banner */}
        <div className="w-full md:w-80 h-10 rounded-xl overflow-hidden border border-slate-800 shadow-inner">
          <canvas ref={canvasRef} width={320} height={40} className="w-full h-full" />
        </div>
      </motion.div>

      {/* ── PHASE 1: DISCOVERY HOOK ── */}
      {phase === 'discovery' && (
        <motion.div
          key="discovery-phase"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          {/* Narrative Scenario Box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-gradient-to-br from-gold-950/80 via-slate-900 to-slate-950 border border-gold-700/40 shadow-xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">📜</span>
              <h2 className="text-lg font-bold text-gold-300">{SCENARIO.title}</h2>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
              ⚡ <strong className="text-slate-300">Mission:</strong> {SCENARIO.context}
            </p>
          </motion.div>

          {/* Curiosity Hook Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-lg"
          >
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">
                Discovery Challenge (Not Graded)
              </span>
            </div>
            <h3 className="text-base md:text-lg font-bold text-white">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  aria-label={`Option ${String.fromCharCode(65 + idx)}: ${option}`}
                  whileHover={{ scale: 1.02, backgroundColor: '#1e293b' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm font-medium border transition-all ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-gold-500'
                  }`}
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-slate-700 text-xs font-bold text-center leading-6 mr-2 text-slate-300">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                  {discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex && ' ✓'}
                  {discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex && ' ✗'}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-3"
              >
                <p className={`text-sm font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '🎯 Brilliant intuition! ✓' : '💡 Key Insight:'} {DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  aria-label="Enter Interactive Laboratory"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-gold-600 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 text-sm"
                >
                  Enter Interactive Laboratory 🔬 →
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ── PHASE 2: INTERACTIVE GUIDED EXPLORATION ── */}
      {phase === 'explore' && (
        <motion.div key="explore-phase" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Progress & Navigation */}
          <div className="flex items-center justify-between bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
              Guided Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentSlide ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700'
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
              className="p-5 md:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-5"
            >
              <div>
                <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                  <span>🏛️</span> {EXPLORATION_STEPS[currentSlide].title}
                </h2>
                <p className="text-amber-400 text-sm mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ── STEP 0: UNION EXECUTIVE INTERACTIVE DIAGRAM (SVG 1) ── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {(['president', 'vp', 'pm', 'council'] as const).map(off => (
                      <motion.button
                        key={off}
                        aria-label={`Select constitutional office ${off}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleExecutiveOfficeSelect(off)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedExecutiveOffice === off
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md'
                            : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        <span className="text-xs text-slate-400 block uppercase">
                          {off === 'president'
                            ? 'Article 52'
                            : off === 'vp'
                            ? 'Article 63'
                            : off === 'pm'
                            ? 'Article 75'
                            : 'Article 75(3)'}
                        </span>
                        <strong className="text-sm block capitalize">
                          {off === 'vp' ? 'Vice-President' : off === 'pm' ? 'Prime Minister' : off === 'council' ? 'Council of Min.' : 'President'}
                        </strong>
                      </motion.button>
                    ))}
                  </div>

                  {/* SVG 1: Union Executive Hierarchy */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 700 280" className="w-full h-auto" role="img" aria-label="Union Executive Constitutional Structure Diagram">
                      <defs>
                        <linearGradient id="gradExec" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#312e81" />
                          <stop offset="100%" stopColor="#1e1b4b" />
                        </linearGradient>
                      </defs>

                      {/* President */}
                      <rect
                        x="250"
                        y="15"
                        width="200"
                        height="55"
                        rx="12"
                        fill={selectedExecutiveOffice === 'president' ? '#b45309' : 'url(#gradExec)'}
                        stroke={selectedExecutiveOffice === 'president' ? '#fbbf24' : '#475569'}
                        strokeWidth="2"
                      />
                      <text x="350" y="38" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">
                        President of India (Art. 52)
                      </text>
                      <text x="350" y="55" textAnchor="middle" fill="#94a3b8" fontSize="10">
                        Nominal Head of State
                      </text>

                      {/* Connectors */}
                      <line x1="300" y1="70" x2="180" y2="110" stroke="#64748b" strokeWidth="2" strokeDasharray="4" />
                      <line x1="400" y1="70" x2="520" y2="110" stroke="#64748b" strokeWidth="2" />

                      {/* Vice-President */}
                      <rect
                        x="70"
                        y="110"
                        width="220"
                        height="65"
                        rx="12"
                        fill={selectedExecutiveOffice === 'vp' ? '#1e3a8a' : 'url(#gradExec)'}
                        stroke={selectedExecutiveOffice === 'vp' ? '#60a5fa' : '#475569'}
                        strokeWidth="2"
                      />
                      <text x="180" y="133" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">
                        Vice-President (Art. 63)
                      </text>
                      <text x="180" y="150" textAnchor="middle" fill="#93c5fd" fontSize="10">
                        Ex-officio Rajya Sabha Chair (Art. 64)
                      </text>
                      <text x="180" y="165" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                        Acts as President ≤ 6 Mos (Art. 65)
                      </text>

                      {/* Prime Minister */}
                      <rect
                        x="410"
                        y="110"
                        width="220"
                        height="65"
                        rx="12"
                        fill={selectedExecutiveOffice === 'pm' ? '#065f46' : 'url(#gradExec)'}
                        stroke={selectedExecutiveOffice === 'pm' ? '#34d399' : '#475569'}
                        strokeWidth="2"
                      />
                      <text x="520" y="133" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">
                        Prime Minister (Art. 75)
                      </text>
                      <text x="520" y="150" textAnchor="middle" fill="#a7f3d0" fontSize="10">
                        Real Executive Head of Govt
                      </text>
                      <text x="520" y="165" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                        Channel to President (Art. 78)
                      </text>

                      {/* Connector to Council */}
                      <line x1="520" y1="175" x2="520" y2="205" stroke="#64748b" strokeWidth="2" />

                      {/* Council of Ministers */}
                      <rect
                        x="370"
                        y="205"
                        width="300"
                        height="60"
                        rx="12"
                        fill={selectedExecutiveOffice === 'council' ? '#701a75' : 'url(#gradExec)'}
                        stroke={selectedExecutiveOffice === 'council' ? '#f472b6' : '#475569'}
                        strokeWidth="2"
                      />
                      <text x="520" y="226" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">
                        Council of Ministers (3 Tiers)
                      </text>
                      <text x="520" y="242" textAnchor="middle" fill="#fbcfe8" fontSize="10">
                        Cabinet | Ministers of State | Deputy Min.
                      </text>
                      <text x="520" y="256" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                        Collective Responsibility to Lok Sabha (Art. 75(3))
                      </text>
                    </svg>
                  </div>

                  {/* Dynamic Inspector Detail Card */}
                  <motion.div
                    key={selectedExecutiveOffice}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-sm space-y-1.5"
                  >
                    {selectedExecutiveOffice === 'vp' && (
                      <>
                        <h4 className="font-bold text-gold-300">Article 63-67: The Vice-President of India</h4>
                        <p className="text-slate-300">
                          <strong>Qualifications:</strong> Indian citizen, 35+ years old, qualified for Rajya Sabha election, holds no office of profit.
                        </p>
                        <p className="text-slate-300">
                          <strong>Key Dual Roles:</strong> (1) Ex-officio Chairman of Rajya Sabha (casts deciding vote on tie), (2) Discharges functions of President for max 6 months upon vacancy. Hamid Ansari served two consecutive terms (2007-2017).
                        </p>
                      </>
                    )}
                    {selectedExecutiveOffice === 'pm' && (
                      <>
                        <h4 className="font-bold text-emerald-300">Article 75 & 78: Prime Minister of India</h4>
                        <p className="text-slate-300">
                          <strong>Real Executive Head:</strong> Leader of majority party or coalition in Lok Sabha appointed by President. Must be member of either Lok Sabha or Rajya Sabha (e.g. Dr. Manmohan Singh was a Rajya Sabha MP from Assam 2004-2014).
                        </p>
                        <p className="text-slate-300">
                          <strong>Portfolios & Cabinet:</strong> Selects ministers, presides over Cabinet meetings, and acts as the official communication channel to President under Article 78.
                        </p>
                      </>
                    )}
                    {selectedExecutiveOffice === 'president' && (
                      <>
                        <h4 className="font-bold text-amber-300">Article 52 & 74: President of India</h4>
                        <p className="text-slate-300">
                          <strong>Nominal & Constitutional Head:</strong> Elected by MPs and State MLAs. All executive action is taken in their name, but under Article 74, the President acts on the aid and advice of the Council of Ministers headed by the Prime Minister.
                        </p>
                      </>
                    )}
                    {selectedExecutiveOffice === 'council' && (
                      <>
                        <h4 className="font-bold text-fuchsia-300">Article 75(3): Three Tiers & Collective Responsibility</h4>
                        <p className="text-slate-300">
                          <strong>3 Tiers:</strong> (1) Cabinet Ministers (Home, Defence, Finance, External Affairs), (2) Ministers of State (independent or assisting), (3) Deputy Ministers.
                        </p>
                        <p className="text-slate-300">
                          <strong>Collective Responsibility:</strong> Sinks or swims together. If Lok Sabha passes a No-Confidence Motion, the entire ministry resigns (as happened to the Vajpayee govt in 1999 by 1 vote).
                        </p>
                      </>
                    )}
                  </motion.div>
                </div>
              )}

              {/* ── STEP 1: ELECTORAL COLLEGE COMPARISON (VP vs President) (SVG 2) ── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex justify-center gap-3">
                    <motion.button
                      aria-label="View Vice-Presidential Electorate details"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleElectorateToggle('vice_president')}
                      className={`px-4 py-2 rounded-xl font-bold text-sm border transition-all ${
                        electorateMode === 'vice_president'
                          ? 'bg-gold-600 border-gold-400 text-white shadow-lg'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      Vice-Presidential Electorate (Art. 66)
                    </motion.button>
                    <motion.button
                      aria-label="View Presidential Electoral College details"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleElectorateToggle('president')}
                      className={`px-4 py-2 rounded-xl font-bold text-sm border transition-all ${
                        electorateMode === 'president'
                          ? 'bg-amber-600 border-amber-400 text-white shadow-lg'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      Presidential Electoral College (Art. 54)
                    </motion.button>
                  </div>

                  {/* SVG 2: Electoral College Comparison Diagram */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 700 200" className="w-full h-auto" role="img" aria-label="Electoral College Composition Comparison">
                      {/* Lok Sabha Box */}
                      <rect x="30" y="40" width="190" height="120" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                      <text x="125" y="70" textAnchor="middle" fill="#6ee7b7" fontSize="13" fontWeight="bold">Lok Sabha MPs</text>
                      <text x="125" y="95" textAnchor="middle" fill="#d1fae5" fontSize="11">543 Members</text>
                      <text x="125" y="130" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">✓ Votes for VP & Pres</text>

                      {/* Rajya Sabha Box */}
                      <rect x="255" y="40" width="190" height="120" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                      <text x="350" y="70" textAnchor="middle" fill="#6ee7b7" fontSize="13" fontWeight="bold">Rajya Sabha MPs</text>
                      <text x="350" y="95" textAnchor="middle" fill="#d1fae5" fontSize="11">245 Members</text>
                      <text x="350" y="130" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">✓ Votes for VP & Pres</text>

                      {/* State MLAs Box */}
                      <rect
                        x="480"
                        y="40"
                        width="190"
                        height="120"
                        rx="10"
                        fill={electorateMode === 'president' ? '#78350f' : '#450a0a'}
                        stroke={electorateMode === 'president' ? '#f59e0b' : '#ef4444'}
                        strokeWidth="2"
                        strokeDasharray={electorateMode === 'president' ? '0' : '4'}
                      />
                      <text x="575" y="70" textAnchor="middle" fill={electorateMode === 'president' ? '#fcd34d' : '#fca5a5'} fontSize="13" fontWeight="bold">
                        State & UT MLAs
                      </text>
                      <text x="575" y="95" textAnchor="middle" fill="#fecdd3" fontSize="11">
                        {electorateMode === 'president' ? '4,000+ Elected MLAs' : 'State Assemblies Excluded'}
                      </text>
                      <text
                        x="575"
                        y="130"
                        textAnchor="middle"
                        fill={electorateMode === 'president' ? '#fde68a' : '#fda4af'}
                        fontSize="11"
                        fontWeight="bold"
                      >
                        {electorateMode === 'president' ? '✓ Participates in Pres.' : '✗ NO VOTE FOR VP'}
                      </text>
                    </svg>

                    <div className="mt-2 p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-300 text-center">
                      {electorateMode === 'vice_president' ? (
                        <p>
                          📌 <strong>CISCE Key Point:</strong> The Vice-President is elected by proportional representation with single transferable vote by <strong>MPs of both Houses ONLY</strong>. No joint sitting is held; ballots are counted together.
                        </p>
                      ) : (
                        <p>
                          📌 <strong>Presidential Contrast:</strong> The President represents the entire Union, so the Electoral College includes <strong>both elected MPs AND elected MLAs</strong> of all States and Delhi/Puducherry.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Observation hook */}
                  {!observationAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-gold-950/50 border border-gold-700/60 space-y-2"
                    >
                      <h4 className="text-sm font-bold text-gold-300">{OBSERVATION_QUESTIONS[0].question}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Observation Option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleObservation(i)}
                            className={`p-2.5 text-xs text-left rounded-lg border transition-all ${
                              observationIndex === i
                                ? i === OBSERVATION_QUESTIONS[0].correctIndex
                                  ? 'bg-emerald-900/80 border-emerald-500 text-emerald-200'
                                  : 'bg-rose-900/80 border-rose-500 text-rose-200'
                                : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500'
                            }`}
                          >
                            {opt}
                            {observationIndex === i && (i === OBSERVATION_QUESTIONS[0].correctIndex ? ' ✓' : ' ✗')}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ── STEP 2: SUPREME COURT VS HIGH COURT WRITS (SVG 3) ── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {/* Predict Then Check Hook */}
                  {!predictionMade && (
                    <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-700/50 space-y-2">
                      <p className="text-xs font-bold text-amber-400 uppercase">Predict Before Simulating:</p>
                      <h4 className="text-sm font-semibold text-slate-100">{PREDICTION_QUESTIONS[1].question}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                        {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Prediction Option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-xs text-left rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:border-amber-400"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Grievance Slider Simulator with Live State Binding */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center">
                      <label htmlFor="grievance-slider" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                        Real-Time Grievance Nature & Scope Slider: {grievanceSeverity}%
                      </label>
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          grievanceSeverity < 50
                            ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40'
                            : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                        }`}
                      >
                        {grievanceSeverity < 50
                          ? 'Ordinary Legal Right (Scholarship / Pension / Licence)'
                          : 'Fundamental Right Violation (Liberty / Equality / Free Speech)'}
                      </span>
                    </div>

                    <input
                      id="grievance-slider"
                      type="range"
                      min={0}
                      max={100}
                      value={grievanceSeverity}
                      aria-label="Grievance Scope Slider from 0 to 100"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={grievanceSeverity}
                      onChange={e => handleGrievanceSliderChange(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
                    />

                    {/* SVG 3: Judicial Hierarchy & Writ Jurisdiction Scope */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <svg viewBox="0 0 700 150" className="w-full h-auto" role="img" aria-label="Writ Jurisdiction Scope Visualization">
                        {/* Supreme Court Node */}
                        <rect
                          x="40"
                          y="20"
                          width="290"
                          height="110"
                          rx="10"
                          fill={grievanceSeverity >= 50 ? '#064e3b' : '#450a0a'}
                          stroke={grievanceSeverity >= 50 ? '#10b981' : '#ef4444'}
                          strokeWidth="2"
                        />
                        <text x="185" y="45" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">Supreme Court (Art. 32)</text>
                        <text x="185" y="70" textAnchor="middle" fill="#94a3b8" fontSize="11">Only Fundamental Rights (Part III)</text>
                        <text
                          x="185"
                          y="105"
                          textAnchor="middle"
                          fill={grievanceSeverity >= 50 ? '#6ee7b7' : '#fca5a5'}
                          fontSize="12"
                          fontWeight="bold"
                        >
                          {grievanceSeverity >= 50 ? '✓ Remedy Accessible Direct' : '✗ Cannot Hear Ordinary Legal Rights'}
                        </text>

                        {/* High Court Node */}
                        <rect x="370" y="20" width="290" height="110" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                        <text x="515" y="45" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">High Court (Art. 226)</text>
                        <text x="515" y="70" textAnchor="middle" fill="#94a3b8" fontSize="11">Fundamental Rights + Legal Rights</text>
                        <text x="515" y="105" textAnchor="middle" fill="#6ee7b7" fontSize="12" fontWeight="bold">
                          ✓ Always Accessible (Broader Scope)
                        </text>
                      </svg>
                    </div>

                    {/* 5 Writs Pill Matrix */}
                    <div className="pt-2">
                      <span className="text-xs text-slate-400 block mb-2 font-medium">
                        5 Constitutional Writs Available under Art. 32 and Art. 226:
                      </span>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-center text-xs">
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-700">
                          <strong className="text-gold-300 block">Habeas Corpus</strong>
                          <span className="text-[10px] text-slate-400">"Produce the Body"</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-700">
                          <strong className="text-gold-300 block">Mandamus</strong>
                          <span className="text-[10px] text-slate-400">"We Command"</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-700">
                          <strong className="text-gold-300 block">Prohibition</strong>
                          <span className="text-[10px] text-slate-400">Stops Ongoing Trial</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-700">
                          <strong className="text-gold-300 block">Certiorari</strong>
                          <span className="text-[10px] text-slate-400">Quashes Past Order</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-700">
                          <strong className="text-gold-300 block">Quo Warranto</strong>
                          <span className="text-[10px] text-slate-400">"By What Authority"</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 3: UN SECURITY COUNCIL VETO SIMULATOR ── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {/* Predict Then Check Hook */}
                  {!predictionMade && (
                    <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-700/50 space-y-2">
                      <p className="text-xs font-bold text-amber-400 uppercase">Predict Before Simulating:</p>
                      <h4 className="text-sm font-semibold text-slate-100">{PREDICTION_QUESTIONS[0].question}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Predict vote outcome option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-xs text-left rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:border-amber-400"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Veto Simulator Controls */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-5">
                    <div>
                      <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-2">
                        P5 Permanent Members (Click to toggle: YES / NO (Veto) / ABSTAIN):
                      </span>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {Object.entries(p5Votes).map(([country, vote]) => (
                          <motion.button
                            key={country}
                            aria-label={`P5 Member ${country} currently voting ${vote}. Click to toggle.`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleP5VoteToggle(country)}
                            className={`p-3 rounded-xl border text-center transition-all ${
                              vote === 'yes'
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                                : vote === 'no'
                                ? 'bg-rose-950/80 border-rose-500 text-rose-300 shadow-lg shadow-rose-950/50 animate-pulse'
                                : 'bg-slate-800 border-slate-600 text-slate-400'
                            }`}
                          >
                            <span className="text-xs font-bold block">{country}</span>
                            <span className="text-xs uppercase font-mono font-black">
                              {vote === 'yes' ? '✓ YES' : vote === 'no' ? '✗ VETO (NO)' : '⚪ ABSTAIN'}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Non-P5 slider with Instant Real-Time State Binding */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <label htmlFor="non-p5-slider" className="text-slate-300 font-semibold">
                          Non-Permanent Members Voting YES (Elected for 2-Yr Terms):
                        </label>
                        <span className="font-mono font-bold text-gold-400">{nonP5YesCount} / 10 Votes</span>
                      </div>
                      <input
                        id="non-p5-slider"
                        type="range"
                        min={0}
                        max={10}
                        value={nonP5YesCount}
                        aria-label="Non-P5 affirmative votes slider"
                        aria-valuemin={0}
                        aria-valuemax={10}
                        aria-valuenow={nonP5YesCount}
                        onChange={e => handleNonP5Slider(Number(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
                      />
                    </div>

                    {/* Live Resolution Status Box */}
                    <div
                      className={`p-4 rounded-xl border-2 flex flex-col md:flex-row items-center justify-between gap-3 ${
                        resolutionPassed
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/60 border-rose-500 text-rose-200'
                      }`}
                    >
                      <div>
                        <h4 className="text-base font-bold flex items-center gap-2">
                          <span>{resolutionPassed ? '✓' : '✗'}</span>
                          Resolution Status: {resolutionPassed ? 'ADOPTED (Binding under Art. 25)' : 'BLOCKED / REJECTED'}
                        </h4>
                        <p className="text-xs opacity-90 mt-1">
                          Total Affirmative Votes: <strong>{totalYesVotes} / 15</strong> (Minimum 9 required) | P5 Vetoes Cast:{' '}
                          <strong>{p5NoCount}</strong> (Abstention is NOT a veto).
                        </p>
                      </div>
                      <div className="text-xs font-mono bg-slate-950/80 px-3 py-2 rounded-lg border border-slate-800 text-slate-300">
                        Article 27 UN Charter
                      </div>
                    </div>

                    {/* Recharts Bar Chart Breakdown */}
                    <div className="h-44 w-full pt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={votingChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                          <YAxis stroke="#64748b" fontSize={11} domain={[0, 10]} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                          />
                          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                            {votingChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 4: UN SPECIALIZED AGENCIES MISSION LAB ── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    {(['unesco', 'unicef', 'who'] as const).map(ag => (
                      <motion.button
                        key={ag}
                        aria-label={`Select UN Agency ${ag.toUpperCase()}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleAgencySelect(ag)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          selectedAgency === ag
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        <strong className="text-sm uppercase block">{ag}</strong>
                        <span className="text-xs text-slate-400">
                          {ag === 'unesco' ? 'Paris (1945)' : ag === 'unicef' ? 'New York (1946)' : 'Geneva (1948)'}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Agency Mission Inspector */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    {selectedAgency === 'unesco' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-amber-300">UNESCO: Educational, Scientific & Cultural Org.</h4>
                          <span className="text-xs bg-amber-950 px-2.5 py-1 rounded-full text-amber-300 border border-amber-800">
                            43 Indian World Heritage Sites
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          <strong>Mandate:</strong> Promotes international education standards, scientific collaboration, and preserves universal cultural heritage. Inscribed Taj Mahal (1983), Qutub Minar (1993), and Ajanta Caves (1983).
                        </p>
                      </motion.div>
                    )}

                    {selectedAgency === 'unicef' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-gold-300">UNICEF: United Nations Children's Fund</h4>
                          <span className="text-xs bg-gold-950 px-2.5 py-1 rounded-full text-gold-300 border border-gold-800">
                            190+ Countries & Territories
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          <strong>Mandate:</strong> Child survival, girl-child education, nutrition, and child protection from trafficking. Partnered in India’s <em>Sarva Shiksha Abhiyan</em> and Mid-Day Meal schemes.
                        </p>
                      </motion.div>
                    )}

                    {selectedAgency === 'who' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-emerald-300">WHO: World Health Organization</h4>
                          <span className="text-xs bg-emerald-950 px-2.5 py-1 rounded-full text-emerald-300 border border-emerald-800">
                            SEARO Office in New Delhi
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          <strong>Mandate:</strong> Global public health standards, epidemic surveillance, and technical assistance to health ministries. Certified Smallpox eradication (8 May 1980) and India Polio-Free (13 January 2014).
                        </p>
                      </motion.div>
                    )}

                    {/* GSAP Timeline Cards */}
                    <div ref={timelineRef} className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-2 text-xs">
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-amber-400 font-bold block">1945 - UN & UNESCO</span>
                        <p className="text-slate-400 mt-1">San Francisco Conference (UN) and London/Paris (UNESCO).</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-emerald-400 font-bold block">1980 - Smallpox Gone</span>
                        <p className="text-slate-400 mt-1">WHO certifies the complete global eradication of smallpox.</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-gold-400 font-bold block">2014 - India Polio-Free</span>
                        <p className="text-slate-400 mt-1">Certified by WHO on 13 Jan 2014 after 3 zero-case years.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex justify-between items-center pt-2">
                <motion.button
                  aria-label="Previous Lab Step"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>
                <span className="text-xs text-slate-500 font-mono">
                  Module {currentSlide + 1} / {EXPLORATION_STEPS.length}
                </span>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    aria-label="Next Lab Step"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    className="px-5 py-2 rounded-xl bg-gold-600 text-white font-bold text-xs shadow-md"
                  >
                    Next Lab Step →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Enter Free Sandbox"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs rounded-xl shadow-lg"
                  >
                    Enter Free Sandbox 🎮 →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ── PHASE 3: SANDBOX / FREE PLAY ── */}
      {phase === 'sandbox' && (
        <motion.div key="sandbox-phase" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-950 via-slate-900 to-gold-950 border border-teal-800/40">
            <h3 className="text-lg font-bold text-teal-300">Constitutional & UN Sandbox (Free Play)</h3>
            <p className="text-xs text-slate-300 mt-1">
              Explore any simulation mode with zero grading pressure. Toggle voting options, test writ thresholds, and examine the balance of powers before starting CISCE graded challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mini Electorate Sandbox */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center justify-between">
                <span>Electorate Simulator</span>
                <span className="text-xs text-amber-400 font-mono">{electorateMode.toUpperCase()}</span>
              </h4>
              <div className="flex gap-2">
                <button
                  aria-label="Toggle to Vice-Presidential Electorate with MPs only"
                  onClick={() => handleElectorateToggle('vice_president')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border ${
                    electorateMode === 'vice_president'
                      ? 'bg-gold-600 border-gold-400 text-white'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  VP Electorate (MPs Only)
                </button>
                <button
                  aria-label="Toggle to Presidential Electorate with MPs and MLAs"
                  onClick={() => handleElectorateToggle('president')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border ${
                    electorateMode === 'president'
                      ? 'bg-amber-600 border-amber-400 text-white'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  Pres. Electorate (MPs + MLAs)
                </button>
              </div>
              <p className="text-xs text-slate-400">
                {electorateMode === 'vice_president'
                  ? 'Active: Lok Sabha MPs (543) + Rajya Sabha MPs (245). State MLAs excluded.'
                  : 'Active: Elected MPs + Elected MLAs of 28 states & 3 UTs (Delhi, Puducherry, J&K).'}
              </p>
            </div>

            {/* Mini Security Council Sandbox */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center justify-between">
                <span>UNSC Veto Quick Tester</span>
                <span className={`text-xs font-mono font-bold ${resolutionPassed ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {resolutionPassed ? '✓ PASSED (≥9 Yes, 0 Veto)' : '✗ VETOED / BLOCKED'}
                </span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {Object.keys(p5Votes).map(c => (
                  <button
                    key={c}
                    aria-label={`Toggle vote for ${c}`}
                    onClick={() => handleP5VoteToggle(c)}
                    className={`px-2 py-1 rounded text-xs font-mono font-bold border ${
                      p5Votes[c] === 'yes'
                        ? 'bg-emerald-900 border-emerald-500 text-emerald-200'
                        : p5Votes[c] === 'no'
                        ? 'bg-rose-900 border-rose-500 text-rose-200'
                        : 'bg-slate-800 border-slate-600 text-slate-400'
                    }`}
                  >
                    {c}: {p5Votes[c].toUpperCase()}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400">
                Current Yes Votes: <strong>{totalYesVotes}</strong> | P5 Vetoes: <strong>{p5NoCount}</strong>
              </p>
            </div>
          </div>

          <div className="text-center pt-3">
            <motion.button
              aria-label="Ready for CISCE Challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-8 py-3 bg-gradient-to-r from-gold-600 via-purple-600 to-amber-600 text-white font-black text-sm rounded-2xl shadow-xl border border-gold-400/30"
            >
              Ready for CISCE Challenges! 🎯 →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ── PHASE 4: CHALLENGE PHASE ── */}
      {phase === 'challenge' && (
        <motion.div key="challenge-phase" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {/* Challenge HUD */}
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-md">
            <div>
              <span className="text-xs text-slate-400 block font-medium">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <h3 className="text-sm md:text-base font-bold text-white">
                Node: {activeChallenge.nodeId}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-gold-500/20 text-gold-300 border border-gold-500/30">
                NEP 2020: {activeChallenge.competencyLevel}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs font-black px-2.5 py-1 rounded-full uppercase border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : difficulty === 'advanced'
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                    : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                }`}
              >
                {difficulty}
              </motion.span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-amber-500 to-emerald-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Question Card Container */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 md:p-6 bg-slate-900 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'border-slate-800'
            }`}
          >
            <h2 className="text-base md:text-lg font-bold text-slate-100 leading-snug mb-4">
              {activeChallenge.question}
            </h2>

            {/* FORMAT A: MCQ Types */}
            {(activeChallenge.type === 'classify' ||
              activeChallenge.type === 'distinguish' ||
              activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="space-y-2.5">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01, x: 3 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-3.5 rounded-xl text-sm font-medium border transition-all ${
                        showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:border-gold-500'
                      }`}
                    >
                      <span className="inline-block w-6 h-6 rounded-full bg-slate-700 text-xs font-bold text-center leading-6 mr-2.5 text-slate-300">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                      {showExplanation && i === activeChallenge.correctIndex && ' ✓'}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* FORMAT B: Drag-Label Diagram */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag each item into its matching target slot:</span>
                  {activeChallenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable qualification item: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-gold-600 text-white rounded-lg cursor-grab text-xs font-bold shadow-md"
                    >
                      ✋ {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* Drop Target Slots */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label="High Court Judge Qualification drop slot"
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('target_hc_judge')}
                    className="p-4 rounded-xl bg-slate-950 border-2 border-dashed border-slate-700 text-center min-h-[90px] flex flex-col justify-center items-center"
                  >
                    <span className="text-xs text-slate-400 block mb-1">High Court Judge Route:</span>
                    <strong className="text-sm text-amber-300">
                      {droppedLabels['target_hc_judge'] || '[Drop Required Years Here]'}
                    </strong>
                  </div>

                  <div
                    role="button"
                    tabIndex={0}
                    aria-label="High Court Advocate Qualification drop slot"
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('target_hc_adv')}
                    className="p-4 rounded-xl bg-slate-950 border-2 border-dashed border-slate-700 text-center min-h-[90px] flex flex-col justify-center items-center"
                  >
                    <span className="text-xs text-slate-400 block mb-1">High Court Advocate Route:</span>
                    <strong className="text-sm text-amber-300">
                      {droppedLabels['target_hc_adv'] || '[Drop Required Years Here]'}
                    </strong>
                  </div>

                  <div
                    role="button"
                    tabIndex={0}
                    aria-label="Distinguished Jurist category drop slot"
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('target_jurist')}
                    className="p-4 rounded-xl bg-slate-950 border-2 border-dashed border-slate-700 text-center min-h-[90px] flex flex-col justify-center items-center"
                  >
                    <span className="text-xs text-slate-400 block mb-1">Presidential Opinion Category:</span>
                    <strong className="text-sm text-amber-300">
                      {droppedLabels['target_jurist'] || '[Drop Jurist Label Here]'}
                    </strong>
                  </div>
                </div>

                <motion.button
                  aria-label="Verify Qualifications Mapping"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2 bg-gold-600 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Verify Qualifications Mapping ✓
                </motion.button>
              </div>
            )}

            {/* FORMAT C: Drag-Sort */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 block">
                  Drag and drop items to arrange in descending constitutional order:
                </span>
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span>
                        <strong className="text-amber-400 mr-2">{displayIdx + 1}.</strong> {item}
                      </span>
                      <span className="text-xs text-slate-500">↕ Drag</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Submit Order Arrangement"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2 bg-gold-600 text-white font-bold rounded-xl text-xs shadow-md mt-2"
                >
                  Submit Order Arrangement ✓
                </motion.button>
              </div>
            )}

            {/* FORMAT D: Numeric Input */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    aria-label={`Enter numerical answer in ${activeChallenge.unit}`}
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter numeric answer"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48 focus:border-gold-500 outline-none"
                  />
                  <span className="text-sm font-semibold text-slate-400">{activeChallenge.unit}</span>
                  <motion.button
                    aria-label="Check numeric answer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-gold-600 text-white font-bold text-xs rounded-xl shadow-md disabled:opacity-50"
                  >
                    Check Answer ✓
                  </motion.button>
                </div>
              </div>
            )}

            {/* FORMAT E: Construct Assembly */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4 pt-2">
                <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add phrase segment: ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-gold-300 border border-slate-700 rounded-lg text-xs font-semibold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px]">
                  <span className="text-[10px] text-slate-500 block mb-1">Constructed Principle Statement:</span>
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {constructParts.map((p, i) => (
                      <span key={i} className="px-2.5 py-1 bg-gold-950 border border-gold-700 text-gold-200 rounded text-xs">
                        {p}
                        <button
                          aria-label={`Remove phrase ${p}`}
                          onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                          className="ml-1.5 text-rose-400 font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-600 italic">Click parts above to build the phrase.</span>
                    )}
                  </div>
                </div>

                <motion.button
                  aria-label="Verify Constructed Statement"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2 bg-gold-600 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Verify Constructed Statement ✓
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Explanation Card */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-5 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border border-amber-600/50 rounded-2xl space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold text-sm">📖 Constitutional Analysis & Solution:</span>
                </div>

                <div className="space-y-2">
                  {activeChallenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, sIdx) => (
                      <motion.p
                        key={sIdx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-slate-200 leading-relaxed"
                      >
                        <span className="font-bold text-amber-400">{sIdx + 1}.</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps <
                  activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    aria-label="Reveal Next Reasoning Step"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-3.5 py-1.5 bg-amber-700/60 hover:bg-amber-700 text-white text-xs font-bold rounded-lg border border-amber-500/50"
                  >
                    Reveal Next Reasoning Step ⬇
                  </motion.button>
                )}

                {revealedSteps >=
                  activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <div className="pt-2">
                    <motion.button
                      aria-label="Proceed to Next Challenge"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs md:text-sm rounded-xl shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Finish Simulation & View Results →'
                        : 'Next Challenge →'}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ── PHASE 5: COMPLETION & MOTIVATIONAL FEEDBACK ── */}
      {phase === 'complete' && (
        <motion.div
          key="complete-phase"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Hero Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-gold-950 via-slate-900 to-amber-950 border border-amber-500/40 text-center space-y-3 shadow-2xl">
            <span className="text-5xl block animate-bounce">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Constitutional Mastery Certified!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have completed the comprehensive CISCE Class 8 Civics simulation on the Union Executive, Judiciary, and United Nations.
            </p>

            <div className="flex justify-center gap-6 pt-3">
              <div className="p-3 px-5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <strong className="text-xl md:text-2xl font-black text-amber-400">
                  {Math.max(0, 100 - errors * 5)}%
                </strong>
              </div>
              <div className="p-3 px-5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-xs text-slate-400 block">BKT Mastery Tier</span>
                <strong className="text-xl md:text-2xl font-black text-emerald-400 uppercase">
                  {masteryLevel}
                </strong>
              </div>
            </div>
          </div>

          {/* Motivational Feedback Banner (Exact Tier Matching) */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="text-sm font-bold text-gold-300 mb-1">Evaluator Feedback:</h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm font-semibold">
              {errors === 0 && (
                <p className="text-emerald-400">
                  🌟 <strong>PERFECT SCORE!</strong> Outstanding flawless performance! You have thoroughly mastered all constitutional provisions and UN organs.
                </p>
              )}
              {errors >= 1 && errors <= 3 && (
                <p className="text-teal-300">
                  👏 <strong>Great work!</strong> Excellent grasp of the Union Executive and UN structure. Review the minor points below to reach a 100% board standard.
                </p>
              )}
              {errors >= 4 && errors <= 7 && (
                <p className="text-amber-300">
                  💪 <strong>Good effort!</strong> Make sure to review the specific misconceptions below and retry the simulation to solidify your concepts.
                </p>
              )}
              {errors >= 8 && (
                <p className="text-rose-300">
                  🛡️ <strong>Do not give up — You WILL get this!</strong> Review the core constitutional articles and replay the interactive labs.
                </p>
              )}
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Specific Gaps Identified in Your Answers:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const item = misconceptions?.[mIdx];
                  if (!item) return null;
                  return (
                    <div key={i} className="p-3 rounded-xl bg-slate-950/80 border border-rose-900/40 text-xs space-y-1">
                      <p className="text-rose-400 font-bold">✗ Misconception: {item.misconception}</p>
                      <p className="text-emerald-300">✓ Constitutional Fact: {item.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition (SM-2) Schedule Visibility */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-amber-400 block">SRS Spaced Repetition Schedule</span>
              <p className="text-xs text-slate-400 mt-0.5">
                Optimal retention review scheduled in{' '}
                <strong className="text-slate-200">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </strong>
                .
              </p>
            </div>
            <div className="text-xs font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-amber-300">
              SM-2 Active
            </div>
          </div>

          {/* Real World Diplomatic Activity */}
          <div className="p-5 rounded-2xl bg-gold-950/40 border border-gold-800/60 space-y-3">
            <h3 className="text-sm md:text-base font-bold text-gold-300 flex items-center gap-2">
              <span>🌐</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">{i + 1}.</span> {st}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ── SIM ENGINE FEEDBACK OVERLAYS ── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C8_HistoryCivicsVicepresidentQualificationsElectionSim;