'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceDot,
  Area,
  AreaChart,
} from 'recharts';

// ==========================================
// NODE IDS (ISC Class 12 Commerce)
// ==========================================
const NODE_C12_COMM_051 = 'c12_comm_051'; // Digital Marketing, Social Media, Influencer Marketing
const NODE_C12_COMM_052 = 'c12_comm_052'; // Product Life Cycle — Stages and Extension Strategies
const NODE_C12_COMM_053 = 'c12_comm_053'; // Consumer Protection — Need, Methods, CPA 2019
const NODE_C12_COMM_054 = 'c12_comm_054'; // Redressal Mechanism — Pecuniary Jurisdiction
const NODE_C12_COMM_055 = 'c12_comm_055'; // CPA 2023 — Misleading Advertisements
const ALL_NODE_IDS = [
  NODE_C12_COMM_051,
  NODE_C12_COMM_052,
  NODE_C12_COMM_053,
  NODE_C12_COMM_054,
  NODE_C12_COMM_055,
];

// ==========================================
// NARRATIVE SCENARIO
// ==========================================
const SCENARIO = {
  title: 'The D2C Revolution & Consumer Rights Crucible',
  intro:
    'You are the Chief Marketing & Legal Compliance Strategist for "VedaGlow", a fast-growing Indian D2C wellness brand based in Bengaluru. Having scaled rapidly using Instagram mom-influencers and quick-commerce, your flagship Ayurvedic anti-hair-fall serum is facing sales plateauing, a contested #ad disclosure crackdown by ASCI/CCPA, and a ₹95 lakh consumer dispute over warranty defaults in Pune.',
  context:
    'You must master digital promotion tools, navigate the Product Life Cycle with ethical extension strategies, safeguard consumer rights under CPA 2019/2023, and correctly steer consumer grievances through India’s three-tier quasi-judicial redressal machinery.',
};

// ==========================================
// DISCOVERY HOOK
// ==========================================
const DISCOVERY_QUESTION = {
  question:
    'Mamaearth allocated ~80% of its initial budget to 500+ Instagram mom-influencers rather than prime-time IPL TV ads. What structural difference between influencer marketing and celebrity endorsement explains this exponential D2C breakthrough?',
  options: [
    'Celebrities reach fewer people, whereas micro-influencers broadcast to hundreds of millions simultaneously',
    'Influencers possess niche parasocial trust and two-way engagement, making product advice feel authentic rather than a commercial broadcast',
    'Celebrity endorsements are strictly prohibited under Indian commercial advertising laws',
    'Influencer marketing requires zero budget and operates completely outside Indian consumer protection laws',
  ],
  correctIndex: 1,
  hintAfter:
    "Don't worry if you missed the nuance! Influencers leverage deep, parasocial trust in specific niches at ₹50k–₹5L per post, compared to broad but shallow celebrity deals costing ₹5–₹10 crore.",
};

// ==========================================
// CHALLENGE INTERFACE & NEP 2020 DATA (20 challenges)
// ==========================================
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
  // --- FOUNDATION ---
  {
    id: 'ch_001_f',
    nodeId: NODE_C12_COMM_051,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Amul regularly posts topical cartoons of the Amul Girl commenting on Chandrayaan-3 from its official handle @Amul_Coop. Which promotion tool is this?',
    options: [
      'Influencer Marketing (third-party creator)',
      'Social Media Marketing (brand’s own handle)',
      'Traditional Mass Advertising',
      'Personal Direct Selling',
    ],
    correctIndex: 1,
    explanation:
      'Under the "Whose Handle?" test: content published on the brand’s own social handle (@Amul_Coop) is Social Media Marketing. Influencer marketing involves third-party creators publishing on their personal handles.',
    hints: [
      'Look at which account published the message.',
      'Is it Amul’s official corporate handle or an independent creator?',
      'Content from a brand’s own social handle is social media marketing.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_002_f',
    nodeId: NODE_C12_COMM_052,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'In which stage of the Product Life Cycle are sales initially low, promotion expenses heavy, and net profit negative or negligible due to high launch costs?',
    options: ['Growth Stage', 'Maturity Stage', 'Introduction Stage', 'Decline Stage'],
    correctIndex: 2,
    explanation:
      'In the Introduction stage (e.g., Ola Electric S1 Pro launch in 2021), sales are low as awareness is just building, and heavy launch promotion creates negative or negligible profits.',
    hints: [
      'Think of when a product has just left R&D and entered the public market.',
      'Innovators are the primary buyers and ad costs are not yet amortised.',
      'This is the very first commercial stage: Introduction.',
    ],
  },
  {
    id: 'ch_003_f',
    nodeId: NODE_C12_COMM_053,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Which Indian certification mark is legally required on packaged organic food spices and agricultural produce?',
    options: ['AGMARK / Jaivik Bharat', 'ISI Mark', 'BIS Hallmark', 'BEE Star Rating'],
    correctIndex: 0,
    explanation:
      'AGMARK (under the Agricultural Produce Grading Act 1937) and Jaivik Bharat (FSSAI) certify agricultural and organic food purity. ISI is for industrial/electrical items, Hallmark is for gold jewellery.',
    hints: [
      'Think about agricultural grading standards in India.',
      'AG stands for Agriculture.',
      'The certification is AGMARK.',
    ],
  },
  {
    id: 'ch_004_f',
    nodeId: NODE_C12_COMM_054,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Under Rule 21 of the Consumer Protection Rules 2020, what is the revised pecuniary jurisdiction of the District Consumer Disputes Redressal Commission?',
    options: [
      'Claims up to ₹20 lakh (old 1986 limit)',
      'Claims up to ₹1 crore',
      'Claims between ₹1 crore and ₹10 crore',
      'Claims above ₹10 crore',
    ],
    correctIndex: 1,
    explanation:
      'The CPA 2019 / Rules 2020 revised the District Commission limit to claims up to ₹1 crore (a 50x increase from the outdated 1986 limit of ₹20 lakh).',
    hints: [
      'The 1986 limit of ₹20 lakh was raised fifty-fold due to inflation.',
      'The District Commission handles claims up to 100 lakhs.',
      'The revised threshold is up to ₹1 crore.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_005_f',
    nodeId: NODE_C12_COMM_055,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'What is the maximum monetary penalty that the Central Consumer Protection Authority (CCPA) can impose on an advertiser for a first-time misleading advertisement offence?',
    options: ['₹10 lakh', '₹25 lakh', '₹50 lakh', '₹1 crore'],
    correctIndex: 2,
    explanation:
      'Under Section 21 of CPA 2019 read with the 2023 framework, the CCPA can impose a fine of up to ₹50 lakh on an advertiser for a first offence (up to ₹10 lakh on endorsers).',
    hints: [
      'The fine on the advertiser is five times the maximum fine on a celebrity endorser.',
      'It can reach half a crore rupees.',
      'The correct penalty limit is ₹50 lakh.',
    ],
  },
  {
    id: 'ch_006_f',
    nodeId: NODE_C12_COMM_052,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Drag each PLC phase to its corresponding position on the product life cycle curve.',
    dragItems: [
      { label: 'Introduction', targetId: 'plc_intro' },
      { label: 'Growth', targetId: 'plc_growth' },
      { label: 'Maturity', targetId: 'plc_maturity' },
      { label: 'Decline', targetId: 'plc_decline' },
    ],
    correctMapping: {
      plc_intro: 'Introduction',
      plc_growth: 'Growth',
      plc_maturity: 'Maturity',
      plc_decline: 'Decline',
    },
    explanation:
      'The sequential path of sales is: (1) Introduction (slow initial sales), (2) Growth (rapid climb, competitors enter), (3) Maturity (peak and plateau), and (4) Decline (sales and profits slide).',
    hints: [
      'Phase 1 starts right at launch on the far left.',
      'Phase 2 shows steep upward momentum.',
      'Phase 3 is the flat peak plateau; Phase 4 drops downward.',
    ],
  },
  {
    id: 'ch_007_f',
    nodeId: NODE_C12_COMM_054,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Arrange the statutory judicial hierarchy of consumer grievance appeals in correct ascending order (from ground level to apex).',
    sortItems: [
      'District Consumer Commission',
      'State Consumer Disputes Redressal Commission',
      'National Consumer Disputes Redressal Commission (NCDRC)',
      'Supreme Court of India',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'The appeal path is strictly hierarchical: District Commission (up to ₹1 Cr) → State Commission (₹1 Cr–₹10 Cr) → National Commission / NCDRC (>₹10 Cr) → Supreme Court of India.',
    hints: [
      'Start at the local district level.',
      'State comes before National.',
      'The Supreme Court is the apex constitutional body of India.',
    ],
  },

  // --- STANDARD ---
  {
    id: 'ch_008_s',
    nodeId: NODE_C12_COMM_051,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'Why does undisclosed influencer marketing pose a more severe consumer protection hazard than traditional celebrity TV ads?',
    options: [
      'Celebrity TV ads are completely immune from ASCI and CPA 2019 regulations',
      'Followers develop parasocial trust with niche creators, mistaking paid promotional endorsements for authentic peer recommendations',
      'Influencer posts cost hundreds of crores, forcing consumers to pay inflated prices',
      'Digital algorithms make it technically impossible to file a legal complaint against online influencers',
    ],
    correctIndex: 1,
    explanation:
      'Parasocial interaction makes followers feel a personal friendship with the creator. When commercial compensation is concealed, followers’ natural commercial scepticism is bypassed, making mandatory #ad disclosures vital.',
    hints: [
      'Think about the psychological bond between social media followers and creators.',
      'Viewers know film stars are paid actors, but assume creators only recommend things they love.',
      'This emotional one-way trust is known as parasocial trust.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_009_s',
    nodeId: NODE_C12_COMM_053,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Ramesh, an electrician in Bhopal, buys a heavy-duty drill machine for ₹18,000 for use in his self-employed electrical repair work. The motor burns out in 4 days. Can Ramesh file a consumer complaint under CPA 2019 Section 2(7)?',
    options: [
      'No — commercial use of any kind is strictly barred from the definition of "consumer"',
      'Yes — Section 2(7) contains an explicit exception for self-employed persons buying goods to earn their livelihood',
      'No — only large registered companies can file complaints in consumer forums',
      'Yes — but only if he approaches the Supreme Court of India directly',
    ],
    correctIndex: 1,
    explanation:
      'Under Section 2(7) of CPA 2019, while commercial resale is excluded, self-employed persons using goods/tools exclusively for the purpose of earning their livelihood ARE recognised as consumers.',
    hints: [
      'Is Ramesh reselling the drill in a shop, or using it himself to earn a living?',
      'Check the 2019 self-employment exception to commercial exclusion.',
      'Ramesh is a self-employed craftsman earning his livelihood, so he qualifies.',
    ],
  },
  {
    id: 'ch_010_s',
    nodeId: NODE_C12_COMM_054,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'A luxury car owner in Kochi suffers ₹88 lakh vehicle damage due to a manufacturing defect and claims ₹15 lakh additional compensation for safety hazards. What is the total claim value in Lakhs, and which commission has jurisdiction?',
    correctAnswer: 103,
    tolerance: 0.5,
    unit: 'Lakhs (₹1.03 Cr → State Commission)',
    explanation:
      '₹88L + ₹15L = ₹103 Lakhs (₹1.03 Crore). Because this exceeds ₹1 Crore but is below ₹10 Crore, it falls under the State Consumer Disputes Redressal Commission.',
    hints: [
      'Add the damage claim and compensation claim together: 88 + 15.',
      '88 + 15 = 103 Lakhs = ₹1.03 Crore.',
      'Enter 103 as the numeric value.',
    ],
  },
  {
    id: 'ch_011_s',
    nodeId: NODE_C12_COMM_052,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Cadbury Dairy Milk Silk saw plateauing revenue around ₹800 crore in 2018. Cadbury introduced Silk Oreo, Silk Bubbly, and Silk Mousse, boosting sales to ₹2,000 crore. Which PLC extension strategy was executed?',
    options: [
      'Product Modification / Line Extension',
      'Geographic Market Relocation',
      'Surrogate Brand Transition',
      'Planned Obsolescence',
    ],
    correctIndex: 0,
    explanation:
      'Cadbury modified the product recipe and created variant line extensions (Oreo, Bubbly, Mousse), creating new use occasions and reviving maturity-stage revenue without changing the core brand name.',
    hints: [
      'Did Cadbury change the market location, or add new flavours and textures to the chocolate bar?',
      'Adding Oreo pieces or aerated bubbles modifies the product offering.',
      'This is Product Modification / Line Extension.',
    ],
  },
  {
    id: 'ch_012_s',
    nodeId: NODE_C12_COMM_055,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'During IPL broadcasts, liquor companies air advertisements for "packaged drinking water" and "club soda" sharing identical logos, fonts, and colour schemes. Under CCPA 2022/2023 guidelines, what is this practice called and what is its legal status?',
    options: [
      'Digital Retargeting — completely legal if certified by FSSAI',
      'Surrogate Advertising — strictly prohibited as misleading brand promotion for restricted goods',
      'Influencer Endorsement — legal with a simple disclaimer',
      'Comparative Advertising — permitted under fair-use trade doctrine',
    ],
    correctIndex: 1,
    explanation:
      'Surrogate advertising uses a permitted product (water/soda/CDs) to circumvent bans on restricted products (liquor/tobacco). The CCPA 2022 Guidelines and CPA 2023 explicitly prohibit surrogate advertisements.',
    hints: [
      'The soda shares the brand name and look of an alcoholic beverage.',
      'It acts as a substitute or proxy ("surrogate") for the banned ad.',
      'Surrogate advertising is strictly banned by CCPA.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_013_s',
    nodeId: NODE_C12_COMM_053,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Under Section 69 of CPA 2019, what is the limitation period within which a consumer must file a formal complaint from the date the cause of action arose?',
    options: [
      '30 days from purchase',
      '6 months from defect discovery',
      '2 years from the date the cause of action arose',
      '5 years under the general law of torts',
    ],
    correctIndex: 2,
    explanation:
      'Section 69 stipulates a 2-year limitation period from the date the cause of action arose. (Note: The 30-day window under Section 67 is for filing an APPEAL against a commission order).',
    hints: [
      'Do not confuse the appeal window with the original filing limitation.',
      'Initial complaints have a multi-year window to allow defect discovery.',
      'The limitation period is 2 years.',
    ],
  },
  {
    id: 'ch_014_s',
    nodeId: NODE_C12_COMM_055,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Assemble the complete legal penalty package imposed on a celebrity endorser for a FIRST-TIME misleading endorsement under CPA 2019/2023.',
    availableParts: [
      'Fine up to ₹10 Lakh',
      'Fine up to ₹50 Lakh',
      'Ban on endorsements up to 1 Year',
      'Ban on endorsements up to 3 Years',
      'Permanent cancellation of passport',
    ],
    targetState: 'Fine up to ₹10 Lakh + Ban on endorsements up to 1 Year',
    validationHint:
      'Select the two specific statutory penalties (monetary fine + endorsement suspension duration) for a first offence.',
    explanation:
      'For a celebrity endorser, a first offence carries a fine of up to ₹10 lakh AND a prohibition from endorsing that class of goods/services for up to 1 year (subsequent offences escalate to up to 3 years ban).',
    hints: [
      'The endorser fine maxes out at ₹10 Lakh, not ₹50 Lakh (₹50L is for the company).',
      'The initial ban period is 1 year.',
      'Combine "Fine up to ₹10 Lakh" and "Ban on endorsements up to 1 Year".',
    ],
  },

  // --- ADVANCED ---
  {
    id: 'ch_015_a',
    nodeId: NODE_C12_COMM_052,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Bajaj Auto discontinued the geared Chetak scooter in 2005 when annual sales dropped to 5,000 units, pivoting R&D to Pulsar motorcycles. Why was withdrawal correct instead of spending capital on extension strategies?',
    options: [
      'Geared scooters suffered from temporary seasonal variation that resolved naturally by 2008',
      'The entire product category was structurally displaced by ungeared scooters and motorcycles; extending a dying technology burns vital capital',
      'CPA 2019 legally mandates product withdrawal whenever profits drop below 10%',
      'The Chetak scooter had violated BIS emission norms and faced Supreme Court bans',
    ],
    correctIndex: 1,
    explanation:
      'Extension strategies succeed when the category is healthy and only the variant is tired (e.g. Cadbury Silk). When the underlying technology/category is structurally obsolete (geared scooters), withdrawal is the correct strategic move.',
    hints: [
      'Consider the difference between a tired brand variant and a structurally obsolete product category.',
      'Were Indian commuters switching to 4-stroke motorcycles and gearless Activas?',
      'Withdrawal prevents burning capital on an obsolete technology platform.',
    ],
  },
  {
    id: 'ch_016_a',
    nodeId: NODE_C12_COMM_054,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'A consumer receives an adverse order from the State Consumer Commission on 1st October. By what date must she file an appeal before the NCDRC under Section 67?',
    options: [
      'Within 30 days (by 31st October, extendable by 15 days on sufficient cause)',
      'Within 2 years under the general limitation clause',
      'Within 14 days strictly without any extension provision',
      'Appeals from State Commissions can only be heard by High Courts under Article 226',
    ],
    correctIndex: 0,
    explanation:
      'Under Section 67 of CPA 2019, any party aggrieved by an order of the State Commission may prefer an appeal to the NCDRC within 30 days from the date of the order (condonable by up to 15 days on sufficient cause).',
    hints: [
      'Remember the distinction between the 2-year initial complaint limitation and the appeal clock.',
      'All inter-commission appeals have a 30-day statutory window.',
      'The appeal must be filed within 30 days.',
    ],
  },
  {
    id: 'ch_017_a',
    nodeId: NODE_C12_COMM_055,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'In the Supreme Court 2023–2024 Patanjali Ayurved contempt proceedings, why did the Court initiate severe action over advertisements claiming cures for COVID-19, diabetes, and hypertension?',
    options: [
      'Patanjali failed to pay corporate income taxes on digital advertising spend',
      'Misleading health claims about incurable diseases induce consumers to abandon evidence-based clinical treatment, causing grave public health harm and violating Court undertakings',
      'Ayurvedic products are completely banned from television broadcasting under the DPDP Act 2023',
      'Patanjali used foreign actors without mandatory Ministry of External Affairs clearances',
    ],
    correctIndex: 1,
    explanation:
      'Misleading health cure claims violate Section 2(28) and Drugs and Magic Remedies Act. They carry severe hazards because vulnerable patients may stop critical medical care, making it an egregious breach of the consumer’s Right to Safety and Right to Information.',
    hints: [
      'Consider the bodily danger when a diabetic stops insulin based on a false advertisement.',
      'Health claims without clinical backing threaten consumer life.',
      'It causes patients to abandon evidence-based treatments.',
    ],
  },
  {
    id: 'ch_018_a',
    nodeId: NODE_C12_COMM_051,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'An organic skincare startup has a ₹1.5 crore annual marketing budget. How should it allocate funds across digital channels for maximum credible customer acquisition?',
    options: [
      'Spend 100% on a 10-second prime-time TV slot during the ICC World Cup Final',
      'Allocate ~70% to Instagram skincare micro-influencers with verified #ad tags, 20% to Search Ads for high-intent keywords, and 10% to educational brand-handle reels',
      'Hire a top Bollywood film star for ₹1.45 crore and spend ₹5 lakh on SMS blasting',
      'Print 50 lakh paper brochures and distribute them at Mumbai railway stations',
    ],
    correctIndex: 1,
    explanation:
      'For a niche, high-trust category like skincare, micro-influencers provide high engagement and parasocial trust within budget, Search captures active demand, and social handles build brand community.',
    hints: [
      'Mass TV or a single celebrity would exhaust the entire ₹1.5 Cr budget in one go.',
      'Skincare requires demonstration, peer trust, and search discovery.',
      'A blend of micro-influencers, search intent ads, and brand content is optimal.',
    ],
  },
  {
    id: 'ch_019_a',
    nodeId: NODE_C12_COMM_053,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'In the 2015 Maggi recall (38,000 tonnes withdrawn over lead and unlabelled MSG), which triad of consumer protection mechanisms operated in harmony?',
    options: [
      'Self-Help (lab test vigil) + Legislative (FSSAI statutory recall) + NGO (CGSI/public interest advocacy)',
      'Judicial class-action + Police FIRs + Reserve Bank of India moratorium',
      'International Court of Justice + SEBI delisting + Consumer strike',
      'Corporate voluntary recall + Ministry of Defense inspection + WTO sanctions',
    ],
    correctIndex: 0,
    explanation:
      'The Maggi case exemplified all 3 methods: laboratory vigilance (Self-help/Preventive), statutory food safety intervention under statutory authority (Legislative), and consumer guidance group pressure (NGO advocacy).',
    hints: [
      'Identify the three statutory/civic methods of consumer protection in India.',
      'Self-help, Legislative action, and Consumer NGO advocacy.',
      'The correct answer unites Self-Help, Legislative, and NGO methods.',
    ],
  },
  {
    id: 'ch_020_a',
    nodeId: NODE_C12_COMM_054,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'A homebuyers association files a collective joint claim against an insolvent builder in Noida for non-delivery of 40 luxury penthouses, claiming ₹14.5 Crore refund. Which commission handles this, and what is the statutory appeal period (in days) if aggrieved?',
    correctAnswer: 30,
    tolerance: 0,
    unit: 'Days to appeal to Supreme Court (NCDRC jurisdiction >₹10 Cr)',
    explanation:
      'Since the claim is ₹14.5 Crore (>₹10 Crore), original jurisdiction lies directly with the National Commission (NCDRC) in New Delhi. Under Section 67, an appeal against NCDRC original orders lies to the Supreme Court of India within 30 days.',
    hints: [
      'First check the threshold: >₹10 Cr goes to NCDRC.',
      'Next check the statutory appeal clock under Section 67.',
      'Enter the appeal window: 30 days.',
    ],
  },
];

// ==========================================
// INTERACTIVE EXPLORATION STEPS
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Digital Marketing & Influencer Trust Matrix',
    instruction:
      'Toggle between Celebrity Endorsement and Niche Influencer to see how trust depth, reach, and cost compare in real-time.',
    interactionType: 'toggle-trust',
    nodeId: NODE_C12_COMM_051,
  },
  {
    title: 'Interactive Product Life Cycle (PLC) Simulator',
    instruction:
      'Drag the Time slider across the product journey to observe how Sales, R&D/Unit Cost, Competition, and Profit dynamics evolve.',
    interactionType: 'slider-plc',
    nodeId: NODE_C12_COMM_052,
  },
  {
    title: 'CPA 2019 "Who is a Consumer?" Gatekeeper',
    instruction:
      'Test different commercial transactions against Section 2(7) criteria to see who qualifies for consumer dispute redressal.',
    interactionType: 'click-gatekeeper',
    nodeId: NODE_C12_COMM_053,
  },
  {
    title: 'Three-Tier Pecuniary Jurisdiction Calculator',
    instruction:
      'Adjust the claim value slider from ₹1 Lakh to ₹20 Crore and watch the case route automatically to District, State, or National Commission.',
    interactionType: 'slider-jurisdiction',
    nodeId: NODE_C12_COMM_054,
  },
  {
    title: 'CPA 2023 Misleading Ad & Surrogate Scanner',
    instruction:
      'Inspect an advertisement banner, identify deceptive claims (#ad omission, cure guarantees, surrogate branding), and issue CCPA penalties.',
    interactionType: 'click-scanner',
    nodeId: NODE_C12_COMM_055,
  },
];

// ==========================================
// PREDICT-THEN-CHECK QUESTIONS
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question:
      'PREDICT: If a consumer dispute claim is exactly ₹1.00 Crore (₹100 Lakhs), which forum has jurisdiction under CPA 2019 Rule 21?',
    options: [
      'District Commission (jurisdiction is "up to ₹1 Crore")',
      'State Commission (jurisdiction begins strictly at ₹1 Crore)',
      'Directly to National Commission (NCDRC)',
      'Civil Court only',
    ],
    correctIndex: 0,
    verifyInstruction:
      'Now drag the claim slider to exactly ₹100 Lakhs (₹1.00 Cr) to verify which commission lights up!',
    nodeId: NODE_C12_COMM_054,
  },
  {
    question:
      'PREDICT: During which stage of the PLC does total market competition reach its maximum peak, triggering intense price wars and line extensions?',
    options: ['Introduction Stage', 'Growth Stage', 'Maturity Stage', 'Product Development Stage'],
    correctIndex: 2,
    verifyInstruction:
      'Move the PLC time slider into the Maturity stage (50% - 80%) to verify competitor count and price war metrics.',
    nodeId: NODE_C12_COMM_052,
  },
];

// ==========================================
// OBSERVATION QUESTIONS
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question:
      'OBSERVATION: What happens to net profit during the late Maturity to Decline phase as promotional spending fights saturated demand?',
    observableOptions: [
      'Net profit explodes to all-time record highs',
      'Net profit margin erodes rapidly as price competition intensifies and volume plateaus',
      'Profit stays 100% constant regardless of competitors',
      'Profit converts to zero production cost',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_COMM_052,
  },
  {
    question:
      'OBSERVATION: When switching from a TV Celebrity to a Micro-Influencer in the Trust Matrix, what happens to the "Parasocial Trust" gauge?',
    observableOptions: [
      'It drops to zero because TV is more trusted',
      'It rises significantly from broad/shallow to deep/niche',
      'It remains unchanged',
      'It converts into a legal liability automatically',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_COMM_051,
  },
];

// ==========================================
// REAL WORLD ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'VedaGlow Boardroom Audit & CCPA Defence',
  description:
    'Synthesise your learnings: Review your company’s social influencer contracts, audit an aging product SKU for PLC extension vs withdrawal, and establish an SOP for consumer grievance escalations under CPA 2019/2023.',
  steps: [
    'Audit all sponsored Instagram reels for explicit "#ad" / "Paid Partnership" disclosures.',
    'Map your product portfolio on the PLC: Decide whether to extend (Silk Oreo model) or withdraw (Bajaj Chetak model).',
    'Calculate the exact fee slab and jurisdiction tier for pending warranty claims on the e-Daakhil portal.',
    'Verify that health claims on packaging are backed by ICMR/AYUSH clinical trials to prevent CCPA action.',
  ],
};

// ==========================================
// COMPONENT PROPS & DEFAULTS
// ==========================================
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
  nodeId: NODE_C12_COMM_051,
  title: 'Digital Marketing, PLC & Consumer Protection Framework (CPA 2019/2023)',
  definition:
    'A comprehensive examination of digital/influencer promotion channels, the Product Life Cycle trajectory and extension strategies, consumer rights and self-help/NGO methods under CPA 2019, the three-tier pecuniary redressal hierarchy, and CCPA enforcement against misleading and surrogate advertisements.',
  eli5:
    'Think of digital marketing as putting posters in a friend’s digital room, the product life cycle as a human lifetime from childhood to old age, and consumer protection as the umpire in a cricket match making sure neither the batsman nor bowler cheats!',
  misconceptions: [
    {
      misconception: 'Influencer marketing is just celebrity endorsement on Instagram.',
      correction:
        'Celebrities possess broad fame in unrelated fields with shallow trust; influencers build deep parasocial trust in specific niches at far lower cost.',
    },
    {
      misconception: 'Social media marketing and influencer marketing are identical concepts.',
      correction:
        'The test is "Whose handle?": Brand’s own handle = Social Media Marketing; Creator’s personal handle = Influencer Marketing.',
    },
    {
      misconception:
        'The District Commission hears claims up to ₹20 lakh under the Consumer Protection Act.',
      correction:
        '₹20 lakh was the outdated 1986 limit. Under CPA 2019 / Rules 2020, District jurisdiction is up to ₹1 Crore.',
    },
    {
      misconception: 'Surrogate advertising is legal because the advertised product (soda/water) is legal.',
      correction:
        'Surrogate advertising is explicitly banned under CCPA 2022 Guidelines and CPA 2023 if it promotes a restricted brand name or visual identity.',
    },
    {
      misconception: 'A product entering decline means the entire company is failing.',
      correction:
        'Decline applies to an individual product SKU. Healthy multi-product companies manage portfolios across different PLC stages simultaneously.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which test distinguishes Social Media Marketing from Influencer Marketing?',
      options: ['The budget test', 'The "Whose Handle?" test', 'The camera resolution test', 'The payment method test'],
      correctIndex: 1,
    },
    {
      question: 'What is the pecuniary limit of the District Consumer Commission under CPA 2019?',
      options: ['Up to ₹20 Lakh', 'Up to ₹50 Lakh', 'Up to ₹1 Crore', 'Above ₹10 Crore'],
      correctIndex: 2,
    },
    {
      question: 'What is the maximum penalty on a celebrity endorser for a first misleading ad offence?',
      options: ['₹50 Lakh fine', '₹10 Lakh fine + 1-year endorsement ban', 'Lifetime imprisonment', '₹1 Lakh fine only'],
      correctIndex: 1,
    },
    {
      question: 'A farmer buying a tractor for farming his land is a consumer under CPA 2019 because:',
      options: ['Agriculture has zero taxes', 'Self-employed livelihood use is explicitly included', 'Tractors are not vehicles', 'Farmers cannot sign contracts'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Student understands digital vs influencer promotion, executes PLC strategies, applies Section 2(7) definitions, calculates 3-tier pecuniary jurisdiction, and analyses CPA 2023 misleading advertisement liabilities.',
};

// ==========================================
// MAIN COMPONENT FUNCTION
// ==========================================
function C12_CommerceDigitalMarketingSocialSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_COMM_051,
  title = DEFAULT_PROPS.title || 'Digital Marketing & Consumer Protection',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['commstud'] || {
    name: 'ISC Commerce',
    emoji: '📊',
    color: 'indigo',
  };

  // State Declarations
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict-then-Check State
  const [predictionMade, setPredictionMade] = useState(false);
  const [, setPredictionIndex] = useState(-1);

  // Observation State
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [, setObservationIndex] = useState(-1);

  // Sandbox State
  const [sandboxMode, setSandboxMode] = useState<'plc' | 'jurisdiction' | 'trust'>('plc');

  // Interactive Lab 1: Influencer Trust Matrix State
  const [selectedEndorserType, setSelectedEndorserType] = useState<'celebrity' | 'influencer'>('influencer');

  // Interactive Lab 2: PLC Dynamic Graph State
  const [plcTimeIndex, setPlcTimeIndex] = useState(25); // 0 to 100
  const [plcExtensionActive, setPlcExtensionActive] = useState(false);

  // Interactive Lab 3: Consumer Gatekeeper State
  const [selectedGatekeeperCase, setSelectedGatekeeperCase] = useState<number>(0);
  const [gatekeeperFeedback, setGatekeeperFeedback] = useState<string | null>(null);

  // Interactive Lab 4: Redressal Claim Slider State
  const [claimAmountInLakhs, setClaimAmountInLakhs] = useState<number>(45); // 1 to 2000 (20 Cr)

  // Interactive Lab 5: Misleading Ad Scanner State
  const [scannedDefects, setScannedDefects] = useState<string[]>([]);

  // Challenge Interaction State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Escalating Hints State
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag & Drop / Numeric / Construct State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Feedback State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection responses
  const [reflections, setReflections] = useState<Record<string, string>>({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered Challenges
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') {
      return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    }
    if (difficulty === 'standard') {
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    }
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Computed Pecuniary Jurisdiction
  const activeJurisdiction = useMemo(() => {
    if (claimAmountInLakhs <= 100) {
      return {
        name: 'District Consumer Commission',
        president: 'Sitting / Retired District Judge',
        members: 'Min. 2 Members (1 Woman)',
        fee: claimAmountInLakhs <= 5 ? '₹100' : claimAmountInLakhs <= 50 ? '₹500' : '₹2,000',
        appealTo: 'State Commission (within 30 days)',
        color: 'emerald',
      };
    } else if (claimAmountInLakhs <= 1000) {
      return {
        name: 'State Consumer Commission',
        president: 'Sitting / Retired High Court Judge',
        members: 'Min. 4 Members (1 Woman)',
        fee: '₹5,000',
        appealTo: 'National Commission / NCDRC (within 30 days)',
        color: 'indigo',
      };
    } else {
      return {
        name: 'National Commission (NCDRC, New Delhi)',
        president: 'Sitting / Retired Supreme Court Judge',
        members: 'Min. 4 Members',
        fee: '₹7,500',
        appealTo: 'Supreme Court of India (within 30 days)',
        color: 'rose',
      };
    }
  }, [claimAmountInLakhs]);

  // PLC Graph Data Generation
  const plcChartData = useMemo(() => {
    const points = [];
    for (let t = 0; t <= 100; t += 5) {
      let sales = 0;
      let profit = 0;

      if (t < 20) {
        sales = (t / 20) * 25;
        profit = -15 + (t / 20) * 15;
      } else if (t < 50) {
        sales = 25 + ((t - 20) / 30) * 60;
        profit = ((t - 20) / 30) * 55;
      } else if (t < 80) {
        const pFactor = (t - 50) / 30;
        if (plcExtensionActive) {
          sales = 85 + pFactor * 35;
          profit = 55 + pFactor * 10;
        } else {
          sales = 85 - pFactor * 15;
          profit = 55 - pFactor * 35;
        }
      } else {
        const dFactor = (t - 80) / 20;
        if (plcExtensionActive) {
          sales = 120 - dFactor * 25;
          profit = 65 - dFactor * 20;
        } else {
          sales = 70 - dFactor * 55;
          profit = 20 - dFactor * 30;
        }
      }

      points.push({
        time: t,
        Sales: Math.max(0, Math.round(sales)),
        Profit: Math.round(profit),
      });
    }
    return points;
  }, [plcExtensionActive]);

  const currentPlcStage = useMemo(() => {
    if (plcTimeIndex < 20) return { name: 'Introduction', buyers: 'Innovators', competition: 'Low / Few' };
    if (plcTimeIndex < 50) return { name: 'Growth', buyers: 'Early Adopters', competition: 'Rapidly Entering' };
    if (plcTimeIndex < 80) return { name: 'Maturity', buyers: 'Mass Market', competition: 'Intense / Peak Price Wars' };
    return { name: 'Decline', buyers: 'Laggards', competition: 'Exiting / Consolidating' };
  }, [plcTimeIndex]);

  // Load Initial Mastery
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adapt Difficulty
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

  // Canvas Animation
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

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      const time = frame * 0.04;
      for (let i = 0; i < 5; i++) {
        const x = ((time * 60 + i * 90) % (canvas.width + 40)) - 20;
        const y = canvas.height / 2 + Math.sin(time + i) * 14;
        const radius = 3 + Math.sin(time * 2 + i) * 1.5;

        ctx.beginPath();
        ctx.arc(x, y, Math.max(1, radius), 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? '#6366f1' : '#10b981';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Inactivity Auto-hint
  useEffect(() => {
    if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = setTimeout(() => {
        if (challenge.hints && challenge.hints[0]) {
          setCurrentHint(challenge.hints[0]);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
        }
      }, 10000);
    }
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [phase, currentChallenge, answerRevealed, hintCount, challenge]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
  }, []);

  const showNextHint = useCallback(() => {
    resetInactivityTimer();
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us study the complete solution step-by-step.');
    }
  }, [hintCount, challenge, resetInactivityTimer]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Spot on! Parasocial trust is the secret engine of modern D2C marketing.');
    } else {
      audioManager.play('pop');
      speechManager.speak(DISCOVERY_QUESTION.hintAfter);
    }
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive labs. Interact with each simulation to uncover key concepts.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Experiment with any model without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Commencing the board mastery challenges. Best of luck!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Manipulate the model below to verify your answer.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp analytical observation!' : 'Check the data curves closely.');
  }, []);

  const handleToggleEndorser = useCallback((type: 'celebrity' | 'influencer') => {
    setSelectedEndorserType(type);
    audioManager.play('tap');
  }, []);

  const handleScanAdDefect = useCallback((defectKey: string) => {
    setScannedDefects((prev) => {
      const exists = prev.includes(defectKey);
      const updated = exists ? prev.filter((d) => d !== defectKey) : [...prev, defectKey];
      audioManager.play(exists ? 'pop' : 'sparkle');
      return updated;
    });
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered Digital Marketing, the PLC, and the Consumer Protection framework!');
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    resetInactivityTimer();
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setSelectedOption(null);
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
  }, [currentChallenge, filteredChallenges.length, handleComplete, resetInactivityTimer]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      resetInactivityTimer();
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        setSelectedOption(answer as number);
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Excellent analysis! Completely correct.');
        setShowConfetti(true);
        setShowExplanation(true);

        bktStateRef.current = bktUpdate(bktStateRef.current, true);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4500);
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
          speechManager.speak('Let us review why this is the statutory rule.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4500);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
    },
    [challenge, hintCount, hitMisconceptions, resetInactivityTimer, showNextHint]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isTargetCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isTargetCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback(
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        const arr = prev.length === 0 ? (challenge.sortItems ? challenge.sortItems.map((_, i) => i) : []) : [...prev];
        const [moved] = arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleGatekeeperCheck = useCallback((caseIdx: number, userVerdict: boolean) => {
    setSelectedGatekeeperCase(caseIdx);
    const testCases = [
      { isConsumer: false, reason: 'Buying 100 bags of rice for commercial resale in a Kirana shop is excluded under Sec 2(7).' },
      { isConsumer: true, reason: 'A self-employed tailor buying a sewing machine for earning his livelihood IS a consumer under Sec 2(7).' },
      { isConsumer: true, reason: 'An individual buying a Samsung phone for personal communication qualifies as an end-consumer.' },
      { isConsumer: false, reason: 'A hospital buying an MRI machine for multi-crore commercial hospital billing is commercial purpose.' },
    ];
    const correctVerdict = testCases[caseIdx].isConsumer;
    if (userVerdict === correctVerdict) {
      audioManager.play('drop-correct');
      setGatekeeperFeedback(`✓ Correct! ${testCases[caseIdx].reason}`);
    } else {
      audioManager.play('drop-wrong');
      setGatekeeperFeedback(`✗ Incorrect. ${testCases[caseIdx].reason}`);
    }
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-gold-600 to-purple-600 flex items-center justify-center text-2xl shadow-lg shadow-gold-500/20"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/30">
                ISC CLASS 12 COMMERCE
              </span>
              <span className="text-xs text-slate-400 font-mono">NEP 2020 / CISCE 2026</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Dynamic Status / Canvas Indicator */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block w-36 h-8 bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
            <canvas ref={canvasRef} width={144} height={32} className="w-full h-full" />
          </div>
          <motion.div
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : difficulty === 'advanced'
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                : 'bg-gold-500/10 text-gold-400 border-gold-500/30'
            }`}
          >
            {difficulty} TIER
          </motion.div>
        </div>
      </motion.div>

      {/* Main Flow Container */}
      <div className="mt-6">
        {/* ========================================================= */}
        {/* PHASE 1: DISCOVERY HOOK */}
        {/* ========================================================= */}
        {phase === 'discovery' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-900 border border-gold-800/60 shadow-xl">
              <div className="flex items-center gap-2 text-gold-400 text-sm font-semibold mb-2">
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                D2C MARKET SCENARIO
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-400">
                <strong className="text-slate-200">Legal & Strategic Context:</strong> {SCENARIO.context}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                  Curiosity Discovery Question
                </h3>
                <span className="text-xs text-slate-400">Not Graded • Explore Your Intuition</span>
              </div>
              <p className="text-base text-slate-100 font-medium leading-snug">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    aria-label={`Discovery option ${i + 1}: ${opt}`}
                    className={`text-left p-4 rounded-xl text-sm transition-all border ${
                      discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950'
                        : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                        ? 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-700/60 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
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
                  className="mt-4 p-4 rounded-xl bg-gold-950/40 border border-gold-700/50 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <p className="text-xs sm:text-sm text-gold-200">
                    {discoveryCorrect
                      ? '🎯 Perfect Intuition! Discover how parasocial trust contrasts with celebrity endorsements in Lab 1.'
                      : `💡 Key Insight: ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-purple-600 hover:from-gold-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-gold-600/30 text-sm whitespace-nowrap"
                  >
                    Enter Interactive Labs →
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* PHASE 2: INTERACTIVE EXPLORATION */}
        {/* ========================================================= */}
        {phase === 'explore' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Step Selector Tabs */}
            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-thin">
              {EXPLORATION_STEPS.map((step, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setCurrentSlide(idx);
                    audioManager.play('tap');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    currentSlide === idx
                      ? 'bg-gold-600 text-white border-gold-400 shadow-lg shadow-gold-600/30'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  Lab {idx + 1}: {step.title.split(' ')[0]}
                </motion.button>
              ))}
            </div>

            {/* Active Lab Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-gold-400 tracking-wider uppercase">
                      Interactive Simulation Lab {currentSlide + 1} of 5
                    </span>
                    <span className="text-xs text-slate-400 font-mono">ISC NODE: {EXPLORATION_STEPS[currentSlide].nodeId}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    {EXPLORATION_STEPS[currentSlide].title}
                  </h2>
                  <p className="text-sm text-amber-400 mt-1 flex items-center gap-1.5">
                    <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                  </p>
                </div>

                {/* -------------------------------------------------- */}
                {/* LAB 1: Digital Marketing & Influencer Trust Matrix */}
                {/* -------------------------------------------------- */}
                {currentSlide === 0 && (
                  <div className="space-y-6">
                    {/* SVG Diagram 1: Digital vs Influencer Trust Model */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="text-xs font-mono text-slate-400 mb-2">ARCHITECTURAL DIAGRAM: Trust & Reach Dynamics</div>
                      <svg viewBox="0 0 700 180" className="w-full h-auto" aria-label="Digital Marketing vs Influencer Trust Architecture">
                        {/* Background Grids */}
                        <rect x="10" y="10" width="320" height="160" rx="12" fill="#1e1b4b" fillOpacity="0.4" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 4" />
                        <rect x="370" y="10" width="320" height="160" rx="12" fill="#3b0764" fillOpacity="0.4" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 4" />
                        
                        {/* Column 1: Celebrity TV */}
                        <text x="170" y="35" textAnchor="middle" fill="#818cf8" fontWeight="bold" fontSize="13">TRADITIONAL CELEBRITY BROADCAST</text>
                        <circle cx="70" cy="90" r="24" fill="#312e81" stroke="#6366f1" strokeWidth="2" />
                        <text x="70" y="95" textAnchor="middle" fill="#ffffff" fontSize="18">🌟</text>
                        <text x="70" y="130" textAnchor="middle" fill="#c7d2fe" fontSize="10">Film Star</text>

                        {/* Broadcast arrows */}
                        <path d="M100 80 L220 55" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow)" />
                        <path d="M100 90 L220 90" stroke="#6366f1" strokeWidth="2" />
                        <path d="M100 100 L220 125" stroke="#6366f1" strokeWidth="2" />
                        
                        <rect x="220" y="50" width="90" height="75" rx="8" fill="#1e293b" stroke="#475569" />
                        <text x="265" y="72" textAnchor="middle" fill="#94a3b8" fontSize="10">Mass Audience</text>
                        <text x="265" y="90" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">Shallow Trust</text>
                        <text x="265" y="110" textAnchor="middle" fill="#f87171" fontSize="9">1-Way Broadcast</text>

                        {/* Column 2: Influencer Marketing */}
                        <text x="530" y="35" textAnchor="middle" fill="#c084fc" fontWeight="bold" fontSize="13">INFLUENCER PARASOCIAL ENGAGEMENT</text>
                        <circle cx="430" cy="90" r="24" fill="#581c87" stroke="#a855f7" strokeWidth="2" />
                        <text x="430" y="95" textAnchor="middle" fill="#ffffff" fontSize="18">📱</text>
                        <text x="430" y="130" textAnchor="middle" fill="#e9d5ff" fontSize="10">Micro-Creator</text>

                        {/* Interactive two way arrows */}
                        <path d="M460 85 C510 65, 530 65, 570 80" fill="none" stroke="#a855f7" strokeWidth="2.5" />
                        <path d="M570 95 C530 110, 510 110, 460 95" fill="none" stroke="#34d399" strokeWidth="2.5" />

                        <rect x="575" y="50" width="100" height="75" rx="8" fill="#1e293b" stroke="#a855f7" />
                        <text x="625" y="72" textAnchor="middle" fill="#e9d5ff" fontSize="10">Niche Community</text>
                        <text x="625" y="90" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">Deep Peer Trust</text>
                        <text x="625" y="110" textAnchor="middle" fill="#fbbf24" fontSize="9">2-Way Conversation</text>
                      </svg>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleToggleEndorser('celebrity')}
                        className={`flex-1 p-4 rounded-2xl border text-left transition-all ${
                          selectedEndorserType === 'celebrity'
                            ? 'bg-gold-950/80 border-gold-500 shadow-lg shadow-gold-950'
                            : 'bg-slate-950 border-slate-800 opacity-60'
                        }`}
                      >
                        <div className="text-lg">🎬 Film Star / Cricketer</div>
                        <div className="text-xs text-slate-400 mt-1 font-mono">Shah Rukh Khan for Lux • ₹5–₹10 Crore/yr</div>
                        <div className="text-xs text-gold-300 mt-2 font-semibold">Broad Reach • Shallow Parasocial Trust</div>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleToggleEndorser('influencer')}
                        className={`flex-1 p-4 rounded-2xl border text-left transition-all ${
                          selectedEndorserType === 'influencer'
                            ? 'bg-purple-950/80 border-purple-500 shadow-lg shadow-purple-950'
                            : 'bg-slate-950 border-slate-800 opacity-60'
                        }`}
                      >
                        <div className="text-lg">📱 Niche Mom/Tech Influencer</div>
                        <div className="text-xs text-slate-400 mt-1 font-mono">Mamaearth 500+ Moms • ₹50k–₹5 Lakh/post</div>
                        <div className="text-xs text-purple-300 mt-2 font-semibold">Niche Community • Deep Parasocial Trust</div>
                      </motion.button>
                    </div>

                    {/* Visual Comparison Dashboard */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Parasocial Trust Level</span>
                          <span className="text-gold-300 font-bold">
                            {selectedEndorserType === 'influencer' ? '92% (High / Peer)' : '28% (Commercial)'}
                          </span>
                        </div>
                        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            animate={{ width: selectedEndorserType === 'influencer' ? '92%' : '28%' }}
                            className={`h-full rounded-full ${
                              selectedEndorserType === 'influencer' ? 'bg-purple-500' : 'bg-gold-500'
                            }`}
                          />
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {selectedEndorserType === 'influencer'
                            ? 'Followers perceive recommendations as genuine peer advice.'
                            : 'Audience knows the celebrity is contractually paid to speak.'}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Target Audience Precision</span>
                          <span className="text-emerald-300 font-bold">
                            {selectedEndorserType === 'influencer' ? '95% (Niche Buyers)' : '35% (Mass Wastage)'}
                          </span>
                        </div>
                        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            animate={{ width: selectedEndorserType === 'influencer' ? '95%' : '35%' }}
                            className="h-full bg-emerald-500 rounded-full"
                          />
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {selectedEndorserType === 'influencer'
                            ? 'Mom influencers directly reach millennial mothers.'
                            : 'Reaches millions who have zero demand for the specific product.'}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Cost per Qualified Lead</span>
                          <span className="text-amber-300 font-bold">
                            {selectedEndorserType === 'influencer' ? '₹18 (Cost Efficient)' : '₹420 (High Overhead)'}
                          </span>
                        </div>
                        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            animate={{ width: selectedEndorserType === 'influencer' ? '20%' : '85%' }}
                            className="h-full bg-amber-500 rounded-full"
                          />
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Enables D2C startups to scale without ₹100 Cr traditional TV media budgets.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
                      <span className="text-amber-400 text-base">⚖️</span>
                      <div>
                        <strong className="text-white">Legal Mandate (ASCI / CPA 2019 Guidelines 2022):</strong> Because
                        parasocial trust bypasses commercial scepticism, influencers MUST prominently display #ad or #paidpartnership.
                        Undisclosed promotions trigger personal fines of up to ₹10 Lakh and endorsement bans!
                      </div>
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------- */}
                {/* LAB 2: Product Life Cycle Dynamic Simulator */}
                {/* -------------------------------------------------- */}
                {currentSlide === 1 && (
                  <div className="space-y-6">
                    {/* SVG Diagram 2: PLC Stages & Extension Strategies */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="text-xs font-mono text-slate-400 mb-2">PLC TRAJECTORY & EXTENSION JUMP</div>
                      <svg viewBox="0 0 700 160" className="w-full h-auto" aria-label="Product Life Cycle Curve Diagram">
                        {/* Axes */}
                        <line x1="40" y1="130" x2="680" y2="130" stroke="#475569" strokeWidth="2" />
                        <line x1="40" y1="130" x2="40" y2="20" stroke="#475569" strokeWidth="2" />
                        <text x="680" y="145" textAnchor="end" fill="#94a3b8" fontSize="10">Time →</text>
                        <text x="35" y="15" textAnchor="start" fill="#94a3b8" fontSize="10">Sales / Revenue ↑</text>

                        {/* Stage Background Bands */}
                        <rect x="40" y="20" width="130" height="110" fill="#6366f1" fillOpacity="0.05" />
                        <rect x="170" y="20" width="180" height="110" fill="#10b981" fillOpacity="0.05" />
                        <rect x="350" y="20" width="170" height="110" fill="#f59e0b" fillOpacity="0.05" />
                        <rect x="520" y="20" width="160" height="110" fill="#ef4444" fillOpacity="0.05" />

                        {/* Stage Labels */}
                        <text x="105" y="35" textAnchor="middle" fill="#818cf8" fontSize="11" fontWeight="bold">1. INTRO</text>
                        <text x="260" y="35" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">2. GROWTH</text>
                        <text x="435" y="35" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">3. MATURITY</text>
                        <text x="600" y="35" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">4. DECLINE</text>

                        {/* Natural Decline Path */}
                        <path d="M40 120 C100 115, 170 80, 260 45 C350 40, 430 40, 520 60 C580 85, 630 115, 680 125" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="3 3" />
                        <text x="640" y="115" fill="#f87171" fontSize="9">Natural Decline</text>

                        {/* Extension Strategy Boost Path */}
                        <path d="M430 40 C490 25, 540 22, 600 30 C640 40, 670 55, 680 65" fill="none" stroke="#10b981" strokeWidth="3" />
                        <text x="590" y="22" fill="#34d399" fontSize="10" fontWeight="bold">★ Extension Curve (Silk Oreo)</text>
                      </svg>
                    </div>

                    {/* Predict-Then-Check Container */}
                    {!predictionMade && (
                      <div className="p-4 rounded-2xl bg-gold-950/50 border border-gold-700/60 space-y-3">
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                          🔬 Predict Before Simulating:
                        </span>
                        <p className="text-sm text-slate-200">{PREDICTION_QUESTIONS[1].question}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handlePrediction(i)}
                              className="text-left p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    {predictionMade && (
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-amber-300">
                        {PREDICTION_QUESTIONS[1].verifyInstruction}
                      </div>
                    )}

                    {/* PLC Recharts Chart */}
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-slate-400 font-mono">
                            Stage: <strong className="text-gold-400 text-sm">{currentPlcStage.name}</strong>
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            Buyers: <strong className="text-emerald-400">{currentPlcStage.buyers}</strong>
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            Competition: <strong className="text-amber-400">{currentPlcStage.competition}</strong>
                          </span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setPlcExtensionActive((prev) => !prev);
                            audioManager.play('sparkle');
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                            plcExtensionActive
                              ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-600/30'
                              : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                          }`}
                        >
                          {plcExtensionActive ? '✓ Extension Strategy Active (Cadbury Silk Oreo)' : '+ Trigger Extension Strategy'}
                        </motion.button>
                      </div>

                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={plcChartData}>
                            <defs>
                              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                              </linearGradient>
                              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                            <XAxis dataKey="time" stroke="#64748b" tickFormatter={(v) => `${v}%`} />
                            <YAxis stroke="#64748b" />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                            <Area type="monotone" dataKey="Sales" stroke="#6366f1" strokeWidth={3} fill="url(#salesGradient)" />
                            <Area type="monotone" dataKey="Profit" stroke="#10b981" strokeWidth={2} fill="url(#profitGradient)" />
                            <ReferenceDot
                              x={plcTimeIndex}
                              y={plcChartData.find((p) => p.time === plcTimeIndex)?.Sales || 0}
                              r={6}
                              fill="#f59e0b"
                              stroke="#ffffff"
                              strokeWidth={2}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Interactive Real-Time Slider */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-400 font-mono">
                          <span>Intro (Launch)</span>
                          <span>Growth (Scaling)</span>
                          <span>Maturity (Plateau)</span>
                          <span>Decline (Displacement)</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          step={5}
                          value={plcTimeIndex}
                          onChange={(e) => setPlcTimeIndex(Number(e.target.value))}
                          aria-label="PLC Time Slider"
                          className="w-full accent-gold-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                        />
                      </div>
                    </div>

                    {/* Observation Question */}
                    {plcTimeIndex >= 60 && !observationAnswered && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                        <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                          👁️ Scientific Observation:
                        </p>
                        <p className="text-xs sm:text-sm text-slate-200">{OBSERVATION_QUESTIONS[0].question}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, idx) => (
                            <motion.button
                              key={idx}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handleObservation(idx)}
                              className="text-left p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* -------------------------------------------------- */}
                {/* LAB 3: Consumer Protection Gatekeeper (Sec 2(7)) */}
                {/* -------------------------------------------------- */}
                {currentSlide === 2 && (
                  <div className="space-y-6">
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                      <div className="text-sm font-bold text-slate-200">
                        Test Transactions Against Section 2(7) of CPA 2019:
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          {
                            title: '1. Kirana Merchant Buying 100 Rice Bags',
                            sub: 'Bought for resale to town consumers in his grocery shop',
                          },
                          {
                            title: '2. Tailor Buying Sewing Machine',
                            sub: 'Bought for earning livelihood in his self-employed tailoring business',
                          },
                          {
                            title: '3. Professional Buying Personal Phone',
                            sub: 'Bought for personal everyday communication and use',
                          },
                          {
                            title: '4. Private Hospital Buying MRI Scanner',
                            sub: 'Bought for large-scale multi-crore diagnostic medical billing',
                          },
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className={`p-4 rounded-xl border transition-all ${
                              selectedGatekeeperCase === idx
                                ? 'bg-gold-950/60 border-gold-500'
                                : 'bg-slate-900 border-slate-800'
                            }`}
                          >
                            <div className="font-semibold text-sm text-white">{item.title}</div>
                            <div className="text-xs text-slate-400 mt-1">{item.sub}</div>

                            <div className="flex gap-2 mt-3">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleGatekeeperCheck(idx, true)}
                                className="flex-1 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-300 text-xs font-bold"
                              >
                                ✓ Is Consumer
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleGatekeeperCheck(idx, false)}
                                className="flex-1 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/40 text-rose-300 text-xs font-bold"
                              >
                                ✗ Excluded
                              </motion.button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {gatekeeperFeedback && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 rounded-xl bg-slate-900 border border-gold-500/40 text-xs sm:text-sm text-gold-200"
                        >
                          {gatekeeperFeedback}
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------- */}
                {/* LAB 4: Three-Tier Pecuniary Jurisdiction Router */}
                {/* -------------------------------------------------- */}
                {currentSlide === 3 && (
                  <div className="space-y-6">
                    {/* SVG Diagram 3: Three Tier Quasi-Judicial Redressal Pyramid */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="text-xs font-mono text-slate-400 mb-2">QUASI-JUDICIAL REDRESSAL PYRAMID (CPA 2019)</div>
                      <svg viewBox="0 0 700 170" className="w-full h-auto" aria-label="Three-Tier Consumer Redressal Structure">
                        {/* Supreme Court Apex */}
                        <polygon points="350,15 390,45 310,45" fill="#e11d48" fillOpacity="0.8" stroke="#f43f5e" strokeWidth="1.5" />
                        <text x="350" y="38" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Supreme Court</text>

                        {/* National Commission Tier */}
                        <polygon points="305,48 395,48 440,85 260,85" fill="#be123c" fillOpacity="0.5" stroke="#fb7185" strokeWidth="1.5" />
                        <text x="350" y="68" textAnchor="middle" fill="#ffe4e6" fontSize="11" fontWeight="bold">NATIONAL COMMISSION (NCDRC) &gt; ₹10 Crore</text>

                        {/* State Commission Tier */}
                        <polygon points="255,88 445,88 495,125 205,125" fill="#4338ca" fillOpacity="0.5" stroke="#818cf8" strokeWidth="1.5" />
                        <text x="350" y="108" textAnchor="middle" fill="#e0e7ff" fontSize="11" fontWeight="bold">STATE COMMISSION: ₹1 Crore to ₹10 Crore</text>

                        {/* District Commission Base */}
                        <polygon points="200,128 500,128 550,165 150,165" fill="#047857" fillOpacity="0.5" stroke="#34d399" strokeWidth="1.5" />
                        <text x="350" y="148" textAnchor="middle" fill="#d1fae5" fontSize="11" fontWeight="bold">DISTRICT COMMISSION: Up to ₹1 Crore</text>

                        {/* Side appeal indicators */}
                        <text x="560" y="105" fill="#fbbf24" fontSize="10">↑ Appeal: 30 Days (Sec 67)</text>
                      </svg>
                    </div>

                    {/* Predict-Then-Check Container */}
                    {!predictionMade && (
                      <div className="p-4 rounded-2xl bg-gold-950/50 border border-gold-700/60 space-y-3">
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                          🔬 Predict Before Simulating:
                        </span>
                        <p className="text-sm text-slate-200">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handlePrediction(i)}
                              className="text-left p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <div className="text-xs text-slate-400 font-mono">Dispute Claim Rupee Value:</div>
                          <div className="text-2xl font-black text-amber-400">
                            {claimAmountInLakhs < 100
                              ? `₹${claimAmountInLakhs} Lakhs`
                              : `₹${(claimAmountInLakhs / 100).toFixed(2)} Crore`}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono text-slate-400">CPA 2019 / Rule 21 Thresholds</span>
                          <div className="text-xs font-semibold text-emerald-400">District: Up to ₹1 Cr</div>
                          <div className="text-xs font-semibold text-gold-400">State: ₹1 Cr – ₹10 Cr</div>
                          <div className="text-xs font-semibold text-rose-400">National: Above ₹10 Cr</div>
                        </div>
                      </div>

                      {/* Real-time Slider connected directly to activeJurisdiction */}
                      <input
                        type="range"
                        min={1}
                        max={2000}
                        step={10}
                        value={claimAmountInLakhs}
                        onChange={(e) => setClaimAmountInLakhs(Number(e.target.value))}
                        aria-label="Claim Amount Slider in Lakhs"
                        className="w-full accent-gold-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                      />

                      {/* Animated Forum Card */}
                      <motion.div
                        layout
                        className={`p-5 rounded-2xl border bg-gradient-to-br ${
                          activeJurisdiction.color === 'emerald'
                            ? 'from-emerald-950/60 to-slate-900 border-emerald-500/50'
                            : activeJurisdiction.color === 'indigo'
                            ? 'from-gold-950/60 to-slate-900 border-gold-500/50'
                            : 'from-rose-950/60 to-slate-900 border-rose-500/50'
                        } space-y-3`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                            Designated Adjudicating Forum
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-950 border border-slate-800 text-slate-200">
                            Fee: {activeJurisdiction.fee}
                          </span>
                        </div>

                        <h3 className="text-xl font-black text-white">{activeJurisdiction.name}</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                            <span className="text-slate-400">Bench Composition:</span>
                            <div className="text-slate-200 font-semibold mt-0.5">{activeJurisdiction.president}</div>
                            <div className="text-slate-400 mt-0.5">{activeJurisdiction.members}</div>
                          </div>

                          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                            <span className="text-slate-400">Statutory Appeal Route:</span>
                            <div className="text-amber-300 font-semibold mt-0.5">{activeJurisdiction.appealTo}</div>
                            <div className="text-slate-400 mt-0.5">Section 67 (30 Days Limitation)</div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------- */}
                {/* LAB 5: CPA 2023 Misleading Ad & Surrogate Scanner */}
                {/* -------------------------------------------------- */}
                {currentSlide === 4 && (
                  <div className="space-y-6">
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                      <div className="text-sm font-bold text-slate-200">
                        Click on Deceptive Elements in this Ad Banner to Flag Violations:
                      </div>

                      {/* Mock Ad Banner */}
                      <div className="relative p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-purple-950/40 to-slate-900 border-2 border-dashed border-amber-500/40 space-y-4">
                        <div className="flex justify-between items-start">
                          <div
                            onClick={() => handleScanAdDefect('brand')}
                            className={`cursor-pointer p-2 rounded-lg border transition-all ${
                              scannedDefects.includes('brand')
                                ? 'bg-rose-950 border-rose-500 text-rose-200'
                                : 'bg-slate-900/80 border-slate-700 hover:border-amber-400'
                            }`}
                          >
                            <span className="text-xs font-mono font-bold">🏷️ "Royal Gold Club Soda"</span>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              (Identical font & crest to Royal Gold Whisky)
                            </div>
                          </div>

                          <div
                            onClick={() => handleScanAdDefect('disclosure')}
                            className={`cursor-pointer p-2 rounded-lg border transition-all ${
                              scannedDefects.includes('disclosure')
                                ? 'bg-rose-950 border-rose-500 text-rose-200'
                                : 'bg-slate-900/80 border-slate-700 hover:border-amber-400'
                            }`}
                          >
                            <span className="text-xs font-mono font-bold">🚫 Missing #ad / Paid Tag</span>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              (Undisclosed commercial partnership)
                            </div>
                          </div>
                        </div>

                        <div className="text-center py-2">
                          <div
                            onClick={() => handleScanAdDefect('claim')}
                            className={`inline-block cursor-pointer p-3 rounded-xl border transition-all ${
                              scannedDefects.includes('claim')
                                ? 'bg-rose-950 border-rose-500 text-rose-200'
                                : 'bg-slate-900/80 border-slate-700 hover:border-amber-400'
                            }`}
                          >
                            <span className="text-base sm:text-lg font-black text-amber-300">
                              "Guaranteed 100% Hair Regrowth in 7 Days with 0 Side Effects!"
                            </span>
                            <div className="text-xs text-slate-400 mt-1">
                              (Unsubstantiated clinical medical cure claim)
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Scan Results & Penalties */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                          <span className="text-slate-400">1. Surrogate Ad Violation:</span>
                          <div className={scannedDefects.includes('brand') ? 'text-rose-400 font-bold mt-1' : 'text-slate-500 mt-1'}>
                            {scannedDefects.includes('brand') ? '🚨 Banned under CCPA 2022 Guidelines' : 'Unflagged'}
                          </div>
                        </div>

                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                          <span className="text-slate-400">2. Undisclosed Endorsement:</span>
                          <div className={scannedDefects.includes('disclosure') ? 'text-rose-400 font-bold mt-1' : 'text-slate-500 mt-1'}>
                            {scannedDefects.includes('disclosure') ? '🚨 Endorser Fine up to ₹10L + 1-Yr Ban' : 'Unflagged'}
                          </div>
                        </div>

                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                          <span className="text-slate-400">3. False Medical Guarantee:</span>
                          <div className={scannedDefects.includes('claim') ? 'text-rose-400 font-bold mt-1' : 'text-slate-500 mt-1'}>
                            {scannedDefects.includes('claim') ? '🚨 Advertiser Fine up to ₹50 Lakh' : 'Unflagged'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Slide Navigation Bar */}
            <div className="flex items-center justify-between pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => Math.max(0, s - 1));
                  audioManager.play('tap');
                }}
                disabled={currentSlide === 0}
                className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed border border-slate-700"
              >
                ← Previous Lab
              </motion.button>

              <span className="text-xs font-mono text-slate-400">
                Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide((s) => s + 1);
                    audioManager.play('tap');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold shadow-lg shadow-gold-600/30"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30"
                >
                  Enter Free Sandbox Mode →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* PHASE 3: FREE SANDBOX PLAY */}
        {/* ========================================================= */}
        {phase === 'sandbox' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white">Interactive Sandbox & Lab Workbench</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Manipulate variables freely without grading. Build mastery before tackling formal challenges.
                  </p>
                </div>

                {/* Sandbox Mode Selector */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSandboxMode('plc');
                      audioManager.play('tap');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                      sandboxMode === 'plc' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    PLC Curve
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSandboxMode('jurisdiction');
                      audioManager.play('tap');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                      sandboxMode === 'jurisdiction' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Jurisdiction
                  </motion.button>
                </div>
              </div>

              {/* Sandbox Body */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800">
                {sandboxMode === 'plc' ? (
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Product Journey Stage:</span>
                      <span className="text-gold-300 font-bold">{currentPlcStage.name}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={plcTimeIndex}
                      onChange={(e) => setPlcTimeIndex(Number(e.target.value))}
                      aria-label="PLC Sandbox Time Slider"
                      className="w-full accent-gold-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-500">Sales Volume</span>
                        <div className="text-white font-bold text-sm mt-1">
                          {plcChartData.find((p) => p.time === plcTimeIndex)?.Sales || 0}k Units
                        </div>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-500">Net Profit</span>
                        <div className="text-emerald-400 font-bold text-sm mt-1">
                          ₹{plcChartData.find((p) => p.time === plcTimeIndex)?.Profit || 0} Lakhs
                        </div>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-500">Primary Buyers</span>
                        <div className="text-gold-300 font-bold text-sm mt-1">{currentPlcStage.buyers}</div>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-500">Competition</span>
                        <div className="text-amber-300 font-bold text-sm mt-1">{currentPlcStage.competition}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Claim Amount:</span>
                      <span className="text-amber-400 font-bold">
                        {claimAmountInLakhs < 100
                          ? `₹${claimAmountInLakhs} Lakhs`
                          : `₹${(claimAmountInLakhs / 100).toFixed(2)} Crore`}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={2000}
                      step={10}
                      value={claimAmountInLakhs}
                      onChange={(e) => setClaimAmountInLakhs(Number(e.target.value))}
                      aria-label="Jurisdiction Sandbox Claim Slider"
                      className="w-full accent-gold-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                      <div>
                        <div className="text-xs text-slate-400">Designated Court Tier:</div>
                        <div className="text-base font-bold text-white mt-0.5">{activeJurisdiction.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400">Mandatory Fee:</div>
                        <div className="text-sm font-bold text-emerald-400">{activeJurisdiction.fee}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToChallenge}
                  className="px-8 py-3 bg-gradient-to-r from-gold-600 to-purple-600 hover:from-gold-500 hover:to-purple-500 text-white font-extrabold rounded-2xl shadow-xl shadow-gold-600/30 text-sm"
                >
                  Start Board Challenges ({filteredChallenges.length} Total) →
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* PHASE 4: BOARD MASTERY CHALLENGES */}
        {/* ========================================================= */}
        {phase === 'challenge' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Top Progress & Metrics Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">
                  Challenge <strong className="text-white">{currentChallenge + 1}</strong> of{' '}
                  <strong className="text-white">{filteredChallenges.length}</strong>
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                  NEP Competency: <strong className="text-gold-400 uppercase">{challenge.competencyLevel}</strong>
                </span>
                <span className="text-slate-400 font-mono">Errors: {errors}</span>
              </div>
              <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-emerald-500 rounded-full"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Challenge Question Card */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className={`p-6 rounded-3xl border transition-all duration-300 ${
                wrongFlash
                  ? 'bg-rose-950/70 border-rose-500 shadow-2xl shadow-rose-950'
                  : 'bg-slate-900 border-slate-800 shadow-xl'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                <span>NODE: {challenge.nodeId}</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {challenge.type.toUpperCase()}
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-white leading-snug mb-4">{challenge.question}</h2>

              {/* 1. MCQ Challenges (Classify / Distinguish / Match) */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
                challenge.options && (
                  <div className="grid grid-cols-1 gap-3">
                    {challenge.options.map((opt, i) => {
                      const isWrongChoice = wrongShake && selectedOption === i;
                      return (
                        <motion.button
                          key={i}
                          animate={isWrongChoice ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                          transition={{ duration: 0.4 }}
                          whileHover={{ scale: 1.01, x: 4 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleAnswer(i)}
                          disabled={answerRevealed || showExplanation}
                          aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                          className={`text-left p-4 rounded-2xl text-sm transition-all border ${
                            showExplanation && i === challenge.correctIndex
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950'
                              : 'bg-slate-950/70 hover:bg-slate-800/80 border-slate-800 text-slate-200'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span>{opt}</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                )}

              {/* 2. Drag-Label Challenge */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-400 self-center mr-2">Drag Labels:</span>
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        role="button"
                        aria-label={`Draggable label ${item.label}`}
                        className="px-3 py-1.5 rounded-xl bg-gold-600 text-white text-xs font-bold cursor-grab active:cursor-grabbing shadow-md"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['plc_intro', 'plc_growth', 'plc_maturity', 'plc_decline'].map((targetId) => (
                      <div
                        key={targetId}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(targetId)}
                        className={`p-4 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center min-h-[90px] transition-all ${
                          droppedLabels[targetId]
                            ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-500'
                        }`}
                      >
                        <span className="text-[10px] text-slate-400 font-mono uppercase">{targetId.replace('plc_', '')}</span>
                        <div className="text-xs text-center mt-1">
                          {droppedLabels[targetId] || 'Drop Stage Here'}
                        </div>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation}
                    className="w-full py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-2xl text-xs shadow-lg shadow-gold-600/30"
                  >
                    Check Label Placements
                  </motion.button>
                </div>
              )}

              {/* 3. Drag-Sort Challenge */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    {(sortArrangement.length === challenge.sortItems.length
                      ? sortArrangement.map((idx) => challenge.sortItems![idx])
                      : challenge.sortItems
                    ).map((item, displayIdx) => (
                      <motion.div
                        key={displayIdx}
                        draggable
                        onDragStart={() => setDraggedItem(String(displayIdx))}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          const fromIdx = parseInt(draggedItem || '0');
                          handleSortMove(fromIdx, displayIdx);
                        }}
                        whileHover={{ scale: 1.01 }}
                        role="button"
                        aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                        className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-200 cursor-grab active:cursor-grabbing"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center font-bold text-slate-400">
                            {displayIdx + 1}
                          </span>
                          <span>{item}</span>
                        </div>
                        <span className="text-slate-500 text-sm">↕</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => {
                      const answer =
                        sortArrangement.length > 0
                          ? sortArrangement
                          : challenge.sortItems?.map((_, i) => i) || [];
                      handleAnswer(answer);
                    }}
                    disabled={showExplanation}
                    className="w-full py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-2xl text-xs shadow-lg shadow-gold-600/30"
                  >
                    Check Sequential Order
                  </motion.button>
                </div>
              )}

              {/* 4. Numeric Challenge */}
              {challenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter value"
                      aria-label="Numeric answer input"
                      className="flex-1 p-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-white font-bold text-base focus:border-gold-500 focus:outline-none"
                    />
                    <span className="self-center text-xs text-slate-400 font-mono">{challenge.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || !numericInput}
                      className="px-6 py-3.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-2xl text-xs shadow-lg shadow-gold-600/30 whitespace-nowrap"
                    >
                      Submit Answer
                    </motion.button>
                  </div>
                </div>
              )}

              {/* 5. Construct Challenge */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400 font-mono">{challenge.validationHint}</p>

                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts((prev) => [...prev, part])}
                        disabled={constructParts.includes(part)}
                        className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 disabled:opacity-40"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[70px] flex flex-wrap items-center gap-2">
                    {constructParts.map((part, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1 rounded-xl bg-gold-900/60 border border-gold-500 text-gold-200 text-xs font-bold flex items-center gap-2"
                      >
                        <span>{part}</span>
                        <button
                          onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                          className="text-gold-400 hover:text-white"
                        >
                          ✕
                        </button>
                      </motion.div>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-500">Click elements above to assemble the penalty package</span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(constructParts.join(' + '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="w-full py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-2xl text-xs shadow-lg shadow-gold-600/30"
                  >
                    Validate Statutory Construction
                  </motion.button>
                </div>
              )}

              {/* Step-by-Step Progressive Disclosure Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 rounded-2xl bg-amber-950/40 border border-amber-700/50 space-y-4"
                >
                  <div className="flex items-center justify-between text-amber-300 text-xs font-bold uppercase tracking-wider">
                    <span>💡 Statutory Explanation (Step-by-Step)</span>
                    <span>
                      Step {revealedSteps + 1} of{' '}
                      {challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {challenge.explanation
                      .split('. ')
                      .filter((s) => s.trim().length > 0)
                      .slice(0, revealedSteps + 1)
                      .map((sentence, idx) => (
                        <motion.p
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-xs sm:text-sm text-amber-100 leading-relaxed"
                        >
                          <strong className="text-amber-400">{idx + 1}.</strong> {sentence}
                          {!sentence.endsWith('.') && '.'}
                        </motion.p>
                      ))}
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    {revealedSteps <
                    challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setRevealedSteps((s) => s + 1)}
                        className="px-4 py-2 bg-amber-700/60 hover:bg-amber-700 text-amber-100 rounded-xl text-xs font-bold border border-amber-500/40"
                      >
                        Show Next Step →
                      </motion.button>
                    ) : (
                      <div className="text-xs text-emerald-400 font-semibold">✓ All Steps Revealed</div>
                    )}

                    {revealedSteps >=
                      challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-emerald-600/30"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Master Score →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* PHASE 5: COMPLETION, MOTIVATIONAL FEEDBACK & REFLECTION */}
        {/* ========================================================= */}
        {phase === 'complete' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4 shadow-2xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-4xl shadow-xl shadow-emerald-500/30"
              >
                🏆
              </motion.div>

              <h2 className="text-2xl sm:text-3xl font-black text-white">Simulation Completed!</h2>

              <div className="flex justify-center gap-6 text-sm">
                <div>
                  <div className="text-slate-400 text-xs font-mono">FINAL SCORE</div>
                  <div className="text-3xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
                </div>
                <div className="w-px h-10 bg-slate-800 self-center" />
                <div>
                  <div className="text-slate-400 text-xs font-mono">BKT MASTERY LEVEL</div>
                  <div className="text-3xl font-black text-gold-400 uppercase">{masteryLevel}</div>
                </div>
              </div>

              {/* MOTIVATIONAL FEEDBACK */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-sm max-w-xl mx-auto font-medium">
                {errors === 0 && (
                  <span className="text-emerald-400 font-bold">
                    PERFECT SCORE! Flawless mastery of Digital Marketing, the PLC, and Consumer Protection Acts.
                  </span>
                )}
                {errors >= 1 && errors <= 3 && (
                  <span className="text-teal-300 font-bold">
                    Great work! You have a solid grasp of quasi-judicial jurisdictions and digital promotion channels.
                  </span>
                )}
                {errors >= 4 && errors <= 7 && (
                  <span className="text-amber-300 font-bold">
                    Good effort! Review the PECUNIARY jurisdiction limits and PLC extension strategies to gain full confidence.
                  </span>
                )}
                {errors >= 8 && (
                  <span className="text-rose-400 font-bold">
                    Do not give up — You WILL get this! Revisit the interactive labs and practice each statutory concept.
                  </span>
                )}
              </div>
            </div>

            {/* SPACED REPETITION (SRS) SCHEDULE CARD */}
            <div className="p-6 rounded-3xl bg-gold-950/50 border border-gold-500/40 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <span>📅</span> Spaced Repetition Schedule (SM-2 SRS)
                </h3>
                <span className="px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full font-bold text-xs border border-amber-400/30">
                  {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Based on your performance ({errors} error{errors === 1 ? '' : 's'}), you should{' '}
                <strong className="text-amber-300 font-bold">
                  {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                </strong>
                . (0 errors: review in 7 days • 1–3 errors: review in 3 days • 4+ errors: review in 1 day). Regular spaced repetition guarantees peak memory consolidation before board examinations.
              </p>
            </div>

            {/* REFLECTION SECTION */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-gold-400 uppercase tracking-wider flex items-center gap-2">
                <span>💭</span> Post-Simulation Deep Reflection
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    1. What was the most surprising thing you learned?
                  </label>
                  <textarea
                    value={reflections.surprising}
                    onChange={(e) => setReflections({ ...reflections, surprising: e.target.value })}
                    placeholder="e.g., How parasocial trust in micro-influencers works, or the ₹1 Crore District limit..."
                    rows={2}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    2. How would you explain this to a friend?
                  </label>
                  <textarea
                    value={reflections.explain}
                    onChange={(e) => setReflections({ ...reflections, explain: e.target.value })}
                    placeholder="e.g., Explain why #ad tags are legally required or how products go through life stages..."
                    rows={2}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    3. Where in real life might you use this?
                  </label>
                  <textarea
                    value={reflections.realLife}
                    onChange={(e) => setReflections({ ...reflections, realLife: e.target.value })}
                    placeholder="e.g., Filing a dispute on e-Daakhil, creating a marketing plan, spotting surrogate ads..."
                    rows={2}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>
            </div>

            {/* Misconception Diagnostic Profile */}
            {hitMisconceptions.length > 0 && (
              <div className="p-6 rounded-3xl bg-rose-950/40 border border-rose-800/60 space-y-3">
                <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                  <span>🚨</span> Targeted Misconception Analysis (CISCE Diagnostic)
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {hitMisconceptions.map((mIdx, i) => {
                    const m = misconceptions?.[mIdx];
                    if (!m) return null;
                    return (
                      <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                        <div className="text-xs text-rose-300 font-semibold">❌ Flawed Conception: {m.misconception}</div>
                        <div className="text-xs text-emerald-300 mt-1">✓ Statutory Truth: {m.correction}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Real World Boardroom Activity */}
            <div className="p-6 rounded-3xl bg-gold-950/40 border border-gold-800/60 space-y-3">
              <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider">
                💼 Real-World Application: {REAL_WORLD_ACTIVITY.title}
              </h3>
              <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <strong className="text-gold-400">{i + 1}.</strong> {step}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Floating Interactive Overlays */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Level Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C12_CommerceDigitalMarketingSocialSim;