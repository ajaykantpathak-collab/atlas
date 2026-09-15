'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS CONSTANTS (ALL 10 ISC CLASS 12 HOME SCIENCE NODES) ───
const NODE_C12_HOME_011 = 'c12_home_011'; // Special Diets: Fever, Diarrhoea, Diabetes, Obesity, Hypertension
const NODE_C12_HOME_012 = 'c12_home_012'; // Savings and Investments: Importance
const NODE_C12_HOME_013 = 'c12_home_013'; // Avenues and Schemes for Savings and Investments
const NODE_C12_HOME_014 = 'c12_home_014'; // Consumer Protection: Rights, Responsibilities and CPA 2019
const NODE_C12_HOME_015 = 'c12_home_015'; // Consumer Aids: Standard Marks, Labels, Advertisements
const NODE_C12_HOME_016 = 'c12_home_016'; // Problems Faced by Consumers
const NODE_C12_HOME_017 = 'c12_home_017'; // Food Adulteration: Definition and Common Adulterants
const NODE_C12_HOME_018 = 'c12_home_018'; // Physical Development During Puberty and Adolescence
const NODE_C12_HOME_019 = 'c12_home_019'; // Cognitive Development: Stages
const NODE_C12_HOME_020 = 'c12_home_020'; // Social and Emotional Development in Adolescents

const ALL_NODE_IDS = [
  NODE_C12_HOME_011,
  NODE_C12_HOME_012,
  NODE_C12_HOME_013,
  NODE_C12_HOME_014,
  NODE_C12_HOME_015,
  NODE_C12_HOME_016,
  NODE_C12_HOME_017,
  NODE_C12_HOME_018,
  NODE_C12_HOME_019,
  NODE_C12_HOME_020,
];

// ─── NARRATIVE SCENARIO HOOK ──��
const SCENARIO = {
  title: 'The Holistic Home Science Clinic & Family Resource Advisory',
  intro: 'You are the chief consultant at the Community Wellness and Consumer Resource Centre in Lucknow. Today, several families are visiting with urgent challenges: a child running a high fever requiring a precise therapeutic diet, a rural homemaker suspecting adulterated mustard oil, a young salaried couple planning their 15-year PPF savings, and an adolescent dealing with rapid pubertal growth.',
  context: 'Use scientific principles of clinical nutrition, family financial economics, consumer rights under CPA 2019, and developmental psychology to advise your clients and diagnose problems in real-time.',
};

// ─── DISCOVERY QUESTION (Curiosity Hook) ───
const DISCOVERY_QUESTION = {
  question: 'Rohan is suffering from an acute viral fever (102°F / 38.9°C). For every 1°F rise in body temperature, by what percentage does the Basal Metabolic Rate (BMR) accelerate?',
  options: [
    'Approximately 1% increase per 1°F',
    'Approximately 7% increase per 1°F (rapid calorie & tissue breakdown)',
    'Approximately 25% increase per 1°F',
    'BMR does not change during fever',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Fever accelerates metabolic demand and protein catabolism dramatically, creating a need for high-calorie, high-protein, easily digestible fluids!',
};

// ─── CHALLENGE INTERFACE (NEP 2020 & CISCE 2026 SPECIFICATION) ───
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

// ─── 21 COMPREHENSIVE CHALLENGES ACROSS ALL 10 NODES ───
const CHALLENGES: Challenge[] = [
  // 1. Fever BMR & Diet (Foundation - Understanding)
  {
    id: 'ch_home_001',
    nodeId: NODE_C12_HOME_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is a high-calorie, high-protein diet recommended for a patient with acute fever even though digestive capacity is reduced?',
    options: [
      'To force the stomach to produce more acid',
      'Because BMR increases by ~7% per 1°F and tissue breakdown accelerates, needing high nutrient density in soft/liquid form',
      'To raise the body temperature further to kill bacteria',
      'To prevent the patient from feeling thirsty',
    ],
    correctIndex: 1,
    explanation: 'Fever accelerates the Basal Metabolic Rate by ~7% per 1°F rise in temperature. Muscle protein breaks down rapidly to supply energy. Soft, nutrient-dense fluids (like rice kanji with curd and dal soup) replenish energy and repair tissue without straining digestion.',
    hints: [
      'Think about what happens to energy consumption when the body is hot.',
      'Metabolism speeds up, burning glycogen and muscle protein.',
      'The BMR rises by ~7% per 1°F rise; hence high calorie and protein are required in easily digestible forms.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Diarrhoea Rehydration Formulation (Foundation - Application)
  {
    id: 'ch_home_002',
    nodeId: NODE_C12_HOME_011,
    type: 'construct',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Construct the standard home-made Oral Rehydration Solution (ORS) formula recommended by WHO for acute diarrhoea management.',
    availableParts: ['1 Litre Clean Boiled Water', '6 Level Teaspoons Sugar', '1/2 Teaspoon Common Salt', '2 Tablespoons Chilli Powder', '500ml Cow Milk'],
    targetState: '1 Litre Clean Boiled Water 6 Level Teaspoons Sugar 1/2 Teaspoon Common Salt',
    validationHint: 'Select water, sugar, and salt in the exact WHO-approved home proportions.',
    explanation: 'Home-made ORS consists of 1 litre of clean boiled water, 6 level teaspoons of sugar (provides glucose to drive the sodium-glucose cotransporter in the gut), and 1/2 level teaspoon of salt (provides sodium and chloride electrolytes). Milk and spices must be avoided during acute diarrhoea.',
    hints: [
      'You need a water base, energy in the form of sugar, and vital electrolytes.',
      'WHO standard home formulation uses 1 litre water, 6 tsp sugar, and half tsp salt.',
      'Add "1 Litre Clean Boiled Water", "6 Level Teaspoons Sugar", and "1/2 Teaspoon Common Salt" in order.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Drag Label: Therapeutic Diet Matching (Foundation - Understanding)
  {
    id: 'ch_home_003',
    nodeId: NODE_C12_HOME_011,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each clinical condition to its primary dietary modification principle.',
    dragItems: [
      { label: 'Low Sodium & High Potassium', targetId: 'cond_hypertension' },
      { label: 'High Complex Fibre & Controlled Glycaemic Load', targetId: 'cond_diabetes' },
      { label: 'Low Calorie & Energy Deficit (-500 kcal)', targetId: 'cond_obesity' },
      { label: 'Low Fibre, High Fluid & Electrolyte Replacement', targetId: 'cond_diarrhoea' },
    ],
    correctMapping: {
      cond_hypertension: 'Low Sodium & High Potassium',
      cond_diabetes: 'High Complex Fibre & Controlled Glycaemic Load',
      cond_obesity: 'Low Calorie & Energy Deficit (-500 kcal)',
      cond_diarrhoea: 'Low Fibre, High Fluid & Electrolyte Replacement',
    },
    explanation: 'Hypertension requires sodium restriction (<5g salt/day) with potassium-rich fruits; Diabetes demands complex grains (ragi, oats) to control blood sugar spikes; Obesity requires a ~500 kcal daily deficit with satiety fibres; Diarrhoea necessitates low-fibre bland foods to avoid bowel irritation.',
    hints: [
      'Hypertension is linked to blood pressure, which is elevated by sodium.',
      'Diarrhoea causes dehydration and inflamed gut lining, so roughage/fibre must be minimized.',
      'Match hypertension to Low Sodium, diabetes to Complex Fibre, obesity to Low Calorie, and diarrhoea to Low Fibre/Electrolytes.',
    ],
  },
  // 4. Savings vs Investment Concept (Foundation - Recall)
  {
    id: 'ch_home_004',
    nodeId: NODE_C12_HOME_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the primary difference between "Savings" and "Investments"?',
    options: [
      'Savings are always taxable while investments are always illegal',
      'Savings prioritize liquidity and immediate capital safety; investments deploy saved funds into avenues that generate returns to beat inflation',
      'Savings are only for elderly individuals while investments are only for students',
      'There is no difference; both terms mean keeping cash locked in an almirah at home',
    ],
    correctIndex: 1,
    explanation: 'Savings represent unconsumed surplus kept in liquid form (e.g., savings bank account) for emergencies. Investments involve deploying capital into growth vehicles (e.g., PPF, mutual funds, NSC) that earn compounding returns to protect against purchasing power erosion from inflation.',
    hints: [
      'Consider what happens to cash locked in a cupboard when inflation is 5% per year.',
      'Saving is preserving liquid surplus; investing is sowing that money so it compounds.',
      'Option B accurately contrasts liquidity preservation against return generation.',
    ],
    misconceptionIndex: 1,
  },
  // 5. PPF Tenet & Tax Status (Foundation - Recall)
  {
    id: 'ch_home_005',
    nodeId: NODE_C12_HOME_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Indian tax laws, what is the tax status of the Public Provident Fund (PPF)?',
    options: [
      'Fully taxable at withdrawal',
      'EEE (Exempt-Exempt-Exempt): Contribution, accumulated interest, and maturity proceeds are all 100% tax-free',
      'Taxable interest with tax-free principal only',
      'Tax deductible only for corporate business owners',
    ],
    correctIndex: 1,
    explanation: 'PPF enjoys EEE status under Sections 80C and 10(11) of the Income Tax Act. Contributions up to ₹1.5 lakh are tax-exempt, the annual compound interest is tax-free, and the entire lump-sum maturity amount is exempt from income tax.',
    hints: [
      'PPF is considered the safest and most tax-advantaged retirement vehicle in India.',
      'Look for the three-letter acronym representing complete tax freedom at all 3 stages.',
      'EEE stands for Exempt contribution, Exempt interest, and Exempt maturity.',
    ],
    misconceptionIndex: 2,
  },
  // 6. Six Consumer Rights (Standard - Recall)
  {
    id: 'ch_home_006',
    nodeId: NODE_C12_HOME_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'Which of the following is NOT one of the 6 fundamental consumer rights recognised under the Consumer Protection Act 2019?',
    options: [
      'Right to Safety and Right to be Informed',
      'Right to Choose and Right to be Heard',
      'Right to Unlimited Credit and Unconditional Free Replacement',
      'Right to Seek Redressal and Right to Consumer Education',
    ],
    correctIndex: 2,
    explanation: 'The six statutory consumer rights under CPA 2019 are: (1) Right to Safety, (2) Right to be Informed, (3) Right to Choose, (4) Right to be Heard, (5) Right to Seek Redressal, and (6) Right to Consumer Education. There is no right to unlimited credit.',
    hints: [
      'Recall the consumer rights taught in the Jago Grahak Jago campaign.',
      'Rights empower fair transactions, not unconditional free goods or unlimited borrowing.',
      'Option C contains fabricated claims not supported by statutory law.',
    ],
  },
  // 7. CPA 2019 Pecuniary Limits (Standard - Analysis)
  {
    id: 'ch_home_007',
    nodeId: NODE_C12_HOME_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A consumer in Pune bought a defective luxury electric vehicle worth ₹65 lakh. Under the Consumer Protection Act 2019, which consumer forum has original jurisdiction?',
    options: [
      'District Consumer Disputes Redressal Commission (up to ₹1 Crore)',
      'State Consumer Disputes Redressal Commission (₹1 Crore to ₹10 Crore)',
      'National Consumer Disputes Redressal Commission (above ₹10 Crore)',
      'Supreme Court of India directly',
    ],
    correctIndex: 0,
    explanation: 'Under the Consumer Protection Act 2019 pecuniary jurisdiction: District Commission handles claims up to ₹1 Crore; State Commission handles claims from ₹1 Crore to ₹10 Crore; National Commission handles claims exceeding ₹10 Crore. Since ₹65 lakh is under ₹1 Crore, the District Commission has original jurisdiction.',
    hints: [
      'Recall the upgraded pecuniary limits under the 2019 Act vs the old 1986 Act.',
      'The District Commission threshold was raised significantly to ₹1 Crore.',
      '₹65 lakh is less than ₹1,00,00,000 (1 Crore), so it goes to the District Commission.',
    ],
    misconceptionIndex: 3,
  },
  // 8. Standard Certification Marks Identification (Standard - Match)
  {
    id: 'ch_home_008',
    nodeId: NODE_C12_HOME_015,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which certifying body issues the AGMARK certification and for which category of goods?',
    options: [
      'Bureau of Indian Standards (BIS) for electrical switches and geysers',
      'Directorate of Marketing and Inspection (DMI), Ministry of Agriculture, for agricultural products like ghee, honey, and spices',
      'FSSAI for all packaged biscuits and soft drinks',
      'Ministry of Consumer Affairs for gold hallmarking',
    ],
    correctIndex: 1,
    explanation: 'AGMARK is a quality certification mark issued by the Directorate of Marketing and Inspection (DMI), Ministry of Agriculture and Farmers Welfare, for agricultural products such as pure ghee, honey, pulses, and whole spices.',
    hints: [
      'AGMARK contains "AG" for Agriculture and "MARK" for Marketing.',
      'It is not issued by BIS (which issues ISI and Hallmark).',
      'The Directorate of Marketing and Inspection administers AGMARK for agricultural produce.',
    ],
  },
  // 9. Deceptive Packaging vs Misleading Ad (Standard - Distinguish)
  {
    id: 'ch_home_009',
    nodeId: NODE_C12_HOME_016,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does "Deceptive Packaging" differ from a "Misleading Advertisement"?',
    options: [
      'They are identical legal terms with no difference',
      'Misleading advertisements involve false claims in media/promotions; deceptive packaging involves misleading physical design (e.g., oversized boxes, false bottoms, hidden net weight)',
      'Deceptive packaging applies only to gold jewelry while ads apply only to clothes',
      'Misleading ads are legal in India, whereas packaging is illegal',
    ],
    correctIndex: 1,
    explanation: 'A misleading advertisement is a false promotional claim broadcasted or printed through media. Deceptive packaging is the deceptive physical presentation of the product container—such as false-bottom containers, oversized packaging with slack-fill, or confusing net weight displays.',
    hints: [
      'One relates to media and claims; the other relates to the physical box/wrapper in your hand.',
      'An ad can be truthful while the box uses a false bottom to fool the buyer.',
      'Option B correctly distinguishes the promotional claim from physical container deception.',
    ],
  },
  // 10. Common Adulterants & Epidemic Dropsy (Standard - Application)
  {
    id: 'ch_home_010',
    nodeId: NODE_C12_HOME_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Adulteration of mustard oil with Argemone mexicana seed oil leads to which severe health condition caused by toxic alkaloids sanguinarine and dihydrosanguinarine?',
    options: [
      'Lathyrism (permanent paralysis of lower limbs)',
      'Epidemic Dropsy (limb edema, breathlessness, cardiac failure, glaucoma)',
      'Fluorosis (mottled enamel and skeletal deformities)',
      'Kwashiorkor (protein-energy malnutrition)',
    ],
    correctIndex: 1,
    explanation: 'Argemone oil adulteration in edible mustard oil causes Epidemic Dropsy. The alkaloids sanguinarine and dihydrosanguinarine damage capillaries, leading to extreme fluid accumulation (edema) in limbs, pulmonary breathlessness, glaucoma, and potentially fatal cardiac failure.',
    hints: [
      'Argemone oil causes severe fluid leakage and heart strain.',
      'Lathyrism is caused by Kesari dal (BOAA neurotoxin), not Argemone oil.',
      'The disease is called Epidemic Dropsy (seen in the 1998 Delhi outbreak).',
    ],
    misconceptionIndex: 4,
  },
  // 11. Chemical Test for Metanil Yellow in Turmeric (Standard - Application)
  {
    id: 'ch_home_011',
    nodeId: NODE_C12_HOME_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'When performing a laboratory/home chemical test on turmeric powder, what reagent confirms the presence of carcinogenic Metanil Yellow dye?',
    options: [
      'Addition of concentrated Hydrochloric Acid (HCl) produces an intense, persistent pink/magenta colour',
      'Addition of Iodine solution turns it jet black',
      'Addition of clean cold water turns it milky white',
      'Heating the sample turns it bright blue',
    ],
    correctIndex: 0,
    explanation: 'In the HCl test for Metanil Yellow in haldi powder: a pinch of turmeric is dissolved in water and treated with concentrated HCl. An immediate and persistent magenta/pink colour indicates carcinogenic Metanil Yellow coal-tar dye. Pure turmeric gives a light yellow/orange shade.',
    hints: [
      'Metanil Yellow is a synthetic coal-tar acid dye.',
      'Acidification with HCl triggers a dramatic pink-magenta hue.',
      'Iodine test is for starch, whereas HCl confirms Metanil Yellow.',
    ],
  },
  // 12. Kesari Dal & Neurotoxin BOAA (Standard - Recall)
  {
    id: 'ch_home_012',
    nodeId: NODE_C12_HOME_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'Kesari dal (Lathyrus sativus) mixed as an adulterant in chana dal and besan causes irreversible lathyrism due to which potent neurotoxin?',
    options: [
      'Sanguinarine',
      'Beta-N-oxalyl-amino-L-alanine (BOAA)',
      'Malachite green',
      'Aflatoxin B1',
    ],
    correctIndex: 1,
    explanation: 'Kesari dal contains the amino acid neurotoxin BOAA (beta-N-oxalyl-amino-L-alanine). Chronic consumption as a dietary staple damages upper motor neurons in the spinal cord, leading to spastic paraplegia (lathyrism) with permanent stiffness and inability to walk.',
    hints: [
      'Sanguinarine is in Argemone seeds.',
      'Look for the chemical abbreviation containing "oxalyl-amino".',
      'BOAA is the specific neurotoxic compound in Lathyrus sativus.',
    ],
  },
  // 13. Endocrine Glands in Puberty Cascade (Advanced - Analysis)
  {
    id: 'ch_home_013',
    nodeId: NODE_C12_HOME_018,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the hormonal cascade sequence that initiates physical puberty in adolescents:',
    sortItems: [
      'Hypothalamus secretes Gonadotropin-Releasing Hormone (GnRH)',
      'Anterior Pituitary gland releases FSH and LH into the bloodstream',
      'Gonads (Testes/Ovaries) are stimulated to produce Testosterone / Estrogen',
      'Secondary sexual characteristics (growth spurt, voice deepening/breast budding) manifest',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The pubertal hormonal axis initiates in the brain: Hypothalamus (GnRH) -> Pituitary Gland (FSH & LH) -> Gonads (Testosterone in boys, Estrogen in girls) -> Target tissues producing secondary sexual characteristics.',
    hints: [
      'The master control starts in the hypothalamus of the brain.',
      'The pituitary gland acts as the intermediate messenger gland.',
      'Gonads respond to pituitary signals and release sex steroids that physically reshape the body.',
    ],
  },
  // 14. Adolescent Anaemia in India - NFHS-5 (Advanced - Evaluation)
  {
    id: 'ch_home_014',
    nodeId: NODE_C12_HOME_018,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'According to the National Family Health Survey (NFHS-5), approximately what percentage of Indian adolescent girls aged 15-19 are anaemic?',
    correctAnswer: 59.1,
    tolerance: 1.5,
    unit: '%',
    explanation: 'NFHS-5 (2019-21) data reveals that 59.1% of Indian adolescent girls aged 15-19 suffer from anaemia. The growth spurt combined with menstrual blood loss increases physiological iron requirements, demanding diets rich in ragi, jaggery, green leafy vegetables, and weekly IFA supplementation.',
    hints: [
      'The figure is close to 60 percent of all adolescent girls in India.',
      'Enter the official NFHS-5 percentage (around 59.1%).',
      'The value lies between 58% and 60.5%.',
    ],
  },
  // 15. Piaget Cognitive Stages Sequencing (Advanced - Analysis)
  {
    id: 'ch_home_015',
    nodeId: NODE_C12_HOME_019,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange Jean Piaget\'s 4 stages of cognitive development in chronological developmental order:',
    sortItems: [
      'Sensorimotor Stage (0-2 years: Object Permanence)',
      'Preoperational Stage (2-7 years: Symbolic thought, Egocentrism)',
      'Concrete Operational Stage (7-11 years: Conservation, Reversibility)',
      'Formal Operational Stage (11-12+ years: Hypothetical-Deductive Reasoning & Metacognition)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Piaget formulated 4 invariant sequential stages: Sensorimotor (0-2 yrs) -> Preoperational (2-7 yrs) -> Concrete Operational (7-11 yrs) -> Formal Operational (11+ yrs to adulthood). Adolescents transition into formal operations, enabling abstract deductive logic.',
    hints: [
      'Infancy begins with sensory-motor exploration.',
      'Early childhood develops language before logical conservation is mastered.',
      'Adolescents develop formal operational hypothetical thinking last.',
    ],
  },
  // 16. Formal Operational Hypothetical Thought in Home Science (Advanced - Application)
  {
    id: 'ch_home_016',
    nodeId: NODE_C12_HOME_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An ISC student is designing an experiment to test whether ragi, jowar, or hand-pounded rice provides the lowest glycaemic spike under simulated digestion. Which Piagetian stage ability is this?',
    options: [
      'Sensorimotor exploration',
      'Preoperational centration',
      'Concrete operational classification',
      'Formal Operational Hypothetical-Deductive Reasoning and variable isolation',
    ],
    correctIndex: 3,
    explanation: 'Formulating a scientific hypothesis, isolating independent variables (grain type), holding confounding variables constant (portion size, preparation method), and analyzing inferred biochemical responses is the hallmark of Piaget\'s Formal Operational Stage.',
    hints: [
      'The student is testing abstract hypotheses scientifically.',
      'This requires reasoning beyond immediately visible concrete objects.',
      'Hypothetical-deductive experimentation belongs to the Formal Operational stage.',
    ],
  },
  // 17. Baumrind Parenting Typology (Advanced - Analysis)
  {
    id: 'ch_home_017',
    nodeId: NODE_C12_HOME_020,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How does Authoritative parenting differ from Authoritarian parenting in Diana Baumrind\'s framework?',
    options: [
      'Authoritative has high warmth and high demandingness with democratic reasoning; Authoritarian has high demandingness but low warmth with rigid punishment',
      'Authoritative parents never speak to the child while Authoritarian parents do everything for the child',
      'Authoritarian parenting produces the highest self-esteem in Indian research studies',
      'Both styles are completely identical in psychological theory',
    ],
    correctIndex: 0,
    explanation: 'Authoritative parenting combines high responsiveness/warmth with clear, reasoned behavioural expectations (demandingness). Authoritarian parenting enforces unquestioning obedience (high demandingness) with little emotional warmth, leading to anxiety and rebellious compliance in adolescents.',
    hints: [
      'Authoritative uses democratic dialogue, explanation, and warmth.',
      'Authoritarian demands "do it because I said so" without warmth or discussion.',
      'Option A captures the dual axes of warmth and demandingness accurately.',
    ],
  },
  // 18. Hypertension Dietary Calculation (Advanced - Application)
  {
    id: 'ch_home_018',
    nodeId: NODE_C12_HOME_011,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'According to ICMR and WHO dietary guidelines, what is the maximum recommended daily intake of common table salt (NaCl) for an adult with hypertension?',
    correctAnswer: 5,
    tolerance: 0.5,
    unit: 'grams/day',
    explanation: 'The ICMR-NIN and WHO recommend restricting salt intake to not more than 5 grams per day (~2000 mg sodium) for hypertensive adults. Most Indian diets exceed 10-12 grams/day due to salted pickles, papads, and processed snacks.',
    hints: [
      'One level teaspoon of table salt contains approximately 5 grams.',
      'Enter the numeral for five grams.',
      'The target is 5 g/day.',
    ],
  },
  // 19. Post Office Schemes: KVP Doubling Period (Advanced - Understanding)
  {
    id: 'ch_home_019',
    nodeId: NODE_C12_HOME_013,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'understanding',
    question: 'In the Government of India Post Office Small Savings framework, what is the maturity feature of the Kisan Vikas Patra (KVP)?',
    options: [
      'It provides tax-free interest under Section 80C',
      'It doubles the invested capital in approximately 115 months (9 years 7 months) at 7.5% annual compound interest',
      'It is restricted strictly to licensed farmers owning agricultural land',
      'It requires mandatory monthly deposits for 15 years like PPF',
    ],
    correctIndex: 1,
    explanation: 'Kisan Vikas Patra (KVP) doubles the deposited money in 115 months at the prevailing 7.5% annual compound rate. Despite its historical name, any adult Indian citizen can invest, though it carries no 80C tax deduction.',
    hints: [
      'KVP is celebrated for guaranteed capital doubling.',
      'The name "Kisan" does not restrict purchase to farmers only.',
      'It doubles money in 115 months with sovereign Government backing.',
    ],
  },
  // 20. Starch Adulteration in Milk - Iodine Test (Advanced - Evaluation)
  {
    id: 'ch_home_010b',
    nodeId: NODE_C12_HOME_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A local dairy sample of milk is tested by boiling, cooling, and adding two drops of Lugol\'s iodine solution. The solution turns deep blue-black. What does this prove?',
    options: [
      'The milk is 100% pure cow milk with high cream content',
      'The milk has been adulterated with starch (flour, potato starch) to falsely increase thickness/specific gravity',
      'The milk contains toxic Argemone oil',
      'The milk is naturally rich in vitamin C',
    ],
    correctIndex: 1,
    explanation: 'Iodine reacts specifically with the helical structure of amylose in starch to form a characteristic deep blue-black polyiodide complex. Natural milk contains lactose and casein but zero starch; a blue-black reaction confirms adulteration with external starch thickeners.',
    hints: [
      'Think of the classic biological test for carbohydrates/starch.',
      'Iodine + Starch = Blue-black complex.',
      'Starch is added to watered milk to disguise thin consistency.',
    ],
    misconceptionIndex: 0,
  },
  // 21. Creative Dietary Intervention for Joint Family (Advanced - Creativity)
  {
    id: 'ch_home_021',
    nodeId: NODE_C12_HOME_011,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'How can a North Indian vegetarian joint family meal of Dal, Phulka, and Sabzi be creatively modified for a 60-year-old hypertensive diabetic grandmother without cooking entirely separate meals?',
    options: [
      'Serve her regular spicy fried parathas with salted mango pickle',
      'Cook dal and seasonal lauki sabzi with zero added salt and minimal oil; remove her portion and season with roasted cumin, lemon juice, and fresh coriander; add measured ragi-wheat phulkas; add table salt to the rest of the family pot',
      'Force her to drink only plain water with sugar cubes',
      'Replace all whole grains with polished white maida noodles',
    ],
    correctIndex: 1,
    explanation: 'Modified therapeutic menu planning: The family dish is prepared with herbs, spices, and minimal oil. The hypertensive diabetic portion is extracted before adding table salt and refined fats, then enriched with high-potassium/flavourful lemon, roasted jeera, and coriander, alongside high-fibre complex ragi rotis.',
    hints: [
      'Look for a solution that avoids cooking double meals while strictly adhering to low sodium and high complex fibre.',
      'Lemon and roasted spices provide great flavour without adding sodium.',
      'Option B demonstrates intelligent resource management in family meal planning.',
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
  nodeId: NODE_C12_HOME_011,
  title: 'ISC Class 12 Home Science: Special Diets & Family Resource Simulation',
  definition: 'A special diet is a therapeutically modified meal plan tailored in nutrients, consistency, and ingredients to manage medical conditions like fever, diarrhoea, diabetes, and hypertension, integrated with sound resource management, consumer vigilance, and adolescent developmental science.',
  eli5: 'Think of your body as a smart biological kitchen. When sick with fever or high BP, the kitchen recipes change to low-salt, high-energy healing broths. Meanwhile, your family manages money through PPF and bank FDs, protects purchases with ISI/FSSAI marks, and supports teens navigating rapid growth spurts.',
  misconceptions: [
    {
      misconception: 'Diarrhoea patients should be given cow milk and raw fruits immediately.',
      correction: 'During acute diarrhoea, cow milk lactose and heavy roughage irritate the gut. Give WHO-formula ORS, rice kanji, and light curd only.',
    },
    {
      misconception: 'Saving cash at home is just as effective as investing in PPF or mutual funds.',
      correction: 'Idle cash loses purchasing power to inflation (4-6% CPI). Investments like PPF compound tax-free to build real family wealth.',
    },
    {
      misconception: 'PPF maturity proceeds and interest are subject to heavy income tax.',
      correction: 'PPF enjoys EEE status (Exempt-Exempt-Exempt): deposit, interest, and maturity are 100% tax-free under Sections 80C and 10(11).',
    },
    {
      misconception: 'The Consumer Protection Act 2019 requires consumers to travel to the seller’s city to file cases.',
      correction: 'Under CPA 2019, consumers can file complaints electronically (e-filing) from their own place of residence with increased district pecuniary limits up to ₹1 Crore.',
    },
    {
      misconception: 'Argemone oil adulteration in mustard oil is harmless and only causes indigestion.',
      correction: 'Argemone alkaloids (sanguinarine) cause Epidemic Dropsy, characterized by severe limb edema, glaucoma, and fatal cardiac failure.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the BMR increase per 1°F rise in body temperature during fever?', options: ['1%', '7%', '15%', '25%'], correctIndex: 1 },
    { question: 'Which nutrient must be strictly restricted to <5g/day in hypertension?', options: ['Protein', 'Sodium (Salt)', 'Vitamin C', 'Potassium'], correctIndex: 1 },
    { question: 'What is the tax status of Public Provident Fund (PPF)?', options: ['Taxable', 'EEE (Exempt-Exempt-Exempt)', 'Tax on interest only', 'GST applicable'], correctIndex: 1 },
    { question: 'Which agency certifies agricultural produce with the AGMARK seal in India?', options: ['BIS', 'DMI (Ministry of Agriculture)', 'FSSAI', 'SEBI'], correctIndex: 1 },
    { question: 'What neurotoxin in Kesari dal causes spastic paralysis of legs (lathyrism)?', options: ['Sanguinarine', 'BOAA', 'Aflatoxin', 'Metanil'], correctIndex: 1 },
    { question: 'What is the highest cognitive development stage in Piaget\'s theory?', options: ['Sensorimotor', 'Preoperational', 'Concrete Operational', 'Formal Operational'], correctIndex: 3 },
    { question: 'Which parenting style combines high warmth with democratic demandingness?', options: ['Authoritative', 'Authoritarian', 'Permissive', 'Neglectful'], correctIndex: 0 },
    { question: 'What reagent turns turmeric pink-magenta when adulterated with Metanil Yellow?', options: ['HCl (Hydrochloric Acid)', 'Iodine Solution', 'Pure Water', 'Ethanol'], correctIndex: 0 },
  ],
  masteryCriteria: 'Mastery is achieved when the student demonstrates scientific proficiency across therapeutic meal planning, financial resource schemes, consumer protection laws, food adulteration testing, and adolescent development psychology.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (BRILLIANT.ORG STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Therapeutic Meal Engine (Fever & Hypertension Metabolism)',
    instruction: 'Adjust the patient body temperature slider and sodium intake slider. Watch metabolic rate, daily caloric demand, and blood vessel pressure gauges update in real time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_HOME_011,
  },
  {
    title: 'Lab 2: Compound Wealth Growth (PPF vs Bank FD vs Idle Cash)',
    instruction: 'Manipulate monthly savings and tenure sliders to see how compounding interest and EEE tax-free status in PPF outperforms inflation-eroded cash.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_HOME_013,
  },
  {
    title: 'Lab 3: Interactive Food Adulteration Diagnostic Bench',
    instruction: 'Select a suspect food sample (Mustard Oil, Turmeric, Milk, Chana Dal) and apply chemical reagents (Nitric Acid, HCl, Iodine, Visual Inspection) to observe reactions.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_HOME_017,
  },
  {
    title: 'Lab 4: The Pubertal Endocrine Cascade & Growth Spurt',
    instruction: 'Click each gland in the Hypothalamus-Pituitary-Gonadal axis to trigger hormonal signals and observe secondary sexual changes in adolescent physiology.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_HOME_018,
  },
  {
    title: 'Lab 5: Adolescent Socialization & Parenting Matrix',
    instruction: 'Toggle Warmth and Demandingness coordinates on Diana Baumrind\'s 2x2 grid to see resulting adolescent emotional regulation and academic outcomes.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_HOME_020,
  },
];

// ─── PREDICTION QUESTIONS (Brilliant Pattern) ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If a fever patient’s temperature rises from 98.6°F to 102.6°F (+4°F), what happens to their minimum daily caloric requirement?',
    options: [
      'Caloric requirement drops to near zero because appetite is low',
      'Caloric requirement rises by ~28% (4 × 7%) requiring nutrient-dense fluids',
      'Caloric demand stays exactly identical',
      'Protein requirements drop while fat demand triples',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the temperature slider to 102.6°F in the simulation below to verify the metabolic demand gauge.',
    nodeId: NODE_C12_HOME_011,
  },
  {
    question: 'Predict: Over a 15-year horizon, what happens to ₹1,00,000 kept in a home safe with 5% annual CPI inflation versus invested in PPF at 7.1% compounded annually?',
    options: [
      'Both amounts remain identical in real purchasing power',
      'Idle cash purchasing power drops to ~₹46,300 while PPF grows to ~₹2,80,000 tax-free',
      'Idle cash grows automatically due to government bonuses',
      'PPF loses money due to hidden fees',
    ],
    correctIndex: 1,
    verifyInstruction: 'Toggle the tenure slider in Lab 2 to 15 years to compare the growth curve against inflation.',
    nodeId: NODE_C12_HOME_013,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the blood vessel stress meter as salt intake increases beyond 5 grams/day?',
    observableOptions: [
      'Vascular tension stays green and relaxed',
      'Vascular resistance rises into the critical red zone due to water retention and sodium balance',
      'Heart rate drops to zero',
      'Salt intake has no measurable physiological impact',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_HOME_011,
  },
  {
    question: 'What happens when concentrated HCl is added to pure organic haldi versus Metanil Yellow adulterated haldi?',
    observableOptions: [
      'Both turn deep black',
      'Pure haldi remains light yellow-orange, whereas adulterated haldi flashes persistent vibrant magenta-pink',
      'Neither shows any color reaction',
      'Adulterated haldi produces thick smoke',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_HOME_017,
  },
];

// ─── REAL WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Community Nutrition & Consumer Vigilance Audit',
  description: 'Conduct a practical home audit in your kitchen: (1) Check 5 packaged food labels for FSSAI logo, veg/non-veg dot, MRP, net weight, and expiry. (2) Perform the cold water test on turmeric or iodine test on milk. (3) Design a 1-day low-sodium (<5g salt) family thali using ragi, moong dal, lemon, and roasted cumin.',
  steps: [
    'Inspect pantry items and log all certification marks (FSSAI, AGMARK, ISI, BIS Hallmark).',
    'Execute a simple home adulteration check using the DART (Detect Adulteration with Rapid Testing) technique.',
    'Formulate a 1-day menu plan with portion sizes for an elderly family member managing hypertension.',
    'Calculate potential 15-year compound savings in a Post Office PPF account using ₹1,000/month.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN REACT COMPONENT ───
function C12_HomeScienceSpecialDietsFeverSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_HOME_011,
  title = DEFAULT_PROPS.title || 'Special Diets & Family Resource Simulation',
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions || [],
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {
  // ─── SUBJECT CONFIG ───
  const subjectConfig = SUBJECT_CONFIG['home'] || { name: 'Home Science', emoji: '🥗', color: 'emerald' };

  // ─── PHASE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ─── DISCOVERY STATE ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // ─── BRILLIANT PATTERNS STATE ───
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // ─── SIMULATION LAB 1 (Therapeutic Nutrition) STATE ───
  const [patientTemp, setPatientTemp] = useState(98.6); // 98.6 to 104 °F
  const [patientSaltIntake, setPatientSaltIntake] = useState(4); // g/day
  const [selectedDietCondition, setSelectedDietCondition] = useState<'fever' | 'diarrhoea' | 'diabetes' | 'hypertension' | 'obesity'>('fever');
  const [selectedFoodItem, setSelectedFoodItem] = useState<string>('rice_kanji');

  // ─── SIMULATION LAB 2 (Financial Compounding) STATE ───
  const [monthlySaving, setMonthlySaving] = useState(2500); // INR
  const [savingTenure, setSavingTenure] = useState(15); // years
  const [inflationRate, setInflationRate] = useState(5.5); // %

  // ─── SIMULATION LAB 3 (Adulteration Testing) STATE ───
  const [adulterationSample, setAdulterationSample] = useState<'mustard_oil' | 'turmeric' | 'milk' | 'chana_dal'>('turmeric');
  const [reagentApplied, setReagentApplied] = useState<string | null>(null);
  const [testResultColor, setTestResultColor] = useState<string>('#cbd5e1');

  // ─── SIMULATION LAB 4 (Pubertal Axis) STATE ───
  const [activeGland, setActiveGland] = useState<'hypothalamus' | 'pituitary' | 'gonads' | 'adrenals' | null>(null);

  // ─── SIMULATION LAB 5 (Parenting Grid) STATE ───
  const [parentingWarmth, setParentingWarmth] = useState(75); // 0-100
  const [parentingDemandingness, setParentingDemandingness] = useState(80); // 0-100

  // ─── ESCALATING HINTS & FEEDBACK STATE ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // ─── DRAG & CONSTRUCT STATE ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── VISUAL FEEDBACK & ACCESSIBILITY STATE ───
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const financeCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD INITIAL MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY EFFECT ───
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
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── REAL-TIME THERAPEUTIC CALCULATIONS ───
  const bmrIncreasePercent = useMemo(() => {
    const diff = Math.max(0, patientTemp - 98.6);
    return Math.round(diff * 7);
  }, [patientTemp]);

  const dailyCalorieNeed = useMemo(() => {
    const baseCal = 2000;
    return Math.round(baseCal * (1 + bmrIncreasePercent / 100));
  }, [bmrIncreasePercent]);

  const vascularStressScore = useMemo(() => {
    if (patientSaltIntake <= 5) return 'Optimal (<5g/day - DASH Approved)';
    if (patientSaltIntake <= 8) return 'Moderate Vascular Strain';
    return 'Severe Hypertensive Risk (>8g/day)';
  }, [patientSaltIntake]);

  // ─── REAL-TIME FINANCIAL COMPOUNDING ───
  const ppfMaturityCorpus = useMemo(() => {
    const rate = 0.071;
    const annualContrib = monthlySaving * 12;
    let total = 0;
    for (let i = 0; i < savingTenure; i++) {
      total = (total + annualContrib) * (1 + rate);
    }
    return Math.round(total);
  }, [monthlySaving, savingTenure]);

  const idleCashPurchasingPower = useMemo(() => {
    const totalDeposited = monthlySaving * 12 * savingTenure;
    const realFactor = Math.pow(1 - inflationRate / 100, savingTenure);
    return Math.round(totalDeposited * realFactor);
  }, [monthlySaving, savingTenure, inflationRate]);

  // ─── PARENTING STYLE COMPUTATION ───
  const parentingStyleDerived = useMemo(() => {
    const highWarmth = parentingWarmth >= 50;
    const highDemanding = parentingDemandingness >= 50;
    if (highWarmth && highDemanding) return { name: 'Authoritative', desc: 'Warm, reasoned democratic rules. Optimal adolescent self-esteem & resilience.', color: '#10b981' };
    if (!highWarmth && highDemanding) return { name: 'Authoritarian', desc: 'Strict unquestioned obedience, low warmth. Risk of high anxiety & withdrawal.', color: '#f59e0b' };
    if (highWarmth && !highDemanding) return { name: 'Permissive', desc: 'Indulgent, loving with few demands. Risk of low self-discipline.', color: '#3b82f6' };
    return { name: 'Neglectful / Uninvolved', desc: 'Low warmth and low demands. Poor emotional regulation & risk behavior.', color: '#ef4444' };
  }, [parentingWarmth, parentingDemandingness]);

  // ─── 12+ USECALLBACK EVENT HANDLERS (OPUS BENCHMARK STANDARD) ───

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive labs. Interact with each simulation to discover the science.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enjoy free exploration! Test any variables without pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us apply your knowledge to real-world challenges!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Great prediction! Now drag the slider to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Precise observation!' : 'Check the vascular stress meter carefully.');
  }, []);

  const handleTemperatureChange = useCallback((temp: number) => {
    setPatientTemp(temp);
    audioManager.play('count');
  }, []);

  const handleSaltChange = useCallback((salt: number) => {
    setPatientSaltIntake(salt);
    audioManager.play('count');
  }, []);

  const handleSavingsChange = useCallback((amt: number) => {
    setMonthlySaving(amt);
    audioManager.play('count');
  }, []);

  const handleTenureChange = useCallback((yrs: number) => {
    setSavingTenure(yrs);
    audioManager.play('count');
  }, []);

  const handleAdulterationTest = useCallback((reagent: string) => {
    setReagentApplied(reagent);
    audioManager.play('sparkle');
    if (adulterationSample === 'turmeric') {
      if (reagent === 'HCl') {
        setTestResultColor('#e11d48'); // Vibrant magenta
        speechManager.speak('Intense persistent magenta! Confirmed presence of carcinogenic Metanil Yellow dye.');
      } else {
        setTestResultColor('#eab308');
      }
    } else if (adulterationSample === 'mustard_oil') {
      if (reagent === 'Nitric Acid') {
        setTestResultColor('#be123c'); // Crimson red
        speechManager.speak('Crimson red ring detected! Positive for toxic Argemone oil causing Epidemic Dropsy.');
      } else {
        setTestResultColor('#ca8a04');
      }
    } else if (adulterationSample === 'milk') {
      if (reagent === 'Iodine') {
        setTestResultColor('#1e1b4b'); // Deep blue-black
        speechManager.speak('Deep blue-black reaction! Adulteration with external starch detected.');
      } else {
        setTestResultColor('#f8fafc');
      }
    } else if (adulterationSample === 'chana_dal') {
      if (reagent === 'Visual Magnifier') {
        setTestResultColor('#d97706');
        speechManager.speak('Triangular wedge-shaped seeds detected! Adulterated with toxic Kesari dal.');
      }
    }
  }, [adulterationSample]);

  const handleGlandClick = useCallback((gland: 'hypothalamus' | 'pituitary' | 'gonads' | 'adrenals') => {
    setActiveGland(gland);
    audioManager.play('tap');
    const msg: Record<string, string> = {
      hypothalamus: 'Hypothalamus secretes GnRH, signalling the anterior pituitary gland.',
      pituitary: 'Pituitary gland secretes gonadotropins FSH and LH into circulation.',
      gonads: 'Gonads secrete Testosterone (boys) and Estrogen/Progesterone (girls).',
      adrenals: 'Adrenal glands release androgens initiating pubic and axillary hair growth.',
    };
    speechManager.speak(msg[gland]);
  }, []);

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
    }
  }, [hintCount, challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have demonstrated exceptional mastery in Home Science.');
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

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Brilliant! Correct reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us study the complete scientific explanation together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

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
      let arr = prev.length === 0 ? (challenge.sortItems?.map((_, i) => i) || []) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  // ─── 2D CANVAS ANIMATION (PROGRESS & PULSE) ───
  useEffect(() => {
    if (phase !== 'challenge') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '12px sans-serif';
      ctx.fillText(`Question ${currentChallenge + 1} of ${filteredChallenges.length}`, 12, 18);

      const radius = 5 + Math.sin(frame * 0.08) * 2;
      ctx.beginPath();
      ctx.arc(canvas.width - 25, 15, Math.max(2, radius), 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentChallenge, filteredChallenges.length]);

  // ─── 2D CANVAS ANIMATION (FINANCE COMPOUNDING CHART) ───
  useEffect(() => {
    if (phase !== 'explore' && phase !== 'sandbox') return;
    const canvas = financeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;

    // Draw axes
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 20);
    ctx.lineTo(40, h - 30);
    ctx.lineTo(w - 20, h - 30);
    ctx.stroke();

    // Draw PPF Curve (Green)
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let yr = 0; yr <= savingTenure; yr++) {
      const x = 40 + (yr / Math.max(1, savingTenure)) * (w - 70);
      let total = 0;
      for (let i = 0; i < yr; i++) total = (total + monthlySaving * 12) * 1.071;
      const y = h - 30 - (total / (ppfMaturityCorpus || 1)) * (h - 60);
      if (yr === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw Idle Cash Curve (Red/Dashed)
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    for (let yr = 0; yr <= savingTenure; yr++) {
      const x = 40 + (yr / Math.max(1, savingTenure)) * (w - 70);
      const total = monthlySaving * 12 * yr * Math.pow(1 - inflationRate / 100, yr);
      const y = h - 30 - (total / (ppfMaturityCorpus || 1)) * (h - 60);
      if (yr === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.setLineDash([]);
  }, [phase, monthlySaving, savingTenure, inflationRate, ppfMaturityCorpus]);

  // ─── CLEANUP TIMERS ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-700/50">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
            <p className="text-xs text-emerald-400 font-semibold tracking-wide uppercase">ISC Class 12 • Home Science Simulation Suite</p>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-2xl border border-slate-800 text-xs font-semibold">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map(p => (
            <span
              key={p}
              className={`px-3 py-1.5 rounded-xl capitalize transition-all ${
                phase === p ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/50' : 'text-slate-400'
              }`}
            >
              {p}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE (CURIOSITY HOOK) ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-2xl border border-indigo-700/40 shadow-inner">
            <h3 className="text-xl font-bold text-indigo-300 flex items-center gap-2">
              <span>🩺</span> {SCENARIO.title}
            </h3>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-400 mt-3 font-medium bg-indigo-950/60 p-3 rounded-xl border border-indigo-800/40">
              💡 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">
              Diagnostic Curiosity Hook
            </span>
            <p className="text-base sm:text-lg text-white font-semibold">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-800/90 hover:bg-slate-700/90 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <p className={`text-sm font-semibold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Excellent scientific deduction! 7% metabolic rise per 1°F is the gold standard.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/40"
                >
                  Step Inside the Interactive Discovery Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORE PHASE (INTERACTIVE GUIDED LABS) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
          {/* Step Banner */}
          <div className="flex flex-wrap items-center justify-between bg-slate-900/90 p-4 rounded-2xl border border-slate-800 gap-2">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Guided Discovery Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-mono">
              Node: {EXPLORATION_STEPS[currentSlide].nodeId}
            </span>
          </div>

          <p className="text-amber-300/90 text-sm font-medium bg-amber-950/30 p-3 rounded-xl border border-amber-800/30">
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          {/* LAB VISUALIZATIONS */}
          <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-800">
            {/* LAB 1: THERAPEUTIC MEAL ENGINE */}
            {currentSlide === 0 && (
              <div className="space-y-6">
                {/* PREDICTION HOOK */}
                {!predictionMade && (
                  <div className="p-4 bg-indigo-950/50 rounded-xl border border-indigo-800 space-y-3">
                    <p className="text-sm font-semibold text-indigo-200">🔍 Predict First: {PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handlePrediction(i)}
                          className="p-3 text-left bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-lg border border-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Sliders */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-300">Patient Body Temp:</span>
                        <span className="text-rose-400 font-mono text-sm">{patientTemp.toFixed(1)}°F</span>
                      </div>
                      <input
                        type="range"
                        min={98.6}
                        max={104.0}
                        step={0.2}
                        value={patientTemp}
                        onChange={e => handleTemperatureChange(parseFloat(e.target.value))}
                        className="w-full accent-rose-500 cursor-pointer"
                        aria-label="Patient Body Temperature"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Normal (98.6°F)</span>
                        <span>High Fever (104.0°F)</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-300">Daily Salt (NaCl) Intake:</span>
                        <span className="text-amber-400 font-mono text-sm">{patientSaltIntake} g/day</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={14}
                        step={0.5}
                        value={patientSaltIntake}
                        onChange={e => handleSaltChange(parseFloat(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                        aria-label="Daily Salt Intake"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Restricted (1g)</span>
                        <span>DASH Limit (5g)</span>
                        <span>High Salt (14g)</span>
                      </div>
                    </div>

                    {/* Condition Selector */}
                    <div>
                      <label className="text-xs text-slate-400 block mb-1 font-semibold">Select Therapeutic Regimen:</label>
                      <div className="grid grid-cols-3 gap-1.5 text-xs">
                        {(['fever', 'diarrhoea', 'diabetes', 'hypertension', 'obesity'] as const).map(cond => (
                          <motion.button
                            key={cond}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedDietCondition(cond)}
                            className={`p-2 rounded-lg font-bold capitalize border ${
                              selectedDietCondition === cond
                                ? 'bg-emerald-600 border-emerald-400 text-white'
                                : 'bg-slate-800 border-slate-700 text-slate-300'
                            }`}
                          >
                            {cond}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Real-time SVG Metabolic Dashboard */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Metabolic Gauges</h4>
                    <svg viewBox="0 0 360 180" className="w-full bg-slate-900 rounded-lg p-2 border border-slate-800">
                      {/* BMR Gauge Arc */}
                      <path d="M 40 140 A 60 60 0 0 1 160 140" fill="none" stroke="#334155" strokeWidth="12" strokeLinecap="round" />
                      <path
                        d="M 40 140 A 60 60 0 0 1 160 140"
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray="188"
                        strokeDashoffset={188 - (bmrIncreasePercent / 40) * 188}
                      />
                      <text x="100" y="115" textAnchor="middle" fill="#f43f5e" fontSize="16" fontWeight="bold">
                        +{bmrIncreasePercent}%
                      </text>
                      <text x="100" y="132" textAnchor="middle" fill="#94a3b8" fontSize="9">
                        BMR Demand
                      </text>
                      <text x="100" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">
                        {dailyCalorieNeed} kcal/day
                      </text>

                      {/* Vascular Stress Gauge */}
                      <path d="M 200 140 A 60 60 0 0 1 320 140" fill="none" stroke="#334155" strokeWidth="12" strokeLinecap="round" />
                      <path
                        d="M 200 140 A 60 60 0 0 1 320 140"
                        fill="none"
                        stroke={patientSaltIntake > 5 ? '#e11d48' : '#10b981'}
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray="188"
                        strokeDashoffset={188 - (patientSaltIntake / 14) * 188}
                      />
                      <text x="260" y="115" textAnchor="middle" fill={patientSaltIntake > 5 ? '#e11d48' : '#10b981'} fontSize="16" fontWeight="bold">
                        {patientSaltIntake}g
                      </text>
                      <text x="260" y="132" textAnchor="middle" fill="#94a3b8" fontSize="9">
                        Sodium Salt
                      </text>
                      <text x="260" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="bold">
                        {patientSaltIntake <= 5 ? 'DASH Safe' : 'Vascular Strain'}
                      </text>
                    </svg>

                    <div className="p-3 bg-slate-900 rounded-lg text-xs space-y-1">
                      <p className="font-bold text-emerald-400 capitalize">Recommended {selectedDietCondition} Menu Item:</p>
                      <p className="text-slate-300">
                        {selectedDietCondition === 'fever' && 'Soft Moong Dal Khichdi + Curd + Lemon Coconut Water (High protein, easily digested fluids).'}
                        {selectedDietCondition === 'diarrhoea' && 'WHO Formula ORS + Light Rice Kanji + Ripe Banana (Low fibre, restores electrolytes).'}
                        {selectedDietCondition === 'diabetes' && 'Ragi/Jowar Roti + Sprouts Salad + Lauki Sabzi (High complex fibre, low glycaemic load).'}
                        {selectedDietCondition === 'hypertension' && 'Dry Phulkas + Lemon Jeera Dal + Mint Chutney (<5g salt, high potassium & magnesium).'}
                        {selectedDietCondition === 'obesity' && 'Sprouted Moong Chaat + Vegetable Dalia (-500 kcal daily deficit, high satiety roughage).'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* OBSERVATION HOOK */}
                {patientSaltIntake > 6 && !observationAnswered && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <p className="text-sm font-semibold text-white">👀 {OBSERVATION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleObservation(i)}
                          className="p-3 text-left bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-lg border border-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* LAB 2: COMPOUND WEALTH & PPF SIMULATOR */}
            {currentSlide === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-300">Monthly Contribution:</span>
                        <span className="text-emerald-400 font-mono text-sm">₹{monthlySaving.toLocaleString('en-IN')}/mo</span>
                      </div>
                      <input
                        type="range"
                        min={500}
                        max={12500}
                        step={500}
                        value={monthlySaving}
                        onChange={e => handleSavingsChange(parseInt(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-label="Monthly Savings Amount"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Min PPF (₹500)</span>
                        <span>Max 80C (₹12,500/mo = ₹1.5L/yr)</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-300">Tenure (Years):</span>
                        <span className="text-indigo-400 font-mono text-sm">{savingTenure} Years</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={25}
                        step={1}
                        value={savingTenure}
                        onChange={e => handleTenureChange(parseInt(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                        aria-label="Savings Tenure"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>NSC Lock (5 Yrs)</span>
                        <span>PPF Horizon (15 Yrs)</span>
                        <span>Extended (25 Yrs)</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-300">Assumed CPI Inflation:</span>
                        <span className="text-rose-400 font-mono text-sm">{inflationRate}% / year</span>
                      </div>
                      <input
                        type="range"
                        min={3}
                        max={8}
                        step={0.5}
                        value={inflationRate}
                        onChange={e => setInflationRate(parseFloat(e.target.value))}
                        className="w-full accent-rose-500 cursor-pointer"
                        aria-label="Inflation Rate"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Compound Growth vs Inflation Canvas</h4>
                    <canvas ref={financeCanvasRef} width={340} height={160} className="w-full bg-slate-900 rounded-lg" />

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 bg-emerald-950/60 rounded-lg border border-emerald-800/40">
                        <span className="text-[10px] text-emerald-400 font-bold block">PPF @ 7.10% (EEE Tax-Free)</span>
                        <span className="text-emerald-200 font-mono font-bold text-sm">₹{ppfMaturityCorpus.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="p-2.5 bg-rose-950/60 rounded-lg border border-rose-800/40">
                        <span className="text-[10px] text-rose-400 font-bold block">Idle Cash Real Purchasing Power</span>
                        <span className="text-rose-200 font-mono font-bold text-sm">₹{idleCashPurchasingPower.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 3: FOOD ADULTERATION BENCH */}
            {currentSlide === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Sample & Reagents */}
                  <div className="space-y-4">
                    <label className="text-xs text-slate-400 font-bold block">1. Select Suspect Food Sample:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'turmeric', label: 'Turmeric Powder (Haldi)', risk: 'Metanil Yellow Dye' },
                        { id: 'mustard_oil', label: 'Mustard Oil (Sarson)', risk: 'Argemone Oil' },
                        { id: 'milk', label: 'Fresh Milk / Paneer', risk: 'Starch Extender' },
                        { id: 'chana_dal', label: 'Chana Dal / Besan', risk: 'Kesari Dal (BOAA)' },
                      ].map(s => (
                        <motion.button
                          key={s.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setAdulterationSample(s.id as any);
                            setReagentApplied(null);
                            setTestResultColor('#94a3b8');
                          }}
                          className={`p-3 text-left rounded-xl border text-xs ${
                            adulterationSample === s.id
                              ? 'bg-indigo-900/60 border-indigo-400 text-white'
                              : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          <p className="font-bold">{s.label}</p>
                          <span className="text-[10px] text-rose-400 block mt-0.5">Risk: {s.risk}</span>
                        </motion.button>
                      ))}
                    </div>

                    <label className="text-xs text-slate-400 font-bold block pt-2">2. Apply Diagnostic Reagent / Test:</label>
                    <div className="flex flex-wrap gap-2">
                      {['HCl', 'Nitric Acid', 'Iodine', 'Visual Magnifier'].map(r => (
                        <motion.button
                          key={r}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAdulterationTest(r)}
                          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 rounded-lg text-xs font-bold font-mono"
                        >
                          🧪 Apply {r}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Right: Test Tube SVG Simulation */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Diagnostic Reaction Tube</h4>
                    <svg viewBox="0 0 160 220" className="w-32 h-44">
                      {/* Test tube glass */}
                      <rect x="50" y="20" width="60" height="160" rx="30" fill="none" stroke="#94a3b8" strokeWidth="4" />
                      {/* Fluid content */}
                      <motion.path
                        d="M 54 90 Q 80 85 106 90 L 106 150 A 26 26 0 0 1 54 150 Z"
                        animate={{ fill: testResultColor }}
                        transition={{ duration: 0.6 }}
                      />
                      {/* Liquid highlight */}
                      <path d="M 60 100 L 60 150" stroke="rgba(255,255,255,0.3)" strokeWidth="3" strokeLinecap="round" />
                    </svg>

                    <div className="mt-2 p-2 bg-slate-900 rounded-lg text-xs max-w-xs">
                      <span className="text-slate-400 block font-mono text-[10px]">Active Sample: {adulterationSample.replace('_', ' ').toUpperCase()}</span>
                      <span className="text-white font-bold block mt-1">{reagentApplied ? `Tested with ${reagentApplied}` : 'Select Reagent to Test'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 4: PUBERTAL ENDOCRINE CASCADE */}
            {currentSlide === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-3">
                    <p className="text-xs text-slate-400 font-semibold">Click each anatomical node to trigger the hormonal cascade:</p>
                    {[
                      { id: 'hypothalamus', name: '1. Hypothalamus (Master Controller)', hormone: 'GnRH', role: 'Switches on pubertal biological clock' },
                      { id: 'pituitary', name: '2. Anterior Pituitary Gland', hormone: 'FSH & LH', role: 'Transmits gonadotropin signals via bloodstream' },
                      { id: 'gonads', name: '3. Gonads (Testes in Boys / Ovaries in Girls)', hormone: 'Testosterone / Estrogen', role: 'Triggers growth spurt, voice change, menarche' },
                      { id: 'adrenals', name: '4. Adrenal Glands', hormone: 'Androgens', role: 'Initiates pubic and axillary hair growth' },
                    ].map(g => (
                      <motion.button
                        key={g.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleGlandClick(g.id as any)}
                        className={`w-full text-left p-3 rounded-xl border transition-all text-xs ${
                          activeGland === g.id ? 'bg-purple-900/60 border-purple-400 text-white shadow-lg' : 'bg-slate-800/80 border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="flex justify-between font-bold">
                          <span>{g.name}</span>
                          <span className="text-purple-300 font-mono">{g.hormone}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">{g.role}</p>
                      </motion.button>
                    ))}
                  </div>

                  {/* SVG Anatomical Axis */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 280 260" className="w-full max-w-xs">
                      {/* Brain / Hypothalamus */}
                      <circle cx="140" cy="40" r="28" fill={activeGland === 'hypothalamus' ? '#a855f7' : '#334155'} />
                      <text x="140" y="44" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Hypothalamus</text>

                      {/* Line to Pituitary */}
                      <line x1="140" y1="68" x2="140" y2="95" stroke="#a855f7" strokeWidth="2" strokeDasharray="3,3" />

                      {/* Pituitary */}
                      <circle cx="140" cy="110" r="20" fill={activeGland === 'pituitary' ? '#c084fc' : '#334155'} />
                      <text x="140" y="114" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Pituitary</text>

                      {/* Branching to Gonads and Adrenals */}
                      <line x1="140" y1="130" x2="80" y2="180" stroke="#c084fc" strokeWidth="2" />
                      <line x1="140" y1="130" x2="200" y2="180" stroke="#c084fc" strokeWidth="2" />

                      {/* Adrenals */}
                      <rect x="45" y="180" width="70" height="36" rx="8" fill={activeGland === 'adrenals' ? '#f59e0b' : '#334155'} />
                      <text x="80" y="202" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Adrenals</text>

                      {/* Gonads */}
                      <rect x="165" y="180" width="70" height="36" rx="8" fill={activeGland === 'gonads' ? '#ec4899' : '#334155'} />
                      <text x="200" y="202" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Gonads</text>
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 5: PARENTING MATRIX */}
            {currentSlide === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-300">Emotional Warmth & Responsiveness:</span>
                        <span className="text-emerald-400 font-mono text-sm">{parentingWarmth}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={parentingWarmth}
                        onChange={e => setParentingWarmth(parseInt(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-label="Parenting Warmth"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-300">Demandingness & Behavioural Control:</span>
                        <span className="text-indigo-400 font-mono text-sm">{parentingDemandingness}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={parentingDemandingness}
                        onChange={e => setParentingDemandingness(parseInt(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                        aria-label="Parenting Demandingness"
                      />
                    </div>

                    <div className="p-4 rounded-xl border space-y-1" style={{ backgroundColor: `${parentingStyleDerived.color}15`, borderColor: parentingStyleDerived.color }}>
                      <span className="text-xs uppercase font-bold tracking-wider" style={{ color: parentingStyleDerived.color }}>
                        Identified Style: {parentingStyleDerived.name}
                      </span>
                      <p className="text-xs text-slate-200 mt-1">{parentingStyleDerived.desc}</p>
                    </div>
                  </div>

                  {/* 2x2 Grid Visualization */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                    <svg viewBox="0 0 240 240" className="w-full max-w-xs">
                      {/* 4 Quadrants */}
                      <rect x="20" y="20" width="95" height="95" fill="#f59e0b20" stroke="#f59e0b" strokeWidth="1" />
                      <text x="67" y="70" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">Authoritarian</text>

                      <rect x="125" y="20" width="95" height="95" fill="#10b98120" stroke="#10b981" strokeWidth="1" />
                      <text x="172" y="70" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">Authoritative</text>

                      <rect x="20" y="125" width="95" height="95" fill="#ef444420" stroke="#ef4444" strokeWidth="1" />
                      <text x="67" y="175" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold">Neglectful</text>

                      <rect x="125" y="125" width="95" height="95" fill="#3b82f620" stroke="#3b82f6" strokeWidth="1" />
                      <text x="172" y="175" textAnchor="middle" fill="#3b82f6" fontSize="9" fontWeight="bold">Permissive</text>

                      {/* Interactive Pointer Dot */}
                      <motion.circle
                        cx={20 + (parentingWarmth / 100) * 200}
                        cy={220 - (parentingDemandingness / 100) * 200}
                        r="8"
                        fill="#ffffff"
                        stroke={parentingStyleDerived.color}
                        strokeWidth="3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Slide Navigation Buttons */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-mono">
              Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-900/40"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-900/40"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE (FREE UNGRADED PLAY) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-bold uppercase tracking-wider">
              Sandbox Free Play Mode
            </span>
            <h3 className="text-lg font-bold text-white">Explore All Variables with Zero Grading Pressure</h3>
            <p className="text-xs text-slate-400">
              Manipulate patient fever, sodium salt intake, PPF compounding, and parenting axes simultaneously to observe physiological and financial dynamics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Nutrition & Blood Pressure Controls</h4>
              <div>
                <label className="text-xs text-slate-300 flex justify-between mb-1">
                  <span>Body Temp:</span> <span className="text-rose-400 font-mono font-bold">{patientTemp}°F</span>
                </label>
                <input
                  type="range"
                  min={98.6}
                  max={104.0}
                  step={0.2}
                  value={patientTemp}
                  onChange={e => handleTemperatureChange(parseFloat(e.target.value))}
                  className="w-full accent-rose-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 flex justify-between mb-1">
                  <span>Salt (NaCl):</span> <span className="text-amber-400 font-mono font-bold">{patientSaltIntake}g/day</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={14}
                  step={0.5}
                  value={patientSaltIntake}
                  onChange={e => handleSaltChange(parseFloat(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl text-xs space-y-1">
                <p className="text-slate-400">BMR Surge: <span className="text-rose-400 font-bold">+{bmrIncreasePercent}%</span></p>
                <p className="text-slate-400">Caloric Target: <span className="text-emerald-400 font-bold">{dailyCalorieNeed} kcal/day</span></p>
                <p className="text-slate-400">Vascular Stress: <span className="text-amber-400 font-bold">{vascularStressScore}</span></p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Financial Compounding Controls</h4>
              <div>
                <label className="text-xs text-slate-300 flex justify-between mb-1">
                  <span>Monthly PPF:</span> <span className="text-emerald-400 font-mono font-bold">₹{monthlySaving.toLocaleString('en-IN')}</span>
                </label>
                <input
                  type="range"
                  min={500}
                  max={12500}
                  step={500}
                  value={monthlySaving}
                  onChange={e => handleSavingsChange(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 flex justify-between mb-1">
                  <span>Tenure:</span> <span className="text-indigo-400 font-mono font-bold">{savingTenure} Years</span>
                </label>
                <input
                  type="range"
                  min={5}
                  max={25}
                  step={1}
                  value={savingTenure}
                  onChange={e => handleTenureChange(parseInt(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl text-xs space-y-1">
                <p className="text-slate-400">PPF Maturity Corpus: <span className="text-emerald-400 font-bold">₹{ppfMaturityCorpus.toLocaleString('en-IN')} (EEE)</span></p>
                <p className="text-slate-400">Idle Cash Purchasing Power: <span className="text-rose-400 font-bold">₹{idleCashPurchasingPower.toLocaleString('en-IN')}</span></p>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white rounded-2xl font-bold text-base shadow-xl shadow-emerald-950/60"
          >
            I am Ready for Structured Challenges! →
          </motion.button>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE (ADAPTIVE & NEP 2020) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
          <canvas ref={canvasRef} width={340} height={30} className="w-full rounded-lg" />

          {/* Progress and Difficulty Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-[11px] text-indigo-400 font-mono">Competency: {challenge.competencyLevel.toUpperCase()}</span>
            </div>

            <motion.span
              key={difficulty}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                difficulty === 'foundation'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : difficulty === 'advanced'
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                  : 'bg-blue-500/20 text-blue-400 border-blue-500/40'
              }`}
            >
              Tier: {difficulty}
            </motion.span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* CHALLENGE QUESTION CARD */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <p className="text-base sm:text-lg text-white font-semibold leading-relaxed">{challenge.question}</p>

            {/* MCQ / CLASSIFY / DISTINGUISH / MATCH */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5 pt-2">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                      wrongFlash
                        ? 'bg-rose-900/60 border-rose-500 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/90 hover:bg-slate-700/90 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* DRAG-LABEL CHALLENGE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'cond_hypertension', title: 'Hypertension Clinical Target' },
                    { id: 'cond_diabetes', title: 'Diabetes Glycaemic Target' },
                    { id: 'cond_obesity', title: 'Obesity Energy Deficit Target' },
                    { id: 'cond_diarrhoea', title: 'Diarrhoea Rehydration Target' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl transition-all"
                    >
                      <span className="text-xs text-slate-400 font-bold block mb-2">{target.title}:</span>
                      <div className="p-2.5 bg-slate-900 rounded-lg text-xs font-semibold text-emerald-400 min-h-[36px] flex items-center">
                        {droppedLabels[target.id] || <span className="text-slate-600">Drag matching principle here...</span>}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs"
                >
                  Verify Matched Principles
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT CHALLENGE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400 font-medium">Drag items or use the reorder buttons to establish the sequence:</p>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, idx) => (
                  <motion.div
                    key={idx}
                    draggable
                    onDragStart={() => setDraggedItem(String(idx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleSortMove(parseInt(draggedItem || '0'), idx)}
                    className="p-3.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl text-xs font-medium text-slate-200 flex items-center justify-between cursor-grab"
                  >
                    <span>
                      <strong className="text-indigo-400 mr-2">{idx + 1}.</strong> {item}
                    </span>
                    <span className="text-slate-500 text-xs">↕ Drag</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() =>
                    handleAnswer(
                      sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || [])
                    )
                  }
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs"
                >
                  Confirm Sorted Sequence
                </motion.button>
              </div>
            )}

            {/* NUMERIC CHALLENGE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl text-white font-mono text-sm w-44"
                    aria-label="Numeric answer input"
                  />
                  <span className="text-slate-400 text-xs font-semibold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs"
                  >
                    Check Value
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT CHALLENGE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4 pt-2">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-950 hover:bg-indigo-900 border border-indigo-700 text-indigo-200 rounded-lg text-xs font-semibold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[50px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <span key={idx} className="px-3 py-1 bg-emerald-950 border border-emerald-700 text-emerald-300 rounded-lg text-xs font-bold flex items-center gap-1.5">
                      {part}
                      <button onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))} className="text-rose-400 hover:text-rose-300 ml-1">
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-slate-600 text-xs">Click available parts to construct formula...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs disabled:opacity-40"
                >
                  Submit Formula Construction
                </motion.button>
              </div>
            )}

            {/* EXPLANATION & PROGRESSIVE DISCLOSURE */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-5 bg-amber-950/40 border border-amber-700/50 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Comprehensive Scientific Solution</span>
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs sm:text-sm text-amber-200 leading-relaxed">
                      <strong className="text-amber-400 font-mono mr-1">[{idx + 1}]</strong>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-700/80 hover:bg-amber-600 text-white rounded-xl text-xs font-bold"
                    >
                      Show Next Detail →
                    </motion.button>
                  ) : (
                    <div />
                  )}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-950/50"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-900 rounded-3xl border border-emerald-700/50 text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">ISC Home Science Mastery Achieved!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have systematically evaluated therapeutic dietetics, financial savings schemes, consumer protection frameworks, food adulteration tests, and adolescent developmental psychology.
            </p>

            {/* MOTIVATIONAL FEEDBACK BANNER */}
            <div className={`p-4 rounded-2xl border text-center ${
              errors === 0
                ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300'
                : errors <= 3
                ? 'bg-blue-950/60 border-blue-500/60 text-blue-300'
                : errors <= 7
                ? 'bg-amber-950/60 border-amber-500/60 text-amber-300'
                : 'bg-rose-950/60 border-rose-500/60 text-rose-300'
            }`}>
              <h3 className="text-lg font-black tracking-wide uppercase">
                {errors === 0 && 'PERFECT SCORE!'}
                {errors >= 1 && errors <= 3 && 'Great work!'}
                {errors >= 4 && errors <= 7 && 'Good effort!'}
                {errors >= 8 && 'Do not give up — You WILL get this!'}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {errors === 0 && 'Flawless execution! You demonstrated mastery across therapeutic nutrition, financial planning, and developmental science.'}
                {errors >= 1 && errors <= 3 && 'Strong conceptual grasp! You navigated challenging clinical and economic scenarios with confidence.'}
                {errors >= 4 && errors <= 7 && 'Good foundation! Review the diagnostic chemical tests and dietary numbers to reinforce your understanding.'}
                {errors >= 8 && 'Every mistake is a step toward mastery. Keep exploring the interactive labs and practice regularly to conquer this topic!'}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 font-bold block">Final Score</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 font-bold block">Mastery Tier</span>
                <span className="text-xl font-black text-indigo-400 capitalize">{masteryLevel}</span>
              </div>
              <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 font-bold block">Errors Incurred</span>
                <span className="text-xl font-black text-rose-400 font-mono">{errors}</span>
              </div>
              <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 font-bold block">Spaced Review</span>
                <span className="text-xl font-black text-amber-400">{errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}</span>
              </div>
            </div>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <span>🤔</span> Guided Reflection
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <p className="font-bold text-slate-200">What was the most surprising thing you learned?</p>
                <p className="text-slate-400">Think about how fever accelerates BMR by ~7% per 1°F, the toxic alkaloids in Argemone oil, or the EEE tax status of PPF.</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <p className="font-bold text-slate-200">How would you explain this to a friend?</p>
                <p className="text-slate-400">Summarize how therapeutic diets heal the body or how CPA 2019 protects consumer rights in simple, everyday language.</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <p className="font-bold text-slate-200">Where in real life might you use this?</p>
                <p className="text-slate-400">Consider managing family recovery during illnesses, detecting adulterants in kitchen staples, or planning long-term small savings.</p>
              </div>
            </div>
          </div>

          {/* MISCONCEPTION REVIEW PROFILE */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800/40 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">Your Personalized Diagnostic Remediation Profile</h3>
              <div className="space-y-2.5">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl text-xs space-y-1 border border-slate-800">
                      <p className="text-rose-400 font-bold">❌ Common Trap: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Scientific Principle: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CAPSTONE REAL WORLD AUDIT */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>📋</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-bold text-indigo-400">{i + 1}.</span> {st}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── MODAL FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Clinical Challenge Verified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_HomeScienceSpecialDietsFeverSim;