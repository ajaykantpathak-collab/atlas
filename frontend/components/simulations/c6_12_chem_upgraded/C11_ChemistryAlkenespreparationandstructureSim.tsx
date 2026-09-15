'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// 1. NODE DEFINITIONS & CONSTANTS
// ==========================================

const NODE_C11_CHEM_081 = 'c11_chem_081'; // Structure of Double Bond (sp2, sigma, pi overlap, geometry)
const NODE_C11_CHEM_082 = 'c11_chem_082'; // Geometrical Isomerism (cis-trans, conditions, physical properties)
const NODE_C11_CHEM_083 = 'c11_chem_083'; // Nomenclature of Alkenes (IUPAC, E/Z system, dienes)
const NODE_C11_CHEM_084 = 'c11_chem_084'; // Preparation from Alkynes (Lindlar vs Birch reduction: cis vs trans)
const NODE_C11_CHEM_085 = 'c11_chem_085'; // Dehydrohalogenation of Alkyl Halides (Saytzeff vs Hofmann, Alc. KOH)
const NODE_C11_CHEM_086 = 'c11_chem_086'; // Preparation from Vicinal Dihalides (Dehalogenation via Zn dust)
const NODE_C11_CHEM_087 = 'c11_chem_087'; // Acid-Catalyzed Dehydration of Alcohols (Carbocation rearrangement, order of reactivity)
const NODE_C11_CHEM_088 = 'c11_chem_088'; // Kolbe's Electrolytic Method for Alkenes (Mechanism at anode/cathode)
const NODE_C11_CHEM_089 = 'c11_chem_089'; // Physical Properties of Alkenes (Dipole moment, BP, MP, solubility)
const NODE_C11_CHEM_090 = 'c11_chem_090'; // Relative Stability of Alkenes (Hyperconjugation, substitution, heat of hydrogenation)

const ALL_NODE_IDS = [
  NODE_C11_CHEM_081,
  NODE_C11_CHEM_082,
  NODE_C11_CHEM_083,
  NODE_C11_CHEM_084,
  NODE_C11_CHEM_085,
  NODE_C11_CHEM_086,
  NODE_C11_CHEM_087,
  NODE_C11_CHEM_088,
  NODE_C11_CHEM_089,
  NODE_C11_CHEM_090,
] as const;

// ==========================================
// 2. MANDATORY SECTIONS: SCENARIO & QUESTIONS
// ==========================================

const SCENARIO = {
  title: 'ISC Organic Chemistry Virtual Lab: Alkenes Preparation & Orbital Dynamics',
  intro: 'Welcome to the Advanced Organic Synthesis and Structure Facility. Here you will manipulate atomic orbitals, synthesize unsaturated hydrocarbons using classical ISC reaction pathways, and analyze geometrical stereochemistry.',
  context: 'You are investigating why alkenes exhibit geometric isomerism while alkanes do not, synthesizing specific cis- and trans-alkenes, predicting elimination regioselectivity via Saytzeff rule, and measuring heat of hydrogenation to determine thermodynamic stability.',
};

const DISCOVERY_QUESTION = {
  question: 'Why does 2-butene exist as distinct cis and trans isomers at room temperature, whereas 1,2-dichloroethane can freely rotate between its staggered and eclipsed forms without isolable isomers?',
  options: [
    'The carbon-carbon double bond contains a pi (π) bond formed by sideways p-orbital overlap that locks the carbon atoms in a plane; rotation requires breaking this π overlap (~264 kJ/mol).',
    'Sigma (σ) bonds in alkenes are much stronger than sigma bonds in alkanes, preventing any movement.',
    'Alkene carbon atoms are sp3 hybridized, forming a tetrahedral cage that locks stereocenters in place.',
    'Electrostatic repulsion between methyl groups in 2-butene prevents rotation, while chlorine atoms in dichloroethane attract each other.'
  ],
  correctIndex: 0,
  hintAfter: 'Pi overlap requires parallel p-orbitals. Twisting the C=C bond by 90° completely destroys the sideways overlap, introducing a high thermal energy barrier for rotation at ambient temperatures.',
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Orbital Hybridization & Bond Rotation Energy',
    instruction: 'Select carbon hybridization state (sp² vs sp³), adjust bond rotation angle, and observe pi-orbital overlap destruction and potential energy curve.',
    interactionType: 'orbital-rotator',
    nodeId: NODE_C11_CHEM_081,
  },
  {
    title: 'Lab 2: Geometrical Stereochemistry & Physical Property Analysis',
    instruction: 'Construct cis-2-butene and trans-2-butene. Measure their dipole moments, boiling points, and melting points in the virtual analytical instrument.',
    interactionType: 'cis-trans-analyzer',
    nodeId: NODE_C11_CHEM_082,
  },
  {
    title: 'Lab 3: Stereospecific Alkyne Reduction (Lindlar vs Birch)',
    instruction: 'Select 2-butyne and react with either Lindlar Catalyst (H₂/Pd/CaCO₃ + quinoline) or Sodium in Liquid Ammonia to synthesize stereospecific alkenes.',
    interactionType: 'alkyne-reducer',
    nodeId: NODE_C11_CHEM_084,
  },
  {
    title: 'Lab 4: Dehydrohalogenation & Carbocation Rearrangement Dehydration',
    instruction: 'Dehydrate 3,3-dimethylbutan-2-ol with H₂SO₄/heat. Observe the 1,2-methyl shift producing the major Saytzeff product (2,3-dimethylbut-2-ene).',
    interactionType: 'elimination-simulator',
    nodeId: NODE_C11_CHEM_087,
  },
  {
    title: 'Lab 5: Kolbe Electrolysis & Alkene Stability Visualizer',
    instruction: 'Run electrolysis on potassium succinate to observe anode gas evolution, then measure heats of hydrogenation across differently substituted alkenes.',
    interactionType: 'kolbe-stability-lab',
    nodeId: NODE_C11_CHEM_088,
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict the major organic alkene product formed when 2-bromo-2-methylbutane is treated with hot alcoholic potassium hydroxide (KOH).',
    options: [
      '2-methylbut-2-ene (more substituted, Saytzeff product)',
      '2-methylbut-1-ene (less substituted product)',
      '3-methylbut-1-ene (rearranged product)',
      '2-methylbutan-2-ol (substitution product)'
    ],
    correctIndex: 0,
    verifyInstruction: 'In Lab 4, select 2-bromo-2-methylbutane under E2 elimination with Alc. KOH to measure the product ratio.',
    nodeId: NODE_C11_CHEM_085,
  },
  {
    question: 'Predict the geometry of the product formed when 3-hexyne is reduced using Sodium (Na) in liquid Ammonia (NH₃) at low temperature.',
    options: [
      'trans-hex-3-ene (anti-addition mechanism via radical anion)',
      'cis-hex-3-ene (syn-addition mechanism on catalyst surface)',
      'hexane (complete reduction to alkane)',
      '1,2-hexadiene (allene formation)'
    ],
    correctIndex: 0,
    verifyInstruction: 'In Lab 3, select 3-hexyne and apply Na/liq. NH₃ (Birch reduction) to inspect the stereochemical output.',
    nodeId: NODE_C11_CHEM_084,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the relative boiling points of cis-2-butene versus trans-2-butene?',
    observableOptions: [
      'cis-2-butene has a higher boiling point (+3.7°C) than trans-2-butene (+0.9°C) due to a higher net molecular dipole moment.',
      'trans-2-butene has a higher boiling point because its symmetrical geometry allows tighter liquid packing.',
      'Both cis and trans isomers have identical boiling points because they share the same molecular formula C4H8.',
      'trans-2-butene has zero dipole moment, giving it an extremely high boiling point above 100°C.'
    ],
    correctIndex: 0,
    nodeId: NODE_C11_CHEM_089,
  },
  {
    question: 'What happens to the temperature change (Heat of Hydrogenation, ΔH_hyd) as the degree of alkyl substitution on the C=C bond increases?',
    observableOptions: [
      'ΔH_hyd becomes less exothermic (decreases in magnitude), proving that highly substituted alkenes are more thermodynamically stable.',
      'ΔH_hyd becomes more exothermic, showing that alkyl groups destabilize the double bond.',
      'ΔH_hyd remains constant at -120 kJ/mol regardless of alkyl groups.',
      'ΔH_hyd becomes zero because double bonds cannot react with hydrogen.'
    ],
    correctIndex: 0,
    nodeId: NODE_C11_CHEM_090,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Synthesis of Polymer-Grade Ethylene & Stereospecific Pheromones',
  description: 'In petrochemical refiners and pharmaceutical labs, precise control over alkene geometry and substitution determines material properties—from high-density polyethylene (HDPE) synthesis to insect pheromone potency.',
  steps: [
    'Step 1: Calculate the theoretical yield of ethene produced from the electrolysis of 150 g of potassium succinate in Kolbe’s cell at 85% current efficiency.',
    'Step 2: Determine the E/Z stereochemistry of the synthetic insect attractant (Z)-9-tricosene using Cahn-Ingold-Prelog priority rules.',
    'Step 3: Analyze the catalytic dehydration of 2-methylcyclohexanol to evaluate the ratio of 1-methylcyclohexene vs 3-methylcyclohexene based on Saytzeff stability.',
    'Step 4: Verify how hyperconjugation structures (α-hydrogens = 12 in tetramethylethylene) provide thermodynamic stabilization against thermal cracking.',
  ],
};

const MISCONCEPTIONS_DATA = [
  {
    title: 'Pi Bonds Formed by Overlap of sp2 Hybrid Orbitals',
    misconception: 'Students often believe that both the sigma and pi bonds in an alkene double bond are formed by the overlap of sp2 hybridized orbitals.',
    correction: 'In sp2 hybridized carbon atoms, three sp2 hybrid orbitals form sigma bonds in a planar 120° geometry. The pi bond is formed exclusively by the sideways overlap of unhybridized perpendicular p-orbitals.',
    nodeId: NODE_C11_CHEM_081,
  },
  {
    title: 'Alcohol Dehydration Always Yields a Single Unique Product',
    misconception: 'Students frequently think acid-catalyzed dehydration of an unsymmetrical alcohol yields only one product without rearrangement.',
    correction: 'Dehydration proceeds via a carbocation intermediate that can undergo 1,2-hydride or 1,2-methyl shifts to yield a more stable carbocation, producing major and minor isomeric alkenes per Saytzeff rule.',
    nodeId: NODE_C11_CHEM_087,
  },
  {
    title: 'Dehydrohalogenation Removes Hydrogen from Carbon with More Hydrogens',
    misconception: 'Students assume dehydrohalogenation removes β-hydrogen from the carbon that has more hydrogen atoms.',
    correction: 'According to Saytzeff (Zaitsev) rule, elimination removes hydrogen primarily from the β-carbon with FEWER hydrogen atoms, forming the more highly substituted, thermodynamically stable alkene.',
    nodeId: NODE_C11_CHEM_085,
  },
  {
    title: 'Free Rotation Exists Around Carbon-Carbon Double Bonds',
    misconception: 'Students assume groups on a double bond can freely rotate like in single-bonded alkanes.',
    correction: 'Pi overlap requires parallel p-orbitals. Rotating around C=C breaks pi overlap, requiring ~264 kJ/mol energy barrier, which locks the molecule into distinct cis/trans or E/Z stereoisomers.',
    nodeId: NODE_C11_CHEM_082,
  },
  {
    title: 'Pi Bonds Are Stronger Than Sigma Bonds in Alkenes',
    misconception: 'Students think that because C=C is stronger overall than C-C, the pi bond must be stronger than the sigma bond.',
    correction: 'An individual pi bond (~264 kJ/mol) is significantly weaker than a sigma bond (~347 kJ/mol) due to lateral vs direct head-on orbital overlap. This makes pi bonds reactive centers for electrophilic additions.',
    nodeId: NODE_C11_CHEM_081,
  },
  {
    title: 'Lindlar Catalyst Reduces Alkynes All the Way to Alkanes',
    misconception: 'Students assume hydrogen gas with any catalyst reduces alkynes directly to alkanes.',
    correction: 'Lindlar catalyst (Pd/CaCO3 partially poisoned with lead acetate or quinoline) selectively reduces alkynes to CIS-alkenes and stops, preventing further reduction to alkanes.',
    nodeId: NODE_C11_CHEM_084,
  },
];

// ==========================================
// 3. TYPES & INTERFACES
// ==========================================

export interface Challenge {
  id: string;
  nodeId: string;
  type: 'mcq' | 'numeric' | 'drag-label' | 'distinguish';
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

export interface AlkeneMolecule {
  name: string;
  formula: string;
  iupac: string;
  substituents: string[];
  alphaHydrogens: number;
  heatOfHydrogenation: number; // kJ/mol
  dipoleCis: number; // Debye
  dipoleTrans: number; // Debye
  bpCis: number; // °C
  bpTrans: number; // °C
  mpCis: number; // °C
  mpTrans: number; // °C
}

// ==========================================
// 4. CHALLENGES DATA ARRAY (24 CHALLENGES)
// ==========================================

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION LEVEL (7) ---
  {
    id: 'c1',
    nodeId: NODE_C11_CHEM_081,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the hybridization state of carbon atoms involved in a carbon-carbon double bond (C=C) in ethene?',
    options: ['sp hybridization', 'sp² hybridization', 'sp³ hybridization', 'dsp² hybridization'],
    correctIndex: 1,
    explanation: 'Each carbon atom in ethene forms 3 sigma bonds using three sp² hybrid orbitals arranged in a planar triangle with 120° bond angles. The fourth unhybridized p-orbital forms the pi bond.',
    hints: [
      'Recall how many sigma bonds each double-bonded carbon forms.',
      'Three sigma bonds in a plane correspond to 120° bond angles.',
      'Three hybrid orbitals are formed from one s and two p orbitals: sp².'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'c2',
    nodeId: NODE_C11_CHEM_081,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'How is the pi (π) bond in an alkene double bond formed?',
    options: [
      'Head-on overlap of two sp² hybrid orbitals',
      'Sideways (lateral) overlap of two unhybridized perpendicular p-orbitals',
      'Coaxial overlap of two s-orbitals',
      'Overlap of an sp² hybrid orbital with a 1s orbital of hydrogen'
    ],
    correctIndex: 1,
    explanation: 'The pi (π) bond is formed by the lateral (sideways) parallel overlap of unhybridized 2p orbitals located above and below the plane of the sp² hybridized sigma framework.',
    hints: [
      'Sigma bonds are formed by head-on overlap; pi bonds are formed by lateral overlap.',
      'Hybridized orbitals only form sigma bonds.',
      'Look for the unhybridized perpendicular p-orbitals.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'c3',
    nodeId: NODE_C11_CHEM_082,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which of the following compounds is CAPABLE of exhibiting geometrical (cis-trans) isomerism?',
    options: [
      'Ethene (CH₂=CH₂)',
      'Propene (CH₃-CH=CH₂)',
      'But-1-ene (CH₃-CH₂-CH=CH₂)',
      'But-2-ene (CH₃-CH=CH-CH₃)'
    ],
    correctIndex: 3,
    explanation: 'Geometrical isomerism requires that each doubly bonded carbon atom must be attached to two DIFFERENT atoms or groups. In But-2-ene, C2 has (H, CH₃) and C3 has (H, CH₃). In But-1-ene and propene, C1 has two identical H atoms.',
    hints: [
      'Check if any alkene carbon has two identical atoms attached to it.',
      'If a carbon has two hydrogens (-CH₂=), it CANNOT show cis-trans isomerism.',
      'Only But-2-ene has two different groups on BOTH double-bonded carbons.'
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'c4',
    nodeId: NODE_C11_CHEM_083,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the correct IUPAC name for CH₃-CH=CH-CH₂-CH₃?',
    options: ['Pent-1-ene', 'Pent-2-ene', 'Pent-3-ene', '2-pentene'],
    correctIndex: 1,
    explanation: 'Numbering the 5-carbon chain from the end closest to the double bond gives the C=C bond starting at C-2. Therefore, the IUPAC name is Pent-2-ene (or 2-pentene).',
    hints: [
      'Find the longest carbon chain containing the double bond.',
      'Number from the end that gives the lower locant to the double bond.',
      'Left to right: double bond starts at position 2.'
    ],
  },
  {
    id: 'c5',
    nodeId: NODE_C11_CHEM_084,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which reagent selectively reduces an alkyne to a CIS-alkene?',
    options: [
      'Sodium in liquid ammonia (Na / liq. NH₃)',
      'Hydrogen gas with Lindlar catalyst (H₂ / Pd / CaCO₃ + quinoline)',
      'Concentrated H₂SO₄ at 170°C',
      'Alcoholic KOH solution'
    ],
    correctIndex: 1,
    explanation: 'Controlled catalytic hydrogenation of alkynes using Lindlar’s catalyst (palladium poisoned with calcium carbonate/lead acetate and quinoline) gives cis-alkenes via syn-addition.',
    hints: [
      'Lindlar catalyst performs syn-addition on metal surfaces.',
      'Na/liq. NH₃ gives trans-alkenes via Birch reduction.',
      'Syn-addition yields the cis stereoisomer.'
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'c6',
    nodeId: NODE_C11_CHEM_086,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Vicinal dihalides yield alkenes when treated with which reagent?',
    options: ['Aqueous KOH', 'Zinc dust in ethanol', 'Concentrated H₂SO₄', 'Lindlar catalyst'],
    correctIndex: 1,
    explanation: 'Vicinal dihalides (compounds with halogen atoms on adjacent carbons) undergo dehalogenation when heated with Zinc dust in methanol or ethanol to yield alkenes.',
    hints: [
      'Dehalogenation requires a metal that removes halogen atoms as ZnX₂.',
      'Zinc acts as a reducing agent in ethanol.',
      'Zn removes both halogen atoms from adjacent carbons.'
    ],
  },
  {
    id: 'c7',
    nodeId: NODE_C11_CHEM_089,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Why does cis-2-butene have a higher boiling point than trans-2-butene?',
    options: [
      'Cis-2-butene has a lower molecular mass.',
      'Cis-2-butene has a non-zero dipole moment leading to stronger dipole-dipole attractions in the liquid state.',
      'Trans-2-butene is completely insoluble in organic solvents.',
      'Cis-2-butene has a symmetrical structure with zero net dipole moment.'
    ],
    correctIndex: 1,
    explanation: 'In cis-2-butene, the bond dipoles of the two C-CH₃ bonds add vectorially, giving a net dipole moment (~0.33 D). Trans-2-butene is symmetrical, so its bond dipoles cancel (dipole moment = 0 D). Higher dipole moment increases intermolecular dipole-dipole attractions and boiling point.',
    hints: [
      'Consider vector addition of C-methyl group dipoles.',
      'Symmetrical trans isomer dipoles cancel to zero.',
      'Greater dipole moment = stronger attraction = higher boiling point.'
    ],
  },

  // --- STANDARD LEVEL (8) ---
  {
    id: 'c8',
    nodeId: NODE_C11_CHEM_085,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'According to Saytzeff’s (Zaitsev’s) rule, which alkene is the MAJOR product during the dehydrohalogenation of 2-bromobutane with alcoholic KOH?',
    options: [
      'But-1-ene (unsubstituted alkene)',
      'trans-But-2-ene / cis-But-2-ene mixture (more substituted alkene)',
      'But-2-yne',
      'Butan-2-ol'
    ],
    correctIndex: 1,
    explanation: 'Saytzeff’s rule states that elimination of HX from an alkyl halide yields preferentially the more highly alkylated (more substituted) alkene because it is thermodynamically more stable. Thus, But-2-ene is the major product over But-1-ene.',
    hints: [
      'Identify the two potential β-carbons: C1 (3 H\'s) and C3 (2 H\'s).',
      'Saytzeff rule removes H from the β-carbon with FEWER hydrogens (C3).',
      'This yields the 1,2-disubstituted alkene: But-2-ene.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'c9',
    nodeId: NODE_C11_CHEM_087,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'When 3,3-dimethylbutan-2-ol is heated with concentrated H₂SO₄, what is the major alkene product formed after rearrangement?',
    options: [
      '3,3-dimethylbut-1-ene',
      '2,3-dimethylbut-2-ene',
      '2,3-dimethylbut-1-ene',
      '2-methylpent-2-ene'
    ],
    correctIndex: 1,
    explanation: 'Protonation and loss of water generates a secondary carbocation at C2: (CH₃)₃C-CH⁺-CH₃. A 1,2-methyl shift occurs to form a more stable tertiary carbocation: (CH₃)₂C⁺-CH(CH₃)₂. Subsequent elimination of H⁺ gives 2,3-dimethylbut-2-ene as the tetrasubstituted major product.',
    hints: [
      'Form the initial secondary carbocation at C2.',
      'Check if a 1,2-hydride or 1,2-methyl shift produces a tertiary carbocation.',
      'A 1,2-methyl shift creates a tertiary carbocation; elimination then yields the tetrasubstituted alkene.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'c10',
    nodeId: NODE_C11_CHEM_084,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'What is the product formed when hex-3-yne is reacted with Sodium in liquid Ammonia (Na / liq. NH₃)?',
    options: [
      'cis-hex-3-ene',
      'trans-hex-3-ene',
      'hex-1-ene',
      'hexane'
    ],
    correctIndex: 1,
    explanation: 'Birch reduction of internal alkynes using alkali metals (Na or Li) in liquid ammonia proceeds via anti-addition through radical anion intermediates, yielding trans-alkenes with high stereoselectivity.',
    hints: [
      'Na in liquid NH₃ is a Birch reduction.',
      'Birch reduction adds hydrogen atoms to OPPOSITE sides of the triple bond.',
      'Anti-addition yields the TRANS isomer.'
    ],
  },
  {
    id: 'c11',
    nodeId: NODE_C11_CHEM_088,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'During Kolbe’s electrolytic synthesis of ethene using potassium succinate solution, what gases are evolved at the ANODE?',
    options: [
      'Only Ethene (C₂H₄)',
      'Ethene (C₂H₄) and Carbon dioxide (CO₂)',
      'Hydrogen gas (H₂) and Carbon dioxide (CO₂)',
      'Oxygen gas (O₂) and Ethene (C₂H₄)'
    ],
    correctIndex: 1,
    explanation: 'At the anode, succinate anions undergo oxidation (loss of electrons) to form succinate dicarboxylate radicals, which decarboxylate releasing 2 molecules of CO₂ and form a diradical (•CH₂-CH₂•) that recombines to form Ethene (C₂H₄). H₂ is evolved at the cathode.',
    hints: [
      'Oxidation occurs at the anode.',
      'Carboxylate groups (-COO⁻) lose electrons to form CO₂ gas.',
      'The hydrocarbon fragment forms ethene: both C₂H₄ and CO₂ evolve at the anode.'
    ],
  },
  {
    id: 'c12',
    nodeId: NODE_C11_CHEM_090,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Calculate the total number of hyperconjugative α-hydrogens present in 2,3-dimethylbut-2-ene.',
    correctAnswer: 12,
    tolerance: 0,
    unit: 'alpha-hydrogens',
    explanation: '2,3-dimethylbut-2-ene has the structure (CH₃)₂C=C(CH₃)₂. There are four methyl groups directly attached to the sp² carbons. Each methyl group has 3 α-hydrogens. Total = 4 × 3 = 12 α-hydrogens.',
    hints: [
      'Draw the structure: (CH₃)₂C=C(CH₃)₂.',
      'Count all hydrogen atoms on carbons directly attached to the sp² C=C carbons.',
      'There are 4 methyl groups, each containing 3 α-hydrogens: 4 × 3 = 12.'
    ],
  },
  {
    id: 'c13',
    nodeId: NODE_C11_CHEM_083,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'According to the Cahn-Ingold-Prelog (CIP) priority rules, what is the stereochemical designation (E or Z) for (E)-2-butene?',
    options: [
      'E configuration (high priority groups on OPPOSITE sides of C=C)',
      'Z configuration (high priority groups on SAME side of C=C)',
      'R configuration',
      'S configuration'
    ],
    correctIndex: 0,
    explanation: 'In CIP priority rules, -CH₃ (atomic number of C = 6) has higher priority than -H (atomic number = 1). In trans-2-butene, the two high-priority methyl groups are on opposite sides of the double bond, corresponding to the (E)-configuration (from German "entgegen" = opposite).',
    hints: [
      'Assign priorities at each carbon: -CH₃ > -H.',
      'Check if the two high priority -CH₃ groups are on the same or opposite sides.',
      'Opposite sides = Entgegen = (E).'
    ],
  },
  {
    id: 'c14',
    nodeId: NODE_C11_CHEM_087,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'What is the relative order of ease of acid-catalyzed dehydration for primary (1°), secondary (2°), and tertiary (3°) alcohols?',
    options: [
      '1° > 2° > 3°',
      '3° > 2° > 1°',
      '2° > 1° > 3°',
      'All dehydrate at identical rates'
    ],
    correctIndex: 1,
    explanation: 'Acid-catalyzed dehydration proceeds via a carbocation intermediate. The stability of carbocations follows the order 3° > 2° > 1° due to hyperconjugation and inductive effects. Thus, tertiary alcohols dehydrate easiest under mild conditions.',
    hints: [
      'Dehydration rate depends on the stability of the intermediate carbocation.',
      'Which carbocation is most stable: 3°, 2°, or 1°?',
      '3° carbocation is most stable, so 3° alcohol dehydrates fastest.'
    ],
  },
  {
    id: 'c15',
    nodeId: NODE_C11_CHEM_089,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'Why does trans-2-butene have a HIGHER melting point than cis-2-butene, despite having a lower boiling point?',
    options: [
      'Trans-2-butene has stronger dipole-dipole forces.',
      'Trans-2-butene has a more symmetrical planar shape that packs more tightly and efficiently into a crystal lattice.',
      'Cis-2-butene forms hydrogen bonds in the solid state.',
      'Trans-2-butene has a higher molecular mass.'
    ],
    correctIndex: 1,
    explanation: 'Melting point depends heavily on crystal lattice packing efficiency. The symmetrical trans-2-butene fits much more tightly into a crystal lattice than the bent cis-2-butene, requiring more thermal energy to break the lattice (higher MP).',
    hints: [
      'Boiling point depends on intermolecular dipole attractions; melting point depends on lattice packing.',
      'Symmetrical molecules pack better in solid crystal lattices.',
      'Trans is symmetrical -> tighter packing -> higher melting point.'
    ],
  },

  // --- ADVANCED LEVEL (7) ---
  {
    id: 'c16',
    nodeId: NODE_C11_CHEM_081,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'If the carbon-carbon single bond energy in ethane is 347 kJ/mol and the carbon-carbon double bond energy in ethene is 611 kJ/mol, calculate the approximate strength of the pi (π) bond in ethene in kJ/mol.',
    correctAnswer: 264,
    tolerance: 2,
    unit: 'kJ/mol',
    explanation: 'The C=C double bond consists of one sigma (σ) bond and one pi (π) bond. Assuming the sigma bond strength is approximately equal to a single C-C bond (347 kJ/mol): E(π) = E(C=C) - E(σ) = 611 - 347 = 264 kJ/mol.',
    hints: [
      'C=C strength = E(sigma) + E(pi).',
      'Subtract the single bond energy (347) from the double bond energy (611).',
      '611 - 347 = 264 kJ/mol.'
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'c17',
    nodeId: NODE_C11_CHEM_090,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Arrange the following alkenes in order of INCREASING thermodynamic stability (least stable to most stable): (I) Ethene, (II) Propene, (III) trans-But-2-ene, (IV) 2,3-dimethylbut-2-ene.',
    options: [
      'I < II < III < IV',
      'IV < III < II < I',
      'II < I < IV < III',
      'I < III < II < IV'
    ],
    correctIndex: 0,
    explanation: 'Alkene stability increases with the degree of alkyl substitution due to hyperconjugation: Ethene (0 α-H) < Propene (3 α-H) < trans-But-2-ene (6 α-H) < 2,3-dimethylbut-2-ene (12 α-H).',
    hints: [
      'Count the number of alkyl substituents / alpha-hydrogens on each alkene.',
      'Ethene has 0, Propene has 3, trans-But-2-ene has 6, 2,3-dimethylbut-2-ene has 12.',
      'More alpha-hydrogens = greater stability.'
    ],
  },
  {
    id: 'c18',
    nodeId: NODE_C11_CHEM_085,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'When 2-bromo-2,3-dimethylbutane is treated with Potassium tert-butoxide ((CH₃)₃CO⁻K⁺, a bulky base), what is the MAJOR elimination product formed?',
    options: [
      '2,3-dimethylbut-2-ene (Saytzeff product)',
      '2,3-dimethylbut-1-ene (Hofmann product)',
      '3,3-dimethylbut-1-ene',
      '2,3-dimethylbutan-2-ol'
    ],
    correctIndex: 1,
    explanation: 'When a steric hindered bulky base like tert-butoxide is used, it cannot easily abstract the more sterically hindered β-hydrogen on the interior carbon. It preferentially abstracts the less hindered β-hydrogen from the terminal methyl group, yielding the less substituted Hofmann product (2,3-dimethylbut-1-ene) as major.',
    hints: [
      'tert-Butoxide is a large, bulky base.',
      'Bulky bases cannot access crowded internal beta-hydrogens easily.',
      'Bulky bases abstract the most accessible terminal hydrogen -> Hofmann product.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'c19',
    nodeId: NODE_C11_CHEM_087,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Dehydration of 2-methylcyclohexanol with concentrated H₃PO₄ yields 1-methylcyclohexene as the major product. What mechanism and shift explain this outcome?',
    options: [
      'E1 mechanism with a 1,2-hydride shift from C1 to C2 forming a tertiary carbocation',
      'E2 mechanism without carbocation intermediate',
      'Free radical elimination',
      'E1 mechanism with a 1,2-methyl shift'
    ],
    correctIndex: 0,
    explanation: 'Protonation of 2-methylcyclohexanol followed by loss of H₂O gives a secondary carbocation at C2. A 1,2-hydride shift from C1 to C2 yields a much more stable 3° carbocation at C1. Subsequent elimination of H⁺ gives 1-methylcyclohexene as the major trisubstituted alkene.',
    hints: [
      'Initial carbocation at C2 is secondary.',
      'C1 has a methyl group AND a hydrogen atom.',
      'A 1,2-hydride shift from C1 to C2 creates a 3° carbocation at C1.'
    ],
  },
  {
    id: 'c20',
    nodeId: NODE_C11_CHEM_088,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'How many moles of gas in TOTAL (at anode and cathode combined) are evolved during Kolbe electrolysis of 1 mole of potassium succinate in aqueous solution assuming 100% reaction efficiency?',
    correctAnswer: 4,
    tolerance: 0,
    unit: 'moles of gas',
    explanation: 'At the anode: 1 mol potassium succinate -> 1 mol C₂H₄ (gas) + 2 mol CO₂ (gas) = 3 mol gas. At the cathode: 2 mol H₂O + 2e⁻ -> H₂ (gas) + 2 OH⁻ = 1 mol H₂ gas. Total gas evolved = 1 (C₂H₄) + 2 (CO₂) + 1 (H₂) = 4 moles of gas.',
    hints: [
      'Anode products: C₂H₄ (1 mol) + CO₂ (2 mol).',
      'Cathode product: H₂ (1 mol).',
      'Add all gaseous product moles: 1 + 2 + 1 = 4 moles.'
    ],
  },
  {
    id: 'c21',
    nodeId: NODE_C11_CHEM_090,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'The heat of hydrogenation of cis-2-butene is -119.6 kJ/mol and that of trans-2-butene is -115.5 kJ/mol. Calculate the energy difference (steric strain in cis isomer) in kJ/mol.',
    correctAnswer: 4.1,
    tolerance: 0.2,
    unit: 'kJ/mol',
    explanation: 'Energy difference = |(-119.6) - (-115.5)| = 4.1 kJ/mol. Cis-2-butene releases 4.1 kJ/mol more energy upon hydrogenation because it starts at a higher potential energy state due to steric repulsion between cis methyl groups.',
    hints: [
      'Subtract the two values: 119.6 - 115.5.',
      'The difference represents the higher ground-state energy of the cis isomer.',
      '119.6 - 115.5 = 4.1 kJ/mol.'
    ],
  },
  {
    id: 'c22',
    nodeId: NODE_C11_CHEM_083,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'What is the correct IUPAC stereochemical designation for (2E,4Z)-hexa-2,4-diene?',
    options: [
      'C2-C3 double bond is E (trans-like) and C4-C5 double bond is Z (cis-like)',
      'Both double bonds are E',
      'Both double bonds are Z',
      'C2-C3 double bond is Z and C4-C5 double bond is E'
    ],
    correctIndex: 0,
    explanation: '(2E,4Z)-hexa-2,4-diene has two double bonds. At C2=C3, high priority groups are on opposite sides (E). At C4=C5, high priority groups are on the same side (Z).',
    hints: [
      'Break down the prefix (2E, 4Z).',
      '2E means at position 2 the configuration is Entgegen (opposite).',
      '4Z means at position 4 the configuration is Zusammen (same side).'
    ],
  },
  {
    id: 'c23',
    nodeId: NODE_C11_CHEM_082,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Which of the following oximes can exhibit geometrical isomerism analogous to alkenes?',
    options: [
      'Acetone oxime ((CH₃)₂C=N-OH)',
      'Benzaldehyde oxime (C₆H₅-CH=N-OH)',
      'Formaldehyde oxime (CH₂=N-OH)',
      'Cyclohexanone oxime'
    ],
    correctIndex: 1,
    explanation: 'In Benzaldehyde oxime, the C=N carbon is attached to C₆H₅ and H (two different groups), and the nitrogen is attached to -OH and a lone pair (two different environments). This allows Syn and Anti geometrical isomerism.',
    hints: [
      'C=N double bonds can show geometrical isomerism if C has 2 different groups and N has -OH and lone pair.',
      'In acetone oxime, carbon has two identical methyl groups.',
      'In benzaldehyde oxime, carbon has H and phenyl (C6H5).'
    ],
  },
  {
    id: 'c24',
    nodeId: NODE_C11_CHEM_086,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Dehalogenation of meso-2,3-dibromobutane with Zinc dust yields predominantly which alkene stereoisomer via anti-elimination?',
    options: [
      'trans-But-2-ene',
      'cis-But-2-ene',
      'But-1-ene',
      'Equal 1:1 mixture of cis and trans'
    ],
    correctIndex: 0,
    explanation: 'Anti-elimination of Br₂ from meso-2,3-dibromobutane requires a periplanar anti-conformation where the two Br atoms are at 180° dihedral angle. In this conformation, the two methyl groups are oriented anti to each other, producing pure trans-But-2-ene.',
    hints: [
      'Meso isomer has an internal plane of symmetry.',
      'Dehalogenation proceeds stereospecifically via anti-elimination.',
      'Anti-elimination of meso diastereomer gives trans-alkene.'
    ],
  }
];

// ==========================================
// 5. HELPER SVG & CANVAS SUB-COMPONENTS
// ==========================================

// --- Diagram 1: Orbital Overlap & Rotation SVG ---
const OrbitalOverlapSVG: React.FC<{ angle: number; isSp2: boolean }> = ({ angle, isSp2 }) => {
  const rad = (angle * Math.PI) / 180;
  const overlapQuality = Math.abs(Math.cos(rad));
  const piAlpha = overlapQuality;
  const breakEnergy = (1 - Math.abs(Math.cos(rad))) * 264;

  return (
    <svg viewBox="0 0 600 260" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 shadow-2xl">
      <defs>
        <radialGradient id="pOrbitalGradTop" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.3" />
        </radialGradient>
        <radialGradient id="pOrbitalGradBottom" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#e11d48" stopOpacity="0.3" />
        </radialGradient>
        <linearGradient id="sigmaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      {/* Grid line background */}
      <line x1="50" y1="130" x2="550" y2="130" stroke="#334155" strokeDasharray="4 4" strokeWidth="1" />
      <line x1="300" y1="20" x2="300" y2="240" stroke="#334155" strokeDasharray="4 4" strokeWidth="1" />

      {/* Title / Energy overlay */}
      <text x="20" y="30" fill="#94a3b8" fontSize="13" fontFamily="sans-serif" fontWeight="bold">
        ORBITAL OVERLAP SIMULATOR: {isSp2 ? 'sp² Hybridized (C=C)' : 'sp³ Hybridized (C-C)'}
      </text>

      {/* Carbon 1 (Fixed) */}
      <g transform="translate(200, 130)">
        {/* Sigma bond hybrid lobes */}
        <ellipse cx="0" cy="0" rx="45" ry="18" fill="url(#sigmaGrad)" opacity="0.85" />
        <circle cx="0" cy="0" r="14" fill="#0f172a" stroke="#a855f7" strokeWidth="3" />
        <text x="-5" y="5" fill="#e2e8f0" fontSize="12" fontWeight="bold">C1</text>

        {isSp2 && (
          <g>
            {/* Top p-orbital lobe */}
            <ellipse cx="0" cy="-55" rx="20" ry="45" fill="url(#pOrbitalGradTop)" />
            {/* Bottom p-orbital lobe */}
            <ellipse cx="0" cy="55" rx="20" ry="45" fill="url(#pOrbitalGradBottom)" />
            <text x="-12" y="-105" fill="#38bdf8" fontSize="11">2p_z (+)</text>
            <text x="-12" y="115" fill="#f43f5e" fontSize="11">2p_z (-)</text>
          </g>
        )}
      </g>

      {/* Carbon 2 (Rotatable) */}
      <g transform={`translate(400, 130) rotate(${angle})`}>
        {/* Sigma bond hybrid lobes */}
        <ellipse cx="0" cy="0" rx="45" ry="18" fill="url(#sigmaGrad)" opacity="0.85" />
        <circle cx="0" cy="0" r="14" fill="#0f172a" stroke="#a855f7" strokeWidth="3" />
        <text x="-5" y="5" fill="#e2e8f0" fontSize="12" fontWeight="bold">C2</text>

        {isSp2 && (
          <g>
            {/* Top p-orbital lobe */}
            <ellipse cx="0" cy="-55" rx="20" ry="45" fill="url(#pOrbitalGradTop)" opacity={0.3 + 0.7 * piAlpha} />
            {/* Bottom p-orbital lobe */}
            <ellipse cx="0" cy="55" rx="20" ry="45" fill="url(#pOrbitalGradBottom)" opacity={0.3 + 0.7 * piAlpha} />
          </g>
        )}
      </g>

      {/* Pi-bond Sideways Overlap Cloud Representation */}
      {isSp2 && (
        <g opacity={piAlpha}>
          {/* Top pi cloud bridge */}
          <path d="M 200 75 Q 300 50 400 75 Q 300 90 200 75 Z" fill="#38bdf8" opacity="0.4" stroke="#38bdf8" strokeWidth="1.5" />
          {/* Bottom pi cloud bridge */}
          <path d="M 200 185 Q 300 210 400 185 Q 300 170 200 185 Z" fill="#f43f5e" opacity="0.4" stroke="#f43f5e" strokeWidth="1.5" />
        </g>
      )}

      {/* Energy Strain & Status Gauge */}
      <rect x="440" y="20" width="140" height="70" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1" />
      <text x="450" y="40" fill="#94a3b8" fontSize="11">Rotation Angle: <tspan fill="#38bdf8" fontWeight="bold">{angle}°</tspan></text>
      <text x="450" y="58" fill="#94a3b8" fontSize="11">π-Overlap: <tspan fill={piAlpha > 0.7 ? '#4ade80' : '#f87171'} fontWeight="bold">{Math.round(piAlpha * 100)}%</tspan></text>
      <text x="450" y="76" fill="#94a3b8" fontSize="11">Torsion Energy: <tspan fill="#fbbf24" fontWeight="bold">{breakEnergy.toFixed(1)} kJ/mol</tspan></text>
    </svg>
  );
};

// --- Diagram 2: Cis-Trans Molecular Structure SVG ---
const CisTransGeomSVG: React.FC<{ isTrans: boolean; moleculeName: string }> = ({ isTrans, moleculeName }) => {
  return (
    <svg viewBox="0 0 500 220" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 p-2 shadow-xl">
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <text x="250" y="25" textAnchor="middle" fill="#38bdf8" fontSize="15" fontWeight="bold">
        {moleculeName} — {isTrans ? 'TRANS / (E) ISOMER' : 'CIS / (Z) ISOMER'}
      </text>

      {/* Central C=C Double Bond */}
      <line x1="200" y1="105" x2="300" y2="105" stroke="#cbd5e1" strokeWidth="6" />
      <line x1="200" y1="115" x2="300" y2="115" stroke="#38bdf8" strokeWidth="4" />

      {/* Left Carbon C2 */}
      <circle cx="200" cy="110" r="18" fill="#334155" stroke="#38bdf8" strokeWidth="3" />
      <text x="195" y="115" fill="#ffffff" fontSize="14" fontWeight="bold">C</text>

      {/* Right Carbon C3 */}
      <circle cx="300" cy="110" r="18" fill="#334155" stroke="#38bdf8" strokeWidth="3" />
      <text x="295" y="115" fill="#ffffff" fontSize="14" fontWeight="bold">C</text>

      {/* Substituents Left side (C2) */}
      {/* Top Left: CH3 */}
      <line x1="200" y1="110" x2="130" y2="60" stroke="#94a3b8" strokeWidth="4" />
      <circle cx="130" cy="60" r="22" fill="#0284c7" />
      <text x="115" y="65" fill="#ffffff" fontSize="12" fontWeight="bold">CH₃</text>

      {/* Bottom Left: H */}
      <line x1="200" y1="110" x2="130" y2="160" stroke="#94a3b8" strokeWidth="3" />
      <circle cx="130" cy="160" r="14" fill="#64748b" />
      <text x="125" y="165" fill="#ffffff" fontSize="12" fontWeight="bold">H</text>

      {/* Substituents Right side (C3) */}
      {!isTrans ? (
        /* CIS Configuration: CH3 on TOP, H on BOTTOM */
        <>
          <line x1="300" y1="110" x2="370" y2="60" stroke="#94a3b8" strokeWidth="4" />
          <circle cx="370" cy="60" r="22" fill="#0284c7" />
          <text x="355" y="65" fill="#ffffff" fontSize="12" fontWeight="bold">CH₃</text>

          <line x1="300" y1="110" x2="370" y2="160" stroke="#94a3b8" strokeWidth="3" />
          <circle cx="370" cy="160" r="14" fill="#64748b" />
          <text x="365" y="165" fill="#ffffff" fontSize="12" fontWeight="bold">H</text>

          {/* Dipole Vector CIS (Net Upward) */}
          <path d="M 250 170 L 250 40" stroke="#f43f5e" strokeWidth="3" strokeDasharray="5 3" markerEnd="url(#arrow)" />
          <polygon points="250,30 244,45 256,45" fill="#f43f5e" />
          <text x="260" y="45" fill="#f43f5e" fontSize="12" fontWeight="bold">Net Dipole μ ≠ 0 (Polar)</text>
        </>
      ) : (
        /* TRANS Configuration: H on TOP, CH3 on BOTTOM */
        <>
          <line x1="300" y1="110" x2="370" y2="60" stroke="#94a3b8" strokeWidth="3" />
          <circle cx="370" cy="60" r="14" fill="#64748b" />
          <text x="365" y="65" fill="#ffffff" fontSize="12" fontWeight="bold">H</text>

          <line x1="300" y1="110" x2="370" y2="160" stroke="#94a3b8" strokeWidth="4" />
          <circle cx="370" cy="160" r="22" fill="#0284c7" />
          <text x="355" y="165" fill="#ffffff" fontSize="12" fontWeight="bold">CH₃</text>

          {/* Dipole Cancellation TRANS */}
          <text x="250" y="200" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">
            Dipoles Cancel out Vectorially: μ = 0 D (Non-polar)
          </text>
        </>
      )}
    </svg>
  );
};

// --- Diagram 3: Carbocation Rearrangement Mechanism SVG ---
const DehydrationCarbocationSVG: React.FC<{ step: number }> = ({ step }) => {
  return (
    <svg viewBox="0 0 650 240" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 p-3 shadow-2xl">
      <text x="20" y="25" fill="#38bdf8" fontSize="14" fontWeight="bold">
        E1 Dehydration & 1,2-Methyl Shift Mechanism (3,3-dimethylbutan-2-ol)
      </text>

      {step === 0 && (
        <g transform="translate(40, 50)">
          <text x="0" y="20" fill="#e2e8f0" fontSize="13" fontWeight="bold">Step 1: Protonation of Alcohol & Loss of H₂O</text>
          {/* Reactant structure */}
          <text x="30" y="80" fill="#f87171" fontSize="18" fontFamily="monospace">
            (CH₃)₃C — CH(OH) — CH₃  + H⁺  ➔  (CH₃)₃C — CH(OH₂⁺) — CH₃  ➔ -H₂O
          </text>
          <rect x="30" y="110" width="540" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" />
          <text x="45" y="140" fill="#94a3b8" fontSize="12">
            Yields initial <tspan fill="#f59e0b" fontWeight="bold">2° Carbocation: (CH₃)₃C — CH⁺ — CH₃</tspan> (Less stable).
          </text>
        </g>
      )}

      {step === 1 && (
        <g transform="translate(40, 50)">
          <text x="0" y="20" fill="#e2e8f0" fontSize="13" fontWeight="bold">Step 2: 1,2-Methyl Shift (Rearrangement)</text>
          {/* Curved arrow shift representation */}
          <text x="40" y="70" fill="#cbd5e1" fontSize="16" fontFamily="monospace">
            CH₃ — C(CH₃)₂ — CH⁺ — CH₃
          </text>
          <path d="M 120 75 Q 150 40 180 75" fill="none" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow)" />
          <text x="110" y="35" fill="#f43f5e" fontSize="12" fontWeight="bold">1,2-CH₃ Shift</text>

          <text x="40" y="120" fill="#4ade80" fontSize="16" fontFamily="monospace">
            ➔  CH₃ — C⁺(CH₃) — CH(CH₃) — CH₃  (3° Carbocation - High Stability!)
          </text>
          <rect x="30" y="140" width="540" height="40" rx="8" fill="#1e293b" stroke="#4ade80" />
          <text x="45" y="165" fill="#94a3b8" fontSize="12">
            Hyperconjugation increases from 3 α-hydrogens to <tspan fill="#4ade80" fontWeight="bold">8 α-hydrogens</tspan>!
          </text>
        </g>
      )}

      {step === 2 && (
        <g transform="translate(40, 50)">
          <text x="0" y="20" fill="#e2e8f0" fontSize="13" fontWeight="bold">Step 3: Elimination of β-Proton (Saytzeff Rule)</text>
          <text x="40" y="75" fill="#38bdf8" fontSize="16" fontFamily="monospace">
            (CH₃)₂C⁺ — CH(CH₃)₂  — H⁺  ➔  (CH₃)₂C = C(CH₃)₂
          </text>
          <rect x="30" y="105" width="560" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" />
          <text x="45" y="130" fill="#4ade80" fontSize="13" fontWeight="bold">
            MAJOR PRODUCT: 2,3-dimethylbut-2-ene (Tetrasubstituted Alkene)
          </text>
          <text x="45" y="155" fill="#94a3b8" fontSize="12">
            12 Hyperconjugative α-hydrogens provide maximum thermodynamic stability.
          </text>
        </g>
      )}
    </svg>
  );
};

// --- Diagram 4: Kolbe Electrolysis Apparatus SVG ---
const KolbeElectrolysisSVG: React.FC<{ isElectrolyzing: boolean }> = ({ isElectrolyzing }) => {
  return (
    <svg viewBox="0 0 500 240" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 shadow-xl">
      <text x="250" y="22" textAnchor="middle" fill="#38bdf8" fontSize="14" fontWeight="bold">
        Kolbe Electrolytic Preparation of Ethene (Potassium Succinate)
      </text>

      {/* Beaker Container */}
      <rect x="120" y="60" width="260" height="150" rx="10" fill="#0f172a" stroke="#475569" strokeWidth="3" />
      {/* Electrolyte Solution (Water + Succinate) */}
      <rect x="125" y="100" width="250" height="105" rx="5" fill="#0284c7" opacity="0.35" />

      {/* Anode (+) Electrode */}
      <rect x="170" y="80" width="20" height="110" fill="#94a3b8" stroke="#ef4444" strokeWidth="2" />
      <text x="180" y="75" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Anode (+)</text>

      {/* Cathode (-) Electrode */}
      <rect x="310" y="80" width="20" height="110" fill="#94a3b8" stroke="#3b82f6" strokeWidth="2" />
      <text x="320" y="75" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Cathode (-)</text>

      {/* Battery Connection Lines */}
      <path d="M 180 80 L 180 40 L 230 40 M 270 40 L 320 40 L 320 80" stroke="#fbbf24" strokeWidth="3" fill="none" />
      <rect x="230" y="30" width="40" height="20" rx="4" fill="#d97706" />
      <text x="250" y="44" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">DC Power</text>

      {/* Gas Bubbles Animation when electrolyzing */}
      {isElectrolyzing && (
        <g>
          {/* Anode Bubbles: C2H4 + CO2 */}
          <circle cx="175" cy="140" r="4" fill="#ffffff" opacity="0.8">
            <animate attributeName="cy" values="140;90" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="185" cy="160" r="6" fill="#ffffff" opacity="0.9">
            <animate attributeName="cy" values="160;85" dur="1s" repeatCount="indefinite" />
          </circle>
          <text x="110" y="125" fill="#f87171" fontSize="10" fontWeight="bold">C₂H₄ + CO₂ ⬆</text>

          {/* Cathode Bubbles: H2 */}
          <circle cx="315" cy="150" r="5" fill="#38bdf8" opacity="0.8">
            <animate attributeName="cy" values="150;85" dur="0.9s" repeatCount="indefinite" />
          </circle>
          <text x="340" y="125" fill="#60a5fa" fontSize="10" fontWeight="bold">H₂ Gas ⬆</text>
        </g>
      )}

      {!isElectrolyzing && (
        <text x="250" y="160" textAnchor="middle" fill="#94a3b8" fontSize="12">
          Click "Start Electrolysis" to initiate current flow
        </text>
      )}
    </svg>
  );
};

// ==========================================
// 6. MAIN COMPONENT DEFINITION
// ==========================================

export default function C11_ChemistryAlkenespreparationandstructureSim({
  onComplete,
}: {
  onComplete?: (score: number) => void;
}) {
  // Tab State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Interactive Lab Step State
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);

  // Challenge State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  // Sim Widgets States
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [hybridType, setHybridType] = useState<'sp2' | 'sp3'>('sp2');
  const [isTrans, setIsTrans] = useState<boolean>(false);
  const [selectedAlkeneIndex, setSelectedAlkeneIndex] = useState<number>(0);
  const [alkyneReactionType, setAlkyneReactionType] = useState<'lindlar' | 'birch'>('lindlar');
  const [dehydrationStep, setDehydrationStep] = useState<number>(0);
  const [isElectrolyzing, setIsElectrolyzing] = useState<boolean>(false);

  // Discovery / Observation / Prediction Answers
  const [discoveryAns, setDiscoveryAns] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [predictionSubmitted, setPredictionSubmitted] = useState<boolean[]>([false, false]);

  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);
  const [observationSubmitted, setObservationSubmitted] = useState<boolean[]>([false, false]);

  // Visual FX State
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');

  // SRS / BKT / Timer Refs
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState(id);
    });
    return initial;
  });

  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Alkene Data Table for Visualizer
  const alkenesData: AlkeneMolecule[] = [
    {
      name: 'Ethene',
      formula: 'C₂H₄',
      iupac: 'Ethene',
      substituents: ['None'],
      alphaHydrogens: 0,
      heatOfHydrogenation: 137, // kJ/mol (exothermic)
      dipoleCis: 0,
      dipoleTrans: 0,
      bpCis: -103.7,
      bpTrans: -103.7,
      mpCis: -169,
      mpTrans: -169,
    },
    {
      name: 'Propene',
      formula: 'C₃H₆',
      iupac: 'Prop-1-ene',
      substituents: ['1 Methyl'],
      alphaHydrogens: 3,
      heatOfHydrogenation: 126,
      dipoleCis: 0.35,
      dipoleTrans: 0.35,
      bpCis: -47.6,
      bpTrans: -47.6,
      mpCis: -185,
      mpTrans: -185,
    },
    {
      name: 'But-2-ene',
      formula: 'C₄H₈',
      iupac: 'But-2-ene',
      substituents: ['2 Methyls (Disubstituted)'],
      alphaHydrogens: 6,
      heatOfHydrogenation: 120,
      dipoleCis: 0.33,
      dipoleTrans: 0.0,
      bpCis: 3.7,
      bpTrans: 0.9,
      mpCis: -138.9,
      mpTrans: -105.5,
    },
    {
      name: '2-Methylbut-2-ene',
      formula: 'C₅H₁₀',
      iupac: '2-Methylbut-2-ene',
      substituents: ['3 Methyls (Trisubstituted)'],
      alphaHydrogens: 9,
      heatOfHydrogenation: 113,
      dipoleCis: 0.25,
      dipoleTrans: 0.25,
      bpCis: 38.5,
      bpTrans: 38.5,
      mpCis: -133.8,
      mpTrans: -133.8,
    },
    {
      name: '2,3-Dimethylbut-2-ene',
      formula: 'C₆H₁₂',
      iupac: '2,3-Dimethylbut-2-ene',
      substituents: ['4 Methyls (Tetrasubstituted)'],
      alphaHydrogens: 12,
      heatOfHydrogenation: 110,
      dipoleCis: 0.0,
      dipoleTrans: 0.0,
      bpCis: 73.0,
      bpTrans: 73.0,
      mpCis: -25.0,
      mpTrans: -25.0,
    },
  ];

  // Inactivity auto-hint timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges') {
        const currentCh = CHALLENGES[currentChallengeIndex];
        setCurrentHint(currentCh.hints[0]);
        setShowHint(true);
        audioManager.play('hint');
        speechManager.speak('Here is a helpful hint to guide your analysis.');
      }
    }, 12000);
  }, [activeTab, currentChallengeIndex]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, currentChallengeIndex, activeTab]);

  // Audio & Speech Initialization Greeting
  useEffect(() => {
    speechManager.speak('Welcome to the Alkenes Preparation and Structure Laboratory.');
  }, []);

  // Handler for Discovery Question
  const handleDiscoverySubmit = (index: number) => {
    setDiscoveryAns(index);
    setDiscoverySubmitted(true);
    if (index === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct! Pi overlap locks the carbon atoms into a single plane.');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Consider the overlap of perpendicular p orbitals.');
    }
  };

  // Handler for Prediction Questions
  const handlePredictionSubmit = (predIndex: number, optionIndex: number) => {
    const updatedAns = [...predictionAnswers];
    updatedAns[predIndex] = optionIndex;
    setPredictionAnswers(updatedAns);

    const updatedSub = [...predictionSubmitted];
    updatedSub[predIndex] = true;
    setPredictionSubmitted(updatedSub);

    if (optionIndex === PREDICTION_QUESTIONS[predIndex].correctIndex) {
      audioManager.play('drop-correct');
      speechManager.speak('Prediction verified accurately!');
    } else {
      audioManager.play('drop-wrong');
    }
  };

  // Handler for Observation Questions
  const handleObservationSubmit = (obsIndex: number, optionIndex: number) => {
    const updatedAns = [...observationAnswers];
    updatedAns[obsIndex] = optionIndex;
    setObservationAnswers(updatedAns);

    const updatedSub = [...observationSubmitted];
    updatedSub[obsIndex] = true;
    setObservationSubmitted(updatedSub);

    if (optionIndex === OBSERVATION_QUESTIONS[obsIndex].correctIndex) {
      audioManager.play('chime');
      speechManager.speak('Observation recorded successfully.');
    } else {
      audioManager.play('error');
    }
  };

  // Handler for Challenge Submission
  const handleChallengeSubmit = () => {
    const ch = CHALLENGES[currentChallengeIndex];
    let correct = false;

    if (ch.type === 'mcq') {
      if (selectedOption === ch.correctIndex) correct = true;
    } else if (ch.type === 'numeric') {
      const val = parseFloat(numericAnswer);
      if (!isNaN(val) && ch.correctAnswer !== undefined) {
        const tol = ch.tolerance || 0;
        if (Math.abs(val - ch.correctAnswer) <= tol) correct = true;
      }
    }

    setIsCorrect(correct);
    setShowFeedback(true);

    // BKT Update
    const currentBKT = bktStates[ch.nodeId] || createBKTState(ch.nodeId);
    const updatedBKT = bktUpdate(currentBKT, correct);
    setBktStates((prev) => ({ ...prev, [ch.nodeId]: updatedBKT }));

    // SRS Update
    const reviewItem = createReviewItem(ch.id);
    sm2Update(reviewItem, correct ? 5 : 2);

    if (correct) {
      audioManager.play('celebration');
      speechManager.speak('Excellent work! Your answer is correct.');
      setScore((prev) => prev + (ch.difficulty === 'advanced' ? 150 : ch.difficulty === 'standard' ? 100 : 50));
      setStreak((prev) => prev + 1);
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      audioManager.play('error');
      speechManager.speak('That answer is incorrect. Review the step-by-step explanation.');
      setStreak(0);
    }
  };

  const handleNextChallenge = () => {
    setSelectedOption(null);
    setNumericAnswer('');
    setShowFeedback(false);
    setShowHint(false);

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      // Finished all challenges!
      audioManager.play('sparkle');
      speechManager.speak('Congratulations! You have completed all alkene chemistry challenges.');
      setShowConfetti(true);
      setShowSuccess(true);

      const finalScore = score + streak * 20;
      recordGameScore('alkenes_prep_structure', finalScore);
      if (onComplete) onComplete(finalScore);
    }
  };

  const currentCh = CHALLENGES[currentChallengeIndex];

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Header Bar */}
      <header className="max-w-7xl mx-auto mb-6 bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
              ISC Class 11 Chemistry
            </span>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
              Organic Chemistry Lab
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Alkenes: Preparation, Structure & Stereochemistry
          </h1>
        </div>

        {/* Dynamic Score & Streak Badges */}
        <div className="flex items-center gap-4 bg-slate-950 px-5 py-3 rounded-xl border border-slate-800">
          <div className="text-center">
            <span className="text-xs text-slate-400 uppercase font-bold block">Score</span>
            <span className="text-xl font-black fill-sky-400 text-sky-400">{score}</span>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div className="text-center">
            <span className="text-xs text-slate-400 uppercase font-bold block">Streak</span>
            <span className="text-xl font-black text-amber-400">🔥 {streak}</span>
          </div>
        </div>
      </header>

      {/* Main Tab Navigation */}
      <nav className="max-w-7xl mx-auto mb-6 flex border-b border-slate-800 bg-slate-900/60 rounded-xl p-1">
        <button
          onClick={() => {
            setActiveTab('discovery');
            audioManager.play('tap');
          }}
          className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all duration-200 ${
            activeTab === 'discovery'
              ? 'bg-sky-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          1. Discovery & Scenario
        </button>
        <button
          onClick={() => {
            setActiveTab('lab');
            audioManager.play('tap');
          }}
          className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all duration-200 ${
            activeTab === 'lab'
              ? 'bg-sky-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          2. Interactive Exploration Labs ({EXPLORATION_STEPS.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('challenges');
            audioManager.play('tap');
          }}
          className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all duration-200 ${
            activeTab === 'challenges'
              ? 'bg-sky-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          3. Guided Challenges ({CHALLENGES.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('summary');
            audioManager.play('tap');
          }}
          className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all duration-200 ${
            activeTab === 'summary'
              ? 'bg-sky-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          4. Summary & Industrial Application
        </button>
      </nav>

      {/* Container for Active Content */}
      <main className="max-w-7xl mx-auto">
        {/* ================= TAB 1: DISCOVERY & SCENARIO ================= */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* Scenario Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <h2 className="text-xl md:text-2xl font-bold text-sky-400 mb-3">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-base leading-relaxed mb-4">{SCENARIO.intro}</p>
              <div className="p-4 bg-slate-950/80 rounded-xl stroke-sky-500/20 border border-sky-900/40 text-sky-200 text-sm">
                <span className="font-bold text-sky-400">Context: </span>
                {SCENARIO.context}
              </div>
            </div>

            {/* Discovery Question Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                Discovery Challenge
              </span>
              <h3 className="text-lg md:text-xl font-semibold text-slate-100 mb-6">
                {DISCOVERY_QUESTION.question}
              </h3>

              <div className="grid grid-cols-1 gap-3 mb-6">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={discoverySubmitted}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                      discoverySubmitted && idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : discoverySubmitted && discoveryAns === idx
                        ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : discoveryAns === idx
                        ? 'bg-sky-900/60 border-sky-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                  </button>
                ))}
              </div>

              {discoverySubmitted && (
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-sm">
                  <span className="font-bold text-amber-400 block mb-1">Key Insight:</span>
                  <p className="text-slate-300">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>

            {/* Prediction Questions Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-8">
              <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                Pre-Lab Hypothesis & Prediction Questions
              </h3>

              {PREDICTION_QUESTIONS.map((pq, idx) => (
                <div key={idx} className="bg-slate-950/60 p-5 rounded-xl border border-slate-800">
                  <h4 className="font-semibold text-slate-200 mb-3">
                    {idx + 1}. {pq.question}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {pq.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        disabled={predictionSubmitted[idx]}
                        onClick={() => handlePredictionSubmit(idx, optIdx)}
                        className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                          predictionSubmitted[idx] && optIdx === pq.correctIndex
                            ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                            : predictionSubmitted[idx] && predictionAnswers[idx] === optIdx
                            ? 'bg-rose-900/60 border-rose-500 text-rose-200'
                            : predictionAnswers[idx] === optIdx
                            ? 'bg-sky-900/60 border-sky-500 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span className="font-bold mr-2">{String.fromCharCode(65 + optIdx)}.</span> {opt}
                      </button>
                    ))}
                  </div>

                  {predictionSubmitted[idx] && (
                    <p className="text-xs text-sky-400 bg-sky-950/40 p-3 rounded-lg border border-sky-900/50">
                      💡 <span className="font-semibold">Lab Verification Tip:</span> {pq.verifyInstruction}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 2: INTERACTIVE EXPLORATION LABS ================= */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Lab Selector Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {EXPLORATION_STEPS.map((lab, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveLabIndex(idx);
                    audioManager.play('whoosh');
                  }}
                  className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                    activeLabIndex === idx
                      ? 'bg-sky-600 border-sky-400 text-white shadow-lg scale-102'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <div className="text-[10px] opacity-75 uppercase">Step {idx + 1}</div>
                  <div className="truncate">{lab.title.split(':')[1] || lab.title}</div>
                </button>
              ))}
            </div>

            {/* Active Lab Display Panel */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
              <div>
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-1">
                  Active Simulation Step {activeLabIndex + 1}
                </span>
                <h3 className="text-xl font-bold text-white">{EXPLORATION_STEPS[activeLabIndex].title}</h3>
                <p className="text-slate-300 text-sm mt-1">{EXPLORATION_STEPS[activeLabIndex].instruction}</p>
              </div>

              {/* Lab 1 Widget: Orbital Rotator & Bond Energy */}
              {activeLabIndex === 0 && (
                <div className="space-y-6">
                  <OrbitalOverlapSVG angle={rotationAngle} isSp2={hybridType === 'sp2'} />

                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold text-slate-400 block mb-2">
                        Hybridization Mode:
                      </label>
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setHybridType('sp2');
                            audioManager.play('tap');
                          }}
                          className={`flex-1 py-2 px-3 rounded-lg border text-xs font-bold transition-all ${
                            hybridType === 'sp2'
                              ? 'bg-sky-600 border-sky-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          sp² Hybridized (Alkene C=C)
                        </button>
                        <button
                          onClick={() => {
                            setHybridType('sp3');
                            setRotationAngle(0);
                            audioManager.play('tap');
                          }}
                          className={`flex-1 py-2 px-3 rounded-lg border text-xs font-bold transition-all ${
                            hybridType === 'sp3'
                              ? 'bg-purple-600 border-purple-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          sp³ Hybridized (Alkane C-C)
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-400 block mb-2">
                        C-C Dihedral Rotation Angle (0° to 90°): {rotationAngle}°
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="90"
                        step="1"
                        value={rotationAngle}
                        onChange={(e) => {
                          setRotationAngle(parseInt(e.target.value));
                          audioManager.play('swoop');
                        }}
                        disabled={hybridType === 'sp3'}
                        className="w-full accent-sky-500 bg-slate-800 rounded-lg cursor-pointer"
                      />
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        {hybridType === 'sp3'
                          ? 'Free rotation around σ-bond in alkanes (low energy barrier ~12 kJ/mol).'
                          : 'Twisting C=C destroys sideways p-orbital overlap! High barrier (~264 kJ/mol).'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Lab 2 Widget: Geometrical Isomerism & Dipole/BP */}
              {activeLabIndex === 1 && (
                <div className="space-y-6">
                  <CisTransGeomSVG isTrans={isTrans} moleculeName="2-Butene (CH₃-CH=CH-CH₃)" />

                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <label className="text-xs font-bold text-slate-400 block">
                        Toggle Geometrical Isomer:
                      </label>
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setIsTrans(false);
                            audioManager.play('tap');
                          }}
                          className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                            !isTrans
                              ? 'bg-rose-600 border-rose-400 text-white shadow-lg'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          CIS-2-BUTENE (Z)
                        </button>
                        <button
                          onClick={() => {
                            setIsTrans(true);
                            audioManager.play('tap');
                          }}
                          className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                            isTrans
                              ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          TRANS-2-BUTENE (E)
                        </button>
                      </div>
                    </div>

                    {/* Measured Physical Data Display */}
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="flex justify-between border-b border-slate-800 pb-1">
                        <span className="text-slate-400">Dipole Moment (μ):</span>
                        <span className="font-bold text-sky-400">
                          {isTrans ? '0.00 Debye (Non-polar)' : '0.33 Debye (Polar)'}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-1">
                        <span className="text-slate-400">Boiling Point:</span>
                        <span className="font-bold text-amber-400">
                          {isTrans ? '+0.9 °C' : '+3.7 °C (Higher due to dipole-dipole)'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Melting Point:</span>
                        <span className="font-bold text-purple-400">
                          {isTrans ? '-105.5 °C (Higher MP: Tighter lattice packing)' : '-138.9 °C'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Lab 3 Widget: Stereospecific Alkyne Reduction */}
              {activeLabIndex === 2 && (
                <div className="space-y-6">
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                    <h4 className="text-base font-bold text-sky-400">
                      Alkyne Partial Hydrogenation Reactor (2-Butyne + H₂)
                    </h4>
                    <p className="text-xs text-slate-300">
                      Select catalytic reduction reagents to control stereospecific addition of hydrogen across the triple bond.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => {
                          setAlkyneReactionType('lindlar');
                          audioManager.play('balance');
                        }}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          alkyneReactionType === 'lindlar'
                            ? 'bg-sky-950 border-sky-400 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="font-bold text-sm text-sky-300">Lindlar’s Catalyst (H₂ / Pd / CaCO₃ + Quinoline)</div>
                        <div className="text-xs text-slate-400 mt-1">
                          Mechanism: <span className="text-emerald-400 font-semibold">SYN-ADDITION</span> on heterogenous catalyst surface.
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setAlkyneReactionType('birch');
                          audioManager.play('balance');
                        }}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          alkyneReactionType === 'birch'
                            ? 'bg-purple-950 border-purple-400 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="font-bold text-sm text-purple-300">Birch Reduction (Na / Liquid NH₃)</div>
                        <div className="text-xs text-slate-400 mt-1">
                          Mechanism: <span className="text-amber-400 font-semibold">ANTI-ADDITION</span> via radical anion intermediate.
                        </div>
                      </button>
                    </div>

                    {/* Reaction Result Banner */}
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-4">
                      <div className="text-3xl">🧪</div>
                      <div>
                        <div className="text-xs text-slate-400 uppercase font-bold">Synthesized Alkene Product:</div>
                        <div className="text-base font-black text-emerald-400">
                          {alkyneReactionType === 'lindlar'
                            ? 'CIS-BUT-2-ENE (98% Stereopurity)'
                            : 'TRANS-BUT-2-ENE (99% Stereopurity)'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Lab 4 Widget: Alcohol Dehydration Rearrangement */}
              {activeLabIndex === 3 && (
                <div className="space-y-6">
                  <DehydrationCarbocationSVG step={dehydrationStep} />

                  <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-bold">
                      Mechanism Step {dehydrationStep + 1} of 3
                    </span>
                    <div className="flex gap-2">
                      <button
                        disabled={dehydrationStep === 0}
                        onClick={() => {
                          setDehydrationStep((prev) => prev - 1);
                          audioManager.play('tap');
                        }}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold rounded-lg transition-all"
                      >
                        ◀ Previous Step
                      </button>
                      <button
                        disabled={dehydrationStep === 2}
                        onClick={() => {
                          setDehydrationStep((prev) => prev + 1);
                          audioManager.play('pop');
                        }}
                        className="px-4 py-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-xs font-bold rounded-lg transition-all"
                      >
                        Next Mechanism Step ▶
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Lab 5 Widget: Kolbe Electrolysis & Hyperconjugation Visualizer */}
              {activeLabIndex === 4 && (
                <div className="space-y-6">
                  <KolbeElectrolysisSVG isElectrolyzing={isElectrolyzing} />

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-bold text-slate-200">Kolbe Electrolysis Control Panel</div>
                      <div className="text-xs text-slate-400">Aqueous Potassium Succinate (KOOC-CH₂-CH₂-COOK)</div>
                    </div>
                    <button
                      onClick={() => {
                        setIsElectrolyzing(!isElectrolyzing);
                        if (!isElectrolyzing) {
                          audioManager.play('sparkle');
                          speechManager.speak('Electrolysis current active. Gas bubbles evolving at electrodes.');
                        }
                      }}
                      className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                        isElectrolyzing
                          ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg'
                      }`}
                    >
                      {isElectrolyzing ? 'Stop Electrolysis' : 'Start Electrolysis'}
                    </button>
                  </div>

                  {/* Alkene Stability & Heat of Hydrogenation Table */}
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                    <h4 className="text-base font-bold text-sky-400">
                      Alkene Relative Stability & Hyperconjugation Explorer
                    </h4>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {alkenesData.map((alk, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedAlkeneIndex(idx);
                            audioManager.play('tap');
                          }}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            selectedAlkeneIndex === idx
                              ? 'bg-sky-600 border-sky-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          <div className="font-bold text-xs">{alk.name}</div>
                          <div className="text-[10px] opacity-80">{alk.substituents[0]}</div>
                        </button>
                      ))}
                    </div>

                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 block mb-1">α-Hydrogens (Hyperconjugation):</span>
                        <span className="text-lg font-black text-emerald-400">
                          {alkenesData[selectedAlkeneIndex].alphaHydrogens} α-H
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-1">Heat of Hydrogenation (ΔH_hyd):</span>
                        <span className="text-lg font-black text-amber-400">
                          -{alkenesData[selectedAlkeneIndex].heatOfHydrogenation} kJ/mol
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-1">Thermodynamic Stability:</span>
                        <span className="text-lg font-black text-sky-400">
                          {selectedAlkeneIndex === 4
                            ? 'Maximum (Tetrasubstituted)'
                            : selectedAlkeneIndex === 0
                            ? 'Minimum (Unsubstituted)'
                            : 'Intermediate Stability'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Observation Questions Section under Lab Tab */}
              <div className="mt-8 pt-6 border-t border-slate-800 space-y-6">
                <h4 className="text-lg font-bold text-white">Post-Exploration Lab Observations</h4>

                {OBSERVATION_QUESTIONS.map((oq, idx) => (
                  <div key={idx} className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                    <h5 className="font-semibold text-slate-200 mb-3">
                      Observation {idx + 1}: {oq.question}
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {oq.observableOptions.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          disabled={observationSubmitted[idx]}
                          onClick={() => handleObservationSubmit(idx, optIdx)}
                          className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                            observationSubmitted[idx] && optIdx === oq.correctIndex
                              ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                              : observationSubmitted[idx] && observationAnswers[idx] === optIdx
                              ? 'bg-rose-900/60 border-rose-500 text-rose-200'
                              : observationAnswers[idx] === optIdx
                              ? 'bg-sky-900/60 border-sky-500 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span className="font-bold mr-2">{String.fromCharCode(65 + optIdx)}.</span> {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: GUIDED CHALLENGES ================= */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Challenge Progress Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-1">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-white">
                    Competency: {currentCh.competencyLevel}
                  </h3>
                  <span
                    className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${
                      currentCh.difficulty === 'foundation'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : currentCh.difficulty === 'standard'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {currentCh.difficulty}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full md:w-64">
                <div className="flex justify-between text-xs text-slate-400 mb-1 font-semibold">
                  <span>Overall Progress</span>
                  <span>{Math.round(((currentChallengeIndex + 1) / CHALLENGES.length) * 100)}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-300"
                    style={{ width: `${((currentChallengeIndex + 1) / CHALLENGES.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Main Challenge Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
              <h4 className="text-lg md:text-xl font-semibold text-slate-100 leading-relaxed">
                {currentCh.question}
              </h4>

              {/* Option Rendering: MCQ vs Numeric */}
              {currentCh.type === 'mcq' && currentCh.options && (
                <div className="grid grid-cols-1 gap-3">
                  {currentCh.options.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={showFeedback}
                      onClick={() => {
                        setSelectedOption(idx);
                        audioManager.play('tap');
                      }}
                      className={`text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                        selectedOption === idx
                          ? 'bg-sky-600/30 border-sky-400 text-white shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                      }`}
                    >
                      <span className="font-bold mr-3 text-sky-400">{String.fromCharCode(65 + idx)}.</span>
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {currentCh.type === 'numeric' && (
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-400 block">Enter Numerical Value:</label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      step="any"
                      value={numericAnswer}
                      onChange={(e) => setNumericAnswer(e.target.value)}
                      disabled={showFeedback}
                      placeholder="e.g. 12"
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500"
                    />
                    {currentCh.unit && (
                      <span className="px-4 py-3 bg-slate-800 rounded-xl text-slate-300 text-sm font-semibold flex items-center">
                        {currentCh.unit}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Submit / Action Button */}
              {!showFeedback ? (
                <button
                  disabled={selectedOption === null && numericAnswer === ''}
                  onClick={handleChallengeSubmit}
                  className="w-full py-4 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  Submit Answer
                </button>
              ) : (
                <div className="space-y-4">
                  {/* Feedback Banner */}
                  <div
                    className={`p-5 rounded-xl border text-sm ${
                      isCorrect
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950/80 border-rose-500 text-rose-200'
                    }`}
                  >
                    <div className="font-bold text-base mb-1">
                      {isCorrect ? '🎉 Correct!' : '❌ Incorrect'}
                    </div>
                    <p className="leading-relaxed">{currentCh.explanation}</p>
                  </div>

                  <button
                    onClick={handleNextChallenge}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all"
                  >
                    {currentChallengeIndex < CHALLENGES.length - 1
                      ? 'Next Challenge ▶'
                      : 'Complete Module 🎉'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 4: SUMMARY & REAL-WORLD ACTIVITY ================= */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Real World Activity Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                Real-World Industrial Synthesis Case
              </span>
              <h3 className="text-xl font-bold text-white mb-3">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-3">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-4">
                    <span className="w-7 h-7 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-slate-300 text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Preserved Misconceptions & Corrections Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                Key Conceptual Misconceptions & Corrections
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS_DATA.map((item, idx) => (
                  <div key={idx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                      Misconception #{idx + 1}: {item.title}
                    </span>
                    <p className="text-xs text-slate-400 italic">"{item.misconception}"</p>
                    <div className="pt-2 border-t border-slate-800 text-xs text-emerald-300 font-medium">
                      ✓ <span className="font-bold">Correct Fact:</span> {item.correction}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Interactive Feedback Components */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Module Mastery Achieved!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
    </div>
  );
}