'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// NODE IDS & TOPICS (32 ISC/CBSE BIOTECH NODES)
// ==========================================
const ALL_NODE_IDS = [
  'c12_bt_cbse_428', // Definition and Overview of Plant Tissue Culture
  'c12_bt_cbse_429', // Gottlieb Haberlandt: The Father of Plant Tissue Culture
  'c12_bt_cbse_430', // Historical Foundations: Cell Theory and Early Observations
  'c12_bt_cbse_431', // Timeline of Landmark Discoveries in Plant Tissue Culture (1902–2000s)
  'c12_bt_cbse_432', // Totipotency in Plant Cells
  'c12_bt_cbse_433', // Explant: Source Material for Tissue Culture
  'c12_bt_cbse_434', // Dedifferentiation and Redifferentiation in Organogenesis
  'c12_bt_cbse_435', // Organogenesis: Plant Regeneration via Organ Formation
  'c12_bt_cbse_436', // Somatic Embryogenesis: Embryo Formation from Somatic Cells
  'c12_bt_cbse_437', // Overview of Plant Tissue Culture Media and Its Components
  'c12_bt_cbse_438', // Macronutrients in Plant Tissue Culture Media
  'c12_bt_cbse_439', // Micronutrients in Plant Tissue Culture Media
  'c12_bt_cbse_440', // Organic Supplements in PTC Media: Amino Acids and Vitamins
  'c12_bt_cbse_441', // Carbon Sources for Plant Tissue Culture Media
  'c12_bt_cbse_442', // Gelling Agents and pH Control in PTC Media
  'c12_bt_cbse_443', // Overview of Plant Growth Hormones in PTC
  'c12_bt_cbse_444', // Auxins: Plant Growth Hormones in Tissue Culture
  'c12_bt_cbse_445', // Cytokinins and Kinetin in Plant Tissue Culture
  'c12_bt_cbse_446', // Auxin-Cytokinin Ratio Hypothesis for Organogenesis
  'c12_bt_cbse_447', // Gibberellins, Abscisic Acid, and Ethylene in PTC
  'c12_bt_cbse_448', // Antibiotics and Antifungal Agents in PTC Media
  'c12_bt_cbse_449', // Composition of White's and Murashige and Skoog (MS) Media
  'c12_bt_cbse_450', // Murashige and Skoog (MS) Medium
  'c12_bt_cbse_451', // Step-by-Step Laboratory Procedure for Plant Tissue Culture
  'c12_bt_cbse_452', // Synthetic Seed Production from Somatic Embryos
  'c12_bt_cbse_453', // Haploid and Double Haploid Production via Anther Culture
  'c12_bt_cbse_454', // Somatic Hybridization: Protoplast Fusion for Wide Hybrids
  'c12_bt_cbse_455', // Cybridization: Combining Nuclear and Cytoplasmic Genomes
  'c12_bt_cbse_456', // Production of Virus-Free Plants through Meristem Culture
  'c12_bt_cbse_457', // Somaclonal Variations: Genetic Variability from Tissue Culture
  'c12_bt_cbse_458', // Secondary Metabolite Production via Cell and Tissue Cultures
  'c12_bt_cbse_459', // Major Applications of Plant Cell and Tissue Culture
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// MANDATORY SECTION 1: SCENARIO
// ==========================================
const SCENARIO = {
  title: 'Advanced Plant Biotechnology & In Vitro Morphogenesis Laboratory',
  intro: 'Welcome to the Central Tissue Culture Facility. As Chief Biotechnologist, you are tasked with regenerating endangered medicinal plants, engineering stress-tolerant somatic hybrids, and producing anti-cancer secondary metabolites using cell suspension bioreactors.',
  context: 'In this simulation, you will master the principles of cellular totipotency, formulate Murashige & Skoog (MS) media, fine-tune Auxin to Cytokinin ratios for organogenesis, perform enzymatic protoplast fusion, create artificial synthetic seeds, and eliminate viral pathogens via apical meristem micro-dissection.',
};

// ==========================================
// MANDATORY SECTION 2: DISCOVERY_QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question: 'If an isolated mature carrot root parenchyma cell is cultured in a sterile nutrient solution lacking plant growth regulators (auxin and cytokinin), what will happen to the cell?',
  options: [
    'It will immediately undergo meiosis and produce haploid microspores.',
    'It will remain alive for some time, enlarge slightly, but will NEVER divide or undergo morphogenesis without hormonal signaling.',
    'It will spontaneously form shoot buds due to inherent cellular totipotency.',
    'It will instantly synthesize cellulose and form a somatic seed coat.',
  ],
  correctIndex: 1,
  hintAfter: 'Gottlieb Haberlandt (1902) first postulated cellular totipotency, but his early experiments failed because synthesized plant growth hormones like Auxin and Cytokinin were unknown at the time! Totipotency requires exogenous biochemical triggers to induce dedifferentiation.',
};

// ==========================================
// MANDATORY SECTION 3: EXPLORATION_STEPS
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Auxin-Cytokinin Organogenesis Regulator',
    instruction: 'Adjust the concentration of Auxin (2,4-D / NAA) and Cytokinin (BAP / Kinetin) to control explant morphogenesis: observe Callus formation, Rhizogenesis (roots), or Caulogenesis (shoots).',
    interactionType: 'auxin-cytokinin-ratio-slider',
    nodeId: 'c12_bt_cbse_446',
  },
  {
    title: 'Lab 2: Surface Sterilization & Aseptic Transfer Workflow',
    instruction: 'Execute a multi-stage sterilization protocol for leaf explants using Tween-20, Sodium Hypochlorite, and Sterile Water washes under a Laminar Air Flow cabinet.',
    interactionType: 'aseptic-sterilization-workflow',
    nodeId: 'c12_bt_cbse_451',
  },
  {
    title: 'Lab 3: Protoplast Fusion & Somatic Hybridization',
    instruction: 'Digest plant cell walls with Cellulase and Pectinase, then induce protoplast fusion between Potato and Tomato cells using Polyethylene Glycol (PEG 6000) or Electrofusion.',
    interactionType: 'protoplast-fusion-lab',
    nodeId: 'c12_bt_cbse_454',
  },
  {
    title: 'Lab 4: Virus Elimination & Synthetic Seed Encapsulation',
    instruction: 'Expose apical meristems under a stereomicroscope to eliminate potato virus X, and encapsulate somatic embryos in 3% Sodium Alginate dropwise into Calcium Chloride to form Synseeds.',
    interactionType: 'synseed-meristem-lab',
    nodeId: 'c12_bt_cbse_452',
  },
  {
    title: 'Lab 5: Bioreactor Secondary Metabolite Production',
    instruction: 'Optimize dissolved oxygen, sucrose carbon source, and methyl jasmonate elicitor concentration in a cell suspension culture to maximize Paclitaxel (Taxol) alkaloid yield.',
    interactionType: 'secondary-metabolite-bioreactor',
    nodeId: 'c12_bt_cbse_458',
  },
];

// ==========================================
// MANDATORY SECTION 4: PREDICTION_QUESTIONS
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What will occur to leaf disc explants cultured on MS medium containing 2.0 mg/L NAA (Auxin) and 0.02 mg/L BAP (Cytokinin)?',
    options: [
      'Profuse adventitious shoot bud formation will occur.',
      'Profuse adventitious root induction (rhizogenesis) and callus formation will occur.',
      'Immediate somatic embryo encapsulation without cell division.',
      'Complete cell lysis due to hormone toxicity.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Set Auxin to 2.0 mg/L and Cytokinin to 0.02 mg/L (High Auxin : Cytokinin ratio) in Lab 1 to verify root formation!',
    nodeId: 'c12_bt_cbse_446',
  },
  {
    question: 'Predict: Why does apical meristem culture successfully produce virus-free plants even when the mother plant is systemically infected with viruses?',
    options: [
      'Meristems contain high concentrations of synthetic penicillin antibiotics.',
      'Meristematic cells lack vascular tissue (xylem/phloem connections) and have rapid cell division rates that outpace viral replication.',
      'Meristems have thick cuticular waxes that block virus penetration.',
      'Viruses can only replicate in root tissue, never in shoot tips.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Isolate the 0.2 mm apical meristem dome in Lab 4 and test for viral RNA presence!',
    nodeId: 'c12_bt_cbse_456',
  },
];

// ==========================================
// MANDATORY SECTION 5: OBSERVATION_QUESTIONS
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the morphogenetic outcome when Auxin (NAA) and Cytokinin (BAP) are added in equal concentration (e.g., 1.0 mg/L each)?',
    observableOptions: [
      'The explant produces an undifferentiated, rapidly proliferating mass of parenchymatous cells called Callus.',
      'The explant directly produces flowers and mature seeds.',
      'The explant undergoes complete autolysis within 24 hours.',
      'Only lateral root branches form without any cell division in the explant core.',
    ],
    correctIndex: 0,
    nodeId: 'c12_bt_cbse_434',
  },
  {
    question: 'What happens during enzymatic protoplast isolation when plant tissues are treated with 1.5% Cellulase and 0.5% Pectinase in an isotonic 0.7 M Mannitol solution?',
    observableOptions: [
      'Cells burst immediately due to hypoosmotic shock.',
      'The pectin middle lamella and cellulose cell walls are digested, releasing spherical, membrane-bound protoplasts intact.',
      'Cells fuse instantly without any chemical fusogen.',
      'The cell walls become twice as thick due to enzyme crosslinking.',
    ],
    correctIndex: 1,
    nodeId: 'c12_bt_cbse_454',
  },
];

// ==========================================
// MANDATORY SECTION 6: REAL_WORLD_ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Commercial Micropropagation & Secondary Metabolite Industrial Batch Setup',
  description: 'Design a commercial plant tissue culture workflow to mass-produce 100,000 disease-free banana (*Musa acuminata*) plantlets and extract Shikonin from *Lithospermum erythrorhizon* suspension cultures.',
  steps: [
    'Step 1: Select healthy sword suckers and isolate 0.5 mm shoot apical meristems under laminar airflow.',
    'Step 2: Formulate 100 L of Murashige & Skoog (MS) liquid & semi-solid medium adjusted to pH 5.7 with 30 g/L sucrose and 0.8% agar.',
    'Step 3: Inoculate shoot tips into MS medium containing 4.5 mg/L BAP to achieve shoot multiplication rates of 5x per subculture cycle (30 days).',
    'Step 4: Transfer multiplied shoots to rooting medium with 1.0 mg/L IBA, followed by mist-chamber acclimatization (hardening) in soil:peat moss (1:1) with 95% survival yield.',
  ],
};

// ==========================================
// MISCONCEPTIONS (6 DETAILED ITEMS)
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    misconception: 'Totipotency means any plant cell can grow into a plant in plain water without nutrients.',
    correction: 'Totipotency is the genetic capacity of a living cell to regenerate an entire organism, but it REQUIRES exogenous carbon (sucrose), essential inorganic macro/micronutrients, vitamins, and precise hormone ratios to express that genetic program.',
    nodeId: 'c12_bt_cbse_432',
  },
  {
    id: 'misc_2',
    misconception: 'Callus is a tumorous cancer cell mass with permanent chromosomal damage.',
    correction: 'Callus is an unorganized mass of proliferating totipotent parenchymatous cells formed via dedifferentiation; it remains non-malignant and can redifferentiate into intact shoots and roots upon altering hormone ratios.',
    nodeId: 'c12_bt_cbse_434',
  },
  {
    id: 'misc_3',
    misconception: 'Somatic embryos and zygotic embryos are genetically different because somatic embryos lack seed coats.',
    correction: 'Somatic embryos are genetically identical clones of the parental somatic tissue. While natural seeds form via double fertilization in the ovule, somatic embryos develop directly from somatic cells via embryogenesis pathways, expressing similar bipolar (cotyledonary, hypocotyl, radicle) developmental stages.',
    nodeId: 'c12_bt_cbse_436',
  },
  {
    id: 'misc_4',
    misconception: 'Autoclaving media at 121°C for 15 minutes sterilizes all components, including heat-sensitive plant growth regulators like zeatin and gibberellins.',
    correction: 'Heat-labile substances like Gibberellic Acid (GA3), Zeatin, Thiamine, and certain antibiotics decompose under autoclaving and MUST be filter-sterilized using 0.22 µm membrane filters and added to autoclaved media cooled to ~50°C.',
    nodeId: 'c12_bt_cbse_442',
  },
  {
    id: 'misc_5',
    misconception: 'Somatic hybrids and Cybrids are identical engineered plants.',
    correction: 'Somatic hybrids contain nuclear genomes from BOTH parent cells along with mixed cytoplasm, whereas Cybrids (cytoplasmic hybrids) contain the nuclear genome of ONLY ONE parent combined with mitochondrial/chloroplast genomes from both parents.',
    nodeId: 'c12_bt_cbse_455',
  },
  {
    id: 'misc_6',
    misconception: 'Tissue culture plants are always 100% genetically uniform clones without any genetic variations.',
    correction: 'While tissue culture aims for clonal fidelity, prolonged callus culture, high hormone concentrations, and subculturing stress induce Somaclonal Variations—heritable genetic and epigenetic mutations useful for novel trait selection.',
    nodeId: 'c12_bt_cbse_457',
  },
];

// ==========================================
// DIAGNOSTIC QUESTIONS (8 ITEMS)
// ==========================================
const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    question: 'Who is recognized as the "Father of Plant Tissue Culture" for first postulating cell totipotency in 1902?',
    options: ['T. Murashige', 'Gottlieb Haberlandt', 'F.C. Steward', 'S. Guha and S.C. Maheshwari'],
    correctIndex: 1,
    explanation: 'Gottlieb Haberlandt postulated in 1902 that isolated vegetative plant cells could divide and grow into complete plants if supplied with proper nutrients.',
    nodeId: 'c12_bt_cbse_429',
  },
  {
    id: 'diag_2',
    question: 'Which carbon source is most universally utilized in Murashige and Skoog (MS) media at 3% (w/v) concentration?',
    options: ['Lactose', 'Sucrose', 'Starch', 'Glycerol'],
    correctIndex: 1,
    explanation: 'Sucrose (30 g/L or 3%) serves as the primary carbon and energy source as well as an osmotic agent in plant tissue culture media.',
    nodeId: 'c12_bt_cbse_441',
  },
  {
    id: 'diag_3',
    question: 'What phenomenon occurs when mature differentiated mesophyll cells regress to an undifferentiated meristematic callus state?',
    options: ['Redifferentiation', 'Dedifferentiation', 'Transdifferentiation', 'Senescence'],
    correctIndex: 1,
    explanation: 'Dedifferentiation is the loss of specialized structural/functional traits in mature cells, reverting them to an active dividing state (callus).',
    nodeId: 'c12_bt_cbse_434',
  },
  {
    id: 'diag_4',
    question: 'In the Skoog and Miller hypothesis, high Cytokinin to Auxin ratio leads to:',
    options: ['Rhizogenesis (Root formation)', 'Caulogenesis (Shoot formation)', 'Abscission', 'Dormancy'],
    correctIndex: 1,
    explanation: 'Skoog & Miller (1957) demonstrated that high cytokinin relative to auxin induces shoot bud morphogenesis (caulogenesis).',
    nodeId: 'c12_bt_cbse_446',
  },
  {
    id: 'diag_5',
    question: 'Which chemical agent is commonly used to encapsulate somatic embryos to produce synthetic seeds (synseeds)?',
    options: ['Polyethylene Glycol (PEG)', 'Sodium Alginate with Calcium Chloride', 'Merthiolate', 'Agarose gel'],
    correctIndex: 1,
    explanation: 'Synthetic seeds are produced by dropping somatic embryos suspended in 2–4% Sodium Alginate into a 100 mM CaCl2 solution to form protective Calcium Alginate beads.',
    nodeId: 'c12_bt_cbse_452',
  },
  {
    id: 'diag_6',
    question: 'Haploid plants were first produced through anther culture of *Datura innoxia* by which Indian botanists?',
    options: ['P. Maheshwari and B.M. Johri', 'S. Guha and S.C. Maheshwari', 'M.S. Swaminathan and R. Mishra', 'E.C. Cocking and Y.P.S. Bajaj'],
    correctIndex: 1,
    explanation: 'Sipra Guha and Satish C. Maheshwari (1964) landmarked haploid production via microspore/anther culture in *Datura innoxia*.',
    nodeId: 'c12_bt_cbse_453',
  },
  {
    id: 'diag_7',
    question: 'What fusogen reagent is used to induce plasma membrane fusion between protoplasts of two distinct plant species?',
    options: ['Sodium Lauryl Sulfate', 'Polyethylene Glycol (PEG 6000)', 'Formaldehyde', 'Ammonium Sulfate'],
    correctIndex: 1,
    explanation: 'PEG (Polyethylene Glycol) alters membrane surface charges and induces reversible membrane dehydration, facilitating protoplast agglutination and fusion.',
    nodeId: 'c12_bt_cbse_454',
  },
  {
    id: 'diag_8',
    question: 'Why is shoot tip meristem culture preferred for obtaining virus-free plants from infected stock?',
    options: ['Meristems lack viral receptors', 'High auxin levels degrade virus capsids', 'Meristems lack functional vascular tissues and possess rapid cell division rate', 'Viruses cannot withstand 25°C incubation'],
    correctIndex: 2,
    explanation: 'Vascular tissues (xylem/phloem) through which viruses travel systemically are absent in the apical dome, and meristem cell division outpaces viral replication.',
    nodeId: 'c12_bt_cbse_456',
  },
];

// ==========================================
// 22+ PROGRESSIVE CHALLENGES (FOUNDATION, STANDARD, ADVANCED)
// ==========================================
interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple-choice' | 'numeric' | 'drag-sort' | 'classify';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7 Challenges) ---
  {
    id: 'chal_1',
    nodeId: 'c12_bt_cbse_428',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'What is the fundamental definition of Plant Tissue Culture (PTC)?',
    options: [
      'Growing mature plants in agricultural soil under natural sunlight.',
      'In vitro culture of plant cells, tissues, or organs on nutrient media under aseptic, controlled environmental conditions.',
      'Extraction of DNA from plant leaves using organic solvents.',
      'Fermentation of plant waste to produce ethanol.',
    ],
    correctIndex: 1,
    explanation: 'Plant Tissue Culture involves growing plant explants aseptically in defined nutrient media under controlled temperature and light conditions.',
    hints: ['Think about "in vitro" and sterile nutrient media.', 'It refers to culturing plant cells/tissues under controlled laboratory conditions.', 'Choose the option emphasizing aseptic in vitro growth.'],
  },
  {
    id: 'chal_2',
    nodeId: 'c12_bt_cbse_432',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Conceptualizing',
    question: 'Cellular totipotency refers to which biological capability of a plant cell?',
    options: [
      'Ability of a cell to absorb unlimited amounts of water.',
      'Ability of a single living plant cell to divide and differentiate into a complete functional organism.',
      'Capacity of a cell to synthesize chlorophyll in total darkness.',
      'Ability of plant roots to fix nitrogen directly from air.',
    ],
    correctIndex: 1,
    explanation: 'Totipotency is the genetic potential of a plant cell to express its entire genome and regenerate an entire intact plant.',
    hints: ['"Toti" means total or complete.', 'It involves giving rise to a whole organism.', 'Look for complete functional organism regeneration.'],
    misconceptionIndex: 0,
  },
  {
    id: 'chal_3',
    nodeId: 'c12_bt_cbse_433',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Terminology Identification',
    question: 'What is the term given to the excised plant part used to initiate a tissue culture?',
    options: ['Inoculum unit', 'Explant', 'Scion', 'Calloid'],
    correctIndex: 1,
    explanation: 'The excised tissue fragment (e.g., leaf disc, nodal segment, root tip, hypocotyl) placed onto culture medium is called an explant.',
    hints: ['Starts with Ex-', 'It is the starting material removed from the donor plant.', 'The term is Explant.'],
  },
  {
    id: 'chal_4',
    nodeId: 'c12_bt_cbse_438',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Media Composition Knowledge',
    question: 'Which of the following elements are classified as MACRONUTRIENTS in plant tissue culture media (required at concentrations > 0.5 mmol/L)?',
    options: [
      'Iron, Copper, Zinc, Manganese',
      'Nitrogen, Phosphorus, Potassium, Calcium, Magnesium, Sulfur',
      'Cobalt, Molybdenum, Boron, Iodine',
      'Selenium, Nickel, Aluminium, Chlorine',
    ],
    correctIndex: 1,
    explanation: 'Macronutrients (N, P, K, Ca, Mg, S) are required in millimolar quantities for structural, osmotic, and enzymatic roles in plant growth.',
    hints: ['Remember N-P-K plus Ca, Mg, S.', 'These are needed in high concentrations.', 'Select N, P, K, Ca, Mg, S.'],
  },
  {
    id: 'chal_5',
    nodeId: 'c12_bt_cbse_444',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Hormone Classification',
    question: 'Which synthetic growth regulator belongs to the AUXIN class and is widely used for callus induction and root initiation?',
    options: ['6-Benzylaminopurine (BAP)', 'Kinetin', '2,4-Dichlorophenoxyacetic acid (2,4-D)', 'Gibberellic Acid (GA3)'],
    correctIndex: 2,
    explanation: '2,4-D and NAA are potent synthetic auxins. 2,4-D is especially famous for inducing dedifferentiation and callus formation.',
    hints: ['BAP and Kinetin are Cytokinins.', '2,4-D is a chlorophenoxy auxin.', 'Choose 2,4-Dichlorophenoxyacetic acid.'],
  },
  {
    id: 'chal_6',
    nodeId: 'c12_bt_cbse_445',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Hormone Classification',
    question: 'Kinetin and 6-Benzylaminopurine (BAP) belong to which class of plant growth regulators?',
    options: ['Auxins', 'Cytokinins', 'Gibberellins', 'Abscisic acids'],
    correctIndex: 1,
    explanation: 'Cytokinins such as BAP, Kinetin, and Zeatin promote cell division (cytokinesis) and shoot organogenesis.',
    hints: ['They promote shoot formation and cell division.', 'Cyto- relates to cell division.', 'Select Cytokinins.'],
  },
  {
    id: 'chal_7',
    nodeId: 'c12_bt_cbse_450',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Media Formulation History',
    question: 'What does the acronym "MS Medium" stand for in plant biotechnology?',
    options: [
      'Microbial Synthesis Medium',
      'Murashige and Skoog Medium',
      'Miller and Steward Medium',
      'Maheshwari and Swaminathan Medium',
    ],
    correctIndex: 1,
    explanation: 'MS medium was formulated by Toshio Murashige and Folke K. Skoog in 1962 for tobacco tissue culture.',
    hints: ['Formulated in 1962 by two famous plant physiologists.', 'T. Murashige & F. Skoog.', 'Select Murashige and Skoog Medium.'],
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'chal_8',
    nodeId: 'c12_bt_cbse_434',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Process Analysis',
    question: 'When a callus tissue forms shoot buds upon transfer to a medium with a high Cytokinin:Auxin ratio, which cellular phenomenon is taking place?',
    options: ['Dedifferentiation', 'Redifferentiation', 'Senescence', 'Necrosis'],
    correctIndex: 1,
    explanation: 'Redifferentiation occurs when an unorganized, dedifferentiated callus cell mass forms specialized organs like shoots or roots.',
    hints: ['Dedifferentiation forms callus from specialized cells.', 'Going from unorganized callus to specialized organs is...', 'Choose Redifferentiation.'],
  },
  {
    id: 'chal_9',
    nodeId: 'c12_bt_cbse_442',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Media Preparation Calculation',
    question: 'What optimal pH range is strictly maintained for MS plant tissue culture media prior to autoclaving?',
    correctAnswer: 5.7,
    tolerance: 0.1,
    unit: 'pH',
    explanation: 'The pH of standard MS medium is adjusted to 5.6 - 5.8 (typically 5.7) using 0.1 M NaOH or 0.1 M HCl before adding agar and autoclaving.',
    hints: ['It is slightly acidic, around 5.6 to 5.8.', 'Enter the midpoint value 5.7.', 'Value is 5.7 pH.'],
  },
  {
    id: 'chal_10',
    nodeId: 'c12_bt_cbse_446',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Hormonal Balance Hypothesis',
    question: 'According to the classical Skoog and Miller (1957) model, what combination yields direct organogenesis of shoots (caulogenesis)?',
    options: [
      'High Auxin concentration + Low Cytokinin concentration',
      'High Cytokinin concentration + Low Auxin concentration',
      'Equal high concentrations of Auxin + Cytokinin',
      'Absence of both Auxin and Cytokinin',
    ],
    correctIndex: 1,
    explanation: 'A high Cytokinin to Auxin ratio promotes shoot bud initiation (caulogenesis), whereas high Auxin to Cytokinin promotes root formation (rhizogenesis).',
    hints: ['Shoots need more cytokinin.', 'High Cytokinin, Low Auxin.', 'Select High Cytokinin + Low Auxin.'],
  },
  {
    id: 'chal_11',
    nodeId: 'c12_bt_cbse_451',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Aseptic Technique Protocol',
    question: 'Why must explants surface-sterilized with 0.1% Mercuric Chloride (HgCl2) or 1% Sodium Hypochlorite be thoroughly washed 3-5 times with sterile distilled water?',
    options: [
      'To add extra oxygen to the explant surface.',
      'To remove trace chemical sterilants that would cause cell toxicity and inhibit growth on nutrient media.',
      'To break seed dormancy.',
      'To dissolve the plant cell wall.',
    ],
    correctIndex: 1,
    explanation: 'Chemical sterilants are toxic to plant tissue. Washing removes residual sterilant chemicals so explant cells remain viable.',
    hints: ['Sterilants kill micro-organisms but are also toxic to plant cells if left.', 'Water rinses remove residual toxic chemicals.', 'Select removal of trace chemical sterilants.'],
  },
  {
    id: 'chal_12',
    nodeId: 'c12_bt_cbse_453',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Haploid Technology',
    question: 'What is the primary genetic advantage of producing Double Haploid (DH) plants via anther/microspore culture followed by colchicine treatment?',
    options: [
      '100% homozygous lines achieved in a single generation, accelerating plant breeding.',
      'Triploid sterile seedless fruit generation.',
      'Increased mutation rate of cytoplasm.',
      'Total resistance to all viral pathogens.',
    ],
    correctIndex: 0,
    explanation: 'Anther culture yields haploid (n) plants. Doubling chromosome numbers with colchicine instantly generates 100% homozygous double haploids (2n), saving 6-8 generations of selfing.',
    hints: ['Haploid chromosomes are doubled.', 'Doubling haploids creates homozygosity.', 'Select 100% homozygous lines in a single generation.'],
  },
  {
    id: 'chal_13',
    nodeId: 'c12_bt_cbse_454',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Protoplast Isolation',
    question: 'Which enzyme mixture is essential to digest cell walls to yield naked, spherical protoplasts from leaf mesophyll?',
    options: [
      'Amylase and Protease',
      'Cellulase and Pectinase (Macerozyme)',
      'Restriction Endonuclease and Ligase',
      'Lipase and DNA Polymerase',
    ],
    correctIndex: 1,
    explanation: 'Cellulase breaks down the cellulose microfibrils of the primary cell wall, while Pectinase (Macerozyme) degrades the middle lamella pectin holding cells together.',
    hints: ['Cell wall components are Cellulose and Pectin.', 'Enzymes ending in -ase that break down cellulose and pectin.', 'Select Cellulase and Pectinase.'],
  },
  {
    id: 'chal_14',
    nodeId: 'c12_bt_cbse_456',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Pathogen-Free Plant Production',
    question: 'Which region of an infected plant is excised to produce pathogen-free (virus-free) clones?',
    options: ['Mature tap root segment', 'Apical shoot meristem dome (0.1–0.3 mm)', 'Secondary xylem vessels', 'Petiole parenchyma'],
    correctIndex: 1,
    explanation: 'The shoot apical meristem dome (0.1–0.3 mm) lacks vascular connections through which viruses travel and has rapid cell division, making it virus-free.',
    hints: ['It is the growing tip dome.', 'Size is very small (0.1-0.3 mm).', 'Select Apical shoot meristem dome.'],
  },
  {
    id: 'chal_15',
    nodeId: 'c12_bt_cbse_457',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Genetic Variation Analysis',
    question: 'What term defines genetic and epigenetic variations originating in plants regenerated from in vitro cell and callus cultures?',
    options: ['Gametoclonal variations', 'Somaclonal variations', 'Recombinant variations', 'Polyploid variations'],
    correctIndex: 1,
    explanation: 'Larkin and Scowcroft (1981) coined the term "Somaclonal Variation" for genetic variability displayed among plants derived from tissue/callus culture.',
    hints: ['Somatic cell tissue culture variation.', 'Term coined by Larkin & Scowcroft.', 'Select Somaclonal variations.'],
  },

  // --- ADVANCED TIER (7 Challenges) ---
  {
    id: 'chal_16',
    nodeId: 'c12_bt_cbse_452',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Bioprocess Engineering',
    question: 'In synthetic seed manufacturing, why is Calcium Chloride (CaCl2) added to the receiving bath into which Sodium Alginate droplets containing somatic embryos are dropped?',
    options: ['To lower pH to 3.0.', 'To induce ion exchange replace Sodium (Na+) with Calcium (Ca2+), forming insoluble Calcium Alginate hydrogel beads.', 'To act as a nitrogen nutrient source.', 'To kill remaining bacterial endophytes.'],
    correctIndex: 1,
    explanation: 'Ca2+ ions cross-link guluronic acid units of sodium alginate through ionic replacement of Na+, forming a firm, protective calcium alginate hydrogel matrix.',
    hints: ['Think of ion exchange and gel cross-linking.', 'Na+ replaced by Ca2+ creates insoluble hydrogel.', 'Select ion exchange replacing Na+ with Ca2+.'],
    misconceptionIndex: 3,
  },
  {
    id: 'chal_17',
    nodeId: 'c12_bt_cbse_455',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Genomics & Cybridization',
    question: 'A scientist fuses protoplasts from Species A (nucleus N_A, cytoplasm C_A) with protoplasts of Species B (nucleus N_B, cytoplasm C_B) after irradiating Species B nucleus with X-rays. What is the genetic constitution of the resulting Cybrid?',
    options: [
      'N_A + N_B with C_A only',
      'N_A with C_A + C_B mixed cytoplasm',
      'N_B with C_A + C_B mixed cytoplasm',
      'N_A + N_B with C_A + C_B mixed cytoplasm',
    ],
    correctIndex: 1,
    explanation: 'X-ray irradiation inactivates the nucleus of Species B (N_B). Fusion yields a Cybrid (cytoplasmic hybrid) containing only Species A nucleus (N_A) and mixed organellar genomes (mitochondria/chloroplasts) from both species (C_A + C_B).',
    hints: ['X-rays destroy nucleus B.', 'Only Nucleus A survives.', 'Cytoplasm contains organelles from both species (C_A + C_B).', 'Select N_A with C_A + C_B.'],
    misconceptionIndex: 4,
  },
  {
    id: 'chal_18',
    nodeId: 'c12_bt_cbse_458',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Industrial Biotechnology Evaluation',
    question: 'To stimulate secondary metabolite accumulation (such as Taxol or Shikonin) in cell suspension bioreactors, what elicitor molecules are commonly added?',
    options: ['High doses of GA3 and sucrose', 'Methyl Jasmonate or Salicylic Acid', 'Ampicillin and Streptomycin', 'Sodium Hydroxide'],
    correctIndex: 1,
    explanation: 'Elicitors like Methyl Jasmonate and Salicylic Acid mimic pathogen attacks, triggering signal transduction cascades that upregulate secondary metabolite biosynthetic pathways.',
    hints: ['Stress hormones that mimic pathogen defense response.', 'Jasmonate & Salicylic acid derivatives.', 'Select Methyl Jasmonate or Salicylic Acid.'],
  },
  {
    id: 'chal_19',
    nodeId: 'c12_bt_cbse_449',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Media Design & Osmolality',
    question: 'How many grams of sucrose carbon source are standardly added to prepare 5 Liters of MS basal medium at 3% (w/v) concentration?',
    correctAnswer: 150,
    tolerance: 0.1,
    unit: 'grams',
    explanation: '3% (w/v) sucrose = 30 grams per 1 Liter. For 5 Liters: 30 g/L × 5 L = 150 grams.',
    hints: ['3% w/v means 30 g per Liter.', 'Multiply 30 g/L by 5 Liters.', '30 x 5 = 150 grams.'],
  },
  {
    id: 'chal_20',
    nodeId: 'c12_bt_cbse_436',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Developmental Biology',
    question: 'What sequential morphological stages occur during somatic embryogenesis in dicotyledonous plants?',
    options: [
      'Callus -> Shoot -> Root -> Seed',
      'Globular stage -> Heart stage -> Torpedo stage -> Cotyledonary stage',
      'Protoplast -> Heterokaryon -> Cybrid -> Plantlet',
      'Meristem -> Auxin root -> Cytokinin shoot -> Hardening',
    ],
    correctIndex: 1,
    explanation: 'Dicot somatic embryos recapitulate zygotic embryogenesis passing sequentially through Globular, Heart-shaped, Torpedo-shaped, and Cotyledonary stages.',
    hints: ['Starts rounded (globular), then heart-shaped...', 'Globular -> Heart -> Torpedo -> Cotyledonary.', 'Select Globular -> Heart -> Torpedo -> Cotyledonary stage.'],
    misconceptionIndex: 2,
  },
  {
    id: 'chal_21',
    nodeId: 'c12_bt_cbse_440',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Biochemical Nutrition',
    question: 'Which organic vitamin component is universally added as an essential coenzyme precursor in MS medium formulation?',
    options: ['Vitamin C (Ascorbic Acid)', 'Thiamine (Vitamin B1)', 'Vitamin D3 (Cholecalciferol)', 'Vitamin K1 (Phylloquinone)'],
    correctIndex: 1,
    explanation: 'Thiamine HCl (Vitamin B1) is essential in PTC media as it acts as a coenzyme in carbohydrate metabolism and cell division.',
    hints: ['Vitamin B1.', 'Essential coenzyme precursor in carbohydrate breakdown.', 'Select Thiamine (Vitamin B1).'],
  },
  {
    id: 'chal_22',
    nodeId: 'c12_bt_cbse_459',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Application & Industry Strategy',
    question: 'Which application of tissue culture enables conservation of endangered plant germplasm in liquid nitrogen at -196°C?',
    options: ['Somaclonal selection', 'Cryopreservation', 'Micrografting', 'Somatic embryogenesis'],
    correctIndex: 1,
    explanation: 'Cryopreservation stores biological cells or tissue cultures at ultra-low temperature (-196°C in liquid nitrogen) to halt cellular metabolic degradation indefinitely.',
    hints: ['Cryo- means extreme cold.', 'Liquid nitrogen at -196°C.', 'Select Cryopreservation.'],
  },
];

// ==========================================
// CUSTOM SVG DIAGRAM COMPONENTS
// ==========================================

// Diagram 1: Auxin-Cytokinin Organogenesis Balance Diagram
const AuxinCytokininRatioDiagramSVG: React.FC<{ auxin: number; cytokinin: number }> = ({ auxin, cytokinin }) => {
  const ratio = cytokinin > 0 ? (auxin / cytokinin).toFixed(2) : 'INF';
  let modeText = 'Callus Proliferation';
  let modeColor = '#f59e0b'; // amber
  if (auxin > cytokinin * 2) {
    modeText = 'Rhizogenesis (Root Formation)';
    modeColor = '#10b981'; // emerald
  } else if (cytokinin > auxin * 2) {
    modeText = 'Caulogenesis (Shoot Bud Formation)';
    modeColor = '#06b6d4'; // cyan
  }

  return (
    <svg viewBox="0 0 600 320" className="w-full h-auto bg-slate-900 rounded-xl p-4 border border-slate-700 shadow-2xl">
      <defs>
        <linearGradient id="mediaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="agarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Culture Tube Visual */}
      <rect x="230" y="30" width="140" height="220" rx="20" fill="url(#mediaGrad)" stroke="#64748b" strokeWidth="4" />
      <rect x="235" y="150" width="130" height="95" rx="10" fill="url(#agarGrad)" />

      {/* Explant / Morphogenesis Illustration */}
      {auxin > cytokinin * 2 && (
        /* Rooting */
        <g filter="url(#glow)">
          <path d="M 300 160 Q 280 180 270 210 Q 260 230 250 240" fill="none" stroke="#34d399" strokeWidth="4" strokeLinecap="round" />
          <path d="M 300 160 Q 320 185 330 215 Q 340 235 345 245" fill="none" stroke="#34d399" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 300 160 Q 300 190 305 230" fill="none" stroke="#6ee7b7" strokeWidth="3" strokeLinecap="round" />
          <circle cx="300" cy="155" r="14" fill="#047857" stroke="#10b981" strokeWidth="2" />
          <text x="300" y="130" fill="#34d399" textAnchor="middle" fontSize="13" fontWeight="bold">Roots (Rhizogenesis)</text>
        </g>
      )}

      {cytokinin > auxin * 2 && (
        /* Shooting */
        <g filter="url(#glow)">
          <path d="M 300 155 L 300 80" stroke="#22d3ee" strokeWidth="5" strokeLinecap="round" />
          {/* Leaves */}
          <path d="M 300 110 Q 270 90 260 115 Q 285 125 300 110 Z" fill="#06b6d4" stroke="#a5f3fc" strokeWidth="1.5" />
          <path d="M 300 95 Q 330 75 340 100 Q 315 110 300 95 Z" fill="#06b6d4" stroke="#a5f3fc" strokeWidth="1.5" />
          <path d="M 300 80 Q 275 55 265 75 Q 290 85 300 80 Z" fill="#22d3ee" />
          <path d="M 300 80 Q 325 55 335 75 Q 310 85 300 80 Z" fill="#22d3ee" />
          <text x="300" y="50" fill="#22d3ee" textAnchor="middle" fontSize="13" fontWeight="bold">Shoots (Caulogenesis)</text>
        </g>
      )}

      {auxin <= cytokinin * 2 && cytokinin <= auxin * 2 && (
        /* Callus */
        <g filter="url(#glow)">
          <circle cx="300" cy="140" r="24" fill="#f59e0b" fillOpacity="0.7" stroke="#fbbf24" strokeWidth="3" />
          <circle cx="280" cy="148" r="16" fill="#d97706" opacity="0.8" />
          <circle cx="320" cy="145" r="18" fill="#b45309" opacity="0.8" />
          <circle cx="300" cy="160" r="15" fill="#f59e0b" opacity="0.9" />
          <text x="300" y="105" fill="#fbbf24" textAnchor="middle" fontSize="13" fontWeight="bold">Undifferentiated Callus</text>
        </g>
      )}

      {/* Readout Panels */}
      <rect x="20" y="40" width="180" height="110" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="2" />
      <text x="30" y="65" fill="#94a3b8" fontSize="12">Auxin (NAA/2,4-D):</text>
      <text x="30" y="88" fill="#10b981" fontSize="18" fontWeight="bold">{auxin.toFixed(2)} mg/L</text>
      <text x="30" y="115" fill="#94a3b8" fontSize="12">Cytokinin (BAP):</text>
      <text x="30" y="138" fill="#06b6d4" fontSize="18" fontWeight="bold">{cytokinin.toFixed(2)} mg/L</text>

      <rect x="400" y="40" width="180" height="110" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="2" />
      <text x="410" y="65" fill="#94a3b8" fontSize="12">Auxin : Cytokinin Ratio:</text>
      <text x="410" y="90" fill="#e2e8f0" fontSize="16" fontWeight="bold">{ratio}</text>
      <text x="410" y="115" fill="#94a3b8" fontSize="11">Skoog & Miller State:</text>
      <text x="410" y="135" fill={modeColor} fontSize="12" fontWeight="bold">{modeText}</text>

      {/* Legend / Axis bottom */}
      <line x1="50" y1="285" x2="550" y2="285" stroke="#475569" strokeWidth="3" strokeDasharray="4 4" />
      <text x="60" y="305" fill="#10b981" fontSize="11" fontWeight="bold">← High Auxin: Rooting</text>
      <text x="300" y="305" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">1:1 Ratio: Callus</text>
      <text x="540" y="305" fill="#06b6d4" fontSize="11" fontWeight="bold" textAnchor="end">High Cytokinin: Shooting →</text>
    </svg>
  );
};

// Diagram 2: Protoplast Isolation & PEG Induced Fusion SVG
const ProtoplastFusionDiagramSVG: React.FC<{ stage: number }> = ({ stage }) => {
  return (
    <svg viewBox="0 0 650 260" className="w-full h-auto bg-slate-900 rounded-xl p-3 border border-slate-700 shadow-xl">
      <defs>
        <radialGradient id="cellA" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </radialGradient>
        <radialGradient id="cellB" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#e11d48" />
        </radialGradient>
      </defs>

      {/* Step 1: Intact Plant Cells with Wall */}
      <g opacity={stage >= 1 ? 1 : 0.3}>
        <rect x="20" y="40" width="120" height="150" rx="12" fill="#1e293b" stroke="#10b981" strokeWidth="4" strokeDasharray="6 3" />
        <rect x="28" y="48" width="104" height="134" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
        <circle cx="80" cy="115" r="22" fill="#047857" stroke="#6ee7b7" strokeWidth="2" />
        <text x="80" y="119" fill="#ecfdf5" fontSize="10" textAnchor="middle" fontWeight="bold">Nuc A</text>
        <text x="80" y="215" fill="#94a3b8" fontSize="12" textAnchor="middle" fontWeight="bold">1. Plant Cell + Wall</text>
        <text x="80" y="233" fill="#64748b" fontSize="10" textAnchor="middle">Cellulose/Pectin</text>
      </g>

      {/* Arrow 1 */}
      <path d="M 150 115 L 175 115" stroke="#475569" strokeWidth="3" markerEnd="url(#arrow)" />

      {/* Step 2: Naked Protoplasts (Enzymatic digestion) */}
      <g opacity={stage >= 2 ? 1 : 0.3}>
        <circle cx="225" cy="90" r="30" fill="url(#cellA)" stroke="#6ee7b7" strokeWidth="3" />
        <circle cx="225" cy="90" r="10" fill="#064e3b" />
        <circle cx="225" cy="150" r="30" fill="url(#cellB)" stroke="#fda4af" strokeWidth="3" />
        <circle cx="225" cy="150" r="10" fill="#881337" />
        <text x="225" y="215" fill="#94a3b8" fontSize="12" textAnchor="middle" fontWeight="bold">2. Naked Protoplasts</text>
        <text x="225" y="233" fill="#64748b" fontSize="10" textAnchor="middle">Cellulase + Pectinase</text>
      </g>

      {/* Arrow 2 */}
      <path d="M 270 115 L 295 115" stroke="#475569" strokeWidth="3" />

      {/* Step 3: Membrane Agglutination (PEG 6000 addition) */}
      <g opacity={stage >= 3 ? 1 : 0.3}>
        <ellipse cx="360" cy="115" rx="45" ry="32" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" />
        <circle cx="342" cy="115" r="20" fill="url(#cellA)" opacity="0.9" />
        <circle cx="378" cy="115" r="20" fill="url(#cellB)" opacity="0.9" />
        <text x="360" y="215" fill="#94a3b8" fontSize="12" textAnchor="middle" fontWeight="bold">3. PEG Agglutination</text>
        <text x="360" y="233" fill="#38bdf8" fontSize="10" textAnchor="middle">40% PEG + Ca2+</text>
      </g>

      {/* Arrow 3 */}
      <path d="M 420 115 L 445 115" stroke="#475569" strokeWidth="3" />

      {/* Step 4: Heterokaryon & Somatic Hybrid */}
      <g opacity={stage >= 4 ? 1 : 0.3}>
        <circle cx="530" cy="115" r="42" fill="#0284c7" stroke="#38bdf8" strokeWidth="4" />
        {/* Dual nuclei */}
        <circle cx="515" cy="115" r="12" fill="#047857" stroke="#6ee7b7" strokeWidth="2" />
        <circle cx="545" cy="115" r="12" fill="#881337" stroke="#fda4af" strokeWidth="2" />
        <text x="530" y="215" fill="#94a3b8" fontSize="12" textAnchor="middle" fontWeight="bold">4. Heterokaryon Hybrid</text>
        <text x="530" y="233" fill="#38bdf8" fontSize="10" textAnchor="middle">Nuclear Fusion (Pomato)</text>
      </g>
    </svg>
  );
};

// Diagram 3: Synthetic Seed Structure (Calcium Alginate Encapsulation) SVG
const SyntheticSeedDiagramSVG: React.FC = () => {
  return (
    <svg viewBox="0 0 550 240" className="w-full h-auto bg-slate-900 rounded-xl p-3 border border-slate-700 shadow-xl">
      <defs>
        <radialGradient id="alginateGel" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#0284c7" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0369a1" stopOpacity="0.9" />
        </radialGradient>
      </defs>

      {/* Hydrogel Capsule Outer Sphere */}
      <circle cx="180" cy="120" r="85" fill="url(#alginateGel)" stroke="#7dd3fc" strokeWidth="4" />
      
      {/* Inner Somatic Embryo (Bipolar Structure) */}
      <g transform="translate(180, 120) rotate(-15)">
        {/* Cotyledon folds */}
        <path d="M -15 -25 Q -30 -50 0 -55 Q 15 -35 -5 -15 Z" fill="#22c55e" stroke="#86efac" strokeWidth="2" />
        <path d="M 5 -25 Q 30 -50 5 -55 Q -10 -35 5 -25 Z" fill="#16a34a" stroke="#86efac" strokeWidth="2" />
        {/* Hypocotyl axis */}
        <rect x="-10" y="-15" width="20" height="40" rx="6" fill="#4ade80" />
        {/* Radicle root apex */}
        <path d="M -10 25 L 0 45 L 10 25 Z" fill="#15803d" stroke="#86efac" fillOpacity="0.9" />
      </g>

      {/* Labels with Annotations */}
      <line x1="245" y1="70" x2="350" y2="50" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx="350" cy="50" r="4" fill="#38bdf8" />
      <text x="360" y="54" fill="#7dd3fc" fontSize="13" fontWeight="bold">Calcium Alginate Capsule</text>
      <text x="360" y="72" fill="#94a3b8" fontSize="11">Protective hydrogel coating (3% Na-Alginate + 100mM CaCl2)</text>

      <line x1="210" y1="90" x2="350" y2="105" stroke="#4ade80" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx="350" cy="105" r="4" fill="#4ade80" />
      <text x="360" y="110" fill="#4ade80" fontSize="13" fontWeight="bold">Bipolar Somatic Embryo</text>
      <text x="360" y="128" fill="#94a3b8" fontSize="11">Cotyledons + Shoot Apex + Radicle Root Apex</text>

      <line x1="160" y1="180" x2="350" y2="165" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx="350" cy="165" r="4" fill="#fbbf24" />
      <text x="360" y="170" fill="#fbbf24" fontSize="13" fontWeight="bold">Artificial Endosperm Matrix</text>
      <text x="360" y="188" fill="#94a3b8" fontSize="11">Nutrients, MS salts, 3% sucrose, fungicide & hormones</text>
    </svg>
  );
};

// ==========================================
// INTERACTIVE SUB-SIMULATOR LAB 1: AUXIN-CYTOKININ LAB
// ==========================================
const AuxinCytokininLab: React.FC<{
  auxin: number;
  cytokinin: number;
  setAuxin: (v: number) => void;
  setCytokinin: (v: number) => void;
}> = ({ auxin, cytokinin, setAuxin, setCytokinin }) => {
  return (
    <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 shadow-2xl space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-700 pb-4">
        <div>
          <h3 className="text-xl fontWeight-bold text-emerald-400 font-mono">LAB 1: Auxin-Cytokinin Organogenesis Simulator</h3>
          <p className="text-sm text-slate-300">Manipulate growth regulator ratios to trigger dedifferentiation or organogenesis in leaf explants.</p>
        </div>
        <div className="px-3 py-1 bg-emerald-950 border border-emerald-600/50 rounded-full text-xs text-emerald-300 font-semibold">
          Node: c12_bt_cbse_446
        </div>
      </div>

      {/* SVG Interactive Display */}
      <AuxinCytokininRatioDiagramSVG auxin={auxin} cytokinin={cytokinin} />

      {/* Control Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/80 p-5 rounded-xl border border-slate-700">
        {/* Auxin Controls */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-emerald-300">Auxin Concentration (NAA / 2,4-D):</label>
            <span className="text-lg font-bold text-emerald-400 font-mono">{auxin.toFixed(2)} mg/L</span>
          </div>
          <input
            type="range"
            min="0.0"
            max="5.0"
            step="0.1"
            value={auxin}
            onChange={(e) => {
              setAuxin(parseFloat(e.target.value));
              audioManager.play('pop');
            }}
            className="w-full accent-emerald-500 bg-slate-700 rounded-lg cursor-pointer h-2"
          />
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>0.00 mg/L (None)</span>
            <span>2.50 mg/L</span>
            <span>5.00 mg/L (High)</span>
          </div>
        </div>

        {/* Cytokinin Controls */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-gold-300">Cytokinin Concentration (BAP / Kinetin):</label>
            <span className="text-lg font-bold text-gold-400 font-mono">{cytokinin.toFixed(2)} mg/L</span>
          </div>
          <input
            type="range"
            min="0.0"
            max="5.0"
            step="0.1"
            value={cytokinin}
            onChange={(e) => {
              setCytokinin(parseFloat(e.target.value));
              audioManager.play('pop');
            }}
            className="w-full accent-gold-500 bg-slate-700 rounded-lg cursor-pointer h-2"
          />
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>0.00 mg/L (None)</span>
            <span>2.50 mg/L</span>
            <span>5.00 mg/L (High)</span>
          </div>
        </div>
      </div>

      {/* Presets Quick-Buttons */}
      <div className="flex flex-wrap gap-3 pt-2">
        <button
          onClick={() => {
            setAuxin(2.5);
            setCytokinin(0.1);
            audioManager.play('chime');
          }}
          className="px-4 py-2 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-600/40 rounded-xl text-xs font-semibold transition"
        >
          Preset: Rhizogenesis (Rooting: Auxin High)
        </button>
        <button
          onClick={() => {
            setAuxin(0.1);
            setCytokinin(2.5);
            audioManager.play('chime');
          }}
          className="px-4 py-2 bg-gold-900/60 hover:bg-gold-800 text-gold-200 border border-gold-600/40 rounded-xl text-xs font-semibold transition"
        >
          Preset: Caulogenesis (Shooting: Cytokinin High)
        </button>
        <button
          onClick={() => {
            setAuxin(1.0);
            setCytokinin(1.0);
            audioManager.play('chime');
          }}
          className="px-4 py-2 bg-amber-900/60 hover:bg-amber-800 text-amber-200 border border-amber-600/40 rounded-xl text-xs font-semibold transition"
        >
          Preset: Callus Induction (1:1 Balanced Ratio)
        </button>
      </div>
    </div>
  );
};

// ==========================================
// INTERACTIVE SUB-SIMULATOR LAB 2: ASEPTIC STERILIZATION
// ==========================================
const AsepticSterilizationLab: React.FC = () => {
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [bleachTime, setBleachTime] = useState<number>(10); // minutes
  const [contaminationRisk, setContaminationRisk] = useState<number>(85);

  const steps = [
    { title: '1. Tap Water Wash', detail: 'Wash leaf explants under running tap water with 0.1% Tween-20 surfactant to remove surface dust and fungal spores.' },
    { title: '2. Chemical Sterilization', detail: 'Immerse explants in 1% Sodium Hypochlorite (NaOCl) solution inside a sterile vessel.' },
    { title: '3. Triple Rinsing', detail: 'Rinse 3–4 times with sterile double-distilled water in a Laminar Air Flow cabinet.' },
    { title: '4. Inoculation', detail: 'Trim damaged explant edges with a sterile scalpel and place onto MS culture medium.' },
  ];

  useEffect(() => {
    // calculate risk based on sterilization step and bleach time
    if (stepIndex === 0) setContaminationRisk(90);
    else if (stepIndex === 1) {
      if (bleachTime < 5) setContaminationRisk(65);
      else if (bleachTime >= 8 && bleachTime <= 15) setContaminationRisk(5);
      else setContaminationRisk(40); // tissue necrosis risk
    } else if (stepIndex === 2) {
      setContaminationRisk(bleachTime >= 8 && bleachTime <= 15 ? 2 : 25);
    } else {
      setContaminationRisk(bleachTime >= 8 && bleachTime <= 15 ? 0.5 : 20);
    }
  }, [stepIndex, bleachTime]);

  return (
    <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 shadow-2xl space-y-6">
      <div className="flex justify-between items-center border-b border-slate-700 pb-4">
        <div>
          <h3 className="text-xl font-bold text-gold-400 font-mono">LAB 2: Aseptic Surface Sterilization Protocol</h3>
          <p className="text-sm text-slate-300">Sterilize explants without damaging plant tissue viability.</p>
        </div>
        <span className="px-3 py-1 bg-gold-950 border border-gold-600/50 rounded-full text-xs text-gold-300 font-semibold">
          Node: c12_bt_cbse_451
        </span>
      </div>

      {/* Workflow Stepper */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => {
              setStepIndex(idx);
              audioManager.play('pop');
            }}
            className={`p-3 rounded-xl border text-left transition ${
              stepIndex === idx
                ? 'bg-gold-900/80 border-gold-400 text-white shadow-lg'
                : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-500'
            }`}
          >
            <div className="text-xs font-bold font-mono">{s.title}</div>
          </button>
        ))}
      </div>

      {/* Step Detail Card */}
      <div className="bg-slate-900 p-5 rounded-xl border border-slate-700 space-y-4">
        <h4 className="text-lg font-bold text-slate-100">{steps[stepIndex].title}</h4>
        <p className="text-sm text-slate-300">{steps[stepIndex].detail}</p>

        {stepIndex === 1 && (
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex justify-between text-sm text-slate-300">
              <span>Sterilant Exposure Time (NaOCl):</span>
              <span className="font-bold text-gold-400 font-mono">{bleachTime} min</span>
            </div>
            <input
              type="range"
              min="2"
              max="25"
              value={bleachTime}
              onChange={(e) => setBleachTime(parseInt(e.target.value))}
              className="w-full accent-gold-400 bg-slate-700 h-2 rounded-lg"
            />
            <p className="text-xs text-slate-400">
              Optimal exposure is 10–12 mins. Under-exposure leads to bacterial contamination; over-exposure leads to chemical bleaching/tissue necrosis.
            </p>
          </div>
        )}

        {/* Meter */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-400">Contamination & Necrosis Risk Level:</span>
            <span className={contaminationRisk < 10 ? 'text-emerald-400' : 'text-rose-400'}>
              {contaminationRisk}% {contaminationRisk < 10 ? '(STERILE & VIABLE)' : '(RISK HIGH)'}
            </span>
          </div>
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden border border-slate-700">
            <div
              className={`h-full transition-all duration-300 ${
                contaminationRisk < 10 ? 'bg-emerald-500' : contaminationRisk < 40 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${contaminationRisk}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// INTERACTIVE SUB-SIMULATOR LAB 3: PROTOPLAST FUSION
// ==========================================
const ProtoplastFusionLab: React.FC = () => {
  const [stage, setStage] = useState<number>(1);
  const [pegConcentration, setPegConcentration] = useState<number>(20); // %

  const handleNextStage = () => {
    if (stage < 4) {
      setStage((prev) => prev + 1);
      audioManager.play('count');
    }
  };

  const handleReset = () => {
    setStage(1);
    audioManager.play('whoosh');
  };

  return (
    <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 shadow-2xl space-y-6">
      <div className="flex justify-between items-center border-b border-slate-700 pb-4">
        <div>
          <h3 className="text-xl font-bold text-purple-400 font-mono">LAB 3: Protoplast Fusion & Somatic Hybridization</h3>
          <p className="text-sm text-slate-300">Isolate naked protoplasts and induce membrane fusion using Polyethylene Glycol (PEG 6000).</p>
        </div>
        <span className="px-3 py-1 bg-purple-950 border border-purple-600/50 rounded-full text-xs text-purple-300 font-semibold">
          Node: c12_bt_cbse_454
        </span>
      </div>

      <ProtoplastFusionDiagramSVG stage={stage} />

      {/* Control Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900 p-4 rounded-xl border border-slate-700">
        <div className="space-y-2">
          <label className="text-xs text-slate-400 font-semibold">PEG 6000 Concentration (% w/v):</label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="10"
              max="50"
              value={pegConcentration}
              onChange={(e) => setPegConcentration(parseInt(e.target.value))}
              className="w-full accent-purple-500 bg-slate-700 h-2 rounded-lg"
            />
            <span className="text-sm font-bold text-purple-300 font-mono">{pegConcentration}%</span>
          </div>
          <p className="text-xs text-slate-400">Optimal PEG concentration is 40% w/v for high heterokaryon yield.</p>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold border border-slate-600"
          >
            Reset Sequence
          </button>
          <button
            onClick={handleNextStage}
            disabled={stage >= 4}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-lg ${
              stage >= 4
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-gold-600 hover:from-purple-500 hover:to-gold-500 text-white'
            }`}
          >
            {stage === 1 ? 'Step 1: Add Cellulase/Pectinase' : stage === 2 ? 'Step 2: Add 40% PEG Fusogen' : stage === 3 ? 'Step 3: Induce Nuclear Fusion' : 'Hybrid Complete!'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// INTERACTIVE SUB-SIMULATOR LAB 4: SYNSEED & MERISTEM LAB
// ==========================================
const SyntheticSeedMeristemLab: React.FC = () => {
  const [encapsulatedCount, setEncapsulatedCount] = useState<number>(0);
  const [meristemSize, setMeristemSize] = useState<number>(0.3); // mm
  const [virusFreeStatus, setVirusFreeStatus] = useState<boolean>(true);

  const handleEncapsulate = () => {
    setEncapsulatedCount((prev) => prev + 1);
    audioManager.play('sparkle');
  };

  useEffect(() => {
    if (meristemSize <= 0.3) {
      setVirusFreeStatus(true);
    } else {
      setVirusFreeStatus(false);
    }
  }, [meristemSize]);

  return (
    <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 shadow-2xl space-y-6">
      <div className="flex justify-between items-center border-b border-slate-700 pb-4">
        <div>
          <h3 className="text-xl font-bold text-gold-400 font-mono">LAB 4: Virus Elimination & Synseed Microencapsulation</h3>
          <p className="text-sm text-slate-300">Isolate virus-free meristem domes and encapsulate somatic embryos in calcium alginate.</p>
        </div>
        <span className="px-3 py-1 bg-gold-950 border border-gold-600/50 rounded-full text-xs text-gold-300 font-semibold">
          Node: c12_bt_cbse_452 & 456
        </span>
      </div>

      <SyntheticSeedDiagramSVG />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Meristem Section */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 space-y-3">
          <h4 className="text-sm font-bold text-gold-300">Part A: Meristem Tip Isolation</h4>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Excised Meristem Dome Size:</span>
              <span className="font-mono font-bold text-gold-400">{meristemSize.toFixed(2)} mm</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.5"
              step="0.1"
              value={meristemSize}
              onChange={(e) => setMeristemSize(parseFloat(e.target.value))}
              className="w-full accent-gold-400 bg-slate-700 h-2 rounded-lg"
            />
          </div>
          <div className="p-3 bg-slate-800/80 rounded-lg text-xs flex justify-between items-center border border-slate-700">
            <span>Pathogen Test Result:</span>
            <span className={`font-bold px-2 py-0.5 rounded ${virusFreeStatus ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' : 'bg-rose-950 text-rose-300 border border-rose-600'}`}>
              {virusFreeStatus ? '100% VIRUS FREE' : 'VIRAL CONTAMINATION PRESENT'}
            </span>
          </div>
        </div>

        {/* Encapsulation Section */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 space-y-3 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-gold-300">Part B: Artificial Synthetic Seed Production</h4>
            <p className="text-xs text-slate-400 mt-1">
              Dispense somatic embryos suspended in 3% Na-Alginate dropwise into 100 mM CaCl2 solution.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleEncapsulate}
              className="px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold transition shadow-lg"
            >
              + Drop Encapsulated Synseed
            </button>
            <div className="text-right">
              <span className="text-xs text-slate-400">Total Synseeds Batch:</span>
              <div className="text-2xl font-bold font-mono text-gold-400">{encapsulatedCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// INTERACTIVE SUB-SIMULATOR LAB 5: BIOREACTOR SECONDARY METABOLITE
// ==========================================
const SecondaryMetaboliteLab: React.FC = () => {
  const [dissolvedO2, setDissolvedO2] = useState<number>(40); // % saturation
  const [elicitorConcentration, setElicitorConcentration] = useState<number>(50); // uM Methyl Jasmonate
  const [yieldTaxol, setYieldTaxol] = useState<number>(120); // mg/L

  useEffect(() => {
    // yield depends on dissolved oxygen and elicitor
    const calculated = (dissolvedO2 * 2.5) + (elicitorConcentration * 4.2);
    setYieldTaxol(Math.round(calculated));
  }, [dissolvedO2, elicitorConcentration]);

  return (
    <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 shadow-2xl space-y-6">
      <div className="flex justify-between items-center border-b border-slate-700 pb-4">
        <div>
          <h3 className="text-xl font-bold text-amber-400 font-mono">LAB 5: Cell Suspension Bioreactor (Secondary Metabolites)</h3>
          <p className="text-sm text-slate-300">Optimize biochemical parameters for high-yield Paclitaxel (Taxol) synthesis in 50L Airlift Bioreactor.</p>
        </div>
        <span className="px-3 py-1 bg-amber-950 border border-amber-600/50 rounded-full text-xs text-amber-300 font-semibold">
          Node: c12_bt_cbse_458
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bioreactor Visual Canvas */}
        <div className="md:col-span-1 bg-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col items-center justify-center">
          <svg viewBox="0 0 160 220" className="w-36 h-48">
            <rect x="30" y="20" width="100" height="160" rx="30" fill="#1e293b" stroke="#f59e0b" strokeWidth="4" />
            <rect x="35" y="70" width="90" height="105" rx="15" fill="#d97706" fillOpacity="0.4" />
            {/* Aeration Bubbles */}
            <circle cx="60" cy="150" r="4" fill="#fef08a" opacity="0.8" />
            <circle cx="80" cy="130" r="6" fill="#fef08a" opacity="0.8" />
            <circle cx="100" cy="110" r="5" fill="#fef08a" opacity="0.8" />
            <circle cx="70" cy="90" r="7" fill="#fef08a" opacity="0.8" />
            {/* Impeller shaft */}
            <line x1="80" y1="20" x2="80" y2="160" stroke="#94a3b8" strokeWidth="4" />
            <line x1="55" y1="140" x2="105" y2="140" stroke="#cbd5e1" strokeWidth="6" />
          </svg>
          <span className="text-xs font-bold text-amber-400 mt-2 font-mono">Airlift Fermenter V = 50 L</span>
        </div>

        {/* Sliders & Yield Monitor */}
        <div className="md:col-span-2 space-y-5 bg-slate-900 p-5 rounded-xl border border-slate-700">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>Dissolved Oxygen (dO2 Saturation):</span>
              <span className="text-amber-400 font-mono font-bold">{dissolvedO2}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              value={dissolvedO2}
              onChange={(e) => setDissolvedO2(parseInt(e.target.value))}
              className="w-full accent-amber-500 bg-slate-700 h-2 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>Elicitor Concentration (Methyl Jasmonate):</span>
              <span className="text-amber-400 font-mono font-bold">{elicitorConcentration} µM</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={elicitorConcentration}
              onChange={(e) => setElicitorConcentration(parseInt(e.target.value))}
              className="w-full accent-amber-500 bg-slate-700 h-2 rounded-lg"
            />
          </div>

          <div className="p-4 bg-slate-800 rounded-xl border border-amber-600/30 flex justify-between items-center">
            <div>
              <div className="text-xs text-slate-400">Paclitaxel (Taxol) Alkaloid Volumetric Yield:</div>
              <div className="text-2xl font-extrabold text-amber-400 font-mono">{yieldTaxol} mg/L</div>
            </div>
            <button
              onClick={() => audioManager.play('celebration')}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition"
            >
              Harvest Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT DEFINITION
// ==========================================
export interface C12_BiotechPlantTissueCultureCBSESimProps {
  onComplete?: (score: number) => void;
}

export const C12_BiotechPlantTissueCultureCBSESim: React.FC<C12_BiotechPlantTissueCultureCBSESimProps> = ({
  onComplete,
}) => {
  // Navigation Tabs: 'discovery' | 'lab' | 'challenges' | 'diagnostic' | 'summary'
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'diagnostic' | 'summary'>('discovery');

  // Interactive Lab Selected Step (0 to 4)
  const [currentLabStep, setCurrentLabStep] = useState<number>(0);

  // Auxin & Cytokinin Sliders State (Lab 1)
  const [auxin, setAuxin] = useState<number>(1.0);
  const [cytokinin, setCytokinin] = useState<number>(1.0);

  // Discovery Question State
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Challenge Mode State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [score, setScore] = useState<number>(0);

  // Diagnostic Quiz State
  const [diagnosticIndex, setDiagnosticIndex] = useState<number>(0);
  const [diagnosticSelected, setDiagnosticSelected] = useState<number | null>(null);
  const [diagnosticSubmitted, setDiagnosticSubmitted] = useState<boolean>(false);
  const [diagnosticScore, setDiagnosticScore] = useState<number>(0);

  // Audio & Speech Toggles
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(true);

  // Auto-hint timer state
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Feedback FX states
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // BKT State tracking (Map of node ID -> BKTState)
  const [bktMap, setBktMap] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  // SRS State tracking
  const [srsMap, setSrsMap] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Reset Inactivity Hint Timer on User Interaction
  const resetInactivityTimer = useCallback(() => {
    setShowHint(false);
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges') {
        const chal = CHALLENGES[currentChallengeIndex];
        setCurrentHint(chal.hints[0] || 'Take your time to analyze the question carefully.');
        setShowHint(true);
        if (audioEnabled) audioManager.play('hint');
        if (speechEnabled) speechManager.speak(chal.hints[0]);
      }
    }, 10000); // 10 seconds inactivity trigger
  }, [activeTab, currentChallengeIndex, audioEnabled, speechEnabled]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, currentChallengeIndex, activeTab]);

  // Overall Mastery Calculation across 32 nodes
  const overallMastery = useMemo(() => {
    let total = 0;
    ALL_NODE_IDS.forEach((id) => {
      total += masteryProb(bktMap[id]);
    });
    return Math.round((total / ALL_NODE_IDS.length) * 100);
  }, [bktMap]);

  // Handlers for Discovery Question
  const handleDiscoverySubmit = (index: number) => {
    setDiscoveryAnswer(index);
    setDiscoverySubmitted(true);
    if (index === DISCOVERY_QUESTION.correctIndex) {
      if (audioEnabled) audioManager.play('success');
      if (speechEnabled) speechManager.speak('Correct discovery! Gottlieb Haberlandt first proposed cell totipotency in 1902.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      if (audioEnabled) audioManager.play('error');
    }
  };

  // Challenge Handling
  const currentChal = CHALLENGES[currentChallengeIndex];

  const handleChallengeAnswer = () => {
    resetInactivityTimer();
    let isCorrect = false;

    if (currentChal.type === 'numeric') {
      const val = parseFloat(numericAnswer);
      if (!isNaN(val) && currentChal.correctAnswer !== undefined) {
        const tol = currentChal.tolerance || 0.1;
        if (Math.abs(val - currentChal.correctAnswer) <= tol) {
          isCorrect = true;
        }
      }
    } else {
      if (selectedOption === currentChal.correctIndex) {
        isCorrect = true;
      }
    }

    // BKT & SRS Update
    const nodeId = currentChal.nodeId;
    const currentBKT = bktMap[nodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktMap((prev) => ({ ...prev, [nodeId]: updatedBKT }));

    const currentSRS = srsMap[nodeId] || createReviewItem(nodeId);
    const updatedSRS = sm2Update(currentSRS, isCorrect ? 4 : 1);
    setSrsMap((prev) => ({ ...prev, [nodeId]: updatedSRS }));

    if (isCorrect) {
      setScore((prev) => prev + (currentChal.difficulty === 'advanced' ? 30 : currentChal.difficulty === 'standard' ? 20 : 10));
      setChallengeFeedback({ isCorrect: true, message: 'Excellent! Correct answer: ' + currentChal.explanation });
      if (audioEnabled) audioManager.play('celebration');
      if (speechEnabled) speechManager.speak('Correct! ' + currentChal.explanation);
      setShowSuccess(true);
      setShowSparkle(true);
      setTimeout(() => {
        setShowSuccess(false);
        setShowSparkle(false);
      }, 2500);
    } else {
      setChallengeFeedback({ isCorrect: false, message: 'Incorrect. ' + currentChal.explanation });
      if (audioEnabled) audioManager.play('error');
    }
  };

  const handleNextChallenge = () => {
    setSelectedOption(null);
    setNumericAnswer('');
    setChallengeFeedback(null);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      // Completed all challenges
      recordGameScore('c12_bt_cbse_tissue_culture', score);
      if (onComplete) onComplete(score);
      setActiveTab('summary');
    }
  };

  // Diagnostic Quiz Handler
  const handleDiagnosticSubmit = () => {
    if (diagnosticSelected === null) return;
    setDiagnosticSubmitted(true);
    const diag = DIAGNOSTIC_QUESTIONS[diagnosticIndex];
    const isCorrect = diagnosticSelected === diag.correctIndex;

    if (isCorrect) {
      setDiagnosticScore((prev) => prev + 1);
      if (audioEnabled) audioManager.play('chime');
    } else {
      if (audioEnabled) audioManager.play('error');
    }
  };

  const handleNextDiagnostic = () => {
    setDiagnosticSelected(null);
    setDiagnosticSubmitted(false);
    if (diagnosticIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setDiagnosticIndex((prev) => prev + 1);
    } else {
      setActiveTab('summary');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Feedback Overlay Components */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
      <HintBubble show={showHint} text={currentHint} />

      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-600/50 rounded-full text-xs font-mono font-bold">
              ISC / CBSE Class 12 Biotechnology
            </span>
            <span className="text-xs text-slate-400 font-mono">32 Node Mastery Graph</span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight mt-1">
            {SCENARIO.title}
          </h1>
        </div>

        {/* Global Stats & Controls */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-xs text-slate-400 font-medium">BKT Topic Mastery</div>
            <div className="text-lg font-mono font-bold text-emerald-400">{overallMastery}%</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400 font-medium">Sim Score</div>
            <div className="text-lg font-mono font-bold text-gold-400">{score} pts</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`p-2 rounded-xl border transition text-xs ${
                audioEnabled ? 'bg-slate-800 text-emerald-400 border-emerald-600/40' : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
              title="Toggle Audio Effects"
            >
              🔊 {audioEnabled ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={() => setSpeechEnabled(!speechEnabled)}
              className={`p-2 rounded-xl border transition text-xs ${
                speechEnabled ? 'bg-slate-800 text-gold-400 border-gold-600/40' : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
              title="Toggle Voice Explanations"
            >
              🗣️ {speechEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs Bar */}
      <nav className="bg-slate-900/60 border-b border-slate-800 px-6 py-2 flex overflow-x-auto gap-2">
        <button
          onClick={() => {
            setActiveTab('discovery');
            audioManager.play('pop');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'discovery' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' : 'bg-slate-800/60 text-slate-400 hover:text-white'
          }`}
        >
          🔍 1. Discovery Concept
        </button>
        <button
          onClick={() => {
            setActiveTab('lab');
            audioManager.play('pop');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'lab' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' : 'bg-slate-800/60 text-slate-400 hover:text-white'
          }`}
        >
          🧪 2. Interactive Virtual Lab (5 Labs)
        </button>
        <button
          onClick={() => {
            setActiveTab('challenges');
            audioManager.play('pop');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'challenges' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' : 'bg-slate-800/60 text-slate-400 hover:text-white'
          }`}
        >
          🎯 3. Adaptive Challenges ({CHALLENGES.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('diagnostic');
            audioManager.play('pop');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'diagnostic' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' : 'bg-slate-800/60 text-slate-400 hover:text-white'
          }`}
        >
          📝 4. Diagnostic Quiz
        </button>
        <button
          onClick={() => {
            setActiveTab('summary');
            audioManager.play('pop');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'summary' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' : 'bg-slate-800/60 text-slate-400 hover:text-white'
          }`}
        >
          📊 5. Industry Summary & Real World
        </button>
      </nav>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto p-6">
        {/* ========================================== */}
        {/* TAB 1: DISCOVERY CONCEPT */}
        {/* ========================================== */}
        {activeTab === 'discovery' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Context & Narrative Banner */}
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-gold-950 p-6 rounded-3xl border border-emerald-600/30 shadow-2xl">
              <h2 className="text-xl font-bold text-emerald-400 font-mono mb-2">Scenario & Objectives</h2>
              <p className="text-slate-200 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-xs leading-relaxed">{SCENARIO.context}</p>
            </div>

            {/* Discovery Counterintuitive Question */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-amber-950 text-amber-400 border border-amber-600/50 rounded-full text-xs font-mono font-bold">
                  Preconception Discovery Question
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-100">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 gap-3">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`p-4 rounded-2xl text-left border transition text-sm ${
                      discoverySubmitted
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                          : discoveryAnswer === idx
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : 'bg-slate-950/40 border-slate-800 text-slate-500'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-600 text-slate-300'
                    }`}
                  >
                    <span className="font-mono font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {option}
                  </button>
                ))}
              </div>

              {discoverySubmitted && (
                <div className="p-4 bg-emerald-950/50 border border-emerald-600/40 rounded-2xl text-xs text-emerald-300 space-y-2">
                  <div className="font-bold flex items-center gap-2">
                    �� Insight & Historical Discovery:
                  </div>
                  <p>{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>

            {/* Render Prediction Questions section as requested */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
              <h3 className="text-lg font-bold text-gold-400 font-mono">Prediction Hypotheses & Lab Verification</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PREDICTION_QUESTIONS.map((pq, idx) => (
                  <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <span className="px-2.5 py-0.5 bg-gold-950 border border-gold-600/40 rounded-full text-xs text-gold-400 font-mono">
                      Prediction #{idx + 1}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-200">{pq.question}</h4>
                    <div className="space-y-1.5">
                      {pq.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-xl text-xs border ${
                            oIdx === pq.correctIndex
                              ? 'bg-emerald-950/40 border-emerald-600/40 text-emerald-300 font-semibold'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gold-300 font-mono bg-gold-950/30 p-2.5 rounded-xl border border-gold-800/40">
                      🔍 Lab Verification: {pq.verifyInstruction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 2: INTERACTIVE VIRTUAL LABS */}
        {/* ========================================== */}
        {activeTab === 'lab' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Lab Explorer Tabs (EXPLORATION_STEPS.map()) */}
            <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex overflow-x-auto gap-2">
              {EXPLORATION_STEPS.map((lab, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentLabStep(index);
                    audioManager.play('pop');
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    currentLabStep === index
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                      : 'bg-slate-950/60 text-slate-400 hover:text-white'
                  }`}
                >
                  {lab.title}
                </button>
              ))}
            </div>

            {/* Instruction Banner for Current Step */}
            <div className="p-4 bg-emerald-950/40 border border-emerald-600/30 rounded-2xl text-xs text-emerald-300 flex items-center gap-3">
              <span className="text-lg">📌</span>
              <div>
                <span className="font-bold">{EXPLORATION_STEPS[currentLabStep].title}:</span>{' '}
                {EXPLORATION_STEPS[currentLabStep].instruction}
              </div>
            </div>

            {/* Render Active Sub-Simulator Component */}
            {currentLabStep === 0 && (
              <AuxinCytokininLab auxin={auxin} cytokinin={cytokinin} setAuxin={setAuxin} setCytokinin={setCytokinin} />
            )}
            {currentLabStep === 1 && <AsepticSterilizationLab />}
            {currentLabStep === 2 && <ProtoplastFusionLab />}
            {currentLabStep === 3 && <SyntheticSeedMeristemLab />}
            {currentLabStep === 4 && <SecondaryMetaboliteLab />}

            {/* Render Observation Questions Section */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
              <h3 className="text-lg font-bold text-amber-400 font-mono">Laboratory Observation Log</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {OBSERVATION_QUESTIONS.map((oq, idx) => (
                  <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <span className="px-2 py-0.5 bg-amber-950 border border-amber-600/40 rounded-full text-xs text-amber-400 font-mono">
                      Observation Check #{idx + 1}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-200">{oq.question}</h4>
                    <div className="space-y-1.5">
                      {oq.observableOptions.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-xl text-xs border ${
                            oIdx === oq.correctIndex
                              ? 'bg-amber-950/40 border-amber-600/40 text-amber-200 font-semibold'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 3: ADAPTIVE CHALLENGES (22+ ITEMS) */}
        {/* ========================================== */}
        {activeTab === 'challenges' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Progress Header */}
            <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-400 font-mono">Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}</span>
                <div className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                      currentChal.difficulty === 'foundation'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-600'
                        : currentChal.difficulty === 'standard'
                        ? 'bg-gold-950 text-gold-400 border border-gold-600'
                        : 'bg-purple-950 text-purple-400 border border-purple-600'
                    }`}
                  >
                    {currentChal.difficulty.toUpperCase()}
                  </span>
                  <span>{currentChal.competencyLevel}</span>
                </div>
              </div>

              {/* Node ID Badge */}
              <span className="px-3 py-1 bg-slate-950 border border-slate-700 rounded-full text-xs text-slate-400 font-mono">
                Node: {currentChal.nodeId}
              </span>
            </div>

            {/* Challenge Card */}
            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 space-y-6">
              <h3 className="text-xl font-semibold text-slate-100 leading-relaxed">{currentChal.question}</h3>

              {/* Multiple Choice Options */}
              {currentChal.type === 'multiple-choice' && currentChal.options && (
                <div className="grid grid-cols-1 gap-3">
                  {currentChal.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedOption(idx);
                        audioManager.play('pop');
                      }}
                      className={`p-4 rounded-2xl text-left border transition text-sm ${
                        selectedOption === idx
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200 font-semibold shadow-lg'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="font-mono font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {/* Numeric Input Option */}
              {currentChal.type === 'numeric' && (
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <input
                      type="number"
                      step="any"
                      placeholder={`Enter numerical value in ${currentChal.unit || 'units'}`}
                      value={numericAnswer}
                      onChange={(e) => setNumericAnswer(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-mono text-lg focus:outline-none focus:border-emerald-500"
                    />
                    <span className="self-center font-mono text-slate-400 text-sm">{currentChal.unit}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    setCurrentHint(currentChal.hints[0]);
                    setShowHint(true);
                    audioManager.play('hint');
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700"
                >
                  💡 Need Hint
                </button>

                {!challengeFeedback ? (
                  <button
                    onClick={handleChallengeAnswer}
                    disabled={currentChal.type === 'numeric' ? numericAnswer.trim() === '' : selectedOption === null}
                    className={`px-6 py-3 rounded-2xl text-sm font-bold transition shadow-lg ${
                      (currentChal.type === 'numeric' && numericAnswer.trim() !== '') || selectedOption !== null
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-2xl text-sm font-bold shadow-lg shadow-gold-900/40 transition"
                  >
                    Next Challenge →
                  </button>
                )}
              </div>

              {/* Feedback Alert */}
              {challengeFeedback && (
                <div
                  className={`p-5 rounded-2xl border text-xs leading-relaxed ${
                    challengeFeedback.isCorrect
                      ? 'bg-emerald-950/60 border-emerald-600/50 text-emerald-300'
                      : 'bg-rose-950/60 border-rose-600/50 text-rose-300'
                  }`}
                >
                  <div className="font-bold text-sm mb-1">
                    {challengeFeedback.isCorrect ? '✅ Excellent Work!' : '❌ Incorrect Solution'}
                  </div>
                  <p>{challengeFeedback.message}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 4: DIAGNOSTIC QUIZ */}
        {/* ========================================== */}
        {activeTab === 'diagnostic' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-mono">
                  Diagnostic Question {diagnosticIndex + 1} of {DIAGNOSTIC_QUESTIONS.length}
                </span>
                <span className="text-xs text-emerald-400 font-mono font-bold">Score: {diagnosticScore} / {diagnosticIndex}</span>
              </div>

              <h3 className="text-lg font-semibold text-slate-100">
                {DIAGNOSTIC_QUESTIONS[diagnosticIndex].question}
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {DIAGNOSTIC_QUESTIONS[diagnosticIndex].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setDiagnosticSelected(idx)}
                    className={`p-4 rounded-2xl text-left border text-sm transition ${
                      diagnosticSelected === idx
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-200 font-semibold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="font-mono font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                {!diagnosticSubmitted ? (
                  <button
                    onClick={handleDiagnosticSubmit}
                    disabled={diagnosticSelected === null}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-lg"
                  >
                    Confirm Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextDiagnostic}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold transition shadow-lg"
                  >
                    Continue Quiz →
                  </button>
                )}
              </div>

              {diagnosticSubmitted && (
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-300">
                  <span className="font-bold text-emerald-400">Explanation: </span>
                  {DIAGNOSTIC_QUESTIONS[diagnosticIndex].explanation}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 5: SUMMARY & REAL-WORLD ENTERPRISE */}
        {/* ========================================== */}
        {activeTab === 'summary' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Real World Activity (Rendered exact structure) */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-600/50 rounded-full text-xs font-mono font-bold">
                  Industrial Bioprocess Activity
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-100">{REAL_WORLD_ACTIVITY.title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-emerald-400 font-mono">Standard Operating Execution Steps:</h3>
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 font-bold rounded font-mono">{idx + 1}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Misconceptions Matrix */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
              <h3 className="text-lg font-bold text-rose-400 font-mono">Common Misconceptions & Scientific Corrections</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((m, idx) => (
                  <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-rose-400 flex items-center gap-2">
                      ⚠️ Misconception #{idx + 1}
                    </div>
                    <p className="text-xs text-slate-300 font-semibold">{m.misconception}</p>
                    <div className="p-3 bg-emerald-950/40 border border-emerald-600/30 rounded-xl text-xs text-emerald-300 mt-2">
                      <span className="font-bold">Correction: </span>
                      {m.correction}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 32 Node Graph Mastery Breakdown */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-gold-400 font-mono">Curriculum Node Graph BKT Tracker</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 text-center">
                {ALL_NODE_IDS.map((nodeId, idx) => {
                  const pMastery = masteryProb(bktMap[nodeId]);
                  return (
                    <div key={idx} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1">
                      <div className="text-[10px] text-slate-500 font-mono">{nodeId.replace('c12_bt_cbse_', 'Node ')}</div>
                      <div className="text-xs font-bold text-emerald-400 font-mono">
                        {(pMastery * 100).toFixed(0)}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default C12_BiotechPlantTissueCultureCBSESim;