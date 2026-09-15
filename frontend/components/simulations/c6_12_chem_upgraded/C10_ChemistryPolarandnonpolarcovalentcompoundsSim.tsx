'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ============================================================================
// NODE DEFINITIONS & CONSTANTS
// ============================================================================

const NODE_IDS = {
  COVALENT_SHARING: 'c10_chem_011',
  ELECTRONEGATIVITY: 'c10_chem_012',
  NONPOLAR_BONDS: 'c10_chem_013',
  POLAR_BONDS: 'c10_chem_014',
  GEOMETRY_DIPOLE: 'c10_chem_015',
  PHYSICAL_PROPERTIES: 'c10_chem_016',
  SOLUBILITY: 'c10_chem_017',
  IONIZATION_CONDUCTIVITY: 'c10_chem_018',
  VECTOR_ADDITION: 'c10_chem_019',
  BOARD_APPLICATIONS: 'c10_chem_020',
} as const;

const ALL_NODE_IDS = [
  NODE_IDS.COVALENT_SHARING,
  NODE_IDS.ELECTRONEGATIVITY,
  NODE_IDS.NONPOLAR_BONDS,
  NODE_IDS.POLAR_BONDS,
  NODE_IDS.GEOMETRY_DIPOLE,
  NODE_IDS.PHYSICAL_PROPERTIES,
  NODE_IDS.SOLUBILITY,
  NODE_IDS.IONIZATION_CONDUCTIVITY,
  NODE_IDS.VECTOR_ADDITION,
  NODE_IDS.BOARD_APPLICATIONS,
];

// ============================================================================
// SCENARIO & CURRICULUM CONTENT
// ============================================================================

const SCENARIO = {
  title: 'ICSE Polar & Non-Polar Chemistry Research Lab',
  intro: 'Welcome to the Advanced Chemical Structure & Bonding Virtual Laboratory. As a lead ICSE forensic chemist, you will investigate how atomic electronegativity and 3D molecular symmetry determine dipole moments, physical state, solubility in polar vs non-polar solvents, and electrolytic ionization.',
  context: 'You will analyze real molecules ranging from simple diatomics (H₂, HCl) to polyatomics (H₂O, NH₃, CO₂, CH₄, CCCl₄), measure bond polarity vectors, simulate liquid conductivity circuits, and solve ICSE Board diagnostic challenges.',
};

const DISCOVERY_QUESTION = {
  question: 'Carbon dioxide (CO₂) contains two highly polar C=O double bonds (ΔEN = 1.0), yet the overall CO₂ molecule is completely non-polar with zero net dipole moment. Why does this happen?',
  options: [
    'The carbon atom donates all its valence electrons to oxygen, turning the bond ionic.',
    'CO₂ is linear (180°), so the two equal bond dipoles point in opposite directions and cancel each other out vectorially.',
    'Carbon and oxygen have the exact same electronegativity in double bonds.',
    'Oxygen pulls electrons so hard that carbon becomes negative and cancels the dipoles.'
  ],
  correctIndex: 1,
  hintAfter: 'Dipole moment is a vector quantity! Geometry dictates whether individual bond dipoles add up or cancel out entirely in 3D space.',
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Electronegativity & Bond Polarity Scale',
    instruction: 'Adjust element selection or Pauling Electronegativity values to observe how ΔEN determines covalent electron distribution (equal sharing vs partial charges δ+ / δ-).',
    interactionType: 'electronegativity-slider',
    nodeId: NODE_IDS.ELECTRONEGATIVITY,
  },
  {
    title: 'Lab 2: 3D Molecular Geometry & Dipole Vectors',
    instruction: 'Rotate 3D structures of H₂O, NH₃, CO₂, CH₄, and CCCl₄. Toggle vector arrows to inspect individual bond dipoles and net molecular dipole moments.',
    interactionType: 'geometry-vector-visualizer',
    nodeId: NODE_IDS.GEOMETRY_DIPOLE,
  },
  {
    title: 'Lab 3: Intermolecular Forces & Volatility Simulator',
    instruction: 'Heat liquid samples of water (H₂O), ethanol, carbon tetrachloride (CCl₄), and methane (CH₄). Compare boiling points and evaporation rates based on dipole-dipole vs van der Waals forces.',
    interactionType: 'intermolecular-heat-simulation',
    nodeId: NODE_IDS.PHYSICAL_PROPERTIES,
  },
  {
    title: 'Lab 4: "Like Dissolves Like" Solubility Test Bench',
    instruction: 'Mix polar solutes (HCl, Sugar) and non-polar solutes (Iodine I₂, Grease) into polar Water (H₂O) vs non-polar Benzene (C₆H₆) / CCCl₄. Observe hydration vs solvation.',
    interactionType: 'solubility-mixer',
    nodeId: NODE_IDS.SOLUBILITY,
  },
  {
    title: 'Lab 5: Ionization & Electrolytic Conductivity Rig',
    instruction: 'Test electrical conductivity in pure liquid HCl vs aqueous HCl solution. Observe how water forces polar covalent HCl to ionize into mobile H₃O⁺ and Cl⁻ ions.',
    interactionType: 'conductivity-circuit-tester',
    nodeId: NODE_IDS.IONIZATION_CONDUCTIVITY,
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What will happen when pure liquid Hydrogen Chloride (HCl) is tested with an electric circuit, compared to when HCl is dissolved in water?',
    options: [
      'Pure liquid HCl conducts electricity strongly; aqueous HCl does not conduct.',
      'Neither pure liquid HCl nor aqueous HCl can conduct electricity because HCl is covalent.',
      'Pure liquid HCl does NOT conduct electricity (no free ions), but aqueous HCl conducts strongly due to ionization into H₃O⁺ and Cl⁻.',
      'Both pure liquid HCl and aqueous HCl conduct electricity equally well via partial charges.'
    ],
    correctIndex: 2,
    verifyInstruction: 'Go to Lab 5 (Ionization & Conductivity Rig) to connect electrodes to pure liquid HCl and aqueous HCl!',
    nodeId: NODE_IDS.IONIZATION_CONDUCTIVITY,
  },
  {
    question: 'Predict: Carbon Tetrachloride (CCl₄) has four strongly polar C-Cl bonds. What will happen when liquid CCCl₄ is mixed with water?',
    options: [
      'CCl₄ will dissolve rapidly in water because all four C-Cl bonds are polar.',
      'CCl₄ will form an immiscible separate layer because CCCl₄ is tetrahedral and symmetrical, making the overall molecule non-polar.',
      'CCl₄ will react violently with water to form ionic calcium ions.',
      'CCl₄ will ionize in water and conduct electricity.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Go to Lab 4 (Solubility Test Bench) and mix CCCl₄ with H₂O to test miscibility!',
    nodeId: NODE_IDS.SOLUBILITY,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'In Lab 2, what happens to the net dipole moment when you view symmetrical Carbon Dioxide (CO₂) vs asymmetrical Water (H₂O)?',
    observableOptions: [
      'CO₂ has a net dipole pointing up; H₂O has zero net dipole.',
      'CO₂ linear bond vectors cancel out (net dipole = 0 Debye), whereas H₂O bent geometry vectors add up (net dipole = 1.85 Debye).',
      'Both molecules have zero net dipole moment.',
      'H₂O has zero net dipole because hydrogen atoms cancel each other out.'
    ],
    correctIndex: 1,
    nodeId: NODE_IDS.VECTOR_ADDITION,
  },
  {
    question: 'In Lab 5, what key species is generated when gaseous HCl dissolves in water to allow electrical conduction?',
    observableOptions: [
      'Free uncharged Cl₂ gas molecules.',
      'Hydronium ions (H₃O⁺) and Chloride ions (Cl⁻) free to move.',
      'Electrons jumping directly through the covalent H-Cl bonds.',
      'Fixed partial charges δ+ and δ- attached to stationary molecules.'
    ],
    correctIndex: 1,
    nodeId: NODE_IDS.BOARD_APPLICATIONS,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Dry Cleaning & Environmental Chemical Extraction',
  description: 'In industrial dry cleaning and environmental oil spill cleanup, chemists use non-polar solvents like tetrachloroethylene (PERC) or liquid CCCl₄ to dissolve non-polar fats, oils, and grease without damaging hydrophobic wool/silk fabrics.',
  steps: [
    'Step 1: Identify grease/oil stains as long non-polar hydrocarbon chains (C-H bonds with ΔEN ≈ 0.35).',
    'Step 2: Select a non-polar solvent with symmetrical dipole cancellation (e.g., C₂Cl₄ or CCCl₄) so that solvent-solute London dispersion forces match.',
    'Step 3: Measure dissolution efficiency: Non-polar grease dissolves rapidly in non-polar solvent ("Like dissolves like"), leaving water-sensitive polar fabrics intact.',
    'Step 4: Analyze waste stream ionization: Verify that the spent non-polar solvent remains non-conductive (zero mobile ions), preventing electrolytic corrosion in industrial tanks.'
  ],
};

const MISCONCEPTIONS = [
  {
    misconception: 'Presence of Polar Bonds Guarantees a Polar Molecule',
    correction: 'A molecule can contain polar covalent bonds and still be non-polar overall if its molecular geometry is symmetrical. In symmetrical molecules like CO₂ or CCCl₄, individual bond dipoles pull equally in opposite directions and cancel each other out (net dipole = 0).',
  },
  {
    misconception: 'Non-Polar Covalent Bonds Only Form Between Identical Atoms',
    correction: 'Non-polar covalent bonds can also form between different elements if their electronegativity values are nearly equal. For instance, the C-H bond in methane (CH₄) is non-polar because Carbon (2.55) and Hydrogen (2.20) have very similar electronegativities.',
  },
  {
    misconception: 'Dipole Moment Is Calculated by Simple Scalar Addition',
    correction: 'Dipole moment is a vector quantity that has both magnitude and direction. The net dipole moment of a molecule is the 3D vector sum of all individual bond dipoles.',
  },
  {
    misconception: 'Covalent Compounds Never Dissolve in Water Environment',
    correction: 'Solubility follows "like dissolves like". Polar covalent compounds like glucose, ethanol, and hydrogen chloride dissolve readily in water by forming strong dipole-dipole interactions or hydrogen bonds.',
  },
  {
    misconception: 'Polar Covalent Liquids Conduct Electricity in Pure State',
    correction: 'Conduction requires mobile charged particles (ions or electrons). Partial charges (δ+, δ-) in pure polar covalent liquids are fixed within bonds and cannot move independently. Pure liquid HCl does NOT conduct; it only conducts when ionized in water.',
  },
];

// ============================================================================
// DATA STRUCTURES FOR CHALLENGES (22 ITEMS ACROSS 3 TIERS)
// ============================================================================

export interface ChallengeItem {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'drag-label' | 'vector-match' | 'numeric' | 'classification';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string | number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: ChallengeItem[] = [
  // FOUNDATION TIER (7 items)
  {
    id: 'f1',
    nodeId: NODE_IDS.COVALENT_SHARING,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What type of chemical bond is formed when two non-metal atoms share one or more pairs of electrons to achieve a stable noble gas configuration?',
    options: ['Ionic bond', 'Covalent bond', 'Metallic bond', 'Electrovalent bond'],
    correctIndex: 1,
    explanation: 'A covalent bond involves the mutual sharing of valence electrons between non-metallic atoms to achieve complete electron octets or duplets.',
    hints: ['Think about sharing vs transfer of electrons.', 'Non-metals sharing electrons form covalent bonds.', 'Mutual sharing creates covalent compounds.'],
  },
  {
    id: 'f2',
    nodeId: NODE_IDS.ELECTRONEGATIVITY,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Electronegativity is defined as the measure of an atom\'s tendency to:',
    options: [
      'Lose valence electrons to form positive cations.',
      'Attract shared pair of electrons towards itself in a covalent bond.',
      'Conduct electrical current in molten state.',
      'Repel lone pairs of electrons in a molecule.'
    ],
    correctIndex: 1,
    explanation: 'Electronegativity is the relative tendency of a bonded atom to attract the shared pair of electrons toward itself.',
    hints: ['It relates to shared electron pairs.', 'Think about pulling shared electrons.', 'Higher EN means stronger pull on shared electrons.'],
  },
  {
    id: 'f3',
    nodeId: NODE_IDS.NONPOLAR_BONDS,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following diatomic molecules contains a non-polar covalent single bond formed by equal sharing between identical atoms?',
    options: ['HCl', 'H₂', 'H₂O', 'NH₃'],
    correctIndex: 1,
    explanation: 'In H₂ (H-H), both hydrogen atoms have identical electronegativity (2.20), leading to perfectly equal sharing of electrons and a non-polar bond.',
    hints: ['Look for identical non-metal atoms.', 'H-H has zero electronegativity difference.', 'Equal sharing occurs between identical atoms.'],
  },
  {
    id: 'f4',
    nodeId: NODE_IDS.POLAR_BONDS,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In a polar covalent bond like H-Cl, which atom acquires a partial negative charge (δ-)?',
    options: [
      'Hydrogen, because it has fewer electrons.',
      'Chlorine, because it has a higher electronegativity (3.16 vs 2.20).',
      'Both atoms acquire full unit charges of -1.',
      'Neither atom; electrons are shared equally.'
    ],
    correctIndex: 1,
    explanation: 'Chlorine is more electronegative than hydrogen, so the shared electron pair is pulled closer to chlorine, giving it a fractional negative charge (δ-).',
    hints: ['Compare electronegativities of H and Cl.', 'The more electronegative atom pulls electrons.', 'More EN atom gets δ-.'],
    misconceptionIndex: 1,
  },
  {
    id: 'f5',
    nodeId: NODE_IDS.GEOMETRY_DIPOLE,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the SI/CGS unit commonly used to express molecular dipole moment (μ)?',
    options: ['Coulomb', 'Debye (D)', 'Joule', 'Faraday'],
    correctIndex: 1,
    explanation: 'Dipole moment is measured in Debye units (1 D = 3.33564 × 10⁻³⁰ C·m).',
    hints: ['Named after physical chemist Peter Debye.', 'Unit symbol is D.', 'Measures polarity magnitude.'],
  },
  {
    id: 'f6',
    nodeId: NODE_IDS.PHYSICAL_PROPERTIES,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why do non-polar covalent compounds like CH₄ or CCCl₄ generally have lower boiling points than polar compounds of similar mass?',
    options: [
      'Non-polar compounds contain strong ionic networks.',
      'Only weak London dispersion forces exist between non-polar molecules.',
      'Non-polar molecules are held together by strong hydrogen bonds.',
      'Non-polar molecules do not have covalent bonds.'
    ],
    correctIndex: 1,
    explanation: 'Non-polar molecules attract each other only via weak dispersion (van der Waals) forces, requiring very little thermal energy to separate.',
    hints: ['Consider intermolecular forces.', 'Non-polar molecules lack permanent dipoles.', 'Weak van der Waals forces break easily at low temperatures.'],
  },
  {
    id: 'f7',
    nodeId: NODE_IDS.SOLUBILITY,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The fundamental rule governing chemical solubility is summarized as:',
    options: ['"Opposites attract"', '"Like dissolves like"', '"Mass is conserved"', '"Equal volumes react"'],
    correctIndex: 1,
    explanation: '"Like dissolves like" means polar solvents dissolve polar/ionic solutes, while non-polar solvents dissolve non-polar solutes.',
    hints: ['Polar dissolves polar; non-polar dissolves non-polar.', 'Famous chemistry adage.', 'Like solutes dissolve in like solvents.'],
  },

  // STANDARD TIER (8 items)
  {
    id: 's1',
    nodeId: NODE_IDS.ELECTRONEGATIVITY,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate the electronegativity difference (ΔEN) for the H-F bond, given Pauling values: Fluorine = 3.98, Hydrogen = 2.20.',
    correctAnswer: 1.78,
    explanation: 'ΔEN = EN(F) - EN(H) = 3.98 - 2.20 = 1.78. This high difference indicates a highly polar covalent bond with strong ionic character.',
    hints: ['Subtract Hydrogen EN from Fluorine EN.', '3.98 - 2.20', 'Result is 1.78.'],
  },
  {
    id: 's2',
    nodeId: NODE_IDS.NONPOLAR_BONDS,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the C-H bond in methane (CH₄) classified as non-polar covalent despite being formed between two different non-metal elements?',
    options: [
      'Carbon and Hydrogen form ionic bonds inside methane.',
      'The electronegativity difference between C (2.55) and H (2.20) is only 0.35, which is below the ~0.4 polar threshold.',
      'Hydrogen has 4 valence electrons that surround carbon.',
      'Carbon donates electrons to hydrogen completely.'
    ],
    correctIndex: 1,
    explanation: 'Non-polar covalent character can exist between different elements if their EN values are nearly equal (ΔEN ≤ 0.4). C-H has ΔEN = 0.35.',
    hints: ['Check the EN difference between C and H.', 'ΔEN = 2.55 - 2.20 = 0.35.', 'A difference below 0.4 is considered non-polar.'],
    misconceptionIndex: 1,
  },
  {
    id: 's3',
    nodeId: NODE_IDS.GEOMETRY_DIPOLE,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare CO₂ (linear, 180°) and H₂O (bent, 104.5°). Both have polar bonds, but why does H₂O have a net dipole moment (μ = 1.85 D) while CO₂ has μ = 0 D?',
    options: [
      'H₂O contains ionic bonds, whereas CO₂ has non-polar bonds.',
      'In CO₂, opposite C=O bond dipoles cancel due to 180° symmetry; in H₂O, the bent shape causes O-H bond dipoles to add vectorially.',
      'Oxygen in CO₂ loses its electronegativity when forming double bonds.',
      'Carbon is more electronegative than Hydrogen.'
    ],
    correctIndex: 1,
    explanation: 'Vector addition of bond dipoles depends on molecular geometry. Linear 180° vectors cancel completely; bent 104.5° vectors reinforce each other.',
    hints: ['Consider vector cancellation vs vector addition.', '180° opposite vectors cancel out.', 'Bent geometry preserves net dipole.'],
    misconceptionIndex: 0,
  },
  {
    id: 's4',
    nodeId: NODE_IDS.IONIZATION_CONDUCTIVITY,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Liquid Hydrogen Chloride (pure liquid HCl at -85°C) does NOT conduct electricity, but aqueous HCl solution is an excellent conductor. Why?',
    options: [
      'Pure liquid HCl is non-polar, but aqueous HCl becomes ionic.',
      'In pure liquid state, HCl consists of neutral polar covalent molecules with fixed partial charges; in water, it undergoes ionization to form free mobile H₃O⁺ and Cl⁻ ions.',
      'Water donates electrons to pure liquid HCl to make it metallic.',
      'Pure HCl boils into a metal when mixed with water.'
    ],
    correctIndex: 1,
    explanation: 'Conduction requires mobile ions. Pure liquid HCl has partial charges locked in covalent bonds (no mobile charges). Water reacts with HCl to form hydronium (H₃O⁺) and chloride (Cl⁻) mobile ions.',
    hints: ['Think about what carries electric current.', 'Partial charges cannot move independently.', 'Ionization produces free mobile H₃O⁺ and Cl⁻.'],
    misconceptionIndex: 4,
  },
  {
    id: 's5',
    nodeId: NODE_IDS.SOLUBILITY,
    type: 'classification',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Classify Iodine (I₂) solubility in Water (H₂O) vs Carbon Tetrachloride (CCl₄):',
    options: [
      'Insoluble in H₂O, Soluble in CCCl₄',
      'Soluble in H₂O, Insoluble in CCCl₄',
      'Soluble in both H₂O and CCCl₄',
      'Insoluble in both H₂O and CCCl₄'
    ],
    correctIndex: 0,
    explanation: 'Iodine (I₂) is a non-polar covalent solute. Applying "like dissolves like", I₂ is insoluble in polar Water (H₂O) but readily dissolves in non-polar CCCl₄ to form a violet solution.',
    hints: ['I₂ is non-polar (I-I bond).', 'Water is polar; CCCl₄ is non-polar.', 'Non-polar solutes dissolve in non-polar solvents.'],
  },
  {
    id: 's6',
    nodeId: NODE_IDS.VECTOR_ADDITION,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In ammonia (NH₃), the geometry is trigonal pyramidal (107°) with a lone pair on nitrogen. How does the lone pair affect the net dipole moment?',
    options: [
      'The lone pair dipole cancels out the N-H bond dipoles, making NH₃ non-polar.',
      'The lone pair orbital dipole points in the same general direction as the N-H bond dipoles, significantly increasing the net dipole moment (1.47 D).',
      'Lone pairs have zero dipole effect because they do not involve bonds.',
      'The lone pair causes NH₃ to become a linear non-polar molecule.'
    ],
    correctIndex: 1,
    explanation: 'The lone pair orbital dipole on nitrogen reinforces the vectors of the three N-H bonds (where N is δ-), resulting in a strong net dipole moment.',
    hints: ['Nitrogen is more EN than Hydrogen.', 'The lone pair electron density pulls towards the apex.', 'Orbital dipole and bond dipoles reinforce each other.'],
  },
  {
    id: 's7',
    nodeId: NODE_IDS.BOARD_APPLICATIONS,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An ICSE lab unknown liquid X does not dissolve in water, does not conduct electricity in any state, and easily dissolves naphthalene. Liquid X is most likely:',
    options: ['Aqueous Sodium Chloride (NaCl)', 'Pure Hydrogen Chloride (HCl)', 'Carbon Tetrachloride (CCl₄)', 'Liquid Ammonia (NH₃)'],
    correctIndex: 2,
    explanation: 'CCl₄ is a non-polar covalent liquid: immiscible with polar water, non-conductive, and dissolves non-polar organic compounds like naphthalene.',
    hints: ['It is non-polar.', 'Naphthalene is non-polar organic.', 'Non-polar liquid organic solvent.'],
  },
  {
    id: 's8',
    nodeId: NODE_IDS.POLAR_BONDS,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arranging H-F, H-Cl, H-Br, H-I in order of DECREASING bond polarity (highest to lowest ΔEN):',
    options: [
      'H-I > H-Br > H-Cl > H-F',
      'H-F > H-Cl > H-Br > H-I',
      'H-Cl > H-F > H-I > H-Br',
      'H-F > H-I > H-Cl > H-Br'
    ],
    correctIndex: 1,
    explanation: 'Electronegativity decreases down Group 17 (F: 3.98, Cl: 3.16, Br: 2.96, I: 2.66). Therefore, ΔEN with Hydrogen (2.20) decreases: H-F (1.78) > H-Cl (0.96) > H-Br (0.76) > H-I (0.46).',
    hints: ['Check halogen electronegativities down the group.', 'Fluorine is the most electronegative element.', 'Polarity drops as halogen electronegativity decreases.'],
  },

  // ADVANCED TIER (7 items)
  {
    id: 'a1',
    nodeId: NODE_IDS.GEOMETRY_DIPOLE,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Consider Tetrafluoromethane (CF₄) vs Trifluoromethane (CHF₃). Both are tetrahedral. Why is CF₄ non-polar (μ = 0 D) while CHF₃ is strongly polar (μ = 1.65 D)?',
    options: [
      'CF₄ contains non-polar C-F bonds, whereas CHF₃ contains ionic bonds.',
      'In CF₄, four identical C-F bond dipoles cancel symmetrically in 3D tetrahedral space. In CHF₃, the C-H bond dipole differs in magnitude and direction from C-F, breaking symmetry.',
      'CHF₃ is planar, while CF₄ is 3D.',
      'Fluorine in CHF₃ loses its charge due to hydrogen interference.'
    ],
    correctIndex: 1,
    explanation: 'Symmetry requires ALL surrounding atoms to be identical for complete tetrahedral cancellation. In CHF₃, replacing one F with H destroys 3D vector symmetry, producing a net dipole.',
    hints: ['Look at tetrahedral symmetry.', '4 identical C-F vectors sum to zero vector.', 'Replacing one F with H creates an unbalanced net vector.'],
    misconceptionIndex: 2,
  },
  {
    id: 'a2',
    nodeId: NODE_IDS.VECTOR_ADDITION,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A planar molecule AX₂ has two identical polar bonds A-X with bond dipole magnitude 1.5 D each. If the bond angle X-A-X is 180°, calculate the net molecular dipole moment in Debye.',
    correctAnswer: 0,
    explanation: 'For a linear 180° molecule, Net Dipole = μ₁ - μ₂ = 1.5 D - 1.5 D = 0 D.',
    hints: ['Vectors point in opposite directions (180°).', 'μ_net = μ₁ + μ₂ cos(180°)', '1.5 - 1.5 = 0.'],
  },
  {
    id: 'a3',
    nodeId: NODE_IDS.IONIZATION_CONDUCTIVITY,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'When dry HCl gas is bubbled into non-polar Toluene solvent, the resulting solution DOES NOT conduct electricity and does NOT turn dry blue litmus paper red. Why?',
    options: [
      'Toluene decomposes HCl into hydrogen gas and chlorine gas.',
      'Toluene is a non-polar solvent that cannot form hydrogen bonds or hydrate protons; thus, HCl remains as un-ionized covalent molecules.',
      'HCl becomes a solid precipitate in toluene.',
      'Litmus paper only works for ionic solids, not gases.'
    ],
    correctIndex: 1,
    explanation: 'Ionization of a polar covalent acid requires a high dielectric constant polar solvent (like H₂O) capable of accepting protons (forming H₃O⁺). Non-polar solvents (toluene, benzene) cannot induce ionization.',
    hints: ['Non-polar solvents have low dielectric constants.', 'Ionization requires proton transfer to solvent.', 'Without H₃O⁺ ions, acid properties and conductivity fail.'],
  },
  {
    id: 'a4',
    nodeId: NODE_IDS.PHYSICAL_PROPERTIES,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Water (H₂O, MW = 18 g/mol) boils at +100°C, while Hydrogen Sulfide (H₂S, MW = 34 g/mol) boils at -60°C. Despite H₂S being heavier, why is H₂O\'s boiling point 160°C higher?',
    options: [
      'H₂O forms strong intermolecular Hydrogen Bonds due to high O electronegativity (3.44), whereas H₂S only forms weak dipole-dipole forces.',
      'H₂S is a non-polar linear molecule with zero dipole moment.',
      'Water undergoes complete ionic dissociation at room temperature.',
      'Sulfur atoms absorb heat energy without changing state.'
    ],
    correctIndex: 0,
    explanation: 'Oxygen is small and highly electronegative (3.44 vs S 2.58), allowing H₂O molecules to form strong extensive 3D hydrogen bonding networks requiring immense thermal energy to break.',
    hints: ['Consider special intermolecular forces.', 'Oxygen vs Sulfur electronegativity.', 'Hydrogen bonding in H₂O vs dipole-dipole in H₂S.'],
  },
  {
    id: 'a5',
    nodeId: NODE_IDS.BOARD_APPLICATIONS,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In an ICSE experimental investigation, a student passes electric current through: (I) Pure liquid H₂O, (II) Pure liquid CCCl₄, (III) Liquid HCl in Water, (IV) Liquid HCl in Benzene. Which system will light up the circuit bulb brightly?',
    options: ['II and IV', 'III only', 'I and III', 'All four systems'],
    correctIndex: 1,
    explanation: 'Only System III (HCl in Water) contains free mobile ions (H₃O⁺ and Cl⁻) in sufficient concentration to conduct electricity brightly. Pure liquid H₂O is extremely weakly ionized, CCCl₄ is non-polar non-electrolyte, and HCl in Benzene is un-ionized.',
    hints: ['Mobile ions are mandatory for bright conduction.', 'Non-polar solvents prevent ionization.', 'HCl ionizes in H₂O to form mobile H₃O⁺ and Cl⁻.'],
  },
  {
    id: 'a6',
    nodeId: NODE_IDS.ELECTRONEGATIVITY,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'According to Linus Pauling\'s scale, a chemical bond is generally considered predominantly IONIC (over 50% ionic character) when the electronegativity difference ΔEN is:',
    options: ['Greater than 1.7', 'Less than 0.4', 'Exactly 0.0', 'Between 0.4 and 0.8'],
    correctIndex: 0,
    explanation: 'On the Pauling scale, ΔEN > 1.7 corresponds to >50% ionic character. ΔEN < 0.4 is non-polar covalent, and 0.4 ≤ ΔEN ≤ 1.7 is polar covalent.',
    hints: ['0 to 0.4 = Non-polar covalent.', '0.4 to 1.7 = Polar covalent.', '> 1.7 = Predominantly ionic.'],
  },
  {
    id: 'a7',
    nodeId: NODE_IDS.VECTOR_ADDITION,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Predict the net dipole moment of Phosphorus Pentachloride (PCl₅, trigonal bipyramidal geometry with 3 equatorial bonds at 120° and 2 axial bonds at 180°):',
    options: [
      'Zero (μ = 0 D) because axial dipoles cancel each other (180°) and 3 equatorial dipoles cancel symmetrically (120°).',
      'High dipole moment (μ = 3.5 D) due to 5 polar P-Cl bonds.',
      'Polar because axial bonds pull harder than equatorial bonds.',
      'Undefined because phosphorus expands its octet.'
    ],
    correctIndex: 0,
    explanation: 'Trigonal bipyramidal PCl₅ is perfectly symmetrical: the 2 axial P-Cl vectors cancel at 180°, and the 3 equatorial P-Cl vectors sum to zero in the equatorial plane (120° apart). Thus net μ = 0 D.',
    hints: ['Check 3D spatial symmetry.', 'Axial bonds cancel at 180°.', 'Equatorial bonds at 120° in a plane sum to zero vector.'],
    misconceptionIndex: 0,
  },
];

// ============================================================================
// MOLECULAR DATA FOR LAB SIMULATORS
// ============================================================================

interface MoleculeData {
  id: string;
  name: string;
  formula: string;
  geometry: string;
  bondAngle: string;
  enDiff: number;
  isPolar: boolean;
  netDipole: number; // Debye
  boilingPoint: number; // °C
  solubilityInWater: string;
  solubilityInCCl4: string;
  conductsAqueous: boolean;
  conductsPure: boolean;
  structureSvgType: 'linear' | 'bent' | 'trigonalPyramidal' | 'tetrahedral' | 'diatomic';
}

const MOLECULES_DB: Record<string, MoleculeData> = {
  H2: {
    id: 'H2',
    name: 'Hydrogen',
    formula: 'H₂',
    geometry: 'Linear (Diatomic)',
    bondAngle: '180°',
    enDiff: 0.0,
    isPolar: false,
    netDipole: 0.0,
    boilingPoint: -252.9,
    solubilityInWater: 'Insoluble',
    solubilityInCCl4: 'Slightly Soluble',
    conductsAqueous: false,
    conductsPure: false,
    structureSvgType: 'diatomic',
  },
  HCl: {
    id: 'HCl',
    name: 'Hydrogen Chloride',
    formula: 'HCl',
    geometry: 'Linear (Diatomic)',
    bondAngle: '180°',
    enDiff: 0.96,
    isPolar: true,
    netDipole: 1.08,
    boilingPoint: -85.0,
    solubilityInWater: 'Highly Soluble (Ionizes)',
    solubilityInCCl4: 'Insoluble',
    conductsAqueous: true,
    conductsPure: false,
    structureSvgType: 'diatomic',
  },
  H2O: {
    id: 'H2O',
    name: 'Water',
    formula: 'H₂O',
    geometry: 'Bent / V-Shaped',
    bondAngle: '104.5°',
    enDiff: 1.24,
    isPolar: true,
    netDipole: 1.85,
    boilingPoint: 100.0,
    solubilityInWater: 'Self / Miscible',
    solubilityInCCl4: 'Immiscible',
    conductsAqueous: true, // Weakly pure, strongly with electrolytes
    conductsPure: false,
    structureSvgType: 'bent',
  },
  NH3: {
    id: 'NH3',
    name: 'Ammonia',
    formula: 'NH₃',
    geometry: 'Trigonal Pyramidal',
    bondAngle: '107.0°',
    enDiff: 0.84,
    isPolar: true,
    netDipole: 1.47,
    boilingPoint: -33.3,
    solubilityInWater: 'Extremely Soluble',
    solubilityInCCl4: 'Insoluble',
    conductsAqueous: true,
    conductsPure: false,
    structureSvgType: 'trigonalPyramidal',
  },
  CO2: {
    id: 'CO2',
    name: 'Carbon Dioxide',
    formula: 'CO₂',
    geometry: 'Linear Symmetrical',
    bondAngle: '180°',
    enDiff: 1.00,
    isPolar: false,
    netDipole: 0.0,
    boilingPoint: -78.5,
    solubilityInWater: 'Slightly Soluble',
    solubilityInCCl4: 'Soluble',
    conductsAqueous: false,
    conductsPure: false,
    structureSvgType: 'linear',
  },
  CH4: {
    id: 'CH4',
    name: 'Methane',
    formula: 'CH₄',
    geometry: 'Tetrahedral Symmetrical',
    bondAngle: '109.5°',
    enDiff: 0.35,
    isPolar: false,
    netDipole: 0.0,
    boilingPoint: -161.5,
    solubilityInWater: 'Insoluble',
    solubilityInCCl4: 'Highly Soluble',
    conductsAqueous: false,
    conductsPure: false,
    structureSvgType: 'tetrahedral',
  },
  CCl4: {
    id: 'CCl4',
    name: 'Carbon Tetrachloride',
    formula: 'CCl₄',
    geometry: 'Tetrahedral Symmetrical',
    bondAngle: '109.5°',
    enDiff: 0.61,
    isPolar: false,
    netDipole: 0.0,
    boilingPoint: 76.7,
    solubilityInWater: 'Immiscible',
    solubilityInCCl4: 'Self / Solvent',
    conductsAqueous: false,
    conductsPure: false,
    structureSvgType: 'tetrahedral',
  },
};

// ============================================================================
// SVG DIAGRAM SUBCOMPONENTS
// ============================================================================

// DIAGRAM 1: Molecular Dipole & Vector Visualization SVG
const MolecularDipoleSVG: React.FC<{
  moleculeKey: string;
  showVectors: boolean;
  rotationAngle: number;
}> = ({ moleculeKey, showVectors, rotationAngle }) => {
  const mol = MOLECULES_DB[moleculeKey] || MOLECULES_DB.H2O;

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-700 shadow-inner">
      <div className="text-xs font-mono text-cyan-400 mb-2 flex items-center gap-2">
        <span>3D Molecular View: {mol.name} ({mol.formula})</span>
        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-600">
          Geometry: {mol.geometry}
        </span>
      </div>

      <svg
        viewBox="0 0 400 300"
        className="w-full max-w-md h-64 transition-transform duration-300 ease-out"
        style={{ transform: `rotateY(${rotationAngle}deg)` }}
      >
        <defs>
          <radialGradient id="gradOxygen" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#991b1b" />
          </radialGradient>
          <radialGradient id="gradHydrogen" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#94a3b8" />
          </radialGradient>
          <radialGradient id="gradChlorine" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#14532d" />
          </radialGradient>
          <radialGradient id="gradCarbon" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#1e293b" />
          </radialGradient>
          <radialGradient id="gradNitrogen" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </radialGradient>

          <marker id="arrowRed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
          </marker>
          <marker id="arrowCyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
          </marker>
        </defs>

        {/* Dynamic rendering based on molecule geometry */}
        {mol.structureSvgType === 'bent' && (
          <g>
            {/* H2O Bent Geometry */}
            {/* Bonds */}
            <line x1="200" y1="120" x2="130" y2="210" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
            <line x1="200" y1="120" x2="270" y2="210" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />

            {/* Lone Pairs */}
            <ellipse cx="170" cy="80" rx="14" ry="8" fill="rgba(59, 130, 246, 0.25)" stroke="#3b82f6" strokeDasharray="2,2" />
            <ellipse cx="230" cy="80" rx="14" ry="8" fill="rgba(59, 130, 246, 0.25)" stroke="#3b82f6" strokeDasharray="2,2" />

            {/* Central Oxygen */}
            <circle cx="200" cy="120" r="32" fill="url(#gradOxygen)" />
            <text x="200" y="125" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="16">O (δ⁻)</text>

            {/* Hydrogens */}
            <circle cx="130" cy="210" r="22" fill="url(#gradHydrogen)" />
            <text x="130" y="215" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="13">H (δ⁺)</text>

            <circle cx="270" cy="210" r="22" fill="url(#gradHydrogen)" />
            <text x="270" y="215" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="13">H (δ⁺)</text>

            {/* Vector Dipoles */}
            {showVectors && (
              <g>
                <line x1="140" y1="195" x2="185" y2="138" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowRed)" />
                <line x1="260" y1="195" x2="215" y2="138" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowRed)" />
                {/* Net Dipole Vector */}
                <line x1="200" y1="230" x2="200" y2="40" stroke="#06b6d4" strokeWidth="5" strokeDasharray="4,2" markerEnd="url(#arrowCyan)" />
                <text x="215" y="45" fill="#06b6d4" fontWeight="bold" fontSize="14">NET μ = 1.85 D</text>
              </g>
            )}
          </g>
        )}

        {mol.structureSvgType === 'linear' && mol.id === 'CO2' && (
          <g>
            {/* CO2 Linear Geometry */}
            <line x1="100" y1="150" x2="200" y2="150" stroke="#cbd5e1" strokeWidth="12" />
            <line x1="200" y1="150" x2="300" y2="150" stroke="#cbd5e1" strokeWidth="12" />

            {/* Oxygen Left */}
            <circle cx="100" cy="150" r="28" fill="url(#gradOxygen)" />
            <text x="100" y="155" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">O (δ⁻)</text>

            {/* Carbon Center */}
            <circle cx="200" cy="150" r="26" fill="url(#gradCarbon)" />
            <text x="200" y="155" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">C (δ⁺)</text>

            {/* Oxygen Right */}
            <circle cx="300" cy="150" r="28" fill="url(#gradOxygen)" />
            <text x="300" y="155" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">O (δ⁻)</text>

            {/* Vector Dipoles */}
            {showVectors && (
              <g>
                <line x1="180" y1="110" x2="115" y2="110" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowRed)" />
                <line x1="220" y1="110" x2="285" y2="110" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowRed)" />
                <text x="200" y="80" textAnchor="middle" fill="#10b981" fontWeight="bold" fontSize="14">
                  Equal & Opposite Dipoles Cancel (180°)
                </text>
                <text x="200" y="210" textAnchor="middle" fill="#06b6d4" fontWeight="bold" fontSize="16">
                  NET μ = 0.00 D (NON-POLAR)
                </text>
              </g>
            )}
          </g>
        )}

        {mol.structureSvgType === 'diatomic' && (
          <g>
            {/* HCl or H2 Diatomic */}
            <line x1="130" y1="150" x2="270" y2="150" stroke="#cbd5e1" strokeWidth="10" />
            <circle cx="130" cy="150" r="24" fill="url(#gradHydrogen)" />
            <text x="130" y="155" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="13">
              H {mol.isPolar ? '(δ⁺)' : ''}
            </text>

            <circle cx="270" cy="150" r={mol.id === 'HCl' ? '32' : '24'} fill={mol.id === 'HCl' ? 'url(#gradChlorine)' : 'url(#gradHydrogen)'} />
            <text x="270" y="155" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">
              {mol.id === 'HCl' ? 'Cl (δ⁻)' : 'H'}
            </text>

            {showVectors && mol.isPolar && (
              <g>
                <line x1="145" y1="100" x2="250" y2="100" stroke="#06b6d4" strokeWidth="4" markerEnd="url(#arrowCyan)" />
                <text x="200" y="80" textAnchor="middle" fill="#06b6d4" fontWeight="bold" fontSize="14">
                  NET μ = {mol.netDipole} D
                </text>
              </g>
            )}
            {showVectors && !mol.isPolar && (
              <text x="200" y="80" textAnchor="middle" fill="#10b981" fontWeight="bold" fontSize="14">
                Equal Sharing: NET μ = 0 D
              </text>
            )}
          </g>
        )}

        {mol.structureSvgType === 'trigonalPyramidal' && (
          <g>
            {/* NH3 */}
            <line x1="200" y1="110" x2="130" y2="210" stroke="#cbd5e1" strokeWidth="6" />
            <line x1="200" y1="110" x2="200" y2="220" stroke="#cbd5e1" strokeWidth="6" />
            <line x1="200" y1="110" x2="270" y2="210" stroke="#cbd5e1" strokeWidth="6" />

            <ellipse cx="200" cy="65" rx="14" ry="10" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" />

            <circle cx="200" cy="110" r="30" fill="url(#gradNitrogen)" />
            <text x="200" y="115" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">N (δ⁻)</text>

            <circle cx="130" cy="210" r="18" fill="url(#gradHydrogen)" />
            <circle cx="200" cy="220" r="18" fill="url(#gradHydrogen)" />
            <circle cx="270" cy="210" r="18" fill="url(#gradHydrogen)" />

            {showVectors && (
              <g>
                <line x1="200" y1="240" x2="200" y2="35" stroke="#06b6d4" strokeWidth="4" markerEnd="url(#arrowCyan)" />
                <text x="215" y="45" fill="#06b6d4" fontWeight="bold" fontSize="14">NET μ = 1.47 D</text>
              </g>
            )}
          </g>
        )}

        {mol.structureSvgType === 'tetrahedral' && (
          <g>
            {/* CH4 / CCl4 Symmetrical Tetrahedral */}
            <line x1="200" y1="150" x2="200" y2="60" stroke="#cbd5e1" strokeWidth="6" />
            <line x1="200" y1="150" x2="120" y2="210" stroke="#cbd5e1" strokeWidth="6" />
            <line x1="200" y1="150" x2="200" y2="230" stroke="#cbd5e1" strokeWidth="6" strokeDasharray="4,2" />
            <line x1="200" y1="150" x2="280" y2="210" stroke="#cbd5e1" strokeWidth="6" />

            <circle cx="200" cy="150" r="28" fill="url(#gradCarbon)" />
            <text x="200" y="155" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">C</text>

            <circle cx="200" cy="60" r={mol.id === 'CCl4' ? '24' : '16'} fill={mol.id === 'CCl4' ? 'url(#gradChlorine)' : 'url(#gradHydrogen)'} />
            <circle cx="120" cy="210" r={mol.id === 'CCl4' ? '24' : '16'} fill={mol.id === 'CCl4' ? 'url(#gradChlorine)' : 'url(#gradHydrogen)'} />
            <circle cx="200" cy="230" r={mol.id === 'CCl4' ? '24' : '16'} fill={mol.id === 'CCl4' ? 'url(#gradChlorine)' : 'url(#gradHydrogen)'} />
            <circle cx="280" cy="210" r={mol.id === 'CCl4' ? '24' : '16'} fill={mol.id === 'CCl4' ? 'url(#gradChlorine)' : 'url(#gradHydrogen)'} />

            {showVectors && (
              <g>
                <text x="200" y="25" textAnchor="middle" fill="#10b981" fontWeight="bold" fontSize="13">
                  Symmetrical 3D Tetrahedral Vectors Sum To Zero
                </text>
                <text x="200" y="275" textAnchor="middle" fill="#06b6d4" fontWeight="bold" fontSize="15">
                  NET μ = 0.00 D (NON-POLAR)
                </text>
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};

// DIAGRAM 2: Pauling Electronegativity & Bond Polarity Scale SVG
const ElectronegativityScaleSVG: React.FC<{
  elem1EN: number;
  elem2EN: number;
  elem1Name: string;
  elem2Name: string;
}> = ({ elem1EN, elem2EN, elem1Name, elem2Name }) => {
  const diff = Math.abs(elem1EN - elem2EN);
  const diffFixed = Number(diff.toFixed(2));

  let bondType = 'Non-Polar Covalent';
  let badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

  if (diffFixed > 1.7) {
    bondType = 'Predominantly Ionic';
    badgeColor = 'bg-purple-500/20 text-purple-300 border-purple-500/40';
  } else if (diffFixed >= 0.4) {
    bondType = 'Polar Covalent';
    badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
  }

  const scaleWidth = 320;
  const markerX = Math.min((diffFixed / 3.3) * scaleWidth, scaleWidth);

  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 space-y-3">
      <div className="flex justify-between items-center text-xs font-mono text-slate-300">
        <span>Atom A ({elem1Name}): {elem1EN}</span>
        <span>Atom B ({elem2Name}): {elem2EN}</span>
      </div>

      <svg viewBox="0 0 360 90" className="w-full h-24">
        {/* Continuous Gradient Bar */}
        <defs>
          <linearGradient id="enGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="25%" stopColor="#10b981" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#f59e0b" />
            <stop offset="85%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>
        </defs>

        <rect x="20" y="30" width="320" height="20" rx="10" fill="url(#enGrad)" opacity="0.85" />

        {/* Threshold Markers */}
        <line x1="58.78" y1="25" x2="58.78" y2="55" stroke="#ffffff" strokeWidth="2" strokeDasharray="3,3" />
        <text x="58.78" y="20" textAnchor="middle" fill="#94a3b8" fontSize="10">0.4</text>

        <line x1="184.84" y1="25" x2="184.84" y2="55" stroke="#ffffff" strokeWidth="2" strokeDasharray="3,3" />
        <text x="184.84" y="20" textAnchor="middle" fill="#94a3b8" fontSize="10">1.7</text>

        {/* Current Calculation Indicator */}
        <g transform={`translate(${20 + markerX}, 30)`}>
          <polygon points="0,-12 -6,-2 6,-2" fill="#38bdf8" />
          <circle cx="0" cy="10" r="7" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
        </g>

        {/* Scale labels */}
        <text x="20" y="72" fill="#10b981" fontSize="10" fontWeight="bold">0.0 (Non-Polar)</text>
        <text x="120" y="72" fill="#f59e0b" fontSize="10" fontWeight="bold">0.4 - 1.7 (Polar)</text>
        <text x="280" y="72" fill="#a855f7" fontSize="10" fontWeight="bold">&gt;1.7 (Ionic)</text>
      </svg>

      <div className="flex items-center justify-between border-t border-slate-800 pt-2 text-sm">
        <span className="text-slate-400">ΔEN = |{elem1EN} - {elem2EN}| = <strong className="text-cyan-300 font-mono">{diffFixed}</strong></span>
        <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${badgeColor}`}>
          {bondType}
        </span>
      </div>
    </div>
  );
};

// DIAGRAM 3: Electrolytic Ionization & Conductivity Circuit SVG
const ConductivityCircuitSVG: React.FC<{
  solvent: 'pure_HCl' | 'aqueous_HCl' | 'CCl4' | 'pure_water';
}> = ({ solvent }) => {
  let bulbOn = false;
  let description = '';
  let ions: Array<{ type: string; x: number; y: number }> = [];

  if (solvent === 'aqueous_HCl') {
    bulbOn = true;
    description = 'Aqueous HCl: Complete ionization into mobile H₃O⁺ and Cl⁻ ions carries current!';
    ions = [
      { type: 'H3O+', x: 160, y: 190 },
      { type: 'Cl-', x: 210, y: 220 },
      { type: 'H3O+', x: 230, y: 175 },
      { type: 'Cl-', x: 180, y: 230 },
      { type: 'H3O+', x: 140, y: 225 },
      { type: 'Cl-', x: 250, y: 200 },
    ];
  } else if (solvent === 'pure_HCl') {
    bulbOn = false;
    description = 'Pure Liquid HCl: Contains neutral polar molecules with fixed partial charges (no free ions). Bulb OFF!';
  } else if (solvent === 'CCl4') {
    bulbOn = false;
    description = 'CCl₄ Solvent: Non-polar covalent liquid with zero ions. Bulb OFF!';
  } else {
    bulbOn = false;
    description = 'Pure Water: Extremely low self-ionization. Bulb stays OFF!';
  }

  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col items-center">
      <svg viewBox="0 0 400 280" className="w-full max-w-md h-60">
        {/* Battery & Circuit Wires */}
        <path d="M 120 130 L 120 40 L 180 40" stroke="#f59e0b" strokeWidth="4" fill="none" />
        <path d="M 220 40 L 280 40 L 280 130" stroke="#f59e0b" strokeWidth="4" fill="none" />

        {/* Battery Symbol */}
        <rect x="180" y="28" width="40" height="24" rx="4" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
        <text x="200" y="44" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">+ 9V -</text>

        {/* Lightbulb */}
        <g transform="translate(280, 75)">
          <circle cx="0" cy="0" r="18" fill={bulbOn ? '#fde047' : '#475569'} stroke={bulbOn ? '#eab308' : '#94a3b8'} strokeWidth="3" />
          {bulbOn && (
            <g stroke="#fde047" strokeWidth="2">
              <line x1="-25" y1="0" x2="-35" y2="0" />
              <line x1="25" y1="0" x2="35" y2="0" />
              <line x1="0" y1="-25" x2="0" y2="-35" />
              <line x1="-18" y1="-18" x2="-26" y2="-26" />
              <line x1="18" y1="-18" x2="26" y2="-26" />
            </g>
          )}
          <path d="M -8 18 L 8 18 L 5 26 L -5 26 z" fill="#64748b" />
        </g>

        {/* Beaker Container */}
        <rect x="110" y="130" width="180" height="120" rx="8" fill="rgba(30, 41, 59, 0.6)" stroke="#cbd5e1" strokeWidth="3" />

        {/* Liquid Fill */}
        <rect
          x="114"
          y="150"
          width="172"
          height="94"
          rx="4"
          fill={solvent === 'aqueous_HCl' ? 'rgba(14, 165, 233, 0.35)' : solvent === 'CCl4' ? 'rgba(168, 85, 247, 0.25)' : 'rgba(59, 130, 246, 0.2)'}
        />

        {/* Electrodes */}
        <rect x="140" y="110" width="12" height="100" fill="#94a3b8" stroke="#475569" />
        <rect x="248" y="110" width="12" height="100" fill="#94a3b8" stroke="#475569" />
        <text x="146" y="105" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">Anode (+)</text>
        <text x="254" y="105" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">Cathode (-)</text>

        {/* Mobile Ions rendering */}
        {ions.map((ion, idx) => (
          <g key={idx} transform={`translate(${ion.x}, ${ion.y})`}>
            <circle cx="0" cy="0" r="10" fill={ion.type === 'H3O+' ? '#ef4444' : '#22c55e'} opacity="0.9" />
            <text x="0" y="3" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
              {ion.type}
            </text>
          </g>
        ))}

        {solvent === 'pure_HCl' && (
          <g transform="translate(200, 195)">
            <text x="0" y="0" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontWeight="bold">H-Cl Neutral Molecules</text>
            <text x="0" y="15" textAnchor="middle" fill="#94a3b8" fontSize="10">(No Free Ions)</text>
          </g>
        )}
      </svg>

      <div className={`mt-2 text-xs font-semibold px-3 py-1.5 rounded-md text-center border ${
        bulbOn ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'
      }`}>
        {description}
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT CLASS
// ============================================================================

export default function C10_ChemistryPolarandnonpolarcovalentcompoundsSim({
  onComplete,
}: {
  onComplete?: (score: number) => void;
}) {
  // Tab Management
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Interactive Lab State Variables
  const [selectedLabIndex, setSelectedLabIndex] = useState<number>(0);
  const [selectedMoleculeKey, setSelectedMoleculeKey] = useState<string>('H2O');
  const [showDipoleVectors, setShowDipoleVectors] = useState<boolean>(true);
  const [rotationAngle, setRotationAngle] = useState<number>(0);

  // Lab 1 State: Electronegativity Custom Builder
  const [elem1EN, setElem1EN] = useState<number>(2.20); // Hydrogen default
  const [elem2EN, setElem2EN] = useState<number>(3.16); // Chlorine default
  const [elem1Name, setElem1Name] = useState<string>('H');
  const [elem2Name, setElem2Name] = useState<string>('Cl');

  // Lab 3 State: Heating & Volatility Simulator
  const [fluidTemp, setFluidTemp] = useState<number>(25); // °C

  // Lab 4 State: Solubility Test Bench
  const [soluteType, setSoluteType] = useState<'HCl' | 'I2' | 'Grease'>('HCl');
  const [solventType, setSolventType] = useState<'Water' | 'CCl4'>('Water');
  const [solubilityResult, setSolubilityResult] = useState<string>('');

  // Lab 5 State: Conductivity Tester
  const [circuitSolvent, setCircuitSolvent] = useState<'pure_HCl' | 'aqueous_HCl' | 'CCl4' | 'pure_water'>('aqueous_HCl');

  // Challenges State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<{
    status: 'correct' | 'incorrect' | null;
    message: string;
  }>({ status: null, message: '' });
  const [scoreCount, setScoreCount] = useState<number>(0);

  // Pedagogical & Tracking States (BKT & SRS)
  const [bktStates, setBktStates] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState(id);
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>(() => {
    const initial: Record<string, SRSItem> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Discovery / Prediction & Observation User Answers
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number | null>>({});
  const [predictionFeedback, setPredictionFeedback] = useState<Record<number, boolean>>({});

  const [observationAnswers, setObservationAnswers] = useState<Record<number, number | null>>({});
  const [observationFeedback, setObservationFeedback] = useState<Record<number, boolean>>({});

  // Auto-Hint & Feedback UI Controls
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintText, setCurrentHintText] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Inactivity Hint Timer (10 seconds)
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      const activeChallenge = CHALLENGES[currentChallengeIndex];
      if (activeChallenge && activeTab === 'challenges') {
        setCurrentHintText(activeChallenge.hints[0]);
        setShowHint(true);
        audioManager.play('hint');
        speechManager.speak(`Hint: ${activeChallenge.hints[0]}`);
      }
    }, 10000);
  }, [currentChallengeIndex, activeTab]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, activeTab, resetInactivityTimer]);

  // Solute-Solvent Simulation Calculation
  useEffect(() => {
    if (soluteType === 'HCl') {
      if (solventType === 'Water') {
        setSolubilityResult('Highly Soluble! Polar HCl forms strong hydrogen bonds & ionizes in polar water.');
      } else {
        setSolubilityResult('Insoluble / Low Solubility. Polar HCl does not interact favorably with non-polar CCCl₄.');
      }
    } else if (soluteType === 'I2') {
      if (solventType === 'Water') {
        setSolubilityResult('Insoluble. Non-polar I₂ cannot break strong polar H₂O hydrogen bonds.');
      } else {
        setSolubilityResult('Soluble! Non-polar I₂ dissolves in non-polar CCCl₄ via London dispersion forces (Violet Solution).');
      }
    } else if (soluteType === 'Grease') {
      if (solventType === 'Water') {
        setSolubilityResult('Immiscible / Insoluble. Non-polar grease floats on polar water without dissolving.');
      } else {
        setSolubilityResult('Soluble! Non-polar hydrocarbon grease dissolves completely in non-polar CCCl₄ ("Like dissolves like").');
      }
    }
  }, [soluteType, solventType]);

  // Master Score Calculation
  const totalScore = useMemo(() => {
    return Math.round((scoreCount / CHALLENGES.length) * 100);
  }, [scoreCount]);

  // Handlers for Discovery & Predictions
  const handleDiscoverySubmit = (optIndex: number) => {
    setDiscoverySelected(optIndex);
    setDiscoverySubmitted(true);
    if (optIndex === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      speechManager.speak('Correct! Geometry determines whether bond dipoles cancel out.');
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Consider the 3D geometry and vector cancellation.');
    }
  };

  const handlePredictionSubmit = (predIndex: number, optionIdx: number) => {
    const q = PREDICTION_QUESTIONS[predIndex];
    const isCorrect = optionIdx === q.correctIndex;

    setPredictionAnswers((prev) => ({ ...prev, [predIndex]: optionIdx }));
    setPredictionFeedback((prev) => ({ ...prev, [predIndex]: isCorrect }));

    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Prediction verified correctly!');
    } else {
      audioManager.play('error');
      speechManager.speak('Incorrect prediction. Test it in the interactive lab!');
    }
  };

  const handleObservationSubmit = (obsIndex: number, optionIdx: number) => {
    const q = OBSERVATION_QUESTIONS[obsIndex];
    const isCorrect = optionIdx === q.correctIndex;

    setObservationAnswers((prev) => ({ ...prev, [obsIndex]: optionIdx }));
    setObservationFeedback((prev) => ({ ...prev, [obsIndex]: isCorrect }));

    if (isCorrect) {
      audioManager.play('chime');
      speechManager.speak('Accurate observation!');
    } else {
      audioManager.play('drop-wrong');
    }
  };

  // Handlers for Practice Challenges
  const handleAnswerChallenge = (optionIdx?: number) => {
    resetInactivityTimer();
    const challenge = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;

    if (challenge.type === 'numeric') {
      const parsedUser = parseFloat(numericAnswer.trim());
      const targetVal = challenge.correctAnswer as number;
      isCorrect = Math.abs(parsedUser - targetVal) < 0.05;
    } else {
      isCorrect = optionIdx === challenge.correctIndex;
    }

    // Update BKT & SRS State for the node
    const node = challenge.nodeId;
    const oldBkt = bktStates[node] || createBKTState(node);
    const newBkt = bktUpdate(oldBkt, isCorrect);
    setBktStates((prev) => ({ ...prev, [node]: newBkt }));

    const oldSrs = srsItems[node] || createReviewItem(node);
    const newSrs = sm2Update(oldSrs, isCorrect ? 5 : 2);
    setSrsItems((prev) => ({ ...prev, [node]: newSrs }));

    if (isCorrect) {
      audioManager.play('sparkle');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 800);

      setChallengeFeedback({
        status: 'correct',
        message: `Correct! ${challenge.explanation}`,
      });
      setScoreCount((prev) => prev + 1);
      speechManager.speak('Well done! Correct answer.');
    } else {
      audioManager.play('drop-wrong');
      setChallengeFeedback({
        status: 'incorrect',
        message: `Incorrect. ${challenge.explanation}`,
      });
      speechManager.speak('Incorrect. Review the explanation and try again.');
    }
  };

  const handleNextChallenge = () => {
    setChallengeFeedback({ status: null, message: '' });
    setSelectedOption(null);
    setNumericAnswer('');
    setShowHint(false);

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      audioManager.play('whoosh');
    } else {
      // Completed all challenges
      setShowConfetti(true);
      setShowSuccessBanner(true);
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have mastered Polar and Non-Polar Covalent Compounds!');

      recordGameScore('polar_nonpolar_covalent_sim', scoreCount, CHALLENGES.length);
      if (onComplete) {
        onComplete(totalScore);
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 p-4 md:p-6 flex flex-col font-sans relative overflow-x-hidden">
      {/* Dynamic Visual Feedback FX */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text={`Sim Mastered! Final Score: ${totalScore}%`} />
      <SparkleBurst show={showSparkle} x={500} y={300} />

      {/* HEADER BAR */}
      <header className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-6 shadow-xl backdrop-blur flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/20 rounded-xl border border-cyan-500/30 text-cyan-400">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.6 15.12a2 2 0 01-1.022-.547l-1.39-1.39a2 2 0 010-2.828l9.172-9.172a2 2 0 012.828 0l9.172 9.172a2 2 0 010 2.828l-1.39 1.39z" />
            </svg>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">ICSE Class 10 Chemistry</span>
            <h1 className="text-xl md:text-2xl font-bold text-white">Polar & Non-Polar Covalent Compounds</h1>
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <nav className="flex items-center bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 gap-1">
          <button
            onClick={() => { setActiveTab('discovery'); audioManager.play('tap'); }}
            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              activeTab === 'discovery' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Discovery
          </button>
          <button
            onClick={() => { setActiveTab('lab'); audioManager.play('tap'); }}
            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              activeTab === 'lab' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Interactive Labs ({EXPLORATION_STEPS.length})
          </button>
          <button
            onClick={() => { setActiveTab('challenges'); audioManager.play('tap'); }}
            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              activeTab === 'challenges' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Practice ({CHALLENGES.length})
          </button>
          <button
            onClick={() => { setActiveTab('summary'); audioManager.play('tap'); }}
            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              activeTab === 'summary' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            4. Summary & Real World
          </button>
        </nav>
      </header>

      {/* TAB 1: DISCOVERY & SCENARIO */}
      {activeTab === 'discovery' && (
        <div className="max-w-4xl mx-auto w-full space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>
              {SCENARIO.title}
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">{SCENARIO.intro}</p>
            <p className="text-slate-400 leading-relaxed text-sm border-l-2 border-cyan-500 pl-4 italic">{SCENARIO.context}</p>
          </div>

          {/* Discovery Question Card */}
          <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 shadow-xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/30">
              Counterintuitive Preconception Challenge
            </span>
            <h3 className="text-lg font-bold text-white leading-snug">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((option, idx) => {
                let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700/60';
                if (discoverySubmitted) {
                  if (idx === DISCOVERY_QUESTION.correctIndex) {
                    btnStyle = 'bg-emerald-600/30 border-emerald-500 text-emerald-200 font-semibold';
                  } else if (idx === discoverySelected) {
                    btnStyle = 'bg-rose-600/30 border-rose-500 text-rose-200';
                  }
                }
                return (
                  <button
                    key={idx}
                    disabled={discoverySubmitted}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-sm md:text-base flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="font-mono text-cyan-400 font-bold">{String.fromCharCode(65 + idx)}.</span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {discoverySubmitted && (
              <div className="mt-4 p-4 rounded-xl bg-slate-800/90 border border-cyan-500/40 text-slate-200 text-sm space-y-2">
                <p className="font-semibold text-cyan-300">Pedagogical Insight:</p>
                <p>{DISCOVERY_QUESTION.hintAfter}</p>
                <button
                  onClick={() => setActiveTab('lab')}
                  className="mt-2 px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-semibold transition"
                >
                  Proceed to Interactive Labs →
                </button>
              </div>
            )}
          </div>

          {/* Prediction Questions */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Scientific Predictions (Hypothesis Testing)
            </h3>

            {PREDICTION_QUESTIONS.map((pred, pIdx) => (
              <div key={pIdx} className="p-4 bg-slate-800/60 border border-slate-700 rounded-xl space-y-3">
                <p className="font-semibold text-slate-200 text-sm md:text-base">{pred.question}</p>
                <div className="grid grid-cols-1 gap-2">
                  {pred.options.map((opt, oIdx) => {
                    const isSelected = predictionAnswers[pIdx] === oIdx;
                    const isSubmitted = predictionAnswers[pIdx] !== undefined;
                    let style = 'bg-slate-900/70 border-slate-700 text-slate-300 hover:bg-slate-800';
                    if (isSubmitted) {
                      if (oIdx === pred.correctIndex) style = 'bg-emerald-600/30 border-emerald-500 text-emerald-200';
                      else if (isSelected) style = 'bg-rose-600/30 border-rose-500 text-rose-200';
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={isSubmitted}
                        onClick={() => handlePredictionSubmit(pIdx, oIdx)}
                        className={`text-left p-3 rounded-lg border text-xs md:text-sm transition ${style}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {predictionAnswers[pIdx] !== undefined && (
                  <p className="text-xs text-cyan-300 italic pt-1">{pred.verifyInstruction}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE EXPLORATION LABS */}
      {activeTab === 'lab' && (
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Navigation: Lab Selector */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
              Select Exploration Station ({EXPLORATION_STEPS.length})
            </h3>
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedLabIndex(idx);
                  audioManager.play('tap');
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col gap-1 ${
                  selectedLabIndex === idx
                    ? 'bg-cyan-600/20 border-cyan-500 text-white shadow-lg'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/60'
                }`}
              >
                <span className="text-xs font-semibold text-cyan-400">{step.title}</span>
                <span className="text-xs text-slate-300 line-clamp-2">{step.instruction}</span>
              </button>
            ))}
          </div>

          {/* Right Main Lab Area */}
          <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-cyan-400">{EXPLORATION_STEPS[selectedLabIndex].title}</h3>
              <span className="text-xs font-mono text-slate-400">Node ID: {EXPLORATION_STEPS[selectedLabIndex].nodeId}</span>
            </div>

            {/* LAB STATION 1: Electronegativity Scale */}
            {selectedLabIndex === 0 && (
              <div className="space-y-6">
                <ElectronegativityScaleSVG elem1EN={elem1EN} elem2EN={elem2EN} elem1Name={elem1Name} elem2Name={elem2Name} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 space-y-2">
                    <label className="text-xs font-semibold text-cyan-300 flex justify-between">
                      <span>Atom A ({elem1Name}): Electronegativity</span>
                      <span>{elem1EN.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="0.7"
                      max="4.0"
                      step="0.05"
                      value={elem1EN}
                      onChange={(e) => setElem1EN(parseFloat(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                    <div className="flex gap-2 pt-2">
                      {['H (2.2)', 'C (2.55)', 'N (3.04)', 'O (3.44)', 'F (3.98)'].map((preset) => {
                        const name = preset.split(' ')[0];
                        const val = parseFloat(preset.match(/\(([^)]+)\)/)![1]);
                        return (
                          <button
                            key={name}
                            onClick={() => { setElem1Name(name); setElem1EN(val); audioManager.play('pop'); }}
                            className="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs text-slate-200"
                          >
                            {name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 space-y-2">
                    <label className="text-xs font-semibold text-emerald-300 flex justify-between">
                      <span>Atom B ({elem2Name}): Electronegativity</span>
                      <span>{elem2EN.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="0.7"
                      max="4.0"
                      step="0.05"
                      value={elem2EN}
                      onChange={(e) => setElem2EN(parseFloat(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                    <div className="flex gap-2 pt-2">
                      {['H (2.2)', 'Cl (3.16)', 'O (3.44)', 'F (3.98)'].map((preset) => {
                        const name = preset.split(' ')[0];
                        const val = parseFloat(preset.match(/\(([^)]+)\)/)![1]);
                        return (
                          <button
                            key={name}
                            onClick={() => { setElem2Name(name); setElem2EN(val); audioManager.play('pop'); }}
                            className="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs text-slate-200"
                          >
                            {name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB STATION 2: 3D Geometry & Dipole Vectors */}
            {selectedLabIndex === 1 && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="flex gap-2">
                    {Object.keys(MOLECULES_DB).map((key) => (
                      <button
                        key={key}
                        onClick={() => { setSelectedMoleculeKey(key); audioManager.play('tap'); }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                          selectedMoleculeKey === key ? 'bg-cyan-600 text-white shadow' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {MOLECULES_DB[key].formula}
                      </button>
                    ))}
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={showDipoleVectors}
                      onChange={(e) => { setShowDipoleVectors(e.target.checked); audioManager.play('pop'); }}
                      className="accent-cyan-400 rounded"
                    />
                    <span>Show Dipole Vectors</span>
                  </label>
                </div>

                <MolecularDipoleSVG moleculeKey={selectedMoleculeKey} showVectors={showDipoleVectors} rotationAngle={rotationAngle} />

                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="space-y-1 text-xs">
                    <p className="text-slate-300">Net Dipole Moment: <strong className="text-cyan-300">{MOLECULES_DB[selectedMoleculeKey].netDipole} Debye</strong></p>
                    <p className="text-slate-300">Bond Angle: <strong className="text-amber-300">{MOLECULES_DB[selectedMoleculeKey].bondAngle}</strong></p>
                    <p className="text-slate-300">Overall Polarity: <strong className={MOLECULES_DB[selectedMoleculeKey].isPolar ? 'text-amber-400' : 'text-emerald-400'}>
                      {MOLECULES_DB[selectedMoleculeKey].isPolar ? 'POLAR MOLECULE' : 'NON-POLAR MOLECULE'}
                    </strong></p>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <span className="text-xs text-slate-400">Rotate Y:</span>
                    <input
                      type="range"
                      min="-60"
                      max="60"
                      value={rotationAngle}
                      onChange={(e) => setRotationAngle(parseInt(e.target.value))}
                      className="w-32 accent-cyan-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* LAB STATION 3: Intermolecular Forces & Heating */}
            {selectedLabIndex === 2 && (
              <div className="space-y-4">
                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-200">System Thermal Energy (Temperature)</span>
                    <span className="text-lg font-mono font-bold text-amber-400">{fluidTemp}°C</span>
                  </div>

                  <input
                    type="range"
                    min="-180"
                    max="120"
                    value={fluidTemp}
                    onChange={(e) => setFluidTemp(parseInt(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.values(MOLECULES_DB).slice(0, 4).map((mol) => {
                      const isBoiling = fluidTemp >= mol.boilingPoint;
                      return (
                        <div key={mol.id} className={`p-3 rounded-lg border text-center transition ${isBoiling ? 'bg-amber-500/20 border-amber-500' : 'bg-slate-900 border-slate-700'}`}>
                          <div className="font-bold text-cyan-300">{mol.formula}</div>
                          <div className="text-xs text-slate-400">BP: {mol.boilingPoint}°C</div>
                          <div className={`text-xs mt-1 font-semibold ${isBoiling ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`}>
                            {isBoiling ? 'GAS (Vaporized)' : 'LIQUID / CONDENSED'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* LAB STATION 4: "Like Dissolves Like" Solubility Mixer */}
            {selectedLabIndex === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase">Select Solute (Substance to Dissolve):</label>
                    <div className="flex gap-2">
                      {(['HCl', 'I2', 'Grease'] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => { setSoluteType(s); audioManager.play('pop'); }}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold border transition ${
                            soluteType === s ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          {s === 'HCl' ? 'HCl (Polar)' : s === 'I2' ? 'Iodine I₂ (Non-Polar)' : 'Grease (Non-Polar)'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase">Select Solvent:</label>
                    <div className="flex gap-2">
                      {(['Water', 'CCl4'] as const).map((solv) => (
                        <button
                          key={solv}
                          onClick={() => { setSolventType(solv); audioManager.play('pop'); }}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold border transition ${
                            solventType === solv ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          {solv === 'Water' ? 'Water H₂O (Polar)' : 'CCl₄ (Non-Polar)'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-800/80 rounded-xl border border-cyan-500/30 text-center space-y-2">
                  <span className="text-xs text-slate-400 uppercase tracking-wide">Solubility Experiment Outcome</span>
                  <p className="text-sm md:text-base font-semibold text-cyan-300">{solubilityResult}</p>
                </div>
              </div>
            )}

            {/* LAB STATION 5: Ionization & Electrical Conductivity */}
            {selectedLabIndex === 4 && (
              <div className="space-y-4">
                <div className="flex gap-2 justify-center">
                  {[
                    { key: 'aqueous_HCl', label: 'Aqueous HCl (HCl + H₂O)' },
                    { key: 'pure_HCl', label: 'Pure Liquid HCl' },
                    { key: 'CCl4', label: 'Liquid CCCl₄' },
                    { key: 'pure_water', label: 'Pure Distilled H₂O' },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => {
                        setCircuitSolvent(item.key as typeof circuitSolvent);
                        audioManager.play('tap');
                      }}
                      className={`px-3 py-2 rounded-lg text-xs font-bold border transition ${
                        circuitSolvent === item.key ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <ConductivityCircuitSVG solvent={circuitSolvent} />
              </div>
            )}

            {/* Observation Questions rendered inside Lab Tab */}
            <div className="border-t border-slate-800 pt-6 space-y-4">
              <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                Lab Observation Checkpoints
              </h4>
              {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                <div key={oIdx} className="p-4 bg-slate-800/40 border border-slate-700/60 rounded-xl space-y-2">
                  <p className="text-xs md:text-sm text-slate-200 font-semibold">{obs.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {obs.observableOptions.map((opt, optionIdx) => {
                      const isSelected = observationAnswers[oIdx] === optionIdx;
                      const isSubmitted = observationAnswers[oIdx] !== undefined;
                      let btnStyle = 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800';
                      if (isSubmitted) {
                        if (optionIdx === obs.correctIndex) btnStyle = 'bg-emerald-600/30 border-emerald-500 text-emerald-200';
                        else if (isSelected) btnStyle = 'bg-rose-600/30 border-rose-500 text-rose-200';
                      }

                      return (
                        <button
                          key={optionIdx}
                          disabled={isSubmitted}
                          onClick={() => handleObservationSubmit(oIdx, optionIdx)}
                          className={`text-left p-2.5 rounded-lg border text-xs transition ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRACTICE CHALLENGES (22 ITEMS) */}
      {activeTab === 'challenges' && (
        <div className="max-w-4xl mx-auto w-full space-y-6">
          {/* Progress Header */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-cyan-400 uppercase">
                Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize border ${
                CHALLENGES[currentChallengeIndex].difficulty === 'foundation'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : CHALLENGES[currentChallengeIndex].difficulty === 'standard'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
              }`}>
                {CHALLENGES[currentChallengeIndex].difficulty}
              </span>
            </div>

            <div className="w-48 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-cyan-500 h-full transition-all duration-300"
                style={{ width: `${((currentChallengeIndex + 1) / CHALLENGES.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Hint Bubble Component */}
          <HintBubble show={showHint} text={currentHintText} />

          {/* Main Question Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400">Node: {CHALLENGES[currentChallengeIndex].nodeId}</span>
              <h3 className="text-lg md:text-xl font-bold text-white leading-relaxed">
                {CHALLENGES[currentChallengeIndex].question}
              </h3>
            </div>

            {/* Answer Input Area: Numeric or Multiple Choice */}
            {CHALLENGES[currentChallengeIndex].type === 'numeric' ? (
              <div className="space-y-3">
                <input
                  type="number"
                  step="0.01"
                  value={numericAnswer}
                  onChange={(e) => setNumericAnswer(e.target.value)}
                  placeholder="Enter calculated numerical value..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white font-mono focus:border-cyan-400 focus:outline-none"
                />
                <button
                  onClick={() => handleAnswerChallenge()}
                  disabled={!numericAnswer.trim() || challengeFeedback.status !== null}
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-sm font-semibold transition disabled:opacity-50"
                >
                  Submit Answer
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {CHALLENGES[currentChallengeIndex].options?.map((opt, idx) => {
                  let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700/70';
                  if (challengeFeedback.status !== null) {
                    if (idx === CHALLENGES[currentChallengeIndex].correctIndex) {
                      btnStyle = 'bg-emerald-600/30 border-emerald-500 text-emerald-200 font-semibold';
                    } else if (idx === selectedOption) {
                      btnStyle = 'bg-rose-600/30 border-rose-500 text-rose-200';
                    }
                  } else if (selectedOption === idx) {
                    btnStyle = 'bg-cyan-600/30 border-cyan-400 text-cyan-200';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={challengeFeedback.status !== null}
                      onClick={() => {
                        setSelectedOption(idx);
                        handleAnswerChallenge(idx);
                      }}
                      className={`text-left p-4 rounded-xl border transition-all text-sm md:text-base flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="font-mono text-cyan-400 font-bold">{String.fromCharCode(65 + idx)}.</span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Feedback & Next Challenge Controls */}
            {challengeFeedback.status !== null && (
              <div className={`p-4 rounded-xl border text-sm space-y-3 ${
                challengeFeedback.status === 'correct'
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
              }`}>
                <p>{challengeFeedback.message}</p>
                <button
                  onClick={handleNextChallenge}
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-semibold transition"
                >
                  {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'View Sim Summary →'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: SUMMARY, REAL-WORLD & MISCONCEPTIONS */}
      {activeTab === 'summary' && (
        <div className="max-w-4xl mx-auto w-full space-y-6">
          {/* Real World Activity Render */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              Real-World Application: {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 text-xs md:text-sm text-slate-200">
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Misconceptions Corrective Matrix */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-amber-400">Common ICSE Misconceptions Corrected</h3>
            <div className="grid grid-cols-1 gap-4">
              {MISCONCEPTIONS.map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 space-y-2">
                  <span className="text-xs font-bold text-rose-400 uppercase">Misconception: {item.misconception}</span>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{item.correction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}