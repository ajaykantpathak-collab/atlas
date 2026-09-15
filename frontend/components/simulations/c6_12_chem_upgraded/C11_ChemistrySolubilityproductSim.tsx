'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// CONSTANTS & NODE DEFINITIONS
// ==========================================

const ALL_NODE_IDS = [
  'c11_chem_061',
  'c11_chem_062',
  'c11_chem_063',
  'c11_chem_064',
  'c11_chem_065',
  'c11_chem_066',
  'c11_chem_067',
  'c11_chem_068',
  'c11_chem_069',
  'c11_chem_070',
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

interface NodeInfo {
  id: NodeId;
  title: string;
  code: string;
  description: string;
  formula: string;
  eli5: string;
}

const NODES_DATA: Record<NodeId, NodeInfo> = {
  c11_chem_061: {
    id: 'c11_chem_061',
    title: 'Dynamic Solubility Equilibrium',
    code: 'c11_chem_061',
    description: 'Dynamic equilibrium between undissolved solid salt and dissolved hydrated ions in saturated solution.',
    formula: 'M_a X_b (s) \\rightleftharpoons a M^{y+}(aq) + b X^{z-}(aq)',
    eli5: 'In a full glass of water, salt dissolves until dissolving speed equals crystallizing speed. It looks calm, but ions are constantly jumping in and out!',
  },
  c11_chem_062: {
    id: 'c11_chem_062',
    title: 'Solubility Product Constant (Ksp)',
    code: 'c11_chem_062',
    description: 'Equilibrium constant expression for sparingly soluble salts based on stoichiometry.',
    formula: 'K_{sp} = [M^{y+}]^a [X^{z-}]^b',
    eli5: 'Ksp is the chemical capacity card of a salt. It tells us how many dissolved ions can hang out together before solid precipitate forms.',
  },
  c11_chem_063: {
    id: 'c11_chem_063',
    title: 'Molar Solubility (s) Calculations',
    code: 'c11_chem_063',
    description: 'Relationship between molar solubility (s) in mol/L and Ksp across 1:1, 1:2, 1:3, and 2:3 salts.',
    formula: '1:1 \\rightarrow K_{sp}=s^2; \\quad 1:2 \\rightarrow K_{sp}=4s^3; \\quad 1:3 \\rightarrow K_{sp}=27s^4; \\quad 2:3 \\rightarrow K_{sp}=108s^5',
    eli5: 'If you know the stoichiometry of the salt, you can unlock exactly how many moles dissolve per liter from its Ksp value.',
  },
  c11_chem_064: {
    id: 'c11_chem_064',
    title: 'Ionic Product (Qsp) & Precipitation Criterion',
    code: 'c11_chem_064',
    description: 'Comparing reaction quotient Qsp with Ksp to predict solution saturation and precipitation.',
    formula: 'Q_{sp} < K_{sp} \\text{ (Unsaturated)}, Q_{sp} = K_{sp} \\text{ (Saturated)}, Q_{sp} > K_{sp} \\text{ (Precipitation)}',
    eli5: 'Qsp is the current snapshot of ion concentration. If Qsp climbs higher than Ksp, the solution spills over into solid crystals!',
  },
  c11_chem_065: {
    id: 'c11_chem_065',
    title: 'Common Ion Effect on Solubility',
    code: 'c11_chem_065',
    description: 'Reduction of molar solubility of a salt upon adding a strong electrolyte sharing a common ion.',
    formula: 's\' \\approx \\frac{K_{sp}}{[\\text{Common Ion}]^b}',
    eli5: 'If room is already packed with chloride ions, adding more silver chloride becomes nearly impossible! The extra common ions push solid out of solution.',
  },
  c11_chem_066: {
    id: 'c11_chem_066',
    title: 'Selective & Fractional Precipitation',
    code: 'c11_chem_066',
    description: 'Separation of mixture of cations by controlled addition of precipitating agent based on threshold Qsp.',
    formula: '[\\text{Reagent}]_{min} = \\left(\\frac{K_{sp}}{[\\text{Cation}]}\\right)^{1/b}',
    eli5: 'Like sorting coins with different hole sizes, we add just enough reagent to drop one metal ion as precipitate while leaving the other soluble!',
  },
  c11_chem_067: {
    id: 'c11_chem_067',
    title: 'pH Dependence of Solubility',
    code: 'c11_chem_067',
    description: 'Solubility enhancement of salts containing basic anions (OH-, S2-, CO32-, C2O42-) upon acidification.',
    formula: 'HA \\rightleftharpoons H^+ + A^-; \\quad K_{sp, eff} = K_{sp} \\left(1 + \\frac{[H^+]}{K_a}\\right)',
    eli5: 'Adding acid neutralizes basic anions like hydroxide or carbonate, pulling them out of equilibrium and forcing more solid salt to dissolve!',
  },
  c11_chem_068: {
    id: 'c11_chem_068',
    title: 'Complex Ion Formation & Dissolution',
    code: 'c11_chem_068',
    description: 'Drastic increase in solubility of sparingly soluble salts via formation of stable complex ions.',
    formula: 'K_{overall} = K_{sp} \\times K_f; \\quad AgCl(s) + 2NH_3(aq) \\rightleftharpoons [Ag(NH_3)_2]^+(aq) + Cl^-(aq)',
    eli5: 'Ammonia acts like a magnet for silver ions, pulling them into a stable complex ring and completely dissolving stubborn white precipitates!',
  },
  c11_chem_069: {
    id: 'c11_chem_069',
    title: 'Thermodynamics of Solubility Product',
    code: 'c11_chem_069',
    description: 'Temperature dependence of Ksp derived from van \'t Hoff equation and standard Gibbs free energy.',
    formula: '\\Delta G^\\circ = -R T \\ln K_{sp}; \\quad \\ln\\left(\\frac{K_{sp2}}{K_{sp1}}\\right) = \\frac{\\Delta H^\\circ}{R} \\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)',
    eli5: 'Warming up salt water gives ions energy to escape the solid lattice, driving endothermic dissolutions to higher Ksp values at hot temperatures!',
  },
  c11_chem_070: {
    id: 'c11_chem_070',
    title: 'Qualitative Analysis & Industrial Applications',
    code: 'c11_chem_070',
    description: 'Application of Ksp in inorganic qualitative analysis (Groups I-V separation), barium meal imaging, and kidney stone pathology.',
    formula: '\\text{Group II: Acidic } H_2S \\rightarrow \\text{Low } [S^{2-}]; \\quad \\text{Group IV: Basic } H_2S \\rightarrow \\text{High } [S^{2-}]',
    eli5: 'Chemists use controlled pH with sulfide ions to isolate dangerous metals step-by-step in crime labs and environmental testing!',
  },
};

// ==========================================
// MANDATORY SECTIONS
// ==========================================

const SCENARIO = {
  title: 'ISC Advanced Ionic Equilibrium & Quantitative Precipitation Laboratory',
  intro: 'Welcome to the High-Precision Analytical Chemistry Lab! You are investigating dynamic solubility equilibria, salt stoichiometry, common ion suppression, and selective separation of toxic heavy metals.',
  context: 'Manipulate temperature, ion concentrations, pH, and complexing ligands to master Ksp dynamics, prevent pathological kidney stone precipitation, and execute qualitative cation analysis.',
};

const DISCOVERY_QUESTION = {
  question: 'You have two sparingly soluble salts: Salt A with Ksp = 1.0 × 10⁻¹⁰ (stoichiometry 1:1, like AgCl) and Salt B with Ksp = 4.0 × 10⁻¹² (stoichiometry 1:2, like Ag₂CrO₄). Which salt has the higher molar solubility in pure water at 25°C?',
  options: [
    'Salt A (Ksp = 1.0 × 10⁻¹⁰) because its Ksp value is 25 times larger than Salt B.',
    'Salt B (Ksp = 4.0 × 10⁻¹²) because its 1:2 stoichiometry yields s = 1.0 × 10⁻⁴ M, higher than Salt A\'s s = 1.0 × 10⁻⁵ M!',
    'Both have identical molar solubility because both are sparingly soluble silver salts.',
    'Neither salt dissolves at all because both Ksp values are less than 10⁻⁸.',
  ],
  correctIndex: 1,
  hintAfter: 'Counterintuitive result! Direct comparison of Ksp values is only valid when salts have identical ion ratios. Salt B yields three ions per formula unit, giving s = (Ksp/4)^(1/3) = 1.0 × 10⁻⁴ M, which is 10 times more soluble than Salt A (s = 1.0 × 10⁻⁵ M)!',
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Dynamic Equilibrium & Ksp Expression',
    instruction: 'Select different salt stoichiometries (1:1, 1:2, 1:3, 2:3) and observe how dissolved ion concentrations relate to molar solubility s and equilibrium constant Ksp.',
    interactionType: 'stoichiometry-explorer',
    nodeId: 'c11_chem_062',
  },
  {
    title: 'Lab 2: Ionic Product (Qsp) & Precipitation Threshold',
    instruction: 'Add cation and anion drops into the beaker. Observe the precise point where Qsp exceeds Ksp and solid crystal precipitate begins to form at the bottom.',
    interactionType: 'qsp-titration',
    nodeId: 'c11_chem_064',
  },
  {
    title: 'Lab 3: Common Ion Suppression Lab',
    instruction: 'Add NaCl into a saturated AgCl solution. Observe how excess Cl⁻ ions force Ag⁺ ions out of solution, suppressing molar solubility s while keeping Ksp constant.',
    interactionType: 'common-ion-shift',
    nodeId: 'c11_chem_065',
  },
  {
    title: 'Lab 4: Selective Separation of Mixed Cations',
    instruction: 'Titrate a mixture of Ag⁺ (10⁻² M) and Pb²⁺ (10⁻² M) with Cl⁻. Determine which metal ion precipitates first based on required threshold reagent concentration.',
    interactionType: 'fractional-precip',
    nodeId: 'c11_chem_066',
  },
  {
    title: 'Lab 5: pH Modulation & Complexation Dissolution',
    instruction: 'Dissolve stubborn insoluble AgCl precipitate by adding aqueous ammonia (NH₃) to form the soluble complex [Ag(NH₃)₂]⁺, or adjust pH to dissolve Mg(OH)₂.',
    interactionType: 'ligand-ph-dissolution',
    nodeId: 'c11_chem_068',
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you add solid AgNO₃ to a saturated solution of AgCl at dynamic equilibrium (Ksp = 1.8 × 10⁻¹⁰), what will happen to the concentration of free Cl⁻ ions in solution?',
    options: [
      'Cl⁻ concentration increases to keep up with the added Ag⁺ ions.',
      'Cl⁻ concentration decreases because excess Ag⁺ forces AgCl to precipitate out.',
      'Cl⁻ concentration remains unaffected because AgNO₃ contains no chloride.',
      'Ksp value increases to accommodate the extra silver ions.',
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 3, add AgNO3 to saturated AgCl and observe the drop in [Cl-] on the ion meter.',
    nodeId: 'c11_chem_065',
  },
  {
    question: 'Predict: Calcium oxalate (CaC₂O₄, Ksp = 2.3 × 10⁻⁹) is the primary component of kidney stones. How will drinking acidic citrus juices (rich in H⁺ ions) affect the solubility of calcium oxalate in renal tubules?',
    options: [
      'Solubility decreases because H⁺ acts as a common ion.',
      'Solubility increases because H⁺ reacts with C₂O₄²⁻ to form HC₂O₄⁻/H₂C₂O₄, shifting equilibrium forward.',
      'Solubility stays identical because calcium oxalate does not contain hydroxide ions.',
      'Precipitation accelerates drastically due to acid catalysis.',
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 5, set the pH slider below 4.0 and observe the dissolution of oxalate precipitate.',
    nodeId: 'c11_chem_067',
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the Ksp value when you double the initial amount of undissolved solid AgCl at the bottom of the beaker?',
    observableOptions: [
      'Ksp doubles because there is twice as much solid salt available.',
      'Ksp remains strictly unchanged because pure solid activity is constant (=1).',
      'Ksp drops by half because solid blocks ion movement.',
      'Ksp fluctuates rapidly depending on beaker stirring speed.',
    ],
    correctIndex: 1,
    nodeId: 'c11_chem_061',
  },
  {
    question: 'When aqueous NH₃ is added to insoluble white AgCl precipitate, what dramatic change occurs in the beaker visualizer?',
    observableOptions: [
      'The precipitate turns dark black due to metallic silver formation.',
      'The white solid precipitate completely dissolves as clear diamminesilver(I) complex ions form.',
      'Chlorine gas bubbles violently out of the liquid mixture.',
      'The solution instantly freezes solid due to endothermic reaction.',
    ],
    correctIndex: 1,
    nodeId: 'c11_chem_068',
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Qualitative Analysis & Medical Kidney Stone Prevention Protocol',
  description: 'Apply ISC Ionic Equilibrium principles to separate Group II (Cu²⁺, Pb²⁺, As³⁺) and Group IV (Zn²⁺, Ni²⁺, Mn²⁺) cations in qualitative analysis, and formulate clinical recommendations for calcium oxalate nephrolithiasis.',
  steps: [
    'Step 1: Calculate the sulfide ion concentration [S²⁻] in 0.1 M HCl saturated with H₂S gas ([H₂S] = 0.1 M, K₁K₂ = 1.0 × 10⁻²⁰). Result: [S²⁻] = 1.0 × 10⁻¹⁹ M.',
    'Step 2: Verify that for Group II cations (e.g., CuS, Ksp = 6 × 10⁻³⁶), Qsp = (0.01)(10⁻¹⁹) = 10⁻²¹ > Ksp, forcing quantitative precipitation in acidic medium.',
    'Step 3: Confirm that Group IV cations (e.g., ZnS, Ksp = 1.6 × 10⁻²⁴) remain fully in solution during Group II separation because Qsp = 10⁻²¹ < Ksp.',
    'Step 4: Clinical application: Maintain urine pH near 6.5–7.0 and high fluid intake to keep calcium oxalate Qsp below its Ksp threshold of 2.3 × 10⁻⁹, preventing kidney stone nucleation.',
  ],
};

// ==========================================
// MISCONCEPTIONS & DIAGNOSTIC QUESTIONS
// ==========================================

interface Misconception {
  id: string;
  misconception: string;
  correction: string;
}

const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_1',
    misconception: 'Solubility product (Ksp) applies to unsaturated solutions of sparingly soluble salts.',
    correction: 'Ksp is strictly defined ONLY for saturated solutions at dynamic equilibrium with undissolved solid. For unsaturated solutions, ion concentration product is termed Qsp (Ionic Product).',
  },
  {
    id: 'misc_2',
    misconception: 'A salt with a higher Ksp value always has a higher molar solubility.',
    correction: 'Direct comparison of Ksp values to determine relative solubility is ONLY valid for salts with identical stoichiometry (e.g., 1:1 vs 1:1). For different stoichiometries (1:1 vs 1:2), s must be computed directly.',
  },
  {
    id: 'misc_3',
    misconception: 'Adding a common ion changes the equilibrium constant Ksp value.',
    correction: 'Ksp is a thermodynamic equilibrium constant that depends ONLY on temperature. Common ion addition decreases molar solubility (s), but the Ksp constant remains invariant.',
  },
  {
    id: 'misc_4',
    misconception: 'The salt with the lower Ksp value always precipitates out first in mixed ion separation.',
    correction: 'Precipitation order depends on the required minimum reagent concentration [Reagent]min = (Ksp/[Cation])^(1/b), which depends on both Ksp and initial cation concentration.',
  },
  {
    id: 'misc_5',
    misconception: 'Adding more undissolved solid solute to a saturated solution increases ion concentrations.',
    correction: 'The activity of pure solid phase is unity (=1). Adding excess solid does not alter equilibrium ion concentrations or Ksp at constant temperature.',
  },
  {
    id: 'misc_6',
    misconception: 'Precipitation occurs immediately as soon as any amount of solute is added to water.',
    correction: 'Precipitation occurs ONLY when the ionic product Qsp exceeds the solubility product threshold Ksp (Qsp > Ksp). Below this, the solution is unsaturated.',
  },
];

interface DiagnosticQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag_1',
    question: 'What is the correct Ksp expression for Calcium Phosphate, Ca₃(PO₄)₂?',
    options: [
      'Ksp = [Ca²⁺] [PO₄³⁻]',
      'Ksp = [Ca²⁺]³ [PO₄³⁻]²',
      'Ksp = 3[Ca²⁺] × 2[PO₄³⁻]',
      'Ksp = 108 s⁵',
    ],
    correctIndex: 1,
    explanation: 'Ca₃(PO₄)₂ dissociates into 3 Ca²⁺ and 2 PO₄³⁻. The Ksp expression is [Ca²⁺]³ [PO₄³⁻]².',
  },
  {
    id: 'diag_2',
    question: 'If the molar solubility of AgCl is s = 1.33 × 10⁻⁵ M, what is its solubility product Ksp?',
    options: [
      '1.77 × 10⁻¹⁰',
      '2.66 × 10⁻⁵',
      '1.33 × 10⁻⁵',
      '4.70 × 10⁻¹⁵',
    ],
    correctIndex: 0,
    explanation: 'For a 1:1 salt AgCl, Ksp = s² = (1.33 × 10⁻⁵)² = 1.77 × 10⁻¹⁰.',
  },
  {
    id: 'diag_3',
    question: 'Which condition triggers the formation of a solid precipitate from solution?',
    options: [
      'Qsp < Ksp',
      'Qsp = Ksp',
      'Qsp > Ksp',
      'Qsp = 0',
    ],
    correctIndex: 2,
    explanation: 'Precipitation occurs when the ion concentration product Qsp exceeds the equilibrium solubility product Ksp.',
  },
  {
    id: 'diag_4',
    question: 'How does adding 0.1 M NaCl affect the molar solubility of AgCl in water?',
    options: [
      'Increases molar solubility due to ionic strength enhancement.',
      'Decreases molar solubility due to the Common Ion Effect.',
      'Has no effect because NaCl is neutral.',
      'Increases Ksp value of AgCl.',
    ],
    correctIndex: 1,
    explanation: 'Addition of common Cl⁻ ions shifts equilibrium backward (Le Chatelier\'s principle), drastically decreasing AgCl molar solubility.',
  },
  {
    id: 'diag_5',
    question: 'Why does AgCl dissolve upon adding concentrated aqueous ammonia (NH₃)?',
    options: [
      'NH₃ neutralizes Cl⁻ ions.',
      'Ag⁺ forms a stable soluble complex ion [Ag(NH₃)₂]⁺, removing free Ag⁺ from equilibrium.',
      'NH₃ heats up the solution to boil off water.',
      'NH₃ changes the Ksp value of AgCl to 1.0.',
    ],
    correctIndex: 1,
    explanation: 'Ammonia binds free Ag⁺ to form [Ag(NH₃)₂]⁺ (Kf = 1.7 × 10⁷), pulling AgCl equilibrium forward until solid dissolves.',
  },
  {
    id: 'diag_6',
    question: 'In Group II qualitative analysis, why is H₂S gas passed in the presence of dilute HCl?',
    options: [
      'HCl increases [S²⁻] concentration.',
      'HCl suppresses H₂S dissociation via common H⁺ ions, keeping [S²⁻] low so only Group II cations with very low Ksp precipitate.',
      'HCl acts as a oxidizing catalyst.',
      'HCl prevents precipitation of all metal sulfides.',
    ],
    correctIndex: 1,
    explanation: 'H⁺ from HCl suppresses H₂S dissociation, maintaining low [S²⁻] sufficient only to exceed Ksp of Group II sulfides (e.g. CuS, PbS), preventing Group IV sulfides (ZnS) from precipitating.',
  },
  {
    id: 'diag_7',
    question: 'For a 1:2 salt like Lead(II) Chloride (PbCl₂), what is the formula connecting Ksp and molar solubility s?',
    options: [
      'Ksp = s²',
      'Ksp = 2s²',
      'Ksp = 4s³',
      'Ksp = 27s⁴',
    ],
    correctIndex: 2,
    explanation: 'PbCl₂ ⇌ Pb²⁺ + 2Cl⁻. [Pb²⁺] = s, [Cl⁻] = 2s. Ksp = (s)(2s)² = 4s³.',
  },
  {
    id: 'diag_8',
    question: 'If the dissolution of a salt is endothermic (ΔH° > 0), how does increasing temperature affect its Ksp?',
    options: [
      'Ksp increases with increasing temperature.',
      'Ksp decreases with increasing temperature.',
      'Ksp remains constant regardless of temperature.',
      'Ksp drops to zero at high temperatures.',
    ],
    correctIndex: 0,
    explanation: 'According to the van \'t Hoff equation, for an endothermic dissolution (ΔH° > 0), an increase in T increases the equilibrium constant Ksp.',
  },
];

// ==========================================
// 24 COMPREHENSIVE ISC CLASS 11 CHALLENGES
// ==========================================

export interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'recall' | 'understanding' | 'numeric' | 'distinguish' | 'construct' | 'drag-sort';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'Foundation' | 'Standard' | 'Advanced';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number | string;
  tolerance?: number;
  unit?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7 Challenges) ---
  {
    id: 'c_f1',
    nodeId: 'c11_chem_061',
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Foundation',
    question: 'Under what physical condition is the Solubility Product Constant (Ksp) strictly defined for a sparingly soluble salt?',
    options: [
      'In any dilute solution regardless of solid presence',
      'ONLY in a saturated solution at dynamic equilibrium with undissolved solid solute at a fixed temperature',
      'When the salt is completely dissolved and no solid remains',
      'In a boiling supersaturated solution',
    ],
    correctIndex: 1,
    explanation: 'Ksp is defined strictly for saturated solutions at dynamic equilibrium between undissolved solid phase and hydrated ions: M_a X_b (s) ⇌ a M^{y+} (aq) + b X^{z-} (aq).',
    hints: [
      'Think about whether dynamic equilibrium requires solid solute to be present.',
      'Dynamic equilibrium means dissolution rate equals crystallization rate.',
      'This requires a saturated solution with undissolved solid at constant temperature.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'c_f2',
    nodeId: 'c11_chem_062',
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Foundation',
    question: 'What is the correct mathematical expression for Ksp of Silver Chromate, Ag₂CrO₄?',
    options: [
      'Ksp = [Ag⁺] [CrO₄²⁻]',
      'Ksp = [Ag⁺]² [CrO₄²⁻]',
      'Ksp = 2[Ag⁺] [CrO₄²⁻]',
      'Ksp = [Ag⁺] [CrO₄²⁻]²',
    ],
    correctIndex: 1,
    explanation: 'Ag₂CrO₄ (s) ⇌ 2 Ag⁺ (aq) + CrO₄²⁻ (aq). Stoichiometric coefficients become exponents in the equilibrium expression: Ksp = [Ag⁺]² [CrO₄²⁻].',
    hints: [
      'Write out the dissociation equation: Ag₂CrO₄ → 2 Ag⁺ + CrO₄²⁻.',
      'Remember that stoichiometric coefficients become exponents in equilibrium expressions.',
      'The coefficient for Ag⁺ is 2, so [Ag⁺] is squared.',
    ],
  },
  {
    id: 'c_f3',
    nodeId: 'c11_chem_063',
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Foundation',
    question: 'For a 1:1 salt like Silver Chloride (AgCl), what is the formula relating molar solubility s (mol/L) to Ksp?',
    options: [
      'Ksp = s²',
      'Ksp = 4s³',
      'Ksp = 27s⁴',
      'Ksp = 108s⁵',
    ],
    correctIndex: 0,
    explanation: 'AgCl (s) ⇌ Ag⁺ (aq) + Cl⁻ (aq). [Ag⁺] = s, [Cl⁻] = s. Ksp = (s)(s) = s².',
    hints: [
      'Each formula unit of AgCl gives 1 Ag⁺ ion and 1 Cl⁻ ion.',
      'If molar solubility is s, then [Ag⁺] = s and [Cl⁻] = s.',
      'Multiply these concentrations together: s × s = s².',
    ],
  },
  {
    id: 'c_f4',
    nodeId: 'c11_chem_064',
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Foundation',
    question: 'What happens to a solution when the Ionic Product Qsp exceeds the Solubility Product constant Ksp (Qsp > Ksp)?',
    options: [
      'The solution remains unsaturated and can dissolve more salt',
      'Solid precipitate forms until Qsp drops back down to equal Ksp',
      'The Ksp value automatically increases to match Qsp',
      'The solution boils spontaneously',
    ],
    correctIndex: 1,
    explanation: 'When Qsp > Ksp, the solution is supersaturated and thermodynamically unstable. Solid salt precipitates out until equilibrium is re-established (Qsp = Ksp).',
    hints: [
      'Qsp represents current ion concentration product.',
      'Ksp represents maximum ion capacity at equilibrium.',
      'If current amount > maximum capacity, excess solute drops out as solid precipitate.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'c_f5',
    nodeId: 'c11_chem_065',
    type: 'understanding',
    difficulty: 'foundation',
    competencyLevel: 'Foundation',
    question: 'When solid NaCl is dissolved in a saturated solution of AgCl, how does the molar solubility of AgCl change?',
    options: [
      'It increases because ionic strength increases',
      'It decreases due to the Common Ion Effect of Cl⁻ ions',
      'It remains exactly the same because NaCl is highly soluble',
      'AgCl completely dissolves into liquid silver',
    ],
    correctIndex: 1,
    explanation: 'NaCl supplies common Cl⁻ ions. By Le Chatelier\'s principle, adding Cl⁻ shifts the equilibrium AgCl(s) ⇌ Ag⁺ + Cl⁻ to the left, decreasing AgCl molar solubility.',
    hints: [
      'Identify the common ion shared between NaCl and AgCl (Cl⁻).',
      'Apply Le Chatelier\'s principle to the equilibrium: AgCl(s) ⇌ Ag⁺ + Cl⁻.',
      'Adding product ions (Cl⁻) forces the reverse reaction, reducing solubility.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'c_f6',
    nodeId: 'c11_chem_069',
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Foundation',
    question: 'How does Ksp generally change with an increase in temperature for an endothermic dissolution process (ΔH°sol > 0)?',
    options: [
      'Ksp increases with increasing temperature',
      'Ksp decreases with increasing temperature',
      'Ksp stays strictly constant regardless of temperature',
      'Ksp becomes zero at higher temperatures',
    ],
    correctIndex: 0,
    explanation: 'For endothermic dissolution (heat + solid ⇌ ions), raising temperature adds heat, shifting equilibrium forward to form more ions, thereby increasing Ksp.',
    hints: [
      'Endothermic means heat is absorbed (heat acts like a reactant).',
      'Increasing temperature adds thermal energy to reactants.',
      'Le Chatelier\'s principle predicts equilibrium shifts toward products, raising Ksp.',
    ],
  },
  {
    id: 'c_f7',
    nodeId: 'c11_chem_070',
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Foundation',
    question: 'In qualitative inorganic analysis, why is Barium Sulfate (BaSO₄) safely ingested as a "barium meal" for X-ray stomach imaging despite Ba²⁺ ions being toxic?',
    options: [
      'BaSO₄ dissolves instantly in stomach acid to neutralize stomach pH',
      'BaSO₄ has an extremely low Ksp (1.1 × 10⁻¹⁰), making [Ba²⁺] harmlessly low in body fluids',
      'Ba²⁺ is an essential human nutrient in high doses',
      'BaSO₄ turns into non-toxic metallic barium inside stomach tissue',
    ],
    correctIndex: 1,
    explanation: 'Because BaSO₄ has an extremely low Ksp (1.1 × 10⁻¹⁰), the concentration of free toxic Ba²⁺ in solution is far below biological toxicity thresholds.',
    hints: [
      'Consider the solubility of BaSO₄ in aqueous gastrointestinal fluid.',
      'Toxicity depends on free dissolved Ba²⁺ ion concentration.',
      'Extremely low Ksp means virtually zero free Ba²⁺ ions dissolve in the body.',
    ],
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'c_s1',
    nodeId: 'c11_chem_063',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Standard',
    question: 'Calculate the molar solubility s (in mol/L) of Silver Chloride (AgCl) in pure water at 25°C given Ksp = 1.77 × 10⁻¹⁰. (Format: scientific notation e.g. 1.33e-5)',
    correctAnswer: 1.33e-5,
    tolerance: 0.05e-5,
    unit: 'M',
    explanation: 'For AgCl (1:1 salt): Ksp = s². Therefore, s = √(1.77 × 10⁻¹⁰) = 1.33 × 10⁻⁵ M.',
    hints: [
      'Write the Ksp expression for 1:1 salt: Ksp = s².',
      'Solve for s by taking the square root of Ksp.',
      's = √(1.77 × 10⁻¹⁰) = 1.33 × 10⁻⁵ M.',
    ],
  },
  {
    id: 'c_s2',
    nodeId: 'c11_chem_063',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Standard',
    question: 'The molar solubility of Lead(II) Iodide (PbI₂) in pure water is 1.30 × 10⁻³ M. Calculate its solubility product Ksp. (Format: scientific notation e.g. 8.80e-9)',
    correctAnswer: 8.80e-9,
    tolerance: 0.3e-9,
    unit: '',
    explanation: 'PbI₂ is a 1:2 salt: PbI₂ ⇌ Pb²⁺ + 2 I⁻. Ksp = [Pb²⁺][I⁻]² = (s)(2s)² = 4s³ = 4 × (1.30 × 10⁻³)³ = 4 × (2.197 × 10⁻⁹) = 8.79 × 10⁻⁹ ≈ 8.80 × 10⁻⁹.',
    hints: [
      'PbI₂ dissociates into 1 Pb²⁺ and 2 I⁻ ions.',
      'Express Ksp in terms of s: Ksp = 4s³.',
      'Substitute s = 1.30 × 10⁻³ M: Ksp = 4 × (1.30 × 10⁻³)³ = 8.80 × 10⁻⁹.',
    ],
  },
  {
    id: 'c_s3',
    nodeId: 'c11_chem_064',
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'Standard',
    question: 'A solution contains [Ag⁺] = 2.0 × 10⁻4 M and [Cl⁻] = 3.0 × 10⁻5 M. Given Ksp(AgCl) = 1.8 × 10⁻¹⁰, determine the state of the solution.',
    options: [
      'Qsp = 6.0 × 10⁻⁹ > Ksp; precipitation will occur',
      'Qsp = 6.0 × 10⁻⁹ < Ksp; solution is unsaturated, no precipitate',
      'Qsp = 5.0 × 10⁻⁹ = Ksp; solution is exactly at saturation equilibrium',
      'Qsp = 1.8 × 10⁻¹⁰; AgCl rapidly dissolves',
    ],
    correctIndex: 0,
    explanation: 'Qsp = [Ag⁺][Cl⁻] = (2.0 × 10⁻⁴)(3.0 × 10⁻⁵) = 6.0 × 10⁻⁹. Since Qsp (6.0 × 10⁻⁹) > Ksp (1.8 × 10⁻¹⁰), the solution is supersaturated and AgCl will precipitate.',
    hints: [
      'Calculate Qsp = [Ag⁺] × [Cl⁻].',
      'Qsp = (2.0 × 10⁻⁴) × (3.0 × 10⁻⁵) = 6.0 × 10⁻⁹.',
      'Compare 6.0 × 10⁻⁹ with Ksp (1.8 × 10⁻¹⁰). Since Qsp > Ksp, precipitation occurs.',
    ],
  },
  {
    id: 'c_s4',
    nodeId: 'c11_chem_065',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Standard',
    question: 'Calculate the molar solubility s\' (in mol/L) of AgCl (Ksp = 1.8 × 10⁻¹⁰) in a 0.10 M NaCl solution. (Format: scientific notation e.g. 1.8e-9)',
    correctAnswer: 1.8e-9,
    tolerance: 0.1e-9,
    unit: 'M',
    explanation: 'NaCl fully dissociates giving [Cl⁻] = 0.10 M. Ksp = [Ag⁺][Cl⁻] = (s\')(0.10 + s\') ≈ s\' × 0.10 = 1.8 × 10⁻¹⁰. Thus s\' = (1.8 × 10⁻¹⁰) / 0.10 = 1.8 × 10⁻⁹ M.',
    hints: [
      '[Cl⁻] from NaCl is 0.10 M.',
      'Set up Ksp = [Ag⁺][Cl⁻] = (s\')(0.10 + s\').',
      'Since s\' << 0.10, approximate (0.10 + s\') ≈ 0.10, so s\' = Ksp / 0.10 = 1.8 × 10⁻⁹ M.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'c_s5',
    nodeId: 'c11_chem_066',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Standard',
    question: 'A solution has [Ag⁺] = 0.010 M and [Pb²⁺] = 0.010 M. Chromate (CrO₄²⁻) is added slowly. Ksp(Ag₂CrO₄) = 1.1 × 10⁻¹² and Ksp(PbCrO₄) = 1.8 × 10⁻¹⁴. Calculate the minimum [CrO₄²⁻] required to begin precipitating Pb²⁺.',
    correctAnswer: 1.8e-12,
    tolerance: 0.2e-12,
    unit: 'M',
    explanation: 'For PbCrO₄ to precipitate: [CrO₄²⁻] = Ksp(PbCrO₄) / [Pb²⁺] = (1.8 × 10⁻¹⁴) / 0.010 = 1.8 × 10⁻¹² M.',
    hints: [
      'Write precipitation condition for PbCrO₄: Qsp = [Pb²⁺][CrO₄²⁻] = Ksp.',
      'Rearrange for [CrO₄²⁻] = Ksp / [Pb²⁺].',
      'Substitute Ksp = 1.8 × 10⁻¹⁴ and [Pb²⁺] = 0.010 M to get 1.8 × 10⁻¹² M.',
    ],
  },
  {
    id: 'c_s6',
    nodeId: 'c11_chem_067',
    type: 'understanding',
    difficulty: 'standard',
    competencyLevel: 'Standard',
    question: 'Why does Magnesium Hydroxide, Mg(OH)₂ (Ksp = 1.8 × 10⁻¹¹), dissolve readily upon adding dilute Hydrochloric Acid (HCl)?',
    options: [
      'Cl⁻ forms an insoluble precipitate with Mg²⁺',
      'H⁺ ions from HCl react with OH⁻ ions to form H₂O, pulling equilibrium Mg(OH)₂ ⇌ Mg²⁺ + 2OH⁻ forward',
      'HCl increases the temperature of water above 100°C',
      'HCl alters the fundamental atomic weight of Magnesium',
    ],
    correctIndex: 1,
    explanation: 'Adding H⁺ consumes OH⁻ ions via H⁺ + OH⁻ → H₂O. According to Le Chatelier\'s principle, removing product OH⁻ drives the dissolution of Mg(OH)₂ to completion.',
    hints: [
      'Identify what happens when H⁺ (acid) meets OH⁻ (base).',
      'Neutralization H⁺ + OH⁻ → H₂O drastically lowers [OH⁻].',
      'Removing product OH⁻ shifts Mg(OH)₂ ⇌ Mg²⁺ + 2OH⁻ forward to dissolve solid.',
    ],
  },
  {
    id: 'c_s7',
    nodeId: 'c11_chem_068',
    type: 'understanding',
    difficulty: 'standard',
    competencyLevel: 'Standard',
    question: 'What is the overall equilibrium constant K for dissolving AgCl(s) in aqueous NH₃ via complexation: AgCl(s) + 2NH₃(aq) ⇌ [Ag(NH₃)₂]⁺(aq) + Cl⁻(aq), given Ksp(AgCl) = 1.8 × 10⁻¹⁰ and formation constant Kf([Ag(NH₃)₂]⁺) = 1.7 × 10⁷?',
    options: [
      '3.06 × 10⁻³',
      '1.06 × 10⁻¹⁷',
      '9.44 × 10¹⁶',
      '1.70 × 10⁷',
    ],
    correctIndex: 0,
    explanation: 'The overall reaction is the sum of dissolution: AgCl(s) ⇌ Ag⁺ + Cl⁻ (Ksp) and complexation: Ag⁺ + 2NH₃ ⇌ [Ag(NH₃)₂]⁺ (Kf). K = Ksp × Kf = (1.8 × 10⁻¹⁰) × (1.7 × 10⁷) = 3.06 × 10⁻³.',
    hints: [
      'When two chemical equations are added together, their equilibrium constants multiply.',
      'K = Ksp(AgCl) × Kf([Ag(NH₃)₂]⁺).',
      'K = (1.8 × 10⁻¹⁰) × (1.7 × 10⁷) = 3.06 × 10⁻³.',
    ],
  },
  {
    id: 'c_s8',
    nodeId: 'c11_chem_069',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Standard',
    question: 'Given ΔG° = 55.7 kJ/mol for dissolution of AgCl at 298 K, calculate Ksp using ΔG° = -RT ln(Ksp). (R = 8.314 J/mol·K. Format: scientific notation e.g. 1.77e-10)',
    correctAnswer: 1.77e-10,
    tolerance: 0.15e-10,
    unit: '',
    explanation: 'ln(Ksp) = -ΔG° / (RT) = -55,700 / (8.314 × 298) = -55,700 / 2,477.57 = -22.48. Ksp = e⁻²²·⁴⁸ = 1.73 × 10⁻¹⁰ ≈ 1.77 × 10⁻¹⁰.',
    hints: [
      'Convert ΔG° from kJ/mol to J/mol: 55,700 J/mol.',
      'ln(Ksp) = -ΔG° / (R × T) = -55,700 / (8.314 × 298) = -22.48.',
      'Take exponential: Ksp = e^(-22.48) = 1.77 × 10⁻¹⁰.',
    ],
  },

  // --- ADVANCED TIER (7 Challenges) ---
  {
    id: 'c_a1',
    nodeId: 'c11_chem_063',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Advanced',
    question: 'Calculate the molar solubility s (in mol/L) of Aluminum Hydroxide, Al(OH)₃, in pure water given Ksp = 2.7 × 10⁻³¹. (Format: scientific notation e.g. 1.0e-8)',
    correctAnswer: 1.0e-8,
    tolerance: 0.15e-8,
    unit: 'M',
    explanation: 'Al(OH)₃ is a 1:3 salt: Al(OH)₃ ⇌ Al³⁺ + 3OH⁻. Ksp = [Al³⁺][OH⁻]³ = (s)(3s)³ = 27s⁴. 27s⁴ = 2.7 × 10⁻³¹ ⟹ s⁴ = 1.0 × 10⁻³² ⟹ s = 1.0 × 10⁻⁸ M.',
    hints: [
      'Write Ksp expression for 1:3 salt: Ksp = (s)(3s)³ = 27s⁴.',
      'Set 27s⁴ = 2.7 × 10⁻³¹.',
      's⁴ = 1.0 × 10⁻³² ⟹ s = (1.0 × 10⁻³²)^(1/4) = 1.0 × 10⁻⁸ M.',
    ],
  },
  {
    id: 'c_a2',
    nodeId: 'c11_chem_066',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Advanced',
    question: 'A solution contains 0.010 M Ag⁺ and 0.010 M Pb²⁺. As CrO₄²⁻ is added, PbCrO₄ (Ksp = 1.8 × 10⁻¹⁴) precipitates first. What is [Pb²⁺] remaining in solution when Ag₂CrO₄ (Ksp = 1.1 × 10⁻¹²) just begins to precipitate? (Format: scientific notation e.g. 1.64e-4)',
    correctAnswer: 1.64e-4,
    tolerance: 0.15e-4,
    unit: 'M',
    explanation: 'Ag₂CrO₄ begins precipitating when [CrO₄²⁻] = Ksp(Ag₂CrO₄) / [Ag⁺]² = (1.1 × 10⁻¹²) / (0.010)² = 1.1 × 10⁻⁸ M. At this [CrO₄²⁻], remaining [Pb²⁺] = Ksp(PbCrO₄) / [CrO₄²⁻] = (1.8 × 10⁻¹⁴) / (1.1 × 10⁻⁸) = 1.64 × 10⁻⁴ M.',
    hints: [
      'Find [CrO₄²⁻] needed to start Ag₂CrO₄ precipitation: [CrO₄²⁻] = 1.1 × 10⁻¹² / (0.010)² = 1.1 × 10⁻⁸ M.',
      'Substitute this [CrO₄²⁻] into Ksp(PbCrO₄) = [Pb²⁺][CrO₄²⁻].',
      '[Pb²⁺] = 1.8 × 10⁻¹⁴ / 1.1 × 10⁻⁸ = 1.64 × 10⁻⁴ M.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'c_a3',
    nodeId: 'c11_chem_065',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Advanced',
    question: 'Calculate the molar solubility s\' (in mol/L) of Calcium Fluoride (CaF₂, Ksp = 3.9 × 10⁻¹¹) in a 0.050 M NaF solution. (Format: scientific notation e.g. 1.56e-8)',
    correctAnswer: 1.56e-8,
    tolerance: 0.15e-8,
    unit: 'M',
    explanation: 'CaF₂ ⇌ Ca²⁺ + 2 F⁻. [Ca²⁺] = s\', [F⁻] = 0.050 + 2s\' ≈ 0.050 M. Ksp = [Ca²⁺][F⁻]² = (s\')(0.050)² = 3.9 × 10⁻¹¹. s\' = (3.9 × 10⁻¹¹) / 0.0025 = 1.56 × 10⁻⁸ M.',
    hints: [
      'Common ion F⁻ concentration comes from 0.050 M NaF.',
      'Ksp = [Ca²⁺][F⁻]² = (s\')(0.050)².',
      's\' = (3.9 × 10⁻¹¹) / 0.0025 = 1.56 × 10⁻⁸ M.',
    ],
  },
  {
    id: 'c_a4',
    nodeId: 'c11_chem_067',
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'Advanced',
    question: 'Order the following sparingly soluble salts in order of INCREASING solubility enhancement when the pH of the aqueous solution is lowered from 7.0 to 2.0:',
    options: [
      'AgCl (neutral anion) < CaC₂O₄ (weak acid anion) < Mg(OH)₂ (strong basic anion)',
      'Mg(OH)₂ < CaC₂O₄ < AgCl',
      'CaC₂O₄ < AgCl < Mg(OH)₂',
      'AgCl < Mg(OH)₂ < CaC₂O₄',
    ],
    correctIndex: 0,
    explanation: 'Cl⁻ is the conjugate base of strong acid HCl, so it does not react with H⁺ (AgCl solubility is independent of pH). C₂O₄²⁻ is weak acid anion (moderate enhancement). OH⁻ reacts quantitatively with H⁺ (huge enhancement for Mg(OH)₂).',
    hints: [
      'Consider the basicity of the anion in each salt.',
      'Cl⁻ is conjugate base of strong acid (HCl) → zero pH effect.',
      'C₂O₄²⁻ is conjugate base of weak acid (H₂C₂O₄) → moderate pH effect.',
      'OH⁻ reacts directly with H⁺ to form H₂O → maximum pH effect.',
    ],
  },
  {
    id: 'c_a5',
    nodeId: 'c11_chem_070',
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'Advanced',
    question: 'Arrange the experimental steps in Qualitative Inorganic Analysis to selectively separate Group II (e.g. Cu²⁺) from Group IV (e.g. Zn²⁺) cations:',
    options: [
      '1. Add HCl to make solution acidic → 2. Pass H₂S gas (low [S²⁻]) → 3. Filter Group II sulfide precipitate → 4. Make filtrate basic with NH₄OH/NH₄Cl → 5. Pass H₂S gas (high [S²⁻]) to precipitate Group IV',
      '1. Make solution basic with NH₄OH → 2. Pass H₂S gas → 3. Add HCl to dissolve everything → 4. Filter solids',
      '1. Pass H₂S gas with no acid or base → 2. Boil to dryness → 3. Add HNO₃',
      '1. Add NaOH → 2. Filter → 3. Add HCl',
    ],
    correctIndex: 0,
    explanation: 'In acidic medium (HCl), common H⁺ suppresses H₂S dissociation, maintaining low [S²⁻] so only Group II (low Ksp) sulfides precipitate. Neutralizing/basifying with NH₄OH increases [S²⁻], precipitating Group IV (higher Ksp) sulfides.',
    hints: [
      'Group II sulfides have very low Ksp values compared to Group IV.',
      'Acidic medium keeps [S²⁻] low via Common Ion Effect of H⁺.',
      'Basic medium increases [S²⁻] to exceed Ksp of Group IV sulfides.',
    ],
  },
  {
    id: 'c_a6',
    nodeId: 'c11_chem_068',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Advanced',
    question: 'Calculate the molar solubility s (in mol/L) of AgCl (Ksp = 1.8 × 10⁻¹⁰) in a 1.0 M aqueous ammonia (NH₃) solution, given Kf([Ag(NH₃)₂]⁺) = 1.7 × 10⁷. (Overall K = 3.06 × 10⁻³. Format: decimal e.g. 0.047)',
    correctAnswer: 0.047,
    tolerance: 0.005,
    unit: 'M',
    explanation: 'Reaction: AgCl(s) + 2NH₃ ⇌ [Ag(NH₃)₂]⁺ + Cl⁻. K = Ksp × Kf = 3.06 × 10⁻³. At equilibrium: [[Ag(NH₃)₂]⁺] = s, [Cl⁻] = s, [NH₃] = 1.0 - 2s. K = s² / (1.0 - 2s)² ⟹ √K = s / (1.0 - 2s). √(0.00306) = 0.0553. 0.0553(1 - 2s) = s ⟹ 0.0553 = 1.1106s ⟹ s ≈ 0.047 M.',
    hints: [
      'Write overall reaction: AgCl(s) + 2NH₃ ⇌ [Ag(NH₃)₂]⁺ + Cl⁻ with K = 3.06 × 10⁻³.',
      'Expression: K = s² / (1 - 2s)².',
      'Take square root of both sides: √K = s / (1 - 2s) ⟹ 0.0553 = s / (1 - 2s) ⟹ s ≈ 0.047 M.',
    ],
  },
  {
    id: 'c_a7',
    nodeId: 'c11_chem_069',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Advanced',
    question: 'The Ksp of a salt is 1.0 × 10⁻⁵ at 298 K and 4.0 × 10⁻⁵ at 318 K. Calculate the standard enthalpy of dissolution ΔH°sol in kJ/mol using van \'t Hoff equation: ln(Ksp2/Ksp1) = (ΔH°/R)(1/T1 - 1/T2). (R = 8.314 J/mol·K. Format: decimal e.g. 54.7)',
    correctAnswer: 54.7,
    tolerance: 2.0,
    unit: 'kJ/mol',
    explanation: 'ln(4.0 × 10⁻⁵ / 1.0 × 10⁻⁵) = ln(4) = 1.3863. (1/298 - 1/318) = (0.0033557 - 0.0031446) = 2.111 × 10⁻⁴ K⁻¹. 1.3863 = (ΔH° / 8.314) × 2.111 × 10⁻⁴ ⟹ ΔH° = (1.3863 × 8.314) / (2.111 × 10⁻⁴) = 54,595 J/mol ≈ 54.7 kJ/mol.',
    hints: [
      'Calculate ln(Ksp2/Ksp1) = ln(4) = 1.3863.',
      'Calculate (1/T1 - 1/T2) = (1/298 - 1/318) = 2.111 × 10⁻⁴.',
      'ΔH° = (1.3863 × 8.314) / (2.111 × 10⁻⁴) = 54.6 kJ/mol.',
    ],
  },
];

// ==========================================
// CUSTOM SVG DIAGRAM COMPONENTS
// ==========================================

const DynamicEquilibriumDiagram: React.FC<{ sVal: number; kspVal: number }> = ({ sVal, kspVal }) => {
  return (
    <div className="flex flex-col items-center bg-slate-900/80 p-4 rounded-xl border border-cyan-500/30 shadow-lg">
      <h4 className="text-cyan-400 text-sm font-semibold mb-2 flex items-center gap-2">
        <span>⚗️</span> Dynamic Solubility Equilibrium & Hydration Shell
      </h4>
      <svg width="340" height="200" viewBox="0 0 340 200" className="overflow-visible">
        <defs>
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="solidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
        </defs>
        {/* Beaker Container */}
        <rect x="40" y="30" width="260" height="150" rx="10" fill="url(#waterGrad)" stroke="#38bdf8" strokeWidth="2.5" />
        
        {/* Undissolved Solid Lattice at bottom */}
        <path d="M 60 150 Q 170 140 280 150 L 280 175 L 60 175 Z" fill="url(#solidGrad)" stroke="#cbd5e1" strokeWidth="1" />
        <text x="170" y="167" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">
          Undissolved Crystal Lattice: M_a X_b (s)
        </text>

        {/* Dynamic Dissolution & Crystallization Arrows */}
        <path d="M 120 145 L 120 100" stroke="#4ade80" strokeWidth="3" markerEnd="url(#arrowUp)" strokeDasharray="4 2" />
        <text x="95" y="125" fill="#4ade80" fontSize="10" fontWeight="bold">v_dissolve</text>
        <path d="M 220 100 L 220 145" stroke="#f43f5e" strokeWidth="3" fill="none" strokeDasharray="4 2" />
        <text x="225" y="125" fill="#f43f5e" fontSize="10" fontWeight="bold">v_crystallize</text>

        {/* Hydrated Cations and Anions in solution */}
        <g className="animate-pulse">
          <circle cx="90" cy="70" r="10" fill="#38bdf8" stroke="#e0f2fe" strokeWidth="2" />
          <text x="90" y="74" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">M⁺</text>
          
          <circle cx="160" cy="65" r="12" fill="#f59e0b" stroke="#fef3c7" strokeWidth="2" />
          <text x="160" y="69" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">X⁻</text>
          
          <circle cx="240" cy="75" r="10" fill="#38bdf8" stroke="#e0f2fe" strokeWidth="2" />
          <text x="240" y="79" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">M⁺</text>
        </g>

        {/* Dynamic Equilibrium Equilibrium Condition Badge */}
        <rect x="80" y="5" width="180" height="22" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="170" y="20" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">
          Equilibrium: v_diss = v_cryst
        </text>
      </svg>
      <div className="flex justify-between w-full text-xs text-slate-300 mt-2 px-2">
        <span>Computed Molar Solubility s: <strong className="text-cyan-300">{sVal.toExponential(2)} M</strong></span>
        <span>Ksp: <strong className="text-amber-300">{kspVal.toExponential(2)}</strong></span>
      </div>
    </div>
  );
};

const CommonIonEffectDiagram: React.FC<{ addedIonConc: number }> = ({ addedIonConc }) => {
  return (
    <div className="flex flex-col items-center bg-slate-900/80 p-4 rounded-xl border border-amber-500/30 shadow-lg">
      <h4 className="text-amber-400 text-sm font-semibold mb-2 flex items-center gap-2">
        <span>🧪</span> Common Ion Equilibrium Shift (Le Chatelier)
      </h4>
      <svg width="340" height="180" viewBox="0 0 340 180">
        {/* Equilibrium Line */}
        <rect x="20" y="70" width="300" height="40" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
        <text x="170" y="95" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold">
          AgCl (s) ⇌ Ag⁺ (aq) + Cl⁻ (aq)
        </text>

        {/* Added Common Ion Arrow */}
        <path d="M 260 20 L 260 65" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowDown)" strokeDasharray="3 3" />
        <text x="260" y="15" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">
          + Extra Cl⁻ ({addedIonConc} M)
        </text>

        {/* Le Chatelier Shift Arrow pointing Left */}
        <path d="M 230 125 L 110 125" stroke="#ef4444" strokeWidth="4" />
        <polygon points="110,120 95,125 110,130" fill="#ef4444" />
        <text x="170" y="145" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">
          Equilibrium Shifts LEFT (Precipitation Boost)
        </text>
        <text x="170" y="165" textAnchor="middle" fill="#94a3b8" fontSize="10">
          Molar Solubility s drops; Ksp remains CONSTANT
        </text>
      </svg>
    </div>
  );
};

const SelectivePrecipitationLadderDiagram: React.FC<{ agReq: number; pbReq: number }> = ({ agReq, pbReq }) => {
  return (
    <div className="flex flex-col items-center bg-slate-900/80 p-4 rounded-xl border border-emerald-500/30 shadow-lg">
      <h4 className="text-emerald-400 text-sm font-semibold mb-2 flex items-center gap-2">
        <span>🪜</span> Selective Fractional Precipitation Threshold Ladder
      </h4>
      <svg width="340" height="180" viewBox="0 0 340 180">
        {/* Concentration Axis */}
        <line x1="50" y1="20" x2="50" y2="150" stroke="#94a3b8" strokeWidth="2" />
        <polygon points="45,20 50,10 55,20" fill="#94a3b8" />
        <text x="25" y="85" fill="#cbd5e1" fontSize="10" transform="rotate(-90 25 85)" textAnchor="middle">
          Reagent Conc [Cl⁻] →
        </text>

        {/* Threshold 1: Pb2+ Precipitates First */}
        <line x1="50" y1="120" x2="300" y2="120" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 3" />
        <circle cx="50" cy="120" r="5" fill="#ef4444" />
        <rect x="180" y="102" width="115" height="16" rx="4" fill="#7f1d1d" />
        <text x="237" y="114" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold">
          1st: PbCl₂ Precipitates
        </text>

        {/* Threshold 2: Ag+ Precipitates Second */}
        <line x1="50" y1="50" x2="300" y2="50" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5 3" />
        <circle cx="50" cy="50" r="5" fill="#3b82f6" />
        <rect x="180" y="32" width="115" height="16" rx="4" fill="#1e3a8a" />
        <text x="237" y="44" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="bold">
          2nd: AgCl Precipitates
        </text>

        {/* Selective Window Zone */}
        <rect x="60" y="55" width="100" height="60" rx="6" fill="#047857" fillOpacity="0.3" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
        <text x="110" y="82" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">
          Pure Separation
        </text>
        <text x="110" y="96" textAnchor="middle" fill="#a7f3d0" fontSize="9">
          Window Zone
        </text>
      </svg>
    </div>
  );
};

// ==========================================
// CANVAS DISSOLUTION & PRECIPITATION LAB
// ==========================================

interface CanvasLabProps {
  saltType: 'AgCl' | 'PbCl2' | 'Ag2CrO4' | 'AlOH3';
  cationConc: number;
  anionConc: number;
  temperature: number; // in Kelvin
  addedCommonIon: number;
}

const SolubilityCanvasLab: React.FC<CanvasLabProps> = ({
  saltType,
  cationConc,
  anionConc,
  temperature,
  addedCommonIon,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    // Salt metadata & equilibrium calculation
    let kspBase = 1.8e-10;
    let cationLabel = 'Ag⁺';
    let anionLabel = 'Cl⁻';
    let cationColor = '#38bdf8';
    let anionColor = '#f59e0b';

    if (saltType === 'PbCl2') {
      kspBase = 1.7e-5;
      cationLabel = 'Pb²⁺';
      anionLabel = 'Cl⁻';
      cationColor = '#a855f7';
    } else if (saltType === 'Ag2CrO4') {
      kspBase = 1.1e-12;
      cationLabel = 'Ag⁺';
      anionLabel = 'CrO₄²⁻';
      anionColor = '#ef4444';
    } else if (saltType === 'AlOH3') {
      kspBase = 2.7e-31;
      cationLabel = 'Al³⁺';
      anionLabel = 'OH⁻';
      cationColor = '#10b981';
      anionColor = '#ec4899';
    }

    // Temperature correction via van 't Hoff approximation
    const tempFactor = Math.exp((54000 / 8.314) * (1 / 298 - 1 / temperature));
    const kspActual = kspBase * tempFactor;

    // Ionic Product Calculation
    const effectiveAnion = anionConc + addedCommonIon;
    let qsp = cationConc * effectiveAnion;
    if (saltType === 'PbCl2') qsp = cationConc * Math.pow(effectiveAnion, 2);
    if (saltType === 'Ag2CrO4') qsp = Math.pow(cationConc, 2) * effectiveAnion;
    if (saltType === 'AlOH3') qsp = cationConc * Math.pow(effectiveAnion, 3);

    const isPrecipitating = qsp > kspActual;

    // Particle simulation data
    const particlesCount = Math.min(60, Math.floor((cationConc + effectiveAnion) * 200));
    const particles = Array.from({ length: particlesCount }).map(() => ({
      x: 40 + Math.random() * 260,
      y: 40 + Math.random() * 100,
      vx: (Math.random() - 0.5) * (temperature / 150),
      vy: (Math.random() - 0.5) * (temperature / 150),
      type: Math.random() > 0.5 ? 'cation' : 'anion',
      radius: 4 + Math.random() * 3,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Liquid background gradient
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#1e293b');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render Beaker outline
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.strokeRect(30, 20, 280, 160);

      // Render Precipitate Bed at Bottom if supersaturated
      if (isPrecipitating) {
        const precipitateHeight = Math.min(35, Math.log10(qsp / kspActual) * 8 + 10);
        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.ellipse(170, 175, 130, precipitateHeight, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`Solid Precipitate: ${saltType} (s)`, 170, 175);
      }

      // Render Floating Ions
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 35 || p.x > 305) p.vx *= -1;
        if (p.y < 25 || p.y > 155) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.type === 'cation' ? cationColor : anionColor;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = '8px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(p.type === 'cation' ? cationLabel : anionLabel, p.x, p.y + 3);
      });

      // Status Overlay Badge
      ctx.fillStyle = isPrecipitating ? '#ef4444' : '#10b981';
      ctx.fillRect(40, 30, 140, 24);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(isPrecipitating ? '⚠️ PRECIPITATING (Qsp > Ksp)' : '��� SATURATED / DISSOLVED', 110, 46);

      // Live Telemetry
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '10px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`Qsp: ${qsp.toExponential(2)}`, 190, 40);
      ctx.fillText(`Ksp: ${kspActual.toExponential(2)}`, 190, 52);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [saltType, cationConc, anionConc, temperature, addedCommonIon]);

  return (
    <div className="flex flex-col items-center bg-slate-900/90 p-4 rounded-xl border border-slate-700 shadow-2xl">
      <h3 className="text-slate-200 text-sm font-bold mb-2 flex items-center gap-2">
        <span>🎬</span> Real-Time Molecular Motion & Crystal Precipitation Kinetic Canvas
      </h3>
      <canvas ref={canvasRef} width={340} height={190} className="rounded-lg shadow-inner border border-slate-800" />
    </div>
  );
};

// ==========================================
// DISCOVERY TAB COMPONENT
// ==========================================

interface DiscoveryTabProps {
  onStartLab: () => void;
  bktState: Record<NodeId, BKTState>;
}

const DiscoveryTab: React.FC<DiscoveryTabProps> = ({ onStartLab }) => {
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [predAnswers, setPredAnswers] = useState<Record<number, number>>({});

  const handleSelectDiscovery = (idx: number) => {
    setSelectedOpt(idx);
    setShowExplanation(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Excellent discovery! Stoichiometry plays a major role in solubility calculations.');
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite right. Notice how the stoichiometry affects the exponent in the formula.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Scenario Lab Context Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/40 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">🔬</span>
          <div>
            <h2 className="text-xl font-bold text-indigo-300">{SCENARIO.title}</h2>
            <p className="text-xs text-indigo-200/80">ISC Chemistry Class 11 • Module 6</p>
          </div>
        </div>
        <p className="text-slate-300 text-sm mb-3 leading-relaxed">{SCENARIO.intro}</p>
        <div className="bg-indigo-900/40 border border-indigo-500/30 p-3 rx-lg rounded-xl text-xs text-indigo-200">
          <strong>Lab Objective:</strong> {SCENARIO.context}
        </div>
      </div>

      {/* Counterintuitive Discovery Question */}
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg font-bold text-amber-400 mb-2 flex items-center gap-2">
          <span>💡</span> Interactive Discovery Challenge
        </h3>
        <p className="text-slate-200 text-sm mb-4 leading-relaxed">{DISCOVERY_QUESTION.question}</p>

        <div className="grid grid-cols-1 gap-3 mb-4">
          {DISCOVERY_QUESTION.options.map((opt, i) => {
            const isChosen = selectedOpt === i;
            const isCorrect = i === DISCOVERY_QUESTION.correctIndex;
            let btnStyle = 'bg-slate-800 text-slate-200 border-slate-700 hover:border-indigo-500';

            if (showExplanation) {
              if (isCorrect) btnStyle = 'bg-emerald-950 text-emerald-200 border-emerald-500 font-semibold';
              else if (isChosen) btnStyle = 'bg-rose-950 text-rose-200 border-rose-500';
            }

            return (
              <button
                key={i}
                onClick={() => handleSelectDiscovery(i)}
                className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-start gap-3 ${btnStyle}`}
              >
                <span className="font-bold border rounded-full px-2 py-0.5 text-xs bg-slate-900">{String.fromCharCode(65 + i)}</span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="bg-slate-800/90 border border-amber-500/40 p-4 rounded-xl text-xs text-amber-200 space-y-2 animate-fadeIn">
            <p className="font-bold flex items-center gap-2">
              <span>🧠</span> Chemistry Insight:
            </p>
            <p>{DISCOVERY_QUESTION.hintAfter}</p>
          </div>
        )}
      </div>

      {/* Prediction Questions Section */}
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-lg space-y-4">
        <h3 className="text-md font-bold text-cyan-400 flex items-center gap-2">
          <span>🔮</span> Lab Hypotheses & Predictions
        </h3>
        {PREDICTION_QUESTIONS.map((pq, qIdx) => (
          <div key={qIdx} className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 space-y-2">
            <p className="text-xs text-slate-200 font-semibold">{pq.question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {pq.options.map((opt, oIdx) => {
                const isSelected = predAnswers[qIdx] === oIdx;
                const isRight = oIdx === pq.correctIndex;
                const hasAnswered = predAnswers[qIdx] !== undefined;

                let style = 'bg-slate-800 text-slate-300 border-slate-700';
                if (hasAnswered) {
                  if (isRight) style = 'bg-emerald-900/60 text-emerald-200 border-emerald-500';
                  else if (isSelected) style = 'bg-rose-900/60 text-rose-200 border-rose-500';
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => {
                      setPredAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
                      audioManager.play(isRight ? 'success' : 'error');
                    }}
                    className={`p-2 rounded-lg text-left text-xs border transition-all ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {predAnswers[qIdx] !== undefined && (
              <p className="text-[11px] text-cyan-300 italic mt-1">
                🔎 Verification Guide: {pq.verifyInstruction}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Transition Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={() => {
            audioManager.play('swoop');
            onStartLab();
          }}
          className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm"
        >
          <span>Enter Interactive Chemistry Lab</span>
          <span>🚀</span>
        </button>
      </div>
    </div>
  );
};

// ==========================================
// INTERACTIVE LAB TAB COMPONENT
// ==========================================

interface LabTabProps {
  onCompleteLabStep: (nodeId: NodeId) => void;
}

const LabTab: React.FC<LabTabProps> = ({ onCompleteLabStep }) => {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [saltType, setSaltType] = useState<'AgCl' | 'PbCl2' | 'Ag2CrO4' | 'AlOH3'>('AgCl');
  const [cationConc, setCationConc] = useState<number>(0.001);
  const [anionConc, setAnionConc] = useState<number>(0.001);
  const [temperature, setTemperature] = useState<number>(298);
  const [addedCommonIon, setAddedCommonIon] = useState<number>(0.0);
  const [phValue, setPhValue] = useState<number>(7.0);
  const [nh3LigandConc, setNh3LigandConc] = useState<number>(0.0);

  // Observation answers state
  const [obsAnswers, setObsAnswers] = useState<Record<number, number>>({});

  const currentStep = EXPLORATION_STEPS[activeStepIdx];

  // Calculated values
  const kspBaseMap = { AgCl: 1.8e-10, PbCl2: 1.7e-5, Ag2CrO4: 1.1e-12, AlOH3: 2.7e-31 };
  const kspBase = kspBaseMap[saltType];
  const sCalculated = useMemo(() => {
    if (saltType === 'AgCl') return Math.sqrt(kspBase);
    if (saltType === 'PbCl2') return Math.cbrt(kspBase / 4);
    if (saltType === 'Ag2CrO4') return Math.cbrt(kspBase / 4);
    if (saltType === 'AlOH3') return Math.pow(kspBase / 27, 0.25);
    return 0;
  }, [saltType, kspBase]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Exploration Step Selector Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {EXPLORATION_STEPS.map((step, idx) => {
          const isActive = idx === activeStepIdx;
          return (
            <button
              key={idx}
              onClick={() => {
                setActiveStepIdx(idx);
                audioManager.play('tap');
                speechManager.speak(`Loaded ${step.title}`);
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-400 font-bold shadow-lg ring-2 ring-indigo-400/50'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="text-[10px] uppercase font-mono text-indigo-200">Lab Step 0{idx + 1}</div>
              <div className="text-xs truncate">{step.title.split(':')[1] || step.title}</div>
            </button>
          );
        })}
      </div>

      {/* Active Step Context Box */}
      <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-md flex justify-between items-center gap-4">
        <div>
          <h3 className="text-sm font-bold text-cyan-300">{currentStep.title}</h3>
          <p className="text-xs text-slate-300">{currentStep.instruction}</p>
        </div>
        <button
          onClick={() => {
            onCompleteLabStep(currentStep.nodeId as NodeId);
            audioManager.play('celebration');
          }}
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-2 rounded-lg transition-all shrink-0"
        >
          Mark Step Completed ✓
        </button>
      </div>

      {/* Main Interactive Controls + Canvas Visualizer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Sliders & Salt Selectors (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-4">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 border-b border-slate-800 pb-2 flex items-center gap-2">
            <span>🎛️</span> Solution Parameters & Reagent Feeders
          </h4>

          {/* Salt Select */}
          <div>
            <label className="text-xs text-slate-300 font-semibold mb-1 block">Salt Formula & Stoichiometry:</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'AgCl (1:1)', val: 'AgCl' },
                { label: 'PbCl₂ (1:2)', val: 'PbCl2' },
                { label: 'Ag₂CrO₄ (2:1)', val: 'Ag2CrO4' },
                { label: 'Al(OH)₃ (1:3)', val: 'AlOH3' },
              ].map((s) => (
                <button
                  key={s.val}
                  onClick={() => {
                    setSaltType(s.val as 'AgCl' | 'PbCl2' | 'Ag2CrO4' | 'AlOH3');
                    audioManager.play('pop');
                  }}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                    saltType === s.val
                      ? 'bg-indigo-600 text-white border-indigo-400'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cation Conc Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Cation Concentration [M⁺]:</span>
              <span className="font-mono text-cyan-400">{cationConc.toFixed(5)} M</span>
            </div>
            <input
              type="range"
              min="0.00001"
              max="0.01"
              step="0.0001"
              value={cationConc}
              onChange={(e) => setCationConc(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Anion Conc Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Anion Concentration [X⁻]:</span>
              <span className="font-mono text-amber-400">{anionConc.toFixed(5)} M</span>
            </div>
            <input
              type="range"
              min="0.00001"
              max="0.01"
              step="0.0001"
              value={anionConc}
              onChange={(e) => setAnionConc(parseFloat(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          {/* Added Common Ion Slider (Lab 3) */}
          {activeStepIdx >= 2 && (
            <div className="bg-amber-950/30 border border-amber-500/30 p-3 rounded-xl space-y-1">
              <div className="flex justify-between text-xs text-amber-200">
                <span>Added Common Ion (NaCl / Cl⁻):</span>
                <span className="font-mono text-amber-300">{addedCommonIon.toFixed(3)} M</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.2"
                step="0.005"
                value={addedCommonIon}
                onChange={(e) => {
                  setAddedCommonIon(parseFloat(e.target.value));
                  audioManager.play('count');
                }}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          )}

          {/* Temperature Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Temperature (T):</span>
              <span className="font-mono text-rose-400">{temperature} K ({(temperature - 273).toFixed(0)} °C)</span>
            </div>
            <input
              type="range"
              min="273"
              max="350"
              step="1"
              value={temperature}
              onChange={(e) => setTemperature(parseInt(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>

          {/* pH & Ligand Controls for Lab Step 5 */}
          {activeStepIdx === 4 && (
            <div className="space-y-3 bg-indigo-950/40 border border-indigo-500/30 p-3 rounded-xl">
              <div>
                <div className="flex justify-between text-xs text-indigo-200 mb-1">
                  <span>Solution pH:</span>
                  <span className="font-mono text-cyan-300">{phValue.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="14"
                  step="0.5"
                  value={phValue}
                  onChange={(e) => setPhValue(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs text-indigo-200 mb-1">
                  <span>Added Ligand [NH₃]:</span>
                  <span className="font-mono text-emerald-300">{nh3LigandConc.toFixed(2)} M</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="2.0"
                  step="0.05"
                  value={nh3LigandConc}
                  onChange={(e) => setNh3LigandConc(parseFloat(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Canvas Visualizer & SVG Diagrams (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <SolubilityCanvasLab
            saltType={saltType}
            cationConc={cationConc}
            anionConc={anionConc}
            temperature={temperature}
            addedCommonIon={addedCommonIon}
          />

          {/* Dynamic Diagram based on active step */}
          {activeStepIdx === 0 && (
            <DynamicEquilibriumDiagram sVal={sCalculated} kspVal={kspBase} />
          )}
          {activeStepIdx === 2 && (
            <CommonIonEffectDiagram addedIonConc={addedCommonIon} />
          )}
          {activeStepIdx === 3 && (
            <SelectivePrecipitationLadderDiagram agReq={1.8e-8} pbReq={1.8e-12} />
          )}
        </div>
      </div>

      {/* Observation Questions Section */}
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-lg space-y-4">
        <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
          <span>👁️</span> Empirical Lab Observations & Findings
        </h3>
        {OBSERVATION_QUESTIONS.map((oq, idx) => (
          <div key={idx} className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 space-y-2">
            <p className="text-xs text-slate-200 font-semibold">{oq.question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {oq.observableOptions.map((opt, oIdx) => {
                const isSelected = obsAnswers[idx] === oIdx;
                const isCorrect = oIdx === oq.correctIndex;
                const hasAnswered = obsAnswers[idx] !== undefined;

                let style = 'bg-slate-800 text-slate-300 border-slate-700';
                if (hasAnswered) {
                  if (isCorrect) style = 'bg-emerald-900/60 text-emerald-200 border-emerald-500';
                  else if (isSelected) style = 'bg-rose-900/60 text-rose-200 border-rose-500';
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => {
                      setObsAnswers((prev) => ({ ...prev, [idx]: oIdx }));
                      audioManager.play(isCorrect ? 'success' : 'error');
                    }}
                    className={`p-2 rounded-lg text-left text-xs border transition-all ${style}`}
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
  );
};

// ==========================================
// CHALLENGES TAB COMPONENT
// ==========================================

interface ChallengesTabProps {
  challenges: Challenge[];
  onAnswerChallenge: (challenge: Challenge, isCorrect: boolean) => void;
  bktState: Record<NodeId, BKTState>;
}

const ChallengesTab: React.FC<ChallengesTabProps> = ({ challenges, onAnswerChallenge, bktState }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [numericVal, setNumericVal] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintLevel, setHintLevel] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const currentChallenge = challenges[currentIdx];
  const currentNodeInfo = NODES_DATA[currentChallenge.nodeId];
  const nodeBKT = bktState[currentChallenge.nodeId];
  const nodeMastery = nodeBKT ? getMasteryLevel(nodeBKT) : 0;

  // Auto hint timer (10s inactivity)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!feedback && !showHint) {
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [currentIdx, feedback, showHint]);

  const handleSubmitChoice = (idx: number) => {
    if (feedback) return;
    setSelectedOpt(idx);
    const isCorrect = idx === currentChallenge.correctIndex;

    setFeedback({
      isCorrect,
      text: isCorrect ? 'Correct! High precision calculation!' : 'Incorrect answer. Review formula steps.',
    });

    audioManager.play(isCorrect ? 'success' : 'error');
    if (isCorrect) speechManager.speak('Correct answer! Well done.');
    else speechManager.speak('That is incorrect. Let us look at the hint.');

    onAnswerChallenge(currentChallenge, isCorrect);
  };

  const handleSubmitNumeric = () => {
    if (feedback || !currentChallenge.correctAnswer) return;
    const num = parseFloat(numericVal);
    const target = currentChallenge.correctAnswer as number;
    const tol = currentChallenge.tolerance || target * 0.05;

    const isCorrect = Math.abs(num - target) <= tol;

    setFeedback({
      isCorrect,
      text: isCorrect
        ? `Correct! Value ${num} is within acceptable tolerance.`
        : `Incorrect. Expected approximately ${target.toExponential(2)}.`,
    });

    audioManager.play(isCorrect ? 'success' : 'error');
    if (isCorrect) speechManager.speak('Numeric solution verified.');
    else speechManager.speak('Numeric answer outside tolerance.');

    onAnswerChallenge(currentChallenge, isCorrect);
  };

  const handleNextChallenge = () => {
    setSelectedOpt(null);
    setNumericVal('');
    setFeedback(null);
    setShowHint(false);
    setHintLevel(0);
    setCurrentIdx((prev) => (prev + 1) % challenges.length);
    audioManager.play('swoop');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Competency & Progress Navigation Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-lg flex flex-wrap justify-between items-center gap-4">
        <div>
          <span className="text-xs uppercase font-mono text-cyan-400 tracking-wider">
            Challenge {currentIdx + 1} of {challenges.length}
          </span>
          <h3 className="text-sm font-bold text-slate-200">{currentNodeInfo?.title}</h3>
        </div>

        <div className="flex items-center gap-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
            currentChallenge.difficulty === 'foundation'
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
              : currentChallenge.difficulty === 'standard'
              ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
              : 'bg-purple-950 text-purple-300 border border-purple-500/40'
          }`}>
            {currentChallenge.competencyLevel} Tier
          </span>

          <div className="text-right">
            <div className="text-[10px] text-slate-400">Node Mastery</div>
            <div className="text-xs font-mono font-bold text-cyan-300">{(nodeMastery * 100).toFixed(0)}%</div>
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-xl space-y-4">
        <p className="text-slate-100 text-sm sm:text-base leading-relaxed font-medium">
          {currentChallenge.question}
        </p>

        {/* Options / Input area */}
        {currentChallenge.options ? (
          <div className="grid grid-cols-1 gap-3">
            {currentChallenge.options.map((opt, i) => {
              const isChosen = selectedOpt === i;
              const isRight = i === currentChallenge.correctIndex;
              let style = 'bg-slate-800 text-slate-200 border-slate-700 hover:border-indigo-500';

              if (feedback) {
                if (isRight) style = 'bg-emerald-950 text-emerald-200 border-emerald-500 font-semibold';
                else if (isChosen) style = 'bg-rose-950 text-rose-200 border-rose-500';
              }

              return (
                <button
                  key={i}
                  disabled={feedback !== null}
                  onClick={() => handleSubmitChoice(i)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs sm:text-sm flex items-start gap-3 ${style}`}
                >
                  <span className="font-bold border rounded-full px-2 py-0.5 text-xs bg-slate-900 shrink-0">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
            <label className="text-xs text-slate-300 font-semibold block">Enter Numeric Value ({currentChallenge.unit || 'Standard Units'}):</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. 1.33e-5 or 0.047"
                value={numericVal}
                onChange={(e) => setNumericVal(e.target.value)}
                disabled={feedback !== null}
                className="bg-slate-900 border border-slate-700 text-cyan-300 font-mono text-sm px-4 py-2 rounded-xl focus:border-cyan-400 focus:outline-none flex-grow"
              />
              <button
                disabled={feedback !== null || !numericVal}
                onClick={handleSubmitNumeric}
                className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold px-5 py-2 rounded-xl text-xs transition-all"
              >
                Submit Answer
              </button>
            </div>
          </div>
        )}

        {/* Feedback Display */}
        {feedback && (
          <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 animate-fadeIn ${
            feedback.isCorrect
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
              : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
          }`}>
            <p className="font-bold text-sm flex items-center gap-2">
              <span>{feedback.isCorrect ? '✅' : '❌'}</span>
              <span>{feedback.text}</span>
            </p>
            <p className="text-slate-300">{currentChallenge.explanation}</p>
          </div>
        )}

        {/* Dynamic Multi-Level Hint System */}
        {showHint && !feedback && (
          <div className="bg-amber-950/40 border border-amber-500/30 p-4 rounded-xl text-xs text-amber-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold flex items-center gap-1">
                <span>💡</span> Lab Hint (Level {hintLevel + 1} of 3)
              </span>
              {hintLevel < 2 && (
                <button
                  onClick={() => {
                    setHintLevel((prev) => prev + 1);
                    audioManager.play('pop');
                  }}
                  className="text-[10px] text-amber-400 hover:underline"
                >
                  More Detail →
                </button>
              )}
            </div>
            <p className="italic">{currentChallenge.hints[hintLevel]}</p>
          </div>
        )}
      </div>

      {/* Challenge Navigation Bar */}
      <div className="flex justify-between items-center pt-2">
        <button
          onClick={() => {
            setShowHint(true);
            audioManager.play('hint');
          }}
          className="text-xs text-amber-400 hover:text-amber-300 underline font-semibold flex items-center gap-1"
        >
          <span>💡 Need a hint?</span>
        </button>

        <button
          onClick={handleNextChallenge}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-5 py-2.5 rounded-xl border border-slate-700 transition-all text-xs flex items-center gap-2"
        >
          <span>Next Challenge</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

// ==========================================
// SUMMARY TAB COMPONENT
// ==========================================

interface SummaryTabProps {
  bktState: Record<NodeId, BKTState>;
  srsItems: Record<NodeId, SRSItem>;
  gameScore: number;
}

const SummaryTab: React.FC<SummaryTabProps> = ({ bktState, gameScore }) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Final Score Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 border border-indigo-500/40 p-6 rounded-2xl shadow-xl flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>🏆</span> Module Mastery Summary
          </h2>
          <p className="text-xs text-indigo-200">ISC Class 11 Chemistry • Solubility Product & Ionic Equilibria</p>
        </div>
        <div className="bg-slate-900/80 border border-cyan-400/40 px-6 py-3 rounded-xl text-center">
          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">Total Game Score</div>
          <div className="text-2xl font-black text-cyan-300">{gameScore} pts</div>
        </div>
      </div>

      {/* Node Mastery Breakdown Grid */}
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-lg space-y-4">
        <h3 className="text-md font-bold text-cyan-300 flex items-center gap-2">
          <span>📊</span> Sub-Topic Bayesian Mastery (BKT Tracker)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ALL_NODE_IDS.map((nodeId) => {
            const info = NODES_DATA[nodeId];
            const bkt = bktState[nodeId];
            const mastery = bkt ? getMasteryLevel(bkt) : 0;
            const pct = Math.round(mastery * 100);

            return (
              <div key={nodeId} className="bg-slate-800/60 p-3 rounded-xl border border-slate-700 space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-200">{info.title}</span>
                  <span className="font-mono text-cyan-400 font-bold">{pct}%</span>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-World Industry Application Activity */}
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-lg space-y-3">
        <h3 className="text-md font-bold text-emerald-400 flex items-center gap-2">
          <span>🏥</span> Real-World Analytical & Medical Activity
        </h3>
        <h4 className="text-xs font-bold text-slate-200">{REAL_WORLD_ACTIVITY.title}</h4>
        <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
        <div className="space-y-2 pt-2">
          {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
            <div key={idx} className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700 text-xs text-slate-300 flex items-start gap-2">
              <span className="font-bold text-emerald-400 font-mono">{idx + 1}.</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================

export interface SolubilityProductSimProps {
  onComplete?: (score: number) => void;
}

export const C11_ChemistrySolubilityproductSim: React.FC<SolubilityProductSimProps> = ({ onComplete }) => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Interactive BKT & SRS Stores
  const [bktState, setBktState] = useState<Record<NodeId, BKTState>>(() => {
    const init: Partial<Record<NodeId, BKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      init[id] = createBKTState();
    });
    return init as Record<NodeId, BKTState>;
  });

  const [srsItems, setSrsItems] = useState<Record<NodeId, SRSItem>>(() => {
    const init: Partial<Record<NodeId, SRSItem>> = {};
    ALL_NODE_IDS.forEach((id) => {
      init[id] = createReviewItem(id);
    });
    return init as Record<NodeId, SRSItem>;
  });

  const [gameScore, setGameScore] = useState<number>(0);

  // FX States
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });

  // Handle Answer Challenge
  const handleAnswerChallenge = useCallback((challenge: Challenge, isCorrect: boolean) => {
    const nodeId = challenge.nodeId;
    
    // Update BKT State
    setBktState((prev) => {
      const current = prev[nodeId] || createBKTState();
      const updated = bktUpdate(current, isCorrect);
      return { ...prev, [nodeId]: updated };
    });

    // Update SRS Item
    setSrsItems((prev) => {
      const current = prev[nodeId] || createReviewItem(nodeId);
      const updated = sm2Update(current, isCorrect ? 5 : 1);
      return { ...prev, [nodeId]: updated };
    });

    // Update Score
    if (isCorrect) {
      setGameScore((prev) => prev + (challenge.difficulty === 'advanced' ? 150 : challenge.difficulty === 'standard' ? 100 : 50));
      setShowSparkle(true);
      setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 3 });
      setTimeout(() => setShowSparkle(false), 1000);
    }
  }, []);

  // Handle Complete Lab Step
  const handleCompleteLabStep = useCallback((nodeId: NodeId) => {
    setBktState((prev) => {
      const current = prev[nodeId] || createBKTState();
      const updated = bktUpdate(current, true);
      return { ...prev, [nodeId]: updated };
    });
    setGameScore((prev) => prev + 75);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  }, []);

  // Check overall module completion
  const handleFinishModule = useCallback(() => {
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered ISC Class 11 Solubility Product Equilibria!');
    recordGameScore('c11_chem_solubility_product', gameScore);
    if (onComplete) onComplete(gameScore);
  }, [gameScore, onComplete]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 font-sans relative overflow-x-hidden">
      {/* Feedback Overlay Components */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Lab Step Completed Successfully!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />

      {/* Upper Navigation Header Bar */}
      <header className="max-w-6xl mx-auto mb-6 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-2xl flex flex-wrap justify-between items-center gap-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-xl font-bold shadow-lg">
            🧪
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-white tracking-wide">
              Solubility Product ($K_{'{sp}'}$) Simulator
            </h1>
            <p className="text-[11px] text-cyan-400 font-mono">ISC Class 11 Chemistry • Module c11_chem_061–070</p>
          </div>
        </div>

        {/* Tab Selector Buttons */}
        <nav className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {[
            { id: 'discovery', label: '1. Discovery', icon: '💡' },
            { id: 'lab', label: '2. Dynamic Lab', icon: '⚗️' },
            { id: 'challenges', label: '3. Challenges (22+)', icon: '⚔️' },
            { id: 'summary', label: '4. Summary', icon: '🏆' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as typeof activeTab);
                  audioManager.play('tap');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* Main Tab Render Container */}
      <main className="max-w-6xl mx-auto">
        {activeTab === 'discovery' && (
          <DiscoveryTab
            onStartLab={() => setActiveTab('lab')}
            bktState={bktState}
          />
        )}

        {activeTab === 'lab' && (
          <LabTab
            onCompleteLabStep={handleCompleteLabStep}
          />
        )}

        {activeTab === 'challenges' && (
          <ChallengesTab
            challenges={CHALLENGES}
            onAnswerChallenge={handleAnswerChallenge}
            bktState={bktState}
          />
        )}

        {activeTab === 'summary' && (
          <SummaryTab
            bktState={bktState}
            srsItems={srsItems}
            gameScore={gameScore}
          />
        )}
      </main>

      {/* Footer Finish Trigger */}
      <footer className="max-w-6xl mx-auto mt-10 pt-4 border-t border-slate-900 flex justify-between items-center text-xs text-slate-400">
        <div>CISCE ISC Class 11 Chemistry • Interactive Solubility Product Engine</div>
        <button
          onClick={handleFinishModule}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl transition-all shadow-md"
        >
          Complete Module & Record Score
        </button>
      </footer>
    </div>
  );
};

export default C11_ChemistrySolubilityproductSim;