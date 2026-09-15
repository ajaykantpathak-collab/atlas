'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, ReviewItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// --- ALL NODE IDS COVERED ---
const NODE_302 = 'c12_chem_cbse_302'; // Nomenclature of Aldehydes & Ketones
const NODE_303 = 'c12_chem_cbse_303'; // Carbonyl Group Structure & Polarity
const NODE_304 = 'c12_chem_cbse_304'; // Preparation of Aldehydes (Oxidation, Dehydrogenation)
const NODE_305 = 'c12_chem_cbse_305'; // Preparation from Hydrocarbons (Ozonolysis, Hydration)
const NODE_306 = 'c12_chem_cbse_306'; // Specific Aldehyde Syntheses (Stephen, Etard, Gattermann-Koch)
const NODE_307 = 'c12_chem_cbse_307'; // Specific Ketone Syntheses (Cadmium, Nitrile+Grignard, FC Acylation)
const NODE_308 = 'c12_chem_cbse_308'; // Physical Properties (Boiling Points, Solubility)
const NODE_309 = 'c12_chem_cbse_309'; // Nucleophilic Addition Mechanism & Reactivity Trends
const NODE_310 = 'c12_chem_cbse_310'; // Addition of HCN & NaHSO3
const NODE_311 = 'c12_chem_cbse_311'; // Addition of Grignard Reagents
const NODE_312 = 'c12_chem_cbse_312'; // Addition of Alcohols (Hemiacetals, Acetals, Ketals)
const NODE_313 = 'c12_chem_cbse_313'; // Addition of Ammonia Derivatives (Oximes, Hydrazones, 2,4-DNP)
const NODE_314 = 'c12_chem_cbse_314'; // Reduction to Alcohols (NaBH4/LiAlH4) and Hydrocarbons (Clemmensen, Wolff-Kishner)
const NODE_315 = 'c12_chem_cbse_315'; // Oxidation & Tollens' Silver Mirror Test
const NODE_316 = 'c12_chem_cbse_316'; // Oxidation & Fehling's Test (Cu2O Red PPT)
const NODE_317 = 'c12_chem_cbse_317'; // Haloform Reaction & Iodoform Test
const NODE_318 = 'c12_chem_cbse_318'; // Alpha-Hydrogen Reactivity & Aldol Condensation
const NODE_319 = 'c12_chem_cbse_319'; // Cross Aldol Condensation
const NODE_320 = 'c12_chem_cbse_320'; // Cannizzaro Reaction (Disproportionation)
const NODE_321 = 'c12_chem_cbse_321'; // Electrophilic Aromatic Substitution in Aromatic Carbonyls
const NODE_322 = 'c12_chem_cbse_322'; // Nomenclature & Structure of Carboxylic Acids
const NODE_323 = 'c12_chem_cbse_323'; // Preparation of Carboxylic Acids
const NODE_324 = 'c12_chem_cbse_324'; // Physical Properties & Dimerization of Carboxylic Acids
const NODE_325 = 'c12_chem_cbse_325'; // Acidity & Carboxylate Ion Resonance Stabilization
const NODE_326 = 'c12_chem_cbse_326'; // Acid Strength of Substituted Benzoic & Aliphatic Acids
const NODE_327 = 'c12_chem_cbse_327'; // Reactions involving -OH Cleavage (Esterification, Anhydride)
const NODE_328 = 'c12_chem_cbse_328'; // Acid Chlorides Formation (PCl5, PCl3, SOCl2)
const NODE_329 = 'c12_chem_cbse_329'; // Reaction with Ammonia to Form Amides
const NODE_330 = 'c12_chem_cbse_330'; // Reduction & Decarboxylation (Soda-Lime, Kolbe)
const NODE_331 = 'c12_chem_cbse_331'; // Hell-Volhard-Zelinsky (HVZ) Reaction
const NODE_332 = 'c12_chem_cbse_332'; // Ring Substitution in Aromatic Carboxylic Acids

const ALL_NODE_IDS = [
  NODE_302, NODE_303, NODE_304, NODE_305, NODE_306, NODE_307, NODE_308, NODE_309, NODE_310,
  NODE_311, NODE_312, NODE_313, NODE_314, NODE_315, NODE_316, NODE_317, NODE_318, NODE_319,
  NODE_320, NODE_321, NODE_322, NODE_323, NODE_324, NODE_325, NODE_326, NODE_327, NODE_328,
  NODE_329, NODE_330, NODE_331, NODE_332
];

// --- SCENARIO ---
const SCENARIO = {
  title: 'Organic Synthesis & Qualitative Chemical Analysis Laboratory',
  intro: 'Welcome to the Advanced ISC Organic Chemistry Research Facility! You are analyzing carbonyl compounds, aldehydes, ketones, and carboxylic acids.',
  context: 'Explore electrophilic C=O carbon reactivity, perform qualitative tests (Tollens, Fehling, Iodoform), run condensation reactions (Aldol, Cannizzaro), and evaluate carboxylic acid strength through electronic substituent effects.'
};

// --- DISCOVERY QUESTION ---
const DISCOVERY_QUESTION = {
  question: 'Why is Benzaldehyde significantly LESS reactive towards nucleophilic addition than Acetaldehyde, even though both contain a carbonyl group?',
  options: [
    'Benzaldehyde has higher steric hindrance due to the large benzene ring.',
    'The carbonyl carbon in benzaldehyde is electron-rich due to +R (+M) resonance delocalization from the benzene ring, diminishing its electrophilicity.',
    'Benzaldehyde readily undergoes self-oxidation to benzoic acid in solution.',
    'Acetaldehyde forms strong hydrogen bonds that speed up nucleophilic attack.'
  ],
  correctIndex: 1,
  hintAfter: 'Resonance donation (+M effect) of the phenyl ring into the carbonyl C=O delocalizes the positive charge on the carbonyl carbon, making it much less electrophilic than aliphatic aldehydes like acetaldehyde.'
};

// --- EXPLORATION STEPS ---
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Carbonyl Polarity & Nucleophilic Addition Dynamics',
    instruction: 'Select a nucleophile (CN⁻, RMgX, ROH, NH₂-OH) and adjust the carbonyl electrophilicity slider to trigger addition and observe tetrahedral intermediate formation.',
    interactionType: 'nucleophilic-addition',
    nodeId: NODE_309
  },
  {
    title: 'Lab 2: Qualitative Diagnostic Tests (Tollens, Fehling, Iodoform)',
    instruction: 'Choose an organic substrate (Formaldehyde, Acetaldehyde, Acetone, Benzaldehyde, Acetophenone) and react with diagnostic reagents.',
    interactionType: 'diagnostic-tests',
    nodeId: NODE_315
  },
  {
    title: 'Lab 3: Alpha-Hydrogen Condensations (Aldol vs Cannizzaro)',
    instruction: 'Vary the base concentration (Dilute vs Concentrated NaOH) and alpha-hydrogen availability to switch between Aldol Condensation and Cannizzaro Disproportionation.',
    interactionType: 'aldol-cannizzaro',
    nodeId: NODE_318
  },
  {
    title: 'Lab 4: Carboxylic Acid Acidity & Substituted Effects',
    instruction: 'Compare pKa values and carboxylate ion resonance stabilization across electron-withdrawing (EWG) and electron-donating (EDG) substituted acids.',
    interactionType: 'carboxylic-acidity',
    nodeId: NODE_325
  },
  {
    title: 'Lab 5: Multi-step Synthetic Pathway Designer',
    instruction: 'Select starting materials and target products to construct multi-step synthetic routes (e.g., Alkene -> Aldehyde -> Carboxylic Acid -> HVZ product).',
    interactionType: 'synthesis-designer',
    nodeId: NODE_323
  }
];

// --- PREDICTION QUESTIONS ---
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What product is formed when Acetophenone is treated with I₂ and aqueous NaOH, followed by acidification of the filtrate?',
    options: [
      'Iodoform (yellow precipitate) and Sodium Benzoate (yielding Benzoic acid on acidification)',
      '1-Phenylethanol and sodium iodide',
      'Benzaldehyde and methyl iodide',
      '2-Iodo-1-phenylethanone'
    ],
    correctIndex: 0,
    verifyInstruction: 'Verify in Lab 2 by selecting Acetophenone and running the Iodoform Test reagent.',
    nodeId: NODE_317
  },
  {
    question: 'Predict: Which substituted benzoic acid exhibits the highest acidity (lowest pKa)?',
    options: [
      'p-Methoxybenzoic acid',
      'p-Nitrobenzoic acid',
      'o-Nitrobenzoic acid',
      'p-Methylbenzoic acid'
    ],
    correctIndex: 2,
    verifyInstruction: 'Verify in Lab 4 by inspecting pKa values. Note the Ortho Effect in o-nitrobenzoic acid!',
    nodeId: NODE_326
  }
];

// --- OBSERVATION QUESTIONS ---
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe during a positive Tollens\' Test with Acetaldehyde upon mild heating?',
    observableOptions: [
      'A brilliant shiny Silver Mirror deposits on the inner wall of the test tube.',
      'A bright red precipitate of Cu₂O forms at the bottom.',
      'A canary yellow crystal of CHI₃ precipitates out.',
      'Effervescence of CO₂ gas with lime water turning milky.'
    ],
    correctIndex: 0,
    nodeId: NODE_315
  },
  {
    question: 'What happens when Benzaldehyde is treated with 50% Concentrated NaOH solution at room temperature?',
    observableOptions: [
      'It undergoes Cannizzaro reaction yielding Benzyl Alcohol and Sodium Benzoate.',
      'It forms a yellow aldol condensation product (Cinnamaldehyde).',
      'It yields a silver mirror precipitate.',
      'It produces a brilliant yellow Iodoform precipitate.'
    ],
    correctIndex: 0,
    nodeId: NODE_320
  }
];

// --- REAL WORLD ACTIVITY ---
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Synthesis & Quality Assay of Aspirin & Vanillin Derivatives',
  description: 'In pharmaceutical manufacturing, carboxylic acids and aldehydes are central precursors. Synthesizing Acetylsalicylic acid (Aspirin) from Salicylic acid and Acetic anhydride requires strict control of esterification kinetics, yield assays, and purity testing using ferric chloride and melting point determination.',
  steps: [
    'Step 1: Charge 2.00 g of Salicylic Acid (14.48 mmol) into a dry reaction flask and add 5.0 mL Acetic Anhydride with catalytic conc. H₂SO₄.',
    'Step 2: Heat at 50-60°C for 15 minutes to effect complete O-acylation, converting the phenolic -OH to an ester while preserving the carboxylate group.',
    'Step 3: Quench excess acetic anhydride with 20 mL chilled distilled water to precipitate crude Aspirin crystals.',
    'Step 4: Assay purity via HPLC and verify absence of unreacted phenol using Neutral FeCl₃ reagent (violet coloration indicates free phenolic -OH).'
  ]
};

// --- MISCONCEPTIONS ---
const MISCONCEPTIONS = [
  {
    misconception: 'Benzaldehyde gives a positive Fehling\'s Test because it is an aldehyde.',
    correction: 'Aromatic aldehydes like Benzaldehyde do NOT reduce Fehling\'s solution because Cu²⁺ is a weaker oxidizing agent than Ag⁺ (Tollens\') and cannot oxidize benzaldehyde under basic Fehling conditions.',
    nodeId: NODE_316
  },
  {
    misconception: 'Ketones cannot be oxidized under any circumstances.',
    correction: 'Ketones CAN be oxidized under vigorous conditions (strong oxidizing agents like hot conc. HNO₃ or KMnO₄/H₂SO₄) with C-C bond cleavage following Popoff\'s Rule.',
    nodeId: NODE_314
  },
  {
    misconception: 'Aldol condensation occurs with all aldehydes.',
    correction: 'Aldol condensation requires at least one alpha-hydrogen (α-H). Aldehydes lacking α-H (e.g., HCHO, C₆H₅CHO, (CH₃)₃CCHO) undergo Cannizzaro reaction instead.',
    nodeId: NODE_318
  },
  {
    misconception: 'Carboxylic acids are weaker acids than alcohols because both contain -OH groups.',
    correction: 'Carboxylic acids (pKa ~ 4-5) are immensely more acidic than alcohols (pKa ~ 16-18) because the carboxylate ion (R-COO⁻) is stabilized by two equivalent resonance structures where negative charge is delocalized over two electronegative oxygen atoms.',
    nodeId: NODE_325
  },
  {
    misconception: 'Methanoic acid (Formic acid) behaves identically to all other carboxylic acids in oxidation tests.',
    correction: 'Formic acid (HCOOH) contains a hidden aldehyde functional group (-CHO structure) and therefore uniquely reduces Tollens\' and Fehling\'s reagents to form CO₂ and H₂O.',
    nodeId: NODE_323
  },
  {
    misconception: 'The HVZ (Hell-Volhard-Zelinsky) reaction chlorinates or brominates the carboxylic acid -OH group.',
    correction: 'HVZ selectively halogenates the ALPHA-CARBON (α-position) of carboxylic acids containing α-hydrogens in the presence of red phosphorus and X₂ (Cl₂ or Br₂).',
    nodeId: NODE_331
  }
];

// --- CHALLENGES (22 total across 3 tiers) ---
interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'drag-label' | 'numeric' | 'sort';
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
  // --- FOUNDATION (7) ---
  {
    id: 'c1',
    nodeId: NODE_302,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Remembering',
    question: 'What is the IUPAC name of CH₃-CH(CH₃)-CH₂-CHO?',
    options: ['3-Methylbutanal', '2-Methylbutanal', '3-Methylbutan-1-one', 'Isovaleraldehyde'],
    correctIndex: 0,
    explanation: 'Numbering starts from the aldehyde carbon C1: C1(CHO)-C2(H₂)-C3(H, CH₃)-C4(H₃). Thus, it is 3-methylbutanal.',
    hints: ['Start numbering from the aldehyde carbon C-1.', 'The methyl substituent is attached at position 3.', 'The parent chain contains 4 carbons (butanal).']
  },
  {
    id: 'c2',
    nodeId: NODE_303,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'What is the hybridization and bond angle of the carbonyl carbon atom in aldehydes and ketones?',
    options: ['sp³, 109.5°', 'sp², ~120°', 'sp, 180°', 'sp³d, 90°'],
    correctIndex: 1,
    explanation: 'The carbonyl carbon forms three sigma bonds and one pi bond, adopting sp² hybridization with planar geometry and ~120° bond angles.',
    hints: ['Count the number of sigma bonds around the C=O carbon.', 'It forms 3 sigma bonds (trigonal planar).', 'Trigonal planar geometry corresponds to sp² hybridization and 120°.']
  },
  {
    id: 'c3',
    nodeId: NODE_304,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Remembering',
    question: 'Which oxidizing agent selectively oxidizes primary alcohols to aldehydes without further oxidation to carboxylic acids?',
    options: ['Acidified K₂Cr₂O₇', 'Pyridinium Chlorochromate (PCC)', 'Hot Concentrated KMnO₄', 'Concentrated HNO₃'],
    correctIndex: 1,
    explanation: 'PCC in anhydrous CH₂Cl₂ selectively oxidizes primary alcohols to aldehydes and stops at the aldehyde stage because anhydrous conditions prevent chromate ester hydration.',
    hints: ['Aqueous strong oxidants convert primary alcohols all the way to acids.', 'PCC operates under anhydrous conditions.', 'PCC stands for Pyridinium Chlorochromate.']
  },
  {
    id: 'c4',
    nodeId: NODE_308,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Why do aldehydes and ketones have lower boiling points than isomeric alcohols?',
    options: ['Aldehydes cannot form intermolecular hydrogen bonds with themselves.', 'Aldehydes have lower molecular masses.', 'Aldehydes are non-polar molecules.', 'Alcohols form stronger London dispersion forces.'],
    correctIndex: 0,
    explanation: 'Aldehydes and ketones lack an O-H bond, so they cannot form intermolecular hydrogen bonds between their own molecules, resulting in lower boiling points than alcohols.',
    hints: ['Think about hydrogen bonding capabilities.', 'Do aldehydes have an H atom attached directly to O?', 'Self-association via H-bonding is absent in aldehydes.']
  },
  {
    id: 'c5',
    nodeId: NODE_315,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Remembering',
    question: 'What constitutes Tollens\' reagent used in qualitative chemical testing?',
    options: ['Ammoniacal Silver Nitrate solution [Ag(NH₃)₂]⁺', 'Alkaline solution of Cu²⁺ complexed with tartrate', 'Acidified Potassium Permanganate', 'Solution of I₂ in NaOH'],
    correctIndex: 0,
    explanation: 'Tollens\' reagent is freshly prepared ammoniacal silver nitrate, containing the diamminesilver(I) complex ion [Ag(NH₃)₂]⁺.',
    hints: ['It involves silver ions.', 'Ammonia is used to form a complex ion with Ag⁺.', '[Ag(NH₃)₂]⁺ is the active complex.']
  },
  {
    id: 'c6',
    nodeId: NODE_322,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Why do carboxylic acids exist as dimers even in the vapor state or in non-polar solvents like benzene?',
    options: ['Due to intermolecular hydrogen bonding between the C=O and O-H groups of two molecules', 'Due to covalent bond formation', 'Due to ionic interactions', 'Due to London dispersion forces'],
    correctIndex: 0,
    explanation: 'Carboxylic acids form stable cyclic dimers via two intermolecular hydrogen bonds between the carbonyl oxygen of one molecule and the hydroxyl hydrogen of another.',
    hints: ['Each carboxyl group has an H-donor (-OH) and H-acceptor (C=O).', 'Two molecules align in a 6-membered cyclic ring.', 'This is driven by double hydrogen bonding.']
  },
  {
    id: 'c7',
    nodeId: NODE_328,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Remembering',
    question: 'Which reagent is preferred for converting carboxylic acids to acyl chlorides because its reaction byproducts are gaseous and escape easily?',
    options: ['PCl₃', 'PCl₅', 'SOCl₂ (Thionyl chloride)', 'NaCl'],
    correctIndex: 2,
    explanation: 'SOCl₂ (thionyl chloride) produces gaseous byproducts (SO₂ and HCl), making isolation and purification of the acyl chloride exceptionally clean and simple.',
    hints: ['Think about byproducts that are gases.', 'SO₂ and HCl are both gaseous products.', 'Thionyl chloride is SOCl₂.']
  },

  // --- STANDARD (8) ---
  {
    id: 'c8',
    nodeId: NODE_309,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Applying',
    question: 'Arrange the following compounds in INCREASING order of reactivity towards nucleophilic addition reactions: (I) Acetophenone, (II) Benzaldehyde, (III) Acetaldehyde, (IV) Formaldehyde.',
    options: ['I < II < III < IV', 'IV < III < II < I', 'II < I < III < IV', 'I < III < II < IV'],
    correctIndex: 0,
    explanation: 'Reactivity increases as steric hindrance decreases and electrophilicity increases: Acetophenone (bulky phenyl + methyl, +R & +I) < Benzaldehyde (+R of phenyl) < Acetaldehyde (+I of 1 methyl) < Formaldehyde (no alkyl groups, least hindered).',
    hints: ['Consider both steric hindrance and electronic (+I, +R) effects.', 'Formaldehyde is the most reactive due to zero steric hindrance.', 'Acetophenone has phenyl and methyl groups reducing reactivity.']
  },
  {
    id: 'c9',
    nodeId: NODE_312,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Applying',
    question: 'Treatment of acetaldehyde with dry HCl gas and excess anhydrous ethanol yields:',
    options: ['Ethoxyethane', '1-Ethoxyethanol (Hemiacetal)', '1,1-Diethoxyethane (Acetal)', 'Ethyl acetate'],
    correctIndex: 2,
    explanation: 'Acetaldehyde reacts with one equivalent of ethanol to give a hemiacetal, which further reacts with a second equivalent of ethanol in the presence of dry HCl catalyst to yield an acetal (1,1-diethoxyethane).',
    hints: ['Dry HCl protonates the carbonyl oxygen.', 'Excess alcohol drives addition through hemiacetal to complete acetal.', 'Two ethoxy groups bind to the former carbonyl carbon.']
  },
  {
    id: 'c10',
    nodeId: NODE_314,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Applying',
    question: 'Clemmensen Reduction of Propan-2-one (Acetone) involves which reagents to yield Propane?',
    options: ['Zn-Hg / conc. HCl', 'N₂H₄ / KOH / ethylene glycol', 'LiAlH₄ in ether', 'H₂ / Pd-C'],
    correctIndex: 0,
    explanation: 'Clemmensen reduction converts carbonyl C=O to CH₂ using Zinc amalgam (Zn-Hg) and concentrated hydrochloric acid.',
    hints: ['Clemmensen uses acid conditions.', 'Zinc amalgam is the metal reductant.', 'Zn-Hg and concentrated HCl is the reagent pair.']
  },
  {
    id: 'c11',
    nodeId: NODE_317,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analyzing',
    question: 'Which of the following compounds will NOT yield a positive Iodoform test (yellow precipitate of CHI₃)?',
    options: ['Propan-2-one', 'Pentan-3-one', 'Ethanol', 'Acetaldehyde'],
    correctIndex: 1,
    explanation: 'Iodoform test requires a CH₃-C=O or CH₃-CH(OH)- group. Pentan-3-one (CH₃CH₂COCH₂CH₃) lacks a methyl ketone structure and fails the test.',
    hints: ['Look for the CH₃-CO- or CH₃-CH(OH)- group.', 'Pentan-3-one has ethyl groups on both sides of C=O.', 'Without a methyl group directly bonded to C=O, iodoform test is negative.']
  },
  {
    id: 'c12',
    nodeId: NODE_318,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Applying',
    question: 'When acetaldehyde is treated with dilute NaOH followed by heating, the final organic product is:',
    options: ['3-Hydroxybutanal', 'But-2-enal (Crotonaldehyde)', 'Butan-1-ol', 'But-3-en-2-one'],
    correctIndex: 1,
    explanation: 'Acetaldehyde undergoes aldol addition to form 3-hydroxybutanal (aldol), which upon heating undergoes elimination of H₂O to yield the conjugated enal, But-2-enal (Crotonaldehyde).',
    hints: ['First step is aldol addition forming 3-hydroxybutanal.', 'Heating causes dehydration (loss of H₂O).', 'Dehydration creates an alpha,beta-unsaturated aldehyde (But-2-enal).']
  },
  {
    id: 'c13',
    nodeId: NODE_320,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analyzing',
    question: 'Self-disproportionation of Benzaldehyde in 50% KOH (Cannizzaro Reaction) yields which pair of compounds?',
    options: ['Benzene and Benzoic Acid', 'Benzyl Alcohol and Potassium Benzoate', 'Benzoic Acid and Acetone', 'Chlorobenzene and Phenol'],
    correctIndex: 1,
    explanation: 'In Cannizzaro reaction, non-alpha-H aldehydes undergo redox disproportionation: one molecule is reduced to Benzyl Alcohol while the other is oxidized to Benzoate salt (Potassium Benzoate).',
    hints: ['Cannizzaro is a redox (disproportionation) reaction.', 'One molecule is oxidized to a carboxylate salt.', 'The other molecule is reduced to a primary alcohol.']
  },
  {
    id: 'c14',
    nodeId: NODE_325,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analyzing',
    question: 'Which chloro-substituted acetic acid has the HIGHEST acid strength (lowest pKa)?',
    options: ['CH₃COOH', 'ClCH₂COOH', 'Cl₂CHCOOH', 'Cl₃CCOOH'],
    correctIndex: 3,
    explanation: 'Trichloroacetic acid (Cl₃CCOOH) has three strongly electron-withdrawing chlorine atoms (-I effect) that stabilize the carboxylate anion by inductive electron withdrawal, making it the strongest acid.',
    hints: ['Chlorine exerts a strong electron-withdrawing (-I) effect.', 'More chlorine atoms equal greater anion stabilization.', 'Cl₃CCOOH has 3 chlorines withdrawing electron density.']
  },
  {
    id: 'c15',
    nodeId: NODE_327,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Applying',
    question: 'In the Fischer Esterification of Ethanoic Acid with Ethanol in the presence of conc. H₂SO₄, which oxygen atom ends up in the Ethyl Acetate ester molecule?',
    options: ['The oxygen atom of ethanol', 'The carbonyl oxygen of ethanoic acid', 'The hydroxyl oxygen of ethanoic acid', 'Water molecule oxygen'],
    correctIndex: 0,
    explanation: 'Isotopic labeling studies (¹⁸O) prove that the alcohol oxygen acts as a nucleophile attacking the carbonyl carbon; the hydroxyl -OH group of the acid is lost as water, so the ester linkage contains the oxygen from ethanol.',
    hints: ['Alcohol acts as the nucleophile.', 'Nucleophilic attack of ethanol -OH onto carbonyl C.', 'Water loses the -OH from the acid!']
  },

  // --- ADVANCED (7) ---
  {
    id: 'c16',
    nodeId: NODE_306,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluating',
    question: 'What is the chromyl chloride complex intermediate formed during the Etard Reaction of Toluene to Benzaldehyde?',
    options: ['C₆H₅CH(OCrOHCl₂)₂', 'C₆H₅CrO₂Cl₂', 'C₆H₅CHO·CrO₃', 'C₆H₅CH₂OCrCl₃'],
    correctIndex: 0,
    explanation: 'Etard reaction involves oxidation of toluene with CrO₂Cl₂ in CS₂ to form a brown chromium complex C₆H₅CH(OCrOHCl₂)₂, which on acidic hydrolysis yields benzaldehyde.',
    hints: ['Toluene reacts with Chromyl Chloride (CrO₂Cl₂).', 'A brown coordination complex precipitates.', 'Formula is C₆H₅CH(OCrOHCl₂)₂.']
  },
  {
    id: 'c17',
    nodeId: NODE_319,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluating',
    question: 'Predict the major product when Benzaldehyde and Acetaldehyde react in dilute NaOH at room temperature (Cross-Aldol / Claisen-Schmidt Reaction):',
    options: ['3-Phenylprop-2-enal (Cinnamaldehyde)', '4-Phenylbut-3-en-2-one', 'Benzyl alcohol', '2-Phenylbut-2-enal'],
    correctIndex: 0,
    explanation: 'Acetaldehyde forms the enolate (has α-H) while benzaldehyde (more electrophilic, no α-H) acts as the electrophile. Condensation gives 3-phenylprop-2-enal (Cinnamaldehyde).',
    hints: ['Acetaldehyde has alpha-hydrogens and forms enolate ion.', 'Benzaldehyde has no alpha-H and is attacked as electrophile.', 'Dehydration yields C₆H₅-CH=CH-CHO (Cinnamaldehyde).']
  },
  {
    id: 'c18',
    nodeId: NODE_326,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluating',
    question: 'Why is o-nitrobenzoic acid stronger than both m-nitrobenzoic acid and p-nitrobenzoic acid?',
    options: ['Due to the Ortho Effect (steric inhibition of resonance and strong combined inductive/resonance electron withdrawal)', 'Because nitro group at ortho position donates electron density', 'Because meta position has zero inductive effect', 'Due to intermolecular hydrogen bonding with solvent'],
    correctIndex: 0,
    explanation: 'Regardless of whether a substituent is electron-donating or electron-withdrawing, ortho-substituted benzoic acids are stronger than their meta and para isomers due to the Ortho Effect (steric steric twist of -COOH group out of plane and steric relief upon ionization).',
    hints: ['Ortho-substituted benzoic acids exhibit anomalous high acidity.', 'This phenomenon is called the Ortho Effect.', 'Steric hindrance forces -COOH out of ring coplanarity.']
  },
  {
    id: 'c19',
    nodeId: NODE_331,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluating',
    question: 'What is the product formed when Propanoic acid is treated with Br₂ in the presence of Red Phosphorus followed by water hydrolysis (HVZ Reaction)?',
    options: ['2-Bromopropanoic acid', '3-Bromopropanoic acid', 'Propanoyl bromide', '2,2-Dibromopropanoic acid'],
    correctIndex: 0,
    explanation: 'The HVZ (Hell-Volhard-Zelinsky) reaction specifically brominates the alpha-carbon of carboxylic acids containing alpha-hydrogens, yielding 2-bromopropanoic acid (CH₃-CHBr-COOH).',
    hints: ['HVZ targets the alpha position relative to -COOH.', 'Propanoic acid has two alpha-hydrogens on C-2.', 'One alpha hydrogen is replaced by Br to form 2-bromopropanoic acid.']
  },
  {
    id: 'c20',
    nodeId: NODE_321,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Creating',
    question: 'Nitration of Benzaldehyde with conc. HNO₃ / conc. H₂SO₄ yields predominantly:',
    options: ['m-Nitrobenzaldehyde', 'o-Nitrobenzaldehyde', 'p-Nitrobenzaldehyde', '2,4-Dinitrobenzaldehyde'],
    correctIndex: 0,
    explanation: 'The aldehyde group (-CHO) is a strongly deactivating and meta-directing group due to electron-withdrawing resonance (-M) and inductive (-I) effects on the aromatic ring.',
    hints: ['Carbonyl group (-CHO) withdraws electron density from ortho and para positions.', 'This leaves meta positions relatively higher in electron density.', 'Electrophilic substitution occurs at the meta position.']
  },
  {
    id: 'c21',
    nodeId: NODE_330,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Analyzing',
    question: 'Calculate the molecular mass (g/mol) of the organic gas evolved when Sodium Acetate is heated with Soda-Lime (NaOH + CaO). (Atomic masses: C=12, H=1, O=16, Na=23)',
    correctAnswer: 16,
    explanation: 'Decarboxylation of Sodium Acetate (CH₃COONa) with Soda-Lime yields Methane (CH₄) gas and Na₂CO₃. Molecular mass of CH₄ = 12 + 4(1) = 16 g/mol.',
    hints: ['Decarboxylation removes CO₂ from carboxylate salt.', 'Sodium acetate yields methane gas (CH₄).', 'CH₄ mass = 12 + 4(1) = 16.']
  },
  {
    id: 'c22',
    nodeId: NODE_323,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Creating',
    question: 'Grignard reagent Methylmagnesium bromide (CH₃MgBr) reacts with dry ice (solid CO₂), followed by acid hydrolysis, to produce:',
    options: ['Ethanoic acid (Acetic acid)', 'Methanoic acid', 'Propanoic acid', 'Acetone'],
    correctIndex: 0,
    explanation: 'Nucleophilic addition of CH₃MgBr to CO₂ yields CH₃-COO-MgBr, which upon acidic hydrolysis gives Ethanoic acid (CH₃COOH).',
    hints: ['CH₃⁻ attacks the electrophilic carbon of O=C=O.', 'Intermediate is magnesium carboxylate CH₃COOMgBr.', 'Hydrolysis liberates Ethanoic acid (Acetic acid).']
  }
];

// --- SVG DIAGRAM 1: Carbonyl Polarity & Geometry ---
const CarbonylPolarityDiagram: React.FC = () => (
  <svg viewBox="0 0 500 240" className="w-full h-auto bg-slate-900 rounded-xl p-4 border border-cyan-500/30 shadow-2xl">
    <title>Carbonyl Polarity &amp; Geometry</title>
    <defs>
      <radialGradient id="deltaNeg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
      </radialGradient>
      <radialGradient id="deltaPos" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
      </radialGradient>
      <linearGradient id="bondGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>
    </defs>

    <text x="250" y="25" textAnchor="middle" className="fill-cyan-300 text-sm font-bold tracking-wider">
      CARBONYL GROUP ELECTRONIC STRUCTURE &amp; POLARITY
    </text>

    {/* Polar Electron Cloud Background */}
    <ellipse cx="200" cy="120" rx="45" ry="40" fill="url(#deltaPos)" />
    <ellipse cx="320" cy="120" rx="55" ry="48" fill="url(#deltaNeg)" />

    {/* Double Bond Lines */}
    <line x1="200" y1="112" x2="320" y2="112" stroke="url(#bondGrad)" strokeWidth="6" strokeLinecap="round" />
    <line x1="200" y1="128" x2="320" y2="128" stroke="url(#bondGrad)" strokeWidth="6" strokeLinecap="round" />

    {/* Single Bonds R1 and R2 */}
    <line x1="200" y1="120" x2="130" y2="70" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
    <line x1="200" y1="120" x2="130" y2="170" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />

    {/* Carbon Atom */}
    <circle cx="200" cy="120" r="24" className="fill-slate-800 stroke-blue-500" strokeWidth="3" />
    <text x="200" y="126" textAnchor="middle" className="fill-blue-400 font-extrabold text-lg">C</text>
    <text x="200" y="85" textAnchor="middle" className="fill-blue-300 font-bold text-xs">δ+</text>
    <text x="200" y="160" textAnchor="middle" className="fill-blue-400 text-xs font-semibold">sp² (120°)</text>

    {/* Oxygen Atom */}
    <circle cx="320" cy="120" r="26" className="fill-slate-800 stroke-red-500" strokeWidth="3" />
    <text x="320" y="127" textAnchor="middle" className="fill-red-400 font-extrabold text-xl">O</text>
    <text x="320" y="82" textAnchor="middle" className="fill-red-300 font-bold text-xs">δ-</text>

    {/* Oxygen Lone Pairs */}
    <circle cx="352" cy="105" r="3.5" className="fill-red-400" />
    <circle cx="358" cy="113" r="3.5" className="fill-red-400" />
    <circle cx="352" cy="135" r="3.5" className="fill-red-400" />
    <circle cx="358" cy="127" r="3.5" className="fill-red-400" />

    {/* R1 and R2 Labels */}
    <circle cx="120" cy="62" r="16" className="fill-amber-900/60 stroke-amber-500" strokeWidth="2" />
    <text x="120" y="67" textAnchor="middle" className="fill-amber-300 text-xs font-bold">R¹</text>

    <circle cx="120" cy="178" r="16" className="fill-amber-900/60 stroke-amber-500" strokeWidth="2" />
    <text x="120" y="183" textAnchor="middle" className="fill-amber-300 text-xs font-bold">R² / H</text>

    {/* Dipole Moment Arrow */}
    <line x1="190" y1="195" x2="325" y2="195" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 3" />
    <polygon points="335,195 322,190 322,200" fill="#f59e0b" />
    <line x1="190" y1="190" x2="190" y2="200" stroke="#f59e0b" strokeWidth="3" />
    <text x="260" y="215" textAnchor="middle" className="fill-amber-400 text-xs font-mono font-semibold">Dipole Moment (μ ≈ 2.3 - 2.8 D)</text>
  </svg>
);

// --- SVG DIAGRAM 2: Tollens Silver Mirror Test ---
const TollensSilverMirrorDiagram: React.FC<{ progress: number }> = ({ progress }) => {
  const silverOpacity = Math.min(1, progress / 100);
  return (
    <svg viewBox="0 0 500 240" className="w-full h-auto bg-slate-900 rounded-xl p-4 border border-amber-500/30 shadow-2xl">
      <title>Tollens Silver Mirror Assay Visualizer</title>
      <text x="250" y="25" textAnchor="middle" className="fill-amber-300 text-sm font-bold tracking-wider">
        TOLLENS&apos; SILVER MIRROR DIAGNOSTIC REACTION
      </text>

      {/* Test Tube */}
      <path d="M 210,50 L 210,180 A 40,40 0 0,0 290,180 L 290,50 Z" fill="none" stroke="#94a3b8" strokeWidth="4" />

      {/* Solution Level */}
      <path d="M 213,110 L 287,110 A 37,37 0 0,1 287,180 A 37,37 0 0,1 213,180 Z" fill="#38bdf8" fillOpacity="0.25" />

      {/* Silver Coating on Glass Wall */}
      <path
        d="M 210,105 L 210,180 A 40,40 0 0,0 290,180 L 290,105"
        fill="none"
        stroke="#e2e8f0"
        strokeWidth="7"
        strokeOpacity={silverOpacity * 0.95}
      />
      <path
        d="M 213,105 L 213,180 A 37,37 0 0,0 287,180 L 287,105"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeOpacity={silverOpacity * 0.9}
      />

      {/* Reaction Formula Callout */}
      <g transform="translate(20, 70)">
        <rect x="0" y="0" width="170" height="110" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="85" y="25" textAnchor="middle" className="fill-cyan-300 text-xs font-bold">REACTION STEPS</text>
        <text x="12" y="50" className="fill-slate-300 text-[11px] font-mono">R-CHO + 2[Ag(NH₃)₂]⁺</text>
        <text x="12" y="70" className="fill-slate-300 text-[11px] font-mono">+ 3OH⁻  ──Δ──→</text>
        <text x="12" y="92" className="fill-emerald-400 text-[11px] font-mono font-bold">R-COO⁻ + 2Ag↓ + 4NH₃</text>
      </g>

      {/* Diagnostic Indicator */}
      <g transform="translate(310, 70)">
        <rect x="0" y="0" width="170" height="110" rx="8" fill="#1e293b" stroke="#e2e8f0" strokeWidth="1.5" />
        <text x="85" y="25" textAnchor="middle" className="fill-slate-200 text-xs font-bold">METALLIC Ag DEPOSITION</text>
        <circle cx="85" cy="60" r="22" fill="#94a3b8" stroke="#ffffff" strokeWidth="3" fillOpacity={silverOpacity} />
        <text x="85" y="65" textAnchor="middle" className="fill-slate-900 font-extrabold text-sm">Ag⁰</text>
        <text x="85" y="98" textAnchor="middle" className="fill-amber-400 text-[11px] font-semibold">
          {progress >= 100 ? '✨ Mirror Formed!' : `Deposition: ${Math.round(progress)}%`}
        </text>
      </g>
    </svg>
  );
};

// --- SVG DIAGRAM 3: Carboxylate Resonance & Acidity ---
const CarboxylateResonanceDiagram: React.FC = () => (
  <svg viewBox="0 0 500 240" className="w-full h-auto bg-slate-900 rounded-xl p-4 border border-emerald-500/30 shadow-2xl">
    <title>Carboxylate Anion Resonance Stabilization</title>
    <text x="250" y="25" textAnchor="middle" className="fill-emerald-300 text-sm font-bold tracking-wider">
      CARBOXYLATE ANION EQUIVALENT RESONANCE STABILIZATION
    </text>

    {/* Structure 1 */}
    <g transform="translate(40, 60)">
      <rect x="0" y="0" width="180" height="140" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <text x="90" y="25" textAnchor="middle" className="fill-slate-400 text-xs font-bold">Resonance Canonical I</text>
      {/* R - C(=O) - O⁻ */}
      <text x="35" y="80" className="fill-amber-400 font-bold text-base">R</text>
      <line x1="52" y1="75" x2="75" y2="75" stroke="#94a3b8" strokeWidth="3" />
      <text x="80" y="80" className="fill-blue-400 font-bold text-base">C</text>

      {/* Double bond to top O */}
      <line x1="88" y1="63" x2="110" y2="45" stroke="#ef4444" strokeWidth="3" />
      <line x1="94" y1="69" x2="116" y2="51" stroke="#ef4444" strokeWidth="3" />
      <text x="120" y="45" className="fill-red-400 font-bold text-base">O</text>

      {/* Single bond to bottom O⁻ */}
      <line x1="90" y1="85" x2="115" y2="105" stroke="#ef4444" strokeWidth="3" />
      <text x="120" y="115" className="fill-red-400 font-bold text-base">O⁻</text>
    </g>

    {/* Resonance Double Arrow */}
    <g transform="translate(230, 120)">
      <line x1="-15" y1="0" x2="15" y2="0" stroke="#f59e0b" strokeWidth="4" />
      <polygon points="-15,0 -5,-7 -5,7" fill="#f59e0b" />
      <polygon points="15,0 5,-7 5,7" fill="#f59e0b" />
    </g>

    {/* Structure 2 */}
    <g transform="translate(280, 60)">
      <rect x="0" y="0" width="180" height="140" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <text x="90" y="25" textAnchor="middle" className="fill-slate-400 text-xs font-bold">Resonance Canonical II</text>
      {/* R - C(O⁻) = O */}
      <text x="35" y="80" className="fill-amber-400 font-bold text-base">R</text>
      <line x1="52" y1="75" x2="75" y2="75" stroke="#94a3b8" strokeWidth="3" />
      <text x="80" y="80" className="fill-blue-400 font-bold text-base">C</text>

      {/* Single bond to top O⁻ */}
      <line x1="90" y1="65" x2="115" y2="45" stroke="#ef4444" strokeWidth="3" />
      <text x="120" y="45" className="fill-red-400 font-bold text-base">O⁻</text>

      {/* Double bond to bottom O */}
      <line x1="88" y1="87" x2="110" y2="105" stroke="#ef4444" strokeWidth="3" />
      <line x1="94" y1="93" x2="116" y2="111" stroke="#ef4444" strokeWidth="3" />
      <text x="120" y="115" className="fill-red-400 font-bold text-base">O</text>
    </g>

    <text x="250" y="222" textAnchor="middle" className="fill-emerald-400 text-xs font-mono font-bold">
      Negative charge (-½) is equally delocalized over both electronegative Oxygen atoms
    </text>
  </svg>
);

// --- INTERACTIVE LAB CANVAS ANIMATION COMPONENT ---
interface CanvasSimProps {
  labType: string;
  reagent: string;
  substrate: string;
  progress: number;
  onProgressChange: (val: number) => void;
}

const InteractiveLabCanvas: React.FC<CanvasSimProps> = ({ labType, reagent, substrate, progress, onProgressChange }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localProgress = progress;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Grid
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Render based on labType
      if (labType === 'nucleophilic-addition') {
        // Draw Carbonyl Center
        const cx = 250;
        const cy = 130;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#3b82f6';

        // C atom
        ctx.fillStyle = '#1e3a8a';
        ctx.beginPath();
        ctx.arc(cx, cy, 28, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('C', cx, cy);

        // O atom
        const ox = cx + 80;
        const oy = cy;
        ctx.shadowColor = '#ef4444';
        ctx.fillStyle = '#881337';
        ctx.beginPath();
        ctx.arc(ox, oy, 26, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#f87171';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.fillText('O', ox, oy);

        // C=O Double Bond
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(cx + 28, cy - 6);
        ctx.lineTo(ox - 26, oy - 6);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx + 28, cy + 6);
        ctx.lineTo(ox - 26, oy + 6);
        ctx.stroke();

        // Nucleophile Approaching
        const nux = 80 + (localProgress / 100) * (cx - 120);
        const nuy = 60 + (localProgress / 100) * (cy - 70);

        ctx.shadowColor = '#10b981';
        ctx.fillStyle = '#065f46';
        ctx.beginPath();
        ctx.arc(nux, nuy, 24, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#a7f3d0';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillText(reagent || 'Nu⁻', nux, nuy);

        // Curved Attack Arrow
        if (localProgress > 10) {
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 3;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(nux + 20, nuy + 10);
          ctx.quadraticCurveTo((nux + cx) / 2, nuy - 20, cx - 20, cy - 10);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px Inter, sans-serif';
        ctx.fillText(`Substrate: ${substrate} | Reagent: ${reagent}`, 250, 220);
      } else if (labType === 'diagnostic-tests') {
        // Test Tube & Color change
        const tx = 250;
        const ty = 120;
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 4;
        ctx.strokeRect(tx - 35, ty - 70, 70, 130);

        let liquidColor = '#38bdf8';
        if (reagent.includes('Tollens') && localProgress > 50) liquidColor = '#94a3b8';
        if (reagent.includes('Fehling') && localProgress > 50) liquidColor = '#dc2626';
        if (reagent.includes('Iodoform') && localProgress > 50) liquidColor = '#facc15';

        ctx.fillStyle = liquidColor;
        ctx.globalAlpha = 0.7;
        ctx.fillRect(tx - 32, ty, 64, 58);
        ctx.globalAlpha = 1.0;

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${substrate}`, tx, ty - 85);
        ctx.fillText(`Test: ${reagent}`, tx, ty + 80);

        // Reaction bubbles
        if (isSimulating) {
          for (let i = 0; i < 5; i++) {
            const bx = tx - 20 + Math.random() * 40;
            const by = ty + 10 + Math.random() * 40;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(bx, by, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else {
        // General Reaction Dynamics
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 16px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`Reaction Simulation: ${substrate} + ${reagent}`, 250, 100);

        ctx.fillStyle = '#a7f3d0';
        ctx.font = '14px Inter, sans-serif';
        ctx.fillText(`Reaction Progress: ${Math.round(localProgress)}%`, 250, 140);

        // Progress Bar
        ctx.strokeStyle = '#334155';
        ctx.strokeRect(100, 160, 300, 20);
        ctx.fillStyle = '#10b981';
        ctx.fillRect(102, 162, (296 * localProgress) / 100, 16);
      }

      if (isSimulating && localProgress < 100) {
        localProgress = Math.min(100, localProgress + 0.8);
        onProgressChange(localProgress);
        animId = requestAnimationFrame(render);
      }
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [labType, reagent, substrate, progress, isSimulating, onProgressChange]);

  const toggleSim = () => {
    audioManager.play('tap');
    if (progress >= 100) {
      onProgressChange(0);
    }
    setIsSimulating(!isSimulating);
  };

  return (
    <div className="flex flex-col items-center gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
      <canvas ref={canvasRef} width={500} height={240} className="w-full max-w-[500px] h-auto rounded-lg shadow-inner" />
      <div className="flex items-center gap-4 w-full max-w-[500px]">
        <button
          onClick={toggleSim}
          className={`flex-1 py-2.5 px-6 rounded-xl font-bold transition-all shadow-lg ${
            isSimulating
              ? 'bg-amber-600 hover:bg-amber-500 text-white'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
          }`}
        >
          {isSimulating ? '⏸ Pause Reaction' : progress >= 100 ? '🔄 Restart Reaction' : '▶ Trigger Reaction Dynamics'}
        </button>
      </div>
    </div>
  );
};

// --- DEFAULT PROPS INTERFACE ---
interface Props {
  onComplete?: (score: number) => void;
}

// --- MAIN COMPONENT ---
export default function C12_ChemistryAldehydesKetonesandCarboxylicACBSESim({ onComplete }: Props) {
  // Tab State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Interactive Lab Controls
  const [selectedLabIndex, setSelectedLabIndex] = useState(0);
  const [selectedSubstrate, setSelectedSubstrate] = useState('Acetaldehyde');
  const [selectedReagent, setSelectedReagent] = useState('CN⁻ (HCN)');
  const [labProgress, setLabProgress] = useState(30);

  // Acidity Comparison Lab state
  const [selectedAcid, setSelectedAcid] = useState('Trichloroacetic acid');

  // Diagnostics / Prediction state
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [predAnswers, setPredAnswers] = useState<Record<number, number>>({});
  const [obsAnswers, setObsAnswers] = useState<Record<number, number>>({});

  // Mastery & BKT / SRS state
  const [bktState, setBktState] = useState<Record<string, BKTState>>(() => {
    const init: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((id) => {
      init[id] = createBKTState(id);
    });
    return init;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReviewItem>>(() => {
    const init: Record<string, ReviewItem> = {};
    ALL_NODE_IDS.forEach((id) => {
      init[id] = createReviewItem(id);
    });
    return init;
  });

  // Challenges state
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [challengeScore, setChallengeScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');

  // FX feedback
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  // Inactivity Timer for Hint
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!isAnswerSubmitted && activeTab === 'challenges') {
        const c = CHALLENGES[currentChallengeIndex];
        if (c && c.hints.length > 0) {
          setCurrentHint(c.hints[0]);
          setShowHint(true);
          audioManager.play('hint');
        }
      }
    }, 12000);
  }, [isAnswerSubmitted, activeTab, currentChallengeIndex]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetInactivityTimer, currentChallengeIndex]);

  // Speech greeting on mount
  useEffect(() => {
    speechManager.speak('Welcome to the Aldehydes, Ketones, and Carboxylic Acids Interactive Organic Synthesis Lab!');
  }, []);

  // Handle Discovery Selection
  const handleDiscoverySelect = (idx: number) => {
    setDiscoveryAnswer(idx);
    audioManager.play('tap');
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Excellent deduction! The phenyl ring donates electron density via resonance, diminishing electrophilicity.');
    } else {
      audioManager.play('error');
    }
  };

  // Handle Challenge Option Selection
  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
    audioManager.play('tap');
    resetInactivityTimer();
  };

  // Submit Challenge Answer
  const handleSubmitChallenge = () => {
    if (isAnswerSubmitted) return;
    const currentC = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;

    if (currentC.type === 'numeric') {
      const val = parseFloat(numericInput);
      if (!isNaN(val) && Math.abs(val - (currentC.correctAnswer as number)) < 0.5) {
        isCorrect = true;
      }
    } else if (selectedOption !== null) {
      if (selectedOption === currentC.correctIndex) {
        isCorrect = true;
      }
    }

    setIsAnswerSubmitted(true);

    // Update BKT & SRS
    const prevBkt = bktState[currentC.nodeId] || createBKTState(currentC.nodeId);
    const updatedBkt = bktUpdate(prevBkt, isCorrect);
    setBktState((prev) => ({ ...prev, [currentC.nodeId]: updatedBkt }));

    const prevSrs = srsItems[currentC.nodeId] || createReviewItem(currentC.nodeId);
    const updatedSrs = sm2Update(prevSrs, isCorrect ? 5 : 1);
    setSrsItems((prev) => ({ ...prev, [currentC.nodeId]: updatedSrs }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setShowSparkle(true);
      setChallengeScore((prev) => prev + 10);
      speechManager.speak('Correct analysis!');
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Incorrect. Review the mechanistic rationale.');
    }
  };

  // Next Challenge
  const handleNextChallenge = () => {
    audioManager.play('swoop');
    setIsAnswerSubmitted(false);
    setSelectedOption(null);
    setNumericInput('');
    setShowHint(false);

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      // Completed all challenges
      audioManager.play('celebration');
      setShowConfetti(true);
      setShowSuccess(true);
      const totalScore = Math.min(100, Math.round((challengeScore / (CHALLENGES.length * 10)) * 100));
      recordGameScore('C12_ChemistryAldehydesKetonesandCarboxylicACBSESim', totalScore);
      if (onComplete) onComplete(totalScore);
      speechManager.speak(`Congratulations! Lab series completed with a score of ${totalScore} percent.`);
    }
  };

  // Substrate / Reagent data lookup for Lab 4 Acidity
  const acidData: Record<string, { pKa: number; structure: string; effect: string }> = {
    'Trichloroacetic acid': { pKa: 0.65, structure: 'CCl₃COOH', effect: 'Strong -I effect of 3 Cl atoms stabilizes CCl₃COO⁻' },
    'Dichloroacetic acid': { pKa: 1.29, structure: 'CHCl₂COOH', effect: 'Moderate -I effect of 2 Cl atoms' },
    'Chloroacetic acid': { pKa: 2.86, structure: 'CH₂ClCOOH', effect: '-I effect of 1 Cl atom' },
    'Formic acid (Methanoic acid)': { pKa: 3.75, structure: 'HCOOH', effect: 'No alkyl +I effect, stronger than CH₃COOH' },
    'Benzoic acid': { pKa: 4.20, structure: 'C₆H₅COOH', effect: 'sp² aryl carbon electron-withdrawing relative to alkyl' },
    'Acetic acid (Ethanoic acid)': { pKa: 4.76, structure: 'CH₃COOH', effect: '+I hyperconjugation of methyl destabilizes anion' },
    'p-Nitrobenzoic acid': { pKa: 3.44, structure: 'O₂N-C₆H₄-COOH', effect: 'Strong -R and -I of -NO₂ group stabilizes anion' },
    'o-Nitrobenzoic acid': { pKa: 2.17, structure: 'O₂N-C₆H₄-COOH (ortho)', effect: 'Ortho Effect: Steric strain relief + strong -I/-R' },
    'p-Methoxybenzoic acid': { pKa: 4.47, structure: 'CH₃O-C₆H₄-COOH', effect: '+R electron donation of -OCH₃ destabilizes anion' }
  };

  const currentC = CHALLENGES[currentChallengeIndex];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center">
      {/* Header Banner */}
      <header className="w-full max-w-6xl mb-6 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 rounded-3xl border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-1">
            <span>ISC Class 12 Chemistry</span>
            <span>•</span>
            <span>Organic Reaction Mechanisms</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300">
            {SCENARIO.title}
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">{SCENARIO.intro}</p>
        </div>
        <div className="flex items-center gap-4 bg-slate-900/80 px-4 py-3 rounded-2xl border border-slate-700/60">
          <div className="text-center">
            <span className="text-xs text-slate-400 block font-medium">Lab Score</span>
            <span className="text-xl font-black text-cyan-400">{challengeScore} pts</span>
          </div>
          <div className="h-8 w-px bg-slate-700" />
          <div className="text-center">
            <span className="text-xs text-slate-400 block font-medium">Mastery</span>
            <span className="text-xl font-black text-emerald-400">
              {Math.round(
                (Object.values(bktState).reduce((acc, curr) => acc + masteryProb(curr), 0) /
                  ALL_NODE_IDS.length) *
                  100
              )}
              %
            </span>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <nav className="w-full max-w-6xl mb-6 flex flex-wrap gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 backdrop-blur-md">
        <button
          onClick={() => {
            setActiveTab('discovery');
            audioManager.play('tap');
          }}
          className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'discovery'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          🔍 1. Discovery Rationale
        </button>
        <button
          onClick={() => {
            setActiveTab('lab');
            audioManager.play('tap');
          }}
          className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'lab'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          🧪 2. Interactive Labs (5)
        </button>
        <button
          onClick={() => {
            setActiveTab('challenges');
            audioManager.play('tap');
          }}
          className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'challenges'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          🏆 3. Challenge Suite ({CHALLENGES.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('summary');
            audioManager.play('tap');
          }}
          className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'summary'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          📘 4. Real-World &amp; Summary
        </button>
      </nav>

      {/* TAB 1: DISCOVERY */}
      {activeTab === 'discovery' && (
        <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 bg-cyan-950 border border-cyan-500/40 text-cyan-300 rounded-full text-xs font-semibold mb-3">
                Preconception Check
              </div>
              <h2 className="text-xl font-bold text-white mb-3">{DISCOVERY_QUESTION.question}</h2>
              <p className="text-slate-400 text-sm mb-6">{SCENARIO.context}</p>

              <div className="space-y-3">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleDiscoverySelect(i)}
                    className={`w-full p-4 rounded-2xl text-left text-sm font-medium transition-all border ${
                      discoveryAnswer === i
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-800/60 border-slate-700/80 text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {discoveryAnswer !== null && (
              <div className="mt-6 p-4 rounded-2xl bg-slate-950 border border-cyan-500/30">
                <h4 className="text-cyan-300 text-xs font-bold uppercase tracking-wider mb-1">Mechanistic Rationale</h4>
                <p className="text-slate-300 text-sm">{DISCOVERY_QUESTION.hintAfter}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <CarbonylPolarityDiagram />

            {/* Render PREDICTION QUESTIONS section mandatory */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
              <h3 className="text-lg font-bold text-amber-300 mb-4">🔮 Lab Predictions</h3>
              <div className="space-y-4">
                {PREDICTION_QUESTIONS.map((pq, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <p className="text-sm font-semibold text-slate-200 mb-2">{pq.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {pq.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            setPredAnswers((prev) => ({ ...prev, [idx]: oIdx }));
                            audioManager.play('tap');
                          }}
                          className={`p-2.5 rounded-xl text-xs text-left transition-all border ${
                            predAnswers[idx] === oIdx
                              ? oIdx === pq.correctIndex
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                : 'bg-rose-950 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-2 italic">{pq.verifyInstruction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* TAB 2: INTERACTIVE LABS */}
      {activeTab === 'lab' && (
        <main className="w-full max-w-6xl flex flex-col gap-6">
          {/* Lab Selection Header */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800">
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedLabIndex(idx);
                  audioManager.play('tap');
                  speechManager.speak(step.title);
                }}
                className={`p-3 rounded-xl text-xs font-bold transition-all text-center ${
                  selectedLabIndex === idx
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white'
                }`}
              >
                Lab {idx + 1}
              </button>
            ))}
          </div>

          {/* Current Lab Details */}
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">
                  Interactive Experiment {selectedLabIndex + 1}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {EXPLORATION_STEPS[selectedLabIndex].title}
                </h3>
                <p className="text-slate-400 text-sm mt-2">
                  {EXPLORATION_STEPS[selectedLabIndex].instruction}
                </p>
              </div>

              {/* Lab Controls based on active lab */}
              {selectedLabIndex === 0 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Select Substrate</label>
                    <select
                      value={selectedSubstrate}
                      onChange={(e) => setSelectedSubstrate(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-bold p-2.5 rounded-xl"
                    >
                      <option value="Formaldehyde">Formaldehyde (HCHO)</option>
                      <option value="Acetaldehyde">Acetaldehyde (CH₃CHO)</option>
                      <option value="Acetone">Acetone (CH₃COCH₃)</option>
                      <option value="Benzaldehyde">Benzaldehyde (C₆H₅CHO)</option>
                      <option value="Acetophenone">Acetophenone (C₆H₅COCH₃)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Select Nucleophilic Reagent</label>
                    <select
                      value={selectedReagent}
                      onChange={(e) => setSelectedReagent(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-bold p-2.5 rounded-xl"
                    >
                      <option value="CN⁻ (HCN)">Hydrogen Cyanide (HCN / NaCN)</option>
                      <option value="NaHSO₃">Sodium Hydrogen Sulfite (NaHSO₃)</option>
                      <option value="CH₃MgBr">Grignard Reagent (CH₃MgBr)</option>
                      <option value="C₂H₅OH / HCl">Ethanol (Hemiacetal/Acetal)</option>
                      <option value="NH₂OH">Hydroxylamine (Oxime formation)</option>
                      <option value="2,4-DNP">2,4-Dinitrophenylhydrazine</option>
                    </select>
                  </div>
                </div>
              )}

              {selectedLabIndex === 1 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Select Chemical Substrate</label>
                    <select
                      value={selectedSubstrate}
                      onChange={(e) => setSelectedSubstrate(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-amber-300 text-xs font-bold p-2.5 rounded-xl"
                    >
                      <option value="Acetaldehyde">Acetaldehyde (Aliphatic Aldehyde)</option>
                      <option value="Formaldehyde">Formaldehyde (Aliphatic Aldehyde)</option>
                      <option value="Acetone">Acetone (Aliphatic Methyl Ketone)</option>
                      <option value="Benzaldehyde">Benzaldehyde (Aromatic Aldehyde)</option>
                      <option value="Acetophenone">Acetophenone (Aromatic Methyl Ketone)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Diagnostic Test Reagent</label>
                    <select
                      value={selectedReagent}
                      onChange={(e) => setSelectedReagent(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-amber-300 text-xs font-bold p-2.5 rounded-xl"
                    >
                      <option value="Tollens' Reagent">Tollens&apos; Reagent ([Ag(NH₃)₂]⁺) → Silver Mirror</option>
                      <option value="Fehling's Solution">Fehling&apos;s Solution (Cu²⁺ + Tartrate) → Red Cu₂O</option>
                      <option value="Iodoform Test (I₂/NaOH)">Iodoform Test (I₂/NaOH) → Yellow CHI₃</option>
                    </select>
                  </div>
                </div>
              )}

              {selectedLabIndex === 2 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                    <span className="font-bold text-cyan-300 block mb-1">Alpha-Hydrogen Rule:</span>
                    <p className="text-slate-300">
                      Aldehydes with α-H undergo <strong className="text-amber-300">Aldol Condensation</strong> in dilute NaOH. Aldehydes without α-H undergo <strong className="text-emerald-300">Cannizzaro Disproportionation</strong> in concentrated (50%) NaOH.
                    </p>
                  </div>
                </div>
              )}

              {selectedLabIndex === 3 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Select Organic Carboxylic Acid</label>
                  <select
                    value={selectedAcid}
                    onChange={(e) => setSelectedAcid(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-emerald-300 text-xs font-bold p-2.5 rounded-xl"
                  >
                    {Object.keys(acidData).map((acidKey) => (
                      <option key={acidKey} value={acidKey}>
                        {acidKey} (pKa = {acidData[acidKey].pKa})
                      </option>
                    ))}
                  </select>

                  <div className="p-4 bg-slate-900 rounded-xl border border-emerald-500/30 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Chemical Formula:</span>
                      <span className="text-emerald-300 font-mono font-bold">{acidData[selectedAcid].structure}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">pKa Value:</span>
                      <span className="text-emerald-400 font-bold">{acidData[selectedAcid].pKa}</span>
                    </div>
                    <div className="text-slate-300 pt-1 border-t border-slate-800">{acidData[selectedAcid].effect}</div>
                  </div>
                </div>
              )}

              {selectedLabIndex === 4 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <h4 className="text-xs font-bold text-amber-300 uppercase">Synthetic Route Pathway</h4>
                  <div className="p-3 bg-slate-900 rounded-xl text-xs space-y-1 font-mono text-slate-300">
                    <div>Step 1: Primary Alcohol ──PCC/CH₂Cl₂──→ Aldehyde</div>
                    <div>Step 2: Aldehyde ──KMnO₄/H⁺──→ Carboxylic Acid</div>
                    <div>Step 3: Carboxylic Acid ──Br₂/Red P then H₂O──→ α-Bromo Acid</div>
                  </div>
                </div>
              )}

              {/* OBSERVATION QUESTIONS rendered in Lab tab */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-cyan-300 uppercase mb-2">👁️ Lab Observations</h4>
                {OBSERVATION_QUESTIONS.map((oq, oqIdx) => (
                  <div key={oqIdx} className="mb-3">
                    <p className="text-xs text-slate-300 mb-1 font-semibold">{oq.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {oq.observableOptions.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => {
                            setObsAnswers((prev) => ({ ...prev, [oqIdx]: optIdx }));
                            audioManager.play('tap');
                          }}
                          className={`p-2 rounded-lg text-[11px] text-left border ${
                            obsAnswers[oqIdx] === optIdx
                              ? optIdx === oq.correctIndex
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                : 'bg-rose-950 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
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

            {/* Dynamic Visualizer / Canvas in Right Column */}
            <div className="flex flex-col gap-4">
              {selectedLabIndex === 1 && <TollensSilverMirrorDiagram progress={labProgress} />}
              {selectedLabIndex === 3 && <CarboxylateResonanceDiagram />}
              {selectedLabIndex !== 1 && selectedLabIndex !== 3 && (
                <InteractiveLabCanvas
                  labType={EXPLORATION_STEPS[selectedLabIndex].interactionType}
                  reagent={selectedReagent}
                  substrate={selectedSubstrate}
                  progress={labProgress}
                  onProgressChange={setLabProgress}
                />
              )}
            </div>
          </div>
        </main>
      )}

      {/* TAB 3: CHALLENGES */}
      {activeTab === 'challenges' && (
        <main className="w-full max-w-4xl flex flex-col gap-6">
          {/* Progress Indicator */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">
              Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
            </span>
            <div className="flex gap-1.5">
              {CHALLENGES.map((c, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < currentChallengeIndex
                      ? 'bg-emerald-500'
                      : i === currentChallengeIndex
                      ? 'bg-cyan-400 animate-pulse'
                      : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                currentC.difficulty === 'foundation'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                  : currentC.difficulty === 'standard'
                  ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                  : 'bg-rose-950 text-rose-300 border border-rose-500/30'
              }`}
            >
              {currentC.difficulty}
            </span>
          </div>

          {/* Question Box */}
          <div className="bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl relative">
            <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider mb-2">
              Competency: {currentC.competencyLevel}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-6 leading-relaxed">
              {currentC.question}
            </h3>

            {/* Answer Options */}
            {currentC.type === 'numeric' ? (
              <div className="space-y-4 mb-6">
                <label className="text-xs text-slate-400 block">Enter numerical result (g/mol):</label>
                <input
                  type="number"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  disabled={isAnswerSubmitted}
                  className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700 text-white font-mono text-lg focus:border-cyan-500 focus:outline-none"
                  placeholder="e.g. 16"
                />
              </div>
            ) : (
              <div className="space-y-3 mb-6">
                {currentC.options?.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(i)}
                    disabled={isAnswerSubmitted}
                    className={`w-full p-4 rounded-2xl text-left text-sm font-medium transition-all border ${
                      selectedOption === i
                        ? isAnswerSubmitted
                          ? i === currentC.correctIndex
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                            : 'bg-rose-950 border-rose-500 text-rose-200'
                          : 'bg-cyan-950 border-cyan-500 text-cyan-200'
                        : isAnswerSubmitted && i === currentC.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="font-bold mr-3 text-cyan-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Actions & Feedback */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  if (currentC.hints.length > 0) {
                    setCurrentHint(currentC.hints[0]);
                    setShowHint(true);
                    audioManager.play('hint');
                  }
                }}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
              >
                💡 Need a hint?
              </button>

              {!isAnswerSubmitted ? (
                <button
                  onClick={handleSubmitChallenge}
                  disabled={selectedOption === null && currentC.type !== 'numeric'}
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  Submit Analysis
                </button>
              ) : (
                <button
                  onClick={handleNextChallenge}
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Finish Lab Series 🎉'}
                </button>
              )}
            </div>

            {/* Explanation box after submission */}
            {isAnswerSubmitted && (
              <div className="mt-6 p-4 rounded-2xl bg-slate-950 border border-slate-800 animate-fadeIn">
                <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1">Detailed Explanation</h4>
                <p className="text-slate-300 text-sm">{currentC.explanation}</p>
              </div>
            )}
          </div>
        </main>
      )}

      {/* TAB 4: SUMMARY & REAL WORLD */}
      {activeTab === 'summary' && (
        <main className="w-full max-w-6xl flex flex-col gap-6">
          {/* REAL WORLD ACTIVITY rendered */}
          <section className="bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Industrial Chemistry Case Study</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">{REAL_WORLD_ACTIVITY.title}</h2>
            <p className="text-slate-300 text-sm mb-6 max-w-4xl">{REAL_WORLD_ACTIVITY.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-cyan-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* MISCONCEPTIONS ARRAY RENDERED */}
          <section className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
            <h3 className="text-lg font-bold text-rose-400 mb-4">⚠️ Common Conceptual Misconceptions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISCONCEPTIONS.map((m, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-rose-500/20">
                  <h4 className="text-xs font-bold text-rose-300 mb-1">❌ Misconception: &quot;{m.misconception}&quot;</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-emerald-400">Correct Fact: </strong>
                    {m.correction}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* FEEDBACK OVERLAYS */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="All Carbonyl &amp; Acid Challenges Completed!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
    </div>
  );
}