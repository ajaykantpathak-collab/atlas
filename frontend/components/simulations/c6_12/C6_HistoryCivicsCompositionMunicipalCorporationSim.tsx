'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst,
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NAMED NODE CONSTANTS (Required string literals) ───
const NODE_C6_HISTCIV_061 = 'c6_histciv_061';
const NODE_C6_HISTCIV_062 = 'c6_histciv_062';
const NODE_C6_HISTCIV_063 = 'c6_histciv_063';
const NODE_C6_HISTCIV_064 = 'c6_histciv_064';
const NODE_C6_HISTCIV_065 = 'c6_histciv_065';

const ALL_NODE_IDS = [
  NODE_C6_HISTCIV_061,
  NODE_C6_HISTCIV_062,
  NODE_C6_HISTCIV_063,
  NODE_C6_HISTCIV_064,
  NODE_C6_HISTCIV_065,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Crisis in Ward 14: The Monsoon Urban Challenge',
  intro: 'Heavy monsoon rains have hit a bustling metropolitan city. In Ward 14, stormwater drains are blocked, drinking water pipelines are contaminated, and streetlight cables are exposed. Over 1.2 crore citizens are looking to their civic administration for emergency relief and permanent solutions.',
  context: 'As the Chief Civic Strategy Officer, you must navigate the dual wings of urban government — coordinating the elected Mayor and Councillors who deliberate and allocate budgets, and the appointed IAS Municipal Commissioner whose departments execute engineering, public health, and disaster response on the ground.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'A main water pipeline bursts in Ward 14, flooding the street and cutting drinking water to 50,000 residents. Who has the legal executive authority to directly dispatch repair engineers and heavy machinery?',
  options: [
    'The Mayor (Elected political head of the Corporation)',
    'The Municipal Commissioner (Appointed IAS Administrative Head)',
    'The Ward Councillor (Elected local representative)',
    'The State Police Superintendent',
  ],
  correctIndex: 1,
  hintAfter: 'Many people assume the Mayor commands municipal staff! In reality, the Municipal Commissioner heads the appointed executive wing that executes all ground administration.',
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

// ─── 22 CHALLENGES (NEP 2020 / CISCE 2026 Aligned) ───
const CHALLENGES: Challenge[] = [
  // ── Foundation Challenges (7) ──
  {
    id: 'ch_01_fond_comp',
    nodeId: NODE_C6_HISTCIV_061,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How does a Ward Councillor become a member of the Municipal Corporation?',
    options: [
      'Appointed directly by the Governor of the State',
      'Directly elected by the registered voters of their specific ward',
      'Nominated by the Municipal Commissioner for technical expertise',
      'Selected through the Union Public Service Commission (UPSC) exam',
    ],
    correctIndex: 1,
    explanation: 'Councillors are the democratic bedrock of the Corporation. Each city is carved into geographical wards, and registered adult voters directly elect one Councillor to represent them for a 5-year term under Article 243R.',
    hints: [
      'Think about who represents the ordinary citizens at the neighbourhood ward level.',
      'They are the direct democratic voice of the local residents.',
      'Voters in each ward cast their ballots directly to elect their Councillor.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_02_fond_drag_wings',
    nodeId: NODE_C6_HISTCIV_061,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each key civic role to its correct wing or advisory status in the Corporation architecture.',
    dragItems: [
      { label: 'Mayor', targetId: 'wing_delib_head' },
      { label: 'Municipal Commissioner', targetId: 'wing_exec_head' },
      { label: 'Councillors', targetId: 'wing_delib_members' },
      { label: 'Aldermen', targetId: 'wing_advisory' },
    ],
    correctMapping: {
      wing_delib_head: 'Mayor',
      wing_exec_head: 'Municipal Commissioner',
      wing_delib_members: 'Councillors',
      wing_advisory: 'Aldermen',
    },
    explanation: 'The Corporation is structured into a Deliberative Wing (Mayor and Councillors who debate and pass policies), an Executive Wing (IAS Commissioner who executes works), and Nominated Advisors (Aldermen who offer expertise).',
    hints: [
      'The Mayor presides over the deliberative council meetings.',
      'The IAS officer leads the executive administrative machinery.',
      'Aldermen are seasoned elders nominated for their special expertise in public affairs.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_03_fond_security',
    nodeId: NODE_C6_HISTCIV_062,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under the seven core functions of a Municipal Corporation, what does "Public Security" specifically include?',
    options: [
      'Operating the city police stations and arresting criminals',
      'Operating municipal fire brigades, disaster rescue, and building safety',
      'Guarding state borders and national highways',
      'Managing the judicial magistrate courts in the district',
    ],
    correctIndex: 1,
    explanation: 'In municipal civics, "Public Security" strictly refers to fire services, rescue operations, and disaster preparedness. Policing and law-and-order are state government functions handled by the State Police under the DGP.',
    hints: [
      'Do not confuse the local civic body with the State Home Department.',
      'Think of red emergency vehicles with water hoses and rescue ladders.',
      'The Corporation operates fire stations; police stations belong to the State Government.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_04_fond_town_head',
    nodeId: NODE_C6_HISTCIV_064,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the official title of the elected political head of a Municipality (Nagar Palika) in a smaller town?',
    options: [
      'Mayor',
      'President / Chairperson',
      'Municipal Commissioner',
      'District Magistrate',
    ],
    correctIndex: 1,
    explanation: 'The elected political head of a Municipality (Nagar Palika) is the President or Chairperson. The title "Mayor" is reserved exclusively for the head of a Municipal Corporation (Mahanagar Palika) in a large metropolitan city.',
    hints: [
      'The title "Mayor" is only used in large metropolitan cities of over 1 million residents.',
      'Smaller towns use a title common to committees and councils.',
      'The elected leader of a Nagar Palika is termed the President or Chairperson.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_05_fond_swachh_date',
    nodeId: NODE_C6_HISTCIV_065,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On which historic date was the national Swachh Bharat Mission launched to promote citizen sanitation and cleanliness?',
    options: [
      '15th August 1947',
      '26th January 1950',
      '2nd October 2014',
      '5th September 2018',
    ],
    correctIndex: 2,
    explanation: 'The Swachh Bharat Mission was launched on 2nd October 2014 (Mahatma Gandhi’s birth anniversary) to mobilise citizen participation in waste management, toilet construction, and open defecation eradication.',
    hints: [
      'It is celebrated on Gandhi Jayanti.',
      'The launch occurred in the year 2014.',
      'The exact date is 2nd October 2014.',
    ],
  },
  {
    id: 'ch_06_fond_pop_threshold',
    nodeId: NODE_C6_HISTCIV_064,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to the 74th Constitutional Amendment, what is the minimum population (in lakhs) typically required for an urban city to establish a full Municipal Corporation?',
    correctAnswer: 10,
    tolerance: 0,
    unit: 'lakhs (1 million)',
    explanation: 'A metropolitan city requiring a Municipal Corporation (Mahanagar Palika) must have a population exceeding 10 lakhs (1 million). Towns with 20,000 to 1,00,000 residents have Municipalities (Nagar Palikas).',
    hints: [
      'Think of 1 million converted into Indian lakhs.',
      '1 million equals 10,00,000.',
      'Enter the number 10.',
    ],
  },
  {
    id: 'ch_07_fond_aldermen_role',
    nodeId: NODE_C6_HISTCIV_061,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How are Aldermen appointed to the Municipal Corporation, and what is their primary function?',
    options: [
      'Elected directly by slum dwellers to represent urban poor',
      'Nominated for their seasoned experience in town planning, law, or medicine to advise the council',
      'Appointed as armed officers to enforce municipal taxes',
      'Selected by lottery among primary school teachers',
    ],
    correctIndex: 1,
    explanation: 'Aldermen are distinguished persons nominated by the government or council for their special knowledge and wisdom. They do not represent a specific ward but enrich council debates with expert guidance.',
    hints: [
      'Aldermen do NOT win ward elections.',
      'They are chosen like elder statesmen or domain experts.',
      'They are nominated for their distinguished experience in public affairs.',
    ],
    misconceptionIndex: 1,
  },

  // ── Standard Challenges (8) ──
  {
    id: 'ch_08_std_decision_flow',
    nodeId: NODE_C6_HISTCIV_063,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of how a civic improvement project (e.g., building a new storm drain) moves from problem to completion:',
    sortItems: [
      'Ward Councillor notes flooding and raises a proposal in Corporation meeting',
      'Mayor presides over council debate; Councillors vote and approve the budget allocation',
      'Municipal Commissioner directs the Engineering Department to draft tenders and execute construction',
      'Ward citizens and Councillor inspect completed drain and report functioning via civic portal',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The decision flow perfectly illustrates the dual structure: 1) Proposal by elected Councillor → 2) Deliberation & budget sanction by Mayor-led council → 3) Execution by IAS Commissioner’s engineers → 4) Citizen feedback and oversight.',
    hints: [
      'Start with the elected representative who hears from the local residents.',
      'Next comes deliberative debate and budget sanction in the council chamber.',
      'Then the administrative engineering department executes the physical ground work.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_09_std_mayor_vs_comm',
    nodeId: NODE_C6_HISTCIV_063,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A citizen argues: "The Mayor is the boss of the city, so the Mayor can directly suspend a lazy junior pipeline engineer." Why is this statement legally INCORRECT?',
    options: [
      'Because engineers can only be disciplined by the President of India',
      'Because the Mayor is the deliberative head; administrative and staff control belongs exclusively to the Municipal Commissioner',
      'Because engineers are private contractors who have no government superiors',
      'Because the Mayor is only allowed to attend social parties and has zero official power',
    ],
    correctIndex: 1,
    explanation: 'The Mayor presides over meetings, represents the city ceremonially, and guides policy, but has NO executive power over municipal employees. All staff, hiring, disciplinary action, and departmental work fall under the Municipal Commissioner.',
    hints: [
      'Remember the clean division between the Deliberative Wing and the Executive Wing.',
      'Who runs the day-to-day administration and supervises all municipal departments?',
      'The IAS Municipal Commissioner commands all civic staff, not the Mayor.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_10_std_functions_match',
    nodeId: NODE_C6_HISTCIV_062,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Which of the following pairings correctly matches a real Indian civic emergency to the relevant core function of the Municipal Corporation?',
    options: [
      'High-rise fire in a commercial tower → Public Health & Sanitation',
      'Monsoon dengue outbreak & mosquito fogging → Public Health & Sanitation',
      'Investigating a bank robbery on Main Street → Public Security',
      'Regulating national railway timetables → Public Works',
    ],
    correctIndex: 1,
    explanation: 'Mosquito fumigation, anti-larval sprays, drainage sanitation, and dispensary management fall directly under Public Health & Sanitation. (High-rise fires fall under Public Security/Fire, and bank robberies belong to State Police).',
    hints: [
      'Look for the service that manages disease vectors, clinics, and cleanliness.',
      'Mosquito control directly preserves the health of city residents.',
      'Monsoon dengue fogging is a core Public Health & Sanitation responsibility.',
    ],
  },
  {
    id: 'ch_11_std_grievance_steps',
    nodeId: NODE_C6_HISTCIV_065,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Rhea notices open garbage dumped near her school gate. She submits a photo on the MCD 311 / CPGRAMS civic app. What makes this digital grievance system responsive?',
    options: [
      'It instantly deletes the complaint after 24 hours to keep the server clean',
      'It issues a unique tracking ID, routes the ticket to the Ward Sanitation Officer, and auto-escalates if unresolved',
      'It sends a police patrol van to arrest whoever dropped the candy wrapper',
      'It automatically awards cash rewards to the citizen without fixing the garbage',
    ],
    correctIndex: 1,
    explanation: 'Modern platforms like CPGRAMS and municipal 311 apps assign unique tracking numbers, route issues to specific departmental engineers, enforce time-bound resolution (Service Level Agreements), and escalate to higher IAS officers if delayed.',
    hints: [
      'Think about how tracking works on courier and customer service apps.',
      'It holds officers accountable through a ticket number and escalation deadlines.',
      'The system logs a unique ID, notifies the specific department, and tracks progress.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_12_std_muni_vs_corp',
    nodeId: NODE_C6_HISTCIV_064,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare the administrative scale of Mumbai (Brihanmumbai Municipal Corporation) with Mahabaleshwar (Municipal Council). Which comparison is accurate?',
    options: [
      'Mumbai is headed by an Executive Officer; Mahabaleshwar is headed by an IAS Municipal Commissioner',
      'Mumbai serves >1.2 crore citizens with thousands of crores in budget; Mahabaleshwar serves a few thousand residents with a focused town budget',
      'Mahabaleshwar has a Mayor and 227 Councillors; Mumbai has only a President and 5 ward members',
      'Both have identical annual budgets of ₹50,000 crores and identical staffing',
    ],
    correctIndex: 1,
    explanation: 'A Municipal Corporation (Mahanagar Palika) governs large metropolises with massive budgets, hundreds of wards, and multi-tier departments, while a Municipal Council (Nagar Palika) is scaled down for smaller towns.',
    hints: [
      'Consider the massive difference in population between a mega-city and a hill town.',
      'Mumbai has over 1 crore people; Mahabaleshwar has tens of thousands.',
      'Corporations handle huge metropolitan populations and budgets.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_13_std_revenue_sources',
    nodeId: NODE_C6_HISTCIV_062,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What is the largest independent internal source of tax revenue for a Municipal Corporation to fund schools, roads, and water supply?',
    options: [
      'Customs import duties on international shipping',
      'Property tax levied on residential and commercial land and buildings',
      'Income tax deducted from corporate salaries',
      'Fines collected by the traffic police',
    ],
    correctIndex: 1,
    explanation: 'Property Tax (House Tax) on land and buildings is the financial backbone of urban local bodies. Income tax and customs duties belong to the Central Government.',
    hints: [
      'Which tax is tied directly to real estate, houses, and offices within the city?',
      'The Corporation taxes immovable properties located in each municipal ward.',
      'Property Tax is the foremost local revenue source.',
    ],
  },
  {
    id: 'ch_14_std_article_74th',
    nodeId: NODE_C6_HISTCIV_061,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which landmark Constitutional Amendment Act granted constitutional status and a 3-tier structure to Urban Local Governments in India in 1992?',
    options: [
      '42nd Constitutional Amendment Act',
      '73rd Constitutional Amendment Act (Rural Panchayats)',
      '74th Constitutional Amendment Act (Urban Municipalities)',
      '86th Constitutional Amendment Act (Right to Education)',
    ],
    correctIndex: 2,
    explanation: 'The 74th Constitutional Amendment Act of 1992 added Part IX-A and the Twelfth Schedule to the Indian Constitution, establishing Nagar Panchayats, Municipal Councils, and Municipal Corporations.',
    hints: [
      '73rd was for rural villages (Panchayati Raj); the very next one was for cities.',
      'It added Article 243P through 243ZG.',
      'The 74th Amendment Act of 1992 governs urban local bodies.',
    ],
  },
  {
    id: 'ch_15_std_calc_councillors',
    nodeId: NODE_C6_HISTCIV_061,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The Brihanmumbai Municipal Corporation (BMC) has exactly 227 wards. If each ward elects exactly 1 Councillor, how many total directly elected Councillors sit in the BMC council hall?',
    correctAnswer: 227,
    tolerance: 0,
    unit: 'Councillors',
    explanation: 'Every single ward directly elects exactly 1 representative. Therefore, 227 wards elect exactly 227 Councillors to the deliberative house.',
    hints: [
      'Each ward has 1 single-member constituency.',
      '227 wards × 1 Councillor per ward = ?',
      'Enter 227.',
    ],
  },

  // ── Advanced Challenges (7) ──
  {
    id: 'ch_16_adv_construct_complaint',
    nodeId: NODE_C6_HISTCIV_065,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Build an effective civic grievance action plan for a broken water main causing disease outbreak in your neighbourhood.',
    availableParts: [
      'Report on CPGRAMS/311 app with photo & geo-tag',
      'Inform Ward Councillor for emergency council sanction',
      'Municipal Health & Water Department dispatches repair team',
      'Organise Swachh neighbourhood water boiling awareness drive',
    ],
    targetState: 'Report on CPGRAMS/311 app with photo & geo-tag Inform Ward Councillor for emergency council sanction Municipal Health & Water Department dispatches repair team Organise Swachh neighbourhood water boiling awareness drive',
    validationHint: 'Add all four constructive actions in logical order: digital report → representative escalation → administrative repair → community awareness.',
    explanation: 'Holistic civic engagement combines digital ticketing (app), democratic escalation (Councillor), executive resolution (Department), and grassroots citizen hygiene (Swachh drive).',
    hints: [
      'Start with filing the digital report with photo proof.',
      'Next alert your elected Ward Councillor.',
      'Then let the executive department repair the pipeline, followed by community health awareness.',
    ],
  },
  {
    id: 'ch_17_adv_conflict_analysis',
    nodeId: NODE_C6_HISTCIV_063,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'During a civic crisis, elected Councillors demand immediate budget distribution for beautification fountains, but the IAS Commissioner refuses, citing urgent sewage flood repair laws. How does the constitutional system resolve this friction?',
    options: [
      'The Mayor can immediately fire the Commissioner and recruit a family member',
      'The State Government acts as an external check and can review laws or dissolve non-performing councils, while both wings operate under the Municipal Act',
      'The Commissioner becomes a permanent military dictator of the city',
      'Councillors can physically lock the municipal headquarters forever',
    ],
    correctIndex: 1,
    explanation: 'The dual structure balances popular will with administrative rules. The Commissioner must enforce statutory budget laws passed by the State Legislature; if unresolvable deadlocks occur, the State Government provides arbitration or can dissolve an unconstitutional body under Article 243U.',
    hints: [
      'Who oversees both the Municipal Corporation and appoints the IAS Commissioner?',
      'The State Government holds constitutional supervisory authority.',
      'State laws and government oversight maintain checks and balances between both wings.',
    ],
  },
  {
    id: 'ch_18_adv_eval_privatisation',
    nodeId: NODE_C6_HISTCIV_062,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why cannot essential metropolitan functions like city-wide water pipelines and firefighting be left entirely to uncoordinated private private companies?',
    options: [
      'Because private companies are forbidden by law from buying motor vehicles',
      'Because public goods require massive economies of scale, universal access regardless of income, and legal authority to dig roads and enter burning buildings',
      'Because private individuals already run all municipal water grids in India for free',
      'Because fire engines are only manufactured in state-owned government labs',
    ],
    correctIndex: 1,
    explanation: 'Public goods like clean water networks, universal primary schooling, and fire rescue require vast capital grids, legal powers of eminent domain, and guaranteed non-profit service for vulnerable citizens who cannot pay premium market rates.',
    hints: [
      'Think of equity: what happens to poor neighbourhoods if private companies only serve wealthy ones?',
      'Consider the immense capital needed to lay 1,000s of km of water pipes from distant dams.',
      'Universal service, massive scale, and legal authority make a public Corporation essential.',
    ],
  },
  {
    id: 'ch_19_adv_rural_urban_parallel',
    nodeId: NODE_C6_HISTCIV_064,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Which table correctly pairs the rural Panchayati Raj roles with their exact urban Municipal Corporation equivalents?',
    options: [
      'Gram Sarpanch ↔ Municipal Commissioner; Panchayat Secretary ↔ Mayor',
      'Gram Sarpanch (Elected Head) ↔ Mayor (Elected Head); Panchayat Secretary (Appointed) ↔ Municipal Commissioner (Appointed)',
      'Zilla Parishad Adhyaksha ↔ Ward Sweeper; Block BDO ↔ Alderman',
      'Gram Sabha (All Voters) ↔ Municipal Commissioner; Gram Pradhan ↔ Executive Officer',
    ],
    correctIndex: 1,
    explanation: 'The democratic architecture is parallel across India: The elected village political head (Sarpanch) parallels the urban Mayor, while the appointed government administrator (Panchayat Secretary) parallels the IAS Municipal Commissioner.',
    hints: [
      'Match elected political head with elected political head.',
      'Match appointed executive administrator with appointed executive administrator.',
      'Sarpanch matches Mayor; Secretary matches Municipal Commissioner.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_20_adv_swachh_segregation',
    nodeId: NODE_C6_HISTCIV_065,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In a school Swachh Bharat cleanliness initiative, students implement source waste segregation. Which combination of waste and bin colours follows national municipal standards?',
    options: [
      'Green Bin: Dry plastic, glass & paper | Blue Bin: Wet vegetable peels & leftover food',
      'Green Bin: Wet biodegradable organic waste | Blue Bin: Dry recyclable plastic, metal & paper',
      'Red Bin: Kitchen food scraps | Yellow Bin: Clear rainwater',
      'Black Bin only: Mixed unsegregated waste for open landfill burning',
    ],
    correctIndex: 1,
    explanation: 'Under Swachh Bharat municipal rules, Green Bins are designated for Wet (biodegradable/kitchen/food) waste for composting, while Blue Bins are for Dry (recyclable plastic/paper/metal) waste.',
    hints: [
      'Green represents nature/plants/organic compostable items.',
      'Blue represents recyclable materials like dry plastic and paper.',
      'Green = Wet Organic, Blue = Dry Recyclable.',
    ],
  },
  {
    id: 'ch_21_adv_tax_budget_calc',
    nodeId: NODE_C6_HISTCIV_062,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A city Corporation budgets ₹500 crores for annual civic services. If 40% of this budget is funded by local Property Tax, how many crores are collected directly from property owners?',
    correctAnswer: 200,
    tolerance: 0,
    unit: 'crores',
    explanation: '40% of ₹500 crores = (40 / 100) × 500 = ₹200 crores collected from property tax.',
    hints: [
      'Multiply 500 by 0.40.',
      '500 × 40 / 100 = 200.',
      'Enter 200.',
    ],
  },
  {
    id: 'ch_22_adv_council_term',
    nodeId: NODE_C6_HISTCIV_061,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'recall',
    question: 'Under Article 243U of the Constitution, what is the fixed duration (in years) of a Municipal Corporation council from the date of its first meeting?',
    correctAnswer: 5,
    tolerance: 0,
    unit: 'years',
    explanation: 'Article 243U specifies that every Municipal Corporation and Municipality shall continue for a term of five years from the date appointed for its first meeting unless dissolved earlier.',
    hints: [
      'It is identical to the term of the Lok Sabha and State Legislative Assemblies.',
      'Elections occur every half-decade.',
      'Enter 5.',
    ],
  },
];

// ─── EXPLORATION STEPS (Interactive Guided Steps) ───
const EXPLORATION_STEPS = [
  {
    title: 'The Dual-Wing Architecture',
    instruction: 'Click on each component in the Corporation Chamber to see who is elected vs appointed.',
    interactionType: 'click-architecture',
    nodeId: NODE_C6_HISTCIV_061,
  },
  {
    title: 'The Seven Core Functions Hub',
    instruction: 'Inspect the 7 municipal service domains radiating across urban infrastructure.',
    interactionType: 'wheel-functions',
    nodeId: NODE_C6_HISTCIV_062,
  },
  {
    title: 'Deliberation to Execution: Decision Flow',
    instruction: 'Adjust the civic emergency slider to test how the council and commissioner coordinate.',
    interactionType: 'slider-flow',
    nodeId: NODE_C6_HISTCIV_063,
  },
  {
    title: 'City vs Small Town: Scale Architecture',
    instruction: 'Drag the urban population slider from 20,000 to 1.5 crore to observe governance transformation.',
    interactionType: 'slider-scale',
    nodeId: NODE_C6_HISTCIV_064,
  },
  {
    title: 'Active Citizen Grievance Tracker',
    instruction: 'Simulate resolving a community emergency from citizen report to department repair.',
    interactionType: 'interactive-grievance',
    nodeId: NODE_C6_HISTCIV_065,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If a city’s population suddenly surges past 12 lakh residents, what happens to its governance structure?',
    options: [
      'It continues as a small Gram Panchayat with a Sarpanch',
      'The State Government upgrades its Nagar Palika into a full Municipal Corporation with a Mayor and IAS Commissioner',
      'The city is converted into a military cantonment with no elections',
      'All municipal offices are closed permanently',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the population slider past 10 Lakhs (1 Million) to verify the automatic transition to a Municipal Corporation!',
    nodeId: NODE_C6_HISTCIV_064,
  },
  {
    question: 'Predict: If citizens stop reporting broken streetlights and blocked drains on civic apps, what is the consequence?',
    options: [
      'The Corporation automatically detects 100% of faults using telepathy',
      'Unnoticed faults cause widespread dark accident zones and monsoon waterlogging',
      'The city tax rate automatically drops to zero',
      'The Mayor personally visits every single lane every hour',
    ],
    correctIndex: 1,
    verifyInstruction: 'Run the citizen response simulator to see how prompt complaints reduce flood severity by 80%!',
    nodeId: NODE_C6_HISTCIV_065,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the relationship between the Deliberative Wing and the Executive Wing?',
    observableOptions: [
      'The elected wing passes policies and sanctions funds, while the appointed wing provides technical machinery to execute them',
      'The appointed wing has zero authority and does nothing',
      'The Mayor directly drives the bulldozer and repairs all pipes personally',
      'There is no connection between policy and execution',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_HISTCIV_063,
  },
  {
    question: 'What pattern emerges when comparing a small town Municipality (Nagar Palika) to a metropolitan Corporation?',
    observableOptions: [
      'They have completely unrelated goals and perform opposite jobs',
      'Both follow the identical democratic model (elected head + appointed officer), scaled to town size',
      'Municipalities do not have elections or voters',
      'Municipalities only handle rocket launches',
    ],
    correctIndex: 1,
    nodeId: NODE_C6_HISTCIV_064,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Civic Audit: Be the Junior Ward Commissioner',
  description: 'Conduct a real 3-point civic audit of your school neighbourhood or residential lane. Identify 1 water/sanitation issue, 1 road/lighting issue, and find the name of your local Ward Councillor.',
  steps: [
    'Take a walking survey of your lane: spot any leaking pipe, open garbage bin, or broken streetlamp',
    'Classify the problem under one of the 7 core municipal functions',
    'Draft a formal 3-sentence grievance note suitable for submitting on your city’s 311 portal',
    'Share your civic audit with your teacher or classmates during the next Civics period',
  ],
};

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
  nodeId: NODE_C6_HISTCIV_061,
  title: 'Composition & Working of Municipal Corporation',
  definition: 'A Municipal Corporation (Mahanagar Palika) is the supreme urban local self-government body in large metropolitan cities (population > 10 lakhs), comprising an elected deliberative wing (Mayor and Councillors) and an appointed executive wing (IAS Municipal Commissioner and departments), enriched by nominated Aldermen.',
  eli5: 'Think of a mega-city like a huge school. Class reps (Councillors) and the Head Boy/Girl (Mayor) decide what events to organise, while the school manager and maintenance staff (Municipal Commissioner and engineers) actually build the stages, fix lights, and cook the food. Wise retired teachers (Aldermen) give advice!',
  misconceptions: [
    {
      misconception: 'The Mayor runs day-to-day administration like water supply and garbage trucks.',
      correction: 'The Mayor presides over council meetings and represents the city publicly; the Municipal Commissioner (an IAS officer) heads the executive wing that carries out all ground administration.',
    },
    {
      misconception: 'Aldermen are elected by the voters of each ward.',
      correction: 'Aldermen are nominated for their distinguished public experience and expertise; Councillors are the ones directly elected by ward voters.',
    },
    {
      misconception: 'Municipal Corporation is a single homogeneous body without separate wings.',
      correction: 'It operates as a dual structure: the Elected Deliberative Wing (makes policy/budget) and the Appointed Executive Wing (implements policy).',
    },
    {
      misconception: 'A Municipality and a Municipal Corporation are identical bodies with the same titles.',
      correction: 'A Municipal Corporation serves large metropolises (>10 lakh pop) with a Mayor and Commissioner; a Municipality serves smaller towns (20,000-1,00,000 pop) with a President and Executive Officer.',
    },
    {
      misconception: 'Citizens have no role in city governance once voting is finished.',
      correction: 'Active citizen participation through grievance reporting (CPGRAMS/311), Swachh Bharat drives, and ward engagement is vital for civic services to function.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Who heads the appointed executive wing of a Municipal Corporation?',
      options: ['The Mayor', 'The Municipal Commissioner (IAS Officer)', 'The Ward Councillor', 'The Chief Justice'],
      correctIndex: 1,
    },
    {
      question: 'Which body governs a small town with a population of 45,000?',
      options: ['Municipal Corporation', 'Municipality / Nagar Palika', 'Gram Sabha', 'Supreme Court'],
      correctIndex: 1,
    },
    {
      question: 'What is the constitutional term of a Municipal Corporation under Article 243U?',
      options: ['2 years', '5 years', '10 years', 'Permanent without elections'],
      correctIndex: 1,
    },
    {
      question: 'Under Corporation functions, what service is provided by the "Public Security" domain?',
      options: ['State border army', 'Fire brigades and disaster rescue', 'Criminal courts', 'Passports'],
      correctIndex: 1,
    },
    {
      question: 'How is the Mayor of a Municipal Corporation typically elected?',
      options: ['Directly by all children in school', 'Indirectly by the elected Councillors from among themselves', 'Nominated by the United Nations', 'Chosen by lottery'],
      correctIndex: 1,
    },
    {
      question: 'Which national mission for urban cleanliness was launched on 2nd October 2014?',
      options: ['Digital India', 'Swachh Bharat Mission', 'Make in India', 'National Solar Mission'],
      correctIndex: 1,
    },
    {
      question: 'What are nominated expert advisors in the Corporation called?',
      options: ['Secretaries', 'Aldermen', 'Sheriffs', 'Constables'],
      correctIndex: 1,
    },
    {
      question: 'Which tax is the primary local revenue source for urban civic bodies?',
      options: ['Property Tax', 'Income Tax', 'Customs Duty', 'Airport Fee'],
      correctIndex: 0,
    },
  ],
  masteryCriteria: 'Student understands the composition (Mayor, Commissioner, Councillors, Aldermen), the dual-wing working structure, seven core functions, difference from Municipalities, and active citizen participation.',
};

// ─── MAIN SIMULATION COMPONENT ───
function C6_HistoryCivicsCompositionMunicipalCorporationSim(
  props: Props = DEFAULT_PROPS
) {
  const {
    nodeId = DEFAULT_PROPS.nodeId!,
    title = DEFAULT_PROPS.title!,
    misconceptions = DEFAULT_PROPS.misconceptions!,
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['history'] || {
    name: 'History & Civics',
    emoji: '🏛️',
    color: 'amber',
  };

  // ─── CORE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState<string>('beginner');
  const [errors, setErrors] = useState<number>(0);

  // ─── BRILLIANT INTERACTION STATE ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState<boolean>(false);
  const [predictionMade, setPredictionMade] = useState<boolean>(false);
  const [observationAnswered, setObservationAnswered] = useState<boolean>(false);

  // ─── EXPLORATION / LAB STATE ───
  const [selectedRole, setSelectedRole] = useState<string | null>('mayor');
  const [activeFunctionIndex, setActiveFunctionIndex] = useState<number>(0);
  const [emergencySeverity, setEmergencySeverity] = useState<number>(50); // 0 to 100
  const [townPopulation, setTownPopulation] = useState<number>(45000); // 20k to 50L
  const [grievanceStep, setGrievanceStep] = useState<number>(0); // 0: reported, 1: notified, 2: assigned, 3: resolved
  const [isGrievanceTracking, setIsGrievanceTracking] = useState<boolean>(false);

  // ─── SANDBOX STATE ───
  const [sanitationAllocation, setSanitationAllocation] = useState<number>(30);
  const [waterAllocation, setWaterAllocation] = useState<number>(30);
  const [roadsAllocation, setRoadsAllocation] = useState<number>(20);
  const [fireAllocation, setFireAllocation] = useState<number>(20);
  const [sandboxCityCleanliness, setSandboxCityCleanliness] = useState<number>(75);

  // ─── CHALLENGE INTERACTION STATE ───
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);

  // ─── REFLECTION ANSWERS STATE ───
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState<boolean>(false);

  // ─── VISUAL FEEDBACK STATE ───
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  // ─── 7 CORE FUNCTIONS METADATA ───
  const SEVEN_FUNCTIONS = useMemo(
    () => [
      {
        id: 'water',
        name: '1. Water Supply',
        icon: '🚰',
        color: '#0284c7',
        desc: 'Maintains city-wide potable pipelines, reservoirs, and testing labs.',
        example: 'Delhi Jal Board supplies millions of litres daily.',
        department: 'Water Supply & Sewerage Dept (Chief Engineer)',
      },
      {
        id: 'health',
        name: '2. Public Health & Sanitation',
        icon: '🧹',
        color: '#10b981',
        desc: 'Door-to-door waste collection, drainage desilting, and dispensaries.',
        example: 'Brihanmumbai Municipal Corporation daily waste disposal across 24 zones.',
        department: 'Solid Waste Management & Public Health Dept',
      },
      {
        id: 'education',
        name: '3. Education',
        icon: '🏫',
        color: '#f59e0b',
        desc: 'Operates primary & middle schools with free books and mid-day meals.',
        example: 'MCGM runs over 1,100 municipal schools across Mumbai.',
        department: 'Municipal Education Board (Education Officer)',
      },
      {
        id: 'lighting',
        name: '4. Street Lighting',
        icon: '💡',
        color: '#eab308',
        desc: 'Erects energy-efficient LED streetlamps, high-masts, and traffic signals.',
        example: 'Kolkata Municipal Corporation maintains illuminated thoroughfares.',
        department: 'Electrical Engineering Wing',
      },
      {
        id: 'security',
        name: '5. Public Security (Fire & Rescue)',
        icon: '🚒',
        color: '#ef4444',
        desc: 'Operates fire brigades, hydraulic ladders, and disaster mitigation teams.',
        example: 'Mumbai Fire Brigade rescues citizens from high-rise fires and floods.',
        department: 'Chief Fire Officer & Disaster Management Cell',
      },
      {
        id: 'works',
        name: '6. Public Works',
        icon: '🏗️',
        color: '#8b5cf6',
        desc: 'Constructs and repairs municipal roads, bridges, culverts, and civic buildings.',
        example: 'Municipal Corporation of Delhi lays storm drains and flyovers.',
        department: 'Civil Engineering & Roads Dept',
      },
      {
        id: 'maternity',
        name: '7. Maternity & Child Welfare',
        icon: '👶',
        color: '#ec4899',
        desc: 'Runs ward maternity clinics, infant vaccination, and anganwadi centres.',
        example: 'Ward Maternity Homes provide safe infant delivery across metro wards.',
        department: 'Family Welfare & Maternal Health Cell',
      },
    ],
    []
  );

  // ─── FILTERED CHALLENGES BY ADAPTIVE TIER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD FROM MASTERY STORE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY DIFFICULTY UPDATE EFFECT ───
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

    setDifficulty((prev) => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── GSAP ANIMATION FOR CIVIC TIMELINE ───
  useEffect(() => {
    if (timelineRef.current) {
      gsap.fromTo(
        timelineRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [phase, currentSlide]);

  // ─── HTML CANVAS 2D ANIMATION (Data stream) ───
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

      // Draw background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Animated civic pulse stream
      const pulseX = (frame * 2.5) % canvas.width;
      const gradient = ctx.createLinearGradient(pulseX - 40, 0, pulseX + 40, 0);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0)');
      gradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.9)');
      gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(pulseX - 40, 2, 80, canvas.height - 4);

      // Deliberative Wing Node
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(35, canvas.height / 2, 9, 0, Math.PI * 2);
      ctx.fill();

      // Appointed Wing Node
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(canvas.width - 35, canvas.height / 2, 9, 0, Math.PI * 2);
      ctx.fill();

      // Labels
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '10px sans-serif';
      ctx.fillText('Elected Council (Policy & Budget)', 55, canvas.height / 2 + 3);
      ctx.textAlign = 'right';
      ctx.fillText('IAS Commissioner (Field Execution)', canvas.width - 55, canvas.height / 2 + 3);
      ctx.textAlign = 'left';

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── REAL-TIME CALCULATIONS: SANDBOX CITY HEALTH ───
  useEffect(() => {
    const totalAlloc = sanitationAllocation + waterAllocation + roadsAllocation + fireAllocation;
    const variance =
      Math.abs(sanitationAllocation - 30) +
      Math.abs(waterAllocation - 30) +
      Math.abs(roadsAllocation - 20) +
      Math.abs(fireAllocation - 20);

    const health = Math.max(20, Math.min(100, 100 - variance - (totalAlloc !== 100 ? 15 : 0)));
    setSandboxCityCleanliness(health);
  }, [sanitationAllocation, waterAllocation, roadsAllocation, fireAllocation]);

  // ─── CALLBACK HANDLERS ───
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
      speechManager.speak('Let us review the step-by-step constitutional explanation.');
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

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isRight = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isRight);
    setDiscoveryAnswered(true);
    audioManager.play(isRight ? 'success' : 'pop');
    speechManager.speak(
      isRight
        ? 'Spot on! The Municipal Commissioner heads the appointed executive machinery.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the composition and dual structure of the Corporation!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Civic Sandbox. Allocate your city budget freely and observe the outcomes.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Get ready for the Civics Challenges! Read each scenario carefully.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive scale control to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent observation! That is the core dual structure.' : 'Examine the diagram carefully.');
  }, []);

  const handleRoleSelect = useCallback((roleId: string) => {
    setSelectedRole(roleId);
    audioManager.play('tap');
    const summaries: Record<string, string> = {
      mayor: 'Mayor: Elected political head, presides over Corporation meetings, ceremonial city leader.',
      commissioner: 'Municipal Commissioner: Senior IAS officer appointed by State Govt, commands all civic departments.',
      councillor: 'Ward Councillor: Directly elected by ward voters, represents neighbourhood grievances in council.',
      alderman: 'Aldermen: Distinguished expert nominated for seasoned wisdom in town planning, health, or law.',
    };
    speechManager.speak(summaries[roleId] || '');
  }, []);

  const handleFunctionWheelSelect = useCallback((idx: number) => {
    setActiveFunctionIndex(idx);
    audioManager.play('pop');
    speechManager.speak(SEVEN_FUNCTIONS[idx].name);
  }, [SEVEN_FUNCTIONS]);

  const handleEmergencySlider = useCallback((val: number) => {
    setEmergencySeverity(val);
    audioManager.play('count');
  }, []);

  const handleTownPopulationSlider = useCallback((val: number) => {
    setTownPopulation(val);
    audioManager.play('count');
  }, []);

  const handleStartGrievanceSim = useCallback(() => {
    setIsGrievanceTracking(true);
    setGrievanceStep(0);
    audioManager.play('tap');
    speechManager.speak('Citizen complaint filed on MCD 311 app. Tracking ticket #MC-9428.');

    setTimeout(() => {
      setGrievanceStep(1);
      audioManager.play('chime');
    }, 1200);

    setTimeout(() => {
      setGrievanceStep(2);
      audioManager.play('whoosh');
    }, 2400);

    setTimeout(() => {
      setGrievanceStep(3);
      audioManager.play('success');
      speechManager.speak('Issue resolved! Drainage desilted and verified by photo.');
    }, 3800);
  }, []);

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
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Excellent constitutional understanding.');
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
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us examine the complete civic analysis.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('tap');
      setDraggedItem(null);
    },
    [draggedItem]
  );

  const handleSortMove = useCallback(
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        let current = [...prev];
        if (current.length === 0 && challenge.sortItems) {
          current = challenge.sortItems.map((_, i) => i);
        }
        const [moved] = current.splice(fromIdx, 1);
        current.splice(toIdx, 0, moved);
        return current;
      });
    },
    [challenge]
  );

  const handleSortSubmit = useCallback(() => {
    const submitted =
      sortArrangement.length > 0
        ? sortArrangement
        : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(submitted);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleResetInactivity = useCallback(() => {
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div
      onMouseMove={handleResetInactivity}
      onKeyDown={handleResetInactivity}
      className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 p-4 mb-6 bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 15, scale: 1.15 }}
            className="text-3xl p-2 bg-amber-500/10 border border-amber-500/30 rounded-xl"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                ICSE Class 6 Civics
              </span>
              <span className="text-xs px-2 py-0.5 bg-gold-900/60 text-gold-300 rounded-full border border-gold-700">
                74th Amendment
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/70 text-emerald-400 border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950/70 text-rose-400 border-rose-700'
                : 'bg-gold-950/70 text-gold-400 border-gold-700'
            }`}
          >
            Tier: {difficulty}
          </motion.span>

          <div className="text-right">
            <p className="text-xs text-slate-400">Mastery</p>
            <p className="text-sm font-bold capitalize text-amber-300">{masteryLevel}</p>
          </div>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.section
            key="discovery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="p-6 bg-gradient-to-br from-gold-950/60 via-slate-900 to-amber-950/30 border border-gold-700/50 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-2 mb-2 text-gold-400 font-bold text-sm">
                <span>🌧️</span>
                <span>CIVIC CRISIS SCENARIO</span>
              </div>
              <h2 className="text-2xl font-black text-white mb-3">{SCENARIO.title}</h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">{SCENARIO.intro}</p>
              <p className="text-xs text-amber-300/80 mt-3 p-3 bg-slate-950/60 rounded-xl border border-amber-500/20">
                {SCENARIO.context}
              </p>
            </motion.div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <span className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg text-sm font-bold">
                  Curiosity Challenge
                </span>
                <span className="text-xs text-slate-400">(Explore without fear of scoring)</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`p-4 text-left text-sm font-medium rounded-xl border transition-all ${
                      discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                        ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                        : 'bg-slate-800/80 border-slate-700 hover:border-amber-500/50 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-2 text-amber-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4"
                >
                  <p className={discoveryCorrect ? 'text-emerald-400 text-sm font-medium' : 'text-amber-400 text-sm font-medium'}>
                    {discoveryCorrect
                      ? '✨ Excellent intuition! The Municipal Commissioner has exclusive executive charge.'
                      : DISCOVERY_QUESTION.hintAfter}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-gold-600 hover:from-amber-500 hover:to-gold-500 text-white font-bold text-sm rounded-xl shadow-lg"
                  >
                    Enter Interactive Civic Labs →
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION LABS ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.section
            key={`explore-${currentSlide}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 border border-slate-800 rounded-2xl">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                  Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h2 className="text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
              </div>
              <div className="text-xs text-amber-300 bg-amber-950/60 border border-amber-700/50 px-3 py-1.5 rounded-lg">
                👉 {EXPLORATION_STEPS[currentSlide].instruction}
              </div>
            </div>

            {/* ─── LAB STEP 0: TOPIC-SPECIFIC SVG 1 (DUAL-WING CHAMBER) ─── */}
            {currentSlide === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                  <svg viewBox="0 0 600 360" className="w-full h-auto bg-slate-950 rounded-xl border border-slate-800 shadow-inner">
                    {/* Deliberative Chamber (Left) */}
                    <rect x="20" y="20" width="260" height="320" rx="14" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="2" />
                    <text x="150" y="50" textAnchor="middle" fill="#a5b4fc" fontWeight="bold" fontSize="14">
                      ELECTED DELIBERATIVE WING
                    </text>
                    <text x="150" y="70" textAnchor="middle" fill="#818cf8" fontSize="10">
                      (Debates Policy, Passes Budget, Sanctions Projects)
                    </text>

                    {/* Mayor Button */}
                    <g
                      onClick={() => handleRoleSelect('mayor')}
                      className="cursor-pointer transition-transform hover:scale-105"
                      role="button"
                      aria-label="Select Mayor"
                    >
                      <rect
                        x="60"
                        y="95"
                        width="180"
                        height="55"
                        rx="10"
                        fill={selectedRole === 'mayor' ? '#f59e0b' : '#312e81'}
                        stroke="#f59e0b"
                        strokeWidth={selectedRole === 'mayor' ? 3 : 1}
                      />
                      <text x="150" y="120" textAnchor="middle" fill={selectedRole === 'mayor' ? '#0f172a' : '#fef3c7'} fontWeight="bold" fontSize="12">
                        👑 THE MAYOR
                      </text>
                      <text x="150" y="138" textAnchor="middle" fill={selectedRole === 'mayor' ? '#0f172a' : '#fde68a'} fontSize="9">
                        Elected by Councillors • Presides
                      </text>
                    </g>

                    {/* Councillors Button */}
                    <g
                      onClick={() => handleRoleSelect('councillor')}
                      className="cursor-pointer transition-transform hover:scale-105"
                      role="button"
                      aria-label="Select Councillor"
                    >
                      <rect
                        x="60"
                        y="165"
                        width="180"
                        height="65"
                        rx="10"
                        fill={selectedRole === 'councillor' ? '#38bdf8' : '#1e293b'}
                        stroke="#38bdf8"
                        strokeWidth={selectedRole === 'councillor' ? 3 : 1}
                      />
                      <text x="150" y="190" textAnchor="middle" fill={selectedRole === 'councillor' ? '#0f172a' : '#e0f2fe'} fontWeight="bold" fontSize="12">
                        🗳️ WARD COUNCILLORS
                      </text>
                      <text x="150" y="208" textAnchor="middle" fill={selectedRole === 'councillor' ? '#0f172a' : '#bae6fd'} fontSize="9">
                        Directly Elected by Ward Voters
                      </text>
                      <text x="150" y="222" textAnchor="middle" fill={selectedRole === 'councillor' ? '#0f172a' : '#7dd3fc'} fontSize="8">
                        (e.g., 227 Wards in Mumbai MCGM)
                      </text>
                    </g>

                    {/* Aldermen Button */}
                    <g
                      onClick={() => handleRoleSelect('alderman')}
                      className="cursor-pointer transition-transform hover:scale-105"
                      role="button"
                      aria-label="Select Alderman"
                    >
                      <rect
                        x="60"
                        y="245"
                        width="180"
                        height="55"
                        rx="10"
                        fill={selectedRole === 'alderman' ? '#c084fc' : '#1e293b'}
                        stroke="#c084fc"
                        strokeWidth={selectedRole === 'alderman' ? 3 : 1}
                      />
                      <text x="150" y="270" textAnchor="middle" fill={selectedRole === 'alderman' ? '#0f172a' : '#f3e8ff'} fontWeight="bold" fontSize="12">
                        📜 ALDERMEN (Advisors)
                      </text>
                      <text x="150" y="288" textAnchor="middle" fill={selectedRole === 'alderman' ? '#0f172a' : '#e9d5ff'} fontSize="9">
                        Nominated for Senior Expertise
                      </text>
                    </g>

                    {/* Bridge Arrow */}
                    <line x1="280" y1="180" x2="320" y2="180" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4" />
                    <polygon points="320,175 330,180 320,185" fill="#f59e0b" />
                    <text x="305" y="165" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">
                      Sanctions
                    </text>

                    {/* Executive Chamber (Right) */}
                    <rect x="320" y="20" width="260" height="320" rx="14" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="450" y="50" textAnchor="middle" fill="#6ee7b7" fontWeight="bold" fontSize="14">
                      APPOINTED EXECUTIVE WING
                    </text>
                    <text x="450" y="70" textAnchor="middle" fill="#34d399" fontSize="10">
                      (Carries Out Field Works & Operations)
                    </text>

                    {/* Commissioner Button */}
                    <g
                      onClick={() => handleRoleSelect('commissioner')}
                      className="cursor-pointer transition-transform hover:scale-105"
                      role="button"
                      aria-label="Select Municipal Commissioner"
                    >
                      <rect
                        x="360"
                        y="95"
                        width="180"
                        height="65"
                        rx="10"
                        fill={selectedRole === 'commissioner' ? '#34d399' : '#065f46'}
                        stroke="#34d399"
                        strokeWidth={selectedRole === 'commissioner' ? 3 : 1}
                      />
                      <text x="450" y="122" textAnchor="middle" fill={selectedRole === 'commissioner' ? '#064e3b' : '#ecfdf5'} fontWeight="bold" fontSize="12">
                        ⚙️ MUNICIPAL COMMISSIONER
                      </text>
                      <text x="450" y="140" textAnchor="middle" fill={selectedRole === 'commissioner' ? '#064e3b' : '#a7f3d0'} fontSize="9">
                        IAS Officer • Appointed by State Govt
                      </text>
                      <text x="450" y="152" textAnchor="middle" fill={selectedRole === 'commissioner' ? '#064e3b' : '#6ee7b7'} fontSize="8">
                        Executive Head of All Departments
                      </text>
                    </g>

                    {/* Departments Box */}
                    <rect x="360" y="180" width="180" height="120" rx="10" fill="#022c22" stroke="#059669" strokeWidth="1" />
                    <text x="450" y="202" textAnchor="middle" fill="#a7f3d0" fontWeight="bold" fontSize="10">
                      MUNICIPAL DEPARTMENTS
                    </text>
                    <text x="450" y="222" textAnchor="middle" fill="#d1fae5" fontSize="9">💧 Water Supply & Drainage</text>
                    <text x="450" y="240" textAnchor="middle" fill="#d1fae5" fontSize="9">🧹 Health & Solid Waste</text>
                    <text x="450" y="258" textAnchor="middle" fill="#d1fae5" fontSize="9">🚒 Fire Brigades & Rescue</text>
                    <text x="450" y="276" textAnchor="middle" fill="#d1fae5" fontSize="9">🏗️ Civil Roads & Works</text>
                    <text x="450" y="292" textAnchor="middle" fill="#d1fae5" fontSize="8">Staff: Engineers, Doctors, Field Workers</text>
                  </svg>
                </div>

                {/* Role Inspector Panel */}
                <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Constitutional Role Inspector
                    </h3>
                    <AnimatePresence mode="wait">
                      {selectedRole === 'mayor' && (
                        <motion.div key="mayor-info" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                            <span className="text-2xl">👑</span>
                            <h4 className="font-bold text-amber-300 text-lg">The Mayor</h4>
                            <p className="text-xs text-slate-300 mt-1">Elected Head of the Deliberative Council</p>
                          </div>
                          <ul className="text-xs space-y-2 text-slate-300">
                            <li>• <strong>Selection:</strong> Elected indirectly by the Councillors from among themselves.</li>
                            <li>• <strong>Primary Function:</strong> Presides over Corporation debates, preserves decorum, signs passed budgets.</li>
                            <li>• <strong>Common Error:</strong> Does NOT directly command civic workers or repair pipelines.</li>
                          </ul>
                        </motion.div>
                      )}

                      {selectedRole === 'commissioner' && (
                        <motion.div key="comm-info" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                            <span className="text-2xl">⚙️</span>
                            <h4 className="font-bold text-emerald-300 text-lg">Municipal Commissioner</h4>
                            <p className="text-xs text-slate-300 mt-1">Administrative Executive Head (IAS)</p>
                          </div>
                          <ul className="text-xs space-y-2 text-slate-300">
                            <li>• <strong>Selection:</strong> Appointed by the State Government (senior IAS cadre).</li>
                            <li>• <strong>Primary Function:</strong> Executes day-to-day administration, spends sanctioned funds, commands engineers and staff.</li>
                            <li>• <strong>Crucial Point:</strong> Brings professional competence without political bias.</li>
                          </ul>
                        </motion.div>
                      )}

                      {selectedRole === 'councillor' && (
                        <motion.div key="councillor-info" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                          <div className="p-3 bg-gold-500/10 border border-gold-500/30 rounded-xl">
                            <span className="text-2xl">🗳️</span>
                            <h4 className="font-bold text-gold-300 text-lg">Ward Councillor</h4>
                            <p className="text-xs text-slate-300 mt-1">Direct Grassroots Representative</p>
                          </div>
                          <ul className="text-xs space-y-2 text-slate-300">
                            <li>• <strong>Selection:</strong> Directly elected by adult ward voters every 5 years.</li>
                            <li>• <strong>Primary Function:</strong> Champions local neighbourhood issues, introduces ward proposals, votes on city policies.</li>
                          </ul>
                        </motion.div>
                      )}

                      {selectedRole === 'alderman' && (
                        <motion.div key="alderman-info" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                          <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                            <span className="text-2xl">📜</span>
                            <h4 className="font-bold text-purple-300 text-lg">Aldermen</h4>
                            <p className="text-xs text-slate-300 mt-1">Nominated Advisory Experts</p>
                          </div>
                          <ul className="text-xs space-y-2 text-slate-300">
                            <li>• <strong>Selection:</strong> Nominated by the government for special expertise.</li>
                            <li>• <strong>Role:</strong> Provide seasoned guidance in urban planning, public health, medicine, and law without representing a ward.</li>
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800">
                    <p className="text-xs text-slate-400">Click any other node in the chamber to inspect its mandate.</p>
                  </div>
                </div>
              </div>
            )}

            {/* ─── LAB STEP 1: TOPIC-SPECIFIC SVG 2 (7 CORE FUNCTIONS HUB) ─── */}
            {currentSlide === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Interactive SVG 2: Seven Core Functions Radial Hub */}
                  <div className="lg:col-span-7 p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                    <svg viewBox="0 0 540 380" className="w-full h-auto bg-slate-950 rounded-xl border border-slate-800">
                      {/* Central City Hall Node */}
                      <circle cx="270" cy="190" r="48" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="3" />
                      <text x="270" y="185" textAnchor="middle" fill="#fbbf24" fontWeight="bold" fontSize="12">
                        MUNICIPAL
                      </text>
                      <text x="270" y="202" textAnchor="middle" fill="#fbbf24" fontWeight="bold" fontSize="12">
                        SERVICES
                      </text>

                      {/* 7 Radiating Spokes and Nodes */}
                      {SEVEN_FUNCTIONS.map((fn, i) => {
                        const angle = (i * (2 * Math.PI)) / 7 - Math.PI / 2;
                        const radius = 135;
                        const nx = 270 + radius * Math.cos(angle);
                        const ny = 190 + radius * Math.sin(angle);
                        const isSelected = activeFunctionIndex === i;

                        return (
                          <g
                            key={fn.id}
                            onClick={() => handleFunctionWheelSelect(i)}
                            className="cursor-pointer transition-all hover:scale-105"
                            role="button"
                            aria-label={`Select ${fn.name}`}
                          >
                            <line
                              x1="270"
                              y1="190"
                              x2={nx}
                              y2={ny}
                              stroke={isSelected ? fn.color : '#334155'}
                              strokeWidth={isSelected ? 3 : 1.5}
                              strokeDasharray={isSelected ? '0' : '3'}
                            />
                            <circle
                              cx={nx}
                              cy={ny}
                              r={isSelected ? 32 : 26}
                              fill={isSelected ? fn.color : '#1e293b'}
                              stroke={fn.color}
                              strokeWidth={isSelected ? 3 : 1.5}
                            />
                            <text
                              x={nx}
                              y={ny + 5}
                              textAnchor="middle"
                              fill="#ffffff"
                              fontSize={isSelected ? "16" : "13"}
                            >
                              {fn.icon}
                            </text>
                            <text
                              x={nx}
                              y={ny > 190 ? ny + 42 : ny - 34}
                              textAnchor="middle"
                              fill={isSelected ? '#fbbf24' : '#94a3b8'}
                              fontSize="10"
                              fontWeight={isSelected ? 'bold' : 'normal'}
                            >
                              {fn.name.split('. ')[1]}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Detail Inspector for Selected Function */}
                  <div className="lg:col-span-5 p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-4xl">{SEVEN_FUNCTIONS[activeFunctionIndex].icon}</span>
                        <div>
                          <h3 className="text-xl font-black text-amber-300">{SEVEN_FUNCTIONS[activeFunctionIndex].name}</h3>
                          <p className="text-xs text-gold-400 font-semibold">{SEVEN_FUNCTIONS[activeFunctionIndex].department}</p>
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed mb-4">{SEVEN_FUNCTIONS[activeFunctionIndex].desc}</p>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 mb-4">
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">Real Municipal Case:</span>
                        <p className="text-xs text-slate-300 mt-1">{SEVEN_FUNCTIONS[activeFunctionIndex].example}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded-xl">
                      <div className="flex items-center gap-2 text-rose-300 font-bold text-xs mb-1">
                        <span>⚠️</span>
                        <span>CRITICAL BOARD EXAM DISTINCTION</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <strong>Public Security = Fire & Rescue</strong>, NOT Police. Law & order is maintained by the State Government Police Force under the Home Ministry.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── LAB STEP 2: DELIBERATION TO EXECUTION FLOW ─── */}
            {currentSlide === 2 && (
              <div className="space-y-6">
                {!predictionMade ? (
                  <div className="p-5 bg-gradient-to-r from-slate-900 to-gold-950 border border-gold-800/50 rounded-2xl">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Predict Before Testing:</span>
                    <h3 className="text-base font-bold text-white mt-1 mb-3">{PREDICTION_QUESTIONS[0].question}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handlePrediction(i)}
                          className="p-3 text-left bg-slate-900/90 border border-slate-700 hover:border-amber-500 rounded-xl text-xs font-medium text-slate-200"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-emerald-950/50 border border-emerald-700 rounded-xl flex items-center justify-between">
                    <p className="text-xs text-emerald-300">
                      ✓ Prediction registered! Now interact with the emergency severity slider below.
                    </p>
                    <span className="text-xs text-amber-300 font-bold">Live Simulation Active</span>
                  </div>
                )}

                <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-white">
                      Monsoon Flood Severity: <span className="text-amber-400 font-black">{emergencySeverity}%</span>
                    </label>
                    <span className="text-xs px-2.5 py-1 bg-slate-800 rounded-lg text-slate-300">
                      {emergencySeverity > 70 ? '🚨 Severe Disaster' : emergencySeverity > 35 ? '⚠️ High Alert' : '🟢 Normal Operations'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={emergencySeverity}
                    onChange={(e) => handleEmergencySlider(Number(e.target.value))}
                    aria-label="Flood Severity Slider"
                    className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-3 bg-gold-950/40 border border-gold-800 rounded-xl">
                      <h4 className="text-xs font-bold text-gold-300 mb-1">Deliberative Wing Response:</h4>
                      <p className="text-xs text-slate-300">
                        {emergencySeverity > 70
                          ? 'Mayor calls Emergency Council session; Councillors sanction emergency disaster fund of ₹50 Crores.'
                          : 'Councillors review ward drainage reports and pass regular monsoon preparation resolutions.'}
                      </p>
                    </div>
                    <div className="p-3 bg-emerald-950/40 border border-emerald-800 rounded-xl">
                      <h4 className="text-xs font-bold text-emerald-300 mb-1">Executive Wing Response:</h4>
                      <p className="text-xs text-slate-300">
                        {emergencySeverity > 70
                          ? 'IAS Commissioner deploys heavy water pumps, dispatches fire rescue boats, opens municipal relief shelters.'
                          : 'Sanitation teams conduct routine drain de-silting and maintain standby equipment.'}
                      </p>
                    </div>
                  </div>
                </div>

                {emergencySeverity > 60 && !observationAnswered && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">Civics Observation:</span>
                    <h4 className="text-sm font-bold text-white mt-1 mb-3">{OBSERVATION_QUESTIONS[0].question}</h4>
                    <div className="space-y-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleObservation(i)}
                          className="w-full text-left p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs text-slate-200"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* ─── LAB STEP 3: TOPIC-SPECIFIC SVG 3 (NAGAR PALIKA VS MAHANAGAR PALIKA) ─── */}
            {currentSlide === 3 && (
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-white">
                      Urban Settlement Population:{' '}
                      <span className="text-amber-400 font-black">
                        {townPopulation >= 1000000
                          ? `${(townPopulation / 1000000).toFixed(1)} Million (${(townPopulation / 100000).toFixed(0)} Lakhs)`
                          : `${(townPopulation / 1000).toFixed(0)} Thousand`}
                      </span>
                    </label>
                    <span
                      className={`text-xs px-3 py-1 font-bold rounded-lg border ${
                        townPopulation >= 1000000
                          ? 'bg-amber-950/80 text-amber-300 border-amber-600'
                          : 'bg-gold-950/80 text-gold-300 border-gold-600'
                      }`}
                    >
                      {townPopulation >= 1000000 ? 'Mahanagar Palika (Corporation)' : 'Nagar Palika (Municipality)'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={20000}
                    max={5000000}
                    step={20000}
                    value={townPopulation}
                    onChange={(e) => handleTownPopulationSlider(Number(e.target.value))}
                    aria-label="Urban Population Slider"
                    className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Topic-Specific SVG 3: Nagar Palika vs Mahanagar Palika Architectural Diagram */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <svg viewBox="0 0 600 240" className="w-full h-auto">
                    {/* Nagar Palika Side */}
                    <g opacity={townPopulation < 1000000 ? 1 : 0.45}>
                      <rect x="20" y="20" width="260" height="200" rx="12" fill="#0f172a" stroke={townPopulation < 1000000 ? '#0284c7' : '#334155'} strokeWidth="2" />
                      <text x="150" y="48" textAnchor="middle" fill="#38bdf8" fontWeight="bold" fontSize="13">
                        🏡 NAGAR PALIKA (Municipality)
                      </text>
                      <text x="150" y="66" textAnchor="middle" fill="#94a3b8" fontSize="9">
                        Pop: 20,000 to 1,00,000 (Small/Medium Towns)
                      </text>
                      <line x1="40" y1="78" x2="260" y2="78" stroke="#334155" />

                      <rect x="40" y="90" width="220" height="40" rx="6" fill="#0369a1" />
                      <text x="150" y="107" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">
                        Elected Head: PRESIDENT / CHAIRPERSON
                      </text>
                      <text x="150" y="122" textAnchor="middle" fill="#bae6fd" fontSize="9">
                        Directly or Indirectly Elected
                      </text>

                      <rect x="40" y="140" width="220" height="40" rx="6" fill="#1e293b" stroke="#0284c7" />
                      <text x="150" y="157" textAnchor="middle" fill="#38bdf8" fontWeight="bold" fontSize="11">
                        Admin Head: EXECUTIVE OFFICER (EO)
                      </text>
                      <text x="150" y="172" textAnchor="middle" fill="#94a3b8" fontSize="9">
                        State Municipal Administrative Service
                      </text>
                      <text x="150" y="204" textAnchor="middle" fill="#7dd3fc" fontSize="9">
                        Example: Mahabaleshwar, Kodaikanal, Almora
                      </text>
                    </g>

                    {/* Mahanagar Palika Side */}
                    <g opacity={townPopulation >= 1000000 ? 1 : 0.45}>
                      <rect x="320" y="20" width="260" height="200" rx="12" fill="#0f172a" stroke={townPopulation >= 1000000 ? '#f59e0b' : '#334155'} strokeWidth="2" />
                      <text x="450" y="48" textAnchor="middle" fill="#fbbf24" fontWeight="bold" fontSize="13">
                        🏙️ MAHANAGAR PALIKA (Corporation)
                      </text>
                      <text x="450" y="66" textAnchor="middle" fill="#94a3b8" fontSize="9">
                        Pop: &gt; 10 Lakhs (1 Million) (Metropolises)
                      </text>
                      <line x1="340" y1="78" x2="560" y2="78" stroke="#334155" />

                      <rect x="340" y="90" width="220" height="40" rx="6" fill="#b45309" />
                      <text x="450" y="107" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">
                        Elected Head: THE MAYOR
                      </text>
                      <text x="450" y="122" textAnchor="middle" fill="#fef3c7" fontSize="9">
                        First Citizen of the City • Presides
                      </text>

                      <rect x="340" y="140" width="220" height="40" rx="6" fill="#1e293b" stroke="#f59e0b" />
                      <text x="450" y="157" textAnchor="middle" fill="#fbbf24" fontWeight="bold" fontSize="11">
                        Admin Head: MUNICIPAL COMMISSIONER
                      </text>
                      <text x="450" y="172" textAnchor="middle" fill="#94a3b8" fontSize="9">
                        Senior Indian Administrative Service (IAS)
                      </text>
                      <text x="450" y="204" textAnchor="middle" fill="#fde68a" fontSize="9">
                        Example: Mumbai (MCGM), Delhi (MCD), Chennai
                      </text>
                    </g>
                  </svg>
                </div>
              </div>
            )}

            {/* ─── LAB STEP 4: ACTIVE CITIZEN GRIEVANCE SIMULATOR ─── */}
            {currentSlide === 4 && (
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-white">Grievance Redressal Flow (CPGRAMS / 311 App)</h3>
                    <p className="text-xs text-slate-400">Experience how a citizen’s report travels from smartphone to field resolution.</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartGrievanceSim}
                    disabled={isGrievanceTracking && grievanceStep < 3}
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow"
                  >
                    {isGrievanceTracking && grievanceStep < 3 ? 'Tracking in Progress...' : '▶ File Mock Complaint'}
                  </motion.button>
                </div>

                {/* 4-Step Flow Visualizer */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {[
                    { step: 0, title: '1. Citizen Report', desc: 'Citizen submits photo & GPS tag on 311 App', icon: '📱' },
                    { step: 1, title: '2. Auto-Routing', desc: 'Unique ID issued; sent to Ward Sanitation Officer', icon: '🔄' },
                    { step: 2, title: '3. Field Action', desc: 'Engineering repair van arrives with equipment', icon: '🛠️' },
                    { step: 3, title: '4. Verified Resolution', desc: 'Drain cleared; citizen verifies & rates service', icon: '✅' },
                  ].map((st) => (
                    <div
                      key={st.step}
                      className={`p-4 rounded-xl border text-center transition-all ${
                        grievanceStep >= st.step && isGrievanceTracking
                          ? 'bg-emerald-950/50 border-emerald-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-500'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{st.icon}</span>
                      <h4 className="text-xs font-bold text-amber-300">{st.title}</h4>
                      <p className="text-[11px] text-slate-300 mt-1">{st.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-gold-950/30 border border-gold-800/40 rounded-xl text-xs text-slate-300">
                  💡 <strong>Active Citizenship Principle:</strong> Municipalities cannot place an inspector on every street. Citizen complaints form the vital sensory network that keeps urban governance accountable and effective.
                </div>
              </div>
            )}

            {/* Navigation Buttons for Exploration */}
            <div className="flex justify-between items-center pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
              >
                ← Previous Lab
              </motion.button>

              <span className="text-xs text-slate-400 font-semibold">
                Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
              </span>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide((s) => s + 1)}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg"
                >
                  Enter Free Sandbox →
                </motion.button>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: CIVIC SANDBOX ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.section
            key="sandbox"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-5 bg-gradient-to-r from-slate-900 to-amber-950/40 border border-amber-500/30 rounded-2xl flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                  Autonomous Budget Sandbox (No Grading)
                </span>
                <h2 className="text-xl font-black text-white">Civic Budget & Satisfaction Lab</h2>
                <p className="text-xs text-slate-300 mt-1">
                  Allocate ₹100 Crores across 4 core departments to discover how balanced investments maximize city health.
                </p>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-right">
                <span className="text-xs text-slate-400">City Satisfaction Index</span>
                <p className="text-2xl font-black text-emerald-400">{sandboxCityCleanliness}%</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-amber-300">🧹 Solid Waste & Sanitation: ₹{sanitationAllocation} Cr</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={60}
                  value={sanitationAllocation}
                  onChange={(e) => setSanitationAllocation(Number(e.target.value))}
                  aria-label="Sanitation Budget"
                  className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gold-300">🚰 Water Supply & Drainage: ₹{waterAllocation} Cr</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={60}
                  value={waterAllocation}
                  onChange={(e) => setWaterAllocation(Number(e.target.value))}
                  aria-label="Water Budget"
                  className="w-full accent-gold-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-emerald-300">🏗️ Public Works & Roads: ₹{roadsAllocation} Cr</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={60}
                  value={roadsAllocation}
                  onChange={(e) => setRoadsAllocation(Number(e.target.value))}
                  aria-label="Roads Budget"
                  className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-rose-300">🚒 Fire Safety & Security: ₹{fireAllocation} Cr</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={60}
                  value={fireAllocation}
                  onChange={(e) => setFireAllocation(Number(e.target.value))}
                  aria-label="Fire Budget"
                  className="w-full accent-rose-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-slate-400">
                Total Allocated: <strong>{sanitationAllocation + waterAllocation + roadsAllocation + fireAllocation} / 100 Cr</strong>
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-gold-600 hover:from-amber-500 hover:to-gold-500 text-white font-black text-sm rounded-xl shadow-lg"
              >
                I am Ready for the Challenges! →
              </motion.button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: CHALLENGES ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.section
            key={`challenge-${challenge.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl">
              <canvas ref={canvasRef} width={600} height={32} className="w-full h-8 rounded-lg" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Challenge {currentChallenge + 1} of {filteredChallenges.length}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700 font-mono">
                    NEP: {challenge.competencyLevel}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">{challenge.question}</h3>
              </div>

              <div className="w-full sm:w-48 bg-slate-800 h-2 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-gold-500"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>

            {/* MCQ */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`p-4 text-left rounded-xl border text-sm font-medium transition-colors ${
                        wrongFlash
                          ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                          : showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900 border-slate-800 hover:border-amber-500/50 text-slate-200'
                      }`}
                    >
                      <span className="font-bold text-amber-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* DRAG-LABEL */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-900 border border-slate-800 rounded-xl">
                  <span className="text-xs text-slate-400 self-center mr-2">Drag Labels:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'wing_delib_head', label: 'Elected Head of Council (Presides)' },
                    { id: 'wing_exec_head', label: 'Appointed Executive Head (IAS Officer)' },
                    { id: 'wing_delib_members', label: 'Directly Elected Ward Representatives' },
                    { id: 'wing_advisory', label: 'Nominated Senior Advisors for Wisdom' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col justify-between min-h-[90px] ${
                        droppedLabels[target.id]
                          ? 'bg-gold-950/40 border-gold-500'
                          : 'bg-slate-900/60 border-slate-700'
                      }`}
                    >
                      <span className="text-xs text-slate-400">{target.label}</span>
                      <div className="text-sm font-black text-amber-300 mt-2">
                        {droppedLabels[target.id] || '📥 [Drop Role Here]'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length < 4}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow disabled:opacity-50"
                >
                  Verify Diagram Labels
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag items to arrange them in true sequential order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => handleDragStart(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-3 cursor-grab text-xs text-slate-200"
                    >
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center text-xs">
                        {displayIdx + 1}
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
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Submit Order
                </motion.button>
              </div>
            )}

            {/* NUMERIC */}
            {challenge.type === 'numeric' && (
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-wrap items-center gap-4">
                <input
                  type="number"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter number..."
                  className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold text-sm focus:border-amber-500 outline-none"
                />
                <span className="text-xs font-bold text-slate-400">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow disabled:opacity-40"
                >
                  Verify Number
                </motion.button>
              </div>
            )}

            {/* CONSTRUCT */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-amber-300">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-lg text-xs"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl min-h-[80px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1 bg-gold-900/60 border border-gold-700 text-gold-200 rounded-lg text-xs flex items-center gap-2"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600">Click actions above to construct your civic action plan</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow disabled:opacity-40"
                >
                  Verify Plan
                </motion.button>
              </div>
            )}

            {/* EXPLANATION */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-gradient-to-br from-slate-900 to-gold-950/60 border border-gold-800/80 rounded-2xl space-y-4"
              >
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <span>📖</span>
                  <span>Constitutional Walkthrough & Analysis</span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-slate-300 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400 mr-1.5">{idx + 1}.</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps <
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-2 bg-gold-700 hover:bg-gold-600 text-white rounded-lg text-xs font-bold"
                  >
                    Reveal Next Analytical Step →
                  </motion.button>
                )}

                {revealedSteps >=
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Simulation 🎉' : 'Next Challenge →'}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: COMPLETION & REFLECTION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.section
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Scorecard Header */}
            <div className="p-6 bg-gradient-to-br from-gold-950 via-slate-900 to-amber-950/50 border border-amber-500/40 rounded-3xl text-center space-y-3">
              <span className="text-5xl block">🏛️</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Civics Mastery Complete!</h2>
              <p className="text-slate-300 text-sm">
                You have mastered the Composition, Dual-Wing Working, Core Functions, and Citizen Grievance Systems of Urban Local Self-Government.
              </p>
              <div className="flex justify-center gap-6 pt-3">
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">Final Civic Score</span>
                  <p className="text-2xl font-black text-amber-400">{Math.max(0, 100 - errors * 5)}%</p>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">Mastery Level</span>
                  <p className="text-2xl font-black text-emerald-400 capitalize">{masteryLevel}</p>
                </div>
              </div>
            </div>

            {/* Motivational Feedback */}
            <div className="p-4 bg-emerald-950/50 border border-emerald-700 rounded-2xl">
              <p className="text-emerald-300 text-sm font-bold">
                {errors === 0
                  ? '🌟 OUTSTANDING ACADEMIC RECORD! Perfect score on ICSE urban local government governance!'
                  : errors <= 3
                  ? '👏 EXCELLENT CIVIC COMPETENCE! You have a strong grasp of the elected vs appointed dual structure.'
                  : '📚 SOLID EFFORT! Review the specific misconception corrections below to consolidate your marks.'}
              </p>
            </div>

            {/* ─── SPACED REPETITION SCHEDULE VISIBILITY ─── */}
            <div className="p-5 bg-gradient-to-r from-amber-950/60 via-slate-900 to-gold-950/60 border border-amber-500/50 rounded-2xl shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">📅</span>
                <span className="font-bold text-amber-300 text-sm tracking-wide uppercase">
                  Spaced Repetition Review Schedule
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-200">
                    Recommended review date: Revisit this simulation in{' '}
                    <strong className="text-amber-400 text-base">
                      {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                    </strong>{' '}
                    to lock your knowledge into long-term memory.
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Based on your accuracy ({scoreBreakdown.correct}/{scoreBreakdown.total || filteredChallenges.length} challenges correct, {errors} errors), this schedule optimizes the SM-2 learning curve.
                  </p>
                </div>
                <div className="px-4 py-2 bg-amber-500/20 border border-amber-500/40 rounded-xl text-center">
                  <span className="text-[10px] uppercase font-bold text-amber-300 block">Next Target</span>
                  <span className="text-lg font-black text-white">
                    {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
                  </span>
                </div>
              </div>
            </div>

            {/* ─── GUIDED REFLECTION SECTION ─── */}
            <div className="p-6 bg-slate-900 border border-amber-500/30 rounded-2xl space-y-5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💭</span>
                <div>
                  <h3 className="text-lg font-black text-amber-300">Civic Learning Reflection</h3>
                  <p className="text-xs text-slate-400">Synthesize your insights to cement conceptual understanding.</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Question 1 */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <label className="text-xs font-bold text-amber-400 block mb-1">
                    1. What was the most surprising thing you learned?
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionAnswers.surprising}
                    onChange={(e) => setReflectionAnswers((prev) => ({ ...prev, surprising: e.target.value }))}
                    placeholder="e.g., I was surprised that the Mayor does not directly command municipal workers — the IAS Commissioner does!"
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 outline-none focus:border-amber-500"
                  />
                </div>

                {/* Question 2 */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <label className="text-xs font-bold text-amber-400 block mb-1">
                    2. How would you explain this to a friend?
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionAnswers.explain}
                    onChange={(e) => setReflectionAnswers((prev) => ({ ...prev, explain: e.target.value }))}
                    placeholder="e.g., It is like student council reps deciding on a school sports day budget, while teachers and staff actually manage logistics and equipment."
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 outline-none focus:border-amber-500"
                  />
                </div>

                {/* Question 3 */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <label className="text-xs font-bold text-amber-400 block mb-1">
                    3. Where in real life might you use this?
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionAnswers.realLife}
                    onChange={(e) => setReflectionAnswers((prev) => ({ ...prev, realLife: e.target.value }))}
                    placeholder="e.g., When I see a broken water pipeline or open garbage bin in my locality, I will file an issue on the city's 311 app and contact my Ward Councillor."
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-1">
                {reflectionSubmitted ? (
                  <span className="text-xs font-bold text-emerald-400">
                    ✓ Reflection recorded! Excellent civic synthesis.
                  </span>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setReflectionSubmitted(true);
                      audioManager.play('chime');
                      speechManager.speak('Thank you for reflecting on your civic learnings!');
                    }}
                    className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow"
                  >
                    Submit Reflection Note
                  </motion.button>
                )}
              </div>
            </div>

            {/* Misconception Profile */}
            {hitMisconceptions.length > 0 && (
              <div className="p-5 bg-rose-950/40 border border-rose-800/60 rounded-2xl space-y-3">
                <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                  <span>⚠️</span>
                  <span>Your Diagnostic Misconception Profile:</span>
                </h3>
                {hitMisconceptions.map((mIdx) => {
                  const item = misconceptions[mIdx];
                  if (!item) return null;
                  return (
                    <div key={mIdx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-bold">❌ Misconception: {item.misconception}</p>
                      <p className="text-emerald-400 font-semibold">✓ Board Correction: {item.correction}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Real-World Activity */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-gold-400 font-bold text-sm">
                <span>📋</span>
                <span>{REAL_WORLD_ACTIVITY.title}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-400">
                    <span className="font-bold text-amber-400 mr-2">{idx + 1}.</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PLATFORM OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Civics Module Completed Successfully!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C6_HistoryCivicsCompositionMunicipalCorporationSim;