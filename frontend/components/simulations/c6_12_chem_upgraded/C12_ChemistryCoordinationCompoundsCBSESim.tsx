'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ============================================================================
// NODE CONSTANTS (ISC / CBSE Class 12 Chemistry - Coordination Compounds)
// ============================================================================
const NODE_302 = 'c12_chem_cbse_302'; // Werner's Theory (Primary & Secondary Valencies)
const NODE_303 = 'c12_chem_cbse_303'; // Definitions (Coordination sphere, entity, ligands, central atom)
const NODE_305 = 'c12_chem_cbse_305'; // Nomenclature of Coordination Compounds (IUPAC rules)
const NODE_307 = 'c12_chem_cbse_307'; // Structural Isomerism (Ionisation, Hydrate, Linkage, Coordination)
const NODE_308 = 'c12_chem_cbse_308'; // Stereoisomerism (Geometrical & Optical Isomerism)
const NODE_309 = 'c12_chem_cbse_309'; // Valence Bond Theory (VBT, hybridization, inner/outer orbital)
const NODE_313 = 'c12_chem_cbse_313'; // Crystal Field Theory (CFT, Octahedral/Tetrahedral splitting, CFSE)
const NODE_318 = 'c12_chem_cbse_318'; // Colour in Coordination Compounds (d-d transition, absorption spectrum)
const NODE_319 = 'c12_chem_cbse_319'; // Bonding in Metal Carbonyls (Synergic backbonding, sigma and pi components)
const NODE_320 = 'c12_chem_cbse_320'; // Stability of Coordination Compounds (Stepwise vs Overall stability constants, Chelate effect)
const NODE_321 = 'c12_chem_cbse_321'; // Importance & Applications (Analytical chemistry, metallurgy, biological systems)
const NODE_322 = 'c12_chem_cbse_322'; // Organometallic & Chelate Complexes (Denticity, EDTA, organometallic classification)

const ALL_NODE_IDS: string[] = [
  NODE_302, NODE_303, NODE_305, NODE_307,
  NODE_308, NODE_309, NODE_313, NODE_318,
  NODE_319, NODE_320, NODE_321, NODE_322
];

// ============================================================================
// MANDATORY SECTION 1: SCENARIO
// ============================================================================
const SCENARIO = {
  title: 'Advanced Inorganic Coordination Chemistry Laboratory',
  intro: 'Welcome to the High-Precision Inorganic Synthesis & Spectroscopy Lab. You are conducting groundbreaking research on transition metal coordination compounds for targeted anti-cancer drug delivery, bio-inorganic oxygen transport systems, and industrial catalytic carbonylations.',
  context: 'In this simulation, you will explore Werner\'s formulation, construct custom coordination spheres, analyze structural and stereoisomerism, measure Crystal Field Splitting Energy (Δo and Δt), predict d-d spectroscopic absorptions, and master metal-carbonyl synergic bonding.',
};

// ============================================================================
// MANDATORY SECTION 2: DISCOVERY_QUESTION
// ============================================================================
const DISCOVERY_QUESTION = {
  question: 'Why does [Co(NH3)6]3+ form a diamagnetic, orange-yellow low-spin complex, whereas [CoF6]3- forms a paramagnetic, blue-violet high-spin complex, even though both contain Cobalt in the identical +3 oxidation state (3d6)?',
  options: [
    'NH3 is a strong-field ligand causing Δo > P (forcing electron pairing in t2g orbitals), while F- is a weak-field ligand where Δo < P (electrons remain unpaired in eg orbitals).',
    'Cobalt undergoes reduction from +3 to +2 state when reacting with fluoride ions in aqueous solution.',
    'Ammonia forms ionic bonds with cobalt while fluoride forms coordinate covalent bonds with outer 4d orbitals.',
    'Fluoride ion has a higher molar mass which shifts the magnetic susceptibility towards paramagnetic behavior.'
  ],
  correctIndex: 0,
  hintAfter: 'Strong-field ligands exert a greater electrostatic repulsion on the metal d-orbitals, producing a crystal field splitting energy (Δo) larger than the electron pairing energy (P).'
};

// ============================================================================
// MANDATORY SECTION 3: EXPLORATION_STEPS
// ============================================================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Werner\'s Theory & Silver Nitrate Precipitation',
    instruction: 'Select different cobalt(III) chloride ammine complexes (e.g., CoCl3·6NH3 vs CoCl3·4NH3) and react them with excess AgNO3. Observe the moles of AgCl precipitate produced to deduce ionizable counter-ions and non-ionizable coordination spheres.',
    interactionType: 'werner-precipitation-lab',
    nodeId: NODE_302,
  },
  {
    title: 'Lab 2: Complex Synthesis & IUPAC Nomenclature Builder',
    instruction: 'Assemble central metal cations (Fe2+, Fe3+, Co3+, Cu2+, Ni2+, Pt2+) with unidentate, bidentate, and ambidentate ligands. Examine how primary oxidation states, coordination numbers, and IUPAC systematic names are generated dynamically.',
    interactionType: 'nomenclature-sphere-builder',
    nodeId: NODE_305,
  },
  {
    title: 'Lab 3: Isomerism & Stereochemistry Workbench',
    instruction: 'Construct geometric (cis/trans, fac/mer) and optical (dextro/laevo enantiomers) isomers of octahedral and square planar complexes. Rotate 3D models and test plane-polarized light reflection.',
    interactionType: 'isomerism-workbench',
    nodeId: NODE_308,
  },
  {
    title: 'Lab 4: Crystal Field Theory (CFT) & UV-Vis Spectrophotometer',
    instruction: 'Vary the ligand position along the Spectrochemical Series (I- < Cl- < H2O < NH3 < en < CN- < CO) and metal d-electron count. Observe d-orbital splitting (t2g/eg), calculate CFSE, and observe complementary colors absorbed versus observed.',
    interactionType: 'cft-spectroscopy-lab',
    nodeId: NODE_313,
  },
  {
    title: 'Lab 5: Metal Carbonyl Synergic Backbonding & IR Stretching Spectrum',
    instruction: 'Investigate the dual σ-donor and π-acceptor bonding in metal carbonyls [M(CO)n]. Change the central metal charge to see how M→C π-backbonding strengthens the M-C bond while weakening the C≡O bond, altering the IR stretching frequency (ν_CO).',
    interactionType: 'metal-carbonyl-ir-lab',
    nodeId: NODE_319,
  },
];

// ============================================================================
// MANDATORY SECTION 4: PREDICTION_QUESTIONS
// ============================================================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If 1 mole of [Co(NH3)5Cl]Cl2 is dissolved in water and treated with excess AgNO3, how many moles of AgCl precipitate will immediately form?',
    options: ['3 moles of AgCl', '2 moles of AgCl', '1 mole of AgCl', '0 moles of AgCl'],
    correctIndex: 1,
    verifyInstruction: 'Verify in Lab 1 by selecting the pentaamminechlorocobalt(III) chloride complex and conducting the AgNO3 titration.',
    nodeId: NODE_302,
  },
  {
    question: 'Predict: What will happen to the crystal field splitting energy (Δo) and absorbed light wavelength when aqua ligand [Fe(H2O)6]3+ is converted to cyano complex [Fe(CN)6]3-?',
    options: [
      'Δo increases; absorbed light shifts to shorter wavelength (higher energy / blue-shifted).',
      'Δo decreases; absorbed light shifts to longer wavelength (red-shifted).',
      'Δo remains constant; only the oxidation state of iron changes.',
      'Δo becomes zero because CN- destroys the octahedral geometry.'
    ],
    correctIndex: 0,
    verifyInstruction: 'Verify in Lab 4 by switching the ligand from H2O to CN- in the UV-Vis Spectrophotometer simulator.',
    nodeId: NODE_318,
  },
];

// ============================================================================
// MANDATORY SECTION 5: OBSERVATION_QUESTIONS
// ============================================================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the magnetic property of tetrahedral vs octahedral complexes containing a d5 ion like Fe3+ with weak field ligands?',
    observableOptions: [
      'Both have 5 unpaired electrons (high spin, μ = 5.92 BM) because Δt and Δo are smaller than pairing energy P.',
      'Tetrahedral is diamagnetic while octahedral is paramagnetic.',
      'Octahedral complex has 0 unpaired electrons while tetrahedral has 3 unpaired electrons.',
      'Both complexes exhibit zero magnetic moment due to symmetrical d-orbital alignment.'
    ],
    correctIndex: 0,
    nodeId: NODE_313,
  },
  {
    question: 'What happens to the C-O IR vibrational stretching frequency (ν_CO) in [Fe(CO)4]2- compared to neutral [Ni(CO)4]?',
    observableOptions: [
      'ν_CO decreases significantly in [Fe(CO)4]2- because negative charge enhances metal-to-ligand π-backbonding, weakening the C≡O bond.',
      'ν_CO increases because iron is lighter than nickel.',
      'ν_CO remains unchanged at 2143 cm^-1 (free CO frequency).',
      'ν_CO disappears completely because the carbonyl group dissociates.'
    ],
    correctIndex: 0,
    nodeId: NODE_319,
  },
];

// ============================================================================
// MANDATORY SECTION 6: REAL_WORLD_ACTIVITY
// ============================================================================
const REAL_WORLD_ACTIVITY = {
  title: 'Clinical Chemotherapy & Heavy Metal Chelation Protocols',
  description: 'In pharmaceutical engineering and clinical toxicology, coordination chemistry principles dictate the design of anti-cancer metallodrugs (Cisplatin) and therapeutic chelating agents (EDTA, Penicillamine) for heavy metal poisoning.',
  steps: [
    'Step 1: Synthesize cis-diamminedichloroplatinum(II) [cis-Pt(NH3)2Cl2] for tumor DNA cross-linking, ensuring strict geometrical isomer purity to avoid inactive trans-isomer toxicity.',
    'Step 2: Calculate the chelate effect stability enhancement: EDTA4- forms a hexadentate complex with Ca2+ or Pb2+ with an equilibrium stability constant K_f > 10^18.',
    'Step 3: Administer CaNa2EDTA intravenously to treat acute lead (Pb2+) poisoning; displace Ca2+ with Pb2+ due to higher formation constant log K (18.0 vs 10.6).',
    'Step 4: Monitor urinary excretion of lead-EDTA chelate using atomic absorption spectroscopy to verify therapeutic clearance rate.'
  ]
};

// ============================================================================
// MISCONCEPTIONS (6 Topic-Specific Items)
// ============================================================================
const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    topic: 'Primary vs Secondary Valency',
    misconception: 'Primary valency is non-ionizable while secondary valency is ionizable.',
    correction: 'Werner\'s theory states that Primary Valency corresponds to the oxidation state (ionizable, satisfied by negative ions), whereas Secondary Valency corresponds to the coordination number (non-ionizable, directional coordinate bonds formed by ligands).',
    nodeId: NODE_302
  },
  {
    id: 'misc_2',
    topic: 'Isomerism in Square Planar Complexes',
    misconception: 'Square planar complexes of the type [MA4] or [MA3B] can show geometrical isomerism.',
    correction: 'Geometrical isomerism requires at least two different positions that can be occupied by two different ligands (e.g., [MA2B2] or [MA2BC]). In [MA4] or [MA3B], all adjacent positions are equivalent.',
    nodeId: NODE_308
  },
  {
    id: 'misc_3',
    topic: 'Inner vs Outer Orbital Hybridization',
    misconception: 'Inner orbital complexes (d2sp3) always use outer 4d orbitals during bonding.',
    correction: 'Inner orbital complexes use inner (n-1)d orbitals (e.g., 3d for 4s/4p), which occurs with strong-field ligands that force pairing. Outer orbital complexes (sp3d2) use outer nd orbitals (4d) with weak-field ligands.',
    nodeId: NODE_309
  },
  {
    id: 'misc_4',
    topic: 'Color of Complexes',
    misconception: 'The observed color of a coordination compound is identical to the wavelength of light absorbed.',
    correction: 'The observed color is the COMPLEMENTARY color to the absorbed wavelength (e.g., absorbing yellow-green light at 560 nm results in a purple/violet complex color).',
    nodeId: NODE_318
  },
  {
    id: 'misc_5',
    topic: 'Metal Carbonyl Backbonding',
    misconception: 'In metal carbonyls, bonding consists solely of ligand-to-metal lone pair donation.',
    correction: 'Metal carbonyls feature synergic bonding: a σ-bond formed by C lone pair donation to metal empty d-orbital, AND a π-backbond formed by metal filled d-orbital donation into carbon monoxide anti-bonding π* orbitals.',
    nodeId: NODE_319
  },
  {
    id: 'misc_6',
    topic: 'Chelate Effect',
    misconception: 'Chelate complexes are more stable solely due to stronger covalent enthalpy of bonding.',
    correction: 'The primary driving force of the Chelate Effect is ENTROPY (ΔS > 0). Replacing multiple unidentate ligands with a single multidentate ligand increases the total number of free solute particles, generating favorable entropy.',
    nodeId: NODE_320
  }
];

// ============================================================================
// DIAGNOSTIC QUESTIONS (8 Diagnostic Items)
// ============================================================================
const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    nodeId: NODE_302,
    question: 'How many moles of chloride ions are precipitated per mole of [Co(NH3)4Cl2]Cl when treated with excess AgNO3?',
    options: ['1 mole', '2 moles', '3 moles', '0 moles'],
    correctIndex: 0,
    explanation: 'Only the chloride ion outside the coordination sphere [Co(NH3)4Cl2]Cl is ionizable.'
  },
  {
    id: 'diag_2',
    nodeId: NODE_305,
    question: 'What is the correct IUPAC name for K3[Fe(CN)6]?',
    options: [
      'Potassium hexacyanidoferrate(III)',
      'Potassium hexacyanidoiron(III)',
      'Tripotassium hexacyanoferrate(II)',
      'Hexacyanidoferrate(III) potassium'
    ],
    correctIndex: 0,
    explanation: 'Cation comes first (Potassium), anion is hexacyanidoferrate with metal ending in -ate for anionic complex, oxidation state (III).'
  },
  {
    id: 'diag_3',
    nodeId: NODE_307,
    question: 'Which type of isomerism is exhibited by [Co(NH3)5(SO4)]Br and [Co(NH3)5Br]SO4?',
    options: ['Ionisation isomerism', 'Linkage isomerism', 'Coordination isomerism', 'Solvate isomerism'],
    correctIndex: 0,
    explanation: 'Ionisation isomerism occurs when counter ions inside and outside the coordination sphere exchange.'
  },
  {
    id: 'diag_4',
    nodeId: NODE_308,
    question: 'How many geometrical isomers exist for octahedral [Co(NH3)3(NO2)3]?',
    options: ['2 isomers (facial and meridional)', '3 isomers', '4 isomers', 'No geometrical isomers'],
    correctIndex: 0,
    explanation: 'Formulas of type [MA3B3] exist as fac (facial) and mer (meridional) isomers.'
  },
  {
    id: 'diag_5',
    nodeId: NODE_309,
    question: 'What is the hybridization and magnetic property of [Ni(CN)4]2- (square planar)?',
    options: ['dsp2, diamagnetic', 'sp3, paramagnetic', 'd2sp3, paramagnetic', 'sp3d2, diamagnetic'],
    correctIndex: 0,
    explanation: 'Ni2+ (3d8) with strong field CN- causes electron pairing into seven 3d orbitals, leaving one empty 3d orbital for dsp2 square planar diamagnetic hybridization.'
  },
  {
    id: 'diag_6',
    nodeId: NODE_313,
    question: 'Calculate the Crystal Field Stabilization Energy (CFSE) for a high-spin d6 octahedral complex in terms of Δo.',
    options: ['-0.4 Δo', '-2.4 Δo', '-1.2 Δo', '-0.6 Δo'],
    correctIndex: 0,
    explanation: 'High spin d6 octahedral configuration is t2g4 eg2. CFSE = 4(-0.4 Δo) + 2(+0.6 Δo) = -1.6 + 1.2 = -0.4 Δo.'
  },
  {
    id: 'diag_7',
    nodeId: NODE_318,
    question: 'If a coordination compound absorbs blue-green light (wavelength ~490 nm), what is its perceived appearance color?',
    options: ['Red / Orange-Red', 'Violet', 'Yellow', 'Green'],
    correctIndex: 0,
    explanation: 'Red is complementary to blue-green on the color spectrum wheel.'
  },
  {
    id: 'diag_8',
    nodeId: NODE_319,
    question: 'Which of the following metal carbonyls has the strongest C-O bond (highest ν_CO stretch frequency)?',
    options: ['[Mn(CO)6]+', '[Cr(CO)6]', '[V(CO)6]-', '[Fe(CO)4]2-'],
    correctIndex: 0,
    explanation: 'Positively charged [Mn(CO)6]+ has the least metal d-electron density for π-backbonding into CO π* orbitals, resulting in the strongest C≡O triple bond.'
  }
];

// ============================================================================
// 22 PROGRESSIVE CHALLENGES (3 Difficulty Tiers)
// ============================================================================
interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'numeric' | 'drag-label' | 'match';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number | string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- TIER 1: FOUNDATION (7 Challenges) ---
  {
    id: 'c1',
    nodeId: NODE_302,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'According to Werner\'s coordination theory, which valency is non-ionizable and satisfies the coordination number of the central metal?',
    options: ['Secondary Valency', 'Primary Valency', 'Tertiary Valency', 'Oxidation State'],
    correctIndex: 0,
    explanation: 'Secondary valencies correspond to coordinate covalent bonds directed toward ligands and are non-ionizable.',
    hints: [
      'Think about directional bonding inside the brackets.',
      'Primary valency relates to oxidation state, secondary to coordination number.',
      'Secondary valency determines stereochemistry and spatial geometry.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'c2',
    nodeId: NODE_303,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'What is the denticity of ethylenediaminetetraacetate ion (EDTA4-)?',
    options: ['Hexadentate (6 donor atoms)', 'Bidentate (2 donor atoms)', 'Tetradentate (4 donor atoms)', 'Unidentate (1 donor atom)'],
    correctIndex: 0,
    explanation: 'EDTA4- donates 6 lone pairs (2 nitrogen atoms and 4 carboxylate oxygen atoms) forming a hexadentate chelate.',
    hints: [
      'EDTA has 2 amine nitrogens and 4 acetate groups.',
      '2 + 4 = 6 donor sites.',
      'It forms extremely stable 6-coordinate chelate rings.'
    ]
  },
  {
    id: 'c3',
    nodeId: NODE_305,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Application',
    question: 'What is the correct IUPAC name for the neutral coordination compound [Cr(NH3)3(H2O)3]Cl3?',
    options: [
      'Triamminetriaquacobalt(III) chloride',
      'Triamminetriaquachromium(III) chloride',
      'Trichlordiammineaqua chromium',
      'Chromium triammine triaqua trichloride'
    ],
    correctIndex: 1,
    explanation: 'Ligands are named in alphabetical order (ammine before aqua), metal is chromium (oxidation state III), followed by counter ion chloride.',
    hints: [
      'Check the central metal identity: Cr is chromium.',
      'Alphabetical ligand order: "ammine" comes before "aqua".',
      'Oxidation state of Cr is +3.'
    ]
  },
  {
    id: 'c4',
    nodeId: NODE_307,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Ambidentate ligands like NO2- can attach to the central metal through either Nitrogen (-NO2) or Oxygen (-ONO). What type of isomerism does this give rise to?',
    options: ['Linkage isomerism', 'Ionisation isomerism', 'Coordination isomerism', 'Hydrate isomerism'],
    correctIndex: 0,
    explanation: 'Linkage isomerism arises in coordination compounds containing ambidentate ligands that can bind through different donor atoms.',
    hints: [
      'The bond link between ligand atom and metal changes.',
      'Nitro (-NO2) vs nitrito (-ONO).',
      'This is called Linkage Isomerism.'
    ]
  },
  {
    id: 'c5',
    nodeId: NODE_308,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Why does square planar [Pt(NH3)2Cl2] exist as cis and trans isomers while tetrahedral [Ni(CO)4] shows no geometrical isomerism?',
    options: [
      'All 4 positions in tetrahedral geometry are mutually adjacent to one another.',
      'Platinum is heavier than nickel.',
      'CO ligands cannot form cis-trans pairs.',
      'Tetrahedral complexes are always chiral.'
    ],
    correctIndex: 0,
    explanation: 'In tetrahedral geometry, all 4 positions are equidistant and subtend identical bond angles (109.5°), so relative cis/trans arrangements do not exist.',
    hints: [
      'Look at bond angles: 109.5° for all pairs in tetrahedral.',
      'Square planar has 90° (cis) and 180° (trans) relationships.',
      'Geometrical isomerism requires distinct spatial angles.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'c6',
    nodeId: NODE_313,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'In an octahedral crystal field, how do the five degenerate d-orbitals split in energy?',
    options: [
      'Two higher energy eg orbitals (dx2-y2, dz2) and three lower energy t2g orbitals (dxy, dyz, dxz)',
      'Three higher energy eg orbitals and two lower energy t2g orbitals',
      'Five degenerate orbitals remain at equal energy',
      'Four eg orbitals and one t2g orbital'
    ],
    correctIndex: 0,
    explanation: 'Ligands approaching along the Cartesian axes directly repel the dx2-y2 and dz2 orbitals, raising them to eg level by +0.6 Δo, while t2g orbitals drop by -0.4 Δo.',
    hints: [
      'Octahedral ligands approach directly along x, y, z axes.',
      'Axial d-orbitals (dx2-y2, dz2) feel stronger electrostatic repulsion.',
      't2g lies below barycenter (-0.4 Δo), eg lies above (+0.6 Δo).'
    ]
  },
  {
    id: 'c7',
    nodeId: NODE_321,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which biological macromolecule contains a magnesium(II) coordination complex essential for photosynthesis?',
    options: ['Chlorophyll', 'Hemoglobin', 'Vitamin B12', 'Myoglobin'],
    correctIndex: 0,
    explanation: 'Chlorophyll is a magnesium porphyrin coordination complex responsible for photosynthetic light absorption in green plants.',
    hints: [
      'Hemoglobin contains Iron (Fe2+).',
      'Vitamin B12 contains Cobalt (Co3+).',
      'Chlorophyll contains Magnesium (Mg2+).'
    ]
  },

  // --- TIER 2: STANDARD (8 Challenges) ---
  {
    id: 'c8',
    nodeId: NODE_302,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Analysis & Calculation',
    question: 'When 0.1 moles of CoCl3·5NH3 is treated with excess AgNO3 solution, how many grams of AgCl precipitate are formed? (Molar mass of AgCl = 143.32 g/mol)',
    correctAnswer: 28.66,
    explanation: 'CoCl3·5NH3 is formulated as [Co(NH3)5Cl]Cl2. It releases 2 moles of Cl- ions per mole of complex. 0.1 mol complex × 2 = 0.2 mol AgCl. Mass = 0.2 × 143.32 = 28.66 g.',
    hints: [
      'Write the Werner formula: [Co(NH3)5Cl]Cl2.',
      'Determine how many chloride ions are outside the brackets (2 Cl-).',
      'Moles of AgCl = 0.1 × 2 = 0.2 mol. Multiply by 143.32 g/mol.'
    ]
  },
  {
    id: 'c9',
    nodeId: NODE_309,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Using Valence Bond Theory (VBT), what is the hybridization, geometry, and magnetic moment (μ) of [Fe(CN)6]4-?',
    options: [
      'd2sp3, Octahedral, Diamagnetic (μ = 0 BM)',
      'sp3d2, Octahedral, Paramagnetic (μ = 4.90 BM)',
      'dsp2, Square Planar, Diamagnetic (μ = 0 BM)',
      'sp3, Tetrahedral, Paramagnetic (μ = 2.83 BM)'
    ],
    correctIndex: 0,
    explanation: 'Fe2+ is 3d6. Strong field CN- pairs all 6 electrons into three 3d orbitals (t2g6). Two 3d, one 4s, and three 4p orbitals hybridize as d2sp3 (inner orbital octahedral, zero unpaired e-, diamagnetic).',
    hints: [
      'Iron oxidation state in [Fe(CN)6]4- is +2 (3d6 configuration).',
      'CN- is a strong-field ligand causing maximum electron pairing.',
      '6 electrons pair into 3 orbitals (3d), leaving two 3d empty for d2sp3.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'c10',
    nodeId: NODE_313,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Calculation',
    question: 'Calculate the Crystal Field Stabilization Energy (CFSE) in terms of Δo for a low-spin d5 octahedral complex (ignoring pairing energy P).',
    correctAnswer: -2.0,
    explanation: 'In low-spin d5 octahedral, all 5 electrons enter the t2g orbitals: (t2g)5 (eg)0. CFSE = 5 × (-0.4 Δo) + 0 × (+0.6 Δo) = -2.0 Δo.',
    hints: [
      'Low spin means Δo > P, so electrons fill lower t2g before eg.',
      't2g holds up to 6 electrons with energy -0.4 Δo each.',
      'CFSE = 5 × (-0.4 Δo) = -2.0 Δo.'
    ]
  },
  {
    id: 'c11',
    nodeId: NODE_318,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis & Spectrometry',
    question: 'An aqueous solution of [Ti(H2O)6]3+ absorbs light of wavelength 498 nm (yellow-green region). What is the crystal field splitting energy Δo in kJ/mol? (h = 6.626×10^-34 J·s, c = 3×10^8 m/s, N_A = 6.022×10^23 /mol)',
    options: ['240 kJ/mol', '180 kJ/mol', '320 kJ/mol', '120 kJ/mol'],
    correctIndex: 0,
    explanation: 'E = h c N_A / λ = (6.626×10^-34 × 3×10^8 × 6.022×10^23) / (498×10^-9 m) = 2.40 × 10^5 J/mol = 240 kJ/mol.',
    hints: [
      'Use the photon energy equation E = h c / λ.',
      'Multiply by Avogadro\'s number N_A to get energy per mole.',
      '498 nm = 498 × 10^-9 m. E ≈ 240 kJ/mol.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'c12',
    nodeId: NODE_319,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'In metal carbonyls, metal-to-carbon π-backbonding involves electron density transfer from which orbitals?',
    options: [
      'Filled metal d-orbital to empty C-O anti-bonding π* orbital',
      'Empty metal d-orbital to filled C-O bonding π orbital',
      'Filled carbon σ-orbital to empty metal p-orbital',
      'Filled metal s-orbital to empty C-O σ* orbital'
    ],
    correctIndex: 0,
    explanation: 'Synergic π-backbonding consists of electron donation from filled metal dπ orbitals (t2g set) into empty π* antibonding molecular orbitals of carbon monoxide.',
    hints: [
      'Metal acts as a π-donor, CO acts as a π-acceptor.',
      'CO has empty high-energy antibonding π* orbitals.',
      'Transfer reduces the bond order of C≡O.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'c13',
    nodeId: NODE_320,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'Why is [Fe(en)3]3+ significantly more stable than [Fe(NH3)6]3+, even though both contain iron(III) bound to nitrogen donor atoms?',
    options: [
      'Chelate Effect: formation of 5-membered rings produces a large positive entropy change (ΔS > 0).',
      'Ethylenediamine is a stronger base than ammonia.',
      'Iron undergoes reduction to Fe2+ in the presence of en.',
      'Ammonia evaporates from solution while en does not.'
    ],
    correctIndex: 0,
    explanation: 'Chelation increases entropy because 3 bidentate en molecules displace 6 unidentate NH3/H2O molecules, resulting in a net increase in free particles in solution.',
    hints: [
      'Count the number of solute species on both sides of the ligand exchange reaction.',
      '[Fe(H2O)6]3+ + 3 en ⇌ [Fe(en)3]3+ + 6 H2O (4 reactant species → 7 product species).',
      'ΔS > 0 drives the thermodynamic stability enhancement.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'c14',
    nodeId: NODE_322,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Classification',
    question: 'Zeise\'s salt, K[PtCl3(η2-C2H4)], is a classic example of which class of organometallic compound?',
    options: ['π-bonded organometallic complex', 'σ-bonded organometallic complex', 'Macrocyclic chelate complex', 'Cluster carbonyl complex'],
    correctIndex: 0,
    explanation: 'Zeise\'s salt involves coordination of the π-electron cloud of ethylene (C2H4) to Platinum(II), classifying it as a π-bonded organometallic compound.',
    hints: [
      'Ethylene donates its double bond π-electrons to Pt(II).',
      'The η2 (hapto-2) designation indicates 2 carbon atoms attached via π-bond.',
      'This is a π-complex.'
    ]
  },
  {
    id: 'c15',
    nodeId: NODE_307,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Which pair of compounds represents Coordination Isomerism?',
    options: [
      '[Co(NH3)6][Cr(CN)6] and [Cr(NH3)6][Co(CN)6]',
      '[Co(NH3)5(NO2)]Cl2 and [Co(NH3)5(ONO)]Cl2',
      '[Cr(H2O)6]Cl3 and [Cr(H2O)5Cl]Cl2·H2O',
      '[Pt(NH3)4Cl2]Br2 and [Pt(NH3)4Br2]Cl2'
    ],
    correctIndex: 0,
    explanation: 'Coordination isomerism occurs in salts containing both complex cation and complex anion by interchange of ligands between metal entities.',
    hints: [
      'Look for complex cation paired with complex anion.',
      'Interchange ligands (NH3 and CN-) between Co and Cr.',
      'Example: [Co(NH3)6][Cr(CN)6] vs [Cr(NH3)6][Co(CN)6].'
    ]
  },

  // --- TIER 3: ADVANCED (7 Challenges) ---
  {
    id: 'c16',
    nodeId: NODE_313,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis & Complex Calculations',
    question: 'For a tetrahedral complex [CoCl4]2-, if the octahedral splitting Δo for the same metal and ligand is 12,000 cm^-1, what is the crystal field splitting energy Δt in cm^-1? (Recall Δt = 4/9 Δo)',
    correctAnswer: 5333,
    explanation: 'Δt = (4/9) × Δo = (4/9) × 12,000 cm^-1 = 5333.33 cm^-1.',
    hints: [
      'Tetrahedral splitting is smaller than octahedral splitting.',
      'Formula: Δt = 4/9 Δo.',
      '4/9 × 12000 = 5333.3 cm^-1.'
    ]
  },
  {
    id: 'c17',
    nodeId: NODE_308,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'How many total stereoisomers (geometrical + optical) exist for octahedral complex [Co(en)2Cl2]+?',
    options: [
      '3 stereoisomers (trans-isomer is achiral/optically inactive; cis-isomer exists as d and l enantiomers)',
      '2 stereoisomers (1 cis and 1 trans, both achiral)',
      '4 stereoisomers (cis-d, cis-l, trans-d, trans-l)',
      '6 stereoisomers'
    ],
    correctIndex: 0,
    explanation: 'The trans-isomer has a plane of symmetry (achiral). The cis-isomer lacks a plane/center of symmetry and exists as a pair of non-superimposable mirror image enantiomers (d and l). Total = 1 trans + 2 cis = 3 stereoisomers.',
    hints: [
      'Check symmetry elements for trans-[Co(en)2Cl2]+: it has a plane of symmetry.',
      'Check cis-[Co(en)2Cl2]+: it is chiral (no plane of symmetry).',
      'Trans (1) + Cis (2 enantiomers) = 3 total stereoisomers.'
    ]
  },
  {
    id: 'c18',
    nodeId: NODE_309,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Quantitative Analysis',
    question: 'Calculate the spin-only magnetic moment μ_s (in Bohr Magnetons, BM) for [Mn(H2O)6]2+. (Mn2+ is d5, H2O is weak field ligand; μ_s = √(n(n+2)))',
    correctAnswer: 5.92,
    explanation: 'Mn2+ is 3d5. H2O is a weak field ligand (Δo < P), so high spin configuration (t2g3 eg2) gives 5 unpaired electrons (n=5). μ_s = √(5(5+2)) = √35 = 5.916 ≈ 5.92 BM.',
    hints: [
      'Determine d-electron count for Mn2+ (Atomic number 25: [Ar] 3d5).',
      'Weak field H2O means 5 unpaired electrons.',
      'μ = √(5 × 7) = √35 = 5.92 BM.'
    ]
  },
  {
    id: 'c19',
    nodeId: NODE_319,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation & Analysis',
    question: 'Arrange the following carbonyl complexes in order of INCREASING C-O bond length: [Fe(CO)4]2-, [Ni(CO)4], [Co(CO)4]-.',
    options: [
      '[Ni(CO)4] < [Co(CO)4]- < [Fe(CO)4]2-',
      '[Fe(CO)4]2- < [Co(CO)4]- < [Ni(CO)4]',
      '[Co(CO)4]- < [Ni(CO)4] < [Fe(CO)4]2-',
      '[Ni(CO)4] < [Fe(CO)4]2- < [Co(CO)4]-'
    ],
    correctIndex: 0,
    explanation: 'Greater negative charge on metal increases back-donation into CO π* orbitals. More π* population weakens C≡O bond and INCREASES C-O bond length: Ni(0) [least backbonding, shortest bond] < Co(-1) < Fe(-2) [most backbonding, longest C-O bond].',
    hints: [
      'Compare metal formal charges: Ni is 0, Co is -1, Fe is -2.',
      'More negative charge = stronger M→C backbonding.',
      'Stronger backbonding populates CO π* anti-bonding, lengthening the C-O bond.'
    ]
  },
  {
    id: 'c20',
    nodeId: NODE_320,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Thermodynamics & Equilibrium',
    question: 'If the overall formation constant log K_overall for [Cu(NH3)4]2+ is 13.0, what is the overall instability (dissociation) constant K_d of the complex in exponential scientific notation power (e.g., for 10^-13 enter -13)?',
    correctAnswer: -13,
    explanation: 'Instability constant K_d = 1 / K_overall. If log K = 13, then K_overall = 10^13, so K_d = 10^-13. The exponent is -13.',
    hints: [
      'Instability constant is the reciprocal of the overall formation constant.',
      'K_d = 1 / K_overall.',
      'If K_overall = 10^13, K_d = 10^-13.'
    ]
  },
  {
    id: 'c21',
    nodeId: NODE_321,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Applied Science & Medicine',
    question: 'In the treatment of acute Lead (Pb2+) poisoning, why is CaNa2EDTA administered instead of Na4EDTA?',
    options: [
      'Na4EDTA would bind and strip essential free Ca2+ ions from blood plasma, causing fatal hypocalcemia.',
      'CaNa2EDTA cannot cross the intestinal mucosal barrier.',
      'Na4EDTA oxidizes lead to insoluble PbO2.',
      'Calcium acts as a catalyst for renal filtration.'
    ],
    correctIndex: 0,
    explanation: 'Na4EDTA rapidly chelates plasma Ca2+, causing lethal hypocalcemic tetany. CaNa2EDTA supplies Ca2+ which is subsequently displaced by Pb2+ due to the higher stability constant of Pb-EDTA.',
    hints: [
      'Free EDTA has high affinity for blood serum calcium.',
      'Unbound EDTA extracts body calcium, leading to hypocalcemia.',
      'Pre-coordinating with calcium prevents serum calcium depletion.'
    ]
  },
  {
    id: 'c22',
    nodeId: NODE_322,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Structure & Bonding Analysis',
    question: 'Ferrocene [Fe(η5-C5H5)2] is a sandwich organometallic compound. What is the total valence electron count (18-electron rule) for iron in ferrocene?',
    options: [
      '18 electrons (Fe2+ d6 + two cyclopentadienyl Cp- 6π e- each)',
      '16 electrons',
      '20 electrons',
      '12 electrons'
    ],
    correctIndex: 0,
    explanation: 'Fe2+ provides 6 valence d-electrons. Each cyclopentadienyl anion (Cp-) donates 6 π-electrons. Total = 6 + (2 × 6) = 18 electrons (satisfying the noble gas rule).',
    hints: [
      'Iron in ferrocene is in the +2 oxidation state (3d6 configuration).',
      'Each η5-Cp- ring donates 6 π electrons.',
      'Total valence count: 6 (metal d) + 12 (ligand π) = 18 electrons.'
    ]
  }
];

// ============================================================================
// TOPIC-SPECIFIC SVG DIAGRAM COMPONENTS
// ============================================================================

// 1. Crystal Field Splitting Energy Level Diagram (Interactive Octahedral & Tetrahedral)
const CFTOrbitalSplittingDiagram: React.FC<{
  geometry: 'octahedral' | 'tetrahedral';
  dElectrons: number;
  ligandStrength: 'weak' | 'strong';
  deltaVal: number;
}> = ({ geometry, dElectrons, ligandStrength, deltaVal }) => {
  const isHighSpin = ligandStrength === 'weak';
  
  // Distribute electrons
  let t2gCount = 0;
  let egCount = 0;
  let eCount = 0; // for tetrahedral
  let t2Count = 0; // for tetrahedral

  if (geometry === 'octahedral') {
    if (isHighSpin) {
      // Fill t2g1-3, eg1-2, t2g4-6, eg3-4
      for (let i = 0; i < dElectrons; i++) {
        if (i < 3) t2gCount++;
        else if (i < 5) egCount++;
        else if (i < 8) t2gCount++;
        else egCount++;
      }
    } else {
      // Low spin: Fill t2g up to 6, then eg
      for (let i = 0; i < dElectrons; i++) {
        if (i < 6) t2gCount++;
        else egCount++;
      }
    }
  } else {
    // Tetrahedral (always high spin generally)
    for (let i = 0; i < dElectrons; i++) {
      if (i < 2) eCount++;
      else if (i < 5) t2Count++;
      else if (i < 7) eCount++;
      else t2Count++;
    }
  }

  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col items-center">
      <div className="text-xs font-semibold text-emerald-400 mb-2 uppercase tracking-wide">
        CFT d-Orbital Energy Splitting ({geometry.toUpperCase()} Field)
      </div>

      <svg width="400" height="260" viewBox="0 0 400 260" className="w-full max-w-md">
        {/* Background Grid & Axis */}
        <line x1="40" y1="20" x2="40" y2="230" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
        <text x="15" y="125" fill="#94a3b8" fontSize="12" transform="rotate(-90 25,125)" textAnchor="middle">
          Energy (E)
        </text>

        {/* Barycenter Line */}
        <line x1="70" y1="130" x2="350" y2="130" stroke="#64748b" strokeWidth="1.5" strokeDasharray="6 3" />
        <text x="355" y="134" fill="#64748b" fontSize="10">Barycenter</text>

        {/* Free Spherical Ion (Degenerate 5 d-orbitals) */}
        <g id="free-ion">
          <text x="90" y="245" fill="#94a3b8" fontSize="10" textAnchor="middle">Free Metal Ion</text>
          {[0, 1, 2, 3, 4].map(idx => (
            <g key={idx}>
              <line x1={60 + idx * 14} y1="220" x2={70 + idx * 14} y2="220" stroke="#38bdf8" strokeWidth="3" />
              <circle cx={65 + idx * 14} cy="220" r="3" fill={idx < dElectrons ? '#fbbf24' : 'transparent'} />
            </g>
          ))}
        </g>

        {geometry === 'octahedral' ? (
          <>
            {/* eg Orbitals (Higher Energy: dx2-y2, dz2) */}
            <g id="eg-levels">
              <text x="240" y="55" fill="#f43f5e" fontSize="12" fontWeight="bold">eg (+0.6 Δo)</text>
              <line x1="200" y1="70" x2="280" y2="70" stroke="#f43f5e" strokeWidth="3" />
              <line x1="290" y1="70" x2="370" y2="70" stroke="#f43f5e" strokeWidth="3" />
              {/* e- occupancy */}
              {[...Array(egCount)].map((_, i) => (
                <circle
                  key={i}
                  cx={240 + (i % 2) * 90 + (i >= 2 ? 10 : 0)}
                  cy={70}
                  r="6"
                  fill="#fbbf24"
                  stroke="#b45309"
                  strokeWidth="2"
                />
              ))}
            </g>

            {/* t2g Orbitals (Lower Energy: dxy, dyz, dxz) */}
            <g id="t2g-levels">
              <text x="240" y="200" fill="#3b82f6" fontSize="12" fontWeight="bold">t2g (-0.4 Δo)</text>
              <line x1="170" y1="180" x2="230" y2="180" stroke="#3b82f6" strokeWidth="3" />
              <line x1="240" y1="180" x2="300" y2="180" stroke="#3b82f6" strokeWidth="3" />
              <line x1="310" y1="180" x2="370" y2="180" stroke="#3b82f6" strokeWidth="3" />
              {/* e- occupancy */}
              {[...Array(t2gCount)].map((_, i) => {
                const orbitalIndex = i % 3;
                const isPaired = i >= 3;
                const offsetX = 200 + orbitalIndex * 70 + (isPaired ? 8 : -8);
                return (
                  <circle
                    key={i}
                    cx={offsetX}
                    cy={180}
                    r="5"
                    fill={isPaired ? '#f97316' : '#fbbf24'}
                    stroke="#9a3412"
                    strokeWidth="1.5"
                  />
                );
              })}
            </g>

            {/* Δo Arrow */}
            <line x1="150" y1="70" x2="150" y2="180" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="135" y="130" fill="#c084fc" fontSize="13" fontWeight="bold" textAnchor="end">
              Δo = {deltaVal} kJ/mol
            </text>
          </>
        ) : (
          <>
            {/* Tetrahedral t2 Orbitals (Higher Energy: +0.4 Δt) */}
            <g id="t2-levels">
              <text x="240" y="75" fill="#3b82f6" fontSize="12" fontWeight="bold">t2 (+0.4 Δt)</text>
              <line x1="170" y1="90" x2="230" y2="90" stroke="#3b82f6" strokeWidth="3" />
              <line x1="240" y1="90" x2="300" y2="90" stroke="#3b82f6" strokeWidth="3" />
              <line x1="310" y1="90" x2="370" y2="90" stroke="#3b82f6" strokeWidth="3" />
              {[...Array(t2Count)].map((_, i) => (
                <circle
                  key={i}
                  cx={200 + (i % 3) * 70}
                  cy={90}
                  r="5"
                  fill="#fbbf24"
                  stroke="#b45309"
                  strokeWidth="1.5"
                />
              ))}
            </g>

            {/* Tetrahedral e Orbitals (Lower Energy: -0.6 Δt) */}
            <g id="e-levels">
              <text x="240" y="185" fill="#f43f5e" fontSize="12" fontWeight="bold">e (-0.6 Δt)</text>
              <line x1="200" y1="170" x2="280" y2="170" stroke="#f43f5e" strokeWidth="3" />
              <line x1="290" y1="170" x2="370" y2="170" stroke="#f43f5e" strokeWidth="3" />
              {[...Array(eCount)].map((_, i) => (
                <circle
                  key={i}
                  cx={240 + (i % 2) * 90}
                  cy={170}
                  r="5"
                  fill="#fbbf24"
                  stroke="#b45309"
                  strokeWidth="1.5"
                />
              ))}
            </g>

            {/* Δt Arrow */}
            <line x1="150" y1="90" x2="150" y2="170" stroke="#a855f7" strokeWidth="2" />
            <text x="135" y="135" fill="#c084fc" fontSize="12" fontWeight="bold" textAnchor="end">
              Δt ≈ 4/9 Δo
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

// 2. Stereoisomer 3D Structural Viewer (Cis vs Trans, Fac vs Mer, Optical Enantiomers)
const StereoIsomerDiagram: React.FC<{
  isomerType: 'cis-trans' | 'fac-mer' | 'optical';
  selectedVariant: string;
}> = ({ isomerType, selectedVariant }) => {
  return (
    <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
      <div className="text-xs font-semibold text-gold-400 mb-2 uppercase tracking-wide">
        3D Structural Isomer Spatial Orientation ({selectedVariant})
      </div>

      <svg width="360" height="220" viewBox="0 0 360 220" className="w-full max-w-sm">
        <defs>
          <radialGradient id="metalGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0369a1" />
          </radialGradient>
          <radialGradient id="ligandAGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#991b1b" />
          </radialGradient>
          <radialGradient id="ligandBGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </radialGradient>
        </defs>

        {/* Center Metal Ion */}
        <circle cx="180" cy="110" r="24" fill="url(#metalGrad)" stroke="#e0f2fe" strokeWidth="2" />
        <text x="180" y="115" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">M</text>

        {/* Coordination Bond Axis Lines */}
        {/* Top & Bottom (Axial) */}
        <line x1="180" y1="110" x2="180" y2="35" stroke="#94a3b8" strokeWidth="3" />
        <line x1="180" y1="110" x2="180" y2="185" stroke="#94a3b8" strokeWidth="3" />
        {/* Equatorial 4 points */}
        <line x1="180" y1="110" x2="90" y2="80" stroke="#94a3b8" strokeWidth="3" />
        <line x1="180" y1="110" x2="270" y2="80" stroke="#94a3b8" strokeWidth="3" />
        <line x1="180" y1="110" x2="110" y2="150" stroke="#94a3b8" strokeWidth="4" />
        <line x1="180" y1="110" x2="250" y2="150" stroke="#94a3b8" strokeWidth="4" />

        {/* Ligand Positions Based on Variant */}
        {selectedVariant.includes('cis') || selectedVariant.includes('fac') || selectedVariant.includes('dextro') ? (
          <>
            {/* Adjacent (Cis/Fac/Chiral) setup */}
            <circle cx="180" cy="35" r="14" fill="url(#ligandAGrad)" />
            <text x="180" y="39" fill="#fff" fontSize="10" textAnchor="middle">Cl</text>

            <circle cx="90" cy="80" r="14" fill="url(#ligandAGrad)" />
            <text x="90" y="84" fill="#fff" fontSize="10" textAnchor="middle">Cl</text>

            <circle cx="270" cy="80" r="14" fill="url(#ligandBGrad)" />
            <text x="270" y="84" fill="#fff" fontSize="10" textAnchor="middle">NH3</text>

            <circle cx="110" cy="150" r="14" fill="url(#ligandBGrad)" />
            <text x="110" y="154" fill="#fff" fontSize="10" textAnchor="middle">NH3</text>

            <circle cx="250" cy="150" r="14" fill="url(#ligandBGrad)" />
            <text x="250" y="154" fill="#fff" fontSize="10" textAnchor="middle">NH3</text>

            <circle cx="180" cy="185" r="14" fill="url(#ligandBGrad)" />
            <text x="180" y="189" fill="#fff" fontSize="10" textAnchor="middle">NH3</text>

            <text x="180" y="212" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">
              Cis Angle = 90° (Adjacent Ligands)
            </text>
          </>
        ) : (
          <>
            {/* Opposite (Trans/Mer) setup */}
            <circle cx="180" cy="35" r="14" fill="url(#ligandAGrad)" />
            <text x="180" y="39" fill="#fff" fontSize="10" textAnchor="middle">Cl</text>

            <circle cx="180" cy="185" r="14" fill="url(#ligandAGrad)" />
            <text x="180" y="189" fill="#fff" fontSize="10" textAnchor="middle">Cl</text>

            <circle cx="90" cy="80" r="14" fill="url(#ligandBGrad)" />
            <text x="90" y="84" fill="#fff" fontSize="10" textAnchor="middle">NH3</text>

            <circle cx="270" cy="80" r="14" fill="url(#ligandBGrad)" />
            <text x="270" y="84" fill="#fff" fontSize="10" textAnchor="middle">NH3</text>

            <circle cx="110" cy="150" r="14" fill="url(#ligandBGrad)" />
            <text x="110" y="154" fill="#fff" fontSize="10" textAnchor="middle">NH3</text>

            <circle cx="250" cy="150" r="14" fill="url(#ligandBGrad)" />
            <text x="250" y="154" fill="#fff" fontSize="10" textAnchor="middle">NH3</text>

            <text x="180" y="212" fill="#4ade80" fontSize="11" fontWeight="bold" textAnchor="middle">
              Trans Angle = 180° (Opposite Ligands)
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

// 3. Metal Carbonyl Synergic Backbonding Diagram
const SynergicBondingDiagram: React.FC<{
  metalCharge: number;
  irFreq: number;
}> = ({ metalCharge, irFreq }) => {
  const backbondingStrength = metalCharge <= -1 ? 'Strong' : metalCharge === 0 ? 'Moderate' : 'Weak';
  const backbondColor = metalCharge <= -1 ? '#f59e0b' : metalCharge === 0 ? '#38bdf8' : '#94a3b8';

  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col items-center">
      <div className="text-xs font-semibold text-amber-400 mb-2 uppercase tracking-wide">
        Metal Carbonyl Synergic Bonding Mechanism (M ⇄ C ≡ O)
      </div>

      <svg width="420" height="200" viewBox="0 0 420 200" className="w-full max-w-md">
        {/* Metal Sphere */}
        <circle cx="80" cy="100" r="35" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" />
        <text x="80" y="105" fill="#38bdf8" fontSize="16" fontWeight="bold" textAnchor="middle">
          M ({metalCharge >= 0 ? `+${metalCharge}` : metalCharge})
        </text>

        {/* Carbon Atom */}
        <circle cx="220" cy="100" r="22" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
        <text x="220" y="105" fill="#f8fafc" fontSize="14" fontWeight="bold" textAnchor="middle">C</text>

        {/* Oxygen Atom */}
        <circle cx="340" cy="100" r="22" fill="#334155" stroke="#f43f5e" strokeWidth="2" />
        <text x="340" y="105" fill="#f43f5e" fontSize="14" fontWeight="bold" textAnchor="middle">O</text>

        {/* C≡O Triple Bond Lines */}
        <line x1="242" y1="92" x2="318" y2="92" stroke="#e2e8f0" strokeWidth="3" />
        <line x1="242" y1="100" x2="318" y2="100" stroke="#e2e8f0" strokeWidth="3" />
        <line x1="242" y1="108" x2="318" y2="108" stroke="#e2e8f0" strokeWidth="3" />

        {/* σ-Donation Arrow (C lone pair -> Metal d-orbital) */}
        <path d="M 195,85 Q 150,70 118,85" fill="none" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrowGreen)" />
        <text x="155" y="65" fill="#4ade80" fontSize="11" fontWeight="bold" textAnchor="middle">
          σ-donation (C → M)
        </text>

        {/* π-Backdonation Curve (Metal d-orbital -> C=O π* anti-bonding) */}
        <path
          d="M 118,115 Q 150,135 195,115"
          fill="none"
          stroke={backbondColor}
          strokeWidth={metalCharge <= -1 ? '4' : '2'}
          strokeDasharray={metalCharge > 0 ? '4 2' : 'none'}
        />
        <text x="155" y="150" fill={backbondColor} fontSize="11" fontWeight="bold" textAnchor="middle">
          π-backbonding (M dπ → C π*) [{backbondingStrength}]
        </text>
      </svg>

      <div className="mt-2 flex items-center justify-between w-full text-xs px-4 bg-slate-950 py-2 rounded-lg border border-slate-800">
        <span className="text-slate-300">IR C≡O Stretching Frequency (ν_CO):</span>
        <span className="text-amber-400 font-mono font-bold text-sm">{irFreq} cm⁻¹</span>
      </div>
    </div>
  );
};

// 4. Color Spectrophotometer & Complementary Color Wheel Canvas
const ColorAbsorptionWheelCanvas: React.FC<{
  absorbedWavelength: number; // in nm
  complexColorName: string;
  complexHex: string;
}> = ({ absorbedWavelength, complexColorName, complexHex }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = 75;

    // Color Wheel Segments (Wavelength nm & complementary colors)
    const segments = [
      { startAngle: 0, endAngle: Math.PI / 3, color: '#ef4444', label: 'Red (700nm)' },
      { startAngle: Math.PI / 3, endAngle: (2 * Math.PI) / 3, color: '#f97316', label: 'Orange (620nm)' },
      { startAngle: (2 * Math.PI) / 3, endAngle: Math.PI, color: '#eab308', label: 'Yellow (580nm)' },
      { startAngle: Math.PI, endAngle: (4 * Math.PI) / 3, color: '#22c55e', label: 'Green (530nm)' },
      { startAngle: (4 * Math.PI) / 3, endAngle: (5 * Math.PI) / 3, color: '#3b82f6', label: 'Blue (470nm)' },
      { startAngle: (5 * Math.PI) / 3, endAngle: 2 * Math.PI, color: '#a855f7', label: 'Violet (420nm)' }
    ];

    segments.forEach(seg => {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, seg.startAngle, seg.endAngle);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.globalAlpha = 0.85;
      ctx.fill();
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    ctx.globalAlpha = 1.0;

    // Center Observed Solution Flask Indicator
    ctx.beginPath();
    ctx.arc(cx, cy, 32, 0, 2 * Math.PI);
    ctx.fillStyle = complexHex;
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Observed', cx, cy - 4);
    ctx.fillText('Color', cx, cy + 8);
  }, [absorbedWavelength, complexHex]);

  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col items-center">
      <div className="text-xs font-semibold text-pink-400 mb-2 uppercase tracking-wide">
        UV-Vis d-d Transition Spectrophotometer Spectrum
      </div>
      <canvas ref={canvasRef} width="300" height="180" className="rounded-lg shadow-inner" />
      <div className="mt-2 text-xs text-slate-300 flex items-center gap-3">
        <div>Absorbed λ: <span className="font-mono text-gold-300 font-bold">{absorbedWavelength} nm</span></div>
        <div>Perceived Solution Color: <span className="font-bold" style={{ color: complexHex }}>{complexColorName}</span></div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT DEFINITION
// ============================================================================
export default function C12_ChemistryCoordinationCompoundsCBSESim() {
  // Navigation Tabs State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);

  // Challenge Mode State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintIndex, setCurrentHintIndex] = useState<number>(0);

  // Audio / Visual Feedback Triggers
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Inactivity Hint Timer Ref
  const hintTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Discovery / Question states
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [selectedDiscoveryOpt, setSelectedDiscoveryOpt] = useState<number | null>(null);
  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);

  // BKT Knowledge State Map (NodeId -> BKTState)
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  // SRS Review Items Map
  const [srsItems, setSrsItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Lab 1 Interactive State (Werner's Theory)
  const [selectedWernerSalt, setSelectedWernerSalt] = useState<'6NH3' | '5NH3' | '4NH3' | '3NH3'>('6NH3');
  const [agNo3Added, setAgNo3Added] = useState<boolean>(false);

  // Lab 2 Interactive State (Nomenclature & Sphere Builder)
  const [metalIon, setMetalIon] = useState<'Co3+' | 'Fe2+' | 'Fe3+' | 'Cu2+' | 'Pt2+'>('Co3+');
  const [ligandA, setLigandA] = useState<'NH3' | 'H2O' | 'Cl-' | 'CN-'>('NH3');
  const [ligandACount, setLigandACount] = useState<number>(6);
  const [ligandB, setLigandB] = useState<'Cl-' | 'NO2-' | 'en' | 'none'>('none');
  const [ligandBCount, setLigandBCount] = useState<number>(0);

  // Lab 3 Interactive State (Isomerism Workbench)
  const [isomerType, setIsomerType] = useState<'cis-trans' | 'fac-mer' | 'optical'>('cis-trans');
  const [selectedVariant, setSelectedVariant] = useState<string>('cis-Pt(NH3)2Cl2');

  // Lab 4 Interactive State (CFT Spectrophotometer)
  const [cftGeometry, setCftGeometry] = useState<'octahedral' | 'tetrahedral'>('octahedral');
  const [metalDElectrons, setMetalDElectrons] = useState<number>(6); // d6 Co3+
  const [ligandField, setLigandField] = useState<'weak' | 'strong'>('strong');
  const [absorbedWavelength, setAbsorbedWavelength] = useState<number>(490); // nm

  // Lab 5 Interactive State (Metal Carbonyl IR)
  const [carbonylMetalCharge, setCarbonylMetalCharge] = useState<number>(0);

  // Calculate Inactivity Hint Timer
  const resetHintTimer = useCallback(() => {
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    hintTimerRef.current = setTimeout(() => {
      if (!isAnswerSubmitted) {
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 10000); // 10s inactivity auto-hint
  }, [isAnswerSubmitted]);

  useEffect(() => {
    resetHintTimer();
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, [currentChallengeIndex, resetHintTimer]);

  // Current Challenge Data
  const currentChallenge = CHALLENGES[currentChallengeIndex];

  // Calculated Spectroscopic values for Lab 4
  const cftValues = useMemo(() => {
    let delta = ligandField === 'strong' ? 240 : 160; // kJ/mol
    if (cftGeometry === 'tetrahedral') delta = Math.round(delta * (4 / 9));

    let colorName = 'Violet / Purple';
    let hex = '#8b5cf6';
    let lambda = 490;

    if (ligandField === 'strong') {
      lambda = 450; // blue-green absorbed -> yellow/orange observed
      colorName = 'Orange-Yellow';
      hex = '#f59e0b';
    } else {
      lambda = 590; // orange absorbed -> blue-violet observed
      colorName = 'Blue-Violet';
      hex = '#6366f1';
    }

    return { delta, colorName, hex, lambda };
  }, [ligandField, cftGeometry]);

  // Calculated IR Stretching Frequency for Lab 5
  const irStretchingFreq = useMemo(() => {
    if (carbonylMetalCharge === -2) return 1790; // [Fe(CO)4]2-
    if (carbonylMetalCharge === -1) return 1890; // [Co(CO)4]-
    if (carbonylMetalCharge === 0) return 2060;  // [Ni(CO)4]
    return 2170; // [Mn(CO)6]+
  }, [carbonylMetalCharge]);

  // Handle Challenge Option Selection
  const handleOptionSelect = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
    audioManager.play('tap');
    resetHintTimer();
  };

  // Handle Answer Verification
  const handleSubmitAnswer = () => {
    if (isAnswerSubmitted) return;

    let correct = false;
    if (currentChallenge.type === 'multiple-choice') {
      if (selectedOption === currentChallenge.correctIndex) {
        correct = true;
      }
    } else if (currentChallenge.type === 'numeric') {
      const parsed = parseFloat(numericAnswer);
      const expected = typeof currentChallenge.correctAnswer === 'number' ? currentChallenge.correctAnswer : parseFloat(currentChallenge.correctAnswer as string);
      if (!isNaN(parsed) && Math.abs(parsed - expected) <= 0.5) {
        correct = true;
      }
    }

    setIsCorrect(correct);
    setIsAnswerSubmitted(true);

    // BKT Update
    const nodeId = currentChallenge.nodeId;
    const currentBKT = bktStates[nodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, correct);
    setBktStates(prev => ({ ...prev, [nodeId]: updatedBKT }));

    // SRS Update
    const currentSRS = srsItems[nodeId] || createReviewItem(nodeId);
    const updatedSRS = sm2Update(currentSRS, correct ? 5 : 2);
    setSrsItems(prev => ({ ...prev, [nodeId]: updatedSRS }));

    if (correct) {
      setScore(prev => prev + 10);
      audioManager.play('success');
      speechManager.speak('Excellent work! Your answer is correct.');
      setShowSparkle(true);
      setShowSuccessBanner(true);
      setTimeout(() => setShowSuccessBanner(false), 2500);
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite right. Let us review the concept hint.');
    }
  };

  // Next Challenge Navigation
  const handleNextChallenge = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      setSelectedOption(null);
      setNumericAnswer('');
      setIsAnswerSubmitted(false);
      setShowHint(false);
      setCurrentHintIndex(0);
      audioManager.play('whoosh');
    } else {
      // Completed all challenges
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have completed all coordination chemistry challenges.');
      setShowConfetti(true);
      recordGameScore(ALL_NODE_IDS, score + 10);
      setActiveTab('summary');
    }
  };

  // Werner precipitation calculation for Lab 1
  const wernerData = useMemo(() => {
    switch (selectedWernerSalt) {
      case '6NH3':
        return { formula: '[Co(NH3)6]Cl3', outerCl: 3, agClMoles: 3, color: 'Purple / Yellow' };
      case '5NH3':
        return { formula: '[Co(NH3)5Cl]Cl2', outerCl: 2, agClMoles: 2, color: 'Purple-Red' };
      case '4NH3':
        return { formula: '[Co(NH3)4Cl2]Cl', outerCl: 1, agClMoles: 1, color: 'Green (trans) / Violet (cis)' };
      case '3NH3':
        return { formula: '[Co(NH3)3Cl3]', outerCl: 0, agClMoles: 0, color: 'Blue-Green (Non-electrolyte)' };
    }
  }, [selectedWernerSalt]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-x-hidden">
      {/* Audio Visual Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={500} y={300} />

      {/* TOP HEADER BAR */}
      <header className="w-full bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold-500 to-gold-600 flex items-center justify-center font-bold text-white text-xl shadow-md">
            ⚛️
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide">
              ISC Chemistry: Coordination Compounds
            </h1>
            <p className="text-xs text-slate-400">
              Class 12 • Werner Theory, CFT, Isomerism, VBT & Synergic Bonding
            </p>
          </div>
        </div>

        {/* Global Progress & Mastery Score */}
        <div className="flex items-center space-x-6 mt-3 sm:mt-0">
          <div className="text-right">
            <div className="text-xs text-slate-400">Lab Score</div>
            <div className="text-lg font-mono font-bold text-gold-400">{score} pts</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400">Challenge Progress</div>
            <div className="text-sm font-mono font-semibold text-emerald-400">
              {currentChallengeIndex + 1} / {CHALLENGES.length}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN NAVIGATION TABS */}
      <nav className="w-full bg-slate-900/60 border-b border-slate-800 px-6 py-2 flex items-center space-x-2 overflow-x-auto">
        <button
          onClick={() => { setActiveTab('discovery'); audioManager.play('tap'); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'discovery'
              ? 'bg-gold-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          🔍 1. Discovery & Concept Scenario
        </button>

        <button
          onClick={() => { setActiveTab('lab'); audioManager.play('tap'); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'lab'
              ? 'bg-gold-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          🧪 2. Interactive Exploration Labs (5)
        </button>

        <button
          onClick={() => { setActiveTab('challenges'); audioManager.play('tap'); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'challenges'
              ? 'bg-gold-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          ⚔️ 3. Practice Challenges ({CHALLENGES.length})
        </button>

        <button
          onClick={() => { setActiveTab('summary'); audioManager.play('tap'); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'summary'
              ? 'bg-gold-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          📊 4. Real-World Applications & Mastery
        </button>
      </nav>

      {/* BODY CONTENT CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col space-y-6">

        {/* =================================================================== */}
        {/* TAB 1: DISCOVERY & SCENARIO */}
        {/* =================================================================== */}
        {activeTab === 'discovery' && (
          <div className="flex flex-col space-y-6">
            {/* Scenario Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🏛️</span>
                <h2 className="text-xl font-bold text-gold-400">{SCENARIO.title}</h2>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
                <span className="font-semibold text-gold-300">Context: </span>
                {SCENARIO.context}
              </div>
            </div>

            {/* Discovery Question Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-bold text-amber-400 uppercase tracking-wide">
                  Initial Discovery Challenge: Strong vs Weak Field Ligands
                </h3>
                <span className="text-xs bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/20">
                  Pre-conception Test
                </span>
              </div>

              <p className="text-slate-200 font-medium text-sm mb-4">{DISCOVERY_QUESTION.question}</p>

              <div className="space-y-3 mb-4">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDiscoveryOpt(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-sm ${
                      selectedDiscoveryOpt === idx
                        ? 'bg-gold-950 border-gold-500 text-gold-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                  </button>
                ))}
              </div>

              {!discoverySubmitted ? (
                <button
                  disabled={selectedDiscoveryOpt === null}
                  onClick={() => {
                    setDiscoverySubmitted(true);
                    audioManager.play(selectedDiscoveryOpt === DISCOVERY_QUESTION.correctIndex ? 'success' : 'error');
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-600 hover:from-gold-500 hover:to-gold-500 text-white font-semibold rounded-xl disabled:opacity-50 shadow-md transition-all"
                >
                  Confirm Answer
                </button>
              ) : (
                <div className={`p-4 rounded-xl border text-sm ${
                  selectedDiscoveryOpt === DISCOVERY_QUESTION.correctIndex
                    ? 'bg-emerald-950/60 border-emerald-600 text-emerald-200'
                    : 'bg-rose-950/60 border-rose-600 text-rose-200'
                }`}>
                  <div className="font-bold mb-1">
                    {selectedDiscoveryOpt === DISCOVERY_QUESTION.correctIndex ? 'Correct Discovery!' : 'Insight Correction:'}
                  </div>
                  <p>{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>

            {/* Mandatory Prediction Questions Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-md font-bold text-emerald-400 mb-4 uppercase tracking-wide">
                Lab Prediction Hypothesis Questions
              </h3>

              <div className="space-y-6">
                {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                  <div key={pIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p className="text-sm font-semibold text-slate-200 mb-3">{pred.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                      {pred.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            const newAns = [...predictionAnswers];
                            newAns[pIdx] = oIdx;
                            setPredictionAnswers(newAns);
                            audioManager.play('tap');
                          }}
                          className={`p-3 rounded-lg border text-xs text-left transition-all ${
                            predictionAnswers[pIdx] === oIdx
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {predictionAnswers[pIdx] !== null && (
                      <div className="text-xs text-slate-400 italic bg-slate-900 p-2 rounded border border-slate-800">
                        🔍 Instruction: {pred.verifyInstruction}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 2: INTERACTIVE EXPLORATION LABS (5 LABS) */}
        {/* =================================================================== */}
        {activeTab === 'lab' && (
          <div className="flex flex-col space-y-6">
            {/* Lab Sub-navigation */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => { setActiveLabIndex(idx); audioManager.play('tap'); }}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    activeLabIndex === idx
                      ? 'bg-gold-950 border-gold-500 text-gold-200 shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-500">LAB 0{idx + 1}</span>
                  <span className="text-xs font-semibold line-clamp-2 mt-1">{step.title.split(':')[1]}</span>
                </button>
              ))}
            </div>

            {/* Current Lab Step Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
              <h2 className="text-lg font-bold text-gold-400 mb-1">
                {EXPLORATION_STEPS[activeLabIndex].title}
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                {EXPLORATION_STEPS[activeLabIndex].instruction}
              </p>
            </div>

            {/* LAB 1: WERNER'S THEORY & PRECIPITATION */}
            {activeLabIndex === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wide">
                    Select Cobalt(III) Ammine Adduct Complex
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {(['6NH3', '5NH3', '4NH3', '3NH3'] as const).map(type => (
                      <button
                        key={type}
                        onClick={() => { setSelectedWernerSalt(type); setAgNo3Added(false); audioManager.play('tap'); }}
                        className={`p-3 rounded-xl border font-mono text-xs font-semibold transition-all ${
                          selectedWernerSalt === type
                            ? 'bg-gold-900/60 border-gold-500 text-gold-200'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        CoCl3 · {type}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setAgNo3Added(true);
                        audioManager.play('drop-correct');
                        speechManager.speak(`Added Silver Nitrate. Precipitated ${wernerData.agClMoles} moles of Silver Chloride.`);
                      }}
                      className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-md transition-all text-sm"
                    >
                      💧 Add Excess AgNO3 Solution
                    </button>
                  </div>

                  {agNo3Added && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/40 text-xs space-y-2">
                      <div className="text-emerald-400 font-bold">Precipitation Results:</div>
                      <div>Deductions for 1 mole of {wernerData.formula}:</div>
                      <ul className="list-disc list-inside text-slate-300 space-y-1">
                        <li>Ionizable Cl⁻ (Primary Valency): <span className="font-mono text-gold-300 font-bold">{wernerData.outerCl}</span></li>
                        <li>Non-ionizable Ligands (Secondary Valency): <span className="font-mono text-gold-300 font-bold">6</span></li>
                        <li>AgCl Precipitate Formed: <span className="font-mono text-amber-400 font-bold">{wernerData.agClMoles} moles</span></li>
                      </ul>
                    </div>
                  )}
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center">
                  <div className="text-xs font-semibold text-slate-400 mb-4">Aqueous Solution & AgCl Precipitate Test Tube</div>
                  <svg width="180" height="240" viewBox="0 0 180 240" className="w-full max-w-xs">
                    {/* Test tube outline */}
                    <path d="M 60 20 L 60 190 A 30 30 0 0 0 120 190 L 120 20" fill="none" stroke="#64748b" strokeWidth="4" />
                    {/* Solution liquid */}
                    <path d="M 62 80 L 62 190 A 28 28 0 0 0 118 190 L 118 80 Z" fill="#6366f1" opacity="0.6" />
                    {/* AgCl precipitate at bottom if AgNO3 added */}
                    {agNo3Added && wernerData.agClMoles > 0 && (
                      <path
                        d={`M 62 ${200 - wernerData.agClMoles * 10} A 28 28 0 0 0 118 ${200 - wernerData.agClMoles * 10} Z`}
                        fill="#f8fafc"
                        opacity="0.95"
                      />
                    )}
                  </svg>
                  <div className="mt-2 text-xs font-bold text-slate-300">
                    Formula: <span className="font-mono text-gold-400">{wernerData.formula}</span>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 2: IUPAC NOMENCLATURE & SPHERE BUILDER */}
            {activeLabIndex === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wide">
                    Construct Coordination Entity
                  </h3>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Central Metal Cation:</label>
                    <select
                      value={metalIon}
                      onChange={e => { setMetalIon(e.target.value as any); audioManager.play('tap'); }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200"
                    >
                      <option value="Co3+">Cobalt(III) - Co3+</option>
                      <option value="Fe2+">Iron(II) - Fe2+</option>
                      <option value="Fe3+">Iron(III) - Fe3+</option>
                      <option value="Cu2+">Copper(II) - Cu2+</option>
                      <option value="Pt2+">Platinum(II) - Pt2+</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Primary Ligand A:</label>
                      <select
                        value={ligandA}
                        onChange={e => setLigandA(e.target.value as any)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200"
                      >
                        <option value="NH3">ammine (NH3)</option>
                        <option value="H2O">aqua (H2O)</option>
                        <option value="Cl-">chlorido (Cl-)</option>
                        <option value="CN-">cyanido (CN-)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Ligand A Count:</label>
                      <input
                        type="range"
                        min="2"
                        max="6"
                        value={ligandACount}
                        onChange={e => setLigandACount(parseInt(e.target.value))}
                        className="w-full accent-gold-500 mt-2"
                      />
                      <span className="text-xs text-gold-400 font-mono font-bold">{ligandACount}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wide mb-3">
                      Dynamically Generated IUPAC Name
                    </h3>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-sm font-bold text-gold-300">
                      [{metalIon.substring(0, 2)}({ligandA}){ligandACount}]
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                    <div>Coordination Number: <span className="font-mono text-gold-400 font-bold">{ligandACount}</span></div>
                    <div>Geometry: <span className="font-bold text-amber-400">{ligandACount === 6 ? 'Octahedral' : 'Square Planar / Tetrahedral'}</span></div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 3: ISOMERISM WORKBENCH */}
            {activeLabIndex === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wide">
                    Select Stereoisomerism Type
                  </h3>

                  <div className="flex space-x-2">
                    {(['cis-trans', 'fac-mer', 'optical'] as const).map(type => (
                      <button
                        key={type}
                        onClick={() => { setIsomerType(type); audioManager.play('tap'); }}
                        className={`flex-1 py-2 rounded-xl border text-xs font-semibold capitalize transition-all ${
                          isomerType === type
                            ? 'bg-gold-900 border-gold-500 text-gold-200'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2">
                    {isomerType === 'cis-trans' && (
                      <>
                        <button
                          onClick={() => setSelectedVariant('cis-Pt(NH3)2Cl2')}
                          className="w-full p-3 rounded-xl border text-xs text-left bg-slate-950 border-slate-800 text-slate-200 hover:border-gold-500"
                        >
                          cis-diamminedichloroplatinum(II) [Anticancer Active]
                        </button>
                        <button
                          onClick={() => setSelectedVariant('trans-Pt(NH3)2Cl2')}
                          className="w-full p-3 rounded-xl border text-xs text-left bg-slate-950 border-slate-800 text-slate-200 hover:border-gold-500"
                        >
                          trans-diamminedichloroplatinum(II) [Inactive]
                        </button>
                      </>
                    )}

                    {isomerType === 'fac-mer' && (
                      <>
                        <button
                          onClick={() => setSelectedVariant('fac-[Co(NH3)3(NO2)3]')}
                          className="w-full p-3 rounded-xl border text-xs text-left bg-slate-950 border-slate-800 text-slate-200 hover:border-gold-500"
                        >
                          fac-[Co(NH3)3(NO2)3] (Facial - Octahedral face)
                        </button>
                        <button
                          onClick={() => setSelectedVariant('mer-[Co(NH3)3(NO2)3]')}
                          className="w-full p-3 rounded-xl border text-xs text-left bg-slate-950 border-slate-800 text-slate-200 hover:border-gold-500"
                        >
                          mer-[Co(NH3)3(NO2)3] (Meridional - Plane boundary)
                        </button>
                      </>
                    )}

                    {isomerType === 'optical' && (
                      <>
                        <button
                          onClick={() => setSelectedVariant('dextro-[Co(en)3]3+')}
                          className="w-full p-3 rounded-xl border text-xs text-left bg-slate-950 border-slate-800 text-slate-200 hover:border-gold-500"
                        >
                          dextro (+)-[Co(en)3]3+ (Right plane rotation)
                        </button>
                        <button
                          onClick={() => setSelectedVariant('laevo-[Co(en)3]3+')}
                          className="w-full p-3 rounded-xl border text-xs text-left bg-slate-950 border-slate-800 text-slate-200 hover:border-gold-500"
                        >
                          laevo (-)-[Co(en)3]3+ (Left plane rotation)
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <StereoIsomerDiagram isomerType={isomerType} selectedVariant={selectedVariant} />
              </div>
            )}

            {/* LAB 4: CRYSTAL FIELD THEORY (CFT) SPECTROSCOPY */}
            {activeLabIndex === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wide">
                    Crystal Field Parameters
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Geometry:</label>
                      <button
                        onClick={() => setCftGeometry(cftGeometry === 'octahedral' ? 'tetrahedral' : 'octahedral')}
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-gold-300"
                      >
                        {cftGeometry.toUpperCase()}
                      </button>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Ligand Field Strength:</label>
                      <button
                        onClick={() => setLigandField(ligandField === 'strong' ? 'weak' : 'strong')}
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-amber-300"
                      >
                        {ligandField === 'strong' ? 'Strong Field (CN- / CO)' : 'Weak Field (F- / H2O)'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Metal d-Electron Count (d^n):</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={metalDElectrons}
                      onChange={e => setMetalDElectrons(parseInt(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                    <div className="text-xs text-gold-400 font-mono font-bold mt-1">d^{metalDElectrons} configuration</div>
                  </div>

                  <CFTOrbitalSplittingDiagram
                    geometry={cftGeometry}
                    dElectrons={metalDElectrons}
                    ligandStrength={ligandField}
                    deltaVal={cftValues.delta}
                  />
                </div>

                <ColorAbsorptionWheelCanvas
                  absorbedWavelength={cftValues.lambda}
                  complexColorName={cftValues.colorName}
                  complexHex={cftValues.hex}
                />
              </div>
            )}

            {/* LAB 5: METAL CARBONYL SYNERGIC BACKBONDING */}
            {activeLabIndex === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wide">
                    Vary Metal Oxidation Charge
                  </h3>

                  <div className="space-y-2">
                    {[
                      { charge: -2, name: '[Fe(CO)4]2- (Iron -2 charge)' },
                      { charge: -1, name: '[Co(CO)4]- (Cobalt -1 charge)' },
                      { charge: 0,  name: '[Ni(CO)4] (Neutral Nickel)' },
                      { charge: 1,  name: '[Mn(CO)6]+ (Manganese +1 charge)' }
                    ].map(item => (
                      <button
                        key={item.charge}
                        onClick={() => { setCarbonylMetalCharge(item.charge); audioManager.play('tap'); }}
                        className={`w-full p-3 rounded-xl border text-xs text-left transition-all ${
                          carbonylMetalCharge === item.charge
                            ? 'bg-amber-950 border-amber-500 text-amber-200 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className="font-bold text-amber-400">IR Analysis Key:</span> Higher negative charge increases metal d-electron density → stronger π-backdonation into C≡O π* orbitals → weakens C-O bond → shifts IR stretching frequency (ν_CO) to lower wavenumber.
                  </div>
                </div>

                <SynergicBondingDiagram metalCharge={carbonylMetalCharge} irFreq={irStretchingFreq} />
              </div>
            )}

            {/* Mandatory Observation Questions Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-md font-bold text-gold-400 mb-4 uppercase tracking-wide">
                Post-Lab Observation Check
              </h3>

              <div className="space-y-6">
                {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                  <div key={oIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p className="text-sm font-semibold text-slate-200 mb-3">{obs.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {obs.observableOptions.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => {
                            const newAns = [...observationAnswers];
                            newAns[oIdx] = optIdx;
                            setObservationAnswers(newAns);
                            audioManager.play(optIdx === obs.correctIndex ? 'success' : 'error');
                          }}
                          className={`p-3 rounded-lg border text-xs text-left transition-all ${
                            observationAnswers[oIdx] === optIdx
                              ? optIdx === obs.correctIndex
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                : 'bg-rose-950 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
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

        {/* =================================================================== */}
        {/* TAB 3: PRACTICE CHALLENGES (22 CHALLENGES Across 3 Tiers) */}
        {/* =================================================================== */}
        {activeTab === 'challenges' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col space-y-6">
            {/* Challenge Header & Difficulty Badge */}
            <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wide">
                  Challenge #{currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <h2 className="text-lg font-bold text-white mt-1">
                  {currentChallenge.competencyLevel}
                </h2>
              </div>

              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                  currentChallenge.difficulty === 'foundation'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : currentChallenge.difficulty === 'standard'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                }`}>
                  {currentChallenge.difficulty} Tier
                </span>
              </div>
            </div>

            {/* Question Text */}
            <p className="text-slate-200 text-base font-medium leading-relaxed">
              {currentChallenge.question}
            </p>

            {/* Multiple Choice Options or Numeric Input */}
            {currentChallenge.type === 'multiple-choice' && currentChallenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {currentChallenge.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

                  if (isAnswerSubmitted) {
                    if (idx === currentChallenge.correctIndex) {
                      btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-gold-950 border-gold-500 text-gold-200';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswerSubmitted}
                      onClick={() => handleOptionSelect(idx)}
                      className={`w-full text-left p-4 rounded-xl border transition-all text-sm flex items-start space-x-3 ${btnStyle}`}
                    >
                      <span className="font-bold text-slate-400 font-mono">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {currentChallenge.type === 'numeric' && (
              <div className="space-y-3 max-w-md">
                <label className="text-xs text-slate-400 block">Enter Numerical Value:</label>
                <input
                  type="number"
                  step="any"
                  disabled={isAnswerSubmitted}
                  value={numericAnswer}
                  onChange={e => setNumericAnswer(e.target.value)}
                  placeholder="e.g. 28.66 or -0.4"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-mono text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>
            )}

            {/* Hint Bubble & Progressive Hints */}
            <HintBubble
              show={showHint}
              text={currentChallenge.hints[currentHintIndex]}
            />

            {/* Submit / Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setShowHint(true);
                  setCurrentHintIndex(prev => (prev + 1) % currentChallenge.hints.length);
                  audioManager.play('hint');
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-all"
              >
                💡 Need a Hint? ({currentHintIndex + 1}/3)
              </button>

              {!isAnswerSubmitted ? (
                <button
                  disabled={selectedOption === null && numericAnswer === ''}
                  onClick={handleSubmitAnswer}
                  className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-600 hover:from-gold-500 hover:to-gold-500 text-white font-bold rounded-xl disabled:opacity-50 shadow-md transition-all text-sm"
                >
                  Submit Response
                </button>
              ) : (
                <button
                  onClick={handleNextChallenge}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-md transition-all text-sm"
                >
                  Next Challenge ➔
                </button>
              )}
            </div>

            {/* Feedback & Explanation Card */}
            {isAnswerSubmitted && (
              <div className={`p-5 rounded-xl border text-sm ${
                isCorrect
                  ? 'bg-emerald-950/60 border-emerald-600 text-emerald-200'
                  : 'bg-rose-950/60 border-rose-600 text-rose-200'
              }`}>
                <div className="font-bold text-base mb-2">
                  {isCorrect ? '✅ Spot on! Correct Solution.' : '❌ Incorrect Attempt.'}
                </div>
                <p className="leading-relaxed">{currentChallenge.explanation}</p>
              </div>
            )}
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 4: SUMMARY & REAL-WORLD APPLICATIONS */}
        {/* =================================================================== */}
        {activeTab === 'summary' && (
          <div className="flex flex-col space-y-6">
            {/* Real World Activity Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🏥</span>
                <h2 className="text-lg font-bold text-emerald-400">{REAL_WORLD_ACTIVITY.title}</h2>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-3 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start space-x-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Misconceptions Corrective Summary Grid */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-md font-bold text-amber-400 mb-4 uppercase tracking-wide">
                Key Conceptual Misconceptions & Corrections
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map(misc => (
                  <div key={misc.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-gold-400 uppercase tracking-wide">{misc.topic}</div>
                    <div className="text-xs text-rose-300 line-through">Myth: {misc.misconception}</div>
                    <div className="text-xs text-emerald-300">Correction: {misc.correction}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}