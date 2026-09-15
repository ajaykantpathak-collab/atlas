"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// CONSTANTS & TYPES
// ==========================================

export const ALL_NODE_IDS = [
  'c12_chem_071',
  'c12_chem_072',
  'c12_chem_073',
  'c12_chem_074',
  'c12_chem_075',
  'c12_chem_076',
  'c12_chem_077',
  'c12_chem_078',
  'c12_chem_079',
  'c12_chem_080',
] as const;

export type NodeId = (typeof ALL_NODE_IDS)[number];

export interface TeachingSlide {
  id: string;
  nodeId: NodeId;
  title: string;
  subtitle: string;
  concept: string;
  explanation: string;
  visualType: 'benzene' | 'carbonyl' | 'testtube' | 'reactivity' | 'basicity';
  keyPoints: string[];
}

export interface Challenge {
  id: string;
  nodeId: NodeId;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  misconceptionId?: string;
  hint: string;
  reagentChoiceRequired?: boolean;
}

export interface Misconception {
  id: string;
  nodeId: NodeId;
  text: string;
  correction: string;
}

export interface VirtualTest {
  id: string;
  name: string;
  reagent: string;
  phenols: string;
  aldehydes: string;
  ketones: string;
  amines: string;
  colorHex: string;
}

// ==========================================
// STATIC ENRICHMENT DATA & CURRICULUM
// ==========================================

const SCENARIO = {
  title: "ISC Class 12 Organic Chemistry Master Lab",
  subtitle: "Explore Phenols, Ethers, Carbonyls, Carboxylic Acids, and Amines",
  description:
    "Welcome to the Advanced Organic Laboratory. Investigate molecular structures, resonance, nucleophilic additions, and qualitative diagnostic tests across all 10 core Class 12 organic functional group modules.",
};

const MISCONCEPTIONS: Record<string, Misconception> = {
  m_phenol_acid: {
    id: "m_phenol_acid",
    nodeId: "c12_chem_071",
    text: "Phenol is acidic due to resonance in the benzene ring itself.",
    correction:
      "Phenol acidity is driven specifically by the resonance stabilization of the resulting PHENOXIDE ION, where the negative charge is delocalized over oxygen and ortho/para carbons.",
  },
  m_ether_hi: {
    id: "m_ether_hi",
    nodeId: "c12_chem_072",
    text: "Anisole cleaves with HI to yield iodobenzene and methanol.",
    correction:
      "The aromatic C(sp²)-O bond has partial double bond character due to resonance and resists cleavage. Thus, HI cleavage of anisole ALWAYS gives phenol and methyl iodide.",
  },
  m_rosenmund: {
    id: "m_rosenmund",
    nodeId: "c12_chem_073",
    text: "Rosenmund reduction uses unpoisoned Pd/C to make aldehydes.",
    correction:
      "Unpoisoned catalysts reduce acyl chlorides all the way to primary alcohols. Pd/BaSO₄ MUST be poisoned with sulfur or quinoline to selectively stop at the aldehyde stage.",
  },
  m_iodoform: {
    id: "m_iodoform",
    nodeId: "c12_chem_074",
    text: "The iodoform test gives a positive yellow precipitate for ALL ketones.",
    correction:
      "The iodoform test is specific ONLY for compounds containing the methyl carbonyl (CH₃C=O) or methyl carbinol (CH₃CH(OH)-) group, yielding yellow CHI₃.",
  },
  m_aldol_alpha: {
    id: "m_aldol_alpha",
    nodeId: "c12_chem_075",
    text: "Benzaldehyde undergoes aldol condensation because it is an aldehyde.",
    correction:
      "Benzaldehyde lacks α-hydrogens! Aldehydes without α-hydrogens undergo the Cannizzaro disproportionation in concentrated base instead of aldol condensation.",
  },
  m_nitrile_acid: {
    id: "m_nitrile_acid",
    nodeId: "c12_chem_076",
    text: "Nitrile hydrolysis requires no acid catalyst and produces nitrogen gas.",
    correction:
      "Nitrile hydrolysis requires heating with dilute aqueous acid/alkali and yields carboxylic acids with NH₄⁺ or NH₃ as by-product.",
  },
  m_hvz: {
    id: "m_hvz",
    nodeId: "c12_chem_077",
    text: "Benzenoid rings undergo HVZ halogenation with Cl₂/FeCl₃.",
    correction:
      "The Hell-Volhard-Zelinsky (HVZ) reaction selectively halogenates the ALPHA-position of aliphatic carboxylic acids using Cl₂ or Br₂ with Red Phosphorus.",
  },
  m_amide_react: {
    id: "m_amide_react",
    nodeId: "c12_chem_078",
    text: "Amides are the most reactive acid derivatives because nitrogen is nucleophilic.",
    correction:
      "Amides are the LEAST reactive acid derivatives because nitrogen lone pair delocalization into the C=O strongly stabilizes the molecule, making the carbonyl carbon much less electrophilic.",
  },
  m_hofmann_step: {
    id: "m_hofmann_step",
    nodeId: "c12_chem_079",
    text: "Hofmann bromamide reaction preserves the total number of carbon atoms.",
    correction:
      "Hofmann degradation is a step-down reaction! The carbonyl carbon is removed as carbonate (Na₂CO₃), yielding a primary amine with ONE LESS carbon atom.",
  },
  m_amine_basic: {
    id: "m_amine_basic",
    nodeId: "c12_chem_080",
    text: "Tertiary amines are always the most basic in aqueous solution due to 3 +I alkyl groups.",
    correction:
      "In aqueous solution, basicity depends on inductive (+I), steric, and SOLVATION effects. For ethylamines, the order is Secondary (2°) > Primary (1°) > Tertiary (3°) > NH₃.",
  },
};

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    id: "slide_071",
    nodeId: "c12_chem_071",
    title: "1. Phenols & Phenoxide Resonance",
    subtitle: "c12_chem_071 • Aromatic Hydroxyl Acidity",
    concept: "Phenols are weakly acidic because the phenoxide anion is stabilized by π-delocalization.",
    explanation:
      "When phenol loses H⁺, the resulting phenoxide ion delocalizes its negative charge into the ortho and para positions of the benzene ring. Thus, phenol reacts with NaOH to form sodium phenoxide, whereas ethanol cannot react with NaOH.",
    visualType: "benzene",
    keyPoints: [
      "Phenol pKa ≈ 10 (far more acidic than ethanol, pKa ≈ 15.9)",
      "Reacts with NaOH and Na metal, but NOT with NaHCO₃ (weaker than H₂CO₃)",
      "Form 2,4,6-tribromophenol white precipitate with bromine water",
      "Dow's Process: Chlorobenzene + NaOH at 623 K & 300 atm",
    ],
  },
  {
    id: "slide_072",
    nodeId: "c12_chem_072",
    title: "2. Ethers & Cleavage Mechanics",
    subtitle: "c12_chem_072 • Williamson Synthesis & HI Cleavage",
    concept: "Ethers (R-O-R') have polar C-O bonds but lack O-H hydrogen bonding donors.",
    explanation:
      "Williamson synthesis connects a sodium alkoxide/phenoxide (R-ONa) with a primary alkyl halide (R'X). When cleaved with excess concentrated HI, aryl alkyl ethers (like anisole) selectively break the O-alkyl bond because the aryl C(sp²)-O bond possesses partial double bond character.",
    visualType: "reactivity",
    keyPoints: [
      "Williamson Synthesis: R-O⁻ Na⁺ + R'-X → R-O-R' + NaX",
      "Anisole + HI → Phenol + CH₃I (never iodobenzene)",
      "Ethers boil much lower than isomeric alcohols due to lack of Intermolecular H-bonding",
      "Peroxide hazard: Ethers form explosive peroxides on prolonged air contact",
    ],
  },
  {
    id: "slide_073",
    nodeId: "c12_chem_073",
    title: "3. Aldehydes & Ketones: Synthetic Routes",
    subtitle: "c12_chem_073 • Selective Carbonyl Formation",
    concept: "Preparation requires precise control over oxidation state to avoid over-oxidation.",
    explanation:
      "Primary alcohols oxidise to aldehydes using mild PCC or Cu/573K. Secondary alcohols yield ketones. Rosenmund reduction selectively converts acyl chlorides (RCOCl) into aldehydes using hydrogen gas over poisoned catalyst (H₂ / Pd-BaSO₄ + sulfur).",
    visualType: "carbonyl",
    keyPoints: [
      "1° Alcohol → RCHO (PCC or Cu/573K); 2° Alcohol → R₂CO",
      "Rosenmund Reduction: RCOCl + H₂ → RCHO + HCl (Pd-BaSO₄ / S poisoned)",
      "Stephen Reduction: R-CN + SnCl₂/HCl → Imine → RCHO",
      "Ozonolysis of alkenes & Alkyne hydration (HgSO₄/H₂SO₄)",
    ],
  },
  {
    id: "slide_074",
    nodeId: "c12_chem_074",
    title: "4. Carbonyl Properties & Diagnostic Tests",
    subtitle: "c12_chem_074 • Electrophilic Addition & Distinction Tests",
    concept: "The polar C=O carbon undergoes nucleophilic addition and diagnostic oxidation.",
    explanation:
      "The partial positive charge on carbon invites nucleophiles (HCN, NaHSO₃, Grignard, NH₂OH). Aldehydes easily reduce Tollens' reagent [Ag(NH₃)₂⁺] to give a silver mirror and Fehling's solution to red Cu₂O. Methyl carbonyls give the yellow iodoform (CHI₃) precipitate.",
    visualType: "testtube",
    keyPoints: [
      "Tollens' Test: Aldehydes → Ag mirror (Ketones = negative)",
      "Fehling's Test: Aliphatic aldehydes → Brick red Cu₂O precipitate",
      "Iodoform Test: CH₃C=O or CH₃CH(OH)- → Yellow CHI₃ precipitate",
      "Nucleophilic additions: HCN → Cyanohydrin; NH₂OH → Oxime",
    ],
  },
  {
    id: "slide_075",
    nodeId: "c12_chem_075",
    title: "5. Aldol Condensation vs. Cannizzaro",
    subtitle: "c12_chem_075 • Alpha-Hydrogen Dichotomy",
    concept: "The presence or absence of an α-hydrogen dictates the reaction path in base.",
    explanation:
      "With α-hydrogens (e.g., CH₃CHO), dilute base abstracts a proton to form an enolate, attacking another carbonyl to give a β-hydroxy aldehyde (Aldol), which dehydrates upon heating to an α,β-unsaturated aldehyde (Crotonaldehyde). Without α-hydrogens (e.g., HCHO, C₆H₅CHO), concentrated base induces Cannizzaro disproportionation to alcohol + carboxylate salt.",
    visualType: "carbonyl",
    keyPoints: [
      "Aldol (dilute NaOH + α-H): 2 CH₃CHO → CH₃CH(OH)CH₂CHO → CH₃CH=CHCHO + H₂O",
      "Cannizzaro (conc NaOH, NO α-H): 2 C₆H₅CHO → C₆H5CH₂OH + C₆H₅COONa",
      "Cross-Aldol: Benzaldehyde + Acetaldehyde → Cinnamaldehyde",
      "Redox nature of Cannizzaro: One molecule oxidised, one reduced",
    ],
  },
  {
    id: "slide_076",
    nodeId: "c12_chem_076",
    title: "6. Carboxylic Acid Preparation Routes",
    subtitle: "c12_chem_076 • Synthetic Pathways to -COOH",
    concept: "Carboxylic acids (-COOH) contain both a carbonyl and hydroxyl on the same carbon.",
    explanation:
      "Direct vigorous oxidation of 1° alcohols/aldehydes using acidified KMnO₄/K₂Cr₂O₇ yields acids. Nitriles hydrolyse with acid/base to form acids with carbon preservation. Grignard reagents react with solid CO₂ (dry ice) to extend the carbon chain by one.",
    visualType: "reactivity",
    keyPoints: [
      "Grignard Route: R-MgX + O=C=O → R-COOMgX →(H₃O⁺) R-COOH",
      "Nitrile Hydrolysis: R-CN + 2 H₂O + H⁺ → R-COOH + NH₄⁺",
      "Alkylbenzene Oxidation: Toluene + KMnO₄/OH⁻ + heat → Benzoic acid",
      "Primary Alcohol Oxidation: RCH₂OH + 2[O] → RCOOH + H₂O",
    ],
  },
  {
    id: "slide_077",
    nodeId: "c12_chem_077",
    title: "7. Carboxylic Acid Properties & Substituent Effects",
    subtitle: "c12_chem_077 • Dimerization, Substituents & HVZ",
    concept: "Strong hydrogen bonding forms dimers; electronic effects alter carboxylate stability.",
    explanation:
      "Carboxylic acids form cyclic hydrogen-bonded dimers in gas/nonpolar solvents, boosting boiling points. Electron-withdrawing groups (-NO₂, -Cl) stabilize the carboxylate anion and enhance acidity, whereas electron-donating groups (-CH₃) decrease acidity. The HVZ reaction introduces halogen at the α-position.",
    visualType: "reactivity",
    keyPoints: [
      "Acidity trend: O₂N-CH₂COOH > Cl-CH₂COOH > CH₃COOH > CH₃CH₂COOH",
      "HVZ Reaction: R-CH₂-COOH + Cl₂/Red P → R-CH(Cl)-COOH + HCl",
      "Decarboxylation: R-COONa + NaOH/CaO + heat → R-H + Na₂CO₃",
      "Effervescence with NaHCO₃ proves acidic -COOH group",
    ],
  },
  {
    id: "slide_078",
    nodeId: "c12_chem_078",
    title: "8. Acid Derivatives & Nucleophilic Substitution",
    subtitle: "c12_chem_078 • Acyl Chloride, Anhydride, Ester & Amide",
    concept: "Replacing -OH gives derivatives with a wide spectrum of electrophilic reactivity.",
    explanation:
      "Nucleophilic acyl substitution reactivity depends on leaving group ability and resonance stabilization. Acyl chlorides are most reactive because chloride is a great leaving group and electronegative. Amides are least reactive due to strong N lone pair resonance into the C=O group.",
    visualType: "reactivity",
    keyPoints: [
      "Reactivity Order: RCOCl > (RCO)₂O > RCOOR' > RCONH₂",
      "Acyl Chloride Prep: RCOOH + SOCl₂ → RCOCl + SO₂↑ + HCl↑ (Preferred - gaseous products)",
      "Fischer Esterification: RCOOH + R'OH ⇌ RCOOR' + H₂O (conc H₂SO₄ catalyst)",
      "Ammonolysis: RCOCl + 2 NH₃ → RCONH₂ + NH₄Cl",
    ],
  },
  {
    id: "slide_079",
    nodeId: "c12_chem_079",
    title: "9. Amines: Classification & Synthesis",
    subtitle: "c12_chem_079 • Nitrogen Derivatives & Step-Down Routes",
    concept: "Amines are 1°, 2°, or 3° based on the number of organic groups attached to Nitrogen.",
    explanation:
      "Nitro reduction (Fe/HCl or H₂/Pd) yields primary amines. Hofmann bromamide degradation degrades amides using Br₂/NaOH, removing one carbon as carbonate. Gabriel phthalimide synthesis cleanly prepares pure 1° aliphatic amines without polyalkylation side products.",
    visualType: "basicity",
    keyPoints: [
      "1° Amine = RNH₂; 2° Amine = R₂NH; 3° Amine = R₃N (Pyramidal, sp³ N)",
      "Hofmann Bromamide: RCONH₂ + Br₂ + 4 NaOH → R-NH₂ + Na₂CO₃ + 2 NaBr + 2 H₂O",
      "Gabriel Phthalimide: Pure 1° aliphatic amine synthesis (fails for aryl halides)",
      "Nitrile Reduction: R-CN + 4[H] (LiAlH₄) → R-CH₂-NH₂",
    ],
  },
  {
    id: "slide_080",
    nodeId: "c12_chem_080",
    title: "10. Amine Properties, Basicity & Identification",
    subtitle: "c12_chem_080 • Basicity Trends, Carbylamine & Hinsberg",
    concept: "Basicity stems from the nitrogen lone pair; tests distinguish 1°, 2°, and 3° amines.",
    explanation:
      "In water, alkylamine basicity balances inductive (+I), solvation, and steric effects. For ethylamines: 2° > 1° > 3° > NH₃. Aniline is much weaker due to lone pair delocalization into the aromatic ring. Carbylamine test detects 1° amines; Hinsberg test uses C₆H₅SO₂Cl to classify amines by alkali solubility.",
    visualType: "basicity",
    keyPoints: [
      "Aqueous Ethylamine Basicity: (C₂H₅)₂NH > C₂H₅NH₂ > (C₂H₅)₃N > NH₃ > C₆H₅NH₂",
      "Carbylamine Test (1° Amines only): RNH₂ + CHCl₃ + 3 KOH → RNC (foul smell) + 3 KCl + 3 H��O",
      "Hinsberg Test (C₆H₅SO₂Cl): 1° → Soluble in NaOH; 2° → Insoluble in NaOH; 3° → No reaction",
      "Nitrous acid (HNO₂): 1° aliphatic → R-OH + N₂↑; 2° → Yellow nitrosamine oil",
    ],
  },
];

const CHALLENGES: Challenge[] = [
  {
    id: "ch_071",
    nodeId: "c12_chem_071",
    title: "Phenol Acidity & Test Differentiation",
    question:
      "A student tests three unlabelled liquids: Ethanol, Phenol, and Acetic Acid. Which reagent will react with BOTH Phenol and Acetic Acid, but NOT Ethanol?",
    options: [
      "Sodium Bicarbonate (NaHCO₃)",
      "Aqueous Sodium Hydroxide (NaOH)",
      "Sodium Metal (Na)",
      "Neutral Ferric Chloride (FeCl₃)",
    ],
    correctIndex: 1,
    explanation:
      "Phenol (pKa ≈ 10) and Acetic Acid (pKa ≈ 4.76) are acidic enough to react with aqueous NaOH to form soluble sodium salts. Ethanol (pKa ≈ 15.9) is too weakly acidic to react with NaOH. Note: NaHCO₃ reacts only with Acetic Acid (liberating CO₂), not Phenol.",
    misconceptionId: "m_phenol_acid",
    hint: "Recall which base is strong enough to deprotonate phenols but not simple aliphatic alcohols.",
  },
  {
    id: "ch_072",
    nodeId: "c12_chem_072",
    title: "Anisole Cleavage with Hydroiodic Acid",
    question:
      "When Anisole (Methoxybenzene, C₆H₅OCH₃) is heated with excess concentrated HI, what are the primary organic products?",
    options: [
      "Iodobenzene (C₆H₅I) and Methanol (CH₃OH)",
      "Phenol (C₆H₅OH) and Methyl Iodide (CH₃I)",
      "Benzene (C₆H₆) and Iodomethane (CH₃I)",
      "Iodobenzene (C₆H₅I) and Iodomethane (CH₃I)",
    ],
    correctIndex: 1,
    explanation:
      "In anisole, the C(sp²)-O bond between oxygen and the benzene ring possesses partial double bond character due to resonance and is exceptionally strong. Thus, nucleophilic attack by I⁻ occurs exclusively at the methyl carbon (S_N2), forming Phenol (C₆H₅OH) and Methyl Iodide (CH₃I).",
    misconceptionId: "m_ether_hi",
    hint: "Think about which C-O bond is reinforced by aromatic resonance delocalization.",
  },
  {
    id: "ch_073",
    nodeId: "c12_chem_073",
    title: "Rosenmund Reduction Reagent Selection",
    question:
      "To selectively convert Benzoyl Chloride (C₆H₅COCl) into Benzaldehyde (C₆H₅CHO) without over-reduction to Benzyl Alcohol, which catalyst system must be used?",
    options: [
      "LiAlH₄ in dry ether",
      "H₂ over Nickel catalyst at high temperature",
      "H₂ over Palladium supported on BaSO₄, poisoned with Sulfur/Quinoline",
      "Zn-Hg with concentrated HCl",
    ],
    correctIndex: 2,
    explanation:
      "This is Rosenmund's Reduction. Hydrogenation over Pd-BaSO₄ deactivated (poisoned) with sulfur or quinoline selectively reduces acyl chlorides to aldehydes. Unpoisoned catalysts would reduce the aldehyde further to primary alcohols.",
    misconceptionId: "m_rosenmund",
    hint: "Identify the poisoned palladium catalyst named after Karl Wilhelm Rosenmund.",
  },
  {
    id: "ch_074",
    nodeId: "c12_chem_074",
    title: "Diagnostic Distinguishing Tests",
    question:
      "An unknown liquid gives a positive Silver Mirror with Tollens' reagent but FAILS to produce a yellow precipitate with Iodoform reagent (I₂/NaOH). The liquid is most likely:",
    options: [
      "Acetone (Propanone, CH₃COCH₃)",
      "Acetaldehyde (Ethanal, CH₃CHO)",
      "Benzaldehyde (C₆H₅CHO)",
      "Ethanol (CH₃CH₂OH)",
    ],
    correctIndex: 2,
    explanation:
      "Benzaldehyde reduces Tollens' reagent to metallic silver (Ag mirror) because it is an aldehyde. However, it lacks a methyl carbonyl group (CH₃C=O), so it gives a negative iodoform test. (Acetaldehyde gives POSITIVE tests for both!).",
    misconceptionId: "m_iodoform",
    hint: "Which aromatic aldehyde acts as a reducing agent for Tollens' but lacks a CH₃C=O group?",
  },
  {
    id: "ch_075",
    nodeId: "c12_chem_075",
    title: "Aldol vs Cannizzaro Pathways",
    question:
      "When Formaldehyde (HCHO) and Benzaldehyde (C₆H₅CHO) are heated together with concentrated NaOH (Cross Cannizzaro), what are the main products?",
    options: [
      "Sodium formate (HCOONa) and Benzyl alcohol (C₆H₅CH₂OH)",
      "Sodium benzoate (C₆H₅COONa) and Methanol (CH₃OH)",
      "Cinnamaldehyde and Water",
      "3-hydroxybutanal and Sodium hydroxide",
    ],
    correctIndex: 0,
    explanation:
      "Neither aldehyde has α-hydrogens, so Cannizzaro occurs. Formaldehyde is more readily attacked by OH⁻ and more easily oxidised than benzaldehyde. Hence, Formaldehyde is oxidised to Sodium Formate (HCOONa), while Benzaldehyde is reduced to Benzyl Alcohol (C₆H₅CH₂OH).",
    misconceptionId: "m_aldol_alpha",
    hint: "Formaldehyde is smaller and much more susceptible to nucleophilic attack than aromatic benzaldehyde.",
  },
  {
    id: "ch_076",
    nodeId: "c12_chem_076",
    title: "Grignard Synthesis of Carboxylic Acids",
    question:
      "Methylmagnesium bromide (CH₃MgBr) is reacted with solid CO₂ (dry ice) in dry ether, followed by acidic hydrolysis. What organic acid is produced?",
    options: [
      "Formic acid (HCOOH)",
      "Acetic acid (Ethanoic acid, CH₃COOH)",
      "Propanoic acid (CH₃CH₂COOH)",
      "Oxalic acid (HOOC-COOH)",
    ],
    correctIndex: 1,
    explanation:
      "The nucleophilic methyl group from CH₃MgBr attacks the electrophilic carbon of O=C=O to form the magnesium salt intermediate CH₃COOMgBr. Acid hydrolysis replaces MgBr with H⁺ to yield Acetic acid (CH₃COOH), extending the carbon chain by exactly 1 carbon.",
    misconceptionId: "m_nitrile_acid",
    hint: "Combine 1 methyl carbon with 1 carbon dioxide carbon.",
  },
  {
    id: "ch_077",
    nodeId: "c12_chem_077",
    title: "Alpha Halogenation (HVZ Reaction)",
    question:
      "Propanoic acid (CH₃CH₂COOH) is treated with Chlorine gas in the presence of Red Phosphorus, followed by water workup. What is the major product?",
    options: [
      "3-chloropropanoic acid (Cl-CH₂CH₂COOH)",
      "2-chloropropanoic acid (CH₃CH(Cl)COOH)",
      "Propanoyl chloride (CH₃CH₂COCl)",
      "Trichloromethane and carbon dioxide",
    ],
    correctIndex: 1,
    explanation:
      "This is the Hell-Volhard-Zelinsky (HVZ) reaction. Cl₂/Red P selectively halogenates the ALPHA-carbon (the carbon adjacent to the -COOH group), converting CH₃CH₂COOH into 2-chloropropanoic acid [CH₃CH(Cl)COOH].",
    misconceptionId: "m_hvz",
    hint: "Which specific carbon position adjacent to -COOH undergoes halogenation in HVZ?",
  },
  {
    id: "ch_078",
    nodeId: "c12_chem_078",
    title: "Acyl Derivative Reactivity Ranking",
    question:
      "Rank the following acid derivatives in DECREASING order of reactivity towards Nucleophilic Acyl Substitution: (i) Acetamide, (ii) Acetyl Chloride, (iii) Ethyl Acetate, (iv) Acetic Anhydride.",
    options: [
      "Acetyl Chloride > Acetic Anhydride > Ethyl Acetate > Acetamide",
      "Acetamide > Ethyl Acetate > Acetic Anhydride > Acetyl Chloride",
      "Acetyl Chloride > Ethyl Acetate > Acetic Anhydride > Acetamide",
      "Acetic Anhydride > Acetyl Chloride > Ethyl Acetate > Acetamide",
    ],
    correctIndex: 0,
    explanation:
      "Reactivity depends on leaving group ability and resonance stabilization of the starting carbonyl. Cl⁻ is the best leaving group and least electron-donating. Thus: Acyl Chloride > Anhydride > Ester > Amide.",
    misconceptionId: "m_amide_react",
    hint: "Which derivative has the best leaving group (Cl⁻) and which has strong N lone pair resonance stabilization?",
  },
  {
    id: "ch_079",
    nodeId: "c12_chem_079",
    title: "Hofmann Degradation Mechanics",
    question:
      "Propanamide (CH₃CH₂CONH₂) is treated with Bromine (Br₂) and aqueous Sodium Hydroxide (NaOH). What is the amine product formed?",
    options: [
      "Propan-1-amine (CH₃CH₂CH₂NH₂)",
      "Ethanamine (CH₃CH₂NH₂)",
      "Methanamine (CH₃NH₂)",
      "Propyl nitrite (CH₃CH₂CH₂NO₂)",
    ],
    correctIndex: 1,
    explanation:
      "Hofmann bromamide degradation converts an amide (RCONH₂) into a primary amine (RNH₂) with ONE LESS carbon atom, losing the carbonyl as Na₂CO₃. Propanamide (3 carbons) yields Ethanamine (2 carbons).",
    misconceptionId: "m_hofmann_step",
    hint: "Remember that Hofmann degradation is a carbon step-down reaction!",
  },
  {
    id: "ch_080",
    nodeId: "c12_chem_080",
    title: "Hinsberg Separation & Amine Basicity",
    question:
      "An unknown amine reacts with Benzenesulphonyl Chloride (C₆H₅SO₂Cl) to give a solid precipitate that is INSOLUBLE in aqueous NaOH. What type of amine is it?",
    options: [
      "Primary aliphatic amine (1°)",
      "Secondary aliphatic amine (2°)",
      "Tertiary aliphatic amine (3°)",
      "Quaternary ammonium salt",
    ],
    correctIndex: 1,
    explanation:
      "In the Hinsberg test: 1° amines form N-alkylbenzenesulphonamides with an acidic N-H that dissolves in NaOH. 2° amines form N,N-dialkylbenzenesulphonamides which have NO acidic N-H and remain INSOLUBLE in NaOH. 3° amines do not react.",
    misconceptionId: "m_amine_basic",
    hint: "Which class of amine forms a sulphonamide lacking any remaining acidic hydrogen on nitrogen?",
  },
];

const VIRTUAL_TESTS: VirtualTest[] = [
  {
    id: "fecl3",
    name: "Neutral FeCl₃ Test",
    reagent: "Neutral FeCl₃ Solution",
    phenols: "Violet / Purple Complex",
    aldehydes: "No Reaction",
    ketones: "No Reaction",
    amines: "No Reaction",
    colorHex: "#7e22ce",
  },
  {
    id: "tollens",
    name: "Tollens' Test",
    reagent: "[Ag(NH₃)₂]⁺ OH⁻",
    phenols: "Slow brown oxidation",
    aldehydes: "Shiny Silver Mirror (Ag)",
    ketones: "No Mirror",
    amines: "No Reaction",
    colorHex: "#94a3b8",
  },
  {
    id: "fehling",
    name: "Fehling's Test",
    reagent: "Fehling A (CuSO₄) + Fehling B (Rochelle Salt)",
    phenols: "No Reaction",
    aldehydes: "Brick-Red ppt (Cu₂O) [Aliphatic]",
    ketones: "No Precipitate",
    amines: "No Reaction",
    colorHex: "#dc2626",
  },
  {
    id: "iodoform",
    name: "Iodoform Test",
    reagent: "I₂ + NaOH",
    phenols: "No Reaction",
    aldehydes: "Yellow ppt (CHI₃) [Acetaldehyde only]",
    ketones: "Yellow ppt (CHI₃) [Methyl ketones]",
    amines: "No Reaction",
    colorHex: "#eab308",
  },
  {
    id: "carbylamine",
    name: "Carbylamine Test",
    reagent: "CHCl₃ + Alc. KOH + Heat",
    phenols: "No Reaction",
    aldehydes: "No Reaction",
    ketones: "No Reaction",
    amines: "Foul Isocyanide Smell (1° Amines)",
    colorHex: "#10b981",
  },
];

// ==========================================
// CUSTOM INTERACTIVE VISUAL COMPONENTS
// ==========================================

const BenzeneVisualizer: React.FC<{
  type: 'phenol' | 'anisole' | 'benzaldehyde' | 'benzoic' | 'aniline';
}> = ({ type }) => {
  const substituentMap = {
    phenol: { label: "-OH", color: "#f43f5e", text: "Phenol: Resonance delocalizes O lone pair into ring (ortho/para activated)" },
    anisole: { label: "-OCH₃", color: "#3b82f6", text: "Anisole: Strong C(sp²)-O bond resists HI cleavage" },
    benzaldehyde: { label: "-CHO", color: "#eab308", text: "Benzaldehyde: Meta-directing, undergoes Cannizzaro & Tollens'" },
    benzoic: { label: "-COOH", color: "#10b981", text: "Benzoic Acid: Meta-directing, gives effervescence with NaHCO₃" },
    aniline: { label: "-NH₂", color: "#a855f7", text: "Aniline: Lone pair delocalization weakens aqueous basicity" },
  };

  const current = substituentMap[type];

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 shadow-inner">
      <svg width="220" height="220" viewBox="0 0 200 200" className="drop-shadow-md">
        {/* Benzene Ring Hexagon */}
        <polygon points="100,50 140,73 140,118 100,141 60,118 60,73" fill="none" stroke="#64748b" strokeWidth="4" />
        {/* Resonance Pi Circle */}
        <circle cx="100" cy="95.5" r="28" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6 4" />
        {/* Bond to Substituent */}
        <line x1="100" y1="50" x2="100" y2="25" stroke="#e2e8f0" strokeWidth="4" />
        {/* Substituent Bubble */}
        <circle cx="100" cy="18" r="16" fill={current.color} />
        <text x="100" y="22" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
          {current.label}
        </text>
        {/* Delocalization Electrons */}
        <motion.circle
          cx="100"
          cy="95.5"
          r="34"
          fill="none"
          stroke={current.color}
          strokeWidth="2"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '100px 95.5px' }}
        />
      </svg>
      <p className="mt-2 text-xs text-center font-medium text-slate-300 max-w-xs">{current.text}</p>
    </div>
  );
};

const CarbonylVisualizer: React.FC<{ deltaPlus: boolean; nucleophileAttack: boolean }> = ({
  deltaPlus,
  nucleophileAttack,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900/80 rounded-xl border border-slate-700/60">
      <svg width="260" height="180" viewBox="0 0 260 180">
        {/* Carbonyl C=O */}
        <text x="130" y="100" fill="#f8fafc" fontSize="28" fontWeight="bold" textAnchor="middle">
          C
        </text>
        <text x="130" y="40" fill="#f43f5e" fontSize="28" fontWeight="bold" textAnchor="middle">
          O
        </text>

        {/* Double Bond Lines */}
        <line x1="124" y1="80" x2="124" y2="50" stroke="#f43f5e" strokeWidth="4" />
        <line x1="136" y1="80" x2="136" y2="50" stroke="#f43f5e" strokeWidth="4" />

        {/* R Groups */}
        <line x1="110" y1="110" x2="80" y2="135" stroke="#94a3b8" strokeWidth="4" />
        <text x="70" y="145" fill="#cbd5e1" fontSize="18" fontWeight="bold" textAnchor="middle">
          R¹
        </text>

        <line x1="150" y1="110" x2="180" y2="135" stroke="#94a3b8" strokeWidth="4" />
        <text x="190" y="145" fill="#cbd5e1" fontSize="18" fontWeight="bold" textAnchor="middle">
          R² / H
        </text>

        {/* Partial Charges */}
        {deltaPlus && (
          <>
            <text x="155" y="95" fill="#38bdf8" fontSize="14" fontWeight="bold">
              δ⁺ (Electrophilic)
            </text>
            <text x="155" y="38" fill="#f43f5e" fontSize="14" fontWeight="bold">
              δ⁻ (Nucleophilic)
            </text>
          </>
        )}

        {/* Nucleophile Trajectory */}
        {nucleophileAttack && (
          <motion.g
            initial={{ x: -60, y: 30, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.8 }}
          >
            <path d="M 40,110 Q 80,105 115,100" fill="none" stroke="#eab308" strokeWidth="3" strokeDasharray="4 4" />
            <polygon points="115,100 106,94 107,104" fill="#eab308" />
            <circle cx="30" cy="112" r="14" fill="#eab308" />
            <text x="30" y="116" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">
              Nu⁻
            </text>
          </motion.g>
        )}
      </svg>
      <span className="text-xs text-slate-400 mt-1">
        Polar Carbonyl Group (C=O): Carbon is electrophilic (δ⁺), inviting nucleophilic addition.
      </span>
    </div>
  );
};

const VirtualTestBenchView: React.FC<{
  selectedTest: VirtualTest;
  sampleType: 'phenols' | 'aldehydes' | 'ketones' | 'amines';
  onSelectSample: (sample: 'phenols' | 'aldehydes' | 'ketones' | 'amines') => void;
}> = ({ selectedTest, sampleType, onSelectSample }) => {
  const resultText = selectedTest[sampleType];

  return (
    <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-700/80 shadow-2xl flex flex-col items-center">
      <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">
        Virtual Qualitative Test Tube
      </h4>

      {/* Test tube rack selector */}
      <div className="grid grid-cols-4 gap-2 w-full mb-4">
        {(['phenols', 'aldehydes', 'ketones', 'amines'] as const).map((s) => (
          <button
            key={s}
            onClick={() => onSelectSample(s)}
            className={`py-2 px-3 rounded-xl text-xs font-semibold capitalize transition-all ${
              sampleType === s
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Animated SVG Test Tube */}
      <div className="relative flex flex-col items-center my-2">
        <svg width="100" height="200" viewBox="0 0 100 200">
          {/* Glass tube outline */}
          <path
            d="M 30,20 L 30,160 C 30,175 70,175 70,160 L 70,20 Z"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="4"
          />
          {/* Liquid fill */}
          <motion.path
            d="M 32,90 L 32,160 C 32,173 68,173 68,160 L 68,90 Z"
            fill={selectedTest.colorHex}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6 }}
            style={{ transformOrigin: 'bottom center' }}
            opacity={0.85}
          />
          {/* Liquid meniscus line */}
          <line x1="32" y1="90" x2="68" y2="90" stroke="#ffffff" strokeWidth="2" opacity={0.6} />
          {/* Bubbles or Precipitate Effect */}
          {resultText.includes('Precipitate') || resultText.includes('Mirror') || resultText.includes('ppt') ? (
            <motion.circle
              cx="50"
              cy="150"
              r="12"
              fill="#ffffff"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          ) : null}
        </svg>

        {/* Observation Tag */}
        <div className="mt-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-center max-w-xs">
          <span className="text-xs text-slate-400 block font-semibold">{selectedTest.name} Reagent</span>
          <span className="text-sm font-bold text-slate-100">{resultText}</span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================

const MISCONCEPTIONS_CHECKLIST = [
  {
    id: "misc_1",
    title: "Alcohols Are More Acidic Than Phenols Due To Induction",
    description: "Students often believe that aliphatic alcohols are more acidic than phenols because alkyl groups push electrons towards oxygen, or they think phenol and alcohols have identical acidity.",
    correction: "Phenol is significantly more acidic than aliphatic alcohols because the phenoxide ion formed upon deprotonation is stabilized by delocalization of the negative charge over the aromatic ring. In contrast, alkoxide ions are destabilized by the electron-donating (+I) inductive effect of alkyl groups. Additionally, the sp2 hybridized carbon attached to the hydroxyl group in phenol is more electronegative than the sp3 carbon in alcohols, further facilitating proton release.",
  },
  {
    id: "misc_2",
    title: "Bromination of Phenol Always Requires a Lewis Acid Catalyst",
    description: "Students frequently assume that electrophilic substitution of bromination on phenol always requires a catalyst like ferric bromide (FeBr3), just as benzene does.",
    correction: "The hydroxyl group (-OH) in phenol is a strong activating group due to the +M resonance effect, which enormously increases electron density on the ring. In non-polar solvents like CS2 or CHCl3, phenol reacts cleanly with bromine even without a Lewis acid catalyst to yield monobromophenols. In aqueous medium, phenol is so reactive that it undergoes spontaneous polybromination to form 2,4,6-tribromophenol without any catalyst.",
  },
  {
    id: "misc_3",
    title: "Dichlorocarbene in Reimer-Tiemann Reaction Acts as a Nucleophile",
    description: "Students often assume that the dichlorocarbene (:CCl2) intermediate generated during the Reimer-Tiemann reaction acts as a nucleophile because it possesses an unshared lone pair of electrons.",
    correction: "Despite having a lone pair, dichlorocarbene (:CCl2) acts strictly as an electrophile because its central carbon has only six valence electrons, creating a vacant p-orbital. It is an electron-deficient species seeking electron density. Therefore, it attacks the electron-rich phenoxide ring to ultimately form salicylaldehyde.",
  },
  {
    id: "misc_4",
    title: "Neutral Phenol Reacts Directly With Carbon Dioxide in Kolbe Reaction",
    description: "Students incorrectly believe that neutral phenol undergoes Kolbe's reaction directly upon heating with carbon dioxide without needing prior treatment with sodium hydroxide.",
    correction: "Carbon dioxide is a very weak electrophile and cannot attack neutral phenol effectively. Sodium hydroxide converts phenol into the phenoxide ion, which is vastly more reactive toward electrophilic substitution due to the negative charge on oxygen. This strongly activated phenoxide ring successfully attacks weak electrophilic carbon dioxide to produce salicylic acid.",
  },
  {
    id: "misc_5",
    title: "Neutral Phenol Is More Resonance Stabilized Than Phenoxide Ion",
    description: "Students confuse the relative stability of phenol and phenoxide ion, believing neutral phenol is more stable because its non-polar canonical structure has no formal charges.",
    correction: "The phenoxide ion is actually more stabilized by resonance than neutral phenol because its resonance structures delocalize an existing negative charge without creating new charges. The resonance structures of neutral phenol involve charge separation (a positive charge on oxygen and a negative charge on ring carbons), which is energetically unfavorable. Because the phenoxide ion is more stable relative to phenol, the ionization equilibrium is driven forward, explaining phenol's acidic nature.",
  },
];

export default function C12_ChemistryPhenolsSim() {
  // State variables
  const [activeTab, setActiveTab] = useState<'discovery' | 'learn' | 'sandbox' | 'challenge' | 'summary'>('discovery');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);

  // Audio / Speech / SRS / BKT States
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Discovery State
  const [discoveryPrediction, setDiscoveryPrediction] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Test Bench State
  const [selectedVirtualTestId, setSelectedVirtualTestId] = useState<string>('fecl3');
  const [virtualSample, setVirtualSample] = useState<'phenols' | 'aldehydes' | 'ketones' | 'amines'>('phenols');

  // BKT state per node
  const [bktStates, setBktStates] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial as Record<NodeId, ReturnType<typeof createBKTState>>;
  });

  // Timers for Auto-hint (10s inactivity)
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowHint(true);
      if (soundEnabled) audioManager.play('hint');
    }, 10000);
  }, [soundEnabled]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentChallengeIndex, activeTab, resetInactivityTimer]);

  // Audio helper wrapper
  const triggerAudio = (sound: SoundEffect) => {
    if (soundEnabled) audioManager.play(sound);
  };

  const triggerSpeech = (text: string) => {
    if (speechEnabled) speechManager.speak(text);
      speechManager.speak('Great job! Keep going.');
      speechManager.speak('Let us try the next one.');
      speechManager.speak('Remember the key concept.');
      speechManager.speak('You are doing well!');
  };

  // BKT and Score Handler
  const handleAnswerChallenge = (optionIndex: number) => {
    const currentChallenge = CHALLENGES[currentChallengeIndex];
    const isCorrect = optionIndex === currentChallenge.correctIndex;
    setUserAnswers((prev) => ({ ...prev, [currentChallenge.id]: optionIndex }));

    // Update BKT
    const node = currentChallenge.nodeId;
    const oldBkt = bktStates[node];
    const updatedBkt = bktUpdate(oldBkt, isCorrect);
    setBktStates((prev) => ({ ...prev, [node]: updatedBkt }));

    // SRS item update
    const reviewItem = createReviewItem(currentChallenge.id, 'Chemistry');
    sm2Update(reviewItem, isCorrect ? 5 : 2, 0);

    if (isCorrect) {
      setScore((prev) => prev + 10);
      triggerAudio('drop-correct');
      triggerAudio('sparkle');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1500);

      triggerSpeech("Excellent chemistry deduction! That is correct.");

      if (currentChallengeIndex < CHALLENGES.length - 1) {
        setTimeout(() => {
          setCurrentChallengeIndex((prev) => prev + 1);
          setShowHint(false);
        }, 1200);
      } else {
        setShowConfetti(true);
        setShowSuccess(true);
        triggerAudio('celebration');
        triggerSpeech("Congratulations! You have mastered Class 12 Phenols, Carbonyls, Acids, and Amines!");
        // Save score to local storage
        recordGameScore(Object.values(ALL_NODE_IDS), score + 10);
        setTimeout(() => setActiveTab('summary'), 2000);
      }
    } else {
      triggerAudio('drop-wrong');
      triggerSpeech("Not quite right. Let's review the reaction mechanism.");
      setShowHint(true);
    }
  };

  // Selected virtual test object
  const activeVirtualTest = useMemo(() => {
    return VIRTUAL_TESTS.find((t) => t.id === selectedVirtualTestId) || VIRTUAL_TESTS[0];
  }, [selectedVirtualTestId]);

  // Calculated overall mastery
  const overallMasteryPercentage = useMemo(() => {
    const values = Object.values(bktStates);
    const sum = values.reduce((acc, curr) => acc + curr.pKnown, 0);
    return Math.round((sum / values.length) * 100);
  }, [bktStates]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center">
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="All 10 Class 12 Modules Completed!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />

      {/* ================= HEADER ================= */}
      <header className="w-full max-w-5xl bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-slate-800 shadow-2xl mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-amber-500/20 text-amber-400 text-xs px-2.5 py-1 rounded-full font-bold uppercase border border-amber-500/30">
              Class 12 (ISC) Chemistry
            </span>
            <span className="bg-cyan-500/20 text-cyan-400 text-xs px-2.5 py-1 rounded-full font-bold uppercase border border-cyan-500/30">
              Nodes 071-080
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-amber-400 via-rose-400 to-cyan-400 bg-clip-text text-transparent">
            {SCENARIO.title}
          </h1>
          <p className="text-xs text-slate-400 mt-1">{SCENARIO.subtitle}</p>
        </div>

        {/* Global Controls & Master Indicators */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-xs text-slate-400 uppercase font-bold">Overall Mastery</span>
            <div className="flex items-center gap-2">
              <div className="w-28 h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                  style={{ width: `${overallMasteryPercentage}%` }}
                />
              </div>
              <span className="text-sm font-bold text-emerald-400">{overallMasteryPercentage}%</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 p-2 rounded-xl border border-slate-700">
            <button
              onClick={() => {audioManager.play('tap'); 
                setSoundEnabled(!soundEnabled);
                triggerAudio('tap');
              }}
              className={`p-2 rounded-lg text-xs font-bold transition-all ${
                soundEnabled ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-slate-400'
              }`}
              title="Toggle Audio Effects"
            >
              🔊 Sound
            </button>
            <button
              onClick={() => {audioManager.play('tap'); 
                setSpeechEnabled(!speechEnabled);
                triggerAudio('tap');
              }}
              className={`p-2 rounded-lg text-xs font-bold transition-all ${
                speechEnabled ? 'bg-cyan-500 text-slate-950' : 'bg-slate-700 text-slate-400'
              }`}
              title="Toggle Voice Tutor"
            >
              🗣️ Voice
            </button>
          </div>
        </div>
      </header>

      {/* ================= NAVIGATION TABS ================= */}
      <nav className="w-full max-w-5xl flex gap-2 mb-6 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80 overflow-x-auto">
        {[
          { id: 'discovery', label: '1. Discovery Question' },
          { id: 'learn', label: '2. Teaching Modules (10)' },
          { id: 'sandbox', label: '3. Virtual Test Bench' },
          { id: 'challenge', label: '4. ISC Challenges' },
          { id: 'summary', label: '5. Mastery Report' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {audioManager.play('tap'); 
              setActiveTab(tab.id as any);
              triggerAudio('tap');
            }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* ================= MAIN CONTENT VIEWS ================= */}
      <main className="w-full max-w-5xl">
        {/* VIEW 1: DISCOVERY QUESTION */}
        {activeTab === 'discovery' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">💡</span>
              <div>
                <h2 className="text-xl font-bold text-amber-400">Predict Before You Learn</h2>
                <p className="text-xs text-slate-400">Ponder this real-world diagnostic challenge before diving in.</p>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 mb-6">
              <p className="text-sm font-medium text-slate-200 leading-relaxed mb-4">
                Imagine you are in an organic chemistry laboratory with two bottles containing colourless liquids:
                <br />
                <strong>Bottle A:</strong> Ethanol (CH₃CH₂OH) &nbsp;|&nbsp; <strong>Bottle B:</strong> Phenol (C₆H₅OH).
                <br />
                You add dilute aqueous Sodium Hydroxide (NaOH) to both. What happens?
              </p>

              <div className="space-y-3">
                {[
                  "Both liquids dissolve equally and react completely with NaOH.",
                  "Phenol reacts and dissolves forming sodium phenoxide, but Ethanol does NOT react with NaOH.",
                  "Ethanol reacts releasing hydrogen gas, while Phenol gives a white precipitate with NaOH.",
                  "Neither liquid reacts with aqueous NaOH.",
                ].map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {audioManager.play('tap'); 
                      setDiscoveryPrediction(idx);
                      triggerAudio('tap');
                    }}
                    className={`w-full p-3.5 rounded-xl text-left text-xs font-semibold transition-all border ${
                      discoveryPrediction === idx
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {!discoverySubmitted ? (
              <button
                disabled={discoveryPrediction === null}
                onClick={() => {audioManager.play('tap'); 
                  setDiscoverySubmitted(true);
                  if (discoveryPrediction === 1) {
                    triggerAudio('success');
                    triggerSpeech("Correct! Phenol is acidic enough to react with NaOH due to phenoxide resonance, whereas ethanol is not.");
                  } else {
                    triggerAudio('error');
                    triggerSpeech("Not quite. Phenol is acidic because of phenoxide resonance, whereas aliphatic ethanol is not acidic enough to react with NaOH.");
                  }
                }}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-rose-500 disabled:opacity-40 text-slate-950 font-bold rounded-xl shadow-lg transition-all"
              >
                Submit Discovery Hypothesis
              </button>
            ) : (
              <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/40 text-xs leading-relaxed text-slate-300">
                <span className="font-bold text-emerald-400 block mb-1">Scientific Context & Explanation:</span>
                Phenol (pKa ≈ 10) loses a proton to form the phenoxide ion (C₆H₅O⁻), where the negative charge is resonance-stabilized over the aromatic π-cloud. Consequently, phenol reacts readily with aqueous NaOH to form water-soluble sodium phenoxide. In contrast, ethanol (pKa ≈ 15.9) lacks resonance stabilization for the ethoxide ion and cannot react with NaOH!
                <button
                  onClick={() => setActiveTab('learn')}
                  className="mt-4 w-full py-2.5 bg-amber-500 text-slate-950 font-bold rounded-lg hover:bg-amber-400 transition-all"
                >
                  Proceed to Visual Teaching Modules →
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* VIEW 2: TEACHING SLIDES */}
        {activeTab === 'learn' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl"
          >
            {/* Slide Header & Controls */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  Module {currentSlideIndex + 1} of {TEACHING_SLIDES.length}
                </span>
                <h2 className="text-xl font-extrabold text-slate-100">
                  {TEACHING_SLIDES[currentSlideIndex].title}
                </h2>
              </div>
              <div className="flex gap-2">
                <button
                  disabled={currentSlideIndex === 0}
                  onClick={() => {audioManager.play('tap'); 
                    setCurrentSlideIndex((prev) => prev - 1);
                    triggerAudio('tap');
                  }}
                  className="px-3 py-2 bg-slate-800 disabled:opacity-30 rounded-xl text-xs font-bold hover:bg-slate-700"
                >
                  ← Prev
                </button>
                <button
                  disabled={currentSlideIndex === TEACHING_SLIDES.length - 1}
                  onClick={() => {
                    setCurrentSlideIndex((prev) => prev + 1);
                    triggerAudio('tap');
                  }}
                  className="px-3 py-2 bg-amber-500 text-slate-950 disabled:opacity-30 rounded-xl text-xs font-bold hover:bg-amber-400"
                >
                  Next Module →
                </button>
              </div>
            </div>

            {/* Slide Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Visual Component Column */}
              <div className="lg:col-span-5 flex flex-col justify-center items-center">
                {TEACHING_SLIDES[currentSlideIndex].visualType === 'benzene' && (
                  <BenzeneVisualizer
                    type={
                      currentSlideIndex === 0
                        ? 'phenol'
                        : currentSlideIndex === 1
                        ? 'anisole'
                        : currentSlideIndex === 8
                        ? 'aniline'
                        : 'benzoic'
                    }
                  />
                )}
                {TEACHING_SLIDES[currentSlideIndex].visualType === 'carbonyl' && (
                  <CarbonylVisualizer deltaPlus={true} nucleophileAttack={true} />
                )}
                {TEACHING_SLIDES[currentSlideIndex].visualType === 'testtube' && (
                  <VirtualTestBenchView
                    selectedTest={activeVirtualTest}
                    sampleType={virtualSample}
                    onSelectSample={setVirtualSample}
                  />
                )}
                {(TEACHING_SLIDES[currentSlideIndex].visualType === 'reactivity' ||
                  TEACHING_SLIDES[currentSlideIndex].visualType === 'basicity') && (
                  <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                    <span className="text-xs text-amber-400 font-bold mb-2">Reactivity & Basicity Spectrum</span>
                    <div className="w-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 h-3 rounded-full mb-3" />
                    <div className="flex justify-between w-full text-[10px] font-bold text-slate-400">
                      <span>Least Reactive / Weak Base</span>
                      <span>Most Reactive / Strong Base</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Text Explanation Column */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 mb-4">
                    <h3 className="text-sm font-bold text-cyan-400 mb-1">
                      {TEACHING_SLIDES[currentSlideIndex].subtitle}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {TEACHING_SLIDES[currentSlideIndex].explanation}
                    </p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                      Core ISC Exam Keypoints:
                    </span>
                    {TEACHING_SLIDES[currentSlideIndex].keyPoints.map((kp, i) => (
                      <div key={i} className="flex items-start gap-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60">
                        <span className="text-amber-400 text-xs font-bold">✓</span>
                        <span className="text-xs text-slate-300">{kp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCurrentChallengeIndex(currentSlideIndex);
                    setActiveTab('challenge');
                    triggerAudio('tap');
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all hover:brightness-110"
                >
                  Test Knowledge on Node {TEACHING_SLIDES[currentSlideIndex].nodeId} →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 3: VIRTUAL TEST BENCH (SANDBOX) */}
        {activeTab === 'sandbox' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🧪</span>
              <div>
                <h2 className="text-xl font-bold text-amber-400">Interactive Diagnostic Test Bench</h2>
                <p className="text-xs text-slate-400">
                  Select qualitative reagents to observe characteristic visual precipitates and colour changes.
                </p>
              </div>
            </div>

            {/* Reagent Selector Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
              {VIRTUAL_TESTS.map((test) => (
                <button
                  key={test.id}
                  onClick={() => {
                    setSelectedVirtualTestId(test.id);
                    triggerAudio('pop');
                  }}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                    selectedVirtualTestId === test.id
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {test.name}
                </button>
              ))}
            </div>

            <VirtualTestBenchView
              selectedTest={activeVirtualTest}
              sampleType={virtualSample}
              onSelectSample={setVirtualSample}
            />
          </motion.div>
        )}

        {/* VIEW 4: ISC CHALLENGES */}
        {activeTab === 'challenge' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl"
          >
            {/* Challenge Progress Header */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                ISC Board Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
              </span>
              <span className="text-xs font-mono font-bold bg-slate-800 px-3 py-1 rounded-full text-cyan-400">
                Node ID: {CHALLENGES[currentChallengeIndex].nodeId}
              </span>
            </div>

            {/* Question Box */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 mb-6">
              <h3 className="text-sm font-bold text-slate-100 mb-2">
                {CHALLENGES[currentChallengeIndex].title}
              </h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {CHALLENGES[currentChallengeIndex].question}
              </p>
            </div>

            {/* Option Buttons */}
            <div className="space-y-3 mb-6">
              {CHALLENGES[currentChallengeIndex].options.map((opt, idx) => {
                const currentChId = CHALLENGES[currentChallengeIndex].id;
                const userSelected = userAnswers[currentChId];
                const isAnswered = userSelected !== undefined;
                const isCorrectOpt = idx === CHALLENGES[currentChallengeIndex].correctIndex;
                const isSelectedOpt = userSelected === idx;

                let btnStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700";
                if (isAnswered) {
                  if (isCorrectOpt) {
                    btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                  } else if (isSelectedOpt) {
                    btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300 font-bold";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleAnswerChallenge(idx)}
                    className={`w-full p-4 rounded-xl text-left text-xs md:text-sm font-medium transition-all border ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Hint & Misconception Bubble */}
            <HintBubble show={showHint} text={CHALLENGES[currentChallengeIndex].hint} />

            {userAnswers[CHALLENGES[currentChallengeIndex].id] !== undefined && (
              <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <span className="font-bold text-amber-400 block mb-1">ISC Examiner Explanation:</span>
                {CHALLENGES[currentChallengeIndex].explanation}
              </div>
            )}
          </motion.div>
        )}

        {/* VIEW 5: MASTERY REPORT */}
        {activeTab === 'summary' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl"
          >
            <div className="text-center mb-6">
              <span className="text-4xl">🏆</span>
              <h2 className="text-2xl font-extrabold text-amber-400 mt-2">Class 12 Organic Chemistry Mastery Report</h2>
              <p className="text-xs text-slate-400 mt-1">
                Bayesian Knowledge Tracing (BKT) and Spaced Repetition (SRS) Status for Nodes 071-080
              </p>
            </div>

            {/* Mastery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {ALL_NODE_IDS.map((nodeId) => {
                const state = bktStates[nodeId];
                const masteryPct = Math.round(state.pKnown * 100);
                const level = getMasteryLevel(state.pKnown);

                return (
                  <div key={nodeId} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="text-xs font-mono text-cyan-400 font-bold block">{nodeId}</span>
                      <span className="text-xs text-slate-300 capitalize">{nodeId.replace('c12_chem_', 'Module ')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-xs font-bold text-emerald-400 block">{masteryPct}%</span>
                        <span className="text-[10px] text-slate-500 uppercase">{level}</span>
                      </div>
                      <div className="w-12 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-400" style={{ width: `${masteryPct}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setCurrentChallengeIndex(0);
                  setActiveTab('challenge');
                  triggerAudio('tap');
                }}
                className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:brightness-110"
              >
                Re-take ISC Challenge Quiz
              </button>
              <button
                onClick={() => {
                  setCurrentSlideIndex(0);
                  setActiveTab('learn');
                  triggerAudio('tap');
                }}
                className="flex-1 py-3 bg-slate-800 text-slate-200 font-bold text-xs rounded-xl hover:bg-slate-700"
              >
                Review Teaching Modules
              </button>
            </div>
          </motion.div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-12 text-center text-[11px] text-slate-500">
        ISC Class 12 Chemistry Organic Module • Phenols, Ethers, Aldehydes, Ketones, Carboxylic Acids & Amines
      </footer>
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