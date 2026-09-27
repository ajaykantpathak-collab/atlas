'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// --- NODE DEFINITIONS ---
const NODE_FC_ALKYLATION = 'c11_chem_091';
const NODE_FC_ACYLATION = 'c11_chem_092';
const ALL_NODE_IDS = [NODE_FC_ALKYLATION, NODE_FC_ACYLATION];

// --- SECTION 1: SCENARIO ---
const SCENARIO = {
  title: 'Organic Synthesis Laboratory: Electrophilic Aromatic Substitution',
  intro: 'Welcome to the Advanced Organic Synthesis Lab. As a lead medicinal chemist, you need to synthesize alkylated and acylated aromatic compounds used as precursors for essential pharmaceuticals, detergents, and perfumes.',
  context: 'You will investigate the mechanism of Friedel-Crafts alkylation and acylation reactions, observe Lewis acid catalysis with anhydrous AlCl3, analyze carbocation rearrangements (1,2-hydride shifts), and overcome polyalkylation to optimize chemical yields.',
};

// --- SECTION 2: DISCOVERY QUESTION ---
const DISCOVERY_QUESTION = {
  question: 'When 1-chloropropane reacts with benzene in the presence of anhydrous AlCl3, why is isopropylbenzene (cumene) obtained as the major product instead of 1-phenylpropane?',
  options: [
    'Benzene preferentially attacks secondary carbons due to steric hindrance.',
    'The primary carbocation intermediate undergoes a 1,2-hydride shift to form a more stable secondary carbocation.',
    'AlCl3 reacts with 1-chloropropane to form a free radical that rearranges in solution.',
    '1-phenylpropane breaks down rapidly into isopropylbenzene at room temperature.',
  ],
  correctIndex: 1,
  hintAfter: 'Primary carbocations (1°) formed initially undergo rapid rearrangement via a 1,2-hydride shift to form a thermodynamically lower energy 2° carbocation before attacking the aromatic ring.',
};

// --- DEFAULT PROPS ---
const DEFAULT_PROPS = {
  initialNodeId: NODE_FC_ALKYLATION,
};

// --- SECTION 3: EXPLORATION STEPS ---
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Catalyst & Electrophile Activation',
    instruction: 'Mix chloromethane (CH3Cl) with anhydrous AlCl3. Observe how the Lewis acid abstracts chloride ion to form the methyl cation (electrophile) and tetrachloroaluminate [AlCl4]-.',
    interactionType: 'catalyst-activation',
    nodeId: NODE_FC_ALKYLATION,
  },
  {
    title: 'Lab 2: Carbocation Rearrangement (1,2-Shift)',
    instruction: 'Select 1-chloropropane as the alkyl halide. Watch the initial 1° carbocation undergo a 1,2-hydride shift into a 2° isopropyl cation, generating isopropylbenzene as the major product.',
    interactionType: 'carbocation-rearrangement',
    nodeId: NODE_FC_ALKYLATION,
  },
  {
    title: 'Lab 3: Polyalkylation vs Benzene Excess',
    instruction: 'Adjust the ratio of Benzene to Alkyl Halide. Observe how ring activation by alkyl groups leads to polyalkylation, and see how a large excess of benzene minimizes unwanted side-products.',
    interactionType: 'polyalkylation-control',
    nodeId: NODE_FC_ALKYLATION,
  },
  {
    title: 'Lab 4: Friedel-Crafts Acylation & Acylium Ion',
    instruction: 'React acetyl chloride (CH3COCl) with benzene in the presence of AlCl3. Note the resonance-stabilized acylium ion [CH3-C≡O+] which does NOT undergo rearrangement or polyacylation.',
    interactionType: 'acylation-mechanism',
    nodeId: NODE_FC_ACYLATION,
  },
  {
    title: 'Lab 5: Stoichiometric Lewis Acid Requirement',
    instruction: 'Vary the amount of AlCl3 in acylation. Observe that more than 1 equivalent of AlCl3 is needed because the carbonyl oxygen of the ketone product forms a complex with AlCl3.',
    interactionType: 'stoichiometric-catalyst',
    nodeId: NODE_FC_ACYLATION,
  },
];

// --- SECTION 4: PREDICTION QUESTIONS ---
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What product is formed when 1-chloro-2-methylpropane (isobutyl chloride) reacts with benzene in the presence of anhydrous AlCl3?',
    options: [
      'Isobutylbenzene only',
      'tert-Butylbenzene as major product (via 1,2-hydride shift)',
      'sec-Butylbenzene as major product',
      'No reaction occurs because the halide is too bulky',
    ],
    correctIndex: 1,
    verifyInstruction: 'Select 1-chloro-2-methylpropane in Lab 2 and observe the hydride shift from 1° carbocation to tertiary carbocation.',
    nodeId: NODE_FC_ALKYLATION,
  },
  {
    question: 'Predict: Why does Friedel-Crafts acylation of benzene NOT yield polyacylated products even when excess acyl chloride is used?',
    options: [
      'Acyl groups are strongly activating and deactivate the catalyst.',
      'The acyl group (-COR) is electron-withdrawing (-I, -R), making the acylbenzene ring less reactive than benzene.',
      'Acyl chloride molecules dimerize and prevent further substitution.',
      'The acylium ion is too bulky to attack an substituted benzene ring.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Switch to Lab 4 and observe electron density depletion on the aromatic ring after mono-acylation.',
    nodeId: NODE_FC_ACYLATION,
  },
];

// --- SECTION 5: OBSERVATION QUESTIONS ---
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: In the carbocation rearrangement simulation, what structural change occurs during the 1,2-hydride shift?',
    observableOptions: [
      'A chloride ion migrates to the adjacent carbon.',
      'A hydrogen atom with its electron pair (hydride ion, H:-) shifts to the carbocation carbon to create a more stable cation.',
      'The benzene ring donates a proton to the primary alkyl halide.',
      'The carbon chain breaks apart into an alkene and a smaller cation.',
    ],
    correctIndex: 1,
    nodeId: NODE_FC_ALKYLATION,
  },
  {
    question: 'Observation: Why does anhydrous AlCl3 require aqueous acid workup during the final stage of Friedel-Crafts acylation?',
    observableOptions: [
      'To dissolve unreacted benzene in the water layer.',
      'To decompose the strong complex formed between AlCl3 and the carbonyl group of the ketone product.',
      'To oxidize the ketone into a carboxylic acid.',
      'To regenerate the AlCl3 catalyst for another reaction cycle.',
    ],
    correctIndex: 1,
    nodeId: NODE_FC_ACYLATION,
  },
];

// --- SECTION 6: REAL WORLD ACTIVITY ---
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Synthesis of Ibuprofen & Linear Alkylbenzene (LAB)',
  description: 'Friedel-Crafts reactions are vital industrial processes. Linear Alkylbenzene (LAB) is synthesized via FC alkylation to produce biodegradable detergents, while the anti-inflammatory drug Ibuprofen relies on FC acylation of isobutylbenzene followed by reduction.',
  steps: [
    'Step 1: Industrial alkylation of benzene with 1-dodecene using HF or AlCl3 catalyst yields linear alkylbenzene (LAB).',
    'Step 2: Acetylation of isobutylbenzene with acetyl chloride and AlCl3 produces 4-isobutylacetophenone with >95% yield.',
    'Step 3: Calculate stoichiometry: For 100 kg of isobutylbenzene (745 moles), at least 100 kg of anhydrous AlCl3 (750 moles, 1.01 equivalents) is required due to AlCl3-ketone complexation.',
    'Step 4: Hydrolytic workup with aqueous HCl hydrolyzes the complex to liberate free 4-isobutylacetophenone ketone and hydrated aluminum species.',
  ],
};

// --- MISCONCEPTIONS ---
const MISCONCEPTIONS = [
  {
    id: 'misc-1',
    misconception: 'Anhydrous AlCl3 acts in purely catalytic (<0.1 eq) quantities in both alkylation and acylation.',
    correction: 'In acylation, AlCl3 binds strongly to the ketone product oxygen atom. Thus, slightly more than 1 full equivalent (stoichiometric amount) of AlCl3 is consumed and must be washed away during hydrolytic workup.',
  },
  {
    id: 'misc-2',
    misconception: 'Alkylation of benzene with 1-chloropropane produces 1-phenylpropane as the sole or major product.',
    correction: 'The initial 1° propyl carbocation undergoes a rapid 1,2-hydride shift to form the more stable 2° isopropyl carbocation, making isopropylbenzene (cumene) the major product (~65-70%).',
  },
  {
    id: 'misc-3',
    misconception: 'Polyalkylation can be completely avoided simply by using exact 1:1 mole ratio of reactants.',
    correction: 'Because the alkyl group is electron-donating (+I), the alkylated product ring is more reactive than benzene. Excess benzene (e.g., 5:1 ratio) is essential to favor benzene collisions over monoalkylbenzene collisions.',
  },
  {
    id: 'misc-4',
    misconception: 'Acylium carbocations undergo carbocation rearrangements like alkyl carbocations.',
    correction: 'The acylium ion [R-C≡O+ ↔ R-C+=O] is resonance-stabilized with an octet on all atoms, making it highly stable against rearrangement. Acylation yields clean, unrearranged products.',
  },
  {
    id: 'misc-5',
    misconception: 'Aryl halides (like chlorobenzene) and vinyl halides readily undergo Friedel-Crafts alkylation.',
    correction: 'Aryl and vinyl carbocations are extremely unstable, and their C-X bonds have partial double bond character due to resonance, making them inert toward Friedel-Crafts reactions.',
  },
  {
    id: 'misc-6',
    misconception: 'Strongly deactivated rings (e.g., nitrobenzene, benzoic acid) undergo Friedel-Crafts reactions smoothly.',
    correction: 'Strongly deactivating groups (-NO2, -SO3H, -COOH, -COR) remove electron density from benzene, preventing attack by electrophiles. Furthermore, amino groups (-NH2) complex with Lewis acids to form strong deactivating salts.',
  },
];

// --- DIAGNOSTIC QUESTIONS ---
const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag-1',
    question: 'Which species acts as the electrophile in the Friedel-Crafts alkylation of benzene with CH3Cl and AlCl3?',
    options: ['Chloronium ion (Cl+)', 'Methyl carbocation (CH3+)', 'Tetrachloroaluminate [AlCl4]-', 'Benzonium cation'],
    correctIndex: 1,
    nodeId: NODE_FC_ALKYLATION,
  },
  {
    id: 'diag-2',
    question: 'What type of intermediate is formed when the electrophile attacks the aromatic benzene ring?',
    options: ['Free radical', 'Carbanion', 'Arenium ion (Sigma complex)', 'Benzyne intermediate'],
    correctIndex: 2,
    nodeId: NODE_FC_ALKYLATION,
  },
  {
    id: 'diag-3',
    question: 'Why does reaction of benzene with 1-chlorobutane give sec-butylbenzene as the major product?',
    options: ['1-chlorobutane undergoes 1,2-methyl shift', '1-chlorobutane undergoes 1,2-hydride shift to form 2° carbocation', 'Benzene ring opens and re-cyclizes', 'Steric hindrance forces 1-position substitution'],
    correctIndex: 1,
    nodeId: NODE_FC_ALKYLATION,
  },
  {
    id: 'diag-4',
    question: 'What is the role of anhydrous AlCl3 in Friedel-Crafts acylation?',
    options: ['Protinate benzene ring', 'Act as a Lewis acid to generate the acylium electrophile', 'Act as a reducing agent', 'Prevent side reactions'],
    correctIndex: 1,
    nodeId: NODE_FC_ACYLATION,
  },
  {
    id: 'diag-5',
    question: 'Which substituent on benzene would PREVENT Friedel-Crafts alkylation from taking place?',
    options: ['-CH3', '-OCH3', '-NO2', '-C2H5'],
    correctIndex: 2,
    nodeId: NODE_FC_ALKYLATION,
  },
  {
    id: 'diag-6',
    question: 'Why is polyacylation not observed during Friedel-Crafts acylation?',
    options: ['The product ketone is deactivating (-I and -R effect)', 'The acyl chloride is consumed instantaneously', 'Ketones react with AlCl3 to form insoluble precipitates that stop the reaction', 'Acylium ion destroys the catalyst'],
    correctIndex: 0,
    nodeId: NODE_FC_ACYLATION,
  },
  {
    id: 'diag-7',
    question: 'Which reaction sequence successfully synthesizes n-propylbenzene from benzene without rearrangement?',
    options: [
      'Benzene + 1-chloropropane + AlCl3',
      'Benzene + propanoyl chloride + AlCl3 followed by Zn(Hg)/HCl (Clemmensen reduction)',
      'Benzene + propene + H2SO4',
      'Benzene + 2-chloropropane + AlCl3',
    ],
    correctIndex: 1,
    nodeId: NODE_FC_ACYLATION,
  },
  {
    id: 'diag-8',
    question: 'Why fail nitrobenzene and aniline to undergo Friedel-Crafts alkylation?',
    options: [
      'Nitrobenzene is too deactivated; aniline forms a complex with AlCl3 turning into a strongly deactivating -NH2+-AlCl3- group.',
      'Both compounds are insoluble in organic solvents.',
      'They evaporate at reaction temperature.',
      'They decompose into toxic gases in presence of AlCl3.',
    ],
    correctIndex: 0,
    nodeId: NODE_FC_ACYLATION,
  },
];

// --- 22+ CHALLENGES (Foundation: 7, Standard: 8, Advanced: 7) ---
interface Challenge {
  id: string;
  nodeId: string;
  type: 'mcq' | 'numeric' | 'classification' | 'sequence';
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

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (7) ---
  {
    id: 'f-1',
    nodeId: NODE_FC_ALKYLATION,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What type of organic reaction is Friedel-Crafts alkylation?',
    options: [
      'Nucleophilic Aromatic Substitution',
      'Electrophilic Aromatic Substitution (EAS)',
      'Free Radical Addition',
      'Cycloaddition Reaction',
    ],
    correctIndex: 1,
    explanation: 'Friedel-Crafts alkylation is an Electrophilic Aromatic Substitution (EAS) where an electrophile (carbocation) replaces a hydrogen atom on an aromatic ring.',
    hints: ['Benzene is rich in pi-electrons and acts as a nucleophile.', 'The attacking species is electron-deficient (electophile).', 'It belongs to EAS reactions.'],
  },
  {
    id: 'f-2',
    nodeId: NODE_FC_ALKYLATION,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which of the following acts as the Lewis acid catalyst in Friedel-Crafts reactions?',
    options: ['NaOH', 'Anhydrous AlCl3', 'KMnO4', 'NaBH4'],
    correctIndex: 1,
    explanation: 'Anhydrous aluminum chloride (AlCl3) has an incomplete octet (electron deficient) and acts as a strong Lewis acid catalyst to generate electrophiles.',
    hints: ['Look for an electron-pair acceptor with an incomplete octet.', 'Aluminum has only 6 valence electrons in AlCl3.', 'It abstracts chloride from alkyl halides.'],
  },
  {
    id: 'f-3',
    nodeId: NODE_FC_ACYLATION,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the electrophile generated during the acylation of benzene with ethanoyl chloride (CH3COCl) and AlCl3?',
    options: ['Acetyl cation / Acylium ion [CH3-C≡O+]', 'Methyl cation [CH3+]', 'Chlorium ion [Cl+]', 'Acetate anion [CH3COO-]'],
    correctIndex: 0,
    explanation: 'AlCl3 abstracts chloride from CH3COCl, yielding the resonance-stabilized acylium cation [CH3-C=O+ ↔ CH3-C≡O+].',
    hints: ['The C-Cl bond breaks, taking both electrons with chloride.', 'The carbonyl carbon retains the positive charge.', 'This ion is resonance-stabilized.'],
  },
  {
    id: 'f-4',
    nodeId: NODE_FC_ALKYLATION,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Why must AlCl3 used in Friedel-Crafts reactions be strictly ANHYDROUS?',
    options: ['Water accelerates the reaction too much.', 'Water reacts vigorously with AlCl3 to form Al(OH)3 and HCl, destroying the Lewis acid catalyst.', 'Water turns benzene into phenol.', 'Water causes explosion with alkyl halides.'],
    correctIndex: 1,
    explanation: 'Moisture hydrolyzes AlCl3 into Al(OH)3 and HCl, deactivating the catalyst and preventing it from accepting lone pairs from halogen compounds.',
    hints: ['AlCl3 is very sensitive to water.', 'Hydrolysis occurs with moisture.', 'Hydrated AlCl3 cannot act as a Lewis acid catalyst.'],
  },
  {
    id: 'f-5',
    nodeId: NODE_FC_ACYLATION,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the primary organic product when benzene reacts with acetyl chloride in the presence of anhydrous AlCl3?',
    options: ['Toluene', 'Acetophenone (Methyl phenyl ketone)', 'Benzaldehyde', 'Chlorobenzene'],
    correctIndex: 1,
    explanation: 'Benzene + CH3COCl (with AlCl3) yields acetophenone (C6H5COCH3) + HCl.',
    hints: ['An acetyl group (-COCH3) attaches to the benzene ring.', 'The resulting compound is an aromatic ketone.', 'Its IUPAC/common name is Acetophenone.'],
  },
  {
    id: 'f-6',
    nodeId: NODE_FC_ALKYLATION,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'What is the hybridized state of the carbon atom under attack in the Arenium ion (sigma complex) intermediate?',
    options: ['sp', 'sp2', 'sp3', 'dsp2'],
    correctIndex: 2,
    explanation: 'In the sigma complex (arenium ion), the carbon where electrophile attached changes hybridization from planar sp2 to tetrahedral sp3, temporarily breaking aromaticity.',
    hints: ['The ring temporarily loses aromatic stability.', 'The carbon now forms four single bonds.', 'Four single bonds mean sp3 hybridization.'],
  },
  {
    id: 'f-7',
    nodeId: NODE_FC_ACYLATION,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which reagent can be used in place of an acyl halide for Friedel-Crafts acylation?',
    options: ['Acid anhydride (e.g., acetic anhydride)', 'Alkane', 'Alcohol', 'Ether'],
    correctIndex: 0,
    explanation: 'Acid anhydrides (e.g., (CH3CO)2O) react with benzene in the presence of AlCl3 to give ketones, acting as acylating agents.',
    hints: ['Look for another carboxylic acid derivative.', 'Anhydrides contain two acyl groups joined by an oxygen atom.', 'Acetic anhydride is commonly used.'],
  },

  // --- STANDARD (8) ---
  {
    id: 's-1',
    nodeId: NODE_FC_ALKYLATION,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'When 1-chloropropane reacts with benzene and anhydrous AlCl3, what is the major product obtained?',
    options: ['1-phenylpropane (n-propylbenzene)', '2-phenylpropane (isopropylbenzene / cumene)', '1,2-diphenylpropane', 'Chlorobenzene'],
    correctIndex: 1,
    explanation: 'The initial primary propyl cation (CH3-CH2-CH2+) undergoes a 1,2-hydride shift to form the more stable secondary isopropyl cation (CH3-CH+-CH3), giving isopropylbenzene as major product.',
    hints: ['Consider carbocation stability (2° > 1°).', 'A 1,2-hydride shift occurs rapidly.', 'Isopropyl cation attacks benzene to form cumene.'],
    misconceptionIndex: 1,
  },
  {
    id: 's-2',
    nodeId: NODE_FC_ALKYLATION,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Why does Friedel-Crafts alkylation of benzene often result in polyalkylation (multiple alkyl groups added to the ring)?',
    options: [
      'Alkyl groups are electron-withdrawing and make the ring more nucleophilic.',
      'Alkyl groups are electron-donating (+I effect), activating the aromatic ring so the product is more reactive than benzene.',
      'The AlCl3 catalyst decomposes after mono-alkylation.',
      'Alkyl halides react with each other to form long polymer chains.',
    ],
    correctIndex: 1,
    explanation: 'An alkyl group donates electron density into the ring (+I and hyperconjugation), making the mono-alkylated benzene more reactive towards electrophiles than benzene itself.',
    hints: ['Does an alkyl group activate or deactivate the benzene ring?', 'Activated rings react faster with electrophiles.', '+I effect increases pi-electron density.'],
    misconceptionIndex: 2,
  },
  {
    id: 's-3',
    nodeId: NODE_FC_ACYLATION,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why is polyacylation NOT observed during Friedel-Crafts acylation of benzene?',
    options: [
      'The acyl group (-COR) is strongly electron-withdrawing (-I and -R), deactivating the product ring against further electrophilic attack.',
      'Acylium ions react only once per reaction vessel.',
      'Acyl benzene is insoluble and precipitates immediately.',
      'Acyl groups sterically block all remaining positions on benzene.',
    ],
    correctIndex: 0,
    explanation: 'The acyl group (-CO-R) is electron-withdrawing due to carbonyl electronegativity and resonance (-R effect). This deactivates the product ring, preventing second acylation.',
    hints: ['Analyze the electronic effect of the carbonyl (C=O) group.', 'Is carbonyl electron-donating or electron-withdrawing?', 'Deactivated rings do not undergo further FC acylation.'],
    misconceptionIndex: 3,
  },
  {
    id: 's-4',
    nodeId: NODE_FC_ACYLATION,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'To prepare 120 g of Acetophenone (MW = 120 g/mol) from benzene and acetyl chloride, how many moles of anhydrous AlCl3 (at least 1.1 equivalents) are required?',
    correctAnswer: 1.1,
    tolerance: 0.05,
    explanation: '120 g acetophenone = 1.0 mole. Because 1 mole of product requires 1.1 moles of AlCl3 catalyst (due to complexation with carbonyl oxygen), exactly 1.1 moles of AlCl3 are required.',
    hints: ['Calculate moles of Acetophenone: 120 / 120 = 1.0 mol.', 'Multiply by the stoichiometry factor 1.1.', '1.0 * 1.1 = 1.1 mol.'],
    misconceptionIndex: 0,
  },
  {
    id: 's-5',
    nodeId: NODE_FC_ALKYLATION,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Which of the following compounds will NOT undergo Friedel-Crafts alkylation?',
    options: ['Toluene', 'Anisole', 'Nitrobenzene', 'Xylene'],
    correctIndex: 2,
    explanation: 'Nitrobenzene contains a strongly deactivating nitro group (-NO2) which drastically reduces electron density of the benzene ring, making it unreactive toward FC electrophiles.',
    hints: ['Identify which ring contains a strongly deactivating substituent.', '-NO2 is one of the strongest deactivating groups.', 'Deactivated rings fail to react in FC alkylation.'],
    misconceptionIndex: 5,
  },
  {
    id: 's-6',
    nodeId: NODE_FC_ALKYLATION,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'What is the major product when 1-chloro-2-methylpropane reacts with benzene in the presence of AlCl3?',
    options: ['isobutylbenzene', 'tert-butylbenzene', 'sec-butylbenzene', 'n-butylbenzene'],
    correctIndex: 1,
    explanation: 'The initial 1° isobutyl cation undergoes a 1,2-hydride shift to form the tertiary butyl carbocation (3°), leading to tert-butylbenzene as the major product.',
    hints: ['Initial carbocation: (CH3)2CH-CH2+ (1°).', 'A 1,2-hydride shift moves H from CH to CH2+.', 'Forms (CH3)3C+ (3°, very stable carbocation).'],
  },
  {
    id: 's-7',
    nodeId: NODE_FC_ACYLATION,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why can vinyl chloride (CH2=CH-Cl) or chlorobenzene NOT be used as alkylating agents in Friedel-Crafts alkylation?',
    options: [
      'They are liquids at room temperature.',
      'Vinyl and phenyl cations are extremely unstable, and C-Cl bonds have partial double-bond character due to resonance.',
      'They destroy the AlCl3 catalyst instantly.',
      'They form peroxides upon contact with air.',
    ],
    correctIndex: 1,
    explanation: 'Vinylic and aryl halides have partial double-bond character from resonance overlap, making C-Cl bond cleavage difficult. Additionally, vinylic/phenyl cations are extremely high in energy.',
    hints: ['Examine the bond strength of C(sp2)-Cl vs C(sp3)-Cl.', 'Resonance stabilization strengthens the C-Cl bond.', 'Vinyl/aryl carbocations are unstable.'],
    misconceptionIndex: 4,
  },
  {
    id: 's-8',
    nodeId: NODE_FC_ACYLATION,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'How can straight-chain n-propylbenzene be synthesized cleanly without any carbocation rearrangement?',
    options: [
      'React benzene with 1-chloropropane and AlCl3 at 0°C.',
      'React benzene with propanoyl chloride and AlCl3 to form propiophenone, followed by Clemmensen reduction [Zn(Hg)/HCl].',
      'React benzene with propene and H2SO4.',
      'React chlorobenzene with propane in the presence of Na.',
    ],
    correctIndex: 1,
    explanation: 'FC acylation with propanoyl chloride produces propiophenone without rearrangement (acylium ion does not rearrange). Clemmensen reduction (Zn(Hg)/HCl) then converts the >C=O to -CH2-, giving pure n-propylbenzene.',
    hints: ['Acylation avoids carbocation rearrangement.', 'First step: Acylation to form ethyl phenyl ketone (propiophenone).', 'Second step: Reduce >C=O to -CH2- using Clemmensen or Wolff-Kishner reduction.'],
  },

  // --- ADVANCED (7) ---
  {
    id: 'a-1',
    nodeId: NODE_FC_ALKYLATION,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'In a lab synthesis of mono-alkylated benzene, 5.0 moles of benzene are mixed with 1.0 mole of chloromethane and 0.2 moles of AlCl3. Assuming 90% conversion of chloromethane and 95% selectivity for mono-alkylation, calculate the yield of toluene in moles.',
    correctAnswer: 0.855,
    tolerance: 0.02,
    explanation: 'Moles of CH3Cl converted = 1.0 * 0.90 = 0.90 mol. Toluene yield = 0.90 * 0.95 = 0.855 mol.',
    hints: ['Calculate converted CH3Cl: 1.0 * 0.90 = 0.90 mol.', 'Multiply converted moles by selectivity: 0.90 * 0.95.', 'Result: 0.855 moles of toluene.'],
  },
  {
    id: 'a-2',
    nodeId: NODE_FC_ACYLATION,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Aniline (C6H5NH2) fails to undergo Friedel-Crafts alkylation or acylation. What is the fundamental chemical reason?',
    options: [
      'The amino group is strongly deactivating.',
      'The lone pair on nitrogen of aniline acts as a strong Lewis base and reacts with Lewis acid AlCl3 to form C6H5NH2+-AlCl3-, creating a strongly deactivating positively charged group.',
      'Aniline rapidly polymerizes in the presence of AlCl3.',
      'The NH2 group oxidizes to NO2 in the presence of AlCl3.',
    ],
    correctIndex: 1,
    explanation: 'Aniline has a lone pair on nitrogen (Lewis base) which coordinate strongly with AlCl3 (Lewis acid). The formed adduct -NH2+-AlCl3- is strongly electron-withdrawing (-I effect), deactivating the benzene ring toward electrophiles.',
    hints: ['Consider acid-base interaction between -NH2 (Lewis base) and AlCl3 (Lewis acid).', 'Nitrogen donates its lone pair to AlCl3.', 'The resulting positive charge on nitrogen deactivates the ring.'],
    misconceptionIndex: 5,
  },
  {
    id: 'a-3',
    nodeId: NODE_FC_ALKYLATION,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'Predict the major organic product formed when neopentyl chloride, (CH3)3CCH2Cl, reacts with benzene in the presence of AlCl3.',
    options: [
      'Neopentylbenzene',
      '2-methyl-2-phenylbutane (2-methylbutan-2-ylbenzene)',
      'tert-butylbenzene',
      '2,2-dimethyl-1-phenylpropane',
    ],
    correctIndex: 1,
    explanation: 'Initial 1° neopentyl cation undergoes a 1,2-methyl shift to form a 3° carbocation, (CH3)2C+-CH2CH3 (2-methylbutan-2-yl cation). Attack on benzene yields 2-methyl-2-phenylbutane.',
    hints: ['Neopentyl cation is 1°: (CH3)3C-CH2+.', 'Hydride shift is impossible (no H on adjacent C).', 'A 1,2-methyl shift occurs to form (CH3)2C+-CH2CH3 (3° cation).'],
  },
  {
    id: 'a-4',
    nodeId: NODE_FC_ACYLATION,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Intramolecular Friedel-Crafts acylation of 4-phenylbutanoic acid in the presence of polyphosphoric acid (PPA) or AlCl3 yields which cyclic ketone derivative?',
    options: ['Indanone (5-membered ring)', '1-Tetralone (6-membered ring fused to benzene)', 'Benzocycloheptanone', 'Anthracene'],
    correctIndex: 1,
    explanation: '4-phenylbutanoic acid has 4 carbons in the side chain. Acid treatment generates an acylium ion at the carboxylic carbon, which attacks the ortho position of the benzene ring to form 1-tetralone (fused 6-membered ring ketone).',
    hints: ['Count ring size formed: 6-membered ring fused to benzene.', '4 carbons in side chain + 2 benzene carbons in ring closure = 6-membered ring.', 'The product is 1-tetralone (alpha-tetralone).'],
  },
  {
    id: 'a-5',
    nodeId: NODE_FC_ALKYLATION,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Which of the following Lewis acids exhibits the correct decreasing order of catalytic activity in Friedel-Crafts alkylation?',
    options: [
      'AlCl3 > FeCl3 > BF3 > TiCl4 > ZnCl2',
      'ZnCl2 > BF3 > AlCl3 > FeCl3',
      'FeCl3 > ZnCl2 > AlCl3 > BF3',
      'BF3 > TiCl4 > AlCl3 > FeCl3',
    ],
    correctIndex: 0,
    explanation: 'The relative catalytic activity of Lewis acids in FC reactions depends on electron deficiency and bond strength: AlCl3 > FeCl3 > BF3 > TiCl4 > ZnCl2.',
    hints: ['AlCl3 is the most active classical Lewis acid.', 'ZnCl2 is a relatively weak Lewis acid.', 'Order starts with AlCl3 and ends with ZnCl2.'],
  },
  {
    id: 'a-6',
    nodeId: NODE_FC_ACYLATION,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'A chemist reacts 78 g of Benzene (MW = 78 g/mol) with excess Benzoyl Chloride (C6H5COCl) and 1.2 moles of AlCl3. Assuming 85% yield, calculate the mass of Benzophenone (C13H10O, MW = 182 g/mol) isolated in grams.',
    correctAnswer: 154.7,
    tolerance: 1.5,
    explanation: '78 g benzene = 1.0 mole. Theoretical yield of Benzophenone = 1.0 mol * 182 g/mol = 182 g. Actual yield at 85% = 182 * 0.85 = 154.7 g.',
    hints: ['Calculate moles of benzene: 78 / 78 = 1.0 mol.', 'Theoretical yield = 1.0 * 182 = 182 g.', 'Actual yield = 182 * 0.85 = 154.7 g.'],
  },
  {
    id: 'a-7',
    nodeId: NODE_FC_ALKYLATION,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'In the reaction of benzene with 2-butene in the presence of HF catalyst, what is the structure of the resulting product?',
    options: ['n-butylbenzene', 'sec-butylbenzene', 'tert-butylbenzene', 'isobutylbenzene'],
    correctIndex: 1,
    explanation: 'Protonation of 2-butene by HF acid generates the sec-butyl carbocation (CH3-CH+-CH2-CH3), which attacks benzene to form sec-butylbenzene (2-phenylbutane).',
    hints: ['Protonate 2-butene: CH3-CH=CH-CH3 + H+ -> CH3-CH+-CH2-CH3.', 'Electrophile is sec-butyl cation.', 'Attacks benzene to yield sec-butylbenzene.'],
  },
];

// --- SVG DIAGRAM COMPONENTS ---

// Diagram 1: Mechanism of Alkylation & Carbocation Rearrangement
const RearrangementMechanismSVG: React.FC<{ activeStep: number }> = ({ activeStep }) => {
  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-cyan-500/30 shadow-lg">
      <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
        Friedel-Crafts Alkylation & 1,2-Hydride Shift Mechanism
      </div>
      <svg viewBox="0 0 800 240" className="w-full h-auto">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
          </marker>
          <marker id="red-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
          </marker>
        </defs>

        {/* Step 1: Complexation */}
        <g opacity={activeStep === 0 || activeStep === 1 ? 1 : 0.4} className="transition-opacity duration-300">
          <rect x="10" y="20" width="230" height="190" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
          <text x="25" y="45" fill="#38bdf8" fontSize="13" fontStyle="italic" fontWeight="bold">Step 1: Catalyst Activation</text>

          {/* CH3-CH2-CH2-Cl */}
          <text x="30" y="90" fill="#f8fafc" fontSize="13" fontFamily="monospace">CH3-CH2-CH2-Cl</text>
          <text x="145" y="90" fill="#f43f5e" fontSize="13" fontWeight="bold">+</text>
          <text x="160" y="90" fill="#e2e8f0" fontSize="13" fontFamily="monospace">AlCl3</text>

          <path d="M 120 100 Q 140 120 160 100" fill="none" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#red-arrow)" />
          <text x="110" y="135" fill="#f43f5e" fontSize="10">lone pair attack</text>

          <text x="30" y="175" fill="#38bdf8" fontSize="12" fontFamily="monospace">[CH3-CH2-CH2+] + [AlCl4]-</text>
          <text x="30" y="195" fill="#94a3b8" fontSize="11">1° propyl cation (Unstable)</text>
        </g>

        {/* Step 2: Hydride Shift */}
        <g opacity={activeStep === 1 || activeStep === 2 ? 1 : 0.4} className="transition-opacity duration-300">
          <rect x="255" y="20" width="270" height="190" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
          <text x="270" y="45" fill="#38bdf8" fontSize="13" fontStyle="italic" fontWeight="bold">Step 2: 1,2-Hydride Shift</text>

          {/* Carbocation structure */}
          <text x="280" y="90" fill="#f8fafc" fontSize="13" fontFamily="monospace">CH3 - CH - CH2</text>
          <text x="342" y="75" fill="#f43f5e" fontSize="11" fontWeight="bold">H</text>
          <text x="390" y="75" fill="#38bdf8" fontSize="12" fontWeight="bold">+</text>

          {/* Curved arrow for hydride shift */}
          <path d="M 345 80 Q 370 60 392 82" fill="none" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#red-arrow)" />
          <text x="330" y="125" fill="#f43f5e" fontSize="10" fontWeight="bold">1,2-H: Shift</text>

          <text x="280" y="165" fill="#4ade80" fontSize="13" fontFamily="monospace">CH3 - CH(+) - CH3</text>
          <text x="280" y="190" fill="#4ade80" fontSize="11" fontWeight="bold">2° Isopropyl cation (More Stable!)</text>
        </g>

        {/* Step 3: Electrophilic Attack */}
        <g opacity={activeStep >= 2 ? 1 : 0.4} className="transition-opacity duration-300">
          <rect x="540" y="20" width="250" height="190" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
          <text x="555" y="45" fill="#38bdf8" fontSize="13" fontStyle="italic" fontWeight="bold">Step 3: Ring Attack & Product</text>

          {/* Benzene Ring SVG */}
          <polygon points="580,100 600,85 620,100 620,125 600,140 580,125" fill="none" stroke="#f8fafc" strokeWidth="2" />
          <circle cx="600" cy="112.5" r="12" fill="none" stroke="#f8fafc" strokeWidth="1.5" strokeDasharray="3,3" />

          <text x="635" y="115" fill="#f43f5e" fontSize="14">+</text>
          <text x="650" y="115" fill="#4ade80" fontSize="12" fontFamily="monospace">CH(CH3)2</text>

          <line x1="685" y1="112" x2="710" y2="112" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

          {/* Cumene product */}
          <polygon points="740,130 755,118 770,130 770,150 755,162 740,150" fill="none" stroke="#4ade80" strokeWidth="2" />
          <circle cx="755" cy="140" r="10" fill="none" stroke="#4ade80" strokeWidth="1.5" />
          <line x1="755" y1="118" x2="755" y2="95" stroke="#4ade80" strokeWidth="2" />
          <text x="730" y="90" fill="#4ade80" fontSize="11" fontFamily="monospace">CH(CH3)2</text>
          <text x="725" y="185" fill="#4ade80" fontSize="11" fontWeight="bold">Cumene (Major)</text>
        </g>
      </svg>
    </div>
  );
};

// Diagram 2: Acylation Mechanism & Acylium Resonance
const AcylationResonanceSVG: React.FC<{ activeStep: number }> = ({ activeStep }) => {
  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-indigo-500/30 shadow-lg">
      <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
        Friedel-Crafts Acylation & Resonance Stabilized Acylium Ion
      </div>
      <svg viewBox="0 0 800 220" className="w-full h-auto">
        {/* Acylium Ion Resonance */}
        <g>
          <rect x="10" y="20" width="370" height="180" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="1" />
          <text x="25" y="45" fill="#818cf8" fontSize="13" fontStyle="italic" fontWeight="bold">Acylium Ion Resonance Stability</text>

          {/* Form 1 */}
          <text x="35" y="100" fill="#f8fafc" fontSize="14" fontFamily="monospace">R - C = O:</text>
          <text x="75" y="85" fill="#f43f5e" fontSize="12" fontWeight="bold">+</text>

          {/* Equilibrium arrow */}
          <path d="M 140 95 L 180 95 M 180 95 L 170 90 M 140 95 L 150 100" stroke="#818cf8" strokeWidth="2" fill="none" />
          <path d="M 180 102 L 140 102 M 140 102 L 150 107 M 180 102 L 170 97" stroke="#818cf8" strokeWidth="2" fill="none" />

          {/* Form 2 */}
          <text x="200" y="100" fill="#4ade80" fontSize="14" fontFamily="monospace">R - C ≡ O: </text>
          <text x="272" y="85" fill="#4ade80" fontSize="12" fontWeight="bold">+</text>

          <text x="35" y="145" fill="#38bdf8" fontSize="11">• Octet rule satisfied on both C & O in resonance form 2</text>
          <text x="35" y="165" fill="#38bdf8" fontSize="11">• NO Carbocation Rearrangement occurs!</text>
          <text x="35" y="185" fill="#38bdf8" fontSize="11">• NO Polyacylation (Product ketone is deactivating)</text>
        </g>

        {/* AlCl3 Complexation with Ketone */}
        <g>
          <rect x="400" y="20" width="390" height="180" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="1" />
          <text x="415" y="45" fill="#818cf8" fontSize="13" fontStyle="italic" fontWeight="bold">Stoichiometric Catalyst Requirement</text>

          {/* Ketone + AlCl3 complex */}
          <text x="425" y="95" fill="#f8fafc" fontSize="13" fontFamily="monospace">Ar - C(=O) - R  +  AlCl3</text>
          <line x1="590" y1="90" x2="620" y2="90" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#red-arrow)" />

          <text x="630" y="95" fill="#f43f5e" fontSize="13" fontFamily="monospace">Ar - C(=O:→AlCl3) - R</text>
          <text x="630" y="120" fill="#f43f5e" fontSize="11" fontWeight="bold">(Strong Lewis Acid-Base Complex)</text>

          <rect x="425" y="135" width="345" height="50" rx="4" fill="#0f172a" stroke="#f43f5e" strokeWidth="1" />
          <text x="435" y="155" fill="#fbbf24" fontSize="11" fontWeight="bold">Requires &gt; 1 equivalent of AlCl3!</text>
          <text x="435" y="172" fill="#94a3b8" fontSize="10">Must be hydrolysed with H2O / aqueous HCl to release free ketone.</text>
        </g>
      </svg>
    </div>
  );
};

// Diagram 3: Energy Profile Canvas / Interactive Reaction Coordinate SVG
const ReactionEnergyProfileSVG: React.FC<{ reactionType: 'alkylation' | 'acylation'; hasRearrangement: boolean }> = ({ reactionType, hasRearrangement }) => {
  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-emerald-500/30 shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          Reaction Coordinate Energy Profile ({reactionType === 'alkylation' ? 'Alkylation' : 'Acylation'})
        </span>
        <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          {hasRearrangement ? 'Two-Step Barrier (Hydride Shift)' : 'Standard EAS Path'}
        </span>
      </div>
      <svg viewBox="0 0 700 220" className="w-full h-auto">
        {/* Axes */}
        <line x1="50" y1="180" x2="660" y2="180" stroke="#64748b" strokeWidth="2" />
        <line x1="50" y1="180" x2="50" y2="20" stroke="#64748b" strokeWidth="2" />
        <text x="340" y="210" fill="#94a3b8" fontSize="11">Reaction Coordinate</text>
        <text x="15" y="100" fill="#94a3b8" fontSize="11" transform="rotate(-90 20 100)">Potential Energy</text>

        {/* Reactant level */}
        <line x1="50" y1="150" x2="100" y2="150" stroke="#38bdf8" strokeWidth="3" />
        <text x="50" y="140" fill="#38bdf8" fontSize="11" fontWeight="bold">Reactants</text>

        {reactionType === 'alkylation' && hasRearrangement ? (
          <>
            {/* Path with rearrangement: Peak 1 (1° carbocation), Valley (2° carbocation), Peak 2 (Arenium ion), Product */}
            <path d="M 100 150 C 130 50, 160 50, 190 120 C 210 125, 230 115, 260 60 C 310 60, 450 160, 550 160 L 620 160" fill="none" stroke="#f43f5e" strokeWidth="3" />

            {/* Transition states */}
            <circle cx="145" cy="55" r="4" fill="#f43f5e" />
            <text x="110" y="45" fill="#f43f5e" fontSize="10">TS1 (1° C+)</text>

            <circle cx="190" cy="120" r="4" fill="#fbbf24" />
            <text x="175" y="140" fill="#fbbf24" fontSize="10">2° C+ (Intermediate)</text>

            <circle cx="260" cy="60" r="4" fill="#a855f7" />
            <text x="250" y="45" fill="#a855f7" fontSize="10">TS2 (Sigma Complex)</text>

            {/* Product level */}
            <line x1="550" y1="160" x2="630" y2="160" stroke="#4ade80" strokeWidth="3" />
            <text x="550" y="150" fill="#4ade80" fontSize="11" fontWeight="bold">Cumene (Exothermic)</text>
          </>
        ) : reactionType === 'alkylation' ? (
          <>
            {/* Single peak path */}
            <path d="M 100 150 C 180 40, 300 40, 380 120 C 420 130, 480 160, 620 160" fill="none" stroke="#38bdf8" strokeWidth="3" />
            <circle cx="240" cy="55" r="4" fill="#38bdf8" />
            <text x="210" y="45" fill="#38bdf8" fontSize="10">Sigma Complex TS</text>

            <line x1="550" y1="160" x2="630" y2="160" stroke="#4ade80" strokeWidth="3" />
            <text x="540" y="150" fill="#4ade80" fontSize="11" fontWeight="bold">Alkylbenzene</text>
          </>
        ) : (
          <>
            {/* Acylation path */}
            <path d="M 100 150 C 180 60, 260 60, 320 110 C 370 110, 420 70, 480 70 C 530 160, 580 170, 630 170" fill="none" stroke="#818cf8" strokeWidth="3" />
            <circle cx="220" cy="70" r="4" fill="#818cf8" />
            <text x="170" y="55" fill="#818cf8" fontSize="10">Acylium Generation</text>

            <circle cx="450" cy="70" r="4" fill="#a855f7" />
            <text x="430" y="55" fill="#a855f7" fontSize="10">Arenium Complex</text>

            <line x1="550" y1="170" x2="630" y2="170" stroke="#4ade80" strokeWidth="3" />
            <text x="540" y="160" fill="#4ade80" fontSize="11" fontWeight="bold">Ketone Product</text>
          </>
        )}
      </svg>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function C11_ChemistryFriedelCraftsalkylationandacylationSim({
  initialNodeId = NODE_FC_ALKYLATION,
  onComplete,
}: {
  initialNodeId?: string;
  onComplete?: (score: number) => void;
}) {
  // Navigation & Tabs
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [activeNodeId, setActiveNodeId] = useState<string>(initialNodeId);

  // Discovery State
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [showDiscoveryHint, setShowDiscoveryHint] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [predictionSubmitted, setPredictionSubmitted] = useState<Record<number, boolean>>({});

  // Lab Interactive Controls
  const [selectedSubstrate, setSelectedSubstrate] = useState<'benzene' | 'toluene' | 'nitrobenzene'>('benzene');
  const [selectedElectrophile, setSelectedElectrophile] = useState<'CH3Cl' | 'CH3CH2CH2Cl' | 'CH3COCl' | '(CH3CO)2O'>('CH3CH2CH2Cl');
  const [catalystRatio, setCatalystRatio] = useState<number>(0.2); // eq of AlCl3
  const [benzeneRatio, setBenzeneRatio] = useState<number>(1.0); // eq relative to halide
  const [temperature, setTemperature] = useState<number>(25); // °C
  const [reactionProgress, setReactionProgress] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [selectedExplorationStep, setSelectedExplorationStep] = useState<number>(0);

  // Observation State
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});
  const [observationSubmitted, setObservationSubmitted] = useState<Record<number, boolean>>({});

  // Challenge Engine State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [challengeCompleted, setChallengeCompleted] = useState<boolean[]>(new Array(CHALLENGES.length).fill(false));
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintText, setCurrentHintText] = useState<string>('');

  // Gamification & Pedagogical State
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // BKT & SRS Stores
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => ({
    [NODE_FC_ALKYLATION]: createBKTState(),
    [NODE_FC_ACYLATION]: createBKTState(),
  }));

  const [srsItems, setSrsItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => ({
    [NODE_FC_ALKYLATION]: createReviewItem(NODE_FC_ALKYLATION),
    [NODE_FC_ACYLATION]: createReviewItem(NODE_FC_ACYLATION),
  }));

  // Auto-hint Timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && !challengeCompleted[currentChallengeIndex]) {
        const hintMsg = CHALLENGES[currentChallengeIndex].hints[0];
        setCurrentHintText(hintMsg);
        setShowHint(true);
        audioManager.play('hint');
        speechManager.speak('Here is a hint for this challenge.');
      }
    }, 10000); // 10s idle
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, activeTab]);

  // Simulation step timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isSimulating) {
      interval = setInterval(() => {
        setReactionProgress((prev) => {
          if (prev >= 100) {
            setIsSimulating(false);
            audioManager.play('celebration');
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulating]);

  // Reaction Calculations
  const calculatedYields = useMemo(() => {
    const isAcylation = selectedElectrophile === 'CH3COCl' || selectedElectrophile === '(CH3CO)2O';
    const isPropyl = selectedElectrophile === 'CH3CH2CH2Cl';

    if (selectedSubstrate === 'nitrobenzene') {
      return {
        majorProduct: 'No Reaction (Deactivated Ring)',
        majorYield: 0,
        minorProduct: 'Unreacted Starting Material',
        minorYield: 100,
        polyYield: 0,
        status: 'Deactivated ring prevents electrophilic attack!',
      };
    }

    if (isAcylation) {
      const catalystDeficit = catalystRatio < 1.0;
      const effYield = catalystDeficit ? Math.round((catalystRatio / 1.0) * 85) : 92;
      return {
        majorProduct: selectedElectrophile === 'CH3COCl' ? 'Acetophenone' : 'Acetophenone',
        majorYield: effYield,
        minorProduct: 'Side Polymer / Complex',
        minorYield: 100 - effYield,
        polyYield: 0, // No polyacylation
        status: catalystDeficit
          ? `AlCl3 deficit (<1.0 eq)! Ketone complexes ${Math.round(catalystRatio * 100)}% of AlCl3.`
          : 'Clean mono-acylation achieved. No polyacylation.',
      };
    }

    // Alkylation
    if (isPropyl) {
      const isExcessBenzene = benzeneRatio >= 3.0;
      const majorY = 68; // Cumene (rearranged)
      const minorY = 22; // 1-phenylpropane
      const polyY = isExcessBenzene ? 5 : 30; // High polyalkylation if benzene is 1:1
      return {
        majorProduct: 'Isopropylbenzene (Cumene via 1,2-H shift)',
        majorYield: isExcessBenzene ? majorY : Math.round(majorY * 0.7),
        minorProduct: '1-Phenylpropane (Unrearranged)',
        minorYield: isExcessBenzene ? minorY : Math.round(minorY * 0.7),
        polyYield: polyY,
        status: isExcessBenzene
          ? 'High excess benzene prevents polyalkylation! 2° carbocation gives Cumene as major product.'
          : 'Low benzene ratio causes high polyalkylation side products!',
      };
    }

    // Methylation (CH3Cl)
    const isExcessBenzene = benzeneRatio >= 3.0;
    return {
      majorProduct: 'Toluene',
      majorYield: isExcessBenzene ? 85 : 45,
      minorProduct: 'Unreacted Benzene',
      minorYield: isExcessBenzene ? 10 : 15,
      polyYield: isExcessBenzene ? 5 : 40,
      status: isExcessBenzene
        ? 'Excess benzene suppresses polyalkylation to Xylenes.'
        : 'Ring activation by -CH3 group causes severe polyalkylation (Xylenes & Mesitylene)!',
    };
  }, [selectedSubstrate, selectedElectrophile, catalystRatio, benzeneRatio]);

  // Handle Discovery Selection
  const handleDiscoverySelect = (idx: number) => {
    setDiscoveryAnswer(idx);
    setShowDiscoveryHint(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Spot on! Carbocation rearrangement leads to isopropylbenzene as the major product.');
    } else {
      audioManager.play('error');
    }
  };

  // Handle Prediction
  const handlePredictionSelect = (qIdx: number, optIdx: number) => {
    setPredictionAnswers({ ...predictionAnswers, [qIdx]: optIdx });
    setPredictionSubmitted({ ...predictionSubmitted, [qIdx]: true });
    if (optIdx === PREDICTION_QUESTIONS[qIdx].correctIndex) {
      audioManager.play('sparkle');
      speechManager.speak('Correct prediction! Let us verify it in the lab simulation.');
    } else {
      audioManager.play('error');
    }
  };

  // Handle Observation
  const handleObservationSelect = (qIdx: number, optIdx: number) => {
    setObservationAnswers({ ...observationAnswers, [qIdx]: optIdx });
    setObservationSubmitted({ ...observationSubmitted, [qIdx]: true });
    if (optIdx === OBSERVATION_QUESTIONS[qIdx].correctIndex) {
      audioManager.play('chime');
    } else {
      audioManager.play('error');
    }
  };

  // Handle Challenge Answer
  const handleChallengeSubmit = () => {
    resetInactivityTimer();
    const currentC = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;

    if (currentC.type === 'numeric') {
      const val = parseFloat(numericInput);
      if (!isNaN(val) && currentC.correctAnswer !== undefined) {
        const tol = currentC.tolerance || 0.01;
        isCorrect = Math.abs(val - currentC.correctAnswer) <= tol;
      }
    } else {
      isCorrect = selectedOption === currentC.correctIndex;
    }

    // BKT & SRS Update
    const targetNode = currentC.nodeId;
    const oldBkt = bktStates[targetNode] || createBKTState();
    const newBkt = bktUpdate(oldBkt, isCorrect);
    setBktStates({ ...bktStates, [targetNode]: newBkt });

    const oldSrs = srsItems[targetNode] || createReviewItem(targetNode);
    const newSrs = sm2Update(oldSrs, isCorrect ? 4 : 1);
    setSrsItems({ ...srsItems, [targetNode]: newSrs });

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('pop');
      speechManager.speak('Excellent job! You mastered this concept.');
      setScore((prev) => prev + (currentC.difficulty === 'advanced' ? 30 : currentC.difficulty === 'standard' ? 20 : 10));
      setStreak((prev) => prev + 1);
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1500);

      const updatedCompleted = [...challengeCompleted];
      updatedCompleted[currentChallengeIndex] = true;
      setChallengeCompleted(updatedCompleted);

      setChallengeFeedback({ isCorrect: true, message: currentC.explanation });

      // Check overall completion
      if (updatedCompleted.every((c) => c)) {
        setShowConfetti(true);
        setShowSuccessBanner(true);
        audioManager.play('celebration');
        speechManager.speak('Congratulations! You have completed all Friedel-Crafts challenges!');
        recordGameScore('c11_chem_fc_reactions', score + 50);
        if (onComplete) onComplete(score + 50);
      }
    } else {
      audioManager.play('drop-wrong');
      setStreak(0);
      setChallengeFeedback({
        isCorrect: false,
        message: `Incorrect. ${currentC.explanation}`,
      });
      if (currentC.misconceptionIndex !== undefined) {
        const misc = MISCONCEPTIONS[currentC.misconceptionIndex];
        if (misc) {
          setCurrentHintText(`Common misconception: ${misc.misconception} Correct understanding: ${misc.correction}`);
          setShowHint(true);
        }
      }
    }
  };

  const handleNextChallenge = () => {
    setChallengeFeedback(null);
    setSelectedOption(null);
    setNumericInput('');
    setShowHint(false);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    }
  };

  const handleStartSim = () => {
    setReactionProgress(0);
    setIsSimulating(true);
    audioManager.play('whoosh');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* HEADER BAR */}
      <header className="max-w-7xl mx-auto mb-6 bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              ISC Class 11 Chemistry
            </span>
            <span className="text-xs font-mono text-slate-400">c11_chem_091 | c11_chem_092</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent mt-1">
            Friedel-Crafts Alkylation & Acylation
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            {SCENARIO.intro}
          </p>
        </div>

        {/* Score & Mastery Badges */}
        <div className="flex items-center gap-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <div className="text-center px-3">
            <div className="text-xs text-slate-400 uppercase font-semibold">Lab Score</div>
            <div className="text-xl font-black text-amber-400">{score}</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center px-3">
            <div className="text-xs text-slate-400 uppercase font-semibold">Streak</div>
            <div className="text-xl font-black text-emerald-400">{streak} 🔥</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center px-3">
            <div className="text-xs text-slate-400 uppercase font-semibold">Mastery</div>
            <div className="text-xs font-bold text-cyan-400 mt-1">
              Alkylation: {Math.round(masteryProb(bktStates[NODE_FC_ALKYLATION]) * 100)}%
              <br />
              Acylation: {Math.round(masteryProb(bktStates[NODE_FC_ACYLATION]) * 100)}%
            </div>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="max-w-7xl mx-auto mb-6 flex space-x-2 bg-slate-900/50 p-1.5 rounded-xl border border-slate-800">
        {[
          { id: 'discovery', label: '1. Discovery & Concept' },
          { id: 'lab', label: '2. Interactive Lab' },
          { id: 'challenges', label: `3. Practice Challenges (${CHALLENGES.length})` },
          { id: 'summary', label: '4. Summary & Real-World' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as typeof activeTab);
              audioManager.play('tap');
            }}
            className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-xs md:text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-slate-950 shadow-lg font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto">
        {/* --- TAB 1: DISCOVERY & CONCEPT --- */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* Context Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-cyan-400 mb-2">Scenario Context</h2>
              <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.context}</p>
            </div>

            {/* Discovery Question Card */}
            <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300">
                  Discovery Question
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySelect(idx)}
                    className={`p-4 rounded-xl text-left text-sm transition-all duration-200 border ${
                      discoveryAnswer === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/60 border-rose-500 text-rose-200'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </button>
                ))}
              </div>

              {showDiscoveryHint && (
                <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-cyan-500/40 text-sm text-cyan-200">
                  <div className="font-bold text-cyan-400 mb-1">💡 Key Chemical Insight:</div>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* Custom SVG Diagrams */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RearrangementMechanismSVG activeStep={selectedExplorationStep} />
              <AcylationResonanceSVG activeStep={selectedExplorationStep} />
            </div>

            {/* PREDICTION QUESTIONS SECTION (MANDATORY RENDER) */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                <span>🔮</span> Laboratory Prediction Questions
              </h3>
              <div className="space-y-6">
                {PREDICTION_QUESTIONS.map((pq, qIdx) => (
                  <div key={qIdx} className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                    <p className="font-semibold text-sm text-slate-200 mb-3">{pq.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                      {pq.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => handlePredictionSelect(qIdx, optIdx)}
                          className={`p-3 rounded-lg text-xs text-left transition-all border ${
                            predictionAnswers[qIdx] === optIdx
                              ? optIdx === pq.correctIndex
                                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                                : 'bg-rose-950/60 border-rose-500 text-rose-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {predictionSubmitted[qIdx] && (
                      <div className="text-xs text-cyan-300 bg-cyan-950/40 p-2.5 rounded border border-cyan-800/50">
                        🔍 <strong>How to verify:</strong> {pq.verifyInstruction}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: INTERACTIVE LAB --- */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* EXPLORATION STEPS RENDER (MANDATORY RENDER) */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-md font-bold text-cyan-400 mb-3 uppercase tracking-wider">
                Guided Lab Explorations (Select to Load Preset)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {EXPLORATION_STEPS.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedExplorationStep(idx);
                      audioManager.play('tap');
                      if (idx === 0) {
                        setSelectedSubstrate('benzene');
                        setSelectedElectrophile('CH3Cl');
                        setCatalystRatio(0.2);
                        setBenzeneRatio(5.0);
                      } else if (idx === 1) {
                        setSelectedSubstrate('benzene');
                        setSelectedElectrophile('CH3CH2CH2Cl');
                        setCatalystRatio(0.2);
                        setBenzeneRatio(5.0);
                      } else if (idx === 2) {
                        setSelectedSubstrate('benzene');
                        setSelectedElectrophile('CH3Cl');
                        setCatalystRatio(0.2);
                        setBenzeneRatio(1.0); // low benzene ratio to show polyalkylation
                      } else if (idx === 3) {
                        setSelectedSubstrate('benzene');
                        setSelectedElectrophile('CH3COCl');
                        setCatalystRatio(1.2);
                        setBenzeneRatio(1.0);
                      } else if (idx === 4) {
                        setSelectedSubstrate('benzene');
                        setSelectedElectrophile('CH3COCl');
                        setCatalystRatio(0.5); // deficit catalyst
                        setBenzeneRatio(1.0);
                      }
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedExplorationStep === idx
                        ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-cyan-400 mb-1">{step.title}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-2">{step.instruction}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* SIMULATOR WORK BENCH */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Controls Column */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
                <h3 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-2">
                  Reaction Controls
                </h3>

                {/* Substrate Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">Aromatic Substrate</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'benzene', label: 'Benzene (C6H6)' },
                      { id: 'toluene', label: 'Toluene (Activated)' },
                      { id: 'nitrobenzene', label: 'Nitrobenzene (Deactivated)' },
                    ].map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => setSelectedSubstrate(sub.id as typeof selectedSubstrate)}
                        className={`py-2 px-2 text-xs rounded-lg border font-medium ${
                          selectedSubstrate === sub.id
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Electrophile Source */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">Reagent / Electrophile Source</label>
                  <select
                    value={selectedElectrophile}
                    onChange={(e) => setSelectedElectrophile(e.target.value as typeof selectedElectrophile)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="CH3Cl">Chloromethane (CH3Cl) - Alkylation</option>
                    <option value="CH3CH2CH2Cl">1-Chloropropane (CH3CH2CH2Cl) - Rearrangement Alkylation</option>
                    <option value="CH3COCl">Acetyl Chloride (CH3COCl) - Acylation</option>
                    <option value="(CH3CO)2O">Acetic Anhydride ((CH3CO)2O) - Acylation</option>
                  </select>
                </div>

                {/* Catalyst Ratio Slider */}
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Anhydrous AlCl3 Ratio:</span>
                    <span className="font-mono text-cyan-400 font-bold">{catalystRatio.toFixed(1)} eq</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="2.0"
                    step="0.1"
                    value={catalystRatio}
                    onChange={(e) => setCatalystRatio(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-950"
                  />
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {selectedElectrophile.includes('CO')
                      ? 'Acylation requires > 1.0 eq due to AlCl3-ketone complexation.'
                      : 'Alkylation requires catalytic amounts (~0.1-0.2 eq).'}
                  </div>
                </div>

                {/* Benzene Ratio Slider */}
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Substrate to Halide Stoichiometry:</span>
                    <span className="font-mono text-cyan-400 font-bold">{benzeneRatio.toFixed(1)} : 1</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="5.0"
                    step="0.5"
                    value={benzeneRatio}
                    onChange={(e) => setBenzeneRatio(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-950"
                  />
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    High excess (5.0:1) minimizes polyalkylation side-products.
                  </div>
                </div>

                {/* Temperature Slider */}
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Reaction Temperature:</span>
                    <span className="font-mono text-amber-400 font-bold">{temperature}°C</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="80"
                    step="5"
                    value={temperature}
                    onChange={(e) => setTemperature(parseInt(e.target.value))}
                    className="w-full accent-amber-400 bg-slate-950"
                  />
                </div>

                {/* Start Reaction Button */}
                <button
                  onClick={handleStartSim}
                  disabled={isSimulating}
                  className={`w-full py-3 rounded-xl font-bold text-sm shadow-lg transition-all ${
                    isSimulating
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 hover:from-emerald-400 hover:to-teal-500'
                  }`}
                >
                  {isSimulating ? `Reaction Running... ${reactionProgress}%` : '▶ Run Synthesis Reaction'}
                </button>
              </div>

              {/* Reaction Visualizer & Analytics (2 Columns) */}
              <div className="lg:col-span-2 space-y-6">
                {/* Visualizer Canvas */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative min-h-[280px] flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                      Live Reaction Chamber
                    </h4>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-slate-950 text-cyan-400 font-mono border border-slate-800">
                      Temp: {temperature}°C | Progress: {reactionProgress}%
                    </span>
                  </div>

                  {/* Reaction Animation Graphic */}
                  <div className="my-4 flex items-center justify-center gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800/80">
                    {/* Substrate */}
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 font-bold text-xs shadow-lg shadow-cyan-500/10">
                        {selectedSubstrate === 'benzene' ? 'C6H6' : selectedSubstrate === 'toluene' ? 'Ph-CH3' : 'Ph-NO2'}
                      </div>
                      <span className="text-[11px] text-slate-400 mt-2 block">{selectedSubstrate}</span>
                    </div>

                    <div className="text-slate-500 font-bold text-lg">+</div>

                    {/* Electrophile */}
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto rounded-full bg-slate-900 border-2 border-indigo-400 flex items-center justify-center text-indigo-300 font-bold text-xs shadow-lg shadow-indigo-500/10">
                        {selectedElectrophile}
                      </div>
                      <span className="text-[11px] text-slate-400 mt-2 block">Reagent</span>
                    </div>

                    <div className="text-cyan-400 font-mono font-bold text-xs flex flex-col items-center">
                      <span>AlCl3 ({catalystRatio} eq)</span>
                      <span className="text-lg">➔</span>
                    </div>

                    {/* Product */}
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto rounded-full bg-slate-900 border-2 border-emerald-400 flex flex-col items-center justify-center text-emerald-300 font-bold text-xs shadow-lg shadow-emerald-500/20">
                        <span>{calculatedYields.majorProduct.split(' ')[0]}</span>
                        <span className="text-[10px] text-emerald-400 font-mono">{calculatedYields.majorYield}%</span>
                      </div>
                      <span className="text-[11px] text-emerald-400 font-semibold mt-2 block">Major Product</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 h-full transition-all duration-200"
                      style={{ width: `${reactionProgress}%` }}
                    />
                  </div>

                  {/* Status Banner */}
                  <div className="mt-3 text-xs p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                    <span className="font-bold text-cyan-400">Analysis: </span>
                    {calculatedYields.status}
                  </div>
                </div>

                {/* Reaction Energy Profile Curve */}
                <ReactionEnergyProfileSVG
                  reactionType={selectedElectrophile.includes('CO') ? 'acylation' : 'alkylation'}
                  hasRearrangement={selectedElectrophile === 'CH3CH2CH2Cl'}
                />
              </div>
            </div>

            {/* OBSERVATION QUESTIONS SECTION (MANDATORY RENDER) */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <span>👁️</span> Post-Lab Observation Questions
              </h3>
              <div className="space-y-6">
                {OBSERVATION_QUESTIONS.map((oq, qIdx) => (
                  <div key={qIdx} className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                    <p className="font-semibold text-sm text-slate-200 mb-3">{oq.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {oq.observableOptions.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => handleObservationSelect(qIdx, optIdx)}
                          className={`p-3 rounded-lg text-xs text-left transition-all border ${
                            observationAnswers[qIdx] === optIdx
                              ? optIdx === oq.correctIndex
                                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                                : 'bg-rose-950/60 border-rose-500 text-rose-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
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

        {/* --- TAB 3: PRACTICE CHALLENGES --- */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Challenge Progress Header */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <h2 className="text-xl font-bold text-slate-100 mt-1">
                  Difficulty:{' '}
                  <span
                    className={`capitalize ${
                      CHALLENGES[currentChallengeIndex].difficulty === 'advanced'
                        ? 'text-rose-400'
                        : CHALLENGES[currentChallengeIndex].difficulty === 'standard'
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {CHALLENGES[currentChallengeIndex].difficulty}
                  </span>{' '}
                  ({CHALLENGES[currentChallengeIndex].competencyLevel})
                </h2>
              </div>

              {/* Challenge Indicator Dots */}
              <div className="flex flex-wrap max-w-md gap-1.5">
                {CHALLENGES.map((c, idx) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setCurrentChallengeIndex(idx);
                      setSelectedOption(null);
                      setNumericInput('');
                      setChallengeFeedback(null);
                    }}
                    className={`w-6 h-6 rounded-md text-[10px] font-bold transition-all ${
                      idx === currentChallengeIndex
                        ? 'ring-2 ring-cyan-400 bg-cyan-500 text-slate-950'
                        : challengeCompleted[idx]
                        ? 'bg-emerald-600 text-slate-100'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Challenge Box */}
            <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 shadow-xl">
              <p className="text-base font-semibold text-slate-100 mb-6 leading-relaxed">
                {CHALLENGES[currentChallengeIndex].question}
              </p>

              {/* MCQ Options */}
              {CHALLENGES[currentChallengeIndex].type === 'mcq' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {CHALLENGES[currentChallengeIndex].options?.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedOption(idx);
                        audioManager.play('tap');
                      }}
                      className={`p-4 rounded-xl text-left text-sm transition-all border ${
                        selectedOption === idx
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Numeric Input */}
              {CHALLENGES[currentChallengeIndex].type === 'numeric' && (
                <div className="mb-6 max-w-xs">
                  <label className="block text-xs text-slate-400 mb-2">Enter Numerical Answer:</label>
                  <input
                    type="number"
                    step="0.01"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="e.g. 1.10"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 text-base font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleChallengeSubmit}
                  disabled={
                    CHALLENGES[currentChallengeIndex].type === 'mcq'
                      ? selectedOption === null
                      : numericInput.trim() === ''
                  }
                  className={`py-3 px-6 rounded-xl font-bold text-sm transition-all shadow-lg ${
                    (CHALLENGES[currentChallengeIndex].type === 'mcq' && selectedOption !== null) ||
                    (CHALLENGES[currentChallengeIndex].type === 'numeric' && numericInput.trim() !== '')
                      ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Submit Answer
                </button>

                <button
                  onClick={() => {
                    const hintMsg = CHALLENGES[currentChallengeIndex].hints[0];
                    setCurrentHintText(hintMsg);
                    setShowHint((prev) => !prev);
                    audioManager.play('hint');
                  }}
                  className="py-3 px-4 rounded-xl border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-slate-700 text-sm font-semibold"
                >
                  💡 Hint
                </button>

                {challengeFeedback?.isCorrect && currentChallengeIndex < CHALLENGES.length - 1 && (
                  <button
                    onClick={handleNextChallenge}
                    className="py-3 px-6 rounded-xl font-bold text-sm bg-emerald-500 text-slate-950 hover:bg-emerald-400 ml-auto"
                  >
                    Next Challenge ➔
                  </button>
                )}
              </div>

              {/* Challenge Feedback Message */}
              {challengeFeedback && (
                <div
                  className={`mt-6 p-4 rounded-xl border text-sm ${
                    challengeFeedback.isCorrect
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                      : 'bg-rose-950/60 border-rose-500/50 text-rose-200'
                  }`}
                >
                  <div className="font-bold mb-1">
                    {challengeFeedback.isCorrect ? '✅ Correct!' : '❌ Incorrect Explanation:'}
                  </div>
                  {challengeFeedback.message}
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- TAB 4: SUMMARY & REAL WORLD --- */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* REAL WORLD ACTIVITY SECTION (MANDATORY RENDER) */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-amber-500/20 text-amber-300">
                  Industrial Application
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-100 mb-2">{REAL_WORLD_ACTIVITY.title}</h2>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REAL_WORLD_ACTIVITY.steps.map((stepStr, idx) => (
                  <div key={idx} className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
                    <div className="text-xs font-bold text-cyan-400 mb-1">Stage {idx + 1}</div>
                    <div className="text-xs text-slate-300 leading-relaxed">{stepStr}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Misconceptions Correction Grid */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-slate-100 mb-4">
                Key Misconceptions & Clarifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((misc) => (
                  <div key={misc.id} className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
                    <div className="text-xs font-bold text-rose-400 mb-1">❌ Misconception:</div>
                    <div className="text-xs text-slate-400 mb-2 font-medium">{misc.misconception}</div>
                    <div className="text-xs font-bold text-emerald-400 mb-1">✅ Scientific Truth:</div>
                    <div className="text-xs text-slate-300 leading-relaxed">{misc.correction}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* SRS Review Flashcard Deck */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">Spaced Repetition (SM-2) Memory Card</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="font-bold text-slate-200 mb-1">Friedel-Crafts Alkylation (c11_chem_091)</div>
                  <div className="text-slate-400">Next Review Interval: {srsItems[NODE_FC_ALKYLATION].interval} days</div>
                  <div className="text-slate-400">Ease Factor: {srsItems[NODE_FC_ALKYLATION].easinessFactor?.toFixed(2)}</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="font-bold text-slate-200 mb-1">Friedel-Crafts Acylation (c11_chem_092)</div>
                  <div className="text-slate-400">Next Review Interval: {srsItems[NODE_FC_ACYLATION].interval} days</div>
                  <div className="text-slate-400">Ease Factor: {srsItems[NODE_FC_ACYLATION].easinessFactor?.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MANDATORY FEEDBACK COMPONENTS */}
      <HintBubble show={showHint} text={currentHintText} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Mastery Achieved! Friedel-Crafts Reactions Complete!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
    </div>
  );
}