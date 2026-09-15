"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst, type SoundEffect } from '../../../lib/sim-engine';
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
    title: "Chemical Reaction Stops Completely When Equilibrium Is Reached",
    description: "Students often believe that once a reaction reaches chemical equilibrium, all macroscopic and molecular processes cease entirely. They view equilibrium as a static state where the reaction has come to a complete halt.",
    correction: "Chemical equilibrium is dynamic in nature, meaning both forward and reverse reactions continue occurring simultaneously at equal rates. Because the rates of formation and consumption are identical, there is no net change in the concentrations of reactants and products over time. Macroscopic properties remain constant, but molecular transformations never stop.",
  },
  {
    id: "misc_2",
    title: "Reactant and Product Concentrations Must Be Equal at Equilibrium",
    description: "Students frequently confuse equal reaction rates with equal chemical concentrations. They assume that dynamic equilibrium implies a 50:50 ratio or identical concentrations of reactants and products.",
    correction: "At equilibrium, it is the rates of the forward and reverse reactions that are equal, not the concentrations of reactants and products. The concentrations remain constant over time, but their numerical values depend on the value of the equilibrium constant (Kc). A reaction can reach equilibrium with vastly more products than reactants, or vice versa.",
  },
  {
    id: "misc_3",
    title: "Adding a Catalyst Increases the Equilibrium Constant and Product Yield",
    description: "Many students think adding a catalyst shifts the equilibrium position toward the products and increases the value of Kc or Kp. They confuse the speed of reaching equilibrium with the thermodynamic yield of a reaction.",
    correction: "A catalyst lowers the activation energy equally for both the forward and reverse reactions, thereby speeding up both rates by the same factor. Consequently, it helps the system reach equilibrium faster without altering the equilibrium position or the numerical value of Kc. The final concentrations and yield of products remain completely unchanged.",
  },
  {
    id: "misc_4",
    title: "Adding Inert Gas at Constant Volume Shifts Equilibrium Position",
    description: "Students assume that introducing an inert gas increases the total pressure of the system, which must cause the equilibrium to shift according to Le Chatelier's principle. They mistakenly apply pressure rules without considering volume changes.",
    correction: "Adding an inert gas at constant volume increases the total pressure, but it does not change the partial pressures or molar concentrations of the reacting species. Because the concentrations of reactants and products remain unaffected, the reaction rates do not change, and the equilibrium position remains completely undisturbed. A shift only occurs if inert gas is added at constant pressure, which increases total volume.",
  },
  {
    id: "misc_5",
    title: "Equilibrium Constant Remains Unchanged Even When Temperature Changes",
    description: "Students misinterpret the term 'equilibrium constant' to mean that Kc is fixed under all experimental conditions. They believe changing temperature shifts the reaction position while keeping the value of Kc constant.",
    correction: "Temperature is the only factor that alters the actual numerical value of the equilibrium constant (Kc or Kp). According to the van 't Hoff relationship, an increase in temperature increases Kc for endothermic reactions and decreases Kc for exothermic reactions. Factors like concentration, pressure, and catalysts change the reaction quotient temporarily, but only temperature permanently changes the constant itself.",
  },
];

// ==========================================
// NODE IDS & METADATA
// ==========================================
export const ALL_NODE_IDS = [
  "c11_chem_051",
  "c11_chem_052",
  "c11_chem_053",
  "c11_chem_054",
  "c11_chem_055",
  "c11_chem_056",
  "c11_chem_057",
  "c11_chem_058",
  "c11_chem_059",
  "c11_chem_060",
] as const;

export type NodeId = typeof ALL_NODE_IDS[number];

export interface NodeInfo {
  id: NodeId;
  title: string;
  shortCode: string;
  description: string;
}

export const NODE_METADATA: Record<NodeId, NodeInfo> = {
  c11_chem_051: {
    id: "c11_chem_051",
    title: "Chemical Equilibrium - Dynamic Nature",
    shortCode: "051",
    description: "Forward and reverse reactions occurring at equal rates; observable concentrations stay constant."
  },
  c11_chem_052: {
    id: "c11_chem_052",
    title: "Law of Mass Action & Kc",
    shortCode: "052",
    description: "Reaction rates proportional to active masses; defining equilibrium constant Kc."
  },
  c11_chem_053: {
    id: "c11_chem_053",
    title: "Kp and Kc Relationship",
    shortCode: "053",
    description: "Pressure-based equilibrium constant Kp and relationship Kp = Kc(RT)^Δn."
  },
  c11_chem_054: {
    id: "c11_chem_054",
    title: "Le Chatelier's Principle",
    shortCode: "054",
    description: "System shifts to counteract disturbances in concentration, temperature, or pressure."
  },
  c11_chem_055: {
    id: "c11_chem_055",
    title: "Factors Affecting Equilibrium",
    shortCode: "055",
    description: "Effects of catalyst, inert gas (const V vs const P), and temperature on equilibrium position."
  },
  c11_chem_056: {
    id: "c11_chem_056",
    title: "Ionic Equilibrium & Electrolytes",
    shortCode: "056",
    description: "Strong vs weak electrolytes, degree of ionisation α, and Ostwald dilution law."
  },
  c11_chem_057: {
    id: "c11_chem_057",
    title: "Acid-Base Theories",
    shortCode: "057",
    description: "Arrhenius, Brønsted-Lowry (conjugate pairs), and Lewis (electron pair transfer)."
  },
  c11_chem_058: {
    id: "c11_chem_058",
    title: "pH & Ionic Product of Water (Kw)",
    shortCode: "058",
    description: "Autoionisation of water, Kw = [H+][OH-] = 10^-14 at 25°C, pH scale, and indicators."
  },
  c11_chem_059: {
    id: "c11_chem_059",
    title: "Buffer Solutions",
    shortCode: "059",
    description: "Acidic & basic buffers, buffer action, and Henderson-Hasselbalch equation."
  },
  c11_chem_060: {
    id: "c11_chem_060",
    title: "Common Ion Effect & Salt Hydrolysis",
    shortCode: "060",
    description: "Suppression of ionisation by common ion and pH of hydrolysed salt solutions."
  }
};

// ==========================================
// SCENARIOS & DISCOVERY DATA
// ==========================================
const SCENARIO_INFO = {
  title: "The Dynamic Chemical Equilibrium Lab",
  subtitle: "Class 11 ISC Chemistry Interactive Laboratory",
  context: "Welcome to the Advanced Chemical Equilibrium Suite! Here, you will discover why chemical reactions don't simply 'stop', how pressure and temperature reshape industrial outputs in the Haber and Contact processes, and how buffers stabilize human blood at pH 7.4."
};

interface DiscoveryQuestion {
  id: string;
  prompt: string;
  options: { label: string; text: string; correct: boolean; explanation: string }[];
}

const DISCOVERY_QUESTION: DiscoveryQuestion = {
  id: "dq_equilibrium_nature",
  prompt: "A closed bottle containing N₂ and H₂ reaches equilibrium with NH₃ in the Haber process. The overall gas pressure stops changing. What is happening at the molecular level?",
  options: [
    {
      label: "A",
      text: "The reaction has completely stopped; no molecules are colliding or reacting.",
      correct: false,
      explanation: "Incorrect! Equilibrium is dynamic, not static. Molecules continue to collide and react in both directions."
    },
    {
      label: "B",
      text: "N₂ and H₂ are forming NH₃ at the exact same rate that NH₃ is decomposing back into N₂ and H₂.",
      correct: true,
      explanation: "Spot on! The forward rate equals the reverse rate (r_f = r_r), so observable concentrations and pressure remain perfectly constant."
    },
    {
      label: "C",
      text: "All reactants have been completely converted into NH₃ molecules.",
      correct: false,
      explanation: "Incorrect. Reversible reactions do not reach 100% completion; both reactants and products coexist at equilibrium."
    },
    {
      label: "D",
      text: "The concentration of reactants must be equal to the concentration of products.",
      correct: false,
      explanation: "Common misconception! Rates are equal at equilibrium, but concentrations are constant and usually NOT equal."
    }
  ]
};

// ==========================================
// TEACHING SLIDES DATA
// ==========================================
interface SlideData {
  id: string;
  nodeId: NodeId;
  title: string;
  subtitle: string;
  content: string[];
  keyFormula?: string;
  analogy: string;
  interactiveType: 'dynamic_particles' | 'kp_kc_calc' | 'le_chatelier' | 'acid_base' | 'buffer_ph';
}

const TEACHING_SLIDES: SlideData[] = [
  {
    id: "slide_01",
    nodeId: "c11_chem_051",
    title: "Dynamic Nature of Chemical Equilibrium",
    subtitle: "c11_chem_051: Dynamic Balance & Reversibility",
    content: [
      "In a reversible reaction (written with ⇌), reactants form products and products decompose back to reactants under the same conditions.",
      "Dynamic Equilibrium occurs when the forward reaction rate (r_f) equals the reverse reaction rate (r_r).",
      "Macroscopic properties (color, total pressure, concentrations) remain constant, while microscopic conversions continue unceasingly."
    ],
    keyFormula: "r_{forward} = r_{reverse} \\quad \\implies \\quad \\text{Concentrations remain constant}",
    analogy: "Like two busy cities connected by Howrah Bridge: if 50 cars enter Kolkata per minute and 50 cars exit to Howrah, the car count in each city stays constant!",
    interactiveType: "dynamic_particles"
  },
  {
    id: "slide_02",
    nodeId: "c11_chem_052",
    title: "Law of Mass Action & Kc",
    subtitle: "c11_chem_052: Quantitative Equilibrium Constant",
    content: [
      "Proposed by Guldberg & Waage (1864): Reaction rate is directly proportional to the product of active masses (molar concentrations).",
      "For a general reaction aA + bB ⇌ cC + dD, the equilibrium constant Kc = [C]^c [D]^d / ([A]^a [B]^b).",
      "Kc depends ONLY on temperature. Pure solids and pure liquids are omitted (active mass = 1)."
    ],
    keyFormula: "K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b} \\quad \\text{at constant Temperature}",
    analogy: "Kc is like a bank account exchange rate between Reactants and Products at a given temperature.",
    interactiveType: "kp_kc_calc"
  },
  {
    id: "slide_03",
    nodeId: "c11_chem_053",
    title: "Relationship Between Kp and Kc",
    subtitle: "c11_chem_053: Expressing Gas Equilibrium via Partial Pressure",
    content: [
      "For gas-phase reactions, partial pressure p_i = [i]RT (from ideal gas equation PV = nRT).",
      "Kp is written using partial pressures: Kp = (p_C)^c (p_D)^d / ((p_A)^a (p_B)^b).",
      "Connecting formula: Kp = Kc (RT)^Δn, where Δn = (moles of gaseous products) - (moles of gaseous reactants)."
    ],
    keyFormula: "K_p = K_c (RT)^{\\Delta n_g} \\quad \\text{where } R = 0.0831 \\text{ bar L mol}^{-1}\\text{K}^{-1}",
    analogy: "If Δn = 0 (like H₂ + I₂ ⇌ 2HI), Kp = Kc. If Δn ≠ 0, gas mole changes scale Kp by temperature factors!",
    interactiveType: "kp_kc_calc"
  },
  {
    id: "slide_04",
    nodeId: "c11_chem_054",
    title: "Le Chatelier's Principle & Industrial Processes",
    subtitle: "c11_chem_054 & c11_chem_055: Opposing Applied Stress",
    content: [
      "When a stress (concentration, temperature, pressure) is applied to an equilibrium, the system shifts to counteract the stress.",
      "Exothermic reactions (Haber N₂ + 3H₂ ⇌ 2NH₃, ΔH = -92 kJ) shift LEFT when heated; Endothermic reactions shift RIGHT when heated.",
      "Increasing pressure shifts equilibrium to the side with FEWER gas moles. Catalysts speed up attainment of equilibrium without changing K!"
    ],
    keyFormula: "\\text{Stress Applied} \\implies \\text{Equilibrium Shifts in Direction to Relieve Stress}",
    analogy: "A financial thermostat: when heat (temperature) rises in an exothermic room, the cooler system kicks in by shifting backward!",
    interactiveType: "le_chatelier"
  },
  {
    id: "slide_05",
    nodeId: "c11_chem_056",
    title: "Ionic Equilibrium & Acid-Base Theories",
    subtitle: "c11_chem_056 & c11_chem_057: Electrolytes & Modern Concepts",
    content: [
      "Strong electrolytes ionise completely (α ≈ 1); Weak electrolytes ionise partially (α ≪ 1) creating ionic equilibrium.",
      "Arrhenius: Acids give H⁺, Bases give OH⁻ in water.",
      "Brønsted-Lowry: Acids are proton donors, Bases are proton acceptors (Forming Conjugate Acid-Base Pairs!).",
      "Lewis: Acids accept electron pairs (e.g. BF₃), Bases donate electron pairs (e.g. :NH₃)."
    ],
    keyFormula: "\\text{Brønsted: Acid} \\rightleftharpoons \\text{Conjugate Base} + H^+ \\quad | \\quad \\text{Lewis: } A + :B \\rightarrow A \\leftarrow B",
    analogy: "Brønsted acid-base is a game of hot potato with protons; Lewis is about sharing parking spots for electron pairs!",
    interactiveType: "acid_base"
  },
  {
    id: "slide_06",
    nodeId: "c11_chem_058",
    title: "pH Scale, Kw & Buffer Action",
    subtitle: "c11_chem_058, c11_chem_059 & c11_chem_060: Water, Buffers & Hydrolysis",
    content: [
      "Autoionisation of water: H₂O ⇌ H⁺ + OH⁻. Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 25°C. Thus pH + pOH = 14.",
      "Buffer Solutions resist pH changes: Acidic buffer (CH₃COOH + CH₃COONa) uses Henderson-Hasselbalch equation: pH = pKa + log([Salt]/[Acid]).",
      "Common Ion Effect: Adding a common ion (e.g. CH₃COO⁻) suppresses ionisation of a weak electrolyte.",
      "Salt Hydrolysis: Salts of strong acid + weak base (NH₄Cl) yield acidic solutions (pH < 7); salts of weak acid + strong base (CH₃COONa) yield basic solutions (pH > 7)."
    ],
    keyFormula: "pH = pK_a + \\log_{10}\\left(\\frac{[\\text{Salt}]}{[\\text{Acid}]}\\right) \\quad | \\quad K_w = [H^+][OH^-] = 10^{-14}",
    analogy: "A buffer is like a shock absorber on a mountain bicycle: adding drops of strong acid or alkali barely moves the pH frame!",
    interactiveType: "buffer_ph"
  }
];

// ==========================================
// ADAPTIVE CHALLENGES (8+ Progressive)
// ==========================================
interface ChallengeOption {
  id: string;
  text: string;
  correct: boolean;
  explanation: string;
}

interface Challenge {
  id: string;
  nodeId: NodeId;
  title: string;
  difficulty: 'foundation' | 'standard' | 'advanced';
  question: string;
  options: ChallengeOption[];
  hint: string;
  misconceptionKey?: string;
}

const CHALLENGES: Challenge[] = [
  {
    id: "ch_01",
    nodeId: "c11_chem_051",
    title: "Dynamic Equilibrium Characteristics",
    difficulty: "foundation",
    question: "Which of the following statements BEST describes a chemical system at dynamic equilibrium in a closed vessel?",
    options: [
      {
        id: "opt1",
        text: "The forward reaction has stopped, and the reverse reaction has stopped.",
        correct: false,
        explanation: "Equilibrium is dynamic! Both forward and reverse processes continue at microscopic levels."
      },
      {
        id: "opt2",
        text: "The rates of forward and reverse reactions are equal, and reactant/product concentrations remain constant.",
        correct: true,
        explanation: "Correct! Equal rates (r_f = r_r) ensure constant observable concentrations."
      },
      {
        id: "opt3",
        text: "The concentration of products must be exactly equal to the concentration of reactants.",
        correct: false,
        explanation: "Rates are equal, but concentrations are constant and usually unequal."
      },
      {
        id: "opt4",
        text: "The equilibrium can only be reached starting from pure reactants.",
        correct: false,
        explanation: "Equilibrium can be reached starting from pure reactants, pure products, or any mixture."
      }
    ],
    hint: "Think about the bridge analogy: equal numbers of cars entering and leaving per minute keeps city populations steady!"
  },
  {
    id: "ch_02",
    nodeId: "c11_chem_052",
    title: "Writing Molar Kc Expression",
    difficulty: "foundation",
    question: "What is the correct equilibrium constant expression (Kc) for the Haber synthesis reaction: N₂(g) + 3H₂(g) ⇌ 2NH₃(g)?",
    options: [
      {
        id: "opt1",
        text: "Kc = [NH₃]² / ([N₂][H₂]³)",
        correct: true,
        explanation: "Perfect! Stoichiometric coefficients become exponents in the numerator (products) over denominator (reactants)."
      },
      {
        id: "opt2",
        text: "Kc = ([N₂][H₂]³) / [NH₃]²",
        correct: false,
        explanation: "Inverted! Products go in the numerator and reactants in the denominator."
      },
      {
        id: "opt3",
        text: "Kc = 2[NH₃] / ([N₂] + 3[H₂])",
        correct: false,
        explanation: "Do not multiply or add terms! Concentrations are raised to powers of coefficients and multiplied."
      },
      {
        id: "opt4",
        text: "Kc = [NH₃] / ([N₂][H₂])",
        correct: false,
        explanation: "Remember to raise each concentration to its stoichiometric power!"
      }
    ],
    hint: "Products on top, Reactants on bottom; raise each term to its balancing coefficient."
  },
  {
    id: "ch_03",
    nodeId: "c11_chem_053",
    title: "Calculating Kp from Kc",
    difficulty: "standard",
    question: "For the dissociation of dinitrogen tetraoxide: N₂O₄(g) ⇌ 2NO₂(g), Kc = 0.211 mol/L at 298 K. What is Kp in bar? (R = 0.0831 bar L mol⁻¹ K⁻¹)",
    options: [
      {
        id: "opt1",
        text: "5.22 bar",
        correct: true,
        explanation: "Spot on! Δn = 2 - 1 = +1. Kp = Kc(RT)¹ = 0.211 × (0.0831 × 298) = 0.211 × 24.76 = 5.22 bar."
      },
      {
        id: "opt2",
        text: "0.211 bar",
        correct: false,
        explanation: "Kp equals Kc only when Δn = 0. Here Δn = +1!"
      },
      {
        id: "opt3",
        text: "0.0085 bar",
        correct: false,
        explanation: "You divided by RT instead of multiplying! Kp = Kc(RT)^(+1)."
      },
      {
        id: "opt4",
        text: "129.3 bar",
        correct: false,
        explanation: "Check your exponent Δn. Δn = 2 - 1 = 1, not 2."
      }
    ],
    hint: "Calculate Δn = (gaseous product moles) - (gaseous reactant moles). Then multiply Kc by (RT)^Δn."
  },
  {
    id: "ch_04",
    nodeId: "c11_chem_054",
    title: "Le Chatelier Shift: Pressure Stress",
    difficulty: "standard",
    question: "In the reaction 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), if the container volume is suddenly halved (doubling the pressure), which shift occurs?",
    options: [
      {
        id: "opt1",
        text: "Equilibrium shifts to the RIGHT (towards SO₃) because there are fewer gas moles (2 vs 3).",
        correct: true,
        explanation: "Correct! Reactants = 3 moles gas, Products = 2 moles gas. High pressure shifts toward fewer gas molecules."
      },
      {
        id: "opt2",
        text: "Equilibrium shifts to the LEFT (towards SO₂) to make more gas molecules.",
        correct: false,
        explanation: "Increasing pressure makes the system shift to REDUCE pressure, moving towards fewer moles."
      },
      {
        id: "opt3",
        text: "No shift occurs because Kc remains constant.",
        correct: false,
        explanation: "Kc is unchanged, but concentrations shift until Q_c equals K_c again!"
      },
      {
        id: "opt4",
        text: "The reaction becomes completely irreversible.",
        correct: false,
        explanation: "Pressure shift alters equilibrium composition, but does not render a reversible system irreversible."
      }
    ],
    hint: "Count total gas moles on left (2+1=3) vs right (2). High pressure pushes toward fewer moles!"
  },
  {
    id: "ch_05",
    nodeId: "c11_chem_055",
    title: "Inert Gas Addition & Catalyst Role",
    difficulty: "standard",
    question: "An inert gas (Argon) is added to a reaction mixture of N₂ + 3H₂ ⇌ 2NH₃ at CONSTANT VOLUME. What is the effect on the equilibrium position?",
    options: [
      {
        id: "opt1",
        text: "No effect on the equilibrium position because partial pressures of N₂, H₂, and NH₃ are unchanged.",
        correct: true,
        explanation: "Excellent! At constant volume, inert gas increases total pressure but partial pressures of reacting gases stay identical."
      },
      {
        id: "opt2",
        text: "Shifts to the right because total pressure increases.",
        correct: false,
        explanation: "Common trap! Equilibrium responds to PARTIAL pressures of reactants/products, not total pressure from an inert gas at constant volume."
      },
      {
        id: "opt3",
        text: "Shifts to the left because Argon reacts with NH₃.",
        correct: false,
        explanation: "Argon is chemically inert and does not react."
      },
      {
        id: "opt4",
        text: "Kc increases dramatically.",
        correct: false,
        explanation: "Kc depends ONLY on temperature."
      }
    ],
    hint: "Partial pressure p_i = (n_i / V) RT. If n_i and V are fixed, p_i doesn't change when inert gas is added at constant volume!"
  },
  {
    id: "ch_06",
    nodeId: "c11_chem_056",
    title: "Ostwald's Dilution Law",
    difficulty: "standard",
    question: "According to Ostwald's dilution law for a weak binary electrolyte AB (K = Cα² / (1-α)), what happens to the degree of ionisation (α) when water is added?",
    options: [
      {
        id: "opt1",
        text: "α increases because dilution shifts the ionic equilibrium toward the ionised side.",
        correct: true,
        explanation: "Correct! For small α, α ≈ √(K/C). As concentration C decreases (dilution), α increases."
      },
      {
        id: "opt2",
        text: "α decreases because there are fewer solute molecules per litre.",
        correct: false,
        explanation: "Fraction of solute ionised increases upon dilution, even though ion concentration per litre drops."
      },
      {
        id: "opt3",
        text: "The dissociation constant K increases.",
        correct: false,
        explanation: "K is a constant at constant temperature! Dilution changes α, not K."
      },
      {
        id: "opt4",
        text: "α remains unchanged for weak electrolytes.",
        correct: false,
        explanation: "α stays ≈ 1 only for strong electrolytes. For weak electrolytes, α grows with dilution."
      }
    ],
    hint: "Use α = √(K/C). When C drops (dilution), what happens to α?"
  },
  {
    id: "ch_07",
    nodeId: "c11_chem_057",
    title: "Brønsted & Lewis Acid-Base Theories",
    difficulty: "standard",
    question: "Identify the Brønsted conjugate acid-base pairs in: NH₃ + H₂O ⇌ NH₄⁺ + OH⁻, and state why BF₃ acts as a Lewis acid in BF₃ + :NH₃ → F₃B←NH₃.",
    options: [
      {
        id: "opt1",
        text: "Pairs: (NH₄⁺/NH₃) and (H₂O/OH⁻); BF₃ is a Lewis acid because Boron has an incomplete octet and accepts an electron pair.",
        correct: true,
        explanation: "Outstanding! NH₄⁺ is conjugate acid of NH₃; H₂O donates proton to form OH⁻; BF₃ accepts electron pair from :NH₃."
      },
      {
        id: "opt2",
        text: "Pairs: (NH₃/OH⁻) and (H₂O/NH₄⁺); BF₃ is a Lewis acid because it donates H⁺.",
        correct: false,
        explanation: "BF₃ contains no hydrogen at all! Lewis theory defines acids as electron pair acceptors."
      },
      {
        id: "opt3",
        text: "Pairs: (NH₄⁺/OH⁻) and (H₂O/NH₃); BF₃ is an Arrhenius acid.",
        correct: false,
        explanation: "Arrhenius acids produce H⁺ in water. BF₃ acts as a Lewis acid by accepting an electron pair."
      },
      {
        id: "opt4",
        text: "There are no conjugate pairs in weak base solutions.",
        correct: false,
        explanation: "Every Brønsted proton transfer creates conjugate acid-base pairs!"
      }
    ],
    hint: "Brønsted conjugate pairs differ by exactly one H⁺ ion. Lewis acids are electron pair acceptors."
  },
  {
    id: "ch_08",
    nodeId: "c11_chem_058",
    title: "pH and Temperature Dependence of Kw",
    difficulty: "advanced",
    question: "At 60°C, the ionic product of water Kw = 9.55 × 10⁻¹⁴ mol² dm⁻⁶. What is the pH of pure neutral water at 60°C?",
    options: [
      {
        id: "opt1",
        text: "6.51",
        correct: true,
        explanation: "Spot on! In neutral water [H⁺] = √(Kw) = √(9.55 × 10⁻¹⁴) = 3.09 × 10⁻⁷ M. pH = -log(3.09 × 10⁻⁷) = 6.51. Neutrality means [H⁺]=[OH⁻], NOT strictly pH 7!"
      },
      {
        id: "opt2",
        text: "7.00",
        correct: false,
        explanation: "pH 7 is neutral ONLY at 25°C where Kw = 10⁻¹⁴. Water autoionisation is endothermic, so Kw rises with temperature!"
      },
      {
        id: "opt3",
        text: "14.00",
        correct: false,
        explanation: "14 is pKw at 25°C, not the pH of neutral water."
      },
      {
        id: "opt4",
        text: "7.49",
        correct: false,
        explanation: "Recalculate [H⁺] = √(Kw) at 60°C."
      }
    ],
    hint: "Neutral water means [H⁺] = [OH⁻]. Therefore [H⁺] = √(Kw). Take -log10 of that value!"
  },
  {
    id: "ch_09",
    nodeId: "c11_chem_059",
    title: "Henderson-Hasselbalch Buffer Calculation",
    difficulty: "advanced",
    question: "An acidic buffer contains 0.20 M acetic acid (pKa = 4.74) and 0.10 M sodium acetate. What is the pH of this buffer solution?",
    options: [
      {
        id: "opt1",
        text: "4.44",
        correct: true,
        explanation: "Correct! pH = pKa + log([Salt]/[Acid]) = 4.74 + log(0.10 / 0.20) = 4.74 + log(0.50) = 4.74 - 0.301 = 4.44."
      },
      {
        id: "opt2",
        text: "5.04",
        correct: false,
        explanation: "You inverted the log term as log([Acid]/[Salt]). Henderson formula is log([Salt]/[Acid])."
      },
      {
        id: "opt3",
        text: "4.74",
        correct: false,
        explanation: "pH = pKa only when [Salt] = [Acid]. Here [Acid] > [Salt], so pH is lower than pKa."
      },
      {
        id: "opt4",
        text: "7.00",
        correct: false,
        explanation: "An acetic acid-acetate buffer maintains pH in the acidic range (4 - 5)."
      }
    ],
    hint: "Formula: pH = pKa + log10([Salt] / [Acid]). Note that 0.10/0.20 = 0.5, and log10(0.5) = -0.301."
  },
  {
    id: "ch_10",
    nodeId: "c11_chem_060",
    title: "Common Ion Effect & Salt Hydrolysis pH",
    difficulty: "advanced",
    question: "Why does adding solid sodium acetate (CH₃COONa) to a 0.1 M solution of CH₃COOH raise the solution pH, and what is the nature of a 0.1 M NH₄Cl solution?",
    options: [
      {
        id: "opt1",
        text: "CH₃COO⁻ from salt suppresses CH₃COOH ionisation via common ion effect (pH rises); NH₄Cl hydrolyses to give an acidic solution (pH < 7).",
        correct: true,
        explanation: "Bravo! Common CH₃COO⁻ shifts CH₃COOH ⇌ CH₃COO⁻ + H⁺ left, reducing [H⁺] (pH rises). NH₄⁺ + H₂O ⇌ NH₄OH + H⁺ yields acidic salt solution."
      },
      {
        id: "opt2",
        text: "CH₃COONa increases H⁺ concentration; NH₄Cl gives a neutral solution (pH = 7).",
        correct: false,
        explanation: "NH₄Cl is a salt of strong acid (HCl) + weak base (NH₄OH), so its solution is acidic, not neutral!"
      },
      {
        id: "opt3",
        text: "CH₃COONa neutralises water; NH₄Cl gives a basic solution (pH > 7).",
        correct: false,
        explanation: "Cationic hydrolysis of NH₄⁺ releases free H⁺, making NH₄Cl acidic."
      },
      {
        id: "opt4",
        text: "Common ion effect only works for gases, not aqueous solutions.",
        correct: false,
        explanation: "Common ion effect applies directly to ionic equilibria in aqueous solution!"
      }
    ],
    hint: "Adding common product ion (acetate) drives weak acid equilibrium backward. Strong acid + weak base salt = acidic solution."
  }
];

// ==========================================
// MISCONCEPTIONS DICTIONARY
// ==========================================
const MISCONCEPTIONS_MAP = {
  stopped_at_equilibrium: {
    title: "Equilibrium is NOT Static!",
    correction: "Equilibrium means forward and reverse reaction rates are equal (r_f = r_r). Molecules continue reacting constantly at equal speeds."
  },
  equal_concentrations: {
    title: "Equal Rates ≠ Equal Concentrations",
    correction: "At equilibrium, concentrations are CONSTANT over time, but [Reactants] and [Products] are rarely equal."
  },
  catalyst_changes_k: {
    title: "Catalysts Speed Up, But Do Not Shift K",
    correction: "A catalyst lowers activation energy for BOTH forward and reverse directions equally, helping the system reach equilibrium faster without changing Kc or Kp."
  },
  ph_7_always_neutral: {
    title: "Neutrality Means [H+] = [OH-], Not Always pH 7",
    correction: "At 25°C, neutral pH = 7 because Kw = 10^-14. At 60°C, Kw = 9.55×10^-14, making neutral pH = 6.51!"
  }
};

// ==========================================
// INTERACTIVE VISUALIZERS (CANVAS & SVG)
// ==========================================

// 1. Dynamic Particles Visualizer
const DynamicEquilibriumCanvas: React.FC<{
  rf: number;
  rr: number;
  nReactants: number;
  nProducts: number;
  isEquilibrium: boolean;
}> = ({ rf, rr, nReactants, nProducts, isEquilibrium }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = canvas.width;
    let height = canvas.height;

    // Create particle objects
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      type: 'A' | 'B'; // A = Reactant (blue), B = Product (orange)
    }

    const particles: Particle[] = [];
    const totalA = Math.min(60, Math.max(5, nReactants));
    const totalB = Math.min(60, Math.max(5, nProducts));

    for (let i = 0; i < totalA; i++) {
      particles.push({
        x: Math.random() * (width / 2 - 20) + 10,
        y: Math.random() * (height - 20) + 10,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        type: 'A'
      });
    }

    for (let i = 0; i < totalB; i++) {
      particles.push({
        x: Math.random() * (width / 2 - 20) + width / 2 + 10,
        y: Math.random() * (height - 20) + 10,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        type: 'B'
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw middle divider line
      ctx.strokeStyle = isEquilibrium ? '#10B981' : '#6B7280';
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Move & render particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 10 || p.x > width - 10) p.vx *= -1;
        if (p.y < 10 || p.y > height - 10) p.vy *= -1;

        // Chance to convert near center divider based on rf / rr
        if (Math.abs(p.x - width / 2) < 15) {
          if (p.type === 'A' && Math.random() < rf * 0.05) {
            p.type = 'B';
            p.vx = Math.abs(p.vx); // move right
          } else if (p.type === 'B' && Math.random() < rr * 0.05) {
            p.type = 'A';
            p.vx = -Math.abs(p.vx); // move left
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.type === 'A' ? 6 : 8, 0, Math.PI * 2);
        ctx.fillStyle = p.type === 'A' ? '#3B82F6' : '#F59E0B';
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
      });

      // Status text
      ctx.fillStyle = '#1F2937';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`Reactants N₂ + H₂ (${totalA})`, 15, 20);
      ctx.fillText(`Products NH₃ (${totalB})`, width / 2 + 15, 20);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [rf, rr, nReactants, nProducts, isEquilibrium]);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-900/80 p-2 shadow-inner">
      <canvas ref={canvasRef} width={480} height={200} className="w-full h-auto block" />
      <div className="mt-2 flex items-center justify-between text-xs text-slate-300 px-2">
        <span className="flex items-center gap-1 font-semibold text-blue-400">
          <span className="h-3 w-3 rounded-full bg-blue-500 inline-block"></span> Reactants (A)
        </span>
        <span className={`font-bold px-2 py-0.5 rounded ${isEquilibrium ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400'}`}>
          {isEquilibrium ? 'DYNAMIC EQUILIBRIUM (r_f = r_r)' : 'APPROACHING EQUILIBRIUM'}
        </span>
        <span className="flex items-center gap-1 font-semibold text-amber-400">
          <span className="h-3 w-3 rounded-full bg-amber-500 inline-block"></span> Products (B)
        </span>
      </div>
    </div>
  );
};

// 2. Le Chatelier Piston & Temperature Visualizer
const LeChatelierPistonVisualizer: React.FC<{
  temperature: number; // K
  volume: number; // L
  reactants: number;
  products: number;
  deltaH: number; // negative = exothermic
}> = ({ temperature, volume, reactants, products, deltaH }) => {
  // Piston height inversely proportional to volume
  const pistonHeight = Math.max(40, Math.min(140, 180 - volume * 12));

  return (
    <div className="relative w-full rounded-xl border border-slate-700 bg-slate-950 p-4 shadow-lg text-slate-100">
      <div className="text-center font-bold text-sm mb-2 text-cyan-400 flex items-center justify-center gap-2">
        <span>N₂(g) + 3H₂(g) ⇌ 2NH₃(g)</span>
        <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-rose-400 border border-rose-500/30">
          ΔH = {deltaH} kJ/mol (Exothermic)
        </span>
      </div>

      <div className="relative w-64 h-48 mx-auto border-b-4 border-l-4 border-r-4 border-slate-500 bg-slate-900/60 rounded-b-lg overflow-hidden">
        {/* Heat indicator background glow */}
        <div
          className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
          style={{
            backgroundColor: temperature > 500 ? '#ef4444' : '#3b82f6',
            opacity: Math.min(0.35, Math.max(0.05, (temperature - 300) / 600))
          }}
        />

        {/* Piston head */}
        <motion.div
          animate={{ y: 180 - pistonHeight }}
          transition={{ type: 'spring', stiffness: 120, damping: 15 }}
          className="absolute left-0 right-0 h-6 bg-slate-400 border-y-2 border-slate-200 shadow-md flex items-center justify-center z-10"
        >
          <div className="w-16 h-2 bg-slate-700 rounded-full" />
          {/* Piston rod */}
          <div className="absolute top-0 -translate-y-full w-4 h-24 bg-slate-400 border-x border-slate-300" />
        </motion.div>

        {/* Gas molecules representation inside chamber */}
        <div className="absolute inset-x-0 bottom-0 top-12 p-3 flex flex-wrap content-end gap-1.5 overflow-hidden">
          {Array.from({ length: Math.min(24, reactants) }).map((_, i) => (
            <motion.div
              key={`r-${i}`}
              animate={{
                x: [0, (i % 3) * 4 - 6, 0],
                y: [0, (i % 2) * -4 + 2, 0]
              }}
              transition={{ repeat: Infinity, duration: 1.5 + (i % 3) * 0.4 }}
              className="w-3 h-3 rounded-full bg-blue-500 border border-white shadow-sm flex items-center justify-center text-[8px] font-bold text-white"
            >
              R
            </motion.div>
          ))}
          {Array.from({ length: Math.min(24, products) }).map((_, i) => (
            <motion.div
              key={`p-${i}`}
              animate={{
                x: [0, (i % 2) * -5 + 3, 0],
                y: [0, (i % 4) * 3 - 3, 0]
              }}
              transition={{ repeat: Infinity, duration: 1.2 + (i % 2) * 0.5 }}
              className="w-4 h-4 rounded-full bg-amber-500 border border-white shadow-sm flex items-center justify-center text-[9px] font-bold text-slate-950"
            >
              P
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="bg-slate-800 p-2 rounded border border-slate-700">
          <span className="text-slate-400 block">Temperature</span>
          <span className={`font-bold ${temperature > 500 ? 'text-rose-400' : 'text-cyan-300'}`}>{temperature} K</span>
        </div>
        <div className="bg-slate-800 p-2 rounded border border-slate-700">
          <span className="text-slate-400 block">Volume (Pressure)</span>
          <span className="font-bold text-emerald-400">{volume.toFixed(1)} L ({(10 / volume).toFixed(1)} atm)</span>
        </div>
        <div className="bg-slate-800 p-2 rounded border border-slate-700">
          <span className="text-slate-400 block">Gas Moles (Δn=-2)</span>
          <span className="font-bold text-purple-300">{reactants} R : {products} P</span>
        </div>
      </div>
    </div>
  );
};

// 3. Interactive pH Probe & Buffer Solution Vessel
const PHAndBufferVisualizer: React.FC<{
  pH: number;
  solutionName: string;
  pKa?: number;
  saltRatio?: number;
}> = ({ pH, solutionName, pKa, saltRatio }) => {
  // Determine color from pH (Universal Indicator color scheme)
  const getPHColor = (val: number) => {
    if (val < 3) return '#ef4444'; // strong acid - red
    if (val < 6) return '#f97316'; // weak acid - orange
    if (val < 7.5) return '#10b981'; // neutral - green
    if (val < 11) return '#06b6d4'; // weak base - cyan
    return '#8b5cf6'; // strong base - purple
  };

  const liquidColor = getPHColor(pH);

  return (
    <div className="relative w-full rounded-xl border border-slate-700 bg-slate-900 p-4 shadow-lg text-slate-100 flex flex-col md:flex-row items-center gap-6">
      {/* Visual Beaker */}
      <div className="relative w-44 h-52 border-b-4 border-l-4 border-r-4 border-slate-300/60 bg-slate-950/40 rounded-b-2xl flex flex-col justify-end p-2 overflow-hidden shadow-inner">
        {/* Liquid level */}
        <motion.div
          animate={{ height: '70%', backgroundColor: liquidColor }}
          transition={{ duration: 0.6 }}
          className="w-full rounded-b-xl opacity-80 relative overflow-hidden flex items-center justify-center"
        >
          {/* Surface wave */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-white/30 animate-pulse" />
          <span className="text-white font-black text-xs drop-shadow text-center px-1">
            {solutionName}
          </span>
        </motion.div>

        {/* pH Glass Electrode Probe */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-36 bg-gradient-to-b from-slate-300 via-slate-100 to-amber-200 border border-slate-400 rounded-b-full shadow-lg z-20 flex flex-col items-center justify-end pb-1">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/90 border border-amber-600 animate-ping" />
        </div>
      </div>

      {/* Meter Display & Readouts */}
      <div className="flex-1 space-y-3 w-full">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between shadow-md">
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold">Digital pH Meter</span>
            <span className="text-3xl font-black font-mono tracking-tight" style={{ color: liquidColor }}>
              pH {pH.toFixed(2)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Class:</span>
            <span className="text-sm font-bold px-2.5 py-1 rounded-full text-white inline-block mt-0.5" style={{ backgroundColor: liquidColor }}>
              {pH < 6.8 ? 'ACIDIC' : pH > 7.2 ? 'BASIC' : 'NEUTRAL'}
            </span>
          </div>
        </div>

        {/* Henderson-Hasselbalch Breakdown if pKa exists */}
        {pKa !== undefined && saltRatio !== undefined && (
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 text-xs space-y-1.5 font-mono">
            <div className="text-amber-400 font-bold font-sans">Henderson-Hasselbalch Equation:</div>
            <div className="text-slate-200">
              pH = pK_a + log₁₀([Salt] / [Acid])
            </div>
            <div className="text-emerald-400 font-semibold">
              {pH.toFixed(2)} = {pKa.toFixed(2)} + log₁₀({saltRatio.toFixed(2)}) = {pKa.toFixed(2)} + {(Math.log10(saltRatio)).toFixed(2)}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-800 p-2 rounded border border-slate-700 text-center">
            <span className="text-slate-400 block">[H⁺] Concentration</span>
            <span className="font-bold text-rose-400 font-mono">{(Math.pow(10, -pH)).toExponential(2)} M</span>
          </div>
          <div className="bg-slate-800 p-2 rounded border border-slate-700 text-center">
            <span className="text-slate-400 block">[OH⁻] Concentration</span>
            <span className="font-bold text-cyan-400 font-mono">{(Math.pow(10, -(14 - pH))).toExponential(2)} M</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT DEFINITION
// ==========================================
export default function C11_ChemistryChemicalequilibriumdynamicnatureSim({
  onComplete
}: {
  onComplete?: (score: number) => void;
}) {
  // Navigation tabs: 'discovery' | 'learn' | 'lab' | 'challenges' | 'mastery'
  const [activeTab, setActiveTab] = useState<'discovery' | 'learn' | 'lab' | 'challenges' | 'mastery'>('discovery');

  // Discovery State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);

  // Slide state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Challenge state
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedChallengeOption, setSelectedChallengeOption] = useState<string | null>(null);
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Interactive Lab Simulator Controls
  // Lab 1: Dynamic Equilibrium
  const [lab1Rf, setLab1Rf] = useState(2.0);
  const [lab1Rr, setLab1Rr] = useState(2.0);
  const [lab1Reactants, setLab1Reactants] = useState(30);
  const [lab1Products, setLab1Products] = useState(30);

  // Lab 2: Le Chatelier
  const [lab2Temp, setLab2Temp] = useState(450); // K
  const [lab2Vol, setLab2Vol] = useState(5.0); // L
  const [lab2Reactants, setLab2Reactants] = useState(20);
  const [lab2Products, setLab2Products] = useState(20);

  // Lab 3: pH & Buffers
  const [lab3Mode, setLab3Mode] = useState<'pure_water' | 'weak_acid' | 'buffer' | 'hydrolysis'>('buffer');
  const [lab3AcidConc, setLab3AcidConc] = useState(0.2); // M
  const [lab3SaltConc, setLab3SaltConc] = useState(0.1); // M
  const [lab3AddedDrops, setLab3AddedDrops] = useState(0); // drops of HCl/NaOH

  // SRS & BKT State
  const [bktStates, setBktStates] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const initial: Partial<Record<NodeId, ReturnType<typeof createBKTState>>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial as Record<NodeId, ReturnType<typeof createBKTState>>;
  });

  // Gamification triggers
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentHintText, setCurrentHintText] = useState('');

  // Speech narration helper
  const speakText = useCallback((text: string) => {
    try {
      speechManager.speak(text);
      speechManager.speak('Great job! Keep going.');
      speechManager.speak('Let us try the next one.');
      speechManager.speak('Remember the key concept.');
      speechManager.speak('You are doing well!');
    } catch {
      // Audio fallback safeguard
    }
  }, []);

  // Play audio sound helper
  const playSound = useCallback((sound: SoundEffect) => {
    try {
      audioManager.play(sound);
    } catch {
      // Audio fallback safeguard
    }
  }, []);

  // Inactivity Auto-Hint Timer (10s)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeTab === 'challenges' && !challengeSubmitted) {
        setShowHint(true);
        setCurrentHintText(CHALLENGES[currentChallengeIndex].hint);
        playSound('hint');
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [activeTab, currentChallengeIndex, challengeSubmitted, playSound]);

  // Handler: Discovery question submission
  const handleDiscoverySubmit = (optIndex: number) => {
    if (discoveryAnswered) return;
    setDiscoverySelected(optIndex);
    setDiscoveryAnswered(true);

    const isCorrect = DISCOVERY_QUESTION.options[optIndex].correct;
    if (isCorrect) {
      playSound('success');
      setShowSparkle(true);
      speakText("That's correct! Equilibrium is a dynamic balance of forward and reverse rates.");
    } else {
      playSound('error');
      speakText("Not quite! Remember that chemical equilibrium never stops moving.");
    }
  };

  // Handler: Challenge Answer Submission
  const handleChallengeSubmit = () => {
    if (!selectedChallengeOption || challengeSubmitted) return;

    const currentCh = CHALLENGES[currentChallengeIndex];
    const chosenOpt = currentCh.options.find((o) => o.id === selectedChallengeOption);
    if (!chosenOpt) return;

    setChallengeSubmitted(true);
    const isCorrect = chosenOpt.correct;

    // BKT & SRS update
    const nodeId = currentCh.nodeId;
    const oldBKT = bktStates[nodeId] || createBKTState();
    const updatedBKT = bktUpdate(oldBKT, isCorrect);
    setBktStates((prev) => ({ ...prev, [nodeId]: updatedBKT }));

    // Record SRS item
    const reviewItem = createReviewItem(nodeId, 'Chemistry');
    sm2Update(reviewItem, isCorrect ? 5 : 2, 0);

    if (isCorrect) {
      setScore((s) => s + 10);
      playSound('drop-correct');
      setShowSparkle(true);
      speakText("Excellent analysis! You mastered this node concept.");
    } else {
      playSound('drop-wrong');
      speakText(chosenOpt.explanation);
    }
  };

  // Next Challenge
  const handleNextChallenge = () => {
    setSelectedChallengeOption(null);
    setChallengeSubmitted(false);
    setShowHint(false);

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      playSound('whoosh');
    } else {
      // Completed all challenges
      setShowConfetti(true);
      setShowSuccessBanner(true);
      playSound('celebration');
      speakText("Congratulations! You have completed all interactive chemistry challenges!");

      // Save overall mastery
      ALL_NODE_IDS.forEach((id) => {
        const mastery = masteryProb(bktStates[id]);
        recordGameScore(ALL_NODE_IDS, score + 10);
      });

      if (onComplete) onComplete(score + 10);
    }
  };

  // Computed pH for Lab 3
  const computedLab3PH = useMemo(() => {
    if (lab3Mode === 'pure_water') {
      return 7.00 + lab3AddedDrops * 0.05;
    }
    if (lab3Mode === 'weak_acid') {
      // CH3COOH Ka = 1.8e-5 -> pKa = 4.74. pH approx = 1/2 (pKa - log C)
      const c = Math.max(0.01, lab3AcidConc);
      const approxPH = 0.5 * (4.74 - Math.log10(c));
      return Math.max(1.0, approxPH + lab3AddedDrops * 0.08);
    }
    if (lab3Mode === 'buffer') {
      // Henderson: pH = 4.74 + log([Salt]/[Acid])
      const ratio = Math.max(0.01, lab3SaltConc / Math.max(0.01, lab3AcidConc));
      const basePH = 4.74 + Math.log10(ratio);
      // Buffer resists drops! Very tiny shift
      return basePH + lab3AddedDrops * 0.01;
    }
    // Hydrolysis mode (e.g. sodium acetate) pH = 1/2(pKw + pKa + log C)
    const c = Math.max(0.01, lab3SaltConc);
    return 0.5 * (14.00 + 4.74 + Math.log10(c)) + lab3AddedDrops * 0.04;
  }, [lab3Mode, lab3AcidConc, lab3SaltConc, lab3AddedDrops]);

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center">
      {/* Gamification visual feedback overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Mastery Achieved! All Nodes Unlocked!" />
      <SparkleBurst show={showSparkle} x={400} y={200} />
      <HintBubble show={showHint} text={currentHintText} />

      {/* HEADER BAR */}
      <header className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-slate-950 text-xs font-black px-2.5 py-1 rounded tracking-wider uppercase">
              Class 11 ISC Chemistry
            </span>
            <span className="text-xs text-slate-400 font-mono">10 Nodes Active</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1 tracking-tight">
            {SCENARIO_INFO.title}
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-0.5">{SCENARIO_INFO.subtitle}</p>
        </div>

        {/* Global Score & Progress Badge */}
        <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl shadow-inner">
          <div className="text-center">
            <span className="text-[10px] uppercase text-slate-400 font-bold block">Score</span>
            <span className="text-xl font-black text-amber-400 font-mono">{score}</span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center">
            <span className="text-[10px] uppercase text-slate-400 font-bold block">Mastery</span>
            <span className="text-xl font-black text-emerald-400 font-mono">
              {Math.round((Object.values(bktStates).reduce((acc, curr) => acc + masteryProb(curr), 0) / ALL_NODE_IDS.length) * 100)}%
            </span>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="w-full max-w-6xl mt-6 flex flex-wrap items-center justify-center gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'discovery', label: '1. Discovery' },
          { id: 'learn', label: '2. Concepts & Slides' },
          { id: 'lab', label: '3. Virtual Lab Simulators' },
          { id: 'challenges', label: '4. Adaptive Challenges' },
          { id: 'mastery', label: '5. Mastery Dashboard' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {audioManager.play('tap'); 
              setActiveTab(tab.id as any);
              playSound('tap');
            }}
            className={`px-4 py-2 text-xs md:text-sm font-bold rounded-xl transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-400/50'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* TAB CONTENT CONTAINER */}
      <main className="w-full max-w-6xl mt-6 flex-1">
        <AnimatePresence mode="wait">
          {/* 1. DISCOVERY TAB */}
          {activeTab === 'discovery' && (
            <motion.div
              key="discovery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
                <div className="inline-block bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  Predict-Before-Learn Hypothesis Challenge
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                  What Does Chemical Equilibrium Really Mean?
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {DISCOVERY_QUESTION.prompt}
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {DISCOVERY_QUESTION.options.map((opt, idx) => {
                    const isSelected = discoverySelected === idx;
                    let btnStyle = "bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-200";
                    if (discoveryAnswered) {
                      if (opt.correct) {
                        btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold";
                      } else if (isSelected) {
                        btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleDiscoverySubmit(idx)}
                        disabled={discoveryAnswered}
                        className={`w-full p-4 text-left rounded-xl border text-xs md:text-sm transition-all duration-200 flex items-start gap-3 ${btnStyle}`}
                      >
                        <span className="h-6 w-6 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {opt.label}
                        </span>
                        <div className="flex-1">
                          <div>{opt.text}</div>
                          {discoveryAnswered && (
                            <div className="mt-2 text-xs italic opacity-90 border-t border-slate-700/50 pt-1.5">
                              {opt.explanation}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {discoveryAnswered && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => {audioManager.play('tap'); 
                        setActiveTab('learn');
                        playSound('pop');
                      }}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold rounded-xl shadow-lg hover:brightness-110 text-xs md:text-sm transition-all"
                    >
                      Proceed to Learning Slides →
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* 2. LEARNING SLIDES TAB */}
          {activeTab === 'learn' && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {(() => {
                const slide = TEACHING_SLIDES[currentSlideIndex];
                return (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col gap-6">
                    {/* Slide Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-xs font-mono text-cyan-400 block font-semibold">
                          {slide.subtitle}
                        </span>
                        <h2 className="text-xl md:text-2xl font-black text-white mt-0.5">
                          {slide.title}
                        </h2>
                      </div>
                      <div className="text-xs font-semibold px-3 py-1 bg-slate-800 rounded-full border border-slate-700 text-slate-300 self-start md:self-auto">
                        Slide {currentSlideIndex + 1} of {TEACHING_SLIDES.length}
                      </div>
                    </div>

                    {/* Content bullet points */}
                    <div className="space-y-3">
                      {slide.content.map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs md:text-sm text-slate-200">
                          <span className="h-2 w-2 rounded-full bg-cyan-400 mt-2 shrink-0" />
                          <p>{bullet}</p>
                        </div>
                      ))}
                    </div>

                    {/* Key Formula Box */}
                    {slide.keyFormula && (
                      <div className="bg-slate-950 border border-cyan-500/30 p-4 rounded-xl text-center">
                        <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold block mb-1">
                          Key Mathematical Law / Formula
                        </span>
                        <span className="font-mono text-sm md:text-base font-bold text-emerald-300">
                          {slide.keyFormula}
                        </span>
                      </div>
                    )}

                    {/* Analogy Box */}
                    <div className="bg-amber-950/20 border border-amber-500/30 p-4 rounded-xl text-xs md:text-sm text-amber-200 flex items-start gap-3">
                      <span className="text-xl">💡</span>
                      <div>
                        <span className="font-bold text-amber-400 block">Real-World Analogy:</span>
                        {slide.analogy}
                      </div>
                    </div>

                    {/* Interactive Visual Embedded in Slide */}
                    <div className="mt-2">
                      <h3 className="text-xs uppercase font-bold text-slate-400 mb-2">Interactive Visual Demonstration</h3>
                      {slide.interactiveType === 'dynamic_particles' && (
                        <DynamicEquilibriumCanvas
                          rf={lab1Rf}
                          rr={lab1Rr}
                          nReactants={lab1Reactants}
                          nProducts={lab1Products}
                          isEquilibrium={Math.abs(lab1Rf - lab1Rr) < 0.1}
                        />
                      )}
                      {slide.interactiveType === 'kp_kc_calc' && (
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono space-y-2">
                          <div className="text-slate-300 font-sans font-bold text-sm">Kp = Kc (RT)^Δn Live Calculation:</div>
                          <div>Kc = 0.211 mol L⁻¹ | Temperature T = 298 K | R = 0.0831 bar L mol⁻¹ K⁻¹</div>
                          <div>Δn_g = (2 moles NO₂) - (1 mole N₂O₄) = +1</div>
                          <div className="text-emerald-400 font-bold text-sm">
                            Kp = 0.211 × (0.0831 × 298)¹ = 5.22 bar
                          </div>
                        </div>
                      )}
                      {slide.interactiveType === 'le_chatelier' && (
                        <LeChatelierPistonVisualizer
                          temperature={lab2Temp}
                          volume={lab2Vol}
                          reactants={lab2Reactants}
                          products={lab2Products}
                          deltaH={-92}
                        />
                      )}
                      {slide.interactiveType === 'acid_base' && (
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                          <div className="font-bold text-cyan-400 text-sm">Brønsted Conjugate Acid-Base Pairs:</div>
                          <div className="flex items-center justify-around font-mono text-center p-2 bg-slate-900 rounded border border-slate-800">
                            <div>
                              <span className="text-rose-400 font-bold block">Acid: NH₄⁺</span>
                              <span className="text-[10px] text-slate-400">Proton Donor</span>
                            </div>
                            <span className="text-slate-500 font-bold">⇌</span>
                            <div>
                              <span className="text-cyan-400 font-bold block">Base: NH₃</span>
                              <span className="text-[10px] text-slate-400">Conjugate Base</span>
                            </div>
                            <span className="text-amber-400 font-bold">+ H⁺</span>
                          </div>
                        </div>
                      )}
                      {slide.interactiveType === 'buffer_ph' && (
                        <PHAndBufferVisualizer
                          pH={computedLab3PH}
                          solutionName={lab3Mode === 'buffer' ? 'Acetic Acid + Sodium Acetate Buffer' : 'Weak Acid Solution'}
                          pKa={4.74}
                          saltRatio={lab3SaltConc / lab3AcidConc}
                        />
                      )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-2">
                      <button
                        onClick={() => {audioManager.play('tap'); 
                          setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
                          playSound('tap');
                        }}
                        disabled={currentSlideIndex === 0}
                        className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700"
                      >
                        ← Previous
                      </button>
                      <button
                        onClick={() => {audioManager.play('tap'); 
                          if (currentSlideIndex < TEACHING_SLIDES.length - 1) {
                            setCurrentSlideIndex((prev) => prev + 1);
                            playSound('tap');
                          } else {
                            setActiveTab('lab');
                            playSound('chime');
                          }
                        }}
                        className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-500 shadow-md"
                      >
                        {currentSlideIndex < TEACHING_SLIDES.length - 1 ? 'Next Slide →' : 'Enter Virtual Lab →'}
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* 3. VIRTUAL LAB SIMULATORS TAB */}
          {activeTab === 'lab' && (
            <motion.div
              key="lab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Simulator 1: Dynamic Equilibrium Controls */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-blue-400 font-bold uppercase">Simulator 1</span>
                    <h3 className="text-lg font-bold text-white">Dynamic Reaction Rate Balancing</h3>
                  </div>
                  <button
                    onClick={() => {audioManager.play('tap'); 
                      setLab1Rf(2.5);
                      setLab1Rr(2.5);
                      playSound('pop');
                    }}
                    className="px-3 py-1 bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-bold hover:bg-emerald-600/50"
                  >
                    Set Equal Rates (r_f = r_r)
                  </button>
                </div>

                <DynamicEquilibriumCanvas
                  rf={lab1Rf}
                  rr={lab1Rr}
                  nReactants={lab1Reactants}
                  nProducts={lab1Products}
                  isEquilibrium={Math.abs(lab1Rf - lab1Rr) < 0.1}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">
                      Forward Reaction Rate Constant (r_f): {lab1Rf.toFixed(1)}
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="5.0"
                      step="0.1"
                      value={lab1Rf}
                      onChange={(e) => setLab1Rf(parseFloat(e.target.value))}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">
                      Reverse Reaction Rate Constant (r_r): {lab1Rr.toFixed(1)}
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="5.0"
                      step="0.1"
                      value={lab1Rr}
                      onChange={(e) => setLab1Rr(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Simulator 2: Le Chatelier Stress Factors */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Simulator 2</span>
                  <h3 className="text-lg font-bold text-white">Le Chatelier Pressure & Temperature Shifts</h3>
                </div>

                <LeChatelierPistonVisualizer
                  temperature={lab2Temp}
                  volume={lab2Vol}
                  reactants={lab2Reactants}
                  products={lab2Products}
                  deltaH={-92}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">
                      Temperature: {lab2Temp} K ({lab2Temp > 500 ? 'High Heat - Shifts Left ⬅' : 'Cooler - Shifts Right ➔'})
                    </label>
                    <input
                      type="range"
                      min="300"
                      max="800"
                      step="10"
                      value={lab2Temp}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setLab2Temp(val);
                        // Temperature shift effect
                        if (val > 500) {
                          setLab2Reactants((r) => Math.min(40, r + 1));
                          setLab2Products((p) => Math.max(5, p - 1));
                        } else {
                          setLab2Reactants((r) => Math.max(5, r - 1));
                          setLab2Products((p) => Math.min(40, p + 1));
                        }
                      }}
                      className="w-full accent-rose-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">
                      Chamber Volume (1/Pressure): {lab2Vol.toFixed(1)} L ({lab2Vol < 4.0 ? 'High Pressure - Shifts Right (Fewer Moles) ➔' : 'Low Pressure ⬅'})
                    </label>
                    <input
                      type="range"
                      min="2.0"
                      max="10.0"
                      step="0.5"
                      value={lab2Vol}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setLab2Vol(val);
                        if (val < 4.0) {
                          setLab2Products((p) => Math.min(40, p + 1));
                          setLab2Reactants((r) => Math.max(5, r - 1));
                        } else {
                          setLab2Reactants((r) => Math.min(40, r + 1));
                          setLab2Products((p) => Math.max(5, p - 1));
                        }
                      }}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Simulator 3: pH, Buffers & Common Ion Effect */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <div>
                  <span className="text-xs font-mono text-purple-400 font-bold uppercase">Simulator 3</span>
                  <h3 className="text-lg font-bold text-white">Buffer Capacity & Common Ion pH Meter</h3>
                </div>

                <PHAndBufferVisualizer
                  pH={computedLab3PH}
                  solutionName={
                    lab3Mode === 'pure_water'
                      ? 'Pure Distilled Water'
                      : lab3Mode === 'weak_acid'
                      ? '0.2M Acetic Acid Alone'
                      : lab3Mode === 'buffer'
                      ? '0.2M Acetic Acid + 0.1M Sodium Acetate Buffer'
                      : '0.1M Hydrolysed Sodium Acetate Salt'
                  }
                  pKa={4.74}
                  saltRatio={lab3SaltConc / lab3AcidConc}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">Select Solution Type:</label>
                    <select
                      value={lab3Mode}
                      onChange={(e) => {
                        setLab3Mode(e.target.value as any);
                        setLab3AddedDrops(0);
                        playSound('pop');
                      }}
                      className="w-full bg-slate-800 text-white p-2 rounded border border-slate-700"
                    >
                      <option value="pure_water">Pure Water (No Buffer)</option>
                      <option value="weak_acid">Weak Acid Alone (CH₃COOH)</option>
                      <option value="buffer">Acidic Buffer (CH₃COOH + CH₃COONa)</option>
                      <option value="hydrolysis">Hydrolysed Salt (CH₃COONa)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 font-bold block mb-1">Add Drops of 0.1M Strong Base (NaOH):</label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {audioManager.play('tap'); 
                          setLab3AddedDrops((d) => d + 1);
                          playSound('drop-correct');
                        }}
                        className="flex-1 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-500"
                      >
                        + 1 Drop NaOH
                      </button>
                      <button
                        onClick={() => {audioManager.play('tap'); 
                          setLab3AddedDrops(0);
                          playSound('tap');
                        }}
                        className="py-2 px-3 bg-slate-800 text-slate-300 rounded hover:bg-slate-700"
                      >
                        Reset Drops
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center text-slate-300 text-[11px] leading-relaxed">
                    <span className="font-bold text-amber-400">Buffer Action Insight:</span>
                    {lab3Mode === 'buffer' ? (
                      <p>Notice how adding drops of NaOH causes almost zero change in pH! The acetic acid reserve neutralises OH⁻ ions.</p>
                    ) : (
                      <p>Without a buffer pair, adding drops of acid/base causes drastic spikes in pH!</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 4. ADAPTIVE CHALLENGES TAB */}
          {activeTab === 'challenges' && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {(() => {
                const currentCh = CHALLENGES[currentChallengeIndex];
                const nodeMeta = NODE_METADATA[currentCh.nodeId];

                return (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
                    {/* Challenge Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-cyan-400">
                            Node {nodeMeta.shortCode}: {nodeMeta.title}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            currentCh.difficulty === 'foundation' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            currentCh.difficulty === 'standard' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                            'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            {currentCh.difficulty}
                          </span>
                        </div>
                        <h2 className="text-lg md:text-xl font-bold text-white mt-1">
                          Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}: {currentCh.title}
                        </h2>
                      </div>

                      <button
                        onClick={() => {
                          setShowHint((h) => !h);
                          setCurrentHintText(currentCh.hint);
                          playSound('hint');
                        }}
                        className="px-3 py-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold hover:bg-amber-500/20 self-start md:self-auto flex items-center gap-1.5"
                      >
                        💡 Need Hint?
                      </button>
                    </div>

                    {/* Question Prompt */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-sm md:text-base font-semibold text-slate-100 leading-relaxed">
                      {currentCh.question}
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 gap-3">
                      {currentCh.options.map((opt) => {
                        const isSelected = selectedChallengeOption === opt.id;
                        let btnStyle = "bg-slate-800/80 border-slate-700 hover:border-slate-500 text-slate-200";

                        if (challengeSubmitted) {
                          if (opt.correct) {
                            btnStyle = "bg-emerald-950/90 border-emerald-500 text-emerald-100 font-bold";
                          } else if (isSelected) {
                            btnStyle = "bg-rose-950/90 border-rose-500 text-rose-100";
                          }
                        } else if (isSelected) {
                          btnStyle = "bg-blue-900/60 border-blue-500 text-white font-semibold ring-2 ring-blue-500/30";
                        }

                        return (
                          <button
                            key={opt.id}
                            onClick={() => {
                              if (!challengeSubmitted) {
                                setSelectedChallengeOption(opt.id);
                                playSound('tap');
                              }
                            }}
                            disabled={challengeSubmitted}
                            className={`w-full p-4 text-left rounded-xl border text-xs md:text-sm transition-all duration-200 flex items-start gap-3 ${btnStyle}`}
                          >
                            <span className="h-5 w-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                              {isSelected ? '✓' : ''}
                            </span>
                            <div className="flex-1">
                              <div>{opt.text}</div>
                              {challengeSubmitted && (
                                <div className="mt-2 text-xs font-normal opacity-90 border-t border-slate-700/60 pt-2">
                                  {opt.explanation}
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                      <span className="text-xs text-slate-400">
                        {challengeSubmitted ? (selectedChallengeOption && currentCh.options.find(o=>o.id===selectedChallengeOption)?.correct ? '✅ Correct Answer!' : '❌ Review Solution Above') : 'Select your answer and submit'}
                      </span>

                      {!challengeSubmitted ? (
                        <button
                          onClick={handleChallengeSubmit}
                          disabled={!selectedChallengeOption}
                          className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs md:text-sm hover:bg-blue-500 disabled:opacity-40 shadow-lg"
                        >
                          Submit Answer →
                        </button>
                      ) : (
                        <button
                          onClick={handleNextChallenge}
                          className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs md:text-sm hover:bg-emerald-500 shadow-lg"
                        >
                          {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Finish & View Summary 🎉'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* 5. MASTERY DASHBOARD TAB */}
          {activeTab === 'mastery' && (
            <motion.div
              key="mastery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                  Your BKT Skill Mastery Matrix
                </h2>
                <p className="text-xs md:text-sm text-slate-400 mb-6">
                  Real-time Bayesian Knowledge Tracing scores across all 10 Class 11 Chemistry Equilibrium Node IDs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ALL_NODE_IDS.map((nodeId) => {
                    const meta = NODE_METADATA[nodeId];
                    const bkt = bktStates[nodeId] || createBKTState();
                    const masteryPct = Math.round(masteryProb(bkt) * 100);

                    return (
                      <div key={nodeId} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-mono text-cyan-400 font-bold block">
                              {nodeId} (Node {meta.shortCode})
                            </span>
                            <h3 className="text-xs md:text-sm font-bold text-white mt-0.5">
                              {meta.title}
                            </h3>
                          </div>
                          <span className={`text-xs font-black px-2.5 py-1 rounded-full ${
                            masteryPct >= 80 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            masteryPct >= 50 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                            'bg-slate-800 text-slate-400'
                          }`}>
                            {masteryPct}%
                          </span>
                        </div>

                        {/* Mastery progress bar */}
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full transition-all duration-500"
                            style={{ width: `${masteryPct}%` }}
                          />
                        </div>

                        <p className="text-[11px] text-slate-400 italic">
                          {meta.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => {
                      setActiveTab('challenges');
                      setCurrentChallengeIndex(0);
                      setSelectedChallengeOption(null);
                      setChallengeSubmitted(false);
                      playSound('tap');
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl text-xs md:text-sm shadow-xl hover:brightness-110"
                  >
                    Re-Attempt Challenges for Higher Mastery 🔄
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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