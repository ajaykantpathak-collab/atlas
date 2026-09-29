'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// ALL 45 NODE IDS COVERED IN THIS SIMULATION
// ==========================================
const ALL_NODE_IDS = [
  'c12_bt_cbse_025', 'c12_bt_cbse_026', 'c12_bt_cbse_027', 'c12_bt_cbse_028', 'c12_bt_cbse_029',
  'c12_bt_cbse_030', 'c12_bt_cbse_031', 'c12_bt_cbse_032', 'c12_bt_cbse_033', 'c12_bt_cbse_034',
  'c12_bt_cbse_035', 'c12_bt_cbse_036', 'c12_bt_cbse_037', 'c12_bt_cbse_038', 'c12_bt_cbse_039',
  'c12_bt_cbse_040', 'c12_bt_cbse_041', 'c12_bt_cbse_042', 'c12_bt_cbse_043', 'c12_bt_cbse_044',
  'c12_bt_cbse_045', 'c12_bt_cbse_046', 'c12_bt_cbse_047', 'c12_bt_cbse_048', 'c12_bt_cbse_049',
  'c12_bt_cbse_050', 'c12_bt_cbse_051', 'c12_bt_cbse_052', 'c12_bt_cbse_053', 'c12_bt_cbse_054',
  'c12_bt_cbse_055', 'c12_bt_cbse_056', 'c12_bt_cbse_057', 'c12_bt_cbse_058', 'c12_bt_cbse_059',
  'c12_bt_cbse_060', 'c12_bt_cbse_061', 'c12_bt_cbse_062', 'c12_bt_cbse_063', 'c12_bt_cbse_064',
  'c12_bt_cbse_065', 'c12_bt_cbse_066', 'c12_bt_cbse_067', 'c12_bt_cbse_068', 'c12_bt_cbse_069'
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// INTERFACES & TYPES
// ==========================================
interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple-choice' | 'drag-sort' | 'numeric' | 'matching';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string | number;
  dragItems?: string[];
  matchingPairs?: { left: string; right: string }[];
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

interface Misconception {
  title: string;
  fallacy: string;
  truth: string;
  correctionDetail: string;
  nodeId: NodeId;
}

interface ExplorationStep {
  title: string;
  instruction: string;
  interactionType: string;
  nodeId: NodeId;
}

interface PredictionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  verifyInstruction: string;
  nodeId: NodeId;
}

interface ObservationQuestion {
  question: string;
  observableOptions: string[];
  correctIndex: number;
  nodeId: NodeId;
}

interface RealWorldActivity {
  title: string;
  description: string;
  steps: string[];
}

interface CellLineState {
  type: 'primary_fibroblast' | 'continuous_cho' | 'hela_immortal';
  cultureMode: 'adherent' | 'suspension';
  mediaType: 'DMEM_high_glucose' | 'RPMI_1640' | 'Serum_Free_CHO';
  serumPercent: number; // 0 - 20 %
  temperature: number; // 20 - 45 °C
  co2Percent: number; // 0 - 10 %
  hepesmM: number; // 0 - 25 mM
  passageNumber: number;
  confluence: number; // 0 - 100 %
  viability: number; // 0 - 100 %
  ph: number;
  osmolality: number; // mOsm/kg
  isContaminated: boolean;
  timeElapsedHours: number;
}

// ==========================================
// SCENARIO & CURRICULUM SECTIONS
// ==========================================
const SCENARIO = {
  title: 'Advanced Bioopharmaceutical Cell Culture & Process Engineering Lab',
  intro: 'Welcome to the Central Bioprocess Institute. As lead bioprocess scientist, you are tasked with optimizing mammalian cell cultures to manufacture life-saving biological drugs like Erythropoietin (EPO), Tissue Plasminogen Activator (tPA), and Monoclonal Antibodies (Trastuzumab).',
  context: 'You will regulate incubators, manage media compositions, control pH using CO2/Bicarbonate and HEPES buffers, execute subculturing (passaging) using trypsinization, conduct viability assays (Trypan Blue exclusion & MTT), and scale up biomanufacturing while avoiding senescent crisis or bacterial contamination.'
};

const DISCOVERY_QUESTION = {
  question: 'When human cells in culture reach 100% confluence, primary cells stop dividing due to contact inhibition, but cancer-derived continuous cell lines (like HeLa) continue piling up. What metabolic change causes the culture medium to rapidly turn yellow (acidic) during overgrowth?',
  options: [
    'Accumulation of alkaline ammonia from amino acid breakdown',
    'High lactic acid production from accelerated glycolytic flux (Warburg Effect)',
    'Depletion of carbon dioxide from the incubation atmosphere',
    'Secretion of basic trypsin enzymes by overgrown adherent cells'
  ],
  correctIndex: 1,
  hintAfter: 'Continuous cancer cell lines rely heavily on aerobic glycolysis, producing high amounts of lactic acid which reacts with bicarbonate buffer, dropping pH and turning Phenol Red yellow!'
};

const EXPLORATION_STEPS: ExplorationStep[] = [
  {
    title: 'Lab 1: Environment & Microscopic Morphology',
    instruction: 'Adjust Temperature (37°C) and CO2 (5%) to maintain optimal pH (7.2 - 7.4). Switch between Primary Fibroblasts and CHO lines under the inverted microscope to observe contact inhibition and adherent monolayer growth.',
    interactionType: 'incubator_environmental_control',
    nodeId: 'c12_bt_cbse_066'
  },
  {
    title: 'Lab 2: Passaging & Trypsinization Kinetics',
    instruction: 'Monitor confluence as cells grow. When confluence exceeds 85%, apply Trypsin-EDTA to detach adherent cells, wash, count via dye exclusion, and seed secondary subcultures.',
    interactionType: 'passaging_enzymatic_detachment',
    nodeId: 'c12_bt_cbse_028'
  },
  {
    title: 'Lab 3: Culture Media & Serum Optimization',
    instruction: 'Compare complex media formulations (DMEM vs RPMI vs Serum-Free). Test the impact of Fetal Bovine Serum (FBS) vs Chemically Defined Supplements on growth rates and virus contamination risks.',
    interactionType: 'media_formulation_slider',
    nodeId: 'c12_bt_cbse_053'
  },
  {
    title: 'Lab 4: Viability & Cytotoxicity Assays',
    instruction: 'Perform Trypan Blue exclusion (counting blue vs clear cells) and MTT tetrazolium reduction assays (measuring purple formazan crystals in mitochondrial dehydrogenases) to quantify cell viability.',
    interactionType: 'viability_assay_spectrophotometry',
    nodeId: 'c12_bt_cbse_030'
  },
  {
    title: 'Lab 5: Biopharmaceutical Bioreactor Production',
    instruction: 'Scale up CHO cells in suspension bioreactors to synthesize recombinant proteins (Erythropoietin & Trastuzumab) and optimize harvesting efficiency.',
    interactionType: 'bioreactor_protein_harvest',
    nodeId: 'c12_bt_cbse_035'
  }
];

const PREDICTION_QUESTIONS: PredictionQuestion[] = [
  {
    question: 'Predict: What happens to the pH of culture medium containing Phenol Red if the CO2 incubator door is left open, dropping CO2 from 5% to ambient levels (0.04%)?',
    options: [
      'Medium becomes acidic and turns bright yellow',
      'Medium becomes alkaline (pH > 7.8) and turns deep purple/magenta',
      'pH remains unchanged at 7.4 because sodium bicarbonate is a static salt',
      'Medium precipitates immediately into solid gelatinous collagen'
    ],
    correctIndex: 1,
    verifyInstruction: 'Set incubator CO2 level to 0% in Lab 1 and observe the Phenol Red indicator shift to purple as dissolved CO2 outgasses!',
    nodeId: 'c12_bt_cbse_062'
  },
  {
    question: 'Predict: What is the main outcome when primary human diploid fibroblasts undergo repeated subculturing for over 50 passages?',
    options: [
      'They spontaneously transform into immortalized HeLa continuous lines',
      'They reach the Hayflick limit, enter cellular senescence, and cease dividing',
      'They switch to suspension growth and stop requiring cell culture flasks',
      'They increase their doubling rate by 10-fold'
    ],
    correctIndex: 1,
    verifyInstruction: 'Select Primary Fibroblasts and advance passage number past 50 in Lab 2 to observe Hayflick senescence!',
    nodeId: 'c12_bt_cbse_025'
  }
];

const OBSERVATION_QUESTIONS: ObservationQuestion[] = [
  {
    question: 'What color does Phenol Red turn when cell density causes severe lactic acid accumulation in un-refreshed media?',
    observableOptions: [
      'Deep Purple (pH > 7.8)',
      'Bright Yellow (pH < 6.8)',
      'Cherry Red (pH 7.2 - 7.4)',
      'Colorless transparent'
    ],
    correctIndex: 1,
    nodeId: 'c12_bt_cbse_064'
  },
  {
    question: 'In Trypan Blue exclusion assay, why do non-viable (dead) cells stain blue while living cells remain clear transparent?',
    observableOptions: [
      'Intact cell membranes of live cells exclude the charged dye; damaged membranes of dead cells absorb it',
      'Live cells metabolize Trypan Blue into a colorless solution',
      'Dead cells produce mitochondrial enzymes that turn blue',
      'Trypan Blue binds specifically to nuclear DNA of dividing live cells'
    ],
    correctIndex: 0,
    nodeId: 'c12_bt_cbse_030'
  }
];

const REAL_WORLD_ACTIVITY: RealWorldActivity = {
  title: 'Industrial Bioreactor Scale-Up: Erythropoietin (EPO) Production',
  description: 'Design an industrial CHO (Chinese Hamster Ovary) suspension culture run to produce recombinant Erythropoietin for treating renal anemia.',
  steps: [
    'Step 1: Inoculate a 5L seed bioreactor with CHO cells at 0.3 x 10^6 cells/mL in serum-free chemically defined media.',
    'Step 2: Maintain 37°C, 5% CO2, dissolved oxygen (DO) at 40%, and osmolality at 310 mOsm/kg.',
    'Step 3: Monitor glucose consumption and feed batch nutrient supplement on Day 3 to prevent lactate toxicity.',
    'Step 4: Harvest supernatant on Day 7 when cell density reaches 12 x 10^6 cells/mL with >92% viability, yielding high-purity glycosylated EPO.'
  ]
};

// ==========================================
// 6 MISCONCEPTIONS WITH CORRECTIONS
// ==========================================
const MISCONCEPTIONS: Misconception[] = [
  {
    title: 'Finite vs Continuous Cell Lines',
    fallacy: 'All animal cells can grow indefinitely in culture if given enough nutrient serum.',
    truth: 'Primary animal cells have a finite lifespan defined by the Hayflick limit (~40-60 divisions).',
    correctionDetail: 'Only continuous (immortalized or transformed) cell lines, such as HeLa or CHO, bypass senescence due to telomerase reactivations or viral oncogenes.',
    nodeId: 'c12_bt_cbse_025'
  },
  {
    title: 'Role of CO2 in Incubator',
    fallacy: 'CO2 gas is added to incubators as a metabolic respiratory reactant for animal cell mitochondria.',
    truth: 'CO2 is required to maintain the dissolved CO2 / Bicarbonate buffer equilibrium in culture media.',
    correctionDetail: 'Mammalian cells produce CO2 via respiration; environmental CO2 in incubators prevents dissolved CO2 from outgassing, stabilizing pH at ~7.4.',
    nodeId: 'c12_bt_cbse_062'
  },
  {
    title: 'Serum Function in Media',
    fallacy: 'Fetal Bovine Serum (FBS) serves purely as an energy source (calories/glucose) for cell growth.',
    truth: 'Serum provides growth factors, hormones, attachment factors (fibronectin), and carrier proteins.',
    correctionDetail: 'Glucose in basal synthetic media (DMEM) provides energy. Serum delivers polypeptide growth factors (PDGF, EGF) required for cell cycle progression.',
    nodeId: 'c12_bt_cbse_053'
  },
  {
    title: 'Trypan Blue vs MTT Assays',
    fallacy: 'Trypan Blue measures mitochondrial metabolic enzyme activity.',
    truth: 'Trypan Blue assesses membrane integrity (dye exclusion), whereas MTT measures mitochondrial dehydrogenase activity.',
    correctionDetail: 'Trypan Blue enters cells with ruptured plasma membranes (dead cells). MTT is reduced by active mitochondrial enzymes into purple formazan crystals.',
    nodeId: 'c12_bt_cbse_031'
  },
  {
    title: 'Laminar Flow Hood Sterility',
    fallacy: 'A Class II Biosafety Cabinet destroys micro-organisms and sterilizes dirty tools via airflow.',
    truth: 'Biosafety cabinets protect cultures from airborne contamination using HEPA filtration; they do not sterilize dirty items.',
    correctionDetail: 'Items placed inside hoods must be pre-sterilized by autoclaving or 70% ethanol wipedown. HEPA filters only purify incoming air streams.',
    nodeId: 'c12_bt_cbse_065'
  },
  {
    title: 'In Vitro Glycosylation',
    fallacy: 'Recombinant biotherapeutic proteins like Erythropoietin (EPO) can be produced with full biological activity in E. coli bacterial cultures.',
    truth: 'Complex biotherapeutic proteins require mammalian cell lines (CHO) for post-translational modifications like glycosylation.',
    correctionDetail: 'Bacteria lack endoplasmic reticulum and Golgi machinery needed for N-linked glycosylation, causing unglycosylated bacterial EPO to be inactive in vivo.',
    nodeId: 'c12_bt_cbse_036'
  }
];

// ==========================================
// 24 CHALLENGES (Foundation, Standard, Advanced)
// ==========================================
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (8 Challenges) ---
  {
    id: 'c_f1',
    nodeId: 'c12_bt_cbse_025',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which of the following describes a key difference between finite cell lines and continuous cell lines?',
    options: [
      'Finite cell lines grow indefinitely; continuous lines die after 10 passages',
      'Finite cell lines undergo a limited number of cell divisions (Hayflick limit); continuous lines are immortalized',
      'Finite cell lines always grow in suspension; continuous lines are exclusively adherent',
      'Finite cell lines do not require serum; continuous lines require 50% serum'
    ],
    correctIndex: 1,
    explanation: 'Finite cell lines originate from normal tissues and cease dividing after 40-60 population doublings (Hayflick limit). Continuous cell lines have transformed/immortal characteristics enabling unlimited proliferation.',
    hints: [
      'Think about the Hayflick limit.',
      'Normal human somatic cells cannot divide forever.',
      'Continuous lines are transformed or tumor-derived (immortal).'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'c_f2',
    nodeId: 'c12_bt_cbse_045',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'The famous HeLa cell line, derived from cervical cancer tissue of Henrietta Lacks in 1951, is classified as a:',
    options: [
      'Primary human finite fibroblast line',
      'Continuous human epithelial cell line',
      'Plant callus cell line',
      'Bacterial continuous culture'
    ],
    correctIndex: 1,
    explanation: 'HeLa was the first human continuous (immortal) cell line established, originating from epithelial cervical cancer cells of Henrietta Lacks.',
    hints: [
      'HeLa cells are cancer-derived.',
      'They divide indefinitely in culture.',
      'They are continuous human epithelial cells.'
    ]
  },
  {
    id: 'c_f3',
    nodeId: 'c12_bt_cbse_064',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Phenol Red is widely added to cell culture media as a pH indicator. What color indicates optimal cell culture pH (7.2 - 7.4)?',
    options: [
      'Bright Yellow',
      'Deep Purple/Magenta',
      'Red to Orange-Red',
      'Colorless Clear'
    ],
    correctIndex: 2,
    explanation: 'At physiological pH 7.2 - 7.4, Phenol Red turns red/orange-red. It shifts to yellow below pH 6.8 (acidic) and purple above pH 7.8 (alkaline).',
    hints: [
      'Yellow is acidic.',
      'Purple is basic/alkaline.',
      'Red-orange represents physiological pH (~7.4).'
    ]
  },
  {
    id: 'c_f4',
    nodeId: 'c12_bt_cbse_030',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'In a Trypan Blue exclusion assay, why do viable (living) cells remain unstained?',
    options: [
      'Viable cells actively digest the blue dye into glucose',
      'Intact cell membranes of viable cells exclude the blue dye, while damaged membranes of dead cells absorb it',
      'Viable cells secrete an anti-blue protein shield',
      'Trypan blue only binds to dead bacterial cell walls'
    ],
    correctIndex: 1,
    explanation: 'Trypan Blue is a membrane-impermeable dye. Intact cell membranes in living cells prevent entry, whereas non-viable cells with compromised membranes absorb the blue stain.',
    hints: [
      'Think about membrane integrity.',
      'Live cell membranes act as a selective barrier.',
      'Damaged membranes let the dye leak inside.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'c_f5',
    nodeId: 'c12_bt_cbse_066',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What standard physiological conditions are maintained inside a typical mammalian cell culture CO2 incubator?',
    options: [
      '25°C, 0% CO2, 10% humidity',
      '37°C, 5% CO2, 95% relative humidity',
      '42°C, 20% CO2, 50% relative humidity',
      '30°C, 10% CO2, 100% relative humidity'
    ],
    correctIndex: 1,
    explanation: 'Mammalian cells require 37°C body temperature, 5% CO2 for bicarbonate buffer equilibrium, and high humidity (~95%) to prevent media evaporation.',
    hints: [
      'Body temperature is 37°C.',
      'CO2 buffering requires 5%.',
      'High humidity prevents drying out.'
    ]
  },
  {
    id: 'c_f6',
    nodeId: 'c12_bt_cbse_065',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What type of air filtration device is essential in Biosafety Cabinets and Laminar Flow Hoods to maintain a sterile airflow?',
    options: [
      'HEPA (High-Efficiency Particulate Air) filter',
      'Charcoal carbon filter',
      'Reverse osmosis membrane filter',
      'Standard fiberglass furnace filter'
    ],
    correctIndex: 0,
    explanation: 'HEPA filters remove at least 99.97% of airborne particles 0.3 µm or larger, providing sterile particulate-free air inside cell culture hoods.',
    hints: [
      'Stands for High-Efficiency Particulate Air.',
      'Filters micro-particles and microbes.',
      'Used in cleanrooms and culture hoods.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'c_f7',
    nodeId: 'c12_bt_cbse_067',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Why is an INVERTED microscope used to observe living adherent cell cultures in culture flasks, rather than a conventional light microscope?',
    options: [
      'Inverted microscopes magnify cells by 1,000,000x using electrons',
      'The light source is above and objectives are below, accommodating thick vessels filled with liquid media',
      'Inverted microscopes freeze liquid media so cells do not swim around',
      'Conventional microscopes cannot transmit light through plastic'
    ],
    correctIndex: 1,
    explanation: 'Inverted microscopes position objective lenses below the culture vessel stage, allowing clear focus on adherent cells settling at the bottom of flasks covered in liquid medium.',
    hints: [
      'Culture flasks contain liquid media on top of cells.',
      'Objectives below allow short working distances to cell monolayers.',
      'Light comes from top down.'
    ]
  },
  {
    id: 'c_f8',
    nodeId: 'c12_bt_cbse_026',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Adherent cell lines require a solid surface coated with extracellular matrix components to attach and spread. What phenomenon stops their division when a monolayer covers the culture dish surface?',
    options: [
      'Metabolic lysis',
      'Contact inhibition',
      'Enzymatic passaging',
      'Cryopreservation failure'
    ],
    correctIndex: 1,
    explanation: 'Contact inhibition is a normal mechanism where cell-to-cell contact signals non-cancerous adherent cells to stop proliferating once a confluent monolayer forms.',
    hints: [
      'Cells touch each other and signal to arrest proliferation.',
      'It creates a single monolayer.',
      'Continuous cancer cells lack this inhibition.'
    ]
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'c_s1',
    nodeId: 'c12_bt_cbse_028',
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Arrange the correct sequential steps for subculturing (passaging) an adherent mammalian cell culture:',
    dragItems: [
      'Aspirate spent medium and wash monolayer with phosphate-buffered saline (PBS)',
      'Add Trypsin-EDTA solution and incubate at 37°C for 3-5 minutes to detach cells',
      'Inactivate trypsin by adding serum-containing complete medium',
      'Centrifuge cell suspension to pellet cells and resuspend in fresh medium',
      'Count cells and seed into new sterile culture flasks at desired seeding density'
    ],
    explanation: 'Passaging step order: 1) Wash out trypsin inhibitors (PBS wash), 2) Enzymatic cleavage (Trypsin-EDTA), 3) Trypsin neutralization (Serum media), 4) Cell pelleting/resuspension, 5) Cell counting & subculture seeding.',
    hints: [
      'Start by washing away spent media and calcium with PBS.',
      'Detach cells using trypsin.',
      'Neutralize trypsin with serum before pelleting.'
    ]
  },
  {
    id: 'c_s2',
    nodeId: 'c12_bt_cbse_062',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'How does the CO2-Bicarbonate buffering system regulate pH in cell culture media?',
    options: [
      'CO2 gas reacts with water to form carbonic acid (H2CO3), balancing bicarbonate anions (HCO3-) in equilibrium',
      'CO2 reacts directly with glucose to produce lactic acid buffers',
      'Bicarbonate neutralizes all oxygen to prevent cellular oxidation',
      'CO2 precipitates amino acids out of solution at low pH'
    ],
    correctIndex: 0,
    explanation: 'Dissolved CO2 gas forms carbonic acid (H2CO3) in water, which dissociates into H+ and bicarbonate (HCO3-). Maintaining 5% CO2 gas in the incubator atmosphere stabilizes pH around 7.2-7.4.',
    hints: [
      'CO2 + H2O <-> H2CO3 <-> H+ + HCO3-',
      '5% atmospheric CO2 balances sodium bicarbonate added to media.',
      'Prevents pH from becoming too basic.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'c_s3',
    nodeId: 'c12_bt_cbse_031',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'In an MTT viability assay, active mitochondrial NAD(P)H-dependent cellular oxidoreductase enzymes reduce yellow MTT tetrazolium salt into what insoluble product?',
    options: [
      'Yellow phenol red solution',
      'Purple insoluble formazan crystals',
      'Clear water and carbon dioxide',
      'Blue trypan dye precipitate'
    ],
    correctIndex: 1,
    explanation: 'Viable metabolically active cells convert soluble yellow MTT into insoluble purple formazan crystals, which are dissolved in DMSO and measured spectrophotometrically at 570 nm.',
    hints: [
      'MTT measures metabolic activity.',
      'The product is purple formazan.',
      'Absorbance correlates directly with living cell numbers.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'c_s4',
    nodeId: 'c12_bt_cbse_029',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Why is Dimethyl Sulfoxide (DMSO) added at 5-10% concentration during cryopreservation of cell lines in liquid nitrogen (-196°C)?',
    options: [
      'DMSO acts as a cryoprotectant that penetrates membranes to prevent ice crystal formation and cell lysis during freezing',
      'DMSO provides energy for cells while stored frozen',
      'DMSO sterilizes the cryovial by killing all bacteria',
      'DMSO permanent locks cell DNA in double helix phase'
    ],
    correctIndex: 0,
    explanation: 'DMSO penetrates cell membranes and lowers the freezing point of water, reducing intracellular ice crystal formation that would otherwise rupture cellular membranes.',
    hints: [
      'Ice crystals puncture cellular membranes.',
      'DMSO is a membrane-permeable cryoprotectant.',
      'Slow freezing rate (-1°C/min) with DMSO preserves cell viability.'
    ]
  },
  {
    id: 'c_s5',
    nodeId: 'c12_bt_cbse_039',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'In Kohler and Milstein’s hybridoma technology for producing Monoclonal Antibodies (mAbs), why are antibody-producing B lymphocytes fused with Myeloma (cancerous B cell) lines?',
    options: [
      'To combine the specific antibody production of B cells with the infinite proliferative capacity (immortality) of myeloma cells',
      'To make B cells resistant to all antibiotics',
      'To destroy the antibody genes inside myeloma cells',
      'To enable growth in serum-free water'
    ],
    correctIndex: 0,
    explanation: 'Primary B lymphocytes produce specific antibodies but die quickly in culture. Myeloma cells are immortal cancer cells. Hybridoma fusion combines antibody specificity with immortality.',
    hints: [
      'B cells make specific antibodies but have finite lifespan.',
      'Myeloma cells are immortal but lack specific antibody production.',
      'Hybridomas combine both traits.'
    ]
  },
  {
    id: 'c_s6',
    nodeId: 'c12_bt_cbse_053',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'While Fetal Bovine Serum (FBS) provides essential growth factors and attachment proteins, what is a primary DISADVANTAGE of using FBS in biopharmaceutical production?',
    options: [
      'FBS prevents cell attachment to plastic culture flasks',
      'High batch-to-batch composition variability and risk of viral or prion contamination',
      'FBS causes media to instantly solidify at 37°C',
      'FBS lowers medium osmolality below 100 mOsm/kg'
    ],
    correctIndex: 1,
    explanation: 'Serum has undefined chemical composition, varies between batches, and poses risks of mycoplasma, viral, or bovine spongiform encephalopathy (BSE) contaminants.',
    hints: [
      'Serum is an undefined biological fluid.',
      'Batch-to-batch variation hinders regulatory compliance.',
      'Risk of animal-derived viral/prion pathogen transmission.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'c_s7',
    nodeId: 'c12_bt_cbse_036',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Why must human Erythropoietin (EPO) biopharmaceutical drug be manufactured in mammalian CHO cell culture rather than E. coli bacteria?',
    options: [
      'Bacteria digest recombinant proteins with trypsin',
      'CHO cells perform complex N-linked glycosylation essential for in vivo stability and bioactivity of EPO',
      'E. coli cannot transcribe eukaryotic mRNA under any condition',
      'EPO causes bacterial cells to lyse instantly'
    ],
    correctIndex: 1,
    explanation: 'Erythropoietin requires specific carbohydrate side-chains (glycosylation) for proper clearance half-life and biological activity in human blood. Bacteria cannot perform glycosylation.',
    hints: [
      'Glycosylation is a post-translational modification.',
      'Bacteria lack ER and Golgi post-translational machinery.',
      'Mammalian CHO cells carry out proper eukaryotic glycosylation.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'c_s8',
    nodeId: 'c12_bt_cbse_063',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'A scientist prepares 500 mL of cell culture medium and adds HEPES buffer to a final concentration of 25 mM (Molar mass of HEPES = 238.3 g/mol). How many grams of HEPES powder must be weighed out?',
    correctAnswer: 2.98,
    explanation: 'Mass (g) = Molarity (mol/L) x Volume (L) x Molar Mass (g/mol) = 0.025 mol/L x 0.5 L x 238.3 g/mol = 2.97875 g ≈ 2.98 g.',
    hints: [
      'Use formula: Mass = Concentration x Volume x Molar Mass',
      '25 mM = 0.025 M',
      '500 mL = 0.5 L'
    ]
  },

  // --- ADVANCED TIER (8 Challenges) ---
  {
    id: 'c_a1',
    nodeId: 'c12_bt_cbse_039',
    type: 'matching',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Match each Biopharmaceutical Product produced via Animal Cell Culture with its Primary Medical Application:',
    matchingPairs: [
      { left: 'Erythropoietin (EPO)', right: 'Treatment of severe anemia in chronic kidney disease' },
      { left: 'Tissue Plasminogen Activator (tPA)', right: 'Dissolving blood clots in acute myocardial infarction / stroke' },
      { left: 'Trastuzumab (Herceptin)', right: 'Targeted therapy for HER2-overexpressing breast cancer' },
      { left: 'OKT-3 (Muromonab-CD3)', right: 'Prevention of acute organ transplant rejection' }
    ],
    explanation: 'EPO stimulates RBC production; tPA activates plasminogen to dissolve arterial clots; Trastuzumab targets HER2 receptors on cancer cells; OKT-3 targets CD3 on T-cells to prevent kidney/liver graft rejection.',
    hints: [
      'EPO relates to red blood cells.',
      'tPA is a clot-busting thrombolytic enzyme.',
      'Trastuzumab targets HER2 breast cancer.',
      'OKT-3 is an immunosuppressive mAb for transplants.'
    ]
  },
  {
    id: 'c_a2',
    nodeId: 'c12_bt_cbse_057',
    type: 'matching',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Match the Category of Synthetic Media with its key Compositional Characteristic:',
    matchingPairs: [
      { left: 'Serum-Containing Media', right: 'Basal media supplemented with 5-10% fetal bovine serum' },
      { left: 'Serum-Free Media (SFM)', right: 'Replaces serum with specific purified hormones & growth factors' },
      { left: 'Protein-Free Media', right: 'Contains no animal or plant proteins, only small peptide hydrolysates' },
      { left: 'Chemically Defined Media (CDM)', right: '100% known chemical structure, completely free of crude extracts' }
    ],
    explanation: 'CDM offers maximum reproducibility as every pure chemical constituent is defined down to microgram quantities, eliminating animal component risks.',
    hints: [
      'Chemically Defined media has zero unknown biological extracts.',
      'Serum-free media uses specific purified growth factors.',
      'Protein-free media contains no proteins or antibodies.'
    ]
  },
  {
    id: 'c_a3',
    nodeId: 'c12_bt_cbse_030',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'In a hemocytometer cell count using Trypan Blue exclusion, a scientist counts 180 unstained (live) cells and 20 blue-stained (dead) cells across 4 large corner squares. What is the cell viability percentage (%)?',
    correctAnswer: 90,
    explanation: 'Viability (%) = [Viable Cells / Total Cells] x 100 = [180 / (180 + 20)] x 100 = (180 / 200) x 100 = 90%.',
    hints: [
      'Total cells = Live cells + Dead cells = 180 + 20 = 200.',
      'Viable percentage = Live cells / Total cells.',
      '180 / 200 = 0.90 = 90%.'
    ]
  },
  {
    id: 'c_a4',
    nodeId: 'c12_bt_cbse_028',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'If a culture dish containing 1 x 10^6 CHO cells has a population doubling time of 24 hours during exponential log phase, how many total cells will be present after 72 hours of uninterrupted growth?',
    correctAnswer: 8,
    explanation: 'Number of doublings n = 72 h / 24 h = 3 doublings. Final cell count = N0 x 2^n = (1 x 10^6) x 2^3 = 8 x 10^6 cells (enter 8 for 10^6 units).',
    hints: [
      'Doubling time = 24 hours.',
      '72 hours = 3 full doubling cycles.',
      'Cell count doubles 3 times: 1 -> 2 -> 4 -> 8.'
    ]
  },
  {
    id: 'c_a5',
    nodeId: 'c12_bt_cbse_061',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'What happens to mammalian cells when placed in a hypertonic culture medium with an osmolality of 450 mOsm/kg (optimal range is 260-320 mOsm/kg)?',
    options: [
      'Water enters cells by osmosis, causing swelling and osmotic lysis',
      'Water leaves cells by osmosis, causing cell shrinkage (crenation), growth arrest, and apoptosis',
      'Osmolality changes do not affect animal cells due to thick cell walls',
      'Cells instantly double their glucose uptake rate'
    ],
    correctIndex: 1,
    explanation: 'Hypertonic media causes rapid osmotic efflux of intracellular water, leading to cell shrinkage, cytoplasmic concentration, metabolic disruption, and eventual apoptosis.',
    hints: [
      'Hypertonic solutions have higher solute concentrations than cytoplasm.',
      'Water moves out of the cell toward higher solute concentration.',
      'Causes cell shrinkage (crenation).'
    ]
  },
  {
    id: 'c_a6',
    nodeId: 'c12_bt_cbse_039',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'In hybridoma selection, why are unfused myeloma cells killed when cultured in HAT (Hypoxanthine-Aminopterin-Thymidine) selection medium?',
    options: [
      'Aminopterin blocks the de novo nucleotide synthesis pathway; HGPRT-deficient myeloma cells cannot utilize the salvage pathway via Hypoxanthine',
      'HAT medium contains high doses of penicillin that selectively lyses myeloma cells',
      'Hypoxanthine poisons the cell membrane of myeloma cells',
      'Thymidine induces apoptosis specifically in fused hybridoma cells'
    ],
    correctIndex: 0,
    explanation: 'Aminopterin blocks de novo nucleotide synthesis. HGPRT mutant myeloma cells lack HGPRT enzyme and cannot use hypoxanthine for salvage synthesis, so they die. Fused hybridomas inherit functional HGPRT from spleen B cells and survive.',
    hints: [
      'Aminopterin inhibits dihydrofolate reductase (de novo pathway).',
      'Myeloma cells are HGPRT-negative (cannot use salvage pathway).',
      'Only B cell x Myeloma hybrids possess functional HGPRT to survive in HAT.'
    ]
  },
  {
    id: 'c_a7',
    nodeId: 'c12_bt_cbse_048',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Platelet-Derived Growth Factor (PDGF) and Epidermal Growth Factor (EGF) stimulate cultured fibroblast division by binding to target receptor tyrosine kinases. What key intracellular signaling cascade is activated to promote G1 to S phase cell cycle progression?',
    options: [
      'Ras-Raf-MEK-ERK (MAPK) signaling pathway',
      'Sodium-potassium ATPase pump reversal',
      'Lactic acid precipitation cascade',
      'Trypsinogen autolytic cleavage'
    ],
    correctIndex: 0,
    explanation: 'Binding of mitogenic growth factors (EGF/PDGF) to receptor tyrosine kinases triggers autophosphorylation and activates the Ras-Raf-MEK-ERK MAPK pathway, inducing cyclin D expression for cell cycle entry.',
    hints: [
      'Growth factors signal via receptor tyrosine kinases.',
      'Mitogen-Activated Protein Kinase (MAPK) cascade.',
      'Triggers entry into S-phase (DNA replication).'
    ]
  },
  {
    id: 'c_a8',
    nodeId: 'c12_bt_cbse_041',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'What is the molecular mechanism of action of Trastuzumab (Herceptin) in treating HER2-positive breast cancer patients?',
    options: [
      'It binds to the extracellular domain of HER2 (ErbB2) receptor, blocking homodimerization, inhibiting downstream proliferative signaling, and flagging tumor cells for immune ADCC destruction',
      'It inserts into cell membranes to disrupt lipid bilayers',
      'It binds to red blood cells to enhance hemoglobin oxygen carrying capacity',
      'It acts as an artificial substrate for plasminogen activation in heart attacks'
    ],
    correctIndex: 0,
    explanation: 'Trastuzumab is a humanized IgG1 monoclonal antibody that targets HER2 receptor tyrosine kinase, suppressing ligand-independent signaling and mediating Antibody-Dependent Cellular Cytotoxicity (ADCC).',
    hints: [
      'HER2 is overexpressed in ~20% of aggressive breast cancers.',
      'Trastuzumab blocks HER2 receptor dimerization.',
      'Recruits natural killer (NK) cells via ADCC.'
    ]
  }
];

// ==========================================
// CUSTOM SVG DIAGRAM COMPONENTS
// ==========================================

// Diagram 1: Cell Growth Curve & Passaging Points
const GrowthCurveSVG: React.FC<{ currentConfluence: number; passageCount: number }> = ({ currentConfluence, passageCount }) => {
  return (
    <svg viewBox="0 0 500 240" className="w-full h-auto bg-slate-900 rounded-lg p-2 border border-slate-700 shadow-inner">
      <defs>
        <linearGradient id="curveGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      {/* Title */}
      <text x="250" y="20" fill="#f8fafc" textAnchor="middle" fontSize="13" fontWeight="bold">
        Mammalian Cell Population Growth Curve &amp; Passaging Windows
      </text>

      {/* Grid lines */}
      <line x1="50" y1="40" x2="50" y2="200" stroke="#475569" strokeWidth="1.5" />
      <line x1="50" y1="200" x2="470" y2="200" stroke="#475569" strokeWidth="1.5" />

      {/* Axis Labels */}
      <text x="25" y="120" fill="#94a3b8" fontSize="10" transform="rotate(-90 25,120)" textAnchor="middle">Log Cell Density / Confluence</text>
      <text x="260" y="225" fill="#94a3b8" fontSize="10" textAnchor="middle">Culture Incubation Time (Hours)</text>

      {/* Growth Phase Zones */}
      {/* Lag Phase */}
      <rect x="50" y="40" width="70" height="160" fill="#1e293b" opacity="0.5" />
      <text x="85" y="190" fill="#64748b" fontSize="9" textAnchor="middle">Lag Phase</text>

      {/* Log / Exponential Phase */}
      <rect x="120" y="40" width="160" height="160" fill="#0f172a" opacity="0.3" />
      <text x="200" y="190" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">Log (Exponential) Phase</text>

      {/* Passaging Optimal Zone */}
      <rect x="230" y="40" width="40" height="160" fill="#059669" opacity="0.25" stroke="#10b981" strokeDasharray="3,3" />
      <text x="250" y="55" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">PASSAGE HERE</text>
      <text x="250" y="65" fill="#34d399" fontSize="7" textAnchor="middle">(80-85% Confluence)</text>

      {/* Stationary Phase */}
      <rect x="280" y="40" width="100" height="160" fill="#1e293b" opacity="0.5" />
      <text x="330" y="190" fill="#f59e0b" fontSize="9" textAnchor="middle">Stationary Phase</text>

      {/* Death Phase */}
      <rect x="380" y="40" width="90" height="160" fill="#2d1519" opacity="0.5" />
      <text x="425" y="190" fill="#ef4444" fontSize="9" textAnchor="middle">Death Phase</text>

      {/* Curve Path */}
      <path
        d="M 50,180 Q 110,180 140,150 T 280,60 T 380,65 Q 430,100 460,190"
        fill="none"
        stroke="#10b981"
        strokeWidth="3.5"
      />

      {/* Interactive Confluence Marker */}
      {(() => {
        const cx = 50 + (currentConfluence / 100) * 350;
        const cy = 180 - Math.sin((currentConfluence / 100) * (Math.PI / 1.5)) * 125;
        return (
          <g transform={`translate(${cx}, ${cy})`}>
            <circle r="7" fill="#ef4444" className="animate-ping" opacity="0.7" />
            <circle r="6" fill="#f8fafc" stroke="#ef4444" strokeWidth="2" />
            <rect x="-40" y="-28" width="80" height="18" rx="4" fill="#0f172a" stroke="#ef4444" strokeWidth="1" />
            <text x="0" y="-16" fill="#f8fafc" fontSize="9" textAnchor="middle" fontWeight="bold">
              {currentConfluence.toFixed(0)}% Conf (P{passageCount})
            </text>
          </g>
        );
      })()}
    </svg>
  );
};

// Diagram 2: CO2-Bicarbonate & HEPES Buffering Equilibrium + Phenol Red Spectrum
const BufferAndIndicatorSVG: React.FC<{ pH: number; co2Percent: number; hepesmM: number }> = ({ pH, co2Percent, hepesmM }) => {
  // Determine Phenol Red color based on pH
  const getIndicatorColor = (phVal: number) => {
    if (phVal < 6.8) return '#eab308'; // Yellow
    if (phVal < 7.1) return '#f97316'; // Orange
    if (phVal <= 7.5) return '#ef4444'; // Cherry Red (Optimal)
    if (phVal <= 7.8) return '#d946ef'; // Magenta
    return '#8b5cf6'; // Purple / Basic
  };

  const currentColor = getIndicatorColor(pH);

  return (
    <svg viewBox="0 0 500 240" className="w-full h-auto bg-slate-900 rounded-lg p-2 border border-slate-700 shadow-inner">
      <text x="250" y="22" fill="#f8fafc" textAnchor="middle" fontSize="13" fontWeight="bold">
        CO₂-Bicarbonate &amp; HEPES Chemical Buffer Equilibrium
      </text>

      {/* Equilibrium Chemical Equation */}
      <g transform="translate(40, 45)">
        <rect x="0" y="0" width="420" height="50" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <text x="210" y="22" fill="#38bdf8" fontFamily="monospace" fontSize="12" textAnchor="middle" fontWeight="bold">
          CO₂ (g) ⇌ CO₂ (aq) + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻
        </text>
        <text x="210" y="40" fill="#94a3b8" fontSize="9" textAnchor="middle">
          Incubator Atmosphere (5% CO₂) ⇌ Dissolved Carbonic Acid ⇌ Bicarbonate Buffer
        </text>
      </g>

      {/* Phenol Red Vial Visualizer */}
      <g transform="translate(50, 110)">
        <rect x="0" y="0" width="130" height="110" rx="6" fill="#0f172a" stroke="#334155" />
        <text x="65" y="18" fill="#cbd5e1" fontSize="10" textAnchor="middle" fontWeight="bold">Phenol Red Status</text>
        
        {/* Flask Simulation */}
        <path d="M 50,30 L 80,30 L 100,85 C 100,95 30,95 30,85 Z" fill={currentColor} opacity="0.85" stroke="#f8fafc" strokeWidth="1" />
        <text x="65" y="70" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
          pH {pH.toFixed(2)}
        </text>
        <text x="65" y="104" fill={currentColor} fontSize="9" fontWeight="bold" textAnchor="middle">
          {pH < 6.8 ? 'ACIDIC (Yellow)' : pH > 7.6 ? 'BASIC (Purple)' : 'OPTIMAL (Red)'}
        </text>
      </g>

      {/* Parameter Live Readouts */}
      <g transform="translate(200, 110)">
        <rect x="0" y="0" width="260" height="110" rx="6" fill="#0f172a" stroke="#334155" />
        <text x="130" y="20" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Buffer Dynamics &amp; Parameters</text>
        
        <text x="15" y="45" fill="#94a3b8" fontSize="10">Atmospheric CO₂:</text>
        <text x="245" y="45" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="end">{co2Percent.toFixed(1)} %</text>
        
        <text x="15" y="65" fill="#94a3b8" fontSize="10">HEPES Buffer Supplement:</text>
        <text x="245" y="65" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="end">{hepesmM} mM</text>

        <text x="15" y="85" fill="#94a3b8" fontSize="10">Buffer Stability Rating:</text>
        <text x="245" y="85" fill={co2Percent >= 4.5 && co2Percent <= 5.5 ? '#10b981' : '#f59e0b'} fontSize="10" fontWeight="bold" textAnchor="end">
          {co2Percent >= 4.5 && co2Percent <= 5.5 ? 'EXCELLENT (5% Target)' : 'pH DRIFT RISK'}
        </text>
      </g>
    </svg>
  );
};

// Diagram 3: Biosafety Cabinet Class II Airflow Architecture
const BiosafetyHoodSVG: React.FC = () => {
  return (
    <svg viewBox="0 0 500 240" className="w-full h-auto bg-slate-900 rounded-lg p-2 border border-slate-700 shadow-inner">
      <text x="250" y="20" fill="#f8fafc" textAnchor="middle" fontSize="13" fontWeight="bold">
        Class II Type A2 Biosafety Cabinet (Laminar Flow Hood)
      </text>

      {/* Cabinet Frame Outer */}
      <rect x="100" y="35" width="300" height="190" fill="#1e293b" stroke="#64748b" strokeWidth="2" rx="6" />

      {/* HEPA Filter Supply */}
      <rect x="120" y="50" width="260" height="20" fill="#334155" stroke="#f59e0b" strokeWidth="1" />
      <text x="250" y="64" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">Supply HEPA Filter (99.97% Efficiency)</text>

      {/* Laminar Airflow Arrows Downwards */}
      <g stroke="#38bdf8" strokeWidth="1.5" opacity="0.8">
        <line x1="150" y1="75" x2="150" y2="150" strokeDasharray="4,2" />
        <polygon points="150,155 146,147 154,147" fill="#38bdf8" />
        <line x1="210" y1="75" x2="210" y2="150" strokeDasharray="4,2" />
        <polygon points="210,155 206,147 214,147" fill="#38bdf8" />
        <line x1="290" y1="75" x2="290" y2="150" strokeDasharray="4,2" />
        <polygon points="290,155 286,147 294,147" fill="#38bdf8" />
        <line x1="350" y1="75" x2="350" y2="150" strokeDasharray="4,2" />
        <polygon points="350,155 346,147 354,147" fill="#38bdf8" />
      </g>

      {/* Work Surface & Grille */}
      <rect x="120" y="160" width="260" height="12" fill="#475569" />
      <text x="250" y="169" fill="#f8fafc" fontSize="8" textAnchor="middle">Sterile Work Surface</text>

      {/* Front Sash Glass Shield */}
      <line x1="120" y1="35" x2="120" y2="140" stroke="#38bdf8" strokeWidth="4" opacity="0.7" />
      <rect x="116" y="130" width="8" height="25" fill="#0284c7" rx="2" />
      <text x="75" y="145" fill="#38bdf8" fontSize="9">Sash Opening</text>

      {/* Air Barrier / Inflow Intake */}
      <path d="M 120,185 Q 150,210 250,210 Q 350,210 380,185" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
      <text x="250" y="202" fill="#f8fafc" fontSize="8" textAnchor="middle">70% Recirculated / 30% Exhausted via HEPA</text>
    </svg>
  );
};

// Diagram 4: Hybridoma Technology & Monoclonal Antibody Production
const HybridomaTechSVG: React.FC = () => {
  return (
    <svg viewBox="0 0 500 240" className="w-full h-auto bg-slate-900 rounded-lg p-2 border border-slate-700 shadow-inner">
      <text x="250" y="20" fill="#f8fafc" textAnchor="middle" fontSize="13" fontWeight="bold">
        Hybridoma Technology (Monoclonal Antibody Production)
      </text>

      {/* Spleen B-Cells */}
      <g transform="translate(60, 50)">
        <circle cx="30" cy="30" r="22" fill="#0284c7" opacity="0.8" stroke="#38bdf8" strokeWidth="2" />
        <text x="30" y="34" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">B-Cells</text>
        <text x="30" y="65" fill="#94a3b8" fontSize="8" textAnchor="middle">Antibody (+)</text>
        <text x="30" y="75" fill="#ef4444" fontSize="8" textAnchor="middle">Mortality (+)</text>
      </g>

      {/* Plus Sign */}
      <text x="140" y="85" fill="#f8fafc" fontSize="20" fontWeight="bold" textAnchor="middle">+</text>

      {/* Myeloma Cells */}
      <g transform="translate(170, 50)">
        <circle cx="30" cy="30" r="24" fill="#e11d48" opacity="0.8" stroke="#fb7185" strokeWidth="2" />
        <text x="30" y="34" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Myeloma</text>
        <text x="30" y="65" fill="#ef4444" fontSize="8" textAnchor="middle">Antibody (-)</text>
        <text x="30" y="75" fill="#10b981" fontSize="8" textAnchor="middle">Immortal (+)</text>
      </g>

      {/* Fusion Arrow with PEG */}
      <g transform="translate(245, 70)">
        <line x1="0" y1="10" x2="45" y2="10" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,2" />
        <polygon points="50,10 42,6 42,14" fill="#f59e0b" />
        <text x="25" y="0" fill="#fbbf24" fontSize="8" textAnchor="middle">PEG Fusion</text>
      </g>

      {/* Hybridoma Cell */}
      <g transform="translate(310, 45)">
        <ellipse cx="35" cy="35" rx="30" ry="25" fill="#7c3aed" opacity="0.9" stroke="#a78bfa" strokeWidth="2" />
        <text x="35" y="38" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">HYBRIDOMA</text>
        <text x="35" y="80" fill="#10b981" fontSize="8" textAnchor="middle">HAT Medium Selection</text>
      </g>

      {/* Harvest Monoclonal Antibody */}
      <g transform="translate(420, 50)">
        <rect x="0" y="10" width="60" height="50" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
        <path d="M 20,45 L 30,30 L 40,45 M 30,30 L 30,18" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
        <text x="30" y="73" fill="#38bdf8" fontSize="8" textAnchor="middle" fontWeight="bold">Monoclonal Ab</text>
      </g>

      {/* Bottom Summary Bar */}
      <rect x="40" y="180" width="420" height="40" rx="6" fill="#0f172a" stroke="#334155" />
      <text x="250" y="198" fill="#cbd5e1" fontSize="9" textAnchor="middle">
        Selects only HGPRT(+) immortal hybridomas capable of secreting identical monospecific antibodies (mAbs).
      </text>
      <text x="250" y="212" fill="#f59e0b" fontSize="8" textAnchor="middle">
        Examples: Trastuzumab (Herceptin for HER2+) &amp; OKT-3 (Muromonab for transplant rejection).
      </text>
    </svg>
  );
};

// ==========================================
// MAIN INTERACTIVE CELL CULTURE SIMULATOR CANVAS
// ==========================================
const InteractiveCellCanvas: React.FC<{
  cellState: CellLineState;
  onUpdateState: (updater: (prev: CellLineState) => CellLineState) => void;
  activeAssay: 'none' | 'trypan_blue' | 'mtt';
}> = ({ cellState, onUpdateState, activeAssay }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; radius: number; isDead: boolean }[] = [];

    // Seed particles based on confluence and viability
    const totalCount = Math.floor((cellState.confluence / 100) * 120) + 10;
    for (let i = 0; i < totalCount; i++) {
      const isDead = Math.random() * 100 > cellState.viability;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (cellState.cultureMode === 'suspension' ? 0.8 : 0.2),
        vy: (Math.random() - 0.5) * (cellState.cultureMode === 'suspension' ? 0.8 : 0.2),
        radius: cellState.type === 'hela_immortal' ? 12 : cellState.type === 'continuous_cho' ? 10 : 8,
        isDead
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background representing media color based on pH
      let mediaBg = '#ef444422'; // Cherry red optimal
      if (cellState.ph < 6.8) mediaBg = '#eab30833'; // Yellow acidic
      else if (cellState.ph > 7.6) mediaBg = '#8b5cf633'; // Purple basic
      ctx.fillStyle = mediaBg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid / Surface Flask Bottom
      ctx.strokeStyle = '#33415533';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Render cells
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce walls
        if (p.x < p.radius || p.x > canvas.width - p.radius) p.vx *= -1;
        if (p.y < p.radius || p.y > canvas.height - p.radius) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (activeAssay === 'trypan_blue') {
          if (p.isDead) {
            ctx.fillStyle = '#0284c7'; // Trypan Blue uptake in dead cells
            ctx.strokeStyle = '#0369a1';
          } else {
            ctx.fillStyle = '#ffffffaa'; // Clear transparent live cells
            ctx.strokeStyle = '#10b981';
          }
        } else if (activeAssay === 'mtt') {
          if (!p.isDead) {
            ctx.fillStyle = '#7c3aed'; // Purple Formazan crystal inside mitochondria
            ctx.strokeStyle = '#a78bfa';
          } else {
            ctx.fillStyle = '#cbd5e133'; // Clear metabolically inactive dead cell
            ctx.strokeStyle = '#64748b';
          }
        } else {
          // Normal microscopic view
          if (p.isDead) {
            ctx.fillStyle = '#64748b66';
            ctx.strokeStyle = '#ef4444';
          } else {
            ctx.fillStyle = cellState.type === 'primary_fibroblast' ? '#10b981aa' : '#38bdf8aa';
            ctx.strokeStyle = '#f8fafc';
          }
        }

        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Draw nucleus inside live cells
        if (!p.isDead && activeAssay === 'none') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = '#0f172a88';
          ctx.fill();
        }
      });

      // Overlay text status
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`Cell Line: ${cellState.type.toUpperCase()} (${cellState.cultureMode})`, 12, 22);
      ctx.fillText(`Confluence: ${cellState.confluence.toFixed(1)}% | Viability: ${cellState.viability.toFixed(1)}%`, 12, 40);

      if (cellState.isContaminated) {
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('WARNING: BACTERIAL/MYCOPLASMA CONTAMINATION DETECTED!', canvas.width / 2 - 200, canvas.height / 2);
      }

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [cellState, activeAssay]);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 shadow-2xl">
      <canvas ref={canvasRef} width={640} height={280} className="w-full h-auto block" />
    </div>
  );
};

// ==========================================
// MAIN COMPONENT EXPORT
// ==========================================
export default function C12_BiotechAnimalCellCultureCBSESim({
  onComplete
}: {
  onComplete?: (score: number) => void;
}) {
  // Tab control state
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Interactive Incubator & Cell State
  const [cellState, setCellState] = useState<CellLineState>({
    type: 'continuous_cho',
    cultureMode: 'adherent',
    mediaType: 'DMEM_high_glucose',
    serumPercent: 10,
    temperature: 37,
    co2Percent: 5.0,
    hepesmM: 10,
    passageNumber: 1,
    confluence: 45,
    viability: 98,
    ph: 7.35,
    osmolality: 300,
    isContaminated: false,
    timeElapsedHours: 0
  });

  const [activeAssay, setActiveAssay] = useState<'none' | 'trypan_blue' | 'mtt'>('none');
  const [selectedExplorationIndex, setSelectedExplorationIndex] = useState<number>(0);

  // Challenge Runner State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, unknown>>({});
  const [dragSortedItems, setDragSortedItems] = useState<string[]>([]);
  const [matchingSelections, setMatchingSelections] = useState<Record<string, string>>({});
  const [numericInput, setNumericInput] = useState<string>('');
  const [challengeCompleted, setChallengeCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Feedback & Audio / SRS / BKT State
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Inactivity Timer for Automatic Hints
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // BKT & SRS Stores
  const [bktState, setBktState] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((node) => {
      initial[node] = createBKTState();
    });
    return initial;
  });

  const [srsState, setSrsState] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach((node) => {
      initial[node] = createReviewItem(node);
    });
    return initial;
  });

  // Discovery Question State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);

  // Prediction Questions State
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});

  // Observation Questions State
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // Current Challenge Object
  const currentChallenge = CHALLENGES[currentChallengeIndex];

  // Setup drag items when challenge changes
  useEffect(() => {
    if (currentChallenge?.type === 'drag-sort' && currentChallenge.dragItems) {
      // Shuffle initially
      const shuffled = [...currentChallenge.dragItems].sort(() => Math.random() - 0.5);
      setDragSortedItems(shuffled);
    }
    setMatchingSelections({});
    setNumericInput('');
    setShowHint(false);
  }, [currentChallengeIndex, currentChallenge]);

  // Handle simulation time & growth tick
  useEffect(() => {
    const timer = setInterval(() => {
      setCellState((prev) => {
        // Calculate pH drift based on CO2 and lactic acid from high confluence
        let targetPH = 7.4 - (prev.confluence / 100) * 0.5 + (5.0 - prev.co2Percent) * 0.15;
        if (prev.hepesmM > 15) targetPH = 7.35; // HEPES stabilizes

        // Confluence doubling rate
        let growthRate = 0.8;
        if (prev.serumPercent === 0 && prev.mediaType !== 'Serum_Free_CHO') growthRate = 0.1;
        if (prev.temperature < 32 || prev.temperature > 40) growthRate = 0;

        let newConfluence = prev.confluence + growthRate;
        if (prev.type === 'primary_fibroblast' && newConfluence > 90) {
          newConfluence = 90; // Contact inhibition
        }
        if (newConfluence > 100) newConfluence = 100;

        // Viability drop at extreme conditions
        let newViability = prev.viability;
        if (prev.temperature > 41 || targetPH < 6.5 || targetPH > 8.0) {
          newViability = Math.max(0, prev.viability - 2);
        }

        return {
          ...prev,
          confluence: newConfluence,
          viability: newViability,
          ph: Math.min(8.2, Math.max(6.2, targetPH)),
          timeElapsedHours: prev.timeElapsedHours + 1
        };
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  // Automatic Hint Timer on inactivity (10 seconds)
  useEffect(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && !challengeCompleted) {
        setShowHint(true);
        setCurrentHint(currentChallenge.hints[0] || 'Take your time to analyze the cell culture principles.');
        audioManager.play('hint');
      }
    }, 10000);

    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, activeTab, challengeCompleted, currentChallenge]);

  // Actions for Lab Controls
  const handlePassageCells = () => {
    audioManager.play('whoosh');
    speechManager.speak('Trypsinizing and passaging cell culture.');
    setCellState((prev) => ({
      ...prev,
      confluence: 15,
      passageNumber: prev.passageNumber + 1,
      viability: 98,
      ph: 7.35
    }));
    setShowSparkle(true);
  };

  const handleMediaChange = (media: CellLineState['mediaType']) => {
    audioManager.play('pop');
    setCellState((prev) => ({
      ...prev,
      mediaType: media,
      ph: 7.4
    }));
  };

  const handleCellTypeChange = (type: CellLineState['type']) => {
    audioManager.play('pickup');
    setCellState((prev) => ({
      ...prev,
      type,
      cultureMode: type === 'continuous_cho' ? 'suspension' : 'adherent',
      confluence: 30,
      passageNumber: 1
    }));
  };

  // Submit Answer Logic for Challenge Runner
  const handleAnswerSubmit = (answer: unknown) => {
    let isCorrect = false;

    if (currentChallenge.type === 'multiple-choice') {
      isCorrect = answer === currentChallenge.correctIndex;
    } else if (currentChallenge.type === 'numeric') {
      const numVal = parseFloat(numericInput);
      const expected = typeof currentChallenge.correctAnswer === 'number' ? currentChallenge.correctAnswer : parseFloat(currentChallenge.correctAnswer as string);
      isCorrect = Math.abs(numVal - expected) < 0.1;
    } else if (currentChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(dragSortedItems) === JSON.stringify(currentChallenge.dragItems);
    } else if (currentChallenge.type === 'matching') {
      isCorrect = (currentChallenge.matchingPairs || []).every(
        (pair) => matchingSelections[pair.left] === pair.right
      );
    }

    // Update BKT & SRS State
    const nodeId = currentChallenge.nodeId;
    const currentBKT = bktState[nodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktState((prev) => ({ ...prev, [nodeId]: updatedBKT }));

    const currentSRS = srsState[nodeId] || createReviewItem(nodeId);
    const updatedSRS = sm2Update(currentSRS, isCorrect ? 5 : 1);
    setSrsState((prev) => ({ ...prev, [nodeId]: updatedSRS }));

    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Excellent job! Correct answer.');
      setShowSparkle(true);
      setShowConfetti(true);
      setShowSuccess(true);
      setScore((prev) => prev + 10);

      setTimeout(() => setShowSuccess(false), 2500);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      audioManager.play('error');
      speechManager.speak('That is incorrect. Review the misconception hint.');
      setShowHint(true);
      setCurrentHint(currentChallenge.explanation);
    }

    setUserAnswers((prev) => ({ ...prev, [currentChallenge.id]: isCorrect }));

    if (currentChallengeIndex === CHALLENGES.length - 1) {
      setChallengeCompleted(true);
      recordGameScore('animal_cell_culture', score + (isCorrect ? 10 : 0));
      if (onComplete) onComplete(score + (isCorrect ? 10 : 0));
    }
  };

  // Navigation between challenges
  const nextChallenge = () => {
    audioManager.play('swoop');
    setCurrentChallengeIndex((prev) => Math.min(CHALLENGES.length - 1, prev + 1));
  };

  const prevChallenge = () => {
    audioManager.play('swoop');
    setCurrentChallengeIndex((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-12">
      {/* HEADER BAR */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/30">
              ISC Class 12 Biotechnology
            </span>
            <span className="text-xs text-slate-400">Nodes: 45 Modules (c12_bt_cbse_025 - 069)</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white mt-1">
            Animal Cell Culture &amp; Bioprocess Engineering
          </h1>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {(['discovery', 'lab', 'challenges', 'summary'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                audioManager.play('tap');
                setActiveTab(tab);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 capitalize ${
                activeTab === tab
                  ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {tab === 'discovery' && '🔍 Discovery'}
              {tab === 'lab' && '🧪 Virtual Lab'}
              {tab === 'challenges' && '🎯 Challenges (24)'}
              {tab === 'summary' && '📊 Summary & Industry'}
            </button>
          ))}
        </nav>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 mt-6">

        {/* ========================================== */}
        {/* TAB 1: DISCOVERY & SCENARIO */}
        {/* ========================================== */}
        {activeTab === 'discovery' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Scenario Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-gold-950 to-slate-900 p-6 rounded-2xl border border-gold-800/40 shadow-2xl">
              <h2 className="text-xl font-bold text-gold-300 flex items-center gap-2">
                <span>🔬</span> {SCENARIO.title}
              </h2>
              <p className="mt-2 text-slate-300 leading-relaxed text-sm md:text-base">
                {SCENARIO.intro}
              </p>
              <div className="mt-4 p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 text-xs md:text-sm text-slate-300">
                <strong className="text-gold-400">Your Objective: </strong> {SCENARIO.context}
              </div>
            </div>

            {/* Counterintuitive Discovery Question */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
              <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                <span>⚡</span> Discovery Question: Cell Metabolism &amp; Warburg Effect
              </h3>
              <p className="mt-2 text-sm text-slate-200">{DISCOVERY_QUESTION.question}</p>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      audioManager.play('tap');
                      setDiscoverySelected(idx);
                      setDiscoveryAnswered(true);
                      if (idx === DISCOVERY_QUESTION.correctIndex) {
                        audioManager.play('celebration');
                        speechManager.speak('Correct discovery! Continuous cells exhibit the Warburg Effect producing high lactic acid.');
                      } else {
                        audioManager.play('error');
                      }
                    }}
                    className={`p-3.5 rounded-xl text-left text-sm font-medium border transition-all ${
                      discoveryAnswered
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : discoverySelected === idx
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : 'bg-slate-950/50 border-slate-800 text-slate-500'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-gold-500 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                  </button>
                ))}
              </div>

              {discoveryAnswered && (
                <div className="mt-4 p-4 rounded-xl bg-gold-950/40 border border-gold-800/50 text-xs md:text-sm text-gold-200 animate-fadeIn">
                  <strong>Lab Insight: </strong> {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* Prediction Questions */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-gold-400 flex items-center gap-2">
                <span>🔮</span> Pre-Lab Prediction Hypotheses
              </h3>

              {PREDICTION_QUESTIONS.map((pq, qIdx) => (
                <div key={qIdx} className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <p className="text-sm font-semibold text-slate-200">{pq.question}</p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {pq.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          audioManager.play('tap');
                          setPredictionAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
                          if (oIdx === pq.correctIndex) {
                            audioManager.play('chime');
                          }
                        }}
                        className={`p-2.5 rounded-lg text-xs font-medium border text-left transition-all ${
                          predictionAnswers[qIdx] === oIdx
                            ? oIdx === pq.correctIndex
                              ? 'bg-emerald-900/50 border-emerald-500 text-emerald-300'
                              : 'bg-rose-900/50 border-rose-500 text-rose-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {predictionAnswers[qIdx] !== undefined && (
                    <p className="mt-2 text-xs text-amber-400 italic">
                      Verification Step: {pq.verifyInstruction}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Visual Diagrams Preview in Discovery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GrowthCurveSVG currentConfluence={cellState.confluence} passageCount={cellState.passageNumber} />
              <HybridomaTechSVG />
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 2: VIRTUAL LAB & INTERACTIVE CONTROLS */}
        {/* ========================================== */}
        {activeTab === 'lab' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Exploration Guided Steps Selection Bar */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl overflow-x-auto">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Interactive Guided Exploration Labs
              </h3>
              <div className="flex gap-3 min-w-max">
                {EXPLORATION_STEPS.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      audioManager.play('tap');
                      setSelectedExplorationIndex(idx);
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      selectedExplorationIndex === idx
                        ? 'bg-gold-600 border-gold-400 text-white shadow-lg shadow-gold-600/30'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {step.title}
                  </button>
                ))}
              </div>
              <div className="mt-3 p-3 bg-slate-950 rounded-lg text-xs text-slate-300 border border-slate-800">
                <strong className="text-gold-400">Guided Instruction: </strong>
                {EXPLORATION_STEPS[selectedExplorationIndex].instruction}
              </div>
            </div>

            {/* LAB GRID: CONTROLS & LIVE SIMULATION */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Interactive Incubator & Media Controls (5 Cols) */}
              <div className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-5">
                <h3 className="text-base font-bold text-gold-400 flex items-center justify-between">
                  <span>🎛️ Incubator &amp; Culture Controls</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    Hours Elapsed: {cellState.timeElapsedHours}h
                  </span>
                </h3>

                {/* Cell Line Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Cell Line Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'primary_fibroblast', label: 'Primary Fibroblast' },
                      { id: 'continuous_cho', label: 'CHO Continuous' },
                      { id: 'hela_immortal', label: 'HeLa Cancer Line' }
                    ].map((cl) => (
                      <button
                        key={cl.id}
                        onClick={() => handleCellTypeChange(cl.id as CellLineState['type'])}
                        className={`p-2 rounded-lg text-xs font-semibold border transition-all ${
                          cellState.type === cl.id
                            ? 'bg-gold-950 border-gold-500 text-gold-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {cl.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Culture Mode */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Culture Mode</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setCellState((p) => ({ ...p, cultureMode: 'adherent' }))}
                      className={`p-2 rounded-lg text-xs font-semibold border ${
                        cellState.cultureMode === 'adherent'
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      Adherent Monolayer
                    </button>
                    <button
                      onClick={() => setCellState((p) => ({ ...p, cultureMode: 'suspension' }))}
                      className={`p-2 rounded-lg text-xs font-semibold border ${
                        cellState.cultureMode === 'suspension'
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      Suspension Culture
                    </button>
                  </div>
                </div>

                {/* Media Formulation */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Basal Media Formulation</label>
                  <select
                    value={cellState.mediaType}
                    onChange={(e) => handleMediaChange(e.target.value as CellLineState['mediaType'])}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 font-semibold focus:border-gold-500 outline-none"
                  >
                    <option value="DMEM_high_glucose">DMEM High Glucose (Complex Basal)</option>
                    <option value="RPMI_1640">RPMI-1640 (Lymphoid / Suspension)</option>
                    <option value="Serum_Free_CHO">Chemically Defined Serum-Free (CHO Peak Yield)</option>
                  </select>
                </div>

                {/* Sliders: Temperature, CO2, Serum, HEPES */}
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Temperature Target</span>
                      <span className="font-bold text-gold-400">{cellState.temperature}°C</span>
                    </div>
                    <input
                      type="range"
                      min="25"
                      max="42"
                      value={cellState.temperature}
                      onChange={(e) => setCellState((p) => ({ ...p, temperature: parseFloat(e.target.value) }))}
                      className="w-full accent-gold-500 bg-slate-950 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Incubator CO₂ Level</span>
                      <span className="font-bold text-gold-400">{cellState.co2Percent.toFixed(1)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={cellState.co2Percent}
                      onChange={(e) => setCellState((p) => ({ ...p, co2Percent: parseFloat(e.target.value) }))}
                      className="w-full accent-gold-500 bg-slate-950 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Fetal Bovine Serum (FBS)</span>
                      <span className="font-bold text-gold-400">{cellState.serumPercent}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={cellState.serumPercent}
                      onChange={(e) => setCellState((p) => ({ ...p, serumPercent: parseInt(e.target.value) }))}
                      className="w-full accent-gold-500 bg-slate-950 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>HEPES Chemical Buffer</span>
                      <span className="font-bold text-gold-400">{cellState.hepesmM} mM</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="25"
                      step="5"
                      value={cellState.hepesmM}
                      onChange={(e) => setCellState((p) => ({ ...p, hepesmM: parseInt(e.target.value) }))}
                      className="w-full accent-gold-500 bg-slate-950 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Passaging & Lab Actions */}
                <div className="pt-3 flex gap-2">
                  <button
                    onClick={handlePassageCells}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-1.5"
                  >
                    <span>✂️</span> Trypsinize &amp; Subculture (Passage P{cellState.passageNumber + 1})
                  </button>
                </div>
              </div>

              {/* Right Column: Live Microscope / Flask Simulation Canvas (7 Cols) */}
              <div className="lg:col-span-7 space-y-5">
                {/* Live Canvas Visualizer */}
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                      <span>🔬</span> Inverted Microscope Field of View
                    </h4>
                    {/* Viability Assay Mode Selection */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setActiveAssay('none')}
                        className={`px-2.5 py-1 rounded text-xs font-semibold ${
                          activeAssay === 'none' ? 'bg-gold-600 text-white' : 'bg-slate-950 text-slate-400'
                        }`}
                      >
                        Brightfield
                      </button>
                      <button
                        onClick={() => setActiveAssay('trypan_blue')}
                        className={`px-2.5 py-1 rounded text-xs font-semibold ${
                          activeAssay === 'trypan_blue' ? 'bg-gold-600 text-white' : 'bg-slate-950 text-slate-400'
                        }`}
                      >
                        Trypan Blue
                      </button>
                      <button
                        onClick={() => setActiveAssay('mtt')}
                        className={`px-2.5 py-1 rounded text-xs font-semibold ${
                          activeAssay === 'mtt' ? 'bg-purple-600 text-white' : 'bg-slate-950 text-slate-400'
                        }`}
                      >
                        MTT Assay
                      </button>
                    </div>
                  </div>

                  <InteractiveCellCanvas cellState={cellState} onUpdateState={setCellState} activeAssay={activeAssay} />

                  {/* Dynamic Color & Parameter Indicators */}
                  <div className="grid grid-cols-3 gap-3 text-center text-xs">
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block">Culture pH</span>
                      <span className={`font-bold text-sm ${cellState.ph < 6.8 ? 'text-yellow-400' : cellState.ph > 7.6 ? 'text-purple-400' : 'text-emerald-400'}`}>
                        {cellState.ph.toFixed(2)}
                      </span>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block">Confluence</span>
                      <span className="font-bold text-sm text-gold-400">{cellState.confluence.toFixed(1)}%</span>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block">Cell Viability</span>
                      <span className="font-bold text-sm text-emerald-400">{cellState.viability.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                {/* SVG Visualizer Tabs (Buffers / Hood) */}
                <div className="space-y-4">
                  <BufferAndIndicatorSVG pH={cellState.ph} co2Percent={cellState.co2Percent} hepesmM={cellState.hepesmM} />
                  <BiosafetyHoodSVG />
                </div>
              </div>
            </div>

            {/* Observation Questions in Lab */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-gold-400 flex items-center gap-2">
                <span>👁️</span> Post-Lab Observation Assessments
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {OBSERVATION_QUESTIONS.map((oq, oqIdx) => (
                  <div key={oqIdx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <p className="text-xs md:text-sm font-semibold text-slate-200">{oq.question}</p>
                    <div className="space-y-1.5">
                      {oq.observableOptions.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => {
                            audioManager.play('tap');
                            setObservationAnswers((prev) => ({ ...prev, [oqIdx]: optIdx }));
                            if (optIdx === oq.correctIndex) audioManager.play('chime');
                          }}
                          className={`w-full p-2 rounded-lg text-xs font-medium text-left transition-all border ${
                            observationAnswers[oqIdx] === optIdx
                              ? optIdx === oq.correctIndex
                                ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                                : 'bg-rose-900/60 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
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
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 3: CHALLENGES RUNNER (24 QUESTIONS) */}
        {/* ========================================== */}
        {activeTab === 'challenges' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            {/* Progress Header */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex justify-between items-center shadow-xl">
              <div>
                <span className="text-xs text-slate-400 font-bold tracking-wider uppercase">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Node: <span className="text-gold-400 font-mono">{currentChallenge.nodeId}</span>
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase border ${
                  currentChallenge.difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                    : currentChallenge.difficulty === 'standard'
                    ? 'bg-amber-950 text-amber-400 border-amber-800'
                    : 'bg-purple-950 text-purple-400 border-purple-800'
                }`}>
                  {currentChallenge.difficulty} ({currentChallenge.competencyLevel})
                </span>
                <span className="text-sm font-extrabold text-gold-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                  Score: {score}
                </span>
              </div>
            </div>

            {/* Challenge Card */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
              <p className="text-base md:text-lg font-medium text-slate-100 leading-relaxed">
                {currentChallenge.question}
              </p>

              {/* 1. Multiple Choice */}
              {currentChallenge.type === 'multiple-choice' && currentChallenge.options && (
                <div className="space-y-3">
                  {currentChallenge.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSubmit(idx)}
                      className="w-full p-4 rounded-xl text-left text-sm font-semibold bg-slate-950 border border-slate-800 text-slate-300 hover:border-gold-500 hover:bg-slate-800/80 transition-all flex items-center gap-3"
                    >
                      <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-gold-400 shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* 2. Drag-Sort */}
              {currentChallenge.type === 'drag-sort' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400 italic">Reorder items into correct chronological sequence:</p>
                  <div className="space-y-2">
                    {dragSortedItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center text-xs md:text-sm font-medium"
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-gold-400 font-bold">{idx + 1}.</span> {item}
                        </span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              if (idx > 0) {
                                const newItems = [...dragSortedItems];
                                const temp = newItems[idx - 1];
                                newItems[idx - 1] = newItems[idx];
                                newItems[idx] = temp;
                                setDragSortedItems(newItems);
                              }
                            }}
                            className="p-1 px-2 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs"
                          >
                            ▲
                          </button>
                          <button
                            onClick={() => {
                              if (idx < dragSortedItems.length - 1) {
                                const newItems = [...dragSortedItems];
                                const temp = newItems[idx + 1];
                                newItems[idx + 1] = newItems[idx];
                                newItems[idx] = temp;
                                setDragSortedItems(newItems);
                              }
                            }}
                            className="p-1 px-2 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs"
                          >
                            ▼
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleAnswerSubmit(dragSortedItems)}
                    className="w-full bg-gold-600 hover:bg-gold-500 text-white font-bold py-3 rounded-xl text-sm transition-all"
                  >
                    Submit Ordered Sequence
                  </button>
                </div>
              )}

              {/* 3. Numeric Input */}
              {currentChallenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <input
                      type="number"
                      step="any"
                      placeholder="Enter calculated numerical value..."
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-gold-500 outline-none"
                    />
                    <button
                      onClick={() => handleAnswerSubmit(numericInput)}
                      className="bg-gold-600 hover:bg-gold-500 text-white font-bold px-6 rounded-xl text-sm transition-all"
                    >
                      Verify Answer
                    </button>
                  </div>
                </div>
              )}

              {/* 4. Matching */}
              {currentChallenge.type === 'matching' && currentChallenge.matchingPairs && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentChallenge.matchingPairs.map((pair, pIdx) => (
                      <div key={pIdx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                        <span className="text-xs font-bold text-gold-400 block">{pair.left}</span>
                        <select
                          value={matchingSelections[pair.left] || ''}
                          onChange={(e) =>
                            setMatchingSelections((prev) => ({ ...prev, [pair.left]: e.target.value }))
                          }
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 outline-none focus:border-gold-500"
                        >
                          <option value="">-- Select Matching Application --</option>
                          {currentChallenge.matchingPairs?.map((mOpt, mIdx) => (
                            <option key={mIdx} value={mOpt.right}>
                              {mOpt.right}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleAnswerSubmit(matchingSelections)}
                    className="w-full bg-gold-600 hover:bg-gold-500 text-white font-bold py-3 rounded-xl text-sm transition-all"
                  >
                    Confirm Matching Pairs
                  </button>
                </div>
              )}
            </div>

            {/* Challenge Navigation Bar */}
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={prevChallenge}
                disabled={currentChallengeIndex === 0}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 hover:bg-slate-800 transition-all"
              >
                ← Previous Challenge
              </button>
              <button
                onClick={nextChallenge}
                disabled={currentChallengeIndex === CHALLENGES.length - 1}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gold-600 text-white disabled:opacity-40 hover:bg-gold-500 transition-all"
              >
                Next Challenge →
              </button>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 4: SUMMARY & REAL-WORLD INDUSTRY */}
        {/* ========================================== */}
        {activeTab === 'summary' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Real World Activity Render */}
            <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-6 rounded-2xl border border-emerald-800/40 shadow-2xl">
              <h2 className="text-xl font-bold text-emerald-300 flex items-center gap-2">
                <span>🏭</span> Industry Real-World Task: {REAL_WORLD_ACTIVITY.title}
              </h2>
              <p className="mt-2 text-slate-300 text-sm md:text-base leading-relaxed">
                {REAL_WORLD_ACTIVITY.description}
              </p>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs md:text-sm text-slate-200 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Misconceptions Debunker Section */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                <span>⚠️</span> Common Biotechnology Misconceptions Debunked
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((m, idx) => (
                  <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">{m.title}</h4>
                    <p className="text-xs text-rose-300 line-through">❌ Myth: {m.fallacy}</p>
                    <p className="text-xs text-emerald-300 font-semibold">✓ Truth: {m.truth}</p>
                    <p className="text-xs text-slate-400 leading-normal">{m.correctionDetail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Node Mastery Breakdown Grid */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>📈</span> Node Mastery Progress Tracker (45 Learning Nodes)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 max-h-96 overflow-y-auto p-1">
                {ALL_NODE_IDS.map((node) => {
                  const bkt = bktState[node];
                  const mastery = bkt ? getMasteryLevel(bkt) : 'Novice';
                  return (
                    <div key={node} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-center">
                      <span className="text-[10px] font-mono text-slate-400 block truncate">{node}</span>
                      <span className={`text-xs font-bold block mt-1 ${
                        mastery === 'mastered' ? 'text-emerald-400' : mastery === 'proficient' ? 'text-amber-400' : 'text-slate-500'
                      }`}>
                        {mastery}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* REUSABLE SIM-ENGINE FEEDBACK OVERLAYS */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={600} y={300} />
    </div>
  );
}