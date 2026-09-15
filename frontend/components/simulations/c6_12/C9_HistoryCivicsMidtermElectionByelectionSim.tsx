'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import gsap from 'gsap';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';

// ============================================================================
// TOPIC NODE IDENTIFIERS (ICSE Class 9 History & Civics)
// ============================================================================
const NODE_C9_HISTCIV_011 = 'c9_histciv_011'; // Elections: General, Mid-term, By-elections
const NODE_C9_HISTCIV_012 = 'c9_histciv_012'; // State Legislature: Vidhan Parishad Composition & Article 171
const NODE_C9_HISTCIV_013 = 'c9_histciv_013'; // Bicameral vs Unicameral States & Article 169
const NODE_C9_HISTCIV_014 = 'c9_histciv_014'; // Qualifications, Terms & Dissolution Rules
const NODE_C9_HISTCIV_015 = 'c9_histciv_015'; // Legislative Procedures, Money Bills & Executive Accountability
const NODE_C9_HISTCIV_016 = 'c9_histciv_016'; // Harappan Urban Planning: Citadels & Great Bath
const NODE_C9_HISTCIV_017 = 'c9_histciv_017'; // Harappan Art & Metallurgy: Lost-Wax Bronze Casting
const NODE_C9_HISTCIV_018 = 'c9_histciv_018'; // Harappan Grid Streets, Masonry & Covered Drainage Systems
const NODE_C9_HISTCIV_019 = 'c9_histciv_019'; // Long-Distance Trade: Meluhha, Lothal Dockyard & Weights
const NODE_C9_HISTCIV_020 = 'c9_histciv_020'; // Social Stratification, Craft Specialisation & Economic Surplus

const ALL_NODE_IDS = [
  NODE_C9_HISTCIV_011,
  NODE_C9_HISTCIV_012,
  NODE_C9_HISTCIV_013,
  NODE_C9_HISTCIV_014,
  NODE_C9_HISTCIV_015,
  NODE_C9_HISTCIV_016,
  NODE_C9_HISTCIV_017,
  NODE_C9_HISTCIV_018,
  NODE_C9_HISTCIV_019,
  NODE_C9_HISTCIV_020,
];

// ============================================================================
// NARRATIVE SCENARIO & CONSTITUTIONAL INVESTIGATION
// ============================================================================
const SCENARIO = {
  title: 'The Great Constitutional & Archaeological Investigation',
  subtitle: 'Comparative Analysis of State Governance & Ancient Urban Civilisation',
  intro: 'You have been designated Senior Historical & Constitutional Researcher for the Joint Parliamentary Archives and the Archaeological Survey Directorate. In the capital, a sudden state government collapse triggers constitutional debates regarding assembly dissolution, by-elections, and bicameral checks. Simultaneously, major excavations at Lothal and Mohenjo-daro reveal critical evidence of standardized civic planning, trade routes, and social organization from 2500 BCE.',
  context: 'Your objective: Solve real-time constitutional dilemmas regarding legislative mandates, analyze bicameral balances under Articles 169-173, and reconstruct the urban, metallurgical, and economic systems of the Indus Valley Civilisation.',
};

// ============================================================================
// DISCOVERY INQUIRY
// ============================================================================
const DISCOVERY_QUESTION = {
  question: 'A coalition government in a State Legislative Assembly collapses after 2 years, and no alternate majority can be formed. The Governor dissolves the House under Article 174(2)(b). In the ensuing mid-term election, for what tenure is the new Assembly elected?',
  options: [
    'For 3 years only — completing the remaining balance of the dissolved Assembly’s 5-year term',
    'For a completely fresh full term of 5 years starting from its first statutory meeting',
    'For 6 years — synchronizing its term with the State Legislative Council',
    'For 1 year — acting as an interim assembly until regular national election alignment',
  ],
  correctIndex: 1,
  explanation: 'Under Article 172(1) of the Constitution of India, premature dissolution completely extinguishes the old House. A mid-term election elects a brand-new Vidhan Sabha that enjoys a full 5-year constitutional term from the date appointed for its first meeting.',
  hintAfter: 'Key Constitutional Principle: Mid-term elections reset the 5-year clock completely, whereas By-elections only fill a casual vacancy for the remainder of the existing term.',
};

// ============================================================================
// REAL WORLD ACTIVITY DEFINITION
// ============================================================================
const REAL_WORLD_ACTIVITY = {
  title: 'Investigative Capstone: Comparative Urban Planning & Democratic Scrutiny',
  description: 'Bridge 4,500 years of civilization: Contrast your municipal ward’s storm-water drainage with Harappan soak-pit engineering, and evaluate your state’s legislative structure.',
  steps: [
    'Constitutional Audit: Investigate whether your state legislature is unicameral or bicameral. If bicameral, look up its current Vidhan Parishad strength and verify if it satisfies Article 171.',
    'Sanitation Field Study: Walk through your local neighbourhood street. Are municipal storm drains covered with inspection slabs like Mohenjo-daro, or are they open surface gutters?',
    'Craft Lineage Tracing: Explore how gemstone artisans in Khambhat (Gujarat) continue to drill and heat carnelian beads using techniques identical to Chanhu-daro workshops.',
    'Civic Action Memo: Draft a 3-point municipal policy proposal applying Harappan sediment soak-pit designs to mitigate contemporary urban street flooding.',
  ],
};

// ============================================================================
// INTERFACE DEFINITIONS
// ============================================================================
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

interface ReflectionEntry {
  question: string;
  placeholder: string;
  defaultAnswer?: string;
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

// ============================================================================
// 25 COMPREHENSIVE CHALLENGES (FOUNDATION, STANDARD, ADVANCED)
// ============================================================================
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C9_HISTCIV_011,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'An MLA representing the Thrissur constituency in Kerala resigns to contest a parliamentary election. What constitutional election type is conducted to fill this specific solitary seat?',
    options: ['Mid-term Election', 'By-election', 'General Election', 'Council Indirect Election'],
    correctIndex: 1,
    explanation: 'A by-election is held solely to fill a casual vacancy arising in a single legislative constituency due to resignation, demise, or judicial disqualification, while the remainder of the House continues undisturbed.',
    hints: [
      'The entire Legislative Assembly is still in session and has not been dissolved.',
      'Only one single constituency seat is vacant.',
      'A by-election fills an isolated casual vacancy for the remaining duration of the ongoing assembly.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C9_HISTCIV_012,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the correct constitutional electorate stream to its designated quota in the Vidhan Parishad (Legislative Council) under Article 171 of the Constitution.',
    dragItems: [
      { label: 'Local Bodies (Municipalities/Panchayats)', targetId: 'slot_1_3a' },
      { label: 'Elected MLAs of Vidhan Sabha', targetId: 'slot_1_3b' },
      { label: 'Graduates of 3+ years standing', targetId: 'slot_1_12a' },
      { label: 'Teachers of 3+ years standing', targetId: 'slot_1_12b' },
    ],
    correctMapping: {
      slot_1_3a: 'Local Bodies (Municipalities/Panchayats)',
      slot_1_3b: 'Elected MLAs of Vidhan Sabha',
      slot_1_12a: 'Graduates of 3+ years standing',
      slot_1_12b: 'Teachers of 3+ years standing',
    },
    explanation: 'Article 171 establishes five distinct representation quotas: 1/3 elected by Local Authorities, 1/3 elected by MLAs, 1/12 elected by registered Graduates, 1/12 elected by Secondary School/College Teachers, and 1/6 nominated directly by the Governor.',
    hints: [
      'Local authorities and MLAs represent the largest legislative quotas (one-third each).',
      'Specialized educational streams (Graduates and Teachers) each account for one-twelfth.',
      'Article 171 formula: 1/3 (Local Bodies) + 1/3 (MLAs) + 1/12 (Graduates) + 1/12 (Teachers) + 1/6 (Governor Nominees).',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C9_HISTCIV_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following Indian states currently operates a BICAMERAL legislature featuring both a Vidhan Sabha (Assembly) and a Vidhan Parishad (Council)?',
    options: ['Tamil Nadu', 'Maharashtra', 'West Bengal', 'Kerala'],
    correctIndex: 1,
    explanation: 'Presently, only 6 Indian states possess bicameral legislatures: Maharashtra, Karnataka, Uttar Pradesh, Bihar, Andhra Pradesh, and Telangana. Tamil Nadu abolished its Legislative Council in 1986, and West Bengal abolished its council in 1969.',
    hints: [
      'Tamil Nadu and West Bengal abolished their upper houses decades ago.',
      'The western state with capital Mumbai maintains a 78-member Legislative Council.',
      'Maharashtra is bicameral alongside Karnataka, UP, Bihar, AP, and Telangana.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_04',
    nodeId: NODE_C9_HISTCIV_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Article 173 of the Indian Constitution, what is the minimum statutory age requirement for a candidate contesting for the Vidhan Sabha versus the Vidhan Parishad?',
    options: [
      'Vidhan Sabha: 25 years | Vidhan Parishad: 30 years',
      'Vidhan Sabha: 30 years | Vidhan Parishad: 25 years',
      '21 years for Vidhan Sabha | 35 years for Vidhan Parishad',
      '25 years for both legislative chambers',
    ],
    correctIndex: 0,
    explanation: 'Article 173 mandates a minimum age of 25 years for election to the Legislative Assembly (Vidhan Sabha), matching the Lok Sabha, and 30 years for the Legislative Council (Vidhan Parishad), matching the Rajya Sabha.',
    hints: [
      'The directly elected lower house has a younger age threshold.',
      'The upper chamber of elders and professionals requires 5 additional years of maturity.',
      'Vidhan Sabha: 25 years; Vidhan Parishad: 30 years.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_05',
    nodeId: NODE_C9_HISTCIV_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'At which major Harappan archaeological site was the monumental Great Bath discovered, and what engineering compound was applied to make the tank watertight?',
    options: [
      'Harappa — using baked lime mortar and limestone slabs',
      'Mohenjo-daro — using gypsum mortar and natural bitumen (asphalt tar)',
      'Lothal — using red terracotta slip and wooden battens',
      'Kalibangan — using unbaked clay plaster and straw',
    ],
    correctIndex: 1,
    explanation: 'The Great Bath (measuring 12m x 7m x 2.4m) was excavated at Mohenjo-daro in Larkana, Sindh, by Sir John Marshall’s archaeological expedition. It was sealed with tightly laid kiln-baked bricks set in gypsum mortar and layered with natural bitumen.',
    hints: [
      'The site is in Sindh on the right bank of the Indus River.',
      'The waterproofing material is natural bitumen (asphalt).',
      'Mohenjo-daro features the Great Bath waterproofed with bitumen.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_06',
    nodeId: NODE_C9_HISTCIV_018,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Harappan standard baked bricks followed a strict dimensional ratio of 4 : 2 : 1 for Length : Breadth : Height (Thickness). If the standard height (thickness) of a brick is 7 cm, what is its standardized length in cm?',
    correctAnswer: 28,
    tolerance: 0,
    unit: 'cm',
    explanation: 'With a ratio of 4:2:1, Length = 4 × Height. Thus, 4 × 7 cm = 28 cm length (and 2 × 7 cm = 14 cm breadth), demonstrating empire-wide standardization across thousands of kilometers.',
    hints: [
      'The ratio is Length (4) : Breadth (2) : Height (1).',
      'Multiply the given height (7 cm) by the length factor (4).',
      '4 × 7 = 28 cm.',
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C9_HISTCIV_017,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The iconic 10.5 cm high statuette known as the "Dancing Girl", unearthed at Mohenjo-daro in 1926, was cast using which sophisticated metallurgical process?',
    options: [
      'Chiseling from soft green steatite stone',
      'Lost-wax bronze casting (cire perdue)',
      'Hand-moulded terracotta kiln firing',
      'Hammering copper sheet over a wooden core',
    ],
    correctIndex: 1,
    explanation: 'The Dancing Girl is made of bronze (copper-tin alloy) and cast via the lost-wax method (cire perdue), showcasing master-level metallurgical precision that persists in traditional Indian craft centres today.',
    hints: [
      'The artefact is an alloy of copper and tin (bronze), not clay or stone.',
      'The method uses a wax model encased in clay that melts away when molten metal is poured.',
      'Lost-wax (cire perdue) bronze casting.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_08',
    nodeId: NODE_C9_HISTCIV_015,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the constitutional procedure of passing a Money Bill through a bicameral State Legislature into the exact sequential order:',
    sortItems: [
      'Governor provides prior recommendation for introducing Money Bill',
      'Money Bill is introduced exclusively in the Vidhan Sabha (Assembly)',
      'Vidhan Sabha debates, votes, passes the bill, and transmits it to Vidhan Parishad',
      'Vidhan Parishad reviews the bill within its mandatory 14-day statutory window',
      'Vidhan Sabha considers Council recommendations and forwards bill to Governor for assent',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Under Article 198, Money Bills require Governor recommendation, originate ONLY in Vidhan Sabha, and the Vidhan Parishad has strictly 14 days to suggest non-binding changes before the bill is deemed passed.',
    hints: [
      'Every Money Bill requires the prior consent/recommendation of the Governor.',
      'The Legislative Council cannot introduce Money Bills, nor hold them beyond 14 days.',
      'The Vidhan Sabha holds sovereign fiscal authority and may reject all Council suggestions.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_09',
    nodeId: NODE_C9_HISTCIV_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The State Legislature of Uttar Pradesh enacts a statute reforming land revenue administration and irrigation taxes. Under which List of the Seventh Schedule is this state legislative power conferred?',
    options: [
      'Union List (List I)',
      'State List (List II)',
      'Concurrent List (List III)',
      'Residuary Powers under Article 248',
    ],
    correctIndex: 1,
    explanation: 'Agriculture, land rights, land revenue, police, public health, and local government are exclusively assigned to State Legislatures under List II (State List) of the Seventh Schedule.',
    hints: [
      'Land revenue, agriculture, and police are local-regional administrative competencies.',
      'List II is the exclusive legislative domain of State Governments in normal times.',
      'State List (List II).',
    ],
  },
  {
    id: 'ch_10',
    nodeId: NODE_C9_HISTCIV_014,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How do the constitutional tenure and dissolution characteristics of the Vidhan Sabha differ from the Vidhan Parishad?',
    options: [
      'Both chambers dissolve simultaneously at the end of every 5-year cycle',
      'Vidhan Sabha has a 5-year term and can be dissolved early; Vidhan Parishad is a permanent body where 1/3 of members retire every 2 years',
      'Vidhan Parishad serves a 6-year term and dissolves as a whole every 6 years',
      'Vidhan Sabha is permanent, whereas Vidhan Parishad is dissolved on Governor order',
    ],
    correctIndex: 1,
    explanation: 'Vidhan Sabha has a maximum 5-year tenure and is subject to premature dissolution. Vidhan Parishad is a permanent deliberative chamber that never dissolves; individual MLCs have 6-year terms with one-third retiring every second year.',
    hints: [
      'The Vidhan Parishad functions exactly like the Rajya Sabha regarding permanency.',
      'One house can be prematurely dissolved by the Governor; the other never dissolves.',
      'Vidhan Sabha has a 5-year dissolvable term; Vidhan Parishad is permanent with staggered 6-year terms.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_11',
    nodeId: NODE_C9_HISTCIV_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Under Article 169 of the Constitution of India, what constitutional mechanism allows a state to create or abolish its Legislative Council (Vidhan Parishad)?',
    options: [
      'The Governor issues an executive ordinance with High Court sanction',
      'The State Assembly passes a resolution by special majority, followed by a simple majority law enacted by Parliament',
      'A statewide direct public referendum supervised by the Election Commission',
      'The Chief Minister petitions the Supreme Court under Article 32',
    ],
    correctIndex: 1,
    explanation: 'Article 169 mandates that the State Legislative Assembly must pass a resolution by a special majority (majority of total membership + 2/3 of members present and voting), after which Parliament passes an Act by simple majority to create or abolish the Council.',
    hints: [
      'Both the state assembly and national parliament are constitutional partners in this process.',
      'The assembly requires a special majority (2/3 present and voting + total membership majority).',
      'Assembly special majority resolution followed by an Act of Parliament.',
    ],
  },
  {
    id: 'ch_12',
    nodeId: NODE_C9_HISTCIV_012,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The Maharashtra Vidhan Sabha has 288 elected MLAs. Under the constitutional ceiling imposed by Article 171(1), what is the MAXIMUM permissible membership for the Maharashtra Vidhan Parishad?',
    correctAnswer: 96,
    tolerance: 0,
    unit: 'members',
    explanation: 'Article 171(1) stipulates that the total strength of the Legislative Council shall not exceed one-third (1/3) of the total strength of the Legislative Assembly. For 288 MLAs: 288 / 3 = 96 members.',
    hints: [
      'Recall the constitutional "one-third rule" for the upper house.',
      'Divide the assembly strength (288) by 3.',
      '288 / 3 = 96 members maximum.',
    ],
  },
  {
    id: 'ch_13',
    nodeId: NODE_C9_HISTCIV_019,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Akkadian and Sumerian cuneiform tablets from King Sargon of Akkad (c. 2350 BCE) document trade fleets arriving from Dilmun, Magan, and "Meluhha". What did "Meluhha" signify?',
    options: [
      'A minor island off the coast of Bahrain',
      'The vast realm of the Indus / Harappan Civilisation',
      'The ancient Kingdom of Elam in western Iran',
      'The Pharaonic mining settlements of the Sinai',
    ],
    correctIndex: 1,
    explanation: '"Meluhha" was the Mesopotamian designation for the Harappan Civilisation, celebrated in cuneiform inscriptions as a distant maritime land of carnelian, lapis lazuli, ivory, fine timbers, and copper.',
    hints: [
      'Dilmun was Bahrain, Magan was Oman, and Meluhha was the Indus Valley.',
      'It referred to the entire mature Harappan cultural domain.',
      'Meluhha represents the Harappan / Indus Valley Civilisation.',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_14',
    nodeId: NODE_C9_HISTCIV_018,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does the urban planning of Dholavira in the Rann of Kutch (Gujarat) diverge fundamentally from classic Indus settlements like Mohenjo-daro and Harappa?',
    options: [
      'Dholavira completely lacked fortified stone walls and street drainage',
      'Dholavira featured a unique tripartite city layout (Citadel, Middle Town, Lower Town) with giant stone masonry reservoirs, whereas Mohenjo-daro was bipartite (Citadel + Lower Town)',
      'Mohenjo-daro was built with dressed stone masonry while Dholavira used only unbaked mud',
      'Dholavira was circular with concentric radial avenues rather than a rectilinear grid',
    ],
    correctIndex: 1,
    explanation: 'While Mohenjo-daro had a two-part layout (upper Citadel and Lower Town), Dholavira featured a tripartite structure (Castle/Citadel, Middle Town, and Lower Town) along with 16 interconnected rainwater harvesting reservoirs built from dressed limestone.',
    hints: [
      'Count the administrative tiers: two-part division versus three-part division.',
      'Dholavira uniquely features a fortified "Middle Town" and monumental stone reservoirs.',
      'Dholavira is tripartite (Citadel, Middle Town, Lower Town) with sophisticated stone water conservation.',
    ],
  },
  {
    id: 'ch_15',
    nodeId: NODE_C9_HISTCIV_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which Harappan settlement was a dedicated industrial craft centre completely lacking a fortified citadel, specializing in carnelian bead manufacturing, seal-cutting, and shell-working?',
    options: ['Chanhu-daro', 'Kalibangan', 'Banawali', 'Surkotada'],
    correctIndex: 0,
    explanation: 'Chanhu-daro, located in Sindh south of Mohenjo-daro and excavated by Ernest Mackay, was an unfortified manufacturing hub dedicated exclusively to bead-making, seal engraving, and metal craft production.',
    hints: [
      'This site has no raised administrative citadel.',
      'Ernest Mackay found specialized furnaces, chert micro-drills, and carnelian bead blanks here.',
      'Chanhu-daro.',
    ],
  },
  {
    id: 'ch_16',
    nodeId: NODE_C9_HISTCIV_015,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the precise constitutional instrument through which the State Legislative Assembly enforces collective ministerial responsibility to bring down the state government:',
    availableParts: ['Motion of', 'No-Confidence', 'Adjournment Motion', 'Censure Motion', 'in Vidhan Sabha', 'in Vidhan Parishad'],
    targetState: 'Motion of No-Confidence in Vidhan Sabha',
    validationHint: 'Select the decisive motion type followed by the only constitutional chamber holding the power of executive dismissal.',
    explanation: 'Under Article 164(2), the Council of Ministers is collectively responsible solely to the Vidhan Sabha. Passing a Motion of No-Confidence in the Vidhan Sabha compels the Chief Minister and the entire cabinet to resign immediately.',
    hints: [
      'The motion expresses absence of confidence in the council of ministers.',
      'Remember: The ministry is accountable only to the lower, directly elected house.',
      'Target string: "Motion of No-Confidence in Vidhan Sabha".',
    ],
  },
  {
    id: 'ch_17',
    nodeId: NODE_C9_HISTCIV_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An elected MLA defies the political party whip by voting against the government during a critical division on the state budget. Under which constitutional enactment is this legislator disqualified?',
    options: [
      'Representation of the People Act, Section 8',
      'Tenth Schedule (Anti-Defection Law, 52nd Constitutional Amendment 1985)',
      'Article 356 (Proclamation of President’s Rule)',
      'Article 213 (Governor’s Ordinance Making Power)',
    ],
    correctIndex: 1,
    explanation: 'The Tenth Schedule, added by the 52nd Constitutional Amendment Act of 1985, provides for the disqualification of legislators on grounds of defection or voting contrary to party whip directives without prior permission.',
    hints: [
      'This constitutional schedule was introduced in 1985 to deter political opportunism and party-hopping.',
      'Commonly known as the Anti-Defection Law.',
      'Tenth Schedule (52nd Amendment).',
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C9_HISTCIV_019,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Sir Leonard Woolley excavated distinctive Harappan etched carnelian beads and a square unicorn steatite seal in the Royal Cemetery of Ur (Mesopotamia). Why is this archaeological discovery classified as "convergent historical evidence"?',
    options: [
      'It proves Harappan armies conquered Sumerian city-states by force',
      'It provides tangible material proof that corroborates Mesopotamian cuneiform trade records mentioning imports from Meluhha',
      'It establishes that Harappans and Sumerians spoke an identical Indo-European language',
      'It indicates that Mesopotamians minted official currency for Indus valley merchants',
    ],
    correctIndex: 1,
    explanation: 'Convergent evidence occurs when independent archaeological artefacts (Indus seals and carnelian beads discovered at Ur) independently corroborate separate textual sources (Mesopotamian cuneiform tablets listing Meluhha goods), verifying trans-oceanic trade networks.',
    hints: [
      'One source is physical material (artefacts at Ur), the other is written documentation (cuneiform tablets).',
      'When independent physical and textual proofs match, historical truth is firmly verified.',
      'Tangible archaeological artefacts corroborating independent written cuneiform records.',
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C9_HISTCIV_019,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Match the vital raw materials procured by Harappan industrial craft workshops with their verified regional geological extraction zones:',
    options: [
      'Copper: Khetri (Rajasthan) | Lapis Lazuli: Shortughai/Badakhshan (Afghanistan) | Gold: Kolar (Karnataka)',
      'Copper: Badakhshan | Lapis Lazuli: Karnataka | Gold: Khetri',
      'Copper: Lothal | Lapis Lazuli: Kalibangan | Gold: Harappa',
      'Copper: Mesopotamia | Lapis Lazuli: Sindh | Gold: Kashmir',
    ],
    correctIndex: 0,
    explanation: 'Harappan resource supply networks: Copper came from the Khetri mines of Rajasthan (and Oman/Magan), Lapis Lazuli from Badakhshan via the Shortughai outpost, and Gold from South India (Kolar/Hatti in Karnataka).',
    hints: [
      'Rajasthan’s Khetri belt is India’s oldest copper mining basin.',
      'The vibrant blue stone Lapis Lazuli was obtained from northeastern Afghanistan.',
      'Copper from Khetri, Lapis Lazuli from Badakhshan, Gold from Kolar/Karnataka.',
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C9_HISTCIV_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why do contemporary economic historians consider the systemic transition from "agricultural surplus" to "full-time craft specialisation" as undeniable proof of social stratification in Harappan society?',
    options: [
      'Full-time bead-makers, bronze-smiths, and seal-cutters did not farm, meaning surplus agricultural food had to be collected and redistributed by an administrative ruling authority to sustain non-producing urban specialists',
      'All artisans were enslaved by a standing military regiment stationed in the Citadel',
      'Craft items were manufactured exclusively for religious temple sacrifices',
      'Villages were completely isolated from urban centres with no exchange of grain',
    ],
    correctIndex: 0,
    explanation: 'Full-time craft specialists require substantial food surpluses grown by farmers and centralized mechanisms for storage (granaries), procurement, and distribution, which inherently requires administrative hierarchies and social stratification.',
    hints: [
      'Think about who feeds non-agricultural artisans who spend all day carving seals and casting bronze.',
      'Surplus food enables division of labour, requiring centralized governance and social ranking.',
      'Surplus food sustains full-time craftspeople through organized administrative distribution.',
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C9_HISTCIV_019,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Trace the complete 5-stage economic and logistical journey of an etched carnelian bead exported from Gujarat to the Mesopotamian city of Ur:',
    sortItems: [
      'Raw carnelian extraction from Ratanpur mines in Gujarat',
      'Thermal treatment in kilns and diamond/chert micro-drilling at Chanhu-daro or Lothal workshops',
      'Standardized measurement against binary cubical chert weights',
      'Application of steatite seal impression on wet clay tag over cargo bales at Lothal dockyard',
      'Maritime transit through Gulf of Khambhat and Persian Gulf to the Euphrates port of Ur',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The commodity chain moved from raw geological quarrying -> pyrotechnic & lapidary manufacture -> metrological verification -> administrative seal tagging at Lothal -> maritime export across the Indian Ocean to Mesopotamia.',
    hints: [
      'Begin at the raw quarry in Gujarat.',
      'Follow through workshop manufacture, weighing, port sealing, and trans-oceanic shipping.',
      'Quarry -> Workshop -> Weights -> Seal Tagging -> Maritime Shipping to Ur.',
    ],
  },
  {
    id: 'ch_22',
    nodeId: NODE_C9_HISTCIV_016,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why do modern archaeologists reject the early colonial assumption that the Harappan Citadel was a "military garrison for armed soldiers"?',
    options: [
      'Excavations revealed monumental public granaries, the Great Bath, and pillared assembly halls, with no weapon armouries, barracks, or signs of militaristic garrison life',
      'The Citadel was merely a burial cemetery for royalty',
      'Harappan cities lacked perimeter walls or gates of any kind',
      'Weapons of iron and steel were discovered solely in the Lower Town',
    ],
    correctIndex: 0,
    explanation: 'Extensive excavations at Mohenjo-daro and Harappa demonstrate that Citadels were raised civic, ritual, and administrative platforms containing storage granaries and public gathering halls, not military fortresses.',
    hints: [
      'Archaeologists found public baths, granaries, and halls—not barracks, armouries, or siege engines.',
      'Do not conflate European medieval castles with Harappan elevated civic platforms.',
      'Citadels were civic/administrative hubs housing public works, not military castles.',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_23',
    nodeId: NODE_C9_HISTCIV_018,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How did Harappan sanitary engineers ensure that underground street drains remained unblocked despite daily household wastewater discharge?',
    options: [
      'By utilizing pressurized steam pump mechanisms',
      'By integrating brick-lined sediment soak pits (cesspits) and removable limestone inspection covers for periodic clearing',
      'By discharging all raw waste directly into open drinking water wells',
      'By allowing storm water to flush down narrow residential corridors without pipes',
    ],
    correctIndex: 1,
    explanation: 'Harappan drains featured underground brick masonry channels with settling basins (soak pits) that caught solid silt while clear water drained away, and flat removable stone slabs that municipal cleaners lifted for maintenance.',
    hints: [
      'They constructed settling chambers that trapped heavy solid waste before water entered main drains.',
      'Removable inspection covers allowed municipal workers to clear sediment.',
      'Underground masonry drains with sediment soak pits and removable inspection covers.',
    ],
  },
  {
    id: 'ch_24',
    nodeId: NODE_C9_HISTCIV_012,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Under Article 171(5), which specific fields of excellence qualify individuals for nomination to the Vidhan Parishad by the Governor?',
    options: [
      'Literature, Science, Art, Co-operative Movement, and Social Service',
      'Military Service, Corporate Commerce, and Judiciary only',
      'Party Politics, Diplomatic Corps, and Sports only',
      'Religious Clergy, Mining Executives, and Royal Nobility',
    ],
    correctIndex: 0,
    explanation: 'Article 171(5) specifies five distinct fields for the 1/6 Governor nominees: Literature, Science, Art, the Co-operative Movement, and Social Service (note: Co-operative Movement is uniquely present in State Councils, unlike the Rajya Sabha).',
    hints: [
      'State Legislative Councils include one unique category not present in Rajya Sabha nominations: the Co-operative Movement.',
      'The 5 fields are: Literature, Science, Art, Co-operative Movement, Social Service.',
      'Literature, Science, Art, Co-operative Movement, and Social Service.',
    ],
  },
  {
    id: 'ch_25',
    nodeId: NODE_C9_HISTCIV_011,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Match the specific electoral scenario with its exact constitutional categorization and resulting legislative term:',
    options: [
      'Assembly completes 5 years -> General Election -> Fresh 5-year term | Assembly dissolved in year 2 -> Mid-term Election -> Fresh 5-year term | MLA dies in year 3 -> By-election -> Remaining 2-year term',
      'Assembly completes 5 years -> By-election | MLA dies -> Mid-term Election | Assembly dissolved -> General Election',
      'Assembly dissolved in year 2 -> Mid-term Election -> 3-year remaining term | MLA dies -> By-election -> 5-year fresh term',
      'All electoral situations produce identical 5-year terms regardless of trigger',
    ],
    correctIndex: 0,
    explanation: 'General Elections follow normal expiration (5-year term). Mid-term Elections follow early dissolution (fresh 5-year term). By-elections fill casual vacancies (remainder of ongoing term only).',
    hints: [
      'Check the tenure result: General = 5 yrs, Mid-term = 5 yrs, By-election = remaining term balance.',
      'Premature dissolution produces a mid-term election with a fresh 5-year mandate.',
      'General: 5 yrs; Mid-term: fresh 5 yrs; By-election: remaining term balance.',
    ],
  },
];

// ============================================================================
// EXPLORATION MODULES
// ============================================================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Election Scope & Tenure Simulator',
    subtitle: 'Contrasting Mid-Term Dissolution vs Casual By-Election Vacancies',
    instruction: 'Toggle between premature assembly dissolution and single-seat resignation to observe constitutional impact on seat vacancy and tenure.',
    interactionType: 'election-toggle',
    nodeId: NODE_C9_HISTCIV_011,
  },
  {
    title: 'Lab 2: Bicameral Quota & Ceiling Balancer',
    subtitle: 'State Assembly vs Vidhan Parishad One-Third Ceiling & Article 171 Quotas',
    instruction: 'Adjust the Assembly MLA strength to observe how the 1/3 ceiling governs the Vidhan Parishad and view the 5 quota streams.',
    interactionType: 'slider-quota',
    nodeId: NODE_C9_HISTCIV_012,
  },
  {
    title: 'Lab 3: Mohenjo-daro Great Bath & Bitumen Engineering',
    subtitle: 'Hydraulic Architecture & Watertight Masonry (2500 BCE)',
    instruction: 'Toggle the water level and examine the bitumen waterproofing, staircases, and brick-lined covered drains.',
    interactionType: 'water-engineering',
    nodeId: NODE_C9_HISTCIV_016,
  },
  {
    title: 'Lab 4: Harappan Grid City & Covered Drainage Simulator',
    subtitle: 'Cardo-Decumanus Avenues, Soak Pits & Hydraulic Gradient',
    instruction: 'Adjust rainfall and observe how bathroom gradient drains connect to underground street drains and soak pits.',
    interactionType: 'grid-drainage',
    nodeId: NODE_C9_HISTCIV_018,
  },
  {
    title: 'Lab 5: Meluhha to Ur: Maritime Barter & Binary Weights',
    subtitle: 'Metrological Precision with Binary Chert Cubes (1, 2, 4, 8, 16)',
    instruction: 'Place binary chert weights (1:2:4:8:16) on the balance scale to trade carnelian beads for Mesopotamian silver without coins.',
    interactionType: 'weight-scale',
    nodeId: NODE_C9_HISTCIV_019,
  },
];

// ============================================================================
// PREDICTIONS & OBSERVATIONS
// ============================================================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Prediction: If a 240-member State Legislative Assembly is dissolved by the Governor after only 18 months, what will occur in the subsequent election?',
    options: [
      'All 240 seats are contested, and the newly elected Assembly serves a fresh 5-year term',
      'Only the seats of ministers are contested for 3.5 years',
      'All 240 seats are contested, but the Assembly serves only the remaining 3.5 years',
      'The Legislative Council assumes legislative authority permanently',
    ],
    correctIndex: 0,
    verifyInstruction: 'Select "Scenario A: Premature Dissolution (Mid-Term)" in Lab 1 to verify your prediction live.',
  },
  {
    question: 'Prediction: If monsoon rainfall reaches 100% in Mohenjo-daro, how did municipal engineering prevent sewage backflow into homes?',
    options: [
      'Houses were built on wooden stilts over lakes',
      'Underground covered drains with steep hydraulic gradients and sediment soak pits channelled effluent away from living quarters',
      'All wastewater was collected manually by carts daily',
      'Water was diverted directly into household drinking wells',
    ],
    correctIndex: 1,
    verifyInstruction: 'Slide rainfall intensity to 100% in Lab 4 to observe the sediment trap flow dynamics.',
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation Inquiry: When you increase the Assembly size from 120 to 300 MLAs, what constitutional ceiling restricts the Vidhan Parishad?',
    observableOptions: [
      'The Council capacity expands proportionally, but can NEVER exceed exactly 1/3 of the Assembly total',
      'The Council automatically doubles in size regardless of formula',
      'The Council is permanently fixed at 40 members regardless of Assembly size',
      'The Council dissolves automatically when Assembly size changes',
    ],
    correctIndex: 0,
  },
  {
    question: 'Observation Inquiry: What mathematical progression governs the standard Harappan chert weights on the trade scale?',
    observableOptions: [
      'A strict binary doubling sequence: 1, 2, 4, 8, 16 units for smaller transactions, transitioning to decimal multiples for large loads',
      'Random irregular fractions based on local tribal customs',
      'A base-12 duodecimal system identical to Roman coinage',
      'Decreasing unit weights as distance from the capital increased',
    ],
    correctIndex: 0,
  },
];

// ============================================================================
// REFLECTION INQUIRIES
// ============================================================================
const REFLECTION_PROMPTS: ReflectionEntry[] = [
  {
    question: 'What was the most surprising constitutional or archaeological concept you discovered during this simulation?',
    placeholder: 'e.g., I was surprised to learn that mid-term elections reset the entire 5-year constitutional clock, or that Harappans waterproofed the Great Bath with natural asphalt bitumen in 2500 BCE...',
    defaultAnswer: 'Discovering that premature assembly dissolution gives the newly elected house a completely fresh 5-year term rather than just the remainder was a major revelation!',
  },
  {
    question: 'How would you explain the difference between a By-election and a Mid-term election to a classmate?',
    placeholder: 'e.g., A by-election is like replacing one broken tile in a floor for the remaining time, whereas a mid-term election is rebuilding the entire floor from scratch...',
    defaultAnswer: 'A by-election fills one solitary empty seat for the leftover years, while a mid-term election dissolves the whole assembly and restarts a brand new 5-year government for all seats.',
  },
  {
    question: 'Where in modern urban engineering or democratic governance can you apply the principles learned today?',
    placeholder: 'e.g., Applying Harappan covered soak-pit drainage principles to modern municipal storm-water management, or understanding how state bicameral bills are reviewed...',
    defaultAnswer: 'In analyzing our city municipal corporation’s monsoon drainage systems and tracking how our state legislature passes budgetary finance bills.',
  },
];

// ============================================================================
// DEFAULT COMPONENT PROPS
// ============================================================================
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C9_HISTCIV_011,
  title: 'State Legislature Dynamics & Harappan Civilisation Simulation',
  definition: 'An interactive pedagogical simulation examining the constitutional dynamics of Indian State Legislatures alongside the urban, metrological, and commercial achievements of the Indus Valley Civilisation.',
  eli5: 'Discover how modern state democracy handles elections and legislative checks, and travel back 4,500 years to see how Harappans built planned grid cities, covered sewer networks, and international trade routes without money or kings.',
  misconceptions: [
    { misconception: 'A mid-term election produces a House that serves only the remaining years of the dissolved term', correction: 'A mid-term election dissolves the entire House and inaugurates a completely fresh 5-year constitutional term from the date of its first meeting.' },
    { misconception: 'Every Indian state legislature has a Legislative Council (Vidhan Parishad)', correction: 'Only 6 states are bicameral; all other 22 states are unicameral with only a Vidhan Sabha.' },
    { misconception: 'Vidhan Sabha and Vidhan Parishad both have 5-year terms and dissolve simultaneously', correction: 'Vidhan Sabha has a 5-year dissolvable term; Vidhan Parishad is a permanent body that never dissolves (1/3 of members retire every 2 years).' },
    { misconception: 'The Great Bath was excavated at Harappa', correction: 'The Great Bath was excavated at Mohenjo-daro in Sindh on the right bank of the Indus River.' },
    { misconception: 'The Dancing Girl is a fragile terracotta clay toy', correction: 'The Dancing Girl is a high-status bronze masterpiece cast using the advanced lost-wax (cire perdue) metallurgical technique.' },
    { misconception: 'The Vidhan Parishad can veto or permanently block a Money Bill', correction: 'The Vidhan Parishad can delay a Money Bill for only 14 days and offer recommendations that the Assembly may accept or reject.' },
    { misconception: 'Meluhha was a single isolated city like Mohenjo-daro', correction: 'Meluhha was the Mesopotamian regional name for the entire Harappan / Indus Valley cultural realm.' },
    { misconception: 'The Harappan Citadel was a military garrison with battlements and armouries', correction: 'The Citadel was an elevated civic/administrative platform housing the Great Bath, granaries, and public assembly halls.' },
  ],
  diagnosticQuestions: [
    { question: 'What event triggers a mid-term election in a State Legislature?', options: ['Death of one sitting MLA', 'Premature dissolution of the entire Assembly by the Governor', 'Completion of regular 5-year tenure', 'Resignation of the Speaker'], correctIndex: 1 },
    { question: 'How many states in India currently operate a bicameral Vidhan Parishad?', options: ['28', '14', '6', '2'], correctIndex: 2 },
    { question: 'What is the minimum age to be elected as an MLA in the Vidhan Sabha?', options: ['18 years', '21 years', '25 years', '30 years'], correctIndex: 2 },
    { question: 'What is the statutory deadline for the Vidhan Parishad to return a Money Bill?', options: ['14 days', '30 days', '3 months', '6 months'], correctIndex: 0 },
    { question: 'What is the standardized ratio of Harappan kiln-baked bricks?', options: ['1:2:4', '4:2:1', '3:2:1', '5:3:1'], correctIndex: 1 },
    { question: 'Where was the earliest tidal dockyard excavated?', options: ['Harappa', 'Mohenjo-daro', 'Lothal', 'Kalibangan'], correctIndex: 2 },
    { question: 'Which soft stone was most commonly used to carve Harappan seals?', options: ['Granite', 'Steatite (Soapstone)', 'Marble', 'Sandstone'], correctIndex: 1 },
    { question: 'Which metal remained completely unknown to Harappan metallurgists?', options: ['Copper', 'Bronze', 'Gold', 'Iron'], correctIndex: 3 },
  ],
  masteryCriteria: 'Demonstrates comprehensive understanding of state legislative governance, bicameral balances, and Harappan urban planning, metallurgy, and commerce.',
};

// ============================================================================
// MAIN SIMULATION COMPONENT
// ============================================================================
function C9_HistoryCivicsMidtermElectionByelectionSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['histciv'] || { name: 'History & Civics', emoji: '🏛️', color: 'amber' };

  // Phase State Management
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Exploration Lab States
  const [electionMode, setElectionMode] = useState<'midterm' | 'byelection'>('midterm');
  const [assemblyMembers, setAssemblyMembers] = useState(180);
  const [bathWaterFilled, setBathWaterFilled] = useState(true);
  const [bitumenInspected, setBitumenInspected] = useState(false);
  const [rainfallIntensity, setRainfallIntensity] = useState(45);
  const [activeSoakPit, setActiveSoakPit] = useState(true);
  const [selectedTradeGood, setSelectedTradeGood] = useState<'carnelian' | 'copper' | 'lapis' | 'cotton'>('carnelian');
  const [scaleBalanced, setScaleBalanced] = useState(false);
  const [weightsOnScale, setWeightsOnScale] = useState<number[]>([]);

  // Prediction & Observation Interactive States
  const [predIndex, setPredIndex] = useState(-1);
  const [predMade, setPredMade] = useState(false);
  const [obsAnswered, setObsAnswered] = useState(false);
  const [obsIndex, setObsIndex] = useState(-1);

  // Challenge & Adaptive Difficulty Engine
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Escalating Hints & Step-by-Step Explanation
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Interaction Specific States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Feedback & Audio States
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Reflection Journal States
  const [reflectionResponses, setReflectionResponses] = useState<Record<number, string>>({
    0: '',
    1: '',
    2: '',
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineGsapRef = useRef<HTMLDivElement | null>(null);

  // Filter Challenges by Adaptive Difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Calculated Upper House Limit
  const maxCouncilStrength = useMemo(() => {
    return Math.floor(assemblyMembers / 3);
  }, [assemblyMembers]);

  // Load Existing Mastery on Mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Bayesian Knowledge Tracing Difficulty Progression
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

  // GSAP Animation for Lab Transitions
  useEffect(() => {
    if (phase === 'explore' && timelineGsapRef.current) {
      gsap.fromTo(
        timelineGsapRef.current,
        { opacity: 0, y: 24, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [phase, currentSlide]);

  // Canvas 2D Animation Loop for Harappan Underground Drainage
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

      // Paved Brick Street Bedding
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Main Avenue Surface
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(20, 15, canvas.width - 40, 50);

      // Covered Brick Drainage Conduit
      ctx.strokeStyle = '#64748b';
      ctx.setLineDash([10, 5]);
      ctx.lineWidth = 3;
      ctx.strokeRect(20, 28, canvas.width - 40, 24);
      ctx.setLineDash([]);

      // Flowing Effluent Particles
      const flowSpeed = (rainfallIntensity / 100) * 4 + 1.2;
      const count = Math.floor(rainfallIntensity / 10) + 5;
      ctx.fillStyle = '#38bdf8';

      for (let i = 0; i < count; i++) {
        const xPos = (frame * flowSpeed + i * (canvas.width / count)) % (canvas.width - 60) + 30;
        const yPos = 40 + Math.sin((frame + i * 15) * 0.1) * 4;
        ctx.beginPath();
        ctx.arc(xPos, yPos, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Sediment Soak Pit (Cesspit) Chamber
      ctx.fillStyle = activeSoakPit ? '#166534' : '#991b1b';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, 40, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Labels
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '10px sans-serif';
      ctx.fillText('Mohenjo-daro Cardo Avenue Sub-surface Conduit', 25, 12);
      ctx.fillText(activeSoakPit ? 'Soak Pit Active (Silt Trapped)' : 'Soak Pit Bypassed', canvas.width / 2 - 60, 82);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [rainfallIntensity, activeSoakPit, phase]);

  // Escalating Hints System
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
    }
  }, [hintCount, activeChallenge]);

  // Discovery Answer Handler
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding insight! Premature dissolution completely resets the 5-year constitutional clock.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Entering interactive laboratories. Test and manipulate each civics and historical mechanism.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free sandbox mode active. Explore variables without time or grading constraints.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Assessment challenge phase initiated. Evaluate each prompt thoroughly.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredIndex(idx);
    setPredMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Validate your hypothesis in the interactive module.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObsIndex(idx);
    setObsAnswered(true);
    const isCorrect = idx === (currentSlide === 1 ? OBSERVATION_QUESTIONS[0].correctIndex : OBSERVATION_QUESTIONS[1].correctIndex);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation confirmed!' : 'Examine the proportional ratios on screen carefully.');
  }, [currentSlide]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Mastery assessment complete with a score of ${finalScore} percent.`);
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
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // Master Answer Verification Engine
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = answer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = (typeof answer === 'string' ? answer.trim() : '') === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Precise constitutional and historical analysis.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`mastery_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us examine the authoritative constitutional breakdown.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`mastery_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  // Drag and Drop Helpers
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
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
      if (prev.length === 0 && activeChallenge.sortItems) {
        prev = activeChallenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (activeChallenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, activeChallenge, handleAnswer]);

  const handleAddWeight = useCallback((val: number) => {
    audioManager.play('count');
    setWeightsOnScale(prev => {
      const updated = [...prev, val];
      const total = updated.reduce((a, b) => a + b, 0);
      if (total === 16) {
        setScaleBalanced(true);
        audioManager.play('balance');
        speechManager.speak('Scale perfectly balanced at 16 binary units! Standardized Lothal barter trade verified.');
      } else {
        setScaleBalanced(false);
      }
      return updated;
    });
  }, []);

  const handleResetWeights = useCallback(() => {
    audioManager.play('pop');
    setWeightsOnScale([]);
    setScaleBalanced(false);
  }, []);

  // Council Quota Distribution Data
  const quotaChartData = useMemo(() => [
    { name: 'Local Bodies (1/3)', share: Math.round(maxCouncilStrength * (1 / 3)), color: '#38bdf8' },
    { name: 'MLAs (1/3)', share: Math.round(maxCouncilStrength * (1 / 3)), color: '#818cf8' },
    { name: 'Governor (1/6)', share: Math.round(maxCouncilStrength * (1 / 6)), color: '#fbbf24' },
    { name: 'Graduates (1/12)', share: Math.round(maxCouncilStrength * (1 / 12)), color: '#34d399' },
    { name: 'Teachers (1/12)', share: Math.round(maxCouncilStrength * (1 / 12)), color: '#f472b6' },
  ], [maxCouncilStrength]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-800/80 backdrop-blur rounded-2xl border border-slate-700/60"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-amber-500/20 rounded-xl border border-amber-500/30">{subjectConfig.emoji}</span>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-400">ICSE Class 9 Humanities & Civics Laboratory</span>
            <h1 className="text-xl md:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              difficulty === 'foundation' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
              difficulty === 'standard' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' :
              'bg-rose-500/20 text-rose-300 border border-rose-500/40'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="px-3 py-1 bg-slate-700/60 text-slate-300 rounded-full text-xs font-semibold">
            Proficiency: {masteryLevel}
          </span>
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-amber-950/40 rounded-2xl border border-indigo-700/40 shadow-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Investigative Briefing</span>
            <h2 className="text-xl md:text-2xl font-bold text-white mt-1 mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-200 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-300">
              <span className="font-bold text-amber-400">Core Objectives: </span>
              {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-4 shadow-lg">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <span>🔍 Curiosity Discovery Inquiry (Ungraded Diagnostic)</span>
            </div>
            <p className="text-white text-base md:text-lg font-semibold">{DISCOVERY_QUESTION.question}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-900/80 border-2 border-emerald-400 text-emerald-100 shadow-lg'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/60 border border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-900/90 hover:bg-slate-700/80 border border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-amber-400">{String.fromCharCode(65 + i)}.</span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-slate-700">
                <p className={discoveryCorrect ? 'text-emerald-400 text-sm font-semibold mb-4' : 'text-amber-300 text-sm font-semibold mb-4'}>
                  {discoveryCorrect ? '✨ Outstanding constitutional acumen! Under Article 172, a mid-term election initiates a completely fresh 5-year mandate.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-amber-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg flex items-center gap-2"
                >
                  Enter Interactive Guided Laboratories →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  currentSlide === idx
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Lab {idx + 1}: {step.title.split(':')[0].replace('Lab ', '')}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              ref={timelineGsapRef}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-4 shadow-xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-amber-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <p className="text-xs text-slate-400">{EXPLORATION_STEPS[currentSlide].subtitle}</p>
                </div>
                <span className="text-xs px-2.5 py-1 bg-slate-900 text-indigo-300 rounded-lg border border-slate-700 font-mono">
                  {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>

              <p className="text-sm text-slate-200 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                👉 <span className="font-semibold text-amber-300">{EXPLORATION_STEPS[currentSlide].instruction}</span>
              </p>

              {/* ── LAB 1: Mid-Term vs By-Election Interactive Model ── */}
              {currentSlide === 0 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setElectionMode('midterm');
                        audioManager.play('pop');
                      }}
                      className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${
                        electionMode === 'midterm' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      Scenario A: Premature Dissolution (Mid-Term)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setElectionMode('byelection');
                        audioManager.play('pop');
                      }}
                      className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${
                        electionMode === 'byelection' ? 'bg-amber-600 text-white shadow' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      Scenario B: Single MLA Resignation (By-Election)
                    </motion.button>
                  </div>

                  <svg viewBox="0 0 500 180" className="w-full bg-slate-900 rounded-xl p-2 border border-slate-800">
                    <rect x="20" y="20" width="460" height="140" rx="10" fill="#0b1329" stroke="#334155" />
                    <text x="250" y="44" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontWeight="bold">
                      {electionMode === 'midterm'
                        ? 'State Legislative Assembly Dissolved — ALL 200 Seats Vacated'
                        : 'State Legislative Assembly Active — 1 Casual Vacancy (Seat #18)'}
                    </text>

                    {/* Seat Arrangement Grid */}
                    {Array.from({ length: 40 }).map((_, i) => {
                      const row = Math.floor(i / 10);
                      const col = i % 10;
                      const isVacant = electionMode === 'midterm' || i === 17;
                      return (
                        <circle
                          key={i}
                          cx={55 + col * 43}
                          cy={65 + row * 22}
                          r="6.5"
                          fill={isVacant ? (electionMode === 'midterm' ? '#ef4444' : '#f59e0b') : '#22c55e'}
                        />
                      );
                    })}

                    <text x="50" y="148" fill="#94a3b8" fontSize="10">
                      Constituencies Contested: <tspan fill={electionMode === 'midterm' ? '#ef4444' : '#f59e0b'} fontWeight="bold">
                        {electionMode === 'midterm' ? 'ALL 200 (Universal State-wide)' : '1 Single Constituency'}
                      </tspan>
                    </text>
                    <text x="310" y="148" fill="#94a3b8" fontSize="10">
                      Mandate Duration: <tspan fill="#38bdf8" fontWeight="bold">
                        {electionMode === 'midterm' ? 'Fresh 5-Year Term' : 'Remaining Term Balance'}
                      </tspan>
                    </text>
                  </svg>
                </div>
              )}

              {/* ── LAB 2: Vidhan Parishad One-Third Ceiling & Quotas ── */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-300">
                      <span>Assembly (Vidhan Sabha) Strength: <strong className="text-white">{assemblyMembers} MLAs</strong></span>
                      <span className="text-amber-400">Max Vidhan Parishad Ceiling (1/3rd): <strong>{maxCouncilStrength} MLCs</strong></span>
                    </div>
                    <input
                      type="range"
                      min={60}
                      max={400}
                      value={assemblyMembers}
                      onChange={(e) => {
                        setAssemblyMembers(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-amber-500 cursor-pointer"
                      aria-label="Adjust Assembly Member Count"
                    />
                  </div>

                  <div className="h-56 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={quotaChartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} interval={0} angle={-10} textAnchor="end" />
                        <YAxis stroke="#94a3b8" fontSize={10} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                        <Bar dataKey="share" radius={[4, 4, 0, 0]}>
                          {quotaChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {!obsAnswered && (
                    <div className="p-3 bg-slate-900 rounded-xl border border-indigo-800/60">
                      <p className="text-xs font-bold text-amber-300 mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="p-2 text-left bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── LAB 3: Mohenjo-daro Great Bath & Bitumen Architecture ── */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setBathWaterFilled(!bathWaterFilled);
                        audioManager.play('pop');
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow"
                    >
                      {bathWaterFilled ? 'Drain Great Bath Basin' : 'Fill Great Bath Basin'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setBitumenInspected(!bitumenInspected);
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        bitumenInspected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {bitumenInspected ? 'Hide Bitumen Waterproofing' : 'Inspect Natural Bitumen Tar Seal'}
                    </motion.button>
                  </div>

                  <svg viewBox="0 0 500 200" className="w-full bg-slate-900 rounded-xl border border-slate-800">
                    <rect x="35" y="25" width="430" height="150" fill="#451a03" stroke="#78350f" strokeWidth="4" rx="6" />
                    <rect
                      x="55"
                      y="45"
                      width="390"
                      height="110"
                      fill={bitumenInspected ? '#000000' : '#713f12'}
                      stroke={bitumenInspected ? '#fbbf24' : '#b45309'}
                      strokeWidth={bitumenInspected ? 3 : 1}
                    />
                    <rect
                      x="65"
                      y="55"
                      width="370"
                      height="90"
                      fill={bathWaterFilled ? '#0284c7' : '#1e293b'}
                      opacity={bathWaterFilled ? 0.88 : 1}
                    />
                    {/* Flights of Steps */}
                    <path d="M 65 55 L 105 55 L 105 75 L 125 75 L 125 95 L 145 95 L 145 145" stroke="#fbbf24" strokeWidth="3" fill="none" />
                    <path d="M 435 55 L 395 55 L 395 75 L 375 75 L 375 95 L 355 95 L 355 145" stroke="#fbbf24" strokeWidth="3" fill="none" />

                    <text x="250" y="100" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="bold">
                      {bathWaterFilled ? 'Ritual / Communal Bathing Pool (12m × 7m × 2.4m)' : 'Gypsum Mortar & Kiln-Baked Bricks Foundation'}
                    </text>
                    {bitumenInspected && (
                      <text x="250" y="125" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
                        Watertight Natural Tar Seal Membrane (Bitumen Layer)
                      </text>
                    )}
                  </svg>
                </div>
              )}

              {/* ── LAB 4: Harappan Grid & Drainage Engine ── */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>Monsoon Precipitation Intensity: <strong>{rainfallIntensity}%</strong></span>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setActiveSoakPit(!activeSoakPit);
                        audioManager.play('tap');
                      }}
                      className={`px-3 py-1 rounded-lg font-bold shadow ${
                        activeSoakPit ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      }`}
                    >
                      {activeSoakPit ? 'Soak Pit: Filtering Silt' : 'Soak Pit: Blocked'}
                    </motion.button>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={rainfallIntensity}
                    onChange={(e) => {
                      setRainfallIntensity(Number(e.target.value));
                      audioManager.play('count');
                    }}
                    className="w-full accent-sky-400 cursor-pointer"
                    aria-label="Adjust Precipitation Intensity"
                  />
                  <canvas ref={canvasRef} width={500} height={100} className="w-full rounded-xl border border-slate-700" />
                  <p className="text-xs text-slate-400 text-center">
                    Household bathroom chutes connect directly to subterranean street drains equipped with sediment traps and inspection covers.
                  </p>
                </div>
              )}

              {/* ── LAB 5: Binary Weight & Barter Trade Scale ── */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs text-slate-300">
                      Selected Consignment: <strong className="text-amber-400 capitalize">{selectedTradeGood}</strong> (Target Weight: 16 Binary Units)
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleResetWeights}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-rose-300 text-xs rounded-lg"
                    >
                      Reset Weights
                    </motion.button>
                  </div>

                  <div className="flex gap-2">
                    {[1, 2, 4, 8, 16].map((w) => (
                      <motion.button
                        key={w}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddWeight(w)}
                        className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 text-xs font-bold rounded-lg shadow"
                      >
                        +{w} Chert Cube
                      </motion.button>
                    ))}
                  </div>

                  <svg viewBox="0 0 500 130" className="w-full bg-slate-900 rounded-xl p-2 border border-slate-800">
                    <polygon points="250,110 235,130 265,130" fill="#64748b" />
                    <line
                      x1="100"
                      y1={scaleBalanced ? 60 : 75}
                      x2="400"
                      y2={scaleBalanced ? 60 : 45}
                      stroke="#cbd5e1"
                      strokeWidth="5"
                    />
                    <circle cx="100" cy={scaleBalanced ? 90 : 105} r="25" fill="#d97706" />
                    <text x="100" y={scaleBalanced ? 94 : 109} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                      Goods (16)
                    </text>

                    <circle cx="400" cy={scaleBalanced ? 90 : 75} r="25" fill="#3b82f6" />
                    <text x="400" y={scaleBalanced ? 94 : 79} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                      {weightsOnScale.reduce((a, b) => a + b, 0)} Units
                    </text>
                  </svg>

                  {scaleBalanced && (
                    <div className="p-2.5 bg-emerald-950 border border-emerald-500 rounded-xl text-center text-xs text-emerald-300 font-bold">
                      ✓ Authentic Meluhha Barter Consignment Authenticated at Lothal Dockyard!
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('pop');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-white rounded-xl text-sm disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-bold">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('pop');
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-lg"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl">
            <h3 className="text-lg font-bold text-amber-300 mb-1">Free Exploration Sandbox</h3>
            <p className="text-sm text-slate-300">
              Manipulate institutional parameters and archaeological variables without grading constraints to crystallize your intuition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Civics Sandbox: Assembly vs Council Capacity</span>
              <div className="flex justify-between text-xs text-slate-300">
                <span>MLAs in Assembly: {assemblyMembers}</span>
                <span>Max Council Ceiling: {maxCouncilStrength}</span>
              </div>
              <input
                type="range"
                min={60}
                max={500}
                value={assemblyMembers}
                onChange={(e) => setAssemblyMembers(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="p-2.5 bg-slate-900 rounded-lg text-xs text-slate-400 leading-relaxed">
                Article 170 mandates assembly membership between 60 and 500 MLAs. Article 171 caps the Council at 1/3 of the assembly.
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Archaeology Sandbox: Hydraulic Discharge</span>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Monsoon Flow: {rainfallIntensity}%</span>
                <span>Soak Pit Status: {activeSoakPit ? 'Active Filter' : 'Bypassed'}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={rainfallIntensity}
                onChange={(e) => setRainfallIntensity(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="p-2.5 bg-slate-900 rounded-lg text-xs text-slate-400 leading-relaxed">
                Harappan civil engineers prevented urban inundation by directing runoff into deep soak pits that filtered heavy sediment.
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-4 bg-gradient-to-r from-amber-600 to-indigo-600 text-white rounded-2xl font-black text-base shadow-xl"
          >
            Launch Assessment Challenges →
          </motion.button>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress Header */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400">
              <span>Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
              <span className="text-amber-400 uppercase tracking-wider">Competency: {activeChallenge.competencyLevel}</span>
            </div>
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-indigo-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 space-y-4 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 bg-indigo-950 text-indigo-300 rounded-lg font-bold border border-indigo-800 font-mono">
                {activeChallenge.nodeId}
              </span>
              <span className="text-xs px-2.5 py-1 bg-slate-900 text-slate-400 rounded-lg font-semibold uppercase">
                {activeChallenge.type}
              </span>
            </div>
            <p className="text-white text-base md:text-lg font-semibold leading-relaxed">
              {activeChallenge.question}
            </p>

            {/* Multiple Choice Options */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
              <div className="grid grid-cols-1 gap-3 pt-2">
                {activeChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Select option ${String.fromCharCode(65 + i)}`}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                      wrongFlash
                        ? 'bg-rose-900/60 border-2 border-rose-500 text-rose-200'
                        : showExplanation && i === activeChallenge.correctIndex
                        ? 'bg-emerald-900/80 border-2 border-emerald-400 text-emerald-100 shadow-md'
                        : 'bg-slate-900/90 hover:bg-slate-700/80 border border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-bold text-amber-400">{String.fromCharCode(65 + i)}.</span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Interaction */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="w-full text-xs text-slate-400 font-bold mb-1">Drag Quota Stream into its respective Drop Target:</span>
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="px-3 py-2 bg-indigo-700 text-white rounded-lg cursor-grab text-xs font-bold shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'slot_1_3a', quota: '1/3rd Quota A (Article 171)' },
                    { id: 'slot_1_3b', quota: '1/3rd Quota B (Article 171)' },
                    { id: 'slot_1_12a', quota: '1/12th Quota A (Article 171)' },
                    { id: 'slot_1_12b', quota: '1/12th Quota B (Article 171)' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 text-center min-h-[75px] flex flex-col justify-center items-center"
                    >
                      <span className="text-xs text-amber-400 font-bold mb-1">{target.quota}</span>
                      <span className="text-sm text-slate-200 font-semibold">
                        {droppedLabels[target.id] || 'Drop Electorate Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow"
                >
                  Verify Electorate Quota Mapping
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Interaction */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3 pt-2">
                <span className="text-xs text-slate-400 font-bold">Drag and re-order into correct sequential progression:</span>
                {(sortArrangement.length === activeChallenge.sortItems.length
                  ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
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
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-900 hover:bg-slate-750 border border-slate-700 rounded-xl text-slate-200 text-sm cursor-grab flex items-center gap-3 shadow"
                  >
                    <span className="w-6 h-6 flex items-center justify-center bg-slate-800 rounded-full text-xs font-bold text-amber-400">
                      {displayIndex + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow"
                >
                  Submit Sequential Order
                </motion.button>
              </div>
            )}

            {/* Numeric Interaction */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical result"
                    className="flex-1 p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-base focus:border-amber-500 outline-none"
                    aria-label="Numeric answer input"
                  />
                  <span className="text-sm font-bold text-slate-400">{activeChallenge.unit}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow"
                >
                  Verify Numerical Calculation
                </motion.button>
              </div>
            )}

            {/* Construct Interaction */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4 pt-2">
                <p className="text-xs text-amber-400 font-semibold">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-bold shadow"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>
                <div className="min-h-[60px] p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-3 py-1 bg-indigo-900 border border-indigo-600 text-white rounded-lg text-xs font-bold flex items-center gap-2">
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-200 ml-1"
                        aria-label="Remove token"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-slate-500 text-xs">Click available constitutional phrases above to construct your solution</span>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow"
                >
                  Validate Assembled Phrase
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950/80 border border-amber-600/60 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <span>📜 Constitutional & Archaeological Breakdown:</span>
                </div>
                {activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-slate-200 text-sm leading-relaxed"
                  >
                    <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="pt-2 flex justify-between items-center">
                  {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-slate-800 text-amber-300 rounded-lg text-xs font-bold border border-slate-700"
                    >
                      Show Next Point →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Assessment & View Analysis →' : 'Proceed to Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & REFLECTION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-amber-950 rounded-2xl border border-indigo-700/60 text-center space-y-3 shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-black text-white">Mastery Assessment Complete!</h2>
            <p className="text-slate-300 text-sm">
              Your overall proficiency score: <strong className="text-amber-400 text-2xl">{Math.max(0, 100 - errors * 4)}%</strong>
            </p>
            <div className="inline-block px-4 py-1.5 bg-indigo-900/80 border border-indigo-500 rounded-full text-xs font-bold text-indigo-200 uppercase tracking-wider">
              Assessed Competency Level: {masteryLevel.toUpperCase()}
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-emerald-950/60 border border-emerald-600 rounded-2xl">
            <p className="text-emerald-200 text-sm font-bold">
              {errors === 0
                ? 'PERFECT SCORE! 🌟 Outstanding mastery of state constitutional procedures and Harappan archaeology.'
                : errors <= 3
                ? 'Great work! 👏 You have demonstrated a robust analytical grasp of legislative articles and ancient urban history.'
                : errors <= 7
                ? 'Good effort! 👍 Review the key misconceptions below to solidify your full mastery.'
                : 'Do not give up — You WILL get this! 💪 Keep practicing and reviewing the constitutional and historical concepts!'}
            </p>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 border border-rose-800 rounded-2xl space-y-3 shadow-lg">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">Personalized Misconception Correction Profile:</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-bold">❌ Common Myth: {m.misconception}</p>
                      <p className="text-emerald-400 font-semibold">✓ Constitutional / Archaeological Reality: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── REFLECTION JOURNAL SECTION ─── */}
          <div className="p-6 bg-slate-800/95 border border-indigo-600/50 rounded-2xl space-y-4 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤔</span>
              <h3 className="text-base font-bold text-amber-300 uppercase tracking-wider">Metacognitive Reflection & Consolidation</h3>
            </div>
            <p className="text-xs text-slate-300">
              Deepen your neural recall by reflecting on what surprised you, articulating core distinctions in your own words, and connecting concepts to real life.
            </p>

            <div className="space-y-4 pt-2">
              {REFLECTION_PROMPTS.map((prompt, idx) => (
                <div key={idx} className="space-y-1.5 p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <label className="text-xs font-bold text-slate-200 block">
                    {idx + 1}. {prompt.question}
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionResponses[idx] || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setReflectionResponses(prev => ({ ...prev, [idx]: val }));
                    }}
                    placeholder={prompt.placeholder}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:border-amber-500 outline-none resize-none"
                  />
                  {!reflectionResponses[idx] && (
                    <button
                      onClick={() => {
                        setReflectionResponses(prev => ({ ...prev, [idx]: prompt.defaultAnswer || '' }));
                        audioManager.play('tap');
                      }}
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 underline"
                    >
                      Fill with sample insight
                    </button>
                  )}
                </div>
              ))}
            </div>

            {!reflectionSubmitted ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setReflectionSubmitted(true);
                  audioManager.play('success');
                  speechManager.speak('Reflection journal recorded! Great metacognitive synthesis.');
                }}
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-indigo-600 text-white rounded-xl font-bold text-xs shadow-lg uppercase tracking-wider"
              >
                Save My Metacognitive Reflection Journal
              </motion.button>
            ) : (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500 rounded-xl text-center text-xs text-emerald-300 font-bold">
                ✓ Reflection Journal Recorded & Linked to Your Class 9 Humanities Portfolio!
              </div>
            )}
          </div>

          {/* Spaced Repetition Notification */}
          <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 text-xs text-slate-300 flex justify-between items-center shadow">
            <span>📅 Spaced Repetition Memory Schedule (SM-2 Interval):</span>
            <strong className="text-amber-400 font-bold text-sm">
              {errors === 0 ? 'Review in 7 Days' : errors <= 3 ? 'Review in 3 Days' : 'Review Tomorrow'}
            </strong>
          </div>

          {/* Real-World Capstone Activity */}
          <div className="p-6 bg-indigo-950/40 rounded-2xl border border-indigo-800 space-y-3 shadow-lg">
            <h3 className="text-base font-bold text-amber-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-amber-400">{idx + 1}. </span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating Interactive Visual Feedback Engine */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Goal Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_HistoryCivicsMidtermElectionByelectionSim;