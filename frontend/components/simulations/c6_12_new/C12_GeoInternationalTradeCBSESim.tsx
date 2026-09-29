'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// CONSTANTS & NODE DEFINITIONS
// ==========================================

const ALL_NODE_IDS = [
  'c12_geo_cbse_253',
  'c12_geo_cbse_254',
  'c12_geo_cbse_255',
  'c12_geo_cbse_256',
  'c12_geo_cbse_257',
  'c12_geo_cbse_258',
  'c12_geo_cbse_259',
  'c12_geo_cbse_260',
  'c12_geo_cbse_261',
  'c12_geo_cbse_262',
  'c12_geo_cbse_263',
  'c12_geo_cbse_264',
  'c12_geo_cbse_265',
  'c12_geo_cbse_266',
  'c12_geo_cbse_267',
  'c12_geo_cbse_268',
  'c12_geo_cbse_269',
  'c12_geo_cbse_270',
  'c12_geo_cbse_271',
  'c12_geo_cbse_272',
  'c12_geo_cbse_273',
  'c12_geo_cbse_274',
  'c12_geo_cbse_275',
  'c12_geo_cbse_276',
  'c12_geo_cbse_277',
  'c12_geo_cbse_278',
  'c12_geo_cbse_279',
  'c12_geo_cbse_280',
  'c12_geo_cbse_281',
  'c12_geo_cbse_282',
  'c12_geo_cbse_283',
  'c12_geo_cbse_284',
  'c12_geo_cbse_285',
  'c12_geo_cbse_286',
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// MISCONCEPTIONS & DIAGNOSTIC QUESTIONS
// ==========================================

interface Misconception {
  id: string;
  title: string;
  misconception: string;
  correction: string;
  nodeId: NodeId;
}

const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_trade_1',
    title: 'Trade Balance Fallacy',
    misconception: 'A negative balance of trade (trade deficit) always indicates a weak economy.',
    correction: 'A trade deficit in developing economies like India often reflects heavy imports of capital goods, crude oil, and technology required for rapid industrial growth and infrastructure expansion.',
    nodeId: 'c12_geo_cbse_258',
  },
  {
    id: 'misc_trade_2',
    title: 'Port Function Equivalence',
    misconception: 'All major seaports serve the same functions and accept identical cargo types.',
    correction: 'Ports are highly specialized: Inland ports (e.g., Kolkata) differ from outports (e.g., Haldia); Entrepot ports act as re-export hubs (e.g., Singapore), while Packet Stations specialize in ferry and mail transport across short water bodies.',
    nodeId: 'c12_geo_cbse_286',
  },
  {
    id: 'misc_trade_3',
    title: 'Barter vs Monetary Efficiency',
    misconception: 'International trade could easily function without currency under modern barter arrangements.',
    correction: 'Barter suffers from the "double coincidence of wants" problem. Modern international trade relies on standard monetary mediums and international currency reserves to settle trade balances liquidly.',
    nodeId: 'c12_geo_cbse_257',
  },
  {
    id: 'misc_trade_4',
    title: 'Air vs Sea Freight Role',
    misconception: 'Air transport will eventually replace maritime shipping for heavy bulk trade.',
    correction: 'Air freight handles high-value, perishable, and time-sensitive cargo (gold, electronics, vaccines) but accounts for under 2% of volume due to cost, whereas maritime transport handles over 95% of international heavy bulk volume.',
    nodeId: 'c12_geo_cbse_274',
  },
  {
    id: 'misc_trade_5',
    title: 'Free Trade vs Local Industry',
    misconception: 'Unrestricted free trade and zero tariffs always benefit all domestic sectors equally.',
    correction: 'While free trade increases market efficiency and consumer choice, unprotected domestic industries in developing nations may suffer from predatory pricing, market flooding, or dumping by heavily subsidized foreign producers.',
    nodeId: 'c12_geo_cbse_277',
  },
  {
    id: 'misc_trade_6',
    title: 'WTO Mandate Scope',
    misconception: 'The WTO regulates domestic political policies and controls individual port administrative operations.',
    correction: 'The WTO sets global rules of international trade between member nations, resolves trade disputes, and promotes non-discrimination, but does not manage local port operations or municipal governance.',
    nodeId: 'c12_geo_cbse_265',
  },
];

interface DiagnosticQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  nodeId: NodeId;
}

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag_1',
    question: 'Which of the following ports is classified as an "Inland Riverine Port" in India?',
    options: ['Kandla Port', 'Kolkata Port', 'Marmagao Port', 'Visakhapatnam Port'],
    correctIndex: 1,
    explanation: 'Kolkata Port is situated on the banks of the Hugli River, approximately 128 km inland from the Bay of Bengal, making it an inland riverine port.',
    nodeId: 'c12_geo_cbse_285',
  },
  {
    id: 'diag_2',
    question: 'What is the primary factor driving international trade between nations with different climate zones?',
    options: ['Standardized exchange rates', 'Differences in natural resource base & agricultural products', 'Equal population densities', 'Uniform port facilities'],
    correctIndex: 1,
    explanation: 'Variations in climate and physical geography dictate resource availability and agricultural outputs, creating complementary trade needs across countries.',
    nodeId: 'c12_geo_cbse_269',
  },
  {
    id: 'diag_3',
    question: 'Which Indian port was constructed to relieve congestion at the Mumbai Port?',
    options: ['Jawaharlal Nehru Port (JNPT / Nhava Sheva)', 'Kandla Port', 'Paradip Port', 'Tuticorin Port'],
    correctIndex: 0,
    explanation: 'JNPT (Nhava Sheva) was developed as a modern satellite port to decongest Mumbai Port and handle large containerized traffic.',
    nodeId: 'c12_geo_cbse_272',
  },
  {
    id: 'diag_4',
    question: 'Selling goods in a foreign market at a price below their marginal cost of production is termed:',
    options: ['Bilateral Trading', 'Entrepôt Trade', 'Dumping', 'Counter-trade'],
    correctIndex: 2,
    explanation: 'Dumping is a predatory pricing practice where export prices are set below domestic production costs to undercut foreign competition.',
    nodeId: 'c12_geo_cbse_279',
  },
  {
    id: 'diag_5',
    question: 'Since independence, what shift has occurred in the composition of India’s export trade?',
    options: [
      'Shift from manufactured goods to raw food grains',
      'Shift from agricultural/traditional commodities to engineering, petroleum products, and refined items',
      'Total elimination of software exports',
      'Exclusive export of raw iron ore only'
    ],
    correctIndex: 1,
    explanation: 'India moved from exporting primary agricultural produce and raw minerals to value-added engineering goods, gems, jewelry, and refined petroleum products.',
    nodeId: 'c12_geo_cbse_260',
  },
  {
    id: 'diag_6',
    question: 'Ports that collect goods from different countries for re-exporting them are known as:',
    options: ['Packet Stations', 'Ports of Call', 'Entrepôt Ports', 'Naval Ports'],
    correctIndex: 2,
    explanation: 'Entrepôt ports (e.g., Singapore, Rotterdam) act as central warehousing and collection centers where cargo is imported for re-export.',
    nodeId: 'c12_geo_cbse_286',
  },
  {
    id: 'diag_7',
    question: 'Which organization superseded the General Agreement on Tariffs and Trade (GATT) on 1st January 1995?',
    options: ['World Bank', 'International Monetary Fund (IMF)', 'World Trade Organisation (WTO)', 'UNCTAD'],
    correctIndex: 2,
    explanation: 'The World Trade Organisation (WTO) was officially established on Jan 1, 1995, transforming GATT into a permanent international watchdog body.',
    nodeId: 'c12_geo_cbse_265',
  },
  {
    id: 'diag_8',
    question: 'What major change occurred in India’s import composition post-1991 economic reforms?',
    options: [
      'Huge increase in food grain imports',
      'Surge in POL (Petroleum, Oil & Lubricants) and capital capital goods imports',
      'Complete stoppage of foreign machinery imports',
      'Dominance of raw cotton imports over crude oil'
    ],
    correctIndex: 1,
    explanation: 'Industrial expansion post-1991 accelerated demand for crude oil (POL), electronics, machinery, and industrial inputs.',
    nodeId: 'c12_geo_cbse_264',
  },
];

// ==========================================
// SCENARIO & DISCOVERY QUESTION
// ==========================================

const SCENARIO = {
  title: 'Global Trade Command & Gateway Analytics',
  intro: 'Welcome to the Ministry of Commerce & Gateway Infrastructure Control Room. You are appointed as the Chief Logistics & Trade Policy Advisor to India.',
  context: 'Your task is to analyze sea ports, balance export-import dynamics, manage regional trade agreements, evaluate WTO policies, and optimize commodity freight traffic across maritime and air corridors.',
};

const DISCOVERY_QUESTION = {
  question: 'Why does India import crude oil, process it in domestic refineries, and then export refined petroleum products as one of its top export commodities by value?',
  options: [
    'India produces massive natural crude petroleum deposits exceeding domestic demand',
    'Refining raw crude adds high industrial value; exporting refined products yields higher revenue than domestic crude consumption alone',
    'International maritime law mandates that crude oil must be refined twice before usage',
    'Foreign ports refuse to accept raw agricultural commodities'
  ],
  correctIndex: 1,
  hintAfter: 'Refined petroleum products (petrol, diesel, aviation fuel) represent value-added industrial commodities. India leverages its world-class refining capacity (like Jamnagar) to transform imported raw crude into high-value exports!',
};

// ==========================================
// EXPLORATION LAB STEPS
// ==========================================

interface LabStep {
  title: string;
  instruction: string;
  interactionType: string;
  nodeId: NodeId;
}

const EXPLORATION_STEPS: LabStep[] = [
  {
    title: 'Lab 1: Maritime Port Gateway Explorer',
    instruction: 'Select Indian major ports (Kandla, JNPT, Cochin, Visakhapatnam, Kolkata) on the map to inspect their Hinterland, Cargo Specialization, and Port Types.',
    interactionType: 'port-map-inspector',
    nodeId: 'c12_geo_cbse_272',
  },
  {
    title: 'Lab 2: Export & Import Composition Radar',
    instruction: 'Toggle between Export and Import share sliders across eras (1950s vs 1990s vs Present) to observe the structural shift in India’s Foreign Trade composition.',
    interactionType: 'trade-composition-slider',
    nodeId: 'c12_geo_cbse_260',
  },
  {
    title: 'Lab 3: Balance of Trade & Currency Dynamics',
    instruction: 'Adjust Export Value (FOB) vs Import Value (CIF) and tariff levels to simulate trade balance deficits, surpluses, and foreign exchange reserve impacts.',
    interactionType: 'trade-balance-simulator',
    nodeId: 'c12_geo_cbse_278',
  },
  {
    title: 'Lab 4: Functional Port Classification Lab',
    instruction: 'Categorize global ports into Oil Ports, Entrepôt Ports, Packet Stations, and Naval Ports based on cargo throughput and location attributes.',
    interactionType: 'port-classification-drag',
    nodeId: 'c12_geo_cbse_286',
  },
  {
    title: 'Lab 5: WTO Policy, Dumping & Trade Bloc Network',
    instruction: 'Simulate the impact of trade liberalisation, anti-dumping duties, and membership in Regional Trade Blocs (ASEAN, EU, SAARC) on global trade volume.',
    interactionType: 'wto-bloc-simulator',
    nodeId: 'c12_geo_cbse_265',
  },
];

// ==========================================
// PREDICTION & OBSERVATION QUESTIONS
// ==========================================

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What will happen to India’s Balance of Trade if international crude oil prices surge by 40% while domestic export volume remains constant?',
    options: [
      'Balance of Trade will turn into a heavy trade surplus',
      'Trade Deficit will widen significantly because POL accounts for a huge fraction of India’s import bill',
      'Import bill will automatically drop to zero',
      'Customs tariffs will eliminate the price rise without affecting foreign exchange'
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the POL Import Price scale in Lab 3 to observe how crude oil cost spikes widen the trade deficit.',
    nodeId: 'c12_geo_cbse_258',
  },
  {
    question: 'Predict: What effect does modernizing port berth infrastructure and private container terminal PPPs have on ship turn-around time?',
    options: [
      'Turn-around time increases due to security checks',
      'Turn-around time drops drastically, lowering freight costs and boosting port competitiveness',
      'Cargo storage capacities drop by 50%',
      'Ships are forced to divert to riverine inland ports'
    ],
    correctIndex: 1,
    verifyInstruction: 'Select JNPT in Lab 1 and activate private PPP terminals to see reduced turn-around time indicators.',
    nodeId: 'c12_geo_cbse_276',
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: In Lab 1, why is Kandla Port (Deendayal Port) classified as a Tidal Port developed post-independence?',
    observableOptions: [
      'Because it was built to compensate for the loss of Karachi Port to Pakistan after partition',
      'Because it is located inside a freshwater lake',
      'Because it only receives passenger ocean liners',
      'Because it handles zero petroleum cargo'
    ],
    correctIndex: 0,
    nodeId: 'c12_geo_cbse_272',
  },
  {
    question: 'Observation: In Lab 4, what distinguishes an Entrepôt Port like Singapore or Rotterdam from a specialized Oil Port like Abadan?',
    observableOptions: [
      'Entrepôt ports focus exclusively on catching marine fish',
      'Entrepôt ports collect and store goods from foreign nations for re-exporting, whereas Oil Ports specialize in crude tanker handling and refining shipment',
      'Oil ports do not have deep-water anchorages',
      'Entrepôt ports do not permit ocean-going ships'
    ],
    correctIndex: 1,
    nodeId: 'c12_geo_cbse_286',
  },
];

// ==========================================
// REAL WORLD EXTENSION ACTIVITY
// ==========================================

const REAL_WORLD_ACTIVITY = {
  title: 'Port Logistics & Trade Advisory Mission: Sagarmala & Gati Shakti',
  description: 'As Chief Infrastructure Analyst for India’s Maritime Vision, evaluate the modern container throughput at JNPT (Nhava Sheva) and design a multi-modal logistics corridor connecting the port to inland dry ports (ICDs) in North India.',
  steps: [
    'Step 1: Calculate annual container throughput capacity in TEUs (Twenty-Foot Equivalent Units) at JNPT Port.',
    'Step 2: Determine freight split: 70% by Dedicated Freight Corridor (DFC) rail vs 30% by highway trucking.',
    'Step 3: Analyze logistics cost reductions achieved by transitioning from traditional break-bulk cargo handling to mechanized containerized handling.',
    'Step 4: Formulate a policy recommendation for anti-dumping safeguards and customs automation to streamline trade velocity.',
  ],
};

// ==========================================
// CHALLENGES (23 ITEMS: 7 FOUNDATION, 8 STANDARD, 8 ADVANCED)
// ==========================================

interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'mcq' | 'matching' | 'numeric' | 'drag-sort';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // FOUNDATION (7)
  {
    id: 'ch_1',
    nodeId: 'c12_geo_cbse_253',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which of the following defines international trade?',
    options: [
      'Buying and selling of goods within the boundaries of a single state',
      'Exchange of goods and services across international boundaries between nations',
      'Local weekly haat transactions in rural sectors',
      'Barter exchange between neighbor villages'
    ],
    correctIndex: 1,
    explanation: 'International trade refers to the exchange of commodities, services, and capital across sovereign national borders.',
    hints: [
      'Think about cross-border commerce.',
      'It involves two or more different countries.',
      'Sovereign international boundaries mark this scale of trade.'
    ],
  },
  {
    id: 'ch_2',
    nodeId: 'c12_geo_cbse_257',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'What was the primary limitation of the Barter System prior to monetary currency?',
    options: [
      'Lack of sea ports',
      'Requirement of double coincidence of wants',
      'High bank transaction fees',
      'Excessive digital trade regulations'
    ],
    correctIndex: 1,
    explanation: 'The Barter system requires a double coincidence of wants—each party must desire exactly what the other party is willing to trade.',
    hints: [
      'What happens if you have wheat but want salt, and the salt seller wants silk?',
      'Both parties must mutually desire each other goods.',
      'This is called double coincidence of wants.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_3',
    nodeId: 'c12_geo_cbse_270',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Why are sea ports called the "Gateways of International Trade"?',
    options: [
      'Because all international trade is conducted exclusively through air routes',
      'Because ports provide facilities for cargo handling, docking, storage, and transfer between ocean liners and inland transport',
      'Because ports are located only along inland river banks',
      'Because ports operate without customs officials'
    ],
    correctIndex: 1,
    explanation: 'Seaports connect maritime transport routes with land transport networks, facilitating over 90% of global physical cargo volumes.',
    hints: [
      'They act as nodal hubs connecting sea and land.',
      'They store, unload, and clear ship cargo.',
      'Hence they serve as gateways.'
    ],
  },
  {
    id: 'ch_4',
    nodeId: 'c12_geo_cbse_272',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which major port on the east coast of India is a landlocked, protected harbor?',
    options: ['Kolkata', 'Visakhapatnam', 'Chennai', 'Paradip'],
    correctIndex: 1,
    explanation: 'Visakhapatnam Port is a landlocked harbor connected to the open sea by a channel cut through solid rock and sand.',
    hints: [
      'Located in Andhra Pradesh.',
      'Known for its Dolphin Nose hill landmark and deep natural harbor.',
      'It is Visakhapatnam.'
    ],
  },
  {
    id: 'ch_5',
    nodeId: 'c12_geo_cbse_285',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which of the following ports is classified as an Inland Port?',
    options: ['Mumbai Port', 'Kolkata Port', 'Marmagao Port', 'Cochin Port'],
    correctIndex: 1,
    explanation: 'Kolkata Port is situated 128 km inland on the Hugli River, requiring river dredgers to maintain navigable depths.',
    hints: [
      'Located along the Hugli river.',
      'Away from the open coast line.',
      'Kolkata is India’s major inland riverine port.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_6',
    nodeId: 'c12_geo_cbse_265',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Where is the headquarters of the World Trade Organisation (WTO) located?',
    options: ['New York, USA', 'Geneva, Switzerland', 'Paris, France', 'London, UK'],
    correctIndex: 1,
    explanation: 'The WTO was established in 1995 with its headquarters located in Geneva, Switzerland.',
    hints: [
      'European neutral country.',
      'Home to many UN agencies.',
      'Geneva, Switzerland.'
    ],
  },
  {
    id: 'ch_7',
    nodeId: 'c12_geo_cbse_280',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'What is the key difference between Bilateral Trade and Multilateral Trade?',
    options: [
      'Bilateral involves trade between two countries, whereas Multilateral involves trade among many nations',
      'Bilateral is free trade, Multilateral is illegal trade',
      'Bilateral only uses air transport, Multilateral uses rail',
      'Bilateral applies only to food items'
    ],
    correctIndex: 0,
    explanation: 'Bilateral trade agreement is signed between two sovereign nations; multilateral agreements involve multiple countries simultaneously under unified trade rules.',
    hints: [
      '"Bi" means two.',
      '"Multi" means many.',
      'It refers to the number of trading partner countries involved.'
    ],
  },

  // STANDARD (8)
  {
    id: 'ch_8',
    nodeId: 'c12_geo_cbse_258',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'If Country A exports goods worth $120 Billion and imports goods worth $175 Billion, what is its Balance of Trade status?',
    options: [
      'Trade Surplus of $55 Billion',
      'Trade Deficit of $55 Billion',
      'Balanced Trade',
      'Zero Net Foreign Reserve'
    ],
    correctIndex: 1,
    explanation: 'Balance of Trade = Exports - Imports = $120B - $175B = -$55B (a Trade Deficit of $55 Billion).',
    hints: [
      'Subtract total import value from total export value.',
      '120 - 175 = -55.',
      'Negative value signifies a trade deficit.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_9',
    nodeId: 'c12_geo_cbse_260',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'How has the share of traditional agricultural exports in India changed relative to engineering & manufactured goods over recent decades?',
    options: [
      'Agricultural share increased while manufactured goods share dropped',
      'Agricultural share declined percentage-wise as manufactured & refined petroleum goods share increased',
      'Both sectors declined to zero',
      'Agricultural commodities became 99% of exports'
    ],
    correctIndex: 1,
    explanation: 'India’s export basket expanded into higher value-added goods, reducing the percentage share of raw agricultural exports while expanding engineering, software, and refined oil exports.',
    hints: [
      'India industrialized post-independence.',
      'Value addition shifted exports toward machinery and refined items.',
      'Primary agriculture percentage share decreased.'
    ],
  },
  {
    id: 'ch_10',
    nodeId: 'c12_geo_cbse_272',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Which Indian port specializes in iron ore exports from the Goa mining region?',
    options: ['Kandla', 'Marmagao', 'Paradip', 'Kochi'],
    correctIndex: 1,
    explanation: 'Marmagao Port in Goa is India’s leading port for iron ore export, equipped with high-speed mechanized ore-handling plants.',
    hints: [
      'Located on the west coast in Goa.',
      'Handles rich iron ore deposits from Kudremukh and Goa hinterland.',
      'Marmagao.'
    ],
  },
  {
    id: 'ch_11',
    nodeId: 'c12_geo_cbse_274',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why is air transport reserved primarily for specific commodity categories in international trade?',
    options: [
      'Air transport is cheaper per ton-km than ocean transport',
      'Air transport caters to high-value, light-weight, perishable, and time-critical items due to high freight costs',
      'Ships cannot cross oceans during winter',
      'Air cargo carries 98% of world iron ore traffic'
    ],
    correctIndex: 1,
    explanation: 'High operational costs limit air freight to high-value (diamonds, gold), perishable (flowers, fresh seafood), and urgent cargo (pharmaceuticals, microchips).',
    hints: [
      'Consider high fuel and freight costs of aircraft.',
      'Only high-value or highly urgent goods justify the expense.',
      'High value, low weight, or perishable goods.'
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_12',
    nodeId: 'c12_geo_cbse_279',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'What is the main danger of "Dumping" in international trade?',
    options: [
      'It increases international cooperation',
      'It can ruin domestic producers in the importing nation by flooding markets with artificially low-priced goods',
      'It raises port handling tariffs for all ships',
      'It eliminates foreign exchange reserves'
    ],
    correctIndex: 1,
    explanation: 'Dumping forces local producers out of business by underselling domestic market prices, creating a monopoly for foreign exporters.',
    hints: [
      'Unfair low pricing undercuts local manufacturers.',
      'Domestic industries cannot compete with below-cost prices.',
      'It undermines domestic production capacity.'
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_13',
    nodeId: 'c12_geo_cbse_282',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Which of the following is an example of a Regional Trade Bloc created to foster intra-regional economic cooperation?',
    options: ['ASEAN', 'UNESCO', 'WHO', 'INTERPOL'],
    correctIndex: 0,
    explanation: 'ASEAN (Association of Southeast Asian Nations) is a regional trade bloc formed to promote economic growth and regional trade integration.',
    hints: [
      'Look for an economic association of Southeast Asian nations.',
      'UNESCO and WHO are specialized UN social/health bodies.',
      'ASEAN is the regional economic trade bloc.'
    ],
  },
  {
    id: 'ch_14',
    nodeId: 'c12_geo_cbse_286',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'What characterizes a "Packet Station" port?',
    options: [
      'It handles bulk crude oil imports exclusively',
      'It is concerned with launching naval worships',
      'It is involved in transporting passengers and mail across short sea routes',
      'It stores food grain for emergency relief'
    ],
    correctIndex: 2,
    explanation: 'Packet Stations (Ferry Ports) specialize in moving passengers, mail, and vehicles across narrow water channels (e.g., Dover and Calais across the English Channel).',
    hints: [
      'Also known as ferry ports.',
      'Short distance sea routes.',
      'Passengers and postal mail packets.'
    ],
  },
  {
    id: 'ch_15',
    nodeId: 'c12_geo_cbse_276',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'What is a key objective of Port Modernization and Private Sector Participation (PPP) in India?',
    options: [
      'Replacing container ships with wooden dhows',
      'Lowering ship turn-around times, increasing berth depth, and modernizing container handling equipment',
      'Banning foreign vessels from Indian ports',
      'Restricting ports to fishing activities only'
    ],
    correctIndex: 1,
    explanation: 'PPP investments introduce modern gantry cranes, automated container terminals, and deeper berths to speed up ship turnaround and reduce logistics costs.',
    hints: [
      'Private capital boosts operational efficiency.',
      'Focuses on speed of loading/unloading.',
      'Lowering turn-around time and expanding capacity.'
    ],
  },

  // ADVANCED (8)
  {
    id: 'ch_16',
    nodeId: 'c12_geo_cbse_267',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'According to economic trade principles, why do countries trade even when one nation can produce all goods more efficiently than another?',
    options: [
      'Absolute monopoly rules prohibit self-sufficiency',
      'Comparative Advantage principle: nations specialize in goods where their opportunity cost of production is lowest',
      'WTO forces equal production quotas on all member states',
      'Ocean freight is completely cost-free'
    ],
    correctIndex: 1,
    explanation: 'David Ricardo’s Principle of Comparative Advantage proves that trade is mutually beneficial when countries specialize in products where they possess relative efficiency.',
    hints: [
      'Think about opportunity costs.',
      'Even if a country is better at everything, it gains by focusing on what it does best relative to others.',
      'Comparative Advantage principle.'
    ],
  },
  {
    id: 'ch_17',
    nodeId: 'c12_geo_cbse_283',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Which of the following represents a major criticism of the World Trade Organisation (WTO) by developing countries?',
    options: [
      'WTO promotes equal distribution of wealth to all citizens',
      'Developing countries argue WTO policies favor developed nations by pushing open markets in developing countries while developed nations retain agricultural subsidies',
      'WTO forbids maritime container shipping',
      'WTO refuses to allow any Asian nations to join'
    ],
    correctIndex: 1,
    explanation: 'Developing nations criticize the WTO for asymmetrical rules: wealthy nations maintain farm subsidies while pressuring developing countries to lower tariffs on manufactured goods.',
    hints: [
      'Focus on agricultural subsidies in wealthy nations.',
      'Consider tariff reduction pressure on developing markets.',
      'Asymmetry between rich and developing nation interests.'
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_18',
    nodeId: 'c12_geo_cbse_266',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'How has the geographical direction of India’s foreign trade shifted over the last three decades?',
    options: [
      'Shifted from traditional reliance on Western Europe/USA toward expanded trade with Asian regions (East Asia, ASEAN, West Asia)',
      'Shifted exclusively to South American landlocked nations',
      '100% trade is now restricted to neighboring island nations',
      'Trade with all foreign countries has been completely phased out'
    ],
    correctIndex: 0,
    explanation: 'India’s trade direction expanded beyond traditional European and UK corridors to strong partnerships across East Asia, Southeast Asia (ASEAN), and West Asia (GCC crude suppliers).',
    hints: [
      'Look East Policy and West Asia trade connections.',
      'Asia now accounts for a large fraction of India export/import volume.',
      'Diversification toward Asian and Middle Eastern partners.'
    ],
  },
  {
    id: 'ch_19',
    nodeId: 'c12_geo_cbse_269',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'How do Resource-Based Factors (geology, climate, soil) determine international trade flows?',
    options: [
      'Resource factors have zero impact because technology synthesizes everything',
      'Uneven natural distribution of minerals, fossil fuels, and agricultural climate zones creates natural trade complementarity between nations',
      'Resource differences cause all countries to import the same goods',
      'Geology only affects inland river transport'
    ],
    correctIndex: 1,
    explanation: 'Geological deposits (mineral ores in Brazil/Australia, oil in West Asia) and agro-climatic zones (tea in India, wheat in North America) force nations to trade for resources they lack.',
    hints: [
      'Why does West Asia export crude oil?',
      'Why does Brazil export coffee?',
      'Geographical resource endowments create natural supply and demand differences.'
    ],
  },
  {
    id: 'ch_20',
    nodeId: 'c12_geo_cbse_277',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'What is a potential negative consequence of sudden, unrestricted Trade Liberalisation for infant domestic industries?',
    options: [
      'Domestic industries double their market prices immediately',
      'Infant domestic industries may be overwhelmed by cheap foreign imports and fail before achieving scale',
      'Foreign exchange reserves multiply automatically',
      'Ports stop charging docking fees'
    ],
    correctIndex: 1,
    explanation: 'Without protection (tariffs/quotas), newly emerging infant industries in developing countries can be wiped out by competition from established foreign multinational corporations.',
    hints: [
      'Infant industry argument.',
      'Unprotected young domestic businesses lack economies of scale.',
      'Flooding of markets by cheap imported goods can crush local businesses.'
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_21',
    nodeId: 'c12_geo_cbse_273',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'How does the Stage of Economic Development affect a country’s trade pattern?',
    options: [
      'Developed nations export raw minerals and import high-tech machinery',
      'Developing nations export raw materials/primary goods and import capital equipment, while advanced industrial nations export high-tech, manufactured goods and capital services',
      'Economic stage has no relationship with trade items',
      'Underdeveloped nations export only commercial airliners'
    ],
    correctIndex: 1,
    explanation: 'Industrial development transforms trade composition: primary resource exporters shift to manufacturing and high-tech capital services as industrial capacity matures.',
    hints: [
      'Compare agrarian economies vs industrial powerhouses.',
      'Primary goods vs value-added goods.',
      'Industrial stage determines whether exports are raw materials or complex machinery.'
    ],
  },
  {
    id: 'ch_22',
    nodeId: 'c12_geo_cbse_284',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'What infrastructural requirement is essential for a seaport to function efficiently as an international gateway?',
    options: [
      'Deep draft harbor, hinterland rail/road connectivity, container terminals, and efficient customs clearance',
      'Only passenger ferry berths',
      'Exclusively freshwater docks',
      'Zero connection to land transport'
    ],
    correctIndex: 0,
    explanation: 'Effective gateway ports require deep water draft for ocean container ships, modern quay cranes, efficient ICD dry port links, and fast customs automation.',
    hints: [
      'Think about what a big ship needs when docking.',
      'Depth of water, crane infrastructure, land road/rail link.',
      'Deep draft + hinterland connectivity + container facilities.'
    ],
  },
  {
    id: 'ch_23',
    nodeId: 'c12_geo_cbse_263',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'How did the World Wars impact the evolution of global international trade organization structures?',
    options: [
      'World Wars eliminated all international trade permanently',
      'Disruptions, protectionism, and economic collapses during the World Wars led to post-war Bretton Woods conferences creating GATT and IMF to stabilize global commerce',
      'World Wars led to universal barter trade agreements',
      'No new organizations were formed post-World War II'
    ],
    correctIndex: 1,
    explanation: 'Post-WWII economic dislocation highlighted the danger of protectionist trade wars, prompting global agreements like GATT (1947), which paved the way for the WTO in 1995.',
    hints: [
      'Think Bretton Woods Agreement.',
      'GATT was created in 1947 post-WWII.',
      'Created stable rules to rebuild international trade.'
    ],
  },
];

// ==========================================
// CUSTOM SVG DIAGRAM COMPONENTS
// ==========================================

// 1. Interactive Port & Trade Corridor Map SVG
interface IndianPort {
  id: string;
  name: string;
  cx: number;
  cy: number;
  type: string;
  cargo: string;
  coast: 'west' | 'east';
  hinterland: string;
}

const INDIAN_PORTS: IndianPort[] = [
  { id: 'kandla', name: 'Kandla (Deendayal)', cx: 140, cy: 220, type: 'Tidal / Hub', cargo: 'Crude Oil, Food Grains, Salt', coast: 'west', hinterland: 'Gujarat, RJ, PB, HR' },
  { id: 'mumbai', name: 'Mumbai Port', cx: 165, cy: 330, type: 'Natural Harbor', cargo: 'General Cargo, POL, Machinery', coast: 'west', hinterland: 'MH, MP, North India' },
  { id: 'jnpt', name: 'JNPT (Nhava Sheva)', cx: 175, cy: 345, type: 'Container Satellite', cargo: 'Containerized Goods, High Value', coast: 'west', hinterland: 'Pan-India ICD network' },
  { id: 'marmagao', name: 'Marmagao', cx: 185, cy: 430, type: 'Natural Harbor', cargo: 'Iron Ore Exports', coast: 'west', hinterland: 'Goa, Karnataka' },
  { id: 'mangalore', name: 'New Mangalore', cx: 200, cy: 490, type: 'Deep Water', cargo: 'Iron Ore Concentrates, Petroleum', coast: 'west', hinterland: 'Karnataka' },
  { id: 'cochin', name: 'Cochin', cx: 220, cy: 550, type: 'Natural Lagoon', cargo: 'Oil Refineries, Spices, Containers', coast: 'west', hinterland: 'Kerala, SW Tamil Nadu' },
  { id: 'tuticorin', name: 'V.O.C. (Tuticorin)', cx: 270, cy: 565, type: 'Artificial Deep Sea', cargo: 'Coal, Salt, Fertilizer, Containers', coast: 'east', hinterland: 'Southern Tamil Nadu' },
  { id: 'chennai', name: 'Chennai Port', cx: 290, cy: 470, type: 'Artificial Harbor', cargo: 'Automobiles, Leather, Containers', coast: 'east', hinterland: 'TN, AP, Karnataka' },
  { id: 'vizag', name: 'Visakhapatnam', cx: 330, cy: 380, type: 'Landlocked Harbor', cargo: 'Iron Ore, Petroleum, Heavy Cargo', coast: 'east', hinterland: 'AP, Telangana, CG, Odisha' },
  { id: 'paradip', name: 'Paradip Port', cx: 370, cy: 320, type: 'Deep Lagoon', cargo: 'Iron Ore, Coal, Dry Bulk', coast: 'east', hinterland: 'Odisha, Jharkhand, CG' },
  { id: 'kolkata', name: 'Kolkata & Haldia', cx: 410, cy: 260, type: 'Inland Riverine / Dock', cargo: 'Jute, Tea, Heavy Equipment, Mineral Coal', coast: 'east', hinterland: 'WB, Bihar, NE States, Nepal/Bhutan' },
];

const IndiaTradeMapSVG: React.FC<{
  selectedPort: IndianPort;
  onSelectPort: (port: IndianPort) => void;
  showRoutes: boolean;
}> = ({ selectedPort, onSelectPort, showRoutes }) => {
  return (
    <svg viewBox="0 0 550 620" className="w-full h-auto bg-slate-900 rounded-xl shadow-2xl border border-slate-800">
      <defs>
        <radialGradient id="oceanGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Ocean Background */}
      <rect width="550" height="620" fill="url(#oceanGrad)" />

      {/* Grid lines */}
      <g stroke="#1e293b" strokeWidth="0.5" strokeDasharray="4,4">
        {[100, 200, 300, 400, 500].map((y) => (
          <line key={`h-${y}`} x1="0" y1={y} x2="550" y2={y} />
        ))}
        {[100, 200, 300, 400, 500].map((x) => (
          <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="620" />
        ))}
      </g>

      {/* Simplified India Peninsula Outline */}
      <path
        d="M 120 120 
           L 180 160 
           L 150 200 
           L 130 220 
           L 155 310 
           L 175 420 
           L 210 520 
           L 250 580 
           L 280 570 
           L 300 480 
           L 340 370 
           L 380 300 
           L 440 240 
           L 430 180 
           L 350 140 
           Z"
        fill="#1e293b"
        stroke="#334155"
        strokeWidth="2"
      />
      <text x="240" y="320" fill="#475569" fontSize="24" fontWeight="bold" opacity="0.4">
        INDIA
      </text>

      {/* Ocean Route Paths */}
      {showRoutes && (
        <g stroke="url(#routeGrad)" strokeWidth="2" strokeDasharray="6,4">
          {/* Suez / West Asia Route */}
          <path d="M 20 250 Q 80 240 140 220" />
          <path d="M 10 360 Q 90 350 165 330" />
          <path d="M 20 540 Q 100 550 220 550" />
          {/* Malacca Strait / Far East Route */}
          <path d="M 530 520 Q 420 500 290 470" />
          <path d="M 530 400 Q 450 340 370 320" />
          <path d="M 520 310 Q 470 280 410 260" />
        </g>
      )}

      {/* Hinterland Connections for Selected Port */}
      {selectedPort && (
        <g stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="2,2" opacity="0.7">
          <line x1={selectedPort.cx} y1={selectedPort.cy} x2={250} y2={300} />
          <circle cx="250" cy="300" r="4" fill="#64748b" />
          <text x="260" y="305" fill="#94a3b8" fontSize="10">Dry Port Inland Container Depot (ICD)</text>
        </g>
      )}

      {/* Render Major Ports */}
      {INDIAN_PORTS.map((port) => {
        const isSelected = selectedPort.id === port.id;
        return (
          <g
            key={port.id}
            onClick={() => onSelectPort(port)}
            className="cursor-pointer transition-all duration-300"
          >
            {/* Ripple outer ring for selected */}
            {isSelected && (
              <circle
                cx={port.cx}
                cy={port.cy}
                r="16"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
                className="animate-ping opacity-75"
              />
            )}
            {/* Port Anchor Pin */}
            <circle
              cx={port.cx}
              cy={port.cy}
              r={isSelected ? 10 : 6}
              fill={isSelected ? '#38bdf8' : port.coast === 'west' ? '#0ea5e9' : '#6366f1'}
              stroke="#ffffff"
              strokeWidth={isSelected ? 3 : 1.5}
              filter={isSelected ? 'url(#glow)' : undefined}
            />
            {/* Port Name Label */}
            <text
              x={port.cx + (port.coast === 'west' ? -12 : 12)}
              y={port.cy + 4}
              textAnchor={port.coast === 'west' ? 'end' : 'start'}
              fill={isSelected ? '#38bdf8' : '#cbd5e1'}
              fontSize={isSelected ? '12' : '10'}
              fontWeight={isSelected ? 'bold' : 'normal'}
            >
              {port.name}
            </text>
          </g>
        );
      })}

      {/* Compass Legend */}
      <g transform="translate(470, 60)">
        <circle cx="0" cy="0" r="22" fill="#0f172a" stroke="#334155" strokeWidth="2" />
        <path d="M 0 -16 L 5 0 L 0 -4 L -5 0 Z" fill="#ef4444" />
        <path d="M 0 16 L 5 0 L 0 4 L -5 0 Z" fill="#94a3b8" />
        <text x="0" y="-22" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">N</text>
      </g>
    </svg>
  );
};

// 2. Export-Import Trade Balance & Composition SVG
const TradeBalanceAndCompositionSVG: React.FC<{
  exportsVal: number;
  importsVal: number;
  selectedEra: '1950s' | '1990s' | 'present';
}> = ({ exportsVal, importsVal, selectedEra }) => {
  const balance = exportsVal - importsVal;
  const isDeficit = balance < 0;

  // Commodity shares depending on era
  const compositionData = useMemo(() => {
    if (selectedEra === '1950s') {
      return {
        exports: [
          { name: 'Tea & Spices', share: 35, color: '#10b981' },
          { name: 'Jute & Textiles', share: 30, color: '#f59e0b' },
          { name: 'Raw Minerals', share: 20, color: '#8b5cf6' },
          { name: 'Others', share: 15, color: '#64748b' },
        ],
        imports: [
          { name: 'Food Grains', share: 45, color: '#ef4444' },
          { name: 'Machinery', share: 30, color: '#3b82f6' },
          { name: 'Manufactured Goods', share: 25, color: '#ec4899' },
        ],
      };
    } else if (selectedEra === '1990s') {
      return {
        exports: [
          { name: 'Gems & Jewelry', share: 25, color: '#fbbf24' },
          { name: 'Readymade Garments', share: 22, color: '#ec4899' },
          { name: 'Engineering Goods', share: 28, color: '#3b82f6' },
          { name: 'Agri Products', share: 25, color: '#10b981' },
        ],
        imports: [
          { name: 'Crude Oil (POL)', share: 35, color: '#f97316' },
          { name: 'Capital Goods/Machinery', share: 30, color: '#3b82f6' },
          { name: 'Chemicals & Fertilizers', share: 20, color: '#a855f7' },
          { name: 'Uncut Precious Metals', share: 15, color: '#eab308' },
        ],
      };
    } else {
      // Present
      return {
        exports: [
          { name: 'Engineering Goods', share: 26, color: '#3b82f6' },
          { name: 'Refined Petroleum Products', share: 21, color: '#f97316' },
          { name: 'Gems & Jewelry', share: 16, color: '#eab308' },
          { name: 'Chemicals & Pharma', share: 15, color: '#a855f7' },
          { name: 'Agri Commodities', share: 12, color: '#10b981' },
          { name: 'Others', share: 10, color: '#64748b' },
        ],
        imports: [
          { name: 'Crude Petroleum (POL)', share: 31, color: '#ef4444' },
          { name: 'Electronics & Telecom', share: 18, color: '#06b6d4' },
          { name: 'Gold & Precious Metals', share: 14, color: '#eab308' },
          { name: 'Machinery & Heavy Goods', share: 15, color: '#3b82f6' },
          { name: 'Organic Chemicals', share: 12, color: '#8b5cf6' },
          { name: 'Others', share: 10, color: '#64748b' },
        ],
      };
    }
  }, [selectedEra]);

  return (
    <svg viewBox="0 0 600 380" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-800 p-2">
      <text x="300" y="30" textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="bold">
        India Foreign Trade Dynamics & Composition ({selectedEra.toUpperCase()})
      </text>

      {/* Balance Fulcrum Visualizer */}
      <g transform="translate(300, 110)">
        {/* Baseline Beam angle based on balance */}
        {/* Tilt range: -15deg (deficit) to +15deg (surplus) */}
        {(() => {
          const tiltDeg = Math.max(-18, Math.min(18, (exportsVal - importsVal) / 8));
          return (
            <g transform={`rotate(${tiltDeg})`} className="transition-transform duration-500">
              {/* Beam */}
              <line x1="-180" y1="0" x2="180" y2="0" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
              {/* Left Pan: Exports */}
              <g transform="translate(-160, 0)">
                <line x1="0" y1="0" x2="0" y2="35" stroke="#64748b" strokeWidth="2" />
                <path d="M -40 35 Q 0 55 40 35 Z" fill="#10b981" />
                <text x="0" y="30" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                  Exports: ${exportsVal}B
                </text>
              </g>
              {/* Right Pan: Imports */}
              <g transform="translate(160, 0)">
                <line x1="0" y1="0" x2="0" y2="35" stroke="#64748b" strokeWidth="2" />
                <path d="M -40 35 Q 0 55 40 35 Z" fill="#ef4444" />
                <text x="0" y="30" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                  Imports: ${importsVal}B
                </text>
              </g>
            </g>
          );
        })()}

        {/* Fulcrum Stand */}
        <polygon points="300,110 285,145 315,145" fill="#475569" transform="translate(-300, -110)" />
        <rect x="-40" y="38" width="80" height="20" rx="4" fill={isDeficit ? '#7f1d1d' : '#14532d'} />
        <text x="0" y="52" textAnchor="middle" fill={isDeficit ? '#fca5a5' : '#86efac'} fontSize="11" fontWeight="bold">
          {isDeficit ? `DEFICIT -$${Math.abs(balance)}B` : `SURPLUS +$${balance}B`}
        </text>
      </g>

      {/* Export & Import Composition Bar breakdown */}
      <g transform="translate(40, 200)">
        <text x="0" y="0" fill="#38bdf8" fontSize="13" fontWeight="bold">Export Basket Breakdown</text>
        <g transform="translate(0, 12)">
          {(() => {
            let currentX = 0;
            return compositionData.exports.map((item) => {
              const width = (item.share / 100) * 240;
              const posX = currentX;
              currentX += width;
              return (
                <g key={item.name}>
                  <rect x={posX} y="0" width={width} height="22" fill={item.color} rx="2" />
                  {width > 30 && (
                    <text x={posX + width / 2} y="15" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                      {item.share}%
                    </text>
                  )}
                </g>
              );
            });
          })()}
        </g>
        {/* Export Legend */}
        <g transform="translate(0, 48)">
          {compositionData.exports.map((item, i) => (
            <g key={item.name} transform={`translate(${(i % 2) * 130}, ${Math.floor(i / 2) * 18})`}>
              <rect width="10" height="10" fill={item.color} rx="2" />
              <text x="14" y="9" fill="#94a3b8" fontSize="10">{item.name} ({item.share}%)</text>
            </g>
          ))}
        </g>
      </g>

      <g transform="translate(320, 200)">
        <text x="0" y="0" fill="#f43f5e" fontSize="13" fontWeight="bold">Import Basket Breakdown</text>
        <g transform="translate(0, 12)">
          {(() => {
            let currentX = 0;
            return compositionData.imports.map((item) => {
              const width = (item.share / 100) * 240;
              const posX = currentX;
              currentX += width;
              return (
                <g key={item.name}>
                  <rect x={posX} y="0" width={width} height="22" fill={item.color} rx="2" />
                  {width > 30 && (
                    <text x={posX + width / 2} y="15" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                      {item.share}%
                    </text>
                  )}
                </g>
              );
            });
          })()}
        </g>
        {/* Import Legend */}
        <g transform="translate(0, 48)">
          {compositionData.imports.map((item, i) => (
            <g key={item.name} transform={`translate(${(i % 2) * 130}, ${Math.floor(i / 2) * 18})`}>
              <rect width="10" height="10" fill={item.color} rx="2" />
              <text x="14" y="9" fill="#94a3b8" fontSize="10">{item.name} ({item.share}%)</text>
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
};

// 3. Port Functional Classification SVG
const PortClassificationSVG: React.FC<{
  activeType: string;
  onSelectType: (type: string) => void;
}> = ({ activeType, onSelectType }) => {
  const portCategories = [
    {
      type: 'entrepot',
      title: 'Entrepôt Ports',
      desc: 'Collection hubs where goods from foreign nations are imported and stored for re-export (e.g., Singapore, Rotterdam).',
      icon: '🏬',
    },
    {
      type: 'oil',
      title: 'Oil Ports (Tanker Terminals)',
      desc: 'Specialized in bulk crude oil refining, storage, and tanker loading (e.g., Abadan, Tripoli, Vadinar).',
      icon: '🛢️',
    },
    {
      type: 'packet',
      title: 'Packet Stations (Ferry Ports)',
      desc: 'Engaged in transporting passengers, vehicles, and mail across short water corridors (e.g., Dover, Calais).',
      icon: '🚢',
    },
    {
      type: 'naval',
      title: 'Naval Ports',
      desc: 'Strategic military ports serving warships, repair docks, and naval bases (e.g., Kochi, Karwar, Portsmouth).',
      icon: '⚓',
    },
    {
      type: 'inland',
      title: 'Inland Riverine Ports',
      desc: 'Situated deep inland along navigable rivers/canals, connected to ocean by river channels (e.g., Kolkata, Montreal).',
      icon: '🌊',
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
      <h3 className="text-lg font-bold text-gold-400 mb-3 text-center">
        Classification of Ports by Location & Function
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
        {portCategories.map((cat) => {
          const isSelected = activeType === cat.type;
          return (
            <button
              key={cat.type}
              onClick={() => onSelectType(cat.type)}
              className={`p-3 rounded-lg border text-center transition-all ${
                isSelected
                  ? 'bg-gold-600 border-gold-400 text-white shadow-lg'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
              }`}
            >
              <div className="text-2xl mb-1">{cat.icon}</div>
              <div className="text-xs font-semibold leading-tight">{cat.title}</div>
            </button>
          );
        })}
      </div>

      {/* Interactive Port Architectural Diagram */}
      <svg viewBox="0 0 600 220" className="w-full h-auto bg-slate-950 rounded-lg stroke-slate-700">
        {/* Water background */}
        <rect width="600" height="150" y="70" fill="#0c4a6e" />
        <rect width="600" height="70" y="0" fill="#1e293b" />
        <line x1="0" y1="70" x2="600" y2="70" stroke="#0284c7" strokeWidth="3" />

        {activeType === 'entrepot' && (
          <g>
            {/* Warehouses */}
            <rect x="80" y="20" width="70" height="48" fill="#3b82f6" rx="4" />
            <rect x="170" y="20" width="70" height="48" fill="#3b82f6" rx="4" />
            <rect x="260" y="20" width="70" height="48" fill="#3b82f6" rx="4" />
            <text x="205" y="45" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
              Custom Free Trade Bonded Warehouses
            </text>
            {/* Cargo ships re-exporting */}
            <path d="M 100 110 L 190 110 L 170 140 L 120 140 Z" fill="#475569" stroke="#94a3b8" />
            <rect x="120" y="90" width="40" height="20" fill="#f59e0b" />
            <text x="140" y="104" fill="#ffffff" fontSize="9" textAnchor="middle">INBOUND</text>

            <path d="M 380 110 L 470 110 L 450 140 L 400 140 Z" fill="#475569" stroke="#94a3b8" />
            <rect x="400" y="90" width="40" height="20" fill="#10b981" />
            <text x="420" y="104" fill="#ffffff" fontSize="9" textAnchor="middle">RE-EXPORT</text>

            <path d="M 180 110 Q 290 80 390 110" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4,4" fill="none" />
          </g>
        )}

        {activeType === 'oil' && (
          <g>
            {/* Oil Tanks */}
            <circle cx="100" cy="40" r="22" fill="#ef4444" stroke="#fca5a5" strokeWidth="2" />
            <circle cx="160" cy="40" r="22" fill="#ef4444" stroke="#fca5a5" strokeWidth="2" />
            <text x="130" y="44" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Crude Storage Tanks
            </text>
            {/* Pipeline */}
            <line x1="160" y1="55" x2="350" y2="120" stroke="#f97316" strokeWidth="6" />
            {/* Oil Tanker */}
            <path d="M 320 120 L 520 120 L 490 155 L 350 155 Z" fill="#1e293b" stroke="#f97316" strokeWidth="2" />
            <rect x="360" y="100" width="100" height="20" fill="#ea580c" />
            <text x="410" y="114" fill="#ffffff" fontSize="10" textAnchor="middle">VLCC Crude Tanker</text>
          </g>
        )}

        {activeType === 'packet' && (
          <g>
            {/* Passenger Dock & Terminal */}
            <rect x="50" y="25" width="160" height="40" fill="#8b5cf6" rx="6" />
            <text x="130" y="48" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Ferry & Mail Terminal
            </text>
            {/* Passenger Catamaran Ferry */}
            <path d="M 280 115 L 420 115 L 400 145 L 300 145 Z" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
            <rect x="310" y="95" width="80" height="20" fill="#ffffff" rx="4" />
            <text x="350" y="109" fill="#0f172a" fontSize="10" textAnchor="middle" fontWeight="bold">
              Express Mail Ferry
            </text>
          </g>
        )}

        {activeType === 'naval' && (
          <g>
            {/* Military Outpost */}
            <polygon points="100,65 140,20 180,65" fill="#475569" />
            <text x="140" y="45" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Naval Headquarters & Drydock
            </text>
            {/* Warship */}
            <path d="M 220 120 L 450 120 L 410 150 L 250 150 Z" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
            <polygon points="320,120 340,85 360,120" fill="#64748b" />
            <line x1="340" y1="85" x2="340" y2="70" stroke="#ef4444" strokeWidth="3" />
            <text x="330" y="140" fill="#e2e8f0" fontSize="10" textAnchor="middle">Destroyer Vessel</text>
          </g>
        )}

        {activeType === 'inland' && (
          <g>
            {/* River Channel Banks */}
            <rect x="0" y="0" width="600" height="40" fill="#15803d" />
            <rect x="0" y="170" width="600" height="50" fill="#15803d" />
            <text x="300" y="25" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">
              River Bank & Dredged Navigation Channel (e.g., Hugli River)
            </text>
            {/* River Steamer / Barge */}
            <path d="M 180 90 L 380 90 L 360 130 L 200 130 Z" fill="#ca8a04" stroke="#fef08a" strokeWidth="2" />
            <text x="290" y="114" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold">
              River Barge / Dredged Freight Liner
            </text>
          </g>
        )}
      </svg>

      {/* Description box */}
      <div className="mt-3 p-3 bg-slate-800 rounded-lg border border-slate-700">
        <p className="text-sm text-slate-200">
          <span className="font-bold text-gold-400">
            {portCategories.find((c) => c.type === activeType)?.title}:
          </span>{' '}
          {portCategories.find((c) => c.type === activeType)?.desc}
        </p>
      </div>
    </div>
  );
};

// 4. WTO & Regional Blocs Network SVG
const WorldTradeNetworkSVG: React.FC<{
  wtoActive: boolean;
  activeBloc: string;
  tariffRate: number;
}> = ({ wtoActive, activeBloc, tariffRate }) => {
  return (
    <svg viewBox="0 0 600 300" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-800 p-2">
      <text x="300" y="25" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="bold">
        WTO Global Trade Governance & Trade Blocs Architecture
      </text>

      {/* Center WTO Node */}
      <g transform="translate(300, 150)">
        <circle
          cx="0"
          cy="0"
          r="45"
          fill={wtoActive ? '#0284c7' : '#334155'}
          stroke="#38bdf8"
          strokeWidth="3"
          className={wtoActive ? 'animate-pulse' : ''}
        />
        <text x="0" y="-5" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">
          WTO
        </text>
        <text x="0" y="12" textAnchor="middle" fill="#93c5fd" fontSize="9">
          (Est. 1995)
        </text>
        <text x="0" y="24" textAnchor="middle" fill="#cbd5e1" fontSize="8">
          Geneva HQ
        </text>
      </g>

      {/* Regional Blocs surrounding WTO */}
      {/* 1. ASEAN */}
      <g transform="translate(130, 80)">
        <circle cx="0" cy="0" r="32" fill={activeBloc === 'asean' ? '#10b981' : '#1e293b'} stroke="#10b981" strokeWidth="2" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">ASEAN</text>
        <line x1="25" y1="15" x2="135" y2="55" stroke={wtoActive ? '#38bdf8' : '#475569'} strokeWidth="1.5" strokeDasharray="3,3" />
      </g>

      {/* 2. EU */}
      <g transform="translate(470, 80)">
        <circle cx="0" cy="0" r="32" fill={activeBloc === 'eu' ? '#6366f1' : '#1e293b'} stroke="#6366f1" strokeWidth="2" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">EU</text>
        <line x1="-25" y1="15" x2="-135" y2="55" stroke={wtoActive ? '#38bdf8' : '#475569'} strokeWidth="1.5" strokeDasharray="3,3" />
      </g>

      {/* 3. SAARC */}
      <g transform="translate(130, 220)">
        <circle cx="0" cy="0" r="32" fill={activeBloc === 'saarc' ? '#f59e0b' : '#1e293b'} stroke="#f59e0b" strokeWidth="2" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">SAARC</text>
        <line x1="25" y1="-15" x2="135" y2="-55" stroke={wtoActive ? '#38bdf8' : '#475569'} strokeWidth="1.5" strokeDasharray="3,3" />
      </g>

      {/* 4. NAFTA / USMCA */}
      <g transform="translate(470, 220)">
        <circle cx="0" cy="0" r="32" fill={activeBloc === 'usmca' ? '#ec4899' : '#1e293b'} stroke="#ec4899" strokeWidth="2" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">USMCA</text>
        <line x1="-25" y1="-15" x2="-135" y2="-55" stroke={wtoActive ? '#38bdf8' : '#475569'} strokeWidth="1.5" strokeDasharray="3,3" />
      </g>

      {/* Tariff Wall Graphic */}
      <g transform="translate(250, 260)">
        <rect x="0" y="0" width="100" height="18" fill="#ef4444" opacity={tariffRate / 50} rx="3" />
        <text x="50" y="13" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
          Tariff Wall: {tariffRate}%
        </text>
      </g>
    </svg>
  );
};

// ==========================================
// MAIN COMPONENT CLASS
// ==========================================

export default function C12_GeoInternationalTradeCBSESim({
  onComplete,
}: {
  onComplete?: (score: number) => void;
}) {
  // Tab Navigation State
  const [activeTab, setActiveTab] = useState<'discovery' | 'exploration' | 'challenges' | 'summary'>('discovery');

  // Interactive Lab Controls State
  const [selectedPort, setSelectedPort] = useState<IndianPort>(INDIAN_PORTS[0]);
  const [selectedEra, setSelectedEra] = useState<'1950s' | '1990s' | 'present'>('present');
  const [exportsVal, setExportsVal] = useState<number>(420);
  const [importsVal, setImportsVal] = useState<number>(610);
  const [activePortType, setActivePortType] = useState<string>('entrepot');
  const [wtoActive, setWtoActive] = useState<boolean>(true);
  const [activeBloc, setActiveBloc] = useState<string>('asean');
  const [tariffRate, setTariffRate] = useState<number>(15);
  const [currentLabStepIndex, setCurrentLabStepIndex] = useState<number>(0);

  // Challenge & Mastery Tracking State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Feedback & Overlay UI State
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });

  // Discovery & Prediction UI State
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // BKT State tracking map per Node ID
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initialMap: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initialMap[id] = createBKTState();
    });
    return initialMap;
  });

  // SRS Review Items map per Node ID
  const [srsItems, setSrsItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initialMap: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initialMap[id] = createReviewItem(id);
    });
    return initialMap;
  });

  // Auto-hint Timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && !isSubmitted) {
        setShowHint(true);
        setCurrentHint(CHALLENGES[currentChallengeIndex].hints[0]);
        audioManager.play('hint');
      }
    }, 12000);
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, activeTab, isSubmitted]);

  // Handle TTS and Voice greeting on Tab change
  const handleTabChange = (tab: 'discovery' | 'exploration' | 'challenges' | 'summary') => {
    setActiveTab(tab);
    audioManager.play('whoosh');

    if (tab === 'discovery') {
      speechManager.speak('Welcome to International Trade Analysis. Explore trade corridors, balance of payments, and port functions.');
    } else if (tab === 'exploration') {
      speechManager.speak(`Laboratory Step ${currentLabStepIndex + 1}: ${EXPLORATION_STEPS[currentLabStepIndex].title}`);
    } else if (tab === 'challenges') {
      speechManager.speak('Starting geography assessment. Evaluate concepts of trade balance, ports, and WTO.');
    } else if (tab === 'summary') {
      speechManager.speak('Real world extension and mastery summary.');
    }
  };

  // Handle Lab Step Change
  const handleStepChange = (index: number) => {
    setCurrentLabStepIndex(index);
    audioManager.play('tap');
    speechManager.speak(EXPLORATION_STEPS[index].title);
  };

  // Handle Challenge Option Click
  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
    audioManager.play('tap');
    resetInactivityTimer();
  };

  // Handle Challenge Submission
  const handleSubmitChallenge = () => {
    if (selectedOption === null || isSubmitted) return;

    setIsSubmitted(true);
    const currentChal = CHALLENGES[currentChallengeIndex];
    const isCorrect = selectedOption === currentChal.correctIndex;

    // Update BKT & SRS state
    const targetNode = currentChal.nodeId;
    const updatedBKT = bktUpdate(bktStates[targetNode], isCorrect);
    const updatedSRS = sm2Update(srsItems[targetNode], isCorrect ? 5 : 1);

    setBktStates((prev) => ({ ...prev, [targetNode]: updatedBKT }));
    setSrsItems((prev) => ({ ...prev, [targetNode]: updatedSRS }));

    if (isCorrect) {
      setScore((prev) => prev + 1);
      audioManager.play('success');
      speechManager.speak('Correct analysis! Excellent insight.');
      setShowSuccess(true);
      setShowSparkle(true);
      setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 3 });
      setTimeout(() => {
        setShowSuccess(false);
        setShowSparkle(false);
      }, 2000);
    } else {
      audioManager.play('error');
      speechManager.speak('Incorrect answer. Review the hint and explanation.');
      setShowHint(true);
      setCurrentHint(currentChal.explanation);
    }
  };

  // Handle Next Challenge
  const handleNextChallenge = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setShowHint(false);
      audioManager.play('swoop');
    } else {
      // Completed all challenges
      setShowConfetti(true);
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have completed all international trade challenges.');
      const totalScorePercent = Math.round((score / CHALLENGES.length) * 100);
      recordGameScore('c12_geo_international_trade', totalScorePercent);
      if (onComplete) onComplete(totalScorePercent);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none">
      {/* Visual Feedback Overlays */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />

      {/* Top Header Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-wrap justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold-500 to-gold-600 flex items-center justify-center font-bold text-white shadow-lg text-xl">
            🚢
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">
              ISC Class 12 Geography: International Trade & Gateway Ports
            </h1>
            <p className="text-xs text-gold-400">
              Interactive Lab • Nodes c12_geo_cbse_253 to 286
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-2 mt-3 sm:mt-0">
          {(['discovery', 'exploration', 'challenges', 'summary'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-gold-500 text-white shadow-lg shadow-gold-500/30'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              {tab === 'discovery' && '🔍 Discovery'}
              {tab === 'exploration' && '🔬 Trade Lab'}
              {tab === 'challenges' && '🎯 Assessment'}
              {tab === 'summary' && '📊 Real-World & Mastery'}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Interactive Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* TAB 1: DISCOVERY & SCENARIO */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* Scenario Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-gold-950 to-slate-900 border border-gold-500/30 rounded-2xl p-6 shadow-xl">
              <span className="bg-gold-500/20 text-gold-300 text-xs font-bold px-3 py-1 rounded-full border border-gold-500/40">
                LAB SCENARIO
              </span>
              <h2 className="text-2xl font-bold text-white mt-3 mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-base leading-relaxed mb-4">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-sm border-l-4 border-gold-500 pl-3 italic">
                {SCENARIO.context}
              </p>
            </div>

            {/* Counterintuitive Discovery Question */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <span className="text-gold-400 text-xs font-bold tracking-wider uppercase">
                Discovery Challenge
              </span>
              <h3 className="text-lg font-bold text-white mt-2 mb-4">
                {DISCOVERY_QUESTION.question}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, i) => {
                  const isChosen = discoveryAnswer === i;
                  const isCorrect = i === DISCOVERY_QUESTION.correctIndex;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setDiscoveryAnswer(i);
                        audioManager.play(isCorrect ? 'pop' : 'error');
                        if (isCorrect) speechManager.speak('Surprising geographical trade paradox discovered!');
                      }}
                      className={`p-4 rounded-xl text-left border text-sm transition-all ${
                        isChosen
                          ? isCorrect
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                            : 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-750'
                      }`}
                    >
                      <div className="font-semibold">{opt}</div>
                    </button>
                  );
                })}
              </div>

              {discoveryAnswer !== null && (
                <div className="mt-4 p-4 bg-gold-950/50 border border-gold-800/50 rounded-xl text-gold-200 text-sm">
                  <strong className="text-gold-400">Insight: </strong>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS ARRAY MANDATORY RENDER */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
              <h3 className="text-lg font-bold text-amber-400 flex items-center space-x-2">
                <span>🔮</span>
                <span>Hypothesis & Trade Predictions</span>
              </h3>
              {PREDICTION_QUESTIONS.map((pq, idx) => (
                <div key={idx} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
                  <p className="text-white font-medium mb-3">{pq.question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    {pq.options.map((opt, optIdx) => {
                      const selected = predictionAnswers[idx] === optIdx;
                      const correct = optIdx === pq.correctIndex;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => {
                            setPredictionAnswers((prev) => ({ ...prev, [idx]: optIdx }));
                            audioManager.play(correct ? 'chime' : 'tap');
                          }}
                          className={`p-3 rounded-lg border text-left text-xs transition-all ${
                            selected
                              ? correct
                                ? 'bg-emerald-900 border-emerald-500 text-emerald-200'
                                : 'bg-rose-900 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-750 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-slate-400 italic">🔍 {pq.verifyInstruction}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE EXPLORATION LAB */}
        {activeTab === 'exploration' && (
          <div className="space-y-6">
            {/* Exploration Steps Selector Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => handleStepChange(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    currentLabStepIndex === idx
                      ? 'bg-gold-500 text-white shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {step.title}
                </button>
              ))}
            </div>

            {/* Active Lab Step Instruction */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gold-400">
                  {EXPLORATION_STEPS[currentLabStepIndex].title}
                </h3>
                <p className="text-sm text-slate-300">
                  {EXPLORATION_STEPS[currentLabStepIndex].instruction}
                </p>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                Node: {EXPLORATION_STEPS[currentLabStepIndex].nodeId}
              </span>
            </div>

            {/* DYNAMIC INTERACTIVE LAB WORKSPACE ACCORDING TO STEP */}
            {currentLabStepIndex === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7">
                  <IndiaTradeMapSVG
                    selectedPort={selectedPort}
                    onSelectPort={(port) => {
                      setSelectedPort(port);
                      audioManager.play('pickup');
                      speechManager.speak(`Inspecting ${port.name}`);
                    }}
                    showRoutes={true}
                  />
                </div>
                <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="text-lg font-bold text-white">{selectedPort.name}</h4>
                    <span className="px-2 py-1 bg-gold-500/20 text-gold-300 rounded text-xs font-semibold">
                      {selectedPort.coast.toUpperCase()} COAST
                    </span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-slate-400 block text-xs">Port Architecture Type</span>
                      <strong className="text-gold-300">{selectedPort.type}</strong>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-xs">Primary Cargo Handled</span>
                      <strong className="text-amber-300">{selectedPort.cargo}</strong>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-xs">Economic Hinterland Coverage</span>
                      <p className="text-slate-300 text-xs">{selectedPort.hinterland}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800">
                      <span className="text-xs font-semibold text-emerald-400 block mb-2">
                        Port Modernization Status (PPP / Sagarmala)
                      </span>
                      <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                        <li>Automated Container Handling Gantries</li>
                        <li>Direct Rail DFC (Dedicated Freight Corridor) Connectivity</li>
                        <li>24/7 Deep Draft Navigation Channel</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentLabStepIndex === 1 && (
              <div className="space-y-4">
                <div className="flex space-x-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-bold self-center">Select Era:</span>
                  {(['1950s', '1990s', 'present'] as const).map((era) => (
                    <button
                      key={era}
                      onClick={() => {
                        setSelectedEra(era);
                        audioManager.play('count');
                      }}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedEra === era
                          ? 'bg-gold-500 text-white'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {era === '1950s' && '1950s (Post-Independence)'}
                      {era === '1990s' && '1990s (LPG Reforms)'}
                      {era === 'present' && 'Present Day'}
                    </button>
                  ))}
                </div>

                <TradeBalanceAndCompositionSVG
                  exportsVal={exportsVal}
                  importsVal={importsVal}
                  selectedEra={selectedEra}
                />
              </div>
            )}

            {currentLabStepIndex === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <h4 className="text-base font-bold text-gold-400">Trade Balance Adjuster</h4>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Total Export Value (FOB):</span>
                      <span className="font-bold text-emerald-400">${exportsVal} Billion</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="800"
                      value={exportsVal}
                      onChange={(e) => {
                        setExportsVal(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-emerald-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Total Import Value (CIF):</span>
                      <span className="font-bold text-rose-400">${importsVal} Billion</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="800"
                      value={importsVal}
                      onChange={(e) => {
                        setImportsVal(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-rose-500"
                    />
                  </div>

                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Balance of Trade Status:</span>
                      <strong className={exportsVal - importsVal >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                        {exportsVal - importsVal >= 0
                          ? `Trade Surplus (+${exportsVal - importsVal} B)`
                          : `Trade Deficit (-${Math.abs(exportsVal - importsVal)} B)`}
                      </strong>
                    </div>
                    <p className="text-slate-400 italic">
                      Note: F.O.B (Free On Board) excludes shipping insurance; C.I.F (Cost, Insurance & Freight) includes landed cargo costs.
                    </p>
                  </div>
                </div>

                <TradeBalanceAndCompositionSVG
                  exportsVal={exportsVal}
                  importsVal={importsVal}
                  selectedEra={selectedEra}
                />
              </div>
            )}

            {currentLabStepIndex === 3 && (
              <PortClassificationSVG
                activeType={activePortType}
                onSelectType={(type) => {
                  setActivePortType(type);
                  audioManager.play('pop');
                }}
              />
            )}

            {currentLabStepIndex === 4 && (
              <div className="space-y-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-slate-300 font-bold">WTO Dispute Settlement Mechanism:</span>
                    <button
                      onClick={() => {
                        setWtoActive(!wtoActive);
                        audioManager.play('tap');
                      }}
                      className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                        wtoActive ? 'bg-gold-500 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {wtoActive ? 'ACTIVE (Rule-Based)' : 'SUSPENDED'}
                    </button>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-slate-300 font-bold">Regional Bloc:</span>
                    {['asean', 'eu', 'saarc', 'usmca'].map((bloc) => (
                      <button
                        key={bloc}
                        onClick={() => {
                          setActiveBloc(bloc);
                          audioManager.play('pop');
                        }}
                        className={`px-3 py-1 rounded text-xs uppercase font-bold transition-all ${
                          activeBloc === bloc ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {bloc}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-300 font-bold">Import Tariff Rate:</span>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={tariffRate}
                      onChange={(e) => setTariffRate(Number(e.target.value))}
                      className="accent-rose-500 w-24"
                    />
                    <span className="text-xs text-rose-400 font-bold">{tariffRate}%</span>
                  </div>
                </div>

                <WorldTradeNetworkSVG
                  wtoActive={wtoActive}
                  activeBloc={activeBloc}
                  tariffRate={tariffRate}
                />
              </div>
            )}

            {/* OBSERVATION QUESTIONS ARRAY MANDATORY RENDER */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4 mt-6">
              <h3 className="text-lg font-bold text-gold-400 flex items-center space-x-2">
                <span>👁️</span>
                <span>Lab Observations & Diagnostic Verification</span>
              </h3>
              {OBSERVATION_QUESTIONS.map((oq, idx) => (
                <div key={idx} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
                  <p className="text-white font-medium mb-3">{oq.question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {oq.observableOptions.map((opt, optIdx) => {
                      const selected = observationAnswers[idx] === optIdx;
                      const correct = optIdx === oq.correctIndex;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => {
                            setObservationAnswers((prev) => ({ ...prev, [idx]: optIdx }));
                            audioManager.play(correct ? 'success' : 'error');
                          }}
                          className={`p-3 rounded-lg border text-left text-xs transition-all ${
                            selected
                              ? correct
                                ? 'bg-emerald-900 border-emerald-500 text-emerald-200'
                                : 'bg-rose-900 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-750 text-slate-300 hover:bg-slate-800'
                          }`}
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
        )}

        {/* TAB 3: CHALLENGES & ASSESSMENT */}
        {activeTab === 'challenges' && (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Progress Bar */}
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>
                Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
              </span>
              <span>Score: {score}</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gold-500 h-full transition-all duration-300"
                style={{
                  width: `${((currentChallengeIndex + 1) / CHALLENGES.length) * 100}%`,
                }}
              />
            </div>

            {/* Current Challenge Card */}
            {(() => {
              const chal = CHALLENGES[currentChallengeIndex];
              return (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                        chal.difficulty === 'foundation'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : chal.difficulty === 'standard'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {chal.difficulty} • {chal.competencyLevel}
                    </span>
                    <span className="text-xs font-mono text-slate-500">Node: {chal.nodeId}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug">{chal.question}</h3>

                  <div className="space-y-3">
                    {chal.options.map((opt, i) => {
                      const isSelected = selectedOption === i;
                      const isCorrect = i === chal.correctIndex;
                      let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-750';

                      if (isSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-gold-950 border-gold-500 text-gold-200';
                      }

                      return (
                        <button
                          key={i}
                          onClick={() => handleSelectOption(i)}
                          className={`w-full p-4 rounded-xl border text-left text-sm transition-all ${btnStyle}`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400">
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span className="flex-1">{opt}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Submit & Next Buttons */}
                  <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                    <button
                      onClick={() => {
                        setShowHint(true);
                        setCurrentHint(chal.hints[0]);
                        audioManager.play('hint');
                      }}
                      className="text-xs text-amber-400 hover:underline flex items-center space-x-1"
                    >
                      <span>💡 Need Hint?</span>
                    </button>

                    {!isSubmitted ? (
                      <button
                        onClick={handleSubmitChallenge}
                        disabled={selectedOption === null}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                          selectedOption !== null
                            ? 'bg-gold-500 hover:bg-gold-400 text-white shadow-lg shadow-gold-500/30'
                            : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                        }`}
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/30 transition-all"
                      >
                        {currentChallengeIndex < CHALLENGES.length - 1
                          ? 'Next Challenge →'
                          : 'Complete Assessment 🎓'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* TAB 4: REAL-WORLD & SUMMARY */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* REAL WORLD ACTIVITY MANDATORY RENDER */}
            <div className="bg-gradient-to-r from-slate-900 via-gold-950 to-slate-900 border border-gold-500/30 rounded-2xl p-6 shadow-xl">
              <span className="bg-gold-500/20 text-gold-300 text-xs font-bold px-3 py-1 rounded-full border border-gold-500/40">
                REAL-WORLD APPLICATION TASK
              </span>
              <h3 className="text-xl font-bold text-white mt-3 mb-2">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-300 flex space-x-3">
                    <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Misconceptions Review Cards */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>⚠️</span>
                <span>Common Misconceptions Clarified</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((m) => (
                  <div key={m.id} className="p-4 bg-slate-800/50 border border-slate-750 rounded-xl space-y-2">
                    <h4 className="text-sm font-bold text-rose-400">{m.title}</h4>
                    <p className="text-xs text-slate-400 line-through">"{m.misconception}"</p>
                    <p className="text-xs text-emerald-300 font-medium">✓ {m.correction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostic Review Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
              <h3 className="text-lg font-bold text-white">Diagnostic Question Reference</h3>
              <div className="space-y-3">
                {DIAGNOSTIC_QUESTIONS.map((dq) => (
                  <div key={dq.id} className="p-3 bg-slate-800/40 rounded-lg text-xs space-y-1">
                    <p className="font-semibold text-gold-300">{dq.question}</p>
                    <p className="text-slate-300">
                      Correct Answer: <span className="text-emerald-400">{dq.options[dq.correctIndex]}</span>
                    </p>
                    <p className="text-slate-500 italic">{dq.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}