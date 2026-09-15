"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

interface Misconception {
  id: string;
  title: string;
  description: string;
  correction: string;
}

const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Equating Water Solubility or High Concentration with Base Strength",
    description: "Students often believe that if a base dissolves completely in water or is highly concentrated, it must automatically be classified as a strong base.",
    correction: "Base strength depends on the extent of ionization in water, not on solubility or concentration. A strong base dissociates completely into hydroxide ions, whereas a weak base ionizes only partially. For example, a dilute solution of sodium hydroxide remains a strong base, while concentrated ammonium hydroxide is still a weak base.",
  },
  {
    id: "misc_2",
    title: "Believing a Chemical Formula Must Contain Hydroxide to Be a Base",
    description: "Students frequently assume that compounds lacking an explicit OH group in their chemical formula cannot act as bases.",
    correction: "According to the Arrhenius theory, bases produce hydroxide ions in water, but broader definitions like Brønsted-Lowry and Lewis classify bases based on proton acceptance and electron-pair donation. Ammonia (NH₃) lacks a hydroxide group in its formula but acts as a base by accepting a proton or donating a lone pair. Therefore, a chemical formula does not need an structural OH group to be classified as a base.",
  },
  {
    id: "misc_3",
    title: "Assuming pH Value Depends Solely on Base Strength Regardless of Concentration",
    description: "Students commonly think that a strong base will always have a higher pH than a weak base in any given solution.",
    correction: "The pH of a solution measures the actual concentration of hydrogen or hydroxide ions present, which depends on both the strength and the molar concentration of the base. A highly concentrated solution of a weak base can produce more hydroxide ions and have a higher pH than a very dilute solution of a strong base. Base strength reflects the degree of dissociation, whereas pH reflects total effective ion concentration.",
  },
  {
    id: "misc_4",
    title: "Believing Weak Bases Do Not Ionize or Produce Hydroxide Ions",
    description: "Students often misunderstand 'weak' to mean that a base does not ionize at all or fails to yield hydroxide ions in aqueous solution.",
    correction: "Weak bases do ionize in water to yield hydroxide ions, but they do so incompletely, establishing a dynamic equilibrium between molecules and ions. Typically, only a small percentage of molecules dissociate in a weak base solution. As a result, aqueous solutions of weak bases still contain hydroxide ions and can conduct electricity, albeit less effectively than strong bases.",
  },
  {
    id: "misc_5",
    title: "Thinking Lewis Bases Must Only Be Negatively Charged Chemical Species",
    description: "Students frequently believe that Lewis bases must carry a negative charge because they donate electron pairs to form coordinate bonds.",
    correction: "A Lewis base is defined as any chemical species that can donate a pair of non-bonding electrons to an electron acceptor. While negative anions like chloride or hydroxide are Lewis bases, neutral molecules with lone pairs such as water and ammonia are also classic Lewis bases. Charge is not a requirement as long as unshared valence electrons are available for donation.",
  },
];

// ==========================================
// CONSTANTS & NODE DEFINITIONS
// ==========================================
const ALL_NODE_IDS = [
  'c10_chem_021',
  'c10_chem_022',
  'c10_chem_023',
  'c10_chem_024',
  'c10_chem_025',
  'c10_chem_026',
  'c10_chem_027',
  'c10_chem_028',
  'c10_chem_029',
  'c10_chem_030',
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface BaseData {
  formula: string;
  name: string;
  solubility: 'Soluble (Alkali)' | 'Insoluble';
  strength: 'Strong' | 'Weak' | 'N/A (Insoluble)';
  acidity: 'Monoacidic' | 'Diacidic' | 'Triacidic' | 'N/A';
  ionisation: string;
  color: string;
}

interface PrecipitateReaction {
  cation: string;
  cationName: string;
  saltFormula: string;
  naohInitialColor: string;
  naohInitialFormula: string;
  naohExcess: 'Soluble (Forms Zincate/Plumbite)' | 'Insoluble' | 'Sparingly Soluble';
  naohExcessProduct: string;
  nh4ohInitialColor: string;
  nh4ohInitialFormula: string;
  nh4ohExcess: 'Soluble (Forms Deep Blue Complex)' | 'Soluble (Forms Complex)' | 'Insoluble' | 'No Precipitate';
  nh4ohExcessProduct: string;
}

interface SaltPrepMethod {
  id: string;
  name: string;
  condition: string;
  exampleSalt: string;
  equation: string;
  targetSolubility: 'Soluble' | 'Insoluble';
}

interface GasLawCase {
  id: string;
  reactionName: string;
  equation: string;
  reactants: { name: string; volumeRatio: number; color: string }[];
  products: { name: string; volumeRatio: number; color: string }[];
  explanation: string;
}

interface TeachingSlide {
  id: string;
  nodeId: NodeId;
  title: string;
  subtitle: string;
  content: string;
  keyTakeaways: string[];
  visualType: 'classifier' | 'acid_salt' | 'salt_prep' | 'analytical' | 'amphoteric' | 'gas_laws';
}

interface Challenge {
  id: string;
  nodeId: NodeId;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  misconceptionId?: string;
  hint: string;
}

// ==========================================
// DATA SETS
// ==========================================
const BASES_DATABASE: BaseData[] = [
  {
    formula: 'NaOH',
    name: 'Sodium Hydroxide',
    solubility: 'Soluble (Alkali)',
    strength: 'Strong',
    acidity: 'Monoacidic',
    ionisation: 'NaOH → Na⁺ + OH⁻ (100% ionised)',
    color: '#3B82F6',
  },
  {
    formula: 'Ca(OH)₂',
    name: 'Calcium Hydroxide',
    solubility: 'Soluble (Alkali)',
    strength: 'Weak',
    acidity: 'Diacidic',
    ionisation: 'Ca(OH)₂ ⇌ Ca²⁺ + 2OH⁻ (Partial ionisation)',
    color: '#10B981',
  },
  {
    formula: 'Al(OH)₃',
    name: 'Aluminium Hydroxide',
    solubility: 'Insoluble',
    strength: 'N/A (Insoluble)',
    acidity: 'Triacidic',
    ionisation: 'Insoluble in water; reacts with acids to yield Al³⁺ + 3OH⁻ equivalent',
    color: '#8B5CF6',
  },
  {
    formula: 'NH₄OH',
    name: 'Ammonium Hydroxide',
    solubility: 'Soluble (Alkali)',
    strength: 'Weak',
    acidity: 'Monoacidic',
    ionisation: 'NH₄OH ⇌ NH₄⁺ + OH⁻ (Partial ionisation)',
    color: '#EC4899',
  },
  {
    formula: 'Fe₂O₃',
    name: 'Iron(III) Oxide',
    solubility: 'Insoluble',
    strength: 'N/A (Insoluble)',
    acidity: 'N/A',
    ionisation: 'Solid metal oxide lattice; reacts with acids to form Fe³⁺ and H₂O',
    color: '#B45309',
  },
  {
    formula: 'CuO',
    name: 'Copper(II) Oxide',
    solubility: 'Insoluble',
    strength: 'N/A (Insoluble)',
    acidity: 'N/A',
    ionisation: 'Black solid; CuO + 2H⁺ → Cu²⁺ + H₂O',
    color: '#1F2937',
  },
];

const PRECIPITATE_TESTS: PrecipitateReaction[] = [
  {
    cation: 'Fe²⁺',
    cationName: 'Iron(II) / Ferrous',
    saltFormula: 'FeSO₄',
    naohInitialColor: '#15803D', // Dirty Green
    naohInitialFormula: 'Fe(OH)₂ (Dirty green ppt)',
    naohExcess: 'Insoluble',
    naohExcessProduct: 'Remains dirty green precipitate Fe(OH)₂',
    nh4ohInitialColor: '#15803D',
    nh4ohInitialFormula: 'Fe(OH)₂ (Dirty green ppt)',
    nh4ohExcess: 'Insoluble',
    nh4ohExcessProduct: 'Remains dirty green precipitate Fe(OH)₂',
  },
  {
    cation: 'Fe³⁺',
    cationName: 'Iron(III) / Ferric',
    saltFormula: 'FeCl₃',
    naohInitialColor: '#B45309', // Reddish-brown
    naohInitialFormula: 'Fe(OH)₃ (Reddish-brown ppt)',
    naohExcess: 'Insoluble',
    naohExcessProduct: 'Remains reddish-brown precipitate Fe(OH)₃',
    nh4ohInitialColor: '#B45309',
    nh4ohInitialFormula: 'Fe(OH)₃ (Reddish-brown ppt)',
    nh4ohExcess: 'Insoluble',
    nh4ohExcessProduct: 'Remains reddish-brown precipitate Fe(OH)₃',
  },
  {
    cation: 'Cu²⁺',
    cationName: 'Copper(II) / Cupric',
    saltFormula: 'CuSO₄',
    naohInitialColor: '#38BDF8', // Pale Blue
    naohInitialFormula: 'Cu(OH)₂ (Pale blue ppt)',
    naohExcess: 'Insoluble',
    naohExcessProduct: 'Remains pale blue precipitate Cu(OH)₂',
    nh4ohInitialColor: '#38BDF8',
    nh4ohInitialFormula: 'Cu(OH)₂ (Pale blue ppt)',
    nh4ohExcess: 'Soluble (Forms Deep Blue Complex)',
    nh4ohExcessProduct: 'Deep blue solution of [Cu(NH₃)₄](OH)₂',
  },
  {
    cation: 'Zn²⁺',
    cationName: 'Zinc(II)',
    saltFormula: 'ZnSO₄',
    naohInitialColor: '#F3F4F6', // Gelatinous White
    naohInitialFormula: 'Zn(OH)₂ (White gelatinous ppt)',
    naohExcess: 'Soluble (Forms Zincate/Plumbite)',
    naohExcessProduct: 'Clear solution of Sodium Zincate (Na₂ZnO₂)',
    nh4ohInitialColor: '#F3F4F6',
    nh4ohInitialFormula: 'Zn(OH)₂ (White gelatinous ppt)',
    nh4ohExcess: 'Soluble (Forms Complex)',
    nh4ohExcessProduct: 'Clear solution of [Zn(NH₃)₄](OH)₂',
  },
  {
    cation: 'Pb²⁺',
    cationName: 'Lead(II)',
    saltFormula: 'Pb(NO₃)₂',
    naohInitialColor: '#E5E7EB', // White ppt
    naohInitialFormula: 'Pb(OH)₂ (Chalky white ppt)',
    naohExcess: 'Soluble (Forms Zincate/Plumbite)',
    naohExcessProduct: 'Clear solution of Sodium Plumbite (Na₂PbO₂)',
    nh4ohInitialColor: '#E5E7EB',
    nh4ohInitialFormula: 'Pb(OH)₂ (Chalky white ppt)',
    nh4ohExcess: 'Insoluble',
    nh4ohExcessProduct: 'Remains white precipitate Pb(OH)₂ (Insoluble in excess NH₄OH)',
  },
  {
    cation: 'Ca²⁺',
    cationName: 'Calcium(II)',
    saltFormula: 'CaCl₂',
    naohInitialColor: '#FFFFFF',
    naohInitialFormula: 'Ca(OH)₂ (White ppt, sparingly soluble)',
    naohExcess: 'Sparingly Soluble',
    naohExcessProduct: 'White precipitate remains partially undissolved',
    nh4ohInitialColor: 'Transparent',
    nh4ohInitialFormula: 'No Precipitate',
    nh4ohExcess: 'No Precipitate',
    nh4ohExcessProduct: 'No precipitate forms (NH₄OH is too weak an alkali)',
  },
];

const SALT_PREPARATION_METHODS: SaltPrepMethod[] = [
  {
    id: 'direct_combination',
    name: 'Direct Combination (Synthesis)',
    condition: 'Preparation of binary salts (e.g. anhydrous chlorides, sulphides) directly from elements.',
    exampleSalt: 'Iron(II) Sulphide (FeS) / Anhydrous FeCl₃',
    equation: 'Fe + S → FeS  or  2Fe + 3Cl₂ → 2FeCl₃',
    targetSolubility: 'Insoluble',
  },
  {
    id: 'displacement',
    name: 'Displacement Reaction',
    condition: 'More reactive metal displaces a less reactive metal or hydrogen from acid.',
    exampleSalt: 'Zinc Sulphate (ZnSO₄)',
    equation: 'Zn + H₂SO₄ (dil) → ZnSO₄ + H₂↑',
    targetSolubility: 'Soluble',
  },
  {
    id: 'precipitation',
    name: 'Precipitation (Double Decomposition)',
    condition: 'Mixing two soluble salt solutions to prepare an INSOLUBLE salt.',
    exampleSalt: 'Silver Chloride (AgCl) / Barium Sulphate (BaSO₄)',
    equation: 'AgNO₃(aq) + NaCl(aq) → AgCl(s)↓ + NaNO₃(aq)',
    targetSolubility: 'Insoluble',
  },
  {
    id: 'insoluble_base',
    name: 'Neutralisation of an Insoluble Base',
    condition: 'Reacting excess insoluble metal oxide/hydroxide with warm acid, followed by filtration.',
    exampleSalt: 'Copper(II) Sulphate (CuSO₄)',
    equation: 'CuO(s) + H₂SO₄(aq) → CuSO₄(aq) + H₂O(l)',
    targetSolubility: 'Soluble',
  },
  {
    id: 'titration',
    name: 'Neutralisation by Titration',
    condition: 'Reacting a soluble alkali with an acid using an indicator to find exact equivalence.',
    exampleSalt: 'Sodium Chloride (NaCl) / Potassium Nitrate (KNO₃)',
    equation: 'NaOH(aq) + HCl(aq) → NaCl(aq) + H₂O(l)',
    targetSolubility: 'Soluble',
  },
  {
    id: 'acid_carbonate',
    name: 'Action of Dilute Acid on Carbonate',
    condition: 'Reacting dilute acid with metallic carbonate/bicarbonate until effervescence ceases.',
    exampleSalt: 'Calcium Chloride (CaCl₂)',
    equation: 'CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂↑',
    targetSolubility: 'Soluble',
  },
];

const GAS_LAW_CASES: GasLawCase[] = [
  {
    id: 'hcl_synthesis',
    reactionName: 'Hydrogen Chloride Synthesis',
    equation: 'H₂(g) + Cl₂(g) → 2HCl(g)',
    reactants: [
      { name: 'Hydrogen (H₂)', volumeRatio: 1, color: '#60A5FA' },
      { name: 'Chlorine (Cl₂)', volumeRatio: 1, color: '#A3E635' },
    ],
    products: [{ name: 'Hydrogen Chloride (HCl)', volumeRatio: 2, color: '#F472B6' }],
    explanation: '1 Vol H₂ combines with 1 Vol Cl₂ to yield 2 Vol HCl. Gay Lussac Ratio = 1 : 1 : 2.',
  },
  {
    id: 'water_vapour',
    reactionName: 'Water Vapour Synthesis',
    equation: '2H₂(g) + O₂(g) → 2H₂O(g)',
    reactants: [
      { name: 'Hydrogen (H₂)', volumeRatio: 2, color: '#60A5FA' },
      { name: 'Oxygen (O₂)', volumeRatio: 1, color: '#F87171' },
    ],
    products: [{ name: 'Water Vapour (H₂O)', volumeRatio: 2, color: '#38BDF8' }],
    explanation: '2 Vol H₂ combine with 1 Vol O₂ to yield 2 Vol H₂O vapour. Volume Ratio = 2 : 1 : 2.',
  },
  {
    id: 'ammonia_synthesis',
    reactionName: 'Haber Synthesis of Ammonia',
    equation: 'N₂(g) + 3H₂(g) → 2NH₃(g)',
    reactants: [
      { name: 'Nitrogen (N₂)', volumeRatio: 1, color: '#C084FC' },
      { name: 'Hydrogen (H₂)', volumeRatio: 3, color: '#60A5FA' },
    ],
    products: [{ name: 'Ammonia (NH₃)', volumeRatio: 2, color: '#FBBF24' }],
    explanation: '1 Vol N₂ combines with 3 Vol H₂ to produce 2 Vol NH₃. Volume Ratio = 1 : 3 : 2.',
  },
];

// ==========================================
// TEACHING SLIDES
// ==========================================
const TEACHING_SLIDES: TeachingSlide[] = [
  {
    id: 'slide_021',
    nodeId: 'c10_chem_021',
    title: '1. Systematic Classification of Bases',
    subtitle: 'Solubility, Strength & Acidity of Bases',
    content: `Bases are classified along 3 fundamental dimensions:
1. **Solubility in Water**: Soluble bases are called **Alkalis** (e.g. NaOH, KOH, Ca(OH)₂, NH₄OH). Insoluble bases include oxides like CuO, Fe₂O₃. Remember: *All alkalis are bases, but not all bases are alkalis!*
2. **Degree of Ionisation (Strength)**: Strong bases (NaOH, KOH) ionise 100% in water. Weak bases (NH₄OH, Ca(OH)₂) ionise only partially. Strength depends on ionisation degree, NOT concentration!
3. **Acidity of Base**: Number of OH⁻ ions furnished per molecule (Monoacidic: NaOH, Diacidic: Ca(OH)₂, Triacidic: Al(OH)₃).`,
    keyTakeaways: [
      'Alkali = Water-soluble base producing OH⁻ ions.',
      'Strength is degree of ionisation (100% vs partial), distinct from concentration.',
      'Acidity counts OH⁻ groups per molecule for acid neutralisation stoichiometry.',
    ],
    visualType: 'classifier',
  },
  {
    id: 'slide_022',
    nodeId: 'c10_chem_022',
    title: '2. Action of Dilute Acids on Salts',
    subtitle: 'Double Displacement & Unstable Acid Decomposition',
    content: `When dilute acid reacts with Carbonates, Sulphites, or Sulphides, a double displacement occurs forming an unstable intermediate acid that immediately decomposes into water and gas:
• **Carbonates / Bicarbonates**: Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂↑ (Brisk effervescence, gas turns limewater milky).
• **Sulphites / Bisulphites**: Na₂SO₃ + 2HCl → 2NaCl + H₂O + SO₂↑ (Pungent gas, turns orange dichromate green).
• **Sulphides**: FeS + 2HCl → FeCl₂ + H₂S↑ (Rotten-egg odor, turns lead acetate paper black).`,
    keyTakeaways: [
      'Acid + Salt → New Salt + Unstable Acid → New Salt + Water + Gas.',
      'Escaping gas drives reaction to completion.',
      'Gas tests: CO₂ (Limewater milky), SO₂ (Acidified K₂Cr₂O₇ green), H₂S (Lead acetate black).',
    ],
    visualType: 'acid_salt',
  },
  {
    id: 'slide_023',
    nodeId: 'c10_chem_023',
    title: '3. Strategic Methods of Salt Preparation',
    subtitle: 'Matching Preparation Technique to Salt Solubility',
    content: `How you prepare a normal salt depends on its physical solubility:
• **Insoluble Salts** (e.g., AgCl, BaSO₄, PbSO₄): Prepared by **Precipitation (Double Decomposition)** of two soluble salts OR Direct Combination (FeS).
• **Soluble Salts from Soluble Bases (Alkalis)**: Prepared by **Titration** with indicator (e.g. NaCl from NaOH + HCl).
• **Soluble Salts from Insoluble Bases**: Prepared by adding excess insoluble base to warm acid, filtering, and crystallising (e.g. CuSO₄ from CuO + H₂SO₄).`,
    keyTakeaways: [
      'Titration is mandatory for soluble alkalis because excess alkali cannot be filtered.',
      'Precipitation is used exclusively for insoluble target salts.',
      'Acid + Carbonate provides effervescence endpoint indicator.',
    ],
    visualType: 'salt_prep',
  },
  {
    id: 'slide_024',
    nodeId: 'c10_chem_024',
    title: '4. Action of Weak Alkali NH₄OH on Salts',
    subtitle: 'Precipitation & Deep Blue Complex Formation',
    content: `Ammonium hydroxide (NH₄OH) is a weak alkali providing lower OH⁻ concentration:
• **Fe²⁺**: Dirty green ppt Fe(OH)₂, insoluble in excess.
• **Fe³⁺**: Reddish-brown ppt Fe(OH)₃, insoluble in excess.
• **Cu²⁺**: Pale blue ppt Cu(OH)₂ which **DISSOLVES in excess NH₄OH** to form an intense **DEEP BLUE solution** of tetraamminecopper(II) hydroxide [Cu(NH₃)₄](OH)₂!
• **Ca²⁺**: NO PRECIPITATE (NH₄OH is too weak an alkali to supply enough OH⁻ for Ca(OH)₂ precipitation).`,
    keyTakeaways: [
      'Cu²⁺ + dropwise NH₄OH → Pale blue ppt; + excess NH₄OH → Deep blue solution.',
      'NH₄OH fails to precipitate Ca²⁺ because it is a weak alkali.',
      'Zn²⁺ forms white ppt soluble in excess NH₄OH forming tetraamminezinc complex.',
    ],
    visualType: 'analytical',
  },
  {
    id: 'slide_025',
    nodeId: 'c10_chem_025',
    title: '5. Action of Strong Alkali NaOH on Salt Solutions',
    subtitle: 'Analytical Reagent & Amphoteric Dissolution',
    content: `NaOH is a strong alkali, fully ionised into Na⁺ and OH⁻ ions:
• Precipitates hydroxides from salt solutions: Cu²⁺ (Pale blue), Fe²⁺ (Dirty green), Fe��⁺ (Reddish-brown), Mg²⁺ (Dull white), Ca²⁺ (White ppt).
• **Amphoteric Hydroxides** (Zn(OH)₂, Pb(OH)₂) dissolve in excess NaOH to form soluble **Zincates (Na₂ZnO₂)** and **Plumbites (Na₂PbO₂)**.
• **Action on Ammonium Salts**: Heating ANY ammonium salt with NaOH liberates **Ammonia gas (NH₃↑)**!`,
    keyTakeaways: [
      'NaOH precipitates Ca²⁺ (unlike NH₄OH).',
      'Amphoteric hydroxides dissolve in excess NaOH acting as acids.',
      'NH₄⁺ salt + NaOH + heat → NH₃ gas (pungent, turns red litmus blue).',
    ],
    visualType: 'analytical',
  },
  {
    id: 'slide_026',
    nodeId: 'c10_chem_026',
    title: '6. Action of Alkalis on Metals, Oxides & Hydroxides',
    subtitle: 'Dual (Amphoteric) Character of Al, Zn & Pb',
    content: `Amphoteric metals (Al, Zn, Pb), their oxides (Al₂O₃, ZnO, PbO) and hydroxides react with BOTH acids and alkalis to form salts and water (or H₂ gas):
• **With Metals**: Zn + 2NaOH → Na₂ZnO₂ + H₂↑ (Sodium Zincate + Hydrogen gas).
• **With Oxides**: ZnO + 2NaOH → Na₂ZnO₂ + H₂O.
• **With Hydroxides**: Zn(OH)₂ + 2NaOH → Na₂ZnO₂ + 2H₂O.
Basic oxides like CaO or MgO react ONLY with acids, never with alkalis!`,
    keyTakeaways: [
      'Amphoteric = Reacts with both Acids and Alkalis.',
      'Al → Aluminate (NaAlO₂), Zn → Zincate (Na₂ZnO₂), Pb → Plumbite (Na₂PbO₂).',
      'Metals release H₂ gas; Oxides/Hydroxides produce H₂O.',
    ],
    visualType: 'amphoteric',
  },
  {
    id: 'slide_027_030',
    nodeId: 'c10_chem_027',
    title: '7. Gas Laws: Gay Lussac, Avogadro & Molar Volume',
    subtitle: 'Combining Volumes, Mole Concept & Atomicity of Gases',
    content: `**Gay Lussac\'s Law**: Gases react in simple whole-number volume ratios (e.g. 1 Vol N₂ + 3 Vol H₂ → 2 Vol NH₃) at constant T & P.
**Avogadro\'s Law**: Equal volumes of ALL gases under identical T & P contain equal numbers of molecules ($N$).
**Molar Volume**: 1 Mole of ANY gas at S.T.P. (0°C, 1 atm) occupies exactly **22.4 Litres** and has a mass equal to its Gram Molecular Mass.
**Atomicity**: Proves H₂, O₂, N₂, Cl₂ are diatomic molecules because 1 Vol H₂ + 1 Vol Cl₂ → 2 Vol HCl implies 1 mol H₂ + 1 mol Cl₂ → 2 mol HCl!`,
    keyTakeaways: [
      'Gay Lussac volume ratios match stoichiometric coefficients in balanced gaseous equations.',
      'Avogadro\'s Law links gas volume directly to molecule count.',
      'At STP: Moles = Volume in Litres / 22.4 L.',
      'Atomicity of elemental gases H₂, O₂, N₂, Cl₂ is 2 (diatomic).',
    ],
    visualType: 'gas_laws',
  },
];

// ==========================================
// COMPREHENSIVE CHALLENGES (10 NODES COVERED)
// ==========================================
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_021',
    nodeId: 'c10_chem_021',
    title: 'Challenge 1: Classifying Bases',
    question: 'How would you systematically classify Calcium Hydroxide, Ca(OH)₂?',
    options: [
      'Insoluble base, Strong base, Monoacidic base',
      'Soluble base (Alkali), Weak base, Diacidic base',
      'Soluble base (Alkali), Strong base, Triacidic base',
      'Insoluble base, Weak base, Diacidic base',
    ],
    correctIndex: 1,
    explanation: 'Ca(OH)₂ dissolves sufficiently to yield OH⁻ ions (Alkali), ionises only partially (Weak base), and furnishes 2 OH⁻ ions per molecule (Diacidic base).',
    hint: 'Count the OH units per formula, check its solubility in water, and recall its partial ionisation.',
  },
  {
    id: 'ch_022',
    nodeId: 'c10_chem_022',
    title: 'Challenge 2: Dilute Acid on Carbonates',
    question: 'When dilute HCl is added to marble chips (CaCO₃), what is observed and what gas is evolved?',
    options: [
      'Brisk effervescence of CO₂ gas which turns limewater milky',
      'Pungent choking gas SO₂ which turns dichromate paper green',
      'Rotten-egg smelling gas H₂S which turns lead acetate paper black',
      'Pop-sounding gas H₂ which extinguishes a burning splint',
    ],
    correctIndex: 0,
    explanation: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑. The carbonic acid formed is unstable and splits into H₂O and CO₂ effervescence.',
    hint: 'Carbonate salts always evolve carbon dioxide when treated with dilute acids.',
  },
  {
    id: 'ch_023',
    nodeId: 'ch_023' as unknown as NodeId, // using node mapping
    nodeId: 'c10_chem_023',
    title: 'Challenge 3: Preparing Insoluble Salts',
    question: 'Which method MUST be selected to prepare insoluble Silver Chloride (AgCl)?',
    options: [
      'Titration using phenolphthalein indicator',
      'Neutralisation of insoluble oxide with dilute acid',
      'Precipitation (Double Decomposition) by mixing AgNO₃(aq) and NaCl(aq)',
      'Action of dilute acid on metallic carbonate',
    ],
    correctIndex: 2,
    explanation: 'Insoluble salts like AgCl are prepared by mixing two soluble aqueous salts (AgNO₃ + NaCl → AgCl↓ + NaNO₃).',
    hint: 'Insoluble salts drop out of solution when two soluble salts exchange partners.',
  },
  {
    id: 'ch_024',
    nodeId: 'c10_chem_024',
    title: 'Challenge 4: Special Action of NH₄OH on Copper',
    question: 'When dropwise NH₄OH is added to CuSO₄ solution followed by excess NH₄OH, what are the sequential observations?',
    options: [
      'Dirty green ppt which remains insoluble in excess',
      'Pale blue ppt which dissolves in excess to give a deep blue solution',
      'White gelatinous ppt which dissolves to form a clear zincate',
      'Reddish-brown ppt which turns into a yellow liquid',
    ],
    correctIndex: 1,
    explanation: 'CuSO₄ + 2NH₄OH → Cu(OH)₂↓ (pale blue ppt). Excess NH₄OH forms tetraamminecopper(II) hydroxide [Cu(NH₃)₄](OH)₂ which is deep blue!',
    hint: 'Copper forms a famous deep blue ammine complex with excess ammonium hydroxide.',
  },
  {
    id: 'ch_025',
    nodeId: 'c10_chem_025',
    title: 'Challenge 5: Distinguishing Cations with NaOH',
    question: 'A salt solution gives a white precipitate with NaOH that DISSOLVES in excess NaOH. Which cations could be present?',
    options: ['Fe²⁺ or Fe³⁺', 'Mg²⁺ or Ca²⁺', 'Zn²⁺ or Pb²⁺', 'Cu²⁺ or Na⁺'],
    correctIndex: 2,
    explanation: 'Zn(OH)₂ and Pb(OH)₂ are amphoteric hydroxides. They dissolve in excess NaOH to form soluble sodium zincate (Na₂ZnO₂) or sodium plumbite (Na₂PbO₂).',
    hint: 'Only amphoteric hydroxides act as acids and react with excess strong alkali to dissolve.',
  },
  {
    id: 'ch_026',
    nodeId: 'c10_chem_026',
    title: 'Challenge 6: Amphoteric Oxide Chemistry',
    question: 'Why does Zinc Oxide (ZnO) dissolve in BOTH dilute HCl and concentrated NaOH solution?',
    options: [
      'ZnO is a neutral oxide that does not react with anything',
      'ZnO is an amphoteric oxide: it acts as a base with HCl and as an acid with NaOH',
      'ZnO is a strong alkali that neutralises NaOH',
      'ZnO ionises 100% into Zn²⁺ and O²⁻ in all solutions',
    ],
    correctIndex: 1,
    explanation: 'ZnO + 2HCl → ZnCl₂ + H₂O (basic behavior) AND ZnO + 2NaOH → Na₂ZnO₂ + H₂O (acidic behavior). This dual reactivity defines amphoteric oxides.',
    hint: 'Amphoteric means dual nature—reacting with both acids and alkalis.',
  },
  {
    id: 'ch_027',
    nodeId: 'c10_chem_027',
    title: 'Challenge 7: Gay Lussac\'s Combining Volumes',
    question: 'In Haber\'s process: N₂(g) + 3H₂(g) → 2NH₃(g). What volume of NH₃ is produced when 30 cm³ of N₂ reacts completely with 90 cm³ of H₂ at constant T and P?',
    options: ['30 cm³', '60 cm³', '120 cm³', '180 cm³'],
    correctIndex: 1,
    explanation: 'By Gay Lussac\'s Law, volume ratio N₂ : H₂ : NH₃ = 1 : 3 : 2. 30 cm³ of N₂ yields 30 × 2 = 60 cm³ of NH₃ gas.',
    hint: 'Use the balanced equation coefficients directly as volume multipliers!',
  },
  {
    id: 'ch_028',
    nodeId: 'c10_chem_028',
    title: 'Challenge 8: Avogadro\'s Molecular Hypothesis',
    question: 'Two closed containers of equal volume contain Hydrogen (H₂) and Carbon Dioxide (CO₂) at the same temperature and pressure. Which statement is TRUE?',
    options: [
      'Both containers contain the exact same mass in grams',
      'Both containers contain the exact same total number of molecules',
      'The H₂ container contains 22 times more molecules than CO₂',
      'The CO₂ container contains double the number of molecules',
    ],
    correctIndex: 1,
    explanation: 'Avogadro\'s Law states equal volumes of ALL gases at identical T and P contain equal numbers of molecules, regardless of molecular mass!',
    hint: 'Volume depends on particle count and spacing, not on individual molecular weight.',
  },
  {
    id: 'ch_029',
    nodeId: 'c10_chem_029',
    title: 'Challenge 9: Molar Volume Calculations at STP',
    question: 'What volume at S.T.P. will be occupied by 44 grams of Carbon Dioxide (CO₂, molar mass = 44 g/mol)?',
    options: ['11.2 Litres', '22.4 Litres', '44.8 Litres', '2.24 Litres'],
    correctIndex: 1,
    explanation: '44 g of CO₂ = 1 mole of CO₂. By definition, 1 mole of any gas occupies 22.4 Litres at S.T.P.',
    hint: 'Mass / Molar mass = Moles. 1 mole of gas at STP occupies 22.4 L.',
  },
  {
    id: 'ch_030',
    nodeId: 'c10_chem_030',
    title: 'Challenge 10: Atomicity of Gases',
    question: 'Given 1 Vol H₂ + 1 Vol Cl₂ → 2 Vol HCl. Using Avogadro\'s law, why does this prove that Hydrogen gas is Diatomic (H₂)?',
    options: [
      '1 molecule of H₂ + 1 molecule of Cl₂ yields 2 molecules of HCl, meaning each H₂ molecule split into 2 atoms',
      'Hydrogen contains only 1 electron in its valence shell',
      'HCl contains 2 hydrogen atoms in every single molecule',
      'Hydrogen gas cannot exist as molecules at STP',
    ],
    correctIndex: 0,
    explanation: '1 Vol H₂ → 2 Vol HCl means 1 molecule of H₂ furnishes H atoms for 2 molecules of HCl. Since each HCl has 1 H atom, H₂ must contain 2 H atoms (diatomic).',
    hint: 'Track how many product molecules are formed from one reactant molecule.',
  },
];

// ==========================================
// DISCOVERY QUESTION (PREDICT BEFORE LEARN)
// ==========================================
const DISCOVERY_QUESTION = {
  title: 'Discovery Challenge: The Mystery Alkali & Reagent',
  question: 'You are given two unlabelled clear liquids in test tubes: Solution A (a strong alkali) and Solution B (a weak alkali). You add Copper Sulphate (CuSO₄) solution to both. What visual phenomenon uniquely identifies Solution B as Ammonium Hydroxide (NH₄OH)?',
  options: [
    'Solution B produces a dirty green precipitate that turns red on heating.',
    'Solution B initially forms a pale blue precipitate that dissolves in excess reagent to yield an intense, ink-like deep blue solution.',
    'Solution B liberates carbon dioxide gas with brisk effervescence.',
    'Solution B forms a heavy white precipitate that turns black in sunlight.',
  ],
  correctIndex: 1,
  explanation: 'Spot on! NH₄OH is unique: its excess forms the tetraamminecopper(II) complex [Cu(NH₃)₄]²⁺, producing a stunning deep royal blue solution. Strong alkalis like NaOH form pale blue Cu(OH)₂ which stays undissolved.',
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function C10_ChemistryClassificationofbasesSim({
  onComplete,
}: {
  onComplete?: (score: number) => void;
}) {
  // Navigation & Screen States
  const [activeTab, setActiveTab] = useState<'discovery' | 'learn' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  // Discovery State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState(false);

  // Game / Mastery Tracking
  const [score, setScore] = useState(0);
  const [bktStates, setBktStates] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const map = {} as Record<NodeId, ReturnType<typeof createBKTState>>;
    ALL_NODE_IDS.forEach((id) => {
      map[id] = createBKTState();
    });
    return map;
  });

  // UI FX States
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  // Interactive Lab States
  const [labSubTab, setLabSubTab] = useState<'classifier' | 'acid_salt' | 'salt_prep' | 'analytical' | 'amphoteric' | 'gas_laws'>('classifier');
  
  // Lab 1: Base Classifier state
  const [selectedBaseIndex, setSelectedBaseIndex] = useState(0);
  
  // Lab 2: Acid on Salt state
  const [selectedSaltType, setSelectedSaltType] = useState<'carbonate' | 'sulphite' | 'sulphide'>('carbonate');
  const [acidVolume, setAcidVolume] = useState(0); // 0 to 100
  const [gasTesting, setGasTesting] = useState(false);

  // Lab 3: Salt Prep state
  const [selectedPrepSalt, setSelectedPrepSalt] = useState<string>('AgCl');
  const [selectedPrepMethod, setSelectedPrepMethod] = useState<string | null>(null);
  const [prepResult, setPrepResult] = useState<string | null>(null);

  // Lab 4: Analytical Bench state
  const [selectedCationIndex, setSelectedCationIndex] = useState(0);
  const [reagentType, setReagentType] = useState<'NaOH' | 'NH4OH'>('NaOH');
  const [dropCount, setDropCount] = useState<number>(0); // 0 = none, 1 = dropwise, 2 = excess

  // Lab 5: Amphoteric Lab state
  const [amphotericSubstance, setAmphotericSubstance] = useState<'Zn' | 'ZnO' | 'Zn(OH)2' | 'MgO'>('Zn');
  const [addedReagent, setAddedReagent] = useState<'HCl' | 'NaOH' | null>(null);

  // Lab 6: Gas Laws & Molar Volume state
  const [selectedGasCase, setSelectedGasCase] = useState<number>(0);
  const [gasMoles, setGasMoles] = useState<number>(1);

  // Auto-hint timer
  const hintTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = TEACHING_SLIDES[currentSlideIndex];
  const currentChallenge = CHALLENGES[currentChallengeIndex];

  // Speech triggers on slide/challenge change
  useEffect(() => {
    if (activeTab === 'learn') {
      speechManager.speak(`Slide ${currentSlideIndex + 1}: ${currentSlide.title}. ${currentSlide.subtitle}`);
      speechManager.speak('Great job! Keep going.');
    } else if (activeTab === 'challenges') {
      speechManager.speak(`Challenge ${currentChallengeIndex + 1}: ${currentChallenge.title}`);
    }
  }, [activeTab, currentSlideIndex, currentChallengeIndex]);

  // Audio helper
  const playSound = (sound: SoundEffect) => {
    try {
      audioManager.play(sound);
    } catch (e) {
      console.error(e);
    }
  };

  // Trigger auto hint after inactivity
  const resetHintTimer = useCallback(() => {
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    setShowHint(false);
    hintTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges') {
        setCurrentHint(CHALLENGES[currentChallengeIndex].hint);
        setShowHint(true);
        playSound('hint');
      }
    }, 12000);
  }, [activeTab, currentChallengeIndex]);

  useEffect(() => {
    resetHintTimer();
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, [resetHintTimer]);

  // Handle Discovery Question Submit
  const handleDiscoverySubmit = () => {
    if (discoverySelected === null) return;
    setDiscoverySubmitted(true);
    if (discoverySelected === DISCOVERY_QUESTION.correctIndex) {
      playSound('drop-correct');
      playSound('sparkle');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      playSound('drop-wrong');
    }
  };

  // Handle Challenge Option Select
  const handleChallengeAnswer = (optionIdx: number) => {
    resetHintTimer();
    const isCorrect = optionIdx === currentChallenge.correctIndex;
    const nodeId = currentChallenge.nodeId;

    // Update BKT
    const updatedBkt = bktUpdate(bktStates[nodeId], isCorrect);
    setBktStates((prev) => ({ ...prev, [nodeId]: updatedBkt }));

    // SRS Update
    const reviewItem = createReviewItem(currentChallenge.id, nodeId);
    sm2Update(reviewItem, isCorrect ? 5 : 2, 0);

    if (isCorrect) {
      playSound('drop-correct');
      playSound('chime');
      setScore((prev) => prev + 10);
      setShowSuccess(true);
      setShowSparkle(true);
      setTimeout(() => {
        setShowSuccess(false);
        setShowSparkle(false);
      }, 1500);

      speechManager.speak('Correct! Excellent chemical reasoning.');

      // Advance to next challenge or summary
      setTimeout(() => {
        if (currentChallengeIndex < CHALLENGES.length - 1) {
          setCurrentChallengeIndex((prev) => prev + 1);
        } else {
          setActiveTab('summary');
          playSound('celebration');
          setShowConfetti(true);
          recordGameScore(Object.values(ALL_NODE_IDS), score + 10);
          if (onComplete) onComplete(score + 10);
        }
      }, 1600);
    } else {
      playSound('drop-wrong');
      playSound('error');
      speechManager.speak(`Incorrect. ${currentChallenge.explanation}`);
      setCurrentHint(currentChallenge.explanation);
      setShowHint(true);
    }
  };

  // Master Progress calculation
  const overallMastery = useMemo(() => {
    let total = 0;
    ALL_NODE_IDS.forEach((id) => {
      total += masteryProb(bktStates[id]);
    });
    return Math.round((total / ALL_NODE_IDS.length) * 100);
  }, [bktStates]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 select-none relative overflow-x-hidden">
      {/* Bases Classification SVG Visual */}
      <svg width={400} height={130} className="mx-auto mb-4 rounded-lg shadow-inner">
        <rect width={400} height={130} fill="#0f172a" rx={8} />
        <text x={200} y={20} textAnchor="middle" fill="#64748b" fontSize={11}>Classification of Bases</text>
        <rect x={30} y={35} width={100} height={40} rx={6} fill="#06b6d433" stroke="#06b6d4" strokeWidth={2} />
        <text x={80} y={58} textAnchor="middle" fill="#06b6d4" fontSize={9}>Strong</text>
        <text x={80} y={70} textAnchor="middle" fill="#06b6d4" fontSize={7}>NaOH, KOH</text>
        <rect x={150} y={35} width={100} height={40} rx={6} fill="#8b5cf633" stroke="#8b5cf6" strokeWidth={2} />
        <text x={200} y={58} textAnchor="middle" fill="#8b5cf6" fontSize={9}>Weak</text>
        <text x={200} y={70} textAnchor="middle" fill="#8b5cf6" fontSize={7}>NH4OH, Al(OH)3</text>
        <rect x={270} y={35} width={100} height={40} rx={6} fill="#10b98133" stroke="#10b981" strokeWidth={2} />
        <text x={320} y={58} textAnchor="middle" fill="#10b981" fontSize={9}>Super</text>
        <text x={320} y={70} textAnchor="middle" fill="#10b981" fontSize={7}>Na2O, K2O</text>
        <line x1={130} y1={55} x2={150} y2={55} stroke="#475569" strokeWidth={1} />
        <line x1={250} y1={55} x2={270} y2={55} stroke="#475569" strokeWidth={1} />
        <text x={200} y={100} textAnchor="middle" fill="#f59e0b" fontSize={9}>{'Acid + Base → Salt + Water'}</text>
        <text x={200} y={115} textAnchor="middle" fill="#64748b" fontSize={8}>{'pH > 7 | turns red litmus blue'}</text>
      </svg>
      {/* Visual FX Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={300} y={200} />

      {/* HEADER BAR */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-md mb-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-cyan-500/20">
            🧪
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
              Class 10 ICSE Chemistry • Chapter 3 & 4
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              Bases, Salts & Analytical Gas Laws
            </h1>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800/80">
          {(['discovery', 'learn', 'lab', 'challenges'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {audioManager.play('tap'); 
                playSound('tap');
                setActiveTab(tab);
              }}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all capitalize ${
                activeTab === tab
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {tab === 'discovery' ? '💡 Discovery' : tab === 'learn' ? '📖 Concept Deck' : tab === 'lab' ? '🔬 Interactive Lab' : '🎯 Challenges'}
            </button>
          ))}
        </nav>

        {/* Score & Mastery Badges */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/50 flex items-center gap-2">
            <span className="text-amber-400 text-sm">⭐</span>
            <span className="text-sm font-bold text-white">{score} pts</span>
          </div>
          <div className="bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/50 flex items-center gap-2">
            <span className="text-cyan-400 text-sm">🧠</span>
            <span className="text-sm font-bold text-cyan-300">{overallMastery}% Mastery</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto">
        {/* ========================================== */}
        {/* TAB 1: DISCOVERY SCREEN (PREDICT FIRST)   */}
        {/* ========================================== */}
        {activeTab === 'discovery' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md"
          >
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
                <span>🔍</span> Predict Before You Learn
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {DISCOVERY_QUESTION.title}
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                {DISCOVERY_QUESTION.question}
              </p>

              {/* Interactive Test Tube Visualizer for Discovery */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
                  <span className="text-xs text-slate-400 font-medium mb-2">Test Tube A (Adding NaOH)</span>
                  <div className="w-16 h-40 border-2 border-slate-600 rounded-b-full bg-slate-900 relative overflow-hidden flex flex-col justify-end">
                    <div className="w-full h-24 bg-sky-400/40 border-t border-sky-300 flex items-center justify-center">
                      <span className="text-xs font-bold text-sky-100 bg-sky-900/80 px-2 py-0.5 rounded">Cu(OH)₂ ppt</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 mt-2">Pale blue solid remains insoluble</span>
                </div>

                <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
                  <span className="text-xs text-slate-400 font-medium mb-2">Test Tube B (Adding NH₄OH)</span>
                  <div className="w-16 h-40 border-2 border-slate-600 rounded-b-full bg-slate-900 relative overflow-hidden flex flex-col justify-end">
                    <div className="w-full h-24 bg-blue-900 border-t border-blue-500 flex items-center justify-center shadow-lg shadow-blue-600/50 animate-pulse">
                      <span className="text-xs font-bold text-blue-100 bg-blue-950/90 px-2 py-0.5 rounded">Deep Blue Soln</span>
                    </div>
                  </div>
                  <span className="text-xs text-cyan-400 mt-2 font-medium">Precipitate dissolves into Deep Royal Blue!</span>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => {audioManager.play('tap'); 
                      playSound('tap');
                      setDiscoverySelected(idx);
                    }}
                    disabled={discoverySubmitted}
                    className={`w-full p-4 rounded-xl text-left text-sm sm:text-base font-medium transition-all border ${
                      discoverySelected === idx
                        ? 'border-cyan-400 bg-cyan-500/10 text-white shadow-md'
                        : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {!discoverySubmitted ? (
                <button
                  onClick={handleDiscoverySubmit}
                  disabled={discoverySelected === null}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-slate-950 shadow-lg shadow-cyan-500/25 hover:opacity-90 disabled:opacity-50 transition-all text-base"
                >
                  Submit Prediction & Unlock Laboratory
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className={`p-5 rounded-2xl border ${
                    discoverySelected === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  }`}
                >
                  <h4 className="font-extrabold text-base mb-2">
                    {discoverySelected === DISCOVERY_QUESTION.correctIndex ? '🎉 Brilliant Deduction!' : '💡 Chemical Insight'}
                  </h4>
                  <p className="text-sm leading-relaxed">{DISCOVERY_QUESTION.explanation}</p>
                  <button
                    onClick={() => {audioManager.play('tap'); 
                      playSound('whoosh');
                      setActiveTab('learn');
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm shadow-md hover:bg-cyan-400 transition-all"
                  >
                    Continue to Concept Deck →
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ========================================== */}
        {/* TAB 2: CONCEPT DECK (VISUAL TEACHING SLIDES) */}
        {/* ========================================== */}
        {activeTab === 'learn' && (
          <div className="space-y-6">
            {/* Slide Navigation Header */}
            <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">
                  Slide {currentSlideIndex + 1} of {TEACHING_SLIDES.length}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400 font-medium">Node: {currentSlide.nodeId}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {audioManager.play('tap'); 
                    playSound('tap');
                    setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
                  }}
                  disabled={currentSlideIndex === 0}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300 disabled:opacity-40 hover:bg-slate-700"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => {audioManager.play('tap'); 
                    playSound('tap');
                    if (currentSlideIndex < TEACHING_SLIDES.length - 1) {
                      setCurrentSlideIndex((prev) => prev + 1);
                    } else {
                      setActiveTab('lab');
                    }
                  }}
                  className="px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400"
                >
                  {currentSlideIndex === TEACHING_SLIDES.length - 1 ? 'Open Interactive Lab 🔬' : 'Next Slide →'}
                </button>
              </div>
            </div>

            {/* Slide Card */}
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Left Column: Narrative Content */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{currentSlide.title}</h2>
                  <p className="text-sm sm:text-base font-semibold text-cyan-400 mt-1">{currentSlide.subtitle}</p>
                </div>

                <div className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line bg-slate-950/50 p-5 rounded-2xl border border-slate-800/80">
                  {currentSlide.content}
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Mastery Principles:</h4>
                  <ul className="space-y-1.5">
                    {currentSlide.keyTakeaways.map((takeaway, i) => (
                      <li key={i} className="text-xs sm:text-sm text-cyan-200 flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">✓</span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Custom Visual Interactive Component */}
              <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
                <div className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                  <span>🎨</span> Interactive Chemistry Visualiser
                </div>

                {/* VISUAL COMPONENT BY TYPE */}
                {currentSlide.visualType === 'classifier' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="bg-blue-950/60 p-3 rounded-xl border border-blue-800/50">
                        <span className="text-blue-400 font-bold block">Soluble Bases (Alkalis)</span>
                        <span className="text-slate-300 text-[11px]">NaOH, KOH, Ca(OH)₂, NH₄OH</span>
                        <span className="text-emerald-400 text-[10px] block mt-1">Furnish OH⁻ in H₂O</span>
                      </div>
                      <div className="bg-amber-950/60 p-3 rounded-xl border border-amber-800/50">
                        <span className="text-amber-400 font-bold block">Insoluble Bases</span>
                        <span className="text-slate-300 text-[11px]">CuO, Fe₂O₃, Al(OH)₃</span>
                        <span className="text-amber-300 text-[10px] block mt-1">Do not form OH⁻ soln</span>
                      </div>
                    </div>

                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-400">Ionisation Strength Matrix:</span>
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="flex justify-between items-center bg-emerald-950/40 p-2 rounded border border-emerald-800/40">
                          <span className="text-emerald-300 font-bold">NaOH (Strong Base)</span>
                          <span className="text-[10px] text-emerald-400">100% Ionised → Na⁺ + OH⁻</span>
                        </div>
                        <div className="flex justify-between items-center bg-amber-950/40 p-2 rounded border border-amber-800/40">
                          <span className="text-amber-300 font-bold">NH₄OH (Weak Base)</span>
                          <span className="text-[10px] text-amber-400">Partial ⇌ NH₄⁺ + OH⁻</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide.visualType === 'acid_salt' && (
                  <div className="space-y-3">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center space-y-3">
                      <div className="text-xs font-bold text-slate-300">Reaction Mechanism</div>
                      <div className="text-xs bg-slate-950 p-2 rounded border border-slate-800 text-cyan-300 font-mono">
                        Salt + Dilute Acid → New Salt + [H₂CO₃ / H₂SO₃] → Gas↑
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-[11px]">
                        <div className="bg-slate-950 p-2 rounded border border-slate-800">
                          <span className="font-bold text-emerald-400 block">CO₂ Gas</span>
                          <span className="text-slate-400">Limewater Milky</span>
                        </div>
                        <div className="bg-slate-950 p-2 rounded border border-slate-800">
                          <span className="font-bold text-amber-400 block">SO₂ Gas</span>
                          <span className="text-slate-400">K₂Cr₂O₇ Green</span>
                        </div>
                        <div className="bg-slate-950 p-2 rounded border border-slate-800">
                          <span className="font-bold text-rose-400 block">H₂S Gas</span>
                          <span className="text-slate-400">Lead Acetate Black</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide.visualType === 'salt_prep' && (
                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <span className="font-bold text-cyan-400 block">Salt Preparation Decision Matrix</span>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="bg-slate-950 p-2 rounded border border-slate-800">
                          <span className="font-bold text-white block">Soluble Salt</span>
                          <span className="text-slate-400 block">• Alkali → Titration</span>
                          <span className="text-slate-400 block">• Oxide → Insoluble base + Acid</span>
                        </div>
                        <div className="bg-slate-950 p-2 rounded border border-slate-800">
                          <span className="font-bold text-amber-300 block">Insoluble Salt</span>
                          <span className="text-slate-400 block">• Soluble + Soluble → Precipitation!</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide.visualType === 'analytical' && (
                  <div className="space-y-3">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="font-bold text-cyan-300 flex justify-between">
                        <span>Reagent Comparison</span>
                        <span className="text-slate-400">NaOH vs NH₄OH</span>
                      </div>
                      <div className="space-y-1 text-[11px]">
                        <div className="p-2 bg-slate-950 rounded flex justify-between">
                          <span className="text-slate-300">Cu²⁺ + Excess NH₄OH</span>
                          <span className="text-blue-400 font-bold">Deep Royal Blue Solution</span>
                        </div>
                        <div className="p-2 bg-slate-950 rounded flex justify-between">
                          <span className="text-slate-300">Zn²⁺ / Pb²⁺ + Excess NaOH</span>
                          <span className="text-emerald-400 font-bold">Dissolves (Zincate/Plumbite)</span>
                        </div>
                        <div className="p-2 bg-slate-950 rounded flex justify-between">
                          <span className="text-slate-300">Ca²⁺ + NH₄OH</span>
                          <span className="text-rose-400 font-bold">No Precipitate</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide.visualType === 'amphoteric' && (
                  <div className="space-y-3 text-xs">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center space-y-2">
                      <span className="font-bold text-amber-400 block">Amphoteric Dual Reactions</span>
                      <div className="bg-slate-950 p-2 rounded font-mono text-cyan-300 text-[11px]">
                        Zn + 2NaOH → Na₂ZnO₂ + H₂↑
                      </div>
                      <div className="bg-slate-950 p-2 rounded font-mono text-blue-300 text-[11px]">
                        ZnO + 2HCl → ZnCl₂ + H₂O
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide.visualType === 'gas_laws' && (
                  <div className="space-y-3 text-xs">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between font-bold text-cyan-400">
                        <span>Gay Lussac & Avogadro</span>
                        <span className="text-emerald-400">22.4 L / mol at STP</span>
                      </div>
                      <div className="bg-slate-950 p-2 rounded text-[11px] space-y-1">
                        <div>N₂ + 3H₂ → 2NH₃ (Volume ratio 1 : 3 : 2)</div>
                        <div className="text-slate-400">1 Mole Gas at 0°C, 1 atm = 22.4 Litres</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-center pt-2">
                  <span className="text-[11px] text-slate-500 font-medium">
                    Use the Interactive Laboratory to run live experiments!
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 3: INTERACTIVE CHEMISTRY LABORATORY    */}
        {/* ========================================== */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Lab Sub-Navigation Header */}
            <div className="flex flex-wrap items-center justify-between bg-slate-900/90 border border-slate-800 rounded-2xl p-3 gap-2">
              <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider px-2">
                🧪 Hands-on Virtual Bench:
              </span>
              <div className="flex flex-wrap gap-1">
                {[
                  { id: 'classifier', label: '1. Base Classifier' },
                  { id: 'acid_salt', label: '2. Acid on Salts' },
                  { id: 'salt_prep', label: '3. Salt Prep Lab' },
                  { id: 'analytical', label: '4. Analytical Bench' },
                  { id: 'amphoteric', label: '5. Amphoteric Action' },
                  { id: 'gas_laws', label: '6. Gas Laws & Molar Vol' },
                ].map((lab) => (
                  <button
                    key={lab.id}
                    onClick={() => {audioManager.play('tap'); 
                      playSound('tap');
                      setLabSubTab(lab.id as typeof labSubTab);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      labSubTab === lab.id
                        ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {lab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* LAB WORKSPACE */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-md">
              {/* LAB 1: BASE CLASSIFIER & IONISATION CHAMBER */}
              {labSubTab === 'classifier' && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">Base Classifier & Ionisation Chamber</h3>
                      <p className="text-xs text-slate-400">Select a base to observe its molecular dissociation in water and classification markers.</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {BASES_DATABASE.map((b, idx) => (
                        <button
                          key={b.formula}
                          onClick={() => {audioManager.play('tap'); 
                            playSound('tap');
                            setSelectedBaseIndex(idx);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                            selectedBaseIndex === idx
                              ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                              : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                          }`}
                        >
                          {b.formula}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Beaker & Ion Visualization */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative min-h-[260px]">
                      <span className="text-xs font-semibold text-slate-400 mb-2">Aqueous Solution: {BASES_DATABASE[selectedBaseIndex].name}</span>

                      {/* Animated Beaker SVG */}
                      <div className="w-44 h-48 border-4 border-slate-600 border-t-0 rounded-b-3xl relative bg-slate-900/60 overflow-hidden flex flex-col justify-end shadow-inner">
                        {/* Water Fluid */}
                        <motion.div
                          animate={{ height: '70%' }}
                          className="w-full bg-cyan-900/40 relative border-t border-cyan-400/50 flex items-center justify-center p-2"
                        >
                          {/* Animated Ions inside liquid */}
                          <div className="w-full h-full relative">
                            {BASES_DATABASE[selectedBaseIndex].solubility.startsWith('Soluble') ? (
                              <>
                                {/* Floating OH- ions */}
                                <motion.div
                                  animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                                  transition={{ repeat: Infinity, duration: 2.5 }}
                                  className="absolute top-4 left-6 px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-black text-xs shadow-lg"
                                >
                                  OH⁻
                                </motion.div>
                                <motion.div
                                  animate={{ y: [0, 12, 0], x: [0, -6, 0] }}
                                  transition={{ repeat: Infinity, duration: 3 }}
                                  className="absolute top-10 right-8 px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-black text-xs shadow-lg"
                                >
                                  OH⁻
                                </motion.div>
                                <motion.div
                                  animate={{ y: [0, -8, 0] }}
                                  transition={{ repeat: Infinity, duration: 2 }}
                                  className="absolute bottom-6 left-10 px-2 py-0.5 rounded-full bg-blue-500 text-white font-black text-xs shadow-lg"
                                >
                                  Cation⁺
                                </motion.div>
                              </>
                            ) : (
                              /* Insoluble precipitate solid block at bottom */
                              <div className="absolute bottom-2 left-4 right-4 h-8 bg-amber-700/80 rounded border border-amber-600 flex items-center justify-center">
                                <span className="text-[10px] text-amber-200 font-bold">Undissolved Solid Lattice</span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Properties & Equations Panel */}
                    <div className="md:col-span-6 space-y-3">
                      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-extrabold text-white">{BASES_DATABASE[selectedBaseIndex].name}</span>
                          <span className="text-xs font-mono font-bold px-2 py-1 bg-slate-800 text-cyan-300 rounded">
                            {BASES_DATABASE[selectedBaseIndex].formula}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                          <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                            <span className="text-slate-400 text-[10px] block">Solubility</span>
                            <span className="font-bold text-cyan-400">{BASES_DATABASE[selectedBaseIndex].solubility}</span>
                          </div>
                          <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                            <span className="text-slate-400 text-[10px] block">Ionisation Strength</span>
                            <span className="font-bold text-emerald-400">{BASES_DATABASE[selectedBaseIndex].strength}</span>
                          </div>
                          <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
                            <span className="text-slate-400 text-[10px] block">Acidity of Base</span>
                            <span className="font-bold text-purple-400">{BASES_DATABASE[selectedBaseIndex].acidity}</span>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Ionisation Behavior:</span>
                          <p className="text-xs font-mono text-cyan-300">{BASES_DATABASE[selectedBaseIndex].ionisation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 2: ACTION OF DILUTE ACIDS ON SALTS */}
              {labSubTab === 'acid_salt' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Action of Dilute Acids on Carbonates, Sulphites & Sulphides</h3>
                    <p className="text-xs text-slate-400">Add dilute hydrochloric acid to salt solutions and test the evolved gases.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Controls */}
                    <div className="md:col-span-5 space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-300">Select Salt Target:</label>
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            { id: 'carbonate', label: 'Na₂CO₃ (Sodium Carbonate)', gas: 'CO₂' },
                            { id: 'sulphite', label: 'Na₂SO₃ (Sodium Sulphite)', gas: 'SO₂' },
                            { id: 'sulphide', label: 'FeS (Iron(II) Sulphide)', gas: 'H₂S' },
                          ].map((s) => (
                            <button
                              key={s.id}
                              onClick={() => {
                                playSound('tap');
                                setSelectedSaltType(s.id as typeof selectedSaltType);
                                setAcidVolume(0);
                                setGasTesting(false);
                              }}
                              className={`p-3 rounded-xl text-xs font-bold text-left transition-all border ${
                                selectedSaltType === s.id
                                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span>{s.label}</span>
                                <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-cyan-400 font-mono">Evolves {s.gas}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Slider to add HCl */}
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                        <div className="flex justify-between text-xs font-bold text-slate-300">
                          <span>Add Dilute HCl:</span>
                          <span className="text-cyan-400 font-mono">{acidVolume} mL</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={acidVolume}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setAcidVolume(val);
                            if (val > 20 && Math.random() < 0.2) playSound('pop');
                          }}
                          className="w-full accent-cyan-400 cursor-pointer"
                        />
                      </div>

                      <button
                        onClick={() => {
                          playSound('sparkle');
                          setGasTesting(true);
                        }}
                        disabled={acidVolume === 0}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-slate-950 text-xs shadow-lg disabled:opacity-50 hover:opacity-90 transition-all"
                      >
                        🧪 Perform Gas Confirmation Test
                      </button>
                    </div>

                    {/* Simulation Animation View */}
                    <div className="md:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center min-h-[300px] relative">
                      {/* Reaction Vessel */}
                      <div className="w-40 h-44 border-4 border-slate-600 border-t-0 rounded-b-3xl relative bg-slate-900/50 flex flex-col justify-end overflow-hidden">
                        {/* Reaction Fluid */}
                        <div
                          className="w-full bg-cyan-900/50 transition-all duration-300 relative"
                          style={{ height: `${30 + acidVolume * 0.4}%` }}
                        >
                          {/* Gas Effervescence Bubbles */}
                          {acidVolume > 10 && (
                            <div className="absolute inset-0 overflow-hidden">
                              {[...Array(8)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  animate={{ y: [40, -60], opacity: [1, 0] }}
                                  transition={{ repeat: Infinity, duration: 1 + (i % 3) * 0.4, delay: i * 0.2 }}
                                  className="absolute w-2 h-2 rounded-full bg-cyan-300/80 shadow"
                                  style={{ left: `${15 + i * 10}%` }}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Evolved Gas Output Indicator */}
                      {gasTesting && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-4 p-3 bg-slate-900 rounded-xl border border-cyan-500/40 text-center space-y-1 w-full max-w-sm"
                        >
                          <span className="text-xs font-bold text-cyan-300 block">
                            {selectedSaltType === 'carbonate'
                              ? 'CO₂ Gas Tested with Limewater'
                              : selectedSaltType === 'sulphite'
                              ? 'SO₂ Gas Tested with K₂Cr₂O₇ Paper'
                              : 'H₂S Gas Tested with Lead Acetate Paper'}
                          </span>
                          <span className="text-[11px] text-emerald-400 font-semibold block">
                            {selectedSaltType === 'carbonate'
                              ? 'Ca(OH)₂ + CO₂ → CaCO₃↓ (Turns Limewater MILKY!)'
                              : selectedSaltType === 'sulphite'
                              ? 'Turns Acidified Dichromate Paper ORANGE to GREEN!'
                              : 'Turns Lead Acetate Paper SILVERY BLACK (PbS)!'}
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 3: SALT PREPARATION DECISION TREE & SYNTHESIS */}
              {labSubTab === 'salt_prep' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Salt Synthesis Laboratory</h3>
                    <p className="text-xs text-slate-400">Select a target salt and choose the correct preparation method based on solubility rules.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Target Salt Selector */}
                    <div className="md:col-span-4 space-y-3">
                      <span className="text-xs font-bold text-slate-300 block">Select Target Salt:</span>
                      <div className="space-y-2">
                        {[
                          { formula: 'AgCl', name: 'Silver Chloride', solubility: 'Insoluble' },
                          { formula: 'CuSO₄', name: 'Copper(II) Sulphate', solubility: 'Soluble' },
                          { formula: 'NaCl', name: 'Sodium Chloride', solubility: 'Soluble' },
                          { formula: 'FeS', name: 'Iron(II) Sulphide', solubility: 'Insoluble' },
                        ].map((salt) => (
                          <button
                            key={salt.formula}
                            onClick={() => {
                              playSound('tap');
                              setSelectedPrepSalt(salt.formula);
                              setSelectedPrepMethod(null);
                              setPrepResult(null);
                            }}
                            className={`w-full p-3 rounded-xl border text-left transition-all ${
                              selectedPrepSalt === salt.formula
                                ? 'bg-cyan-500/20 border-cyan-400 text-white'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                            }`}
                          >
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-bold">{salt.name} ({salt.formula})</span>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                  salt.solubility === 'Insoluble' ? 'bg-amber-950 text-amber-300' : 'bg-emerald-950 text-emerald-300'
                                }`}
                              >
                                {salt.solubility}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Method Selection */}
                    <div className="md:col-span-8 space-y-4">
                      <span className="text-xs font-bold text-slate-300 block">Choose Synthesis Method:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {SALT_PREPARATION_METHODS.map((method) => (
                          <button
                            key={method.id}
                            onClick={() => {
                              playSound('tap');
                              setSelectedPrepMethod(method.id);
                            }}
                            className={`p-3 rounded-xl border text-left text-xs transition-all ${
                              selectedPrepMethod === method.id
                                ? 'bg-cyan-500 border-cyan-300 text-slate-950 font-bold'
                                : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            <span className="block font-bold">{method.name}</span>
                            <span className="text-[10px] text-slate-400 block mt-1 line-clamp-1">{method.condition}</span>
                          </button>
                        ))}
                      </div>

                      {/* Verify Synthesis Button */}
                      {selectedPrepMethod && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-2">
                          <button
                            onClick={() => {
                              // Verify if method matches target salt
                              let isCorrect = false;
                              if (selectedPrepSalt === 'AgCl' && selectedPrepMethod === 'precipitation') isCorrect = true;
                              if (selectedPrepSalt === 'CuSO₄' && selectedPrepMethod === 'insoluble_base') isCorrect = true;
                              if (selectedPrepSalt === 'NaCl' && selectedPrepMethod === 'titration') isCorrect = true;
                              if (selectedPrepSalt === 'FeS' && selectedPrepMethod === 'direct_combination') isCorrect = true;

                              if (isCorrect) {
                                playSound('drop-correct');
                                playSound('chime');
                                setPrepResult('CORRECT: Synthesis method matches salt solubility perfectly!');
                              } else {
                                playSound('drop-wrong');
                                setPrepResult('INCORRECT: Incompatible method! Check whether salt is soluble or insoluble.');
                              }
                            }}
                            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold rounded-xl text-xs shadow-lg hover:opacity-90"
                          >
                            Run Synthesis Reaction ⚗️
                          </button>
                        </motion.div>
                      )}

                      {/* Result Box */}
                      {prepResult && (
                        <div
                          className={`p-4 rounded-xl border text-xs font-semibold ${
                            prepResult.startsWith('CORRECT')
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                              : 'bg-rose-950/60 border-rose-500 text-rose-300'
                          }`}
                        >
                          {prepResult}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 4: ANALYTICAL BENCH (PRECIPITATION & DISSOLUTION) */}
              {labSubTab === 'analytical' && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">Analytical Chemistry Bench</h3>
                      <p className="text-xs text-slate-400">Test salt solutions with NaOH or NH₄OH dropwise and in excess.</p>
                    </div>

                    {/* Reagent Switcher */}
                    <div className="flex gap-2">
                      {(['NaOH', 'NH4OH'] as const).map((r) => (
                        <button
                          key={r}
                          onClick={() => {
                            playSound('tap');
                            setReagentType(r);
                            setDropCount(0);
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all border ${
                            reagentType === r
                              ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-md'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          Reagent: {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Cation Selection */}
                    <div className="md:col-span-4 space-y-2">
                      <span className="text-xs font-bold text-slate-300 block">Select Metal Cation Solution:</span>
                      {PRECIPITATE_TESTS.map((test, idx) => (
                        <button
                          key={test.cation}
                          onClick={() => {
                            playSound('tap');
                            setSelectedCationIndex(idx);
                            setDropCount(0);
                          }}
                          className={`w-full p-3 rounded-xl border text-left transition-all ${
                            selectedCationIndex === idx
                              ? 'bg-cyan-500/20 border-cyan-400 text-white'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                          }`}
                        >
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold">{test.cationName}</span>
                            <span className="font-mono text-cyan-400">{test.saltFormula}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Dropwise & Excess Reaction Controls */}
                    <div className="md:col-span-8 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
                      <div className="flex items-center justify-around gap-4">
                        <button
                          onClick={() => {
                            playSound('pop');
                            setDropCount(1);
                          }}
                          className="px-5 py-2.5 rounded-xl bg-slate-800 text-cyan-300 text-xs font-bold border border-slate-700 hover:bg-slate-700 shadow"
                        >
                          💧 Add Reagent Dropwise
                        </button>
                        <button
                          onClick={() => {
                            playSound('sparkle');
                            setDropCount(2);
                          }}
                          className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-extrabold shadow-lg hover:bg-cyan-400"
                        >
                          🌊 Add Reagent in EXCESS
                        </button>
                      </div>

                      {/* Visual Test Tube Output */}
                      <div className="flex flex-col items-center justify-center pt-2">
                        <div className="w-24 h-48 border-4 border-slate-600 border-t-0 rounded-b-full bg-slate-900 relative overflow-hidden flex flex-col justify-end shadow-inner">
                          {dropCount > 0 && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: dropCount === 1 ? '50%' : '85%' }}
                              className="w-full relative transition-all duration-500 flex items-center justify-center p-2"
                              style={{
                                backgroundColor:
                                  dropCount === 1
                                    ? reagentType === 'NaOH'
                                      ? PRECIPITATE_TESTS[selectedCationIndex].naohInitialColor
                                      : PRECIPITATE_TESTS[selectedCationIndex].nh4ohInitialColor
                                    : reagentType === 'NaOH'
                                    ? PRECIPITATE_TESTS[selectedCationIndex].naohExcess.startsWith('Soluble')
                                      ? '#0284C720' // Dissolved clear
                                      : PRECIPITATE_TESTS[selectedCationIndex].naohInitialColor
                                    : PRECIPITATE_TESTS[selectedCationIndex].nh4ohExcess.startsWith('Soluble (Forms Deep Blue Complex)')
                                    ? '#1E3A8A' // Deep royal blue
                                    : PRECIPITATE_TESTS[selectedCationIndex].nh4ohExcess.startsWith('Soluble')
                                    ? '#0284C720'
                                    : PRECIPITATE_TESTS[selectedCationIndex].nh4ohInitialColor,
                              }}
                            >
                              <span className="text-[10px] font-bold text-slate-900 bg-white/80 px-1.5 py-0.5 rounded shadow text-center">
                                {dropCount === 1
                                  ? reagentType === 'NaOH'
                                    ? PRECIPITATE_TESTS[selectedCationIndex].naohInitialFormula
                                    : PRECIPITATE_TESTS[selectedCationIndex].nh4ohInitialFormula
                                  : reagentType === 'NaOH'
                                  ? PRECIPITATE_TESTS[selectedCationIndex].naohExcessProduct
                                  : PRECIPITATE_TESTS[selectedCationIndex].nh4ohExcessProduct}
                              </span>
                            </motion.div>
                          )}
                        </div>

                        {/* Text Observations */}
                        <div className="mt-4 text-center space-y-1">
                          <span className="text-xs font-bold text-slate-300 block">
                            Observation ({reagentType} + {PRECIPITATE_TESTS[selectedCationIndex].cation}):
                          </span>
                          <p className="text-xs font-semibold text-cyan-400">
                            {dropCount === 0
                              ? 'Click buttons above to add reagent.'
                              : dropCount === 1
                              ? reagentType === 'NaOH'
                                ? `Dropwise: ${PRECIPITATE_TESTS[selectedCationIndex].naohInitialFormula}`
                                : `Dropwise: ${PRECIPITATE_TESTS[selectedCationIndex].nh4ohInitialFormula}`
                              : reagentType === 'NaOH'
                              ? `In Excess: ${PRECIPITATE_TESTS[selectedCationIndex].naohExcessProduct}`
                              : `In Excess: ${PRECIPITATE_TESTS[selectedCationIndex].nh4ohExcessProduct}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 5: AMPHOTERIC DUAL BEHAVIOR */}
              {labSubTab === 'amphoteric' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Amphoteric Substance Simulator</h3>
                    <p className="text-xs text-slate-400">Demonstrate that Zn, Al, Pb and their oxides/hydroxides react with BOTH Acids and Alkalis.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-5 space-y-4">
                      <span className="text-xs font-bold text-slate-300 block">Select Sample Material:</span>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'Zn', label: 'Zinc Metal (Zn)' },
                          { id: 'ZnO', label: 'Zinc Oxide (ZnO)' },
                          { id: 'Zn(OH)2', label: 'Zinc Hydroxide' },
                          { id: 'MgO', label: 'Magnesium Oxide (Basic)' },
                        ].map((item) => (
                          <button
                            key={item.id}
                            onClick={() => {
                              playSound('tap');
                              setAmphotericSubstance(item.id as typeof amphotericSubstance);
                              setAddedReagent(null);
                            }}
                            className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                              amphotericSubstance === item.id
                                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>

                      <span className="text-xs font-bold text-slate-300 block pt-2">Add Reagent:</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            playSound('pop');
                            setAddedReagent('HCl');
                          }}
                          className="flex-1 py-3 rounded-xl bg-rose-950/80 border border-rose-700 text-rose-200 font-bold text-xs hover:bg-rose-900"
                        >
                          🧪 Add Acid (dil. HCl)
                        </button>
                        <button
                          onClick={() => {
                            playSound('pop');
                            setAddedReagent('NaOH');
                          }}
                          className="flex-1 py-3 rounded-xl bg-blue-950/80 border border-blue-700 text-blue-200 font-bold text-xs hover:bg-blue-900"
                        >
                          🧪 Add Alkali (conc. NaOH)
                        </button>
                      </div>
                    </div>

                    {/* Reaction Display Panel */}
                    <div className="md:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center min-h-[260px] text-center">
                      {!addedReagent ? (
                        <div className="text-xs text-slate-400 font-medium">Select a reagent to test dual chemical reactivity.</div>
                      ) : (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4 w-full">
                          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                            <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">
                              Reaction Equation:
                            </span>
                            <div className="font-mono text-sm text-white bg-slate-950 p-3 rounded border border-slate-800">
                              {amphotericSubstance === 'Zn' && addedReagent === 'HCl' && 'Zn + 2HCl → ZnCl₂ + H₂↑ (Liberates H₂ gas)'}
                              {amphotericSubstance === 'Zn' && addedReagent === 'NaOH' && 'Zn + 2NaOH → Na₂ZnO₂ + H₂↑ (Forms Soluble Zincate + H₂)'}
                              {amphotericSubstance === 'ZnO' && addedReagent === 'HCl' && 'ZnO + 2HCl → ZnCl₂ + H₂O (Acts as Base)'}
                              {amphotericSubstance === 'ZnO' && addedReagent === 'NaOH' && 'ZnO + 2NaOH → Na₂ZnO₂ + H₂O (Acts as Acid!)'}
                              {amphotericSubstance === 'Zn(OH)2' && addedReagent === 'HCl' && 'Zn(OH)₂ + 2HCl → ZnCl₂ + 2H₂O (Acts as Base)'}
                              {amphotericSubstance === 'Zn(OH)2' && addedReagent === 'NaOH' && 'Zn(OH)₂ + 2NaOH → Na₂ZnO₂ + 2H₂O (Dissolves into Zincate)'}
                              {amphotericSubstance === 'MgO' && addedReagent === 'HCl' && 'MgO + 2HCl → MgCl₂ + H₂O (Basic oxide reacts with acid)'}
                              {amphotericSubstance === 'MgO' && addedReagent === 'NaOH' && 'NO REACTION! MgO is Basic, NOT Amphoteric!'}
                            </div>
                          </div>

                          <span
                            className={`text-xs font-extrabold px-3 py-1 rounded-full border inline-block ${
                              amphotericSubstance === 'MgO' && addedReagent === 'NaOH'
                                ? 'bg-rose-950 text-rose-300 border-rose-700'
                                : 'bg-emerald-950 text-emerald-300 border-emerald-700'
                            }`}
                          >
                            {amphotericSubstance === 'MgO' && addedReagent === 'NaOH'
                              ? '❌ Non-amphoteric: Fails to react with alkali'
                              : '✓ Amphoteric Behavior Confirmed!'}
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 6: GAS LAWS & MOLAR VOLUME PISTON */}
              {labSubTab === 'gas_laws' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Gay Lussac & Molar Volume Cylinder</h3>
                    <p className="text-xs text-slate-400">Explore gaseous volume combining ratios and the universal 22.4 L molar volume at STP.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Select Reaction Case */}
                    <div className="md:col-span-5 space-y-4">
                      <span className="text-xs font-bold text-slate-300 block">Select Gaseous Reaction Case:</span>
                      <div className="space-y-2">
                        {GAS_LAW_CASES.map((c, idx) => (
                          <button
                            key={c.id}
                            onClick={() => {
                              playSound('tap');
                              setSelectedGasCase(idx);
                            }}
                            className={`w-full p-3 rounded-xl border text-left text-xs transition-all ${
                              selectedGasCase === idx
                                ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                            }`}
                          >
                            <span className="block font-bold text-white">{c.reactionName}</span>
                            <span className="font-mono text-cyan-400 text-[11px]">{c.equation}</span>
                          </button>
                        ))}
                      </div>

                      {/* Molar Volume Slider */}
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                        <div className="flex justify-between text-xs font-bold text-slate-300">
                          <span>Adjust Gas Amount (Moles):</span>
                          <span className="text-cyan-400 font-mono">{gasMoles} Mole(s)</span>
                        </div>
                        <input
                          type="range"
                          min="0.5"
                          max="5"
                          step="0.5"
                          value={gasMoles}
                          onChange={(e) => {
                            playSound('count');
                            setGasMoles(Number(e.target.value));
                          }}
                          className="w-full accent-cyan-400 cursor-pointer"
                        />
                        <div className="flex justify-between text-[11px] text-slate-400 font-mono pt-1">
                          <span>Volume at STP: {(gasMoles * 22.4).toFixed(1)} Litres</span>
                          <span>Molecules: {(gasMoles * 6.022).toFixed(2)} × 10²³</span>
                        </div>
                      </div>
                    </div>

                    {/* Gas Piston Animation */}
                    <div className="md:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center min-h-[300px]">
                      <div className="w-full max-w-sm space-y-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block text-center">
                          STP Gas Cylinder (0°C, 1 atm)
                        </span>

                        {/* Animated Piston Cylinder */}
                        <div className="w-48 h-56 mx-auto border-4 border-slate-600 border-t-0 rounded-b-2xl relative bg-slate-900 overflow-hidden flex flex-col justify-end shadow-2xl">
                          {/* Moving Piston Head */}
                          <motion.div
                            animate={{ bottom: `${Math.min(90, gasMoles * 18)}%` }}
                            transition={{ type: 'spring', stiffness: 100 }}
                            className="absolute left-0 right-0 h-4 bg-slate-400 border-y-2 border-slate-200 z-10 flex items-center justify-center"
                          >
                            <div className="w-8 h-8 bg-slate-600 rounded-t border-t-2 border-slate-300 -mt-10" />
                          </motion.div>

                          {/* Gas Molecule Particles */}
                          <div className="w-full h-full relative overflow-hidden bg-cyan-950/30">
                            {[...Array(Math.round(gasMoles * 6))].map((_, i) => (
                              <motion.div
                                key={i}
                                animate={{
                                  x: [0, (i % 2 === 0 ? 1 : -1) * 20, 0],
                                  y: [0, (i % 3 === 0 ? -1 : 1) * 25, 0],
                                }}
                                transition={{ repeat: Infinity, duration: 1.5 + (i % 4) * 0.3 }}
                                className="absolute w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"
                                style={{
                                  top: `${20 + (i * 12) % 60}%`,
                                  left: `${15 + (i * 15) % 70}%`,
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="text-center p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                          <span className="font-bold text-white block">
                            {GAS_LAW_CASES[selectedGasCase].explanation}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 4: COMPREHENSIVE ADAPTIVE CHALLENGES   */}
        {/* ========================================== */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Progress Header */}
            <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Question {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-semibold text-slate-400">Target Node: {currentChallenge.nodeId}</span>
              </div>
              <div className="text-xs font-mono font-bold text-amber-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                Score: {score} pts
              </div>
            </div>

            {/* Challenge Card */}
            <motion.div
              key={currentChallenge.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md max-w-3xl mx-auto space-y-6"
            >
              <div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 inline-block mb-3">
                  {currentChallenge.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                  {currentChallenge.question}
                </h3>
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-3">
                {currentChallenge.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChallengeAnswer(idx)}
                    className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-800/80 text-left text-slate-200 text-sm sm:text-base font-medium transition-all flex items-start gap-3 hover:border-cyan-500/50 shadow-md group"
                  >
                    <span className="w-7 h-7 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:border-cyan-400 group-hover:text-cyan-300 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="mt-0.5">{option}</span>
                  </button>
                ))}
              </div>

              {/* Hint Bubble Component */}
              <HintBubble show={showHint} text={currentHint} />
            </motion.div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 5: FINAL MASTERY SUMMARY               */}
        {/* ========================================== */}
        {activeTab === 'summary' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl text-center max-w-2xl mx-auto space-y-6"
          >
            <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-3xl mx-auto flex items-center justify-center text-4xl shadow-xl shadow-cyan-500/30">
              🏆
            </div>

            <h2 className="text-3xl font-black text-white">ICSE Chemistry Mastery Achieved!</h2>
            <p className="text-slate-300 text-sm sm:text-base">
              You have completed the entire suite of interactive simulations and challenges across bases, salt preparation, qualitative analytical chemistry, and gaseous volume laws.
            </p>

            {/* Score Grid */}
            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block font-semibold">Total Game Score</span>
                <span className="text-2xl font-black text-amber-400">{score} Points</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block font-semibold">BKT Concept Mastery</span>
                <span className="text-2xl font-black text-cyan-400">{overallMastery}%</span>
              </div>
            </div>

            <button
              onClick={() => {
                playSound('whoosh');
                setActiveTab('discovery');
                setScore(0);
                setCurrentChallengeIndex(0);
              }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-base shadow-lg shadow-cyan-500/25 hover:opacity-90 transition-all"
            >
              Restart Module Laboratory 🔄
            </button>
          </motion.div>
        )}
      </main>
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