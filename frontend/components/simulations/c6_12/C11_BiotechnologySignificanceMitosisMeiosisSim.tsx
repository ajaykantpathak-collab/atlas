'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── REQUIRED NODE IDS ───
const NODE_C11_BIOTECH_021 = 'c11_biotech_021';
const NODE_C11_BIOTECH_022 = 'c11_biotech_022';
const NODE_C11_BIOTECH_023 = 'c11_biotech_023';
const NODE_C11_BIOTECH_024 = 'c11_biotech_024';
const NODE_C11_BIOTECH_025 = 'c11_biotech_025';
const NODE_C11_BIOTECH_026 = 'c11_biotech_026';
const NODE_C11_BIOTECH_027 = 'c11_biotech_027';
const NODE_C11_BIOTECH_028 = 'c11_biotech_028';
const NODE_C11_BIOTECH_029 = 'c11_biotech_029';
const NODE_C11_BIOTECH_030 = 'c11_biotech_030';

const ALL_NODE_IDS = [
  NODE_C11_BIOTECH_021,
  NODE_C11_BIOTECH_022,
  NODE_C11_BIOTECH_023,
  NODE_C11_BIOTECH_024,
  NODE_C11_BIOTECH_025,
  NODE_C11_BIOTECH_026,
  NODE_C11_BIOTECH_027,
  NODE_C11_BIOTECH_028,
  NODE_C11_BIOTECH_029,
  NODE_C11_BIOTECH_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Bioreactor and Cytology Crisis at Inovio Biotech, Bengaluru',
  intro: 'A biopharmaceutical pilot plant in Bengaluru is producing therapeutic human growth hormone and monoclonal antibodies. Suddenly, batch yield drops, cell cultures show aberrant growth rates, and down-stream enzyme purification yields abnormal kinetics.',
  context: 'As lead biotechnologist, you must calibrate the mitotic index, isolate multipotent vs totipotent stem lines, untangle steroid vs peptide signal transduction, evaluate apoptotic death cascades, inspect karyotypes, formulate lipid-liposome carriers, and tune enzyme bioreactor kinetics (Vmax, Km, pH, inhibitors).'
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In a root-tip squash of Allium cepa, 60 cells are actively in mitosis out of 300 total cells observed under light microscopy. What is the Mitotic Index (MI), and what does an abnormally rising MI in a cancer drug screen indicate?',
  options: [
    'MI = 20%; it indicates the drug is ineffective because cell division continues rapidly',
    'MI = 5%; it indicates the drug is successfully arresting cell cycle in G0',
    'MI = 50%; it indicates complete apoptotic clearance',
    'MI = 0.2%; it indicates cell differentiation into permanent tissue'
  ],
  correctIndex: 0,
  hintAfter: 'Remember: Mitotic Index (%) = (Dividing Cells / Total Cells) × 100. High MI in cancer screening means active proliferation is not being halted!'
};

// ─── PREDICTION QUESTIONS (Brilliant.org Predict-then-Check Pattern) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'If you double the substrate concentration [S] in an enzyme reaction that is already operating near its maximum velocity (Vmax), what will happen to the reaction velocity (v)?',
    options: [
      'Velocity will almost double proportionally',
      'Velocity will remain nearly unchanged because active sites are saturated',
      'Velocity will drop to zero due to substrate inhibition',
      'Velocity will increase exponentially'
    ],
    correctIndex: 1,
    explanation: 'When substrate concentration is far above Km, virtually all enzyme active sites are occupied (saturated). Additional substrate produces negligible increase in velocity as it asymptotically approaches Vmax.',
    verifyInstruction: 'In Lab 5 or the Sandbox, raise Substrate [S] from 20 mM to 50 mM and verify that Velocity (v) plateaus near Vmax.'
  },
  {
    id: 'pred_2',
    question: 'If a competitive inhibitor is introduced into an active bioreactor, what will happen to the apparent Km and Vmax of the enzyme?',
    options: [
      'Apparent Km increases while Vmax remains unchanged',
      'Vmax decreases while apparent Km remains unchanged',
      'Both Km and Vmax decrease proportionally',
      'Both Km and Vmax increase together'
    ],
    correctIndex: 0,
    explanation: 'Competitive inhibitors reversibly compete for the active site. High substrate concentrations displace the inhibitor to restore full Vmax, but more substrate is required to reach 1/2 Vmax (Km increases).',
    verifyInstruction: 'In Lab 5, toggle inhibitor to "competitive" and observe that Apparent Km increases while Vmax remains constant.'
  }
];

// ─── OBSERVATION QUESTIONS (Brilliant.org "What do you notice?" Pattern) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'When adjusting the dividing cell slider while keeping total cells fixed at 200, what do you observe about the Mitotic Index (MI)?',
    options: [
      'The Mitotic Index increases linearly in direct proportion to dividing cell count',
      'The Mitotic Index decreases because cell density rises',
      'The Mitotic Index stays constant at 50%',
      'The Mitotic Index drops abruptly to zero'
    ],
    observableOptions: [
      'The Mitotic Index increases linearly in direct proportion to dividing cell count',
      'The Mitotic Index decreases because cell density rises',
      'The Mitotic Index stays constant at 50%',
      'The Mitotic Index drops abruptly to zero'
    ],
    correctIndex: 0,
    explanation: 'Observing MI = (Dividing Cells / Total Cells) × 100, the calculated percentage increases strictly linearly with dividing cell count when total cell count is held constant.'
  },
  {
    id: 'obs_2',
    question: 'In the Michaelis-Menten kinetics display, what do you notice about the reaction velocity when shifting temperature away from 37°C or pH away from 7.4?',
    options: [
      'Reaction velocity declines sharply due to thermal denaturation or non-optimal active site ionization',
      'Reaction velocity increases continuously under extreme conditions',
      'Apparent Km decreases to zero while Vmax doubles',
      'The enzyme converts into a competitive inhibitor'
    ],
    observableOptions: [
      'Reaction velocity declines sharply due to thermal denaturation or non-optimal active site ionization',
      'Reaction velocity increases continuously under extreme conditions',
      'Apparent Km decreases to zero while Vmax doubles',
      'The enzyme converts into a competitive inhibitor'
    ],
    correctIndex: 0,
    explanation: 'Notice that both temperature and pH have bell-shaped efficiency curves centered at physiological optima (37°C, pH 7.4), and deviating in either direction severely dampens effective Vmax.'
  }
];

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

// ─── 22 CHALLENGES (Foundation, Standard, Advanced covering all 10 nodes) ───
const CHALLENGES: Challenge[] = [
  // 1. Mitotic Index (Foundation / Recall)
  {
    id: 'ch_bio_01',
    nodeId: NODE_C11_BIOTECH_021,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A slide of onion root meristem has 45 dividing cells out of 150 total observed cells. Calculate the Mitotic Index percentage.',
    correctAnswer: 30,
    tolerance: 0.5,
    unit: '%',
    explanation: 'Mitotic Index = (Cells in Mitosis / Total Cells) × 100. Here, (45 / 150) × 100 = 30%.',
    hints: [
      'Use the formula: MI = (Dividing cells ÷ Total cells) × 100.',
      'Divide 45 by 150 first.',
      '45 / 150 = 0.30. Multiply by 100 to get 30%.'
    ],
    misconceptionIndex: 0
  },
  // 2. Stem Cells (Foundation / Understanding)
  {
    id: 'ch_bio_02',
    nodeId: NODE_C11_BIOTECH_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which type of stem cell can generate an entire organism including extra-embryonic tissues (like the placenta)?',
    options: [
      'Totipotent stem cell (e.g., Zygote)',
      'Pluripotent stem cell (e.g., Inner Cell Mass)',
      'Multipotent stem cell (e.g., Haematopoietic stem cell)',
      'Unipotent stem cell (e.g., Spermatogonial stem cell)'
    ],
    correctIndex: 0,
    explanation: 'Totipotent stem cells (zygote and early blastomeres) have the absolute potency to produce embryonic and extra-embryonic membranes.',
    hints: [
      'Think of total developmental potency.',
      'Pluripotent cells cannot make the placenta on their own.',
      'Totipotent means capable of everything—an entire living organism with placenta.'
    ],
    misconceptionIndex: 1
  },
  // 3. Signal Transduction (Foundation / Recall)
  {
    id: 'ch_bio_03',
    nodeId: NODE_C11_BIOTECH_023,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why do steroid hormones (e.g., cortisol, oestrogen) act through intracellular receptors rather than cell-surface GPCRs?',
    options: [
      'They are lipid-soluble and diffuse freely across the hydrophobic plasma membrane',
      'They are water-soluble proteins that need secondary cyclic AMP messengers',
      'They are too bulky to bind membrane receptors',
      'They are rapidly degraded by extracellular phosphodiesterases'
    ],
    correctIndex: 0,
    explanation: 'Steroid hormones derived from cholesterol are lipophilic; they cross the lipid bilayer to bind cytoplasmic/nuclear receptors acting directly as transcription factors.',
    hints: [
      'Recall the lipid bilayer composition of the cell membrane.',
      'Like dissolves like: cholesterol-derived hormones pass through fatty membranes.',
      'Lipid solubility allows direct penetration to intracellular targets.'
    ],
    misconceptionIndex: 2
  },
  // 4. Apoptosis vs Necrosis (Foundation / Understanding)
  {
    id: 'ch_bio_04',
    nodeId: NODE_C11_BIOTECH_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When DNA from a dying cell culture runs on an agarose gel and displays a 180 bp periodic ladder pattern without inflammation, what process occurred?',
    options: [
      'Apoptosis (Programmed Cell Death via endonuclease cleavage)',
      'Necrosis (Lytic burst with random smear)',
      'Autophagy without caspase activation',
      'Mitotic senescence'
    ],
    correctIndex: 0,
    explanation: 'Apoptosis features internucleosomal DNA cleavage by endonucleases at ~180 bp linker intervals, presenting a clear ladder without inflammatory lysis.',
    hints: [
      'Look for the regular ladder pattern versus a smeared random cut.',
      'Caspase-activated endonucleases cut between nucleosomes (~180-200 bp).',
      'This orderly, non-inflammatory programmed death is Apoptosis.'
    ],
    misconceptionIndex: 3
  },
  // 5. Microscopy & Karyotyping (Foundation / Drag-label)
  {
    id: 'ch_bio_05',
    nodeId: NODE_C11_BIOTECH_025,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct cytogenetic workflow stages into the laboratory timeline.',
    dragItems: [
      { label: 'Colchicine Arrest', targetId: 'step_1' },
      { label: 'Hypotonic Swelling', targetId: 'step_2' },
      { label: 'Giemsa G-Banding', targetId: 'step_3' },
      { label: 'Karyogram Pairing', targetId: 'step_4' }
    ],
    correctMapping: {
      step_1: 'Colchicine Arrest',
      step_2: 'Hypotonic Swelling',
      step_3: 'Giemsa G-Banding',
      step_4: 'Karyogram Pairing'
    },
    explanation: 'Karyotyping steps: arrest at metaphase with colchicine → swell with hypotonic KCl → fix and stain with Giemsa (G-bands) → arrange homologous pairs.',
    hints: [
      'First stop mitotic spindle formation.',
      'Next burst/spread the cells gently in hypotonic solution.',
      'Stain with Giemsa before photographic alignment into pairs.'
    ]
  },
  // 6. Carbohydrates (Foundation / Classify)
  {
    id: 'ch_bio_06',
    nodeId: NODE_C11_BIOTECH_026,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which polysaccharide serves as the structural component of fungal cell walls and arthropod exoskeletons, yielding N-acetylglucosamine upon hydrolysis?',
    options: ['Chitin', 'Glycogen', 'Cellulose', 'Peptidoglycan'],
    correctIndex: 0,
    explanation: 'Chitin is a homopolymer of N-acetylglucosamine (NAG) linked by β-1,4 glycosidic bonds, building fungal walls and crab/shrimp exoskeletons.',
    hints: [
      'It is widely converted to chitosan in coastal Indian processing units.',
      'Contains nitrogenous acetylated glucosamine units.',
      'The molecule is Chitin.'
    ]
  },
  // 7. Proteins - Amino Acid Properties (Foundation / Match)
  {
    id: 'ch_bio_07',
    nodeId: NODE_C11_BIOTECH_027,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match the amino acid to its unique side-chain (R-group) character:',
    options: [
      'Glycine = -H (simplest), Serine = -CH2OH (polar), Alanine = -CH3 (non-polar)',
      'Glycine = -CH3, Serine = -H, Alanine = -COOH',
      'Glycine = Benzene ring, Serine = Thiol group, Alanine = Amine group',
      'Glycine = Guanidinium, Serine = Indole ring, Alanine = Hydroxyl group'
    ],
    correctIndex: 0,
    explanation: 'Glycine has a single hydrogen atom as R-group; Serine possesses a hydroxymethyl (-CH2OH) group; Alanine has a methyl group (-CH3).',
    hints: [
      'Glycine is the only achiral standard amino acid because R = H.',
      'Serine has a primary alcohol side chain.',
      'Alanine has a simple methyl aliphatic group.'
    ]
  },
  // 8. Lipids (Standard / Analysis)
  {
    id: 'ch_bio_08',
    nodeId: NODE_C11_BIOTECH_028,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How do phospholipids spontaneously assemble into liposomal nanocarriers in aqueous pharmaceutical buffers?',
    options: [
      'Hydrophilic phosphate heads orient towards aqueous phases while hydrophobic fatty acyl tails sequester within the bilayer interior',
      'Covalent disulfide links cross-link the glycerol backbones into rigid cages',
      'Ionic calcium bridges crystallize the hydrocarbon tails',
      'Hydrophobic heads project outward into the polar water molecules'
    ],
    correctIndex: 0,
    explanation: 'Phospholipids are amphipathic. In water, thermodynamically favorable hydrophobic interactions drive tails together while polar heads face the solvent.',
    hints: [
      'Consider the amphipathic nature: polar head + non-polar tails.',
      'Water is polar—what parts of the lipid want to touch water?',
      'Phosphate heads interact with water, fatty tails hide inside the bilayer.'
    ]
  },
  // 9. Vitamins & Coenzymes (Standard / Match)
  {
    id: 'ch_bio_09',
    nodeId: NODE_C11_BIOTECH_029,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Identify the correct pairing of vitamin precursor with its derived active metabolic coenzyme:',
    options: [
      'Niacin (B3) -> NAD+/NADP+ ; Thiamine (B1) -> TPP ; Riboflavin (B2) -> FAD',
      'Niacin (B3) -> FAD ; Thiamine (B1) -> Coenzyme A ; Riboflavin (B2) -> NAD+',
      'Niacin (B3) -> PLP ; Thiamine (B1) -> Biotin ; Riboflavin (B2) -> TPP',
      'Niacin (B3) -> Cobalamin ; Thiamine (B1) -> FMN ; Riboflavin (B2) -> Coenzyme Q'
    ],
    correctIndex: 0,
    explanation: 'Vitamin B1 (Thiamine) forms Thiamine Pyrophosphate (TPP); B2 (Riboflavin) forms FAD/FMN; B3 (Niacin) forms NAD+/NADP+.',
    hints: [
      'Niacin provides the nicotinamide ring for NAD+ electron transport.',
      'Riboflavin gives Flavin Adenine Dinucleotide (FAD).',
      'Thiamine is converted to TPP for oxidative decarboxylation.'
    ]
  },
  // 10. Enzyme Kinetics - Michaelis-Menten (Standard / Numeric)
  {
    id: 'ch_bio_10',
    nodeId: NODE_C11_BIOTECH_030,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An immobilized lactase in an Anand dairy facility has Vmax = 80 μmol/min and Km = 4 mM. What is the reaction velocity (v) when substrate [S] = 4 mM?',
    correctAnswer: 40,
    tolerance: 0.5,
    unit: 'μmol/min',
    explanation: 'By definition of the Michaelis constant, when [S] = Km, the velocity v = Vmax / 2 = 80 / 2 = 40 μmol/min.',
    hints: [
      'Recall the definition of Km.',
      'Km is the substrate concentration at which velocity is exactly half of Vmax.',
      '80 divided by 2 is 40.'
    ]
  },
  // 11. Enzyme Inhibition (Standard / Analysis)
  {
    id: 'ch_bio_11',
    nodeId: NODE_C11_BIOTECH_030,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In competitive enzyme inhibition, what happens to Vmax and apparent Km as inhibitor concentration increases?',
    options: [
      'Vmax remains unchanged; Km increases (lower apparent affinity)',
      'Vmax decreases; Km remains unchanged',
      'Both Vmax and Km decrease proportionally',
      'Vmax increases; Km decreases'
    ],
    correctIndex: 0,
    explanation: 'Competitive inhibitors bind the active site reversibly. Excess substrate outcompetes the inhibitor, so Vmax is unchanged, but higher [S] is required to reach 1/2 Vmax (Km increases).',
    hints: [
      'Can you overcome a competitive inhibitor by dumping in tons of substrate?',
      'Yes, infinite substrate displaces the inhibitor, so maximum speed Vmax is preserved.',
      'Higher substrate needed to reach half-speed means higher apparent Km.'
    ],
    misconceptionIndex: 4
  },
  // 12. Stem Cell Potency Sorting (Standard / Drag-sort)
  {
    id: 'ch_bio_12',
    nodeId: NODE_C11_BIOTECH_022,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Sort stem cell types from HIGHEST developmental potency to LOWEST potency:',
    sortItems: [
      'Totipotent (e.g. Zygote up to 8-cell morula)',
      'Pluripotent (e.g. Inner Cell Mass blastocyst)',
      'Multipotent (e.g. Haematopoietic bone marrow)',
      'Unipotent (e.g. Epidermal basal stem cell)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Potency hierarchy: Totipotent (whole organism + placenta) > Pluripotent (all 3 germ layers) > Multipotent (multiple types within single lineage) > Unipotent (single cell type).',
    hints: [
      'Start with the cell that can build an entire baby plus the placenta.',
      'Follow with the inner cell mass of the blastocyst.',
      'End with lineage-restricted blood and epidermal progenitor cells.'
    ]
  },
  // 13. Indirect Signal Transduction Cascade (Standard / Construct)
  {
    id: 'ch_bio_13',
    nodeId: NODE_C11_BIOTECH_023,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Assemble the correct secondary messenger cascade triggered by adrenaline binding in liver cells:',
    availableParts: ['Hormone binds GPCR', 'G-alpha activates Adenylyl Cyclase', 'ATP converted to cAMP', 'Protein Kinase A activated', 'Glycogen Phosphorylase triggers glucose release'],
    targetState: 'Hormone binds GPCR G-alpha activates Adenylyl Cyclase ATP converted to cAMP Protein Kinase A activated Glycogen Phosphorylase triggers glucose release',
    validationHint: 'Sequence: Receptor Binding -> G-protein switch -> Adenylyl Cyclase -> cAMP synthesis -> PKA activation -> Target enzyme phosphorylation.',
    explanation: 'Adrenaline binds membrane GPCR -> G-alpha exchanges GDP for GTP -> Adenylyl cyclase synthesizes cAMP second messenger -> PKA phosphorylates and activates phosphorylase cascade.',
    hints: [
      'Start with hormone docking at the membrane receptor.',
      'Next is G-protein activation of adenylyl cyclase.',
      'Cyclic AMP generation triggers protein kinase A.'
    ]
  },
  // 14. Programmed Cell Death vs Lysis (Standard / Distinguish)
  {
    id: 'ch_bio_14',
    nodeId: NODE_C11_BIOTECH_024,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Which molecular regulator actively PREVENTS mitochondrial outer membrane permeabilization (MOMP) and protects cells from apoptosis?',
    options: [
      'Bcl-2 (Anti-apoptotic proto-oncogene)',
      'Bax and Bak (Pro-apoptotic pore formers)',
      'Caspase-3 (Effector executioner)',
      'Cytochrome c'
    ],
    correctIndex: 0,
    explanation: 'Bcl-2 is an anti-apoptotic protein that heterodimerizes with Bax/Bak to prevent cytochrome c release from mitochondria, preserving cell viability.',
    hints: [
      'Look for the protein that keeps cells alive.',
      'Bax and Bak promote death pores.',
      'Bcl-2 blocks Bax/Bak and inhibits apoptosis.'
    ]
  },
  // 15. Light vs Electron Microscopy (Standard / Distinguish)
  {
    id: 'ch_bio_15',
    nodeId: NODE_C11_BIOTECH_025,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why does Transmission Electron Microscopy (TEM) achieve ~0.1 nm resolution compared to ~200 nm for compound light microscopy?',
    options: [
      'Accelerated electron beams have a de Broglie wavelength thousands of times shorter than visible light photons',
      'Electron lenses are made of pure quartz crystal without spherical aberration',
      'Light microscopes operate in a vacuum which causes light diffraction',
      'Staining with heavy lead salts amplifies visible light waves'
    ],
    correctIndex: 0,
    explanation: 'Resolution is diffraction-limited (Abbe limit: d = λ / 2NA). Accelerated electrons have de Broglie wavelengths of ~0.005 nm vs 400-700 nm for light.',
    hints: [
      'Resolution limit depends directly on the wavelength of illumination.',
      'Shorter wavelength yields much finer resolving power.',
      'Electrons have an extremely small de Broglie wavelength.'
    ]
  },
  // 16. Protein Structure Levels (Advanced / Analysis)
  {
    id: 'ch_bio_16',
    nodeId: NODE_C11_BIOTECH_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Sickle cell anaemia results from a single point mutation changing glutamate (polar, negative) to valine (non-polar) at position 6 of the beta-globin chain. What structural breakdown occurs?',
    options: [
      'Altered primary sequence exposes a hydrophobic patch, inducing abnormal quaternary polymerisation into rigid sickle fibers at low pO2',
      'The peptide backbone breaks down into free amino acids',
      'Alpha-helices transform into uncoiled random loops throughout the entire subunit',
      'Disulfide bridges fail to form between adjacent valine residues'
    ],
    correctIndex: 0,
    explanation: 'Primary sequence mutation (Glu6Val) creates a hydrophobic pocket on the surface of deoxygenated HbS, leading to quaternary aggregate fiber formation.',
    hints: [
      'Valine is hydrophobic and prefers to avoid water.',
      'Under low oxygen, these hydrophobic residues aggregate.',
      'This disrupts quaternary hemoglobin packing into sickled polymers.'
    ]
  },
  // 17. Biofuel from Bagasse - Carbohydrate Engineering (Advanced / Application)
  {
    id: 'ch_bio_17',
    nodeId: NODE_C11_BIOTECH_026,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A biotechnology plant in Pune converts sugarcane bagasse to bioethanol. Why must cellulose be treated with cellulase cocktail (endoglucanase, cellobiohydrolase, β-glucosidase) instead of human salivary amylase?',
    options: [
      'Cellulose contains β-1,4-glycosidic bonds forming flat hydrogen-bonded crystalline sheets, requiring specific β-glycosidases that amylase (specific for α-1,4 bonds) cannot cleave',
      'Salivary amylase only digests proteins and nucleic acids',
      'Cellulose is a branched polymer of fructose and galactose',
      'Bagasse contains only alpha-1,6 linkages requiring pullulanase'
    ],
    correctIndex: 0,
    explanation: 'Amylase specifically hydrolyses α-1,4 glucosidic bonds in starch. Cellulose consists of inverted β-1,4 glucose repeats forming tight crystalline microfibrils requiring cellulases.',
    hints: [
      'Compare starch (alpha linkages) with cellulose (beta linkages).',
      'Enzymes have stereospecific active sites.',
      'Only cellulases with beta-1,4 bond specificity can hydrolyze cellulose into fermentable glucose.'
    ]
  },
  // 18. Enzyme Kinetics - Competitive vs Non-Competitive (Advanced / Evaluation)
  {
    id: 'ch_bio_18',
    nodeId: NODE_C11_BIOTECH_030,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In the presence of lead (Pb2+) or cyanide acting as a non-competitive allosteric inhibitor on cytochrome oxidase, what happens to the Lineweaver-Burk double reciprocal plot?',
    options: [
      '1/Vmax increases (Vmax decreases, y-intercept shifts upward), while -1/Km remains unchanged (x-intercept unchanged)',
      '1/Vmax remains unchanged while x-intercept shifts rightward',
      'Both x and y intercepts remain identical',
      'Km decreases while Vmax increases exponentially'
    ],
    correctIndex: 0,
    explanation: 'Non-competitive inhibitors reduce catalytic efficiency without affecting substrate affinity: Vmax decreases (so 1/Vmax moves up on y-axis) while Km remains constant (x-intercept -1/Km is fixed).',
    hints: [
      'Non-competitive inhibitors do not compete with substrate at the active site.',
      'Affinity (Km) is unchanged, so the x-axis intercept is constant.',
      'Max velocity drops, raising the reciprocal 1/Vmax.'
    ]
  },
  // 19. Diagnostic Karyotype Evaluation (Advanced / Evaluation)
  {
    id: 'ch_bio_19',
    nodeId: NODE_C11_BIOTECH_025,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An amniocentesis karyogram at AIIMS Delhi shows 47 chromosomes with three copies of chromosome 21 in a female fetus. How is this karyotype formally designated and diagnosed?',
    options: [
      '47, XX, +21 (Down syndrome trisomy)',
      '45, X0 (Turner syndrome monosomy)',
      '47, XXY (Klinefelter syndrome)',
      '46, XX, del(5p) (Cri-du-chat syndrome)'
    ],
    correctIndex: 0,
    explanation: 'Standard cytogenetic nomenclature: Total count (47), sex chromosomes (XX), abnormality (+21), diagnosing Down syndrome trisomy 21.',
    hints: [
      'Look at total chromosome count (46 + 1 = 47).',
      'Female sex chromosomes are XX.',
      'Trisomy 21 is designated +21.'
    ]
  },
  // 20. Lipid Membrane Fluidity & Cholesterol Buffer (Advanced / Analysis)
  {
    id: 'ch_bio_20',
    nodeId: NODE_C11_BIOTECH_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How does cholesterol act as a bidirectional fluidity buffer in mammalian cell culture bioreactors operating under temperature fluctuations?',
    options: [
      'At high temperatures, its rigid steroid rings hinder phospholipid motion (reducing fluidity); at low temperatures, it prevents fatty acyl chains from packing tightly (preventing freezing)',
      'It hydrolyses phospholipids into free glycerol at all temperatures',
      'It acts as an ATP pump that warms up the cell interior',
      'It dissolves the membrane bilayer to release recombinant proteins'
    ],
    correctIndex: 0,
    explanation: 'Cholesterol is a bidirectional membrane fluidity regulator: sterol rings immobilize lipid tails at high heat, and disrupt crystalline freezing at cold temperatures.',
    hints: [
      'Think of cholesterol as a physical spacer and stabilizer.',
      'In hot conditions it restrains wild movement; in cold conditions it prevents tight crystallization.',
      'This keeps the membrane fluidity in a stable goldilocks zone.'
    ]
  },
  // 21. Metabolic Deficiency & Indian Clinical Diet (Advanced / Application)
  {
    id: 'ch_bio_21',
    nodeId: NODE_C11_BIOTECH_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A patient from an arid area presents with night blindness (nyctalopia) and xerophthalmia. Which biochemical lipid-soluble micronutrient is deficient, and what Indian dietary source will immediately restore it?',
    options: [
      'Vitamin A (Retinol); restored with carrots, papaya, spinach (beta-carotene), and fortified milk',
      'Vitamin C (Ascorbic acid); restored with citrus fruits',
      'Vitamin B1 (Thiamine); restored with polished white rice',
      'Vitamin D (Calciferol); restored with dietary table salt'
    ],
    correctIndex: 0,
    explanation: 'Retinol (Vitamin A) is the chromophore precursor for rhodopsin in retinal rod cells. Provitamin A carotenoids are rich in green leafy vegetables, carrots, and papaya.',
    hints: [
      'Night blindness is linked to rhodopsin pigment deficiency in the eye.',
      'Vitamin A is fat-soluble.',
      'Beta-carotene in carrots and green leafy vegetables cures Vitamin A deficiency.'
    ]
  },
  // 22. Designing an Anti-Cancer Pro-Apoptotic Drug (Advanced / Creativity)
  {
    id: 'ch_bio_22',
    nodeId: NODE_C11_BIOTECH_024,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Design an engineered synthetic biopharmaceutical strategy to overcome Bcl-2 overexpression in chemotherapy-resistant lymphoma cells:',
    availableParts: ['BH3-mimetic small molecule binds Bcl-2 pocket', 'Bax/Bak freed from Bcl-2 inhibition', 'Mitochondrial MOMP pore formation', 'Cytochrome c leakage into cytosol', 'Apaf-1 apoptosome activates Caspase-9 and Caspase-3'],
    targetState: 'BH3-mimetic small molecule binds Bcl-2 pocket Bax/Bak freed from Bcl-2 inhibition Mitochondrial MOMP pore formation Cytochrome c leakage into cytosol Apaf-1 apoptosome activates Caspase-9 and Caspase-3',
    validationHint: 'Target: Inhibit anti-apoptotic Bcl-2 -> Release Bax/Bak -> Induce MOMP -> Release Cytochrome c -> Assemble Apoptosome and Caspases.',
    explanation: 'BH3 mimetics (like Venetoclax) bind Bcl-2, freeing pro-apoptotic Bax/Bak to punch mitochondrial holes, releasing cytochrome c to trigger apoptosome-driven caspase destruction.',
    hints: [
      'First neutralize the overexpressed Bcl-2 shield with a BH3 mimetic.',
      'Free Bax/Bak forms the outer membrane pore.',
      'Cytochrome c triggers the apoptosome and executioner caspases.'
    ]
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
  nodeId: NODE_C11_BIOTECH_021,
  title: 'Biotechnology: Mitosis, Meiosis, Stem Cells, Cytology & Biomolecules',
  definition: 'Comprehensive unit covering the significance of cell division, mitotic index, stem cell potency hierarchies, direct/indirect signal transduction, apoptosis vs necrosis, microscopy and karyotyping, and the four major classes of biomolecules (carbohydrates, proteins, lipids, vitamins/enzymes).',
  eli5: 'Cell division either copies cells exactly (mitosis for growth and repair) or shuffles genes for gametes (meiosis). Stem cells are blank slates that can turn into specific tissues. Cells talk using fast membrane cascades or slow steroid switches, and tidy up with apoptosis. Everything is run by biomolecules: sugars for fuel, proteins and enzymes for work, lipids for membranes, and vitamins as coenzyme helpers.',
  misconceptions: [
    { misconception: 'High Mitotic Index always implies malignant cancer', correction: 'High MI is completely normal and necessary in active meristems (like onion root tips) and regenerating healing tissues.' },
    { misconception: 'All stem cells can generate an entire fetus and placenta', correction: 'Only totipotent cells (zygote, early blastomeres) can make extra-embryonic placenta; pluripotent stem cells only make the 3 embryonic germ layers.' },
    { misconception: 'Protein hormones can cross the lipid bilayer directly', correction: 'Protein hormones are hydrophilic and require cell surface membrane receptors and second messengers (cAMP, IP3).' },
    { misconception: 'Apoptosis causes severe inflammation and tissue swelling', correction: 'Apoptosis is non-inflammatory; cells shrink into membrane-bound apoptotic bodies engulfed quietly by phagocytes.' },
    { misconception: 'Competitive inhibitors decrease the maximum velocity Vmax', correction: 'Competitive inhibitors only increase Km; given high enough substrate concentration, original Vmax is fully reached.' }
  ],
  diagnosticQuestions: [
    { question: 'What is the mathematical formula for Mitotic Index (MI)?', options: ['(Dividing Cells / Total Cells) × 100', '(Total Cells / Dividing Cells) × 100', '(Interphase Cells / Dividing Cells) × 100', '(Anaphase Cells / Metaphase Cells) × 100'], correctIndex: 0 },
    { question: 'Which level of stem cell potency is demonstrated by bone marrow haematopoietic cells?', options: ['Totipotent', 'Pluripotent', 'Multipotent', 'Nullipotent'], correctIndex: 2 },
    { question: 'Which second messenger is synthesized by adenylyl cyclase upon GPCR stimulation?', options: ['Cyclic AMP (cAMP)', 'DNA polymerase', 'Phospholipid', 'Cholesterol'], correctIndex: 0 },
    { question: 'What is the characteristic DNA gel electrophoresis pattern in apoptotic cells?', options: ['Uniform smear', '180 bp nucleosomal ladder', 'Single intact genomic band', 'No DNA visible'], correctIndex: 1 },
    { question: 'Which chemical agent arrests dividing lymphocytes at metaphase for karyotyping?', options: ['Colchicine', 'Ethanol', 'Amylase', 'Iodine'], correctIndex: 0 },
    { question: 'What bond connects glucose units in linear cellulose microfibrils?', options: ['alpha-1,4-glycosidic', 'beta-1,4-glycosidic', 'Peptide bond', 'Phosphodiester bond'], correctIndex: 1 },
    { question: 'Which level of protein structure involves hydrogen bonding into alpha-helices and beta-sheets?', options: ['Primary', 'Secondary', 'Tertiary', 'Quaternary'], correctIndex: 1 },
    { question: 'What happens to Km and Vmax in competitive enzyme inhibition?', options: ['Km increases, Vmax unchanged', 'Km unchanged, Vmax decreases', 'Both decrease', 'Both increase'], correctIndex: 0 }
  ],
  masteryCriteria: 'Mastery is achieved by analyzing cell proliferation via Mitotic Index, differentiating stem cell potencies, modeling signal cascades, interpreting karyograms, and solving enzyme kinetics under competitive and non-competitive inhibition.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (Learn by doing) ───
const EXPLORATION_STEPS = [
  {
    title: '1. Meristematic Mitotic Index Lab',
    instruction: 'Adjust the mitotic cell count slider to observe how the Mitotic Index (MI) responds in root meristems vs quiescent tissue.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_BIOTECH_021
  },
  {
    title: '2. Stem Cell Potency Hierarchy',
    instruction: 'Click each cell in the developmental tree to test its potency (Totipotent, Pluripotent, Multipotent) and see what tissues it can build.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C11_BIOTECH_022
  },
  {
    title: '3. Dual Signal Transduction Simulator',
    instruction: 'Toggle between Steroid (direct nuclear) and Peptide (indirect cAMP cascade) hormone pathways to compare speed and mechanism.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_BIOTECH_023
  },
  {
    title: '4. Apoptotic Cleavage & DNA Laddering',
    instruction: 'Trigger the caspase cascade slider to see cellular blebbing, chromatin condensation, and agarose gel laddering.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_BIOTECH_024
  },
  {
    title: '5. Michaelis-Menten Enzyme Kinetics & Inhibition',
    instruction: 'Adjust substrate concentration [S] and toggle Competitive vs Non-Competitive inhibitors to inspect real-time velocity curves.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_BIOTECH_030
  }
];

// ─── REFLECTION QUESTIONS ───
const REFLECTION_QUESTIONS = [
  {
    id: 'ref_1',
    prompt: 'What was the most surprising thing you learned?',
    placeholder: 'e.g., How competitive inhibitors do not change Vmax, only Km...'
  },
  {
    id: 'ref_2',
    prompt: 'How would you explain this to a friend?',
    placeholder: 'e.g., Mitosis is like making identical photocopies, whereas meiosis creates unique genetic blends...'
  },
  {
    id: 'ref_3',
    prompt: 'Where in real life might you use this?',
    placeholder: 'e.g., Designing targeted liposomal cancer medications or monitoring industrial fermentation batches...'
  }
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Inovio Biotech Bioreactor Quality Assurance Challenge',
  description: 'Apply your understanding of mitotic index, stem cell maintenance, and enzyme kinetics to audit a real-world batch fermentation producing recombinant human insulin in Bengaluru.',
  steps: [
    'Measure root tip squash slides under 400x light microscope to calculate Mitotic Index (aim for 25-35% in active seed callus).',
    'Verify that recombinant CHO or yeast cells maintain uniform 46,XX or diploid karyotypes without aneuploidy.',
    'Formulate liposomal carriers using pure phosphatidylcholine + 30% cholesterol for targeted drug delivery.',
    'Test industrial amylase or protease batches with Lineweaver-Burk plots to confirm low Km and uninhibited Vmax.'
  ]
};

// ─── MAIN COMPONENT ───
export function C11_BiotechnologySignificanceMitosisMeiosisSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['biotech'] || { name: 'Biotechnology', emoji: '🧬', color: 'teal' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery / Interaction States
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [selectedDiscoveryOpt, setSelectedDiscoveryOpt] = useState<number | null>(null);

  // Prediction & Observation Pattern States
  const [predictionAnswers, setPredictionAnswers] = useState<Record<string, number>>({});
  const [predictionRevealed, setPredictionRevealed] = useState<Record<string, boolean>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<string, number>>({});
  const [observationRevealed, setObservationRevealed] = useState<Record<string, boolean>>({});

  // Interactive Exploration & Sandbox Variables
  const [dividingCells, setDividingCells] = useState(60);
  const [totalCells, setTotalCells] = useState(200);
  const [selectedStemCell, setSelectedStemCell] = useState<'totipotent' | 'pluripotent' | 'multipotent'>('totipotent');
  const [signalMode, setSignalMode] = useState<'steroid' | 'peptide'>('steroid');
  const [caspaseProgress, setCaspaseProgress] = useState(0);
  const [substrateConc, setSubstrateConc] = useState(10);
  const [inhibitorType, setInhibitorType] = useState<'none' | 'competitive' | 'non-competitive'>('none');
  const [tempC, setTempC] = useState(37);
  const [phVal, setPhVal] = useState(7.4);

  // Challenge & Adaptive Difficulty
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
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Interactive Question State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

  // Visual Feedback & Micro-interactions
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Reflection responses
  const [reflections, setReflections] = useState<Record<string, string>>({
    ref_1: '',
    ref_2: '',
    ref_3: ''
  });

  // Tracking misconceptions
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Calculated Mitotic Index
  const calculatedMI = useMemo(() => {
    if (totalCells <= 0) return 0;
    return Number(((dividingCells / totalCells) * 100).toFixed(1));
  }, [dividingCells, totalCells]);

  // Enzyme Velocity Calculation
  const enzymeKinetics = useMemo(() => {
    let baseVmax = 100;
    let baseKm = 10;

    const tempFactor = Math.exp(-Math.pow(tempC - 37, 2) / 120);
    const phFactor = Math.exp(-Math.pow(phVal - 7.4, 2) / 3);
    const envEfficiency = Math.max(0.05, tempFactor * phFactor);

    let effectiveVmax = baseVmax * envEfficiency;
    let effectiveKm = baseKm;

    if (inhibitorType === 'competitive') {
      effectiveKm = baseKm * 3;
    } else if (inhibitorType === 'non-competitive') {
      effectiveVmax = (baseVmax * 0.45) * envEfficiency;
    }

    const velocity = (effectiveVmax * substrateConc) / (effectiveKm + substrateConc);
    return {
      v: Number(velocity.toFixed(1)),
      vmax: Number(effectiveVmax.toFixed(1)),
      km: Number(effectiveKm.toFixed(1)),
      envEfficiency: Number((envEfficiency * 100).toFixed(0))
    };
  }, [substrateConc, inhibitorType, tempC, phVal]);

  // Adaptive Challenges Filter
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentCh = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load existing mastery
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adapt difficulty based on BKT
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

  // Canvas Animation for Bioreactor & Cell division simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#1e293b');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const numBubbles = Math.min(24, Math.floor(dividingCells / 3) + 4);
      for (let i = 0; i < numBubbles; i++) {
        const angle = (i / numBubbles) * Math.PI * 2 + t * 0.5;
        const radius = 35 + Math.sin(t + i) * 8;
        const cx = (canvas.width / 2) + Math.cos(angle) * (60 + Math.sin(t * 0.8 + i) * 15);
        const cy = (canvas.height / 2) + Math.sin(angle) * (35 + Math.cos(t * 0.8 + i) * 10);

        ctx.beginPath();
        ctx.arc(cx, cy, radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? 'rgba(45, 212, 191, 0.45)' : 'rgba(99, 102, 241, 0.45)';
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, 4 + Math.sin(t * 2 + i) * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = '#f43f5e';
        ctx.fill();
      }

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Bioreactor Proliferation Rate: ${calculatedMI}%`, 12, 20);
      ctx.fillText(`Enzyme V: ${enzymeKinetics.v} μmol/min`, canvas.width - 170, 20);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [calculatedMI, dividingCells, enzymeKinetics]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    setSelectedDiscoveryOpt(idx);
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'error');
    speechManager.speak(isCorr ? 'Excellent diagnostic reasoning!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handlePredictionAnswer = useCallback((qId: string, optIdx: number, correctIdx: number) => {
    setPredictionAnswers(prev => ({ ...prev, [qId]: optIdx }));
    setPredictionRevealed(prev => ({ ...prev, [qId]: true }));
    const isCorrect = optIdx === correctIdx;
    audioManager.play(isCorrect ? 'success' : 'error');
  }, []);

  const handleObservationAnswer = useCallback((qId: string, optIdx: number, correctIdx: number) => {
    setObservationAnswers(prev => ({ ...prev, [qId]: optIdx }));
    setObservationRevealed(prev => ({ ...prev, [qId]: true }));
    const isCorrect = optIdx === correctIdx;
    audioManager.play(isCorrect ? 'success' : 'error');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the core cytology and biochemistry simulations.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode. Feel free to tweak temperature, pH, inhibitors, and cellular mitotic counts.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Now test your competencies with board-standard challenges.');
  }, []);

  const handleStemCellSelect = useCallback((potency: 'totipotent' | 'pluripotent' | 'multipotent') => {
    setSelectedStemCell(potency);
    audioManager.play('tap');
    if (potency === 'totipotent') speechManager.speak('Totipotent: Capable of generating an entire organism plus extra-embryonic placenta.');
    if (potency === 'pluripotent') speechManager.speak('Pluripotent: Can differentiate into all three germ layers: ectoderm, mesoderm, and endoderm.');
    if (potency === 'multipotent') speechManager.speak('Multipotent: Lineage restricted, such as haematopoietic bone marrow cells.');
  }, []);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentCh.hints[nextLevel - 1]) {
      setCurrentHint(currentCh.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(currentCh.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
    }
  }, [hintCount, currentCh]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = currentCh.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, currentCh]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && currentCh.sortItems) {
        prev = currentCh.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [currentCh]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Outstanding performance! You completed the biotechnology module with score ${finalScore} percent.`);
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
    setSelectedOptionIndex(null);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (typeof answer === 'number' && (currentCh.type === 'classify' || currentCh.type === 'distinguish' || currentCh.type === 'match')) {
      setSelectedOptionIndex(answer);
      isCorrect = answer === currentCh.correctIndex;
    } else if (currentCh.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentCh.correctMapping);
    } else if (currentCh.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentCh.correctOrder);
    } else if (currentCh.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (currentCh.correctAnswer || 0)) <= (currentCh.tolerance || 0);
    } else if (currentCh.type === 'construct') {
      isCorrect = answer === currentCh.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('success');
      speechManager.speak('Brilliant! Correct deduction.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(currentCh.nodeId, currentCh.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + currentCh.nodeId, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (currentCh.misconceptionIndex !== undefined && !hitMisconceptions.includes(currentCh.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, currentCh.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us review the step-by-step mechanism.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(currentCh.nodeId, currentCh.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + currentCh.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
  }, [currentCh, hintCount, hitMisconceptions, showNextHint]);

  const handleSortSubmit = useCallback(() => {
    const ans = sortArrangement.length > 0 ? sortArrangement : (currentCh.sortItems?.map((_, i) => i) || []);
    let isCorrect = JSON.stringify(ans) === JSON.stringify(currentCh.correctOrder);
    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      if (hintCount < 3) showNextHint();
      else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
      }
    }
  }, [sortArrangement, currentCh, hintCount, showNextHint]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-2xl shadow-lg shadow-teal-500/10"
            aria-hidden="true"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-teal-400">Class 11 ISC • {subjectConfig.name}</span>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5 ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : difficulty === 'advanced'
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                : 'bg-teal-500/20 text-teal-300 border-teal-500/30'
            }`}
          >
            <span>{difficulty === 'foundation' ? '🌱' : difficulty === 'advanced' ? '🔥' : '⚡'}</span>
            <span>{difficulty}</span>
          </motion.span>
          <div className="text-right text-xs">
            <span className="text-slate-400">BKT Mastery: </span>
            <span className="text-teal-400 font-bold capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY (Curiosity Hook) ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-6 space-y-6"
        >
          <div className="p-6 bg-gradient-to-br from-teal-950/40 via-slate-900 to-indigo-950/40 rounded-2xl border border-teal-800/40 shadow-xl">
            <div className="flex items-center gap-2 text-teal-400 font-bold mb-2">
              <span aria-hidden="true">🔬</span>
              <span>Case Scenario Hook</span>
            </div>
            <h2 className="text-lg font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-teal-300/80 bg-teal-900/30 p-3 rounded-xl border border-teal-700/30">
              📌 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Initial Diagnostic Hook (Ungraded)</p>
            <h3 className="text-base md:text-lg font-semibold text-white">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => {
                const isSelected = selectedDiscoveryOpt === i;
                const isCorrect = i === DISCOVERY_QUESTION.correctIndex;
                const isWrong = isSelected && !isCorrect;

                return (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    animate={isWrong && wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`p-4 rounded-xl text-left text-sm transition-all border flex items-start gap-2 ${
                      discoveryAnswered && isCorrect
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : discoveryAnswered && isWrong
                        ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                        : discoveryAnswered
                        ? 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60'
                        : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-teal-400 mr-1">{String.fromCharCode(65 + i)}.</span>
                    <span className="flex-1">{opt}</span>
                    {discoveryAnswered && (
                      <span className="font-bold ml-2">
                        {isCorrect ? '✓' : isSelected ? '✗' : ''}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-4 rounded-xl bg-slate-950 border border-teal-700/50 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <p className={`text-sm flex items-center gap-2 ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  <span>{discoveryCorrect ? '✓' : '💡'}</span>
                  <span>{discoveryCorrect ? 'Spot on! Mitotic index is the gold standard for tracking cell proliferation.' : DISCOVERY_QUESTION.hintAfter}</span>
                </p>
                <motion.button
                  aria-label="Enter Interactive Labs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 whitespace-nowrap"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: EXPLORE (Interactive Guided Discovery) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <span className="text-xs text-slate-400 font-mono">Node: {EXPLORATION_STEPS[currentSlide].nodeId}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-teal-300">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* SLIDE 0: Mitotic Index Simulation */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                      <canvas ref={canvasRef} width={400} height={160} className="w-full rounded-xl border border-slate-800 shadow-inner" aria-label="Cell Division Animation Canvas" />
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Actively Dividing Cells (Pro, Meta, Ana, Telo):</span>
                            <span className="text-teal-400 font-bold">{dividingCells}</span>
                          </div>
                          <input
                            aria-label="Actively dividing cells count"
                            type="range"
                            min={0}
                            max={150}
                            value={dividingCells}
                            onChange={(e) => setDividingCells(Number(e.target.value))}
                            className="w-full accent-teal-500"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Total Cells in Field of View:</span>
                            <span className="text-teal-400 font-bold">{totalCells}</span>
                          </div>
                          <input
                            aria-label="Total cells in field of view"
                            type="range"
                            min={100}
                            max={400}
                            value={totalCells}
                            onChange={(e) => setTotalCells(Number(e.target.value))}
                            className="w-full accent-indigo-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-5 bg-gradient-to-br from-slate-950 to-teal-950/30 rounded-2xl border border-teal-900/40 space-y-3">
                      <h4 className="text-xs uppercase font-bold tracking-wider text-teal-400">Live Equation & Proliferation Meter</h4>
                      <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                        <p className="text-slate-400">MI (%) = (Dividing Cells / Total Cells) × 100</p>
                        <p className="text-teal-300 font-bold">MI = ({dividingCells} / {totalCells}) × 100 = {calculatedMI}%</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-1">
                        <p className="font-semibold text-white">Biotechnological Interpretation:</p>
                        <p>{calculatedMI > 30 ? '🚀 High Proliferation: Rapid meristematic elongation or growing callus ready for subculture.' : calculatedMI > 10 ? '🌱 Normal Growth: Balanced tissue regeneration.' : '🛑 Quiescent / Senescent: High interphase proportion or successful anti-mitotic chemotherapy response.'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Brilliant Observation Pattern: MI Observation */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-indigo-900/40 space-y-3">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                      <span>👁️ Observation Check</span>
                    </div>
                    <p className="text-sm text-slate-200 font-semibold">{OBSERVATION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[0].options.map((opt, oIdx) => {
                        const isChosen = observationAnswers['obs_1'] === oIdx;
                        const isCorrect = oIdx === OBSERVATION_QUESTIONS[0].correctIndex;
                        const isRevealed = observationRevealed['obs_1'];
                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleObservationAnswer('obs_1', oIdx, OBSERVATION_QUESTIONS[0].correctIndex)}
                            className={`p-3 rounded-xl text-left text-xs transition-all border ${
                              isRevealed && isCorrect
                                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                                : isRevealed && isChosen
                                ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                                : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300'
                            }`}
                          >
                            <span className="font-bold text-indigo-400 mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {observationRevealed['obs_1'] && (
                      <p className="text-xs text-indigo-300 bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-800/40">
                        💡 {OBSERVATION_QUESTIONS[0].explanation}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 1: Stem Cell Potency Tree */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {(['totipotent', 'pluripotent', 'multipotent'] as const).map((pot) => (
                      <motion.button
                        key={pot}
                        aria-label={`Select ${pot} stem cell potency type`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleStemCellSelect(pot)}
                        className={`p-4 rounded-2xl text-left border transition-all ${
                          selectedStemCell === pot
                            ? 'bg-teal-950/80 border-teal-400 shadow-lg shadow-teal-500/20'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">{pot}</span>
                        <h4 className="text-sm font-bold text-white capitalize">{pot === 'totipotent' ? 'Zygote & Morula' : pot === 'pluripotent' ? 'Inner Cell Mass' : 'Haematopoietic Stem Cell'}</h4>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center gap-6">
                    <svg viewBox="0 0 320 180" className="w-full md:w-64 h-36 bg-slate-900 rounded-xl p-2 border border-slate-800" aria-label="Stem cell potency hierarchy diagram">
                      <circle cx="160" cy="90" r="38" fill={selectedStemCell === 'totipotent' ? '#0d9488' : selectedStemCell === 'pluripotent' ? '#6366f1' : '#f59e0b'} opacity="0.8" />
                      <text x="160" y="86" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Stem Cell</text>
                      <text x="160" y="100" textAnchor="middle" fill="#e2e8f0" fontSize="8" className="uppercase">{selectedStemCell}</text>
                      <path d="M 160 52 L 160 20 M 160 128 L 160 160 M 122 90 L 70 90 M 198 90 L 250 90" stroke="#64748b" strokeWidth="2" strokeDasharray="3,3" />
                      <circle cx="160" cy="18" r="10" fill="#38bdf8" />
                      <circle cx="160" cy="162" r="10" fill="#ec4899" />
                      <circle cx="68" cy="90" r="10" fill="#22c55e" />
                      <circle cx="252" cy="90" r="10" fill="#eab308" />
                    </svg>

                    <div className="flex-1 space-y-2 text-sm">
                      <h4 className="font-bold text-white capitalize">{selectedStemCell} Potency Profile</h4>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        {selectedStemCell === 'totipotent' && 'Can differentiate into embryonic tissues (Ectoderm, Mesoderm, Endoderm) PLUS extra-embryonic tissues (Placenta and Amnion). Example: Zygote up to 8-cell stage.'}
                        {selectedStemCell === 'pluripotent' && 'Can form all three embryonic germ layers (Ectoderm: neurons; Mesoderm: cardiac muscle; Endoderm: liver/gut), but CANNOT form placenta. Example: Blastocyst Inner Cell Mass.'}
                        {selectedStemCell === 'multipotent' && 'Lineage-restricted progenitor cell capable of differentiating into multiple related cell types within one tissue family. Example: Bone marrow stem cells generating RBCs, WBCs, platelets.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: Signal Transduction */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="flex justify-center gap-3">
                    <motion.button
                      aria-label="View Steroid Hormone Direct Pathway"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSignalMode('steroid')}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase transition-all ${
                        signalMode === 'steroid' ? 'bg-amber-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Steroid Hormone (Direct / Intracellular)
                    </motion.button>
                    <motion.button
                      aria-label="View Peptide Hormone Indirect Pathway"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSignalMode('peptide')}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase transition-all ${
                        signalMode === 'peptide' ? 'bg-teal-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Peptide Hormone (Indirect / cAMP GPCR)
                    </motion.button>
                  </div>

                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <svg viewBox="0 0 300 180" className="w-full h-44 bg-slate-900 rounded-xl p-2 border border-slate-800" aria-label="Signal Transduction Pathway Diagram">
                      <rect x="20" y="20" width="260" height="140" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                      <line x1="20" y1="50" x2="280" y2="50" stroke="#0ea5e9" strokeWidth="4" strokeDasharray="6,4" />
                      <text x="30" y="44" fill="#38bdf8" fontSize="8" fontWeight="bold">Lipid Bilayer</text>

                      {signalMode === 'steroid' ? (
                        <>
                          <circle cx="70" cy="35" r="8" fill="#f59e0b" />
                          <text x="70" y="38" textAnchor="middle" fill="#000" fontSize="7" fontWeight="bold">Steroid</text>
                          <path d="M 70 45 L 70 80" stroke="#f59e0b" strokeWidth="2" />
                          <rect x="55" y="80" width="30" height="20" rx="4" fill="#d97706" />
                          <text x="70" y="93" textAnchor="middle" fill="#fff" fontSize="6">Receptor</text>
                          <circle cx="210" cy="110" r="32" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                          <text x="210" y="105" textAnchor="middle" fill="#a5b4fc" fontSize="8" fontWeight="bold">Nucleus</text>
                          <text x="210" y="118" textAnchor="middle" fill="#fbbf24" fontSize="7">Gene Transcription</text>
                          <path d="M 90 90 C 140 90, 160 110, 180 110" stroke="#f59e0b" strokeWidth="2" strokeDasharray="2,2" />
                        </>
                      ) : (
                        <>
                          <circle cx="70" cy="30" r="8" fill="#14b8a6" />
                          <text x="70" y="33" textAnchor="middle" fill="#000" fontSize="7" fontWeight="bold">Peptide</text>
                          <rect x="58" y="42" width="24" height="20" rx="4" fill="#0d9488" stroke="#2dd4bf" strokeWidth="1" />
                          <text x="70" y="55" textAnchor="middle" fill="#fff" fontSize="6">GPCR</text>
                          <path d="M 82 55 L 120 75" stroke="#2dd4bf" strokeWidth="2" />
                          <circle cx="130" cy="80" r="12" fill="#6366f1" />
                          <text x="130" y="83" textAnchor="middle" fill="#fff" fontSize="6">cAMP</text>
                          <path d="M 142 80 L 180 100" stroke="#818cf8" strokeWidth="2" />
                          <circle cx="195" cy="105" r="14" fill="#ec4899" />
                          <text x="195" y="108" textAnchor="middle" fill="#fff" fontSize="6">PKA Kinase</text>
                          <text x="195" y="130" textAnchor="middle" fill="#22c55e" fontSize="7" fontWeight="bold">Rapid Phosphorylation</text>
                        </>
                      )}
                    </svg>

                    <div className="space-y-2 text-xs text-slate-300">
                      <h4 className="text-sm font-bold text-white">
                        {signalMode === 'steroid' ? 'Lipid-Soluble Steroid Pathway' : 'Water-Soluble Peptide Hormone Cascade'}
                      </h4>
                      <p>
                        {signalMode === 'steroid'
                          ? 'Steroids (Cortisol, Oestrogen) diffuse straight through the hydrophobic lipid bilayer. Inside, they dock with intracellular/nuclear receptors to act directly as transcription factors modifying mRNA synthesis. Speed: Slow (hours), Long-lasting.'
                          : 'Peptides (Insulin, Adrenaline) cannot penetrate the membrane. They bind cell-surface GPCRs, activating Adenylyl Cyclase to generate cyclic AMP (cAMP second messenger). PKA kinase cascades amplify the signal thousands of times in seconds.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: Apoptosis vs Necrosis */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Caspase Cascade Progression:</span>
                      <span className="text-rose-400 font-bold">{caspaseProgress}% Active</span>
                    </div>
                    <input
                      aria-label="Caspase cascade activation percentage"
                      type="range"
                      min={0}
                      max={100}
                      value={caspaseProgress}
                      onChange={(e) => setCaspaseProgress(Number(e.target.value))}
                      className="w-full accent-rose-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-xs font-bold uppercase text-emerald-400 flex items-center gap-1">
                        <span>✓</span>
                        <span>Apoptosis (Orderly PCD)</span>
                      </span>
                      <ul className="text-xs text-slate-300 space-y-1">
                        <li>• Cell shrinkage & membrane blebbing</li>
                        <li>• Chromatin condensation & fragmentation</li>
                        <li>• DNA cut into 180 bp nucleosomal ladder</li>
                        <li>• Apoptotic bodies engulfed with NO inflammation</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-xs font-bold uppercase text-rose-400 flex items-center gap-1">
                        <span>✗</span>
                        <span>Necrosis (Lytic Rupture)</span>
                      </span>
                      <ul className="text-xs text-slate-300 space-y-1">
                        <li>• Passive swelling & plasma membrane rupture</li>
                        <li>• Intracellular contents spill into extracellular space</li>
                        <li>• Random enzymatic DNA degradation (smear on gel)</li>
                        <li>• Severe inflammatory response triggered</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: Enzyme Kinetics & Inhibitors with Prediction & Observation */}
              {currentSlide === 4 && (
                <div className="space-y-5">
                  {/* Brilliant Predict-Then-Check Pattern */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-teal-900/40 space-y-3">
                    <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
                      <span>🎯 Predict-then-Check Pattern</span>
                    </div>
                    <p className="text-sm text-slate-200 font-semibold">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, pIdx) => {
                        const isChosen = predictionAnswers['pred_1'] === pIdx;
                        const isCorrect = pIdx === PREDICTION_QUESTIONS[0].correctIndex;
                        const isRevealed = predictionRevealed['pred_1'];
                        return (
                          <button
                            key={pIdx}
                            onClick={() => handlePredictionAnswer('pred_1', pIdx, PREDICTION_QUESTIONS[0].correctIndex)}
                            className={`p-3 rounded-xl text-left text-xs transition-all border ${
                              isRevealed && isCorrect
                                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                                : isRevealed && isChosen
                                ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                                : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300'
                            }`}
                          >
                            <span className="font-bold text-teal-400 mr-2">{String.fromCharCode(65 + pIdx)}.</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {predictionRevealed['pred_1'] && (
                      <div className="p-3 bg-teal-950/40 rounded-xl border border-teal-800/40 space-y-1 text-xs">
                        <p className="text-emerald-300 font-semibold">🔬 How to verify below:</p>
                        <p className="text-slate-300">{PREDICTION_QUESTIONS[0].verifyInstruction}</p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Substrate [S]:</span>
                        <span className="text-teal-400 font-bold">{substrateConc} mM</span>
                      </div>
                      <input
                        aria-label="Substrate concentration in millimolar"
                        type="range"
                        min={1}
                        max={50}
                        value={substrateConc}
                        onChange={(e) => setSubstrateConc(Number(e.target.value))}
                        className="w-full accent-teal-500"
                      />
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Temperature:</span>
                        <span className="text-amber-400 font-bold">{tempC} °C</span>
                      </div>
                      <input
                        aria-label="Bioreactor temperature in Celsius"
                        type="range"
                        min={10}
                        max={65}
                        value={tempC}
                        onChange={(e) => setTempC(Number(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>pH:</span>
                        <span className="text-indigo-400 font-bold">{phVal}</span>
                      </div>
                      <input
                        aria-label="Bioreactor pH level"
                        type="range"
                        min={3}
                        max={11}
                        step={0.2}
                        value={phVal}
                        onChange={(e) => setPhVal(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {(['none', 'competitive', 'non-competitive'] as const).map((inh) => (
                      <motion.button
                        key={inh}
                        aria-label={`Toggle enzyme inhibitor: ${inh}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setInhibitorType(inh)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase border transition-all ${
                          inhibitorType === inh
                            ? 'bg-teal-600 text-white border-teal-400 shadow-md shadow-teal-500/20'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        Inhibitor: {inh}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-around gap-4 text-center">
                    <div>
                      <p className="text-xs text-slate-400">Measured Velocity (v)</p>
                      <p className="text-2xl font-black text-teal-400">{enzymeKinetics.v} <span className="text-xs text-slate-400 font-normal">μmol/min</span></p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Apparent Vmax</p>
                      <p className="text-2xl font-black text-indigo-400">{enzymeKinetics.vmax} <span className="text-xs text-slate-400 font-normal">μmol/min</span></p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Apparent Km</p>
                      <p className="text-2xl font-black text-amber-400">{enzymeKinetics.km} <span className="text-xs text-slate-400 font-normal">mM</span></p>
                    </div>
                  </div>

                  {/* Second Observation Pattern Question */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-indigo-900/40 space-y-3">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                      <span>👁️ Kinetics Observation Check</span>
                    </div>
                    <p className="text-sm text-slate-200 font-semibold">{OBSERVATION_QUESTIONS[1].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[1].options.map((opt, oIdx) => {
                        const isChosen = observationAnswers['obs_2'] === oIdx;
                        const isCorrect = oIdx === OBSERVATION_QUESTIONS[1].correctIndex;
                        const isRevealed = observationRevealed['obs_2'];
                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleObservationAnswer('obs_2', oIdx, OBSERVATION_QUESTIONS[1].correctIndex)}
                            className={`p-3 rounded-xl text-left text-xs transition-all border ${
                              isRevealed && isCorrect
                                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                                : isRevealed && isChosen
                                ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                                : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300'
                            }`}
                          >
                            <span className="font-bold text-indigo-400 mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {observationRevealed['obs_2'] && (
                      <p className="text-xs text-indigo-300 bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-800/40">
                        💡 {OBSERVATION_QUESTIONS[1].explanation}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4">
            <motion.button
              aria-label="Go to previous interactive lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-bold">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Go to next interactive lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold shadow-lg shadow-teal-500/20"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Open free interactive sandbox"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-500/20"
              >
                Open Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX (Free Play) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white">Biotechnology Interactive Sandbox</h3>
                <p className="text-xs text-slate-400">Freely manipulate cell counts, temperature, pH, and enzyme inhibitors with live multi-parameter updates.</p>
              </div>
              <motion.button
                aria-label="Ready to start challenges"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/20"
              >
                Ready for Challenges →
              </motion.button>
            </div>

            {/* Second Prediction Pattern in Sandbox */}
            <div className="p-5 bg-slate-950 rounded-2xl border border-teal-900/40 space-y-3">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
                <span>🎯 Prediction Challenge #2</span>
              </div>
              <p className="text-sm text-slate-200 font-semibold">{PREDICTION_QUESTIONS[1].question}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {PREDICTION_QUESTIONS[1].options.map((opt, pIdx) => {
                  const isChosen = predictionAnswers['pred_2'] === pIdx;
                  const isCorrect = pIdx === PREDICTION_QUESTIONS[1].correctIndex;
                  const isRevealed = predictionRevealed['pred_2'];
                  return (
                    <button
                      key={pIdx}
                      onClick={() => handlePredictionAnswer('pred_2', pIdx, PREDICTION_QUESTIONS[1].correctIndex)}
                      className={`p-3 rounded-xl text-left text-xs transition-all border ${
                        isRevealed && isCorrect
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                          : isRevealed && isChosen
                          ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                          : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="font-bold text-teal-400 mr-2">{String.fromCharCode(65 + pIdx)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {predictionRevealed['pred_2'] && (
                <div className="p-3 bg-teal-950/40 rounded-xl border border-teal-800/40 space-y-1 text-xs">
                  <p className="text-emerald-300 font-semibold">🔬 How to verify below:</p>
                  <p className="text-slate-300">{PREDICTION_QUESTIONS[1].verifyInstruction}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-xs uppercase font-bold text-teal-400">Meristem Proliferation & Kinetics</h4>
                <canvas ref={canvasRef} width={380} height={140} className="w-full rounded-xl border border-slate-800" aria-label="Bioreactor Simulation Canvas" />
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Calculated Mitotic Index: <strong className="text-teal-400">{calculatedMI}%</strong></span>
                  <span>Enzyme Velocity: <strong className="text-indigo-400">{enzymeKinetics.v} μmol/min</strong></span>
                </div>
              </div>

              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs uppercase font-bold text-amber-400">Enzyme Environment Sliders</h4>
                <div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Substrate [S]: {substrateConc} mM</span>
                    <span>Temp: {tempC} °C</span>
                  </div>
                  <input
                    aria-label="Substrate concentration slider"
                    type="range"
                    min={1}
                    max={50}
                    value={substrateConc}
                    onChange={(e) => setSubstrateConc(Number(e.target.value))}
                    className="w-full accent-teal-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>pH: {phVal}</span>
                    <span>Inhibitor: {inhibitorType}</span>
                  </div>
                  <input
                    aria-label="pH level slider"
                    type="range"
                    min={3}
                    max={11}
                    step={0.2}
                    value={phVal}
                    onChange={(e) => setPhVal(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  {(['none', 'competitive', 'non-competitive'] as const).map(inh => (
                    <button
                      key={inh}
                      aria-label={`Select inhibitor mode ${inh}`}
                      onClick={() => setInhibitorType(inh)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize ${
                        inhibitorType === inh ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {inh}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE (Adaptive Competency Assessment) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 uppercase">NEP 2020: </span>
                <span className="text-teal-400 font-bold uppercase">{currentCh.competencyLevel}</span>
              </div>
            </div>

            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
              <motion.div
                className="h-full bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          <motion.div
            className={`p-6 md:p-8 rounded-3xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500 shadow-2xl shadow-rose-500/20'
                : 'bg-slate-900 border-slate-800 shadow-2xl'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-md bg-teal-950 border border-teal-700/60 text-teal-300 text-xs font-mono">
                {currentCh.nodeId}
              </span>
              <span className="text-xs text-slate-400 capitalize">Difficulty: {currentCh.difficulty}</span>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-white mb-6 leading-relaxed">
              {currentCh.question}
            </h3>

            {/* MCQ Types (Classify, Distinguish, Match) */}
            {(currentCh.type === 'classify' || currentCh.type === 'distinguish' || currentCh.type === 'match') && currentCh.options && (
              <div className="space-y-3">
                {currentCh.options.map((opt, i) => {
                  const isSelected = selectedOptionIndex === i;
                  const isCorrect = i === currentCh.correctIndex;
                  const isWrong = isSelected && !isCorrect;

                  return (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      animate={isWrong && wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full p-4 rounded-2xl text-left text-sm font-medium transition-all border flex items-start gap-3 ${
                        showExplanation && isCorrect
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : showExplanation && isWrong
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : 'bg-slate-950/80 hover:bg-slate-800/80 border-slate-800 text-slate-200'
                      }`}
                    >
                      <span className="inline-flex w-6 h-6 rounded-lg bg-slate-800 text-teal-400 items-center justify-center font-bold text-xs shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {showExplanation && (
                        <span className="font-bold shrink-0">
                          {isCorrect ? '✓' : isSelected ? '✗' : ''}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Drag Label Type */}
            {currentCh.type === 'drag-label' && currentCh.dragItems && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  {currentCh.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable step: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gradient-to-r from-teal-600 to-indigo-600 text-white text-xs font-bold rounded-xl cursor-grab active:cursor-grabbing shadow-md flex items-center gap-1.5"
                    >
                      <span>⠿</span>
                      <span>{item.label}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['step_1', 'step_2', 'step_3', 'step_4'].map((targetId, idx) => {
                    const isFilled = Boolean(droppedLabels[targetId]);
                    const isCorrect = droppedLabels[targetId] === currentCh.correctMapping?.[targetId];

                    return (
                      <div
                        key={targetId}
                        role="region"
                        aria-label={`Drop target for Step ${idx + 1}`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(targetId)}
                        className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-800 hover:border-teal-500/50 flex items-center justify-between"
                      >
                        <span className="text-xs text-slate-500 font-bold">Step {idx + 1}</span>
                        <span className="text-xs font-bold text-teal-300 flex items-center gap-1">
                          {droppedLabels[targetId] ? (
                            <>
                              <span>{droppedLabels[targetId]}</span>
                              {showExplanation && (
                                <span>{isCorrect ? '✓' : '✗'}</span>
                              )}
                            </>
                          ) : (
                            'Drop stage label here'
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <motion.button
                  aria-label="Verify Karyotyping Order"
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-teal-600 text-white font-bold rounded-xl text-sm shadow-lg shadow-teal-500/20"
                >
                  Verify Karyotyping Order
                </motion.button>
              </div>
            )}

            {/* Drag Sort Type */}
            {currentCh.type === 'drag-sort' && currentCh.sortItems && (
              <div className="space-y-4">
                <div className="space-y-2">
                  {(sortArrangement.length === currentCh.sortItems.length
                    ? sortArrangement.map(idx => currentCh.sortItems![idx])
                    : currentCh.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-slate-200 text-xs md:text-sm flex items-center gap-3 cursor-grab"
                    >
                      <span className="w-6 h-6 rounded-lg bg-teal-950 border border-teal-700 text-teal-400 font-bold flex items-center justify-center text-xs">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Confirm Potency Hierarchy order"
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  className="px-6 py-2.5 bg-teal-600 text-white font-bold rounded-xl text-sm shadow-lg shadow-teal-500/20"
                >
                  Confirm Potency Hierarchy
                </motion.button>
              </div>
            )}

            {/* Numeric Type */}
            {currentCh.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    aria-label="Enter numerical calculation answer"
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numerical value"
                    className="px-5 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-base focus:border-teal-500 outline-none"
                  />
                  <span className="text-slate-400 font-bold">{currentCh.unit}</span>
                  <motion.button
                    aria-label="Submit calculation answer"
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-6 py-3 bg-teal-600 text-white font-bold rounded-2xl text-sm shadow-lg shadow-teal-500/20"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type */}
            {currentCh.type === 'construct' && currentCh.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 italic">{currentCh.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {currentCh.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add step: ${part}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[90px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1.5 bg-teal-950 border border-teal-700 text-teal-300 text-xs rounded-xl flex items-center gap-2"
                    >
                      {part}
                      <button
                        aria-label={`Remove step ${part}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600">Click blocks above in chronological biological sequence</span>
                  )}
                </div>

                <motion.button
                  aria-label="Verify Constructed Pathway"
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  className="px-6 py-2.5 bg-teal-600 text-white font-bold rounded-xl text-sm shadow-lg shadow-teal-500/20 disabled:opacity-40"
                >
                  Verify Constructed Pathway
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 bg-slate-950 rounded-2xl border border-teal-800/40 space-y-4"
              >
                <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
                  <span aria-hidden="true">📘</span>
                  <span>Mechanistic Explanation</span>
                </div>

                <div className="space-y-2">
                  {currentCh.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, sIdx) => (
                      <motion.p
                        key={sIdx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-slate-300 leading-relaxed"
                      >
                        <strong className="text-teal-400">{sIdx + 1}.</strong> {sentence}{!sentence.endsWith('.') ? '.' : ''}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps < currentCh.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    aria-label="Reveal next mechanistic step"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 font-bold rounded-xl text-xs"
                  >
                    Reveal Next Mechanistic Step →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Next challenge or finish"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-indigo-600 text-white font-bold rounded-xl text-sm shadow-lg shadow-teal-500/20"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Biotechnology Module →' : 'Next Competency Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-8 bg-gradient-to-br from-teal-950/40 via-slate-900 to-indigo-950/40 rounded-3xl border border-teal-700/50 text-center space-y-4">
            <h2 className="text-3xl font-black text-white">Biotechnology Unit Mastered!</h2>
            <p className="text-slate-300 text-sm">
              Your overall competency score: <strong className="text-teal-400 text-xl">{Math.max(0, 100 - errors * 5)}%</strong>
            </p>
            <p className="text-xs text-slate-400">Mastery Classification: <strong className="text-white capitalize">{masteryLevel}</strong></p>

            <div className="p-4 bg-emerald-950/50 rounded-2xl border border-emerald-800/40 text-xs md:text-sm text-emerald-300 flex items-center justify-center gap-2">
              <span className="font-bold">✓</span>
              <span>
                {errors === 0
                  ? '🌟 Flawless Mastery! You demonstrated exceptional understanding across all 10 Class 11 Biotechnology nodes.'
                  : errors <= 3
                  ? '👏 Outstanding performance! Your diagnostic knowledge of cytology and biomolecules is well-aligned with ISC board requirements.'
                  : '💪 Good effort! Revisit the misconception profile below to consolidate your molecular biology foundations.'}
              </span>
            </div>
          </div>

          {/* ─── MANDATORY REFLECTION SECTION ─── */}
          <div className="p-6 md:p-8 bg-slate-900 rounded-3xl border border-teal-700/40 shadow-2xl space-y-6">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-sm uppercase tracking-wider">
              <span aria-hidden="true">💭</span>
              <h3>Reflective Thinking & Synthesis</h3>
            </div>

            <div className="space-y-4">
              {REFLECTION_QUESTIONS.map((q) => (
                <div key={q.id} className="space-y-2 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <label htmlFor={q.id} className="block text-sm font-semibold text-white">
                    {q.prompt}
                  </label>
                  <textarea
                    id={q.id}
                    aria-label={q.prompt}
                    rows={2}
                    value={reflections[q.id] || ''}
                    onChange={(e) => setReflections(prev => ({ ...prev, [q.id]: e.target.value }))}
                    placeholder={q.placeholder}
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-teal-500 outline-none resize-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-3xl border border-rose-800/50 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-rose-300 flex items-center gap-2">
                <span>✗</span>
                <span>Diagnostic Misconception Analysis:</span>
              </h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-xs">
                    <p className="text-rose-400 font-bold">✗ Misconception: {m.misconception}</p>
                    <p className="text-emerald-400">✓ Scientific Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Notification */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-2 text-xs">
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Spaced Repetition (SM-2) Schedule:</h4>
            <p className="text-slate-300">
              Based on your response latency and error rate, your next review for Mitotic Index and Enzyme Kinetics is scheduled in{' '}
              <strong className="text-amber-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
            </p>
          </div>

          {/* Real World Activity */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-teal-400">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, sI) => (
                <li key={sI} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-teal-400 font-bold">{sI + 1}.</span>
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Floating Interactive Effects */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Biotechnology Stage Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_BiotechnologySignificanceMitosisMeiosisSim;