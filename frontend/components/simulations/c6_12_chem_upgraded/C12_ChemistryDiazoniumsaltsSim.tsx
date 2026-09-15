'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { createReviewItem, sm2Update, ReviewItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// Node IDs for ISC Class 12 Chemistry - Diazonium Salts
const NODE_081 = 'c12_chem_081'; // Diazotisation Reaction & Preparation
const NODE_082 = 'c12_chem_082'; // Physical Properties & Stability (Aryl vs Alkyl)
const NODE_083 = 'c12_chem_083'; // Sandmeyer Reaction (CuCl/HCl, CuBr/HBr, CuCN/KCN)
const NODE_084 = 'c12_chem_084'; // Gattermann Reaction (Cu powder / HX)
const NODE_085 = 'c12_chem_085'; // Replacement by Iodide (KI) & Fluoride (Schiemann Reaction)
const NODE_086 = 'c12_chem_086'; // Replacement by Hydroxide (H2O/Δ) & Hydride (H3PO2 or EtOH)
const NODE_087 = 'c12_chem_087'; // Replacement by Nitro Group (NaNO2/Cu with HBF4 intermediate)
const NODE_088 = 'c12_chem_088'; // Azo Coupling with Phenols (Orange Dyes, pH 9-10)
const NODE_089 = 'c12_chem_089'; // Azo Coupling with Aniline/Amines (Yellow Dyes, pH 4-5)
const NODE_090 = 'c12_chem_090'; // Synthetic Roadmap & Conversions in Organic Chemistry

const ALL_NODE_IDS = [
  NODE_081, NODE_082, NODE_083, NODE_084, NODE_085,
  NODE_086, NODE_087, NODE_088, NODE_089, NODE_090
];

// Interface definitions
interface Misconception {
  id: string;
  misconception: string;
  correction: string;
  nodeId: string;
}

interface ExplorationStep {
  title: string;
  instruction: string;
  interactionType: string;
  nodeId: string;
}

interface PredictionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  verifyInstruction: string;
  nodeId: string;
}

interface ObservationQuestion {
  question: string;
  observableOptions: string[];
  correctIndex: number;
  nodeId: string;
}

interface RealWorldActivity {
  title: string;
  description: string;
  steps: string[];
}

interface Challenge {
  id: string;
  nodeId: string;
  type: 'mcq' | 'numeric' | 'drag-sort' | 'classify';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'synthesis';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string | number;
  sortItems?: string[];
  sortCorrectOrder?: number[];
  explanation: string;
  hints: string[];
  misconceptionIndex: number;
}

// Section 1: SCENARIO
const SCENARIO = {
  title: 'Synthetic Organic & Dye Synthesis Research Facility',
  intro: 'Welcome to the Central Organic Synthesis Laboratory! You are tasked with manufacturing precision fine chemicals, pharmaceuticals, and synthetic azo dyes using benzenediazonium salts.',
  context: 'Diazonium salts act as the ultimate versatile synthetic gateway in aromatic chemistry. By controlling reaction conditions like temperature, pH, and specific catalysts, you will transform primary aromatic amines into substituted benzenes and vibrant azo pigments.',
};

// Section 2: DISCOVERY_QUESTION
const DISCOVERY_QUESTION = {
  question: 'Why must the diazotisation reaction of aniline with nitrous acid (NaNO₂ + HCl) be rigorously maintained strictly between 0 °C and 5 °C (273–278 K)?',
  options: [
    'At >5 °C, nitrous acid reacts explosively with hydrochloric acid.',
    'At >5 °C, benzenediazonium chloride decomposes violently/hydrolyses with water to form phenol and N₂ gas.',
    'At <0 °C, aniline freezes into a solid crystal and halts all collisions with nitrous acid.',
    'At >5 °C, aniline undergoes complete ring combustion into carbon dioxide and water.'
  ],
  correctIndex: 1,
  hintAfter: 'Benzenediazonium chloride is thermally unstable in aqueous solution. Above 5 °C, the N₂⁺ group rapidly departs as inert N₂ gas, reacting with water to yield phenol.',
};

// Section 3: MISCONCEPTIONS
const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'm1',
    misconception: 'Alkyldiazonium salts are as stable as aryldiazonium salts at low temperatures.',
    correction: 'Alkyldiazonium salts are extremely unstable even at 0 °C and decompose spontaneously into carbocations and nitrogen gas because alkyl groups cannot delocalize the positive charge by resonance.',
    nodeId: NODE_082
  },
  {
    id: 'm2',
    misconception: 'Sandmeyer reaction and Gattermann reaction use identical catalytic reagents.',
    correction: 'Sandmeyer reaction uses cuprous halides (Cu₂Cl₂, Cu₂Br₂) or CuCN dissolved in corresponding halogen acids, whereas Gattermann reaction uses finely divided copper powder with halogen acids.',
    nodeId: NODE_084
  },
  {
    id: 'm3',
    misconception: 'Fluorobenzene can be easily prepared directly using Sandmeyer reaction with CuF/HF.',
    correction: 'Fluorobenzene cannot be synthesized via Sandmeyer or Gattermann reactions. It requires the Schiemann reaction involving fluoroboric acid (HBF₄) to precipitate benzenediazonium fluoroborate, followed by thermal decomposition.',
    nodeId: NODE_085
  },
  {
    id: 'm4',
    misconception: 'Coupling reactions with phenol occur best in highly acidic solutions.',
    correction: 'Coupling with phenol requires a mildly alkaline medium (pH 9–10) to convert phenol into the strongly nucleophilic phenoxide ion (C₆H₅O⁻). In strongly acidic media, phenol remains un-ionized and non-reactive.',
    nodeId: NODE_088
  },
  {
    id: 'm5',
    misconception: 'Coupling reactions with aniline proceed fastest at pH > 12.',
    correction: 'Coupling with aniline occurs best in weakly acidic conditions (pH 4–5). In strongly acidic media (pH < 3), aniline becomes protonated to anilinium ion (C₆H₅NH₃⁺) which is deactivated; in basic media, diazonium ion turns into non-reactive diazotate ion.',
    nodeId: NODE_089
  },
  {
    id: 'm6',
    misconception: 'Reduction of diazonium salt with Hypophosphorous acid (H₃PO₂) produces aniline.',
    correction: 'Hypophosphorous acid (H₃PO₂) or ethanol reduces benzenediazonium chloride to benzene (deamination reaction), while H₃PO₂ itself is oxidized to phosphorous acid (H₃PO₃). Reduction to hydrazine requires SnCl₂/HCl.',
    nodeId: NODE_086
  }
];

// Section 4: EXPLORATION_STEPS
const EXPLORATION_STEPS: ExplorationStep[] = [
  {
    title: 'Lab 1: Temperature & Diazotisation Control',
    instruction: 'Adjust the ice-bath reaction temperature (0 °C to 25 °C) and NaNO₂ addition rate. Observe at what temperature N₂ gas evolution begins and when phenol starts forming prematurely.',
    interactionType: 'diazotisation-temperature-lab',
    nodeId: NODE_081
  },
  {
    title: 'Lab 2: Nucleophilic Replacement Reactions',
    instruction: 'Select various catalytic reagents (CuCl/HCl, CuBr/HBr, CuCN, KI, HBF₄, H₃PO₂, H₂O/Δ) to perform targeted aromatic substitutions on benzenediazonium chloride and measure product yield.',
    interactionType: 'substitution-catalyst-lab',
    nodeId: NODE_083
  },
  {
    title: 'Lab 3: Azo Dye Synthesis & Spectrophotometry',
    instruction: 'Couple benzenediazonium chloride with Phenol, Aniline, or β-Naphthol. Adjust the pH slider (0 to 14) to optimize dye precipitation color intensity and measure max absorbance wavelength λ_max.',
    interactionType: 'dye-coupling-ph-lab',
    nodeId: NODE_088
  },
  {
    title: 'Lab 4: Multi-Step Synthetic Roadmap Visualizer',
    instruction: 'Design a multi-step synthetic pathway from Benzene to 1,3,5-Tribromobenzene or Fluorobenzene using Diazonium Salt intermediates. Test sequential reagents.',
    interactionType: 'synthetic-roadmap-builder',
    nodeId: NODE_090
  },
  {
    title: 'Lab 5: Resonance & Molecular Orbital Energy Explorer',
    instruction: 'Compare Aryldiazonium (C₆H₅N₂⁺) and Alkyldiazonium (CH₃N₂⁺) resonance structures and nitrogen-leaving group activation energies.',
    interactionType: 'resonance-orbital-explorer',
    nodeId: NODE_082
  }
];

// Section 5: PREDICTION_QUESTIONS
const PREDICTION_QUESTIONS: PredictionQuestion[] = [
  {
    question: 'Predict what happens if you add potassium iodide (KI) solution to aqueous benzenediazonium chloride solution at room temperature without any copper catalyst:',
    options: [
      'No reaction occurs because iodide requires CuI catalyst.',
      'Iodobenzene precipitates rapidly with spontaneous release of N₂ gas bubbles.',
      'Aniline is regenerated along with free iodine gas.',
      'A bright red azo dye forms instantly.'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 2, select KI reagent without heating or copper catalysts and observe the reaction vessel.',
    nodeId: NODE_085
  },
  {
    question: 'Predict the major organic product formed when benzenediazonium fluoroborate (C₆H₅N₂⁺BF₄⁻) is heated with aqueous NaNO₂ solution in the presence of copper powder:',
    options: [
      'Fluorobenzene',
      'Nitrobenzene',
      'Phenol',
      'Azobenzene'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 2, select NaNO₂ / Cu catalyst with Diazonium fluoroborate intermediate.',
    nodeId: NODE_087
  }
];

// Section 6: OBSERVATION_QUESTIONS
const OBSERVATION_QUESTIONS: ObservationQuestion[] = [
  {
    question: 'When coupling benzenediazonium chloride with phenol at pH 9.5, what distinct visual change occurs in the reaction flask?',
    observableOptions: [
      'Formation of an intense orange-red precipitate (p-hydroxyazobenzene)',
      'Formation of a bright canary yellow solution',
      'Evolution of colorless N₂ gas bubbles with a white precipitate',
      'A deep blue complex forming at the bottom'
    ],
    correctIndex: 0,
    nodeId: NODE_088
  },
  {
    question: 'During the reduction of benzenediazonium chloride with Hypophosphorous acid (H₃PO₂), what happens to the inorganic phosphorous reactant?',
    observableOptions: [
      'It precipitates as elemental phosphorus solid.',
      'It is oxidized to Phosphorous acid (H₃PO₃) while benzenediazonium chloride is reduced to benzene.',
      'It forms a yellow coordination complex with copper ions.',
      'It evaporates as phosphine gas (PH₃).'
    ],
    correctIndex: 1,
    nodeId: NODE_086
  }
];

// Section 7: REAL_WORLD_ACTIVITY
const REAL_WORLD_ACTIVITY: RealWorldActivity = {
  title: 'Industrial Manufacturing of Methyl Orange & Fast Red Dyes',
  description: 'In industrial dye manufacturing, sulfanilic acid is diazotized and coupled with N,N-dimethylaniline to manufacture Methyl Orange, a widely used acid-base indicator and textile dye.',
  steps: [
    'Step 1: Dissolve 17.3 g of sulfanilic acid in Na₂CO₃ solution and cool to 0-5 °C.',
    'Step 2: Add 6.9 g NaNO₂ and slowly drip 25 mL dilute HCl to form the internal diazonium salt (zwitterion).',
    'Step 3: Add 12.1 g N,N-dimethylaniline in dilute acetic acid at pH 4-5 to perform azo coupling.',
    'Step 4: Treat with 20% NaOH solution to precipitate sodium salt of Methyl Orange (orange precipitate, 88% yield).'
  ]
};

// Section 8: CHALLENGES (22+ Challenges across 3 difficulty tiers)
const CHALLENGES: Challenge[] = [
  // FOUNDATION TIER (7 Questions)
  {
    id: 'c1',
    nodeId: NODE_081,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which reagents are used to prepare nitrous acid (HNO₂) in situ during the diazotisation of primary aromatic amines?',
    options: [
      'NaNO₃ + Conc. H₂SO₄',
      'NaNO₂ + Dilute HCl at 0-5 °C',
      'NH₄NO₃ + NaOH',
      'NO₂ gas + H₂O at 100 °C'
    ],
    correctIndex: 1,
    explanation: 'Nitrous acid (HNO₂) is highly unstable and is prepared in situ in the reaction flask by mixing sodium nitrite (NaNO₂) with cold dilute hydrochloric acid (HCl) at 0–5 °C.',
    hints: [
      'Nitrous acid cannot be stored in a bottle.',
      'Look for sodium nitrite combined with a mineral acid.',
      'The temperature must be kept ice-cold (0-5 °C).'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'c2',
    nodeId: NODE_082,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why are arenediazonium salts significantly more stable than alkanediazonium salts?',
    options: [
      'Aryl groups are smaller than alkyl groups.',
      'The diazonium group (-N₂⁺) is resonance-stabilized by delocalization of π electrons into the benzene ring.',
      'Alkanediazonium salts form hydrogen bonds with water.',
      'Aryl halides are strong bases.'
    ],
    correctIndex: 1,
    explanation: 'In arenediazonium salts, the positive charge on the nitrogen atom adjacent to the ring is delocalized over the aromatic π system via resonance, conferring temporary stability at 0–5 °C.',
    hints: [
      'Think about electron delocalization in the aromatic ring.',
      'Resonance stabilizes positive charges on nitrogen.',
      'Alkyl groups lack π-electron rings for delocalization.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'c3',
    nodeId: NODE_083,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which catalyst is characteristically employed in the Sandmeyer Reaction to convert C₆H₅N₂⁺Cl⁻ to Chlorobenzene?',
    options: [
      'Copper powder (Cu)',
      'Cuprous chloride (Cu₂Cl₂ / HCl)',
      'Nickel catalyst (Ni/H₂)',
      'Anhydrous AlCl₃'
    ],
    correctIndex: 1,
    explanation: 'The Sandmeyer reaction utilizes cuprous halides (Cu₂Cl₂ or Cu₂Br₂) dissolved in corresponding halogen acids to replace the diazonium group with Cl or Br.',
    hints: [
      'Sandmeyer uses copper halides, not elemental metal powder.',
      'Look for copper in the +1 oxidation state (Cu(I)).',
      'Cu₂Cl₂ / HCl is the classic reagent.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'c4',
    nodeId: NODE_084,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How does the Gattermann reaction differ from the Sandmeyer reaction in terms of reagents?',
    options: [
      'Gattermann uses Cu₂Cl₂ while Sandmeyer uses Cu powder.',
      'Gattermann uses finely divided Copper powder (Cu/HX) instead of cuprous halide.',
      'Gattermann reaction requires liquid ammonia.',
      'Gattermann reaction yields only fluorobenzene.'
    ],
    correctIndex: 1,
    explanation: 'In Gattermann reaction, replacement of the diazonium group by Cl or Br is brought about by treating diazonium salt with copper powder in presence of HCl or HBr.',
    hints: [
      'Gattermann simplifies the catalyst to metal powder.',
      'Elemental copper (Cu) is used with halogen acid HX.',
      'Sandmeyer uses Cu(I) salts instead.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'c5',
    nodeId: NODE_085,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What reagent is added to benzenediazonium chloride solution to synthesize Iodobenzene directly without heating or copper catalysts?',
    options: [
      'Iodine crystals (I₂)',
      'Aqueous Potassium Iodide (KI)',
      'Cuprous Iodide (Cu₂I₂)',
      'HI gas at high pressure'
    ],
    correctIndex: 1,
    explanation: 'Iodobenzene is easily formed simply by warming the diazonium salt solution with aqueous potassium iodide (KI) solution.',
    hints: [
      'Iodide ion is a strong nucleophile and does not require a Cu catalyst.',
      'Warming with an alkali halide salt solution is sufficient.',
      'Potassium iodide is KI.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'c6',
    nodeId: NODE_086,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What product is obtained when an aqueous solution of benzenediazonium chloride is warmed to temperatures above 10 °C / boiled?',
    options: [
      'Chlorobenzene',
      'Phenol (C₆H₅OH)',
      'Nitrobenzene',
      'Aniline'
    ],
    correctIndex: 1,
    explanation: 'When aqueous benzenediazonium chloride solution is heated/warmed, hydrolysis occurs: C₆H₅N₂⁺Cl⁻ + H₂O → C₆H₅OH + N₂ ↑ + HCl.',
    hints: [
      'Water acts as a nucleophile.',
      'Hydrolysis converts -N₂⁺Cl⁻ into an -OH group.',
      'Nitrogen gas escapes as bubbles.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'c7',
    nodeId: NODE_088,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What color pigment is formed when benzenediazonium chloride is coupled with Phenol in alkaline medium (pH 9-10)?',
    options: [
      'Canary Yellow dye',
      'Orange dye (p-hydroxyazobenzene)',
      'Colorless solution',
      'Deep Purple precipitate'
    ],
    correctIndex: 1,
    explanation: 'Coupling benzenediazonium chloride with phenol in alkaline medium (pH 9–10) produces p-hydroxyazobenzene, an orange azo dye.',
    hints: [
      'Phenol azo dye is vibrant orange.',
      'The product is p-hydroxyazobenzene.',
      'Alkaline medium activates phenol to phenoxide.'
    ],
    misconceptionIndex: 3
  },

  // STANDARD TIER (8 Questions)
  {
    id: 'c8',
    nodeId: NODE_081,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'How many moles of HCl are theoretically consumed per 1 mole of aniline during complete diazotisation to benzenediazonium chloride?',
    correctAnswer: 2,
    explanation: 'The stoichiometry of diazotisation is: C₆H₅NH₂ + NaNO₂ + 2 HCl → C₆H₅N₂⁺Cl⁻ + NaCl + 2 H₂O. Exactly 2 moles of HCl are required per mole of aniline.',
    hints: [
      'One mole of HCl reacts with NaNO₂ to generate HNO₂.',
      'Another mole of HCl provides the Cl⁻ counterion for the salt.',
      'Check the balanced equation stoichiometry.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'c9',
    nodeId: NODE_085,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In the Schiemann reaction, why is Fluoroboric acid (HBF₄) added to benzenediazonium chloride as the first step?',
    options: [
      'To reduce the salt to fluorobenzene immediately.',
      'To precipitate water-insoluble Benzenediazonium fluoroborate (C₆H₅N₂⁺BF₄⁻), which can be isolated and dry-heated safely.',
      'To prevent nitrogen gas from escaping.',
      'To increase the pH of the reaction mixture.'
    ],
    correctIndex: 1,
    explanation: 'Adding HBF₄ precipitates water-insoluble benzenediazonium fluoroborate. This solid can be filtered, dried, and thermally decomposed to yield fluorobenzene, N₂, and BF₃.',
    hints: [
      'Fluorobenzene cannot be made in wet aqueous solution directly.',
      'Insoluble fluoroborate salt is isolated as dry solid crystals.',
      'Dry thermal decomposition yields C₆H₅F + N₂ + BF₃.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'c10',
    nodeId: NODE_086,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Which reducing agents can replace the diazonium group (-N₂⁺Cl⁻) with Hydrogen (H) to form Benzene?',
    options: [
      'LiAlH₄ or NaBH₄',
      'Hypophosphorous acid (H₃PO₂) / H₂O or Ethanol (CH₃CH₂OH)',
      'Sn / HCl',
      'Concentrated H₂SO₄'
    ],
    correctIndex: 1,
    explanation: 'Benzenediazonium chloride is reduced to benzene by mild reducing agents such as hypophosphorous acid (H₃PO₂) or ethanol (CH₃CH₂OH), which themselves get oxidized to H₃PO₃ and CH₃CHO respectively.',
    hints: [
      'This process is called deamination.',
      'H₃PO₂ is oxidized to H₃PO₃.',
      'Ethanol is oxidized to acetaldehyde.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'c11',
    nodeId: NODE_087,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'How is Nitrobenzene synthesized from benzenediazonium fluoroborate (C₆H₅N₂⁺BF₄⁻)?',
    options: [
      'By reacting directly with concentrated HNO₃.',
      'By heating with aqueous NaNO₂ solution in the presence of Copper catalyst.',
      'By electrolysis in alkali.',
      'By reaction with NO₂ gas at high pressure.'
    ],
    correctIndex: 1,
    explanation: 'Benzenediazonium fluoroborate is heated with aqueous sodium nitrite (NaNO₂) in the presence of copper powder to form nitrobenzene: C₆H₅N₂⁺BF₄⁻ + NaNO₂ → C₆H₅NO₂ + N₂ + NaBF₄.',
    hints: [
      'Nitro group comes from sodium nitrite NaNO₂.',
      'Copper catalyst assists nucleophilic substitution.',
      'Fluoroborate salt intermediate is essential.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'c12',
    nodeId: NODE_089,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does coupling of benzenediazonium chloride with Aniline require a weakly acidic medium (pH 4–5)?',
    options: [
      'Strong acid hydrolyses aniline into phenol.',
      'At lower pH (<3), aniline is converted into non-nucleophilic anilinium ion (C₆H₅NH₃⁺); at higher pH (>7), diazonium ion forms unreactive diazotate.',
      'Aniline turns into gas at pH > 7.',
      'Yellow dye decomposes at pH 4.5.'
    ],
    correctIndex: 1,
    explanation: 'At pH < 3, aniline gets protonated into C₆H₅NH₃⁺ which lacks lone pairs for electrophilic attack. At pH > 8, C₆H₅N₂⁺ converts to hydroxide/diazotate ions which are non-electrophilic. Thus pH 4–5 is optimal.',
    hints: [
      'Aniline needs a free lone pair on -NH₂ to act as nucleophile.',
      'Too much acid protonates -NH₂ to -NH₃⁺.',
      'Too much base inactivates the diazonium electrophile.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'c13',
    nodeId: NODE_088,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In azo coupling reactions, what role does the diazonium cation (C₆H₅N���⁺) play?',
    options: [
      'Nucleophile attacking the aromatic ring',
      'Weak electrophile attacking electron-rich aromatic rings (activated by -OH or -NH₂)',
      'Free radical catalyst',
      'Arrhenius acid donating protons'
    ],
    correctIndex: 1,
    explanation: 'The diazonium cation (ArN₂⁺) is a weak electrophile due to positive charge delocalization. It can only attack strongly activated aromatic rings like phenols and aromatic amines.',
    hints: [
      'ArN₂⁺ carries a positive formal charge.',
      'It attacks electron-rich positions (para/ortho).',
      'It acts as an electrophile in electrophilic aromatic substitution.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'c14',
    nodeId: NODE_090,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'synthesis',
    question: 'Which sequence of reactions converts Aniline into Bromobenzene?',
    options: [
      'Aniline + Br₂/H₂O → Bromobenzene',
      'Aniline + NaNO₂ + HCl (0-5°C) → Benzenediazonium chloride; followed by Cu₂Br₂ / HBr',
      'Aniline + HBr / Δ → Bromobenzene',
      'Aniline + FeBr₃ → Bromobenzene'
    ],
    correctIndex: 1,
    explanation: 'Direct bromination of aniline yields 2,4,6-tribromoaniline. To get monobromobenzene, aniline is first diazotized (NaNO₂/HCl, 0-5°C) and then treated with Cu₂Br₂/HBr (Sandmeyer reaction).',
    hints: [
      'Direct bromination of aniline gives trisubstitution.',
      'Diazotisation creates the -N₂⁺Cl⁻ leaving group.',
      'Sandmeyer reaction replaces -N₂⁺Cl⁻ with -Br.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'c15',
    nodeId: NODE_082,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'When an aliphatic primary amine (e.g., Ethylamine) reacts with NaNO₂ + HCl at 0 °C, what is observed in the test tube?',
    options: [
      'A stable crystalline diazonium salt precipitates.',
      'Vigorous evolution of Nitrogen gas bubbles and formation of ethanol / carbocation products.',
      'Formation of an orange dye.',
      'No reaction occurs.'
    ],
    correctIndex: 1,
    explanation: 'Alkanediazonium salts (e.g., C₂H₅N₂⁺Cl⁻) are extremely unstable even at 0 °C. They spontaneously decompose to yield nitrogen gas quantitatively and carbocations that yield alcohols, alkenes, and alkyl chlorides.',
    hints: [
      'Alkyl groups cannot delocalize positive charges by resonance.',
      'Alkanediazonium salt breaks down instantly.',
      'N₂ gas escapes rapidly.'
    ],
    misconceptionIndex: 0
  },

  // ADVANCED TIER (7 Questions)
  {
    id: 'c16',
    nodeId: NODE_090,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'synthesis',
    question: 'Design a synthetic route to prepare meta-Dichlorobenzene from Nitrobenzene:',
    options: [
      '1. Chlorination with Cl₂/FeCl₃ to m-nitrochlorobenzene; 2. Sn/HCl reduction to m-chloroaniline; 3. Diazotisation with NaNO₂/HCl (0-5°C); 4. Sandmeyer reaction with Cu₂Cl₂/HCl.',
      '1. Reduction with Sn/HCl to aniline; 2. Chlorination with Cl₂; 3. Diazotisation; 4. Hydrolysis.',
      '1. Diazotisation of nitrobenzene directly; 2. Cu₂Cl₂/HCl.',
      '1. Nitration to dinitrobenzene; 2. Reaction with CuCl.'
    ],
    correctIndex: 0,
    explanation: 'Nitro group is meta-directing. Chlorination of nitrobenzene gives m-nitrochlorobenzene. Reduction of NO₂ gives m-chloroaniline. Diazotisation yields m-chlorobenzenediazonium salt, which undergoes Sandmeyer reaction with Cu₂Cl₂/HCl to form m-dichlorobenzene.',
    hints: [
      'Nitro group directs incoming electrophiles to meta position.',
      'Convert NO₂ to NH₂ after meta-chlorination.',
      'Diazotize m-chloroaniline and use Sandmeyer reaction.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'c17',
    nodeId: NODE_090,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is diazonium chemistry indispensable for synthesizing 1,3,5-Tribromobenzene from Benzene?',
    options: [
      'Direct bromination of benzene cannot introduce 3 bromine atoms.',
      'Bromine is ortho/para directing; direct bromination cannot give 1,3,5- (meta) orientation. Aniline is brominated to 2,4,6-tribromoaniline, then -NH₂ is removed via diazotisation and reduction with H₃PO₂.',
      'Diazonium salts convert bromine into a super-electrophile.',
      'Tribromobenzene can only exist as a salt.'
    ],
    correctIndex: 1,
    explanation: 'Direct bromination of benzene gives 1,2,4- or 1,4-dibromobenzene because -Br is o/p directing. By using aniline (-NH₂ strongly o/p directing), 2,4,6-tribromoaniline is prepared. Diazotising and reducing with H₃PO₂ removes -NH₂, leaving 1,3,5-tribromobenzene.',
    hints: [
      '-NH₂ directs 3 bromines to positions 2, 4, 6 relative to itself.',
      'Removing -NH₂ leaves bromines at 1, 3, 5 relative to each other.',
      'Deamination with H₃PO₂ replaces -N₂⁺Cl⁻ with -H.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'c18',
    nodeId: NODE_088,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'When benzenediazonium chloride couples with β-naphthol (2-naphthol) in alkaline NaOH solution, at which position of β-naphthol does coupling predominantly take place?',
    options: [
      'Position 1 (α-position adjacent to -OH group)',
      'Position 3',
      'Position 6',
      'Position 8'
    ],
    correctIndex: 0,
    explanation: 'In β-naphthol, position 1 is activated by the hydroxyl group at position 2 and is the most nucleophilic site. Coupling occurs exclusively at Position 1 to form a brilliant red azo dye.',
    hints: [
      'Position 1 is ortho to the -OH group at position 2 in naphthol.',
      'Position 1 has maximum electron density.',
      'The red dye is 1-(phenylazo)-2-naphthol.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'c19',
    nodeId: NODE_086,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Calculate the volume of N₂ gas (in Liters) liberated at STP (22.4 L/mol) when 0.25 moles of benzenediazonium chloride is completely decomposed by heating in water.',
    correctAnswer: 5.6,
    explanation: '1 mole of ArN₂⁺Cl⁻ releases 1 mole (22.4 L at STP) of N₂ gas. For 0.25 moles: Volume = 0.25 × 22.4 L = 5.6 Liters.',
    hints: [
      'Stoichiometry: 1 mole ArN₂⁺ → 1 mole N₂ gas.',
      'At STP, 1 mole of ideal gas = 22.4 L.',
      'Multiply 0.25 by 22.4.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'c20',
    nodeId: NODE_083,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What is the accepted mechanism step involving copper in the Sandmeyer Reaction (ArN₂⁺ + CuCl → ArCl + N₂ + Cu⁺)?',
    options: [
      'Electrophilic addition to benzene ring',
      'Single Electron Transfer (SET) from Cu(I) to ArN₂⁺ forming an aryl radical Ar•, N₂ gas, and Cu(II)',
      'SN2 nucleophilic backside attack by Cl⁻',
      'Hydride transfer via cyclic transition state'
    ],
    correctIndex: 1,
    explanation: 'The Sandmeyer reaction proceeds via a radical mechanism involving Single Electron Transfer (SET): Cu(I) transfers an electron to ArN₂⁺ to form ArN₂•, which rapidly loses N₂ to form Aryl radical Ar•. Ar• then abstracts halogen from Cu(II) halide.',
    hints: [
      'Copper undergoes redox changes between +1 and +2 states.',
      'Free aryl radicals (Ar•) are intermediate species.',
      'Look for Single Electron Transfer (SET).'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'c21',
    nodeId: NODE_087,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'synthesis',
    question: 'How can Fluorobenzene be prepared from Nitrobenzene in high yield?',
    options: [
      'Direct fluorination with F₂ gas and FeF₃',
      '1. Reduce Nitrobenzene to Aniline with Fe/HCl; 2. Diazotize with NaNO₂/HBF₄ to Benzenediazonium fluoroborate; 3. Dry heat the isolated fluoroborate salt (Schiemann reaction).',
      'Heat Nitrobenzene with NaF',
      'React Nitrobenzene with HF at 200 °C'
    ],
    correctIndex: 1,
    explanation: 'Direct fluorination is violently explosive. Instead, nitrobenzene is reduced to aniline, treated with NaNO₂ and HBF₄ to form C₆H₅N₂⁺BF₄⁻, which is filtered, dried, and thermally decomposed (Schiemann reaction).',
    hints: [
      'Direct fluorination of benzene ring is unmanageable.',
      'Use Schiemann reaction via diazonium fluoroborate.',
      'Thermal decomposition of dry salt gives ArF + N₂ + BF₃.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'c22',
    nodeId: NODE_089,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Which structural feature of azo dyes (e.g., p-aminoazobenzene) causes them to absorb visible light and exhibit intense yellow/orange colors?',
    options: [
      'High molecular weight',
      'Extended conjugated π-electron system encompassing both aromatic rings connected through the azo group (-N=N-)',
      'Presence of ionic chloride counterions',
      'Triple bonds inside the benzene rings'
    ],
    correctIndex: 1,
    explanation: 'The azo group (-N=N-) acts as a chromophore connecting two aromatic π systems. The extensive delocalization/conjugation narrows the HOMO-LUMO energy gap so photon absorption falls in the visible spectrum.',
    hints: [
      'Color arises from selective absorption of visible wavelengths.',
      'Conjugated double bond systems lower the energy gap ΔE.',
      'The chromophore -N=N- links aromatic rings together.'
    ],
    misconceptionIndex: 3
  }
];

// Section 9: Custom SVG Diagrams Components

// SVG 1: Diazonium Resonance Structures & Orbital Hybridization
const DiazoniumResonanceSVG: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl shadow-lg border border-slate-700 my-4 text-center">
      <h4 className="text-amber-400 font-bold mb-2 text-lg">Resonance Stabilization of Benzenediazonium Cation (C₆H₅N₂⁺)</h4>
      <p className="text-slate-300 text-xs mb-4">Delocalization of positive charge into benzene ring confers stability at 0–5 °C</p>
      <svg viewBox="0 0 800 240" className="w-full h-auto max-h-64 mx-auto">
        {/* Resonance Structure 1 */}
        <g transform="translate(40, 20)">
          {/* Benzene Ring */}
          <polygon points="60,30 100,50 100,90 60,110 20,90 20,50" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
          <circle cx="60" cy="70" r="22" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" />
          {/* N2 Group */}
          <line x1="100" y1="70" x2="140" y2="70" stroke="#f59e0b" strokeWidth="3" />
          <text x="145" y="75" fill="#38bdf8" fontWeight="bold" fontSize="16">N</text>
          <text x="156" y="65" fill="#ef4444" fontWeight="bold" fontSize="14">+</text>
          <line x1="165" y1="65" x2="195" y2="65" stroke="#f59e0b" strokeWidth="2" />
          <line x1="165" y1="70" x2="195" y2="70" stroke="#f59e0b" strokeWidth="2" />
          <line x1="165" y1="75" x2="195" y2="75" stroke="#f59e0b" strokeWidth="2" />
          <text x="200" y="75" fill="#38bdf8" fontWeight="bold" fontSize="16">N</text>
          <text x="50" y="140" fill="#cbd5e1" fontSize="12">Major Contributor</text>
        </g>

        {/* Double-headed Resonance Arrow 1 */}
        <g transform="translate(280, 85)">
          <line x1="0" y1="0" x2="40" y2="0" stroke="#a855f7" strokeWidth="3" markerEnd="url(#arrow)" />
          <path d="M 0,-5 L -8,0 L 0,5 Z" fill="#a855f7" />
          <path d="M 40,-5 L 48,0 L 40,5 Z" fill="#a855f7" />
        </g>

        {/* Resonance Structure 2 (ortho delocalized) */}
        <g transform="translate(340, 20)">
          <polygon points="60,30 100,50 100,90 60,110 20,90 20,50" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
          {/* Double bonds explicit */}
          <line x1="25" y1="52" x2="25" y2="88" stroke="#38bdf8" strokeWidth="2.5" />
          <line x1="60" y1="105" x2="95" y2="88" stroke="#38bdf8" strokeWidth="2.5" />
          {/* Exocyclic double bond */}
          <line x1="100" y1="67" x2="140" y2="67" stroke="#f59e0b" strokeWidth="2.5" />
          <line x1="100" y1="73" x2="140" y2="73" stroke="#f59e0b" strokeWidth="2.5" />
          <text x="145" y="75" fill="#38bdf8" fontWeight="bold" fontSize="16">N</text>
          <line x1="165" y1="67" x2="195" y2="67" stroke="#f59e0b" strokeWidth="2" />
          <line x1="165" y1="73" x2="195" y2="73" stroke="#f59e0b" strokeWidth="2" />
          <text x="200" y="75" fill="#38bdf8" fontWeight="bold" fontSize="16">N</text>
          <text x="208" y="65" fill="#ef4444" fontWeight="bold" fontSize="14">-</text>
          {/* Ortho positive charge */}
          <text x="92" y="45" fill="#ef4444" fontWeight="bold" fontSize="15">+</text>
          <text x="50" y="140" fill="#cbd5e1" fontSize="12">Ortho-Delocalized</text>
        </g>

        {/* Double-headed Resonance Arrow 2 */}
        <g transform="translate(580, 85)">
          <path d="M 0,-5 L -8,0 L 0,5 Z" fill="#a855f7" />
          <line x1="0" y1="0" x2="40" y2="0" stroke="#a855f7" strokeWidth="3" />
          <path d="M 40,-5 L 48,0 L 40,5 Z" fill="#a855f7" />
        </g>

        {/* Resonance Structure 3 (para delocalized) */}
        <g transform="translate(640, 20)">
          <polygon points="60,30 100,50 100,90 60,110 20,90 20,50" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
          <line x1="100" y1="67" x2="140" y2="67" stroke="#f59e0b" strokeWidth="2.5" />
          <line x1="100" y1="73" x2="140" y2="73" stroke="#f59e0b" strokeWidth="2.5" />
          <text x="145" y="75" fill="#38bdf8" fontWeight="bold" fontSize="16">N</text>
          {/* Para positive charge */}
          <text x="10" y="75" fill="#ef4444" fontWeight="bold" fontSize="15">+</text>
          <text x="35" y="140" fill="#cbd5e1" fontSize="12">Para-Delocalized</text>
        </g>

        {/* Comparison banner */}
        <rect x="150" y="180" width="500" height="40" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="400" y="205" fill="#f3f4f6" textAnchor="middle" fontSize="13" fontStyle="italic">
          Alkyl Diazonium (R-N₂⁺) lacks aromatic π- delocalization → Decomposes instantly even at 0 °C!
        </text>
      </svg>
    </div>
  );
};

// SVG 2: Sandmeyer vs Gattermann Catalytic Reaction Comparison
const SandmeyerVsGattermannSVG: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl shadow-lg border border-slate-700 my-4 text-center">
      <h4 className="text-emerald-400 font-bold mb-2 text-lg">Sandmeyer vs Gattermann Substitution Comparison</h4>
      <svg viewBox="0 0 800 220" className="w-full h-auto max-h-60 mx-auto">
        {/* Central Reactant */}
        <g transform="translate(50, 70)">
          <polygon points="40,20 70,35 70,65 40,80 10,65 10,35" fill="none" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="40" cy="50" r="15" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="70" y1="50" x2="95" y2="50" stroke="#f59e0b" strokeWidth="2" />
          <text x="100" y="55" fill="#f87171" fontWeight="bold" fontSize="14">N₂⁺Cl⁻</text>
          <text x="25" y="110" fill="#e2e8f0" fontWeight="bold" fontSize="13">Benzenediazonium</text>
          <text x="45" y="126" fill="#cbd5e1" fontSize="11">Chloride</text>
        </g>

        {/* Top Branch: Sandmeyer */}
        <path d="M 220,90 Q 310,35 390,35" fill="none" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />
        <rect x="250" y="10" width="120" height="36" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
        <text x="310" y="26" fill="#a7f3d0" textAnchor="middle" fontWeight="bold" fontSize="12">SANDMEYER</text>
        <text x="310" y="38" fill="#6ee7b7" textAnchor="middle" fontSize="10">Cu₂Cl₂ / HCl or Cu₂Br₂ / HBr</text>

        <g transform="translate(420, 10)">
          <polygon points="30,15 52,26 52,48 30,59 8,48 8,26" fill="none" stroke="#10b981" strokeWidth="2" />
          <circle cx="30" cy="37" r="11" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="52" y1="37" x2="70" y2="37" stroke="#10b981" strokeWidth="2" />
          <text x="75" y="42" fill="#10b981" fontWeight="bold" fontSize="15">Cl / Br</text>
          <text x="120" y="42" fill="#ef4444" fontWeight="bold" fontSize="14">+ N₂ ↑</text>
          <text x="30" y="80" fill="#a7f3d0" fontSize="11">Higher Yield (~80-90%)</text>
        </g>

        {/* Bottom Branch: Gattermann */}
        <path d="M 220,110 Q 310,165 390,165" fill="none" stroke="#3b82f6" strokeWidth="3" />
        <rect x="250" y="150" width="120" height="36" rx="6" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1" />
        <text x="310" y="166" fill="#bfdbfe" textAnchor="middle" fontWeight="bold" fontSize="12">GATTERMANN</text>
        <text x="310" y="178" fill="#93c5fd" textAnchor="middle" fontSize="10">Cu Powder + HCl / HBr</text>

        <g transform="translate(420, 130)">
          <polygon points="30,15 52,26 52,48 30,59 8,48 8,26" fill="none" stroke="#3b82f6" strokeWidth="2" />
          <circle cx="30" cy="37" r="11" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="52" y1="37" x2="70" y2="37" stroke="#3b82f6" strokeWidth="2" />
          <text x="75" y="42" fill="#60a5fa" fontWeight="bold" fontSize="15">Cl / Br</text>
          <text x="120" y="42" fill="#ef4444" fontWeight="bold" fontSize="14">+ N₂ ↑</text>
          <text x="30" y="80" fill="#bfdbfe" fontSize="11">Moderate Yield (~40-60%)</text>
        </g>
      </svg>
    </div>
  );
};

// SVG 3: Azo Dye Coupling Reaction & Visual Mechanism
const AzoDyeCouplingSVG: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl shadow-lg border border-slate-700 my-4 text-center">
      <h4 className="text-pink-400 font-bold mb-2 text-lg">Electrophilic Azo Coupling Reaction Mechanism</h4>
      <svg viewBox="0 0 800 230" className="w-full h-auto max-h-64 mx-auto">
        {/* Diazonium Cation */}
        <g transform="translate(30, 60)">
          <polygon points="30,15 52,26 52,48 30,59 8,48 8,26" fill="none" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="30" cy="37" r="11" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="52" y1="37" x2="75" y2="37" stroke="#38bdf8" strokeWidth="2" />
          <text x="80" y="42" fill="#f87171" fontWeight="bold" fontSize="15">N≡N⁺</text>
          <text x="30" y="80" fill="#cbd5e1" fontSize="11">Diazonium Electrophile</text>
        </g>

        {/* Plus Sign */}
        <text x="175" y="102" fill="#f43f5e" fontWeight="bold" fontSize="24">+</text>

        {/* Phenoxide / Phenol Ion */}
        <g transform="translate(200, 60)">
          <polygon points="30,15 52,26 52,48 30,59 8,48 8,26" fill="none" stroke="#10b981" strokeWidth="2" />
          <circle cx="30" cy="37" r="11" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="30" y1="15" x2="30" y2="-2" stroke="#10b981" strokeWidth="2" />
          <text x="24" y="-8" fill="#10b981" fontWeight="bold" fontSize="14">O⁻</text>
          <text x="15" y="80" fill="#a7f3d0" fontSize="11">Phenoxide Ion (pH 9-10)</text>
        </g>

        {/* Reaction Arrow */}
        <g transform="translate(310, 90)">
          <line x1="0" y1="0" x2="60" y2="0" stroke="#f43f5e" strokeWidth="3" />
          <polygon points="60,-6 72,0 60,6" fill="#f43f5e" />
          <text x="30" y="-12" fill="#fb7185" textAnchor="middle" fontSize="11" fontWeight="bold">Para-attack</text>
        </g>

        {/* Azo Dye Product: p-hydroxyazobenzene */}
        <g transform="translate(400, 60)">
          {/* Ring 1 */}
          <polygon points="30,15 52,26 52,48 30,59 8,48 8,26" fill="none" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="30" cy="37" r="11" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
          {/* Azo Bridge */}
          <line x1="52" y1="37" x2="80" y2="37" stroke="#f59e0b" strokeWidth="2.5" />
          <text x="83" y="42" fill="#f59e0b" fontWeight="bold" fontSize="15">N=N</text>
          <line x1="120" y1="37" x2="148" y2="37" stroke="#f59e0b" strokeWidth="2.5" />
          {/* Ring 2 */}
          <g transform="translate(140, 0)">
            <polygon points="30,15 52,26 52,48 30,59 8,48 8,26" fill="none" stroke="#10b981" strokeWidth="2" />
            <circle cx="30" cy="37" r="11" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="52" y1="37" x2="72" y2="37" stroke="#10b981" strokeWidth="2" />
            <text x="75" y="42" fill="#10b981" fontWeight="bold" fontSize="14">OH</text>
          </g>
          <text x="110" y="82" fill="#f97316" fontWeight="bold" fontSize="13">p-hydroxyazobenzene (Orange Dye)</text>
        </g>

        {/* pH Condition Box */}
        <rect x="180" y="170" width="440" height="38" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
        <text x="400" y="194" fill="#c7d2fe" textAnchor="middle" fontSize="12" fontWeight="bold">
          pH 9–10 converts Phenol into strongly nucleophilic Phenoxide C₆H₅O⁻
        </text>
      </svg>
    </div>
  );
};

// SVG 4: Synthetic Roadmap Hub SVG
const SyntheticRoadmapSVG: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl shadow-lg border border-slate-700 my-4 text-center">
      <h4 className="text-cyan-400 font-bold mb-2 text-lg">Benzenediazonium Salt: Synthetic Hub of Aromatic Chemistry</h4>
      <svg viewBox="0 0 800 300" className="w-full h-auto max-h-80 mx-auto">
        {/* Central Hub */}
        <circle cx="400" cy="150" r="55" fill="#1e293b" stroke="#06b6d4" strokeWidth="3" />
        <text x="400" y="145" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="13">C₆H₅N₂⁺Cl⁻</text>
        <text x="400" y="162" fill="#94a3b8" textAnchor="middle" fontSize="10">Diazonium Salt</text>

        {/* Top: Chlorobenzene */}
        <line x1="400" y1="95" x2="400" y2="40" stroke="#10b981" strokeWidth="2" />
        <rect x="340" y="10" width="120" height="32" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
        <text x="400" y="30" fill="#a7f3d0" textAnchor="middle" fontWeight="bold" fontSize="12">C₆H₅Cl (Cu₂Cl₂/HCl)</text>

        {/* Top Right: Bromobenzene */}
        <line x1="445" y1="115" x2="580" y2="50" stroke="#10b981" strokeWidth="2" />
        <rect x="580" y="30" width="130" height="32" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
        <text x="645" y="50" fill="#a7f3d0" textAnchor="middle" fontWeight="bold" fontSize="12">C₆H₅Br (Cu₂Br₂/HBr)</text>

        {/* Right: Benzonitrile */}
        <line x1="455" y1="150" x2="620" y2="150" stroke="#f59e0b" strokeWidth="2" />
        <rect x="620" y="134" width="130" height="32" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
        <text x="685" y="154" fill="#fef08a" textAnchor="middle" fontWeight="bold" fontSize="12">C₆H₅CN (CuCN/KCN)</text>

        {/* Bottom Right: Iodobenzene */}
        <line x1="440" y1="185" x2="570" y2="240" stroke="#a855f7" strokeWidth="2" />
        <rect x="570" y="225" width="120" height="32" rx="6" fill="#581c87" stroke="#a855f7" strokeWidth="1" />
        <text x="630" y="245" fill="#e9d5ff" textAnchor="middle" fontWeight="bold" fontSize="12">C₆H₅I (KI / Δ)</text>

        {/* Bottom: Benzene */}
        <line x1="400" y1="205" x2="400" y2="260" stroke="#ef4444" strokeWidth="2" />
        <rect x="330" y="260" width="140" height="32" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" />
        <text x="400" y="280" fill="#fca5a5" textAnchor="middle" fontWeight="bold" fontSize="12">C₆H₆ (H₃PO₂ / EtOH)</text>

        {/* Bottom Left: Phenol */}
        <line x1="360" y1="185" x2="230" y2="240" stroke="#3b82f6" strokeWidth="2" />
        <rect x="150" y="225" width="120" height="32" rx="6" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1" />
        <text x="210" y="245" fill="#bfdbfe" textAnchor="middle" fontWeight="bold" fontSize="12">C₆H₅OH (H₂O / Δ)</text>

        {/* Left: Fluorobenzene */}
        <line x1="345" y1="150" x2="180" y2="150" stroke="#ec4899" strokeWidth="2" />
        <rect x="50" y="134" width="130" height="32" rx="6" fill="#831843" stroke="#ec4899" strokeWidth="1" />
        <text x="115" y="154" fill="#fbcfe8" textAnchor="middle" fontWeight="bold" fontSize="12">C₆H₅F (HBF₄ / Δ)</text>

        {/* Top Left: Nitrobenzene */}
        <line x1="355" y1="115" x2="220" y2="50" stroke="#eab308" strokeWidth="2" />
        <rect x="100" y="30" width="130" height="32" rx="6" fill="#713f12" stroke="#eab308" strokeWidth="1" />
        <text x="165" y="50" fill="#fef08a" textAnchor="middle" fontWeight="bold" fontSize="12">C₆H₅NO₂ (NaNO₂/Cu)</text>
      </svg>
    </div>
  );
};

// Main Component
export default function C12_ChemistryDiazoniumsaltsSim({
  onComplete
}: {
  onComplete?: (score: number) => void;
}) {
  // State tracking
  const [activeTab, setActiveTab] = useState<'scenario' | 'lab' | 'challenges' | 'roadmap'>('scenario');
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);
  
  // Discovery Question state
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Lab 1 Interactive Simulation state: Diazotisation
  const [lab1Temp, setLab1Temp] = useState<number>(2); // 0 to 25 °C
  const [lab1NaNO2Rate, setLab1NaNO2Rate] = useState<number>(5); // mmol/min
  const [lab1IceBath, setLab1IceBath] = useState<boolean>(true);
  const [lab1N2GasEvolved, setLab1N2GasEvolved] = useState<number>(0);
  const [lab1PhenolYield, setLab1PhenolYield] = useState<number>(0);
  const [lab1DiazoniumYield, setLab1DiazoniumYield] = useState<number>(95);

  // Lab 2 Interactive Simulation state: Nucleophilic Substitution
  const [selectedReagent, setSelectedReagent] = useState<string>('CuCl/HCl');
  const [substTemp, setSubstTemp] = useState<number>(25);
  const [substProductYield, setSubstProductYield] = useState<number>(0);
  const [substProductName, setSubstProductName] = useState<string>('');
  const [substGasBubbles, setSubstGasBubbles] = useState<boolean>(false);

  // Lab 3 Interactive Simulation state: Dye Coupling
  const [couplingPartner, setCouplingPartner] = useState<'phenol' | 'aniline' | 'beta-naphthol'>('phenol');
  const [couplingPH, setCouplingPH] = useState<number>(9.5);
  const [dyeColorHex, setDyeColorHex] = useState<string>('#f97316');
  const [dyeYield, setDyeYield] = useState<number>(92);
  const [lambdaMax, setLambdaMax] = useState<number>(430);

  // Lab 4 Synthetic Roadmap state
  const [targetCompound, setTargetCompound] = useState<string>('Fluorobenzene');
  const [userRoadmapSteps, setUserRoadmapSteps] = useState<string[]>([]);
  const [roadmapSuccess, setRoadmapSuccess] = useState<boolean>(false);

  // Lab 5 Resonance explorer state
  const [resonanceMolecule, setResonanceMolecule] = useState<'aryl' | 'alkyl'>('aryl');

  // Prediction & Observation state
  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [predictionSubmitted, setPredictionSubmitted] = useState<boolean[]>([false, false]);
  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);
  const [observationSubmitted, setObservationSubmitted] = useState<boolean[]>([false, false]);

  // Challenges Tab State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintIndex, setCurrentHintIndex] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // BKT and SRS tracking states
  const [bktStates, setBktStates] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReviewItem>>(() => {
    const initial: Record<string, ReviewItem> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Timer for automatic hint trigger after inactivity
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Canvas Ref for Lab 1 Reaction Flask
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Speech Helper Call
  const speakText = useCallback((text: string) => {
    if (typeof window !== 'undefined' && speechManager) {
      speechManager.speak(text);
    }
  }, []);

  // Audio helper
  const playSound = useCallback((sound: SoundEffect) => {
    try {
      audioManager.play(sound);
    } catch {
      // Audio fallback
    }
  }, []);

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (!isAnswerSubmitted && activeTab === 'challenges') {
        setShowHint(true);
        playSound('hint');
      }
    }, 12000);
  }, [isAnswerSubmitted, activeTab, playSound]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, selectedOption, numericInput, resetInactivityTimer]);

  // Effect: Lab 1 Temperature simulation logic
  useEffect(() => {
    let diazonium = 100;
    let n2Gas = 0;
    let phenol = 0;

    if (!lab1IceBath) {
      const temp = lab1Temp;
      if (temp > 5) {
        const decompFactor = (temp - 5) * 4;
        n2Gas = Math.min(100, decompFactor * 2.5);
        phenol = Math.min(100, decompFactor * 2.5);
        diazonium = Math.max(0, 100 - phenol);
      }
    } else {
      if (lab1Temp > 5) {
        const decomp = (lab1Temp - 5) * 3;
        n2Gas = Math.min(100, decomp);
        phenol = Math.min(100, decomp);
        diazonium = Math.max(0, 100 - phenol);
      } else {
        diazonium = 98;
        n2Gas = 0;
        phenol = 0;
      }
    }

    setLab1DiazoniumYield(Math.round(diazonium));
    setLab1N2GasEvolved(Math.round(n2Gas));
    setLab1PhenolYield(Math.round(phenol));
  }, [lab1Temp, lab1IceBath, lab1NaNO2Rate]);

  // Effect: Lab 2 Reagent Substitution Calculator
  useEffect(() => {
    switch (selectedReagent) {
      case 'CuCl/HCl':
        setSubstProductName('Chlorobenzene (C₆H₅Cl)');
        setSubstProductYield(88);
        setSubstGasBubbles(true);
        break;
      case 'CuBr/HBr':
        setSubstProductName('Bromobenzene (C₆H₅Br)');
        setSubstProductYield(84);
        setSubstGasBubbles(true);
        break;
      case 'CuCN/KCN':
        setSubstProductName('Benzonitrile (C₆H₅CN)');
        setSubstProductYield(82);
        setSubstGasBubbles(true);
        break;
      case 'Cu/HCl':
        setSubstProductName('Chlorobenzene (Gattermann)');
        setSubstProductYield(55);
        setSubstGasBubbles(true);
        break;
      case 'KI':
        setSubstProductName('Iodobenzene (C₆H₅I)');
        setSubstProductYield(92);
        setSubstGasBubbles(true);
        break;
      case 'HBF4':
        setSubstProductName('Fluorobenzene (via Schiemann)');
        setSubstProductYield(78);
        setSubstGasBubbles(true);
        break;
      case 'H3PO2':
        setSubstProductName('Benzene (C₆H₆) [Deamination]');
        setSubstProductYield(90);
        setSubstGasBubbles(true);
        break;
      case 'H2O/Δ':
        setSubstProductName('Phenol (C₆H₅OH)');
        setSubstProductYield(95);
        setSubstGasBubbles(true);
        break;
      default:
        setSubstProductName('');
        setSubstProductYield(0);
        setSubstGasBubbles(false);
    }
  }, [selectedReagent, substTemp]);

  // Effect: Lab 3 pH & Coupling Color Calculation
  useEffect(() => {
    if (couplingPartner === 'phenol') {
      if (couplingPH >= 8.5 && couplingPH <= 11) {
        setDyeColorHex('#f97316'); // Vibrant Orange
        setDyeYield(94);
        setLambdaMax(430);
      } else if (couplingPH < 8.5) {
        setDyeColorHex('#fed7aa'); // Very faint orange
        setDyeYield(15);
        setLambdaMax(410);
      } else {
        setDyeColorHex('#d97706'); // Decomposed
        setDyeYield(40);
        setLambdaMax(450);
      }
    } else if (couplingPartner === 'aniline') {
      if (couplingPH >= 4.0 && couplingPH <= 6.0) {
        setDyeColorHex('#eab308'); // Bright Yellow
        setDyeYield(90);
        setLambdaMax(390);
      } else if (couplingPH < 4.0) {
        setDyeColorHex('#fef08a'); // Unreactive anilinium
        setDyeYield(10);
        setLambdaMax(380);
      } else {
        setDyeColorHex('#ca8a04'); // Diazotate formed
        setDyeYield(35);
        setLambdaMax(410);
      }
    } else if (couplingPartner === 'beta-naphthol') {
      if (couplingPH >= 9.0 && couplingPH <= 12.0) {
        setDyeColorHex('#dc2626'); // Intense Red
        setDyeYield(96);
        setLambdaMax(490);
      } else {
        setDyeColorHex('#fca5a5');
        setDyeYield(20);
        setLambdaMax(460);
      }
    }
  }, [couplingPartner, couplingPH]);

  // Canvas Drawing for Diazotisation Lab
  useEffect(() => {
    if (activeTab !== 'lab' || activeLabIndex !== 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particleOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Reaction Flask
      ctx.beginPath();
      ctx.moveTo(120, 40);
      ctx.lineTo(180, 40);
      ctx.lineTo(180, 100);
      ctx.lineTo(240, 200);
      ctx.arc(150, 200, 90, 0.1 * Math.PI, 0.9 * Math.PI, false);
      ctx.lineTo(120, 100);
      ctx.closePath();
      ctx.fillStyle = '#1e293b';
      ctx.fill();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Liquid Solution
      ctx.beginPath();
      ctx.arc(150, 200, 84, 0.15 * Math.PI, 0.85 * Math.PI, false);
      ctx.lineTo(228, 185);
      ctx.lineTo(72, 185);
      ctx.closePath();
      
      // Solution color based on temperature/phenol decomposition
      if (lab1Temp > 5) {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.6)'; // Reddish phenol decomp
      } else {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.5)'; // Clear pale blue diazonium
      }
      ctx.fill();

      // Ice Bath surround
      if (lab1IceBath) {
        ctx.fillStyle = 'rgba(224, 242, 254, 0.3)';
        ctx.fillRect(40, 210, 220, 60);
        ctx.strokeStyle = '#7dd3fc';
        ctx.strokeRect(40, 210, 220, 60);
        ctx.fillStyle = '#bae6fd';
        ctx.font = '12px sans-serif';
        ctx.fillText('ICE + SALT BATH (0-5 °C)', 70, 245);
      }

      // N2 Bubbles if T > 5 °C
      if (lab1Temp > 5) {
        particleOffset = (particleOffset + 1.5) % 80;
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 12; i++) {
          const bx = 100 + (i * 11) % 100;
          const by = 220 - ((particleOffset + i * 15) % 120);
          if (by > 50 && by < 220) {
            ctx.beginPath();
            ctx.arc(bx, by, 3 + (i % 3), 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText('N₂ Gas Bubbles Escaping!', 80, 80);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTab, activeLabIndex, lab1Temp, lab1IceBath]);

  // RoadMap Step Click handler
  const handleRoadmapAddStep = (stepText: string) => {
    playSound('tap');
    setUserRoadmapSteps(prev => [...prev, stepText]);
  };

  const handleResetRoadmap = () => {
    playSound('pop');
    setUserRoadmapSteps([]);
    setRoadmapSuccess(false);
  };

  const verifyRoadmap = () => {
    if (targetCompound === 'Fluorobenzene') {
      if (
        userRoadmapSteps.length === 3 &&
        userRoadmapSteps[0].includes('Fe/HCl') &&
        userRoadmapSteps[1].includes('NaNO₂ + HBF₄') &&
        userRoadmapSteps[2].includes('Heat dry salt')
      ) {
        setRoadmapSuccess(true);
        playSound('celebration');
        speakText('Excellent! You successfully synthesized Fluorobenzene via the Schiemann reaction!');
      } else {
        playSound('error');
        speakText('Incorrect synthetic sequence. Re-evaluate the required steps.');
      }
    } else if (targetCompound === '1,3,5-Tribromobenzene') {
      if (
        userRoadmapSteps.length === 3 &&
        userRoadmapSteps[0].includes('Br₂ / H₂O') &&
        userRoadmapSteps[1].includes('NaNO₂ + HCl') &&
        userRoadmapSteps[2].includes('H₃PO₂ / H₂O')
      ) {
        setRoadmapSuccess(true);
        playSound('celebration');
        speakText('Outstanding! 1,3,5-tribromobenzene masterfully synthesized via deamination!');
      } else {
        playSound('error');
        speakText('Sequence incorrect. Check directed orientation and deamination step.');
      }
    }
  };

  // Discovery Question handler
  const handleDiscoverySubmit = () => {
    if (discoverySelected === null) return;
    setDiscoverySubmitted(true);
    if (discoverySelected === DISCOVERY_QUESTION.correctIndex) {
      playSound('drop-correct');
      speakText('Correct! Diazonium salts hydrolyse above 5 degrees Celsius yielding phenol and nitrogen gas.');
    } else {
      playSound('drop-wrong');
      speakText('Incorrect. Consider the thermal stability limit of aqueous diazonium salts.');
    }
  };

  // Prediction submit handler
  const handlePredictionSubmit = (index: number) => {
    if (predictionAnswers[index] === null) return;
    const newSubmitted = [...predictionSubmitted];
    newSubmitted[index] = true;
    setPredictionSubmitted(newSubmitted);

    if (predictionAnswers[index] === PREDICTION_QUESTIONS[index].correctIndex) {
      playSound('success');
      speakText('Prediction verified correctly!');
    } else {
      playSound('error');
    }
  };

  // Observation submit handler
  const handleObservationSubmit = (index: number) => {
    if (observationAnswers[index] === null) return;
    const newSubmitted = [...observationSubmitted];
    newSubmitted[index] = true;
    setObservationSubmitted(newSubmitted);

    if (observationAnswers[index] === OBSERVATION_QUESTIONS[index].correctIndex) {
      playSound('chime');
      speakText('Observation confirmed!');
    } else {
      playSound('error');
    }
  };

  // Current challenge retrieval
  const currentChallenge = CHALLENGES[currentChallengeIndex];

  // Challenge Answer Submission Handler
  const handleChallengeSubmit = () => {
    if (isAnswerSubmitted) return;

    let isCorrect = false;

    if (currentChallenge.type === 'mcq') {
      if (selectedOption === currentChallenge.correctIndex) {
        isCorrect = true;
      }
    } else if (currentChallenge.type === 'numeric') {
      const val = parseFloat(numericInput.trim());
      if (!isNaN(val) && val === currentChallenge.correctAnswer) {
        isCorrect = true;
      }
    }

    setIsAnswerSubmitted(true);

    // Update BKT State for current challenge nodeId
    const nodeId = currentChallenge.nodeId;
    const oldBkt = bktStates[nodeId] || createBKTState();
    const updatedBkt = bktUpdate(oldBkt, isCorrect);
    setBktStates(prev => ({ ...prev, [nodeId]: updatedBkt }));

    // Update SM2 SRS state
    const oldSrs = srsItems[nodeId] || createReviewItem(nodeId);
    const updatedSrs = sm2Update(oldSrs, isCorrect ? 5 : 2);
    setSrsItems(prev => ({ ...prev, [nodeId]: updatedSrs }));

    if (isCorrect) {
      setChallengeScore(prev => prev + 10);
      playSound('success');
      setShowSparkle(true);
      speakText('Correct answer! Well done.');

      if (currentChallengeIndex === CHALLENGES.length - 1) {
        setShowConfetti(true);
        setShowSuccessBanner(true);
        playSound('celebration');
        speakText('Congratulations! You have completed all diazonium salt mastery challenges!');
        if (onComplete) {
          recordGameScore('c12_chem_diazonium_salts', challengeScore + 10);
          onComplete(challengeScore + 10);
        }
      }
    } else {
      playSound('error');
      speakText('Incorrect answer. Review the concept and detailed explanation.');
    }
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      setSelectedOption(null);
      setNumericInput('');
      setIsAnswerSubmitted(false);
      setShowHint(false);
      setCurrentHintIndex(0);
      setShowSparkle(false);
      playSound('swoop');
    }
  };

  const handlePrevChallenge = () => {
    if (currentChallengeIndex > 0) {
      setCurrentChallengeIndex(prev => prev - 1);
      setSelectedOption(null);
      setNumericInput('');
      setIsAnswerSubmitted(false);
      setShowHint(false);
      setCurrentHintIndex(0);
      setShowSparkle(false);
      playSound('swoop');
    }
  };

  // Overall Mastery Calculation
  const overallMasteryPercent = useMemo(() => {
    let total = 0;
    ALL_NODE_IDS.forEach(id => {
      const st = bktStates[id];
      total += st ? masteryProb(st) : 0;
    });
    return Math.round((total / ALL_NODE_IDS.length) * 100);
  }, [bktStates]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-2 sm:p-6 select-none">
      {/* Header Banner */}
      <header className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-6 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="px-3 py-1 bg-cyan-950 text-cyan-400 border border-cyan-700/50 rounded-full text-xs font-semibold uppercase tracking-wider">
              ISC Class 12 Chemistry • Module 81–90
            </span>
            <span className="px-3 py-1 bg-amber-950 text-amber-400 border border-amber-700/50 rounded-full text-xs font-semibold">
              Mastery: {overallMasteryPercent}%
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Benzenediazonium Salts & Synthetic Chemistry
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Diazotisation, Sandmeyer, Gattermann, Schiemann, Deamination & Azo Dye Synthesis
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => { setActiveTab('scenario'); playSound('tap'); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'scenario'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Scenario & Discovery
          </button>
          <button
            onClick={() => { setActiveTab('lab'); playSound('tap'); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'lab'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Interactive Labs (5)
          </button>
          <button
            onClick={() => { setActiveTab('challenges'); playSound('tap'); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'challenges'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Adaptive Challenges ({CHALLENGES.length})
          </button>
          <button
            onClick={() => { setActiveTab('roadmap'); playSound('tap'); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'roadmap'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Roadmap & Real-World
          </button>
        </div>
      </header>

      {/* TAB 0: SCENARIO & DISCOVERY */}
      {activeTab === 'scenario' && (
        <main className="max-w-7xl mx-auto space-y-6">
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-cyan-400 mb-3">{SCENARIO.title}</h2>
            <p className="text-slate-300 leading-relaxed mb-4">{SCENARIO.intro}</p>
            <p className="text-slate-400 leading-relaxed text-sm bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              {SCENARIO.context}
            </p>
          </section>

          {/* Discovery Question Section */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 bg-amber-500/10 text-amber-400 rounded-lg font-bold text-sm">
                Discovery Challenge
              </span>
              <h3 className="text-lg font-semibold text-white">Pre-Lab Preconception Test</h3>
            </div>
            
            <p className="text-slate-200 font-medium mb-4 text-base">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-3 mb-6">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (!discoverySubmitted) {
                      setDiscoverySelected(idx);
                      playSound('tap');
                    }
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    discoverySelected === idx
                      ? 'border-cyan-500 bg-cyan-950/40 text-white'
                      : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold mr-3">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </button>
              ))}
            </div>

            {!discoverySubmitted ? (
              <button
                onClick={handleDiscoverySubmit}
                disabled={discoverySelected === null}
                className={`px-6 py-3 rounded-xl font-semibold text-white transition-all ${
                  discoverySelected !== null
                    ? 'bg-cyan-600 hover:bg-cyan-500 shadow-lg shadow-cyan-600/30'
                    : 'bg-slate-800 opacity-50 cursor-not-allowed'
                }`}
              >
                Submit Discovery Hypothesis
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <p className={`font-semibold mb-2 ${
                  discoverySelected === DISCOVERY_QUESTION.correctIndex ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {discoverySelected === DISCOVERY_QUESTION.correctIndex
                    ? '✓ Correct Hypothesis!'
                    : '✗ Incorrect Hypothesis.'}
                </p>
                <p className="text-slate-300 text-sm">{DISCOVERY_QUESTION.hintAfter}</p>
              </div>
            )}
          </section>

          {/* Interactive Molecular Resonance Diagram */}
          <DiazoniumResonanceSVG />

          {/* Common Misconceptions Overview */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-amber-400 mb-4">Critical Misconceptions & Corrections</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISCONCEPTIONS.map((m) => (
                <div key={m.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p className="text-rose-400 font-semibold text-xs uppercase tracking-wider mb-1">
                    Misconception: {m.misconception}
                  </p>
                  <p className="text-emerald-400 text-sm font-medium">
                    Correction: <span className="text-slate-300 font-normal">{m.correction}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* TAB 1: INTERACTIVE LABS */}
      {activeTab === 'lab' && (
        <main className="max-w-7xl mx-auto space-y-6">
          {/* Exploration Steps Navigation */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap gap-2">
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveLabIndex(idx);
                  playSound('tap');
                  speakText(step.title);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  activeLabIndex === idx
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                    : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>

          {/* Lab 1: Diazotisation Temperature & Yield */}
          {activeLabIndex === 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-cyan-400">{EXPLORATION_STEPS[0].title}</h3>
                <p className="text-slate-300 text-sm mt-1">{EXPLORATION_STEPS[0].instruction}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                {/* Controls */}
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-5">
                  <div>
                    <div className="flex justify-between text-sm font-medium mb-2">
                      <span className="text-slate-300">Ice Bath Thermostat Temperature:</span>
                      <span className={lab1Temp > 5 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                        {lab1Temp} °C
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="25"
                      value={lab1Temp}
                      onChange={(e) => setLab1Temp(parseInt(e.target.value))}
                      className="w-full accent-cyan-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <span className="text-sm font-medium text-slate-200">Maintain Ice/Salt Bath (0–5 °C):</span>
                    <button
                      onClick={() => {
                        setLab1IceBath(!lab1IceBath);
                        if (!lab1IceBath) setLab1Temp(2);
                        playSound('tap');
                      }}
                      className={`px-4 py-2 rounded-lg font-semibold text-xs transition-all ${
                        lab1IceBath
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                      }`}
                    >
                      {lab1IceBath ? 'ICE BATH ACTIVE' : 'NO ICE BATH'}
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center pt-2">
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <p className="text-xs text-slate-400">ArN₂⁺Cl⁻ Yield</p>
                      <p className="text-lg font-bold text-cyan-400">{lab1DiazoniumYield}%</p>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <p className="text-xs text-slate-400">N₂ Gas Liberated</p>
                      <p className="text-lg font-bold text-amber-400">{lab1N2GasEvolved}%</p>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <p className="text-xs text-slate-400">Phenol Byproduct</p>
                      <p className="text-lg font-bold text-rose-400">{lab1PhenolYield}%</p>
                    </div>
                  </div>
                </div>

                {/* Live Canvas Visualizer */}
                <div className="flex flex-col items-center justify-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <canvas ref={canvasRef} width={300} height={280} className="rounded-lg" />
                </div>
              </div>
            </div>
          )}

          {/* Lab 2: Nucleophilic Replacement Reactions */}
          {activeLabIndex === 1 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-cyan-400">{EXPLORATION_STEPS[1].title}</h3>
                <p className="text-slate-300 text-sm mt-1">{EXPLORATION_STEPS[1].instruction}</p>
              </div>

              <SandmeyerVsGattermannSVG />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                  <label className="block text-sm font-semibold text-slate-200">
                    Select Catalytic Reagent / Nucleophile:
                  </label>
                  <select
                    value={selectedReagent}
                    onChange={(e) => {
                      setSelectedReagent(e.target.value);
                      playSound('tap');
                    }}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-cyan-500"
                  >
                    <option value="CuCl/HCl">CuCl / HCl (Sandmeyer - Chlorobenzene)</option>
                    <option value="CuBr/HBr">CuBr / HBr (Sandmeyer - Bromobenzene)</option>
                    <option value="CuCN/KCN">CuCN / KCN (Sandmeyer - Benzonitrile)</option>
                    <option value="Cu/HCl">Cu Powder / HCl (Gattermann - Chlorobenzene)</option>
                    <option value="KI">KI solution / Warm (Replacement by Iodide)</option>
                    <option value="HBF4">HBF₄ then Warm Dry Salt (Schiemann - Fluorobenzene)</option>
                    <option value="H3PO2">H₃PO₂ / H₂O (Reduction to Benzene)</option>
                    <option value="H2O/Δ">H₂O + Boil &gt; 10 °C (Hydrolysis to Phenol)</option>
                  </select>

                  <div className="pt-4">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Target Substitution Result</p>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-emerald-400 text-base">{substProductName}</p>
                        <p className="text-slate-400 text-xs">Reaction Yield: {substProductYield}%</p>
                      </div>
                      {substGasBubbles && (
                        <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full animate-pulse">
                          N₂ ↑ Gas Evolving
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col justify-center">
                  <h4 className="font-bold text-amber-400 text-sm mb-2">Reaction Summary & Mechanism Note:</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Benzenediazonium chloride acts as an extremely potent leaving group (-N₂⁺ departs as stable N₂ gas).
                    Sandmeyer reactions proceed via Single Electron Transfer (SET) creating aryl free radicals, whereas KI and H₂O undergo direct nucleophilic displacement.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Lab 3: Dye Coupling Lab */}
          {activeLabIndex === 2 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-cyan-400">{EXPLORATION_STEPS[2].title}</h3>
                <p className="text-slate-300 text-sm mt-1">{EXPLORATION_STEPS[2].instruction}</p>
              </div>

              <AzoDyeCouplingSVG />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">
                      Select Aromatic Coupling Component:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => { setCouplingPartner('phenol'); setCouplingPH(9.5); playSound('tap'); }}
                        className={`p-3 rounded-xl text-xs font-bold transition-all ${
                          couplingPartner === 'phenol'
                            ? 'bg-amber-600 text-white'
                            : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        Phenol (C₆H₅OH)
                      </button>
                      <button
                        onClick={() => { setCouplingPartner('aniline'); setCouplingPH(4.5); playSound('tap'); }}
                        className={`p-3 rounded-xl text-xs font-bold transition-all ${
                          couplingPartner === 'aniline'
                            ? 'bg-yellow-600 text-white'
                            : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        Aniline (C₆H₅NH₂)
                      </button>
                      <button
                        onClick={() => { setCouplingPartner('beta-naphthol'); setCouplingPH(10.0); playSound('tap'); }}
                        className={`p-3 rounded-xl text-xs font-bold transition-all ${
                          couplingPartner === 'beta-naphthol'
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        β-Naphthol
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm font-medium mb-2">
                      <span className="text-slate-300">Solution pH Level:</span>
                      <span className="text-cyan-400 font-bold">{couplingPH}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="14"
                      step="0.5"
                      value={couplingPH}
                      onChange={(e) => setCouplingPH(parseFloat(e.target.value))}
                      className="w-full accent-cyan-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <p className="text-xs text-slate-400 mt-1">
                      {couplingPartner === 'phenol' && 'Optimal range: pH 9.0–10.0 (Phenoxide Ion)'}
                      {couplingPartner === 'aniline' && 'Optimal range: pH 4.0–5.0 (Weakly Acidic)'}
                      {couplingPartner === 'beta-naphthol' && 'Optimal range: pH 9.0–11.0'}
                    </p>
                  </div>
                </div>

                {/* Spectrophotometer & Dye Vessel Display */}
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center">
                  <div
                    className="w-28 h-36 rounded-2xl shadow-2xl border-2 border-white/20 transition-all duration-500 mb-4 flex items-center justify-center"
                    style={{ backgroundColor: dyeColorHex }}
                  >
                    <span className="text-xs font-bold text-white drop-shadow-md bg-black/40 px-2 py-1 rounded">
                      Dye Solution
                    </span>
                  </div>
                  <p className="font-bold text-white text-base">Azo Dye Precipitate Yield: {dyeYield}%</p>
                  <p className="text-xs text-slate-400 mt-1">Absorption Peak λ_max: {lambdaMax} nm (Visible Spectrum)</p>
                </div>
              </div>
            </div>
          )}

          {/* Lab 4: Multi-step Synthetic Roadmap Visualizer */}
          {activeLabIndex === 3 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-cyan-400">{EXPLORATION_STEPS[3].title}</h3>
                <p className="text-slate-300 text-sm mt-1">{EXPLORATION_STEPS[3].instruction}</p>
              </div>

              <SyntheticRoadmapSVG />

              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1">
                      Select Synthesis Target:
                    </label>
                    <select
                      value={targetCompound}
                      onChange={(e) => {
                        setTargetCompound(e.target.value);
                        handleResetRoadmap();
                      }}
                      className="bg-slate-900 border border-slate-700 text-cyan-400 font-bold rounded-xl p-2.5 text-sm"
                    >
                      <option value="Fluorobenzene">Fluorobenzene (from Benzene)</option>
                      <option value="1,3,5-Tribromobenzene">1,3,5-Tribromobenzene (from Aniline)</option>
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={verifyRoadmap}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all"
                    >
                      Test Synthesis Pathway
                    </button>
                    <button
                      onClick={handleResetRoadmap}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl"
                    >
                      Reset Steps
                    </button>
                  </div>
                </div>

                {/* Available Step Palette */}
                <div>
                  <p className="text-xs text-slate-400 mb-2">Click steps in correct chronological order:</p>
                  <div className="flex flex-wrap gap-2">
                    {targetCompound === 'Fluorobenzene' ? (
                      <>
                        <button
                          onClick={() => handleRoadmapAddStep('Step: Fe/HCl Reduction to Aniline')}
                          className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg hover:border-cyan-500"
                        >
                          Step: Fe/HCl Reduction to Aniline
                        </button>
                        <button
                          onClick={() => handleRoadmapAddStep('Step: NaNO₂ + HBF₄ (0-5°C)')}
                          className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg hover:border-cyan-500"
                        >
                          Step: NaNO₂ + HBF₄ (0-5°C)
                        </button>
                        <button
                          onClick={() => handleRoadmapAddStep('Step: Heat dry salt (Schiemann)')}
                          className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg hover:border-cyan-500"
                        >
                          Step: Heat dry salt (Schiemann)
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleRoadmapAddStep('Step: Br₂ / H₂O Bromination')}
                          className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg hover:border-cyan-500"
                        >
                          Step: Br₂ / H₂O Bromination
                        </button>
                        <button
                          onClick={() => handleRoadmapAddStep('Step: NaNO₂ + HCl Diazotisation')}
                          className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg hover:border-cyan-500"
                        >
                          Step: NaNO₂ + HCl Diazotisation
                        </button>
                        <button
                          onClick={() => handleRoadmapAddStep('Step: H₃PO₂ / H₂O Deamination')}
                          className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg hover:border-cyan-500"
                        >
                          Step: H₃PO₂ / H₂O Deamination
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Selected Pathway Construction Display */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 min-h-[80px]">
                  <p className="text-xs text-slate-400 mb-2">Constructed Route:</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {userRoadmapSteps.map((st, i) => (
                      <React.Fragment key={i}>
                        {i > 0 && <span className="text-cyan-400 font-bold">➔</span>}
                        <span className="px-3 py-1 bg-cyan-950 border border-cyan-800 text-cyan-200 text-xs rounded-lg">
                          {st}
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {roadmapSuccess && (
                  <div className="p-4 bg-emerald-950 border border-emerald-700 text-emerald-300 rounded-xl font-bold text-sm">
                    ✓ Synthesis Sequence Validated! 100% Target Conversion Achieved.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Lab 5: Resonance Explorer */}
          {activeLabIndex === 4 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-cyan-400">{EXPLORATION_STEPS[4].title}</h3>
                <p className="text-slate-300 text-sm mt-1">{EXPLORATION_STEPS[4].instruction}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => { setResonanceMolecule('aryl'); playSound('tap'); }}
                  className={`p-6 rounded-2xl border text-left transition-all ${
                    resonanceMolecule === 'aryl'
                      ? 'border-cyan-500 bg-cyan-950/40'
                      : 'border-slate-800 bg-slate-950'
                  }`}
                >
                  <h4 className="font-bold text-cyan-400 text-lg mb-2">Benzenediazonium Cation (C₆H₅N₂⁺)</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Aromatic π-cloud overlaps with the empty orbital on nitrogen. Positive charge is distributed across ortho and para ring carbons.
                    Activation energy for N₂ departure is high (~100 kJ/mol), making it stable at 0-5 °C.
                  </p>
                </button>

                <button
                  onClick={() => { setResonanceMolecule('alkyl'); playSound('tap'); }}
                  className={`p-6 rounded-2xl border text-left transition-all ${
                    resonanceMolecule === 'alkyl'
                      ? 'border-rose-500 bg-rose-950/40'
                      : 'border-slate-800 bg-slate-950'
                  }`}
                >
                  <h4 className="font-bold text-rose-400 text-lg mb-2">Methanediazonium Cation (CH₃N₂⁺)</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    No aromatic ring present for resonance delocalization. The positive charge remains concentrated entirely on nitrogen.
                    Activation energy is near zero → Immediate spontaneous decomposition into CH₃⁺ and N₂ gas.
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Mandatory Prediction Questions */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-amber-400">Interactive Lab Predictions</h3>
            {PREDICTION_QUESTIONS.map((pred, i) => (
              <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <p className="text-slate-200 font-medium text-sm">{pred.question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pred.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        if (!predictionSubmitted[i]) {
                          const newAns = [...predictionAnswers];
                          newAns[i] = oIdx;
                          setPredictionAnswers(newAns);
                          playSound('tap');
                        }
                      }}
                      className={`text-left p-3 rounded-lg text-xs font-medium border transition-all ${
                        predictionAnswers[i] === oIdx
                          ? 'border-cyan-500 bg-cyan-950/50 text-white'
                          : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {!predictionSubmitted[i] ? (
                  <button
                    onClick={() => handlePredictionSubmit(i)}
                    disabled={predictionAnswers[i] === null}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-lg transition-all"
                  >
                    Verify Prediction
                  </button>
                ) : (
                  <div className="p-3 bg-slate-900 rounded-lg text-xs">
                    <p className={predictionAnswers[i] === pred.correctIndex ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {predictionAnswers[i] === pred.correctIndex ? '✓ Verified!' : '✗ Incorrect Prediction'}
                    </p>
                    <p className="text-slate-400 mt-1">{pred.verifyInstruction}</p>
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* Mandatory Observation Questions */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-emerald-400">Lab Observations & Verification</h3>
            {OBSERVATION_QUESTIONS.map((obs, i) => (
              <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <p className="text-slate-200 font-medium text-sm">{obs.question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {obs.observableOptions.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        if (!observationSubmitted[i]) {
                          const newAns = [...observationAnswers];
                          newAns[i] = oIdx;
                          setObservationAnswers(newAns);
                          playSound('tap');
                        }
                      }}
                      className={`text-left p-3 rounded-lg text-xs font-medium border transition-all ${
                        observationAnswers[i] === oIdx
                          ? 'border-emerald-500 bg-emerald-950/50 text-white'
                          : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {!observationSubmitted[i] ? (
                  <button
                    onClick={() => handleObservationSubmit(i)}
                    disabled={observationAnswers[i] === null}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-all"
                  >
                    Confirm Observation
                  </button>
                ) : (
                  <div className="p-3 bg-slate-900 rounded-lg text-xs">
                    <p className={observationAnswers[i] === obs.correctIndex ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {observationAnswers[i] === obs.correctIndex ? '✓ Observation Confirmed!' : '✗ Incorrect Observation'}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </section>
        </main>
      )}

      {/* TAB 2: ADAPTIVE CHALLENGES */}
      {activeTab === 'challenges' && (
        <main className="max-w-4xl mx-auto space-y-6">
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <span className="ml-3 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300">
                  {currentChallenge.difficulty.toUpperCase()}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Total Score</span>
                <p className="text-xl font-extrabold text-amber-400">{challengeScore} pts</p>
              </div>
            </div>

            <p className="text-lg font-medium text-slate-100 mb-6 leading-relaxed">
              {currentChallenge.question}
            </p>

            {/* MCQ Options */}
            {currentChallenge.type === 'mcq' && currentChallenge.options && (
              <div className="space-y-3 mb-6">
                {currentChallenge.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!isAnswerSubmitted) {
                        setSelectedOption(idx);
                        playSound('tap');
                      }
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedOption === idx
                        ? 'border-cyan-500 bg-cyan-950/40 text-white'
                        : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-3 text-cyan-400">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Numeric Input Option */}
            {currentChallenge.type === 'numeric' && (
              <div className="mb-6">
                <label className="block text-sm text-slate-300 mb-2">Enter numerical value:</label>
                <input
                  type="number"
                  step="any"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  disabled={isAnswerSubmitted}
                  placeholder="e.g. 2 or 5.6"
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-4 text-base focus:outline-none focus:border-cyan-500"
                />
              </div>
            )}

            {/* Submit & Hint Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setShowHint(true);
                  playSound('hint');
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all"
              >
                💡 Need Hint?
              </button>

              {!isAnswerSubmitted ? (
                <button
                  onClick={handleChallengeSubmit}
                  disabled={
                    currentChallenge.type === 'mcq'
                      ? selectedOption === null
                      : numericInput.trim() === ''
                  }
                  className={`px-6 py-3 rounded-xl font-bold text-white transition-all ${
                    (currentChallenge.type === 'mcq' && selectedOption !== null) ||
                    (currentChallenge.type === 'numeric' && numericInput.trim() !== '')
                      ? 'bg-cyan-600 hover:bg-cyan-500 shadow-lg shadow-cyan-600/30'
                      : 'bg-slate-800 opacity-50 cursor-not-allowed'
                  }`}
                >
                  Submit Final Answer
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevChallenge}
                    disabled={currentChallengeIndex === 0}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl disabled:opacity-40"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={handleNextChallenge}
                    disabled={currentChallengeIndex === CHALLENGES.length - 1}
                    className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-600/30 disabled:opacity-40"
                  >
                    Next Challenge →
                  </button>
                </div>
              )}
            </div>

            {/* Feedback / Explanation display */}
            {isAnswerSubmitted && (
              <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <p className={`font-bold mb-2 ${
                  (currentChallenge.type === 'mcq' && selectedOption === currentChallenge.correctIndex) ||
                  (currentChallenge.type === 'numeric' && parseFloat(numericInput.trim()) === currentChallenge.correctAnswer)
                    ? 'text-emerald-400'
                    : 'text-rose-400'
                }`}>
                  {(currentChallenge.type === 'mcq' && selectedOption === currentChallenge.correctIndex) ||
                  (currentChallenge.type === 'numeric' && parseFloat(numericInput.trim()) === currentChallenge.correctAnswer)
                    ? '✓ Correct Solution!'
                    : '✗ Incorrect Answer'}
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">{currentChallenge.explanation}</p>
              </div>
            )}
          </section>

          {/* Component Feedbacks */}
          <HintBubble
            show={showHint}
            text={currentChallenge.hints[currentHintIndex] || currentChallenge.hints[0]}
          />
          <Confetti show={showConfetti} />
          <SuccessBanner show={showSuccessBanner} text="Diazonium Salt Mastery Complete!" />
          <SparkleBurst show={showSparkle} x={400} y={300} />
        </main>
      )}

      {/* TAB 3: ROADMAP & REAL-WORLD ACTIVITY */}
      {activeTab === 'roadmap' && (
        <main className="max-w-7xl mx-auto space-y-6">
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-cyan-400 mb-2">{REAL_WORLD_ACTIVITY.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">{REAL_WORLD_ACTIVITY.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REAL_WORLD_ACTIVITY.steps.map((stepText, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex gap-3 items-start">
                  <span className="w-7 h-7 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-slate-300 text-xs leading-relaxed">{stepText}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ISC Nodes Concept Mastery Breakdown Table */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4">Node-by-Node Mastery Summary (ISC Curriculum)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {ALL_NODE_IDS.map((nodeId) => {
                const bkt = bktStates[nodeId];
                const level = bkt ? Math.round(masteryProb(bkt) * 100) : 0;
                return (
                  <div key={nodeId} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                    <p className="text-xs text-slate-400 font-mono">{nodeId}</p>
                    <p className="text-base font-bold text-cyan-400 my-1">{level}%</p>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-cyan-500 h-full" style={{ width: `${level}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      )}
    </div>
  );
}