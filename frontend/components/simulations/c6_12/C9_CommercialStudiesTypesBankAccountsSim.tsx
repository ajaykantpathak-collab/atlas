'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';

// String literals for topic graph tracking
const NODE_C9_COMMSTUD_031 = 'c9_commstud_031';
const NODE_C9_COMMSTUD_032 = 'c9_commstud_032';
const NODE_C9_COMMSTUD_033 = 'c9_commstud_033';
const NODE_C9_COMMSTUD_034 = 'c9_commstud_034';
const NODE_C9_COMMSTUD_035 = 'c9_commstud_035';
const NODE_C9_COMMSTUD_036 = 'c9_commstud_036';
const NODE_C9_COMMSTUD_037 = 'c9_commstud_037';
const NODE_C9_COMMSTUD_038 = 'c9_commstud_038';
const NODE_C9_COMMSTUD_039 = 'c9_commstud_039';

const ALL_NODE_IDS = [
  NODE_C9_COMMSTUD_031,
  NODE_C9_COMMSTUD_032,
  NODE_C9_COMMSTUD_033,
  NODE_C9_COMMSTUD_034,
  NODE_C9_COMMSTUD_035,
  NODE_C9_COMMSTUD_036,
  NODE_C9_COMMSTUD_037,
  NODE_C9_COMMSTUD_038,
  NODE_C9_COMMSTUD_039
];

const SCENARIO = {
  title: 'Priya’s Enterprise & Green Banking Journey',
  intro: 'Priya is setting up "Prakriti Essentials" in Pune — an eco-friendly commerce hub selling bamboo ware, recycling corporate e-waste, and trading online across India.',
  context: 'She needs to manage business banking (operating capital vs surplus), choose between retail models, process e-waste safely, and stay 100% compliant with Indian environmental laws.'
};

const DISCOVERY_QUESTION = {
  question: 'Priya opens an ICICI Current Account with ₹10,00,000 to issue 40 supplier cheques daily. How much interest will the bank pay her after 1 full year?',
  options: [
    '₹70,000 (standard 7% p.a.)',
    '₹27,000 (modest 2.7% p.a.)',
    '₹0 (Zero interest)',
    '₹50,000 (commercial base rate)'
  ],
  correctIndex: 2,
  hintAfter: 'Current accounts pay ZERO interest because money must remain 100% liquid for unlimited cheques!'
};

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

const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C9_COMMSTUD_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A college student in Mumbai saves ₹2,000 pocket money each month and needs occasional withdrawals. Which bank account best fits her?',
    options: ['Current Account', 'Savings Account', 'Fixed Deposit Account', 'Foreign Currency Account'],
    correctIndex: 1,
    explanation: 'A savings account encourages saving habits, pays modest interest (~2.7% SBI), and permits limited monthly withdrawals.',
    hints: [
      'Think about an individual saving pocket money with occasional spending.',
      'Businesses need current accounts; individual savers use another common type.',
      'It provides interest while permitting ATM and cheque withdrawals within limits: Savings Account.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_02',
    nodeId: NODE_C9_COMMSTUD_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does an Indian commercial bank pay ZERO interest on balances held in Current Accounts?',
    options: [
      'Banks make no profit from business customers.',
      'Funds must be kept 100% liquid to honour unlimited daily cheques and transfers.',
      'The RBI Act prohibits businesses from earning wealth.',
      'Current accounts do not allow cheque book issuance.'
    ],
    correctIndex: 1,
    explanation: 'Because depositors can withdraw or transfer current account funds at any instant without notice, banks cannot lend them long-term.',
    hints: [
      'Consider how long the bank can safely hold the deposited funds before they are withdrawn.',
      'Liquidity vs Return: if transactions are unlimited, liquidity is maximum.',
      'Since banks must maintain 100% liquidity for instant cheques, they cannot earn long-term yields to pay interest.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_03',
    nodeId: NODE_C9_COMMSTUD_032,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the 4 account types to their core financial purpose by placing each label in its designated box.',
    dragItems: [
      { label: 'Unlimited Business Transactions', targetId: 'box_current' },
      { label: 'Disciplined Monthly Corpus', targetId: 'box_rd' },
      { label: 'Lump-sum Locked Yield', targetId: 'box_fd' },
      { label: 'Modest Habitual Saving', targetId: 'box_savings' }
    ],
    correctMapping: {
      box_current: 'Unlimited Business Transactions',
      box_rd: 'Disciplined Monthly Corpus',
      box_fd: 'Lump-sum Locked Yield',
      box_savings: 'Modest Habitual Saving'
    },
    explanation: 'Current accounts offer business transaction liquidity; RD enforces monthly saving discipline; FD locks lump sums for highest yield; Savings balances routine thrift.',
    hints: [
      'Current accounts are for active commercial firms.',
      'RD involves monthly instalments, while FD involves a single one-time deposit.',
      'Savings accounts give modest interest for regular individual savings.'
    ]
  },
  {
    id: 'ch_04',
    nodeId: NODE_C9_COMMSTUD_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How is E-commerce distinct from E-trade?',
    options: [
      'E-commerce is solely online payments; E-trade is physical shopping.',
      'E-commerce is the entire digital commercial ecosystem; E-trade is the specific buying/selling transaction.',
      'E-trade is B2B only; E-commerce is only social media marketing.',
      'They are 100% synonymous terms with zero difference in ICSE syllabus.'
    ],
    correctIndex: 1,
    explanation: 'E-commerce encompasses marketing, customer support, supply chain, and settlement; E-trade refers strictly to the electronic buy/sell transaction.',
    hints: [
      'One term is broader, containing after-sales, advertising, and CRM.',
      'The other is the specific digital exchange of goods for money.',
      'E-commerce is the overall framework; E-trade is the trade transaction inside it.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_05',
    nodeId: NODE_C9_COMMSTUD_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A passenger in Guwahati books a train ticket on the IRCTC app. What type of e-commerce transaction is this?',
    options: ['B2B (Business-to-Business)', 'B2C (Business-to-Consumer)', 'C2C (Consumer-to-Consumer)', 'C2B (Consumer-to-Business)'],
    correctIndex: 1,
    explanation: 'IRCTC (a corporate enterprise) sells a personal transport ticket directly to an individual passenger (consumer) — strictly B2C.',
    hints: [
      'Do not be misled by the large size or public nature of Indian Railways.',
      'Identify the immediate buyer in this single transaction: an individual citizen.',
      'A business selling directly to an individual customer is B2C.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'ch_06',
    nodeId: NODE_C9_COMMSTUD_035,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following discarded items qualifies as E-Waste?',
    options: [
      'A broken wooden study desk',
      'A non-functional laptop with a swollen lithium battery',
      'A torn cotton canvas tote bag',
      'An empty glass jam jar'
    ],
    correctIndex: 1,
    explanation: 'E-waste comprises discarded electrical and electronic equipment containing circuitry, batteries, and toxic heavy metals.',
    hints: [
      'The item must have drawn electrical power or processed electronic signals.',
      'Wooden and glass materials are municipal dry waste.',
      'Laptops, phones, and batteries are authentic e-waste.'
    ],
    misconceptionIndex: 6
  },
  {
    id: 'ch_07',
    nodeId: NODE_C9_COMMSTUD_036,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the decisive scientific test that separates Recycling from Reusing?',
    options: [
      'Recycling requires paying money; reusing is always free.',
      'Recycling involves an industrial reprocessing step; reuse employs the item in its original form.',
      'Reusing only applies to plastic; recycling is for paper only.',
      'There is no technical difference between them.'
    ],
    correctIndex: 1,
    explanation: 'Reprocessing (melting, pulping, chemical reform) defines recycling. Reusing uses the original physical structure (e.g. jam jar as pen holder).',
    hints: [
      'Think about what happens to the molecular or physical structure of the product.',
      'Melting a glass bottle is one; washing and filling it with water is the other.',
      'Industrial transformation = Recycling. Repurposing as-is = Reuse.'
    ],
    misconceptionIndex: 7
  },
  {
    id: 'ch_08',
    nodeId: NODE_C9_COMMSTUD_037,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How is Afforestation fundamentally distinct from Reforestation?',
    options: [
      'Afforestation is done by private companies; reforestation is done by the military.',
      'Afforestation creates a new forest on long-barren land; reforestation replants trees on recently cleared forest land.',
      'Afforestation plants fruit trees only; reforestation plants timber trees.',
      'Afforestation is illegal without NGT approval; reforestation is compulsory.'
    ],
    correctIndex: 1,
    explanation: 'Afforestation establishes a forest on land devoid of tree cover for decades. Reforestation restores a recently felled tract.',
    hints: [
      'Consider the historical land usage.',
      'Think: barren mine wasteland vs a patch of forest logged last year for a highway.',
      'Brand-new forest on barren land = Afforestation.'
    ],
    misconceptionIndex: 8
  },
  {
    id: 'ch_09',
    nodeId: NODE_C9_COMMSTUD_038,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is a 100% natural cotton shirt dyed with toxic chemical azo dyes NOT considered genuinely eco-friendly?',
    options: [
      'Cotton is non-biodegradable.',
      'Eco-friendliness requires minimal harm across the FULL lifecycle, including non-polluting production.',
      'Natural fibres can never be sold in commercial markets.',
      'All textile mills are banned under the Air Act 1981.'
    ],
    correctIndex: 1,
    explanation: 'Eco-friendliness follows a 4-stage lifecycle evaluation (Raw Material, Production, Use, Disposal). Toxic chemical effluent in dyeing fails the lifecycle test.',
    hints: [
      'A natural raw material does not automatically forgive a river-polluting chemical production stage.',
      'Look at the full lifecycle: does the manufacturing process poison water bodies?',
      'Eco-friendliness requires clean production, safe use, and clean disposal.'
    ],
    misconceptionIndex: 9
  },
  {
    id: 'ch_10',
    nodeId: NODE_C9_COMMSTUD_039,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does legal environmental compliance differ from Corporate Social Responsibility (CSR)?',
    options: [
      'CSR is compulsory under penalty of jail; compliance is purely voluntary.',
      'Environmental compliance is legally mandatory with penal consequences; CSR allows discretion in social cause selection.',
      'Compliance is handled by NGOs; CSR is governed by the Supreme Court.',
      'They are identical clauses under Section 135 of the Companies Act 2013.'
    ],
    correctIndex: 1,
    explanation: 'Environmental laws (EPA 1986, Water Act 1974) carry criminal penalties and factory closures. CSR allows companies to choose voluntary social investments.',
    hints: [
      'Can a factory choose to opt out of effluent treatment laws?',
      'Compliance is "You MUST not pollute or face closure". CSR is "Spend 2% on chosen social development".',
      'One is non-negotiable statutory mandate; the other allows flexibility in project choice.'
    ],
    misconceptionIndex: 10
  },
  {
    id: 'ch_11',
    nodeId: NODE_C9_COMMSTUD_034,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which of the following highlights the primary cost risk for an online apparel seller compared to a physical retail store?',
    options: [
      'Online sellers must pay 100% GST in advance.',
      'High return rates (30-40%) creating heavy reverse logistics, repackaging, and depreciation costs.',
      'Online sellers cannot accept UPI or digital payments.',
      'Physical retailers are exempt from local municipal property taxes.'
    ],
    correctIndex: 1,
    explanation: 'In apparel, lack of touch-and-feel leads to 30-40% return rates. The cost of reverse shipping and damaged garments can exceed showroom rent.',
    hints: [
      'Consider what happens when clothing ordered online does not fit the customer.',
      'Who pays for shipping the returned item back and inspecting it?',
      'Reverse logistics and return handling is the largest hidden cost in online fashion.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_12',
    nodeId: NODE_C9_COMMSTUD_032,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Surat Textiles Ltd. locks ₹10,00,000 in a 1-year Fixed Deposit at 7.00% simple p.a. instead of keeping it in their Current Account (0%). How much extra interest do they earn in rupees?',
    correctAnswer: 70000,
    tolerance: 100,
    unit: '₹',
    explanation: '₹10,00,000 × 7.00% = ₹70,000 extra earned. In a current account, interest would be ₹0.',
    hints: [
      'Calculate 7% of ₹10,00,000.',
      'Current account yield = ₹0. FD yield = ₹10,00,000 × 0.07.',
      '₹10,00,000 × 0.07 = ₹70,000.'
    ]
  },
  {
    id: 'ch_13',
    nodeId: NODE_C9_COMMSTUD_039,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Arrange the 5 sequential statutory steps a new pharmaceutical factory in Himachal Pradesh must take for environmental compliance.',
    sortItems: [
      'Identify applicable Environmental Acts (EPA 1986, Water Act, Air Act)',
      'Apply to State PCB for Consent to Establish (CTE)',
      'Construct facility & install Effluent Treatment Plant (ETP)',
      'Obtain Consent to Operate (CTO) from State PCB',
      'Submit periodic pollution test audit reports to PCB'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Factory compliance proceeds: Legal mapping → Consent to Establish → Infrastructure/ETP setup → Consent to Operate → Ongoing periodic audits.',
    hints: [
      'You cannot build before getting Consent to Establish.',
      'Effluent Treatment Plants must be built before applying for Consent to Operate.',
      'Ongoing audit reporting is the continuous final phase during regular production.'
    ]
  },
  {
    id: 'ch_14',
    nodeId: NODE_C9_COMMSTUD_036,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Pune school cafeteria has 50 kg broken PET water bottles and 20 kg broken melamine dinner plates. Which item CANNOT be re-melted and recycled?',
    options: [
      'PET bottles (they are thermoplastics)',
      'Melamine plates (they are thermoset plastics that do not re-melt)',
      'Both can be melted equally easily',
      'Neither can be recycled in India'
    ],
    correctIndex: 1,
    explanation: 'Melamine is a thermosetting polymer; its chemical cross-links cannot be melted again without destroying the material. PET is a recyclable thermoplastic.',
    hints: [
      'Distinguish thermoplastics from thermoset plastics.',
      'PET bottles are spun into polyester fibres like Reliance R|Elan.',
      'Melamine plates permanently harden during initial manufacture and cannot be remelted.'
    ],
    misconceptionIndex: 7
  },
  {
    id: 'ch_15',
    nodeId: NODE_C9_COMMSTUD_038,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the 4 essential lifecycle checkpoints required to certify a commercial product under the BIS ECO Mark standard.',
    availableParts: [
      'Renewable / Recycled Raw Material',
      'Zero-Tax Retail Price',
      'Low-Energy & Clean Production Process',
      'Non-Toxic & Energy-Efficient Usage',
      'Biodegradable or Closed-Loop Recyclable Disposal',
      'Mandatory Television Advertising'
    ],
    targetState: 'Renewable / Recycled Raw Material Low-Energy & Clean Production Process Non-Toxic & Energy-Efficient Usage Biodegradable or Closed-Loop Recyclable Disposal',
    validationHint: 'Select the 4 authentic lifecycle stages: Material, Production, Usage, and Disposal.',
    explanation: 'Genuine eco-certification audits all 4 stages: sustainable raw sourcing, pollution-free manufacturing, safe energy-saving use, and biodegradable/recyclable disposal.',
    hints: [
      'Commercial advertising and tax exemptions are not environmental parameters.',
      'Follow the product from birth to grave: Material → Manufacturing → Consumer Use → End-of-Life.',
      'Select the four pillars: Raw Material, Clean Production, Safe Usage, and Biodegradable Disposal.'
    ]
  },
  {
    id: 'ch_16',
    nodeId: NODE_C9_COMMSTUD_032,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A Chennai exporter has ₹50 lakh daily operational turnover and ₹30 lakh surplus capital untouched for 18 months. What is the optimal dual-account banking structure?',
    options: [
      'Keep entire ₹80 lakh in a Savings Account to earn 2.7% on all funds.',
      'Current Account for the ₹50 lakh operational flow + Fixed Deposit (18-month) for the ₹30 lakh surplus.',
      'Keep entire ₹80 lakh in a 5-year Recurring Deposit.',
      'Deposit ₹80 lakh in cash in the office locker to avoid bank scrutiny.'
    ],
    correctIndex: 1,
    explanation: 'Current account provides unlimited cheque clearing for ₹50L operations, while an FD locks the ₹30L surplus at ~7% p.a., maximizing yield and liquidity simultaneously.',
    hints: [
      'No single account satisfies both unlimited daily cheques AND high term interest.',
      'Separate operational liquidity needs from idle surplus capital.',
      'Use a Current Account for daily transactions and a Fixed Deposit for idle surplus funds.'
    ]
  },
  {
    id: 'ch_17',
    nodeId: NODE_C9_COMMSTUD_039,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why did the Tamil Nadu Pollution Control Board order the permanent closure of the Sterlite Copper plant at Thoothukudi in May 2018?',
    options: [
      'The company failed to pay corporate income tax.',
      'The plant violated statutory discharge limits under the Water Act 1974 and Air Act 1981.',
      'The company did not conduct voluntary CSR tree plantation drives.',
      'The plant manufactured uncertified plastic toys.'
    ],
    correctIndex: 1,
    explanation: 'Sterlite violated mandatory statutory emission norms for SO2 and toxic liquid effluent, leading to regulatory shutdown under Water and Air Acts.',
    hints: [
      'Look at the core Indian environmental pollution prevention statutes.',
      'The shutdown was due to water and air pollution violations threatening public health.',
      'Enforced under the Water (Prevention & Control of Pollution) Act 1974 and Air Act 1981.'
    ]
  },
  {
    id: 'ch_18',
    nodeId: NODE_C9_COMMSTUD_035,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is informal e-waste dismantling in hubs like Seelampur (Delhi) hazardous compared to formal recyclers like Attero in Roorkee?',
    options: [
      'Informal recyclers use open-air acid baths and burning of cables, releasing lead and mercury into groundwater and air.',
      'Informal workers only process wooden and glass furniture.',
      'Formal recyclers are exempt from CPCB environmental audits.',
      'Informal dismantling does not generate any gold or copper.'
    ],
    correctIndex: 0,
    explanation: 'Informal crude burning and cyanide/acid leaching releases lead, mercury, and cadmium toxins. Formal recyclers use closed automated metallurgical extraction.',
    hints: [
      'Think about toxic heavy metals like lead solder, mercury vapor, and cadmium.',
      'Open burning of PVC wires emits toxic dioxins; acid leaching poisons groundwater.',
      'Informal methods lack containment, poisoning human health and ecology.'
    ]
  },
  {
    id: 'ch_19',
    nodeId: NODE_C9_COMMSTUD_037,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'ITC’s Sunehra Kal afforestation initiative covers 9,50,000 hectares. If an average hectare absorbs 4 tonnes of CO2 per year, how many LAKH tonnes of CO2 are absorbed annually?',
    correctAnswer: 38,
    tolerance: 0.5,
    unit: 'lakh tonnes',
    explanation: '9,50,000 hectares × 4 tonnes = 38,00,000 tonnes = 38 lakh tonnes of CO2 absorbed.',
    hints: [
      'Multiply 9.5 lakh hectares by 4 tonnes/ha.',
      '9.5 × 4 = 38.',
      'Total annual sequestration is 38 lakh tonnes.'
    ]
  },
  {
    id: 'ch_20',
    nodeId: NODE_C9_COMMSTUD_034,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A Kolhapur artisan crafting authentic handmade leather chappals joins Amazon Karigar. Which strategic combination of merits applies to his business?',
    options: [
      'Zero delivery times and zero packaging expenses.',
      'National market reach across all Indian pin codes without spending ₹2,00,000/month on physical city showrooms.',
      'Total elimination of all platform sales commissions and return risks.',
      'Exemption from GST and mandatory consumer protection rules.'
    ],
    correctIndex: 1,
    explanation: 'E-trade democratises reach: rural artisans access pan-India buyers without high fixed retail showroom overheads, though variable commissions still apply.',
    hints: [
      'Consider the difference between opening showrooms in 15 metros vs listing on a pan-India marketplace.',
      'Does online eliminate all shipping costs, or does it provide massive geographic reach?',
      'Wider national customer reach without prohibitive fixed retail showroom rents.'
    ]
  }
];

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
  nodeId: NODE_C9_COMMSTUD_031,
  title: 'Types of Bank Accounts, E-Commerce & Environmental Compliance',
  definition: 'An integrated study of commercial banking deposit instruments (Savings, Current, RD, FD), electronic commerce channels (B2B, B2C, C2C), e-waste management, and statutory environmental compliance under Indian law.',
  eli5: 'Think of commercial banking as four specialized money boxes (checking, savings, piggy bank, time vault), e-commerce as trading over the internet highway, and environmental law as the strict safety rules that ensure businesses do not poison rivers or air.',
  misconceptions: [
    { misconception: 'Current accounts earn high interest because businesses deposit large sums.', correction: 'Current accounts pay 0% interest because funds must be 100% liquid for unlimited cheques.' },
    { misconception: 'Recurring Deposit and Fixed Deposit are identical term deposits.', correction: 'RD requires monthly fixed instalments; FD is a single lump-sum deposit.' },
    { misconception: 'Savings accounts allow unlimited cheque issuance with no transaction ceilings.', correction: 'Savings accounts restrict withdrawal frequency to encourage thrift.' },
    { misconception: 'Online trading has zero operating costs because there is no showroom.', correction: 'Online sellers incur platform commissions (6-18%), courier fees, and heavy reverse-logistics costs.' },
    { misconception: 'E-commerce and E-trade are identical words with zero distinction.', correction: 'E-commerce is the whole digital commercial framework; E-trade is the specific buy-sell transaction.' },
    { misconception: 'IRCTC is B2B because Indian Railways is a gigantic organisation.', correction: 'Classification depends on the immediate transaction: IRCTC selling a ticket to a citizen is B2C.' },
    { misconception: 'Any broken plastic item like a chair is e-waste.', correction: 'E-waste must be electrical/electronic in origin and contain circuitry or electronic components.' },
    { misconception: 'All plastics can be easily melted and recycled.', correction: 'Thermoplastics (PET) can be remelted, but thermoset plastics (melamine, bakelite) cannot be remelted.' },
    { misconception: 'Afforestation and Reforestation mean the exact same tree planting.', correction: 'Afforestation creates a new forest on long-barren land; Reforestation replants recently logged forest.' },
    { misconception: 'A product is eco-friendly if its raw material is natural, regardless of factory pollution.', correction: 'Eco-friendliness requires clean lifecycle performance: raw material, production, use, and disposal.' },
    { misconception: 'Environmental compliance is part of voluntary CSR charity.', correction: 'Compliance is legally compulsory under EPA 1986 and Water/Air Acts; failure brings jail and closure.' }
  ],
  diagnosticQuestions: [
    { question: 'Which bank account offers an overdraft facility for business cash flow?', options: ['Savings Account', 'Current Account', 'Recurring Deposit', 'Fixed Deposit'], correctIndex: 1 },
    { question: 'What rate of interest is typically paid on Indian Current Accounts?', options: ['2.70% p.a.', '7.00% p.a.', '0.00% (Zero)', '10.50% p.a.'], correctIndex: 2 },
    { question: 'A platform connecting a Surat fabric mill with a Delhi garment factory is:', options: ['B2C', 'B2B', 'C2C', 'C2B'], correctIndex: 1 },
    { question: 'Which toxic heavy metal is predominantly found in electronic circuit board solder?', options: ['Lead', 'Sodium', 'Calcium', 'Magnesium'], correctIndex: 0 },
    { question: 'Melting crushed glass cullet to cast new bottles is an example of:', options: ['Reuse', 'Recycling', 'Afforestation', 'Incineration'], correctIndex: 1 },
    { question: 'Planting native trees on a 40-year barren mine wasteland is classified as:', options: ['Reforestation', 'Afforestation', 'Deforestation', 'Landscaping'], correctIndex: 1 },
    { question: 'The Bureau of Indian Standards certifies eco-friendly consumer goods under:', options: ['ISI Mark', 'AGMARK', 'ECO Mark (Earthen Pot)', 'FSSAI'], correctIndex: 2 },
    { question: 'Which Indian statutory body is a specialized environmental judicial court?', options: ['CPCB', 'State PCB', 'National Green Tribunal (NGT)', 'RBI'], correctIndex: 2 }
  ],
  masteryCriteria: 'Student understands commercial bank deposit structures, online retail dynamics, and statutory Indian environmental compliance.'
};

const EXPLORATION_STEPS = [
  {
    title: 'Bank Accounts: Liquidity vs Yield Simulator',
    instruction: 'Adjust the monthly withdrawal frequency and deposit tenure sliders to discover which account type matches Priya’s needs.',
    interactionType: 'banking-simulator',
    nodeId: NODE_C9_COMMSTUD_031
  },
  {
    title: 'E-Commerce Channel Matrix',
    instruction: 'Select transaction pairs (Seller vs Buyer) to classify B2B, B2C, C2C, and C2B models with live Indian enterprise examples.',
    interactionType: 'ecommerce-matrix',
    nodeId: NODE_C9_COMMSTUD_033
  },
  {
    title: 'E-Waste & Heavy Metal Hazard Lab',
    instruction: 'Click on electronic components to reveal their toxic heavy metals (Lead, Mercury, Cadmium) and formal recycling extraction workflows.',
    interactionType: 'ewaste-inspector',
    nodeId: NODE_C9_COMMSTUD_035
  },
  {
    title: '4-Stage Lifecycle Eco-Product Evaluator',
    instruction: 'Toggle material, production, use, and disposal parameters to test whether a product qualifies for the BIS ECO Mark.',
    interactionType: 'lifecycle-tester',
    nodeId: NODE_C9_COMMSTUD_038
  },
  {
    title: 'Indian Environmental Legal Compliance Board',
    instruction: 'Drag industrial pollution parameters past safe limits and observe real-time enforcement by CPCB, State PCB, and NGT.',
    interactionType: 'legal-compliance',
    nodeId: NODE_C9_COMMSTUD_039
  }
];

const PREDICTION_QUESTIONS = [
  {
    question: 'If Priya deposits ₹5,00,000 for 3 years, predict which account generates the highest guaranteed interest payout.',
    options: ['Current Account (0%)', 'Savings Account (2.7%)', 'Fixed Deposit Account (7.2%)', 'Overdraft Facility'],
    correctIndex: 2,
    verifyInstruction: 'Drag the tenure slider in the banking simulator to 3 years and observe the interest yield curve.'
  },
  {
    question: 'Predict: What happens to an industrial chemical factory that discharges untreated acidic effluent into a river under the Water Act 1974?',
    options: [
      'It receives a voluntary CSR commendation badge.',
      'State PCB can immediately revoke Consent to Operate and order factory closure.',
      'The company only has to pay a ₹50 stamp duty.',
      'Nothing, because environmental compliance is voluntary in India.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the effluent discharge slider past threshold limits on the Legal Compliance board.'
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the relationship between transaction liquidity and interest rate in commercial banking?',
    observableOptions: [
      'Higher withdrawal liquidity directly leads to lower or zero interest yield.',
      'Accounts with zero withdrawals always pay zero interest.',
      'All bank accounts yield the same 12% return.',
      'Banks charge interest to depositors in savings accounts.'
    ],
    correctIndex: 0
  },
  {
    question: 'What happens to the BIS ECO Mark qualification score when a natural product uses toxic chemical dyes during manufacturing?',
    observableOptions: [
      'It stays 100% certified because the raw material is natural.',
      'The product immediately fails the lifecycle certification test at the production stage.',
      'The government pays a bonus subsidy to the factory.',
      'The product is classified as B2B instead of B2C.'
    ],
    correctIndex: 1
  }
];

const REAL_WORLD_ACTIVITY = {
  title: 'Priya’s Commercial Enterprise Audit',
  description: 'Apply your Commercial Studies knowledge to design an eco-compliant business blueprint for an Indian retail firm.',
  steps: [
    'Allocate ₹20,00,000 operating capital into Current Account and surplus funds into a 365-day Fixed Deposit.',
    'Map out online trading channels using ONDC and Amazon Karigar to minimise physical retail overheads.',
    'Establish a formal e-waste collection partnership with a CPCB-registered recycler like Attero.',
    'Ensure 100% compliance with Consent to Establish (CTE) and Consent to Operate (CTO) before opening.'
  ]
};

function C9_CommercialStudiesTypesBankAccountsSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C9_COMMSTUD_031,
  title = DEFAULT_PROPS.title || 'Commercial Studies Simulation',
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete
}: Props) {
  const subjectConfig = SUBJECT_CONFIG['commstud'] || { name: 'Commercial Studies', emoji: '📊', color: 'indigo' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints & feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Interactive Exploration & Sandbox States
  const [depositAmount, setDepositAmount] = useState<number>(100000);
  const [withdrawFreq, setWithdrawFreq] = useState<number>(30); // transactions/month
  const [tenureYears, setTenureYears] = useState<number>(1);
  const [selectedAccTab, setSelectedAccTab] = useState<'savings' | 'current' | 'rd' | 'fd'>('current');

  // E-Commerce Matrix State
  const [sellerType, setSellerType] = useState<'business' | 'consumer'>('business');
  const [buyerType, setBuyerType] = useState<'business' | 'consumer'>('consumer');

  // E-Waste Inspector State
  const [inspectedComponent, setInspectedComponent] = useState<string | null>('circuit_board');

  // Lifecycle Tester State
  const [lcMaterial, setLcMaterial] = useState<'natural' | 'synthetic' | 'recycled'>('natural');
  const [lcProduction, setLcProduction] = useState<'clean' | 'toxic_dye' | 'high_coal'>('clean');
  const [lcUsage, setLcUsage] = useState<'efficient' | 'toxic_bpa'>('efficient');
  const [lcDisposal, setLcDisposal] = useState<'biodegradable' | 'recyclable' | 'landfill'>('biodegradable');

  // Legal Compliance Simulator State
  const [effluentToxicity, setEffluentToxicity] = useState<number>(35); // mg/L
  const [airSo2Ppm, setAirSo2Ppm] = useState<number>(40); // ppm
  const [hasETPInstalled, setHasETPInstalled] = useState<boolean>(true);

  // Predict & Observation states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIdx, setPredictionIdx] = useState(-1);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Drag & Sort Challenge State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Animation & Feedback Flags
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Adaptive Difficulty Filtering
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Banking simulator yield calculations
  const bankingChartData = useMemo(() => {
    const P = depositAmount;
    const t = tenureYears;
    const savingsYield = Math.round(P * (0.027 * t));
    const currentYield = 0;
    const rdYield = Math.round(P * (0.065 * t));
    const fdYield = Math.round(P * (0.071 * t));

    return [
      { name: 'Current A/c', interest: currentYield, liquidity: '100% (Unlimited)', fill: '#ef4444' },
      { name: 'Savings A/c', interest: savingsYield, liquidity: 'Medium (50 tx/mo)', fill: '#3b82f6' },
      { name: 'Recurring Dep.', interest: rdYield, liquidity: 'Low (Locked)', fill: '#f59e0b' },
      { name: 'Fixed Deposit', interest: fdYield, liquidity: 'Lowest (Locked)', fill: '#10b981' }
    ];
  }, [depositAmount, tenureYears]);

  // Lifecycle score calculation
  const ecoScore = useMemo(() => {
    let score = 0;
    if (lcMaterial === 'natural') score += 25;
    if (lcMaterial === 'recycled') score += 25;
    if (lcProduction === 'clean') score += 25;
    if (lcUsage === 'efficient') score += 25;
    if (lcDisposal === 'biodegradable' || lcDisposal === 'recyclable') score += 25;
    return score;
  }, [lcMaterial, lcProduction, lcUsage, lcDisposal]);

  // Legal status derivation
  const legalStatus = useMemo(() => {
    const isWaterViolated = effluentToxicity > 50 || !hasETPInstalled;
    const isAirViolated = airSo2Ppm > 80;
    if (isWaterViolated && isAirViolated) {
      return { status: 'Critical Violation', action: 'Immediate Closure Order & Prosecution under EPA 1986', color: 'rose' };
    }
    if (isWaterViolated) {
      return { status: 'Water Act 1974 Non-Compliance', action: 'Show-Cause Notice & Consent to Operate Revoked by State PCB', color: 'amber' };
    }
    if (isAirViolated) {
      return { status: 'Air Act 1981 Emission Breach', action: 'NGT Penalty Notice & Mandatory Scrubber Installation', color: 'amber' };
    }
    return { status: 'Fully Compliant', action: 'Valid Consent to Operate (CTO) Granted by PCB', color: 'emerald' };
  }, [effluentToxicity, airSo2Ppm, hasETPInstalled]);

  // Mount effect: load mastery
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // BKT Difficulty adaptation
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

  // Canvas requestAnimationFrame loop for real-time visual pulse
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background grid lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }

      // Draw pulsing activity node
      const pulse = Math.sin(frame * 0.08) * 4;
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.arc(40, canvas.height / 2, 8 + pulse, 0, Math.PI * 2);
      ctx.fill();

      // Draw status text
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Sim Engine Active • Tier: ${difficulty.toUpperCase()} • Mastery: ${masteryLevel.toUpperCase()}`, 65, canvas.height / 2 + 4);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [difficulty, masteryLevel]);

  // Escalating hints helper
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints && activeChallenge.hints[nextLevel - 1]) {
      const hintMsg = activeChallenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintMsg}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us review the step-by-step ICSE commercial reasoning.');
    }
  }, [hintCount, activeChallenge]);

  // Inactivity auto-hint timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0 && !showExplanation) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showExplanation, showNextHint]);

  // Handlers for discovery & phase routing
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding! You understand liquidity.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive commercial exploration lab. Let us experiment with real variables.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Here is your free play commercial sandbox. Test any scenario without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Starting competency challenges. Apply your analytical understanding!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIdx(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Now manipulate the simulator to verify.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You scored ${finalScore}% and mastered Class 9 Commercial Studies.`);
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

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = answer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = answer === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent commercial analysis.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + activeChallenge.nodeId, JSON.stringify(bktStateRef.current));
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
        speechManager.speak('Let us study the complete solution.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // Drag handlers
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
    setConstructParts(prev => {
      if (prev.includes(part)) {
        return prev.filter(p => p !== part);
      }
      return [...prev, part];
    });
  }, []);

  const handleSliderChangeDeposit = useCallback((val: number) => {
    setDepositAmount(val);
    audioManager.play('count');
  }, []);

  const handleSliderChangeTenure = useCallback((val: number) => {
    setTenureYears(val);
    audioManager.play('count');
  }, []);

  const handleSliderChangeWithdraw = useCallback((val: number) => {
    setWithdrawFreq(val);
    audioManager.play('count');
  }, []);

  const handleEffluentChange = useCallback((val: number) => {
    setEffluentToxicity(val);
    audioManager.play('balance');
  }, []);

  const handleAirSo2Change = useCallback((val: number) => {
    setAirSo2Ppm(val);
    audioManager.play('balance');
  }, []);

  const handleEtpToggle = useCallback(() => {
    setHasETPInstalled(prev => !prev);
    audioManager.play('tap');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header Banner */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="text-3xl p-2 bg-indigo-900/40 rounded-2xl border border-indigo-700/50"
            aria-hidden="true"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded-full border border-indigo-800">
                ICSE Class 9 Commercial Studies
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase ${
                  difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                  difficulty === 'advanced' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                  'bg-sky-950 text-sky-400 border border-sky-800'
                }`}
              >
                {difficulty}
              </motion.span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Real-time RAF Canvas Status Bar */}
        <div className="w-full sm:w-auto flex items-center bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          <canvas ref={canvasRef} width={280} height={28} className="w-full sm:w-[280px]" aria-label="Simulation real-time status display" />
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-5 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/60 shadow-lg">
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm mb-1">
              <span>🌟</span> Commercial Scenario Hook
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300/80 mt-2 bg-indigo-950/50 p-2.5 rounded-xl border border-indigo-900">
              💡 {SCENARIO.context}
            </p>
          </div>

          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-2">Curiosity Discovery Puzzle</h3>
            <p className="text-base text-white font-medium mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Discovery option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-3.5 text-left rounded-xl text-sm font-medium border transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-800/40 border-slate-700 text-slate-500'
                      : 'bg-slate-800/90 hover:bg-slate-700/90 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="inline-block w-6 font-bold text-slate-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="ml-2 font-bold text-emerald-400">✓</span>}
                  {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && <span className="ml-2 font-bold text-rose-400">✗</span>}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <p className={`text-sm font-semibold mb-3 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! Zero interest because banks need 100% liquidity.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Enter Interactive Exploration Lab"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold rounded-xl shadow-lg shadow-indigo-900/40"
                >
                  Enter Interactive Exploration Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Exploration Navigation Bar */}
          <div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-400">LAB {currentSlide + 1} OF 5</span>
              <span className="text-slate-400">|</span>
              <h2 className="text-sm md:text-base font-bold text-white truncate">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-2">
              <motion.button
                aria-label="Previous Lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold rounded-lg"
              >
                ← Prev
              </motion.button>
              <motion.button
                aria-label={currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next Lab' : 'Enter Free Sandbox'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (currentSlide < EXPLORATION_STEPS.length - 1) {
                    setCurrentSlide(s => s + 1);
                    audioManager.play('whoosh');
                  } else {
                    handleAdvanceToSandbox();
                  }
                }}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold rounded-lg text-white"
              >
                {currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next Lab →' : 'Enter Free Sandbox →'}
              </motion.button>
            </div>
          </div>

          <p className="text-xs md:text-sm text-amber-300 bg-amber-950/30 p-3 rounded-xl border border-amber-900/50">
            👉 <strong>Action:</strong> {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          <AnimatePresence mode="wait">
            {/* ── SLIDE 0: BANKING LIQUIDITY & YIELD SIMULATOR (SVG 1: Liquidity Spectrum) ── */}
            {currentSlide === 0 && (
              <motion.div
                key="slide0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-5"
              >
                <div className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wide">Deposit & Usage Controls</h3>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
                      <span>Deposit Corpus:</span>
                      <span className="text-indigo-400 font-bold">₹{depositAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min={10000}
                      max={1000000}
                      step={10000}
                      value={depositAmount}
                      aria-label="Deposit Corpus Slider"
                      onChange={e => handleSliderChangeDeposit(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
                      <span>Lock-in Tenure:</span>
                      <span className="text-indigo-400 font-bold">{tenureYears} Year{tenureYears > 1 ? 's' : ''}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      step={1}
                      value={tenureYears}
                      aria-label="Lock-in Tenure Slider"
                      onChange={e => handleSliderChangeTenure(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
                      <span>Cheques / Withdrawals:</span>
                      <span className="text-amber-400 font-bold">{withdrawFreq} tx/month</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={100}
                      step={1}
                      value={withdrawFreq}
                      aria-label="Monthly Transactions Frequency Slider"
                      onChange={e => handleSliderChangeWithdraw(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  {/* Account Selector Tabs */}
                  <div className="pt-2 border-t border-slate-800">
                    <p className="text-xs text-slate-400 mb-2">Account Blueprint Card:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {(['current', 'savings', 'rd', 'fd'] as const).map(acc => (
                        <motion.button
                          key={acc}
                          aria-label={`Select ${acc} account card`}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedAccTab(acc);
                            audioManager.play('tap');
                          }}
                          className={`p-2 rounded-lg text-xs font-bold uppercase transition-all ${
                            selectedAccTab === acc
                              ? 'bg-indigo-600 text-white border border-indigo-400 shadow-md'
                              : 'bg-slate-800/80 text-slate-300 border border-slate-700 hover:bg-slate-700'
                          }`}
                        >
                          {acc === 'rd' ? 'Recurring Dep.' : acc === 'fd' ? 'Fixed Deposit' : `${acc} A/c`}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Topic-Specific SVG 1: Banking Account Spectrum */}
                  <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Banking Spectrum: Liquidity vs Yield</span>
                    <svg viewBox="0 0 320 80" className="w-full h-auto" aria-label="Liquidity vs Interest Tradeoff Diagram">
                      <line x1="20" y1="40" x2="300" y2="40" stroke="#475569" strokeWidth="3" />
                      {/* Current */}
                      <circle cx="35" cy="40" r="12" fill="#ef4444" />
                      <text x="35" y="44" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">CA</text>
                      <text x="35" y="65" textAnchor="middle" fill="#f87171" fontSize="8">0% (Max Liq)</text>
                      {/* Savings */}
                      <circle cx="115" cy="40" r="12" fill="#3b82f6" />
                      <text x="115" y="44" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">SB</text>
                      <text x="115" y="65" textAnchor="middle" fill="#60a5fa" fontSize="8">2.7%</text>
                      {/* RD */}
                      <circle cx="205" cy="40" r="12" fill="#f59e0b" />
                      <text x="205" y="44" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">RD</text>
                      <text x="205" y="65" textAnchor="middle" fill="#fbbf24" fontSize="8">6.5%</text>
                      {/* FD */}
                      <circle cx="285" cy="40" r="12" fill="#10b981" />
                      <text x="285" y="44" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">FD</text>
                      <text x="285" y="65" textAnchor="middle" fill="#34d399" fontSize="8">7.1% (Locked)</text>
                      <text x="20" y="20" fill="#94a3b8" fontSize="8">← High Liquidity</text>
                      <text x="300" y="20" textAnchor="end" fill="#94a3b8" fontSize="8">High Yield →</text>
                    </svg>
                  </div>
                </div>

                {/* Live Recharts Yield Bar Chart */}
                <div className="lg:col-span-7 bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">Live Comparative Interest Yield (₹)</h3>
                    <p className="text-xs text-slate-400 mb-3">Notice how 100% liquidity (Current) yields ₹0, while 1-5 yr locked capital (FD) yields maximum wealth.</p>
                    <div className="h-60 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={bankingChartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                          <YAxis stroke="#94a3b8" fontSize={11} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#475569', borderRadius: '0.75rem' }}
                            formatter={(value: number | string | undefined) => [`₹${Number(value || 0).toLocaleString('en-IN')}`, 'Total Interest']}
                          />
                          <Bar dataKey="interest" radius={[6, 6, 0, 0]}>
                            {bankingChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Predict-then-check container */}
                  <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {!predictionMade ? (
                      <div>
                        <p className="text-xs font-bold text-amber-400 mb-2">🎯 Predict Before Checking:</p>
                        <p className="text-xs text-slate-200 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              aria-label={`Prediction option ${i + 1}: ${opt}`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handlePrediction(i)}
                              className="p-2 text-left bg-slate-900 hover:bg-slate-800 rounded-lg text-xs font-medium border border-slate-700 text-slate-200"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-emerald-400 font-bold">✓ Prediction checked with chart data!</span>
                        <span className="text-slate-400">FD yields ₹{(depositAmount * 0.071 * tenureYears).toLocaleString('en-IN')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── SLIDE 1: E-COMMERCE & E-TRADE MATRIX (SVG 2: Digital Flow) ─��� */}
            {currentSlide === 1 && (
              <motion.div
                key="slide1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-5"
              >
                <div className="md:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wide">Interactive Transaction Builder</h3>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Step 1: Who is the Seller?</label>
                    <div className="grid grid-cols-2 gap-2">
                      <motion.button
                        aria-label="Set seller as Business Enterprise"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setSellerType('business'); audioManager.play('tap'); }}
                        className={`p-2.5 rounded-xl text-xs font-bold border ${
                          sellerType === 'business' ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        🏢 Business (Enterprise)
                      </motion.button>
                      <motion.button
                        aria-label="Set seller as Consumer Individual"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setSellerType('consumer'); audioManager.play('tap'); }}
                        className={`p-2.5 rounded-xl text-xs font-bold border ${
                          sellerType === 'consumer' ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        👤 Consumer (Individual)
                      </motion.button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Step 2: Who is the Buyer?</label>
                    <div className="grid grid-cols-2 gap-2">
                      <motion.button
                        aria-label="Set buyer as Business Enterprise"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setBuyerType('business'); audioManager.play('tap'); }}
                        className={`p-2.5 rounded-xl text-xs font-bold border ${
                          buyerType === 'business' ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        🏢 Business (Factory/Store)
                      </motion.button>
                      <motion.button
                        aria-label="Set buyer as Consumer Household"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setBuyerType('consumer'); audioManager.play('tap'); }}
                        className={`p-2.5 rounded-xl text-xs font-bold border ${
                          buyerType === 'consumer' ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        👤 Consumer (Household)
                      </motion.button>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-indigo-900/60 text-center">
                    <span className="text-xs uppercase text-slate-400 block mb-1">Resulting E-Commerce Model</span>
                    <span className="text-xl font-black text-indigo-400">
                      {sellerType === 'business' && buyerType === 'business' ? 'B2B (Business-to-Business)' :
                       sellerType === 'business' && buyerType === 'consumer' ? 'B2C (Business-to-Consumer)' :
                       sellerType === 'consumer' && buyerType === 'consumer' ? 'C2C (Consumer-to-Consumer)' :
                       'C2B (Consumer-to-Business)'}
                    </span>
                  </div>
                </div>

                {/* SVG Visual Flow Diagram for E-Commerce */}
                <div className="md:col-span-7 bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <h3 className="text-sm font-bold text-white mb-2">Live E-Trade Flow Architecture</h3>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex-1 flex items-center justify-center">
                    <svg viewBox="0 0 450 180" className="w-full h-auto" aria-label="E-Commerce Transaction Architecture Diagram">
                      {/* Seller Node */}
                      <circle cx="70" cy="90" r="38" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                      <text x="70" y="86" textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="bold">
                        {sellerType === 'business' ? 'Seller' : 'Reseller'}
                      </text>
                      <text x="70" y="102" textAnchor="middle" fill="#818cf8" fontSize="9">
                        {sellerType === 'business' ? 'Enterprise' : 'Individual'}
                      </text>

                      {/* Connecting Flow Arrow 1 */}
                      <line x1="110" y1="90" x2="180" y2="90" stroke="#4f46e5" strokeWidth="2" strokeDasharray="4 3" />

                      {/* Central Digital Platform / ONDC Hub */}
                      <rect x="180" y="55" width="90" height="70" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                      <text x="225" y="85" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">DIGITAL HUB</text>
                      <text x="225" y="100" textAnchor="middle" fill="#94a3b8" fontSize="8">
                        {sellerType === 'business' && buyerType === 'business' ? 'IndiaMART' :
                         sellerType === 'business' && buyerType === 'consumer' ? 'Flipkart / IRCTC' :
                         sellerType === 'consumer' && buyerType === 'consumer' ? 'Meesho / OLX' : 'Upwork'}
                      </text>

                      {/* Connecting Flow Arrow 2 */}
                      <line x1="270" y1="90" x2="340" y2="90" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 3" />

                      {/* Buyer Node */}
                      <circle cx="380" cy="90" r="38" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                      <text x="380" y="86" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">Buyer</text>
                      <text x="380" y="102" textAnchor="middle" fill="#34d399" fontSize="9">
                        {buyerType === 'business' ? 'Factory / Store' : 'Passenger / Savers'}
                      </text>
                    </svg>
                  </div>

                  <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <strong>Real Indian Illustration: </strong>
                    {sellerType === 'business' && buyerType === 'business' && 'Surat textile mill bulk-selling fabric lot to Delhi apparel maker via IndiaMART.'}
                    {sellerType === 'business' && buyerType === 'consumer' && 'Patna consumer ordering smartphone on Flipkart or railway ticket on IRCTC.'}
                    {sellerType === 'consumer' && buyerType === 'consumer' && 'Indore homemaker curating sarees and selling to WhatsApp contacts via Meesho app.'}
                    {sellerType === 'consumer' && buyerType === 'business' && 'Pune freelance graphic designer creating logos for Bangalore startups via Upwork.'}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── SLIDE 2: E-WASTE & HEAVY METAL HAZARD LAB (SVG 3: E-Waste Dismantling) ── */}
            {currentSlide === 2 && (
              <motion.div
                key="slide2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-5"
              >
                <div className="md:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wide">Select Discarded Device Component</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'circuit_board', name: 'Printed Circuit Board (Motherboard)', metal: 'Lead & Beryllium', hazard: 'Kidney damage & Neurological harm' },
                      { id: 'lithium_battery', name: 'Rechargeable Phone/Laptop Battery', metal: 'Cadmium & Cobalt', hazard: 'Carcinogenic & Groundwater poisoning' },
                      { id: 'crt_screen', name: 'Old Television Screen / Fluorescent Bulb', metal: 'Mercury & Lead Glass', hazard: 'Respiratory damage & Chronic toxicity' }
                    ].map(comp => (
                      <motion.button
                        key={comp.id}
                        aria-label={`Inspect ${comp.name}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setInspectedComponent(comp.id);
                          audioManager.play('pop');
                        }}
                        className={`w-full text-left p-3 rounded-xl border text-xs ${
                          inspectedComponent === comp.id
                            ? 'bg-indigo-900/50 border-indigo-500 text-white'
                            : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <p className="font-bold">{comp.name}</p>
                        <p className="text-amber-400 mt-1">Hazard: {comp.metal}</p>
                      </motion.button>
                    ))}
                  </div>

                  {/* Topic-Specific SVG 3: E-Waste Heavy Metal Flow */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">E-Waste Metallurgical Loop</span>
                    <svg viewBox="0 0 300 75" className="w-full h-auto" aria-label="E-Waste Closed Loop Recycling Diagram">
                      <rect x="10" y="20" width="70" height="35" rx="6" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                      <text x="45" y="42" textAnchor="middle" fill="#fda4af" fontSize="9" fontWeight="bold">PCB Solder</text>
                      <path d="M 85 37 L 115 37" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                      <rect x="120" y="20" width="70" height="35" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="155" y="42" textAnchor="middle" fill="#fcd34d" fontSize="8" fontWeight="bold">Lead / Acid</text>
                      <path d="M 195 37 L 220 37" stroke="#64748b" strokeWidth="2" />
                      <rect x="225" y="20" width="65" height="35" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                      <text x="257" y="42" textAnchor="middle" fill="#6ee7b7" fontSize="8" fontWeight="bold">98% Pure Au</text>
                    </svg>
                  </div>
                </div>

                <div className="md:col-span-7 bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <h3 className="text-sm font-bold text-white mb-2">Formal vs Informal Recycling Pathway</h3>
                  <div className="grid grid-cols-2 gap-3 flex-1">
                    {/* Informal Seelampur Route */}
                    <div className="p-4 bg-rose-950/30 rounded-xl border border-rose-900/60 text-xs space-y-2">
                      <div className="flex items-center gap-1.5 text-rose-400 font-bold">
                        <span>✗</span> Informal Dismantling (e.g. Seelampur)
                      </div>
                      <ul className="text-slate-300 space-y-1 text-[11px] list-disc list-inside">
                        <li>Manual breaking with bare hands</li>
                        <li>Open burning of PVC wires for copper</li>
                        <li>Acid leaching releases toxic cyanide & mercury</li>
                        <li>Severe groundwater & worker lung damage</li>
                      </ul>
                    </div>

                    {/* Formal Attero Route */}
                    <div className="p-4 bg-emerald-950/30 rounded-xl border border-emerald-900/60 text-xs space-y-2">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <span>✓</span> Licensed Recycler (Attero Roorkee)
                      </div>
                      <ul className="text-slate-300 space-y-1 text-[11px] list-disc list-inside">
                        <li>Automated shredding & HEPA filtration</li>
                        <li>Safe containment of toxic lead & cadmium</li>
                        <li>Hydrometallurgical extraction of 98% pure Gold, Silver, Copper</li>
                        <li>Closed circular resource loop</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-amber-300">
                    💡 <strong>Crucial Rule:</strong> Never dump e-waste in municipal dustbins. Always route via registered Extended Producer Responsibility (EPR) channels.
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── SLIDE 3: 4-STAGE LIFECYCLE ECO-PRODUCT EVALUATOR (SVG 4: Eco Lifecycle) ── */}
            {currentSlide === 3 && (
              <motion.div
                key="slide3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-5"
              >
                <div className="md:col-span-6 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wide">4-Checkpoint Lifecycle Auditor</h3>

                  {/* Stage 1 */}
                  <div>
                    <label className="text-xs text-slate-300 font-bold block mb-1">1. Raw Material Origin:</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['natural', 'recycled', 'synthetic'] as const).map(mat => (
                        <button
                          key={mat}
                          aria-label={`Select raw material ${mat}`}
                          onClick={() => { setLcMaterial(mat); audioManager.play('tap'); }}
                          className={`p-1.5 rounded-lg text-xs font-semibold capitalize border ${
                            lcMaterial === mat ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                        >
                          {mat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Stage 2 */}
                  <div>
                    <label className="text-xs text-slate-300 font-bold block mb-1">2. Factory Manufacturing Process:</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['clean', 'toxic_dye', 'high_coal'] as const).map(pr => (
                        <button
                          key={pr}
                          aria-label={`Select production mode ${pr}`}
                          onClick={() => { setLcProduction(pr); audioManager.play('tap'); }}
                          className={`p-1.5 rounded-lg text-xs font-semibold capitalize border ${
                            lcProduction === pr ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                        >
                          {pr === 'toxic_dye' ? 'Toxic Dyes' : pr === 'high_coal' ? 'Coal Heavy' : 'Clean / Zero Effluent'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Stage 3 */}
                  <div>
                    <label className="text-xs text-slate-300 font-bold block mb-1">3. Consumer Usage Phase:</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        aria-label="Set usage as low energy BPA free"
                        onClick={() => { setLcUsage('efficient'); audioManager.play('tap'); }}
                        className={`p-1.5 rounded-lg text-xs font-semibold border ${
                          lcUsage === 'efficient' ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        ⚡ Low Energy / BPA-Free
                      </button>
                      <button
                        aria-label="Set usage as toxic chemical leaching"
                        onClick={() => { setLcUsage('toxic_bpa'); audioManager.play('tap'); }}
                        className={`p-1.5 rounded-lg text-xs font-semibold border ${
                          lcUsage === 'toxic_bpa' ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        ☣️ Toxic Chemical Leaching
                      </button>
                    </div>
                  </div>

                  {/* Stage 4 */}
                  <div>
                    <label className="text-xs text-slate-300 font-bold block mb-1">4. End-of-Life Disposal:</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['biodegradable', 'recyclable', 'landfill'] as const).map(disp => (
                        <button
                          key={disp}
                          aria-label={`Set disposal method as ${disp}`}
                          onClick={() => { setLcDisposal(disp); audioManager.play('tap'); }}
                          className={`p-1.5 rounded-lg text-xs font-semibold capitalize border ${
                            lcDisposal === disp ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                        >
                          {disp}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Score & Certification Card with SVG 4 */}
                <div className="md:col-span-6 bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-2">BIS ECO Mark Audit Outcome</h3>
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-2">
                      <div className="inline-block p-3 rounded-full bg-slate-900 border border-slate-700 text-3xl">
                        🏺
                      </div>
                      <div className="text-xs text-slate-400">Bureau of Indian Standards Earthen-Pot Standard</div>
                      <div className={`text-2xl font-black ${ecoScore === 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {ecoScore === 100 ? '✓ CERTIFIED ECO-FRIENDLY' : '✗ FAIL / NOT FULLY ECO'}
                      </div>
                      <p className="text-xs text-slate-300">
                        {ecoScore === 100
                          ? 'Passes all 4 checkpoints: Sustainable origin, clean manufacturing, non-toxic use, and closed-loop disposal.'
                          : 'Fails one or more lifecycle checkpoints. A natural raw material alone does not certify an eco-product if factory pollution occurs.'}
                      </p>
                    </div>
                  </div>

                  {/* SVG Diagram: 4-Stage Eco Circle */}
                  <div className="mt-2 p-2 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 320 60" className="w-full h-auto" aria-label="4-Stage Lifecycle Model">
                      <rect x="5" y="15" width="70" height="30" rx="6" fill={lcMaterial !== 'synthetic' ? '#065f46' : '#7f1d1d'} />
                      <text x="40" y="34" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">1. Material</text>
                      <rect x="85" y="15" width="70" height="30" rx="6" fill={lcProduction === 'clean' ? '#065f46' : '#7f1d1d'} />
                      <text x="120" y="34" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">2. Process</text>
                      <rect x="165" y="15" width="70" height="30" rx="6" fill={lcUsage === 'efficient' ? '#065f46' : '#7f1d1d'} />
                      <text x="200" y="34" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">3. Usage</text>
                      <rect x="245" y="15" width="70" height="30" rx="6" fill={lcDisposal !== 'landfill' ? '#065f46' : '#7f1d1d'} />
                      <text x="280" y="34" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">4. Disposal</text>
                    </svg>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── SLIDE 4: INDIAN ENVIRONMENTAL LEGAL COMPLIANCE ── */}
            {currentSlide === 4 && (
              <motion.div
                key="slide4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-5"
              >
                <div className="md:col-span-6 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wide">Factory Emissions & Effluent Controls</h3>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Liquid Effluent COD/BOD:</span>
                      <span className={`font-bold ${effluentToxicity > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {effluentToxicity} mg/L (Safe Limit: 50)
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={120}
                      step={1}
                      value={effluentToxicity}
                      aria-label="Liquid Effluent Toxicity Slider"
                      onChange={e => handleEffluentChange(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Air SO2 Chimney Emissions:</span>
                      <span className={`font-bold ${airSo2Ppm > 80 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {airSo2Ppm} ppm (Safe Limit: 80)
                      </span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={180}
                      step={1}
                      value={airSo2Ppm}
                      aria-label="Air SO2 Chimney Emissions Slider"
                      onChange={e => handleAirSo2Change(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-300 font-semibold">Effluent Treatment Plant (ETP) Operational:</span>
                    <button
                      aria-label="Toggle Effluent Treatment Plant status"
                      onClick={handleEtpToggle}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        hasETPInstalled ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      }`}
                    >
                      {hasETPInstalled ? '✓ YES (Active)' : '✗ NO (Bypassed)'}
                    </button>
                  </div>
                </div>

                <div className="md:col-span-6 bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <h3 className="text-sm font-bold text-white mb-2">Statutory Enforcement Status</h3>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase text-slate-400">Legal Finding:</span>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        legalStatus.color === 'emerald' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        legalStatus.color === 'amber' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                        'bg-rose-950 text-rose-400 border border-rose-800'
                      }`}>
                        {legalStatus.status}
                      </span>
                    </div>

                    <div className="text-sm font-semibold text-white">
                      Enforcement Action: <span className="text-indigo-300">{legalStatus.action}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-800 text-xs text-slate-400">
                      <strong>Historical Precedent:</strong> On 28 May 2018, Tamil Nadu PCB ordered permanent closure of Sterlite Copper at Thoothukudi under Water & Air Acts.
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-indigo-950/40 rounded-xl border border-indigo-900 text-xs text-indigo-200">
                    ⚖️ <strong>NGT Distinction:</strong> National Green Tribunal (NGT) is a judicial court for dispute penalty rulings. CPCB and State PCBs are regulatory executive bodies.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">Commercial Sandbox (No Grading Pressure)</h2>
              <p className="text-xs text-slate-400">Simulate banking, retail, and regulatory variables freely before entering the formal challenge tier.</p>
            </div>
            <motion.button
              aria-label="Start Competency Challenges Arena"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/40 text-sm"
            >
              Start Competency Challenges →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-indigo-300">Live Bank Yield vs Liquidity Matrix</h3>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bankingChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                    <YAxis stroke="#94a3b8" fontSize={10} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a' }} />
                    <Bar dataKey="interest" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-2">
                <input
                  type="range"
                  min={10000}
                  max={500000}
                  step={10000}
                  value={depositAmount}
                  aria-label="Sandbox Deposit Amount Slider"
                  onChange={e => handleSliderChangeDeposit(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>

            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-emerald-300">Afforestation Carbon Absorption Matrix</h3>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                <p className="text-slate-300">ITC Sunehra Kal Plantation Model:</p>
                <div className="text-xl font-bold text-emerald-400">9,50,000 Hectares = 38 Lakh Tonnes CO2 / Year</div>
                <p className="text-slate-400">Recharges groundwater, prevents soil erosion, and provides sustainable pulpwood to Bhadrachalam paperboard mill.</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: COMPETENCY CHALLENGE ARENA ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Progress Bar & Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
              <span className="uppercase tracking-wider text-indigo-400">{activeChallenge.competencyLevel} Competency</span>
              <span>Errors: {errors}</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Active Challenge Card */}
          <motion.div
            key={activeChallenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 md:p-6 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/70 border-rose-500 shadow-xl' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider bg-indigo-950 px-2.5 py-1 rounded-lg border border-indigo-800">
                Type: {activeChallenge.type.toUpperCase()}
              </span>
              <span className="text-xs text-slate-400 font-medium">Node: {activeChallenge.nodeId}</span>
            </div>

            <h3 className="text-base md:text-lg font-bold text-white mb-5 leading-snug">
              {activeChallenge.question}
            </h3>

            {/* MCQ TYPE (Classify / Distinguish / Match) */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(i)}
                    disabled={showExplanation || answerRevealed}
                    className={`p-4 text-left rounded-xl text-sm font-medium border transition-all ${
                      showExplanation && i === activeChallenge.correctIndex
                        ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 shadow-md'
                        : showExplanation && i !== activeChallenge.correctIndex
                        ? 'bg-slate-800/40 border-slate-800 text-slate-500'
                        : 'bg-slate-800/90 hover:bg-slate-700 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="inline-block w-6 font-bold text-indigo-400">{String.fromCharCode(65 + i)}.</span> {opt}
                    {showExplanation && i === activeChallenge.correctIndex && <span className="ml-2 font-bold text-emerald-400">✓</span>}
                  </motion.button>
                ))}
              </div>
            )}

            {/* DRAG-LABEL CHALLENGE */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag each item into the correct target box below:</span>
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable item: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-xs font-bold text-white cursor-grab shadow-sm"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'box_current', title: 'Current Account' },
                    { id: 'box_savings', title: 'Savings Account' },
                    { id: 'box_rd', title: 'Recurring Deposit' },
                    { id: 'box_fd', title: 'Fixed Deposit' }
                  ].map(slot => (
                    <div
                      key={slot.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(slot.id)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col justify-between min-h-[90px]"
                    >
                      <span className="text-xs font-bold text-slate-400 uppercase">{slot.title}</span>
                      <div className="text-sm font-semibold text-emerald-400 mt-2">
                        {droppedLabels[slot.id] ? `✓ ${droppedLabels[slot.id]}` : <span className="text-slate-600 italic">Drop purpose here...</span>}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify account purpose mappings"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT CHALLENGE */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to arrange steps in correct sequence from top to bottom:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Step ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-700 flex items-center gap-3 cursor-grab text-xs md:text-sm text-slate-200"
                    >
                      <span className="w-6 h-6 flex items-center justify-center bg-indigo-900/60 rounded-full text-indigo-300 font-bold text-xs">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  aria-label="Confirm sequence of steps"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm"
                >
                  Confirm Statutory Sequence
                </motion.button>
              </div>
            )}

            {/* NUMERIC CHALLENGE */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    aria-label="Calculated interest input"
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 w-52"
                  />
                  <span className="text-sm font-bold text-slate-400">{activeChallenge.unit}</span>
                  <motion.button
                    aria-label="Submit calculation answer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT CHALLENGE */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">Click components to add or remove them from the certification framework:</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Toggle part: ${part}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleConstructToggle(part)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                        constructParts.includes(part)
                          ? 'bg-emerald-700 border-emerald-400 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {constructParts.includes(part) ? '✓ ' : '+ '} {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] text-xs text-indigo-300">
                  <strong>Selected Blueprint:</strong> {constructParts.length > 0 ? constructParts.join(' • ') : <span className="text-slate-600">None selected</span>}
                </div>

                <motion.button
                  aria-label="Verify framework assembly"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm"
                >
                  Verify Framework Assembly
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-indigo-950/60 to-slate-950 rounded-2xl border border-indigo-800/80 space-y-3"
              >
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                  <span>📖</span> Structured ICSE Concept Walkthrough:
                </div>

                {activeChallenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <strong className="text-indigo-400">{idx + 1}.</strong> {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show next detailed explanation step"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-indigo-800 hover:bg-indigo-700 text-xs font-bold text-white rounded-lg"
                    >
                      Show Next Detail →
                    </motion.button>
                  ) : <div />}

                  {revealedSteps >= activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      aria-label="Advance to next challenge or review"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs md:text-sm shadow-lg shadow-emerald-900/40"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Simulation & Review →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION, REFLECTION & REAL-WORLD SYNTHESIS ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-3xl border border-indigo-700/60 shadow-2xl text-center space-y-3">
            <span className="text-5xl" aria-hidden="true">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Commercial Studies Mastery Complete!</h2>
            <p className="text-sm text-slate-300">
              Final Competency Score: <strong className="text-emerald-400 text-xl">{Math.max(0, 100 - errors * 5)}%</strong> | Mastery Level: <strong className="text-indigo-400 capitalize">{masteryLevel}</strong>
            </p>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-800/60 text-xs md:text-sm text-emerald-200">
            {errors === 0
              ? '🌟 Flawless Mastery! You possess deep analytical clarity in banking operations, e-commerce models, and Indian environmental statutes.'
              : errors <= 3
              ? '✨ Excellent Performance! You demonstrated sound commercial judgment. Review the specific misconceptions below to achieve complete perfection.'
              : '🌱 Good Effort! Commercial Studies requires balancing business liquidity with statutory duty. Review the misconception notes below and retry!'}
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-900/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-1.5">
                <span>⚠️</span> Personalised Misconception Diagnosis
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-bold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-400 font-medium">✓ ICSE Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Activity Blueprint */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wide">
              📋 {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs md:text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center bg-indigo-900 rounded-full text-indigo-300 font-bold">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Spaced Repetition Schedule Banner */}
          <div className="p-4 bg-amber-950/30 rounded-2xl border border-amber-900/50 flex items-center justify-between text-xs text-amber-200">
            <div>
              <strong>Spaced Repetition (SM-2): </strong>
              Next review scheduled in <strong className="text-amber-400">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
            </div>
            <motion.button
              aria-label="Replay simulation labs"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase('explore');
                setCurrentSlide(0);
                setErrors(0);
                audioManager.play('whoosh');
              }}
              className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg"
            >
              Replay Labs
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Floating Feedback Components */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Level Recorded!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_CommercialStudiesTypesBankAccountsSim;