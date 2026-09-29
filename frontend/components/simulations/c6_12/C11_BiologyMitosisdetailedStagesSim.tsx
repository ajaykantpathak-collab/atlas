'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── REQUIRED NODE CONSTANTS ───
const NODE_C11_BIO_031 = 'c11_bio_031'; // Mitosis (detailed stages with diagrams)
const NODE_C11_BIO_032 = 'c11_bio_032'; // Meiosis (detailed stages, prophase I sub-stages)
const NODE_C11_BIO_033 = 'c11_bio_033'; // Photosynthetic pigments and photosystems
const NODE_C11_BIO_034 = 'c11_bio_034'; // Light reactions (cyclic and non-cyclic photophosphorylation)
const NODE_C11_BIO_035 = 'c11_bio_035'; // Dark reactions (C3 Calvin cycle)
const NODE_C11_BIO_036 = 'c11_bio_036'; // C4 pathway and Kranz anatomy
const NODE_C11_BIO_037 = 'c11_bio_037'; // Photorespiration and factors affecting photosynthesis
const NODE_C11_BIO_038 = 'c11_bio_038'; // Glycolysis
const NODE_C11_BIO_039 = 'c11_bio_039'; // Fermentation (anaerobic respiration)
const NODE_C11_BIO_040 = 'c11_bio_040'; // TCA cycle (Krebs cycle)

const ALL_NODE_IDS = [
  NODE_C11_BIO_031, NODE_C11_BIO_032, NODE_C11_BIO_033, NODE_C11_BIO_034, NODE_C11_BIO_035,
  NODE_C11_BIO_036, NODE_C11_BIO_037, NODE_C11_BIO_038, NODE_C11_BIO_039, NODE_C11_BIO_040
];

// ─── SCENARIO NARRATIVE ───
const SCENARIO = {
  title: 'The Metabolic Engine of the Tea Plantations',
  intro: 'In the high misty hills of Darjeeling, tea bushes (*Camellia sinensis*) are rapidly dividing at their shoot tips, capturing high-altitude solar energy, fixing carbon dioxide despite shifting sunlight, and burning glucose at night to fuel fragrant leaf production.',
  context: 'As a plant physiologist and cytologist advising the Tea Board of India, you must master the exact molecular mechanics of cell division (Mitosis & Meiosis), photosynthetic energy harvesting (Pigments, Photophosphorylation & C3/C4 Carbon Fixation), and cellular respiration (Glycolysis, Fermentation & TCA Cycle) to boost yield and hardiness.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In a dividing root tip cell of an Indian onion (*Allium cepa*), anaphase begins. What is the EXACT mechanical force that pulls sister chromatids apart?',
  options: [
    'Centrioles physically push against the cell membrane to stretch the cell',
    'Kinetochore spindle microtubules depolymerise and shorten, pulling daughter chromosomes by their centromeres',
    'Cytoplasmic streaming flows outward toward both poles, sweeping chromosomes along',
    'The cell plate expands in the middle and pushes chromatids sideways'
  ],
  correctIndex: 1,
  hintAfter: 'Let us dive inside the cell to observe kinetochore microtubules, spindle dynamics, and bioenergetics first-hand!',
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
}

// ─── CHALLENGES ARRAY (24 Comprehensive ISC Biology Challenges) ───
const CHALLENGES: Challenge[] = [
  // Tier 1: Foundation (8 challenges)
  {
    id: 'ch_bio_001',
    nodeId: NODE_C11_BIO_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'During mitosis in higher plant cells such as onion root tips, which structure is completely ABSENT during spindle formation?',
    options: ['Centrioles and Asters', 'Tubulin Spindle Fibres', 'Kinetochores on Centromeres', 'Equatorial Metaphase Plate'],
    correctIndex: 0,
    explanation: 'Higher plant cells lack centrosomes/centrioles and do not form star-shaped asters (anastral mitosis). They assemble mitotic spindles directly from microtubule organising regions.',
    hints: [
      'Think about animal-specific organelles vs plant structures.',
      'Plants have cell walls and microtubules, but lack centrioles.',
      'Centrioles and asters only appear in animal cell division.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_bio_002',
    nodeId: NODE_C11_BIO_032,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the 5 sub-stages of Prophase I of Meiosis in the strict chronological sequence.',
    sortItems: ['Leptotene (chromatin condensation)', 'Zygotene (synapsis & bivalent formation)', 'Pachytene (crossing over)', 'Diplotene (chiasmata visible)', 'Diakinesis (terminalisation)'],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The correct mnemonic sequence is L-Z-P-D-D: Leptotene -> Zygotene -> Pachytene -> Diplotene -> Diakinesis.',
    hints: [
      'Remember the phrase: "Leo Zebras Play Double Drums".',
      'Synapsis happens before crossing over.',
      'Diakinesis is the final stage before Metaphase I.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_bio_003',
    nodeId: NODE_C11_BIO_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the primary reaction centre chlorophyll in Photosystem II (PS II) and Photosystem I (PS I) respectively?',
    options: ['PS II is P680; PS I is P700', 'PS II is P700; PS I is P680', 'Both use P680', 'PS II is Chlorophyll b; PS I is Carotenoid'],
    correctIndex: 0,
    explanation: 'PS II absorbs light maximally at 680 nm (P680) and performs photolysis of water. PS I absorbs maximally at 700 nm (P700) to reduce NADP+.',
    hints: [
      'Photosystem II acts first in the non-cyclic path and absorbs shorter wavelength light.',
      '680 nm is higher energy than 700 nm.',
      'PS II = P680 and PS I = P700.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_004',
    nodeId: NODE_C11_BIO_034,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following is produced ONLY in non-cyclic photophosphorylation and NEVER in cyclic photophosphorylation?',
    options: ['NADPH and Oxygen (O2)', 'ATP only', 'Proton Motive Force', 'Plastoquinone oxidation'],
    correctIndex: 0,
    explanation: 'Cyclic photophosphorylation involves only PS I and produces exclusively ATP. Non-cyclic photophosphorylation involves PS II and PS I, generating ATP, NADPH, and releasing O2 from water photolysis.',
    hints: [
      'Cyclic loops electrons without photolysis of water.',
      'Without water splitting, no oxygen is generated.',
      'NADPH requires electrons from non-cyclic transport.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_005',
    nodeId: NODE_C11_BIO_035,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'To synthesise ONE molecule of Glucose (C6H12O6) through the Calvin cycle, how many total ATP molecules are consumed across the 6 turns?',
    correctAnswer: 18,
    tolerance: 0,
    unit: 'ATP',
    explanation: 'Each fixed CO2 consumes 3 ATP (2 in glycolytic reversal reduction + 1 in RuBP regeneration) and 2 NADPH. For 6 CO2 molecules: 6 x 3 = 18 ATP (and 12 NADPH).',
    hints: [
      'Per 1 CO2 fixed, 3 ATP are consumed.',
      'A glucose molecule contains 6 carbons, requiring 6 turns.',
      '6 x 3 = 18 ATP total.'
    ],
  },
  {
    id: 'ch_bio_006',
    nodeId: NODE_C11_BIO_038,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the NET ATP gain produced directly during cytoplasmic glycolysis from 1 single molecule of glucose?',
    correctAnswer: 2,
    tolerance: 0,
    unit: 'ATP',
    explanation: 'Glycolysis gross yield is 4 ATP by substrate-level phosphorylation, but 2 ATP are invested in the preparatory phase (Hexokinase & PFK-1), yielding a net of 2 ATP (along with 2 NADH and 2 pyruvate).',
    hints: [
      'Gross production is 4 ATP.',
      'Subtract the 2 ATP invested at the beginning.',
      '4 - 2 = 2 net ATP.'
    ],
  },
  {
    id: 'ch_bio_007',
    nodeId: NODE_C11_BIO_039,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In the dough of bakeries in Mumbai or brewing of yeast, why does alcoholic fermentation release CO2 gas while human muscle lactic fermentation does not?',
    options: [
      'Yeast uses Pyruvate Decarboxylase to make acetaldehyde; muscles reduce pyruvate directly with Lactate Dehydrogenase',
      'Lactic acid fermentation occurs in mitochondria where gas is absorbed',
      'Yeast carries out aerobic respiration inside the dough',
      'Muscle cells destroy carbon atoms using myoglobin'
    ],
    correctIndex: 0,
    explanation: 'Alcoholic fermentation has a decarboxylation step (Pyruvate 3C -> Acetaldehyde 2C + CO2). Lactic acid fermentation reduces Pyruvate (3C) directly to Lactic acid (3C) without CO2 release.',
    hints: [
      'Count the carbons: Pyruvate is 3C, Ethanol is 2C, Lactic acid is 3C.',
      '3C to 2C must lose a carbon as CO2.',
      'Pyruvate decarboxylase is unique to alcoholic fermentation.'
    ],
  },
  {
    id: 'ch_bio_008',
    nodeId: NODE_C11_BIO_040,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In the mitochondrial matrix, what 4-carbon compound condenses with 2-carbon Acetyl-CoA to initiate the TCA Krebs cycle?',
    options: ['Oxaloacetate (OAA)', 'Citrate', 'Alpha-ketoglutarate', 'Succinyl-CoA'],
    correctIndex: 0,
    explanation: 'Citrate synthase condenses 4C Oxaloacetate with 2C Acetyl-CoA to form 6C Citrate (citric acid).',
    hints: [
      'It is the regenerated 4-carbon acceptor molecule.',
      'Starts with O and ends with acetate.',
      'Oxaloacetate (4C) + Acetyl-CoA (2C) = Citrate (6C).'
    ],
  },

  // Tier 2: Standard (8 challenges)
  {
    id: 'ch_bio_009',
    nodeId: NODE_C11_BIO_031,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Drag the correct mitotic structures to their accurate positions on the cell diagram during metaphase/anaphase.',
    dragItems: [
      { label: 'Kinetochore', targetId: 'target_centromere' },
      { label: 'Spindle Microtubules', targetId: 'target_spindle' },
      { label: 'Cleavage Furrow / Cell Plate', targetId: 'target_equator' },
      { label: 'Centrosome Pole', targetId: 'target_pole' }
    ],
    correctMapping: {
      target_centromere: 'Kinetochore',
      target_spindle: 'Spindle Microtubules',
      target_equator: 'Cleavage Furrow / Cell Plate',
      target_pole: 'Centrosome Pole'
    },
    explanation: 'Kinetochores bind spindle microtubules to centromeres; spindle fibres pull chromosomes toward opposite centrosomal poles across the equatorial plane.',
    hints: [
      'The protein disc on the centromere is the Kinetochore.',
      'The fibres connecting poles to chromosomes are Spindle Microtubules.',
      'The centre dividing zone is the Cleavage Furrow / Cell Plate.'
    ],
  },
  {
    id: 'ch_bio_010',
    nodeId: NODE_C11_BIO_032,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A cytogeneticist examines rice (*Oryza sativa*, 2n = 24). At Anaphase I of meiosis, what separates to opposite poles?',
    options: [
      'Homologous chromosomes separate; sister chromatids remain united at centromeres',
      'Sister chromatids split at centromeres into single chromatid chromosomes',
      'Centromeres divide into 4 pieces per bivalent',
      'All 24 chromosomes move together to one pole'
    ],
    correctIndex: 0,
    explanation: 'In Anaphase I, homologous chromosomes disjoin and move to opposite poles, halving the chromosome number (reductional division). Sister chromatids only split in Anaphase II.',
    hints: [
      'Anaphase I separates homologues; Anaphase II separates sister chromatids.',
      'Centromeres do not split in Anaphase I.',
      'Each migrating chromosome still consists of two chromatids.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_bio_011',
    nodeId: NODE_C11_BIO_036,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In sugarcane (*Saccharum officinarum*) showing Kranz anatomy, in which specific cells does PEP Carboxylase and RuBisCO operate respectively?',
    options: [
      'PEP Carboxylase in Mesophyll cells; RuBisCO in Bundle Sheath cells',
      'RuBisCO in Mesophyll cells; PEP Carboxylase in Bundle Sheath cells',
      'Both enzymes operate together exclusively in Mesophyll cells',
      'Both enzymes operate together exclusively in Bundle Sheath cells'
    ],
    correctIndex: 0,
    explanation: 'Spatial division of labour: PEP Carboxylase fixes CO2 into Oxaloacetate in Mesophyll cells; RuBisCO fixes the released concentrated CO2 in the Calvin cycle inside Bundle Sheath cells.',
    hints: [
      'Mesophyll faces incoming air and uses the high-affinity PEP carboxylase.',
      'RuBisCO is sheltered in the wreath-like bundle sheath cells away from O2.',
      'PEP Carboxylase = Mesophyll; RuBisCO = Bundle Sheath.'
    ],
  },
  {
    id: 'ch_bio_012',
    nodeId: NODE_C11_BIO_037,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'During a sweltering 42°C afternoon in Punjab wheat fields, stomata close to prevent desiccation. Why does RuBisCO switch to photorespiration?',
    options: [
      'Internal CO2 levels drop while O2 accumulates from PS II photolysis, favoring RuBisCO oxygenase activity',
      'Light reactions completely shut down and produce zero ATP',
      'Wheat activates Kranz anatomy bundle sheath enzymes',
      'Enzymes denature and destroy all 3-PGA molecules'
    ],
    correctIndex: 0,
    explanation: 'When stomata close, CO2 is rapidly consumed and O2 builds up. RuBisCO exhibits oxygenase activity (Warburg effect), binding O2 to RuBP to produce 1 molecule of 3-PGA and 1 toxic 2-phosphoglycolate.',
    hints: [
      'Closed stomata trap O2 and prevent fresh CO2 entry.',
      'RuBisCO has dual affinity for both CO2 and O2.',
      'High O2/CO2 ratio triggers RuBP oxygenation.'
    ],
  },
  {
    id: 'ch_bio_013',
    nodeId: NODE_C11_BIO_038,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Construct the correct sequence of glycolytic intermediates from initial glucose phosphorylation to pyruvate.',
    availableParts: ['Glucose-6-P', 'Fructose-1,6-bisP', 'G3P & DHAP', '1,3-Bisphosphoglycerate', 'Phosphoenolpyruvate (PEP)'],
    targetState: 'Glucose-6-P Fructose-1,6-bisP G3P & DHAP 1,3-Bisphosphoglycerate Phosphoenolpyruvate (PEP)',
    validationHint: 'Select all 5 steps in correct order from Hexokinase priming to final substrate phosphorylation.',
    explanation: 'Glucose -> Glucose-6-P -> Fructose-6-P -> Fructose-1,6-bisP -> G3P/DHAP -> 1,3-Bisphosphoglycerate -> 3-PGA -> 2-PGA -> PEP -> Pyruvate.',
    hints: [
      'First is Glucose-6-P from hexokinase.',
      'Second kinase produces Fructose-1,6-bisphosphate.',
      'Aldolase then cleaves into G3P & DHAP.'
    ],
  },
  {
    id: 'ch_bio_014',
    nodeId: NODE_C11_BIO_040,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For the complete aerobic oxidation of ONE mole of Glucose through 2 turns of the TCA cycle (excluding link reaction & glycolysis), how many total NADH molecules are produced?',
    correctAnswer: 6,
    tolerance: 0,
    unit: 'NADH',
    explanation: 'Each turn of the TCA cycle produces 3 NADH (at Isocitrate -> a-KG, a-KG -> Succinyl-CoA, Malate -> OAA). 2 Acetyl-CoA per glucose yield 2 x 3 = 6 NADH.',
    hints: [
      'One turn of the Krebs cycle yields 3 NADH.',
      'One glucose yields two molecules of Acetyl-CoA.',
      '2 x 3 = 6 NADH in the TCA cycle.'
    ],
  },
  {
    id: 'ch_bio_015',
    nodeId: NODE_C11_BIO_034,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If an experimental herbicide DCMU blocks electron transfer from PS II to Plastoquinone in chloroplast thylakoids, what will happen?',
    options: [
      'Water photolysis and NADPH production halt, but cyclic photophosphorylation around PS I can still generate some ATP',
      'All ATP synthesis stops immediately, both cyclic and non-cyclic',
      'The plant switches directly to C4 photosynthesis',
      'RuBisCO begins fixing nitrogen instead of CO2'
    ],
    correctIndex: 0,
    explanation: 'Blocking PS II stops non-cyclic electron flow (no O2 from photolysis, no NADPH reduction). However, PS I can continue cyclic electron transport via ferredoxin, cytochrome b6f, and plastocyanin to produce ATP.',
    hints: [
      'DCMU specifically targets PS II, not PS I.',
      'PS I can cycle electrons independently.',
      'Cyclic photophosphorylation still makes ATP.'
    ],
  },
  {
    id: 'ch_bio_016',
    nodeId: NODE_C11_BIO_037,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'According to Blackman’s Law of Limiting Factors, if a green house has 0.03% CO2, bright sunlight, and 25°C temperature, what happens if light intensity is doubled?',
    options: [
      'Photosynthesis rate remains unchanged because CO2 concentration is the limiting factor',
      'Photosynthesis rate doubles immediately',
      'The plant enters photorespiration and wilts',
      'Chlorophyll a is converted into xanthophyll'
    ],
    correctIndex: 0,
    explanation: 'When a process is conditioned by multiple factors, its rate is governed by the factor in shortest supply (Blackman\'s Law). Here CO2 is limiting; increasing light will not increase rate until CO2 is raised.',
    hints: [
      'Find which factor is at sub-optimal concentration.',
      'Atmospheric CO2 (0.03-0.04%) is usually the chief limiting factor under bright sun.',
      'Increasing a non-limiting factor has zero effect on the rate.'
    ],
  },

  // Tier 3: Advanced & NEP 2020 Competency (8 challenges)
  {
    id: 'ch_bio_017',
    nodeId: NODE_C11_BIO_032,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A diploid microspore mother cell of wheat (*Triticum aestivum*, 2n = 42) undergoes complete meiosis. How many total chromosomes and chromatids are present in ONE daughter nucleus at Telophase I?',
    correctAnswer: 21,
    tolerance: 0,
    unit: 'chromosomes',
    explanation: 'At Telophase I, homologous chromosomes have disjoined: chromosome count per nucleus is haploid (n = 21). However, centromeres have NOT split, so each chromosome still has 2 sister chromatids (total 42 chromatids).',
    hints: [
      'Meiosis I is reductional: 2n becomes n.',
      '42 / 2 = 21 chromosomes.',
      'Count centromeres to count chromosomes.'
    ],
  },
  {
    id: 'ch_bio_018',
    nodeId: NODE_C11_BIO_035,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'To fix 12 molecules of atmospheric CO2 into 2 molecules of Glucose, how many total NADPH molecules must be oxidized in the stroma by the Calvin cycle?',
    correctAnswer: 24,
    tolerance: 0,
    unit: 'NADPH',
    explanation: 'Each CO2 fixed requires 2 NADPH in the reduction phase (1,3-BPGA -> G3P). For 12 CO2 molecules: 12 x 2 = 24 NADPH (along with 36 ATP).',
    hints: [
      '1 turn = 1 CO2 = 2 NADPH.',
      'For 2 glucose (12 CO2): 12 x 2 = ?',
      '24 NADPH are consumed.'
    ],
  },
  {
    id: 'ch_bio_019',
    nodeId: NODE_C11_BIO_037,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Trace the intracellular salvage journey of toxic 2-phosphoglycolate during photorespiration through the three collaborating organelles in exact sequence.',
    sortItems: [
      'Chloroplast: 2-phosphoglycolate dephosphorylated to Glycolate',
      'Peroxisome: Glycolate oxidised to Glyoxylate and transaminated to Glycine',
      'Mitochondria: 2 Glycine condensed to 1 Serine with release of CO2 and NH3',
      'Peroxisome & Chloroplast: Serine converted back to Glycerate and 3-PGA'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Photorespiration (C2 cycle) spans Chloroplast -> Peroxisome -> Mitochondrion -> Peroxisome -> Chloroplast to salvage 75% of carbon as 3-PGA while losing 25% as CO2.',
    hints: [
      'Starts in chloroplast where RuBisCO makes phosphoglycolate.',
      'Passes next into peroxisome where catalase works.',
      'Mitochondria releases CO2 when 2 glycines form serine.'
    ],
  },
  {
    id: 'ch_bio_020',
    nodeId: NODE_C11_BIO_036,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate why C4 plants such as maize require 30 ATP per glucose synthesized versus 18 ATP in C3 plants, yet still out-yield C3 plants in tropical climates.',
    options: [
      'The extra 12 ATP pump CO2 to suppress photorespiration; in hot tropics C3 plants waste >30-40% fixed carbon in photorespiration',
      'C4 plants do not use RuBisCO at all',
      'C4 bundle sheath cells produce ATP directly without sunlight',
      'C4 plants absorb nitrogen through PEP carboxylase'
    ],
    correctIndex: 0,
    explanation: 'Regenerating PEP from pyruvate costs 2 ATP per CO2 (12 extra ATP per glucose). However, concentrating CO2 around RuBisCO completely suppresses photorespiratory carbon loss, yielding massive net gain in hot climates.',
    hints: [
      'Consider the energy lost in photorespiration in C3 plants.',
      'The C4 carbon pump has an ATP cost (PEP regeneration).',
      'In high heat, avoiding photorespiration outweighs the 12 ATP pump cost.'
    ],
  },
  {
    id: 'ch_bio_021',
    nodeId: NODE_C11_BIO_040,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Why is the Krebs TCA cycle scientifically classified as "Amphibolic" rather than purely catabolic?',
    options: [
      'It breaks down acetyl groups (catabolic) while its intermediates (e.g. a-KG, OAA, Succinyl-CoA) are precursors for amino acids & haem (anabolic)',
      'It functions both in the presence and complete absence of oxygen',
      'It occurs in both plant chloroplasts and animal mitochondria simultaneously',
      'It converts glucose into both starch and glycogen'
    ],
    correctIndex: 0,
    explanation: 'Amphibolic means both catabolic and anabolic. TCA oxidises fuel for ATP, but also donates a-ketoglutarate for glutamate, oxaloacetate for aspartate, and succinyl-CoA for chlorophyll/haem synthesis.',
    hints: [
      '"Amphi" means dual (like amphibious).',
      'Catabolism = breakdown; Anabolism = building complex molecules.',
      'Intermediates are drawn off for biosynthesis.'
    ],
  },
  {
    id: 'ch_bio_022',
    nodeId: NODE_C11_BIO_031,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In animal cytokinesis vs plant cytokinesis, what are the primary mechanical driving structures respectively?',
    options: [
      'Actin-myosin contractile ring (centripetal cleavage furrow) vs Golgi-derived phragmoplast vesicles (centrifugal cell plate)',
      'Tubulin ring (centrifugal) vs Cellulose synthases (centripetal)',
      'Centriolar aster pressure vs Tonoplast expansion',
      'Both use actin cleavage furrows pinching inwards from outside'
    ],
    correctIndex: 0,
    explanation: 'Animal cells divide centripetally (outside-in) via a contractile ring of actin and myosin filaments. Rigid plant cells cannot pinch and divide centrifugally (inside-out) via phragmoplast vesicles fusing into a cell plate.',
    hints: [
      'Animals pinch inward (centripetal cleavage furrow).',
      'Plants build outward from centre (centrifugal cell plate).',
      'Plant cell walls prevent pinching.'
    ],
  },
  {
    id: 'ch_bio_023',
    nodeId: NODE_C11_BIO_034,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the non-cyclic Z-scheme electron transport chain in the precise thermodynamic order from water photolysis to NADPH synthesis.',
    availableParts: ['H2O Photolysis at PS II (P680)', 'Plastoquinone (PQ) & Cyt b6f', 'Plastocyanin (PC)', 'PS I (P700) & Ferredoxin', 'NADP+ Reductase -> NADPH'],
    targetState: 'H2O Photolysis at PS II (P680) Plastoquinone (PQ) & Cyt b6f Plastocyanin (PC) PS I (P700) & Ferredoxin NADP+ Reductase -> NADPH',
    validationHint: 'Order the carriers from donor water to terminal acceptor NADP+.',
    explanation: 'Water -> PS II (P680) -> Plastoquinone -> Cytochrome b6f -> Plastocyanin -> PS I (P700) -> Ferredoxin -> NADP+ Reductase -> NADPH.',
    hints: [
      'Water is split at PS II first.',
      'Electrons flow through Plastoquinone and Cyt b6f.',
      'Plastocyanin transfers electrons to PS I before Ferredoxin reduces NADP+.'
    ],
  },
  {
    id: 'ch_bio_024',
    nodeId: NODE_C11_BIO_039,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'During severe sprint hypoxia in an athlete, why must muscle cells convert pyruvate to lactic acid even though no additional ATP is made in that step?',
    options: [
      'To re-oxidize NADH back to NAD+, allowing glyceraldehyde-3-phosphate dehydrogenase in glycolysis to continue producing 2 ATP',
      'To neutralise cytoplasmic acidity caused by ATP hydrolysis',
      'To transport lactate directly into the mitochondria for the Krebs cycle',
      'To produce oxygen internally by reversing photolysis'
    ],
    correctIndex: 0,
    explanation: 'Glycolysis requires NAD+ at step 6 (GAPDH). Without oxygen, the electron transport chain cannot re-oxidise NADH. Lactate dehydrogenase reduces pyruvate to lactate to regenerate NAD+, keeping glycolysis running.',
    hints: [
      'Look at what gets recycled: NADH -> NAD+.',
      'Glycolysis stops dead if NAD+ pool runs out.',
      'Lactic acid fermentation is an NAD+ regeneration mechanism.'
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
  nodeId: NODE_C11_BIO_031,
  title: 'Mitosis, Meiosis & Plant-Cell Bioenergetics',
  definition: 'Comprehensive Class 11 ISC Biology module covering detailed stages of Mitosis and Meiosis, Photosystems I & II, Light & Dark Reactions, C4 Kranz Anatomy, Photorespiration, Glycolysis, Fermentation, and the Krebs TCA Cycle.',
  eli5: 'Cell division duplicates or halves the genetic blueprints, while photosynthesis traps solar energy into sugar batteries, and cellular respiration unpacks those batteries to power living cells.',
  misconceptions: [
    { misconception: 'Plant cells use centrioles and asters during mitosis.', correction: 'Higher plant cells lack centrioles and asters; they form anastral spindles directly from microtubule organizing centres.' },
    { misconception: 'Crossing over occurs during zygotene or metaphase I.', correction: 'Crossing over takes place strictly during pachytene of prophase I between non-sister chromatids of homologous pairs.' },
    { misconception: 'Cyclic photophosphorylation splits water and produces NADPH.', correction: 'Cyclic photophosphorylation involves only PS I and produces exclusively ATP without water photolysis or NADPH formation.' },
    { misconception: 'Dark reactions (Calvin cycle) only occur at night in the dark.', correction: 'The Calvin cycle does not require photons directly, but requires light-reaction ATP and NADPH, so it is most active in daylight.' },
    { misconception: 'Glycolysis releases carbon dioxide and occurs in mitochondria.', correction: 'Glycolysis occurs in the cytoplasm, requires no oxygen, and converts 6C glucose into 2x 3C pyruvate with zero CO2 release.' }
  ],
  diagnosticQuestions: [
    { question: 'What is the key event of anaphase in mitosis?', options: ['Chromatin condenses', 'Chromosomes align at equator', 'Centromeres split and sister chromatids separate', 'Nuclear envelope reforms'], correctIndex: 2 },
    { question: 'Which sub-stage of Prophase I exhibits synaptonemal complex formation?', options: ['Leptotene', 'Zygotene', 'Pachytene', 'Diakinesis'], correctIndex: 1 },
    { question: 'What is the primary electron donor for Photosystem II?', options: ['Carbon dioxide', 'Water (H2O)', 'NADPH', 'Glucose'], correctIndex: 1 },
    { question: 'What is the first stable product of the Calvin cycle?', options: ['3-Phosphoglycerate (3-PGA)', 'Oxaloacetate', 'RuBP', 'Glucose-6-P'], correctIndex: 0 },
    { question: 'Which enzyme is responsible for initial CO2 fixation in C4 mesophyll cells?', options: ['RuBisCO', 'PEP Carboxylase', 'Hexokinase', 'Pyruvate kinase'], correctIndex: 1 },
    { question: 'What organelle converts Glycolate to Glyoxylate during photorespiration?', options: ['Chloroplast', 'Peroxisome', 'Mitochondria', 'Vacuole'], correctIndex: 1 },
    { question: 'Where does glycolysis occur within eukaryotic cells?', options: ['Mitochondrial Matrix', 'Cytoplasm (Cytosol)', 'Inner Mitochondrial Membrane', 'Chloroplast Stroma'], correctIndex: 1 },
    { question: 'How many molecules of CO2 are released per turn of the Krebs TCA cycle from Acetyl-CoA?', options: ['1 CO2', '2 CO2', '3 CO2', '4 CO2'], correctIndex: 1 }
  ],
  masteryCriteria: 'Student understands cell division stages, photosynthetic light/dark mechanics, and respiratory metabolic cycles at ISC Class 11 depth.',
};

// ─── EXPLORATION STEPS (Brilliant.org style) ───
const EXPLORATION_STEPS = [
  {
    title: '1. Mitosis: The Kinetochore Tug-of-War',
    instruction: 'Drag the Mitosis Phase slider to step through Prophase, Metaphase, Anaphase, and Telophase. Watch centromere splitting and spindle shortening in real-time.',
    interactionType: 'slider-mitosis',
    nodeId: NODE_C11_BIO_031,
  },
  {
    title: '2. Meiosis I: Crossing Over & Recombination',
    instruction: 'Click on the homologous bivalents in Pachytene to trigger genetic crossing over at chiasmata and observe chromosome variation.',
    interactionType: 'click-chiasma',
    nodeId: NODE_C11_BIO_032,
  },
  {
    title: '3. The Z-Scheme & Photophosphorylation',
    instruction: 'Toggle between Non-Cyclic and Cyclic photophosphorylation. Observe electron excitation from PS II (P680) to PS I (P700) and proton pumping.',
    interactionType: 'toggle-pathway',
    nodeId: NODE_C11_BIO_034,
  },
  {
    title: '4. C4 Kranz Anatomy: The CO2 Pump',
    instruction: 'Adjust the Temperature and Light sliders to see how C4 Kranz anatomy pumps concentrated CO2 into bundle sheath cells to suppress photorespiration.',
    interactionType: 'slider-c4',
    nodeId: NODE_C11_BIO_036,
  },
  {
    title: '5. Cellular Respiration: Glycolysis to Krebs TCA Wheel',
    instruction: 'Toggle Oxygen levels from 100% (Aerobic TCA Cycle) to 0% (Anaerobic Fermentation) and observe NAD+ regeneration in real time.',
    interactionType: 'slider-respiration',
    nodeId: NODE_C11_BIO_040,
  },
];

// ─── PREDICTION & OBSERVATION ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What happens to the rate of Photorespiration in a C3 plant when leaf temperature rises from 20°C to 38°C with stomata partially closed?',
    options: [
      'Photorespiration decreases because enzymes slow down',
      'Photorespiration surges dramatically as CO2 solubility drops faster than O2 and RuBisCO acts as an oxygenase',
      'Photorespiration stays exactly constant',
      'The plant switches spontaneously to the Krebs cycle'
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Temperature slider in the C4/C3 simulator to +38°C and watch the photorespiration gauge spike!',
    nodeId: NODE_C11_BIO_037,
  },
  {
    question: 'Predict: If oxygen is completely removed from a muscle cell suspension, what will happen to the production of pyruvate and lactic acid?',
    options: [
      'Pyruvate production stops; glucose remains untouched',
      'Glycolysis continues, but pyruvate is rapidly converted to lactic acid to regenerate NAD+',
      'The Krebs cycle runs backwards to make oxygen',
      'Cell ATP jumps from 2 ATP to 36 ATP'
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag Oxygen to 0% on the Respiration simulator and observe the surge in Lactic Acid and NAD+ recycling!',
    nodeId: NODE_C11_BIO_039,
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the chromosome count at Anaphase I of Meiosis compared to Anaphase of Mitosis?',
    observableOptions: [
      'In Mitosis, sister chromatids split (chromosome number doubles momentarily); in Meiosis I, whole homologues separate without centromere splitting',
      'Mitosis halves the chromosomes while Meiosis doubles them',
      'Both stages split sister centromeres identically',
      'Chromosomes dissolve into free nucleotides'
    ],
    correctIndex: 0,
    nodeId: NODE_C11_BIO_032,
  },
  {
    question: 'In the C4 Kranz Anatomy visualization, where is the Calvin cycle RuBisCO enzyme sequestered?',
    observableOptions: [
      'Directly exposed to air in the mesophyll',
      'Protected inside the thick-walled bundle sheath cells surrounding the vascular bundle',
      'Inside the epidermal guard cells',
      'In the xylem vessels'
    ],
    correctIndex: 1,
    nodeId: NODE_C11_BIO_036,
  }
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Darjeeling Tea Estate Agronomy Investigation',
  description: 'Apply your understanding of cellular bioenergetics and mitosis to optimize tea leaf plucking and cold-hardiness during Himalayan winters.',
  steps: [
    '1. Examine apical shoot meristems (two leaves and a bud) under light microscopy to verify high mitotic index.',
    '2. Measure chlorophyll a/b ratio to calibrate shade-netting for peak photosystem excitation.',
    '3. Evaluate C3 photorespiratory loss during hot valley afternoons vs high-altitude mist.',
    '4. Monitor post-harvest tea leaf fermentation (oxidation) enzymes converting catechins to theaflavins.'
  ],
};

// ─── MAIN COMPONENT ───
function C11_BiologyMitosisdetailedStagesSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['biology'] || { name: 'Biology', emoji: '🧬', color: 'emerald' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org interactive discovery & exploration states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Model State Variables
  const [mitosisStage, setMitosisStage] = useState<number>(1); // 0: Prophase, 1: Metaphase, 2: Anaphase, 3: Telophase
  const [chiasmaClicked, setChiasmaClicked] = useState<boolean>(false);
  const [photophosphoType, setPhotophosphoType] = useState<'non-cyclic' | 'cyclic'>('non-cyclic');
  const [tempC4, setTempC4] = useState<number>(25);
  const [lightIntensity, setLightIntensity] = useState<number>(60);
  const [co2Level, setCo2Level] = useState<number>(400);
  const [o2Level, setO2Level] = useState<number>(21);
  const [selectedOrganelle, setSelectedOrganelle] = useState<string | null>(null);
  const [respirationOxygen, setRespirationOxygen] = useState<number>(100); // 0 to 100%
  const [activeRespirationPath, setActiveRespirationPath] = useState<'aerobic' | 'lactic' | 'alcoholic'>('aerobic');

  // Adaptive difficulty & scoring
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

  // Visual feedback & animations
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Challenge Drag-and-Drop / Interactive Inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback overlays
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Persistent BKT & Timers
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ���── INITIAL MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C11_BIO_031);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE UPDATE ───
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

  // ─── REAL-TIME CANVAS ANIMATION LOOP (Spindle & Particle Stream) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const particles: { x: number; y: number; speed: number; size: number; color: string }[] = [];
    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * 320,
        y: Math.random() * 60,
        speed: 0.5 + Math.random() * 1.5,
        size: 1.5 + Math.random() * 2,
        color: i % 2 === 0 ? '#10b981' : '#6366f1'
      });
    }

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw flowing ATP / Electron particles
      particles.forEach(p => {
        p.x += p.speed;
        if (p.x > canvas.width) p.x = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Draw subtle status wave
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 5) {
        const y = 30 + Math.sin((x + frame * 2) * 0.05) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── HANDLERS (useCallback Memoised) ───
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
      setShowExplanation(true);
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
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Splendid observation! Chromosome microtubules pull chromatids.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive cell lab. Explore each stage visually.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Manipulate temperature, light, and mitosis stages freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode unlocked. Test your understanding!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the simulation controls to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on biological observation!' : 'Look closely at centromere structure in the visual.');
  }, []);

  const handleMitosisStageChange = useCallback((newStage: number) => {
    setMitosisStage(newStage);
    audioManager.play('count');
    const stageNames = ['Prophase: Chromatin condenses, envelopes dissolve', 'Metaphase: Chromosomes line up at equatorial plate', 'Anaphase: Centromeres split, chromatids pulled to poles', 'Telophase: Nuclear envelopes reform, cytokinesis starts'];
    speechManager.speak(stageNames[newStage]);
  }, []);

  const handleChiasmaToggle = useCallback(() => {
    setChiasmaClicked(prev => !prev);
    audioManager.play('sparkle');
    speechManager.speak('Pachytene crossing over: Non-sister chromatids swap genetic fragments!');
  }, []);

  const handlePhotophosphoToggle = useCallback((mode: 'non-cyclic' | 'cyclic') => {
    setPhotophosphoType(mode);
    audioManager.play('tap');
    speechManager.speak(mode === 'non-cyclic' ? 'Non-cyclic Z-scheme active: PS II and PS I produce ATP, NADPH and O2.' : 'Cyclic photophosphorylation active: PS I produces ATP only.');
  }, []);

  const handleTempC4Change = useCallback((val: number) => {
    setTempC4(val);
    audioManager.play('balance');
  }, []);

  const handleRespirationOxygenChange = useCallback((val: number) => {
    setRespirationOxygen(val);
    if (val < 20) {
      setActiveRespirationPath('lactic');
    } else {
      setActiveRespirationPath('aerobic');
    }
    audioManager.play('count');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
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
      let arr = prev.length === challenge.sortItems?.length ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak(`Mastery session complete! You achieved ${finalScore} percent.`);
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

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Excellent biological reasoning! Correct.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify({ score: 100, timestamp: Date.now() }));
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
        speechManager.speak('Let us review the detailed biological breakdown together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleOrganelleSelect = useCallback((name: string) => {
    setSelectedOrganelle(name);
    audioManager.play('tap');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950 border border-emerald-700 rounded-2xl">{subjectConfig.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">ISC Class 11 Biology</span>
              <span className="text-xs text-slate-400 font-mono">Nodes: c11_bio_031–040</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Dynamic difficulty badge */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`text-xs font-black uppercase px-3 py-1 rounded-xl border ${
              difficulty === 'foundation' ? 'bg-emerald-900/60 border-emerald-500 text-emerald-300' :
              difficulty === 'advanced' ? 'bg-purple-900/60 border-purple-500 text-purple-300' :
              'bg-gold-900/60 border-gold-500 text-gold-300'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Mastery Level</span>
            <span className="text-sm font-bold text-emerald-400 capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-5 bg-gradient-to-r from-emerald-950/70 to-slate-900 rounded-2xl border border-emerald-800/80 shadow-lg">
            <h2 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
              <span>🌿</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-emerald-400/90 mt-2 font-medium bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-900">
              {SCENARIO.context}
            </p>
          </div>

          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wide bg-amber-950 text-amber-400 border border-amber-700 px-2 py-0.5 rounded-md">Curiosity Discovery Hook</span>
              <span className="text-xs text-slate-400">Non-graded initial inquiry</span>
            </div>
            <p className="text-base font-semibold text-white mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-3.5 text-left rounded-xl text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-semibold'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/90 hover:bg-slate-755 border-slate-700 text-slate-200'
                  }`}
                  aria-label={`Discovery option ${i + 1}: ${opt}`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-mono bg-slate-950 px-2 py-0.5 rounded text-slate-400">{String.fromCharCode(65 + i)}</span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <p className={`text-sm mb-3 ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! Spindle microtubules shorten and depolymerise at kinetochores.' : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/40 flex items-center gap-2"
                  aria-label="Proceed to interactive exploration"
                >
                  <span>Launch Interactive Laboratory</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (Brilliant.org Core) ���── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Exploration Navigation Tabs */}
          <div className="flex items-center justify-between bg-slate-900 p-2 rounded-2xl border border-slate-800 overflow-x-auto">
            <div className="flex items-center gap-1">
              {EXPLORATION_STEPS.map((step, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCurrentSlide(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    currentSlide === idx
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                  aria-label={`Go to exploration step ${idx + 1}`}
                >
                  Step {idx + 1}
                </motion.button>
              ))}
            </div>
            <span className="text-xs font-mono text-slate-400 px-3">
              {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div>
                <h3 className="text-lg font-extrabold text-emerald-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-xs md:text-sm text-amber-300 font-medium mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ─── SLIDE 0: MITOSIS DETAILED STAGES ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-400">Phase Slider:</span>
                    {['Prophase', 'Metaphase', 'Anaphase', 'Telophase'].map((name, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMitosisStageChange(idx)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          mitosisStage === idx ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                        }`}
                        aria-label={`Select mitosis phase ${name}`}
                      >
                        {name}
                      </motion.button>
                    ))}
                  </div>

                  {/* Interactive Mitosis SVG Diagram */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 500 260" className="w-full max-w-xl h-56">
                      <defs>
                        <linearGradient id="cellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#064e3b" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
                        </linearGradient>
                      </defs>

                      {/* Cell Outline */}
                      {mitosisStage === 3 ? (
                        // Telophase Cleavage Furrow / Cell Plate
                        <g>
                          <ellipse cx="160" cy="130" rx="120" ry="90" fill="url(#cellGrad)" stroke="#10b981" strokeWidth="2.5" />
                          <ellipse cx="340" cy="130" rx="120" ry="90" fill="url(#cellGrad)" stroke="#10b981" strokeWidth="2.5" />
                          <line x1="250" y1="50" x2="250" y2="210" stroke="#fbbf24" strokeWidth="3" strokeDasharray="4 3" />
                          <text x="250" y="40" fill="#fbbf24" fontSize="10" textAnchor="middle" fontWeight="bold">Plant Cell Plate / Middle Lamella</text>
                        </g>
                      ) : (
                        <ellipse cx="250" cy="130" rx="210" ry="105" fill="url(#cellGrad)" stroke="#10b981" strokeWidth="2.5" />
                      )}

                      {/* Centrosomes / Microtubule Organising Poles */}
                      <circle cx="70" cy="130" r="8" fill="#6366f1" />
                      <circle cx="430" cy="130" r="8" fill="#6366f1" />
                      <text x="70" y="112" fill="#a5b4fc" fontSize="9" textAnchor="middle">Pole A</text>
                      <text x="430" y="112" fill="#a5b4fc" fontSize="9" textAnchor="middle">Pole B</text>

                      {/* Spindle Fibres */}
                      {mitosisStage === 0 && (
                        <g stroke="#6366f1" strokeWidth="1" strokeDasharray="3 3" opacity="0.6">
                          <line x1="70" y1="130" x2="200" y2="90" />
                          <line x1="70" y1="130" x2="220" y2="170" />
                          <line x1="430" y1="130" x2="300" y2="90" />
                          <line x1="430" y1="130" x2="280" y2="170" />
                          <text x="250" y="130" fill="#cbd5e1" fontSize="11" textAnchor="middle">Prophase: Chromatin condensing into sister chromatids</text>
                        </g>
                      )}

                      {mitosisStage === 1 && (
                        <g>
                          {/* Metaphase Spindle Lines */}
                          <line x1="70" y1="130" x2="250" y2="80" stroke="#6366f1" strokeWidth="1.5" />
                          <line x1="70" y1="130" x2="250" y2="130" stroke="#6366f1" strokeWidth="1.5" />
                          <line x1="70" y1="130" x2="250" y2="180" stroke="#6366f1" strokeWidth="1.5" />
                          <line x1="430" y1="130" x2="250" y2="80" stroke="#6366f1" strokeWidth="1.5" />
                          <line x1="430" y1="130" x2="250" y2="130" stroke="#6366f1" strokeWidth="1.5" />
                          <line x1="430" y1="130" x2="250" y2="180" stroke="#6366f1" strokeWidth="1.5" />

                          {/* Chromosomes Aligned on Equatorial Plate */}
                          {[80, 130, 180].map((y, idx) => (
                            <g key={idx}>
                              <rect x="242" y={y - 14} width="16" height="28" rx="4" fill="#f43f5e" stroke="#fff" strokeWidth="1.5" />
                              <circle cx="250" cy={y} r="3.5" fill="#fbbf24" />
                            </g>
                          ))}
                          <line x1="250" y1="35" x2="250" y2="225" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="3 3" />
                          <text x="250" y="30" fill="#ec4899" fontSize="10" textAnchor="middle" fontWeight="bold">Equatorial Metaphase Plate</text>
                        </g>
                      )}

                      {mitosisStage === 2 && (
                        <g>
                          {/* Anaphase Pulling */}
                          <line x1="70" y1="130" x2="160" y2="80" stroke="#6366f1" strokeWidth="1.5" />
                          <line x1="70" y1="130" x2="160" y2="130" stroke="#6366f1" strokeWidth="1.5" />
                          <line x1="70" y1="130" x2="160" y2="180" stroke="#6366f1" strokeWidth="1.5" />
                          <line x1="430" y1="130" x2="340" y2="80" stroke="#6366f1" strokeWidth="1.5" />
                          <line x1="430" y1="130" x2="340" y2="130" stroke="#6366f1" strokeWidth="1.5" />
                          <line x1="430" y1="130" x2="340" y2="180" stroke="#6366f1" strokeWidth="1.5" />

                          {/* V-shaped daughter chromosomes migrating */}
                          {[80, 130, 180].map((y, idx) => (
                            <g key={idx}>
                              <path d={`M 170 ${y - 10} L 155 ${y} L 170 ${y + 10}`} stroke="#f43f5e" strokeWidth="4" fill="none" strokeLinecap="round" />
                              <path d={`M 330 ${y - 10} L 345 ${y} L 330 ${y + 10}`} stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinecap="round" />
                            </g>
                          ))}
                          <text x="250" y="130" fill="#fbbf24" fontSize="11" textAnchor="middle" fontWeight="bold">
                            Centromeres split! Microtubules depolymerise & pull
                          </text>
                        </g>
                      )}

                      {mitosisStage === 3 && (
                        <g>
                          {/* Telophase Nuclei */}
                          <circle cx="160" cy="130" r="35" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
                          <circle cx="340" cy="130" r="35" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
                          <text x="160" y="134" fill="#38bdf8" fontSize="10" textAnchor="middle">2n Nucleus A</text>
                          <text x="340" y="134" fill="#38bdf8" fontSize="10" textAnchor="middle">2n Nucleus B</text>
                        </g>
                      )}
                    </svg>

                    <div className="w-full mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs">
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block">Equational Division</span>
                        <span className="text-emerald-400 font-bold">2n → 2n (Identical)</span>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block">Centromere Status</span>
                        <span className="text-amber-400 font-bold">{mitosisStage >= 2 ? 'Split into 2' : 'Single Centromere'}</span>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block">Plant vs Animal</span>
                        <span className="text-gold-400 font-bold">Anastral (No Asters)</span>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block">Key Purpose</span>
                        <span className="text-purple-400 font-bold">Growth & Tissue Repair</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 1: MEIOSIS & PACHYTENE CROSSING OVER ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-300">
                      Sub-stages: <b>Leptotene</b> → <b>Zygotene (Synapsis)</b> → <b className="text-emerald-400">Pachytene (Crossing Over)</b> → <b>Diplotene (Chiasmata)</b> → <b>Diakinesis</b>
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleChiasmaToggle}
                      className="px-4 py-1.5 bg-gold-600 hover:bg-gold-500 text-white rounded-lg text-xs font-bold"
                      aria-label="Trigger crossing over animation"
                    >
                      {chiasmaClicked ? 'Revert Recombination' : 'Trigger Crossing Over at Chiasma'}
                    </motion.button>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 450 180" className="w-full max-w-lg h-44">
                      {/* Homologue 1 (Maternal - Magenta) */}
                      <path d="M 120 40 Q 225 60 225 90 Q 225 120 120 140" stroke="#ec4899" strokeWidth="12" fill="none" strokeLinecap="round" />
                      <path d="M 100 40 Q 200 60 200 90 Q 200 120 100 140" stroke="#ec4899" strokeWidth="12" fill="none" strokeLinecap="round" />

                      {/* Homologue 2 (Paternal - Cyan) */}
                      <path d="M 330 40 Q 225 60 225 90 Q 225 120 330 140" stroke="#06b6d4" strokeWidth="12" fill="none" strokeLinecap="round" />
                      <path d="M 350 40 Q 250 60 250 90 Q 250 120 350 140" stroke="#06b6d4" strokeWidth="12" fill="none" strokeLinecap="round" />

                      {/* Recombination Swapped Tips if Clicked */}
                      {chiasmaClicked && (
                        <g>
                          <circle cx="225" cy="90" r="14" fill="none" stroke="#fbbf24" strokeWidth="3" strokeDasharray="3 2" />
                          <text x="225" y="118" fill="#fbbf24" fontSize="10" textAnchor="middle" fontWeight="bold">Chiasma (Recombination Nodule)</text>
                          {/* Swapped Segments */}
                          <line x1="120" y1="140" x2="140" y2="135" stroke="#06b6d4" strokeWidth="12" strokeLinecap="round" />
                          <line x1="330" y1="140" x2="310" y2="135" stroke="#ec4899" strokeWidth="12" strokeLinecap="round" />
                        </g>
                      )}

                      <text x="110" y="25" fill="#ec4899" fontSize="10" fontWeight="bold">Maternal Homologue</text>
                      <text x="340" y="25" fill="#06b6d4" fontSize="10" fontWeight="bold">Paternal Homologue</text>
                    </svg>

                    <p className="text-xs text-slate-300 text-center mt-2 max-w-md">
                      {chiasmaClicked
                        ? '✨ Non-sister chromatids have exchanged homologous alleles, creating unique recombinant chromosomes responsible for offspring variation!'
                        : 'Click the button above to observe genetic exchange at the chiasmata during Pachytene.'}
                    </p>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: PHOTOSYSTEMS & PHOTOPHOSPHORYLATION ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-300">Photophosphorylation Circuit:</span>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handlePhotophosphoToggle('non-cyclic')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          photophosphoType === 'non-cyclic' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                        aria-label="Select non-cyclic photophosphorylation"
                      >
                        Non-Cyclic (Z-Scheme)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handlePhotophosphoToggle('cyclic')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          photophosphoType === 'cyclic' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                        aria-label="Select cyclic photophosphorylation"
                      >
                        Cyclic (PS I only)
                      </motion.button>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 520 220" className="w-full max-w-xl h-52">
                      {/* Thylakoid Membrane */}
                      <rect x="20" y="160" width="480" height="40" rx="8" fill="#1e293b" stroke="#334155" />
                      <text x="40" y="185" fill="#64748b" fontSize="10">Thylakoid Membrane</text>

                      {/* PS II */}
                      <rect x="90" y="100" width="70" height="70" rx="12" fill={photophosphoType === 'non-cyclic' ? '#10b981' : '#334155'} stroke="#fff" strokeWidth="1.5" />
                      <text x="125" y="132" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">PS II</text>
                      <text x="125" y="148" fill="#d1fae5" fontSize="9" textAnchor="middle">P680</text>

                      {/* Water Splitting Complex */}
                      {photophosphoType === 'non-cyclic' && (
                        <g>
                          <circle cx="125" cy="190" r="14" fill="#0284c7" />
                          <text x="125" y="193" fill="#fff" fontSize="8" textAnchor="middle" fontWeight="bold">H2O Split</text>
                          <path d="M 125 176 L 125 170" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />
                          <text x="125" y="215" fill="#38bdf8" fontSize="9" textAnchor="middle">H2O → 2H+ + 2e- + ½O2</text>
                        </g>
                      )}

                      {/* Cyt b6f Complex */}
                      <rect x="220" y="90" width="60" height="80" rx="8" fill="#475569" stroke="#94a3b8" />
                      <text x="250" y="125" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">Cyt b6f</text>
                      <text x="250" y="140" fill="#facc15" fontSize="8" textAnchor="middle">H+ Pump</text>

                      {/* PS I */}
                      <rect x="340" y="80" width="70" height="90" rx="12" fill="#8b5cf6" stroke="#fff" strokeWidth="1.5" />
                      <text x="375" y="120" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">PS I</text>
                      <text x="375" y="136" fill="#ede9fe" fontSize="9" textAnchor="middle">P700</text>

                      {/* Electron Pathways */}
                      {photophosphoType === 'non-cyclic' ? (
                        <g>
                          {/* Z-Scheme Lines */}
                          <path d="M 125 100 L 125 40 L 220 90 L 280 120 L 375 80 L 375 30 L 450 50" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="5 3" />
                          <circle cx="450" cy="50" r="16" fill="#059669" />
                          <text x="450" y="53" fill="#fff" fontSize="8" textAnchor="middle" fontWeight="bold">NADPH</text>
                          <text x="250" y="30" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">Z-Scheme: Linear Electron Flow</text>
                        </g>
                      ) : (
                        <g>
                          {/* Cyclic Loop */}
                          <path d="M 375 80 L 375 35 L 250 40 L 250 90 L 340 120" fill="none" stroke="#a855f7" strokeWidth="3" strokeDasharray="4 3" />
                          <text x="310" y="25" fill="#c084fc" fontSize="10" fontWeight="bold" textAnchor="middle">Cyclic Electron Loop (PS I → Fd → Cyt b6f → PC → PS I)</text>
                        </g>
                      )}

                      {/* ATP Synthase */}
                      <rect x="440" y="120" width="45" height="55" rx="6" fill="#ea580c" />
                      <text x="462" y="145" fill="#fff" fontSize="8" textAnchor="middle" fontWeight="bold">ATP Synth</text>
                      <text x="462" y="160" fill="#fef08a" fontSize="7" textAnchor="middle">CF0-CF1</text>
                    </svg>

                    <div className="w-full grid grid-cols-3 gap-2 mt-2 text-center text-xs">
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block">ATP Formed?</span>
                        <span className="text-emerald-400 font-bold">YES (Both)</span>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block">NADPH Formed?</span>
                        <span className="text-amber-400 font-bold">{photophosphoType === 'non-cyclic' ? 'YES (PS I Fd)' : 'NO (Cyclic)'}</span>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block">Oxygen (O2) Released?</span>
                        <span className="text-gold-400 font-bold">{photophosphoType === 'non-cyclic' ? 'YES (Photolysis)' : 'NO'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 3: C4 KRANZ ANATOMY & PHOTORESPIRATION ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {/* Predict-then-check container */}
                  {!predictionMade && (
                    <div className="p-3 bg-gold-950/70 border border-gold-800 rounded-xl">
                      <p className="text-xs md:text-sm font-semibold text-gold-200 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="w-full text-left p-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs text-slate-300 border border-slate-800"
                            aria-label={`Prediction option ${i + 1}`}
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Temperature: {tempC4}°C</span>
                        <span className={tempC4 > 32 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                          {tempC4 > 32 ? 'High Heat Stress' : 'Optimal'}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={15}
                        max={45}
                        value={tempC4}
                        onChange={(e) => handleTempC4Change(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                        aria-label="Adjust temperature for C4 and C3 comparison"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Light Intensity: {lightIntensity}%</span>
                        <span className="text-amber-400 font-bold">{lightIntensity > 70 ? 'High Solar' : 'Moderate'}</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={lightIntensity}
                        onChange={(e) => setLightIntensity(Number(e.target.value))}
                        className="w-full accent-amber-500"
                        aria-label="Adjust light intensity"
                      />
                    </div>
                  </div>

                  {/* Kranz Anatomy Two-Cell SVG */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 500 200" className="w-full max-w-xl h-48 mx-auto">
                      {/* Mesophyll Cell */}
                      <rect x="20" y="30" width="210" height="150" rx="16" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                      <text x="125" y="55" fill="#a7f3d0" fontSize="12" fontWeight="bold" textAnchor="middle">Mesophyll Cell</text>
                      <text x="125" y="75" fill="#cbd5e1" fontSize="9" textAnchor="middle">CO2 + PEP (3C) → Oxaloacetate (4C)</text>
                      <rect x="55" y="90" width="140" height="25" rx="6" fill="#047857" />
                      <text x="125" y="107" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">Enzyme: PEP Carboxylase</text>
                      <text x="125" y="130" fill="#facc15" fontSize="8" textAnchor="middle">Malate (4C) synthesized</text>

                      {/* Plasmodesmata Bridge */}
                      <path d="M 230 100 L 270 100" stroke="#f59e0b" strokeWidth="6" strokeDasharray="4 2" />
                      <text x="250" y="90" fill="#fbbf24" fontSize="8" textAnchor="middle" fontWeight="bold">Malate 4C</text>
                      <path d="M 270 140 L 230 140" stroke="#94a3b8" strokeWidth="4" strokeDasharray="3 2" />
                      <text x="250" y="155" fill="#cbd5e1" fontSize="8" textAnchor="middle">Pyruvate 3C</text>

                      {/* Bundle Sheath Cell (Kranz Wreath) */}
                      <rect x="270" y="30" width="210" height="150" rx="16" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2.5" />
                      <text x="375" y="55" fill="#c7d2fe" fontSize="12" fontWeight="bold" textAnchor="middle">Bundle Sheath Cell</text>
                      <text x="375" y="75" fill="#e0e7ff" fontSize="9" textAnchor="middle">Malate decarboxylated → High CO2</text>
                      <rect x="305" y="90" width="140" height="25" rx="6" fill="#4338ca" />
                      <text x="375" y="107" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">Enzyme: RuBisCO (Calvin Cycle)</text>
                      <text x="375" y="130" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">Sugar / Starch exported</text>
                    </svg>

                    {/* Dynamic Photorespiration vs C4 Yield Gauges */}
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">C3 Photorespiratory Loss:</span>
                          <span className="text-rose-400 font-bold">{Math.min(50, Math.round((tempC4 - 15) * 1.6))}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                          <motion.div
                            className="bg-rose-500 h-full rounded-full"
                            animate={{ width: `${Math.min(100, (tempC4 - 15) * 3.3)}%` }}
                          />
                        </div>
                      </div>

                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">C4 Net Photosynthetic Rate:</span>
                          <span className="text-emerald-400 font-bold">{Math.round(lightIntensity * 0.9)} mg CO2/dm²/h</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                          <motion.div
                            className="bg-emerald-500 h-full rounded-full"
                            animate={{ width: `${lightIntensity}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: CELLULAR RESPIRATION & TCA CYCLE ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-300">Oxygen Supply: {respirationOxygen}%</span>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={respirationOxygen}
                      onChange={(e) => handleRespirationOxygenChange(Number(e.target.value))}
                      className="w-48 accent-gold-500"
                      aria-label="Adjust cellular oxygen percentage"
                    />
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                      respirationOxygen > 30 ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}>
                      {respirationOxygen > 30 ? 'Aerobic TCA' : 'Anaerobic Fermentation'}
                    </span>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 500 210" className="w-full max-w-xl h-52">
                      {/* Cytoplasm Zone */}
                      <rect x="20" y="20" width="200" height="170" rx="12" fill="#1e293b" stroke="#475569" />
                      <text x="120" y="42" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Cytoplasm (Glycolysis)</text>
                      <text x="120" y="65" fill="#fff" fontSize="9" textAnchor="middle">Glucose (6C) → 2 Pyruvate (3C)</text>
                      <text x="120" y="85" fill="#4ade80" fontSize="9" fontWeight="bold" textAnchor="middle">Net +2 ATP, +2 NADH</text>

                      {respirationOxygen <= 30 ? (
                        <g>
                          <rect x="40" y="110" width="160" height="60" rx="8" fill="#881337" stroke="#f43f5e" />
                          <text x="120" y="132" fill="#fecdd3" fontSize="10" fontWeight="bold" textAnchor="middle">Fermentation Active</text>
                          <text x="120" y="150" fill="#fff" fontSize="8" textAnchor="middle">Lactate / Ethanol + CO2</text>
                          <text x="120" y="162" fill="#facc15" fontSize="8" textAnchor="middle">NADH → NAD+ Recycled</text>
                        </g>
                      ) : (
                        <g>
                          {/* Arrow into Mitochondrion */}
                          <path d="M 220 100 L 260 100" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
                          <text x="240" y="90" fill="#38bdf8" fontSize="8" textAnchor="middle">Link Rxn</text>
                        </g>
                      )}

                      {/* Mitochondrial Matrix Zone */}
                      <rect x="260" y="20" width="220" height="170" rx="16" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
                      <text x="370" y="42" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">Mitochondrial Matrix (TCA Cycle)</text>

                      {/* Rotating Krebs Wheel SVG */}
                      <circle cx="370" cy="115" r="45" fill="none" stroke="#6366f1" strokeWidth="3" strokeDasharray="6 3" />
                      <text x="370" y="112" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">Krebs TCA</text>
                      <text x="370" y="125" fill="#e2e8f0" fontSize="8" textAnchor="middle">6 NADH, 2 FADH2</text>
                      <text x="370" y="137" fill="#4ade80" fontSize="8" textAnchor="middle">2 ATP + 4 CO2</text>

                      <circle cx="370" cy="70" r="5" fill="#f43f5e" />
                      <text x="370" y="63" fill="#fda4af" fontSize="7" textAnchor="middle">Citrate 6C</text>
                      <circle cx="415" cy="115" r="5" fill="#f43f5e" />
                      <text x="440" y="118" fill="#fda4af" fontSize="7">a-KG 5C</text>
                      <circle cx="370" cy="160" r="5" fill="#f43f5e" />
                      <text x="370" y="174" fill="#fda4af" fontSize="7" textAnchor="middle">Succinate 4C</text>
                      <circle cx="325" cy="115" r="5" fill="#f43f5e" />
                      <text x="300" y="118" fill="#fda4af" fontSize="7">OAA 4C</text>
                    </svg>

                    <div className="w-full mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs">
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block">Total ATP/Glucose</span>
                        <span className="text-emerald-400 font-bold">{respirationOxygen > 30 ? '~36-38 ATP' : 'Only 2 ATP'}</span>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block">CO2 Released</span>
                        <span className="text-amber-400 font-bold">{respirationOxygen > 30 ? '6 CO2 (Total)' : '2 CO2 or 0 CO2'}</span>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block">Location</span>
                        <span className="text-gold-400 font-bold">{respirationOxygen > 30 ? 'Matrix + Cristae' : 'Cytoplasm Only'}</span>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block">TCA Nature</span>
                        <span className="text-purple-400 font-bold">Amphibolic Hub</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Exploration Step Controls */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold disabled:opacity-40"
                  aria-label="Previous exploration step"
                >
                  ← Previous Lab
                </motion.button>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-md shadow-emerald-950"
                    aria-label="Next exploration step"
                  >
                    <span>Next Lab</span>
                    <span>→</span>
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-extrabold flex items-center gap-1 shadow-lg shadow-gold-950"
                    aria-label="Open sandbox mode"
                  >
                    <span>Enter Free Sandbox</span>
                    <span>→</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gold-300">🧪 Bioenergetics & Cytology Sandbox</h3>
              <p className="text-xs text-slate-400 mt-0.5">Manipulate environmental and mitotic parameters without test pressure.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-950"
              aria-label="Ready for challenges"
            >
              Start Challenges →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Mitosis Controls</span>
              <div className="grid grid-cols-2 gap-1.5">
                {['Prophase', 'Metaphase', 'Anaphase', 'Telophase'].map((name, i) => (
                  <button
                    key={i}
                    onClick={() => setMitosisStage(i)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold ${mitosisStage === i ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                  >
                    {name}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Stage {mitosisStage + 1}: {mitosisStage === 0 ? 'Packing DNA' : mitosisStage === 1 ? 'Equatorial Alignment' : mitosisStage === 2 ? 'Poleward Disjunction' : 'Reforming Nuclei'}
              </p>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Photosynthesis Variables</span>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Temperature: {tempC4}°C</label>
                <input type="range" min={10} max={45} value={tempC4} onChange={(e) => setTempC4(Number(e.target.value))} className="w-full accent-amber-500" />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Light Flux: {lightIntensity}%</label>
                <input type="range" min={10} max={100} value={lightIntensity} onChange={(e) => setLightIntensity(Number(e.target.value))} className="w-full accent-amber-500" />
              </div>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">Respiration & Oxygen</span>
              <div>
                <label className="text-xs text-slate-400 block mb-1">O2 Saturation: {respirationOxygen}%</label>
                <input type="range" min={0} max={100} value={respirationOxygen} onChange={(e) => setRespirationOxygen(Number(e.target.value))} className="w-full accent-purple-500" />
              </div>
              <div className="p-2 bg-slate-950 rounded-lg text-xs text-slate-300">
                Path: <b className="text-purple-300">{respirationOxygen > 30 ? 'Aerobic TCA Matrix' : 'Cytosolic Fermentation'}</b>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE MODE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Animated Top Particle & Status Canvas */}
          <canvas ref={canvasRef} width={600} height={50} className="w-full h-12 bg-slate-950 rounded-xl border border-slate-800" />

          {/* Progress & Difficulty Header */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  Node: {challenge.nodeId}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gold-950 text-gold-300 border border-gold-800 uppercase">
                  NEP: {challenge.competencyLevel}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400">Score: {scoreBreakdown.correct}/{scoreBreakdown.total}</span>
              <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
                <motion.div
                  className="bg-emerald-500 h-full rounded-full"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Challenge Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-600 shadow-lg shadow-rose-950'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <p className="text-base font-bold text-white mb-4 leading-relaxed">{challenge.question}</p>

            {/* MCQ / Classification Options */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-semibold'
                        : wrongFlash
                        ? 'bg-rose-900/60 border-rose-500 text-rose-200'
                        : 'bg-slate-800 hover:bg-slate-755 border-slate-700 text-slate-200'
                    }`}
                    aria-label={`Option ${i + 1}: ${opt}`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-xs font-mono bg-slate-950 px-2 py-0.5 rounded text-slate-400">{String.fromCharCode(65 + i)}</span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-and-Drop Labeling Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag Labels onto Target Boxes:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-600 hover:bg-gold-500 text-white rounded-lg text-xs font-bold cursor-grab shadow"
                      role="button"
                      aria-label={`Draggable label ${item.label}`}
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {challenge.dragItems.map((item, idx) => (
                    <div
                      key={idx}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      className="p-3 bg-slate-950 border-2 border-dashed border-slate-700 rounded-xl text-center min-h-[75px] flex flex-col justify-center items-center"
                    >
                      <span className="text-xs text-slate-500 mb-1">Zone: {item.targetId.replace('target_', '')}</span>
                      <span className={`text-xs font-bold ${droppedLabels[item.targetId] ? 'text-emerald-400' : 'text-slate-600'}`}>
                        {droppedLabels[item.targetId] || '[ Drop Here ]'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                  aria-label="Verify drag and drop labels"
                >
                  Verify All Targets
                </motion.button>
              </div>
            )}

            {/* Drag-and-Drop Sorting Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 block">Drag or Click to Reorder Chronologically:</span>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => setDraggedItem(String(i))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, i);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center justify-between"
                      role="button"
                      aria-label={`Sort item ${i + 1}: ${item}`}
                    >
                      <span><b>{i + 1}.</b> {item}</span>
                      <span className="text-slate-500 font-mono">↕</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                  aria-label="Submit sorted order"
                >
                  Check Sequence Order
                </motion.button>
              </div>
            )}

            {/* Numeric Input Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated number"
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48 focus:border-emerald-500 outline-none"
                    aria-label="Numeric calculation answer"
                  />
                  <span className="text-xs text-slate-400 font-semibold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                    aria-label="Submit numeric answer"
                  >
                    Check Value
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Pathway Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-bold text-slate-200"
                      aria-label={`Add part ${part}`}
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-2.5 py-1 bg-gold-900 border border-gold-700 text-gold-200 rounded-md text-xs flex items-center gap-1"
                    >
                      <span>{part}</span>
                      <button onClick={() => setConstructParts(p => p.filter((_, i) => i !== idx))} className="text-rose-400 font-bold ml-1">✕</button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600 italic">Click parts above in order to assemble...</span>}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={constructParts.length === 0 || showExplanation}
                    className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                    aria-label="Verify assembled construct"
                  >
                    Verify Construct
                  </motion.button>
                  <button onClick={() => setConstructParts([])} className="px-3 py-2 bg-slate-800 text-slate-400 rounded-xl text-xs font-bold">Clear</button>
                </div>
              </div>
            )}

            {/* Step-by-Step Click-to-Reveal Explanation */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 bg-emerald-950/40 border border-emerald-700 rounded-2xl space-y-3">
                <h4 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">ISC Detailed Biological Walkthrough:</h4>
                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                  <motion.p key={idx} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-xs md:text-sm text-slate-200 leading-relaxed">
                    <span className="font-bold text-emerald-400">{idx + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                      aria-label="Reveal next step of explanation"
                    >
                      Show Next Detail →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-emerald-950"
                      aria-label="Advance to next challenge"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mastery Assessment →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD REPORT ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-r from-emerald-950 via-slate-900 to-gold-950 rounded-3xl border border-emerald-700 text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-black text-white">🏆 Module Mastered!</h2>
            <p className="text-sm text-emerald-300 font-medium">Class 11 ISC Biology: Mitosis, Meiosis & Plant-Cell Bioenergetics</p>
            <div className="flex justify-center gap-6 pt-2">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-center min-w-[100px]">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-xl font-black text-emerald-400">{Math.max(0, 100 - errors * 4)}%</span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-center min-w-[100px]">
                <span className="text-xs text-slate-400 block">BKT Mastery</span>
                <span className="text-xl font-black text-gold-400 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-center">
            <h3 className="text-lg font-black text-emerald-400 mb-1">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
              {errors === 0
                ? '🌟 Flawless Mastery! You demonstrated exceptional cytological precision and metabolic bookkeeping across all 10 syllabus nodes.'
                : errors <= 3
                ? '👏 Outstanding performance! Your grasp of photosynthesis Z-schemes and meiosis sub-stages is highly competent.'
                : errors <= 7
                ? '💪 Solid effort! Review the misconception diagnostics below to fortify your board exam terminology.'
                : '🚀 Keep practicing! Review the detailed steps and hints to conquer these core biological cycles.'}
            </p>
          </div>

          {/* ─── PROMINENT SPACED REPETITION (SRS) SCHEDULE VISIBILITY ─── */}
          <div className="p-5 bg-gradient-to-br from-amber-950/60 via-slate-900 to-gold-950/60 rounded-2xl border-2 border-amber-600/80 shadow-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">📅</span>
                <div>
                  <h3 className="text-sm md:text-base font-extrabold text-amber-300">Spaced Repetition Schedule (SuperMemo SM-2)</h3>
                  <p className="text-xs text-slate-400">Optimised memory consolidation based on error frequency</p>
                </div>
              </div>
              <div className={`px-4 py-1.5 rounded-xl font-black text-sm uppercase tracking-wider border shadow-md ${
                errors === 0
                  ? 'bg-emerald-900/80 border-emerald-400 text-emerald-200'
                  : errors <= 3
                  ? 'bg-amber-900/80 border-amber-400 text-amber-200'
                  : 'bg-rose-900/80 border-rose-400 text-rose-200'
              }`}>
                {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
              <div className={`p-3 rounded-xl border text-center ${
                errors === 0 ? 'bg-emerald-950/80 border-emerald-500 ring-2 ring-emerald-500/30' : 'bg-slate-950/60 border-slate-800 opacity-60'
              }`}>
                <span className="text-xs text-slate-400 block font-semibold">0 Errors (Mastery)</span>
                <span className="text-sm font-black text-emerald-400">Review in 7 days</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Long-term interval retention</span>
              </div>

              <div className={`p-3 rounded-xl border text-center ${
                errors >= 1 && errors <= 3 ? 'bg-amber-950/80 border-amber-500 ring-2 ring-amber-500/30' : 'bg-slate-950/60 border-slate-800 opacity-60'
              }`}>
                <span className="text-xs text-slate-400 block font-semibold">1–3 Errors (Solid)</span>
                <span className="text-sm font-black text-amber-400">Review in 3 days</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Reinforce pathways & enzymes</span>
              </div>

              <div className={`p-3 rounded-xl border text-center ${
                errors >= 4 ? 'bg-rose-950/80 border-rose-500 ring-2 ring-rose-500/30' : 'bg-slate-950/60 border-slate-800 opacity-60'
              }`}>
                <span className="text-xs text-slate-400 block font-semibold">4+ Errors (Needs Drill)</span>
                <span className="text-sm font-black text-rose-400">Review in 1 day</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Rapid recall reactivation</span>
              </div>
            </div>

            <p className="text-xs text-amber-200/90 font-medium bg-slate-950/80 p-2.5 rounded-xl border border-amber-900/50">
              ⚡ <b>Next Scheduled Session:</b> This module has been registered in your active retrieval queue. Returning at your recommended interval ensures 90%+ long-term retention for board exams!
            </p>
          </div>

          {/* Reflection Section */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span>🤔</span> Post-Simulation Reflection & Metacognition
            </h3>
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
                <p className="text-xs font-bold text-emerald-400 mb-1">1. What was the most surprising thing you learned?</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Reflect on how three different organelles (chloroplast, peroxisome, mitochondrion) must cooperate in the photorespiratory salvage pathway, or how non-cyclic electron transport splits water to release oxygen.
                </p>
              </div>
              <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
                <p className="text-xs font-bold text-gold-400 mb-1">2. How would you explain this to a friend?</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Try summarizing how C4 Kranz anatomy functions like a physical turbo-charger that pumps CO2 directly to RuBisCO to eliminate oxygen interference during high tropical heat.
                </p>
              </div>
              <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
                <p className="text-xs font-bold text-amber-400 mb-1">3. Where in real life might you use this?</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  From boosting crop yield under climate change to optimizing yeast fermentation in industrial brewing and tea manufacturing, these core pathways dictate modern agricultural bioengineering.
                </p>
              </div>
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-300">Your Diagnostic Misconception Profile:</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950/80 rounded-xl border border-rose-900 text-xs space-y-1">
                    <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                    <p className="text-emerald-400 font-medium">✓ Board Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real-World Agronomy Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <span>☕</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="p-2 bg-slate-950 rounded-lg border border-slate-850">{step}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Demonstrated!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export { C11_BiologyMitosisdetailedStagesSim };
export default C11_BiologyMitosisdetailedStagesSim;