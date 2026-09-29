'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ============================================================================
// NODE CONSTANTS & METADATA
// ============================================================================
const NODE_399 = 'c11_bt_cbse_399'; // Intro to Tools & Techniques
const NODE_400 = 'c11_bt_cbse_400'; // Sanger Contributions
const NODE_401 = 'c11_bt_cbse_401'; // Microscopy Principles & History
const NODE_402 = 'c11_bt_cbse_402'; // Magnification & Resolving Power
const NODE_403 = 'c11_bt_cbse_403'; // Compound Light Microscope
const NODE_404 = 'c11_bt_cbse_404'; // Bright Field Microscopy
const NODE_405 = 'c11_bt_cbse_405'; // Dark Field Microscopy
const NODE_406 = 'c11_bt_cbse_406'; // Phase Contrast Microscopy
const NODE_407 = 'c11_bt_cbse_407'; // Fluorescence Microscopy
const NODE_408 = 'c11_bt_cbse_408'; // Electron Microscopy Principles
const NODE_409 = 'c11_bt_cbse_409'; // TEM
const NODE_410 = 'c11_bt_cbse_410'; // SEM
const NODE_411 = 'c11_bt_cbse_411'; // Confocal Microscopy
const NODE_412 = 'c11_bt_cbse_412'; // Centrifugation Principle
const NODE_413 = 'c11_bt_cbse_413'; // Differential Centrifugation
const NODE_414 = 'c11_bt_cbse_414'; // Density Gradient Centrifugation
const NODE_415 = 'c11_bt_cbse_415'; // Ultracentrifugation
const NODE_416 = 'c11_bt_cbse_416'; // Electrophoresis Principle
const NODE_417 = 'c11_bt_cbse_417'; // Agarose Gel Electrophoresis
const NODE_418 = 'c11_bt_cbse_418'; // Ethidium Bromide & UV
const NODE_419 = 'c11_bt_cbse_419'; // PAGE for Proteins
const NODE_420 = 'c11_bt_cbse_420'; // Tracking Dyes & Staining
const NODE_421 = 'c11_bt_cbse_421'; // ELISA Principle
const NODE_422 = 'c11_bt_cbse_422'; // Direct ELISA
const NODE_423 = 'c11_bt_cbse_423'; // Indirect ELISA
const NODE_424 = 'c11_bt_cbse_424'; // Sandwich ELISA
const NODE_425 = 'c11_bt_cbse_425'; // Competitive ELISA
const NODE_426 = 'c11_bt_cbse_426'; // Chromatography Principle
const NODE_427 = 'c11_bt_cbse_427'; // Adsorption & Partition Chromatography
const NODE_428 = 'c11_bt_cbse_428'; // Ion-Exchange Chromatography
const NODE_429 = 'c11_bt_cbse_429'; // Gel Filtration Chromatography
const NODE_430 = 'c11_bt_cbse_430'; // Affinity Chromatography
const NODE_431 = 'c11_bt_cbse_431'; // HPLC
const NODE_432 = 'c11_bt_cbse_432'; // Gas Chromatography
const NODE_433 = 'c11_bt_cbse_433'; // Spectroscopy Principles
const NODE_434 = 'c11_bt_cbse_434'; // Beer-Lambert Law
const NODE_435 = 'c11_bt_cbse_435'; // Colorimetry
const NODE_436 = 'c11_bt_cbse_436'; // UV-Visible Spectrophotometry
const NODE_437 = 'c11_bt_cbse_437'; // Mass Spectrometry
const NODE_438 = 'c11_bt_cbse_438'; // FISH
const NODE_439 = 'c11_bt_cbse_449'; // DNA Sequencing Overview (mapping to 439)
const NODE_440 = 'c11_bt_cbse_440'; // Sanger Sequencing
const NODE_441 = 'c11_bt_cbse_441'; // Maxam-Gilbert Sequencing
const NODE_442 = 'c11_bt_cbse_442'; // Automated Sequencing
const NODE_443 = 'c11_bt_cbse_443'; // Next-Gen Sequencing (NGS)
const NODE_444 = 'c11_bt_cbse_444'; // DNA Microarray
const NODE_445 = 'c11_bt_cbse_445'; // Flow Cytometry

const ALL_NODE_IDS = [
  NODE_399, NODE_400, NODE_401, NODE_402, NODE_403, NODE_404, NODE_405, NODE_406,
  NODE_407, NODE_408, NODE_409, NODE_410, NODE_411, NODE_412, NODE_413, NODE_414,
  NODE_415, NODE_416, NODE_417, NODE_418, NODE_419, NODE_420, NODE_421, NODE_422,
  NODE_423, NODE_424, NODE_425, NODE_426, NODE_427, NODE_428, NODE_429, NODE_430,
  NODE_431, NODE_432, NODE_433, NODE_434, NODE_435, NODE_436, NODE_437, NODE_438,
  'c11_bt_cbse_439', NODE_440, NODE_441, NODE_442, NODE_443, NODE_444, NODE_445
];

// ============================================================================
// MANDATORY SECTIONS (SCENARIO, DISCOVERY, LABS, PREDICTIONS, OBSERVATIONS, ACTIVITY)
// ============================================================================
const SCENARIO = {
  title: 'Advanced Biotechnology Core Tools & Analytical Suite',
  intro: 'Welcome to the National Institute of Biotechnology Research Suite. As the lead biophysicist and analytical chemist, you are tasked with isolating biomolecules, visualizing subcellular ultrastructures, and analyzing genetic and protein signatures.',
  context: 'You will operate cutting-edge instrument suites including Light/Electron/Confocal Microscopes, Ultracentrifuges, Agarose & SDS-PAGE Electrophoresis rigs, HPLC/Ion-Exchange Chromatography columns, UV-Vis Spectrophotometers, Sanger & NGS Sequencers, and Flow Cytometers.'
};

const DISCOVERY_QUESTION = {
  question: 'In Gel Filtration (Size Exclusion) Chromatography, why do LARGER proteins elute FIRST, whereas smaller proteins elute LAST?',
  options: [
    'Larger proteins are repelled by the hydrophobic gel matrix.',
    'Smaller proteins enter the internal porous beads, taking a longer, tortuous path, while larger molecules are excluded and travel quickly around the beads.',
    'Larger proteins have higher electrical charge and travel faster due to gel voltage.',
    'Smaller proteins bind covalently to the matrix and require salt gradient elution.'
  ],
  correctIndex: 1,
  hintAfter: 'Size Exclusion works on physical exclusion: small molecules get trapped inside porous beads, while large molecules bypass them through the void volume!'
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Optics & Resolution Studio',
    instruction: 'Explore optical & electron microscopy modes. Adjust wavelength, Numerical Aperture (NA), and refractive index to test Abbe’s limit of resolution (d = λ / 2NA).',
    interactionType: 'microscopy-lab',
    nodeId: NODE_402,
  },
  {
    title: 'Lab 2: Hydrodynamic Centrifugation Rig',
    instruction: 'Perform Differential and Density Gradient Ultracentrifugation. Adjust RCF (g-force), time, and sucrose density gradients to fractionate organelles.',
    interactionType: 'centrifugation-lab',
    nodeId: NODE_414,
  },
  {
    title: 'Lab 3: Electrophoresis & Biomolecule Migration',
    instruction: 'Set up Agarose Gel (for DNA) and SDS-PAGE (for proteins). Adjust gel concentration, voltage, and observe charge-to-mass ratio separation.',
    interactionType: 'electrophoresis-lab',
    nodeId: NODE_417,
  },
  {
    title: 'Lab 4: Spectroscopy & Immunoassay Assay Box',
    instruction: 'Test Beer-Lambert Law (A = ε·c·l) on UV-Vis Spectrophotometer and run Direct/Indirect/Sandwich/Competitive ELISA assays.',
    interactionType: 'spectroscopy-elisa-lab',
    nodeId: NODE_434,
  },
  {
    title: 'Lab 5: Chromatography & High-Throughput Genomics',
    instruction: 'Simulate HPLC, Ion Exchange, Size Exclusion, Sanger dideoxy chain termination sequencing, and Microarray gene expression profiling.',
    interactionType: 'chromatography-genomics-lab',
    nodeId: NODE_440,
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you double the Numerical Aperture (NA) of a microscope objective while keeping illumination wavelength constant, what happens to the limit of resolution (d)?',
    options: [
      'The resolution distance (d) doubles, making the image blurrier.',
      'The resolution distance (d) halves, doubling the resolving power and fine detail.',
      'The resolution distance remains unchanged because wavelength is constant.',
      'The magnification increases by 4-fold while resolution stays zero.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Check Abbe’s equation in Lab 1: d = λ / (2 NA). As NA increases, d decreases, resolving smaller features!',
    nodeId: NODE_402,
  },
  {
    question: 'Predict: In Sanger sequencing, what happens if ddNTPs (dideoxynucleotides) are added in equal concentration to dNTPs?',
    options: [
      'DNA replication speeds up significantly without stopping.',
      'Chain termination occurs prematurely at almost every base, yielding mostly extremely short fragments.',
      'Only RNA is synthesized instead of DNA.',
      'The primer fails to anneal to the template strand.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Observe Sanger sequencing termination in Lab 5. ddNTPs lack 3\'-OH group, preventing phosphodiester bond formation!',
    nodeId: NODE_440,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe when Ethidium Bromide (EtBr) intercalated into DNA is exposed to UV Light (302 nm)?',
    options: [
      'It emits intense orange-red fluorescence (~590 nm) due to energy transfer between stacked bases and EtBr.',
      'It turns dark purple due to protein precipitation.',
      'It emits green light because EtBr acts as a green fluorescent protein (GFP).',
      'The DNA molecules undergo instant cleavage and release blue gas.'
    ],
    correctIndex: 0,
    nodeId: NODE_418,
  },
  {
    question: 'In SDS-PAGE, why do proteins migrate strictly based on their molecular mass regardless of intrinsic charge?',
    options: [
      'SDS binds positively charged residues to repel the anode.',
      'SDS confers a uniform negative charge-to-mass ratio and denatures proteins into linear rods.',
      'SDS increases the temperature to boil off charge.',
      'Proteins do not carry charge in polyacrylamide gels.'
    ],
    correctIndex: 1,
    nodeId: NODE_419,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Diagnostic Lab Assay: Viral Protein Identification & DNA Fingerprinting',
  description: 'Apply multi-step biotech workflows to identify a pathogen isolate and verify clone construct identity using UV-Vis, SDS-PAGE, and Sanger Sequencing.',
  steps: [
    '1. Measure sample protein absorbance at 280 nm (A280 = 0.85). Calculate protein concentration using Beer-Lambert law (ε = 1.1 L·g⁻¹·cm⁻¹, l = 1 cm): c = A / (ε·l) = 0.77 mg/mL.',
    '2. Load sample into 12% SDS-PAGE gel alongside molecular weight markers. Run at 120V for 60 min. Observe single band at 45 kDa corresponding to viral envelope protein.',
    '3. Perform Sandwich ELISA using anti-envelope capture monoclonal antibodies. Absorbance read at 450 nm confirms high viral titer (1.42 OD vs control 0.05 OD).',
    '4. Sequence PCR product using Sanger dideoxy method with fluorescent ddNTPs. Read electropherogram chromatogram to confirm 100% sequence identity to SARS-CoV-2 Spike RBD.'
  ]
};

// ============================================================================
// MISCONCEPTIONS & DIAGNOSTIC QUESTIONS
// ============================================================================
const MISCONCEPTIONS = [
  {
    title: 'Magnification vs Resolving Power',
    misconception: 'Higher magnification always allows you to see smaller structural details.',
    correction: 'Magnification only enlarges an image. Resolving power (governed by NA and wavelength) determines the minimum distance between two points to see them as distinct. Empty magnification yields large blurry images.',
    nodeId: NODE_402,
  },
  {
    title: 'Gel Filtration Order of Elution',
    misconception: 'Small molecules pass through chromatography columns faster because they experience less friction.',
    correction: 'In gel filtration (size exclusion), small molecules enter internal bead pores, prolonging their path length. Large molecules cannot enter pores (void volume) and elute FIRST.',
    nodeId: NODE_429,
  },
  {
    title: 'Role of SDS in SDS-PAGE',
    misconception: 'SDS acts as a dye to color proteins during gel electrophoresis.',
    correction: 'SDS is an anionic detergent that denatures proteins and imparts a uniform negative charge density proportional to polypeptide length, enabling separation purely by molecular weight.',
    nodeId: NODE_419,
  },
  {
    title: 'Role of ddNTPs in Sanger Sequencing',
    misconception: 'ddNTPs act as primers to initiate DNA polymerization.',
    correction: 'ddNTPs (dideoxynucleoside triphosphates) lack a 3\'-OH group required for phosphodiester bond formation, acting as specific chain terminators.',
    nodeId: NODE_440,
  },
  {
    title: 'Sandwich ELISA Antigen Binding',
    misconception: 'Direct ELISA uses two antibodies to sandwich the antigen for higher sensitivity.',
    correction: 'Sandwich ELISA uses a capture antibody attached to the well and a primary/secondary detection antibody. Direct ELISA uses only a single enzyme-conjugated primary antibody attached directly to antigen.',
    nodeId: NODE_424,
  },
  {
    title: 'Ethidium Bromide Mechanism',
    misconception: 'Ethidium bromide glows naturally in visible light without requiring UV excitation.',
    correction: 'Ethidium bromide intercalates between stacked DNA base pairs. It absorbs ultraviolet light (254-366 nm) and fluoresces in the orange-red visible spectrum (~590 nm).',
    nodeId: NODE_418,
  }
];

const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag-1',
    nodeId: NODE_402,
    question: 'Calculate the limit of resolution (d) for a light microscope using green light (λ = 500 nm) and an oil immersion objective with NA = 1.25.',
    options: ['200 nm (0.2 µm)', '400 nm', '100 nm', '500 nm'],
    correctIndex: 0,
    explanation: 'd = λ / (2 × NA) = 500 nm / (2 × 1.25) = 500 / 2.5 = 200 nm (0.2 µm).'
  },
  {
    id: 'diag-2',
    nodeId: NODE_413,
    question: 'In differential centrifugation of cell homogenate, which organelle pellets out at low speeds (1,000 × g for 10 min)?',
    options: ['Ribosomes', 'Mitochondria', 'Nuclei and intact cells', 'Microsomes'],
    correctIndex: 2,
    explanation: 'Nuclei are the largest and densest organelles, pelleting at low speed (1,000 × g). Mitochondria pellet at 10,000-20,000 × g, microsomes at 100,000 × g.'
  },
  {
    id: 'diag-3',
    nodeId: NODE_434,
    question: 'A solution of NADH in a 1 cm cuvette gives an absorbance of 0.62 at 340 nm. Given molar absorptivity ε = 6,220 L·mol⁻¹·cm⁻¹, what is the concentration?',
    options: ['0.1 mM (100 µM)', '1.0 mM', '0.01 mM', '6.22 mM'],
    correctIndex: 0,
    explanation: 'c = A / (ε × l) = 0.62 / (6,220 × 1) = 0.0000996 M ≈ 0.1 mM (100 µM).'
  },
  {
    id: 'diag-4',
    nodeId: NODE_428,
    question: 'In Anion Exchange Chromatography at pH 7.4, which proteins bind to a DEAE-cellulose (positively charged) column?',
    options: [
      'Positively charged proteins (pI > 7.4)',
      'Negatively charged proteins (pI < 7.4)',
      'Neutral uncharged proteins only',
      'All hydrophobic proteins'
    ],
    correctIndex: 1,
    explanation: 'Anion exchangers have positively charged matrix groups (e.g. DEAE), binding negatively charged anions (proteins with pI < pH).'
  },
  {
    id: 'diag-5',
    nodeId: NODE_440,
    question: 'What chemical structural feature of ddNTP causes DNA chain termination in Sanger sequencing?',
    options: [
      'Absence of 2\'-OH group on ribose',
      'Absence of 3\'-OH group on deoxyribose',
      'Presence of a triple phosphate at 5\' position',
      'Modification of nitrogenous base'
    ],
    correctIndex: 1,
    explanation: 'Dideoxynucleotides lack 3\'-OH (having 3\'-H instead), preventing DNA polymerase from adding the next incoming nucleotide.'
  },
  {
    id: 'diag-6',
    nodeId: NODE_409,
    question: 'Why must specimens for Transmission Electron Microscopy (TEM) be prepared in ultrathin sections (<100 nm) and held in a high vacuum?',
    options: [
      'To allow light rays to reflect off the glass slide',
      'Because electrons have low penetrating power and scatter upon colliding with air molecules',
      'To freeze protein fluorescence',
      'To allow bacteria to continue swimming'
    ],
    correctIndex: 1,
    explanation: 'Electrons scatter readily in air and thick specimens; high vacuum and ultrathin sections are mandatory for electron beam transmission.'
  },
  {
    id: 'diag-7',
    nodeId: NODE_444,
    question: 'In a dual-color cDNA DNA Microarray experiment, green signal (Cy3) represents control cDNA and red signal (Cy5) represents tumor cDNA. A yellow spot indicates:',
    options: [
      'Gene expressed only in normal control tissue',
      'Gene expressed only in tumor tissue',
      'Gene expressed equally in both control and tumor tissues',
      'Gene completely silenced/absent in both samples'
    ],
    correctIndex: 2,
    explanation: 'Equal mixture of green (Cy3) and red (Cy5) fluorescence yields yellow, indicating equal mRNA expression levels in both conditions.'
  },
  {
    id: 'diag-8',
    nodeId: NODE_445,
    question: 'In Flow Cytometry, Forward Scatter (FSC) and Side Scatter (SSC) correspond respectively to:',
    options: [
      'Cell fluorescence and cell mass',
      'Cell size/diameter and internal granular complexity',
      'DNA content and RNA content',
      'Cell charge and cell viability'
    ],
    correctIndex: 1,
    explanation: 'FSC measures diffracted light aligned with laser beam (size), while SSC measures refracted/reflected light at 90° (internal granularity).'
  }
];

// ============================================================================
// CHALLENGES (22+ Progressive Difficulty Across Tiers)
// ============================================================================
export interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'numeric' | 'drag-label' | 'order-sort';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
  dragItems?: { id: string; label: string; category: string }[];
  categories?: string[];
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (7) ---
  {
    id: 'c-1',
    nodeId: NODE_400,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Frederick Sanger was awarded TWO Nobel Prizes in Chemistry. What were his two major breakthroughs?',
    options: [
      'Discovery of Penicillin and Structure of DNA',
      'Insulin protein sequencing (1958) and Sanger Dideoxy DNA sequencing (1980)',
      'Development of PCR and Invention of Electron Microscope',
      'Discovery of Restriction Enzymes and Southern Blotting'
    ],
    correctIndex: 1,
    explanation: 'Frederick Sanger sequenced insulin (1958) and developed chain-termination DNA sequencing (1980).',
    hints: [
      'Think of primary protein sequence determination and dideoxy chain termination.',
      'One was for a hormone (insulin), the other for DNA sequencing.',
      'He used ddNTPs for DNA sequencing.'
    ]
  },
  {
    id: 'c-2',
    nodeId: NODE_403,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In a compound light microscope, total magnification is equal to:',
    options: [
      'Magnification of Objective Lens + Magnification of Ocular Lens',
      'Magnification of Objective Lens × Magnification of Ocular Lens',
      'Numerical Aperture × Wavelength',
      'Focal length / Condenser Lens magnification'
    ],
    correctIndex: 1,
    explanation: 'Total Magnification = Objective Lens Magnification × Ocular (Eyepiece) Lens Magnification (e.g., 40x × 10x = 400x).',
    hints: [
      'Magnifications multiply sequentially.',
      'If ocular is 10x and objective is 100x, total is 1000x.',
      'Multiply objective power by ocular power.'
    ]
  },
  {
    id: 'c-3',
    nodeId: NODE_406,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Phase Contrast Microscopy (Frits Zernike) visualizes unstained living cells by converting small differences in refractive index into differences in:',
    options: [
      'Light intensity (brightness/contrast)',
      'Fluorescent wavelength emission',
      'Electron density scatter',
      'Radioactive decay counts'
    ],
    correctIndex: 0,
    explanation: 'Phase contrast converts phase shifts of light passing through cellular structures of varying refractive index into amplitude (brightness) changes.',
    hints: [
      'Living cells are transparent (phase objects).',
      'Phase shifts are converted into light and dark contrast.',
      'It creates visible intensity differences.'
    ]
  },
  {
    id: 'c-4',
    nodeId: NODE_412,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Relative Centrifugal Force (RCF or g-force) depends on which two physical parameters of the centrifuge rotor?',
    options: [
      'Rotor mass and temperature',
      'Rotor radius (r) and angular velocity in RPM (N)',
      'Viscosity of buffer and DNA length',
      'Electrical voltage and cuvette width'
    ],
    correctIndex: 1,
    explanation: 'RCF = 1.118 × 10⁻⁵ × r (cm) × (RPM)². It depends directly on radius and the square of rotational speed.',
    hints: [
      'Formula: RCF ∝ r × ω².',
      'Parameters are rotor radius in cm and revolutions per minute.',
      'Select radius and RPM.'
    ]
  },
  {
    id: 'c-5',
    nodeId: NODE_416,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'During DNA gel electrophoresis at physiological pH (pH 8.0), towards which electrode does DNA migrate and why?',
    options: [
      'Towards Cathode (-) because phosphate backbone is positively charged',
      'Towards Anode (+) because phosphate backbone is negatively charged',
      'Towards Anode (+) because nitrogenous bases are positively charged',
      'DNA does not move; only the buffer moves'
    ],
    correctIndex: 1,
    explanation: 'DNA has a negatively charged sugar-phosphate backbone, causing it to migrate towards the positive pole (Anode).',
    hints: [
      'Remember: "Run to Red" (Anode is red/positive).',
      'Phosphate groups (PO₄³⁻) carry negative charge.',
      'Negative ions move to the positive electrode (Anode).'
    ]
  },
  {
    id: 'c-6',
    nodeId: NODE_421,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What does the acronym ELISA stand for?',
    options: [
      'Electron Light Immuno Spectrometry Assay',
      'Enzyme-Linked Immunosorbent Assay',
      'Electrophoretic Liquid Isotope Specific Analysis',
      'Enzymatic Linear Immuno Staining Apparatus'
    ],
    correctIndex: 1,
    explanation: 'ELISA stands for Enzyme-Linked Immunosorbent Assay.',
    hints: [
      'It links an antibody/antigen with an enzyme indicator.',
      'E = Enzyme, L = Linked, I = Immuno, S = Sorbent, A = Assay.',
      'Enzyme-Linked Immunosorbent Assay.'
    ]
  },
  {
    id: 'c-7',
    nodeId: NODE_433,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'At which UV absorption wavelength do purified Nucleic Acids (DNA/RNA) and Proteins exhibit peak absorbance, respectively?',
    options: [
      'DNA at 280 nm, Protein at 260 nm',
      'DNA at 260 nm, Protein at 280 nm',
      'DNA at 595 nm, Protein at 450 nm',
      'DNA at 340 nm, Protein at 520 nm'
    ],
    correctIndex: 1,
    explanation: 'Nucleic acids absorb strongly at 260 nm (aromatic ring structure of bases). Proteins absorb at 280 nm (aromatic amino acids Trp, Tyr, Phe).',
    hints: [
      'Nucleic acid purines/pyrimidines absorb at 260.',
      'Aromatic amino acids absorb at 280.',
      'A260/A280 ratio is used for purity purity check!'
    ]
  },

  // --- STANDARD (8) ---
  {
    id: 'c-8',
    nodeId: NODE_402,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate the theoretical limit of resolution d (in nm) of a microscope objective using blue light (λ = 420 nm) with Numerical Aperture NA = 1.40. Formula: d = λ / (2 × NA).',
    correctAnswer: 150,
    tolerance: 2,
    unit: 'nm',
    explanation: 'd = 420 nm / (2 × 1.40) = 420 / 2.8 = 150 nm.',
    hints: [
      'Formula: d = λ / (2 NA).',
      'Multiply 2 by 1.40 = 2.8.',
      'Divide 420 by 2.8 = 150 nm.'
    ]
  },
  {
    id: 'c-9',
    nodeId: NODE_413,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'You centrifuge a cell lysate at 20,000 × g for 20 minutes. What fractions are found in the PELLET versus the SUPERNATANT?',
    options: [
      'Pellet: Nuclei; Supernatant: Ribosomes, Mitochondria',
      'Pellet: Mitochondria, Lysosomes, Peroxisomes; Supernatant: Cytosol, Ribosomes, Soluble proteins',
      'Pellet: Soluble enzymes; Supernatant: Intact cells',
      'Pellet: Ribosomes only; Supernatant: Nuclei'
    ],
    correctIndex: 1,
    explanation: '1,000 × g pellets nuclei; 20,000 × g pellets mitochondria/lysosomes; 100,000 × g pellets microsomes/ribosomes.',
    hints: [
      'Medium speed (20,000 g) pellets medium-sized organelles.',
      'Mitochondria and lysosomes pellet at 15,000-20,000g.',
      'Ribosomes remain in the supernatant until ultracentrifugation (100,000g).'
    ]
  },
  {
    id: 'c-10',
    nodeId: NODE_417,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Two linear double-stranded DNA fragments (Fragment A: 500 bp; Fragment B: 4,000 bp) are loaded onto a 1.0% Agarose Gel and run under electric current. Which fragment migrates FASTER / FURTHER down the gel?',
    options: [
      'Fragment B (4,000 bp) because it has more total negative charge',
      'Fragment A (500 bp) because smaller fragments navigate gel pores with less sieving resistance',
      'Both migrate at identical speeds because charge-to-mass ratio is constant',
      'Fragment B migrates towards the cathode, Fragment A towards anode'
    ],
    correctIndex: 1,
    explanation: 'Although charge-to-mass ratio is equal for all dsDNA, agarose gel acts as a molecular sieve. Smaller fragments (500 bp) experience less steric hindrance and migrate faster.',
    hints: [
      'Agarose gel acts like a mesh grid filter.',
      'Smaller molecular size = less friction in pores = faster migration.',
      '500 bp travels much farther than 4000 bp.'
    ]
  },
  {
    id: 'c-11',
    nodeId: NODE_424,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In a Sandwich ELISA assay, what is the correct order of reagents added to the 96-well microtiter plate?',
    options: [
      '1. Substrate → 2. Secondary antibody → 3. Antigen → 4. Capture antibody',
      '1. Capture Antibody → 2. Antigen Sample → 3. Detection Antibody (Enzyme-linked) → 4. Chromogenic Substrate',
      '1. Antigen → 2. Enzyme → 3. Blocking buffer → 4. Primary antibody',
      '1. Secondary antibody → 2. Capture antibody → 3. Substrate → 4. Antigen'
    ],
    correctIndex: 1,
    explanation: 'Sandwich ELISA order: Capture Ab bound to plate → Add Antigen → Add Detection Ab (forming sandwich) → Add Substrate for colorimetric readout.',
    hints: [
      'Plate is pre-coated with Capture Antibody.',
      'Antigen binds to Capture Ab.',
      'Detection Ab binds another epitope of the antigen.'
    ]
  },
  {
    id: 'c-12',
    nodeId: NODE_429,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Three proteins: Cytochrome c (12 kDa), Ovalbumin (43 kDa), and Ferritin (440 kDa) are separated on a Sephadex G-200 Gel Filtration Column. What is the elution order (first to last)?',
    options: [
      'Cytochrome c → Ovalbumin → Ferritin',
      'Ferritin → Ovalbumin → Cytochrome c',
      'Ovalbumin → Ferritin → Cytochrome c',
      'All three elute simultaneously in a single peak'
    ],
    correctIndex: 1,
    explanation: 'In size exclusion / gel filtration, largest molecules (Ferritin 440 kDa) are excluded from bead pores and elute FIRST (void volume). Smallest molecules (12 kDa) elute LAST.',
    hints: [
      'Gel filtration elutes largest molecular weight FIRST.',
      'Ferritin (440 kDa) > Ovalbumin (43 kDa) > Cytochrome c (12 kDa).',
      'Order: Ferritin → Ovalbumin → Cytochrome c.'
    ]
  },
  {
    id: 'c-13',
    nodeId: NODE_434,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A protein solution in a standard 1 cm cuvette yields an Absorbance A = 0.50 at 280 nm. If molar absorptivity ε = 50,000 L·mol⁻¹·cm⁻¹, calculate concentration c in micromolar (µM). Formula: c = A / (ε × l).',
    correctAnswer: 10,
    tolerance: 0.1,
    unit: 'µM',
    explanation: 'c = 0.50 / (50,000 × 1) = 0.000010 M = 10 µM.',
    hints: [
      'c = A / ε.',
      '0.50 / 50,000 = 0.00001 M.',
      '0.00001 M = 10 µM.'
    ]
  },
  {
    id: 'c-14',
    nodeId: NODE_438,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Fluorescence In Situ Hybridization (FISH) is primarily used in cytogenetics to:',
    options: [
      'Sequence whole genomes by synthesis',
      'Detect and localize specific DNA sequences/chromosomal translocations directly on intact chromosomes',
      'Separate proteins based on their isoelectric point',
      'Measure enzyme kinetics in cell lysates'
    ],
    correctIndex: 1,
    explanation: 'FISH uses fluorescently labeled single-stranded DNA probes that hybridize to complementary sequences on intact chromosomes for cytogenetic mapping.',
    hints: [
      '"In Situ" means in its original place on the chromosome slide.',
      'Uses fluorescent probes to spot gene locus or translocations.',
      'Used for chromosomal anomaly detection like BCR-ABL fusion.'
    ]
  },
  {
    id: 'c-15',
    nodeId: NODE_445,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In Flow Cytometry with Fluorescence-Activated Cell Sorting (FACS), how are single cells sorted into different collection tubes after laser excitation?',
    options: [
      'By physical size filtration screens',
      'By imparting an electrical charge to droplets containing individual cells and deflecting them with electrostatic plates',
      'By centrifuging the micro-droplets at 50,000 g',
      'By selective cell destruction using ultra-high power ultraviolet lasers'
    ],
    correctIndex: 1,
    explanation: 'FACS breaks cell streams into single-cell droplets, assigns a positive or negative charge based on fluorescence detection, and deflects droplets into tubes via electric fields.',
    hints: [
      'FACS = Fluorescence-Activated Cell Sorting.',
      'Droplets are given electric charge based on marker presence.',
      'Electrostatic deflection plates steer droplets.'
    ]
  },

  // --- ADVANCED (7) ---
  {
    id: 'c-16',
    nodeId: NODE_410,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Compare Transmission Electron Microscopy (TEM) and Scanning Electron Microscopy (SEM). Which statement accurately distinguishes their image formation mechanisms?',
    options: [
      'TEM detects secondary electrons scattered from specimen surface; SEM detects transmitted light.',
      'TEM passes electrons through ultrathin specimens to generate internal 2D ultrastructure; SEM scans a focused electron beam over gold-coated surfaces to produce 3D surface topography.',
      'TEM requires glass lenses; SEM uses oil immersion lenses.',
      'TEM operates at ambient atmospheric pressure; SEM requires absolute zero temperature.'
    ],
    correctIndex: 1,
    explanation: 'TEM passes electrons through ultrathin sections for 2D internal ultrastructure. SEM scans surface secondary electrons for 3D topological detail.',
    hints: [
      'TEM = Transmitted through thin slice (2D interior).',
      'SEM = Surface electron scattering (3D topography).',
      'SEM samples are coated with heavy metals like gold.'
    ]
  },
  {
    id: 'c-17',
    nodeId: NODE_414,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In the classic Meselson-Stahl experiment proving semi-conservative DNA replication, what type of centrifugation technique was essential to resolve ¹⁵N-heavy DNA from ¹⁴N-light DNA?',
    options: [
      'Differential Centrifugation in water',
      'Isopycnic (Equilibrium) CsCl Density Gradient Ultracentrifugation',
      'Low-speed benchtop centrifugation',
      'Pellet-wash centrifugation'
    ],
    correctIndex: 1,
    explanation: 'Meselson & Stahl used Isopycnic CsCl density gradient ultracentrifugation, where DNA banding occurs at the exact position matching its buoyant density.',
    hints: [
      'CsCl forms a continuous density gradient under high g-force.',
      'Molecules migrate to their buoyant density match (Isopycnic).',
      'Separates isotopes ¹⁵N vs ¹⁴N DNA.'
    ]
  },
  {
    id: 'c-18',
    nodeId: NODE_428,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'You want to purify a recombinant protein with an Isoelectric Point (pI) of 4.5 using Cation Exchange Chromatography (e.g. CM-Sepharose, negatively charged matrix). What pH buffer should you choose to ensure the protein binds to the column?',
    options: [
      'pH 8.0 (above pI)',
      'pH 3.0 (below pI)',
      'pH 4.5 (equal to pI)',
      'pH 11.0 (strongly basic)'
    ],
    correctIndex: 1,
    explanation: 'At pH < pI, the protein carries net POSITIVE charge and will bind to a negatively charged Cation Exchange column. At pH 3.0 (below 4.5), protein is positively charged.',
    hints: [
      'When pH < pI, protein carries positive net charge.',
      'Cation exchange matrix is negatively charged, binding cations (+).',
      'Choose pH lower than 4.5 (pH 3.0).'
    ]
  },
  {
    id: 'c-19',
    nodeId: NODE_440,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In automated Sanger sequencing electropherograms, four fluorescent dyes are used to label ddNTPs (ddATP, ddCTP, ddGTP, ddTTP). If a trace shows overlapping peak signals of equal intensity for Green (ddATP) and Blue (ddCTP) at position +142, this signifies:',
    options: [
      'Polymerase enzyme denaturation',
      'A heterozygous single nucleotide polymorphism (SNP) / point mutation in the sample',
      'Complete sequence alignment match',
      'Contamination by ethidium bromide'
    ],
    correctIndex: 1,
    explanation: 'Overlapping dual peaks at a single position in electropherogram chromatograms indicate heterozygosity (two different alleles present, e.g., A/C).',
    hints: [
      'Two different colored peaks at exact same nucleotide position.',
      'Indicates presence of two alleles in diploid sample.',
      'Heterozygous SNP allele.'
    ]
  },
  {
    id: 'c-20',
    nodeId: NODE_437,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In Mass Spectrometry (MS/MS) proteomics, MALDI-TOF stands for Matrix-Assisted Laser Desorption/Ionization Time-Of-Flight. How does TOF separate peptide ions?',
    options: [
      'By electric charge density in agarose gel',
      'Peptides are accelerated through an electric field; smaller m/z ions travel faster and reach the detector earlier than heavier m/z ions.',
      'Peptides collide with helium gas and change color.',
      'Peptides are filtered by gravity in a liquid column.'
    ],
    correctIndex: 1,
    explanation: 'In Time-Of-Flight (TOF), ions accelerated with equal kinetic energy traverse a field-free drift tube. Smaller mass-to-charge ratio (m/z) ions fly faster and land first.',
    hints: [
      'Flight time t is proportional to √(m/z).',
      'Lighter ions travel down the drift tube faster.',
      'Separation by time of flight.'
    ]
  },
  {
    id: 'c-21',
    nodeId: NODE_443,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'What fundamental advantage does Next-Generation Sequencing (NGS - Illumina sequencing-by-synthesis) offer over classical Sanger sequencing?',
    options: [
      'NGS requires no DNA extraction',
      'NGS performs massive parallel sequencing of millions of fragments simultaneously, dramatically lowering cost per base',
      'NGS produces read lengths of 100,000 bp per single reaction',
      'NGS does not require computers for data analysis'
    ],
    correctIndex: 1,
    explanation: 'NGS achieves ultra-high throughput by clonally amplifying millions of single DNA molecules on a flow cell and sequencing them in parallel.',
    hints: [
      'Sanger sequences 1 fragment per tube; NGS sequences millions on a glass flow cell.',
      'High throughput massive parallel sequencing.',
      'Dramatically reduces cost and time per gigabase.'
    ]
  },
  {
    id: 'c-22',
    nodeId: NODE_411,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Confocal Laser Scanning Microscopy (CLSM) eliminates out-of-focus blur in thick biological specimens by incorporating which key optical component?',
    options: [
      'A pinhole aperture in front of the detector conjugated to the focal plane',
      'A transmission electron diffraction grating',
      'A quartz prism with 100x oil immersion',
      'A magnetic deflection coil'
    ],
    correctIndex: 0,
    explanation: 'A confocal pinhole conjugate to the focal plane rejects out-of-focus emission light, enabling optical sectioning and 3D reconstruction.',
    hints: [
      '"Confocal" means focal points of lens and pinhole coincide.',
      'Pinhole blocks out-of-focus light.',
      'Enables 3D z-stack optical sectioning.'
    ]
  }
];

// ============================================================================
// SVG DIAGRAM COMPONENTS (At least 3 Custom Diagrams)
// ============================================================================

// Diagram 1: Optical & Electron Microscopy Principles
const MicroscopeDiagram: React.FC<{ mode: string; wavelength: number; NA: number }> = ({ mode, wavelength, NA }) => {
  const d = ((wavelength / (2 * NA))).toFixed(1);
  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 text-slate-100 flex flex-col items-center">
      <h4 className="text-sm font-bold text-gold-400 mb-2">Microscopy Optical Ray Trace Diagram</h4>
      <svg width="340" height="220" viewBox="0 0 340 220" className="overflow-visible">
        {/* Background Grid */}
        <defs>
          <linearGradient id="beamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={mode.includes('electron') ? '#a855f7' : '#06b6d4'} stopOpacity="0.8" />
            <stop offset="100%" stopColor={mode.includes('electron') ? '#3b82f6' : '#22c55e'} stopOpacity="0.1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Light Source / Electron Gun */}
        <rect x="140" y="10" width="60" height="20" rx="4" fill="#334155" stroke="#475569" />
        <text x="170" y="24" textAnchor="middle" fill="#f8fafc" fontSize="10" className="font-mono">
          {mode.includes('electron') ? 'Electron Gun' : 'Light Source'}
        </text>

        {/* Condenser Lens */}
        <ellipse cx="170" cy="55" rx="50" ry="8" fill="none" stroke="#38bdf8" strokeWidth="2" />
        <text x="230" y="58" fill="#94a3b8" fontSize="10">Condenser Lens</text>

        {/* Incident Rays */}
        <polygon points="140,20 170,55 200,20" fill="url(#beamGrad)" opacity="0.4" />
        <polygon points="130,55 170,105 210,55" fill="url(#beamGrad)" opacity="0.6" />

        {/* Specimen Stage */}
        <line x1="100" y1="105" x2="240" y2="105" stroke="#e2e8f0" strokeWidth="3" />
        <circle cx="170" cy="105" r="5" fill="#ef4444" filter="url(#glow)" />
        <text x="245" y="108" fill="#ef4444" fontSize="10" fontWeight="bold">Specimen</text>

        {/* Objective Lens */}
        <ellipse cx="170" cy="140" rx="40" ry="8" fill="none" stroke="#38bdf8" strokeWidth="2" />
        <text x="225" y="143" fill="#94a3b8" fontSize="10">Objective (NA: {NA})</text>

        {/* Focused Rays to Detector/Eyepiece */}
        <polygon points="170,105 130,140 210,140" fill="url(#beamGrad)" opacity="0.5" />
        <polygon points="130,140 170,190 210,140" fill="url(#beamGrad)" opacity="0.7" />

        {/* Detector / Pinhole / Eyepiece */}
        <circle cx="170" cy="190" r="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
        <text x="170" y="212" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">
          {mode === 'confocal' ? 'Pinhole + Detector' : mode.includes('electron') ? 'CCD / Detector' : 'Eyepiece'}
        </text>
      </svg>
      <div className="mt-2 text-xs font-mono bg-slate-800 px-3 py-1.5 rounded border border-slate-700 text-center">
        Limit of Resolution d = λ / (2·NA) = <span className="text-amber-400 font-bold">{d} nm</span> | Resolving Power = <span className="text-emerald-400 font-bold">{(1000/parseFloat(d)).toFixed(2)} µm⁻¹</span>
      </div>
    </div>
  );
};

// Diagram 2: Electrophoresis & Band Separation (Agarose / SDS-PAGE)
const ElectrophoresisDiagram: React.FC<{
  type: 'agarose' | 'sds-page';
  voltage: number;
  running: boolean;
}> = ({ type, voltage, running }) => {
  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 text-slate-100 flex flex-col items-center">
      <h4 className="text-sm font-bold text-gold-400 mb-1">
        {type === 'agarose' ? 'Agarose Gel Electrophoresis (DNA)' : 'SDS-PAGE (Proteins)'}
      </h4>
      <div className="text-xs text-slate-400 mb-2 font-mono">Voltage: {voltage} V | Anode (+ Red) vs Cathode (- Black)</div>
      
      <svg width="340" height="200" viewBox="0 0 340 200" className="bg-slate-950 rounded-lg border border-slate-800">
        {/* Gel Chamber */}
        <rect x="40" y="20" width="260" height="160" rx="6" fill="#1e293b" stroke="#334155" />
        
        {/* Electrodes */}
        <line x1="20" y1="30" x2="20" y2="170" stroke="#ef4444" strokeWidth="4" strokeDasharray="4 2" />
        <text x="15" y="20" fill="#ef4444" fontSize="10" fontWeight="bold">Cathode (-)</text>

        <line x1="320" y1="30" x2="320" y2="170" stroke="#22c55e" strokeWidth="4" strokeDasharray="4 2" />
        <text x="315" y="20" fill="#22c55e" fontSize="10" fontWeight="bold">Anode (+)</text>

        {/* Wells */}
        {[40, 75, 110, 145].map((y, idx) => (
          <g key={idx}>
            <rect x="55" y={y} width="12" height="20" fill="#0f172a" stroke="#475569" />
            <text x="45" y={y + 14} fill="#64748b" fontSize="8" className="font-mono">L{idx+1}</text>
          </g>
        ))}

        {/* Bands in Migration Lanes */}
        {/* Lane 1: Ladder */}
        <g className={running ? 'animate-pulse' : ''}>
          <rect x="250" y="45" width="4" height="12" fill="#f59e0b" rx="1" />
          <rect x="200" y="45" width="4" height="12" fill="#f59e0b" rx="1" />
          <rect x="150" y="45" width="4" height="12" fill="#f59e0b" rx="1" />
          <rect x="100" y="45" width="4" height="12" fill="#f59e0b" rx="1" />
          <text x="250" y="40" fill="#f59e0b" fontSize="7">100bp</text>
        </g>

        {/* Lane 2: Sample A (Large) */}
        <rect x="110" y="80" width="4" height="12" fill={type==='agarose'?'#38bdf8':'#ec4899'} rx="1" />
        <text x="110" y="75" fill="#38bdf8" fontSize="7">{type==='agarose'?'4.0 kb':'90 kDa'}</text>

        {/* Lane 3: Sample B (Medium) */}
        <rect x="180" y="115" width="4" height="12" fill={type==='agarose'?'#38bdf8':'#ec4899'} rx="1" />
        <text x="180" y="110" fill="#38bdf8" fontSize="7">{type==='agarose'?'1.5 kb':'45 kDa'}</text>

        {/* Lane 4: Sample C (Small - Migrates furthest) */}
        <rect x="260" y="150" width="4" height="12" fill={type==='agarose'?'#38bdf8':'#ec4899'} rx="1" />
        <text x="260" y="145" fill="#38bdf8" fontSize="7">{type==='agarose'?'0.3 kb':'14 kDa'}</text>

        {/* Tracking dye front */}
        <line x1="285" y1="20" x2="285" y2="180" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
        <text x="270" y="193" fill="#3b82f6" fontSize="8" className="font-mono">Bromophenol Blue Front</text>
      </svg>
    </div>
  );
};

// Diagram 3: Beer-Lambert Law & UV-Vis Spectrophotometer
const SpectrophotometerDiagram: React.FC<{
  concentration: number;
  pathLength: number;
  absorbance: number;
}> = ({ concentration, pathLength, absorbance }) => {
  const transmittance = Math.max(0, Math.min(100, Math.pow(10, -absorbance) * 100)).toFixed(1);
  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 text-slate-100 flex flex-col items-center">
      <h4 className="text-sm font-bold text-gold-400 mb-1">UV-Vis Spectrophotometer & Beer-Lambert Law</h4>
      <div className="text-xs text-amber-300 font-mono mb-2">A = ε · c · l  ⇒  Absorbance = {absorbance.toFixed(3)} | Transmittance = {transmittance}%</div>
      <svg width="340" height="160" viewBox="0 0 340 160" className="bg-slate-950 rounded-lg border border-slate-800">
        {/* Light Source */}
        <rect x="15" y="60" width="30" height="40" rx="4" fill="#f59e0b" />
        <text x="30" y="85" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">Deuterium</text>

        {/* Monochromator Prism */}
        <polygon points="75,50 100,90 50,90" fill="#6366f1" />
        <text x="75" y="105" textAnchor="middle" fill="#94a3b8" fontSize="8">Prism / Grating</text>

        {/* Incident Beam (I0) */}
        <line x1="100" y1="70" x2="150" y2="70" stroke="#38bdf8" strokeWidth="4" />
        <text x="125" y="62" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">I₀ (100%)</text>

        {/* Cuvette */}
        <rect x="150" y="40" width={pathLength * 35} height="60" fill="#38bdf8" fillOpacity={Math.min(0.9, concentration * 0.15 + 0.1)} stroke="#e2e8f0" strokeWidth="2" />
        <text x={150 + (pathLength * 35)/2} y="115" textAnchor="middle" fill="#cbd5e1" fontSize="9">Cuvette (l = {pathLength} cm)</text>

        {/* Transmitted Beam (I) */}
        <line x1={150 + pathLength * 35} y1="70" x2="270" y2="70" stroke="#38bdf8" strokeWidth={Math.max(1, 4 * (parseFloat(transmittance)/100))} opacity={Math.max(0.2, parseFloat(transmittance)/100)} />
        <text x="220" y="62" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">I ({transmittance}%)</text>

        {/* Photodetector */}
        <rect x="270" y="50" width="40" height="40" rx="4" fill="#10b981" />
        <text x="290" y="74" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">Photo-</text>
        <text x="290" y="84" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">diode</text>
      </svg>
    </div>
  );
};

// Diagram 4: Chromatography Column & Sanger Sequencing Gel
const ChromatographyDiagram: React.FC<{ type: string }> = ({ type }) => {
  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 text-slate-100 flex flex-col items-center">
      <h4 className="text-sm font-bold text-gold-400 mb-2">
        {type === 'sanger' ? 'Sanger Dideoxy DNA Sequencing Electropherogram' : 'Column Chromatography Fractionation'}
      </h4>
      {type === 'sanger' ? (
        <svg width="340" height="150" viewBox="0 0 340 150" className="bg-slate-950 rounded-lg border border-slate-800">
          {/* Chromatogram Peaks */}
          <path d="M 10 120 Q 25 20 40 120 Q 55 120 70 120 Q 85 30 100 120 Q 115 120 130 120 Q 145 15 160 120 Q 175 120 190 120 Q 205 25 220 120 Q 235 120 250 120 Q 265 10 280 120" fill="none" stroke="#22c55e" strokeWidth="2.5" />
          <path d="M 10 120 Q 40 120 55 25 70 120 Q 100 120 115 120 Q 130 35 145 120 Q 160 120 175 120 Q 190 120 205 120 Q 235 120 250 20 265 120" fill="none" stroke="#ef4444" strokeWidth="2.5" />
          <path d="M 10 120 Q 70 120 85 120 Q 100 15 115 120 Q 160 120 175 25 190 120 Q 220 120 235 25 250 120" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
          <path d="M 10 120 Q 115 120 130 20 145 120 Q 190 120 205 15 220 120" fill="none" stroke="#eab308" strokeWidth="2.5" />

          {/* Sequence Calls */}
          <text x="25" y="140" fill="#22c55e" fontSize="12" fontWeight="bold">A</text>
          <text x="55" y="140" fill="#ef4444" fontSize="12" fontWeight="bold">T</text>
          <text x="85" y="140" fill="#22c55e" fontSize="12" fontWeight="bold">A</text>
          <text x="100" y="140" fill="#38bdf8" fontSize="12" fontWeight="bold">C</text>
          <text x="130" y="140" fill="#eab308" fontSize="12" fontWeight="bold">G</text>
          <text x="145" y="140" fill="#ef4444" fontSize="12" fontWeight="bold">T</text>
          <text x="160" y="140" fill="#22c55e" fontSize="12" fontWeight="bold">A</text>
          <text x="175" y="140" fill="#38bdf8" fontSize="12" fontWeight="bold">C</text>
          <text x="205" y="140" fill="#eab308" fontSize="12" fontWeight="bold">G</text>
          <text x="220" y="140" fill="#22c55e" fontSize="12" fontWeight="bold">A</text>
          <text x="235" y="140" fill="#38bdf8" fontSize="12" fontWeight="bold">C</text>
          <text x="250" y="140" fill="#ef4444" fontSize="12" fontWeight="bold">T</text>
          <text x="280" y="140" fill="#22c55e" fontSize="12" fontWeight="bold">A</text>
        </svg>
      ) : (
        <svg width="340" height="150" viewBox="0 0 340 150" className="bg-slate-950 rounded-lg border border-slate-800">
          {/* Glass Column */}
          <rect x="140" y="15" width="60" height="110" rx="4" fill="none" stroke="#94a3b8" strokeWidth="2" />
          
          {/* Matrix Beads */}
          {[...Array(24)].map((_, i) => (
            <circle key={i} cx={148 + (i % 4) * 14} cy={30 + Math.floor(i / 4) * 15} r="5" fill="#475569" stroke="#64748b" />
          ))}

          {/* Flow Band 1 (Eluting) */}
          <ellipse cx="170" cy="110" rx="25" ry="6" fill="#38bdf8" opacity="0.8" />
          {/* Flow Band 2 (Retained) */}
          <ellipse cx="170" cy="50" rx="25" ry="6" fill="#ec4899" opacity="0.8" />

          {/* Collection Tube */}
          <path d="M 155 130 L 155 145 L 185 145 L 185 130 Z" fill="#1e293b" stroke="#64748b" />
          <text x="170" y="140" textAnchor="middle" fill="#38bdf8" fontSize="8">Fraction 1</text>
        </svg>
      )}
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT CLASS
// ============================================================================
const C11_BiotechToolsTechniquesCBSESim: React.FC<{
  onComplete?: (score: number) => void;
}> = ({ onComplete }) => {
  // Navigation & State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'diagnostic' | 'summary'>('discovery');
  const [selectedLabStep, setSelectedLabStep] = useState<number>(0);

  // Discovery Question State
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [selectedDiscoveryOption, setSelectedDiscoveryOption] = useState<number | null>(null);

  // Predictions State
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [predictionFeedback, setPredictionFeedback] = useState<Record<number, boolean>>({});

  // Lab Interactive Parameters
  // Lab 1: Microscopy
  const [microscopeMode, setMicroscopeMode] = useState<string>('brightfield');
  const [microscopeWavelength, setMicroscopeWavelength] = useState<number>(500); // nm
  const [microscopeNA, setMicroscopeNA] = useState<number>(1.25);
  const [microscopeMag, setMicroscopeMag] = useState<number>(400);

  // Lab 2: Centrifugation
  const [centrifugeRPM, setCentrifugeRPM] = useState<number>(12000);
  const [centrifugeTime, setCentrifugeTime] = useState<number>(15);
  const [centrifugeMode, setCentrifugeMode] = useState<'differential' | 'density'>('differential');
  const [sucroseGradient, setSucroseGradient] = useState<number>(20);

  // Lab 3: Electrophoresis
  const [gelType, setGelType] = useState<'agarose' | 'sds-page'>('agarose');
  const [voltage, setVoltage] = useState<number>(100);
  const [gelPercent, setGelPercent] = useState<number>(1.2);
  const [isGelRunning, setIsGelRunning] = useState<boolean>(false);

  // Lab 4: Spectroscopy & ELISA
  const [elisaType, setElisaType] = useState<'direct' | 'indirect' | 'sandwich' | 'competitive'>('sandwich');
  const [concentration, setConcentration] = useState<number>(0.5); // µM
  const [pathLength, setPathLength] = useState<number>(1.0); // cm
  const molarAbsorptivity = 25000; // L/mol/cm
  const absorbance = molarAbsorptivity * (concentration * 1e-6) * pathLength * 100;

  // Lab 5: Chromatography & Genomics
  const [chromatographyType, setChromatographyType] = useState<'hplc' | 'ion' | 'size' | 'sanger' | 'microarray'>('size');

  // Diagnostic Quiz State
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<Record<string, number>>({});
  const [diagnosticSubmitted, setDiagnosticSubmitted] = useState<boolean>(false);

  // Challenge Engine State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [numericAnswers, setNumericAnswers] = useState<Record<string, string>>({});
  const [challengeScores, setChallengeScores] = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [hintIndex, setHintIndex] = useState<number>(0);

  // SRS & BKT Tracker State
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  // FX Visual Feedback
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Inactivity Hint Timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges') {
        const curCh = CHALLENGES[currentChallengeIndex];
        if (curCh && curCh.hints && curCh.hints.length > 0) {
          setCurrentHint(curCh.hints[0]);
          setShowHint(true);
          audioManager.play('hint');
        }
      }
    }, 12000);
  }, [activeTab, currentChallengeIndex]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [activeTab, currentChallengeIndex, resetInactivityTimer]);

  // Speech Welcome
  useEffect(() => {
    speechManager.speak('Welcome to the Advanced Biotechnology Tools and Techniques Simulation Suite.');
  }, []);

  // Handler for Discovery Question
  const handleDiscoverySubmit = (optIndex: number) => {
    setSelectedDiscoveryOption(optIndex);
    setDiscoveryAnswered(true);
    if (optIndex === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      speechManager.speak('Correct! Larger biomolecules are excluded from matrix pores and elute first.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Consider physical pore exclusion in the gel beads.');
    }
  };

  // Handler for Predictions
  const handlePredictionSubmit = (predIdx: number, optIdx: number) => {
    const pred = PREDICTION_QUESTIONS[predIdx];
    const isCorrect = optIdx === pred.correctIndex;
    setPredictionAnswers(prev => ({ ...prev, [predIdx]: optIdx }));
    setPredictionFeedback(prev => ({ ...prev, [predIdx]: isCorrect }));

    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Excellent prediction!');
    } else {
      audioManager.play('error');
    }

    // Update BKT
    setBktStates(prev => {
      const cur = prev[pred.nodeId] || createBKTState();
      return { ...prev, [pred.nodeId]: bktUpdate(cur, isCorrect) };
    });
  };

  // Handler for Challenge Answers
  const handleChallengeAnswer = (optIndex: number) => {
    const ch = CHALLENGES[currentChallengeIndex];
    const isCorrect = optIndex === ch.correctIndex;

    setUserAnswers(prev => ({ ...prev, [ch.id]: optIndex }));
    setChallengeScores(prev => ({ ...prev, [ch.id]: isCorrect }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      speechManager.speak('Correct answer! Fantastic analytical reasoning.');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1500);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Incorrect. Review the hint and try again.');
    }

    // BKT & SRS Update
    setBktStates(prev => {
      const cur = prev[ch.nodeId] || createBKTState();
      return { ...prev, [ch.nodeId]: bktUpdate(cur, isCorrect) };
    });

    const srsItem = createReviewItem(ch.id);
    sm2Update(srsItem, isCorrect ? 5 : 1);
  };

  const handleNumericChallenge = (val: string) => {
    const ch = CHALLENGES[currentChallengeIndex];
    setNumericAnswers(prev => ({ ...prev, [ch.id]: val }));
    const numVal = parseFloat(val);
    if (isNaN(numVal)) return;

    const isCorrect = ch.correctAnswer !== undefined && Math.abs(numVal - ch.correctAnswer) <= (ch.tolerance || 0.1);

    setChallengeScores(prev => ({ ...prev, [ch.id]: isCorrect }));
    if (isCorrect) {
      audioManager.play('balance');
      speechManager.speak('Numerical calculation verified!');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1500);
    } else {
      audioManager.play('error');
    }

    setBktStates(prev => {
      const cur = prev[ch.nodeId] || createBKTState();
      return { ...prev, [ch.nodeId]: bktUpdate(cur, isCorrect) };
    });
  };

  // Diagnostic Quiz Handlers
  const handleDiagnosticSelect = (qId: string, optIdx: number) => {
    setDiagnosticAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleDiagnosticSubmit = () => {
    setDiagnosticSubmitted(true);
    let scoreCount = 0;
    DIAGNOSTIC_QUESTIONS.forEach(q => {
      if (diagnosticAnswers[q.id] === q.correctIndex) {
        scoreCount++;
      }
    });

    const finalPct = Math.round((scoreCount / DIAGNOSTIC_QUESTIONS.length) * 100);
    recordGameScore('c11_biotech_tools_tech', finalPct);

    if (finalPct >= 80) {
      audioManager.play('celebration');
      speechManager.speak(`Diagnostic complete! You scored ${finalPct} percent.`);
      setShowSuccess(true);
      setShowConfetti(true);
      setTimeout(() => {
        setShowSuccess(false);
        setShowConfetti(false);
      }, 4000);
    } else {
      audioManager.play('count');
    }

    if (onComplete) onComplete(finalPct);
  };

  // Progress Calculation
  const totalChallenges = CHALLENGES.length;
  const completedCount = Object.keys(challengeScores).length;
  const correctCount = Object.values(challengeScores).filter(Boolean).length;
  const overallMastery = Math.round((correctCount / totalChallenges) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none">
      {/* HEADER BAR */}
      <header className="bg-slate-900/90 border-b border-slate-800 backdrop-blur sticky top-0 z-50 px-6 py-3 flex items-center justify-between shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-gold-500 to-emerald-500 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg">
            BT
          </div>
          <div>
            <h1 className="text-base font-bold bg-gradient-to-r from-gold-400 to-emerald-400 bg-clip-text text-transparent">
              ISC Class 11 Biotechnology: Tools & Techniques
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Biophysical Methods, Microscopy, Centrifugation, Electrophoresis, Spectroscopy & Sequencing
            </p>
          </div>
        </div>

        {/* Global Progress Indicators */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
            <span className="text-xs text-slate-400 font-medium">Mastery:</span>
            <span className="text-xs font-mono font-bold text-emerald-400">{overallMastery}%</span>
            <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${overallMastery}%` }}
              />
            </div>
          </div>

          <div className="text-xs font-mono text-gold-300 bg-gold-950/60 border border-gold-800 px-3 py-1.5 rounded-full">
            Challenges: {correctCount}/{totalChallenges}
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="bg-slate-900 border-b border-slate-800 px-6 py-2 flex space-x-2">
        {[
          { id: 'discovery', label: '1. Discovery & Context' },
          { id: 'lab', label: '2. Interactive Exploration Labs (5)' },
          { id: 'challenges', label: '3. Core Challenges (22+)' },
          { id: 'diagnostic', label: '4. Diagnostics & Misconceptions' },
          { id: 'summary', label: '5. Summary & Real-World Application' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as typeof activeTab);
              audioManager.play('tap');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-gold-600 to-teal-600 text-white shadow-md shadow-gold-900/40'
                : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {/* TAB 1: DISCOVERY & SCENARIO */}
        {activeTab === 'discovery' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Scenario Header Card */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-gold-950 p-6 rounded-2xl border border-gold-900/50 shadow-2xl relative overflow-hidden">
              <div className="absolute right-0 top-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
              <h2 className="text-xl font-extrabold text-gold-300 mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/70 text-xs text-slate-300 font-mono">
                <span className="text-amber-400 font-bold uppercase tracking-wider block mb-1">Laboratory Briefing:</span>
                {SCENARIO.context}
              </div>
            </div>

            {/* Discovery Counterintuitive Question */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Discovery Thought Experiment</span>
              </div>
              <h3 className="text-base font-semibold text-slate-100">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`p-4 rounded-xl text-left text-xs transition-all border ${
                      selectedDiscoveryOption === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-red-950/80 border-red-500 text-red-200'
                        : 'bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {option}
                  </button>
                ))}
              </div>

              {discoveryAnswered && (
                <div className="mt-4 p-4 rounded-xl bg-gold-950/60 border border-gold-800/60 text-xs text-gold-200 flex items-start space-x-3">
                  <div className="text-lg">💡</div>
                  <div>
                    <span className="font-bold block mb-1">Key Insight:</span>
                    {DISCOVERY_QUESTION.hintAfter}
                  </div>
                </div>
              )}
            </div>

            {/* Prediction Questions */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
              <h3 className="text-base font-bold text-gold-400 flex items-center space-x-2">
                <span>Hypothesis & Prediction Suite</span>
              </h3>

              {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                <div key={pIdx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-sm text-slate-200 font-medium">{pred.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {pred.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handlePredictionSubmit(pIdx, oIdx)}
                        className={`p-3 rounded-lg text-xs text-left transition-all border ${
                          predictionAnswers[pIdx] === oIdx
                            ? oIdx === pred.correctIndex
                              ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                              : 'bg-red-900/60 border-red-500 text-red-200'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                        }`}
                      >
                        <span className="font-bold mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                        {opt}
                      </button>
                    ))}
                  </div>

                  {predictionAnswers[pIdx] !== undefined && (
                    <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-amber-300 border border-amber-950">
                      🔍 <span className="font-bold">Verification Guide:</span> {pred.verifyInstruction}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE EXPLORATION LABS */}
        {activeTab === 'lab' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Sub-Lab Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedLabStep(idx);
                    audioManager.play('swoop');
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedLabStep === idx
                      ? 'bg-gold-950/80 border-gold-500 text-gold-200 shadow-lg'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850'
                  }`}
                >
                  <div className="text-xs font-bold font-mono text-gold-400">Lab Step {idx + 1}</div>
                  <div className="text-xs font-semibold line-clamp-1">{step.title.split(':')[1]}</div>
                </button>
              ))}
            </div>

            {/* Active Sub-Lab Interactive Workbench */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
              <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-base font-bold text-gold-300">{EXPLORATION_STEPS[selectedLabStep].title}</h3>
                  <p className="text-xs text-slate-400">{EXPLORATION_STEPS[selectedLabStep].instruction}</p>
                </div>
                <span className="text-xs font-mono bg-gold-950 border border-gold-800 text-gold-300 px-3 py-1 rounded-full">
                  Node: {EXPLORATION_STEPS[selectedLabStep].nodeId}
                </span>
              </div>

              {/* LAB 1: MICROSCOPY STUDIO */}
              {selectedLabStep === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 block">Microscopy Technique:</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'brightfield', name: 'Bright Field' },
                          { id: 'darkfield', name: 'Dark Field' },
                          { id: 'phase', name: 'Phase Contrast' },
                          { id: 'fluorescence', name: 'Fluorescence' },
                          { id: 'tem', name: 'TEM (Transmission)' },
                          { id: 'sem', name: 'SEM (Scanning)' },
                          { id: 'confocal', name: 'Confocal (CLSM)' }
                        ].map(m => (
                          <button
                            key={m.id}
                            onClick={() => {
                              setMicroscopeMode(m.id);
                              if (m.id === 'tem' || m.id === 'sem') {
                                setMicroscopeWavelength(0.005); // Electron wavelength ~0.005 nm
                                setMicroscopeNA(1.4);
                              } else {
                                setMicroscopeWavelength(500);
                              }
                              audioManager.play('pop');
                            }}
                            className={`p-2 rounded-lg text-xs font-semibold border ${
                              microscopeMode === m.id
                                ? 'bg-gold-600 border-gold-400 text-white'
                                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                            }`}
                          >
                            {m.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Wavelength (λ):</span>
                          <span className="font-mono text-gold-400">{microscopeWavelength} nm</span>
                        </div>
                        <input
                          type="range"
                          min="0.005"
                          max="700"
                          step="5"
                          value={microscopeWavelength}
                          onChange={e => setMicroscopeWavelength(parseFloat(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Numerical Aperture (NA = n·sin θ):</span>
                          <span className="font-mono text-amber-400">{microscopeNA}</span>
                        </div>
                        <input
                          type="range"
                          min="0.2"
                          max="1.49"
                          step="0.05"
                          value={microscopeNA}
                          onChange={e => setMicroscopeNA(parseFloat(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Magnification Power:</span>
                          <span className="font-mono text-emerald-400">{microscopeMag}x</span>
                        </div>
                        <input
                          type="range"
                          min="40"
                          max="100000"
                          step="100"
                          value={microscopeMag}
                          onChange={e => setMicroscopeMag(parseInt(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                      </div>
                    </div>
                  </div>

                  <MicroscopeDiagram mode={microscopeMode} wavelength={microscopeWavelength} NA={microscopeNA} />
                </div>
              )}

              {/* LAB 2: CENTRIFUGATION SIMULATOR */}
              {selectedLabStep === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setCentrifugeMode('differential')}
                        className={`flex-1 p-2.5 rounded-xl text-xs font-bold border ${
                          centrifugeMode === 'differential'
                            ? 'bg-gold-600 border-gold-400 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        Differential Centrifugation
                      </button>
                      <button
                        onClick={() => setCentrifugeMode('density')}
                        className={`flex-1 p-2.5 rounded-xl text-xs font-bold border ${
                          centrifugeMode === 'density'
                            ? 'bg-gold-600 border-gold-400 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        Density Gradient (Isopycnic)
                      </button>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Rotor Speed (RPM):</span>
                          <span className="font-mono text-gold-400">{centrifugeRPM.toLocaleString()} RPM</span>
                        </div>
                        <input
                          type="range"
                          min="1000"
                          max="100000"
                          step="1000"
                          value={centrifugeRPM}
                          onChange={e => setCentrifugeRPM(parseInt(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Calculated RCF (g-force):</span>
                          <span className="font-mono text-emerald-400">
                            {Math.round(1.118e-5 * 10 * Math.pow(centrifugeRPM, 2)).toLocaleString()} × g
                          </span>
                        </div>
                      </div>

                      {centrifugeMode === 'density' && (
                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Sucrose / CsCl Gradient Concentration:</span>
                            <span className="font-mono text-amber-400">{sucroseGradient}% (w/v)</span>
                          </div>
                          <input
                            type="range"
                            min="5"
                            max="60"
                            step="5"
                            value={sucroseGradient}
                            onChange={e => setSucroseGradient(parseInt(e.target.value))}
                            className="w-full accent-amber-500"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Visualizer tube */}
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col items-center justify-center">
                    <h4 className="text-sm font-bold text-gold-400 mb-3">Fractionation Sedimentation Tube</h4>
                    <div className="w-20 h-48 bg-slate-950 border-2 border-slate-700 rounded-b-3xl relative overflow-hidden flex flex-col justify-between p-1">
                      {centrifugeRPM < 5000 ? (
                        <div className="text-center text-xs text-slate-400 my-auto">Lysate Homogenate (Unfractionated)</div>
                      ) : centrifugeMode === 'differential' ? (
                        <>
                          <div className="text-[10px] text-gold-300 bg-gold-950/80 p-1 rounded">Supernatant (Cytosol & Ribosomes)</div>
                          <div className="h-8 bg-amber-600/80 rounded-b-2xl flex items-center justify-center text-[10px] font-bold text-slate-950">
                            {centrifugeRPM >= 50000 ? 'Ribosome Pellet' : centrifugeRPM >= 15000 ? 'Mitochondria Pellet' : 'Nuclear Pellet'}
                          </div>
                        </>
                      ) : (
                        <div className="space-y-1 my-auto">
                          <div className="h-3 bg-gold-500/70 rounded text-[8px] text-center font-bold">DNA Band (1.71 g/cm³)</div>
                          <div className="h-3 bg-emerald-500/70 rounded text-[8px] text-center font-bold">RNA Band (1.90 g/cm³)</div>
                          <div className="h-3 bg-amber-500/70 rounded text-[8px] text-center font-bold">Protein Band (1.30 g/cm³)</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 3: ELECTROPHORESIS & MIGRATION */}
              {selectedLabStep === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setGelType('agarose')}
                        className={`flex-1 p-2.5 rounded-xl text-xs font-bold border ${
                          gelType === 'agarose'
                            ? 'bg-gold-600 border-gold-400 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        Agarose Gel (DNA / RNA)
                      </button>
                      <button
                        onClick={() => setGelType('sds-page')}
                        className={`flex-1 p-2.5 rounded-xl text-xs font-bold border ${
                          gelType === 'sds-page'
                            ? 'bg-gold-600 border-gold-400 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        SDS-PAGE (Proteins)
                      </button>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Applied Voltage:</span>
                          <span className="font-mono text-gold-400">{voltage} V</span>
                        </div>
                        <input
                          type="range"
                          min="40"
                          max="200"
                          step="10"
                          value={voltage}
                          onChange={e => setVoltage(parseInt(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Gel Concentration (% Matrix):</span>
                          <span className="font-mono text-amber-400">{gelPercent}%</span>
                        </div>
                        <input
                          type="range"
                          min="0.6"
                          max="3.0"
                          step="0.2"
                          value={gelPercent}
                          onChange={e => setGelPercent(parseFloat(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>

                      <button
                        onClick={() => {
                          setIsGelRunning(!isGelRunning);
                          audioManager.play(isGelRunning ? 'tap' : 'whoosh');
                        }}
                        className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${
                          isGelRunning
                            ? 'bg-red-600 hover:bg-red-500 text-white'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg'
                        }`}
                      >
                        {isGelRunning ? 'Stop Electrophoresis Power' : 'Run Gel Electrophoresis'}
                      </button>
                    </div>
                  </div>

                  <ElectrophoresisDiagram type={gelType} voltage={voltage} running={isGelRunning} />
                </div>
              )}

              {/* LAB 4: SPECTROSCOPY & ELISA */}
              {selectedLabStep === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 block">ELISA Immunoassay Type:</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'direct', name: 'Direct ELISA' },
                          { id: 'indirect', name: 'Indirect ELISA' },
                          { id: 'sandwich', name: 'Sandwich ELISA' },
                          { id: 'competitive', name: 'Competitive ELISA' }
                        ].map(el => (
                          <button
                            key={el.id}
                            onClick={() => {
                              setElisaType(el.id as typeof elisaType);
                              audioManager.play('pop');
                            }}
                            className={`p-2 rounded-lg text-xs font-semibold border ${
                              elisaType === el.id
                                ? 'bg-gold-600 border-gold-400 text-white'
                                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                            }`}
                          >
                            {el.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Biomolecule Concentration (c):</span>
                          <span className="font-mono text-gold-400">{concentration} µM</span>
                        </div>
                        <input
                          type="range"
                          min="0.1"
                          max="5.0"
                          step="0.1"
                          value={concentration}
                          onChange={e => setConcentration(parseFloat(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Cuvette Path Length (l):</span>
                          <span className="font-mono text-amber-400">{pathLength} cm</span>
                        </div>
                        <input
                          type="range"
                          min="0.5"
                          max="2.0"
                          step="0.5"
                          value={pathLength}
                          onChange={e => setPathLength(parseFloat(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>
                    </div>
                  </div>

                  <SpectrophotometerDiagram concentration={concentration} pathLength={pathLength} absorbance={absorbance} />
                </div>
              )}

              {/* LAB 5: CHROMATOGRAPHY & GENOMICS */}
              {selectedLabStep === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 block">Analytical Separation / Genomics Suite:</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'size', name: 'Size Exclusion (Gel Filtration)' },
                          { id: 'ion', name: 'Ion-Exchange Chromatography' },
                          { id: 'hplc', name: 'HPLC (High-Performance)' },
                          { id: 'sanger', name: 'Sanger Sequencing (ddNTP)' },
                          { id: 'microarray', name: 'DNA Microarray Expression' }
                        ].map(ch => (
                          <button
                            key={ch.id}
                            onClick={() => {
                              setChromatographyType(ch.id as typeof chromatographyType);
                              audioManager.play('pop');
                            }}
                            className={`p-2 rounded-lg text-xs font-semibold border ${
                              chromatographyType === ch.id
                                ? 'bg-gold-600 border-gold-400 text-white'
                                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                            }`}
                          >
                            {ch.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      {chromatographyType === 'size' && 'Gel Filtration separates biomolecules by hydrodynamic radius. Large proteins cannot enter bead pores and elute in void volume first.'}
                      {chromatographyType === 'ion' && 'Ion Exchange separates based on net surface charge. Anion exchange (DEAE) binds negatively charged proteins; Cation exchange (CM) binds positively charged proteins.'}
                      {chromatographyType === 'hplc' && 'HPLC operates under high pressures (up to 400 bar) using micro-particulate stationary phases for rapid, high-resolution separation.'}
                      {chromatographyType === 'sanger' && 'Sanger Chain Termination incorporates fluorescent 2\',3\'-dideoxynucleoside triphosphates (ddNTPs) to produce base-specific sequence fragments.'}
                      {chromatographyType === 'microarray' && 'DNA Microarrays hybridization measures transcript levels across thousands of genes simultaneously using Cy3 (green) and Cy5 (red) fluorophores.'}
                    </div>
                  </div>

                  <ChromatographyDiagram type={chromatographyType} />
                </div>
              )}

              {/* Render Observation Questions */}
              <div className="mt-8 pt-6 border-t border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-emerald-400">Lab Observation Checkpoints</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                    <div key={oIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-xs font-semibold text-slate-200">{obs.question}</p>
                      <div className="space-y-1">
                        {obs.options.map((opt, optIdx) => (
                          <div
                            key={optIdx}
                            className={`p-2 rounded text-[11px] ${
                              optIdx === obs.correctIndex
                                ? 'bg-emerald-950/70 border border-emerald-800 text-emerald-300'
                                : 'bg-slate-900 text-slate-400'
                            }`}
                          >
                            {optIdx === obs.correctIndex ? '✓ ' : '• '}{opt}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CORE CHALLENGES ENGINE */}
        {activeTab === 'challenges' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Challenge Progress Header */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-bold font-mono text-gold-400">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  CHALLENGES[currentChallengeIndex].difficulty === 'foundation'
                    ? 'bg-gold-950 border border-gold-800 text-gold-300'
                    : CHALLENGES[currentChallengeIndex].difficulty === 'standard'
                    ? 'bg-amber-950 border border-amber-800 text-amber-300'
                    : 'bg-purple-950 border border-purple-800 text-purple-300'
                }`}>
                  {CHALLENGES[currentChallengeIndex].difficulty}
                </span>
              </div>

              <div className="flex space-x-2">
                <button
                  disabled={currentChallengeIndex === 0}
                  onClick={() => {
                    setCurrentChallengeIndex(prev => prev - 1);
                    setShowHint(false);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  disabled={currentChallengeIndex === CHALLENGES.length - 1}
                  onClick={() => {
                    setCurrentChallengeIndex(prev => prev + 1);
                    setShowHint(false);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gold-600 hover:bg-gold-500 text-white disabled:opacity-40"
                >
                  Next Challenge
                </button>
              </div>
            </div>

            {/* Current Challenge Card */}
            {(() => {
              const ch = CHALLENGES[currentChallengeIndex];
              const isAnswered = challengeScores[ch.id] !== undefined;
              return (
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-base font-bold text-slate-100 leading-snug max-w-2xl">{ch.question}</h3>
                    <button
                      onClick={() => {
                        setCurrentHint(ch.hints[hintIndex % ch.hints.length]);
                        setHintIndex(prev => prev + 1);
                        setShowHint(true);
                        audioManager.play('hint');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-800/80 text-amber-300 text-xs font-bold hover:bg-amber-900/60 flex items-center space-x-1"
                    >
                      <span>💡 Hint</span>
                    </button>
                  </div>

                  {/* Multiple Choice Options */}
                  {ch.type === 'multiple-choice' && ch.options && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {ch.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleChallengeAnswer(oIdx)}
                          className={`p-4 rounded-xl text-left text-xs transition-all border ${
                            userAnswers[ch.id] === oIdx
                              ? challengeScores[ch.id]
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                : 'bg-red-950 border-red-500 text-red-200'
                              : 'bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span className="font-bold mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Numeric Challenge Input */}
                  {ch.type === 'numeric' && (
                    <div className="space-y-3 max-w-sm">
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          placeholder="Enter calculated value..."
                          value={numericAnswers[ch.id] || ''}
                          onChange={e => handleNumericChallenge(e.target.value)}
                          className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-gold-300 font-mono focus:outline-none focus:border-gold-500"
                        />
                        <span className="self-center text-xs font-mono text-slate-400">{ch.unit}</span>
                      </div>
                    </div>
                  )}

                  {/* Explanation Banner */}
                  {isAnswered && (
                    <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                      challengeScores[ch.id]
                        ? 'bg-emerald-950/70 border-emerald-800 text-emerald-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}>
                      <span className="font-bold block mb-1">Explanation & Principles:</span>
                      {ch.explanation}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* TAB 4: DIAGNOSTICS & MISCONCEPTIONS */}
        {activeTab === 'diagnostic' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Misconceptions Grid */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-amber-400 flex items-center space-x-2">
                <span>⚠️ Common Biotechnology Misconceptions</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((m, idx) => (
                  <div key={idx} className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold text-gold-300">{m.title}</h4>
                    <p className="text-xs text-red-300/90 font-medium">❌ Myth: {m.misconception}</p>
                    <p className="text-xs text-emerald-300/90 leading-relaxed">✓ Scientific Fact: {m.correction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostic Assessment Quiz */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-slate-100">Diagnostic Comprehensive Evaluation</h3>
                <span className="text-xs text-slate-400 font-mono">{DIAGNOSTIC_QUESTIONS.length} Questions</span>
              </div>

              <div className="space-y-6">
                {DIAGNOSTIC_QUESTIONS.map((q, qIdx) => (
                  <div key={q.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                    <p className="text-xs font-semibold text-slate-200">
                      {qIdx + 1}. {q.question}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {q.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleDiagnosticSelect(q.id, oIdx)}
                          className={`p-3 rounded-lg text-xs text-left transition-all border ${
                            diagnosticAnswers[q.id] === oIdx
                              ? 'bg-gold-950 border-gold-500 text-gold-200'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                          }`}
                        >
                          <span className="font-bold mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                          {opt}
                        </button>
                      ))}
                    </div>

                    {diagnosticSubmitted && (
                      <div className={`p-3 rounded-lg text-xs font-mono border ${
                        diagnosticAnswers[q.id] === q.correctIndex
                          ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                          : 'bg-red-950/60 border-red-800 text-red-300'
                      }`}>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleDiagnosticSubmit}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/40"
              >
                Submit Comprehensive Diagnostic Evaluation
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: SUMMARY & REAL-WORLD ACTIVITY */}
        {activeTab === 'summary' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-r from-slate-900 to-gold-950 p-6 rounded-2xl border border-gold-900/50 shadow-2xl space-y-4">
              <h2 className="text-lg font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h2>
              <p className="text-slate-300 text-xs leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Experimental Protocol Execution:</h4>
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-xs text-slate-200 font-mono flex items-start space-x-3">
                    <span className="w-5 h-5 rounded-full bg-gold-950 border border-gold-700 text-gold-300 flex items-center justify-center font-bold text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comprehensive Curriculum Mastery Overview */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-slate-100">Biotechnology Tools Knowledge Graph State</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {ALL_NODE_IDS.slice(0, 24).map((nodeId, idx) => {
                  const bkt = bktStates[nodeId] || createBKTState();
                  const masteryPct = Math.round(bkt.pKnown * 100);
                  return (
                    <div key={nodeId} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center">
                      <div className="text-[9px] font-mono text-slate-400">Node #{idx + 399}</div>
                      <div className="text-xs font-bold font-mono text-gold-400">{masteryPct}%</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FEEDBACK & OVERLAY COMPONENTS */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Biotechnology Simulation Mastery Level Achieved!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
    </div>
  );
};

export default C11_BiotechToolsTechniquesCBSESim;