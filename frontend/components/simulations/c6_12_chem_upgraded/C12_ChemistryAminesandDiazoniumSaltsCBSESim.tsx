'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst, type SoundEffect } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, ReviewItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';

// ==========================================
// NODE DEFINITIONS & CONSTANTS
// ==========================================
const ALL_NODE_IDS = [
  'c12_chem_cbse_300', 'c12_chem_cbse_301', 'c12_chem_cbse_302', 'c12_chem_cbse_303',
  'c12_chem_cbse_304', 'c12_chem_cbse_305', 'c12_chem_cbse_306', 'c12_chem_cbse_307',
  'c12_chem_cbse_308', 'c12_chem_cbse_309', 'c12_chem_cbse_310', 'c12_chem_cbse_311',
  'c12_chem_cbse_312', 'c12_chem_cbse_313', 'c12_chem_cbse_314', 'c12_chem_cbse_315',
  'c12_chem_cbse_316', 'c12_chem_cbse_317', 'c12_chem_cbse_318', 'c12_chem_cbse_319',
  'c12_chem_cbse_320', 'c12_chem_cbse_321', 'c12_chem_cbse_322', 'c12_chem_cbse_323',
  'c12_chem_cbse_324', 'c12_chem_cbse_325', 'c12_chem_cbse_326', 'c12_chem_cbse_327'
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

interface ConceptNodeInfo {
  id: NodeId;
  title: string;
  summary: string;
  eli5: string;
  category: 'Structure' | 'Synthesis' | 'Properties' | 'Reactions' | 'Diazonium' | 'Analysis';
}

const CONCEPT_NODES: Record<NodeId, ConceptNodeInfo> = {
  c12_chem_cbse_300: {
    id: 'c12_chem_cbse_300',
    title: 'Classification of Amines',
    summary: 'Amines are organic derivatives of ammonia (NH3) classified as primary (1°), secondary (2°), or tertiary (3°) based on alkyl/aryl substitution on nitrogen.',
    eli5: 'Think of ammonia as a sofa with 3 seats for hydrogens. Replacing 1 hydrogen gives a 1° amine, 2 gives 2°, and 3 gives 3°!',
    category: 'Structure'
  },
  c12_chem_cbse_301: {
    id: 'c12_chem_cbse_301',
    title: 'Nomenclature of Amines',
    summary: 'IUPAC system names aliphatic amines as alkanamines (replacing "-e" with "-amine"). Secondary and tertiary are named as N-substituted alkanamines.',
    eli5: 'In IUPAC, name the longest carbon chain with "-amine" at the end, and put "N-" before groups attached directly to the nitrogen atom.',
    category: 'Structure'
  },
  c12_chem_cbse_302: {
    id: 'c12_chem_cbse_302',
    title: 'Structure & Hybridization',
    summary: 'Nitrogen in amines is sp³ hybridized with pyramidal geometry. The unshared lone pair occupies one hybrid orbital, compressing C-N-C angles (~108°).',
    eli5: 'Nitrogen sits at the top of a 3-legged stool (pyramid) while its lone pair of electrons points straight up like an umbrella!',
    category: 'Structure'
  },
  c12_chem_cbse_303: {
    id: 'c12_chem_cbse_303',
    title: 'Reduction of Nitro Compounds',
    summary: 'Nitroalkanes and nitroarenes reduce to primary amines using Sn/HCl, Fe/HCl (preferred industrially), or H2/Pd.',
    eli5: 'Iron filings and hydrochloric acid act like molecular oxygen-scavengers, replacing oxygen atoms on -NO2 with hydrogen to form -NH2.',
    category: 'Synthesis'
  },
  c12_chem_cbse_304: {
    id: 'c12_chem_cbse_304',
    title: 'Ammonolysis of Alkyl Halides',
    summary: 'Nucleophilic substitution of R-X with excess NH3 (Hoffmann ammonolysis) yields a mixture of 1°, 2°, 3° amines and quaternary ammonium salts.',
    eli5: 'Ammonia attacks alkyl halide, but the resulting amine is even more reactive, leading to a cascade of reactions until all hydrogens are replaced!',
    category: 'Synthesis'
  },
  c12_chem_cbse_305: {
    id: 'c12_chem_cbse_305',
    title: 'Reduction of Nitriles',
    summary: 'Nitriles (R-CN) reduce to primary amines (R-CH2-NH2) containing one additional carbon using LiAlH4 or Na/EtOH (Mendius reaction).',
    eli5: 'Adding hydrogen across the carbon-nitrogen triple bond turns a nitrile group into a primary amine with an extra carbon chain length.',
    category: 'Synthesis'
  },
  c12_chem_cbse_306: {
    id: 'c12_chem_cbse_306',
    title: 'Reduction of Amides',
    summary: 'Amides (R-CONH2) reduce smoothly with Lithium Aluminium Hydride (LiAlH4) followed by hydrolysis to yield primary amines.',
    eli5: 'LiAlH4 strips away the oxygen atom from the carbonyl group (C=O), converting -CONH2 into a -CH2-NH2 group.',
    category: 'Synthesis'
  },
  c12_chem_cbse_307: {
    id: 'c12_chem_cbse_307',
    title: 'Gabriel Phthalimide Synthesis',
    summary: 'Phthalimide reacts with KOH, then alkyl halide (R-X), followed by alkaline hydrolysis to yield pure 1° aliphatic amines exclusively.',
    eli5: 'Phthalimide acts like a protective cage that lets only one alkyl group enter, preventing over-alkylation and guaranteeing pure 1° amine!',
    category: 'Synthesis'
  },
  c12_chem_cbse_308: {
    id: 'c12_chem_cbse_308',
    title: 'Hoffmann Bromamide Degradation',
    summary: 'Primary amides react with Br2 and NaOH to yield a primary amine containing ONE carbon LESS than the starting amide.',
    eli5: 'The carbonyl carbon atom (C=O) gets completely eliminated as carbonate (Na2CO3), shortening the carbon chain by exactly 1 step!',
    category: 'Synthesis'
  },
  c12_chem_cbse_309: {
    id: 'c12_chem_cbse_309',
    title: 'Boiling Points & Intermolecular H-Bonding',
    summary: 'Primary and secondary amines form intermolecular hydrogen bonds (N-H...N). BP order: Primary > Secondary > Tertiary (no N-H bond).',
    eli5: 'Primary amines have 2 hydrogens for sticky H-bonds, secondary have 1, and tertiary have 0 sticky hydrogens, so tertiary boils easiest!',
    category: 'Properties'
  },
  c12_chem_cbse_310: {
    id: 'c12_chem_cbse_310',
    title: 'Solubility of Amines in Water',
    summary: 'Lower aliphatic amines are water-soluble due to H-bonding with water. Solubility decreases as hydrophobic alkyl chain length increases.',
    eli5: 'Small amines dissolve like alcohol because nitrogen links to water, but long carbon tails push water away and make them insoluble.',
    category: 'Properties'
  },
  c12_chem_cbse_311: {
    id: 'c12_chem_cbse_311',
    title: 'Basic Character & Solvation Effects',
    summary: 'Basicity depends on lone pair availability, +I effect, steric hindrance, and hydration of conjugate cations. Aqueous order for methyl: 2° > 1° > 3° > NH3.',
    eli5: 'In water, three forces fight: alkyl pushing electron density (+I), water shielding the ion (hydration), and bulky groups blocking access (sterics)!',
    category: 'Properties'
  },
  c12_chem_cbse_312: {
    id: 'c12_chem_cbse_312',
    title: 'Aniline vs Aliphatic Amines Basicity',
    summary: 'Aniline is significantly weaker base than ammonia because the lone pair on nitrogen is delocalized into the benzene aromatic ring.',
    eli5: 'In aniline, nitrogen\'s electron pair gets pulled into circulating around the benzene ring, making it rarely available to grab protons!',
    category: 'Properties'
  },
  c12_chem_cbse_313: {
    id: 'c12_chem_cbse_313',
    title: 'Alkylation & Acylation',
    summary: 'Amines undergo nucleophilic substitution with alkyl halides (alkylation) and acid chlorides/anhydrides (acylation) to form amides.',
    eli5: 'Acylation attaches an acetyl group (CH3CO-) to nitrogen, which tones down its reactivity and protects it during electrophilic attacks.',
    category: 'Reactions'
  },
  c12_chem_cbse_314: {
    id: 'c12_chem_cbse_314',
    title: 'Carbylamine Reaction (Isocyanide Test)',
    summary: 'Primary amines (aliphatic & aromatic) heat with CHCl3 and alcoholic KOH to produce extremely foul-smelling isocyanides (R-NC).',
    eli5: 'Only 1° amines react with chloroform + base to release an unbearable, pungent stink (isocyanide), serving as a definitive 1° amine test!',
    category: 'Analysis'
  },
  c12_chem_cbse_315: {
    id: 'c12_chem_cbse_315',
    title: 'Reaction with Nitrous Acid (HNO2)',
    summary: '1° aliphatic amines give alcohols with N2 gas bubbling; 1° aromatic amines form stable diazonium salts at cold temperatures (0-5°C).',
    eli5: 'Pour nitrous acid into aliphatic amine and watch N2 bubbles fizz out like soda! With aniline at ice temperature, it forms diazonium salt.',
    category: 'Reactions'
  },
  c12_chem_cbse_316: {
    id: 'c12_chem_cbse_316',
    title: 'Hinsberg Test (Arylsulfonyl Chloride)',
    summary: 'Benzenesulfonyl chloride distinguishes 1° (dissolves in alkali), 2° (precipitate insoluble in alkali), and 3° amines (no reaction).',
    eli5: 'Hinsberg reagent reacts with 1° amine to form alkali-soluble product, 2° amine to form insoluble lump, and ignores 3° amine completely!',
    category: 'Analysis'
  },
  c12_chem_cbse_317: {
    id: 'c12_chem_cbse_317',
    title: 'Electrophilic Substitution - Bromination',
    summary: 'Aniline reacts with Br2 water to form 2,4,6-tribromoaniline (white ppt). To get 4-bromoaniline, -NH2 must first be protected by acetylation.',
    eli5: 'Nitrogen activates the ring so fiercely that bromine attacks 3 spots at once! To force monobromination, put a protective cap (acetyl group) first.',
    category: 'Reactions'
  },
  c12_chem_cbse_318: {
    id: 'c12_chem_cbse_318',
    title: 'Electrophilic Substitution - Nitration',
    summary: 'Direct nitration of aniline with HNO3/H2SO4 gives 47% meta derivative due to protonation to anilinium ion (-NH3+ is meta-directing).',
    eli5: 'In strong acid, aniline turns into anilinium ion (-NH3+), which hates ortho/para and forces 47% of incoming nitro groups into the meta position!',
    category: 'Reactions'
  },
  c12_chem_cbse_319: {
    id: 'c12_chem_cbse_319',
    title: 'Electrophilic Substitution - Sulphonation',
    summary: 'Aniline reacts with conc. H2SO4 at 453-473 K to form sulfanilic acid, which exists as a Zwitterion (+H3N-C6H4-SO3-).',
    eli5: 'Sulphanilic acid undergoes internal acid-base neutralization, creating a dipolar Zwitterion with both positive and negative charges!',
    category: 'Reactions'
  },
  c12_chem_cbse_320: {
    id: 'c12_chem_cbse_320',
    title: 'Preparation of Diazonium Salts',
    summary: 'Diazotization: Aniline reacts with NaNO2 and HCl at 273-278 K (0-5°C) to form Benzenediazonium chloride (Ar-N2+ Cl-).',
    eli5: 'Mix ice-cold aniline with sodium nitrite and acid. Keep it under 5°C or the delicate diazonium salt decomposes into phenol!',
    category: 'Diazonium'
  },
  c12_chem_cbse_321: {
    id: 'c12_chem_cbse_321',
    title: 'Physical & Stability Properties',
    summary: 'Benzenediazonium salts are crystalline solids, stable in cold aqueous solution due to resonance delocalization of positive charge over benzene ring.',
    eli5: 'Aromatic diazonium salts survive in ice water because the positive charge on nitrogen dances around the benzene ring, spreading the stability!',
    category: 'Diazonium'
  },
  c12_chem_cbse_322: {
    id: 'c12_chem_cbse_322',
    title: 'Sandmeyer Reaction',
    summary: 'Benzenediazonium chloride reacts with Cu2Cl2/HCl, Cu2Br2/HBr, or CuCN/KCN to yield chlorobenzene, bromobenzene, or benzonitrile.',
    eli5: 'Copper(I) salts act like precise molecular scissors, snapping off N2 gas and replacing it cleanly with Cl, Br, or CN!',
    category: 'Diazonium'
  },
  c12_chem_cbse_323: {
    id: 'c12_chem_cbse_323',
    title: 'Gattermann Reaction',
    summary: 'Modification of Sandmeyer reaction using copper powder and halogen acid (Cu/HCl or Cu/HBr) to synthesize haloarenes.',
    eli5: 'Instead of copper salts, Gattermann uses fine copper powder with acid to swap the diazonium group for halogen with slightly lower yield.',
    category: 'Diazonium'
  },
  c12_chem_cbse_324: {
    id: 'c12_chem_cbse_324',
    title: 'Replacement by I, F, OH, and H',
    summary: 'Replacement reactions: KI yields iodobenzene; HBF4 + heat (Schiemann) yields fluorobenzene; H2O/warm yields phenol; H3PO2 or EtOH yields benzene.',
    eli5: 'Diazonium salt is the ultimate synthetic hub: add KI for iodine, HBF4 for fluorine, warm water for phenol, or hypophosphorous acid to remove it!',
    category: 'Diazonium'
  },
  c12_chem_cbse_325: {
    id: 'c12_chem_cbse_325',
    title: 'Coupling Reactions (Azo Dyes)',
    summary: 'Diazonium cations react with activated aromatic rings like Phenol (pH 9-10) or Aniline (pH 4-5) to form brightly colored azo dyes (-N=N-).',
    eli5: 'Link two aromatic rings through an azo bridge (-N=N-): Phenol makes intense orange dye, while Aniline creates brilliant yellow dye!',
    category: 'Diazonium'
  },
  c12_chem_cbse_326: {
    id: 'c12_chem_cbse_326',
    title: 'Synthetic Importance of Diazonium Salts',
    summary: 'Diazonium salts serve as versatile intermediates for preparing aromatic compounds that cannot be made by direct substitution (e.g., fluorobenzene, m-dichlorobenzene).',
    eli5: 'Diazonium salts are the chemical Swiss Army knife for synthetic chemists, unlocking aromatic pathways impossible by direct attack!',
    category: 'Diazonium'
  },
  c12_chem_cbse_327: {
    id: 'c12_chem_cbse_327',
    title: 'Distinction Tests Summary',
    summary: 'Qualitative identification matrix combining Carbylamine, Hinsberg, Nitrous Acid, Bromine Water, and Azo Dye tests for unknown amines.',
    eli5: 'A step-by-step chemical flowchart to identify any unknown bottle of amine in under 5 minutes using simple reagent test tubes!',
    category: 'Analysis'
  }
};

// ==========================================
// MANDATORY SECTIONS DATA
// ==========================================

const SCENARIO = {
  title: 'Organic Nitrogen Synthesis & Qualitative Analysis Lab',
  intro: 'Welcome to the Advanced Organic Chemistry Laboratory at the CISCE Research Center. You are tasked with analyzing nitrogenous organic compounds, controlling amine basicity, and executing multi-step diazonium coupling reactions.',
  context: 'In this simulation, you will manipulate molecular structures, observe solvation and steric effects on basic strength, run qualitative diagnostic tests (Hinsberg & Carbylamine), perform controlled diazotization at 0-5°C, and synthesize azo dyes.'
};

const DISCOVERY_QUESTION = {
  question: 'Why is Triethylamine ((C2H5)3N) a WEAKER base than Diethylamine ((C2H5)2N) in aqueous solution, despite having MORE electron-donating ethyl groups?',
  options: [
    'Triethylamine loses its lone pair due to spontaneous oxidation in water.',
    'Steric hindrance by three bulky ethyl groups destabilizes the protonated cation by blocking water solvation.',
    'Ethyl groups turn electron-withdrawing when three of them attach to nitrogen.',
    'Triethylamine converts into an aromatic ring structure in polar solvents.'
  ],
  correctIndex: 1,
  hintAfter: 'Basicity in aqueous medium is governed by a delicate balance between Inductive effect (+I), Steric hindrance, and Solvation energy of the conjugate cation!'
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Amine Classification & Geometry Explorer',
    instruction: 'Select different amine types (1°, 2°, 3°, aliphatic vs aromatic). Observe nitrogen sp³ hybridization, bond angles (~108°), lone pair orientation, and hydrogen bonding networks.',
    interactionType: 'amine-structure-explorer',
    nodeId: 'c12_chem_cbse_300'
  },
  {
    title: 'Lab 2: Basic Strength & Solvation Simulator',
    instruction: 'Toggle between Gas Phase and Aqueous Phase for Methyl and Ethyl substituted amines. Compare Kb values and observe how solvation enthalpy competes with +I inductive effect.',
    interactionType: 'basicity-phase-simulator',
    nodeId: 'c12_chem_cbse_311'
  },
  {
    title: 'Lab 3: Qualitative Distinguishing Tests (Hinsberg & Carbylamine)',
    instruction: 'Add Benzenesulfonyl Chloride (Hinsberg) or CHCl3 + KOH (Carbylamine) to unknown 1°, 2°, and 3° amine samples. Record alkali solubility and precipitate behavior.',
    interactionType: 'qualitative-tests-lab',
    nodeId: 'c12_chem_cbse_316'
  },
  {
    title: 'Lab 4: Diazotization & Sandmeyer Pathways',
    instruction: 'Maintain reaction temperature between 0°C and 5°C with NaNO2 + HCl to generate Benzenediazonium Chloride. Then react with Cu2Cl2, Cu2Br2, KI, HBF4, or warm water.',
    interactionType: 'diazotization-sandmeyer-lab',
    nodeId: 'c12_chem_cbse_320'
  },
  {
    title: 'Lab 5: Azo Dye Synthesis & Spectrophotometry',
    instruction: 'Couple Benzenediazonium Chloride with Phenol at pH 9-10 or Aniline at pH 4-5. Observe electrophilic aromatic substitution and measure absorbance of orange and yellow azo dyes.',
    interactionType: 'azo-coupling-lab',
    nodeId: 'c12_chem_cbse_325'
  }
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What happens when Aniline is reacted directly with concentrated Nitric Acid and Sulfuric Acid mixture at 288 K without protecting the amino group?',
    options: [
      'Only 100% Para-nitroaniline is obtained cleanly.',
      'Significant amount (47%) of Meta-nitroaniline is formed alongside Ortho and Para isomers.',
      'No reaction occurs because aniline decomposes immediately.',
      'Aniline is converted exclusively into phenol with nitrogen gas evolution.'
    ],
    correctIndex: 1,
    verifyInstruction: 'In strongly acidic medium, aniline is protonated to form anilinium ion (-NH3+), which is strongly meta-directing!',
    nodeId: 'c12_chem_cbse_318'
  },
  {
    question: 'Predict: What product is formed when Acetamide (CH3CONH2) is treated with Bromine (Br2) and aqueous Sodium Hydroxide (NaOH)?',
    options: [
      'Ethylamine (CH3CH2NH2)',
      'Methanamine (CH3NH2)',
      'Bromoacetamide (CH3CONHBr)',
      'Nitromethane (CH3NO2)'
    ],
    correctIndex: 1,
    verifyInstruction: 'Hoffmann bromamide degradation causes step-down of carbon chain by eliminating carbonyl group as Na2CO3!',
    nodeId: 'c12_chem_cbse_308'
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: When Benzenesulfonyl Chloride is added to N-ethyl-N-methylaniline (a 3° amine) in aqueous NaOH, what do you observe?',
    observableOptions: [
      'A clear solution forms that liberates heat and yields an acid upon acidification.',
      'No reaction occurs; the amine remains insoluble and forms an unreacted oily layer.',
      'A white precipitate forms immediately that dissolves upon adding excess NaOH.',
      'A pungent foul-smelling gas (isocyanide) is evolved.'
    ],
    correctIndex: 1,
    nodeId: 'c12_chem_cbse_316'
  },
  {
    question: 'Observation: During the synthesis of Benzenediazonium chloride, what happens if the reaction mixture temperature rises above 10°C (283 K)?',
    observableOptions: [
      'The diazonium salt crystallizes into a stable solid precipitate.',
      'Effervescence of Nitrogen gas occurs as the salt hydrolyzes into Phenol.',
      'The solution turns bright orange due to spontaneous formation of methyl orange.',
      'Aniline undergoes explosive chlorination to form hexachlorobenzene.'
    ],
    correctIndex: 1,
    nodeId: 'c12_chem_cbse_321'
  }
];

const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Synthesis of Para-Red & Methyl Orange Azo Dyes',
  description: 'In industrial dye manufacturing plants, aromatic diazonium salts are synthesized continuously at controlled chilled temperatures and coupled with naphthols or aromatic amines to produce textile azo dyes.',
  steps: [
    'Step 1: Cool 10.7 g of p-nitroaniline in dilute HCl to 0-5°C using an ice-salt bath.',
    'Step 2: Add aqueous NaNO2 solution dropwise while keeping temperature strictly below 5°C to prepare p-nitrobenzenediazonium chloride.',
    'Step 3: Dissolve 2-naphthol in dilute NaOH (pH 9-10) and slowly pour the chilled diazonium salt solution with vigorous stirring.',
    'Step 4: Filter the vibrant scarlet-red precipitate of Para Red dye (1-(p-nitrophenylazo)-2-naphthol), wash with cold water, and dry.'
  ]
};

// ==========================================
// MISCONCEPTIONS DATA
// ==========================================
interface Misconception {
  id: string;
  misconception: string;
  correction: string;
  explanation: 'string;',
}

const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_1',
    misconception: 'Tertiary amines are always the strongest bases because they have three electron-donating alkyl groups.',
    correction: 'In aqueous medium, 2° amines are stronger bases than 3° amines.',
    explanation: 'While 3° amines have high +I effect, steric hindrance and poor hydration of the tertiary ammonium cation reduce basicity in water. Aqueous basicity order for methyl amines: (CH3)2NH > CH3NH2 > (CH3)3N > NH3.'
  },
  {
    id: 'misc_2',
    misconception: 'Aniline is more basic than ammonia because the aromatic ring donates electrons.',
    correction: 'Aniline is far LESS basic than ammonia (pKb 9.38 vs 4.75).',
    explanation: 'The nitrogen lone pair in aniline is delocalized over the aromatic benzene ring via resonance (+R effect), making it less available for protonation. Also, anilinium ion has only 2 resonance structures while aniline has 5.'
  },
  {
    id: 'misc_3',
    misconception: 'Gabriel Phthalimide synthesis can be used to prepare both aliphatic and aromatic primary amines.',
    correction: 'Gabriel Phthalimide synthesis ONLY yields primary ALIPHATIC amines.',
    explanation: 'Aryl halides (Ar-X) cannot undergo nucleophilic substitution with potassium phthalimide anion because the C-X bond in aryl halides has partial double bond character due to resonance.'
  },
  {
    id: 'misc_4',
    misconception: 'Direct nitration of aniline produces only ortho and para nitroanilines because -NH2 is o/p directing.',
    correction: 'Direct nitration gives a significant amount (47%) of META nitroaniline.',
    explanation: 'Nitration occurs in strong acid (HNO3/H2SO4), which protonates aniline into the anilinium ion (-NH3+). The -NH3+ group is strongly deactivating and meta-directing.'
  },
  {
    id: 'misc_5',
    misconception: 'Aliphatic diazonium salts are as stable as aromatic diazonium salts.',
    correction: 'Aliphatic diazonium salts are extremely unstable and decompose immediately even at 0°C.',
    explanation: 'Aliphatic diazonium cations spontaneously lose N2 gas to form carbocations. Aromatic diazonium salts are resonance-stabilized by delocalization of positive charge over the benzene ring.'
  },
  {
    id: 'misc_6',
    misconception: 'Carbylamine test can be used to distinguish between primary, secondary, and tertiary amines.',
    correction: 'Carbylamine test ONLY gives a positive result for 1° amines (aliphatic or aromatic).',
    explanation: 'Secondary and tertiary amines do not have two N-H bonds required for the elimination steps to form the isocyanide (-N≡C) group.'
  }
];

// ==========================================
// CHALLENGES ARRAY (25 ITEMS Across 3 Tiers)
// ==========================================
interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple-choice' | 'drag-label' | 'numeric' | 'sequencing';
  difficulty: 'Foundation' | 'Standard' | 'Advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string | number;
  explanation: 'string;',
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // Foundation Tier (1-8)
  {
    id: 'chal_01',
    nodeId: 'c12_chem_cbse_300',
    type: 'multiple-choice',
    difficulty: 'Foundation',
    competencyLevel: 'Recall & Classification',
    question: 'Which of the following organic molecules is classified as a Secondary (2°) Amine?',
    options: ['CH3-CH2-NH2', '(CH3)2NH', '(CH3)3N', 'C6H5-NH2'],
    correctIndex: 1,
    explanation: '(CH3)2NH (Dimethylamine) has two methyl groups attached to the nitrogen atom, making it a 2° amine.',
    hints: ['Count how many alkyl/aryl carbon groups are bonded directly to the nitrogen atom.', '1 group = 1°, 2 groups = 2°, 3 groups = 3°.']
  },
  {
    id: 'chal_02',
    nodeId: 'c12_chem_cbse_301',
    type: 'multiple-choice',
    difficulty: 'Foundation',
    competencyLevel: 'IUPAC Nomenclature',
    question: 'What is the correct IUPAC name for CH3-CH2-N(CH3)-CH2-CH3?',
    options: ['N-Methyl-N-ethylethanamine', 'N-Ethyl-N-methylethanamine', 'Diethylmethylamine', '3-Methyltriethylamine'],
    correctIndex: 1,
    explanation: 'The longest chain attached to nitrogen is ethanamine (2 carbons). The substituents on nitrogen are ethyl and methyl, arranged alphabetically as N-Ethyl-N-methylethanamine.',
    hints: ['Identify the longest carbon chain attached to nitrogen.', 'Arrange substituents on nitrogen in alphabetical order with N- prefix.']
  },
  {
    id: 'chal_03',
    nodeId: 'c12_chem_cbse_302',
    type: 'multiple-choice',
    difficulty: 'Foundation',
    competencyLevel: 'Molecular Geometry',
    question: 'What is the hybridization state of the Nitrogen atom in Trimethylamine ((CH3)3N)?',
    options: ['sp', 'sp²', 'sp³', 'sp³d'],
    correctIndex: 2,
    explanation: 'Nitrogen in trimethylamine forms 3 single sigma bonds with methyl groups and has 1 lone pair, total 4 electron pairs = sp³ hybridization with pyramidal geometry.',
    hints: ['Sum the number of bonded atoms and lone pairs on nitrogen.', '3 sigma bonds + 1 lone pair = steric number 4.']
  },
  {
    id: 'chal_04',
    nodeId: 'c12_chem_cbse_303',
    type: 'multiple-choice',
    difficulty: 'Foundation',
    competencyLevel: 'Reagent Recall',
    question: 'Which reagent reduction system is preferred industrially for converting Nitrobenzene to Aniline because the FeCl2 formed gets hydrolyzed to release HCl?',
    options: ['LiAlH4 in ether', 'Fe / concentrated HCl', 'Sn / concentrated HCl', 'H2 / Pt catalyst'],
    correctIndex: 1,
    explanation: 'Fe and HCl is preferred industrially because FeCl2 formed during reduction gets hydrolyzed to regenerate HCl, requiring only a small amount of initial acid.',
    hints: ['Think of an iron-based reducing system that recycles hydrochloric acid during the process.', 'Fe + HCl is cost-effective and eco-friendly.']
  },
  {
    id: 'chal_05',
    nodeId: 'c12_chem_cbse_309',
    type: 'multiple-choice',
    difficulty: 'Foundation',
    competencyLevel: 'Physical Properties',
    question: 'Among isomeric amines of formula C3H9N, which one has the HIGHEST boiling point?',
    options: ['Propan-1-amine (1°)', 'N-Methylethanamine (2°)', 'Trimethylamine (3°)', 'All three have identical boiling points'],
    correctIndex: 0,
    explanation: 'Primary amines (Propan-1-amine) have two N-H hydrogens, allowing extensive intermolecular hydrogen bonding compared to 2° (1 N-H) and 3° (0 N-H).',
    hints: ['More N-H bonds lead to stronger hydrogen bonding networks.', 'Primary amines have 2 hydrogens on nitrogen.']
  },
  {
    id: 'chal_06',
    nodeId: 'c12_chem_cbse_314',
    type: 'multiple-choice',
    difficulty: 'Foundation',
    competencyLevel: 'Qualitative Test Identification',
    question: 'The Carbylamine test (heating compound with chloroform and alcoholic KOH) produces an extremely offensive smell with which of the following?',
    options: ['N-Methylaniline (2°)', 'Triethylamine (3°)', 'Aniline (1°)', 'Dimethylamine (2°)'],
    correctIndex: 2,
    explanation: 'Carbylamine test is specific ONLY to 1° amines (both aliphatic and aromatic). Aniline is a 1° aromatic amine, so it forms phenyl isocyanide (foul smell).',
    hints: ['Carbylamine reaction requires a primary amine (1°).', 'Which option has an unsubstituted -NH2 group?']
  },
  {
    id: 'chal_07',
    nodeId: 'c12_chem_cbse_320',
    type: 'multiple-choice',
    difficulty: 'Foundation',
    competencyLevel: 'Diazotization Conditions',
    question: 'What is the required temperature range for the diazotization reaction of aniline with NaNO2 and HCl?',
    options: ['273 - 278 K (0 - 5 °C)', '298 - 303 K (25 - 30 °C)', '373 K (100 °C)', '200 K (-73 °C)'],
    correctIndex: 0,
    explanation: 'Diazotization must be performed at 0-5°C (273-278 K) to prevent decomposition of benzenediazonium chloride into phenol and nitrogen gas.',
    hints: ['Diazonium salts of primary aromatic amines decompose rapidly at room temperature.', 'Keep the reaction ice-cold!']
  },
  {
    id: 'chal_08',
    nodeId: 'c12_chem_cbse_325',
    type: 'multiple-choice',
    difficulty: 'Foundation',
    competencyLevel: 'Azo Coupling Colors',
    question: 'What color precipitate is formed when Benzenediazonium chloride couples with Phenol in mildly alkaline medium (pH 9-10)?',
    options: ['Yellow dye', 'Orange dye', 'Blue dye', 'Deep violet dye'],
    correctIndex: 1,
    explanation: 'Benzenediazonium chloride reacts with phenol at pH 9-10 to form p-hydroxyazobenzene, which is a bright orange azo dye.',
    hints: ['Phenol coupling gives an orange azo dye, whereas aniline coupling gives a yellow dye.', 'Think of sunset orange!']
  },

  // Standard Tier (9-17)
  {
    id: 'chal_09',
    nodeId: 'c12_chem_cbse_307',
    type: 'multiple-choice',
    difficulty: 'Standard',
    competencyLevel: 'Synthesis Mechanisms',
    question: 'Why CANNOT Chlorobenzene be used to prepare Aniline via Gabriel Phthalimide Synthesis?',
    options: ['Phthalimide anion is not strong enough nucleophile.', 'Chlorobenzene undergoes fast oxidation under alkaline conditions.', 'C-Cl bond in chlorobenzene has partial double bond character due to resonance, resisting SN2 attack.', 'Phthalimide decomposes in the presence of aryl halides.'],
    correctIndex: 2,
    explanation: 'Aryl halides like chlorobenzene do not undergo nucleophilic substitution (SN2) with phthalimide potassium salt because of partial double bond character of Ar-Cl bond and steric repulsion by benzene pi cloud.',
    hints: ['Consider why aryl halides are unreactive towards nucleophilic substitution.', 'Resonance delocalization of chlorine lone pairs into the benzene ring strengthening the bond.']
  },
  {
    id: 'chal_10',
    nodeId: 'c12_chem_cbse_308',
    type: 'numeric',
    difficulty: 'Standard',
    competencyLevel: 'Stoichiometry & Chain Degradation',
    question: 'How many carbon atoms are present in the primary amine produced when Benzamide (C6H5CONH2) undergoes Hoffmann Bromamide Degradation?',
    correctAnswer: 6,
    explanation: 'Benzamide has 7 carbon atoms (6 in ring + 1 in carbonyl group). Hoffmann bromamide degradation removes the carbonyl carbon as carbonate, yielding Aniline (C6H5NH2) which has 6 carbons.',
    hints: ['Hoffmann degradation removes exactly 1 carbonyl carbon.', 'Benzamide (7 carbons) minus carbonyl carbon (1 carbon) = ?']
  },
  {
    id: 'chal_11',
    nodeId: 'c12_chem_cbse_311',
    type: 'multiple-choice',
    difficulty: 'Standard',
    competencyLevel: 'Aqueous Basicity Order',
    question: 'What is the correct decreasing order of basic strength in AQUEOUS SOLUTION for methyl substituted amines?',
    options: ['(CH3)3N > (CH3)2NH > CH3NH2 > NH3', '(CH3)2NH > CH3NH2 > (CH3)3N > NH3', 'CH3NH2 > (CH3)2NH > (CH3)3N > NH3', '(CH3)2NH > (CH3)3N > CH3NH2 > NH3'],
    correctIndex: 1,
    explanation: 'For methyl substituted amines in water, the order is 2° > 1° > 3° > NH3. (CH3)2NH (pKb 3.27) > CH3NH2 (pKb 3.36) > (CH3)3N (pKb 4.19) > NH3 (pKb 4.75).',
    hints: ['Remember the code 213 for methyl substituted amines in water!', '2° amine is highest, 3° is lower than 1° due to hydration & steric factors.']
  },
  {
    id: 'chal_12',
    nodeId: 'c12_chem_cbse_311',
    type: 'multiple-choice',
    difficulty: 'Standard',
    competencyLevel: 'Gas vs Aqueous Basicity',
    question: 'What is the correct basicity order of ethyl substituted amines in the GAS PHASE (where solvation is absent)?',
    options: ['(C2H5)3N > (C2H5)2NH > C2H5NH2 > NH3', '(C2H5)2NH > (C2H5)3N > C2H5NH2 > NH3', 'C2H5NH2 > (C2H5)2NH > (C2H5)3N > NH3', 'NH3 > C2H5NH2 > (C2H5)2NH > (C2H5)3N'],
    correctIndex: 0,
    explanation: 'In the gas phase, solvation and steric factors do not affect basicity. Only the electron-donating +I effect of alkyl groups operates, so basicity increases monotonically: 3° > 2° > 1° > NH3.',
    hints: ['In the gas phase, only the inductive (+I) effect matters.', 'More alkyl groups = higher electron density on nitrogen.']
  },
  {
    id: 'chal_13',
    nodeId: 'c12_chem_cbse_316',
    type: 'multiple-choice',
    difficulty: 'Standard',
    competencyLevel: 'Hinsberg Separation Test',
    question: 'Compound X reacts with Benzenesulfonyl chloride to yield a solid product that is INSOLUBLE in aqueous NaOH. Compound X is:',
    options: ['A Primary aliphatic amine', 'A Secondary amine', 'A Tertiary amine', 'An Aromatic primary amine'],
    correctIndex: 1,
    explanation: 'Secondary amines react with benzenesulfonyl chloride to form N,N-disubstituted sulfonamides. Because there is NO acidic hydrogen left on the nitrogen, the product is INSOLUBLE in alkali (NaOH).',
    hints: ['Primary amine product has 1 acidic hydrogen left (soluble in alkali).', 'Secondary amine product has 0 acidic hydrogen left (insoluble in alkali).']
  },
  {
    id: 'chal_14',
    nodeId: 'c12_chem_cbse_317',
    type: 'multiple-choice',
    difficulty: 'Standard',
    competencyLevel: 'Electrophilic Protection Strategy',
    question: 'To prepare 4-Bromoaniline from Aniline without forming 2,4,6-tribromoaniline, what step must be performed FIRST?',
    options: ['Nitration with conc HNO3', 'Acetylation with Acetic Anhydride / Pyridine', 'Sulphonation with conc H2SO4', 'Diazotization with NaNO2/HCl'],
    correctIndex: 1,
    explanation: 'Acetylation of -NH2 to -NHCOCH3 lowers nitrogen lone pair availability via resonance with the acetyl carbonyl. This activates the benzene ring moderately, yielding mono-brominated product at para position.',
    hints: ['The activating effect of -NH2 must be reduced (protected).', 'Convert -NH2 group into an acetanilide amide group first!']
  },
  {
    id: 'chal_15',
    nodeId: 'c12_chem_cbse_322',
    type: 'multiple-choice',
    difficulty: 'Standard',
    competencyLevel: 'Sandmeyer vs Gattermann',
    question: 'Which reagent set converts Benzenediazonium chloride into Chlorobenzene in the SANDMEYER reaction?',
    options: ['Cu powder + HCl', 'Cu2Cl2 + HCl', 'NaCl + H2SO4', 'Cl2 + FeCl3'],
    correctIndex: 1,
    explanation: 'Sandmeyer reaction uses Copper(I) salt (Cu2Cl2 in HCl). The modification using fine Copper powder + HCl is known as the Gattermann reaction.',
    hints: ['Sandmeyer uses cuprous halide salts, whereas Gattermann uses copper metal powder.']
  },
  {
    id: 'chal_16',
    nodeId: 'c12_chem_cbse_324',
    type: 'multiple-choice',
    difficulty: 'Standard',
    competencyLevel: 'Deamination & Replacement',
    question: 'Which reducing agent converts Benzenediazonium chloride directly into Benzene (reducing Ar-N2+ to Ar-H)?',
    options: ['LiAlH4', 'H3PO2 (Hypophosphorous acid) or CH3CH2OH', 'KMnO4 / H+', 'NaBH4'],
    correctIndex: 1,
    explanation: 'Hypophosphorous acid (H3PO2) or Ethanol (CH3CH2OH) reduces diazonium salts to benzene while themselves getting oxidized to H3PO3 or acetaldehyde.',
    hints: ['Mild reducing agents like H3PO2 or ethyl alcohol strip off N2 and add hydrogen to the ring.']
  },
  {
    id: 'chal_17',
    nodeId: 'c12_chem_cbse_327',
    type: 'multiple-choice',
    difficulty: 'Standard',
    competencyLevel: 'Comprehensive Analysis Flowchart',
    question: 'An unknown liquid compound reacts with HNO2 to give off N2 gas effervescence and forms a clear liquid alcohol. The compound is:',
    options: ['Aniline (1° aromatic)', 'Ethanamine (1° aliphatic)', 'N-Methylethanamine (2° aliphatic)', 'Trimethylamine (3° aliphatic)'],
    correctIndex: 1,
    explanation: 'Primary aliphatic amines react with nitrous acid to form unstable aliphatic diazonium salts, which break down instantly into nitrogen gas and alcohol.',
    hints: ['N2 gas evolution + alcohol formation = Primary ALIPHATIC amine.']
  },

  // Advanced Tier (18-25)
  {
    id: 'chal_18',
    nodeId: 'c12_chem_cbse_305',
    type: 'sequencing',
    difficulty: 'Advanced',
    competencyLevel: 'Multi-step Synthetic Sequence',
    question: 'Arrange the sequence of steps to convert Bromethane (CH3CH2Br) into Propan-1-amine with ONE extra carbon atom.',
    options: [
      '1. React CH3CH2Br with KCN in ethanol -> CH3CH2CN; 2. Reduce CH3CH2CN with LiAlH4 -> CH3CH2CH2NH2',
      '1. React CH3CH2Br with NH3 -> CH3CH2NH2; 2. Add CH3Cl',
      '1. Convert to Grignard reagent; 2. Add NH3',
      '1. Nitration with NaNO2; 2. Reduction with Fe/HCl'
    ],
    correctIndex: 0,
    explanation: 'Nucleophilic substitution with KCN introduces a cyano group (-CN), increasing carbon count from 2 to 3. Subsequent reduction with LiAlH4 yields Propan-1-amine.',
    hints: ['To increase carbon chain length by 1, use cyanide (KCN) substitution first.', 'Then reduce nitrile (-CN) to primary amine (-CH2NH2).']
  },
  {
    id: 'chal_19',
    nodeId: 'c12_chem_cbse_312',
    type: 'multiple-choice',
    difficulty: 'Advanced',
    competencyLevel: 'Substituent Effect on Aniline Basicity',
    question: 'Arrange the following in DECREASING order of basic strength: (I) Aniline, (II) p-Nitroaniline, (III) p-Toluidine (p-methylaniline), (IV) p-Methoxyaniline.',
    options: ['IV > III > I > II', 'II > I > III > IV', 'III > IV > I > II', 'IV > I > III > II'],
    correctIndex: 0,
    explanation: 'Electron-donating groups (+R, +I) increase aniline basicity (-OCH3 > -CH3). Electron-withdrawing groups (-R, -I) decrease basicity (-NO2 strong withdrawing). Order: p-Methoxyaniline > p-Toluidine > Aniline > p-Nitroaniline.',
    hints: ['-OCH3 and -CH3 donate electron density to the ring, boosting basicity.', '-NO2 strongly withdraws electron density, severely weakening basicity.']
  },
  {
    id: 'chal_20',
    nodeId: 'c12_chem_cbse_318',
    type: 'multiple-choice',
    difficulty: 'Advanced',
    competencyLevel: 'Nitration Anomalous Distribution',
    question: 'In the direct nitration of aniline, why is 47% Meta-nitroaniline formed despite -NH2 being an Ortho/Para directing group?',
    options: ['Nitric acid acts as a reducing agent converting aniline to benzene.', 'In strong acidic medium, aniline is protonated to form Anilinium ion (-NH3+), which is strongly meta-directing.', 'Meta position has lower steric hindrance than para position.', 'Nitration mechanism switches from electrophilic to free-radical substitution.'],
    correctIndex: 1,
    explanation: 'In strong acid mixture (HNO3 + H2SO4), aniline accepts a proton to form anilinium ion (+NH3-C6H5). The positive charge on nitrogen makes -NH3+ strongly deactivating and meta-directing (47% meta vs 51% para and 2% ortho).',
    hints: ['What happens to basic nitrogen when mixed with concentrated strong acids?', 'Protonation produces anilinium cation, reversing directive influence.']
  },
  {
    id: 'chal_21',
    nodeId: 'c12_chem_cbse_319',
    type: 'multiple-choice',
    difficulty: 'Advanced',
    competencyLevel: 'Dipolar Zwitterion Structure',
    question: 'Sulfanilic acid (p-aminobenzenesulfonic acid) has a high melting point and is insoluble in organic solvents due to forming:',
    options: ['A cyclic dimer through covalent bonding', 'A Zwitterion (+H3N-C6H4-SO3-)', 'An explosive diazonium salt', 'A polymeric coordination complex'],
    correctIndex: 1,
    explanation: 'Sulfanilic acid contains both acidic (-SO3H) and basic (-NH2) groups in the same molecule. An internal proton transfer creates a dipolar ion known as Zwitterion (+H3N-C6H4-SO3-).',
    hints: ['Internal acid-base reaction creates positive charge on nitrogen and negative charge on sulfonate.']
  },
  {
    id: 'chal_22',
    nodeId: 'c12_chem_cbse_324',
    type: 'multiple-choice',
    difficulty: 'Advanced',
    competencyLevel: 'Schiemann Reaction Mechanism',
    question: 'Fluorobenzene cannot be prepared by Sandmeyer reaction with Cu2F2. Instead, it is prepared by heating Benzenediazonium fluoroborate. This reaction is named:',
    options: ['Schiemann Reaction', 'Etard Reaction', 'Stephen Reaction', 'Finkelstein Reaction'],
    correctIndex: 0,
    explanation: 'Balz-Schiemann reaction involves reacting C6H5N2+Cl- with HBF4 to precipitate C6H5N2+BF4-, which upon dry heating yields C6H5F + N2 + BF3.',
    hints: ['Named after Heinrich Balz and Günther Schiemann.', 'Uses fluoroboric acid (HBF4).']
  },
  {
    id: 'chal_23',
    nodeId: 'c12_chem_cbse_325',
    type: 'multiple-choice',
    difficulty: 'Advanced',
    competencyLevel: 'Coupling Mechanism & Optimal pH',
    question: 'Why must the diazonium coupling reaction with Aniline be carried out in MILDLY ACIDIC medium (pH 4-5) rather than strongly alkaline medium?',
    options: ['In alkali, aniline gets oxidized to nitrobenzene.', 'In strong alkali, diazonium ion converts to unreactive diazotate ion (Ar-N=N-O-).', 'In strong acid, aniline loses its lone pair; in alkali, diazonium cation loses positive electrophilic charge.', 'The reaction is faster in non-polar solvents.'],
    correctIndex: 1,
    explanation: 'At high pH (>10), diazonium cation reacts with OH- to form unreactive diazotate ion (Ar-N=N-O-) which cannot attack aromatic rings. At low pH (<4), aniline is protonated to anilinium ion which lacks lone pair. Optimal pH is 4-5.',
    hints: ['Diazonium cation needs to remain electrophilic (Ar-N2+).', 'High pH turns Ar-N2+ into non-electrophilic diazotate!']
  },
  {
    id: 'chal_24',
    nodeId: 'c12_chem_cbse_326',
    type: 'multiple-choice',
    difficulty: 'Advanced',
    competencyLevel: 'Multi-Step Synthesis Planning',
    question: 'How can 1,3,5-Tribromobenzene be synthesized efficiently from Aniline?',
    options: ['1. Direct bromination of benzene with Br2/FeBr3', '1. Bromination with Br2 water -> 2,4,6-tribromoaniline; 2. Diazotization with NaNO2/HCl; 3. Deamination with H3PO2', '1. Nitration -> m-nitrobenzene; 2. Bromination; 3. Reduction', '1. Hoffmann degradation of tribromobenzamide'],
    correctIndex: 1,
    explanation: 'Aniline reacts with Br2 water to introduce 3 bromines at 2,4,6 positions. Diazotization of 2,4,6-tribromoaniline with NaNO2/HCl followed by reduction with H3PO2 removes the -NH2 group, yielding 1,3,5-tribromobenzene.',
    hints: ['Use -NH2 to direct 3 bromines into meta positions relative to each other.', 'Then remove the -NH2 group using diazonium deamination!']
  },
  {
    id: 'chal_25',
    nodeId: 'c12_chem_cbse_327',
    type: 'multiple-choice',
    difficulty: 'Advanced',
    competencyLevel: 'Distinction Flowchart Mastery',
    question: 'You are given three unlabelled bottles containing Ethylamine, Diethylamine, and Triethylamine. Which SINGLE chemical reagent test sequence allows clear identification of all three?',
    options: ['Lucas Test', 'Hinsberg Test (Benzenesulfonyl chloride in aqueous NaOH)', 'Tollens Test', 'Fehling Test'],
    correctIndex: 1,
    explanation: 'Hinsberg test: Ethylamine (1°) yields soluble sulfonamide in NaOH; Diethylamine (2°) yields insoluble precipitate; Triethylamine (3°) does not react.',
    hints: ['Benzenesulfonyl chloride differentiates 1°, 2°, and 3° amines based on alkali solubility.']
  }
];

// ==========================================
// DIAGNOSTIC QUIZ QUESTIONS (8 ITEMS)
// ==========================================
interface DiagnosticQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: 'string;',
  nodeId: NodeId;
}

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag_1',
    question: 'Which compound will yield Methanamine when treated with LiAlH4 in dry ether?',
    options: ['Methanlenitrile / Methyl cyanide', 'Formamide (HCONH2) or Nitromethane (CH3NO2)', 'Methyl isocyanide', 'Methanamide only'],
    correctIndex: 1,
    explanation: 'Reduction of Formamide (HCONH2) or Nitromethane (CH3NO2) with LiAlH4 yields Methanamine (CH3NH2).',
    nodeId: 'c12_chem_cbse_306'
  },
  {
    id: 'diag_2',
    question: 'What is the correct relative order of basic strength in aqueous solution for ethyl amines?',
    options: ['(C2H5)2NH > (C2H5)3N > C2H5NH2 > NH3', '(C2H5)3N > (C2H5)2NH > C2H5NH2 > NH3', 'C2H5NH2 > (C2H5)2NH > (C2H5)3N > NH3', '(C2H5)2NH > C2H5NH2 > (C2H5)3N > NH3'],
    correctIndex: 0,
    explanation: 'For ethyl substituted amines in water, the order is 2° > 3° > 1° > NH3 (code 231). Diethylamine (pKb 3.00) > Triethylamine (pKb 3.25) > Ethylamine (pKb 3.29).',
    nodeId: 'c12_chem_cbse_311'
  },
  {
    id: 'diag_3',
    question: 'Which test specifically differentiates Primary Aliphatic Amines from Primary Aromatic Amines?',
    options: ['Carbylamine Test', 'Reaction with Nitrous Acid at 0-5°C (Aliphatic evolves N2 gas immediately; Aromatic forms stable diazonium salt)', 'Hinsberg Test', 'Biuret Test'],
    correctIndex: 1,
    explanation: 'Nitrous acid test at 0-5°C: Aliphatic 1° amines produce nitrogen gas bubbles immediately, whereas aromatic 1° amines form clear stable diazonium salt solutions.',
    nodeId: 'c12_chem_cbse_315'
  },
  {
    id: 'diag_4',
    question: 'In the Gabriel Phthalimide synthesis, which intermediate reagent is formed after reaction with KOH?',
    options: ['Phthalic acid', 'Potassium Phthalimide', 'N-Alkylphthalimide', 'Phthalic anhydride'],
    correctIndex: 1,
    explanation: 'Phthalimide reacts with ethanolic KOH to form Potassium Phthalimide salt, which acts as a strong nucleophile for alkylation.',
    nodeId: 'c12_chem_cbse_307'
  },
  {
    id: 'diag_5',
    question: 'What organic product is obtained when Benzenediazonium chloride is treated with Potassium Iodide (KI)?',
    options: ['Chlorobenzene', 'Iodobenzene', 'Phenol', 'Fluorobenzene'],
    correctIndex: 1,
    explanation: 'Warming benzenediazonium chloride with aqueous KI solution smoothly replaces the diazonium group with iodine to form Iodobenzene + N2 + KCl.',
    nodeId: 'c12_chem_cbse_324'
  },
  {
    id: 'diag_6',
    question: 'The reaction of Benzenediazonium chloride with Cuprous cyanide (CuCN) dissolved in KCN to yield Benzonitrile is called:',
    options: ['Gattermann Reaction', 'Sandmeyer Reaction', 'Kolbe Reaction', 'Reimer-Tiemann Reaction'],
    correctIndex: 1,
    explanation: 'The reaction using Cu2(CN)2 / KCN to introduce nitrile group into benzene ring is the Sandmeyer reaction.',
    nodeId: 'c12_chem_cbse_322'
  },
  {
    id: 'diag_7',
    question: 'Why does Aniline NOT undergo Friedel-Crafts alkylation or acylation in the presence of anhydrous AlCl3?',
    options: ['Aniline is too insoluble in organic solvents.', 'Aniline forms a Lewis acid-base adduct with AlCl3 catalyst, generating positive charge on N which deactivates the benzene ring.', 'Aniline decomposes upon contact with aluminum chloride.', 'Friedel-Crafts reaction occurs only with aliphatic compounds.'],
    correctIndex: 1,
    explanation: 'Aniline is a Lewis base and reacts with anhydrous AlCl3 (Lewis acid) to form salt [C6H5NH2+-AlCl3-]. Positive charge on N deactivates ring for electrophilic attack.',
    nodeId: 'c12_chem_cbse_313'
  },
  {
    id: 'diag_8',
    question: 'What is the structure of the Zwitterion formed by Sulfanilic Acid?',
    options: ['+H3N-C6H4-SO3-', 'H2N-C6H4-SO3H', '+H3N-C6H4-COOH', 'HO-C6H4-SO3-'],
    correctIndex: 0,
    explanation: 'Sulfanilic acid transfers a proton internally from -SO3H to -NH2, yielding dipolar Zwitterion +H3N-C6H4-SO3-.',
    nodeId: 'c12_chem_cbse_319'
  }
];

// ==========================================
// SVG VISUALIZER COMPONENTS
// ==========================================

// Component 1: Amine Structure & Geometry SVG
const AmineStructureSVG: React.FC<{
  amineType: '1deg_aliphatic' | '2deg_aliphatic' | '3deg_aliphatic' | 'aniline';
}> = ({ amineType }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-700 shadow-inner">
      <svg viewBox="0 0 500 300" className="w-full h-64">
        {/* Background Grid */}
        <defs>
          <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" />
          </pattern>
          <radialGradient id="lonePairGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="500" height="300" fill="url(#gridPattern)" rx="8" />

        {/* Central Nitrogen Atom */}
        <g transform="translate(250, 140)">
          {/* Lone Pair orbital lobe */}
          <path d="M -15 0 C -25 -40, 25 -40, 15 0 Z" fill="url(#lonePairGlow)" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="-6" cy="-22" r="3" fill="#e0f2fe" />
          <circle cx="6" cy="-22" r="3" fill="#e0f2fe" />

          {/* Hybridization & Geometry Label */}
          <text x="0" y="-55" textAnchor="middle" fill="#38bdf8" className="text-xs font-semibold">
            sp³ Hybridized Lone Pair
          </text>

          {/* Central N Circle */}
          <circle cx="0" cy="0" r="24" fill="#1e40af" stroke="#60a5fa" strokeWidth="3" />
          <text x="0" y="6" textAnchor="middle" fill="#ffffff" className="text-base font-bold">N</text>

          {/* Geometry bonds based on amine type */}
          {amineType === '1deg_aliphatic' && (
            <>
              {/* Bond 1: CH3 */}
              <line x1="-18" y1="16" x2="-80" y2="70" stroke="#94a3b8" strokeWidth="4" />
              <circle cx="-80" cy="70" r="18" fill="#475569" stroke="#cbd5e1" strokeWidth="2" />
              <text x="-80" y="75" textAnchor="middle" fill="#ffffff" className="text-xs font-bold">CH₃</text>

              {/* Bond 2: H */}
              <line x1="0" y1="24" x2="0" y2="85" stroke="#94a3b8" strokeWidth="4" strokeDasharray="4 2" />
              <circle cx="0" cy="85" r="14" fill="#64748b" stroke="#e2e8f0" strokeWidth="2" />
              <text x="0" y="89" textAnchor="middle" fill="#ffffff" className="text-xs font-bold">H</text>

              {/* Bond 3: H */}
              <line x1="18" y1="16" x2="80" y2="70" stroke="#94a3b8" strokeWidth="4" />
              <circle cx="80" cy="70" r="14" fill="#64748b" stroke="#e2e8f0" strokeWidth="2" />
              <text x="80" y="74" textAnchor="middle" fill="#ffffff" className="text-xs font-bold">H</text>

              <text x="0" y="130" textAnchor="middle" fill="#38bdf8" className="text-sm font-semibold">
                1° Amine (Methylamine) — Angle ~107.2°
              </text>
            </>
          )}

          {amineType === '2deg_aliphatic' && (
            <>
              {/* Bond 1: CH3 */}
              <line x1="-18" y1="16" x2="-80" y2="70" stroke="#94a3b8" strokeWidth="4" />
              <circle cx="-80" cy="70" r="18" fill="#475569" stroke="#cbd5e1" strokeWidth="2" />
              <text x="-80" y="75" textAnchor="middle" fill="#ffffff" className="text-xs font-bold">CH₃</text>

              {/* Bond 2: CH3 */}
              <line x1="18" y1="16" x2="80" y2="70" stroke="#94a3b8" strokeWidth="4" />
              <circle cx="80" cy="70" r="18" fill="#475569" stroke="#cbd5e1" strokeWidth="2" />
              <text x="80" y="75" textAnchor="middle" fill="#ffffff" className="text-xs font-bold">CH₃</text>

              {/* Bond 3: H */}
              <line x1="0" y1="24" x2="0" y2="85" stroke="#94a3b8" strokeWidth="4" strokeDasharray="4 2" />
              <circle cx="0" cy="85" r="14" fill="#64748b" stroke="#e2e8f0" strokeWidth="2" />
              <text x="0" y="89" textAnchor="middle" fill="#ffffff" className="text-xs font-bold">H</text>

              <text x="0" y="130" textAnchor="middle" fill="#38bdf8" className="text-sm font-semibold">
                2° Amine (Dimethylamine) — Pyramidal Geometry
              </text>
            </>
          )}

          {amineType === '3deg_aliphatic' && (
            <>
              {/* Bond 1: CH3 */}
              <line x1="-18" y1="16" x2="-80" y2="70" stroke="#94a3b8" strokeWidth="4" />
              <circle cx="-80" cy="70" r="18" fill="#475569" stroke="#cbd5e1" strokeWidth="2" />
              <text x="-80" y="75" textAnchor="middle" fill="#ffffff" className="text-xs font-bold">CH₃</text>

              {/* Bond 2: CH3 */}
              <line x1="0" y1="24" x2="0" y2="85" stroke="#94a3b8" strokeWidth="4" />
              <circle cx="0" cy="85" r="18" fill="#475569" stroke="#cbd5e1" strokeWidth="2" />
              <text x="0" y="90" textAnchor="middle" fill="#ffffff" className="text-xs font-bold">CH₃</text>

              {/* Bond 3: CH3 */}
              <line x1="18" y1="16" x2="80" y2="70" stroke="#94a3b8" strokeWidth="4" />
              <circle cx="80" cy="70" r="18" fill="#475569" stroke="#cbd5e1" strokeWidth="2" />
              <text x="80" y="75" textAnchor="middle" fill="#ffffff" className="text-xs font-bold">CH₃</text>

              <text x="0" y="130" textAnchor="middle" fill="#f59e0b" className="text-sm font-semibold">
                3° Amine (Trimethylamine) — High Steric Crowding
              </text>
            </>
          )}

          {amineType === 'aniline' && (
            <>
              {/* Bond 1: Benzene Ring */}
              <line x1="-18" y1="16" x2="-75" y2="65" stroke="#38bdf8" strokeWidth="4" />
              {/* Hexagon representation */}
              <polygon points="-120,65 -95,35 -65,45 -60,80 -85,105 -115,95" fill="none" stroke="#e2e8f0" strokeWidth="3" />
              <circle cx="-90" cy="70" r="16" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
              <text x="-90" y="74" textAnchor="middle" fill="#e2e8f0" className="text-xs font-bold">C₆H₅</text>

              {/* Bond 2: H */}
              <line x1="0" y1="24" x2="0" y2="85" stroke="#94a3b8" strokeWidth="4" />
              <circle cx="0" cy="85" r="14" fill="#64748b" stroke="#e2e8f0" strokeWidth="2" />
              <text x="0" y="89" textAnchor="middle" fill="#ffffff" className="text-xs font-bold">H</text>

              {/* Bond 3: H */}
              <line x1="18" y1="16" x2="60" y2="70" stroke="#94a3b8" strokeWidth="4" />
              <circle cx="60" cy="70" r="14" fill="#64748b" stroke="#e2e8f0" strokeWidth="2" />
              <text x="60" y="74" textAnchor="middle" fill="#ffffff" className="text-xs font-bold">H</text>

              {/* Resonance Arrow */}
              <path d="M -15 -10 C -40 -30, -70 -20, -80 30" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />

              <text x="0" y="130" textAnchor="middle" fill="#ef4444" className="text-sm font-semibold">
                Aniline: Lone Pair Delocalized into Ring (+R Effect)
              </text>
            </>
          )}
        </g>
      </svg>
    </div>
  );
};

// Component 2: Basic Strength Chart SVG
const BasicStrengthChartSVG: React.FC<{
  phase: 'gas' | 'aqueous';
  series: 'methyl' | 'ethyl';
}> = ({ phase, series }) => {
  const data = useMemo(() => {
    if (phase === 'gas') {
      return [
        { name: 'NH3', score: 20, pKb: '9.25', color: '#94a3b8' },
        { name: '1° Amine', score: 45, pKb: '4.70', color: '#60a5fa' },
        { name: '2° Amine', score: 70, pKb: '3.30', color: '#3b82f6' },
        { name: '3° Amine', score: 95, pKb: '2.10', color: '#1d4ed8' },
      ];
    } else {
      if (series === 'methyl') {
        // Order: 2° > 1° > 3° > NH3 (Code 213)
        return [
          { name: 'NH3', score: 25, pKb: '4.75', color: '#94a3b8' },
          { name: '3° ((CH3)3N)', score: 50, pKb: '4.19', color: '#f59e0b' },
          { name: '1° (CH3NH2)', score: 75, pKb: '3.36', color: '#10b981' },
          { name: '2° ((CH3)2NH)', score: 95, pKb: '3.27', color: '#059669' },
        ];
      } else {
        // Order: 2° > 3° > 1° > NH3 (Code 231)
        return [
          { name: 'NH3', score: 25, pKb: '4.75', color: '#94a3b8' },
          { name: '1° (C2H5NH2)', score: 60, pKb: '3.29', color: '#60a5fa' },
          { name: '3° ((C2H5)3N)', score: 80, pKb: '3.25', color: '#f59e0b' },
          { name: '2° ((C2H5)2NH)', score: 98, pKb: '3.00', color: '#059669' },
        ];
      }
    }
  }, [phase, series]);

  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-inner">
      <div className="flex justify-between items-center mb-2 text-xs font-semibold text-slate-300">
        <span>Basicity Trend Visualizer</span>
        <span className="text-cyan-400">
          {phase === 'gas' ? 'Gas Phase (Inductive +I Dominant)' : `Aqueous Phase (${series.toUpperCase()} Series: Inductive + Solvation + Steric)`}
        </span>
      </div>
      <svg viewBox="0 0 500 220" className="w-full h-56">
        <rect width="500" height="220" fill="#0f172a" rx="6" />

        {/* Axes */}
        <line x1="60" y1="180" x2="460" y2="180" stroke="#475569" strokeWidth="2" />
        <line x1="60" y1="20" x2="60" y2="180" stroke="#475569" strokeWidth="2" />

        <text x="25" y="100" fill="#94a3b8" className="text-xs font-bold" transform="rotate(-90 25 100)">
          Basic Strength (Kb) →
        </text>

        {data.map((item, idx) => {
          const barWidth = 60;
          const x = 90 + idx * 95;
          const height = (item.score / 100) * 140;
          const y = 180 - height;

          return (
            <g key={item.name}>
              {/* Bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={height}
                fill={item.color}
                rx="4"
                className="transition-all duration-500 hover:opacity-80"
              />
              {/* Value Label */}
              <text x={x + barWidth / 2} y={y - 8} textAnchor="middle" fill="#ffffff" className="text-xs font-bold">
                pKb {item.pKb}
              </text>
              {/* Category Label */}
              <text x={x + barWidth / 2} y="200" textAnchor="middle" fill="#cbd5e1" className="text-xs font-semibold">
                {item.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// Component 3: Diazonium Reaction Pathways Map SVG
const DiazoniumReactionMapSVG: React.FC<{
  activeReagent: string;
}> = ({ activeReagent }) => {
  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-inner">
      <div className="text-center text-sm font-bold text-sky-400 mb-2">
        Synthetic Hub: Benzenediazonium Chloride Pathways
      </div>
      <svg viewBox="0 0 600 320" className="w-full h-72">
        <rect width="600" height="320" fill="#0f172a" rx="8" />

        {/* Central Hub: Benzenediazonium Chloride */}
        <g transform="translate(300, 160)">
          <circle cx="0" cy="0" r="45" fill="#0284c7" stroke="#38bdf8" strokeWidth="3" />
          <text x="0" y="-8" textAnchor="middle" fill="#ffffff" className="text-xs font-bold">C₆H₅N₂⁺ Cl⁻</text>
          <text x="0" y="10" textAnchor="middle" fill="#bae6fd" className="text-xs">Diazonium</text>
          <text x="0" y="24" textAnchor="middle" fill="#bae6fd" className="text-xs">Salt</text>
        </g>

        {/* Pathway 1: Cu2Cl2 / HCl -> Chlorobenzene */}
        <g className="transition-all duration-300">
          <line x1="260" y1="130" x2="140" y2="60" stroke={activeReagent === 'Cu2Cl2' ? '#22c55e' : '#475569'} strokeWidth={activeReagent === 'Cu2Cl2' ? '4' : '2'} />
          <rect x="70" y="30" width="100" height="40" rx="6" fill={activeReagent === 'Cu2Cl2' ? '#15803d' : '#1e293b'} stroke="#22c55e" strokeWidth="1.5" />
          <text x="120" y="48" textAnchor="middle" fill="#ffffff" className="text-xs font-bold">Chlorobenzene</text>
          <text x="120" y="62" textAnchor="middle" fill="#86efac" className="text-[10px]">Cu₂Cl₂ / HCl</text>
        </g>

        {/* Pathway 2: Cu2Br2 / HBr -> Bromobenzene */}
        <g className="transition-all duration-300">
          <line x1="340" y1="130" x2="460" y2="60" stroke={activeReagent === 'Cu2Br2' ? '#22c55e' : '#475569'} strokeWidth={activeReagent === 'Cu2Br2' ? '4' : '2'} />
          <rect x="430" y="30" width="100" height="40" rx="6" fill={activeReagent === 'Cu2Br2' ? '#15803d' : '#1e293b'} stroke="#22c55e" strokeWidth="1.5" />
          <text x="480" y="48" textAnchor="middle" fill="#ffffff" className="text-xs font-bold">Bromobenzene</text>
          <text x="480" y="62" textAnchor="middle" fill="#86efac" className="text-[10px]">Cu₂Br₂ / HBr</text>
        </g>

        {/* Pathway 3: KI -> Iodobenzene */}
        <g className="transition-all duration-300">
          <line x1="255" y1="160" x2="110" y2="160" stroke={activeReagent === 'KI' ? '#22c55e' : '#475569'} strokeWidth={activeReagent === 'KI' ? '4' : '2'} />
          <rect x="40" y="140" width="100" height="40" rx="6" fill={activeReagent === 'KI' ? '#15803d' : '#1e293b'} stroke="#eab308" strokeWidth="1.5" />
          <text x="90" y="158" textAnchor="middle" fill="#ffffff" className="text-xs font-bold">Iodobenzene</text>
          <text x="90" y="172" textAnchor="middle" fill="#fef08a" className="text-[10px]">KI + Warm</text>
        </g>

        {/* Pathway 4: HBF4 -> Fluorobenzene */}
        <g className="transition-all duration-300">
          <line x1="345" y1="160" x2="490" y2="160" stroke={activeReagent === 'HBF4' ? '#22c55e' : '#475569'} strokeWidth={activeReagent === 'HBF4' ? '4' : '2'} />
          <rect x="460" y="140" width="100" height="40" rx="6" fill={activeReagent === 'HBF4' ? '#15803d' : '#1e293b'} stroke="#38bdf8" strokeWidth="1.5" />
          <text x="510" y="158" textAnchor="middle" fill="#ffffff" className="text-xs font-bold">Fluorobenzene</text>
          <text x="510" y="172" textAnchor="middle" fill="#bae6fd" className="text-[10px]">HBF₄ + Heat (Schiemann)</text>
        </g>

        {/* Pathway 5: H2O warm -> Phenol */}
        <g className="transition-all duration-300">
          <line x1="270" y1="195" x2="140" y2="260" stroke={activeReagent === 'H2O' ? '#22c55e' : '#475569'} strokeWidth={activeReagent === 'H2O' ? '4' : '2'} />
          <rect x="70" y="245" width="100" height="40" rx="6" fill={activeReagent === 'H2O' ? '#15803d' : '#1e293b'} stroke="#ef4444" strokeWidth="1.5" />
          <text x="120" y="263" textAnchor="middle" fill="#ffffff" className="text-xs font-bold">Phenol</text>
          <text x="120" y="277" textAnchor="middle" fill="#fca5a5" className="text-[10px]">H₂O / 283K</text>
        </g>

        {/* Pathway 6: Phenol / pH 9-10 -> Orange Azo Dye */}
        <g className="transition-all duration-300">
          <line x1="330" y1="195" x2="460" y2="260" stroke={activeReagent === 'PhenolDye' ? '#22c55e' : '#475569'} strokeWidth={activeReagent === 'PhenolDye' ? '4' : '2'} />
          <rect x="430" y="245" width="110" height="40" rx="6" fill={activeReagent === 'PhenolDye' ? '#c2410c' : '#1e293b'} stroke="#f97316" strokeWidth="1.5" />
          <text x="485" y="263" textAnchor="middle" fill="#ffffff" className="text-xs font-bold">Orange Azo Dye</text>
          <text x="485" y="277" textAnchor="middle" fill="#fdba74" className="text-[10px]">Phenol (pH 9-10)</text>
        </g>
      </svg>
    </div>
  );
};

// ==========================================
// INTERACTIVE REACTION CANVAS VISUALIZER
// ==========================================
const InteractiveReactionCanvas: React.FC<{
  labMode: string;
  reactionProgress: number;
  temperature: number;
}> = ({ labMode, reactionProgress, temperature }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; color: string; label: string }> = [];

    // Initialize particles based on lab mode
    const width = canvas.width;
    const height = canvas.height;

    const count = 25;
    for (let i = 0; i < count; i++) {
      let color = '#38bdf8';
      let label = 'N';

      if (labMode === 'hinsberg') {
        color = i % 2 === 0 ? '#60a5fa' : '#f59e0b';
        label = i % 2 === 0 ? 'RNH₂' : 'ArSO₂Cl';
      } else if (labMode === 'carbylamine') {
        color = i % 3 === 0 ? '#ef4444' : i % 3 === 1 ? '#eab308' : '#10b981';
        label = i % 3 === 0 ? 'RNH₂' : i % 3 === 1 ? 'CHCl₃' : 'KOH';
      } else if (labMode === 'diazotization') {
        color = i % 2 === 0 ? '#3b82f6' : '#ef4444';
        label = i % 2 === 0 ? 'ArNH₂' : 'HNO₂';
      } else if (labMode === 'azo') {
        color = i % 2 === 0 ? '#f97316' : '#0284c7';
        label = i % 2 === 0 ? 'Phenol' : 'ArN₂⁺';
      }

      particles.push({
        x: Math.random() * (width - 40) + 20,
        y: Math.random() * (height - 40) + 20,
        vx: (Math.random() - 0.5) * (temperature / 2),
        vy: (Math.random() - 0.5) * (temperature / 2),
        radius: 12,
        color,
        label
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Beaker outline
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(40, 30);
      ctx.lineTo(40, height - 20);
      ctx.lineTo(width - 40, height - 20);
      ctx.lineTo(width - 40, 30);
      ctx.stroke();

      // Liquid background color based on lab reaction status
      let liquidColor = 'rgba(15, 23, 42, 0.4)';
      if (reactionProgress > 80) {
        if (labMode === 'azo') liquidColor = 'rgba(234, 88, 12, 0.6)'; // Bright Orange
        else if (labMode === 'carbylamine') liquidColor = 'rgba(220, 38, 38, 0.5)'; // Foul turns reddish
        else if (labMode === 'diazotization') liquidColor = 'rgba(14, 165, 233, 0.4)'; // Ice blue
        else if (labMode === 'hinsberg') liquidColor = 'rgba(34, 197, 94, 0.4)'; // Clear solution
      }

      ctx.fillStyle = liquidColor;
      ctx.fillRect(42, 60, width - 84, height - 82);

      // Gas Bubbling effect if Diazotization & High Temp or Aliphatic Nitrous Acid
      if (labMode === 'diazotization' && (temperature > 10 || reactionProgress > 50)) {
        for (let b = 0; b < 10; b++) {
          const bx = 60 + Math.random() * (width - 120);
          const by = height - 30 - ((Date.now() / 10 + b * 30) % (height - 80));
          ctx.beginPath();
          ctx.arc(bx, by, 4 + Math.random() * 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();
        }
      }

      // Render Particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off beaker walls
        if (p.x - p.radius < 45 || p.x + p.radius > width - 45) p.vx *= -1;
        if (p.y - p.radius < 65 || p.y + p.radius > height - 25) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.label, p.x, p.y);
      });

      // Overlay status text
      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`Temp: ${temperature}°C | Reaction Progress: ${reactionProgress}%`, 55, 45);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [labMode, reactionProgress, temperature]);

  return (
    <div className="w-full flex flex-col items-center">
      <canvas ref={canvasRef} width={450} height={220} className="w-full max-w-md rounded-xl bg-slate-950 shadow-md border border-slate-800" />
    </div>
  );
};

// ==========================================
// MAIN COMPONENT CLASS
// ==========================================
export default function C12_ChemistryAminesandDiazoniumSaltsCBSESim() {
  // Navigation Tabs State
  const [activeTab, setActiveTab] = useState<'discovery' | 'labs' | 'challenges' | 'roadmap' | 'quiz' | 'summary'>('discovery');

  // Audio & Speech State
  const [soundEnabled, setSoundEnabled] = useState(true);

  // BKT & SRS Tracking State
  const [bktState, setBktState] = useState<Record<NodeId, BKTState>>(() => {
    const initial: Partial<Record<NodeId, BKTState>> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState(id);
    });
    return initial as Record<NodeId, BKTState>;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReviewItem>>({});

  // Simulation Interactive Lab State
  const [selectedAmineType, setSelectedAmineType] = useState<'1deg_aliphatic' | '2deg_aliphatic' | '3deg_aliphatic' | 'aniline'>('1deg_aliphatic');
  const [basicityPhase, setBasicityPhase] = useState<'gas' | 'aqueous'>('aqueous');
  const [basicitySeries, setBasicitySeries] = useState<'methyl' | 'ethyl'>('methyl');

  const [activeLabMode, setActiveLabMode] = useState<'hinsberg' | 'carbylamine' | 'diazotization' | 'azo'>('hinsberg');
  const [tempCelsius, setTempCelsius] = useState<number>(4);
  const [reactionProgress, setReactionProgress] = useState<number>(0);
  const [diazoniumReagent, setDiazoniumReagent] = useState<string>('Cu2Cl2');
  const [labResultText, setLabResultText] = useState<string>('Select a test reagent and click "Run Reaction".');

  // Discovery Question State
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Challenge System State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [challengeStatus, setChallengeStatus] = useState<'unanswered' | 'correct' | 'incorrect'>('unanswered');
  const [currentHintIdx, setCurrentHintIdx] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [totalCompleted, setTotalCompleted] = useState<number>(0);

  // Quiz State
  const [quizIdx, setQuizIdx] = useState<number>(0);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Feedback Visual Components State
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState({ x: 400, y: 300 });

  // Sound Player Wrapper
  const playSound = useCallback((soundName: SoundEffect | 'success' | 'error' | 'celebration' | 'hint' | 'pickup' | 'drop-correct' | 'drop-wrong' | 'whoosh' | 'sparkle' | 'chime' | 'pop' | 'count' | 'balance' | 'swoop') => {
    if (soundEnabled) {
      audioManager.play(soundName);
    }
  }, [soundEnabled]);

  const speakText = useCallback((text: string) => {
    if (soundEnabled) {
      speechManager.speak(text);
    }
  }, [soundEnabled]);

  // Initial welcome voice message
  useEffect(() => {
    speakText('Welcome to the Amines and Diazonium Salts CISCE Simulation Laboratory.');
  }, [speakText]);

  // Current Challenge Object
  const currentChallenge = CHALLENGES[currentChallengeIdx];

  // Auto Hint Inactivity Timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (activeTab === 'challenges' && challengeStatus === 'unanswered') {
      timerRef.current = setTimeout(() => {
        setShowHint(true);
        playSound('hint');
      }, 10000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeTab, currentChallengeIdx, challengeStatus, playSound]);

  // Handle Discovery Question Submission
  const handleDiscoverySubmit = (idx: number) => {
    setDiscoveryAnswer(idx);
    setDiscoverySubmitted(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      playSound('success');
      setShowConfetti(true);
      speakText('Correct! Steric hindrance by three ethyl groups blocks water solvation of the cation.');
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      playSound('error');
      speakText('Not quite. Consider the three competing factors in aqueous basicity.');
    }
  };

  // Run Interactive Lab Simulation
  const handleRunLabReaction = () => {
    playSound('whoosh');
    setReactionProgress(10);
    setLabResultText('Reaction in progress... heating/stirring mixture.');

    setTimeout(() => {
      setReactionProgress(50);
      playSound('count');
    }, 800);

    setTimeout(() => {
      setReactionProgress(100);
      playSound('sparkle');
      setShowSparkle(true);
      setSparklePos({ x: 500, y: 300 });

      if (activeLabMode === 'hinsberg') {
        if (selectedAmineType === '1deg_aliphatic') {
          setLabResultText('Result: Forms N-alkylbenzenesulfonamide. Has an acidic H on nitrogen, so it DISSOLVES in NaOH giving a clear solution.');
          speakText('Primary amine forms an alkali soluble sulfonamide.');
        } else if (selectedAmineType === '2deg_aliphatic') {
          setLabResultText('Result: Forms N,N-dialkylbenzenesulfonamide. Lacks acidic H, so it forms a precipitate INSOLUBLE in NaOH.');
          speakText('Secondary amine forms an alkali insoluble precipitate.');
        } else if (selectedAmineType === '3deg_aliphatic') {
          setLabResultText('Result: NO REACTION. Tertiary amine does not react with Benzenesulfonyl chloride.');
          speakText('Tertiary amine does not react with Hinsberg reagent.');
        } else {
          setLabResultText('Result: Aniline reacts to form N-phenylbenzenesulfonamide, soluble in NaOH.');
        }
      } else if (activeLabMode === 'carbylamine') {
        if (selectedAmineType === '1deg_aliphatic' || selectedAmineType === 'aniline') {
          setLabResultText('Result: POSITIVE! Formation of extremely foul-smelling Alkyl/Aryl Isocyanide (R-NC / Ar-NC).');
          speakText('Positive carbylamine test! Foul smelling isocyanide detected.');
        } else {
          setLabResultText('Result: NEGATIVE! 2° and 3° amines lack two N-H bonds required for carbylamine formation.');
          speakText('Negative test. Only primary amines give carbylamine test.');
        }
      } else if (activeLabMode === 'diazotization') {
        if (tempCelsius > 5) {
          setLabResultText(`Result: Temperature ${tempCelsius}°C is TOO HIGH! Benzenediazonium salt hydrolyzes rapidly into PHENOL + N2 gas effervescence.`);
          speakText('Decomposition! Diazonium salt decomposes above 5 degrees Celsius.');
        } else {
          setLabResultText(`Result: SUCCESS! Temperature maintained at ${tempCelsius}°C. Clear stable Benzenediazonium Chloride (Ar-N2+ Cl-) solution formed.`);
          speakText('Diazotization successful at chilled temperature.');
        }
      } else if (activeLabMode === 'azo') {
        setLabResultText('Result: Coupling successful! Formed vibrant Orange Azo Dye (p-hydroxyazobenzene) precipitating out of solution.');
        speakText('Coupling reaction complete. Bright orange azo dye synthesized.');
      }

      setTimeout(() => setShowSparkle(false), 2000);
    }, 1600);
  };

  // Handle Challenge Answer Submit
  const handleChallengeSubmit = () => {
    if (!currentChallenge) return;

    let isCorrect = false;
    if (currentChallenge.type === 'multiple-choice' || currentChallenge.type === 'sequencing') {
      isCorrect = selectedOption === currentChallenge.correctIndex;
    } else if (currentChallenge.type === 'numeric') {
      isCorrect = parseFloat(numericAnswer.trim()) === Number(currentChallenge.correctAnswer);
    }

    if (isCorrect) {
      playSound('success');
      setChallengeStatus('correct');
      setScore(prev => prev + 10);
      setTotalCompleted(prev => prev + 1);
      setShowSuccessBanner(true);
      speakText('Correct answer! Well done.');

      // BKT Update
      const prevNodeBKT = bktState[currentChallenge.nodeId] || createBKTState(currentChallenge.nodeId);
      const updatedNodeBKT = bktUpdate(prevNodeBKT, true);
      setBktState(prev => ({ ...prev, [currentChallenge.nodeId]: updatedNodeBKT }));

      // SRS Update
      const srsKey = currentChallenge.id;
      const prevSRS = srsItems[srsKey] || createReviewItem(srsKey);
      const updatedSRS = sm2Update(prevSRS, 5);
      setSrsItems(prev => ({ ...prev, [srsKey]: updatedSRS }));

      setTimeout(() => setShowSuccessBanner(false), 2500);
    } else {
      playSound('error');
      setChallengeStatus('incorrect');
      speakText('Incorrect answer. Review the hint and try again.');

      // BKT Update Incorrect
      const prevNodeBKT = bktState[currentChallenge.nodeId] || createBKTState(currentChallenge.nodeId);
      const updatedNodeBKT = bktUpdate(prevNodeBKT, false);
      setBktState(prev => ({ ...prev, [currentChallenge.nodeId]: updatedNodeBKT }));
    }
  };

  const handleNextChallenge = () => {
    setSelectedOption(null);
    setNumericAnswer('');
    setChallengeStatus('unanswered');
    setShowHint(false);
    setCurrentHintIdx(0);
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx(prev => prev + 1);
      playSound('swoop');
    } else {
      playSound('celebration');
      setShowConfetti(true);
      speakText('Congratulations! You completed all 25 challenges!');
      // Record game score into mastery store
      recordGameScore('c12_chem_cbse_amines', score + 10);
    }
  };

  // Quiz Handling
  const handleQuizAnswer = (optionIdx: number) => {
    setQuizSelected(optionIdx);
    const q = DIAGNOSTIC_QUESTIONS[quizIdx];
    if (optionIdx === q.correctIndex) {
      playSound('pop');
      setQuizScore(prev => prev + 1);
    } else {
      playSound('error');
    }
  };

  const handleNextQuiz = () => {
    setQuizSelected(null);
    if (quizIdx < DIAGNOSTIC_QUESTIONS.length - 1) {
      setQuizIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
      playSound('celebration');
    }
  };

  // Overall Mastery Calculation
  const overallMastery = useMemo(() => {
    const ids = Object.keys(bktState) as NodeId[];
    if (ids.length === 0) return 0;
    const totalP = ids.reduce((acc, id) => acc + (bktState[id]?.pKnown || 0), 0);
    return Math.round((totalP / ids.length) * 100);
  }, [bktState]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 md:p-6 flex flex-col items-center select-none">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Challenge Completed! Excellent Chemistry Skill!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />

      {/* HEADER BAR */}
      <header className="w-full max-w-6xl bg-slate-900/90 backdrop-blur border border-slate-800 rounded-2xl p-4 mb-6 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-700 flex items-center justify-center font-black text-2xl text-white shadow-lg">
            N
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
              Amines & Diazonium Salts Sim
            </h1>
            <p className="text-xs text-slate-400">Class 12 ISC Chemistry | 28 Learning Nodes | Multi-Lab Suite</p>
          </div>
        </div>

        {/* Global Stats Header */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 flex flex-col items-center">
            <span className="text-slate-400">Mastery</span>
            <span className="text-emerald-400 font-bold text-sm">{overallMastery}%</span>
          </div>
          <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 flex flex-col items-center">
            <span className="text-slate-400">Score</span>
            <span className="text-sky-400 font-bold text-sm">{score} pts</span>
          </div>
          <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 flex flex-col items-center">
            <span className="text-slate-400">Challenges</span>
            <span className="text-amber-400 font-bold text-sm">{totalCompleted}/25</span>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200"
            title="Toggle Sound"
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
        </div>
      </header>

      {/* TOP NAVIGATION TABS */}
      <nav className="w-full max-w-6xl flex flex-wrap gap-2 mb-6">
        {[
          { id: 'discovery', label: '1. Discovery & Concept' },
          { id: 'labs', label: '2. Interactive Labs (5)' },
          { id: 'challenges', label: '3. Challenges (25)' },
          { id: 'roadmap', label: '4. Reaction Roadmap' },
          { id: 'quiz', label: '5. Diagnostic Quiz' },
          { id: 'summary', label: '6. Real World & Summary' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as typeof activeTab);
              playSound('tap');
            }}
            className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-200 border ${
              activeTab === tab.id
                ? 'bg-sky-600 text-white border-sky-400 shadow-lg shadow-sky-600/30'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* MAIN CONTENT CANVAS CONTAINER */}
      <main className="w-full max-w-6xl bg-slate-900/60 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl min-h-[600px] flex flex-col">
        
        {/* TAB 1: DISCOVERY & SCENARIO */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* Scenario Header */}
            <div className="bg-gradient-to-r from-slate-900 to-sky-950 p-6 rounded-2xl border border-sky-800/40">
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-sky-500/20 text-sky-400 border border-sky-500/30 mb-2 inline-block">
                Lab Context Scenario
              </span>
              <h2 className="text-2xl font-bold text-slate-100 mb-2">{SCENARIO.title}</h2>
              <p className="text-sm text-slate-300 mb-3">{SCENARIO.intro}</p>
              <p className="text-xs text-sky-300 italic">{SCENARIO.context}</p>
            </div>

            {/* Discovery Question Card */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                <span>💡</span> Preconception Discovery Question
              </h3>
              <p className="text-sm font-semibold text-slate-200">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    disabled={discoverySubmitted}
                    className={`p-4 rounded-xl text-xs font-semibold text-left transition-all border ${
                      discoveryAnswer === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950 border-rose-500 text-rose-200'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                  </button>
                ))}
              </div>

              {discoverySubmitted && (
                <div className="p-4 rounded-xl bg-slate-950 border border-sky-800 text-xs text-slate-300 space-y-2">
                  <p className="font-bold text-sky-400">Analysis & Scientific Explanation:</p>
                  <p>{DISCOVERY_QUESTION.hintAfter}</p>
                  <p className="text-slate-400">
                    In triethylamine, nitrogen is crowded by three bulky ethyl groups. When it accepts a proton to form (C2H5)3NH+, water molecules cannot efficiently cluster around and stabilize the positive charge via hydrogen bonding!
                  </p>
                </div>
              )}
            </div>

            {/* Prediction Questions Grid (Mandatory Render) */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-sky-400 flex items-center gap-2">
                <span>🔮</span> Chemical Reaction Predictions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PREDICTION_QUESTIONS.map((pq, pIdx) => (
                  <div key={pIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <p className="text-xs font-bold text-amber-300">{pq.question}</p>
                    <div className="space-y-2">
                      {pq.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-lg text-xs font-medium border ${
                            oIdx === pq.correctIndex
                              ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          <span className="font-bold mr-1">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                        </div>
                      ))}
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-sky-900 text-[11px] text-sky-300">
                      <span className="font-bold">Mechanism note:</span> {pq.verifyInstruction}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE LABS SUITE */}
        {activeTab === 'labs' && (
          <div className="space-y-6">
            {/* Exploration Steps Selector (Mandatory Render) */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (idx === 0) setActiveLabMode('hinsberg');
                    else if (idx === 1) setActiveLabMode('hinsberg');
                    else if (idx === 2) setActiveLabMode('hinsberg');
                    else if (idx === 3) setActiveLabMode('diazotization');
                    else setActiveLabMode('azo');
                    playSound('tap');
                  }}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500 text-left transition-all"
                >
                  <div className="text-[10px] font-extrabold text-sky-400 uppercase">Lab {idx + 1}</div>
                  <div className="text-xs font-bold text-slate-200 truncate">{step.title}</div>
                  <div className="text-[10px] text-slate-400 line-clamp-2 mt-1">{step.instruction}</div>
                </button>
              ))}
            </div>

            {/* Sub-Lab Switcher Controls */}
            <div className="flex flex-wrap gap-2 justify-center bg-slate-900 p-2 rounded-xl border border-slate-800">
              {[
                { id: 'hinsberg', label: '1. Hinsberg Test Lab (Separation)' },
                { id: 'carbylamine', label: '2. Carbylamine Test (1° Specific)' },
                { id: 'diazotization', label: '3. Diazotization & Temperature (0-5°C)' },
                { id: 'azo', label: '4. Azo Dye Coupling Lab' }
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => {
                    setActiveLabMode(m.id as typeof activeLabMode);
                    setReactionProgress(0);
                    setLabResultText('Select parameters and run reaction.');
                    playSound('tap');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeLabMode === m.id
                      ? 'bg-sky-500 text-white shadow'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Interactive Workspace Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Control Column */}
              <div className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-5">
                <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider">
                  Reaction Setup Controls
                </h3>

                {/* Substrate Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-300 mb-2 block">
                    Select Organic Substrate:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: '1deg_aliphatic', label: 'Methylamine (1° Aliph)' },
                      { id: '2deg_aliphatic', label: 'Dimethylamine (2° Aliph)' },
                      { id: '3deg_aliphatic', label: 'Trimethylamine (3° Aliph)' },
                      { id: 'aniline', label: 'Aniline (1° Aromat)' }
                    ].map(type => (
                      <button
                        key={type.id}
                        onClick={() => {
                          setSelectedAmineType(type.id as typeof selectedAmineType);
                          playSound('tap');
                        }}
                        className={`p-2 rounded-lg text-xs font-semibold text-center border transition-all ${
                          selectedAmineType === type.id
                            ? 'bg-sky-600 border-sky-400 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Temperature Controls for Diazotization */}
                {activeLabMode === 'diazotization' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">Ice Bath Temperature:</span>
                      <span className={tempCelsius <= 5 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        {tempCelsius} °C {tempCelsius > 5 ? '(Salt Decomposes!)' : '(Optimal Stable Range)'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="35"
                      value={tempCelsius}
                      onChange={e => setTempCelsius(Number(e.target.value))}
                      className="w-full accent-sky-500 cursor-pointer"
                    />
                  </div>
                )}

                {/* Diazonium Reagent Selector */}
                {activeLabMode === 'diazotization' && (
                  <div>
                    <label className="text-xs font-bold text-slate-300 mb-2 block">
                      Nucleophilic Replacement Reagent:
                    </label>
                    <select
                      value={diazoniumReagent}
                      onChange={e => setDiazoniumReagent(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs font-semibold text-slate-200"
                    >
                      <option value="Cu2Cl2">Cu2Cl2 / HCl → Chlorobenzene (Sandmeyer)</option>
                      <option value="Cu2Br2">Cu2Br2 / HBr → Bromobenzene (Sandmeyer)</option>
                      <option value="KI">KI + Warm → Iodobenzene</option>
                      <option value="HBF4">HBF4 + Heat → Fluorobenzene (Schiemann)</option>
                      <option value="H2O">H2O + 283K → Phenol</option>
                    </select>
                  </div>
                )}

                {/* Action Trigger Button */}
                <button
                  onClick={handleRunLabReaction}
                  className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-95 text-xs uppercase tracking-wider"
                >
                  ⚡ Execute Chemical Reaction
                </button>
              </div>

              {/* Right Reaction Visualizer Column */}
              <div className="lg:col-span-7 bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
                <h3 className="text-sm font-bold text-slate-200">
                  Molecular Dynamic Visualizer
                </h3>

                <InteractiveReactionCanvas
                  labMode={activeLabMode}
                  reactionProgress={reactionProgress}
                  temperature={tempCelsius}
                />

                {/* Chemical Result Readout Box */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    Experimental Observation
                  </div>
                  <div className="text-xs text-slate-200 font-mono leading-relaxed">
                    {labResultText}
                  </div>
                </div>
              </div>
            </div>

            {/* Structural Visualizers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AmineStructureSVG amineType={selectedAmineType} />
              <BasicStrengthChartSVG phase={basicityPhase} series={basicitySeries} />
            </div>

            {/* Basicity Phase Controls */}
            <div className="flex justify-center gap-4 bg-slate-900 p-3 rounded-xl border border-slate-800">
              <button
                onClick={() => setBasicityPhase(basicityPhase === 'gas' ? 'aqueous' : 'gas')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold text-sky-400 border border-slate-700"
              >
                Toggle Phase: Current = <span className="text-white uppercase">{basicityPhase}</span>
              </button>
              <button
                onClick={() => setBasicitySeries(basicitySeries === 'methyl' ? 'ethyl' : 'methyl')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold text-emerald-400 border border-slate-700"
              >
                Toggle Series: Current = <span className="text-white uppercase">{basicitySeries}</span>
              </button>
            </div>

            {/* Observation Questions Section (Mandatory Render) */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                <span>👁️</span> Lab Observations & Critical Reasoning
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {OBSERVATION_QUESTIONS.map((oq, oIdx) => (
                  <div key={oIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <p className="text-xs font-bold text-slate-200">{oq.question}</p>
                    <div className="space-y-2">
                      {oq.observableOptions.map((opt, optIdx) => (
                        <div
                          key={optIdx}
                          className={`p-2.5 rounded-lg text-xs font-medium border ${
                            optIdx === oq.correctIndex
                              ? 'bg-emerald-950/70 border-emerald-600 text-emerald-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          <span className="font-bold mr-1">{String.fromCharCode(65 + optIdx)}.</span> {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CHALLENGES (25 Progressive Items) */}
        {activeTab === 'challenges' && currentChallenge && (
          <div className="space-y-6">
            {/* Header Challenge Progress */}
            <div className="flex justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div>
                <span className="text-xs font-extrabold uppercase text-sky-400 tracking-wider">
                  Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    currentChallenge.difficulty === 'Foundation' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    currentChallenge.difficulty === 'Standard' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' :
                    'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {currentChallenge.difficulty}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{currentChallenge.competencyLevel}</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-400">Target Concept Node</div>
                <div className="text-xs font-mono text-sky-300 font-bold">{currentChallenge.nodeId}</div>
              </div>
            </div>

            {/* Main Challenge Card */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
              <h3 className="text-base md:text-lg font-bold text-slate-100 leading-relaxed">
                {currentChallenge.question}
              </h3>

              {/* Multiple Choice Options */}
              {currentChallenge.type === 'multiple-choice' || currentChallenge.type === 'sequencing' ? (
                <div className="grid grid-cols-1 gap-3">
                  {currentChallenge.options?.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (challengeStatus === 'unanswered') {
                          setSelectedOption(idx);
                          playSound('tap');
                        }
                      }}
                      disabled={challengeStatus !== 'unanswered'}
                      className={`p-4 rounded-xl text-xs md:text-sm font-semibold text-left transition-all border ${
                        selectedOption === idx
                          ? 'bg-sky-600 border-sky-400 text-white shadow-lg'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-bold mr-3 text-sky-400">{String.fromCharCode(65 + idx)}.</span> {opt}
                    </button>
                  ))}
                </div>
              ) : (
                /* Numeric Answer Input */
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-300 block">Enter your numeric answer:</label>
                  <input
                    type="number"
                    value={numericAnswer}
                    onChange={e => setNumericAnswer(e.target.value)}
                    disabled={challengeStatus !== 'unanswered'}
                    placeholder="Type number here..."
                    className="w-full max-w-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-base focus:border-sky-500 outline-none"
                  />
                </div>
              )}

              {/* Action Buttons & Feedback */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    setShowHint(!showHint);
                    playSound('hint');
                  }}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  💡 {showHint ? 'Hide Hint' : 'Need a Hint?'}
                </button>

                {challengeStatus === 'unanswered' ? (
                  <button
                    onClick={handleChallengeSubmit}
                    disabled={selectedOption === null && numericAnswer.trim() === ''}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg"
                  >
                    Next Challenge →
                  </button>
                )}
              </div>

              {/* Hint Bubble Display */}
              <HintBubble
                show={showHint}
                text={currentChallenge.hints[currentHintIdx] || currentChallenge.hints[0]}
              />

              {/* Response Explanation Panel */}
              {challengeStatus !== 'unanswered' && (
                <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 ${
                  challengeStatus === 'correct'
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
                }`}>
                  <div className="font-bold text-sm">
                    {challengeStatus === 'correct' ? '✅ Correct Solution:' : '❌ Explanation & Core Concept:'}
                  </div>
                  <div>{currentChallenge.explanation}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: DIAZONIUM REACTION ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-sky-400">
              Complete Synthetic Roadmap for Amines & Diazonium Intermediates
            </h2>
            <DiazoniumReactionMapSVG activeReagent={diazoniumReagent} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Ammonolysis & Gabriel Synthesis', text: 'Hoffmann ammonolysis gives mixture of 1°, 2°, 3° amines. Gabriel Phthalimide guarantees PURE 1° aliphatic amine.' },
                { title: 'Hoffmann Bromamide Degradation', text: 'RCONH2 + Br2 + 4NaOH → RNH2 + Na2CO3 + 2NaBr + 2H2O. Shortens carbon chain by exactly 1 carbon.' },
                { title: 'Azo Dye Coupling', text: 'Benzenediazonium salt couples at para position of phenol (pH 9-10) or aniline (pH 4-5) forming colorful stable -N=N- azo dyes.' }
              ].map((card, i) => (
                <div key={i} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase">{card.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: DIAGNOSTIC QUIZ */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            {!quizFinished ? (
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
                <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                  <span>Diagnostic Question {quizIdx + 1} of {DIAGNOSTIC_QUESTIONS.length}</span>
                  <span className="text-sky-400">Score: {quizScore}</span>
                </div>

                <h3 className="text-base font-bold text-slate-100">
                  {DIAGNOSTIC_QUESTIONS[quizIdx].question}
                </h3>

                <div className="space-y-3">
                  {DIAGNOSTIC_QUESTIONS[quizIdx].options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleQuizAnswer(oIdx)}
                      disabled={quizSelected !== null}
                      className={`w-full p-4 rounded-xl text-xs font-semibold text-left border transition-all ${
                        quizSelected === oIdx
                          ? oIdx === DIAGNOSTIC_QUESTIONS[quizIdx].correctIndex
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                            : 'bg-rose-950 border-rose-500 text-rose-200'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                    </button>
                  ))}
                </div>

                {quizSelected !== null && (
                  <div className="space-y-4 pt-2">
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
                      <span className="font-bold text-sky-400">Explanation:</span> {DIAGNOSTIC_QUESTIONS[quizIdx].explanation}
                    </div>
                    <button
                      onClick={handleNextQuiz}
                      className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs uppercase"
                    >
                      {quizIdx < DIAGNOSTIC_QUESTIONS.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center space-y-4">
                <div className="text-4xl">🏆</div>
                <h3 className="text-2xl font-bold text-slate-100">Diagnostic Quiz Complete!</h3>
                <p className="text-base text-slate-300">
                  You scored <span className="text-emerald-400 font-bold">{quizScore}</span> out of {DIAGNOSTIC_QUESTIONS.length}
                </p>
                <button
                  onClick={() => {
                    setQuizIdx(0);
                    setQuizScore(0);
                    setQuizSelected(null);
                    setQuizFinished(false);
                  }}
                  className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs uppercase"
                >
                  Retake Diagnostic Quiz
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: REAL WORLD ACTIVITY & MISCONCEPTIONS SUMMARY */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Real World Activity Card (Mandatory Render) */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-6 rounded-2xl border border-indigo-800/40 space-y-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 inline-block">
                Industrial Real-World Application
              </span>
              <h3 className="text-xl font-bold text-slate-100">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-sky-400 uppercase">Standard Operating Procedure Steps:</h4>
                {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-200 font-mono">
                    {st}
                  </div>
                ))}
              </div>
            </div>

            {/* Misconceptions Expansion Grid */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                <span>⚠️</span> Common Chemistry Misconceptions Clarified
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map(m => (
                  <div key={m.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-rose-400">❌ Misconception:</div>
                    <p className="text-xs text-slate-300">{m.misconception}</p>
                    <div className="text-xs font-bold text-emerald-400 pt-1">✅ Scientific Truth:</div>
                    <p className="text-xs text-emerald-200 font-semibold">{m.correction}</p>
                    <p className="text-[11px] text-slate-400 italic pt-1">{m.explanation}</p>
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