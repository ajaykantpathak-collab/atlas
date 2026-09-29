'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ============================================================================
// CONSTANTS & NODE DEFINITIONS
// ============================================================================

const ALL_NODE_IDS = [
  'c12_bio_cbse_214', // Significance of Food Safety and Quality
  'c12_bio_cbse_215', // Factors Driving Increased Food Safety Concerns
  'c12_bio_cbse_216', // Basic Concepts: Toxicity and Hazard
  'c12_bio_cbse_217', // Physical Hazards in Food
  'c12_bio_cbse_218', // Chemical Hazards in Food
  'c12_bio_cbse_219', // Biological Hazards and Food-Borne Pathogens
  'c12_bio_cbse_220', // Food Infection and Food Intoxication
  'c12_bio_cbse_221', // Food-Borne Illness: Causes and Global Impact
  'c12_bio_cbse_222', // Emergence of Food-Borne Pathogens
  'c12_bio_cbse_223', // Parasites and Pest Infestation of Food
  'c12_bio_cbse_224', // Contamination versus Adulteration of Food
  'c12_bio_cbse_225', // Food Quality: Concept and Attributes
  'c12_bio_cbse_226', // Good Manufacturing and Handling Practices (GMP/GHP)
  'c12_bio_cbse_227', // Purpose and Structure of Food Standards
  'c12_bio_cbse_228', // Voluntary Food Certification: ISI Mark and Agmark
  'c12_bio_cbse_229', // International Trade and Food Safety Obligations
  'c12_bio_cbse_230', // Food Safety and Standards Authority of India (FSSAI)
  'c12_bio_cbse_231', // International Food Standards Organizations
  'c12_bio_cbse_232', // Practical: Detection of Food Adulteration
  'c12_bio_cbse_233', // Prevention of Food Adulteration Act 1954 and Its Amendments
  'c12_bio_cbse_234', // World Trade Organization and Food Standards
  'c12_bio_cbse_235', // Hazard Analysis Critical Control Point (HACCP)
  'c12_bio_cbse_236', // Advantages and Implementation of HACCP
  'c12_bio_cbse_237', // Career Avenues in Food Quality and Safety
  'c12_bio_cbse_238', // Food Safety Officer and Food Inspector
  'c12_bio_cbse_239', // Food Analyst and Public Analyst
  'c12_bio_cbse_240', // Food Auditor and HACCP Specialist
  'c12_bio_cbse_241', // Quality Control Analyst and Manager in Food Industry
  'c12_bio_cbse_242', // Entrepreneurship in Food Safety and Quality
  'c12_bio_cbse_243', // Educational Qualifications for Food Safety Careers
  'c12_bio_cbse_244', // Academic and Research Careers in Food Safety
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// Section 1: SCENARIO
const SCENARIO = {
  title: 'National Food Safety & Standards Virtual Command Laboratory',
  intro: 'Welcome, Chief Food Scientist! You have been appointed to lead the National Food Quality Control Laboratory under FSSAI. India faces complex challenges in food safety—from farm-level chemical residue to industrial adulteration and bacterial outbreaks.',
  context: 'In this simulation, you will run chemical adulteration diagnostics, analyze microbial danger zones, design HACCP safety protocols, audit food processing factories, and evaluate regulatory standards for global compliance.',
};

// Section 2: DISCOVERY_QUESTION
const DISCOVERY_QUESTION = {
  question: 'A batch of pasteurized milk tested negative for living pathogenic bacteria, yet consuming it caused acute food poisoning within 2 hours. What is the most bio-chemically accurate explanation?',
  options: [
    'The bacteria resurrected after cooling below 4°C.',
    'Staphylococcus aureus produced heat-stable enterotoxins before pasteurization, which survived high temperatures.',
    'Milk proteins spontaneously transformed into toxic prions during pasteurization.',
    'Pasteurization converts lactose into toxic formaldehyde under mild acidity.'
  ],
  correctIndex: 1,
  hintAfter: 'Pasteurization kills vegetative bacteria like S. aureus, but pre-formed bacterial enterotoxins remain heat-stable and cause rapid onset food intoxication!',
};

// Section 3: EXPLORATION_STEPS
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Chemical Detection of Food Adulteration',
    instruction: 'Select food samples (Milk, Mustard Oil, Turmeric, Dal, Honey) and perform standard reagent tests (HCl, Iodine, Conc. HNO3, Water test) to detect illegal adulterants.',
    interactionType: 'chemical-adulteration-lab',
    nodeId: 'c12_bio_cbse_232',
  },
  {
    title: 'Lab 2: Microbial Growth & Temperature Danger Zone Simulation',
    instruction: 'Adjust storage temperature (0°C to 70°C), pH level, and Water Activity (Aw) to observe bacterial division rates (Salmonella & Clostridium botulinum) and toxin production.',
    interactionType: 'microbial-danger-zone',
    nodeId: 'c12_bio_cbse_219',
  },
  {
    title: 'Lab 3: HACCP Critical Control Point (CCP) Design Studio',
    instruction: 'Design a 7-step HACCP safety workflow for a milk processing plant by identifying Hazards, Critical Control Points, and Critical Limits.',
    interactionType: 'haccp-builder',
    nodeId: 'c12_bio_cbse_235',
  },
  {
    title: 'Lab 4: Regulatory Marks & Compliance Inspector',
    instruction: 'Inspect packaged consumer food items and verify authentic vs counterfeit standards marks: FSSAI License, AGMARK Grade, ISI Mark, and Codex/ISO logos.',
    interactionType: 'standards-inspector',
    nodeId: 'c12_bio_cbse_228',
  },
  {
    title: 'Lab 5: Food Safety Career & Public Audit Simulator',
    instruction: 'Step into the shoes of a Food Safety Officer (FSO) or Public Analyst to inspect high-risk food manufacturing units and issue legal compliance certificates or notices.',
    interactionType: 'career-audit-sim',
    nodeId: 'c12_bio_cbse_238',
  },
];

// Section 4: PREDICTION_QUESTIONS
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What happens when Metanil Yellow dye present in adulterated Arhar Dal reacts with concentrated Hydrochloric Acid (HCl)?',
    options: [
      'The solution turns deep magenta/pink, which persists unless diluted with water.',
      'A dense blue-black precipitate forms immediately.',
      'Effervescence occurs releasing carbon dioxide gas.',
      'The yellow color instantly turns bright emerald green.'
    ],
    correctIndex: 0,
    verifyInstruction: 'Go to Lab 1, choose Arhar Dal, add Concentrated HCl, and observe the characteristic pinkish-magenta color reaction of Metanil Yellow.',
    nodeId: 'c12_bio_cbse_232',
  },
  {
    question: 'Predict: Why does storing cooked food between 5°C and 60°C present the maximum risk for bacterial gastroenteritis?',
    options: [
      'Bacterial cell walls melt at 5°C creating free toxins.',
      'This range represents the optimal enzyme kinetic zone for mesophilic human pathogens to multiply exponentially.',
      'Viruses replicate rapidly without needing host cells in this specific thermal band.',
      'Food nutrients decompose into heavy metal compounds within this range.'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 2, set temperature to 37°C and watch the exponential bacterial population growth curve in the Danger Zone.',
    nodeId: 'c12_bio_cbse_219',
  },
];

// Section 5: OBSERVATION_QUESTIONS
const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to Argemone Oil when tested with Concentrated Nitric Acid (HNO3)?',
    options: [
      'It turns reddish-brown due to sanguinarine alkaloid reaction.',
      'It forms a white curdy precipitate of starch.',
      'It turns brilliant blue due to iodine complexation.',
      'It stays completely clear and transparent.'
    ],
    correctIndex: 0,
    nodeId: 'c12_bio_cbse_232',
  },
  {
    question: 'In the HACCP workflow for pasteurized milk, which step is classified as a Critical Control Point (CCP)?',
    options: [
      'Visual inspection of outer plastic packaging pouches.',
      'Heating milk at 72°C for 15 seconds (HTST Pasteurization) to eliminate pathogens.',
      'Printing the batch number on outer cardboard boxes.',
      'Washing the floor of the dairy loading bay.'
    ],
    correctIndex: 1,
    nodeId: 'c12_bio_cbse_235',
  },
];

// Section 6: REAL_WORLD_ACTIVITY
const REAL_WORLD_ACTIVITY = {
  title: 'Real-World Field Activity: District Food Adulteration Survey & HACCP Audit',
  description: 'Conduct an investigation of daily food staples from local markets and audit a mid-scale dairy processing enterprise according to FSSAI guidelines.',
  steps: [
    'Step 1: Collect 3 food samples: Loose Mustard Oil, Arhar Dal, and Raw Milk from local vendors.',
    'Step 2: Perform the Nitric Acid test for Argemone Oil, HCl test for Metanil Yellow, and Iodine test for Starch in your laboratory setup.',
    'Step 3: Calculate the Adulteration Prevalence Ratio: (Adulterated Samples / Total Samples Tested) * 100.',
    'Step 4: Draft an official FSSAI Non-Compliance Report detailing potential health hazards (e.g., Epidemic Dropsy from Argemone oil).'
  ]
};

// MISCONCEPTIONS (6 topic-specific)
const MISCONCEPTIONS = [
  {
    misconception: 'Food Contamination and Food Adulteration are the exact same thing.',
    correction: 'Contamination is unintentional contamination (accidental microbes, dust, heavy metal trace), whereas Adulteration is intentional addition of inferior/toxic substances or removal of vital nutrients for financial gain.',
    nodeId: 'c12_bio_cbse_224'
  },
  {
    misconception: 'Boiling food neutralizes ALL food safety hazards including toxins.',
    correction: 'Boiling kills vegetative bacterial cells, but heat-stable bacterial toxins (e.g., Staphylococcus enterotoxins, Bacillus cereus emetic toxin) and chemical hazards (pesticides, heavy metals) survive boiling intact.',
    nodeId: 'c12_bio_cbse_218'
  },
  {
    misconception: 'FSSAI certification is a voluntary quality mark like AGMARK or ISI.',
    correction: 'FSSAI license/registration is mandatory by law under the FSS Act 2006 for any food business operator in India, whereas AGMARK and ISI (BIS) are voluntary quality certification schemes (except mandatory ISI items).',
    nodeId: 'c12_bio_cbse_230'
  },
  {
    misconception: 'Food Infection and Food Intoxication mean identical pathological processes.',
    correction: 'Food Infection occurs when live pathogens are ingested and multiply inside the host intestine (e.g., Salmonella). Food Intoxication results from ingesting pre-formed toxins produced by microbes in food prior to consumption (e.g., Botulinum toxin).',
    nodeId: 'c12_bio_cbse_220'
  },
  {
    misconception: 'HACCP is a reactive quality control system applied only on finished final products.',
    correction: 'HACCP is a preventive management system that identifies, evaluates, and controls hazards at critical control points throughout the entire production process, rather than relying solely on end-product testing.',
    nodeId: 'c12_bio_cbse_235'
  },
  {
    misconception: 'Freezing food at -18°C permanently destroys all bacteria.',
    correction: 'Freezing places bacteria into dormancy (bacteriostasis) but does not kill them. Once thawed back to ambient temperature, bacteria resume active metabolism and rapid division.',
    nodeId: 'c12_bio_cbse_219'
  }
];

// DIAGNOSTIC QUESTIONS (8 items)
const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    question: 'Which chemical toxicant is responsible for Epidemic Dropsy and glaucoma when ingested via adulterated mustard oil?',
    options: ['Metanil Yellow', 'Sanguinarine (from Argemone seed oil)', 'Melamine', 'Rhodamine B'],
    correctIndex: 1,
    nodeId: 'c12_bio_cbse_218'
  },
  {
    id: 'diag_2',
    question: 'The Temperature Danger Zone for rapid food-borne bacterial proliferation is standardly defined as:',
    options: ['-18°C to 0°C', '5°C to 60°C (41°F to 140°F)', '75°C to 100°C', '100°C to 120°C'],
    correctIndex: 1,
    nodeId: 'c12_bio_cbse_219'
  },
  {
    id: 'diag_3',
    question: 'Which statutory body replaced legacy laws like the PFA Act 1954 to consolidate food safety regulation in India?',
    options: ['ICMR', 'FSSAI (under FSS Act 2006)', 'BIS', 'Agmark Directorate'],
    correctIndex: 1,
    nodeId: 'c12_bio_cbse_230'
  },
  {
    id: 'diag_4',
    question: 'What type of hazard does glass fragments or hair in a dish represent?',
    options: ['Chemical Hazard', 'Biological Hazard', 'Physical Hazard', 'Nutritional Hazard'],
    correctIndex: 2,
    nodeId: 'c12_bio_cbse_217'
  },
  {
    id: 'diag_5',
    question: 'Which international standard setter operates jointly under FAO and WHO to establish reference global food standards?',
    options: ['ISO', 'Codex Alimentarius Commission (CAC)', 'WTO', 'FDA'],
    correctIndex: 1,
    nodeId: 'c12_bio_cbse_231'
  },
  {
    id: 'diag_6',
    question: 'What is the primary function of a Public Analyst under the FSSAI regulatory hierarchy?',
    options: ['To conduct field inspections of restaurants', 'To analyze food samples sent by FSOs in certified public laboratories', 'To write commercial food advertisements', 'To audit financial records of dairy firms'],
    correctIndex: 1,
    nodeId: 'c12_bio_cbse_239'
  },
  {
    id: 'diag_7',
    question: 'Which agreement under the WTO regulates food safety and animal/plant health standards in international trade?',
    options: ['TRIPS Agreement', 'SPS Agreement (Sanitary and Phytosanitary)', 'NAFTA', 'GATT 1947'],
    correctIndex: 1,
    nodeId: 'c12_bio_cbse_234'
  },
  {
    id: 'diag_8',
    question: 'Which certification mark is specifically designated for agricultural commodities in India like ghee, honey, and spices?',
    options: ['ISI Mark', 'AGMARK', 'FSSAI Organic', 'Bee Star Rating'],
    correctIndex: 1,
    nodeId: 'c12_bio_cbse_228'
  }
];

// CHALLENGES (22+ items across 3 tiers)
interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'mcq' | 'drag-label' | 'numeric' | 'distinguish';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'Recall' | 'Understanding' | 'Application' | 'Analysis' | 'Evaluation';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7 items) ---
  {
    id: 'ch_1',
    nodeId: 'c12_bio_cbse_214',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Why has Food Safety become a critical global concern in modern food supply chains?',
    options: [
      'Urbanization, long supply chains, and emerging foodborne pathogens increase risk exposures',
      'Food is now processed exclusively without heat',
      'Modern humans have lost all natural immunity to food bacteria',
      'Global trade has eliminated all regulatory supervision'
    ],
    correctIndex: 0,
    explanation: 'Rapid urbanization, extended global supply chains, mass catering, and lifestyle shifts increase food exposure to potential contamination at multiple nodes.',
    hints: ['Think about how modern food travels long distances from farm to fork.', 'Consider mass processing plants.', 'Urbanization changes eating habits.']
  },
  {
    id: 'ch_2',
    nodeId: 'c12_bio_cbse_216',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'In toxicological terms, how does a "Hazard" differ fundamentally from "Toxicity"?',
    options: [
      'Toxicity is physical injury; Hazard is chemical poisoning.',
      'Toxicity is the intrinsic capacity of a substance to cause harm; Hazard is the relative probability that harm will occur under specific exposure conditions.',
      'Hazard refers only to biological organisms; Toxicity refers to radiation.',
      'There is no difference between Hazard and Toxicity.'
    ],
    correctIndex: 1,
    explanation: 'Toxicity is an inherent property of an agent. Hazard combines toxicity with exposure probability and dose in a real environment.',
    hints: ['Inherent biological property vs situational probability.', 'Consider exposure dosage.', 'Hazard = Toxicity × Exposure.']
  },
  {
    id: 'ch_3',
    nodeId: 'c12_bio_cbse_217',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which of the following is correctly classified as a PHYSICAL food hazard?',
    options: [
      'Aflatoxin B1 produced by Aspergillus flavus',
      'Staple pins or glass splinters found in packaged bread',
      'Organophosphate pesticide residues on apples',
      'Salmonella enterica colonization on chicken skins'
    ],
    correctIndex: 1,
    explanation: 'Physical hazards include extraneous foreign objects (metal fragments, glass, stones, bone chips, hair) capable of causing choking or physical injury.',
    hints: ['Look for inanimate macroscopic objects.', 'Foreign matter causing mechanical damage.', 'Staples and glass splinters are physical objects.']
  },
  {
    id: 'ch_4',
    nodeId: 'c12_bio_cbse_218',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'A toxic fungal secondary metabolite produced in poorly stored groundnuts and maize is:',
    options: [
      'Aflatoxin',
      'Botulinum neurotoxin',
      'Sanguinarine',
      'Metanil Yellow'
    ],
    correctIndex: 0,
    explanation: 'Aflatoxin is a potent hepatocarcinogenic mycotoxin synthesized by Aspergillus flavus species in high-moisture agricultural crops.',
    hints: ['Produced by Aspergillus fungi.', 'Common in damp peanuts.', 'Starts with "Afla".']
  },
  {
    id: 'ch_5',
    nodeId: 'c12_bio_cbse_224',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Adding water to milk or chalk powder to flour represents:',
    options: [
      'Accidental Contamination',
      'Intentional Food Adulteration',
      'Biological Vector Infestation',
      'Good Manufacturing Practice'
    ],
    correctIndex: 1,
    explanation: 'Intentional adulteration involves deliberately adding cheap/inferior materials or removing essential components for illegal commercial gain.',
    hints: ['Is this done intentionally for profit?', 'Adding cheap fillers intentionally.', 'This is food adulteration.'],
    misconceptionIndex: 0
  },
  {
    id: 'ch_6',
    nodeId: 'c12_bio_cbse_228',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'The AGMARK standard certification in India is administered under which government department?',
    options: [
      'Ministry of Health and Family Welfare',
      'Directorate of Marketing and Inspection (DMI), Ministry of Agriculture',
      'Bureau of Indian Standards (BIS)',
      'Food Corporation of India (FCI)'
    ],
    correctIndex: 1,
    explanation: 'AGMARK is a quality certification seal for agricultural products implemented under the Agricultural Produce (Grading and Marking) Act by DMI.',
    hints: ['Focus on agriculture products.', 'Directorate of Marketing and Inspection.', 'Agriculture Ministry body.']
  },
  {
    id: 'ch_7',
    nodeId: 'c12_bio_cbse_230',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Under which flagship Indian legislation was FSSAI established as an apex regulatory body?',
    options: [
      'Prevention of Food Adulteration Act 1954',
      'Food Safety and Standards Act (FSS Act) 2006',
      'Essential Commodities Act 1955',
      'Consumer Protection Act 2019'
    ],
    correctIndex: 1,
    explanation: 'FSSAI was created under the Food Safety and Standards Act 2006, consolidating eight legacy food laws into a single unified regulatory framework.',
    hints: ['Consolidated law passed in 2006.', 'FSS Act 2006.', 'Unified statutory framework.']
  },

  // --- STANDARD TIER (8 items) ---
  {
    id: 'ch_8',
    nodeId: 'c12_bio_cbse_220',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Distinguish between Typhoid (Salmonella typhi) and Staphylococcal food poisoning:',
    options: [
      'Typhoid is a food infection with long incubation (7-14 days); Staphylococcal poisoning is an intoxication with rapid onset (1-6 hours).',
      'Typhoid is caused by heavy metals; Staphylococcal poisoning is viral.',
      'Typhoid has zero fever; Staphylococcal poisoning causes chronic kidney loss.',
      'Both are food infections with identical incubation periods of 24 hours.'
    ],
    correctIndex: 0,
    explanation: 'Food infection requires pathogen colonization/multiplication inside tissues (longer incubation period), whereas food intoxication is caused by ingesting pre-formed enterotoxins (rapid onset).',
    hints: ['Infection requires bacterial growth inside human intestine.', 'Intoxication uses pre-made toxin.', 'Compare incubation times: hours vs days.'],
    misconceptionIndex: 3
  },
  {
    id: 'ch_9',
    nodeId: 'c12_bio_cbse_226',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Which of the following is a mandatory prerequisite program (PRP) component of Good Manufacturing Practices (GMP)?',
    options: [
      'Designing non-porous cleanable surfaces and sanitary cross-contamination barriers',
      'Maximizing storage humidity to encourage bacterial proliferation',
      'Allowing unwashed personnel to enter sterile packaging zones',
      'Bypassing water chlorination steps'
    ],
    correctIndex: 0,
    explanation: 'GMP mandates structural hygiene, non-reactive cleanable contact surfaces, air filtration, pest control, and personnel hygiene protocols.',
    hints: ['What physical plant design prevents microbial accumulation?', 'Sanitary non-porous surfaces.', 'Cleanable barriers prevent cross-contamination.']
  },
  {
    id: 'ch_10',
    nodeId: 'c12_bio_cbse_231',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'What is the principal mandate of the Codex Alimentarius Commission (CAC)?',
    options: [
      'Protect consumer health and ensure fair practice in international food trade',
      'Set national taxation policy for agro-exports',
      'Provide financial loans to fast food franchises',
      'Regulate medical drug patents'
    ],
    correctIndex: 0,
    explanation: 'Codex Alimentarius was established jointly by FAO and WHO to establish international harmonized food standards, guidelines, and codes of practice.',
    hints: ['Joint FAO/WHO body.', 'Focuses on global consumer protection & trade fairness.', 'Harmonizes international standards.']
  },
  {
    id: 'ch_11',
    nodeId: 'c12_bio_cbse_232',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'To test for the presence of Starch adulteration in a suspected milk sample, which chemical indicator reagent is added?',
    options: [
      'Iodine Solution (yielding a characteristic deep blue-black color)',
      'Concentrated Hydrochloric Acid (yielding pink)',
      'Barium Chloride (yielding white precipitate)',
      'Silver Nitrate (yielding yellow curds)'
    ],
    correctIndex: 0,
    explanation: 'Iodine reacts specifically with amylose structures in starch to form an intense blue-black starch-iodine inclusion complex.',
    hints: ['Classic starch test.', 'Forms a deep blue-black complex.', 'Iodine reagent.']
  },
  {
    id: 'ch_12',
    nodeId: 'c12_bio_cbse_235',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'In a canned fish manufacturing plant, which operational step represents a Critical Control Point (CCP)?',
    options: [
      'Thermal retort sterilization at 121°C for specified lethal time (Fo value)',
      'Attaching decorative brand labels on outer tin cans',
      'Loading cans into transport pallets',
      'Receiving cardboard shipping cartons'
    ],
    correctIndex: 0,
    explanation: 'Thermal retort sterilization directly eliminates spores of Clostridium botulinum. If this step fails, health hazard cannot be corrected downstream.',
    hints: ['Which step prevents fatal Clostridium botulinum spores?', 'Heat sterilization at 121°C.', 'Thermal processing is the CCP.']
  },
  {
    id: 'ch_13',
    nodeId: 'c12_bio_cbse_236',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'What primary advantage does HACCP offer over traditional end-product testing?',
    options: [
      'It is a proactive, preventive risk-management system that prevents hazards during process flow',
      'It guarantees 100% destruction of all chemical elements',
      'It completely removes the need for hygiene in food handlers',
      'It costs zero operational overhead'
    ],
    correctIndex: 0,
    explanation: 'Traditional end-product testing detects defects after they occur, risking mass distribution. HACCP prevents hazard entry at critical stages.',
    hints: ['Proactive prevention vs reactive testing.', 'Catching hazards before product completion.', 'Preventive assurance system.'],
    misconceptionIndex: 4
  },
  {
    id: 'ch_14',
    nodeId: 'c12_bio_cbse_238',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'What legal power is vested in a Food Safety Officer (FSO) under Section 38 of the FSS Act 2006?',
    options: [
      'Power to inspect premises, take food samples, and seal establishments operating without valid license',
      'Power to directly sentence food offenders to prison without court trial',
      'Power to change market prices of staple vegetables',
      'Power to issue export visas to citizens'
    ],
    correctIndex: 0,
    explanation: 'FSOs have legal authorization to enter food premises, inspect operations, draw official samples for Public Analyst testing, and issue improvement notices.',
    hints: ['Inspection and official sample collection duties.', 'Sealing unlicensed premises.', 'Authorized public officer role.']
  },
  {
    id: 'ch_15',
    nodeId: 'c12_bio_cbse_239',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'A sample of ghee submitted by an FSO tests positive for foreign vegetable fats. The statutory duty of the Public Analyst is to:',
    options: [
      'Analyze the sample using validated methods and issue a legal Certificate of Analysis within prescribed timeframe',
      'Throw away the sample without documentation',
      'Arrest the shop owner personally',
      'Sell the sample back to the market'
    ],
    correctIndex: 0,
    explanation: 'Public Analysts operate in designated notified laboratories to perform rigorous scientific testing and provide admissible evidentiary report in court.',
    hints: ['Scientific testing in laboratory.', 'Issues official Certificate of Analysis.', 'Provides legal evidentiary evidence.']
  },

  // --- ADVANCED TIER (7 items) ---
  {
    id: 'ch_16',
    nodeId: 'c12_bio_cbse_221',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Calculate the Disability-Adjusted Life Years (DALY) concept as applied by WHO to measure global food-borne illness burden:',
    options: [
      'DALY = Years of Life Lost (YLL) due to premature mortality + Years Lived with Disability (YLD)',
      'DALY = Total weight of contaminated food confiscated in tonnes',
      'DALY = Number of registered food safety officers multiplied by salary',
      'DALY = Total financial fines collected by FSSAI per year'
    ],
    correctIndex: 0,
    explanation: 'DALY combines premature mortality (YLL) and morbidity duration weighted by severity (YLD) to quantify the total disease burden of food-borne hazards.',
    hints: ['Measures health impact in lost years.', 'Combines mortality (YLL) and morbidity (YLD).', 'WHO public health metric.']
  },
  {
    id: 'ch_17',
    nodeId: 'c12_bio_cbse_222',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Which factor contributes most significantly to the emergence of novel food-borne pathogens like Listeria monocytogenes in modern ready-to-eat chilled foods?',
    options: [
      'Ability of psychrotrophic pathogens to multiply slowly at refrigeration temperatures (4°C) coupled with extended shelf-life',
      'High acidity of citrus fruit juices',
      'Sterilization under ultra-high gamma irradiation',
      'Complete absence of moisture in frozen foods'
    ],
    correctIndex: 0,
    explanation: 'Listeria monocytogenes is a psychrotrophic organism that can grow at 4°C. Extended cold storage of vacuum-sealed ready-to-eat foods selective favors its growth.',
    hints: ['Psychrotrophic organisms love cold.', 'Grows even at 4°C in refrigerators.', 'Ready-to-eat extended storage risk.']
  },
  {
    id: 'ch_18',
    nodeId: 'c12_bio_cbse_229',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'How does the WTO SPS (Sanitary and Phytosanitary) Agreement balance national public safety with free international trade?',
    options: [
      'It permits countries to enforce science-based health measures while banning disguised trade protectionism',
      'It mandates that all countries must accept any food import regardless of contamination',
      'It abolishes all food testing labs worldwide',
      'It grants foreign companies total immunity from local safety laws'
    ],
    correctIndex: 0,
    explanation: 'The SPS agreement allows member nations to set food safety standards based on risk assessment (often Codex-referenced) while preventing arbitrary trade barriers.',
    hints: ['Scientific risk assessment foundation.', 'Prevents protectionism while maintaining safety.', 'Aligns with Codex standards.']
  },
  {
    id: 'ch_19',
    nodeId: 'c12_bio_cbse_234',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Contrast the WTO Sanitary and Phytosanitary (SPS) Agreement with the Technical Barriers to Trade (TBT) Agreement:',
    options: [
      'SPS covers food safety and zoonotic/plant diseases; TBT covers food labeling, packaging, nutritional claims, and quality specifications.',
      'SPS deals only with industrial machinery; TBT deals with biological viruses.',
      'SPS is voluntary; TBT is criminal law.',
      'There is no functional distinction between SPS and TBT agreements.'
    ],
    correctIndex: 0,
    explanation: 'SPS measures explicitly protect human, animal, or plant life from microbiological toxins/pests. TBT governs non-sanitary technical regulations like packaging size and nutritional labeling.',
    hints: ['Sanitary/Pathogens vs Labeling/Technical specs.', 'SPS = Biological safety & pests; TBT = Technical & packaging rules.', 'Distinguish biological risk from labeling.']
  },
  {
    id: 'ch_20',
    nodeId: 'c12_bio_cbse_240',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'An ISO 22000 Lead Auditor discovers that a dairy pasteurizer temperature recorder has been out of calibration for 3 months. What audit finding must be issued?',
    options: [
      'Major Non-Conformity (NC) requiring immediate root-cause analysis and product quarantine',
      'Minor commendation for saving maintenance cost',
      'Instant permanent closure of the country\'s agriculture ministry',
      'No action required since pasteurization is optional'
    ],
    correctIndex: 0,
    explanation: 'Failure of critical CCP monitoring equipment calibration compromises pasteurization efficacy validation, posing a critical food safety hazard (Major NC).',
    hints: ['Uncalibrated CCP monitoring equipment is a severe flaw.', 'Directly impacts pasteurization safety.', 'Requires Major Non-Conformity classification.']
  },
  {
    id: 'ch_21',
    nodeId: 'c12_bio_cbse_242',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'An entrepreneur plans to launch a commercial organic fruit juice venture in India. Which statutory sequence is obligatory prior to commercial production?',
    options: [
      'Obtain FSSAI License/Registration -> Apply for Organic Certification (Jaivik Bharat) -> Implement GMP/HACCP protocols',
      'Sell products on social media without labeling -> Request FSSAI license after 5 years',
      'Obtain tax exemption -> Export products without safety testing',
      'Bypassing packaging regulations and using unwashed fallen fruit'
    ],
    correctIndex: 0,
    explanation: 'FSSAI mandatory licensing under FSS Act 2006 combined with Jaivik Bharat organic certification and HACCP quality assurance is essential before commercial release.',
    hints: ['FSSAI license is the mandatory foundation.', 'Jaivik Bharat logo for organic claim.', 'HACCP ensures process safety.']
  },
  {
    id: 'ch_22',
    nodeId: 'c12_bio_cbse_243',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Under FSSAI rules, what educational qualification is mandatory to qualify for the post of Food Safety Officer (FSO)?',
    options: [
      'Degree in Food Technology, Dairy Technology, Biotechnology, Oil Technology, Agricultural Science, Veterinary Sciences, Bio-Chemistry, Microbiology or Master’s in Chemistry',
      'High school diploma in fine arts',
      'Degree in mechanical civil engineering',
      'Certificate course in commercial accounting'
    ],
    correctIndex: 0,
    explanation: 'FSSAI regulations prescribe specialized Bachelor\'s/Master\'s degrees in Food Technology, Microbiology, Chemistry, or allied biological/agricultural sciences for FSOs.',
    hints: ['Requires specialized biological or chemical science degree.', 'Food Tech, Microbiology, Chemistry, Agri Science.', 'Ensures technical competence for food inspection.']
  }
];

// ============================================================================
// TOPIC-SPECIFIC SVG DIAGRAM COMPONENTS
// ============================================================================

const HaccpFlowchartDiagram: React.FC<{ activeStep: number }> = ({ activeStep }) => {
  const steps = [
    { title: '1. Hazard Analysis', desc: 'Identify Bio, Chem, Phys Hazards', color: '#3B82F6' },
    { title: '2. Determine CCPs', desc: 'Points essential to prevent hazard', color: '#10B981' },
    { title: '3. Critical Limits', desc: 'Establish max/min safety boundaries', color: '#F59E0B' },
    { title: '4. Monitoring System', desc: 'Continuous sensor & lab checks', color: '#8B5CF6' },
    { title: '5. Corrective Actions', desc: 'Quarantine non-compliant batches', color: '#EF4444' },
    { title: '6. Verification', desc: 'Internal audits & calibration', color: '#06B6D4' },
    { title: '7. Documentation', desc: 'Complete FSSAI audit records', color: '#64748B' },
  ];

  return (
    <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700 shadow-xl text-white">
      <h4 className="text-center font-bold text-amber-400 mb-3 text-sm tracking-wide uppercase">
        HACCP 7-Principle Preventive Safety Architecture
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
        {steps.map((s, idx) => {
          const isActive = idx === activeStep;
          return (
            <div
              key={idx}
              className={`p-2 rounded-lg border text-center transition-all duration-300 ${
                isActive
                  ? 'bg-amber-500/20 border-amber-400 scale-105 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800/60 border-slate-700 opacity-80'
              }`}
            >
              <div className="w-6 h-6 rounded-full mx-auto mb-1 flex items-center justify-center font-bold text-xs" style={{ backgroundColor: s.color }}>
                {idx + 1}
              </div>
              <div className="text-xs font-bold text-slate-200 line-clamp-1">{s.title.split('. ')[1]}</div>
              <div className="text-[10px] text-slate-400 mt-1 line-clamp-2">{s.desc}</div>
            </div>
          );
        })}
      </div>
      <svg className="w-full h-8 mt-2" viewBox="0 0 700 30">
        <defs>
          <linearGradient id="haccpArrow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
        </defs>
        <path d="M 20 15 L 670 15" stroke="url(#haccpArrow)" strokeWidth="4" strokeDasharray="6 4" />
        <polygon points="680,15 665,8 665,22" fill="#EF4444" />
      </svg>
    </div>
  );
};

const StandardsHierarchyDiagram: React.FC = () => {
  return (
    <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700 text-white">
      <h4 className="text-center font-bold text-gold-400 mb-2 text-sm uppercase tracking-wider">
        Food Safety & Regulatory Hierarchy Spectrum
      </h4>
      <div className="relative flex flex-col items-center justify-center space-y-2 py-2">
        {/* Tier 1: International */}
        <div className="w-full max-w-md bg-gradient-to-r from-gold-900/60 to-gold-900/60 border border-gold-500/50 p-2.5 rounded-lg text-center shadow">
          <span className="text-xs font-bold text-gold-300">INTERNATIONAL HARMONIZATION TIER</span>
          <p className="text-[11px] text-slate-300">Codex Alimentarius (FAO/WHO) • ISO 22000 • WTO (SPS / TBT)</p>
        </div>
        {/* Tier 2: National Mandatory Statutory */}
        <div className="w-11/12 max-w-sm bg-gradient-to-r from-emerald-900/60 to-teal-900/60 border border-emerald-500/50 p-2.5 rounded-lg text-center shadow">
          <span className="text-xs font-bold text-emerald-300">NATIONAL MANDATORY STATUTORY TIER</span>
          <p className="text-[11px] text-slate-300">FSSAI (FSS Act 2006) • Central / State Food Safety Officers</p>
        </div>
        {/* Tier 3: Voluntary Quality Certification */}
        <div className="w-5/6 max-w-xs bg-gradient-to-r from-amber-900/60 to-orange-900/60 border border-amber-500/50 p-2 rounded-lg text-center shadow">
          <span className="text-xs font-bold text-amber-300">VOLUNTARY QUALITY MARKS TIER</span>
          <p className="text-[11px] text-slate-300">AGMARK (Agriculture) • ISI / BIS (Processed Products)</p>
        </div>
      </div>
    </div>
  );
};

const AdulterationTestTubeDiagram: React.FC<{
  sampleName: string;
  reagentName: string;
  reactionColor: string;
  isPositive: boolean;
  chemicalEquation: string;
}> = ({ sampleName, reagentName, reactionColor, isPositive, chemicalEquation }) => {
  return (
    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-between text-white">
      <div className="text-xs font-semibold text-slate-300 mb-2">
        Test Tube Diagnostic: <span className="text-amber-400">{sampleName}</span> + <span className="text-gold-400">{reagentName}</span>
      </div>
      <svg className="w-32 h-44 my-1" viewBox="0 0 100 150">
        {/* Test Tube Glass Outline */}
        <path d="M 35 10 L 35 120 A 15 15 0 0 0 65 120 L 65 10 Z" fill="none" stroke="#94A3B8" strokeWidth="3" />
        <ellipse cx="50" cy="10" rx="15" ry="3" fill="#64748B" stroke="#94A3B8" strokeWidth="1" />
        
        {/* Liquid Base */}
        <path d="M 36 60 L 36 120 A 14 14 0 0 0 64 120 L 64 60 Z" fill={reactionColor} opacity="0.85" />
        
        {/* Meniscus */}
        <ellipse cx="50" cy="60" rx="14" ry="3" fill={reactionColor} opacity="0.95" />
        
        {/* Bubbles or Precipitate effect if positive */}
        {isPositive && (
          <g>
            <circle cx="45" cy="80" r="2" fill="#FFFFFF" opacity="0.7" className="animate-ping" />
            <circle cx="53" cy="95" r="3" fill="#FFFFFF" opacity="0.6" />
            <circle cx="48" cy="110" r="2" fill="#FFFFFF" opacity="0.8" />
          </g>
        )}
      </svg>
      <div className="text-center mt-2">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${isPositive ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'}`}>
          {isPositive ? 'POSITIVE: ADULTERANT DETECTED' : 'NEGATIVE: PURITY VERIFIED'}
        </span>
        <p className="text-[11px] text-slate-400 mt-2 font-mono bg-slate-900 p-1.5 rounded border border-slate-800">
          {chemicalEquation}
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// CANVAS ANIMATION: MICROBIAL GROWTH DANGER ZONE
// ============================================================================

const MicrobialGrowthCanvas: React.FC<{ temp: number; ph: number; waterActivity: number }> = ({ temp, ph, waterActivity }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Calculate growth rate factor (0 to 1) based on danger zone (5°C to 60°C, optimal 37°C, pH 6.5-7.5, Aw > 0.9)
  const growthRate = useMemo(() => {
    let tempFactor = 0;
    if (temp >= 5 && temp <= 60) {
      // Gaussian peaked around 37°C
      tempFactor = Math.exp(-Math.pow(temp - 37, 2) / 180);
    } else {
      tempFactor = 0.02;
    }

    let phFactor = Math.exp(-Math.pow(ph - 7.0, 2) / 4);
    let awFactor = waterActivity > 0.85 ? waterActivity : 0.05;

    return Math.max(0.01, tempFactor * phFactor * awFactor);
  }, [temp, ph, waterActivity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let bacteriaList = Array.from({ length: Math.floor(growthRate * 60) + 10 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (growthRate * 4 + 0.5),
      vy: (Math.random() - 0.5) * (growthRate * 4 + 0.5),
      radius: Math.random() * 3 + 3,
      splitTimer: Math.random() * 100,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Danger Overlay
      const isDangerZone = temp >= 5 && temp <= 60;
      ctx.fillStyle = isDangerZone ? 'rgba(239, 68, 68, 0.05)' : 'rgba(16, 185, 129, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid pattern
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw Bacteria
      bacteriaList.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;

        if (b.x < 10 || b.x > canvas.width - 10) b.vx *= -1;
        if (b.y < 10 || b.y > canvas.height - 10) b.vy *= -1;

        ctx.beginPath();
        ctx.ellipse(b.x, b.y, b.radius * 1.5, b.radius, Math.atan2(b.vy, b.vx), 0, Math.PI * 2);
        ctx.fillStyle = isDangerZone ? '#EF4444' : '#3B82F6';
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Flagella tail
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(b.x - b.vx * 4, b.y - b.vy * 4);
        ctx.strokeStyle = isDangerZone ? 'rgba(239, 68, 68, 0.5)' : 'rgba(59, 130, 246, 0.5)';
        ctx.stroke();
      });

      // HUD Text
      ctx.fillStyle = isDangerZone ? '#FCA5A5' : '#6EE7B7';
      ctx.font = '12px sans-serif';
      ctx.fillText(`Microbial Division Rate: ${(growthRate * 100).toFixed(1)}% / min`, 15, 25);
      ctx.fillText(`Thermal Zone: ${isDangerZone ? 'DANGER ZONE (5°C - 60°C)' : 'SAFE PRESERVATION ZONE'}`, 15, 45);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [growthRate, temp]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-slate-700 shadow-inner bg-slate-950">
      <canvas ref={canvasRef} width={600} height={220} className="w-full h-52 block" />
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT CLASS / INTERFACE
// ============================================================================

export interface C12_BiologyFoodQualityCBSESimProps {
  onComplete?: (score: number) => void;
  initialTab?: 'discovery' | 'lab' | 'challenges' | 'summary';
}

export function C12_BiologyFoodQualityCBSESim({
  onComplete,
  initialTab = 'discovery'
}: C12_BiologyFoodQualityCBSESimProps) {
  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>(initialTab);
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);
  
  // BKT & SRS State
  const [bktStates, setBktStates] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial as Record<NodeId, ReturnType<typeof createBKTState>>;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    CHALLENGES.forEach((c) => {
      initial[c.id] = createReviewItem(c.id);
    });
    return initial;
  });

  // Discovery Question State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Prediction Questions State
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [predictionSubmitted, setPredictionSubmitted] = useState<Record<number, boolean>>({});

  // Observation Questions State
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // Lab 1: Chemical Detection Lab State
  const [selectedFood, setSelectedFood] = useState<'milk' | 'mustard_oil' | 'turmeric' | 'dal' | 'honey'>('dal');
  const [selectedReagent, setSelectedReagent] = useState<'hcl' | 'iodine' | 'hno3' | 'water'>('hcl');
  const [lab1Tested, setLab1Tested] = useState<boolean>(false);

  // Lab 2: Microbial Danger Zone State
  const [simTemp, setSimTemp] = useState<number>(37);
  const [simPh, setSimPh] = useState<number>(7.0);
  const [simWaterActivity, setSimWaterActivity] = useState<number>(0.95);

  // Lab 3: HACCP Builder State
  const [haccpSteps, setHaccpSteps] = useState<number[]>([0, 1, 2]);

  // Lab 4: Regulatory Marks Inspector State
  const [inspectedMark, setInspectedMark] = useState<'fssai' | 'agmark' | 'isi' | 'codex'>('fssai');

  // Lab 5: Career & Audit Simulator State
  const [selectedRole, setSelectedRole] = useState<'fso' | 'public_analyst' | 'haccp_auditor'>('fso');
  const [auditDecision, setAuditDecision] = useState<string | null>(null);

  // Challenges State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Interactive Feedback & UI State
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Auto-hint Ref Timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // --------------------------------------------------------------------------
  // INACTIVITY HINT TIMER
  // --------------------------------------------------------------------------
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && !challengeSubmitted) {
        const c = CHALLENGES[currentChallengeIndex];
        setCurrentHint(`Auto-Hint: ${c.hints[0]}`);
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 10000);
  }, [activeTab, challengeSubmitted, currentChallengeIndex]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, currentChallengeIndex, activeTab]);

  // --------------------------------------------------------------------------
  // HANDLERS FOR DISCOVERY & LABS
  // --------------------------------------------------------------------------
  const handleDiscoverySubmit = (idx: number) => {
    setDiscoverySelected(idx);
    setDiscoverySubmitted(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      speechManager.speak('Correct deduction! Pre-formed microbial toxins persist even after heat treatment.');
      setShowSparkle(true);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Consider heat stability of pre-formed toxins versus living bacteria.');
    }
  };

  const handleLab1Test = () => {
    setLab1Tested(true);
    audioManager.play('balance');
    speechManager.speak(`Testing ${selectedFood} with ${selectedReagent}. Observe color transformation.`);
  };

  const handleChallengeAnswer = (optIndex: number) => {
    if (challengeSubmitted) return;
    setSelectedOption(optIndex);
    setChallengeSubmitted(true);

    const currentChallenge = CHALLENGES[currentChallengeIndex];
    const isCorrect = optIndex === currentChallenge.correctIndex;

    // Update BKT
    const node = currentChallenge.nodeId;
    const prevBkt = bktStates[node] || createBKTState();
    const updatedBkt = bktUpdate(prevBkt, isCorrect);
    setBktStates((prev) => ({ ...prev, [node]: updatedBkt }));

    // Update SRS
    const prevSrs = srsItems[currentChallenge.id] || createReviewItem(currentChallenge.id);
    const updatedSrs = sm2Update(prevSrs, isCorrect ? 5 : 2);
    setSrsItems((prev) => ({ ...prev, [currentChallenge.id]: updatedSrs }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      speechManager.speak('Excellent scientific reasoning!');
      setScore((s) => s + 10);
      setShowSparkle(true);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Incorrect. Review the safety parameters.');
    }
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      setSelectedOption(null);
      setChallengeSubmitted(false);
      setShowHint(false);
    } else {
      // Completed all challenges
      audioManager.play('celebration');
      setShowConfetti(true);
      setShowSuccess(true);
      const totalScore = Math.round((score / (CHALLENGES.length * 10)) * 100);
      recordGameScore('c12_bio_food_quality', totalScore);
      if (onComplete) onComplete(totalScore);
      setActiveTab('summary');
    }
  };

  // Lab 1 Diagnostic Logic
  const getLab1Result = () => {
    if (selectedFood === 'dal' && selectedReagent === 'hcl') {
      return {
        isPositive: true,
        color: '#EC4899', // Pinkish magenta
        adulterant: 'Metanil Yellow Dye',
        equation: 'Metanil Yellow (Ar-N=N-Ar\') + HCl (aq) ──> Quinoid Pink Complex',
        explanation: 'Metanil Yellow is a non-permitted coal tar dye causing testicular atrophy and neurotoxicity.'
      };
    }
    if (selectedFood === 'milk' && selectedReagent === 'iodine') {
      return {
        isPositive: true,
        color: '#1E3A8A', // Deep Blue-Black
        adulterant: 'Starch / Rice Flour',
        equation: 'Amylose + I2 ──> Amylose-Iodine Inclusion Complex (Deep Blue-Black)',
        explanation: 'Starch is added illegally to artificially inflate milk solids-not-fat (SNF) density.'
      };
    }
    if (selectedFood === 'mustard_oil' && selectedReagent === 'hno3') {
      return {
        isPositive: true,
        color: '#B45309', // Reddish-brown
        adulterant: 'Argemone Seed Oil',
        equation: 'Sanguinarine / Dihydrosanguinarine + Conc. HNO3 ──> Red Nitro Derivative',
        explanation: 'Argemone toxicity causes Epidemic Dropsy, severe edema, cardiac arrest, and glaucoma.'
      };
    }
    return {
      isPositive: false,
      color: '#38BDF8', // Clear blue/yellow natural
      adulterant: 'None (Pure Sample)',
      equation: 'No reactive chromophore complex formed.',
      explanation: 'The food sample shows negative response for tested synthetic chemical adulterants.'
    };
  };

  const lab1Res = getLab1Result();

  // --------------------------------------------------------------------------
  // COMPONENT RENDER
  // --------------------------------------------------------------------------
  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-3 md:p-6 flex flex-col space-y-4">
      {/* HEADER SECTION */}
      <header className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <svg className="w-8 h-8 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                ISC Class 12 Biology
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                FSSAI / HACCP Compliant
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-1">
              Food Quality & Safety Virtual Command Center
            </h1>
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 space-x-1">
          {[
            { id: 'discovery', label: '1. Discovery' },
            { id: 'lab', label: '2. Virtual Lab (5)' },
            { id: 'challenges', label: '3. Challenges (22)' },
            { id: 'summary', label: '4. Summary & Audit' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as typeof activeTab);
                audioManager.play('tap');
              }}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* FEEDBACK OVERLAYS */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="National Food Safety Certification Complete!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-xl">
        {/* ==================================================================== */}
        {/* TAB 1: DISCOVERY */}
        {/* ==================================================================== */}
        {activeTab === 'discovery' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Scenario Narrative */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-amber-500/30 p-6 rounded-2xl shadow-xl">
              <h2 className="text-xl font-black text-amber-400 mb-2 flex items-center space-x-2">
                <span>{SCENARIO.title}</span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 font-mono">
                {SCENARIO.context}
              </div>
            </div>

            {/* Counter-Intuitive Discovery Question */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Scientific Diagnostic Case Study
              </span>
              <h3 className="text-base font-bold text-white leading-snug">{DISCOVERY_QUESTION.question}</h3>
              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                      discoverySubmitted
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : idx === discoverySelected
                          ? 'bg-red-500/20 border-red-500 text-red-300'
                          : 'bg-slate-950 border-slate-800 text-slate-500'
                        : discoverySelected === idx
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{option}</span>
                    {discoverySubmitted && idx === DISCOVERY_QUESTION.correctIndex && (
                      <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                    )}
                  </button>
                ))}
              </div>

              {discoverySubmitted && (
                <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-amber-500/40 text-xs text-amber-200 leading-relaxed">
                  <strong>Biochemical Key Concept:</strong> {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS SECTION */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-gold-400 uppercase tracking-wider">
                Hypothesis & Prediction Tests
              </h3>
              <div className="space-y-4">
                {PREDICTION_QUESTIONS.map((pq, pqIdx) => (
                  <div key={pqIdx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <p className="text-xs font-semibold text-slate-200">{pq.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {pq.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => {
                            setPredictionAnswers((prev) => ({ ...prev, [pqIdx]: optIdx }));
                            setPredictionSubmitted((prev) => ({ ...prev, [pqIdx]: true }));
                            if (optIdx === pq.correctIndex) {
                              audioManager.play('pop');
                            } else {
                              audioManager.play('error');
                            }
                          }}
                          className={`p-2.5 rounded-lg border text-xs text-left transition-all ${
                            predictionSubmitted[pqIdx]
                              ? optIdx === pq.correctIndex
                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                                : predictionAnswers[pqIdx] === optIdx
                                ? 'bg-red-500/20 border-red-500 text-red-300'
                                : 'bg-slate-900 border-slate-800 text-slate-500'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {predictionSubmitted[pqIdx] && (
                      <div className="text-[11px] text-slate-400 bg-slate-900 p-2.5 rounded border border-slate-800">
                        🔍 <strong>Verification Path:</strong> {pq.verifyInstruction}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setActiveTab('lab');
                  audioManager.play('whoosh');
                }}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all"
              >
                Proceed to Virtual Exploration Labs →
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: VIRTUAL LABS */}
        {/* ==================================================================== */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Exploration Lab Selector */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveLabIndex(idx);
                    audioManager.play('tap');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                    activeLabIndex === idx
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{step.title.split(':')[0]}</span>
                </button>
              ))}
            </div>

            {/* Active Lab Header & Instruction */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-amber-400">
                  {EXPLORATION_STEPS[activeLabIndex].title}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {EXPLORATION_STEPS[activeLabIndex].instruction}
                </p>
              </div>
              <span className="text-[10px] font-mono bg-slate-900 border border-slate-700 px-3 py-1 rounded-full text-gold-400">
                Node Ref: {EXPLORATION_STEPS[activeLabIndex].nodeId}
              </span>
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* LAB 1: CHEMICAL DETECTION LAB */}
            {/* ---------------------------------------------------------------- */}
            {activeLabIndex === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Step 1: Select Suspected Food Sample & Reagent
                  </h4>
                  <div className="space-y-3">
                    <label className="text-xs text-slate-400 block font-medium">Food Commodity:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'dal', label: 'Arhar Dal' },
                        { id: 'milk', label: 'Raw Milk' },
                        { id: 'mustard_oil', label: 'Mustard Oil' },
                        { id: 'turmeric', label: 'Turmeric' },
                        { id: 'honey', label: 'Commercial Honey' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setSelectedFood(item.id as typeof selectedFood);
                            setLab1Tested(false);
                            audioManager.play('pickup');
                          }}
                          className={`p-2.5 rounded-lg border text-xs font-semibold ${
                            selectedFood === item.id
                              ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    <label className="text-xs text-slate-400 block font-medium pt-2">Diagnostic Reagent:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'hcl', label: 'Conc. HCl (Hydrochloric Acid)' },
                        { id: 'iodine', label: 'Iodine Solution (I2/KI)' },
                        { id: 'hno3', label: 'Conc. HNO3 (Nitric Acid)' },
                        { id: 'water', label: 'Distilled Water' },
                      ].map((r) => (
                        <button
                          key={r.id}
                          onClick={() => {
                            setSelectedReagent(r.id as typeof selectedReagent);
                            setLab1Tested(false);
                            audioManager.play('pickup');
                          }}
                          className={`p-2.5 rounded-lg border text-xs font-semibold ${
                            selectedReagent === r.id
                              ? 'bg-gold-500/20 border-gold-500 text-gold-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleLab1Test}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg mt-2 transition-all hover:opacity-95"
                    >
                      Execute Chemical Reagent Test
                    </button>
                  </div>
                </div>

                <div>
                  {lab1Tested ? (
                    <AdulterationTestTubeDiagram
                      sampleName={selectedFood.toUpperCase().replace('_', ' ')}
                      reagentName={selectedReagent.toUpperCase()}
                      reactionColor={lab1Res.color}
                      isPositive={lab1Res.isPositive}
                      chemicalEquation={lab1Res.equation}
                    />
                  ) : (
                    <div className="h-full bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center text-slate-500 text-xs">
                      <svg className="w-12 h-12 mb-2 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.594 15.1a2 2 0 00-2.348 2.348l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 003.86.517l2.387-.477a2 2 0 001.022-.547" />
                      </svg>
                      Select sample & reagent above, then click "Execute Chemical Reagent Test" to run assay.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------------------- */}
            {/* LAB 2: MICROBIAL DANGER ZONE */}
            {/* ---------------------------------------------------------------- */}
            {activeLabIndex === 1 && (
              <div className="space-y-6">
                <MicrobialGrowthCanvas temp={simTemp} ph={simPh} waterActivity={simWaterActivity} />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400 font-medium">Temperature (°C):</span>
                      <span className="font-bold text-amber-400">{simTemp}°C</span>
                    </div>
                    <input
                      type="range"
                      min="-10"
                      max="80"
                      value={simTemp}
                      onChange={(e) => setSimTemp(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>-10°C (Freezer)</span>
                      <span>37°C (Optimal)</span>
                      <span>80°C (Hot)</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400 font-medium">pH Level (Acidity):</span>
                      <span className="font-bold text-gold-400">{simPh}</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="10"
                      step="0.1"
                      value={simPh}
                      onChange={(e) => setSimPh(parseFloat(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>pH 2.0 (Lemon)</span>
                      <span>pH 7.0 (Neutral)</span>
                      <span>pH 10 (Alkaline)</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400 font-medium">Water Activity (Aw):</span>
                      <span className="font-bold text-emerald-400">{simWaterActivity}</span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="1.0"
                      step="0.05"
                      value={simWaterActivity}
                      onChange={(e) => setSimWaterActivity(parseFloat(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>0.2 (Dried Powder)</span>
                      <span>0.95 (Fresh Food)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------------------- */}
            {/* LAB 3: HACCP DESIGN STUDIO */}
            {/* ---------------------------------------------------------------- */}
            {activeLabIndex === 2 && (
              <div className="space-y-6">
                <HaccpFlowchartDiagram activeStep={haccpSteps[haccpSteps.length - 1] || 0} />
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Interactive Milk Processing Plant HACCP Configurator
                  </h4>
                  <p className="text-xs text-slate-400">
                    Click through the workflow steps to define critical control points (CCPs) for thermal pasteurization:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      '1. Raw Milk Reception (Sensor Check)',
                      '2. Clarification & Separation',
                      '3. HTST Pasteurization (72°C / 15s) [CCP-1]',
                      '4. Rapid Chilling to 4°C [CCP-2]',
                      '5. Aseptic Packaging [CCP-3]',
                      '6. Cold Chain Storage',
                      '7. Dispatch Logistics'
                    ].map((stepName, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setHaccpSteps((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
                          audioManager.play('count');
                        }}
                        className={`p-3 rounded-lg border text-xs font-semibold ${
                          haccpSteps.includes(idx)
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {stepName}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------------------- */}
            {/* LAB 4: STANDARDS INSPECTOR */}
            {/* ---------------------------------------------------------------- */}
            {activeLabIndex === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <StandardsHierarchyDiagram />
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Inspect Commodity Standard Marks
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'fssai', name: 'FSSAI License', type: 'Mandatory Legal (14-digit)' },
                      { id: 'agmark', name: 'AGMARK Seal', type: 'Voluntary Agriculture Quality' },
                      { id: 'isi', name: 'ISI / BIS Mark', type: 'Voluntary Processed Certification' },
                      { id: 'codex', name: 'Codex Standard', type: 'International Global Harmonization' }
                    ].map((mark) => (
                      <button
                        key={mark.id}
                        onClick={() => {
                          setInspectedMark(mark.id as typeof inspectedMark);
                          audioManager.play('pop');
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          inspectedMark === mark.id
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold">{mark.name}</div>
                        <div className="text-[10px] text-slate-400">{mark.type}</div>
                      </button>
                    ))}
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    {inspectedMark === 'fssai' && (
                      <p>
                        <strong>FSSAI 14-Digit Number Format:</strong> Format: 100 18 011 000 123.
                        Digit 1 = Registration status, Digits 2-3 = State code, Digits 4-5 = Year of licensing, Digits 6-8 = Enrolling officer, Digits 9-14 = Manufacturer unique serial number.
                      </p>
                    )}
                    {inspectedMark === 'agmark' && (
                      <p>
                        <strong>AGMARK Grading:</strong> Governed by Agricultural Produce (Grading and Marking) Act 1937. Classifies raw agricultural commodities (Special, Good, Fair, Ordinary) based on chemical purity, moisture, and acid value.
                      </p>
                    )}
                    {inspectedMark === 'isi' && (
                      <p>
                        <strong>ISI (Bureau of Indian Standards):</strong> Voluntary quality mark certifying industrial compliance with Indian Standards (IS specs). Mandatory for bottled drinking water, milk powder, and food colors.
                      </p>
                    )}
                    {inspectedMark === 'codex' && (
                      <p>
                        <strong>Codex Alimentarius Commission (CAC):</strong> International reference body under FAO/WHO. Sets Maximum Residue Limits (MRLs) for pesticides, food additive safety levels, and international trade specifications.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------------------- */}
            {/* LAB 5: CAREER & AUDIT SIMULATOR */}
            {/* ---------------------------------------------------------------- */}
            {activeLabIndex === 4 && (
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                      Role-Play Career Simulation
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Choose your professional role and resolve real-world food regulatory incidents:
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {[
                      { id: 'fso', title: 'Food Safety Officer' },
                      { id: 'public_analyst', title: 'Public Analyst' },
                      { id: 'haccp_auditor', title: 'ISO 22000 Lead Auditor' }
                    ].map((role) => (
                      <button
                        key={role.id}
                        onClick={() => {
                          setSelectedRole(role.id as typeof selectedRole);
                          setAuditDecision(null);
                          audioManager.play('swoop');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          selectedRole === role.id
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-900 border border-slate-800 text-slate-400'
                        }`}
                      >
                        {role.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
                  {selectedRole === 'fso' && (
                    <>
                      <h5 className="text-xs font-bold text-slate-200">
                        Incident #804: Unlicensed Dairy Processing Unit Inspection
                      </h5>
                      <p className="text-xs text-slate-400">
                        During a routine field check, you enter a sweet preparation facility operating without an FSSAI license. Non-food grade dye (Rhodamine B) is detected near boiling vats.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            setAuditDecision('issued_seizure');
                            audioManager.play('celebration');
                          }}
                          className="p-3 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold text-left"
                        >
                          Option A: Issue immediate Improvement Notice, seize adulterated stock under Section 38, and file formal court petition.
                        </button>
                        <button
                          onClick={() => {
                            setAuditDecision('wrong_action');
                            audioManager.play('error');
                          }}
                          className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 text-xs text-left"
                        >
                          Option B: Grant oral warning and leave without seizing dyes.
                        </button>
                      </div>
                    </>
                  )}

                  {selectedRole === 'public_analyst' && (
                    <>
                      <h5 className="text-xs font-bold text-slate-200">
                        Sample #912 Assay: Honey Adulteration by High Fructose Corn Syrup (HFCS)
                      </h5>
                      <p className="text-xs text-slate-400">
                        An official sample of packaged honey shows carbon stable isotope ratio (C13/C12) deviation indicating C4 plant sugar addition (corn/sugar cane).
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            setAuditDecision('issued_certificate');
                            audioManager.play('celebration');
                          }}
                          className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-left"
                        >
                          Option A: Issue legally binding Certificate of Analysis declaring sample "Adulterated & Non-Conforming" for FSO prosecution.
                        </button>
                        <button
                          onClick={() => {
                            setAuditDecision('wrong_action');
                            audioManager.play('error');
                          }}
                          className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 text-xs text-left"
                        >
                          Option B: Pass the sample as pure without reporting C13 isotope findings.
                        </button>
                      </div>
                    </>
                  )}

                  {selectedRole === 'haccp_auditor' && (
                    <>
                      <h5 className="text-xs font-bold text-slate-200">
                        Audit Case: Critical Limit Violation on Retort Thermocouple
                      </h5>
                      <p className="text-xs text-slate-400">
                        The canning line thermograph shows sterilization temperature dropped to 112°C for 4 minutes (below required 121°C critical limit for C. botulinum spores).
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            setAuditDecision('major_nc');
                            audioManager.play('celebration');
                          }}
                          className="p-3 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold text-left"
                        >
                          Option A: Raise Major Non-Conformity (NC), order complete batch hold/re-sterilization, and require root cause investigation.
                        </button>
                        <button
                          onClick={() => {
                            setAuditDecision('wrong_action');
                            audioManager.play('error');
                          }}
                          className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 text-xs text-left"
                        >
                          Option B: Ignore temperature dip because product looked visually clean.
                        </button>
                      </div>
                    </>
                  )}

                  {auditDecision && (
                    <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                      auditDecision !== 'wrong_action'
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                        : 'bg-red-500/20 border-red-500/40 text-red-300'
                    }`}>
                      {auditDecision !== 'wrong_action' ? (
                        <span>
                          ✓ <strong>Professional Action Approved:</strong> You performed your statutory duty in compliance with the FSS Act 2006 and Codex principles!
                        </span>
                      ) : (
                        <span>
                          ⚠️ <strong>Regulatory Violation:</strong> Misconduct or omission in food quality auditing endangers public health and carries severe criminal liability under statutory law.
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* OBSERVATION QUESTIONS SECTION */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                Observational Diagnostic Checks
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {OBSERVATION_QUESTIONS.map((oq, oqIdx) => (
                  <div key={oqIdx} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                    <p className="text-xs font-semibold text-slate-200">{oq.question}</p>
                    <div className="space-y-1.5">
                      {oq.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => {
                            setObservationAnswers((prev) => ({ ...prev, [oqIdx]: optIdx }));
                            if (optIdx === oq.correctIndex) audioManager.play('chime');
                          }}
                          className={`w-full p-2.5 rounded-lg border text-xs text-left transition-all ${
                            observationAnswers[oqIdx] === optIdx
                              ? optIdx === oq.correctIndex
                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                                : 'bg-red-500/20 border-red-500 text-red-300'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <button
                onClick={() => {
                  setActiveTab('discovery');
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs font-bold hover:text-white"
              >
                ← Back to Discovery
              </button>
              <button
                onClick={() => {
                  setActiveTab('challenges');
                  audioManager.play('whoosh');
                }}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all"
              >
                Proceed to Progressive Assessment Challenges (22) →
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: CHALLENGES */}
        {/* ==================================================================== */}
        {activeTab === 'challenges' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Challenge Progress Header */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-amber-400 uppercase">
                    Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    CHALLENGES[currentChallengeIndex].difficulty === 'foundation'
                      ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                      : CHALLENGES[currentChallengeIndex].difficulty === 'standard'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {CHALLENGES[currentChallengeIndex].difficulty} Tier
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                    {CHALLENGES[currentChallengeIndex].competencyLevel}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Node Ref: {CHALLENGES[currentChallengeIndex].nodeId}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full md:w-48 bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${((currentChallengeIndex + 1) / CHALLENGES.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6 shadow-xl">
              <h3 className="text-base font-bold text-slate-100 leading-snug">
                {CHALLENGES[currentChallengeIndex].question}
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {CHALLENGES[currentChallengeIndex].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChallengeAnswer(idx)}
                    disabled={challengeSubmitted}
                    className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                      challengeSubmitted
                        ? idx === CHALLENGES[currentChallengeIndex].correctIndex
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : idx === selectedOption
                          ? 'bg-red-500/20 border-red-500 text-red-300'
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                        : selectedOption === idx
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{opt}</span>
                    {challengeSubmitted && idx === CHALLENGES[currentChallengeIndex].correctIndex && (
                      <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                    )}
                  </button>
                ))}
              </div>

              {challengeSubmitted && (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs leading-relaxed">
                  <div className="font-bold text-amber-400">Biological & Regulatory Explanation:</div>
                  <p className="text-slate-300">{CHALLENGES[currentChallengeIndex].explanation}</p>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  const h = CHALLENGES[currentChallengeIndex].hints[0];
                  setCurrentHint(h);
                  setShowHint(true);
                  audioManager.play('hint');
                }}
                className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs font-bold hover:text-amber-400"
              >
                💡 Need Hint?
              </button>

              {challengeSubmitted && (
                <button
                  onClick={handleNextChallenge}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg"
                >
                  {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'View Final Certification Summary'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 4: SUMMARY & AUDIT */}
        {/* ==================================================================== */}
        {activeTab === 'summary' && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Real World Field Activity Section */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/40 p-6 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-lg">
                  📋
                </div>
                <div>
                  <h3 className="text-base font-bold text-emerald-300">{REAL_WORLD_ACTIVITY.title}</h3>
                  <p className="text-xs text-slate-400">{REAL_WORLD_ACTIVITY.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((st, sIdx) => (
                  <div key={sIdx} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start space-x-2">
                    <span className="font-bold text-amber-400 text-sm">{sIdx + 1}.</span>
                    <span>{st}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Misconceptions Corrective Grid */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                Common Biological Misconceptions vs Scientific Facts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((m, mIdx) => (
                  <div key={mIdx} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="text-red-400 font-semibold flex items-center space-x-1">
                      <span>❌ Misconception:</span>
                      <span className="line-through">{m.misconception}</span>
                    </div>
                    <div className="text-emerald-400 font-semibold">
                      ✓ Scientific Correction: <span className="text-slate-300 font-normal">{m.correction}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostic Mastery Summary Table */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-gold-400 uppercase tracking-wider">
                Curriculum Node Mastery Tracker (BKT / SM2)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {ALL_NODE_IDS.slice(0, 12).map((nid) => {
                  const level = getMasteryLevel(bktStates[nid] || createBKTState());
                  return (
                    <div key={nid} className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-[11px]">
                      <div className="font-mono text-slate-400 truncate">{nid}</div>
                      <div className="font-bold text-amber-400 mt-1 capitalize">{level} Level</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Final Action Button */}
            <div className="text-center pt-4">
              <button
                onClick={() => {
                  setActiveTab('discovery');
                  setCurrentChallengeIndex(0);
                  setScore(0);
                  audioManager.play('celebration');
                }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 font-black text-sm uppercase tracking-widest shadow-xl hover:opacity-95 transition-all"
              >
                Restart Interactive Food Safety Command Simulation ↺
              </button>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER METADATA */}
      <footer className="text-center text-[11px] text-slate-400 py-2 font-mono">
        CISCE Class 12 Biology • Chapter: Food Quality & Food Safety • FSSAI / HACCP / Codex Standard Compliant Simulation
      </footer>
    </div>
  );
}

export default C12_BiologyFoodQualityCBSESim;