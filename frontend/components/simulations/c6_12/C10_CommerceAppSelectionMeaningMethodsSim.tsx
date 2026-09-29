'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID CONSTANTS (ALL 12 NODES) ───
const NODE_C10_COMMAPP_021 = 'c10_commapp_021';
const NODE_C10_COMMAPP_022 = 'c10_commapp_022';
const NODE_C10_COMMAPP_023 = 'c10_commapp_023';
const NODE_C10_COMMAPP_024 = 'c10_commapp_024';
const NODE_C10_COMMAPP_025 = 'c10_commapp_025';
const NODE_C10_COMMAPP_026 = 'c10_commapp_026';
const NODE_C10_COMMAPP_027 = 'c10_commapp_027';
const NODE_C10_COMMAPP_028 = 'c10_commapp_028';
const NODE_C10_COMMAPP_029 = 'c10_commapp_029';
const NODE_C10_COMMAPP_030 = 'c10_commapp_030';
const NODE_C10_COMMAPP_031 = 'c10_commapp_031';
const NODE_C10_COMMAPP_032 = 'c10_commapp_032';

const ALL_NODE_IDS = [
  NODE_C10_COMMAPP_021,
  NODE_C10_COMMAPP_022,
  NODE_C10_COMMAPP_023,
  NODE_C10_COMMAPP_024,
  NODE_C10_COMMAPP_025,
  NODE_C10_COMMAPP_026,
  NODE_C10_COMMAPP_027,
  NODE_C10_COMMAPP_028,
  NODE_C10_COMMAPP_029,
  NODE_C10_COMMAPP_030,
  NODE_C10_COMMAPP_031,
  NODE_C10_COMMAPP_032,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Navodaya Enterprises: Corporate Transformation & Sustainability Drive',
  intro: 'You are appointed Chief Operations & HR Consultant for Navodaya Enterprises, a diversified Indian conglomerate operating in Pune and Jamshedpur. The company is overhauling its talent procurement funnel, building on/off-the-job training pipelines, restructuring PR communications after a media crisis, and establishing zero-carbon environmental compliance.',
  context: 'Your mission covers 4 functional divisions: (1) Selection & Interview Design, (2) Workplace Training & Apprenticeship Framework, (3) Ethical PR & Stakeholder Dialogue, and (4) Environmental Restoration, Energy Transition & Consumer Safety.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'An HR manager receives 1,000 applications for 20 software roles. If selection is called a "negative process", why is that?',
  options: [
    'Because it creates ill-will among rejected applicants in society',
    'Because at successive funnel stages, more candidates are eliminated than accepted',
    'Because psychological stress tests are mandatory for all job roles',
    'Because background verification assumes every applicant is fraudulent',
  ],
  correctIndex: 1,
  hintAfter: 'Selection is filtering: it intentionally narrows the pool from 1,000 down to 20 by rejecting unqualified applicants at each step!',
};

// ─── CHALLENGE INTERFACE ──���
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

// ─── 24 COMPREHENSIVE CHALLENGES (ALL 12 NODES COVERED) ───
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (8 items) ---
  {
    id: 'ch_01',
    nodeId: NODE_C10_COMMAPP_021,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the standard 7-step Selection Sequence in correct operational order.',
    sortItems: [
      'Preliminary Screening of Applications',
      'Selection Tests (Aptitude/Technical)',
      'Employment Interview',
      'Reference & Background Check',
      'Medical Examination',
      'Final Selection Decision',
      'Issue of Appointment Letter & Placement',
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    explanation: 'The standard selection sequence is: Screening → Selection Tests → Employment Interview → Reference Check → Medical Exam → Final Decision → Appointment Letter. Medical checks come late because sending thousands of unvetted candidates for medicals is cost-prohibitive.',
    hints: [
      'Preliminary screening always happens first to eliminate ineligible resumes cheaply.',
      'Medical exams are expensive and occur only after candidates clear tests and interviews.',
      'The formal appointment letter and job placement conclude the procurement sequence.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C10_COMMAPP_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'State Bank of India asks 5,000 shortlisted Probationary Officer candidates identical pre-set questions in a fixed order. Which interview type is this?',
    options: ['Unstructured Interview', 'Structured Interview', 'Stress Interview', 'Behavioural Interview'],
    correctIndex: 1,
    explanation: 'A structured interview uses predetermined, standardized questions in a fixed order, ensuring high objectivity, comparability, and fairness across thousands of candidates.',
    hints: [
      'All candidates answer the exact same fixed set of questions.',
      'It maximizes objectivity and ranking comparability.',
      'Think of standardized question sets: Structured.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C10_COMMAPP_022,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Under the Apprentices Act 1961 (amended 2014), what is the mandatory apprentice engagement quota for Indian establishments with 30+ employees?',
    options: ['0.5% to 2% of workforce', '2.5% to 15% of workforce', '20% to 35% of workforce', 'Strictly 50% of workforce'],
    correctIndex: 1,
    explanation: 'The Apprentices Act 1961 mandates that commercial and industrial establishments with 30 or more employees engage trade apprentices between 2.5% and 15% of their total workforce band.',
    hints: [
      'It is a statutory percentage band to foster nationwide skill training.',
      'The minimum is 2.5% and the upper statutory ceiling is 15%.',
      'Look for the 2.5% to 15% range.',
    ],
  },
  {
    id: 'ch_04',
    nodeId: NODE_C10_COMMAPP_023,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the Off-the-Job training methods to their defining simulated learning venues.',
    dragItems: [
      { label: 'Vestibule Training', targetId: 'target_dummy' },
      { label: 'Case Study', targetId: 'target_iim' },
      { label: 'Sensitivity (T-Group)', targetId: 'target_tgroup' },
      { label: 'Role Playing', targetId: 'target_acting' },
    ],
    correctMapping: {
      target_dummy: 'Vestibule Training',
      target_iim: 'Case Study',
      target_tgroup: 'Sensitivity (T-Group)',
      target_acting: 'Role Playing',
    },
    explanation: 'Vestibule uses simulated dummy equipment (BSNL RTTC); Case Study analyses written business scenarios (IIM-A); Sensitivity T-groups explore interpersonal self-awareness (NTPC School); Role Playing enacts sales/customer scenarios (Maruti Suzuki).',
    hints: [
      'Dummy equipment on company premises signifies Vestibule training.',
      'IIM Ahmedabad pioneered written business scenario analysis (Case Study).',
      'Unstructured peer behavioral reflection is Sensitivity / T-Group training.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_05',
    nodeId: NODE_C10_COMMAPP_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the primary objective that distinguishes Public Relations from Advertising?',
    options: [
      'PR seeks immediate product sales through paid 30-second prime-time ads',
      'PR builds long-term mutual understanding and trust with diverse publics via two-way communication',
      'PR is one-way communication strictly aimed at shareholders',
      'PR is unplanned accidental publicity generated by negative rumors',
    ],
    correctIndex: 1,
    explanation: 'Advertising is paid, one-way, and sales-focused. Public Relations is a deliberate, planned, sustained two-way effort to build mutual understanding and goodwill across multiple publics.',
    hints: [
      'Advertising buys airtime to push products; PR builds relationships.',
      'PR involves listening as well as speaking (two-way).',
      'Look for "mutual understanding and trust with diverse publics".',
    ],
  },
  {
    id: 'ch_06',
    nodeId: NODE_C10_COMMAPP_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which pioneer issued the 1906 "Declaration of Principles" insisting on transparent, open truth-telling to the press after the Pennsylvania train wreck?',
    options: ['Edward Bernays', 'Ivy Lee', 'Philip Kotler', 'F.W. Taylor'],
    correctIndex: 1,
    explanation: 'Ivy Lee issued the 1906 Declaration of Principles following the Atlantic City train wreck, establishing that PR must operate openly and supply accurate, verifiable facts rather than hidden propaganda.',
    hints: [
      'He insisted on working in the open and ended press-agentry deception in 1906.',
      'Edward Bernays systematized academic theory in 1923; this pioneer established the 1906 ethical charter.',
      'His name is Ivy Lee.',
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C10_COMMAPP_030,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Identify the world’s largest single-location operational solar park (2,245 MW) located in Rajasthan, India.',
    options: ['Pavagada Solar Park', 'Bhadla Solar Park', 'Kurnool Ultra Solar Park', 'Rewa Solar Plant'],
    correctIndex: 1,
    explanation: 'Bhadla Solar Park in Jodhpur district, Rajasthan, spans over 14,000 acres with an operational capacity of 2,245 MW, embodying India’s National Solar Mission expansion.',
    hints: [
      'Located in the Thar Desert region of Rajasthan.',
      'Completed around 2020 with 2,245 MW capacity.',
      'Starts with "B": Bhadla.',
    ],
  },
  {
    id: 'ch_08',
    nodeId: NODE_C10_COMMAPP_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which toxic gas leaked during the midnight hours of 2-3 December 1984 at the Union Carbide plant in Bhopal?',
    options: ['Sulphur Dioxide (SO2)', 'Methyl Isocyanate (MIC)', 'Chlorofluorocarbon (CFC)', 'Carbon Monoxide (CO)'],
    correctIndex: 1,
    explanation: 'Approximately 40 tonnes of Methyl Isocyanate (MIC, formula CH3NCO) leaked from Tank 610 at Union Carbide India Limited, causing thousands of immediate fatalities and catastrophic respiratory trauma.',
    hints: [
      'It is an extremely volatile, exothermic organic isocyanate used in pesticide synthesis.',
      'Abbreviated as MIC.',
      'Methyl Isocyanate.',
    ],
  },

  // --- STANDARD (8 items) ---
  {
    id: 'ch_09',
    nodeId: NODE_C10_COMMAPP_021,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'An ICICI Bank panel deliberately uses rapid-fire questioning and confrontational silences to evaluate a Treasury Officer candidate’s emotional poise. Which interview technique is this?',
    options: ['Panel Interview', 'Stress Interview', 'Unstructured Interview', 'Group Planning Exercise'],
    correctIndex: 1,
    explanation: 'A stress interview is a deliberate, designed psychological technique employing rapid questioning, confrontational posture, or awkward silences to test composure and decision-making under intense pressure.',
    hints: [
      'It is deliberately engineered to put the candidate under emotional pressure.',
      'Not just an ordinary difficult technical interview.',
      'Identified as a Stress Interview.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_10',
    nodeId: NODE_C10_COMMAPP_022,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'A Deputy Branch Manager at HDFC Bank Connaught Place works alongside the Branch Manager for 6 months specifically to take over the post upon the manager’s upcoming retirement. Classify this method.',
    options: ['Coaching', 'Understudy', 'Job Rotation', 'Vestibule Training'],
    correctIndex: 1,
    explanation: 'Understudy is a succession-planning method where a junior is groomed specifically to replace a retiring or promoted senior. In coaching, both do the same job with no succession intent.',
    hints: [
      'Look for the succession intent: grooming a junior to fill a specific vacated senior post.',
      'Coaching improves current job execution; understudy prepares for replacement.',
      'Method: Understudy.',
    ],
  },
  {
    id: 'ch_11',
    nodeId: NODE_C10_COMMAPP_024,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the statement "On-the-job training is always cheaper than off-the-job training" economically false?',
    options: [
      'Because off-the-job training requires paying GST penalties to the government',
      'Because on-the-job training carries high indirect costs: line slowdowns, spoiled real materials, and customer errors',
      'Because apprentice stipends are legally triple regular employee salaries',
      'Because classroom whiteboards cost more than industrial blast furnaces',
    ],
    correctIndex: 1,
    explanation: 'While OJT has low direct costs (no venue hire), its indirect costs can be enormous: a trainee welder at Tata Steel spoiling a ₹6 lakh casting or a trainee teller mis-keying ₹50,000 exceeds classroom expenses.',
    hints: [
      'Consider the hidden or indirect costs of trainee mistakes on real production lines.',
      'A spoiled industrial part or lost bank client costs lakhs.',
      'Total cost = Direct Cost + Indirect Cost (scrap, downtime, errors).',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_12',
    nodeId: NODE_C10_COMMAPP_026,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'HUL’s Project Shakti team studied rural women’s social mobility constraints and designed a home-based FMCG distribution model. Which PR element does this exemplify?',
    options: ['Sympathy (feeling sorry for rural poverty)', 'Empathy (cognitively understanding their perspective & constraints)', 'Persuasion (running discounts on shampoo)', 'Propaganda (making unverified claims)'],
    correctIndex: 1,
    explanation: 'Empathy is the cognitive ability to understand another group’s perspective and constraints to design tailored solutions. Sympathy is merely emotional sorrow, which would produce passive charity rather than sustainable enterprise.',
    hints: [
      'Empathy guides strategic business models by understanding real human constraints.',
      'Sympathy says "I feel sad"; empathy says "I understand your structural reality and design accordingly".',
      'Answer: Empathy.',
    ],
  },
  {
    id: 'ch_13',
    nodeId: NODE_C10_COMMAPP_028,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In June 2015, FSSAI banned Maggi noodles after discovering lead beyond permissible limits. Why was Nestle India’s initial denial considered unethical PR?',
    options: [
      'Because Nestle failed to buy enough full-page newspaper advertisements',
      'Because it prioritized corporate brand defense over public health transparency and safety disclosure',
      'Because FSSAI had no constitutional authority to test food samples',
      'Because Nestle had not registered its trademark under the Companies Act 2013',
    ],
    correctIndex: 1,
    explanation: 'Ethical PR demands honesty, transparency, and consumer safety above flattering publicity. Denying lab findings and delaying recalls when food safety is at stake violates core PR ethics.',
    hints: [
      'Ethical PR requires disclosing uncomfortable safety truths promptly.',
      'Brand defense at the cost of consumer safety is unethical.',
      'Look for prioritizing brand defense over public health transparency.',
    ],
  },
  {
    id: 'ch_14',
    nodeId: NODE_C10_COMMAPP_029,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How does the Urban Energy Crisis in India differ structurally from the Rural Energy Crisis?',
    options: [
      'Urban is grid absence; Rural is peak-load AC power shortages',
      'Urban is peak-load capacity scarcity; Rural is infrastructural absence of grid access & dependence on biomass',
      'Urban crisis affects only solar panels; Rural crisis affects nuclear reactors',
      'There is no difference; both are solved solely by kerosene lamp subsidies',
    ],
    correctIndex: 1,
    explanation: 'The urban energy crisis is a peak-load scarcity problem (demand exceeds grid capacity during heatwaves). The rural energy crisis is an infrastructure absence problem (villages historically lacking physical grid lines and relying on indoor biomass/firewood).',
    hints: [
      'Delhi in summer faces peak air-conditioning surges (scarcity).',
      'Pre-Saubhagya rural villages lacked physical transmission lines entirely (absence).',
      'Urban = Peak scarcity; Rural = Infrastructure absence.',
    ],
  },
  {
    id: 'ch_15',
    nodeId: NODE_C10_COMMAPP_030,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why is it scientifically inaccurate to say "We must completely eradicate the greenhouse effect"?',
    options: [
      'Because the greenhouse effect produces all atmospheric oxygen',
      'Because the natural greenhouse effect traps heat to maintain Earth’s hospitable average temperature (~15°C instead of -18°C)',
      'Because acid rain cancels out the greenhouse effect automatically',
      'Because greenhouse gases only exist inside glass agricultural nurseries',
    ],
    correctIndex: 1,
    explanation: 'The natural greenhouse effect is essential for life, keeping Earth at a habitable ~15°C. The threat is Anthropogenic Global Warming—the excessive burning of fossil fuels that artificially thickens the gas blanket.',
    hints: [
      'Without natural greenhouse gases (CO2, H2O vapor, CH4), Earth would be a frozen -18°C wasteland.',
      'The problem is human-caused excess (global warming), not the natural baseline mechanism.',
      'Look for the natural heat-trapping mechanism maintaining 15°C.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_16',
    nodeId: NODE_C10_COMMAPP_031,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A consumer suspects powdered turmeric is adulterated with toxic Metanil Yellow dye. What chemical test verifies this adulteration?',
    options: [
      'Adding concentrated Hydrochloric Acid (HCl); pure turns pink, adulterated turns intense violet/magenta',
      'Boiling with pure coconut oil; pure turns bright blue',
      'Placing a drop of iodine; pure turns jet black',
      'Adding baking soda; pure produces bubbles',
    ],
    correctIndex: 0,
    explanation: 'Adding concentrated Hydrochloric Acid (HCl) to turmeric powder causes Metanil Yellow (a prohibited coal-tar dye) to turn intense magenta/violet, while pure turmeric exhibits faint pink that disappears on dilution.',
    hints: [
      'The standard reagent is concentrated Hydrochloric Acid (HCl).',
      'Metanil Yellow dye reacts with strong acid to produce a vivid violet/magenta color.',
      'Select the HCl acid test.',
    ],
  },

  // --- ADVANCED (8 items) ---
  {
    id: 'ch_17',
    nodeId: NODE_C10_COMMAPP_021,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A candidate sits for a Probationary Officer test of 250 total marks. Sections: Quant (42/50), Reasoning (38/50), English (40/50), Banking (44/50), Personality (41/50). What is their percentage score?',
    correctAnswer: 82,
    tolerance: 0.5,
    unit: '%',
    explanation: 'Total obtained = 42 + 38 + 40 + 44 + 41 = 205 marks out of 250. Percentage = (205 / 250) * 100 = 82%.',
    hints: [
      'Sum all five section scores: 42 + 38 + 40 + 44 + 41.',
      'Total marks = 205 out of 250.',
      'Calculate (205 / 250) * 100.',
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C10_COMMAPP_024,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the ideal 2-Phase Blended Training Model for newly recruited Tata Motors automotive engineers.',
    availableParts: [
      'Phase 1: 6-Month Vestibule Training on Dummy Engines',
      'Phase 2: 24-Month Shopfloor Apprenticeship on Live Assembly Line',
      'Direct Unsupervised Deployment on High-Voltage EV Batteries',
      'Classroom Lectures Only with Zero Workshop Practice',
    ],
    targetState: 'Phase 1: 6-Month Vestibule Training on Dummy Engines Phase 2: 24-Month Shopfloor Apprenticeship on Live Assembly Line',
    validationHint: 'Select Phase 1 (Vestibule on dummy engines) followed by Phase 2 (Live line Apprenticeship).',
    explanation: 'The proven Tata Motors model blends 6 months of off-the-job vestibule training (safe foundational muscle memory) followed by 24 months of on-the-job apprenticeship (live assembly line speed & precision).',
    hints: [
      'Always start with safe off-the-job vestibule practice on dummy units.',
      'Follow with live on-the-job shopfloor apprenticeship under the 1961 Act.',
      'Combine Phase 1 and Phase 2 in sequence.',
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C10_COMMAPP_026,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Evaluate why Tata Motors’ dialogue with Singur farmers in 2008 broke down, forcing the Nano plant to relocate to Sanand, Gujarat.',
    options: [
      'Because the state government refused to grant tax subsidies to Tata Motors',
      'Because communication was perceived as one-sided corporate briefing rather than genuine bidirectional dialogue addressing land loss & livelihood grievances',
      'Because farmers demanded full ownership of Tata Sons shares',
      'Because Nano cars failed emission tests during factory construction',
    ],
    correctIndex: 1,
    explanation: 'Dialogue requires genuine bidirectional listening and mutual willingness to adjust terms. When local communities perceive corporate communication as one-way persuasion or rubber-stamping, trust collapses and projects face insurmountable resistance.',
    hints: [
      'Dialogue fails when one side only dictates without actively addressing core livelihood fears.',
      'Persuasion disguised as consultation is rejected by affected communities.',
      'Look for "perceived as one-sided corporate briefing rather than genuine bidirectional dialogue".',
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C10_COMMAPP_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An ayurvedic pharmacy advertises that its tonic "cures advanced diabetes in 7 days without insulin", citing zero clinical trials. Under ASCI and FSSAI rules, what is the regulatory assessment?',
    options: [
      'Ethical PR because natural herbal ingredients do not require proof',
      'Misleading and illegal claim violating the Drugs and Magic Remedies Act and ASCI Code of Ethics',
      'Permissible commercial puffery under standard marketing law',
      'Protected free speech under Article 19 with no regulatory oversight',
    ],
    correctIndex: 1,
    explanation: 'Unsubstantiated medical cure claims violate the ASCI Code of Standards, the Drugs and Magic Remedies (Objectionable Advertisements) Act 1954, and the Consumer Protection Act 2019, carrying severe penalties and advertisement bans.',
    hints: [
      'Making absolute medical cure claims without clinical trial evidence is fraudulent.',
      'ASCI and FSSAI strictly prohibit unsubstantiated healthcare guarantees.',
      'Classify as "Misleading and illegal claim".',
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C10_COMMAPP_029,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'If Coal India extracts 700 Million Tonnes annually and India’s extractable reserves stand at 63,000 Million Tonnes, in how many years will this finite stock deplete at constant output?',
    correctAnswer: 90,
    tolerance: 1,
    unit: 'years',
    explanation: 'Depletion Time = Total Reserves / Annual Extraction = 63,000 MT / 700 MT/year = 90 years. This underscores the acute non-renewable energy horizon.',
    hints: [
      'Divide 63,000 MT by 700 MT per year.',
      '63,000 / 700 = ?',
      'The answer is 90.',
    ],
  },
  {
    id: 'ch_22',
    nodeId: NODE_C10_COMMAPP_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What atmospheric chemical phenomenon causes the yellowing and pitting ("Marble Cancer") of the white marble at the Taj Mahal in Agra?',
    options: [
      'Ozone layer depletion caused by aerosol sprays in Jaipur',
      'Acid rain containing Sulphuric & Nitric acids formed from SO2 and NOx emitted by Mathura refinery and local industries',
      'Carbon monoxide asphyxiation from tourist vehicles',
      'Radioactive fallout from nearby nuclear research labs',
    ],
    correctIndex: 1,
    explanation: 'Sulphur Dioxide (SO2) from the Mathura Refinery and regional coal-fired industries combines with atmospheric moisture to form Sulphuric Acid (H2SO4), reacting with marble (CaCO3) to form Calcium Sulphate, corroding and discolouring the monument.',
    hints: [
      'SO2 and NOx from Mathura refinery react with atmospheric water vapour.',
      'The resulting precipitation has a low pH (< 5.6) causing chemical corrosion.',
      'Identified as Acid Rain forming Sulphuric & Nitric acids.',
    ],
  },
  {
    id: 'ch_23',
    nodeId: NODE_C10_COMMAPP_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Which key institutional power was introduced in the Consumer Protection Act 2019 that was entirely absent in the 1986 Act?',
    options: [
      'Establishment of the Central Consumer Protection Authority (CCPA) with recall, investigation, and direct penalty powers',
      'Abolition of all district-level consumer courts',
      'Exemption of all e-commerce transactions from product liability',
      'Mandatory physical courtroom hearings with no online filing',
    ],
    correctIndex: 0,
    explanation: 'The Consumer Protection Act 2019 established the Central Consumer Protection Authority (CCPA) as an active regulatory watchdog empowered to initiate class action recalls, investigate false advertisements, and levy penalties up to ₹50 lakh.',
    hints: [
      'Look for the proactive central regulator created in 2019.',
      'CCPA has powers to recall hazardous goods and penalize misleading celebrity endorsements.',
      'Select the CCPA establishment option.',
    ],
  },
  {
    id: 'ch_24',
    nodeId: NODE_C10_COMMAPP_032,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'On 26 March 1974 at Reni village (Chamoli, Uttarakhand), Gaura Devi led 27 women to hug trees. What national policy milestone did the Chipko Andolan achieve in 1980?',
    options: [
      'A total ban on all agricultural farming in Uttarakhand',
      'A 15-year Government of India ban on commercial green felling of trees above 1,000 metres altitude in the Himalayas',
      'Privatization of all Himalayan water streams to bottling companies',
      'Mandatory eviction of all village settlements from forest reserves',
    ],
    correctIndex: 1,
    explanation: 'The Chipko movement, led by Gaura Devi, Sunderlal Bahuguna, and Chandi Prasad Bhatt, compelled Prime Minister Indira Gandhi’s government in 1980 to enact a 15-year ban on commercial green tree felling above 1,000m in Himalayan forests.',
    hints: [
      'It was a landmark ecological policy victory restricting commercial logging.',
      'Ban on green tree felling above 1,000 metres elevation in Himalayan ranges.',
      'Select the 1980 Government ban on commercial green felling.',
    ],
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
  nodeId: NODE_C10_COMMAPP_021,
  title: 'Commerce Applications: Selection, Training, PR Ethics & Environmental Stewardship',
  definition: 'An integrated study of human resource procurement (Selection & Interviews), employee development (On/Off-the-Job Training & Apprenticeship), strategic stakeholder communication (PR Elements & Ethics), and ecological responsibilities (Energy Transition, Consumer Rights under CPA 2019 & Chipko Restoration).',
  eli5: 'Think of running a great company like building a healthy tree: you carefully pick the best seeds (Selection), nurture and train the roots (Training), speak honestly and with empathy to everyone in the garden (PR & Ethics), and care for the soil, air, and clean energy around you (Sustainability & Consumer Safety).',
  misconceptions: [
    { misconception: 'Medical examination takes place before the employment interview to save time.', correction: 'Medical examination happens after tests and interviews because conducting costly medical tests on thousands of unshortlisted applicants is financially wasteful.' },
    { misconception: 'Any difficult or high-pressure interview is a stress interview.', correction: 'A stress interview is a deliberate, designed psychological technique with rapid-fire questioning and confrontation, not simply an advanced technical interview.' },
    { misconception: 'Sensitivity training is just a regular classroom soft-skills and etiquette lecture.', correction: 'Sensitivity training uses unstructured T-groups with no preset syllabus where participants examine their own live interpersonal behaviors.' },
    { misconception: 'On-the-job training is always cheaper than off-the-job training.', correction: 'OJT has hidden indirect costs including scrap losses, machine downtime, and customer friction that often exceed classroom expenses.' },
    { misconception: 'The greenhouse effect is inherently harmful and should be completely eradicated.', correction: 'The natural greenhouse effect is essential for keeping Earth at a hospitable 15°C; the environmental crisis is human-caused global warming from excess fossil emissions.' },
  ],
  diagnosticQuestions: [
    { question: 'What is the correct place of the medical examination in the selection funnel?', options: ['Step 1 before screening', 'Immediately after aptitude tests', 'After the employment interview and reference check', 'After issuing the appointment letter'], correctIndex: 2 },
    { question: 'Which Indian Act governs statutory trade apprenticeship contracts on Form 3?', options: ['Companies Act 2013', 'Apprentices Act 1961', 'Factories Act 1948', 'Industrial Disputes Act 1947'], correctIndex: 1 },
    { question: 'BSNL’s Regional Telecom Training Centres use dummy exchanges for 12 weeks. What method is this?', options: ['Internship', 'Vestibule Training', 'Role Playing', 'Sensitivity Training'], correctIndex: 1 },
    { question: 'Who issued the 1906 Declaration of Principles establishing transparency in modern PR?', options: ['Edward Bernays', 'Ivy Lee', 'Ajit Kumar Banerjee', 'Sunderlal Bahuguna'], correctIndex: 1 },
    { question: 'Which new regulatory authority with product recall powers was created under CPA 2019?', options: ['TRAI', 'CCPA', 'ASCI', 'SEBI'], correctIndex: 1 },
    { question: 'Metanil yellow adulteration in turmeric powder is detected using which chemical?', options: ['Iodine Solution', 'Concentrated Hydrochloric Acid (HCl)', 'Nitric Acid', 'Ethanol'], correctIndex: 1 },
    { question: 'Which tree-hugging movement in Chamoli resulted in the 1980 Himalayan green-felling ban?', options: ['Narmada Bachao Andolan', 'Chipko Andolan', 'Appiko Movement', 'Silent Valley Movement'], correctIndex: 1 },
    { question: 'What is the world’s largest operational solar park located in Rajasthan, India?', options: ['Bhadla Solar Park (2,245 MW)', 'Pavagada Solar Park', 'Rewa Solar Park', 'Charanka Solar Park'], correctIndex: 0 },
  ],
  masteryCriteria: 'Master the 7-step selection sequence, distinguish 6 on-the-job vs 6 off-the-job training methods, apply the 4 PR elements and ethical codes, and evaluate ecological restoration and consumer protection laws (CPA 2019, Chipko, Solar Mission).',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Selection Funnel Simulator',
    instruction: 'Adjust the preliminary screening & interview cut-offs to observe how 1,000 applicants are filtered down to the final hiring cohort.',
    interactionType: 'funnel-slider',
    nodeId: NODE_C10_COMMAPP_021,
  },
  {
    title: 'Lab 2: On-the-Job vs Off-the-Job Cost & Risk Matrix',
    instruction: 'Toggle between Training Environments (Shopfloor Line vs Vestibule Simulator) and adjust the Operator Error Risk slider to inspect direct vs indirect costs.',
    interactionType: 'training-matrix',
    nodeId: NODE_C10_COMMAPP_024,
  },
  {
    title: 'Lab 3: The 4 Elements of Ethical Public Relations',
    instruction: 'Select each stakeholder crisis scenario and deploy Human Relations, Empathy, Persuasion, or Dialogue to observe the trust index outcome.',
    interactionType: 'pr-elements',
    nodeId: NODE_C10_COMMAPP_026,
  },
  {
    title: 'Lab 4: Energy Transition & Thermal Carbon Budget',
    instruction: 'Shift the national power mix between Coal Thermal (Vindhyachal) and Solar Mega-Parks (Bhadla) to monitor CO2, SO2 emissions and glacier retreat index in real time.',
    interactionType: 'energy-slider',
    nodeId: NODE_C10_COMMAPP_030,
  },
  {
    title: 'Lab 5: Consumer Safety, Adulteration & Chipko Restoration',
    instruction: 'Perform chemical tests on simulated food samples and activate community afforestation to observe ecological recovery.',
    interactionType: 'safety-lab',
    nodeId: NODE_C10_COMMAPP_031,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Prediction: If a factory trains greenhorn welders directly on expensive export engines (On-the-Job) without prior vestibule practice, what will happen to total training cost?',
    options: [
      'Total cost will decrease because no classroom rental is needed',
      'Total cost will surge dramatically due to scrap metal losses and customer shipment delays',
      'Total cost will remain exactly zero',
      'Government NAPS subsidies will cover 100% of broken machinery',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now inspect the Training Matrix in Lab 2 to verify how high indirect scrap costs dwarf direct classroom costs.',
  },
  {
    question: 'Prediction: If India increases solar capacity to 280 GW while continuing to burn 700+ MT of coal annually, what happens to net carbon emissions?',
    options: [
      'Global warming is instantly reversed within 24 hours',
      'Net emissions may still remain flat or rise unless older thermal coal units are actively phased down',
      'Acid rain pH will immediately turn into pure drinking water',
      'Atmospheric CO2 drops to pre-industrial 280 ppm overnight',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now slide the Coal vs Solar mix in Lab 4 to see why renewable addition must be paired with coal retirement.',
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the Selection Funnel as the aptitude test cut-off increases from 50% to 80%?',
    observableOptions: [
      'The pool of candidates advancing to expensive interview panels shrinks dramatically, saving managerial hours',
      'The medical exam cost increases by 400%',
      'The number of applicants doubles automatically',
      'All candidates are immediately placed in executive roles',
    ],
    correctIndex: 0,
  },
  {
    question: 'What pattern emerges when comparing the chemical reaction of pure turmeric vs metanil yellow with concentrated HCl?',
    observableOptions: [
      'Pure turmeric explodes while adulterated turmeric turns clear',
      'Pure turmeric shows a faint transient pink while metanil yellow produces an intense permanent magenta/violet',
      'Both liquids turn bright neon green',
      'No color change occurs in either sample',
    ],
    correctIndex: 1,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Executive Advisory Project: The Sustainable Enterprise Audit',
  description: 'Select an Indian enterprise (e.g., Tata Motors Jamshedpur, Maruti Suzuki Manesar, NTPC Vindhyachal, or Infosys Bengaluru). Complete a 4-pillar audit dossier:',
  steps: [
    'Pillar 1 (Selection): Design a 5-step selection protocol with specified interview types for Graduate Engineer Trainees.',
    'Pillar 2 (Training): Formulate a blended model combining off-the-job vestibule simulator hours with statutory Apprentices Act (Form 3) shopfloor rotation.',
    'Pillar 3 (PR & Ethics): Draft a 4-point stakeholder communication strategy adhering to the Tata Code of Conduct and PRSI ethics during an unexpected recall.',
    'Pillar 4 (Sustainability): Propose a renewable transition roadmap matching the National Solar Mission targets and community watershed afforestation.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN SIMULATION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function C10_CommerceAppSelectionMeaningMethodsSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['commapp'] || { name: 'Commerce Applications', emoji: '💼', color: 'blue' };

  // ─── COMPONENT STATE (30+ useState calls) ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Discovery & Predict-Check states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Lab 1: Selection Funnel Simulator
  const [applicantCount] = useState(1000);
  const [screeningPassRate, setScreeningPassRate] = useState(40); // % passing screening
  const [testCutoffScore, setTestCutoffScore] = useState(65); // %
  const [interviewPassRate, setInterviewPassRate] = useState(25); // %
  const [medicalPassRate] = useState(90); // %

  // Interactive Lab 2: Training Matrix & Cost
  const [trainingMode, setTrainingMode] = useState<'on-the-job' | 'off-the-job' | 'blended'>('blended');
  const [traineeCount, setTraineeCount] = useState(50);
  const [operatorErrorRate, setOperatorErrorRate] = useState(15); // %
  const [scrapCostPerError] = useState(12000); // ₹

  // Interactive Lab 3: PR Elements & Ethics
  const [selectedPRScenario, setSelectedPRScenario] = useState<'product-defect' | 'labour-strike' | 'rural-outreach' | 'brand-campaign'>('product-defect');
  const [selectedPRElement, setSelectedPRElement] = useState<'human-relations' | 'empathy' | 'persuasion' | 'dialogue'>('empathy');
  const [prTrustIndex, setPRTrustIndex] = useState(78);

  // Interactive Lab 4: Energy & Climate Simulator
  const [coalCapacityGW, setCoalCapacityGW] = useState(210); // GW
  const [solarCapacityGW, setSolarCapacityGW] = useState(75); // GW
  const [annualCoalMT, setAnnualCoalMT] = useState(700); // MT

  // Interactive Lab 5: Consumer Chemical Test & Chipko Forest
  const [selectedChemicalSample, setSelectedChemicalSample] = useState<'pure-turmeric' | 'adulterated-turmeric' | 'pure-milk' | 'watered-milk'>('adulterated-turmeric');
  const [acidReagentApplied, setAcidReagentApplied] = useState(false);
  const [plantedSaplings, setPlantedSaplings] = useState(24);

  // Challenge Drag-Drop / Sort / Numeric / Construct states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT & Timers
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED VALUES & LIVE CALCULATIONS ───
  const funnelStages = useMemo(() => {
    const afterScreening = Math.round((applicantCount * screeningPassRate) / 100);
    const afterTest = Math.round(afterScreening * ((100 - testCutoffScore) / 100) * 1.5);
    const testShortlist = Math.max(10, Math.min(afterScreening, afterTest));
    const afterInterview = Math.max(5, Math.round((testShortlist * interviewPassRate) / 100));
    const afterMedical = Math.max(1, Math.round((afterInterview * medicalPassRate) / 100));
    return {
      applied: applicantCount,
      screened: afterScreening,
      tested: testShortlist,
      interviewed: afterInterview,
      finalOffers: afterMedical,
    };
  }, [applicantCount, screeningPassRate, testCutoffScore, interviewPassRate, medicalPassRate]);

  const trainingCostAnalysis = useMemo(() => {
    if (trainingMode === 'on-the-job') {
      const directCost = traineeCount * 8000; // Stipend
      const scrapLosses = Math.round(traineeCount * (operatorErrorRate / 100) * 8 * scrapCostPerError);
      return {
        directCost,
        indirectCost: scrapLosses,
        totalCost: directCost + scrapLosses,
        riskLevel: 'High Production Risk',
        realism: '100% Real Live Line',
      };
    } else if (trainingMode === 'off-the-job') {
      const directCost = traineeCount * 22000 + 150000; // Venue, simulators, trainers
      const scrapLosses = 0; // Dummy equipment has 0 scrap cost
      return {
        directCost,
        indirectCost: scrapLosses,
        totalCost: directCost,
        riskLevel: 'Zero Operational Risk',
        realism: 'Simulated Dummy Equipment',
      };
    } else {
      // Blended
      const directCost = traineeCount * 14000 + 75000;
      const scrapLosses = Math.round(traineeCount * ((operatorErrorRate * 0.25) / 100) * 2 * scrapCostPerError);
      return {
        directCost,
        indirectCost: scrapLosses,
        totalCost: directCost + scrapLosses,
        riskLevel: 'Controlled Minimal Risk',
        realism: 'Optimal Dual-Phase Transfer',
      };
    }
  }, [trainingMode, traineeCount, operatorErrorRate, scrapCostPerError]);

  const environmentalMetrics = useMemo(() => {
    const co2EmissionsMillionTonnes = Math.round((coalCapacityGW * 5.2) + (annualCoalMT * 1.45) - (solarCapacityGW * 0.8));
    const acidRainPH = Math.max(4.1, Number((5.6 - (coalCapacityGW * 0.005) - (annualCoalMT * 0.0008)).toFixed(2)));
    const coalDepletionYears = Math.round(63000 / Math.max(100, annualCoalMT));
    return {
      co2Emissions: Math.max(120, co2EmissionsMillionTonnes),
      acidRainPH,
      coalDepletionYears,
    };
  }, [coalCapacityGW, solarCapacityGW, annualCoalMT]);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY ADAPTATION ───
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

  // ─── CANVAS 2D ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw active status background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw simulated live stream signal line
      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 4) {
        const y = 18 + Math.sin((x + tick * 3) * 0.05) * 6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Pulsing telemetry dot
      const pulseR = 4 + Math.sin(tick * 0.1) * 2;
      ctx.beginPath();
      ctx.arc(canvas.width - 24, 18, pulseR, 0, Math.PI * 2);
      ctx.fillStyle = '#22c55e';
      ctx.fill();

      // Telemetry caption
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText(`CISCE SIM: C10-COMM-021..032 | MODE: ${difficulty.toUpperCase()}`, 12, 22);

      animId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, [difficulty]);

  // ─── USECALLBACK HANDLERS (14+ EXTRACTED HANDLERS) ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintMsg}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      audioManager.play('pop');
      speechManager.speak('Let us review the step-by-step breakdown together.');
    }
  }, [hintCount, challenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Excellent insight!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Explore each concept hands-on.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Test your own variables without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Starting competency challenges. You can request hints whenever needed.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Great prediction! Now adjust the interactive controls to test and verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Check the data display carefully.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Simulation completed! Excellent progress on your learning pathway.');
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

  const handleAnswer = useCallback((ans: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = ans === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const parsed = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
      isCorrect = Math.abs(parsed - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (ans as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding work.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us study the complete resolution.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const finalOrder = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(finalOrder);
  }, [sortArrangement, challenge, handleAnswer]);

  const handlePRStrategySelect = useCallback((element: 'human-relations' | 'empathy' | 'persuasion' | 'dialogue') => {
    setSelectedPRElement(element);
    audioManager.play('tap');
    let delta = 0;
    if (selectedPRScenario === 'product-defect') {
      delta = element === 'empathy' ? 20 : element === 'dialogue' ? 12 : -10;
    } else if (selectedPRScenario === 'labour-strike') {
      delta = element === 'dialogue' ? 22 : element === 'human-relations' ? 14 : -8;
    } else if (selectedPRScenario === 'brand-campaign') {
      delta = element === 'persuasion' ? 20 : 5;
    } else {
      delta = element === 'empathy' ? 18 : 8;
    }
    setPRTrustIndex(prev => Math.max(20, Math.min(100, 60 + delta)));
    speechManager.speak(`Deploying ${element.replace('-', ' ')} strategy.`);
  }, [selectedPRScenario]);

  const handleApplyAcidTest = useCallback(() => {
    setAcidReagentApplied(true);
    audioManager.play('sparkle');
    setSparklePos({ x: 180, y: 150 });
    setShowSparkle(true);
    speechManager.speak(selectedChemicalSample.includes('adulterated') ? 'Metanil yellow detected! Intense magenta violet reaction.' : 'Pure sample confirmed. Faint reaction only.');
  }, [selectedChemicalSample]);

  const handlePlantSapling = useCallback(() => {
    setPlantedSaplings(p => p + 5);
    audioManager.play('pop');
    speechManager.speak('Chipko afforestation drive expanded! Biomass increased.');
  }, []);

  // ─── CLEANUP ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ═════════════════════════════════════════════════════════════════════════════
  // JSX RENDERING
  // ═════════════════════════════════════════════════════════════════════════════
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700">{subjectConfig.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400 bg-gold-950/60 px-2 py-0.5 rounded-md border border-gold-800">
                CISCE Class 10
              </span>
              <span className="text-xs font-semibold text-slate-400">Commerce Applications</span>
            </div>
            <h1 className="text-lg md:text-xl font-bold text-white mt-0.5">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end md:self-center">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase border tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                : difficulty === 'advanced'
                ? 'bg-rose-950/70 border-rose-500 text-rose-300'
                : 'bg-gold-950/70 border-gold-500 text-gold-300'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <div className="text-right">
            <p className="text-xs text-slate-400">Mastery</p>
            <p className="text-xs font-bold text-gold-300 capitalize">{masteryLevel}</p>
          </div>
        </div>
      </motion.div>

      {/* ─── LIVE TELEMETRY CANVAS STRIP ─── */}
      <canvas ref={canvasRef} width={600} height={32} className="w-full h-8 rounded-lg mb-4 border border-slate-800 shadow-inner" />

      {/* ═════════════════════════════════════════════════════════════════════════
          PHASE 1: DISCOVERY HOOK
      ═════════════════════════════════════════════════════════════════════════ */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          {/* Scenario Overview */}
          <div className="p-5 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/80">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🏢</span>
              <h3 className="text-base md:text-lg font-bold text-gold-200">{SCENARIO.title}</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-3 p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-slate-400">
              <span className="font-semibold text-amber-300">Consultancy Scope: </span>
              {SCENARIO.context}
            </div>
          </div>

          {/* Discovery Question Card */}
          <div className="p-5 bg-slate-800/90 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-2 text-xs font-bold text-gold-400 mb-2 uppercase tracking-wide">
              <span>🎯 Pre-Exploration Curiosity Hook</span>
            </div>
            <p className="text-white font-semibold text-base mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-medium'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-800/50 border-slate-700 text-slate-400 opacity-60'
                      : 'bg-slate-900 hover:bg-slate-750 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-mono text-xs text-gold-400 mr-2">[{String.fromCharCode(65 + i)}]</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-slate-950 rounded-xl border border-gold-900/60">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-medium'}`}>
                  {discoveryCorrect ? '✓ Spot on! Selection is a negative filtering funnel.' : `👉 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <div className="mt-4 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-gold-900/40"
                  >
                    Enter Interactive Labs →
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════���═════════════════════════════
          PHASE 2: GUIDED INTERACTIVE EXPLORATION (5 LABS)
      ═════════════════════════════════════════════════════════════════════════ */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {/* Lab Step Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-none">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  currentSlide === idx
                    ? 'bg-gold-600 border-gold-400 text-white shadow-md'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:bg-slate-750'
                }`}
              >
                {step.title.split(':')[0]}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-4"
            >
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-gold-400">Interactive Lab {currentSlide + 1} of 5</span>
                <h3 className="text-base md:text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-xs text-amber-300 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ─── LAB 1: SELECTION FUNNEL SIMULATOR ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1">1. Screening Pass Rate: <span className="text-gold-300 font-bold">{screeningPassRate}%</span></label>
                      <input
                        type="range"
                        min={10}
                        max={90}
                        value={screeningPassRate}
                        onChange={e => setScreeningPassRate(Number(e.target.value))}
                        className="w-full accent-gold-500"
                        aria-label="Screening Pass Rate"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">2. Aptitude Cut-Off: <span className="text-gold-300 font-bold">{testCutoffScore}%</span></label>
                      <input
                        type="range"
                        min={30}
                        max={90}
                        value={testCutoffScore}
                        onChange={e => setTestCutoffScore(Number(e.target.value))}
                        className="w-full accent-gold-500"
                        aria-label="Aptitude Test Cut-off"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">3. Interview Shortlist: <span className="text-gold-300 font-bold">{interviewPassRate}%</span></label>
                      <input
                        type="range"
                        min={10}
                        max={60}
                        value={interviewPassRate}
                        onChange={e => setInterviewPassRate(Number(e.target.value))}
                        className="w-full accent-gold-500"
                        aria-label="Interview Pass Rate"
                      />
                    </div>
                  </div>

                  {/* SVG Selection Funnel Visualization */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 220" className="w-full h-auto">
                      {/* Funnel Stage 1: Applications */}
                      <polygon points="40,20 560,20 500,60 100,60" fill="#312e81" opacity="0.9" />
                      <text x="300" y="44" textAnchor="middle" fill="#e0e7ff" fontSize="11" fontWeight="bold">
                        Stage 1: Initial Applications ({funnelStages.applied} candidates)
                      </text>

                      {/* Funnel Stage 2: Screened */}
                      <polygon points="100,65 500,65 440,105 160,105" fill="#4338ca" opacity="0.9" />
                      <text x="300" y="89" textAnchor="middle" fill="#e0e7ff" fontSize="11" fontWeight="bold">
                        Stage 2: Cleared Preliminary Screening ({funnelStages.screened})
                      </text>

                      {/* Funnel Stage 3: Tested */}
                      <polygon points="160,110 440,110 390,150 210,150" fill="#4f46e5" opacity="0.9" />
                      <text x="300" y="134" textAnchor="middle" fill="#e0e7ff" fontSize="11" fontWeight="bold">
                        Stage 3: Cleared Written / Tech Tests ({funnelStages.tested})
                      </text>

                      {/* Funnel Stage 4: Interviewed & Medical */}
                      <polygon points="210,155 390,155 350,195 250,195" fill="#6366f1" opacity="0.9" />
                      <text x="300" y="179" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                        Stage 4: Panel & Stress Interview ({funnelStages.interviewed})
                      </text>

                      {/* Funnel Stage 5: Placements */}
                      <rect x="250" y="200" width="100" height="18" rx="4" fill="#10b981" />
                      <text x="300" y="213" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                        Final Hires: {funnelStages.finalOffers}
                      </text>
                    </svg>
                  </div>

                  {/* Observation hook */}
                  {!observationAnswered && (
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                      <p className="text-xs text-gold-300 font-semibold mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleObservation(i)}
                            className="text-left p-2 bg-slate-800 rounded-lg text-xs text-slate-200 hover:bg-slate-700 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ─── LAB 2: ON-THE-JOB VS OFF-THE-JOB MATRIX ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {/* Predict Hook */}
                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/70 rounded-xl border border-gold-800">
                      <p className="text-xs font-bold text-amber-300 mb-1">🔮 Prediction Checkpoint</p>
                      <p className="text-xs md:text-sm text-white mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="w-full text-left p-2.5 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mode Toggles */}
                  <div className="grid grid-cols-3 gap-2">
                    {(['on-the-job', 'off-the-job', 'blended'] as const).map(mode => (
                      <motion.button
                        key={mode}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setTrainingMode(mode);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl text-xs font-bold capitalize transition-all border ${
                          trainingMode === mode
                            ? 'bg-gold-600 border-gold-400 text-white shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                        }`}
                      >
                        {mode.replace(/-/g, ' ')}
                      </motion.button>
                    ))}
                  </div>

                  {/* Controls & Cost Metrics Display */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Trainee Batch Size: <span className="text-gold-300 font-bold">{traineeCount}</span></label>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          value={traineeCount}
                          onChange={e => setTraineeCount(Number(e.target.value))}
                          className="w-full accent-gold-500"
                          aria-label="Trainee Batch Size"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Novice Error Propensity: <span className="text-rose-400 font-bold">{operatorErrorRate}%</span></label>
                        <input
                          type="range"
                          min={5}
                          max={40}
                          value={operatorErrorRate}
                          onChange={e => setOperatorErrorRate(Number(e.target.value))}
                          className="w-full accent-rose-500"
                          aria-label="Novice Error Propensity"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Direct Programme Cost:</span>
                        <span className="font-mono text-slate-200">₹{trainingCostAnalysis.directCost.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Indirect Scrap & Defect Loss:</span>
                        <span className="font-mono text-rose-400 font-bold">₹{trainingCostAnalysis.indirectCost.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-slate-800 font-bold">
                        <span className="text-gold-300">Total Operational Cost:</span>
                        <span className="font-mono text-white">₹{trainingCostAnalysis.totalCost.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="pt-2 flex justify-between text-[11px]">
                        <span className="text-amber-400">Risk Profile: {trainingCostAnalysis.riskLevel}</span>
                        <span className="text-emerald-400">{trainingCostAnalysis.realism}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: PR ELEMENTS & STAKEHOLDER DIALOGUE ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 block mb-2 font-semibold">Select Corporate Scenario:</span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {[
                        { id: 'product-defect', label: '1. Food Recall (Maggi)' },
                        { id: 'labour-strike', label: '2. Wage Dispute (Manesar)' },
                        { id: 'rural-outreach', label: '3. Rural Shakti Project' },
                        { id: 'brand-campaign', label: '4. Amul Topical Campaign' },
                      ].map(sc => (
                        <button
                          key={sc.id}
                          onClick={() => {
                            setSelectedPRScenario(sc.id as typeof selectedPRScenario);
                            audioManager.play('tap');
                          }}
                          className={`p-2 rounded-lg text-xs font-semibold text-left border ${
                            selectedPRScenario === sc.id
                              ? 'bg-gold-950 border-gold-400 text-gold-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          {sc.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { id: 'human-relations', label: 'Human Relations', desc: 'Internal rapport & team goodwill' },
                      { id: 'empathy', label: 'Empathy', desc: 'Cognitive perspective taking' },
                      { id: 'persuasion', label: 'Persuasion', desc: 'Reasoned attitude alignment' },
                      { id: 'dialogue', label: 'Dialogue', desc: 'Bidirectional shared consensus' },
                    ].map(elem => (
                      <motion.button
                        key={elem.id}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handlePRStrategySelect(elem.id as typeof selectedPRElement)}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          selectedPRElement === elem.id
                            ? 'bg-gold-600 border-gold-300 text-white shadow-lg'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900'
                        }`}
                      >
                        <p className="text-xs font-bold">{elem.label}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{elem.desc}</p>
                      </motion.button>
                    ))}
                  </div>

                  {/* Trust Index Meter */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="text-slate-300 font-semibold">Stakeholder Trust Index Outcome:</span>
                      <span className={`font-bold font-mono ${prTrustIndex >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>{prTrustIndex}/100</span>
                    </div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        animate={{ width: `${prTrustIndex}%` }}
                        style={{ backgroundColor: prTrustIndex >= 70 ? '#10b981' : prTrustIndex >= 50 ? '#f59e0b' : '#ef4444' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: ENERGY TRANSITION & CLIMATE SIMULATOR ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1">Coal Thermal Capacity: <span className="text-rose-400 font-bold">{coalCapacityGW} GW</span></label>
                      <input
                        type="range"
                        min={100}
                        max={300}
                        value={coalCapacityGW}
                        onChange={e => setCoalCapacityGW(Number(e.target.value))}
                        className="w-full accent-rose-500"
                        aria-label="Coal Thermal Capacity"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Solar Mega-Parks (Bhadla): <span className="text-emerald-400 font-bold">{solarCapacityGW} GW</span></label>
                      <input
                        type="range"
                        min={20}
                        max={280}
                        value={solarCapacityGW}
                        onChange={e => setSolarCapacityGW(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                        aria-label="Solar Capacity"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Annual Coal Burned: <span className="text-amber-400 font-bold">{annualCoalMT} MT</span></label>
                      <input
                        type="range"
                        min={300}
                        max={1000}
                        value={annualCoalMT}
                        onChange={e => setAnnualCoalMT(Number(e.target.value))}
                        className="w-full accent-amber-500"
                        aria-label="Annual Coal Extraction"
                      />
                    </div>
                  </div>

                  {/* Real-time Environmental Output Gauges */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-center">
                      <p className="text-[11px] text-slate-400">Net CO2 Emissions</p>
                      <p className="text-xl font-bold font-mono text-rose-400 mt-1">{environmentalMetrics.co2Emissions} MT/yr</p>
                      <span className="text-[10px] text-slate-500">Greenhouse forcing index</span>
                    </div>
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-center">
                      <p className="text-[11px] text-slate-400">Regional Rainfall pH</p>
                      <p className={`text-xl font-bold font-mono mt-1 ${environmentalMetrics.acidRainPH < 5.6 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {environmentalMetrics.acidRainPH} pH
                      </p>
                      <span className="text-[10px] text-slate-500">{environmentalMetrics.acidRainPH < 5.6 ? 'Acidic: Corrodes Marble (Taj Mahal)' : 'Normal baseline'}</span>
                    </div>
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-center">
                      <p className="text-[11px] text-slate-400">Coal Reserve Horizon</p>
                      <p className="text-xl font-bold font-mono text-gold-300 mt-1">{environmentalMetrics.coalDepletionYears} Years</p>
                      <span className="text-[10px] text-slate-500">Stock exhaustion at rate</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: CONSUMER ADULTERATION & CHIPKO ECOLOGICAL RESTORATION ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Chemistry Testing Station */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <span className="text-xs font-bold text-amber-300">🧪 FSSAI Food Adulteration Lab</span>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {[
                          { id: 'pure-turmeric', label: 'Pure Turmeric' },
                          { id: 'adulterated-turmeric', label: 'Adulterated Turmeric (Metanil Yellow)' },
                          { id: 'pure-milk', label: 'Pure Dairy Milk' },
                          { id: 'watered-milk', label: 'Watered Milk (Lactometer)' },
                        ].map(sample => (
                          <button
                            key={sample.id}
                            onClick={() => {
                              setSelectedChemicalSample(sample.id as typeof selectedChemicalSample);
                              setAcidReagentApplied(false);
                              audioManager.play('tap');
                            }}
                            className={`p-2 rounded-lg text-left border ${
                              selectedChemicalSample === sample.id
                                ? 'bg-amber-950/70 border-amber-500 text-amber-200'
                                : 'bg-slate-900 border-slate-800 text-slate-400'
                            }`}
                          >
                            {sample.label}
                          </button>
                        ))}
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg text-xs space-y-2">
                        <p className="text-slate-300">
                          Active Sample: <span className="font-bold text-white capitalize">{selectedChemicalSample.replace(/-/g, ' ')}</span>
                        </p>
                        <motion.button
                          whileTap={{ scale: 0.96 }}
                          onClick={handleApplyAcidTest}
                          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold text-xs"
                        >
                          Apply Concentrated HCl Reagent
                        </motion.button>
                        {acidReagentApplied && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-2 rounded bg-slate-950 border border-slate-800">
                            {selectedChemicalSample === 'adulterated-turmeric' ? (
                              <p className="text-rose-400 font-bold">⚠️ VIOLET/MAGENTA CONFIRMED: Toxic Metanil Yellow Coal-Tar Dye Detected!</p>
                            ) : selectedChemicalSample === 'pure-turmeric' ? (
                              <p className="text-emerald-400 font-semibold">✓ Pure Sample: Faint pink fades upon water dilution.</p>
                            ) : selectedChemicalSample === 'watered-milk' ? (
                              <p className="text-amber-400 font-semibold">⚠️ Specific Gravity Low: Water adulteration detected via lactometer reading.</p>
                            ) : (
                              <p className="text-emerald-400 font-semibold">✓ Pure Milk: Normal specific gravity (1.028–1.032).</p>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Chipko Afforestation Drive */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <span className="text-xs font-bold text-emerald-400">🌲 Chipko Community Afforestation</span>
                      <p className="text-xs text-slate-300">Community restoration in Chamoli district (Gaura Devi & Sunderlal Bahuguna legacy).</p>
                      <div className="p-3 bg-slate-900 rounded-lg text-xs space-y-2">
                        <p className="text-slate-300">Community Saplings Cultivated: <span className="font-bold text-emerald-400">{plantedSaplings} Hectares</span></p>
                        <motion.button
                          whileTap={{ scale: 0.96 }}
                          onClick={handlePlantSapling}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs"
                        >
                          + Mobilize Joint Forest Samiti (Plant 5 Ha)
                        </motion.button>
                        <p className="text-[11px] text-slate-400 pt-1">
                          Enforces 1980 Himalayan Green-Felling Ban above 1,000m & Watershed Recharge.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-mono">
              Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-md"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdvanceToSandbox}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md"
              >
                Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ════════════���════════════════════════════════════════════════════════════
          PHASE 3: FREE PLAY SANDBOX
      ═════════════════════════════════════════════════════════════════════════ */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="p-5 bg-gradient-to-br from-slate-900 to-gold-950/40 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🕹️</span>
              <h3 className="text-base md:text-lg font-bold text-white">Free Sandbox Simulation Hub</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Manipulate multiple enterprise levers concurrently. Explore how selection selectivity, training mode, and energy transitions interact before taking on graded challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Quick Levers */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-gold-400 uppercase">Operational Levers</span>
              <div className="space-y-2 text-xs">
                <div>
                  <label className="text-slate-400 flex justify-between">
                    <span>Aptitude Filter Cutoff:</span>
                    <span className="text-gold-300 font-bold">{testCutoffScore}%</span>
                  </label>
                  <input
                    type="range"
                    min={40}
                    max={90}
                    value={testCutoffScore}
                    onChange={e => setTestCutoffScore(Number(e.target.value))}
                    className="w-full accent-gold-500"
                    aria-label="Aptitude Filter Cutoff"
                  />
                </div>
                <div>
                  <label className="text-slate-400 flex justify-between">
                    <span>Solar Grid Addition:</span>
                    <span className="text-emerald-400 font-bold">{solarCapacityGW} GW</span>
                  </label>
                  <input
                    type="range"
                    min={20}
                    max={280}
                    value={solarCapacityGW}
                    onChange={e => setSolarCapacityGW(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                    aria-label="Solar Grid Addition"
                  />
                </div>
                <div>
                  <label className="text-slate-400 flex justify-between">
                    <span>Novice Scrap Risk:</span>
                    <span className="text-rose-400 font-bold">{operatorErrorRate}%</span>
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={35}
                    value={operatorErrorRate}
                    onChange={e => setOperatorErrorRate(Number(e.target.value))}
                    className="w-full accent-rose-500"
                    aria-label="Novice Scrap Risk"
                  />
                </div>
              </div>
            </div>

            {/* Enterprise Dashboard Output */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2.5 text-xs">
              <span className="text-xs font-bold text-emerald-400 uppercase">Composite Output Status</span>
              <div className="p-2.5 bg-slate-900 rounded-lg flex justify-between items-center">
                <span className="text-slate-400">Final Placed Engineers:</span>
                <span className="font-mono font-bold text-gold-300">{funnelStages.finalOffers} hires</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg flex justify-between items-center">
                <span className="text-slate-400">Total Training Expense (Direct + Scrap):</span>
                <span className="font-mono font-bold text-amber-400">₹{trainingCostAnalysis.totalCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg flex justify-between items-center">
                <span className="text-slate-400">CO2 Emissions / Acid pH:</span>
                <span className="font-mono font-bold text-rose-400">{environmentalMetrics.co2Emissions} MT | {environmentalMetrics.acidRainPH} pH</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleAdvanceToChallenge}
              className="px-7 py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-gold-900/50"
            >
              Begin Board Competency Challenges →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════════
          PHASE 4: GRADED COMPETENCY CHALLENGES
      ═════════════════════════════════════════════════════════════════════════ */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {/* Challenge Top Navigation & Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-gold-400 uppercase tracking-wide">Competency: {challenge.competencyLevel}</span>
                <span className="px-2 py-0.5 rounded bg-gold-950 border border-gold-800 text-gold-300 font-bold uppercase text-[10px]">
                  {challenge.difficulty}
                </span>
              </div>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 via-gold-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Main Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-800/90 border-slate-700'
            }`}
          >
            <p className="text-white font-semibold text-sm md:text-base leading-relaxed mb-4">
              {challenge.question}
            </p>

            {/* ─── MCQ (CLASSIFY / DISTINGUISH / MATCH) ─── */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-3.5 rounded-xl text-xs md:text-sm transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-medium'
                        : 'bg-slate-900 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-mono text-xs text-gold-400 mr-2">[{String.fromCharCode(65 + i)}]</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* ─── DRAG-LABEL CHALLENGE ─── */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="w-full text-[11px] text-slate-400 mb-1">Drag each label into its matching box below:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 rounded-lg text-white text-xs font-semibold cursor-grab active:cursor-grabbing border border-gold-500"
                    >
                      ⠿ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { targetId: 'target_dummy', label: 'BSNL RTTC: Dummy Telecom Switching Exchange' },
                    { targetId: 'target_iim', label: 'IIM Ahmedabad: Written Business Dilemma Analysis' },
                    { targetId: 'target_tgroup', label: 'NTPC School: Unstructured Behavioral T-Group' },
                    { targetId: 'target_acting', label: 'Maruti Suzuki: Showroom Customer Role Simulation' },
                  ].map(target => (
                    <div
                      key={target.targetId}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.targetId)}
                      className="p-3.5 bg-slate-950 rounded-xl border border-dashed border-slate-700 flex flex-col justify-between min-h-[75px]"
                    >
                      <span className="text-[11px] text-slate-400">{target.label}</span>
                      <div className="mt-2 p-2 bg-slate-900 rounded-lg text-xs font-bold text-gold-300 border border-slate-800 text-center">
                        {droppedLabels[target.targetId] ? `✓ ${droppedLabels[target.targetId]}` : 'Drop matching label here'}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-2">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation || Object.keys(droppedLabels).length === 0}
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold disabled:opacity-50"
                  >
                    Validate Label Placements
                  </motion.button>
                </div>
              </div>
            )}

            {/* ─── DRAG-SORT CHALLENGE ─── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-amber-300">Drag to arrange the steps into proper operational sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => setDraggedItem(String(idx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, idx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-950 hover:bg-slate-900 rounded-xl border border-slate-800 text-xs md:text-sm text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span>
                        <span className="font-mono text-gold-400 font-bold mr-2">{idx + 1}.</span>
                        {item}
                      </span>
                      <span className="text-slate-600">☰</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-end pt-2">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                  >
                    Check Step Sequence
                  </motion.button>
                </div>
              </div>
            )}

            {/* ─── NUMERIC CHALLENGE ─── */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48"
                    aria-label="Numeric answer input"
                  />
                  <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl disabled:opacity-50"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* ─── CONSTRUCT CHALLENGE ─── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setConstructParts(p => [...p, part])}
                      className="px-3 py-1.5 bg-gold-900/80 hover:bg-gold-800 text-gold-200 border border-gold-700 rounded-lg text-xs font-semibold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] space-y-1.5">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Constructed Blueprint:</span>
                  <div className="flex flex-wrap gap-2">
                    {constructParts.map((part, i) => (
                      <span key={i} className="px-2.5 py-1 bg-gold-700 text-white rounded-md text-xs font-medium flex items-center gap-1.5">
                        {part}
                        <button
                          onClick={() => setConstructParts(cp => cp.filter((_, idx) => idx !== i))}
                          className="text-gold-300 hover:text-white font-bold"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                    {constructParts.length === 0 && <span className="text-xs text-slate-600 italic">Click parts above to assemble your model</span>}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold disabled:opacity-50"
                  >
                    Validate Constructed Model
                  </motion.button>
                </div>
              </div>
            )}

            {/* ─── PROGRESSIVE STEP-BY-STEP EXPLANATION ─── */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 bg-slate-950 rounded-xl border border-gold-900/70 space-y-3">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wide block">Step-by-Step Educational Breakdown:</span>
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p key={idx} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-xs md:text-sm text-slate-300 leading-relaxed">
                      <span className="font-bold text-gold-400 mr-1">{idx + 1}.</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-amber-700/80 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold"
                    >
                      Show Next Detail →
                    </motion.button>
                  ) : <div />}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Simulation →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════════
          PHASE 5: COMPLETION, REFLECTION & SRS REVIEW
      ═════════════════════════════════════════════════════════════════════════ */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5">
          {/* Summary Score Card */}
          <div className="p-6 bg-gradient-to-br from-gold-950/80 to-slate-900 rounded-2xl border border-gold-700 text-center space-y-3">
            <span className="text-4xl">🎓</span>
            <h2 className="text-2xl font-bold text-white">Module Mastery Attained!</h2>
            <div className="flex justify-center gap-6 text-sm">
              <div>
                <p className="text-slate-400">Score</p>
                <p className="text-2xl font-bold font-mono text-emerald-400">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div>
                <p className="text-slate-400">BKT Mastery</p>
                <p className="text-2xl font-bold font-mono text-gold-300 capitalize">{masteryLevel}</p>
              </div>
              <div>
                <p className="text-slate-400">Errors</p>
                <p className="text-2xl font-bold font-mono text-rose-400">{errors}</p>
              </div>
            </div>
            <p className="text-xs text-gold-200 max-w-xl mx-auto leading-relaxed pt-2">
              {errors === 0
                ? 'Flawless performance! You have mastered the entire spectrum from HR selection funnels to Chipko restoration policy.'
                : errors <= 3
                ? 'Strong performance! Review your specific misconception profile below to consolidate your exam edge.'
                : 'Good effort! Review the diagnostic gaps below and re-test in the free sandbox before board assessments.'}
            </p>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-900/60 space-y-3">
              <span className="text-xs font-bold text-rose-300 uppercase tracking-wide">⚠️ Identified Misconception Gaps</span>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-rose-900/40 text-xs space-y-1">
                    <p className="text-rose-300 font-semibold">❌ Misconception: {m.misconception}</p>
                    <p className="text-emerald-300 font-medium">✓ Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition (SRS) Status */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-gold-300">Spaced Review Recommendation (SM-2):</span>
              <p className="text-slate-400 mt-0.5">
                Next memory consolidation session due in{' '}
                <span className="text-amber-300 font-bold">
                  {errors === 0 ? REVIEW_INTERVAL_DAYS[2] : errors <= 3 ? REVIEW_INTERVAL_DAYS[1] : REVIEW_INTERVAL_DAYS[0]} days
                </span>
                .
              </p>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Real-World Capstone Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-wide">📋 Capstone Real-World Project</span>
            <h4 className="text-sm font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-2.5 bg-slate-950 rounded-xl border border-slate-850 text-xs text-slate-300">
                  <span className="font-bold text-gold-400 mr-2">{idx + 1}.</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE MODAL COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Simulation Milestone Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}