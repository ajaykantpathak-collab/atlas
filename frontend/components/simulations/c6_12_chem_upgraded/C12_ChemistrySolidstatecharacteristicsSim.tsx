'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// TYPE DEFINITIONS & INTERFACES (NO 'any')
// ==========================================

export interface NodeMasteryData {
  pKnown: number;
  pLearn?: number;
  pGuess?: number;
  pSlip?: number;
}

export interface BKTMap {
  [nodeId: string]: NodeMasteryData;
}

export type SRSItem = import('../../../lib/srs').ReviewItem;

export interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'numeric' | 'drag-label' | 'distinguish';
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

export interface ExplorationStep {
  title: string;
  instruction: string;
  interactionType: string;
  nodeId: string;
}

export interface PredictionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  verifyInstruction: string;
  nodeId: string;
}

export interface ObservationQuestion {
  question: string;
  observableOptions: string[];
  correctIndex: number;
  nodeId: string;
}

export interface RealWorldActivity {
  title: string;
  description: string;
  steps: string[];
}

export interface Misconception {
  id: string;
  misconception: string;
  correction: string;
  nodeId: string;
}

// ==========================================
// NODE IDS & CONSTANTS
// ==========================================

const NODE_IDS = {
  CHARACTERISTICS: 'c12_chem_001',
  TYPES_SOLIDS: 'c12_chem_002',
  LATTICES_SYSTEMS: 'c12_chem_003',
  UNIT_CELLS: 'c12_chem_004',
  ATOMS_PER_CELL: 'c12_chem_005',
  CLOSE_PACKING: 'c12_chem_006',
  VOIDS: 'c12_chem_007',
  PACKING_EFFICIENCY: 'c12_chem_008',
  DENSITY: 'c12_chem_009',
  DEFECTS: 'c12_chem_010',
};

const ALL_NODE_IDS = [
  'c12_chem_001',
  'c12_chem_002',
  'c12_chem_003',
  'c12_chem_004',
  'c12_chem_005',
  'c12_chem_006',
  'c12_chem_007',
  'c12_chem_008',
  'c12_chem_009',
  'c12_chem_010',
];

// ==========================================
// MANDATORY CONTENT STRUCTURES
// ==========================================

const SCENARIO = {
  title: 'Advanced Solid State Characterization & Crystallography Lab',
  intro: 'Welcome to the Central Materials Research Facility. You are analyzing pristine single crystals and semiconductor lattices using X-ray diffraction, atomic probe tomography, and high-precision densitometry.',
  context: 'Investigate the fundamental atomic packaging of solids, measure unit cell parameters, count fractional lattice atoms, map tetrahedral/octahedral voids, calculate theoretical density, and identify structural point defects in commercial crystals.',
};

const DISCOVERY_QUESTION = {
  question: 'When metallic Copper (FCC lattice) is melted into liquid copper, its density drops slightly. However, when Quartz glass (amorphous silica) is produced from Quartz crystal, why does the amorphous glass have a lower density and no sharp melting point compared to the crystal?',
  options: [
    'Amorphous solids lack long-range periodic spatial order, causing looser statistical packing and non-uniform thermal bond breakdown',
    'Amorphous solids have higher coordination numbers which force atoms further apart',
    'Quartz glass contains covalent bonds while Quartz crystal contains ionic bonds',
    'Crystalline quartz contains empty void spaces that collapse when it turns into glass'
  ],
  correctIndex: 0,
  hintAfter: 'Crystalline solids possess short-range AND long-range repeating order with sharp melting points. Amorphous solids possess only short-range order, softening over a temperature range with lower average packing efficiency.',
};

const EXPLORATION_STEPS: ExplorationStep[] = [
  {
    title: 'Lab 1: Anisotropy & Melting Behavior Workbench',
    instruction: 'Measure electrical resistance along different crystallographic axes ($x, y, z$) in Quartz crystal vs Quartz glass and observe the sharp vs diffuse thermal melting transition.',
    interactionType: 'anisotropy-tester',
    nodeId: 'c12_chem_001',
  },
  {
    title: 'Lab 2: Unit Cell Geometry & 14 Bravais Lattices',
    instruction: 'Manipulate edge lengths ($a, b, c$) and axial angles ($\alpha, \beta, \gamma$) to construct the 7 crystal systems (Cubic, Tetragonal, Orthorhombic, Hexagonal, Rhombohedral, Monoclinic, Triclinic).',
    interactionType: 'bravais-builder',
    nodeId: 'c12_chem_003',
  },
  {
    title: 'Lab 3: Atomic Fractional Contribution & Density Calculation',
    instruction: 'Slice unit cell spheres at corners ($1/8$), face-centers ($1/2$), body-centers ($1$), and edges ($1/4$). Calculate total atoms ($Z$) and compute bulk density $\\rho = \\frac{Z \\cdot M}{a^3 \\cdot N_A}$.',
    interactionType: 'unit-cell-calculator',
    nodeId: 'c12_chem_005',
  },
  {
    title: 'Lab 4: Close Packing & Interstitial Void Explorer',
    instruction: 'Stack 2D hexagonal layers into 3D ABAB (HCP) and ABCABC (CCP/FCC) arrays. Highlight Tetrahedral ($V_{th} = 2N$) and Octahedral ($V_{oh} = N$) voids and measure radius ratio limits.',
    interactionType: 'void-map-visualizer',
    nodeId: 'c12_chem_007',
  },
  {
    title: 'Lab 5: Imperfections & Point Defect Simulator',
    instruction: 'Introduce thermal vacancy defects, Schottky pairs, Frenkel cation interstitials, and Zn excess F-centers into ionic lattices to observe changes in bulk density and stoichiometry.',
    interactionType: 'defect-injector',
    nodeId: 'c12_chem_010',
  },
];

const PREDICTION_QUESTIONS: PredictionQuestion[] = [
  {
    question: 'Predict: Iron transforms from BCC ($\alpha$-Fe) to FCC ($\gamma$-Fe) when heated above $912^\circ\\text{C}$. Assuming the metallic atomic radius $r$ remains approximately constant, how will the density change during this phase transition?',
    options: [
      'Density will increase because FCC (74% packing efficiency) is more tightly packed than BCC (68% packing efficiency)',
      'Density will decrease because FCC has 4 atoms per unit cell while BCC has only 2',
      'Density will remain identical because the element is pure iron',
      'Density will decrease because higher temperature always expands unit cell volume without bound'
    ],
    correctIndex: 0,
    verifyInstruction: 'Switch to Lab 3/4 to compare BCC (68.02%) vs FCC (74.05%) atomic packing fraction.',
    nodeId: 'c12_chem_008',
  },
  {
    question: 'Predict: Sodium Chloride (NaCl) crystal is heated in sodium vapor. Excess $Na^+$ ions embed into the lattice while emitted electrons occupy anion vacancies forming F-centers. How will this affect electrical conductivity and crystal color?',
    options: [
      'The crystal becomes paramagnetic and yellow-colored due to excitation of unpaired electrons in F-centers',
      'The crystal turns completely opaque black and loses all electrical conductivity',
      'The density increases drastically while remaining completely colorless',
      'The lattice collapses into an amorphous powder due to stoichiometric overload'
    ],
    correctIndex: 0,
    verifyInstruction: 'Use Lab 5 (Defect Injector) to select non-stoichiometric metal excess defect and observe color center excitation.',
    nodeId: 'c12_chem_010',
  },
];

const OBSERVATION_QUESTIONS: ObservationQuestion[] = [
  {
    question: 'Observing Cleavage and Thermal Properties: What distinguishing physical behavior occurs when a true crystalline solid is cut with a sharp blade versus an amorphous glass solid?',
    observableOptions: [
      'Crystalline solids cleave into smooth, clean planar surfaces along crystal planes; amorphous glass fractures irregularly with curved (conchoidal) surfaces.',
      'Crystalline solids shatter into random liquid droplets; amorphous glass splits into perfect rectangular cubes.',
      'Both yield identical smooth glass surfaces regardless of direction.',
      'Amorphous glass produces cleavage planes along $120^\circ$ angles while crystalline solids melt instantly upon contact with the knife.'
    ],
    correctIndex: 0,
    nodeId: 'c12_chem_001',
  },
  {
    question: 'Observing Interstitial Void Distribution: In a Close-Packed Cubic (CCP/FCC) lattice of $N$ spherical anions, how are octahedral and tetrahedral voids positioned relative to unit cell symmetry?',
    observableOptions: [
      '1 Octahedral void is at the body center plus 12 at edge centers (total $N$), while 8 Tetrahedral voids lie entirely inside the body diagonals (total $2N$).',
      'Tetrahedral voids are located at the 6 face centers, while Octahedral voids are located at the 8 corners.',
      'There are equal numbers ($N$) of tetrahedral and octahedral voids, all centered at corner atoms.',
      'Octahedral voids exist only in HCP structures, while Tetrahedral voids exist only in BCC structures.'
    ],
    correctIndex: 0,
    nodeId: 'c12_chem_007',
  },
];

const REAL_WORLD_ACTIVITY: RealWorldActivity = {
  title: 'Silicon Semiconductor Crystal Quality Control & Solar Cell Engineering',
  description: 'In industrial monocrystalline silicon ingot production (Czochralski process), hyper-pure FCC diamond-cubic silicon ($a = 543.09\\text{ pm}$) is manufactured for microchips. Quality assurance engineers measure crystal lattice density and vacancy defect concentrations to prevent thermal breakdown in microprocessors.',
  steps: [
    'Calculate theoretical density of pure Silicon ($M = 28.0855\\text{ g/mol}$, Diamond Cubic $Z = 8$ atoms per unit cell, $a = 543.09\\text{ pm} = 5.4309 \\times 10^{-8}\\text{ cm}$).',
    'Formula: $\\rho_{theo} = \\frac{Z \\cdot M}{a^3 \\cdot N_A} = \\frac{8 \\times 28.0855}{(5.4309 \\times 10^{-8})^3 \\times 6.022 \\times 10^{23}} = 2.329\\text{ g/cm}^3$.',
    'Perform high-precision hydrostatic density measurement of manufactured ingot sample: $\\rho_{exp} = 2.324\\text{ g/cm}^3$.',
    'Calculate Schottky vacancy concentration: $\\Delta \\rho = 2.329 - 2.324 = 0.005\\text{ g/cm}^3$. Vacancy ratio $= \\frac{0.005}{2.329} \\times 100\\% = 0.215\\%$, determining thermal anneal pass/fail criteria.'
  ],
};

const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_01',
    misconception: 'Glass is a slow-flowing liquid at room temperature that grows thicker at the bottom of ancient window panes.',
    correction: 'Glass is an amorphous solid (supercooled liquid in glass transition state) with an extremely high relaxation time (millions of years). Variations in old window glass are due to historic mouth-blown glass manufacturing techniques.',
    nodeId: 'c12_chem_001',
  },
  {
    id: 'misc_02',
    misconception: 'Simple cubic unit cell contains 8 atoms because it has 8 corner spheres.',
    correction: 'Each corner atom is shared equally among 8 adjacent unit cells. Thus, each corner contributes only $1/8$ atom, giving $8 \\times (1/8) = 1$ net atom per unit cell.',
    nodeId: 'c12_chem_005',
  },
  {
    id: 'misc_03',
    misconception: 'Hexagonal Close Packing (HCP) and Face-Centred Cubic (FCC) have different packing efficiencies.',
    correction: 'Both HCP (ABAB...) and FCC/CCP (ABCABC...) represent maximum sphere packing in 3D with identical packing efficiency of 74.05% (0.7405) and coordination number 12.',
    nodeId: 'c12_chem_008',
  },
  {
    id: 'misc_04',
    misconception: 'Frenkel defect reduces the bulk density of the ionic crystal.',
    correction: 'Frenkel defect involves a cation moving from its lattice site to an interstitial void. No ions leave the crystal lattice, so total mass and volume remain constant; overall bulk density is unchanged (unlike Schottky defect which lowers density).',
    nodeId: 'c12_chem_010',
  },
  {
    id: 'misc_05',
    misconception: 'Tetrahedral voids are formed by 4 spheres in a single plane.',
    correction: 'A tetrahedral void is formed by 3 touching spheres in one triangular layer with 1 sphere resting in the depression between them, forming a 3D regular tetrahedron with 4 coordination spheres.',
    nodeId: 'c12_chem_007',
  },
  {
    id: 'misc_06',
    misconception: 'Anisotropy means physical properties are identical in all crystallographic directions.',
    correction: 'Isotropy means identical properties in all directions (characteristic of amorphous solids). Anisotropy means physical properties (refractive index, electrical conductance, thermal expansion) vary along different crystal axes.',
    nodeId: 'c12_chem_001',
  },
];

// ==========================================
// 22+ PROGRESSIVE COMPREHENSIVE CHALLENGES
// ==========================================

const CHALLENGES: Challenge[] = [
  // FOUNDATION TIER (7 Challenges)
  {
    id: 'c1',
    nodeId: 'c12_chem_001',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'Which of the following physical characteristics uniquely distinguishes a crystalline solid from an amorphous solid?',
    options: [
      'Sharp, definite melting point and anisotropic physical properties',
      'Isotropic behavior and gradual softening over a temperature range',
      'Irregular conchoidal cleavage surfaces upon cutting',
      'Lack of short-range ionic bonding order'
    ],
    correctIndex: 0,
    explanation: 'Crystalline solids possess long-range geometric order, resulting in sharp, distinct melting points and anisotropic properties (directional variation in physical measurements). Amorphous solids are isotropic and soften gradually.',
    hints: [
      'Think about how quartz crystal differs from quartz glass when heated.',
      'Crystalline solids have long-range repeating spatial lattices.',
      'Anisotropy means properties vary along different directions.'
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'c2',
    nodeId: 'c12_chem_002',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Classification',
    question: 'Classify Silicon Carbide (SiC, Carborundum) and Solid Carbon Dioxide (Dry Ice) into their respective categories of crystalline solids:',
    options: [
      'SiC: Covalent/Network Solid; Dry Ice: Molecular Solid',
      'SiC: Ionic Solid; Dry Ice: Metallic Solid',
      'SiC: Metallic Solid; Dry Ice: Covalent Solid',
      'SiC: Molecular Solid; Dry Ice: Network Solid'
    ],
    correctIndex: 0,
    explanation: 'SiC forms an extended giant 3D network linked by strong directional covalent bonds (hard, high melting point). Solid $CO_2$ consists of discrete non-polar molecules held together by weak dispersion/London forces.',
    hints: [
      'Consider the nature of bonding in diamond vs ice.',
      'SiC has diamond-like giant covalent framework.',
      'Dry ice consists of separate CO2 molecules held by van der Waals forces.'
    ]
  },
  {
    id: 'c3',
    nodeId: 'c12_chem_003',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'How many distinct crystal systems and Bravais lattices exist in 3D crystallography?',
    options: [
      '7 Crystal Systems and 14 Bravais Lattices',
      '14 Crystal Systems and 7 Bravais Lattices',
      '6 Crystal Systems and 12 Bravais Lattices',
      '9 Crystal Systems and 21 Bravais Lattices'
    ],
    correctIndex: 0,
    explanation: 'Auguste Bravais demonstrated that 3D unit cells belong to 7 fundamental crystal systems (Cubic, Tetragonal, Orthorhombic, Hexagonal, Rhombohedral, Monoclinic, Triclinic), yielding exactly 14 unique spatial Bravais lattices.',
    hints: [
      'The number of crystal systems is 7 (C, T, O, H, R, M, T).',
      'Bravais showed there are 14 spatial lattices.',
      'Remember 7 systems -> 14 lattices.'
    ]
  },
  {
    id: 'c4',
    nodeId: 'c12_chem_004',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which crystal system is characterized by axial parameters $a = b \neq c$ and interaxial angles $\alpha = \beta = 90^\circ, \gamma = 120^\circ$?',
    options: [
      'Hexagonal System',
      'Orthorhombic System',
      'Tetragonal System',
      'Triclinic System'
    ],
    correctIndex: 0,
    explanation: 'The Hexagonal system has two equal coplanar axes ($a = b$) at $120^\circ$ to each other, and a vertical perpendicular $c$-axis ($\alpha = \beta = 90^\circ, \gamma = 120^\circ$), as seen in Graphite, $ZnO$, and $CdS$.',
    hints: [
      'Notice the angle of 120 degrees.',
      'Think of honeycomb 6-fold symmetry.',
      'Hexagonal unit cells have two equal edges and gamma = 120 deg.'
    ]
  },
  {
    id: 'c5',
    nodeId: 'c12_chem_005',
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'Calculation',
    question: 'Calculate the total number of atoms ($Z$) in a primitive Simple Cubic (SC) unit cell containing 8 corner atoms.',
    correctAnswer: 1,
    tolerance: 0,
    unit: 'atom',
    explanation: 'Each corner atom is shared among 8 adjacent unit cells. Contribution per corner = $1/8$. Total $Z = 8 \times (1/8) = 1$ net atom.',
    hints: [
      'How much of a corner atom lies inside a single unit cell?',
      'Fraction per corner = 1/8.',
      '8 corners * 1/8 = 1.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'c6',
    nodeId: 'c12_chem_006',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'What is the coordination number of a sphere in a 3D Close-Packed Cubic (CCP/FCC) lattice structure?',
    options: [
      '12',
      '8',
      '6',
      '4'
    ],
    correctIndex: 0,
    explanation: 'In 3D HCP and CCP (FCC) structures, each sphere touches 6 spheres in its own hexagonal layer, 3 spheres in the layer above, and 3 spheres in the layer below, yielding a total coordination number of $6 + 3 + 3 = 12$.',
    hints: [
      'Count touching neighbors in middle layer (6), top (3), and bottom (3).',
      '6 + 3 + 3 = ?',
      'Maximum close packing coordination number is 12.'
    ]
  },
  {
    id: 'c7',
    nodeId: 'c12_chem_007',
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'If a close-packed array contains $N = 4$ constituent structural spheres, how many total Tetrahedral Voids are present in the unit cell?',
    correctAnswer: 8,
    tolerance: 0,
    unit: 'voids',
    explanation: 'For a close-packed arrangement of $N$ spheres, the number of Octahedral voids is $N$ and the number of Tetrahedral voids is $2N$. Therefore, $2 \times 4 = 8$ tetrahedral voids.',
    hints: [
      'Number of Tetrahedral Voids = 2 * N.',
      'N = 4 spheres.',
      '2 * 4 = 8.'
    ],
    misconceptionIndex: 4,
  },

  // STANDARD TIER (8 Challenges)
  {
    id: 'c8',
    nodeId: 'c12_chem_008',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Determine the theoretical packing efficiency percentage (to 2 decimal places) for a Body-Centred Cubic (BCC) lattice.',
    correctAnswer: 68.02,
    tolerance: 0.2,
    unit: '%',
    explanation: 'In BCC, body diagonal $4r = a\sqrt{3}$, so $a = \frac{4r}{\sqrt{3}}$. $Z = 2$. Volume of spheres $= 2 \times \frac{4}{3}\pi r^3$. Unit cell volume $= a^3 = \frac{64 r^3}{3\sqrt{3}}$. Packing efficiency $= \frac{\frac{8}{3}\pi r^3}{\frac{64 r^3}{3\sqrt{3}}} = \frac{\pi \sqrt{3}}{8} \approx 68.02\\%$.',
    hints: [
      'Formula: Packing fraction = (Z * (4/3)*pi*r^3) / a^3.',
      'For BCC, Z=2 and a = 4r / sqrt(3).',
      '(pi * sqrt(3) / 8) * 100% = 68.02%.'
    ]
  },
  {
    id: 'c9',
    nodeId: 'c12_chem_008',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Aluminum crystallizes in an FCC structure with an atomic radius $r = 143\\text{ pm}$. Calculate the edge length $a$ of its unit cell in picometers (pm).',
    correctAnswer: 404.46,
    tolerance: 1.0,
    unit: 'pm',
    explanation: 'In an FCC unit cell, face diagonal $4r = a\sqrt{2}$. Thus, $a = 2\sqrt{2} r = 2 \times 1.4142 \times 143\\text{ pm} = 404.46\\text{ pm}$.',
    hints: [
      'For FCC, face diagonal atoms touch along the diagonal.',
      'a*sqrt(2) = 4*r => a = 2*sqrt(2)*r.',
      '2 * 1.4142 * 143 = 404.46 pm.'
    ]
  },
  {
    id: 'c10',
    nodeId: 'c12_chem_009',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Quantitative Calculation',
    question: 'An unknown metal with molar mass $M = 63.55\\text{ g/mol}$ forms an FCC lattice ($Z=4$) with edge length $a = 361.5\\text{ pm}$. Calculate the density of the metal in $\\text{g/cm}^3$. ($N_A = 6.022 \\times 10^{23}\\text{ mol}^{-1}$)',
    correctAnswer: 8.93,
    tolerance: 0.1,
    unit: 'g/cm³',
    explanation: '$a = 361.5\\text{ pm} = 3.615 \\times 10^{-8}\\text{ cm}$. $a^3 = 4.724 \\times 10^{-23}\\text{ cm}^3$. $\\rho = \\frac{Z \\cdot M}{a^3 \\cdot N_A} = \\frac{4 \times 63.55}{4.724 \\times 10^{-23} \times 6.022 \times 10^{23}} = \\frac{254.2}{28.448} = 8.935\\text{ g/cm}^3$.',
    hints: [
      'Convert edge length pm to cm: 361.5 pm = 3.615 x 10^-8 cm.',
      'Compute a^3 in cm^3.',
      'Apply density formula: rho = (Z * M) / (a^3 * N_A).'
    ]
  },
  {
    id: 'c11',
    nodeId: 'c12_chem_010',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'How do Schottky defects and Frenkel defects compare regarding crystal bulk density and ion radius size requirements?',
    options: [
      'Schottky defects decrease density (equal cation/anion vacancies); Frenkel defects preserve density (cation displaced to interstitial site with large radius difference $r_+ \ll r_-$)',
      'Schottky defects increase density; Frenkel defects decrease density',
      'Both defects decrease density by generating vacancies at face centers',
      'Frenkel defects occur only in highly covalent alkali halides like NaCl'
    ],
    correctIndex: 0,
    explanation: 'Schottky defect is a vacancy defect (missing stoichiometric cation-anion pairs), lowering bulk density. Frenkel defect is a dislocation defect where smaller cations ($r_+ \ll r_-$) shift to interstitial voids without changing overall mass or volume.',
    hints: [
      'Which defect leaves the crystal entirely vs shifting inside?',
      'Schottky loses mass -> density drops.',
      'Frenkel just relocates an ion internally -> density unchanged.'
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'c12',
    nodeId: 'c12_chem_005',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Calculation',
    question: 'In a face-centered cubic (FCC) unit cell of NaCl, if all atoms along ONE body diagonal are removed, how many total atoms remain per unit cell? (Original unit cell has 4 Na+ and 4 Cl-)',
    correctAnswer: 6.75,
    tolerance: 0.05,
    unit: 'atoms',
    explanation: 'A body diagonal passes through 2 corner atoms ($2 \times 1/8 = 0.25$ atom) and 1 central octahedral site ($1$ atom). Total removed $= 0.25 + 1.0 = 1.25$ atoms. Remaining $= (4 + 4) - 1.25 = 6.75$ atoms.',
    hints: [
      'A body diagonal connects opposite corners passing through the center.',
      'It passes through 2 corner atoms and 1 body-center atom.',
      'Original total atoms = 8. Removed = 2*(1/8) + 1 = 1.25. 8 - 1.25 = 6.75.'
    ]
  },
  {
    id: 'c13',
    nodeId: 'c12_chem_007',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'What is the limiting radius ratio $\\frac{r_+}{r_-}$ for an octahedral coordination geometry (coordination number 6, like NaCl)?',
    correctAnswer: 0.414,
    tolerance: 0.005,
    unit: 'ratio',
    explanation: 'For octahedral geometry, 6 anions surround a central cation touching in a square plane: $2r_- + 2r_+ = 2\sqrt{2}r_- \implies r_+ + r_- = \sqrt{2}r_- \implies \frac{r_+}{r_-} = \sqrt{2} - 1 = 1.414 - 1 = 0.414$.',
    hints: [
      'In a square planar cross section: 2*(r_+ + r_-) = diagonal = 2*sqrt(2)*r_-.',
      'r_+ / r_- = sqrt(2) - 1.',
      'sqrt(2) = 1.414, so ratio = 0.414.'
    ]
  },
  {
    id: 'c14',
    nodeId: 'c12_chem_002',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Distinction',
    question: 'Why are metallic solids malleable and ductile whereas ionic solids are hard and brittle?',
    options: [
      'Metallic bonding consists of non-directional delocalized electron sea sliding over cations; ionic planes slide causing like-charge repulsion and crystal cleavage',
      'Ionic bonds are weaker than metallic bonds, breaking under low shear stress',
      'Metallic crystals contain empty void spaces that collapse elastically',
      'Ionic crystals contain covalent network backbones that prevent deformation'
    ],
    correctIndex: 0,
    explanation: 'In metallic solids, positive metal ions are surrounded by a mobile sea of delocalized valence electrons. Shearing shifts plane of cations without disrupting non-directional metallic bonds. In ionic solids, shearing shifts planes such that like charges align ($+ \leftrightarrow +$), generating strong electrostatic repulsion that shatters the crystal.',
    hints: [
      'Think about what happens when ionic layers shift by 1 atomic position.',
      '+ aligns with +, - aligns with - causing repulsion.',
      'Metals have delocalized mobile electron sea.'
    ]
  },
  {
    id: 'c15',
    nodeId: 'c12_chem_009',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Quantitative Analysis',
    question: 'Iron crystallizes in a BCC structure ($Z=2$) with density $\\rho = 7.87\\text{ g/cm}^3$ and atomic mass $M = 55.85\\text{ g/mol}$. Calculate the atomic radius $r$ of iron in picometers (pm).',
    correctAnswer: 124.1,
    tolerance: 1.5,
    unit: 'pm',
    explanation: '$a^3 = \\frac{Z \\cdot M}{\\rho \\cdot N_A} = \\frac{2 \times 55.85}{7.87 \times 6.022 \times 10^{23}} = 2.357 \\times 10^{-23}\\text{ cm}^3 \implies a = 2.867 \\times 10^{-8}\\text{ cm} = 286.7\\text{ pm}$. For BCC, $r = \\frac{a\sqrt{3}}{4} = \\frac{286.7 \times 1.732}{4} = 124.1\\text{ pm}$.',
    hints: [
      'First calculate unit cell volume a^3 from density formula.',
      'Take cube root to find edge length a in cm, convert to pm.',
      'For BCC: r = a * sqrt(3) / 4.'
    ]
  },

  // ADVANCED TIER (7 Challenges)
  {
    id: 'c16',
    nodeId: 'c12_chem_010',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis & Complex Defects',
    question: 'Analysis of a non-stoichiometric nickel oxide crystal reveals the chemical formula $Ni_{0.98}O_{1.00}$. What percentage of the total nickel ions exist in the $Ni^{3+}$ oxidation state?',
    correctAnswer: 4.08,
    tolerance: 0.1,
    unit: '%',
    explanation: 'Let fraction of $Ni^{3+} = x$ and $Ni^{2+} = (0.98 - x)$. Charge neutrality: $3x + 2(0.98 - x) = 2.00 \implies 3x + 1.96 - 2x = 2.00 \implies x = 0.04$. Percentage of $Ni^{3+}$ out of total Nickel ions $= \\frac{0.04}{0.98} \times 100\\% = 4.08\\%$.',
    hints: [
      'Set total positive charge equal to total negative charge (2.00 for O2-).',
      '3*x + 2*(0.98 - x) = 2.00 => x = 0.04.',
      'Fraction of Ni3+ is 0.04 / 0.98 = 4.08%.'
    ]
  },
  {
    id: 'c17',
    nodeId: 'c12_chem_007',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Crystal Chemistry Synthesis',
    question: 'A compound formed by elements X (anions) and Y (cations) crystallizes in a CCP structure. Element X forms the CCP lattice. Cations Y occupy 50% of the tetrahedral voids and all octahedral voids. What is the empirical formula of the compound?',
    options: [
      '$Y_2X$',
      '$YX_2$',
      '$Y_3X_2$',
      '$YX$'
    ],
    correctIndex: 0,
    explanation: 'In CCP lattice, if anions X $= N$, then Octahedral voids $= N$ and Tetrahedral voids $= 2N$. Cations Y $= (50\\% \text{ of } 2N) + (100\\% \text{ of } N) = N + N = 2N$. Ratio $Y : X = 2N : N = 2 : 1$. Thus, empirical formula is $Y_2X$.',
    hints: [
      'Let number of X atoms = N.',
      'Tetrahedral voids = 2N, Octahedral voids = N.',
      'Y = 0.5*(2N) + 1.0*(N) = 2N. Ratio Y:X = 2:1.'
    ]
  },
  {
    id: 'c18',
    nodeId: 'c12_chem_008',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Bragg Diffraction Analysis',
    question: 'X-rays of wavelength $\lambda = 154\\text{ pm}$ ($1.54\\text{ Å}$) reflect from the (111) lattice planes of a cubic crystal at a first-order ($n=1$) Bragg angle $\theta = 19.2^\circ$. Calculate the interplanar spacing $d_{111}$ in picometers (pm). ($\sin(19.2^\circ) = 0.3289$)',
    correctAnswer: 234.1,
    tolerance: 1.0,
    unit: 'pm',
    explanation: 'Bragg\'s Law: $n\lambda = 2d \sin\theta \implies d = \frac{n\lambda}{2\sin\theta} = \frac{1 \times 154}{2 \times 0.3289} = \frac{154}{0.6578} = 234.11\\text{ pm}$.',
    hints: [
      'Apply Bragg Law: n * lambda = 2 * d * sin(theta).',
      'd = lambda / (2 * sin(19.2 deg)).',
      '154 / (2 * 0.3289) = 234.1 pm.'
    ]
  },
  {
    id: 'c19',
    nodeId: 'c12_chem_009',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Defect Density Doping Calculation',
    question: '$\text{CaCl}_2$ is doped into $\text{NaCl}$ solid solution to create cation vacancies. If $\text{NaCl}$ is doped with $10^{-3}\text{ mol}\\%$ of $\text{CaCl}_2$, calculate the concentration of cation vacancies per mole of $\text{NaCl}$ in scientific exponent ($N_{vac} = X \times 10^{18}\text{ mol}^{-1}$, enter $X$).',
    correctAnswer: 6.022,
    tolerance: 0.05,
    unit: 'x 10^18 mol^-1',
    explanation: 'Each $Ca^{2+}$ ion replaces two $Na^+$ ions, creating 1 cation vacancy. $10^{-3}\text{ mol}\\% = \frac{10^{-3}}{100} = 10^{-5}\text{ moles}$ of $Ca^{2+}$ per mole of $\text{NaCl}$. Number of vacancies $= 10^{-5} \times 6.022 \times 10^{23} = 6.022 \times 10^{18}\text{ mol}^{-1}$. Thus $X = 6.022$.',
    hints: [
      '1 Ca2+ creates 1 cation vacancy to preserve charge neutrality.',
      '10^-3 mol % = 10^-5 mole fraction.',
      'Vacancies = 10^-5 * 6.022 x 10^23 = 6.022 x 10^18.'
    ]
  },
  {
    id: 'c20',
    nodeId: 'c12_chem_003',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Crystallographic Geometry',
    question: 'Which of the following crystal systems possesses ALL THREE Bravais lattice types: Primitive (P), Body-Centred (I), Face-Centred (F), AND End-Centred (C)?',
    options: [
      'Orthorhombic System',
      'Cubic System',
      'Tetragonal System',
      'Monoclinic System'
    ],
    correctIndex: 0,
    explanation: 'The Orthorhombic system ($a \neq b \neq c, \alpha = \beta = \gamma = 90^\circ$) is the ONLY crystal system that exhibits all 4 unit cell variations: Primitive (P), Body-centred (I), Face-centred (F), and End-centred (C), contributing 4 of the 14 Bravais lattices.',
    hints: [
      'Which system has 4 Bravais lattices?',
      'All angles are 90 degrees, but all sides are unequal.',
      'Orthorhombic system has primitive, body, face, and end-centred lattices.'
    ]
  },
  {
    id: 'c21',
    nodeId: 'c12_chem_007',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Void Geometry Derivation',
    question: 'Calculate the minimum radius ratio $\frac{r_+}{r_-}$ required for a cation to fit perfectly into a Tetrahedral void without causing anion-anion overlap.',
    correctAnswer: 0.225,
    tolerance: 0.005,
    unit: 'ratio',
    explanation: 'In a regular tetrahedron, body diagonal of mini-cube containing tetrahedral void is $\frac{a\sqrt{3}}{2} = 2(r_+ + r_-)$. Corner sphere radius $r_- = \frac{a\sqrt{2}}{4}$. Solving $\frac{r_+ + r_-}{r_-} = \frac{\sqrt{3}}{\sqrt{2}} = \sqrt{1.5} \approx 1.2247 \implies \frac{r_+}{r_-} = 0.2247 \approx 0.225$.',
    hints: [
      'Tetrahedral void sits at center of a sub-cube of edge a/2.',
      'Sub-cube body diagonal = (a/2)*sqrt(3) = 2*(r_+ + r_-).',
      'Ratio r_+/r_- = sqrt(1.5) - 1 = 1.2247 - 1 = 0.225.'
    ]
  },
  {
    id: 'c22',
    nodeId: 'c12_chem_006',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: '3D Stacking Analysis',
    question: 'In HCP (Hexagonal Close Packing) versus CCP (Cubic Close Packing), what is the sequence of repeating atomic layers along the close-packed stacking direction?',
    options: [
      'HCP: ABABAB... ; CCP: ABCABCABC...',
      'HCP: ABCABC... ; CCP: ABABAB...',
      'HCP: AAAA... ; CCP: ABABAB...',
      'HCP: ABACABAC... ; CCP: AAAA...'
    ],
    correctIndex: 0,
    explanation: 'In HCP, spheres of the 3rd layer rest directly over spheres of the 1st layer (ABABAB...). In CCP/FCC, spheres of the 3rd layer rest in remaining offset depressions, and only the 4th layer repeats the 1st layer (ABCABC...).',
    hints: [
      'HCP has 2-layer repeating sequence.',
      'CCP/FCC has 3-layer repeating sequence.',
      'HCP = ABAB..., CCP = ABCABC...'
    ]
  }
];

// ==========================================
// CUSTOM SVG DIAGRAM COMPONENTS
// ==========================================

const UnitCellSVG: React.FC<{ type: 'SC' | 'BCC' | 'FCC'; showCutAway: boolean }> = ({ type, showCutAway }) => {
  return (
    <svg viewBox="0 0 320 280" className="w-full h-56 bg-slate-900 rounded-xl shadow-inner border border-slate-700/60">
      <defs>
        <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </radialGradient>
        <radialGradient id="centerGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="50%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#991b1b" />
        </radialGradient>
        <radialGradient id="faceGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="50%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#14532d" />
        </radialGradient>
      </defs>

      {/* Wireframe Cube */}
      <g stroke="#64748b" strokeWidth="2" fill="none" strokeDasharray="4 2">
        {/* Back face */}
        <polygon points="100,60 220,60 220,180 100,180" opacity="0.4" />
        {/* Connecting lines */}
        <line x1="60" y1="100" x2="100" y2="60" />
        <line x1="180" y1="100" x2="220" y2="60" />
        <line x1="180" y1="220" x2="220" y2="180" />
        <line x1="60" y1="220" x2="100" y2="180" />
      </g>
      {/* Front face wireframe */}
      <polygon points="60,100 180,100 180,220 60,220" fill="none" stroke="#94a3b8" strokeWidth="2.5" />

      {/* Body Center Atom (BCC) */}
      {type === 'BCC' && (
        <g>
          <circle cx="140" cy="140" r={showCutAway ? 28 : 22} fill="url(#centerGrad)" className="animate-pulse" />
          <text x="140" y="144" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">Center (1)</text>
        </g>
      )}

      {/* Face Center Atoms (FCC) */}
      {type === 'FCC' && (
        <g>
          {/* Top/Bottom/Side faces */}
          <circle cx="120" cy="100" r={showCutAway ? 20 : 16} fill="url(#faceGrad)" opacity="0.85" />
          <circle cx="120" cy="220" r={showCutAway ? 20 : 16} fill="url(#faceGrad)" opacity="0.85" />
          <circle cx="60" cy="160" r={showCutAway ? 20 : 16} fill="url(#faceGrad)" opacity="0.85" />
          <circle cx="180" cy="160" r={showCutAway ? 20 : 16} fill="url(#faceGrad)" opacity="0.85" />
          <circle cx="140" cy="160" r={showCutAway ? 22 : 18} fill="url(#faceGrad)" />
          <text x="140" y="164" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold">Face (1/2)</text>
        </g>
      )}

      {/* 8 Corner Atoms */}
      {[
        { x: 60, y: 100 }, { x: 180, y: 100 },
        { x: 180, y: 220 }, { x: 60, y: 220 },
        { x: 100, y: 60 }, { x: 220, y: 60 },
        { x: 220, y: 180 }, { x: 100, y: 180 }
      ].map((pt, idx) => (
        <g key={idx}>
          <circle cx={pt.x} cy={pt.y} r={showCutAway ? 16 : 14} fill="url(#sphereGrad)" />
          {showCutAway && (
            <text x={pt.x} y={pt.y + 3} fill="#ffffff" fontSize="8" textAnchor="middle">1/8</text>
          )}
        </g>
      ))}

      {/* Overlay info text */}
      <rect x="10" y="10" width="130" height="34" rx="6" fill="#0f172a" opacity="0.85" stroke="#334155" />
      <text x="18" y="26" fill="#38bdf8" fontSize="12" fontWeight="bold">
        {type === 'SC' ? 'Simple Cubic (Z=1)' : type === 'BCC' ? 'Body Centred (Z=2)' : 'Face Centred (Z=4)'}
      </text>
      <text x="18" y="38" fill="#94a3b8" fontSize="9">
        {type === 'SC' ? '8 × (1/8) = 1 atom' : type === 'BCC' ? '8(1/8) + 1 = 2 atoms' : '8(1/8) + 6(1/2) = 4 atoms'}
      </text>
    </svg>
  );
};

const DefectsDiagramSVG: React.FC<{ defectType: 'Schottky' | 'Frenkel' | 'FCenter' }> = ({ defectType }) => {
  return (
    <svg viewBox="0 0 340 220" className="w-full h-56 bg-slate-900 rounded-xl border border-slate-700/60 p-2">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="340" height="220" fill="url(#grid)" />

      <text x="170" y="22" fill="#e2e8f0" fontSize="13" fontWeight="bold" textAnchor="middle">
        {defectType === 'Schottky' && 'Schottky Defect (Equal Cation & Anion Vacancies)'}
        {defectType === 'Frenkel' && 'Frenkel Defect (Cation Dislocated to Interstitial Void)'}
        {defectType === 'FCenter' && 'Metal Excess Defect (Anion Vacancy Occupied by e⁻)'}
      </text>

      {/* Grid of Ions */}
      {[0, 1, 2, 3].map(row => (
        [0, 1, 2, 3, 4].map(col => {
          const cx = 50 + col * 60;
          const cy = 50 + row * 40;
          const isCation = (row + col) % 2 === 0;

          // Schottky missing checks:
          if (defectType === 'Schottky') {
            if (row === 1 && col === 1) { // missing cation
              return (
                <g key={`${row}-${col}`}>
                  <circle cx={cx} cy={cy} r="14" fill="none" stroke="#ef4444" strokeDasharray="3 3" strokeWidth="2" />
                  <text x={cx} y={cy + 4} fill="#ef4444" fontSize="10" textAnchor="middle" fontWeight="bold">V_Na⁺</text>
                </g>
              );
            }
            if (row === 2 && col === 3) { // missing anion
              return (
                <g key={`${row}-${col}`}>
                  <circle cx={cx} cy={cy} r="18" fill="none" stroke="#ef4444" strokeDasharray="3 3" strokeWidth="2" />
                  <text x={cx} y={cy + 4} fill="#ef4444" fontSize="10" textAnchor="middle" fontWeight="bold">V_Cl⁻</text>
                </g>
              );
            }
          }

          // Frenkel missing checks:
          if (defectType === 'Frenkel') {
            if (row === 1 && col === 1) { // cation moved
              return (
                <g key={`${row}-${col}`}>
                  <circle cx={cx} cy={cy} r="12" fill="none" stroke="#f59e0b" strokeDasharray="3 3" strokeWidth="2" />
                  <text x={cx} y={cy + 4} fill="#f59e0b" fontSize="9" textAnchor="middle">Empty</text>
                  {/* Draw Arrow to interstitial */}
                  <path d={`M ${cx} ${cy} Q ${cx + 30} ${cy + 10} ${cx + 30} ${cy + 25}`} stroke="#f59e0b" fill="none" strokeWidth="2" markerEnd="url(#arrow)" />
                  <circle cx={cx + 30} cy={cy + 25} r="11" fill="#eab308" className="animate-pulse" />
                  <text x={cx + 30} y={cy + 29} fill="#000" fontSize="8" textAnchor="middle" fontWeight="bold">Zn²⁺</text>
                </g>
              );
            }
          }

          // F-Center checks:
          if (defectType === 'FCenter') {
            if (row === 2 && col === 2) { // anion replaced by electron
              return (
                <g key={`${row}-${col}`}>
                  <circle cx={cx} cy={cy} r="16" fill="#facc15" opacity="0.4" className="animate-ping" />
                  <circle cx={cx} cy={cy} r="16" fill="#ca8a04" stroke="#fef08a" strokeWidth="2" />
                  <text x={cx} y={cy + 4} fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold">e⁻ (F)</text>
                </g>
              );
            }
          }

          return (
            <g key={`${row}-${col}`}>
              <circle
                cx={cx}
                cy={cy}
                r={isCation ? 12 : 18}
                fill={isCation ? '#3b82f6' : '#10b981'}
                stroke="#1e293b"
                strokeWidth="1.5"
              />
              <text x={cx} y={cy + 4} fill="#ffffff" fontSize={isCation ? '10' : '11'} textAnchor="middle" fontWeight="bold">
                {isCation ? '+' : '-'}
              </text>
            </g>
          );
        })
      ))}

      <g transform="translate(20, 195)">
        <circle cx="10" cy="0" r="7" fill="#3b82f6" />
        <text x="22" y="4" fill="#94a3b8" fontSize="10">Cation (+)</text>
        <circle cx="100" cy="0" r="10" fill="#10b981" />
        <text x="115" y="4" fill="#94a3b8" fontSize="10">Anion (-)</text>
        {defectType === 'Schottky' && <text x="210" y="4" fill="#ef4444" fontSize="10">Density Drops (ρ_exp &lt; ρ_theo)</text>}
        {defectType === 'Frenkel' && <text x="210" y="4" fill="#eab308" fontSize="10">Density Unchanged (ρ_exp = ρ_theo)</text>}
        {defectType === 'FCenter' && <text x="210" y="4" fill="#facc15" fontSize="10">Paramagnetic & Colored</text>}
      </g>
    </svg>
  );
};

const VoidsDiagramSVG: React.FC<{ voidType: 'Tetrahedral' | 'Octahedral' }> = ({ voidType }) => {
  return (
    <svg viewBox="0 0 340 220" className="w-full h-56 bg-slate-900 rounded-xl border border-slate-700/60 p-2">
      <defs>
        <radialGradient id="sphereA" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#3730a3" />
        </radialGradient>
        <radialGradient id="sphereB" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#6b21a8" />
        </radialGradient>
      </defs>

      <text x="170" y="24" fill="#e2e8f0" fontSize="13" fontWeight="bold" textAnchor="middle">
        {voidType === 'Tetrahedral' ? 'Tetrahedral Void (Coordination No. = 4)' : 'Octahedral Void (Coordination No. = 6)'}
      </text>

      {voidType === 'Tetrahedral' ? (
        <g transform="translate(50, 20)">
          {/* Base 3 touching spheres */}
          <circle cx="80" cy="130" r="32" fill="url(#sphereA)" stroke="#1e1b4b" strokeWidth="2" />
          <circle cx="140" cy="130" r="32" fill="url(#sphereA)" stroke="#1e1b4b" strokeWidth="2" />
          <circle cx="110" cy="80" r="32" fill="url(#sphereA)" stroke="#1e1b4b" strokeWidth="2" />
          {/* Interstitial void site highlighted */}
          <circle cx="110" cy="112" r="14" fill="#ef4444" stroke="#fca5a5" strokeWidth="2" className="animate-ping" opacity="0.5" />
          <circle cx="110" cy="112" r="10" fill="#dc2626" stroke="#fca5a5" strokeWidth="2" />
          {/* Top 4th apex sphere */}
          <circle cx="110" cy="110" r="32" fill="url(#sphereB)" stroke="#4c1d95" strokeWidth="2" opacity="0.75" />
          <text x="110" y="114" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold">T-Void</text>

          {/* Key metadata */}
          <g transform="translate(170, 40)">
            <text x="0" y="20" fill="#a5b4fc" fontSize="11" fontWeight="bold">• Formed by 4 spheres</text>
            <text x="0" y="40" fill="#a5b4fc" fontSize="11">• Total per lattice = 2N</text>
            <text x="0" y="60" fill="#a5b4fc" fontSize="11">• Radius ratio r+/r- = 0.225</text>
            <text x="0" y="80" fill="#a5b4fc" fontSize="11">• Location: Body diagonals</text>
          </g>
        </g>
      ) : (
        <g transform="translate(50, 20)">
          {/* Bottom triangle 3 spheres */}
          <circle cx="70" cy="80" r="30" fill="url(#sphereA)" stroke="#1e1b4b" strokeWidth="2" />
          <circle cx="130" cy="80" r="30" fill="url(#sphereA)" stroke="#1e1b4b" strokeWidth="2" />
          <circle cx="100" cy="135" r="30" fill="url(#sphereA)" stroke="#1e1b4b" strokeWidth="2" />

          {/* Central Void */}
          <circle cx="100" cy="98" r="16" fill="#10b981" stroke="#6ee7b7" strokeWidth="2" className="animate-pulse" />
          <text x="100" y="102" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold">O-Void</text>

          {/* Top triangle 3 spheres inverted */}
          <circle cx="100" cy="60" r="30" fill="url(#sphereB)" stroke="#4c1d95" opacity="0.7" strokeWidth="2" />
          <circle cx="70" cy="115" r="30" fill="url(#sphereB)" stroke="#4c1d95" opacity="0.7" strokeWidth="2" />
          <circle cx="130" cy="115" r="30" fill="url(#sphereB)" stroke="#4c1d95" opacity="0.7" strokeWidth="2" />

          {/* Key metadata */}
          <g transform="translate(170, 40)">
            <text x="0" y="20" fill="#6ee7b7" fontSize="11" fontWeight="bold">• Formed by 6 spheres</text>
            <text x="0" y="40" fill="#6ee7b7" fontSize="11">• Total per lattice = N</text>
            <text x="0" y="60" fill="#6ee7b7" fontSize="11">• Radius ratio r+/r- = 0.414</text>
            <text x="0" y="80" fill="#6ee7b7" fontSize="11">• Location: Center & Edges</text>
          </g>
        </g>
      )}
    </svg>
  );
};

// ==========================================
// MAIN INTERACTIVE SIMULATION COMPONENT
// ==========================================

export default function C12_ChemistrySolidstatecharacteristicsSim({
  onComplete
}: {
  onComplete?: (score: number) => void;
}) {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [currentExplorationStep, setCurrentExplorationStep] = useState<number>(0);

  // Discovery Question State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Prediction & Observation Answers State
  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);

  // Challenges Engine State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [userAnswerIndex, setUserAnswerIndex] = useState<number | null>(null);
  const [userNumericInput, setUserNumericInput] = useState<string>('');
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Interactive Lab Workbench Controls
  // Lab 1: Anisotropy
  const [selectedAxis, setSelectedAxis] = useState<'x' | 'y' | 'z'>('x');
  const [solidType, setSolidType] = useState<'crystalline' | 'amorphous'>('crystalline');
  // Lab 2: Bravais Builder
  const [edgeA, setEdgeA] = useState<number>(200);
  const [edgeB, setEdgeB] = useState<number>(200);
  const [edgeC, setEdgeC] = useState<number>(200);
  const [angleAlpha, setAngleAlpha] = useState<number>(90);
  const [angleBeta, setAngleBeta] = useState<number>(90);
  const [angleGamma, setAngleGamma] = useState<number>(90);
  // Lab 3: Unit Cell Fractional & Density Calculator
  const [cellType, setCellType] = useState<'SC' | 'BCC' | 'FCC'>('FCC');
  const [atomicMass, setAtomicMass] = useState<number>(63.55); // Cu
  const [edgeLengthPm, setEdgeLengthPm] = useState<number>(361.5);
  const [showCutAway, setShowCutAway] = useState<boolean>(true);
  // Lab 4: Voids Explorer
  const [voidView, setVoidView] = useState<'Tetrahedral' | 'Octahedral'>('Tetrahedral');
  const [numSpheresN, setNumSpheresN] = useState<number>(4);
  // Lab 5: Defects Injector
  const [defectType, setDefectType] = useState<'Schottky' | 'Frenkel' | 'FCenter'>('Schottky');

  // SRS & BKT Tracking States
  const [bktStates, setBktStates] = useState<BKTMap>(() => {
    const initial: BKTMap = {};
    ALL_NODE_IDS.forEach(nodeId => {
      initial[nodeId] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<{ [id: string]: SRSItem }>(() => {
    const initial: { [id: string]: SRSItem } = {};
    CHALLENGES.forEach(ch => {
      initial[ch.id] = createReviewItem(ch.id);
    });
    return initial;
  });

  // Audio / Visual Feedback Triggers
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');

  // Auto-hint Timer Ref
  const hintTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Speak initial intro once
  useEffect(() => {
    speechManager.speak('Welcome to the Solid State Chemistry Simulation. Explore crystal lattices, unit cell packing, and defects.');
  }, []);

  // Timer for auto-hinting after 10s of inactivity on challenges
  useEffect(() => {
    if (activeTab === 'challenges' && !challengeSubmitted) {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
      hintTimerRef.current = setTimeout(() => {
        const currentCh = CHALLENGES[currentChallengeIndex];
        if (currentCh && currentCh.hints.length > 0) {
          setCurrentHint(`Hint: ${currentCh.hints[0]}`);
          setShowHint(true);
          audioManager.play('hint');
        }
      }, 10000);
    }
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, [activeTab, currentChallengeIndex, challengeSubmitted]);

  // Derived Density Calculation for Lab 3
  const computedDensity = useMemo(() => {
    const Z = cellType === 'SC' ? 1 : cellType === 'BCC' ? 2 : 4;
    const aCm = edgeLengthPm * 1e-8;
    const aCubed = Math.pow(aCm, 3);
    const NA = 6.022e23;
    const rho = (Z * atomicMass) / (aCubed * NA);
    return rho.toFixed(3);
  }, [cellType, atomicMass, edgeLengthPm]);

  // Derived Packing Efficiency for Lab 3
  const computedPackingEfficiency = useMemo(() => {
    if (cellType === 'SC') return '52.36%';
    if (cellType === 'BCC') return '68.02%';
    return '74.05%';
  }, [cellType]);

  // Atomic Radius Formula for Lab 3
  const computedRadius = useMemo(() => {
    if (cellType === 'SC') return (edgeLengthPm / 2).toFixed(1);
    if (cellType === 'BCC') return ((edgeLengthPm * Math.sqrt(3)) / 4).toFixed(1);
    return ((edgeLengthPm / (2 * Math.sqrt(2)))).toFixed(1);
  }, [cellType, edgeLengthPm]);

  // Dynamic Bravais System Detector for Lab 2
  const identifiedSystem = useMemo(() => {
    const eqEdges = edgeA === edgeB && edgeB === edgeC;
    const eqTwoEdges = (edgeA === edgeB && edgeB !== edgeC) || (edgeA === edgeC && strokeB(edgeB, edgeC));
    const eqAngles = angleAlpha === 90 && angleBeta === 90 && angleGamma === 90;

    function strokeB(b: number, c: number) { return b !== c; }

    if (eqEdges && eqAngles) return 'Cubic System (a = b = c, α = β = γ = 90°)';
    if (eqTwoEdges && eqAngles) return 'Tetragonal System (a = b ≠ c, α = β = γ = 90°)';
    if (!eqEdges && eqAngles) return 'Orthorhombic System (a ≠ b ≠ c, α = β = γ = 90°)';
    if (eqTwoEdges && angleAlpha === 90 && angleBeta === 90 && angleGamma === 120) return 'Hexagonal System (a = b ≠ c, α = β = 90°, γ = 120°)';
    if (eqEdges && angleAlpha === angleBeta && angleBeta === angleGamma && angleAlpha !== 90) return 'Rhombohedral System (a = b = c, α = β = γ ≠ 90°)';
    if (!eqEdges && angleAlpha === 90 && angleGamma === 90 && angleBeta !== 90) return 'Monoclinic System (a ≠ b ≠ c, α = γ = 90°, β ≠ 90°)';
    return 'Triclinic System (a ≠ b ≠ c, α ≠ β ≠ γ ≠ 90°)';
  }, [edgeA, edgeB, edgeC, angleAlpha, angleBeta, angleGamma]);

  // Handlers
  const handleDiscoverySubmit = (idx: number) => {
    setDiscoverySelected(idx);
    setDiscoverySubmitted(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct! Crystalline solids have long-range periodic spatial order, whereas amorphous solids lack periodic order.');
      setShowSparkle(true);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Review the hint on spatial order and long-range periodicity.');
    }
  };

  const handleChallengeAnswerSelect = (idx: number) => {
    setUserAnswerIndex(idx);
    audioManager.play('tap');
  };

  const handleChallengeSubmit = () => {
    if (challengeSubmitted) return;
    const ch = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;

    if (ch.type === 'numeric') {
      const val = parseFloat(userNumericInput);
      if (!isNaN(val) && ch.correctAnswer !== undefined && ch.tolerance !== undefined) {
        isCorrect = Math.abs(val - ch.correctAnswer) <= ch.tolerance;
      }
    } else {
      isCorrect = userAnswerIndex === ch.correctIndex;
    }

    setChallengeSubmitted(true);

    // Update BKT State
    const currentBkt = bktStates[ch.nodeId] || createBKTState();
    const updatedBkt = bktUpdate(currentBkt, isCorrect);
    setBktStates(prev => ({ ...prev, [ch.nodeId]: updatedBkt }));

    // Update SRS State
    const currentSrs = srsItems[ch.id] || createReviewItem(ch.id);
    const updatedSrs = sm2Update(currentSrs, isCorrect ? 5 : 1);
    setSrsItems(prev => ({ ...prev, [ch.id]: updatedSrs }));

    if (isCorrect) {
      setScore(prev => prev + 1);
      audioManager.play('drop-correct');
      audioManager.play('chime');
      speechManager.speak('Excellent calculation! That is correct.');
      setShowSparkle(true);
      setShowSuccessBanner(true);
      setTimeout(() => setShowSuccessBanner(false), 2500);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('That answer is incorrect. Review the step-by-step solution below.');
    }
  };

  const handleNextChallenge = () => {
    setUserAnswerIndex(null);
    setUserNumericInput('');
    setChallengeSubmitted(false);
    setShowHint(false);

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      audioManager.play('whoosh');
    } else {
      // Complete Simulation
      audioManager.play('celebration');
      setShowConfetti(true);
      speechManager.speak('Congratulations! You have completed all solid state chemistry challenges.');
      const finalScorePct = Math.round((score / CHALLENGES.length) * 100);
      recordGameScore('C12_SolidState', finalScorePct);
      if (onComplete) onComplete(finalScorePct);
      setActiveTab('summary');
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-3 md:p-6 flex flex-col gap-6">
      {/* HEADER BAR */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-xl gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-gold-500 to-gold-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-gold-500/30">
            3D
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-gold-950 text-gold-400 border border-gold-800">
                ISC Class 12 Chemistry
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                Nodes c12_chem_001 - 010
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-0.5">
              Solid State Characteristics & Crystallography Sim
            </h1>
          </div>
        </div>

        {/* TAB NAVIGATION BUTTONS */}
        <nav className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 w-full md:w-auto overflow-x-auto">
          <button
            onClick={() => { setActiveTab('discovery'); audioManager.play('tap'); }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'discovery'
                ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            🔍 Discovery Lab
          </button>
          <button
            onClick={() => { setActiveTab('lab'); audioManager.play('tap'); }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'lab'
                ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            🧪 Interactive Workbench
          </button>
          <button
            onClick={() => { setActiveTab('challenges'); audioManager.play('tap'); }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'challenges'
                ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            🏆 Challenges ({score}/{CHALLENGES.length})
          </button>
          <button
            onClick={() => { setActiveTab('summary'); audioManager.play('tap'); }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'summary'
                ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            📊 Mastery & Extension
          </button>
        </nav>
      </header>

      {/* TAB 1: DISCOVERY & NARRATIVE SCENARIO */}
      {activeTab === 'discovery' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Narrative Scenario */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-gold-950 text-gold-400 border border-gold-800 text-xs font-semibold uppercase tracking-wider mb-3">
                Research Scenario
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-sm leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                {SCENARIO.context}
              </p>
            </div>

            {/* Key Node Syllabus Badges */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                ISC Target Learning Objectives
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs border border-slate-700">
                  Amorphous vs Crystalline Solids
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs border border-slate-700">
                  7 Systems & 14 Bravais Lattices
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs border border-slate-700">
                  Atoms per Unit Cell (Z)
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs border border-slate-700">
                  Packing Efficiency (74.05% vs 68.02%)
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs border border-slate-700">
                  Schottky vs Frenkel Defects
                </span>
              </div>
            </div>
          </div>

          {/* Counterintuitive Discovery Question */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-gold-950 text-gold-400 border border-gold-800 text-xs font-semibold uppercase tracking-wider mb-3">
                Preconception Diagnostic
              </div>
              <h3 className="text-base font-semibold text-slate-100 mb-4">
                {DISCOVERY_QUESTION.question}
              </h3>

              <div className="space-y-3">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`w-full text-left p-3.5 rounded-xl text-xs md:text-sm font-medium transition-all border ${
                      discoverySelected === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-600 text-emerald-200'
                          : 'bg-rose-950/80 border-rose-600 text-rose-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-400 font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {discoverySubmitted && (
              <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-gold-900/60 text-xs text-gold-300">
                <span className="font-bold text-gold-400 block mb-1">Crystallographic Insight:</span>
                {DISCOVERY_QUESTION.hintAfter}
              </div>
            )}
          </div>

          {/* MANDATORY PREDICTION QUESTIONS COMPONENT */}
          <div className="lg:col-span-12 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>🔮</span> Hypothesis Prediction Lab (PREDICTION_QUESTIONS)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PREDICTION_QUESTIONS.map((pq, pIdx) => (
                <div key={pIdx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block mb-2">
                      Prediction #{pIdx + 1} ({pq.nodeId})
                    </span>
                    <p className="text-sm text-slate-200 font-medium mb-4">{pq.question}</p>
                    <div className="space-y-2 mb-4">
                      {pq.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            const copy = [...predictionAnswers];
                            copy[pIdx] = oIdx;
                            setPredictionAnswers(copy);
                            if (oIdx === pq.correctIndex) {
                              audioManager.play('drop-correct');
                              speechManager.speak('Hypothesis validated!');
                            } else {
                              audioManager.play('drop-wrong');
                            }
                          }}
                          className={`w-full text-left p-3 rounded-lg text-xs transition-all border ${
                            predictionAnswers[pIdx] === oIdx
                              ? oIdx === pq.correctIndex
                                ? 'bg-emerald-950 border-emerald-600 text-emerald-200'
                                : 'bg-rose-950 border-rose-600 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <span className="font-bold text-slate-300">Verification Protocol:</span> {pq.verifyInstruction}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE EXPERIMENTAL LAB WORKBENCH */}
      {activeTab === 'lab' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Lab Selection Sidebar */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col gap-3">
            <h2 className="text-base font-bold text-white px-2">Interactive Exploration Labs</h2>
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentExplorationStep(idx);
                  audioManager.play('tap');
                  speechManager.speak(`Loaded ${step.title}`);
                }}
                className={`w-full text-left p-3.5 rounded-xl text-xs md:text-sm font-semibold transition-all border ${
                  currentExplorationStep === idx
                    ? 'bg-gradient-to-r from-gold-950 to-gold-950 border-gold-500 text-white shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gold-400 font-mono text-xs">Step 0{idx + 1}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                    {step.nodeId}
                  </span>
                </div>
                <div className="font-bold text-slate-200">{step.title}</div>
              </button>
            ))}

            <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h3 className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-2">
                Active Step Protocol
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {EXPLORATION_STEPS[currentExplorationStep].instruction}
              </p>
            </div>
          </div>

          {/* Active Lab Workbench Display */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
            {/* LAB 1: ANISOTROPY & MELTING */}
            {currentExplorationStep === 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h3 className="text-lg font-bold text-white">Anisotropy vs Isotropy Property Scanner</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSolidType('crystalline')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        solidType === 'crystalline' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Quartz Crystal (Crystalline)
                    </button>
                    <button
                      onClick={() => setSolidType('amorphous')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        solidType === 'amorphous' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Quartz Glass (Amorphous)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(['x', 'y', 'z'] as const).map(axis => (
                    <button
                      key={axis}
                      onClick={() => { setSelectedAxis(axis); audioManager.play('pop'); }}
                      className={`p-4 rounded-xl border text-center transition-all ${
                        selectedAxis === axis
                          ? 'bg-gold-950/80 border-gold-500 text-white shadow-lg'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs text-slate-400 font-mono uppercase mb-1">Crystallographic Direction</div>
                      <div className="text-xl font-bold">{axis.toUpperCase()}-Axis</div>
                    </button>
                  ))}
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Refractive Index ($n$):</span>
                    <span className="font-mono font-bold text-gold-400">
                      {solidType === 'crystalline'
                        ? selectedAxis === 'x' ? '1.544 (n_o)' : selectedAxis === 'y' ? '1.544 (n_o)' : '1.553 (n_e)'
                        : '1.458 (Isotropic in all directions)'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Thermal Expansion Coefficient ($\alpha$):</span>
                    <span className="font-mono font-bold text-gold-400">
                      {solidType === 'crystalline'
                        ? selectedAxis === 'z' ? '7.1 × 10⁻⁶ /K' : '13.2 × 10⁻⁶ /K'
                        : '0.55 × 10⁻⁶ /K (Uniform)'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Melting Point Characteristics:</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {solidType === 'crystalline' ? 'Sharp @ 1670 °C (ΔH_fusion constant)' : 'Softens over 1400 °C - 1700 °C'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 2: BRAVAIS BUILDER */}
            {currentExplorationStep === 1 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">7 Crystal Systems Parameter Modeler</h3>
                    <p className="text-xs text-gold-400 font-semibold">{identifiedSystem}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Sliders */}
                  <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Edge Length a:</span>
                        <span className="font-mono text-gold-400">{edgeA} pm</span>
                      </div>
                      <input
                        type="range" min="150" max="300" value={edgeA}
                        onChange={e => setEdgeA(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Edge Length b:</span>
                        <span className="font-mono text-gold-400">{edgeB} pm</span>
                      </div>
                      <input
                        type="range" min="150" max="300" value={edgeB}
                        onChange={e => setEdgeB(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Edge Length c:</span>
                        <span className="font-mono text-gold-400">{edgeC} pm</span>
                      </div>
                      <input
                        type="range" min="150" max="300" value={edgeC}
                        onChange={e => setEdgeC(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Angle α (between b & c):</span>
                        <span className="font-mono text-gold-400">{angleAlpha}°</span>
                      </div>
                      <input
                        type="range" min="60" max="120" value={angleAlpha}
                        onChange={e => setAngleAlpha(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Angle β (between a & c):</span>
                        <span className="font-mono text-gold-400">{angleBeta}°</span>
                      </div>
                      <input
                        type="range" min="60" max="120" value={angleBeta}
                        onChange={e => setAngleBeta(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Angle γ (between a & b):</span>
                        <span className="font-mono text-gold-400">{angleGamma}°</span>
                      </div>
                      <input
                        type="range" min="60" max="120" value={angleGamma}
                        onChange={e => setAngleGamma(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => { setEdgeA(200); setEdgeB(200); setEdgeC(200); setAngleAlpha(90); setAngleBeta(90); setAngleGamma(90); }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold hover:bg-slate-700"
                  >
                    Preset: Cubic
                  </button>
                  <button
                    onClick={() => { setEdgeA(200); setEdgeB(200); setEdgeC(280); setAngleAlpha(90); setAngleBeta(90); setAngleGamma(90); }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold hover:bg-slate-700"
                  >
                    Preset: Tetragonal
                  </button>
                  <button
                    onClick={() => { setEdgeA(180); setEdgeB(220); setEdgeC(280); setAngleAlpha(90); setAngleBeta(90); setAngleGamma(90); }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold hover:bg-slate-700"
                  >
                    Preset: Orthorhombic
                  </button>
                  <button
                    onClick={() => { setEdgeA(200); setEdgeB(200); setEdgeC(260); setAngleAlpha(90); setAngleBeta(90); setAngleGamma(120); }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold hover:bg-slate-700"
                  >
                    Preset: Hexagonal
                  </button>
                </div>
              </div>
            )}

            {/* LAB 3: UNIT CELL ATOMS & DENSITY CALCULATOR */}
            {currentExplorationStep === 2 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <h3 className="text-lg font-bold text-white">Unit Cell Slicing & Densitometry Lab</h3>
                  <button
                    onClick={() => setShowCutAway(!showCutAway)}
                    className="px-3 py-1.5 rounded-lg bg-gold-950 text-gold-400 border border-gold-800 text-xs font-semibold"
                  >
                    {showCutAway ? 'Hide Cut-away Slices' : 'Show Cut-away Slices'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <UnitCellSVG type={cellType} showCutAway={showCutAway} />

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">Select Unit Cell Geometry:</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['SC', 'BCC', 'FCC'] as const).map(t => (
                          <button
                            key={t}
                            onClick={() => { setCellType(t); audioManager.play('pop'); }}
                            className={`py-2 rounded-lg text-xs font-bold transition-all border ${
                              cellType === t
                                ? 'bg-gold-600 border-gold-400 text-white'
                                : 'bg-slate-950 border-slate-800 text-slate-400'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Molar Mass (M):</span>
                        <span className="font-mono text-gold-400">{atomicMass} g/mol</span>
                      </div>
                      <input
                        type="range" min="10" max="200" step="0.5" value={atomicMass}
                        onChange={e => setAtomicMass(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Edge Length (a):</span>
                        <span className="font-mono text-gold-400">{edgeLengthPm} pm</span>
                      </div>
                      <input
                        type="range" min="200" max="600" step="1" value={edgeLengthPm}
                        onChange={e => setEdgeLengthPm(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Calculation Outputs */}
                <div className="grid grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">Total Atoms (Z)</span>
                    <span className="text-xl font-bold font-mono text-gold-400">
                      {cellType === 'SC' ? 1 : cellType === 'BCC' ? 2 : 4}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">Packing Fraction</span>
                    <span className="text-xl font-bold font-mono text-emerald-400">{computedPackingEfficiency}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">Calculated Density (ρ)</span>
                    <span className="text-xl font-bold font-mono text-amber-400">{computedDensity} g/cm³</span>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 4: VOIDS EXPLORER */}
            {currentExplorationStep === 3 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <h3 className="text-lg font-bold text-white">Interstitial Void Map & Radius Ratios</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setVoidView('Tetrahedral')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        voidView === 'Tetrahedral' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Tetrahedral (T-Void)
                    </button>
                    <button
                      onClick={() => setVoidView('Octahedral')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        voidView === 'Octahedral' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Octahedral (O-Void)
                    </button>
                  </div>
                </div>

                <VoidsDiagramSVG voidType={voidView} />

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-400">Close-Packed Spheres Count (N):</span>
                    <span className="font-mono text-gold-400 font-bold">{numSpheresN}</span>
                  </div>
                  <input
                    type="range" min="1" max="12" value={numSpheresN}
                    onChange={e => setNumSpheresN(Number(e.target.value))}
                    className="w-full accent-gold-500 mb-4"
                  />
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div className="bg-slate-900 p-3 rounded-lg border border-gold-950">
                      <span className="text-gold-400 block font-bold mb-1">Tetrahedral Voids = 2N</span>
                      <span className="text-xl font-bold text-white">{2 * numSpheresN}</span>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-lg border border-emerald-950">
                      <span className="text-emerald-400 block font-bold mb-1">Octahedral Voids = N</span>
                      <span className="text-xl font-bold text-white">{numSpheresN}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 5: POINT DEFECT SIMULATOR */}
            {currentExplorationStep === 4 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <h3 className="text-lg font-bold text-white">Crystal Point Defect Injector</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDefectType('Schottky')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        defectType === 'Schottky' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Schottky Pair
                    </button>
                    <button
                      onClick={() => setDefectType('Frenkel')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        defectType === 'Frenkel' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Frenkel Interstitial
                    </button>
                    <button
                      onClick={() => setDefectType('FCenter')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        defectType === 'FCenter' ? 'bg-yellow-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      F-Center (Farbe)
                    </button>
                  </div>
                </div>

                <DefectsDiagramSVG defectType={defectType} />
              </div>
            )}
          </div>

          {/* MANDATORY OBSERVATION QUESTIONS COMPONENT */}
          <div className="lg:col-span-12 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>👁️</span> Empirical Observation Queries (OBSERVATION_QUESTIONS)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {OBSERVATION_QUESTIONS.map((oq, oIdx) => (
                <div key={oIdx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block mb-2">
                      Observation Probe #{oIdx + 1} ({oq.nodeId})
                    </span>
                    <p className="text-sm text-slate-200 font-medium mb-4">{oq.question}</p>
                    <div className="space-y-2">
                      {oq.observableOptions.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => {
                            const copy = [...observationAnswers];
                            copy[oIdx] = optIdx;
                            setObservationAnswers(copy);
                            if (optIdx === oq.correctIndex) {
                              audioManager.play('drop-correct');
                              speechManager.speak('Observation verified!');
                            } else {
                              audioManager.play('drop-wrong');
                            }
                          }}
                          className={`w-full text-left p-3 rounded-lg text-xs transition-all border ${
                            observationAnswers[oIdx] === optIdx
                              ? optIdx === oq.correctIndex
                                ? 'bg-emerald-950 border-emerald-600 text-emerald-200'
                                : 'bg-rose-950 border-rose-600 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 22+ PROGRESSIVE MASTER CHALLENGES */}
      {activeTab === 'challenges' && (
        <div className="max-w-4xl mx-auto w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          {/* Progress Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${
                  CHALLENGES[currentChallengeIndex].difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                    : CHALLENGES[currentChallengeIndex].difficulty === 'standard'
                    ? 'bg-amber-950 text-amber-400 border-amber-800'
                    : 'bg-purple-950 text-purple-400 border-purple-800'
                }`}>
                  {CHALLENGES[currentChallengeIndex].difficulty} Tier
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <span className="text-xs text-slate-500">
                  [{CHALLENGES[currentChallengeIndex].nodeId}]
                </span>
              </div>
              <h2 className="text-lg font-bold text-white mt-1">
                {CHALLENGES[currentChallengeIndex].competencyLevel}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right font-mono">
                <div className="text-xs text-slate-400">Current Score</div>
                <div className="text-xl font-bold text-gold-400">{score} / {CHALLENGES.length}</div>
              </div>
            </div>
          </div>

          {/* Question Text */}
          <div className="text-base md:text-lg font-semibold text-slate-100 leading-relaxed bg-slate-950 p-5 rounded-xl border border-slate-800">
            {CHALLENGES[currentChallengeIndex].question}
          </div>

          {/* Interactive Answer Input */}
          {CHALLENGES[currentChallengeIndex].type === 'numeric' ? (
            <div className="space-y-4 bg-slate-950 p-6 rounded-xl border border-slate-800">
              <label className="text-xs font-bold text-slate-400 block uppercase tracking-wider">
                Enter Quantitative Answer ({CHALLENGES[currentChallengeIndex].unit}):
              </label>
              <div className="flex gap-4">
                <input
                  type="number"
                  step="any"
                  value={userNumericInput}
                  onChange={e => setUserNumericInput(e.target.value)}
                  disabled={challengeSubmitted}
                  placeholder="e.g. 68.02"
                  className="bg-slate-900 border border-slate-700 text-white font-mono text-lg px-4 py-3 rounded-xl focus:outline-none focus:border-gold-500 flex-1"
                />
                <button
                  onClick={handleChallengeSubmit}
                  disabled={challengeSubmitted || !userNumericInput}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold text-sm shadow-md disabled:opacity-50"
                >
                  Submit Answer
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {CHALLENGES[currentChallengeIndex].options?.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChallengeAnswerSelect(idx)}
                  disabled={challengeSubmitted}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all border flex items-center justify-between ${
                    userAnswerIndex === idx
                      ? 'bg-gold-950 border-gold-500 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-400 font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </button>
              ))}

              {!challengeSubmitted && (
                <button
                  onClick={handleChallengeSubmit}
                  disabled={userAnswerIndex === null}
                  className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold text-sm shadow-md disabled:opacity-50"
                >
                  Confirm & Submit Choice
                </button>
              )}
            </div>
          )}

          {/* Feedback & Explanation Section */}
          {challengeSubmitted && (
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {userAnswerIndex === CHALLENGES[currentChallengeIndex].correctIndex ||
                   (CHALLENGES[currentChallengeIndex].type === 'numeric' && Math.abs(parseFloat(userNumericInput) - (CHALLENGES[currentChallengeIndex].correctAnswer || 0)) <= (CHALLENGES[currentChallengeIndex].tolerance || 0))
                    ? '✅ Correct Solution!'
                    : '❌ Incorrect Answer'}
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {CHALLENGES[currentChallengeIndex].explanation}
              </p>

              <button
                onClick={handleNextChallenge}
                className="w-full mt-2 py-3 rounded-xl bg-gold-600 text-white font-bold text-sm hover:bg-gold-500 shadow-md"
              >
                {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete All Challenges 🏆'}
              </button>
            </div>
          )}

          {/* Hint Overlay */}
          <HintBubble show={showHint} text={currentHint} />
        </div>
      )}

      {/* TAB 4: MASTERY BREAKDOWN & REAL-WORLD EXTENSION */}
      {activeTab === 'summary' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Real-World Activity Card */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
                Industrial Application Case Study
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">{REAL_WORLD_ACTIVITY.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Analytical Quality Assurance Steps:</h3>
                {REAL_WORLD_ACTIVITY.steps.map((st, idx) => (
                  <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-gold-950 text-gold-400 border border-gold-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{st}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BKT & SRS Skill Mastery Matrix */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-white mb-2">Node Mastery & SRS Breakdown</h2>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {ALL_NODE_IDS.map(nodeId => {
                const bkt = bktStates[nodeId];
                const pKnown = bkt ? bkt.pKnown : 0.1;
                const level = getMasteryLevel(pKnown);

                return (
                  <div key={nodeId} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-gold-400 font-bold">{nodeId}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        level === 'mastered' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        level === 'developing' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {level} ({Math.round(pKnown * 100)}%)
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-gold-500 to-emerald-400 h-full transition-all duration-500"
                        style={{ width: `${Math.round(pKnown * 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Misconception Diagnostic Library */}
          <div className="lg:col-span-12 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4">
              Common Solid State Chemistry Misconceptions Corrected
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MISCONCEPTIONS.map(m => (
                <div key={m.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">Misconception</span>
                    <span className="text-[10px] font-mono text-slate-500">{m.nodeId}</span>
                  </div>
                  <p className="text-xs text-rose-200 line-through opacity-80">{m.misconception}</p>
                  <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold pt-1">Scientific Fact</div>
                  <p className="text-xs text-emerald-300 font-medium">{m.correction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FEEDBACK & ANIMATION OVERLAYS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Challenge Mastered Successfully!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
    </div>
  );
}