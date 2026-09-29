'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// NODE IDS & METADATA
// ==========================================
const ALL_NODE_IDS = [
  'c11_chem_041',
  'c11_chem_042',
  'c11_chem_043',
  'c11_chem_044',
  'c11_chem_045',
  'c11_chem_046',
  'c11_chem_047',
  'c11_chem_048',
  'c11_chem_049',
  'c11_chem_050'
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// MANDATORY SECTION 1: SCENARIO
// ==========================================
const SCENARIO = {
  title: 'ISC Advanced Intermolecular Dynamics & Hydrogen Bonding Lab',
  intro: 'Welcome to the High-Precision Chemical Physics Laboratory. You are investigating how microscopic dipole-dipole attractions shape macroscopic physical laws, biological architecture, and phase anomalies.',
  context: 'In this simulation, you will manipulate thermal kinetic energy, construct intermolecular and intramolecular hydrogen bonds, analyze hydride boiling point trends, and examine ice lattice expansion and DNA stability.'
};

// ==========================================
// MANDATORY SECTION 2: DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question: 'Why does liquid water at 0°C exhibit a GREATER mass density than solid ice at 0°C, causing ice bergs to float in ocean water?',
  options: [
    'Liquid water molecules compress into covalent networks upon melting, reducing bond length.',
    'Solid ice forms a rigid, open 3D tetrahedral cage lattice with large vacant voids; melting collapses this cage.',
    'Ice loses hydrogen atoms due to sublimation, reducing its molecular weight.',
    'Water molecules acquire negative charges in liquid phase, drawing molecules closer by Coulombic forces.'
  ],
  correctIndex: 1,
  hintAfter: 'Ice forms a highly organized, open tetrahedral hydrogen-bonded hexagonal cage structure. When ice melts at 0°C, thermal energy breaks ~15-20% of these hydrogen bonds, collapsing the rigid cage and allowing water molecules to pack more closely together!'
};

// ==========================================
// MANDATORY SECTION 3: EXPLORATION STEPS
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Electronegativity & Donor Requirements',
    instruction: 'Select different chemical species (H2O, HF, NH3, CH4, HCl). Observe how strong dipoles (δ+ H attached to F, O, N) form directional electrostatic hydrogen bonds, whereas CH4 and HCl fail standard H-bonding criteria.',
    interactionType: 'molecular_polarities',
    nodeId: 'c11_chem_041'
  },
  {
    title: 'Lab 2: Intermolecular vs Intramolecular Hydrogen Bonding',
    instruction: 'Compare ortho-nitrophenol with para-nitrophenol. Observe how intramolecular H-bonding in o-nitrophenol forms a chelate ring that lowers its boiling point, while p-nitrophenol forms intermolecular networks with higher boiling points.',
    interactionType: 'isomer_bonding',
    nodeId: 'c11_chem_044'
  },
  {
    title: 'Lab 3: Group 14-17 Hydride Boiling Point Anomaly',
    instruction: 'Plot boiling points for hydrides across Periods 2 to 5. Observe the anomalous spike for H2O, HF, and NH3 compared to the monotonic increase seen in Group 14 hydrides (CH4 to SnH4).',
    interactionType: 'boiling_point_curves',
    nodeId: 'c11_chem_045'
  },
  {
    title: 'Lab 4: Density Anomaly & Open Cage Ice Lattice',
    instruction: 'Adjust system temperature from -20°C to 100°C. Track molecular packing density and average hydrogen bonds per molecule. Notice the density maximum precisely at 3.98°C (4°C).',
    interactionType: 'ice_lattice_density',
    nodeId: 'c11_chem_048'
  },
  {
    title: 'Lab 5: Macromolecular Architecture & DNA Helix Stability',
    instruction: 'Examine Adenine-Thymine (2 H-bonds) vs Guanine-Cytosine (3 H-bonds) base pairs. Calculate double-helix melting temperature (Tm) as GC content increases.',
    interactionType: 'dna_base_pairing',
    nodeId: 'c11_chem_049'
  }
];

// ==========================================
// MANDATORY SECTION 4: PREDICTION QUESTIONS
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What will happen to the boiling point of ethanol (C2H5OH) compared to its isomer dimethyl ether (CH3-O-CH3)?',
    options: [
      'Dimethyl ether will boil at a higher temperature because it has a central symmetrical oxygen atom.',
      'Ethanol will boil significantly higher (~78°C vs -24°C) due to intermolecular hydrogen bonding via its -OH group.',
      'Both compounds will have identical boiling points because they share the same molecular formula C2H6O.',
      'Ethanol will evaporate faster due to intramolecular hydrogen bonding within the ethyl chain.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Select Ethanol vs Dimethyl Ether in Lab 1 to compare intermolecular network strengths and vapor pressures.',
    nodeId: 'c11_chem_043'
  },
  {
    question: 'Predict: Glycerol (propane-1,2,3-triol) contains three hydroxyl groups per molecule. How will its viscosity compare to ethanol?',
    options: [
      'Glycerol will be much less viscous because three OH groups repel each other.',
      'Glycerol will be extremely viscous (syrupy) because an extensive 3D network of hydrogen bonds resists molecular flow.',
      'Glycerol will have identical viscosity to ethanol because both are primary alcohols.',
      'Glycerol will solidify immediately at room temperature due to covalent cross-linking.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Use the Viscosity Drop Simulator in Lab 1 to compare sphere fall times in Ethanol vs Glycerol.',
    nodeId: 'c11_chem_046'
  }
];

// ==========================================
// MANDATORY SECTION 5: OBSERVATION QUESTIONS
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the structural change when solid ice at -5°C warms up to liquid water at +4°C?',
    observableOptions: [
      'The hydrogen bonds completely vanish, allowing atoms to collapse into a plasma.',
      'The open 3D hexagonal cage collapses into a denser fluid arrangement, increasing mass density to 1.000 g/cm³.',
      'The bond angle of H-O-H decreases from 104.5° to 90°.',
      'Water molecules decompose into hydronium (H3O+) and hydroxyl (OH-) ions permanently.'
    ],
    correctIndex: 1,
    nodeId: 'c11_chem_048'
  },
  {
    question: 'What happens when ortho-nitrophenol is subjected to steam distillation compared to para-nitrophenol?',
    observableOptions: [
      'Ortho-nitrophenol distills out rapidly with steam because its intramolecular H-bonding prevents intermolecular association with liquid molecules.',
      'Para-nitrophenol distills first because its H-bonds are weaker.',
      'Both isomers decompose into nitrogen gas at 100°C.',
      'Ortho-nitrophenol forms a solid polymer that remains in the distillation flask.'
    ],
    correctIndex: 0,
    nodeId: 'c11_chem_044'
  }
];

// ==========================================
// MANDATORY SECTION 6: REAL WORLD ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Synthesis & Polymer Rheology Engineering',
  description: 'Apply hydrogen bonding thermodynamics to design high-tensile Kevlar fibers, moisture-retaining hyaluronic acid skincare formulations, and steam-distillation protocols for pharmaceutical isomers.',
  steps: [
    'Step 1: Calculate the total hydrogen bonding capacity per mole for a polymer formulation (e.g., Polyvinyl Alcohol vs Polyethylene).',
    'Step 2: Determine thermal energy required (ΔH_vap) to break intermolecular H-bonds during distillation separation of o-nitrophenol and p-nitrophenol.',
    'Step 3: Measure viscosity changes across 20°C - 80°C range using temperature-dependent dynamic H-bond equilibrium equations.',
    'Step 4: Optimize synthetic DNA oligonucleotide melting temperature (Tm) by adjusting G-C base pair concentration (3 H-bonds per pair).'
  ]
};

// ==========================================
// MISCONCEPTIONS DATA
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc_01',
    nodeId: 'c11_chem_041',
    title: 'Hydrogen Bonding Occurs in All Hydrogen Containing Compounds',
    misconception: 'Students often believe that any molecule containing hydrogen atoms (such as CH4 or HCl) can form hydrogen bonds with neighboring molecules.',
    correction: 'Hydrogen bonding ONLY occurs when hydrogen is directly bonded to a highly electronegative atom with a small atomic radius: Fluorine, Oxygen, or Nitrogen (F, O, N). Methane (C-H) lacks bond polarity, and HCl (C-Cl) has too large an atomic radius for strong localized electrostatic interaction.',
    example: 'CH4 has zero hydrogen bonding, whereas HF forms powerful H-bonded zigzag chains.'
  },
  {
    id: 'misc_02',
    nodeId: 'c11_chem_044',
    title: 'Intramolecular Hydrogen Bonding Increases Boiling Point',
    misconception: 'Students frequently assume that all forms of hydrogen bonding increase boiling point compared to non-bonded molecules.',
    correction: 'Intramolecular H-bonding occurs WITHIN a single molecule, forming a closed chelate ring. This reduces the molecule\'s availability to bond with adjacent molecules, making it MORE volatile and lowering its boiling point compared to its intermolecularly bonded isomer.',
    example: 'Ortho-nitrophenol (intramolecular, b.p. ~214°C) boils much lower than Para-nitrophenol (intermolecular network, b.p. ~279°C).'
  },
  {
    id: 'misc_03',
    nodeId: 'c11_chem_048',
    title: 'Ice Is Denser Than Water Because Solids Pack Tightly',
    misconception: 'Students assume solid states feature tightly packed particles, making ice denser than liquid water.',
    correction: 'In ice, hydrogen bonds freeze into a rigid, highly open 3D hexagonal cage lattice with substantial empty voids. Upon melting, some H-bonds break, collapsing the cage so liquid water molecules pack closer together, making water denser than ice at 0°C.',
    example: 'Ice floats on water because ice density is ~0.917 g/cm³ while water at 0°C is ~0.9998 g/cm³.'
  },
  {
    id: 'misc_04',
    nodeId: 'c11_chem_049',
    title: 'Covalent Bonds Hold the Two Strands of DNA Together',
    misconception: 'Students confuse phosphodiester backbone covalent bonds with the forces linking complementary nitrogenous bases across the helix.',
    correction: 'The two complementary strands of the DNA double helix are held together strictly by weak, non-covalent HYDROGEN BONDS (2 H-bonds between Adenine-Thymine; 3 H-bonds between Guanine-Cytosine). This allows strands to unzip during replication.',
    example: 'Heating DNA breaks H-bonds (denaturation) without severing the covalent sugar-phosphate backbone.'
  },
  {
    id: 'misc_05',
    nodeId: 'c11_chem_050',
    title: 'Hydrogen Bonds Are Equivalent in Strength to Covalent Bonds',
    misconception: 'Because H-bonding strongly affects physical properties, students view it as a primary chemical bond involving shared electron pairs.',
    correction: 'Hydrogen bonding is a dipole-dipole electrostatic interaction. Bond energy is typically 10 to 40 kJ/mol, whereas true covalent bonds range from 200 to 400 kJ/mol (10x stronger).',
    example: 'O-H covalent bond energy = ~463 kJ/mol; O-H---O hydrogen bond energy = ~20 kJ/mol.'
  },
  {
    id: 'misc_06',
    nodeId: 'c11_chem_042',
    title: 'Chlorine Forms Strong Hydrogen Bonds Because its Electronegativity Equals Nitrogen',
    misconception: 'Students see that Nitrogen and Chlorine both have an electronegativity of ~3.0 and assume Chlorine forms equally strong H-bonds.',
    correction: 'Electronegativity alone is insufficient. The atom must also have a small atomic radius so its charge density is concentrated. Chlorine has a large 3p electron shell (larger atomic radius), resulting in diffuse charge density and negligible H-bonding capability compared to 2p Nitrogen.',
    example: 'NH3 has extensive H-bonding (b.p. -33°C), whereas HCl has minimal H-bonding (b.p. -85°C).'
  }
];

// ==========================================
// 22+ COMPREHENSIVE CHALLENGES (TIERS 1, 2, 3)
// ==========================================
interface ChallengeItem {
  id: string;
  nodeId: NodeId;
  type: 'multiple-choice' | 'numeric' | 'ordering' | 'true-false';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: ChallengeItem[] = [
  // --- FOUNDATION TIER (7 Challenges) ---
  {
    id: 'ch_01',
    nodeId: 'c11_chem_041',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Concept Identification',
    question: 'Which set of elements can act as hydrogen bond acceptors/donors when directly bonded to Hydrogen?',
    options: ['Fluorine, Chlorine, Bromine', 'Fluorine, Oxygen, Nitrogen', 'Carbon, Nitrogen, Oxygen', 'Oxygen, Sulfur, Selenium'],
    correctIndex: 1,
    explanation: 'Hydrogen bonding strictly requires small, highly electronegative period-2 elements: Fluorine (F), Oxygen (O), and Nitrogen (N).',
    hints: [
      'Think of the acronym F-O-N.',
      'Only small period-2 non-metals with high electronegativity qualify.',
      'Chlorine and Sulfur are too large in atomic radius.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_02',
    nodeId: 'c11_chem_042',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Structural Analysis',
    question: 'Why does Chlorine (EN = 3.0) fail to form strong hydrogen bonds, while Nitrogen (EN = 3.0) forms strong hydrogen bonds?',
    options: [
      'Chlorine is a gas at room temperature.',
      'Chlorine has a larger atomic radius (3p orbital), creating low charge density.',
      'Nitrogen has five valence electrons while chlorine has seven.',
      'Chlorine forms triple bonds with hydrogen.'
    ],
    correctIndex: 1,
    explanation: 'Although Nitrogen and Chlorine share identical Pauling electronegativities (~3.0), Chlorine has a much larger 3p electron shell, distributing its negative charge over a larger volume and reducing electrostatic attractive field strength.',
    hints: [
      'Consider atomic size and orbital shells (2p vs 3p).',
      'Concentrated charge density requires a smaller atomic radius.',
      'Chlorine\'s diffuse charge density weakens its electrostatic pull.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'ch_03',
    nodeId: 'c11_chem_043',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Classification',
    question: 'Which of the following molecules exhibits INTERMOLECULAR hydrogen bonding?',
    options: ['ortho-Nitrophenol', 'Water (H2O)', 'Methane (CH4)', 'Salicylaldehyde'],
    correctIndex: 1,
    explanation: 'Water molecules form extensive intermolecular hydrogen bonded networks linking separate H2O molecules together.',
    hints: [
      'Intermolecular means BETWEEN distinct molecules.',
      'Methane lacks electronegative atoms.',
      'Water forms a vast 3D dynamic hydrogen bonded fluid.'
    ]
  },
  {
    id: 'ch_04',
    nodeId: 'c11_chem_044',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Classification',
    question: 'Intramolecular hydrogen bonding occurs in which of the following compounds?',
    options: ['para-Nitrophenol', 'ortho-Nitrophenol', 'Ethanol', 'Ammonia'],
    correctIndex: 1,
    explanation: 'In ortho-nitrophenol, the -OH and -NO2 groups are adjacent (ortho position), allowing H-bonding WITHIN the same molecule (intramolecular ring formation).',
    hints: [
      'Look for adjacent functional groups on a benzene ring.',
      'Ortho substitution places groups close enough to bond internally.',
      'Para substitution keeps groups too far apart for internal bonding.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_05',
    nodeId: 'c11_chem_045',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Property Trend Analysis',
    question: 'Comparing the hydrides of Group 16 (H2O, H2S, H2Se, H2Te), why does H2O have an abnormally high boiling point (100°C vs H2S at -60°C)?',
    options: [
      'H2O has the highest molar mass among Group 16 hydrides.',
      'H2O forms strong intermolecular hydrogen bonds requiring substantial heat energy to break.',
      'H2S forms triple covalent bonds.',
      'H2O undergoes ionic dissociation in liquid phase.'
    ],
    correctIndex: 1,
    explanation: 'H2O forms robust 3D intermolecular hydrogen bonds due to Oxygen\'s high electronegativity and small radius, whereas H2S relies only on weak London dispersion forces.',
    hints: [
      'Molar mass increases down the group, so H2O has the LOWEST mass!',
      'What special force holds water molecules together in liquid phase?',
      'Hydrogen bonding elevates boiling points significantly.'
    ]
  },
  {
    id: 'ch_06',
    nodeId: 'c11_chem_046',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Rheology Concept',
    question: 'Why is Glycerol (C3H8O3) vastly more viscous than Ethanol (C2H5OH)?',
    options: [
      'Glycerol has three -OH groups per molecule, forming a multi-directional extensive H-bonding network.',
      'Glycerol is non-polar and forms hydrophobic gels.',
      'Ethanol forms covalent polymer chains.',
      'Glycerol has lower molecular weight.'
    ],
    correctIndex: 0,
    explanation: 'With 3 hydroxyl groups per molecule, glycerol acts as a triple donor/acceptor, creating a dense, tangled intermolecular H-bonded network that resists fluid shear.',
    hints: [
      'Count the hydroxyl (-OH) groups in each molecule.',
      'Ethanol has 1 -OH; Glycerol has 3 -OH groups.',
      'More -OH groups = denser 3D sticky hydrogen bond mesh.'
    ]
  },
  {
    id: 'ch_07',
    nodeId: 'c11_chem_047',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Solubility Criteria',
    question: 'Why is lower alkanols like Methanol completely miscible in water, whereas Pentane is insoluble?',
    options: [
      'Pentane forms stronger H-bonds with water than methanol.',
      'Methanol forms solute-solvent hydrogen bonds with water molecules.',
      'Pentane reacts with water to form an acid.',
      'Methanol is an ionic salt.'
    ],
    correctIndex: 1,
    explanation: 'Methanol contains an -OH group capable of forming energetically favorable solute-solvent hydrogen bonds with water molecules. Pentane is hydrophobic.',
    hints: [
      'Like dissolves like.',
      'Look for functional groups capable of hydrogen bonding with H2O.',
      'Methanol\'s -OH forms hydrogen bonds with water.'
    ]
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'ch_08',
    nodeId: 'c11_chem_048',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Quantitative Anomaly Analysis',
    question: 'At what temperature (in °C) does pure liquid water reach its MAXIMUM mass density (1.0000 g/cm³)?',
    correctAnswer: 4,
    tolerance: 0.2,
    explanation: 'Pure water reaches maximum density at 3.98°C (~4°C). Above 4°C thermal expansion dominates; below 4°C open cage ice precursors expand liquid volume.',
    hints: [
      'It is slightly above the freezing point of water.',
      'This value is crucial for aquatic life survival under frozen lakes.',
      'Enter an integer value between 3 and 5.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_09',
    nodeId: 'c11_chem_049',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Molecular Genetics Physics',
    question: 'How many total hydrogen bonds hold together a double-stranded DNA segment containing 10 Adenine-Thymine (A-T) pairs and 15 Guanine-Cytosine (G-C) pairs?',
    correctAnswer: 65,
    tolerance: 0,
    explanation: 'A-T base pairs have 2 H-bonds each (10 × 2 = 20). G-C base pairs have 3 H-bonds each (15 × 3 = 45). Total H-bonds = 20 + 45 = 65.',
    hints: [
      'Remember: A pairs with T via 2 H-bonds.',
      'G pairs with C via 3 H-bonds.',
      'Multiply (10 × 2) + (15 × 3).'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_10',
    nodeId: 'c11_chem_050',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Energy Hierarchy Comparison',
    question: 'Arrange the following intermolecular and intramolecular forces in order of INCREASING bond strength:',
    options: [
      'London Dispersion < Hydrogen Bond < Covalent Bond',
      'Covalent Bond < Hydrogen Bond < London Dispersion',
      'Hydrogen Bond < London Dispersion < Covalent Bond',
      'London Dispersion < Covalent Bond < Hydrogen Bond'
    ],
    correctIndex: 0,
    explanation: 'London dispersion forces (~2-5 kJ/mol) < Hydrogen bonds (~10-40 kJ/mol) < Covalent bonds (~200-400 kJ/mol).',
    hints: [
      'Van der Waals (London) forces are the weakest.',
      'Covalent sharing of electron pairs forms primary chemical bonds.',
      'Hydrogen bonding lies in between.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_11',
    nodeId: 'c11_chem_043',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Phase Equilibrium',
    question: 'In the vapor state, Hydrogen Fluoride (HF) exhibits an experimental molar mass of ~120 g/mol, despite its formula mass being 20 g/mol. Why?',
    options: [
      'HF undergoes ionization into H+ and F- ions in gas phase.',
      'HF exists as a cyclic hexamer (HF)6 held together by strong hydrogen bonds.',
      'Fluorine atoms undergo nuclear fusion.',
      'HF reacts with air to form H2SO4.'
    ],
    correctIndex: 1,
    explanation: 'Due to Fluorine\'s extreme electronegativity, HF molecules associate into cyclic or zigzag hexameric molecular aggregates (HF)6 even in the gas phase (6 × 20 = 120 g/mol).',
    hints: [
      'Divide experimental mass (120) by formula unit mass (20) = 6.',
      'HF molecules oligomerize into clusters.',
      'Hydrogen bonds persist even in vapor state for HF.'
    ]
  },
  {
    id: 'ch_12',
    nodeId: 'c11_chem_044',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Isomeric Volatility Analysis',
    question: 'Why can ortho-nitrophenol be separated from para-nitrophenol by steam distillation?',
    options: [
      'Ortho-nitrophenol has intermolecular H-bonds making it non-volatile.',
      'Ortho-nitrophenol forms intramolecular H-bonds, preventing intermolecular attraction and making it steam volatile.',
      'Para-nitrophenol has a lower boiling point than ortho-nitrophenol.',
      'Para-nitrophenol is insoluble in boiling water.'
    ],
    correctIndex: 1,
    explanation: 'Ortho-nitrophenol undergoes intramolecular H-bonding (chelation), preventing association with surrounding molecules. Thus it is volatile in steam. Para-nitrophenol forms intermolecular networks, raising its boiling point.',
    hints: [
      'Intramolecular bonding minimizes external forces.',
      'Steam volatile compounds must have lower intermolecular cohesive forces.',
      'Ortho isomer has internal chelation.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_13',
    nodeId: 'c11_chem_045',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Periodic Hydride Dynamics',
    question: 'Predict the boiling point trend for Group 15 hydrides: NH3, PH3, AsH3, SbH3:',
    options: [
      'NH3 < PH3 < AsH3 < SbH3',
      'PH3 < AsH3 < NH3 < SbH3',
      'SbH3 < AsH3 < PH3 < NH3',
      'NH3 > SbH3 > AsH3 > PH3'
    ],
    correctIndex: 1,
    explanation: 'PH3 has the lowest b.p. (-87.7°C). From PH3 to SbH3, b.p. increases due to increasing dispersion forces. NH3 is anomalously higher (-33°C) than PH3 and AsH3 due to hydrogen bonding, placing it between AsH3 and SbH3.',
    hints: [
      'PH3 lacks hydrogen bonding, so it has the lowest boiling point.',
      'As mass increases from PH3 -> AsH3 -> SbH3, dispersion forces grow.',
      'NH3 jumps ahead due to N-H---N hydrogen bonding.'
    ]
  },
  {
    id: 'ch_14',
    nodeId: 'c11_chem_046',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Surface Dynamics',
    question: 'Water has a high surface tension of ~72.8 mN/m at 20°C. How does adding ethanol affect this value?',
    options: [
      'Surface tension increases because ethanol forms stronger covalent bonds.',
      'Surface tension decreases because ethanol disrupts the cohesive hydrogen-bonded water surface network.',
      'Surface tension remains constant.',
      'Water immediately solidifies into ice.'
    ],
    correctIndex: 1,
    explanation: 'Ethanol acts as a surfactant because its hydrocarbon tail disrupts the uniform 3D cohesive H-bonding network of water surface molecules, lowering surface tension.',
    hints: [
      'Ethanol has an alkyl group (hydrophobic) and an -OH group.',
      'Disrupting surface H-bonds reduces cohesive forces.',
      'Surfactants lower liquid surface tension.'
    ]
  },
  {
    id: 'ch_15',
    nodeId: 'c11_chem_047',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Organic Solubility Principles',
    question: 'Why does diethyl ether ((C2H5)2O) have limited solubility in water compared to ethanol, despite both having oxygen atoms?',
    options: [
      'Ether lacks an acidic Hydrogen atom to act as a hydrogen bond DONOR to water.',
      'Ether oxygen cannot form hydrogen bonds with water.',
      'Ethanol is a non-polar hydrocarbon.',
      'Ether reacts violently with water to form ethane.'
    ],
    correctIndex: 0,
    explanation: 'Ether oxygen can act as an H-bond ACCEPTOR, but ether lacks H directly bonded to O (no donor capability) and possesses two bulky hydrophobic ethyl groups.',
    hints: [
      'H-bonding requires both donors (O-H) and acceptors (lone pairs).',
      'Ether has no O-H bond.',
      'Ethyl groups increase hydrophobic character.'
    ]
  },

  // --- ADVANCED TIER (7 Challenges) ---
  {
    id: 'ch_16',
    nodeId: 'c11_chem_048',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Crystallographic Physics',
    question: 'In ice, each water molecule is hydrogen-bonded to how many neighboring water molecules in a perfect tetrahedral geometry?',
    correctAnswer: 4,
    tolerance: 0,
    explanation: 'In solid ice lattice, each oxygen atom is tetrahedrally surrounded by 4 water molecules (2 covalent O-H bonds + 2 incoming hydrogen bonds to lone pairs).',
    hints: [
      'Think of tetrahedral hybridization geometry (sp3).',
      '2 hydrogen donors + 2 hydrogen acceptors per molecule.',
      'The coordination number is 4.'
    ]
  },
  {
    id: 'ch_17',
    nodeId: 'c11_chem_049',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Biophysical Energetics',
    question: 'During thermal denaturation (melting) of DNA at 95°C, what specific microscopic change occurs?',
    options: [
      'Phosphodiester covalent bonds in the sugar-phosphate backbone rupture.',
      'Interstrand hydrogen bonds between complementary base pairs break, separating the double strands into single random coils.',
      'Deoxyribose sugars decompose into carbon dioxide and water.',
      'Nitrogenous bases undergo oxidation to form nitrates.'
    ],
    correctIndex: 1,
    explanation: 'Thermal energy at 95°C exceeds the weak H-bond energy (~10-20 kJ/mol per pair) linking base pairs, disrupting interstrand H-bonds while covalent backbones stay intact.',
    hints: [
      'Covalent bonds require much higher energy (~300-400 kJ/mol) to break.',
      'Denaturation separates the two helical strands.',
      'Hydrogen bonds break easily under thermal motion.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_18',
    nodeId: 'c11_chem_050',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Thermodynamic Calculations',
    question: 'If the enthalpy of vaporisation of water is ~40.7 kJ/mol and breaking all H-bonds accounts for ~80% of this energy, estimate the average energy (in kJ/mol) per mole of H-bonds broken (assuming ~2 moles of H-bonds per mole of H2O).',
    correctAnswer: 16.3,
    tolerance: 1.0,
    explanation: 'H-bonding contribution = 0.80 × 40.7 kJ/mol = 32.56 kJ/mol. Dividing by 2 moles of H-bonds per H2O gives ~16.28 kJ/mol per H-bond.',
    hints: [
      'First calculate 80% of 40.7 kJ/mol.',
      'Then divide that value by 2.',
      'Result should be around 16.3 kJ/mol.'
    ]
  },
  {
    id: 'ch_19',
    nodeId: 'c11_chem_042',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Advanced Bonding Models',
    question: 'The bifluoride ion [F-H-F]- exhibits an exceptionally strong symmetric hydrogen bond (~160 kJ/mol). Which model describes this unique species?',
    options: [
      'Standard electrostatic dipole-dipole interaction.',
      '3-center-4-electron (3c-4e) covalent-like delocalized bond with a centrally located proton.',
      'Ionic attraction between F2- and H+.',
      'London dispersion force enhancement.'
    ],
    correctIndex: 1,
    explanation: '[F-H-F]- features a symmetric hydrogen bond where the proton sits exactly halfway between both F atoms in a 3-center 4-electron delocalized molecular orbital.',
    hints: [
      'The H atom is centered symmetrically between the two Fluorine atoms.',
      'Bond energy is 160 kJ/mol (far stronger than normal 20 kJ/mol H-bonds).',
      'It shares characteristics of covalent MO theory (3-center 4-electron).'
    ]
  },
  {
    id: 'ch_20',
    nodeId: 'c11_chem_044',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Physical Organic Equilibrium',
    question: 'Chloral hydrate (CCl3-CH(OH)2) is an unusually stable gem-diol. What stabilizes this normally unstable functional group?',
    options: [
      'Resonance stabilization by electron-donating methyl groups.',
      'Intramolecular hydrogen bonding between hydroxyl Hydrogens and electronegative Chlorine atoms.',
      'Covalent bond formation between chlorine and carbon.',
      'Aromatic ring current stabilization.'
    ],
    correctIndex: 1,
    explanation: 'Chloral hydrate forms two 5-membered chelate rings via intramolecular H-bonding between O-H protons and the electron-dense Cl atoms of the CCl3 group.',
    hints: [
      'Gem-diols usually eliminate water to form aldehydes.',
      'The CCl3 group has 3 electronegative chlorine atoms nearby.',
      'Intramolecular H-bonding stabilizes the diol structure.'
    ]
  },
  {
    id: 'ch_21',
    nodeId: 'c11_chem_045',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Acid-Base Equilibria',
    question: 'Why is salicylic acid (ortho-hydroxybenzoic acid) a significantly stronger acid (Ka = 1.06 × 10^-3) than para-hydroxybenzoic acid (Ka = 2.9 × 10^-5)?',
    options: [
      'Ortho-hydroxybenzoic acid has a lower molecular mass.',
      'Intramolecular H-bonding in the conjugate salicylate anion stabilizes the negative charge on the carboxylate group.',
      'Para-hydroxybenzoic acid decomposes in water.',
      'Salicylic acid forms covalent polymers.'
    ],
    correctIndex: 1,
    explanation: 'Deprotonation of salicylic acid yields salicylate anion, which is intramolecularly H-bonded by the adjacent phenolic -OH group, spreading and stabilizing the negative charge.',
    hints: [
      'Acidity depends on conjugate base stability.',
      'The carboxylate anion (-COO-) receives an intramolecular H-bond from the adjacent -OH.',
      'Charge dispersion increases acidity.'
    ]
  },
  {
    id: 'ch_22',
    nodeId: 'c11_chem_046',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Kinetic Viscosity Kinetics',
    question: 'As temperature increases from 20°C to 80°C, the viscosity of liquid water drops by nearly 70%. What micro-level mechanism accounts for this?',
    options: [
      'Covalent O-H bonds expand, making molecules larger.',
      'Increased thermal kinetic energy breaks dynamic H-bond networks, lowering activation energy for molecular sliding.',
      'Water decomposes into hydrogen and oxygen gases.',
      'Density drops to zero.'
    ],
    correctIndex: 1,
    explanation: 'Thermal energy disrupt hydrogen bond clusters, decreasing the average lifetime and number of H-bonds linking H2O molecules, dramatically enhancing fluid shear mobility.',
    hints: [
      'Viscosity measures resistance to fluid flow.',
      'H-bonds constantly form and break in liquid water.',
      'Higher temperature shifts the equilibrium toward broken H-bonds.'
    ]
  }
];

// ==========================================
// DIAGNOSTIC QUIZ QUESTIONS
// ==========================================
const DIAGNOSTIC_QUESTIONS = [
  {
    question: 'Identify the key prerequisite for a molecule to act as a hydrogen bond donor:',
    options: [
      'Must contain Hydrogen bonded to an element with EN > 3.0 and small atomic radius (F, O, N).',
      'Must contain any metal and hydrogen.',
      'Must have double bonds.',
      'Must be a noble gas.'
    ],
    correctIndex: 0
  },
  {
    question: 'What is the primary physical effect of INTRAMOLECULAR hydrogen bonding on boiling point?',
    options: [
      'Substantially raises boiling point compared to intermolecular isomers.',
      'Lowers boiling point by internally satisfying H-bonding and reducing intermolecular attraction.',
      'Has zero effect on physical properties.',
      'Causes immediate explosion.'
    ],
    correctIndex: 1
  },
  {
    question: 'Why does ice float on water?',
    options: [
      'Ice contains trapped air bubbles.',
      'Hydrogen bonds form an open tetrahedral cage structure in ice, lowering solid density below liquid water.',
      'Water molecules become heavier when melted.',
      'Ice is non-polar.'
    ],
    correctIndex: 1
  }
];

// ==========================================
// MANDATORY SECTION 8: CUSTOM SVG DIAGRAMS
// ==========================================
const IsomerBondingDiagram: React.FC = () => (
  <svg viewBox="0 0 700 320" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 shadow-2xl p-4">
    <text x="350" y="28" fill="#e2e8f0" fontSize="18" fontWeight="bold" textAnchor="middle">
      Structural Analysis: Intramolecular vs Intermolecular H-Bonding
    </text>

    {/* Ortho-Nitrophenol (Intramolecular) */}
    <g transform="translate(60, 50)">
      <rect x="0" y="0" width="260" height="230" rx="12" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
      <text x="130" y="30" fill="#60a5fa" fontSize="15" fontWeight="bold" textAnchor="middle">ortho-Nitrophenol</text>

      {/* Benzene Ring */}
      <polygon points="130,70 170,90 170,140 130,160 90,140 90,90" fill="none" stroke="#94a3b8" strokeWidth="3" />
      <circle cx="130" cy="115" r="25" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />

      {/* OH Group */}
      <line x1="90" y1="90" x2="60" y2="70" stroke="#f87171" strokeWidth="3" />
      <circle cx="55" cy="67" r="10" fill="#ef4444" />
      <text x="55" y="71" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">O</text>
      <line x1="55" y1="57" x2="55" y2="45" stroke="#e2e8f0" strokeWidth="2" />
      <circle cx="55" cy="41" r="7" fill="#38bdf8" />
      <text x="55" y="44" fill="#000" fontSize="9" textAnchor="middle" fontWeight="bold">H</text>

      {/* NO2 Group */}
      <line x1="130" y1="70" x2="130" y2="40" stroke="#818cf8" strokeWidth="3" />
      <circle cx="130" cy="35" r="10" fill="#6366f1" />
      <text x="130" y="39" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">N</text>

      <line x1="130" y1="25" x2="110" y2="15" stroke="#ef4444" strokeWidth="3" />
      <circle cx="105" cy="12" r="9" fill="#ef4444" />
      <text x="105" y="15" fill="#fff" fontSize="9" textAnchor="middle" fontWeight="bold">O</text>

      {/* Intramolecular H-Bond Dashed */}
      <line x1="62" y1="41" x2="96" y2="15" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4 3" />

      <text x="130" y="195" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">Intramolecular H-Bond Ring</text>
      <text x="130" y="215" fill="#cbd5e1" fontSize="11" textAnchor="middle">Lower b.p. (~214°C) • Steam Volatile</text>
    </g>

    {/* Para-Nitrophenol (Intermolecular) */}
    <g transform="translate(380, 50)">
      <rect x="0" y="0" width="260" height="230" rx="12" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
      <text x="130" y="30" fill="#34d399" fontSize="15" fontWeight="bold" textAnchor="middle">para-Nitrophenol</text>

      {/* Benzene Ring */}
      <polygon points="130,75 165,95 165,135 130,155 95,135 95,95" fill="none" stroke="#94a3b8" strokeWidth="3" />
      <circle cx="130" cy="115" r="22" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />

      {/* Top NO2 */}
      <line x1="130" y1="75" x2="130" y2="52" stroke="#818cf8" strokeWidth="3" />
      <circle cx="130" cy="46" r="9" fill="#6366f1" />
      <text x="130" y="49" fill="#fff" fontSize="9" textAnchor="middle" fontWeight="bold">N</text>

      {/* Bottom OH */}
      <line x1="130" y1="155" x2="130" y2="175" stroke="#f87171" strokeWidth="3" />
      <circle cx="130" cy="182" r="9" fill="#ef4444" />
      <text x="130" y="185" fill="#fff" fontSize="9" textAnchor="middle" fontWeight="bold">O</text>
      <line x1="130" y1="191" x2="130" y2="202" stroke="#e2e8f0" strokeWidth="2" />
      <circle cx="130" cy="207" r="6" fill="#38bdf8" />
      <text x="130" y="210" fill="#000" fontSize="8" textAnchor="middle" fontWeight="bold">H</text>

      {/* Intermolecular H-Bond Lines pointing outward */}
      <line x1="130" y1="213" x2="130" y2="228" stroke="#f59e0b" strokeWidth="3" strokeDasharray="3 3" />
      <line x1="130" y1="37" x2="130" y2="20" stroke="#f59e0b" strokeWidth="3" strokeDasharray="3 3" />

      <text x="130" y="115" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Intermolecular Network</text>
      <text x="130" y="242" fill="#cbd5e1" fontSize="11" textAnchor="middle">Higher b.p. (~279°C) • Non-Volatile</text>
    </g>
  </svg>
);

const HydrideBoilingPointChart: React.FC = () => (
  <svg viewBox="0 0 700 320" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 shadow-2xl p-4">
    <text x="350" y="25" fill="#e2e8f0" fontSize="16" fontWeight="bold" textAnchor="middle">
      Boiling Point Anomalies of Hydrides (Groups 14, 15, 16, 17)
    </text>

    {/* Axes */}
    <line x1="70" y1="270" x2="650" y2="270" stroke="#64748b" strokeWidth="2" />
    <line x1="70" y1="50" x2="70" y2="270" stroke="#64748b" strokeWidth="2" />

    {/* Y Axis Labels (Temp °C) */}
    <text x="60" y="60" fill="#94a3b8" fontSize="10" textAnchor="end">100°C</text>
    <text x="60" y="115" fill="#94a3b8" fontSize="10" textAnchor="end">50°C</text>
    <text x="60" y="170" fill="#94a3b8" fontSize="10" textAnchor="end">0°C</text>
    <text x="60" y="225" fill="#94a3b8" fontSize="10" textAnchor="end">-50°C</text>
    <text x="60" y="270" fill="#94a3b8" fontSize="10" textAnchor="end">-100°C</text>

    {/* X Axis Labels (Period) */}
    <text x="140" y="290" fill="#cbd5e1" fontSize="12" textAnchor="middle">Period 2</text>
    <text x="290" y="290" fill="#cbd5e1" fontSize="12" textAnchor="middle">Period 3</text>
    <text x="440" y="290" fill="#cbd5e1" fontSize="12" textAnchor="middle">Period 4</text>
    <text x="590" y="290" fill="#cbd5e1" fontSize="12" textAnchor="middle">Period 5</text>

    {/* Grid lines */}
    <line x1="70" y1="170" x2="650" y2="170" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />

    {/* Group 16 Curve (H2O, H2S, H2Se, H2Te) - Red */}
    <polyline points="140,60 290,230 440,215 590,190" fill="none" stroke="#ef4444" strokeWidth="3" />
    <circle cx="140" cy="60" r="5" fill="#ef4444" />
    <text x="140" y="48" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">H2O (100°C)</text>
    <circle cx="290" cy="230" r="4" fill="#ef4444" />
    <text x="290" y="245" fill="#fca5a5" fontSize="10" textAnchor="middle">H2S</text>
    <circle cx="440" cy="215" r="4" fill="#ef4444" />
    <text x="440" y="230" fill="#fca5a5" fontSize="10" textAnchor="middle">H2Se</text>
    <circle cx="590" cy="190" r="4" fill="#ef4444" />
    <text x="590" y="205" fill="#fca5a5" fontSize="10" textAnchor="middle">H2Te</text>

    {/* Group 17 Curve (HF, HCl, HBr, HI) - Cyan */}
    <polyline points="140,148 290,255 440,240 590,205" fill="none" stroke="#06b6d4" strokeWidth="3" />
    <circle cx="140" cy="148" r="5" fill="#06b6d4" />
    <text x="140" y="138" fill="#67e8f9" fontSize="11" fontWeight="bold" textAnchor="middle">HF (20°C)</text>

    {/* Group 15 Curve (NH3, PH3, AsH3, SbH3) - Amber */}
    <polyline points="140,206 290,258 440,230 590,180" fill="none" stroke="#f59e0b" strokeWidth="3" />
    <circle cx="140" cy="206" r="5" fill="#f59e0b" />
    <text x="140" y="196" fill="#fde047" fontSize="11" fontWeight="bold" textAnchor="middle">NH3 (-33°C)</text>

    {/* Group 14 Curve (CH4, SiH4, GeH4, SnH4) - Slate Normal */}
    <polyline points="140,265 290,248 440,225 590,200" fill="none" stroke="#94a3b8" strokeWidth="3" strokeDasharray="4 2" />
    <circle cx="140" cy="265" r="4" fill="#94a3b8" />
    <text x="140" y="278" fill="#cbd5e1" fontSize="10" textAnchor="middle">CH4 (-161°C)</text>

    {/* Legend */}
    <g transform="translate(480, 50)">
      <rect x="0" y="0" width="160" height="95" rx="6" fill="#1e293b" stroke="#475569" />
      <line x1="10" y1="18" x2="35" y2="18" stroke="#ef4444" strokeWidth="3" />
      <text x="42" y="22" fill="#cbd5e1" fontSize="11">Group 16 (H2O!)</text>
      <line x1="10" y1="40" x2="35" y2="40" stroke="#06b6d4" strokeWidth="3" />
      <text x="42" y="44" fill="#cbd5e1" fontSize="11">Group 17 (HF!)</text>
      <line x1="10" y1="62" x2="35" y2="62" stroke="#f59e0b" strokeWidth="3" />
      <text x="42" y="66" fill="#cbd5e1" fontSize="11">Group 15 (NH3!)</text>
      <line x1="10" y1="82" x2="35" y2="82" stroke="#94a3b8" strokeWidth="3" strokeDasharray="4 2" />
      <text x="42" y="85" fill="#cbd5e1" fontSize="11">Group 14 (CH4)</text>
    </g>
  </svg>
);

const DnaBasePairDiagram: React.FC = () => (
  <svg viewBox="0 0 700 300" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 shadow-2xl p-4">
    <text x="350" y="25" fill="#e2e8f0" fontSize="16" fontWeight="bold" textAnchor="middle">
      Biological Hydrogen Bonding: DNA Base Pair Complementarity
    </text>

    {/* Adenine - Thymine (2 H-bonds) */}
    <g transform="translate(40, 50)">
      <rect x="0" y="0" width="290" height="220" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
      <text x="145" y="28" fill="#60a5fa" fontSize="14" fontWeight="bold" textAnchor="middle">Adenine = Thymine (2 H-Bonds)</text>

      {/* Adenine Block */}
      <rect x="20" y="60" width="90" height="110" rx="8" fill="#2563eb" fillOpacity="0.4" stroke="#3b82f6" strokeWidth="2" />
      <text x="65" y="120" fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle">ADENINE</text>

      {/* Thymine Block */}
      <rect x="180" y="60" width="90" height="110" rx="8" fill="#d97706" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="2" />
      <text x="225" y="120" fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle">THYMINE</text>

      {/* H-Bond 1 */}
      <line x1="110" y1="85" x2="180" y2="85" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4 3" />
      <circle cx="110" cy="85" r="4" fill="#ef4444" />
      <circle cx="180" cy="85" r="4" fill="#38bdf8" />
      <text x="145" y="78" fill="#38bdf8" fontSize="10" textAnchor="middle">N-H ••• O</text>

      {/* H-Bond 2 */}
      <line x1="110" y1="145" x2="180" y2="145" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4 3" />
      <circle cx="110" cy="145" r="4" fill="#38bdf8" />
      <circle cx="180" cy="145" r="4" fill="#6366f1" />
      <text x="145" y="140" fill="#38bdf8" fontSize="10" textAnchor="middle">N ••• H-N</text>

      <text x="145" y="195" fill="#94a3b8" fontSize="11" textAnchor="middle">Lower Melting Temp (Tm)</text>
    </g>

    {/* Guanine - Cytosine (3 H-bonds) */}
    <g transform="translate(370, 50)">
      <rect x="0" y="0" width="290" height="220" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
      <text x="145" y="28" fill="#34d399" fontSize="14" fontWeight="bold" textAnchor="middle">Guanine ≡ Cytosine (3 H-Bonds)</text>

      {/* Guanine Block */}
      <rect x="20" y="50" width="90" height="130" rx="8" fill="#059669" fillOpacity="0.4" stroke="#10b981" strokeWidth="2" />
      <text x="65" y="120" fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle">GUANINE</text>

      {/* Cytosine Block */}
      <rect x="180" y="50" width="90" height="130" rx="8" fill="#7c3aed" fillOpacity="0.4" stroke="#8b5cf6" strokeWidth="2" />
      <text x="225" y="120" fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle">CYTOSINE</text>

      {/* H-Bond 1 */}
      <line x1="110" y1="70" x2="180" y2="70" stroke="#34d399" strokeWidth="3" strokeDasharray="4 3" />
      <text x="145" y="65" fill="#34d399" fontSize="9" textAnchor="middle">O ••• H-N</text>

      {/* H-Bond 2 */}
      <line x1="110" y1="115" x2="180" y2="115" stroke="#34d399" strokeWidth="3" strokeDasharray="4 3" />
      <text x="145" y="110" fill="#34d399" fontSize="9" textAnchor="middle">N-H ••• N</text>

      {/* H-Bond 3 */}
      <line x1="110" y1="160" x2="180" y2="160" stroke="#34d399" strokeWidth="3" strokeDasharray="4 3" />
      <text x="145" y="155" fill="#34d399" fontSize="9" textAnchor="middle">N-H ••• O</text>

      <text x="145" y="202" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Higher Thermal Stability</text>
    </g>
  </svg>
);

// ==========================================
// INTERACTIVE CANVAS SIMULATION
// ==========================================
interface MoleculeSimProps {
  selectedCompound: string;
  temperatureK: number;
}

const InteractiveMoleculeCanvas: React.FC<MoleculeSimProps> = ({ selectedCompound, temperatureK }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Generate dynamic particles based on compound
    const numParticles = 18;
    const particles = Array.from({ length: numParticles }, (_, i) => ({
      x: 60 + (i % 6) * 75 + (Math.random() * 15 - 7.5),
      y: 50 + Math.floor(i / 6) * 65 + (Math.random() * 15 - 7.5),
      vx: (Math.random() - 0.5) * (temperatureK / 100),
      vy: (Math.random() - 0.5) * (temperatureK / 100),
      angle: Math.random() * Math.PI * 2
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background grid
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update positions & velocity according to temperature
      const thermalFactor = Math.sqrt(temperatureK / 300);

      particles.forEach((p, i) => {
        p.x += p.vx * thermalFactor;
        p.y += p.vy * thermalFactor;
        p.angle += 0.02 * thermalFactor;

        // Bounce off walls
        if (p.x < 30 || p.x > canvas.width - 30) p.vx *= -1;
        if (p.y < 30 || p.y > canvas.height - 30) p.vy *= -1;

        // Draw Intermolecular Hydrogen Bonds if close enough & H-bonding compound
        const isHBondable = ['H2O', 'HF', 'NH3', 'Ethanol', 'Glycerol'].includes(selectedCompound);

        if (isHBondable) {
          particles.forEach((p2, j) => {
            if (i < j) {
              const dx = p2.x - p.x;
              const dy = p2.y - p.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              // Hydrogen bond threshold distance (breaks at high thermal motion)
              const maxDist = 95 - (temperatureK / 15);
              if (dist < Math.max(40, maxDist)) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = '#f59e0b';
                ctx.lineWidth = 2;
                ctx.setLineDash([4, 4]);
                ctx.stroke();
                ctx.setLineDash([]);
              }
            }
          });
        }
      });

      // Render Molecules
      particles.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        if (selectedCompound === 'H2O') {
          // Oxygen atom
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(0, 0, 14, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 10px sans-serif';
          ctx.fillText('O', -4, 4);

          // Hydrogens (104.5°)
          [-0.6, 0.6].forEach((angleOffset) => {
            const hx = Math.cos(angleOffset) * 18;
            const hy = Math.sin(angleOffset) * 18;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(hx, hy);
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 3;
            ctx.stroke();

            ctx.fillStyle = '#38bdf8';
            ctx.beginPath();
            ctx.arc(hx, hy, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#000000';
            ctx.font = '9px sans-serif';
            ctx.fillText('H', hx - 3, hy + 3);
          });
        } else if (selectedCompound === 'HF') {
          // Fluorine
          ctx.fillStyle = '#06b6d4';
          ctx.beginPath();
          ctx.arc(0, 0, 15, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 10px sans-serif';
          ctx.fillText('F', -3, 4);

          // Hydrogen
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(20, 0);
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 3;
          ctx.stroke();

          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(20, 0, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#000000';
          ctx.font = '9px sans-serif';
          ctx.fillText('H', 17, 3);
        } else if (selectedCompound === 'CH4') {
          // Carbon
          ctx.fillStyle = '#475569';
          ctx.beginPath();
          ctx.arc(0, 0, 14, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 10px sans-serif';
          ctx.fillText('C', -4, 4);

          // 4 Hydrogens tetrahedral layout
          [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].forEach((a) => {
            const hx = Math.cos(a) * 17;
            const hy = Math.sin(a) * 17;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(hx, hy);
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.fillStyle = '#cbd5e1';
            ctx.beginPath();
            ctx.arc(hx, hy, 6, 0, Math.PI * 2);
            ctx.fill();
          });
        } else {
          // Generic Molecule representation
          ctx.fillStyle = '#8b5cf6';
          ctx.beginPath();
          ctx.arc(0, 0, 14, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '10px sans-serif';
          ctx.fillText(selectedCompound.substring(0, 3), -10, 4);
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedCompound, temperatureK]);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 shadow-2xl">
      <canvas ref={canvasRef} width={650} height={280} className="w-full h-auto block" />
      <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300">
        Active Kinetic Temperature: <span className="font-bold text-amber-400">{temperatureK} K</span> ({(temperatureK - 273.15).toFixed(1)}°C)
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT EXPORT
// ==========================================
export default function C11_ChemistryHydrogenbondingSim({ onComplete }: { onComplete?: (score: number) => void }) {
  // --- Tab & Navigation State ---
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary' | 'diagnostic' | 'misconceptions'>('discovery');

  // --- Exploration & Lab State ---
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedCompound, setSelectedCompound] = useState<string>('H2O');
  const [temperatureK, setTemperatureK] = useState<number>(298);
  const [viscosityFallTime, setViscosityFallTime] = useState<number | null>(null);

  // --- Answers & Evaluation State ---
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [predictionSubmitted, setPredictionSubmitted] = useState<boolean[]>([false, false]);

  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);
  const [observationSubmitted, setObservationSubmitted] = useState<boolean[]>([false, false]);

  const [diagnosticAnswers, setDiagnosticAnswers] = useState<(number | null)[]>([null, null, null]);
  const [diagnosticSubmitted, setDiagnosticSubmitted] = useState<boolean>(false);

  // --- Challenges Engine State ---
  const [challengeIdx, setChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const [challengeCompleted, setChallengeCompleted] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintIndex, setCurrentHintIndex] = useState<number>(0);

  // --- Feedback FX State ---
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // --- Adaptive BKT & SRS State ---
  const [bktStates, setBktStates] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial as Record<NodeId, ReturnType<typeof createBKTState>>;
  });

  const [srsItem, setSrsItem] = useState(() => createReviewItem('c11_chem_041'));

  // --- Inactivity Hint Timer ---
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    setShowHint(false);
    inactivityTimer.current = setTimeout(() => {
      setShowHint(true);
      audioManager.play('hint');
      speechManager.speak('Need a hint? Check the electronegativity and molecular geometry requirements.');
    }, 12000);
  }, []);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [challengeIdx, activeTab, resetInactivityTimer]);

  // Audio Greeting on Load
  useEffect(() => {
    speechManager.speak('Welcome to the ISC Hydrogen Bonding Interactive Simulation. Explore molecular forces, ice lattice anomalies, and chemical dynamics.');
  }, []);

  // --- Handlers for Interactive Features ---
  const handleCompoundChange = (cpd: string) => {
    setSelectedCompound(cpd);
    audioManager.play('tap');
  };

  const handleSimulateViscosityDrop = () => {
    audioManager.play('whoosh');
    let time = 1.2;
    if (selectedCompound === 'Glycerol') time = 12.8;
    else if (selectedCompound === 'H2O') time = 3.1;
    else if (selectedCompound === 'Ethanol') time = 2.4;
    setViscosityFallTime(time);
  };

  // --- Challenge Submission Logic ---
  const currentChallenge = CHALLENGES[challengeIdx];

  const handleAnswerChallenge = () => {
    if (!currentChallenge) return;
    let isCorrect = false;

    if (currentChallenge.type === 'multiple-choice') {
      if (selectedOption === null) return;
      isCorrect = selectedOption === currentChallenge.correctIndex;
    } else if (currentChallenge.type === 'numeric') {
      const val = parseFloat(numericInput);
      if (isNaN(val)) return;
      const target = currentChallenge.correctAnswer ?? 0;
      const tol = currentChallenge.tolerance ?? 0.1;
      isCorrect = Math.abs(val - target) <= tol;
    }

    const nodeId = currentChallenge.nodeId;
    const updatedBkt = bktUpdate(bktStates[nodeId], isCorrect);
    setBktStates((prev) => ({ ...prev, [nodeId]: updatedBkt }));

    const updatedSrs = sm2Update(srsItem, isCorrect ? 5 : 2);
    setSrsItem(updatedSrs);

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1500);

      setFeedbackMessage('Correct! Excellent chemical insight.');
      setChallengeScore((prev) => prev + 10);

      if (challengeIdx < CHALLENGES.length - 1) {
        setTimeout(() => {
          setChallengeIdx((prev) => prev + 1);
          setSelectedOption(null);
          setNumericInput('');
          setFeedbackMessage('');
          setCurrentHintIndex(0);
        }, 1200);
      } else {
        setChallengeCompleted(true);
        setShowConfetti(true);
        setShowSuccess(true);
        audioManager.play('celebration');
        speechManager.speak('Congratulations! You have mastered all hydrogen bonding challenges!');
        const finalScore = challengeScore + 10;
        recordGameScore('c11_chem_hydrogen_bonding', finalScore);
        if (onComplete) onComplete(finalScore);
      }
    } else {
      audioManager.play('drop-wrong');
      setFeedbackMessage('Incorrect. Examine molecular polarity and hydrogen bonding rules.');
      speechManager.speak('That answer is incorrect. Review the hints.');
    }
  };

  // Diagnostic submission
  const handleDiagnosticSubmit = () => {
    setDiagnosticSubmitted(true);
    let correctCount = 0;
    diagnosticAnswers.forEach((ans, idx) => {
      if (ans === DIAGNOSTIC_QUESTIONS[idx].correctIndex) correctCount++;
    });

    if (correctCount >= 2) {
      audioManager.play('success');
      speechManager.speak('Great diagnostic result! You are ready for advanced lab work.');
    } else {
      audioManager.play('error');
    }
  };

  // Calculate Overall Node Mastery Average
  const overallMastery = useMemo(() => {
    let sum = 0;
    ALL_NODE_IDS.forEach((id) => {
      sum += masteryProb(bktStates[id]);
    });
    return Math.round((sum / ALL_NODE_IDS.length) * 100);
  }, [bktStates]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8">
      {/* Dynamic Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />

      {/* Header Banner */}
      <header className="max-w-7xl mx-auto mb-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="bg-gold-500/10 text-gold-400 border border-gold-500/30 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Class 11 ISC Chemistry
            </span>
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Mastery: {overallMastery}%
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2 tracking-tight">
            {SCENARIO.title}
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            {SCENARIO.intro}
          </p>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex flex-wrap gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {[
            { id: 'discovery', label: '1. Discovery' },
            { id: 'lab', label: '2. Lab Explorer' },
            { id: 'challenges', label: '3. Challenges' },
            { id: 'misconceptions', label: '4. Misconceptions' },
            { id: 'diagnostic', label: '5. Diagnostic' },
            { id: 'summary', label: '6. Summary' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as typeof activeTab);
                audioManager.play('tap');
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto">
        {/* ================= TABS 1: DISCOVERY ================= */}
        {activeTab === 'discovery' && (
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-8">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-gold-400">Phase 1: Guided Discovery</h2>
              <p className="text-slate-300 text-sm mt-1">{SCENARIO.context}</p>
            </div>

            {/* Discovery Question Box */}
            <div className="bg-slate-950 p-6 rounded-xl border border-gold-900/40 space-y-4">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wide">Key Discovery Question</span>
              <h3 className="text-lg font-semibold text-white">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDiscoveryAnswer(idx);
                      audioManager.play('tap');
                    }}
                    className={`p-4 rounded-xl text-left text-sm transition-all border ${
                      discoveryAnswer === idx
                        ? 'border-gold-500 bg-gold-950/60 text-gold-200 font-semibold'
                        : 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-850'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                  </button>
                ))}
              </div>

              {!discoverySubmitted ? (
                <button
                  disabled={discoveryAnswer === null}
                  onClick={() => {
                    setDiscoverySubmitted(true);
                    if (discoveryAnswer === DISCOVERY_QUESTION.correctIndex) {
                      audioManager.play('success');
                      speechManager.speak('Spot on! Open cage structure explains ice floating.');
                    } else {
                      audioManager.play('error');
                    }
                  }}
                  className="mt-4 px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-sm font-bold rounded-xl shadow-lg transition-all disabled:opacity-50"
                >
                  Verify Hypothesis
                </button>
              ) : (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mt-4 text-sm">
                  {discoveryAnswer === DISCOVERY_QUESTION.correctIndex ? (
                    <div className="text-emerald-400 font-semibold">
                      ✓ Correct! {DISCOVERY_QUESTION.hintAfter}
                    </div>
                  ) : (
                    <div className="text-amber-400">
                      ✗ Not quite right. {DISCOVERY_QUESTION.hintAfter}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Render Prediction Questions (MANDATORY SECTION 4) */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-200">Interactive Predictions</h3>
              {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                <div key={pIdx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-xs text-amber-400 font-semibold">Prediction #{pIdx + 1}</div>
                  <div className="text-sm font-semibold text-slate-100">{pred.question}</div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {pred.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          const updated = [...predictionAnswers];
                          updated[pIdx] = oIdx;
                          setPredictionAnswers(updated);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-lg text-left text-xs transition-all border ${
                          predictionAnswers[pIdx] === oIdx
                            ? 'border-amber-500 bg-amber-950/40 text-amber-200'
                            : 'border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-850'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {!predictionSubmitted[pIdx] ? (
                    <button
                      disabled={predictionAnswers[pIdx] === null}
                      onClick={() => {
                        const updated = [...predictionSubmitted];
                        updated[pIdx] = true;
                        setPredictionSubmitted(updated);
                        audioManager.play('pop');
                      }}
                      className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg transition-all disabled:opacity-50"
                    >
                      Check Prediction
                    </button>
                  ) : (
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300">
                      {predictionAnswers[pIdx] === pred.correctIndex ? (
                        <span className="text-emerald-400 font-semibold">✓ Verified! {pred.verifyInstruction}</span>
                      ) : (
                        <span className="text-amber-400">✗ Re-examine in Lab Explorer. {pred.verifyInstruction}</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= TABS 2: LAB EXPLORER ================= */}
        {activeTab === 'lab' && (
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-gold-400">Phase 2: Interactive Exploration Labs</h2>
                <p className="text-slate-400 text-xs mt-1">Select a guided laboratory module and adjust dynamic thermal parameters.</p>
              </div>

              {/* Lab Step Selector Buttons */}
              <div className="flex flex-wrap gap-2">
                {EXPLORATION_STEPS.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentStepIndex(idx);
                      audioManager.play('whoosh');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                      currentStepIndex === idx
                        ? 'bg-gold-600 border-gold-400 text-white shadow-md shadow-gold-600/30'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-850'
                    }`}
                  >
                    Lab {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Lab Instruction Card */}
            <div className="bg-slate-950 p-4 rounded-xl border border-gold-800/40 flex items-start gap-3">
              <span className="text-2xl">🧪</span>
              <div>
                <h3 className="text-sm font-bold text-gold-300">{EXPLORATION_STEPS[currentStepIndex].title}</h3>
                <p className="text-xs text-slate-300 mt-1">{EXPLORATION_STEPS[currentStepIndex].instruction}</p>
              </div>
            </div>

            {/* Interactive Canvas Visualizer */}
            <div className="space-y-4">
              <InteractiveMoleculeCanvas selectedCompound={selectedCompound} temperatureK={temperatureK} />

              {/* Interactive Controls Bar */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Compound Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-2 uppercase">Select Compound</label>
                  <select
                    value={selectedCompound}
                    onChange={(e) => handleCompoundChange(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-gold-500 outline-none"
                  >
                    <option value="H2O">Water (H2O) - Extensive 3D H-Bonds</option>
                    <option value="HF">Hydrogen Fluoride (HF) - Hexamer Chains</option>
                    <option value="NH3">Ammonia (NH3) - 1 H-Bond per molecule avg</option>
                    <option value="CH4">Methane (CH4) - Non-Polar (No H-Bonds)</option>
                    <option value="Ethanol">Ethanol (C2H5OH) - Monomeric H-Bonding</option>
                    <option value="Glycerol">Glycerol - Tri-hydroxyl Viscous Network</option>
                  </select>
                </div>

                {/* Temperature Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">System Temperature</label>
                    <span className="text-xs font-mono text-amber-400 font-bold">{temperatureK} K ({temperatureK - 273}°C)</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="500"
                    step="5"
                    value={temperatureK}
                    onChange={(e) => setTemperatureK(Number(e.target.value))}
                    className="w-full accent-gold-500 cursor-pointer"
                  />
                </div>

                {/* Experiment Action */}
                <div className="flex flex-col justify-end">
                  <button
                    onClick={handleSimulateViscosityDrop}
                    className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-all shadow-lg"
                  >
                    Run Viscosity Drop Test
                  </button>
                  {viscosityFallTime !== null && (
                    <div className="text-center text-xs text-emerald-400 mt-2 font-mono">
                      Sphere Fall Time: {viscosityFallTime} seconds
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Dynamic Diagram Display Based on Lab Step */}
            <div className="mt-8 space-y-6">
              <h3 className="text-base font-bold text-slate-200">Structural & Thermodynamic Diagrams</h3>
              {currentStepIndex === 1 && <IsomerBondingDiagram />}
              {currentStepIndex === 2 && <HydrideBoilingPointChart />}
              {currentStepIndex === 4 && <DnaBasePairDiagram />}
              {currentStepIndex !== 1 && currentStepIndex !== 2 && currentStepIndex !== 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <IsomerBondingDiagram />
                  <HydrideBoilingPointChart />
                </div>
              )}
            </div>

            {/* Render Observation Questions (MANDATORY SECTION 5) */}
            <div className="space-y-6 mt-8 border-t border-slate-800 pt-6">
              <h3 className="text-lg font-bold text-slate-200">Lab Observation Checks</h3>
              {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                <div key={oIdx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-xs text-gold-400 font-semibold">Observation Lab Task #{oIdx + 1}</div>
                  <div className="text-sm font-semibold text-slate-100">{obs.question}</div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {obs.observableOptions.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => {
                          const updated = [...observationAnswers];
                          updated[oIdx] = optIdx;
                          setObservationAnswers(updated);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-lg text-left text-xs transition-all border ${
                          observationAnswers[oIdx] === optIdx
                            ? 'border-gold-500 bg-gold-950/40 text-gold-200'
                            : 'border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-850'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {!observationSubmitted[oIdx] ? (
                    <button
                      disabled={observationAnswers[oIdx] === null}
                      onClick={() => {
                        const updated = [...observationSubmitted];
                        updated[oIdx] = true;
                        setObservationSubmitted(updated);
                        audioManager.play('balance');
                      }}
                      className="px-4 py-1.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-lg transition-all disabled:opacity-50"
                    >
                      Verify Observation
                    </button>
                  ) : (
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs">
                      {observationAnswers[oIdx] === obs.correctIndex ? (
                        <span className="text-emerald-400 font-semibold">✓ Correctly Observed! Great analytical observation.</span>
                      ) : (
                        <span className="text-amber-400">✗ Re-examine the interactive models above.</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= TABS 3: CHALLENGES ================= */}
        {activeTab === 'challenges' && (
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-gold-400">Phase 3: ISC Challenge Engine (22+ Items)</h2>
                <p className="text-slate-400 text-xs mt-1">Adaptive mastery engine driven by Bayesian Knowledge Tracing & SM-2 Spaced Repetition.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-xs font-mono bg-slate-950 px-3 py-1.5 rounded-lg stroke-slate-700 border border-slate-800">
                  Challenge <span className="text-gold-400 font-bold">{challengeIdx + 1}</span> of {CHALLENGES.length}
                </div>
                <div className="text-xs font-mono bg-slate-950 px-3 py-1.5 rounded-lg stroke-slate-700 border border-slate-800">
                  Score: <span className="text-emerald-400 font-bold">{challengeScore} pts</span>
                </div>
              </div>
            </div>

            {/* Inactivity Hint Bubble */}
            <HintBubble
              show={showHint}
              text={currentChallenge.hints[currentHintIndex] || 'Recall: F, O, N attached to H form strong dipole interactions!'}
            />

            {/* Challenge Card */}
            {!challengeCompleted && currentChallenge ? (
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full ${
                    currentChallenge.difficulty === 'foundation'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : currentChallenge.difficulty === 'standard'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                  }`}>
                    {currentChallenge.difficulty} Tier • {currentChallenge.competencyLevel}
                  </span>
                  <span className="text-xs font-mono text-slate-500">Node: {currentChallenge.nodeId}</span>
                </div>

                <h3 className="text-base md:text-lg font-bold text-white leading-relaxed">
                  {currentChallenge.question}
                </h3>

                {/* Multiple Choice Options */}
                {currentChallenge.type === 'multiple-choice' && currentChallenge.options && (
                  <div className="grid grid-cols-1 gap-3">
                    {currentChallenge.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          setSelectedOption(oIdx);
                          audioManager.play('tap');
                          resetInactivityTimer();
                        }}
                        className={`p-4 rounded-xl text-left text-sm transition-all border ${
                          selectedOption === oIdx
                            ? 'border-gold-500 bg-gold-950/60 text-gold-200 font-semibold shadow-md shadow-gold-900/30'
                            : 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-850'
                        }`}
                      >
                        <span className="font-bold mr-3">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Numeric Input Option */}
                {currentChallenge.type === 'numeric' && (
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 block">Enter Numerical Answer:</label>
                    <input
                      type="number"
                      step="any"
                      value={numericInput}
                      onChange={(e) => {
                        setNumericInput(e.target.value);
                        resetInactivityTimer();
                      }}
                      placeholder="Type number..."
                      className="w-full md:w-64 bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gold-500 outline-none font-mono"
                    />
                  </div>
                )}

                {/* Feedback Message */}
                {feedbackMessage && (
                  <div className={`p-4 rounded-xl border text-sm font-semibold ${
                    feedbackMessage.includes('Correct')
                      ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                      : 'bg-rose-950/40 border-rose-800 text-rose-300'
                  }`}>
                    {feedbackMessage}
                  </div>
                )}

                {/* Controls Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-900">
                  <button
                    onClick={() => {
                      setShowHint(true);
                      setCurrentHintIndex((prev) => (prev + 1) % currentChallenge.hints.length);
                      audioManager.play('hint');
                    }}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold rounded-lg transition-all"
                  >
                    💡 Request Hint ({currentHintIndex + 1}/{currentChallenge.hints.length})
                  </button>

                  <button
                    onClick={handleAnswerChallenge}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-sm font-bold rounded-xl shadow-lg transition-all"
                  >
                    Submit Answer
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-950 p-8 rounded-xl border border-emerald-900/40 text-center space-y-4">
                <div className="text-5xl">🏆</div>
                <h3 className="text-2xl font-bold text-emerald-400">All Challenges Completed!</h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  You have demonstrated exceptional mastery of hydrogen bonding mechanics, density anomalies, and physical chemistry principles.
                </p>
                <div className="text-xl font-mono text-amber-400 font-bold">Total Score: {challengeScore} Points</div>
              </div>
            )}
          </section>
        )}

        {/* ================= TABS 4: MISCONCEPTIONS ================= */}
        {activeTab === 'misconceptions' && (
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-gold-400">Phase 4: Common Misconceptions & Clarifications</h2>
              <p className="text-slate-400 text-xs mt-1">Review critical intuitive traps identified by ISC chemistry examiners.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MISCONCEPTIONS.map((misc) => (
                <div key={misc.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-rose-400 uppercase tracking-wide">Misconception</span>
                      <span className="text-xs font-mono text-slate-500">{misc.nodeId}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white">{misc.title}</h3>
                    <p className="text-xs text-rose-300/80 mt-2 italic bg-rose-950/20 p-2.5 rounded-lg border border-rose-900/30">
                      "{misc.misconception}"
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-900">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Scientific Fact</span>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{misc.correction}</p>
                    <div className="mt-2 text-xs font-mono text-gold-400 bg-gold-950/30 p-2 rounded border border-gold-900/30">
                      e.g., {misc.example}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= TABS 5: DIAGNOSTIC ================= */}
        {activeTab === 'diagnostic' && (
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-gold-400">Phase 5: Diagnostic Readiness Assessment</h2>
              <p className="text-slate-400 text-xs mt-1">Quick evaluation to test core comprehension prior to final summary.</p>
            </div>

            <div className="space-y-6">
              {DIAGNOSTIC_QUESTIONS.map((q, qIdx) => (
                <div key={qIdx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-white">
                    Question {qIdx + 1}: {q.question}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          const updated = [...diagnosticAnswers];
                          updated[qIdx] = oIdx;
                          setDiagnosticAnswers(updated);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-lg text-left text-xs transition-all border ${
                          diagnosticAnswers[qIdx] === oIdx
                            ? 'border-gold-500 bg-gold-950/50 text-gold-200 font-semibold'
                            : 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-850'
                        }`}
                      >
                        <span className="font-bold mr-2">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {!diagnosticSubmitted ? (
                <button
                  disabled={diagnosticAnswers.includes(null)}
                  onClick={handleDiagnosticSubmit}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg disabled:opacity-50"
                >
                  Submit Diagnostic Evaluation
                </button>
              ) : (
                <div className="p-4 bg-slate-950 border border-emerald-900/40 rounded-xl text-center space-y-2">
                  <h4 className="text-base font-bold text-emerald-400">Diagnostic Check Evaluated!</h4>
                  <p className="text-xs text-slate-300">
                    Your answers have been stored into your local mastery profile for continuous review.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ================= TABS 6: SUMMARY ================= */}
        {activeTab === 'summary' && (
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-8">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-gold-400">Phase 6: Comprehensive Lab Summary</h2>
              <p className="text-slate-400 text-xs mt-1">Review mastered nodes, dynamic energy scaling, and real-world industrial applications.</p>
            </div>

            {/* Render Real World Activity (MANDATORY SECTION 6) */}
            <div className="bg-slate-950 p-6 rounded-xl border border-gold-900/40 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏭</span>
                <div>
                  <h3 className="text-base font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
                  <p className="text-xs text-slate-300 mt-1">{REAL_WORLD_ACTIVITY.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {REAL_WORLD_ACTIVITY.steps.map((step, sIdx) => (
                  <div key={sIdx} className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1">
                    <div className="text-gold-400 font-bold uppercase">Engineering Step {sIdx + 1}</div>
                    <p className="leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Node Mastery Breakdown Table */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-200">Covered ISC Node Knowledge Graph</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ALL_NODE_IDS.map((nodeId) => {
                  const level = masteryProb(bktStates[nodeId]);
                  const pct = Math.round(level * 100);
                  return (
                    <div key={nodeId} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-mono font-bold text-gold-400">{nodeId}</span>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {nodeId === 'c11_chem_041' && 'Definition & Electronegativity'}
                          {nodeId === 'c11_chem_042' && 'Donor/Acceptor Atomic Size Criteria'}
                          {nodeId === 'c11_chem_043' && 'Intermolecular H-Bonding Systems'}
                          {nodeId === 'c11_chem_044' && 'Intramolecular Ring Chelation'}
                          {nodeId === 'c11_chem_045' && 'Hydride Boiling Point Anomalies'}
                          {nodeId === 'c11_chem_046' && 'Rheology & Surface Tension'}
                          {nodeId === 'c11_chem_047' && 'Organic Solutes Solubility'}
                          {nodeId === 'c11_chem_048' && 'Density Anomaly & Ice Lattice'}
                          {nodeId === 'c11_chem_049' && 'DNA Base Pair Thermal Stability'}
                          {nodeId === 'c11_chem_050' && 'Comparative Bond Energies'}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-emerald-400">{pct}%</span>
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Final Completion Action */}
            <div className="text-center pt-4">
              <button
                onClick={() => {
                  audioManager.play('celebration');
                  speechManager.speak('Simulation session finalized. Mastery score recorded!');
                  const score = challengeScore + 20;
                  recordGameScore('c11_chem_hydrogen_bonding', score);
                  if (onComplete) onComplete(score);
                }}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl shadow-xl transition-all"
              >
                Finalize Simulation & Save Progress
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}