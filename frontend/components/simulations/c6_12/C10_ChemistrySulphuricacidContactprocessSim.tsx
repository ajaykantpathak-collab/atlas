"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// NODE IDS & METADATA
// ==========================================
const ALL_NODE_IDS = [
  'c10_chem_061', // Contact process
  'c10_chem_062', // H2SO4 acid properties
  'c10_chem_063', // H2SO4 oxidising & dehydrating
  'c10_chem_064', // H2SO4 tests (BaCl2, non-volatile)
  'c10_chem_065', // Carbon tetravalency & catenation
  'c10_chem_066', // Single, double, triple carbon bonds
  'c10_chem_067', // Straight, branched, cyclic (benzene)
  'c10_chem_068', // Structural isomerism (chain, position)
  'c10_chem_069', // Homologous series
  'c10_chem_070'  // IUPAC nomenclature
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// INTERFACES
// ==========================================
interface Slide {
  id: string;
  title: string;
  nodeId: NodeId;
  subtitle: string;
  content: string;
  keyPoints: string[];
  interactiveMode: 'contact' | 'acid_lab' | 'carbon_bonding' | 'isomers' | 'iupac';
}

interface Challenge {
  id: string;
  nodeId: NodeId;
  title: string;
  type: 'mcq' | 'equation' | 'predict' | 'drag_sort';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  misconceptionId?: string;
  hint: string;
}

interface Misconception {
  id: string;
  nodeId: NodeId;
  misconception: string;
  correction: string;
}

// ==========================================
// MISCONCEPTIONS DATA
// ==========================================
const MISCONCEPTIONS_DATA: Misconception[] = [
  {
    id: 'misc_contact_water',
    nodeId: 'c10_chem_061',
    misconception: 'Sulphur trioxide (SO3) is dissolved directly in water to make H2SO4 in the Contact Process.',
    correction: 'Direct addition of SO3 to water produces a dense, impenetrable mist of H2SO4 droplets that cannot be condensed easily. Instead, SO3 is absorbed in conc. H2SO4 to form oleum (H2S2O7), which is then diluted with water.'
  },
  {
    id: 'misc_cu_dil_acid',
    nodeId: 'c10_chem_062',
    misconception: 'Dilute H2SO4 reacts with copper to release hydrogen gas.',
    correction: 'Copper is below hydrogen in the reactivity series and cannot displace hydrogen from dilute H2SO4. Copper reacts only with hot concentrated H2SO4 via an oxidation reaction producing SO2 gas.'
  },
  {
    id: 'misc_drying_vs_dehydrating',
    nodeId: 'c10_chem_063',
    misconception: 'Drying and dehydrating mean the exact same chemical process.',
    correction: 'Drying removes surface/free moisture (a physical process). Dehydrating removes chemically bound water or the elements of water (H and O in 2:1 ratio) from inside compounds (a chemical process, like charring sugar).'
  },
  {
    id: 'misc_barium_test',
    nodeId: 'c10_chem_064',
    misconception: 'Any white precipitate formed with BaCl2 proves the presence of sulphate ions.',
    correction: 'BaCl2 forms white precipitates with carbonate (BaCO3) and sulphite (BaSO3) as well. The test specifically confirms sulphate ONLY if the white precipitate remains insoluble in dilute HCl or dilute HNO3.'
  },
  {
    id: 'misc_carbon_ionic',
    nodeId: 'c10_chem_065',
    misconception: 'Carbon gains or loses 4 electrons to complete its octet as an ion.',
    correction: 'Carbon has configuration (2,4). Gaining or losing 4 electrons requires immense energy. Carbon completes its octet exclusively by sharing four electron pairs through covalent bonding (tetravalency).'
  },
  {
    id: 'misc_double_bond_count',
    nodeId: 'c10_chem_066',
    misconception: 'In ethene (C2H4), carbon is not tetravalent because there are only two hydrogens on each carbon.',
    correction: 'A C=C double bond counts as TWO bonds towards tetravalency. Each carbon in ethene has 1 double bond (2) + 2 single C-H bonds (2) = 4 total covalent bonds.'
  },
  {
    id: 'misc_benzene_bonds',
    nodeId: 'c10_chem_067',
    misconception: 'Benzene has 3 static single bonds and 3 static double bonds of different lengths.',
    correction: 'Due to resonance, the 6 pi-electrons in benzene are delocalised over the entire ring. All six carbon-carbon bonds are of identical length, intermediate between single and double bonds.'
  },
  {
    id: 'misc_isomer_same_prop',
    nodeId: 'c10_chem_068',
    misconception: 'Isomers are just different drawings of the same molecule and have identical physical properties.',
    correction: 'Structural isomers are distinct compounds with different connectivity and different physical properties (e.g. n-butane bp -0.5°C vs isobutane bp -11.7°C).'
  },
  {
    id: 'misc_homolog_identical',
    nodeId: 'c10_chem_069',
    misconception: 'All members of a homologous series have identical physical properties.',
    correction: 'Homologues have similar chemical properties (same functional group), but physical properties (boiling point, melting point, density) show a gradual, predictable change (gradation) as molecular mass increases by CH2 (14 u).'
  },
  {
    id: 'misc_iupac_chain',
    nodeId: 'c10_chem_070',
    misconception: 'The parent chain is always the horizontal line of carbon atoms as drawn on paper.',
    correction: 'The parent chain is the longest CONTINUOUS sequence of carbon atoms, regardless of twists or vertical branches in the drawing.'
  }
];

// ==========================================
// TEACHING SLIDES
// ==========================================
const TEACHING_SLIDES: Slide[] = [
  {
    id: 'slide_1',
    nodeId: 'c10_chem_061',
    title: 'Stage 1: Manufacture of H₂SO₄ — The Contact Process',
    subtitle: 'Industrial synthesis from Sulphur to Oleum & Acid',
    content: `The Contact Process converts elemental sulphur into sulphuric acid in 4 key stations:
1. Burner: S + O₂ → SO₂ (Exothermic)
2. Purification: Removes dust and arsenic compounds which would poison the catalyst.
3. Catalytic Converter: 2SO₂ + O₂ ⇌ 2SO₃ (V₂O₅ catalyst at 450°C, 1–2 atm). Compromise temperature gives optimal rate & 97%+ yield.
4. Oleum & Dilution: SO₃ is absorbed in conc. H₂SO₄ to give Oleum (H₂S₂O₇), avoiding toxic acid mist. Oleum is diluted with water: H₂S₂O₇ + H₂O → 2H₂SO₄.`,
    keyPoints: [
      'Catalyst: Vanadium Pentoxide (V₂O₅) at 450°C and 1-2 atm',
      'SO₃ + H₂O direct reaction is avoided due to dense H₂SO₄ mist formation',
      'Oleum (H₂S₂O₇) is pyrosulphuric acid / fuming sulphuric acid'
    ],
    interactiveMode: 'contact'
  },
  {
    id: 'slide_2',
    nodeId: 'c10_chem_062',
    title: 'Stage 2: Dilute H₂SO₄ — Acid Properties & Dibasic Nature',
    subtitle: 'Two replaceable hydrogen ions yield acid salts & normal salts',
    content: `Dilute H₂SO₄ is a strong dibasic acid that ionises completely in water: H₂SO₄ → 2H⁺ + SO₄²⁻.
Because it has two ionisable hydrogens, it forms TWO series of salts with bases like NaOH:
• Limited NaOH: NaOH + H₂SO₄ → NaHSO₄ (Acid salt) + H₂O
• Excess NaOH: 2NaOH + H���SO₄ → Na₂SO₄ (Normal salt) + 2H₂O

Reactions with standard reagents:
• Active Metals (Zn, Mg): Zn + H₂SO₄ → ZnSO₄ + H₂↑ (Pop test)
• Carbonates (Na₂CO₃): Na₂CO₃ + H₂SO₄ → Na₂SO₄ + H₂O + CO₂↑ (Limewater turns milky)
• Sulphites (Na₂SO₃): Na₂SO₃ + H₂SO₄ → Na₂SO₄ + H₂O + SO₂↑ (Turns K₂Cr₂O₇ paper green)
• Sulphides (FeS): FeS + H₂SO₄ → FeSO₄ + H₂S↑ (Rotten egg smell)`,
    keyPoints: [
      'Dibasic acid: 2 replaceable H⁺ ions per molecule',
      'Copper does NOT react with dilute H₂SO₄ (Cu is below hydrogen)',
      'CaCO₃ reaction slows down quickly because CaSO₄ coating is sparingly soluble'
    ],
    interactiveMode: 'acid_lab'
  },
  {
    id: 'slide_3',
    nodeId: 'c10_chem_063',
    title: 'Stage 3: Concentrated H₂SO₄ — Oxidising & Dehydrating Agent',
    subtitle: 'Dual powerful roles of hot concentrated sulphuric acid',
    content: `Hot concentrated H₂SO₄ has two unique chemical personalities:

1. Oxidising Agent:
Concentrated H₂SO₄ accepts electrons and gets reduced to SO₂ gas:
• C + 2H₂SO₄(conc) → CO₂ + 2SO₂ + 2H₂O
• S + 2H₂SO₄(conc) → 3SO₂ + 2H₂O
• Cu + 2H₂SO₄(conc) → CuSO₄ + SO₂ + 2H₂O

2. Dehydrating Agent:
Removes chemically combined water / elements of water (H and O in 2:1 ratio):
• Sugar Charring: C₁₂H₂₂O₁₁ → 12C (black spongy mass) + 11H₂O
• Hydrated CuSO₄: CuSO₄·5H₂O (blue) → CuSO₄ (white powder) + 5H₂O`,
    keyPoints: [
      'Oxidation produces SO₂ gas (reduction product of H₂SO₄)',
      'Dehydration pulls internal water molecules out, charring organic compounds to carbon',
      'Drying = removing surface moisture; Dehydrating = removing structural/bound water'
    ],
    interactiveMode: 'acid_lab'
  },
  {
    id: 'slide_4',
    nodeId: 'c10_chem_064',
    title: 'Stage 4: Tests for H₂SO₄ & Sulphate Ion (SO₄²⁻)',
    subtitle: 'Non-volatile displacement and the Barium Chloride test',
    content: `1. Non-Volatile Acid Test:
Conc. H₂SO₄ has a high boiling point (338°C) and is non-volatile. It displaces more volatile acids from their salts:
• NaCl + H₂SO₄(conc) → NaHSO₄ + HCl↑ (Dense white fumes with NH₃ glass rod)
• NaNO₃ + H₂SO₄(conc) → NaHSO₄ + HNO₃↑ (Yellow stain on starch-KI paper)

2. Confirmatory Test for Sulphate Ion (SO₄²⁻):
• Barium Chloride Test: Add BaCl₂ solution to H₂SO₄ or any sulphate:
  BaCl₂ + H₂SO₄ → BaSO₄↓ (White precipitate) + 2HCl
• Confirmatory Step: Add dilute HCl or dilute HNO₃.
  BaSO₄ precipitate remains INSOLUBLE! (Distinguishes it from BaCO₃ and BaSO₃ which dissolve in acid)`,
    keyPoints: [
      'Non-volatility allows H₂SO₄ to displace volatile HCl and HNO₃ acids',
      'BaSO₄ white precipitate is insoluble in dilute HCl / HNO₃',
      'Lead acetate test gives white PbSO₄ precipitate'
    ],
    interactiveMode: 'acid_lab'
  },
  {
    id: 'slide_5',
    nodeId: 'c10_chem_065',
    title: 'Stage 5: Carbon Atom — Tetravalency, Catenation & Bonding',
    subtitle: 'The fundamental secrets behind millions of organic compounds',
    content: `Carbon (Atomic number 6, electronic configuration 2,4) possesses two unique properties:

1. Tetravalency: 4 valence electrons → shares 4 electron pairs to achieve noble gas octet (2,8). Carbon ALWAYS forms 4 covalent bonds.
2. Catenation: The ability of carbon atoms to form strong covalent bonds with each other, producing long straight chains, branched chains, and rings. C-C bond energy (356 kJ/mol) is much stronger than Si-Si.

Bond Types:
• Single bond (C-C): Shares 1 electron pair (1 σ bond), e.g. Ethane (C₂H₆)
• Double bond (C=C): Shares 2 electron pairs (1 σ + 1 π bond), e.g. Ethene (C₂H₄)
• Triple bond (C≡C): Shares 3 electron pairs (1 σ + 2 π bonds), e.g. Ethyne (C₂H₂)`,
    keyPoints: [
      'Silicon has 4 valence electrons but weak catenation due to larger atomic size',
      'Tetravalency is satisfied in all single, double, and triple bond arrangements',
      'Multiple bonds make compounds unsaturated and more reactive'
    ],
    interactiveMode: 'carbon_bonding'
  },
  {
    id: 'slide_6',
    nodeId: 'c10_chem_067',
    title: 'Stage 6: Structural Types, Isomerism & Homologous Series',
    subtitle: 'Skeleton classification, isomeric shapes & IUPAC naming',
    content: `Classification of Carbon Skeletons:
• Straight Chain: Continuous unbranched line (e.g. n-butane C₄H₁₀)
• Branched Chain: Main chain with side branches (e.g. isobutane / 2-methylpropane)
• Cyclic: Closed ring (e.g. Benzene C₆H₆ with 6 delocalised pi electrons)

Structural Isomerism: Same molecular formula, different structural formula.
• Chain Isomerism: Different carbon skeleton (n-butane vs isobutane)
• Position Isomerism: Same skeleton, different position of functional group/multiple bond (1-butene vs 2-butene)

Homologous Series: Family of compounds with same functional group, same general formula, and successive members differing by -CH₂- (14 u).
• Alkanes: CₙH₂ₙ₊₂ | Alkenes: CₙH₂ₙ | Alkynes: CₙH₂ₙ₋₂

IUPAC Rules:
1. Longest Chain Rule → parent name (meth, eth, prop, but, pent)
2. Smallest Number Rule → lowest locant for functional group
3. Suffixes: -ol (alcohol), -al (aldehyde), -one (ketone), -oic acid (carboxylic acid)`,
    keyPoints: [
      'Isomers have different physical properties (e.g. boiling points)',
      'Homologues show a gradual trend (gradation) in physical properties',
      'Benzene has 6 identical C-C bond lengths due to resonance delocalisation'
    ],
    interactiveMode: 'isomers'
  }
];

// ==========================================
// CHALLENGES
// ==========================================
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_1',
    nodeId: 'c10_chem_061',
    title: 'Contact Process Conditions',
    type: 'mcq',
    question: 'Why is a compromise temperature of 450°C used for the catalytic oxidation 2SO₂ + O₂ ⇌ 2SO₃ over V₂O₅?',
    options: [
      'At 450°C the reaction becomes endothermic and absorbs excess heat',
      'It strikes an optimal balance between satisfactory reaction rate and high equilibrium yield',
      'It prevents vanadium pentoxide (V₂O₅) from vaporising',
      'Higher temperature reduces the pressure required to 100 atmospheres'
    ],
    correctAnswer: 1,
    explanation: 'The reaction is exothermic. A lower temperature favors high equilibrium yield but makes the reaction too slow; a higher temperature speeds up the reaction but shifts equilibrium left, lowering yield. 450°C is the optimal compromise.',
    misconceptionId: 'misc_contact_water',
    hint: 'Think about Le Chatelier\'s principle and the trade-off between reaction rate and equilibrium yield.'
  },
  {
    id: 'ch_2',
    nodeId: 'c10_chem_061',
    title: 'Oleum Formation',
    type: 'mcq',
    question: 'In the Contact Process, why is SO₃ absorbed in concentrated H₂SO₄ to form Oleum (H₂S₂O₇) instead of being directly dissolved in water?',
    options: [
      'Direct dissolution produces SO₂ gas which escapes into the atmosphere',
      'Direct reaction with water is extremely exothermic and produces an un-condensable dense acid mist',
      'Oleum is a solid powder that is easier to pack and transport',
      'Water reacts with V₂O₅ catalyst and deactivates it'
    ],
    correctAnswer: 1,
    explanation: 'Direct addition of gaseous SO₃ to water generates intense heat, creating a dense mist of fine H₂SO₄ droplets that escape with waste gases. Absorbing SO₃ in 98% H₂SO₄ forms oleum safely.',
    misconceptionId: 'misc_contact_water',
    hint: 'Direct addition to water creates a dangerous, dense acid fog/mist that cannot easily be condensed.'
  },
  {
    id: 'ch_3',
    nodeId: 'c10_chem_062',
    title: 'Dibasic Character Equations',
    type: 'mcq',
    question: 'Which pair of balanced equations correctly demonstrates the dibasic nature of H₂SO₄ when reacted with NaOH?',
    options: [
      'NaOH + H₂SO₄ → NaHSO₄ + H₂O  and  2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O',
      'NaOH + H₂SO₄ → Na₂SO₄ + H₂  and  NaOH + H₂SO₄ → NaHSO₄ + H₂O',
      '2NaOH + H₂SO₄ → Na₂O + SO₃ + H₂O  and  NaOH + H₂SO₄ → NaHSO₄ + H₂O',
      'NaOH + H₂SO₄ → NaSO₄ + H₂O  and  2NaOH + H₂SO₄ → Na₂SO₄ + H₂O'
    ],
    correctAnswer: 0,
    explanation: 'H₂SO₄ has two replaceable H⁺ ions. With 1 mole of NaOH, only 1 H⁺ is replaced to form the acid salt NaHSO₄. With 2 moles of NaOH, both H⁺ ions are replaced to form the normal salt Na₂SO₄.',
    hint: 'Look for one equation giving an acid salt (NaHSO₄) and one giving a normal salt (Na₂SO₄).'
  },
  {
    id: 'ch_4',
    nodeId: 'c10_chem_062',
    title: 'Gas Identification from Acid Reactions',
    type: 'mcq',
    question: 'When dilute H₂SO₄ is added to sodium sulphite (Na₂SO₃), gas X is evolved. When added to iron(II) sulphide (FeS), gas Y is evolved. Identify X and Y.',
    options: [
      'X = CO₂, Y = H₂',
      'X = SO₂, Y = H₂S',
      'X = H₂S, Y = SO₂',
      'X = SO₃, Y = SO₂'
    ],
    correctAnswer: 1,
    explanation: 'Sulphites react with dilute acid to evolve sulphur dioxide (SO₂ - choking smell, turns K₂Cr₂O₇ paper green). Sulphides react to evolve hydrogen sulphide (H₂S - rotten egg smell, turns lead acetate paper black).',
    hint: 'Na₂SO₃ contains sulphur and oxygen (SO₂). FeS contains sulphur without oxygen (H₂S).'
  },
  {
    id: 'ch_5',
    nodeId: 'c10_chem_063',
    title: 'Action of Conc. H₂SO₄ on Cane Sugar',
    type: 'mcq',
    question: 'When concentrated H₂SO₄ is added to cane sugar (C₁₂H₂₂O₁₁), a black spongy mass rises with steam. What chemical property does this demonstrate?',
    options: [
      'Oxidising action producing carbon dioxide',
      'Dehydrating action removing the elements of water from sugar to leave carbon',
      'Acid-base neutralisation forming carbon sulphate',
      'Drying action absorbing surface moisture from crystalline sugar'
    ],
    correctAnswer: 1,
    explanation: 'Concentrated H₂SO₄ acts as a powerful dehydrating agent. It pulls hydrogen and oxygen atoms out of sucrose in a 2:1 ratio (11 H₂O), leaving behind a black column of pure carbon (charring: C₁₂H₂₂O₁₁ → 12C + 11H₂O).',
    misconceptionId: 'misc_drying_vs_dehydrating',
    hint: 'This is charring — pulling out internal elements of water chemically, leaving black carbon.'
  },
  {
    id: 'ch_6',
    nodeId: 'c10_chem_063',
    title: 'Oxidising Action on Carbon',
    type: 'mcq',
    question: 'Select the correct balanced equation for the oxidation of carbon by hot concentrated H₂SO₄.',
    options: [
      'C + H₂SO₄ → CO + SO₂ + H₂O',
      'C + 2H₂SO₄ → CO₂ + 2SO₂ + 2H₂O',
      'C + H₂SO₄ → CO₂ + H₂S',
      '2C + 2H₂SO₄ → 2CO₂ + S + 2H₂O'
    ],
    correctAnswer: 1,
    explanation: 'Concentrated H₂SO₄ oxidises carbon (0 to +4 in CO₂) while H₂SO₄ is itself reduced (+6 to +4 in SO₂): C + 2H₂SO₄(conc) → CO₂ + 2SO₂ + 2H₂O.',
    hint: 'Carbon is oxidised to CO₂ and H₂SO₄ is reduced to SO₂ gas and water.'
  },
  {
    id: 'ch_7',
    nodeId: 'c10_chem_064',
    title: 'Sulphate Ion Confirmatory Test',
    type: 'mcq',
    question: 'A student adds BaCl₂ solution to a solution and gets a white precipitate. Why MUST dilute HCl be added to confirm the presence of sulphate ions?',
    options: [
      'Dilute HCl converts the precipitate into soluble barium chloride',
      'BaCO₃ and BaSO₃ precipitates dissolve in dilute HCl, whereas BaSO₄ remains insoluble',
      'Dilute HCl acts as a catalyst to turn the precipitate yellow',
      'Dilute HCl liberates chlorine gas if sulphate is present'
    ],
    correctAnswer: 1,
    explanation: 'Barium chloride forms white precipitates with carbonate (BaCO₃), sulphite (BaSO₃), and sulphate (BaSO₄). Adding dilute HCl dissolves BaCO₃ (with CO₂ effervescence) and BaSO₃ (with SO₂), but BaSO₄ stays insoluble.',
    misconceptionId: 'misc_barium_test',
    hint: 'Sulphate precipitate (BaSO₄) is unique because it refuses to dissolve even in dilute HCl.'
  },
  {
    id: 'ch_8',
    nodeId: 'c10_chem_065',
    title: 'Tetravalency & Catenation Comparison',
    type: 'mcq',
    question: 'Why does carbon form millions of stable organic compounds while silicon (also in Group 14 with 4 valence electrons) forms relatively few?',
    options: [
      'Silicon is a metal and forms only ionic bonds',
      'Carbon has a much smaller atomic size, resulting in a very strong C-C bond energy (356 kJ/mol) that supports extensive catenation',
      'Silicon cannot share electrons and forms only double bonds',
      'Carbon has 6 valence electrons whereas silicon has only 4'
    ],
    correctAnswer: 1,
    explanation: 'Carbon\'s small atomic radius enables effective orbital overlap, giving strong, stable C-C bonds that resist breaking. Silicon atoms are larger, so Si-Si bonds are long, weak, and easily broken by water or oxygen.',
    hint: 'Compare the atomic sizes of C and Si and how size affects bond strength.'
  },
  {
    id: 'ch_9',
    nodeId: 'c10_chem_066',
    title: 'Bond Types & Valency Count',
    type: 'mcq',
    question: 'In ethyne (HC≡CH), how many sigma (σ) and pi (π) bonds exist between the two carbon atoms, and how is tetravalency satisfied?',
    options: [
      '1 σ and 2 π bonds between C atoms; each C also forms 1 σ bond with H, giving 4 total bonds per C',
      '3 σ bonds between C atoms; each C forms 1 π bond with H',
      '2 σ and 1 π bonds between C atoms; each C forms 2 bonds with H',
      '0 σ and 3 π bonds between C atoms; tetravalency is unsatisfied'
    ],
    correctAnswer: 0,
    explanation: 'A triple bond C≡C consists of 1 σ bond and 2 π bonds. Each carbon atom also forms 1 σ bond with a hydrogen atom (H-C≡C-H). Total bonds around each carbon = 3 + 1 = 4 (tetravalency satisfied).',
    hint: 'A triple bond contains one head-on sigma bond and two sideways pi bonds.'
  },
  {
    id: 'ch_10',
    nodeId: 'c10_chem_067',
    title: 'Structure of Benzene Ring',
    type: 'mcq',
    question: 'Which statement accurately describes the carbon-carbon bonding in the cyclic benzene molecule (C₆H₆)?',
    options: [
      'Benzene contains 3 long single C-C bonds and 3 short double C=C bonds that rapidly swap places',
      'Benzene has 6 identical C-C bonds of equal length due to delocalisation of pi-electrons over the hexagonal ring',
      'Benzene is an open chain alkene with 4 double bonds',
      'Benzene consists of single C-C bonds only with 12 hydrogen atoms'
    ],
    correctAnswer: 1,
    explanation: 'Due to resonance delocalisation, the 6 pi-electrons form a continuous cloud above and below the planar ring. All 6 carbon-carbon bonds are equivalent in length (139 pm, between single 154 pm and double 134 pm).',
    misconceptionId: 'misc_benzene_bonds',
    hint: 'Resonance delocalises the pi electrons, making all 6 ring bonds identical.'
  },
  {
    id: 'ch_11',
    nodeId: 'c10_chem_068',
    title: 'Identifying Structural Isomers',
    type: 'mcq',
    question: '1-butene (CH₂=CH-CH₂-CH₃) and 2-butene (CH₃-CH=CH-CH₃) are examples of which type of structural isomerism?',
    options: [
      'Chain isomerism',
      'Position isomerism',
      'Functional group isomerism',
      'Tautomerism'
    ],
    correctAnswer: 1,
    explanation: 'Both compounds have the exact same 4-carbon straight chain skeleton (C₄H₈), but the position of the C=C double bond differs (between C1-C2 vs C2-C3). Thus they are position isomers.',
    hint: 'The carbon chain skeleton is identical, but the address/location of the double bond changed.'
  },
  {
    id: 'ch_12',
    nodeId: 'c10_chem_069',
    title: 'Homologous Series Characteristics',
    type: 'mcq',
    question: 'If an alkane has a molecular mass of 72 u, what is its molecular formula and what is the mass of the next higher homologue?',
    options: [
      'C₅H₁₂ (Pentane), Next homologue = 86 u (Hexane, C₆H₁₄)',
      'C₄H₁₀ (Butane), Next homologue = 86 u',
      'C₅H₁₀ (Pentene), Next homologue = 82 u',
      'C₆H₁₄ (Hexane), Next homologue = 100 u'
    ],
    correctAnswer: 0,
    explanation: 'Alkane general formula CₙH₂ₙ₊₂: 12n + 1(2n+2) = 14n + 2 = 72 → 14n = 70 → n = 5 (C₅H₁₂ pentane). Successive homologues differ by a -CH₂- unit = 14 u, so the next homologue is C₆H₁₄ with mass 72 + 14 = 86 u.',
    hint: 'Use 14n + 2 = 72 to find n, then add 14 u for the next CH₂ group.'
  },
  {
    id: 'ch_13',
    nodeId: 'c10_chem_070',
    title: 'IUPAC Naming Practice',
    type: 'mcq',
    question: 'What is the correct IUPAC name for the structure CH₃-CH(OH)-CH₂-CH₃?',
    options: [
      'Butan-3-ol',
      'Butan-2-ol',
      '2-hydroxybutane',
      'Pentan-2-ol'
    ],
    correctAnswer: 1,
    explanation: '1. Longest continuous chain has 4 carbons → Parent name = butane. 2. Numbering from the right gives the -OH alcohol functional group the lowest locant (carbon 2). 3. IUPAC name = Butan-2-ol.',
    misconceptionId: 'misc_iupac_chain',
    hint: 'Number from the end closest to the -OH group so it gets the smallest possible locant number.'
  }
];

// ==========================================
// INTERACTIVE SIMULATION CANVAS / COMPONENTS
// ==========================================

// 1. CONTACT PROCESS SIMULATOR COMPONENT
const ContactProcessVisualizer: React.FC = () => {
  const [temperature, setTemperature] = useState<number>(450);
  const [pressure, setPressure] = useState<number>(2);
  const [hasCatalyst, setHasCatalyst] = useState<boolean>(true);
  const [absorberMode, setAbsorberMode] = useState<'oleum' | 'direct_water'>('oleum');

  // Equilibrium Yield calculation (simplified model based on exothermic 2SO2 + O2 <=> 2SO3)
  const yieldPercentage = useMemo(() => {
    // Standard yield ~97% at 450°C, 2atm, with V2O5 catalyst
    let base = 97;
    // Temperature effect (exothermic, lower T increases equilibrium constant but lowers rate)
    const tDiff = temperature - 450;
    if (tDiff > 0) base -= (tDiff / 10) * 1.2; // Temp too high pushes equilibrium back
    else base += (-tDiff / 15) * 0.5; // Temp lower increases eq yield slightly

    // Pressure effect (3 moles -> 2 moles, higher pressure shifts right)
    base += (pressure - 1) * 0.8;

    // Catalyst effect
    if (!hasCatalyst) base *= 0.35; // Without catalyst rate is abysmal in practical timeframe

    return Math.max(5, Math.min(99.5, Math.round(base * 10) / 10));
  }, [temperature, pressure, hasCatalyst]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>🏭</span> Contact Process Industrial Converter
          </h3>
          <p className="text-xs text-slate-400">
            2SO₂(g) + O₂(g) ⇌ 2SO₃(g) + Heat (ΔH = -197 kJ/mol)
          </p>
        </div>
        <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 flex items-center gap-3">
          <span className="text-xs text-slate-400 uppercase tracking-wider">SO₃ Yield:</span>
          <span className={`text-2xl font-black ${yieldPercentage > 90 ? 'text-emerald-400' : yieldPercentage > 60 ? 'text-amber-400' : 'text-rose-400'}`}>
            {yieldPercentage}%
          </span>
        </div>
      </div>

      {/* Schematic Diagram SVG */}
      <div className="relative bg-slate-950 rounded-lg p-4 border border-slate-800 mb-6 overflow-hidden">
        <svg viewBox="0 0 800 220" className="w-full h-auto">
          {/* Background Grids */}
          <defs>
            <linearGradient id="converterGlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#ef4444" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="mistGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Plant Flow Pipeline */}
          {/* Station 1: S Burner */}
          <rect x="20" y="70" width="100" height="90" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
          <text x="70" y="105" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">S Burner</text>
          <text x="70" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10">S + O₂ → SO₂</text>

          {/* Pipe 1->2 */}
          <path d="M 120 115 L 170 115" stroke="#f59e0b" strokeWidth="4" strokeDasharray="6 3" />

          {/* Station 2: Purifier */}
          <rect x="170" y="70" width="100" height="90" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
          <text x="220" y="105" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Purifier</text>
          <text x="220" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10">Removes As₂O₃</text>

          {/* Pipe 2->3 */}
          <path d="M 270 115 L 320 115" stroke="#60a5fa" strokeWidth="4" strokeDasharray="6 3" />

          {/* Station 3: Catalytic Converter */}
          <rect x="320" y="50" width="160" height="130" rx="10" fill="url(#converterGlow)" stroke={hasCatalyst ? "#10b981" : "#ef4444"} strokeWidth="3" />
          <text x="400" y="80" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">Converter Chamber</text>
          <text x="400" y="100" textAnchor="middle" fill="#a7f3d0" fontSize="11">{hasCatalyst ? 'V₂O₅ Catalyst Active' : 'NO Catalyst!'}</text>
          <text x="400" y="120" textAnchor="middle" fill="#fcd34d" fontSize="11">{temperature}°C | {pressure} atm</text>
          <text x="400" y="145" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">2SO₂ + O₂ ⇌ 2SO₃</text>

          {/* Pipe 3->4 */}
          <path d="M 480 115 L 540 115" stroke="#10b981" strokeWidth="4" strokeDasharray="6 3" />

          {/* Station 4: Absorber Tower */}
          <rect x="540" y="50" width="110" height="130" rx="8" fill="#1e293b" stroke={absorberMode === 'oleum' ? "#10b981" : "#ef4444"} strokeWidth="2" />
          <text x="595" y="75" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">
            {absorberMode === 'oleum' ? 'Oleum Tower' : 'Water Tower'}
          </text>
          <text x="595" y="100" textAnchor="middle" fill="#cbd5e1" fontSize="10">
            {absorberMode === 'oleum' ? 'Absorbed in 98% H₂SO₄' : 'Direct H₂O Addition'}
          </text>
          {absorberMode === 'oleum' ? (
            <text x="595" y="130" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">Forms H₂S₂O₇</text>
          ) : (
            <g>
              <rect x="550" y="110" width="90" height="40" rx="4" fill="url(#mistGlow)" />
              <text x="595" y="130" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold">⚠️ ACID MIST!</text>
            </g>
          )}

          {/* Pipe 4->5 */}
          <path d="M 650 115 L 700 115" stroke="#38bdf8" strokeWidth="4" />

          {/* Station 5: Product H2SO4 */}
          <rect x="700" y="70" width="80" height="90" rx="8" fill="#065f46" stroke="#34d399" strokeWidth="2" />
          <text x="740" y="110" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">H₂SO₄</text>
          <text x="740" y="130" textAnchor="middle" fill="#a7f3d0" fontSize="10">Product</text>
        </svg>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
        {/* Temperature Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-300">Temperature (°C):</span>
            <span className={temperature === 450 ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
              {temperature}°C {temperature === 450 && '(Optimum)'}
            </span>
          </div>
          <input
            type="range"
            min="250"
            max="700"
            step="10"
            value={temperature}
            onChange={(e) => {
              setTemperature(Number(e.target.value));
              audioManager.play('tap');
            }}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <p className="text-[10px] text-slate-400">
            {temperature < 400 ? 'Too cold: Reaction rate is too slow!' : temperature > 500 ? 'Too hot: Equilibrium shifts left, yield drops!' : '450°C is the perfect compromise for rate & yield.'}
          </p>
        </div>

        {/* Pressure & Catalyst Toggles */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-300">Pressure (atm):</span>
            <span className="text-amber-400">{pressure} atm</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={pressure}
            onChange={(e) => {
              setPressure(Number(e.target.value));
              audioManager.play('tap');
            }}
            className="w-full accent-gold-500 cursor-pointer"
          />
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-300 font-semibold">V₂O₅ Catalyst:</span>
            <button
              onClick={() => {
                setHasCatalyst(!hasCatalyst);
                audioManager.play('pop');
              }}
              className={`px-3 py-1 rounded text-xs font-bold transition-colors ${hasCatalyst ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}
            >
              {hasCatalyst ? 'ACTIVE' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Absorber Route Switch */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-300 block">Absorption Method:</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setAbsorberMode('oleum');
                audioManager.play('drop-correct');
              }}
              className={`p-2 rounded text-xs font-bold border transition-all text-left ${absorberMode === 'oleum' ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
            >
              <div>Standard Oleum</div>
              <div className="text-[9px] font-normal opacity-80">H₂SO₄ + SO₃ → H₂S₂O₇</div>
            </button>
            <button
              onClick={() => {
                setAbsorberMode('direct_water');
                audioManager.play('error');
                speechManager.speak('Direct addition of sulphur trioxide to water produces a dense acid mist!');
              }}
              className={`p-2 rounded text-xs font-bold border transition-all text-left ${absorberMode === 'direct_water' ? 'bg-rose-950 border-rose-500 text-rose-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
            >
              <div>Direct Water</div>
              <div className="text-[9px] font-normal opacity-80">Causes Acid Mist!</div>
            </button>
          </div>
          {absorberMode === 'direct_water' && (
            <p className="text-[10px] text-rose-400 font-semibold mt-1">
              ❌ MISCONCEPTION ALERT: Direct water absorption creates an impenetrable H₂SO₄ fog that escapes into the atmosphere!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// 2. ACID PROPERTIES & DEHYDRATING/TESTS LAB COMPONENT
const AcidPropertiesLab: React.FC = () => {
  const [selectedAcid, setSelectedAcid] = useState<'dilute' | 'concentrated'>('dilute');
  const [selectedReagent, setSelectedReagent] = useState<string>('Zn');
  const [isReacting, setIsReacting] = useState<boolean>(false);
  const [testLog, setTestLog] = useState<string[]>([]);

  const REAGENTS_MAP: Record<string, {
    name: string;
    diluteProduct: { eq: string; obs: string; gasTest?: string } | null;
    concProduct: { eq: string; obs: string; gasTest?: string } | null;
  }> = {
    'Zn': {
      name: 'Zinc Metal (Zn)',
      diluteProduct: {
        eq: 'Zn + H₂SO₄(dil) → ZnSO₄ + H₂↑',
        obs: 'Effervescence of colourless gas.',
        gasTest: 'H₂ gas burns with a "pop" sound when tested with a burning splint.'
      },
      concProduct: {
        eq: 'Zn + 2H₂SO₄(conc) → ZnSO₄ + SO₂↑ + 2H₂O',
        obs: 'Choking gas evolved on heating.',
        gasTest: 'SO₂ gas turns acidified K₂Cr₂O₇ paper from orange to green.'
      }
    },
    'Cu': {
      name: 'Copper Metal (Cu)',
      diluteProduct: null, // NO REACTION
      concProduct: {
        eq: 'Cu + 2H₂SO₄(conc) → CuSO₄ + SO₂↑ + 2H₂O',
        obs: 'Solution turns blue, reddish-brown metal dissolves, choking gas evolved.',
        gasTest: 'SO₂ gas turns acidified K₂Cr₂O₇ paper from orange to green.'
      }
    },
    'Na2CO3': {
      name: 'Sodium Carbonate (Na₂CO₃)',
      diluteProduct: {
        eq: 'Na₂CO₃ + H₂SO₄(dil) → Na₂SO₄ + H₂O + CO₂↑',
        obs: 'Brisk effervescence.',
        gasTest: 'CO₂ gas turns limewater milky.'
      },
      concProduct: {
        eq: 'Na₂CO₃ + H₂SO₄(conc) → Na₂SO₄ + H₂O + CO₂↑',
        obs: 'Vigorous effervescence.',
        gasTest: 'CO₂ gas turns limewater milky.'
      }
    },
    'Na2SO3': {
      name: 'Sodium Sulphite (Na₂SO₃)',
      diluteProduct: {
        eq: 'Na₂SO₃ + H₂SO₄(dil) → Na₂SO₄ + H₂O + SO₂↑',
        obs: 'Suffocating, pungent gas evolved.',
        gasTest: 'SO₂ gas turns orange K₂Cr₂O₇ solution green.'
      },
      concProduct: {
        eq: 'Na₂SO₃ + H₂SO₄(conc) → Na₂SO₄ + H₂O + SO₂↑',
        obs: 'Pungent gas evolved.',
        gasTest: 'SO₂ turns acidified potassium dichromate green.'
      }
    },
    'FeS': {
      name: 'Iron(II) Sulphide (FeS)',
      diluteProduct: {
        eq: 'FeS + H₂SO₄(dil) → FeSO₄ + H₂S↑',
        obs: 'Gas with rotten egg smell evolved.',
        gasTest: 'H₂S gas turns lead acetate paper black (forming PbS).'
      },
      concProduct: {
        eq: 'Complex redox oxidation (FeS oxidised to Fe³⁺ and SO₂)',
        obs: 'Dark solution with choking SO₂ gas.',
        gasTest: 'Pungent SO₂ gas.'
      }
    },
    'Sugar': {
      name: 'Cane Sugar (C₁₂H₂₂O₁₁)',
      diluteProduct: {
        eq: 'No chemical reaction (Sugar dissolves in water)',
        obs: 'Colorless sugar solution forms.',
        gasTest: 'None'
      },
      concProduct: {
        eq: 'C₁₂H₂₂O₁₁ —(conc. H₂SO₄)→ 12C + 11H₂O (Dehydration / Charring)',
        obs: 'Sugar turns brown then swells into a porous black spongy column of carbon.',
        gasTest: 'Steam / water vapour given off.'
      }
    },
    'CuSO4_5H2O': {
      name: 'Hydrated Copper Sulphate (CuSO₄·5H₂O)',
      diluteProduct: {
        eq: 'Dissolves to form aqueous blue solution',
        obs: 'Blue crystals dissolve.',
        gasTest: 'None'
      },
      concProduct: {
        eq: 'CuSO₄·5H₂O —(conc. H₂SO₄)→ CuSO₄ (white anhydrous) + 5H₂O',
        obs: 'Bright blue crystals turn into a dull white powder as water of crystallisation is removed.',
        gasTest: 'Dehydration removes structural water.'
      }
    },
    'NaCl': {
      name: 'Sodium Chloride (NaCl)',
      diluteProduct: null, // No displacement
      concProduct: {
        eq: 'NaCl + H₂SO₄(conc) —(warmed)→ NaHSO₄ + HCl↑',
        obs: 'Pungent fumes of HCl gas (non-volatile acid displacement).',
        gasTest: 'HCl gas gives dense white fumes of NH₄Cl when a rod dipped in aqueous NH₃ is held near mouth.'
      }
    },
    'BaCl2': {
      name: 'Barium Chloride Test (BaCl₂)',
      diluteProduct: {
        eq: 'BaCl₂ + H₂SO₄ → BaSO₄↓ (white ppt) + 2HCl',
        obs: 'Immediate heavy white precipitate of BaSO₄ forms.',
        gasTest: 'Confirmatory: Precipitate remains INSOLUBLE when dilute HCl or HNO₃ is added!'
      },
      concProduct: {
        eq: 'BaCl₂ + H₂SO₄ → BaSO₄↓ (white ppt) + 2HCl',
        obs: 'White precipitate formed.',
        gasTest: 'Insoluble in dilute HCl.'
      }
    }
  };

  const currentResult = useMemo(() => {
    const reg = REAGENTS_MAP[selectedReagent];
    if (!reg) return null;
    return selectedAcid === 'dilute' ? reg.diluteProduct : reg.concProduct;
  }, [selectedAcid, selectedReagent]);

  const handleRunReaction = () => {
    setIsReacting(true);
    audioManager.play('swoop');

    setTimeout(() => {
      setIsReacting(false);
      if (currentResult) {
        audioManager.play('success');
        setTestLog(prev => [`[${selectedAcid.toUpperCase()} H₂SO₄ + ${selectedReagent}] ${currentResult.eq}`, ...prev.slice(0, 4)]);
        speechManager.speak(currentResult.obs);
      } else {
        audioManager.play('error');
        setTestLog(prev => [`[${selectedAcid.toUpperCase()} H₂SO₄ + ${selectedReagent}] NO REACTION observed!`, ...prev.slice(0, 4)]);
        speechManager.speak('No reaction occurs! Copper is below hydrogen in the reactivity series.');
      }
    }, 800);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-gold-400 flex items-center gap-2">
            <span>🧪</span> H₂SO₄ Reaction & Testing Laboratory
          </h3>
          <p className="text-xs text-slate-400">
            Compare Dilute Acid Properties vs Concentrated Oxidising / Dehydrating / Test Roles
          </p>
        </div>

        {/* Acid Concentration Selector */}
        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => {
              setSelectedAcid('dilute');
              audioManager.play('tap');
            }}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${selectedAcid === 'dilute' ? 'bg-gold-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Dilute H₂SO₄ (Strong Acid)
          </button>
          <button
            onClick={() => {
              setSelectedAcid('concentrated');
              audioManager.play('tap');
            }}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${selectedAcid === 'concentrated' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Conc. H₂SO₄ (Oxidising/Dehydrating)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Reagent Selection Grid */}
        <div className="md:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">Select Reactant / Test Reagent:</span>
          <div className="grid grid-cols-1 gap-1.5 max-h-[300px] overflow-y-auto pr-1">
            {Object.entries(REAGENTS_MAP).map(([key, item]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedReagent(key);
                  audioManager.play('pop');
                }}
                className={`p-2.5 rounded-lg text-left text-xs font-semibold border transition-all flex justify-between items-center ${selectedReagent === key ? 'bg-slate-800 border-gold-500 text-gold-300 shadow-md' : 'bg-slate-900 border-slate-800/80 text-slate-400 hover:bg-slate-800/50'}`}
              >
                <span>{item.name}</span>
                {selectedReagent === key && <span className="text-gold-400">●</span>}
              </button>
            ))}
          </div>

          <button
            onClick={handleRunReaction}
            disabled={isReacting}
            className="w-full mt-3 py-2.5 bg-gradient-to-r from-gold-600 to-gold-600 hover:from-gold-500 hover:to-gold-500 text-white font-bold text-sm rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isReacting ? 'Simulating Reaction...' : '🚀 Mix & Observe Reaction'}
          </button>
        </div>

        {/* Reaction Flask Animation & Result Display */}
        <div className="md:col-span-7 bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between relative overflow-hidden">
          {/* Reaction Tube Visualizer */}
          <div className="flex items-center justify-center py-6 relative">
            <div className="w-24 h-48 border-4 border-slate-700 border-t-0 rounded-b-full bg-slate-900/60 relative flex flex-col justify-end p-2 overflow-hidden shadow-inner">
              {/* Liquid Content */}
              <motion.div
                className={`w-full rounded-b-full transition-all duration-500 ${selectedReagent === 'Sugar' && selectedAcid === 'concentrated' ? 'bg-slate-950' : selectedReagent === 'Cu' && selectedAcid === 'concentrated' ? 'bg-gold-600/80' : selectedReagent === 'CuSO4_5H2O' && selectedAcid === 'concentrated' ? 'bg-slate-200/80' : 'bg-gold-600/40'}`}
                animate={{ height: isReacting ? '70%' : '45%' }}
              />

              {/* Bubbles / Gas Animation */}
              {isReacting && (
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
                  <motion.div animate={{ y: [-10, -80], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-3 h-3 bg-white/70 rounded-full my-1" />
                  <motion.div animate={{ y: [-10, -90], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-2 h-2 bg-amber-300/80 rounded-full my-1" />
                </div>
              )}

              {/* Charring Sugar Column effect */}
              {selectedReagent === 'Sugar' && selectedAcid === 'concentrated' && !isReacting && (
                <div className="absolute bottom-2 inset-x-3 h-32 bg-stone-900 border border-stone-700 rounded-t-lg flex items-center justify-center text-[10px] text-stone-400 font-bold text-center">
                  Black Carbon Mass
                </div>
              )}
            </div>
          </div>

          {/* Reaction Results Panel */}
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
            {currentResult ? (
              <>
                <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 p-2 rounded border border-emerald-800/50">
                  {currentResult.eq}
                </div>
                <div className="text-xs text-slate-200 font-medium">
                  <span className="text-amber-400 font-bold">Observation:</span> {currentResult.obs}
                </div>
                {currentResult.gasTest && (
                  <div className="text-xs text-gold-300 bg-gold-950/40 p-2 rounded border border-gold-800/40">
                    <span className="font-bold">🔍 Confirmatory Test:</span> {currentResult.gasTest}
                  </div>
                )}
              </>
            ) : (
              <div className="text-xs font-bold text-rose-400 bg-rose-950/60 p-3 rounded border border-rose-800/50 text-center">
                ❌ NO REACTION: Copper is less reactive than hydrogen and cannot displace H₂ from dilute H₂SO₄!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lab History Log */}
      {testLog.length > 0 && (
        <div className="mt-4 bg-slate-950 p-3 rounded-lg border border-slate-800/80">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Recent Reaction Log:</span>
          <div className="space-y-1">
            {testLog.map((log, idx) => (
              <div key={idx} className="text-[11px] font-mono text-slate-300 truncate">
                • {log}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// 3. CARBON BONDING & MOLECULE BUILDER COMPONENT
const CarbonBondingVisualizer: React.FC = () => {
  const [activeMolecule, setActiveMolecule] = useState<'methane' | 'ethane' | 'ethene' | 'ethyne' | 'benzene'>('ethane');

  const MOLECULES_DATA = {
    methane: {
      name: 'Methane (CH₄)',
      type: 'Alkane (Single Bonds)',
      formula: 'CH₄',
      desc: 'Tetravalency satisfied: Central carbon forms 4 single covalent bonds with 4 hydrogen atoms.',
      bonds: '4 Single C-H Covalent Bonds (4 σ bonds)'
    },
    ethane: {
      name: 'Ethane (C₂H₆)',
      type: 'Alkane (Single Bond)',
      formula: 'H₃C - CH₃',
      desc: 'Catenation + Tetravalency: Two carbons share 1 electron pair (C-C bond). Each carbon has 3 C-H bonds.',
      bonds: '1 C-C σ bond + 6 C-H σ bonds'
    },
    ethene: {
      name: 'Ethene (C₂H₄)',
      type: 'Alkene (Double Bond)',
      formula: 'H₂C = CH₂',
      desc: 'Unsaturated Hydrocarbon: Two carbons share 2 electron pairs (C=C double bond: 1 σ + 1 π bond).',
      bonds: '1 C=C double bond (1σ, 1π) + 4 C-H σ bonds'
    },
    ethyne: {
      name: 'Ethyne (C₂H₂)',
      type: 'Alkyne (Triple Bond)',
      formula: 'HC ≡ CH',
      desc: 'Unsaturated Hydrocarbon: Two carbons share 3 electron pairs (C≡C triple bond: 1 σ + 2 π bonds).',
      bonds: '1 C≡C triple bond (1σ, 2π) + 2 C-H σ bonds'
    },
    benzene: {
      name: 'Benzene (C₆H₆)',
      type: 'Cyclic Aromatic Compound',
      formula: 'C₆H₆ (Delocalised Ring)',
      desc: 'Cyclic structure of 6 carbon atoms. Resonance causes all 6 pi-electrons to delocalise evenly, making all 6 C-C bonds equal in length.',
      bonds: '6 Ring C-C bonds (delocalised π cloud) + 6 C-H σ bonds'
    }
  };

  const curr = MOLECULES_DATA[activeMolecule];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
            <span>⚛️</span> Carbon Bonding & Molecular Structure Visualizer
          </h3>
          <p className="text-xs text-slate-400">
            Explore Tetravalency, Catenation, Single, Double, Triple Bonds & Cyclic Benzene
          </p>
        </div>

        {/* Molecule Selector Buttons */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
          {(Object.keys(MOLECULES_DATA) as (keyof typeof MOLECULES_DATA)[]).map((key) => (
            <button
              key={key}
              onClick={() => {
                setActiveMolecule(key);
                audioManager.play('pop');
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${activeMolecule === key ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {MOLECULES_DATA[key].name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* 2D SVG Molecular Renderer */}
        <div className="md:col-span-6 bg-slate-950 rounded-xl p-6 border border-slate-800 flex items-center justify-center min-h-[240px]">
          <svg viewBox="0 0 300 200" className="w-full h-48">
            {activeMolecule === 'methane' && (
              <g>
                {/* Central C */}
                <circle cx="150" cy="100" r="22" fill="#10b981" stroke="#059669" strokeWidth="2" />
                <text x="150" y="105" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">C</text>

                {/* 4 H atoms */}
                <line x1="150" y1="78" x2="150" y2="40" stroke="#94a3b8" strokeWidth="3" />
                <circle cx="150" cy="30" r="14" fill="#38bdf8" />
                <text x="150" y="34" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">H</text>

                <line x1="150" y1="122" x2="150" y2="160" stroke="#94a3b8" strokeWidth="3" />
                <circle cx="150" cy="170" r="14" fill="#38bdf8" />
                <text x="150" y="174" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">H</text>

                <line x1="128" y1="100" x2="80" y2="100" stroke="#94a3b8" strokeWidth="3" />
                <circle cx="70" cy="100" r="14" fill="#38bdf8" />
                <text x="70" y="104" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">H</text>

                <line x1="172" y1="100" x2="220" y2="100" stroke="#94a3b8" strokeWidth="3" />
                <circle cx="230" cy="100" r="14" fill="#38bdf8" />
                <text x="230" y="104" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">H</text>
              </g>
            )}

            {activeMolecule === 'ethane' && (
              <g>
                {/* 2 C atoms single bond */}
                <line x1="110" y1="100" x2="190" y2="100" stroke="#10b981" strokeWidth="4" />
                <circle cx="110" cy="100" r="20" fill="#10b981" />
                <text x="110" y="105" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">C</text>

                <circle cx="190" cy="100" r="20" fill="#10b981" />
                <text x="190" y="105" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">C</text>

                {/* H atoms */}
                <line x1="110" y1="80" x2="110" y2="45" stroke="#94a3b8" strokeWidth="2.5" />
                <circle cx="110" cy="35" r="12" fill="#38bdf8" />
                <text x="110" y="38" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">H</text>

                <line x1="110" y1="120" x2="110" y2="155" stroke="#94a3b8" strokeWidth="2.5" />
                <circle cx="110" cy="165" r="12" fill="#38bdf8" />
                <text x="110" y="168" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">H</text>

                <line x1="90" y1="100" x2="55" y2="100" stroke="#94a3b8" strokeWidth="2.5" />
                <circle cx="45" cy="100" r="12" fill="#38bdf8" />
                <text x="45" y="103" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">H</text>

                <line x1="190" y1="80" x2="190" y2="45" stroke="#94a3b8" strokeWidth="2.5" />
                <circle cx="190" cy="35" r="12" fill="#38bdf8" />
                <text x="190" y="38" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">H</text>

                <line x1="190" y1="120" x2="190" y2="155" stroke="#94a3b8" strokeWidth="2.5" />
                <circle cx="190" cy="165" r="12" fill="#38bdf8" />
                <text x="190" y="168" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">H</text>

                <line x1="210" y1="100" x2="245" y2="100" stroke="#94a3b8" strokeWidth="2.5" />
                <circle cx="255" cy="100" r="12" fill="#38bdf8" />
                <text x="255" y="103" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">H</text>
              </g>
            )}

            {activeMolecule === 'ethene' && (
              <g>
                {/* C=C double bond */}
                <line x1="110" y1="94" x2="190" y2="94" stroke="#f59e0b" strokeWidth="3" />
                <line x1="110" y1="106" x2="190" y2="106" stroke="#f59e0b" strokeWidth="3" />

                <circle cx="110" cy="100" r="20" fill="#10b981" />
                <text x="110" y="105" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">C</text>

                <circle cx="190" cy="100" r="20" fill="#10b981" />
                <text x="190" y="105" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">C</text>

                {/* 4 H atoms angled */}
                <line x1="95" y1="85" x2="60" y2="50" stroke="#94a3b8" strokeWidth="2.5" />
                <circle cx="50" cy="40" r="12" fill="#38bdf8" />
                <text x="50" y="43" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">H</text>

                <line x1="95" y1="115" x2="60" y2="150" stroke="#94a3b8" strokeWidth="2.5" />
                <circle cx="50" cy="160" r="12" fill="#38bdf8" />
                <text x="50" y="163" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">H</text>

                <line x1="205" y1="85" x2="240" y2="50" stroke="#94a3b8" strokeWidth="2.5" />
                <circle cx="250" cy="40" r="12" fill="#38bdf8" />
                <text x="250" y="43" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">H</text>

                <line x1="205" y1="115" x2="240" y2="150" stroke="#94a3b8" strokeWidth="2.5" />
                <circle cx="250" cy="160" r="12" fill="#38bdf8" />
                <text x="250" y="163" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">H</text>
              </g>
            )}

            {activeMolecule === 'ethyne' && (
              <g>
                {/* C≡C triple bond */}
                <line x1="110" y1="92" x2="190" y2="92" stroke="#ef4444" strokeWidth="2.5" />
                <line x1="110" y1="100" x2="190" y2="100" stroke="#ef4444" strokeWidth="2.5" />
                <line x1="110" y1="108" x2="190" y2="108" stroke="#ef4444" strokeWidth="2.5" />

                <circle cx="110" cy="100" r="20" fill="#10b981" />
                <text x="110" y="105" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">C</text>

                <circle cx="190" cy="100" r="20" fill="#10b981" />
                <text x="190" y="105" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">C</text>

                {/* 2 H linear */}
                <line x1="90" y1="100" x2="50" y2="100" stroke="#94a3b8" strokeWidth="2.5" />
                <circle cx="40" cy="100" r="12" fill="#38bdf8" />
                <text x="40" y="103" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">H</text>

                <line x1="210" y1="100" x2="250" y2="100" stroke="#94a3b8" strokeWidth="2.5" />
                <circle cx="260" cy="100" r="12" fill="#38bdf8" />
                <text x="260" y="103" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">H</text>
              </g>
            )}

            {activeMolecule === 'benzene' && (
              <g>
                {/* Hexagonal Ring */}
                <polygon points="150,40 200,70 200,130 150,160 100,130 100,70" fill="none" stroke="#10b981" strokeWidth="3" />
                {/* Delocalised Ring Circle */}
                <circle cx="150" cy="100" r="32" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="5 3" />

                {/* 6 C atoms at vertices */}
                <circle cx="150" cy="40" r="12" fill="#10b981" />
                <circle cx="200" cy="70" r="12" fill="#10b981" />
                <circle cx="200" cy="130" r="12" fill="#10b981" />
                <circle cx="150" cy="160" r="12" fill="#10b981" />
                <circle cx="100" cy="130" r="12" fill="#10b981" />
                <circle cx="100" cy="70" r="12" fill="#10b981" />

                <text x="150" y="104" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Delocalised π</text>
              </g>
            )}
          </svg>
        </div>

        {/* Description & Bonding Details */}
        <div className="md:col-span-6 space-y-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="text-base font-bold text-emerald-400">{curr.name}</h4>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono">
                {curr.formula}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {curr.desc}
            </p>
            <div className="text-xs bg-slate-900 p-2.5 rounded border border-slate-800 text-amber-300 font-semibold">
              <span>🔗 Bond Types: </span> {curr.bonds}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. ISOMERISM & IUPAC EXPLORER COMPONENT
const IsomerismExplorer: React.FC = () => {
  const [selectedFormula, setSelectedFormula] = useState<'C4H10' | 'C4H8' | 'C5H12'>('C4H10');

  const ISOMERS_MAP = {
    'C4H10': {
      title: 'Chain Isomerism (C₄H₁₀)',
      type: 'Chain Isomers',
      isomers: [
        { name: 'n-Butane', formula: 'CH₃ - CH₂ - CH₂ - CH₃', type: 'Straight Chain', bp: '-0.5°C' },
        { name: 'Isobutane (2-methylpropane)', formula: 'CH₃ - CH(CH₃) - CH₃', type: 'Branched Chain', bp: '-11.7°C' }
      ]
    },
    'C4H8': {
      title: 'Position Isomerism (C₄H₈)',
      type: 'Position Isomers',
      isomers: [
        { name: '1-Butene', formula: 'CH₂ = CH - CH₂ - CH₃', type: 'Double bond at C1', bp: '-6.3°C' },
        { name: '2-Butene', formula: 'CH₃ - CH = CH - CH₃', type: 'Double bond at C2', bp: '0.9°C' }
      ]
    },
    'C5H12': {
      title: 'Pentane Isomers (C₅H₁₂)',
      type: 'Chain Isomers (3 Isomers)',
      isomers: [
        { name: 'n-Pentane', formula: 'CH₃ - CH₂ - CH₂ - CH₂ - CH₃', type: 'Straight Chain', bp: '36.1°C' },
        { name: 'Isopentane (2-methylbutane)', formula: 'CH₃ - CH(CH₃) - CH₂ - CH₃', type: 'Single Branch', bp: '27.8°C' },
        { name: 'Neopentane (2,2-dimethylpropane)', formula: 'C(CH₃)₄', type: 'Double Branch', bp: '9.5°C' }
      ]
    }
  };

  const currentGroup = ISOMERS_MAP[selectedFormula];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-purple-400 flex items-center gap-2">
            <span>🧬</span> Structural Isomerism & Skeleton Explorer
          </h3>
          <p className="text-xs text-slate-400">
            Same Molecular Formula → Different Structural Formulas & Physical Properties
          </p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
          {(['C4H10', 'C4H8', 'C5H12'] as (keyof typeof ISOMERS_MAP)[]).map((f) => (
            <button
              key={f}
              onClick={() => {
                setSelectedFormula(f);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${selectedFormula === f ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-bold text-purple-300 flex items-center gap-2">
          <span>📌</span> {currentGroup.title}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentGroup.isomers.map((iso, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-amber-400">{iso.name}</span>
                  <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800">
                    {iso.type}
                  </span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded font-mono text-xs text-emerald-300 font-bold tracking-wide my-2 border border-slate-800 text-center">
                  {iso.formula}
                </div>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                <span>Boiling Point:</span>
                <span className="font-bold text-slate-200">{iso.bp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MISCONCEPTIONS_CHECKLIST: { id: string; title: string; description: string; correction: string; }[] = [
  {
    id: "misc_1",
    title: "Direct Dissolution of Sulfur Trioxide in Water Forms Sulfuric Acid",
    description: "Students often believe that sulfur trioxide gas is directly dissolved in water to yield sulfuric acid in the Contact Process. They assume this direct hydration is used industrially because it matches the simple balanced chemical equation.",
    correction: "Direct reaction of sulfur trioxide with water is violently exothermic and creates a dense mist of fine acid droplets that is extremely difficult to condense. To prevent this safety hazard and loss of product, sulfur trioxide is absorbed in 98% concentrated sulfuric acid to produce oleum (H2S2O7). Oleum is then safely diluted with calculated amounts of water to yield sulfuric acid of the desired concentration.",
  },
  {
    id: "misc_2",
    title: "Vanadium Pentoxide Catalyst Increases Final Yield of Sulfur Trioxide",
    description: "Students frequently assume that adding Vanadium Pentoxide (V2O5) increases the final percentage yield of sulfur trioxide. They confuse the rate of a chemical reaction with its equilibrium position.",
    correction: "A catalyst speeds up both the forward and reverse reactions equally, reducing the time taken to reach equilibrium without altering the equilibrium yield. The high yield of sulfur trioxide is controlled by Le Chatelier's principle through optimized temperature, pressure, and reactant concentrations. V2O5 simply allows the system to reach equilibrium rapidly at an economically viable operating temperature.",
  },
  {
    id: "misc_3",
    title: "Higher Temperatures Yield More Sulfur Trioxide in Contact Process",
    description: "Students often think that heating the reaction chamber to extremely high temperatures yields more sulfur trioxide gas rapidly. They believe higher kinetic energy always favors higher product formation in industrial setups.",
    correction: "The oxidation of sulfur dioxide to sulfur trioxide is an exothermic reaction that releases heat. According to Le Chatelier's principle, lower temperatures favor a higher equilibrium yield of sulfur trioxide, but excessively low temperatures make the reaction rate impractically slow. Therefore, an optimum compromise temperature of around 450°C is maintained to balance a good reaction rate with high yield.",
  },
  {
    id: "misc_4",
    title: "Dehydrating Action Is Identical to Simple Drying Action of Acid",
    description: "Students confuse the dehydrating property of concentrated sulfuric acid with its drying property. They believe removing water vapor from a gas is chemically identical to charring sugar.",
    correction: "Drying involves removing physically present moisture or uncombined water from a substance without altering its chemical structure. Dehydration involves removing chemically combined elements of water (hydrogen and oxygen in a 2:1 ratio) from a compound, resulting in a chemical transformation such as charring sugar into black carbon. Concentrated sulfuric acid acts as a drying agent for neutral and acidic gases, but acts as a dehydrating agent when reacting with compounds like carbohydrates.",
  },
  {
    id: "misc_5",
    title: "Dilute Sulfuric Acid Possesses Strong Oxidizing Properties Like Concentrated Acid",
    description: "Students assume that dilute sulfuric acid acts as a strong oxidizing agent just like concentrated sulfuric acid. Consequently, they expect dilute acid to oxidize unreactive metals such as copper.",
    correction: "Concentrated sulfuric acid acts as a strong oxidizing agent because it decomposes on heating to produce nascent oxygen, allowing it to oxidize unreactive metals like copper to copper sulfate and sulfur dioxide. Dilute sulfuric acid does not yield nascent oxygen and exhibits only typical acidic properties due to hydronium ions. Therefore, dilute sulfuric acid reacts only with metals above hydrogen in the reactivity series to evolve hydrogen gas, and cannot react with copper.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function C10_ChemistrySulphuricacidContactprocessSim() {
  // Navigation / State Hooks
  const [activeTab, setActiveTab] = useState<'discovery' | 'learn' | 'lab' | 'challenge' | 'summary'>('discovery');
  const [currentSlideIdx, setCurrentSlideIdx] = useState<number>(0);
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);

  // Prediction State (Discovery)
  const [prediction, setPrediction] = useState<number | null>(null);
  const [predictionSubmitted, setPredictionSubmitted] = useState<boolean>(false);

  // Challenge Engine State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Score & Adaptive Tracking
  const [score, setScore] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  // Initialize BKT states for all 10 nodes
  const [bktStates, setBktStates] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState();
    });
    return initial as Record<NodeId, ReturnType<typeof createBKTState>>;
  });

  // Current Slide & Challenge Memo
  const currentSlide = TEACHING_SLIDES[currentSlideIdx];
  const currentChallenge = CHALLENGES[currentChallengeIdx];

  // Voice Intro on Slide Change
  useEffect(() => {
    if (activeTab === 'learn') {
      speechManager.speak(currentSlide.title);
    }
  }, [currentSlideIdx, activeTab]);

  // Handle Discovery Question Submit
  const handlePredictionSubmit = (index: number) => {
    setPrediction(index);
    setPredictionSubmitted(true);
    if (index === 1) { // Correct answer index
      audioManager.play('drop-correct');
      speechManager.speak('Correct prediction! Oleum route prevents acid mist.');
    } else {
      audioManager.play('error');
      speechManager.speak('Direct addition of SO3 to water creates a dense acid mist that escapes!');
    }
  };

  // Handle Challenge Answer Submit
  const handleChallengeSubmit = (optionIndex: number) => {
    if (isAnswerSubmitted) return;

    setSelectedOption(optionIndex);
    setIsAnswerSubmitted(true);

    const correct = optionIndex === currentChallenge.correctAnswer;
    setIsCorrect(correct);

    // BKT & SRS Updates
    const nodeId = currentChallenge.nodeId;
    const updatedBKT = bktUpdate(bktStates[nodeId], correct);
        const _reviewItem = createReviewItem('C10_ChemistrySulphur', 'challenge');
        sm2Update(_reviewItem, 4, 0);
    setBktStates(prev => ({ ...prev, [nodeId]: updatedBKT }));

    if (correct) {
      audioManager.play('success');
      audioManager.play('sparkle');
      setShowConfetti(true);
      setShowSparkle(true);
      setScore(prev => prev + 10);
      speechManager.speak('Excellent! Your understanding is spot on.');
      setTimeout(() => setShowConfetti(false), 2000);
      setTimeout(() => setShowSparkle(false), 1500);
    } else {
      audioManager.play('error');
      speechManager.speak('That is incorrect. Check the feedback below.');
    }
  };

  // Move to Next Challenge
  const handleNextChallenge = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);

    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx(prev => prev + 1);
      audioManager.play('whoosh');
    } else {
      // Completed all challenges
      setActiveTab('summary');
      audioManager.play('celebration');
      setShowSuccess(true);

      // Record final scores in LocalStorage / MasteryStore
      ALL_NODE_IDS.forEach(nodeId => {
        const mastery = bktStates[nodeId].pKnown;
        recordGameScore([nodeId], Math.round(mastery * 100));
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8">
      {/* Top Header Navigation */}
      <header className="max-w-6xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-gold-500 flex items-center justify-center text-xl font-bold text-slate-950 shadow-lg">
            🧪
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">ICSE Class 10 Chemistry Laboratory</h1>
            <p className="text-xs text-slate-400">Sulphuric Acid (Contact Process & Reactions) + Organic Chemistry Foundations</p>
          </div>
        </div>

        {/* Tab Buttons */}
        <nav className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/80 gap-1">
          <button
            onClick={() => { setActiveTab('discovery'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'discovery' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            🔍 Discovery
          </button>
          <button
            onClick={() => { setActiveTab('learn'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'learn' ? 'bg-gold-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            📚 Lessons ({currentSlideIdx + 1}/6)
          </button>
          <button
            onClick={() => { setActiveTab('lab'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'lab' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            🥼 Interactive Lab
          </button>
          <button
            onClick={() => { setActiveTab('challenge'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'challenge' ? 'bg-purple-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            🎯 Challenges ({currentChallengeIdx + 1}/{CHALLENGES.length})
          </button>
        </nav>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto">
        {/* TAB 1: DISCOVERY (Predict-Before-Learn) */}
        {activeTab === 'discovery' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/80 text-amber-400 text-xs font-semibold">
              <span>💡</span> Predict Before You Learn
            </div>

            <h2 className="text-2xl font-black text-white">
              Why don't chemical engineers dissolve SO₃ directly in water to make Sulphuric Acid?
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              In industrial chemistry, reacting SO₃ with water directly seems like the simplest route: SO₃ + H₂O → H₂SO₄. However, every major Contact Process plant in India (e.g. Gujarat, Odisha) absorbs SO₃ in concentrated H₂SO₄ first to make Oleum (H₂S₂O₇). What do you predict happens if SO₃ gas is passed directly into water?
            </p>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {[
                'The reaction is endothermic and freezes the water tower solid.',
                'The reaction is extremely exothermic and produces a dense mist of H₂SO₄ droplets that escape with waste gases.',
                'SO₃ gas does not dissolve in water at all and floats away.',
                'It produces explosive hydrogen gas.'
              ].map((optionText, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePredictionSubmit(idx)}
                  className={`p-4 rounded-xl border text-left text-xs md:text-sm font-semibold transition-all ${prediction === idx ? (idx === 1 ? 'bg-emerald-950 border-emerald-500 text-emerald-200' : 'bg-rose-950 border-rose-500 text-rose-200') : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{optionText}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Explanation Feedback */}
            {predictionSubmitted && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <span>✅</span> Key Industrial Insight Discovered:
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Direct reaction between SO₃ and H₂O releases huge heat. The heat boils water instantly and disperses the acid as a fine, impenetrable fog/mist of H₂SO₄ droplets. This mist cannot easily be condensed and causes severe air pollution and acid loss. The two-step Oleum route avoids mist formation completely!
                </p>
                <button
                  onClick={() => { setActiveTab('learn'); audioManager.play('swoop'); }}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg shadow-lg flex items-center gap-2 transition-all"
                >
                  <span>Start Learning Slides</span> ➔
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* TAB 2: TEACHING SLIDES */}
        {activeTab === 'learn' && (
          <div className="space-y-6">
            {/* Slide Navigation Header */}
            <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-800">
              <button
                onClick={() => { if (currentSlideIdx > 0) { setCurrentSlideIdx(prev => prev - 1); audioManager.play('pop'); } }}
                disabled={currentSlideIdx === 0}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-bold disabled:opacity-40"
              >
                ◀ Previous
              </button>
              <span className="text-xs font-bold text-slate-300">
                Slide {currentSlideIdx + 1} of {TEACHING_SLIDES.length}: <span className="text-gold-400">{currentSlide.title}</span>
              </span>
              <button
                onClick={() => { if (currentSlideIdx < TEACHING_SLIDES.length - 1) { setCurrentSlideIdx(prev => prev + 1); audioManager.play('pop'); } }}
                disabled={currentSlideIdx === TEACHING_SLIDES.length - 1}
                className="px-3 py-1.5 rounded-lg bg-gold-600 text-xs font-bold disabled:opacity-40"
              >
                Next ▶
              </button>
            </div>

            {/* Slide Main Content */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-gold-400 bg-gold-950 px-2.5 py-1 rounded border border-gold-800">
                  Node: {currentSlide.nodeId}
                </span>
                <h2 className="text-2xl font-black text-white mt-2">{currentSlide.title}</h2>
                <p className="text-xs text-slate-400 font-medium">{currentSlide.subtitle}</p>
              </div>

              {/* Explanatory Narrative */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-xs md:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {currentSlide.content}
              </div>

              {/* Key ICSE Points */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">🔑 ICSE Board Exam Essentials:</span>
                <ul className="space-y-1">
                  {currentSlide.keyPoints.map((point, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Slide Embedded Visualizer */}
              {currentSlide.interactiveMode === 'contact' && <ContactProcessVisualizer />}
              {currentSlide.interactiveMode === 'acid_lab' && <AcidPropertiesLab />}
              {currentSlide.interactiveMode === 'carbon_bonding' && <CarbonBondingVisualizer />}
              {currentSlide.interactiveMode === 'isomers' && <IsomerismExplorer />}
            </div>
          </div>
        )}

        {/* TAB 3: INTERACTIVE LAB */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            <ContactProcessVisualizer />
            <AcidPropertiesLab />
            <CarbonBondingVisualizer />
            <IsomerismExplorer />
          </div>
        )}

        {/* TAB 4: ADAPTIVE CHALLENGES */}
        {activeTab === 'challenge' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            {/* Challenge Header & Progress */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950 px-2.5 py-1 rounded border border-purple-800">
                  Challenge {currentChallengeIdx + 1} of {CHALLENGES.length} • Node: {currentChallenge.nodeId}
                </span>
                <h2 className="text-xl font-bold text-white mt-2">{currentChallenge.title}</h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-semibold">Total Score:</span>
                <span className="text-2xl font-black text-amber-400">{score} pts</span>
              </div>
            </div>

            {/* Question Text */}
            <div className="text-sm md:text-base font-semibold text-slate-200 leading-relaxed bg-slate-950 p-5 rounded-xl border border-slate-800">
              {currentChallenge.question}
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 gap-3">
              {currentChallenge.options?.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

                if (isAnswerSubmitted) {
                  if (idx === currentChallenge.correctAnswer) {
                    btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 shadow-md';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleChallengeSubmit(idx)}
                    className={`p-4 rounded-xl border text-left text-xs md:text-sm font-semibold transition-all flex items-center gap-3 ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Hint Button & Bubble */}
            <div className="pt-2">
              <button
                onClick={() => { setShowHint(!showHint); audioManager.play('hint'); }}
                className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>💡</span> {showHint ? 'Hide Hint' : 'Need a Hint?'}
              </button>
              <HintBubble show={showHint} text={currentChallenge.hint} />
            </div>

            {/* Explanation Feedback Banner */}
            {isAnswerSubmitted && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className={`text-sm font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isCorrect ? '🎉 Correct Answer!' : '❌ Not Quite Right!'}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentChallenge.explanation}
                </p>

                {/* Misconception Alert if triggered */}
                {!isCorrect && currentChallenge.misconceptionId && (
                  <div className="p-3 bg-rose-950/60 border border-rose-800/80 rounded-lg text-xs text-rose-300">
                    <span className="font-bold block mb-1">⚠️ Misconception Detector:</span>
                    {MISCONCEPTIONS_DATA.find(m => m.id === currentChallenge.misconceptionId)?.correction}
                  </div>
                )}

                <button
                  onClick={handleNextChallenge}
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-lg shadow-lg transition-all"
                >
                  {currentChallengeIdx < CHALLENGES.length - 1 ? 'Next Challenge ➔' : 'Complete Simulation & View Summary'}
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* TAB 5: SUMMARY & MASTERY DASHBOARD */}
        {activeTab === 'summary' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="text-4xl">🏆</div>
              <h2 className="text-2xl font-black text-white">Simulation Completed!</h2>
              <p className="text-xs text-slate-400">Mastery progress recorded across all 10 ICSE Chemistry nodes</p>
            </div>

            {/* Overall Score Badge */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex justify-around items-center">
              <div className="text-center">
                <span className="text-xs text-slate-400 block font-semibold">Total Score</span>
                <span className="text-3xl font-black text-amber-400">{score} pts</span>
              </div>
              <div className="w-px h-12 bg-slate-800" />
              <div className="text-center">
                <span className="text-xs text-slate-400 block font-semibold">Challenges Solved</span>
                <span className="text-3xl font-black text-emerald-400">{CHALLENGES.length} / {CHALLENGES.length}</span>
              </div>
            </div>

            {/* BKT Node Mastery Breakdown Grid */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-200">BKT Bayesian Knowledge Tracing Mastery:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ALL_NODE_IDS.map(nodeId => {
                  const state = bktStates[nodeId];
                  const level = getMasteryLevel(state);
                  const pct = Math.round(state.pKnown * 100);

                  return (
                    <div key={nodeId} className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-mono font-bold text-gold-400 block">{nodeId}</span>
                        <span className="text-slate-400 text-[10px] uppercase font-semibold">{level}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="font-bold text-slate-200 w-8 text-right">{pct}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={() => {
                  setCurrentChallengeIdx(0);
                  setActiveTab('challenge');
                  audioManager.play('swoop');
                }}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all"
              >
                🔄 Restart Challenges
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Simulation & Lab Completed!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
      {/* Misconception Checklist */}
      <div className="text-left space-y-3 pt-4 border-t border-slate-800 mt-6">
        <h3 className="text-sm font-bold text-amber-300">Common Misconception Checklist:</h3>
        <div className="grid grid-cols-1 gap-2">
          {MISCONCEPTIONS_CHECKLIST.map((m) => (
            <div key={m.id} className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-xs space-y-1">
              <div className="font-bold text-rose-400">{m.title}</div>
              <div className="text-slate-400">{m.description}</div>
              <div className="text-emerald-300 font-medium">✓ Correction: {m.correction}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}